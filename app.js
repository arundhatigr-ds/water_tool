// ============================================================
// WATER BUSINESS TERRITORY MANAGEMENT SYSTEM - MAIN APP
// ============================================================

// Configuration
const GITHUB_CONFIG = {
    username: 'arundhatigr-ds',
    repo: 'water_tool',
    branch: 'main',
    dataFile: 'MASTER_Territory_Allocation_Kunigal_Harohalli.csv'
};

// Construct the GitHub raw URL
const POI_CSV_URL = `https://raw.githubusercontent.com/${GITHUB_CONFIG.username}/${GITHUB_CONFIG.repo}/${GITHUB_CONFIG.branch}/${GITHUB_CONFIG.dataFile}`;

// User authentication
const VALID_USERS = {
    'admin': 'admin2024!',
    'manager': 'manager123',
    'soumen': 'soumen123',
    'client': 'client123',
    'test': 'test2024!'
};

const SESSION_TIMEOUT = 120; // minutes

// Plant locations with updated coordinates
const plants = {
    kunigal: {
        name: 'Kunigal Plant',
        lat: 12.996663,
        lng: 76.982185,
        radius_km: 50,
        region: 'Kunigal Region'
    },
    harohalli: {
        name: 'Harohalli Plant',
        lat: 12.6795383,
        lng: 77.4425475,
        radius_km: 31,
        region: 'Harohalli-Bangalore Region'
    }
};

// Distributor data
const distributorsData = [
    {name: 'ADHITHYA EDIFICE CONCEPTZ', city: 'Bangalore', retailers: 195, lat: 12.9386, lng: 77.5441, target: 1000000, sales: 115715, tsm: 'Sunil Kumar DN', classification: 'Distributor'},
    {name: 'ADHITHYA ESSENTIALS', city: 'Bangalore', retailers: 155, lat: 12.9616, lng: 77.5385, target: 0, sales: 0, tsm: 'Vacant', classification: 'Distributor'},
    {name: 'B P AGENCY', city: 'Bengaluru', retailers: 55, lat: 12.9702, lng: 77.5619, target: 0, sales: 0, tsm: 'Sunil Kumar DN', classification: 'Distributor'},
    {name: 'BHARATH CARE', city: 'Bengaluru', retailers: 19, lat: 13.0116, lng: 77.7263, target: 0, sales: 0, tsm: 'Rajshekhar J', classification: 'Distributor'},
    {name: 'BHASKAR-GOWRIBIDNUR', city: 'Tumkur', retailers: 38, lat: 13.522, lng: 77.2373, target: 0, sales: 0, tsm: 'G R Harish', classification: 'Distributor'},
    {name: 'DINESH KUMAR', city: 'Bengaluru', retailers: 21, lat: 12.7981, lng: 77.6846, target: 0, sales: 0, tsm: 'Vacant', classification: 'Distributor'},
    {name: 'ETERNAL TRADERS', city: 'Bengaluru', retailers: 149, lat: 13.0214, lng: 77.6585, target: 0, sales: 0, tsm: 'K Mahendra Maiya', classification: 'Distributor'},
    {name: 'G S Enterprises', city: 'Bangalore', retailers: 216, lat: 13.1391, lng: 77.4876, target: 0, sales: 0, tsm: 'Yatheesh N', classification: 'Distributor'},
    {name: 'GARUDA ENTERPRISES', city: 'Bangalore', retailers: 156, lat: 12.926, lng: 77.5293, target: 0, sales: 0, tsm: 'Vinod Kumar KJ', classification: 'Distributor'},
    {name: 'HANVIK CREATIONS', city: 'Bangalore', retailers: 38, lat: 12.9917, lng: 77.5073, target: 0, sales: 0, tsm: 'Vacant', classification: 'Distributor'},
    {name: 'K B C DISTRIBUTORS', city: 'Bengaluru', retailers: 269, lat: 12.8452, lng: 77.6604, target: 0, sales: 0, tsm: 'Vacant', classification: 'Distributor'},
    {name: 'P G C', city: 'Bangalore', retailers: 59, lat: 12.9732, lng: 77.5286, target: 0, sales: 0, tsm: 'Vinod Kumar KJ', classification: 'Distributor'},
    {name: 'S L V enterprises', city: 'Bengaluru', retailers: 22, lat: 12.9181, lng: 77.5442, target: 0, sales: 0, tsm: 'Praveen Kumar S N', classification: 'Distributor'},
    {name: 'S S AGENCIES', city: 'Bangalore', retailers: 188, lat: 13.0056, lng: 77.4982, target: 0, sales: 0, tsm: 'Babu Reddy C S', classification: 'Distributor'},
    {name: 'SLN Enterprises', city: 'Chikkaballapur', retailers: 51, lat: 13.4356, lng: 77.7311, target: 0, sales: 0, tsm: 'G R Harish', classification: 'Distributor'},
    {name: 'SBM Enterprises', city: 'Bengaluru', retailers: 190, lat: 12.8001, lng: 77.6092, target: 0, sales: 0, tsm: 'Vacant', classification: 'Distributor'},
    {name: 'Shashank Enterprises', city: 'Bengaluru', retailers: 134, lat: 12.8826, lng: 77.6412, target: 0, sales: 0, tsm: 'Vacant', classification: 'Distributor'},
    {name: 'SM ELIXIR', city: 'Bangalore', retailers: 4, lat: 12.9352, lng: 77.5838, target: 0, sales: 0, tsm: 'Vacant', classification: 'Distributor'},
    {name: 'SM INFRA ELECTRADE', city: 'Bangalore', retailers: 6, lat: 12.9352, lng: 77.5838, target: 0, sales: 0, tsm: 'Vacant', classification: 'Distributor'},
    {name: 'SRI MANJUNATHA ENT', city: 'Tumkur', retailers: 22, lat: 13.3409, lng: 77.101, target: 0, sales: 0, tsm: 'Nagaraj P', classification: 'Distributor'},
    {name: 'VIVAN WORLD WIDES', city: 'Bangalore', retailers: 123, lat: 13.0285, lng: 77.5406, target: 0, sales: 0, tsm: 'Chandra Shekhar AN', classification: 'Distributor'},
    {name: 'PMG ENTERPRISES', city: 'Kolar', retailers: 18, lat: 13.3956, lng: 77.8702, target: 0, sales: 0, tsm: 'Vacant', classification: 'Distributor'},
    {name: 'JAI MARUTHI ENT', city: 'Bangalore', retailers: 47, lat: 13.0056, lng: 77.5562, target: 0, sales: 0, tsm: 'Vacant', classification: 'Distributor'},
    {name: 'BANGALORE DISTRIBUTORS', city: 'Bangalore', retailers: 85, lat: 12.9716, lng: 77.5946, target: 0, sales: 0, tsm: 'Vacant', classification: 'Distributor'}
];

