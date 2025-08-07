
// Get listing ID from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const listingId = urlParams.get('id') || '1';

// Mock apartment data
const apartmentListings = {
    '1': {
        title: "Kadıköy Merkez'de Satılık 3+1 Daire",
        location: "Kadıköy, İstanbul",
        type: "3+1",
        price: 2850000,
        sqm: 125,
        rooms: 3,
        floor: 5,
        description: "Deniz manzaralı, asansörlü binada, merkezi konumda 3+1 daire. Modern yaşamın tüm konforlarını sunan bu daire ile hayalinizdeki eve kavuşun.",
        images: [
            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=300&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?q=80&w=300&auto=format&fit=crop"
        ],
        features: ["Deniz Manzarası", "Asansör", "Balkon", "Otopark", "Doğalgaz", "Klima"]
    },
    '2': {
        title: "Çankaya'da Modern 2+1 Daire",
        location: "Çankaya, Ankara",
        type: "2+1",
        price: 1650000,
        sqm: 95,
        rooms: 2,
        floor: 3,
        description: "Yeni yapım, güvenlikli sitede 2+1 daire.",
        images: [
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=300&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=300&auto=format&fit=crop"
        ],
        features: ["Güvenlik", "Otopark", "Balkon", "Asansör"]
    },
    '3': {
        title: "Bornova'da Geniş 4+1 Dublex",
        location: "Bornova, İzmir",
        type: "dublex",
        price: 3200000,
        sqm: 180,
        rooms: 4,
        floor: 7,
        description: "Bahçeli, geniş dublex daire. Aile için ideal.",
        images: [
            "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=300&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=300&auto=format&fit=crop"
        ],
        features: ["Bahçe", "Dublex", "Otopark", "Asansör"]
    },
    '4': {
        title: "Beşiktaş'ta Lüks 4+1 Daire",
        location: "Beşiktaş, İstanbul",
        type: "4+1",
        price: 8500000,
        sqm: 200,
        rooms: 4,
        floor: 8,
        description: "Boğaz manzaralı, lüks konut kompleksinde daire.",
        images: [
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=300&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=300&auto=format&fit=crop"
        ],
        features: ["Boğaz Manzarası", "Lüks", "Güvenlik", "Otopark"]
    }
};

// Check user panel and set home link
function checkUserPanel() {
    const userPanel = urlParams.get('from') || 'customer';
    const homeLink = document.getElementById('home-link');

    // Home linkini güncelle
    if (homeLink) {
        switch (userPanel) {
            case 'customer':
                homeLink.href = 'customer-dashboard.html';
                break;
            case 'contractor':
                homeLink.href = 'contractor-dashboard.html';
                break;
            case 'architect':
                homeLink.href = 'architect-dashboard.html';
                break;
            case 'notary':
                homeLink.href = 'notary-dashboard.html';
                break;
            default:
                homeLink.href = './index.html';
        }
    }

    // Daire İlanları linkini güncelle
    const apartmentListingsLink = document.querySelector('a[href="daire-ilanlari.html?from=customer"]');
    if (userPanel && apartmentListingsLink) {
        apartmentListingsLink.href = `daire-ilanlari.html?from=${userPanel}`;
    }

    // Form türünü kullanıcı tipine göre ayarla
    const purchaseForm = document.querySelector('.bg-gradient-to-br.from-green-50');

    if (userPanel !== 'customer' && purchaseForm) {
        // Customer olmayan kullanıcılar için iletişim formu göster
        purchaseForm.innerHTML = `
                    <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <i class="fas fa-phone text-purple-600 mr-2"></i>
                        İletişim
                    </h3>
                    <form onsubmit="submitContactForm(event)" class="space-y-4">
                        <div>
                            <label for="contact-name" class="block text-sm font-medium text-gray-700 mb-2">Ad Soyad</label>
                            <input type="text" id="contact-name" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                        </div>
                        <div>
                            <label for="contact-phone" class="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                            <input type="tel" id="contact-phone" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                        </div>
                        <div>
                            <label for="contact-email" class="block text-sm font-medium text-gray-700 mb-2">E-posta</label>
                            <input type="email" id="contact-email" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                        </div>
                        <div>
                            <label for="contact-message" class="block text-sm font-medium text-gray-700 mb-2">Mesajınız</label>
                            <textarea id="contact-message" rows="4" placeholder="Daire hakkında sormak istediğiniz soruları yazabilirsiniz..." class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"></textarea>
                        </div>
                        <button type="submit" class="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center space-x-2">
                            <i class="fas fa-paper-plane"></i>
                            <span>Mesaj Gönder</span>
                        </button>
                    </form>
                `;

        // Class'ları da güncelle
        purchaseForm.className = 'bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-sm border border-purple-200 p-6 mb-6';
    }
}

