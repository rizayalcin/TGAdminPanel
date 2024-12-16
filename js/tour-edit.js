// Tour edit page functionality
let dayCounter = 0;

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Load tour data if we're editing
    const urlParams = new URLSearchParams(window.location.search);
    const tourId = urlParams.get('id');
    if (tourId) {
        loadTourData(tourId);
    }

    // Initialize first day
    addNewDay();

    // Load guides
    loadGuides();
});

// Load guides
function loadGuides() {
    const guides = [
        { id: 1, name: 'Mehmet Yılmaz' },
        { id: 2, name: 'Ayşe Kaya' },
        { id: 3, name: 'Ali Demir' }
    ];

    const select = document.getElementById('tourGuide');
    guides.forEach(guide => {
        const option = document.createElement('option');
        option.value = guide.id;
        option.textContent = guide.name;
        select.appendChild(option);
    });
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
        // Renumber remaining days
        updateDayNumbers();
    }
}

// Update day numbers after removal
function updateDayNumbers() {
    const days = document.querySelectorAll('#daysContainer .card');
    days.forEach((day, index) => {
        const header = day.querySelector('.card-header h5');
        header.textContent = `${index + 1}. Gün`;
    });
    dayCounter = days.length;
}

// Handle form submission
function handleEditSubmit(event) {
    event.preventDefault();
    
    // Collect form data
    const formData = {
        id: document.getElementById('tourId').value,
        name: document.getElementById('tourName').value,
        status: document.getElementById('status').value,
        startDate: document.getElementById('startDate').value,
        endDate: document.getElementById('endDate').value,
        guide: document.getElementById('tourGuide').value,
        prices: {
            double: document.getElementById('priceDouble').value,
            single: document.getElementById('priceSingle').value,
            triple: document.getElementById('priceTriple').value,
            child1: document.getElementById('priceChild1').value,
            child2: document.getElementById('priceChild2').value
        },
        location: {
            theme: document.getElementById('theme').value,
            region: document.getElementById('region').value,
            subRegion: document.getElementById('subRegion').value,
            country: document.getElementById('country').value,
            city: document.getElementById('city').value
        },
        services: {
            included: {
                transfer: document.getElementById('includeTransfer').checked,
                breakfast: document.getElementById('includeBreakfast').checked,
                guide: document.getElementById('includeGuide').checked
            },
            excluded: {
                visa: document.getElementById('excludeVisa').checked,
                tips: document.getElementById('excludeTips').checked,
                extraTours: document.getElementById('excludeExtraTours').checked
            }
        },
        notes: document.getElementById('notes').value,
        days: collectDaysData()
    };

    // Here you would typically send this data to your backend
    console.log('Updated tour data:', formData);
    
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