// Global variables
let map, currentUser;
let pois = [], territories = [];
let plantMarkers = [], coverageCircles = [], distributorMarkers = [], poiMarkers = [];
let currentActiveTab = 'overview';
let territoryColorMode = false;
let clusterColors = {};
let currentPlantRadius = 30; // Default radius in km
let layerVisibility = {
    plants: true,
    distributors: true,
    pois: true,
    coverage: true
};

// Color palette for clusters
const colorPalette = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
    '#F7DC6F', '#BB8FCE', '#85C1E9', '#F8B500', '#6C5CE7',
    '#A29BFE', '#FD79A8', '#FDCB6E', '#6C5B7B', '#C06C84'
];

// ============================================================
// AUTHENTICATION FUNCTIONS
// ============================================================

function handleLogin() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    
    if (VALID_USERS[username] && VALID_USERS[username] === password) {
        currentUser = username;
        
        // Store session
        sessionStorage.setItem('user', username);
        sessionStorage.setItem('loginTime', Date.now());
        
        // Hide login, show app
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('appContainer').style.display = 'block';
        
        // Initialize app
        initializeApp();
    } else {
        const errorMsg = document.getElementById('errorMessage');
        errorMsg.textContent = 'Invalid username or password!';
        errorMsg.style.display = 'block';
        
        setTimeout(() => {
            errorMsg.style.display = 'none';
        }, 3000);
    }
}

function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        sessionStorage.clear();
        location.reload();
    }
}

function checkSession() {
    const user = sessionStorage.getItem('user');
    const loginTime = sessionStorage.getItem('loginTime');
    
    if (user && loginTime) {
        const elapsed = (Date.now() - parseInt(loginTime)) / 1000 / 60;
        if (elapsed < SESSION_TIMEOUT) {
            currentUser = user;
            document.getElementById('loginScreen').style.display = 'none';
            document.getElementById('appContainer').style.display = 'block';
            initializeApp();
        } else {
            sessionStorage.clear();
            alert('Session expired. Please login again.');
        }
    }
}

// ============================================================
// APPLICATION INITIALIZATION
// ============================================================

function initializeApp() {
    // Update header
    document.getElementById('userDisplay').textContent = `👤 ${currentUser}`;
    document.getElementById('dateDisplay').textContent = new Date().toLocaleDateString();
    
    // Initialize map
    initializeMap();
    
    // Load data
    loadPOIData();
    loadDistributors();
    
    // Initialize filters
    initializeFilters();
    
    // Update statistics
    updateOverviewStats();
}

function initializeMap() {
    // Create map centered between the two plants
    const centerLat = (plants.kunigal.lat + plants.harohalli.lat) / 2;
    const centerLng = (plants.kunigal.lng + plants.harohalli.lng) / 2;
    
    map = L.map('map').setView([centerLat, centerLng], 10);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Add plant markers
    addPlantMarkers();
}

function addPlantMarkers() {
    // Clear existing plant markers and circles
    plantMarkers.forEach(marker => map.removeLayer(marker));
    coverageCircles.forEach(circle => map.removeLayer(circle));
    plantMarkers = [];
    coverageCircles = [];
    
    Object.values(plants).forEach(plant => {
        // Add plant marker
        const marker = L.marker([plant.lat, plant.lng], {
            icon: L.divIcon({
                className: 'custom-div-icon',
                html: `<div style="background: #667eea; color: white; padding: 8px 12px; 
                       border-radius: 20px; font-weight: bold; white-space: nowrap; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                       🏭 ${plant.name}</div>`,
                iconSize: [150, 30],
                iconAnchor: [75, 15]
            })
        }).addTo(map);
        
        marker.bindPopup(`
            <strong>${plant.name}</strong><br>
            Region: ${plant.region}<br>
            Coverage: ${currentPlantRadius} km<br>
            <button onclick="drawCustomRadius('${plant.name}', ${plant.lat}, ${plant.lng})" 
                    style="margin-top: 5px; padding: 5px 10px; background: #667eea; color: white; 
                           border: none; border-radius: 4px; cursor: pointer;">
                Draw Custom Radius
            </button>
        `);
        
        plantMarkers.push(marker);
        
        // Add coverage circle with current radius
        const circle = L.circle([plant.lat, plant.lng], {
            color: '#667eea',
            fillColor: '#667eea',
            fillOpacity: 0.1,
            radius: currentPlantRadius * 1000,
            weight: 2
        }).addTo(map);
        
        coverageCircles.push(circle);
    });
}

// ============================================================
// DATA LOADING FUNCTIONS
// ============================================================

async function loadPOIData() {
    showLoading(true);
    
    try {
        const response = await fetch(POI_CSV_URL);
        const csvText = await response.text();
        pois = parseCSV(csvText);
        
        console.log(`Loaded ${pois.length} POIs`);
        
        // Update UI
        updatePOIMarkers();
        updateOverviewStats();
        initializeFilters();
        
    } catch (error) {
        console.error('Error loading POI data:', error);
        alert('Failed to load POI data. Using sample data.');
        
        // Use sample data for demo
        loadSamplePOIs();
    } finally {
        showLoading(false);
    }
}

function loadSamplePOIs() {
    // Sample POI data structure matching the new format
    pois = [
        {
            name: 'Sample Store 1',
            channel: 'department_store',
            business_category: 'Retail',
            distributor_type: 'Retailer',
            is_distributor: 'No',
            distributor_potential: 'High',
            is_chain: 'No',
            address: 'Sample Address 1',
            latitude: 12.7,
            longitude: 77.45,
            phone_number: '9999999999',
            distance_from_plant_km: 5,
            priority_score: 15,
            estimated_monthly_water_liters: 5000,
            plant: 'Harohalli',
            cluster: 'Cluster1',
            sales_officer: 'John Doe',
            officer_mobile: '9008436667'
        },
        // Add more sample POIs as needed
    ];
}

function parseCSV(csvText) {
    const lines = csvText.split('\n');
    const headers = parseCSVLine(lines[0]);
    const data = [];
    
    for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim()) {
            const values = parseCSVLine(lines[i]);
            const obj = {};
            
            headers.forEach((header, index) => {
                obj[header.trim()] = values[index] ? values[index].trim() : '';
            });
            
            // Convert numeric fields
            if (obj.latitude) obj.latitude = parseFloat(obj.latitude);
            if (obj.longitude) obj.longitude = parseFloat(obj.longitude);
            if (obj.distance_from_plant_km) obj.distance_from_plant_km = parseFloat(obj.distance_from_plant_km);
            if (obj.priority_score) obj.priority_score = parseFloat(obj.priority_score);
            if (obj.estimated_monthly_water_liters) obj.estimated_monthly_water_liters = parseFloat(obj.estimated_monthly_water_liters);
            
            data.push(obj);
        }
    }
    
    return data;
}

