// Tour form functionality
let dayCounter = 0;

document.addEventListener('DOMContentLoaded', function() {
    // Initialize form
    initializeForm();
    
    // Add first day by default
    addNewDay();
});

// Initialize form
function initializeForm() {
    // Load data from tour-data.js
    loadCategories();
    loadOperators();
}

// Load categories
function loadCategories() {
    const categories = [
        { id: 'domestic', name: 'Yurtiçi Tur' },
        { id: 'international', name: 'Yurtdışı Tur' },
        { id: 'cultural', name: 'Kültür Turu' },
        { id: 'fair', name: 'Fuar Turu' }
    ];

    const select = document.querySelector('select[name="category"]');
    if (select) {
        select.innerHTML = '<option value="">Seçiniz...</option>' +
            categories.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('');
    }
}

// Load operators
function loadOperators() {
    const operators = [
        { id: 'istya', name: 'İstya Tur' },
        { id: 'pronto', name: 'Pronto Tour' }
    ];

    const select = document.querySelector('select[name="operator"]');
    if (select) {
        select.innerHTML = '<option value="">Seçiniz...</option>' +
            operators.map(op => `<option value="${op.id}">${op.name}</option>`).join('');
    }
}

// Add new day
function addNewDay() {
    dayCounter++;
    const daysContainer = document.getElementById('daysContainer');
    
    const dayDiv = document.createElement('div');
    dayDiv.className = 'card mb-3';
    dayDiv.id = `day-${dayCounter}`;
    
    dayDiv.innerHTML = `
        <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">${dayCounter}. Gün</h5>
            <button type="button" class="btn btn-outline-danger btn-sm" onclick="removeDay(${dayCounter})">
                <i class="bi bi-trash"></i>
            </button>
        </div>
        <div class="card-body">
            <div class="mb-3">
                <label class="form-label">Başlık</label>
                <input type="text" class="form-control" name="day-${dayCounter}-title" required>
            </div>
            <div class="mb-3">
                <label class="form-label">Açıklama</label>
                <textarea class="form-control" name="day-${dayCounter}-description" rows="3" required></textarea>
            </div>
            <div class="mb-3">
                <label class="form-label">Resimler</label>
                <input type="file" class="form-control" name="day-${dayCounter}-images" multiple accept="image/*">
            </div>
        </div>
    `;
    
    daysContainer.appendChild(dayDiv);
}

// Remove day
function removeDay(dayNumber) {
    const dayElement = document.getElementById(`day-${dayNumber}`);
    if (dayElement && dayCounter > 1) {
        dayElement.remove();
        updateDayNumbers();
    }
}

// Update day numbers
function updateDayNumbers() {
    const days = document.querySelectorAll('#daysContainer .card');
    days.forEach((day, index) => {
        const header = day.querySelector('.card-header h5');
        header.textContent = `${index + 1}. Gün`;
    });
    dayCounter = days.length;
}

// Handle form submission
function handleSubmit(event) {
    event.preventDefault();
    
    // Collect form data
    const formData = new FormData(event.target);
    const tourData = {
        basicInfo: {
            name: formData.get('tourName'),
            category: formData.get('category'),
            operator: formData.get('operator'),
            startDate: formData.get('startDate'),
            endDate: formData.get('endDate'),
            status: formData.get('status'),
            showOnHomepage: formData.get('showOnHomepage') === 'on'
        },
        days: collectDaysData(),
        prices: {
            double: formData.get('priceDouble'),
            single: formData.get('priceSingle'),
            triple: formData.get('priceTriple'),
            child1: formData.get('priceChild1'),
            child2: formData.get('priceChild2')
        },
        services: {
            included: {
                transfer: formData.get('includeTransfer') === 'on',
                breakfast: formData.get('includeBreakfast') === 'on',
                guide: formData.get('includeGuide') === 'on'
            },
            excluded: {
                visa: formData.get('excludeVisa') === 'on',
                tips: formData.get('excludeTips') === 'on',
                extraTours: formData.get('excludeExtraTours') === 'on'
            }
        },
        notes: formData.get('notes'),
        contract: formData.get('contract')
    };

    // Save tour data
    console.log('Tour data:', tourData);
    
    // Redirect to tours list
    window.location.href = 'tours.html';
    return false;
}

// Collect data from all days
function collectDaysData() {
    const days = [];
    const dayElements = document.querySelectorAll('#daysContainer .card');
    
    dayElements.forEach((day, index) => {
        days.push({
            dayNumber: index + 1,
            title: day.querySelector(`input[name^="day-"][name$="-title"]`).value,
            description: day.querySelector(`textarea[name^="day-"][name$="-description"]`).value,
            images: Array.from(day.querySelector(`input[name^="day-"][name$="-images"]`).files)
        });
    });
    
    return days;
}