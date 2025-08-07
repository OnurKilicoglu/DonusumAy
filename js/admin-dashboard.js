// Firebase Configuration
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-auth-domain",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id"
};

// Initialize Firebase (only if config is valid)
let db, auth;
try {
    if (firebaseConfig.apiKey !== "your-api-key") {
        firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        auth = firebase.auth();
        console.log('Firebase initialized successfully');
    } else {
        console.log('Firebase config not set, using local mode');
        // Mock auth object for development
        auth = {
            onAuthStateChanged: function (callback) {
                // Check if user is logged in via localStorage
                const isLoggedIn = localStorage.getItem('admin_logged_in');
                const userEmail = localStorage.getItem('admin_user_email');

                if (isLoggedIn === 'true' && userEmail) {
                    setTimeout(() => {
                        callback({ email: userEmail, uid: 'mock-uid' });
                    }, 100);
                } else {
                    setTimeout(() => {
                        callback(null);
                    }, 100);
                }
            },
            signOut: function () {
                localStorage.removeItem('admin_logged_in');
                localStorage.removeItem('admin_user_email');
                return Promise.resolve();
            }
        };
    }
} catch (error) {
    console.error('Firebase initialization error:', error);
}

// Global Variables
let currentUser = null;
let currentSection = 'dashboard-section';

// Sample Data
const sampleData = {
    users: [
        {
            id: 1,
            name: "Ahmet Yılmaz",
            email: "ahmet@example.com",
            phone: "+90 532 123 4567",
            type: "customer",
            accountStatus: "active",
            verificationStatus: "not_required",
            registrationDate: "2024-01-15",
            lastLogin: "2024-01-20",
            biography: "Deneyimli emlak yatırımcısı"
        },
        {
            id: 2,
            name: "Fatma Kaya İnşaat Ltd.",
            email: "fatma@example.com",
            phone: "+90 533 987 6543",
            type: "contractor",
            accountStatus: "active",
            verificationStatus: "verified",
            registrationDate: "2024-01-10",
            lastLogin: "2024-01-19",
            biography: "20 yıllık deneyim ile konut ve ticari proje uzmanı",
            taxNumber: "1234567890",
            registrationNumber: "İST-2024-001",
            chamberRegistration: "İstanbul İMO Kayıt No: 12345"
        },
        {
            id: 3,
            name: "Mehmet Öztürk",
            email: "mehmet@example.com",
            phone: "+90 534 456 7890",
            type: "architect",
            accountStatus: "inactive",
            verificationStatus: "pending",
            registrationDate: "2024-01-18",
            lastLogin: "Never",
            biography: "Modern mimari tasarımlar konusunda uzman",
            taxNumber: "9876543210",
            registrationNumber: "MİM-2024-002",
            chamberRegistration: "Mimarlar Odası Kayıt No: 67890"
        },
        {
            id: 4,
            name: "Ayşe Demir",
            email: "ayse@example.com",
            phone: "+90 535 111 2233",
            type: "notary",
            accountStatus: "active",
            verificationStatus: "verified",
            registrationDate: "2024-01-12",
            lastLogin: "2024-01-21",
            biography: "Gayrimenkul hukuku alanında uzman noter",
            taxNumber: "5555666677",
            registrationNumber: "NOT-2024-003",
            chamberRegistration: "İstanbul Noterler Birliği Kayıt No: 111"
        },
        {
            id: 5,
            name: "Can Yıldız",
            email: "can@example.com",
            phone: "+90 536 444 5566",
            type: "contractor",
            accountStatus: "suspended",
            verificationStatus: "rejected",
            registrationDate: "2024-01-20",
            lastLogin: "2024-01-22",
            biography: "Villa ve lüks konut projelerinde uzman müteahhit",
            taxNumber: "7777888899",
            registrationNumber: "İNŞ-2024-004",
            chamberRegistration: "İMO Kayıt No: 99999"
        }
    ],
    listings: [
        {
            id: 101,
            title: "3+1 Daire Kadıköy Dönüşümü",
            type: "apartment",
            owner: { id: 15, name: "Ahmet Yılmaz", phone: "+90 532 123 45 67" },
            status: "active",
            city: "istanbul",
            district: "Kadıköy",
            price: 850000,
            area: 120,
            rooms: "3+1",
            description: "Merkezi konumda, deniz manzaralı 3+1 daire. Toplu konut projesi kapsamında.",
            createdAt: "2024-01-15",
            publishedAt: "2024-01-16",
            offerCount: 5,
            zoningStatus: "ready",
            images: ["image1.jpg", "image2.jpg", "image3.jpg"],
            rightsHolders: [
                { name: "Ahmet Yılmaz", share: 60, relation: "Mal Sahibi" },
                { name: "Zeynep Yılmaz", share: 40, relation: "Eş" }
            ]
        },
        {
            id: 102,
            title: "Villa Zekeriyaköy Projesi",
            type: "villa",
            owner: { id: 28, name: "Fatma Kaya İnşaat Ltd.", phone: "+90 533 987 65 43" },
            status: "pending",
            city: "istanbul",
            district: "Sarıyer",
            price: 2500000,
            area: 450,
            rooms: "5+2",
            description: "Lüks villa projesi, geniş bahçeli. Premium konum.",
            createdAt: "2024-01-18",
            publishedAt: null,
            offerCount: 2,
            zoningStatus: "documents_uploaded",
            images: ["villa1.jpg", "villa2.jpg"],
            rightsHolders: [
                { name: "Fatma Kaya İnşaat Ltd.", share: 100, relation: "Şirket" }
            ]
        },
        {
            id: 103,
            title: "Ofis Binası Levent",
            type: "office",
            owner: { id: 42, name: "Mehmet Öz Gayrimenkul", phone: "+90 212 456 78 90" },
            status: "rejected",
            city: "istanbul",
            district: "Beşiktaş",
            price: 1200000,
            area: 300,
            rooms: "Ofis",
            description: "Merkezi konumda ticari alan. Renovasyon projesi.",
            createdAt: "2024-01-12",
            publishedAt: null,
            offerCount: 1,
            zoningStatus: "waiting",
            images: ["office1.jpg"],
            rightsHolders: [
                { name: "Mehmet Öz Gayrimenkul", share: 100, relation: "Şirket" }
            ]
        },
        {
            id: 104,
            title: "Arsa Geliştirme Ankara",
            type: "land",
            owner: { id: 56, name: "Selin Demir", phone: "+90 312 111 22 33" },
            status: "active",
            city: "ankara",
            district: "Çankaya",
            price: 750000,
            area: 500,
            rooms: "-",
            description: "İnşaat için uygun arsa. İmar planları mevcut.",
            createdAt: "2024-01-20",
            publishedAt: "2024-01-21",
            offerCount: 8,
            zoningStatus: "payment_completed",
            images: ["land1.jpg", "land2.jpg"],
            rightsHolders: [
                { name: "Selin Demir", share: 70, relation: "Mal Sahibi" },
                { name: "Ali Demir", share: 30, relation: "Kardeş" }
            ]
        },
        {
            id: 105,
            title: "Müstakil Ev İzmir",
            type: "house",
            owner: { id: 73, name: "Can Yıldız İnşaat", phone: "+90 232 789 01 23" },
            status: "expired",
            city: "izmir",
            district: "Konak",
            price: 980000,
            area: 180,
            rooms: "4+1",
            description: "Bahçeli müstakil ev, merkezi konum.",
            createdAt: "2024-01-05",
            publishedAt: "2024-01-06",
            offerCount: 3,
            zoningStatus: "ready",
            images: ["house1.jpg", "house2.jpg", "house3.jpg"],
            rightsHolders: [
                { name: "Can Yıldız İnşaat", share: 100, relation: "Şirket" }
            ]
        }
    ],
    offers: [
        {
            id: 201,
            listingTitle: "3+1 Daire Kadıköy",
            offerBy: "Demir İnşaat A.Ş.",
            amount: "₺800,000",
            status: "pending",
            date: "2024-01-19",
            listingType: "apartment",
            projectType: "renovation",
            location: "Kadıköy, İstanbul",
            area: "120",
            rooms: "3+1",
            bathrooms: "2",
            buildingAge: "15",
            floor: "3",
            currentCondition: "İyi durumda",
            contactPerson: "Ayşe Demir",
            phone: "+90 532 123 45 67",
            email: "ayse@demirinsat.com",
            experience: "8",
            references: "Kadıköy Belediyesi, İBB Projesi",
            pricePerSqm: "₺6,667/m²",
            paymentPlan: "3 taksit",
            advancePayment: "%30",
            warrantyPeriod: "2 yıl",
            validUntil: "30 gün",
            notes: "Tüm malzemeler dahil, anahtar teslim proje"
        },
        {
            id: 202,
            listingTitle: "Villa Zekeriyaköy",
            offerBy: "Yıldız Yapı Ltd.",
            amount: "₺2,300,000",
            status: "accepted",
            date: "2024-01-17",
            listingType: "villa",
            projectType: "reconstruction",
            location: "Zekeriyaköy, Sarıyer",
            area: "350",
            rooms: "5+2",
            bathrooms: "4",
            buildingAge: "25",
            floor: "3",
            currentCondition: "Yenileme gerekli",
            contactPerson: "Can Yıldız",
            phone: "+90 533 987 65 43",
            email: "can@yildizreit.com",
            experience: "15",
            references: "Sarıyer Belediyesi, Acarkent Projesi",
            pricePerSqm: "₺6,571/m²",
            paymentPlan: "5 taksit",
            advancePayment: "%25",
            warrantyPeriod: "5 yıl",
            validUntil: "45 gün",
            notes: "Lüks villa projesi, özel tasarım"
        },
        {
            id: 203,
            listingTitle: "Ofis Levent",
            offerBy: "Ak Müteahhitlik",
            amount: "₺1,100,000",
            status: "rejected",
            date: "2024-01-16",
            listingType: "office",
            projectType: "new_construction",
            location: "Levent, Şişli",
            area: "200",
            rooms: "Açık ofis",
            bathrooms: "2",
            buildingAge: "0",
            floor: "12",
            currentCondition: "Yeni inşaat",
            contactPerson: "Selin Ak",
            phone: "+90 534 111 22 33",
            email: "selin@akmut.com",
            experience: "12",
            references: "Maslak Projesi, Etiler Plaza",
            pricePerSqm: "₺5,500/m²",
            paymentPlan: "4 taksit",
            advancePayment: "%40",
            warrantyPeriod: "3 yıl",
            validUntil: "15 gün",
            notes: "Modern ofis tasarımı, A+ enerji sınıfı",
            rejectionReason: "Bütçe aşımı"
        },
        {
            id: 204,
            listingTitle: "2+1 Daire Beşiktaş",
            offerBy: "Güven İnşaat",
            amount: "₺650,000",
            status: "pending",
            date: "2024-01-20",
            listingType: "apartment",
            projectType: "renovation",
            location: "Beşiktaş, İstanbul",
            area: "85",
            rooms: "2+1",
            bathrooms: "1",
            buildingAge: "20",
            floor: "5",
            currentCondition: "Orta durumda",
            contactPerson: "Mehmet Güven",
            phone: "+90 535 444 55 66",
            email: "mehmet@guveninsaat.com",
            experience: "10",
            references: "Beşiktaş Belediyesi, Ortaköy Projesi",
            pricePerSqm: "₺7,647/m²",
            paymentPlan: "3 taksit",
            advancePayment: "%35",
            warrantyPeriod: "2 yıl",
            validUntil: "20 gün",
            notes: "Deniz manzaralı, merkezi konum"
        },
        {
            id: 205,
            listingTitle: "Ticari Alan Taksim",
            offerBy: "Başak Yapı",
            amount: "₺1,850,000",
            status: "accepted",
            date: "2024-01-18",
            listingType: "commercial",
            projectType: "renovation",
            location: "Taksim, Beyoğlu",
            area: "150",
            rooms: "Ticari alan",
            bathrooms: "2",
            buildingAge: "30",
            floor: "Zemin",
            currentCondition: "Tadilat gerekli",
            contactPerson: "Zeynep Başak",
            phone: "+90 536 777 88 99",
            email: "zeynep@basakyapi.com",
            experience: "18",
            references: "Galata Projesi, İstiklal Caddesi Restorasyon",
            pricePerSqm: "₺12,333/m²",
            paymentPlan: "6 taksit",
            advancePayment: "%20",
            warrantyPeriod: "3 yıl",
            validUntil: "60 gün",
            notes: "Prestijli lokasyon, yüksek kira getirisi"
        }
    ],
    projects: [
        {
            id: 301,
            name: "Kadıköy Konut Projesi",
            contractor: "ABC İnşaat",
            architect: "Mimar Sinan",
            status: "ongoing",
            startDate: "2024-01-01",
            endDate: "2024-12-31",
            progress: 65,
            projectType: "renovation",
            location: "Kadıköy, İstanbul",
            budget: "₺2,500,000",
            totalPayments: "₺1,625,000",
            remainingPayments: "₺875,000",
            description: "3+1 daire komple tadilat projesi"
        },
        {
            id: 302,
            name: "Zekeriyaköy Villa Projesi",
            contractor: "XYZ Yapı",
            architect: "Mimar Kemalettin",
            status: "planning",
            startDate: "2024-02-01",
            endDate: "2024-10-15",
            progress: 15,
            projectType: "reconstruction",
            location: "Zekeriyaköy, Sarıyer",
            budget: "₺5,800,000",
            totalPayments: "₺870,000",
            remainingPayments: "₺4,930,000",
            description: "Lüks villa yeniden inşa projesi"
        },
        {
            id: 303,
            name: "Levent Ofis Projesi",
            contractor: "DEF İnşaat",
            architect: "Mimar Vedat",
            status: "completed",
            startDate: "2023-06-01",
            endDate: "2023-12-31",
            progress: 100,
            projectType: "new_construction",
            location: "Levent, Şişli",
            budget: "₺3,200,000",
            totalPayments: "₺3,200,000",
            remainingPayments: "₺0",
            description: "Modern ofis binası inşaatı"
        },
        {
            id: 304,
            name: "Beşiktaş Daire Tadilat",
            contractor: "Güven İnşaat",
            architect: "Mimar Nazlı Arslan",
            status: "ongoing",
            startDate: "2024-01-15",
            endDate: "2024-06-30",
            progress: 40,
            projectType: "renovation",
            location: "Beşiktaş, İstanbul",
            budget: "₺850,000",
            totalPayments: "₺340,000",
            remainingPayments: "₺510,000",
            description: "2+1 daire komple yenileme"
        },
        {
            id: 305,
            name: "Taksim Ticari Alan",
            contractor: "Başak Yapı",
            architect: "Mimar Eren Demir",
            status: "cancelled",
            startDate: "2023-11-01",
            endDate: "2024-04-30",
            progress: 25,
            projectType: "restoration",
            location: "Taksim, Beyoğlu",
            budget: "₺1,850,000",
            totalPayments: "₺462,500",
            remainingPayments: "₺1,387,500",
            description: "Tarihi bina restorasyon projesi"
        }
    ],
    legalProcesses: {
        contracts: [
            {
                id: 401,
                type: "sale",
                typeName: "Satış Sözleşmesi",
                parties: "Ahmet Yılmaz - Ayşe Demir",
                status: "active",
                date: "2024-01-15",
                notary: "1. Noter",
                notaryName: "Ahmet Öztürk",
                notaryPhone: "+90 212 555 01 01",
                notaryEmail: "ahmet.ozturk@1noter.gov.tr",
                appointmentDate: "2024-01-25 14:00",
                notaryFee: 2500,
                paymentStatus: "paid",
                documentStatus: "complete",
                projectName: "Kadıköy Konut Projesi",
                customerName: "Ahmet Yılmaz",
                contractorName: "Ayşe Demir",
                adminNotes: "Tüm belgeler tamamlandı, randevu onaylandı."
            },
            {
                id: 402,
                type: "construction",
                typeName: "İnşaat Sözleşmesi",
                parties: "ABC İnşaat - Fatma Kaya",
                status: "pending",
                date: "2024-01-10",
                notary: "2. Noter",
                notaryName: "Ayşe Kaya",
                notaryPhone: "+90 212 555 02 02",
                notaryEmail: "ayse.kaya@2noter.gov.tr",
                appointmentDate: "",
                notaryFee: 3200,
                paymentStatus: "pending",
                documentStatus: "missing",
                projectName: "Zekeriyaköy Villa Projesi",
                customerName: "Fatma Kaya",
                contractorName: "ABC İnşaat",
                adminNotes: "Eksik belge: Vergi levhası, Oda sicil belgesi"
            },
            {
                id: 403,
                type: "lease",
                typeName: "Kira Sözleşmesi",
                parties: "Mehmet Demir - Selin Ak",
                status: "completed",
                date: "2024-01-05",
                notary: "3. Noter",
                notaryName: "Mehmet Demir",
                notaryPhone: "+90 212 555 03 03",
                notaryEmail: "mehmet.demir@3noter.gov.tr",
                appointmentDate: "2024-01-15 10:30",
                notaryFee: 1800,
                paymentStatus: "paid",
                documentStatus: "approved",
                projectName: "Levent Ofis Projesi",
                customerName: "Mehmet Demir",
                contractorName: "Selin Ak",
                adminNotes: "Süreç başarıyla tamamlandı."
            },
            {
                id: 404,
                type: "partnership",
                typeName: "Ortaklık Sözleşmesi",
                parties: "Can Yıldız - Zeynep Başak",
                status: "cancelled",
                date: "2024-01-20",
                notary: "4. Noter",
                notaryName: "Fatma Şahin",
                notaryPhone: "+90 212 555 04 04",
                notaryEmail: "fatma.sahin@4noter.gov.tr",
                appointmentDate: "",
                notaryFee: 2800,
                paymentStatus: "refunded",
                documentStatus: "incomplete",
                projectName: "Beşiktaş Daire Tadilat",
                customerName: "Can Yıldız",
                contractorName: "Zeynep Başak",
                adminNotes: "Taraflar anlaşamadı, süreç iptal edildi."
            }
        ],
        documents: [
            { id: 501, type: "Tapu Senedi", owner: "Ahmet Yılmaz", status: "approved", uploadDate: "2024-01-12" },
            { id: 502, type: "İmar Durum Belgesi", owner: "Fatma Kaya", status: "pending", uploadDate: "2024-01-18" }
        ],
        notary: [
            { id: 601, type: "Tapu Devri", notary: "1. Noter", status: "scheduled", appointmentDate: "2024-01-25" },
            { id: 602, type: "Sözleşme Onayı", notary: "2. Noter", status: "completed", appointmentDate: "2024-01-20" }
        ]
    },
    supportComplaints: {
        support: [
            {
                id: 701,
                user: "Ahmet Yılmaz",
                userId: 'user123',
                userType: 'Müşteri',
                userEmail: 'ahmet.yilmaz@email.com',
                userPhone: '+90 555 123 4567',
                subject: "Giriş Sorunu",
                content: 'Merhaba, şifremi unuttuğum için sisteme giriş yapamıyorum. Şifre sıfırlama e-postası da gelmiyor. Lütfen yardım edebilir misiniz?',
                priority: "high",
                status: "open",
                date: "2024-01-19",
                assignedTo: 'Admin 1',
                messages: [
                    {
                        id: 1,
                        sender: 'Ahmet Yılmaz',
                        senderType: 'user',
                        message: 'Merhaba, şifremi unuttuğum için sisteme giriş yapamıyorum. Şifre sıfırlama e-postası da gelmiyor.',
                        timestamp: '2024-01-19 09:30:00',
                        isInternal: false
                    },
                    {
                        id: 2,
                        sender: 'Admin 1',
                        senderType: 'admin',
                        message: 'Merhaba Ahmet Bey, sorununuzu çözmek için yardımcı olmaya çalışacağım. E-posta adresinizi kontrol edebilir miyim?',
                        timestamp: '2024-01-19 10:15:00',
                        isInternal: false
                    }
                ],
                attachments: [
                    {
                        name: 'screenshot.png',
                        url: '/uploads/screenshot.png',
                        size: '245 KB'
                    }
                ]
            },
            {
                id: 702,
                user: "Fatma Kaya",
                userId: 'user456',
                userType: 'Müteahhit',
                userEmail: 'fatma@email.com',
                userPhone: '+90 555 987 6543',
                subject: "İlan Yayınlama",
                content: 'İlan yayınlama sırasında fotoğraf yükleme hatası alıyorum.',
                priority: "medium",
                status: "resolved",
                date: "2024-01-18",
                assignedTo: 'Admin 2',
                messages: [
                    {
                        id: 1,
                        sender: 'Fatma Kaya',
                        senderType: 'user',
                        message: 'İlan yayınlama sırasında fotoğraf yükleme hatası alıyorum.',
                        timestamp: '2024-01-18 14:20:00',
                        isInternal: false
                    },
                    {
                        id: 2,
                        sender: 'Admin 2',
                        senderType: 'admin',
                        message: 'Sorun çözüldü. Dosya boyut limitini aştığınız için hata alıyordunuz.',
                        timestamp: '2024-01-18 15:45:00',
                        isInternal: false
                    }
                ],
                attachments: []
            },
            {
                id: 703,
                user: "Mehmet Özkan",
                userId: 'user789',
                userType: 'Mimar',
                userEmail: 'mehmet@email.com',
                userPhone: '+90 555 456 7890',
                subject: "Proje dosyası yükleyemiyorum",
                content: 'AutoCAD dosyalarını sisteme yüklemeye çalışıyorum ama sürekli hata veriyor.',
                priority: "high",
                status: "pending",
                date: "2024-01-17",
                assignedTo: '',
                messages: [
                    {
                        id: 1,
                        sender: 'Mehmet Özkan',
                        senderType: 'user',
                        message: 'AutoCAD dosyalarını sisteme yüklemeye çalışıyorum ama sürekli hata veriyor.',
                        timestamp: '2024-01-17 11:45:00',
                        isInternal: false
                    }
                ],
                attachments: [
                    {
                        name: 'error_log.txt',
                        url: '/uploads/error_log.txt',
                        size: '12 KB'
                    }
                ]
            },
            {
                id: 704,
                user: "Ali Veli",
                userId: 'user101',
                userType: 'Noter',
                userEmail: 'ali@email.com',
                userPhone: '+90 555 111 2233',
                subject: "Sözleşme onayı bekliyor",
                content: 'Müşterinin sözleşmesi onay bekliyor ancak sisteme erişemiyorum.',
                priority: "low",
                status: "closed",
                date: "2024-01-16",
                assignedTo: 'Admin 1',
                messages: [
                    {
                        id: 1,
                        sender: 'Ali Veli',
                        senderType: 'user',
                        message: 'Müşterinin sözleşmesi onay bekliyor ancak sisteme erişemiyorum.',
                        timestamp: '2024-01-16 08:30:00',
                        isInternal: false
                    },
                    {
                        id: 2,
                        sender: 'Admin 1',
                        senderType: 'admin',
                        message: 'Sistem bakımı nedeniyle geçici erişim sorunu yaşanmıştı. Şimdi düzeldi.',
                        timestamp: '2024-01-16 10:15:00',
                        isInternal: false
                    }
                ],
                attachments: []
            }
        ],
        complaints: [
            {
                id: 801,
                complainant: "Ayşe Demir",
                defendant: "Mehmet Öz",
                category: "service",
                categoryText: "Hizmet Kalitesi",
                priority: "high",
                status: "investigating",
                date: "2024-01-17",
                content: "Müteahhit ile anlaştığım proje süresini aştı ve sürekli bahane üretiyor. Çok memnun değilim.",
                investigationNotes: [
                    {
                        id: 1,
                        note: "İlk inceleme başlatıldı. Her iki tarafla da iletişime geçildi.",
                        author: "Admin 1",
                        timestamp: "2024-01-17 15:30:00"
                    }
                ]
            },
            {
                id: 802,
                complainant: "Can Yıldız",
                defendant: "ABC İnşaat",
                category: "payment",
                categoryText: "Ödeme Sorunu",
                priority: "medium",
                status: "resolved",
                date: "2024-01-15",
                content: "Ödeme planına uymuyorlar. Sürekli gecikme yaşanıyor.",
                investigationNotes: [
                    {
                        id: 1,
                        note: "Ödeme planı incelendi. Firma ile görüşüldü.",
                        author: "Admin 2",
                        timestamp: "2024-01-15 10:20:00"
                    },
                    {
                        id: 2,
                        note: "Sorun çözüldü. Ödeme planı yeniden düzenlendi.",
                        author: "Admin 2",
                        timestamp: "2024-01-15 16:45:00"
                    }
                ],
                resolution: "Ödeme planı yeniden düzenlenerek sorun çözüldü."
            },
            {
                id: 803,
                complainant: "Selin Ak",
                defendant: "Mimar Zeynep",
                category: "communication",
                categoryText: "İletişim",
                priority: "low",
                status: "pending",
                date: "2024-01-14",
                content: "Mimar sürekli randevuları iptal ediyor ve geri dönüş yapmıyor.",
                investigationNotes: []
            }
        ],
        feedback: [
            {
                id: 901,
                user: "Selin Ak",
                userId: 'user201',
                userEmail: 'selin@email.com',
                type: "platform",
                typeText: "Platform",
                rating: 4,
                date: "2024-01-16",
                content: "Platform kullanışlı ama bazı sayfalar yavaş yükleniyor. Genel olarak memnunum.",
                responseStatus: "pending",
                responses: []
            },
            {
                id: 902,
                user: "Ahmet Yılmaz",
                userId: 'user123',
                userEmail: 'ahmet.yilmaz@email.com',
                type: "service",
                typeText: "Hizmet",
                rating: 5,
                date: "2024-01-14",
                content: "Müteahhit bulma konusunda çok yardımcı oldunuz. Teşekkürler!",
                responseStatus: "responded",
                responses: [
                    {
                        id: 1,
                        message: "Geri bildiriminiz için teşekkürler! Sizin gibi memnun müşterilerimiz bizim en büyük motivasyonumuz.",
                        author: "Müşteri Hizmetleri",
                        timestamp: "2024-01-14 16:30:00"
                    }
                ]
            },
            {
                id: 903,
                user: "Mehmet Kaya",
                userId: 'user301',
                userEmail: 'mehmet.kaya@email.com',
                type: "feature",
                typeText: "Özellik",
                rating: 3,
                date: "2024-01-13",
                content: "Mobil uygulama eksik. Ayrıca bildirim sistemi çalışmıyor.",
                responseStatus: "pending",
                responses: []
            }
        ]
    },
    tickets: [
        { id: 1001, title: "Sistem Hatası", category: "technical", status: "open", date: "2024-01-19" },
        { id: 1002, title: "Fatura Sorunu", category: "billing", status: "closed", date: "2024-01-18" },
        { id: 1003, title: "Hesap Sorunu", category: "account", status: "pending", date: "2024-01-17" }
    ]
};

// Authentication Check
document.addEventListener('DOMContentLoaded', function () {
    initializeApp();
});

function initializeApp() {
    console.log('Initializing admin dashboard...');

    // Check authentication status
    auth.onAuthStateChanged(function (user) {
        console.log('Auth state changed:', user);

        if (user) {
            console.log('User is authenticated:', user.email);
            console.log('Checking admin status...');

            if (isAdmin(user)) {
                console.log('User is admin, initializing dashboard...');
                currentUser = user;
                initializeDashboard();
                loadDashboardData();
            } else {
                console.log('User is not admin, redirecting to auth...');
                window.location.href = 'auth.html';
            }
        } else {
            console.log('No user authenticated, redirecting to auth...');
            window.location.href = 'auth.html';
        }
    });
}

function isAdmin(user) {
    // For development purposes, allow any authenticated user to access admin panel
    // In production, you should implement proper admin role checking
    return user && user.email;

    // Alternative: Check for specific admin emails
    // const adminEmails = ['admin@donusumay.com', 'yonetici@donusumay.com', 'test@admin.com'];
    // return user && user.email && adminEmails.includes(user.email);

    // Alternative: Check for admin role in user claims (requires Firebase Admin SDK setup)
    // return user && user.email && user.customClaims && user.customClaims.admin === true;
}

function initializeDashboard() {
    // Initialize event listeners
    setupSidebarNavigation();
    setupCharts();
    setupEventListeners();

    // Load initial data
    loadDashboardStats();
    loadRecentActivity();
    loadPendingVerificationRequests();

    // Show default section
    showSection('dashboard-section');
}

// Navigation Functions
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('[id$="-section"]');
    sections.forEach(section => {
        section.classList.add('hidden');
    });

    // Show selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.remove('hidden');
        currentSection = sectionId;

        // Update sidebar active state
        updateSidebarActiveState(sectionId);

        // Load section-specific data
        loadSectionData(sectionId);
    }
}

function updateSidebarActiveState(sectionId) {
    // Remove active class from all sidebar links
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.classList.remove('active', 'bg-purple-100', 'text-purple-600');
        link.classList.add('text-gray-700');
    });

    // Add active class to current link
    const activeLink = document.querySelector(`[onclick="showSection('${sectionId}')"]`);
    if (activeLink) {
        activeLink.classList.add('active', 'bg-purple-100', 'text-purple-600');
        activeLink.classList.remove('text-gray-700');
    }
}

function loadSectionData(sectionId) {
    switch (sectionId) {
        case 'dashboard-section':
            loadDashboardStats();
            loadRecentActivity();
            break;
        case 'user-management-section':
            loadUsers();
            break;
        case 'listing-management-section':
            loadListings();
            break;
        case 'offer-management-section':
            loadOffers();
            break;
        case 'project-management-section':
            loadProjects();
            break;
        case 'legal-processes-section':
            loadLegalProcesses();
            break;
        case 'support-complaints-section':
            loadSupportComplaints();
            break;
        case 'support-management-section':
            loadSupportManagementSection();
            break;
        case 'content-management-section':
            loadContentManagement();
            break;
        case 'support-management-section':
            loadSupportTickets();
            break;
        case 'financial-section':
            loadFinancialData();
            break;
        case 'analytics-section':
            loadAnalyticsData();
            break;
        case 'marketing-section':
            loadMarketingData();
            break;
        case 'settings-section':
            loadSettings();
            break;
    }
}

// Dashboard Functions
function loadDashboardStats() {
    // Update dashboard statistics
    document.getElementById('total-users').textContent = sampleData.users.length;
    document.getElementById('new-users-30d').textContent = '+12'; // Simulated new users in last 30 days

    document.getElementById('active-listings').textContent = sampleData.listings.filter(l => l.status === 'active').length;
    document.getElementById('new-listings-7d').textContent = '+5'; // Simulated new listings in last 7 days

    document.getElementById('pending-offers-total').textContent = sampleData.offers.filter(o => o.status === 'pending').length;
    document.getElementById('new-offers-today').textContent = '+3'; // Simulated new offers today

    document.getElementById('total-commission').textContent = '₺85,450'; // Simulated commission
    document.getElementById('commission-increase-30d').textContent = '₺15K'; // Simulated increase

    // KPI Updates
    document.getElementById('customer-acquisition-cost').textContent = '₺245';
    document.getElementById('average-project-revenue').textContent = '₺8,450';
    document.getElementById('customer-lifetime-value').textContent = '₺18,750';
}

function loadRecentActivity() {
    const activityList = document.getElementById('recent-activity-list');
    const activities = [
        { icon: 'fa-user-plus', text: 'Yeni kullanıcı kaydı: Ahmet Yılmaz', time: '5 dakika önce', color: 'text-green-600', badge: 'KULLANICI' },
        { icon: 'fa-home', text: 'Yeni ilan eklendi: 3+1 Daire Kadıköy', time: '15 dakika önce', color: 'text-blue-600', badge: 'İLAN' },
        { icon: 'fa-handshake', text: 'Teklif kabul edildi: Villa Zekeriyaköy', time: '1 saat önce', color: 'text-purple-600', badge: 'TEKLİF' },
        { icon: 'fa-check-circle', text: 'Sözleşme onaylandı: Kadıköy Konut Projesi', time: '2 saat önce', color: 'text-emerald-600', badge: 'SÖZLEŞMİ' },
        { icon: 'fa-coins', text: 'Komisyon ödemesi alındı: ₺12,500', time: '3 saat önce', color: 'text-yellow-600', badge: 'ÖDEME' }
    ];

    activityList.innerHTML = activities.slice(0, 4).map(activity => `
        <div class="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div class="flex-shrink-0 mt-1">
                <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <i class="fas ${activity.icon} ${activity.color} text-sm"></i>
                </div>
            </div>
            <div class="flex-1 min-w-0">
                <div class="flex items-center space-x-2 mb-1">
                    <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        ${activity.badge}
                    </span>
            </div>
                <p class="text-sm font-medium text-gray-900 leading-tight">${activity.text}</p>
                <p class="text-xs text-gray-500 mt-1">${activity.time}</p>
            </div>
        </div>
    `).join('');
}

function loadPendingVerificationRequests() {
    const verificationList = document.getElementById('pending-verification-list');
    const pendingRequests = [
        {
            id: 1,
            name: 'Mehmet Öztürk',
            type: 'Müteahhit',
            submitDate: '2024-01-20',
            documents: ['İş Belgesi', 'Vergi Levhası', 'İmza Sirküsü']
        },
        {
            id: 2,
            name: 'Ayşe Kaya',
            type: 'Mimar',
            submitDate: '2024-01-19',
            documents: ['Diploma', 'Oda Kayıt Belgesi', 'CV']
        },
        {
            id: 3,
            name: 'Can Demir',
            type: 'Noter',
            submitDate: '2024-01-18',
            documents: ['Noter Belgesi', 'İmza Beyanı']
        }
    ];

    document.getElementById('pending-verification-count').textContent = pendingRequests.length;

    verificationList.innerHTML = pendingRequests.slice(0, 3).map(request => `
        <div class="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <span class="text-sm font-medium text-orange-600">${request.name.charAt(0)}</span>
                </div>
                <div>
                    <p class="text-sm font-medium text-gray-900">${request.name}</p>
                    <p class="text-xs text-gray-500">${request.type} • ${formatDate(request.submitDate)}</p>
                    <p class="text-xs text-orange-600 mt-1">${request.documents.length} belge beklemede</p>
                </div>
            </div>
            <button onclick="reviewVerificationRequest(${request.id})" 
                    class="px-3 py-1 bg-orange-600 text-white text-xs font-medium rounded hover:bg-orange-700 transition-colors">
                İncele
            </button>
        </div>
    `).join('');
}

// User Management Functions
let filteredUsers = [];

function loadUsers() {
    filteredUsers = [...sampleData.users]; // Copy all users initially
    renderUserTable();
    updateUserCounts();
}

