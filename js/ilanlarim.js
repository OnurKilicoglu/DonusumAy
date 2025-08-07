
// Simulated data
const myListings = {
    apartments: [
        {
            id: 101,
            title: "3+1 Lüks Daire",
            project: "Kadıköy Kentsel Dönüşüm Projesi",
            location: "Kadıköy, İstanbul",
            price: 4500000,
            area: "145m²",
            rooms: "3+1",
            floor: 5,
            status: "active",
            description: "Deniz manzaralı, yeni yapı",
            createdAt: "2025-07-10",
            views: 45,
            favorites: 12,
            images: [
                "https://placehold.co/600x400/cccccc/333333?text=Daire+1",
                "https://placehold.co/600x400/cccccc/333333?text=Daire+2",
                "https://placehold.co/600x400/cccccc/333333?text=Daire+3"
            ]
        },
        {
            id: 102,
            title: "2+1 Bahçe Katı",
            project: "Çankaya Arsa Değerlendirme",
            location: "Çankaya, Ankara",
            price: 2800000,
            area: "95m²",
            rooms: "2+1",
            floor: 0,
            status: "active",
            description: "Özel bahçeli, sıfır daire",
            createdAt: "2025-07-08",
            views: 32,
            favorites: 8,
            images: [
                "https://placehold.co/600x400/cccccc/333333?text=Daire+4",
                "https://placehold.co/600x400/cccccc/333333?text=Daire+5"
            ]
        }
    ],
    designProjects: [
        {
            id: 201,
            title: "Avan Proje - Modern Rezidans",
            type: "Tasarım (Avan) Projesi",
            locationString: "Kadıköy, İstanbul",
            area: "1500m²",
            projectArea: 1500,
            budget: 75000,
            deadline: 30,
            status: "active",
            description: "Modern mimari konseptli rezidans projesi",
            apartmentCount: 24,
            pricePerApartment: 5000,
            totalBudget: 120000,
            location: {
                city: "istanbul",
                district: "kadikoy",
                neighborhood: "moda",
                address: "Atatürk Caddesi No:45"
            },
            createdAt: "2025-07-05",
            applications: 3
        },
        {
            id: 202,
            title: "Uygulama Projesi - Yeşil Bina",
            type: "Uygulama Projesi",
            locationString: "Çankaya, Ankara",
            area: "800m²",
            projectArea: 800,
            budget: 120000,
            deadline: 45,
            status: "active",
            description: "Sürdürülebilir yeşil bina projesi",
            apartmentCount: 18,
            pricePerApartment: 6000,
            totalBudget: 108000,
            location: {
                city: "ankara",
                district: "cankaya",
                neighborhood: "kizilay",
                address: "Kızılay Meydanı No:10"
            },
            createdAt: "2025-07-01",
            applications: 5
        }
    ]
};

// Initialize page
document.addEventListener('DOMContentLoaded', function () {
    renderApartmentListings();
    renderDesignProjectListings();
});

