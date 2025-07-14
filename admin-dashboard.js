// Firebase yapılandırması
const firebaseConfig = {
    // Firebase config buraya eklenecek
    apiKey: "YOUR_API_KEY",
    authDomain: "your-app.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-app.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
};

// Firebase başlatma
firebase.initializeApp(firebaseConfig);

// Geçici olarak localStorage kullanacağız
const localDb = {
    collection: function(name) {
        return {
            get: async function() {
                const data = JSON.parse(localStorage.getItem(name) || '[]');
                return {
                    size: data.length,
                    forEach: function(callback) {
                        data.forEach((item, index) => {
                            callback({
                                id: item.id,
                                data: function() { return item; }
                            });
                        });
                    }
                };
            },
            where: function() { return this; },
            orderBy: function() { return this; },
            limit: function() { return this; },
            offset: function() { return this; },
            doc: function(id) {
                return {
                    get: async function() {
                        const data = JSON.parse(localStorage.getItem(name) || '[]');
                        const item = data.find(item => item.id === id);
                        return {
                            exists: !!item,
                            data: function() { return item; }
                        };
                    },
                    set: async function(data) {
                        let items = JSON.parse(localStorage.getItem(name) || '[]');
                        const index = items.findIndex(item => item.id === id);
                        if (index > -1) {
                            items[index] = { ...items[index], ...data };
                        } else {
                            items.push({ ...data, id });
                        }
                        localStorage.setItem(name, JSON.stringify(items));
                    },
                    update: async function(data) {
                        let items = JSON.parse(localStorage.getItem(name) || '[]');
                        const index = items.findIndex(item => item.id === id);
                        if (index > -1) {
                            items[index] = { ...items[index], ...data };
                            localStorage.setItem(name, JSON.stringify(items));
                        }
                    },
                    delete: async function() {
                        let items = JSON.parse(localStorage.getItem(name) || '[]');
                        items = items.filter(item => item.id !== id);
                        localStorage.setItem(name, JSON.stringify(items));
                    }
                };
            },
            add: async function(data) {
                const id = `doc_${Math.random().toString(36).substr(2, 9)}`;
                let items = JSON.parse(localStorage.getItem(name) || '[]');
                items.push({ ...data, id });
                localStorage.setItem(name, JSON.stringify(items));
                return { id };
            }
        };
    }
};

// Firebase yerine localStorage kullanalım
const db = localDb;
const auth = firebase.auth();

// Kullanıcı yönetimi değişkenleri
let currentPage = 1;
const usersPerPage = 10;
let totalUsers = 0;
let currentFilters = {
    userType: '',
    status: '',
    registrationDate: '',
    searchQuery: ''
};

// İçerik yönetimi değişkenleri
let currentContentPage = 1;
const contentPerPage = 10;
let totalContent = 0;
let currentContentTab = 'listings';
let currentContentFilters = {
    status: '',
    searchQuery: ''
};

// Content Management
let contentData = {
    listings: [
        {
            id: "L1001",
            title: "Kadıköy'de 3+1 Kentsel Dönüşüm Projesi",
            owner: "Ahmet Yılmaz",
            status: "active",
            createdAt: "2025-07-01",
            views: 245,
            type: "Residential"
        },
        {
            id: "L1002",
            title: "Beşiktaş Merkezi Konumda Dönüşüm Fırsatı",
            owner: "Mehmet Demir",
            status: "pending",
            createdAt: "2025-07-02",
            views: 180,
            type: "Commercial"
        },
        {
            id: "L1003",
            title: "Üsküdar Tarihi Bina Renovasyon Projesi",
            owner: "Ayşe Kaya",
            status: "active",
            createdAt: "2025-07-03",
            views: 320,
            type: "Historical"
        },
        {
            id: "L1004",
            title: "Maltepe'de Yeni Rezidans Projesi",
            owner: "Can Özkan",
            status: "rejected",
            createdAt: "2025-07-04",
            views: 150,
            type: "Residential"
        },
        {
            id: "L1005",
            title: "Şişli'de Ofis Kompleksi Dönüşüm Projesi",
            owner: "Zeynep Aydın",
            status: "expired",
            createdAt: "2025-07-05",
            views: 200,
            type: "Commercial"
        }
    ],
    announcements: [
        {
            id: "A1001",
            title: "Yeni Kentsel Dönüşüm Teşvikleri",
            content: "Hükümet tarafından açıklanan yeni kentsel dönüşüm teşvikleri hakkında detaylı bilgilendirme.",
            date: "2025-07-01",
            author: "Admin"
        },
        {
            id: "A1002",
            title: "Sistem Bakım Duyurusu",
            content: "15 Temmuz 2025 tarihinde sistem bakımı yapılacaktır. İşlemlerinizi buna göre planlamanızı rica ederiz.",
            date: "2025-07-10",
            author: "Sistem Yöneticisi"
        },
        {
            id: "A1003",
            title: "Yeni Özellik: Gelişmiş Proje Takibi",
            content: "Projelerinizi daha detaylı takip edebileceğiniz yeni özelliklerimiz kullanıma açılmıştır.",
            date: "2025-07-12",
            author: "Admin"
        }
    ],
    faqs: [
        {
            id: "F1001",
            question: "Kentsel dönüşüm başvurusu nasıl yapılır?",
            answer: "Kentsel dönüşüm başvurusu için gerekli belgelerle birlikte sistemimiz üzerinden online başvuru yapabilirsiniz.",
            category: "Başvuru"
        },
        {
            id: "F1002",
            question: "Proje onay süreci ne kadar sürer?",
            answer: "Proje onay süreci, belgelerin eksiksiz olması durumunda ortalama 15-20 iş günü sürmektedir.",
            category: "Süreç"
        },
        {
            id: "F1003",
            question: "Hangi belgeler gereklidir?",
            answer: "Tapu, kimlik, imar durumu belgesi ve muvafakatname başlıca gerekli belgelerdir.",
            category: "Belgeler"
        }
    ]
};

// Content Management Functions
function initializeContentManagement() {
    populateListings();
    populateAnnouncements();
    populateFAQs();
    setupContentEventListeners();
}

