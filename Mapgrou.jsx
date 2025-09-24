import React, { useState, useEffect, useRef } from 'react';

// Données initiales des marqueurs
const marqueursInitiaux = [
  { id: 1, position: [48.8566, 2.3522], titre: "Tour Eiffel", description: "Monument emblématique de Paris", type: "monument" },
  { id: 2, position: [48.8606, 2.3376], titre: "Arc de Triomphe", description: "Monument historique parisien", type: "monument" },
  { id: 3, position: [48.8529, 2.3500], titre: "Notre-Dame", description: "Cathédrale gothique célèbre", type: "religieux" },
  { id: 4, position: [43.2965, 5.3698], titre: "Vieux-Port Marseille", description: "Port historique de Marseille", type: "port" },
  { id: 5, position: [45.7640, 4.8357], titre: "Basilique Lyon", description: "Basilique Notre-Dame de Fourvière", type: "religieux" },
  { id: 6, position: [47.2184, -1.5536], titre: "Château des Ducs", description: "Château des ducs de Bretagne à Nantes", type: "chateau" },
  { id: 7, position: [49.4944, 0.1079], titre: "Port du Havre", description: "Port maritime normand", type: "port" },
  { id: 8, position: [43.7102, 7.2620], titre: "Promenade des Anglais", description: "Célèbre promenade de Nice", type: "promenade" },
  { id: 9, position: [48.8738, 2.2950], titre: "Champs-Élysées", description: "Avenue célèbre de Paris", type: "avenue" },
  { id: 10, position: [48.8584, 2.2945], titre: "Trocadéro", description: "Place avec vue sur la Tour Eiffel", type: "place" },
  { id: 11, position: [48.8615, 2.3365], titre: "Place Vendôme", description: "Place historique parisienne", type: "place" },
  { id: 12, position: [45.4642, 9.1900], titre: "Duomo Milan", description: "Cathédrale gothique de Milan", type: "religieux" }
];

// Composant pour les statistiques
const CarteStat = ({ titre, valeur, icone, couleur }) => (
  <div className="col-md-3 mb-3">
    <div className="card stats-card h-100 border-0 shadow-sm">
      <div className="card-body text-center">
        <div className={`text-${couleur} mb-2`}>
          <i className={`fas ${icone} fa-2x`}></i>
        </div>
        <h5 className="card-title">{titre}</h5>
        <p className={`card-text fs-4 fw-bold text-${couleur}`}>{valeur}</p>
      </div>
    </div>
  </div>
);

// Composant pour le panneau de contrôle
const PanneauControle = ({ 
  rayonCluster, 
  setRayonCluster, 
  afficherCouverture, 
  setAfficherCouverture,
  eventailZoomMax,
  setEventailZoomMax,
  ajouterMarqueurs,
  reinitialiser,
  ajoutEnCours
}) => (
  <div className="col-lg-3 mb-4">
    <div className="card control-panel border-0 shadow-sm">
      <div className="card-header bg-transparent border-bottom-0">
        <h5 className="mb-0">
          <i className="fas fa-sliders-h me-2"></i>
          Contrôles
        </h5>
      </div>
      <div className="card-body">
        <div className="mb-3">
          <label className="form-label">Rayon de cluster</label>
          <input 
            type="range" 
            className="form-range" 
            min="20" 
            max="120" 
            value={rayonCluster}
            onChange={(e) => setRayonCluster(e.target.value)}
          />
          <small className="text-muted">Valeur: {rayonCluster}px</small>
        </div>
        
        <div className="mb-3">
          <div className="form-check form-switch">
            <input 
              className="form-check-input" 
              type="checkbox" 
              checked={afficherCouverture}
              onChange={(e) => setAfficherCouverture(e.target.checked)}
            />
            <label className="form-check-label">
              Afficher couverture au survol
            </label>
          </div>
        </div>
        
        <div className="mb-3">
          <div className="form-check form-switch">
            <input 
              className="form-check-input" 
              type="checkbox" 
              checked={eventailZoomMax}
              onChange={(e) => setEventailZoomMax(e.target.checked)}
            />
            <label className="form-check-label">
              Éventail au zoom max
            </label>
          </div>
        </div>
        
        <hr />
        
        <div className="d-grid gap-2">
          <button 
            className="btn btn-primary" 
            onClick={ajouterMarqueurs}
            disabled={ajoutEnCours}
          >
            <i className={`fas ${ajoutEnCours ? 'fa-check' : 'fa-plus'} me-2`}></i>
            {ajoutEnCours ? 'Ajouté !' : 'Ajouter 5 marqueurs'}
          </button>
          <button className="btn btn-outline-secondary" onClick={reinitialiser}>
            <i className="fas fa-undo me-2"></i>
            Réinitialiser
          </button>
        </div>
      </div>
    </div>
    
    {/* Légende */}
    <div className="card mt-3 border-0 shadow-sm">
      <div className="card-header bg-transparent border-bottom-0">
        <h6 className="mb-0">
          <i className="fas fa-info-circle me-2"></i>
          Légende des clusters
        </h6>
      </div>
      <div className="card-body pt-0">
        <div className="d-flex align-items-center mb-2">
          <div className="marker-cluster marker-cluster-small me-2 legend-cluster">
            <div><span>2-4</span></div>
          </div>
          <small>Petit cluster (2-4 marqueurs)</small>
        </div>
        <div className="d-flex align-items-center mb-2">
          <div className="marker-cluster marker-cluster-medium me-2 legend-cluster">
            <div><span>5-9</span></div>
          </div>
          <small>Cluster moyen (5-9 marqueurs)</small>
        </div>
        <div className="d-flex align-items-center">
          <div className="marker-cluster marker-cluster-large me-2 legend-cluster">
            <div><span>10+</span></div>
          </div>
          <small>Grand cluster (10+ marqueurs)</small>
        </div>
      </div>
    </div>
  </div>
);

