
// Sample project data - In a real app, this would come from an API
const projectData = [
    {
        id: 1,
        title: "Modern Konut Kompleksi Tasarım Projesi",
        type: "avan",
        description: "40 daireli modern konut kompleksi için avan proje çizimi. Sürdürülebilir mimari ve çağdaş tasarım anlayışı beklenmektedir.",
        budget: 75000,
        deadline: 45,
        contractor: "Güven İnşaat A.Ş.",
        location: "İstanbul, Beşiktaş",
        projectArea: 2500,
        apartmentCount: 40,
        pricePerApartment: 1875,
        totalBudget: 75000,
        parcelInfo: {
            ada: 123,
            parsel: 5,
            pafta: "K21d2a"
        },
        locationDetails: {
            city: "İstanbul",
            district: "Beşiktaş",
            neighborhood: "Etiler",
            address: "Etiler Mahallesi Ulus Caddesi No:45"
        },
        uploadedFiles: [
            {
                name: "imar_capi_belgesi.pdf",
                type: "application/pdf",
                size: 2048576,
                url: "data:application/pdf;base64,sample-pdf-data",
                uploadDate: "2025-01-15T09:30:00Z"
            },
            {
                name: "arsa_vaziyet_plani.dwg",
                type: "application/dwg",
                size: 3145728,
                url: "data:application/dwg;base64,sample-dwg-data",
                uploadDate: "2025-01-15T09:35:00Z"
            },
            {
                name: "arsa_gorunumu.jpg",
                type: "image/jpeg",
                size: 1572864,
                url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
                uploadDate: "2025-01-15T09:40:00Z"
            }
        ],
        requirements: [
            "AutoCAD çizim dosyaları",
            "3D görselleştirme",
            "Yapı raporları",
            "Mimari detay çizimleri"
        ],
        createdAt: "2025-01-15T10:00:00Z",
        status: "active",
        urgency: false
    },
    {
        id: 2,
        title: "Ticari Bina Uygulama Projesi",
        type: "uygulama",
        description: "5 katlı ticari bina için uygulama projesi. Belediye onayı için gerekli tüm çizimler ve hesaplar dahil.",
        budget: 120000,
        deadline: 30,
        contractor: "Yapı Merkezi Ltd.",
        location: "Ankara, Çankaya",
        projectArea: 1800,
        apartmentCount: 20,
        pricePerApartment: 6000,
        totalBudget: 120000,
        parcelInfo: {
            ada: 456,
            parsel: 12,
            pafta: "A15c3b"
        },
        locationDetails: {
            city: "Ankara",
            district: "Çankaya",
            neighborhood: "Kızılay",
            address: "Kızılay Mahallesi Atatürk Bulvarı No:123"
        },
        uploadedFiles: [
            {
                name: "ticari_bina_ruhsati.pdf",
                type: "application/pdf",
                size: 1800000,
                url: "data:application/pdf;base64,sample-pdf-data-2",
                uploadDate: "2025-01-14T14:00:00Z"
            },
            {
                name: "mevcut_durum_plan.pdf",
                type: "application/pdf",
                size: 2200000,
                url: "data:application/pdf;base64,sample-pdf-data-3",
                uploadDate: "2025-01-14T14:10:00Z"
            }
        ],
        requirements: [
            "Statik hesaplar",
            "Mimari projeler",
            "Elektrik projesi",
            "Mekanik projeler",
            "Belediye onay dosyaları"
        ],
        createdAt: "2025-01-14T14:30:00Z",
        status: "active",
        urgency: true
    },
    {
        id: 3,
        title: "Villa Tasarım Projesi",
        type: "avan",
        description: "Özel villa tasarımı. Modern ve minimalist tarzda, bahçe peyzaj önerileri de beklenmektedir.",
        budget: 45000,
        deadline: 60,
        contractor: "Elite Yapı",
        location: "İzmir, Bornova",
        projectArea: 500,
        apartmentCount: 1,
        pricePerApartment: 45000,
        totalBudget: 45000,
        parcelInfo: {
            ada: 789,
            parsel: 3,
            pafta: "İ12b4c"
        },
        locationDetails: {
            city: "İzmir",
            district: "Bornova",
            neighborhood: "Erzene",
            address: "Erzene Mahallesi Bornova Caddesi No:67"
        },
        uploadedFiles: [
            {
                name: "villa_arsa_foto1.jpg",
                type: "image/jpeg",
                size: 2100000,
                url: "https://images.unsplash.com/photo-1566908829076-8b2cbecdf827?w=800&h=600&fit=crop",
                uploadDate: "2025-01-13T08:45:00Z"
            },
            {
                name: "villa_arsa_foto2.jpg",
                type: "image/jpeg",
                size: 1950000,
                url: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&h=600&fit=crop",
                uploadDate: "2025-01-13T08:50:00Z"
            },
            {
                name: "villa_imar_durumu.pdf",
                type: "application/pdf",
                size: 1200000,
                url: "data:application/pdf;base64,sample-pdf-data-4",
                uploadDate: "2025-01-13T09:00:00Z"
            }
        ],
        requirements: [
            "Mimari tasarım",
            "İç mekan tasarımı",
            "Peyzaj önerileri",
            "3D render"
        ],
        createdAt: "2025-01-13T09:15:00Z",
        status: "active",
        urgency: false
    },
    {
        id: 4,
        title: "Kentsel Dönüşüm Projesi",
        type: "uygulama",
        description: "24 daireli kentsel dönüşüm projesi için uygulama projesi. Mevcut yapı analizi ve yeni tasarım.",
        budget: 180000,
        deadline: 90,
        contractor: "Mega Yapı A.Ş.",
        location: "İstanbul, Kadıköy",
        projectArea: 3200,
        apartmentCount: 24,
        pricePerApartment: 7500,
        totalBudget: 180000,
        parcelInfo: {
            ada: 234,
            parsel: 8,
            pafta: "K18a5d"
        },
        locationDetails: {
            city: "İstanbul",
            district: "Kadıköy",
            neighborhood: "Fenerbahçe",
            address: "Fenerbahçe Mahallesi Bağdat Caddesi No:189"
        },
        uploadedFiles: [
            {
                name: "mevcut_bina_raporlari.pdf",
                type: "application/pdf",
                size: 5200000,
                url: "data:application/pdf;base64,sample-pdf-data-5",
                uploadDate: "2025-01-12T16:00:00Z"
            },
            {
                name: "kentsel_donusum_plani.dwg",
                type: "application/dwg",
                size: 4100000,
                url: "data:application/dwg;base64,sample-dwg-data-2",
                uploadDate: "2025-01-12T16:20:00Z"
            },
            {
                name: "mevcut_durum_fotolari.jpg",
                type: "image/jpeg",
                size: 3200000,
                url: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop",
                uploadDate: "2025-01-12T16:30:00Z"
            }
        ],
        requirements: [
            "Mevcut durum analizi",
            "Yenileme projeleri",
            "Statik güçlendirme",
            "Tüm mühendislik projeleri"
        ],
        createdAt: "2025-01-12T16:45:00Z",
        status: "active",
        urgency: false
    }
];

