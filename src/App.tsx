import React, { useState, useEffect } from 'react';
// Updated with Hero Section & AI Features
import PropertyCarousel from './PropertyCarousel';
import './PropertyCarousel.css';
import './index.css';

interface Project {
  id: string;
  name: string;
  logo?: string;
  description: string;
}

const PROJECTS: Project[] = [
  {
    id: 'baitk-misr',
    name: 'بيتك في مصر',
    description: 'منصة متخصصة في العقارات السكنية بأسعار مميزة',
    logo: '🏠'
  },
  {
    id: 'misr-real-estate',
    name: 'مصر العقارية',
    description: 'أكبر منصة عقارية مصرية للعقارات الفاخرة',
    logo: '🏢'
  },
  {
    id: 'nile-properties',
    name: 'نيل للعقارات',
    description: 'منصة متخصصة في العقارات التجارية والسكنية',
    logo: '🌊'
  }
];

function App() {
  const [currentPage, setCurrentPage] = useState<'maintenance' | 'landing' | 'register' | 'dashboard'>('landing');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [user, setUser] = useState<any>(null);

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    setCurrentPage('register');
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.phone || !formData.password) {
      alert('الرجاء ملء جميع الحقول');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('كلمات المرور غير متطابقة');
      return;
    }

    if (formData.password.length < 6) {
      alert('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return;
    }

    const userData = {
      id: Date.now(),
      ...formData,
      projectId: selectedProject?.id,
      projectName: selectedProject?.name,
      createdAt: new Date().toISOString()
    };

    localStorage.setItem('skyunit_user', JSON.stringify(userData));
    setUser(userData);
    setCurrentPage('dashboard');
    alert(`تم إنشاء حسابك بنجاح! مرحباً بك في ${selectedProject?.name}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('skyunit_user');
    setUser(null);
    setCurrentPage('landing');
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    });
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('skyunit_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setCurrentPage('dashboard');
    }
  }, []);

  return (
    <div className="app">
      {/* Maintenance Page */}
      {currentPage === 'maintenance' && (
        <div className="maintenance-container">
          <div className="maintenance-background"></div>
          <div className="maintenance-overlay"></div>
          <div className="maintenance-content">
            <div className="maintenance-header">
              <h1 className="maintenance-title">جارٍ تحديث منصّة SkyUnit</h1>
              <p className="maintenance-subtitle">منصّة SkyUnit بتخضع الآن لتحديثات مهمّة علشان نقدّم لكم أفضل تجربة حجز عقاري مدعومة بالذكاء الاصطناعي.</p>
            </div>

            <div className="maintenance-loader">
              <div className="loader-dot"></div>
              <div className="loader-dot"></div>
              <div className="loader-dot"></div>
            </div>

            <div className="maintenance-message">
              <p className="message-primary">سيتم الانتهاء من التحديث وعودة الموقع للعمل خلال الساعات القادمة</p>
              <p className="message-secondary">شكرًا لثقتكم وصبركم معنا</p>
            </div>

            <div className="maintenance-features">
              <p className="feature-item">🌟 المنصة العقارية الأحدث في مصر</p>
              <p className="feature-item">⚡ بتقنيات عالمية من أقوى شركات البرمجة</p>
              <p className="feature-item">✨ قريباً..البدء في تجربة فريدة</p>
            </div>
          </div>
        </div>
      )}

      {/* Landing Page */}
      {currentPage === 'landing' && (
        <div className="landing-page">
                    <PropertyCarousel />
          <header className="header">
            <h1>SkyUnit - منصة حجز العقارات</h1>
            <p>اختر منصتك المفضلة وابدأ رحلتك في البحث عن العقار المثالي</p>
          </header>
          <main className="main">
            <section className="projects-grid">
              {PROJECTS.map(project => (
                <div key={project.id} className="project-card">
                  <div className="project-logo">{project.logo}</div>
                  <h2>{project.name}</h2>
                  <p>{project.description}</p>
                  <button 
                    className="btn-select-project"
                    onClick={() => handleProjectSelect(project)}
                  >
                    ابدأ الآن
                  </button>
                </div>
              ))}
            </section>
          </main>
          <footer className="footer">
            <p>© 2025 SkyUnit - منصة البحث الدقيق</p>
          </footer>
        </div>
      )}

      {/* Registration Page */}
      {currentPage === 'register' && selectedProject && (
        <div className="register-page">
          <header className="header">
            <button className="btn-back" onClick={() => setCurrentPage('landing')}>← رجوع</button>
            <h1>إنشاء حساب في {selectedProject.name}</h1>
          </header>
          <main className="main">
            <div className="register-container">
              <div className="project-info">
                <div className="project-badge">{selectedProject.logo}</div>
                <h2>{selectedProject.name}</h2>
                <p className="info-text">ملاحظة: حسابك سيكون مرتبطاً بمنصة {selectedProject.name} وستتمكن من عرض عروضهم الخاصة والحجز المباشر معهم.</p>
              </div>
              <form className="register-form" onSubmit={handleRegister}>
                <div className="form-group">
                  <label>الاسم الكامل *</label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="أدخل اسمك الكامل"
                    value={formData.fullName}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>البريد الإلكتروني *</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>رقم الهاتف *</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="01xxxxxxxxx"
                    value={formData.phone}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>كلمة المرور *</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="أدخل كلمة مرور قوية (6 أحرف على الأقل)"
                    value={formData.password}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>تأكيد كلمة المرور *</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="أعد إدخال كلمة المرور"
                    value={formData.confirmPassword}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <button type="submit" className="btn-register">
                  إنشاء حساب
                </button>
              </form>
            </div>
          </main>
          <footer className="footer">
            <p>© 2025 SkyUnit - منصة البحث الدقيق</p>
          </footer>
        </div>
      )}

      {/* Dashboard Page */}
      {currentPage === 'dashboard' && user && (
        <div className="dashboard-page">
          <header className="header dashboard-header">
            <div className="header-left">
              <h1>مرحباً، {user.fullName}</h1>
              <p className="subtitle">حسابك في {user.projectName}</p>
            </div>
            <button className="btn-logout" onClick={handleLogout}>
              تسجيل الخروج
            </button>
          </header>
          <main className="main dashboard-main">
            <div className="user-info-card">
              <h2>بيانات الحساب</h2>
              <div className="info-row">
                <span className="label">الاسم:</span>
                <span className="value">{user.fullName}</span>
              </div>
              <div className="info-row">
                <span className="label">البريد الإلكتروني:</span>
                <span className="value">{user.email}</span>
              </div>
              <div className="info-row">
                <span className="label">رقم الهاتف:</span>
                <span className="value">{user.phone}</span>
              </div>
              <div className="info-row">
                <span className="label">المنصة:</span>
                <span className="value">{user.projectName}</span>
              </div>
              <div className="info-row">
                <span className="label">تاريخ الإنشاء:</span>
                <span className="value">{new Date(user.createdAt).toLocaleDateString('ar-EG')}</span>
              </div>
            </div>
            <div className="features-card">
              <h2>الميزات المتاحة</h2>
              <ul className="features-list">
                <li>✓ عرض جميع العقارات المتاحة في {user.projectName}</li>
                <li>✓ الحجز المباشر للعقارات</li>
                <li>✓ متابعة طلبات الحجز الخاصة بك</li>
                <li>✓ الحصول على عروض حصرية</li>
                <li>✓ التواصل المباشر مع المستشارين</li>
              </ul>
            </div>
          </main>
          <footer className="footer">
            <p>© 2025 SkyUnit - منصة البحث الدقيق</p>
          </footer>
        </div>
      )}
    </div>
  );
}

export default App;