function renderUserTable() {
    const userList = document.getElementById('user-list');

    userList.innerHTML = filteredUsers.map(user => `
        <tr>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                        <div class="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                            <span class="text-sm font-medium text-purple-600">${user.name.charAt(0)}</span>
                        </div>
                    </div>
                    <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">${user.name}</div>
                        <div class="text-sm text-gray-500">${user.email}</div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <span class="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        ${getRoleIcon(user.type)}
                    ${getUserTypeText(user.type)}
                </span>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getAccountStatusColor(user.accountStatus)}">
                    ${getAccountStatusText(user.accountStatus)}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getVerificationStatusColor(user.verificationStatus)}">
                    ${getVerificationStatusText(user.verificationStatus)}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${formatDate(user.registrationDate)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${user.lastLogin === 'Never' ? 'Hiç' : formatDate(user.lastLogin)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-end space-x-2">
                    ${shouldShowReviewButton(user) ? `
                        <button onclick="openReviewVerificationModal(${user.id})" class="text-orange-600 hover:text-orange-900 text-xs bg-orange-50 px-2 py-1 rounded">
                            İncele
                        </button>
                    ` : ''}
                    <button onclick="openEditUserModal(${user.id})" class="text-blue-600 hover:text-blue-900 text-xs bg-blue-50 px-2 py-1 rounded">
                        Düzenle
                    </button>
                    <button onclick="openDeleteUserModal(${user.id})" class="text-red-600 hover:text-red-900 text-xs bg-red-50 px-2 py-1 rounded">
                        Sil
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function updateUserCounts() {
    document.getElementById('total-users-count').textContent = sampleData.users.length;
    document.getElementById('filtered-count').textContent = filteredUsers.length;
}

// Global variables for listing management
let filteredListings = [];
let currentListingAction = null;
let currentListingId = null;

// Listing Management Functions
function loadListings() {
    filteredListings = [...sampleData.listings];
    renderListingsTable();
    updateListingStats();
    updateListingCounts();
}

function renderListingsTable() {
    const tbody = document.getElementById('listings-table');
    if (!tbody) return;

    tbody.innerHTML = filteredListings.map(listing => `
        <tr class="hover:bg-gray-50">
            <td class="px-4 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                        <div class="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center">
                            <i class="fas fa-image text-gray-400"></i>
                        </div>
                    </div>
                    <div class="ml-3">
                        <div class="text-sm font-medium text-gray-900">${listing.title}</div>
                        <div class="text-sm text-gray-500">#${listing.id}</div>
                    </div>
                </div>
            </td>
            <td class="px-4 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">${listing.owner.name}</div>
                <div class="text-sm text-gray-500">${listing.owner.phone}</div>
            </td>
            <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                ${listing.city.charAt(0).toUpperCase() + listing.city.slice(1)}, ${listing.district}
            </td>
            <td class="px-4 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getListingTypeColor(listing.type)}">
                    ${getListingTypeText(listing.type)}
                </span>
            </td>
            <td class="px-4 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(listing.status)}">
                    ${getStatusText(listing.status)}
                </span>
            </td>
            <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                <div class="flex items-center">
                    <span class="font-medium">${listing.offerCount}</span>
                    <span class="ml-1 text-gray-500">teklif</span>
                </div>
            </td>
            <td class="px-4 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getZoningStatusColor(listing.zoningStatus)}">
                    ${getZoningStatusText(listing.zoningStatus)}
                </span>
            </td>
            <td class="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center justify-end space-x-1">
                    <button onclick="openListingDetailsModal(${listing.id})" class="text-blue-600 hover:text-blue-900 px-2 py-1 rounded text-xs" title="Detay">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button onclick="openEditListingModal(${listing.id})" class="text-purple-600 hover:text-purple-900 px-2 py-1 rounded text-xs" title="Düzenle">
                        <i class="fas fa-edit"></i>
                    </button>
                    ${listing.status === 'pending' ? `
                        <button onclick="confirmApproveRejectListing(${listing.id}, 'approved')" class="text-green-600 hover:text-green-900 px-2 py-1 rounded text-xs" title="Onayla">
                            <i class="fas fa-check"></i>
                        </button>
                        <button onclick="confirmApproveRejectListing(${listing.id}, 'rejected')" class="text-red-600 hover:text-red-900 px-2 py-1 rounded text-xs" title="Reddet">
                            <i class="fas fa-times"></i>
                        </button>
                    ` : ''}
                    <button onclick="confirmDeleteListingAction(${listing.id})" class="text-red-600 hover:text-red-900 px-2 py-1 rounded text-xs" title="Sil">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function updateListingCounts() {
    const filteredCount = filteredListings.length;
    const totalCount = sampleData.listings.length;

    if (document.getElementById('filtered-listings-count')) {
        document.getElementById('filtered-listings-count').textContent = filteredCount;
    }
    if (document.getElementById('total-listings-count')) {
        document.getElementById('total-listings-count').textContent = totalCount;
    }
}

function getZoningStatusText(status) {
    switch (status) {
        case 'waiting': return 'Bekleniyor';
        case 'documents_uploaded': return 'Belgeler Yüklendi';
        case 'payment_completed': return 'Ödeme Tamamlandı';
        case 'ready': return 'Hazır';
        default: return 'Bilinmiyor';
    }
}

function getZoningStatusColor(status) {
    switch (status) {
        case 'waiting': return 'bg-gray-100 text-gray-800';
        case 'documents_uploaded': return 'bg-blue-100 text-blue-800';
        case 'payment_completed': return 'bg-orange-100 text-orange-800';
        case 'ready': return 'bg-green-100 text-green-800';
        default: return 'bg-gray-100 text-gray-800';
    }
}

function updateListingStats() {
    const totalListings = sampleData.listings.length;
    const activeListings = sampleData.listings.filter(l => l.status === 'active').length;
    const pendingListings = sampleData.listings.filter(l => l.status === 'pending').length;
    const rejectedListings = sampleData.listings.filter(l => l.status === 'rejected').length;

    document.getElementById('total-listings').textContent = totalListings;
    document.getElementById('active-listings-count').textContent = activeListings;
    document.getElementById('pending-listings').textContent = pendingListings;
    document.getElementById('rejected-listings').textContent = rejectedListings;
}

// Listing Filters
function applyListingFilters() {
    const typeFilter = document.getElementById('listing-type-filter').value;
    const statusFilter = document.getElementById('listing-status-filter').value;
    const cityFilter = document.getElementById('listing-city-filter').value;
    const zoningFilter = document.getElementById('listing-zoning-status-filter').value;
    const searchTerm = document.getElementById('listing-search').value.toLowerCase();

    filteredListings = sampleData.listings.filter(listing => {
        const matchesType = !typeFilter || listing.type === typeFilter;
        const matchesStatus = !statusFilter || listing.status === statusFilter;
        const matchesCity = !cityFilter || listing.city === cityFilter;
        const matchesZoning = !zoningFilter || listing.zoningStatus === zoningFilter;
        const matchesSearch = !searchTerm ||
            listing.title.toLowerCase().includes(searchTerm) ||
            listing.owner.name.toLowerCase().includes(searchTerm) ||
            listing.district.toLowerCase().includes(searchTerm) ||
            listing.id.toString().includes(searchTerm);

        return matchesType && matchesStatus && matchesCity && matchesZoning && matchesSearch;
    });

    renderListingsTable();
    updateListingCounts();
}

function clearListingFilters() {
    document.getElementById('listing-type-filter').value = '';
    document.getElementById('listing-status-filter').value = '';
    document.getElementById('listing-city-filter').value = '';
    document.getElementById('listing-zoning-status-filter').value = '';
    document.getElementById('listing-search').value = '';
    applyListingFilters();
}

function exportListings() {
    showNotification('İlanlar CSV olarak dışa aktarılıyor...', 'info');
    // Simulate export functionality
    setTimeout(() => {
        showNotification('İlanlar başarıyla dışa aktarıldı.', 'success');
    }, 2000);
}

// Offer Management Functions
function loadOffers() {
    updateOfferStats();
    const offersTable = document.getElementById('offers-table');
    const filteredOffers = applyOfferFiltersToData();

    offersTable.innerHTML = filteredOffers.map(offer => {
        const isPending = offer.status === 'pending';

        return `
        <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#${offer.id}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${offer.listingTitle}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${offer.offerBy}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${offer.amount}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getOfferStatusColor(offer.status)}">
                    ${getOfferStatusText(offer.status)}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${formatDate(offer.date)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button onclick="openOfferDetailsModal(${offer.id})" class="bg-blue-100 text-blue-800 px-3 py-1 rounded-md text-xs font-medium hover:bg-blue-200 transition-colors mr-2">
                    Görüntüle
                </button>
                ${isPending ? `
                    <button onclick="confirmApproveOffer(${offer.id})" class="bg-green-100 text-green-800 px-3 py-1 rounded-md text-xs font-medium hover:bg-green-200 transition-colors mr-2">
                        Onayla
                    </button>
                    <button onclick="confirmRejectOffer(${offer.id})" class="bg-red-100 text-red-800 px-3 py-1 rounded-md text-xs font-medium hover:bg-red-200 transition-colors">
                        Reddet
                    </button>
                ` : `
                    <button disabled class="bg-gray-100 text-gray-400 px-3 py-1 rounded-md text-xs font-medium cursor-not-allowed mr-2">
                        Onayla
                    </button>
                    <button disabled class="bg-gray-100 text-gray-400 px-3 py-1 rounded-md text-xs font-medium cursor-not-allowed">
                        Reddet
                    </button>
                `}
            </td>
        </tr>
        `;
    }).join('');

    updateOfferFilterCounts(filteredOffers);
}

function updateOfferStats() {
    document.getElementById('total-offers').textContent = sampleData.offers.length;
    document.getElementById('pending-offers').textContent = sampleData.offers.filter(o => o.status === 'pending').length;
    document.getElementById('accepted-offers').textContent = sampleData.offers.filter(o => o.status === 'accepted').length;
    document.getElementById('rejected-offers').textContent = sampleData.offers.filter(o => o.status === 'rejected').length;
}

// Project Management Functions
function loadProjects() {
    updateProjectStats();
    const projectsTable = document.getElementById('projects-table');
    const filteredProjects = applyProjectFiltersToData();

    projectsTable.innerHTML = filteredProjects.map(project => {
        const isOngoing = project.status === 'ongoing';
        const progress = project.progress || 0;

        return `
        <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#${project.id}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${project.name}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${project.contractor}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${project.architect}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getProjectStatusColor(project.status)}">
                    ${getProjectStatusText(project.status)}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div class="flex items-center">
                    <div class="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div class="bg-blue-600 h-2 rounded-full" style="width: ${progress}%"></div>
                    </div>
                    <span class="text-xs font-medium">${progress}%</span>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${formatDate(project.startDate)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${formatDate(project.endDate)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-end space-x-1">
                    <button onclick="openProjectDetailsModal(${project.id})" class="bg-blue-100 text-blue-800 px-3 py-1 rounded-md text-xs font-medium hover:bg-blue-200 transition-colors" title="Proje detaylarını görüntüle">
                        Görüntüle
                    </button>
                    ${isOngoing ? `
                        <button onclick="completeProject(${project.id})" class="bg-green-100 text-green-800 px-3 py-1 rounded-md text-xs font-medium hover:bg-green-200 transition-colors" title="Projeyi tamamla">
                            Tamamla
                        </button>
                    ` : ''}
                    <button onclick="confirmDeleteProject(${project.id})" class="bg-red-100 text-red-800 px-3 py-1 rounded-md text-xs font-medium hover:bg-red-200 transition-colors" title="Projeyi sil">
                        Sil
                    </button>
                </div>
            </td>
        </tr>
        `;
    }).join('');

    updateProjectFilterCounts(filteredProjects);
}

function updateProjectStats() {
    document.getElementById('total-projects').textContent = sampleData.projects.length;
    document.getElementById('ongoing-projects').textContent = sampleData.projects.filter(p => p.status === 'ongoing').length;
    document.getElementById('completed-projects').textContent = sampleData.projects.filter(p => p.status === 'completed').length;
    document.getElementById('cancelled-projects').textContent = sampleData.projects.filter(p => p.status === 'cancelled').length;
}

// Legal Processes Functions
function loadLegalProcesses() {
    updateLegalStats();
    loadContracts();
    switchLegalTab('contracts');
}

function updateLegalStats() {
    const totalProcesses = sampleData.legalProcesses.contracts.length +
        sampleData.legalProcesses.documents.length +
        sampleData.legalProcesses.notary.length;
    document.getElementById('total-legal-processes').textContent = totalProcesses;
    document.getElementById('ongoing-legal').textContent = sampleData.legalProcesses.contracts.filter(c => c.status === 'active').length;
    document.getElementById('completed-legal').textContent = sampleData.legalProcesses.notary.filter(n => n.status === 'completed').length;
    document.getElementById('pending-documents').textContent = sampleData.legalProcesses.documents.filter(d => d.status === 'pending').length;
}

function switchLegalTab(tabName) {
    // Hide all tab panels
    document.querySelectorAll('.legal-tab-panel').forEach(panel => {
        panel.classList.add('hidden');
    });

    // Remove active class from all tabs
    document.querySelectorAll('.legal-tab').forEach(tab => {
        tab.classList.remove('active', 'border-purple-500', 'text-purple-600');
        tab.classList.add('border-transparent', 'text-gray-500');
    });

    // Show selected tab panel
    const selectedPanel = document.getElementById(`${tabName}-content`);
    if (selectedPanel) {
        selectedPanel.classList.remove('hidden');
    }

    // Add active class to selected tab
    const selectedTab = document.querySelector(`[onclick="switchLegalTab('${tabName}')"]`);
    if (selectedTab) {
        selectedTab.classList.add('active', 'border-purple-500', 'text-purple-600');
        selectedTab.classList.remove('border-transparent', 'text-gray-500');
    }

    // Load tab-specific data
    switch (tabName) {
        case 'contracts':
            loadContracts();
            break;
        case 'documents':
            loadDocuments();
            break;
        case 'notary':
            loadNotaryProcesses();
            break;
    }
}

function loadContracts() {
    const contractsTable = document.getElementById('contracts-table');
    const filteredContracts = applyLegalFiltersToData();

    contractsTable.innerHTML = filteredContracts.map(contract => `
        <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#${contract.id}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${getLegalProcessTypeText(contract.type)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${contract.parties}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${contract.notary || 'Atanmadı'}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getLegalProcessStatusColor(contract.status)}">
                    ${getLegalProcessStatusText(contract.status)}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${formatDate(contract.date)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-end space-x-1">
                    <button onclick="openLegalProcessDetailsModal(${contract.id})" class="bg-blue-100 text-blue-800 px-3 py-1 rounded-md text-xs font-medium hover:bg-blue-200 transition-colors" title="Süreç detaylarını görüntüle">
                        Görüntüle
                    </button>
                    <button onclick="openEditLegalProcessModal(${contract.id})" class="bg-green-100 text-green-800 px-3 py-1 rounded-md text-xs font-medium hover:bg-green-200 transition-colors" title="Süreci düzenle">
                        Düzenle
                    </button>
                    <button onclick="confirmDeleteLegalProcess(${contract.id})" class="bg-red-100 text-red-800 px-3 py-1 rounded-md text-xs font-medium hover:bg-red-200 transition-colors" title="Süreci sil">
                        Sil
                    </button>
                </div>
            </td>
        </tr>
    `).join('');

    updateLegalFilterCounts(filteredContracts);
}

function loadDocuments() {
    const documentsTable = document.getElementById('documents-table');
    documentsTable.innerHTML = sampleData.legalProcesses.documents.map(document => `
        <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#${document.id}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${document.type}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${document.owner}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(document.status)}">
                    ${getDocumentStatusText(document.status)}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${formatDate(document.uploadDate)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button onclick="viewDocument(${document.id})" class="text-indigo-600 hover:text-indigo-900 mr-2">Görüntüle</button>
                <button onclick="approveDocument(${document.id})" class="text-green-600 hover:text-green-900 mr-2">Onayla</button>
                <button onclick="rejectDocument(${document.id})" class="text-red-600 hover:text-red-900">Reddet</button>
            </td>
        </tr>
    `).join('');
}

function loadNotaryProcesses() {
    const notaryTable = document.getElementById('notary-table');
    notaryTable.innerHTML = sampleData.legalProcesses.notary.map(notary => `
        <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#${notary.id}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${notary.type}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${notary.notary}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getNotaryStatusColor(notary.status)}">
                    ${getNotaryStatusText(notary.status)}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${formatDate(notary.appointmentDate)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button onclick="viewNotaryProcess(${notary.id})" class="text-indigo-600 hover:text-indigo-900 mr-2">Görüntüle</button>
                <button onclick="editNotaryProcess(${notary.id})" class="text-green-600 hover:text-green-900 mr-2">Düzenle</button>
                <button onclick="cancelNotaryProcess(${notary.id})" class="text-red-600 hover:text-red-900">İptal</button>
            </td>
        </tr>
    `).join('');
}

// Support & Complaints Functions
function loadSupportComplaints() {
    updateSupportStats();
    loadSupportRequests();
    switchSupportTab('support');
}

function updateSupportStats() {
    const totalRequests = sampleData.supportComplaints.support.length +
        sampleData.supportComplaints.complaints.length +
        sampleData.supportComplaints.feedback.length;
    document.getElementById('total-support-requests').textContent = totalRequests;
    document.getElementById('open-support-requests').textContent = sampleData.supportComplaints.support.filter(s => s.status === 'open').length;
    document.getElementById('total-complaints').textContent = sampleData.supportComplaints.complaints.length;
    document.getElementById('resolution-rate').textContent = '85%';
}

function switchSupportTab(tabName) {
    // Hide all tab panels
    document.querySelectorAll('.support-tab-panel').forEach(panel => {
        panel.classList.add('hidden');
    });

    // Remove active class from all tabs
    document.querySelectorAll('.support-tab').forEach(tab => {
        tab.classList.remove('active', 'border-purple-500', 'text-purple-600');
        tab.classList.add('border-transparent', 'text-gray-500');
    });

    // Show selected tab panel
    const selectedPanel = document.getElementById(`${tabName}-content`);
    if (selectedPanel) {
        selectedPanel.classList.remove('hidden');
    }

    // Add active class to selected tab
    const selectedTab = document.querySelector(`[onclick="switchSupportTab('${tabName}')"]`);
    if (selectedTab) {
        selectedTab.classList.add('active', 'border-purple-500', 'text-purple-600');
        selectedTab.classList.remove('border-transparent', 'text-gray-500');
    }

    // Load tab-specific data
    switch (tabName) {
        case 'support':
            loadSupportRequests();
            break;
        case 'complaints':
            loadComplaints();
            break;
        case 'feedback':
            loadFeedback();
            break;
    }
}

function loadSupportRequests() {
    const supportRequests = applySupportFiltersToData();
    renderSupportRequestTable(supportRequests);
    updateSupportCount(supportRequests.length);
}

function applySupportFiltersToData() {
    const searchTerm = document.getElementById('support-search')?.value.toLowerCase() || '';
    const priorityFilter = document.getElementById('support-priority-filter')?.value || '';
    const statusFilter = document.getElementById('support-status-filter')?.value || '';
    const assignedFilter = document.getElementById('support-assigned-filter')?.value || '';

    let filteredRequests = [...sampleData.supportComplaints.support];

    // Apply search filter
    if (searchTerm) {
        filteredRequests = filteredRequests.filter(request =>
            request.id.toString().includes(searchTerm) ||
            request.subject.toLowerCase().includes(searchTerm) ||
            request.user.toLowerCase().includes(searchTerm)
        );
    }

    // Apply priority filter
    if (priorityFilter) {
        filteredRequests = filteredRequests.filter(request => request.priority === priorityFilter);
    }

    // Apply status filter
    if (statusFilter) {
        filteredRequests = filteredRequests.filter(request => request.status === statusFilter);
    }

    // Apply assigned filter
    if (assignedFilter) {
        if (assignedFilter === 'unassigned') {
            filteredRequests = filteredRequests.filter(request => !request.assignedTo);
        } else {
            filteredRequests = filteredRequests.filter(request => request.assignedTo === assignedFilter);
        }
    }

    return filteredRequests;
}

function renderSupportRequestTable(requests) {
    const supportTable = document.getElementById('support-requests-table');

    if (requests.length === 0) {
        supportTable.innerHTML = `
            <tr>
                <td colspan="8" class="px-6 py-8 text-center text-gray-500">
                    <i class="fas fa-inbox text-4xl mb-2 block"></i>
                    <p>Filtrelere uygun destek talebi bulunamadı</p>
                </td>
            </tr>
        `;
        return;
    }

    supportTable.innerHTML = requests.map(support => `
        <tr class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#${support.id}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <button onclick="openUserProfile('${support.userId}')" class="text-purple-600 hover:text-purple-700 font-medium">
                    ${support.user}
                </button>
                <div class="text-xs text-gray-500">${support.userType}</div>
            </td>
            <td class="px-6 py-4 text-sm text-gray-900 max-w-xs">
                <div class="truncate" title="${support.subject}">${support.subject}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSupportPriorityColor(support.priority)}">
                    ${getSupportPriorityText(support.priority)}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSupportStatusColor(support.status)}">
                    ${getSupportStatusText(support.status)}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${support.assignedTo ? support.assignedTo : 'Atanmamış'}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${formatDate(support.date)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-end space-x-2">
                    <button onclick="openSupportTicketDetailsModal(${support.id})" class="text-indigo-600 hover:text-indigo-900" title="Görüntüle">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button onclick="openReplyToSupportTicketModal(${support.id})" class="text-green-600 hover:text-green-900" title="Yanıtla">
                        <i class="fas fa-reply"></i>
                    </button>
                    <button onclick="openChangePriorityModal(${support.id})" class="text-orange-600 hover:text-orange-900" title="Öncelik Değiştir">
                        <i class="fas fa-exclamation-triangle"></i>
                    </button>
                    <button onclick="openAssignToAdminModal(${support.id})" class="text-blue-600 hover:text-blue-900" title="Ata">
                        <i class="fas fa-user-plus"></i>
                    </button>
                    <button onclick="confirmCloseSupportTicket(${support.id})" class="text-red-600 hover:text-red-900" title="Kapat">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function loadComplaints() {
    const complaintsTable = document.getElementById('complaints-table');
    complaintsTable.innerHTML = sampleData.supportComplaints.complaints.map(complaint => `
        <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#${complaint.id}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${complaint.complainant}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${complaint.defendant}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${complaint.category}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getComplaintStatusColor(complaint.status)}">
                    ${getComplaintStatusText(complaint.status)}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${formatDate(complaint.date)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button onclick="viewComplaint(${complaint.id})" class="text-indigo-600 hover:text-indigo-900 mr-2">Görüntüle</button>
                <button onclick="investigateComplaint(${complaint.id})" class="text-yellow-600 hover:text-yellow-900 mr-2">İncele</button>
                <button onclick="resolveComplaint(${complaint.id})" class="text-green-600 hover:text-green-900">Çöz</button>
            </td>
        </tr>
    `).join('');
}

function loadFeedback() {
    const feedbackTable = document.getElementById('feedback-table');
    feedbackTable.innerHTML = sampleData.supportComplaints.feedback.map(feedback => `
        <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#${feedback.id}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${feedback.user}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${feedback.type}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div class="flex items-center">
                    ${generateStars(feedback.rating)}
                    <span class="ml-2 text-sm text-gray-600">(${feedback.rating}/5)</span>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${formatDate(feedback.date)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button onclick="viewFeedback(${feedback.id})" class="text-indigo-600 hover:text-indigo-900 mr-2">Görüntüle</button>
                <button onclick="respondToFeedback(${feedback.id})" class="text-green-600 hover:text-green-900">Yanıtla</button>
            </td>
        </tr>
    `).join('');
}

// Utility Functions
function getUserTypeText(type) {
    const types = {
        'customer': 'Müşteri',
        'contractor': 'Müteahhit',
        'architect': 'Mimar',
        'notary': 'Noter',
        'admin': 'Admin'
    };
    return types[type] || type;
}

function getRoleIcon(type) {
    const icons = {
        'customer': '<i class="fas fa-user mr-1"></i>',
        'contractor': '<i class="fas fa-hard-hat mr-1"></i>',
        'architect': '<i class="fas fa-drafting-compass mr-1"></i>',
        'notary': '<i class="fas fa-stamp mr-1"></i>',
        'admin': '<i class="fas fa-crown mr-1"></i>'
    };
    return icons[type] || '<i class="fas fa-user mr-1"></i>';
}

function getAccountStatusText(status) {
    const statuses = {
        'active': 'Aktif',
        'inactive': 'Pasif',
        'suspended': 'Askıya Alınmış'
    };
    return statuses[status] || status;
}

function getAccountStatusColor(status) {
    const colors = {
        'active': 'bg-green-100 text-green-800',
        'inactive': 'bg-gray-100 text-gray-800',
        'suspended': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
}

function getVerificationStatusText(status) {
    const statuses = {
        'verified': 'Doğrulanmış',
        'pending': 'Beklemede',
        'rejected': 'Reddedildi',
        'not_required': 'Gerekli Değil'
    };
    return statuses[status] || status;
}

function getVerificationStatusColor(status) {
    const colors = {
        'verified': 'bg-green-100 text-green-800',
        'pending': 'bg-orange-100 text-orange-800',
        'rejected': 'bg-red-100 text-red-800',
        'not_required': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
}

function shouldShowReviewButton(user) {
    // Show review button only for contractor, architect, notary with pending or rejected verification
    const professionalRoles = ['contractor', 'architect', 'notary'];
    const reviewableStatuses = ['pending', 'rejected'];

    return professionalRoles.includes(user.type) && reviewableStatuses.includes(user.verificationStatus);
}

function getListingTypeText(type) {
    const types = {
        'apartment': 'Daire',
        'house': 'Ev',
        'office': 'Ofis',
        'land': 'Arsa',
        'villa': 'Villa',
        'commercial': 'Ticari'
    };
    return types[type] || type;
}

function getListingTypeColor(type) {
    switch (type) {
        case 'apartment': return 'bg-blue-100 text-blue-800';
        case 'house': return 'bg-green-100 text-green-800';
        case 'office': return 'bg-purple-100 text-purple-800';
        case 'land': return 'bg-yellow-100 text-yellow-800';
        case 'villa': return 'bg-pink-100 text-pink-800';
        case 'commercial': return 'bg-orange-100 text-orange-800';
        default: return 'bg-gray-100 text-gray-800';
    }
}

function getStatusText(status) {
    const statuses = {
        'active': 'Aktif',
        'pending': 'Beklemede',
        'rejected': 'Reddedildi',
        'suspended': 'Askıya Alındı',
        'expired': 'Süresi Doldu'
    };
    return statuses[status] || status;
}

function getOfferStatusText(status) {
    const statuses = {
        'pending': 'Beklemede',
        'accepted': 'Kabul Edildi',
        'rejected': 'Reddedildi'
    };
    return statuses[status] || status;
}

function getOfferStatusColor(status) {
    const colors = {
        'pending': 'bg-yellow-100 text-yellow-800',
        'accepted': 'bg-green-100 text-green-800',
        'rejected': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
}

function getProjectStatusText(status) {
    const statuses = {
        'planning': 'Planlama',
        'ongoing': 'Devam Eden',
        'completed': 'Tamamlandı',
        'cancelled': 'İptal Edildi'
    };
    return statuses[status] || status;
}

function getDocumentStatusText(status) {
    const statuses = {
        'approved': 'Onaylandı',
        'pending': 'Beklemede',
        'rejected': 'Reddedildi'
    };
    return statuses[status] || status;
}

function getNotaryStatusText(status) {
    const statuses = {
        'scheduled': 'Randevu Alındı',
        'completed': 'Tamamlandı',
        'cancelled': 'İptal Edildi'
    };
    return statuses[status] || status;
}

function getSupportStatusText(status) {
    const statuses = {
        'open': 'Açık',
        'closed': 'Kapalı',
        'pending': 'Beklemede'
    };
    return statuses[status] || status;
}

function getComplaintStatusText(status) {
    const statuses = {
        'investigating': 'İnceleniyor',
        'resolved': 'Çözüldü',
        'dismissed': 'Reddedildi'
    };
    return statuses[status] || status;
}

function getPriorityText(priority) {
    const priorities = {
        'high': 'Yüksek',
        'medium': 'Orta',
        'low': 'Düşük'
    };
    return priorities[priority] || priority;
}

function getStatusColor(status) {
    const colors = {
        'active': 'bg-green-100 text-green-800',
        'pending': 'bg-yellow-100 text-yellow-800',
        'rejected': 'bg-red-100 text-red-800',
        'suspended': 'bg-gray-100 text-gray-800',
        'expired': 'bg-red-100 text-red-800',
        'accepted': 'bg-green-100 text-green-800',
        'open': 'bg-blue-100 text-blue-800',
        'closed': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
}

function getProjectStatusColor(status) {
    const colors = {
        'planning': 'bg-blue-100 text-blue-800',
        'ongoing': 'bg-yellow-100 text-yellow-800',
        'completed': 'bg-green-100 text-green-800',
        'cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
}

function getNotaryStatusColor(status) {
    const colors = {
        'scheduled': 'bg-blue-100 text-blue-800',
        'completed': 'bg-green-100 text-green-800',
        'cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
}

function getComplaintStatusColor(status) {
    const colors = {
        'investigating': 'bg-yellow-100 text-yellow-800',
        'resolved': 'bg-green-100 text-green-800',
        'dismissed': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
}

function getPriorityColor(priority) {
    const colors = {
        'high': 'bg-red-100 text-red-800',
        'medium': 'bg-yellow-100 text-yellow-800',
        'low': 'bg-green-100 text-green-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
}

function formatDate(dateString) {
    if (!dateString || dateString === 'Never') return dateString;
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR');
}

function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star text-yellow-400"></i>';
        } else {
            stars += '<i class="far fa-star text-gray-300"></i>';
        }
    }
    return stars;
}

// Modal Functions
function openViewModal(title, content) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-content').innerHTML = content;
    document.getElementById('view-modal').classList.remove('hidden');
    document.getElementById('view-modal').classList.add('flex');
}

function closeViewModal() {
    document.getElementById('view-modal').classList.add('hidden');
    document.getElementById('view-modal').classList.remove('flex');
}

function openEditModal(title, formContent, onSubmit) {
    document.getElementById('edit-modal-title').textContent = title;
    document.getElementById('edit-form-content').innerHTML = formContent;
    document.getElementById('edit-modal').classList.remove('hidden');
    document.getElementById('edit-modal').classList.add('flex');

    // Set form submit handler
    document.getElementById('edit-form').onsubmit = onSubmit;
}

function closeEditModal() {
    document.getElementById('edit-modal').classList.add('hidden');
    document.getElementById('edit-modal').classList.remove('flex');
}

// User Management Functions
function viewUser(id) {
    const user = sampleData.users.find(u => u.id == id);
    if (!user) {
        showNotification('Kullanıcı bulunamadı', 'error');
        return;
    }

    const content = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
                <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-gray-800 mb-2">Temel Bilgiler</h4>
                    <div class="space-y-2">
                        <p><span class="font-medium">ID:</span> ${user.id}</p>
                        <p><span class="font-medium">Ad Soyad:</span> ${user.name}</p>
                        <p><span class="font-medium">E-posta:</span> ${user.email}</p>
                        <p><span class="font-medium">Kullanıcı Tipi:</span> <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">${getUserTypeText(user.type)}</span></p>
                        <p><span class="font-medium">Durum:</span> <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}">${getStatusText(user.status)}</span></p>
                    </div>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-gray-800 mb-2">Tarih Bilgileri</h4>
                    <div class="space-y-2">
                        <p><span class="font-medium">Kayıt Tarihi:</span> ${formatDate(user.registrationDate)}</p>
                        <p><span class="font-medium">Son Giriş:</span> ${user.lastLogin === 'Never' ? 'Hiç giriş yapmamış' : formatDate(user.lastLogin)}</p>
                    </div>
                </div>
            </div>
            <div class="space-y-4">
                <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-gray-800 mb-2">İstatistikler</h4>
                    <div class="space-y-2">
                        <p><span class="font-medium">Toplam İlan:</span> ${sampleData.listings.filter(l => l.owner === user.name).length}</p>
                        <p><span class="font-medium">Aktif İlan:</span> ${sampleData.listings.filter(l => l.owner === user.name && l.status === 'active').length}</p>
                        <p><span class="font-medium">Gönderilen Teklif:</span> ${sampleData.offers.filter(o => o.offerBy === user.name).length}</p>
                    </div>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-gray-800 mb-2">İşlemler</h4>
                    <div class="flex flex-wrap gap-2">
                        <button onclick="editUser(${user.id})" class="px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">Düzenle</button>
                        <button onclick="resetPassword(${user.id})" class="px-3 py-2 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600">Şifre Sıfırla</button>
                        <button onclick="toggleUserStatus(${user.id})" class="px-3 py-2 bg-green-500 text-white rounded text-sm hover:bg-green-600">Durumu Değiştir</button>
                        <button onclick="deleteUser(${user.id})" class="px-3 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600">Sil</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    openViewModal(`Kullanıcı Detayları - ${user.name}`, content);
}

// These functions are replaced by modal-based functions above

// Listing Management Functions
function viewListing(id) {
    const listing = sampleData.listings.find(l => l.id == id);
    if (!listing) {
        showNotification('İlan bulunamadı', 'error');
        return;
    }

    const content = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
                <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-gray-800 mb-2">İlan Bilgileri</h4>
                    <div class="space-y-2">
                        <p><span class="font-medium">İlan ID:</span> #${listing.id}</p>
                        <p><span class="font-medium">Başlık:</span> ${listing.title}</p>
                        <p><span class="font-medium">Tip:</span> <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">${getListingTypeText(listing.type)}</span></p>
                        <p><span class="font-medium">Konum:</span> ${listing.location}</p>
                        <p><span class="font-medium">Fiyat:</span> <span class="text-lg font-bold text-green-600">${listing.price}</span></p>
                        <p><span class="font-medium">Durum:</span> <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(listing.status)}">${getStatusText(listing.status)}</span></p>
                    </div>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-gray-800 mb-2">Sahibi</h4>
                    <div class="space-y-2">
                        <p><span class="font-medium">Ad Soyad:</span> ${listing.owner}</p>
                        <p><span class="font-medium">Oluşturulma Tarihi:</span> ${formatDate(listing.date)}</p>
                    </div>
                </div>
            </div>
            <div class="space-y-4">
                <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-gray-800 mb-2">İstatistikler</h4>
                    <div class="space-y-2">
                        <p><span class="font-medium">Alınan Teklifler:</span> ${sampleData.offers.filter(o => o.listingTitle === listing.title).length}</p>
                        <p><span class="font-medium">Bekleyen Teklifler:</span> ${sampleData.offers.filter(o => o.listingTitle === listing.title && o.status === 'pending').length}</p>
                        <p><span class="font-medium">Kabul Edilen Teklifler:</span> ${sampleData.offers.filter(o => o.listingTitle === listing.title && o.status === 'accepted').length}</p>
                    </div>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-gray-800 mb-2">İşlemler</h4>
                    <div class="flex flex-wrap gap-2">
                        ${listing.status === 'pending' ? `
                            <button onclick="approveListing(${listing.id})" class="px-3 py-2 bg-green-500 text-white rounded text-sm hover:bg-green-600">Onayla</button>
                            <button onclick="rejectListing(${listing.id})" class="px-3 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600">Reddet</button>
                        ` : ''}
                        <button onclick="editListing(${listing.id})" class="px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">Düzenle</button>
                        <button onclick="deleteListing(${listing.id})" class="px-3 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600">Sil</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    openViewModal(`İlan Detayları - ${listing.title}`, content);
}

function approveListing(id) {
    const listing = sampleData.listings.find(l => l.id == id);
    if (listing) {
        listing.status = 'active';
        showNotification('İlan onaylandı', 'success');
        loadListings();
        closeViewModal();
    }
}

function rejectListing(id) {
    const listing = sampleData.listings.find(l => l.id == id);
    if (listing) {
        listing.status = 'rejected';
        showNotification('İlan reddedildi', 'error');
        loadListings();
        closeViewModal();
    }
}

// Offer Management Functions
function viewOffer(id) {
    const offer = sampleData.offers.find(o => o.id == id);
    if (!offer) {
        showNotification('Teklif bulunamadı', 'error');
        return;
    }

    const content = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
                <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-gray-800 mb-2">Teklif Bilgileri</h4>
                    <div class="space-y-2">
                        <p><span class="font-medium">Teklif ID:</span> #${offer.id}</p>
                        <p><span class="font-medium">İlan:</span> ${offer.listingTitle}</p>
                        <p><span class="font-medium">Teklif Veren:</span> ${offer.offerBy}</p>
                        <p><span class="font-medium">Teklif Tutarı:</span> <span class="text-lg font-bold text-green-600">${offer.amount}</span></p>
                        <p><span class="font-medium">Durum:</span> <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(offer.status)}">${getOfferStatusText(offer.status)}</span></p>
                        <p><span class="font-medium">Tarih:</span> ${formatDate(offer.date)}</p>
                    </div>
                </div>
            </div>
            <div class="space-y-4">
                <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-gray-800 mb-2">İşlemler</h4>
                    <div class="flex flex-wrap gap-2">
                        ${offer.status === 'pending' ? `
                            <button onclick="approveOffer(${offer.id})" class="px-3 py-2 bg-green-500 text-white rounded text-sm hover:bg-green-600">Onayla</button>
                            <button onclick="rejectOffer(${offer.id})" class="px-3 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600">Reddet</button>
                        ` : ''}
                        <button onclick="deleteOffer(${offer.id})" class="px-3 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600">Sil</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    openViewModal(`Teklif Detayları - #${offer.id}`, content);
}

function approveOffer(id) {
    const offer = sampleData.offers.find(o => o.id == id);
    if (offer) {
        offer.status = 'accepted';
        showNotification('Teklif onaylandı', 'success');
        loadOffers();
        closeViewModal();
    }
}

function rejectOffer(id) {
    const offer = sampleData.offers.find(o => o.id == id);
    if (offer) {
        offer.status = 'rejected';
        showNotification('Teklif reddedildi', 'error');
        loadOffers();
        closeViewModal();
    }
}

// Project Management Functions
function viewProject(id) {
    const project = sampleData.projects.find(p => p.id == id);
    if (!project) {
        showNotification('Proje bulunamadı', 'error');
        return;
    }

    const content = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
                <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-gray-800 mb-2">Proje Bilgileri</h4>
                    <div class="space-y-2">
                        <p><span class="font-medium">Proje ID:</span> #${project.id}</p>
                        <p><span class="font-medium">Proje Adı:</span> ${project.name}</p>
                        <p><span class="font-medium">Müteahhit:</span> ${project.contractor}</p>
                        <p><span class="font-medium">Mimar:</span> ${project.architect}</p>
                        <p><span class="font-medium">Durum:</span> <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getProjectStatusColor(project.status)}">${getProjectStatusText(project.status)}</span></p>
                    </div>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-gray-800 mb-2">Tarih Bilgileri</h4>
                    <div class="space-y-2">
                        <p><span class="font-medium">Başlangıç Tarihi:</span> ${formatDate(project.startDate)}</p>
                        <p><span class="font-medium">Bitiş Tarihi:</span> ${formatDate(project.endDate)}</p>
                        <p><span class="font-medium">Süre:</span> ${calculateProjectDuration(project.startDate, project.endDate)} gün</p>
                    </div>
                </div>
            </div>
            <div class="space-y-4">
                <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-gray-800 mb-2">İşlemler</h4>
                    <div class="flex flex-wrap gap-2">
                        <button onclick="editProject(${project.id})" class="px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">Düzenle</button>
                        <button onclick="changeProjectStatus(${project.id})" class="px-3 py-2 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600">Durum Değiştir</button>
                        <button onclick="deleteProject(${project.id})" class="px-3 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600">Sil</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    openViewModal(`Proje Detayları - ${project.name}`, content);
}

function editProject(id) { showNotification('Proje düzenleniyor: ' + id, 'info'); }
function deleteProject(id) {
    if (confirm('Bu projeyi silmek istediğinizden emin misiniz?')) {
        const index = sampleData.projects.findIndex(p => p.id == id);
        if (index > -1) {
            sampleData.projects.splice(index, 1);
            showNotification('Proje başarıyla silindi', 'success');
            loadProjects();
            closeViewModal();
        }
    }
}

// Legal Process Functions
function viewContract(id) {
    const contract = sampleData.legalProcesses.contracts.find(c => c.id == id);
    if (!contract) {
        showNotification('Sözleşme bulunamadı', 'error');
        return;
    }

    const content = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
                <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-gray-800 mb-2">Sözleşme Bilgileri</h4>
                    <div class="space-y-2">
                        <p><span class="font-medium">Sözleşme ID:</span> #${contract.id}</p>
                        <p><span class="font-medium">Tür:</span> ${contract.type}</p>
                        <p><span class="font-medium">Taraflar:</span> ${contract.parties}</p>
                        <p><span class="font-medium">Durum:</span> <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(contract.status)}">${getStatusText(contract.status)}</span></p>
                        <p><span class="font-medium">Tarih:</span> ${formatDate(contract.date)}</p>
                    </div>
                </div>
            </div>
            <div class="space-y-4">
                <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-gray-800 mb-2">İşlemler</h4>
                    <div class="flex flex-wrap gap-2">
                        <button onclick="editContract(${contract.id})" class="px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">Düzenle</button>
                        <button onclick="downloadContract(${contract.id})" class="px-3 py-2 bg-green-500 text-white rounded text-sm hover:bg-green-600">İndir</button>
                        <button onclick="deleteContract(${contract.id})" class="px-3 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600">Sil</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    openViewModal(`Sözleşme Detayları - ${contract.type}`, content);
}

function editContract(id) { showNotification('Sözleşme düzenleniyor: ' + id, 'info'); }
function deleteContract(id) { showNotification('Sözleşme siliniyor: ' + id, 'warning'); }

function viewDocument(id) {
    const document = sampleData.legalProcesses.documents.find(d => d.id == id);
    if (!document) {
        showNotification('Belge bulunamadı', 'error');
        return;
    }

    const content = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
                <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-gray-800 mb-2">Belge Bilgileri</h4>
                    <div class="space-y-2">
                        <p><span class="font-medium">Belge ID:</span> #${document.id}</p>
                        <p><span class="font-medium">Belge Türü:</span> ${document.type}</p>
                        <p><span class="font-medium">Sahibi:</span> ${document.owner}</p>
                        <p><span class="font-medium">Durum:</span> <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(document.status)}">${getDocumentStatusText(document.status)}</span></p>
                        <p><span class="font-medium">Yükleme Tarihi:</span> ${formatDate(document.uploadDate)}</p>
                    </div>
                </div>
            </div>
            <div class="space-y-4">
                <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-gray-800 mb-2">İşlemler</h4>
                    <div class="flex flex-wrap gap-2">
                        ${document.status === 'pending' ? `
                            <button onclick="approveDocument(${document.id})" class="px-3 py-2 bg-green-500 text-white rounded text-sm hover:bg-green-600">Onayla</button>
                            <button onclick="rejectDocument(${document.id})" class="px-3 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600">Reddet</button>
                        ` : ''}
                        <button onclick="downloadDocument(${document.id})" class="px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">İndir</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    openViewModal(`Belge Detayları - ${document.type}`, content);
}

function approveDocument(id) {
    const document = sampleData.legalProcesses.documents.find(d => d.id == id);
    if (document) {
        document.status = 'approved';
        showNotification('Belge onaylandı', 'success');
        loadDocuments();
        closeViewModal();
    }
}

function rejectDocument(id) {
    const document = sampleData.legalProcesses.documents.find(d => d.id == id);
    if (document) {
        document.status = 'rejected';
        showNotification('Belge reddedildi', 'error');
        loadDocuments();
        closeViewModal();
    }
}

function viewNotaryProcess(id) {
    const notary = sampleData.legalProcesses.notary.find(n => n.id == id);
    if (!notary) {
        showNotification('Noter işlemi bulunamadı', 'error');
        return;
    }

    const content = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
                <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-gray-800 mb-2">Noter İşlem Bilgileri</h4>
                    <div class="space-y-2">
                        <p><span class="font-medium">İşlem ID:</span> #${notary.id}</p>
                        <p><span class="font-medium">İşlem Türü:</span> ${notary.type}</p>
                        <p><span class="font-medium">Noter:</span> ${notary.notary}</p>
                        <p><span class="font-medium">Durum:</span> <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getNotaryStatusColor(notary.status)}">${getNotaryStatusText(notary.status)}</span></p>
                        <p><span class="font-medium">Randevu Tarihi:</span> ${formatDate(notary.appointmentDate)}</p>
                    </div>
                </div>
            </div>
            <div class="space-y-4">
                <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-gray-800 mb-2">İşlemler</h4>
                    <div class="flex flex-wrap gap-2">
                        <button onclick="editNotaryProcess(${notary.id})" class="px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">Düzenle</button>
                        <button onclick="cancelNotaryProcess(${notary.id})" class="px-3 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600">İptal Et</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    openViewModal(`Noter İşlemi - ${notary.type}`, content);
}

function editNotaryProcess(id) { showNotification('Noter işlemi düzenleniyor: ' + id, 'info'); }
function cancelNotaryProcess(id) { showNotification('Noter işlemi iptal edildi: ' + id, 'warning'); }

// Support & Complaints Functions
function viewSupportRequest(id) {
    const support = sampleData.supportComplaints.support.find(s => s.id == id);
    if (!support) {
        showNotification('Destek talebi bulunamadı', 'error');
        return;
    }

    const content = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
                <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-gray-800 mb-2">Destek Talebi</h4>
                    <div class="space-y-2">
                        <p><span class="font-medium">Talep ID:</span> #${support.id}</p>
                        <p><span class="font-medium">Kullanıcı:</span> ${support.user}</p>
                        <p><span class="font-medium">Konu:</span> ${support.subject}</p>
                        <p><span class="font-medium">Öncelik:</span> <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(support.priority)}">${getPriorityText(support.priority)}</span></p>
                        <p><span class="font-medium">Durum:</span> <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(support.status)}">${getSupportStatusText(support.status)}</span></p>
                        <p><span class="font-medium">Tarih:</span> ${formatDate(support.date)}</p>
                    </div>
                </div>
            </div>
            <div class="space-y-4">
                <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-gray-800 mb-2">İşlemler</h4>
                    <div class="flex flex-wrap gap-2">
                        <button onclick="respondToSupport(${support.id})" class="px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">Yanıtla</button>
                        <button onclick="closeSupportRequest(${support.id})" class="px-3 py-2 bg-green-500 text-white rounded text-sm hover:bg-green-600">Kapat</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    openViewModal(`Destek Talebi - ${support.subject}`, content);
}

