
// Simüle edilmiş ilan verileri
const allListings = [
    {
        id: 1,
        title: "Kadıköy Kentsel Dönüşüm Projesi",
        location: "Kadıköy, İstanbul",
        description: "Merkezi konumda, ulaşım avantajları yüksek kentsel dönüşüm projesi. Modern yaşam alanları ve ticari alan imkanı.",
        projectType: "kentsel-donusum",
        city: "istanbul",
        district: "kadikoy",
        landArea: 1500,
        expectedFlats: 24,
        cashExpectation: 2500000,
        flatShareRatio: 65,
        buildingStatus: "mevcut-bina",
        images: [
            "https://placehold.co/800x600/5A00A8/FFFFFF?text=Kadıköy+Ana+Görsel",
            "https://placehold.co/800x600/8B00FF/FFFFFF?text=Kadıköy+Plan",
            "https://placehold.co/800x600/4B0082/FFFFFF?text=Kadıköy+3D+Görsel",
            "https://placehold.co/800x600/6A1B9A/FFFFFF?text=Kadıköy+Çevre"
        ]
    },
    {
        id: 2,
        title: "Çankaya Arsa Değerlendirme",
        location: "Çankaya, Ankara",
        description: "Yüksek değerli bölgede arsa değerlendirme fırsatı. Güvenli yatırım ve yüksek getiri potansiyeli.",
        projectType: "arsa-degerlendirme",
        city: "ankara",
        district: "cankaya",
        landArea: 800,
        expectedFlats: 12,
        cashExpectation: 1200000,
        flatShareRatio: 50,
        buildingStatus: "bos-arsa",
        images: [
            "https://placehold.co/800x600/5A00A8/FFFFFF?text=Çankaya+Arsa",
            "https://placehold.co/800x600/8B00FF/FFFFFF?text=Çankaya+Harita",
            "https://placehold.co/800x600/4B0082/FFFFFF?text=Çankaya+İmar+Planı"
        ]
    },
    {
        id: 3,
        title: "Bornova Bina Güçlendirme Projesi",
        location: "Bornova, İzmir",
        description: "Mevcut binanın güçlendirilmesi ve modern yaşam standartlarına kavuşturulması projesi.",
        projectType: "bina-yenileme",
        city: "izmir",
        district: "bornova",
        landArea: 600,
        expectedFlats: 8,
        cashExpectation: 800000,
        flatShareRatio: 45,
        buildingStatus: "riskli-yapi",
        images: [
            "https://placehold.co/800x600/5A00A8/FFFFFF?text=Bornova+Mevcut",
            "https://placehold.co/800x600/8B00FF/FFFFFF?text=Bornova+Güçlendirme",
            "https://placehold.co/800x600/4B0082/FFFFFF?text=Bornova+Yeni+Hali",
            "https://placehold.co/800x600/6A1B9A/FFFFFF?text=Bornova+Detay"
        ]
    },
    {
        id: 4,
        title: "Beşiktaş Kat Karşılığı Projesi",
        location: "Beşiktaş, İstanbul",
        description: "Prestijli bölgede kat karşılığı inşaat projesi. Yüksek kalite ve premium lokasyon avantajı.",
        projectType: "kat-karsiligi",
        city: "istanbul",
        district: "besiktas",
        landArea: 1200,
        expectedFlats: 18,
        cashExpectation: 3200000,
        flatShareRatio: 70,
        buildingStatus: "mevcut-bina",
        images: [
            "https://placehold.co/800x600/5A00A8/FFFFFF?text=Beşiktaş+Proje",
            "https://placehold.co/800x600/8B00FF/FFFFFF?text=Beşiktaş+Kat+Planı",
            "https://placehold.co/800x600/4B0082/FFFFFF?text=Beşiktaş+Cephe",
            "https://placehold.co/800x600/6A1B9A/FFFFFF?text=Beşiktaş+İç+Mekan",
            "https://placehold.co/800x600/9C27B0/FFFFFF?text=Beşiktaş+Bahçe"
        ]
    },
    {
        id: 5,
        title: "Altındağ Gelir Paylaşımı Projesi",
        location: "Altındağ, Ankara",
        description: "Gelir paylaşımı modeli ile risksiz yatırım fırsatı. Uzun vadeli getiri garantisi.",
        projectType: "gelir-paylasimi",
        city: "ankara",
        district: "altindag",
        landArea: 2000,
        expectedFlats: 32,
        cashExpectation: 1800000,
        flatShareRatio: 40,
        buildingStatus: "bos-arsa",
        images: [
            "https://placehold.co/800x600/5A00A8/FFFFFF?text=Altındağ+Gelir",
            "https://placehold.co/800x600/8B00FF/FFFFFF?text=Altındağ+Vaziyet",
            "https://placehold.co/800x600/4B0082/FFFFFF?text=Altındağ+Model"
        ]
    },
    {
        id: 6,
        title: "Karşıyaka Kentsel Dönüşüm",
        location: "Karşıyaka, İzmir",
        description: "Modern yaşam kompleksi projesi. Sosyal tesisler ve yeşil alanlarla donatılmış yaşam alanı.",
        projectType: "kentsel-donusum",
        city: "izmir",
        district: "karsiyaka",
        landArea: 1800,
        expectedFlats: 28,
        cashExpectation: 2100000,
        flatShareRatio: 60,
        buildingStatus: "mevcut-bina",
        images: [
            "https://placehold.co/800x600/5A00A8/FFFFFF?text=Karşıyaka+Dönüşüm",
            "https://placehold.co/800x600/8B00FF/FFFFFF?text=Karşıyaka+Sosyal",
            "https://placehold.co/800x600/4B0082/FFFFFF?text=Karşıyaka+Yeşil",
            "https://placehold.co/800x600/6A1B9A/FFFFFF?text=Karşıyaka+Modern"
        ]
    }
];

