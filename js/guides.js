// Guide management functionality
let guides = [
    { 
        id: 1, 
        name: 'Mehmet Yılmaz', 
        phone: '0532 111 2233', 
        email: 'mehmet@example.com',
        languages: ['tr', 'en'],
        status: 'active'
    },
    { 
        id: 2, 
        name: 'Ayşe Kaya', 
        phone: '0533 222 3344', 
        email: 'ayse@example.com',
        languages: ['tr', 'de', 'en'],
        status: 'active'
    },
    { 
        id: 3, 
        name: 'Ali Demir', 
        phone: '0534 333 4455', 
        email: 'ali@example.com',
        languages: ['tr', 'fr'],
        status: 'inactive'
    }
];

// Load guides
function loadGuides() {
    const tbody = document.getElementById('guidesTableBody');
    if (tbody) {
        tbody.innerHTML = guides.map(guide => `
            <tr data-guide-id="${guide.id}">
                <td>${guide.name}</td>
                <td>${guide.phone}</td>
                <td>${guide.email}</td>
                <td>${formatLanguages(guide.languages)}</td>
                <td>
                    <span class="badge bg-${guide.status === 'active' ? 'success' : 'secondary'}">
                        ${guide.status === 'active' ? 'Aktif' : 'Pasif'}
                    </span>
                </td>
                <td>
                    <button class="btn btn-sm btn-outline-primary" onclick="editGuide(${guide.id})">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteGuide(${guide.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }
}

// Format languages for display
function formatLanguages(languages) {
    const languageNames = {
        tr: 'Türkçe',
        en: 'İngilizce',
        de: 'Almanca',
        fr: 'Fransızca',
        es: 'İspanyolca'
    };
    return languages.map(lang => languageNames[lang]).join(', ');
}

// Save new guide
function saveGuide() {
    const form = document.getElementById('addGuideForm');
    const formData = new FormData(form);
    
    const newGuide = {
        id: guides.length + 1,
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        languages: Array.from(form.querySelector('[name="languages"]').selectedOptions).map(opt => opt.value),
        status: formData.get('status')
    };

    guides.push(newGuide);
    loadGuides();

    // Close modal and reset form
    const modal = bootstrap.Modal.getInstance(document.getElementById('addGuideModal'));
    modal.hide();
    form.reset();
}

// Edit guide
function editGuide(id) {
    const guide = guides.find(g => g.id === id);
    if (guide) {
        const form = document.getElementById('editGuideForm');
        form.querySelector('[name="id"]').value = guide.id;
        form.querySelector('[name="name"]').value = guide.name;
        form.querySelector('[name="phone"]').value = guide.phone;
        form.querySelector('[name="email"]').value = guide.email;
        
        // Set selected languages
        const languagesSelect = form.querySelector('[name="languages"]');
        Array.from(languagesSelect.options).forEach(option => {
            option.selected = guide.languages.includes(option.value);
        });
        
        form.querySelector('[name="status"]').value = guide.status;

        const modal = new bootstrap.Modal(document.getElementById('editGuideModal'));
        modal.show();
    }
}

// Update guide
function updateGuide() {
    const form = document.getElementById('editGuideForm');
    const formData = new FormData(form);
    const id = parseInt(formData.get('id'));
    
    const guideIndex = guides.findIndex(g => g.id === id);
    if (guideIndex !== -1) {
        guides[guideIndex] = {
            id,
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            languages: Array.from(form.querySelector('[name="languages"]').selectedOptions).map(opt => opt.value),
            status: formData.get('status')
        };

        loadGuides();

        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('editGuideModal'));
        modal.hide();
    }
}

// Delete guide
function deleteGuide(id) {
    if (confirm('Bu rehberi silmek istediğinizden emin misiniz?')) {
        guides = guides.filter(g => g.id !== id);
        loadGuides();
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', loadGuides);