function respondToSupport(id) { showNotification('Destek talebine yanıt veriliyor: ' + id, 'info'); }
function closeSupportRequest(id) {
    const support = sampleData.supportComplaints.support.find(s => s.id == id);
    if (support) {
        support.status = 'closed';
        showNotification('Destek talebi kapatıldı', 'success');
        loadSupportRequests();
        closeViewModal();
    }
}

function viewComplaint(id) {
    const complaint = sampleData.supportComplaints.complaints.find(c => c.id == id);
    if (!complaint) {
        showNotification('Şikayet bulunamadı', 'error');
        return;
    }

    const content = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
                <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-gray-800 mb-2">Şikayet Bilgileri</h4>
                    <div class="space-y-2">
                        <p><span class="font-medium">Şikayet ID:</span> #${complaint.id}</p>
                        <p><span class="font-medium">Şikayet Eden:</span> ${complaint.complainant}</p>
                        <p><span class="font-medium">Şikayet Edilen:</span> ${complaint.defendant}</p>
                        <p><span class="font-medium">Kategori:</span> ${complaint.category}</p>
                        <p><span class="font-medium">Durum:</span> <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getComplaintStatusColor(complaint.status)}">${getComplaintStatusText(complaint.status)}</span></p>
                        <p><span class="font-medium">Tarih:</span> ${formatDate(complaint.date)}</p>
                    </div>
                </div>
            </div>
            <div class="space-y-4">
                <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-gray-800 mb-2">İşlemler</h4>
                    <div class="flex flex-wrap gap-2">
                        <button onclick="investigateComplaint(${complaint.id})" class="px-3 py-2 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600">İncele</button>
                        <button onclick="resolveComplaint(${complaint.id})" class="px-3 py-2 bg-green-500 text-white rounded text-sm hover:bg-green-600">Çöz</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    openViewModal(`Şikayet - ${complaint.category}`, content);
}

function investigateComplaint(id) { showNotification('Şikayet inceleniyor: ' + id, 'info'); }
function resolveComplaint(id) {
    const complaint = sampleData.supportComplaints.complaints.find(c => c.id == id);
    if (complaint) {
        complaint.status = 'resolved';
        showNotification('Şikayet çözüldü', 'success');
        loadComplaints();
        closeViewModal();
    }
}

function viewFeedback(id) {
    const feedback = sampleData.supportComplaints.feedback.find(f => f.id == id);
    if (!feedback) {
        showNotification('Geri bildirim bulunamadı', 'error');
        return;
    }

    const content = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
                <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-gray-800 mb-2">Geri Bildirim</h4>
                    <div class="space-y-2">
                        <p><span class="font-medium">Geri Bildirim ID:</span> #${feedback.id}</p>
                        <p><span class="font-medium">Kullanıcı:</span> ${feedback.user}</p>
                        <p><span class="font-medium">Tür:</span> ${feedback.type}</p>
                        <p><span class="font-medium">Puan:</span> 
                            <div class="flex items-center mt-1">
                                ${generateStars(feedback.rating)}
                                <span class="ml-2 text-sm text-gray-600">(${feedback.rating}/5)</span>
                            </div>
                        </p>
                        <p><span class="font-medium">Tarih:</span> ${formatDate(feedback.date)}</p>
                    </div>
                </div>
            </div>
            <div class="space-y-4">
                <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-gray-800 mb-2">İşlemler</h4>
                    <div class="flex flex-wrap gap-2">
                        <button onclick="respondToFeedback(${feedback.id})" class="px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">Yanıtla</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    openViewModal(`Geri Bildirim - ${feedback.type}`, content);
}

function respondToFeedback(id) { showNotification('Geri bildirime yanıt veriliyor: ' + id, 'info'); }

// Helper Functions
function calculateProjectDuration(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

// Additional helper functions for new features
function resetPassword(id) { showNotification('Şifre sıfırlama e-postası gönderildi: ' + id, 'success'); }
function toggleUserStatus(id) { showNotification('Kullanıcı durumu güncellendi: ' + id, 'success'); }

// Filter Functions
function applyFilters() {
    const userTypeFilter = document.getElementById('user-type-filter').value;
    const accountStatusFilter = document.getElementById('account-status-filter').value;
    const verificationStatusFilter = document.getElementById('verification-status-filter').value;
    const registrationDateFilter = document.getElementById('registration-date-filter').value;
    const searchQuery = document.getElementById('user-search').value.toLowerCase();

    filteredUsers = sampleData.users.filter(user => {
        // User type filter
        if (userTypeFilter && user.type !== userTypeFilter) return false;

        // Account status filter
        if (accountStatusFilter && user.accountStatus !== accountStatusFilter) return false;

        // Verification status filter
        if (verificationStatusFilter && user.verificationStatus !== verificationStatusFilter) return false;

        // Registration date filter
        if (registrationDateFilter) {
            const userDate = new Date(user.registrationDate);
            const today = new Date();
            const daysDiff = Math.floor((today - userDate) / (1000 * 60 * 60 * 24));

            switch (registrationDateFilter) {
                case 'today':
                    if (daysDiff !== 0) return false;
                    break;
                case '7days':
                    if (daysDiff > 7) return false;
                    break;
                case '30days':
                    if (daysDiff > 30) return false;
                    break;
                case 'week':
                    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
                    if (userDate < startOfWeek) return false;
                    break;
                case 'month':
                    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
                    if (userDate < startOfMonth) return false;
                    break;
            }
        }

        // Search query filter
        if (searchQuery) {
            const searchFields = [
                user.name.toLowerCase(),
                user.email.toLowerCase(),
                user.id.toString()
            ];
            if (!searchFields.some(field => field.includes(searchQuery))) return false;
        }

        return true;
    });

    renderUserTable();
    updateUserCounts();
}

function clearFilters() {
    document.getElementById('user-type-filter').value = '';
    document.getElementById('account-status-filter').value = '';
    document.getElementById('verification-status-filter').value = '';
    document.getElementById('registration-date-filter').value = '';
    document.getElementById('user-search').value = '';

    filteredUsers = [...sampleData.users];
    renderUserTable();
    updateUserCounts();
}

function exportUsers() {
    showNotification('Kullanıcı listesi dışa aktarılıyor...', 'info');
    // In a real implementation, this would generate and download a CSV/Excel file
}

// User Management Modal Functions
let currentUserId = null;

function openEditUserModal(userId) {
    currentUserId = userId;
    const user = sampleData.users.find(u => u.id === userId);
    if (!user) {
        showNotification('Kullanıcı bulunamadı', 'error');
        return;
    }

    // Populate form fields
    document.getElementById('edit-user-name').value = user.name;
    document.getElementById('edit-user-email').value = user.email;
    document.getElementById('edit-user-phone').value = user.phone || '';
    document.getElementById('edit-user-role').value = user.type;
    document.getElementById('edit-user-biography').value = user.biography || '';

    // Set account status radio buttons
    const accountStatusRadios = document.querySelectorAll('input[name="account-status"]');
    accountStatusRadios.forEach(radio => {
        radio.checked = radio.value === user.accountStatus;
    });

    // Update avatar
    document.getElementById('edit-user-avatar').textContent = user.name.charAt(0).toUpperCase();

    // Toggle professional fields visibility
    toggleProfessionalFields();

    // Populate professional fields if user is professional
    if (['contractor', 'architect', 'notary'].includes(user.type)) {
        document.getElementById('edit-user-tax-number').value = user.taxNumber || '';
        document.getElementById('edit-user-registration-number').value = user.registrationNumber || '';
        document.getElementById('edit-user-chamber-registration').value = user.chamberRegistration || '';
    }

    // Show modal
    document.getElementById('edit-user-modal').classList.remove('hidden');
    document.getElementById('edit-user-modal').classList.add('flex');
}

function closeEditUserModal() {
    document.getElementById('edit-user-modal').classList.add('hidden');
    document.getElementById('edit-user-modal').classList.remove('flex');
    currentUserId = null;
}

function toggleProfessionalFields() {
    const role = document.getElementById('edit-user-role').value;
    const professionalFields = document.getElementById('professional-fields');

    if (['contractor', 'architect', 'notary'].includes(role)) {
        professionalFields.classList.remove('hidden');
    } else {
        professionalFields.classList.add('hidden');
    }
}

function changeProfilePhoto() {
    document.getElementById('profile-photo-input').click();
}

function handleProfilePhotoChange(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            // In a real implementation, this would upload the image
            showNotification('Profil fotoğrafı güncellendi', 'success');
        };
        reader.readAsDataURL(file);
    }
}

function saveUserChanges(event) {
    event.preventDefault();

    const user = sampleData.users.find(u => u.id === currentUserId);
    if (!user) return;

    // Update user data
    user.name = document.getElementById('edit-user-name').value;
    user.phone = document.getElementById('edit-user-phone').value;
    user.type = document.getElementById('edit-user-role').value;
    user.biography = document.getElementById('edit-user-biography').value;

    // Get selected account status
    const selectedStatus = document.querySelector('input[name="account-status"]:checked');
    if (selectedStatus) {
        user.accountStatus = selectedStatus.value;
    }

    closeEditUserModal();
    showNotification('Kullanıcı bilgileri güncellendi', 'success');
    renderUserTable();
}

function openDeleteUserModal(userId) {
    currentUserId = userId;
    const user = sampleData.users.find(u => u.id === userId);
    if (!user) {
        showNotification('Kullanıcı bulunamadı', 'error');
        return;
    }

    document.getElementById('delete-user-message').textContent =
        `"${user.name}" kullanıcısını silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`;

    document.getElementById('delete-user-modal').classList.remove('hidden');
    document.getElementById('delete-user-modal').classList.add('flex');
}

function closeDeleteUserModal() {
    document.getElementById('delete-user-modal').classList.add('hidden');
    document.getElementById('delete-user-modal').classList.remove('flex');
    currentUserId = null;
}

function confirmDeleteUser() {
    const userIndex = sampleData.users.findIndex(u => u.id === currentUserId);
    if (userIndex > -1) {
        const userName = sampleData.users[userIndex].name;
        sampleData.users.splice(userIndex, 1);

        closeDeleteUserModal();
        showNotification(`${userName} kullanıcısı silindi`, 'success');

        // Refresh filtered users and table
        applyFilters();
    }
}

function openReviewVerificationModal(userId) {
    currentUserId = userId;
    const user = sampleData.users.find(u => u.id === userId);
    if (!user) {
        showNotification('Kullanıcı bulunamadı', 'error');
        return;
    }

    // Populate user information
    const userInfoContainer = document.getElementById('verification-user-info');
    userInfoContainer.innerHTML = `
        <div class="flex items-center space-x-3 mb-4">
            <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span class="text-lg font-bold text-purple-600">${user.name.charAt(0)}</span>
            </div>
            <div>
                <h5 class="font-medium text-gray-900">${user.name}</h5>
                <p class="text-sm text-gray-500">${getUserTypeText(user.type)}</p>
            </div>
        </div>
        <div class="space-y-2">
            <p><span class="font-medium">E-posta:</span> ${user.email}</p>
            <p><span class="font-medium">Telefon:</span> ${user.phone}</p>
            <p><span class="font-medium">Vergi No:</span> ${user.taxNumber || 'Belirtilmemiş'}</p>
            <p><span class="font-medium">Sicil No:</span> ${user.registrationNumber || 'Belirtilmemiş'}</p>
            <p><span class="font-medium">Oda Kayıt:</span> ${user.chamberRegistration || 'Belirtilmemiş'}</p>
            <p><span class="font-medium">Kayıt Tarihi:</span> ${formatDate(user.registrationDate)}</p>
        </div>
    `;

    // Populate documents (simulated)
    const documentsContainer = document.getElementById('verification-documents');
    const sampleDocuments = [
        { name: 'Vergi Levhası', status: 'uploaded', date: '2024-01-18' },
        { name: 'Ticaret Sicil Gazetesi', status: 'uploaded', date: '2024-01-18' },
        { name: 'İmza Sirküsü', status: 'uploaded', date: '2024-01-19' },
        { name: 'Diploma/Sertifika', status: 'uploaded', date: '2024-01-19' }
    ];

    documentsContainer.innerHTML = sampleDocuments.map(doc => `
        <div class="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div class="flex items-center space-x-3">
                <i class="fas fa-file-pdf text-red-500"></i>
                <div>
                    <p class="text-sm font-medium text-gray-900">${doc.name}</p>
                    <p class="text-xs text-gray-500">Yüklendi: ${formatDate(doc.date)}</p>
                </div>
            </div>
            <div class="flex space-x-2">
                <button onclick="viewDocument('${doc.name}')" class="text-blue-600 hover:text-blue-800 text-xs">
                    Görüntüle
                </button>
                <button onclick="downloadDocument('${doc.name}')" class="text-green-600 hover:text-green-800 text-xs">
                    İndir
                </button>
            </div>
        </div>
    `).join('');

    // Populate verification history (simulated)
    const historyContainer = document.getElementById('verification-history');
    historyContainer.innerHTML = `
        <div class="text-sm text-gray-500 text-center py-4">
            Henüz inceleme geçmişi bulunmamaktadır.
        </div>
    `;

    // Clear admin notes
    document.getElementById('admin-notes').value = '';

    document.getElementById('review-verification-modal').classList.remove('hidden');
    document.getElementById('review-verification-modal').classList.add('flex');
}

function closeReviewVerificationModal() {
    document.getElementById('review-verification-modal').classList.add('hidden');
    document.getElementById('review-verification-modal').classList.remove('flex');
    currentUserId = null;
}

function approveVerification() {
    const adminNotes = document.getElementById('admin-notes').value;
    const user = sampleData.users.find(u => u.id === currentUserId);

    if (user) {
        user.verificationStatus = 'verified';
        closeReviewVerificationModal();
        showNotification(`${user.name} kullanıcısının doğrulaması onaylandı`, 'success');
        renderUserTable();
        loadPendingVerificationRequests(); // Refresh dashboard pending list
    }
}

function rejectVerification() {
    const adminNotes = document.getElementById('admin-notes').value.trim();

    if (!adminNotes) {
        showNotification('Reddetme nedeni belirtmeniz gerekiyor', 'error');
        return;
    }

    const user = sampleData.users.find(u => u.id === currentUserId);

    if (user) {
        user.verificationStatus = 'rejected';
        closeReviewVerificationModal();
        showNotification(`${user.name} kullanıcısının doğrulaması reddedildi`, 'error');
        renderUserTable();
        loadPendingVerificationRequests(); // Refresh dashboard pending list
    }
}

function viewDocument(docName) {
    showNotification(`${docName} belgesi görüntüleniyor...`, 'info');
    // In a real implementation, this would open the document in a new tab or modal
}

function downloadDocument(docName) {
    showNotification(`${docName} belgesi indiriliyor...`, 'info');
    // In a real implementation, this would trigger a file download
}

// Dashboard functions
function reviewVerificationRequest(id) {
    showNotification('Doğrulama talebi inceleniyor...', 'info');
    showSection('user-management-section');
    setTimeout(() => {
        openReviewVerificationModal(id);
    }, 500);
}

function showAllActivities() {
    showNotification('Tüm aktiviteler yükleniyor...', 'info');
    // This could open a dedicated activities section or modal
}
function editListing(id) { showNotification('İlan düzenleniyor: ' + id, 'info'); }
function deleteListing(id) { showNotification('İlan siliniyor: ' + id, 'warning'); }
function deleteOffer(id) { showNotification('Teklif siliniyor: ' + id, 'warning'); }
function changeProjectStatus(id) { showNotification('Proje durumu değiştiriliyor: ' + id, 'info'); }
function downloadContract(id) { showNotification('Sözleşme indiriliyor: ' + id, 'info'); }
function downloadDocument(id) { showNotification('Belge indiriliyor: ' + id, 'info'); }

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg text-white ${getNotificationColor(type)}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('removing');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function getNotificationColor(type) {
    const colors = {
        'success': 'bg-green-500',
        'error': 'bg-red-500',
        'warning': 'bg-yellow-500',
        'info': 'bg-blue-500'
    };
    return colors[type] || 'bg-blue-500';
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

// Setup Event Listeners
function setupEventListeners() {
    // Setup filters and search functionality
    setupFilters();

    // Setup mobile menu
    document.getElementById('mobile-menu-toggle')?.addEventListener('click', openMobileMenu);
    document.getElementById('sidebar-overlay')?.addEventListener('click', closeMobileMenu);
}

function setupFilters() {
    // Add event listeners for all filter elements
    // This would include search inputs, select filters, etc.
    // Implementation depends on specific filtering requirements
}

function setupSidebarNavigation() {
    // Already handled by onclick attributes in HTML
}

// Chart Functions
function setupCharts() {
    setupUserGrowthChart();
    setupProjectDistributionChart();
}

function setupUserGrowthChart() {
    const ctx = document.getElementById('userGrowthChart');
    if (!ctx) return;

    // Simulated data for last 7 days
    const today = new Date();
    const labels = [];
    const data = [];

    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        labels.push(date.toLocaleDateString('tr-TR', { weekday: 'short' }));
        // Simulated random data between 2-8 new users per day
        data.push(Math.floor(Math.random() * 7) + 2);
    }

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Yeni Kullanıcılar',
                data: data,
                borderColor: 'rgb(147, 51, 234)',
                backgroundColor: 'rgba(147, 51, 234, 0.1)',
                tension: 0.3,
                fill: true,
                pointBackgroundColor: 'rgb(147, 51, 234)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    cornerRadius: 8
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#6B7280'
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#F3F4F6'
                    },
                    ticks: {
                        color: '#6B7280',
                        stepSize: 1
                    }
                }
            }
        }
    });
}

function setupProjectDistributionChart() {
    const ctx = document.getElementById('projectDistributionChart');
    if (!ctx) return;

    // Calculate actual project distribution from sample data
    const ongoingProjects = sampleData.projects.filter(p => p.status === 'ongoing').length;
    const completedProjects = sampleData.projects.filter(p => p.status === 'completed').length;
    const planningProjects = sampleData.projects.filter(p => p.status === 'planning').length;
    const cancelledProjects = sampleData.projects.filter(p => p.status === 'cancelled').length;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Devam Eden', 'Tamamlanan', 'Planlama', 'İptal Edilen'],
            datasets: [{
                data: [ongoingProjects, completedProjects, planningProjects, cancelledProjects],
                backgroundColor: [
                    '#f59e0b', // amber-500
                    '#10b981', // emerald-500
                    '#3b82f6', // blue-500
                    '#ef4444'  // red-500
                ],
                borderWidth: 3,
                borderColor: '#ffffff',
                hoverBackgroundColor: [
                    '#d97706', // amber-600
                    '#059669', // emerald-600
                    '#2563eb', // blue-600
                    '#dc2626'  // red-600
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: 'circle',
                        font: {
                            size: 12
                        },
                        color: '#374151'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    cornerRadius: 8,
                    callbacks: {
                        label: function (context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((context.raw / total) * 100).toFixed(1);
                            return `${context.label}: ${context.raw} proje (${percentage}%)`;
                        }
                    }
                }
            },
            cutout: '65%'
        }
    });
}

// Logout Function
function logout() {
    if (confirm('Çıkış yapmak istediğinizden emin misiniz?')) {
        if (auth && auth.signOut) {
            auth.signOut().then(() => {
                // Clear localStorage as well
                localStorage.removeItem('admin_logged_in');
                localStorage.removeItem('admin_user_email');
                localStorage.removeItem('admin_user_role');
                localStorage.removeItem('admin_user_name');
                window.location.href = 'auth.html';
            }).catch((error) => {
                console.error('Logout error:', error);
                showNotification('Çıkış yapılırken hata oluştu', 'error');
            });
        } else {
            // Mock logout - just clear localStorage
            localStorage.removeItem('admin_logged_in');
            localStorage.removeItem('admin_user_email');
            localStorage.removeItem('admin_user_role');
            localStorage.removeItem('admin_user_name');
            window.location.href = 'auth.html';
        }
    }
}

// Content Management Functions (existing functionality)
function switchContentTab(tabName) {
    // Hide all content tab panels
    document.querySelectorAll('.content-tab-panel').forEach(panel => {
        panel.classList.add('hidden');
    });

    // Remove active class from all content tabs
    document.querySelectorAll('.content-tab').forEach(tab => {
        tab.classList.remove('active', 'border-purple-500', 'text-purple-600');
        tab.classList.add('border-transparent', 'text-gray-500');
    });

    // Show selected tab panel
    const selectedPanel = document.getElementById(`${tabName}-content`);
    if (selectedPanel) {
        selectedPanel.classList.remove('hidden');
    }

    // Add active class to selected tab
    const selectedTab = document.querySelector(`[onclick="switchContentTab('${tabName}')"]`);
    if (selectedTab) {
        selectedTab.classList.add('active', 'border-purple-500', 'text-purple-600');
        selectedTab.classList.remove('border-transparent', 'text-gray-500');
    }
}

function loadContentManagement() {
    // Load content management data
    switchContentTab('listings');
}

function loadSupportTickets() {
    // Load support tickets
    const ticketList = document.getElementById('ticket-list');
    if (ticketList) {
        ticketList.innerHTML = sampleData.tickets.map(ticket => `
            <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#${ticket.id}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${ticket.title}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${ticket.category}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(ticket.status)}">
                        ${getStatusText(ticket.status)}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${formatDate(ticket.date)}</td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onclick="viewTicket(${ticket.id})" class="text-indigo-600 hover:text-indigo-900 mr-2">Görüntüle</button>
                    <button onclick="closeTicket(${ticket.id})" class="text-green-600 hover:text-green-900">Kapat</button>
                </td>
            </tr>
        `).join('');
    }
}

// Financial Management Variables
let financialChart = null;
let revenueSourcesChart = null;
let expenseCategoriesChart = null;
let monthlyFinancialTrendChart = null;
let currentFinancialPeriod = '30d';

// Sample financial data
const sampleFinancialData = {
    revenue: {
        total: 285000,
        membership: 95000,
        listing: 78000,
        commission: 85000,
        advertising: 27000
    },
    expenses: {
        total: 165000,
        personnel: 75000,
        marketing: 35000,
        technology: 28000,
        notary: 27000
    },
    invoices: [
        {
            id: 'INV-001',
            number: 'F2025-001',
            type: 'incoming',
            client: 'Mehmet Yılmaz',
            amount: 15000,
            date: '2025-01-15',
            dueDate: '2025-02-15',
            status: 'paid',
            category: 'membership',
            description: 'Premium üyelik ücreti'
        },
        {
            id: 'INV-002',
            number: 'F2025-002',
            type: 'outgoing',
            client: 'ABC Pazarlama',
            amount: 8500,
            date: '2025-01-10',
            dueDate: '2025-01-25',
            status: 'pending',
            category: 'marketing',
            description: 'Dijital reklam kampanyası'
        },
        {
            id: 'INV-003',
            number: 'F2025-003',
            type: 'incoming',
            client: 'Ayşe Kaya',
            amount: 3500,
            date: '2025-01-08',
            dueDate: '2025-01-23',
            status: 'overdue',
            category: 'listing',
            description: 'İlan yayınlama ücreti'
        }
    ],
    transactions: [
        {
            id: 1,
            date: '2025-01-15',
            description: 'Premium üyelik - Mehmet Yılmaz',
            category: 'revenue',
            subcategory: 'membership',
            type: 'Gelir',
            amount: 15000
        },
        {
            id: 2,
            date: '2025-01-14',
            description: 'Pazarlama kampanyası',
            category: 'expenses',
            subcategory: 'marketing',
            type: 'Gider',
            amount: -8500
        },
        {
            id: 3,
            date: '2025-01-13',
            description: 'İlan yayınlama - Ayşe Kaya',
            category: 'revenue',
            subcategory: 'listing',
            type: 'Gelir',
            amount: 3500
        }
    ]
};

function loadFinancialData() {
    const period = document.getElementById('financial-time-period')?.value || '30d';
    updateFinancialStats(period);
    updateRevenueBreakdown();
    updateExpenseBreakdown();
    updateInvoiceStats();
    loadInvoiceTable();
    initializeFinancialChart();
}

function updateFinancialData() {
    const period = document.getElementById('financial-time-period').value;
    currentFinancialPeriod = period;
    updateFinancialStats(period);
    updateFinancialChart();
    showNotification('Finansal veriler güncellendi', 'success');
}

function refreshFinancialData() {
    showNotification('Finansal veriler yenileniyor...', 'info');
    setTimeout(() => {
        loadFinancialData();
        showNotification('Finansal veriler başarıyla yenilendi', 'success');
    }, 1000);
}

function updateFinancialStats(period) {
    const multiplier = getMultiplierForPeriod(period);
    const revenue = Math.round(sampleFinancialData.revenue.total * multiplier);
    const expenses = Math.round(sampleFinancialData.expenses.total * multiplier);
    const netProfit = revenue - expenses;
    const profitMargin = revenue > 0 ? ((netProfit / revenue) * 100).toFixed(1) : 0;

    // Update main stats
    document.getElementById('total-revenue').textContent = `₺${revenue.toLocaleString('tr-TR')}`;
    document.getElementById('total-expenses').textContent = `₺${expenses.toLocaleString('tr-TR')}`;
    document.getElementById('net-profit').textContent = `₺${netProfit.toLocaleString('tr-TR')}`;
    document.getElementById('profit-margin').textContent = `${profitMargin}%`;

    // Update colors based on profit/loss
    const netProfitElement = document.getElementById('net-profit');
    const profitChangeElement = document.getElementById('profit-change');

    if (netProfit >= 0) {
        netProfitElement.className = 'text-2xl font-bold text-green-600';
        profitChangeElement.className = 'text-sm text-green-600';
    } else {
        netProfitElement.className = 'text-2xl font-bold text-red-600';
        profitChangeElement.className = 'text-sm text-red-600';
    }

    // Update period text
    const periodText = getPeriodText(period);
    document.getElementById('revenue-period').textContent = periodText;
    document.getElementById('expenses-period').textContent = periodText;
    document.getElementById('profit-period').textContent = periodText;
    document.getElementById('margin-period').textContent = periodText;
}

function updateRevenueBreakdown() {
    const multiplier = getMultiplierForPeriod(currentFinancialPeriod);
    document.getElementById('membership-revenue').textContent = `₺${Math.round(sampleFinancialData.revenue.membership * multiplier).toLocaleString('tr-TR')}`;
    document.getElementById('listing-revenue').textContent = `₺${Math.round(sampleFinancialData.revenue.listing * multiplier).toLocaleString('tr-TR')}`;
    document.getElementById('commission-revenue').textContent = `₺${Math.round(sampleFinancialData.revenue.commission * multiplier).toLocaleString('tr-TR')}`;
    document.getElementById('ad-revenue').textContent = `₺${Math.round(sampleFinancialData.revenue.advertising * multiplier).toLocaleString('tr-TR')}`;
}

function updateExpenseBreakdown() {
    const multiplier = getMultiplierForPeriod(currentFinancialPeriod);
    document.getElementById('personnel-expenses').textContent = `₺${Math.round(sampleFinancialData.expenses.personnel * multiplier).toLocaleString('tr-TR')}`;
    document.getElementById('marketing-expenses').textContent = `₺${Math.round(sampleFinancialData.expenses.marketing * multiplier).toLocaleString('tr-TR')}`;
    document.getElementById('tech-expenses').textContent = `₺${Math.round(sampleFinancialData.expenses.technology * multiplier).toLocaleString('tr-TR')}`;
    document.getElementById('notary-expenses').textContent = `₺${Math.round(sampleFinancialData.expenses.notary * multiplier).toLocaleString('tr-TR')}`;
}

function getMultiplierForPeriod(period) {
    switch (period) {
        case '7d': return 0.25;
        case '30d': return 1;
        case '3m': return 1.5;
        case '6m': return 4;
        case '1y': return 12;
        default: return 1;
    }
}

function getPeriodText(period) {
    switch (period) {
        case '7d': return 'son 7 gün';
        case '30d': return 'son 30 gün';
        case '3m': return 'bu ay';
        case '6m': return 'son 6 ay';
        case '1y': return 'bu yıl';
        default: return 'son 30 gün';
    }
}

function initializeFinancialChart() {
    const ctx = document.getElementById('financial-trend-chart');
    if (ctx) {
        if (financialChart) {
            financialChart.destroy();
        }

        const labels = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz'];
        const revenueData = [45000, 52000, 48000, 61000, 55000, 67000];
        const expenseData = [32000, 28000, 35000, 42000, 38000, 45000];

        financialChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Gelir',
                    data: revenueData,
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.4
                }, {
                    label: 'Gider',
                    data: expenseData,
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function (value) {
                                return '₺' + value.toLocaleString('tr-TR');
                            }
                        }
                    }
                }
            }
        });
    }
}

function switchFinancialChart(type) {
    // Update button states
    document.querySelectorAll('[id$="-chart-btn"]').forEach(btn => {
        btn.className = 'px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg';
    });

    const activeBtn = document.getElementById(`${type}-chart-btn`);
    if (activeBtn) {
        if (type === 'revenue') {
            activeBtn.className = 'px-3 py-1 text-sm font-medium text-green-600 bg-green-100 rounded-lg';
        } else if (type === 'expenses') {
            activeBtn.className = 'px-3 py-1 text-sm font-medium text-red-600 bg-red-100 rounded-lg';
        } else {
            activeBtn.className = 'px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-lg';
        }
    }

    updateFinancialChart(type);
}

function updateFinancialChart(type = 'both') {
    if (!financialChart) return;

    const labels = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz'];
    const revenueData = [45000, 52000, 48000, 61000, 55000, 67000];
    const expenseData = [32000, 28000, 35000, 42000, 38000, 45000];

    let datasets = [];

    if (type === 'revenue' || type === 'both') {
        datasets.push({
            label: 'Gelir',
            data: revenueData,
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            tension: 0.4
        });
    }

    if (type === 'expenses' || type === 'both') {
        datasets.push({
            label: 'Gider',
            data: expenseData,
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            tension: 0.4
        });
    }

    financialChart.data.datasets = datasets;
    financialChart.update();
}

// General Financial Report Modal Functions
function viewGeneralFinancialReport() {
    document.getElementById('general-financial-report-modal').classList.remove('hidden');
    loadGeneralFinancialReport();
}

function closeGeneralFinancialReport() {
    document.getElementById('general-financial-report-modal').classList.add('hidden');
}

function loadGeneralFinancialReport() {
    const multiplier = getMultiplierForPeriod(currentFinancialPeriod);
    const revenue = Math.round(sampleFinancialData.revenue.total * multiplier);
    const expenses = Math.round(sampleFinancialData.expenses.total * multiplier);
    const netProfit = revenue - expenses;
    const profitMargin = revenue > 0 ? ((netProfit / revenue) * 100).toFixed(1) : 0;

    // Update modal stats
    document.getElementById('modal-total-revenue').textContent = `₺${revenue.toLocaleString('tr-TR')}`;
    document.getElementById('modal-total-expenses').textContent = `₺${expenses.toLocaleString('tr-TR')}`;
    document.getElementById('modal-net-profit').textContent = `₺${netProfit.toLocaleString('tr-TR')}`;
    document.getElementById('modal-profit-margin').textContent = `${profitMargin}%`;

    // Initialize charts
    initializeRevenueSourcesChart();
    initializeExpenseCategoriesChart();
    initializeMonthlyFinancialTrendChart();
    loadFinancialMetricsTable();
}

function initializeRevenueSourcesChart() {
    const ctx = document.getElementById('revenue-sources-chart');
    if (ctx) {
        if (revenueSourcesChart) {
            revenueSourcesChart.destroy();
        }

        revenueSourcesChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Üyelik Ücretleri', 'İlan Ücretleri', 'Komisyonlar', 'Reklam'],
                datasets: [{
                    data: [95000, 78000, 85000, 27000],
                    backgroundColor: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
}

function initializeExpenseCategoriesChart() {
    const ctx = document.getElementById('expense-categories-chart');
    if (ctx) {
        if (expenseCategoriesChart) {
            expenseCategoriesChart.destroy();
        }

        expenseCategoriesChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Personel', 'Pazarlama', 'Teknoloji', 'Noter'],
                datasets: [{
                    data: [75000, 35000, 28000, 27000],
                    backgroundColor: ['#ef4444', '#f97316', '#6b7280', '#6366f1']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
}

function initializeMonthlyFinancialTrendChart() {
    const ctx = document.getElementById('monthly-financial-trend-chart');
    if (ctx) {
        if (monthlyFinancialTrendChart) {
            monthlyFinancialTrendChart.destroy();
        }

        monthlyFinancialTrendChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz'],
                datasets: [{
                    label: 'Gelir',
                    data: [45000, 52000, 48000, 61000, 55000, 67000],
                    backgroundColor: 'rgba(16, 185, 129, 0.8)'
                }, {
                    label: 'Gider',
                    data: [32000, 28000, 35000, 42000, 38000, 45000],
                    backgroundColor: 'rgba(239, 68, 68, 0.8)'
                }, {
                    label: 'Net Kar',
                    data: [13000, 24000, 13000, 19000, 17000, 22000],
                    backgroundColor: 'rgba(59, 130, 246, 0.8)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function (value) {
                                return '₺' + value.toLocaleString('tr-TR');
                            }
                        }
                    }
                }
            }
        });
    }
}

function loadFinancialMetricsTable() {
    const tbody = document.getElementById('financial-metrics-table-body');
    if (tbody) {
        const metrics = [
            { name: 'Toplam Gelir', current: '₺285,000', previous: '₺248,000', change: '+14.9%', isPositive: true },
            { name: 'Toplam Gider', current: '₺165,000', previous: '₺178,000', change: '-7.3%', isPositive: true },
            { name: 'Net Kar', current: '₺120,000', previous: '₺70,000', change: '+71.4%', isPositive: true },
            { name: 'Kar Marjı', current: '%42.1', previous: '%28.2', change: '+13.9pp', isPositive: true },
            { name: 'Ortalama İşlem Değeri', current: '₺4,250', previous: '₺3,890', change: '+9.3%', isPositive: true }
        ];

        tbody.innerHTML = metrics.map(metric => `
            <tr>
                <td class="px-4 py-3 text-sm font-medium text-gray-900">${metric.name}</td>
                <td class="px-4 py-3 text-sm text-gray-900">${metric.current}</td>
                <td class="px-4 py-3 text-sm text-gray-900">${metric.previous}</td>
                <td class="px-4 py-3 text-sm ${metric.isPositive ? 'text-green-600' : 'text-red-600'}">${metric.change}</td>
            </tr>
        `).join('');
    }
}

// Detailed Financial Report Modal Functions
function viewDetailedFinancialReport() {
    document.getElementById('detailed-financial-report-modal').classList.remove('hidden');
    loadDetailedFinancialReport();
}

function closeDetailedFinancialReport() {
    document.getElementById('detailed-financial-report-modal').classList.add('hidden');
}

function loadDetailedFinancialReport() {
    populateDetailedFilterOptions();
    loadDetailedFinancialData();
}

function populateDetailedFilterOptions() {
    const subcategoryFilter = document.getElementById('detailed-subcategory-filter');
    if (subcategoryFilter) {
        subcategoryFilter.innerHTML = '<option value="">Tüm Alt Kategoriler</option>';

        // Add revenue subcategories
        const revenueOptions = [
            { value: 'membership', text: 'Üyelik Ücretleri' },
            { value: 'listing', text: 'İlan Ücretleri' },
            { value: 'commission', text: 'Komisyonlar' },
            { value: 'advertising', text: 'Reklam' }
        ];

        // Add expense subcategories
        const expenseOptions = [
            { value: 'personnel', text: 'Personel' },
            { value: 'marketing', text: 'Pazarlama' },
            { value: 'technology', text: 'Teknoloji' },
            { value: 'notary', text: 'Noter' }
        ];

        [...revenueOptions, ...expenseOptions].forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.text;
            subcategoryFilter.appendChild(optionElement);
        });
    }
}

