
// Simulated Data
const simulatedData = {
    stats: {
        offers: 24,
        acceptedProjects: 8,
        ongoingProjects: 3,
        pendingRequests: 5
    },
    newRequests: [
        {
            id: 1,
            title: "Kadıköy Kentsel Dönüşüm Projesi",
            location: "Kadıköy, İstanbul",
            description: "15 katlı modern konut kompleksi tasarımı",
            area: "1500m²",
            expectedUnits: 24,
            timeAgo: "2 saat önce"
        },
        {
            id: 2,
            title: "Çankaya Arsa Değerlendirme",
            location: "Çankaya, Ankara",
            description: "Ticari ve konut karışımı proje değerlendirmesi",
            area: "800m²",
            expectedUnits: 12,
            timeAgo: "5 saat önce"
        }
    ],
    ongoingProjects: [
        {
            id: 1,
            title: "Beşiktaş Kat Karşılığı Projesi",
            customer: "Mehmet Kaya",
            status: "Tasarım Aşamasında",
            progress: 65,
            lastUpdate: "2 gün önce"
        },
        {
            id: 2,
            title: "Karşıyaka Kentsel Dönüşüm",
            customer: "Ayşe Demir",
            status: "Onay Bekliyor",
            progress: 45,
            lastUpdate: "1 gün önce"
        }
    ],
    serviceRequests: [
        {
            id: 1,
            title: "Kadıköy Kentsel Dönüşüm Projesi",
            location: "Kadıköy, İstanbul",
            city: "istanbul",
            district: "kadikoy",
            type: "kentsel-donusum",
            description: "15 katlı modern konut kompleksi için mimari tasarım",
            area: 1500,
            expectedUnits: 24,
            status: "Açık",
            timeAgo: "2 saat önce"
        },
        {
            id: 2,
            title: "Çankaya Arsa Değerlendirme",
            location: "Çankaya, Ankara",
            city: "ankara",
            district: "cankaya",
            type: "arsa-degerlendirme",
            description: "Ticari ve konut karışımı proje fizibilite çalışması",
            area: 800,
            expectedUnits: 12,
            status: "Açık",
            timeAgo: "5 saat önce"
        },
        {
            id: 3,
            title: "Bornova Bina Güçlendirme",
            location: "Bornova, İzmir",
            city: "izmir",
            district: "bornova",
            type: "bina-yenileme",
            description: "Mevcut binanın deprem güçlendirmesi ve yenileme",
            area: 600,
            expectedUnits: 8,
            status: "Açık",
            timeAgo: "1 gün önce"
        }
    ],
    transactions: [
        {
            date: "15 Aralık 2024",
            type: "Proje Ödemesi",
            description: "Beşiktaş Kat Karşılığı Projesi",
            amount: 15000,
            status: "Başarılı"
        },
        {
            date: "14 Aralık 2024",
            type: "Komisyon",
            description: "Platform Komisyonu (%8)",
            amount: -1200,
            status: "Başarılı"
        },
        {
            date: "10 Aralık 2024",
            type: "Para Çekme",
            description: "Banka Havalesi - Garanti BBVA",
            amount: -5000,
            status: "Başarılı"
        },
        {
            date: "8 Aralık 2024",
            type: "Proje Ödemesi",
            description: "Karşıyaka Kentsel Dönüşüm",
            amount: 8500,
            status: "Başarılı"
        },
        {
            date: "5 Aralık 2024",
            type: "Para Yatırma",
            description: "Kredi Kartı - **** 1234",
            amount: 2000,
            status: "Başarılı"
        }
    ],
    cities: {
        istanbul: ["Kadıköy", "Beşiktaş", "Şişli", "Bakırköy", "Üsküdar"],
        ankara: ["Çankaya", "Keçiören", "Yenimahalle", "Mamak", "Sincan"],
        izmir: ["Bornova", "Konak", "Karşıyaka", "Buca", "Balçova"]
    }
};

// Architect Profile Data
const architectProfileData = {
    name: "Mehmet",
    surname: "Özkan",
    email: "mehmet.ozkan@email.com",
    phone: "+90 532 123 45 67",
    title: "Kentsel Dönüşüm Mimarı",
    bio: "15 yıllık deneyime sahip mimar olarak, kentsel dönüşüm ve sürdürülebilir mimarlık alanlarında uzmanlaşmış bulunuyorum. Modern tasarım anlayışı ve çevre dostu çözümlerle projelerinizi hayata geçiriyorum.",
    rating: 4.8,
    totalReviews: 42,
    profileImage: "https://placehold.co/120x120/5A00A8/FFFFFF?text=Mimar+Foto",
    socialMedia: {
        linkedin: "https://linkedin.com/in/mehmet-ozkan-mimar",
        instagram: "https://instagram.com/mimarmehmet"
    },
    specialties: [
        "3D Görselleştirme",
        "Konut Mimarisi",
        "Belediye Ruhsat Projeleri",
        "Riskli Yapı Analizi",
        "Sürdürülebilir Mimarlık"
    ],
    pricing: {
        avanProjeUcreti: 2500,
        uygulamaProjeUcreti: 4500
    },
    security: {
        is2faActive: false,
        isEmailVerified: true,
        isPhoneVerified: false
    }
};


// Contractor Offers Data
const contractorOffersData = [
    {
        id: 1,
        title: "Kadıköy Kentsel Dönüşüm Avan Proje Talebi",
        senderName: "Yapı İnşaat A.Ş.",
        relatedListing: {
            title: "Kadıköy Kentsel Dönüşüm Projesi",
            location: "Kadıköy, İstanbul"
        },
        designType: "Avan Proje",
        deliveryTime: "10 gün",
        status: "Bekliyor",
        description: "15 katlı modern konut kompleksi için avan proje tasarımı talep ediyoruz. Projenin tamamında 48 daire planlanmaktadır. Çevre dostu malzemeler kullanılması tercih edilmektedir.",
        budget: "₺120.000",
        createdDate: "12 Aralık 2024"
    },
    {
        id: 2,
        title: "Çankaya Arsa Değerlendirme 3D Görselleştirme",
        senderName: "Mega Yapı Ltd. Şti.",
        relatedListing: {
            title: "Çankaya Arsa Değerlendirme",
            location: "Çankaya, Ankara"
        },
        designType: "3D Görselleştirme",
        deliveryTime: "7 gün",
        status: "Bekliyor",
        description: "Ticari ve konut karışımı proje için 3D görselleştirme hizmeti. Dış cephe ve iç mekan görselleri dahil olmak üzere profesyonel sunum hazırlanması.",
        budget: "₺85.000",
        createdDate: "11 Aralık 2024"
    },
    {
        id: 3,
        title: "Bornova Kentsel Dönüşüm Uygulama Projesi",
        senderName: "Kent İnşaat Grup",
        relatedListing: {
            title: "Bornova Bina Güçlendirme",
            location: "Bornova, İzmir"
        },
        designType: "Uygulama Projesi",
        deliveryTime: "15 gün",
        status: "Onaylandı",
        description: "Mevcut binanın deprem güçlendirmesi ve yenileme projesi için detaylı uygulama projesi hazırlanması. Statik hesaplamalar dahil.",
        budget: "₺200.000",
        createdDate: "8 Aralık 2024"
    },
    {
        id: 4,
        title: "Şişli Ofis Binası Renovasyon Tasarımı",
        senderName: "Modern Yapı San. Tic.",
        relatedListing: null,
        designType: "Konsept Tasarım",
        deliveryTime: "12 gün",
        status: "Reddedildi",
        description: "5 katlı ofis binasının modern standartlara göre yenilenmesi için konsept tasarım çalışması.",
        budget: "₺95.000",
        createdDate: "5 Aralık 2024"
    }
];

// User Offers Data
const userOffersData = [
    {
        id: 1,
        title: "Villa Yenileme İç Mekan Tasarımı",
        senderName: "Ahmet Yılmaz",
        designType: "İç Mekan Tasarımı",
        budget: "₺50.000",
        deliveryTime: "14 gün",
        status: "Bekliyor",
        description: "3 katlı villam için modern iç mekan tasarımı istiyorum. Salon, mutfak ve yatak odalarının yeniden düzenlenmesi gerekiyor.",
        contactInfo: "ahmet.yilmaz@email.com",
        createdDate: "10 Aralık 2024"
    },
    {
        id: 2,
        title: "Daire Konsept Geliştirme",
        senderName: "Zeynep Kaya",
        designType: "Konsept Geliştirme",
        budget: "₺25.000",
        deliveryTime: "8 gün",
        status: "Bekliyor",
        description: "120 m² dairem için minimalist konsept geliştirme. Açık mutfak ve oturma alanı entegrasyonu önemli.",
        contactInfo: "zeynep.kaya@email.com",
        createdDate: "9 Aralık 2024"
    },
    {
        id: 3,
        title: "Bahçe Peyzaj Tasarımı",
        senderName: "Mehmet Demir",
        designType: "Peyzaj Tasarımı",
        budget: "₺35.000",
        deliveryTime: "10 gün",
        status: "Onaylandı",
        description: "200 m² bahçe alanı için peyzaj tasarımı. Süs havuzu, barbekü alanı ve çocuk oyun alanı dahil edilmesi isteniyor.",
        contactInfo: "mehmet.demir@email.com",
        createdDate: "7 Aralık 2024"
    }
];

// Current offer being viewed in modal
let currentOfferContext = { id: null, type: null };

// Ongoing Projects Data
const ongoingProjectsData = [
    {
        id: 1,
        title: "Kadıköy Kentsel Dönüşüm Avan Projesi",
        clientName: "Yapı İnşaat A.Ş.",
        relatedListing: {
            title: "Kadıköy Kentsel Dönüşüm Projesi",
            location: "Kadıköy, İstanbul"
        },
        status: "Tasarım Aşamasında",
        progress: 65,
        uploadedFiles: [
            { name: "avan_proje_plan.pdf", size: "2.1 MB" },
            { name: "teknik_sartname.docx", size: "850 KB" }
        ],
        isPaymentReleased: false,
        startDate: "5 Aralık 2024",
        estimatedCompletion: "20 Aralık 2024"
    },
    {
        id: 2,
        title: "Çankaya 3D Görselleştirme Projesi",
        clientName: "Mega Yapı Ltd. Şti.",
        relatedListing: {
            title: "Çankaya Arsa Değerlendirme",
            location: "Çankaya, Ankara"
        },
        status: "Onay Bekliyor",
        progress: 80,
        uploadedFiles: [
            { name: "3d_gorunum_1.jpg", size: "4.2 MB" },
            { name: "3d_gorunum_2.jpg", size: "3.8 MB" },
            { name: "ic_mekan_tasarim.pdf", size: "1.5 MB" }
        ],
        isPaymentReleased: false,
        startDate: "8 Aralık 2024",
        estimatedCompletion: "18 Aralık 2024"
    },
    {
        id: 3,
        title: "Villa İç Mekan Tasarımı",
        clientName: "Ahmet Yılmaz",
        relatedListing: null,
        status: "Revizyon",
        progress: 45,
        uploadedFiles: [
            { name: "ic_mekan_konsept.pdf", size: "1.8 MB" }
        ],
        isPaymentReleased: false,
        startDate: "10 Aralık 2024",
        estimatedCompletion: "25 Aralık 2024"
    },
    {
        id: 4,
        title: "Bornova Kentsel Dönüşüm Uygulama Projesi",
        clientName: "Kent İnşaat Grup",
        relatedListing: {
            title: "Bornova Bina Güçlendirme",
            location: "Bornova, İzmir"
        },
        status: "Tasarım Aşamasında",
        progress: 30,
        uploadedFiles: [],
        isPaymentReleased: false,
        startDate: "12 Aralık 2024",
        estimatedCompletion: "30 Aralık 2024"
    }
];

