// ============================================================
// APP.JS - Core Application Logic
// ============================================================

// ============================================================
// CONFIGURATION
// ============================================================

// Login password (Change this to your secure password)
const CORRECT_PASSWORD = "territory2025";

// Plant configurations
const PLANTS = {
    kunigal: {
        name: 'Kunigal Plant',
        lat: 12.996663,
        lng: 76.982185,
        radius: 31,
        color: '#ff6b6b'
    },
    harohalli: {
        name: 'Harohalli Plant',
        lat: 12.6795383,
        lng: 77.4425475,
        radius: 31,
        color: '#4facfe'
    }
};

// Officer allocations
const KUNIGAL_ALLOCATION = {
    'Cluster1': { zone: 'NE', officer: 'Nagaraj P', mobile: '9901969518', status: 'assigned' },
    'Cluster2': { zone: 'NE', officer: 'Nagaraj P', mobile: '9901969518', status: 'assigned' },
    'Cluster3': { zone: 'SE', officer: 'Nagaraj P', mobile: '9901969518', status: 'assigned' },
    'Cluster4': { zone: 'SE', officer: 'Nagaraj P', mobile: '9901969518', status: 'assigned' },
    'Cluster5': { zone: 'Other', officer: 'Vacant', mobile: '', status: 'vacant' },
    'Cluster6': { zone: 'Other', officer: 'Vacant', mobile: '', status: 'vacant' },
    'Cluster7': { zone: 'Other', officer: 'Vacant', mobile: '', status: 'vacant' },
    'Cluster8': { zone: 'Other', officer: 'Vacant', mobile: '', status: 'vacant' }
};

const HAROHALLI_ALLOCATION = {
    'Cluster1': { officer: 'Khadeer ali', mobile: '9008436667', status: 'assigned' },
    'Cluster2': { officer: 'Khadeer ali', mobile: '9008436667', status: 'assigned' },
    'Cluster3': { officer: 'Khadeer ali', mobile: '9008436667', status: 'assigned' },
    'Cluster4': { officer: 'Khadeer ali', mobile: '9008436667', status: 'assigned' },
    'Cluster5': { officer: 'Srikantha B N', mobile: '9738258828', status: 'assigned' },
    'Cluster6': { officer: 'Srikantha B N', mobile: '9738258828', status: 'assigned' },
    'Cluster7': { officer: 'Srikantha B N', mobile: '9738258828', status: 'assigned' },
    'Cluster8': { officer: 'Srikantha B N', mobile: '9738258828', status: 'assigned' },
    'Cluster9': { officer: 'Rajshekhar J', mobile: '9019937913', status: 'assigned' },
    'Cluster10': { officer: 'Vinod Kumar KJ', mobile: '7483749862', status: 'assigned' },
    'Cluster11': { officer: 'Vacant', mobile: '', status: 'vacant' },
    'Cluster12': { officer: 'Vacant', mobile: '', status: 'vacant' },
    'Cluster13': { officer: 'Vacant', mobile: '', status: 'vacant' },
    'Cluster14': { officer: 'Vacant', mobile: '', status: 'vacant' }
};

// Current distributors (24 total)
const CURRENT_DISTRIBUTORS = [
    {name: 'ADHITHYA EDIFICE CONCEPTZ', lat: 12.9386, lng: 77.5441, tsm: 'Sunil Kumar DN', retailers: 195},
    {name: 'ADHITHYA ESSENTIALS', lat: 12.9616, lng: 77.5385, tsm: 'Vacant', retailers: 155},
    {name: 'B P AGENCY', lat: 12.9702, lng: 77.5619, tsm: 'Sunil Kumar DN', retailers: 55},
    {name: 'BHARATH CARE', lat: 13.0116, lng: 77.7263, tsm: 'Rajshekhar J', retailers: 19},
    {name: 'BHASKAR-GOWRIBIDNUR', lat: 13.522, lng: 77.2373, tsm: 'G R Harish', retailers: 38},
    {name: 'DINESH KUMAR', lat: 12.7981, lng: 77.6846, tsm: 'Vacant', retailers: 21},
    {name: 'ETERNAL TRADERS', lat: 13.0214, lng: 77.6585, tsm: 'K Mahendra Maiya', retailers: 149},
    {name: 'G S Enterprises', lat: 13.1391, lng: 77.4876, tsm: 'Yatheesh N', retailers: 216},
    {name: 'GARUDA ENTERPRISES', lat: 12.926, lng: 77.5293, tsm: 'Vinod Kumar KJ', retailers: 156},
    {name: 'HANVIK CREATIONS', lat: 12.9917, lng: 77.5073, tsm: 'Vacant', retailers: 38},
    {name: 'K B C DISTRIBUTORS', lat: 12.8452, lng: 77.6604, tsm: 'Vacant', retailers: 269},
    {name: 'P G C', lat: 12.9732, lng: 77.5286, tsm: 'Vinod Kumar KJ', retailers: 59},
    {name: 'S L V enterprises', lat: 12.9181, lng: 77.5442, tsm: 'Praveen Kumar S N', retailers: 22},
    {name: 'S S AGENCIES', lat: 13.0056, lng: 77.4982, tsm: 'Babu Reddy C S', retailers: 188},
    {name: 'SLN Enterprises', lat: 13.4356, lng: 77.7311, tsm: 'G R Harish', retailers: 51},
    {name: 'SBM Enterprises', lat: 12.8001, lng: 77.6092, tsm: 'Vacant', retailers: 190},
    {name: 'Shashank Enterprises', lat: 12.8826, lng: 77.6412, tsm: 'Vacant', retailers: 134},
    {name: 'SM ELIXIR', lat: 12.9352, lng: 77.5838, tsm: 'Vacant', retailers: 4},
    {name: 'SM INFRA ELECTRADE', lat: 12.9352, lng: 77.5838, tsm: 'Vacant', retailers: 6},
    {name: 'SRI MANJUNATHA ENT', lat: 13.3409, lng: 77.101, tsm: 'Nagaraj P', retailers: 22},
    {name: 'VIVAN WORLD WIDES', lat: 13.0285, lng: 77.5406, tsm: 'Chandra Shekhar AN', retailers: 123},
    {name: 'PMG ENTERPRISES', lat: 13.3956, lng: 77.8702, tsm: 'Vacant', retailers: 18},
    {name: 'JAI MARUTHI ENT', lat: 13.0056, lng: 77.5562, tsm: 'Vacant', retailers: 47},
    {name: 'BANGALORE DISTRIBUTORS', lat: 12.9716, lng: 77.5946, tsm: 'Vacant', retailers: 85}
];

