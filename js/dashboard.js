// Dashboard functionality
function loadDashboardStats() {
    // Mock data for dashboard statistics
    const stats = {
        activeTours: 15,
        totalBookings: 247,
        monthlyRevenue: '₺125,000',
        upcomingTours: 8
    };

    // Update dashboard cards
    document.getElementById('activeTours').textContent = stats.activeTours;
    document.getElementById('totalBookings').textContent = stats.totalBookings;
    document.getElementById('monthlyRevenue').textContent = stats.monthlyRevenue;
    document.getElementById('upcomingTours').textContent = stats.upcomingTours;
}

// Load recent tours for dashboard
function loadRecentTours() {
    const mockRecentTours = [
        { id: 1, name: 'Kapadokya Turu', date: '15.04.2024', bookings: '25/30', revenue: '₺75,000' },
        { id: 2, name: 'Ege Turu', date: '20.04.2024', bookings: '15/40', revenue: '₺56,250' },
        { id: 3, name: 'Karadeniz Turu', date: '01.05.2024', bookings: '40/40', revenue: '₺168,000' }
    ];

    const tbody = document.getElementById('recentToursBody');
    if (tbody) {
        tbody.innerHTML = mockRecentTours.map(tour => `
            <tr>
                <td>${tour.name}</td>
                <td>${tour.date}</td>
                <td>${tour.bookings}</td>
                <td>${tour.revenue}</td>
            </tr>
        `).join('');
    }
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('dashboard-stats')) {
        loadDashboardStats();
        loadRecentTours();
    }
});