function populateListings() {
    const listingsTable = document.querySelector('#listings-list');
    if (!listingsTable) return;

    listingsTable.innerHTML = contentData.listings.map(listing => `
        <tr>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-sm text-gray-900">${listing.id}</span>
            </td>
            <td class="px-6 py-4">
                <div class="text-sm text-gray-900">${listing.title}</div>
                <div class="text-sm text-gray-500">${listing.type}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-sm text-gray-900">${listing.owner}</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                ${getStatusBadge(listing.status)}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-sm text-gray-900">${listing.createdAt}</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button onclick="viewListing('${listing.id}')" class="text-purple-600 hover:text-purple-900 mr-3">
                    <i class="fas fa-eye"></i>
                </button>
                <button onclick="editListing('${listing.id}')" class="text-blue-600 hover:text-blue-900 mr-3">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deleteListing('${listing.id}')" class="text-red-600 hover:text-red-900">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function getStatusBadge(status) {
    const statusClasses = {
        active: 'bg-green-100 text-green-800',
        pending: 'bg-yellow-100 text-yellow-800',
        rejected: 'bg-red-100 text-red-800',
        expired: 'bg-gray-100 text-gray-800'
    };

    return `
        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[status]}">
            ${status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    `;
}

function populateAnnouncements() {
    const announcementsList = document.querySelector('#announcements-list');
    if (!announcementsList) return;

    announcementsList.innerHTML = contentData.announcements.map(announcement => `
        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div class="flex justify-between items-start">
                <div>
                    <h4 class="text-lg font-semibold text-gray-900">${announcement.title}</h4>
                    <p class="text-sm text-gray-500 mt-1">${announcement.date} - ${announcement.author}</p>
                </div>
                <div class="flex space-x-2">
                    <button onclick="editAnnouncement('${announcement.id}')" class="text-blue-600 hover:text-blue-900">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="deleteAnnouncement('${announcement.id}')" class="text-red-600 hover:text-red-900">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <p class="text-gray-600 mt-4">${announcement.content}</p>
        </div>
    `).join('');
}

function populateFAQs() {
    const faqsList = document.querySelector('#faqs-list');
    if (!faqsList) return;

    faqsList.innerHTML = contentData.faqs.map(faq => `
        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div class="flex justify-between items-start">
                <div class="flex-1">
                    <h4 class="text-lg font-semibold text-gray-900">${faq.question}</h4>
                    <span class="inline-block px-2 py-1 text-xs font-semibold text-purple-600 bg-purple-100 rounded-full mt-2">
                        ${faq.category}
                    </span>
                </div>
                <div class="flex space-x-2">
                    <button onclick="editFAQ('${faq.id}')" class="text-blue-600 hover:text-blue-900">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="deleteFAQ('${faq.id}')" class="text-red-600 hover:text-red-900">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <p class="text-gray-600 mt-4">${faq.answer}</p>
        </div>
    `).join('');
}

function setupContentEventListeners() {
    // Add event listeners for content management actions
    document.querySelectorAll('.content-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.content-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Content Management Action Functions
function viewListing(id) {
    showNotification('success', `İlan görüntüleniyor: ${id}`);
}

function editListing(id) {
    showNotification('info', `İlan düzenleniyor: ${id}`);
}

function deleteListing(id) {
    if (confirm('Bu ilanı silmek istediğinizden emin misiniz?')) {
        showNotification('success', `İlan silindi: ${id}`);
    }
}

function editAnnouncement(id) {
    showNotification('info', `Duyuru düzenleniyor: ${id}`);
}

function deleteAnnouncement(id) {
    if (confirm('Bu duyuruyu silmek istediğinizden emin misiniz?')) {
        showNotification('success', `Duyuru silindi: ${id}`);
    }
}

function editFAQ(id) {
    showNotification('info', `SSS düzenleniyor: ${id}`);
}

function deleteFAQ(id) {
    if (confirm('Bu SSS\'yi silmek istediğinizden emin misiniz?')) {
        showNotification('success', `SSS silindi: ${id}`);
    }
}

function openNewAnnouncementModal() {
    document.getElementById('new-announcement-modal').classList.remove('hidden');
}

function closeNewAnnouncementModal() {
    document.getElementById('new-announcement-modal').classList.add('hidden');
}

function openNewFAQModal() {
    document.getElementById('new-faq-modal').classList.remove('hidden');
}

function closeNewFAQModal() {
    document.getElementById('new-faq-modal').classList.add('hidden');
}

// Initialize content management when the page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeContentManagement();
});

// DOM elementleri
const userTypeFilter = document.getElementById('user-type-filter');
const userStatusFilter = document.getElementById('user-status-filter');
const registrationDateFilter = document.getElementById('registration-date-filter');
const userSearch = document.getElementById('user-search');
const userList = document.getElementById('user-list');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');
const pageInfo = document.getElementById('page-info');
const perPageSelect = document.getElementById('per-page');

// İçerik yönetimi DOM elementleri
const contentTabs = document.querySelectorAll('.content-tab');
const contentTabPanels = document.querySelectorAll('.content-tab-panel');
const listingsList = document.getElementById('listings-list');
const announcementsList = document.getElementById('announcements-list');
const faqsList = document.getElementById('faqs-list');

// Event listeners
userTypeFilter?.addEventListener('change', handleFiltersChange);
userStatusFilter?.addEventListener('change', handleFiltersChange);
registrationDateFilter?.addEventListener('change', handleFiltersChange);
userSearch?.addEventListener('input', debounce(handleFiltersChange, 300));
prevPageBtn?.addEventListener('click', () => changePage(currentPage - 1));
nextPageBtn?.addEventListener('click', () => changePage(currentPage + 1));
perPageSelect?.addEventListener('change', handlePerPageChange);

// İçerik sekmesi değiştirme
function switchContentTab(tabId) {
    // Tüm sekmeleri ve panelleri gizle
    document.querySelectorAll('.content-tab-panel').forEach(panel => {
        panel.classList.add('hidden');
    });
    
    document.querySelectorAll('.content-tab').forEach(tab => {
        tab.classList.remove('border-purple-500', 'text-purple-600');
        tab.classList.add('border-transparent', 'text-gray-500');
    });

    // Seçilen sekmeyi ve paneli göster
    const selectedPanel = document.getElementById(`${tabId}-content`);
    const selectedTab = document.querySelector(`[onclick="switchContentTab('${tabId}')"]`);
    
    if (selectedPanel) {
        selectedPanel.classList.remove('hidden');
    }
    
    if (selectedTab) {
        selectedTab.classList.add('border-purple-500', 'text-purple-600');
        selectedTab.classList.remove('border-transparent', 'text-gray-500');
    }

    // İçeriği yükle
    switch (tabId) {
        case 'listings':
            populateListings();
            break;
        case 'announcements':
            populateAnnouncements();
            break;
        case 'faqs':
            populateFAQs();
            break;
    }
}

// Debounce fonksiyonu
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Filtreleri işleme
function handleFiltersChange() {
    currentFilters = {
        userType: userTypeFilter?.value || '',
        status: userStatusFilter?.value || '',
        registrationDate: registrationDateFilter?.value || '',
        searchQuery: userSearch?.value || ''
    };
    currentPage = 1;
    loadUsers();
}

// Sayfa başına gösterilen kullanıcı sayısını değiştirme
function handlePerPageChange() {
    const newPerPage = parseInt(perPageSelect.value);
    if (newPerPage !== usersPerPage) {
        usersPerPage = newPerPage;
        currentPage = 1;
        loadUsers();
    }
}

// Sayfa değiştirme
function changePage(newPage) {
    if (newPage >= 1 && newPage <= Math.ceil(totalUsers / usersPerPage)) {
        currentPage = newPage;
        loadUsers();
    }
}

// Kullanıcıları yükleme
async function loadUsers() {
    try {
        let users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Filtreleri uygula
        if (currentFilters.userType) {
            users = users.filter(user => user.type === currentFilters.userType);
        }
        if (currentFilters.status) {
            users = users.filter(user => user.status === currentFilters.status);
        }
        if (currentFilters.registrationDate) {
            const date = getDateFilter(currentFilters.registrationDate);
            if (date) {
                users = users.filter(user => new Date(user.createdAt) >= date);
            }
        }
        if (currentFilters.searchQuery) {
            const query = currentFilters.searchQuery.toLowerCase();
            users = users.filter(user => 
                user.displayName.toLowerCase().includes(query) ||
                user.email.toLowerCase().includes(query) ||
                user.id.toLowerCase().includes(query)
            );
        }

        // Toplam kullanıcı sayısını güncelle
        totalUsers = users.length;

        // Sayfalama uygula
        const startIndex = (currentPage - 1) * usersPerPage;
        const endIndex = startIndex + usersPerPage;
        const paginatedUsers = users.slice(startIndex, endIndex);

        // Kullanıcı listesini temizle
        userList.innerHTML = '';

        // Kullanıcıları listele
        paginatedUsers.forEach(userData => {
            const userRow = createUserRow(userData.id, userData);
            userList.appendChild(userRow);
        });

        // Sayfalama bilgisini güncelle
        updatePagination();

    } catch (error) {
        console.error('Kullanıcılar yüklenirken hata:', error);
        showNotification('Kullanıcılar yüklenirken bir hata oluştu', 'error');
    }
}

// Kullanıcı satırı oluşturma
function createUserRow(userId, userData) {
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-gray-50';
    tr.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10">
                    <img class="h-10 w-10 rounded-full" src="${userData.photoURL}" alt="${userData.displayName}">
                </div>
                <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">${userData.displayName}</div>
                    <div class="text-sm text-gray-500">${userData.email}</div>
                </div>
            </div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                ${getUserTypeName(userData.type)}
            </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(userData.status)}">
                ${getStatusName(userData.status)}
            </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            ${formatDate(userData.createdAt)}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            ${formatDate(userData.lastLoginAt)}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <div class="flex justify-end space-x-2">
                <button onclick="editUser('${userId}')" class="text-indigo-600 hover:text-indigo-900" title="Düzenle">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="toggleUserStatus('${userId}', '${userData.status}')" 
                    class="text-yellow-600 hover:text-yellow-900" 
                    title="${userData.status === 'active' ? 'Askıya Al' : 'Aktifleştir'}">
                    <i class="fas fa-ban"></i>
                </button>
                <button onclick="deleteUser('${userId}')" class="text-red-600 hover:text-red-900" title="Sil">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </td>
    `;
    return tr;
}

// Kullanıcı tipini formatla
function getUserTypeName(type) {
    const types = {
        customer: 'Müşteri',
        contractor: 'Müteahhit',
        architect: 'Mimar',
        notary: 'Noter'
    };
    return types[type] || type;
}

// Kullanıcı durumunu formatla
function getStatusName(status) {
    const statuses = {
        active: 'Aktif',
        pending: 'Onay Bekliyor',
        suspended: 'Askıya Alındı'
    };
    return statuses[status] || status;
}

// Durum renklerini belirle
function getStatusClass(status) {
    const classes = {
        active: 'bg-green-100 text-green-800',
        pending: 'bg-yellow-100 text-yellow-800',
        suspended: 'bg-red-100 text-red-800'
    };
    return classes[status] || 'bg-gray-100 text-gray-800';
}

// Tarih filtresini oluştur
function getDateFilter(filterType) {
    const now = new Date();
    switch (filterType) {
        case 'today':
            now.setHours(0, 0, 0, 0);
            return now;
        case 'week':
            now.setDate(now.getDate() - 7);
            return now;
        case 'month':
            now.setMonth(now.getMonth() - 1);
            return now;
        default:
            return null;
    }
}

// Tarihi formatla
function formatDate(timestamp) {
    if (!timestamp) return 'Belirtilmemiş';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return new Intl.DateTimeFormat('tr-TR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
}

// Sayfalama bilgisini güncelle
function updatePagination() {
    const totalPages = Math.ceil(totalUsers / usersPerPage);
    pageInfo.textContent = `Sayfa ${currentPage} / ${totalPages}`;
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;
}

// Kullanıcı düzenleme
async function editUser(userId) {
    // Kullanıcı düzenleme modalını aç
    // TODO: Kullanıcı düzenleme modalı implementasyonu
}

// Kullanıcı durumunu değiştir
async function toggleUserStatus(userId, currentStatus) {
    try {
        const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
        await db.collection('users').doc(userId).update({
            status: newStatus
        });
        showNotification('Kullanıcı durumu güncellendi', 'success');
        loadUsers();
    } catch (error) {
        console.error('Kullanıcı durumu güncellenirken hata:', error);
        showNotification('Kullanıcı durumu güncellenirken bir hata oluştu', 'error');
    }
}

// Kullanıcı silme
async function deleteUser(userId) {
    if (confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz?')) {
        try {
            await db.collection('users').doc(userId).delete();
            showNotification('Kullanıcı başarıyla silindi', 'success');
            loadUsers();
        } catch (error) {
            console.error('Kullanıcı silinirken hata:', error);
            showNotification('Kullanıcı silinirken bir hata oluştu', 'error');
        }
    }
}

// Bildirim gösterme fonksiyonunu güncelle
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-6 py-4 rounded-lg shadow-lg z-50 ${
        type === 'error' ? 'bg-red-500' : 'bg-green-500'
    } text-white`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// İçerik yükleme
async function loadContent() {
    switch (currentContentTab) {
        case 'listings':
            await loadListings();
            break;
        case 'projects':
            await loadProjects();
            break;
        case 'announcements':
            await loadAnnouncements();
            break;
        case 'faqs':
            await loadFAQs();
            break;
    }
}

// İlanları yükleme
async function loadListings() {
    try {
        let query = db.collection('listings');

        // Filtreleri uygula
        if (currentContentFilters.status) {
            query = query.where('status', '==', currentContentFilters.status);
        }

        // Toplam ilan sayısını al
        const snapshot = await query.get();
        totalContent = snapshot.size;

        // Sayfalama uygula
        const startAt = (currentContentPage - 1) * contentPerPage;
        query = query.orderBy('createdAt', 'desc')
            .limit(contentPerPage)
            .offset(startAt);

        // İlanları getir
        const listings = await query.get();
        
        // İlan listesini temizle
        listingsList.innerHTML = '';

        // İlanları listele
        listings.forEach(doc => {
            const listingData = doc.data();
            const listingRow = createListingRow(doc.id, listingData);
            listingsList.appendChild(listingRow);
        });

        // Sayfalama bilgisini güncelle
        updateContentPagination();

    } catch (error) {
        console.error('İlanlar yüklenirken hata:', error);
        showNotification('İlanlar yüklenirken bir hata oluştu', 'error');
    }
}

// İlan satırı oluşturma
function createListingRow(listingId, listingData) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            #${listingId}
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-900">${listingData.title}</div>
            <div class="text-sm text-gray-500">${listingData.description?.substring(0, 50)}...</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-900">${listingData.owner?.name || 'Bilinmiyor'}</div>
            <div class="text-sm text-gray-500">${listingData.owner?.email || ''}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getListingStatusClass(listingData.status)}">
                ${getListingStatusName(listingData.status)}
            </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            ${formatDate(listingData.createdAt)}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <div class="flex justify-end space-x-2">
                <button onclick="viewListing('${listingId}')" class="text-indigo-600 hover:text-indigo-900">
                    <i class="fas fa-eye"></i>
                </button>
                <button onclick="approveListing('${listingId}')" class="text-green-600 hover:text-green-900">
                    <i class="fas fa-check"></i>
                </button>
                <button onclick="rejectListing('${listingId}')" class="text-red-600 hover:text-red-900">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </td>
    `;
    return tr;
}

// İlan durumu sınıfları
function getListingStatusClass(status) {
    const classes = {
        active: 'bg-green-100 text-green-800',
        pending: 'bg-yellow-100 text-yellow-800',
        rejected: 'bg-red-100 text-red-800',
        expired: 'bg-gray-100 text-gray-800'
    };
    return classes[status] || 'bg-gray-100 text-gray-800';
}

// İlan durumu isimleri
function getListingStatusName(status) {
    const names = {
        active: 'Aktif',
        pending: 'Onay Bekliyor',
        rejected: 'Reddedildi',
        expired: 'Süresi Doldu'
    };
    return names[status] || status;
}

// Duyuruları yükleme
async function loadAnnouncements() {
    try {
        const query = db.collection('announcements')
            .orderBy('createdAt', 'desc');
        
        const announcements = await query.get();
        announcementsList.innerHTML = '';

        announcements.forEach(doc => {
            const announcementData = doc.data();
            const announcementCard = createAnnouncementCard(doc.id, announcementData);
            announcementsList.appendChild(announcementCard);
        });
    } catch (error) {
        console.error('Duyurular yüklenirken hata:', error);
        showNotification('Duyurular yüklenirken bir hata oluştu', 'error');
    }
}

// Duyuru kartı oluşturma
function createAnnouncementCard(announcementId, announcementData) {
    const div = document.createElement('div');
    div.className = 'bg-white rounded-lg shadow p-6 mb-4';
    div.innerHTML = `
        <div class="flex justify-between items-start">
            <div>
                <h3 class="text-lg font-semibold text-gray-900">${announcementData.title}</h3>
                <p class="mt-2 text-gray-600">${announcementData.content}</p>
                <p class="mt-2 text-sm text-gray-500">${formatDate(announcementData.createdAt)}</p>
            </div>
            <div class="flex space-x-2">
                <button onclick="editAnnouncement('${announcementId}')" class="text-indigo-600 hover:text-indigo-900">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deleteAnnouncement('${announcementId}')" class="text-red-600 hover:text-red-900">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `;
    return div;
}

// SSS yükleme
async function loadFAQs() {
    try {
        const query = db.collection('faqs')
            .orderBy('createdAt', 'desc');
        
        const faqs = await query.get();
        faqsList.innerHTML = '';

        faqs.forEach(doc => {
            const faqData = doc.data();
            const faqCard = createFAQCard(doc.id, faqData);
            faqsList.appendChild(faqCard);
        });
    } catch (error) {
        console.error('SSS yüklenirken hata:', error);
        showNotification('SSS yüklenirken bir hata oluştu', 'error');
    }
}

// SSS kartı oluşturma
function createFAQCard(faqId, faqData) {
    const div = document.createElement('div');
    div.className = 'bg-white rounded-lg shadow p-6 mb-4';
    div.innerHTML = `
        <div class="flex justify-between items-start">
            <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-900">${faqData.question}</h3>
                <p class="mt-2 text-gray-600">${faqData.answer}</p>
                <p class="mt-2 text-sm text-gray-500">${formatDate(faqData.createdAt)}</p>
            </div>
            <div class="flex space-x-2">
                <button onclick="editFAQ('${faqId}')" class="text-indigo-600 hover:text-indigo-900">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deleteFAQ('${faqId}')" class="text-red-600 hover:text-red-900">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `;
    return div;
}

// Yeni duyuru oluşturma
async function createAnnouncement(event) {
    event.preventDefault();
    
    const title = document.getElementById('announcement-title').value;
    const content = document.getElementById('announcement-content').value;

    try {
        await db.collection('announcements').add({
            title,
            content,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            createdBy: auth.currentUser.uid
        });

        showNotification('Duyuru başarıyla oluşturuldu', 'success');
        closeNewAnnouncementModal();
        loadAnnouncements();
    } catch (error) {
        console.error('Duyuru oluşturulurken hata:', error);
        showNotification('Duyuru oluşturulurken bir hata oluştu', 'error');
    }
}

// Yeni SSS oluşturma
async function createFAQ(event) {
    event.preventDefault();
    
    const question = document.getElementById('faq-question').value;
    const answer = document.getElementById('faq-answer').value;

    try {
        await db.collection('faqs').add({
            question,
            answer,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            createdBy: auth.currentUser.uid
        });

        showNotification('SSS başarıyla oluşturuldu', 'success');
        closeNewFAQModal();
        loadFAQs();
    } catch (error) {
        console.error('SSS oluşturulurken hata:', error);
        showNotification('SSS oluşturulurken bir hata oluştu', 'error');
    }
}

// İlan görüntüleme
async function viewListing(listingId) {
    try {
        const doc = await db.collection('listings').doc(listingId).get();
        if (doc.exists) {
            const listingData = doc.data();
            // TODO: İlan detay modalını göster
            console.log('İlan detayları:', listingData);
        }
    } catch (error) {
        console.error('İlan görüntülenirken hata:', error);
        showNotification('İlan görüntülenirken bir hata oluştu', 'error');
    }
}

// İlan onaylama
async function approveListing(listingId) {
    try {
        await db.collection('listings').doc(listingId).update({
            status: 'active',
            approvedAt: firebase.firestore.FieldValue.serverTimestamp(),
            approvedBy: auth.currentUser.uid
        });
        showNotification('İlan başarıyla onaylandı', 'success');
        loadListings();
    } catch (error) {
        console.error('İlan onaylanırken hata:', error);
        showNotification('İlan onaylanırken bir hata oluştu', 'error');
    }
}

// İlan reddetme
async function rejectListing(listingId) {
    try {
        await db.collection('listings').doc(listingId).update({
            status: 'rejected',
            rejectedAt: firebase.firestore.FieldValue.serverTimestamp(),
            rejectedBy: auth.currentUser.uid
        });
        showNotification('İlan reddedildi', 'success');
        loadListings();
    } catch (error) {
        console.error('İlan reddedilirken hata:', error);
        showNotification('İlan reddedilirken bir hata oluştu', 'error');
    }
}

// Modal işlevleri
function openNewAnnouncementModal() {
    document.getElementById('new-announcement-modal').classList.remove('hidden');
}

function closeNewAnnouncementModal() {
    document.getElementById('new-announcement-modal').classList.add('hidden');
    document.getElementById('new-announcement-form').reset();
}

function openNewFAQModal() {
    document.getElementById('new-faq-modal').classList.remove('hidden');
}

function closeNewFAQModal() {
    document.getElementById('new-faq-modal').classList.add('hidden');
    document.getElementById('new-faq-form').reset();
}

// Örnek kullanıcı verilerini ekle
async function seedSampleUsers() {
    try {
        // Önce mevcut kullanıcıları temizle
        localStorage.setItem('users', '[]');

        // Örnek kullanıcı verileri
        const sampleUsers = [
            {
                displayName: 'Ahmet Yılmaz',
                email: 'ahmet.yilmaz@example.com',
                photoURL: 'https://randomuser.me/api/portraits/men/1.jpg',
                type: 'customer',
                status: 'active',
                createdAt: new Date('2024-01-15').toISOString(),
                lastLoginAt: new Date('2024-03-20').toISOString(),
                phone: '+90 555 111 2233',
                address: 'Kadıköy, İstanbul'
            },
            {
                displayName: 'Mehmet Demir',
                email: 'mehmet.demir@example.com',
                photoURL: 'https://randomuser.me/api/portraits/men/2.jpg',
                type: 'contractor',
                status: 'active',
                createdAt: new Date('2024-02-01').toISOString(),
                lastLoginAt: new Date('2024-03-21').toISOString(),
                phone: '+90 555 222 3344',
                address: 'Çankaya, Ankara',
                companyName: 'Demir İnşaat Ltd. Şti.'
            },
            {
                displayName: 'Ayşe Kaya',
                email: 'ayse.kaya@example.com',
                photoURL: 'https://randomuser.me/api/portraits/women/1.jpg',
                type: 'architect',
                status: 'active',
                createdAt: new Date('2024-02-15').toISOString(),
                lastLoginAt: new Date('2024-03-22').toISOString(),
                phone: '+90 555 333 4455',
                address: 'Konak, İzmir',
                licenseNumber: 'ARC2024001'
            },
            {
                displayName: 'Fatma Şahin',
                email: 'fatma.sahin@example.com',
                photoURL: 'https://randomuser.me/api/portraits/women/2.jpg',
                type: 'notary',
                status: 'active',
                createdAt: new Date('2024-03-01').toISOString(),
                lastLoginAt: new Date('2024-03-23').toISOString(),
                phone: '+90 555 444 5566',
                address: 'Şişli, İstanbul',
                notaryOffice: '15. Noter'
            },
            {
                displayName: 'Ali Öztürk',
                email: 'ali.ozturk@example.com',
                photoURL: 'https://randomuser.me/api/portraits/men/3.jpg',
                type: 'customer',
                status: 'pending',
                createdAt: new Date('2024-03-15').toISOString(),
                lastLoginAt: new Date('2024-03-15').toISOString(),
                phone: '+90 555 555 6677',
                address: 'Nilüfer, Bursa'
            },
            {
                displayName: 'Zeynep Çelik',
                email: 'zeynep.celik@example.com',
                photoURL: 'https://randomuser.me/api/portraits/women/3.jpg',
                type: 'contractor',
                status: 'suspended',
                createdAt: new Date('2024-01-20').toISOString(),
                lastLoginAt: new Date('2024-03-10').toISOString(),
                phone: '+90 555 666 7788',
                address: 'Muratpaşa, Antalya',
                companyName: 'Çelik Yapı A.Ş.'
            },
            {
                displayName: 'Mustafa Aydın',
                email: 'mustafa.aydin@example.com',
                photoURL: 'https://randomuser.me/api/portraits/men/4.jpg',
                type: 'architect',
                status: 'pending',
                createdAt: new Date('2024-03-10').toISOString(),
                lastLoginAt: new Date('2024-03-10').toISOString(),
                phone: '+90 555 777 8899',
                address: 'Seyhan, Adana',
                licenseNumber: 'ARC2024002'
            },
            {
                displayName: 'Elif Yıldız',
                email: 'elif.yildiz@example.com',
                photoURL: 'https://randomuser.me/api/portraits/women/4.jpg',
                type: 'customer',
                status: 'active',
                createdAt: new Date('2024-02-20').toISOString(),
                lastLoginAt: new Date('2024-03-21').toISOString(),
                phone: '+90 555 888 9900',
                address: 'Karşıyaka, İzmir'
            },
            {
                displayName: 'Can Aksoy',
                email: 'can.aksoy@example.com',
                photoURL: 'https://randomuser.me/api/portraits/men/5.jpg',
                type: 'contractor',
                status: 'active',
                createdAt: new Date('2024-01-25').toISOString(),
                lastLoginAt: new Date('2024-03-22').toISOString(),
                phone: '+90 555 999 0011',
                address: 'Beyoğlu, İstanbul',
                companyName: 'Aksoy İnşaat Ltd. Şti.'
            },
            {
                displayName: 'Selin Korkmaz',
                email: 'selin.korkmaz@example.com',
                photoURL: 'https://randomuser.me/api/portraits/women/5.jpg',
                type: 'notary',
                status: 'active',
                createdAt: new Date('2024-02-10').toISOString(),
                lastLoginAt: new Date('2024-03-23').toISOString(),
                phone: '+90 555 000 1122',
                address: 'Melikgazi, Kayseri',
                notaryOffice: '8. Noter'
            }
        ];

        // Her bir örnek kullanıcıyı ekle
        for (const userData of sampleUsers) {
            const userId = `user_${Math.random().toString(36).substr(2, 9)}`;
            await db.collection('users').doc(userId).set({
                ...userData,
                id: userId
            });
        }

        showNotification('Örnek kullanıcılar başarıyla eklendi', 'success');
        // Kullanıcı listesini yenile
        loadUsers();
    } catch (error) {
        console.error('Örnek kullanıcılar eklenirken hata:', error);
        showNotification('Örnek kullanıcılar eklenirken bir hata oluştu', 'error');
    }
}

// Örnek kullanıcıları eklemek için bir buton ekle
document.addEventListener('DOMContentLoaded', () => {
    // Form event listeners
    document.getElementById('new-announcement-form')?.addEventListener('submit', createAnnouncement);
    document.getElementById('new-faq-form')?.addEventListener('submit', createFAQ);

    // İçerik yönetimi sayfası açıldığında içeriği yükle
    if (document.getElementById('content-management-section')) {
        loadContent();
    }

    // Kullanıcı yönetimi sayfasında örnek veri butonu ekle
    const userManagementSection = document.getElementById('user-management-section');
    if (userManagementSection) {
        const filterContainer = userManagementSection.querySelector('.bg-white.rounded-xl.shadow-sm.p-6.border.border-gray-200.mb-6');
        if (filterContainer) {
            const buttonDiv = document.createElement('div');
            buttonDiv.className = 'mt-4 flex justify-end';
            buttonDiv.innerHTML = `
                <button onclick="seedSampleUsers()" class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200">
                    <i class="fas fa-plus mr-2"></i>Örnek Kullanıcılar Ekle
                </button>
            `;
            filterContainer.appendChild(buttonDiv);
        }
    }
});

// Sayfalama bilgisini güncelle
function updatePagination() {
    const totalPages = Math.ceil(totalUsers / usersPerPage);
    pageInfo.textContent = `Sayfa ${currentPage} / ${totalPages}`;
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;
}

// Sayfalama bilgisini güncelle
function updateContentPagination() {
    const totalPages = Math.ceil(totalContent / contentPerPage);
    // Sayfalama bilgisini güncellemek için bir element gerekiyor, bu yüzden burada bir güncelleme yapılmadı.
    // Sayfalama butonlarının disabled durumlarını kontrol etmek için totalPages kullanılabilir.
    // Örneğin, prevPageBtn.disabled = currentContentPage === 1;
    // nextPageBtn.disabled = currentContentPage === totalPages;
}

// Sayfa yüklendiğinde kullanıcıları yükle
document.addEventListener('DOMContentLoaded', () => {
    // Aktif sekmeyi kontrol et ve kullanıcıları yükle
    if (document.getElementById('user-management-section')) {
        loadUsers();
    }
});

// Sidebar ve mobil menü işlevleri
function showSection(sectionId) {
    // Tüm bölümleri gizle
    document.querySelectorAll('main > div').forEach(section => {
        section.classList.add('hidden');
    });
    
    // Seçilen bölümü göster
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.remove('hidden');
        
        // Eğer içerik yönetimi bölümü açıldıysa içeriği yükle
        if (sectionId === 'content-management-section') {
            switchContentTab('listings');
        }
        // Eğer kullanıcı yönetimi bölümü açıldıysa kullanıcıları yükle
        else if (sectionId === 'user-management-section') {
            loadUsers();
        }
    }
    
    // Mobil menüyü kapat
    closeMobileMenu();
}