function parseCSVLine(line, delimiter = ',') {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === delimiter && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    
    result.push(current.trim());
    return result;
}

function loadDistributors() {
    distributorsData.forEach(dist => {
        // Create a circle marker for distributor (point style)
        const marker = L.circleMarker([dist.lat, dist.lng], {
            radius: 8,
            fillColor: '#28a745',
            color: '#fff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8
        }).addTo(map);
        
        marker.bindPopup(`
            <strong>${dist.name}</strong><br>
            City: ${dist.city}<br>
            Retailers: ${dist.retailers}<br>
            TSM: ${dist.tsm}
        `);
        
        distributorMarkers.push(marker);
    });
    
    updateDistributorsList();
}

// ============================================================
// MAP UPDATE FUNCTIONS
// ============================================================

function updatePOIMarkers() {
    // Clear existing POI markers
    poiMarkers.forEach(marker => map.removeLayer(marker));
    poiMarkers = [];
    
    // Add markers for POIs
    pois.forEach(poi => {
        if (poi.latitude && poi.longitude) {
            const color = getPOIColor(poi);
            
            const marker = L.circleMarker([poi.latitude, poi.longitude], {
                radius: 6,
                fillColor: color,
                color: '#333',
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            }).addTo(map);
            
            // Create popup with Google Maps link and phone
            let popupContent = `
                <strong>${poi.name || 'Unknown POI'}</strong><br>
                Channel: ${poi.channel || 'N/A'}<br>
                Category: ${poi.business_category || 'N/A'}<br>
                Type: ${poi.distributor_type || 'N/A'}<br>
                Potential: ${poi.distributor_potential || 'N/A'}<br>`;
            
            // Add phone number if available
            if (poi.phone_number && poi.phone_number !== 'Not Available') {
                popupContent += `📞 Phone: <a href="tel:${poi.phone_number}">${poi.phone_number}</a><br>`;
            }
            
            popupContent += `Distance: ${poi.distance_from_plant_km || 0} km<br>
                Plant: ${poi.plant || 'N/A'}<br>
                Cluster: ${poi.cluster || 'N/A'}<br>
                Officer: ${poi.sales_officer || 'Vacant'}<br>`;
            
            // Add Google Maps link if available
            if (poi.google_maps_url && poi.google_maps_url !== 'Not Available') {
                popupContent += `<br><a href="${poi.google_maps_url}" target="_blank" 
                    style="display: inline-block; margin-top: 5px; padding: 5px 10px; 
                           background: #4285f4; color: white; text-decoration: none; 
                           border-radius: 4px; font-size: 12px;">
                    🗺️ Open in Google Maps
                </a>`;
            }
            
            marker.bindPopup(popupContent);
            
            // Show POI only if layer is visible
            if (layerVisibility.pois) {
                marker.addTo(map);
            }
            
            poiMarkers.push(marker);
        }
    });
}

function getPOIColor(poi) {
    if (territoryColorMode && poi.cluster) {
        // Use cluster colors
        if (!clusterColors[poi.cluster]) {
            clusterColors[poi.cluster] = colorPalette[Object.keys(clusterColors).length % colorPalette.length];
        }
        return clusterColors[poi.cluster];
    }
    
    // Use potential-based colors with better visibility
    switch (poi.distributor_potential) {
        case 'Very High': return '#ff0000';  // Red
        case 'High': return '#ff9800';       // Orange
        case 'Medium': return '#17a2b8';     // Cyan
        case 'Low': return '#6c757d';        // Gray
        default: return '#999999';           // Light Gray
    }
}

// ============================================================
// FILTER FUNCTIONS
// ============================================================

function initializeFilters() {
    // Get unique values for filters
    const categories = [...new Set(pois.map(p => p.business_category))].filter(Boolean).sort();
    const channels = [...new Set(pois.map(p => p.channel))].filter(Boolean).sort();
    const clusters = [...new Set(pois.map(p => p.cluster))].filter(Boolean).sort();
    const officers = [...new Set(pois.map(p => p.sales_officer))].filter(p => p && p !== 'Vacant').sort();
    const tsms = [...new Set(distributorsData.map(d => d.tsm))].filter(Boolean).sort();
    const cities = [...new Set(distributorsData.map(d => d.city))].filter(Boolean).sort();
    
    // Populate business category filter (primary)
    const categoryFilter = document.getElementById('businessCategoryFilter');
    if (categoryFilter) {
        categoryFilter.innerHTML = '<option value="all">All Categories</option>';
        categories.forEach(cat => {
            categoryFilter.innerHTML += `<option value="${cat}">${cat}</option>`;
        });
    }
    
    // Populate channel filter (will be updated based on category)
    const channelFilter = document.getElementById('channelFilter');
    if (channelFilter) {
        channelFilter.innerHTML = '<option value="all">All Channels</option>';
        channels.forEach(channel => {
            channelFilter.innerHTML += `<option value="${channel}">${channel}</option>`;
        });
    }
    
    // Territory tab filters
    const territoryBusinessCategory = document.getElementById('territoryBusinessCategory');
    if (territoryBusinessCategory) {
        territoryBusinessCategory.innerHTML = '<option value="all">All Categories</option>';
        categories.forEach(cat => {
            territoryBusinessCategory.innerHTML += `<option value="${cat}">${cat}</option>`;
        });
    }
    
    const territoryOfficer = document.getElementById('territoryOfficer');
    if (territoryOfficer) {
        territoryOfficer.innerHTML = '<option value="all">All Officers</option>';
        officers.forEach(officer => {
            territoryOfficer.innerHTML += `<option value="${officer}">${officer}</option>`;
        });
    }
    
    // Populate cluster filter
    const clusterFilter = document.getElementById('clusterFilter');
    if (clusterFilter) {
        clusterFilter.innerHTML = '<option value="all">All Clusters</option>';
        clusters.forEach(cluster => {
            clusterFilter.innerHTML += `<option value="${cluster}">${cluster}</option>`;
        });
    }
    
    // Populate officer filter
    const officerFilter = document.getElementById('officerFilter');
    if (officerFilter) {
        officerFilter.innerHTML = '<option value="all">All Officers</option>';
        officers.forEach(officer => {
            officerFilter.innerHTML += `<option value="${officer}">${officer}</option>`;
        });
    }
    
    // Populate TSM filter
    const tsmFilter = document.getElementById('tsmFilter');
    if (tsmFilter) {
        tsmFilter.innerHTML = '<option value="all">All TSMs</option>';
        tsms.forEach(tsm => {
            tsmFilter.innerHTML += `<option value="${tsm}">${tsm}</option>`;
        });
    }
    
    // Populate city filter
    const cityFilter = document.getElementById('cityFilter');
    if (cityFilter) {
        cityFilter.innerHTML = '<option value="all">All Cities</option>';
        cities.forEach(city => {
            cityFilter.innerHTML += `<option value="${city}">${city}</option>`;
        });
    }
}

