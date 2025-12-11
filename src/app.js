// نظام إدارة التطبيق والأسعار
// System for Application Management and Pricing

class PricingManager {
  constructor() {
    this.userAuthenticated = false;
    this.priceMap = {
      'gold': 50000,
      'silver': 30000,
      'bronze': 20000
    };
    this.observerConfig = {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true
    };
    this.init();
  }

  init() {
    this.setupPriceObserver();
    this.setupAuthListener();
    this.checkUserAuthentication();
  }

  setupPriceObserver() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.target.classList && mutation.target.classList.contains('price')) {
          this.updatePriceDisplay(mutation.target);
        }
      });
    });

    // Watch for price elements
    const priceElements = document.querySelectorAll('.price');
    priceElements.forEach((el) => {
      observer.observe(el, this.observerConfig);
    });
  }

  setupAuthListener() {
    // Listen for authentication changes
    document.addEventListener('authStatusChanged', (e) => {
      this.userAuthenticated = e.detail.isAuthenticated;
      if (this.userAuthenticated) {
        this.revealPrices();
      } else {
        this.hidePrices();
      }
    });
  }

  checkUserAuthentication() {
    // Fetch user authentication status from backend
    fetch('/api/user')
      .then(res => res.json())
      .then(data => {
        if (data.authenticated) {
          this.userAuthenticated = true;
          this.revealPrices();
        }
      })
      .catch(() => {
        this.userAuthenticated = false;
        this.hidePrices();
      });
  }

  revealPrices() {
    const priceElements = document.querySelectorAll('.price[data-price]');
    priceElements.forEach((el) => {
      const price = el.dataset.price;
      if (price) {
        const formatted = new Intl.NumberFormat('ar-EG', {
          style: 'currency',
          currency: 'EGP',
          minimumFractionDigits: 0
        }).format(price);
        el.textContent = formatted;
        el.style.opacity = '1';
        el.classList.add('price-revealed');
      }
    });
  }

  hidePrices() {
    const priceElements = document.querySelectorAll('.price');
    priceElements.forEach((el) => {
      if (!el.dataset.price) return;
      el.textContent = '••• ألف';
      el.style.opacity = '0.6';
      el.classList.remove('price-revealed');
    });
  }

  updatePriceDisplay(element) {
    if (this.userAuthenticated && element.dataset.price) {
      const price = element.dataset.price;
      const formatted = new Intl.NumberFormat('ar-EG', {
        style: 'currency',
        currency: 'EGP',
        minimumFractionDigits: 0
      }).format(price);
      element.textContent = formatted;
      element.style.opacity = '1';
    } else {
      element.textContent = '••• ألف';
      element.style.opacity = '0.6';
    }
  }
}

// Navigation System
class NavigationManager {
  constructor() {
    this.currentPage = 'home';
    this.pages = ['home', 'dashboard', 'properties', 'bookings', 'settings'];
    this.init();
  }

  init() {
    this.setupNavListeners();
  }

  setupNavListeners() {
    const navItems = document.querySelectorAll('[data-nav]');
    navItems.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        this.navigateTo(item.dataset.nav);
      });
    });
  }

  navigateTo(page) {
    if (!this.pages.includes(page)) return;
    this.currentPage = page;
    this.hideAllPages();
    this.showPage(page);
  }

  hideAllPages() {
    this.pages.forEach((page) => {
      const element = document.getElementById(`page-${page}`);
      if (element) element.style.display = 'none';
    });
  }

  showPage(page) {
    const element = document.getElementById(`page-${page}`);
    if (element) element.style.display = 'block';
  }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.pricingManager = new PricingManager();
    window.navigationManager = new NavigationManager();
  });
} else {
  window.pricingManager = new PricingManager();
  window.navigationManager = new NavigationManager();
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PricingManager, NavigationManager };
}
