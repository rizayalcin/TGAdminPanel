import ApiService from './api-service.js';

// Tour management functionality
async function loadTours() {
    try {
        const tours = await ApiService.getTours();
        const tbody = document.getElementById('toursTableBody');
        
        if (tbody) {
            tbody.innerHTML = tours.map(tour => `
                <tr data-tour-id="${tour.id}">
                    <td>${tour.name}</td>
                    <td>${formatDate(tour.start_date)} - ${formatDate(tour.end_date)}</td>
                    <td>${tour.current_bookings || 0}/${tour.capacity || 0}</td>
                    <td>₺${tour.price_double}</td>
                    <td>${tour.guide_name || 'Atanmadı'}</td>
                    <td>
                        <span class="badge bg-${getStatusBadgeClass(tour.status)}">
                            ${getStatusText(tour.status)}
                        </span>
                    </td>
                    <td>
                        <a href="edit-tour.html?id=${tour.id}" class="btn btn-sm btn-outline-primary">
                            <i class="bi bi-pencil"></i> Düzenle
                        </a>
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteTour(${tour.id})">
                            <i class="bi bi-trash"></i> Sil
                        </button>
                    </td>
                </tr>
            `).join('');
        }
    } catch (error) {
        console.error('Turları yükleme hatası:', error);
        alert('Turlar yüklenirken bir hata oluştu');
    }
}

// Format date
function formatDate(dateStr) {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString('tr-TR');
}

// Get status badge class
function getStatusBadgeClass(status) {
    switch (status) {
        case 'active': return 'success';
        case 'pending': return 'warning';
        case 'cancelled': return 'danger';
        default: return 'secondary';
    }
}

// Get status text
function getStatusText(status) {
    switch (status) {
        case 'active': return 'Aktif';
        case 'pending': return 'Beklemede';
        case 'cancelled': return 'İptal';
        default: return 'Bilinmiyor';
    }
}

// Delete tour
async function deleteTour(id) {
    if (confirm('Bu turu silmek istediğinizden emin misiniz?')) {
        try {
            await ApiService.deleteTour(id);
            await loadTours(); // Listeyi yenile
        } catch (error) {
            console.error('Tur silme hatası:', error);
            alert('Tur silinirken bir hata oluştu');
        }
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', loadTours);