function openMobileMenu() {
    document.getElementById('sidebar').classList.remove('-translate-x-full');
    document.getElementById('sidebar-overlay').classList.remove('hidden');
}

function closeMobileMenu() {
    document.getElementById('sidebar').classList.add('-translate-x-full');
    document.getElementById('sidebar-overlay').classList.add('hidden');
}

// Çıkış yapma işlevi
async function logout() {
    try {
        await auth.signOut();
        window.location.href = '/login.html';
    } catch (error) {
        console.error('Çıkış yapılırken hata:', error);
        showNotification('Çıkış yapılırken bir hata oluştu', 'error');
    }
} 

// Pazarlama Yönetimi

// Global değişkenler ve varsayılan değerler
const __firebase_config = window.__firebase_config || {
    apiKey: "YOUR_API_KEY",
    authDomain: "your-app.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-app.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
};

const __app_id = window.__app_id || 'default_app_id';
const __initial_auth_token = window.__initial_auth_token || null;

// Firebase referansları
let marketingMetricsRef;
let customerInquiriesRef;
let usersRef;

// Grafik referansları
let cacTrendChart;
let inquiryDistributionChart;

// Pazarlama verilerini tutan değişkenler
let marketingData = {
    metrics: {},
    inquiries: [],
    users: {}
};

