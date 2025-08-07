
// Get listing ID from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const listingId = parseInt(urlParams.get('id')) || 1;

// Proje verileri - index.js ile aynı veri yapısı
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
        title: "Karşıyaka Modern Konut Projesi",
        location: "Karşıyaka, İzmir",
        description: "Deniz manzaralı modern konut kompleksi. Sosyal donatı alanları ve yeşil alanlar ile çevrili.",
        projectType: "kentsel-donusum",
        city: "izmir",
        district: "karsiyaka",
        landArea: 1800,
        expectedFlats: 28,
        cashExpectation: 2200000,
        flatShareRatio: 60,
        buildingStatus: "mevcut-bina",
        images: [
            "https://placehold.co/800x600/5A00A8/FFFFFF?text=Karşıyaka+Deniz",
            "https://placehold.co/800x600/8B00FF/FFFFFF?text=Karşıyaka+Konut",
            "https://placehold.co/800x600/4B0082/FFFFFF?text=Karşıyaka+Sosyal",
            "https://placehold.co/800x600/6A1B9A/FFFFFF?text=Karşıyaka+Yeşil"
        ]
    }
];

// Load listing data
function loadListingData() {
    const listing = allListings.find(item => item.id === listingId);
    if (listing) {
        // Temel bilgiler
        document.getElementById('property-title').textContent = listing.title;
        document.getElementById('property-location').textContent = listing.location;
        document.getElementById('property-description').textContent = listing.description;
        document.getElementById('main-image').src = listing.images[0];
        
        // Detaylı bilgileri güncelle (eğer elementler varsa)
        const projectTypeElement = document.getElementById('project-type');
        if (projectTypeElement) {
            projectTypeElement.textContent = getProjectTypeText(listing.projectType);
        }
        
        const landAreaElement = document.getElementById('land-area');
        if (landAreaElement) {
            landAreaElement.textContent = `${listing.landArea.toLocaleString()} m²`;
        }
        
        const expectedFlatsElement = document.getElementById('expected-flats');
        if (expectedFlatsElement) {
            expectedFlatsElement.textContent = `${listing.expectedFlats} adet`;
        }
        
        const cashExpectationElement = document.getElementById('cash-expectation');
        if (cashExpectationElement) {
            cashExpectationElement.textContent = `${listing.cashExpectation.toLocaleString()} ₺`;
        }
        
        const flatShareRatioElement = document.getElementById('flat-share-ratio');
        if (flatShareRatioElement) {
            flatShareRatioElement.textContent = `%${listing.flatShareRatio}`;
        }
        
        const buildingStatusElement = document.getElementById('building-status');
        if (buildingStatusElement) {
            buildingStatusElement.textContent = getBuildingStatusText(listing.buildingStatus);
        }
        
        // Tahmini daire değeri hesapla
        const estimatedValueElement = document.getElementById('estimated-value');
        if (estimatedValueElement) {
            const estimatedValue = Math.round(listing.cashExpectation / listing.expectedFlats);
            estimatedValueElement.textContent = `${estimatedValue.toLocaleString()} ₺ / daire`;
        }
    } else {
        // Proje bulunamadı durumu
        document.getElementById('property-title').textContent = 'Proje Bulunamadı';
        document.getElementById('property-location').textContent = '';
        document.getElementById('property-description').textContent = 'Aradığınız proje bulunamadı. Lütfen ana sayfaya dönün.';
    }
}

// Change main image
function changeMainImage(src) {
    document.getElementById('main-image').src = src;
}

// Submit contact form
function submitContact(event) {
    event.preventDefault();
    showNotification('Bilgi talebiniz gönderildi! En kısa sürede size dönüş yapacağız.', 'success');
    event.target.reset();
}

// Para formatı fonksiyonu
function formatCurrency(input) {
    // Sadece sayıları al
    let value = input.value.replace(/[^\d]/g, '');

    // Sayıyı formatlı şekilde göster
    if (value) {
        value = parseInt(value, 10).toLocaleString('tr-TR');
        input.value = value;
    }
}