function renderApartmentListings() {
    const container = document.querySelector('#apartment-listings .grid');
    container.innerHTML = myListings.apartments.map(listing => `
                <div class="listing-card bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div class="relative">
                        <div class="slider-container h-48">
                            ${listing.images.map((img, index) => `
                                <img src="${img}" alt="${listing.title} - Görsel ${index + 1}" class="w-full h-full object-cover absolute ${index === 0 ? '' : 'hidden'}" data-index="${index}">
                            `).join('')}
                            ${listing.images.length > 1 ? `
                                <button class="slider-prev absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white w-8 h-8 rounded-full flex items-center justify-center">
                                    <i class="fas fa-chevron-left"></i>
                                </button>
                                <button class="slider-next absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white w-8 h-8 rounded-full flex items-center justify-center">
                                    <i class="fas fa-chevron-right"></i>
                                </button>
                                <div class="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
                                    ${listing.images.map((_, index) => `
                                        <button class="slider-dot w-2 h-2 rounded-full bg-white bg-opacity-50 ${index === 0 ? 'bg-opacity-100' : ''}" data-index="${index}"></button>
                                    `).join('')}
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    <div class="p-6">
                        <div class="flex justify-between items-start mb-4">
                            <div>
                                <h3 class="text-lg font-semibold text-gray-900">${listing.title}</h3>
                                <p class="text-sm text-gray-600 mt-1">${listing.project}</p>
                                <p class="text-sm text-gray-600">${listing.location}</p>
                            </div>
                            <span class="text-lg font-bold text-primary">₺${listing.price.toLocaleString('tr-TR')}</span>
                        </div>
                        <div class="space-y-2 mb-4">
                            <div class="flex justify-between text-sm text-gray-600">
                                <span>Alan: ${listing.area}</span>
                                <span>Oda: ${listing.rooms}</span>
                                <span>Kat: ${listing.floor}. kat</span>
                            </div>
                            <div class="flex justify-between text-sm text-gray-500 mt-2">
                                <span><i class="fas fa-eye mr-1"></i> ${listing.views}</span>
                                <span><i class="fas fa-heart mr-1"></i> ${listing.favorites}</span>
                            </div>
                        </div>
                    </div>
                    <div class="px-6 py-4 bg-gray-50 border-t border-gray-200">
                        <div class="flex justify-between gap-4">
                            <button onclick="editApartmentListing(${listing.id})" class="flex-1 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 text-sm font-medium">
                                Düzenle
                            </button>
                            <button onclick="deactivateApartmentListing(${listing.id})" class="flex-1 bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 text-sm font-medium">
                                Pasife Al
                            </button>
                        </div>
                    </div>
                </div>
            `).join('') || '<p class="text-gray-500 col-span-full text-center py-8">Daire ilanı bulunmuyor.</p>';

    // Initialize sliders
    initializeSliders();
}

function renderDesignProjectListings() {
    const container = document.querySelector('#design-listings .grid');
    container.innerHTML = myListings.designProjects.map(listing => `
                <div class="listing-card bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div class="p-6">
                        <div class="flex justify-between items-start mb-4">
                            <div>
                                <h3 class="text-lg font-semibold text-gray-900">${listing.title}</h3>
                                <p class="text-sm text-gray-600 mt-1">${listing.locationString}</p>
                            </div>
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                ${listing.type}
                            </span>
                        </div>
                        <div class="space-y-2 mb-4">
                            <p class="text-sm text-gray-600">Proje Alanı: ${listing.area}</p>
                            <p class="text-sm text-gray-600">Bütçe: ₺${listing.budget.toLocaleString('tr-TR')}</p>
                            <p class="text-sm text-gray-600">Teslim Süresi: ${listing.deadline} gün</p>
                            <p class="text-sm text-gray-600">Başvuru: ${listing.applications} mimar</p>
                        </div>
                    </div>
                    <div class="px-6 py-4 bg-gray-50 border-t border-gray-200">
                        <div class="flex justify-between gap-4">
                            <button onclick="editDesignListing(${listing.id})" class="flex-1 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 text-sm font-medium">
                                Düzenle
                            </button>
                            <button onclick="deactivateDesignListing(${listing.id})" class="flex-1 bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 text-sm font-medium">
                                Pasife Al
                            </button>
                        </div>
                    </div>
                </div>
            `).join('') || '<p class="text-gray-500 col-span-full text-center py-8">Proje çizim ilanı bulunmuyor.</p>';
}

function initializeSliders() {
    document.querySelectorAll('.slider-container').forEach(container => {
        const images = container.querySelectorAll('img');
        const dots = container.querySelectorAll('.slider-dot');
        const prevBtn = container.querySelector('.slider-prev');
        const nextBtn = container.querySelector('.slider-next');
        let currentIndex = 0;

        function showImage(index) {
            images.forEach(img => img.classList.add('hidden'));
            dots.forEach(dot => dot.classList.remove('bg-opacity-100'));

            images[index].classList.remove('hidden');
            dots[index].classList.add('bg-opacity-100');
            currentIndex = index;
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                const newIndex = (currentIndex - 1 + images.length) % images.length;
                showImage(newIndex);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const newIndex = (currentIndex + 1) % images.length;
                showImage(newIndex);
            });
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showImage(index));
        });
    });
}

function switchListingTab(tabName) {
    // Hide all listing containers
    document.getElementById('apartment-listings').classList.add('hidden');
    document.getElementById('design-listings').classList.add('hidden');

    // Show selected container
    document.getElementById(`${tabName}-listings`).classList.remove('hidden');

    // Update tab styles
    document.querySelectorAll('.listing-tab').forEach(tab => {
        tab.classList.remove('border-primary', 'text-primary');
        tab.classList.add('border-transparent', 'text-gray-500');
    });

    // Add active styles to selected tab
    const selectedTab = document.querySelector(`[onclick="switchListingTab('${tabName}')"]`);
    selectedTab.classList.remove('border-transparent', 'text-gray-500');
    selectedTab.classList.add('border-primary', 'text-primary');
}

function showModal(modalId) {
    document.getElementById(modalId).classList.remove('hidden');
    document.getElementById(modalId).classList.add('flex');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
    document.getElementById(modalId).classList.remove('flex');
}

// Action Functions for Apartment Listings
function formatPriceInput(input) {
    // Remove non-numeric characters
    let value = input.value.replace(/\D/g, '');

    // Format with thousand separators
    if (value) {
        value = parseInt(value).toLocaleString('tr-TR');
    }

    input.value = value;
}

// Location management functions for edit modal
const editLocationData = {
    istanbul: ['Kadıköy', 'Beşiktaş', 'Şişli', 'Beyoğlu', 'Üsküdar'],
    ankara: ['Çankaya', 'Kızılay', 'Ulus', 'Bahçelievler'],
    izmir: ['Konak', 'Karşıyaka', 'Bornova', 'Buca'],
    bursa: ['Osmangazi', 'Nilüfer', 'Yıldırım'],
    antalya: ['Muratpaşa', 'Konyaaltı', 'Kepez']
};

// Design project location data
const editDesignLocationData = {
    istanbul: ['Kadıköy', 'Beşiktaş', 'Şişli', 'Beyoğlu', 'Üsküdar'],
    ankara: ['Çankaya', 'Kızılay', 'Ulus', 'Bahçelievler'],
    izmir: ['Konak', 'Karşıyaka', 'Bornova', 'Buca'],
    bursa: ['Osmangazi', 'Nilüfer', 'Yıldırım'],
    antalya: ['Muratpaşa', 'Konyaaltı', 'Kepez']
};

const editNeighborhoodData = {
    'Kadıköy': ['Moda', 'Caferağa', 'Fenerbahçe'],
    'Beşiktaş': ['Etiler', 'Levent', 'Ortaköy'],
    'Çankaya': ['Kızılay', 'Bahçelievler', 'Çukurambar']
};

// Design project neighborhood data
const editDesignNeighborhoodData = {
    'Kadıköy': ['Moda', 'Caferağa', 'Fenerbahçe'],
    'Beşiktaş': ['Etiler', 'Levent', 'Ortaköy'],
    'Çankaya': ['Kızılay', 'Bahçelievler', 'Çukurambar'],
    'Konak': ['Alsancak', 'Göztepe', 'Güzelyalı'],
    'Osmangazi': ['Soğanlı', 'Hamitler', 'Panayır']
};

function updateEditDesignDistricts() {
    const citySelect = document.getElementById('edit-design-city');
    const districtSelect = document.getElementById('edit-design-district');
    const neighborhoodSelect = document.getElementById('edit-design-neighborhood');

    const selectedCity = citySelect.value;

    // Clear districts and neighborhoods
    districtSelect.innerHTML = '<option value="">İlçe seçiniz</option>';
    neighborhoodSelect.innerHTML = '<option value="">Önce ilçe seçiniz</option>';

    if (selectedCity && editDesignLocationData[selectedCity]) {
        editDesignLocationData[selectedCity].forEach(district => {
            const option = document.createElement('option');
            option.value = district.toLowerCase().replace(' ', '');
            option.textContent = district;
            districtSelect.appendChild(option);
        });
    }
}

function updateEditDesignNeighborhoods() {
    const districtSelect = document.getElementById('edit-design-district');
    const neighborhoodSelect = document.getElementById('edit-design-neighborhood');

    const selectedDistrict = districtSelect.options[districtSelect.selectedIndex].text;

    // Clear neighborhoods
    neighborhoodSelect.innerHTML = '<option value="">Mahalle seçiniz</option>';

    if (selectedDistrict && editDesignNeighborhoodData[selectedDistrict]) {
        editDesignNeighborhoodData[selectedDistrict].forEach(neighborhood => {
            const option = document.createElement('option');
            option.value = neighborhood.toLowerCase().replace(' ', '');
            option.textContent = neighborhood;
            neighborhoodSelect.appendChild(option);
        });
    }
}

function queryEditParcel() {
    const ada = document.getElementById('edit-design-ada').value;
    const parsel = document.getElementById('edit-design-parsel').value;
    const city = document.getElementById('edit-design-city').value;
    const district = document.getElementById('edit-design-district').value;

    if (!ada || !parsel || !city || !district) {
        alert('Lütfen il, ilçe, ada ve parsel bilgilerini girin.');
        return;
    }

    // Simüle edilmiş parsel sorgulaması
    alert('Parsel sorgulanıyor...');

    setTimeout(() => {
        // Simüle edilmiş başarılı sonuç
        alert(`Ada: ${ada}, Parsel: ${parsel} başarıyla doğrulandı. Parsel bilgileri geçerli.`);
    }, 1000);
}

function updateEditDistricts() {
    const citySelect = document.getElementById('edit-location-city');
    const districtSelect = document.getElementById('edit-location-district');
    const neighborhoodSelect = document.getElementById('edit-location-neighborhood');

    const selectedCity = citySelect.value;

    // Clear districts and neighborhoods
    districtSelect.innerHTML = '<option value="">İlçe seçiniz</option>';
    neighborhoodSelect.innerHTML = '<option value="">Önce ilçe seçiniz</option>';

    if (selectedCity && editLocationData[selectedCity]) {
        editLocationData[selectedCity].forEach(district => {
            const option = document.createElement('option');
            option.value = district.toLowerCase().replace(' ', '');
            option.textContent = district;
            districtSelect.appendChild(option);
        });
    }
}

function updateEditNeighborhoods() {
    const districtSelect = document.getElementById('edit-location-district');
    const neighborhoodSelect = document.getElementById('edit-location-neighborhood');

    const selectedDistrict = districtSelect.options[districtSelect.selectedIndex].text;

    // Clear neighborhoods
    neighborhoodSelect.innerHTML = '<option value="">Mahalle seçiniz</option>';

    if (selectedDistrict && editNeighborhoodData[selectedDistrict]) {
        editNeighborhoodData[selectedDistrict].forEach(neighborhood => {
            const option = document.createElement('option');
            option.value = neighborhood.toLowerCase().replace(' ', '');
            option.textContent = neighborhood;
            neighborhoodSelect.appendChild(option);
        });
    }
}

function editApartmentListing(listingId) {
    const listing = myListings.apartments.find(l => l.id === listingId);
    if (!listing) return;

    // Fill modal with listing data
    document.getElementById('edit-apartment-id').value = listing.id;
    document.getElementById('edit-apartment-status').value = listing.status;
    document.getElementById('edit-apartment-title').value = listing.title;
    document.getElementById('edit-apartment-price').value = listing.price.toLocaleString('tr-TR');
    document.getElementById('edit-apartment-description').value = listing.description;

    // Fill extended fields with default or existing values
    document.getElementById('edit-apartment-number').value = listing.apartmentNumber || '';
    document.getElementById('edit-apartment-rooms').value = listing.rooms || '';
    document.getElementById('edit-net-area').value = listing.netArea || listing.area?.replace('m²', '').trim() || '';
    document.getElementById('edit-gross-area').value = listing.grossArea || '';
    document.getElementById('edit-room-count').value = listing.roomCount || '';
    document.getElementById('edit-bathroom').value = listing.bathroom || '1';
    document.getElementById('edit-balcony').value = listing.balcony || '0';
    document.getElementById('edit-floor').value = listing.floor || '';

    // Bina bilgileri
    document.getElementById('edit-building-age').value = listing.buildingAge || '';
    document.getElementById('edit-building-floors').value = listing.buildingFloors || '';
    document.getElementById('edit-elevator').value = listing.elevator || 'var';
    document.getElementById('edit-parking').value = listing.parking || '';
    document.getElementById('edit-heating').value = listing.heating || '';

    // Location fields
    const locationParts = listing.location.split(', ');
    if (locationParts.length >= 2) {
        const city = locationParts[1].toLowerCase();
        const district = locationParts[0];

        document.getElementById('edit-location-city').value = city;
        updateEditDistricts();

        setTimeout(() => {
            const districtSelect = document.getElementById('edit-location-district');
            for (let i = 0; i < districtSelect.options.length; i++) {
                if (districtSelect.options[i].text === district) {
                    districtSelect.selectedIndex = i;
                    updateEditNeighborhoods();
                    break;
                }
            }
        }, 100);
    }

    document.getElementById('edit-location-address').value = listing.detailAddress || '';
    document.getElementById('edit-location-metro').value = listing.metro || '';
    document.getElementById('edit-location-bus').value = listing.bus || '';
    document.getElementById('edit-location-amenities').value = listing.amenities || '';

    // Clear and reset all feature checkboxes
    document.querySelectorAll('.edit-apartment-feature').forEach(checkbox => {
        checkbox.checked = false;
    });

    // Check existing features if available
    if (listing.features && Array.isArray(listing.features)) {
        listing.features.forEach(feature => {
            const featureCheckbox = document.querySelector(`#edit-feature-${feature.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z-]/g, '')}`);
            if (featureCheckbox) {
                featureCheckbox.checked = true;
            }
        });
    }

    // Render image previews
    const previewContainer = document.getElementById('apartment-images-preview');
    previewContainer.innerHTML = listing.images.map((img, index) => `
                <div class="relative">
                    <img src="${img}" alt="Önizleme ${index + 1}" class="w-full h-24 object-cover rounded-lg">
                    <button onclick="removeImage(${index})" class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `).join('');

    showModal('edit-apartment-modal');
}