// Completed Projects Data
const completedProjectsData = [
    {
        id: 5,
        title: "Beşiktaş Kat Karşılığı Projesi",
        clientName: "Güven İnşaat A.Ş.",
        relatedListing: {
            title: "Beşiktaş Kentsel Dönüşüm",
            location: "Beşiktaş, İstanbul"
        },
        completionDate: "1 Aralık 2024",
        status: "Tamamlandı",
        earnedApplicationProjectRight: true,
        isPaymentReleased: true,
        uploadedFiles: [
            { name: "final_proje.pdf", size: "5.2 MB" },
            { name: "statik_hesap.pdf", size: "2.8 MB" },
            { name: "belediye_onay.pdf", size: "1.2 MB" }
        ]
    },
    {
        id: 6,
        title: "Karşıyaka Peyzaj Tasarımı",
        clientName: "Mehmet Demir",
        relatedListing: null,
        completionDate: "25 Kasım 2024",
        status: "Uygulama Projesine Geçildi",
        earnedApplicationProjectRight: false,
        isPaymentReleased: true,
        uploadedFiles: [
            { name: "peyzaj_plan.pdf", size: "3.1 MB" },
            { name: "bitki_listesi.xlsx", size: "450 KB" }
        ]
    },
    {
        id: 7,
        title: "Şişli Ofis Renovasyon Konsepti",
        clientName: "Modern Yapı San. Tic.",
        relatedListing: null,
        completionDate: "20 Kasım 2024",
        status: "Tamamlandı",
        earnedApplicationProjectRight: true,
        isPaymentReleased: false,
        uploadedFiles: [
            { name: "konsept_tasarim.pdf", size: "4.5 MB" },
            { name: "malzeme_listesi.docx", size: "720 KB" }
        ]
    }
];

// Municipality Process Data
const belediyeSureciData = [
    {
        projectId: 1,
        stages: [
            { stage: "Ruhsat Başvurusu Yapıldı", date: "10 Aralık 2024", status: "completed" },
            { stage: "İmar Durumu Kontrolü", date: "12 Aralık 2024", status: "completed" },
            { stage: "Eksik Evrak Bildirimi", date: "14 Aralık 2024", status: "pending", missingDocuments: ["Tapu Sureti", "İmza Sirküleri"] },
            { stage: "Teknik Değerlendirme", date: null, status: "waiting" },
            { stage: "Ruhsat Onayı", date: null, status: "waiting" }
        ]
    },
    {
        projectId: 2,
        stages: [
            { stage: "Ruhsat Başvurusu Yapıldı", date: "8 Aralık 2024", status: "completed" },
            { stage: "İmar Durumu Kontrolü", date: "10 Aralık 2024", status: "completed" },
            { stage: "Teknik Değerlendirme", date: "15 Aralık 2024", status: "pending" },
            { stage: "Ruhsat Onayı", date: null, status: "waiting" }
        ]
    },
    {
        projectId: 5,
        stages: [
            { stage: "Ruhsat Başvurusu Yapıldı", date: "15 Kasım 2024", status: "completed" },
            { stage: "İmar Durumu Kontrolü", date: "18 Kasım 2024", status: "completed" },
            { stage: "Teknik Değerlendirme", date: "22 Kasım 2024", status: "completed" },
            { stage: "Ruhsat Onayı", date: "1 Aralık 2024", status: "completed" }
        ]
    }
];

// Current project being viewed in modal
let currentProjectContext = { id: null, type: null };

// Architect Reviews
const architectReviews = [
    {
        id: 1,
        reviewer: "Ayşe Yılmaz",
        rating: 5,
        comment: "Mehmet Bey'le çalışmak harika bir deneyimdi. Projemizi zamanında ve beklentilerimizin üzerinde teslim etti. Kesinlikle tavsiye ederim.",
        date: "15 Aralık 2024",
        project: "Villa Projesi"
    },
    {
        id: 2,
        reviewer: "Can Demir",
        rating: 5,
        comment: "Çok profesyonel yaklaşım. 3D görselleştirmeler sayesinde projeyi önceden görebildik. Mükemmel hizmet!",
        date: "10 Aralık 2024",
        project: "Ofis Renovasyonu"
    },
    {
        id: 3,
        reviewer: "Zehra Kaya",
        rating: 4,
        comment: "Kentsel dönüşüm projemizde çok başarılıydı. Belediye süreçlerinde de yardımcı oldu.",
        date: "5 Aralık 2024",
        project: "Kentsel Dönüşüm"
    },
    {
        id: 4,
        reviewer: "Ahmet Çelik",
        rating: 5,
        comment: "Sürdürülebilir mimarlık konusundaki uzmanlığı etkileyici. Çevre dostu çözümleriyle fark yarattı.",
        date: "1 Aralık 2024",
        project: "Rezidans Projesi"
    }
];

// Core Functions
function showSection(sectionId) {
    // Hide all sections
    const sections = ['dashboard-section', 'service-requests-section', 'offers-section', 'projects-section', 'e-wallet-section', 'profile-section', 'support-section'];
    sections.forEach(section => {
        document.getElementById(section).classList.add('hidden');
    });

    // Show selected section
    document.getElementById(sectionId).classList.remove('hidden');

    // Update active nav item
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.classList.remove('active', 'bg-purple-50', 'text-purple-600');
        if (!link.href.includes('ilanlar.html')) { // Exclude external links from this logic
            link.classList.add('text-gray-700');
        }

        // Add active state to clicked link
        const activeLink = document.querySelector(`[onclick="showSection('${sectionId}')"]`);
        if (activeLink) {
            activeLink.classList.add('active', 'bg-purple-50', 'text-purple-600');
            activeLink.classList.remove('text-gray-700');
        }
    });

    // Close mobile menu if open
    closeMobileMenu();
}

function toggleMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    sidebar.classList.toggle('-translate-x-full');
    overlay.classList.toggle('hidden');
}

function closeMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    sidebar.classList.add('-translate-x-full');
    overlay.classList.add('hidden');
}

function showNotification(message, type = 'info') {
    const container = document.getElementById('notification-container');
    const notification = document.createElement('div');

    let bgColor = 'bg-blue-500';
    switch (type) {
        case 'success': bgColor = 'bg-green-500'; break;
        case 'error': bgColor = 'bg-red-500'; break;
        case 'warning': bgColor = 'bg-yellow-500'; break;
    }

    notification.className = `notification ${bgColor} text-white px-6 py-4 rounded-lg shadow-lg max-w-sm`;
    notification.innerHTML = `
                <div class="flex items-center justify-between">
                    <span>${message}</span>
                    <button onclick="this.parentElement.parentElement.remove()" class="ml-2 text-white hover:text-gray-200">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;

    container.appendChild(notification);

    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

function logout() {
    if (confirm('Çıkış yapmak istediğinizden emin misiniz?')) {
        // localStorage'ı temizle
        localStorage.removeItem('admin_logged_in');
        localStorage.removeItem('admin_user_email');
        localStorage.removeItem('admin_user_role');
        localStorage.removeItem('admin_user_name');
        
        showNotification('Çıkış yapılıyor...', 'info');
        setTimeout(() => {
            window.location.href = 'auth.html';
        }, 1500);
    }
}

// Render Functions
function renderStats() {
    const statsGrid = document.getElementById('stats-grid');
    const stats = [
        {
            title: 'Verilen Teklif Sayısı',
            value: simulatedData.stats.offers,
            icon: 'fas fa-file-alt',
            color: 'blue',
            onclick: "navigateToOffers()"
        },
        {
            title: 'Kabul Edilen Proje Sayısı',
            value: simulatedData.stats.acceptedProjects,
            icon: 'fas fa-check-circle',
            color: 'green',
            onclick: "navigateToCompletedProjects()"
        },
        {
            title: 'Devam Eden Proje Sayısı',
            value: simulatedData.stats.ongoingProjects,
            icon: 'fas fa-clock',
            color: 'yellow',
            onclick: "navigateToOngoingProjects()"
        }
    ];

    statsGrid.innerHTML = stats.map(stat => `
                <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200 cursor-pointer hover:shadow-lg hover:border-${stat.color}-200 transition-all duration-200 transform hover:-translate-y-1 group" onclick="${stat.onclick}">
                    <div class="flex items-center">
                        <div class="bg-${stat.color}-100 p-3 rounded-lg">
                            <i class="${stat.icon} text-2xl text-${stat.color}-600"></i>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm text-gray-600">${stat.title}</p>
                            <p class="text-2xl font-bold text-gray-800">${stat.value}</p>
                        </div>
                    </div>
                    <div class="mt-2 text-xs text-gray-500 group-hover:text-${stat.color}-600 flex items-center transition-colors duration-200">
                        <i class="fas fa-arrow-right mr-1 group-hover:translate-x-1 transition-transform duration-200"></i>
                        Detayları görüntüle
                    </div>
                </div>
            `).join('');
}

// Navigation functions for dashboard stats
function navigateToOffers() {
    showSection('offers-section');
}

function navigateToCompletedProjects() {
    showSection('projects-section');
    // Switch to completed projects tab
    setTimeout(() => {
        switchProjectCategory('completed');
    }, 100);
}

function navigateToOngoingProjects() {
    showSection('projects-section');
    // Switch to ongoing projects tab
    setTimeout(() => {
        switchProjectCategory('ongoing');
    }, 100);
}

function navigateToOffersAndSubmit(requestId) {
    // Navigate to offers section and show notification
    showSection('offers-section');
    showNotification(`Teklif verme işlemi için Tekliflerim sayfasına yönlendirildiniz. Talep ID: ${requestId}`, 'info');
}

function renderNewRequests() {
    const content = document.getElementById('new-requests-content');
    content.innerHTML = simulatedData.newRequests.map(request => `
                <div class="bg-gray-50 rounded-lg p-4 mb-4 hover:bg-gray-100 transition-colors duration-200">
                    <h4 class="font-semibold text-gray-800 mb-2">${request.title}</h4>
                    <p class="text-sm text-gray-600 mb-2">
                        <i class="fas fa-map-marker-alt mr-1"></i>
                        ${request.location}
                    </p>
                    <p class="text-sm text-gray-600 mb-3">${request.description}</p>
                    <p class="text-sm text-gray-600 mb-3">Arsa Alanı: ${request.area}, Beklenen Daire: ${request.expectedUnits}</p>
                    <div class="flex justify-between items-center">
                        <span class="text-xs text-gray-500">${request.timeAgo}</span>
                        <button onclick="navigateToOffersAndSubmit(${request.id})" class="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700 transition-colors duration-200">
                            Teklif Ver
                        </button>
                    </div>
                </div>
            `).join('');
}

function renderDashboardOngoingProjects() {
    const content = document.getElementById('ongoing-projects-content');
    content.innerHTML = simulatedData.ongoingProjects.map(project => `
                <div class="bg-gray-50 rounded-lg p-4 mb-4 hover:bg-gray-100 transition-colors duration-200">
                    <h4 class="font-semibold text-gray-800 mb-2">${project.title}</h4>
                    <p class="text-sm text-gray-600 mb-2">
                        <i class="fas fa-user mr-1"></i>
                        Müşteri: ${project.customer}
                    </p>
                    <div class="flex items-center justify-between mb-3">
                        <span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                            ${project.status}
                        </span>
                        <span class="text-xs text-gray-500">Son güncelleme: ${project.lastUpdate}</span>
                    </div>
                    <div class="mb-3">
                        <div class="flex justify-between text-sm text-gray-600 mb-1">
                            <span>İlerleme</span>
                            <span>${project.progress}%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                            <div class="bg-green-500 h-2 rounded-full" style="width: ${project.progress}%"></div>
                        </div>
                    </div>
                    <button onclick="viewProjectDetails(${project.id})" class="w-full bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors duration-200">
                        Detayları Görüntüle
                    </button>
                </div>
            `).join('');
}

// Action Functions
function submitOffer(requestId) {
    // Navigate to offers section
    navigateToOffersAndSubmit(requestId);
}

function viewProjectDetails(projectId) {
    // Navigate to projects section and show project details
    showSection('projects-section');
    setTimeout(() => {
        // Find the project in ongoing projects data
        const project = ongoingProjectsData.find(p => p.id === projectId);
        if (project) {
            // Show project detail modal
            showProjectDetailModal(projectId, 'ongoing');
        }
    }, 200);
}

// Initialize Dashboard
function initializeDashboard() {
    renderStats();
    renderNewRequests();
    renderDashboardOngoingProjects();
}

// Modal Functions
function showModal(modalId) {
    document.getElementById(modalId).classList.remove('hidden');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}

// E-Wallet Functions
function renderTransactions() {
    const tbody = document.getElementById('transaction-tbody');
    tbody.innerHTML = simulatedData.transactions.map(transaction => `
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${transaction.date}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">${transaction.type}</td>
                    <td class="px-6 py-4 text-sm text-gray-600">${transaction.description}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-right font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}">
                        ${transaction.amount > 0 ? '+' : ''} ₺ ${Math.abs(transaction.amount).toLocaleString('tr-TR')}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-center">
                        <span class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">${transaction.status}</span>
                    </td>
                </tr>
            `).join('');
}

function processDeposit(event) {
    event.preventDefault();
    const amount = document.getElementById('deposit-amount').value;
    const paymentMethod = document.getElementById('payment-method').value;

    if (!amount || amount < 50) {
        showNotification('Lütfen geçerli bir miktar girin (minimum ₺50).', 'error');
        return;
    }

    if (paymentMethod === 'credit-card') {
        openCreditCardModal(amount);
    } else if (paymentMethod === 'bank-transfer') {
        openBankTransferModal(amount);
    } else if (paymentMethod === 'mobile-payment') {
        openMobilePaymentModal(amount);
    }
}

function getPaymentMethodName(method) {
    const names = {
        'credit-card': 'Kredi Kartı',
        'bank-transfer': 'Banka Havalesi',
        'mobile-payment': 'Mobil Ödeme'
    };
    return names[method] || method;
}

function openCreditCardModal(amount) {
    document.getElementById('deposit-amount-display').textContent = amount;
    closeModal('deposit-modal');
    showModal('credit-card-modal');
}

function openBankTransferModal(amount) {
    document.getElementById('bank-transfer-amount-display').textContent = amount;
    // Generate unique reference number
    const referenceNumber = 'DY' + Date.now().toString().slice(-8);
    document.getElementById('transfer-reference').textContent = referenceNumber;
    closeModal('deposit-modal');
    showModal('bank-transfer-modal');
}

function openMobilePaymentModal(amount) {
    document.getElementById('mobile-payment-amount-display').textContent = amount;
    closeModal('deposit-modal');
    showModal('mobile-payment-modal');
}

function processCreditCardPayment(event) {
    event.preventDefault();

    const cardNumber = document.getElementById('card-number').value;
    const cardName = document.getElementById('card-name').value;
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value;
    const amount = document.getElementById('deposit-amount-display').textContent;

    // Basic validation
    if (!cardNumber || !cardName || !expiryDate || !cvv) {
        showNotification('Lütfen tüm kredi kartı bilgilerini doldurun.', 'error');
        return;
    }

    if (cardNumber.replace(/\s/g, '').length !== 16) {
        showNotification('Kart numarası 16 haneli olmalıdır.', 'error');
        return;
    }

    if (cvv.length !== 3) {
        showNotification('CVV 3 haneli olmalıdır.', 'error');
        return;
    }

    // Simulate payment processing
    showNotification('Kredi kartı ödemesi işleniyor...', 'info');

    setTimeout(() => {
        showNotification(`₺${amount} başarıyla hesabınıza yatırıldı.`, 'success');
        closeModal('credit-card-modal');

        // Clear form
        document.getElementById('credit-card-form').reset();
    }, 2000);
}

// Card formatting functions
function formatCardNumber(input) {
    // Remove all non-digit characters
    let value = input.value.replace(/\D/g, '');

    // Add spaces every 4 digits
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');

    // Limit to 16 digits (19 characters with spaces)
    if (value.length > 19) {
        value = value.substring(0, 19);
    }

    input.value = value;
}

function formatExpiryDate(input) {
    // Remove all non-digit characters
    let value = input.value.replace(/\D/g, '');

    // Add slash after 2 digits
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }

    input.value = value;
}

function processBankTransfer() {
    const amount = document.getElementById('bank-transfer-amount-display').textContent;
    showNotification('Banka havale bilgileri kopyalandı. Havale işleminizi tamamladıktan sonra 1-3 iş günü içinde hesabınıza yansıyacaktır.', 'info');
    closeModal('bank-transfer-modal');
}

function copyBankInfo(type) {
    let textToCopy = '';
    const amount = document.getElementById('bank-transfer-amount-display').textContent;
    const reference = document.getElementById('transfer-reference').textContent;

    if (type === 'iban') {
        textToCopy = 'TR12 0006 4000 0011 2345 6789 01';
    } else if (type === 'all') {
        textToCopy = `IBAN: TR12 0006 4000 0011 2345 6789 01
