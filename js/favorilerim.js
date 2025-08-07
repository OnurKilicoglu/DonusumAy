
// Mock favorite listings data
const mockFavorites = [
    {
        id: '1',
        title: 'Kadıköy Kentsel Dönüşüm Projesi',
        location: 'Kadıköy, İstanbul',
        description: '15 katlı modern konut kompleksi için kentsel dönüşüm projesi. Metro ve deniz ulaşımına yakın konumda.',
        image: 'https://placehold.co/600x400/e2e8f0/64748b?text=Proje+1',
        area: '1,500',
        units: '24',
        floors: '15'
    },
    {
        id: '2',
        title: 'Çankaya Arsa Değerlendirme',
        location: 'Çankaya, Ankara',
        description: 'Merkezi konumda ticari ve konut karışımı proje değerlendirmesi.',
        image: 'https://placehold.co/600x400/e2e8f0/64748b?text=Proje+2',
        area: '2,000',
        units: '32',
        floors: '12'
    }
];

// Favori kartı oluşturma fonksiyonu
function createFavoriteCard(favorite) {
    return `
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
                    <img src="${favorite.image}" alt="${favorite.title}" class="w-full h-48 object-cover">
                    <div class="p-6">
                        <div class="flex justify-between items-start mb-4">
                            <h2 class="text-xl font-semibold text-gray-800 mb-2">${favorite.title}</h2>
                            <button onclick="removeFavorite('${favorite.id}')" title="Favorilerden Çıkar" 
                                    class="text-red-600 hover:text-red-700 transition-colors duration-200">
                                <i class="fas fa-heart"></i>
                            </button>
                        </div>
                        <p class="text-gray-600 flex items-center mb-4">
                            <i class="fas fa-map-marker-alt mr-2"></i>
                            ${favorite.location}
                        </p>
                        <p class="text-gray-600 mb-4 line-clamp-2">${favorite.description}</p>
                        <div class="grid grid-cols-3 gap-4 mb-4">
                            <div class="text-center p-2 bg-gray-50 rounded-lg">
                                <div class="text-lg font-semibold text-purple-600">${favorite.area}</div>
                                <div class="text-xs text-gray-600">m²</div>
                            </div>
                            <div class="text-center p-2 bg-gray-50 rounded-lg">
                                <div class="text-lg font-semibold text-purple-600">${favorite.units}</div>
                                <div class="text-xs text-gray-600">Daire</div>
                            </div>
                            <div class="text-center p-2 bg-gray-50 rounded-lg">
                                <div class="text-lg font-semibold text-purple-600">${favorite.floors}</div>
                                <div class="text-xs text-gray-600">Kat</div>
                            </div>
                        </div>
                        <a href="ilan-detay.html?id=${favorite.id}" 
                           class="block w-full text-center bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200">
                            İlanı İncele
                        </a>
                    </div>
                </div>
            `;
}

// Favorileri yükleme fonksiyonu
function loadFavorites() {
    const container = document.getElementById('favorites-container');
    const emptyState = document.getElementById('empty-state');

    // LocalStorage'dan favorileri al (gerçek uygulamada)
    // const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favorites = mockFavorites; // Mock data kullanıyoruz

    if (favorites.length === 0) {
        container.innerHTML = '';
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
        container.innerHTML = favorites.map(favorite => createFavoriteCard(favorite)).join('');
    }
}

// Favori kaldırma fonksiyonu
function removeFavorite(id) {
    // Gerçek uygulamada localStorage'dan kaldırma işlemi yapılacak
    // const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    // const updatedFavorites = favorites.filter(f => f.id !== id);
    // localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

    showNotification('İlan favorilerden kaldırıldı.', 'info');
    // Sayfayı yeniden yükle
    setTimeout(() => {
        loadFavorites();
    }, 500);
}

// Bildirim fonksiyonu
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

// Sayfa yüklendiğinde favorileri göster
document.addEventListener('DOMContentLoaded', loadFavorites);

// Tailwind yapılandırması
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