// ============================================================
// GLOBAL VARIABLES
// ============================================================

let allPOIs = [];
let selectedCluster = null;
let map = null;
let userLat = null;
let userLng = null;
let userMarker = null;
let changes = [];

// ============================================================
// LOGIN SYSTEM
// ============================================================

function login(event) {
    event.preventDefault();
    
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    
    if (password === CORRECT_PASSWORD) {
        // Hide login screen
        document.getElementById('loginScreen').style.display = 'none';
        // Show app
        document.getElementById('app').style.display = 'block';
        // Initialize application
        initializeApp();
    } else {
        errorMessage.style.display = 'block';
        document.getElementById('password').value = '';
        document.getElementById('password').focus();
    }
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        document.getElementById('app').style.display = 'none';
        document.getElementById('loginScreen').style.display = 'flex';
        document.getElementById('password').value = '';
        document.getElementById('errorMessage').style.display = 'none';
    }
}

// ============================================================
// APPLICATION INITIALIZATION
// ============================================================

function initializeApp() {
    console.log('🚀 Initializing Territory Management System...');
    
    // Get user location
    getUserLocation();
    
    // Load POI data
    loadPOIData();
    
    // Initialize map
    initMap();
    
    // Render clusters
    renderClusters();
    
    // Update statistics
    updateStats();
    
    console.log('✅ Application initialized');
}

// ============================================================
// GEOLOCATION
// ============================================================

function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                userLat = position.coords.latitude;
                userLng = position.coords.longitude;
                
                document.getElementById('userLocation').innerHTML = 
                    `📍 Your Location: ${userLat.toFixed(4)}, ${userLng.toFixed(4)}`;
                document.getElementById('myLocationBtn').style.display = 'block';
                
                console.log('✅ User location detected:', userLat, userLng);
            },
            (error) => {
                console.log('⚠️ Location detection declined or failed');
                document.getElementById('userLocation').innerHTML = '📍 Location: Not available';
            }
        );
    } else {
        document.getElementById('userLocation').innerHTML = '📍 Location: Not supported';
    }
}

function showMyLocation() {
    if (userLat && userLng) {
        if (userMarker) {
            map.removeLayer(userMarker);
        }
        
        userMarker = L.marker([userLat, userLng], {
            icon: L.divIcon({
                html: '<div style="background: #ff0000; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 10px rgba(0,0,0,0.5);"></div>',
                iconSize: [20, 20]
            })
        }).addTo(map);
        
        userMarker.bindPopup('<b>📍 Your Location</b>').openPopup();
        map.setView([userLat, userLng], 13);
    } else {
        alert('❌ Location not available. Please allow location access and refresh the page.');
    }
}

// ============================================================
// DATA LOADING
// ============================================================

function loadPOIData() {
    // NOTE: In production, this should load from your MASTER Excel file
    // For GitHub, we'll provide instructions to add data
    
    console.log('📂 Loading POI data...');
    
    // Check if data is embedded in the page
    if (typeof POI_DATA !== 'undefined') {
        allPOIs = POI_DATA;
        console.log(`✅ Loaded ${allPOIs.length} POIs`);
        document.getElementById('headerSubtitle').textContent = 
            `Kunigal & Harohalli Plants | ${allPOIs.length.toLocaleString()} POIs Loaded`;
    } else {
        console.log('⚠️ No POI data found');
        document.getElementById('headerSubtitle').textContent = 
            'Kunigal & Harohalli Plants | No data loaded - See instructions';
        alert('⚠️ POI data not loaded.\n\nTo load your data:\n1. Export POI_DATA from Python script\n2. Add to data.js file\n3. Include <script src="data.js"></script> in index.html');
    }
    
    updateStats();
}

