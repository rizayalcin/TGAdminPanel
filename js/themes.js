// Theme management functionality
let themes = [
    { 
        id: 1, 
        name: 'Kültür Turu',
        description: 'Tarihi ve kültürel değerleri keşfedin',
        tourCount: 5,
        status: 'active'
    },
    { 
        id: 2, 
        name: 'Doğa ve Macera',
        description: 'Doğa ile iç içe macera dolu turlar',
        tourCount: 3,
        status: 'active'
    },
    { 
        id: 3, 
        name: 'Gastronomi Turu',
        description: 'Yerel lezzetleri keşfedin',
        tourCount: 2,
        status: 'active'
    }
];

// Load themes
function loadThemes() {
    const tbody = document.getElementById('themesTableBody');
    if (tbody) {
        tbody.innerHTML = themes.map(theme => `
            <tr>
                <td>${theme.name}</td>
                <td>${theme.description}</td>
                <td>${theme.tourCount}</td>
                <td>
                    <span class="badge bg-${theme.status === 'active' ? 'success' : 'secondary'}">
                        ${theme.status === 'active' ? 'Aktif' : 'Pasif'}
                    </span>
                </td>
                <td>
                    <button class="btn btn-sm btn-outline-primary" onclick="editTheme(${theme.id})">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteTheme(${theme.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }
}

// Save new theme
function saveTheme() {
    const form = document.getElementById('addThemeForm');
    const formData = new FormData(form);
    
    const newTheme = {
        id: themes.length + 1,
        name: formData.get('name'),
        description: formData.get('description'),
        tourCount: 0,
        status: formData.get('status')
    };

    themes.push(newTheme);
    loadThemes();

    // Close modal and reset form
    const modal = bootstrap.Modal.getInstance(document.getElementById('addThemeModal'));
    modal.hide();
    form.reset();
}

// Edit theme
function editTheme(id) {
    const theme = themes.find(t => t.id === id);
    if (theme) {
        const form = document.getElementById('editThemeForm');
        form.querySelector('[name="id"]').value = theme.id;
        form.querySelector('[name="name"]').value = theme.name;
        form.querySelector('[name="description"]').value = theme.description;
        form.querySelector('[name="status"]').value = theme.status;

        const modal = new bootstrap.Modal(document.getElementById('editThemeModal'));
        modal.show();
    }
}

// Update theme
function updateTheme() {
    const form = document.getElementById('editThemeForm');
    const formData = new FormData(form);
    const id = parseInt(formData.get('id'));
    
    const themeIndex = themes.findIndex(t => t.id === id);
    if (themeIndex !== -1) {
        themes[themeIndex] = {
            ...themes[themeIndex],
            name: formData.get('name'),
            description: formData.get('description'),
            status: formData.get('status')
        };

        loadThemes();

        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('editThemeModal'));
        modal.hide();
    }
}

// Delete theme
function deleteTheme(id) {
    if (confirm('Bu temayı silmek istediğinizden emin misiniz?')) {
        themes = themes.filter(t => t.id !== id);
        loadThemes();
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', loadThemes);