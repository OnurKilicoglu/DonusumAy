
// Mock Data
const mockListings = [
    {
        id: 1,
        title: "Kadıköy Kentsel Dönüşüm Projesi",
        type: "kentsel-donusum",
        city: "istanbul",
        district: "kadikoy",
        address: "Kadıköy, İstanbul",
        area: 1500,
        expectedUnits: 24,
        status: "open",
        date: "2024-12-15",
        description: "15 katlı modern konut kompleksi için kentsel dönüşüm projesi. Metro ve deniz ulaşımına yakın konumda.",
        images: [
            "https://placehold.co/400x250/e2e8f0/64748b?text=Proje+Görseli+1",
            "https://placehold.co/400x250/e2e8f0/64748b?text=Proje+Görseli+2",
            "https://placehold.co/400x250/e2e8f0/64748b?text=Proje+Görseli+3"
        ],
        features: ["Metro Yakını", "Deniz Manzarası", "Otopark", "Güvenlik"]
    },
    {
        id: 2,
        title: "Çankaya Arsa Değerlendirme",
        type: "arsa-degerlendirme",
        city: "ankara",
        district: "cankaya",
        address: "Çankaya, Ankara",
        area: 800,
        expectedUnits: 12,
        status: "bidding",
        date: "2024-12-14",
        description: "Merkezi konumda ticari ve konut karışımı proje değerlendirmesi.",
        images: [
            "https://placehold.co/400x250/e2e8f0/64748b?text=Arsa+Görseli+1",
            "https://placehold.co/400x250/e2e8f0/64748b?text=Arsa+Görseli+2",
            "https://placehold.co/400x250/e2e8f0/64748b?text=Arsa+Görseli+3"
        ],
        features: ["Merkezi Konum", "Karma Kullanım", "Yatırım Fırsatı"]
    },
    {
        id: 3,
        title: "Bornova Bina Güçlendirme",
        type: "bina-yenileme",
        city: "izmir",
        district: "bornova",
        address: "Bornova, İzmir",
        area: 600,
        expectedUnits: 8,
        status: "open",
        date: "2024-12-13",
        description: "Mevcut binanın deprem güçlendirmesi ve kapsamlı yenileme projesi.",
        images: [
            "https://placehold.co/400x250/e2e8f0/64748b?text=Bina+Yenileme+1",
            "https://placehold.co/400x250/e2e8f0/64748b?text=Bina+Yenileme+2",
            "https://placehold.co/400x250/e2e8f0/64748b?text=Bina+Yenileme+3"
        ],
        features: ["Deprem Güvenliği", "Enerji Verimliliği", "Modern Tasarım"]
    },
    {
        id: 4,
        title: "Beşiktaş Kat Karşılığı",
        type: "kat-karsiligi",
        city: "istanbul",
        district: "besiktas",
        address: "Beşiktaş, İstanbul",
        area: 450,
        expectedUnits: 6,
        status: "open",
        date: "2024-12-12",
        description: "İstanbul Boğazı manzaralı kat karşılığı inşaat projesi.",
        images: [
            "https://placehold.co/400x250/e2e8f0/64748b?text=Boğaz+Manzarası+1",
            "https://placehold.co/400x250/e2e8f0/64748b?text=Boğaz+Manzarası+2",
            "https://placehold.co/400x250/e2e8f0/64748b?text=Boğaz+Manzarası+3"
        ],
        features: ["Boğaz Manzarası", "Lüks Konum", "Tarihi Çevre"]
    },
    {
        id: 5,
        title: "Şişli Kentsel Dönüşüm",
        type: "kentsel-donusum",
        city: "istanbul",
        district: "sisli",
        address: "Şişli, İstanbul",
        area: 2200,
        expectedUnits: 36,
        status: "open",
        date: "2024-12-11",
        description: "Şişli merkezde büyük ölçekli kentsel dönüşüm projesi.",
        images: [
            "https://placehold.co/400x250/e2e8f0/64748b?text=Kentsel+Dönüşüm+1",
            "https://placehold.co/400x250/e2e8f0/64748b?text=Kentsel+Dönüşüm+2",
            "https://placehold.co/400x250/e2e8f0/64748b?text=Kentsel+Dönüşüm+3"
        ],
        features: ["AVM Yakını", "İş Merkezi", "Ulaşım Hub'ı"]
    },
    {
        id: 6,
        title: "Keçiören Arsa Projesi",
        type: "arsa-degerlendirme",
        city: "ankara",
        district: "kecioren",
        address: "Keçiören, Ankara",
        area: 1200,
        expectedUnits: 18,
        status: "bidding",
        date: "2024-12-10",
        description: "Yeni gelişen bölgede arsa değerlendirme ve konut projesi.",
        images: [
            "https://placehold.co/400x250/e2e8f0/64748b?text=Yeni+Proje+1",
            "https://placehold.co/400x250/e2e8f0/64748b?text=Yeni+Proje+2",
            "https://placehold.co/400x250/e2e8f0/64748b?text=Yeni+Proje+3"
        ],
        features: ["Gelişen Bölge", "Yatırım Potansiyeli", "Genç Nüfus"]
    }
];

