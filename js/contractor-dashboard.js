
        // ===============================================================
        //                       FIREBASE SETUP
        // ===============================================================

        // IMPORTANT: Replace with your project's actual Firebase configuration.
        const firebaseConfig = {
            apiKey: "YOUR_API_KEY",
            authDomain: "YOUR_AUTH_DOMAIN",
            projectId: "YOUR_PROJECT_ID",
            storageBucket: "YOUR_STORAGE_BUCKET",
            messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
            appId: "YOUR_APP_ID"
        };

        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        const auth = firebase.auth();
        const db = firebase.firestore();

        let currentUser = null;
        let userId = null;
        let userProfileUnsubscribe = null; // To detach the Firestore listener on logout
        const __app_id = 'donusumay-prod'; // As requested in prompt

        // Firebase Auth state listener
        auth.onAuthStateChanged(user => {
            if (user) {
                // User is signed in.
                currentUser = user;
                userId = user.uid;
                if (!userProfileUnsubscribe) { // Avoid multiple listeners
                    listenToUserProfile();
                }
            } else {
                // User is signed out.
                currentUser = null;
                userId = null;
                if (userProfileUnsubscribe) {
                    userProfileUnsubscribe(); // Stop listening to profile data
                    userProfileUnsubscribe = null;
                }
                // showNotification('Oturumunuz kapatıldı. Lütfen giriş yapın.', 'error');
                // Redirect to login page after a delay
                // setTimeout(() => { window.location.href = 'index.html'; }, 2000);
            }
        });

        /**
         * Listens for real-time updates on the user's profile document in Firestore.
         */
        function listenToUserProfile() {
            if (!userId) return;
            if (userProfileUnsubscribe) userProfileUnsubscribe(); // Detach old listener if exists

            const docRef = db.collection('artifacts').doc(__app_id).collection('users').doc(userId);

            userProfileUnsubscribe = docRef.onSnapshot(doc => {
                const securityData = { isEmailVerified: false, isPhoneVerified: false, twoFactorEnabled: false };
                const profileData = {};

                if (doc.exists) {
                    const firestoreProfile = doc.data().profile || {};
                    // Merge data from firestore
                    profileData.name = firestoreProfile.name || "Güven İnşaat A.Ş.";
                    profileData.phone = firestoreProfile.phone;
                    securityData.isPhoneVerified = firestoreProfile.isPhoneVerified || false;
                    securityData.twoFactorEnabled = firestoreProfile.twoFactorEnabled || false;
                }

                // Auth state is the single source of truth for these properties
                profileData.email = currentUser.email;
                if (currentUser.phoneNumber) {
                    profileData.phone = currentUser.phoneNumber;
                }
                securityData.isEmailVerified = currentUser.emailVerified;

                // Update local data store
                contractorData.profile = { ...contractorData.profile, ...profileData };
                contractorData.security = { ...contractorData.security, ...securityData };

                // Re-render currently active section if it depends on user data
                if (currentSection === 'profile-section') {
                    renderProfileSection();
                }
                if (currentSection === 'support-section') {
                    renderSupportSection();
                }

            }, err => {
                console.error("Error listening to user profile:", err);
                showNotification('Profil verileri yüklenirken bir hata oluştu.', 'error');
            });
        }

        


        // Simulated Data
        const appData = {
            stats: {
                totalOffers: 42,
                acceptedProjects: 15,
                ongoingProjects: 8
            },
            contractorListings: [
                {
                    id: 1,
                    title: "Yeni Konut Projesi",
                    description: "Modern tasarımlı, yüksek kaliteli malzemelerle inşa edilecek konut projesi",
                    location: {
                        il: "İstanbul",
                        ilce: "Beşiktaş",
                        mahalle: "Levent"
                    },
                    parcelInfo: {
                        ada: "123",
                        parsel: "4",
                        area: "2500"
                    },
                    images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=600&auto=format&fit=crop"],
                    expectedUnits: "40",
                    type: "Konut",
                    status: "active",
                    offersCount: 5,
                    imarCapiProcessStatus: "not_started",
                    aplikasyonKrokisiUrl: null,
                    imarCapiUrl: null
                },
                {
                    id: 2,
                    title: "Karma Kullanım Projesi",
                    description: "Ticari ve konut alanlarını birleştiren modern yaşam projesi",
                    location: {
                        il: "İstanbul",
                        ilce: "Kadıköy",
                        mahalle: "Kozyatağı"
                    },
                    parcelInfo: {
                        ada: "456",
                        parsel: "7",
                        area: "3500"
                    },
                    images: ["https://images.unsplash.com/photo-1513584684374-8bab748fbf90?q=80&w=600&auto=format&fit=crop"],
                    expectedUnits: "60",
                    type: "Karma",
                    status: "active",
                    offersCount: 3,
                    imarCapiProcessStatus: "aplikasyon_ready",
                    aplikasyonKrokisiUrl: "mock-url",
                    imarCapiUrl: null
                },
                {
                    id: 3,
                    title: "Lüks Villa Projesi",
                    description: "Prestijli bölgede yer alan lüks villa kompleksi",
                    location: {
                        il: "İstanbul",
                        ilce: "Sarıyer",
                        mahalle: "Tarabya"
                    },
                    parcelInfo: {
                        ada: "789",
                        parsel: "12",
                        area: "4200"
                    },
                    images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=600&auto=format&fit=crop"],
                    expectedUnits: "18",
                    type: "Villa",
                    status: "active",
                    offersCount: 8,
                    imarCapiProcessStatus: "imar_ready",
                    aplikasyonKrokisiUrl: "mock-url",
                    imarCapiUrl: "mock-url"
                }
            ],
            listingsData: [
                {
                    id: 1,
                    title: "Kadıköy Kentsel Dönüşüm Projesi",
                    location: "Kadıköy, İstanbul",
                    description: "Arsa Alanı: 1500m², Beklenen Daire: 24",
                    area: 1500,
                    expectedUnits: 24,
                    type: "Kentsel Dönüşüm",
                    timeAgo: "3 saat önce",
                    totalUnits: 24,
                    unitPrice: 12000
                },
                {
                    id: 2,
                    title: "Çankaya Arsa Değerlendirme",
                    location: "Çankaya, Ankara",
                    description: "Arsa Alanı: 800m², Beklenen Daire: 12",
                    area: 800,
                    expectedUnits: 12,
                    type: "Arsa Değerlendirme",
                    timeAgo: "6 saat önce",
                    totalUnits: 12,
                    unitPrice: 10000
                },
                {
                    id: 3,
                    title: "Bornova Yenileme Projesi",
                    location: "Bornova, İzmir",
                    description: "Arsa Alanı: 600m², Beklenen Daire: 8",
                    area: 600,
                    expectedUnits: 8,
                    type: "Bina Yenileme",
                    timeAgo: "1 gün önce",
                    totalUnits: 8,
                    unitPrice: 15000
                }
            ],
            ongoingProjects: [
                {
                    id: 1,
                    title: "Beşiktaş Kat Karşılığı Projesi",
                    owner: "Ahmet Kaya",
                    status: "İnşaat Aşamasında",
                    progress: 75,
                    lastUpdate: "2 gün önce"
                },
                {
                    id: 2,
                    title: "Karşıyaka Kentsel Dönüşüm",
                    owner: "Fatma Demir",
                    status: "Ruhsat Süreci",
                    progress: 40,
                    lastUpdate: "5 gün önce"
                },
                {
                    id: 3,
                    title: "Maltepe Rezidans Projesi",
                    owner: "Güven Yapı Ltd.",
                    status: "Temel Atma",
                    progress: 25,
                    lastUpdate: "1 hafta önce"
                }
            ],
            acceptedOffers: [
                { 
                    id: 101, 
                    listingTitle: "Beşiktaş Kat Karşılığı Projesi", 
                    ownerName: "Ahmet Kaya", 
                    offerDetails: "15+3 Daire, 200.000 TL Nakit, 8 Kat, 1500m² Emsal", 
                    status: 'accepted', 
                    relatedListingId: 1, 
                    plotArea: 1200, // m²
                    apartmentCount: 18, // 15+3 daire
                    offerDetailsFull: { apartmentType: '15+3 Daire', cashDemandPerUnit: 200000, numFloors: 8, emsalArea: 1500, netArea: 120, grossArea: 145, numBalconies: 2, numBathrooms: 2, numWCs: 1 } 
                },
                { 
                    id: 102, 
                    listingTitle: "Maltepe Rezidans Projesi", 
                    ownerName: "Güven Yapı Ltd.", 
                    offerDetails: "20+5 Daire, 150.000 TL Nakit, 10 Kat, 2500m² Emsal", 
                    status: 'accepted', 
                    relatedListingId: 3, 
                    plotArea: 2000, // m²
                    apartmentCount: 25, // 20+5 daire
                    offerDetailsFull: { apartmentType: '20+5 Daire', cashDemandPerUnit: 150000, numFloors: 10, emsalArea: 2500, netArea: 110, grossArea: 130, numBalconies: 1, numBathrooms: 2, numWCs: 2 } 
                }
            ],
            pendingRejectedOffers: [
                { id: 201, listingTitle: "Kadıköy Kentsel Dönüşüm Projesi", ownerName: "Ali Veli", offerDetails: "15+3 Daire, 200.000 TL Nakit, 8 Kat, 1500m² Emsal", status: 'pending', relatedListingId: 1, offerDetailsFull: { apartmentType: '15+3 Daire', cashDemandPerUnit: 200000, numFloors: 8, emsalArea: 1500, netArea: 120, grossArea: 145, numBalconies: 2, numBathrooms: 2, numWCs: 1 } },
                { id: 202, listingTitle: "Çankaya Arsa Değerlendirme", ownerName: "Zeynep Hanım", offerDetails: "8+2 Daire, 100.000 TL Nakit, 5 Kat, 800m² Emsal", status: 'rejected', relatedListingId: 2, offerDetailsFull: { apartmentType: '8+2 Daire', cashDemandPerUnit: 100000, numFloors: 5, emsalArea: 800, netArea: 90, grossArea: 110, numBalconies: 1, numBathrooms: 1, numWCs: 1 } },
                { id: 203, listingTitle: "Bornova Yenileme Projesi", ownerName: "İzmir Konut A.Ş.", offerDetails: "5+1 Daire, 50.000 TL Nakit, 4 Kat, 600m² Emsal", status: 'pending', relatedListingId: 3, offerDetailsFull: { apartmentType: '5+1 Daire', cashDemandPerUnit: 50000, numFloors: 4, emsalArea: 600, netArea: 85, grossArea: 100, numBalconies: 1, numBathrooms: 1, numWCs: 1 } }
            ],
            architects: [
                { id: 1, name: "Selin Yılmaz", specialty: "Modern Mimari", rating: 4.9, profileImage: "https://placehold.co/40x40/5A00A8/FFFFFF?text=SY" },
                { id: 2, name: "Can Öztürk", specialty: "Kentsel Dönüşüm", rating: 4.8, profileImage: "https://placehold.co/40x40/5A00A8/FFFFFF?text=CÖ" },
                { id: 3, name: "Elif Demir", specialty: "Sürdürülebilir Tasarım", rating: 4.9, profileImage: "https://placehold.co/40x40/5A00A8/FFFFFF?text=ED" }
            ],
            lawyers: [
                { id: 1, name: "Ahmet Çelik", specialty: "Gayrimenkul Hukuku", contact: "ahmet.celik@law.com" },
                { id: 2, name: "Fatma Batur", specialty: "İnşaat Sözleşmeleri", contact: "fatma.batur@law.com" }
            ],
            contracts: {},
            registeredCreditCards: [
                { id: 1, cardHolder: 'Güven İnşaat A.Ş.', lastFour: '1234', expiry: '12/25', number: '1111222233331234', cvv: '123' }
            ],
            companyIban: 'TR12 0001 2009 1234 5678 9012 34',
            companyAccountName: 'DönüşümAY A.Ş.',
            lawyerChatHistory: {
                // keyed by contract id
            },
            faqData: [
                {
                    question: "Teklifimi nasıl revize edebilirim?",
                    answer: "Tekliflerim sayfasına gidin, ilgili teklifi bulun ve 'Teklifi Revize Et' butonuna tıklayın. Açılan modalda gerekli değişiklikleri yapıp kaydedebilirsiniz."
                },
                {
                    question: "Proje ödemelerini nasıl yapabilirim?",
                    answer: "Projelerim sayfasında, ilgili projenin altında 'Uygulama Projesi Ödemesi Yap' butonunu bulacaksınız. Bu buton sizi ödeme seçeneklerinin olduğu bir modala yönlendirecektir."
                },
                {
                    question: "Hesabımı nasıl dondurabilirim?",
                    answer: "Destek sekmesindeki 'Hesap Yönetimi' bölümünden 'Hesabımı Dondur' butonunu kullanarak hesabınızı geçici olarak dondurabilirsiniz."
                },
                {
                    question: "Sözleşme sürecinde avukat ataması zorunlu mu?",
                    answer: "Sistem, süreci kolaylaştırmak için avukat atama seçeneği sunar. Atanan avukat ile platform üzerinden mesajlaşarak sözleşme detaylarını netleştirebilirsiniz. Bu, sürecin daha şeffaf ve hızlı ilerlemesine yardımcı olur."
                }
            ],
            liveSupportChatHistory: [],
            legalProcesses: [
                {
                    projectId: 'lp-001',
                    projectName: 'Kadıköy Kentsel Dönüşüm Projesi',
                    customerId: 'cust-123',
                    customerName: 'Ayşe Yılmaz',
                    contractType: 'Arsa Payı Karşılığı İnşaat Sözleşmesi', // Noter tarafından seçilen sözleşme türü
                    customerInfo: {
                        phone: '0532 123 45 67',
                        email: 'ayse.yilmaz@email.com',
                        address: 'Kadıköy Mah. Söğütlüçeşme Cad. No:15/8 Kadıköy/İstanbul',
                        companyName: null,
                        taxNumber: null
                    },
                    notaryStatus: 'documents_pending',
                    assignedNotary: null,
                    notaryAppointment: null,
                    uploadedDocuments: [],
                    notarizedContractUrl: null,
                    notaryChatHistory: []
                },
                {
                    projectId: 'lp-002',
                    projectName: 'Çankaya Arsa Değerlendirme Projesi',
                    customerId: 'cust-456',
                    customerName: 'Veli Ticaret A.Ş.',
                    contractType: 'Kat Karşılığı İnşaat Sözleşmesi (Arsa Payı Karşılığı İnşaat Sözleşmesi)',
                    customerInfo: {
                        phone: '0312 456 78 90',
                        email: 'info@veliticaret.com',
                        address: 'Çankaya Mah. Atatürk Bulvarı No:125/12 Çankaya/Ankara',
                        tcNumber: null,
                        companyName: 'Veli Ticaret A.Ş.',
                        taxNumber: '9876543210'
                    },
                    notaryStatus: 'notary_assigned',
                    assignedNotary: { id: 'notary-1', name: 'Kadıköy 3. Noterliği', contact: '0216 123 45 67' },
                    notaryAppointment: null,
                    uploadedDocuments: [
                        { name: 'sozlesme_taslagi.pdf', type: 'contract_draft' },
                        { name: 'kimlik_fotokopisi.jpg', type: 'id_copy' }
                    ],
                    notarizedContractUrl: null,
                    notaryChatHistory: [
                        { sender: 'notary', text: 'Merhaba, belgelerinizi aldım. Randevu için uygun bir zaman belirleyebiliriz.', time: '10:30', isFile: false }
                    ]
                },
                {
                    projectId: 'lp-003',
                    projectName: 'Bornova Yenileme Projesi',
                    customerId: 'cust-789',
                    customerName: 'Fatma Kara',
                    contractType: 'Anahtar Teslim İnşaat Sözleşmesi',
                    notaryStatus: 'appointment_set',
                    assignedNotary: { id: 'notary-2', name: 'Bornova 1. Noterliği', contact: '0232 987 65 43' },
                    notaryAppointment: { date: '20 Temmuz 2025', time: '10:00', location: 'Bornova 1. Noterliği, Erzene Mah. İstanbul Cad. No: 5', smsReminderEnabled: true },
                    uploadedDocuments: [
                        { name: 'sozlesme_taslagi_v2.pdf', type: 'contract_draft' },
                        { name: 'kimlikler.pdf', type: 'id_copy' },
                        { name: 'sirket_belgeleri.zip', type: 'company_docs' }
                    ],
                    notarizedContractUrl: null,
                    notaryChatHistory: [
                        { sender: 'notary', text: 'Randevunuz 20 Temmuz 10:00 olarak onaylanmıştır.', time: '14:00', isFile: false },
                        { sender: 'user', text: 'Teşekkürler, teyit için bilgi bekliyordum.', time: '14:02', isFile: false }
                    ]
                },
                {
                    projectId: 'lp-004',
                    projectName: 'Beşiktaş Kat Karşılığı Projesi',
                    customerId: 'cust-101',
                    customerName: 'Ahmet Kaya',
                    contractType: 'Gayrimenkul Satış Vaadi Sözleşmesi',
                    notaryStatus: 'contract_notarized',
                    assignedNotary: { id: 'notary-3', name: 'Beşiktaş 5. Noterliği', contact: '0212 555 11 22' },
                    notaryAppointment: { date: '15 Haziran 2025', time: '11:30', location: 'Beşiktaş 5. Noterliği, Barbaros Bulvarı No: 88', smsReminderEnabled: false },
                    uploadedDocuments: [],
                    notarizedContractUrl: './DONUSUM X.pdf', // Dummy path to an existing PDF for preview
                    notaryChatHistory: []
                }
            ],
            contractorProjects: [
                {
                    id: 'proj-001',
                    name: "Kadıköy Kentsel Dönüşüm Projesi",
                    completionPercentage: 70,
                    craftsmanAds: [],
                    apartmentListings: []
                },
                {
                    id: 'proj-002',
                    name: "Çankaya Arsa Değerlendirme Projesi",
                    completionPercentage: 85,
                    craftsmanAds: [],
                    apartmentListings: []
                },
                {
                    id: 'proj-003',
                    name: "Bornova Yenileme Projesi",
                    completionPercentage: 95,
                    craftsmanAds: [],
                    apartmentListings: []
                }
            ],
            ongoingContractorProjectsData: [
                { id: 1, title: 'Beşiktaş Kat Karşılığı Projesi', ownerName: 'Ahmet Kaya', assignedArchitect: { name: 'Selin Yılmaz', email: 'selin.y@email.com' }, status: 'Uygulama Projesi Çiziliyor', progress: 40, paymentStage: 0, totalUnits: 20, unitPrice: 12000, municipalityProcess: [{ text: 'Ruhsat Başvurusu Yapıldı (10.07.2025)', canUploadDocument: false }, { text: 'Eksik Evrak Var: Tapu Sureti (12.07.2025)', canUploadDocument: true }, { text: 'Onay Bekleniyor', canUploadDocument: false }], relatedListingId: 1 },
                { id: 2, title: 'Maltepe Rezidans Projesi', ownerName: 'Güven Yapı Ltd.', assignedArchitect: { name: 'Can Öztürk', email: 'can.o@email.com' }, status: 'Ruhsat Süreci', progress: 75, paymentStage: 1, totalUnits: 30, unitPrice: 12000, municipalityProcess: [{ text: 'Ruhsat Alındı (20.08.2025)', canUploadDocument: false }], relatedListingId: 3 }
            ],
            completedContractorProjectsData: [
                {
                    id: 101, title: 'Karşıyaka Kentsel Dönüşüm', ownerName: 'Fatma Demir', completionDate: '15.06.2024', constructionPhases: [
                        { name: 'Temel Atıldı (01.09.2023)', imageUrls: [] },
                        { name: 'Kaba İnşaat Tamamlandı (15.11.2023)', imageUrls: ['https://placehold.co/600x400/cccccc/333333?text=Kaba+İnşaat'] },
                        { name: 'İnce İşler Başladı (01.01.2024)', imageUrls: [] },
                        { name: 'Teslim Edildi (15.06.2024)', imageUrls: ['https://placehold.co/600x400/a7c957/333333?text=Proje+Teslim+1', 'https://placehold.co/600x400/a7c957/333333?text=Proje+Teslim+2'] }
                    ], relatedListingId: 2
                }
            ],
            uploadedArchitectProjects: [
                { projectId: 1, type: 'Mimari', url: '#' },
                { projectId: 1, type: 'Statik', url: '#' },
                { projectId: 2, type: 'Mimari', url: '#' },
                { projectId: 2, type: 'Statik', url: '#' },
                { projectId: 2, type: 'Mekanik', url: '#' },
                { projectId: 2, type: 'Elektrik', url: '#' }
            ],
            projectDesignListings: [
                {
                    id: 1001,
                    title: "Kadıköy Projesi Tasarım İlanı",
                    description: "Modern kentsel dönüşüm projesi için mimari tasarım gerekli. 15 katlı, 24 daireli proje.",
                    deadline: 30,
                    plotArea: 1500,
                    expectedUnits: 24,
                    calculatedFee: 3600, // 1500 * 0.1 * 24 = 3600
                    status: 'architect_accepted',
                    publishDate: '15.12.2024',
                    paymentStatus: 'pending'
                },
                {
                    id: 1002,
                    title: "Çankaya Arsa Tasarım Projesi",
                    description: "Ticari ve konut karışımı proje için tasarım. 12 daire ve 3 dükkan.",
                    deadline: 45,
                    plotArea: 800,
                    expectedUnits: 12,
                    calculatedFee: 960, // 800 * 0.1 * 12 = 960
                    status: 'payment_completed',
                    publishDate: '10.12.2024',
                    paymentStatus: 'completed'
                }
            ]
        };

        
        

        let currentOffer = {};
        let selectedArchitectId = null;
        let paymentContext = {}; // { amount, type, relatedId }
        let isAccountFrozen = false;
        let simulatedSmsCode = '';
        let simulatedVerificationCode = null;
        let currentLegalProjectId = null;

        // DOM Elements
        let currentSection = 'dashboard-section';

        // Initialize Dashboard
        function initializeDashboard() {
            renderStats();
            renderNewListings();
            renderDashboardOngoingProjects();
            showNotification('Müteahhit paneline hoş geldiniz!', 'success');
        }

        function initializeOffers() {
            renderPendingRejectedOffers();
            renderAcceptedOffers();
            switchOfferTab('pending-rejected');
        }

        // Render Statistics
        function renderStats() {
            const container = document.getElementById('stats-grid');
            if (!container) return;

            const stats = [
                {
                    title: 'Verilen Teklif Sayısı',
                    value: appData.stats.totalOffers,
                    icon: 'fas fa-paper-plane',
                    color: 'text-blue-600',
                    bgColor: 'bg-blue-50',
                    borderColor: 'border-blue-200',
                    action: () => {
                        showSection('offers-section');
                        initializeOffers();
                    }
                },
                {
                    title: 'Kabul Edilen Proje',
                    value: appData.stats.acceptedProjects,
                    icon: 'fas fa-check-circle',
                    color: 'text-green-600',
                    bgColor: 'bg-green-50',
                    borderColor: 'border-green-200',
                    action: () => {
                        showSection('projects-section');
                        setTimeout(() => switchProjectTab('completed'), 100);
                    }
                },
                {
                    title: 'Devam Eden Proje',
                    value: appData.stats.ongoingProjects,
                    icon: 'fas fa-hammer',
                    color: 'text-orange-600',
                    bgColor: 'bg-orange-50',
                    borderColor: 'border-orange-200',
                    action: () => {
                        showSection('projects-section');
                        setTimeout(() => switchProjectTab('ongoing'), 100);
                    }
                }
            ];

            container.innerHTML = stats.map(stat => {
                const cardId = `stat-card-${stat.title.toLowerCase().replace(/\s+/g, '-')}`;
                return `
                    <div id="${cardId}" class="bg-white rounded-xl shadow-sm border ${stat.borderColor} p-6 hover:shadow-md transition-shadow duration-300 cursor-pointer">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-gray-600">${stat.title}</p>
                                <p class="text-2xl font-bold text-gray-900 mt-1">${stat.value}</p>
                            </div>
                            <div class="w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center">
                                <i class="${stat.icon} text-xl ${stat.color}"></i>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');

            // Event listeners'ları ayrı ayrı ekleyelim
            stats.forEach(stat => {
                const cardId = `stat-card-${stat.title.toLowerCase().replace(/\s+/g, '-')}`;
                const card = document.getElementById(cardId);
                if (card) {
                    card.addEventListener('click', stat.action);
                }
            });
        }

        // Render New Listings
        function renderNewListings() {
            const container = document.getElementById('new-listings-content');
            if (!container) return;

            container.innerHTML = appData.listingsData.map(listing => `
                <div class="border border-gray-200 rounded-lg p-4 mb-4 hover:border-purple-300 transition-colors duration-200">
                    <div class="flex justify-between items-start mb-3">
                        <div class="flex-1">
                            <h4 class="font-semibold text-gray-800 mb-1">${listing.title}</h4>
                            <p class="text-sm text-gray-600 flex items-center mb-2">
                                <i class="fas fa-map-marker-alt mr-1"></i>
                                ${listing.location}
                            </p>
                            <p class="text-sm text-gray-600 mb-2">${listing.description}</p>
                            <div class="flex items-center space-x-4">
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                    ${listing.type}
                                </span>
                                <span class="text-xs text-gray-500">${listing.timeAgo}</span>
                            </div>
                        </div>
                    </div>
                    <button onclick="openMakeOfferModal(${listing.id})" class="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 text-sm font-medium">
                        <i class="fas fa-hand-holding-usd mr-2"></i>
                        Teklif Ver
                    </button>
                </div>
            `).join('');
        }

        // Render Ongoing Projects
        function renderDashboardOngoingProjects() {
            const container = document.getElementById('ongoing-projects-content');
            if (!container) return;

            container.innerHTML = appData.ongoingProjects.map(project => `
                <div class="border border-gray-200 rounded-lg p-4 mb-4 hover:border-purple-300 transition-colors duration-200">
                    <div class="flex justify-between items-start mb-3">
                        <div class="flex-1">
                            <h4 class="font-semibold text-gray-800 mb-1">${project.title}</h4>
                            <p class="text-sm text-gray-600 mb-1">Mülk Sahibi: ${project.owner}</p>
                            <p class="text-sm text-gray-600 mb-3">Durum: ${project.status}</p>
                            
                            <!-- Progress Bar -->
                            <div class="mb-3">
                                <div class="flex justify-between text-xs text-gray-600 mb-1">
                                    <span>İlerleme</span>
                                    <span>%${project.progress}</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="progress-bar bg-purple-600 h-2 rounded-full" style="width: ${project.progress}%"></div>
                                </div>
                            </div>
                            
                            <p class="text-xs text-gray-500">Son güncelleme: ${project.lastUpdate}</p>
                        </div>
                    </div>
                    <button onclick="viewProjectDetails(${project.id})" class="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm font-medium">
                        <i class="fas fa-eye mr-2"></i>
                        Detayları Görüntüle
                    </button>
                </div>
            `).join('');
        }

        function getStatusBadgeClass(status) {
            switch (status) {
                case 'accepted': return 'bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold';
                case 'pending': return 'bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold';
                case 'rejected': return 'bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold';
                default: return 'bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold';
            }
        }

        function renderPendingRejectedOffers() {
            const container = document.getElementById('pending-rejected-offers-list');
            if (!container) return;
            container.innerHTML = appData.pendingRejectedOffers.map(offer => `
                <div class="offer-card bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between">
                    <div>
                        <div class="flex justify-between items-start mb-2">
                            <h4 class="font-bold text-gray-800">${offer.listingTitle}</h4>
                            <span class="${getStatusBadgeClass(offer.status)}">${offer.status === 'pending' ? 'Beklemede' : 'Reddedildi'}</span>
                        </div>
                        <p class="text-sm text-gray-600 mb-4">Mülk Sahibi: ${offer.ownerName}</p>
                        <p class="text-sm text-gray-700 font-medium">Teklif Özeti:</p>
                        <p class="text-sm text-gray-600">${offer.offerDetails}</p>
                    </div>
                    <div class="mt-6 flex space-x-2">
                        <button onclick="showOfferDetailModal(${offer.id}, 'pending-rejected', 'view')" class="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">Teklifi Görüntüle</button>
                        <button onclick="showOfferDetailModal(${offer.id}, 'pending-rejected', 'edit')" class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">Teklifi Revize Et</button>
                    </div>
                </div>
            `).join('') || '<p class="text-gray-500 col-span-full">Bekleyen veya reddedilen teklif bulunmuyor.</p>';
        }

        function renderAcceptedOffers() {
            const container = document.getElementById('accepted-offers-list');
            if (!container) return;
            container.innerHTML = appData.acceptedOffers.map(offer => `
                <div class="offer-card bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between">
                    <div>
                        <div class="flex justify-between items-start mb-2">
                            <h4 class="font-bold text-gray-800">${offer.listingTitle}</h4>
                            <span class="${getStatusBadgeClass(offer.status)}">Kabul Edildi</span>
                        </div>
                        <p class="text-sm text-gray-600 mb-4">Mülk Sahibi: ${offer.ownerName}</p>
                        <p class="text-sm text-gray-700 font-medium">Teklif Özeti:</p>
                        <p class="text-sm text-gray-600">${offer.offerDetails}</p>
                    </div>
                    <div class="mt-6 space-y-2">
                        <button onclick="openOfferDetailsModal(${offer.id})" class="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">Detayları Görüntüle</button>
                        <button onclick="openCommissionPaymentModal(${offer.id})" class="w-full text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium" style="background-color: #5A00A8;" onmouseover="this.style.backgroundColor='#4B0082'" onmouseout="this.style.backgroundColor='#5A00A8'">Hukuki Süreçleri Başlat</button>
                        <button onclick="openProjectDesignListingModal(${offer.id})" class="w-full bg-white border border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary/5 transition-colors text-sm font-medium">Proje (Çizim İlanı) Ver</button>
                    </div>
                </div>
            `).join('') || '<p class="text-gray-500 col-span-full">Kabul edilen teklif bulunmuyor.</p>';
        }

        // Section Management
        function showSection(sectionId) {
            // Hide all sections
            const sections = ['dashboard-section', 'listings-section', 'my-listings-section', 'offers-section', 'projects-section', 'legal-processes-section', 'apartment-management-section', 'profile-section', 'support-section'];
            sections.forEach(id => {
                const section = document.getElementById(id);
                if (section) section.classList.add('hidden');
            });

            // Show selected section
            const selectedSection = document.getElementById(sectionId);
            if (selectedSection) {
                selectedSection.classList.remove('hidden');
                currentSection = sectionId;
            }

            if (sectionId === 'dashboard-section') {
                initializeDashboard();
            } else if (sectionId === 'offers-section') {
                initializeOffers();
            } else if (sectionId === 'projects-section') {
                initializeProjects();
            } else if (sectionId === 'legal-processes-section') {
                renderLegalProcesses();
            } else if (sectionId === 'apartment-management-section') {
                initializeApartmentManagement();
            } else if (sectionId === 'profile-section') {
                renderProfileSection();
            } else if (sectionId === 'support-section') {
                renderSupportSection();
            } else if (sectionId === 'my-listings-section') {
                renderContractorListings();
                initializeListingsTab();
            }

            // Update sidebar active state
            document.querySelectorAll('.sidebar-link').forEach(link => {
                link.classList.remove('active', 'bg-purple-50', 'text-purple-600');
                if (!link.href.includes('ilanlar.html')) { // Exclude external links from this logic
                    link.classList.add('text-gray-700');
                }
            });

            // Add active state to clicked link
            const activeLink = document.querySelector(`[onclick="showSection('${sectionId}')"]`);
            if (activeLink) {
                activeLink.classList.add('active', 'bg-purple-50', 'text-purple-600');
                activeLink.classList.remove('text-gray-700');
            }

            closeMobileMenu();
        }

        function switchOfferTab(tabName) {
            const pendingTab = document.getElementById('pending-rejected-tab');
            const acceptedTab = document.getElementById('accepted-tab');
            const pendingContainer = document.getElementById('pending-rejected-offers-container');
            const acceptedContainer = document.getElementById('accepted-offers-container');

            const activeClasses = ['border-primary', 'text-primary'];
            const inactiveClasses = ['border-transparent', 'text-gray-500', 'hover:text-gray-700', 'hover:border-gray-300'];

            if (tabName === 'pending-rejected') {
                pendingTab.classList.add(...activeClasses);
                pendingTab.classList.remove(...inactiveClasses);
                acceptedTab.classList.add(...inactiveClasses);
                acceptedTab.classList.remove(...activeClasses);

                pendingContainer.classList.remove('hidden');
                acceptedContainer.classList.add('hidden');
            } else {
                acceptedTab.classList.add(...activeClasses);
                acceptedTab.classList.remove(...inactiveClasses);
                pendingTab.classList.add(...inactiveClasses);
                pendingTab.classList.remove(...activeClasses);

                acceptedContainer.classList.remove('hidden');
                pendingContainer.classList.add('hidden');
            }
        }

        // Mobile Menu Functions
        function openMobileMenu() {
            document.getElementById('sidebar').classList.remove('-translate-x-full');
            document.getElementById('sidebar-overlay').classList.remove('hidden');
        }

        function closeMobileMenu() {
            document.getElementById('sidebar').classList.add('-translate-x-full');
            document.getElementById('sidebar-overlay').classList.add('hidden');
        }

        // Modal Functions
        function showModal(modalId) {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.remove('hidden');
                modal.classList.add('flex');
            }
        }

        function openModal(modalId) {
            const modal = document.getElementById(modalId);
            
            if (modal) {
                modal.classList.remove('hidden');
                modal.classList.add('flex');
                document.body.style.overflow = 'hidden';
            } else {
                showNotification('Modal bulunamadı!', 'error');
            }
        }

        function closeModal(modalId) {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
                document.body.style.overflow = 'auto';
            }
        }

        function backToPaymentOptions(fromModalId) {
            closeModal(fromModalId);
            showModal('paymentOptionsModal');
        }

        // Notification System
        function showNotification(message, type = 'info') {
            const container = document.getElementById('notification-container');
            if (!container) return;

            const notification = document.createElement('div');
            const id = 'notification-' + Date.now();
            notification.id = id;

            const colors = {
                success: 'bg-green-500 text-white',
                error: 'bg-red-500 text-white',
                warning: 'bg-yellow-500 text-white',
                info: 'bg-blue-500 text-white'
            };

            const icons = {
                success: 'fas fa-check-circle',
                error: 'fas fa-exclamation-circle',
                warning: 'fas fa-exclamation-triangle',
                info: 'fas fa-info-circle'
            };

            notification.className = `notification ${colors[type]} px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 max-w-sm`;
            notification.innerHTML = `
                <i class="${icons[type]}"></i>
                <span class="flex-1 text-sm font-medium">${message}</span>
                <button onclick="removeNotification('${id}')" class="text-white hover:text-gray-200">
                    <i class="fas fa-times"></i>
                </button>
            `;

            container.appendChild(notification);

            setTimeout(() => { removeNotification(id); }, 5000);
        }

        function removeNotification(id) {
            const notification = document.getElementById(id);
            if (notification) {
                notification.classList.add('removing');
                setTimeout(() => { notification.remove(); }, 300);
            }
        }

        // Action Functions
        function makeOffer(listingId) { showNotification(`İlan #${listingId} için teklif verme sayfasına yönlendiriliyorsunuz...`, 'info'); }
        function viewProjectDetails(projectId) { showNotification(`Proje #${projectId} detayları görüntüleniyor...`, 'info'); }

        // Tekliflerim Functions
        function showOfferDetailModal(offerId, offerType, mode = 'view') {
            const offerData = offerType === 'accepted' ? appData.acceptedOffers : appData.pendingRejectedOffers;
            const offer = offerData.find(o => o.id === offerId);
            if (!offer) return;

            currentOffer = offer;
            const isEditMode = mode === 'edit';

            document.getElementById('offer-id-input').value = offer.id;
            document.getElementById('offer-type-input').value = offerType;

            const details = offer.offerDetailsFull;
            
            // İlan ve mülk sahibi bilgileri (her zaman read-only)
            document.getElementById('listing-title').textContent = offer.listingTitle;
            document.getElementById('owner-name').textContent = offer.ownerName;

            // Daire bilgileri - edit/view moduna göre input/text
            if (isEditMode) {
                document.getElementById('apartment-type').innerHTML = `<input type="text" value="${details.apartmentType}" class="w-full p-2 border border-gray-300 rounded-lg" id="edit-apartment-type">`;
                document.getElementById('cash-demand').innerHTML = `<input type="number" value="${details.cashDemandPerUnit}" class="w-full p-2 border border-gray-300 rounded-lg" id="edit-cash-demand">`;
                document.getElementById('num-floors').innerHTML = `<input type="number" value="${details.numFloors}" class="w-full p-2 border border-gray-300 rounded-lg" id="edit-num-floors">`;
                document.getElementById('emsal-area').innerHTML = `<input type="number" value="${details.emsalArea}" class="w-full p-2 border border-gray-300 rounded-lg" id="edit-emsal-area">`;
                document.getElementById('net-area').innerHTML = `<input type="number" value="${details.netArea}" class="w-full p-2 border border-gray-300 rounded-lg" id="edit-net-area">`;
                document.getElementById('gross-area').innerHTML = `<input type="number" value="${details.grossArea}" class="w-full p-2 border border-gray-300 rounded-lg" id="edit-gross-area">`;
                document.getElementById('num-balconies').innerHTML = `<input type="number" value="${details.numBalconies}" class="w-full p-2 border border-gray-300 rounded-lg" id="edit-num-balconies">`;
                document.getElementById('num-bathrooms').innerHTML = `<input type="number" value="${details.numBathrooms}" class="w-full p-2 border border-gray-300 rounded-lg" id="edit-num-bathrooms">`;
                document.getElementById('num-wcs').innerHTML = `<input type="number" value="${details.numWCs}" class="w-full p-2 border border-gray-300 rounded-lg" id="edit-num-wcs">`;
            } else {
                document.getElementById('apartment-type').textContent = details.apartmentType;
                document.getElementById('cash-demand').textContent = `${details.cashDemandPerUnit.toLocaleString('tr-TR')} ₺`;
                document.getElementById('num-floors').textContent = details.numFloors;
                document.getElementById('emsal-area').textContent = `${details.emsalArea} m²`;
                document.getElementById('net-area').textContent = `${details.netArea} m²`;
                document.getElementById('gross-area').textContent = `${details.grossArea} m²`;
                document.getElementById('num-balconies').textContent = details.numBalconies;
                document.getElementById('num-bathrooms').textContent = details.numBathrooms;
                document.getElementById('num-wcs').textContent = details.numWCs;
            }

            // Modal başlığını güncelle
            const modalTitle = document.querySelector('#offerDetailModal h2');
            modalTitle.textContent = isEditMode ? 'Teklifi Revize Et' : 'Teklif Detayları';

            // Butonları güncelle
            updateModalButtons(isEditMode);

            showModal('offerDetailModal');
        }

        function updateModalButtons(isEditMode) {
            const footerContainer = document.getElementById('modal-footer-buttons');
            if (isEditMode) {
                footerContainer.innerHTML = `
                    <button onclick="closeModal('offerDetailModal')" 
                        class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">İptal</button>
                    <button onclick="saveRevisedOffer()" 
                        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Teklifi Kaydet</button>
                `;
            } else {
                footerContainer.innerHTML = `
                    <button onclick="closeModal('offerDetailModal')" 
                        class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">Kapat</button>
                `;
            }
        }

        function saveRevisedOffer() {
            const offerId = parseInt(document.getElementById('offer-id-input').value);
            const offerIndex = appData.pendingRejectedOffers.findIndex(o => o.id === offerId);
            
            if (offerIndex === -1) {
                showNotification('Revize edilecek teklif bulunamadı.', 'error');
                return;
            }

            // Input değerlerini al
            const apartmentType = document.getElementById('edit-apartment-type').value;
            const cashDemandPerUnit = parseInt(document.getElementById('edit-cash-demand').value);
            const numFloors = parseInt(document.getElementById('edit-num-floors').value);
            const emsalArea = parseInt(document.getElementById('edit-emsal-area').value);
            const netArea = parseInt(document.getElementById('edit-net-area').value);
            const grossArea = parseInt(document.getElementById('edit-gross-area').value);
            const numBalconies = parseInt(document.getElementById('edit-num-balconies').value);
            const numBathrooms = parseInt(document.getElementById('edit-num-bathrooms').value);
            const numWCs = parseInt(document.getElementById('edit-num-wcs').value);

            // Validasyon
            if (!apartmentType || !cashDemandPerUnit || !numFloors || !emsalArea || !netArea || !grossArea) {
                showNotification('Lütfen tüm alanları doldurun.', 'error');
                return;
            }

            // Güncellenmiş detaylar
            const updatedDetails = {
                apartmentType,
                cashDemandPerUnit,
                numFloors,
                emsalArea,
                netArea,
                grossArea,
                numBalconies,
                numBathrooms,
                numWCs
            };

            // Verileri güncelle
            appData.pendingRejectedOffers[offerIndex].offerDetailsFull = updatedDetails;
            appData.pendingRejectedOffers[offerIndex].offerDetails = `${updatedDetails.apartmentType}, ${updatedDetails.cashDemandPerUnit.toLocaleString('tr-TR')} TL Nakit, ${updatedDetails.numFloors} Kat, ${updatedDetails.emsalArea}m² Emsal`;
            appData.pendingRejectedOffers[offerIndex].status = 'pending'; // Revize edilen teklif tekrar beklemede olur

            // UI'ı güncelle
            renderPendingRejectedOffers();
            closeModal('offerDetailModal');
            showNotification('Teklifiniz başarıyla revize edildi!', 'success');
        }

        function openReviseConfirmModal() {
            closeModal('offerDetailModal');
            showModal('reviseOfferConfirmModal');
        }

        function reviseOffer() {
            // Bu fonksiyon artık deprecated, yeni saveRevisedOffer kullanılıyor
            saveRevisedOffer();
        }

        function openArchitectRequestModal() {
            closeModal('offerDetailModal');
            const listing = appData.listingsData.find(l => l.id === currentOffer.relatedListingId);
            if (!listing) {
                showNotification('İlgili ilan bilgileri bulunamadı.', 'error');
                return;
            }

            document.getElementById('req-modal-area').textContent = listing.area;
            document.getElementById('req-modal-units').textContent = listing.expectedUnits;

            selectedArchitectId = null; // Reset selection when modal opens
            const architectContainer = document.getElementById('architect-list-container');
            architectContainer.innerHTML = appData.architects.map(arch => `
                <div id="architect-card-${arch.id}" class="architect-card flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 transition-all duration-200">
                    <div class="flex items-center">
                        <img src="${arch.profileImage}" alt="${arch.name}" class="w-10 h-10 rounded-full mr-3">
                        <div>
                            <p class="font-semibold text-gray-800">${arch.name}</p>
                            <p class="text-sm text-gray-600">${arch.specialty} - Puan: ${arch.rating}/5</p>
                        </div>
                    </div>
                    <button id="architect-btn-${arch.id}" onclick="selectArchitect(${arch.id}, this)" class="bg-white border border-gray-300 text-gray-700 px-4 py-1.5 rounded-lg text-sm hover:bg-gray-100 font-medium">Seç</button>
                </div>
            `).join('');

            showModal('architectRequestModal');
        }

        function selectArchitect(architectId, btnElement) {
            // Deselect all other architects
            document.querySelectorAll('.architect-card').forEach(card => card.classList.remove('border-primary', 'bg-purple-50'));
            document.querySelectorAll('.architect-card button').forEach(btn => {
                btn.classList.remove('bg-primary', 'text-white', 'border-primary');
                btn.classList.add('bg-white', 'text-gray-700', 'border-gray-300');
                btn.innerHTML = 'Seç';
            });

            if (selectedArchitectId === architectId) {
                // Deselect if clicking the same one again
                selectedArchitectId = null;
            } else {
                // Select the new one
                selectedArchitectId = architectId;
                const card = document.getElementById(`architect-card-${architectId}`);
                card.classList.add('border-primary', 'bg-purple-50');
                btnElement.classList.add('bg-primary', 'text-white', 'border-primary');
                btnElement.classList.remove('bg-white', 'text-gray-700', 'border-gray-300');
                btnElement.innerHTML = '<i class="fas fa-check mr-1"></i> Seçildi';
            }
        }

        function openArchitectSelectionConfirmModal() {
            if (!selectedArchitectId) {
                showNotification('Lütfen bir mimar seçiniz.', 'warning');
                return;
            }
            closeModal('architectRequestModal');
            showModal('architectSelectionConfirmModal');
        }

        function confirmArchitectRequest() {
            const numArchitects = 1; // Since we only allow one selection
            const fee = calculateArchitectFee(currentOffer.relatedListingId, numArchitects);

            closeModal('architectSelectionConfirmModal');

            openPaymentOptionsModal({
                amount: fee,
                type: 'architect_fee',
                relatedId: currentOffer.id
            });
        }

        function calculateArchitectFee(listingId, numArchitects) {
            const listing = appData.listingsData.find(l => l.id === listingId);
            if (!listing) return 0;
            // Formula: Area * 5% * Expected Units * Number of Architects
            return listing.area * 0.05 * listing.expectedUnits * numArchitects;
        }

        function calculateContractorCommission(listingId) {
            const listing = appData.listingsData.find(l => l.id === listingId);
            if (!listing) return 0;
            // Formula: Area * 20% * Expected Units
            return listing.area * 0.20 * listing.expectedUnits;
        }

        function openPaymentOptionsModal(context) {
            paymentContext = context;
            document.getElementById('payment-amount').textContent = `₺${context.amount.toLocaleString('tr-TR')}`;
            showModal('paymentOptionsModal');
        }

        function processPayment(method) {
            // This function is now only for E-Wallet, which is removed.
            // Kept empty to avoid breaking any potential old references, but can be removed.
        }

        function openCreditCardPaymentModal() {
            closeModal('applicationProjectPaymentModal'); // Close previous modal if open
            closeModal('paymentOptionsModal');
            document.getElementById('cc-payment-amount').textContent = `₺${paymentContext.amount.toLocaleString('tr-TR')}`;
            const cardSelect = document.getElementById('registered-cards');
            cardSelect.innerHTML = '<option value="">Yeni Kart</option>';
            appData.registeredCreditCards.forEach(card => {
                cardSelect.innerHTML += `<option value="${card.id}">**** **** **** ${card.lastFour}</option>`;
            });
            showModal('creditCardPaymentModal');
        }

        function fillCardDetails(cardId) {
            if (!cardId) {
                document.getElementById('card-holder').value = '';
                document.getElementById('card-number').value = '';
                document.getElementById('card-expiry').value = '';
                document.getElementById('card-cvv').value = '';
                return;
            }
            const card = appData.registeredCreditCards.find(c => c.id == cardId);
            if (card) {
                document.getElementById('card-holder').value = card.cardHolder;
                document.getElementById('card-number').value = card.number;
                document.getElementById('card-expiry').value = card.expiry;
                document.getElementById('card-cvv').value = card.cvv;
            }
        }

        function processCreditCardPayment() {
            closeModal('creditCardPaymentModal');
            showNotification('Kredi kartı ile ödeme doğrulanıyor...', 'info');

            const saveCard = document.getElementById('save-card-checkbox').checked;
            if (saveCard) {
                const newCard = {
                    id: Date.now(),
                    cardHolder: document.getElementById('card-holder').value,
                    lastFour: document.getElementById('card-number').value.slice(-4),
                    expiry: document.getElementById('card-expiry').value,
                    number: document.getElementById('card-number').value,
                    cvv: document.getElementById('card-cvv').value
                };
                appData.registeredCreditCards.push(newCard);
                showNotification('Yeni kartınız kaydedildi.', 'success');
            }

            setTimeout(() => {
                if (paymentContext.type === 'application_project_fee') {
                    processApplicationProjectPayment(paymentContext.relatedId, 'card');
                } else {
                    processPaymentSuccess(paymentContext.type, paymentContext.relatedId, paymentContext.amount);
                }
            }, 1500);
        }

        function openEftHavalePaymentModal() {
            closeModal('paymentOptionsModal');
            document.getElementById('eft-payment-amount').textContent = `₺${paymentContext.amount.toLocaleString('tr-TR')}`;
            document.getElementById('company-account-name').textContent = appData.companyAccountName;
            document.getElementById('company-iban').textContent = appData.companyIban;
            showModal('eftHavalePaymentModal');
        }

        function processEftHavalePayment() {
            closeModal('eftHavalePaymentModal');
            showNotification('Ödeme bildiriminiz alındı. Onaylandığında işleminiz tamamlanacaktır.', 'info');
            // In a real app, this would wait for a webhook or manual confirmation.
            // For simulation, we can approve it after a delay.
            setTimeout(() => {
                if (paymentContext.type === 'application_project_fee') {
                    processApplicationProjectPayment(paymentContext.relatedId, 'transfer');
                } else {
                    processPaymentSuccess(paymentContext.type, paymentContext.relatedId, paymentContext.amount);
                }
            }, 5000);
        }

        function processPaymentSuccess(paymentType, relatedId, amount) {
            showNotification('Ödeme başarıyla tamamlandı!', 'success');
            if (paymentType === 'commission') {
                appData.contracts[relatedId].isCommissionPaid = true;
                renderContractDetails(relatedId);
            } else if (paymentType === 'architect_fee') {
                showNotification('Mimar proje talebi için ödeme alındı. Süreç başlatıldı.', 'success');
                const commission = amount * 0.15;
                const architectPayout = amount - commission;
                showNotification(`₺${commission.toLocaleString('tr-TR')} DönüşümAY komisyonu kesildi. ₺${architectPayout.toLocaleString('tr-TR')} mimarın cüzdanına aktarıldı.`, 'info');
            }
            paymentContext = {}; // Reset context
        }

        function copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(() => {
                showNotification('IBAN panoya kopyalandı!', 'success');
            }, () => {
                showNotification('Kopyalama başarısız oldu.', 'error');
            });
        }

        function goToContracts(offerId) {
            currentOffer = appData.acceptedOffers.find(o => o.id === offerId);
            showSection('contracts-section');
            renderContractDetails(offerId);
            showNotification('Sözleşme sürecine yönlendiriliyorsunuz. Lütfen komisyon ödemenizi tamamlayın.', 'info');
        }

        // Sözleşmelerim Functions
        function renderContractDetails(offerId) {
            const container = document.getElementById('contract-details-content');
            if (!appData.contracts[offerId]) {
                const commission = calculateContractorCommission(currentOffer.relatedListingId);
                appData.contracts[offerId] = {
                    offerId: offerId,
                    commissionAmount: commission,
                    isCommissionPaid: false,
                    assignedLawyer: null,
                    noterContractUrl: null,
                    uploadedFiles: []
                };
            }

            const contract = appData.contracts[offerId];
            let content = `
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">Komisyon Bilgileri</h3>
                    <div class="flex justify-between items-center">
                        <div>
                            <p class="text-gray-600">Durum: <span class="font-bold ${contract.isCommissionPaid ? 'text-green-600' : 'text-red-600'}">${contract.isCommissionPaid ? 'ÖDENDİ' : 'ÖDEME BEKLENİYOR'}</span></p>
                            <p class="text-2xl font-bold text-gray-800 mt-1">₺${contract.commissionAmount.toLocaleString('tr-TR')}</p>
                        </div>
                        ${!contract.isCommissionPaid ? `<button onclick="payCommission(${offerId})" class="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark">Komisyonu Öde</button>` : ''}
                    </div>
                </div>
            `;

            if (contract.isCommissionPaid) {
                content += `
                    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                        <h3 class="text-lg font-semibold text-gray-800 mb-4">Avukat Atama</h3>
                        ${contract.assignedLawyer ? `
                            <div class="flex justify-between items-center">
                                <div>
                                    <p class="text-gray-600">Atanan Avukat:</p> 
                                    <p class="font-bold text-gray-800">${contract.assignedLawyer.name} <span class="text-sm font-normal text-gray-500">(${contract.assignedLawyer.contact})</span></p>
                                </div>
                                <button onclick="openLawyerChatModal(${offerId})" id="message-lawyer-btn-${offerId}" class="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark">Avukat ile Mesajlaş</button>
                            </div>
                        ` : `
                            <div class="space-y-3">${appData.lawyers.map(lawyer => `
                                <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                                    <div><p class="font-semibold">${lawyer.name}</p><p class="text-sm text-gray-600">${lawyer.specialty}</p></div>
                                    <button onclick="assignLawyer(${offerId}, ${lawyer.id})" class="bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded-lg text-sm hover:bg-gray-100">Avukat Ata</button>
                                </div>`).join('')}
                            </div>`}
                    </div>
                    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 class="text-lg font-semibold text-gray-800 mb-4">Sözleşme Yükleme</h3>
                        <div id="contract-upload-area-${offerId}">
                            <button onclick="handleNoterContractUpload(${offerId})" class="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">Noter Sözleşmesini Yükle</button>
                            ${contract.uploadedFiles.length > 0 ? `<div class="mt-4"><p class="text-sm font-medium text-gray-700">Yüklenen Dosyalar:</p><ul class="list-disc list-inside text-sm text-gray-600">${contract.uploadedFiles.map(f => `<li>${f}</li>`).join('')}</ul></div>` : ''}
                        </div>
                    </div>
                `;
            }
            container.innerHTML = content;
        }

        function payCommission(offerId) {
            const commission = calculateContractorCommission(currentOffer.relatedListingId);
            openPaymentOptionsModal({
                amount: commission,
                type: 'commission',
                relatedId: offerId
            });
        }

        function assignLawyer(offerId, lawyerId) {
            const lawyer = appData.lawyers.find(l => l.id === lawyerId);
            appData.contracts[offerId].assignedLawyer = lawyer;
            renderContractDetails(offerId);
            showNotification(`Avukat ${lawyer.name} ataması başarıyla yapıldı. Avukatınızla iletişime geçebilirsiniz.`, 'success');
        }

        // Lawyer Chat Functions
        function openLawyerChatModal(offerId) {
            currentOffer.id = offerId; // Make sure offer id is set for context
            if (!appData.lawyerChatHistory[offerId]) {
                appData.lawyerChatHistory[offerId] = [
                    { sender: 'lawyer', text: 'Merhaba, sözleşme süreciyle ilgili size nasıl yardımcı olabilirim?', time: new Date().toLocaleTimeString() }
                ];
            }
            renderLawyerChatMessages();
            showModal('lawyerChatModal');
        }

        function renderLawyerChatMessages() {
            const container = document.getElementById('chat-messages');
            const history = appData.lawyerChatHistory[currentOffer.id] || [];
            container.innerHTML = history.map(msg => {
                const isUser = msg.sender === 'user';
                return `
                    <div class="flex ${isUser ? 'justify-end' : 'justify-start'}">
                        <div class="max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${isUser ? 'bg-primary text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}">
                            <p class="text-sm">${msg.text}</p>
                            ${msg.file ? `<a href="#" class="block mt-1 text-xs font-semibold underline">${msg.file} <i class="fas fa-download ml-1"></i></a>` : ''}
                            <div class="flex justify-end items-center mt-1">
                                <span class="text-xs ${isUser ? 'text-purple-200' : 'text-gray-500'} mr-2">${msg.time}</span>
                                ${isUser ? '<i class="fas fa-check-double text-blue-400"></i>' : ''}
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
            container.scrollTop = container.scrollHeight; // Scroll to bottom
        }

        function sendLawyerMessage() {
            const input = document.getElementById('chat-input');
            const text = input.value.trim();
            if (!text) return;

            const history = appData.lawyerChatHistory[currentOffer.id];
            history.push({ sender: 'user', text: text, time: new Date().toLocaleTimeString() });
            input.value = '';
            renderLawyerChatMessages();

            // Simulate lawyer response
            setTimeout(() => {
                history.push({ sender: 'lawyer', text: 'Mesajınızı aldım, inceliyorum.', time: new Date().toLocaleTimeString() });
                renderLawyerChatMessages();
            }, 1500);
        }

        function sendLawyerFile(event) {
            const file = event.target.files[0];
            if (!file) return;

            const history = appData.lawyerChatHistory[currentOffer.id];
            history.push({ sender: 'user', text: `Dosya gönderildi: ${file.name}`, file: file.name, time: new Date().toLocaleTimeString() });
            renderLawyerChatMessages();

            event.target.value = null; // Reset file input

            setTimeout(() => {
                history.push({ sender: 'lawyer', text: `'${file.name}' adlı dosyayı aldım, teşekkürler.`, time: new Date().toLocaleTimeString() });
                renderLawyerChatMessages();
            }, 1500);
        }

        function handleNoterContractUpload(offerId) {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.multiple = true;
            try {
                fileInput.webkitdirectory = true;
                fileInput.directory = true;
            } catch (e) {
                // Some browsers might not support these properties.
            }

            fileInput.onchange = (e) => {
                const files = e.target.files;
                if (files.length > 0) {
                    // Find the offer and listing
                    const offerIndex = appData.acceptedOffers.findIndex(o => o.id === offerId);
                    if (offerIndex === -1) return;
                    const offer = appData.acceptedOffers[offerIndex];
                    const listing = appData.listingsData.find(l => l.id === offer.relatedListingId);

                    // Create a new project object
                    const newProject = {
                        id: Date.now(),
                        title: offer.listingTitle,
                        ownerName: offer.ownerName,
                        assignedArchitect: appData.architects[0], // Simulate assigning the first architect
                        status: 'Avan Proje Onaylandı',
                        progress: 10,
                        applicationPaymentStatus: false,
                        municipalityProcess: [{ text: 'Ruhsat Başvurusu Bekleniyor', canUploadDocument: false }],
                        totalUnits: listing.totalUnits,
                        unitPrice: listing.unitPrice,
                        relatedListingId: offer.relatedListingId
                    };

                    // Add to ongoing projects and remove from accepted offers
                    appData.ongoingContractorProjectsData.push(newProject);
                    appData.acceptedOffers.splice(offerIndex, 1);

                    // Re-render relevant sections
                    renderAcceptedOffers();
                    if (currentSection === 'projects-section') {
                        renderOngoingContractorProjects();
                    }

                    showNotification('Noter sözleşmesi yüklendi. Projeniz "Devam Eden Projelerim" bölümüne alındı.', 'success');
                }
            };

            fileInput.click();
        }

        // Projelerim Functions
        function initializeProjects() {
            renderOngoingContractorProjects();
            renderCompletedContractorProjects();
            switchProjectTab('ongoing');
        }

        function switchProjectTab(tabName) {
            const ongoingTab = document.getElementById('ongoing-projects-tab');
            const completedTab = document.getElementById('completed-projects-tab');
            const ongoingContainer = document.getElementById('ongoing-projects-container');
            const completedContainer = document.getElementById('completed-projects-container');

            const activeClasses = ['border-primary', 'text-primary'];
            const inactiveClasses = ['border-transparent', 'text-gray-500', 'hover:text-gray-700', 'hover:border-gray-300'];

            if (tabName === 'ongoing') {
                ongoingTab.classList.add(...activeClasses);
                ongoingTab.classList.remove(...inactiveClasses);
                completedTab.classList.add(...inactiveClasses);
                completedTab.classList.remove(...activeClasses);

                ongoingContainer.classList.remove('hidden');
                completedContainer.classList.add('hidden');
            } else {
                completedTab.classList.add(...activeClasses);
                completedTab.classList.remove(...inactiveClasses);
                ongoingTab.classList.add(...inactiveClasses);
                ongoingTab.classList.remove(...activeClasses);

                completedContainer.classList.remove('hidden');
                ongoingContainer.classList.add('hidden');
            }
        }

        function renderOngoingContractorProjects() {
            const container = document.getElementById('ongoing-contractor-projects-list');
            if (!container) return;
            container.innerHTML = appData.ongoingContractorProjectsData.map(project => `
                <div class="project-card bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between">
                    <div>
                        <h4 class="font-bold text-gray-800">${project.title}</h4>
                        <p class="text-sm text-gray-600 mb-2">Mülk Sahibi: ${project.ownerName}</p>
                        <p class="text-sm text-gray-600 mb-4">Mimar: ${project.assignedArchitect.name} (${project.assignedArchitect.email})</p>
                        
                        <p class="text-xs font-medium text-gray-500 mb-1">DURUM: ${project.status}</p>
                        <div class="mb-4">
                            <div class="flex justify-between text-xs text-gray-600 mb-1">
                                <span>İlerleme</span>
                                <span>%${project.progress}</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="progress-bar bg-primary h-2 rounded-full" style="width: ${project.progress}%"></div>
                            </div>
                        </div>
                        
                        <div class="mt-4 pt-4 border-t border-gray-200">
                             <p class="text-xs font-medium text-gray-500 mb-2">YÜKLENEN PROJELER</p>
                             <div class="space-y-2">
                                ${appData.uploadedArchitectProjects.filter(p => p.projectId === project.id).map(proj => `
                                    <div class="flex justify-between items-center text-sm">
                                        <span>${proj.type} Projesi</span>
                                        <button onclick="viewArchitectProject(${project.id}, '${proj.type}')" class="text-primary hover:underline font-semibold">Görüntüle</button>
                                    </div>
                                `).join('') || '<p class="text-sm text-gray-400">Henüz yüklenen proje yok.</p>'}
                             </div>
                        </div>
                    </div>
                    <div class="mt-4 space-y-2">
                        <button 
                            onclick="openApplicationProjectPaymentModal(${project.id})" 
                            class="w-full text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors ${project.paymentStage > 2 ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary-dark'}"
                            ${project.paymentStage > 2 ? 'disabled' : ''}>
                            ${project.paymentStage > 2 ? 'Tüm Ödemeler Tamamlandı' : 'Uygulama Projesi Ödemesi Yap'}
                        </button>
                        <button onclick="openMunicipalityProcessModal(${project.id})" class="w-full bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 text-sm">Belediye Süreçlerini Görüntüle</button>
                         <button onclick="openLawyerChatModal(${project.id})" class="w-full bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 text-sm">Mimar ile Mesajlaş</button>
                    </div>
                </div>
            `).join('') || '<p class="text-gray-500 col-span-full">Devam eden proje bulunmuyor.</p>';
        }

        function renderCompletedContractorProjects() {
            const container = document.getElementById('completed-contractor-projects-list');
            if (!container) return;
            container.innerHTML = appData.completedContractorProjectsData.map(project => `
                 <div class="project-card bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between">
                    <div>
                        <h4 class="font-bold text-gray-800">${project.title}</h4>
                        <p class="text-sm text-gray-600 mb-2">Mülk Sahibi: ${project.ownerName}</p>
                        <p class="text-sm text-gray-600 mb-4">Tamamlanma: ${project.completionDate}</p>
                    </div>
                    <div class="mt-4">
                        <button onclick="openConstructionPhasesModal(${project.id})" class="w-full bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 text-sm">İnşaat Aşamalarını Görüntüle</button>
                    </div>
                </div>
            `).join('') || '<p class="text-gray-500 col-span-full">Tamamlanan proje bulunmuyor.</p>';
        }

        function openApplicationProjectPaymentModal(projectId) {
            const project = appData.ongoingContractorProjectsData.find(p => p.id === projectId);
            if (!project) return;

            const totalAmount = project.totalUnits * project.unitPrice;
            const installments = [totalAmount * 0.20, totalAmount * 0.40, totalAmount * 0.40];
            const currentPaymentAmount = installments[project.paymentStage] || 0;

            document.getElementById('app-project-total-amount').textContent = `₺${totalAmount.toLocaleString('tr-TR')}`;
            document.getElementById('app-project-current-payment').textContent = `₺${currentPaymentAmount.toLocaleString('tr-TR')}`;

            const installmentsContainer = document.getElementById('app-project-installments');
            const installmentLabels = ['Proje Başında: %20', 'Proje Ortasında: %40', 'Proje Sonunda: %40'];

            installmentsContainer.innerHTML = installmentLabels.map((label, index) => {
                const isCurrentStage = index === project.paymentStage;
                const isPaid = index < project.paymentStage;
                let stageClass = 'p-2 rounded-lg transition-colors';
                let stageText = '';

                if (isCurrentStage) {
                    stageClass += ' bg-blue-50 border border-blue-200';
                    stageText = ' (Mevcut Aşama)';
                } else if (isPaid) {
                    stageClass += ' bg-green-50 text-gray-500';
                    stageText = ' (Ödendi)';
                } else {
                    stageClass += ' bg-gray-50 text-gray-500';
                }

                return `<div class="${stageClass}">
                    <span>${label} (<strong>₺${installments[index].toLocaleString('tr-TR')}</strong>)</span>
                    <span class="font-semibold text-primary">${stageText}</span>
                </div>`;
            }).join('');


            paymentContext = {
                amount: currentPaymentAmount,
                type: 'application_project_fee',
                relatedId: projectId
            };
            showModal('applicationProjectPaymentModal');
        }

        function processApplicationProjectPayment(projectId, method) {
            const project = appData.ongoingContractorProjectsData.find(p => p.id === projectId);
            if (project) {
                project.paymentStage += 1; // Advance to next stage
                renderOngoingContractorProjects();
                showNotification(`'${method}' ile uygulama projesi ödemesi başarıyla tamamlandı!`, 'success');
            }
            closeModal('creditCardPaymentModal');
            closeModal('eftHavalePaymentModal');
            closeModal('applicationProjectPaymentModal');
        }

        function openMunicipalityProcessModal(projectId) {
            const project = appData.ongoingContractorProjectsData.find(p => p.id === projectId);
            if (!project) return;
            document.getElementById('municipality-project-title').textContent = project.title;
            const list = document.getElementById('municipality-process-list');
            list.innerHTML = project.municipalityProcess.map(item => `
                <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span class="text-sm">${item.text}</span>
                    ${item.canUploadDocument ? `<button onclick="handleMunicipalityDocumentUpload(${project.id})" class="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-xs font-semibold hover:bg-blue-200">Belge Yükle</button>` : ''}
                </div>
            `).join('');
            showModal('municipalityProcessModal');
        }

        function openConstructionPhasesModal(projectId) {
            const project = appData.completedContractorProjectsData.find(p => p.id === projectId);
            if (!project) return;
            document.getElementById('construction-project-title').textContent = project.title;
            const list = document.getElementById('construction-phases-list');
            list.innerHTML = project.constructionPhases.map((phase, index) => `
                <div class="p-3 bg-gray-50 rounded-lg">
                    <div class="flex justify-between items-center mb-2">
                        <span class="text-sm">${phase.name}</span>
                        <button onclick="handleConstructionImageUpload(${project.id}, ${index})" class="bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded-lg text-xs font-semibold hover:bg-gray-100">Görsel Yükle</button>
                    </div>
                    ${phase.imageUrls && phase.imageUrls.length > 0 ? `
                        <div class="relative w-full">
                            <div class="flex overflow-x-auto snap-x snap-mandatory rounded-lg">
                                ${phase.imageUrls.map(url => `
                                    <img src="${url}" alt="İnşaat Aşaması" class="snap-center shrink-0 w-full h-48 object-cover rounded-lg">
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
            `).join('');
            showModal('constructionPhasesModal');
        }

        function handleMunicipalityDocumentUpload(projectId) {
            const input = document.createElement('input');
            input.type = 'file';
            input.multiple = true;
            input.onchange = e => {
                if (e.target.files.length > 0) {
                    showNotification(`${e.target.files.length} belge başarıyla yüklendi.`, "success");
                    // Here you would typically upload files to a server.
                }
            };
            input.click();
        }

        function handleConstructionImageUpload(projectId, phaseIndex) {
            const project = appData.completedContractorProjectsData.find(p => p.id === projectId);
            if (!project) return;

            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.multiple = true;
            input.onchange = e => {
                if (e.target.files.length > 0) {
                    // Simulate reading and adding URLs
                    Array.from(e.target.files).forEach(file => {
                        project.constructionPhases[phaseIndex].imageUrls.push(URL.createObjectURL(file));
                    });
                    openConstructionPhasesModal(projectId); // Re-render the modal with new images
                    showNotification(`${e.target.files.length} görsel başarıyla yüklendi.`, "success");
                }
            };
            input.click();
        }

        function viewArchitectProject(projectId, projectType) {
            showNotification(`${projectType} projesi görüntülendi.`, 'info');
        }

        function logout() {
            if (confirm('Çıkış yapmak istediğinizden emin misiniz?')) {
                // localStorage'ı temizle
                localStorage.removeItem('admin_logged_in');
                localStorage.removeItem('admin_user_email');
                localStorage.removeItem('admin_user_role');
                localStorage.removeItem('admin_user_name');
                
                showNotification('Oturumunuz sonlandırılıyor...', 'info');
                setTimeout(() => { window.location.href = 'auth.html'; }, 1500);
            }
        }

        // Initialize
        document.addEventListener('DOMContentLoaded', function () {
            initializeDashboard();
            // İlanlarım sekmesi için veriyi hazırla
            renderContractorListings();

            // The onAuthStateChanged listener will handle initial data loading once the user is authenticated.

            window.addEventListener('resize', function () {
                if (window.innerWidth >= 1024) closeMobileMenu();
            });

            document.addEventListener('keydown', function (e) {
                if (e.key === 'Escape') {
                    closeMobileMenu();
                    ['offerDetailModal', 'architectRequestModal', 'reviseOfferConfirmModal', 'architectSelectionConfirmModal', 'paymentOptionsModal', 'creditCardPaymentModal', 'eftHavalePaymentModal', 'lawyerChatModal', 'applicationProjectPaymentModal', 'municipalityProcessModal', 'constructionPhasesModal', 'post-apartment-listing-modal', 'delete-account-modal', 'sms-verification-modal', 'freeze-account-modal', 'unfreeze-account-modal', 'live-support-modal', 'change-password-modal', 'verify-email-modal', 'verify-phone-modal', 'notary-document-upload-modal', 'notary-chat-modal', 'notary-appointment-modal', 'notarized-contract-modal', 'offer-details-modal'].forEach(id => closeModal(id));
                }
            });
        });

        // =================================================================
        // Profile Section
        // =================================================================

        let isProfileEditMode = false;

        const contractorData = {
            profile: {
                name: "Güven İnşaat A.Ş.",
                title: "Kentsel Dönüşüm Müteahhidi",
                rating: 4.8,
                reviews: 42,
                about: "Yılların verdiği tecrübe ile kentsel dönüşüm projelerinde güvenilir ve yenilikçi çözümler sunuyoruz. Müşteri memnuniyeti ve kalite odaklı yaklaşımımızla, hayallerinizdeki yaşam alanlarını inşa ediyoruz.",
                email: "iletisim@guveninsaat.com",
                phone: "+90 555 123 45 67",
                linkedin: "https://www.linkedin.com/company/guven-insaat",
                instagram: "https://www.instagram.com/guven.insaat",
                profilePicture: "https://placehold.co/128x128/5A00A8/FFFFFF?text=Gİ"
            },
            expertise: [
                { name: "Kentsel Dönüşüm", selected: true },
                { name: "Konut Projeleri", selected: true },
                { name: "Ticari Projeler", selected: false },
                { name: "Endüstriyel Yapılar", selected: false },
                { name: "Restorasyon", selected: true }
            ],
            pricing: {
                perFlatFee: 50000,
                perSquareMeterCost: 15000
            },
            security: {
                twoFactorEnabled: false,
                isEmailVerified: true,
                isPhoneVerified: false
            }
        };

        function renderProfileSection() {
            const container = document.getElementById('profile-content');
            if (!container) return;

            const profile = contractorData.profile;
            const expertise = contractorData.expertise;
            const pricing = contractorData.pricing;
            const security = contractorData.security;
            const disabledAttr = !isProfileEditMode ? 'disabled' : '';
            const editButton = document.getElementById('profile-edit-btn');

            if (editButton) {
                if (isProfileEditMode) {
                    editButton.innerHTML = `<i class="fas fa-save mr-2"></i>Profili Kaydet`;
                } else {
                    editButton.innerHTML = `<i class="fas fa-edit mr-2"></i>Profili Düzenle`;
                }
            }

            container.innerHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left Column: Personal Info -->
            <div class="lg:col-span-1 space-y-8">
                <div class="bg-white p-6 rounded-xl shadow-sm border">
                    <div class="text-center">
                        <div class="relative inline-block mb-4">
                            <img id="profile-picture-preview" src="${profile.profilePicture}" alt="Profil Fotoğrafı" class="w-32 h-32 rounded-full mx-auto object-cover border-4 border-purple-200">
                            <label for="profile-picture-input" class="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer hover:bg-primary-dark ${!isProfileEditMode ? 'hidden' : ''}" title="Profil fotoğrafı değiştir">
                                <i class="fas fa-camera"></i>
                                <input type="file" id="profile-picture-input" class="hidden" accept="image/*" onchange="handleProfilePictureChange(event)" ${disabledAttr} aria-label="Profil fotoğrafı yükle">
                            </label>
                        </div>
                        <h2 class="text-2xl font-bold text-gray-800">${profile.name}</h2>
                        <p class="text-primary font-medium">${profile.title}</p>
                        <div class="flex items-center justify-center mt-2 text-yellow-500">
                            ${'<i class="fas fa-star"></i>'.repeat(Math.floor(profile.rating))}
                            ${profile.rating % 1 !== 0 ? '<i class="fas fa-star-half-alt"></i>' : ''}
                            <span class="text-gray-600 ml-2 text-sm">(${profile.rating} / ${profile.reviews} değerlendirme)</span>
                        </div>
                    </div>
                    <div class="mt-6">
                        <label for="profile-about" class="font-semibold text-gray-700 mb-2 block">Hakkında</label>
                        <textarea id="profile-about" class="w-full p-2 border border-gray-200 rounded-lg text-sm text-gray-600 bg-gray-50 disabled:bg-gray-100" rows="4" ${disabledAttr} aria-label="Hakkında">${profile.about}</textarea>
                    </div>
                    <div class="mt-6">
                        <h4 class="font-semibold text-gray-700 mb-3">İletişim</h4>
                        <div class="space-y-3 text-sm">
                            <div class="flex items-center"><i class="fas fa-envelope w-5 mr-2 text-gray-400"></i><input id="profile-email" type="email" class="w-full p-1 border-b disabled:bg-gray-100" value="${profile.email}" ${disabledAttr} aria-label="E-posta"></div>
                            <div class="flex items-center"><i class="fas fa-phone w-5 mr-2 text-gray-400"></i><input id="profile-phone" type="tel" class="w-full p-1 border-b disabled:bg-gray-100" value="${profile.phone}" ${disabledAttr} aria-label="Telefon"></div>
                            <div class="flex items-center"><i class="fab fa-linkedin w-5 mr-2 text-gray-400"></i><input id="profile-linkedin" type="url" class="w-full p-1 border-b disabled:bg-gray-100" value="${profile.linkedin}" ${disabledAttr} aria-label="LinkedIn Profili"></div>
                            <div class="flex items-center"><i class="fab fa-instagram w-5 mr-2 text-gray-400"></i><input id="profile-instagram" type="url" class="w-full p-1 border-b disabled:bg-gray-100" value="${profile.instagram}" ${disabledAttr} aria-label="Instagram Profili"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right Column: Other Details -->
            <div class="lg:col-span-2 space-y-8">
                <div class="bg-white p-6 rounded-xl shadow-sm border">
                    <h3 class="text-xl font-bold text-gray-800 mb-4">Uzmanlık Alanları</h3>
                    <p class="text-gray-600 text-sm mb-4">Bu alanlar üzerinde uzmanlaşmış deneyim ve bilgi birikimine sahibim.</p>
                    <div id="expertise-tags" class="flex flex-wrap gap-2">
                        ${expertise.map((e, index) => `<button onclick="toggleExpertise(${index})" class="expertise-tag ${e.selected ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'} px-3 py-1 rounded-full text-sm font-medium hover:bg-primary-light hover:text-white transition-colors disabled:opacity-70 disabled:cursor-not-allowed" ${disabledAttr}>${e.name}</button>`).join('')}
                    </div>
                </div>

                <div class="bg-white p-6 rounded-xl shadow-sm border">
                    <h3 class="text-xl font-bold text-gray-800 mb-4">Fiyatlandırma Bilgileri</h3>
                    <p class="text-gray-600 text-sm mb-4">Belirlediğiniz fiyatlar, müteahhitlerin taslak tasarım taleplerinde ve uygulama projeleri anlaşmalarında dikkate alınacaktır.</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label for="price-per-flat" class="block text-sm font-medium text-gray-700">Daire Başı Proje Ücreti (₺)</label>
                            <input type="number" id="price-per-flat" class="mt-1 w-full p-2 border border-gray-300 rounded-lg disabled:bg-gray-100" value="${pricing.perFlatFee}" ${disabledAttr}>
                        </div>
                        <div>
                            <label for="price-per-sqm" class="block text-sm font-medium text-gray-700">Metrekare Başı İnşaat Maliyeti (₺)</label>
                            <input type="number" id="price-per-sqm" class="mt-1 w-full p-2 border border-gray-300 rounded-lg disabled:bg-gray-100" value="${pricing.perSquareMeterCost}" ${disabledAttr}>
                        </div>
                    </div>
                    <div class="mt-4 text-right">
                        <button onclick="updatePricing()" class="bg-accent text-white px-4 py-2 rounded-lg hover:opacity-90 disabled:bg-gray-300" ${disabledAttr}>Fiyatları Güncelle</button>
                    </div>
                </div>
                
                <div class="bg-white p-6 rounded-xl shadow-sm border">
                    <h3 class="text-xl font-bold text-gray-800 mb-4">Güvenlik ve Hesap Ayarları</h3>
                    <div class="space-y-4">
                        <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span class="font-medium text-gray-700">Şifre Yönetimi</span>
                            <button onclick="changePassword()" class="text-sm font-semibold text-primary hover:underline">Şifre Değiştir</button>
                        </div>
                        <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <div>
                                <span class="font-medium text-gray-700">İki Faktörlü Kimlik Doğrulama</span>
                                <p class="text-xs text-gray-500">Hesap güvenliğinizi artırmak için 2FA'yı etkinleştirin.</p>
                            </div>
                            <button id="2fa-toggle" onclick="toggleTwoFactor(this)" aria-label="İki faktörlü kimlik doğrulamayı aç/kapat" class="relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${security.twoFactorEnabled ? 'bg-primary' : 'bg-gray-300'}">
                                <span class="inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${security.twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'}"></span>
                            </button>
                        </div>
                        <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <div>
                                <span class="font-medium text-gray-700">E-posta Doğrulama</span>
                                <p class="text-xs text-gray-500">${profile.email}</p>
                            </div>
                            <button onclick="verifyEmail()" class="${security.isEmailVerified ? 'text-green-600 cursor-not-allowed' : 'text-sm font-semibold text-primary hover:underline'}">
                                ${security.isEmailVerified ? '<i class="fas fa-check-circle mr-1"></i> Doğrulanmış' : 'Doğrula'}
                            </button>
                        </div>
                        <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <div>
                                <span class="font-medium text-gray-700">Telefon Doğrulama</span>
                                <p class="text-xs text-gray-500">${profile.phone}</p>
                            </div>
                            <button onclick="verifyPhone()" class="${security.isPhoneVerified ? 'text-green-600 cursor-not-allowed' : 'text-sm font-semibold text-primary hover:underline'}">
                                ${security.isPhoneVerified ? '<i class="fas fa-check-circle mr-1"></i> Doğrulanmış' : 'Doğrula'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Müteahhit Doğrulama Kartı -->
        <div id="contractor-verification-section" class="bg-white rounded-xl shadow-sm border p-6 mt-8">
            <h3 class="text-xl font-bold text-gray-800 mb-4">Müteahhit Doğrulama</h3>
            
            <!-- Doğrulama Durumu -->
            <div id="verification-status-display" class="mb-6 p-4 rounded-lg">
                <!-- Status will be updated by JS -->
            </div>
            <div id="rejection-reason-display" class="mb-6 p-4 bg-red-50 text-red-700 rounded-lg hidden">
                <!-- Rejection reason will be shown here -->
            </div>

            <!-- Belge Yükleme Alanları -->
            <div class="space-y-6">
                <!-- Vergi Levhası -->
                <div class="document-upload-container">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Vergi Levhası</label>
                    <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg relative">
                        <div class="space-y-1 text-center">
                            <i class="fas fa-file-upload text-gray-400 text-3xl mb-3"></i>
                            <div class="flex text-sm text-gray-600">
                                <label for="tax-plate-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none">
                                    <span>Dosya Yükle</span>
                                    <input id="tax-plate-upload" type="file" class="sr-only" onchange="handleDocumentUpload(event, 'taxPlate')" accept=".pdf,.png,.jpg,.jpeg">
                                </label>
                                <p class="pl-1">veya sürükle bırak</p>
                            </div>
                            <p class="text-xs text-gray-500">PDF, PNG veya JPG</p>
                        </div>
                        <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg hidden">
                            <div class="text-white"><i class="fas fa-check-circle mr-2"></i>Yüklendi</div>
                        </div>
                    </div>
                    <span class="file-name text-sm text-gray-500 mt-2 block"></span>
                    <div class="upload-status text-sm mt-1"></div>
                </div>

                <!-- Ticaret Sicil Gazetesi -->
                <div class="document-upload-container">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Ticaret Sicil Gazetesi</label>
                    <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg relative">
                        <div class="space-y-1 text-center">
                            <i class="fas fa-file-upload text-gray-400 text-3xl mb-3"></i>
                            <div class="flex text-sm text-gray-600">
                                <label for="trade-register-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none">
                                    <span>Dosya Yükle</span>
                                    <input id="trade-register-upload" type="file" class="sr-only" onchange="handleDocumentUpload(event, 'tradeRegister')" accept=".pdf,.png,.jpg,.jpeg">
                                </label>
                                <p class="pl-1">veya sürükle bırak</p>
                            </div>
                            <p class="text-xs text-gray-500">PDF, PNG veya JPG</p>
                        </div>
                        <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg hidden">
                            <div class="text-white"><i class="fas fa-check-circle mr-2"></i>Yüklendi</div>
                        </div>
                    </div>
                    <span class="file-name text-sm text-gray-500 mt-2 block"></span>
                    <div class="upload-status text-sm mt-1"></div>
                </div>

                <!-- Oda Kayıt Belgesi -->
                <div class="document-upload-container">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Oda Kayıt Belgesi</label>
                    <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg relative">
                        <div class="space-y-1 text-center">
                            <i class="fas fa-file-upload text-gray-400 text-3xl mb-3"></i>
                            <div class="flex text-sm text-gray-600">
                                <label for="chamber-registration-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none">
                                    <span>Dosya Yükle</span>
                                    <input id="chamber-registration-upload" type="file" class="sr-only" onchange="handleDocumentUpload(event, 'chamberRegistration')" accept=".pdf,.png,.jpg,.jpeg">
                                </label>
                                <p class="pl-1">veya sürükle bırak</p>
                            </div>
                            <p class="text-xs text-gray-500">PDF, PNG veya JPG</p>
                        </div>
                        <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg hidden">
                            <div class="text-white"><i class="fas fa-check-circle mr-2"></i>Yüklendi</div>
                        </div>
                    </div>
                    <span class="file-name text-sm text-gray-500 mt-2 block"></span>
                    <div class="upload-status text-sm mt-1"></div>
                </div>

                <!-- Nüfus Cüzdanı Fotokopisi -->
                <div class="document-upload-container">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Nüfus Cüzdanı Fotokopisi</label>
                    <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg relative">
                        <div class="space-y-1 text-center">
                            <i class="fas fa-file-upload text-gray-400 text-3xl mb-3"></i>
                            <div class="flex text-sm text-gray-600">
                                <label for="id-copy-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none">
                                    <span>Dosya Yükle</span>
                                    <input id="id-copy-upload" type="file" class="sr-only" onchange="handleDocumentUpload(event, 'idCopy')" accept=".pdf,.png,.jpg,.jpeg">
                                </label>
                                <p class="pl-1">veya sürükle bırak</p>
                            </div>
                            <p class="text-xs text-gray-500">PDF, PNG veya JPG</p>
                        </div>
                        <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg hidden">
                            <div class="text-white"><i class="fas fa-check-circle mr-2"></i>Yüklendi</div>
                        </div>
                    </div>
                    <span class="file-name text-sm text-gray-500 mt-2 block"></span>
                    <div class="upload-status text-sm mt-1"></div>
                </div>

                <!-- İmza Sirküleri -->
                <div class="document-upload-container">
                    <label class="block text-sm font-medium text-gray-700 mb-2">İmza Sirküleri</label>
                    <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg relative">
                        <div class="space-y-1 text-center">
                            <i class="fas fa-file-upload text-gray-400 text-3xl mb-3"></i>
                            <div class="flex text-sm text-gray-600">
                                <label for="signature-circular-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none">
                                    <span>Dosya Yükle</span>
                                    <input id="signature-circular-upload" type="file" class="sr-only" onchange="handleDocumentUpload(event, 'signatureCircular')" accept=".pdf,.png,.jpg,.jpeg">
                                </label>
                                <p class="pl-1">veya sürükle bırak</p>
                            </div>
                            <p class="text-xs text-gray-500">PDF, PNG veya JPG</p>
                        </div>
                        <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg hidden">
                            <div class="text-white"><i class="fas fa-check-circle mr-2"></i>Yüklendi</div>
                        </div>
                    </div>
                    <span class="file-name text-sm text-gray-500 mt-2 block"></span>
                    <div class="upload-status text-sm mt-1"></div>
                </div>
            </div>

            <!-- Gizli Input -->
            <input type="hidden" id="current-contractor-id">

            <!-- Doğrulama Talebi Gönder Butonu -->
            <div class="mt-8 flex justify-end">
                <button id="submit-verification-request-btn" onclick="submitVerificationRequest()" 
                        class="bg-primary text-white px-6 py-3 rounded-lg opacity-50 cursor-not-allowed" 
                        disabled>
                    <i class="fas fa-paper-plane mr-2"></i>
                    Doğrulama Talebi Gönder
                </button>
            </div>
        </div>
    `;

            // Müteahhit doğrulama durumunu kontrol et
            if (contractorUserId) {
                firebase.firestore()
                    .collection('artifacts')
                    .doc(__app_id)
                    .collection('users')
                    .doc(contractorUserId)
                    .get()
                    .then(doc => {
                        if (doc.exists) {
                            const data = doc.data();
                            updateVerificationStatusUI(
                                data.verificationStatus || 'not_submitted',
                                data.rejectionReason
                            );
                        }
                    })
                    .catch(error => {
                        console.error('Profil bilgileri yüklenirken hata:', error);
                        showNotification('Profil bilgileri yüklenirken bir hata oluştu.', 'error');
                    });
            }
        }

        function toggleProfileEditMode() {
            isProfileEditMode = !isProfileEditMode;

            if (!isProfileEditMode) { // Kaydetme modundan çıkıldı
                saveProfileInfo();
            }

            renderProfileSection();
        }

        function saveProfileInfo() {
            contractorData.profile.about = document.getElementById('profile-about').value;
            contractorData.profile.email = document.getElementById('profile-email').value;
            contractorData.profile.phone = document.getElementById('profile-phone').value;
            contractorData.profile.linkedin = document.getElementById('profile-linkedin').value;
            contractorData.profile.instagram = document.getElementById('profile-instagram').value;
            updatePricing();
            showNotification('Profil bilgileri başarıyla güncellendi!', 'success');
        }

        function handleProfilePictureChange(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const preview = document.getElementById('profile-picture-preview');
                    preview.src = e.target.result;
                    contractorData.profile.profilePicture = e.target.result;
                    showNotification('Profil fotoğrafı güncellendi. Kaydetmeyi unutmayın.', 'info');
                }
                reader.readAsDataURL(file);
            }
        }

        function toggleExpertise(index) {
            if (isProfileEditMode) {
                contractorData.expertise[index].selected = !contractorData.expertise[index].selected;
                renderProfileSection();
            }
        }

        function updatePricing() {
            contractorData.pricing.perFlatFee = document.getElementById('price-per-flat').value;
            contractorData.pricing.perSquareMeterCost = document.getElementById('price-per-sqm').value;
            if (!isProfileEditMode) { // Only show notification if it's a separate action
                showNotification('Fiyatlandırma bilgileri güncellendi!', 'success');
            }
        }

        function toggleTwoFactor(button) {
            contractorData.security.twoFactorEnabled = !contractorData.security.twoFactorEnabled;
            const docRef = db.collection('artifacts').doc(__app_id).collection('users').doc(userId);
            docRef.set({ profile: { twoFactorEnabled: contractorData.security.twoFactorEnabled } }, { merge: true })
                .then(() => {
                    showNotification(`İki faktörlü kimlik doğrulama ${contractorData.security.twoFactorEnabled ? 'etkinleştirildi' : 'devre dışı bırakıldı'}.`, 'info');
                    renderProfileSection(); // Re-render to update UI
                })
                .catch(err => {
                    showNotification('Ayarlar güncellenirken bir hata oluştu.', 'error');
                    console.error(err);
                    // Revert state on error
                    contractorData.security.twoFactorEnabled = !contractorData.security.twoFactorEnabled;
                });
        }

        /**
         * "Şifre Değiştir" modal'ını açar.
         */
        function changePassword() {
            // Modal'ı temizle
            document.getElementById('current-password').value = '';
            document.getElementById('new-password').value = '';
            document.getElementById('confirm-new-password').value = '';
            document.getElementById('password-error-msg').classList.add('hidden');
            document.getElementById('password-error-msg').textContent = '';

            showModal('change-password-modal');
        }

        /**
         * Şifre değiştirme formunu gönderir ve Firebase Auth ile doğrular/günceller.
         */
        function submitPasswordChange() {
            const currentPassword = document.getElementById('current-password').value;
            const newPassword = document.getElementById('new-password').value;
            const confirmNewPassword = document.getElementById('confirm-new-password').value;
            const errorMsg = document.getElementById('password-error-msg');

            if (!currentPassword || !newPassword || !confirmNewPassword) {
                errorMsg.textContent = 'Lütfen tüm alanları doldurun.';
                errorMsg.classList.remove('hidden');
                return;
            }

            if (newPassword !== confirmNewPassword) {
                errorMsg.textContent = 'Yeni şifreler eşleşmiyor.';
                errorMsg.classList.remove('hidden');
                return;
            }

            if (!currentUser) {
                showNotification('Bu işlem için oturum açmış olmalısınız.', 'error');
                return;
            }

            // Create a credential with the user's email and the current password.
            const credential = firebase.auth.EmailAuthProvider.credential(currentUser.email, currentPassword);

            // Re-authenticate the user to ensure they are the rightful owner.
            currentUser.reauthenticateWithCredential(credential).then(() => {
                // User re-authenticated. Now they can update the password.
                return currentUser.updatePassword(newPassword);
            }).then(() => {
                // Password updated successfully.
                errorMsg.classList.add('hidden');
                closeModal('change-password-modal');
                showNotification('Şifreniz başarıyla güncellendi!', 'success');
            }).catch((error) => {
                console.error("Password change error:", error);
                if (error.code === 'auth/wrong-password') {
                    errorMsg.textContent = 'Mevcut şifreniz hatalı.';
                } else if (error.code === 'auth/weak-password') {
                    errorMsg.textContent = 'Yeni şifre en az 6 karakter olmalıdır.';
                } else {
                    errorMsg.textContent = 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.';
                }
                errorMsg.classList.remove('hidden');
            });
        }

        /**
         * E-posta doğrulama modal'ını açar.
         */
        function verifyEmail() {
            if (contractorData.security.isEmailVerified) return;
            showModal('verify-email-modal');
        }

        /**
         * Telefon doğrulama modal'ını açar.
         */
        function verifyPhone() {
            if (contractorData.security.isPhoneVerified) return;

            // Modal'ı başlangıç durumuna getir
            document.getElementById('phone-send-code-view').classList.remove('hidden');
            document.getElementById('phone-verify-code-view').classList.add('hidden');
            document.getElementById('phone-code-input').value = '';
            document.getElementById('phone-verify-error-msg').classList.add('hidden');

            // Ensure reCAPTCHA is ready
            setupRecaptcha();
            showModal('verify-phone-modal');
        }

        let recaptchaVerifier = null;
        /**
         * Sets up the invisible reCAPTCHA verifier required for phone authentication.
         */
        function setupRecaptcha() {
            // Avoid re-creating the verifier.
            if (window.recaptchaVerifier) return;

            window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
                'size': 'invisible',
                'callback': (response) => {
                    // reCAPTCHA solved, this callback is used for pop-up recaptcha.
                    // For invisible, this is not the main flow.
                    console.log("reCAPTCHA solved");
                }
            });
        }

        /**
         * E-posta veya telefon için doğrulama işlemini başlatır.
         * @param {'email' | 'phone'} type - Doğrulama türü.
         */
        function sendVerificationCode(type) {
            if (type === 'email') {
                if (!currentUser) return;
                currentUser.sendEmailVerification()
                    .then(() => {
                        closeModal('verify-email-modal');
                        showNotification('Doğrulama e-postası gönderildi. Lütfen gelen kutunuzu kontrol edip e-postayı onayladıktan sonra sayfayı yenileyin.', 'info');
                    })
                    .catch(error => {
                        console.error("Email verification send error:", error);
                        showNotification('Doğrulama e-postası gönderilemedi: ' + error.message, 'error');
                    });

            } else if (type === 'phone') {
                if (!currentUser || !contractorData.profile.phone) {
                    showNotification('Doğrulama için bir telefon numarası bulunamadı. Lütfen profilinizden ekleyin.', 'error');
                    return;
                }

                const phoneNumber = contractorData.profile.phone;
                const appVerifier = window.recaptchaVerifier;

                auth.signInWithPhoneNumber(phoneNumber, appVerifier)
                    .then((confirmationResult) => {
                        // SMS sent. Save confirmation result to resolve later.
                        window.confirmationResult = confirmationResult;

                        // Switch view in modal to show code input
                        document.getElementById('phone-send-code-view').classList.add('hidden');
                        document.getElementById('phone-verify-code-view').classList.remove('hidden');

                        showNotification(`Doğrulama kodu ${phoneNumber} numarasına gönderildi.`, 'info');
                    }).catch((error) => {
                        console.error("SMS send error:", error);
                        showNotification('SMS gönderilemedi. Lütfen sayfayı yenileyip tekrar deneyin. Hata: ' + error.message, 'error');
                        // Reset reCAPTCHA in case of error
                        if (window.recaptchaVerifier) {
                            window.recaptchaVerifier.render().then(widgetId => {
                                grecaptcha.reset(widgetId);
                            });
                        }
                    });
            }
        }

        /**
         * Girilen doğrulama kodunu kontrol eder (sadece telefon için).
         * @param {'email' | 'phone'} type - Doğrulama türü.
         */
        function submitVerificationCode(type) {
            // This function is now only for phone verification.
            if (type !== 'phone') return;

            const code = document.getElementById('phone-code-input').value;
            const errorMsg = document.getElementById('phone-verify-error-msg');

            if (!window.confirmationResult) {
                errorMsg.textContent = 'Doğrulama oturumu bulunamadı. Lütfen tekrar deneyin.';
                errorMsg.classList.remove('hidden');
                return;
            }

            // Confirm the code
            window.confirmationResult.confirm(code).then((result) => {
                const user = result.user;
                console.log("Phone number verified for user:", user);

                // Update phone verification status in Firestore
                const docRef = db.collection('artifacts').doc(__app_id).collection('users').doc(userId);
                return docRef.set({
                    profile: {
                        isPhoneVerified: true,
                        phone: user.phoneNumber // Also save the standardized phone number from auth
                    }
                }, { merge: true });

            }).then(() => {
                closeModal('verify-phone-modal');
                showNotification('Telefon numaranız başarıyla doğrulandı!', 'success');
                // The onSnapshot listener will automatically update the UI.
            }).catch((error) => {
                console.error("Phone verification code error:", error);
                errorMsg.textContent = 'Hatalı doğrulama kodu veya bir hata oluştu.';
                if (error.code === 'auth/invalid-verification-code') {
                    errorMsg.textContent = 'Hatalı doğrulama kodu. Lütfen tekrar deneyin.';
                }
                errorMsg.classList.remove('hidden');
            });
        }

        function initializeApartmentManagement() {
            renderApartmentManagement();
        }

        // Apartment Management Functions
        function renderApartmentManagement() {
            const container = document.getElementById('apartment-management-projects-list');
            if (!container) return;

            container.innerHTML = appData.contractorProjects.map(project => {
                const canPostForSale = project.completionPercentage >= 80;

                return `
                    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between">
                        <div>
                            <h3 class="font-bold text-gray-800">${project.name}</h3>
                            <p class="text-sm text-gray-600 my-3">İnşaat Durumu: <span class="font-semibold text-primary">%${project.completionPercentage}</span></p>
                            <div class="w-full bg-gray-200 rounded-full h-2 mb-4">
                                <div class="bg-primary h-2 rounded-full" style="width: ${project.completionPercentage}%"></div>
                            </div>
                        </div>
                        <div class="space-y-2 mt-4">
                            ${canPostForSale ? `
                                <button onclick="openPostApartmentListingModal('${project.id}')" class="w-full bg-accent text-white px-4 py-2 rounded-lg hover:opacity-90 text-sm">Daireleri Satışa Çıkar</button>
                                <a href="#" onclick="redirectToSahibinden('${project.id}'); return false;" class="block text-center w-full text-sm text-primary hover:underline mt-2">Dairelerini Sahibinden.com'da Paylaş</a>
                            ` : `
                                <button class="w-full bg-gray-300 text-gray-500 px-4 py-2 rounded-lg cursor-not-allowed text-sm" disabled>Daireleri Satışa Çıkar (%80 Gerekli)</button>
                            `}
                        </div>
                    </div>
                `;
            }).join('');
        }

        function openPostApartmentListingModal(projectId) {
            const modal = document.getElementById('post-apartment-listing-modal');
            modal.dataset.projectId = projectId;
            showModal('post-apartment-listing-modal');
        }

        function postApartmentListing() {
            const modal = document.getElementById('post-apartment-listing-modal');
            const projectId = modal.dataset.projectId;
            const project = appData.contractorProjects.find(p => p.id === projectId);

            if (project) {
                const newListing = {
                    number: document.getElementById('apartment-listing-number').value,
                    rooms: document.getElementById('apartment-listing-rooms').value,
                    area: document.getElementById('apartment-listing-area').value,
                    price: document.getElementById('apartment-listing-price').value,
                    description: document.getElementById('apartment-listing-description').value,
                };
                project.apartmentListings.push(newListing);

                showNotification('Daire satış ilanınız başarıyla yayınlandı.', 'success');
                closeModal('post-apartment-listing-modal');
                // Clear form for next time
                modal.querySelectorAll('input').forEach(input => input.value = '');
                modal.querySelector('textarea').value = '';
            } else {
                showNotification('İlan verilecek proje bulunamadı.', 'error');
            }
        }

        // Apartment listing preview and publish functions
        function previewApartmentListing() {
            // Form validation
            const number = document.getElementById('apartment-listing-number').value.trim();
            const rooms = document.getElementById('apartment-listing-rooms').value.trim();
            const area = document.getElementById('apartment-listing-area').value.trim();
            const price = document.getElementById('apartment-listing-price').value.trim();
            const description = document.getElementById('apartment-listing-description').value.trim();

            if (!number || !rooms || !area || !price || !description) {
                showNotification('Lütfen tüm alanları doldurun.', 'error');
                return;
            }

            // Get project info
            const modal = document.getElementById('post-apartment-listing-modal');
            const projectId = modal.dataset.projectId;
            const project = appData.contractorProjects.find(p => p.id === projectId);

            if (!project) {
                showNotification('Proje bilgileri bulunamadı.', 'error');
                return;
            }

            // Populate preview modal
            document.getElementById('preview-apartment-title').textContent = `${rooms} - ${project.name}`;
            document.getElementById('preview-apartment-location').textContent = project.location || 'Konum bilgisi yok';
            document.getElementById('preview-apartment-rooms').textContent = rooms;
            document.getElementById('preview-apartment-area').textContent = `${area} m²`;
            document.getElementById('preview-apartment-price').textContent = `${parseInt(price).toLocaleString()} ₺`;
            document.getElementById('preview-apartment-description').textContent = description;
            document.getElementById('preview-rooms-detail').textContent = rooms;
            document.getElementById('preview-area-detail').textContent = `${area} m²`;
            document.getElementById('preview-apartment-number').textContent = number;
            
            // Calculate price per sqm
            const pricePerSqm = Math.round(parseInt(price) / parseInt(area));
            document.getElementById('preview-price-per-sqm').textContent = `${pricePerSqm.toLocaleString()} ₺`;

            // Show preview modal
            showModal('apartment-listing-preview-modal');
        }

        function editApartmentListing() {
            // Close preview modal and return to edit form
            closeModal('apartment-listing-preview-modal');
        }

        function publishApartmentListing() {
            // Get form data again (in case user came back from preview)
            const modal = document.getElementById('post-apartment-listing-modal');
            const projectId = modal.dataset.projectId;
            const project = appData.contractorProjects.find(p => p.id === projectId);

            if (project) {
                const newListing = {
                    id: Date.now().toString(), // Simple ID generation
                    number: document.getElementById('apartment-listing-number').value,
                    rooms: document.getElementById('apartment-listing-rooms').value,
                    area: document.getElementById('apartment-listing-area').value,
                    price: document.getElementById('apartment-listing-price').value,
                    description: document.getElementById('apartment-listing-description').value,
                    publishDate: new Date().toLocaleDateString('tr-TR'),
                    status: 'active'
                };

                // Initialize apartmentListings array if it doesn't exist
                if (!project.apartmentListings) {
                    project.apartmentListings = [];
                }
                
                project.apartmentListings.push(newListing);

                showNotification('Daire satış ilanınız başarıyla yayınlandı!', 'success');
                closeModal('apartment-listing-preview-modal');
                closeModal('post-apartment-listing-modal');
                
                // Clear form for next time
                modal.querySelectorAll('input').forEach(input => input.value = '');
                modal.querySelector('textarea').value = '';
            } else {
                showNotification('İlan verilecek proje bulunamadı.', 'error');
            }
        }

        function redirectToSahibinden(projectId) {
            showNotification("Sahibinden.com'a yönlendiriliyorsunuz. DönüşümAY ortaklığı sayesinde ilanınız ücretsiz yayınlanacaktır.", 'info');
            setTimeout(() => {
                window.open('https://www.sahibinden.com', '_blank');
            }, 2000);
        }

        // Projelerim Functions
        function initializeProjects() {
            renderOngoingContractorProjects();
            renderCompletedContractorProjects();
            switchProjectTab('ongoing');
        }

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                closeMobileMenu();
                ['viewOfferModal', 'reviseOfferModal', 'architectRequestModal', 'reviseOfferConfirmModal', 'architectSelectionConfirmModal', 'paymentOptionsModal', 'creditCardPaymentModal', 'eftHavalePaymentModal', 'lawyerChatModal', 'applicationProjectPaymentModal', 'municipalityProcessModal', 'constructionPhasesModal', 'contractDetailsModal', 'viewProjectFilesModal', 'post-craftsman-ad-modal', 'post-apartment-listing-modal', 'delete-account-modal', 'sms-verification-modal', 'freeze-account-modal', 'unfreeze-account-modal', 'live-support-modal', 'change-password-modal', 'verify-email-modal', 'verify-phone-modal', 'notary-document-upload-modal', 'notary-chat-modal', 'notary-appointment-modal', 'notarized-contract-modal'].forEach(id => closeModal(id));
            }
        });

        // Support Section Functions
        function renderSupportSection() {
            renderFaqs();
            renderSupportAccountManagement();
        }

        /**
         * Renders the account management section on the support page dynamically.
         * The password section is intentionally omitted as per requirements.
         */
        function renderSupportAccountManagement() {
            const container = document.getElementById('support-account-management');
            if (!container) return;

            const security = contractorData.security;
            const profile = contractorData.profile;

            container.innerHTML = `
                <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                        <span class="font-medium text-gray-700">İki Faktörlü Kimlik Doğrulama</span>
                        <p class="text-xs text-gray-500">Hesap güvenliğinizi artırmak için 2FA'yı etkinleştirin.</p>
                    </div>
                    <button id="2fa-toggle" onclick="toggleTwoFactor(this)" aria-label="İki faktörlü kimlik doğrulamayı aç/kapat" class="relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${security.twoFactorEnabled ? 'bg-primary' : 'bg-gray-300'}">
                        <span class="inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${security.twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'}"></span>
                    </button>
                </div>
                <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                        <span class="font-medium text-gray-700">E-posta Doğrulama</span>
                        <p class="text-xs text-gray-500">${profile.email || 'N/A'}</p>
                    </div>
                    <button onclick="verifyEmail()" class="${security.isEmailVerified ? 'text-green-600 cursor-not-allowed' : 'text-sm font-semibold text-primary hover:underline'}" ${security.isEmailVerified ? 'disabled' : ''}>
                        ${security.isEmailVerified ? '<i class="fas fa-check-circle mr-1"></i> Doğrulanmış' : 'Doğrula'}
                    </button>
                </div>
                <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                        <span class="font-medium text-gray-700">Telefon Doğrulama</span>
                        <p class="text-xs text-gray-500">${profile.phone || 'N/A'}</p>
                    </div>
                    <button onclick="verifyPhone()" class="${security.isPhoneVerified ? 'text-green-600 cursor-not-allowed' : 'text-sm font-semibold text-primary hover:underline'}" ${security.isPhoneVerified ? 'disabled' : ''}>
                        ${security.isPhoneVerified ? '<i class="fas fa-check-circle mr-1"></i> Doğrulanmış' : 'Doğrula'}
                    </button>
                </div>
                 <div class="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span class="font-medium text-red-700">Hesabı Sil</span>
                    <button onclick="openDeleteAccountModal()" class="text-sm font-semibold text-red-600 hover:underline">Hesabı Kalıcı Olarak Sil</button>
                </div>
                 <div class="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <span class="font-medium text-yellow-700">Hesabı Dondur</span>
                    <button onclick="toggleAccountFreeze()" class="text-sm font-semibold text-yellow-800 hover:underline">Hesabı Dondur/Aktif Et</button>
                </div>
            `;
        }

        function renderFaqs() {
            const container = document.getElementById('faq-container');
            if (!container) return;
            container.innerHTML = appData.faqData.map((faq, index) => `
                <div class="border-b border-gray-200 py-2">
                    <button onclick="toggleFaq(this)" class="w-full flex justify-between items-center text-left text-gray-800 font-semibold focus:outline-none">
                        <span>${faq.question}</span>
                        <i class="fas fa-chevron-down transform transition-transform duration-200"></i>
                    </button>
                    <div class="faq-answer hidden mt-2 pt-2 text-gray-600">
                        <p>${faq.answer}</p>
                    </div>
                </div>
            `).join('');
        }

        function toggleFaq(buttonElement) {
            const answer = buttonElement.nextElementSibling;
            const icon = buttonElement.querySelector('i');
            const isHidden = answer.classList.contains('hidden');

            if (isHidden) {
                answer.classList.remove('hidden');
                icon.classList.add('rotate-180');
            } else {
                answer.classList.add('hidden');
                icon.classList.remove('rotate-180');
            }
        }

        function openLiveSupportModal() {
            if (!selectedSupportTopic) {
                showNotification('Lütfen bir destek konusu seçin.', 'warning');
                return;
            }

            if (appData.liveSupportChatHistory.length === 0) {
                appData.liveSupportChatHistory.push({
                    sender: 'support',
                    text: `Merhaba, DönüşümAY canlı desteğe hoş geldiniz! "${selectedSupportTopic}" konusunda size nasıl yardımcı olabilirim?`,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                });
            }
            renderLiveSupportMessages();
            showModal('live-support-modal');
        }

        function sendLiveSupportMessage() {
            const input = document.getElementById('live-support-chat-input');
            const message = input.value.trim();

            if (!message) return;

            // Add user message
            appData.liveSupportChatHistory.push({
                sender: 'user',
                text: message,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            });

            // Clear input
            input.value = '';

            // Render messages
            renderLiveSupportMessages();

            // Simulate support response
            setTimeout(() => {
                appData.liveSupportChatHistory.push({
                    sender: 'support',
                    text: getSimulatedResponse(selectedSupportTopic),
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                });
                renderLiveSupportMessages();
            }, 1000);
        }

        function getSimulatedResponse(topic) {
            const responses = {
                'payment': 'Ödeme işlemleriyle ilgili size yardımcı olabilirim. Hangi konuda detaylı bilgi almak istersiniz?',
                'project': 'Proje ve teklifler konusunda size destek olabilirim. Spesifik bir projeyle ilgili mi yardım istiyorsunuz?',
                'documents': 'Belge ve dökümanlar konusunda yardımcı olabilirim. Hangi belgeyle ilgili bilgi almak istersiniz?',
                'account': 'Hesap işlemleri konusunda size yardımcı olabilirim. Hesabınızla ilgili nasıl bir desteğe ihtiyacınız var?',
                'other': 'Size nasıl yardımcı olabilirim? Lütfen sorununuzu detaylı bir şekilde anlatın.'
            };
            return responses[topic] || 'Size nasıl yardımcı olabilirim?';
        }

        function renderLiveSupportMessages() {
            const container = document.getElementById('live-support-messages');
            container.innerHTML = appData.liveSupportChatHistory.map(msg => {
                const isUser = msg.sender === 'user';
                return `
                    <div class="flex ${isUser ? 'justify-end' : 'justify-start'}">
                        <div class="max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${isUser ? 'bg-primary text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}">
                            <p class="text-sm">${msg.text}</p>
                            <div class="text-right text-xs ${isUser ? 'text-purple-200' : 'text-gray-500'} mt-1">${msg.time}</div>
                        </div>
                    </div>
                `;
            }).join('');
            container.scrollTop = container.scrollHeight;
        }

        function openDeleteAccountModal() {
            showModal('delete-account-modal');
        }

        function confirmDeleteAccount() {
            closeModal('delete-account-modal');
            simulatedSmsCode = Math.floor(100000 + Math.random() * 900000).toString();
            console.log('Simulated SMS Code:', simulatedSmsCode); // For testing
            showNotification(`Telefonunuza SMS kodu gönderildi: ${simulatedSmsCode}`, 'info');
            document.getElementById('sms-code-input').value = '';
            showModal('sms-verification-modal');
        }

        function verifySmsCode() {
            const inputCode = document.getElementById('sms-code-input').value;
            if (inputCode === simulatedSmsCode) {
                closeModal('sms-verification-modal');
                showNotification('Hesabınız başarıyla silindi. Çıkış yapılıyor...', 'success');
                setTimeout(() => {
                    // In a real app, you'd redirect. Here we'll just simulate it.
                    document.body.innerHTML = '<div class="min-h-screen flex items-center justify-center bg-gray-100"><h1 class="text-2xl font-bold text-gray-800">Oturumunuz kapatıldı.</h1></div>';
                }, 2000);
            } else {
                showNotification('Hatalı kod. Lütfen tekrar deneyin.', 'error');
            }
        }

        function toggleAccountFreeze() {
            if (isAccountFrozen) {
                openUnfreezeAccountModal();
            } else {
                openFreezeAccountModal();
            }
        }

        function openFreezeAccountModal() {
            showModal('freeze-account-modal');
        }

        function confirmFreezeAccount() {
            closeModal('freeze-account-modal');
            isAccountFrozen = true;
            showNotification('Hesabınız başarıyla donduruldu. İstediğiniz zaman aktif edebilirsiniz.', 'success');
            renderSupportSection();
        }

        function openUnfreezeAccountModal() {
            showModal('unfreeze-account-modal');
        }

        function confirmUnfreezeAccount() {
            closeModal('unfreeze-account-modal');
            isAccountFrozen = false;
            showNotification('Hesabınız başarıyla aktif edildi.', 'success');
            renderSupportSection();
        }

        // =================================================================
        // HUKUKI SÜREÇLER (LEGAL PROCESSES)
        // =================================================================

        // Sözleşme türüne göre gerekli belgeleri döndüren fonksiyon
        function getRequiredDocumentsByContractType(contractType) {
            const documentRequirements = {
                'Arsa Payı Karşılığı İnşaat Sözleşmesi': [
                    {
                        id: 'contract-draft',
                        name: 'Sözleşme Taslağı',
                        description: 'Arsa payı karşılığı inşaat sözleşmesi taslağı',
                        accept: '.pdf,.doc,.docx',
                        required: true
                    },
                    {
                        id: 'property-deed',
                        name: 'Tapu Senedi Fotokopisi',
                        description: 'Arsa tapu senedi fotokopisi',
                        accept: '.pdf,.jpg,.jpeg,.png',
                        required: true
                    },
                    {
                        id: 'id-copies',
                        name: 'Kimlik Fotokopileri',
                        description: 'Tarafların nüfus cüzdanı fotokopileri',
                        accept: '.pdf,.jpg,.jpeg,.png',
                        required: true,
                        multiple: true
                    },
                    {
                        id: 'company-docs',
                        name: 'Şirket Belgeleri',
                        description: 'Vergi levhası, imza sirküleri, yetki belgesi',
                        accept: '.pdf,.jpg,.jpeg,.png',
                        required: true,
                        multiple: true
                    },
                    {
                        id: 'share-certificate',
                        name: 'Arsa Payı Belgesi',
                        description: 'Arsa payı oranını gösteren belgeler',
                        accept: '.pdf,.jpg,.jpeg,.png',
                        required: true
                    }
                ],
                'Kat Karşılığı İnşaat Sözleşmesi (Arsa Payı Karşılığı İnşaat Sözleşmesi)': [
                    {
                        id: 'contract-draft',
                        name: 'Sözleşme Taslağı',
                        description: 'Kat karşılığı inşaat sözleşmesi taslağı',
                        accept: '.pdf,.doc,.docx',
                        required: true
                    },
                    {
                        id: 'property-deed',
                        name: 'Tapu Senedi',
                        description: 'Mevcut yapı tapu senedi',
                        accept: '.pdf,.jpg,.jpeg,.png',
                        required: true
                    },
                    {
                        id: 'id-copies',
                        name: 'Kimlik Fotokopileri',
                        description: 'Tarafların nüfus cüzdanı fotokopileri',
                        accept: '.pdf,.jpg,.jpeg,.png',
                        required: true,
                        multiple: true
                    },
                    {
                        id: 'apartment-distribution',
                        name: 'Daire Dağılım Planı',
                        description: 'Yapılacak dairelerin dağılım planı',
                        accept: '.pdf,.jpg,.jpeg,.png',
                        required: true
                    },
                    {
                        id: 'company-docs',
                        name: 'Müteahhit Belgeleri',
                        description: 'Vergi levhası, imza sirküleri, yetki belgesi',
                        accept: '.pdf,.jpg,.jpeg,.png',
                        required: true,
                        multiple: true
                    }
                ],
                'Anahtar Teslim İnşaat Sözleşmesi': [
                    {
                        id: 'contract-draft',
                        name: 'Sözleşme Taslağı',
                        description: 'Anahtar teslim inşaat sözleşmesi taslağı',
                        accept: '.pdf,.doc,.docx',
                        required: true
                    },
                    {
                        id: 'project-specs',
                        name: 'Proje Teknik Özellikleri',
                        description: 'Yapılacak işin teknik özelliklerini içeren belgeler',
                        accept: '.pdf,.doc,.docx',
                        required: true
                    },
                    {
                        id: 'id-copies',
                        name: 'Kimlik Fotokopileri',
                        description: 'Tarafların nüfus cüzdanı fotokopileri',
                        accept: '.pdf,.jpg,.jpeg,.png',
                        required: true,
                        multiple: true
                    },
                    {
                        id: 'payment-plan',
                        name: 'Ödeme Planı',
                        description: 'Anahtar teslim bedeli ödeme planı',
                        accept: '.pdf,.doc,.docx',
                        required: true
                    },
                    {
                        id: 'company-docs',
                        name: 'Müteahhit Belgeleri',
                        description: 'Vergi levhası, imza sirküleri, yetki belgesi',
                        accept: '.pdf,.jpg,.jpeg,.png',
                        required: true,
                        multiple: true
                    }
                ],
                'Gayrimenkul Satış Vaadi Sözleşmesi': [
                    {
                        id: 'contract-draft',
                        name: 'Sözleşme Taslağı',
                        description: 'Gayrimenkul satış vaadi sözleşmesi taslağı',
                        accept: '.pdf,.doc,.docx',
                        required: true
                    },
                    {
                        id: 'property-deed',
                        name: 'Tapu Senedi',
                        description: 'Satılacak gayrimenkul tapu senedi',
                        accept: '.pdf,.jpg,.jpeg,.png',
                        required: true
                    },
                    {
                        id: 'id-copies',
                        name: 'Kimlik Fotokopileri',
                        description: 'Alıcı ve satıcı kimlik fotokopileri',
                        accept: '.pdf,.jpg,.jpeg,.png',
                        required: true,
                        multiple: true
                    },
                    {
                        id: 'valuation-report',
                        name: 'Değerleme Raporu',
                        description: 'Gayrimenkul değerleme raporu',
                        accept: '.pdf',
                        required: true
                    },
                    {
                        id: 'payment-guarantee',
                        name: 'Ödeme Teminatı',
                        description: 'Banka teminat mektubu veya benzeri',
                        accept: '.pdf,.jpg,.jpeg,.png',
                        required: false
                    }
                ],
                'Vekaletname (Genel/Özel)': [
                    {
                        id: 'power-attorney-draft',
                        name: 'Vekaletname Taslağı',
                        description: 'Vekaletname belge taslağı',
                        accept: '.pdf,.doc,.docx',
                        required: true
                    },
                    {
                        id: 'id-copies',
                        name: 'Kimlik Fotokopileri',
                        description: 'Vekil veren ve vekil kimlik fotokopileri',
                        accept: '.pdf,.jpg,.jpeg,.png',
                        required: true,
                        multiple: true
                    },
                    {
                        id: 'authorization-scope',
                        name: 'Yetki Kapsamı Belgesi',
                        description: 'Vekilin yetkilerini belirten belge',
                        accept: '.pdf,.doc,.docx',
                        required: true
                    }
                ]
            };

            return documentRequirements[contractType] || [
                {
                    id: 'contract-draft',
                    name: 'Sözleşme Taslağı',
                    description: 'Genel sözleşme taslağı',
                    accept: '.pdf,.doc,.docx',
                    required: true
                },
                {
                    id: 'id-copies',
                    name: 'Kimlik Fotokopileri',
                    description: 'Tarafların kimlik fotokopileri',
                    accept: '.pdf,.jpg,.jpeg,.png',
                    required: true,
                    multiple: true
                },
                {
                    id: 'general-docs',
                    name: 'Genel Belgeler',
                    description: 'Sözleşme ile ilgili diğer belgeler',
                    accept: '.pdf,.jpg,.jpeg,.png,.doc,.docx',
                    required: false,
                    multiple: true
                }
            ];
        }

        function getNotaryStatusInfo(status) {
            const statuses = {
                'documents_pending': { text: 'Belge Yükleme Bekleniyor', class: 'bg-yellow-100 text-yellow-800' },
                'notary_assigned': { text: 'Noter Atandı', class: 'bg-blue-100 text-blue-800' },
                'appointment_set': { text: 'Randevu Ayarlandı', class: 'bg-indigo-100 text-indigo-800' },
                'contract_notarized': { text: 'Sözleşme Onaylandı', class: 'bg-green-100 text-green-800' },
                'default': { text: 'Bilinmeyen Durum', class: 'bg-gray-100 text-gray-800' }
            };
            return statuses[status] || statuses['default'];
        }

        function renderLegalProcesses() {
            const container = document.getElementById('legal-processes-list');
            if (!container) return;

            container.innerHTML = appData.legalProcesses.map(process => {
                const statusInfo = getNotaryStatusInfo(process.notaryStatus);
                const canUpload = ['documents_pending'].includes(process.notaryStatus);
                const canChat = ['notary_assigned', 'appointment_set'].includes(process.notaryStatus);
                const canViewAppointment = ['appointment_set', 'contract_notarized'].includes(process.notaryStatus);
                const canViewContract = process.notaryStatus === 'contract_notarized';

                return `
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between hover:shadow-md transition-shadow duration-200">
                    <div>
                        <div class="flex justify-between items-start mb-2">
                            <h3 class="font-bold text-gray-800 text-lg">${process.projectName}</h3>
                            <span class="${statusInfo.class} px-3 py-1 rounded-full text-xs font-semibold">${statusInfo.text}</span>
                        </div>
                        <p class="text-sm text-gray-600 mb-2">Müşteri: ${process.customerName}</p>
                        <p class="text-sm text-blue-600 mb-4 font-medium">
                            <i class="fas fa-file-contract mr-1"></i>
                            ${process.contractType}
                        </p>
                    </div>
                    <div class="mt-4 pt-4 border-t border-gray-200 space-y-2">
                        <button onclick="openCustomerInfoModal('${process.projectId}')" class="w-full flex items-center justify-center text-sm font-medium px-4 py-2 rounded-lg transition-colors bg-green-500 text-white hover:bg-green-600">
                            <i class="fas fa-address-card mr-2"></i>İletişim Bilgileri
                        </button>
                        <button onclick="openNotaryDocumentUploadModal('${process.projectId}')" ${!canUpload ? 'disabled' : ''} class="w-full flex items-center justify-center text-sm font-medium px-4 py-2 rounded-lg transition-colors bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed">
                            <i class="fas fa-upload mr-2"></i>Belgeleri Yükle
                        </button>
                        <button onclick="openNotaryChatModal('${process.projectId}')" ${!canChat ? 'disabled' : ''} class="w-full flex items-center justify-center text-sm font-medium px-4 py-2 rounded-lg transition-colors bg-purple-500 text-white hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed">
                            <i class="fas fa-comments mr-2"></i>Noterle İletişime Geç
                        </button>
                        <button onclick="openNotaryAppointmentModal('${process.projectId}')" ${!canViewAppointment ? 'disabled' : ''} class="w-full flex items-center justify-center text-sm font-medium px-4 py-2 rounded-lg transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:bg-gray-300 disabled:cursor-not-allowed">
                            <i class="fas fa-calendar-check mr-2"></i>Randevu Görüntüle
                        </button>
                        <button onclick="openNotaryPaymentModal('${process.projectId}')" class="w-full flex items-center justify-center text-sm font-medium px-4 py-2 rounded-lg transition-colors bg-orange-500 text-white hover:bg-orange-600">
                            <i class="fas fa-credit-card mr-2"></i>Noter Ödemesi
                        </button>
                        ${canViewContract ? `
                        <button onclick="viewDownloadNotarizedContract('${process.projectId}')" class="w-full flex items-center justify-center text-sm font-medium px-4 py-2 rounded-lg transition-colors bg-green-600 text-white hover:bg-green-700">
                            <i class="fas fa-file-contract mr-2"></i>Sözleşmeyi Görüntüle/İndir
                        </button>
                        ` : ''}
                    </div>
                </div>
                `;
            }).join('') || '<p class="text-gray-500 col-span-full">Aktif hukuki süreç bulunmuyor.</p>';
        }

        function openNotaryDocumentUploadModal(projectId) {
            currentLegalProjectId = projectId;
            const process = appData.legalProcesses.find(p => p.projectId === projectId);
            if (!process) return;

            document.getElementById('notary-upload-modal-title').textContent = `Noter Belgelerini Yükle - ${process.projectName}`;
            
            // Sözleşme türüne göre gerekli belgeleri al
            const requiredDocuments = getRequiredDocumentsByContractType(process.contractType);
            
            // Modal içeriğini dinamik olarak oluştur
            const modalContent = document.querySelector('#notary-document-upload-modal .p-6.max-h-\\[70vh\\]');
            modalContent.innerHTML = `
                <div class="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 class="font-medium text-blue-900 mb-2">Seçilen Sözleşme Türü:</h4>
                    <p class="text-blue-800">${process.contractType}</p>
                </div>
                <p class="text-gray-600 mb-4">Lütfen ${process.contractType} için gerekli olan belgeleri yükleyin.</p>
                <div class="space-y-4">
                    ${requiredDocuments.map(doc => `
                        <div>
                            <label for="${doc.id}-input" class="block text-sm font-medium text-gray-700">
                                ${doc.name} ${doc.required ? '<span class="text-red-500">*</span>' : ''}
                            </label>
                            <p class="text-xs text-gray-500 mb-2">${doc.description}</p>
                            <input 
                                type="file" 
                                id="${doc.id}-input"
                                ${doc.multiple ? 'multiple' : ''}
                                class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                                accept="${doc.accept}"
                                ${doc.required ? 'required' : ''}
                            >
                        </div>
                    `).join('')}
                </div>
                <div id="uploaded-files-preview" class="mt-6 space-y-2">
                    <!-- Uploaded files preview will be here -->
                </div>
            `;

            showModal('notary-document-upload-modal');
        }

        function uploadNotaryDocuments() {
            if (!currentLegalProjectId) return;
            const process = appData.legalProcesses.find(p => p.projectId === currentLegalProjectId);
            if (!process) return;

            // Sözleşme türüne göre gerekli belgeleri al
            const requiredDocuments = getRequiredDocumentsByContractType(process.contractType);
            
            // Tüm belge alanlarından dosyaları topla
            const files = [];
            const missingRequiredDocs = [];
            
            requiredDocuments.forEach(doc => {
                const input = document.getElementById(`${doc.id}-input`);
                if (input && input.files.length > 0) {
                    Array.from(input.files).forEach(file => {
                        files.push({ 
                            file: file, 
                            type: doc.id, 
                            name: file.name,
                            documentName: doc.name 
                        });
                    });
                } else if (doc.required) {
                    missingRequiredDocs.push(doc.name);
                }
            });

            // Gerekli belgeler eksikse uyarı ver
            if (missingRequiredDocs.length > 0) {
                showNotification(`Şu gerekli belgeler eksik: ${missingRequiredDocs.join(', ')}`, 'warning');
                return;
            }

            if (files.length === 0) {
                showNotification('Lütfen en az bir belge seçin.', 'warning');
                return;
            }

            // Belgeleri process'e ekle
            files.forEach(fileData => {
                process.uploadedDocuments.push({ 
                    name: fileData.name, 
                    type: fileData.type,
                    documentType: fileData.documentName
                });
            });
            
            process.notaryStatus = 'notary_assigned'; // Move to next status

            // Simulate assigning a notary
            process.assignedNotary = { id: 'notary-sim-1', name: 'Simülasyon Noterliği', contact: '0212 000 00 00' };

            showNotification(`${files.length} belge başarıyla yüklendi. Size bir noter atandı.`, 'success');
            closeModal('notary-document-upload-modal');
            renderLegalProcesses();

            // Simulate a welcome message from the notary
            setTimeout(() => {
                process.notaryChatHistory.push({
                    sender: 'notary',
                    text: `Merhaba, ${process.contractType} için belgelerinizi aldım. Süreci başlatmak için benimle iletişime geçebilirsiniz.`,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    isFile: false
                });
            }, 1000);
        }

        function openNotaryChatModal(projectId) {
            currentLegalProjectId = projectId;
            const process = appData.legalProcesses.find(p => p.projectId === projectId);
            if (!process || !process.assignedNotary) return;

            document.getElementById('notary-chat-modal-title').textContent = `Noterle Mesajlaşma - ${process.assignedNotary.name}`;
            renderNotaryChatMessages();
            showModal('notary-chat-modal');
        }

        function renderNotaryChatMessages() {
            const container = document.getElementById('notary-chat-messages');
            if (!currentLegalProjectId) return;
            const process = appData.legalProcesses.find(p => p.projectId === currentLegalProjectId);
            if (!process) return;

            container.innerHTML = process.notaryChatHistory.map(msg => {
                const isUser = msg.sender === 'user';
                return `
                    <div class="flex ${isUser ? 'justify-end' : 'justify-start'}">
                        <div class="max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${isUser ? 'bg-primary text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}">
                            <p class="text-sm">${msg.text}</p>
                            ${msg.isFile ? `<a href="#" class="block mt-1 text-xs font-semibold underline">${msg.fileName} <i class="fas fa-download ml-1"></i></a>` : ''}
                            <div class="text-right text-xs ${isUser ? 'text-purple-200' : 'text-gray-500'} mt-1">${msg.time}</div>
                        </div>
                    </div>
                `;
            }).join('');
            container.scrollTop = container.scrollHeight;
        }

        function sendNotaryMessage() {
            const input = document.getElementById('notary-chat-input');
            const text = input.value.trim();
            if (!text || !currentLegalProjectId) return;

            const process = appData.legalProcesses.find(p => p.projectId === currentLegalProjectId);
            if (!process) return;

            process.notaryChatHistory.push({
                sender: 'user',
                text: text,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isFile: false
            });
            input.value = '';
            renderNotaryChatMessages();

            // Simulate notary response
            setTimeout(() => {
                process.notaryChatHistory.push({
                    sender: 'notary',
                    text: 'Mesajınızı aldım, inceliyorum.',
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    isFile: false
                });
                renderNotaryChatMessages();
            }, 1500);
        }

        function sendNotaryFile(event) {
            const file = event.target.files[0];
            if (!file || !currentLegalProjectId) return;
            const process = appData.legalProcesses.find(p => p.projectId === currentLegalProjectId);
            if (!process) return;

            process.notaryChatHistory.push({
                sender: 'user',
                text: `Dosya gönderildi: ${file.name}`,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isFile: true,
                fileName: file.name
            });
            renderNotaryChatMessages();
            event.target.value = null; // Reset file input
        }

        // Calendar state
        let currentDate = new Date();
        let selectedDate = null;
        let selectedTimeSlot = null;
        let availableSlots = {};

        function openNotaryAppointmentModal(projectId) {
            currentLegalProjectId = projectId;
            const process = appData.legalProcesses.find(p => p.projectId === projectId);
            if (!process) return;

            document.getElementById('notary-appointment-modal-title').textContent = `Noter Randevu Seçimi - ${process.projectName}`;

            // Reset selection state
            selectedDate = null;
            selectedTimeSlot = null;
            document.getElementById('confirm-appointment-btn').disabled = true;
            document.getElementById('selected-appointment-details').classList.add('hidden');
            document.getElementById('available-slots').classList.add('hidden');
            document.getElementById('no-appointment-selected').classList.remove('hidden');

            // Generate available slots for the next 30 days
            generateAvailableSlots();

            // Render initial calendar
            renderCalendar();

            showModal('notary-appointment-modal');
        }

        function generateAvailableSlots() {
            availableSlots = {};
            const today = new Date();

            // Generate slots for next 30 days
            for (let i = 0; i < 30; i++) {
                const date = new Date(today);
                date.setDate(today.getDate() + i);

                // Skip weekends
                if (date.getDay() === 0 || date.getDay() === 6) continue;

                const dateStr = date.toISOString().split('T')[0];
                availableSlots[dateStr] = [
                    '10:00', '10:30', '11:00', '11:30',
                    '14:00', '14:30', '15:00', '15:30'
                ];
            }
        }

        function renderCalendar() {
            const monthNames = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
                'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];

            // Update month display
            document.getElementById('current-month-display').textContent =
                `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

            // Get first day of month and number of days
            const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

            // Calculate days from previous month to show
            let firstDayIndex = firstDay.getDay() - 1; // Adjust for Monday start
            if (firstDayIndex === -1) firstDayIndex = 6; // Sunday becomes last day

            const daysInMonth = lastDay.getDate();
            const today = new Date();

            // Generate calendar HTML
            let calendarHTML = '';
            let dayCount = 1;
            const totalSlots = 42; // 6 weeks × 7 days

            for (let i = 0; i < totalSlots; i++) {
                if (i < firstDayIndex) {
                    // Previous month days
                    calendarHTML += `<div class="calendar-day"></div>`;
                } else if (dayCount <= daysInMonth) {
                    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), dayCount);
                    const dateStr = date.toISOString().split('T')[0];
                    const hasSlots = availableSlots[dateStr] && availableSlots[dateStr].length > 0;
                    const isSelected = selectedDate && selectedDate === dateStr;

                    let classes = ['calendar-day', 'current-month'];
                    if (hasSlots) classes.push('has-slots');
                    if (isSelected) classes.push('selected-day');

                    calendarHTML += `
                        <div class="${classes.join(' ')}" 
                             onclick="${hasSlots ? `selectDate('${dateStr}')` : ''}"
                             title="${hasSlots ? 'Müsait randevu saatleri var' : 'Randevu alınamaz'}">
                            ${dayCount}
                        </div>`;
                    dayCount++;
                } else {
                    // Next month days
                    calendarHTML += `<div class="calendar-day"></div>`;
                }
            }

            // Insert calendar days after day names
            const dayNames = document.querySelectorAll('.calendar-day-name');
            const lastDayName = dayNames[dayNames.length - 1];
            lastDayName.insertAdjacentHTML('afterend', calendarHTML);
        }

        function changeMonth(delta) {
            currentDate.setMonth(currentDate.getMonth() + delta);
            // Clear existing calendar days
            const calendar = document.querySelector('.calendar-grid');
            const days = calendar.querySelectorAll('.calendar-day');
            days.forEach(day => day.remove());
            // Render new month
            renderCalendar();
        }

        function selectDate(dateStr) {
            selectedDate = dateStr;
            selectedTimeSlot = null;

            // Update calendar UI
            document.querySelectorAll('.calendar-day').forEach(day => {
                day.classList.remove('selected-day');
            });
            document.querySelector(`.calendar-day[onclick*="${dateStr}"]`).classList.add('selected-day');

            // Show available time slots
            const slotsContainer = document.getElementById('available-slots');
            slotsContainer.classList.remove('hidden');
            slotsContainer.innerHTML = availableSlots[dateStr].map(time => `
                <button type="button" class="calendar-slot" data-time="${time}">
                    ${time}
                </button>
            `).join('');

            // Add click event listeners to all time slots
            slotsContainer.querySelectorAll('.calendar-slot').forEach(slot => {
                slot.addEventListener('click', function () {
                    const time = this.getAttribute('data-time');
                    selectTimeSlot(time);
                });
            });

            // Hide appointment details until time is selected
            document.getElementById('selected-appointment-details').classList.add('hidden');
            document.getElementById('confirm-appointment-btn').disabled = true;
        }

        function selectTimeSlot(time) {
            selectedTimeSlot = time;

            // Update time slots UI
            document.querySelectorAll('.calendar-slot').forEach(slot => {
                slot.classList.remove('selected');
                if (slot.getAttribute('data-time') === time) {
                    slot.classList.add('selected');
                }
            });

            // Show appointment details
            const process = appData.legalProcesses.find(p => p.projectId === currentLegalProjectId);
            const details = document.getElementById('selected-appointment-details');
            const noSelection = document.getElementById('no-appointment-selected');

            details.classList.remove('hidden');
            noSelection.classList.add('hidden');

            // Format date for display
            const dateObj = new Date(selectedDate);
            const formattedDate = dateObj.toLocaleDateString('tr-TR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                weekday: 'long'
            });

            document.getElementById('selected-date').textContent = formattedDate;
            document.getElementById('selected-time').textContent = time;
            document.getElementById('selected-notary').textContent = process.assignedNotary.name;
            document.getElementById('selected-location').textContent = process.assignedNotary.contact;

            // Enable confirm button
            document.getElementById('confirm-appointment-btn').disabled = false;
        }

        function confirmAppointment() {
            if (!selectedDate || !selectedTimeSlot || !currentLegalProjectId) return;

            const process = appData.legalProcesses.find(p => p.projectId === currentLegalProjectId);
            if (!process) return;

            // Create appointment object
            process.notaryAppointment = {
                date: selectedDate,
                time: selectedTimeSlot,
                location: process.assignedNotary.contact,
                smsReminderEnabled: document.getElementById('sms-reminder-toggle').checked
            };

            // Update process status
            process.notaryStatus = 'appointment_set';

            // Close modal and show success message
            closeModal('notary-appointment-modal');
            showNotification('Noter randevunuz başarıyla oluşturuldu!', 'success');

            // Re-render legal processes section
            renderLegalProcesses();
        }

        // Helper function to check if button text contains specific content
        Element.prototype.contains = function (text) {
            return this.textContent.includes(text);
        };

        function toggleSmsReminder() {
            if (!currentLegalProjectId) return;
            const process = appData.legalProcesses.find(p => p.projectId === currentLegalProjectId);
            if (!process || !process.notaryAppointment) return;

            process.notaryAppointment.smsReminderEnabled = !process.notaryAppointment.smsReminderEnabled;
            showNotification(`SMS hatırlatıcısı ${process.notaryAppointment.smsReminderEnabled ? 'açıldı' : 'kapatıldı'}.`, 'info');
            openNotaryAppointmentModal(currentLegalProjectId); // Re-render modal to show change
        }

        function viewDownloadNotarizedContract(projectId) {
            const process = appData.legalProcesses.find(p => p.projectId === projectId);
            if (!process || !process.notarizedContractUrl) return;

            document.getElementById('notarized-contract-modal-title').textContent = `Noter Onaylı Sözleşme - ${process.projectName}`;
            document.getElementById('notarized-contract-iframe').src = process.notarizedContractUrl;
            document.getElementById('download-notarized-contract-link').href = process.notarizedContractUrl;

            showModal('notarized-contract-modal');
        }

        // Customer Info Modal Functions
        let currentCustomerInfo = null;

        function openCustomerInfoModal(projectId) {
            const process = appData.legalProcesses.find(p => p.projectId === projectId);
            if (!process || !process.customerInfo) return;

            currentCustomerInfo = process.customerInfo;
            
            // Modal başlığını güncelle
            document.getElementById('customer-info-modal-title').textContent = `İletişim Bilgileri - ${process.projectName}`;
            
            // Müşteri adını göster
            document.getElementById('customer-name-display').textContent = process.customerName;
            
            // Temel bilgileri doldur
            document.getElementById('customer-phone-display').textContent = process.customerInfo.phone || '-';
            document.getElementById('customer-email-display').textContent = process.customerInfo.email || '-';
            document.getElementById('customer-address-display').textContent = process.customerInfo.address || '-';
            
            // Müşteri tipine göre alanları göster/gizle
            const individualFields = document.getElementById('individual-customer-fields');
            const companyFields = document.getElementById('company-customer-fields');
            
            if (process.customerInfo.tcNumber) {
                // Bireysel müşteri
                document.getElementById('customer-tc-display').textContent = process.customerInfo.tcNumber;
                individualFields.classList.remove('hidden');
                companyFields.classList.add('hidden');
            } else if (process.customerInfo.companyName) {
                // Kurumsal müşteri
                document.getElementById('customer-company-display').textContent = process.customerInfo.companyName;
                document.getElementById('customer-tax-display').textContent = process.customerInfo.taxNumber || '-';
                companyFields.classList.remove('hidden');
                individualFields.classList.add('hidden');
            } else {
                // Her ikisini de gizle
                individualFields.classList.add('hidden');
                companyFields.classList.add('hidden');
            }
            
            showModal('customer-info-modal');
        }

        function callCustomer() {
            if (!currentCustomerInfo || !currentCustomerInfo.phone) {
                showNotification('Telefon numarası bulunamadı.', 'error');
                return;
            }
            
            // Telefon numarasını temizle (boşluk ve özel karakterleri kaldır)
            const phoneNumber = currentCustomerInfo.phone.replace(/\s+/g, '').replace(/[^\d+]/g, '');
            
            // Telefon uygulamasını aç
            window.open(`tel:${phoneNumber}`, '_blank');
            showNotification('Arama başlatılıyor...', 'info');
        }

        function whatsappCustomer() {
            if (!currentCustomerInfo || !currentCustomerInfo.phone) {
                showNotification('Telefon numarası bulunamadı.', 'error');
                return;
            }
            
            // Telefon numarasını temizle ve uluslararası formata çevir
            let phoneNumber = currentCustomerInfo.phone.replace(/\s+/g, '').replace(/[^\d]/g, '');
            
            // Eğer 0 ile başlıyorsa Türkiye kodu ekle
            if (phoneNumber.startsWith('0')) {
                phoneNumber = '90' + phoneNumber.substring(1);
            }
            
            const message = encodeURIComponent('Merhaba, DönüşümAY platformu üzerindeki projeniz hakkında görüşmek istiyorum.');
            window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
            showNotification('WhatsApp açılıyor...', 'info');
        }

        function emailCustomer() {
            if (!currentCustomerInfo || !currentCustomerInfo.email) {
                showNotification('E-posta adresi bulunamadı.', 'error');
                return;
            }
            
            const subject = encodeURIComponent('DönüşümAY - Proje Görüşmesi');
            const body = encodeURIComponent('Merhaba,\n\nDönüşümAY platformu üzerindeki projeniz hakkında görüşmek istiyorum.\n\nSaygılarımla,\nMüteahhit');
            
            window.open(`mailto:${currentCustomerInfo.email}?subject=${subject}&body=${body}`, '_blank');
            showNotification('E-posta uygulaması açılıyor...', 'info');
        }

        // Notary Payment Input Formatting
        document.addEventListener('DOMContentLoaded', function() {
            // Format card number input
            const cardNumberInput = document.getElementById('notary-card-number');
            if (cardNumberInput) {
                cardNumberInput.addEventListener('input', function(e) {
                    let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
                    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
                    if (formattedValue.length > 19) formattedValue = formattedValue.substring(0, 19);
                    e.target.value = formattedValue;
                });
            }

            // Format expiry date input
            const expiryInput = document.getElementById('notary-card-expiry');
            if (expiryInput) {
                expiryInput.addEventListener('input', function(e) {
                    let value = e.target.value.replace(/\D/g, '');
                    if (value.length >= 2) {
                        value = value.substring(0, 2) + '/' + value.substring(2, 4);
                    }
                    e.target.value = value;
                });
            }

            // Only allow numbers in CVV
            const cvvInput = document.getElementById('notary-card-cvv');
            if (cvvInput) {
                cvvInput.addEventListener('input', function(e) {
                    e.target.value = e.target.value.replace(/\D/g, '');
                });
            }
        });

        // Notary Payment Functions
        function openNotaryPaymentModal(projectId) {
            console.log('Noter ödeme modalı açılıyor, proje ID:', projectId);
            const process = appData.legalProcesses.find(p => p.projectId === projectId);
            if (!process) {
                showNotification('Proje bilgisi bulunamadı.', 'error');
                return;
            }

            // Set project name in modal
            document.getElementById('notary-project-name').textContent = process.projectName;
            
            // Clear form fields
            document.getElementById('notary-registered-cards').value = '';
            document.getElementById('notary-card-holder').value = '';
            document.getElementById('notary-card-number').value = '';
            document.getElementById('notary-card-expiry').value = '';
            document.getElementById('notary-card-cvv').value = '';
            document.getElementById('notary-save-card-checkbox').checked = false;
            
            // Store current project for payment processing
            window.currentNotaryPaymentProject = projectId;
            
            showModal('notary-payment-modal');
        }

        function fillNotaryCardDetails(cardId) {
            if (!cardId) {
                // Clear fields for new card
                document.getElementById('notary-card-holder').value = '';
                document.getElementById('notary-card-number').value = '';
                document.getElementById('notary-card-expiry').value = '';
                document.getElementById('notary-card-cvv').value = '';
                return;
            }
            
            // Simulate filling saved card details (in real app, this would come from secure storage)
            if (cardId === 'card1') {
                document.getElementById('notary-card-holder').value = 'AHMET YILMAZ';
                document.getElementById('notary-card-number').value = '1234 5678 9012 1234';
                document.getElementById('notary-card-expiry').value = '12/25';
                document.getElementById('notary-card-cvv').value = '';  // CVV always empty for security
            } else if (cardId === 'card2') {
                document.getElementById('notary-card-holder').value = 'AHMET YILMAZ';
                document.getElementById('notary-card-number').value = '9876 5432 1098 5678';
                document.getElementById('notary-card-expiry').value = '06/26';
                document.getElementById('notary-card-cvv').value = '';  // CVV always empty for security
            }
        }

        function processNotaryPayment() {
            const cardHolder = document.getElementById('notary-card-holder').value.trim();
            const cardNumber = document.getElementById('notary-card-number').value.trim();
            const cardExpiry = document.getElementById('notary-card-expiry').value.trim();
            const cardCvv = document.getElementById('notary-card-cvv').value.trim();
            
            // Basic validation
            if (!cardHolder) {
                showNotification('Kart sahibinin adını giriniz.', 'error');
                return;
            }
            
            if (!cardNumber || cardNumber.length < 16) {
                showNotification('Geçerli bir kart numarası giriniz.', 'error');
                return;
            }
            
            if (!cardExpiry || !cardExpiry.match(/^\d{2}\/\d{2}$/)) {
                showNotification('Son kullanma tarihini AA/YY formatında giriniz.', 'error');
                return;
            }
            
            if (!cardCvv || cardCvv.length < 3) {
                showNotification('CVV kodunu giriniz.', 'error');
                return;
            }
            
            // Simulate payment processing
            const paymentButton = document.querySelector('#notary-payment-modal button[onclick="processNotaryPayment()"]');
            paymentButton.disabled = true;
            paymentButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>İşleminiz gerçekleştiriliyor...';
            
            setTimeout(() => {
                // Simulate successful payment
                const projectId = window.currentNotaryPaymentProject;
                const process = appData.legalProcesses.find(p => p.projectId === projectId);
                
                if (process) {
                    // Update process status to show payment completed
                    process.notaryPaymentCompleted = true;
                    process.notaryPaymentDate = new Date().toISOString();
                }
                
                closeModal('notary-payment-modal');
                showNotification('Noter ücreti başarıyla ödendi! Noter süreçleriniz başlatılacaktır.', 'success');
                
                // Reset button
                paymentButton.disabled = false;
                paymentButton.innerHTML = '<i class="fas fa-credit-card mr-2"></i>Güvenli Ödeme Yap';
                
                // Refresh legal processes
                renderLegalProcesses();
                
            }, 2000);
        }

        function goToContracts(offerId) {
            // This function is obsolete and replaced by the legal processes flow.
            // Kept here to avoid breaking old references if any, but should be deprecated.
            showNotification('Bu süreç yeni Hukuki Süreçler bölümünden yönetilmektedir.', 'info');
            showSection('legal-processes-section');
        }

        // Sözleşmelerim Functions (OBSOLETE)
        function renderContractDetails(offerId) { /* Obsolete */ }
        function payCommission(offerId) { /* Obsolete */ }
        function assignLawyer(offerId, lawyerId) { /* Obsolete */ }
        // Lawyer Chat Functions
        function openLawyerChatModal(offerId) {
            currentOffer.id = offerId; // Make sure offer id is set for context
            if (!appData.lawyerChatHistory[offerId]) {
                appData.lawyerChatHistory[offerId] = [
                    { sender: 'lawyer', text: 'Merhaba, sözleşme süreciyle ilgili size nasıl yardımcı olabilirim?', time: new Date().toLocaleTimeString() }
                ];
            }
            renderLawyerChatMessages();
            showModal('lawyerChatModal');
        }

        function renderLawyerChatMessages() {
            const container = document.getElementById('chat-messages');
            const history = appData.lawyerChatHistory[currentOffer.id] || [];
            container.innerHTML = history.map(msg => {
                const isUser = msg.sender === 'user';
                return `
                    <div class="flex ${isUser ? 'justify-end' : 'justify-start'}">
                        <div class="max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${isUser ? 'bg-primary text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}">
                            <p class="text-sm">${msg.text}</p>
                            ${msg.file ? `<a href="#" class="block mt-1 text-xs font-semibold underline">${msg.file} <i class="fas fa-download ml-1"></i></a>` : ''}
                            <div class="flex justify-end items-center mt-1">
                                <span class="text-xs ${isUser ? 'text-purple-200' : 'text-gray-500'} mr-2">${msg.time}</span>
                                ${isUser ? '<i class="fas fa-check-double text-blue-400"></i>' : ''}
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
            container.scrollTop = container.scrollHeight; // Scroll to bottom
        }

        function sendLawyerMessage() {
            const input = document.getElementById('chat-input');
            const text = input.value.trim();
            if (!text) return;

            const history = appData.lawyerChatHistory[currentOffer.id];
            history.push({ sender: 'user', text: text, time: new Date().toLocaleTimeString() });
            input.value = '';
            renderLawyerChatMessages();

            // Simulate lawyer response
            setTimeout(() => {
                history.push({ sender: 'lawyer', text: 'Mesajınızı aldım, inceliyorum.', time: new Date().toLocaleTimeString() });
                renderLawyerChatMessages();
            }, 1500);
        }

        function sendLawyerFile(event) {
            const file = event.target.files[0];
            if (!file) return;

            const history = appData.lawyerChatHistory[currentOffer.id];
            history.push({ sender: 'user', text: `Dosya gönderildi: ${file.name}`, file: file.name, time: new Date().toLocaleTimeString() });
            renderLawyerChatMessages();

            event.target.value = null; // Reset file input

            setTimeout(() => {
                history.push({ sender: 'lawyer', text: `'${file.name}' adlı dosyayı aldım, teşekkürler.`, time: new Date().toLocaleTimeString() });
                renderLawyerChatMessages();
            }, 1500);
        }

        function handleNoterContractUpload(offerId) {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.multiple = true;
            try {
                fileInput.webkitdirectory = true;
                fileInput.directory = true;
            } catch (e) {
                // Some browsers might not support these properties.
            }

            fileInput.onchange = (e) => {
                const files = e.target.files;
                if (files.length > 0) {
                    // Find the offer and listing
                    const offerIndex = appData.acceptedOffers.findIndex(o => o.id === offerId);
                    if (offerIndex === -1) return;
                    const offer = appData.acceptedOffers[offerIndex];
                    const listing = appData.listingsData.find(l => l.id === offer.relatedListingId);

                    // Create a new project object
                    const newProject = {
                        id: Date.now(),
                        title: offer.listingTitle,
                        ownerName: offer.ownerName,
                        assignedArchitect: appData.architects[0], // Simulate assigning the first architect
                        status: 'Avan Proje Onaylandı',
                        progress: 10,
                        applicationPaymentStatus: false,
                        municipalityProcess: [{ text: 'Ruhsat Başvurusu Bekleniyor', canUploadDocument: false }],
                        totalUnits: listing.totalUnits,
                        unitPrice: listing.unitPrice,
                        relatedListingId: offer.relatedListingId
                    };

                    // Add to ongoing projects and remove from accepted offers
                    appData.ongoingContractorProjectsData.push(newProject);
                    appData.acceptedOffers.splice(offerIndex, 1);

                    // Re-render relevant sections
                    renderAcceptedOffers();
                    if (currentSection === 'projects-section') {
                        renderOngoingContractorProjects();
                    }

                    showNotification('Noter sözleşmesi yüklendi. Projeniz "Devam Eden Projelerim" bölümüne alındı.', 'success');
                }
            };

            fileInput.click();
        }

        // Projelerim Functions
        function initializeProjects() {
            renderOngoingContractorProjects();
            renderCompletedContractorProjects();
            switchProjectTab('ongoing');
        }

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                closeMobileMenu();
                ['viewOfferModal', 'reviseOfferModal', 'architectRequestModal', 'reviseOfferConfirmModal', 'architectSelectionConfirmModal', 'paymentOptionsModal', 'creditCardPaymentModal', 'eftHavalePaymentModal', 'lawyerChatModal', 'applicationProjectPaymentModal', 'municipalityProcessModal', 'constructionPhasesModal', 'contractDetailsModal', 'viewProjectFilesModal', 'post-craftsman-ad-modal', 'post-apartment-listing-modal', 'delete-account-modal', 'sms-verification-modal', 'freeze-account-modal', 'unfreeze-account-modal', 'live-support-modal', 'change-password-modal', 'verify-email-modal', 'verify-phone-modal', 'notary-document-upload-modal', 'notary-chat-modal', 'notary-appointment-modal', 'notarized-contract-modal'].forEach(id => closeModal(id));
            }
        });

        // Support Section Functions
        function renderSupportSection() {
            renderFaqs();
            renderSupportAccountManagement();
        }

        /**
         * Renders the account management section on the support page dynamically.
         * The password section is intentionally omitted as per requirements.
         */
        function renderSupportAccountManagement() {
            const container = document.getElementById('support-account-management');
            if (!container) return;

            const security = contractorData.security;
            const profile = contractorData.profile;

            container.innerHTML = `
                <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                        <span class="font-medium text-gray-700">İki Faktörlü Kimlik Doğrulama</span>
                        <p class="text-xs text-gray-500">Hesap güvenliğinizi artırmak için 2FA'yı etkinleştirin.</p>
                    </div>
                    <button id="2fa-toggle" onclick="toggleTwoFactor(this)" aria-label="İki faktörlü kimlik doğrulamayı aç/kapat" class="relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${security.twoFactorEnabled ? 'bg-primary' : 'bg-gray-300'}">
                        <span class="inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${security.twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'}"></span>
                    </button>
                </div>
                <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                        <span class="font-medium text-gray-700">E-posta Doğrulama</span>
                        <p class="text-xs text-gray-500">${profile.email || 'N/A'}</p>
                    </div>
                    <button onclick="verifyEmail()" class="${security.isEmailVerified ? 'text-green-600 cursor-not-allowed' : 'text-sm font-semibold text-primary hover:underline'}" ${security.isEmailVerified ? 'disabled' : ''}>
                        ${security.isEmailVerified ? '<i class="fas fa-check-circle mr-1"></i> Doğrulanmış' : 'Doğrula'}
                    </button>
                </div>
                <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                        <span class="font-medium text-gray-700">Telefon Doğrulama</span>
                        <p class="text-xs text-gray-500">${profile.phone || 'N/A'}</p>
                    </div>
                    <button onclick="verifyPhone()" class="${security.isPhoneVerified ? 'text-green-600 cursor-not-allowed' : 'text-sm font-semibold text-primary hover:underline'}" ${security.isPhoneVerified ? 'disabled' : ''}>
                        ${security.isPhoneVerified ? '<i class="fas fa-check-circle mr-1"></i> Doğrulanmış' : 'Doğrula'}
                    </button>
                </div>
                 <div class="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span class="font-medium text-red-700">Hesabı Sil</span>
                    <button onclick="openDeleteAccountModal()" class="text-sm font-semibold text-red-600 hover:underline">Hesabı Kalıcı Olarak Sil</button>
                </div>
                 <div class="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <span class="font-medium text-yellow-700">Hesabı Dondur</span>
                    <button onclick="toggleAccountFreeze()" class="text-sm font-semibold text-yellow-800 hover:underline">Hesabı Dondur/Aktif Et</button>
                </div>
            `;
        }

        function renderFaqs() {
            const container = document.getElementById('faq-container');
            if (!container) return;
            container.innerHTML = appData.faqData.map((faq, index) => `
                <div class="border-b border-gray-200 py-2">
                    <button onclick="toggleFaq(this)" class="w-full flex justify-between items-center text-left text-gray-800 font-semibold focus:outline-none">
                        <span>${faq.question}</span>
                        <i class="fas fa-chevron-down transform transition-transform duration-200"></i>
                    </button>
                    <div class="faq-answer hidden mt-2 pt-2 text-gray-600">
                        <p>${faq.answer}</p>
                    </div>
                </div>
            `).join('');
        }

        function toggleFaq(buttonElement) {
            const answer = buttonElement.nextElementSibling;
            const icon = buttonElement.querySelector('i');
            const isHidden = answer.classList.contains('hidden');

            if (isHidden) {
                answer.classList.remove('hidden');
                icon.classList.add('rotate-180');
            } else {
                answer.classList.add('hidden');
                icon.classList.remove('rotate-180');
            }
        }

        function openLiveSupportModal() {
            if (!selectedSupportTopic) {
                showNotification('Lütfen bir destek konusu seçin.', 'warning');
                return;
            }

            if (appData.liveSupportChatHistory.length === 0) {
                appData.liveSupportChatHistory.push({
                    sender: 'support',
                    text: `Merhaba, DönüşümAY canlı desteğe hoş geldiniz! "${selectedSupportTopic}" konusunda size nasıl yardımcı olabilirim?`,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                });
            }
            renderLiveSupportMessages();
            showModal('live-support-modal');
        }

        function sendLiveSupportMessage() {
            const input = document.getElementById('live-support-chat-input');
            const message = input.value.trim();

            if (!message) return;

            // Add user message
            appData.liveSupportChatHistory.push({
                sender: 'user',
                text: message,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            });

            // Clear input
            input.value = '';

            // Render messages
            renderLiveSupportMessages();

            // Simulate support response
            setTimeout(() => {
                appData.liveSupportChatHistory.push({
                    sender: 'support',
                    text: getSimulatedResponse(selectedSupportTopic),
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                });
                renderLiveSupportMessages();
            }, 1000);
        }

        function getSimulatedResponse(topic) {
            const responses = {
                'payment': 'Ödeme işlemleriyle ilgili size yardımcı olabilirim. Hangi konuda detaylı bilgi almak istersiniz?',
                'project': 'Proje ve teklifler konusunda size destek olabilirim. Spesifik bir projeyle ilgili mi yardım istiyorsunuz?',
                'documents': 'Belge ve dökümanlar konusunda yardımcı olabilirim. Hangi belgeyle ilgili bilgi almak istersiniz?',
                'account': 'Hesap işlemleri konusunda size yardımcı olabilirim. Hesabınızla ilgili nasıl bir desteğe ihtiyacınız var?',
                'other': 'Size nasıl yardımcı olabilirim? Lütfen sorununuzu detaylı bir şekilde anlatın.'
            };
            return responses[topic] || 'Size nasıl yardımcı olabilirim?';
        }

        function renderLiveSupportMessages() {
            const container = document.getElementById('live-support-messages');
            container.innerHTML = appData.liveSupportChatHistory.map(msg => {
                const isUser = msg.sender === 'user';
                return `
                    <div class="flex ${isUser ? 'justify-end' : 'justify-start'}">
                        <div class="max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${isUser ? 'bg-primary text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}">
                            <p class="text-sm">${msg.text}</p>
                            <div class="text-right text-xs ${isUser ? 'text-purple-200' : 'text-gray-500'} mt-1">${msg.time}</div>
                        </div>
                    </div>
                `;
            }).join('');
            container.scrollTop = container.scrollHeight;
        }

        function openDeleteAccountModal() {
            showModal('delete-account-modal');
        }

        function confirmDeleteAccount() {
            closeModal('delete-account-modal');
            simulatedSmsCode = Math.floor(100000 + Math.random() * 900000).toString();
            console.log('Simulated SMS Code:', simulatedSmsCode); // For testing
            showNotification(`Telefonunuza SMS kodu gönderildi: ${simulatedSmsCode}`, 'info');
            document.getElementById('sms-code-input').value = '';
            showModal('sms-verification-modal');
        }

        function verifySmsCode() {
            const inputCode = document.getElementById('sms-code-input').value;
            if (inputCode === simulatedSmsCode) {
                closeModal('sms-verification-modal');
                showNotification('Hesabınız başarıyla silindi. Çıkış yapılıyor...', 'success');
                setTimeout(() => {
                    // In a real app, you'd redirect. Here we'll just simulate it.
                    document.body.innerHTML = '<div class="min-h-screen flex items-center justify-center bg-gray-100"><h1 class="text-2xl font-bold text-gray-800">Oturumunuz kapatıldı.</h1></div>';
                }, 2000);
            } else {
                showNotification('Hatalı kod. Lütfen tekrar deneyin.', 'error');
            }
        }

        function toggleAccountFreeze() {
            if (isAccountFrozen) {
                openUnfreezeAccountModal();
            } else {
                openFreezeAccountModal();
            }
        }

        function openFreezeAccountModal() {
            showModal('freeze-account-modal');
        }

        function confirmFreezeAccount() {
            closeModal('freeze-account-modal');
            isAccountFrozen = true;
            showNotification('Hesabınız başarıyla donduruldu. İstediğiniz zaman aktif edebilirsiniz.', 'success');
            renderSupportSection();
        }

        function openUnfreezeAccountModal() {
            showModal('unfreeze-account-modal');
        }

        function confirmUnfreezeAccount() {
            closeModal('unfreeze-account-modal');
            isAccountFrozen = false;
            showNotification('Hesabınız başarıyla aktif edildi.', 'success');
            renderSupportSection();
        }

        // Müteahhit Doğrulama için Global Değişkenler
        let tempVerificationFiles = {};
        let contractorUserId = null;

        // Firebase Auth State Change Listener'ına Ekleme
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                contractorUserId = user.uid;
                document.getElementById('current-contractor-id').value = contractorUserId;
                setupVerificationListener();
            } else {
                contractorUserId = null;
            }
        });

        // Belge Yükleme İşleyicisi
        function handleDocumentUpload(event, docType) {
            const file = event.target.files[0];
            if (!file) return;

            // Dosya tipini kontrol et
            const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
            if (!allowedTypes.includes(file.type)) {
                showNotification('Lütfen sadece PDF, PNG veya JPG dosyası yükleyin.', 'error');
                return;
            }

            // Dosya boyutunu kontrol et (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                showNotification('Dosya boyutu 5MB\'dan küçük olmalıdır.', 'error');
                return;
            }

            // Dosyayı geçici olarak sakla
            tempVerificationFiles[docType] = file;

            // UI'ı güncelle
            const container = event.target.closest('.document-upload-container');
            const fileName = container.querySelector('.file-name');
            const uploadStatus = container.querySelector('.upload-status');
            const uploadedOverlay = container.querySelector('.absolute');

            fileName.textContent = file.name;
            uploadStatus.innerHTML = '<span class="text-green-600"><i class="fas fa-check-circle"></i> Dosya hazır</span>';
            uploadedOverlay.classList.remove('hidden');

            // Tüm belgelerin yüklenip yüklenmediğini kontrol et
            checkAllDocumentsUploaded();
        }

        // Tüm Belgelerin Yüklenip Yüklenmediğini Kontrol Et
        function checkAllDocumentsUploaded() {
            const requiredDocs = ['taxPlate', 'tradeRegister', 'chamberRegistration', 'idCopy', 'signatureCircular'];
            const allUploaded = requiredDocs.every(docType => tempVerificationFiles[docType]);

            const submitButton = document.getElementById('submit-verification-request-btn');
            if (allUploaded) {
                submitButton.disabled = false;
                submitButton.classList.remove('opacity-50', 'cursor-not-allowed');
                submitButton.classList.add('hover:bg-primary-dark', 'cursor-pointer');
            } else {
                submitButton.disabled = true;
                submitButton.classList.add('opacity-50', 'cursor-not-allowed');
                submitButton.classList.remove('hover:bg-primary-dark', 'cursor-pointer');
            }
        }

        // Doğrulama Durumu UI Güncellemesi
        function updateVerificationStatusUI(status, reason = '') {
            const statusDisplay = document.getElementById('verification-status-display');
            const rejectionDisplay = document.getElementById('rejection-reason-display');
            const uploadContainers = document.querySelectorAll('.document-upload-container');
            const submitButton = document.getElementById('submit-verification-request-btn');

            let statusHTML = '';
            let statusClasses = '';

            switch (status) {
                case 'pending':
                    statusHTML = '<i class="fas fa-clock mr-2"></i>Doğrulama İncelemesi Devam Ediyor';
                    statusClasses = 'bg-blue-100 text-blue-800';
                    break;
                case 'approved':
                    statusHTML = '<i class="fas fa-check-circle mr-2"></i>Doğrulanmış Müteahhit';
                    statusClasses = 'bg-green-100 text-green-800';
                    break;
                case 'rejected':
                    statusHTML = '<i class="fas fa-times-circle mr-2"></i>Doğrulama Reddedildi';
                    statusClasses = 'bg-red-100 text-red-800';
                    break;
                default:
                    statusHTML = '<i class="fas fa-info-circle mr-2"></i>Doğrulama Bekleniyor';
                    statusClasses = 'bg-yellow-100 text-yellow-800';
            }

            statusDisplay.className = `mb-6 p-4 rounded-lg ${statusClasses}`;
            statusDisplay.innerHTML = statusHTML;

            // Reddedilme nedeni varsa göster
            if (status === 'rejected' && reason) {
                rejectionDisplay.classList.remove('hidden');
                rejectionDisplay.innerHTML = `<i class="fas fa-exclamation-circle mr-2"></i>Reddedilme Nedeni: ${reason}`;
            } else {
                rejectionDisplay.classList.add('hidden');
            }

            // Belge yükleme alanlarını ve gönder butonunu duruma göre devre dışı bırak
            if (status === 'pending' || status === 'approved') {
                uploadContainers.forEach(container => {
                    const inputs = container.querySelectorAll('input');
                    inputs.forEach(input => input.disabled = true);
                    container.classList.add('opacity-50');
                });
                submitButton.disabled = true;
                submitButton.classList.add('opacity-50', 'cursor-not-allowed');
            } else {
                uploadContainers.forEach(container => {
                    const inputs = container.querySelectorAll('input');
                    inputs.forEach(input => input.disabled = false);
                    container.classList.remove('opacity-50');
                });
                checkAllDocumentsUploaded();
            }
        }

        // Doğrulama Talebi Gönderme
        async function submitVerificationRequest() {
            if (!contractorUserId) {
                showNotification('Oturum açmanız gerekiyor.', 'error');
                return;
            }

            const submitButton = document.getElementById('submit-verification-request-btn');
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Gönderiliyor...';

            try {
                // Dosya yükleme simülasyonu
                const verificationDocuments = [];
                for (const [docType, file] of Object.entries(tempVerificationFiles)) {
                    const simulatedUrl = `simulated/storage/path/${docType}_${Date.now()}.${file.name.split('.').pop()}`;
                    verificationDocuments.push({
                        type: docType,
                        fileName: file.name,
                        url: simulatedUrl,
                        uploadedAt: Date.now()
                    });
                }

                // Firestore'a kaydet
                await firebase.firestore()
                    .collection('artifacts')
                    .doc(__app_id)
                    .collection('users')
                    .doc(contractorUserId)
                    .update({
                        verificationStatus: 'pending',
                        verificationDocuments: verificationDocuments,
                        submittedAt: firebase.firestore.FieldValue.serverTimestamp(),
                        isVerified: false
                    });

                showNotification('Doğrulama talebiniz başarıyla gönderildi. En kısa sürede incelenecektir.', 'success');
                updateVerificationStatusUI('pending');
            } catch (error) {
                console.error('Doğrulama talebi gönderilirken hata:', error);
                showNotification('Doğrulama talebi gönderilirken bir hata oluştu.', 'error');
                submitButton.disabled = false;
                submitButton.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>Doğrulama Talebi Gönder';
            }
        }

        // Firebase Firestore Dinleyicisi
        function setupVerificationListener() {
            if (!contractorUserId) return;

            firebase.firestore()
                .collection('artifacts')
                .doc(__app_id)
                .collection('users')
                .doc(contractorUserId)
                .onSnapshot(doc => {
                    if (doc.exists) {
                        const data = doc.data();
                        if (data.verificationStatus) {
                            updateVerificationStatusUI(data.verificationStatus, data.rejectionReason);
                        }
                    }
                }, error => {
                    console.error('Doğrulama durumu dinlenirken hata:', error);
                });
        }

        let selectedSupportTopic = null;

        function openSupportTopicModal() {
            selectedSupportTopic = null;
            document.getElementById('start-chat-btn').disabled = true;
            showModal('support-topic-modal');
        }

        function selectSupportTopic(topic) {
            selectedSupportTopic = topic;
            document.getElementById('start-chat-btn').disabled = false;

            // Remove active state from all buttons
            document.querySelectorAll('#support-topic-modal button').forEach(btn => {
                btn.classList.remove('border-primary', 'bg-primary/5');
            });

            // Add active state to selected button
            event.currentTarget.classList.add('border-primary', 'bg-primary/5');
        }

        function startChat() {
            if (!selectedSupportTopic) {
                showNotification('Lütfen bir destek konusu seçin.', 'warning');
                return;
            }

            closeModal('support-topic-modal');

            // Initialize chat history if empty
            if (!appData.liveSupportChatHistory) {
                appData.liveSupportChatHistory = [];
            }

            // Add initial message
            appData.liveSupportChatHistory = [{
                sender: 'support',
                text: `Merhaba, DönüşümAY canlı desteğe hoş geldiniz! "${selectedSupportTopic}" konusunda size nasıl yardımcı olabilirim?`,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }];

            // Show the live support modal
            showModal('live-support-modal');
            renderLiveSupportMessages();
        }

        // Location management functions for project design modal
        const projectDesignLocationData = {
            istanbul: ['Kadıköy', 'Beşiktaş', 'Şişli', 'Beyoğlu', 'Üsküdar'],
            ankara: ['Çankaya', 'Kızılay', 'Ulus', 'Bahçelievler'],
            izmir: ['Konak', 'Karşıyaka', 'Bornova', 'Buca'],
            bursa: ['Osmangazi', 'Nilüfer', 'Yıldırım'],
            antalya: ['Muratpaşa', 'Konyaaltı', 'Kepez']
        };

        const projectDesignNeighborhoodData = {
            'Kadıköy': ['Moda', 'Caferağa', 'Fenerbahçe'],
            'Beşiktaş': ['Etiler', 'Levent', 'Ortaköy'],
            'Çankaya': ['Kızılay', 'Bahçelievler', 'Çukurambar'],
            'Konak': ['Alsancak', 'Göztepe', 'Güzelyalı'],
            'Osmangazi': ['Soğanlı', 'Hamitler', 'Panayır']
        };

        function updateProjectDesignDistricts() {
            const citySelect = document.getElementById('project-design-city');
            const districtSelect = document.getElementById('project-design-district');
            const neighborhoodSelect = document.getElementById('project-design-neighborhood');
            
            const selectedCity = citySelect.value;
            
            // Clear districts and neighborhoods
            districtSelect.innerHTML = '<option value="">İlçe seçiniz</option>';
            neighborhoodSelect.innerHTML = '<option value="">Önce ilçe seçiniz</option>';
            
            if (selectedCity && projectDesignLocationData[selectedCity]) {
                projectDesignLocationData[selectedCity].forEach(district => {
                    const option = document.createElement('option');
                    option.value = district.toLowerCase().replace(' ', '');
                    option.textContent = district;
                    districtSelect.appendChild(option);
                });
            }
        }

        function updateProjectDesignNeighborhoods() {
            const districtSelect = document.getElementById('project-design-district');
            const neighborhoodSelect = document.getElementById('project-design-neighborhood');
            
            const selectedDistrict = districtSelect.options[districtSelect.selectedIndex].text;
            
            // Clear neighborhoods
            neighborhoodSelect.innerHTML = '<option value="">Mahalle seçiniz</option>';
            
            if (selectedDistrict && projectDesignNeighborhoodData[selectedDistrict]) {
                projectDesignNeighborhoodData[selectedDistrict].forEach(neighborhood => {
                    const option = document.createElement('option');
                    option.value = neighborhood.toLowerCase().replace(' ', '');
                    option.textContent = neighborhood;
                    neighborhoodSelect.appendChild(option);
                });
            }
        }

        function queryProjectParcel() {
            const ada = document.getElementById('project-design-ada').value;
            const parsel = document.getElementById('project-design-parsel').value;
            const city = document.getElementById('project-design-city').value;
            const district = document.getElementById('project-design-district').value;

            if (!ada || !parsel || !city || !district) {
                showNotification('Lütfen il, ilçe, ada ve parsel bilgilerini girin.', 'warning');
                return;
            }

            // Simüle edilmiş parsel sorgulaması
            showNotification('Parsel sorgulanıyor...', 'info');
            
            setTimeout(() => {
                // Simüle edilmiş başarılı sonuç
                showNotification(`Ada: ${ada}, Parsel: ${parsel} başarıyla doğrulandı. Parsel bilgileri geçerli.`, 'success');
            }, 2000);
        }

        // Project Design Listing Functions
        function openProjectDesignListingModal(offerId) {
            const modal = document.getElementById('project-design-listing-modal');
            modal.querySelector('.bg-white').dataset.offerId = offerId;
            
            // Tekliften daire sayısını ve proje alanını al ve otomatik doldur
            const offer = appData.acceptedOffers.find(o => o.id === offerId);
            if (offer) {
                document.getElementById('apartment-count-display').value = offer.apartmentCount;
                // Proje alanını otomatik doldur
                document.getElementById('project-design-area').value = offer.plotArea;
                // Form'u sıfırla
                document.getElementById('price-per-apartment').value = '';
                document.getElementById('total-budget-display').value = '';
            }
            
            showModal('project-design-listing-modal');
        }

        // Toplam bütçe hesaplama fonksiyonu
        function calculateTotalBudget() {
            const apartmentCount = parseInt(document.getElementById('apartment-count-display').value) || 0;
            const pricePerApartment = parseInt(document.getElementById('price-per-apartment').value) || 0;
            const totalBudget = apartmentCount * pricePerApartment;
            
            document.getElementById('total-budget-display').value = totalBudget;
        }

        // Proje dosya yükleme işlevselliği
        let uploadedProjectFiles = [];
        let selectedProjectRequirements = [];

        // Gereksinim listesi
        const projectRequirements = {
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

        function toggleRequirement(requirementKey) {
            const button = document.querySelector(`[data-requirement="${requirementKey}"]`);
            const isSelected = selectedProjectRequirements.includes(requirementKey);

            if (isSelected) {
                // Seçimi kaldır
                selectedProjectRequirements = selectedProjectRequirements.filter(req => req !== requirementKey);
                button.classList.remove('bg-purple-100', 'border-purple-500', 'text-purple-700');
                button.classList.add('border-gray-300');
            } else {
                // Seçim ekle
                selectedProjectRequirements.push(requirementKey);
                button.classList.remove('border-gray-300');
                button.classList.add('bg-purple-100', 'border-purple-500', 'text-purple-700');
            }

            updateSelectedRequirementsDisplay();
        }

        function updateSelectedRequirementsDisplay() {
            const container = document.getElementById('selected-requirements');
            const list = document.getElementById('selected-requirements-list');

            if (selectedProjectRequirements.length === 0) {
                container.classList.add('hidden');
                return;
            }

            container.classList.remove('hidden');
            list.innerHTML = selectedProjectRequirements.map(reqKey => {
                const req = projectRequirements[reqKey];
                return `
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        <i class="${req.icon} mr-1"></i>
                        ${req.name}
                        <button onclick="toggleRequirement('${reqKey}')" class="ml-2 text-purple-600 hover:text-purple-800">
                            <i class="fas fa-times"></i>
                        </button>
                    </span>
                `;
            }).join('');
        }

        document.addEventListener('DOMContentLoaded', function() {
            // Project dosya yükleme event listener'ı
            const projectFileInput = document.getElementById('project-design-files');
            if (projectFileInput) {
                projectFileInput.addEventListener('change', function(e) {
                    handleProjectFileUpload(e.target.files);
                });
            }

            // Proje modal için sürükle-bırak işlevselliği
            const projectDropZone = document.querySelector('#project-design-listing-modal .border-dashed');
            if (projectDropZone) {
                projectDropZone.addEventListener('dragover', function(e) {
                    e.preventDefault();
                    this.classList.add('border-purple-400', 'bg-purple-50');
                });

                projectDropZone.addEventListener('dragleave', function(e) {
                    e.preventDefault();
                    this.classList.remove('border-purple-400', 'bg-purple-50');
                });

                projectDropZone.addEventListener('drop', function(e) {
                    e.preventDefault();
                    this.classList.remove('border-purple-400', 'bg-purple-50');
                    const files = e.dataTransfer.files;
                    handleProjectFileUpload(files);
                });
            }
        });

        function handleProjectFileUpload(files) {
            Array.from(files).forEach(file => {
                if (uploadedProjectFiles.length >= 10) {
                    showNotification('En fazla 10 dosya yükleyebilirsiniz.', 'warning');
                    return;
                }
                
                uploadedProjectFiles.push(file);
                addProjectFileToPreview(file);
            });
        }

        function addProjectFileToPreview(file) {
            const preview = document.getElementById('project-uploaded-files-preview');
            const fileDiv = document.createElement('div');
            fileDiv.className = 'flex items-center justify-between p-2 bg-gray-50 rounded-lg border';
            
            const fileSize = (file.size / 1024 / 1024).toFixed(2);
            const fileIcon = getProjectFileIcon(file.type);
            
            fileDiv.innerHTML = `
                <div class="flex items-center space-x-2">
                    <i class="${fileIcon} text-blue-600"></i>
                    <div>
                        <p class="text-sm font-medium text-gray-900">${file.name}</p>
                        <p class="text-xs text-gray-500">${fileSize} MB</p>
                    </div>
                </div>
                <button onclick="removeProjectFile('${file.name}')" class="text-red-500 hover:text-red-700">
                    <i class="fas fa-times"></i>
                </button>
            `;
            
            preview.appendChild(fileDiv);
        }

        function getProjectFileIcon(fileType) {
            if (fileType.includes('pdf')) return 'fas fa-file-pdf';
            if (fileType.includes('image')) return 'fas fa-file-image';
            if (fileType.includes('word') || fileType.includes('document')) return 'fas fa-file-word';
            if (fileType.includes('dwg') || fileType.includes('autocad')) return 'fas fa-drafting-compass';
            return 'fas fa-file';
        }

        function removeProjectFile(fileName) {
            uploadedProjectFiles = uploadedProjectFiles.filter(file => file.name !== fileName);
            renderProjectFilePreview();
        }

        function renderProjectFilePreview() {
            const preview = document.getElementById('project-uploaded-files-preview');
            preview.innerHTML = '';
            uploadedProjectFiles.forEach(file => addProjectFileToPreview(file));
        }

        function publishProjectDesignListing() {
            const modal = document.getElementById('project-design-listing-modal');
            const offerId = modal.querySelector('.bg-white').dataset.offerId;
            const projectType = document.getElementById('project-design-type').value;
            const projectArea = document.getElementById('project-design-area').value;
            const description = document.getElementById('project-design-description').value;
            const additionalNotes = document.getElementById('project-additional-notes').value;
            const deadline = document.getElementById('project-design-deadline').value;
            const apartmentCount = document.getElementById('apartment-count-display').value;
            const pricePerApartment = document.getElementById('price-per-apartment').value;
            const totalBudget = document.getElementById('total-budget-display').value;
            
            // Konum bilgileri
            const city = document.getElementById('project-design-city').value;
            const district = document.getElementById('project-design-district').value;
            const neighborhood = document.getElementById('project-design-neighborhood').value;
            const address = document.getElementById('project-design-address').value;
            
            // Ada ve parsel bilgileri
            const ada = document.getElementById('project-design-ada').value;
            const parsel = document.getElementById('project-design-parsel').value;
            const pafta = document.getElementById('project-design-pafta').value;

            if (!projectArea || !description || !deadline || !pricePerApartment || !totalBudget || !ada || !parsel) {
                showNotification('Lütfen zorunlu alanları doldurun. (Proje alanı, açıklama, teslim süresi, bütçe bilgileri, ada ve parsel)', 'warning');
                return;
            }

            if (parseInt(pricePerApartment) <= 0) {
                showNotification('Daire başı fiyat 0\'dan büyük olmalıdır.', 'error');
                return;
            }

            // In a real app, this would make an API call to create the listing
            const listing = {
                offerId: offerId,
                projectType: projectType,
                projectArea: parseInt(projectArea),
                description: description,
                selectedRequirements: selectedProjectRequirements.map(reqKey => projectRequirements[reqKey].name),
                additionalNotes: additionalNotes,
                deadline: parseInt(deadline),
                apartmentCount: parseInt(apartmentCount),
                pricePerApartment: parseInt(pricePerApartment),
                totalBudget: parseInt(totalBudget),
                // Konum bilgileri
                location: {
                    city: city,
                    district: district,
                    neighborhood: neighborhood,
                    address: address
                },
                // Ada ve parsel bilgileri
                parcelInfo: {
                    ada: parseInt(ada) || 0,
                    parsel: parseInt(parsel) || 0,
                    pafta: pafta || ''
                },
                uploadedFiles: uploadedProjectFiles.map(file => ({
                    name: file.name,
                    size: file.size,
                    type: file.type
                })),
                createdAt: new Date().toISOString(),
                status: 'active'
            };

            // For demo purposes, we'll just show a success message
            closeModal('project-design-listing-modal');
            
            // Başarı mesajı
            const fileCount = uploadedProjectFiles.length;
            const requirementCount = selectedProjectRequirements.length;
            let successMessage = `Proje çizim ilanınız başarıyla yayınlandı! (${apartmentCount} daire, daire başı ${parseInt(pricePerApartment).toLocaleString('tr-TR')} ₺, toplam ${parseInt(totalBudget).toLocaleString('tr-TR')} ₺)`;
            
            if (requirementCount > 0) {
                successMessage += ` ${requirementCount} gereksinim seçildi.`;
            }
            if (fileCount > 0) {
                successMessage += ` ${fileCount} dosya yüklendi.`;
            }
            showNotification(successMessage, 'success');

            // Reset form ve dosyalar
            document.getElementById('project-design-area').value = '';
            document.getElementById('project-design-description').value = '';
            document.getElementById('project-additional-notes').value = '';
            document.getElementById('project-design-deadline').value = '30';
            document.getElementById('price-per-apartment').value = '';
            document.getElementById('total-budget-display').value = '';
            
            // Konum alanlarını sıfırla
            document.getElementById('project-design-city').value = '';
            document.getElementById('project-design-district').innerHTML = '<option value="">Önce il seçiniz</option>';
            document.getElementById('project-design-neighborhood').innerHTML = '<option value="">Önce ilçe seçiniz</option>';
            document.getElementById('project-design-address').value = '';
            
            // Ada ve parsel alanlarını sıfırla
            document.getElementById('project-design-ada').value = '';
            document.getElementById('project-design-parsel').value = '';
            document.getElementById('project-design-pafta').value = '';
            
            // Gereksinim seçimlerini temizle
            selectedProjectRequirements = [];
            document.querySelectorAll('.requirement-btn').forEach(btn => {
                btn.classList.remove('bg-purple-100', 'border-purple-500', 'text-purple-700');
                btn.classList.add('border-gray-300');
            });
            document.getElementById('selected-requirements').classList.add('hidden');
            
            uploadedProjectFiles = [];
            document.getElementById('project-uploaded-files-preview').innerHTML = '';
        }

        // İlanlarım Functions
        // İlanlarım Functions
        let temporaryImageFiles = [];
        let temporaryDeedFiles = {};

        function openCreateListingModal() {
            document.getElementById('listing-form').reset();
            document.getElementById('listing-modal-title').textContent = 'Yeni İlan Oluştur';
            document.getElementById('save-listing-button').textContent = 'İlanı Oluştur';
            document.getElementById('listing-id-input').value = '';
            document.getElementById('image-preview-container').innerHTML = '';
            temporaryImageFiles = [];
            temporaryDeedFiles = {};
            handleCoOwnerCountChange(1); // Reset to 1 owner
            document.getElementById('co-owner-count').value = 1;
            openModal('create-listing-modal');
        }

        function renderContractorListings() {
            const container = document.getElementById('contractor-listings-list');
            if (!container) return;

            const activeListings = appData.contractorListings || [];

            if (activeListings.length === 0) {
                container.innerHTML = `<div class="col-span-full text-center py-12 bg-white rounded-lg shadow-sm border">
                    <i class="fas fa-folder-open fa-3x text-gray-300 mb-4"></i>
                    <h3 class="text-xl font-semibold text-gray-700">Henüz aktif bir ilanınız bulunmuyor.</h3>
                    <p class="text-gray-500 mt-2">"Yeni İlan Oluştur" butonuna tıklayarak ilk ilanınızı oluşturabilirsiniz.</p>
                </div>`;
                return;
            }

            container.innerHTML = activeListings.map(listing => {
                const firstImage = listing.images && listing.images.length > 0 ? listing.images[0] : 'https://placehold.co/600x400/e2e8f0/a0aec0?text=Görsel+Yok';

                // İmar çapı durumu için rozet
                const imarCapiStatusBadge = getImarCapiStatusBadge(listing.imarCapiProcessStatus || 'not_started');
                const imarCapiButton = getImarCapiButton(listing);

                return `
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                    <img src="${firstImage}" alt="${listing.title}" class="h-48 w-full object-cover">
                    <div class="p-5 flex-grow flex flex-col">
                        <div class="flex justify-between items-start mb-3">
                            <h4 class="font-bold text-lg text-gray-800">${listing.title}</h4>
                            ${imarCapiStatusBadge}
                        </div>
                        <p class="text-sm text-gray-500 mb-3">${listing.location.il}, ${listing.location.ilce}</p>
                        
                        <div class="space-y-2 mb-4">
                            <div class="flex justify-between text-sm">
                                <span class="text-gray-600">Arsa Alanı:</span>
                                <span class="font-medium">${listing.parcelInfo.area} m²</span>
                            </div>
                            <div class="flex justify-between text-sm">
                                <span class="text-gray-600">Planlanan Daire:</span>
                                <span class="font-medium">${listing.expectedUnits || 'Belirlenmedi'} adet</span>
                            </div>
                        </div>

                        <div class="flex flex-wrap gap-2 mb-4">
                            <span class="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">
                                ${listing.type || 'Konut'}
                            </span>
                            <a href="#" onclick="showSection('offers-section'); return false;" 
                                class="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs hover:bg-blue-200 transition-colors">
                                ${listing.offersCount || 0} Teklif
                            </a>
                        </div>

                        <div class="mt-auto pt-4 border-t border-gray-100 grid grid-cols-2 gap-2">
                            <div class="grid grid-cols-2 gap-2">
                                <button onclick="openListingDetailsModal(${listing.id})" 
                                    class="text-sm bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                                    Detaylar
                                </button>
                                <button onclick="openEditListingModal(${listing.id})" 
                                    class="text-sm bg-blue-100 text-blue-700 py-2 rounded-lg hover:bg-blue-200 transition-colors">
                                    Revize Et
                                </button>
                            </div>
                            <div class="grid grid-cols-2 gap-2">
                                ${imarCapiButton}
                                <button onclick="openCancelListingModal(${listing.id})" 
                                    class="text-sm bg-red-100 text-red-700 py-2 rounded-lg hover:bg-red-200 transition-colors">
                                    İptal Et
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                `;
            }).join('');
        }

        function getImarCapiStatusBadge(status) {
            const statusConfig = {
                'not_started': { text: 'İmar Çapı Bekleniyor', class: 'bg-gray-100 text-gray-600' },
                'docs_uploaded': { text: 'Belgeler Yüklendi', class: 'bg-blue-100 text-blue-800' },
                'payment_completed': { text: 'Ödeme Tamamlandı', class: 'bg-yellow-100 text-yellow-800' },
                'imar_ready': { text: 'İmar Çapı Hazır', class: 'bg-green-100 text-green-800' }
            };

            const config = statusConfig[status] || statusConfig.not_started;
            return `<span class="px-2 py-1 rounded-full text-xs font-medium ${config.class}">${config.text}</span>`;
        }

        function getImarCapiButton(listing) {
            const buttonConfig = {
                'not_started': { text: 'İmar Çapı Başlat', class: 'bg-purple-600 hover:bg-purple-700 text-white' },
                'docs_uploaded': { text: 'İmar Çapı Takip', class: 'bg-blue-600 hover:bg-blue-700 text-white' },
                'payment_completed': { text: 'İmar Çapı Takip', class: 'bg-yellow-600 hover:bg-yellow-700 text-white' },
                'imar_ready': { text: 'İmar Çapını İndir', class: 'bg-green-600 hover:bg-green-700 text-white' },
                'default': { text: 'İmar Çapı Başlat', class: 'bg-purple-600 hover:bg-purple-700 text-white' }
            };

            const config = buttonConfig[listing.imarCapiProcessStatus] || buttonConfig.default;
            return `
                <button 
                    onclick="openImarCapiProcessModal(${listing.id})"
                    class="text-sm ${config.class} py-2 rounded-lg transition-colors">
                    ${config.text}
                </button>
            `;
        }

        function openListingDetailsModal(listingId) {
            const listing = appData.contractorListings.find(l => l.id === listingId);
            if (!listing) return;

            document.getElementById('details-modal-title').textContent = listing.title;
            const body = document.getElementById('details-modal-body');

            let imagesHtml = '<p class="text-gray-500">Yüklenmiş görsel bulunmuyor.</p>';
            if (listing.images && listing.images.length > 0) {
                imagesHtml = `<div class="grid grid-cols-2 md:grid-cols-3 gap-4">` +
                    listing.images.map(img => `
                    <a href="${img}" target="_blank">
                        <img src="${img}" class="w-full h-32 object-cover rounded-lg border hover:opacity-80 transition-opacity">
                    </a>
                `).join('') + `</div>`;
            }

            // İmar çapı durumu için rozet
            const imarCapiStatusBadge = getImarCapiStatusBadge(listing.imarCapiProcessStatus || 'not_started');
            const imarCapiButton = getImarCapiButton(listing);

            body.innerHTML = `
                <div class="space-y-4">
                    <div>
                        <h4 class="font-semibold text-gray-700">Açıklama</h4>
                        <p>${listing.description}</p>
                    </div>
                    <div>
                        <h4 class="font-semibold text-gray-700">Tapu Bilgileri</h4>
                        <p>Konum: ${listing.location.il} / ${listing.location.ilce} / ${listing.location.mahalle}</p>
                        <p>Ada/Parsel: ${listing.parcelInfo.ada} / ${listing.parcelInfo.parsel}</p>
                        <p>Arsa Alanı: ${listing.parcelInfo.area} m²</p>
                    </div>
                    <div>
                        <h4 class="font-semibold text-gray-700 mb-2">İmar Çapı Durumu</h4>
                        <div class="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                            <div class="flex items-center space-x-3">
                                ${imarCapiStatusBadge}
                                ${listing.aplikasyonKrokisiUrl ? `
                                    <span class="text-green-600 text-sm"><i class="fas fa-check-circle mr-1"></i>Aplikasyon Krokisi Hazır</span>
                                ` : ''}
                                ${listing.imarCapiUrl ? `
                                    <span class="text-green-600 text-sm"><i class="fas fa-check-circle mr-1"></i>İmar Çapı Hazır</span>
                                ` : ''}
                            </div>
                            ${imarCapiButton}
                        </div>
                    </div>
                    <div>
                        <h4 class="font-semibold text-gray-700 mb-2">Görseller</h4>
                        ${imagesHtml}
                    </div>
                </div>
            `;
            openModal('listing-details-modal');
        }

        function openCancelListingModal(listingId) {
            document.getElementById('cancel-listing-id-input').value = listingId;
            openModal('cancel-listing-modal');
        }

        function confirmCancelListing() {
            const listingId = parseInt(document.getElementById('cancel-listing-id-input').value);
            const listingIndex = appData.contractorListings.findIndex(l => l.id === listingId);

            if (listingIndex !== -1) {
                // Mark as cancelled
                appData.contractorListings[listingIndex].status = 'cancelled';
                showNotification('İlan başarıyla iptal edildi.', 'success');
            } else {
                showNotification('Hata: İlan bulunamadı.', 'error');
            }

            closeModal('cancel-listing-modal');
            renderContractorListings();
        }

        function getImarCapiButtonOld(listing) {
            if (listing.imarCapiProcessStatus === 'not_started') {
                return `<button onclick="openImarCapiProcessModal(${listing.id})" class="text-sm bg-purple-100 text-purple-700 py-2 rounded-lg hover:bg-purple-200 transition-colors">İmar Çapı Al</button>`;
            } else if (listing.imarCapiProcessStatus === 'imar_ready') {
                return `<button onclick="downloadImarCapi(${listing.id})" class="text-sm bg-green-100 text-green-700 py-2 rounded-lg hover:bg-green-200 transition-colors">İmar Çapı İndir</button>`;
            } else {
                return `<button onclick="openImarCapiProcessModal(${listing.id})" class="text-sm bg-yellow-100 text-yellow-700 py-2 rounded-lg hover:bg-yellow-200 transition-colors">İmar Çapı Takip</button>`;
            }
        }

        function createListing() {
            const newListing = {
                id: Date.now(),
                title: document.getElementById('listing-title').value,
                description: document.getElementById('listing-description').value,
                location: {
                    il: document.getElementById('parcel-il').value,
                    ilce: document.getElementById('parcel-ilce').value,
                    mahalle: document.getElementById('parcel-mahalle').value,
                },
                parcelInfo: {
                    ada: document.getElementById('parcel-ada').value,
                    parsel: document.getElementById('parcel-parsel').value,
                    area: document.getElementById('listing-area').value,
                },
                images: [], // Will be filled
                coOwners: [], // Will be filled
                status: 'active',
                offersCount: 0,
                // İmar çapı alanları
                imarCapiProcessStatus: 'not_started',
                aplikasyonKrokisiDocs: [],
                aplikasyonKrokisiUrl: '',
                imarCapiDocs: [],
                imarCapiFeePaid: false,
                imarCapiUrl: '',
            };

            // Add current user as first owner
            const currentUser = appData.contractorName || 'Müteahhit';
            newListing.coOwners.push({
                id: `owner-${Date.now()}-0`, isCurrentUser: true, name: currentUser, email: currentUserId,
                tcKimlik: '11111111111', phoneNumber: '5551112233',
                tapuDocumentUrl: '', isVerified: true, approvalStatus: 'approved', approvalLink: null
            });

            // Add other co-owners from the form
            const coOwnerCards = document.querySelectorAll('#co-owner-invites-container .co-owner-card');
            coOwnerCards.forEach((card, index) => {
                const ownerIndex = index + 1;
                const coOwnerId = `owner-${newListing.id}-${ownerIndex}`;
                const newCoOwner = {
                    id: coOwnerId,
                    isCurrentUser: false,
                    name: card.querySelector(`[name='co-owner-name']`).value,
                    email: '', // In a real app, you might ask for this
                    tcKimlik: card.querySelector(`[name='co-owner-tc']`).value,
                    phoneNumber: card.querySelector(`[name='co-owner-phone']`).value,
                    tapuDocumentUrl: temporaryDeedFiles[ownerIndex] ? `uploads/${temporaryDeedFiles[ownerIndex].name}` : '',
                    isVerified: false,
                    approvalStatus: 'pending',
                    approvalLink: generateApprovalLink(newListing.id, coOwnerId),
                };
                newListing.coOwners.push(newCoOwner);
            });

            // Handle image uploads
            const parcelMapImage = temporaryImageFiles.find(img => img.isParcelMap);
            const userImages = temporaryImageFiles.filter(img => !img.isParcelMap).map(file => URL.createObjectURL(file));
            newListing.images = parcelMapImage ? [parcelMapImage.url, ...userImages] : userImages;

            // Add listing to data
            if (!appData.contractorListings) {
                appData.contractorListings = [];
            }
            appData.contractorListings.push(newListing);

            // Close modal and show success notification
            closeModal('create-listing-modal');
            showNotification('İlan başarıyla oluşturuldu! İmar çapı işlemlerini başlatabilirsiniz.', 'success');

            // Render updated listings
            renderContractorListings();

            // Ask user if they want to start imar çapı process
            setTimeout(() => {
                if (confirm('İlanınız başarıyla oluşturuldu. İmar çapı sürecini şimdi başlatmak ister misiniz?')) {
                    openImarCapiProcessModal(newListing.id);
                }
            }, 500);
        }

        function updateListing(listingId) {
            const listingIndex = appData.contractorListings.findIndex(l => l.id === listingId);
            if (listingIndex === -1) return;

            const listing = appData.contractorListings[listingIndex];

            // Update basic info
            listing.title = document.getElementById('listing-title').value;
            listing.description = document.getElementById('listing-description').value;
            listing.location = {
                il: document.getElementById('parcel-il').value,
                ilce: document.getElementById('parcel-ilce').value,
                mahalle: document.getElementById('parcel-mahalle').value,
            };
            listing.parcelInfo = {
                ada: document.getElementById('parcel-ada').value,
                parsel: document.getElementById('parcel-parsel').value,
                area: document.getElementById('listing-area').value,
            };

            // Update co-owners - this is complex. For this demo, we won't fully implement co-owner editing.
            // A real app would need to handle adding, removing, and updating existing co-owners carefully.
            console.log("Co-owner updating is not fully implemented in this demo.");

            // Add new user-uploaded images
            const newImageUrls = temporaryImageFiles.filter(img => !img.isParcelMap).map(file => URL.createObjectURL(file));

            // Keep existing non-map images and add new ones
            const existingUserImages = listing.images.filter(url => !url.includes('Parsel+Haritas'));
            listing.images = [...existingUserImages, ...newImageUrls];

            // Ensure map image is still at the start if it exists
            const parcelMapImageFromTemp = temporaryImageFiles.find(img => img.isParcelMap);
            const existingMapImage = listing.images.find(url => url.includes('Parsel+Haritas'));

            // If a new map image was queried, it replaces the old one.
            if (parcelMapImageFromTemp) {
                // Remove old map image if it exists
                const nonMapImages = listing.images.filter(url => !url.includes('Parsel+Haritas'));
                listing.images = [parcelMapImageFromTemp.url, ...nonMapImages];
            } else if (existingMapImage) {
                // Ensure existing map image stays at the front
                const nonMapImages = listing.images.filter(url => !url.includes('Parsel+Haritas'));
                listing.images = [existingMapImage, ...nonMapImages];
            }

            // Preserve imar çapı fields
            // These fields should not be editable directly, they are managed through the imar çapı process
            const imarCapiFields = [
                'imarCapiProcessStatus',
                'aplikasyonKrokisiDocs',
                'aplikasyonKrokisiUrl',
                'imarCapiDocs',
                'imarCapiFeePaid',
                'imarCapiUrl'
            ];

            // Keep existing imar çapı data
            imarCapiFields.forEach(field => {
                if (listing[field] === undefined) {
                    listing[field] = listing[field] || (field.includes('Docs') ? [] : '');
                }
            });

            renderContractorListings();
            closeModal('create-listing-modal');
            showNotification('İlan başarıyla güncellendi!', 'success');
        }

        function openEditListingModal(listingId) {
            const listing = appData.contractorListings.find(l => l.id === listingId);
            if (!listing) return;

            document.getElementById('listing-form').reset();
            document.getElementById('listing-modal-title').textContent = 'İlanı Revize Et';
            document.getElementById('save-listing-button').textContent = 'Değişiklikleri Kaydet';
            document.getElementById('listing-id-input').value = listing.id;

            // Fill form
            document.getElementById('parcel-il').value = listing.location.il;
            document.getElementById('parcel-ilce').value = listing.location.ilce;
            document.getElementById('parcel-mahalle').value = listing.location.mahalle;
            document.getElementById('parcel-ada').value = listing.parcelInfo.ada;
            document.getElementById('parcel-parsel').value = listing.parcelInfo.parsel;
            document.getElementById('listing-title').value = listing.title;
            document.getElementById('listing-area').value = listing.parcelInfo.area;
            document.getElementById('listing-description').value = listing.description;

            // Render existing images
            const previewContainer = document.getElementById('image-preview-container');
            previewContainer.innerHTML = '';
            listing.images.forEach((imgUrl, index) => {
                // This logic is simplified; a real app might need to differentiate map vs user images better
                const isParcelMap = imgUrl.includes('Parsel+Haritas');
                appendImagePreview(imgUrl, index, 'existing', isParcelMap, listing.id);
            });
            temporaryImageFiles = []; // Reset temporary files
            temporaryDeedFiles = {};

            // Render co-owners
            document.getElementById('co-owner-count').value = listing.coOwners ? listing.coOwners.length : 1;
            handleCoOwnerCountChange();
            // Populate co-owner fields after they are rendered
            if (listing.coOwners) {
                setTimeout(() => {
                    listing.coOwners.forEach((owner, index) => {
                        if (index === 0) return; // Skip current user
                        document.querySelector(`#co-owner-card-${index} [name='co-owner-name']`).value = owner.name;
                        document.querySelector(`#co-owner-card-${index} [name='co-owner-tc']`).value = owner.tcKimlik;
                        document.querySelector(`#co-owner-card-${index} [name='co-owner-phone']`).value = owner.phoneNumber;
                        const fileInfo = document.getElementById(`deed-file-info-${index}`);
                        if (fileInfo && owner.tapuDocumentUrl) {
                            fileInfo.textContent = `Mevcut Belge: ${owner.tapuDocumentUrl.split('/').pop()}`;
                            fileInfo.classList.remove('hidden');
                        }
                        if (owner.isVerified) {
                            const verifyBtn = document.getElementById(`verify-btn-${index}`);
                            verifyBtn.innerHTML = '<i class="fas fa-check-circle text-green-500 mr-2"></i>Doğrulandı';
                            verifyBtn.disabled = true;
                        }
                    });
                }, 100);
            }

            openModal('create-listing-modal');
        }

        function createOrUpdateListing() {
            const listingId = document.getElementById('listing-id-input').value;
            if (listingId) {
                updateListing(parseInt(listingId));
            } else {
                createListing();
            }
        }

        function handleImageUpload(event) {
            const files = event.target.files;
            const previewContainer = document.getElementById('image-preview-container');

            for (const file of files) {
                if (!file.type.startsWith('image/')) continue;

                const reader = new FileReader();
                reader.onload = (e) => {
                    const fileIndex = temporaryImageFiles.push({ file: file, url: e.target.result, isParcelMap: false }) - 1;
                    appendImagePreview(e.target.result, fileIndex, 'temp');
                };
                reader.readAsDataURL(file);
            }
        }

        function appendImagePreview(imageUrl, index, type, isParcelMap = false, listingId = null) {
            const previewContainer = document.getElementById('image-preview-container');
            const previewItem = document.createElement('div');
            previewItem.className = 'image-preview-item relative group';
            previewItem.id = `img-${type}-${index}`;

            previewItem.innerHTML = `
                <img src="${imageUrl}" class="w-full h-32 object-cover rounded-lg border">
                ${isParcelMap ? '<span class="absolute top-2 left-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Parsel Haritası</span>' : ''}
                <button onclick="removeImage(${index}, '${type}', ${listingId})" 
                    class="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center shadow-lg">
                    <i class="fas fa-times"></i>
                </button>
            `;

            previewContainer.appendChild(previewItem);
        }

        function removeImage(index, type, listingId = null) {
            if (type === 'temp') {
                // When removing a temporary file, we must re-render the temp images to update their indices
                temporaryImageFiles.splice(index, 1);

                // Re-render all temporary previews to ensure `onclick` indices are correct
                const allPreviews = document.querySelectorAll('.image-preview-item');
                allPreviews.forEach(p => {
                    // Remove only temp images from DOM to avoid touching existing ones
                    if (p.id.startsWith('img-temp-')) {
                        p.remove();
                    }
                });

                temporaryImageFiles.forEach((fileData, newIndex) => {
                    // Re-append with new correct index
                    appendImagePreview(fileData.url, newIndex, 'temp', fileData.isParcelMap);
                });

            } else if (type === 'existing' && listingId) {
                const listing = appData.contractorListings.find(l => l.id === listingId);
                if (listing && listing.images[index]) {
                    listing.images.splice(index, 1);
                    // After removing from data, re-render the modal's images
                    openEditListingModal(listingId);
                }
            }
        }

        function handleCoOwnerCountChange() {
            const count = parseInt(document.getElementById('co-owner-count').value, 10);
            const container = document.getElementById('co-owner-invites-container');
            const addBtnContainer = document.getElementById('add-co-owner-button-container');
            container.innerHTML = ''; // Clear existing inputs

            if (count > 1) {
                for (let i = 1; i < count; i++) {
                    appendCoOwnerCard(i);
                }
                addBtnContainer.classList.remove('hidden');
            } else {
                addBtnContainer.classList.add('hidden');
            }
        }

        function addCoOwnerInput() {
            const countInput = document.getElementById('co-owner-count');
            const currentCount = parseInt(countInput.value, 10);
            countInput.value = currentCount + 1;
            appendCoOwnerCard(currentCount);
        }

        function removeCoOwnerInput(element) {
            const cardToRemove = element.closest('.co-owner-card');
            const ownerIndex = cardToRemove.dataset.index;
            delete temporaryDeedFiles[ownerIndex]; // Remove associated temp file
            cardToRemove.remove();

            const countInput = document.getElementById('co-owner-count');
            countInput.value = parseInt(countInput.value, 10) - 1;

            // Re-index remaining cards to keep everything in sequence
            const remainingCards = document.querySelectorAll('#co-owner-invites-container .co-owner-card');
            remainingCards.forEach((card, index) => {
                const newIndex = index + 1;
                card.dataset.index = newIndex;
                card.querySelector('.co-owner-title').textContent = `Hak Sahibi ${newIndex + 1}`;
                // Update all onclick/id attributes with the new index
                card.querySelector('input[type="file"]').onchange = (event) => handleCoOwnerDocumentUpload(event, newIndex);
                card.querySelector('.verify-btn').onclick = () => verifyCoOwnerDocument(newIndex);
                card.querySelector('label').htmlFor = `deed-upload-${newIndex}`;
                card.querySelector('input[type="file"]').id = `deed-upload-${newIndex}`;
                card.querySelector('.deed-file-info').id = `deed-file-info-${newIndex}`;
                card.querySelector('.verify-btn').id = `verify-btn-${newIndex}`;
            });
        }

        function appendCoOwnerCard(index) {
            const container = document.getElementById('co-owner-invites-container');
            const card = document.createElement('div');
            card.className = 'co-owner-card bg-gray-50 p-4 rounded-lg';
            card.dataset.index = index;

            card.innerHTML = `
                <div class="flex justify-between items-center mb-3">
                    <h4 class="co-owner-title font-medium text-gray-700">Hak Sahibi ${index + 1}</h4>
                    <button type="button" onclick="removeCoOwnerInput(this)"
                        class="text-red-500 hover:text-red-700">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Ad Soyad</label>
                        <input type="text" name="co-owner-name" class="mt-1 w-full p-2 border rounded-lg">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">T.C. Kimlik No</label>
                        <input type="text" name="co-owner-tc" class="mt-1 w-full p-2 border rounded-lg"
                            maxlength="11" pattern="[0-9]{11}">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Telefon</label>
                        <input type="tel" name="co-owner-phone" class="mt-1 w-full p-2 border rounded-lg"
                            placeholder="5XX XXX XX XX">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Tapu Belgesi</label>
                        <input type="file" id="deed-upload-${index}" class="hidden" accept=".pdf,.jpg,.jpeg,.png"
                            onchange="handleCoOwnerDocumentUpload(event, ${index})">
                        <label for="deed-upload-${index}"
                            class="mt-1 w-full p-2 border rounded-lg bg-white flex items-center justify-center cursor-pointer hover:bg-gray-50">
                            <i class="fas fa-upload mr-2"></i>
                            <span>Dosya Seç</span>
                        </label>
                        <p id="deed-file-info-${index}" class="mt-1 text-sm text-gray-500 hidden"></p>
                    </div>
                </div>
                <div class="mt-4 flex justify-end">
                    <button type="button" id="verify-btn-${index}" onclick="verifyCoOwnerDocument(${index})"
                        class="bg-green-100 text-green-700 px-4 py-2 rounded-lg hover:bg-green-200">
                        <i class="fas fa-check-circle mr-2"></i>Doğrula
                    </button>
                </div>
            `;

            container.appendChild(card);
        }

        function handleCoOwnerDocumentUpload(event, ownerIndex) {
            const file = event.target.files[0];
            if (!file) return;

            temporaryDeedFiles[ownerIndex] = file;
            const fileInfo = document.getElementById(`deed-file-info-${ownerIndex}`);
            fileInfo.textContent = `Seçilen Dosya: ${file.name}`;
            fileInfo.classList.remove('hidden');
        }

        function verifyCoOwnerDocument(ownerIndex) {
            const verifyBtn = document.getElementById(`verify-btn-${ownerIndex}`);
            const originalHtml = verifyBtn.innerHTML;
            verifyBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Doğrulanıyor...';
            verifyBtn.disabled = true;

            // Simulate verification process
            setTimeout(() => {
                verifyBtn.innerHTML = '<i class="fas fa-check-circle text-green-500 mr-2"></i>Doğrulandı';
                verifyBtn.disabled = true;
                showNotification('Hak sahibi belgesi başarıyla doğrulandı.', 'success');
            }, 2000);
        }

        function queryParcel() {
            const button = document.getElementById('query-parcel-button');
            const originalHtml = button.innerHTML;
            button.innerHTML = `<i class="fas fa-spinner fa-spin mr-2"></i>Sorgulanıyor...`;
            button.disabled = true;

            setTimeout(() => {
                const il = document.getElementById('parcel-il').value;
                const ilce = document.getElementById('parcel-ilce').value;
                const ada = document.getElementById('parcel-ada').value;

                if (il && ilce && ada) {
                    const simulatedArea = Math.floor(Math.random() * (2000 - 300 + 1) + 300);
                    document.getElementById('listing-area').value = simulatedArea;

                    const mapImageUrl = `https://placehold.co/600x400/add8e6/000000?text=Parsel+Haritası%0A${il}/${ilce}%0A${ada}/${document.getElementById('parcel-parsel').value}`;

                    // Remove any existing map image before adding a new one
                    const existingMapIndex = temporaryImageFiles.findIndex(f => f.isParcelMap);
                    if (existingMapIndex > -1) {
                        removeImage(existingMapIndex, 'temp');
                    }
                    const existingMapPreview = document.querySelector('.image-preview-item img[src*="Parsel+Haritas"]');
                    if (existingMapPreview) {
                        existingMapPreview.closest('.image-preview-item').remove();
                    }

                    // Add map image to temporary files and preview
                    const mapImageIndex = temporaryImageFiles.push({ file: null, url: mapImageUrl, isParcelMap: true }) - 1;
                    appendImagePreview(mapImageUrl, mapImageIndex, 'temp', true);

                    showNotification(`Parsel bilgileri bulundu. Arsa Alanı: ${simulatedArea} m²`, 'success');
                } else {
                    showNotification('Lütfen sorgu için en azından İl, İlçe ve Ada bilgilerini girin.', 'warning');
                }

                button.innerHTML = originalHtml;
                button.disabled = false;
            }, 1500);
        }

        function generateApprovalLink(listingId, coOwnerId) {
            return `https://donusumay.com/approve/${listingId}/${coOwnerId}`;
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
        // İmar Çapı Modal Yönetimi
        let uploadedDocuments = {};
        let selectedPaymentMethod = null;
        let currentProjectIdImarCapi = null;

        function openImarCapiProcessModal(projectId) {
            currentProjectIdImarCapi = projectId;
            const project = appData.contractorListings.find(p => p.id === projectId);

            if (!project) {
                showNotification('Proje bulunamadı.', 'error');
                return;
            }

            // Modal başlığını güncelle
            document.getElementById('imar-capi-modal-title').textContent = `İmar Çapı İşlemleri - ${project.title}`;
            
            // Proje referansını güncelle
            document.getElementById('project-reference').textContent = projectId;

            // Reset form state
            uploadedDocuments = {};
            selectedPaymentMethod = null;
            resetUploadForms();

            // Mevcut duruma göre adımları göster/gizle
            updateImarCapiSteps(project);

            // İlerleme çubuğunu güncelle
            updateProgressBar(project.imarCapiProcessStatus);

            // Modalı aç
            openModal('imar-capi-process-modal');
        }

        function updateImarCapiSteps(project) {
            // Tüm adımları gizle
            document.querySelectorAll('.step-content').forEach(step => step.classList.add('hidden'));

            // Duruma göre ilgili adımı göster
            switch (project.imarCapiProcessStatus) {
                case 'not_started':
                    document.getElementById('step-1').classList.remove('hidden');
                    break;
                case 'docs_uploaded':
                    document.getElementById('step-2').classList.remove('hidden');
                    break;
                case 'payment_completed':
                    document.getElementById('step-4').classList.remove('hidden');
                    break;
                case 'imar_ready':
                    document.getElementById('step-5').classList.remove('hidden');
                    break;
            }
        }

                 function resetUploadForms() {
             // Reset file inputs
             document.getElementById('aplikasyon-krokisi').value = '';
             document.getElementById('tapu-asli').value = '';
             document.getElementById('dilekce').value = '';

             // Reset filename displays
             document.getElementById('aplikasyon-filename').textContent = 'Dosya seçilmedi';
             document.getElementById('tapu-filename').textContent = 'Dosya seçilmedi';
             document.getElementById('dilekce-filename').textContent = 'Dosya seçilmedi';

             // Reset status displays
             document.getElementById('aplikasyon-status').textContent = '';
             document.getElementById('tapu-status').textContent = '';
             document.getElementById('dilekce-status').textContent = '';

             // Reset proceed button
             document.getElementById('proceed-payment-btn').disabled = true;
         }

        function updateProgressBar(status) {
            const progressMap = {
                'not_started': 0,
                'docs_uploaded': 30,
                'payment_completed': 70,
                'imar_ready': 100
            };

            const progress = progressMap[status] || 0;
            document.getElementById('progress-bar').style.width = `${progress}%`;
        }

        // Belge Yükleme Fonksiyonları
        function handleImarCapiDocumentUpload(event, documentType, documentName) {
            const file = event.target.files[0];
            if (!file) return;

            // ID mapping for status and filename elements
            const idMapping = {
                'aplikasyon-krokisi': { status: 'aplikasyon-status', filename: 'aplikasyon-filename' },
                'tapu-asli': { status: 'tapu-status', filename: 'tapu-filename' },
                'dilekce': { status: 'dilekce-status', filename: 'dilekce-filename' }
            };

            const statusElement = document.getElementById(idMapping[documentType].status);
            const filenameElement = document.getElementById(idMapping[documentType].filename);

            // Dosya boyutu kontrolü (10MB)
            if (file.size > 10 * 1024 * 1024) {
                statusElement.innerHTML = '<span class="text-red-600"><i class="fas fa-times-circle mr-1"></i>Dosya çok büyük (Max: 10MB)</span>';
                event.target.value = '';
                return;
            }

            // Dosya türü kontrolü
            const allowedTypes = {
                'aplikasyon-krokisi': ['pdf', 'jpg', 'jpeg', 'png'],
                'tapu-asli': ['pdf', 'jpg', 'jpeg', 'png'],
                'dilekce': ['pdf', 'doc', 'docx']
            };

            const fileExtension = file.name.split('.').pop().toLowerCase();
            if (!allowedTypes[documentType] || !allowedTypes[documentType].includes(fileExtension)) {
                statusElement.innerHTML = '<span class="text-red-600"><i class="fas fa-times-circle mr-1"></i>Geçersiz dosya türü</span>';
                event.target.value = '';
                return;
            }

            // Simülasyon: Dosya yüklemesi
            statusElement.innerHTML = '<span class="text-blue-600"><i class="fas fa-spinner fa-spin mr-1"></i>Yükleniyor...</span>';
            filenameElement.textContent = file.name;

            setTimeout(() => {
                uploadedDocuments[documentType] = {
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    url: URL.createObjectURL(file) // Simülasyon için
                };

                statusElement.innerHTML = '<span class="text-green-600"><i class="fas fa-check-circle mr-1"></i>Yüklendi</span>';
                checkAllDocumentsUploaded();
            }, 1500);
        }

        function checkAllDocumentsUploaded() {
            const requiredDocs = ['aplikasyon-krokisi', 'tapu-asli', 'dilekce'];
            const uploadedCount = requiredDocs.filter(doc => uploadedDocuments[doc]).length;
            
            const proceedBtn = document.getElementById('proceed-payment-btn');
            if (uploadedCount === requiredDocs.length) {
                proceedBtn.disabled = false;
                proceedBtn.innerHTML = '<i class="fas fa-credit-card mr-2"></i>Ödeme Adımına Geç';
            } else {
                proceedBtn.disabled = true;
                proceedBtn.innerHTML = `Belge Yükleme (${uploadedCount}/${requiredDocs.length})`;
            }
        }

        // Ödeme Adımı Fonksiyonları
        function proceedToPayment() {
            // Adım 1'i gizle, Adım 2'yi göster
            document.getElementById('step-1').classList.add('hidden');
            document.getElementById('step-2').classList.remove('hidden');
            
            // İlerleme çubuğunu güncelle
            updateProgressBar('docs_uploaded');
        }

        function selectPaymentMethod(method) {
            selectedPaymentMethod = method;
            
            // Tüm seçenekleri sıfırla
            document.querySelectorAll('.payment-radio').forEach(radio => radio.classList.add('hidden'));
            document.querySelectorAll('#credit-card-option, #bank-transfer-option').forEach(option => {
                option.classList.remove('border-purple-500');
                option.classList.add('border-gray-200');
            });

            // Seçilen seçeneği vurgula
            const selectedOption = document.getElementById(method + '-option');
            selectedOption.classList.add('border-purple-500');
            selectedOption.classList.remove('border-gray-200');
            selectedOption.querySelector('.payment-radio').classList.remove('hidden');

            // Devam et butonunu etkinleştir
            document.getElementById('payment-method-btn').disabled = false;
        }

        function proceedWithPaymentMethod() {
            // Adım 2'yi gizle
            document.getElementById('step-2').classList.add('hidden');
            
            if (selectedPaymentMethod === 'credit-card') {
                document.getElementById('step-3a').classList.remove('hidden');
            } else if (selectedPaymentMethod === 'bank-transfer') {
                document.getElementById('step-3b').classList.remove('hidden');
            }
        }

        // Kredi Kartı Fonksiyonları
        function formatCardNumber(input) {
            let value = input.value.replace(/\s/g, '').replace(/\D/g, '');
            value = value.substring(0, 16); // Max 16 digits
            value = value.replace(/(.{4})/g, '$1 ').trim();
            input.value = value;
        }

        function formatExpiry(input) {
            let value = input.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            input.value = value;
        }

        function processCreditCardPayment() {
            const cardName = document.getElementById('card-name').value.trim();
            const cardNumber = document.getElementById('card-number').value.replace(/\s/g, '');
            const cardExpiry = document.getElementById('card-expiry').value;
            const cardCvv = document.getElementById('card-cvv').value;

            // Basit validasyon
            if (!cardName || cardNumber.length !== 16 || cardExpiry.length !== 5 || cardCvv.length !== 3) {
                showNotification('Lütfen tüm kart bilgilerini doğru şekilde giriniz.', 'error');
                return;
            }

            // Simülasyon: Ödeme işlemi
            showNotification('Ödeme işleniyor...', 'info');
            
            setTimeout(() => {
                // Ödeme başarılı
                completePayment('credit-card');
            }, 2000);
        }

        function completePayment(paymentMethod) {
            // Proje durumunu güncelle
            const project = appData.contractorListings.find(p => p.id === currentProjectIdImarCapi);
            if (project) {
                project.imarCapiProcessStatus = 'payment_completed';
            }

            // Adım 3'ü gizle, Adım 4'ü göster
            document.getElementById('step-3a').classList.add('hidden');
            document.getElementById('step-3b').classList.add('hidden');
            document.getElementById('step-4').classList.remove('hidden');

            // Kredi kartı ödemesi için makbuz seçeneğini göster
            if (paymentMethod === 'credit-card') {
                document.getElementById('receipt-section').classList.remove('hidden');
            }

            updateProgressBar('payment_completed');
            showNotification('Ödemeniz başarıyla tamamlandı!', 'success');
            renderContractorListings(); // Listeyi güncelle

            // 3 saniye sonra simülasyon için imar çapısını hazır yap
            setTimeout(() => {
                const project = appData.contractorListings.find(p => p.id === currentProjectIdImarCapi);
                if (project) {
                    project.imarCapiProcessStatus = 'imar_ready';
                    project.imarCapiUrl = 'simulated-imar-capi-url.pdf';
                }
                
                document.getElementById('step-4').classList.add('hidden');
                document.getElementById('step-5').classList.remove('hidden');
                updateProgressBar('imar_ready');
                showNotification('İmar çapınız hazır! İndirebilirsiniz.', 'success');
                renderContractorListings(); // Listeyi güncelle
            }, 3000);
        }

        // Havale Fonksiyonları
        function copyIban() {
            const iban = document.getElementById('iban-number').textContent;
            navigator.clipboard.writeText(iban).then(() => {
                showNotification('IBAN kopyalandı!', 'success');
            }).catch(() => {
                showNotification('IBAN kopyalanırken hata oluştu.', 'error');
            });
        }

        function confirmBankTransfer() {
            if (confirm('Havale işlemini gerçekleştirdiğinizi onaylıyor musunuz?')) {
                showNotification('Havale onayınız alındı. Ödeme kontrol edildikten sonra işleminiz devam edecektir.', 'info');
                completePayment('bank-transfer');
            }
        }

        // Makbuz İndirme
        function downloadReceipt() {
            // Simülasyon: Makbuz oluştur ve indir
            const receiptData = {
                transactionId: 'TXN' + Date.now(),
                amount: '485 ₺',
                date: new Date().toLocaleDateString('tr-TR'),
                paymentMethod: 'Kredi Kartı',
                description: 'İmar Çapı Belediye Harcı'
            };

            // Simülasyon için konsola yazdır
            console.log('Ödeme Makbuzu:', receiptData);
            showNotification('Ödeme makbuzu indiriliyor...', 'success');
            
            // Gerçek uygulamada burada PDF oluşturulup indirilir
            setTimeout(() => {
                showNotification('Makbuz başarıyla indirildi!', 'success');
            }, 1000);
        }

        // İmar çapı indirme
        function downloadImarCapi(projectId) {
            const project = appData.contractorListings.find(p => p.id === projectId);
            if (!project || !project.imarCapiUrl) return;

            // Simüle edilmiş indirme
            showNotification('İmar çapı indiriliyor...', 'info');
            setTimeout(() => {
                showNotification('İmar çapı başarıyla indirildi!', 'success');
            }, 1000);
        }

        // Teklif Detay Modal Fonksiyonu
        function openOfferDetailsModal(offerId) {
            const offer = appData.acceptedOffers.find(o => o.id === offerId);
            if (!offer) {
                showNotification('Teklif bulunamadı!', 'error');
                return;
            }

            // Modal başlığını güncelle
            document.getElementById('offer-details-modal-title').textContent = `Teklif Detayları - ${offer.listingTitle}`;

            // İlan bilgilerini doldur
            document.getElementById('offer-detail-listing-title').textContent = offer.listingTitle;
            document.getElementById('offer-detail-owner-name').textContent = offer.ownerName;
            document.getElementById('offer-detail-plot-area').textContent = `${offer.plotArea.toLocaleString('tr-TR')} m²`;

            // Daire bilgilerini doldur
            const details = offer.offerDetailsFull;
            document.getElementById('offer-detail-apartment-type').textContent = details.apartmentType;
            document.getElementById('offer-detail-apartment-count').textContent = `${offer.apartmentCount} adet`;
            document.getElementById('offer-detail-num-floors').textContent = `${details.numFloors} kat`;
            document.getElementById('offer-detail-cash-demand').textContent = `${details.cashDemandPerUnit.toLocaleString('tr-TR')} ₺`;

            // Alan bilgilerini doldur
            document.getElementById('offer-detail-emsal-area').textContent = `${details.emsalArea.toLocaleString('tr-TR')} m²`;
            document.getElementById('offer-detail-net-area').textContent = `${details.netArea} m²`;
            document.getElementById('offer-detail-gross-area').textContent = `${details.grossArea} m²`;

            // Diğer özellikleri doldur
            document.getElementById('offer-detail-balconies').textContent = details.numBalconies;
            document.getElementById('offer-detail-bathrooms').textContent = details.numBathrooms;
            document.getElementById('offer-detail-wcs').textContent = details.numWCs;

            // Teklif özetini doldur
            document.getElementById('offer-detail-summary').textContent = offer.offerDetails;

            // Modalı aç
            openModal('offer-details-modal');
        }

        // Commission Payment Functions
        function openCommissionPaymentModal(offerId) {
            const offer = appData.acceptedOffers.find(o => o.id === offerId);
            if (!offer) {
                showNotification('Teklif bulunamadı!', 'error');
                return;
            }

            // Calculate commission
            const commission = calculateCommission(offer);
            
            // Set modal data
            document.getElementById('commission-offer-id').value = offerId;
            document.getElementById('commission-amount').textContent = formatCurrency(commission);
            document.getElementById('commission-calculation').innerHTML = `
                <p class="text-sm text-gray-600 mb-2">Komisyon Hesaplama:</p>
                <p class="text-sm">Arsa Alanı: ${offer.plotArea} m²</p>
                <p class="text-sm">Daire Sayısı: ${offer.apartmentCount} adet</p>
                <p class="text-sm font-semibold">Komisyon: ${offer.plotArea} m² × %20 × ${offer.apartmentCount} = ${formatCurrency(commission)}</p>
            `;
            
            // Set offer reference for bank transfer
            document.getElementById('offer-reference').textContent = offerId;

            openModal('commission-payment-modal');
        }

        function calculateCommission(offer) {
            // Commission = Plot Area * 20% * Apartment Count
            return offer.plotArea * 0.20 * offer.apartmentCount;
        }

        function selectPaymentMethod(method) {
            const creditCardSection = document.getElementById('credit-card-section');
            const bankTransferSection = document.getElementById('bank-transfer-section');
            
            if (method === 'credit-card') {
                creditCardSection.classList.remove('hidden');
                bankTransferSection.classList.add('hidden');
            } else {
                creditCardSection.classList.add('hidden');
                bankTransferSection.classList.remove('hidden');
            }
        }

        function processCommissionPayment() {
            const offerId = document.getElementById('commission-offer-id').value;
            const paymentMethod = document.querySelector('input[name="payment-method"]:checked')?.value;
            
            if (!paymentMethod) {
                showNotification('Lütfen bir ödeme yöntemi seçin.', 'error');
                return;
            }

            if (paymentMethod === 'credit-card') {
                const cardNumber = document.getElementById('card-number').value;
                const cardName = document.getElementById('card-name').value;
                const expiryDate = document.getElementById('expiry-date').value;
                const cvv = document.getElementById('cvv').value;

                if (!cardNumber || !cardName || !expiryDate || !cvv) {
                    showNotification('Lütfen tüm kredi kartı bilgilerini doldurun.', 'error');
                    return;
                }

                // Simulate credit card payment
                showNotification('Kredi kartı ödemesi işleniyor...', 'info');
                setTimeout(() => {
                    completeCommissionPayment(offerId);
                }, 2000);
            } else {
                // Bank transfer - no validation needed, just mark as completed
                completeCommissionPayment(offerId);
            }
        }

        function completeCommissionPayment(offerId) {
            const offer = appData.acceptedOffers.find(o => o.id === offerId);
            if (!offer) return;

            // Mark commission as paid
            offer.commissionPaid = true;
            offer.legalProcessStarted = true;

            closeModal('commission-payment-modal');
            showNotification('Komisyon ödemesi başarıyla tamamlandı! Hukuki süreçler başlatıldı.', 'success');
            
            // Redirect to legal processes section
            showSection('legal-processes-section');
            
            // Clear form
            document.getElementById('commission-payment-form').reset();
            document.getElementById('credit-card-section').classList.add('hidden');
            document.getElementById('bank-transfer-section').classList.add('hidden');
        }

        function formatCurrency(amount) {
            return new Intl.NumberFormat('tr-TR', {
                style: 'currency',
                currency: 'TRY',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(amount);
        }

        // ===============================================================
        //                    NEW OFFER & DESIGN FUNCTIONS
        // ===============================================================
        
        // Teklif Ver modalını açma fonksiyonu
        function openMakeOfferModal(listingId) {
            const listing = appData.listingsData.find(l => l.id == listingId);
            
            if (!listing) {
                showNotification('İlan bulunamadı!', 'error');
                return;
            }

            // Modal verilerini doldur
            document.getElementById('offer-listing-id').value = listingId;
            document.getElementById('offer-listing-title').textContent = listing.title;
            document.getElementById('offer-plot-area').textContent = listing.area + ' m²';
            document.getElementById('offer-expected-units').textContent = listing.expectedUnits;

            // Tasarım projesi modalı için verileri hazırla
            window.currentListingData = {
                plotArea: listing.area,
                expectedUnits: listing.expectedUnits
            };

            openModal('make-offer-modal');
        }

        // Tasarım dosyaları yükleme fonksiyonu
        function handleDesignFilesUpload(event) {
            const files = event.target.files;
            const container = document.getElementById('uploaded-design-files');
            
            if (files.length > 0) {
                container.classList.remove('hidden');
                container.innerHTML = '';
                
                Array.from(files).forEach(file => {
                    const fileItem = document.createElement('div');
                    fileItem.className = 'flex items-center justify-between bg-gray-100 p-3 rounded-lg';
                    fileItem.innerHTML = `
                        <div class="flex items-center">
                            <i class="fas fa-file text-blue-500 mr-2"></i>
                            <span class="text-sm text-gray-700">${file.name}</span>
                            <span class="text-xs text-gray-500 ml-2">(${(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                        </div>
                        <button onclick="removeDesignFile(this)" class="text-red-500 hover:text-red-700">
                            <i class="fas fa-times"></i>
                        </button>
                    `;
                    container.appendChild(fileItem);
                });
            } else {
                container.classList.add('hidden');
            }
        }

        // Tasarım dosyası silme fonksiyonu
        function removeDesignFile(button) {
            button.closest('div').remove();
            const container = document.getElementById('uploaded-design-files');
            if (container.children.length === 0) {
                container.classList.add('hidden');
            }
        }

        // Tasarım projesi ilanı modalını açma fonksiyonu
        function openDesignProjectListingModal() {
            if (!window.currentListingData) return;
            
            const plotArea = window.currentListingData.plotArea;
            const expectedUnits = window.currentListingData.expectedUnits;
            
            // Formül: Arsa alanı x %10 x Daire sayısı
            const calculatedFee = plotArea * 0.1 * expectedUnits;
            
            // Modal verilerini doldur
            document.getElementById('design-project-plot-area').textContent = plotArea + ' m²';
            document.getElementById('design-project-expected-units').textContent = expectedUnits;
            document.getElementById('design-project-calculated-fee').textContent = calculatedFee.toLocaleString('tr-TR') + ' ₺';
            document.getElementById('formula-calculation').textContent = `${plotArea} m² × %10 × ${expectedUnits} daire = ${calculatedFee.toLocaleString('tr-TR')} ₺`;
            
            openModal('design-project-listing-modal');
        }

        // Dosya yükleme işlevselliği
        let uploadedDesignFiles = [];

        document.addEventListener('DOMContentLoaded', function() {
            const fileInput = document.getElementById('design-project-files');
            if (fileInput) {
                fileInput.addEventListener('change', function(e) {
                    handleDesignFileUpload(e.target.files);
                });
            }

            // Sürükle-bırak işlevselliği
            const dropZone = document.querySelector('#design-project-listing-modal .border-dashed');
            if (dropZone) {
                dropZone.addEventListener('dragover', function(e) {
                    e.preventDefault();
                    this.classList.add('border-purple-400', 'bg-purple-50');
                });

                dropZone.addEventListener('dragleave', function(e) {
                    e.preventDefault();
                    this.classList.remove('border-purple-400', 'bg-purple-50');
                });

                dropZone.addEventListener('drop', function(e) {
                    e.preventDefault();
                    this.classList.remove('border-purple-400', 'bg-purple-50');
                    const files = e.dataTransfer.files;
                    handleDesignFileUpload(files);
                });
            }
        });

        function handleDesignFileUpload(files) {
            Array.from(files).forEach(file => {
                if (uploadedDesignFiles.length >= 10) {
                    showNotification('En fazla 10 dosya yükleyebilirsiniz.', 'warning');
                    return;
                }
                
                uploadedDesignFiles.push(file);
                addDesignFileToPreview(file);
            });
        }

        function addDesignFileToPreview(file) {
            const preview = document.getElementById('uploaded-files-preview');
            const fileDiv = document.createElement('div');
            fileDiv.className = 'flex items-center justify-between p-3 bg-gray-50 rounded-lg border';
            
            const fileSize = (file.size / 1024 / 1024).toFixed(2);
            const fileIcon = getDesignFileIcon(file.type);
            
            fileDiv.innerHTML = `
                <div class="flex items-center space-x-3">
                    <i class="${fileIcon} text-lg text-blue-600"></i>
                    <div>
                        <p class="text-sm font-medium text-gray-900">${file.name}</p>
                        <p class="text-xs text-gray-500">${fileSize} MB</p>
                    </div>
                </div>
                <button onclick="removeDesignFile('${file.name}')" class="text-red-500 hover:text-red-700">
                    <i class="fas fa-times"></i>
                </button>
            `;
            
            preview.appendChild(fileDiv);
        }

        function getDesignFileIcon(fileType) {
            if (fileType.includes('pdf')) return 'fas fa-file-pdf';
            if (fileType.includes('image')) return 'fas fa-file-image';
            if (fileType.includes('word') || fileType.includes('document')) return 'fas fa-file-word';
            if (fileType.includes('dwg') || fileType.includes('autocad')) return 'fas fa-drafting-compass';
            return 'fas fa-file';
        }

        function removeDesignFile(fileName) {
            uploadedDesignFiles = uploadedDesignFiles.filter(file => file.name !== fileName);
            renderDesignFilePreview();
        }

        function renderDesignFilePreview() {
            const preview = document.getElementById('uploaded-files-preview');
            preview.innerHTML = '';
            uploadedDesignFiles.forEach(file => addDesignFileToPreview(file));
        }

        // Tasarım projesi ilanını yayınlama fonksiyonu
        function publishDesignProjectListing() {
            const title = document.getElementById('design-project-title').value;
            const description = document.getElementById('design-project-description').value;
            const requirements = document.getElementById('design-project-requirements').value;
            const deadline = document.getElementById('design-project-deadline').value;
            
            if (!title || !description || !deadline) {
                showNotification('Lütfen zorunlu alanları doldurun.', 'error');
                return;
            }

            const plotArea = window.currentListingData.plotArea;
            const expectedUnits = window.currentListingData.expectedUnits;
            const calculatedFee = plotArea * 0.1 * expectedUnits;

            const designListing = {
                id: Date.now(),
                title: title,
                description: description,
                requirements: requirements,
                deadline: parseInt(deadline),
                plotArea: plotArea,
                expectedUnits: expectedUnits,
                calculatedFee: calculatedFee,
                uploadedFiles: uploadedDesignFiles.map(file => ({
                    name: file.name,
                    size: file.size,
                    type: file.type
                })),
                status: 'waiting_for_architect',
                publishDate: new Date().toLocaleDateString('tr-TR'),
                paymentStatus: 'pending'
            };

            // Proje çizim ilanlarını ekle
            if (!appData.projectDesignListings) {
                appData.projectDesignListings = [];
            }
            appData.projectDesignListings.push(designListing);

            // Başarı mesajı
            const fileCount = uploadedDesignFiles.length;
            const successMessage = fileCount > 0 
                ? `Tasarım projesi ilanınız ${fileCount} dosya ile birlikte başarıyla yayınlandı! Mimarlar teklif vermeye başlayabilir.`
                : 'Tasarım projesi ilanınız başarıyla yayınlandı! Mimarlar teklif vermeye başlayabilir.';
            
            showNotification(successMessage, 'success');
            closeModal('design-project-listing-modal');
            closeModal('make-offer-modal');
            
            // Form ve dosyaları temizle
            document.getElementById('design-project-form').reset();
            uploadedDesignFiles = [];
            document.getElementById('uploaded-files-preview').innerHTML = '';
        }

        // Teklif gönderme fonksiyonu
        function submitOffer() {
            const form = document.getElementById('offer-form');
            
            // Form validasyonu
            if (!form.checkValidity()) {
                showNotification('Lütfen tüm zorunlu alanları doldurun.', 'error');
                return;
            }

            // Teklif verilerini topla
            const offerData = {
                listingId: document.getElementById('offer-listing-id').value,
                taxNumber: document.getElementById('offer-tax-number').value,
                company: document.getElementById('offer-company').value,
                apartmentType: document.getElementById('offer-apartment-type').value,
                apartmentArea: document.getElementById('offer-apartment-area').value,
                floorCount: document.getElementById('offer-floor-count').value,
                cashPerApartment: document.getElementById('offer-cash-per-apartment').value,
                details: document.getElementById('offer-details').value,
                hasDesignFiles: document.getElementById('uploaded-design-files').children.length > 0,
                submitDate: new Date().toLocaleDateString('tr-TR')
            };

            showNotification('Teklifiniz başarıyla gönderildi! İlan sahibi en kısa sürede sizinle iletişime geçecektir.', 'success');
            closeModal('make-offer-modal');
            
            // Form temizle
            form.reset();
            document.getElementById('uploaded-design-files').classList.add('hidden');
            document.getElementById('uploaded-design-files').innerHTML = '';
        }

        // İlanlarım sekmesi tab değiştirme fonksiyonu
        function switchListingTab(tabName) {
            const regularTab = document.getElementById('regular-listings-tab');
            const projectDesignTab = document.getElementById('project-design-listings-tab');
            const regularContainer = document.getElementById('regular-listings-container');
            const projectDesignContainer = document.getElementById('project-design-listings-container');

            const activeClasses = ['border-primary', 'text-primary'];
            const inactiveClasses = ['border-transparent', 'text-gray-500', 'hover:text-gray-700', 'hover:border-gray-300'];

            if (tabName === 'regular-listings') {
                regularTab.classList.add(...activeClasses);
                regularTab.classList.remove(...inactiveClasses);
                projectDesignTab.classList.add(...inactiveClasses);
                projectDesignTab.classList.remove(...activeClasses);

                regularContainer.classList.remove('hidden');
                projectDesignContainer.classList.add('hidden');
            } else {
                projectDesignTab.classList.add(...activeClasses);
                projectDesignTab.classList.remove(...inactiveClasses);
                regularTab.classList.add(...inactiveClasses);
                regularTab.classList.remove(...activeClasses);

                projectDesignContainer.classList.remove('hidden');
                regularContainer.classList.add('hidden');
                
                // Proje çizim ilanlarını render et
                renderProjectDesignListings();
            }
        }

        // Proje çizim ilanlarını render etme fonksiyonu
        function renderProjectDesignListings() {
            const container = document.getElementById('project-design-listings-list');
            if (!container) return;

            if (!appData.projectDesignListings || appData.projectDesignListings.length === 0) {
                container.innerHTML = '<p class="text-gray-500 col-span-full text-center">Henüz proje çizim ilanınız bulunmuyor.</p>';
                return;
            }

            container.innerHTML = appData.projectDesignListings.map(listing => `
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div class="flex justify-between items-start mb-4">
                        <h4 class="font-semibold text-gray-800">${listing.title}</h4>
                        <span class="px-3 py-1 rounded-full text-xs font-medium ${getDesignListingStatusClass(listing.status)}">
                            ${getDesignListingStatusText(listing.status)}
                        </span>
                    </div>
                    <p class="text-sm text-gray-600 mb-3">${listing.description}</p>
                    <div class="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                            <span class="text-gray-600">Arsa Alanı:</span>
                            <span class="font-medium">${listing.plotArea} m²</span>
                        </div>
                        <div>
                            <span class="text-gray-600">Daire Sayısı:</span>
                            <span class="font-medium">${listing.expectedUnits}</span>
                        </div>
                        <div>
                            <span class="text-gray-600">Ücret:</span>
                            <span class="font-medium text-green-600">${listing.calculatedFee.toLocaleString('tr-TR')} ₺</span>
                        </div>
                        <div>
                            <span class="text-gray-600">Yayın Tarihi:</span>
                            <span class="font-medium">${listing.publishDate}</span>
                        </div>
                    </div>
                    ${listing.status === 'architect_accepted' && listing.paymentStatus === 'pending' ? `
                        <button onclick="payDesignProjectFee(${listing.id})" class="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                            <i class="fas fa-credit-card mr-2"></i>Ödemeyi Yap (${listing.calculatedFee.toLocaleString('tr-TR')} ₺)
                        </button>
                    ` : ''}
                </div>
            `).join('');
        }

        // Tasarım ilan durumu sınıflarını döndürme fonksiyonu
        function getDesignListingStatusClass(status) {
            switch (status) {
                case 'waiting_for_architect': return 'bg-yellow-100 text-yellow-800';
                case 'architect_accepted': return 'bg-green-100 text-green-800';
                case 'payment_completed': return 'bg-blue-100 text-blue-800';
                case 'design_completed': return 'bg-purple-100 text-purple-800';
                default: return 'bg-gray-100 text-gray-800';
            }
        }

        // Tasarım ilan durumu metinlerini döndürme fonksiyonu
        function getDesignListingStatusText(status) {
            switch (status) {
                case 'waiting_for_architect': return 'Mimar Bekleniyor';
                case 'architect_accepted': return 'Mimar Kabul Etti';
                case 'payment_completed': return 'Ödeme Tamamlandı';
                case 'design_completed': return 'Tasarım Tamamlandı';
                default: return 'Bilinmeyen Durum';
            }
        }

        // Tasarım projesi ücreti ödeme fonksiyonu
        function payDesignProjectFee(listingId) {
            const listing = appData.projectDesignListings.find(l => l.id === listingId);
            if (!listing) return;

            // Ödeme işlemi simülasyonu
            listing.paymentStatus = 'completed';
            listing.status = 'payment_completed';

            showNotification(`${listing.calculatedFee.toLocaleString('tr-TR')} ₺ ödeme başarıyla tamamlandı. Mimar projenizi çizmeye başlayacak.`, 'success');
            
            // Listeyi yenile
            renderProjectDesignListings();
        }

        // Initialize listings tab
        function initializeListingsTab() {
            switchListingTab('regular-listings');

        }