// Form gönderme fonksiyonunu güncelle
function submitOffer(event) {
    event.preventDefault();

    // Get form data
    const formData = {
        taxNumber: document.getElementById('offer-tax-number').value,
        company: document.getElementById('offer-company').value,
        experience: document.getElementById('offer-experience').value,
        apartmentType: document.getElementById('offer-apartment-type').value,
        floorCount: document.getElementById('offer-floor-count').value,
        netArea: document.getElementById('offer-net-area').value,
        grossArea: document.getElementById('offer-gross-area').value,
        balconyCount: document.getElementById('offer-balcony-count').value,
        bathroomCount: document.getElementById('offer-bathroom-count').value,
        wcCount: document.getElementById('offer-wc-count').value,
        cashPerApartment: document.getElementById('offer-cash-per-apartment').value,
        details: document.getElementById('offer-details').value,
        hasDesignFiles: document.getElementById('uploaded-design-files-detail').children.length > 0
    };

    // Validate required fields
    for (let key in formData) {
        if (key !== 'hasDesignFiles' && !formData[key]) {
            showNotification('Lütfen tüm zorunlu alanları doldurun.', 'error');
            return;
        }
    }

    // Simulate sending offer
    showNotification('Teklifiniz başarıyla gönderildi! İlan sahibi en kısa sürede sizinle iletişime geçecektir.', 'success');
    event.target.reset();

    // Form temizle - tasarım dosyalarını da temizle
    const designFilesContainer = document.getElementById('uploaded-design-files-detail');
    if (designFilesContainer) {
        designFilesContainer.classList.add('hidden');
        designFilesContainer.innerHTML = '';
    }
}

// Share functions
function shareOn(platform) {
    const url = window.location.href;
    const title = document.getElementById('property-title').textContent;

    switch (platform) {
        case 'facebook':
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
            break;
        case 'twitter':
            window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
            break;
        case 'whatsapp':
            window.open(`https://wa.me/?text=${encodeURIComponent(title + ' - ' + url)}`, '_blank');
            break;
    }
}

// Notification function
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    const colors = {
        'info': 'bg-blue-500',
        'success': 'bg-green-500',
        'error': 'bg-red-500'
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
    setTimeout(() => notification.classList.remove('translate-x-full'), 100);
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Favoriye ekleme fonksiyonu
function toggleFavorite() {
    const btn = document.getElementById('favorite-btn');
    const text = document.getElementById('favorite-text');
    const icon = btn.querySelector('i');

    // Favori durumunu kontrol et
    const isFavorite = btn.classList.contains('bg-red-600');

    if (isFavorite) {
        // Favorilerden çıkar
        btn.classList.remove('bg-red-600', 'hover:bg-red-700');
        btn.classList.add('bg-purple-600', 'hover:bg-purple-700');
        text.textContent = 'Favorilere Ekle';
        icon.classList.remove('text-white');
        showNotification('İlan favorilerden çıkarıldı.', 'info');
    } else {
        // Favorilere ekle
        btn.classList.remove('bg-purple-600', 'hover:bg-purple-700');
        btn.classList.add('bg-red-600', 'hover:bg-red-700');
        text.textContent = 'Favorilerden Çıkar';
        icon.classList.add('text-white');
        showNotification('İlan favorilere eklendi!', 'success');

        // Favoriler sayfasına yönlendirme için timeout ayarla
        setTimeout(() => {
            window.location.href = 'favorilerim.html';
        }, 1500);
    }
}

// Harita başlatma fonksiyonu
function initMap(lat = 40.9909, lng = 29.0304) { // Varsayılan konum: Kadıköy
    const mapOptions = {
        center: { lat, lng },
        zoom: 15,
        styles: [
            {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }]
            }
        ]
    };

    const map = new google.maps.Map(document.getElementById("map"), mapOptions);

    // Konum işaretleyici ekle
    const marker = new google.maps.Marker({
        position: { lat, lng },
        map: map,
        title: document.getElementById('property-title').textContent,
        animation: google.maps.Animation.DROP
    });

    // Bilgi penceresi ekle
    const infoWindow = new google.maps.InfoWindow({
        content: `
                    <div class="p-2">
                        <h3 class="font-semibold mb-1">${document.getElementById('property-title').textContent}</h3>
                        <p class="text-sm text-gray-600">${document.getElementById('property-location').textContent}</p>
                    </div>
                `
    });

    // Marker'a tıklandığında bilgi penceresini göster
    marker.addListener('click', () => {
        infoWindow.open(map, marker);
    });
}

// ===============================================================
//                 DESIGN FILES & PROJECT FUNCTIONS
// ===============================================================