function loadDetailedFinancialData() {
    const transactions = sampleFinancialData.transactions;
    updateDetailedSummary(transactions);
    renderDetailedFinancialTable(transactions);
}

function updateDetailedSummary(transactions) {
    const totalRevenue = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = Math.abs(transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0));
    const netProfit = totalRevenue - totalExpenses;

    document.getElementById('filtered-revenue-total').textContent = `₺${totalRevenue.toLocaleString('tr-TR')}`;
    document.getElementById('filtered-expenses-total').textContent = `₺${totalExpenses.toLocaleString('tr-TR')}`;
    document.getElementById('filtered-net-profit').textContent = `₺${netProfit.toLocaleString('tr-TR')}`;
}

function renderDetailedFinancialTable(transactions) {
    const tbody = document.getElementById('detailed-financial-table-body');
    if (tbody) {
        tbody.innerHTML = transactions.map(transaction => `
            <tr>
                <td class="px-4 py-3 text-sm text-gray-900">${formatDate(transaction.date)}</td>
                <td class="px-4 py-3 text-sm text-gray-900">${transaction.description}</td>
                <td class="px-4 py-3 text-sm text-gray-900">
                    <span class="px-2 py-1 text-xs font-medium rounded-full ${transaction.category === 'revenue' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                        ${transaction.category === 'revenue' ? 'Gelir' : 'Gider'}
                    </span>
                </td>
                <td class="px-4 py-3 text-sm text-gray-900">${getSubcategoryText(transaction.subcategory)}</td>
                <td class="px-4 py-3 text-sm text-gray-900">${transaction.type}</td>
                <td class="px-4 py-3 text-sm font-medium ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}">
                    ₺${Math.abs(transaction.amount).toLocaleString('tr-TR')}
                </td>
                <td class="px-4 py-3 text-sm text-gray-900">
                    <button onclick="viewTransactionDetails(${transaction.id})" class="text-purple-600 hover:text-purple-800 mr-2">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button onclick="editTransaction(${transaction.id})" class="text-blue-600 hover:text-blue-800">
                        <i class="fas fa-edit"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }
}

function getSubcategoryText(subcategory) {
    const subcategoryMap = {
        'membership': 'Üyelik Ücretleri',
        'listing': 'İlan Ücretleri',
        'commission': 'Komisyonlar',
        'advertising': 'Reklam',
        'personnel': 'Personel',
        'marketing': 'Pazarlama',
        'technology': 'Teknoloji',
        'notary': 'Noter'
    };
    return subcategoryMap[subcategory] || subcategory;
}

function applyDetailedFilters() {
    const categoryFilter = document.getElementById('detailed-category-filter').value;
    const subcategoryFilter = document.getElementById('detailed-subcategory-filter').value;
    const dateFrom = document.getElementById('detailed-date-from').value;
    const dateTo = document.getElementById('detailed-date-to').value;

    let filteredTransactions = [...sampleFinancialData.transactions];

    if (categoryFilter) {
        filteredTransactions = filteredTransactions.filter(t => t.category === categoryFilter);
    }

    if (subcategoryFilter) {
        filteredTransactions = filteredTransactions.filter(t => t.subcategory === subcategoryFilter);
    }

    if (dateFrom) {
        filteredTransactions = filteredTransactions.filter(t => new Date(t.date) >= new Date(dateFrom));
    }

    if (dateTo) {
        filteredTransactions = filteredTransactions.filter(t => new Date(t.date) <= new Date(dateTo));
    }

    updateDetailedSummary(filteredTransactions);
    renderDetailedFinancialTable(filteredTransactions);
    showNotification('Filtreler uygulandı', 'success');
}

function clearDetailedFilters() {
    document.getElementById('detailed-category-filter').value = '';
    document.getElementById('detailed-subcategory-filter').value = '';
    document.getElementById('detailed-date-from').value = '';
    document.getElementById('detailed-date-to').value = '';

    loadDetailedFinancialData();
    showNotification('Filtreler temizlendi', 'info');
}

function exportDetailedData(format) {
    showNotification(`${format.toUpperCase()} dosyası indiriliyor...`, 'info');
    // In a real implementation, this would generate and download the file
    setTimeout(() => {
        showNotification(`Finansal veriler ${format.toUpperCase()} formatında indirildi`, 'success');
    }, 1500);
}

function exportFinancialReport(type) {
    showNotification('PDF raporu hazırlanıyor...', 'info');
    // In a real implementation, this would generate and download a PDF report
    setTimeout(() => {
        showNotification('Finansal rapor PDF olarak indirildi', 'success');
    }, 2000);
}

// Invoice Management Functions
function updateInvoiceStats() {
    const invoices = sampleFinancialData.invoices;

    const paidInvoices = invoices.filter(inv => inv.status === 'paid');
    const pendingInvoices = invoices.filter(inv => inv.status === 'pending');
    const overdueInvoices = invoices.filter(inv => inv.status === 'overdue');

    const paidAmount = paidInvoices.reduce((sum, inv) => sum + inv.amount, 0);
    const pendingAmount = pendingInvoices.reduce((sum, inv) => sum + inv.amount, 0);
    const overdueAmount = overdueInvoices.reduce((sum, inv) => sum + inv.amount, 0);
    const totalAmount = paidAmount + pendingAmount + overdueAmount;

    document.getElementById('paid-invoices-amount').textContent = `₺${paidAmount.toLocaleString('tr-TR')}`;
    document.getElementById('paid-invoices-count').textContent = `${paidInvoices.length} fatura`;

    document.getElementById('pending-invoices-amount').textContent = `₺${pendingAmount.toLocaleString('tr-TR')}`;
    document.getElementById('pending-invoices-count').textContent = `${pendingInvoices.length} fatura`;

    document.getElementById('overdue-invoices-amount').textContent = `₺${overdueAmount.toLocaleString('tr-TR')}`;
    document.getElementById('overdue-invoices-count').textContent = `${overdueInvoices.length} fatura`;

    document.getElementById('total-invoices-amount').textContent = `₺${totalAmount.toLocaleString('tr-TR')}`;
    document.getElementById('total-invoices-count').textContent = `${invoices.length} fatura`;
}

function loadInvoiceTable() {
    const invoices = sampleFinancialData.invoices;
    renderInvoiceTable(invoices);
}

function renderInvoiceTable(invoices) {
    const tbody = document.getElementById('invoice-table-body');
    if (tbody) {
        tbody.innerHTML = invoices.map(invoice => `
            <tr>
                <td class="px-4 py-3 text-sm font-medium text-gray-900">${invoice.number}</td>
                <td class="px-4 py-3 text-sm text-gray-900">
                    <span class="px-2 py-1 text-xs font-medium rounded-full ${invoice.type === 'incoming' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}">
                        ${invoice.type === 'incoming' ? 'Gelen' : 'Giden'}
                    </span>
                </td>
                <td class="px-4 py-3 text-sm text-gray-900">${invoice.client}</td>
                <td class="px-4 py-3 text-sm font-medium text-gray-900">₺${invoice.amount.toLocaleString('tr-TR')}</td>
                <td class="px-4 py-3 text-sm text-gray-900">${formatDate(invoice.date)}</td>
                <td class="px-4 py-3 text-sm text-gray-900">
                    <span class="px-2 py-1 text-xs font-medium rounded-full ${getInvoiceStatusColor(invoice.status)}">
                        ${getInvoiceStatusText(invoice.status)}
                    </span>
                </td>
                <td class="px-4 py-3 text-sm text-gray-900">
                    <div class="flex space-x-2">
                        <button onclick="viewInvoice('${invoice.id}')" class="text-purple-600 hover:text-purple-800" title="Görüntüle">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button onclick="editInvoice('${invoice.id}')" class="text-blue-600 hover:text-blue-800" title="Düzenle">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="downloadInvoice('${invoice.id}')" class="text-green-600 hover:text-green-800" title="İndir">
                            <i class="fas fa-download"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }
}

function getInvoiceStatusText(status) {
    const statusMap = {
        'paid': 'Ödenmiş',
        'pending': 'Bekleyen',
        'overdue': 'Gecikmiş'
    };
    return statusMap[status] || status;
}

function getInvoiceStatusColor(status) {
    const colorMap = {
        'paid': 'bg-green-100 text-green-800',
        'pending': 'bg-yellow-100 text-yellow-800',
        'overdue': 'bg-red-100 text-red-800'
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800';
}

function applyInvoiceFilters() {
    const statusFilter = document.getElementById('invoice-status-filter').value;
    const typeFilter = document.getElementById('invoice-type-filter').value;
    const dateFrom = document.getElementById('invoice-date-from').value;
    const dateTo = document.getElementById('invoice-date-to').value;

    let filteredInvoices = [...sampleFinancialData.invoices];

    if (statusFilter) {
        filteredInvoices = filteredInvoices.filter(inv => inv.status === statusFilter);
    }

    if (typeFilter) {
        filteredInvoices = filteredInvoices.filter(inv => inv.type === typeFilter);
    }

    if (dateFrom) {
        filteredInvoices = filteredInvoices.filter(inv => new Date(inv.date) >= new Date(dateFrom));
    }

    if (dateTo) {
        filteredInvoices = filteredInvoices.filter(inv => new Date(inv.date) <= new Date(dateTo));
    }

    renderInvoiceTable(filteredInvoices);
    showNotification('Fatura filtreleri uygulandı', 'success');
}

function clearInvoiceFilters() {
    document.getElementById('invoice-status-filter').value = '';
    document.getElementById('invoice-type-filter').value = '';
    document.getElementById('invoice-date-from').value = '';
    document.getElementById('invoice-date-to').value = '';

    loadInvoiceTable();
    showNotification('Fatura filtreleri temizlendi', 'info');
}

function openNewInvoiceModal() {
    document.getElementById('new-invoice-modal').classList.remove('hidden');
    document.getElementById('new-invoice-form').reset();

    // Set default date to today
    document.getElementById('invoice-date').valueAsDate = new Date();
}

function closeNewInvoiceModal() {
    document.getElementById('new-invoice-modal').classList.add('hidden');
}

function saveNewInvoice() {
    const form = document.getElementById('new-invoice-form');
    const formData = new FormData(form);

    const newInvoice = {
        id: 'INV-' + (sampleFinancialData.invoices.length + 1).toString().padStart(3, '0'),
        number: document.getElementById('invoice-number').value,
        type: document.getElementById('invoice-type').value,
        client: document.getElementById('invoice-client').value,
        amount: parseFloat(document.getElementById('invoice-amount').value),
        date: document.getElementById('invoice-date').value,
        dueDate: document.getElementById('invoice-due-date').value,
        status: document.getElementById('invoice-status').value,
        category: document.getElementById('invoice-category').value,
        description: document.getElementById('invoice-description').value
    };

    // In a real implementation, this would save to a backend
    sampleFinancialData.invoices.push(newInvoice);

    closeNewInvoiceModal();
    updateInvoiceStats();
    loadInvoiceTable();
    showNotification('Yeni fatura başarıyla eklendi', 'success');
}

function viewInvoice(id) {
    showNotification(`Fatura görüntüleniyor: ${id}`, 'info');
}

function editInvoice(id) {
    showNotification(`Fatura düzenleniyor: ${id}`, 'info');
}

function downloadInvoice(id) {
    showNotification(`Fatura indiriliyor: ${id}`, 'info');
}

function viewTransactionDetails(id) {
    showNotification(`İşlem detayları görüntüleniyor: ${id}`, 'info');
}

function editTransaction(id) {
    showNotification(`İşlem düzenleniyor: ${id}`, 'info');
}

// Support Management System
let supportManagementData = {
    tickets: [
        {
            id: 'SM001',
            title: 'Sistem giriş hatası',
            category: 'technical',
            priority: 'high',
            status: 'open',
            assignedTo: '',
            assignedName: '',
            description: 'Kullanıcılar sisteme giriş yapamıyor. Hata mesajı: "Sunucuya bağlanılamıyor"',
            user: 'Ahmet Kaya',
            userId: 'user123',
            createdAt: '2025-01-15T10:30:00Z',
            updatedAt: '2025-01-15T10:30:00Z',
            adminNotes: '',
            internalNotes: 'Sunucu kapasitesi kontrol edilmeli'
        },
        {
            id: 'SM002',
            title: 'Fatura indirme problemi',
            category: 'billing',
            priority: 'medium',
            status: 'assigned',
            assignedTo: 'admin2',
            assignedName: 'Merve Kaya',
            description: 'Fatura PDF dosyası indirilemiyor, boş sayfa açılıyor',
            user: 'Zeynep Özkan',
            userId: 'user456',
            createdAt: '2025-01-14T14:20:00Z',
            updatedAt: '2025-01-15T09:15:00Z',
            adminNotes: 'PDF generator kontrol edildi',
            internalNotes: 'Backend API timeout sorunu olabilir'
        },
        {
            id: 'SM003',
            title: 'Hesap doğrulama maili gelmiyor',
            category: 'account',
            priority: 'low',
            status: 'in-progress',
            assignedTo: 'admin1',
            assignedName: 'Ahmet Yılmaz',
            description: 'Yeni kayıt olan kullanıcılara doğrulama maili gönderilmiyor',
            user: 'Mehmet Demir',
            userId: 'user789',
            createdAt: '2025-01-13T16:45:00Z',
            updatedAt: '2025-01-15T08:30:00Z',
            adminNotes: 'SMTP ayarları kontrol ediliyor',
            internalNotes: 'Email service provider ile iletişime geçildi'
        },
        {
            id: 'SM004',
            title: 'Mobil uygulama çökme problemi',
            category: 'technical',
            priority: 'critical',
            status: 'resolved',
            assignedTo: 'admin3',
            assignedName: 'Özkan Demir',
            description: 'Android uygulama ana sayfada sürekli çöküyor',
            user: 'Ayşe Yılmaz',
            userId: 'user101',
            createdAt: '2025-01-12T11:15:00Z',
            updatedAt: '2025-01-14T17:20:00Z',
            adminNotes: 'Uygulama güncellendi, sorun çözüldü',
            internalNotes: 'React Native compatibility sorunu çözüldü'
        },
        {
            id: 'SM005',
            title: 'Özellik talebi: Karanlık mod',
            category: 'feature-request',
            priority: 'low',
            status: 'pending',
            assignedTo: 'admin4',
            assignedName: 'Selin Arslan',
            description: 'Kullanıcılar karanlık mod özelliği talep ediyor',
            user: 'Emre Kaan',
            userId: 'user202',
            createdAt: '2025-01-10T09:00:00Z',
            updatedAt: '2025-01-12T14:00:00Z',
            adminNotes: 'Geliştirme roadmap\'ine eklendi',
            internalNotes: 'Q2 2025 için planlandı'
        }
    ],
    admins: [
        { id: 'admin1', name: 'Ahmet Yılmaz', role: 'Teknik Uzman' },
        { id: 'admin2', name: 'Merve Kaya', role: 'Müşteri Hizmetleri' },
        { id: 'admin3', name: 'Özkan Demir', role: 'Sistem Yöneticisi' },
        { id: 'admin4', name: 'Selin Arslan', role: 'Genel Koordinatör' }
    ]
};

let selectedTickets = [];
let currentTicketId = null;

function loadSupportManagementSection() {
    loadSupportManagementStats();
    loadSupportManagementTable();
}

function loadSupportManagementStats() {
    const tickets = supportManagementData.tickets;

    const openTickets = tickets.filter(t => t.status === 'open').length;
    const assignedTickets = tickets.filter(t => t.status === 'assigned' || t.status === 'in-progress').length;
    const criticalTickets = tickets.filter(t => t.priority === 'critical').length;
    const resolvedThisMonth = tickets.filter(t => t.status === 'resolved' || t.status === 'closed').length;

    document.getElementById('open-tickets-count').textContent = openTickets;
    document.getElementById('assigned-tickets-count').textContent = assignedTickets;
    document.getElementById('critical-tickets-count').textContent = criticalTickets;
    document.getElementById('resolved-tickets-count').textContent = resolvedThisMonth;
}

function loadSupportManagementTable() {
    const filteredTickets = applySupportManagementFilters();
    renderSupportManagementTable(filteredTickets);
    updateSupportManagementCount(filteredTickets.length);
}

function applySupportManagementFilters() {
    const searchTerm = document.getElementById('support-management-search')?.value.toLowerCase() || '';
    const statusFilter = document.getElementById('support-management-status-filter')?.value || '';
    const categoryFilter = document.getElementById('support-management-category-filter')?.value || '';
    const priorityFilter = document.getElementById('support-management-priority-filter')?.value || '';
    const adminFilter = document.getElementById('support-management-admin-filter')?.value || '';

    let filteredTickets = [...supportManagementData.tickets];

    if (searchTerm) {
        filteredTickets = filteredTickets.filter(ticket =>
            ticket.id.toLowerCase().includes(searchTerm) ||
            ticket.title.toLowerCase().includes(searchTerm) ||
            ticket.description.toLowerCase().includes(searchTerm) ||
            ticket.user.toLowerCase().includes(searchTerm)
        );
    }

    if (statusFilter) {
        filteredTickets = filteredTickets.filter(ticket => ticket.status === statusFilter);
    }

    if (categoryFilter) {
        filteredTickets = filteredTickets.filter(ticket => ticket.category === categoryFilter);
    }

    if (priorityFilter) {
        filteredTickets = filteredTickets.filter(ticket => ticket.priority === priorityFilter);
    }

    if (adminFilter) {
        if (adminFilter === 'unassigned') {
            filteredTickets = filteredTickets.filter(ticket => !ticket.assignedTo);
        } else {
            filteredTickets = filteredTickets.filter(ticket => ticket.assignedTo === adminFilter);
        }
    }

    return filteredTickets;
}

function renderSupportManagementTable(tickets) {
    const tbody = document.getElementById('support-management-table');
    if (!tbody) return;

    tbody.innerHTML = tickets.map(ticket => `
        <tr class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap">
                <input type="checkbox" class="ticket-checkbox rounded border-gray-300 text-purple-600 focus:ring-purple-500" 
                       value="${ticket.id}" onchange="handleTicketSelection()">
            </td>
            <td class="px-6 py-4">
                <div class="space-y-1">
                    <div class="text-sm font-medium text-gray-900">${ticket.id}</div>
                    <div class="text-sm text-gray-900 font-medium">${ticket.title}</div>
                    <div class="text-xs text-gray-500">Kullanıcı: ${ticket.user}</div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(ticket.category)}">
                    ${getCategoryText(ticket.category)}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(ticket.priority)}">
                    ${getPriorityText(ticket.priority)}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                    ${ticket.assignedName || '<span class="text-gray-400">Atanmamış</span>'}
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(ticket.status)}">
                    ${getStatusText(ticket.status)}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${formatDateTime(ticket.updatedAt)}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-center">
                <div class="flex items-center justify-center space-x-2">
                    <button onclick="openSupportManagementDetailsModal('${ticket.id}')" class="text-purple-600 hover:text-purple-800" title="Görüntüle">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button onclick="openEditSupportManagementModalWithId('${ticket.id}')" class="text-blue-600 hover:text-blue-800" title="Düzenle">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="openAssignAdminModalWithId('${ticket.id}')" class="text-yellow-600 hover:text-yellow-800" title="Admin Ata">
                        <i class="fas fa-user-plus"></i>
                    </button>
                    <button onclick="confirmCloseSupportManagementItem('${ticket.id}')" class="text-red-600 hover:text-red-800" title="Kapat">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Status and Priority Helper Functions
function getStatusColor(status) {
    const colors = {
        'open': 'bg-blue-100 text-blue-800',
        'assigned': 'bg-yellow-100 text-yellow-800',
        'pending': 'bg-orange-100 text-orange-800',
        'in-progress': 'bg-purple-100 text-purple-800',
        'resolved': 'bg-green-100 text-green-800',
        'closed': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
}

function getStatusText(status) {
    const texts = {
        'open': 'Açık',
        'assigned': 'Atanmış',
        'pending': 'Beklemede',
        'in-progress': 'İşlemde',
        'resolved': 'Çözümlendi',
        'closed': 'Kapalı'
    };
    return texts[status] || status;
}

function getPriorityColor(priority) {
    const colors = {
        'low': 'bg-green-100 text-green-800',
        'medium': 'bg-yellow-100 text-yellow-800',
        'high': 'bg-orange-100 text-orange-800',
        'critical': 'bg-red-100 text-red-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
}

function getPriorityText(priority) {
    const texts = {
        'low': 'Düşük',
        'medium': 'Orta',
        'high': 'Yüksek',
        'critical': 'Kritik'
    };
    return texts[priority] || priority;
}

function getCategoryColor(category) {
    const colors = {
        'technical': 'bg-blue-100 text-blue-800',
        'billing': 'bg-green-100 text-green-800',
        'account': 'bg-purple-100 text-purple-800',
        'general': 'bg-gray-100 text-gray-800',
        'system': 'bg-red-100 text-red-800',
        'feature-request': 'bg-indigo-100 text-indigo-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
}

function getCategoryText(category) {
    const texts = {
        'technical': 'Teknik',
        'billing': 'Fatura',
        'account': 'Hesap',
        'general': 'Genel',
        'system': 'Sistem',
        'feature-request': 'Özellik İsteği'
    };
    return texts[category] || category;
}

// Modal Functions
function openSupportManagementDetailsModal(ticketId) {
    const ticket = supportManagementData.tickets.find(t => t.id === ticketId);
    if (!ticket) return;

    currentTicketId = ticketId;

    // Populate modal fields
    document.getElementById('detail-ticket-id').textContent = ticket.id;
    document.getElementById('detail-ticket-title').textContent = ticket.title;
    document.getElementById('detail-ticket-category').textContent = getCategoryText(ticket.category);
    document.getElementById('detail-ticket-assigned').textContent = ticket.assignedName || 'Atanmamış';
    document.getElementById('detail-ticket-created').textContent = formatDateTime(ticket.createdAt);
    document.getElementById('detail-ticket-updated').textContent = formatDateTime(ticket.updatedAt);
    document.getElementById('detail-ticket-user').textContent = ticket.user;
    document.getElementById('detail-ticket-description').textContent = ticket.description;
    document.getElementById('detail-admin-notes').value = ticket.adminNotes || '';

    // Update status and priority badges
    const statusBadge = document.getElementById('detail-ticket-status');
    statusBadge.textContent = getStatusText(ticket.status);
    statusBadge.className = `px-2 py-1 text-sm font-medium rounded-full ${getStatusColor(ticket.status)}`;

    const priorityBadge = document.getElementById('detail-ticket-priority');
    priorityBadge.textContent = getPriorityText(ticket.priority);
    priorityBadge.className = `px-2 py-1 text-sm font-medium rounded-full ${getPriorityColor(ticket.priority)}`;

    document.getElementById('support-management-detail-modal').classList.remove('hidden');
}

function closeSupportManagementDetailModal() {
    document.getElementById('support-management-detail-modal').classList.add('hidden');
    currentTicketId = null;
}

function openEditSupportManagementModalWithId(ticketId) {
    const ticket = supportManagementData.tickets.find(t => t.id === ticketId);
    if (!ticket) return;

    currentTicketId = ticketId;

    // Populate edit form
    document.getElementById('edit-ticket-title').value = ticket.title;
    document.getElementById('edit-ticket-category').value = ticket.category;
    document.getElementById('edit-ticket-priority').value = ticket.priority;
    document.getElementById('edit-ticket-status').value = ticket.status;
    document.getElementById('edit-ticket-assigned').value = ticket.assignedTo || '';
    document.getElementById('edit-ticket-description').value = ticket.description;
    document.getElementById('edit-ticket-notes').value = ticket.internalNotes || '';

    document.getElementById('edit-support-management-modal').classList.remove('hidden');
}

function openEditSupportManagementModal() {
    if (currentTicketId) {
        openEditSupportManagementModalWithId(currentTicketId);
    }
}

function closeEditSupportManagementModal() {
    document.getElementById('edit-support-management-modal').classList.add('hidden');
}

function saveSupportManagementChanges() {
    if (!currentTicketId) return;

    const ticket = supportManagementData.tickets.find(t => t.id === currentTicketId);
    if (!ticket) return;

    // Update ticket data
    ticket.title = document.getElementById('edit-ticket-title').value;
    ticket.category = document.getElementById('edit-ticket-category').value;
    ticket.priority = document.getElementById('edit-ticket-priority').value;
    ticket.status = document.getElementById('edit-ticket-status').value;
    ticket.assignedTo = document.getElementById('edit-ticket-assigned').value;
    ticket.description = document.getElementById('edit-ticket-description').value;
    ticket.internalNotes = document.getElementById('edit-ticket-notes').value;
    ticket.updatedAt = new Date().toISOString();

    // Update assigned name
    if (ticket.assignedTo) {
        const admin = supportManagementData.admins.find(a => a.id === ticket.assignedTo);
        ticket.assignedName = admin ? admin.name : '';
    } else {
        ticket.assignedName = '';
    }

    closeEditSupportManagementModal();
    loadSupportManagementSection();
    showNotification('Destek talebi başarıyla güncellendi', 'success');
}

// Admin Assignment Functions
function openAssignAdminModalWithId(ticketId) {
    currentTicketId = ticketId;
    document.getElementById('assign-ticket-id').textContent = ticketId;
    document.getElementById('assign-admin-select').value = '';
    document.getElementById('assign-note').value = '';
    document.getElementById('notify-admin').checked = true;
    document.getElementById('assign-admin-modal').classList.remove('hidden');
}

function openAssignAdminModal() {
    if (currentTicketId) {
        openAssignAdminModalWithId(currentTicketId);
    }
}

function closeAssignAdminModal() {
    document.getElementById('assign-admin-modal').classList.add('hidden');
}

function confirmAssignAdmin() {
    if (!currentTicketId) return;

    const adminId = document.getElementById('assign-admin-select').value;
    if (!adminId) {
        showNotification('Lütfen bir yönetici seçin', 'error');
        return;
    }

    const ticket = supportManagementData.tickets.find(t => t.id === currentTicketId);
    if (!ticket) return;

    const admin = supportManagementData.admins.find(a => a.id === adminId);
    if (!admin) return;

    // Update ticket
    ticket.assignedTo = adminId;
    ticket.assignedName = admin.name;
    ticket.status = 'assigned';
    ticket.updatedAt = new Date().toISOString();

    // Add admin note if provided
    const note = document.getElementById('assign-note').value;
    if (note) {
        ticket.adminNotes = (ticket.adminNotes ? ticket.adminNotes + '\n\n' : '') +
            `[${formatDateTime(new Date().toISOString())}] Atama notu: ${note}`;
    }

    closeAssignAdminModal();
    loadSupportManagementSection();

    if (document.getElementById('notify-admin').checked) {
        showNotification(`Talep ${admin.name} adlı yöneticiye atandı ve bildirim gönderildi`, 'success');
    } else {
        showNotification(`Talep ${admin.name} adlı yöneticiye atandı`, 'success');
    }
}

// Quick Action Functions
function changeTicketStatus(newStatus) {
    if (!currentTicketId) return;

    const ticket = supportManagementData.tickets.find(t => t.id === currentTicketId);
    if (!ticket) return;

    ticket.status = newStatus;
    ticket.updatedAt = new Date().toISOString();

    // Update modal display
    const statusBadge = document.getElementById('detail-ticket-status');
    statusBadge.textContent = getStatusText(newStatus);
    statusBadge.className = `px-2 py-1 text-sm font-medium rounded-full ${getStatusColor(newStatus)}`;

    loadSupportManagementSection();
    showNotification(`Talep durumu "${getStatusText(newStatus)}" olarak güncellendi`, 'success');
}

function changeTicketPriority(newPriority) {
    if (!currentTicketId) return;

    const ticket = supportManagementData.tickets.find(t => t.id === currentTicketId);
    if (!ticket) return;

    ticket.priority = newPriority;
    ticket.updatedAt = new Date().toISOString();

    // Update modal display
    const priorityBadge = document.getElementById('detail-ticket-priority');
    priorityBadge.textContent = getPriorityText(newPriority);
    priorityBadge.className = `px-2 py-1 text-sm font-medium rounded-full ${getPriorityColor(newPriority)}`;

    loadSupportManagementSection();
    showNotification(`Talep önceliği "${getPriorityText(newPriority)}" olarak güncellendi`, 'success');
}

function saveAdminNotes() {
    if (!currentTicketId) return;

    const ticket = supportManagementData.tickets.find(t => t.id === currentTicketId);
    if (!ticket) return;

    const notes = document.getElementById('detail-admin-notes').value;
    ticket.adminNotes = notes;
    ticket.updatedAt = new Date().toISOString();

    showNotification('Admin notları kaydedildi', 'success');
}

// Close Ticket Functions
function confirmCloseSupportManagementItem(ticketId) {
    currentTicketId = ticketId;
    document.getElementById('close-ticket-id').textContent = ticketId;
    document.getElementById('close-reason').value = 'resolved';
    document.getElementById('close-note').value = '';
    document.getElementById('notify-user').checked = true;
    document.getElementById('close-support-ticket-modal').classList.remove('hidden');
}

function closeCloseSupportTicketModal() {
    document.getElementById('close-support-ticket-modal').classList.add('hidden');
}

function confirmCloseSupportTicket() {
    if (!currentTicketId) return;

    const ticket = supportManagementData.tickets.find(t => t.id === currentTicketId);
    if (!ticket) return;

    const reason = document.getElementById('close-reason').value;
    const note = document.getElementById('close-note').value;

    ticket.status = 'closed';
    ticket.updatedAt = new Date().toISOString();

    // Add closing note to admin notes
    const closeNote = `[${formatDateTime(new Date().toISOString())}] Kapatma nedeni: ${getCloseReasonText(reason)}`;
    if (note) {
        ticket.adminNotes = (ticket.adminNotes ? ticket.adminNotes + '\n\n' : '') + closeNote + '\nNot: ' + note;
    } else {
        ticket.adminNotes = (ticket.adminNotes ? ticket.adminNotes + '\n\n' : '') + closeNote;
    }

    closeCloseSupportTicketModal();
    loadSupportManagementSection();

    if (document.getElementById('notify-user').checked) {
        showNotification('Destek talebi kapatıldı ve kullanıcıya bildirim gönderildi', 'success');
    } else {
        showNotification('Destek talebi kapatıldı', 'success');
    }
}

function getCloseReasonText(reason) {
    const reasons = {
        'resolved': 'Çözümlendi',
        'duplicate': 'Tekrarlanan talep',
        'invalid': 'Geçersiz talep',
        'wont-fix': 'Çözülmeyecek',
        'user-request': 'Kullanıcı talebi',
        'other': 'Diğer'
    };
    return reasons[reason] || reason;
}

// Selection and Bulk Actions
function handleTicketSelection() {
    const checkboxes = document.querySelectorAll('.ticket-checkbox:checked');
    selectedTickets = Array.from(checkboxes).map(cb => cb.value);

    const selectedCount = selectedTickets.length;
    document.getElementById('selected-count').textContent = selectedCount;

    const bulkActions = document.getElementById('bulk-actions');
    if (selectedCount > 0) {
        bulkActions.classList.remove('hidden');
    } else {
        bulkActions.classList.add('hidden');
    }

    // Update select all checkbox
    const selectAllCheckbox = document.getElementById('select-all-tickets');
    const allCheckboxes = document.querySelectorAll('.ticket-checkbox');
    selectAllCheckbox.checked = selectedCount === allCheckboxes.length;
    selectAllCheckbox.indeterminate = selectedCount > 0 && selectedCount < allCheckboxes.length;
}

function toggleSelectAll() {
    const selectAllCheckbox = document.getElementById('select-all-tickets');
    const checkboxes = document.querySelectorAll('.ticket-checkbox');

    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAllCheckbox.checked;
    });

    handleTicketSelection();
}

function clearSelection() {
    document.querySelectorAll('.ticket-checkbox').forEach(cb => cb.checked = false);
    document.getElementById('select-all-tickets').checked = false;
    handleTicketSelection();
}

function bulkAssignAdmin() {
    if (selectedTickets.length === 0) return;

    document.getElementById('bulk-assign-count').textContent = selectedTickets.length;
    document.getElementById('bulk-assign-admin').value = '';
    document.getElementById('bulk-assign-modal').classList.remove('hidden');
}

function closeBulkAssignModal() {
    document.getElementById('bulk-assign-modal').classList.add('hidden');
}

function confirmBulkAssign() {
    const adminId = document.getElementById('bulk-assign-admin').value;
    if (!adminId) {
        showNotification('Lütfen bir yönetici seçin', 'error');
        return;
    }

    const admin = supportManagementData.admins.find(a => a.id === adminId);
    if (!admin) return;

    selectedTickets.forEach(ticketId => {
        const ticket = supportManagementData.tickets.find(t => t.id === ticketId);
        if (ticket) {
            ticket.assignedTo = adminId;
            ticket.assignedName = admin.name;
            ticket.status = 'assigned';
            ticket.updatedAt = new Date().toISOString();
        }
    });

    closeBulkAssignModal();
    clearSelection();
    loadSupportManagementSection();
    showNotification(`${selectedTickets.length} talep ${admin.name} adlı yöneticiye atandı`, 'success');
}

function bulkChangeStatus() {
    // Implementation for bulk status change
    showNotification('Toplu durum değişikliği özelliği yakında eklenecek', 'info');
}

function bulkChangePriority() {
    // Implementation for bulk priority change
    showNotification('Toplu öncelik değişikliği özelliği yakında eklenecek', 'info');
}

// Filter and Search Functions
function filterSupportManagement() {
    loadSupportManagementTable();
}

function clearSupportManagementFilters() {
    document.getElementById('support-management-search').value = '';
    document.getElementById('support-management-status-filter').value = '';
    document.getElementById('support-management-category-filter').value = '';
    document.getElementById('support-management-priority-filter').value = '';
    document.getElementById('support-management-admin-filter').value = '';
    filterSupportManagement();
    showNotification('Filtreler temizlendi', 'info');
}

function updateSupportManagementCount(count) {
    document.getElementById('support-management-count').textContent = `${count} kayıt`;
}

// Export and Utility Functions
function exportSupportManagement() {
    showNotification('Destek yönetimi verileri Excel formatında indiriliyor...', 'info');
    setTimeout(() => {
        showNotification('Veriler başarıyla indirildi', 'success');
    }, 1500);
}

function refreshSupportManagement() {
    loadSupportManagementSection();
    showNotification('Veriler yenilendi', 'success');
}

function openNewSupportManagementModal() {
    // This function would open a modal to create new support tickets
    showNotification('Yeni destek kaydı ekleme özelliği aktif', 'info');
}

function viewUserProfile() {
    if (!currentTicketId) return;

    const ticket = supportManagementData.tickets.find(t => t.id === currentTicketId);
    if (!ticket) return;

    showNotification(`${ticket.user} kullanıcısının profili açılıyor...`, 'info');
}

function loadAnalyticsData() {
    // Load analytics data
    document.getElementById('total-users-analytics').textContent = sampleData.users.length;
    document.getElementById('active-users-analytics').textContent = sampleData.users.filter(u => u.status === 'active').length;
    document.getElementById('avg-session-duration').textContent = '25 dk';
    document.getElementById('churn-rate').textContent = '5%';
    document.getElementById('total-content').textContent = sampleData.listings.length;
    document.getElementById('active-listings').textContent = sampleData.listings.filter(l => l.status === 'active').length;
    document.getElementById('avg-content-views').textContent = '150';
    document.getElementById('avg-content-duration').textContent = '3.5 dk';
}

function loadMarketingData() {
    // Load marketing data - already implemented in the existing code
}

// Settings Management System
let systemSettings = {
    general: {
        siteName: 'DönüşümAy',
        siteEmail: 'info@donusumay.com',
        sitePhone: '+90 212 555 0123',
        siteTimezone: 'Europe/Istanbul',
        siteLanguage: 'tr',
        siteDescription: 'Kentsel dönüşüm ve emlak değerlendirme platformu',
        siteAddress: 'Maslak Mahallesi, Büyükdere Caddesi No: 123, Sarıyer/İstanbul'
    },
    userManagement: {
        registrationApproval: 'manual',
        contractorAutoApproval: true,
        architectAutoApproval: false,
        notaryAutoApproval: false,
        minUserAge: 18,
        passwordResetExpiry: 90,
        maxUsers: 10000,
        sessionDuration: 60
    },
    commissionRates: {
        urbanTransformation: 3.5,
        architecturalDraft: 15,
        apartmentSales: 2,
        notaryFee: 10
    },
    security: {
        twoFactorAuth: 'optional',
        failedLoginLimit: 5,
        accountLockoutDuration: 30,
        passwordMinLength: 8,
        allowedIPs: ''
    },
    email: {
        smtpServer: 'smtp.gmail.com',
        smtpPort: 587,
        smtpUsername: '',
        smtpPassword: '',
        smtpSSL: true
    },
    sms: {
        provider: 'netgsm',
        apiKey: '',
        sender: 'DONUSUMAY',
        enabled: true
    },
    integrations: {
        ga4MeasurementId: '',
        hotjarSiteId: '',
        googleMapsApiKey: 'AIzaSyExample123'
    }
};

let systemLogs = [
    {
        id: 'LOG001',
        timestamp: '2024-01-25 14:30:15',
        activity: 'login',
        user: 'admin',
        userType: 'admin',
        ip: '192.168.1.100',
        details: 'Admin kullanıcısı sisteme giriş yaptı'
    },
    {
        id: 'LOG002',
        timestamp: '2024-01-25 14:25:03',
        activity: 'create',
        user: 'Ahmet Yılmaz',
        userType: 'user',
        ip: '185.123.45.67',
        details: 'Yeni kentsel dönüşüm ilanı oluşturuldu'
    },
    {
        id: 'LOG003',
        timestamp: '2024-01-25 14:20:45',
        activity: 'update',
        user: 'admin',
        userType: 'admin',
        ip: '192.168.1.100',
        details: 'Komisyon oranları güncellendi'
    },
    {
        id: 'LOG004',
        timestamp: '2024-01-25 14:15:30',
        activity: 'error',
        user: 'system',
        userType: 'system',
        ip: '127.0.0.1',
        details: 'E-posta gönderimi başarısız - SMTP bağlantı hatası'
    },
    {
        id: 'LOG005',
        timestamp: '2024-01-25 14:10:12',
        activity: 'delete',
        user: 'admin',
        userType: 'admin',
        ip: '192.168.1.100',
        details: 'Kullanıcı hesabı silindi: mehmet.kaya@email.com'
    },
    {
        id: 'LOG006',
        timestamp: '2024-01-25 14:05:55',
        activity: 'login',
        user: 'Fatma Demir',
        userType: 'user',
        ip: '78.186.45.23',
        details: 'Kullanıcı sisteme giriş yaptı'
    },
    {
        id: 'LOG007',
        timestamp: '2024-01-25 14:00:20',
        activity: 'logout',
        user: 'Mimar Mehmet',
        userType: 'architect',
        ip: '94.54.123.89',
        details: 'Mimar kullanıcısı sistemden çıkış yaptı'
    },
    {
        id: 'LOG008',
        timestamp: '2024-01-25 13:55:40',
        activity: 'update',
        user: 'admin',
        userType: 'admin',
        ip: '192.168.1.100',
        details: 'Güvenlik ayarları güncellendi'
    }
];

function loadSettings() {
    loadGeneralSettings();
    loadUserManagementSettings();
    loadCommissionRates();
    loadSecuritySettings();
    loadEmailSMSSettings();
    loadIntegrationSettings();
    loadSystemLogs();

    // Initialize toggle switches
    initializeToggleSwitches();
}

function loadGeneralSettings() {
    document.getElementById('site-name').value = systemSettings.general.siteName;
    document.getElementById('site-email').value = systemSettings.general.siteEmail;
    document.getElementById('site-phone').value = systemSettings.general.sitePhone;
    document.getElementById('site-timezone').value = systemSettings.general.siteTimezone;
    document.getElementById('site-language').value = systemSettings.general.siteLanguage;
    document.getElementById('site-description').value = systemSettings.general.siteDescription;
    document.getElementById('site-address').value = systemSettings.general.siteAddress;
}

function loadUserManagementSettings() {
    document.getElementById('user-registration-approval').value = systemSettings.userManagement.registrationApproval;
    document.getElementById('contractor-auto-approval').checked = systemSettings.userManagement.contractorAutoApproval;
    document.getElementById('architect-auto-approval').checked = systemSettings.userManagement.architectAutoApproval;
    document.getElementById('notary-auto-approval').checked = systemSettings.userManagement.notaryAutoApproval;
    document.getElementById('min-user-age').value = systemSettings.userManagement.minUserAge;
    document.getElementById('password-reset-expiry').value = systemSettings.userManagement.passwordResetExpiry;
    document.getElementById('max-users').value = systemSettings.userManagement.maxUsers;
    document.getElementById('user-session-duration').value = systemSettings.userManagement.sessionDuration;
}

function loadCommissionRates() {
    document.getElementById('urban-transformation-commission').value = systemSettings.commissionRates.urbanTransformation;
    document.getElementById('architectural-draft-commission').value = systemSettings.commissionRates.architecturalDraft;
    document.getElementById('apartment-sales-commission').value = systemSettings.commissionRates.apartmentSales;
    document.getElementById('notary-fee-commission').value = systemSettings.commissionRates.notaryFee;
}

function loadSecuritySettings() {
    document.querySelector(`input[name="two-factor-auth"][value="${systemSettings.security.twoFactorAuth}"]`).checked = true;
    document.getElementById('failed-login-limit').value = systemSettings.security.failedLoginLimit;
    document.getElementById('account-lockout-duration').value = systemSettings.security.accountLockoutDuration;
    document.getElementById('password-min-length').value = systemSettings.security.passwordMinLength;
    document.getElementById('allowed-ips').value = systemSettings.security.allowedIPs;
}

function loadEmailSMSSettings() {
    document.getElementById('smtp-server').value = systemSettings.email.smtpServer;
    document.getElementById('smtp-port').value = systemSettings.email.smtpPort;
    document.getElementById('smtp-username').value = systemSettings.email.smtpUsername;
    document.getElementById('smtp-password').value = systemSettings.email.smtpPassword;
    document.getElementById('smtp-ssl').checked = systemSettings.email.smtpSSL;

    document.getElementById('sms-provider').value = systemSettings.sms.provider;
    document.getElementById('sms-api-key').value = systemSettings.sms.apiKey;
    document.getElementById('sms-sender').value = systemSettings.sms.sender;
    document.getElementById('sms-enabled').checked = systemSettings.sms.enabled;
}

function loadIntegrationSettings() {
    document.getElementById('ga4-measurement-id').value = systemSettings.integrations.ga4MeasurementId;
    document.getElementById('hotjar-site-id').value = systemSettings.integrations.hotjarSiteId;
    document.getElementById('google-maps-api-key').value = systemSettings.integrations.googleMapsApiKey;

    // Update integration status indicators
    updateIntegrationStatus('ga4', systemSettings.integrations.ga4MeasurementId);
    updateIntegrationStatus('hotjar', systemSettings.integrations.hotjarSiteId);
    updateIntegrationStatus('maps', systemSettings.integrations.googleMapsApiKey);
}

function loadSystemLogs() {
    filterSystemLogs();
}

// Toggle Switch Functions
function initializeToggleSwitches() {
    // Set initial states for toggle switches
    updateToggleSwitch('contractor-auto-approval', systemSettings.userManagement.contractorAutoApproval);
    updateToggleSwitch('architect-auto-approval', systemSettings.userManagement.architectAutoApproval);
    updateToggleSwitch('notary-auto-approval', systemSettings.userManagement.notaryAutoApproval);
}

function toggleSwitch(switchId) {
    const checkbox = document.getElementById(switchId);
    const toggleElement = checkbox.nextElementSibling;

    checkbox.checked = !checkbox.checked;
    updateToggleSwitch(switchId, checkbox.checked);

    // Save the change
    switch (switchId) {
        case 'contractor-auto-approval':
            systemSettings.userManagement.contractorAutoApproval = checkbox.checked;
            break;
        case 'architect-auto-approval':
            systemSettings.userManagement.architectAutoApproval = checkbox.checked;
            break;
        case 'notary-auto-approval':
            systemSettings.userManagement.notaryAutoApproval = checkbox.checked;
            break;
    }

    showNotification(`${getSwitchLabel(switchId)} ${checkbox.checked ? 'aktif' : 'pasif'} edildi`, 'success');
}

function updateToggleSwitch(switchId, isActive) {
    const checkbox = document.getElementById(switchId);
    const toggleElement = checkbox.nextElementSibling;

    if (isActive) {
        toggleElement.classList.add('active');
    } else {
        toggleElement.classList.remove('active');
    }
}

function getSwitchLabel(switchId) {
    const labels = {
        'contractor-auto-approval': 'Müteahhit Otomatik Onay',
        'architect-auto-approval': 'Mimar Otomatik Onay',
        'notary-auto-approval': 'Noter Otomatik Onay'
    };
    return labels[switchId] || switchId;
}

// Settings Action Functions
function saveAllSettings() {
    try {
        // Collect all form data
        collectGeneralSettings();
        collectUserManagementSettings();
        collectCommissionRates();
        collectSecuritySettings();
        collectEmailSMSSettings();
        collectIntegrationSettings();

        // Simulate saving to server
        setTimeout(() => {
            showNotification('Tüm ayarlar başarıyla kaydedildi', 'success');

            // Log the action
            addSystemLog('update', 'admin', 'Sistem ayarları toplu güncelleme yapıldı');
        }, 1000);

        showNotification('Ayarlar kaydediliyor...', 'info');

    } catch (error) {
        showNotification('Ayarlar kaydedilirken hata oluştu', 'error');
        console.error('Settings save error:', error);
    }
}

function resetToDefaults() {
    if (confirm('Tüm ayarları varsayılan değerlere sıfırlamak istediğinizden emin misiniz? Bu işlem geri alınamaz.')) {
        // Reset to default values
        systemSettings = {
            general: {
                siteName: 'DönüşümAy',
                siteEmail: 'info@donusumay.com',
                sitePhone: '+90 212 555 0123',
                siteTimezone: 'Europe/Istanbul',
                siteLanguage: 'tr',
                siteDescription: 'Kentsel dönüşüm ve emlak değerlendirme platformu',
                siteAddress: 'Maslak Mahallesi, Büyükdere Caddesi No: 123, Sarıyer/İstanbul'
            },
            userManagement: {
                registrationApproval: 'manual',
                contractorAutoApproval: true,
                architectAutoApproval: false,
                notaryAutoApproval: false,
                minUserAge: 18,
                passwordResetExpiry: 90,
                maxUsers: 10000,
                sessionDuration: 60
            },
            commissionRates: {
                urbanTransformation: 3.5,
                architecturalDraft: 15,
                apartmentSales: 2,
                notaryFee: 10
            },
            security: {
                twoFactorAuth: 'optional',
                failedLoginLimit: 5,
                accountLockoutDuration: 30,
                passwordMinLength: 8,
                allowedIPs: ''
            },
            email: {
                smtpServer: 'smtp.gmail.com',
                smtpPort: 587,
                smtpUsername: '',
                smtpPassword: '',
                smtpSSL: true
            },
            sms: {
                provider: 'netgsm',
                apiKey: '',
                sender: 'DONUSUMAY',
                enabled: true
            },
            integrations: {
                ga4MeasurementId: '',
                hotjarSiteId: '',
                googleMapsApiKey: 'AIzaSyExample123'
            }
        };

        // Reload all settings
        loadSettings();
        showNotification('Tüm ayarlar varsayılan değerlere sıfırlandı', 'success');

        // Log the action
        addSystemLog('update', 'admin', 'Sistem ayarları varsayılan değerlere sıfırlandı');
    }
}

function collectGeneralSettings() {
    systemSettings.general.siteName = document.getElementById('site-name').value;
    systemSettings.general.siteEmail = document.getElementById('site-email').value;
    systemSettings.general.sitePhone = document.getElementById('site-phone').value;
    systemSettings.general.siteTimezone = document.getElementById('site-timezone').value;
    systemSettings.general.siteLanguage = document.getElementById('site-language').value;
    systemSettings.general.siteDescription = document.getElementById('site-description').value;
    systemSettings.general.siteAddress = document.getElementById('site-address').value;
}

function collectUserManagementSettings() {
    systemSettings.userManagement.registrationApproval = document.getElementById('user-registration-approval').value;
    systemSettings.userManagement.contractorAutoApproval = document.getElementById('contractor-auto-approval').checked;
    systemSettings.userManagement.architectAutoApproval = document.getElementById('architect-auto-approval').checked;
    systemSettings.userManagement.notaryAutoApproval = document.getElementById('notary-auto-approval').checked;
    systemSettings.userManagement.minUserAge = parseInt(document.getElementById('min-user-age').value);
    systemSettings.userManagement.passwordResetExpiry = parseInt(document.getElementById('password-reset-expiry').value);
    systemSettings.userManagement.maxUsers = parseInt(document.getElementById('max-users').value);
    systemSettings.userManagement.sessionDuration = parseInt(document.getElementById('user-session-duration').value);
}

function collectCommissionRates() {
    systemSettings.commissionRates.urbanTransformation = parseFloat(document.getElementById('urban-transformation-commission').value);
    systemSettings.commissionRates.architecturalDraft = parseFloat(document.getElementById('architectural-draft-commission').value);
    systemSettings.commissionRates.apartmentSales = parseFloat(document.getElementById('apartment-sales-commission').value);
    systemSettings.commissionRates.notaryFee = parseFloat(document.getElementById('notary-fee-commission').value);
}

function collectSecuritySettings() {
    systemSettings.security.twoFactorAuth = document.querySelector('input[name="two-factor-auth"]:checked').value;
    systemSettings.security.failedLoginLimit = parseInt(document.getElementById('failed-login-limit').value);
    systemSettings.security.accountLockoutDuration = parseInt(document.getElementById('account-lockout-duration').value);
    systemSettings.security.passwordMinLength = parseInt(document.getElementById('password-min-length').value);
    systemSettings.security.allowedIPs = document.getElementById('allowed-ips').value;
}

function collectEmailSMSSettings() {
    systemSettings.email.smtpServer = document.getElementById('smtp-server').value;
    systemSettings.email.smtpPort = parseInt(document.getElementById('smtp-port').value);
    systemSettings.email.smtpUsername = document.getElementById('smtp-username').value;
    systemSettings.email.smtpPassword = document.getElementById('smtp-password').value;
    systemSettings.email.smtpSSL = document.getElementById('smtp-ssl').checked;

    systemSettings.sms.provider = document.getElementById('sms-provider').value;
    systemSettings.sms.apiKey = document.getElementById('sms-api-key').value;
    systemSettings.sms.sender = document.getElementById('sms-sender').value;
    systemSettings.sms.enabled = document.getElementById('sms-enabled').checked;
}

function collectIntegrationSettings() {
    systemSettings.integrations.ga4MeasurementId = document.getElementById('ga4-measurement-id').value;
    systemSettings.integrations.hotjarSiteId = document.getElementById('hotjar-site-id').value;
    systemSettings.integrations.googleMapsApiKey = document.getElementById('google-maps-api-key').value;
}

// Commission Rate Functions
function updateCommissionRates() {
    try {
        collectCommissionRates();

        // Validate commission rates
        if (systemSettings.commissionRates.urbanTransformation < 0 || systemSettings.commissionRates.urbanTransformation > 100) {
            throw new Error('Kentsel dönüşüm komisyonu 0-100 arasında olmalıdır');
        }
        if (systemSettings.commissionRates.architecturalDraft < 0 || systemSettings.commissionRates.architecturalDraft > 100) {
            throw new Error('Mimari taslak komisyonu 0-100 arasında olmalıdır');
        }
        if (systemSettings.commissionRates.apartmentSales < 0 || systemSettings.commissionRates.apartmentSales > 100) {
            throw new Error('Daire satış komisyonu 0-100 arasında olmalıdır');
        }
        if (systemSettings.commissionRates.notaryFee < 0 || systemSettings.commissionRates.notaryFee > 100) {
            throw new Error('Noter ücreti komisyonu 0-100 arasında olmalıdır');
        }

        showNotification('Komisyon oranları başarıyla güncellendi', 'success');

        // Log the action
        addSystemLog('update', 'admin', `Komisyon oranları güncellendi: KD:${systemSettings.commissionRates.urbanTransformation}%, MT:${systemSettings.commissionRates.architecturalDraft}%, DS:${systemSettings.commissionRates.apartmentSales}%, NU:${systemSettings.commissionRates.notaryFee}%`);

    } catch (error) {
        showNotification(error.message, 'error');
    }
}

// Email and SMS Test Functions
function testEmailSettings() {
    collectEmailSMSSettings();

    if (!systemSettings.email.smtpServer || !systemSettings.email.smtpUsername) {
        showNotification('SMTP sunucu ve kullanıcı adı alanları zorunludur', 'warning');
        return;
    }

    showNotification('E-posta ayarları test ediliyor...', 'info');

    // Simulate email test
    setTimeout(() => {
        const isSuccess = Math.random() > 0.3; // 70% success rate for demo
        if (isSuccess) {
            showNotification('E-posta test başarılı! Test e-postası gönderildi.', 'success');
            addSystemLog('create', 'admin', 'E-posta ayarları test edildi - Başarılı');
        } else {
            showNotification('E-posta test başarısız! SMTP ayarlarını kontrol edin.', 'error');
            addSystemLog('error', 'admin', 'E-posta ayarları test edildi - Başarısız');
        }
    }, 2000);
}

function testSMSSettings() {
    collectEmailSMSSettings();

    if (!systemSettings.sms.apiKey) {
        showNotification('SMS API anahtarı gereklidir', 'warning');
        return;
    }

    showNotification('SMS ayarları test ediliyor...', 'info');

    // Simulate SMS test
    setTimeout(() => {
        const isSuccess = Math.random() > 0.2; // 80% success rate for demo
        if (isSuccess) {
            showNotification('SMS test başarılı! Test SMS\'i gönderildi.', 'success');
            addSystemLog('create', 'admin', 'SMS ayarları test edildi - Başarılı');
        } else {
            showNotification('SMS test başarısız! API ayarlarını kontrol edin.', 'error');
            addSystemLog('error', 'admin', 'SMS ayarları test edildi - Başarısız');
        }
    }, 2000);
}

// Integration Test Functions
function testGA4Integration() {
    const measurementId = document.getElementById('ga4-measurement-id').value;

    if (!measurementId) {
        showNotification('Google Analytics Measurement ID gereklidir', 'warning');
        return;
    }

    if (!measurementId.startsWith('G-')) {
        showNotification('Geçersiz Measurement ID formatı (G-XXXXXXXXXX)', 'error');
        return;
    }

    showNotification('Google Analytics entegrasyonu test ediliyor...', 'info');

    setTimeout(() => {
        const isSuccess = measurementId.length > 5; // Simple validation for demo
        updateIntegrationStatus('ga4', isSuccess ? measurementId : '');

        if (isSuccess) {
            showNotification('Google Analytics entegrasyonu başarılı!', 'success');
            addSystemLog('update', 'admin', 'Google Analytics entegrasyonu test edildi - Başarılı');
        } else {
            showNotification('Google Analytics entegrasyonu başarısız!', 'error');
            addSystemLog('error', 'admin', 'Google Analytics entegrasyonu test edildi - Başarısız');
        }
    }, 1500);
}

function testHotjarIntegration() {
    const siteId = document.getElementById('hotjar-site-id').value;

    if (!siteId) {
        showNotification('Hotjar Site ID gereklidir', 'warning');
        return;
    }

    if (!/^\d+$/.test(siteId)) {
        showNotification('Site ID sadece sayılardan oluşmalıdır', 'error');
        return;
    }

    showNotification('Hotjar entegrasyonu test ediliyor...', 'info');

    setTimeout(() => {
        const isSuccess = siteId.length >= 6; // Simple validation for demo
        updateIntegrationStatus('hotjar', isSuccess ? siteId : '');

        if (isSuccess) {
            showNotification('Hotjar entegrasyonu başarılı!', 'success');
            addSystemLog('update', 'admin', 'Hotjar entegrasyonu test edildi - Başarılı');
        } else {
            showNotification('Hotjar entegrasyonu başarısız!', 'error');
            addSystemLog('error', 'admin', 'Hotjar entegrasyonu test edildi - Başarısız');
        }
    }, 1500);
}

function testMapsIntegration() {
    const apiKey = document.getElementById('google-maps-api-key').value;

    if (!apiKey) {
        showNotification('Google Maps API Key gereklidir', 'warning');
        return;
    }

    if (!apiKey.startsWith('AIza')) {
        showNotification('Geçersiz API Key formatı', 'error');
        return;
    }

    showNotification('Google Maps entegrasyonu test ediliyor...', 'info');

    setTimeout(() => {
        const isSuccess = apiKey.length > 20; // Simple validation for demo
        updateIntegrationStatus('maps', isSuccess ? apiKey : '');

        if (isSuccess) {
            showNotification('Google Maps entegrasyonu başarılı!', 'success');
            addSystemLog('update', 'admin', 'Google Maps entegrasyonu test edildi - Başarılı');
        } else {
            showNotification('Google Maps entegrasyonu başarısız!', 'error');
            addSystemLog('error', 'admin', 'Google Maps entegrasyonu test edildi - Başarısız');
        }
    }, 1500);
}

function updateIntegrationStatus(integration, value) {
    const statusElements = {
        'ga4': document.getElementById('ga4-status'),
        'hotjar': document.getElementById('hotjar-status'),
        'maps': document.getElementById('maps-status')
    };

    const statusElement = statusElements[integration];
    if (!statusElement) return;

    const isActive = value && value.length > 0;

    if (isActive) {
        statusElement.textContent = 'Aktif';
        statusElement.className = 'inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800';
    } else {
        statusElement.textContent = 'Pasif';
        statusElement.className = 'inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800';
    }
}

// Modal Functions
function openNewAnnouncementModal() {
    document.getElementById('new-announcement-modal').classList.remove('hidden');
    document.getElementById('new-announcement-modal').classList.add('flex');
}

function closeNewAnnouncementModal() {
    document.getElementById('new-announcement-modal').classList.add('hidden');
    document.getElementById('new-announcement-modal').classList.remove('flex');
}

function openNewFAQModal() {
    document.getElementById('new-faq-modal').classList.remove('hidden');
    document.getElementById('new-faq-modal').classList.add('flex');
}

function closeNewFAQModal() {
    document.getElementById('new-faq-modal').classList.add('hidden');
    document.getElementById('new-faq-modal').classList.remove('flex');
}

function openNewCampaignModal() {
    document.getElementById('new-campaign-modal').classList.remove('hidden');
    document.getElementById('new-campaign-modal').classList.add('flex');
}

function closeNewCampaignModal() {
    document.getElementById('new-campaign-modal').classList.add('hidden');
    document.getElementById('new-campaign-modal').classList.remove('flex');
}

// Listing Modal Functions
function openListingDetailsModal(listingId) {
    const listing = sampleData.listings.find(l => l.id === listingId);
    if (!listing) return;

    // Populate basic info
    document.getElementById('listing-basic-info').innerHTML = `
        <div class="space-y-2">
            <div><span class="font-medium">İlan ID:</span> #${listing.id}</div>
            <div><span class="font-medium">Başlık:</span> ${listing.title}</div>
            <div><span class="font-medium">Tip:</span> ${getListingTypeText(listing.type)}</div>
            <div><span class="font-medium">Alan:</span> ${listing.area} m²</div>
        </div>
        <div class="space-y-2">
            <div><span class="font-medium">Oda Sayısı:</span> ${listing.rooms}</div>
            <div><span class="font-medium">Beklenen Fiyat:</span> ₺${listing.price.toLocaleString()}</div>
            <div><span class="font-medium">Teklif Sayısı:</span> ${listing.offerCount}</div>
            <div><span class="font-medium">Açıklama:</span> ${listing.description}</div>
        </div>
    `;

    // Populate property info
    document.getElementById('listing-property-info').innerHTML = `
        <div class="grid grid-cols-2 gap-4">
            <div><span class="font-medium">Şehir:</span> ${listing.city.charAt(0).toUpperCase() + listing.city.slice(1)}</div>
            <div><span class="font-medium">İlçe:</span> ${listing.district}</div>
            <div><span class="font-medium">İmar Çapı Durumu:</span> 
                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getZoningStatusColor(listing.zoningStatus)}">
                    ${getZoningStatusText(listing.zoningStatus)}
                </span>
            </div>
        </div>
    `;

    // Populate project info
    document.getElementById('listing-project-info').innerHTML = `
        <div class="grid grid-cols-2 gap-4">
            <div><span class="font-medium">Proje Tipi:</span> ${getListingTypeText(listing.type)}</div>
            <div><span class="font-medium">Toplam Alan:</span> ${listing.area} m²</div>
        </div>
    `;

    // Populate rights holders
    document.getElementById('listing-rights-holders').innerHTML = `
        <div class="space-y-2">
            ${listing.rightsHolders.map(holder => `
                <div class="flex justify-between items-center p-2 bg-white rounded border">
                    <div>
                        <div class="font-medium">${holder.name}</div>
                        <div class="text-sm text-gray-500">${holder.relation}</div>
                    </div>
                    <div class="text-sm font-medium">%${holder.share}</div>
                </div>
            `).join('')}
        </div>
    `;

    // Populate status info
    document.getElementById('listing-status-info').innerHTML = `
        <div class="grid grid-cols-2 gap-4">
            <div><span class="font-medium">Durum:</span> 
                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(listing.status)}">
                    ${getStatusText(listing.status)}
                </span>
            </div>
            <div><span class="font-medium">Oluşturulma:</span> ${formatDate(listing.createdAt)}</div>
            <div><span class="font-medium">Yayın Tarihi:</span> ${listing.publishedAt ? formatDate(listing.publishedAt) : 'Henüz yayınlanmadı'}</div>
            <div><span class="font-medium">İlan Sahibi:</span> ${listing.owner.name}</div>
        </div>
    `;

    // Populate images
    document.getElementById('listing-images-gallery').innerHTML = `
        <div class="space-y-2">
            ${listing.images.map((image, index) => `
                <div class="bg-gray-200 rounded-lg h-32 flex items-center justify-center">
                    <span class="text-gray-500">Görsel ${index + 1}</span>
                </div>
            `).join('')}
        </div>
    `;

    document.getElementById('listing-details-modal').classList.remove('hidden');
    document.getElementById('listing-details-modal').classList.add('flex');
}

function closeListingDetailsModal() {
    document.getElementById('listing-details-modal').classList.add('hidden');
    document.getElementById('listing-details-modal').classList.remove('flex');
}

function openEditListingModal(listingId) {
    const listing = sampleData.listings.find(l => l.id === listingId);
    if (!listing) return;

    // Populate form fields
    document.getElementById('edit-listing-title').value = listing.title;
    document.getElementById('edit-listing-type').value = listing.type;
    document.getElementById('edit-listing-status').value = listing.status;
    document.getElementById('edit-listing-description').value = listing.description;
    document.getElementById('edit-listing-city').value = listing.city;
    document.getElementById('edit-listing-district').value = listing.district;
    document.getElementById('edit-listing-zoning-status').value = listing.zoningStatus;
    document.getElementById('edit-listing-price').value = listing.price;
    document.getElementById('edit-listing-area').value = listing.area;
    document.getElementById('edit-listing-rooms').value = listing.rooms;

    // Store listing ID for saving
    currentListingId = listingId;

    document.getElementById('edit-listing-modal').classList.remove('hidden');
    document.getElementById('edit-listing-modal').classList.add('flex');
}

function closeEditListingModal() {
    document.getElementById('edit-listing-modal').classList.add('hidden');
    document.getElementById('edit-listing-modal').classList.remove('flex');
    currentListingId = null;
}

function saveListingChanges(event) {
    event.preventDefault();

    if (!currentListingId) return;

    const listing = sampleData.listings.find(l => l.id === currentListingId);
    if (!listing) return;

    // Update listing data
    listing.title = document.getElementById('edit-listing-title').value;
    listing.type = document.getElementById('edit-listing-type').value;
    listing.status = document.getElementById('edit-listing-status').value;
    listing.description = document.getElementById('edit-listing-description').value;
    listing.city = document.getElementById('edit-listing-city').value;
    listing.district = document.getElementById('edit-listing-district').value;
    listing.zoningStatus = document.getElementById('edit-listing-zoning-status').value;
    listing.price = parseInt(document.getElementById('edit-listing-price').value);
    listing.area = parseInt(document.getElementById('edit-listing-area').value);
    listing.rooms = document.getElementById('edit-listing-rooms').value;

    closeEditListingModal();
    renderListingsTable();
    updateListingStats();
    showNotification('İlan başarıyla güncellendi.', 'success');
}

function confirmApproveRejectListing(listingId, action) {
    currentListingId = listingId;
    currentListingAction = action;

    const listing = sampleData.listings.find(l => l.id === listingId);
    if (!listing) return;

    const modal = document.getElementById('approve-reject-listing-modal');
    const iconDiv = document.getElementById('approve-reject-icon');
    const title = document.getElementById('approve-reject-title');
    const message = document.getElementById('approve-reject-message');
    const reasonSection = document.getElementById('rejection-reason-section');
    const confirmBtn = document.getElementById('confirm-action-btn');

    if (action === 'approved') {
        iconDiv.className = 'mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4';
        iconDiv.innerHTML = '<i class="fas fa-check text-green-600 text-xl"></i>';
        title.textContent = 'İlan Onayı';
        message.textContent = `"${listing.title}" başlıklı ilanı onaylamak istediğinizden emin misiniz?`;
        reasonSection.classList.add('hidden');
        confirmBtn.className = 'bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200';
        confirmBtn.textContent = 'Onayla';
    } else {
        iconDiv.className = 'mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4';
        iconDiv.innerHTML = '<i class="fas fa-times text-red-600 text-xl"></i>';
        title.textContent = 'İlan Reddi';
        message.textContent = `"${listing.title}" başlıklı ilanı reddetmek istediğinizden emin misiniz?`;
        reasonSection.classList.remove('hidden');
        confirmBtn.className = 'bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200';
        confirmBtn.textContent = 'Reddet';
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeApproveRejectListingModal() {
    document.getElementById('approve-reject-listing-modal').classList.add('hidden');
    document.getElementById('approve-reject-listing-modal').classList.remove('flex');
    document.getElementById('rejection-reason').value = '';
    currentListingId = null;
    currentListingAction = null;
}

function confirmListingAction() {
    if (!currentListingId || !currentListingAction) return;

    if (currentListingAction === 'rejected') {
        const reason = document.getElementById('rejection-reason').value.trim();
        if (!reason) {
            showNotification('Reddetme nedeni gereklidir.', 'error');
            return;
        }
    }

    const listing = sampleData.listings.find(l => l.id === currentListingId);
    if (!listing) return;

    listing.status = currentListingAction === 'approved' ? 'active' : 'rejected';

    if (currentListingAction === 'approved') {
        listing.publishedAt = new Date().toISOString().split('T')[0];
    }

    closeApproveRejectListingModal();
    renderListingsTable();
    updateListingStats();

    const actionText = currentListingAction === 'approved' ? 'onaylandı' : 'reddedildi';
    showNotification(`İlan başarıyla ${actionText}.`, 'success');
}

function confirmDeleteListingAction(listingId) {
    const listing = sampleData.listings.find(l => l.id === listingId);
    if (!listing) return;

    currentListingId = listingId;
    document.getElementById('delete-listing-message').textContent =
        `"${listing.title}" başlıklı ilanı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`;

    document.getElementById('delete-listing-modal').classList.remove('hidden');
    document.getElementById('delete-listing-modal').classList.add('flex');
}

function closeDeleteListingModal() {
    document.getElementById('delete-listing-modal').classList.add('hidden');
    document.getElementById('delete-listing-modal').classList.remove('flex');
    currentListingId = null;
}

function confirmDeleteListing() {
    if (!currentListingId) return;

    const index = sampleData.listings.findIndex(l => l.id === currentListingId);
    if (index !== -1) {
        sampleData.listings.splice(index, 1);
    }

    closeDeleteListingModal();
    applyListingFilters();
    updateListingStats();
    showNotification('İlan başarıyla silindi.', 'success');
}

function handleListingImageUpload(event) {
    const files = event.target.files;
    const previewContainer = document.getElementById('edit-listing-images-preview');

    previewContainer.innerHTML = '';

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = function (e) {
            const div = document.createElement('div');
            div.className = 'relative';
            div.innerHTML = `
                <img src="${e.target.result}" class="w-full h-20 object-cover rounded border">
                <button onclick="this.parentElement.remove()" class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    ×
                </button>
            `;
            previewContainer.appendChild(div);
        };

        reader.readAsDataURL(file);
    }
}

function viewTicket(id) { showNotification('Ticket görüntüleniyor: ' + id, 'info'); }
function closeTicket(id) { showNotification('Ticket kapatıldı: ' + id, 'success'); }

// Enhanced Offer Management Functions
function applyOfferFilters() {
    loadOffers();
}

function applyOfferFiltersToData() {
    const searchTerm = document.getElementById('offer-search')?.value.toLowerCase() || '';
    const statusFilter = document.getElementById('offer-status-filter')?.value || '';
    const listingTypeFilter = document.getElementById('offer-listing-type-filter')?.value || '';
    const projectTypeFilter = document.getElementById('offer-project-type-filter')?.value || '';

    return sampleData.offers.filter(offer => {
        const matchesSearch = !searchTerm ||
            offer.id.toString().includes(searchTerm) ||
            offer.listingTitle.toLowerCase().includes(searchTerm) ||
            offer.offerBy.toLowerCase().includes(searchTerm) ||
            offer.amount.toLowerCase().includes(searchTerm);

        const matchesStatus = !statusFilter || offer.status === statusFilter;
        const matchesListingType = !listingTypeFilter || offer.listingType === listingTypeFilter;
        const matchesProjectType = !projectTypeFilter || offer.projectType === projectTypeFilter;

        return matchesSearch && matchesStatus && matchesListingType && matchesProjectType;
    });
}

function clearOfferFilters() {
    document.getElementById('offer-search').value = '';
    document.getElementById('offer-status-filter').value = '';
    document.getElementById('offer-listing-type-filter').value = '';
    document.getElementById('offer-project-type-filter').value = '';
    loadOffers();
}

function exportOffers() {
    const filteredOffers = applyOfferFiltersToData();
    const csvContent = "data:text/csv;charset=utf-8," +
        "Teklif ID,İlan,Teklif Veren,Teklif Tutarı,Durum,Tarih\n" +
        filteredOffers.map(offer =>
            `${offer.id},"${offer.listingTitle}","${offer.offerBy}","${offer.amount}","${getOfferStatusText(offer.status)}","${formatDate(offer.date)}"`
        ).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'teklifler.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showNotification('Teklifler CSV olarak dışa aktarıldı', 'success');
}

function updateOfferFilterCounts(filteredOffers) {
    const totalOffersCount = document.getElementById('total-offers-count');
    const filteredOffersCount = document.getElementById('filtered-offers-count');

    if (totalOffersCount) totalOffersCount.textContent = sampleData.offers.length;
    if (filteredOffersCount) filteredOffersCount.textContent = filteredOffers.length;
}

// Offer Details Modal Functions
function openOfferDetailsModal(offerId) {
    const offer = sampleData.offers.find(o => o.id == offerId);
    if (!offer) {
        showNotification('Teklif bulunamadı', 'error');
        return;
    }

    // Populate basic offer info
    document.getElementById('offer-basic-info').innerHTML = `
        <p><strong>Teklif ID:</strong> #${offer.id}</p>
        <p><strong>Durum:</strong> <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getOfferStatusColor(offer.status)}">${getOfferStatusText(offer.status)}</span></p>
        <p><strong>Teklif Tarihi:</strong> ${formatDate(offer.date)}</p>
        <p><strong>Geçerlilik Süresi:</strong> ${offer.validUntil || '30 gün'}</p>
        <p><strong>Notlar:</strong> ${offer.notes || 'Belirtilmemiş'}</p>
    `;

    // Populate contractor info
    document.getElementById('offer-contractor-info').innerHTML = `
        <p><strong>Firma Adı:</strong> ${offer.offerBy}</p>
        <p><strong>Yetkili Kişi:</strong> ${offer.contactPerson || 'Belirtilmemiş'}</p>
        <p><strong>Telefon:</strong> ${offer.phone || 'Belirtilmemiş'}</p>
        <p><strong>E-posta:</strong> ${offer.email || 'Belirtilmemiş'}</p>
        <p><strong>Deneyim:</strong> ${offer.experience || 'Belirtilmemiş'} yıl</p>
        <p><strong>Referanslar:</strong> ${offer.references || 'Belirtilmemiş'}</p>
    `;

    // Populate financial info
    document.getElementById('offer-financial-info').innerHTML = `
        <p><strong>Toplam Tutar:</strong> ${offer.amount}</p>
        <p><strong>Metrekare Fiyatı:</strong> ${offer.pricePerSqm || 'Belirtilmemiş'}</p>
        <p><strong>Ödeme Planı:</strong> ${offer.paymentPlan || 'Belirtilmemiş'}</p>
        <p><strong>Avans Oranı:</strong> ${offer.advancePayment || 'Belirtilmemiş'}</p>
        <p><strong>Garanti Süresi:</strong> ${offer.warrantyPeriod || 'Belirtilmemiş'}</p>
    `;

    // Populate listing info
    document.getElementById('offer-listing-info').innerHTML = `
        <p><strong>İlan Başlığı:</strong> ${offer.listingTitle}</p>
        <p><strong>İlan Tipi:</strong> ${getListingTypeText(offer.listingType || 'apartment')}</p>
        <p><strong>Proje Tipi:</strong> ${offer.projectType || 'Tadilat'}</p>
        <p><strong>Konum:</strong> ${offer.location || 'Belirtilmemiş'}</p>
        <p><strong>Alan:</strong> ${offer.area || 'Belirtilmemiş'} m²</p>
    `;

    // Populate property details
    document.getElementById('offer-property-details').innerHTML = `
        <p><strong>Oda Sayısı:</strong> ${offer.rooms || 'Belirtilmemiş'}</p>
        <p><strong>Banyo Sayısı:</strong> ${offer.bathrooms || 'Belirtilmemiş'}</p>
        <p><strong>Bina Yaşı:</strong> ${offer.buildingAge || 'Belirtilmemiş'} yıl</p>
        <p><strong>Kat:</strong> ${offer.floor || 'Belirtilmemiş'}</p>
        <p><strong>Mevcut Durum:</strong> ${offer.currentCondition || 'Belirtilmemiş'}</p>
    `;

    // Populate design files
    const designFiles = offer.designFiles || [
        { name: 'Ön Görünüş Planı.pdf', type: 'pdf', uploaded: '2024-01-15' },
        { name: 'Kat Planları.dwg', type: 'dwg', uploaded: '2024-01-15' },
        { name: '3D Render.jpg', type: 'image', uploaded: '2024-01-16' }
    ];

    document.getElementById('offer-design-files').innerHTML = designFiles.map(file => `
        <div class="flex items-center justify-between p-3 bg-white rounded border">
            <div class="flex items-center">
                <i class="fas fa-file-${file.type === 'pdf' ? 'pdf' : file.type === 'image' ? 'image' : 'alt'} text-gray-600 mr-2"></i>
                <div>
                    <p class="text-sm font-medium">${file.name}</p>
                    <p class="text-xs text-gray-500">Yükleme: ${formatDate(file.uploaded)}</p>
                </div>
            </div>
            <div class="flex space-x-1">
                <button onclick="viewDocument('${file.name}')" class="text-blue-600 hover:text-blue-800 text-xs px-2 py-1 rounded bg-blue-50 hover:bg-blue-100">
                    Görüntüle
                </button>
                <button onclick="downloadDocument('${file.name}')" class="text-green-600 hover:text-green-800 text-xs px-2 py-1 rounded bg-green-50 hover:bg-green-100">
                    İndir
                </button>
                <button onclick="shareDocument('${file.name}')" class="text-purple-600 hover:text-purple-800 text-xs px-2 py-1 rounded bg-purple-50 hover:bg-purple-100">
                    Paylaş
                </button>
            </div>
        </div>
    `).join('');

    // Populate additional docs
    const additionalDocs = offer.additionalDocs || [
        { name: 'Şirket Belgesi.pdf', type: 'pdf', uploaded: '2024-01-10' },
        { name: 'Referans Mektupları.pdf', type: 'pdf', uploaded: '2024-01-10' }
    ];

    document.getElementById('offer-additional-docs').innerHTML = additionalDocs.map(doc => `
        <div class="flex items-center justify-between p-3 bg-white rounded border">
            <div class="flex items-center">
                <i class="fas fa-file-pdf text-gray-600 mr-2"></i>
                <div>
                    <p class="text-sm font-medium">${doc.name}</p>
                    <p class="text-xs text-gray-500">Yükleme: ${formatDate(doc.uploaded)}</p>
                </div>
            </div>
            <div class="flex space-x-1">
                <button onclick="viewDocument('${doc.name}')" class="text-blue-600 hover:text-blue-800 text-xs px-2 py-1 rounded bg-blue-50 hover:bg-blue-100">
                    Görüntüle
                </button>
                <button onclick="downloadDocument('${doc.name}')" class="text-green-600 hover:text-green-800 text-xs px-2 py-1 rounded bg-green-50 hover:bg-green-100">
                    İndir
                </button>
            </div>
        </div>
    `).join('');

    // Populate timeline
    const timeline = offer.timeline || [
        { date: '2024-01-10', event: 'Teklif gönderildi', status: 'completed' },
        { date: '2024-01-15', event: 'Tasarım dosyaları yüklendi', status: 'completed' },
        { date: '2024-01-20', event: 'Admin incelemesi', status: 'pending' }
    ];

    document.getElementById('offer-timeline').innerHTML = timeline.map(item => `
        <div class="flex items-center">
            <div class="w-3 h-3 rounded-full ${item.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'} mr-3"></div>
            <div>
                <p class="text-sm font-medium">${item.event}</p>
                <p class="text-xs text-gray-500">${formatDate(item.date)}</p>
            </div>
        </div>
    `).join('');

    document.getElementById('offer-details-modal').classList.remove('hidden');
    document.getElementById('offer-details-modal').classList.add('flex');
}

function closeOfferDetailsModal() {
    document.getElementById('offer-details-modal').classList.add('hidden');
    document.getElementById('offer-details-modal').classList.remove('flex');
}

// Approve/Reject Offer Modal Functions
let currentOfferAction = null;
let currentOfferId = null;

function confirmApproveOffer(offerId) {
    const offer = sampleData.offers.find(o => o.id == offerId);
    if (!offer) {
        showNotification('Teklif bulunamadı', 'error');
        return;
    }

    currentOfferAction = 'approve';
    currentOfferId = offerId;

    // Set modal content for approval
    document.getElementById('offer-approve-reject-icon').innerHTML = '<i class="fas fa-check text-green-600 text-xl"></i>';
    document.getElementById('offer-approve-reject-icon').className = 'mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4';
    document.getElementById('offer-approve-reject-title').textContent = 'Teklif Onayı';
    document.getElementById('offer-approve-reject-message').textContent = 'Bu teklifi onaylamak istediğinizden emin misiniz?';

    // Populate offer summary
    document.getElementById('modal-offer-id').textContent = `#${offer.id}`;
    document.getElementById('modal-offer-contractor').textContent = offer.offerBy;
    document.getElementById('modal-offer-amount').textContent = offer.amount;

    // Hide rejection reason section
    document.getElementById('offer-rejection-reason-section').classList.add('hidden');

    // Set confirm button
    const confirmBtn = document.getElementById('confirm-offer-action-btn');
    confirmBtn.textContent = 'Onayla';
    confirmBtn.className = 'bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200';

    document.getElementById('approve-reject-offer-modal').classList.remove('hidden');
    document.getElementById('approve-reject-offer-modal').classList.add('flex');
}

