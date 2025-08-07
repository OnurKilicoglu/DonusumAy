
    // --- DATA ---
    const currentUserId = 'ali.veli@email.com'; // Simulating logged-in user

    let customerData = {
        name: 'Ali Veli',
        stats: {
            activeListings: 1,
            totalOffers: 2,
            activeProjects: 0,
        },
        listings: [
            {
                id: 1,
                title: 'Kadıköy Merkezdeki Binamız',
                description: 'Kadıköy merkezde, kentsel dönüşüme uygun, 4 katlı bina ve arsası.',
                location: { il: 'İstanbul', ilce: 'Kadıköy', mahalle: 'Caferağa' },
                parcelInfo: { ada: '215', parsel: '30', area: '550' },
                images: ['https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop', 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2070&auto=format&fit=crop'],
                coOwners: [
                    {
                        id: 'owner-1', isCurrentUser: true, name: 'Ali Veli', email: 'ali.veli@email.com',
                        tcKimlik: '11111111111', phoneNumber: '5551112233',
                        tapuDocumentUrl: 'simulated/tapu-ali.pdf', isVerified: true,
                        approvalStatus: 'approved', approvalLink: null
                    },
                    {
                        id: 'owner-2', isCurrentUser: false, name: 'Ayşe Yılmaz', email: 'ayse.yilmaz@email.com',
                        tcKimlik: '22222222222', phoneNumber: '5554445566',
                        tapuDocumentUrl: 'simulated/tapu-ayse.pdf', isVerified: true,
                        approvalStatus: 'pending', approvalLink: '/approve?listing=1&owner=owner-2&token=xyz'
                    },
                    {
                        id: 'owner-3', isCurrentUser: false, name: 'Fatma Kaya', email: 'fatma.kaya@email.com',
                        tcKimlik: '33333333333', phoneNumber: '5557778899',
                        tapuDocumentUrl: 'simulated/tapu-fatma.pdf', isVerified: false,
                        approvalStatus: 'pending', approvalLink: '/approve?listing=1&owner=owner-3&token=abc'
                    }
                ],
                status: 'active',
                offersCount: 2,
                imarCapiProcessStatus: 'not_started', // Yeni alan
                aplikasyonKrokisiDocs: [], // Yeni alan
                aplikasyonKrokisiUrl: '', // Yeni alan
                imarCapiDocs: [], // Yeni alan
                imarCapiFeePaid: false, // Yeni alan
                imarCapiUrl: '', // Yeni alan
            }
        ],
        offers: [
            {
                id: 'offer-01',
                listingId: 1,
                contractorName: 'Güven İnşaat A.Ş.',
                contractorRating: 4.8,
                details: '10 Daire + 2 Dükkan, 1.000.000 TL nakit',
                financials: {
                    costPerOwner: 150000,
                    totalApartments: 10,
                    apartmentConfigs: "3+1 (6 adet), 2+1 (4 adet)"
                },
                specs: {
                    wc: 2,
                    bathrooms: 2,
                    balconies: 1
                },
                constructionTime: 24, // months
                designFiles: [
                    { name: 'Kat Planı Zemin Kat', type: 'pdf', url: 'https://placehold.co/800x1100/e2e8f0/a0aec0?text=Zemin+Kat+Planı', thumbnail: 'https://placehold.co/100x100/e2e8f0/a0aec0?text=PDF' },
                    { name: '3D Dış Cephe Render', type: 'image', url: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=2070&auto=format&fit=crop', thumbnail: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=100&h=100&auto=format&fit=crop' },
                    { name: 'Vaziyet Planı', type: 'pdf', url: 'https://placehold.co/800x1100/e2e8f0/a0aec0?text=Vaziyet+Planı', thumbnail: 'https://placehold.co/100x100/e2e8f0/a0aec0?text=PDF' }
                ],
                status: 'pending', // pending, accepted, rejected
                votes: [
                    { coOwnerEmail: 'ayse.yilmaz@email.com', vote: 'accept' }
                ],
                requiredVotes: 2, // Majority of 3
            },
            {
                id: 'offer-02',
                listingId: 1,
                contractorName: 'Sağlam Yapı Ltd.',
                contractorRating: 4.5,
                details: '12 Daire, 500.000 TL nakit',
                financials: {
                    costPerOwner: 50000,
                    totalApartments: 12,
                    apartmentConfigs: "3+1 (4 adet), 2+1 (8 adet)"
                },
                specs: {
                    wc: 2,
                    bathrooms: 1,
                    balconies: 2
                },
                constructionTime: 18, // months
                designFiles: [
                    { name: 'Kat Planları', type: 'pdf', url: 'https://placehold.co/800x1100/e2e8f0/a0aec0?text=Kat+Planları', thumbnail: 'https://placehold.co/100x100/e2e8f0/a0aec0?text=PDF' }
                ],
                status: 'pending',
                votes: [],
                requiredVotes: 2,
            }
        ],
        designProjects: [
            {
                id: 'proj-01',
                listingId: 1,
                architectId: 'arch-01',
                status: 'ongoing', // ongoing, completed, revision_pending
                title: 'Kadıköy Merkez Bina Tasarımı',
                designDetails: {
                    floors: 5,
                    apartments: 10,
                    apartmentsPerFloor: 2,
                    apartmentTypes: '3+1'
                },
                documents: [
                    { name: 'Ön Taslak Planlar', type: 'pdf', url: '#', thumbnail: 'https://placehold.co/100x100/e2e8f0/a0aec0?text=PDF' },
                ],
                chatHistory: [],
                archived: false
            },
            {
                id: 'proj-02',
                listingId: 1, // Another project for the same listing
                architectId: 'arch-02',
                status: 'completed',
                title: 'Kadıköy Bina Cephe Giydirme',
                designDetails: {
                    floors: 5,
                    apartments: 10,
                    apartmentsPerFloor: 2,
                    apartmentTypes: '3+1'
                },
                documents: [
                    { name: 'Final Kat Planları', type: 'pdf', url: '#', thumbnail: 'https://placehold.co/100x100/e2e8f0/a0aec0?text=PDF' },
                    { name: '3D Render (Final)', type: 'image', url: '#', thumbnail: 'https://placehold.co/100x100/a0aec0/e2e8f0?text=IMG' },
                    { name: 'Kesit ve Görünüşler', type: 'pdf', url: '#', thumbnail: 'https://placehold.co/100x100/e2e8f0/a0aec0?text=PDF' }
                ],
                chatHistory: [],
                archived: false
            }
        ],
        architects: [
            { id: 'arch-01', name: 'Mimar Ayşe Yılmaz', rating: 4.9, specializations: 'Konut, Ofis' },
            { id: 'arch-02', name: 'Mimar Fatma Demir', rating: 4.7, specializations: 'Rezidans, Ticari' },
            { id: 'arch-03', name: 'Mimar Ahmet Kaya', rating: 4.5, specializations: 'Kentsel Dönüşüm' }
        ],
        applicationProjects: [
            {
                id: 'app-proj-01',
                listingId: 1,
                architectId: 'arch-01',
                status: 'ongoing',
                title: 'Kadıköy Merkez Bina Uygulama Projesi'
            }
        ],
        lawyerCommunications: [],
        legalProcesses: [
            {
                projectId: 'app-proj-01',
                projectName: 'Kadıköy Merkez Bina Uygulama Projesi',
                contractorName: 'Güven İnşaat A.Ş.',
                contractType: 'Arsa Payı Karşılığı İnşaat Sözleşmesi', // Noter tarafından seçilen sözleşme türü
                contractorInfo: {
                    phone: '0212 555 77 88',
                    email: 'info@guveninşaat.com.tr',
                    address: 'Levent Mah. Büyükdere Cad. No:87/15 Şişli/İstanbul',
                    companyName: 'Güven İnşaat A.Ş.',  
                    representative: 'Ahmet Güven',
                    yearsOfExperience: 15,
                    completedProjects: 25
                },
                notaryStatus: 'documents_pending', // "documents_pending", "notary_assigned", "appointment_set", "contract_notarized"
                assignedNotary: null,
                notaryAppointment: null,
                uploadedDocuments: [],
                notarizedContractUrl: null,
                notaryChatHistory: []
            },
            {
                projectId: 'app-proj-02', // A more advanced example
                projectName: 'Ataşehir Finans Merkezi Kule Projesi',
                contractorName: 'Sağlam Yapı Ltd.',
                contractType: 'Kat Karşılığı İnşaat Sözleşmesi (Arsa Payı Karşılığı İnşaat Sözleşmesi)',
                notaryStatus: 'appointment_set',
                assignedNotary: {
                    id: 'notary-1',
                    name: 'Kadıköy 3. Noterliği',
                    contact: '0216 123 45 67'
                },
                notaryAppointment: {
                    date: '2025-08-15',
                    time: '11:00',
                    location: 'Kadıköy 3. Noterliği, Bostancı Mah. Bağdat Cad. No: 512/B, Kadıköy/İstanbul',
                    smsReminderEnabled: true
                },
                uploadedDocuments: [
                    { name: 'Sözleşme Taslağı.pdf', url: '#' },
                    { name: 'Kimlik Fotokopileri.zip', url: '#' },
                ],
                notarizedContractUrl: 'simulated/notarized-contract.pdf',
                notaryChatHistory: [
                    { sender: 'notary', type: 'text', text: 'Merhaba, belgelerinizi aldım. Randevunuzu 15 Ağustos saat 11:00 olarak onayladım.', timestamp: Date.now() - 86400000 },
                    { sender: 'customer', type: 'text', text: 'Teşekkürler, randevuda görüşmek üzere.', timestamp: Date.now() - 86300000 },
                ]
            }
        ],
        profile: {
            profilePictureUrl: 'https://placehold.co/100x100/A800FF/FFFFFF?text=AV',
            contactInfo: {
                name: 'Ali',
                surname: 'Veli',
                email: 'ali.veli@email.com',
                phone: '5551112233'
            },
            addressInfo: {
                street: 'Bağdat Cad. No:123',
                city: 'İstanbul',
                district: 'Kadıköy',
                zipCode: '34710'
            },
            twoFactorEnabled: false,
            subscriptionPlan: 'Standard'
        },
        liveChatSession: {
            id: null,
            category: null,
            messages: []
        }
    };

    let temporaryImageFiles = []; // For storing File objects before saving
    let temporaryDeedFiles = {}; // For storing co-owner deed files { ownerIndex: File }
    let pendingProjectData = null; // To hold project data before payment
    let pendingSubscriptionPlanId = null; // Abonelik yükseltme işlemi için seçilen planı geçici olarak tutar

    // --- CORE UI FUNCTIONS ---

    function showSection(sectionId) {
        // Hide all sections
        ['customer-dashboard-section', 'my-listings-section', 'offers-section', 'customer-projects-section', 'legal-processes-section', 'profile-section', 'support-section'].forEach(id => {
            document.getElementById(id)?.classList.add('hidden');
        });

        // Show selected section
        document.getElementById(sectionId)?.classList.remove('hidden');

        // Update sidebar active state
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


        if (sectionId === 'customer-dashboard-section') renderCustomerDashboard();
        else if (sectionId === 'my-listings-section') renderCustomerListings();
        else if (sectionId === 'offers-section') renderOffers();
        else if (sectionId === 'customer-projects-section') renderProjects();
        else if (sectionId === 'legal-processes-section') renderLegalProcesses();
        else if (sectionId === 'profile-section') renderProfileSection();
        else if (sectionId === 'support-section') renderSupportSection();

        closeMobileMenu();
    }

    function openMobileMenu() {
        document.getElementById('sidebar').classList.remove('-translate-x-full');
        document.getElementById('sidebar-overlay').classList.remove('hidden');
    }

    function closeMobileMenu() {
        if (!document.getElementById('sidebar').classList.contains('-translate-x-full')) {
            document.getElementById('sidebar').classList.add('-translate-x-full');
            document.getElementById('sidebar-overlay').classList.add('hidden');
        }
    }

    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
            // Animate in
            setTimeout(() => {
                modal.classList.remove('opacity-0');
                modal.querySelector('.modal-content')?.classList.remove('scale-95');
            }, 10);
        }
    }

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('opacity-0');
            modal.querySelector('.modal-content')?.classList.add('scale-95');
            setTimeout(() => modal.classList.add('hidden'), 200);
        }
    }

    function showNotification(message, type = 'info') {
        const container = document.getElementById('notification-container');
        const id = 'notif-' + Date.now();
        const colors = { success: 'bg-green-500', error: 'bg-red-500', warning: 'bg-yellow-500', info: 'bg-blue-500' };
        const icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', warning: 'fa-exclamation-triangle', info: 'fa-info-circle' };

        const notifElement = document.createElement('div');
        notifElement.id = id;
        notifElement.className = `notification ${colors[type]} text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 max-w-sm`;
        notifElement.innerHTML = `<i class="fas ${icons[type]}"></i><span class="flex-1 text-sm font-medium">${message}</span><button onclick="removeNotification('${id}')">&times;</button>`;

        container.appendChild(notifElement);
        setTimeout(() => removeNotification(id), 5000);
    }

    function removeNotification(id) {
        const notif = document.getElementById(id);
        if (notif) {
            notif.classList.add('removing');
            setTimeout(() => notif.remove(), 300);
        }
    }

    function logout() {
        if (confirm('Çıkış yapmak istediğinizden emin misiniz?')) {
            // localStorage'ı temizle
            localStorage.removeItem('admin_logged_in');
            localStorage.removeItem('admin_user_email');
            localStorage.removeItem('admin_user_role');
            localStorage.removeItem('admin_user_name');
            
            showNotification('Çıkış yapılıyor...', 'info');
            setTimeout(() => window.location.href = 'auth.html', 1500);
        }
    }

    // --- DASHBOARD SECTION ---
    function renderCustomerDashboard() {
        const container = document.getElementById('customer-dashboard-content');
        if (!container) return;

        // Structure the dashboard
        container.innerHTML = `
            <div id="stats-grid" class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"></div>
            <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div class="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div class="px-6 py-4 border-b border-gray-200">
                        <h3 class="text-lg font-semibold text-gray-800">Gelen Teklifler</h3>
                    </div>
                    <div id="dashboard-offers-list" class="p-6 space-y-4"></div>
                </div>
                <div class="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div class="px-6 py-4 border-b border-gray-200">
                        <h3 class="text-lg font-semibold text-gray-800">Aktif Projelerim</h3>
                    </div>
                    <div id="dashboard-projects-list" class="p-6"></div>
                </div>
            </div>
        `;

        renderDashboardStats();
        renderDashboardOffers();
        renderDashboardProjects();
    }

    function renderDashboardStats() {
        const container = document.getElementById('stats-grid');
        if (!container) return;
        const stats = customerData.stats;
        stats.activeListings = customerData.listings.filter(l => l.status === 'active').length;
        stats.totalOffers = customerData.offers.length;

        const statsCards = [
            {
                title: 'Aktif İlanlarım',
                value: stats.activeListings,
                icon: 'fas fa-bullhorn',
                color: 'text-blue-600',
                bgColor: 'bg-blue-100',
                link: 'my-listings-section'
            },
            {
                title: 'Gelen Teklifler',
                value: stats.totalOffers,
                icon: 'fas fa-handshake',
                color: 'text-green-600',
                bgColor: 'bg-green-100',
                link: 'offers-section'
            },
            {
                title: 'Devam Eden Projeler',
                value: stats.activeProjects,
                icon: 'fas fa-hammer',
                color: 'text-orange-600',
                bgColor: 'bg-orange-100',
                link: 'customer-projects-section'
            }
        ];

        container.innerHTML = statsCards.map(stat => `
            <div onclick="showSection('${stat.link}')" 
                 class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between hover:shadow-md transition-all duration-200 hover:scale-105 cursor-pointer">
                <div>
                    <p class="text-sm font-medium text-gray-500">${stat.title}</p>
                    <p class="text-3xl font-bold text-gray-900 mt-1">${stat.value}</p>
                </div>
                <div class="w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center">
                    <i class="${stat.icon} text-2xl ${stat.color}"></i>
                </div>
            </div>
        `).join('');
    }

    function renderDashboardOffers() {
        const container = document.getElementById('dashboard-offers-list');
        if (!container) return;
        const pendingOffers = customerData.offers.filter(o => o.status === 'pending');

        if (pendingOffers.length === 0) {
            container.innerHTML = `<p class="text-gray-500 text-center py-8">Değerlendirilecek yeni teklif bulunmuyor.</p>`;
            return;
        }

        container.innerHTML = pendingOffers.map(offer => {
            const listing = customerData.listings.find(l => l.id === offer.listingId);
            const userVote = offer.votes.find(v => v.coOwnerEmail === currentUserId);
            const acceptedCount = offer.votes.filter(v => v.vote === 'accept').length;

            let voteStatusHtml = '';
            if (userVote) {
                voteStatusHtml = `<p class="text-sm font-semibold ${userVote.vote === 'accept' ? 'text-green-600' : 'text-red-600'}">Oyunuz: ${userVote.vote === 'accept' ? 'Kabul' : 'Red'}</p>`;
            } else {
                voteStatusHtml = `<p class="text-sm font-semibold text-yellow-600">Oyunuz Bekleniyor</p>`;
            }

            return `
                <div class="border rounded-lg p-4 transition-shadow hover:shadow-md">
                    <p class="text-xs text-gray-500">${listing.title}</p>
                    <h4 class="font-semibold text-gray-800 mt-1">Müteahhit: ${offer.contractorName}</h4>
                    <p class="text-sm text-gray-600 my-2">${offer.details}</p>
                    <div class="flex justify-between items-center mt-3 pt-3 border-t">
                        <div>
                            ${voteStatusHtml}
                            <p class="text-xs text-gray-500 mt-1">${acceptedCount}/${offer.requiredVotes} Kabul Oyu</p>
                        </div>
                        <button onclick="openOfferDetailsModal('${offer.id}')" class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark text-sm">İncele ve Oyla</button>
                    </div>
                </div>
            `;
        }).join('');
    }

    function renderDashboardProjects() {
        const container = document.getElementById('dashboard-projects-list');
        if (!container) return;

        // Örnek proje verileri
        const projects = [
            {
                id: 'proj1',
                title: 'Kadıköy Rezidans Projesi',
                address: 'Kadıköy, İstanbul',
                contractor: 'Yıldız İnşaat Ltd. Şti.',
                startDate: '2025-01-15',
                status: 'in_progress',
                progress: 65,
                details: {
                    area: 2500,
                    floors: 12,
                    units: 48,
                    completion: '2025-12-30'
                },
                lastUpdate: '2025-03-20',
                thumbnail: 'https://placehold.co/600x400/e2e8f0/a0aec0?text=Proje+Görseli'
            },
            {
                id: 'proj2',
                title: 'Bahçelievler Modern Sitesi',
                address: 'Bahçelievler, İstanbul',
                contractor: 'Mega Yapı A.Ş.',
                startDate: '2025-02-01',
                status: 'pending_approval',
                progress: 30,
                details: {
                    area: 3200,
                    floors: 8,
                    units: 64,
                    completion: '2026-03-15'
                },
                lastUpdate: '2025-03-18',
                thumbnail: 'https://placehold.co/600x400/e2e8f0/a0aec0?text=Proje+Görseli'
            },
            {
                id: 'proj3',
                title: 'Ataşehir Yeşil Vadi Konutları',
                address: 'Ataşehir, İstanbul',
                contractor: 'Doğa İnşaat Ltd. Şti.',
                startDate: '2025-03-01',
                status: 'design_phase',
                progress: 15,
                details: {
                    area: 4500,
                    floors: 15,
                    units: 90,
                    completion: '2026-06-30'
                },
                lastUpdate: '2025-03-15',
                thumbnail: 'https://placehold.co/600x400/e2e8f0/a0aec0?text=Proje+Görseli'
            }
        ];

        if (projects.length === 0) {
            container.innerHTML = `<p class="text-gray-500 text-center py-8">Henüz aktif bir projeniz yok.</p>`;
            return;
        }

        container.innerHTML = projects.map(project => {
            // Durum rozetini belirle
            let statusBadge = '';
            switch (project.status) {
                case 'in_progress':
                    statusBadge = '<span class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Devam Ediyor</span>';
                    break;
                case 'pending_approval':
                    statusBadge = '<span class="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">Onay Bekliyor</span>';
                    break;
                case 'design_phase':
                    statusBadge = '<span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Tasarım Aşaması</span>';
                    break;
            }

            return `
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div class="relative">
                        <img src="${project.thumbnail}" alt="${project.title}" class="w-full h-48 object-cover">
                        <div class="absolute top-4 right-4">
                            ${statusBadge}
                        </div>
                    </div>
                    
                    <div class="p-6">
                        <div class="flex justify-between items-start mb-4">
                            <div>
                                <h3 class="text-lg font-bold text-gray-900">${project.title}</h3>
                                <p class="text-sm text-gray-600 mt-1">${project.address}</p>
                            </div>
                        </div>

                        <div class="space-y-3 mb-4">
                            <div class="flex justify-between text-sm">
                                <span class="text-gray-600">Müteahhit:</span>
                                <span class="font-medium">${project.contractor}</span>
                            </div>
                            <div class="flex justify-between text-sm">
                                <span class="text-gray-600">Başlangıç:</span>
                                <span class="font-medium">${new Date(project.startDate).toLocaleDateString('tr-TR')}</span>
                            </div>
                            <div class="flex justify-between text-sm">
                                <span class="text-gray-600">Tahmini Bitiş:</span>
                                <span class="font-medium">${new Date(project.details.completion).toLocaleDateString('tr-TR')}</span>
                            </div>
                        </div>

                        <div class="space-y-2 mb-4">
                            <div class="flex justify-between items-center">
                                <span class="text-sm text-gray-600">İlerleme Durumu</span>
                                <span class="text-sm font-medium text-gray-900">${project.progress}%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="bg-primary h-2 rounded-full" style="width: ${project.progress}%"></div>
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-3 text-center pt-4 border-t">
                            <div class="text-sm">
                                <p class="text-gray-500">Daire Sayısı</p>
                                <p class="font-semibold text-gray-900">${project.details.units} Adet</p>
                            </div>
                            <div class="text-sm">
                                <p class="text-gray-500">Toplam Alan</p>
                                <p class="font-semibold text-gray-900">${project.details.area} m²</p>
                            </div>
                        </div>

                        <div class="mt-6 flex justify-between space-x-3">
                            <button onclick="viewProjectDetails('${project.id}')" 
                                    class="flex-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors text-sm">
                                Detayları Görüntüle
                            </button>
                            <button onclick="viewProjectDocuments('${project.id}')"
                                    class="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                                Dökümanlar
                            </button>
                        </div>
                    </div>
                </div>
                `;
        }).join('');
    }

    // --- "MY LISTINGS" SECTION ---

    function renderCustomerListings() {
        const container = document.getElementById('customer-listings-list');
        if (!container) return;

        const activeListings = customerData.listings.filter(l => l.status === 'active');

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
                            <span class="text-gray-600">Beklenen Daire:</span>
                            <span class="font-medium">${listing.expectedUnits || 'Belirlenmedi'} adet</span>
                        </div>
                    </div>

                    <div class="flex flex-wrap gap-2 mb-4">
                        <span class="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">
                            ${listing.type || 'Konut'}
                        </span>
                        <a href="#" onclick="showSection('offers-section'); return false;" 
                            class="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs hover:bg-blue-200 transition-colors">
                            ${listing.offersCount} Teklif
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

    function openEditListingModal(listingId) {
        const listing = customerData.listings.find(l => l.id === listingId);
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
        document.getElementById('co-owner-count').value = listing.coOwners.length;
        handleCoOwnerCountChange();
        // Populate co-owner fields after they are rendered
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
        const currentUser = customerData.name;
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
        customerData.listings.push(newListing);

        // Close modal and show success notification
        closeModal('create-listing-modal');
        showNotification('İlan başarıyla oluşturuldu! İmar çapı işlemlerini başlatabilirsiniz.', 'success');

        // Render updated listings
        renderCustomerListings();

        // Ask user if they want to start imar çapı process
        setTimeout(() => {
            if (confirm('İlanınız başarıyla oluşturuldu. İmar çapı sürecini şimdi başlatmak ister misiniz?')) {
                openImarCapiProcessModal(newListing.id);
            }
        }, 500);
    }

    function updateListing(listingId) {
        const listingIndex = customerData.listings.findIndex(l => l.id === listingId);
        if (listingIndex === -1) return;

        const listing = customerData.listings[listingIndex];

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

        renderCustomerListings();
        closeModal('create-listing-modal');
        showNotification('İlan başarıyla güncellendi!', 'success');
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

    function appendImagePreview(src, index, type, isParcelMap = false, listingId = null) {
        const previewContainer = document.getElementById('image-preview-container');
        const isRemovable = !isParcelMap;
        const deleteButtonHtml = isParcelMap
            ? `<div class="absolute top-1 right-1 bg-gray-800 text-white text-xs px-2 py-1 rounded-full opacity-80 cursor-default" title="Bu görsel parsel sorgusu ile eklenmiştir ve silinemez."><i class="fas fa-map-marked-alt mr-1"></i> Harita</div>`
            : `<div class="delete-btn" onclick="removeImage(${index}, '${type}', ${listingId})" title="Sil">&times;</div>`;

        previewContainer.insertAdjacentHTML('beforeend', `
                <div class="image-preview-item" id="img-${type}-${index}">
                    <img src="${src}" class="w-full h-24 object-cover rounded-lg border">
                    ${deleteButtonHtml}
                </div>
            `);
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
            const listing = customerData.listings.find(l => l.id === listingId);
            if (listing && listing.images[index]) {
                listing.images.splice(index, 1);
                // After removing from data, re-render the modal's images
                openEditListingModal(listingId);
            }
        }
    }

    // --- CO-OWNER MANAGEMENT ---

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
        const cardHtml = `
            <div class="p-4 border rounded-lg bg-gray-50 co-owner-card" data-index="${index}" id="co-owner-card-${index}">
                <div class="flex justify-between items-center mb-4">
                    <h4 class="font-semibold text-gray-800 co-owner-title">Hak Sahibi ${index + 1}</h4>
                    <button type="button" onclick="removeCoOwnerInput(this)" class="text-red-500 hover:text-red-700" title="Hak Sahibini Sil">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" name="co-owner-name" placeholder="Adı Soyadı" class="p-2 border rounded-lg w-full" aria-label="Adı Soyadı">
                    <input type="text" name="co-owner-tc" placeholder="TC Kimlik Numarası" class="p-2 border rounded-lg w-full" maxlength="11" pattern="[0-9]{11}" title="11 haneli TC kimlik numaranızı girin." aria-label="TC Kimlik Numarası">
                    <input type="tel" name="co-owner-phone" placeholder="Telefon Numarası" class="p-2 border rounded-lg w-full" aria-label="Telefon Numarası">
                    <div class="flex items-center space-x-2">
                        <input type="file" id="deed-upload-${index}" onchange="handleCoOwnerDocumentUpload(event, ${index})" class="hidden" accept="image/*,application/pdf">
                        <label for="deed-upload-${index}" class="cursor-pointer bg-white border border-gray-300 text-sm font-medium px-3 py-2 rounded-lg hover:bg-gray-50">
                           <i class="fas fa-upload mr-2"></i>Tapu Belgesi Yükle
                        </label>
                        <p id="deed-file-info-${index}" class="text-xs text-gray-600 hidden deed-file-info"></p>
                    </div>
                     <div class="md:col-span-2 flex justify-end">
                         <button type="button" id="verify-btn-${index}" onclick="verifyCoOwnerDocument(${index})" class="bg-white border border-gray-300 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-50 verify-btn">
                            Doğrula
                        </button>
                    </div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', cardHtml);
    }

    function handleCoOwnerDocumentUpload(event, ownerIndex) {
        const file = event.target.files[0];
        if (!file) return;

        temporaryDeedFiles[ownerIndex] = file;

        const fileInfo = document.getElementById(`deed-file-info-${ownerIndex}`);
        fileInfo.textContent = `Yüklendi: ${file.name}`;
        fileInfo.classList.remove('hidden');
        showNotification(`Hak Sahibi ${ownerIndex + 1} için belge yüklendi.`, 'info');
    }

    function verifyCoOwnerDocument(ownerIndex) {
        const button = document.getElementById(`verify-btn-${ownerIndex}`);
        const originalHtml = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Doğrulanıyor...';
        button.disabled = true;

        setTimeout(() => {
            // Simulation
            const card = document.getElementById(`co-owner-card-${ownerIndex}`);
            const tc = card.querySelector('[name="co-owner-tc"]').value;
            if (tc.length === 11 && temporaryDeedFiles[ownerIndex]) {
                button.innerHTML = '<i class="fas fa-check-circle text-green-500 mr-2"></i>Doğrulandı';
                showNotification(`Hak Sahibi ${ownerIndex + 1} bilgileri doğrulandı.`, 'success');
            } else {
                showNotification(`Lütfen Hak Sahibi ${ownerIndex + 1} için geçerli bir TC ve tapu belgesi sağlayın.`, 'error');
                button.innerHTML = originalHtml;
                button.disabled = false;
            }
        }, 1500);
    }

    function generateApprovalLink(listingId, ownerId) {
        const token = btoa(`${listingId}-${ownerId}-${Date.now()}`).slice(0, 20);
        return `/onay.html?token=${token}`; // Simulated link
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

    function openListingDetailsModal(listingId) {
        const listing = customerData.listings.find(l => l.id === listingId);
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
        const listingIndex = customerData.listings.findIndex(l => l.id === listingId);

        if (listingIndex !== -1) {
            // Option 2: Mark as cancelled
            customerData.listings[listingIndex].status = 'cancelled';
            showNotification('İlan başarıyla iptal edildi.', 'success');
        } else {
            showNotification('Hata: İlan bulunamadı.', 'error');
        }

        closeModal('cancel-listing-modal');
        renderCustomerListings();
        renderCustomerDashboard(); // Update stats
    }

    // --- OFFERS & VOTING ---
    function openOfferDetailsModal(offerId) {
        const offer = customerData.offers.find(o => o.id === offerId);
        if (!offer) return;

        const listing = customerData.listings.find(l => l.id === offer.listingId);
        if (!listing) return;

        document.getElementById('offer-modal-title').textContent = `Teklif Detayları - ${offer.contractorName}`;
        const body = document.getElementById('offer-modal-body');

        const filesHtml = offer.designFiles.length > 0 ? offer.designFiles.map(file => `
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                <div class="flex items-center space-x-3 overflow-hidden">
                    <img src="${file.thumbnail}" alt="${file.name}" class="w-12 h-12 object-cover rounded-md flex-shrink-0">
                    <div class="flex-grow overflow-hidden">
                        <p class="font-semibold text-gray-800 truncate">${file.name}</p>
                        <p class="text-xs text-gray-500">${file.type.toUpperCase()}</p>
                    </div>
                </div>
                <div class="flex items-center space-x-2 flex-shrink-0 ml-2">
                    <button onclick="viewDesignFile('${file.url}')" title="Görüntüle" class="text-gray-500 hover:text-primary p-1"><i class="fas fa-eye"></i></button>
                    <button onclick="downloadDesignFile('${file.url}')" title="İndir" class="text-gray-500 hover:text-primary p-1"><i class="fas fa-download"></i></button>
                    <button onclick="shareDesignFile('${file.url}')" title="Paylaş" class="text-gray-500 hover:text-primary p-1"><i class="fas fa-share-alt"></i></button>
                </div>
            </div>
        `).join('') : '<p class="text-gray-500">Yüklenecek tasarım dosyası bulunmuyor.</p>';

        body.innerHTML = `
            <div class="space-y-8">
                <!-- Müteahhit Bilgileri -->
                <div class="bg-white p-6 rounded-xl border border-gray-200">
                    <h4 class="text-lg font-semibold text-gray-800 mb-4">Müteahhit Bilgileri</h4>
                    <div class="flex justify-between items-center">
                        <div>
                            <p class="text-gray-600">Firma Adı</p>
                            <p class="text-lg font-medium text-gray-900">${offer.contractorName}</p>
                        </div>
                        <div class="flex flex-col items-end">
                        <div class="flex items-center space-x-1 text-yellow-500">
                                ${'<i class="fas fa-star"></i>'.repeat(Math.floor(offer.contractorRating))}
                                ${offer.contractorRating % 1 !== 0 ? '<i class="fas fa-star-half-alt"></i>' : ''}
                            </div>
                            <p class="text-sm text-gray-600 mt-1">${offer.contractorRating} / 5.0</p>
                        </div>
                    </div>
                </div>

                <!-- Finansal Teklif -->
                <div class="bg-white p-6 rounded-xl border border-gray-200">
                    <h4 class="text-lg font-semibold text-gray-800 mb-4">Finansal Teklif</h4>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <p class="text-sm text-gray-600">Hane Başına Maliyet</p>
                            <p class="text-xl font-semibold text-gray-900 mt-1">${offer.financials.costPerOwner.toLocaleString('tr-TR')} TL</p>
                        </div>
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <p class="text-sm text-gray-600">Toplam Daire</p>
                            <p class="text-xl font-semibold text-gray-900 mt-1">${offer.financials.totalApartments} Adet</p>
                        </div>
                        <div class="md:col-span-2 bg-gray-50 p-4 rounded-lg">
                            <p class="text-sm text-gray-600">Daire Tipleri</p>
                            <p class="text-lg font-medium text-gray-900 mt-1">${offer.financials.apartmentConfigs}</p>
                        </div>
                    </div>
                </div>

                <!-- Daire Özellikleri -->
                <div class="bg-white p-6 rounded-xl border border-gray-200">
                    <h4 class="text-lg font-semibold text-gray-800 mb-4">Daire Özellikleri ve Süre</h4>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <p class="text-sm text-gray-600">WC Sayısı</p>
                            <p class="text-xl font-semibold text-gray-900 mt-1">${offer.specs.wc}</p>
                        </div>
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <p class="text-sm text-gray-600">Banyo Sayısı</p>
                            <p class="text-xl font-semibold text-gray-900 mt-1">${offer.specs.bathrooms}</p>
                        </div>
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <p class="text-sm text-gray-600">Balkon Sayısı</p>
                            <p class="text-xl font-semibold text-gray-900 mt-1">${offer.specs.balconies}</p>
                        </div>
                        <div class="bg-gray-50 p-4 rounded-lg">
                            <p class="text-sm text-gray-600">İnşaat Süresi</p>
                            <p class="text-xl font-semibold text-gray-900 mt-1">${offer.constructionTime} Ay</p>
                        </div>
                    </div>
                </div>

                <!-- Tasarım Dosyaları -->
                <div class="bg-white p-6 rounded-xl border border-gray-200">
                    <h4 class="text-lg font-semibold text-gray-800 mb-4">Tasarım Dosyaları</h4>
                    <div class="space-y-3">${filesHtml}</div>
                </div>

                <!-- Oylama Durumu -->
                <div class="bg-white p-6 rounded-xl border border-gray-200">
                    <h4 class="text-lg font-semibold text-gray-800 mb-4">Oylama Durumu</h4>
                    <div class="space-y-3">
                        ${listing.coOwners.map(owner => {
            const ownerVote = offer.votes.find(v => v.coOwnerEmail === owner.email);
            let voteText = 'Beklemede';
            let voteClass = 'text-yellow-600';
            let bgClass = 'bg-yellow-50';
            let icon = 'fa-clock';

            if (ownerVote) {
                if (ownerVote.vote === 'accept') {
                    voteText = 'Kabul';
                    voteClass = 'text-green-600';
                    bgClass = 'bg-green-50';
                    icon = 'fa-check-circle';
                } else {
                    voteText = 'Red';
                    voteClass = 'text-red-600';
                    bgClass = 'bg-red-50';
                    icon = 'fa-times-circle';
                }
            }

            const isYou = owner.isCurrentUser || owner.email === currentUserId;
            return `
                                <div class="flex items-center justify-between ${bgClass} p-3 rounded-lg">
                                    <div class="flex items-center space-x-2">
                                        <i class="fas fa-user text-gray-400"></i>
                                        <span class="font-medium text-gray-900">${owner.name} ${isYou ? '(Siz)' : ''}</span>
                                    </div>
                                    <div class="flex items-center space-x-2 ${voteClass}">
                                        <i class="fas ${icon}"></i>
                                        <span class="font-medium">${voteText}</span>
                                    </div>
                                </div>
                            `;
        }).join('')}
                    </div>
                </div>
            </div>
        `;

        const footer = document.getElementById('offer-modal-footer');
        if (offer.status === 'pending') {
            footer.innerHTML = `
                <button onclick="closeModal('offer-details-modal')" class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">Kapat</button>
                <button onclick="rejectOffer('${offer.id}')" class="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700">Teklifi Reddet</button>
                <button onclick="acceptOffer('${offer.id}')" class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">Teklifi Kabul Et</button>
            `;
        } else {
            footer.innerHTML = `<button onclick="closeModal('offer-details-modal')" class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">Kapat</button>`;
        }

        openModal('offer-details-modal');
    }

    function acceptOffer(offerId) {
        const offer = customerData.offers.find(o => o.id === offerId);
        const listing = customerData.listings.find(l => l.id === offer.listingId);

        if (listing.coOwners.length > 1) {
            openAcceptOfferModal(offerId);
        } else {
            // Tek hak sahibi, direkt kabul etme (onay modalı yine de gösterilebilir)
            openAcceptOfferModal(offerId);
        }
    }

    function rejectOffer(offerId) {
        document.getElementById('reject-offer-id-input').value = offerId;
        openModal('reject-offer-modal');
    }

    function openAcceptOfferModal(offerId) {
        const offer = customerData.offers.find(o => o.id === offerId);
        const listing = customerData.listings.find(l => l.id === offer.listingId);
        const body = document.getElementById('accept-offer-body');
        const confirmButton = document.getElementById('confirm-accept-button');

        document.getElementById('accept-offer-id-input').value = offerId;

        if (listing.coOwners.length > 1) {
            const allApproved = listing.coOwners
                .filter(o => !o.isCurrentUser)
                .every(o => o.approvalStatus === 'approved');

            // This is a simplified check. A real app would check votes on the specific offer.
            // Let's check votes on the offer object instead.
            const requiredVotes = Math.ceil(listing.coOwners.length / 2);
            const currentAcceptVotes = offer.votes.filter(v => v.vote === 'accept').length;

            body.innerHTML = `
                <p>Bu teklifi kabul etmek istediğinizden emin misiniz?</p>
                <div class="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p class="font-semibold text-yellow-800">Çoklu Hak Sahibi Uyarısı (${currentAcceptVotes}/${listing.coOwners.length} Onay)</p>
                    <p class="text-sm text-yellow-700">Bu ilanın kabul edilmesi için en az ${requiredVotes} hak sahibinin onayı gerekmektedir. Onayınızla birlikte teklif kabul edilebilir veya diğer ortakların onayı beklenebilir.</p>
                </div>
                 <div class="mt-4 flex items-center">
                    <input type="checkbox" id="co-owner-consent-checkbox" onchange="document.getElementById('confirm-accept-button').disabled = !this.checked">
                    <label for="co-owner-consent-checkbox" class="ml-2 text-sm text-gray-700">Bu adımı anladığımı ve kendi adıma KABUL oyu verdiğimi onaylıyorum.</label>
                </div>
            `;
            confirmButton.disabled = true;
        } else {
            body.innerHTML = `<p>Bu teklifi kabul ettiğinizde müteahhit ile anlaşma süreci başlayacaktır. Emin misiniz?</p>`;
            confirmButton.disabled = false;
        }

        openModal('accept-offer-modal');
    }

    function confirmAcceptOffer() {
        const offerId = document.getElementById('accept-offer-id-input').value;
        const offer = customerData.offers.find(o => o.id === offerId);
        if (!offer) return;

        offer.status = 'accepted';
        // Diğer tüm teklifleri reddet
        customerData.offers.forEach(o => {
            if (o.listingId === offer.listingId && o.id !== offer.id) {
                o.status = 'rejected';
            }
        });

        const listing = customerData.listings.find(l => l.id === offer.listingId);
        if (listing) {
            listing.status = 'project'; // İlanı proje aşamasına geçir
        }

        showNotification(`'${offer.contractorName}' teklifi kabul edildi ve proje aşamasına geçildi.`, 'success');
        closeModal('accept-offer-modal');
        renderOffers();
        renderCustomerDashboard();
        // Also re-render details modal if it's open
        if (!document.getElementById('offer-details-modal').classList.contains('hidden')) {
            openOfferDetailsModal(offerId);
        }
        checkAndArchiveCompletedProjects();
    }

    function confirmRejectOffer() {
        const offerId = document.getElementById('reject-offer-id-input').value;
        const offer = customerData.offers.find(o => o.id === offerId);
        if (offer) {
            offer.status = 'rejected';
            showNotification('Teklif başarıyla reddedildi.', 'success');
        }
        closeModal('reject-offer-modal');
        renderOffers();
    }

    function viewDesignFile(fileUrl) {
        openContractDetailsModal(fileUrl);
    }

    function downloadDesignFile(fileUrl) {
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileUrl.split('/').pop() || 'document.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showNotification('Dosya indiriliyor...', 'success');
    }

    function shareDesignFile(fileUrl) {
        if (navigator.share) {
            navigator.share({
                title: 'DönüşümAY Tasarım Dosyası',
                text: 'DönüşümAY üzerinden paylaşılan tasarım dosyası',
                url: fileUrl
            }).catch(err => {
                showNotification('Paylaşım sırasında bir hata oluştu.', 'error');
            });
        } else {
            navigator.clipboard.writeText(fileUrl).then(() => {
                showNotification('Dosya bağlantısı panoya kopyalandı!', 'success');
            }).catch(() => {
                showNotification('Bağlantı kopyalanırken bir hata oluştu.', 'error');
            });
        }
    }

    function downloadDesignFile(fileUrl) {
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileUrl.split('/').pop() || 'document.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showNotification('Dosya indiriliyor...', 'success');
    }

    function shareDesignFile(fileUrl) {
        if (navigator.share) {
            navigator.share({
                title: 'DönüşümAY Tasarım Dosyası',
                text: 'DönüşümAY üzerinden paylaşılan tasarım dosyası',
                url: fileUrl
            }).catch(err => {
                showNotification('Paylaşım sırasında bir hata oluştu.', 'error');
            });
        } else {
            navigator.clipboard.writeText(fileUrl).then(() => {
                showNotification('Dosya bağlantısı panoya kopyalandı!', 'success');
            }).catch(() => {
                showNotification('Bağlantı kopyalanırken bir hata oluştu.', 'error');
            });
        }
    }

    function voteOnOffer(offerId, vote) {
        const offer = customerData.offers.find(o => o.id === offerId);
        if (!offer || offer.votes.find(v => v.coOwnerEmail === currentUserId)) return;

        offer.votes.push({ coOwnerEmail: currentUserId, vote: vote });

        const acceptedCount = offer.votes.filter(v => v.vote === 'accept').length;
        if (acceptedCount >= offer.requiredVotes) {
            offer.status = 'accepted';
            showNotification(`'${offer.contractorName}' teklifi kabul edildi!`, 'success');
        } else {
            showNotification(`Oyunuz kaydedildi: ${vote === 'accept' ? 'Kabul' : 'Red'}.`, 'info');
        }

        closeModal('offer-details-modal');
        renderCustomerDashboard();
    }

    // --- OTHER SECTIONS (PLACEHOLDERS) ---
    function renderOffers() {
        const container = document.getElementById('offers-content');
        if (!container) return;

        const pendingOffers = customerData.offers.filter(o => o.status === 'pending');

        if (pendingOffers.length === 0) {
            container.innerHTML = `<div class="col-span-full text-center py-12 bg-white rounded-lg shadow-sm border">
                <i class="fas fa-folder-open fa-3x text-gray-300 mb-4"></i>
                <h3 class="text-xl font-semibold text-gray-700">Değerlendirilecek yeni teklif bulunmuyor.</h3>
                <p class="text-gray-500 mt-2">İlanlarınıza yeni teklifler geldiğinde burada listelenecektir.</p>
            </div>`;
            return;
        }

        container.innerHTML = `<div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">` + pendingOffers.map(offer => {
            const listing = customerData.listings.find(l => l.id === offer.listingId);
            if (!listing) return '';

            return `
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                <div class="p-5 flex-grow flex flex-col">
                    <div>
                        <p class="text-xs text-primary font-medium">${listing.title}</p>
                        <div class="flex justify-between items-start mt-1">
                             <h4 class="font-bold text-lg text-gray-800">${offer.contractorName}</h4>
                             <div class="flex items-center space-x-1 text-yellow-500">
                                <i class="fas fa-star text-base"></i>
                                <span class="font-bold text-gray-700">${offer.contractorRating}</span>
                            </div>
                        </div>
                    </div>
                    <p class="text-sm text-gray-600 my-4 flex-grow">${offer.details}</p>
                    <div class="mt-auto pt-4 border-t border-gray-100 flex items-center justify-center space-x-2">
                        <button onclick="openOfferDetailsModal('${offer.id}')" class="text-sm bg-blue-100 text-blue-700 font-semibold px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors">Detaylar</button>
                        <button onclick="rejectOffer('${offer.id}')" class="text-sm bg-red-100 text-red-700 font-semibold px-4 py-2 rounded-lg hover:bg-red-200 transition-colors">Reddet</button>
                        <button onclick="acceptOffer('${offer.id}')" class="text-sm bg-green-100 text-green-700 font-semibold px-4 py-2 rounded-lg hover:bg-green-200 transition-colors">Kabul Et</button>
                    </div>
                </div>
            </div>
            `;
        }).join('') + `</div>`;
    }
    
    // Tab switching for offers section
    function switchOffersTab(tabType) {
        // Tab buttons
        const incomingTab = document.getElementById('incoming-offers-tab');
        const myTab = document.getElementById('my-offers-tab');
        
        // Tab contents
        const incomingContent = document.getElementById('incoming-offers-content');
        const myContent = document.getElementById('my-offers-content');
        
        if (tabType === 'incoming') {
            // Activate incoming tab
            incomingTab.className = 'offers-tab-button-active py-4 px-1 border-b-2 font-medium text-sm border-purple-500 text-purple-600';
            myTab.className = 'offers-tab-button py-4 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300';
            
            // Show incoming content
            incomingContent.classList.remove('hidden');
            myContent.classList.add('hidden');
            
            // Refresh incoming offers
            renderOffers();
        } else if (tabType === 'my') {
            // Activate my offers tab
            myTab.className = 'offers-tab-button-active py-4 px-1 border-b-2 font-medium text-sm border-purple-500 text-purple-600';
            incomingTab.className = 'offers-tab-button py-4 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300';
            
            // Show my offers content
            myContent.classList.remove('hidden');
            incomingContent.classList.add('hidden');
            
            // Refresh my offers
            renderMyOffers();
        }
    }
    
    // Render customer's purchase offers
    function renderMyOffers() {
        const container = document.getElementById('my-offers-list');
        if (!container) return;

        // Get purchase offers from localStorage
        const storedOffers = JSON.parse(localStorage.getItem('customerPurchaseOffers') || '[]');
        
        // Mock data for demonstration (merge with stored offers)
        const mockOffers = [
            {
                id: 'purchase-demo-001',
                apartmentTitle: 'Çankaya\'da Modern 2+1 Daire',
                apartmentLocation: 'Çankaya, Ankara',
                apartmentPrice: 1650000,
                downPayment: 1200000,
                remainingAmount: 450000,
                installmentCount: 12,
                monthlyPayment: 37500,
                offerDate: '14.12.2024',
                status: 'accepted',
                sellerResponse: 'Teklifinizi kabul ediyoruz. İletişime geçelim.',
                apartmentImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=400&auto=format&fit=crop'
            },
            {
                id: 'purchase-demo-002',
                apartmentTitle: 'Beşiktaş\'ta Lüks 4+1 Daire',
                apartmentLocation: 'Beşiktaş, İstanbul',
                apartmentPrice: 8500000,
                downPayment: 3000000,
                remainingAmount: 5500000,
                installmentCount: 48,
                monthlyPayment: 114583,
                offerDate: '13.12.2024',
                status: 'rejected',
                sellerResponse: 'Peşin ödeme tutarı yetersiz. En az %50 peşin gereklidir.',
                apartmentImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=400&auto=format&fit=crop'
            }
        ];
        
        // Combine stored offers with mock offers
        const myPurchaseOffers = [...storedOffers, ...mockOffers].sort((a, b) => {
            // Sort by date (newest first)
            const dateA = new Date(a.offerDate.split('.').reverse().join('-'));
            const dateB = new Date(b.offerDate.split('.').reverse().join('-'));
            return dateB - dateA;
        });

        if (myPurchaseOffers.length === 0) {
            container.innerHTML = `
                <div class="text-center py-12 bg-white rounded-lg shadow-sm border">
                    <i class="fas fa-handshake fa-3x text-gray-300 mb-4"></i>
                    <h3 class="text-xl font-semibold text-gray-700">Henüz bir satın alma teklifi vermediniz.</h3>
                    <p class="text-gray-500 mt-2">Daire ilanlarına göz atarak satın alma teklifi verebilirsiniz.</p>
                    <a href="daire-ilanlari.html?from=customer" 
                       class="inline-block mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                        Daire İlanlarını Görüntüle
                    </a>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                ${myPurchaseOffers.map(offer => `
                    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <!-- Apartment Image -->
                        <div class="h-48 overflow-hidden">
                            <img src="${offer.apartmentImage}" alt="${offer.apartmentTitle}" 
                                 class="w-full h-full object-cover">
                        </div>
                        
                        <!-- Offer Content -->
                        <div class="p-5">
                            <!-- Status Badge -->
                            <div class="flex justify-between items-start mb-3">
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                    ${offer.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                      offer.status === 'accepted' ? 'bg-green-100 text-green-800' :
                                      'bg-red-100 text-red-800'}">
                                    ${offer.status === 'pending' ? 'Beklemede' :
                                      offer.status === 'accepted' ? 'Kabul Edildi' :
                                      'Reddedildi'}
                                </span>
                                <span class="text-xs text-gray-500">${offer.offerDate}</span>
                            </div>
                            
                            <!-- Apartment Info -->
                            <h4 class="font-semibold text-gray-800 mb-1 line-clamp-2">${offer.apartmentTitle}</h4>
                            <p class="text-sm text-gray-600 mb-3">
                                <i class="fas fa-map-marker-alt mr-1"></i>
                                ${offer.apartmentLocation}
                            </p>
                            
                            <!-- Financial Details -->
                            <div class="space-y-2 mb-4 text-sm">
                                <div class="flex justify-between">
                                    <span class="text-gray-600">Daire Fiyatı:</span>
                                    <span class="font-medium">${formatCurrency(offer.apartmentPrice)} ₺</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-600">Peşin Ödeme:</span>
                                    <span class="font-medium text-green-600">${formatCurrency(offer.downPayment)} ₺</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-600">Aylık Taksit:</span>
                                    <span class="font-medium text-blue-600">${formatCurrency(offer.monthlyPayment)} ₺ (${offer.installmentCount} ay)</span>
                                </div>
                            </div>
                            
                            <!-- Seller Response -->
                            ${offer.sellerResponse ? `
                                <div class="mt-3 p-3 rounded-lg ${offer.status === 'accepted' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}">
                                    <p class="text-sm ${offer.status === 'accepted' ? 'text-green-700' : 'text-red-700'}">
                                        <i class="fas ${offer.status === 'accepted' ? 'fa-check-circle' : 'fa-times-circle'} mr-1"></i>
                                        ${offer.sellerResponse}
                                    </p>
                                </div>
                            ` : ''}
                            
                            <!-- Action Buttons -->
                            <div class="mt-4 flex space-x-2">
                                <button onclick="viewPurchaseOfferDetails('${offer.id}')" 
                                        class="flex-1 bg-purple-100 text-purple-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors">
                                    Detayları Gör
                                </button>
                                ${offer.status === 'accepted' ? `
                                    <button onclick="proceedWithPurchase('${offer.id}')" 
                                            class="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                                        Süreci Başlat
                                    </button>
                                ` : offer.status === 'pending' ? `
                                    <button onclick="cancelPurchaseOffer('${offer.id}')" 
                                            class="flex-1 bg-red-100 text-red-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors">
                                        İptal Et
                                    </button>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    // View purchase offer details
    function viewPurchaseOfferDetails(offerId) {
        showNotification('Teklif detayları modalı açılacak...', 'info');
    }
    
    // Proceed with accepted purchase
    function proceedWithPurchase(offerId) {
        showNotification('Satın alma süreci başlatılıyor...', 'success');
    }
    
    // Cancel pending purchase offer
    function cancelPurchaseOffer(offerId) {
        if (confirm('Bu teklifi iptal etmek istediğinizden emin misiniz?')) {
            // Remove from localStorage if it's a real offer (not a demo offer)
            if (!offerId.includes('demo')) {
                const existingOffers = JSON.parse(localStorage.getItem('customerPurchaseOffers') || '[]');
                const updatedOffers = existingOffers.filter(offer => offer.id !== offerId);
                localStorage.setItem('customerPurchaseOffers', JSON.stringify(updatedOffers));
            }
            
            showNotification('Teklifiniz iptal edildi.', 'info');
            renderMyOffers(); // Refresh the list
        }
    }
    
    function renderProjects() {
        showSubTab('design');
    }

    function renderApplicationProjects() {
        const container = document.getElementById('application-projects-container');
        if (!container) return;

        // Örnek proje verileri
        const projects = [
            {
                id: 'proj1',
                title: 'Kadıköy Rezidans Projesi',
                address: 'Kadıköy, İstanbul',
                contractor: 'Yıldız İnşaat Ltd. Şti.',
                startDate: '2025-01-15',
                status: 'in_progress',
                progress: 65,
                details: {
                    area: 2500,
                    floors: 12,
                    units: 48,
                    completion: '2025-12-30'
                },
                lastUpdate: '2025-03-20',
                thumbnail: 'https://placehold.co/600x400/e2e8f0/a0aec0?text=Proje+Görseli'
            },
            {
                id: 'proj2',
                title: 'Bahçelievler Modern Sitesi',
                address: 'Bahçelievler, İstanbul',
                contractor: 'Mega Yapı A.Ş.',
                startDate: '2025-02-01',
                status: 'pending_approval',
                progress: 30,
                details: {
                    area: 3200,
                    floors: 8,
                    units: 64,
                    completion: '2026-03-15'
                },
                lastUpdate: '2025-03-18',
                thumbnail: 'https://placehold.co/600x400/e2e8f0/a0aec0?text=Proje+Görseli'
            },
            {
                id: 'proj3',
                title: 'Ataşehir Yeşil Vadi Konutları',
                address: 'Ataşehir, İstanbul',
                contractor: 'Doğa İnşaat Ltd. Şti.',
                startDate: '2025-03-01',
                status: 'design_phase',
                progress: 15,
                details: {
                    area: 4500,
                    floors: 15,
                    units: 90,
                    completion: '2026-06-30'
                },
                lastUpdate: '2025-03-15',
                thumbnail: 'https://placehold.co/600x400/e2e8f0/a0aec0?text=Proje+Görseli'
            }
        ];

        if (projects.length === 0) {
            container.innerHTML = `<p class="text-gray-500 text-center py-8">Henüz aktif bir uygulama projeniz yok.</p>`;
            return;
        }

        container.innerHTML = projects.map(project => {
            // Durum rozetini belirle
            let statusBadge = '';
            switch (project.status) {
                case 'in_progress':
                    statusBadge = '<span class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Devam Ediyor</span>';
                    break;
                case 'pending_approval':
                    statusBadge = '<span class="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">Onay Bekliyor</span>';
                    break;
                case 'design_phase':
                    statusBadge = '<span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Tasarım Aşaması</span>';
                    break;
            }

            return `
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div class="relative">
                        <img src="${project.thumbnail}" alt="${project.title}" class="w-full h-48 object-cover">
                        <div class="absolute top-4 right-4">
                            ${statusBadge}
                        </div>
                    </div>
                    
                    <div class="p-6">
                        <div class="flex justify-between items-start mb-4">
                            <div>
                                <h3 class="text-lg font-bold text-gray-900">${project.title}</h3>
                                <p class="text-sm text-gray-600 mt-1">${project.address}</p>
                            </div>
                        </div>

                        <div class="space-y-3 mb-4">
                            <div class="flex justify-between text-sm">
                                <span class="text-gray-600">Müteahhit:</span>
                                <span class="font-medium">${project.contractor}</span>
                            </div>
                            <div class="flex justify-between text-sm">
                                <span class="text-gray-600">Başlangıç:</span>
                                <span class="font-medium">${new Date(project.startDate).toLocaleDateString('tr-TR')}</span>
                            </div>
                            <div class="flex justify-between text-sm">
                                <span class="text-gray-600">Tahmini Bitiş:</span>
                                <span class="font-medium">${new Date(project.details.completion).toLocaleDateString('tr-TR')}</span>
                            </div>
                        </div>

                        <div class="space-y-2 mb-4">
                            <div class="flex justify-between items-center">
                                <span class="text-sm text-gray-600">İlerleme Durumu</span>
                                <span class="text-sm font-medium text-gray-900">${project.progress}%</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="bg-primary h-2 rounded-full" style="width: ${project.progress}%"></div>
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-3 text-center pt-4 border-t">
                            <div class="text-sm">
                                <p class="text-gray-500">Daire Sayısı</p>
                                <p class="font-semibold text-gray-900">${project.details.units} Adet</p>
                            </div>
                            <div class="text-sm">
                                <p class="text-gray-500">Toplam Alan</p>
                                <p class="font-semibold text-gray-900">${project.details.area} m²</p>
                            </div>
                        </div>

                        <div class="mt-6 flex justify-between space-x-3">
                            <button onclick="viewProjectDetails('${project.id}')" 
                                    class="flex-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors text-sm">
                                Detayları Görüntüle
                            </button>
                            <button onclick="viewProjectDocuments('${project.id}')"
                                    class="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                                Dökümanlar
                            </button>
                        </div>
                    </div>
                </div>
                `;
        }).join('');
    }
    function renderLawyerCommunications() {
        document.getElementById('lawyer-content').innerHTML = '<p>Avukat süreçleri burada yönetilecek.</p>';
    }

    // --- DESIGN PROJECTS SECTION ---
    function showSubTab(subTabName) {
        // Sub-tab buttons
        document.getElementById('sub-tab-design').classList.toggle('active', subTabName === 'design');
        document.getElementById('sub-tab-application').classList.toggle('active', subTabName === 'application');
        // Sub-tab content
        document.getElementById('sub-tab-content-design').classList.toggle('hidden', subTabName !== 'design');
        document.getElementById('sub-tab-content-application').classList.toggle('hidden', subTabName !== 'application');

        if (subTabName === 'design') {
            switchDesignTab('ongoing');
        } else if (subTabName === 'application') {
            renderApplicationProjects();
        }
    }

    function switchDesignTab(tabName) {
        const ongoingTab = document.getElementById('ongoing-tab');
        const completedTab = document.getElementById('completed-tab');

        if (tabName === 'ongoing') {
            ongoingTab.classList.add('tab-button-active');
            ongoingTab.classList.remove('tab-button');
            completedTab.classList.remove('tab-button-active');
            completedTab.classList.add('tab-button');
        } else {
            completedTab.classList.add('tab-button-active');
            completedTab.classList.remove('tab-button');
            ongoingTab.classList.remove('tab-button-active');
            ongoingTab.classList.add('tab-button');
        }


        document.getElementById('ongoing-projects-container').classList.toggle('hidden', tabName !== 'ongoing');
        document.getElementById('completed-projects-container').classList.toggle('hidden', tabName === 'ongoing');

        checkAndArchiveCompletedProjects();

        const projects = customerData.designProjects.filter(p => {
            const isCorrectStatus = tabName === 'ongoing' ? p.status !== 'completed' : p.status === 'completed';
            return isCorrectStatus && !p.archived;
        });

        const containerId = tabName === 'ongoing' ? 'ongoing-projects-container' : 'completed-projects-container';
        const container = document.getElementById(containerId);

        if (projects.length === 0) {
            container.innerHTML = `<div class="col-span-full text-center py-12 bg-white rounded-lg shadow-sm border">
                <i class="fas fa-paint-roller fa-3x text-gray-300 mb-4"></i>
                <h3 class="text-xl font-semibold text-gray-700">Bu sekmede gösterilecek proje bulunmuyor.</h3>
            </div>`;
            return;
        }

        container.innerHTML = projects.map(project => {
            const listing = customerData.listings.find(l => l.id === project.listingId);
            const architect = customerData.architects.find(a => a.id === project.architectId);
            const statusMap = {
                ongoing: { text: 'Devam Ediyor', color: 'bg-blue-100 text-blue-800' },
                revision_pending: { text: 'Revizyon Bekliyor', color: 'bg-yellow-100 text-yellow-800' },
                completed: { text: 'Tamamlandı', color: 'bg-green-100 text-green-800' },
            };
            const statusInfo = statusMap[project.status] || { text: 'Bilinmiyor', color: 'bg-gray-100 text-gray-800' };
            const ongoingButtons = `
                <button onclick="openDesignProjectDetailsModal('${project.id}')" class="flex-1 text-sm bg-gray-100 text-gray-700 font-semibold px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">Detaylar</button>
                <button onclick="openChatModal('${project.id}', '${project.architectId}')" class="flex-1 text-sm bg-purple-100 text-purple-700 font-semibold px-4 py-2 rounded-lg hover:bg-purple-200 transition-colors">Mesaj Gönder</button>
                <button onclick="requestRevision('${project.id}')" class="flex-1 text-sm bg-orange-100 text-orange-700 font-semibold px-4 py-2 rounded-lg hover:bg-orange-200 transition-colors">Revizyon Talep Et</button>
            `;
            const completedButtons = `
                <button onclick="openDesignProjectDetailsModal('${project.id}')" class="flex-1 text-sm bg-gray-100 text-gray-700 font-semibold px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">Detaylar</button>
                <button onclick="openChatModal('${project.id}', '${project.architectId}')" class="flex-1 text-sm bg-purple-100 text-purple-700 font-semibold px-4 py-2 rounded-lg hover:bg-purple-200 transition-colors">Mesaj Gönder</button>
                <button onclick="viewProjectDocuments('${project.id}')" class="flex-1 text-sm bg-green-100 text-green-700 font-semibold px-4 py-2 rounded-lg hover:bg-green-200 transition-colors">Belgeleri Görüntüle</button>
            `;
            return `
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col group hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start">
                    <h4 class="font-bold text-lg text-gray-800">${project.title}</h4>
                    <span class="text-xs font-medium px-2.5 py-0.5 rounded-full ${statusInfo.color}">${statusInfo.text}</span>
                </div>
                <p class="text-sm text-gray-500 mt-1">İlan: ${listing?.title || 'Bilinmiyor'}</p>
                <p class="text-sm text-gray-500 mt-1 mb-4">Mimar: ${architect?.name || 'Bilinmiyor'}</p>
                <div class="mt-auto pt-4 border-t border-gray-100 flex items-center justify-end space-x-2">
                    ${project.status === 'completed' ? completedButtons : ongoingButtons}
                </div>
            </div>
            `;
        }).join('');
    }

    function openNewDesignRequestModal() {
        populateListingSelect();
        populateArchitectSelect();
        openModal('new-design-request-modal');
        document.addEventListener('DOMContentLoaded', function () {
            switchDesignTab('ongoing');
        });
    }

    function populateListingSelect() {
        const select = document.getElementById('new-project-listing-select');
        select.innerHTML = '<option value="">Proje için bir ilan seçin...</option>';
        customerData.listings.forEach(listing => {
            if (listing.status === 'active') { // Only allow projects for active listings
                select.innerHTML += `<option value="${listing.id}">${listing.title}</option>`;
            }
        });
    }

    function renderStars(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) stars += '<i class="fas fa-star text-yellow-500"></i>';
            else if (i - 0.5 <= rating) stars += '<i class="fas fa-star-half-alt text-yellow-500"></i>';
            else stars += '<i class="far fa-star text-yellow-500"></i>';
        }
        return stars;
    }

    function populateArchitectSelect() {
        const container = document.getElementById('new-project-architect-list');
        container.innerHTML = customerData.architects.map(arch => `
            <label class="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input type="radio" name="architect-select" value="${arch.id}" class="h-4 w-4 text-primary border-gray-300 focus:ring-primary">
                <div class="ml-3 flex-grow">
                    <p class="font-semibold text-gray-800">${arch.name}</p>
                    <p class="text-sm text-gray-600">${arch.specializations}</p>
                </div>
                <div class="flex items-center space-x-1" title="${arch.rating}/5.0">
                    ${renderStars(arch.rating)}
                </div>
            </label>
        `).join('');
    }

    function submitNewDesignRequest() {
        pendingProjectData = {
            id: 'proj-' + Date.now(),
            listingId: parseInt(document.getElementById('new-project-listing-select').value),
            architectId: document.querySelector('input[name="architect-select"]:checked')?.value,
            status: 'payment_pending',
            title: `Yeni Tasarım Projesi`, // Title will be refined
            designDetails: {
                floors: document.getElementById('design-floors').value,
                apartments: document.getElementById('design-apartments').value,
                apartmentsPerFloor: document.getElementById('design-apartments-per-floor').value,
                apartmentTypes: document.getElementById('design-apartment-types').value,
            },
            documents: [],
            chatHistory: [],
            archived: false,
        };

        if (!pendingProjectData.listingId || !pendingProjectData.architectId) {
            showNotification('Lütfen bir ilan ve mimar seçin.', 'error');
            pendingProjectData = null; // Clear pending data
            return;
        }

        openPaymentModal();
    }

    function openChatModal(projectId, architectId) {
        const project = customerData.designProjects.find(p => p.id === projectId) || customerData.applicationProjects.find(p => p.id === projectId);
        const architect = customerData.architects.find(a => a.id === architectId);

        document.getElementById('chat-modal-title').textContent = `Mimar ${architect.name} ile Mesajlaşma`;
        renderChatMessages(projectId);
        document.getElementById('chat-message-input').value = '';
        document.getElementById('chat-message-input').onkeydown = function (e) { if (e.key === 'Enter') sendMessage(projectId); };
        document.getElementById('chat-send-btn').onclick = function () { sendMessage(projectId); };
        document.getElementById('chat-file-input').value = '';
        openModal('chat-modal');
    }

    function requestRevision(projectId) {
        const project = customerData.designProjects.find(p => p.id === projectId);
        document.getElementById('revision-project-id-input').value = projectId;
        document.getElementById('revision-modal-title').textContent = `Revizyon Talep Et - ${project.title}`;
        document.getElementById('revision-details-textarea').value = '';
        openModal('revision-request-modal');
    }

    function submitRevisionRequest() {
        const projectId = document.getElementById('revision-project-id-input').value;
        const details = document.getElementById('revision-details-textarea').value;
        const project = customerData.designProjects.find(p => p.id === projectId);

        if (!details.trim()) {
            showNotification('Lütfen revizyon detaylarını girin.', 'warning');
            return;
        }

        project.status = 'revision_pending';
        showNotification('Revizyon talebiniz mimara iletildi.', 'success');
        closeModal('revision-request-modal');
        switchDesignTab('ongoing');
    }

    function viewProjectDocuments(projectId) {
        const project = customerData.designProjects.find(p => p.id === projectId);
        document.getElementById('documents-modal-title').textContent = `Belgeler - ${project.title}`;
        const body = document.getElementById('documents-modal-body');

        body.innerHTML = project.documents.map(file => `
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                <div class="flex items-center space-x-3 overflow-hidden">
                    <img src="${file.thumbnail}" alt="${file.name}" class="w-12 h-12 object-cover rounded-md flex-shrink-0">
                    <div class="flex-grow overflow-hidden">
                        <p class="font-semibold text-gray-800 truncate">${file.name}</p>
                        <p class="text-xs text-gray-500">${file.type.toUpperCase()}</p>
                    </div>
                </div>
                <div class="flex items-center space-x-2 flex-shrink-0 ml-2">
                    <button onclick="viewDesignFile('${file.url}')" title="Görüntüle" class="text-gray-500 hover:text-primary p-1"><i class="fas fa-eye"></i></button>
                    <button onclick="downloadDesignFile('${file.url}')" title="İndir" class="text-gray-500 hover:text-primary p-1"><i class="fas fa-download"></i></button>
                    <button onclick="shareDesignFile('${file.url}')" title="Paylaş" class="text-gray-500 hover:text-primary p-1"><i class="fas fa-share-alt"></i></button>
                </div>
            </div>
        `).join('');

        openModal('view-documents-modal');
    }

    function openDesignProjectDetailsModal(projectId) {
        const project = customerData.designProjects.find(p => p.id === projectId);
        const listing = customerData.listings.find(l => l.id === project.listingId);
        const architect = customerData.architects.find(a => a.id === project.architectId);
        const modal = document.getElementById('design-project-details-modal');
        modal.innerHTML = `
            <div class="bg-white rounded-xl shadow-lg w-full max-w-xl mx-auto transform transition-all modal-content flex flex-col" onclick="event.stopPropagation()">
                <div class="px-6 py-4 border-b flex justify-between items-center">
                    <h2 class="text-2xl font-bold text-gray-800">Tasarım Projesi Detayları</h2>
                    <button onclick="closeModal('design-project-details-modal')" class="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
                </div>
                <div class="p-6 max-h-[80vh] overflow-y-auto space-y-6">
                    <div class="bg-gray-50 rounded-lg p-4 border">
                        <h4 class="font-semibold text-primary mb-2">İlan Bilgileri</h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div><span class="text-gray-500">Başlık:</span> <span class="font-medium text-gray-800">${listing?.title || ''}</span></div>
                            <div><span class="text-gray-500">Arsa Alanı:</span> <span class="font-medium text-gray-800">${listing?.parcelInfo?.area || '-'} m²</span></div>
                            <div class="md:col-span-2"><span class="text-gray-500">Açıklama:</span> <span class="font-medium text-gray-800">${listing?.description || ''}</span></div>
                        </div>
                    </div>
                    <div class="bg-gray-50 rounded-lg p-4 border">
                        <h4 class="font-semibold text-primary mb-2">Mimar</h4>
                        <div class="flex items-center space-x-3">
                            <img src="https://randomuser.me/api/portraits/men/45.jpg" class="w-10 h-10 rounded-full border" alt="Mimar">
                            <span class="font-medium text-gray-800">${architect?.name || ''}</span>
                        </div>
                    </div>
                    <div class="bg-gray-50 rounded-lg p-4 border">
                        <h4 class="font-semibold text-primary mb-2">Tasarım Detayları</h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div><span class="text-gray-500">Kat Sayısı:</span> <span class="font-medium text-gray-800">${project.designDetails.floors}</span></div>
                            <div><span class="text-gray-500">Daire Sayısı:</span> <span class="font-medium text-gray-800">${project.designDetails.apartments}</span></div>
                            <div><span class="text-gray-500">1 Katta Daire:</span> <span class="font-medium text-gray-800">${project.designDetails.apartmentsPerFloor}</span></div>
                            <div><span class="text-gray-500">Daire Tipi:</span> <span class="font-medium text-gray-800">${project.designDetails.apartmentTypes}</span></div>
                        </div>
                    </div>
                </div>
                <div class="px-6 py-4 bg-gray-50 border-t flex justify-end">
                    <button type="button" onclick="closeModal('design-project-details-modal')" class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">Kapat</button>
                </div>
            </div>
        `;
        openModal('design-project-details-modal');
    }

    function renderApplicationProjects() {
        const container = document.getElementById('application-projects-container');
        const projects = customerData.applicationProjects.filter(p => {
            const listing = customerData.listings.find(l => l.id === p.listingId);
            return listing && listing.contractorAgreed && listing.lawyerApproved;
        });
        if (projects.length === 0) {
            container.innerHTML = `<div class="col-span-full text-center py-12 bg-white rounded-lg shadow-sm border">
                <i class="fas fa-hard-hat fa-3x text-gray-300 mb-4"></i>
                <h3 class="text-xl font-semibold text-gray-700">Henüz bir uygulama projeniz bulunmamaktadır.</h3>
                <p class="text-gray-500 mt-2">Bir müteahhitle anlaşıp sözleşme imzaladıktan sonra projeleriniz burada görünecektir.</p>
            </div>`;
            return;
        }
        container.innerHTML = projects.map(project => {
            const listing = customerData.listings.find(l => l.id === project.listingId);
            const architect = customerData.architects.find(a => a.id === project.architectId);
            return `
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col group hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start">
                    <h4 class="font-bold text-lg text-gray-800">${project.title}</h4>
                </div>
                <p class="text-sm text-gray-500 mt-1">İlan: ${listing?.title}</p>
                <p class="text-sm text-gray-500 mt-1 mb-4">Mimar: ${architect?.name}</p>
                <div class="mt-auto pt-4 border-t border-gray-100 flex items-center justify-end space-x-2">
                    <button onclick="openApplicationProjectDetailsModal('${project.id}')" class="flex-1 text-sm bg-gray-100 text-gray-700 font-semibold px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">Detaylar</button>
                    <button onclick="openChatModal('${project.id}', '${project.architectId}')" class="flex-1 text-sm bg-purple-100 text-purple-700 font-semibold px-4 py-2 rounded-lg hover:bg-purple-200">Mesaj Gönder</button>
                    <button onclick="viewProjectDocuments('${project.id}')" class="flex-1 text-sm bg-green-100 text-green-700 font-semibold px-4 py-2 rounded-lg hover:bg-green-200">Belgeleri Görüntüle</button>
                </div>
            </div>
            `;
        }).join('');
    }

    function openApplicationProjectDetailsModal(projectId) {
        const project = customerData.applicationProjects.find(p => p.id === projectId);
        const listing = customerData.listings.find(l => l.id === project.listingId);
        const architect = customerData.architects.find(a => a.id === project.architectId);
        const modal = document.getElementById('design-project-details-modal');
        modal.innerHTML = `
            <div class="bg-white rounded-xl shadow-2xl w-full max-w-2xl transform transition-all modal-content" onclick="event.stopPropagation()">
                <div class="px-6 py-4 border-b flex justify-between items-center">
                    <h2 class="text-xl font-bold text-gray-800">Uygulama Projesi Detayları - ${project.title}</h2>
                    <button onclick="closeModal('design-project-details-modal')" class="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
                </div>
                <div class="p-6 max-h-[70vh] overflow-y-auto space-y-4">
                    <div>
                        <h4 class="font-semibold text-gray-700">İlan Bilgileri</h4>
                        <p><strong>Başlık:</strong> ${listing?.title || ''}</p>
                        <p><strong>Arsa Alanı:</strong> ${listing?.parcelInfo?.area || '-'} m²</p>
                        <p><strong>Açıklama:</strong> ${listing?.description || ''}</p>
                    </div>
                    <div>
                        <h4 class="font-semibold text-gray-700">Mimar</h4>
                        <p>${architect?.name || ''}</p>
                    </div>
                </div>
                <div class="px-6 py-4 bg-gray-50 border-t flex justify-end">
                    <button type="button" onclick="closeModal('design-project-details-modal')" class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300">Kapat</button>
                </div>
            </div>
        `;
        openModal('design-project-details-modal');
    }

    function checkAndArchiveCompletedProjects() {
        const timeLimit = 7 * 24 * 60 * 60 * 1000; // 7 days in ms (not used in simulation)
        customerData.designProjects.forEach(p => {
            if (p.status === 'completed') {
                const listing = customerData.listings.find(l => l.id === p.listingId);
                if (listing && listing.contractorAgreed) {
                    p.archived = true;
                }
            }
        });
    }

    // --- PAYMENT ---
    function openPaymentModal() {
        showPaymentMethod('options');
        openModal('payment-modal');
    }

    function showPaymentMethod(method) {
        document.getElementById('payment-options-body').style.display = 'none';
        document.getElementById('payment-card-body').style.display = 'none';
        document.getElementById('payment-eft-body').style.display = 'none';

        if (method === 'options') document.getElementById('payment-options-body').style.display = 'block';
        else if (method === 'card') document.getElementById('payment-card-body').style.display = 'block';
        else if (method === 'eft') document.getElementById('payment-eft-body').style.display = 'block';
    }

    function processPayment(method) {
        if (!pendingProjectData) return;

        // Simulation of payment processing
        showNotification('Ödeme işleniyor...', 'info');

        setTimeout(() => {
            const listing = customerData.listings.find(l => l.id === pendingProjectData.listingId);
            pendingProjectData.title = `${listing.title} - Tasarım Projesi`;
            pendingProjectData.status = 'ongoing';

            customerData.designProjects.push(pendingProjectData);
            pendingProjectData = null; // Clear pending data

            showNotification('Ödeme başarılı! Tasarım talebiniz mimara iletildi.', 'success');
            closeModal('payment-modal');
            closeModal('new-design-request-modal');
            showSubTab('design');
        }, 2000);
    }


    // Contractor Info Modal Functions
    let currentContractorInfo = null;

    function openContractorInfoModal(projectId) {
        const process = customerData.legalProcesses.find(p => p.projectId === projectId);
        if (!process || !process.contractorInfo) return;

        currentContractorInfo = process.contractorInfo;
        
        // Modal başlığını güncelle
        document.getElementById('contractor-info-modal-title').textContent = `İletişim Bilgileri - ${process.projectName}`;
        
        // Müteahhit adını göster
        document.getElementById('contractor-name-display').textContent = process.contractorName;
        
        // Bilgileri doldur
        document.getElementById('contractor-phone-display').textContent = process.contractorInfo.phone || '-';
        document.getElementById('contractor-email-display').textContent = process.contractorInfo.email || '-';
        document.getElementById('contractor-address-display').textContent = process.contractorInfo.address || '-';
        document.getElementById('contractor-company-display').textContent = process.contractorInfo.companyName || '-';
        document.getElementById('contractor-representative-display').textContent = process.contractorInfo.representative || '-';
        document.getElementById('contractor-experience-display').textContent = process.contractorInfo.yearsOfExperience ? `${process.contractorInfo.yearsOfExperience} yıl` : '-';
        document.getElementById('contractor-projects-display').textContent = process.contractorInfo.completedProjects ? `${process.contractorInfo.completedProjects} proje` : '-';
        
        openModal('contractor-info-modal');
    }

    function callContractor() {
        if (!currentContractorInfo || !currentContractorInfo.phone) {
            showNotification('Telefon numarası bulunamadı.', 'error');
            return;
        }
        
        // Telefon numarasını temizle (boşluk ve özel karakterleri kaldır)
        const phoneNumber = currentContractorInfo.phone.replace(/\s+/g, '').replace(/[^\d+]/g, '');
        
        // Telefon uygulamasını aç
        window.open(`tel:${phoneNumber}`, '_blank');
        showNotification('Arama başlatılıyor...', 'info');
    }

    function whatsappContractor() {
        if (!currentContractorInfo || !currentContractorInfo.phone) {
            showNotification('Telefon numarası bulunamadı.', 'error');
            return;
        }
        
        // Telefon numarasını temizle ve uluslararası formata çevir
        let phoneNumber = currentContractorInfo.phone.replace(/\s+/g, '').replace(/[^\d]/g, '');
        
        // Eğer 0 ile başlıyorsa Türkiye kodu ekle
        if (phoneNumber.startsWith('0')) {
            phoneNumber = '90' + phoneNumber.substring(1);
        }
        
        const message = encodeURIComponent('Merhaba, DönüşümAY platformu üzerindeki projemiz hakkında görüşmek istiyorum.');
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
        showNotification('WhatsApp açılıyor...', 'info');
    }

    function emailContractor() {
        if (!currentContractorInfo || !currentContractorInfo.email) {
            showNotification('E-posta adresi bulunamadı.', 'error');
            return;
        }
        
        const subject = encodeURIComponent('DönüşümAY - Proje Görüşmesi');
        const body = encodeURIComponent('Merhaba,\n\nDönüşümAY platformu üzerindeki projemiz hakkında görüşmek istiyorum.\n\nSaygılarımla,\nProje Sahibi');
        
        window.open(`mailto:${currentContractorInfo.email}?subject=${subject}&body=${body}`, '_blank');
        showNotification('E-posta uygulaması açılıyor...', 'info');
    }

    // --- INITIALIZATION ---
    document.addEventListener('DOMContentLoaded', () => {
        showSection('customer-dashboard-section');
        // İlanlarım sekmesi için veriyi hazırla
        renderCustomerListings();
        // Close modals on Escape key press
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') {
                ['create-listing-modal', 'listing-details-modal', 'cancel-listing-modal', 'offer-details-modal', 'accept-offer-modal', 'reject-offer-modal', 'new-design-request-modal', 'revision-request-modal', 'view-documents-modal', 'chat-modal', 'payment-modal', 'account-action-modal', 'pre-chat-modal', 'live-chat-modal', 'notary-document-upload-modal', 'notary-chat-modal', 'notary-appointment-modal', 'notarized-contract-modal', 'contractor-info-modal'].forEach(closeModal);
            }
        });

        // Canlı destek modalı için kategori seçimi etkileşimini ekle
        const preChatForm = document.getElementById('pre-chat-form');
        if (preChatForm) {
            preChatForm.addEventListener('change', (event) => {
                if (event.target.name === 'chat-category') {
                    // Tüm seçeneklerden vurguyu kaldır
                    document.querySelectorAll('.pre-chat-option').forEach(label => {
                        label.classList.remove('border-primary', 'bg-primary/10', 'ring-2', 'ring-primary');
                        label.querySelector('.check-icon')?.classList.add('hidden');
                    });

                    // Seçilen seçeneğe vurgu ekle
                    const selectedLabel = event.target.closest('.pre-chat-option');
                    if (selectedLabel) {
                        selectedLabel.classList.add('border-primary', 'bg-primary/10', 'ring-2', 'ring-primary');
                        selectedLabel.querySelector('.check-icon')?.classList.remove('hidden');
                    }
                }
            });
        }
    });

    function renderChatMessages(projectId) {
        const project = customerData.designProjects.find(p => p.id === projectId) || customerData.applicationProjects.find(p => p.id === projectId);
        const chatBody = document.getElementById('chat-modal-body');
        if (!project || !chatBody) return;
        chatBody.innerHTML = project.chatHistory && project.chatHistory.length > 0
            ? project.chatHistory.map(msg => {
                if (msg.type === 'file') {
                    return `<div class="flex items-end mb-3 ${msg.sender === 'customer' ? 'justify-end' : 'justify-start'}">
                        <div class="flex items-center space-x-2 ${msg.sender === 'customer' ? 'flex-row-reverse' : ''}">
                            <img src="https://randomuser.me/api/portraits/men/${msg.sender === 'customer' ? '45' : '46'}.jpg" class="w-8 h-8 rounded-full border" alt="Avatar">
                            <div class="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 max-w-xs">
                                <a href="${msg.fileUrl}" download class="text-blue-700 font-semibold hover:underline flex items-center"><i class="fas fa-paperclip mr-2"></i>${msg.fileName}</a>
                                <div class="text-xs text-gray-400 mt-1">${formatTime(msg.timestamp)}</div>
                            </div>
                        </div>
                    </div>`;
                } else {
                    return `<div class="flex items-end mb-3 ${msg.sender === 'customer' ? 'justify-end' : 'justify-start'}">
                        <div class="flex items-center space-x-2 ${msg.sender === 'customer' ? 'flex-row-reverse' : ''}">
                            <img src="https://randomuser.me/api/portraits/men/${msg.sender === 'customer' ? '45' : '46'}.jpg" class="w-8 h-8 rounded-full border" alt="Avatar">
                            <div class="bg-gray-100 border border-gray-200 rounded-lg px-4 py-2 max-w-xs">
                                <span class="text-gray-800">${msg.text}</span>
                                <div class="text-xs text-gray-400 mt-1">${formatTime(msg.timestamp)}</div>
                            </div>
                        </div>
                    </div>`;
                }
            }).join('')
            : '<p class="text-center text-gray-500">Henüz mesaj yok.</p>';
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function sendMessage(projectId) {
        const input = document.getElementById('chat-message-input');
        const text = input.value.trim();
        if (!text) return;
        const project = customerData.designProjects.find(p => p.id === projectId) || customerData.applicationProjects.find(p => p.id === projectId);
        if (!project) return;
        if (!project.chatHistory) project.chatHistory = [];
        project.chatHistory.push({ sender: 'customer', text, timestamp: Date.now(), type: 'text' });
        renderChatMessages(projectId);
        input.value = '';
    }

    function handleChatFileUpload(event) {
        const file = event.target.files[0];
        if (!file) return;
        const projectId = getCurrentChatProjectId();
        if (!projectId) return;
        const project = customerData.designProjects.find(p => p.id === projectId) || customerData.applicationProjects.find(p => p.id === projectId);
        if (!project) return;
        if (!project.chatHistory) project.chatHistory = [];
        // Simulate file upload and create a blob URL
        const fileUrl = URL.createObjectURL(file);
        project.chatHistory.push({ sender: 'customer', type: 'file', fileName: file.name, fileUrl, timestamp: Date.now() });
        renderChatMessages(projectId);
        document.getElementById('chat-file-input').value = '';
    }

    // Helper to get the current chat projectId (from openChatModal context)
    let currentChatProjectId = null;
    function getCurrentChatProjectId() {
        return currentChatProjectId;
    }
    // Patch openChatModal to set currentChatProjectId
    const _openChatModal = openChatModal;
    openChatModal = function (projectId, architectId) {
        currentChatProjectId = projectId;
        _openChatModal(projectId, architectId);
    };

    function formatTime(ts) {
        const d = new Date(ts);
        return d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    }

    // --- LEGAL PROCESSES SECTION ---
    let tempNotaryFiles = [];

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
                    id: 'authorization-letter',
                    name: 'İmza Beyannamesi',
                    description: 'Noter huzurunda düzenlenen imza beyannamesi',
                    accept: '.pdf,.jpg,.jpeg,.png',
                    required: true
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
                    id: 'residence-certificate',
                    name: 'İkametgah Belgesi',
                    description: 'Güncel ikametgah belgesi',
                    accept: '.pdf,.jpg,.jpeg,.png',
                    required: true
                },
                {
                    id: 'apartment-distribution',
                    name: 'Daire Dağılım Planı',
                    description: 'Yapılacak dairelerin dağılım planı',
                    accept: '.pdf,.jpg,.jpeg,.png',
                    required: true
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
                    name: 'Ödeme Planı Onayı',
                    description: 'Anahtar teslim bedeli ödeme planı onayı',
                    accept: '.pdf,.doc,.docx',
                    required: true
                },
                {
                    id: 'financial-guarantee',
                    name: 'Mali Durum Belgesi',
                    description: 'Gelir durumunu belgeleyen dökümanlar',
                    accept: '.pdf,.jpg,.jpeg,.png',
                    required: false,
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
                    name: 'Değerleme Raporu Onayı',
                    description: 'Gayrimenkul değerleme raporu onayı',
                    accept: '.pdf',
                    required: true
                },
                {
                    id: 'down-payment-receipt',
                    name: 'Peşinat Makbuzu',
                    description: 'Ödenen peşinat tutarının makbuzu',
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
                },
                {
                    id: 'witness-ids',
                    name: 'Tanık Kimlik Bilgileri',
                    description: 'Noter işlemi için tanık kimlik fotokopileri',
                    accept: '.pdf,.jpg,.jpeg,.png',
                    required: false,
                    multiple: true
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

    function renderLegalProcesses() {
        const container = document.getElementById('legal-processes-list');
        if (!container) return;

        const processes = customerData.legalProcesses;

        if (processes.length === 0) {
            container.innerHTML = `<div class="col-span-full text-center py-12 bg-white rounded-lg shadow-sm border">
                <i class="fas fa-folder-open fa-3x text-gray-300 mb-4"></i>
                <h3 class="text-xl font-semibold text-gray-700">Henüz bir hukuki süreç başlatılmadı.</h3>
                <p class="text-gray-500 mt-2">Bir müteahhitle anlaştıktan sonra noter süreçleri burada görünecektir.</p>
            </div>`;
            return;
        }

        const statusMap = {
            documents_pending: { text: 'Belge Yükleme Bekleniyor', color: 'bg-yellow-100 text-yellow-800' },
            notary_assigned: { text: 'Noter Atandı', color: 'bg-blue-100 text-blue-800' },
            appointment_set: { text: 'Randevu Bekleniyor', color: 'bg-indigo-100 text-indigo-800' },
            contract_notarized: { text: 'Sözleşme Onaylandı', color: 'bg-green-100 text-green-800' }
        };

        container.innerHTML = processes.map(process => {
            const statusInfo = statusMap[process.notaryStatus] || { text: 'Bilinmiyor', color: 'bg-gray-100 text-gray-800' };

            // Randevu butonu için koşulları düzenliyoruz
            const canScheduleAppointment = process.notaryStatus === 'documents_pending' || process.notaryStatus === 'notary_assigned' || process.notaryStatus === 'appointment_set';
            const appointmentButtonText = process.notaryAppointment ? 'Randevu Düzenle' : 'Randevu Al';
            const appointmentButtonIcon = process.notaryAppointment ? 'fa-calendar-check' : 'fa-calendar-alt';

            const buttons = `
                <button onclick="openContractorInfoModal('${process.projectId}')" class="text-sm bg-green-100 text-green-700 font-semibold py-2 rounded-lg hover:bg-green-200 transition-colors flex items-center justify-center space-x-2">
                    <i class="fas fa-address-card"></i><span>İletişim Bilgileri</span>
                </button>
                <button onclick="openNotaryDocumentUploadModal('${process.projectId}')" class="text-sm bg-blue-100 text-blue-700 font-semibold py-2 rounded-lg hover:bg-blue-200 transition-colors flex items-center justify-center space-x-2">
                    <i class="fas fa-upload"></i><span>Belgeleri Yükle</span>
                </button>
                <button onclick="openNotaryChatModal('${process.projectId}')" ${!process.assignedNotary ? 'disabled' : ''} class="text-sm bg-purple-100 text-purple-700 font-semibold py-2 rounded-lg hover:bg-purple-200 transition-colors flex items-center justify-center space-x-2 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed">
                    <i class="fas fa-comments"></i><span>Noterle İletişim</span>
                </button>
                <button onclick="openNotaryAppointmentModal('${process.projectId}')" ${!canScheduleAppointment ? 'disabled' : ''} class="text-sm bg-indigo-100 text-indigo-700 font-semibold py-2 rounded-lg hover:bg-indigo-200 transition-colors flex items-center justify-center space-x-2 ${!canScheduleAppointment ? 'disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed' : ''}">
                    <i class="fas ${appointmentButtonIcon}"></i><span>${appointmentButtonText}</span>
                </button>
                <button onclick="openNotaryPaymentModal('${process.projectId}')" class="text-sm bg-orange-100 text-orange-700 font-semibold py-2 rounded-lg hover:bg-orange-200 transition-colors flex items-center justify-center space-x-2">
                    <i class="fas fa-credit-card"></i><span>Noter Ödemesi</span>
                </button>
                <button onclick="viewDownloadNotarizedContract('${process.projectId}')" ${process.notaryStatus !== 'contract_notarized' ? 'disabled' : ''} class="text-sm bg-green-100 text-green-700 font-semibold py-2 rounded-lg hover:bg-green-200 transition-colors flex items-center justify-center space-x-2 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed">
                    <i class="fas fa-file-contract"></i><span>Sözleşme</span>
                </button>
            `;

            return `
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col group hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="font-bold text-lg text-gray-800">${process.projectName}</h3>
                    <span class="text-xs font-medium px-2.5 py-0.5 rounded-full ${statusInfo.color}">${statusInfo.text}</span>
                </div>
                <p class="text-sm text-gray-500 mb-2">Müteahhit: ${process.contractorName}</p>
                <p class="text-sm text-blue-600 mb-2 font-medium">
                    <i class="fas fa-file-contract mr-1"></i>
                    ${process.contractType}
                </p>
                ${process.notaryAppointment ? `
                <p class="text-sm text-gray-500 mb-4">
                    <i class="fas fa-calendar-check text-indigo-500 mr-1"></i>
                    Randevu: ${process.notaryAppointment.date}, ${process.notaryAppointment.time}
                </p>` : ''}
                
                <div class="mt-auto pt-4 border-t border-gray-100 grid grid-cols-2 lg:grid-cols-3 gap-3">
                    ${buttons}
                </div>
            </div>
            `;
        }).join('');
    }

    function openNotaryDocumentUploadModal(projectId) {
        const process = customerData.legalProcesses.find(p => p.projectId === projectId);
        if (!process) return;

        document.getElementById('notary-upload-project-id').value = projectId;
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
                            onchange="handleDynamicFileUpload('${doc.id}', this)"
                        >
                    </div>
                `).join('')}
            </div>
            <div id="notary-file-preview-container" class="mt-6 space-y-2">
                <!-- Uploaded files preview will be here -->
            </div>
        `;

        tempNotaryFiles = []; // Reset temporary files
        document.getElementById('upload-notary-docs-btn').disabled = true;

        openModal('notary-document-upload-modal');
    }

    function handleDynamicFileUpload(documentId, input) {
        const files = Array.from(input.files);
        const previewContainer = document.getElementById('notary-file-preview-container');

        files.forEach(file => {
            const fileId = 'file-' + Date.now() + '-' + Math.random();
            tempNotaryFiles.push({ 
                id: fileId, 
                file: file, 
                documentType: documentId,
                documentName: input.previousElementSibling.previousElementSibling.textContent.replace(' *', '').trim()
            });

            const previewHtml = `
                <div id="${fileId}" class="flex items-center justify-between p-2 bg-gray-50 rounded-lg border">
                    <div class="flex items-center space-x-3 overflow-hidden">
                        <i class="fas fa-file-alt text-gray-500"></i>
                        <div>
                            <span class="text-sm font-medium text-gray-700 truncate block">${file.name}</span>
                            <span class="text-xs text-gray-500">${input.previousElementSibling.previousElementSibling.textContent.replace(' *', '').trim()}</span>
                        </div>
                    </div>
                    <button onclick="removeNotaryTempFile('${fileId}')" class="text-red-500 hover:text-red-700 p-1 rounded-full"><i class="fas fa-times-circle"></i></button>
                </div>
            `;
            previewContainer.insertAdjacentHTML('beforeend', previewHtml);
        });

        document.getElementById('upload-notary-docs-btn').disabled = tempNotaryFiles.length === 0;
    }

    function handleNotaryFileUploadChange(event) {
        const files = Array.from(event.target.files);
        const previewContainer = document.getElementById('notary-file-preview-container');

        files.forEach(file => {
            const fileId = 'file-' + Date.now() + '-' + Math.random();
            tempNotaryFiles.push({ id: fileId, file: file });

            const previewHtml = `
                <div id="${fileId}" class="flex items-center justify-between p-2 bg-gray-50 rounded-lg border">
                    <div class="flex items-center space-x-3 overflow-hidden">
                        <i class="fas fa-file-alt text-gray-500"></i>
                        <span class="text-sm font-medium text-gray-700 truncate">${file.name}</span>
                    </div>
                    <button onclick="removeNotaryTempFile('${fileId}')" class="text-red-500 hover:text-red-700 p-1 rounded-full"><i class="fas fa-times-circle"></i></button>
                </div>
            `;
            previewContainer.insertAdjacentHTML('beforeend', previewHtml);
        });

        document.getElementById('upload-notary-docs-btn').disabled = tempNotaryFiles.length === 0;
    }

    function removeNotaryTempFile(fileId) {
        tempNotaryFiles = tempNotaryFiles.filter(f => f.id !== fileId);
        document.getElementById(fileId)?.remove();
        document.getElementById('upload-notary-docs-btn').disabled = tempNotaryFiles.length === 0;
    }

    function uploadNotaryDocuments() {
        const projectId = document.getElementById('notary-upload-project-id').value;
        const process = customerData.legalProcesses.find(p => p.projectId === projectId);
        if (!process) return;

        // Sözleşme türüne göre gerekli belgeleri al
        const requiredDocuments = getRequiredDocumentsByContractType(process.contractType);
        
        // Gerekli belgelerin yüklenip yüklenmediğini kontrol et
        const missingRequiredDocs = [];
        const uploadedDocTypes = tempNotaryFiles.map(f => f.documentType);
        
        requiredDocuments.forEach(doc => {
            if (doc.required && !uploadedDocTypes.includes(doc.id)) {
                missingRequiredDocs.push(doc.name);
            }
        });

        // Gerekli belgeler eksikse uyarı ver
        if (missingRequiredDocs.length > 0) {
            showNotification(`Şu gerekli belgeler eksik: ${missingRequiredDocs.join(', ')}`, 'warning');
            return;
        }

        if (tempNotaryFiles.length === 0) {
            showNotification('Lütfen en az bir belge yükleyin.', 'warning');
            return;
        }

        const button = document.getElementById('upload-notary-docs-btn');
        button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Yükleniyor...';
        button.disabled = true;

        setTimeout(() => {
            // Simulate upload with document types
            tempNotaryFiles.forEach(f => {
                process.uploadedDocuments.push({ 
                    name: f.file.name, 
                    url: 'simulated/path/' + f.file.name,
                    type: f.documentType,
                    documentType: f.documentName
                });
            });

            // Simulate notary assignment after upload
            process.notaryStatus = 'notary_assigned';
            process.assignedNotary = { id: 'notary-' + Date.now(), name: 'Kadıköy 5. Noterliği', contact: '0216 987 65 43' };

            showNotification(`${tempNotaryFiles.length} belge başarıyla yüklendi ve noter ataması yapıldı.`, 'success');
            closeModal('notary-document-upload-modal');
            renderLegalProcesses();

            button.innerHTML = 'Belgeleri Yükle'; // Reset button text
        }, 1500);
    }

    function openNotaryChatModal(projectId) {
        const process = customerData.legalProcesses.find(p => p.projectId === projectId);
        if (!process || !process.assignedNotary) return;

        document.getElementById('notary-chat-project-id').value = projectId;
        document.getElementById('notary-chat-modal-title').textContent = `Noterle Mesajlaşma - ${process.assignedNotary.name}`;
        renderNotaryChatMessages(projectId);
        openModal('notary-chat-modal');
    }

    function renderNotaryChatMessages(projectId) {
        const process = customerData.legalProcesses.find(p => p.projectId === projectId);
        const chatBody = document.getElementById('notary-chat-messages');
        if (!process || !chatBody) return;

        if (!process.notaryChatHistory || process.notaryChatHistory.length === 0) {
            chatBody.innerHTML = '<p class="text-center text-gray-500">Henüz mesaj yok.</p>';
            return;
        }

        chatBody.innerHTML = process.notaryChatHistory.map(msg => {
            const isCustomer = msg.sender === 'customer';
            const align = isCustomer ? 'justify-end' : 'justify-start';
            const bubbleColor = isCustomer ? 'bg-primary text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none';
            const timeColor = isCustomer ? 'text-purple-200' : 'text-gray-500';

            const messageContent = msg.type === 'file'
                ? `<a href="${msg.fileUrl}" target="_blank" class="flex items-center space-x-2 hover:underline"><i class="fas fa-file-alt"></i><span class="font-semibold">${msg.fileName}</span></a>`
                : msg.text;

            return `
                <div class="flex ${align}">
                    <div class="max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${isCustomer ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'} ${isCustomer ? 'rounded-br-none' : 'rounded-bl-none'}">
                        <p class="text-sm ${isCustomer ? 'text-white' : 'text-gray-800'}">${messageContent}</p>
                        <div class="text-xs mt-1 text-right ${isCustomer ? 'text-blue-100' : 'text-gray-500'}">
                            ${new Date(msg.timestamp).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                    </div>
                        </div>
            `;
        }).join('');
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function sendMessageToNotary() {
        const projectId = document.getElementById('notary-chat-project-id').value;
        const input = document.getElementById('notary-chat-input');
        const text = input.value.trim();
        if (!text || !projectId) return;

        const process = customerData.legalProcesses.find(p => p.projectId === projectId);
        process.notaryChatHistory.push({ sender: 'customer', type: 'text', text: text, timestamp: Date.now() });
        renderNotaryChatMessages(projectId);
        input.value = '';

        // Simulate notary response
        setTimeout(() => {
            process.notaryChatHistory.push({ sender: 'notary', type: 'text', text: "Mesajınız alınmıştır. En kısa sürede yanıtlanacaktır.", timestamp: Date.now() });
            renderNotaryChatMessages(projectId);
        }, 2000);
    }

    function sendNotaryFile(event) {
        const projectId = document.getElementById('notary-chat-project-id').value;
        const file = event.target.files[0];
        if (!file || !projectId) return;

        const process = customerData.legalProcesses.find(p => p.projectId === projectId);
        const fileUrl = URL.createObjectURL(file); // Simulate upload
        process.notaryChatHistory.push({ sender: 'customer', type: 'file', fileName: file.name, fileUrl: fileUrl, timestamp: Date.now() });
        renderNotaryChatMessages(projectId);
        event.target.value = ''; // Reset input
    }

    // --- NOTARY APPOINTMENT CALENDAR ---
    let currentDate = new Date();
    let selectedDate = null;
    let selectedTimeSlot = null;
    let currentLegalProjectId = null;
    let availableSlots = {};

    const notaryAvailabilityData = {
        "2025-07-15": ["09:00", "10:00", "11:00", "14:00", "15:00"],
        "2025-07-16": ["09:00", "10:00", "13:00", "16:00"],
        "2025-07-17": ["10:00", "11:00", "12:00"],
        "2025-07-18": ["09:00", "10:00", "11:00", "14:00"],
        "2025-07-19": ["10:00", "11:00", "15:00"],
        "2025-07-22": ["09:00", "10:00", "11:00", "14:00"],
        "2025-07-23": ["10:00", "11:00", "12:00", "15:00"],
        "2025-08-01": ["09:00", "10:00", "11:00", "14:00", "15:00"],
        "2025-08-05": ["09:00", "10:00", "13:00", "16:00"],
        "2025-08-10": ["10:00", "11:00", "12:00"]
    };

    function openNotaryAppointmentModal(projectId) {
        currentLegalProjectId = projectId;
        const process = customerData.legalProcesses.find(p => p.projectId === projectId);
        if (!process) return;

        document.getElementById('notary-appointment-modal-title').textContent = `Noter Randevu Seçimi - ${process.projectName}`;

        // Reset selection state
        selectedDate = null;
        selectedTimeSlot = null;
        document.getElementById('confirm-appointment-btn').disabled = true;
        document.getElementById('selected-appointment-details').classList.add('hidden');
        document.getElementById('available-slots').classList.add('hidden');
        document.getElementById('no-appointment-selected').classList.remove('hidden');

        // Ensure notary is assigned
        if (!process.assignedNotary) {
            const defaultNotary = {
                id: 'notary-auto-' + Date.now(),
                name: 'Kadıköy 15. Noterliği - Ahmet Çelik',
                contact: '0216 123 45 67',
                location: 'Kadıköy 15. Noterliği, Caferağa Mah. Mühürdar Cad. No:5 D:1, Kadıköy/İstanbul'
            };
            process.assignedNotary = defaultNotary;
            process.notaryStatus = 'notary_assigned';
        }

        // Generate available slots for the next 30 days
        generateAvailableSlots();

        // Render initial calendar
        renderCalendar();

        openModal('notary-appointment-modal');
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
        const daysInMonth = lastDay.getDate();

        // Calculate how many days from Monday to show from previous month
        const startDayOfWeek = (firstDay.getDay() + 6) % 7; // Convert Sunday=0 to Monday=0

        let calendarHTML = '';

        // Add empty cells for previous month
        for (let i = 0; i < startDayOfWeek; i++) {
            calendarHTML += `<div class="calendar-day"></div>`;
        }

        // Add days of current month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const dateStr = date.toISOString().split('T')[0];
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            let classes = ['calendar-day', 'current-month'];
            
            if (availableSlots[dateStr] && date >= today) {
                classes.push('has-slots');
                calendarHTML += `<div class="${classes.join(' ')}" onclick="selectDate('${dateStr}')">${day}</div>`;
            } else {
                calendarHTML += `<div class="${classes.join(' ')}">${day}</div>`;
            }
        }

        // Add empty cells for next month to complete the grid
        const totalCells = Math.ceil((startDayOfWeek + daysInMonth) / 7) * 7;
        for (let i = startDayOfWeek + daysInMonth; i < totalCells; i++) {
            calendarHTML += `<div class="calendar-day"></div>`;
        }

        // Update calendar grid
        const calendar = document.querySelector('.calendar-grid');
        const existingDays = calendar.querySelectorAll('.calendar-day');
        existingDays.forEach(day => day.remove());
        calendar.insertAdjacentHTML('beforeend', calendarHTML);
    }

    function changeMonth(delta) {
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + delta, 1);
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
        const process = customerData.legalProcesses.find(p => p.projectId === currentLegalProjectId);
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
        document.getElementById('selected-location').textContent = process.assignedNotary.location;

        // Enable confirm button
        document.getElementById('confirm-appointment-btn').disabled = false;
    }



    function confirmNotaryAppointment() {
        if (!selectedDate || !selectedTimeSlot || !currentLegalProjectId) return;

        const process = customerData.legalProcesses.find(p => p.projectId === currentLegalProjectId);
        if (!process) return;

        // Create appointment object
        process.notaryAppointment = {
            date: selectedDate,
            time: selectedTimeSlot,
            location: process.assignedNotary.location,
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

    function toggleNotarySmsReminder() {
        const bg = document.getElementById('notary-sms-reminder-bg');
        const knob = document.getElementById('notary-sms-reminder-knob');
        const isEnabled = bg.classList.contains('bg-gray-300');

        if (isEnabled) {
            bg.className = 'absolute left-0 w-11 h-6 rounded-full transition-colors bg-green-400';
            knob.className = 'inline-block w-5 h-5 bg-white rounded-full shadow transform translate-x-5 transition-transform';
        } else {
            bg.className = 'absolute left-0 w-11 h-6 rounded-full transition-colors bg-gray-300';
            knob.className = 'inline-block w-5 h-5 bg-white rounded-full shadow transform translate-x-0 transition-transform';
        }

        showNotification(`SMS hatırlatıcı ${isEnabled ? 'etkinleştirildi' : 'devre dışı bırakıldı'}.`, 'info');
    }

    function viewDownloadNotarizedContract(projectId) {
        const process = customerData.legalProcesses.find(p => p.projectId === projectId);
        if (process.notaryStatus !== 'contract_notarized' || !process.notarizedContractUrl) return;

        document.getElementById('notarized-contract-project-id').value = projectId;
        document.getElementById('notarized-contract-modal-title').textContent = `Onaylı Sözleşme - ${process.projectName}`;

        const viewer = document.getElementById('notarized-contract-viewer');
        // Simulate PDF viewing
        viewer.innerHTML = `<iframe src="${process.notarizedContractUrl}" class="w-full h-full border-0"></iframe>`;

        openModal('notarized-contract-modal');
    }

    function downloadNotarizedContract() {
        const projectId = document.getElementById('notarized-contract-project-id').value;
        const process = customerData.legalProcesses.find(p => p.projectId === projectId);
        if (!process || !process.notarizedContractUrl) return;

        const link = document.createElement('a');
        link.href = process.notarizedContractUrl;
        link.download = `${process.projectName}-Noter-Onayli-Sozlesme.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showNotification('Sözleşme indirme işlemi başlatıldı.', 'info');
    }

    // --- NOTARY PAYMENT FUNCTIONS ---
    
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

    function openNotaryPaymentModal(projectId) {
        console.log('Noter ödeme modalı açılıyor, proje ID:', projectId);
        const process = customerData.legalProcesses.find(p => p.projectId === projectId);
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
        
        openModal('notary-payment-modal');
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
            document.getElementById('notary-card-holder').value = 'AYŞE DEMİR';
            document.getElementById('notary-card-number').value = '1234 5678 9012 1234';
            document.getElementById('notary-card-expiry').value = '12/25';
            document.getElementById('notary-card-cvv').value = '';  // CVV always empty for security
        } else if (cardId === 'card2') {
            document.getElementById('notary-card-holder').value = 'AYŞE DEMİR';
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
            const process = customerData.legalProcesses.find(p => p.projectId === projectId);
            
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

    // --- LAWYER PROCESSES SECTION (OLD - TO BE REMOVED) ---
    // The following functions are now obsolete and replaced by legalProcesses functions.
    // They are left here for reference during transition and will be removed.
    let selectedLawyerProcess = null;

    // --- PROFİLİM ---
    function renderProfileSection() {
        const profile = customerData.profile;

        // Render profile picture and name
        document.getElementById('profile-picture-preview').src = profile.profilePictureUrl;
        document.getElementById('profile-full-name').textContent = `${profile.contactInfo.name} ${profile.contactInfo.surname}`;

        // Render contact info
        document.getElementById('profile-email-display').textContent = profile.contactInfo.email;
        document.getElementById('profile-phone-display').textContent = profile.contactInfo.phone;

        // Render 2FA status
        const twoFactorEnabled = profile.twoFactorEnabled;
        document.getElementById('2fa-toggle').checked = twoFactorEnabled;
        document.getElementById('2fa-status').textContent = twoFactorEnabled ? 'Aktif' : 'Devre Dışı';
        document.getElementById('2fa-status').className = `text-sm font-medium ${twoFactorEnabled ? 'text-green-600' : 'text-gray-600'}`;

        // Render email verification status
        const emailDisplay = document.getElementById('email-display');
        const emailVerifyBtn = document.getElementById('email-verify-btn');
        emailDisplay.textContent = profile.contactInfo.email;
        if (profile.emailVerified) {
            emailVerifyBtn.innerHTML = '<i class="fas fa-check-circle text-green-500"></i> Doğrulandı';
            emailVerifyBtn.disabled = true;
            emailVerifyBtn.className = 'px-3 py-1 bg-green-50 text-green-700 rounded-md text-sm cursor-default';
        }

        // Render phone verification status
        const phoneDisplay = document.getElementById('phone-display');
        const phoneVerifyBtn = document.getElementById('phone-verify-btn');
        phoneDisplay.textContent = profile.contactInfo.phone;
        if (profile.phoneVerified) {
            phoneVerifyBtn.innerHTML = '<i class="fas fa-check-circle text-green-500"></i> Doğrulandı';
            phoneVerifyBtn.disabled = true;
            phoneVerifyBtn.className = 'px-3 py-1 bg-green-50 text-green-700 rounded-md text-sm cursor-default';
        }

        // Render current plan
        document.getElementById('current-plan-name').textContent = profile.subscriptionPlan;

        // Render plan features
        const planFeatures = {
            'Free': [
                'Yılda 2 ücretsiz tasarım hakkı',
                'Sınırlı mimar mesajlaşma',
                'Temel destek'
            ],
            'Standard': [
                'Yılda 10 ücretsiz tasarım hakkı',
                'Sınırsız mimar mesajlaşma',
                'Öncelikli destek',
                'Sözleşme karşılaştırma raporu'
            ],
            'Pro': [
                'Sınırsız tasarım hakkı',
                '10 ücretsiz mimar tasarımı',
                'Öncelikli ve 7/24 destek',
                'Hukuki danışmanlık'
            ]
        };

        const featuresList = document.getElementById('plan-features');
        featuresList.innerHTML = planFeatures[profile.subscriptionPlan].map(feature => `
                <li class="flex items-center space-x-2">
                    <i class="fas fa-check text-green-500"></i>
                    <span class="text-gray-700">${feature}</span>
                </li>
            `).join('');
    }

    function openEditProfileModal() {
        // Mevcut profil bilgilerini form alanlarına yükle
        const profile = customerData.profile;
        
        document.getElementById('profile-name').value = profile.contactInfo.name;
        document.getElementById('profile-surname').value = profile.contactInfo.surname;
        document.getElementById('profile-email').value = profile.contactInfo.email;
        document.getElementById('profile-phone').value = profile.contactInfo.phone;
        
        document.getElementById('profile-street').value = profile.addressInfo.street;
        document.getElementById('profile-city').value = profile.addressInfo.city;
        document.getElementById('profile-district').value = profile.addressInfo.district;
        document.getElementById('profile-zipcode').value = profile.addressInfo.zipCode;
        
        // Modalı aç
        document.getElementById('edit-profile-modal').classList.remove('hidden');
    }

    function closeEditProfileModal() {
        document.getElementById('edit-profile-modal').classList.add('hidden');
        document.getElementById('edit-profile-form').reset();
    }

    function handleProfileSave(event) {
        event.preventDefault();
        
        // Form verilerini al
        const formData = new FormData(event.target);
        
        // customerData'yı güncelle
        customerData.profile.contactInfo.name = formData.get('name');
        customerData.profile.contactInfo.surname = formData.get('surname');
        customerData.profile.contactInfo.email = formData.get('email');
        customerData.profile.contactInfo.phone = formData.get('phone');
        
        customerData.profile.addressInfo.street = formData.get('street');
        customerData.profile.addressInfo.city = formData.get('city');
        customerData.profile.addressInfo.district = formData.get('district');
        customerData.profile.addressInfo.zipCode = formData.get('zipcode');
        
        // Profil bölümünü yeniden render et
        renderProfileSection();
        
        // Modalı kapat
        closeEditProfileModal();
        
        // Başarı mesajı göster
        showNotification('Profil bilgileriniz başarıyla güncellendi.', 'success');
    }

    function changeProfilePhoto() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => handleProfilePictureChange(e);
        input.click();
    }

    function handleProfilePictureChange(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById('profile-picture-preview').src = e.target.result;
            customerData.profile.profilePictureUrl = e.target.result;
            showNotification('Profil fotoğrafı güncellendi.', 'success');
        };
        reader.readAsDataURL(file);
    }

    function toggle2FA() {
        const isEnabled = document.getElementById('2fa-toggle').checked;
        customerData.profile.twoFactorEnabled = isEnabled;

        // Status güncelleme
        document.getElementById('2fa-status').textContent = isEnabled ? 'Aktif' : 'Devre Dışı';
        document.getElementById('2fa-status').className = `text-sm font-medium ${isEnabled ? 'text-green-600' : 'text-gray-600'}`;

        showNotification(`İki faktörlü kimlik doğrulama ${isEnabled ? 'etkinleştirildi' : 'devre dışı bırakıldı'}.`, 'success');
    }

    function openChangePasswordModal() {
        showNotification('Şifre değiştirme özelliği yakında eklenecek.', 'info');
    }

    function openVerifyEmailModal() {
        showNotification('E-posta doğrulama özelliği yakında eklenecek.', 'info');
    }

    function openVerifyPhoneModal() {
        showNotification('Telefon doğrulama özelliği yakında eklenecek.', 'info');
    }

    function showUpgradeModal() {
        openModal('package-selection-modal');
    }

    function handleProfilePictureChange(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById('profile-picture-preview').src = e.target.result;
            // In a real app, you would upload this to a server and then update the URL.
            // For simulation, we'll save the new URL directly.
            customerData.profile.profilePictureUrl = e.target.result;
            showNotification('Profil fotoğrafı güncellendi. Kaydetmeyi unutmayın.', 'info');
            // We can add a "save photo" button or save automatically. Let's save it directly for simplicity.
            saveProfileInfo('photo');
        };
        reader.readAsDataURL(file);
    }

    function saveProfileInfo(type) {
        if (type === 'contact') {
            customerData.profile.contactInfo.name = document.getElementById('profile-name').value;
            customerData.profile.contactInfo.surname = document.getElementById('profile-surname').value;
            customerData.profile.contactInfo.phone = document.getElementById('profile-phone').value;
            showNotification('İletişim bilgileriniz başarıyla güncellendi.', 'success');
        } else if (type === 'address') {
            customerData.profile.addressInfo.street = document.getElementById('profile-street').value;
            customerData.profile.addressInfo.city = document.getElementById('profile-city').value;
            customerData.profile.addressInfo.district = document.getElementById('profile-district').value;
            customerData.profile.addressInfo.zipCode = document.getElementById('profile-zipcode').value;
            showNotification('Adres bilgileriniz başarıyla güncellendi.', 'success');
        } else if (type === 'photo') {
            showNotification('Profil fotoğrafınız kaydedildi.', 'success');
        }
    }

    function renderTwoFactorToggle(enabled) {
        const bg = document.getElementById('two-factor-bg');
        const knob = document.getElementById('two-factor-knob');
        if (enabled) {
            bg.className = 'absolute left-0 w-11 h-6 rounded-full transition-colors bg-green-400';
            knob.className = 'inline-block w-5 h-5 bg-white rounded-full shadow transform translate-x-5 transition-transform';
        } else {
            bg.className = 'absolute left-0 w-11 h-6 rounded-full transition-colors bg-gray-300';
            knob.className = 'inline-block w-5 h-5 bg-white rounded-full shadow transform translate-x-0 transition-transform';
        }
    }

    function toggleTwoFactor() {
        customerData.profile.twoFactorEnabled = !customerData.profile.twoFactorEnabled;
        renderTwoFactorToggle(customerData.profile.twoFactorEnabled);
        showNotification(`İki Faktörlü Doğrulama ${customerData.profile.twoFactorEnabled ? 'etkinleştirildi' : 'devre dışı bırakıldı'}.`, 'success');
    }

    function renderSubscriptionPlans() {
        const plans = [
            { id: 'Free', name: 'Ücretsiz Paket', price: 'Ücretsiz', features: ['Yılda 2 ücretsiz tasarım hakkı', 'Sınırlı mimar mesajlaşma', 'Temel destek'] },
            { id: 'Standard', name: 'Standart Paket', price: '₺99/Ay', features: ['Yılda 10 ücretsiz tasarım hakkı', 'Sınırsız mimar mesajlaşma', 'Öncelikli destek', 'Sözleşme karşılaştırma raporu'] },
            { id: 'Pro', name: 'Pro Paket', price: '₺249/Ay', features: ['Sınırsız tasarım hakkı', '10 ücretsiz mimar tasarımı', 'Öncelikli ve 7/24 destek', 'Hukuki danışmanlık'] }
        ];

        const container = document.getElementById('subscription-plans-container');
        const currentPlanId = customerData.profile.subscriptionPlan;

        container.innerHTML = plans.map(plan => {
            const isCurrent = plan.id === currentPlanId;
            return `
                <div class="border rounded-xl p-6 flex flex-col ${isCurrent ? 'border-primary ring-2 ring-primary bg-primary/5' : 'bg-white'} transition-all shadow-sm">
                    <h4 class="text-lg font-bold text-gray-800">${plan.name}</h4>
                    <p class="text-2xl font-bold text-gray-900 my-2">${plan.price}</p>
                    <ul class="space-y-2 text-sm text-gray-600 flex-grow mb-6">
                        ${plan.features.map(f => `
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-500 mt-1 mr-2 flex-shrink-0"></i>
                                <span>${f}</span>
                            </li>
                        `).join('')}
                    </ul>
                    ${isCurrent
                    ? `<div class="w-full text-center mt-auto px-4 py-2 rounded-lg bg-green-100 text-green-800 font-semibold text-sm">Mevcut Paketiniz</div>`
                    : `<button onclick="upgradeSubscription('${plan.id}')" class="w-full mt-auto bg-black text-white px-4 py-2 rounded-lg hover:bg-primary-dark shadow text-sm transition-colors" >Paketi Yükselt</button>`
                }
                </div>
            `;
        }).join('');
    }

    function selectPackage(packageType) {
        // Paket seçim modal'ını kapat
        closeModal('package-selection-modal');
        
        // Seçilen pakete göre plan ID'sini belirle
        let planId;
        let planName;
        
        switch(packageType) {
            case 'temel':
                planId = 'Basic';
                planName = 'Temel Paket';
                break;
            case 'orta':
                planId = 'Standard';
                planName = 'Orta Paket';
                break;
            case 'yuksek':
                planId = 'Pro';
                planName = 'Yüksek Paket';
                break;
        }
        
        // Seçilen paketi geçici olarak sakla
        pendingSubscriptionPlanId = planId;
        
        // Ödeme modal'ının başlığını güncelle
        document.getElementById('upgrade-modal-title').textContent = `${planName} Yükseltmesi`;
        document.getElementById('upgrade-modal-text').textContent = `${planName}'e yükseltmek için lütfen bir ödeme yöntemi seçin.`;
        
        // Modal içeriğini sıfırla ve ödeme seçeneklerini göster
        document.getElementById('payment-processing-view').classList.add('hidden');
        document.getElementById('payment-options-view').classList.remove('hidden');
        
        // Ödeme modal'ını aç
        openModal('upgrade-subscription-modal');
    }

    function upgradeSubscription(planId) {
        pendingSubscriptionPlanId = planId;
        const plans = {
            'Standard': 'Standart Paket',
            'Pro': 'Pro Paket',
            'Free': 'Ücretsiz Paket'
        };
        document.getElementById('upgrade-modal-title').textContent = `${plans[planId] || planId} Yükseltmesi`;

        // Modal içeriğini sıfırla ve ödeme seçeneklerini göster
        document.getElementById('payment-processing-view').classList.add('hidden');
        document.getElementById('payment-options-view').classList.remove('hidden');

        openModal('upgrade-subscription-modal');
    }

    /**
     * Ödeme yöntemini seçer ve ilgili modal'ı açar.
     * @param {string} method - Ödeme yöntemi ('credit_card' veya 'eft_havale').
     */
    function processSubscriptionPayment(method) {
        if (!pendingSubscriptionPlanId) return;

        // Mevcut modal'ı kapat
        closeModal('upgrade-subscription-modal');

        // Seçilen yönteme göre ilgili modal'ı aç
        if (method === 'credit_card') {
            openModal('credit-card-payment-modal');
            // Form alanlarını temizle
            document.getElementById('credit-card-form').reset();
            document.getElementById('card-payment-processing').classList.add('hidden');
        } else if (method === 'eft_havale') {
            openModal('eft-havale-payment-modal');
            // Onay mesajını gizle
            document.getElementById('eft-payment-confirmation').classList.add('hidden');
        }
    }

    /**
     * Kredi kartı ödeme işlemini gerçekleştirir
     */
    function processCreditCardPayment() {
        if (!pendingSubscriptionPlanId) return;

        // Form validasyonu
        const cardNumber = document.getElementById('card-number').value;
        const expiryDate = document.getElementById('expiry-date').value;
        const cvv = document.getElementById('cvv').value;
        const cardName = document.getElementById('card-name').value;

        if (!cardNumber || !expiryDate || !cvv || !cardName) {
            showNotification('Lütfen tüm alanları doldurun.', 'error');
            return;
        }

        // İşleniyor animasyonunu göster
        document.getElementById('card-payment-processing').classList.remove('hidden');
        
        // Form alanlarını devre dışı bırak
        const formInputs = document.querySelectorAll('#credit-card-form input');
        formInputs.forEach(input => input.disabled = true);

        // Ödeme işlemini simüle et
        setTimeout(() => {
            customerData.profile.subscriptionPlan = pendingSubscriptionPlanId;
            pendingSubscriptionPlanId = null;

            closeModal('credit-card-payment-modal');
            showNotification(`Paketiniz başarıyla güncellendi! Kredi kartınızdan ödeme alınmıştır.`, 'success');

            // Profil bölümünü yeniden render et
            renderProfileSection();

            // Form alanlarını tekrar aktif et
            formInputs.forEach(input => input.disabled = false);
        }, 3000);
    }

    /**
     * EFT/Havale ödeme talimatını onaylar
     */
    function confirmEftPayment() {
        if (!pendingSubscriptionPlanId) return;

        // Onay mesajını göster
        document.getElementById('eft-payment-confirmation').classList.remove('hidden');

        // 2 saniye sonra işlemi tamamla
        setTimeout(() => {
            customerData.profile.subscriptionPlan = pendingSubscriptionPlanId;
            pendingSubscriptionPlanId = null;

            closeModal('eft-havale-payment-modal');
            showNotification(`Ödeme talimatınız alındı. Havale/EFT işleminiz onaylandıktan sonra paketiniz aktifleştirilecektir.`, 'info');

            // Profil bölümünü yeniden render et
            renderProfileSection();
        }, 2000);
    }

    /**
     * Metni panoya kopyalar
     */
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('IBAN numarası panoya kopyalandı!', 'success');
        }).catch(() => {
            // Fallback yöntemi
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showNotification('IBAN numarası panoya kopyalandı!', 'success');
        });
    }

    // Kredi kartı input formatlaması
    document.addEventListener('DOMContentLoaded', function() {
        // Kart numarası formatlaması (her 4 hanede bir boşluk)
        const cardNumberInput = document.getElementById('card-number');
        if (cardNumberInput) {
            cardNumberInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
                let formatted = value.match(/.{1,4}/g)?.join(' ') || value;
                if (formatted.length > 19) formatted = formatted.substring(0, 19);
                e.target.value = formatted;
            });
        }

        // Son kullanma tarihi formatlaması (MM/YY)
        const expiryInput = document.getElementById('expiry-date');
        if (expiryInput) {
            expiryInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length >= 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
                e.target.value = value;
            });
        }

        // CVV sadece sayı
        const cvvInput = document.getElementById('cvv');
        if (cvvInput) {
            cvvInput.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/[^0-9]/g, '');
            });
        }
    });

    // --- SUPPORT SECTION ---
    function renderSupportSection() {
        const faqContainer = document.getElementById('faq-container');
        const faqs = [
            {
                question: "Proje oluşturma süreci nasıl işler?",
                answer: "Proje oluşturmak için öncelikle bir ilan yayınlamanız gerekmektedir. İlanınıza gelen teklifleri değerlendirdikten sonra bir müteahhitle anlaşarak ve tasarım projesi başlatarak süreci ilerletebilirsiniz. 'Projelerim' sekmesinden tüm adımları takip edebilirsiniz."
            },
            {
                question: "Mimarlarla nasıl iletişim kurabilirim?",
                answer: "Bir tasarım projesi başlattığınızda, atanan mimarınızla 'Projelerim' sekmesindeki proje kartında bulunan 'Mesaj Gönder' butonu aracılığıyla doğrudan iletişim kurabilirsiniz."
            },
            {
                question: "Ödeme yöntemleri nelerdir?",
                answer: "Platformumuz üzerinden Kredi/Banka Kartı veya EFT/Havale seçenekleriyle güvenli bir şekilde ödeme yapabilirsiniz. Yeni bir tasarım projesi talep ettiğinizde ödeme adımları sizi yönlendirecektir."
            },
            {
                question: "Abonelik paketleri arasındaki farklar nelerdir?",
                answer: "'Profilim' sekmesindeki 'Abonelik Paketiniz' bölümünden tüm paketlerin özelliklerini (ücretsiz tasarım hakkı, destek seviyesi vb.) detaylı olarak karşılaştırabilir ve size en uygun paketi seçebilirsiniz."
            },
            {
                question: "Hesabımı nasıl dondurabilirim/silebilirim?",
                answer: "Bu 'Destek' sayfasının alt kısmındaki 'Hesap Yönetimi' bölümünden hesabınızı geçici olarak dondurabilir veya kalıcı olarak silebilirsiniz. Lütfen bu işlemlerin sonuçlarını dikkatlice okuyunuz."
            }
        ];

        faqContainer.innerHTML = faqs.map((faq, index) => `
            <div class="border-b border-gray-200 py-1">
                <button onclick="toggleAccordion(this)" class="w-full flex justify-between items-center text-left py-3 font-semibold text-gray-700 hover:text-primary">
                    <span>${faq.question}</span>
                    <i class="fas fa-chevron-down transform transition-transform"></i>
                </button>
                <div class="overflow-hidden max-h-0 transition-all duration-500 ease-in-out">
                    <p class="pt-2 pb-4 text-gray-600 pr-4">${faq.answer}</p>
                </div>
            </div>
        `).join('');
    }

    function toggleAccordion(button) {
        const content = button.nextElementSibling;
        const icon = button.querySelector('i');

        if (content.style.maxHeight && content.style.maxHeight !== '0px') {
            content.style.maxHeight = '0px';
            icon.classList.remove('rotate-180');
        } else {
            // Close all other accordions
            document.querySelectorAll('#faq-container > div > div').forEach(el => el.style.maxHeight = '0px');
            document.querySelectorAll('#faq-container > div > button > i').forEach(el => el.classList.remove('rotate-180'));

            content.style.maxHeight = content.scrollHeight + 'px';
            icon.classList.add('rotate-180');
        }
    }

    /**
     * Canlı destek için ön seçim modal'ını açar.
     */
    function openPreChatModal() {
        document.getElementById('pre-chat-form').reset();
        // Reset styles from any previous selection
        document.querySelectorAll('.pre-chat-option').forEach(label => {
            label.classList.remove('border-primary', 'bg-primary/10', 'ring-2', 'ring-primary');
            label.querySelector('.check-icon')?.classList.add('hidden');
        });
        openModal('pre-chat-modal');
    }

    /**
     * Kategori seçimi sonrası canlı sohbeti başlatır.
     * Seçilen kategoriyle birlikte sohbet modal'ını açar ve ilk mesajı oluşturur.
     * Eğer kategori seçilmemişse kullanıcıyı uyarır.
     */
    function initializeLiveChat() {
        try {
            const selectedCategory = document.querySelector('input[name="chat-category"]:checked')?.value;

            // 1. Kategori seçimini doğrula
            if (!selectedCategory) {
                showNotification('Lütfen bir destek konusu seçin.', 'warning');
                return; // Kategori seçilmediyse işlemi durdur
            }

            // Önceki modalı kapat
            closeModal('pre-chat-modal');

            // 2. Yeni bir sohbet oturumu başlat
            customerData.liveChatSession = {
                id: 'chat-' + Date.now(),
                category: selectedCategory,
                messages: [
                    {
                        sender: 'agent',
                        type: 'text',
                        // 3. İlk mesaja seçilen kategoriyi ekle
                        text: `Merhaba, DönüşümAY destek ekibine hoş geldiniz. "${selectedCategory}" konusuyla ilgili size nasıl yardımcı olabilirim?`,
                        timestamp: Date.now()
                    }
                ]
            };

            // 4. Mesajları render et ve canlı sohbet modal'ını aç
            renderLiveChatMessages();
            openModal('live-chat-modal');

        } catch (error) {
            console.error("Canlı sohbet başlatılırken bir hata oluştu:", error);
            showNotification('Sohbet başlatılırken bir hata oluştu. Lütfen tekrar deneyin.', 'error');
        }
    }

    /**
     * Canlı sohbet mesajlarını arayüze render eder.
     */
    function renderLiveChatMessages() {
        const container = document.getElementById('live-chat-messages');
        const messages = customerData.liveChatSession.messages;

        if (!container) return;

        container.innerHTML = messages.map(msg => {
            const isUser = msg.sender === 'user';
            const alignClass = isUser ? 'justify-end' : 'justify-start';
            const bubbleClass = isUser ? 'bg-primary text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none';

            let messageContent;
            if (msg.type === 'file') {
                messageContent = `
                    <a href="${msg.fileUrl}" target="_blank" class="flex items-center space-x-2 hover:underline">
                        <i class="fas fa-file-alt"></i>
                        <span class="font-semibold">${msg.fileName}</span>
                    </a>`;
            } else {
                messageContent = msg.text;
            }

            return `
                <div class="flex ${alignClass}">
                    <div class="max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${bubbleClass}">
                        <p class="text-sm">${messageContent}</p>
                        <div class="text-xs mt-1 text-right ${isUser ? 'text-purple-200' : 'text-gray-500'}">
                            ${new Date(msg.timestamp).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // En son mesaja scroll yap
        container.scrollTop = container.scrollHeight;
    }

    /**
     * Kullanıcının girdiği mesajı gönderir.
     */
    function sendLiveChatMessage() {
        const input = document.getElementById('live-chat-input');
        const text = input.value.trim();

        if (!text) return;

        // Kullanıcı mesajını ekle
        customerData.liveChatSession.messages.push({
            sender: 'user',
            type: 'text',
            text: text,
            timestamp: Date.now()
        });

        input.value = '';
        renderLiveChatMessages();

        // Temsilci yanıtını simüle et
        setTimeout(() => {
            customerData.liveChatSession.messages.push({
                sender: 'agent',
                type: 'text',
                text: 'Mesajınızı aldım, inceliyorum. Lütfen bekleyin.',
                timestamp: Date.now()
            });
            renderLiveChatMessages();
        }, 1500);
    }

    /**
     * Dosya yükleme işlemini yönetir ve mesaj geçmişine ekler.
     */
    function handleLiveChatFileUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        // Dosya yüklemeyi simüle et
        const fileUrl = URL.createObjectURL(file); // Gerçek uygulamada burası sunucu URL'si olacak
        customerData.liveChatSession.messages.push({
            sender: 'user',
            type: 'file',
            fileName: file.name,
            fileUrl: fileUrl,
            timestamp: Date.now()
        });

        renderLiveChatMessages();
        showNotification(`"${file.name}" dosyası gönderildi.`, 'success');

        // input'u temizle
        event.target.value = '';
    }

    function startLiveChat() {
        showNotification('Canlı destek sohbeti başlatılıyor...', 'info');
        // In a real app, this would open a chat widget like Intercom or a dedicated chat modal.
    }

    function openAccountActionModal(actionType) {
        const modal = document.getElementById('account-action-modal');
        const title = document.getElementById('account-action-title');
        const text = document.getElementById('account-action-text');
        const confirmBtn = document.getElementById('account-action-confirm-btn');

        if (actionType === 'freeze') {
            title.textContent = 'Hesabı Dondur';
            text.textContent = 'Hesabınızı dondurmak istediğinizden emin misiniz? Tüm aktif süreçleriniz duraklatılacak ancak bilgileriniz saklanacaktır. Daha sonra tekrar giriş yaparak hesabınızı aktifleştirebilirsiniz.';
            confirmBtn.className = 'bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg';
            confirmBtn.onclick = () => executeAccountAction('freeze');
        } else if (actionType === 'delete') {
            title.textContent = 'Hesabı Sil';
            text.textContent = 'Hesabınızı kalıcı olarak silmek istediğinizden emin misiniz? Bu işlem geri alınamaz. Tüm verileriniz, projeleriniz ve mesajlarınız kalıcı olarak silinecektir.';
            confirmBtn.className = 'bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg';
            confirmBtn.onclick = () => executeAccountAction('delete');
        }

        openModal('account-action-modal');
    }

    function executeAccountAction(actionType) {
        closeModal('account-action-modal');
        if (actionType === 'freeze') {
            showNotification('Hesabınız başarıyla donduruldu.', 'success');
        } else if (actionType === 'delete') {
            showNotification('Hesabınız kalıcı olarak silindi.', 'success');
        }
        // In a real app, you would redirect the user or log them out.
        setTimeout(() => logout(), 2000);
    }

    function confirmNotaryAppointment() {
        const projectId = document.getElementById('notary-appointment-project-id').value;
        const process = customerData.legalProcesses.find(p => p.projectId === projectId);
        if (!process) return;

        process.notaryAppointment = {
            date: document.getElementById('selected-datetime').textContent,
            time: document.getElementById('time-slots').value,
            location: document.getElementById('notary-address').value,
            smsReminderEnabled: document.getElementById('notary-sms-reminder-toggle').checked
        };

        process.notaryStatus = 'appointment_set';
        process.assignedNotary = { id: 'notary-' + Date.now(), name: 'Kadıköy 5. Noterliği', contact: '0216 987 65 43' };

        showNotification('Randevu başarıyla onaylandı ve noter ataması yapıldı.', 'success');
        closeModal('notary-appointment-modal');
        renderLegalProcesses();
    }

    function renderNotarySmsReminderToggle(enabled) {
        const bg = document.getElementById('notary-sms-reminder-bg');
        const knob = document.getElementById('notary-sms-reminder-knob');
        if (enabled) {
            bg.className = 'absolute left-0 w-11 h-6 rounded-full transition-colors bg-green-400';
            knob.className = 'inline-block w-5 h-5 bg-white rounded-full shadow transform translate-x-5 transition-transform';
        } else {
            bg.className = 'absolute left-0 w-11 h-6 rounded-full transition-colors bg-gray-300';
            knob.className = 'inline-block w-5 h-5 bg-white rounded-full shadow transform translate-x-0 transition-transform';
        }
    }

    // Global değişkenler
    let currentProjectIdImarCapi = null;

    // İmar Çapı Modal Yönetimi
    let uploadedDocuments = {};
    let selectedPaymentMethod = null;

    function openImarCapiProcessModal(projectId) {
        currentProjectIdImarCapi = projectId;
        const project = customerData.listings.find(p => p.id === projectId);

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
        const project = customerData.listings.find(p => p.id === currentProjectIdImarCapi);
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
        renderCustomerListings(); // Listeyi güncelle

        // 3 saniye sonra simülasyon için imar çapısını hazır yap
        setTimeout(() => {
            const project = customerData.listings.find(p => p.id === currentProjectIdImarCapi);
            if (project) {
                project.imarCapiProcessStatus = 'imar_ready';
                project.imarCapiUrl = 'simulated-imar-capi-url.pdf';
            }
            
            document.getElementById('step-4').classList.add('hidden');
            document.getElementById('step-5').classList.remove('hidden');
            updateProgressBar('imar_ready');
            showNotification('İmar çapınız hazır! İndirebilirsiniz.', 'success');
            renderCustomerListings(); // Listeyi güncelle
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

    function downloadImarCapi(projectId) {
        const project = customerData.listings.find(p => p.id === projectId);
        if (!project || !project.imarCapiUrl) return;

        // Simüle edilmiş indirme
        showNotification('İmar çapı indiriliyor...', 'info');
        renderCustomerListings(); // Listeyi güncelle
    }

    // Proje kartı render fonksiyonunu güncelle
    function renderProjectCard(project) {
        const imarCapiStatusBadge = getImarCapiStatusBadge(project.imarCapiProcessStatus);
        const imarCapiButton = getImarCapiButton(project);

        return `
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col">
                    <!-- Mevcut kart içeriği -->
                    <div class="flex justify-between items-start mb-4">
                        <h3 class="text-lg font-semibold">${project.title}</h3>
                        ${imarCapiStatusBadge}
                    </div>
                    <!-- ... diğer proje detayları ... -->
                    <div class="mt-4 pt-4 border-t flex justify-end space-x-2">
                        ${imarCapiButton}
                        <!-- ... diğer butonlar ... -->
                    </div>
                </div>
            `;
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
    // Şifre değiştirme fonksiyonları
    function openChangePasswordModal() {
        document.getElementById('change-password-modal').classList.remove('hidden');
        document.getElementById('current-password').focus();
    }

    function closeChangePasswordModal() {
        document.getElementById('change-password-modal').classList.add('hidden');
        document.getElementById('change-password-form').reset();
    }

    function togglePasswordVisibility(inputId) {
        const input = document.getElementById(inputId);
        const icon = input.nextElementSibling.querySelector('i');

        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }

    function handlePasswordChange(event) {
        event.preventDefault();

        const currentPassword = document.getElementById('current-password').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        // Şifre doğrulama kontrolleri
        if (newPassword.length < 8) {
            showNotification('Yeni şifre en az 8 karakter uzunluğunda olmalıdır.', 'error');
            return;
        }

        if (newPassword !== confirmPassword) {
            showNotification('Yeni şifreler eşleşmiyor.', 'error');
            return;
        }

        // Şifre değiştirme simülasyonu
        setTimeout(() => {
            showNotification('Şifreniz başarıyla değiştirildi!', 'success');
            closeChangePasswordModal();
        }, 1000);
    }

    // E-posta doğrulama fonksiyonları
    function openVerifyEmailModal() {
        document.getElementById('verify-email-modal').classList.remove('hidden');
        setupVerificationCodeInputs('verify-email-modal');
        // Doğrulama kodu gönderme simülasyonu
        showNotification('Doğrulama kodu e-posta adresinize gönderildi.', 'info');
    }

    function closeVerifyEmailModal() {
        document.getElementById('verify-email-modal').classList.add('hidden');
        clearVerificationInputs('verify-email-modal');
    }

    function verifyEmailCode() {
        const code = getVerificationCode('verify-email-modal');
        if (code.length !== 6) {
            showNotification('Lütfen 6 haneli doğrulama kodunu girin.', 'error');
            return;
        }

        // Doğrulama simülasyonu
        setTimeout(() => {
            customerData.profile.emailVerified = true;
            showNotification('E-posta adresiniz başarıyla doğrulandı!', 'success');
            closeVerifyEmailModal();
            renderProfileSection(); // Profil bölümünü güncelle
        }, 1000);
    }

    function resendEmailCode() {
        showNotification('Yeni doğrulama kodu gönderildi.', 'info');
    }

    // Telefon doğrulama fonksiyonları
    function openVerifyPhoneModal() {
        document.getElementById('verify-phone-modal').classList.remove('hidden');
        setupVerificationCodeInputs('verify-phone-modal');
        // SMS gönderme simülasyonu
        showNotification('Doğrulama kodu SMS olarak gönderildi.', 'info');
    }

    function closeVerifyPhoneModal() {
        document.getElementById('verify-phone-modal').classList.add('hidden');
        clearVerificationInputs('verify-phone-modal');
    }

    function verifyPhoneCode() {
        const code = getVerificationCode('verify-phone-modal');
        if (code.length !== 6) {
            showNotification('Lütfen 6 haneli doğrulama kodunu girin.', 'error');
            return;
        }

        // Doğrulama simülasyonu
        setTimeout(() => {
            customerData.profile.phoneVerified = true;
            showNotification('Telefon numaranız başarıyla doğrulandı!', 'success');
            closeVerifyPhoneModal();
            renderProfileSection(); // Profil bölümünü güncelle
        }, 1000);
    }

    function resendPhoneCode() {
        showNotification('Yeni doğrulama kodu gönderildi.', 'info');
    }

    // Doğrulama kodu input yönetimi
    function setupVerificationCodeInputs(modalId) {
        const modal = document.getElementById(modalId);
        const inputs = modal.querySelectorAll('.verification-code-input');

        inputs.forEach((input, index) => {
            input.addEventListener('keyup', (e) => {
                if (e.key === 'Backspace' && !input.value && index > 0) {
                    inputs[index - 1].focus();
                } else if (input.value && index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
            });

            input.addEventListener('input', () => {
                if (input.value.length > 1) {
                    input.value = input.value[0];
                }
            });
        });
    }

    function clearVerificationInputs(modalId) {
        const modal = document.getElementById(modalId);
        const inputs = modal.querySelectorAll('.verification-code-input');
        inputs.forEach(input => input.value = '');
    }

    function getVerificationCode(modalId) {
        const modal = document.getElementById(modalId);
        const inputs = modal.querySelectorAll('.verification-code-input');
        return Array.from(inputs).map(input => input.value).join('');
    }