// Image Gallery için global değişkenler
let currentImageIndex = 0;
let currentProjectImages = [];
let isFullscreenMode = false;

// Şehir ve ilçe verileri
const citiesData = [
    {
        id: 1,
        name: "İstanbul",
        value: "istanbul",
        districts: [
            { name: "Kadıköy", value: "kadikoy" },
            { name: "Beşiktaş", value: "besiktas" },
            { name: "Şişli", value: "sisli" },
            { name: "Üsküdar", value: "uskudar" },
            { name: "Fatih", value: "fatih" }
        ]
    },
    {
        id: 2,
        name: "Ankara",
        value: "ankara",
        districts: [
            { name: "Çankaya", value: "cankaya" },
            { name: "Altındağ", value: "altindag" },
            { name: "Keçiören", value: "kecioren" },
            { name: "Yenimahalle", value: "yenimahalle" },
            { name: "Mamak", value: "mamak" }
        ]
    },
    {
        id: 3,
        name: "İzmir",
        value: "izmir",
        districts: [
            { name: "Bornova", value: "bornova" },
            { name: "Karşıyaka", value: "karsiyaka" },
            { name: "Konak", value: "konak" },
            { name: "Buca", value: "buca" },
            { name: "Balçova", value: "balcova" }
        ]
    }
];

// Filtrelenmiş ilanlar
let filteredListings = [...allListings];

// Modal yönetimi
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';

        // Form sıfırlama
        const form = modal.querySelector('form');
        if (form) {
            form.reset();
        }
    }
}

// Modal açma fonksiyonları (geriye uyumluluk için)
function openLoginModal() {
    showModal('loginModal');
}

function openRegisterModal() {
    showModal('registerModal');
}

// Modal kapama fonksiyonları (geriye uyumluluk için)
function closeLoginModal() {
    closeModal('loginModal');
}

function closeRegisterModal() {
    closeModal('registerModal');
}

// Modal geçiş fonksiyonları
function switchToRegister() {
    closeLoginModal();
    setTimeout(() => {
        openRegisterModal();
    }, 150);
}

function switchToLogin() {
    closeRegisterModal();
    setTimeout(() => {
        openLoginModal();
    }, 150);
}

// Form gönderim fonksiyonları
function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Basit validasyon
    if (!email || !password) {
        showNotification('Lütfen tüm alanları doldurun.', 'error');
        return;
    }

    // Simüle edilmiş kullanıcı verileri
    const users = {
        'customer@donusumay.com': {
            password: '123456',
            role: 'customer',
            name: 'Ahmet Yılmaz',
            dashboard: 'customer-dashboard.html'
        },
        'contractor@donusumay.com': {
            password: '123456',
            role: 'contractor',
            name: 'Mehmet İnşaat Ltd. Şti.',
            dashboard: 'contractor-dashboard.html'
        },
        'architect@donusumay.com': {
            password: '123456',
            role: 'architect',
            name: 'Zeynep Mimar',
            dashboard: 'architect-dashboard.html'
        },
        'notary@donusumay.com': {
            password: '123456',
            role: 'notary',
            name: 'Ali Noter',
            dashboard: 'notary-dashboard.html'
        }
    };

    const user = users[email];

    if (user && user.password === password) {
        // Başarılı giriş
        showNotification(`Hoş geldiniz, ${user.name}!`, 'success');

        // Role göre yönlendirme
        setTimeout(() => {
            window.location.href = user.dashboard;
        }, 1000);

        closeModal('loginModal');
    } else {
        showNotification('Geçersiz e-posta veya şifre.', 'error');
    }
}