function saveApartmentChanges() {
    const listingId = parseInt(document.getElementById('edit-apartment-id').value);
    const listing = myListings.apartments.find(l => l.id === listingId);
    if (!listing) return;

    // Update basic listing data
    listing.status = document.getElementById('edit-apartment-status').value;
    listing.title = document.getElementById('edit-apartment-title').value;
    listing.description = document.getElementById('edit-apartment-description').value;

    // Parse and format price
    const priceStr = document.getElementById('edit-apartment-price').value.replace(/\./g, '').replace(/,/g, '');
    listing.price = parseInt(priceStr) || 0;

    // Update extended fields
    listing.apartmentNumber = document.getElementById('edit-apartment-number').value;
    listing.rooms = document.getElementById('edit-apartment-rooms').value;
    listing.netArea = document.getElementById('edit-net-area').value;
    listing.grossArea = document.getElementById('edit-gross-area').value;
    listing.roomCount = document.getElementById('edit-room-count').value;
    listing.bathroom = document.getElementById('edit-bathroom').value;
    listing.balcony = document.getElementById('edit-balcony').value;
    listing.floor = parseInt(document.getElementById('edit-floor').value) || 0;

    // Update building info
    listing.buildingAge = document.getElementById('edit-building-age').value;
    listing.buildingFloors = document.getElementById('edit-building-floors').value;
    listing.elevator = document.getElementById('edit-elevator').value;
    listing.parking = document.getElementById('edit-parking').value;
    listing.heating = document.getElementById('edit-heating').value;

    // Update location
    const citySelect = document.getElementById('edit-location-city');
    const districtSelect = document.getElementById('edit-location-district');
    const neighborhoodSelect = document.getElementById('edit-location-neighborhood');

    const cityText = citySelect.options[citySelect.selectedIndex]?.text || '';
    const districtText = districtSelect.options[districtSelect.selectedIndex]?.text || '';
    const neighborhoodText = neighborhoodSelect.options[neighborhoodSelect.selectedIndex]?.text || '';

    listing.location = districtText && cityText ? `${districtText}, ${cityText}` : listing.location;
    listing.detailAddress = document.getElementById('edit-location-address').value;
    listing.metro = document.getElementById('edit-location-metro').value;
    listing.bus = document.getElementById('edit-location-bus').value;
    listing.amenities = document.getElementById('edit-location-amenities').value;
    listing.neighborhood = neighborhoodText;

    // Update features
    const features = [];
    document.querySelectorAll('.edit-apartment-feature:checked').forEach(checkbox => {
        const label = checkbox.parentElement.querySelector('span').textContent;
        features.push(label);
    });
    listing.features = features;

    // Update area display - use net area as primary
    const netAreaValue = document.getElementById('edit-net-area').value;
    listing.area = netAreaValue ? `${netAreaValue}m²` : listing.area;

    // Re-render listings
    renderApartmentListings();
    closeModal('edit-apartment-modal');

    // Show success message
    alert('Daire ilanı başarıyla güncellendi!');
}