const cities = {
    istanbul: ["Kadıköy", "Beşiktaş", "Şişli", "Bakırköy", "Üsküdar"],
    ankara: ["Çankaya", "Keçiören", "Yenimahalle", "Mamak", "Sincan"],
    izmir: ["Bornova", "Konak", "Karşıyaka", "Buca", "Balçova"],
    bursa: ["Osmangazi", "Nilüfer", "Yıldırım", "Gemlik", "İnegöl"],
    antalya: ["Muratpaşa", "Kepez", "Konyaaltı", "Aksu", "Döşemealtı"]
};

let filteredListings = [...mockListings];
let currentPage = 1;
const itemsPerPage = 6;

// Kullanıcının geldiği paneli belirlemek için URL parametrelerini kontrol eden fonksiyon
function checkUserPanel() {
    const urlParams = new URLSearchParams(window.location.search);
    const userPanel = urlParams.get('from');

    // Ana sayfa linklerini güncelle (hem navigasyondaki hem footerdaki)
    const homeLinks = document.querySelectorAll('a[href="./index.html"], a[href="index.html"]');
    if (userPanel) {
        homeLinks.forEach(link => {
            switch (userPanel) {
                case 'customer':
                    link.href = 'customer-dashboard.html';
                    break;
                case 'contractor':
                    link.href = 'contractor-dashboard.html';
                    break;
                case 'architect':
                    link.href = 'architect-dashboard.html';
                    break;
                case 'notary':
                    link.href = 'notary-dashboard.html';
                    break;
                default:
                    link.href = './index.html';
            }
        });
    }

    // Dashboard linkini güncelle
    const backToDashboard = document.getElementById('back-to-dashboard');
    if (userPanel && backToDashboard) {
        switch (userPanel) {
            case 'customer':
                backToDashboard.href = 'customer-dashboard.html';
                break;
            case 'contractor':
                backToDashboard.href = 'contractor-dashboard.html';
                break;
            case 'architect':
                backToDashboard.href = 'architect-dashboard.html';
                break;
            case 'notary':
                backToDashboard.href = 'notary-dashboard.html';
                break;
            default:
                backToDashboard.href = './index.html';
        }
    }

    // Daire İlanları linkini güncelle
    const apartmentListingsLink = document.getElementById('apartment-listings-link');
    if (userPanel && apartmentListingsLink) {
        apartmentListingsLink.href = `daire-ilanlari.html?from=${userPanel}`;
    }

    // Customer için İlanlarım linkini gizle
    if (userPanel === 'customer') {
        const myListingsLink = document.getElementById('my-listings-link');
        if (myListingsLink) {
            myListingsLink.style.display = 'none';
        }
    }
}

// Sayfa yüklendiğinde fonksiyonu çağır
document.addEventListener('DOMContentLoaded', function () {
    checkUserPanel();
    updateDistrictOptions();
    setupRangeSliders();
    renderListings();
    updateTotalCount();

    // Event listeners
    document.getElementById('city').addEventListener('change', updateDistrictOptions);
    document.getElementById('sort-by').addEventListener('change', applySorting);

    // Range slider listeners
    document.getElementById('min-area').addEventListener('input', updateAreaDisplay);
    document.getElementById('max-area').addEventListener('input', updateAreaDisplay);
});

// District options update
function updateDistrictOptions() {
    const citySelect = document.getElementById('city');
    const districtSelect = document.getElementById('district');
    const selectedCity = citySelect.value;

    districtSelect.innerHTML = '<option value="">Tüm İlçeler</option>';

    if (selectedCity && cities[selectedCity]) {
        cities[selectedCity].forEach(district => {
            const option = document.createElement('option');
            option.value = district.toLowerCase().replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ş/g, 's').replace(/ü/g, 'u');
            option.textContent = district;
            districtSelect.appendChild(option);
        });
    }
}

