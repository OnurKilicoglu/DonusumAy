 
    // --- DATA ---
    const notaryData = {
        profile: {
            name: 'Ahmet Çelik',
            notaryName: 'Kadıköy 15. Noterliği',
            notaryId: '12345',
            city: 'İstanbul',
            district: 'Kadıköy',
            notaryOffice: 'Kadıköy 15. Noterliği',
            address: 'Caferağa Mah. Mühürdar Cad. No:5 D:1, 34710 Kadıköy/İstanbul',
            phone: '0216 123 45 67',
            personalPhone: '+90 532 123 45 67',
            email: 'ahmet.celik@noter.com',
            workingHours: 'Hafta içi 09:00 - 17:00',
            isServiceActive: true,
            hasMobileNotary: true,
            verificationDocuments: [
                { name: 'Noter Kimlik Belgesi.pdf', url: '#', status: 'verified' },
                { name: 'Noter Sicil Belgesi.pdf', url: '#', status: 'verified' }
            ],
            workingCalendar: {
                monday: { open: true, hours: '09:00-17:00', mobileNotaryAvailable: false },
                tuesday: { open: true, hours: '09:00-17:00', mobileNotaryAvailable: false },
                wednesday: { open: true, hours: '09:00-17:00', mobileNotaryAvailable: false },
                thursday: { open: true, hours: '09:00-17:00', mobileNotaryAvailable: false },
                friday: { open: true, hours: '09:00-17:00', mobileNotaryAvailable: false },
                saturday: { open: false, hours: '', mobileNotaryAvailable: true },
                sunday: { open: false, hours: '', mobileNotaryAvailable: true },
                holidays: { open: false, mobileNotaryAvailable: true }
            }
        },
        payments: {
            totalEarnings: 15750.00,
            thisMonthEarnings: 2850.00,
            todayEarnings: 350.00,
            pendingPayments: 850.00,
            history: [
                {
                    id: 'pay-001',
                    projectId: 'proj-01',
                    projectName: 'Kadıköy Merkez Bina Uygulama Projesi',
                    customerName: 'Ali Veli',
                    amount: 350.00,
                    date: '2025-01-15',
                    status: 'completed',
                    receiptUrl: '#receipt-001',
                    description: 'Sözleşme Noter Onay Ücreti'
                },
                {
                    id: 'pay-002',
                    projectId: 'proj-02',
                    projectName: 'Ataşehir Finans Merkezi Kule Projesi',
                    customerName: 'Ayşe Yılmaz',
                    amount: 500.00,
                    date: '2025-01-10',
                    status: 'completed',
                    receiptUrl: '#receipt-002',
                    description: 'Sözleşme Noter Onay Ücreti'
                },
                {
                    id: 'pay-003',
                    projectId: 'proj-03',
                    projectName: 'Beşiktaş Lüks Residence Projesi',
                    customerName: 'Mehmet Kaya',
                    amount: 750.00,
                    date: '2025-01-08',
                    status: 'pending',
                    receiptUrl: null,
                    description: 'Sözleşme Noter Onay Ücreti'
                }
            ],
            monthlyData: [
                { month: 'Ocak 2025', amount: 2850.00, count: 8 },
                { month: 'Aralık 2024', amount: 3200.00, count: 12 },
                { month: 'Kasım 2024', amount: 2100.00, count: 7 },
                { month: 'Ekim 2024', amount: 2750.00, count: 9 },
                { month: 'Eylül 2024', amount: 1950.00, count: 6 },
                { month: 'Ağustos 2024', amount: 2900.00, count: 10 }
            ]
        },
        subscription: {
            plan: 'Premium Noter',
            status: 'active',
            price: 299.00,
            currency: 'TL',
            nextPaymentDate: '2025-02-15',
            startDate: '2024-02-15',
            features: [
                'Sınırsız proje atama',
                'Gelişmiş raporlama',
                'Öncelikli müşteri desteği',
                'Mobil uygulama erişimi',
                'API entegrasyonu',
                'Otomatik makbuz oluşturma'
            ],
            paymentHistory: [
                { date: '2025-01-15', amount: 299.00, status: 'paid', description: 'Aylık Abonelik - Ocak 2025' },
                { date: '2024-12-15', amount: 299.00, status: 'paid', description: 'Aylık Abonelik - Aralık 2024' },
                { date: '2024-11-15', amount: 299.00, status: 'paid', description: 'Aylık Abonelik - Kasım 2024' }
            ]
        },
        stats: {
            assignedProjects: 2,
            pendingAppointments: 1,
            pendingDocuments: 1,
        },
        projects: [
            {
                id: 'proj-01',
                name: 'Kadıköy Merkez Bina Uygulama Projesi',
                customerName: 'Ali Veli',
                contractorName: 'Güven İnşaat A.Ş.',
                status: 'docs_pending', // docs_pending, docs_approved, appointment_set, contract_uploaded, completed
                notaryPrice: null, // Noter ücreti
                priceSet: false, // Ücret belirlenmiş mi?
                priceDescription: null, // Ücret açıklaması
                contractTypes: [
                    'Arsa Payı Karşılığı İnşaat Sözleşmesi',
                    'Kat Karşılığı İnşaat Sözleşmesi (Arsa Payı Karşılığı İnşaat Sözleşmesi)',
                    'Anahtar Teslim İnşaat Sözleşmesi',
                    'Gayrimenkul Satış Vaadi Sözleşmesi',
                    'Vekaletname (Genel/Özel)',
                    'Sözleşme Fesihname / İkale Sözleşmesi',
                    'Muafakatname / İzin Belgesi',
                    'Borç İkrarı / Borç Senedi',
                    'Düzenleme Şeklinde Tapu Devri (İmar Yasası Kapsamında):'
                ],
                uploadedDocuments: {
                    customer: [
                        { name: 'Kimlik Fotokopisi.pdf', url: '#' },
                        { name: 'Tapu Örneği.pdf', url: '#' },
                    ],
                    contractor: [
                        { name: 'İmza Sirküleri.pdf', url: '#' },
                        { name: 'Vergi Levhası.pdf', url: '#' },
                    ]
                },
                appointment: null,
                notarizedContractUrl: null,
                chatHistory: []
            },
            {
                id: 'proj-02',
                name: 'Ataşehir Finans Merkezi Kule Projesi',
                customerName: 'Ayşe Yılmaz',
                contractorName: 'Sağlam Yapı Ltd.',
                status: 'appointment_set',
                notaryPrice: 500.00, // Noter ücreti
                priceSet: true, // Ücret belirlenmiş mi?
                priceDescription: 'Arsa payı karşılığı inşaat sözleşmesi noter onayı', // Ücret açıklaması
                contractTypes: [
                    'Arsa Payı Karşılığı İnşaat Sözleşmesi',
                    'Kat Karşılığı İnşaat Sözleşmesi',
                    'İnşaat Müteahhitlik Sözleşmesi'
                ],
                uploadedDocuments: {
                    customer: [{ name: 'Vekaletname.pdf', url: '#' }],
                    contractor: [{ name: 'Ticaret Sicil Gazetesi.pdf', url: '#' }]
                },
                appointment: {
                    id: 'app-01',
                    date: '2025-08-15',
                    time: '14:00',
                    subject: 'Arsa Payı Karşılığı İnşaat Sözleşmesi',
                    smsReminderEnabled: true
                },
                notarizedContractUrl: null,
                chatHistory: [
                     { sender: 'notary', recipient: 'customer', text: 'Ayşe Hanım, 15 Ağustos 14:00 randevunuzu teyit ediyorum.', timestamp: Date.now() - 2 * 86400000 },
                     { sender: 'customer', recipient: 'notary', text: 'Teşekkürler Ahmet Bey, orada olacağım.', timestamp: Date.now() - 86400000 },
                ]
            }
        ],
        faq: [
            {
                id: 'faq-1',
                question: "Yeni bir projeyi nasıl kabul ederim?",
                answer: "Projelerim sayfasında size atanan yeni projeler görünecektir. Projeyi detaylı inceledikten sonra 'Kabul Et' butonu ile süreci başlatabilirsiniz. Platformumuz şu anki versiyonda otomatik atama yapmaktadır."
            },
            {
                id: 'faq-2',
                question: "Belgeleri nasıl incelerim ve onaylarım?",
                answer: "'Projelerim' bölümündeki ilgili proje kartından 'Belgeler' butonuna tıklayarak tarafların yüklediği dokümanları görüntüleyebilir ve indirebilirsiniz. Tüm belgeleri inceledikten sonra 'Tüm Belgeleri Onayla' butonuna basarak bir sonraki adıma geçebilirsiniz."
            },
            {
                id: 'faq-3',
                question: "Randevu oluştururken nelere dikkat etmeliyim?",
                answer: "Belgeleri onayladıktan sonra proje kartındaki 'Randevu' butonu aktif olacaktır. Bu butona tıklayarak tarih, saat ve konu belirleyebilir, taraflara SMS ile hatırlatıcı gönderilmesini sağlayabilirsiniz. Tarih ve saatin hem sizin hem de taraflar için uygun olduğundan emin olun."
            },
            {
                id: 'faq-4',
                question: "Noter onaylı sözleşmeyi platforma nasıl yüklerim?",
                answer: "Randevu gerçekleşip sözleşme imzalandıktan sonra, proje kartındaki 'Sözleşme' butonuna tıklayarak açılan modal üzerinden taranmış PDF kopyasını sisteme yükleyebilirsiniz. Bu işlem projenin tamamlanmasını sağlar."
            },
            {
                id: 'faq-5',
                question: "Hizmetimi devre dışı bıraktığımda ne olur?",
                answer: "Hizmetinizi devre dışı bıraktığınızda sistem üzerinden size yeni proje ataması yapılmaz. Ancak devam eden projelerinizdeki (randevusu ayarlanmış veya sözleşme yükleme aşamasındaki) işlemleriniz etkilenmez ve bunları tamamlamanız beklenir."
            }
        ],
        liveChat: {
            sessionId: null,
            messages: []
        },
        // appointments would likely be derived from projects for consistency
    };

    let tempNotarizedContractFile = null;

    // --- CORE UI FUNCTIONS ---
    function showSection(sectionId) {
        ['dashboard-section', 'projects-section', 'appointments-section', 'messages-section', 'profile-section', 'payments-section', 'support-section'].forEach(id => {
            document.getElementById(id)?.classList.add('hidden');
        });
        
        document.getElementById(sectionId)?.classList.remove('hidden');

        document.querySelectorAll('#sidebar-nav a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('onclick')?.includes(sectionId)) {
                link.classList.add('active');
            }
        });
        
        if (sectionId === 'dashboard-section') renderDashboard();
        else if (sectionId === 'projects-section') renderProjects();
        else if (sectionId === 'appointments-section') renderAppointments();
        else if (sectionId === 'messages-section') renderMessages();
        else if (sectionId === 'profile-section') renderProfileSection();
        else if (sectionId === 'payments-section') renderPaymentsSection();
        else if (sectionId === 'support-section') renderSupportSection();
        
        closeMobileMenu();
    }

    function openMobileMenu() {
        document.getElementById('sidebar').classList.remove('-translate-x-full');
        document.getElementById('sidebar-overlay').classList.remove('hidden');
    }
    
    function closeMobileMenu() {
        document.getElementById('sidebar')?.classList.add('-translate-x-full');
        document.getElementById('sidebar-overlay')?.classList.add('hidden');
    }

    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
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
    
    // --- SUPPORT SECTION ---
    function renderSupportSection() {
        const container = document.getElementById('support-content');
        const profile = notaryData.profile;
        const faqs = notaryData.faq;

        const serviceSection = profile.isServiceActive
            ? '<button id="deactivate-service-button" onclick="openDeactivateServiceModal()" class="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 text-sm font-semibold shadow transition-colors">Hizmeti Devre Dışı Bırak</button>'
            : '<div class="p-4 bg-yellow-100 text-yellow-800 rounded-lg text-sm">Hizmetiniz şu anda devre dışı. Yeniden etkinleştirmek için lütfen destek ekibiyle iletişime geçin.</div>';

        const personalPhoneStatus = profile.personalPhone 
            ? '! Doğrulanmamış' 
            : 'Telefon eklenmemiş';
        
        const personalPhoneClass = profile.personalPhone 
            ? 'text-yellow-600' 
            : 'text-gray-400';
            
        const personalPhoneDisplay = profile.personalPhone || 'Eklenmemiş';
        const personalPhoneDisabled = !profile.personalPhone ? 'disabled' : '';

        container.innerHTML = `
            <!-- Deactivate Service -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 class="text-lg font-bold text-gray-800 mb-2">Dijital Hizmeti Yönet</h3>
                <p class="text-gray-600 mb-4 text-sm">DönüşümAY platformundaki dijital noterlik hizmetinizi geçici olarak veya kalıcı olarak yönetebilirsiniz. Hizmetiniz devre dışı bırakıldığında yeni proje atamaları almayacaksınız. Mevcut randevularınız ve sözleşme süreçleriniz devam edecektir.</p>
                ${serviceSection}
            </div>

            <!-- Security Settings -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 class="text-lg font-bold text-gray-800 mb-4">Güvenlik Ayarları</h3>
                <div class="space-y-4">
                    <div class="border-b pb-4">
                        <h4 class="font-semibold text-gray-700 mb-2">Şifre Değiştir</h4>
                        <div class="space-y-3">
                            <input type="password" id="current-password" placeholder="Mevcut şifre" class="w-full p-2 border rounded-lg text-sm">
                            <input type="password" id="new-password" placeholder="Yeni şifre" class="w-full p-2 border rounded-lg text-sm">
                            <input type="password" id="confirm-password" placeholder="Yeni şifreyi onayla" class="w-full p-2 border rounded-lg text-sm">
                            <button onclick="changePassword()" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">Şifreyi Değiştir</button>
                        </div>
                    </div>
                    
                    <div class="border-b pb-4">
                        <h4 class="font-semibold text-gray-700 mb-2">E-posta Doğrulama</h4>
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm text-gray-600">E-posta adresiniz: <span class="font-medium">${profile.email}</span></p>
                                <p class="text-xs text-green-600">✓ Doğrulanmış</p>
                            </div>
                            <button onclick="resendEmailVerification()" class="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 text-sm">Doğrulama E-postası Gönder</button>
                        </div>
                    </div>
                    
                    <div>
                        <h4 class="font-semibold text-gray-700 mb-2">Telefon Doğrulama</h4>
                        <div class="space-y-3">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm text-gray-600">İş telefonu: <span class="font-medium">${profile.phone}</span></p>
                                    <p class="text-xs text-green-600">✓ Doğrulanmış</p>
                                </div>
                                <button onclick="verifyPhone('work')" class="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 text-sm">SMS Gönder</button>
                            </div>
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm text-gray-600">Şahsi telefon: <span class="font-medium">${personalPhoneDisplay}</span></p>
                                    <p class="text-xs ${personalPhoneClass}">${personalPhoneStatus}</p>
                                </div>
                                <button onclick="verifyPhone('personal')" ${personalPhoneDisabled} class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm disabled:bg-gray-300 disabled:text-gray-500">SMS Gönder</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Live Chat -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 class="text-lg font-bold text-gray-800 mb-2">Canlı Destek</h3>
                <p class="text-gray-600 mb-4 text-sm">Herhangi bir sorunuz veya acil durumunuz için müşteri temsilcimizle anında iletişime geçin.</p>
                <button id="start-live-chat-button" onclick="startPreChat()" class="bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary-dark text-sm font-semibold shadow transition-colors">Canlı Sohbete Başla</button>
            </div>

            <!-- FAQ -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 class="text-lg font-bold text-gray-800 mb-4">Sıkça Sorulan Sorular</h3>
                <div id="faq-accordion" class="space-y-3">
                    ${faqs.map(faq => `
                        <div>
                            <button onclick="toggleFaq('${faq.id}')" class="w-full text-left flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg focus:outline-none">
                                <h4 class="font-semibold text-gray-700">${faq.question}</h4>
                                <i id="faq-icon-${faq.id}" class="fas fa-chevron-down transform transition-transform"></i>
                            </button>
                            <div id="faq-answer-${faq.id}" class="hidden p-4 text-gray-600 text-sm">
                                <p>${faq.answer}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    function toggleFaq(faqId) {
        const answer = document.getElementById(`faq-answer-${faqId}`);
        const icon = document.getElementById(`faq-icon-${faqId}`);
        if (!answer || !icon) return;

        const isHidden = answer.classList.contains('hidden');
        if (isHidden) {
            answer.classList.remove('hidden');
            icon.classList.add('rotate-180');
        } else {
            answer.classList.add('hidden');
            icon.classList.remove('rotate-180');
        }
    }

    function openDeactivateServiceModal() {
        openModal('deactivate-service-modal');
    }

    function confirmDeactivateService() {
        notaryData.profile.isServiceActive = false;
        // In a real app, this would be an API call to a backend/Firebase:
        // await updateDoc(doc(db, 'notaries', userId, 'profile'), { isServiceActive: false });
        closeModal('deactivate-service-modal');
        showNotification('Hizmetiniz başarıyla devre dışı bırakıldı.', 'success');
        renderSupportSection(); // Re-render the support section to update the UI
    }

    function startPreChat() {
        openModal('pre-chat-modal');
    }

    function startLiveChat() {
        const messageInput = document.getElementById('pre-chat-message');
        const initialMessage = messageInput.value.trim();
        if (!initialMessage) {
            showNotification('Lütfen başlamak için bir mesaj yazın.', 'warning');
            return;
        }
        
        closeModal('pre-chat-modal');
        openModal('live-chat-modal');

        // Simulate starting a chat session
        notaryData.liveChat.sessionId = 'chat-' + Date.now();
        notaryData.liveChat.messages = [];
        
        // Add user's first message
        notaryData.liveChat.messages.push({ sender: 'notary', text: initialMessage, timestamp: new Date() });
        
        // Simulate agent response
        setTimeout(() => {
            notaryData.liveChat.messages.push({ sender: 'support', text: 'DönüşümAY desteğe hoş geldiniz. Size nasıl yardımcı olabilirim?', timestamp: new Date() });
            renderLiveChatMessages();
        }, 1500);
        
        renderLiveChatMessages();
        messageInput.value = '';
    }

    function renderLiveChatMessages() {
        const container = document.getElementById('live-chat-messages');
        container.innerHTML = notaryData.liveChat.messages.map(msg => {
            const isNotary = msg.sender === 'notary';
            const align = isNotary ? 'justify-end' : 'justify-start';
            const bubbleColor = isNotary ? `bg-primary text-white rounded-br-none` : `bg-gray-200 text-gray-800 rounded-bl-none`;
            return `
               <div class="flex ${align}">
                   <div class="max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${bubbleColor}">
                       <p class="text-sm">${msg.text}</p>
                   </div>
               </div>
            `;
        }).join('');
        container.scrollTop = container.scrollHeight;
    }

    function sendLiveChatMessage() {
        const input = document.getElementById('live-chat-input');
        const text = input.value.trim();
        if (!text) return;

        notaryData.liveChat.messages.push({ sender: 'notary', text, timestamp: new Date() });
        renderLiveChatMessages();
        input.value = '';

        // Simulate agent typing and response
        setTimeout(() => {
            const response = "Mesajınızı aldım, inceliyorum. Bu bir simülasyon yanıtıdır.";
            notaryData.liveChat.messages.push({ sender: 'support', text: response, timestamp: new Date() });
            renderLiveChatMessages();
        }, 2000);
    }

    function handleLiveChatFileUpload(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        showNotification(`'${file.name}' gönderiliyor... (simülasyon)`, 'info');
        // In a real app, upload file to a storage service and add a link to chat.
        event.target.value = '';
    }

    // --- DASHBOARD ---
    function renderDashboard() {
        const container = document.getElementById('dashboard-content');
        container.innerHTML = `
            <div id="stats-grid" class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"></div>
            <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div class="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div class="px-6 py-4 border-b border-gray-200">
                        <h3 class="text-lg font-semibold text-gray-800">Yaklaşan Randevular</h3>
                    </div>
                    <div id="dashboard-appointments-list" class="p-6 space-y-4"></div>
                </div>
                <div class="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div class="px-6 py-4 border-b border-gray-200">
                        <h3 class="text-lg font-semibold text-gray-800">Son Aktiviteler</h3>
                    </div>
                    <div id="dashboard-activity-list" class="p-6 space-y-3"></div>
                </div>
            </div>
        `;
        renderDashboardStats();
        renderDashboardAppointments();
        renderDashboardActivity();
    }

    function renderDashboardStats() {
        const container = document.getElementById('stats-grid');
        const stats = notaryData.stats;
        const statsCards = [
            { 
                title: 'Atanan Projeler', 
                value: stats.assignedProjects, 
                icon: 'fas fa-project-diagram', 
                color: 'text-blue-600', 
                bgColor: 'bg-blue-100',
                onClick: () => showSection('projects-section')
            },
            { 
                title: 'Bekleyen Randevular', 
                value: stats.pendingAppointments, 
                icon: 'fas fa-calendar-alt', 
                color: 'text-green-600', 
                bgColor: 'bg-green-100',
                onClick: () => showSection('appointments-section')
            },
            { 
                title: 'Onay Bekleyen Belgeler', 
                value: notaryData.projects.filter(p => p.status === 'docs_pending').length, 
                icon: 'fas fa-file-signature', 
                color: 'text-orange-600', 
                bgColor: 'bg-orange-100',
                onClick: () => showSection('projects-section')
            }
        ];

        container.innerHTML = statsCards.map((stat, index) => `
            <div onclick="navigateFromDashboard(${index})" class="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between hover:shadow-md transition-all cursor-pointer hover:border-primary transform hover:scale-105">
                <div>
                    <p class="text-sm font-medium text-gray-500">${stat.title}</p>
                    <p class="text-3xl font-bold text-gray-900 mt-1">${stat.value}</p>
                    <p class="text-xs text-primary mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Görüntülemek için tıklayın</p>
                </div>
                <div class="w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center">
                    <i class="${stat.icon} text-2xl ${stat.color}"></i>
                </div>
            </div>
        `).join('');
    }

    function navigateFromDashboard(cardIndex) {
        const actions = [
            () => showSection('projects-section'),      // Atanan Projeler
            () => showSection('appointments-section'),  // Bekleyen Randevular  
            () => showSection('projects-section')       // Onay Bekleyen Belgeler
        ];
        
        if (actions[cardIndex]) {
            actions[cardIndex]();
            
            // Show appropriate notification
            const messages = [
                'Projelerim sayfasına yönlendiriliyorsunuz...',
                'Randevularım sayfasına yönlendiriliyorsunuz...',
                'Onay bekleyen belgeleri görüntülemek için Projelerim sayfasına yönlendiriliyorsunuz...'
            ];
            showNotification(messages[cardIndex], 'info');
        }
    }

    function renderDashboardAppointments() {
        const container = document.getElementById('dashboard-appointments-list');
        const upcomingAppointments = notaryData.projects
            .filter(p => p.appointment && new Date(p.appointment.date) >= new Date())
            .map(p => ({ ...p.appointment, projectName: p.name }))
            .sort((a,b) => new Date(a.date) - new Date(b.date));
        
        if (upcomingAppointments.length === 0) {
            container.innerHTML = '<p class="text-gray-500 text-center py-8">Yaklaşan randevu bulunmuyor.</p>';
            return;
        }

        container.innerHTML = upcomingAppointments.slice(0, 3).map(app => `
            <div class="border rounded-lg p-4 transition-shadow hover:shadow-sm">
                <p class="text-xs text-primary font-semibold">${app.projectName}</p>
                <h4 class="font-semibold text-gray-800 mt-1">${new Date(app.date).toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric'})} - ${app.time}</h4>
                <p class="text-sm text-gray-600">${app.subject}</p>
            </div>
        `).join('');
    }

    function renderDashboardActivity() {
         const container = document.getElementById('dashboard-activity-list');
         container.innerHTML = `<p class="text-gray-500 text-center py-8">Aktivite geçmişi özelliği yakında eklenecektir.</p>`;
    }

    // --- PROJECTS ---
    function renderProjects() {
        const container = document.getElementById('projects-list');
        const projects = notaryData.projects;

        const statusMap = {
            docs_pending: { text: 'Belge İnceleme Bekleniyor', color: 'bg-yellow-100 text-yellow-800' },
            docs_approved: { text: 'Belgeler Onaylandı', color: 'bg-blue-100 text-blue-800' },
            appointment_set: { text: 'Randevu Ayarlandı', color: 'bg-indigo-100 text-indigo-800' },
            contract_uploaded: { text: 'Sözleşme Onaylandı', color: 'bg-green-100 text-green-800' },
            completed: { text: 'Proses Tamamlandı', color: 'bg-gray-200 text-gray-800' }
        };

        container.innerHTML = projects.map(project => {
            const statusInfo = statusMap[project.status] || { text: 'Bilinmiyor', color: 'bg-gray-100 text-gray-800' };
            const isDocsApproved = project.status !== 'docs_pending';
            const isAppointmentSet = project.appointment !== null;

            const priceButtonText = project.priceSet ? `₺${project.notaryPrice}` : 'Ücret Belirle';
            const priceButtonStyle = project.priceSet ? 'bg-green-100 hover:bg-green-200 text-green-800' : 'bg-orange-100 hover:bg-orange-200 text-orange-800';
            
            const buttons = `
                <button onclick="openReviewDocumentsModal('${project.id}')" class="w-full text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 rounded-lg transition-colors flex items-center justify-center space-x-2">
                    <i class="fas fa-folder-open"></i><span>Belgeler</span>
                </button>
                <button onclick="openSetPriceModal('${project.id}')" class="w-full text-sm ${priceButtonStyle} font-semibold py-3 rounded-lg transition-colors flex items-center justify-center space-x-2">
                    <i class="fas fa-tag"></i><span>${priceButtonText}</span>
                </button>
                <button onclick="openScheduleAppointmentModal('${project.id}')" ${!isDocsApproved ? 'disabled' : ''} class="w-full text-sm bg-indigo-100 hover:bg-indigo-200 text-indigo-800 font-semibold py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 disabled:bg-gray-200 disabled:text-gray-400">
                    <i class="fas fa-calendar-plus"></i><span>Randevu</span>
                </button>
                <button onclick="openProjectChatModal('${project.id}')" class="w-full text-sm bg-purple-100 hover:bg-purple-200 text-purple-800 font-semibold py-3 rounded-lg transition-colors flex items-center justify-center space-x-2">
                    <i class="fas fa-comments"></i><span>Mesajlaş</span>
                </button>
                <button onclick="openUploadNotarizedContractModal('${project.id}')" ${!isAppointmentSet ? 'disabled' : ''} class="w-full text-sm bg-green-100 hover:bg-green-200 text-green-800 font-semibold py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 disabled:bg-gray-200 disabled:text-gray-400">
                    <i class="fas fa-file-signature"></i><span>Sözleşme</span>
                </button>
                <button onclick="openNotaryPaymentModal('${project.id}')" class="w-full text-sm bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold py-3 rounded-lg transition-colors flex items-center justify-center space-x-2">
                    <i class="fas fa-credit-card"></i><span>Noter ile Öde</span>
                </button>
            `;
            return `
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col group hover:shadow-md transition-shadow">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="font-bold text-lg text-gray-800">${project.name}</h3>
                    <span class="text-xs font-medium px-2.5 py-0.5 rounded-full ${statusInfo.color}">${statusInfo.text}</span>
                </div>
                <div class="text-sm text-gray-500 mb-4 flex-grow space-y-1">
                    <p><strong>Müşteri:</strong> ${project.customerName}</p>
                    <p><strong>Müteahhit:</strong> ${project.contractorName}</p>
                </div>
                <div class="mt-auto pt-4 border-t border-gray-100 space-y-2">
                    ${buttons}
                </div>
            </div>
            `;
        }).join('');
    }

    // --- PROFILE ---
    function renderProfileSection() {
        const profile = notaryData.profile;
        document.getElementById('welcome-message').textContent = `Hoş Geldiniz, ${profile.name}`;
        
        // Location and notary selection
        document.getElementById('profile-city').value = profile.city || '';
        document.getElementById('profile-district').value = profile.district || '';
        document.getElementById('profile-notary-office').value = profile.notaryOffice || '';
        
        // Populate districts and notary offices if city is selected
        if (profile.city) {
            updateDistricts();
            if (profile.district) {
                setTimeout(() => {
                    document.getElementById('profile-district').value = profile.district;
                    updateNotaryOffices();
                    setTimeout(() => {
                        document.getElementById('profile-notary-office').value = profile.notaryOffice || '';
                    }, 100);
                }, 100);
            }
        }
        
        // Notary info
        document.getElementById('profile-notary-name').value = profile.notaryName;
        document.getElementById('profile-notary-id').value = profile.notaryId;
        document.getElementById('profile-address').value = profile.address;
        document.getElementById('profile-phone').value = profile.phone;
        document.getElementById('profile-personal-phone').value = profile.personalPhone || '';
        document.getElementById('profile-email').value = profile.email;
        
        // Mobile notary toggle
        renderMobileNotaryToggle(profile.hasMobileNotary);
        
        // Render verification documents
        renderVerificationDocuments();
        
        // Render working calendar
        renderWorkingCalendar();
    }

    function updateNotaryProfile() {
        notaryData.profile.city = document.getElementById('profile-city').value;
        notaryData.profile.district = document.getElementById('profile-district').value;
        notaryData.profile.notaryOffice = document.getElementById('profile-notary-office').value;
        notaryData.profile.notaryName = document.getElementById('profile-notary-name').value;
        notaryData.profile.address = document.getElementById('profile-address').value;
        notaryData.profile.phone = document.getElementById('profile-phone').value;
        notaryData.profile.personalPhone = document.getElementById('profile-personal-phone').value;
        showNotification('Profil bilgileriniz başarıyla güncellendi.', 'success');
        renderProfileSection(); // To update welcome message etc.
    }

    function updateDistricts() {
        const citySelect = document.getElementById('profile-city');
        const districtSelect = document.getElementById('profile-district');
        const notarySelect = document.getElementById('profile-notary-office');
        
        const districts = {
            'İstanbul': ['Kadıköy', 'Üsküdar', 'Şişli', 'Beşiktaş', 'Beyoğlu', 'Fatih', 'Bakırköy'],
            'Ankara': ['Çankaya', 'Keçiören', 'Yenimahalle', 'Mamak', 'Sincan', 'Altındağ'],
            'İzmir': ['Konak', 'Karşıyaka', 'Bornova', 'Buca', 'Bayraklı', 'Çiğli'],
            'Bursa': ['Osmangazi', 'Nilüfer', 'Yıldırım', 'Mudanya', 'Gemlik'],
            'Antalya': ['Muratpaşa', 'Kepez', 'Döşemealtı', 'Aksu', 'Konyaaltı']
        };
        
        districtSelect.innerHTML = '<option value="">İlçe seçiniz</option>';
        notarySelect.innerHTML = '<option value="">Noter seçiniz</option>';
        
        if (citySelect.value && districts[citySelect.value]) {
            districts[citySelect.value].forEach(district => {
                const option = document.createElement('option');
                option.value = district;
                option.textContent = district;
                districtSelect.appendChild(option);
            });
        }
    }

    function updateNotaryOffices() {
        const districtSelect = document.getElementById('profile-district');
        const notarySelect = document.getElementById('profile-notary-office');
        
        notarySelect.innerHTML = '<option value="">Noter seçiniz</option>';
        
        if (districtSelect.value) {
            // Sample notary offices for each district
            for (let i = 1; i <= 5; i++) {
                const option = document.createElement('option');
                option.value = `${districtSelect.value} ${i}. Noterliği`;
                option.textContent = `${districtSelect.value} ${i}. Noterliği`;
                notarySelect.appendChild(option);
            }
        }
    }

    function toggleMobileNotary() {
        const knob = document.getElementById('mobile-notary-knob');
        const bg = document.getElementById('mobile-notary-bg');
        const isEnabled = knob.classList.toggle('translate-x-5');
        knob.classList.toggle('translate-x-0', !isEnabled);
        bg.classList.toggle('bg-green-400', isEnabled);
        bg.classList.toggle('bg-gray-300', !isEnabled);
        notaryData.profile.hasMobileNotary = isEnabled;
    }

    function renderMobileNotaryToggle(isEnabled) {
        const knob = document.getElementById('mobile-notary-knob');
        const bg = document.getElementById('mobile-notary-bg');
        if (knob && bg) {
            knob.classList.toggle('translate-x-5', isEnabled);
            knob.classList.toggle('translate-x-0', !isEnabled);
            bg.classList.toggle('bg-green-400', isEnabled);
            bg.classList.toggle('bg-gray-300', !isEnabled);
        }
    }

    function uploadVerificationDocument(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        // Simulate document upload
        const newDoc = {
            name: file.name,
            url: '#',
            status: 'pending'
        };
        
        notaryData.profile.verificationDocuments.push(newDoc);
        renderVerificationDocuments();
        showNotification(`'${file.name}' başarıyla yüklendi. İnceleme için gönderildi.`, 'success');
        event.target.value = '';
    }

    function renderVerificationDocuments() {
        const container = document.getElementById('verification-documents-list');
        const docs = notaryData.profile.verificationDocuments;
        
        if (docs.length === 0) {
            container.innerHTML = '<p class="text-gray-500 text-sm">Henüz belge yüklenmemiş.</p>';
            return;
        }
        
        container.innerHTML = docs.map(doc => {
            const statusColors = {
                verified: 'bg-green-100 text-green-800',
                pending: 'bg-yellow-100 text-yellow-800',
                rejected: 'bg-red-100 text-red-800'
            };
            const statusTexts = {
                verified: 'Onaylandı',
                pending: 'İnceleniyor',
                rejected: 'Reddedildi'
            };
            
            return `
                <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                    <div class="flex items-center space-x-3">
                        <i class="fas fa-file-pdf text-red-500"></i>
                        <span class="text-sm font-medium">${doc.name}</span>
                        <span class="text-xs px-2 py-1 rounded-full ${statusColors[doc.status]}">${statusTexts[doc.status]}</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <a href="${doc.url}" target="_blank" class="text-blue-600 hover:underline text-sm">Görüntüle</a>
                        <button onclick="removeVerificationDocument('${doc.name}')" class="text-red-600 hover:text-red-800 text-sm">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    function removeVerificationDocument(fileName) {
        if (confirm('Bu belgeyi silmek istediğinizden emin misiniz?')) {
            notaryData.profile.verificationDocuments = notaryData.profile.verificationDocuments.filter(doc => doc.name !== fileName);
            renderVerificationDocuments();
            showNotification('Belge başarıyla silindi.', 'success');
        }
    }

    function renderWorkingCalendar() {
        const container = document.getElementById('working-calendar');
        const calendar = notaryData.profile.workingCalendar;
        const days = {
            monday: 'Pazartesi',
            tuesday: 'Salı',
            wednesday: 'Çarşamba',
            thursday: 'Perşembe',
            friday: 'Cuma',
            saturday: 'Cumartesi',
            sunday: 'Pazar'
        };
        
        let calendarHTML = '';
        
        Object.entries(days).forEach(([dayKey, dayName]) => {
            const dayData = calendar[dayKey];
            calendarHTML += `
                <div class="border rounded-lg p-4">
                    <div class="flex items-center justify-between mb-3">
                        <h5 class="font-semibold text-gray-700">${dayName}</h5>
                        <label class="flex items-center space-x-2">
                            <input type="checkbox" ${dayData.open ? 'checked' : ''} onchange="toggleWorkingDay('${dayKey}')" class="rounded">
                            <span class="text-sm">Açık</span>
                        </label>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <label class="block text-xs text-gray-600 mb-1">Çalışma Saatleri</label>
                            <input type="text" id="hours-${dayKey}" value="${dayData.hours}" ${!dayData.open ? 'disabled' : ''} placeholder="09:00-17:00" class="w-full p-2 text-sm border rounded disabled:bg-gray-100">
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-xs text-gray-600">Gezici Noter</span>
                            <label class="flex items-center space-x-2">
                                <input type="checkbox" ${dayData.mobileNotaryAvailable ? 'checked' : ''} onchange="toggleMobileNotaryDay('${dayKey}')" class="rounded">
                                <span class="text-xs">Aktif</span>
                            </label>
                        </div>
                    </div>
                </div>
            `;
        });
        
        // Add holidays section
        calendarHTML += `
            <div class="border rounded-lg p-4 bg-yellow-50">
                <h5 class="font-semibold text-gray-700 mb-3">Resmi Tatiller</h5>
                <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-600">Resmi tatillerde ofis kapalı</span>
                    <div class="flex items-center space-x-4">
                        <label class="flex items-center space-x-2">
                            <span class="text-xs text-gray-600">Gezici Noter:</span>
                            <input type="checkbox" ${calendar.holidays.mobileNotaryAvailable ? 'checked' : ''} onchange="toggleHolidayMobileNotary()" class="rounded">
                            <span class="text-xs">Aktif</span>
                        </label>
                    </div>
                </div>
            </div>
        `;
        
        container.innerHTML = calendarHTML;
    }

    function toggleWorkingDay(dayKey) {
        const checkbox = event.target;
        const hoursInput = document.getElementById(`hours-${dayKey}`);
        
        notaryData.profile.workingCalendar[dayKey].open = checkbox.checked;
        hoursInput.disabled = !checkbox.checked;
        
        if (!checkbox.checked) {
            hoursInput.value = '';
            notaryData.profile.workingCalendar[dayKey].hours = '';
        }
    }

    function toggleMobileNotaryDay(dayKey) {
        notaryData.profile.workingCalendar[dayKey].mobileNotaryAvailable = event.target.checked;
    }

    function toggleHolidayMobileNotary() {
        notaryData.profile.workingCalendar.holidays.mobileNotaryAvailable = event.target.checked;
    }
    
    // --- APPOINTMENTS ---
    function renderAppointments() {
        const container = document.getElementById('appointments-list');
        const searchInput = document.getElementById('appointment-search');
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        
        let allAppointments = notaryData.projects
            .filter(p => p.appointment)
            .map(p => ({ ...p.appointment, projectName: p.name, customerName: p.customerName, contractorName: p.contractorName, projectId: p.id }))
            .sort((a,b) => new Date(a.date) - new Date(b.date));

        // Filter appointments based on search term
        if (searchTerm) {
            allAppointments = allAppointments.filter(app => 
                app.projectName.toLowerCase().includes(searchTerm) ||
                app.customerName.toLowerCase().includes(searchTerm) ||
                app.contractorName.toLowerCase().includes(searchTerm) ||
                app.subject.toLowerCase().includes(searchTerm)
            );
        }

        if (allAppointments.length === 0) {
            const message = searchTerm ? 'Arama kriterinize uygun randevu bulunamadı.' : 'Planlanmış randevu bulunmuyor.';
            container.innerHTML = `<div class="text-center py-12 bg-white rounded-lg shadow-sm border"><i class="fas fa-calendar-times fa-3x text-gray-300 mb-4"></i><h3 class="text-xl font-semibold text-gray-700">${message}</h3></div>`;
            return;
        }

        container.innerHTML = `
            <div class="bg-white rounded-xl shadow-sm border divide-y divide-gray-100">
                ${allAppointments.map(app => `
                    <div class="p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <p class="text-primary font-bold">${app.projectName}</p>
                            <p class="text-sm text-gray-600"><strong>Tarih:</strong> ${new Date(app.date).toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} - ${app.time}</p>
                             <p class="text-sm text-gray-500"><strong>Taraflar:</strong> ${app.customerName}, ${app.contractorName}</p>
                        </div>
                        <div class="flex items-center space-x-2 mt-3 md:mt-0">
                             <button onclick="openScheduleAppointmentModal('${app.projectId}')" class="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-md hover:bg-blue-200">Düzenle</button>
                             <button onclick="cancelAppointment('${app.projectId}')" class="text-sm bg-red-100 text-red-700 px-3 py-1 rounded-md hover:bg-red-200">İptal Et</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    function cancelAppointment(projectId) {
        const project = notaryData.projects.find(p => p.id === projectId);
        if (project && confirm('Bu randevuyu iptal etmek istediğinizden emin misiniz?')) {
            project.appointment = null;
            project.status = 'docs_approved';
            showNotification('Randevu başarıyla iptal edildi.', 'success');
            renderAppointments();
            renderProjects();
        }
    }

    // --- MESSAGES ---
    function renderMessages() {
        const container = document.getElementById('messages-list');
        const projectsWithChat = notaryData.projects.filter(p => p.chatHistory && p.chatHistory.length > 0);

        if (projectsWithChat.length === 0) {
            container.innerHTML = '<div class="text-center py-12 bg-white rounded-lg shadow-sm border"><i class="fas fa-envelope-open-text fa-3x text-gray-300 mb-4"></i><h3 class="text-xl font-semibold text-gray-700">Henüz bir yazışmanız yok.</h3></div>';
            return;
        }
        
        container.innerHTML = projectsWithChat.map(p => {
            const lastMessage = p.chatHistory[p.chatHistory.length - 1];
            return `
                <div onclick="openProjectChatModal('${p.id}')" class="bg-white p-4 rounded-xl border shadow-sm hover:shadow-md hover:border-primary transition-all cursor-pointer flex justify-between items-center">
                    <div>
                        <h4 class="font-bold text-gray-800">${p.name}</h4>
                        <p class="text-sm text-gray-600">${lastMessage.sender}: ${lastMessage.text.substring(0, 40)}...</p>
                    </div>
                    <div class="text-xs text-gray-500">
                        ${new Date(lastMessage.timestamp).toLocaleDateString('tr-TR')}
                    </div>
                </div>
            `;
        }).join('');
    }


    // --- MODAL FUNCTIONS ---

    function openReviewDocumentsModal(projectId) {
        const project = notaryData.projects.find(p => p.id === projectId);
        document.getElementById('review-docs-project-id').value = projectId;
        document.getElementById('review-docs-modal-title').textContent = `Belgeleri İncele - ${project.name}`;

        const renderList = (docs) => docs.length > 0 
            ? docs.map(doc => `
                <div class="flex items-center justify-between p-2 bg-gray-50 rounded-lg border">
                    <span class="text-sm font-medium">${doc.name}</span>
                    <div>
                        <a href="${doc.url}" target="_blank" class="text-blue-600 hover:underline text-sm px-2">Görüntüle</a>
                        <a href="${doc.url}" download class="text-blue-600 hover:underline text-sm px-2">İndir</a>
                    </div>
                </div>
            `).join('')
            : '<p class="text-sm text-gray-500">Bu taraf için yüklenmiş belge yok.</p>';

        document.getElementById('customer-docs-list').innerHTML = renderList(project.uploadedDocuments.customer);
        document.getElementById('contractor-docs-list').innerHTML = renderList(project.uploadedDocuments.contractor);

        openModal('review-documents-modal');
    }

    function approveDocuments() {
        const projectId = document.getElementById('review-docs-project-id').value;
        const project = notaryData.projects.find(p => p.id === projectId);
        project.status = 'docs_approved';
        showNotification('Belgeler onaylandı. Şimdi randevu oluşturabilirsiniz.', 'success');
        closeModal('review-documents-modal');
        renderProjects();
    }
    
    function openScheduleAppointmentModal(projectId) {
        const project = notaryData.projects.find(p => p.id === projectId);
        document.getElementById('schedule-appointment-project-id').value = projectId;
        document.getElementById('schedule-appointment-modal-title').textContent = `Randevu - ${project.name}`;

        if (project.appointment) {
            document.getElementById('appointment-date').value = project.appointment.date;
            document.getElementById('appointment-time').value = project.appointment.time;
            document.getElementById('appointment-subject').value = project.appointment.subject;
            renderSmsReminderToggle(project.appointment.smsReminderEnabled);
        } else {
            document.getElementById('appointment-date').value = '';
            document.getElementById('appointment-time').value = '';
            document.getElementById('appointment-subject').value = 'Sözleşme İmza Töreni';
            renderSmsReminderToggle(true); // Default to on
        }
        openModal('schedule-appointment-modal');
    }

    function createUpdateAppointment() {
        const projectId = document.getElementById('schedule-appointment-project-id').value;
        const project = notaryData.projects.find(p => p.id === projectId);
        
        project.appointment = {
            id: project.appointment?.id || 'app-' + Date.now(),
            date: document.getElementById('appointment-date').value,
            time: document.getElementById('appointment-time').value,
            subject: document.getElementById('appointment-subject').value,
            smsReminderEnabled: document.querySelector('#sms-reminder-knob.translate-x-5') !== null,
        };

        project.status = 'appointment_set';
        showNotification('Randevu başarıyla kaydedildi.', 'success');
        closeModal('schedule-appointment-modal');
        renderProjects();
        renderAppointments();
    }
    
    function toggleSmsReminder() {
        const knob = document.getElementById('sms-reminder-knob');
        const bg = document.getElementById('sms-reminder-bg');
        const isEnabled = knob.classList.toggle('translate-x-5');
        knob.classList.toggle('translate-x-0', !isEnabled);
        bg.classList.toggle('bg-green-400', isEnabled);
        bg.classList.toggle('bg-gray-300', !isEnabled);
    }
    
    function renderSmsReminderToggle(isEnabled) {
        const knob = document.getElementById('sms-reminder-knob');
        const bg = document.getElementById('sms-reminder-bg');
        knob.classList.toggle('translate-x-5', isEnabled);
        knob.classList.toggle('translate-x-0', !isEnabled);
        bg.classList.toggle('bg-green-400', isEnabled);
        bg.classList.toggle('bg-gray-300', !isEnabled);
    }

    function openUploadNotarizedContractModal(projectId) {
        const project = notaryData.projects.find(p => p.id === projectId);
        document.getElementById('upload-contract-project-id').value = projectId;
        document.getElementById('upload-contract-modal-title').textContent = `Onaylı Sözleşmeyi Yükle - ${project.name}`;
        tempNotarizedContractFile = null;
        document.getElementById('notarized-contract-file-info').textContent = '';
        document.getElementById('upload-final-contract-btn').disabled = true;
        openModal('upload-notarized-contract-modal');
    }

    function handleNotarizedContractFileChange(event) {
        const file = event.target.files[0];
        if (!file) return;
        tempNotarizedContractFile = file;
        document.getElementById('notarized-contract-file-info').textContent = `Seçilen dosya: ${file.name}`;
        document.getElementById('upload-final-contract-btn').disabled = false;
    }

    function uploadNotarizedContract() {
        const projectId = document.getElementById('upload-contract-project-id').value;
        const project = notaryData.projects.find(p => p.id === projectId);
        if (!tempNotarizedContractFile) return;

        project.notarizedContractUrl = 'simulated/contracts/' + tempNotarizedContractFile.name;
        project.status = 'contract_uploaded';
        showNotification('Noter onaylı sözleşme başarıyla yüklendi ve süreç tamamlandı.', 'success');
        closeModal('upload-notarized-contract-modal');
        renderProjects();
    }

    function openProjectChatModal(projectId) {
        const project = notaryData.projects.find(p => p.id === projectId);
        document.getElementById('project-chat-id').value = projectId;
        document.getElementById('project-chat-modal-title').textContent = `Mesajlaşma - ${project.name}`;
        renderProjectChatMessages(projectId);
        openModal('project-chat-modal');
    }
    
    function renderProjectChatMessages(projectId) {
        // This is a simplified chat renderer for the demo
        const container = document.getElementById('project-chat-messages');
        const project = notaryData.projects.find(p => p.id === projectId);
        
        if (project.chatHistory.length === 0) {
            container.innerHTML = '<p class="text-center text-gray-500">Henüz mesaj yok.</p>';
            return;
        }

        container.innerHTML = project.chatHistory.map(msg => {
             const isNotary = msg.sender === 'notary';
             const align = isNotary ? 'justify-end' : 'justify-start';
             const bubbleColor = isNotary ? 'bg-primary text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none';
             return `
                <div class="flex ${align}">
                    <div class="max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${bubbleColor}">
                        <p class="font-bold text-sm capitalize">${msg.sender} (${msg.recipient})</p>
                        <p class="text-sm">${msg.text}</p>
                    </div>
                </div>
             `;
        }).join('');
        container.scrollTop = container.scrollHeight;
    }

    function sendMessageToParties() {
        const projectId = document.getElementById('project-chat-id').value;
        const input = document.getElementById('project-chat-input');
        const text = input.value.trim();
        if (!text) return;

        const project = notaryData.projects.find(p => p.id === projectId);
        // Simplified: sending to both parties
        project.chatHistory.push({ sender: 'notary', recipient: 'all', text, timestamp: Date.now() });
        renderProjectChatMessages(projectId);
        input.value = '';
    }

    function sendProjectFile(event) {
        // Placeholder for future implementation
        showNotification('Dosya gönderme özelliği yakında eklenecektir.', 'info');
        event.target.value = '';
    }

    // --- SUPPORT FUNCTIONS ---
    function changePassword() {
        const currentPassword = document.getElementById('current-password').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        
        if (!currentPassword || !newPassword || !confirmPassword) {
            showNotification('Lütfen tüm alanları doldurun.', 'warning');
            return;
        }
        
        if (newPassword !== confirmPassword) {
            showNotification('Yeni şifreler eşleşmiyor.', 'error');
            return;
        }
        
        if (newPassword.length < 6) {
            showNotification('Yeni şifre en az 6 karakter olmalıdır.', 'warning');
            return;
        }
        
        // Simulate password change
        showNotification('Şifreniz başarıyla değiştirildi.', 'success');
        document.getElementById('current-password').value = '';
        document.getElementById('new-password').value = '';
        document.getElementById('confirm-password').value = '';
    }

    function resendEmailVerification() {
        showNotification('Doğrulama e-postası gönderildi. Lütfen gelen kutunuzu kontrol edin.', 'info');
    }

    function verifyPhone(type) {
        const phoneNumber = type === 'work' ? notaryData.profile.phone : notaryData.profile.personalPhone;
        if (!phoneNumber) {
            showNotification('Telefon numarası bulunamadı.', 'error');
            return;
        }
        
        showNotification(`${phoneNumber} numarasına doğrulama SMS'i gönderildi.`, 'info');
        
        // Simulate verification modal or process
        const code = prompt('SMS ile gelen 6 haneli kodu girin:');
        if (code && code.length === 6) {
            showNotification('Telefon numarası başarıyla doğrulandı.', 'success');
        } else if (code) {
            showNotification('Geçersiz kod. Lütfen tekrar deneyin.', 'error');
        }
    }

    // --- PAYMENTS AND REPORTING ---
    function renderPaymentsSection() {
        const container = document.getElementById('payments-content');
        const payments = notaryData.payments;
        const subscription = notaryData.subscription;

        container.innerHTML = `
            <!-- Payment Stats -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-500">Toplam Kazanç</p>
                            <p class="text-2xl font-bold text-green-600 mt-1">₺${payments.totalEarnings.toFixed(2)}</p>
                        </div>
                        <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <i class="fas fa-chart-line text-2xl text-green-600"></i>
                        </div>
                    </div>
                </div>
                <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-500">Bu Ay</p>
                            <p class="text-2xl font-bold text-blue-600 mt-1">₺${payments.thisMonthEarnings.toFixed(2)}</p>
                        </div>
                        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <i class="fas fa-calendar-check text-2xl text-blue-600"></i>
                        </div>
                    </div>
                </div>
                <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-500">Bugün</p>
                            <p class="text-2xl font-bold text-purple-600 mt-1">₺${payments.todayEarnings.toFixed(2)}</p>
                        </div>
                        <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <i class="fas fa-coins text-2xl text-purple-600"></i>
                        </div>
                    </div>
                </div>
                <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm font-medium text-gray-500">Bekleyen</p>
                            <p class="text-2xl font-bold text-orange-600 mt-1">₺${payments.pendingPayments.toFixed(2)}</p>
                        </div>
                        <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                            <i class="fas fa-clock text-2xl text-orange-600"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <!-- Monthly Earnings Chart -->
                <div class="xl:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-lg font-semibold text-gray-800">Aylık Kazanç Grafiği</h3>
                        <div class="flex items-center space-x-2">
                            <button onclick="exportEarningsReport()" class="text-sm bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark">
                                <i class="fas fa-download mr-2"></i>Rapor İndir
                            </button>
                        </div>
                    </div>
                    <div id="earnings-chart" class="h-64">
                        <!-- Chart will be rendered here -->
                    </div>
                </div>

                <!-- Subscription Status -->
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">Abonelik Durumu</h3>
                    
                    <div class="space-y-4">
                        <div class="p-4 ${subscription.status === 'active' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border rounded-lg">
                            <div class="flex items-center justify-between mb-2">
                                <h4 class="font-semibold text-gray-800">${subscription.plan}</h4>
                                <span class="text-xs px-2 py-1 rounded-full ${subscription.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                                    ${subscription.status === 'active' ? 'Aktif' : 'Pasif'}
                                </span>
                            </div>
                            <p class="text-2xl font-bold ${subscription.status === 'active' ? 'text-green-600' : 'text-red-600'} mb-2">
                                ₺${subscription.price.toFixed(2)}/${subscription.currency === 'TL' ? 'ay' : 'month'}
                            </p>
                            <p class="text-sm text-gray-600">
                                ${subscription.status === 'active' 
                                    ? `Sonraki ödeme: ${new Date(subscription.nextPaymentDate).toLocaleDateString('tr-TR')}`
                                    : 'Abonelik askıya alındı'
                                }
                            </p>
                        </div>

                        <div class="space-y-2">
                            <h5 class="font-medium text-gray-700">Plan Özellikleri:</h5>
                            <ul class="space-y-1 text-sm text-gray-600">
                                ${subscription.features.map(feature => `
                                    <li class="flex items-center">
                                        <i class="fas fa-check text-green-500 mr-2 text-xs"></i>
                                        ${feature}
                                    </li>
                                `).join('')}
                            </ul>
                        </div>

                        <div class="pt-4 border-t space-y-2">
                            <button onclick="manageSubscription()" class="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark text-sm">
                                Aboneliği Yönet
                            </button>
                            <button onclick="viewSubscriptionHistory()" class="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 text-sm">
                                Ödeme Geçmişi
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Payment History -->
            <div class="mt-8 bg-white rounded-xl shadow-sm border border-gray-200">
                <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 class="text-lg font-semibold text-gray-800">Ödeme Geçmişi</h3>
                    <div class="flex items-center space-x-3">
                        <select id="payment-filter" onchange="filterPayments()" class="text-sm border border-gray-300 rounded-lg px-3 py-2">
                            <option value="all">Tüm Ödemeler</option>
                            <option value="completed">Tamamlanan</option>
                            <option value="pending">Bekleyen</option>
                        </select>
                        <button onclick="exportPaymentHistory()" class="text-sm bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200">
                            <i class="fas fa-file-export mr-2"></i>Dışa Aktar
                        </button>
                    </div>
                </div>
                <div id="payment-history-table" class="overflow-x-auto">
                    <!-- Payment table will be rendered here -->
                </div>
            </div>
        `;

        renderEarningsChart();
        renderPaymentHistoryTable();
    }

    function renderEarningsChart() {
        const container = document.getElementById('earnings-chart');
        const data = [...notaryData.payments.monthlyData].reverse(); // Son 6 ay: Ağustos'tan Ocak'a
        
        // Calculate max amount for scaling
        const maxAmount = Math.max(...data.map(d => d.amount));
        const minHeight = 20; // Minimum bar height percentage
        
        container.innerHTML = `
            <div class="relative h-full">
                <!-- Y-axis labels -->
                <div class="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 pr-4">
                    <span>₺${maxAmount.toFixed(0)}</span>
                    <span>₺${(maxAmount * 0.75).toFixed(0)}</span>
                    <span>₺${(maxAmount * 0.5).toFixed(0)}</span>
                    <span>₺${(maxAmount * 0.25).toFixed(0)}</span>
                    <span>₺0</span>
                </div>
                
                <!-- Chart bars -->
                <div class="ml-12 h-full flex items-end justify-between space-x-3">
                    ${data.map((item, index) => {
                        const height = Math.max(minHeight, (item.amount / maxAmount) * 100);
                        const isHighest = item.amount === maxAmount;
                        const colors = [
                            'bg-blue-500 hover:bg-blue-600',
                            'bg-green-500 hover:bg-green-600', 
                            'bg-purple-500 hover:bg-purple-600',
                            'bg-orange-500 hover:bg-orange-600',
                            'bg-red-500 hover:bg-red-600',
                            'bg-indigo-500 hover:bg-indigo-600'
                        ];
                        const barColor = colors[index % colors.length];
                        
                        return `
                            <div class="flex-1 flex flex-col items-center group">
                                <!-- Tooltip -->
                                <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute -mt-16 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg z-10 whitespace-nowrap">
                                    <div class="font-semibold">${item.month}</div>
                                    <div>Kazanç: ₺${item.amount.toLocaleString('tr-TR', {minimumFractionDigits: 2})}</div>
                                    <div>İşlem: ${item.count} adet</div>
                                    <div>Ortalama: ₺${(item.amount / item.count).toFixed(2)}</div>
                                    <!-- Arrow -->
                                    <div class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                                </div>
                                
                                <!-- Bar -->
                                <div class="w-full ${barColor} rounded-t-lg transition-all duration-300 cursor-pointer shadow-sm ${isHighest ? 'ring-2 ring-yellow-400' : ''}" 
                                     style="height: ${height}%; min-height: 40px;">
                                    <!-- Value label on top of bar -->
                                    <div class="opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-bold text-center pt-2">
                                        ₺${(item.amount / 1000).toFixed(1)}k
                                    </div>
                                </div>
                                
                                <!-- Month label -->
                                <div class="mt-3 text-center">
                                    <div class="text-xs font-medium text-gray-700">${item.month.split(' ')[0]}</div>
                                    <div class="text-xs text-gray-500">${item.month.split(' ')[1]}</div>
                                </div>
                                
                                <!-- Count indicator -->
                                <div class="mt-1 flex space-x-1">
                                    ${Array(Math.min(item.count, 12)).fill().map(() => `
                                        <div class="w-1 h-1 ${barColor.split(' ')[0]} rounded-full"></div>
                                    `).join('')}
                                    ${item.count > 12 ? `<span class="text-xs text-gray-400 ml-1">+${item.count - 12}</span>` : ''}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
                
                <!-- Grid lines -->
                <div class="absolute inset-0 ml-12 pointer-events-none">
                    ${[0, 25, 50, 75, 100].map(percent => `
                        <div class="absolute w-full border-t border-gray-200 border-dashed" style="bottom: ${percent}%;"></div>
                    `).join('')}
                </div>
            </div>
            
            <!-- Chart Statistics -->
            <div class="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
                <div class="text-center">
                    <div class="text-lg font-bold text-blue-600">₺${data.reduce((sum, item) => sum + item.amount, 0).toLocaleString('tr-TR')}</div>
                    <div class="text-xs text-gray-500">6 Aylık Toplam</div>
                </div>
                <div class="text-center">
                    <div class="text-lg font-bold text-green-600">₺${(data.reduce((sum, item) => sum + item.amount, 0) / 6).toFixed(2)}</div>
                    <div class="text-xs text-gray-500">Aylık Ortalama</div>
                </div>
                <div class="text-center">
                    <div class="text-lg font-bold text-purple-600">${data.reduce((sum, item) => sum + item.count, 0)}</div>
                    <div class="text-xs text-gray-500">Toplam İşlem</div>
                </div>
                <div class="text-center">
                    <div class="text-lg font-bold text-orange-600">₺${Math.max(...data.map(d => d.amount)).toLocaleString('tr-TR')}</div>
                    <div class="text-xs text-gray-500">En Yüksek Ay</div>
                </div>
            </div>
        `;
    }

    function renderPaymentHistoryTable() {
        const container = document.getElementById('payment-history-table');
        const payments = notaryData.payments.history;
        
        container.innerHTML = `
            <table class="w-full">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proje</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Müşteri</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tutar</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    ${payments.map(payment => `
                        <tr class="hover:bg-gray-50">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm font-medium text-gray-900">${payment.projectName}</div>
                                <div class="text-sm text-gray-500">${payment.description}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${payment.customerName}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">₺${payment.amount.toFixed(2)}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${new Date(payment.date).toLocaleDateString('tr-TR')}</td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                    payment.status === 'completed' 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-yellow-100 text-yellow-800'
                                }">
                                    ${payment.status === 'completed' ? 'Tamamlandı' : 'Bekliyor'}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                                ${payment.receiptUrl 
                                    ? `<button onclick="viewReceipt('${payment.id}')" class="text-primary hover:text-primary-dark">
                                        <i class="fas fa-receipt mr-1"></i>Makbuz
                                       </button>`
                                    : '<span class="text-gray-400">Makbuz yok</span>'
                                }
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    function filterPayments() {
        const filter = document.getElementById('payment-filter').value;
        // In real implementation, this would filter the payment history
        showNotification(`${filter === 'all' ? 'Tüm' : filter === 'completed' ? 'Tamamlanan' : 'Bekleyen'} ödemeler gösteriliyor.`, 'info');
    }

    function exportPaymentHistory() {
        showNotification('Ödeme geçmişi Excel dosyası olarak indiriliyor...', 'success');
        // In real implementation, this would generate and download an Excel file
    }

    function exportEarningsReport() {
        showNotification('Kazanç raporu PDF olarak indiriliyor...', 'success');
        // In real implementation, this would generate and download a PDF report
    }

    function viewReceipt(paymentId) {
        const payment = notaryData.payments.history.find(p => p.id === paymentId);
        if (payment && payment.receiptUrl) {
            showNotification(`${payment.projectName} için makbuz görüntüleniyor...`, 'info');
            // In real implementation, this would open the receipt in a new window
            // window.open(payment.receiptUrl, '_blank');
        }
    }

    function manageSubscription() {
        openModal('subscription-management-modal');
    }

    function viewSubscriptionHistory() {
        renderSubscriptionHistory();
        openModal('subscription-history-modal');
    }

    function renderSubscriptionHistory() {
        const container = document.getElementById('subscription-history-table');
        const history = notaryData.subscription.paymentHistory;
        
        container.innerHTML = history.map(payment => `
            <tr>
                <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">${new Date(payment.date).toLocaleDateString('tr-TR')}</td>
                <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">${payment.description}</td>
                <td class="px-4 py-4 whitespace-nowrap text-sm font-semibold text-green-600">₺${payment.amount.toFixed(2)}</td>
                <td class="px-4 py-4 whitespace-nowrap">
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${payment.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                        ${payment.status === 'paid' ? 'Ödendi' : 'Ödenmedi'}
                    </span>
                </td>
                <td class="px-4 py-4 whitespace-nowrap text-sm">
                    <button onclick="downloadSubscriptionInvoice('${payment.date}')" class="text-primary hover:text-primary-dark">
                        <i class="fas fa-download mr-1"></i>İndir
                    </button>
                </td>
            </tr>
        `).join('');
    }

    function updatePaymentMethod() {
        showNotification('Ödeme yöntemi güncelleme sayfasına yönlendiriliyorsunuz...', 'info');
        // In real implementation, this would redirect to payment provider
    }

    function pauseSubscription() {
        if (confirm('Aboneliğinizi duraklatmak istediğinizden emin misiniz? Bu işlem sonrasında platform erişiminiz kısıtlanacaktır.')) {
            notaryData.subscription.status = 'paused';
            showNotification('Aboneliğiniz başarıyla durduruldu.', 'success');
            closeModal('subscription-management-modal');
            renderPaymentsSection(); // Refresh the payments section
        }
    }

    function cancelSubscription() {
        if (confirm('Aboneliğinizi iptal etmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) {
            const reason = prompt('İptal nedeninizi belirtir misiniz? (İsteğe bağlı)');
            notaryData.subscription.status = 'cancelled';
            showNotification('Aboneliğiniz başarıyla iptal edildi. Mevcut dönem sonuna kadar hizmetleriniz devam edecektir.', 'warning');
            closeModal('subscription-management-modal');
            renderPaymentsSection(); // Refresh the payments section
        }
    }

    function downloadInvoice() {
        showNotification('Son fatura PDF olarak indiriliyor...', 'success');
        // In real implementation, this would download the latest invoice
    }

    function downloadSubscriptionInvoice(date) {
        showNotification(`${new Date(date).toLocaleDateString('tr-TR')} tarihli fatura indiriliyor...`, 'success');
        // In real implementation, this would download the specific invoice
    }

    // --- PRICE SETTING FUNCTIONS ---
    function openSetPriceModal(projectId) {
        const project = notaryData.projects.find(p => p.id === projectId);
        if (!project) {
            showNotification('Proje bulunamadı.', 'error');
            return;
        }

        // Set project info in modal
        document.getElementById('set-price-project-id').value = projectId;
        document.getElementById('set-price-modal-title').textContent = `Noter Ücreti Belirle - ${project.name}`;
        
        // Clear/set form fields
        document.getElementById('notary-price-input').value = project.notaryPrice || '';
        document.getElementById('price-description').value = project.priceDescription || '';
        
        // Show current price info if exists
        const currentPriceInfo = document.getElementById('current-price-info');
        const currentPriceDisplay = document.getElementById('current-price-display');
        
        if (project.priceSet && project.notaryPrice) {
            currentPriceInfo.classList.remove('hidden');
            currentPriceDisplay.textContent = `₺${project.notaryPrice.toFixed(2)}`;
        } else {
            currentPriceInfo.classList.add('hidden');
        }
        
        openModal('set-price-modal');
    }

    function setQuickPrice(amount) {
        document.getElementById('notary-price-input').value = amount;
        // Add visual feedback
        const input = document.getElementById('notary-price-input');
        input.focus();
        input.style.backgroundColor = '#fef3c7'; // yellow-100
        setTimeout(() => {
            input.style.backgroundColor = '';
        }, 500);
    }

    function saveNotaryPrice() {
        const projectId = document.getElementById('set-price-project-id').value;
        const priceInput = document.getElementById('notary-price-input');
        const descriptionInput = document.getElementById('price-description');
        
        const price = parseFloat(priceInput.value);
        const description = descriptionInput.value.trim();
        
        // Validation
        if (isNaN(price) || price < 0) {
            showNotification('Lütfen geçerli bir ücret miktarı girin.', 'error');
            priceInput.focus();
            return;
        }
        
        if (price === 0) {
            if (!confirm('Ücreti 0 TL olarak belirlemek istediğinizden emin misiniz?')) {
                return;
            }
        }
        
        // Find and update project
        const project = notaryData.projects.find(p => p.id === projectId);
        if (project) {
            project.notaryPrice = price;
            project.priceSet = true;
            project.priceDescription = description;
            project.priceSetDate = new Date().toISOString();
            
            closeModal('set-price-modal');
            showNotification(`Noter ücreti ₺${price.toFixed(2)} olarak kaydedildi.`, 'success');
            
            // Refresh projects display
            renderProjects();
            
            // Clear form
            priceInput.value = '';
            descriptionInput.value = '';
        } else {
            showNotification('Proje güncellenirken bir hata oluştu.', 'error');
        }
    }

    // --- NOTARY PAYMENT FUNCTIONS ---
    function openNotaryPaymentModal(projectId) {
        const project = notaryData.projects.find(p => p.id === projectId);
        if (!project) {
            showNotification('Proje bulunamadı.', 'error');
            return;
        }

        // Set project info
        document.getElementById('notary-payment-project-id').value = projectId;
        document.getElementById('notary-payment-modal-title').textContent = `Noter ile Ödeme - ${project.name}`;
        
        // Populate contract types
        const contractSelect = document.getElementById('contract-type-select');
        contractSelect.innerHTML = '<option value="">Sözleşme türü seçiniz</option>';
        project.contractTypes.forEach(contractType => {
            const option = document.createElement('option');
            option.value = contractType;
            option.textContent = contractType;
            contractSelect.appendChild(option);
        });

        // Display party information
        document.getElementById('customer-name-display').textContent = project.customerName;
        document.getElementById('customer-contact-display').textContent = 'Telefon ve e-posta bilgileri';
        document.getElementById('contractor-name-display').textContent = project.contractorName;
        document.getElementById('contractor-contact-display').textContent = 'Şirket iletişim bilgileri';

        // Display price information
        if (project.priceSet && project.notaryPrice) {
            document.getElementById('notary-fee-display').textContent = `₺${project.notaryPrice.toFixed(2)}`;
            document.getElementById('price-description-display').textContent = project.priceDescription || 'Ücret açıklaması bulunmuyor';
        } else {
            document.getElementById('notary-fee-display').textContent = 'Henüz belirlenmedi';
            document.getElementById('price-description-display').textContent = 'Önce ücret belirlenmesi gerekiyor';
            document.getElementById('price-info-display').className = 'bg-yellow-50 border border-yellow-200 rounded-lg p-4';
        }

        // Clear form
        document.getElementById('payment-instructions').value = '';
        
        openModal('notary-payment-modal');
    }

    function sendPaymentInstructions() {
        const projectId = document.getElementById('notary-payment-project-id').value;
        const contractType = document.getElementById('contract-type-select').value;
        const paymentInstructions = document.getElementById('payment-instructions').value.trim();
        
        const project = notaryData.projects.find(p => p.id === projectId);
        
        // Validation
        if (!contractType) {
            showNotification('Lütfen sözleşme türünü seçin.', 'warning');
            return;
        }
        
        if (!project.priceSet || !project.notaryPrice) {
            showNotification('Önce noter ücretini belirlemeniz gerekiyor.', 'warning');
            return;
        }
        
        // Simulate sending payment instructions
        const message = `
📋 Noter Ödeme Bildirimi

🏢 Proje: ${project.name}
📄 Sözleşme Türü: ${contractType}
💰 Noter Ücreti: ₺${project.notaryPrice.toFixed(2)}

👤 Taraflar:
• Müşteri: ${project.customerName}
• Müteahhit: ${project.contractorName}

${paymentInstructions ? `\n📝 Özel Talimatlar:\n${paymentInstructions}` : ''}

Noter: ${notaryData.profile.name}
Noterlik: ${notaryData.profile.notaryName}
        `.trim();
        
        // In real implementation, this would send notifications/emails to parties
        console.log('Payment instructions sent:', message);
        
        // Update project data
        project.paymentInstructionsSent = true;
        project.paymentInstructionsDate = new Date().toISOString();
        project.selectedContractType = contractType;
        project.paymentInstructions = paymentInstructions;
        
        closeModal('notary-payment-modal');
        showNotification(`${contractType} için ödeme bilgileri taraflara gönderildi.`, 'success');
        
        // Show detailed notification
        setTimeout(() => {
            showNotification(`Müşteri ve müteahhite ₺${project.notaryPrice.toFixed(2)} tutarında noter ücreti bildirimi yapıldı.`, 'info');
        }, 2000);
    }

    // --- INITIALIZATION ---
    document.addEventListener('DOMContentLoaded', () => {
        showSection('dashboard-section');
        renderProfileSection(); // To set initial welcome message

        // Add appointment search listener
        const appointmentSearch = document.getElementById('appointment-search');
        if (appointmentSearch) {
            appointmentSearch.addEventListener('input', () => {
                if (document.getElementById('appointments-section').classList.contains('hidden') === false) {
                    renderAppointments();
                }
            });
        }

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') {
                ['review-documents-modal', 'schedule-appointment-modal', 'upload-notarized-contract-modal', 'set-price-modal', 'notary-payment-modal', 'project-chat-modal', 'deactivate-service-modal', 'pre-chat-modal', 'live-chat-modal', 'subscription-management-modal', 'subscription-history-modal'].forEach(closeModal);
            }
        });
    });