function deactivateApartmentListing(listingId) {
    const listing = myListings.apartments.find(l => l.id === listingId);
    if (!listing) return;

    listing.status = 'inactive';
    renderApartmentListings();
}

// Edit Design Project için gereksinimler yönetimi
let editSelectedRequirements = [];
let editUploadedFiles = [];

// Gereksinim listesi
const editProjectRequirements = {
    '3d-cizim': { name: '3D Çizim', icon: 'fas fa-cube' },
    'mimari-bilgiler': { name: 'Mimari Bilgiler', icon: 'fas fa-building' },
    'statik-proje': { name: 'Statik Proje', icon: 'fas fa-hammer' },
    'mekanik-proje': { name: 'Mekanik Proje', icon: 'fas fa-cogs' },
    'elektrik-projesi': { name: 'Elektrik Projesi', icon: 'fas fa-bolt' },
    'zemin-etudu': { name: 'Zemin Etüdü', icon: 'fas fa-mountain' },
    'ic-mimari': { name: 'İç Mimari', icon: 'fas fa-couch' },
    'peyzaj-tasarimi': { name: 'Peyzaj Tasarımı', icon: 'fas fa-tree' },
    'enerji-kimlik': { name: 'Enerji Kimlik Belgesi', icon: 'fas fa-leaf' },
    'yangin-projesi': { name: 'Yangın Projesi', icon: 'fas fa-fire-extinguisher' }
};

