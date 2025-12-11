// نظام التوصيات الذكية
// Intelligent Recommendations System

class RecommendationEngine {
  constructor() {
    this.userPreferences = {};
    this.viewHistory = [];
    this.purchaseHistory = [];
    this.maxHistoryItems = 50;
    this.init();
  }

  init() {
    this.loadUserData();
    this.setupEventListeners();
  }

  loadUserData() {
    // Load user preferences from localStorage
    const stored = localStorage.getItem('userPreferences');
    if (stored) {
      this.userPreferences = JSON.parse(stored);
    }

    const history = localStorage.getItem('viewHistory');
    if (history) {
      this.viewHistory = JSON.parse(history);
    }
  }

  setupEventListeners() {
    // Track property views
    document.addEventListener('propertyViewed', (e) => {
      this.trackPropertyView(e.detail);
    });

    // Track purchases
    document.addEventListener('propertyBooked', (e) => {
      this.trackPurchase(e.detail);
    });
  }

  trackPropertyView(property) {
    this.viewHistory.unshift({
      id: property.id,
      type: property.type,
      price: property.price,
      location: property.location,
      timestamp: Date.now()
    });

    // Keep only recent items
    if (this.viewHistory.length > this.maxHistoryItems) {
      this.viewHistory = this.viewHistory.slice(0, this.maxHistoryItems);
    }

    this.updatePreferences(property);
    localStorage.setItem('viewHistory', JSON.stringify(this.viewHistory));
  }

  trackPurchase(property) {
    this.purchaseHistory.push({
      id: property.id,
      type: property.type,
      price: property.price,
      timestamp: Date.now()
    });
    localStorage.setItem('purchaseHistory', JSON.stringify(this.purchaseHistory));
  }

  updatePreferences(property) {
    // Update price range preference
    if (!this.userPreferences.priceRange) {
      this.userPreferences.priceRange = { min: property.price, max: property.price };
    } else {
      this.userPreferences.priceRange.min = Math.min(this.userPreferences.priceRange.min, property.price);
      this.userPreferences.priceRange.max = Math.max(this.userPreferences.priceRange.max, property.price);
    }

    // Update type preferences
    if (!this.userPreferences.preferredTypes) {
      this.userPreferences.preferredTypes = {};
    }
    this.userPreferences.preferredTypes[property.type] = (this.userPreferences.preferredTypes[property.type] || 0) + 1;

    // Update location preferences
    if (!this.userPreferences.preferredLocations) {
      this.userPreferences.preferredLocations = {};
    }
    this.userPreferences.preferredLocations[property.location] = (this.userPreferences.preferredLocations[property.location] || 0) + 1;

    localStorage.setItem('userPreferences', JSON.stringify(this.userPreferences));
  }

  getRecommendations(allProperties, limit = 5) {
    if (this.viewHistory.length === 0) {
      return this.getPopularProperties(allProperties, limit);
    }

    const scored = allProperties.map(property => ({
      ...property,
      score: this.calculateRecommendationScore(property)
    }));

    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  calculateRecommendationScore(property) {
    let score = 0;

    // Score based on type preference
    if (this.userPreferences.preferredTypes && this.userPreferences.preferredTypes[property.type]) {
      score += this.userPreferences.preferredTypes[property.type] * 10;
    }

    // Score based on location preference
    if (this.userPreferences.preferredLocations && this.userPreferences.preferredLocations[property.location]) {
      score += this.userPreferences.preferredLocations[property.location] * 8;
    }

    // Score based on price range
    if (this.userPreferences.priceRange) {
      const { min, max } = this.userPreferences.priceRange;
      const avgPrice = (min + max) / 2;
      const priceDiff = Math.abs(property.price - avgPrice);
      const maxDiff = max - min;
      score += Math.max(0, 20 - (priceDiff / maxDiff) * 20);
    }

    // Penalize already viewed properties
    if (this.viewHistory.some(v => v.id === property.id)) {
      score -= 5;
    }

    // Boost recently added properties
    if (property.createdAt) {
      const daysOld = (Date.now() - new Date(property.createdAt).getTime()) / (1000 * 60 * 60 * 24);
      if (daysOld < 7) score += 15;
      if (daysOld < 3) score += 10;
    }

    return score;
  }

  getPopularProperties(allProperties, limit = 5) {
    return allProperties
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, limit);
  }

  getSimilarProperties(propertyId, allProperties, limit = 5) {
    const property = allProperties.find(p => p.id === propertyId);
    if (!property) return [];

    return allProperties
      .filter(p => p.id !== propertyId)
      .map(p => ({
        ...p,
        similarity: this.calculateSimilarity(property, p)
      }))
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, limit);
  }

  calculateSimilarity(prop1, prop2) {
    let similarity = 0;

    // Same type
    if (prop1.type === prop2.type) similarity += 30;

    // Same location
    if (prop1.location === prop2.location) similarity += 25;

    // Similar price (within 20%)
    const priceDiff = Math.abs(prop1.price - prop2.price);
    const avgPrice = (prop1.price + prop2.price) / 2;
    if (priceDiff / avgPrice < 0.2) similarity += 20;

    // Similar size
    if (prop1.area && prop2.area) {
      const areaDiff = Math.abs(prop1.area - prop2.area);
      if (areaDiff / Math.max(prop1.area, prop2.area) < 0.2) similarity += 15;
    }

    // Same amenities
    if (prop1.amenities && prop2.amenities) {
      const commonAmenities = prop1.amenities.filter(a => prop2.amenities.includes(a));
      similarity += commonAmenities.length * 5;
    }

    return similarity;
  }

  clearHistory() {
    this.viewHistory = [];
    this.purchaseHistory = [];
    this.userPreferences = {};
    localStorage.removeItem('viewHistory');
    localStorage.removeItem('purchaseHistory');
    localStorage.removeItem('userPreferences');
  }

  exportRecommendations() {
    return {
      preferences: this.userPreferences,
      viewHistory: this.viewHistory,
      purchaseHistory: this.purchaseHistory
    };
  }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.recommendationEngine = new RecommendationEngine();
  });
} else {
  window.recommendationEngine = new RecommendationEngine();
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = RecommendationEngine;
}