// Range slider setup
function setupRangeSliders() {
    updateAreaDisplay();
}

function updateAreaDisplay() {
    const minArea = document.getElementById('min-area').value;
    const maxArea = document.getElementById('max-area').value;

    document.getElementById('min-area-value').textContent = minArea;
    document.getElementById('max-area-value').textContent = maxArea;

    // Ensure min is not greater than max
    if (parseInt(minArea) > parseInt(maxArea)) {
        document.getElementById('max-area').value = minArea;
        document.getElementById('max-area-value').textContent = minArea;
    }
}

// Filter functions
function applyFilters() {
    const city = document.getElementById('city').value;
    const district = document.getElementById('district').value;
    const minArea = parseInt(document.getElementById('min-area').value);
    const maxArea = parseInt(document.getElementById('max-area').value);

    // Get checked project types
    const projectTypes = [];
    document.querySelectorAll('input[type="checkbox"][id*="kentsel"], input[type="checkbox"][id*="arsa"], input[type="checkbox"][id*="bina"], input[type="checkbox"][id*="kat"]').forEach(checkbox => {
        if (checkbox.checked) {
            projectTypes.push(checkbox.value);
        }
    });

    // Get checked unit ranges
    const unitRanges = [];
    document.querySelectorAll('input[type="checkbox"][id*="units"]').forEach(checkbox => {
        if (checkbox.checked) {
            unitRanges.push(checkbox.value);
        }
    });

    // Get checked status
    const statuses = [];
    document.querySelectorAll('input[type="checkbox"][id*="status"]').forEach(checkbox => {
        if (checkbox.checked) {
            statuses.push(checkbox.value);
        }
    });

    // Get checked date ranges
    const dateRanges = [];
    document.querySelectorAll('input[type="checkbox"][id*="date"]').forEach(checkbox => {
        if (checkbox.checked) {
            dateRanges.push(checkbox.value);
        }
    });

    // Apply filters
    filteredListings = mockListings.filter(listing => {
        // City filter
        if (city && listing.city !== city) return false;

        // District filter
        if (district && listing.district !== district) return false;

        // Area filter
        if (listing.area < minArea || listing.area > maxArea) return false;

        // Project type filter
        if (projectTypes.length > 0 && !projectTypes.includes(listing.type)) return false;

        // Unit range filter
        if (unitRanges.length > 0) {
            const units = listing.expectedUnits;
            let matchesUnitRange = false;

            unitRanges.forEach(range => {
                if (range === '1-5' && units >= 1 && units <= 5) matchesUnitRange = true;
                if (range === '6-15' && units >= 6 && units <= 15) matchesUnitRange = true;
                if (range === '16-30' && units >= 16 && units <= 30) matchesUnitRange = true;
                if (range === '30+' && units > 30) matchesUnitRange = true;
            });

            if (!matchesUnitRange) return false;
        }

        // Status filter
        if (statuses.length > 0 && !statuses.includes(listing.status)) return false;

        // Date filter (simplified - in real app would check actual dates)
        if (dateRanges.length > 0) {
            // For demo purposes, always return true for date filters
            // In real implementation, compare with actual listing dates
        }

        return true;
    });

    currentPage = 1;
    renderListings();
    updateTotalCount();
    showNotification(`${filteredListings.length} ilan bulundu.`, 'success');
}

function clearAllFilters() {
    // Clear all form elements
    document.getElementById('city').value = '';
    document.getElementById('district').value = '';
    document.getElementById('min-area').value = '0';
    document.getElementById('max-area').value = '5000';

    // Clear all checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });

    // Reset status to open by default
    document.getElementById('status-open').checked = true;

    updateDistrictOptions();
    updateAreaDisplay();

    filteredListings = [...mockListings];
    currentPage = 1;
    renderListings();
    updateTotalCount();
    showNotification('Filtreler temizlendi.', 'info');
}

