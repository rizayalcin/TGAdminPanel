// Location management functionality
let locations = {
    regions: [
        { id: 1, name: 'Marmara' },
        { id: 2, name: 'Ege' },
        { id: 3, name: 'Akdeniz' },
        { id: 4, name: 'İç Anadolu' },
        { id: 5, name: 'Karadeniz' },
        { id: 6, name: 'Doğu Anadolu' },
        { id: 7, name: 'Güneydoğu Anadolu' }
    ],
    subRegions: [
        { id: 1, name: 'İstanbul', regionId: 1 },
        { id: 2, name: 'İzmir', regionId: 2 },
        { id: 3, name: 'Antalya', regionId: 3 }
    ],
    countries: [
        { id: 1, name: 'Türkiye', regionId: 1 },
        { id: 2, name: 'Yunanistan', regionId: 2 },
        { id: 3, name: 'İtalya', regionId: 3 }
    ],
    cities: [
        { id: 1, name: 'İstanbul', countryId: 1, regionId: 1 },
        { id: 2, name: 'İzmir', countryId: 1, regionId: 2 },
        { id: 3, name: 'Atina', countryId: 2, regionId: 2 }
    ]
};

// Load data functions
function loadRegions() {
    const tbody = document.getElementById('regionsTableBody');
    if (tbody) {
        tbody.innerHTML = locations.regions.map(region => `
            <tr>
                <td>${region.name}</td>
                <td>${locations.subRegions.filter(sr => sr.regionId === region.id).length}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary" onclick="editRegion(${region.id})">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteRegion(${region.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }
}

function loadSubregions() {
    const tbody = document.getElementById('subregionsTableBody');
    if (tbody) {
        tbody.innerHTML = locations.subRegions.map(subregion => {
            const region = locations.regions.find(r => r.id === subregion.regionId);
            return `
                <tr>
                    <td>${subregion.name}</td>
                    <td>${region ? region.name : 'Bilinmiyor'}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary" onclick="editSubregion(${subregion.id})">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteSubregion(${subregion.id})">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }
}

function loadCountries() {
    const tbody = document.getElementById('countriesTableBody');
    if (tbody) {
        tbody.innerHTML = locations.countries.map(country => {
            const region = locations.regions.find(r => r.id === country.regionId);
            return `
                <tr>
                    <td>${country.name}</td>
                    <td>${region ? region.name : 'Bilinmiyor'}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary" onclick="editCountry(${country.id})">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteCountry(${country.id})">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }
}

function loadCities() {
    const tbody = document.getElementById('citiesTableBody');
    if (tbody) {
        tbody.innerHTML = locations.cities.map(city => {
            const country = locations.countries.find(c => c.id === city.countryId);
            const region = locations.regions.find(r => r.id === city.regionId);
            return `
                <tr>
                    <td>${city.name}</td>
                    <td>${country ? country.name : 'Bilinmiyor'}</td>
                    <td>${region ? region.name : 'Bilinmiyor'}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary" onclick="editCity(${city.id})">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteCity(${city.id})">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }
}

// Edit functions
function editRegion(id) {
    const region = locations.regions.find(r => r.id === id);
    if (region) {
        const form = document.getElementById('regionForm');
        form.querySelector('[name="id"]').value = region.id;
        form.querySelector('[name="name"]').value = region.name;

        const modal = new bootstrap.Modal(document.getElementById('regionModal'));
        document.getElementById('regionModalTitle').textContent = 'Bölge Düzenle';
        modal.show();
    }
}

function editSubregion(id) {
    const subregion = locations.subRegions.find(sr => sr.id === id);
    if (subregion) {
        const form = document.getElementById('subregionForm');
        form.querySelector('[name="id"]').value = subregion.id;
        form.querySelector('[name="name"]').value = subregion.name;
        form.querySelector('[name="regionId"]').value = subregion.regionId;

        const modal = new bootstrap.Modal(document.getElementById('subregionModal'));
        document.getElementById('subregionModalTitle').textContent = 'Alt Bölge Düzenle';
        modal.show();
    }
}

function editCountry(id) {
    const country = locations.countries.find(c => c.id === id);
    if (country) {
        const form = document.getElementById('countryForm');
        form.querySelector('[name="id"]').value = country.id;
        form.querySelector('[name="name"]').value = country.name;
        form.querySelector('[name="regionId"]').value = country.regionId;

        const modal = new bootstrap.Modal(document.getElementById('countryModal'));
        document.getElementById('countryModalTitle').textContent = 'Ülke Düzenle';
        modal.show();
    }
}

function editCity(id) {
    const city = locations.cities.find(c => c.id === id);
    if (city) {
        const form = document.getElementById('cityForm');
        form.querySelector('[name="id"]').value = city.id;
        form.querySelector('[name="name"]').value = city.name;
        form.querySelector('[name="countryId"]').value = city.countryId;
        form.querySelector('[name="regionId"]').value = city.regionId;

        const modal = new bootstrap.Modal(document.getElementById('cityModal'));
        document.getElementById('cityModalTitle').textContent = 'Şehir Düzenle';
        modal.show();
    }
}

// Save functions
function saveRegion() {
    const form = document.getElementById('regionForm');
    const formData = new FormData(form);
    const id = formData.get('id');
    
    if (id) {
        // Update existing region
        const index = locations.regions.findIndex(r => r.id === parseInt(id));
        if (index !== -1) {
            locations.regions[index].name = formData.get('name');
        }
    } else {
        // Add new region
        const newRegion = {
            id: locations.regions.length + 1,
            name: formData.get('name')
        };
        locations.regions.push(newRegion);
    }

    loadRegions();
    populateSelects();
    bootstrap.Modal.getInstance(document.getElementById('regionModal')).hide();
    form.reset();
}

function saveSubregion() {
    const form = document.getElementById('subregionForm');
    const formData = new FormData(form);
    const id = formData.get('id');
    
    if (id) {
        // Update existing subregion
        const index = locations.subRegions.findIndex(sr => sr.id === parseInt(id));
        if (index !== -1) {
            locations.subRegions[index] = {
                ...locations.subRegions[index],
                name: formData.get('name'),
                regionId: parseInt(formData.get('regionId'))
            };
        }
    } else {
        // Add new subregion
        const newSubregion = {
            id: locations.subRegions.length + 1,
            name: formData.get('name'),
            regionId: parseInt(formData.get('regionId'))
        };
        locations.subRegions.push(newSubregion);
    }

    loadSubregions();
    bootstrap.Modal.getInstance(document.getElementById('subregionModal')).hide();
    form.reset();
}

function saveCountry() {
    const form = document.getElementById('countryForm');
    const formData = new FormData(form);
    const id = formData.get('id');
    
    if (id) {
        // Update existing country
        const index = locations.countries.findIndex(c => c.id === parseInt(id));
        if (index !== -1) {
            locations.countries[index] = {
                ...locations.countries[index],
                name: formData.get('name'),
                regionId: parseInt(formData.get('regionId'))
            };
        }
    } else {
        // Add new country
        const newCountry = {
            id: locations.countries.length + 1,
            name: formData.get('name'),
            regionId: parseInt(formData.get('regionId'))
        };
        locations.countries.push(newCountry);
    }

    loadCountries();
    populateSelects();
    bootstrap.Modal.getInstance(document.getElementById('countryModal')).hide();
    form.reset();
}

function saveCity() {
    const form = document.getElementById('cityForm');
    const formData = new FormData(form);
    const id = formData.get('id');
    
    if (id) {
        // Update existing city
        const index = locations.cities.findIndex(c => c.id === parseInt(id));
        if (index !== -1) {
            locations.cities[index] = {
                ...locations.cities[index],
                name: formData.get('name'),
                countryId: parseInt(formData.get('countryId')),
                regionId: parseInt(formData.get('regionId'))
            };
        }
    } else {
        // Add new city
        const newCity = {
            id: locations.cities.length + 1,
            name: formData.get('name'),
            countryId: parseInt(formData.get('countryId')),
            regionId: parseInt(formData.get('regionId'))
        };
        locations.cities.push(newCity);
    }

    loadCities();
    bootstrap.Modal.getInstance(document.getElementById('cityModal')).hide();
    form.reset();
}

// Delete functions
function deleteRegion(id) {
    if (confirm('Bu bölgeyi silmek istediğinizden emin misiniz?')) {
        locations.regions = locations.regions.filter(r => r.id !== id);
        locations.subRegions = locations.subRegions.filter(sr => sr.regionId !== id);
        loadRegions();
        loadSubregions();
        populateSelects();
    }
}

function deleteSubregion(id) {
    if (confirm('Bu alt bölgeyi silmek istediğinizden emin misiniz?')) {
        locations.subRegions = locations.subRegions.filter(sr => sr.id !== id);
        loadSubregions();
    }
}

function deleteCountry(id) {
    if (confirm('Bu ülkeyi silmek istediğinizden emin misiniz?')) {
        locations.countries = locations.countries.filter(c => c.id !== id);
        locations.cities = locations.cities.filter(city => city.countryId !== id);
        loadCountries();
        loadCities();
        populateSelects();
    }
}

function deleteCity(id) {
    if (confirm('Bu şehri silmek istediğinizden emin misiniz?')) {
        locations.cities = locations.cities.filter(c => c.id !== id);
        loadCities();
    }
}

// Populate select elements
function populateSelects() {
    // Populate region selects
    const regionSelects = document.querySelectorAll('select[name="regionId"]');
    regionSelects.forEach(select => {
        select.innerHTML = '<option value="">Seçiniz...</option>' +
            locations.regions.map(region => 
                `<option value="${region.id}">${region.name}</option>`
            ).join('');
    });

    // Populate country selects
    const countrySelects = document.querySelectorAll('select[name="countryId"]');
    countrySelects.forEach(select => {
        select.innerHTML = '<option value="">Seçiniz...</option>' +
            locations.countries.map(country => 
                `<option value="${country.id}">${country.name}</option>`
            ).join('');
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    loadRegions();
    loadSubregions();
    loadCountries();
    loadCities();
    populateSelects();
});