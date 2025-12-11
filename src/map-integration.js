// نظام خريطة المشاريع - Mapbox Integration
// Projects Map System

class MapboxIntegration {
  constructor(containerId, accessToken) {
    this.containerId = containerId;
    this.accessToken = accessToken;
    this.map = null;
    this.markers = [];
    this.clusters = [];
    this.init();
  }

  init() {
    // Load Mapbox GL from CDN
    if (!window.mapboxgl) {
      this.loadMapboxLibrary();
    } else {
      this.createMap();
    }
  }

  loadMapboxLibrary() {
    const script = document.createElement('script');
    script.src = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js';
    script.onload = () => this.createMap();
    document.head.appendChild(script);

    const link = document.createElement('link');
    link.href = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }

  createMap() {
    if (!this.accessToken) {
      console.error('لم يتم تعيين Mapbox Access Token');
      return;
    }

    window.mapboxgl.accessToken = this.accessToken;
    this.map = new window.mapboxgl.Map({
      container: this.containerId,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [31.2357, 30.0444], // Cairo coordinates
      zoom: 11,
      pitch: 0,
      bearing: 0
    });

    this.map.on('load', () => {
      this.setupMapLayers();
      this.loadPropertiesData();
    });
  }

  setupMapLayers() {
    // Add clustering layers
    this.map.addSource('projects', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: []
      },
      cluster: true,
      clusterMaxZoom: 14,
      clusterRadius: 50
    });

    // Cluster layer
    this.map.addLayer({
      id: 'clusters',
      type: 'circle',
      source: 'projects',
      filter: ['has', 'point_count'],
      paint: {
        'circle-color': ['step', ['get', 'point_count'], '#51bbd6', 100, '#f1f075', 750, '#f28cb1'],
        'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40]
      }
    });

    // Unclustered point layer
    this.map.addLayer({
      id: 'unclustered-point',
      type: 'circle',
      source: 'projects',
      filter: ['!', ['has', 'point_count']],
      paint: {
        'circle-color': '#11b4da',
        'circle-radius': 8,
        'circle-stroke-width': 2,
        'circle-stroke-color': '#fff'
      }
    });

    // Cluster labels
    this.map.addLayer({
      id: 'cluster-count',
      type: 'symbol',
      source: 'projects',
      filter: ['has', 'point_count'],
      layout: {
        'text-field': ['get', 'point_count_abbreviated'],
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 12
      }
    });

    this.setupMapInteractions();
  }

  setupMapInteractions() {
    // Expand cluster on click
    this.map.on('click', 'clusters', (e) => {
      const features = this.map.querySourceFeatures('projects', {
        sourceLayer: 'projects'
      });
      const clusterId = e.features[0].properties.cluster_id;
      const zoom = this.map.getZoom();
      this.map.easeTo({
        zoom: zoom + 1,
        duration: 400
      });
    });

    // Show popup on unclustered point click
    this.map.on('click', 'unclustered-point', (e) => {
      const properties = e.features[0].properties;
      new window.mapboxgl.Popup({ closeButton: true, closeOnClick: true })
        .setLngLat(e.lngLat)
        .setHTML(this.createPopupHTML(properties))
        .addTo(this.map);
    });

    this.map.on('mouseenter', 'clusters', () => {
      this.map.getCanvas().style.cursor = 'pointer';
    });
    this.map.on('mouseleave', 'clusters', () => {
      this.map.getCanvas().style.cursor = '';
    });
  }

  loadPropertiesData() {
    fetch('/api/properties')
      .then(res => res.json())
      .then(data => {
        const features = data.map(property => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [property.longitude, property.latitude]
          },
          properties: {
            id: property.id,
            name: property.name,
            price: property.price,
            type: property.type,
            status: property.status
          }
        }));

        this.map.getSource('projects').setData({
          type: 'FeatureCollection',
          features: features
        });
      })
      .catch(err => console.error('خطأ في تحميل بيانات العقارات:', err));
  }

  createPopupHTML(properties) {
    return `
      <div style="direction: rtl; text-align: right;">
        <h3 style="margin: 0 0 10px 0;">${properties.name}</h3>
        <p><strong>السعر:</strong> ؋${new Intl.NumberFormat('ar-EG').format(properties.price)}</p>
        <p><strong>نوع:</strong> ${properties.type}</p>
        <p><strong>الحالة:</strong> ${properties.status}</p>
        <button class="view-details" data-id="${properties.id}" style="margin-top: 10px; padding: 5px 10px; background: #11b4da; color: white; border: none; border-radius: 4px; cursor: pointer;">
          عرض التفاصيل
        </button>
      </div>
    `;
  }

  filterByType(type) {
    if (type === 'all') {
      this.map.setFilter('unclustered-point', null);
    } else {
      this.map.setFilter('unclustered-point', ['==', ['get', 'type'], type]);
    }
  }

  search(query) {
    if (!query) {
      this.loadPropertiesData();
      return;
    }
    fetch(`/api/properties/search?q=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then(data => {
        const features = data.map(property => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [property.longitude, property.latitude]
          },
          properties: property
        }));
        this.map.getSource('projects').setData({
          type: 'FeatureCollection',
          features: features
        });
      });
  }
}

// Initialize map when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const mapContainer = document.getElementById('map-container');
    if (mapContainer) {
      window.mapboxIntegration = new MapboxIntegration(
        'map-container',
        'pk.eyJ1IjoibWFwYm94LWFyYWJpYyIsImEiOiJjbGwwMzc5MjAwMDAwMDAwMDAwMDAwMDAwIn0.XXXXXXXXXXXXXXXXX'
      );
    }
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MapboxIntegration;
}