// Sorting
function applySorting() {
    const sortBy = document.getElementById('sort-by').value;

    switch (sortBy) {
        case 'date-desc':
            filteredListings.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'date-asc':
            filteredListings.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
        case 'area-desc':
            filteredListings.sort((a, b) => b.area - a.area);
            break;
        case 'area-asc':
            filteredListings.sort((a, b) => a.area - b.area);
            break;
        case 'units-desc':
            filteredListings.sort((a, b) => b.expectedUnits - a.expectedUnits);
            break;
        case 'units-asc':
            filteredListings.sort((a, b) => a.expectedUnits - b.expectedUnits);
            break;
    }

    renderListings();
}

// Render functions
function renderListings() {
    const grid = document.getElementById('listings-grid');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageListings = filteredListings.slice(startIndex, endIndex);

    grid.innerHTML = pageListings.map(listing => `
                <div class="property-card bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div class="relative">
                        <div class="slider-container" id="slider-${listing.id}">
                            <div class="slider">
                                ${listing.images.map(img => `
                                    <img src="${img}" alt="${listing.title}" loading="lazy">
                                `).join('')}
                            </div>
                            <div class="slider-nav">
                                ${listing.images.map((_, index) => `
                                    <div class="slider-dot ${index === 0 ? 'active' : ''}" onclick="moveToSlide(${listing.id}, ${index})"></div>
                                `).join('')}
                            </div>
                            <div class="slider-arrow prev" onclick="moveSlide(${listing.id}, -1)">
                                <i class="fas fa-chevron-left"></i>
                            </div>
                            <div class="slider-arrow next" onclick="moveSlide(${listing.id}, 1)">
                                <i class="fas fa-chevron-right"></i>
                            </div>
                        </div>
                        <div class="absolute top-4 left-4">
                            <span class="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                                ${getTypeText(listing.type)}
                            </span>
                        </div>
                        <div class="absolute top-4 right-4">
                            <span class="bg-${getStatusColor(listing.status)}-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                                ${getStatusText(listing.status)}
                            </span>
                        </div>
                    </div>
                    <div class="p-6">
                        <h3 class="text-lg font-semibold text-gray-800 mb-2">${listing.title}</h3>
                        <p class="text-gray-600 text-sm mb-3">
                            <i class="fas fa-map-marker-alt mr-1"></i>
                            ${listing.address}
                        </p>
                        <p class="text-gray-600 text-sm mb-4">${listing.description}</p>
                        
                        <div class="space-y-2 mb-4">
                            <div class="flex justify-between text-sm">
                                <span class="text-gray-600">Arsa Alanı:</span>
                                <span class="font-medium text-gray-800">${listing.area} m²</span>
                            </div>
                            <div class="flex justify-between text-sm">
                                <span class="text-gray-600">Beklenen Daire:</span>
                                <span class="font-medium text-gray-800">${listing.expectedUnits} adet</span>
                            </div>
                        </div>
                        
                        <div class="flex flex-wrap gap-2 mb-4">
                            ${listing.features.map(feature => `
                                <span class="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">${feature}</span>
                            `).join('')}
                        </div>
                        
                        <div class="flex justify-between items-center">
                            <span class="text-xs text-gray-500">${formatDate(listing.date)}</span>
                            <button onclick="viewDetails(${listing.id})" class="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700 transition-colors duration-200">
                                Detayları Gör
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');

    renderPagination();
    initializeSliders(); // Initialize sliders after rendering
}

function renderPagination() {
    const pagination = document.getElementById('pagination');
    const totalPages = Math.ceil(filteredListings.length / itemsPerPage);

    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }

    let paginationHTML = '';

    // Previous button
    if (currentPage > 1) {
        paginationHTML += `
                    <button onclick="changePage(${currentPage - 1})" class="px-3 py-2 text-sm text-gray-500 hover:text-purple-600 transition-colors duration-200">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                `;
    }

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === currentPage) {
            paginationHTML += `
                        <button class="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg">${i}</button>
                    `;
        } else {
            paginationHTML += `
                        <button onclick="changePage(${i})" class="px-4 py-2 text-sm text-gray-700 hover:text-purple-600 transition-colors duration-200">${i}</button>
                    `;
        }
    }

    // Next button
    if (currentPage < totalPages) {
        paginationHTML += `
                    <button onclick="changePage(${currentPage + 1})" class="px-3 py-2 text-sm text-gray-500 hover:text-purple-600 transition-colors duration-200">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                `;
    }

    pagination.innerHTML = `<div class="flex items-center space-x-2">${paginationHTML}</div>`;
}

function changePage(page) {
    currentPage = page;
    renderListings();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateTotalCount() {
    document.getElementById('total-listings').textContent = filteredListings.length;
}

// Utility functions
function getTypeText(type) {
    const types = {
        'kentsel-donusum': 'Kentsel Dönüşüm',
        'arsa-degerlendirme': 'Arsa Değerlendirme',
        'bina-yenileme': 'Bina Yenileme',
        'kat-karsiligi': 'Kat Karşılığı'
    };
    return types[type] || type;
}

function getStatusText(status) {
    const statuses = {
        'open': 'Açık',
        'bidding': 'Teklif Alınıyor',
        'closed': 'Kapalı'
    };
    return statuses[status] || status;
}

function getStatusColor(status) {
    const colors = {
        'open': 'green',
        'bidding': 'yellow',
        'closed': 'red'
    };
    return colors[status] || 'gray';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function viewDetails(listingId) {
    window.location.href = `ilan-detay.html?id=${listingId}`;
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    const colors = {
        'info': 'bg-blue-500',
        'success': 'bg-green-500',
        'error': 'bg-red-500',
        'warning': 'bg-yellow-500'
    };

    notification.className = `fixed top-4 right-4 z-50 ${colors[type]} text-white px-6 py-4 rounded-lg shadow-lg max-w-sm transform translate-x-full transition-transform duration-300`;
    notification.innerHTML = `
                <div class="flex items-center justify-between">
                    <span>${message}</span>
                    <button onclick="this.parentElement.parentElement.remove()" class="ml-2 text-white hover:text-gray-200">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;

    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);

    // Auto remove
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Slider functions
function moveSlide(listingId, direction) {
    const slider = document.querySelector(`#slider-${listingId} .slider`);
    const dots = document.querySelectorAll(`#slider-${listingId} .slider-dot`);
    const currentIndex = parseInt(slider.getAttribute('data-index') || '0');
    const totalSlides = dots.length;

    let newIndex = currentIndex + direction;

    if (newIndex < 0) newIndex = totalSlides - 1;
    if (newIndex >= totalSlides) newIndex = 0;

    updateSlider(listingId, newIndex);
}

function moveToSlide(listingId, index) {
    updateSlider(listingId, index);
}

function updateSlider(listingId, index) {
    const slider = document.querySelector(`#slider-${listingId} .slider`);
    const dots = document.querySelectorAll(`#slider-${listingId} .slider-dot`);

    slider.style.transform = `translateX(-${index * 100}%)`;
    slider.setAttribute('data-index', index);

    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Initialize sliders after rendering
function initializeSliders() {
    const sliders = document.querySelectorAll('.slider');
    sliders.forEach(slider => {
        slider.setAttribute('data-index', '0');
    });
}

// Check user type from URL parameter and adjust navigation
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const userType = urlParams.get('from');

    // Set back to dashboard link
    const backToDashboard = document.getElementById('back-to-dashboard');
    const myListingsLink = document.getElementById('my-listings-link');
    const projectDesignLink = document.getElementById('project-design-link');

    if (userType === 'architect') {
        backToDashboard.href = 'architect-dashboard.html';
        myListingsLink.classList.add('hidden'); // Hide "İlanlarım" for architects
        projectDesignLink.classList.remove('hidden'); // Show "Proje Çizim İlanları" for architects
    } else if (userType === 'customer') {
        backToDashboard.href = 'customer-dashboard.html';
        myListingsLink.classList.add('hidden'); // Hide "İlanlarım" for customers
        projectDesignLink.classList.add('hidden'); // Hide "Proje Çizim İlanları" for customers
    } else if (userType === 'notary') {
        backToDashboard.href = 'notary-dashboard.html';
        myListingsLink.classList.add('hidden'); // Hide "İlanlarım" for notaries
        projectDesignLink.classList.add('hidden'); // Hide "Proje Çizim İlanları" for notaries
    } else {
        backToDashboard.href = 'contractor-dashboard.html';
        myListingsLink.classList.remove('hidden'); // Show "İlanlarım" for contractors
        projectDesignLink.classList.add('hidden'); // Hide "Proje Çizim İlanları" for contractors
    }
});

tailwind.config = {
    theme: {
        extend: {
            colors: {
                'primary': '#5A00A8',
                'primary-light': '#8B00FF',
                'primary-dark': '#4B0082',
                'accent': '#28a745'
            }
        }
    }
}