function confirmRejectOffer(offerId) {
    const offer = sampleData.offers.find(o => o.id == offerId);
    if (!offer) {
        showNotification('Teklif bulunamadı', 'error');
        return;
    }

    currentOfferAction = 'reject';
    currentOfferId = offerId;

    // Set modal content for rejection
    document.getElementById('offer-approve-reject-icon').innerHTML = '<i class="fas fa-times text-red-600 text-xl"></i>';
    document.getElementById('offer-approve-reject-icon').className = 'mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4';
    document.getElementById('offer-approve-reject-title').textContent = 'Teklif Reddi';
    document.getElementById('offer-approve-reject-message').textContent = 'Bu teklifi reddetmek istediğinizden emin misiniz?';

    // Populate offer summary
    document.getElementById('modal-offer-id').textContent = `#${offer.id}`;
    document.getElementById('modal-offer-contractor').textContent = offer.offerBy;
    document.getElementById('modal-offer-amount').textContent = offer.amount;

    // Show rejection reason section
    document.getElementById('offer-rejection-reason-section').classList.remove('hidden');

    // Set confirm button
    const confirmBtn = document.getElementById('confirm-offer-action-btn');
    confirmBtn.textContent = 'Reddet';
    confirmBtn.className = 'bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200';

    document.getElementById('approve-reject-offer-modal').classList.remove('hidden');
    document.getElementById('approve-reject-offer-modal').classList.add('flex');
}