// Update channel filter based on selected category
function updateChannelFilter() {
    const selectedCategory = document.getElementById('businessCategoryFilter').value;
    const channelFilter = document.getElementById('channelFilter');
    
    if (!channelFilter) return;
    
    // Get channels for selected category
    let channels;
    if (selectedCategory === 'all') {
        channels = [...new Set(pois.map(p => p.channel))].filter(Boolean).sort();
    } else {
        channels = [...new Set(
            pois.filter(p => p.business_category === selectedCategory)
                .map(p => p.channel)
        )].filter(Boolean).sort();
    }
    
    // Update channel dropdown
    channelFilter.innerHTML = '<option value="all">All Channels</option>';
    channels.forEach(channel => {
        channelFilter.innerHTML += `<option value="${channel}">${channel}</option>`;
    });
    
    // Apply filters
    applyExpansionFilters();
}

// Update territory channel filter based on category
function updateTerritoryChannelFilter() {
    const selectedCategory = document.getElementById('territoryBusinessCategory').value;
    const channelFilter = document.getElementById('territoryChannel');
    
    if (!channelFilter) return;
    
    // Get channels for selected category
    let channels;
    if (selectedCategory === 'all') {
        channels = [...new Set(pois.map(p => p.channel))].filter(Boolean).sort();
    } else {
        channels = [...new Set(
            pois.filter(p => p.business_category === selectedCategory)
                .map(p => p.channel)
        )].filter(Boolean).sort();
    }
    
    // Update channel dropdown
    channelFilter.innerHTML = '<option value="all">All Channels</option>';
    channels.forEach(channel => {
        channelFilter.innerHTML += `<option value="${channel}">${channel}</option>`;
    });
    
    // Apply filters
    applyTerritoryFilters();
}

// Apply territory filters
function applyTerritoryFilters() {
    const category = document.getElementById('territoryBusinessCategory').value;
    const channel = document.getElementById('territoryChannel').value;
    const officer = document.getElementById('territoryOfficer').value;
    
    // Filter POIs on map
    let filtered = pois.filter(poi => {
        if (category !== 'all' && poi.business_category !== category) return false;
        if (channel !== 'all' && poi.channel !== channel) return false;
        if (officer !== 'all' && poi.sales_officer !== officer) return false;
        return true;
    });
    
    // Update markers visibility
    poiMarkers.forEach((marker, index) => {
        if (filtered.includes(pois[index])) {
            marker.setStyle({ fillOpacity: 0.8, opacity: 1 });
        } else {
            marker.setStyle({ fillOpacity: 0.1, opacity: 0.3 });
        }
    });
    
    // Update stats
    updateTerritoryStats(filtered);
}

// Export filtered territory data
function exportFilteredTerritoryData() {
    const category = document.getElementById('territoryBusinessCategory').value;
    const channel = document.getElementById('territoryChannel').value;
    const officer = document.getElementById('territoryOfficer').value;
    
    // Filter POIs
    let filtered = pois.filter(poi => {
        if (category !== 'all' && poi.business_category !== category) return false;
        if (channel !== 'all' && poi.channel !== channel) return false;
        if (officer !== 'all' && poi.sales_officer !== officer) return false;
        return true;
    });
    
    if (filtered.length === 0) {
        alert('No data to export with current filters!');
        return;
    }
    
    let csv = 'Name,Channel,Category,Type,Potential,Distance,Plant,Cluster,Officer,Phone,Address,Latitude,Longitude\n';
    
    filtered.forEach(poi => {
        csv += `"${poi.name || ''}","${poi.channel || ''}","${poi.business_category || ''}","${poi.distributor_type || ''}","${poi.distributor_potential || ''}","${poi.distance_from_plant_km || ''}","${poi.plant || ''}","${poi.cluster || ''}","${poi.sales_officer || ''}","${poi.phone_number || ''}","${poi.address || ''}",${poi.latitude || 0},${poi.longitude || 0}\n`;
    });
    
    const filename = `territory_filtered_${category}_${channel}_${new Date().toISOString().split('T')[0]}.csv`;
    downloadCSV(csv, filename);
    alert(`✅ Exported ${filtered.length} filtered POIs!`);
}

// Update territory stats
function updateTerritoryStats(filtered) {
    const stats = document.getElementById('territoryDrawInfo');
    if (stats) {
        stats.innerHTML = `<p style="font-size: 12px; color: #666;">
            Filtered POIs: ${filtered.length} | 
            Total Potential: ${formatNumber(Math.round(filtered.reduce((sum, p) => sum + (p.estimated_monthly_water_liters || 0), 0)))} L
        </p>`;
        stats.style.display = 'block';
    }
}

// Update officer filters dynamically
function updateOfficerFilters() {
    const officers = [...new Set(pois.map(p => p.sales_officer))].filter(o => o && o !== 'Vacant' && o !== '').sort();
    
    // Update territory officer filter
    const territoryOfficer = document.getElementById('territoryOfficer');
    if (territoryOfficer) {
        const currentValue = territoryOfficer.value;
        territoryOfficer.innerHTML = '<option value="all">All Officers</option>';
        officers.forEach(officer => {
            territoryOfficer.innerHTML += `<option value="${officer}">${officer}</option>`;
        });
        territoryOfficer.value = currentValue;
    }
    
    // Update allocation officer filter
    const officerFilter = document.getElementById('officerFilter');
    if (officerFilter) {
        const currentValue = officerFilter.value;
        officerFilter.innerHTML = '<option value="all">All Officers</option>';
        officers.forEach(officer => {
            officerFilter.innerHTML += `<option value="${officer}">${officer}</option>`;
        });
        officerFilter.value = currentValue;
    }
}

