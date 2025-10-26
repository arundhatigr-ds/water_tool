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
let mapMarkers = [], coverageCircles = [], distributorMarkers = [], poiMarkers = [];
let currentActiveTab = 'overview';
let territoryColorMode = false;
let clusterColors = {};

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
    Object.values(plants).forEach(plant => {
        const marker = L.marker([plant.lat, plant.lng], {
            icon: L.divIcon({
                className: 'custom-div-icon',
                html: `<div style="background: #667eea; color: white; padding: 8px 12px; 
                       border-radius: 20px; font-weight: bold; white-space: nowrap;">
                       🏭 ${plant.name}</div>`,
                iconSize: [150, 30],
                iconAnchor: [75, 15]
            })
        }).addTo(map);
        
        marker.bindPopup(`
            <strong>${plant.name}</strong><br>
            Region: ${plant.region}<br>
            Coverage: ${plant.radius_km} km
        `);
        
        // Add coverage circle
        const circle = L.circle([plant.lat, plant.lng], {
            color: '#667eea',
            fillColor: '#667eea',
            fillOpacity: 0.1,
            radius: plant.radius_km * 1000
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
        const marker = L.marker([dist.lat, dist.lng], {
            icon: L.divIcon({
                className: 'custom-div-icon',
                html: `<div style="background: #28a745; color: white; padding: 5px 10px; 
                       border-radius: 15px; font-size: 12px;">
                       🚚 ${dist.name}</div>`,
                iconSize: [150, 25],
                iconAnchor: [75, 12]
            })
        }).addTo(map);
        
        marker.bindPopup(`
            <strong>${dist.name}</strong><br>
            City: ${dist.city}<br>
            Retailers: ${dist.retailers}<br>
            TSM: ${dist.tsm}<br>
            Target: ₹${formatNumber(dist.target)}<br>
            Sales: ₹${formatNumber(dist.sales)}
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
            
            marker.bindPopup(`
                <strong>${poi.name}</strong><br>
                Channel: ${poi.channel}<br>
                Category: ${poi.business_category}<br>
                Type: ${poi.distributor_type}<br>
                Potential: ${poi.distributor_potential}<br>
                Distance: ${poi.distance_from_plant_km} km<br>
                Plant: ${poi.plant}<br>
                Cluster: ${poi.cluster}<br>
                Officer: ${poi.sales_officer || 'Vacant'}
            `);
            
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
    
    // Use potential-based colors
    switch (poi.distributor_potential) {
        case 'Very High': return '#ff0000';
        case 'High': return '#ffc107';
        case 'Medium': return '#17a2b8';
        case 'Low': return '#6c757d';
        default: return '#999999';
    }
}

// ============================================================
// FILTER FUNCTIONS
// ============================================================

function initializeFilters() {
    // Get unique values for filters
    const channels = [...new Set(pois.map(p => p.channel))].filter(Boolean).sort();
    const categories = [...new Set(pois.map(p => p.business_category))].filter(Boolean).sort();
    const clusters = [...new Set(pois.map(p => p.cluster))].filter(Boolean).sort();
    const officers = [...new Set(pois.map(p => p.sales_officer))].filter(Boolean).sort();
    const tsms = [...new Set(distributorsData.map(d => d.tsm))].filter(Boolean).sort();
    const cities = [...new Set(distributorsData.map(d => d.city))].filter(Boolean).sort();
    
    // Populate channel filter
    const channelFilter = document.getElementById('channelFilter');
    if (channelFilter) {
        channelFilter.innerHTML = '<option value="all">All Channels</option>';
        channels.forEach(channel => {
            channelFilter.innerHTML += `<option value="${channel}">${channel}</option>`;
        });
    }
    
    // Populate business category filter
    const categoryFilter = document.getElementById('businessCategoryFilter');
    if (categoryFilter) {
        categoryFilter.innerHTML = '<option value="all">All Categories</option>';
        categories.forEach(cat => {
            categoryFilter.innerHTML += `<option value="${cat}">${cat}</option>`;
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

function applyExpansionFilters() {
    const channel = document.getElementById('channelFilter').value;
    const category = document.getElementById('businessCategoryFilter').value;
    const type = document.getElementById('distributorTypeFilter').value;
    const potential = document.getElementById('potentialFilter').value;
    const distance = document.getElementById('distanceFilter').value;
    
    // Filter POIs
    let filtered = pois.filter(poi => {
        if (channel !== 'all' && poi.channel !== channel) return false;
        if (category !== 'all' && poi.business_category !== category) return false;
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

function filterAllocatedTerritories() {
    const allocation = document.getElementById('allocationFilter').value;
    const officer = document.getElementById('officerFilter').value;
    const cluster = document.getElementById('clusterFilter').value;
    
    let filtered = pois.filter(poi => {
        if (allocation === 'allocated' && !poi.sales_officer) return false;
        if (allocation === 'unallocated' && poi.sales_officer) return false;
        if (officer !== 'all' && poi.sales_officer !== officer) return false;
        if (cluster !== 'all' && poi.cluster !== cluster) return false;
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
    const zones = {};
    
    pois.forEach(poi => {
        const zone = poi.zone || 'Unknown';
        if (!zones[zone]) {
            zones[zone] = { count: 0, potential: 0 };
        }
        zones[zone].count++;
        zones[zone].potential += poi.estimated_monthly_water_liters || 0;
    });
    
    let html = '<table style="width: 100%; font-size: 12px;">';
    html += '<tr><th>Zone</th><th>POIs</th><th>Potential (L)</th></tr>';
    
    Object.entries(zones).forEach(([zone, data]) => {
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
    let totalTarget = 0;
    let totalSales = 0;
    
    filtered.forEach(dist => {
        totalTarget += dist.target;
        totalSales += dist.sales;
        
        const achievement = dist.target > 0 ? Math.round((dist.sales / dist.target) * 100) : 0;
        
        html += `
            <div class="territory-item">
                <div class="territory-header">
                    <div>
                        <div class="territory-name">${dist.name}</div>
                        <div class="territory-id">${dist.city}</div>
                    </div>
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
                        <div class="territory-stat-label">Target</div>
                        <div class="territory-stat-value">₹${formatNumber(dist.target)}</div>
                    </div>
                    <div class="territory-stat">
                        <div class="territory-stat-label">Achievement</div>
                        <div class="territory-stat-value">${achievement}%</div>
                    </div>
                </div>
            </div>
        `;
    });
    
    document.getElementById('distributorsList').innerHTML = html;
    document.getElementById('totalTarget').textContent = '₹' + formatNumber(totalTarget);
    document.getElementById('totalSales').textContent = '₹' + formatNumber(totalSales);
}

function updateAllocationSummary() {
    const allocated = pois.filter(p => p.sales_officer && p.sales_officer !== 'Vacant');
    const unallocated = pois.filter(p => !p.sales_officer || p.sales_officer === 'Vacant');
    
    const officers = [...new Set(allocated.map(p => p.sales_officer))];
    const avgPOIs = officers.length > 0 ? Math.round(allocated.length / officers.length) : 0;
    
    document.getElementById('allocatedCount').textContent = formatNumber(allocated.length);
    document.getElementById('unallocatedCount').textContent = formatNumber(unallocated.length);
    document.getElementById('totalOfficers').textContent = formatNumber(officers.length);
    document.getElementById('avgPOIsPerOfficer').textContent = formatNumber(avgPOIs);
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