function closeApproveRejectOfferModal() {
    document.getElementById('approve-reject-offer-modal').classList.add('hidden');
    document.getElementById('approve-reject-offer-modal').classList.remove('flex');

    // Clear form
    document.getElementById('offer-rejection-reason').value = '';
    currentOfferAction = null;
    currentOfferId = null;
}

function confirmOfferAction() {
    if (!currentOfferId || !currentOfferAction) {
        showNotification('Hata: Geçersiz işlem', 'error');
        return;
    }

    if (currentOfferAction === 'reject') {
        const rejectionReason = document.getElementById('offer-rejection-reason').value.trim();
        if (!rejectionReason) {
            showNotification('Reddetme nedeni zorunludur', 'error');
            return;
        }
    }

    const offer = sampleData.offers.find(o => o.id == currentOfferId);
    if (offer) {
        if (currentOfferAction === 'approve') {
            offer.status = 'accepted';
            showNotification(`Teklif #${currentOfferId} onaylandı`, 'success');
        } else if (currentOfferAction === 'reject') {
            offer.status = 'rejected';
            offer.rejectionReason = document.getElementById('offer-rejection-reason').value.trim();
            showNotification(`Teklif #${currentOfferId} reddedildi`, 'warning');
        }

        loadOffers();
    }

    closeApproveRejectOfferModal();
}

// Document action functions for design files
function viewDocument(docName) {
    showNotification(`Belge görüntüleniyor: ${docName}`, 'info');
}

function downloadDocument(docName) {
    showNotification(`Belge indiriliyor: ${docName}`, 'info');
}

function shareDocument(docName) {
    showNotification(`Belge paylaşım linki oluşturuluyor: ${docName}`, 'info');
}

// Enhanced Project Management Functions
function applyProjectFilters() {
    loadProjects();
}

function applyProjectFiltersToData() {
    const searchTerm = document.getElementById('project-search')?.value.toLowerCase() || '';
    const statusFilter = document.getElementById('project-status-filter')?.value || '';
    const typeFilter = document.getElementById('project-type-filter')?.value || '';
    const progressFilter = document.getElementById('project-progress-filter')?.value || '';

    return sampleData.projects.filter(project => {
        const matchesSearch = !searchTerm ||
            project.id.toString().includes(searchTerm) ||
            project.name.toLowerCase().includes(searchTerm) ||
            project.contractor.toLowerCase().includes(searchTerm) ||
            project.architect.toLowerCase().includes(searchTerm);

        const matchesStatus = !statusFilter || project.status === statusFilter;
        const matchesType = !typeFilter || project.projectType === typeFilter;

        let matchesProgress = true;
        if (progressFilter) {
            const progress = project.progress || 0;
            switch (progressFilter) {
                case '0-25':
                    matchesProgress = progress >= 0 && progress <= 25;
                    break;
                case '26-50':
                    matchesProgress = progress >= 26 && progress <= 50;
                    break;
                case '51-75':
                    matchesProgress = progress >= 51 && progress <= 75;
                    break;
                case '76-100':
                    matchesProgress = progress >= 76 && progress <= 100;
                    break;
            }
        }

        return matchesSearch && matchesStatus && matchesType && matchesProgress;
    });
}

function clearProjectFilters() {
    document.getElementById('project-search').value = '';
    document.getElementById('project-status-filter').value = '';
    document.getElementById('project-type-filter').value = '';
    document.getElementById('project-progress-filter').value = '';
    loadProjects();
}

function exportProjects() {
    const filteredProjects = applyProjectFiltersToData();
    const csvContent = "data:text/csv;charset=utf-8," +
        "Proje ID,Proje Adı,Müteahhit,Mimar,Durum,İlerleme (%),Başlangıç,Bitiş\n" +
        filteredProjects.map(project =>
            `${project.id},"${project.name}","${project.contractor}","${project.architect}","${getProjectStatusText(project.status)}","${project.progress || 0}%","${formatDate(project.startDate)}","${formatDate(project.endDate)}"`
        ).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'projeler.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showNotification('Projeler CSV olarak dışa aktarıldı', 'success');
}

function updateProjectFilterCounts(filteredProjects) {
    const totalProjectsCount = document.getElementById('total-projects-count');
    const filteredProjectsCount = document.getElementById('filtered-projects-count');

    if (totalProjectsCount) totalProjectsCount.textContent = sampleData.projects.length;
    if (filteredProjectsCount) filteredProjectsCount.textContent = filteredProjects.length;
}

// Project Details Modal Functions
function openProjectDetailsModal(projectId) {
    const project = sampleData.projects.find(p => p.id == projectId);
    if (!project) {
        showNotification('Proje bulunamadı', 'error');
        return;
    }

    // Populate basic project info
    document.getElementById('project-basic-info').innerHTML = `
        <p><strong>Proje ID:</strong> #${project.id}</p>
        <p><strong>Proje Adı:</strong> ${project.name}</p>
        <p><strong>Proje Tipi:</strong> ${getProjectTypeText(project.projectType)}</p>
        <p><strong>Durum:</strong> <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getProjectStatusColor(project.status)}">${getProjectStatusText(project.status)}</span></p>
        <p><strong>Konum:</strong> ${project.location}</p>
        <p><strong>Açıklama:</strong> ${project.description}</p>
        <p><strong>Başlangıç:</strong> ${formatDate(project.startDate)}</p>
        <p><strong>Bitiş:</strong> ${formatDate(project.endDate)}</p>
    `;

    // Populate team info
    document.getElementById('project-team-info').innerHTML = `
        <p><strong>Müteahhit:</strong> ${project.contractor}</p>
        <p><strong>Mimar:</strong> ${project.architect}</p>
        <p><strong>Proje Yöneticisi:</strong> ${project.projectManager || 'Atanmamış'}</p>
        <p><strong>Site Şefi:</strong> ${project.siteManager || 'Atanmamış'}</p>
        <p><strong>Ekip Sayısı:</strong> ${project.teamSize || '8 kişi'}</p>
    `;

    // Populate payment info
    document.getElementById('project-payment-info').innerHTML = `
        <p><strong>Toplam Bütçe:</strong> ${project.budget}</p>
        <p><strong>Ödenen Tutar:</strong> ${project.totalPayments}</p>
        <p><strong>Kalan Ödeme:</strong> ${project.remainingPayments}</p>
        <p><strong>Ödeme Planı:</strong> ${project.paymentPlan || '5 taksit'}</p>
        <p><strong>Son Ödeme:</strong> ${project.lastPaymentDate || '2024-01-15'}</p>
    `;

    // Populate uploaded documents
    const uploadedDocs = project.uploadedDocs || [
        { name: 'Mimari Proje.pdf', type: 'Mimari', uploaded: '2024-01-10', status: 'approved' },
        { name: 'Statik Proje.pdf', type: 'Statik', uploaded: '2024-01-12', status: 'approved' },
        { name: 'Mekanik Proje.pdf', type: 'Mekanik', uploaded: '2024-01-15', status: 'pending' },
        { name: 'Elektrik Proje.pdf', type: 'Elektrik', uploaded: '2024-01-18', status: 'approved' }
    ];

    document.getElementById('project-uploaded-docs').innerHTML = uploadedDocs.map(doc => `
        <div class="flex items-center justify-between p-3 bg-white rounded border">
            <div class="flex items-center">
                <i class="fas fa-file-pdf text-gray-600 mr-2"></i>
                <div>
                    <p class="text-sm font-medium">${doc.name}</p>
                    <p class="text-xs text-gray-500">${doc.type} • ${formatDate(doc.uploaded)}</p>
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${doc.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
                        ${doc.status === 'approved' ? 'Onaylandı' : 'Beklemede'}
                    </span>
                </div>
            </div>
            <div class="flex space-x-1">
                <button onclick="viewDocument('${doc.name}')" class="text-blue-600 hover:text-blue-800 text-xs px-2 py-1 rounded bg-blue-50 hover:bg-blue-100">
                    Görüntüle
                </button>
                <button onclick="downloadDocument('${doc.name}')" class="text-green-600 hover:text-green-800 text-xs px-2 py-1 rounded bg-green-50 hover:bg-green-100">
                    İndir
                </button>
            </div>
        </div>
    `).join('');

    // Populate municipality processes
    const municipalityProcesses = project.municipalityProcesses || [
        { process: 'İnşaat Ruhsatı', status: 'completed', date: '2024-01-05', note: 'Onaylandı' },
        { process: 'Yapı Kullanma İzni', status: 'pending', date: '2024-01-20', note: 'Eksik evrak: Yangın raporu' },
        { process: 'Çevre Raporu', status: 'completed', date: '2024-01-03', note: 'Onaylandı' },
        { process: 'Enerji Kimlik Belgesi', status: 'not_started', date: '', note: 'Henüz başlatılmadı' }
    ];

    document.getElementById('project-municipality-processes').innerHTML = municipalityProcesses.map(process => `
        <div class="p-3 bg-white rounded border">
            <div class="flex justify-between items-start mb-2">
                <h5 class="font-medium text-sm">${process.process}</h5>
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${process.status === 'completed' ? 'bg-green-100 text-green-800' :
            process.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
        }">
                    ${process.status === 'completed' ? 'Tamamlandı' :
            process.status === 'pending' ? 'Beklemede' : 'Başlatılmadı'}
                </span>
            </div>
            ${process.date ? `<p class="text-xs text-gray-500 mb-1">Tarih: ${formatDate(process.date)}</p>` : ''}
            <p class="text-xs text-gray-600">${process.note}</p>
        </div>
    `).join('');

    // Set progress
    const progress = project.progress || 0;
    document.getElementById('project-progress-percentage').textContent = `${progress}%`;
    document.getElementById('project-progress-bar').style.width = `${progress}%`;

    // Populate construction phases
    const constructionPhases = project.constructionPhases || [
        {
            phase: 'Temel Kazısı',
            status: 'completed',
            date: '2024-01-10',
            images: ['temel1.jpg', 'temel2.jpg'],
            description: 'Temel kazı çalışmaları tamamlandı'
        },
        {
            phase: 'Beton Dökümü',
            status: 'ongoing',
            date: '2024-01-20',
            images: ['beton1.jpg'],
            description: 'Temel beton dökümü devam ediyor'
        },
        {
            phase: 'Duvar Örgü',
            status: 'pending',
            date: '',
            images: [],
            description: 'Duvar örgü çalışmaları beklemede'
        }
    ];

    document.getElementById('project-construction-phases').innerHTML = constructionPhases.map(phase => `
        <div class="border rounded-lg p-4 ${phase.status === 'completed' ? 'bg-green-50 border-green-200' :
            phase.status === 'ongoing' ? 'bg-blue-50 border-blue-200' :
                'bg-gray-50 border-gray-200'}">
            <div class="flex justify-between items-start mb-2">
                <h5 class="font-medium">${phase.phase}</h5>
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${phase.status === 'completed' ? 'bg-green-100 text-green-800' :
            phase.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
        }">
                    ${phase.status === 'completed' ? 'Tamamlandı' :
            phase.status === 'ongoing' ? 'Devam Ediyor' : 'Beklemede'}
                </span>
            </div>
            <p class="text-sm text-gray-600 mb-3">${phase.description}</p>
            ${phase.date ? `<p class="text-xs text-gray-500 mb-2">Tarih: ${formatDate(phase.date)}</p>` : ''}
            ${phase.images.length > 0 ? `
                <div class="flex space-x-2">
                    ${phase.images.map(img => `
                        <div class="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                            <i class="fas fa-image text-gray-400"></i>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
        </div>
    `).join('');

    // Set action buttons
    const isOngoing = project.status === 'ongoing';
    document.getElementById('project-action-buttons').innerHTML = `
        ${isOngoing ? `
            <button onclick="completeProject(${project.id})" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                <i class="fas fa-check mr-2"></i>Projeyi Tamamla
            </button>
        ` : ''}
        <button onclick="downloadProjectReport(${project.id})" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <i class="fas fa-download mr-2"></i>Rapor İndir
        </button>
        <button onclick="editProjectDetails(${project.id})" class="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
            <i class="fas fa-edit mr-2"></i>Düzenle
        </button>
    `;

    document.getElementById('project-details-modal').classList.remove('hidden');
    document.getElementById('project-details-modal').classList.add('flex');
}

function closeProjectDetailsModal() {
    document.getElementById('project-details-modal').classList.add('hidden');
    document.getElementById('project-details-modal').classList.remove('flex');
}

// Project Action Functions
let currentProjectAction = null;
let currentProjectId = null;

function completeProject(projectId) {
    const project = sampleData.projects.find(p => p.id == projectId);
    if (!project) {
        showNotification('Proje bulunamadı', 'error');
        return;
    }

    currentProjectAction = 'complete';
    currentProjectId = projectId;

    // Populate modal data
    document.getElementById('modal-project-id').textContent = `#${project.id}`;
    document.getElementById('modal-project-name').textContent = project.name;
    document.getElementById('modal-project-contractor').textContent = project.contractor;
    document.getElementById('modal-project-progress').textContent = `${project.progress || 0}%`;

    document.getElementById('complete-project-modal').classList.remove('hidden');
    document.getElementById('complete-project-modal').classList.add('flex');
}

function closeCompleteProjectModal() {
    document.getElementById('complete-project-modal').classList.add('hidden');
    document.getElementById('complete-project-modal').classList.remove('flex');

    // Clear form
    document.getElementById('completion-notes').value = '';
    currentProjectAction = null;
    currentProjectId = null;
}

function confirmCompleteProject() {
    if (!currentProjectId) {
        showNotification('Hata: Geçersiz proje', 'error');
        return;
    }

    const project = sampleData.projects.find(p => p.id == currentProjectId);
    if (project) {
        project.status = 'completed';
        project.progress = 100;
        project.completionDate = new Date().toISOString().split('T')[0];
        project.completionNotes = document.getElementById('completion-notes').value.trim();

        showNotification(`Proje #${currentProjectId} başarıyla tamamlandı`, 'success');
        loadProjects();

        // Close project details modal if open
        closeProjectDetailsModal();
    }

    closeCompleteProjectModal();
}

function confirmDeleteProject(projectId) {
    const project = sampleData.projects.find(p => p.id == projectId);
    if (!project) {
        showNotification('Proje bulunamadı', 'error');
        return;
    }

    currentProjectAction = 'delete';
    currentProjectId = projectId;

    // Populate modal data
    document.getElementById('modal-delete-project-id').textContent = `#${project.id}`;
    document.getElementById('modal-delete-project-name').textContent = project.name;
    document.getElementById('modal-delete-project-contractor').textContent = project.contractor;

    document.getElementById('delete-project-modal').classList.remove('hidden');
    document.getElementById('delete-project-modal').classList.add('flex');
}

function closeDeleteProjectModal() {
    document.getElementById('delete-project-modal').classList.add('hidden');
    document.getElementById('delete-project-modal').classList.remove('flex');

    currentProjectAction = null;
    currentProjectId = null;
}

function confirmDeleteProject() {
    if (!currentProjectId) {
        showNotification('Hata: Geçersiz proje', 'error');
        return;
    }

    const projectIndex = sampleData.projects.findIndex(p => p.id == currentProjectId);
    if (projectIndex !== -1) {
        sampleData.projects.splice(projectIndex, 1);
        showNotification(`Proje #${currentProjectId} başarıyla silindi`, 'success');
        loadProjects();
    }

    closeDeleteProjectModal();
}

// Additional helper functions
function getProjectTypeText(type) {
    const types = {
        'renovation': 'Tadilat',
        'reconstruction': 'Yeniden İnşa',
        'new_construction': 'Yeni İnşaat',
        'restoration': 'Restorasyon'
    };
    return types[type] || type;
}

function downloadProjectReport(projectId) {
    showNotification(`Proje #${projectId} raporu indiriliyor...`, 'info');
}

function editProjectDetails(projectId) {
    showNotification(`Proje #${projectId} düzenleme sayfasına yönlendiriliyor...`, 'info');
}

// Enhanced Legal Processes Management Functions
function applyLegalFilters() {
    loadContracts();
}

function applyLegalFiltersToData() {
    const searchTerm = document.getElementById('legal-search')?.value.toLowerCase() || '';
    const statusFilter = document.getElementById('legal-status-filter')?.value || '';
    const typeFilter = document.getElementById('contract-type-filter')?.value || '';
    const notaryFilter = document.getElementById('notary-filter')?.value || '';

    return sampleData.legalProcesses.contracts.filter(contract => {
        const matchesSearch = !searchTerm ||
            contract.id.toString().includes(searchTerm) ||
            contract.typeName.toLowerCase().includes(searchTerm) ||
            contract.parties.toLowerCase().includes(searchTerm) ||
            contract.projectName.toLowerCase().includes(searchTerm) ||
            contract.customerName.toLowerCase().includes(searchTerm) ||
            contract.contractorName.toLowerCase().includes(searchTerm);

        const matchesStatus = !statusFilter || contract.status === statusFilter;
        const matchesType = !typeFilter || contract.type === typeFilter;
        const matchesNotary = !notaryFilter || contract.notary === notaryFilter;

        return matchesSearch && matchesStatus && matchesType && matchesNotary;
    });
}

function clearLegalFilters() {
    document.getElementById('legal-search').value = '';
    document.getElementById('legal-status-filter').value = '';
    document.getElementById('contract-type-filter').value = '';
    document.getElementById('notary-filter').value = '';
    loadContracts();
}

function exportLegalProcesses() {
    const filteredContracts = applyLegalFiltersToData();
    const csvContent = "data:text/csv;charset=utf-8," +
        "Süreç ID,Sözleşme Türü,Taraflar,Noter,Durum,Tarih,Noter Ücreti,Ödeme Durumu\n" +
        filteredContracts.map(contract =>
            `${contract.id},"${contract.typeName}","${contract.parties}","${contract.notary}","${getLegalProcessStatusText(contract.status)}","${formatDate(contract.date)}","₺${contract.notaryFee}","${getPaymentStatusText(contract.paymentStatus)}"`
        ).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'hukuki_surecler.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showNotification('Hukuki süreçler CSV olarak dışa aktarıldı', 'success');
}

function updateLegalFilterCounts(filteredContracts) {
    const totalLegalCount = document.getElementById('total-legal-count');
    const filteredLegalCount = document.getElementById('filtered-legal-count');

    if (totalLegalCount) totalLegalCount.textContent = sampleData.legalProcesses.contracts.length;
    if (filteredLegalCount) filteredLegalCount.textContent = filteredContracts.length;
}

// Legal Process Details Modal Functions
function openLegalProcessDetailsModal(processId) {
    const contract = sampleData.legalProcesses.contracts.find(c => c.id == processId);
    if (!contract) {
        showNotification('Hukuki süreç bulunamadı', 'error');
        return;
    }

    // Populate basic process info
    document.getElementById('legal-process-basic-info').innerHTML = `
        <p><strong>Süreç ID:</strong> #${contract.id}</p>
        <p><strong>Sözleşme Türü:</strong> ${contract.typeName}</p>
        <p><strong>Proje:</strong> ${contract.projectName}</p>
        <p><strong>Durum:</strong> <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getLegalProcessStatusColor(contract.status)}">${getLegalProcessStatusText(contract.status)}</span></p>
        <p><strong>Başlangıç Tarihi:</strong> ${formatDate(contract.date)}</p>
        <p><strong>Belge Durumu:</strong> <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDocumentStatusColor(contract.documentStatus)}">${getDocumentStatusText(contract.documentStatus)}</span></p>
    `;

    // Populate parties info
    document.getElementById('legal-process-parties-info').innerHTML = `
        <p><strong>Müşteri:</strong> ${contract.customerName}</p>
        <p><strong>Müteahhit:</strong> ${contract.contractorName}</p>
        <p><strong>Taraflar:</strong> ${contract.parties}</p>
    `;

    // Populate payment info
    document.getElementById('legal-process-payment-info').innerHTML = `
        <p><strong>Noter Ücreti:</strong> ₺${contract.notaryFee.toLocaleString()}</p>
        <p><strong>Ödeme Durumu:</strong> <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(contract.paymentStatus)}">${getPaymentStatusText(contract.paymentStatus)}</span></p>
        ${contract.paymentStatus === 'pending' ? `
            <button onclick="approvePaymentSimulation(${contract.id})" class="mt-2 bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition-colors text-sm">
                <i class="fas fa-check mr-1"></i>Ödemeyi Onayla (Simülasyon)
            </button>
        ` : ''}
    `;

    // Populate notary info
    document.getElementById('legal-process-notary-info').innerHTML = `
        <p><strong>Noter:</strong> ${contract.notary}</p>
        <p><strong>Noter Adı:</strong> ${contract.notaryName}</p>
        <p><strong>Telefon:</strong> ${contract.notaryPhone}</p>
        <p><strong>E-posta:</strong> ${contract.notaryEmail}</p>
        <button onclick="openNotaryAppointmentModal(${contract.id})" class="mt-2 bg-purple-600 text-white px-3 py-1 rounded-lg hover:bg-purple-700 transition-colors text-sm">
            <i class="fas fa-calendar mr-1"></i>Randevu Takvimi
        </button>
    `;

    // Populate appointment info
    document.getElementById('legal-process-appointment-info').innerHTML = `
        <p><strong>Randevu Tarihi:</strong> ${contract.appointmentDate ? formatDateTime(contract.appointmentDate) : 'Henüz Belirlenmedi'}</p>
        <p><strong>Randevu Durumu:</strong> <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${contract.appointmentDate ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}">${contract.appointmentDate ? 'Planlandı' : 'Beklemede'}</span></p>
        <button onclick="createOrEditAppointment(${contract.id})" class="mt-2 bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors text-sm">
            <i class="fas fa-calendar-plus mr-1"></i>${contract.appointmentDate ? 'Randevu Düzenle' : 'Randevu Oluştur'}
        </button>
    `;

    // Populate documents
    const documents = contract.documents || [
        { name: 'Kimlik Fotokopisi.pdf', type: 'Kimlik', uploaded: '2024-01-15', status: 'approved', uploader: 'customer' },
        { name: 'Vergi Levhası.pdf', type: 'Vergi', uploaded: '2024-01-16', status: 'approved', uploader: 'contractor' },
        { name: 'Oda Sicil Belgesi.pdf', type: 'Sicil', uploaded: '', status: 'missing', uploader: 'contractor' },
        { name: 'İmza Sirküsü.pdf', type: 'İmza', uploaded: '2024-01-14', status: 'pending', uploader: 'customer' }
    ];

    document.getElementById('legal-process-documents').innerHTML = documents.map(doc => `
        <div class="flex items-center justify-between p-3 bg-white rounded border">
            <div class="flex items-center">
                <i class="fas ${doc.status === 'missing' ? 'fa-file-times text-red-500' : 'fa-file-pdf text-gray-600'} mr-2"></i>
                <div>
                    <p class="text-sm font-medium">${doc.name}</p>
                    <p class="text-xs text-gray-500">${doc.type} • ${doc.uploader === 'customer' ? 'Müşteri' : 'Müteahhit'} ${doc.uploaded ? '• ' + formatDate(doc.uploaded) : ''}</p>
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDocumentStatusColor(doc.status)}">
                        ${getDocumentStatusText(doc.status)}
                    </span>
                </div>
            </div>
            ${doc.status !== 'missing' ? `
                <div class="flex space-x-1">
                    <button onclick="viewDocument('${doc.name}')" class="text-blue-600 hover:text-blue-800 text-xs px-2 py-1 rounded bg-blue-50 hover:bg-blue-100">
                        Görüntüle
                    </button>
                    ${doc.status === 'pending' ? `
                        <button onclick="approveDocument('${doc.name}', ${contract.id})" class="text-green-600 hover:text-green-800 text-xs px-2 py-1 rounded bg-green-50 hover:bg-green-100">
                            Onayla
                        </button>
                    ` : ''}
                </div>
            ` : ''}
        </div>
    `).join('');

    // Populate messages
    const messages = contract.messages || [
        { sender: 'admin', message: 'Eksik belgeler hakkında bilgilendirme yapıldı.', time: '2024-01-16 14:30', type: 'info' },
        { sender: 'notary', message: 'Randevu takvimi güncellendi.', time: '2024-01-17 09:15', type: 'appointment' },
        { sender: 'admin', message: 'Ödeme durumu kontrol edildi.', time: '2024-01-18 11:45', type: 'payment' }
    ];

    document.getElementById('legal-process-messages').innerHTML = messages.map(msg => `
        <div class="flex items-start space-x-3 p-3 bg-white rounded border">
            <div class="flex-shrink-0">
                <div class="w-8 h-8 rounded-full ${msg.sender === 'admin' ? 'bg-purple-100' : msg.sender === 'notary' ? 'bg-blue-100' : 'bg-gray-100'} flex items-center justify-center">
                    <i class="fas ${msg.sender === 'admin' ? 'fa-user-shield text-purple-600' : msg.sender === 'notary' ? 'fa-gavel text-blue-600' : 'fa-user text-gray-600'} text-xs"></i>
                </div>
            </div>
            <div class="flex-1">
                <div class="flex items-center justify-between">
                    <p class="text-sm font-medium text-gray-900">${msg.sender === 'admin' ? 'Admin' : msg.sender === 'notary' ? 'Noter' : 'Sistem'}</p>
                    <p class="text-xs text-gray-500">${formatDateTime(msg.time)}</p>
                </div>
                <p class="text-sm text-gray-600 mt-1">${msg.message}</p>
            </div>
        </div>
    `).join('');

    // Populate contract type details
    document.getElementById('legal-process-contract-type').innerHTML = `
        <p><strong>Sözleşme Türü:</strong> ${contract.typeName}</p>
        <p><strong>Gerekli Belgeler:</strong> ${getRequiredDocumentsCount(contract.type)} adet</p>
        <p><strong>Tahmini Süre:</strong> ${getEstimatedDuration(contract.type)}</p>
        <p><strong>Noter Onayı:</strong> ${contract.status === 'completed' ? 'Tamamlandı' : 'Beklemede'}</p>
    `;

    // Set action buttons
    const canComplete = contract.status === 'active' && contract.documentStatus === 'approved' && contract.paymentStatus === 'paid';
    document.getElementById('legal-process-action-buttons').innerHTML = `
        ${canComplete ? `
            <button onclick="completeContract(${contract.id})" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                <i class="fas fa-check mr-2"></i>Süreci Tamamla
            </button>
        ` : ''}
        <button onclick="uploadNotarizedContract(${contract.id})" class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
            <i class="fas fa-upload mr-2"></i>Noter Onaylı Sözleşmeyi Yükle
        </button>
        <button onclick="downloadContractReport(${contract.id})" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <i class="fas fa-download mr-2"></i>Rapor İndir
        </button>
        <button onclick="openEditLegalProcessModal(${contract.id})" class="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
            <i class="fas fa-edit mr-2"></i>Düzenle
        </button>
    `;

    document.getElementById('legal-process-details-modal').classList.remove('hidden');
    document.getElementById('legal-process-details-modal').classList.add('flex');
}

function closeLegalProcessDetailsModal() {
    document.getElementById('legal-process-details-modal').classList.add('hidden');
    document.getElementById('legal-process-details-modal').classList.remove('flex');
}

// Edit Legal Process Modal Functions
let currentLegalProcessId = null;

function openEditLegalProcessModal(processId) {
    const contract = sampleData.legalProcesses.contracts.find(c => c.id == processId);
    if (!contract) {
        showNotification('Hukuki süreç bulunamadı', 'error');
        return;
    }

    currentLegalProcessId = processId;

    // Populate form fields
    document.getElementById('edit-process-status').value = contract.status;
    document.getElementById('edit-assigned-notary').value = contract.notary;
    document.getElementById('edit-appointment-date').value = contract.appointmentDate || '';
    document.getElementById('edit-notary-fee').value = contract.notaryFee;
    document.getElementById('edit-payment-status').value = contract.paymentStatus;
    document.getElementById('edit-document-status').value = contract.documentStatus;
    document.getElementById('edit-admin-notes').value = contract.adminNotes || '';

    document.getElementById('edit-legal-process-modal').classList.remove('hidden');
    document.getElementById('edit-legal-process-modal').classList.add('flex');
}

function closeEditLegalProcessModal() {
    document.getElementById('edit-legal-process-modal').classList.add('hidden');
    document.getElementById('edit-legal-process-modal').classList.remove('flex');

    // Clear form
    document.getElementById('edit-legal-process-form').reset();
    currentLegalProcessId = null;
}

function saveLegalProcessChanges(event) {
    event.preventDefault();

    if (!currentLegalProcessId) {
        showNotification('Hata: Geçersiz süreç', 'error');
        return;
    }

    const contract = sampleData.legalProcesses.contracts.find(c => c.id == currentLegalProcessId);
    if (contract) {
        contract.status = document.getElementById('edit-process-status').value;
        contract.notary = document.getElementById('edit-assigned-notary').value;
        contract.appointmentDate = document.getElementById('edit-appointment-date').value;
        contract.notaryFee = parseInt(document.getElementById('edit-notary-fee').value);
        contract.paymentStatus = document.getElementById('edit-payment-status').value;
        contract.documentStatus = document.getElementById('edit-document-status').value;
        contract.adminNotes = document.getElementById('edit-admin-notes').value.trim();

        showNotification(`Hukuki süreç #${currentLegalProcessId} başarıyla güncellendi`, 'success');
        loadContracts();

        // Close legal process details modal if open
        closeLegalProcessDetailsModal();
    }

    closeEditLegalProcessModal();
}

// Delete Legal Process Functions
function confirmDeleteLegalProcess(processId) {
    const contract = sampleData.legalProcesses.contracts.find(c => c.id == processId);
    if (!contract) {
        showNotification('Hukuki süreç bulunamadı', 'error');
        return;
    }

    currentLegalProcessId = processId;

    // Populate modal data
    document.getElementById('modal-delete-legal-process-id').textContent = `#${contract.id}`;
    document.getElementById('modal-delete-legal-process-type').textContent = contract.typeName;
    document.getElementById('modal-delete-legal-process-parties').textContent = contract.parties;

    document.getElementById('delete-legal-process-modal').classList.remove('hidden');
    document.getElementById('delete-legal-process-modal').classList.add('flex');
}

function closeDeleteLegalProcessModal() {
    document.getElementById('delete-legal-process-modal').classList.add('hidden');
    document.getElementById('delete-legal-process-modal').classList.remove('flex');

    currentLegalProcessId = null;
}

function confirmDeleteLegalProcess() {
    if (!currentLegalProcessId) {
        showNotification('Hata: Geçersiz süreç', 'error');
        return;
    }

    const contractIndex = sampleData.legalProcesses.contracts.findIndex(c => c.id == currentLegalProcessId);
    if (contractIndex !== -1) {
        sampleData.legalProcesses.contracts.splice(contractIndex, 1);
        showNotification(`Hukuki süreç #${currentLegalProcessId} başarıyla silindi`, 'success');
        loadContracts();
    }

    closeDeleteLegalProcessModal();
}

// Contract Type Selection Modal Functions
function viewContractTypeDetails() {
    const contract = sampleData.legalProcesses.contracts.find(c => c.id == currentLegalProcessId);
    if (!contract) return;

    openContractTypeSelectionModal(contract.type);
}

function openContractTypeSelectionModal(contractType) {
    const contractTypes = {
        'sale': {
            name: 'Satış Sözleşmesi',
            description: 'Gayrimenkul satış işlemleri için kullanılan sözleşme türü',
            requiredDocs: ['Kimlik Fotokopisi', 'Tapu Senedi', 'Vergi Levhası', 'İkametgah Belgesi'],
            template: 'Bu sözleşme [SATICI ADI] ile [ALICI ADI] arasında yapılmıştır...',
            duration: '15-20 gün',
            fee: '₺2,000 - ₺3,000'
        },
        'construction': {
            name: 'İnşaat Sözleşmesi',
            description: 'İnşaat ve tadilat projeleri için kullanılan sözleşme türü',
            requiredDocs: ['Kimlik Fotokopisi', 'Vergi Levhası', 'Oda Sicil Belgesi', 'İş Deneyim Belgesi'],
            template: 'Bu inşaat sözleşmesi [MÜTEAHHİT ADI] ile [MÜŞTERİ ADI] arasında yapılmıştır...',
            duration: '20-30 gün',
            fee: '₺2,500 - ₺4,000'
        },
        'lease': {
            name: 'Kira Sözleşmesi',
            description: 'Gayrimenkul kiralama işlemleri için kullanılan sözleşme türü',
            requiredDocs: ['Kimlik Fotokopisi', 'Tapu Senedi', 'Gelir Belgesi'],
            template: 'Bu kira sözleşmesi [KİRALAYAN] ile [KİRACI] arasında yapılmıştır...',
            duration: '10-15 gün',
            fee: '₺1,500 - ₺2,500'
        },
        'partnership': {
            name: 'Ortaklık Sözleşmesi',
            description: 'İş ortaklığı kurulması için kullanılan sözleşme türü',
            requiredDocs: ['Kimlik Fotokopisi', 'Vergi Levhası', 'İmza Sirküsü', 'Sermaye Belgesi'],
            template: 'Bu ortaklık sözleşmesi [ORTAK 1] ile [ORTAK 2] arasında yapılmıştır...',
            duration: '25-35 gün',
            fee: '₺2,000 - ₺3,500'
        }
    };

    const typeInfo = contractTypes[contractType] || contractTypes['sale'];

    // Populate contract type details
    document.getElementById('contract-type-details').innerHTML = `
        <p><strong>Sözleşme Adı:</strong> ${typeInfo.name}</p>
        <p><strong>Açıklama:</strong> ${typeInfo.description}</p>
        <p><strong>Tahmini Süre:</strong> ${typeInfo.duration}</p>
        <p><strong>Noter Ücreti:</strong> ${typeInfo.fee}</p>
    `;

    // Populate required documents
    document.getElementById('required-documents-list').innerHTML = typeInfo.requiredDocs.map(doc => `
        <div class="flex items-center">
            <i class="fas fa-file-alt text-gray-600 mr-2"></i>
            <span class="text-sm">${doc}</span>
        </div>
    `).join('');

    // Populate contract template
    document.getElementById('contract-template-preview').innerHTML = `
        <p class="text-sm text-gray-700 whitespace-pre-line">${typeInfo.template}</p>
    `;

    // Populate notary approval info
    document.getElementById('notary-approval-info').innerHTML = `
        <p><strong>Onay Süreci:</strong> Noter tarafından belge kontrolü</p>
        <p><strong>Gerekli Adımlar:</strong> Belge teslimi, randevu, imza</p>
        <p><strong>Teslim Şekli:</strong> Noter onaylı suret</p>
    `;

    document.getElementById('contract-type-selection-modal').classList.remove('hidden');
    document.getElementById('contract-type-selection-modal').classList.add('flex');
}

function closeContractTypeSelectionModal() {
    document.getElementById('contract-type-selection-modal').classList.add('hidden');
    document.getElementById('contract-type-selection-modal').classList.remove('flex');
}

// Additional helper functions for legal processes
function getLegalProcessTypeText(type) {
    const types = {
        'sale': 'Satış Sözleşmesi',
        'construction': 'İnşaat Sözleşmesi',
        'lease': 'Kira Sözleşmesi',
        'partnership': 'Ortaklık Sözleşmesi'
    };
    return types[type] || type;
}

function getLegalProcessStatusText(status) {
    const statuses = {
        'pending': 'Beklemede',
        'active': 'Aktif',
        'completed': 'Tamamlandı',
        'cancelled': 'İptal Edildi'
    };
    return statuses[status] || status;
}

function getLegalProcessStatusColor(status) {
    const colors = {
        'pending': 'bg-yellow-100 text-yellow-800',
        'active': 'bg-blue-100 text-blue-800',
        'completed': 'bg-green-100 text-green-800',
        'cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
}

function getPaymentStatusText(status) {
    const statuses = {
        'pending': 'Ödeme Bekliyor',
        'paid': 'Ödeme Yapıldı',
        'refunded': 'İade Edildi'
    };
    return statuses[status] || status;
}

function getPaymentStatusColor(status) {
    const colors = {
        'pending': 'bg-yellow-100 text-yellow-800',
        'paid': 'bg-green-100 text-green-800',
        'refunded': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
}

function getDocumentStatusColor(status) {
    const colors = {
        'missing': 'bg-red-100 text-red-800',
        'pending': 'bg-yellow-100 text-yellow-800',
        'approved': 'bg-green-100 text-green-800',
        'complete': 'bg-green-100 text-green-800',
        'incomplete': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
}

function getDocumentStatusText(status) {
    const statuses = {
        'missing': 'Eksik',
        'pending': 'Beklemede',
        'approved': 'Onaylandı',
        'complete': 'Tamamlandı',
        'incomplete': 'Eksik'
    };
    return statuses[status] || status;
}

function formatDateTime(dateTimeString) {
    if (!dateTimeString) return '';
    const date = new Date(dateTimeString);
    return date.toLocaleString('tr-TR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function getRequiredDocumentsCount(contractType) {
    const counts = {
        'sale': 4,
        'construction': 4,
        'lease': 3,
        'partnership': 4
    };
    return counts[contractType] || 3;
}

function getEstimatedDuration(contractType) {
    const durations = {
        'sale': '15-20 gün',
        'construction': '20-30 gün',
        'lease': '10-15 gün',
        'partnership': '25-35 gün'
    };
    return durations[contractType] || '15-20 gün';
}

// Action functions (placeholder implementations)
function sendMessageToNotary() {
    const message = document.getElementById('new-message-input').value.trim();
    if (message) {
        showNotification('Mesaj noterle paylaşıldı: ' + message, 'success');
        document.getElementById('new-message-input').value = '';
    }
}

function createOrEditAppointment(processId) {
    showNotification(`Süreç #${processId} için randevu oluşturma/düzenleme modalı açılıyor...`, 'info');
}

function openNotaryAppointmentModal(processId) {
    showNotification(`Süreç #${processId} için noter randevu takvimi açılıyor...`, 'info');
}

function approvePaymentSimulation(processId) {
    const contract = sampleData.legalProcesses.contracts.find(c => c.id == processId);
    if (contract) {
        contract.paymentStatus = 'paid';
        showNotification(`Süreç #${processId} için ödeme simülasyonu tamamlandı`, 'success');
        loadContracts();
        closeLegalProcessDetailsModal();
    }
}

function completeContract(processId) {
    const contract = sampleData.legalProcesses.contracts.find(c => c.id == processId);
    if (contract) {
        contract.status = 'completed';
        showNotification(`Süreç #${processId} başarıyla tamamlandı`, 'success');
        loadContracts();
        closeLegalProcessDetailsModal();
    }
}

function uploadNotarizedContract(processId) {
    showNotification(`Süreç #${processId} için noter onaylı sözleşme yükleme modalı açılıyor...`, 'info');
}

function downloadContractReport(processId) {
    showNotification(`Süreç #${processId} raporu indiriliyor...`, 'info');
}

function downloadContractTemplate() {
    showNotification('Sözleşme şablonu indiriliyor...', 'info');
}

// Enhanced Analytics Management Functions
let analyticsData = {
    userBehavior: {
        totalUsers: 2847,
        activeUsers: 1923,
        sessionDuration: 24, // minutes
        churnRate: 3.2, // percentage
        userGrowth: [120, 134, 145, 167, 189, 203, 234, 267, 289, 312, 345, 378, 421, 453, 487, 512, 548, 574, 601, 632, 667, 689, 723, 756, 789, 823, 856, 892, 923, 967], // last 30 days
        userActivity: {
            active: 67.5,
            inactive: 22.3,
            suspended: 10.2
        }
    },
    contentModeration: {
        totalContent: 5642,
        activeContent: 4956,
        blockedContent: 347,
        contentEngagement: 78.4, // percentage
        blockedTypes: {
            'Spam': 42,
            'Uygunsuz İçerik': 38,
            'Telif İhlali': 21,
            'Yanıltıcı Bilgi': 15,
            'Diğer': 12
        },
        topBlocked: [
            { type: 'Spam İlanlar', count: 128, percentage: 36.9 },
            { type: 'Fake Profiller', count: 89, percentage: 25.6 },
            { type: 'Uygunsuz Görseller', count: 67, percentage: 19.3 },
            { type: 'Yanıltıcı Fiyatlar', count: 35, percentage: 10.1 },
            { type: 'Telif İhlali', count: 28, percentage: 8.1 }
        ]
    },
    systemPerformance: {
        uptime: 99.9,
        responseTime: 120, // milliseconds
        errorRate: 0.1, // percentage
        healthScore: 95,
        uptimeDetails: {
            general: 99.9,
            api: 99.8,
            database: 100.0
        }
    }
};

let analyticsCharts = {};

// Load Analytics Section
function loadAnalyticsData() {
    updateAnalyticsData();
    initializeAnalyticsCharts();
}

function updateAnalyticsData() {
    const period = document.getElementById('analytics-time-period').value;
    const periodText = getPeriodText(period);

    // Update period texts
    document.querySelectorAll('[id$="-period"]').forEach(el => {
        el.textContent = periodText;
    });

    // Update user behavior stats
    document.getElementById('total-users-analytics').textContent = analyticsData.userBehavior.totalUsers.toLocaleString();
    document.getElementById('active-users-analytics').textContent = analyticsData.userBehavior.activeUsers.toLocaleString();
    document.getElementById('avg-session-duration').textContent = analyticsData.userBehavior.sessionDuration + 'dk';
    document.getElementById('churn-rate').textContent = analyticsData.userBehavior.churnRate + '%';

    // Update content moderation stats
    document.getElementById('total-content').textContent = analyticsData.contentModeration.totalContent.toLocaleString();
    document.getElementById('active-content').textContent = analyticsData.contentModeration.activeContent.toLocaleString();
    document.getElementById('blocked-content').textContent = analyticsData.contentModeration.blockedContent.toLocaleString();
    document.getElementById('avg-content-engagement').textContent = analyticsData.contentModeration.contentEngagement + '%';

    // Update system performance stats
    document.getElementById('system-uptime').textContent = analyticsData.systemPerformance.uptime + '%';
    document.getElementById('avg-response-time').textContent = analyticsData.systemPerformance.responseTime + 'ms';
    document.getElementById('system-error-rate').textContent = analyticsData.systemPerformance.errorRate + '%';
    document.getElementById('system-health-score').textContent = analyticsData.systemPerformance.healthScore;

    // Update blocked content table
    updateBlockedContentTable();

    // Update charts if they exist
    updateAnalyticsCharts();
}

function getPeriodText(period) {
    const periods = {
        '7d': 'son 7 gün',
        '30d': 'son 30 gün',
        '3m': 'son 3 ay',
        '1y': 'son 1 yıl'
    };
    return periods[period] || 'son 30 gün';
}

function updateBlockedContentTable() {
    const tableBody = document.getElementById('blocked-content-table');
    tableBody.innerHTML = analyticsData.contentModeration.topBlocked.map(item => `
        <tr>
            <td class="px-4 py-2 text-sm text-gray-900">${item.type}</td>
            <td class="px-4 py-2 text-sm text-gray-900">${item.count}</td>
            <td class="px-4 py-2 text-sm text-gray-900">%${item.percentage}</td>
        </tr>
    `).join('');
}

function refreshAnalyticsData() {
    // Simulate data refresh
    showNotification('Analitik verileri yenileniyor...', 'info');

    // Slightly modify data to show refresh
    analyticsData.userBehavior.totalUsers += Math.floor(Math.random() * 10);
    analyticsData.userBehavior.activeUsers += Math.floor(Math.random() * 5);
    analyticsData.contentModeration.totalContent += Math.floor(Math.random() * 20);

    setTimeout(() => {
        updateAnalyticsData();
        showNotification('Analitik verileri güncellendi', 'success');
    }, 1000);
}

// Chart Initialization and Updates
function initializeAnalyticsCharts() {
    initializeUserGrowthChart();
    initializeUserActivityChart();
    initializeBlockedContentChart();
    initializeSystemHealthChart();
}

function initializeUserGrowthChart() {
    const ctx = document.getElementById('user-growth-chart').getContext('2d');

    analyticsCharts.userGrowth = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: 30 }, (_, i) => `${30 - i} gün önce`),
            datasets: [{
                label: 'Toplam Kullanıcı',
                data: analyticsData.userBehavior.userGrowth,
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

function initializeUserActivityChart() {
    const ctx = document.getElementById('user-activity-chart').getContext('2d');

    analyticsCharts.userActivity = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Aktif', 'Pasif', 'Askıda'],
            datasets: [{
                data: [
                    analyticsData.userBehavior.userActivity.active,
                    analyticsData.userBehavior.userActivity.inactive,
                    analyticsData.userBehavior.userActivity.suspended
                ],
                backgroundColor: [
                    'rgb(34, 197, 94)',
                    'rgb(156, 163, 175)',
                    'rgb(239, 68, 68)'
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function initializeBlockedContentChart() {
    const ctx = document.getElementById('blocked-content-chart').getContext('2d');

    analyticsCharts.blockedContent = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(analyticsData.contentModeration.blockedTypes),
            datasets: [{
                label: 'Engellenen İçerik',
                data: Object.values(analyticsData.contentModeration.blockedTypes),
                backgroundColor: [
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(139, 69, 19, 0.8)',
                    'rgba(156, 163, 175, 0.8)'
                ],
                borderColor: [
                    'rgb(239, 68, 68)',
                    'rgb(245, 158, 11)',
                    'rgb(59, 130, 246)',
                    'rgb(139, 69, 19)',
                    'rgb(156, 163, 175)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

function initializeSystemHealthChart() {
    const ctx = document.getElementById('system-health-chart').getContext('2d');

    analyticsCharts.systemHealth = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Sağlık Skoru', 'Kalan'],
            datasets: [{
                data: [analyticsData.systemPerformance.healthScore, 100 - analyticsData.systemPerformance.healthScore],
                backgroundColor: [
                    'rgb(34, 197, 94)',
                    'rgb(229, 231, 235)'
                ],
                borderWidth: 0,
                circumference: 180,
                rotation: 270
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '80%',
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                }
            }
        },
        plugins: [{
            afterDraw: function (chart) {
                var width = chart.width,
                    height = chart.height,
                    ctx = chart.ctx;

                ctx.restore();
                var fontSize = (height / 114).toFixed(2);
                ctx.font = fontSize + "em sans-serif";
                ctx.textBaseline = "middle";
                ctx.fillStyle = "#1f2937";

                var text = analyticsData.systemPerformance.healthScore,
                    textX = Math.round((width - ctx.measureText(text).width) / 2),
                    textY = height / 2;

                ctx.fillText(text, textX, textY);
                ctx.save();
            }
        }]
    });
}

function updateAnalyticsCharts() {
    // Update all charts with new data
    if (analyticsCharts.userGrowth) {
        analyticsCharts.userGrowth.data.datasets[0].data = analyticsData.userBehavior.userGrowth;
        analyticsCharts.userGrowth.update('none');
    }

    if (analyticsCharts.userActivity) {
        analyticsCharts.userActivity.data.datasets[0].data = [
            analyticsData.userBehavior.userActivity.active,
            analyticsData.userBehavior.userActivity.inactive,
            analyticsData.userBehavior.userActivity.suspended
        ];
        analyticsCharts.userActivity.update('none');
    }

    if (analyticsCharts.blockedContent) {
        analyticsCharts.blockedContent.data.datasets[0].data = Object.values(analyticsData.contentModeration.blockedTypes);
        analyticsCharts.blockedContent.update('none');
    }

    if (analyticsCharts.systemHealth) {
        analyticsCharts.systemHealth.data.datasets[0].data = [
            analyticsData.systemPerformance.healthScore,
            100 - analyticsData.systemPerformance.healthScore
        ];
        analyticsCharts.systemHealth.update('none');
    }
}

// Analytics Detail Modal Functions
let currentAnalyticsMetric = null;

function openAnalyticsDetailModal(metricType) {
    currentAnalyticsMetric = metricType;

    const modalTitle = document.getElementById('analytics-modal-title');
    const metricSummary = document.getElementById('analytics-metric-summary');
    const timeComparison = document.getElementById('analytics-time-comparison');
    const statistics = document.getElementById('analytics-statistics');

    // Set modal title and content based on metric type
    const metricInfo = getMetricInfo(metricType);
    modalTitle.textContent = metricInfo.title;

    // Populate metric summary
    metricSummary.innerHTML = `
        <div class="flex items-center justify-between p-3 bg-white rounded border">
            <div>
                <p class="text-sm font-medium text-gray-600">${metricInfo.label}</p>
                <p class="text-2xl font-bold text-gray-900">${metricInfo.value}</p>
            </div>
            <div class="text-right">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${metricInfo.changeColor}">
                    ${metricInfo.change}
                </span>
                <p class="text-xs text-gray-500 mt-1">${metricInfo.period}</p>
            </div>
        </div>
        <div class="text-sm text-gray-600">
            <p><strong>Açıklama:</strong> ${metricInfo.description}</p>
        </div>
    `;

    // Populate time comparison
    timeComparison.innerHTML = `
        <div class="space-y-2">
            <div class="flex justify-between">
                <span class="text-sm text-gray-600">Son 7 gün:</span>
                <span class="text-sm font-medium">${metricInfo.comparisons['7d']}</span>
            </div>
            <div class="flex justify-between">
                <span class="text-sm text-gray-600">Son 30 gün:</span>
                <span class="text-sm font-medium">${metricInfo.comparisons['30d']}</span>
            </div>
            <div class="flex justify-between">
                <span class="text-sm text-gray-600">Son 3 ay:</span>
                <span class="text-sm font-medium">${metricInfo.comparisons['3m']}</span>
            </div>
        </div>
    `;

    // Populate statistics
    statistics.innerHTML = `
        <div class="space-y-2">
            <div class="flex justify-between">
                <span class="text-sm text-gray-600">Minimum:</span>
                <span class="text-sm font-medium">${metricInfo.stats.min}</span>
            </div>
            <div class="flex justify-between">
                <span class="text-sm text-gray-600">Maksimum:</span>
                <span class="text-sm font-medium">${metricInfo.stats.max}</span>
            </div>
            <div class="flex justify-between">
                <span class="text-sm text-gray-600">Ortalama:</span>
                <span class="text-sm font-medium">${metricInfo.stats.avg}</span>
            </div>
            <div class="flex justify-between">
                <span class="text-sm text-gray-600">Trend:</span>
                <span class="text-sm font-medium ${metricInfo.stats.trendColor}">${metricInfo.stats.trend}</span>
            </div>
        </div>
    `;

    // Initialize detail chart
    initializeDetailChart(metricType);

    document.getElementById('analytics-detail-modal').classList.remove('hidden');
    document.getElementById('analytics-detail-modal').classList.add('flex');
}

function closeAnalyticsDetailModal() {
    document.getElementById('analytics-detail-modal').classList.add('hidden');
    document.getElementById('analytics-detail-modal').classList.remove('flex');

    // Destroy detail chart if exists
    if (analyticsCharts.detail) {
        analyticsCharts.detail.destroy();
        analyticsCharts.detail = null;
    }

    currentAnalyticsMetric = null;
}

function getMetricInfo(metricType) {
    const metricData = {
        'total-users': {
            title: 'Toplam Kullanıcı Detayları',
            label: 'Toplam Kullanıcı Sayısı',
            value: analyticsData.userBehavior.totalUsers.toLocaleString(),
            change: '↑ 10%',
            changeColor: 'bg-green-100 text-green-800',
            period: 'son 30 gün',
            description: 'Platformda kayıtlı toplam kullanıcı sayısı',
            comparisons: {
                '7d': '2,823',
                '30d': '2,847',
                '3m': '2,901'
            },
            stats: {
                min: '2,145',
                max: '2,901',
                avg: '2,523',
                trend: 'Yükseliş',
                trendColor: 'text-green-600'
            }
        },
        'active-users': {
            title: 'Aktif Kullanıcı Detayları',
            label: 'Aktif Kullanıcı Sayısı',
            value: analyticsData.userBehavior.activeUsers.toLocaleString(),
            change: '↑ 15%',
            changeColor: 'bg-green-100 text-green-800',
            period: 'son 30 gün',
            description: 'Son 30 gün içinde platform üzerinde aktif olan kullanıcılar',
            comparisons: {
                '7d': '1,856',
                '30d': '1,923',
                '3m': '1,978'
            },
            stats: {
                min: '1,234',
                max: '1,978',
                avg: '1,675',
                trend: 'Güçlü Yükseliş',
                trendColor: 'text-green-600'
            }
        },
        'session-duration': {
            title: 'Oturum Süresi Detayları',
            label: 'Ortalama Oturum Süresi',
            value: analyticsData.userBehavior.sessionDuration + ' dakika',
            change: '↑ 20%',
            changeColor: 'bg-green-100 text-green-800',
            period: 'son 30 gün',
            description: 'Kullanıcıların platformda geçirdiği ortalama süre',
            comparisons: {
                '7d': '23 dk',
                '30d': '24 dk',
                '3m': '26 dk'
            },
            stats: {
                min: '18 dk',
                max: '32 dk',
                avg: '24 dk',
                trend: 'Kararlı Artış',
                trendColor: 'text-green-600'
            }
        },
        'churn-rate': {
            title: 'Çıkış Oranı Detayları',
            label: 'Kullanıcı Çıkış Oranı',
            value: analyticsData.userBehavior.churnRate + '%',
            change: '↑ 3%',
            changeColor: 'bg-red-100 text-red-800',
            period: 'son 30 gün',
            description: 'Platformu terk eden kullanıcıların oranı',
            comparisons: {
                '7d': '2.8%',
                '30d': '3.2%',
                '3m': '3.7%'
            },
            stats: {
                min: '2.1%',
                max: '4.2%',
                avg: '3.1%',
                trend: 'Hafif Artış',
                trendColor: 'text-red-600'
            }
        },
        'total-content': {
            title: 'Toplam İçerik Detayları',
            label: 'Toplam İçerik Sayısı',
            value: analyticsData.contentModeration.totalContent.toLocaleString(),
            change: '↑ 12%',
            changeColor: 'bg-green-100 text-green-800',
            period: 'son 30 gün',
            description: 'Platformda yer alan toplam içerik sayısı',
            comparisons: {
                '7d': '5,587',
                '30d': '5,642',
                '3m': '5,891'
            },
            stats: {
                min: '4,892',
                max: '5,891',
                avg: '5,342',
                trend: 'Yükseliş',
                trendColor: 'text-green-600'
            }
        },
        'active-content': {
            title: 'Aktif İçerik Detayları',
            label: 'Aktif İçerik Sayısı',
            value: analyticsData.contentModeration.activeContent.toLocaleString(),
            change: '↑ 8%',
            changeColor: 'bg-green-100 text-green-800',
            period: 'son 30 gün',
            description: 'Onaylanmış ve yayında olan içerik sayısı',
            comparisons: {
                '7d': '4,923',
                '30d': '4,956',
                '3m': '5,234'
            },
            stats: {
                min: '4,234',
                max: '5,234',
                avg: '4,782',
                trend: 'Kararlı Artış',
                trendColor: 'text-green-600'
            }
        },
        'blocked-content': {
            title: 'Engellenen İçerik Detayları',
            label: 'Engellenen İçerik Sayısı',
            value: analyticsData.contentModeration.blockedContent.toLocaleString(),
            change: '↑ 5%',
            changeColor: 'bg-orange-100 text-orange-800',
            period: 'son 30 gün',
            description: 'Politika ihlali nedeniyle engellenen içerik sayısı',
            comparisons: {
                '7d': '334',
                '30d': '347',
                '3m': '389'
            },
            stats: {
                min: '234',
                max: '456',
                avg: '312',
                trend: 'Kontrollü Artış',
                trendColor: 'text-orange-600'
            }
        },
        'content-engagement': {
            title: 'İçerik Etkileşim Detayları',
            label: 'Ortalama Etkileşim Oranı',
            value: analyticsData.contentModeration.contentEngagement + '%',
            change: '↑ 18%',
            changeColor: 'bg-green-100 text-green-800',
            period: 'son 30 gün',
            description: 'İçeriklerin aldığı ortalama etkileşim oranı',
            comparisons: {
                '7d': '76.2%',
                '30d': '78.4%',
                '3m': '81.7%'
            },
            stats: {
                min: '65.3%',
                max: '84.2%',
                avg: '76.8%',
                trend: 'Güçlü Yükseliş',
                trendColor: 'text-green-600'
            }
        },
        'uptime': {
            title: 'Sistem Uptime Detayları',
            label: 'Sistem Uptime',
            value: analyticsData.systemPerformance.uptime + '%',
            change: 'Mükemmel',
            changeColor: 'bg-green-100 text-green-800',
            period: 'son 30 gün',
            description: 'Sistemin kesintisiz çalışma oranı',
            comparisons: {
                '7d': '99.8%',
                '30d': '99.9%',
                '3m': '99.7%'
            },
            stats: {
                min: '99.1%',
                max: '100%',
                avg: '99.6%',
                trend: 'Mükemmel',
                trendColor: 'text-green-600'
            }
        },
        'response-time': {
            title: 'Yanıt Süresi Detayları',
            label: 'Ortalama Yanıt Süresi',
            value: analyticsData.systemPerformance.responseTime + 'ms',
            change: '↓ 5%',
            changeColor: 'bg-green-100 text-green-800',
            period: 'son 30 gün',
            description: 'API isteklerine verilen ortalama yanıt süresi',
            comparisons: {
                '7d': '118ms',
                '30d': '120ms',
                '3m': '134ms'
            },
            stats: {
                min: '95ms',
                max: '187ms',
                avg: '125ms',
                trend: 'İyileşme',
                trendColor: 'text-green-600'
            }
        },
        'error-rate': {
            title: 'Hata Oranı Detayları',
            label: 'Sistem Hata Oranı',
            value: analyticsData.systemPerformance.errorRate + '%',
            change: '↑ 0.05%',
            changeColor: 'bg-red-100 text-red-800',
            period: 'son 30 gün',
            description: 'Sistem hatalarının toplam isteklere oranı',
            comparisons: {
                '7d': '0.08%',
                '30d': '0.1%',
                '3m': '0.15%'
            },
            stats: {
                min: '0.02%',
                max: '0.23%',
                avg: '0.12%',
                trend: 'Çok Düşük',
                trendColor: 'text-green-600'
            }
        },
        'health-score': {
            title: 'Sistem Sağlık Skoru Detayları',
            label: 'Genel Sağlık Skoru',
            value: analyticsData.systemPerformance.healthScore,
            change: 'Çok İyi',
            changeColor: 'bg-green-100 text-green-800',
            period: 'mevcut durum',
            description: 'Sistemin genel performans ve sağlık durumu',
            comparisons: {
                '7d': '94',
                '30d': '95',
                '3m': '93'
            },
            stats: {
                min: '87',
                max: '98',
                avg: '94',
                trend: 'Çok İyi',
                trendColor: 'text-green-600'
            }
        }
    };

    return metricData[metricType] || metricData['total-users'];
}

function initializeDetailChart(metricType) {
    const ctx = document.getElementById('analytics-detail-chart').getContext('2d');

    // Destroy existing chart if any
    if (analyticsCharts.detail) {
        analyticsCharts.detail.destroy();
    }

    // Generate sample data based on metric type
    const chartData = generateDetailChartData(metricType);

    analyticsCharts.detail = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: chartData.type !== 'doughnut' ? {
                y: {
                    beginAtZero: true
                }
            } : {},
            plugins: {
                legend: {
                    display: chartData.type === 'doughnut'
                }
            }
        }
    });
}

function generateDetailChartData(metricType) {
    const labels = Array.from({ length: 30 }, (_, i) => `${30 - i} gün`);

    switch (metricType) {
        case 'total-users':
        case 'active-users':
            return {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Kullanıcı Sayısı',
                        data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100) + 1800),
                        borderColor: 'rgb(59, 130, 246)',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4
                    }]
                }
            };
        case 'session-duration':
            return {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Oturum Süresi (dk)',
                        data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 15) + 18),
                        backgroundColor: 'rgba(168, 85, 247, 0.8)',
                        borderColor: 'rgb(168, 85, 247)',
                        borderWidth: 1
                    }]
                }
            };
        case 'churn-rate':
            return {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Çıkış Oranı (%)',
                        data: Array.from({ length: 30 }, () => (Math.random() * 2 + 2).toFixed(1)),
                        borderColor: 'rgb(239, 68, 68)',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4
                    }]
                }
            };
        case 'uptime':
        case 'health-score':
            return {
                type: 'doughnut',
                data: {
                    labels: ['Başarılı', 'Hatalı'],
                    datasets: [{
                        data: [95, 5],
                        backgroundColor: [
                            'rgb(34, 197, 94)',
                            'rgb(239, 68, 68)'
                        ],
                        borderWidth: 2
                    }]
                }
            };
        default:
            return {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Değer',
                        data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 1000) + 500),
                        backgroundColor: 'rgba(34, 197, 94, 0.8)',
                        borderColor: 'rgb(34, 197, 94)',
                        borderWidth: 1
                    }]
                }
            };
    }
}