let filteredProjects = [...projectData];
let currentProjectId = null;

// Initialize page
document.addEventListener('DOMContentLoaded', function () {
    renderProjects();
    updateResultsCount();
});

function renderProjects() {
    const container = document.getElementById('project-cards-container');
    const emptyState = document.getElementById('empty-state');

    if (filteredProjects.length === 0) {
        container.classList.add('hidden');
        emptyState.classList.remove('hidden');
        return;
    }

    container.classList.remove('hidden');
    emptyState.classList.add('hidden');

    container.innerHTML = filteredProjects.map(project => {
        const urgencyBadge = project.urgency ?
            '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 mr-2"><i class="fas fa-exclamation-triangle mr-1"></i>Acil</span>' : '';

        const typeBadge = project.type === 'avan' ?
            '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Tasarım Projesi</span>' :
            '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Uygulama Projesi</span>';

        const timeAgo = getTimeAgo(project.createdAt);

        return `
                    <div class="project-card bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
                        <div class="p-6">
                            <div class="flex justify-between items-start mb-3">
                                <div class="flex-1">
                                    <div class="flex items-center mb-2">
                                        ${urgencyBadge}
                                        ${typeBadge}
                                    </div>
                                    <h3 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">${project.title}</h3>
                                </div>
                            </div>
                            
                            <p class="text-gray-600 text-sm mb-4 line-clamp-3">${project.description}</p>
                            
                            <div class="space-y-2 mb-4">
                                <div class="flex justify-between text-sm">
                                    <span class="text-gray-500">Bütçe:</span>
                                    <span class="font-semibold text-primary">${formatCurrency(project.budget)}</span>
                                </div>
                                <div class="flex justify-between text-sm">
                                    <span class="text-gray-500">Teslim Süresi:</span>
                                    <span class="font-medium">${project.deadline} gün</span>
                                </div>
                                <div class="flex justify-between text-sm">
                                    <span class="text-gray-500">Müteahhit:</span>
                                    <span class="font-medium">${project.contractor}</span>
                                </div>
                                <div class="flex justify-between text-sm">
                                    <span class="text-gray-500">Konum:</span>
                                    <span class="font-medium">${project.location}</span>
                                </div>
                            </div>
                            
                            <div class="flex justify-between items-center pt-4 border-t border-gray-100">
                                <span class="text-xs text-gray-500">${timeAgo}</span>
                                <div class="flex space-x-2">
                                    <button onclick="openProjectDetail(${project.id})" class="px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                                        Detaylar
                                    </button>
                                    <button onclick="openOfferModal(${project.id})" class="px-4 py-1.5 text-xs bg-purple-600 text-white rounded-lg hover:bg-primary-dark transition-colors">
                                        Teklif Ver
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
    }).join('');
}

function updateResultsCount() {
    document.getElementById('results-count').textContent = filteredProjects.length;
}

function applyFilters() {
    const projectTypes = [];
    if (document.getElementById('avan').checked) projectTypes.push('avan');
    if (document.getElementById('uygulama').checked) projectTypes.push('uygulama');

    const minBudget = parseInt(document.getElementById('min-budget').value) || 0;
    const maxBudget = parseInt(document.getElementById('max-budget').value) || Infinity;

    const deadlineRanges = [];
    if (document.getElementById('urgent').checked) deadlineRanges.push('1-15');
    if (document.getElementById('short').checked) deadlineRanges.push('16-30');
    if (document.getElementById('medium').checked) deadlineRanges.push('31-60');
    if (document.getElementById('long').checked) deadlineRanges.push('60+');

    const statusFilters = [];
    if (document.getElementById('active').checked) statusFilters.push('active');
    if (document.getElementById('urgent-status').checked) statusFilters.push('urgent');

    filteredProjects = projectData.filter(project => {
        // Project type filter
        if (projectTypes.length > 0 && !projectTypes.includes(project.type)) {
            return false;
        }

        // Budget filter
        if (project.budget < minBudget || project.budget > maxBudget) {
            return false;
        }

        // Deadline filter
        if (deadlineRanges.length > 0) {
            const deadline = project.deadline;
            const matchesRange = deadlineRanges.some(range => {
                switch (range) {
                    case '1-15': return deadline >= 1 && deadline <= 15;
                    case '16-30': return deadline >= 16 && deadline <= 30;
                    case '31-60': return deadline >= 31 && deadline <= 60;
                    case '60+': return deadline > 60;
                    default: return false;
                }
            });
            if (!matchesRange) return false;
        }

        // Status filter
        if (statusFilters.length > 0) {
            if (statusFilters.includes('urgent') && !project.urgency) {
                return false;
            }
            if (!statusFilters.includes('active') && project.status === 'active') {
                return false;
            }
        }

        return true;
    });

    renderProjects();
    updateResultsCount();
    showNotification('Filtreler uygulandı.', 'success');
}

function clearFilters() {
    // Clear all checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        if (checkbox.id === 'active') {
            checkbox.checked = true; // Keep active checked by default
        } else {
            checkbox.checked = false;
        }
    });

    // Clear input fields
    document.getElementById('min-budget').value = '';
    document.getElementById('max-budget').value = '';

    // Reset filtered projects
    filteredProjects = [...projectData];
    renderProjects();
    updateResultsCount();
    showNotification('Filtreler temizlendi.', 'info');
}

function sortProjects() {
    const sortBy = document.getElementById('sort-select').value;

    filteredProjects.sort((a, b) => {
        switch (sortBy) {
            case 'newest':
                return new Date(b.createdAt) - new Date(a.createdAt);
            case 'deadline':
                return a.deadline - b.deadline;
            case 'budget-high':
                return b.budget - a.budget;
            case 'budget-low':
                return a.budget - b.budget;
            default:
                return 0;
        }
    });

    renderProjects();
}

function openOfferModal(projectId) {
    const project = projectData.find(p => p.id === projectId);
    if (!project) return;

    currentProjectId = projectId;
    document.getElementById('selected-project-id').value = projectId;

    // Fill project details
    document.getElementById('project-details').innerHTML = `
                <p><strong>Proje:</strong> ${project.title}</p>
                <p><strong>Tip:</strong> ${project.type === 'avan' ? 'Tasarım Projesi' : 'Uygulama Projesi'}</p>
                <p><strong>Bütçe:</strong> ${formatCurrency(project.budget)}</p>
                <p><strong>Teslim Süresi:</strong> ${project.deadline} gün</p>
                <p><strong>Müteahhit:</strong> ${project.contractor}</p>
            `;

    // Fill apartment count (default)
    if (project.apartmentCount) {
        document.getElementById('offer-apartment-count').value = project.apartmentCount;
    }

    // Clear form
    document.getElementById('offer-price-per-apartment').value = '';
    document.getElementById('offer-total-price').value = '';
    document.getElementById('offer-price').value = '';
    document.getElementById('offer-deadline').value = '';
    document.getElementById('offer-message').value = '';
    document.getElementById('portfolio-link').value = '';

    openModal('offer-modal');
}

function calculateOfferTotal() {
    const apartmentCount = parseInt(document.getElementById('offer-apartment-count').value) || 0;
    const pricePerApartment = parseFloat(document.getElementById('offer-price-per-apartment').value) || 0;
    const totalPrice = apartmentCount * pricePerApartment;

    document.getElementById('offer-total-price').value = totalPrice;
    document.getElementById('offer-price').value = totalPrice;
}

function openProjectDetail(projectId) {
    const project = projectData.find(p => p.id === projectId);
    if (!project) return;

    currentProjectId = projectId;
    document.getElementById('detail-modal-title').textContent = project.title;

    const urgencyBadge = project.urgency ?
        '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 mr-2"><i class="fas fa-exclamation-triangle mr-1"></i>Acil</span>' : '';

    const typeBadge = project.type === 'avan' ?
        '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Tasarım Projesi</span>' :
        '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Uygulama Projesi</span>';

    document.getElementById('detail-modal-body').innerHTML = `
                <div class="space-y-6">
                    <div class="flex items-center">
                        ${urgencyBadge}
                        ${typeBadge}
                    </div>
                    
                    <div>
                        <h3 class="text-lg font-semibold text-gray-800 mb-2">Proje Açıklaması</h3>
                        <p class="text-gray-600">${project.description}</p>
                    </div>
                    
                    <div class="grid grid-cols-3 gap-4">
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <h4 class="font-semibold text-gray-800 mb-2">Toplam Bütçe</h4>
                            <p class="text-primary font-bold text-xl">${formatCurrency(project.budget)}</p>
                        </div>
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <h4 class="font-semibold text-gray-800 mb-2">Proje Alanı</h4>
                            <p class="text-gray-900 font-bold text-xl">${project.projectArea || 'N/A'} m²</p>
                        </div>
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <h4 class="font-semibold text-gray-800 mb-2">Teslim Süresi</h4>
                            <p class="text-gray-900 font-bold text-xl">${project.deadline} gün</p>
                        </div>
                    </div>

                    ${project.apartmentCount ? `
                    <div class="bg-blue-50 p-4 rounded-lg">
                        <h4 class="font-semibold text-gray-800 mb-3">Bütçe Detayları</h4>
                        <div class="grid grid-cols-3 gap-4 text-sm">
                            <div>
                                <span class="text-gray-600">Daire Sayısı:</span>
                                <p class="font-semibold text-gray-800">${project.apartmentCount} daire</p>
                            </div>
                            <div>
                                <span class="text-gray-600">Daire Başı Fiyat:</span>
                                <p class="font-semibold text-gray-800">${formatCurrency(project.pricePerApartment || 0)}</p>
                            </div>
                            <div>
                                <span class="text-gray-600">Toplam Bütçe:</span>
                                <p class="font-semibold text-primary">${formatCurrency(project.totalBudget || 0)}</p>
                            </div>
                        </div>
                    </div>
                    ` : ''}
                    
                    <div>
                        <h4 class="font-semibold text-gray-800 mb-2">Müteahhit Bilgileri</h4>
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <p class="text-gray-600 mb-1"><strong>Firma:</strong> ${project.contractor}</p>
                            ${project.locationDetails ? `
                                <p class="text-gray-600 mb-1"><strong>Detay Adres:</strong> ${project.locationDetails.address}</p>
                                <p class="text-gray-600"><strong>Mahalle:</strong> ${project.locationDetails.neighborhood}, ${project.locationDetails.district}/${project.locationDetails.city}</p>
                            ` : `
                                <p class="text-gray-600"><strong>Konum:</strong> ${project.location}</p>
                            `}
                        </div>
                    </div>

                    ${project.parcelInfo ? `
                    <div>
                        <h4 class="font-semibold text-gray-800 mb-2">Ada ve Parsel Bilgileri</h4>
                        <div class="bg-green-50 p-4 rounded-lg">
                            <div class="grid grid-cols-3 gap-4 text-sm">
                                <div>
                                    <span class="text-gray-600">Ada:</span>
                                    <p class="font-semibold text-gray-800">${project.parcelInfo.ada}</p>
                                </div>
                                <div>
                                    <span class="text-gray-600">Parsel:</span>
                                    <p class="font-semibold text-gray-800">${project.parcelInfo.parsel}</p>
                                </div>
                                ${project.parcelInfo.pafta ? `
                                <div>
                                    <span class="text-gray-600">Pafta:</span>
                                    <p class="font-semibold text-gray-800">${project.parcelInfo.pafta}</p>
                                </div>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                    ` : ''}
                    
                    <div>
                        <h4 class="font-semibold text-gray-800 mb-2">Gereksinimler</h4>
                        <ul class="list-disc list-inside space-y-1">
                            ${project.requirements.map(req => `<li class="text-gray-600">${req}</li>`).join('')}
                        </ul>
                    </div>

                    ${project.uploadedFiles && project.uploadedFiles.length > 0 ? `
                    <div>
                        <h4 class="font-semibold text-gray-800 mb-3">Yüklenen Dosyalar</h4>
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <div class="grid grid-cols-1 gap-3">
                                ${project.uploadedFiles.map((file, index) => `
                                    <div class="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                                        <div class="flex items-center space-x-3">
                                            <div class="flex-shrink-0">
                                                ${getFileIcon(file.type)}
                                            </div>
                                            <div class="flex-1 min-w-0">
                                                <p class="text-sm font-medium text-gray-900 truncate">${file.name}</p>
                                                <p class="text-xs text-gray-500">
                                                    ${formatFileSize(file.size)} • ${getTimeAgo(file.uploadDate)}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="flex items-center space-x-2">
                                            ${file.type.startsWith('image/') ? `
                                                <button onclick="previewFile('${file.url}', '${file.name}', '${file.type}')" 
                                                    class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                                    <i class="fas fa-eye mr-1"></i>Önizle
                                                </button>
                                            ` : ''}
                                            <button onclick="downloadFile('${file.url}', '${file.name}')" 
                                                class="text-green-600 hover:text-green-800 text-sm font-medium">
                                                <i class="fas fa-download mr-1"></i>İndir
                                            </button>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                            <div class="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                <p class="text-sm text-blue-800">
                                    <i class="fas fa-info-circle mr-2"></i>
                                    <strong>İpucu:</strong> Görsel dosyaları önizleyebilir, tüm dosyaları indirebilirsiniz.
                                </p>
                            </div>
                        </div>
                    </div>
                    ` : ''}
                    
                    <div class="bg-blue-50 p-4 rounded-lg">
                        <p class="text-sm text-blue-800">
                            <i class="fas fa-info-circle mr-2"></i>
                            Bu proje ${getTimeAgo(project.createdAt)} yayınlandı.
                        </p>
                    </div>
                </div>
            `;

    openModal('project-detail-modal');
}

function openOfferModalFromDetail() {
    closeModal('project-detail-modal');
    openOfferModal(currentProjectId);
}

function submitOffer() {
    const projectId = currentProjectId;
    const price = document.getElementById('offer-price').value;
    const deadline = document.getElementById('offer-deadline').value;
    const message = document.getElementById('offer-message').value;
    const portfolioLink = document.getElementById('portfolio-link').value;

    if (!price || !deadline || !message) {
        showNotification('Lütfen tüm zorunlu alanları doldurun.', 'error');
        return;
    }

    // In a real app, this would send the offer to the backend
    console.log('Submitting offer:', {
        projectId,
        price: parseFloat(price),
        deadline: parseInt(deadline),
        message,
        portfolioLink
    });

    closeModal('offer-modal');
    showNotification('Teklifiniz başarıyla gönderildi! Müteahhit ile iletişime geçilecektir.', 'success');
}

function openModal(modalId) {
    document.getElementById(modalId).classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

function getTimeAgo(dateString) {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) {
        return 'Az önce';
    } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} dakika önce`;
    } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} saat önce`;
    } else {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days} gün önce`;
    }
}

function showNotification(message, type = 'info') {
    const container = document.getElementById('notification-container');
    const notification = document.createElement('div');

    const colors = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        warning: 'bg-yellow-500',
        info: 'bg-blue-500'
    };

    notification.className = `notification ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2`;
    notification.innerHTML = `
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
                <span>${message}</span>
                <button onclick="removeNotification(this)" class="ml-4 text-white hover:text-gray-200">
                    <i class="fas fa-times"></i>
                </button>
            `;

    container.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            removeNotification(notification.querySelector('button'));
        }
    }, 5000);
}