// Pazarlama yönetimi başlatma
async function initializeMarketing() {
    try {
        showMarketingLoading(true);

        // Firebase kimlik doğrulama
        if (__initial_auth_token) {
            await firebase.auth().signInWithCustomToken(__initial_auth_token);
        } else {
            await firebase.auth().signInAnonymously();
        }

        // Firestore referanslarını oluştur
        marketingMetricsRef = db.collection(`artifacts/${__app_id}/adminData/marketingMetrics`);
        customerInquiriesRef = db.collection(`artifacts/${__app_id}/adminData/customerInquiries`);
        usersRef = db.collection(`artifacts/${__app_id}/users`);

        // Veri dinleyicilerini başlat
        setupMarketingListeners();
        
        // Grafikleri başlat
        initializeCharts();

    } catch (error) {
        console.error('Pazarlama yönetimi başlatılırken hata:', error);
        showNotification('Pazarlama verileri yüklenirken bir hata oluştu', 'error');
    } finally {
        showMarketingLoading(false);
    }
}

// Veri dinleyicilerini kurma
function setupMarketingListeners() {
    // Pazarlama metrikleri dinleyicisi
    marketingMetricsRef.onSnapshot(snapshot => {
        try {
            const metrics = snapshot.data() || {};
            marketingData.metrics = metrics;
            updateMarketingMetrics(metrics);
            updateCACTrendChart(metrics.cacTrend || []);
        } catch (error) {
            console.error('Metrikler güncellenirken hata:', error);
        }
    });

    // Müşteri talepleri dinleyicisi
    customerInquiriesRef.orderBy('createdAt', 'desc').onSnapshot(snapshot => {
        try {
            marketingData.inquiries = [];
            snapshot.forEach(doc => {
                marketingData.inquiries.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            updateInquiriesList();
            updateInquiryDistributionChart();
        } catch (error) {
            console.error('Talepler güncellenirken hata:', error);
        }
    });

    // Kullanıcı verileri dinleyicisi
    usersRef.onSnapshot(snapshot => {
        try {
            marketingData.users = {};
            snapshot.forEach(doc => {
                marketingData.users[doc.id] = doc.data();
            });
            // Kullanıcı verileri güncellendiğinde talep listesini yenile
            updateInquiriesList();
        } catch (error) {
            console.error('Kullanıcı verileri güncellenirken hata:', error);
        }
    });
}

// Pazarlama metriklerini güncelleme
function updateMarketingMetrics(metrics) {
    // CAC değerini güncelle
    document.getElementById('cac-value').textContent = formatCurrency(metrics.cac || 0);
    document.getElementById('cac-trend').textContent = formatTrend(metrics.cacTrendPercentage || 0);

    // CLTV değerini güncelle
    document.getElementById('cltv-value').textContent = formatCurrency(metrics.cltv || 0);
    document.getElementById('cltv-trend').textContent = formatTrend(metrics.cltvTrendPercentage || 0);

    // Toplam harcama değerini güncelle
    document.getElementById('total-spend-value').textContent = formatCurrency(metrics.totalSpend || 0);
    document.getElementById('spend-trend').textContent = formatTrend(metrics.spendTrendPercentage || 0);
}

// Grafikleri başlatma
function initializeCharts() {
    // CAC Trend Grafiği
    const cacCtx = document.getElementById('cac-trend-chart').getContext('2d');
    cacTrendChart = new Chart(cacCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Müşteri Edinme Maliyeti (CAC)',
                data: [],
                borderColor: '#5A00A8',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: value => '₺' + value
                    }
                }
            }
        }
    });

    // Talep Dağılımı Grafiği
    const inquiryCtx = document.getElementById('inquiry-distribution-chart').getContext('2d');
    inquiryDistributionChart = new Chart(inquiryCtx, {
        type: 'pie',
        data: {
            labels: ['Soru', 'Öneri', 'Şikayet'],
            datasets: [{
                data: [0, 0, 0],
                backgroundColor: ['#5A00A8', '#28a745', '#dc3545']
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

// CAC Trend Grafiğini Güncelleme
function updateCACTrendChart(trendData) {
    if (!cacTrendChart) return;

    const labels = trendData.map(item => item.date);
    const values = trendData.map(item => item.value);

    cacTrendChart.data.labels = labels;
    cacTrendChart.data.datasets[0].data = values;
    cacTrendChart.update();
}

// Talep Dağılımı Grafiğini Güncelleme
function updateInquiryDistributionChart() {
    if (!inquiryDistributionChart) return;

    const distribution = {
        question: 0,
        suggestion: 0,
        complaint: 0
    };

    marketingData.inquiries.forEach(inquiry => {
        distribution[inquiry.type] = (distribution[inquiry.type] || 0) + 1;
    });

    inquiryDistributionChart.data.datasets[0].data = [
        distribution.question,
        distribution.suggestion,
        distribution.complaint
    ];
    inquiryDistributionChart.update();
}

// Müşteri Talepleri Listesini Güncelleme
function updateInquiriesList() {
    const inquiriesList = document.getElementById('inquiries-list');
    if (!inquiriesList) return;

    inquiriesList.innerHTML = marketingData.inquiries.map(inquiry => `
        <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                #${inquiry.id}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">${getUserName(inquiry.userId)}</div>
                <div class="text-sm text-gray-500">${inquiry.userId}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getInquiryTypeClass(inquiry.type)}">
                    ${getInquiryTypeName(inquiry.type)}
                </span>
            </td>
            <td class="px-6 py-4">
                <div class="text-sm text-gray-900">${inquiry.message.substring(0, 50)}${inquiry.message.length > 50 ? '...' : ''}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getInquiryStatusClass(inquiry.status)}">
                    ${getInquiryStatusName(inquiry.status)}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${formatDate(inquiry.createdAt)}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button onclick="openInquiryModal('${inquiry.id}')" class="text-purple-600 hover:text-purple-900">
                    <i class="fas fa-reply"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Yardımcı Fonksiyonlar
function getUserName(userId) {
    const user = marketingData.users[userId];
    return user ? user.displayName : 'Bilinmeyen Kullanıcı';
}

function getInquiryTypeName(type) {
    const types = {
        question: 'Soru',
        suggestion: 'Öneri',
        complaint: 'Şikayet'
    };
    return types[type] || type;
}

function getInquiryTypeClass(type) {
    const classes = {
        question: 'bg-purple-100 text-purple-800',
        suggestion: 'bg-green-100 text-green-800',
        complaint: 'bg-red-100 text-red-800'
    };
    return classes[type] || 'bg-gray-100 text-gray-800';
}

function getInquiryStatusName(status) {
    const statuses = {
        pending: 'Beklemede',
        in_progress: 'İşleme Alındı',
        resolved: 'Çözüldü',
        closed: 'Kapatıldı'
    };
    return statuses[status] || status;
}

function getInquiryStatusClass(status) {
    const classes = {
        pending: 'bg-yellow-100 text-yellow-800',
        in_progress: 'bg-blue-100 text-blue-800',
        resolved: 'bg-green-100 text-green-800',
        closed: 'bg-gray-100 text-gray-800'
    };
    return classes[status] || 'bg-gray-100 text-gray-800';
}

function formatCurrency(value) {
    return new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY'
    }).format(value);
}

function formatTrend(value) {
    const sign = value >= 0 ? '↑' : '↓';
    return `${sign} ${Math.abs(value)}%`;
}

// Modal İşlevleri
function openInquiryModal(inquiryId) {
    const inquiry = marketingData.inquiries.find(i => i.id === inquiryId);
    if (!inquiry) return;

    const modal = document.getElementById('inquiry-modal');
    const details = document.getElementById('inquiry-details');
    
    details.innerHTML = `
        <div class="space-y-4">
            <div>
                <h4 class="text-sm font-medium text-gray-500">Kullanıcı</h4>
                <p class="mt-1">${getUserName(inquiry.userId)}</p>
            </div>
            <div>
                <h4 class="text-sm font-medium text-gray-500">Mesaj</h4>
                <p class="mt-1">${inquiry.message}</p>
            </div>
            <div>
                <h4 class="text-sm font-medium text-gray-500">Tarih</h4>
                <p class="mt-1">${formatDate(inquiry.createdAt)}</p>
            </div>
        </div>
    `;

    document.getElementById('inquiry-status').value = inquiry.status;
    document.getElementById('inquiry-response').value = '';
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');

    // Form gönderme işleyicisini ayarla
    const form = document.getElementById('inquiry-response-form');
    form.onsubmit = (e) => handleInquiryResponse(e, inquiryId);
}

function closeInquiryModal() {
    const modal = document.getElementById('inquiry-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

async function handleInquiryResponse(event, inquiryId) {
    event.preventDefault();

    const response = document.getElementById('inquiry-response').value;
    const status = document.getElementById('inquiry-status').value;

    try {
        await customerInquiriesRef.doc(inquiryId).update({
            status,
            response,
            respondedAt: firebase.firestore.FieldValue.serverTimestamp(),
            respondedBy: auth.currentUser.uid
        });

        showNotification('Yanıt başarıyla gönderildi', 'success');
        closeInquiryModal();
    } catch (error) {
        console.error('Yanıt gönderilirken hata:', error);
        showNotification('Yanıt gönderilirken bir hata oluştu', 'error');
    }
}

// Yükleme ekranını göster/gizle
function showMarketingLoading(show) {
    const loadingElement = document.getElementById('marketing-loading');
    if (loadingElement) {
        loadingElement.style.display = show ? 'flex' : 'none';
    }
}

// Sayfa yüklendiğinde pazarlama yönetimini başlat
document.addEventListener('DOMContentLoaded', () => {
    const marketingSection = document.getElementById('marketing-section');
    if (marketingSection && !marketingSection.classList.contains('hidden')) {
        initializeMarketing();
    }
}); 

// Kampanya Yönetimi Fonksiyonları
function openNewCampaignModal() {
    const modal = document.getElementById('new-campaign-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeNewCampaignModal() {
    const modal = document.getElementById('new-campaign-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

// Yeni kampanya form yönetimi
document.getElementById('new-campaign-form')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Form verilerini al
    const campaignData = {
        name: document.getElementById('campaign-name').value,
        platform: document.getElementById('campaign-platform').value,
        budget: document.getElementById('campaign-budget').value,
        startDate: document.getElementById('campaign-start-date').value,
        endDate: document.getElementById('campaign-end-date').value
    };

    try {
        // Form validasyonu
        if (!campaignData.name || !campaignData.platform || !campaignData.budget || !campaignData.startDate || !campaignData.endDate) {
            showNotification('Lütfen tüm alanları doldurun', 'error');
            return;
        }

        // Başlangıç tarihi bitiş tarihinden sonra olamaz
        if (new Date(campaignData.startDate) > new Date(campaignData.endDate)) {
            showNotification('Başlangıç tarihi bitiş tarihinden sonra olamaz', 'error');
            return;
        }

        // Firebase'e kaydet
        await firebase.firestore().collection('campaigns').add({
            ...campaignData,
            status: 'active',
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        // Başarılı bildirim göster
        showNotification('Kampanya başarıyla oluşturuldu', 'success');
        
        // Modalı kapat ve formu temizle
        closeNewCampaignModal();
        e.target.reset();
        
        // Kampanya listesini güncelle
        loadCampaigns();
    } catch (error) {
        console.error('Kampanya oluşturma hatası:', error);
        showNotification('Kampanya oluşturulurken bir hata oluştu', 'error');
    }
});

// Kampanyaları yükle
async function loadCampaigns() {
    try {
        const campaignsRef = firebase.firestore().collection('campaigns');
        const snapshot = await campaignsRef.orderBy('createdAt', 'desc').get();
        
        const campaignList = document.getElementById('campaign-list');
        campaignList.innerHTML = ''; // Listeyi temizle
        
        snapshot.forEach(doc => {
            const campaign = doc.data();
            const row = document.createElement('tr');
            
            // Tarih formatını düzenle
            const startDate = new Date(campaign.startDate).toLocaleDateString('tr-TR');
            const endDate = new Date(campaign.endDate).toLocaleDateString('tr-TR');
            
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">${campaign.name}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${campaign.platform}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">₺${campaign.budget}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${startDate}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${endDate}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        ${campaign.status}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onclick="editCampaign('${doc.id}')" class="text-indigo-600 hover:text-indigo-900 mr-2">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="deleteCampaign('${doc.id}')" class="text-red-600 hover:text-red-900">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            
            campaignList.appendChild(row);
        });
    } catch (error) {
        console.error('Kampanyaları yükleme hatası:', error);
        showNotification('Kampanyalar yüklenirken bir hata oluştu', 'error');
    }
}

// Kampanya düzenleme
async function editCampaign(campaignId) {
    // Kampanya düzenleme modalını aç ve verileri doldur
    // Bu fonksiyon daha sonra implemente edilecek
    console.log('Kampanya düzenleme:', campaignId);
}

// Kampanya silme
async function deleteCampaign(campaignId) {
    if (confirm('Bu kampanyayı silmek istediğinizden emin misiniz?')) {
        try {
            await firebase.firestore().collection('campaigns').doc(campaignId).delete();
            showNotification('Kampanya başarıyla silindi', 'success');
            loadCampaigns(); // Listeyi güncelle
        } catch (error) {
            console.error('Kampanya silme hatası:', error);
            showNotification('Kampanya silinirken bir hata oluştu', 'error');
        }
    }
}

// Sayfa yüklendiğinde kampanyaları yükle
document.addEventListener('DOMContentLoaded', function() {
    // Pazarlama sekmesi aktif olduğunda kampanyaları yükle
    const marketingTab = document.querySelector('a[onclick="showSection(\'marketing-section\')"]');
    if (marketingTab) {
        marketingTab.addEventListener('click', loadCampaigns);
    }
}); 