function toggleEditRequirement(requirementKey) {
    const button = document.querySelector(`[data-requirement="${requirementKey}"]`);
    const isSelected = editSelectedRequirements.includes(requirementKey);

    if (isSelected) {
        // Seçimi kaldır
        editSelectedRequirements = editSelectedRequirements.filter(req => req !== requirementKey);
        button.classList.remove('bg-purple-100', 'border-purple-500', 'text-purple-700');
        button.classList.add('border-gray-300');
    } else {
        // Seçim ekle
        editSelectedRequirements.push(requirementKey);
        button.classList.remove('border-gray-300');
        button.classList.add('bg-purple-100', 'border-purple-500', 'text-purple-700');
    }

    updateEditSelectedRequirementsDisplay();
}

function updateEditSelectedRequirementsDisplay() {
    const container = document.getElementById('edit-selected-requirements');
    const list = document.getElementById('edit-selected-requirements-list');

    if (editSelectedRequirements.length === 0) {
        container.classList.add('hidden');
        return;
    }

    container.classList.remove('hidden');
    list.innerHTML = editSelectedRequirements.map(reqKey => {
        const req = editProjectRequirements[reqKey];
        return `
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        <i class="${req.icon} mr-1"></i>
                        ${req.name}
                        <button onclick="toggleEditRequirement('${reqKey}')" class="ml-2 text-purple-600 hover:text-purple-800">
                            <i class="fas fa-times"></i>
                        </button>
                    </span>
                `;
    }).join('');
}