function removeNotification(button) {
    const notification = button.closest('.notification');
    notification.classList.add('removing');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// File helper functions
function getFileIcon(fileType) {
    if (fileType.startsWith('image/')) {
        return '<i class="fas fa-image text-2xl text-blue-500"></i>';
    } else if (fileType === 'application/pdf') {
        return '<i class="fas fa-file-pdf text-2xl text-red-500"></i>';
    } else if (fileType === 'application/dwg' || fileType.includes('dwg')) {
        return '<i class="fas fa-drafting-compass text-2xl text-purple-500"></i>';
    } else if (fileType.includes('word') || fileType.includes('doc')) {
        return '<i class="fas fa-file-word text-2xl text-blue-600"></i>';
    } else {
        return '<i class="fas fa-file text-2xl text-gray-500"></i>';
    }
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function previewFile(url, name, type) {
    document.getElementById('preview-modal-title').textContent = name;

    const previewBody = document.getElementById('preview-modal-body');

    if (type.startsWith('image/')) {
        previewBody.innerHTML = `
                    <img src="${url}" alt="${name}" class="max-w-full max-h-full object-contain rounded-lg shadow-lg">
                `;
    } else {
        previewBody.innerHTML = `
                    <div class="text-center p-8">
                        <i class="fas fa-file-alt fa-4x text-gray-400 mb-4"></i>
                        <h3 class="text-lg font-semibold text-gray-700 mb-2">Önizleme Mevcut Değil</h3>
                        <p class="text-gray-500 mb-4">Bu dosya türü için önizleme desteklenmiyor.</p>
                        <button onclick="downloadFile('${url}', '${name}')" class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
                            <i class="fas fa-download mr-2"></i>Dosyayı İndir
                        </button>
                    </div>
                `;
    }

    // Set download button action
    document.getElementById('preview-download-btn').onclick = function () {
        downloadFile(url, name);
    };

    openModal('file-preview-modal');
}

function downloadFile(url, filename) {
    // For real files, this would handle the actual download
    if (url.startsWith('http')) {
        // For external URLs (like Unsplash images), open in new tab
        window.open(url, '_blank');
        showNotification(`${filename} yeni sekmede açıldı.`, 'success');
    } else {
        // For data URLs or local files, simulate download
        showNotification(`${filename} indiriliyor... (Demo: Gerçek projede dosya indirilecek)`, 'info');

        // In a real application, you would create a download link:
        // const link = document.createElement('a');
        // link.href = url;
        // link.download = filename;
        // link.click();
    }
}

// Close modals on Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        const modals = ['offer-modal', 'project-detail-modal', 'file-preview-modal'];
        modals.forEach(modalId => {
            if (!document.getElementById(modalId).classList.contains('hidden')) {
                closeModal(modalId);
            }
        });
    }
});
