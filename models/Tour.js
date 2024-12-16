import DatabaseService from '../services/DatabaseService.js';

class Tour {
    static async findAll() {
        const query = `
            SELECT t.*, th.name as theme_name, r.name as region_name, 
                   c.name as country_name, g.name as guide_name
            FROM tours t
            LEFT JOIN themes th ON t.theme_id = th.id
            LEFT JOIN regions r ON t.region_id = r.id
            LEFT JOIN countries c ON t.country_id = c.id
            LEFT JOIN guides g ON t.guide_id = g.id
            ORDER BY t.created_at DESC
        `;
        return await DatabaseService.query(query);
    }

    static async findById(id) {
        const query = 'SELECT * FROM tours WHERE id = @param0';
        const results = await DatabaseService.query(query, [id]);
        return results[0];
    }

    static async create(tourData) {
        return await DatabaseService.transaction(async (transaction) => {
            // Insert tour
            const tourResult = await transaction.request()
                .input('name', tourData.name)
                .input('categoryId', tourData.categoryId)
                .input('operatorId', tourData.operatorId)
                .input('startDate', tourData.startDate)
                .input('endDate', tourData.endDate)
                .input('status', tourData.status)
                .input('showOnHomepage', tourData.showOnHomepage)
                .input('priceDouble', tourData.priceDouble)
                .input('priceSingle', tourData.priceSingle)
                .input('priceTriple', tourData.priceTriple)
                .input('priceChild1', tourData.priceChild1)
                .input('priceChild2', tourData.priceChild2)
                .input('themeId', tourData.themeId)
                .input('regionId', tourData.regionId)
                .input('countryId', tourData.countryId)
                .input('cityId', tourData.cityId)
                .input('guideId', tourData.guideId)
                .input('notes', tourData.notes)
                .input('contract', tourData.contract)
                .query(`
                    INSERT INTO tours (
                        name, category_id, operator_id, start_date, end_date,
                        status, show_on_homepage, price_double, price_single,
                        price_triple, price_child1, price_child2, theme_id,
                        region_id, country_id, city_id, guide_id, notes, contract
                    ) 
                    VALUES (
                        @name, @categoryId, @operatorId, @startDate, @endDate,
                        @status, @showOnHomepage, @priceDouble, @priceSingle,
                        @priceTriple, @priceChild1, @priceChild2, @themeId,
                        @regionId, @countryId, @cityId, @guideId, @notes, @contract
                    );
                    SELECT SCOPE_IDENTITY() AS id;
                `);

            const tourId = tourResult.recordset[0].id;

            // Insert tour days
            if (tourData.days?.length > 0) {
                for (const day of tourData.days) {
                    await transaction.request()
                        .input('tourId', tourId)
                        .input('dayNumber', day.dayNumber)
                        .input('title', day.title)
                        .input('description', day.description)
                        .query(`
                            INSERT INTO tour_days (tour_id, day_number, title, description)
                            VALUES (@tourId, @dayNumber, @title, @description)
                        `);
                }
            }

            // Insert services
            if (tourData.services) {
                // Insert included services
                for (const [service, included] of Object.entries(tourData.services.included)) {
                    if (included) {
                        await transaction.request()
                            .input('tourId', tourId)
                            .input('serviceName', service)
                            .query(`
                                INSERT INTO tour_services (tour_id, service_name, is_included)
                                VALUES (@tourId, @serviceName, 1)
                            `);
                    }
                }

                // Insert excluded services
                for (const [service, excluded] of Object.entries(tourData.services.excluded)) {
                    if (excluded) {
                        await transaction.request()
                            .input('tourId', tourId)
                            .input('serviceName', service)
                            .query(`
                                INSERT INTO tour_services (tour_id, service_name, is_included)
                                VALUES (@tourId, @serviceName, 0)
                            `);
                    }
                }
            }

            return tourId;
        });
    }

    static async update(id, tourData) {
        return await DatabaseService.transaction(async (transaction) => {
            // Update tour
            await transaction.request()
                .input('id', id)
                .input('name', tourData.name)
                .input('categoryId', tourData.categoryId)
                .input('operatorId', tourData.operatorId)
                .input('startDate', tourData.startDate)
                .input('endDate', tourData.endDate)
                .input('status', tourData.status)
                .input('showOnHomepage', tourData.showOnHomepage)
                .input('priceDouble', tourData.priceDouble)
                .input('priceSingle', tourData.priceSingle)
                .input('priceTriple', tourData.priceTriple)
                .input('priceChild1', tourData.priceChild1)
                .input('priceChild2', tourData.priceChild2)
                .input('themeId', tourData.themeId)
                .input('regionId', tourData.regionId)
                .input('countryId', tourData.countryId)
                .input('cityId', tourData.cityId)
                .input('guideId', tourData.guideId)
                .input('notes', tourData.notes)
                .input('contract', tourData.contract)
                .query(`
                    UPDATE tours SET
                        name = @name,
                        category_id = @categoryId,
                        operator_id = @operatorId,
                        start_date = @startDate,
                        end_date = @endDate,
                        status = @status,
                        show_on_homepage = @showOnHomepage,
                        price_double = @priceDouble,
                        price_single = @priceSingle,
                        price_triple = @priceTriple,
                        price_child1 = @priceChild1,
                        price_child2 = @priceChild2,
                        theme_id = @themeId,
                        region_id = @regionId,
                        country_id = @countryId,
                        city_id = @cityId,
                        guide_id = @guideId,
                        notes = @notes,
                        contract = @contract,
                        updated_at = GETDATE()
                    WHERE id = @id
                `);

            // Update days
            await transaction.request()
                .input('tourId', id)
                .query('DELETE FROM tour_days WHERE tour_id = @tourId');

            if (tourData.days?.length > 0) {
                for (const day of tourData.days) {
                    await transaction.request()
                        .input('tourId', id)
                        .input('dayNumber', day.dayNumber)
                        .input('title', day.title)
                        .input('description', day.description)
                        .query(`
                            INSERT INTO tour_days (tour_id, day_number, title, description)
                            VALUES (@tourId, @dayNumber, @title, @description)
                        `);
                }
            }

            // Update services
            await transaction.request()
                .input('tourId', id)
                .query('DELETE FROM tour_services WHERE tour_id = @tourId');

            if (tourData.services) {
                // Insert included services
                for (const [service, included] of Object.entries(tourData.services.included)) {
                    if (included) {
                        await transaction.request()
                            .input('tourId', id)
                            .input('serviceName', service)
                            .query(`
                                INSERT INTO tour_services (tour_id, service_name, is_included)
                                VALUES (@tourId, @serviceName, 1)
                            `);
                    }
                }

                // Insert excluded services
                for (const [service, excluded] of Object.entries(tourData.services.excluded)) {
                    if (excluded) {
                        await transaction.request()
                            .input('tourId', id)
                            .input('serviceName', service)
                            .query(`
                                INSERT INTO tour_services (tour_id, service_name, is_included)
                                VALUES (@tourId, @serviceName, 0)
                            `);
                    }
                }
            }

            return true;
        });
    }

    static async delete(id) {
        return await DatabaseService.transaction(async (transaction) => {
            // Delete related records
            await transaction.request()
                .input('tourId', id)
                .query('DELETE FROM tour_days WHERE tour_id = @tourId');

            await transaction.request()
                .input('tourId', id)
                .query('DELETE FROM tour_services WHERE tour_id = @tourId');

            // Delete tour
            await transaction.request()
                .input('id', id)
                .query('DELETE FROM tours WHERE id = @id');

            return true;
        });
    }
}

export default Tour;