// ============================================================
// STATISTICS
// ============================================================

function updateStats() {
    const totalPOIs = allPOIs.length;
    
    const vacantCount = 
        Object.values(KUNIGAL_ALLOCATION).filter(c => c.status === 'vacant').length +
        Object.values(HAROHALLI_ALLOCATION).filter(c => c.status === 'vacant').length;
    
    const assignedOfficers = new Set([
        ...Object.values(KUNIGAL_ALLOCATION).filter(c => c.status === 'assigned').map(c => c.officer),
        ...Object.values(HAROHALLI_ALLOCATION).filter(c => c.status === 'assigned').map(c => c.officer)
    ]).size;
    
    document.getElementById('totalPOIs').textContent = totalPOIs.toLocaleString();
    document.getElementById('vacantClusters').textContent = vacantCount;
    document.getElementById('assignedOfficers').textContent = assignedOfficers;
}

// ============================================================
// MAP UTILITIES
// ============================================================

function showAllTerritory() {
    const centerLat = (PLANTS.kunigal.lat + PLANTS.harohalli.lat) / 2;
    const centerLng = (PLANTS.kunigal.lng + PLANTS.harohalli.lng) / 2;
    map.setView([centerLat, centerLng], 9);
}

// ============================================================
// EXPORT FUNCTIONS
// ============================================================

function exportAllData() {
    let csv = 'Plant,Cluster,Officer,Mobile,Status,POI_Count\n';
    
    // Kunigal
    for (let i = 1; i <= 8; i++) {
        const c = KUNIGAL_ALLOCATION[`Cluster${i}`];
        const count = allPOIs.filter(p => p.plant === 'Kunigal' && p.cluster === `Cluster${i}`).length;
        csv += `"Kunigal","Cluster${i}","${c.officer}","${c.mobile}","${c.status}",${count}\n`;
    }
    
    // Harohalli
    for (let i = 1; i <= 14; i++) {
        const c = HAROHALLI_ALLOCATION[`Cluster${i}`];
        const count = allPOIs.filter(p => p.plant === 'Harohalli' && p.cluster === `Cluster${i}`).length;
        csv += `"Harohalli","Cluster${i}","${c.officer}","${c.mobile}","${c.status}",${count}\n`;
    }
    
    downloadCSV(csv, `Territory_Summary_${new Date().toISOString().split('T')[0]}.csv`);
    alert('✅ Exported territory allocation summary');
}

function exportClusterData() {
    if (!selectedCluster) {
        alert('❌ No cluster selected');
        return;
    }
    
    const { plant, clusterId } = selectedCluster;
    const pois = allPOIs.filter(p => p.plant === plant && p.cluster === clusterId);
    const alloc = plant === 'Kunigal' ? KUNIGAL_ALLOCATION[clusterId] : HAROHALLI_ALLOCATION[clusterId];
    
    let csv = 'Plant,Cluster,Officer,Mobile,POI_Name,Category,Phone,Address,Latitude,Longitude,Distance_KM,Google_Maps_Link\n';
    
    pois.forEach(p => {
        const link = `https://www.google.com/maps/search/?api=1&query=${p.latitude},${p.longitude}`;
        csv += `"${plant}","${clusterId}","${alloc.officer}","${alloc.mobile}","${p.name || ''}","${p.business_category || ''}","${p.phone_number || ''}","${p.address || ''}",${p.latitude},${p.longitude},${p.distance_from_plant_km || ''},"${link}"\n`;
    });
    
    downloadCSV(csv, `${plant}_${clusterId}_POIs_${new Date().toISOString().split('T')[0]}.csv`);
    alert(`✅ Exported ${pois.length} POIs from ${plant} ${clusterId}`);
}

function exportChanges() {
    if (changes.length === 0) {
        alert('ℹ️ No changes made yet');
        return;
    }
    
    let csv = 'Timestamp,Plant,Cluster,Action,Officer_Name,Officer_Mobile,Target\n';
    
    changes.forEach(change => {
        csv += `"${change.timestamp}","${change.plant}","${change.cluster}","${change.action}","${change.officer}","${change.mobile}","${change.target || ''}"\n`;
    });
    
    downloadCSV(csv, `Territory_Changes_${new Date().toISOString().split('T')[0]}.csv`);
    alert(`✅ Exported ${changes.length} changes`);
}

function downloadCSV(content, filename) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// ============================================================
// UTILITY FUNCTIONS
// ============================================================

function formatNumber(num) {
    if (!num) return '0';
    return parseInt(num).toLocaleString('en-IN');
}

console.log('✅ app.js loaded');