// Contact form submission for non-customer users
function submitContactForm(event) {
    event.preventDefault();
    showNotification('Mesajınız gönderildi! En kısa sürede size dönüş yapılacaktır.', 'success');
    event.target.reset();
}

// Load listing data
function loadListingData() {
    const listing = apartmentListings[listingId];
    if (listing) {
        document.getElementById('property-title').textContent = listing.title;
        document.getElementById('property-location').textContent = listing.location;
        document.getElementById('apartment-type').textContent = listing.type;
        document.getElementById('property-description').textContent = listing.description;
        document.getElementById('price-display').textContent = formatCurrency(listing.price);
        document.getElementById('sqm-display').textContent = listing.sqm;
        document.getElementById('rooms-display').textContent = listing.rooms;
        document.getElementById('floor-display').textContent = listing.floor;
        document.getElementById('main-image').src = listing.images[0];

        // Update purchase offer section prices
        document.getElementById('apartment-price').textContent = formatCurrency(listing.price) + ' ₺';
        const pricePerSqm = Math.round(listing.price / listing.sqm);
        document.getElementById('price-per-sqm').textContent = formatCurrency(pricePerSqm) + ' ₺/m²';

        // Update features
        const featuresContainer = document.getElementById('features-container');
        featuresContainer.innerHTML = listing.features.map(feature =>
            `<span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">${feature}</span>`
        ).join('');
    }
}

// Change main image
function changeMainImage(src) {
    document.getElementById('main-image').src = src;
}

// Currency formatting for input
function formatCurrencyInput(input) {
    // Sadece sayıları al
    let value = input.value.replace(/[^\d]/g, '');

    // Sayıyı formatlı şekilde göster
    if (value) {
        value = parseInt(value, 10).toLocaleString('tr-TR');
        input.value = value;
    }
}

// Calculate payment plan
function calculatePaymentPlan() {
    const apartmentPriceText = document.getElementById('apartment-price').textContent;
    const apartmentPrice = parseInt(apartmentPriceText.replace(/[^\d]/g, ''));

    const downPaymentInput = document.getElementById('down-payment');
    const downPaymentValue = downPaymentInput.value.replace(/[^\d]/g, '');
    const downPayment = parseInt(downPaymentValue) || 0;

    const installmentCount = parseInt(document.getElementById('installment-count').value) || 0;

    // Minimum %30 kontrol
    const minimumDownPayment = apartmentPrice * 0.3;
    const remainingAmount = apartmentPrice - downPayment;

    // Kalan tutarı güncelle
    document.getElementById('remaining-amount').textContent = formatCurrency(remainingAmount);

    // Geçerlilik kontrolleri
    const submitBtn = document.getElementById('submit-offer-btn');
    const monthlyPaymentSection = document.getElementById('monthly-payment-section');
    const paymentSummary = document.getElementById('payment-summary');

    if (downPayment < minimumDownPayment) {
        downPaymentInput.style.borderColor = '#ef4444';
        submitBtn.disabled = true;
        monthlyPaymentSection.classList.add('hidden');
        paymentSummary.classList.add('hidden');
        return;
    } else {
        downPaymentInput.style.borderColor = '#d1d5db';
    }

    if (downPayment > 0 && installmentCount > 0 && remainingAmount > 0) {
        const monthlyPayment = remainingAmount / installmentCount;

        // Aylık ödeme bölümünü göster
        document.getElementById('monthly-payment').textContent = formatCurrency(monthlyPayment);
        monthlyPaymentSection.classList.remove('hidden');

        // Özet bölümünü güncelle ve göster
        document.getElementById('summary-down-payment').textContent = formatCurrency(downPayment);
        document.getElementById('summary-remaining').textContent = formatCurrency(remainingAmount);
        document.getElementById('summary-installments').textContent = installmentCount + ' Ay';
        document.getElementById('summary-monthly').textContent = formatCurrency(monthlyPayment);
        paymentSummary.classList.remove('hidden');

        submitBtn.disabled = false;
    } else {
        monthlyPaymentSection.classList.add('hidden');
        paymentSummary.classList.add('hidden');
        submitBtn.disabled = true;
    }
}