function handleRegister(event) {
    event.preventDefault();

    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const role = document.getElementById('registerRole').value;

    // Basit validasyon
    if (!name || !email || !password || !role) {
        showNotification('Lütfen tüm alanları doldurun.', 'error');
        return;
    }

    if (password.length < 6) {
        showNotification('Şifreniz en az 6 karakter olmalıdır.', 'error');
        return;
    }

    // Başarılı kayıt simülasyonu
    closeModal('registerModal');
    showNotification('Başarıyla kayıt oldunuz!', 'success');
}

// Bildirim sistemi
function showNotification(message, type = 'info') {
    const container = document.getElementById('notificationContainer');
    const notification = document.createElement('div');

    const typeStyles = {
        success: 'bg-green-500 text-white',
        error: 'bg-red-500 text-white',
        info: 'bg-blue-500 text-white',
        warning: 'bg-yellow-500 text-black'
    };

    notification.className = `px-4 py-3 rounded-lg shadow-lg ${typeStyles[type]} transform transition-all duration-300 translate-x-full opacity-0`;
    notification.innerHTML = `
                <div class="flex items-center space-x-2">
                    <span>${message}</span>
                    <button onclick="this.parentElement.parentElement.remove()" class="ml-2 text-sm opacity-70 hover:opacity-100">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;

    container.appendChild(notification);

    // Animasyon
    setTimeout(() => {
        notification.classList.remove('translate-x-full', 'opacity-0');
    }, 100);

    // Otomatik kaldırma
    setTimeout(() => {
        if (notification.parentElement) {
            notification.classList.add('translate-x-full', 'opacity-0');
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Şehir filtresini doldur
function populateCityFilter() {
    const citySelect = document.getElementById('ilSelect');
    citySelect.innerHTML = '<option value="">İl Seçin</option>';

    citiesData.forEach(city => {
        const option = document.createElement('option');
        option.value = city.value;
        option.textContent = city.name;
        citySelect.appendChild(option);
    });
}

// İlçe güncelleme fonksiyonu
function updateIlceler() {
    const ilSelect = document.getElementById('ilSelect');
    const ilceSelect = document.getElementById('ilceSelect');

    // İlçe seçimini sıfırla
    ilceSelect.innerHTML = '<option value="">İlçe Seçin</option>';

    if (ilSelect.value) {
        ilceSelect.disabled = false;

        // Seçilen şehre ait ilçeleri bul
        const selectedCity = citiesData.find(city => city.value === ilSelect.value);
        if (selectedCity && selectedCity.districts) {
            selectedCity.districts.forEach(district => {
                const option = document.createElement('option');
                option.value = district.value;
                option.textContent = district.name;
                ilceSelect.appendChild(option);
            });
        }
    } else {
        ilceSelect.disabled = true;
        ilceSelect.innerHTML = '<option value="">Önce İl Seçin</option>';
    }
}

// Arama fonksiyonu
function searchProjects() {
    applyFilters();
}

// Gelişmiş filtreler toggle
function toggleAdvancedFilters() {
    const advancedSection = document.getElementById('advanced-filters-section');
    const icon = document.getElementById('advancedFiltersIcon');
    const button = icon.parentElement;

    if (advancedSection.classList.contains('hidden')) {
        advancedSection.classList.remove('hidden');
        advancedSection.classList.add('show');
        icon.classList.add('rotate-180');
        button.querySelector('span').textContent = 'Gelişmiş Filtreleri Gizle';
    } else {
        advancedSection.classList.add('hidden');
        advancedSection.classList.remove('show');
        icon.classList.remove('rotate-180');
        button.querySelector('span').textContent = 'Gelişmiş Filtreler';
    }
}

// Filtreleri temizle
function clearFilters() {
    // Ana filtreler
    document.getElementById('projeTuruSelect').value = '';
    document.getElementById('ilSelect').value = '';
    document.getElementById('ilceSelect').value = '';
    updateIlceler();

    // Gelişmiş filtreler
    document.getElementById('minArsaAlani').value = '';
    document.getElementById('maxArsaAlani').value = '';
    document.getElementById('minDaireSayisi').value = '';
    document.getElementById('maxDaireSayisi').value = '';
    document.getElementById('minNakitBeklentisi').value = '';
    document.getElementById('maxNakitBeklentisi').value = '';
    document.getElementById('minKatKarsiligi').value = '';
    document.getElementById('maxKatKarsiligi').value = '';
    document.getElementById('bosArsa').checked = false;
    document.getElementById('mevcutBina').checked = false;
    document.getElementById('riskliYapi').checked = false;

    // Tüm ilanları göster
    filteredListings = [...allListings];
    renderListings(allListings);
}

// Filtreleri uygula
function applyFilters() {
    let filtered = [...allListings];

    // Ana filtreler
    const projeTuru = document.getElementById('projeTuruSelect').value;
    const il = document.getElementById('ilSelect').value;
    const ilce = document.getElementById('ilceSelect').value;

    if (projeTuru) {
        filtered = filtered.filter(listing => listing.projectType === projeTuru);
    }

    if (il) {
        filtered = filtered.filter(listing => listing.city === il);
    }

    if (ilce) {
        filtered = filtered.filter(listing => listing.district === ilce);
    }

    // Gelişmiş filtreler
    const minArsaAlani = parseFloat(document.getElementById('minArsaAlani').value);
    const maxArsaAlani = parseFloat(document.getElementById('maxArsaAlani').value);
    const minDaireSayisi = parseFloat(document.getElementById('minDaireSayisi').value);
    const maxDaireSayisi = parseFloat(document.getElementById('maxDaireSayisi').value);
    const minNakitBeklentisi = parseFloat(document.getElementById('minNakitBeklentisi').value);
    const maxNakitBeklentisi = parseFloat(document.getElementById('maxNakitBeklentisi').value);
    const minKatKarsiligi = parseFloat(document.getElementById('minKatKarsiligi').value);
    const maxKatKarsiligi = parseFloat(document.getElementById('maxKatKarsiligi').value);

    if (!isNaN(minArsaAlani)) {
        filtered = filtered.filter(listing => listing.landArea >= minArsaAlani);
    }
    if (!isNaN(maxArsaAlani)) {
        filtered = filtered.filter(listing => listing.landArea <= maxArsaAlani);
    }
    if (!isNaN(minDaireSayisi)) {
        filtered = filtered.filter(listing => listing.expectedFlats >= minDaireSayisi);
    }
    if (!isNaN(maxDaireSayisi)) {
        filtered = filtered.filter(listing => listing.expectedFlats <= maxDaireSayisi);
    }
    if (!isNaN(minNakitBeklentisi)) {
        filtered = filtered.filter(listing => listing.cashExpectation >= minNakitBeklentisi);
    }
    if (!isNaN(maxNakitBeklentisi)) {
        filtered = filtered.filter(listing => listing.cashExpectation <= maxNakitBeklentisi);
    }
    if (!isNaN(minKatKarsiligi)) {
        filtered = filtered.filter(listing => listing.flatShareRatio >= minKatKarsiligi);
    }
    if (!isNaN(maxKatKarsiligi)) {
        filtered = filtered.filter(listing => listing.flatShareRatio <= maxKatKarsiligi);
    }

    // Yapı durumu filtreleri
    const bosArsa = document.getElementById('bosArsa').checked;
    const mevcutBina = document.getElementById('mevcutBina').checked;
    const riskliYapi = document.getElementById('riskliYapi').checked;

    if (bosArsa || mevcutBina || riskliYapi) {
        filtered = filtered.filter(listing => {
            if (bosArsa && listing.buildingStatus === 'bos-arsa') return true;
            if (mevcutBina && listing.buildingStatus === 'mevcut-bina') return true;
            if (riskliYapi && listing.buildingStatus === 'riskli-yapi') return true;
            return false;
        });
    }

    filteredListings = filtered;
    renderListings(filtered);
}

// İlanları render et
function renderListings(listingsToRender = filteredListings) {
    const grid = document.getElementById('listing-grid');
    const noResultsMessage = document.getElementById('no-results-message');
    const resultsCount = document.getElementById('results-count');

    if (listingsToRender.length === 0) {
        grid.innerHTML = '';
        noResultsMessage.classList.remove('hidden');
        resultsCount.textContent = 'Hiç proje bulunamadı';
        return;
    }

    noResultsMessage.classList.add('hidden');
    resultsCount.textContent = `Toplam ${listingsToRender.length} proje bulundu`;

    grid.innerHTML = listingsToRender.map(listing => `
                <div class="listing-card bg-white rounded-xl shadow-lg overflow-hidden hover-transform">
                    <div class="relative">
                        <!-- Image Slider Container -->
                        <div class="relative w-full h-48">
                            <div class="absolute inset-0 flex items-center justify-between px-2 z-10">
                                <button onclick="changeListingImage(${listing.id}, -1, event)" class="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all duration-200">
                                    <i class="fas fa-chevron-left"></i>
                                </button>
                                <button onclick="changeListingImage(${listing.id}, 1, event)" class="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all duration-200">
                                    <i class="fas fa-chevron-right"></i>
                                </button>
                            </div>
                            <img src="${listing.images[0]}" alt="${listing.title}" class="w-full h-48 object-cover" data-listing-id="${listing.id}" data-current-index="0">
                            <div class="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                                ${listing.images.map((_, index) => `
                                    <button onclick="setListingImage(${listing.id}, ${index}, event)" class="w-2 h-2 rounded-full transition-all duration-200 ${index === 0 ? 'bg-white' : 'bg-white bg-opacity-50 hover:bg-opacity-75'}"></button>
                                `).join('')}
                            </div>
                        </div>
                        <div class="absolute top-4 left-4">
                            <span class="px-3 py-1 bg-primary text-white text-xs font-medium rounded-full">
                                ${getProjectTypeText(listing.projectType)}
                            </span>
                        </div>
                        <div class="absolute top-4 right-4">
                            <span class="px-2 py-1 bg-black bg-opacity-70 text-white text-xs font-medium rounded flex items-center">
                                <i class="fas fa-images mr-1"></i>
                                ${listing.images.length}
                            </span>
                        </div>
                    </div>
                    <div class="p-6">
                        <h3 class="text-lg font-semibold text-gray-800 mb-2">${listing.title}</h3>
                        <div class="flex items-center text-gray-600 mb-3">
                            <i class="fas fa-map-marker-alt text-primary mr-2"></i>
                            <span class="text-sm">${listing.location}</span>
                        </div>
                        <p class="text-gray-600 text-sm mb-4 line-clamp-2">${listing.description}</p>
                        
                        <div class="space-y-2 mb-4">
                            <div class="flex justify-between">
                                <span class="text-xs text-gray-500">Arsa Alanı:</span>
                                <span class="text-xs font-medium">${listing.landArea.toLocaleString()} m²</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-xs text-gray-500">Daire Sayısı:</span>
                                <span class="text-xs font-medium">${listing.expectedFlats} adet</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-xs text-gray-500">Nakit Beklentisi:</span>
                                <span class="text-xs font-medium">${listing.cashExpectation.toLocaleString()} ₺</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-xs text-gray-500">Kat Karşılığı:</span>
                                <span class="text-xs font-medium">%${listing.flatShareRatio}</span>
                            </div>
                        </div>
                        
                        <button onclick="viewDetails(${listing.id})" class="w-full bg-accent text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-all duration-300 font-medium">
                            Detayları Görüntüle
                        </button>
                    </div>
                </div>
            `).join('');
}