// Dosya yükleme işlevselliği
document.addEventListener('DOMContentLoaded', function () {
    const editFileInput = document.getElementById('edit-design-files');
    if (editFileInput) {
        editFileInput.addEventListener('change', function (e) {
            handleEditFileUpload(e.target.files);
        });
    }
});

function handleEditFileUpload(files) {
    Array.from(files).forEach(file => {
        if (editUploadedFiles.length >= 10) {
            alert('En fazla 10 dosya yükleyebilirsiniz.');
            return;
        }

        editUploadedFiles.push(file);
        addEditFileToPreview(file);
    });
}

function addEditFileToPreview(file) {
    const preview = document.getElementById('edit-uploaded-files-preview');
    const fileDiv = document.createElement('div');
    fileDiv.className = 'flex items-center justify-between p-2 bg-gray-50 rounded-lg border';

    const fileSize = (file.size / 1024 / 1024).toFixed(2);
    const fileIcon = getEditFileIcon(file.type);

    fileDiv.innerHTML = `
                <div class="flex items-center space-x-2">
                    <i class="${fileIcon} text-blue-600"></i>
                    <div>
                        <p class="text-sm font-medium text-gray-900">${file.name}</p>
                        <p class="text-xs text-gray-500">${fileSize} MB</p>
                    </div>
                </div>
                <button onclick="removeEditFile('${file.name}')" class="text-red-500 hover:text-red-700">
                    <i class="fas fa-times"></i>
                </button>
            `;

    preview.appendChild(fileDiv);
}

function getEditFileIcon(fileType) {
    if (fileType.includes('pdf')) return 'fas fa-file-pdf';
    if (fileType.includes('image')) return 'fas fa-file-image';
    if (fileType.includes('word') || fileType.includes('document')) return 'fas fa-file-word';
    if (fileType.includes('dwg') || fileType.includes('autocad')) return 'fas fa-drafting-compass';
    return 'fas fa-file';
}

function removeEditFile(fileName) {
    editUploadedFiles = editUploadedFiles.filter(file => file.name !== fileName);
    renderEditFilePreview();
}