Hesap Adı: DönüşümAY A.Ş.
Tutar: ₺${amount}
Açıklama: ${reference}`;
    }

    navigator.clipboard.writeText(textToCopy).then(() => {
        showNotification(type === 'iban' ? 'IBAN kopyalandı!' : 'Tüm bilgiler kopyalandı!', 'success');
    });
}

function processMobilePayment(event) {
    event.preventDefault();
    const phoneNumber = document.getElementById('mobile-phone').value;
    const amount = document.getElementById('mobile-payment-amount-display').textContent;

    if (!phoneNumber || phoneNumber.length < 10) {
        showNotification('Lütfen geçerli bir telefon numarası girin.', 'error');
        return;
    }

    // Simulate SMS sending
    showNotification('SMS gönderiliyor...', 'info');

    setTimeout(() => {
        showNotification(`${phoneNumber} numarasına ödeme linki gönderildi. SMS'teki linke tıklayarak ödemenizi tamamlayabilirsiniz.`, 'success');
        closeModal('mobile-payment-modal');
        document.getElementById('mobile-payment-form').reset();
    }, 2000);
}

function formatPhoneNumber(input) {
    // Remove all non-digit characters
    let value = input.value.replace(/\D/g, '');

    // Format as (5XX) XXX XX XX
    if (value.length > 0) {
        if (value.length <= 3) {
            value = `(${value}`;
        } else if (value.length <= 6) {
            value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        } else if (value.length <= 8) {
            value = `(${value.slice(0, 3)}) ${value.slice(3, 6)} ${value.slice(6)}`;
        } else {
            value = `(${value.slice(0, 3)}) ${value.slice(3, 6)} ${value.slice(6, 8)} ${value.slice(8, 10)}`;
        }
    }

    input.value = value;
}

function processWithdraw(event) {
    event.preventDefault();
    const amount = document.getElementById('withdraw-amount').value;
    showNotification(`₺${amount} para çekme talebi oluşturuldu.`, 'success');
    closeModal('withdraw-modal');
}

// Service Requests Functions
let filteredRequests = [...simulatedData.serviceRequests];

function renderServiceRequests() {
    const grid = document.getElementById('request-cards-grid');
    grid.innerHTML = filteredRequests.map(request => `
                <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                    <h4 class="font-semibold text-gray-800 mb-2">${request.title}</h4>
                    <p class="text-sm text-gray-600 mb-2">
                        <i class="fas fa-map-marker-alt mr-1"></i>
                        ${request.location}
                    </p>
                    <p class="text-sm text-gray-600 mb-3">${request.description}</p>
                    <div class="space-y-2 mb-4">
                        <p class="text-sm text-gray-600">Arsa Alanı: ${request.area}m²</p>
                        <p class="text-sm text-gray-600">Beklenen Daire: ${request.expectedUnits}</p>
                        <p class="text-sm text-gray-600">Durum: <span class="text-green-600 font-medium">${request.status}</span></p>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-xs text-gray-500">${request.timeAgo}</span>
                        <button onclick="submitOffer(${request.id})" class="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700 transition-colors duration-200" style="background-color: #6B46C1;">
                            Teklif Ver
                        </button>
                    </div>
                </div>
            `).join('');
}

function applyFilters() {
    const cityFilter = document.getElementById('city-filter').value;
    const districtFilter = document.getElementById('district-filter').value;
    const typeFilter = document.getElementById('project-type-filter').value;
    const minAreaFilter = parseInt(document.getElementById('min-area-filter').value) || 0;

    filteredRequests = simulatedData.serviceRequests.filter(request => {
        return (!cityFilter || request.city === cityFilter) &&
            (!districtFilter || request.district === districtFilter) &&
            (!typeFilter || request.type === typeFilter) &&
            (request.area >= minAreaFilter);
    });

    renderServiceRequests();
    showNotification(`${filteredRequests.length} talep bulundu.`, 'info');
}

function clearFilters() {
    document.getElementById('city-filter').value = '';
    document.getElementById('district-filter').value = '';
    document.getElementById('project-type-filter').value = '';
    document.getElementById('min-area-filter').value = '';

    filteredRequests = [...simulatedData.serviceRequests];
    renderServiceRequests();
    updateDistrictOptions();
    showNotification('Filtreler temizlendi.', 'info');
}

function updateDistrictOptions() {
    const cityFilter = document.getElementById('city-filter').value;
    const districtSelect = document.getElementById('district-filter');

    districtSelect.innerHTML = '<option value="">Tüm İlçeler</option>';

    if (cityFilter && simulatedData.cities[cityFilter]) {
        simulatedData.cities[cityFilter].forEach(district => {
            const option = document.createElement('option');
            option.value = district.toLowerCase().replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ş/g, 's').replace(/ü/g, 'u');
            option.textContent = district;
            districtSelect.appendChild(option);
        });
    }
}

// Section initialization
function initializeSection(sectionId) {
    switch (sectionId) {
        case 'dashboard-section':
            initializeDashboard();
            break;
        case 'service-requests-section':
            renderServiceRequests();
            break;
        case 'offers-section':
            initializeOffers();
            break;
        case 'projects-section':
            initializeProjects();
            break;
        case 'e-wallet-section':
            renderTransactions();
            break;
        case 'profile-section':
            initializeProfile();
            break;
    }
}