// Proje tipi metni
function getProjectTypeText(type) {
    const types = {
        'kentsel-donusum': 'Kentsel Dönüşüm',
        'arsa-degerlendirme': 'Arsa Değerlendirme',
        'bina-yenileme': 'Bina Yenileme',
        'kat-karsiligi': 'Kat Karşılığı',
        'gelir-paylasimi': 'Gelir Paylaşımı'
    };
    return types[type] || type;
}

// İlan detayları
function viewDetails(listingId) {
    const listing = allListings.find(item => item.id === listingId);
    if (!listing) {
        showNotification('Proje bulunamadı!', 'error');
        return;
    }

    // İlan detay sayfasına yönlendir
    window.location.href = `ilan-detay.html?id=${listingId}`;
}

// Image Gallery Fonksiyonları
function initializeImageGallery() {
    if (!currentProjectImages || currentProjectImages.length === 0) return;

    updateMainImage();
    updateThumbnails();
    updateDots();
    updateImageCounter();
    updateNavigationButtons();
}

function updateMainImage() {
    const mainImage = document.getElementById('modalMainImage');
    if (mainImage && currentProjectImages[currentImageIndex]) {
        mainImage.src = currentProjectImages[currentImageIndex];
        mainImage.alt = `Proje Görseli ${currentImageIndex + 1}`;
    }
}

