// Form utilities for tour management
function populateSelect(selectId, data, defaultText = 'Seçiniz...') {
    const select = document.getElementById(selectId);
    if (select) {
        select.innerHTML = `<option value="">${defaultText}</option>` +
            data.map(item => `<option value="${item.id}">${item.name}</option>`).join('');
    }
}

function populateLocationSelects() {
    // Populate theme select
    populateSelect('theme', tourData.themes, 'Tema Seçiniz...');

    // Populate region select
    populateSelect('region', tourData.regions, 'Bölge Seçiniz...');

    // Populate country select
    populateSelect('country', tourData.countries, 'Ülke Seçiniz...');

    // Add change event listeners
    const regionSelect = document.getElementById('region');
    if (regionSelect) {
        regionSelect.addEventListener('change', function() {
            updateSubRegions(this.value);
        });
    }

    const countrySelect = document.getElementById('country');
    if (countrySelect) {
        countrySelect.addEventListener('change', function() {
            updateCities(this.value);
        });
    }
}

function updateSubRegions(regionId) {
    const subRegionSelect = document.getElementById('subRegion');
    if (subRegionSelect) {
        const subRegions = tourData.subRegions[regionId] || [];
        subRegionSelect.innerHTML = '<option value="">Alt Bölge Seçiniz...</option>' +
            subRegions.map(subRegion => 
                `<option value="${subRegion.id}">${subRegion.name}</option>`
            ).join('');
    }
}

function updateCities(countryId) {
    const citySelect = document.getElementById('city');
    if (citySelect) {
        const cities = tourData.cities[countryId] || [];
        citySelect.innerHTML = '<option value="">Şehir Seçiniz...</option>' +
            cities.map(city => 
                `<option value="${city.id}">${city.name}</option>`
            ).join('');
    }
}