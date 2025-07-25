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
            onAuthStateChanged: function(callback) {
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
            signOut: function() {
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
        { id: 1, name: "Ahmet Yılmaz", email: "ahmet@example.com", type: "customer", status: "active", registrationDate: "2024-01-15", lastLogin: "2024-01-20" },
        { id: 2, name: "Fatma Kaya", email: "fatma@example.com", type: "contractor", status: "active", registrationDate: "2024-01-10", lastLogin: "2024-01-19" },
        { id: 3, name: "Mehmet Öz", email: "mehmet@example.com", type: "architect", status: "pending", registrationDate: "2024-01-18", lastLogin: "Never" }
    ],
    listings: [
        { id: 101, title: "3+1 Daire Kadıköy", type: "apartment", location: "İstanbul, Kadıköy", price: "₺850,000", status: "active", date: "2024-01-15", owner: "Ahmet Yılmaz" },
        { id: 102, title: "Villa Zekeriyaköy", type: "house", location: "İstanbul, Sarıyer", price: "₺2,500,000", status: "pending", date: "2024-01-18", owner: "Fatma Kaya" },
        { id: 103, title: "Ofis Levent", type: "office", location: "İstanbul, Beşiktaş", price: "₺1,200,000", status: "rejected", date: "2024-01-12", owner: "Mehmet Öz" }
    ],
    offers: [
        { id: 201, listingTitle: "3+1 Daire Kadıköy", offerBy: "Ayşe Demir", amount: "₺800,000", status: "pending", date: "2024-01-19" },
        { id: 202, listingTitle: "Villa Zekeriyaköy", offerBy: "Can Yıldız", amount: "₺2,300,000", status: "accepted", date: "2024-01-17" },
        { id: 203, listingTitle: "Ofis Levent", offerBy: "Selin Ak", amount: "₺1,100,000", status: "rejected", date: "2024-01-16" }
    ],
    projects: [
        { id: 301, name: "Kadıköy Konut Projesi", contractor: "ABC İnşaat", architect: "Mimar Sinan", status: "ongoing", startDate: "2024-01-01", endDate: "2024-12-31" },
        { id: 302, name: "Zekeriyaköy Villa Projesi", contractor: "XYZ Yapı", architect: "Mimar Kemalettin", status: "planning", startDate: "2024-02-01", endDate: "2024-10-15" },
        { id: 303, name: "Levent Ofis Projesi", contractor: "DEF İnşaat", architect: "Mimar Vedat", status: "completed", startDate: "2023-06-01", endDate: "2023-12-31" }
    ],
    legalProcesses: {
        contracts: [
            { id: 401, type: "Satış Sözleşmesi", parties: "Ahmet Yılmaz - Ayşe Demir", status: "active", date: "2024-01-15" },
            { id: 402, type: "İnşaat Sözleşmesi", parties: "ABC İnşaat - Fatma Kaya", status: "pending", date: "2024-01-10" }
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
            { id: 701, user: "Ahmet Yılmaz", subject: "Giriş Sorunu", priority: "high", status: "open", date: "2024-01-19" },
            { id: 702, user: "Fatma Kaya", subject: "İlan Yayınlama", priority: "medium", status: "closed", date: "2024-01-18" }
        ],
        complaints: [
            { id: 801, complainant: "Ayşe Demir", defendant: "Mehmet Öz", category: "Müteahhit Sorunu", status: "investigating", date: "2024-01-17" },
            { id: 802, complainant: "Can Yıldız", defendant: "ABC İnşaat", category: "Gecikmeli Teslim", status: "resolved", date: "2024-01-15" }
        ],
        feedback: [
            { id: 901, user: "Selin Ak", type: "Platform Değerlendirmesi", rating: 4, date: "2024-01-16" },
            { id: 902, user: "Ahmet Yılmaz", type: "Hizmet Kalitesi", rating: 5, date: "2024-01-14" }
        ]
    },
    tickets: [
        { id: 1001, title: "Sistem Hatası", category: "technical", status: "open", date: "2024-01-19" },
        { id: 1002, title: "Fatura Sorunu", category: "billing", status: "closed", date: "2024-01-18" },
        { id: 1003, title: "Hesap Sorunu", category: "account", status: "pending", date: "2024-01-17" }
    ]
};