function updateThumbnails() {
    const container = document.getElementById('thumbnailContainer');
    if (!container) return;

    container.innerHTML = currentProjectImages.map((image, index) => `
                <div class="flex-shrink-0">
                    <img src="${image}" 
                         alt="Thumbnail ${index + 1}"
                         onclick="setCurrentImage(${index})"
                         class="w-16 h-16 object-cover rounded-md cursor-pointer border-2 transition-all duration-200 ${index === currentImageIndex ? 'border-primary' : 'border-gray-200 hover:border-gray-400'
        }">
                </div>
            `).join('');
}

function updateDots() {
    const container = document.getElementById('dotsContainer');
    if (!container) return;

    container.innerHTML = currentProjectImages.map((_, index) => `
                <button onclick="setCurrentImage(${index})" 
                        class="w-3 h-3 rounded-full transition-all duration-200 ${index === currentImageIndex ? 'bg-primary' : 'bg-gray-300 hover:bg-gray-400'
        }">
                </button>
            `).join('');
}

function updateImageCounter() {
    const currentElement = document.getElementById('currentImageIndex');
    const totalElement = document.getElementById('totalImages');

    if (currentElement) currentElement.textContent = currentImageIndex + 1;
    if (totalElement) totalElement.textContent = currentProjectImages.length;
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevImageBtn');
    const nextBtn = document.getElementById('nextImageBtn');

    if (prevBtn) {
        prevBtn.style.display = currentProjectImages.length <= 1 ? 'none' : 'block';
    }
    if (nextBtn) {
        nextBtn.style.display = currentProjectImages.length <= 1 ? 'none' : 'block';
    }
}

