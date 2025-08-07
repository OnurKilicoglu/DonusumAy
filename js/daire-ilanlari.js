
        // Mock Data - Daire ilanları
        const mockApartmentListings = [
            {
                id: 1,
                title: "Kadıköy Merkez'de Satılık 3+1 Daire",
                type: "3+1",
                city: "istanbul",
                district: "kadikoy",
                address: "Kadıköy, İstanbul",
                price: 2850000,
                sqm: 125,
                rooms: 3,
                date: "2024-12-15",
                description: "Deniz manzaralı, asansörlü binada, merkezi konumda 3+1 daire.",
                images: [
                    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=400&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=400&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?q=80&w=400&auto=format&fit=crop"
                ],
                features: ["Deniz Manzarası", "Asansör", "Balkon", "Otopark"]
            },
            {
                id: 2,
                title: "Çankaya'da Modern 2+1 Daire",
                type: "2+1",
                city: "ankara",
                district: "cankaya",
                address: "Çankaya, Ankara",
                price: 1650000,
                sqm: 95,
                rooms: 2,
                date: "2024-12-14",
                description: "Yeni yapım, güvenlikli sitede 2+1 daire.",
                images: [
                    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=400&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=400&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=400&auto=format&fit=crop"
                ],
                features: ["Güvenlik", "Otopark", "Balkon", "Asansör"]
            },
            {
                id: 3,
                title: "Bornova'da Geniş 4+1 Dublex",
                type: "dublex",
                city: "izmir",
                district: "bornova",
                address: "Bornova, İzmir",
                price: 3200000,
                sqm: 180,
                rooms: 4,
                date: "2024-12-13",
                description: "Bahçeli, geniş dublex daire. Aile için ideal.",
                images: [
                    "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?q=80&w=400&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=400&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=400&auto=format&fit=crop"
                ],
                features: ["Bahçe", "Dublex", "Otopark", "Asansör"]
            },
            {
                id: 4,
                title: "Beşiktaş'ta Lüks 4+1 Daire",
                type: "4+1",
                city: "istanbul",
                district: "besiktas",
                address: "Beşiktaş, İstanbul",
                price: 8500000,
                sqm: 200,
                rooms: 4,
                date: "2024-12-12",
                description: "Boğaz manzaralı, lüks konut kompleksinde daire.",
                images: [
                    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=400&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=400&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=400&auto=format&fit=crop"
                ],
                features: ["Boğaz Manzarası", "Lüks", "Güvenlik", "Otopark"]
            },
            {
                id: 5,
                title: "Şişli'de Merkezi 1+1 Daire",
                type: "1+1",
                city: "istanbul",
                district: "sisli",
                address: "Şişli, İstanbul",
                price: 1450000,
                sqm: 65,
                rooms: 1,
                date: "2024-12-11",
                description: "Metro yakını, merkezi konumda 1+1 daire.",
                images: [
                    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=400&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=400&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=400&auto=format&fit=crop"
                ],
                features: ["Metro Yakını", "Merkezi", "Asansör"]
            },
            {
                id: 6,
                title: "Keçiören'de Aile Dostu 3+1",
                type: "3+1",
                city: "ankara",
                district: "kecioren",
                address: "Keçiören, Ankara",
                price: 1850000,
                sqm: 130,
                rooms: 3,
                date: "2024-12-10",
                description: "Çocuk oyun alanı olan sitede 3+1 daire.",
                images: [
                    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=400&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=400&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?q=80&w=400&auto=format&fit=crop"
                ],
                features: ["Çocuk Parkı", "Site İçi", "Otopark", "Güvenlik"]
            }
        ];
        
        const cities = {
            istanbul: ["Kadıköy", "Beşiktaş", "Şişli", "Bakırköy", "Üsküdar"],
            ankara: ["Çankaya", "Keçiören", "Yenimahalle", "Mamak", "Sincan"],
            izmir: ["Bornova", "Konak", "Karşıyaka", "Buca", "Balçova"],
            bursa: ["Osmangazi", "Nilüfer", "Yıldırım", "Gemlik", "İnegöl"],
            antalya: ["Muratpaşa", "Kepez", "Konyaaltı", "Aksu", "Döşemealtı"]
        };
        
        let filteredListings = [...mockApartmentListings];
        let currentPage = 1;
        const itemsPerPage = 6;
        
        // Kullanıcının geldiği paneli belirlemek için URL parametrelerini kontrol eden fonksiyon
        function checkUserPanel() {
            const urlParams = new URLSearchParams(window.location.search);
            const userPanel = urlParams.get('from');
            
            // Dashboard linkini güncelle
            const backToDashboard = document.getElementById('back-to-dashboard');
            if (userPanel && backToDashboard) {
                switch(userPanel) {
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
            
            // Tüm İlanlar linkini güncelle
            const allListingsLink = document.querySelector('a[href="ilanlar.html?from=customer"]');
            if (userPanel && allListingsLink) {
                allListingsLink.href = `ilanlar.html?from=${userPanel}`;
            }
        }

        // Sayfa yüklendiğinde fonksiyonu çağır
        document.addEventListener('DOMContentLoaded', function() {
            checkUserPanel();
            updateDistrictOptions();
            setupRangeSliders();
            renderListings();
            updateTotalCount();
            
            // Event listeners
            document.getElementById('city').addEventListener('change', updateDistrictOptions);
            document.getElementById('sort-by').addEventListener('change', applySorting);
            
            // Range slider listeners
            document.getElementById('min-price').addEventListener('input', updatePriceDisplay);
            document.getElementById('max-price').addEventListener('input', updatePriceDisplay);
            document.getElementById('min-sqm').addEventListener('input', updateSqmDisplay);
            document.getElementById('max-sqm').addEventListener('input', updateSqmDisplay);
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
            updatePriceDisplay();
            updateSqmDisplay();
        }
        
        function updatePriceDisplay() {
            const minPrice = document.getElementById('min-price').value;
            const maxPrice = document.getElementById('max-price').value;
            
            document.getElementById('min-price-value').textContent = formatPrice(minPrice);
            document.getElementById('max-price-value').textContent = formatPrice(maxPrice);
            
            // Ensure min is not greater than max
            if (parseInt(minPrice) > parseInt(maxPrice)) {
                document.getElementById('max-price').value = minPrice;
                document.getElementById('max-price-value').textContent = formatPrice(minPrice);
            }
        }
        
        function updateSqmDisplay() {
            const minSqm = document.getElementById('min-sqm').value;
            const maxSqm = document.getElementById('max-sqm').value;
            
            document.getElementById('min-sqm-value').textContent = minSqm;
            document.getElementById('max-sqm-value').textContent = maxSqm;
            
            // Ensure min is not greater than max
            if (parseInt(minSqm) > parseInt(maxSqm)) {
                document.getElementById('max-sqm').value = minSqm;
                document.getElementById('max-sqm-value').textContent = minSqm;
            }
        }
        
        function formatPrice(price) {
            return (parseInt(price) / 1000000).toFixed(1) + 'M';
        }
        
        // Filter functions
        function applyFilters() {
            const city = document.getElementById('city').value;
            const district = document.getElementById('district').value;
            const minPrice = parseInt(document.getElementById('min-price').value);
            const maxPrice = parseInt(document.getElementById('max-price').value);
            const minSqm = parseInt(document.getElementById('min-sqm').value);
            const maxSqm = parseInt(document.getElementById('max-sqm').value);
            
            // Get checked apartment types
            const apartmentTypes = [];
            document.querySelectorAll('input[type="checkbox"][id*="apt-"]').forEach(checkbox => {
                if (checkbox.checked) {
                    apartmentTypes.push(checkbox.value);
                }
            });
            
            // Get checked room counts
            const roomCounts = [];
            document.querySelectorAll('input[type="checkbox"][id*="rooms-"]').forEach(checkbox => {
                if (checkbox.checked) {
                    roomCounts.push(parseInt(checkbox.value));
                }
            });
            
            // Get checked features
            const features = [];
            document.querySelectorAll('input[type="checkbox"][id*="feature-"]').forEach(checkbox => {
                if (checkbox.checked) {
                    features.push(checkbox.value);
                }
            });
            
            // Apply filters
            filteredListings = mockApartmentListings.filter(listing => {
                // City filter
                if (city && listing.city !== city) return false;
                
                // District filter
                if (district && listing.district !== district) return false;
                
                // Price filter
                if (listing.price < minPrice || listing.price > maxPrice) return false;
                
                // Sqm filter
                if (listing.sqm < minSqm || listing.sqm > maxSqm) return false;
                
                // Apartment type filter
                if (apartmentTypes.length > 0 && !apartmentTypes.includes(listing.type)) return false;
                
                // Room count filter
                if (roomCounts.length > 0) {
                    const rooms = listing.rooms;
                    let matchesRoomCount = false;
                    
                    roomCounts.forEach(count => {
                        if (count === 4 && rooms >= 4) matchesRoomCount = true;
                        else if (rooms === count) matchesRoomCount = true;
                    });
                    
                    if (!matchesRoomCount) return false;
                }
                
                // Features filter
                if (features.length > 0) {
                    const hasAllFeatures = features.every(feature => {
                        const featureMap = {
                            'balcony': 'Balkon',
                            'elevator': 'Asansör',
                            'parking': 'Otopark',
                            'garden': 'Bahçe',
                            'security': 'Güvenlik'
                        };
                        return listing.features.some(f => f.includes(featureMap[feature]));
                    });
                    
                    if (!hasAllFeatures) return false;
                }
                
                return true;
            });
            
            currentPage = 1;
            renderListings();
            updateTotalCount();
            showNotification(`${filteredListings.length} daire ilanı bulundu.`, 'success');
        }
        
        function clearAllFilters() {
            // Clear all form elements
            document.getElementById('city').value = '';
            document.getElementById('district').value = '';
            document.getElementById('min-price').value = '500000';
            document.getElementById('max-price').value = '10000000';
            document.getElementById('min-sqm').value = '50';
            document.getElementById('max-sqm').value = '300';
            
            // Clear all checkboxes
            document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                checkbox.checked = false;
            });
            
            updateDistrictOptions();
            updatePriceDisplay();
            updateSqmDisplay();
            
            filteredListings = [...mockApartmentListings];
            currentPage = 1;
            renderListings();
            updateTotalCount();
            showNotification('Filtreler temizlendi.', 'info');
        }
        
        // Sorting
        function applySorting() {
            const sortBy = document.getElementById('sort-by').value;
            
            switch(sortBy) {
                case 'date-desc':
                    filteredListings.sort((a, b) => new Date(b.date) - new Date(a.date));
                    break;
                case 'date-asc':
                    filteredListings.sort((a, b) => new Date(a.date) - new Date(b.date));
                    break;
                case 'price-desc':
                    filteredListings.sort((a, b) => b.price - a.price);
                    break;
                case 'price-asc':
                    filteredListings.sort((a, b) => a.price - b.price);
                    break;
                case 'sqm-desc':
                    filteredListings.sort((a, b) => b.sqm - a.sqm);
                    break;
                case 'sqm-asc':
                    filteredListings.sort((a, b) => a.sqm - b.sqm);
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
                                ${listing.type}
                            </span>
                        </div>
                        <div class="absolute top-4 right-4">
                            <span class="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                                Satılık
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
                                <span class="text-gray-600">Fiyat:</span>
                                <span class="font-bold text-purple-600">${formatCurrency(listing.price)} ₺</span>
                            </div>
                            <div class="flex justify-between text-sm">
                                <span class="text-gray-600">Metrekare:</span>
                                <span class="font-medium text-gray-800">${listing.sqm} m²</span>
                            </div>
                            <div class="flex justify-between text-sm">
                                <span class="text-gray-600">Oda Sayısı:</span>
                                <span class="font-medium text-gray-800">${listing.rooms} oda</span>
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
            initializeSliders();
        }
        
        function formatCurrency(amount) {
            return new Intl.NumberFormat('tr-TR').format(amount);
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
        
        function formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('tr-TR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
        
        function viewDetails(listingId) {
            window.location.href = `daire-ilan-detay.html?id=${listingId}`;
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
<<<<<<< HEAD
    
=======
    
>>>>>>> 7c2648f217cd90583ed52613a38179d721df4bdf
