 
        // Sayfa yüklenirken oturum kontrolü
        document.addEventListener('DOMContentLoaded', () => {
            // Eğer kullanıcı zaten oturum açmışsa dashboard'a yönlendir
            const isLoggedIn = localStorage.getItem('admin_logged_in');
            const userRole = localStorage.getItem('admin_user_role');
            
            if (isLoggedIn === 'true' && userRole) {
                showNotification('Zaten oturum açmışsınız, dashboard\'a yönlendiriliyorsunuz...', 'success');
                setTimeout(() => {
                    window.location.href = `${userRole}-dashboard.html`;
                }, 1000);
                return;
            }
            
            // URL parametrelerini kontrol et
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.get('register') === 'true') {
                toggleForms();
            }
        });

        // Bildirim gösterme fonksiyonu
        function showNotification(message, type) {
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.textContent = message;
            document.body.appendChild(notification);

            setTimeout(() => {
                notification.remove();
            }, 3000);
        }

        // Form geçiş fonksiyonu
        function toggleForms() {
            const loginForm = document.getElementById('loginForm');
            const registerForm = document.getElementById('registerForm');
            loginForm.classList.toggle('hidden');
            registerForm.classList.toggle('hidden');
        }

        // Buton yükleme durumu
        function setLoading(button, isLoading) {
            if (isLoading) {
                button.classList.add('loading');
                button.disabled = true;
            } else {
                button.classList.remove('loading');
                button.disabled = false;
            }
        }

        // Simüle edilmiş kullanıcı verileri
        const users = {
            'admin@donusumay.com': {
                password: '123456',
                role: 'admin',
                name: 'Sistem Yöneticisi',
                dashboard: 'admin-dashboard.html'
            },
            'customer@donusumay.com': {
                password: '123456',
                role: 'customer',
                name: 'Ahmet Yılmaz',
                dashboard: 'customer-dashboard.html'
            },
            'contractor@donusumay.com': {
                password: '123456',
                role: 'contractor',
                name: 'Mehmet İnşaat Ltd. Şti.',
                dashboard: 'contractor-dashboard.html'
            },
            'architect@donusumay.com': {
                password: '123456',
                role: 'architect',
                name: 'Zeynep Mimar',
                dashboard: 'architect-dashboard.html'
            },
            'notary@donusumay.com': {
                password: '123456',
                role: 'notary',
                name: 'Ali Noter',
                dashboard: 'notary-dashboard.html'
            }
        };

        // Giriş formu işleme
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const button = e.target.querySelector('button[type="submit"]');
            
            setLoading(button, true);
            
            const user = users[email];
            if (user && user.password === password) {
                // localStorage'a kullanıcı bilgilerini kaydet
                localStorage.setItem('admin_logged_in', 'true');
                localStorage.setItem('admin_user_email', email);
                localStorage.setItem('admin_user_role', user.role);
                localStorage.setItem('admin_user_name', user.name);
                
                showNotification(`Hoş geldiniz, ${user.name}!`, 'success');
                
                // Kısa bir gecikme ile yönlendirme yap
                setTimeout(() => {
                    window.location.href = user.dashboard;
                }, 1000);
            } else {
                showNotification('Geçersiz e-posta veya şifre.', 'error');
                setLoading(button, false);
            }
        });

        // Kayıt formu işleme
        document.getElementById('registerForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const role = document.getElementById('registerRole').value;
            const button = e.target.querySelector('button[type="submit"]');
            
            setLoading(button, true);
            
            if (users[email]) {
                showNotification('Bu e-posta adresi zaten kullanımda.', 'error');
                setLoading(button, false);
                return;
            }
            
            users[email] = {
                password: password,
                role: role,
                name: name,
                dashboard: `${role}-dashboard.html`
            };
            
            // Kayıt olan kullanıcıyı otomatik olarak giriş yap
            localStorage.setItem('admin_logged_in', 'true');
            localStorage.setItem('admin_user_email', email);
            localStorage.setItem('admin_user_role', role);
            localStorage.setItem('admin_user_name', name);
            
            showNotification('Kayıt başarılı! Dashboard\'a yönlendiriliyorsunuz...', 'success');
            setTimeout(() => {
                window.location.href = `${role}-dashboard.html`;
            }, 1500);
        });

        // Örnek giriş bilgilerini sayfaya ekle
        document.addEventListener('DOMContentLoaded', () => {
            const loginForm = document.getElementById('loginForm');
            const demoCredentials = document.createElement('div');
            demoCredentials.className = 'mt-4 p-4 bg-gray-50 rounded-lg';
            demoCredentials.innerHTML = `
                <h3 class="text-sm font-medium text-gray-700 mb-2">Örnek Giriş Bilgileri:</h3>
                <div class="space-y-2 text-sm text-gray-600">
                    <p><strong>Admin:</strong> admin@donusumay.com / 123456</p>
                    <p><strong>Müşteri:</strong> customer@donusumay.com / 123456</p>
                    <p><strong>Müteahhit:</strong> contractor@donusumay.com / 123456</p>
                    <p><strong>Mimar:</strong> architect@donusumay.com / 123456</p>
                    <p><strong>Noter:</strong> notary@donusumay.com / 123456</p>
                </div>
            `;
            loginForm.appendChild(demoCredentials);
        });
