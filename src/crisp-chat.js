// نظام دعم Crisp - دعم عملاء حي
// Crisp Chat Support System - Live Customer Support

class CrispChatIntegration {
  constructor(websiteId) {
    this.websiteId = websiteId;
    this.isInitialized = false;
    this.messageHistory = [];
    this.supportStatus = 'offline';
    this.init();
  }

  init() {
    this.loadCrispScript();
    this.setupEventListeners();
    this.checkSupportStatus();
  }

  loadCrispScript() {
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = this.websiteId;

    (function() {
      const d = document;
      const s = d.createElement('script');
      s.src = 'https://client.crisp.chat/l.js';
      s.async = 1;
      s.onload = () => {
        this.isInitialized = true;
        this.setupCrispEvents();
      };
      d.getElementsByTagName('head')[0].appendChild(s);
    }).call(this);
  }

  setupCrispEvents() {
    // Message received event
    if (window.$crisp) {
      window.$crisp.push(['on', 'message:received', (message) => {
        this.onMessageReceived(message);
      }]);

      // Message sent event
      window.$crisp.push(['on', 'message:sent', (message) => {
        this.onMessageSent(message);
      }]);

      // Chat closed event
      window.$crisp.push(['on', 'chat:closed', () => {
        this.onChatClosed();
      }]);

      // Chat opened event
      window.$crisp.push(['on', 'chat:opened', () => {
        this.onChatOpened();
      }]);
    }
  }

  setupEventListeners() {
    // Listen for user status changes
    document.addEventListener('userStatusChanged', (e) => {
      this.updateUserData(e.detail);
    });
  }

  updateUserData(userData) {
    if (!this.isInitialized) return;

    if (window.$crisp) {
      // Set user info
      if (userData.email) {
        window.$crisp.push(['set', 'user:email', userData.email]);
      }
      if (userData.name) {
        window.$crisp.push(['set', 'user:nickname', userData.name]);
      }
      if (userData.phone) {
        window.$crisp.push(['set', 'user:phone', userData.phone]);
      }

      // Set session data
      if (userData.userId) {
        window.$crisp.push(['set', 'session:identifier', userData.userId]);
      }

      // Set custom data
      window.$crisp.push(['set', 'session:data', {
        bookings: userData.bookings || 0,
        totalSpent: userData.totalSpent || 0,
        accountAge: userData.accountAge || 0,
        language: 'ar' // Arabic language
      }]);
    }
  }

  sendMessage(message, options = {}) {
    if (!this.isInitialized) {
      console.warn('م يتم تهيئة Crisp Chat بعد');
      return;
    }

    if (window.$crisp) {
      window.$crisp.push([
        'do',
        'message:send',
        'text',
        message,
        options
      ]);
    }
  }

  onMessageReceived(message) {
    this.messageHistory.push({
      type: 'received',
      content: message,
      timestamp: Date.now()
    });

    // Trigger custom event
    document.dispatchEvent(new CustomEvent('crispMessageReceived', {
      detail: message
    }));

    // Show notification
    if (Notification.permission === 'granted') {
      new Notification('رسالة جديدة', {
        body: message.substring(0, 50),
        icon: '/images/logo.png'
      });
    }
  }

  onMessageSent(message) {
    this.messageHistory.push({
      type: 'sent',
      content: message,
      timestamp: Date.now()
    });
  }

  onChatOpened() {
    document.dispatchEvent(new CustomEvent('crispChatOpened'));
    this.logActivity('chat_opened');
  }

  onChatClosed() {
    document.dispatchEvent(new CustomEvent('crispChatClosed'));
    this.logActivity('chat_closed');
  }

  checkSupportStatus() {
    // Check if support is online
    fetch('/api/support/status')
      .then(res => res.json())
      .then(data => {
        this.supportStatus = data.online ? 'online' : 'offline';
        this.updateStatusDisplay();
      })
      .catch(err => {
        console.error('خطأ في معرفة حالة الدعم:', err);
        this.supportStatus = 'offline';
      });
  }

  updateStatusDisplay() {
    const statusEl = document.querySelector('[data-crisp-status]');
    if (statusEl) {
      statusEl.textContent = this.supportStatus === 'online' 
        ? 'الدعم متاح' 
        : 'الدعم غير متاح';
      statusEl.className = this.supportStatus === 'online' ? 'status-online' : 'status-offline';
    }
  }

  logActivity(activity, metadata = {}) {
    fetch('/api/support/log-activity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        activity,
        metadata,
        timestamp: Date.now()
      })
    }).catch(err => console.error('فشل تسجيل النشاط:', err));
  }

  getMessageHistory() {
    return this.messageHistory;
  }

  clearMessageHistory() {
    this.messageHistory = [];
  }

  openChat() {
    if (window.$crisp) {
      window.$crisp.push(['do', 'chat:open']);
    }
  }

  closeChat() {
    if (window.$crisp) {
      window.$crisp.push(['do', 'chat:close']);
    }
  }

  setLanguage(lang = 'ar') {
    if (window.$crisp) {
      window.$crisp.push(['set', 'session:data', { language: lang }]);
    }
  }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.crispChat = new CrispChatIntegration('YOUR_WEBSITE_ID');
  });
} else {
  window.crispChat = new CrispChatIntegration('YOUR_WEBSITE_ID');
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = CrispChatIntegration;
}