function applyExpansionFilters() {
    const category = document.getElementById('businessCategoryFilter').value;
    const channel = document.getElementById('channelFilter').value;
    const type = document.getElementById('distributorTypeFilter').value;
    const potential = document.getElementById('potentialFilter').value;
    const distance = document.getElementById('distanceFilter').value;
    
    // Filter POIs
    let filtered = pois.filter(poi => {
        if (category !== 'all' && poi.business_category !== category) return false;
        if (channel !== 'all' && poi.channel !== channel) return false;
        if (type !== 'all' && poi.distributor_type !== type) return false;
        if (potential !== 'all' && poi.distributor_potential !== potential) return false;
        
        if (distance !== 'all') {
            const dist = poi.distance_from_plant_km;
            switch (distance) {
                case '0-10': if (dist > 10) return false; break;
                case '10-20': if (dist <= 10 || dist > 20) return false; break;
                case '20-30': if (dist <= 20 || dist > 30) return false; break;
                case '30+': if (dist <= 30) return false; break;
            }
        }
        
        return true;
    });
    
    // Update markers visibility
    poiMarkers.forEach((marker, index) => {
        if (filtered.includes(pois[index])) {
            marker.setStyle({ fillOpacity: 0.8, opacity: 1 });
        } else {
            marker.setStyle({ fillOpacity: 0.1, opacity: 0.3 });
        }
    });
    
    // Update statistics
    updateExpansionStats(filtered);
}

function filterDistributors() {
    const tsm = document.getElementById('tsmFilter').value;
    const city = document.getElementById('cityFilter').value;
    
    let filtered = distributorsData.filter(dist => {
        if (tsm !== 'all' && dist.tsm !== tsm) return false;
        if (city !== 'all' && dist.city !== city) return false;
        return true;
    });
    
    updateDistributorsList(filtered);
}

let filtered = pois.filter(poi => {
        // Allocation filter
        if (allocation === 'allocated') {
            if (!poi.sales_officer || poi.sales_officer === 'Vacant' || poi.sales_officer === '') return false;
        }
        if (allocation === 'unallocated') {
            if (poi.sales_officer && poi.sales_officer !== 'Vacant' && poi.sales_officer !== '') return false;
        }
        
        // Officer filter
        if (officer !== 'all') {
            if (officer === 'vacant') {
                if (poi.sales_officer && poi.sales_officer !== 'Vacant' && poi.sales_officer !== '') return false;
            } else {
                if (poi.sales_officer !== officer) return false;
            }
        }
        
        // Cluster filter
        if (cluster !== 'all' && cluster !== 'vacant_clusters') {
            if (poi.cluster !== cluster) return false;
        }
        
        return true;
    });

    
    updateAllocationDetails(filtered);
}

// ============================================================
// TAB SWITCHING
// ============================================================

function switchTab(tabName) {
    // Update active tab button
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName + 'Tab').classList.add('active');
    
    currentActiveTab = tabName;
    
    // Refresh tab-specific content
    switch (tabName) {
        case 'overview':
            updateOverviewStats();
            break;
        case 'distributors':
            updateDistributorsList();
            break;
        case 'expansion':
            updateExpansionStats();
            break;
        case 'territory':
            updateTerritoriesList();
            break;
        case 'allocated':
            updateAllocationSummary();
            break;
    }
}

// ============================================================
// STATISTICS UPDATE FUNCTIONS
// ============================================================

function updateOverviewStats() {
    document.getElementById('totalPOIs').textContent = formatNumber(pois.length);
    document.getElementById('totalDistributors').textContent = formatNumber(distributorsData.length);
    document.getElementById('totalTerritories').textContent = formatNumber(territories.length);
    
    // Calculate coverage
    const allocatedPOIs = pois.filter(p => p.sales_officer && p.sales_officer !== 'Vacant').length;
    const coverage = pois.length > 0 ? Math.round((allocatedPOIs / pois.length) * 100) : 0;
    document.getElementById('coveragePercent').textContent = `${coverage}%`;
    
    // Update zone analysis
    updateZoneAnalysis();
}

function updateZoneAnalysis() {
    const selectedPlant = document.getElementById('plantSelect').value;
    const zones = {};
    
    // Filter POIs based on selected plant
    let filteredPOIs = pois;
    if (selectedPlant !== 'all') {
        const plantName = selectedPlant === 'kunigal' ? 'Kunigal' : 'Harohalli';
        filteredPOIs = pois.filter(poi => {
            // Check if POI belongs to selected plant
            if (poi.plant && poi.plant.toLowerCase().includes(plantName.toLowerCase())) {
                return true;
            }
            // Also check by distance if plant info not available
            if (poi.latitude && poi.longitude) {
                const plant = plants[selectedPlant];
                const poiLatLng = L.latLng(poi.latitude, poi.longitude);
                const plantLatLng = L.latLng(plant.lat, plant.lng);
                const distance = poiLatLng.distanceTo(plantLatLng) / 1000;
                return distance <= plant.radius_km;
            }
            return false;
        });
    }
    
    // Group by zone
    filteredPOIs.forEach(poi => {
        const zone = poi.zone || poi.direction || 'Unknown';
        if (!zones[zone]) {
            zones[zone] = { count: 0, potential: 0 };
        }
        zones[zone].count++;
        zones[zone].potential += poi.estimated_monthly_water_liters || 0;
    });
    
    let html = '<table style="width: 100%; font-size: 12px;">';
    html += '<tr><th>Zone</th><th>POIs</th><th>Potential (L)</th></tr>';
    
    Object.entries(zones).sort((a, b) => b[1].count - a[1].count).forEach(([zone, data]) => {
        html += `<tr>
            <td>${zone}</td>
            <td>${data.count}</td>
            <td>${formatNumber(Math.round(data.potential))}</td>
        </tr>`;
    });
    
    html += '</table>';
    document.getElementById('zoneAnalysis').innerHTML = html;
}

function updateExpansionStats(filtered = pois) {
    const stats = {
        total: filtered.length,
        veryHigh: filtered.filter(p => p.distributor_potential === 'Very High').length,
        high: filtered.filter(p => p.distributor_potential === 'High').length,
        medium: filtered.filter(p => p.distributor_potential === 'Medium').length,
        low: filtered.filter(p => p.distributor_potential === 'Low').length
    };
    
    let html = `
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-value">${stats.total}</div>
                <div class="stat-label">Total Filtered POIs</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${stats.veryHigh}</div>
                <div class="stat-label">Very High Potential</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${stats.high}</div>
                <div class="stat-label">High Potential</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${stats.medium}</div>
                <div class="stat-label">Medium Potential</div>
            </div>
        </div>
    `;
    
    document.getElementById('expansionStats').innerHTML = html;
}