function renderEditFilePreview() {
    const preview = document.getElementById('edit-uploaded-files-preview');
    preview.innerHTML = '';
    editUploadedFiles.forEach(file => addEditFileToPreview(file));
}

// Bütçe hesaplama fonksiyonu
function calculateEditTotalBudget() {
    const apartmentCount = parseInt(document.getElementById('edit-apartment-count').value) || 0;
    const pricePerApartment = parseInt(document.getElementById('edit-price-per-apartment').value) || 0;
    const totalBudget = apartmentCount * pricePerApartment;

    document.getElementById('edit-total-budget').value = totalBudget;
}

// Action Functions for Design Project Listings
function editDesignListing(listingId) {
    const listing = myListings.designProjects.find(l => l.id === listingId);
    if (!listing) return;

    // Fill modal with listing data
    document.getElementById('edit-design-id').value = listing.id;
    document.getElementById('edit-design-status').value = listing.status;
    document.getElementById('edit-design-title').value = listing.title;
    document.getElementById('edit-design-type').value = listing.type === 'Tasarım (Avan) Projesi' ? 'avan' : 'uygulama';
    document.getElementById('edit-design-area').value = listing.area ? listing.area.replace('m²', '').trim() : '';
    document.getElementById('edit-design-deadline').value = listing.deadline;
    document.getElementById('edit-design-description').value = listing.description;
    document.getElementById('edit-additional-notes').value = listing.additionalNotes || '';

    // Bütçe hesaplama verilerini doldur
    document.getElementById('edit-apartment-count').value = listing.apartmentCount || '';
    document.getElementById('edit-price-per-apartment').value = listing.pricePerApartment || '';
    document.getElementById('edit-total-budget').value = listing.totalBudget || '';

    // Konum bilgilerini doldur
    if (listing.location) {
        document.getElementById('edit-design-city').value = listing.location.city || '';
        if (listing.location.city) {
            updateEditDesignDistricts();
            setTimeout(() => {
                document.getElementById('edit-design-district').value = listing.location.district || '';
                if (listing.location.district) {
                    updateEditDesignNeighborhoods();
                    setTimeout(() => {
                        document.getElementById('edit-design-neighborhood').value = listing.location.neighborhood || '';
                    }, 100);
                }
            }, 100);
        }
        document.getElementById('edit-design-address').value = listing.location.address || '';
    } else {
        // Konum alanlarını temizle
        document.getElementById('edit-design-city').value = '';
        document.getElementById('edit-design-district').innerHTML = '<option value="">Önce il seçiniz</option>';
        document.getElementById('edit-design-neighborhood').innerHTML = '<option value="">Önce ilçe seçiniz</option>';
        document.getElementById('edit-design-address').value = '';
    }

    // Ada ve parsel bilgilerini doldur
    if (listing.parcelInfo) {
        document.getElementById('edit-design-ada').value = listing.parcelInfo.ada || '';
        document.getElementById('edit-design-parsel').value = listing.parcelInfo.parsel || '';
        document.getElementById('edit-design-pafta').value = listing.parcelInfo.pafta || '';
    } else {
        // Ada parsel alanlarını temizle
        document.getElementById('edit-design-ada').value = '';
        document.getElementById('edit-design-parsel').value = '';
        document.getElementById('edit-design-pafta').value = '';
    }

    // Gereksinimler seçimini temizle
    editSelectedRequirements = [];
    document.querySelectorAll('.edit-requirement-btn').forEach(btn => {
        btn.classList.remove('bg-purple-100', 'border-purple-500', 'text-purple-700');
        btn.classList.add('border-gray-300');
    });

    // Mevcut gereksinimleri seç
    if (listing.selectedRequirements && Array.isArray(listing.selectedRequirements)) {
        listing.selectedRequirements.forEach(reqName => {
            // Gereksinim adından key bulma
            const reqKey = Object.keys(editProjectRequirements).find(key =>
                editProjectRequirements[key].name === reqName
            );
            if (reqKey) {
                toggleEditRequirement(reqKey);
            }
        });
    }

    // Dosyaları temizle
    editUploadedFiles = [];
    document.getElementById('edit-uploaded-files-preview').innerHTML = '';

    showModal('edit-design-modal');
}