// Authentication Check
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    console.log('Initializing admin dashboard...');
    
    // Check authentication status
    auth.onAuthStateChanged(function(user) {
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
    switch(sectionId) {
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
    document.getElementById('active-projects').textContent = sampleData.projects.filter(p => p.status === 'ongoing').length;
    document.getElementById('open-tickets').textContent = sampleData.tickets.filter(t => t.status === 'open').length;
}

function loadRecentActivity() {
    const activityList = document.getElementById('recent-activity-list');
    const activities = [
        { icon: 'fa-user-plus', text: 'Yeni kullanıcı kaydı: Ahmet Yılmaz', time: '5 dakika önce', color: 'text-green-600' },
        { icon: 'fa-home', text: 'Yeni ilan eklendi: 3+1 Daire Kadıköy', time: '15 dakika önce', color: 'text-blue-600' },
        { icon: 'fa-handshake', text: 'Teklif kabul edildi: Villa Zekeriyaköy', time: '1 saat önce', color: 'text-purple-600' },
        { icon: 'fa-exclamation-triangle', text: 'Yeni şikayet: Müteahhit Sorunu', time: '2 saat önce', color: 'text-red-600' }
    ];
    
    activityList.innerHTML = activities.map(activity => `
        <div class="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
            <div class="flex-shrink-0">
                <i class="fas ${activity.icon} ${activity.color}"></i>
            </div>
            <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900">${activity.text}</p>
                <p class="text-xs text-gray-500">${activity.time}</p>
            </div>
        </div>
    `).join('');
}

// User Management Functions
function loadUsers() {
    const userList = document.getElementById('user-list');
    userList.innerHTML = sampleData.users.map(user => `
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
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    ${getUserTypeText(user.type)}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}">
                    ${getStatusText(user.status)}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${formatDate(user.registrationDate)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${user.lastLogin === 'Never' ? 'Hiç' : formatDate(user.lastLogin)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button onclick="viewUser(${user.id})" class="text-indigo-600 hover:text-indigo-900 mr-2">Görüntüle</button>
                <button onclick="editUser(${user.id})" class="text-green-600 hover:text-green-900 mr-2">Düzenle</button>
                <button onclick="deleteUser(${user.id})" class="text-red-600 hover:text-red-900">Sil</button>
            </td>
        </tr>
    `).join('');
}

// Listing Management Functions
function loadListings() {
    updateListingStats();
    const listingsTable = document.getElementById('listings-table');
    listingsTable.innerHTML = sampleData.listings.map(listing => `
        <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#${listing.id}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${listing.title}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    ${getListingTypeText(listing.type)}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${listing.location}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${listing.price}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(listing.status)}">
                    ${getStatusText(listing.status)}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${formatDate(listing.date)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button onclick="viewListing(${listing.id})" class="text-indigo-600 hover:text-indigo-900 mr-2">Görüntüle</button>
                <button onclick="approveListing(${listing.id})" class="text-green-600 hover:text-green-900 mr-2">Onayla</button>
                <button onclick="rejectListing(${listing.id})" class="text-red-600 hover:text-red-900">Reddet</button>
            </td>
        </tr>
    `).join('');
}

function updateListingStats() {
    document.getElementById('total-listings').textContent = sampleData.listings.length;
    document.getElementById('active-listings-count').textContent = sampleData.listings.filter(l => l.status === 'active').length;
    document.getElementById('pending-listings').textContent = sampleData.listings.filter(l => l.status === 'pending').length;
    document.getElementById('rejected-listings').textContent = sampleData.listings.filter(l => l.status === 'rejected').length;
}

// Offer Management Functions
function loadOffers() {
    updateOfferStats();
    const offersTable = document.getElementById('offers-table');
    offersTable.innerHTML = sampleData.offers.map(offer => `
        <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#${offer.id}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${offer.listingTitle}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${offer.offerBy}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${offer.amount}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(offer.status)}">
                    ${getOfferStatusText(offer.status)}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${formatDate(offer.date)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button onclick="viewOffer(${offer.id})" class="text-indigo-600 hover:text-indigo-900 mr-2">Görüntüle</button>
                <button onclick="approveOffer(${offer.id})" class="text-green-600 hover:text-green-900 mr-2">Onayla</button>
                <button onclick="rejectOffer(${offer.id})" class="text-red-600 hover:text-red-900">Reddet</button>
            </td>
        </tr>
    `).join('');
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
    projectsTable.innerHTML = sampleData.projects.map(project => `
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
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${formatDate(project.startDate)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${formatDate(project.endDate)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button onclick="viewProject(${project.id})" class="text-indigo-600 hover:text-indigo-900 mr-2">Görüntüle</button>
                <button onclick="editProject(${project.id})" class="text-green-600 hover:text-green-900 mr-2">Düzenle</button>
                <button onclick="deleteProject(${project.id})" class="text-red-600 hover:text-red-900">Sil</button>
            </td>
        </tr>
    `).join('');
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
    switch(tabName) {
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
    contractsTable.innerHTML = sampleData.legalProcesses.contracts.map(contract => `
        <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#${contract.id}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${contract.type}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${contract.parties}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(contract.status)}">
                    ${getStatusText(contract.status)}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${formatDate(contract.date)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button onclick="viewContract(${contract.id})" class="text-indigo-600 hover:text-indigo-900 mr-2">Görüntüle</button>
                <button onclick="editContract(${contract.id})" class="text-green-600 hover:text-green-900 mr-2">Düzenle</button>
                <button onclick="deleteContract(${contract.id})" class="text-red-600 hover:text-red-900">Sil</button>
            </td>
        </tr>
    `).join('');
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
    switch(tabName) {
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
    const supportTable = document.getElementById('support-requests-table');
    supportTable.innerHTML = sampleData.supportComplaints.support.map(support => `
        <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#${support.id}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${support.user}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${support.subject}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(support.priority)}">
                    ${getPriorityText(support.priority)}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(support.status)}">
                    ${getSupportStatusText(support.status)}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${formatDate(support.date)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button onclick="viewSupportRequest(${support.id})" class="text-indigo-600 hover:text-indigo-900 mr-2">Görüntüle</button>
                <button onclick="respondToSupport(${support.id})" class="text-green-600 hover:text-green-900 mr-2">Yanıtla</button>
                <button onclick="closeSupportRequest(${support.id})" class="text-red-600 hover:text-red-900">Kapat</button>
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
        'notary': 'Noter'
    };
    return types[type] || type;
}

function getListingTypeText(type) {
    const types = {
        'apartment': 'Daire',
        'house': 'Ev',
        'office': 'Ofis',
        'land': 'Arsa'
    };
    return types[type] || type;
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

function editUser(id) {
    const user = sampleData.users.find(u => u.id == id);
    if (!user) {
        showNotification('Kullanıcı bulunamadı', 'error');
        return;
    }
    
    const formContent = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Ad Soyad</label>
                <input type="text" id="edit-user-name" value="${user.name}" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">E-posta</label>
                <input type="email" id="edit-user-email" value="${user.email}" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Kullanıcı Tipi</label>
                <select id="edit-user-type" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option value="customer" ${user.type === 'customer' ? 'selected' : ''}>Müşteri</option>
                    <option value="contractor" ${user.type === 'contractor' ? 'selected' : ''}>Müteahhit</option>
                    <option value="architect" ${user.type === 'architect' ? 'selected' : ''}>Mimar</option>
                    <option value="notary" ${user.type === 'notary' ? 'selected' : ''}>Noter</option>
                </select>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Durum</label>
                <select id="edit-user-status" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option value="active" ${user.status === 'active' ? 'selected' : ''}>Aktif</option>
                    <option value="pending" ${user.status === 'pending' ? 'selected' : ''}>Onay Bekleyen</option>
                    <option value="suspended" ${user.status === 'suspended' ? 'selected' : ''}>Askıya Alınmış</option>
                </select>
            </div>
        </div>
    `;
    
    openEditModal(`Kullanıcı Düzenle - ${user.name}`, formContent, function(e) {
        e.preventDefault();
        // Update user data
        user.name = document.getElementById('edit-user-name').value;
        user.email = document.getElementById('edit-user-email').value;
        user.type = document.getElementById('edit-user-type').value;
        user.status = document.getElementById('edit-user-status').value;
        
        closeEditModal();
        showNotification('Kullanıcı başarıyla güncellendi', 'success');
        loadUsers(); // Refresh the user list
    });
}

function deleteUser(id) {
    if (confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz?')) {
        const index = sampleData.users.findIndex(u => u.id == id);
        if (index > -1) {
            sampleData.users.splice(index, 1);
            showNotification('Kullanıcı başarıyla silindi', 'success');
            loadUsers();
            closeViewModal();
        }
    }
}

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
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz'],
            datasets: [{
                label: 'Kullanıcı Sayısı',
                data: [12, 19, 3, 5, 2, 3],
                borderColor: 'rgb(147, 51, 234)',
                backgroundColor: 'rgba(147, 51, 234, 0.1)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function setupProjectDistributionChart() {
    const ctx = document.getElementById('projectDistributionChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Devam Eden', 'Tamamlanan', 'Planlama', 'İptal Edilen'],
            datasets: [{
                data: [30, 45, 15, 10],
                backgroundColor: [
                    '#fbbf24',
                    '#10b981',
                    '#3b82f6',
                    '#ef4444'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
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

function loadFinancialData() {
    // Load financial data
    document.getElementById('total-revenue').textContent = '₺150,000';
    document.getElementById('average-revenue').textContent = '₺25,000';
    document.getElementById('last-revenue').textContent = '₺30,000';
    document.getElementById('total-expenses').textContent = '₺75,000';
    document.getElementById('average-expenses').textContent = '₺12,500';
    document.getElementById('last-expense').textContent = '₺15,000';
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

function loadSettings() {
    // Load system settings
    // Implementation for settings functionality
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

function viewTicket(id) { showNotification('Ticket görüntüleniyor: ' + id, 'info'); }
function closeTicket(id) { showNotification('Ticket kapatıldı: ' + id, 'success'); } 