function exportAnalyticsData() {
    if (!currentAnalyticsMetric) return;

    const metricInfo = getMetricInfo(currentAnalyticsMetric);
    const csvContent = "data:text/csv;charset=utf-8," +
        "Metrik,Değer,Değişim,Dönem\n" +
        `"${metricInfo.label}","${metricInfo.value}","${metricInfo.change}","${metricInfo.period}"\n` +
        "Karşılaştırma,7 Gün,30 Gün,3 Ay\n" +
        `"Değerler","${metricInfo.comparisons['7d']}","${metricInfo.comparisons['30d']}","${metricInfo.comparisons['3m']}"`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `analitik_${currentAnalyticsMetric}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showNotification('Analitik verileri CSV olarak dışa aktarıldı', 'success');
}

// Enhanced Marketing Management Functions
let marketingData = {
    metrics: {
        cac: 250,
        cltv: 2500,
        marketingSpend: 15000,
        conversionRate: 4.8,
        siteTraffic: 12456
    },
    campaigns: [
        {
            id: 'C001',
            name: 'Kentsel Dönüşüm Farkındalık',
            platform: 'Google Ads',
            budget: 5000,
            spent: 3200,
            startDate: '2024-01-15',
            endDate: '2024-02-15',
            status: 'Aktif',
            type: 'Farkındalık',
            kpi: 'Tıklama',
            target: 1000,
            current: 856,
            impressions: 45230,
            clicks: 1876,
            conversions: 89,
            ctr: 4.15
        },
        {
            id: 'C002',
            name: 'Arsa Değerlendirme Lead',
            platform: 'Facebook',
            budget: 3000,
            spent: 2850,
            startDate: '2024-01-20',
            endDate: '2024-02-20',
            status: 'Aktif',
            type: 'Dönüşüm',
            kpi: 'Lead',
            target: 50,
            current: 42,
            impressions: 28450,
            clicks: 1234,
            conversions: 42,
            ctr: 4.34
        },
        {
            id: 'C003',
            name: 'Mimari Hizmetler Retargeting',
            platform: 'Instagram',
            budget: 2000,
            spent: 1950,
            startDate: '2024-01-10',
            endDate: '2024-02-10',
            status: 'Tamamlandı',
            type: 'Retargeting',
            kpi: 'Dönüşüm',
            target: 25,
            current: 28,
            impressions: 18750,
            clicks: 945,
            conversions: 28,
            ctr: 5.04
        },
        {
            id: 'C004',
            name: 'İşbirliği Fırsatları Email',
            platform: 'Email',
            budget: 1500,
            spent: 890,
            startDate: '2024-02-01',
            endDate: '2024-03-01',
            status: 'Duraklatıldı',
            type: 'Marka',
            kpi: 'İzlenim',
            target: 5000,
            current: 3200,
            impressions: 3200,
            clicks: 312,
            conversions: 15,
            ctr: 9.75
        },
        {
            id: 'C005',
            name: 'SEO İçerik Pazarlama',
            platform: 'SEO',
            budget: 4000,
            spent: 2100,
            startDate: '2024-01-01',
            endDate: '2024-04-01',
            status: 'Aktif',
            type: 'Trafik',
            kpi: 'Tıklama',
            target: 2000,
            current: 1456,
            impressions: 67890,
            clicks: 2134,
            conversions: 98,
            ctr: 3.14
        }
    ],
    inquiries: [
        {
            id: 'INQ001',
            customer: 'Ahmet Yılmaz',
            email: 'ahmet.yilmaz@email.com',
            phone: '+90 532 123 4567',
            subject: 'Kentsel Dönüşüm Projesi',
            type: 'Kentsel Dönüşüm',
            priority: 'Yüksek',
            status: 'Yeni',
            date: '2024-01-25',
            message: 'Beşiktaş bölgesinde kentsel dönüşüm projesi için bilgi almak istiyorum.',
            source: 'Google Ads',
            responses: []
        },
        {
            id: 'INQ002',
            customer: 'Fatma Demir',
            email: 'fatma.demir@email.com',
            phone: '+90 533 234 5678',
            subject: 'Arsa Değerlendirme Talebi',
            type: 'Arsa Değerlendirme',
            priority: 'Orta',
            status: 'İnceleniyor',
            date: '2024-01-24',
            message: 'Kadıköy bölgesindeki arsamın değerlendirmesini yaptırmak istiyorum.',
            source: 'Facebook',
            responses: [
                {
                    date: '2024-01-25',
                    message: 'Merhaba Fatma Hanım, talebiniz uzmanlarımız tarafından değerlendiriliyor.',
                    sender: 'admin'
                }
            ]
        },
        {
            id: 'INQ003',
            customer: 'Mehmet Kaya',
            email: 'mehmet.kaya@email.com',
            phone: '+90 534 345 6789',
            subject: 'Mimari Hizmet İşbirliği',
            type: 'İşbirliği',
            priority: 'Yüksek',
            status: 'Yanıtlandı',
            date: '2024-01-23',
            message: 'Mimarlık büromuz ile işbirliği imkanları hakkında görüşmek istiyorum.',
            source: 'LinkedIn',
            responses: [
                {
                    date: '2024-01-24',
                    message: 'Merhaba Mehmet Bey, işbirliği teklifiniz için teşekkürler. Detaylı görüşme için randevu alalım.',
                    sender: 'admin'
                }
            ]
        },
        {
            id: 'INQ004',
            customer: 'Ayşe Özkan',
            email: 'ayse.ozkan@email.com',
            phone: '+90 535 456 7890',
            subject: 'Proje Danışmanlığı',
            type: 'Proje Önerisi',
            priority: 'Düşük',
            status: 'Kapatıldı',
            date: '2024-01-22',
            message: 'Ev renovasyon projem için danışmanlık hizmeti almak istiyorum.',
            source: 'Website',
            responses: [
                {
                    date: '2024-01-23',
                    message: 'Merhaba Ayşe Hanım, proje danışmanlığı hizmetimiz hakkında bilgi gönderildi.',
                    sender: 'admin'
                }
            ]
        }
    ],
    inquiryDistribution: {
        'Kentsel Dönüşüm': 45,
        'Arsa Değerlendirme': 28,
        'Mimari Hizmet': 18,
        'İşbirliği': 9
    },
    cacTrend: [280, 265, 270, 255, 248, 250, 245, 252, 250, 248, 255, 250, 248, 250]
};

let marketingCharts = {};
let currentMarketingMetric = null;
let currentCampaignId = null;
let currentInquiryId = null;

// Load Marketing Data
function loadMarketingData() {
    updateMarketingMetrics();
    loadCampaigns();
    loadMarketingInquiries();
    initializeMarketingCharts();
}

function updateMarketingMetrics() {
    document.getElementById('cac-value').textContent = '₺' + marketingData.metrics.cac;
    document.getElementById('cltv-value').textContent = '₺' + marketingData.metrics.cltv;
    document.getElementById('marketing-spend').textContent = '₺' + marketingData.metrics.marketingSpend.toLocaleString();
    document.getElementById('conversion-rate').textContent = marketingData.metrics.conversionRate + '%';
    document.getElementById('site-traffic').textContent = marketingData.metrics.siteTraffic.toLocaleString();
}

// Campaign Management
function loadCampaigns() {
    const filteredCampaigns = applyCampaignFiltersToData();
    updateCampaignCount(filteredCampaigns.length);
    renderCampaignTable(filteredCampaigns);
}

function applyCampaignFiltersToData() {
    let filteredData = [...marketingData.campaigns];

    const platformFilter = document.getElementById('campaign-platform-filter')?.value;
    const statusFilter = document.getElementById('campaign-status-filter')?.value;

    if (platformFilter) {
        filteredData = filteredData.filter(campaign => campaign.platform === platformFilter);
    }

    if (statusFilter) {
        filteredData = filteredData.filter(campaign => campaign.status === statusFilter);
    }

    return filteredData;
}

function renderCampaignTable(campaigns) {
    const tableBody = document.getElementById('campaign-list');

    if (campaigns.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" class="px-6 py-8 text-center text-gray-500">
                    <i class="fas fa-inbox text-4xl mb-2 block"></i>
                    <p>Henüz kampanya bulunmuyor</p>
                </td>
            </tr>
        `;
        return;
    }

    tableBody.innerHTML = campaigns.map(campaign => `
        <tr class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="font-medium text-gray-900">${campaign.name}</div>
                <div class="text-sm text-gray-500">${campaign.type}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPlatformColor(campaign.platform)}">
                    ${campaign.platform}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">₺${campaign.budget.toLocaleString()}</div>
                <div class="text-xs text-gray-500">Harcanan: ₺${campaign.spent.toLocaleString()}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${formatDate(campaign.startDate)}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${formatDate(campaign.endDate)}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCampaignStatusColor(campaign.status)}">
                    ${campaign.status}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                <button onclick="openCampaignPerformanceModal('${campaign.id}')" class="text-blue-600 hover:text-blue-900" title="Performans">
                    <i class="fas fa-chart-line"></i>
                </button>
                <button onclick="editCampaign('${campaign.id}')" class="text-indigo-600 hover:text-indigo-900" title="Düzenle">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="toggleCampaign('${campaign.id}')" class="text-${campaign.status === 'Aktif' ? 'yellow' : 'green'}-600 hover:text-${campaign.status === 'Aktif' ? 'yellow' : 'green'}-900" title="${campaign.status === 'Aktif' ? 'Duraklat' : 'Başlat'}">
                    <i class="fas fa-${campaign.status === 'Aktif' ? 'pause' : 'play'}"></i>
                </button>
                <button onclick="deleteCampaign('${campaign.id}')" class="text-red-600 hover:text-red-900" title="Sil">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function updateCampaignCount(count) {
    const countElement = document.getElementById('campaign-count');
    if (countElement) {
        countElement.textContent = count;
    }
}

function getPlatformColor(platform) {
    const colors = {
        'Google Ads': 'bg-red-100 text-red-800',
        'Facebook': 'bg-blue-100 text-blue-800',
        'Instagram': 'bg-pink-100 text-pink-800',
        'LinkedIn': 'bg-blue-100 text-blue-800',
        'Email': 'bg-green-100 text-green-800',
        'SEO': 'bg-purple-100 text-purple-800'
    };
    return colors[platform] || 'bg-gray-100 text-gray-800';
}

function getCampaignStatusColor(status) {
    const colors = {
        'Aktif': 'bg-green-100 text-green-800',
        'Duraklatıldı': 'bg-yellow-100 text-yellow-800',
        'Tamamlandı': 'bg-blue-100 text-blue-800',
        'Taslak': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
}

// Marketing Inquiries Management
function loadMarketingInquiries() {
    const filteredInquiries = applyInquiryFiltersToData();
    updateInquiryCount(filteredInquiries.length);
    renderInquiryTable(filteredInquiries);
}

function applyInquiryFiltersToData() {
    let filteredData = [...marketingData.inquiries];

    const typeFilter = document.getElementById('inquiry-type-filter')?.value;
    const statusFilter = document.getElementById('inquiry-status-filter')?.value;
    const priorityFilter = document.getElementById('inquiry-priority-filter')?.value;

    if (typeFilter) {
        filteredData = filteredData.filter(inquiry => inquiry.type === typeFilter);
    }

    if (statusFilter) {
        filteredData = filteredData.filter(inquiry => inquiry.status === statusFilter);
    }

    if (priorityFilter) {
        filteredData = filteredData.filter(inquiry => inquiry.priority === priorityFilter);
    }

    return filteredData;
}

function renderInquiryTable(inquiries) {
    const tableBody = document.getElementById('inquiry-list');

    if (inquiries.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="8" class="px-6 py-8 text-center text-gray-500">
                    <i class="fas fa-inbox text-4xl mb-2 block"></i>
                    <p>Henüz müşteri talebi bulunmuyor</p>
                </td>
            </tr>
        `;
        return;
    }

    tableBody.innerHTML = inquiries.map(inquiry => `
        <tr class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="font-medium text-gray-900">${inquiry.id}</div>
                <div class="text-xs text-gray-500">${inquiry.source}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">${inquiry.customer}</div>
                <div class="text-xs text-gray-500">${inquiry.email}</div>
            </td>
            <td class="px-6 py-4">
                <div class="text-sm text-gray-900 max-w-xs truncate" title="${inquiry.subject}">
                    ${inquiry.subject}
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getInquiryTypeColor(inquiry.type)}">
                    ${inquiry.type}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(inquiry.priority)}">
                    ${inquiry.priority}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getInquiryStatusColor(inquiry.status)}">
                    ${inquiry.status}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${formatDate(inquiry.date)}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                <button onclick="openMarketingInquiryModal('${inquiry.id}')" class="text-blue-600 hover:text-blue-900" title="Görüntüle">
                    <i class="fas fa-eye"></i>
                </button>
                <button onclick="respondToInquiry('${inquiry.id}')" class="text-green-600 hover:text-green-900" title="Yanıtla">
                    <i class="fas fa-reply"></i>
                </button>
                <button onclick="updateInquiryStatus('${inquiry.id}')" class="text-purple-600 hover:text-purple-900" title="Durum Güncelle">
                    <i class="fas fa-edit"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function updateInquiryCount(count) {
    const countElement = document.getElementById('inquiry-count');
    if (countElement) {
        countElement.textContent = count;
    }
}

function getInquiryTypeColor(type) {
    const colors = {
        'Kentsel Dönüşüm': 'bg-blue-100 text-blue-800',
        'Arsa Değerlendirme': 'bg-green-100 text-green-800',
        'Mimari Hizmet': 'bg-purple-100 text-purple-800',
        'İşbirliği': 'bg-orange-100 text-orange-800',
        'Proje Önerisi': 'bg-indigo-100 text-indigo-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
}

function getInquiryStatusColor(status) {
    const colors = {
        'Yeni': 'bg-yellow-100 text-yellow-800',
        'İnceleniyor': 'bg-blue-100 text-blue-800',
        'Yanıtlandı': 'bg-green-100 text-green-800',
        'Kapatıldı': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
}

function getPriorityColor(priority) {
    const colors = {
        'Yüksek': 'bg-red-100 text-red-800',
        'Orta': 'bg-yellow-100 text-yellow-800',
        'Düşük': 'bg-green-100 text-green-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
}

// Chart Functions
function initializeMarketingCharts() {
    initializeCACTrendChart();
    initializeInquiryDistributionChart();
}

function initializeCACTrendChart() {
    const ctx = document.getElementById('cac-trend-chart').getContext('2d');

    marketingCharts.cacTrend = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: 14 }, (_, i) => `${14 - i} gün önce`),
            datasets: [{
                label: 'CAC (₺)',
                data: marketingData.cacTrend,
                borderColor: 'rgb(168, 85, 247)',
                backgroundColor: 'rgba(168, 85, 247, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: 'rgb(168, 85, 247)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: 'rgb(168, 85, 247)',
                    borderWidth: 1
                }
            }
        }
    });
}

function initializeInquiryDistributionChart() {
    const ctx = document.getElementById('inquiry-distribution-chart').getContext('2d');

    marketingCharts.inquiryDistribution = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(marketingData.inquiryDistribution),
            datasets: [{
                data: Object.values(marketingData.inquiryDistribution),
                backgroundColor: [
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(34, 197, 94, 0.8)',
                    'rgba(168, 85, 247, 0.8)',
                    'rgba(245, 158, 11, 0.8)'
                ],
                borderColor: [
                    'rgb(59, 130, 246)',
                    'rgb(34, 197, 94)',
                    'rgb(168, 85, 247)',
                    'rgb(245, 158, 11)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    callbacks: {
                        label: function (context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((context.parsed / total) * 100).toFixed(1);
                            return `${context.label}: ${context.parsed} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

function updateCACChart() {
    const period = document.getElementById('cac-period').value;
    // Update chart data based on period
    // For demo, we'll just refresh with same data
    if (marketingCharts.cacTrend) {
        marketingCharts.cacTrend.update();
    }
    showNotification(`CAC trendi ${period} için güncellendi`, 'info');
}

function refreshInquiryDistribution() {
    if (marketingCharts.inquiryDistribution) {
        marketingCharts.inquiryDistribution.update();
    }
    showNotification('Talep dağılımı yenilendi', 'info');
}

// Filter Functions
function applyCampaignFilters() {
    loadCampaigns();
}

function clearCampaignFilters() {
    document.getElementById('campaign-platform-filter').value = '';
    document.getElementById('campaign-status-filter').value = '';
    loadCampaigns();
}

function applyInquiryFilters() {
    loadMarketingInquiries();
}

function clearInquiryFilters() {
    document.getElementById('inquiry-type-filter').value = '';
    document.getElementById('inquiry-status-filter').value = '';
    document.getElementById('inquiry-priority-filter').value = '';
    loadMarketingInquiries();
}

// Export Functions
function exportCampaigns() {
    const campaigns = applyCampaignFiltersToData();
    const csvContent = "data:text/csv;charset=utf-8," +
        "Kampanya Adı,Platform,Bütçe,Harcanan,Başlangıç,Bitiş,Durum,Tür\n" +
        campaigns.map(c => `"${c.name}","${c.platform}","${c.budget}","${c.spent}","${c.startDate}","${c.endDate}","${c.status}","${c.type}"`).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'kampanyalar.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showNotification('Kampanya verileri CSV olarak dışa aktarıldı', 'success');
}

function exportInquiries() {
    const inquiries = applyInquiryFiltersToData();
    const csvContent = "data:text/csv;charset=utf-8," +
        "Talep ID,Müşteri,Email,Konu,Tür,Öncelik,Durum,Tarih\n" +
        inquiries.map(i => `"${i.id}","${i.customer}","${i.email}","${i.subject}","${i.type}","${i.priority}","${i.status}","${i.date}"`).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'musterı_talepleri.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showNotification('Müşteri talepleri CSV olarak dışa aktarıldı', 'success');
}

// Modal Functions - Marketing Detail Modal
function openMarketingDetailModal(metricType) {
    currentMarketingMetric = metricType;

    const modalTitle = document.getElementById('marketing-modal-title');
    const metricSummary = document.getElementById('marketing-metric-summary');
    const goalComparison = document.getElementById('marketing-goal-comparison');
    const kpiStats = document.getElementById('marketing-kpi-stats');

    const metricInfo = getMarketingMetricInfo(metricType);
    modalTitle.textContent = metricInfo.title;

    // Populate metric summary
    metricSummary.innerHTML = `
        <div class="flex items-center justify-between p-3 bg-white rounded border">
            <div>
                <p class="text-sm font-medium text-gray-600">${metricInfo.label}</p>
                <p class="text-2xl font-bold text-gray-900">${metricInfo.value}</p>
            </div>
            <div class="text-right">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${metricInfo.changeColor}">
                    ${metricInfo.change}
                </span>
                <p class="text-xs text-gray-500 mt-1">${metricInfo.period}</p>
            </div>
        </div>
        <div class="text-sm text-gray-600">
            <p><strong>Açıklama:</strong> ${metricInfo.description}</p>
        </div>
    `;

    // Populate goal comparison
    goalComparison.innerHTML = `
        <div class="space-y-2">
            <div class="flex justify-between">
                <span class="text-sm text-gray-600">Hedef:</span>
                <span class="text-sm font-medium">${metricInfo.goal.target}</span>
            </div>
            <div class="flex justify-between">
                <span class="text-sm text-gray-600">Mevcut:</span>
                <span class="text-sm font-medium">${metricInfo.goal.current}</span>
            </div>
            <div class="flex justify-between">
                <span class="text-sm text-gray-600">Hedef %:</span>
                <span class="text-sm font-medium ${metricInfo.goal.percentage >= 100 ? 'text-green-600' : 'text-orange-600'}">${metricInfo.goal.percentage}%</span>
            </div>
        </div>
    `;

    // Populate KPI stats
    kpiStats.innerHTML = `
        <div class="space-y-2">
            ${metricInfo.kpis.map(kpi => `
                <div class="flex justify-between">
                    <span class="text-sm text-gray-600">${kpi.label}:</span>
                    <span class="text-sm font-medium">${kpi.value}</span>
                </div>
            `).join('')}
        </div>
    `;

    // Initialize detail chart
    initializeMarketingDetailChart(metricType);

    document.getElementById('marketing-detail-modal').classList.remove('hidden');
    document.getElementById('marketing-detail-modal').classList.add('flex');
}

function closeMarketingDetailModal() {
    document.getElementById('marketing-detail-modal').classList.add('hidden');
    document.getElementById('marketing-detail-modal').classList.remove('flex');

    if (marketingCharts.detail) {
        marketingCharts.detail.destroy();
        marketingCharts.detail = null;
    }

    currentMarketingMetric = null;
}

function getMarketingMetricInfo(metricType) {
    const metricData = {
        'cac': {
            title: 'Müşteri Edinme Maliyeti Detayları',
            label: 'Müşteri Edinme Maliyeti (CAC)',
            value: '₺' + marketingData.metrics.cac,
            change: '↓ 12%',
            changeColor: 'bg-green-100 text-green-800',
            period: 'son 30 gün',
            description: 'Yeni bir müşteri edinmek için harcanan ortalama pazarlama maliyeti',
            goal: {
                target: '₺200',
                current: '₺250',
                percentage: 80
            },
            kpis: [
                { label: 'En düşük CAC', value: '₺180' },
                { label: 'En yüksek CAC', value: '₺320' },
                { label: 'Sektör ortalaması', value: '₺275' },
                { label: 'Hedef CAC', value: '₺200' }
            ]
        },
        'cltv': {
            title: 'Müşteri Yaşam Boyu Değeri Detayları',
            label: 'Müşteri Yaşam Boyu Değeri (CLTV)',
            value: '₺' + marketingData.metrics.cltv,
            change: '↑ 8%',
            changeColor: 'bg-green-100 text-green-800',
            period: 'son 30 gün',
            description: 'Bir müşteriden beklenen toplam gelir',
            goal: {
                target: '₺3000',
                current: '₺2500',
                percentage: 83.3
            },
            kpis: [
                { label: 'CLTV/CAC Oranı', value: '10:1' },
                { label: 'Ortalama proje değeri', value: '₺15,000' },
                { label: 'Müşteri sadakat oranı', value: '%85' },
                { label: 'Tekrar satış oranı', value: '%65' }
            ]
        },
        'spend': {
            title: 'Pazarlama Harcaması Detayları',
            label: 'Toplam Pazarlama Harcaması',
            value: '₺' + marketingData.metrics.marketingSpend.toLocaleString(),
            change: '↑ 5%',
            changeColor: 'bg-yellow-100 text-yellow-800',
            period: 'son 30 gün',
            description: 'Tüm pazarlama kanallarında yapılan toplam harcama',
            goal: {
                target: '₺20,000',
                current: '₺15,000',
                percentage: 75
            },
            kpis: [
                { label: 'Digital pazarlama', value: '₺12,000 (80%)' },
                { label: 'Geleneksel pazarlama', value: '₺3,000 (20%)' },
                { label: 'ROI', value: '4.2x' },
                { label: 'CPL (Lead başına maliyet)', value: '₺85' }
            ]
        },
        'conversion': {
            title: 'Dönüşüm Oranı Detayları',
            label: 'Dönüşüm Oranı',
            value: marketingData.metrics.conversionRate + '%',
            change: '↑ 0.6%',
            changeColor: 'bg-green-100 text-green-800',
            period: 'son 30 gün',
            description: 'Ziyaretçilerin müşteriye dönüşüm oranı',
            goal: {
                target: '6%',
                current: '4.8%',
                percentage: 80
            },
            kpis: [
                { label: 'Landing page CR', value: '8.2%' },
                { label: 'Email CR', value: '12.5%' },
                { label: 'Sosyal medya CR', value: '3.1%' },
                { label: 'Organik arama CR', value: '6.8%' }
            ]
        },
        'traffic': {
            title: 'Site Trafiği Detayları',
            label: 'Site Trafiği',
            value: marketingData.metrics.siteTraffic.toLocaleString(),
            change: '↑ 23%',
            changeColor: 'bg-green-100 text-green-800',
            period: 'son 30 gün',
            description: 'Web sitesine gelen toplam ziyaretçi sayısı',
            goal: {
                target: '15,000',
                current: '12,456',
                percentage: 83
            },
            kpis: [
                { label: 'Organik trafik', value: '7,234 (58%)' },
                { label: 'Paid trafik', value: '3,122 (25%)' },
                { label: 'Sosyal medya', value: '1,456 (12%)' },
                { label: 'Doğrudan', value: '644 (5%)' }
            ]
        }
    };

    return metricData[metricType] || metricData['cac'];
}

function initializeMarketingDetailChart(metricType) {
    const ctx = document.getElementById('marketing-detail-chart').getContext('2d');

    if (marketingCharts.detail) {
        marketingCharts.detail.destroy();
    }

    const chartData = generateMarketingDetailChartData(metricType);

    marketingCharts.detail = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: chartData.type !== 'doughnut' ? {
                y: {
                    beginAtZero: true
                }
            } : {},
            plugins: {
                legend: {
                    display: chartData.type === 'doughnut'
                }
            }
        }
    });
}