function updateDistributorsList(filtered = distributorsData) {
    let html = '';
    let totalRetailers = 0;
    
    filtered.forEach(dist => {
        totalRetailers += dist.retailers;
        
        html += `
            <div class="territory-item">
                <div class="territory-header">
                    <div>
                        <div class="territory-name">${dist.name}</div>
                        <div class="territory-id">${dist.city}</div>
                    </div>
                    <button onclick="focusOnDistributor(${dist.lat}, ${dist.lng})" 
                            style="padding: 4px 8px; background: #667eea; color: white; 
                                   border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">
                        📍 View on Map
                    </button>
                </div>
                <div class="territory-stats">
                    <div class="territory-stat">
                        <div class="territory-stat-label">TSM</div>
                        <div class="territory-stat-value">${dist.tsm}</div>
                    </div>
                    <div class="territory-stat">
                        <div class="territory-stat-label">Retailers</div>
                        <div class="territory-stat-value">${dist.retailers}</div>
                    </div>
                    <div class="territory-stat">
                        <div class="territory-stat-label">Classification</div>
                        <div class="territory-stat-value">${dist.classification}</div>
                    </div>
                    <div class="territory-stat">
                        <div class="territory-stat-label">City</div>
                        <div class="territory-stat-value">${dist.city}</div>
                    </div>
                </div>
            </div>
        `;
    });
    
    document.getElementById('distributorsList').innerHTML = html || '<div style="text-align: center; padding: 20px; color: #999;">No distributors found</div>';
    
    // Update statistics
    const countElement = document.getElementById('totalDistributorsCount');
    const retailersElement = document.getElementById('totalRetailers');
    if (countElement) countElement.textContent = formatNumber(filtered.length);
    if (retailersElement) retailersElement.textContent = formatNumber(totalRetailers);
}

function updateAllocationSummary() {
    // Count actual allocated vs unallocated POIs
    const allocated = pois.filter(p => p.sales_officer && p.sales_officer !== 'Vacant' && p.sales_officer !== '');
    const unallocated = pois.filter(p => !p.sales_officer || p.sales_officer === 'Vacant' || p.sales_officer === '');
    
    // Get unique officers
    const officers = [...new Set(allocated.map(p => p.sales_officer))].filter(Boolean);
    
    // Calculate average POIs per officer
    const avgPOIs = officers.length > 0 ? Math.round(allocated.length / officers.length) : 0;
    
    // Update display with actual counts
    document.getElementById('allocatedCount').textContent = formatNumber(allocated.length);
    document.getElementById('unallocatedCount').textContent = formatNumber(unallocated.length);
    document.getElementById('totalOfficers').textContent = formatNumber(officers.length);
    document.getElementById('avgPOIsPerOfficer').textContent = formatNumber(avgPOIs);
    
    // Also update the filter dropdowns with actual officers
    updateOfficerFilters();
}

function updateAllocationDetails(filtered = pois) {
    let html = '<div class="table-container"><table>';
    html += '<thead><tr><th>Cluster</th><th>Officer</th><th>POIs</th><th>Contact</th></tr></thead>';
    html += '<tbody>';
    
    // Group by cluster and officer
    const grouped = {};
    filtered.forEach(poi => {
        const key = `${poi.cluster || 'Unknown'}_${poi.sales_officer || 'Vacant'}`;
        if (!grouped[key]) {
            grouped[key] = {
                cluster: poi.cluster || 'Unknown',
                officer: poi.sales_officer || 'Vacant',
                contact: poi.officer_mobile || 'N/A',
                count: 0
            };
        }
        grouped[key].count++;
    });
    
    Object.values(grouped).forEach(group => {
        html += `<tr>
            <td>${group.cluster}</td>
            <td>${group.officer}</td>
            <td>${group.count}</td>
            <td>${group.contact}</td>
        </tr>`;
    });
    
    html += '</tbody></table></div>';
    document.getElementById('allocationDetails').innerHTML = html;
}
// ============================================================
// COPY-PASTE THESE TWO FUNCTIONS AT LINE 1017
// Insert after updateAllocationDetails() and before // UTILITY FUNCTIONS
// ============================================================

// ============================================================
// TERRITORY FILTERING FUNCTIONS
// ============================================================

/**
 * Main filter function - filters POIs and updates map
 * This is called when any filter dropdown changes
 */
function filterAllocatedTerritories() {
    const allocation = document.getElementById('allocationFilter').value;
    const officer = document.getElementById('officerFilter').value;
    const cluster = document.getElementById('clusterFilter').value;
    
    console.log(`Filtering - Allocation: ${allocation}, Officer: ${officer}, Cluster: ${cluster}`);
    
    // Filter POIs based on all criteria
    let filtered = pois.filter(poi => {
        // Allocation status filter
        if (allocation === 'allocated') {
            if (!poi.sales_officer || poi.sales_officer === 'Vacant' || poi.sales_officer === '') return false;
        }
        if (allocation === 'unallocated') {
            if (poi.sales_officer && poi.sales_officer !== 'Vacant' && poi.sales_officer !== '') return false;
        }
        
        // Officer filter
        if (officer !== 'all') {
            if (officer === 'vacant') {
                // Show only unassigned POIs
                if (poi.sales_officer && poi.sales_officer !== 'Vacant' && poi.sales_officer !== '') return false;
            } else {
                // Show only POIs assigned to this specific officer
                if (poi.sales_officer !== officer) return false;
            }
        }
        
        // Cluster filter
        if (cluster !== 'all' && cluster !== 'vacant_clusters') {
            if (poi.cluster !== cluster) return false;
        }
        
        return true;
    });
    
    console.log(`✅ Filtered ${filtered.length} POIs out of ${pois.length} total`);
    
    // 🔥 THIS IS THE KEY LINE - Update map visibility!
    updateMapWithFilteredPOIs(filtered);
    
    // Update table and summary stats
    updateAllocationDetails(filtered);
    updateFilteredSummary(filtered);
}

/**
 * Update map to show ONLY filtered POIs
 * THIS IS THE MISSING FUNCTION that fixes "all POIs showing"
 */