// Submit purchase offer
function submitPurchaseOffer(event) {
    event.preventDefault();

    const apartmentPrice = parseInt(document.getElementById('apartment-price').textContent.replace(/[^\d]/g, ''));
    const downPayment = parseInt(document.getElementById('down-payment').value.replace(/[^\d]/g, ''));
    const installmentCount = parseInt(document.getElementById('installment-count').value);
    const remainingAmount = apartmentPrice - downPayment;
    const monthlyPayment = remainingAmount / installmentCount;

    const buyerName = document.getElementById('buyer-name').value;
    const buyerPhone = document.getElementById('buyer-phone').value;
    const buyerEmail = document.getElementById('buyer-email').value;
    const offerNotes = document.getElementById('offer-notes').value;

    // Current apartment data
    const currentApartment = apartmentListings[listingId];

    // Create offer object for storage
    const purchaseOffer = {
        id: 'purchase-' + Date.now(),
        apartmentId: listingId,
        apartmentTitle: currentApartment ? currentApartment.title : document.getElementById('property-title').textContent,
        apartmentLocation: currentApartment ? currentApartment.location : document.getElementById('property-location').textContent,
        apartmentPrice: apartmentPrice,
        downPayment: downPayment,
        remainingAmount: remainingAmount,
        installmentCount: installmentCount,
        monthlyPayment: Math.round(monthlyPayment),
        offerDate: new Date().toLocaleDateString('tr-TR'),
        status: 'pending',
        sellerResponse: null,
        apartmentImage: currentApartment ? currentApartment.images[0] : document.getElementById('main-image').src,
        buyer: {
            name: buyerName,
            phone: buyerPhone,
            email: buyerEmail
        },
        notes: offerNotes
    };

    // Save to localStorage
    const existingOffers = JSON.parse(localStorage.getItem('customerPurchaseOffers') || '[]');
    existingOffers.push(purchaseOffer);
    localStorage.setItem('customerPurchaseOffers', JSON.stringify(existingOffers));

    // Teklif detaylarını oluştur (görüntüleme için)
    const offerDetails = {
        apartmentPrice: formatCurrency(apartmentPrice),
        downPayment: formatCurrency(downPayment),
        remainingAmount: formatCurrency(remainingAmount),
        installmentCount: installmentCount + ' Ay',
        monthlyPayment: formatCurrency(monthlyPayment),
        buyer: {
            name: buyerName,
            phone: buyerPhone,
            email: buyerEmail
        },
        notes: offerNotes,
        offerDate: new Date().toLocaleDateString('tr-TR')
    };

    // Simülasyon: Teklifi gönder
    console.log('Satın Alma Teklifi:', offerDetails);

    showNotification('Satın alma teklifiniz başarıyla gönderildi! İlan sahibi en kısa sürede sizinle iletişime geçecektir. Teklifinizin durumunu "Tekliflerim > Verdiğim Teklifler" bölümünden takip edebilirsiniz.', 'success');

    // Formu sıfırla
    event.target.reset();
    document.getElementById('remaining-amount').textContent = '0 ₺';
    document.getElementById('monthly-payment-section').classList.add('hidden');
    document.getElementById('payment-summary').classList.add('hidden');
    document.getElementById('submit-offer-btn').disabled = true;
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

// Currency formatting
function formatCurrency(amount) {
    return new Intl.NumberFormat('tr-TR').format(amount);
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
        showNotification('Daire favorilerden çıkarıldı.', 'info');
    } else {
        // Favorilere ekle
        btn.classList.remove('bg-purple-600', 'hover:bg-purple-700');
        btn.classList.add('bg-red-600', 'hover:bg-red-700');
        text.textContent = 'Favorilerden Çıkar';
        icon.classList.add('text-white');
        showNotification('Daire favorilere eklendi!', 'success');
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

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    checkUserPanel();
    loadListingData();

    // Favori butonuna title attribute ekle (accessibility için)
    const favoriteBtn = document.getElementById('favorite-btn');
    if (favoriteBtn) {
        favoriteBtn.setAttribute('title', 'Favorilere Ekle/Çıkar');
    }

    // Haritayı başlat
    initMap();
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