function saveDesignChanges() {
    const listingId = parseInt(document.getElementById('edit-design-id').value);
    const listing = myListings.designProjects.find(l => l.id === listingId);
    if (!listing) return;

    // Update listing data
    listing.status = document.getElementById('edit-design-status').value;
    listing.title = document.getElementById('edit-design-title').value;
    listing.type = document.getElementById('edit-design-type').value === 'avan' ? 'Tasarım (Avan) Projesi' : 'Uygulama Projesi';

    // Proje alanını güncelle
    const areaValue = document.getElementById('edit-design-area').value;
    listing.area = areaValue ? `${areaValue}m²` : listing.area;
    listing.projectArea = parseInt(areaValue) || 0;

    listing.deadline = parseInt(document.getElementById('edit-design-deadline').value);
    listing.description = document.getElementById('edit-design-description').value;
    listing.additionalNotes = document.getElementById('edit-additional-notes').value;

    // Bütçe hesaplama verilerini kaydet
    listing.apartmentCount = parseInt(document.getElementById('edit-apartment-count').value) || 0;
    listing.pricePerApartment = parseInt(document.getElementById('edit-price-per-apartment').value) || 0;
    listing.totalBudget = parseInt(document.getElementById('edit-total-budget').value) || 0;

    // Konum bilgilerini kaydet
    const city = document.getElementById('edit-design-city').value;
    const district = document.getElementById('edit-design-district').value;
    const neighborhood = document.getElementById('edit-design-neighborhood').value;
    const address = document.getElementById('edit-design-address').value;

    // Ada ve parsel bilgileri
    const ada = document.getElementById('edit-design-ada').value;
    const parsel = document.getElementById('edit-design-parsel').value;
    const pafta = document.getElementById('edit-design-pafta').value;

    listing.location = {
        city: city,
        district: district,
        neighborhood: neighborhood,
        address: address
    };

    // Ada ve parsel bilgilerini kaydet
    listing.parcelInfo = {
        ada: parseInt(ada) || 0,
        parsel: parseInt(parsel) || 0,
        pafta: pafta || ''
    };

    // Gereksinimler kaydet
    listing.selectedRequirements = editSelectedRequirements.map(reqKey => editProjectRequirements[reqKey].name);

    // Dosyalar kaydet (simülasyon)
    if (editUploadedFiles.length > 0) {
        listing.uploadedFiles = editUploadedFiles.map(file => ({
            name: file.name,
            size: file.size,
            type: file.type
        }));
    }

    // Re-render listings
    renderDesignProjectListings();
    closeModal('edit-design-modal');

    // Başarı mesajı
    const requirementCount = editSelectedRequirements.length;
    const fileCount = editUploadedFiles.length;
    let successMessage = 'Proje çizim ilanı başarıyla güncellendi!';

    if (listing.apartmentCount && listing.totalBudget) {
        successMessage += ` (${listing.apartmentCount} daire, toplam ${listing.totalBudget.toLocaleString('tr-TR')} ₺)`;
    }
    if (listing.location && listing.location.city) {
        const cityName = listing.location.city.charAt(0).toUpperCase() + listing.location.city.slice(1);
        successMessage += ` Konum: ${cityName}`;
    }
    if (requirementCount > 0) {
        successMessage += ` ${requirementCount} gereksinim seçildi.`;
    }
    if (fileCount > 0) {
        successMessage += ` ${fileCount} dosya yüklendi.`;
    }

    alert(successMessage);

    // Temizle
    editSelectedRequirements = [];
    editUploadedFiles = [];
}

function deactivateDesignListing(listingId) {
    const listing = myListings.designProjects.find(l => l.id === listingId);
    if (!listing) return;

    listing.status = 'inactive';
    renderDesignProjectListings();
}

// Image handling functions
function removeImage(index) {
    const listingId = parseInt(document.getElementById('edit-apartment-id').value);
    const listing = myListings.apartments.find(l => l.id === listingId);
    if (!listing) return;

    listing.images.splice(index, 1);
    editApartmentListing(listingId); // Re-render image previews
}

// Handle image uploads
document.getElementById('apartment-images-input').addEventListener('change', function (e) {
    const files = Array.from(e.target.files);
    const listingId = parseInt(document.getElementById('edit-apartment-id').value);
    const listing = myListings.apartments.find(l => l.id === listingId);
    if (!listing) return;

    // In a real app, you would upload these files to a server
    // For demo, we'll just create object URLs
    const newImages = files.map(file => URL.createObjectURL(file));
    listing.images = [...listing.images, ...newImages];
    editApartmentListing(listingId); // Re-render image previews
});