function updateMapWithFilteredPOIs(filtered) {
    if (!map || !poiMarkers || poiMarkers.length === 0) {
        console.warn('⚠️ Map or markers not ready yet');
        return;
    }
    
    console.log(`🗺️ Updating map: showing ${filtered.length} of ${pois.length} POIs`);
    
    // Create a Set of filtered POI IDs for fast O(1) lookup
    const filteredIds = new Set();
    filtered.forEach(poi => {
        filteredIds.add(`${poi.latitude}-${poi.longitude}`);
    });
    
    // Loop through ALL POI markers on the map
    poiMarkers.forEach(marker => {
        const latLng = marker.getLatLng();
        const markerId = `${latLng.lat}-${latLng.lng}`;
        
        if (filteredIds.has(markerId)) {
            // ✅ This marker matches the filter - SHOW IT
            if (!map.hasLayer(marker)) {
                marker.addTo(map);
            }
            // Make it fully visible
            marker.setStyle({
                fillOpacity: 0.8,
                opacity: 1,
                weight: 2
            });
        } else {
            // ❌ This marker doesn't match the filter - HIDE IT
            if (map.hasLayer(marker)) {
                map.removeLayer(marker);
            }
        }
    });
    
    // Auto-zoom to show the filtered POIs nicely
    if (filtered.length > 0 && filtered.length < pois.length) {
        try {
            // Create bounds from filtered POI coordinates
            const bounds = L.latLngBounds(filtered.map(p => [p.latitude, p.longitude]));
            
            // Zoom the map to fit these bounds
            map.fitBounds(bounds, {
                padding: [50, 50],    // Add padding around the edges
                maxZoom: 14,          // Don't zoom in too close
                animate: true,        // Smooth animation
                duration: 0.5         // Animation duration in seconds
            });
        } catch (e) {
            console.warn('Could not zoom to bounds:', e);
        }
    }
}

// ============================================================
// END OF FUNCTIONS TO COPY-PASTE
// ============================================================
// ============================================================
// UTILITY FUNCTIONS
// ============================================================

function formatNumber(num) {
    if (!num) return '0';
    return parseInt(num).toLocaleString('en-IN');
}

function showLoading(show) {
    document.getElementById('loadingOverlay').style.display = show ? 'flex' : 'none';
}

function updatePlantView() {
    const selected = document.getElementById('plantSelect').value;
    
    if (selected === 'all') {
        const centerLat = (plants.kunigal.lat + plants.harohalli.lat) / 2;
        const centerLng = (plants.kunigal.lng + plants.harohalli.lng) / 2;
        map.setView([centerLat, centerLng], 10);
    } else {
        const plant = plants[selected];
        map.setView([plant.lat, plant.lng], 11);
    }
    
    // Update zone analysis for selected plant
    updateZoneAnalysis();
}

function toggleTerritoryColors() {
    territoryColorMode = !territoryColorMode;
    updatePOIMarkers();
}

function showHeatmap() {
    // Implement heatmap functionality
    alert('Heatmap feature coming soon!');
}

// ============================================================
// EXPORT FUNCTIONS
// ============================================================

function exportExpansionData() {
    let csv = 'Name,Channel,Category,Type,Potential,Distance,Plant,Cluster,Officer,Phone\n';
    
    pois.forEach(poi => {
        csv += `"${poi.name}","${poi.channel}","${poi.business_category}","${poi.distributor_type}","${poi.distributor_potential}","${poi.distance_from_plant_km}","${poi.plant}","${poi.cluster}","${poi.sales_officer || ''}","${poi.phone_number || ''}"\n`;
    });
    
    downloadCSV(csv, 'expansion_analysis.csv');
}

function downloadCSV(csv, filename) {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
}

// ============================================================
// INITIALIZATION
// ============================================================

// Layer toggle function
function toggleLayer(layerType) {
    layerVisibility[layerType] = !layerVisibility[layerType];
    
    switch(layerType) {
        case 'plants':
            plantMarkers.forEach(marker => {
                if (layerVisibility.plants) {
                    marker.addTo(map);
                } else {
                    map.removeLayer(marker);
                }
            });
            break;
            
        case 'distributors':
            distributorMarkers.forEach(marker => {
                if (layerVisibility.distributors) {
                    marker.addTo(map);
                } else {
                    map.removeLayer(marker);
                }
            });
            break;
            
        case 'pois':
            poiMarkers.forEach(marker => {
                if (layerVisibility.pois) {
                    marker.addTo(map);
                } else {
                    map.removeLayer(marker);
                }
            });
            break;
            
        case 'coverage':
            coverageCircles.forEach(circle => {
                if (layerVisibility.coverage) {
                    circle.addTo(map);
                } else {
                    map.removeLayer(circle);
                }
            });
            break;
    }
}

// Update plant radius
function updatePlantRadius(radius) {
    currentPlantRadius = parseInt(radius);
    document.getElementById('radiusValue').textContent = radius;
    
    // Update all coverage circles
    coverageCircles.forEach(circle => {
        circle.setRadius(currentPlantRadius * 1000);
    });
}

// Draw custom radius for specific plant
function drawCustomRadius(plantName, lat, lng) {
    const radius = prompt(`Enter custom radius for ${plantName} (in km):`, currentPlantRadius);
    
    if (radius && !isNaN(radius) && radius > 0) {
        // Create a new custom circle
        const customCircle = L.circle([lat, lng], {
            color: '#ff9800',
            fillColor: '#ff9800',
            fillOpacity: 0.15,
            radius: parseFloat(radius) * 1000,
            weight: 2,
            dashArray: '5, 10'
        }).addTo(map);
        
        customCircle.bindPopup(`Custom radius: ${radius} km`);
        
        // Calculate POIs within custom radius
        let poisInRadius = 0;
        pois.forEach(poi => {
            if (poi.latitude && poi.longitude) {
                const poiLatLng = L.latLng(poi.latitude, poi.longitude);
                const plantLatLng = L.latLng(lat, lng);
                const distance = poiLatLng.distanceTo(plantLatLng) / 1000; // Convert to km
                
                if (distance <= parseFloat(radius)) {
                    poisInRadius++;
                }
            }
        });
        
        alert(`Custom radius drawn: ${radius} km\nPOIs within radius: ${poisInRadius}`);
    }
}

// Focus on distributor
function focusOnDistributor(lat, lng) {
    map.setView([lat, lng], 14);
    
    // Flash the distributor marker
    distributorMarkers.forEach(marker => {
        const markerLatLng = marker.getLatLng();
        if (markerLatLng.lat === lat && markerLatLng.lng === lng) {
            marker.setStyle({
                fillColor: '#ff0000',
                radius: 12
            });
            
            setTimeout(() => {
                marker.setStyle({
                    fillColor: '#28a745',
                    radius: 8
                });
            }, 2000);
            
            marker.openPopup();
        }
    });
}

// Check session on page load
window.onload = function() {
    checkSession();
    
    // Add enter key support for login
    document.getElementById('password').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleLogin();
        }
    });
};

console.log('✅ Water Business Territory Management System loaded');
// ============================================================
// ENHANCED TERRITORY ALLOCATION FILTERS
// ============================================================