function setCurrentImage(index) {
    if (index >= 0 && index < currentProjectImages.length) {
        currentImageIndex = index;
        updateMainImage();
        updateThumbnails();
        updateDots();
        updateImageCounter();
    }
}

function changeImage(direction) {
    if (!currentProjectImages || currentProjectImages.length <= 1) return;

    currentImageIndex += direction;

    if (currentImageIndex >= currentProjectImages.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = currentProjectImages.length - 1;
    }

    setCurrentImage(currentImageIndex);
}

// Tam Ekran Fonksiyonları
function openFullscreen() {
    if (!currentProjectImages || currentProjectImages.length === 0) return;

    isFullscreenMode = true;
    const fullscreenModal = document.getElementById('fullscreenModal');
    const fullscreenImage = document.getElementById('fullscreenImage');
    const fullscreenCurrentIndex = document.getElementById('fullscreenImageIndex');
    const fullscreenTotalImages = document.getElementById('fullscreenTotalImages');

    if (fullscreenImage) {
        fullscreenImage.src = currentProjectImages[currentImageIndex];
        fullscreenImage.alt = `Tam Ekran Görsel ${currentImageIndex + 1}`;
    }

    if (fullscreenCurrentIndex) fullscreenCurrentIndex.textContent = currentImageIndex + 1;
    if (fullscreenTotalImages) fullscreenTotalImages.textContent = currentProjectImages.length;

    if (fullscreenModal) {
        fullscreenModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeFullscreen() {
    isFullscreenMode = false;
    const fullscreenModal = document.getElementById('fullscreenModal');

    if (fullscreenModal) {
        fullscreenModal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

function changeFullscreenImage(direction) {
    if (!currentProjectImages || currentProjectImages.length <= 1) return;

    currentImageIndex += direction;

    if (currentImageIndex >= currentProjectImages.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = currentProjectImages.length - 1;
    }

    const fullscreenImage = document.getElementById('fullscreenImage');
    const fullscreenCurrentIndex = document.getElementById('fullscreenImageIndex');

    if (fullscreenImage) {
        fullscreenImage.src = currentProjectImages[currentImageIndex];
        fullscreenImage.alt = `Tam Ekran Görsel ${currentImageIndex + 1}`;
    }

    if (fullscreenCurrentIndex) fullscreenCurrentIndex.textContent = currentImageIndex + 1;

    // Ana modal'daki görüntüyü de güncelle
    updateMainImage();
    updateThumbnails();
    updateDots();
    updateImageCounter();
}

// Yasal Belge Modal Fonksiyonları
function openPrivacyModal() {
    showModal('privacyModal');
}

function openTermsModal() {
    showModal('termsModal');
}

function openCookieModal() {
    showModal('cookieModal');
}

function openKvkkModal() {
    showModal('kvkkModal');
}

function closeDocumentModal(modalId) {
    closeModal(modalId);
}

// Yapı durumu metni
function getBuildingStatusText(status) {
    const statusTexts = {
        'bos-arsa': 'Boş Arsa',
        'mevcut-bina': 'Mevcut Bina',
        'riskli-yapi': 'Riskli Yapı'
    };
    return statusTexts[status] || status;
}

// Bütçe placeholder güncelleme
function updateBudgetPlaceholder() {
    const roleSelect = document.getElementById('proposalRole');
    const budgetInput = document.getElementById('budgetInput');

    if (!roleSelect || !budgetInput) return;

    const selectedRole = roleSelect.value;

    switch (selectedRole) {
        case 'architect':
            budgetInput.placeholder = 'Tasarım Taslak Ücreti (₺)';
            break;
        case 'contractor':
            budgetInput.placeholder = 'Daire başı talep edilen ücret (₺)';
            break;
        case 'engineer':
            budgetInput.placeholder = 'Mühendislik Hizmet Ücreti (₺)';
            break;
        case 'company':
            budgetInput.placeholder = 'Toplam Proje Bütçesi (₺)';
            break;
        default:
            budgetInput.placeholder = 'Teklif Tutarı (₺)';
            break;
    }
}

// Teklif formu gönderim
function handleProposalForm(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const role = formData.get('role');
    const company = formData.get('company');
    const experience = formData.get('experience');
    const budget = formData.get('budget');
    const proposal = formData.get('proposal');
    const terms = formData.get('terms');

    // Zorunlu alan kontrolü
    if (!name || !email || !phone || !role || !proposal) {
        showNotification('Lütfen tüm zorunlu alanları doldurun.', 'error');
        return;
    }

    if (!terms) {
        showNotification('Kullanım şartlarını kabul etmeniz gerekmektedir.', 'error');
        return;
    }

    // Teklif detaylarını göster (console'da)
    console.log('Teklif Detayları:', {
        name, email, phone, role, company,
        experience: experience || 'Belirtilmedi',
        budget: budget ? `${budget} ₺` : 'Belirtilmedi',
        proposal
    });

    // Simüle edilmiş teklif gönderimi
    showNotification('Teklifiniz başarıyla gönderildi! Proje sahibi en kısa sürede değerlendirip dönüş yapacaktır.', 'success');
    event.target.reset();

    // Opsiyonel: Modal kapanması
    setTimeout(() => {
        closeModal('projectDetailModal');
    }, 3000);
}

// Favorilere ekleme
function addToFavorites() {
    showNotification('Proje favorilerinize eklendi!', 'success');
}

// Proje paylaşma
function shareProject() {
    if (navigator.share) {
        navigator.share({
            title: document.getElementById('modalProjectTitle').textContent,
            text: 'Bu kentsel dönüşüm projesini inceleyin!',
            url: window.location.href
        }).then(() => {
            showNotification('Proje başarıyla paylaşıldı!', 'success');
        }).catch(() => {
            fallbackShare();
        });
    } else {
        fallbackShare();
    }
}

// Paylaşım fallback
function fallbackShare() {
    const url = window.location.href;
    if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
            showNotification('Proje linki panoya kopyalandı!', 'success');
        }).catch(() => {
            showNotification('Paylaşım özelliği desteklenmiyor.', 'info');
        });
    } else {
        showNotification('Paylaşım özelliği desteklenmiyor.', 'info');
    }
}

// Modal overlay tıklama event'leri
document.getElementById('loginModal').addEventListener('click', function (e) {
    if (e.target === this) {
        closeLoginModal();
    }
});

document.getElementById('registerModal').addEventListener('click', function (e) {
    if (e.target === this) {
        closeRegisterModal();
    }
});

document.getElementById('projectDetailModal').addEventListener('click', function (e) {
    if (e.target === this) {
        closeModal('projectDetailModal');
    }
});

document.getElementById('fullscreenModal').addEventListener('click', function (e) {
    if (e.target === this) {
        closeFullscreen();
    }
});

// Yasal belge modal'ları için overlay click event'leri
document.getElementById('privacyModal').addEventListener('click', function (e) {
    if (e.target === this) {
        closeDocumentModal('privacyModal');
    }
});

document.getElementById('termsModal').addEventListener('click', function (e) {
    if (e.target === this) {
        closeDocumentModal('termsModal');
    }
});

document.getElementById('cookieModal').addEventListener('click', function (e) {
    if (e.target === this) {
        closeDocumentModal('cookieModal');
    }
});

document.getElementById('kvkkModal').addEventListener('click', function (e) {
    if (e.target === this) {
        closeDocumentModal('kvkkModal');
    }
});

// Klavye kontrolleri
document.addEventListener('keydown', function (e) {
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const projectDetailModal = document.getElementById('projectDetailModal');
    const fullscreenModal = document.getElementById('fullscreenModal');
    const privacyModal = document.getElementById('privacyModal');
    const termsModal = document.getElementById('termsModal');
    const cookieModal = document.getElementById('cookieModal');
    const kvkkModal = document.getElementById('kvkkModal');

    // ESC tuşu ile modal kapama
    if (e.key === 'Escape') {
        if (!fullscreenModal.classList.contains('hidden')) {
            closeFullscreen();
        } else if (!privacyModal.classList.contains('hidden')) {
            closeDocumentModal('privacyModal');
        } else if (!termsModal.classList.contains('hidden')) {
            closeDocumentModal('termsModal');
        } else if (!cookieModal.classList.contains('hidden')) {
            closeDocumentModal('cookieModal');
        } else if (!kvkkModal.classList.contains('hidden')) {
            closeDocumentModal('kvkkModal');
        } else if (!loginModal.classList.contains('hidden')) {
            closeLoginModal();
        } else if (!registerModal.classList.contains('hidden')) {
            closeRegisterModal();
        } else if (!projectDetailModal.classList.contains('hidden')) {
            closeModal('projectDetailModal');
        }
    }

    // Ok tuşları ile resim navigation'ı (sadece modal açıkken)
    if (!projectDetailModal.classList.contains('hidden') || !fullscreenModal.classList.contains('hidden')) {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            if (!fullscreenModal.classList.contains('hidden')) {
                changeFullscreenImage(-1);
            } else {
                changeImage(-1);
            }
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            if (!fullscreenModal.classList.contains('hidden')) {
                changeFullscreenImage(1);
            } else {
                changeImage(1);
            }
        }
    }
});