export default function ReactLeafletBootstrapCluster() {
  const [marqueurs, setMarqueurs] = useState(marqueursInitiaux);
  const [rayonCluster, setRayonCluster] = useState(80);
  const [afficherCouverture, setAfficherCouverture] = useState(true);
  const [eventailZoomMax, setEventailZoomMax] = useState(true);
  const [niveauZoom, setNiveauZoom] = useState(6);
  const [ajoutEnCours, setAjoutEnCours] = useState(false);
  const carteRef = useRef();
  const markerClusterGroupRef = useRef();

  // Initialisation de la carte avec Leaflet vanilla
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Chargement dynamique des scripts Leaflet
      const loadLeafletScripts = async () => {
        // CSS Leaflet
        if (!document.querySelector('link[href*="leaflet.css"]')) {
          const leafletCSS = document.createElement('link');
          leafletCSS.rel = 'stylesheet';
          leafletCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css';
          document.head.appendChild(leafletCSS);
        }

        // CSS MarkerCluster
        if (!document.querySelector('link[href*="MarkerCluster.css"]')) {
          const clusterCSS = document.createElement('link');
          clusterCSS.rel = 'stylesheet';
          clusterCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.5.3/MarkerCluster.css';
          document.head.appendChild(clusterCSS);
          
          const clusterDefaultCSS = document.createElement('link');
          clusterDefaultCSS.rel = 'stylesheet';
          clusterDefaultCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.5.3/MarkerCluster.Default.css';
          document.head.appendChild(clusterDefaultCSS);
        }

        // Scripts Leaflet
        if (!window.L) {
          await new Promise((resolve) => {
            const leafletScript = document.createElement('script');
            leafletScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js';
            leafletScript.onload = resolve;
            document.head.appendChild(leafletScript);
          });
        }

        // Script MarkerCluster
        if (!window.L.markerClusterGroup) {
          await new Promise((resolve) => {
            const clusterScript = document.createElement('script');
            clusterScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.5.3/leaflet.markercluster.js';
            clusterScript.onload = resolve;
            document.head.appendChild(clusterScript);
          });
        }

        initialiserCarte();
      };

      loadLeafletScripts();
    }
  }, []);

  // Fonction pour initialiser la carte
  const initialiserCarte = () => {
    if (carteRef.current || !window.L) return;

    // Créer la carte
    const carte = window.L.map('leaflet-map').setView([46.6034, 1.8883], 6);
    carteRef.current = carte;

    // Ajouter la couche de tuiles
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributeurs'
    }).addTo(carte);

    // Créer le groupe de clusters
    const markerClusterGroup = window.L.markerClusterGroup({
      iconCreateFunction: function(cluster) {
        const childCount = cluster.getChildCount();
        let className = 'marker-cluster-small';
        
        if (childCount >= 10) {
          className = 'marker-cluster-large';
        } else if (childCount >= 5) {
          className = 'marker-cluster-medium';
        }

        return new window.L.DivIcon({
          html: '<div><span>' + childCount + '</span></div>',
          className: 'marker-cluster ' + className,
          iconSize: new window.L.Point(40, 40)
        });
      },
      maxClusterRadius: parseInt(rayonCluster),
      spiderfyOnMaxZoom: eventailZoomMax,
      showCoverageOnHover: afficherCouverture,
      zoomToBoundsOnClick: true
    });

    markerClusterGroupRef.current = markerClusterGroup;
    carte.addLayer(markerClusterGroup);

    // Ajouter les marqueurs initiaux
    ajouterMarqueursACarte(marqueursInitiaux);

    // Gestionnaire d'événements
    carte.on('zoomend', () => {
      setNiveauZoom(carte.getZoom());
    });
  };

  // Fonction pour ajouter des marqueurs à la carte
  const ajouterMarqueursACarte = (listeMarqueurs) => {
    if (!markerClusterGroupRef.current || !window.L) return;

    // Vider le groupe existant
    markerClusterGroupRef.current.clearLayers();

    // Ajouter tous les marqueurs
    listeMarqueurs.forEach(marqueur => {
      const couleurs = {
        monument: '#e74c3c',
        religieux: '#9b59b6',
        port: '#3498db',
        chateau: '#e67e22',
        promenade: '#2ecc71',
        avenue: '#f39c12',
        place: '#34495e'
      };

      const iconePersonnalisee = window.L.divIcon({
        html: `<i class="fas fa-map-marker-alt" style="color: ${couleurs[marqueur.type] || '#e74c3c'}; font-size: 20px;"></i>`,
        iconSize: [20, 20],
        className: 'custom-marker'
      });

      const marker = window.L.marker(marqueur.position, {
        icon: iconePersonnalisee
      });

      const popupContent = `
        <div class="p-2">
          <h6 class="fw-bold text-primary">${marqueur.titre}</h6>
          <p class="small mb-2">${marqueur.description}</p>
          <small class="text-muted">
            <i class="fas fa-map-pin me-1"></i>
            ${marqueur.position[0].toFixed(4)}, ${marqueur.position[1].toFixed(4)}
          </small>
          <br>
          <small class="badge bg-secondary mt-1">${marqueur.type}</small>
        </div>
      `;

      marker.bindPopup(popupContent);
      markerClusterGroupRef.current.addLayer(marker);
    });
  };

  // Mise à jour des options du cluster
  useEffect(() => {
    if (markerClusterGroupRef.current && carteRef.current) {
      // Recréer le groupe avec les nouvelles options
      carteRef.current.removeLayer(markerClusterGroupRef.current);

      const nouveauGroupe = window.L.markerClusterGroup({
        iconCreateFunction: markerClusterGroupRef.current.options.iconCreateFunction,
        maxClusterRadius: parseInt(rayonCluster),
        spiderfyOnMaxZoom: eventailZoomMax,
        showCoverageOnHover: afficherCouverture,
        zoomToBoundsOnClick: true
      });

      markerClusterGroupRef.current = nouveauGroupe;
      carteRef.current.addLayer(nouveauGroupe);
      ajouterMarqueursACarte(marqueurs);
    }
  }, [rayonCluster, afficherCouverture, eventailZoomMax]);

  // Mise à jour des marqueurs
  useEffect(() => {
    if (markerClusterGroupRef.current) {
      ajouterMarqueursACarte(marqueurs);
    }
  }, [marqueurs]);

  // Fonction pour ajouter des marqueurs aléatoires
  const ajouterMarqueursAleatoires = () => {
    const types = ['monument', 'religieux', 'port', 'chateau', 'promenade'];
    const nouveauxMarqueurs = [];
    
    for (let i = 0; i < 5; i++) {
      const nouveauMarqueur = {
        id: marqueurs.length + i + 1,
        position: [
          45 + (Math.random() - 0.5) * 10,
          2 + (Math.random() - 0.5) * 10
        ],
        titre: `Marqueur aléatoire ${marqueurs.length + i + 1}`,
        description: 'Marqueur généré automatiquement',
        type: types[Math.floor(Math.random() * types.length)]
      };
      nouveauxMarqueurs.push(nouveauMarqueur);
    }
    
    setMarqueurs([...marqueurs, ...nouveauxMarqueurs]);
    setAjoutEnCours(true);
    setTimeout(() => setAjoutEnCours(false), 1000);
  };

  // Fonction pour réinitialiser
  const reinitialiser = () => {
    setMarqueurs(marqueursInitiaux);
    setRayonCluster(80);
    setAfficherCouverture(true);
    setEventailZoomMax(true);
    
    if (carteRef.current) {
      carteRef.current.setView([46.6034, 1.8883], 6);
    }
  };

  return (
    <div className="container-fluid py-4" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* CDN Links */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" />
      
      {/* En-tête */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="info-card p-4 text-center text-white rounded">
            <h1 className="display-5 fw-bold mb-3">
              <i className="fas fa-map-marked-alt me-2"></i>
              React Leaflet MarkerClusterGroup
            </h1>
            <p className="lead mb-0">
              Démonstration interactive avec Bootstrap - Marqueurs regroupés automatiquement
            </p>
          </div>
        </div>
      </div>
      
      {/* Statistiques */}
      <div className="row mb-4">
        <CarteStat 
          titre="Total Marqueurs" 
          valeur={marqueurs.length} 
          icone="fa-map-pin" 
          couleur="primary" 
        />
        <CarteStat 
          titre="Clusters Actifs" 
          valeur={Math.max(1, Math.floor(marqueurs.length / (niveauZoom + 1)))} 
          icone="fa-layer-group" 
          couleur="success" 
        />
        <CarteStat 
          titre="Niveau Zoom" 
          valeur={niveauZoom} 
          icone="fa-search-plus" 
          couleur="info" 
        />
        <CarteStat 
          titre="Marqueurs Visibles" 
          valeur={niveauZoom > 8 ? marqueurs.length : `~${Math.floor(marqueurs.length / 2)}`} 
          icone="fa-eye" 
          couleur="warning" 
        />
      </div>
      
      <div className="row">
        {/* Panneau de contrôle */}
        <PanneauControle 
          rayonCluster={rayonCluster}
          setRayonCluster={setRayonCluster}
          afficherCouverture={afficherCouverture}
          setAfficherCouverture={setAfficherCouverture}
          eventailZoomMax={eventailZoomMax}
          setEventailZoomMax={setEventailZoomMax}
          ajouterMarqueurs={ajouterMarqueursAleatoires}
          reinitialiser={reinitialiser}
          ajoutEnCours={ajoutEnCours}
        />
        
        {/* Carte */}
        <div className="col-lg-9">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-0">
              <div id="leaflet-map" style={{ height: '500px', borderRadius: '0.375rem' }}></div>
            </div>
          </div>
          
          {/* Instructions */}
          <div className="alert alert-info mt-3" role="alert">
            <h6 className="alert-heading">
              <i className="fas fa-lightbulb me-2"></i>
              Instructions d'utilisation
            </h6>
            <ul className="mb-0 small">
              <li><strong>Zoom :</strong> Utilisez la molette ou les boutons +/- pour zoomer</li>
              <li><strong>Clusters :</strong> Cliquez sur un cluster pour zoomer sur les marqueurs</li>
              <li><strong>Marqueurs :</strong> Cliquez sur un marqueur pour voir ses informations</li>
              <li><strong>Contrôles :</strong> Ajustez les paramètres dans le panneau de gauche</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Styles CSS intégrés */}
      <style jsx>{`
        .info-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 0.5rem;
        }
        
        .stats-card {
          transition: transform 0.2s;
        }
        
        .stats-card:hover {
          transform: translateY(-2px);
        }
        
        .control-panel {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
        }
        
        .custom-marker {
          background: none;
          border: none;
        }
        
        .marker-cluster-small {
          background-color: rgba(181, 226, 140, 0.6);
        }
        .marker-cluster-small div {
          background-color: rgba(110, 204, 57, 0.6);
        }
        
        .marker-cluster-medium {
          background-color: rgba(241, 211, 87, 0.6);
        }
        .marker-cluster-medium div {
          background-color: rgba(240, 194, 12, 0.6);
        }
        
        .marker-cluster-large {
          background-color: rgba(253, 156, 115, 0.6);
        }
        .marker-cluster-large div {
          background-color: rgba(241, 128, 23, 0.6);
        }
        
        .marker-cluster {
          background-clip: padding-box;
          border-radius: 20px;
        }
        .marker-cluster div {
          width: 30px;
          height: 30px;
          margin-left: 5px;
          margin-top: 5px;
          text-align: center;
          border-radius: 15px;
          font: 12px "Helvetica Neue", Arial, Helvetica, sans-serif;
        }
        .marker-cluster span {
          line-height: 30px;
          color: #000;
          font-weight: bold;
        }
        
        .legend-cluster {
          width: 30px;
          height: 30px;
          border-radius: 15px;
        }
        .legend-cluster div {
          width: 20px;
          height: 20px;
          margin: 5px;
          border-radius: 10px;
          line-height: 20px;
          font-size: 10px;
        }
      `}</style>
    </div>
  );
}