function generateMarketingDetailChartData(metricType) {
    const labels = Array.from({ length: 30 }, (_, i) => `${30 - i} gün`);

    switch (metricType) {
        case 'cac':
            return {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'CAC (₺)',
                        data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100) + 200),
                        borderColor: 'rgb(168, 85, 247)',
                        backgroundColor: 'rgba(168, 85, 247, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4
                    }]
                }
            };
        case 'conversion':
            return {
                type: 'doughnut',
                data: {
                    labels: ['Dönüşen', 'Dönüşmeyen'],
                    datasets: [{
                        data: [4.8, 95.2],
                        backgroundColor: [
                            'rgb(34, 197, 94)',
                            'rgb(229, 231, 235)'
                        ],
                        borderWidth: 2
                    }]
                }
            };
        default:
            return {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Değer',
                        data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 1000) + 500),
                        backgroundColor: 'rgba(168, 85, 247, 0.8)',
                        borderColor: 'rgb(168, 85, 247)',
                        borderWidth: 1
                    }]
                }
            };
    }
}

function exportMarketingData() {
    if (!currentMarketingMetric) return;

    const metricInfo = getMarketingMetricInfo(currentMarketingMetric);
    const csvContent = "data:text/csv;charset=utf-8," +
        "Metrik,Değer,Değişim,Dönem\n" +
        `"${metricInfo.label}","${metricInfo.value}","${metricInfo.change}","${metricInfo.period}"\n` +
        "KPI,Değer\n" +
        metricInfo.kpis.map(kpi => `"${kpi.label}","${kpi.value}"`).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `pazarlama_${currentMarketingMetric}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showNotification('Pazarlama raporu CSV olarak dışa aktarıldı', 'success');
}

// Campaign Modal Functions
function openNewCampaignModal() {
    document.getElementById('new-campaign-modal').classList.remove('hidden');
    document.getElementById('new-campaign-modal').classList.add('flex');

    // Set default dates
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const nextMonth = new Date(today);
    nextMonth.setMonth(today.getMonth() + 1);

    document.getElementById('campaign-start-date').value = tomorrow.toISOString().split('T')[0];
    document.getElementById('campaign-end-date').value = nextMonth.toISOString().split('T')[0];
}

function closeNewCampaignModal() {
    document.getElementById('new-campaign-modal').classList.add('hidden');
    document.getElementById('new-campaign-modal').classList.remove('flex');
    document.getElementById('new-campaign-form').reset();
}

function saveCampaign(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const campaignData = {
        id: 'C' + String(marketingData.campaigns.length + 1).padStart(3, '0'),
        name: document.getElementById('campaign-name').value,
        platform: document.getElementById('campaign-platform').value,
        budget: parseFloat(document.getElementById('campaign-budget').value),
        spent: 0,
        startDate: document.getElementById('campaign-start-date').value,
        endDate: document.getElementById('campaign-end-date').value,
        status: 'Taslak',
        type: document.getElementById('campaign-type').value,
        kpi: document.getElementById('campaign-kpi').value,
        target: parseInt(document.getElementById('campaign-target').value) || 0,
        current: 0,
        impressions: 0,
        clicks: 0,
        conversions: 0,
        ctr: 0,
        description: document.getElementById('campaign-description').value,
        audience: document.getElementById('campaign-audience').value
    };

    marketingData.campaigns.push(campaignData);

    closeNewCampaignModal();
    loadCampaigns();
    showNotification('Kampanya başarıyla oluşturuldu', 'success');
}

function openCampaignPerformanceModal(campaignId) {
    currentCampaignId = campaignId;
    const campaign = marketingData.campaigns.find(c => c.id === campaignId);

    if (!campaign) return;

    document.getElementById('campaign-performance-title').textContent = `${campaign.name} - Performans`;
    document.getElementById('campaign-impressions').textContent = campaign.impressions.toLocaleString();
    document.getElementById('campaign-clicks').textContent = campaign.clicks.toLocaleString();
    document.getElementById('campaign-ctr').textContent = campaign.ctr + '%';
    document.getElementById('campaign-conversions').textContent = campaign.conversions.toLocaleString();

    // Initialize performance charts
    initializeCampaignPerformanceCharts(campaign);

    // Populate campaign details
    document.getElementById('campaign-details-content').innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <h5 class="font-semibold text-gray-800 mb-2">Kampanya Bilgileri</h5>
                <div class="space-y-1 text-sm">
                    <p><strong>Kampanya ID:</strong> ${campaign.id}</p>
                    <p><strong>Platform:</strong> ${campaign.platform}</p>
                    <p><strong>Tür:</strong> ${campaign.type}</p>
                    <p><strong>Durum:</strong> <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCampaignStatusColor(campaign.status)}">${campaign.status}</span></p>
                </div>
            </div>
            <div>
                <h5 class="font-semibold text-gray-800 mb-2">Finansal Bilgiler</h5>
                <div class="space-y-1 text-sm">
                    <p><strong>Toplam Bütçe:</strong> ₺${campaign.budget.toLocaleString()}</p>
                    <p><strong>Harcanan:</strong> ₺${campaign.spent.toLocaleString()}</p>
                    <p><strong>Kalan:</strong> ₺${(campaign.budget - campaign.spent).toLocaleString()}</p>
                    <p><strong>Kullanım Oranı:</strong> ${((campaign.spent / campaign.budget) * 100).toFixed(1)}%</p>
                </div>
            </div>
        </div>
        <div class="mt-4">
            <h5 class="font-semibold text-gray-800 mb-2">Performans Hedefleri</h5>
            <div class="space-y-1 text-sm">
                <p><strong>Hedef KPI:</strong> ${campaign.kpi}</p>
                <p><strong>Hedef Değer:</strong> ${campaign.target.toLocaleString()}</p>
                <p><strong>Mevcut Değer:</strong> ${campaign.current.toLocaleString()}</p>
                <p><strong>Başarı Oranı:</strong> ${campaign.target > 0 ? ((campaign.current / campaign.target) * 100).toFixed(1) : 0}%</p>
            </div>
        </div>
    `;

    document.getElementById('campaign-performance-modal').classList.remove('hidden');
    document.getElementById('campaign-performance-modal').classList.add('flex');
}

function closeCampaignPerformanceModal() {
    document.getElementById('campaign-performance-modal').classList.add('hidden');
    document.getElementById('campaign-performance-modal').classList.remove('flex');

    // Destroy performance charts
    if (marketingCharts.campaignDaily) {
        marketingCharts.campaignDaily.destroy();
        marketingCharts.campaignDaily = null;
    }
    if (marketingCharts.campaignBudget) {
        marketingCharts.campaignBudget.destroy();
        marketingCharts.campaignBudget = null;
    }

    currentCampaignId = null;
}

function initializeCampaignPerformanceCharts(campaign) {
    // Daily Performance Chart
    const dailyCtx = document.getElementById('campaign-daily-performance').getContext('2d');
    marketingCharts.campaignDaily = new Chart(dailyCtx, {
        type: 'line',
        data: {
            labels: Array.from({ length: 14 }, (_, i) => `${14 - i} gün önce`),
            datasets: [
                {
                    label: 'İzlenim',
                    data: Array.from({ length: 14 }, () => Math.floor(Math.random() * 5000) + 1000),
                    borderColor: 'rgb(59, 130, 246)',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    yAxisID: 'y'
                },
                {
                    label: 'Tıklama',
                    data: Array.from({ length: 14 }, () => Math.floor(Math.random() * 200) + 50),
                    borderColor: 'rgb(34, 197, 94)',
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    grid: {
                        drawOnChartArea: false,
                    },
                }
            }
        }
    });

    // Budget Usage Chart
    const budgetCtx = document.getElementById('campaign-budget-usage').getContext('2d');
    marketingCharts.campaignBudget = new Chart(budgetCtx, {
        type: 'doughnut',
        data: {
            labels: ['Harcanan', 'Kalan'],
            datasets: [{
                data: [campaign.spent, campaign.budget - campaign.spent],
                backgroundColor: [
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(229, 231, 235, 0.8)'
                ],
                borderColor: [
                    'rgb(239, 68, 68)',
                    'rgb(229, 231, 235)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function downloadCampaignReport() {
    if (!currentCampaignId) return;

    const campaign = marketingData.campaigns.find(c => c.id === currentCampaignId);
    if (!campaign) return;

    showNotification(`${campaign.name} kampanya raporu indiriliyor...`, 'info');
}

// Campaign Action Functions
function editCampaign(campaignId) {
    showNotification(`Kampanya düzenleniyor: ${campaignId}`, 'info');
}

function toggleCampaign(campaignId) {
    const campaign = marketingData.campaigns.find(c => c.id === campaignId);
    if (!campaign) return;

    const newStatus = campaign.status === 'Aktif' ? 'Duraklatıldı' : 'Aktif';
    campaign.status = newStatus;

    loadCampaigns();
    showNotification(`Kampanya ${newStatus.toLowerCase()}`, 'success');
}

function deleteCampaign(campaignId) {
    if (confirm('Bu kampanyayı silmek istediğinizden emin misiniz?')) {
        const index = marketingData.campaigns.findIndex(c => c.id === campaignId);
        if (index > -1) {
            marketingData.campaigns.splice(index, 1);
            loadCampaigns();
            showNotification('Kampanya silindi', 'success');
        }
    }
}

// Inquiry Modal Functions
function openMarketingInquiryModal(inquiryId) {
    currentInquiryId = inquiryId;
    const inquiry = marketingData.inquiries.find(i => i.id === inquiryId);

    if (!inquiry) return;

    // Populate inquiry details
    document.getElementById('inquiry-details-content').innerHTML = `
        <div class="space-y-2">
            <p><strong>Talep ID:</strong> ${inquiry.id}</p>
            <p><strong>Konu:</strong> ${inquiry.subject}</p>
            <p><strong>Tür:</strong> <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getInquiryTypeColor(inquiry.type)}">${inquiry.type}</span></p>
            <p><strong>Öncelik:</strong> <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(inquiry.priority)}">${inquiry.priority}</span></p>
            <p><strong>Durum:</strong> <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getInquiryStatusColor(inquiry.status)}">${inquiry.status}</span></p>
            <p><strong>Tarih:</strong> ${formatDate(inquiry.date)}</p>
            <p><strong>Kaynak:</strong> ${inquiry.source}</p>
        </div>
        <div class="mt-3">
            <h6 class="font-medium text-gray-800 mb-2">Mesaj:</h6>
            <p class="text-sm text-gray-600 bg-gray-50 p-3 rounded">${inquiry.message}</p>
        </div>
    `;

    // Populate customer info
    document.getElementById('inquiry-customer-info').innerHTML = `
        <div class="space-y-2">
            <p><strong>Müşteri:</strong> ${inquiry.customer}</p>
            <p><strong>E-posta:</strong> ${inquiry.email}</p>
            <p><strong>Telefon:</strong> ${inquiry.phone}</p>
        </div>
    `;

    // Populate message history
    document.getElementById('inquiry-message-history').innerHTML =
        inquiry.responses.length > 0 ?
            inquiry.responses.map(response => `
            <div class="bg-white p-3 rounded border">
                <div class="flex justify-between items-start mb-2">
                    <span class="text-xs font-medium text-gray-800">${response.sender === 'admin' ? 'Admin' : 'Müşteri'}</span>
                    <span class="text-xs text-gray-500">${formatDate(response.date)}</span>
                </div>
                <p class="text-sm text-gray-600">${response.message}</p>
            </div>
        `).join('') :
            '<p class="text-sm text-gray-500">Henüz mesaj yok</p>';

    // Set current status in dropdown
    document.getElementById('inquiry-new-status').value = inquiry.status;

    document.getElementById('marketing-inquiry-modal').classList.remove('hidden');
    document.getElementById('marketing-inquiry-modal').classList.add('flex');
}

function closeMarketingInquiryModal() {
    document.getElementById('marketing-inquiry-modal').classList.add('hidden');
    document.getElementById('marketing-inquiry-modal').classList.remove('flex');
    document.getElementById('inquiry-response-form').reset();
    currentInquiryId = null;
}

function sendInquiryResponse(event) {
    event.preventDefault();

    if (!currentInquiryId) return;

    const inquiry = marketingData.inquiries.find(i => i.id === currentInquiryId);
    if (!inquiry) return;

    const message = document.getElementById('inquiry-response-message').value;
    const newStatus = document.getElementById('inquiry-new-status').value;

    if (!message.trim()) {
        showNotification('Lütfen bir yanıt yazın', 'warning');
        return;
    }

    // Add response to inquiry
    inquiry.responses.push({
        date: new Date().toISOString().split('T')[0],
        message: message,
        sender: 'admin'
    });

    // Update status
    inquiry.status = newStatus;

    closeMarketingInquiryModal();
    loadMarketingInquiries();
    showNotification('Yanıt gönderildi ve durum güncellendi', 'success');
}

// Inquiry Action Functions
function respondToInquiry(inquiryId) {
    openMarketingInquiryModal(inquiryId);
}

function updateInquiryStatus(inquiryId) {
    const inquiry = marketingData.inquiries.find(i => i.id === inquiryId);
    if (!inquiry) return;

    const newStatus = prompt('Yeni durum girin:', inquiry.status);
    if (newStatus && newStatus !== inquiry.status) {
        inquiry.status = newStatus;
        loadMarketingInquiries();
        showNotification('Talep durumu güncellendi', 'success');
    }
}

function convertToLead() {
    if (!currentInquiryId) return;

    showNotification('Müşteri lead olarak kaydedildi', 'success');
    closeMarketingInquiryModal();
}

function scheduleFollowUp() {
    if (!currentInquiryId) return;

    showNotification('Takip randevusu planlandı', 'info');
}

function syncWithSupportRequests() {
    showNotification('Destek talepleri ile senkronizasyon başlatıldı', 'info');
    // Simulate sync process
    setTimeout(() => {
        showNotification('Senkronizasyon tamamlandı - 3 yeni talep eklendi', 'success');
        loadMarketingInquiries();
    }, 2000);
}

// Enhanced Support & Complaints Functions
function filterSupportRequests() {
    loadSupportRequests();
}

function clearSupportFilters() {
    document.getElementById('support-search').value = '';
    document.getElementById('support-priority-filter').value = '';
    document.getElementById('support-status-filter').value = '';
    document.getElementById('support-assigned-filter').value = '';
    filterSupportRequests();
}

function updateSupportCount(count) {
    const countElement = document.getElementById('support-count');
    if (countElement) {
        countElement.textContent = count;
    }
}

function exportSupportRequests() {
    const requests = applySupportFiltersToData();
    const csvContent = "data:text/csv;charset=utf-8," +
        "Talep ID,Kullanıcı,Konu,Öncelik,Durum,Atanan,Tarih\n" +
        requests.map(request =>
            `"${request.id}","${request.user}","${request.subject}","${getSupportPriorityText(request.priority)}","${getSupportStatusText(request.status)}","${request.assignedTo || 'Atanmamış'}","${formatDate(request.date)}"`
        ).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `destek_talepleri_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showNotification('Destek talepleri CSV olarak dışa aktarıldı', 'success');
}

function refreshSupportRequests() {
    showNotification('Destek talepleri yenileniyor...', 'info');
    setTimeout(() => {
        loadSupportRequests();
        showNotification('Destek talepleri güncellendi', 'success');
    }, 1000);
}

// Support Priority and Status Functions
function getSupportPriorityText(priority) {
    const priorities = {
        'high': 'Yüksek',
        'medium': 'Orta',
        'low': 'Düşük'
    };
    return priorities[priority] || priority;
}

function getSupportPriorityColor(priority) {
    const colors = {
        'high': 'bg-red-100 text-red-800',
        'medium': 'bg-yellow-100 text-yellow-800',
        'low': 'bg-green-100 text-green-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
}

function getSupportStatusColor(status) {
    const colors = {
        'open': 'bg-blue-100 text-blue-800',
        'pending': 'bg-yellow-100 text-yellow-800',
        'resolved': 'bg-green-100 text-green-800',
        'closed': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
}

function getSupportStatusText(status) {
    const statuses = {
        'open': 'Açık',
        'pending': 'Beklemede',
        'resolved': 'Çözüldü',
        'closed': 'Kapalı'
    };
    return statuses[status] || status;
}

// Support Ticket Details Modal Functions
function openSupportTicketDetailsModal(ticketId) {
    const ticket = sampleData.supportComplaints.support.find(t => t.id == ticketId);
    if (!ticket) return;

    // Populate modal with ticket data
    document.getElementById('ticket-id').textContent = `#${ticket.id}`;
    document.getElementById('ticket-status').textContent = getSupportStatusText(ticket.status);
    document.getElementById('ticket-priority').textContent = getSupportPriorityText(ticket.priority);
    document.getElementById('ticket-date').textContent = formatDate(ticket.date);
    document.getElementById('ticket-subject').textContent = ticket.subject;
    document.getElementById('ticket-user').textContent = ticket.user;
    document.getElementById('ticket-user-email').textContent = ticket.userEmail;
    document.getElementById('ticket-user-phone').textContent = ticket.userPhone;
    document.getElementById('ticket-user-type').textContent = ticket.userType;

    // Load messages
    const messagesContainer = document.getElementById('ticket-messages');
    messagesContainer.innerHTML = ticket.messages.map(message => `
        <div class="border-l-4 ${message.senderType === 'admin' ? 'border-purple-500 bg-purple-50' : 'border-blue-500 bg-blue-50'} p-4 rounded">
            <div class="flex justify-between items-start mb-2">
                <div class="font-medium text-gray-800">${message.sender}</div>
                <div class="text-xs text-gray-500">${formatDateTime(message.timestamp)}</div>
            </div>
            <div class="text-gray-700">${message.message}</div>
            ${message.isInternal ? '<span class="inline-block mt-2 px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">Dahili Not</span>' : ''}
        </div>
    `).join('');

    // Load attachments
    const attachmentsContainer = document.getElementById('ticket-attachments');
    if (ticket.attachments.length > 0) {
        attachmentsContainer.innerHTML = ticket.attachments.map(attachment => `
            <div class="flex items-center justify-between p-2 border border-gray-200 rounded">
                <div class="flex items-center">
                    <i class="fas fa-paperclip text-gray-400 mr-2"></i>
                    <span class="text-sm text-gray-700">${attachment.name}</span>
                </div>
                <div class="flex space-x-2">
                    <button onclick="viewAttachment('${attachment.url}')" class="text-xs text-blue-600 hover:text-blue-700">Görüntüle</button>
                    <button onclick="downloadAttachment('${attachment.url}')" class="text-xs text-green-600 hover:text-green-700">İndir</button>
                </div>
            </div>
        `).join('');
    } else {
        attachmentsContainer.innerHTML = '<p class="text-sm text-gray-500">Ek dosya bulunmuyor</p>';
    }

    // Set current values for dropdowns
    document.getElementById('ticket-status-change').value = ticket.status;
    document.getElementById('ticket-assign').value = ticket.assignedTo || '';
    document.getElementById('ticket-priority-change').value = ticket.priority;

    // Store current ticket ID for actions
    window.currentTicketId = ticketId;

    // Show modal
    document.getElementById('support-ticket-details-modal').classList.remove('hidden');
    document.getElementById('support-ticket-details-modal').classList.add('flex');
}

function closeSupportTicketDetailsModal() {
    document.getElementById('support-ticket-details-modal').classList.add('hidden');
    document.getElementById('support-ticket-details-modal').classList.remove('flex');
    window.currentTicketId = null;
}

function sendTicketReply() {
    const replyText = document.getElementById('ticket-reply').value.trim();
    const isInternal = document.getElementById('internal-note').checked;

    if (!replyText) {
        showNotification('Lütfen yanıt mesajınızı yazın', 'warning');
        return;
    }

    if (!window.currentTicketId) return;

    const ticket = sampleData.supportComplaints.support.find(t => t.id == window.currentTicketId);
    if (!ticket) return;

    // Add new message
    const newMessage = {
        id: ticket.messages.length + 1,
        sender: 'Admin',
        senderType: 'admin',
        message: replyText,
        timestamp: new Date().toISOString().replace('T', ' ').split('.')[0],
        isInternal: isInternal
    };

    ticket.messages.push(newMessage);

    // Clear input
    document.getElementById('ticket-reply').value = '';
    document.getElementById('internal-note').checked = false;

    // Refresh modal
    openSupportTicketDetailsModal(window.currentTicketId);

    showNotification('Yanıt gönderildi', 'success');
}

function updateTicketStatus() {
    if (!window.currentTicketId) return;

    const newStatus = document.getElementById('ticket-status-change').value;
    const ticket = sampleData.supportComplaints.support.find(t => t.id == window.currentTicketId);

    if (ticket) {
        ticket.status = newStatus;
        loadSupportRequests();
        openSupportTicketDetailsModal(window.currentTicketId);
        showNotification(`Talep durumu "${getSupportStatusText(newStatus)}" olarak güncellendi`, 'success');
    }
}

function assignTicket() {
    if (!window.currentTicketId) return;

    const assignedTo = document.getElementById('ticket-assign').value;
    const ticket = sampleData.supportComplaints.support.find(t => t.id == window.currentTicketId);

    if (ticket) {
        ticket.assignedTo = assignedTo;
        loadSupportRequests();
        openSupportTicketDetailsModal(window.currentTicketId);
        showNotification(assignedTo ? `Talep ${assignedTo} kullanıcısına atandı` : 'Talep ataması kaldırıldı', 'success');
    }
}

function updateTicketPriority() {
    if (!window.currentTicketId) return;

    const newPriority = document.getElementById('ticket-priority-change').value;
    const ticket = sampleData.supportComplaints.support.find(t => t.id == window.currentTicketId);

    if (ticket) {
        ticket.priority = newPriority;
        loadSupportRequests();
        openSupportTicketDetailsModal(window.currentTicketId);
        showNotification(`Talep önceliği "${getSupportPriorityText(newPriority)}" olarak güncellendi`, 'success');
    }
}

function openUserProfile(userId) {
    // This would typically open a user profile modal or navigate to user details
    showNotification(`Kullanıcı profili açılıyor: ${userId}`, 'info');
}

function viewAttachment(url) {
    // Simulate attachment viewing
    showNotification('Ek dosya görüntüleniyor...', 'info');
}

function downloadAttachment(url) {
    // Simulate attachment download
    showNotification('Ek dosya indiriliyor...', 'info');
}

// Reply Modal Functions
function openReplyToSupportTicketModal(ticketId) {
    const ticket = sampleData.supportComplaints.support.find(t => t.id == ticketId);
    if (!ticket) return;

    // Populate modal
    document.getElementById('reply-ticket-id').textContent = `#${ticket.id}`;
    document.getElementById('reply-ticket-user').textContent = ticket.user;
    document.getElementById('reply-ticket-subject').textContent = ticket.subject;

    // Load previous messages
    const messagesContainer = document.getElementById('reply-previous-messages');
    messagesContainer.innerHTML = ticket.messages.slice(-3).map(message => `
        <div class="text-xs p-2 bg-gray-100 rounded">
            <strong>${message.sender}:</strong> ${message.message.substring(0, 100)}${message.message.length > 100 ? '...' : ''}
        </div>
    `).join('');

    window.currentReplyTicketId = ticketId;

    document.getElementById('reply-support-ticket-modal').classList.remove('hidden');
    document.getElementById('reply-support-ticket-modal').classList.add('flex');
}

function closeReplyToSupportTicketModal() {
    document.getElementById('reply-support-ticket-modal').classList.add('hidden');
    document.getElementById('reply-support-ticket-modal').classList.remove('flex');
    document.getElementById('reply-message').value = '';
    window.currentReplyTicketId = null;
}

function sendSupportReply() {
    const replyText = document.getElementById('reply-message').value.trim();
    const closeTicket = document.getElementById('reply-close-ticket').checked;
    const sendEmail = document.getElementById('reply-send-email').checked;

    if (!replyText) {
        showNotification('Lütfen yanıt mesajınızı yazın', 'warning');
        return;
    }

    if (!window.currentReplyTicketId) return;

    const ticket = sampleData.supportComplaints.support.find(t => t.id == window.currentReplyTicketId);
    if (!ticket) return;

    // Add reply message
    const newMessage = {
        id: ticket.messages.length + 1,
        sender: 'Admin',
        senderType: 'admin',
        message: replyText,
        timestamp: new Date().toISOString().replace('T', ' ').split('.')[0],
        isInternal: false
    };

    ticket.messages.push(newMessage);

    // Update status if closing
    if (closeTicket) {
        ticket.status = 'closed';
    }

    closeReplyToSupportTicketModal();
    loadSupportRequests();

    let message = 'Yanıt gönderildi';
    if (closeTicket) message += ' ve talep kapatıldı';
    if (sendEmail) message += ', e-posta bildirimi gönderildi';

    showNotification(message, 'success');
}

// Close Ticket Modal Functions
function confirmCloseSupportTicket(ticketId) {
    const ticket = sampleData.supportComplaints.support.find(t => t.id == ticketId);
    if (!ticket) return;

    document.getElementById('close-ticket-id').textContent = `#${ticket.id}`;
    document.getElementById('close-ticket-user').textContent = ticket.user;
    document.getElementById('close-ticket-subject').textContent = ticket.subject;

    window.currentCloseTicketId = ticketId;

    document.getElementById('close-support-ticket-modal').classList.remove('hidden');
    document.getElementById('close-support-ticket-modal').classList.add('flex');
}

function closeCloseSupportTicketModal() {
    document.getElementById('close-support-ticket-modal').classList.add('hidden');
    document.getElementById('close-support-ticket-modal').classList.remove('flex');
    window.currentCloseTicketId = null;
}

function confirmCloseSupportTicket() {
    if (!window.currentCloseTicketId) return;

    const reason = document.getElementById('close-reason').value;
    const description = document.getElementById('close-description').value;
    const sendNotification = document.getElementById('close-send-notification').checked;

    const ticket = sampleData.supportComplaints.support.find(t => t.id == window.currentCloseTicketId);
    if (ticket) {
        ticket.status = 'closed';

        // Add closing note
        const closeNote = {
            id: ticket.messages.length + 1,
            sender: 'Sistem',
            senderType: 'system',
            message: `Talep kapatıldı. Neden: ${reason}${description ? '. Açıklama: ' + description : ''}`,
            timestamp: new Date().toISOString().replace('T', ' ').split('.')[0],
            isInternal: true
        };

        ticket.messages.push(closeNote);
    }

    closeCloseSupportTicketModal();
    loadSupportRequests();

    let message = 'Talep başarıyla kapatıldı';
    if (sendNotification) message += ', kullanıcıya bildirim gönderildi';

    showNotification(message, 'success');
}

// Additional Support Functions (for placeholder buttons in table)
function openChangePriorityModal(ticketId) {
    openSupportTicketDetailsModal(ticketId);
}

function openAssignToAdminModal(ticketId) {
    openSupportTicketDetailsModal(ticketId);

}