// Sayfa yüklendiğinde başlangıç işlemleri
document.addEventListener('DOMContentLoaded', function () {
    populateCityFilter();
    renderListings(allListings);
});

// Resim slider fonksiyonları
function changeListingImage(listingId, direction, event) {
    event.stopPropagation(); // Detay modalının açılmasını engelle

    const img = document.querySelector(`img[data-listing-id="${listingId}"]`);
    const listing = allListings.find(item => item.id === listingId);
    if (!img || !listing) return;

    let currentIndex = parseInt(img.dataset.currentIndex);
    currentIndex += direction;

    if (currentIndex >= listing.images.length) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = listing.images.length - 1;
    }

    img.src = listing.images[currentIndex];
    img.dataset.currentIndex = currentIndex;

    // Dots güncelleme
    const dots = img.parentElement.querySelectorAll('.rounded-full');
    dots.forEach((dot, index) => {
        if (index === currentIndex) {
            dot.classList.remove('bg-opacity-50');
            dot.classList.add('bg-opacity-100');
        } else {
            dot.classList.add('bg-opacity-50');
            dot.classList.remove('bg-opacity-100');
        }
    });
}

function setListingImage(listingId, index, event) {
    event.stopPropagation(); // Detay modalının açılmasını engelle

    const img = document.querySelector(`img[data-listing-id="${listingId}"]`);
    const listing = allListings.find(item => item.id === listingId);
    if (!img || !listing || index >= listing.images.length) return;

    img.src = listing.images[index];
    img.dataset.currentIndex = index;

    // Dots güncelleme
    const dots = img.parentElement.querySelectorAll('.rounded-full');
    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.remove('bg-opacity-50');
            dot.classList.add('bg-opacity-100');
        } else {
            dot.classList.add('bg-opacity-50');
            dot.classList.remove('bg-opacity-100');
        }
    });
}
