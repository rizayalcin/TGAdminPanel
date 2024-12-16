// Sidebar initialization
document.addEventListener('DOMContentLoaded', function() {
    const sidebarContainer = document.getElementById('sidebar-container');
    if (sidebarContainer) {
        sidebarContainer.innerHTML = `
            <div class="sidebar">
                <div class="position-sticky">
                    <div class="text-center mb-4">
                        <h5 class="text-primary">Tur Yönetim Paneli</h5>
                    </div>
                    <ul class="nav flex-column">
                        <li class="nav-item">
                            <a class="nav-link" href="/index.html">
                                <i class="bi bi-house-door me-2"></i>
                                Dashboard
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#tourSubmenu" data-bs-toggle="collapse">
                                <i class="bi bi-calendar-event me-2"></i>
                                Turlar
                                <i class="bi bi-chevron-down float-end"></i>
                            </a>
                            <div class="collapse" id="tourSubmenu">
                                <ul class="nav flex-column ms-3">
                                    <li class="nav-item">
                                        <a class="nav-link py-2" href="/tours/tours.html">
                                            <i class="bi bi-list me-2"></i>
                                            Tur Listesi
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link py-2" href="/tours/guides.html">
                                            <i class="bi bi-person-badge me-2"></i>
                                            Rehberler
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link py-2" href="/tours/locations.html">
                                            <i class="bi bi-geo-alt me-2"></i>
                                            Bölgeler ve Şehirler
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link py-2" href="/tours/themes.html">
                                            <i class="bi bi-tags me-2"></i>
                                            Temalar
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#integrationsSubmenu" data-bs-toggle="collapse">
                                <i class="bi bi-box-arrow-in-down me-2"></i>
                                Entegrasyonlar
                                <i class="bi bi-chevron-down float-end"></i>
                            </a>
                            <div class="collapse" id="integrationsSubmenu">
                                <ul class="nav flex-column ms-3">
                                    <li class="nav-item">
                                        <a class="nav-link py-2" href="/integrations/istya.html">
                                            <i class="bi bi-box-arrow-in-right me-2"></i>
                                            İstya Tur
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link py-2" href="/integrations/pronto.html">
                                            <i class="bi bi-box-arrow-in-right me-2"></i>
                                            Pronto Tour
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/tools/tools.html">
                                <i class="bi bi-tools me-2"></i>
                                Araçlar
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">
                                <i class="bi bi-people me-2"></i>
                                Müşteriler
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">
                                <i class="bi bi-bookmark-star me-2"></i>
                                Rezervasyonlar
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">
                                <i class="bi bi-gear me-2"></i>
                                Ayarlar
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        `;

        // Set active link based on current page
        const currentPath = window.location.pathname;
        const links = document.querySelectorAll('.nav-link');
        
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href !== '#' && currentPath.includes(href)) {
                link.classList.add('active');
                // Expand parent submenu if exists
                const submenu = link.closest('.collapse');
                if (submenu) {
                    submenu.classList.add('show');
                }
            }
        });
    }
});