// Tasarım dosyaları yükleme fonksiyonu (Detail sayfası için)
function handleDesignFilesUploadDetail(event) {
    const files = event.target.files;
    const container = document.getElementById('uploaded-design-files-detail');

    if (files.length > 0) {
        container.classList.remove('hidden');
        container.innerHTML = '';

        Array.from(files).forEach(file => {
            const fileItem = document.createElement('div');
            fileItem.className = 'flex items-center justify-between bg-gray-100 p-2 rounded text-xs';
            fileItem.innerHTML = `
                        <div class="flex items-center">
                            <i class="fas fa-file text-blue-500 mr-2"></i>
                            <span class="text-gray-700 truncate">${file.name}</span>
                        </div>
                        <button onclick="removeDesignFileDetail(this)" class="text-red-500 hover:text-red-700 ml-2">
                            <i class="fas fa-times"></i>
                        </button>
                    `;
            container.appendChild(fileItem);
        });
    } else {
        container.classList.add('hidden');
    }
}

// Tasarım dosyası silme fonksiyonu (Detail sayfası için)
function removeDesignFileDetail(button) {
    button.closest('div').remove();
    const container = document.getElementById('uploaded-design-files-detail');
    if (container.children.length === 0) {
        container.classList.add('hidden');
    }
}

// Modal açma/kapama fonksiyonları (Detail sayfası için)
function openModalDetail(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    }
}

function closeModalDetail(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = 'auto';
    }
}

// Tasarım projesi modalını açma fonksiyonu (Detail sayfası için)
function openDesignProjectListingModalDetail() {
    // Sabit değerler (ilan detay sayfasından)
    const plotArea = 1500; // m²
    const expectedUnits = 24; // daire sayısı

    // Formül: Arsa alanı x %10 x Daire sayısı
    const calculatedFee = plotArea * 0.1 * expectedUnits;

    // Modal verilerini doldur
    document.getElementById('design-project-plot-area-detail').textContent = plotArea.toLocaleString('tr-TR') + ' m²';
    document.getElementById('design-project-expected-units-detail').textContent = expectedUnits;
    document.getElementById('design-project-calculated-fee-detail').textContent = calculatedFee.toLocaleString('tr-TR') + ' ₺';
    document.getElementById('formula-calculation-detail').textContent = `${plotArea.toLocaleString('tr-TR')} m² × %10 × ${expectedUnits} daire = ${calculatedFee.toLocaleString('tr-TR')} ₺`;

    openModalDetail('design-project-listing-modal-detail');
}

// Tasarım projesi ilanını yayınlama fonksiyonu (Detail sayfası için)
function publishDesignProjectListingDetail() {
    const title = document.getElementById('design-project-title-detail').value;
    const description = document.getElementById('design-project-description-detail').value;
    const deadline = document.getElementById('design-project-deadline-detail').value;

    if (!title || !description || !deadline) {
        showNotification('Lütfen tüm alanları doldurun.', 'error');
        return;
    }

    const plotArea = 1500;
    const expectedUnits = 24;
    const calculatedFee = plotArea * 0.1 * expectedUnits;

    // Başarı mesajı göster
    showNotification('Tasarım projesi ilanınız başarıyla yayınlandı! Mimarlar teklif vermeye başlayabilir.', 'success');

    // Modalı kapat ve formu temizle
    closeModalDetail('design-project-listing-modal-detail');
    document.getElementById('design-project-form-detail').reset();

    console.log('Design Project Published:', {
        title: title,
        description: description,
        deadline: parseInt(deadline),
        plotArea: plotArea,
        expectedUnits: expectedUnits,
        calculatedFee: calculatedFee
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    loadListingData();

    // Favori butonuna title attribute ekle (accessibility için)
    const favoriteBtn = document.getElementById('favorite-btn');
    if (favoriteBtn) {
        favoriteBtn.setAttribute('title', 'Favorilere Ekle/Çıkar');
    }

    // Haritayı başlat
    initMap();
});

// ESC tuşuyla modal kapatma
// Helper functions
function getProjectTypeText(type) {
    const types = {
        'kentsel-donusum': 'Kentsel Dönüşüm',
        'arsa-degerlendirme': 'Arsa Değerlendirme',
        'bina-yenileme': 'Bina Yenileme/Güçlendirme',
        'kat-karsiligi': 'Kat Karşılığı Projeler',
        'gelir-paylasimi': 'Gelir Paylaşımı Projeleri'
    };
    return types[type] || type;
}

function getBuildingStatusText(status) {
    const statuses = {
        'bos-arsa': 'Boş Arsa',
        'mevcut-bina': 'Mevcut Bina',
        'riskli-yapi': 'Riskli Yapı'
    };
    return statuses[status] || status;
}

// Load page when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    loadListingData();
    initMap();
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeModalDetail('design-project-listing-modal-detail');
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
<<<<<<< HEAD
}
=======
}
>>>>>>> 7c2648f217cd90583ed52613a38179d721df4bdf