function handleOfficerChange() {
    const selectedOfficer = document.getElementById('officerFilter').value;
    const clusterFilter = document.getElementById('clusterFilter');
    
    if (selectedOfficer === 'all') {
        populateAllClusters();
    } else if (selectedOfficer === 'vacant') {
        populateAllClusters();
    } else {
        populateClustersForOfficer(selectedOfficer);
    }
    
    clusterFilter.value = 'all';
    filterAllocatedTerritories();
}

function populateAllClusters() {
    const clusterFilter = document.getElementById('clusterFilter');
    const clusters = [...new Set(pois.map(p => p.cluster))].filter(Boolean).sort();
    
    clusterFilter.innerHTML = '<option value="all">All Clusters</option>';
    clusters.forEach(cluster => {
        clusterFilter.innerHTML += `<option value="${cluster}">${cluster}</option>`;
    });
}

function populateClustersForOfficer(officer) {
    const clusterFilter = document.getElementById('clusterFilter');
    
    const officerClusters = [...new Set(
        pois.filter(p => p.sales_officer === officer).map(p => p.cluster)
    )].filter(Boolean).sort();
    
    const allClusters = [...new Set(pois.map(p => p.cluster))].filter(Boolean).sort();
    
    clusterFilter.innerHTML = '<option value="all">All Clusters</option>';
    
    if (officerClusters.length > 0) {
        officerClusters.forEach(cluster => {
            const count = pois.filter(p => p.sales_officer === officer && p.cluster === cluster).length;
            clusterFilter.innerHTML += `<option value="${cluster}">${cluster} (${count} POIs)</option>`;
        });
        
        clusterFilter.innerHTML += '<option disabled>─────────────────</option>';
    }
    
    const vacantClusters = allClusters.filter(c => !officerClusters.includes(c));
    if (vacantClusters.length > 0) {
        clusterFilter.innerHTML += '<option disabled>📍 Available Clusters:</option>';
        vacantClusters.forEach(cluster => {
            const count = pois.filter(p => p.cluster === cluster).length;
            clusterFilter.innerHTML += `<option value="${cluster}" style="color: #999;">${cluster} (${count} POIs) ⭕</option>`;
        });
    }
}

function highlightFilteredPOIs(filtered) {
    if (!poiMarkers) return;
    
    const filteredIds = new Set(filtered.map(p => `${p.latitude}-${p.longitude}`));
    
    poiMarkers.eachLayer(marker => {
        const latLng = marker.getLatLng();
        const markerId = `${latLng.lat}-${latLng.lng}`;
        
        if (filteredIds.has(markerId)) {
            marker.setOpacity(1.0);
            if (marker.setStyle) {
                marker.setStyle({ fillOpacity: 0.8, weight: 2 });
            }
        } else {
            marker.setOpacity(0.15);
            if (marker.setStyle) {
                marker.setStyle({ fillOpacity: 0.1, weight: 1 });
            }
        }
    });
    
    const cluster = document.getElementById('clusterFilter').value;
    if (cluster !== 'all' && filtered.length > 0) {
        try {
            const bounds = L.latLngBounds(filtered.map(p => [p.latitude, p.longitude]));
            map.fitBounds(bounds, { padding: [50, 50], maxZoom: 13, animate: true });
        } catch (e) {
            console.warn('Could not zoom to bounds:', e);
        }
    }
}

function updateFilteredSummary(filtered) {
    const allocated = filtered.filter(p => p.sales_officer && p.sales_officer !== 'Vacant' && p.sales_officer !== '');
    const unallocated = filtered.filter(p => !p.sales_officer || p.sales_officer === 'Vacant' || p.sales_officer === '');
    
    const officers = [...new Set(allocated.map(p => p.sales_officer))].filter(Boolean);
    const avgPOIs = officers.length > 0 ? Math.round(allocated.length / officers.length) : 0;
    
    document.getElementById('allocatedCount').textContent = formatNumber(allocated.length);
    document.getElementById('unallocatedCount').textContent = formatNumber(unallocated.length);
    document.getElementById('totalOfficers').textContent = formatNumber(officers.length);
    document.getElementById('avgPOIsPerOfficer').textContent = formatNumber(avgPOIs);
}

function exportFilteredTerritoryData() {
    const allocation = document.getElementById('allocationFilter').value;
    const officer = document.getElementById('officerFilter').value;
    const cluster = document.getElementById('clusterFilter').value;
    
    let filtered = pois.filter(poi => {
        if (allocation === 'allocated') {
            if (!poi.sales_officer || poi.sales_officer === 'Vacant' || poi.sales_officer === '') return false;
        }
        if (allocation === 'unallocated') {
            if (poi.sales_officer && poi.sales_officer !== 'Vacant' && poi.sales_officer !== '') return false;
        }
        
        if (officer !== 'all') {
            if (officer === 'vacant') {
                if (poi.sales_officer && poi.sales_officer !== 'Vacant' && poi.sales_officer !== '') return false;
            } else {
                if (poi.sales_officer !== officer) return false;
            }
        }
        
        if (cluster !== 'all' && cluster !== 'vacant_clusters') {
            if (poi.cluster !== cluster) return false;
        }
        
        return true;
    });
    
    if (filtered.length === 0) {
        alert('❌ No data to export with current filters!');
        return;
    }
    
    let csv = 'Name,Channel,Category,Type,Potential,Distance,Plant,Cluster,Officer,Phone,Address,Latitude,Longitude\n';
    
    filtered.forEach(poi => {
        csv += `"${poi.name || ''}","${poi.channel || ''}","${poi.business_category || ''}","${poi.distributor_type || ''}","${poi.distributor_potential || ''}","${poi.distance_from_plant_km || ''}","${poi.plant || ''}","${poi.cluster || ''}","${poi.sales_officer || ''}","${poi.phone_number || ''}","${poi.address || ''}",${poi.latitude || 0},${poi.longitude || 0}\n`;
    });
    
    const officerName = officer !== 'all' ? officer.replace(/[^a-z0-9]/gi, '_').toLowerCase() : 'all';
    const clusterName = cluster !== 'all' ? cluster.replace(/[^a-z0-9]/gi, '_').toLowerCase() : 'all';
    const date = new Date().toISOString().split('T')[0];
    const filename = `territory_${officerName}_${clusterName}_${date}.csv`;
    
    downloadCSV(csv, filename);
    
    alert(`✅ Export Successful!\n\nExported: ${filtered.length} POIs\nOfficer: ${officer}\nCluster: ${cluster}\nFilename: ${filename}`);
}

console.log('✅ Enhanced Territory Filters loaded');