// Enhanced showSection function
function showSection(sectionId) {
    // Hide all sections
    const sections = ['dashboard-section', 'service-requests-section', 'offers-section', 'projects-section', 'e-wallet-section', 'profile-section', 'support-section'];
    sections.forEach(section => {
        document.getElementById(section).classList.add('hidden');
    });

    // Show selected section
    document.getElementById(sectionId).classList.remove('hidden');

    // Initialize section-specific content
    initializeSection(sectionId);

    // Update active nav item
    const navLinks = document.querySelectorAll('#sidebar-nav a');
    navLinks.forEach(link => link.classList.remove('active'));

    // Find and activate the clicked nav item
    const activeLink = document.querySelector(`#sidebar-nav a[onclick*="${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    // Close mobile menu if open
    closeMobileMenu();
}

// Profile Functions
function initializeProfile() {
    renderProfileSummary(architectProfileData);
    renderSpecialties(architectProfileData.specialties);
    renderPricingInfo(architectProfileData);
    renderSecuritySettings(architectProfileData);
    renderReviews(architectReviews);
}

function renderProfileSummary(data) {
    const container = document.getElementById('profile-summary-card');

    // Generate star rating
    const fullStars = Math.floor(data.rating);
    const hasHalfStar = data.rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    let starsHtml = '';
    for (let i = 0; i < fullStars; i++) {
        starsHtml += '<i class="fas fa-star text-yellow-400"></i>';
    }
    if (hasHalfStar) {
        starsHtml += '<i class="fas fa-star-half-alt text-yellow-400"></i>';
    }
    for (let i = 0; i < emptyStars; i++) {
        starsHtml += '<i class="far fa-star text-gray-300"></i>';
    }

    container.innerHTML = `
                <div class="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
                    <!-- Profile Image -->
                    <div class="flex-shrink-0 relative">
                        <img src="${data.profileImage}" alt="Profil Fotoğrafı" class="w-32 h-32 rounded-full object-cover border-4 border-purple-100">
                        <button onclick="changeProfilePhoto()" class="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full text-sm hover:bg-purple-700 transition-colors duration-200" title="Fotoğrafı Değiştir">
                            <i class="fas fa-camera"></i>
                        </button>
                    </div>
                    
                    <!-- Profile Info -->
                    <div class="flex-1">
                        <h2 class="text-3xl font-bold text-gray-800 mb-2">${data.name} ${data.surname}</h2>
                        <p class="text-lg text-purple-600 font-medium mb-3">${data.title}</p>
                        
                        <!-- Rating -->
                        <div class="flex items-center space-x-2 mb-4">
                            <div class="flex space-x-1">${starsHtml}</div>
                            <span class="text-lg font-semibold text-gray-800">${data.rating}</span>
                            <span class="text-sm text-gray-600">(${data.totalReviews} değerlendirme)</span>
                        </div>
                        
                        <!-- Bio -->
                        <p class="text-gray-600 mb-6 leading-relaxed">${data.bio}</p>
                        
                        <!-- Contact Info -->
                        <div class="flex flex-wrap items-center gap-4 mb-4">
                            <div class="flex items-center text-gray-600">
                                <i class="fas fa-envelope mr-2"></i>
                                <span>${data.email}</span>
                            </div>
                            <div class="flex items-center text-gray-600">
                                <i class="fas fa-phone mr-2"></i>
                                <span>${data.phone}</span>
                            </div>
                        </div>
                        
                        <!-- Social Media -->
                        <div class="flex space-x-4">
                            <a href="${data.socialMedia.linkedin}" target="_blank" class="text-blue-600 hover:text-blue-800 transition-colors duration-200">
                                <i class="fab fa-linkedin text-2xl"></i>
                            </a>
                            <a href="${data.socialMedia.instagram}" target="_blank" class="text-pink-600 hover:text-pink-800 transition-colors duration-200">
                                <i class="fab fa-instagram text-2xl"></i>
                            </a>
                        </div>
                    </div>
                </div>
            `;
}

function renderSpecialties(specialties) {
    const container = document.getElementById('specialties-content');

    container.innerHTML = `
                <div class="flex flex-wrap gap-2">
                    ${specialties.map(specialty => `
                        <span class="bg-purple-100 text-purple-800 px-3 py-2 rounded-full text-sm font-medium">
                            ${specialty}
                        </span>
                    `).join('')}
                </div>
                <div class="mt-4 text-sm text-gray-600">
                    <p>Bu alanlar üzerinde uzmanlaşmış deneyim ve bilgi birikimine sahibim.</p>
                </div>
            `;
}

function renderPricingInfo(data) {
    document.getElementById('avan-proje-ucreti').value = data.pricing.avanProjeUcreti;
    document.getElementById('uygulama-proje-ucreti').value = data.pricing.uygulamaProjeUcreti;
}

function renderSecuritySettings(data) {
    // Update 2FA status
    const toggle2FA = document.getElementById('2fa-toggle');
    const status2FA = document.getElementById('2fa-status');
    toggle2FA.checked = data.security.is2faActive;
    status2FA.textContent = data.security.is2faActive ? 'Aktif' : 'Pasif';
    status2FA.className = `text-sm font-medium ${data.security.is2faActive ? 'text-green-600' : 'text-red-600'}`;

    // Update email verification
    const emailDisplay = document.getElementById('email-display');
    const emailBtn = document.getElementById('email-verify-btn');
    emailDisplay.textContent = data.email;
    emailBtn.textContent = data.security.isEmailVerified ? 'Doğrulandı' : 'Doğrula';
    emailBtn.className = data.security.isEmailVerified ?
        'px-3 py-1 bg-green-100 text-green-800 rounded-md text-sm cursor-default' :
        'px-3 py-1 border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-50 transition-colors duration-200';
    emailBtn.disabled = data.security.isEmailVerified;

    // Update phone verification
    const phoneDisplay = document.getElementById('phone-display');
    const phoneBtn = document.getElementById('phone-verify-btn');
    phoneDisplay.textContent = data.phone;
    phoneBtn.textContent = data.security.isPhoneVerified ? 'Doğrulandı' : 'Doğrula';
    phoneBtn.className = data.security.isPhoneVerified ?
        'px-3 py-1 bg-green-100 text-green-800 rounded-md text-sm cursor-default' :
        'px-3 py-1 border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-50 transition-colors duration-200';
    phoneBtn.disabled = data.security.isPhoneVerified;
}

function renderReviews(reviews) {
    const container = document.getElementById('reviews-content');

    if (reviews.length === 0) {
        container.innerHTML = `
                    <div class="text-center py-8">
                        <i class="fas fa-star text-4xl text-gray-300 mb-4"></i>
                        <p class="text-gray-500">Henüz değerlendirme bulunmuyor.</p>
                    </div>
                `;
        return;
    }

    container.innerHTML = `
                <div class="space-y-6">
                    ${reviews.map(review => {
        // Generate star rating for each review
        let starsHtml = '';
        for (let i = 0; i < 5; i++) {
            if (i < review.rating) {
                starsHtml += '<i class="fas fa-star text-yellow-400"></i>';
            } else {
                starsHtml += '<i class="far fa-star text-gray-300"></i>';
            }
        }

        return `
                            <div class="border-b border-gray-200 pb-6 last:border-b-0">
                                <div class="flex items-start justify-between mb-3">
                                    <div>
                                        <h5 class="font-semibold text-gray-800">${review.reviewer}</h5>
                                        <p class="text-sm text-gray-500">${review.project}</p>
                                    </div>
                                    <div class="text-sm text-gray-500">${review.date}</div>
                                </div>
                                <div class="flex space-x-1 mb-3">${starsHtml}</div>
                                <p class="text-gray-600">${review.comment}</p>
                            </div>
                        `;
    }).join('')}
                </div>
            `;
}

// Profile Action Functions
function changeProfilePhoto() {
    // Simulate file selection
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = function (e) {
        if (e.target.files && e.target.files[0]) {
            showNotification('Profil fotoğrafı başarıyla güncellendi!', 'success');
            // In real implementation, you would upload the file and update the image
        }
    };
    input.click();
}

function updatePricing() {
    const avanProje = document.getElementById('avan-proje-ucreti').value;
    const uygulamaProje = document.getElementById('uygulama-proje-ucreti').value;

    if (!avanProje || !uygulamaProje) {
        showNotification('Lütfen tüm fiyat alanlarını doldurun.', 'error');
        return;
    }

    architectProfileData.pricing.avanProjeUcreti = parseInt(avanProje);
    architectProfileData.pricing.uygulamaProjeUcreti = parseInt(uygulamaProje);

    showNotification('Fiyatlandırma bilgileriniz başarıyla güncellendi!', 'success');
}

function toggle2FA() {
    const toggle = document.getElementById('2fa-toggle');
    architectProfileData.security.is2faActive = toggle.checked;
    renderSecuritySettings(architectProfileData);

    const message = toggle.checked ?
        'İki faktörlü kimlik doğrulama etkinleştirildi.' :
        'İki faktörlü kimlik doğrulama devre dışı bırakıldı.';
    showNotification(message, 'success');
}

// Profile Modal Functions
function openEditProfileModal() {
    // Populate form with current data
    document.getElementById('edit-name').value = architectProfileData.name;
    document.getElementById('edit-surname').value = architectProfileData.surname;
    document.getElementById('edit-email').value = architectProfileData.email;
    document.getElementById('edit-phone').value = architectProfileData.phone;
    document.getElementById('edit-title').value = architectProfileData.title;
    document.getElementById('edit-bio').value = architectProfileData.bio;
    document.getElementById('edit-linkedin').value = architectProfileData.socialMedia.linkedin;
    document.getElementById('edit-instagram').value = architectProfileData.socialMedia.instagram;

    // Clear all checkboxes first
    document.querySelectorAll('#edit-profile-modal input[type="checkbox"]').forEach(cb => cb.checked = false);

    // Set specialty checkboxes
    architectProfileData.specialties.forEach(specialty => {
        const checkbox = document.querySelector(`input[value="${specialty}"]`);
        if (checkbox) {
            checkbox.checked = true;
        }
    });

    showModal('edit-profile-modal');
}

function updateProfile(event) {
    event.preventDefault();

    // Update profile data
    architectProfileData.name = document.getElementById('edit-name').value;
    architectProfileData.surname = document.getElementById('edit-surname').value;
    architectProfileData.email = document.getElementById('edit-email').value;
    architectProfileData.phone = document.getElementById('edit-phone').value;
    architectProfileData.title = document.getElementById('edit-title').value;
    architectProfileData.bio = document.getElementById('edit-bio').value;
    architectProfileData.socialMedia.linkedin = document.getElementById('edit-linkedin').value;
    architectProfileData.socialMedia.instagram = document.getElementById('edit-instagram').value;

    // Update specialties
    const selectedSpecialties = [];
    document.querySelectorAll('#edit-profile-modal input[type="checkbox"]:checked').forEach(checkbox => {
        selectedSpecialties.push(checkbox.value);
    });
    architectProfileData.specialties = selectedSpecialties;

    // Re-render profile sections

    renderSpecialties(architectProfileData.specialties);
    renderSecuritySettings(architectProfileData);

    closeModal('edit-profile-modal');
    showNotification('Profil bilgileriniz başarıyla güncellendi!', 'success');
}

// Security Functions
function openChangePasswordModal() {
    showModal('change-password-modal');
}

function changePassword(event) {
    event.preventDefault();

    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (newPassword !== confirmPassword) {
        showNotification('Yeni şifreler eşleşmiyor.', 'error');
        return;
    }

    if (newPassword.length < 8) {
        showNotification('Yeni şifre en az 8 karakter olmalıdır.', 'error');
        return;
    }

    // Simulate password change
    showNotification('Şifreniz başarıyla değiştirildi!', 'success');
    closeModal('change-password-modal');
    event.target.reset();
}

function openVerifyEmailModal() {
    if (architectProfileData.security.isEmailVerified) return;

    document.getElementById('email-to-verify').textContent = architectProfileData.email;
    document.getElementById('email-code-input-section').classList.add('hidden');
    document.getElementById('verify-email-btn').classList.add('hidden');
    document.getElementById('send-email-code-btn').classList.remove('hidden');
    showModal('verify-email-modal');
}

function sendEmailVerificationCode() {
    document.getElementById('send-email-code-btn').classList.add('hidden');
    document.getElementById('email-code-input-section').classList.remove('hidden');
    document.getElementById('verify-email-btn').classList.remove('hidden');
    showNotification('Doğrulama kodu e-posta adresinize gönderildi.', 'info');
}

function verifyEmailCode() {
    const code = document.getElementById('email-verification-code').value;

    if (code.length !== 6) {
        showNotification('Doğrulama kodu 6 haneli olmalıdır.', 'error');
        return;
    }

    // Simulate verification
    architectProfileData.security.isEmailVerified = true;
    renderSecuritySettings(architectProfileData);
    closeModal('verify-email-modal');
    showNotification('E-posta adresiniz başarıyla doğrulandı!', 'success');
}

function openVerifyPhoneModal() {
    if (architectProfileData.security.isPhoneVerified) return;

    document.getElementById('phone-to-verify').textContent = architectProfileData.phone;
    document.getElementById('phone-code-input-section').classList.add('hidden');
    document.getElementById('verify-phone-btn').classList.add('hidden');
    document.getElementById('send-phone-code-btn').classList.remove('hidden');
    showModal('verify-phone-modal');
}

function sendPhoneVerificationCode() {
    document.getElementById('send-phone-code-btn').classList.add('hidden');
    document.getElementById('phone-code-input-section').classList.remove('hidden');
    document.getElementById('verify-phone-btn').classList.remove('hidden');
    showNotification('Doğrulama kodu telefonunuza SMS ile gönderildi.', 'info');
}

function verifyPhoneCode() {
    const code = document.getElementById('phone-verification-code').value;

    if (code.length !== 6) {
        showNotification('Doğrulama kodu 6 haneli olmalıdır.', 'error');
        return;
    }

    // Simulate verification
    architectProfileData.security.isPhoneVerified = true;
    renderSecuritySettings(architectProfileData);
    closeModal('verify-phone-modal');
    showNotification('Telefon numaranız başarıyla doğrulandı!', 'success');
}

// Offers Functions
function initializeOffers() {
    renderContractorOffers(contractorOffersData);
    renderUserOffers(userOffersData);
}

function switchOfferCategory(category) {
    const contractorTab = document.getElementById('contractor-offers-tab');
    const userTab = document.getElementById('user-offers-tab');
    const contractorSection = document.getElementById('contractor-offers-section');
    const userSection = document.getElementById('user-offers-section');

    if (category === 'contractor') {
        // Activate contractor tab
        contractorTab.className = 'border-b-2 border-purple-500 py-4 px-1 text-sm font-medium text-purple-600';
        userTab.className = 'border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300';

        // Show contractor section, hide user section
        contractorSection.classList.remove('hidden');
        userSection.classList.add('hidden');
    } else if (category === 'user') {
        // Activate user tab
        userTab.className = 'border-b-2 border-purple-500 py-4 px-1 text-sm font-medium text-purple-600';
        contractorTab.className = 'border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300';

        // Show user section, hide contractor section
        userSection.classList.remove('hidden');
        contractorSection.classList.add('hidden');
    }
}

function renderContractorOffers(offers) {
    const container = document.getElementById('contractor-offers-list');

    if (offers.length === 0) {
        container.innerHTML = `
                    <div class="col-span-full text-center py-12">
                        <i class="fas fa-inbox text-4xl text-gray-300 mb-4"></i>
                        <p class="text-gray-500">Henüz müteahhitlerden gelen teklif bulunmuyor.</p>
                    </div>
                `;
        return;
    }

    container.innerHTML = offers.map(offer => `
                <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                    <div class="flex justify-between items-start mb-4">
                        <h4 class="text-lg font-semibold text-gray-800 pr-4">${offer.title}</h4>
                        <span class="${getStatusBadgeClass(offer.status)}">${offer.status}</span>
                    </div>
                    
                    <div class="space-y-3 mb-4">
                        <div class="flex items-center text-gray-600">
                            <i class="fas fa-building w-4 mr-2"></i>
                            <span class="text-sm">${offer.senderName}</span>
                        </div>
                        
                        ${offer.relatedListing ? `
                            <div class="flex items-center text-gray-600">
                                <i class="fas fa-map-marker-alt w-4 mr-2"></i>
                                <span class="text-sm">${offer.relatedListing.title} - ${offer.relatedListing.location}</span>
                            </div>
                        ` : ''}
                        
                        <div class="flex items-center text-gray-600">
                            <i class="fas fa-cogs w-4 mr-2"></i>
                            <span class="text-sm">${offer.designType}</span>
                        </div>
                        
                        <div class="flex items-center text-gray-600">
                            <i class="fas fa-clock w-4 mr-2"></i>
                            <span class="text-sm">Teslim: ${offer.deliveryTime}</span>
                        </div>
                        
                        <div class="flex items-center text-gray-600">
                            <i class="fas fa-lira-sign w-4 mr-2"></i>
                            <span class="text-sm font-medium">${offer.budget}</span>
                        </div>
                    </div>
                    
                    <div class="flex space-x-2">
                        <button onclick="showOfferDetailModal(${offer.id}, 'contractor')" class="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors duration-200">
                            Detayları Görüntüle
                        </button>
                        ${offer.status === 'Bekliyor' ? `
                            <button onclick="quickApproveOffer(${offer.id}, 'contractor')" class="px-3 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors duration-200">
                                <i class="fas fa-check"></i>
                            </button>
                            <button onclick="quickRejectOffer(${offer.id}, 'contractor')" class="px-3 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors duration-200">
                                <i class="fas fa-times"></i>
                            </button>
                        ` : ''}
                    </div>
                </div>
            `).join('');
}

function renderUserOffers(offers) {
    const container = document.getElementById('user-offers-list');

    if (offers.length === 0) {
        container.innerHTML = `
                    <div class="col-span-full text-center py-12">
                        <i class="fas fa-inbox text-4xl text-gray-300 mb-4"></i>
                        <p class="text-gray-500">Henüz kullanıcılardan gelen teklif bulunmuyor.</p>
                    </div>
                `;
        return;
    }

    container.innerHTML = offers.map(offer => `
                <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                    <div class="flex justify-between items-start mb-4">
                        <h4 class="text-lg font-semibold text-gray-800 pr-4">${offer.title}</h4>
                        <span class="${getStatusBadgeClass(offer.status)}">${offer.status}</span>
                    </div>
                    
                    <div class="space-y-3 mb-4">
                        <div class="flex items-center text-gray-600">
                            <i class="fas fa-user w-4 mr-2"></i>
                            <span class="text-sm">${offer.senderName}</span>
                        </div>
                        
                        <div class="flex items-center text-gray-600">
                            <i class="fas fa-cogs w-4 mr-2"></i>
                            <span class="text-sm">${offer.designType}</span>
                        </div>
                        
                        <div class="flex items-center text-gray-600">
                            <i class="fas fa-lira-sign w-4 mr-2"></i>
                            <span class="text-sm font-medium">${offer.budget}</span>
                        </div>
                        
                        <div class="flex items-center text-gray-600">
                            <i class="fas fa-clock w-4 mr-2"></i>
                            <span class="text-sm">Teslim: ${offer.deliveryTime}</span>
                        </div>
                    </div>
                    
                    <div class="flex space-x-2">
                        <button onclick="showOfferDetailModal(${offer.id}, 'user')" class="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors duration-200">
                            Detayları Görüntüle
                        </button>
                        ${offer.status === 'Bekliyor' ? `
                            <button onclick="quickApproveOffer(${offer.id}, 'user')" class="px-3 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors duration-200">
                                <i class="fas fa-check"></i>
                            </button>
                            <button onclick="quickRejectOffer(${offer.id}, 'user')" class="px-3 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors duration-200">
                                <i class="fas fa-times"></i>
                            </button>
                        ` : ''}
                    </div>
                </div>
            `).join('');
}

function getStatusBadgeClass(status) {
    switch (status) {
        case 'Bekliyor':
            return 'bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium';
        case 'Onaylandı':
            return 'bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium';
        case 'Reddedildi':
            return 'bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium';
        default:
            return 'bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium';
    }
}

function showOfferDetailModal(offerId, offerType) {
    const offers = offerType === 'contractor' ? contractorOffersData : userOffersData;
    const offer = offers.find(o => o.id === offerId);

    if (!offer) return;

    // Store current offer context
    currentOfferContext = { id: offerId, type: offerType };

    const container = document.getElementById('offer-detail-content');
    const approveBtn = document.getElementById('modal-approve-btn');
    const rejectBtn = document.getElementById('modal-reject-btn');

    // Hide action buttons if offer is not pending
    if (offer.status !== 'Bekliyor') {
        approveBtn.style.display = 'none';
        rejectBtn.style.display = 'none';
    } else {
        approveBtn.style.display = 'block';
        rejectBtn.style.display = 'block';
    }

    container.innerHTML = `
                <div class="space-y-4">
                    <div>
                        <h3 class="text-lg font-semibold text-gray-800 mb-2">${offer.title}</h3>
                        <div class="flex items-center space-x-2 mb-4">
                            <span class="${getStatusBadgeClass(offer.status)}">${offer.status}</span>
                            <span class="text-sm text-gray-500">• ${offer.createdDate}</span>
                        </div>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Gönderen</label>
                            <p class="text-gray-900">${offer.senderName}</p>
                        </div>
                        
                        ${offer.relatedListing ? `
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">İlgili İlan</label>
                                <p class="text-gray-900">${offer.relatedListing.title}</p>
                                <p class="text-sm text-gray-600">${offer.relatedListing.location}</p>
                            </div>
                        ` : ''}
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Tasarım Tipi</label>
                            <p class="text-gray-900">${offer.designType}</p>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Bütçe</label>
                            <p class="text-gray-900 font-medium">${offer.budget}</p>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Teslim Süresi</label>
                            <p class="text-gray-900">${offer.deliveryTime}</p>
                        </div>
                        
                        ${offer.contactInfo ? `
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">İletişim</label>
                                <p class="text-gray-900">${offer.contactInfo}</p>
                            </div>
                        ` : ''}
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
                        <p class="text-gray-700 leading-relaxed">${offer.description}</p>
                    </div>
                </div>
            `;

    showModal('offer-detail-modal');
}

function quickApproveOffer(offerId, offerType) {
    currentOfferContext = { id: offerId, type: offerType };
    openApproveConfirmModal();
}

function quickRejectOffer(offerId, offerType) {
    currentOfferContext = { id: offerId, type: offerType };
    openRejectConfirmModal();
}

function openApproveConfirmModal() {
    closeModal('offer-detail-modal');
    showModal('approve-confirm-modal');
}

function openRejectConfirmModal() {
    closeModal('offer-detail-modal');
    showModal('reject-confirm-modal');
}

function confirmApproveOffer() {
    const { id, type } = currentOfferContext;
    approveOffer(id, type);
    closeModal('approve-confirm-modal');
}

function confirmRejectOffer() {
    const { id, type } = currentOfferContext;
    rejectOffer(id, type);
    closeModal('reject-confirm-modal');
}

function approveOffer(offerId, offerType) {
    const offers = offerType === 'contractor' ? contractorOffersData : userOffersData;
    const offer = offers.find(o => o.id === offerId);

    if (offer) {
        offer.status = 'Onaylandı';

        // Create new project from approved offer
        const newProject = {
            id: Date.now(), // Simple ID generation
            title: offer.title,
            clientName: offer.senderName,
            relatedListing: offer.relatedListing || null,
            status: "Tasarım Aşamasında",
            progress: 10,
            uploadedFiles: [],
            isPaymentReleased: false,
            startDate: new Date().toLocaleDateString('tr-TR'),
            estimatedCompletion: new Date(Date.now() + (parseInt(offer.deliveryTime) * 24 * 60 * 60 * 1000)).toLocaleDateString('tr-TR')
        };

        // Add to ongoing projects
        ongoingProjectsData.unshift(newProject);

        // Re-render the appropriate offers list
        if (offerType === 'contractor') {
            renderContractorOffers(contractorOffersData);
        } else {
            renderUserOffers(userOffersData);
        }

        // Eğer projeler sekmesi açıksa devam eden projeleri yeniden render et
        const projectsSection = document.getElementById('projects-section');
        const ongoingSection = document.getElementById('ongoing-projects-section');
        if (projectsSection && !projectsSection.classList.contains('hidden') &&
            ongoingSection && ongoingSection.style.display !== 'none') {
            renderDashboardOngoingProjects();
        }

        // Show success notification
        showNotification('Teklif başarıyla onaylandı! Proje "Projelerim" sekmesine eklendi ve mimar ücretiniz e-cüzdanınıza yatırıldı.', 'success');
    }
}

function rejectOffer(offerId, offerType) {
    const offers = offerType === 'contractor' ? contractorOffersData : userOffersData;
    const offer = offers.find(o => o.id === offerId);

    if (offer) {
        offer.status = 'Reddedildi';

        // Re-render the appropriate offers list
        if (offerType === 'contractor') {
            renderContractorOffers(contractorOffersData);
        } else {
            renderUserOffers(userOffersData);
        }

        // Show notification
        showNotification('Teklif reddedildi.', 'info');
    }
}

// Projects Functions (kullanıcının önerdiği standartta)
function initializeProjects() {
    // Varsayılan olarak "Devam Eden Projelerim" sekmesini aktif et
    switchProjectCategory('ongoing');
}

// Temiz ve etkili sekme değiştirme fonksiyonu
function switchProjectCategory(category) {
    // HTML element referansları
    const ongoingTab = document.getElementById('ongoing-projects-tab');
    const completedTab = document.getElementById('completed-projects-tab');
    const ongoingContainer = document.getElementById('projects-section-ongoing');
    const completedContainer = document.getElementById('completed-projects-section');

    // Element kontrolü
    if (!ongoingTab || !completedTab || !ongoingContainer || !completedContainer) {
        console.error('Project category elements not found');
        return;
    }

    // Tüm sekme butonlarından aktif stilini kaldır
    ongoingTab.className = 'border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300';
    completedTab.className = 'border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300';

    // Tüm konteynerları gizle
    ongoingContainer.classList.add('hidden');
    completedContainer.classList.add('hidden');

    if (category === 'ongoing') {
        // Devam eden projeler sekmesini aktif et
        ongoingTab.className = 'border-b-2 border-purple-500 py-4 px-1 text-sm font-medium text-purple-600';

        // Devam eden projeler konteynerını göster
        ongoingContainer.classList.remove('hidden');

        // Devam eden projeleri render et
        renderProjectsTabOngoingProjects(ongoingProjectsData);

    } else if (category === 'completed') {
        // Biten projeler sekmesini aktif et
        completedTab.className = 'border-b-2 border-purple-500 py-4 px-1 text-sm font-medium text-purple-600';

        // Biten projeler konteynerını göster
        completedContainer.classList.remove('hidden');

        // Biten projeleri render et
        renderCompletedProjects(completedProjectsData);
    }
}

// Devam eden projeleri render etme fonksiyonu (kullanıcının önerdiği standartta)
function renderProjectsTabOngoingProjects(projects) {
    const container = document.getElementById('ongoing-projects-list');

    if (!container) {
        return;
    }

    // Önceki içeriği tamamen temizle
    container.innerHTML = '';

    if (projects.length === 0) {
        container.innerHTML = `
                    <div class="col-span-full text-center py-12">
                        <i class="fas fa-project-diagram text-4xl text-gray-300 mb-4"></i>
                        <p class="text-gray-500">Devam eden projeniz bulunmamaktadır.</p>
                    </div>
                `;
        return;
    }

    container.innerHTML = projects.map(project => `
                <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                    <div class="flex justify-between items-start mb-4">
                        <h4 class="text-lg font-semibold text-gray-800 pr-4">${project.title}</h4>
                        <span class="${getProjectStatusBadgeClass(project.status)}">${project.status}</span>
                    </div>
                    
                    <div class="space-y-3 mb-4">
                        <div class="flex items-center text-gray-600">
                            <i class="fas fa-user-tie w-4 mr-2"></i>
                            <span class="text-sm">${project.clientName}</span>
                        </div>
                        
                        ${project.relatedListing ? `
                            <div class="flex items-center text-gray-600">
                                <i class="fas fa-map-marker-alt w-4 mr-2"></i>
                                <span class="text-sm">${project.relatedListing.title} - ${project.relatedListing.location}</span>
                            </div>
                        ` : ''}
                        
                        <div class="flex items-center text-gray-600">
                            <i class="fas fa-calendar w-4 mr-2"></i>
                            <span class="text-sm">Başlangıç: ${project.startDate}</span>
                        </div>
                        
                        <div class="flex items-center text-gray-600">
                            <i class="fas fa-calendar-check w-4 mr-2"></i>
                            <span class="text-sm">Tahmini Bitiş: ${project.estimatedCompletion}</span>
                        </div>
                    </div>
                    
                    <!-- Progress Bar -->
                    <div class="mb-4">
                        <div class="flex justify-between text-sm text-gray-600 mb-1">
                            <span>İlerleme</span>
                            <span>${project.progress}%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                            <div class="bg-purple-600 h-2 rounded-full transition-all duration-300" style="width: ${project.progress}%"></div>
                        </div>
                    </div>
                    
                    <!-- File Upload Area -->
                    <div class="bg-gray-50 rounded-lg p-4 mb-4">
                        <div class="flex items-center justify-between mb-3">
                            <h5 class="text-sm font-medium text-gray-700">Dosyalar</h5>
                            <button onclick="uploadFile(${project.id})" class="text-sm px-3 py-1 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors duration-200">
                                <i class="fas fa-upload mr-1"></i>
                                Dosya Yükle
                            </button>
                        </div>
                        
                        ${project.uploadedFiles.length > 0 ? `
                            <div class="space-y-2">
                                ${project.uploadedFiles.map(file => `
                                    <div class="flex items-center justify-between bg-white p-2 rounded border">
                                        <div class="flex items-center">
                                            <i class="fas fa-file-pdf text-red-500 mr-2"></i>
                                            <span class="text-sm text-gray-700">${file.name}</span>
                                        </div>
                                        <span class="text-xs text-gray-500">${file.size}</span>
                                    </div>
                                `).join('')}
                            </div>
                        ` : `
                            <p class="text-sm text-gray-500 text-center py-2">Henüz dosya yüklenmedi</p>
                        `}
                    </div>
                    
                    <div class="flex space-x-2">
                        <button onclick="showProjectDetailModal(${project.id}, 'ongoing')" class="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors duration-200">
                            Detayları Görüntüle
                        </button>
                        <button onclick="quickCompleteProject(${project.id})" class="px-3 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors duration-200">
                            <i class="fas fa-check"></i>
                        </button>
                    </div>
                </div>
            `).join('');
}

// Biten projeleri render etme fonksiyonu (kullanıcının önerdiği standartta)
function renderCompletedProjects(projects) {
    const container = document.getElementById('completed-projects-list');

    if (!container) {
        return;
    }

    // Önceki içeriği tamamen temizle
    container.innerHTML = '';

    if (projects.length === 0) {
        container.innerHTML = `
                    <div class="col-span-full text-center py-12">
                        <i class="fas fa-check-circle text-4xl text-gray-300 mb-4"></i>
                        <p class="text-gray-500">Tamamlanan projeniz bulunmamaktadır.</p>
                    </div>
                `;
        return;
    }

    container.innerHTML = projects.map(project => `
                <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                    <div class="flex justify-between items-start mb-4">
                        <h4 class="text-lg font-semibold text-gray-800 pr-4">${project.title}</h4>
                        <span class="${getProjectStatusBadgeClass(project.status)}">${project.status}</span>
                    </div>
                    
                    <div class="space-y-3 mb-4">
                        <div class="flex items-center text-gray-600">
                            <i class="fas fa-user-tie w-4 mr-2"></i>
                            <span class="text-sm">${project.clientName}</span>
                        </div>
                        
                        ${project.relatedListing ? `
                            <div class="flex items-center text-gray-600">
                                <i class="fas fa-map-marker-alt w-4 mr-2"></i>
                                <span class="text-sm">${project.relatedListing.title} - ${project.relatedListing.location}</span>
                            </div>
                        ` : ''}
                        
                        <div class="flex items-center text-gray-600">
                            <i class="fas fa-calendar-check w-4 mr-2"></i>
                            <span class="text-sm">Tamamlandı: ${project.completionDate}</span>
                        </div>
                        
                        <div class="flex items-center text-gray-600">
                            <i class="fas fa-lira-sign w-4 mr-2"></i>
                            <span class="text-sm ${project.isPaymentReleased ? 'text-green-600' : 'text-orange-600'}">${project.isPaymentReleased ? 'Ücret Çekilebilir' : 'Ücret Beklemede'}</span>
                        </div>
                    </div>
                    
                    <!-- Application Project Right Notification -->
                    ${project.earnedApplicationProjectRight && project.status === 'Tamamlandı' ? `
                        <div class="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center">
                                    <i class="fas fa-star text-green-600 mr-2"></i>
                                    <span class="text-sm font-medium text-green-800">Uygulama Projesi Çizmeye Hak Kazandın!</span>
                                </div>
                                <button onclick="quickApproveApplicationRight(${project.id})" class="px-3 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition-colors duration-200">
                                    Onayla
                                </button>
                            </div>
                        </div>
                    ` : ''}
                    
                    <div class="flex space-x-2">
                        <button onclick="showProjectDetailModal(${project.id}, 'completed')" class="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors duration-200">
                            Detayları Görüntüle
                        </button>
                    </div>
                </div>
            `).join('');
}

function getProjectStatusBadgeClass(status) {
    switch (status) {
        case 'Tasarım Aşamasında':
            return 'bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium';
        case 'Onay Bekliyor':
            return 'bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium';
        case 'Revizyon':
            return 'bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium';
        case 'Tamamlandı':
            return 'bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium';
        case 'Uygulama Projesine Geçildi':
            return 'bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium';
        default:
            return 'bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium';
    }
}

function showProjectDetailModal(projectId, projectType) {
    const projects = projectType === 'ongoing' ? ongoingProjectsData : completedProjectsData;
    const project = projects.find(p => p.id === projectId);

    if (!project) return;

    // Store current project context
    currentProjectContext = { id: projectId, type: projectType };

    const container = document.getElementById('project-detail-content');
    const uploadDocsBtn = document.getElementById('upload-docs-btn');
    const completeProjectBtn = document.getElementById('complete-project-btn');

    // Show/hide action buttons based on project type
    if (projectType === 'ongoing') {
        completeProjectBtn.style.display = 'block';
        const municipalityProcess = belediyeSureciData.find(mp => mp.projectId === projectId);
        const hasMissingDocs = municipalityProcess && municipalityProcess.stages.some(stage => stage.missingDocuments && stage.missingDocuments.length > 0);
        uploadDocsBtn.style.display = hasMissingDocs ? 'block' : 'none';
    } else {
        completeProjectBtn.style.display = 'none';
        uploadDocsBtn.style.display = 'none';
    }

    container.innerHTML = `
                <div class="space-y-6">
                    <div>
                        <h3 class="text-lg font-semibold text-gray-800 mb-2">${project.title}</h3>
                        <div class="flex items-center space-x-2 mb-4">
                            <span class="${getProjectStatusBadgeClass(project.status)}">${project.status}</span>
                            ${projectType === 'ongoing' ? `<span class="text-sm text-gray-500">• İlerleme: ${project.progress}%</span>` : `<span class="text-sm text-gray-500">• ${project.completionDate}</span>`}
                        </div>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Müşteri</label>
                            <p class="text-gray-900">${project.clientName}</p>
                        </div>
                        
                        ${project.relatedListing ? `
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">İlgili İlan</label>
                                <p class="text-gray-900">${project.relatedListing.title}</p>
                                <p class="text-sm text-gray-600">${project.relatedListing.location}</p>
                            </div>
                        ` : ''}
                        
                        ${projectType === 'ongoing' ? `
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Başlangıç Tarihi</label>
                                <p class="text-gray-900">${project.startDate}</p>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Tahmini Bitiş</label>
                                <p class="text-gray-900">${project.estimatedCompletion}</p>
                            </div>
                        ` : `
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Ödeme Durumu</label>
                                <p class="${project.isPaymentReleased ? 'text-green-600' : 'text-orange-600'} font-medium">${project.isPaymentReleased ? 'Çekilebilir' : 'Beklemede'}</p>
                            </div>
                        `}
                    </div>
                    
                    <!-- Uploaded Files -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Yüklenen Dosyalar</label>
                        ${project.uploadedFiles.length > 0 ? `
                            <div class="space-y-2">
                                ${project.uploadedFiles.map(file => `
                                    <div class="flex items-center justify-between bg-gray-50 p-3 rounded border">
                                        <div class="flex items-center">
                                            <i class="fas fa-file-pdf text-red-500 mr-3"></i>
                                            <span class="text-sm text-gray-700">${file.name}</span>
                                        </div>
                                        <span class="text-xs text-gray-500">${file.size}</span>
                                    </div>
                                `).join('')}
                            </div>
                        ` : `
                            <p class="text-sm text-gray-500 bg-gray-50 p-3 rounded">Henüz dosya yüklenmedi</p>
                        `}
                    </div>
                    
                    ${renderMunicipalityProcess(projectId)}
                </div>
            `;

    showModal('project-detail-modal');
}

function renderMunicipalityProcess(projectId) {
    const municipalityProcess = belediyeSureciData.find(mp => mp.projectId === projectId);

    if (!municipalityProcess) {
        return `
                    <div>
                        <h4 class="text-md font-medium text-gray-800 mb-3">Belediye Süreci Takibi</h4>
                        <p class="text-sm text-gray-500 bg-gray-50 p-3 rounded">Bu proje için belediye süreci takibi mevcut değil.</p>
                    </div>
                `;
    }

    return `
                <div>
                    <h4 class="text-md font-medium text-gray-800 mb-3">Belediye Süreci Takibi</h4>
                    <div class="space-y-3">
                        ${municipalityProcess.stages.map(stage => `
                            <div class="flex items-start space-x-3">
                                <div class="flex-shrink-0 mt-1">
                                    ${stage.status === 'completed' ?
            '<i class="fas fa-check-circle text-green-500"></i>' :
            stage.status === 'pending' ?
                '<i class="fas fa-clock text-yellow-500"></i>' :
                '<i class="fas fa-circle text-gray-300"></i>'
        }
                                </div>
                                <div class="flex-1">
                                    <p class="text-sm font-medium text-gray-800">${stage.stage}</p>
                                    ${stage.date ? `<p class="text-xs text-gray-500">${stage.date}</p>` : ''}
                                    ${stage.missingDocuments && stage.missingDocuments.length > 0 ? `
                                        <div class="mt-2 bg-red-50 border border-red-200 rounded p-2">
                                            <p class="text-xs text-red-800 font-medium">Eksik Evraklar:</p>
                                            <ul class="text-xs text-red-700 mt-1">
                                                ${stage.missingDocuments.map(doc => `<li>• ${doc}</li>`).join('')}
                                            </ul>
                                        </div>
                                    ` : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
}

function uploadFile(projectId) {
    // Simulate file upload
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = '.pdf,.doc,.docx,.jpg,.png';
    input.onchange = function (e) {
        if (e.target.files && e.target.files.length > 0) {
            handleFileUpload(projectId, e.target.files);
        }
    };
    input.click();
}

function handleFileUpload(projectId, files) {
    const project = ongoingProjectsData.find(p => p.id === projectId);
    if (!project) return;

    // Simulate file processing
    Array.from(files).forEach(file => {
        const fileObj = {
            name: file.name,
            size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        };
        project.uploadedFiles.push(fileObj);
    });

    // Mevcut aktif sekmeyi yeniden render et
    const ongoingSection = document.getElementById('ongoing-projects-section');
    if (ongoingSection && ongoingSection.style.display !== 'none') {
        renderProjectsTabOngoingProjects(ongoingProjectsData);
    }

    showNotification('Dosyalar yüklendi ve kaydedildi. Müşteriniz/Müteahhidiniz bilgilendirildi.', 'success');
}

function quickCompleteProject(projectId) {
    currentProjectContext = { id: projectId, type: 'ongoing' };
    openCompleteProjectModal();
}

function openCompleteProjectModal() {
    closeModal('project-detail-modal');
    showModal('complete-project-modal');
}

function confirmCompleteProject() {
    const { id } = currentProjectContext;
    completeProject(id);
    closeModal('complete-project-modal');
}

function completeProject(projectId) {
    const projectIndex = ongoingProjectsData.findIndex(p => p.id === projectId);
    if (projectIndex === -1) return;

    const project = ongoingProjectsData[projectIndex];

    // Move project to completed list
    const completedProject = {
        ...project,
        completionDate: new Date().toLocaleDateString('tr-TR'),
        status: 'Tamamlandı',
        earnedApplicationProjectRight: Math.random() > 0.5, // Simulate earning right
        isPaymentReleased: true
    };

    completedProjectsData.unshift(completedProject);
    ongoingProjectsData.splice(projectIndex, 1);

    // Mevcut aktif sekmeyi yeniden render et
    const ongoingSection = document.getElementById('ongoing-projects-section');
    const completedSection = document.getElementById('completed-projects-section');

    if (ongoingSection && ongoingSection.style.display !== 'none') {
        renderProjectsTabOngoingProjects(ongoingProjectsData);
    }
    if (completedSection && completedSection.style.display !== 'none') {
        renderCompletedProjects(completedProjectsData);
    }

    showNotification('Proje başarıyla tamamlandı! Ücretiniz çekilebilir hale geldi.', 'success');
}

function quickApproveApplicationRight(projectId) {
    currentProjectContext = { id: projectId, type: 'completed' };
    openApproveApplicationRightModal();
}

function openApproveApplicationRightModal() {
    showModal('approve-application-right-modal');
}

function confirmApproveApplicationRight() {
    const { id } = currentProjectContext;
    approveApplicationRight(id);
    closeModal('approve-application-right-modal');
}

function approveApplicationRight(projectId) {
    const project = completedProjectsData.find(p => p.id === projectId);
    if (!project) return;

    project.earnedApplicationProjectRight = false; // Hide the notification
    renderCompletedProjects(completedProjectsData);

    showNotification('Uygulama projesi çizme hakkınız onaylandı. Müşteriniz/Müteahhidiniz ile iletişime geçebilirsiniz.', 'success');
}

function uploadMissingDocuments() {
    // Simulate missing document upload
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = '.pdf,.doc,.docx,.jpg,.png';
    input.onchange = function (e) {
        if (e.target.files && e.target.files.length > 0) {
            showNotification('Eksik evraklar başarıyla yüklendi ve belediyeye iletildi.', 'success');
            closeModal('project-detail-modal');
        }
    };
    input.click();
}

// Support Section Data and Functions
const faqData = [
    {
        id: 1,
        question: "Para çekme işlemi nasıl yapılır?",
        answer: "Para çekme işlemi için E-Cüzdan bölümünde 'Para Çek' butonuna tıklayın. IBAN bilgilerinizi girin ve çekmek istediğiniz tutarı belirtin. Minimum çekme tutarı ₺100'dür. İşlem 1-3 iş günü içinde hesabınıza geçer."
    },
    {
        id: 2,
        question: "Doküman yüklerken sorun yaşıyorum, ne yapmalıyım?",
        answer: "Desteklenen dosya formatları: PDF, DOC, DOCX, JPG, PNG. Dosya boyutu maksimum 10MB olmalıdır. Eğer sorun devam ederse, tarayıcınızın önbelleğini temizleyin veya farklı bir tarayıcı deneyin. Hala çözemezseniz canlı destek ile iletişime geçin."
    },
    {
        id: 3,
        question: "Hesabımı nasıl dondurabilirim?",
        answer: "Hesabınızı dondurmak için Destek bölümündeki 'Hesap Yönetimi' sekmesinden 'Hesabımı Dondur' butonuna tıklayın. Dondurulmuş hesaplar geçici olarak devre dışı kalır ve istediğiniz zaman tekrar aktifleştirebilirsiniz."
    },
    {
        id: 4,
        question: "Uygulama projesi hakkı nedir?",
        answer: "Avan proje teslim ettikten sonra, müteahhit memnun kalırsa size uygulama projesi çizme hakkı verebilir. Bu hak ile daha detaylı ve yüksek ücretli projeler yapabilirsiniz. Hakkınızı kazandığınızda bildirim alırsınız."
    },
    {
        id: 5,
        question: "Platform komisyonu ne kadar?",
        answer: "DönüşümAY platformu, tamamlanan projelerden %8 komisyon almaktadır. Bu ücret, proje ödemesi yapıldığında otomatik olarak bakiyenizden düşülür. Komisyon oranları hakkında detaylı bilgi için sözleşme şartlarınızı inceleyebilirsiniz."
    }
];

let chatHistory = [];
let currentChatCategory = '';

function initializeSupport() {
    renderFaqs(faqData);
}

function renderFaqs(faqs) {
    const container = document.getElementById('faq-content');
    if (!container) return;

    container.innerHTML = faqs.map(faq => `
                <div class="border border-gray-200 rounded-lg mb-3">
                    <button onclick="toggleFaq(${faq.id})" class="w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 rounded-t-lg flex justify-between items-center">
                        <span class="font-medium text-gray-800">${faq.question}</span>
                        <i id="faq-icon-${faq.id}" class="fas fa-chevron-down text-gray-500 transform transition-transform duration-200"></i>
                    </button>
                    <div id="faq-content-${faq.id}" class="hidden px-4 py-3 text-gray-600 text-sm leading-relaxed border-t border-gray-200">
                        ${faq.answer}
                    </div>
                </div>
            `).join('');
}

function toggleFaq(faqId) {
    const content = document.getElementById(`faq-content-${faqId}`);
    const icon = document.getElementById(`faq-icon-${faqId}`);

    if (!content || !icon) return;

    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        icon.classList.add('rotate-180');
    } else {
        content.classList.add('hidden');
        icon.classList.remove('rotate-180');
    }
}

function startChat() {
    const selectedCategory = document.querySelector('input[name="support-category"]:checked');
    if (!selectedCategory) {
        showNotification('Lütfen bir kategori seçin.', 'warning');
        return;
    }

    currentChatCategory = selectedCategory.value;
    chatHistory = [];

    // Add welcome message
    chatHistory.push({
        type: 'agent',
        message: 'Merhaba! DönüşümAY destek ekibine hoş geldiniz. Size nasıl yardımcı olabilirim?',
        timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
    });

    // Add category-specific response
    const categoryResponse = simulateAgentResponse(currentChatCategory, '');
    chatHistory.push({
        type: 'agent',
        message: categoryResponse,
        timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
    });

    closeModal('pre-chat-modal');
    document.getElementById('chat-start-container').classList.add('hidden');
    document.getElementById('chat-box').classList.remove('hidden');
    renderChatMessages();
}

function renderChatMessages() {
    const container = document.getElementById('chat-messages');
    if (!container) return;

    container.innerHTML = chatHistory.map(message => `
                <div class="flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}">
                    <div class="max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.type === 'user' ? 'bg-purple-600 text-white' : 'bg-white border border-gray-200'}">
                        <p class="text-sm">${message.message}</p>
                        <p class="text-xs mt-1 ${message.type === 'user' ? 'text-purple-200' : 'text-gray-500'}">${message.timestamp}</p>
                    </div>
                </div>
            `).join('');

    // Scroll to bottom
    container.scrollTop = container.scrollHeight;
}

function sendChatMessage() {
    const input = document.getElementById('chat-input');
    if (!input || !input.value.trim()) return;

    const userMessage = input.value.trim();
    const timestamp = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });

    // Add user message
    chatHistory.push({
        type: 'user',
        message: userMessage,
        timestamp: timestamp
    });

    input.value = '';
    renderChatMessages();

    // Simulate agent response after a delay
    setTimeout(() => {
        const agentResponse = simulateAgentResponse(currentChatCategory, userMessage);
        chatHistory.push({
            type: 'agent',
            message: agentResponse,
            timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
        });
        renderChatMessages();
    }, 1000 + Math.random() * 2000); // 1-3 seconds delay
}

function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

function simulateAgentResponse(category, userMessage) {
    const responses = {
        payment: [
            "Para çekme/yatırma konusunda size yardımcı olacağım. Hangi işlemde sorun yaşıyorsunuz?",
            "Ödeme işleminizle ilgili detayları kontrol ediyorum. IBAN bilgileriniz doğru mu?",
            "Para çekme işleminiz için minimum ₺100 tutarında olması gerekiyor. İşlemler 1-3 iş günü sürmektedir."
        ],
        documents: [
            "Doküman yükleme konusunda yardımcı olabilirim. Hangi dosya formatında sorun yaşıyorsunuz?",
            "Dosyanızın boyutunu kontrol edin. Maksimum 10MB olmalıdır. PDF, DOC, DOCX, JPG ve PNG formatları desteklenmektedir.",
            "Tarayıcınızın önbelleğini temizlemeyi denediniz mi? Bu sorunu genellikle çözer."
        ],
        account: [
            "Hesap sorunlarınız için buradayım. Ne tür bir problem yaşıyorsunuz?",
            "Hesap güvenliğiniz bizim için önemli. Şifrenizi ne zaman son değiştirdiniz?",
            "İki faktörlü kimlik doğrulamayı aktifleştirmenizi öneriyorum. Profil ayarlarından etkinleştirebilirsiniz."
        ],
        projects: [
            "Proje ve tekliflerle ilgili nasıl yardımcı olabilirim?",
            "Projenizin hangi aşamasında sorun yaşıyorsunuz? Detay verebilir misiniz?",
            "Uygulama projesi hakkı kazanmanız için müteahhidin memnuniyeti önemlidir. Kaliteli iş çıkarmaya devam edin!"
        ],
        other: [
            "Başka nasıl yardımcı olabilirim? Sorununuzu detaylandırabilir misiniz?",
            "Anlıyorum, bu konuda size yardımcı olmaya çalışacağım.",
            "Eğer teknik bir sorunsa, sistem yöneticilerimizle iletişime geçeceğim."
        ]
    };

    // Simple keyword matching for more relevant responses
    const lowerMessage = userMessage.toLowerCase();
    if (lowerMessage.includes('para') || lowerMessage.includes('ödeme') || lowerMessage.includes('çek')) {
        return responses.payment[Math.floor(Math.random() * responses.payment.length)];
    } else if (lowerMessage.includes('dosya') || lowerMessage.includes('yükle') || lowerMessage.includes('doküman')) {
        return responses.documents[Math.floor(Math.random() * responses.documents.length)];
    } else if (lowerMessage.includes('hesap') || lowerMessage.includes('profil') || lowerMessage.includes('şifre')) {
        return responses.account[Math.floor(Math.random() * responses.account.length)];
    } else if (lowerMessage.includes('proje') || lowerMessage.includes('teklif')) {
        return responses.projects[Math.floor(Math.random() * responses.projects.length)];
    }

    // Default to category-specific responses
    const categoryResponses = responses[category] || responses.other;
    return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
}

function confirmFreezeAccount() {
    closeModal('freeze-account-confirm-modal');
    showNotification('Hesabınız başarıyla donduruldu. Tekrar aktifleştirmek için destek ile iletişime geçin.', 'success');

    // Simulate logout after 2 seconds
    setTimeout(() => {
        showNotification('Oturumunuz sonlandırılıyor...', 'info');
        setTimeout(() => {
            window.location.href = '/';
        }, 1500);
    }, 2000);
}

function confirmDeleteAccount() {
    closeModal('delete-account-confirm-modal');
    showNotification('Hesabınız kalıcı olarak silindi. Tüm verileriniz kaldırılmıştır.', 'success');

    // Simulate logout after 2 seconds
    setTimeout(() => {
        showNotification('Ana sayfaya yönlendiriliyorsunuz...', 'info');
        setTimeout(() => {
            window.location.href = '/';
        }, 1500);
    }, 2000);
}

// Document Upload Functions
const uploadedDocuments = {
    identity: null,
    diploma: null,
    chamber: null,
    signature: null,
    tax: null,
    insurance: null
};

function handleDocumentUpload(docType, input) {
    const file = input.files[0];
    if (!file) return;

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
        showNotification('Dosya boyutu 10MB\'dan büyük olamaz.', 'error');
        input.value = '';
        return;
    }

    // Validate file type
    const validTypes = getValidFileTypes(docType);
    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (!validTypes.includes(fileExtension)) {
        showNotification('Geçersiz dosya formatı. Desteklenen formatlar: ' + validTypes.join(', ').toUpperCase(), 'error');
        input.value = '';
        return;
    }

    // Store file info
    uploadedDocuments[docType] = {
        file: file,
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date()
    };

    // Update UI
    updateDocumentStatus(docType, 'uploaded');
    showFilePreview(docType, file);
    showNotification(`${getDocumentDisplayName(docType)} başarıyla yüklendi.`, 'success');

    // Hide upload area and show preview
    document.getElementById(`${docType}-upload-area`).classList.add('hidden');
    document.getElementById(`${docType}-preview`).classList.remove('hidden');
}

function getValidFileTypes(docType) {
    const typeMap = {
        identity: ['pdf', 'jpg', 'jpeg', 'png'],
        diploma: ['pdf', 'jpg', 'jpeg'],
        chamber: ['pdf', 'jpg', 'jpeg'],
        signature: ['pdf'],
        tax: ['pdf', 'jpg', 'jpeg'],
        insurance: ['pdf']
    };
    return typeMap[docType] || ['pdf'];
}

function getDocumentDisplayName(docType) {
    const nameMap = {
        identity: 'Nüfus Cüzdanı/Kimlik Kartı',
        diploma: 'Diploma/Mezuniyet Belgesi',
        chamber: 'Mimar Odası Kayıt Belgesi',
        signature: 'İmza Sirküleri',
        tax: 'Vergi Levhası',
        insurance: 'Mesleki Sorumluluk Sigortası'
    };
    return nameMap[docType] || docType;
}

function updateDocumentStatus(docType, status) {
    const statusElement = document.getElementById(`${docType}-doc-status`);
    if (!statusElement) return;

    const statusConfig = {
        uploaded: { icon: 'fa-check-circle', color: 'text-green-500', title: 'Yüklendi' },
        missing: { icon: 'fa-times-circle', color: 'text-red-500', title: 'Yüklenmedi' },
        processing: { icon: 'fa-clock', color: 'text-orange-500', title: 'İşleniyor' }
    };

    const config = statusConfig[status] || statusConfig.missing;
    statusElement.innerHTML = `<i class="fas ${config.icon} ${config.color}" title="${config.title}"></i>`;
}

function showFilePreview(docType, file) {
    const previewContainer = document.getElementById(`${docType}-preview`);
    if (!previewContainer) return;

    const fileSize = (file.size / 1024 / 1024).toFixed(2);
    const fileIcon = file.type.includes('pdf') ? 'fa-file-pdf' : 'fa-file-image';
    const fileColor = file.type.includes('pdf') ? 'text-red-500' : 'text-blue-500';

    previewContainer.innerHTML = `
                <div class="flex items-center justify-between p-3 bg-gray-50 rounded border">
                    <div class="flex items-center space-x-3">
                        <i class="fas ${fileIcon} ${fileColor} text-lg"></i>
                        <div>
                            <p class="text-sm font-medium text-gray-900 truncate" style="max-width: 200px;">${file.name}</p>
                            <p class="text-xs text-gray-500">${fileSize} MB</p>
                        </div>
                    </div>
                    <div class="flex items-center space-x-2">
                        <button onclick="previewDocument('${docType}')" class="text-blue-600 hover:text-blue-800 text-xs">
                            <i class="fas fa-eye mr-1"></i>Önizle
                        </button>
                        <button onclick="removeDocument('${docType}')" class="text-red-600 hover:text-red-800 text-xs">
                            <i class="fas fa-trash mr-1"></i>Sil
                        </button>
                    </div>
                </div>
            `;
}

function previewDocument(docType) {
    const docData = uploadedDocuments[docType];
    if (!docData) return;

    if (docData.file.type.includes('pdf')) {
        // For PDF files, open in new tab
        const fileURL = URL.createObjectURL(docData.file);
        window.open(fileURL, '_blank');
    } else {
        // For images, show in modal
        const fileURL = URL.createObjectURL(docData.file);
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50';
        modal.onclick = () => document.body.removeChild(modal);

        modal.innerHTML = `
                    <div class="max-w-4xl max-h-full p-4">
                        <img src="${fileURL}" class="max-w-full max-h-full object-contain" alt="Belge Önizleme">
                    </div>
                `;

        document.body.appendChild(modal);
    }
}

function removeDocument(docType) {
    if (!confirm(`${getDocumentDisplayName(docType)} belgesini silmek istediğinizden emin misiniz?`)) {
        return;
    }

    // Clear stored data
    uploadedDocuments[docType] = null;

    // Reset input
    const input = document.getElementById(`${docType}-document`);
    if (input) input.value = '';

    // Update UI
    updateDocumentStatus(docType, 'missing');
    document.getElementById(`${docType}-upload-area`).classList.remove('hidden');
    document.getElementById(`${docType}-preview`).classList.add('hidden');

    showNotification(`${getDocumentDisplayName(docType)} belgesi silindi.`, 'info');
}

function saveDocumentsDraft() {
    const uploadedCount = Object.values(uploadedDocuments).filter(doc => doc !== null).length;

    if (uploadedCount === 0) {
        showNotification('Henüz hiç belge yüklenmedi.', 'warning');
        return;
    }

    // Simulate saving draft
    showNotification(`${uploadedCount} belge taslak olarak kaydedildi.`, 'success');
}

function submitDocumentsForReview() {
    // Check required documents
    const requiredDocs = ['identity', 'diploma', 'chamber', 'signature', 'tax'];
    const missingRequired = requiredDocs.filter(docType => !uploadedDocuments[docType]);

    if (missingRequired.length > 0) {
        const missingNames = missingRequired.map(docType => getDocumentDisplayName(docType));
        showNotification(`Şu zorunlu belgeler eksik: ${missingNames.join(', ')}`, 'error');
        return;
    }

    // Show progress
    document.getElementById('upload-progress').classList.remove('hidden');
    let progress = 0;
    const progressBar = document.getElementById('progress-bar');

    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);

            setTimeout(() => {
                document.getElementById('upload-progress').classList.add('hidden');
                updateVerificationStatus('submitted');
                showNotification('Belgeleriniz başarıyla inceleme için gönderildi. 2-3 iş günü içinde sonucu bildirilecektir.', 'success');
            }, 500);
        }
        progressBar.style.width = progress + '%';
    }, 200);
}

function updateVerificationStatus(status) {
    const badge = document.getElementById('verification-status-badge');
    if (!badge) return;

    const statusConfig = {
        pending: { text: 'Beklemede', color: 'bg-orange-100 text-orange-800', icon: 'fa-clock' },
        submitted: { text: 'İncelemede', color: 'bg-blue-100 text-blue-800', icon: 'fa-search' },
        approved: { text: 'Onaylandı', color: 'bg-green-100 text-green-800', icon: 'fa-check' },
        rejected: { text: 'Reddedildi', color: 'bg-red-100 text-red-800', icon: 'fa-times' }
    };

    const config = statusConfig[status] || statusConfig.pending;
    badge.className = `inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.color}`;
    badge.innerHTML = `<i class="fas ${config.icon} mr-1"></i>${config.text}`;
}

// Initialize page
document.addEventListener('DOMContentLoaded', function () {
    initializeDashboard();
    initializeSupport();

    // City filter change handler
    document.getElementById('city-filter').addEventListener('change', updateDistrictOptions);

    // ESC key handler for modals
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            const modals = ['deposit-modal', 'withdraw-modal', 'edit-profile-modal', 'change-password-modal', 'verify-email-modal', 'verify-phone-modal', 'offer-detail-modal', 'approve-confirm-modal', 'reject-confirm-modal', 'project-detail-modal', 'complete-project-modal', 'approve-application-right-modal', 'pre-chat-modal', 'freeze-account-confirm-modal', 'delete-account-confirm-modal', 'credit-card-modal', 'bank-transfer-modal', 'mobile-payment-modal'];
            modals.forEach(modalId => {
                const modal = document.getElementById(modalId);
                if (!modal.classList.contains('hidden')) {
                    closeModal(modalId);
                }
            });
        }
    });

    // Close mobile menu on window resize
    window.addEventListener('resize', function () {
        if (window.innerWidth >= 1024) {
            closeMobileMenu();
        }
    });
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
