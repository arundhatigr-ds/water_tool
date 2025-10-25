// Configuration - IMPORTANT: Update these values with your GitHub repository details
// OLD: Loading from ZIP (now using data.js)
// const GITHUB_CONFIG = {
//     username: 'saumenray-afk',
//     repo: 'water_tool',
//     branch: 'main',
//     dataFile: 'DENSE_CONTINUOUS_POI_150KM_20251010_225505.zip'
// };

// Construct the GitHub raw URL
// const POI_ZIP_URL = `https://raw.githubusercontent.com/${GITHUB_CONFIG.username}/${GITHUB_CONFIG.repo}/${GITHUB_CONFIG.branch}/${GITHUB_CONFIG.dataFile}`;

// User authentication
const VALID_USERS = {
    'admin': 'admin2024!',
    'manager': 'manager123',
    'soumen': 'soumen123',
    'client': 'client123',
    'test': 'test2024!'
};

const SESSION_TIMEOUT = 120; // minutes

// Actual distributor data from your CSV file
// Updated distributor data - 24 distributors for Kunigal & Harohalli area
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

// Plant locations - Kunigal & Harohalli
const plants = {
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


// ============================================================
// UPDATE DISTRIBUTORS TABLE
// ============================================================
function updateDistributorsTable() {
    const tbody = document.getElementById('distributorsTableBody');
    if (!tbody) return;
    
    let html = '';
    distributorsData.forEach((dist, index) => {
        html += `
            <tr style="cursor: pointer;" onclick="focusOnDistributor(${index})">
                <td>${dist.name}</td>
                <td>${dist.city}</td>
                <td>${dist.retailers}</td>
                <td>${dist.tsm || 'Not Assigned'}</td>
                <td>${dist.classification}</td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html;
    console.log('✅ Distributors table updated');
}

function focusOnDistributor(index) {
    const dist = distributorsData[index];
    map.setView([dist.lat, dist.lng], 14);
    alert(`📍 ${dist.name}\n${dist.city}\nRetailers: ${dist.retailers}\nTSM: ${dist.tsm}`);
}

// Global variables
let map, currentRadius = 50;
let activeCategoryFilter = 'all';
let activeSubCategoryFilter = 'all';
let mapMarkers = [], coverageCircles = [], distributors = [], distanceLines = [];
let pois = [], poisLoaded = false;
let selectedPlantForExport = null;
let selectedDistributorForExport = null;
let customRadiusEnabled = false;
let currentViewPOIs = [];
let currentViewStats = {
    totalInRadius: 0,
    filtered: 0,
    radius: 0,
    category: 'all',
    subCategory: 'all'
};

// ============================================================
// GEOLOCATION
// ============================================================
let userLocation = { lat: null, lng: null };

function getUserLocation() {
    console.log('📍 Requesting user location...');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                userLocation.lat = position.coords.latitude;
                userLocation.lng = position.coords.longitude;
                document.getElementById('userLocationText').innerHTML = 
                    `Lat: ${userLocation.lat.toFixed(4)}, Lng: ${userLocation.lng.toFixed(4)}`;
                console.log('✅ Location detected:', userLocation);
                addMyLocationButton();
            },
            (error) => {
                document.getElementById('userLocationText').innerHTML = 
                    'Location unavailable';
            }
        );
    }
}

function addMyLocationButton() {
    const statsPanel = document.querySelector('.stats-panel');
    if (statsPanel && !document.getElementById('myLocationBtn')) {
        const btn = document.createElement('button');
        btn.id = 'myLocationBtn';
        btn.className = 'action-btn';
        btn.innerHTML = '📍 Show My Location';
        btn.style.marginTop = '10px';
        btn.onclick = showMyLocationOnMap;
        statsPanel.parentNode.insertBefore(btn, statsPanel.nextSibling);
    }
}

function showMyLocationOnMap() {
    if (!userLocation.lat) { alert('❌ Location not available'); return; }
    if (window.userMarker) map.removeLayer(window.userMarker);
    window.userMarker = L.marker([userLocation.lat, userLocation.lng], {
        icon: L.divIcon({
            html: '<div style="background: #ff0000; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white;"></div>'
        })
    }).addTo(map).bindPopup('<b>📍 Your Location</b>').openPopup();
    map.setView([userLocation.lat, userLocation.lng], 13);
}



// Robust CSV Parser that handles quoted fields
function parseCSVLine(line, delimiter = ',') {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const nextChar = line[i + 1];
        
        if (char === '"') {
            if (inQuotes && nextChar === '"') {
                current += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
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

// Helper function to format currency
function formatCurrency(value) {
    if (!value) return 'N/A';
    const num = parseFloat(value.toString().replace(/[^0-9.-]/g, ''));
    if (isNaN(num)) return value;
    return '₹' + num.toLocaleString('en-IN');
}

// Helper function to format numbers
function formatNumber(value) {
    if (!value) return 'N/A';
    const num = parseFloat(value);
    if (isNaN(num)) return value;
    return num.toLocaleString('en-IN');
}

// Calculate distance between two points
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// Find nearest plant for a given location
function findNearestPlant(lat, lng) {
    let nearestPlant = null;
    let minDistance = Infinity;
    
    Object.entries(plants).forEach(([key, plant]) => {
        const distance = calculateDistance(lat, lng, plant.lat, plant.lng);
        if (distance < minDistance) {
            minDistance = distance;
            nearestPlant = {key, ...plant, distance};
        }
    });
    
    return nearestPlant;
}

// Create detailed POI popup content
function createPOIPopup(poi) {
    const priority = poi.Priority || 'N/A';
    const priorityClass = priority === 'High' ? 'badge-excellent' : 
                          priority === 'Medium' ? 'badge-good' : 'badge-average';
    
    const consumption = poi.Water_Consumption || 'N/A';
    const consumptionClass = consumption === 'High' ? 'badge-below' : 
                             consumption === 'Medium' ? 'badge-average' : 'badge-good';
    
    return `
        <div style="min-width: 280px; max-width: 350px; font-family: 'Segoe UI', sans-serif;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px; margin: -10px -10px 10px -10px; border-radius: 4px 4px 0 0;">
                <div style="font-size: 15px; font-weight: 700; margin-bottom: 4px;">
                    ${poi.Business_Name || poi.POI_ID || 'Unknown Business'}
                </div>
                <div style="font-size: 11px; opacity: 0.9;">
                    ${poi.Sub_Category || poi.Category || 'Business'}
                </div>
            </div>
            
            <div style="padding: 8px 0;">
                <table style="width: 100%; font-size: 12px; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 4px 0; color: #666; width: 45%;">📍 Location:</td>
                        <td style="padding: 4px 0; font-weight: 600;">${poi.City || poi.Area || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 4px 0; color: #666;">📮 Pincode:</td>
                        <td style="padding: 4px 0; font-weight: 600;">${poi.Pincode || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 4px 0; color: #666;">🏢 Type:</td>
                        <td style="padding: 4px 0; font-weight: 600;">${poi.Business_Type || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 4px 0; color: #666;">📏 Distance:</td>
                        <td style="padding: 4px 0; font-weight: 600;">${poi.Distance_From_Plant_KM ? poi.Distance_From_Plant_KM + ' KM' : 'N/A'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 4px 0; color: #666;">🏭 Plant:</td>
                        <td style="padding: 4px 0; font-size: 11px;">${poi.Nearest_Plant || 'N/A'}</td>
                    </tr>
                </table>
            </div>
            
            <div style="border-top: 1px solid #e0e0e0; margin: 8px 0; padding-top: 8px;">
                <div style="font-size: 11px; font-weight: 700; color: #667eea; margin-bottom: 6px;">💧 WATER REQUIREMENTS</div>
                <table style="width: 100%; font-size: 12px;">
                    <tr>
                        <td style="padding: 3px 0; color: #666;">Daily:</td>
                        <td style="padding: 3px 0; font-weight: 600; text-align: right;">${formatNumber(poi.Daily_Requirement_Liters)} L</td>
                    </tr>
                    <tr>
                        <td style="padding: 3px 0; color: #666;">Monthly:</td>
                        <td style="padding: 3px 0; font-weight: 600; text-align: right;">${formatNumber(poi.Monthly_Requirement_Liters)} L</td>
                    </tr>
                    <tr>
                        <td style="padding: 3px 0; color: #666;">Consumption:</td>
                        <td style="padding: 3px 0; text-align: right;">
                            <span class="performance-badge ${consumptionClass}" style="display: inline-block; padding: 2px 8px; border-radius: 10px; font-size: 10px; font-weight: 600;">
                                ${consumption}
                            </span>
                        </td>
                    </tr>
                </table>
            </div>
            
            <div style="border-top: 1px solid #e0e0e0; margin: 8px 0; padding-top: 8px;">
                <div style="font-size: 11px; font-weight: 700; color: #667eea; margin-bottom: 6px;">💰 BUSINESS POTENTIAL</div>
                <table style="width: 100%; font-size: 12px;">
                    <tr>
                        <td style="padding: 3px 0; color: #666;">Revenue:</td>
                        <td style="padding: 3px 0; font-weight: 600; text-align: right;">${formatCurrency(poi.Revenue_Potential)}</td>
                    </tr>
                    <tr>
                        <td style="padding: 3px 0; color: #666;">Priority:</td>
                        <td style="padding: 3px 0; text-align: right;">
                            <span class="performance-badge ${priorityClass}" style="display: inline-block; padding: 2px 8px; border-radius: 10px; font-size: 10px; font-weight: 600;">
                                ${priority}
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 3px 0; color: #666;">Lead Score:</td>
                        <td style="padding: 3px 0; font-weight: 600; text-align: right;">${poi.Lead_Score || 'N/A'}/100</td>
                    </tr>
                    <tr>
                        <td style="padding: 3px 0; color: #666;">Price Sensitivity:</td>
                        <td style="padding: 3px 0; font-weight: 600; text-align: right;">${poi.Price_Sensitivity || 'N/A'}</td>
                    </tr>
                </table>
            </div>
            
            <div style="border-top: 1px solid #e0e0e0; margin: 8px 0; padding-top: 8px;">
                <div style="font-size: 11px; font-weight: 700; color: #667eea; margin-bottom: 6px;">📞 CONTACT INFO</div>
                <table style="width: 100%; font-size: 11px;">
                    <tr>
                        <td style="padding: 2px 0; color: #666;">Status:</td>
                        <td style="padding: 2px 0; font-weight: 600;">${poi.Contact_Status || 'New Lead'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 2px 0; color: #666;">Sales Stage:</td>
                        <td style="padding: 2px 0; font-weight: 600;">${poi.Sales_Stage || 'Prospecting'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 2px 0; color: #666;">Best Time:</td>
                        <td style="padding: 2px 0;">${poi.Best_Contact_Time || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 2px 0; color: #666;">Current Supplier:</td>
                        <td style="padding: 2px 0;">${poi.Current_Water_Supplier || 'Unknown'}</td>
                    </tr>
                </table>
            </div>
            
            ${poi.Landmark ? `
            <div style="background: #f8f9ff; padding: 8px; border-radius: 6px; margin-top: 8px; font-size: 11px;">
                <strong style="color: #667eea;">📍 Landmark:</strong> ${poi.Landmark}
            </div>
            ` : ''}
            
            <div style="margin-top: 10px; padding-top: 8px; border-top: 1px solid #e0e0e0; font-size: 10px; color: #999; text-align: center;">
                ID: ${poi.POI_ID || 'N/A'} • Created: ${poi.Created_Date || 'N/A'}
            </div>
        </div>
    `;
}

// Create detailed Distributor popup content
function createDistributorPopup(dist) {
    const achievementPercent = dist.achievement.toFixed(1);
    const achievementClass = dist.achievement >= 90 ? 'badge-excellent' :
                             dist.achievement >= 75 ? 'badge-good' :
                             dist.achievement >= 60 ? 'badge-average' : 'badge-below';
    
    const nearestPlant = findNearestPlant(dist.lat, dist.lng);
    
    return `
        <div style="min-width: 280px; font-family: 'Segoe UI', sans-serif;">
            <div style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 12px; margin: -10px -10px 10px -10px; border-radius: 4px 4px 0 0;">
                <div style="font-size: 15px; font-weight: 700; margin-bottom: 4px;">
                    📦 ${dist.name}
                </div>
                <div style="font-size: 11px; opacity: 0.9;">
                    ${dist.classification} - ${dist.city}
                </div>
            </div>
            
            <div style="padding: 8px 0;">
                <div style="text-align: center; margin: 10px 0;">
                    <div style="font-size: 32px; font-weight: 700; color: ${dist.achievement >= 75 ? '#28a745' : dist.achievement >= 60 ? '#ffc107' : '#dc3545'};">
                        ${achievementPercent}%
                    </div>
                    <div style="font-size: 11px; color: #666; margin-top: 4px;">
                        <span class="performance-badge ${achievementClass}" style="display: inline-block; padding: 3px 12px; border-radius: 12px; font-size: 11px; font-weight: 600;">
                            ${dist.rating}
                        </span>
                    </div>
                </div>
                
                <table style="width: 100%; font-size: 12px; margin-top: 10px;">
                    <tr style="background: #f8f9ff;">
                        <td style="padding: 6px; color: #666;">🎯 Target:</td>
                        <td style="padding: 6px; font-weight: 600; text-align: right;">₹${(dist.target / 100000).toFixed(1)}L</td>
                    </tr>
                    <tr>
                        <td style="padding: 6px; color: #666;">💰 Sales:</td>
                        <td style="padding: 6px; font-weight: 600; text-align: right;">₹${(dist.sales / 100000).toFixed(1)}L</td>
                    </tr>
                    <tr style="background: #f8f9ff;">
                        <td style="padding: 6px; color: #666;">📍 Retailers:</td>
                        <td style="padding: 6px; font-weight: 600; text-align: right;">${dist.retailers}</td>
                    </tr>
                    <tr>
                        <td style="padding: 6px; color: #666;">👤 TSM:</td>
                        <td style="padding: 6px; font-weight: 600; text-align: right;">${dist.tsm}</td>
                    </tr>
                    <tr style="background: #f8f9ff;">
                        <td style="padding: 6px; color: #666;">🏙️ City:</td>
                        <td style="padding: 6px; font-weight: 600; text-align: right;">${dist.city}</td>
                    </tr>
                    <tr>
                        <td style="padding: 6px; color: #666;">🏭 Nearest Plant:</td>
                        <td style="padding: 6px; font-weight: 600; text-align: right;">${nearestPlant.distance.toFixed(1)} KM</td>
                    </tr>
                    <tr style="background: #f8f9ff;">
                        <td style="padding: 6px; color: #666;">🏢 Type:</td>
                        <td style="padding: 6px; font-weight: 600; text-align: right;">${dist.classification}</td>
                    </tr>
                </table>
                
                <div style="margin-top: 12px; padding: 10px; background: ${dist.achievement >= 90 ? '#d4edda' : dist.achievement >= 75 ? '#fff3cd' : '#f8d7da'}; border-radius: 6px; border-left: 4px solid ${dist.achievement >= 90 ? '#28a745' : dist.achievement >= 75 ? '#ffc107' : '#dc3545'};">
                    <div style="font-size: 11px; font-weight: 600; margin-bottom: 4px;">
                        ${dist.achievement >= 90 ? '🌟 Excellent Performance!' : 
                          dist.achievement >= 75 ? '✅ Good Performance' : 
                          dist.achievement >= 60 ? '⚠️ Average Performance' : '❌ Below Target'}
                    </div>
                    <div style="font-size: 10px;">
                        Gap: ₹${((dist.target - dist.sales) / 100000).toFixed(1)}L
                    </div>
                </div>
                
                <button onclick="selectDistributorForPOIExport(${dist.index})" style="width: 100%; margin-top: 10px; padding: 8px; background: #667eea; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 600;">
                    📍 Export POIs Around This Distributor
                </button>
            </div>
        </div>
    `;
}

// Authentication functions
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('errorMessage');
    
    if (VALID_USERS[username] && VALID_USERS[username] === password) {
        errorMsg.classList.remove('show');
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('app').classList.add('active');
        document.getElementById('userDisplay').textContent = `👤 ${username}`;
        
        const loginTime = new Date().getTime();
        sessionStorage.setItem('loggedIn', 'true');
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('loginTime', loginTime);
        
        initializeApp();
    } else {
        errorMsg.classList.add('show');
        document.getElementById('password').value = '';
        document.getElementById('username').focus();
    }
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        sessionStorage.clear();
        location.reload();
    }
}

function checkSessionTimeout() {
    const loginTime = sessionStorage.getItem('loginTime');
    if (loginTime) {
        const currentTime = new Date().getTime();
        const elapsed = (currentTime - loginTime) / 1000 / 60;
        
        if (elapsed > SESSION_TIMEOUT) {
            alert('⏰ Session expired. Please login again.');
            sessionStorage.clear();
            location.reload();
        }
    }
}

window.addEventListener('load', function() {
    if (sessionStorage.getItem('loggedIn') === 'true') {
        checkSessionTimeout();
        
        if (sessionStorage.getItem('loggedIn') === 'true') {
            const username = sessionStorage.getItem('username');
            document.getElementById('loginScreen').style.display = 'none';
            document.getElementById('app').classList.add('active');
            document.getElementById('userDisplay').textContent = `👤 ${username}`;
            initializeApp();
        }
    }
});

setInterval(checkSessionTimeout, 5 * 60 * 1000);

// POI Data Loading Functions
async function loadPOIData() {
    console.log('📂 Loading POI data...');
    
    // Check if POI_DATA is available from data.js
    if (typeof POI_DATA !== 'undefined' && POI_DATA.length > 0) {
        pois = POI_DATA;
        poisLoaded = true;
        
        console.log(`✅ Loaded ${pois.length.toLocaleString()} POIs from data.js`);
        
        document.getElementById('poiStatusText').innerHTML = 
            `${pois.length.toLocaleString()} POIs loaded from Kunigal & Harohalli`;
        document.getElementById('totalPOIs').textContent = pois.length.toLocaleString();
        
        updateMap();
        updateDistributorsTable();
        
        return pois;
    } else {
        console.error('❌ POI_DATA not found');
        document.getElementById('poiStatusText').innerHTML = 
            '❌ POI data not loaded. Ensure data.js is included.';
        alert('❌ Please include data.js file!');
        return [];
    }
}

async function loadPOIDataFromBlob(blob) {
    try {
        console.log('📦 Processing file, size:', blob.size, 'bytes');
        console.log('📦 Extracting ZIP...');
        document.getElementById('poiStatusText').textContent = 'Extracting ZIP file...';
        
        const zip = await JSZip.loadAsync(blob);
        const fileNames = Object.keys(zip.files);
        console.log('📁 Files in ZIP:', fileNames);
        
        if (fileNames.length === 0) {
            throw new Error('ZIP file contains no files');
        }
        
        const csvFileName = fileNames.find(name => 
            !name.startsWith('__MACOSX') && 
            !name.startsWith('.') &&
            (name.toLowerCase().endsWith('.csv') || 
             name.toLowerCase().endsWith('.txt') || 
             name.toLowerCase().endsWith('.tsv'))
        );
        
        if (!csvFileName) {
            throw new Error('No CSV file found in ZIP');
        }
        
        console.log(`📄 Extracting file: ${csvFileName}`);
        document.getElementById('poiStatusText').textContent = `Extracting ${csvFileName}...`;
        
        const csvText = await zip.files[csvFileName].async('text');
        console.log(`✅ CSV extracted: ${csvText.length.toLocaleString()} characters`);
        
        if (csvText.length === 0) {
            throw new Error('CSV file is empty');
        }
        
        console.log('📝 First 300 chars:', csvText.substring(0, 300));
        
        await parsePOIData(csvText, csvFileName);
        
    } catch (error) {
        console.error('❌ ERROR:', error);
        document.getElementById('poiStatusText').innerHTML = 
            `<span style="color: #dc3545;">⚠️ Error: ${error.message}</span>`;
        throw error;
    }
}

async function parsePOIData(csvText, fileName) {
    console.log('🔍 Parsing CSV data with robust parser...');
    document.getElementById('poiStatusText').textContent = 'Parsing CSV data...';
    
    const lines = csvText.trim().split('\n');
    console.log(`📊 Total lines: ${lines.length.toLocaleString()}`);
    
    if (lines.length < 2) {
        throw new Error('CSV has no data rows');
    }
    
    const firstLine = lines[0];
    const commaCount = (firstLine.match(/,/g) || []).length;
    const tabCount = (firstLine.match(/\t/g) || []).length;
    const delimiter = commaCount > tabCount ? ',' : '\t';
    
    console.log(`🔧 Delimiter: ${delimiter === ',' ? 'COMMA' : 'TAB'}`);
    
    const headers = parseCSVLine(firstLine, delimiter);
    console.log(`📋 Headers (${headers.length}):`, headers.slice(0, 20));
    
    let latCol = headers.findIndex(h => 
        h.toLowerCase() === 'latitude' || h.toLowerCase() === 'lat'
    );
    let lngCol = headers.findIndex(h => 
        h.toLowerCase() === 'longitude' || h.toLowerCase() === 'lng' || h.toLowerCase() === 'long'
    );
    
    console.log(`📍 Latitude column: ${latCol} ("${headers[latCol]}")`);
    console.log(`📍 Longitude column: ${lngCol} ("${headers[lngCol]}")`);
    
    if (latCol === -1 || lngCol === -1) {
        throw new Error(`Could not find lat/lng columns`);
    }
    
    pois = [];
    let validCount = 0;
    let invalidCount = 0;
    
    console.log('\n🔄 Starting row processing...');
    
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        try {
            const values = parseCSVLine(line, delimiter);
            
            if (values.length < headers.length - 5) {
                invalidCount++;
                continue;
            }
            
            const poi = {};
            headers.forEach((header, index) => {
                poi[header] = values[index] ? values[index].trim() : '';
            });
            
            const lat = parseFloat(values[latCol]);
            const lng = parseFloat(values[lngCol]);
            
            if (isNaN(lat) || isNaN(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180 || (lat === 0 && lng === 0)) {
                invalidCount++;
                continue;
            }
            
            poi.Latitude = lat;
            poi.Longitude = lng;
            pois.push(poi);
            validCount++;
            
            if (i % 10000 === 0) {
                console.log(`⏳ Processing: ${i.toLocaleString()}/${lines.length.toLocaleString()} rows (${validCount.toLocaleString()} valid)`);
                document.getElementById('poiStatusText').textContent = 
                    `Processing: ${i.toLocaleString()}/${lines.length.toLocaleString()} rows...`;
                
                await new Promise(resolve => setTimeout(resolve, 0));
            }
        } catch (parseError) {
            invalidCount++;
        }
    }
    
    console.log(`\n✅ SUCCESS! Loaded ${validCount.toLocaleString()} POIs (${invalidCount.toLocaleString()} invalid)`);
    
    if (validCount === 0) {
        throw new Error(`No valid POIs found!`);
    }
    
    poisLoaded = true;
    updatePOIStats();
    updateMap();
}

function updatePOIStats() {
    document.getElementById('totalPOIs').textContent = pois.length.toLocaleString();
    document.getElementById('poiCountHeader').textContent = pois.length.toLocaleString();
    document.getElementById('poiStatusText').textContent = 
        `✅ ${pois.length.toLocaleString()} POIs loaded successfully`;
    
    const totalRetailers = distributors.reduce((sum, d) => sum + d.retailers, 0);
    const coverage = totalRetailers > 0 && pois.length > 0 ? (totalRetailers / pois.length * 100) : 0;
    document.getElementById('coverage').textContent = coverage.toFixed(1) + '%';
    
    const wsNeeded = Math.ceil(pois.length / 150);
    document.getElementById('newWSNeeded').textContent = wsNeeded + '+';
    document.getElementById('investment').textContent = '₹' + Math.ceil(wsNeeded * 0.6) + 'Cr';
    document.getElementById('monthlyRev').textContent = '₹' + Math.ceil(wsNeeded * 0.3) + 'Cr';
}

// Draw distance lines between plants and distributors
function drawPlantDistributorLines() {
    // Clear existing lines
    distanceLines.forEach(line => map.removeLayer(line));
    distanceLines = [];
    
    if (!document.getElementById('showDistLines').checked) {
        return;
    }
    
    distributors.forEach(dist => {
        const nearestPlant = findNearestPlant(dist.lat, dist.lng);
        
        const line = L.polyline(
            [[nearestPlant.lat, nearestPlant.lng], [dist.lat, dist.lng]],
            {
                color: '#FF6B6B',
                weight: 2,
                opacity: 0.6,
                dashArray: '5, 10'
            }
        ).addTo(map);
        
        // Add tooltip to the line showing distance
        line.bindTooltip(
            `<div style="text-align: center;">
                <b>${dist.name}</b><br>
                Distance: ${nearestPlant.distance.toFixed(2)} KM<br>
                From: ${nearestPlant.name}
            </div>`,
            {
                permanent: false,
                direction: 'center'
            }
        );
        
        distanceLines.push(line);
    });
}

// Application initialization
function initializeApp() {
    distributorsData.forEach((d, index) => {
        const achievement = d.target > 0 ? (d.sales / d.target * 100) : 0;
        let rating = 'Below Average';
        if (achievement >= 90) rating = 'Excellent';
        else if (achievement >= 75) rating = 'Good';
        else if (achievement >= 60) rating = 'Average';

        distributors.push({...d, achievement, rating, index});
    });

    map = L.map('map').setView([12.9716, 77.5946], 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
        maxZoom: 18
    }).addTo(map);

    const plantIcon = L.divIcon({
        html: '<div style="background: #FF6B6B; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; font-size: 16px;">🏭</div>',
        className: '',
        iconSize: [30, 30]
    });

    Object.values(plants).forEach(plant => {
        L.marker([plant.lat, plant.lng], {icon: plantIcon})
            .bindPopup(`<div style="text-align: center; padding: 5px;"><b style="font-size: 14px;">🏭 ${plant.name}</b><br><span style="font-size: 12px; color: #666;">Water Production Facility</span></div>`)
            .addTo(map);
    });

    setupEventListeners();
    updateDistributorList();
    populateDistributorDropdown();
    updateMap();
    loadPOIData();

    // Update total distributors count in UI
    document.getElementById('totalDist').textContent = distributors.length;
    const totalRetailers = distributors.reduce((sum, d) => sum + d.retailers, 0);
    document.getElementById('totalRetailers').textContent = totalRetailers.toLocaleString() + '+';

    console.log(`✅ App Initialized: ${distributors.length} Distributors`);
}

function setupEventListeners() {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
            this.classList.add('active');
            document.getElementById(this.dataset.tab + '-tab').classList.add('active');
        });
    });

    document.querySelectorAll('.radius-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.radius-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentRadius = parseInt(this.dataset.radius);
            customRadiusEnabled = false;
            document.getElementById('customRadiusInput').value = '';
            updateMap();
        });
    });
}

function toggleCustomRadius() {
    customRadiusEnabled = document.getElementById('useCustomRadius').checked;
    document.getElementById('customRadiusInput').disabled = !customRadiusEnabled;
    
    if (customRadiusEnabled) {
        document.querySelectorAll('.radius-btn').forEach(b => b.classList.remove('active'));
    }
}

function applyCustomRadius() {
    const input = document.getElementById('customRadiusInput');
    const value = parseInt(input.value);
    
    if (isNaN(value) || value < 1 || value > 500) {
        alert('Please enter a valid radius between 1 and 500 KM');
        return;
    }
    
    currentRadius = value;
    customRadiusEnabled = true;
    document.getElementById('useCustomRadius').checked = true;
    document.querySelectorAll('.radius-btn').forEach(b => b.classList.remove('active'));
    updateMap();
}

function updateDistributorList() {
    const list = document.getElementById('distributorList');
    list.innerHTML = '';
    
    distributors.forEach((dist, index) => {
        const item = document.createElement('div');
        item.className = 'distributor-item';
        item.onclick = () => focusOnDistributor(index);
        
        const badgeClass = 
            dist.rating === 'Excellent' ? 'badge-excellent' :
            dist.rating === 'Good' ? 'badge-good' :
            dist.rating === 'Average' ? 'badge-average' : 'badge-below';
        
        item.innerHTML = `
            <div class="distributor-name">
                ${dist.name}
                <span class="performance-badge ${badgeClass}">
                    ${dist.achievement.toFixed(1)}%
                </span>
            </div>
            <div class="distributor-meta">
                ${dist.city} • ${dist.retailers} retailers • ${dist.classification}
            </div>
        `;
        
        list.appendChild(item);
    });
}

function focusOnDistributor(index) {
    const dist = distributors[index];
    map.setView([dist.lat, dist.lng], 13);
    
    document.querySelectorAll('.distributor-item').forEach((item, i) => {
        item.classList.toggle('selected', i === index);
    });
}

function updateMap() {
    mapMarkers.forEach(marker => map.removeLayer(marker));
    mapMarkers = [];
    coverageCircles.forEach(circle => map.removeLayer(circle));
    coverageCircles = [];

    // Reset current view stats
    currentViewPOIs = [];
    currentViewStats = {
        totalInRadius: 0,
        filtered: 0,
        radius: currentRadius,
        category: activeCategoryFilter,
        subCategory: activeSubCategoryFilter
    };

    if (currentRadius > 0 && document.getElementById('showPlants').checked) {
        Object.values(plants).forEach(plant => {
            const circle = L.circle([plant.lat, plant.lng], {
                radius: currentRadius * 1000,
                color: '#667eea',
                fillColor: '#667eea',
                fillOpacity: 0.15,
                weight: 2
            }).addTo(map);
            coverageCircles.push(circle);
        });
    }

    if (document.getElementById('showDistributors').checked) {
        distributors.forEach(dist => {
            const color = dist.achievement >= 75 ? '#28a745' : 
                         dist.achievement >= 60 ? '#ffc107' : '#dc3545';
            const distIcon = L.divIcon({
                html: `<div style="background: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>`,
                className: '',
                iconSize: [20, 20]
            });

            const marker = L.marker([dist.lat, dist.lng], {icon: distIcon})
                .bindPopup(createDistributorPopup(dist), { maxWidth: 350 })
                .addTo(map);
            
            marker.bindTooltip(`<b>${dist.name}</b><br>${dist.achievement.toFixed(1)}% • ${dist.classification}`, {
                permanent: false,
                direction: 'top'
            });
            
            mapMarkers.push(marker);
        });
    }

    if (document.getElementById('showCoverage').checked) {
        const coverageRadius = parseInt(document.getElementById('coverageRadius').value) || 25;
        distributors.forEach(dist => {
            const circle = L.circle([dist.lat, dist.lng], {
                radius: coverageRadius * 1000,
                color: '#28a745',
                fillColor: '#28a745',
                fillOpacity: 0.08,
                weight: 1
            }).addTo(map);
            
            circle.bindTooltip(
                `<div style="text-align: center;">
                    <b>${dist.name}</b><br>
                    Coverage: ${coverageRadius} KM
                </div>`,
                {
                    permanent: false,
                    direction: 'center'
                }
            );
            
            coverageCircles.push(circle);
        });
    }

    if (document.getElementById('showPOIs').checked && pois.length > 0) {
        let poisInRadius = pois;

        // First filter by radius if active
        if (currentRadius > 0) {
            poisInRadius = poisInRadius.filter(poi => {
                return Object.values(plants).some(plant => {
                    const distance = calculateDistance(poi.Latitude, poi.Longitude, plant.lat, plant.lng);
                    return distance <= currentRadius;
                });
            });
        }

        // Update total POIs in radius
        currentViewStats.totalInRadius = poisInRadius.length;

        // Apply category filter - SUPPORTS MULTIPLE
        let filteredPOIs = poisInRadius;
        if (activeCategoryFilter !== 'all') {
            if (activeCategoryFilter.includes(',')) {
                // Multiple categories selected
                const cats = activeCategoryFilter.split(',');
                filteredPOIs = filteredPOIs.filter(poi => cats.includes(poi.Category));
            } else {
                // Single category
                filteredPOIs = filteredPOIs.filter(poi => poi.Category === activeCategoryFilter);
            }
        }

        // Apply sub-category filter (only if Distribution is selected)
        if (activeCategoryFilter.includes('Distribution') && activeSubCategoryFilter !== 'all') {
            filteredPOIs = filteredPOIs.filter(poi => {
                if (poi.Category === 'Distribution') {
                    return poi.Sub_Category === activeSubCategoryFilter;
                }
                return true; // Keep other categories if multiple selected
            });
        }
        // Store filtered POIs for export
        currentViewPOIs = filteredPOIs;
        currentViewStats.filtered = filteredPOIs.length;

        // Update UI with current stats
        updateCurrentViewStats();

        // Display POIs on map (sample for performance)
        const displayPOIs = filteredPOIs.filter((_, index) => index % 10 === 0);

        displayPOIs.forEach(poi => {
            const color = getMarkerColor(poi.Category);
            const size = poi.Priority === 'High' ? 8 : 5;
            
            const marker = L.circleMarker([poi.Latitude, poi.Longitude], {
                radius: size,
                fillColor: color,
                color: 'white',
                weight: 1,
                fillOpacity: 0.7
            }).bindPopup(createPOIPopup(poi), { maxWidth: 380 })
            .addTo(map);
            
            const tooltipContent = `
                <div style="text-align: center;">
                    <b>${poi.Business_Name || poi.POI_ID}</b><br>
                    <span style="font-size: 11px;">${poi.Sub_Category || poi.Category} • ${poi.City}</span><br>
                    <span style="font-size: 11px; color: #667eea;">${formatNumber(poi.Monthly_Requirement_Liters)} L/month</span>
                </div>
            `;
            marker.bindTooltip(tooltipContent, {
                permanent: false,
                direction: 'top',
                offset: [0, -5]
            });
            
            mapMarkers.push(marker);
        });
    } else {
        updateCurrentViewStats();
    }
    
    // Draw distance lines
    drawPlantDistributorLines();
}

function updateCurrentViewStats() {
    document.getElementById('currentRadiusPOIs').textContent = currentViewStats.totalInRadius.toLocaleString();
    document.getElementById('filteredPOIs').textContent = currentViewStats.filtered.toLocaleString();
    
    // Update active radius display
    if (currentViewStats.radius > 0) {
        document.getElementById('activeRadiusDisplay').textContent = currentViewStats.radius + ' KM';
    } else {
        document.getElementById('activeRadiusDisplay').textContent = 'None (All POIs)';
    }
    
    // Update active filter display
    let filterText = currentViewStats.category === 'all' ? 'All Categories' : currentViewStats.category;
    if (currentViewStats.category === 'Distribution' && currentViewStats.subCategory !== 'all') {
        filterText += ` > ${currentViewStats.subCategory}`;
    }
    document.getElementById('activeFilterDisplay').textContent = filterText;
}

function exportCurrentViewPOIs() {
    if (currentViewPOIs.length === 0) {
        if (pois.length === 0) {
            alert('No POI data available. Please wait for data to load.');
        } else {
            alert('No POIs match the current filters and radius. Please adjust your filters or radius.');
        }
        return;
    }

    // Create descriptive filename
    const radiusText = currentViewStats.radius > 0 ? `${currentViewStats.radius}KM` : 'AllRadius';
    const categoryText = currentViewStats.category === 'all' ? 'AllCategories' : currentViewStats.category.replace(/\s+/g, '_');
    const subCategoryText = currentViewStats.subCategory !== 'all' ? `_${currentViewStats.subCategory.replace(/\s+/g, '_')}` : '';
    const date = new Date().toISOString().split('T')[0];
    
    const filename = `POIs_${radiusText}_${categoryText}${subCategoryText}_${date}.csv`;
    
    // Add export metadata to POIs
    const enrichedPOIs = currentViewPOIs.map(poi => {
        // Find nearest plant for each POI
        const nearestPlant = findNearestPlant(poi.Latitude, poi.Longitude);
        
        return {
            Export_Date: new Date().toISOString(),
            Export_Radius_KM: currentViewStats.radius || 'All',
            Export_Category_Filter: currentViewStats.category,
            Export_SubCategory_Filter: currentViewStats.subCategory !== 'all' ? currentViewStats.subCategory : 'All',
            Nearest_Plant_Name: nearestPlant.name,
            Distance_To_Plant_KM: nearestPlant.distance.toFixed(2),
            ...poi
        };
    });
    
    exportPOIsToCSV(enrichedPOIs, filename);
    
    // Show detailed export confirmation
    const categoryInfo = currentViewStats.category === 'all' ? 'All Categories' : 
                        currentViewStats.subCategory !== 'all' ? 
                        `${currentViewStats.category} > ${currentViewStats.subCategory}` : 
                        currentViewStats.category;
    
    alert(`✅ Export Successful!\n\n` +
          `POIs Exported: ${currentViewPOIs.length.toLocaleString()}\n` +
          `Radius: ${currentViewStats.radius > 0 ? currentViewStats.radius + ' KM' : 'All POIs'}\n` +
          `Filter: ${categoryInfo}\n\n` +
          `File: ${filename}`);
}

function getMarkerColor(category) {
    const colors = {
        'Distribution': '#4ECDC4',
        'Retail': '#FFD93D',
        'Food & Beverage': '#6BCB77',
        'Hospitality': '#FF6B6B',
        'Corporate': '#9D84B7',
        'Healthcare': '#E74C3C'
    };
    return colors[category] || '#95A5A6';
}

function filterDistributors() {
    const perfFilter = document.getElementById('perfFilter').value;
    const cityFilter = document.getElementById('cityFilter').value;
    const classFilter = document.getElementById('classFilter').value;
    
    const filtered = distributors.filter(d => {
        const perfMatch = perfFilter === 'all' || d.rating === perfFilter;
        const cityMatch = cityFilter === 'all' || d.city === cityFilter;
        const classMatch = classFilter === 'all' || d.classification === classFilter;
        return perfMatch && cityMatch && classMatch;
    });
    
    const list = document.getElementById('distributorList');
    list.innerHTML = '';
    
    filtered.forEach((dist) => {
        const item = document.createElement('div');
        item.className = 'distributor-item';
        item.onclick = () => focusOnDistributor(distributors.indexOf(dist));
        
        const badgeClass = 
            dist.rating === 'Excellent' ? 'badge-excellent' :
            dist.rating === 'Good' ? 'badge-good' :
            dist.rating === 'Average' ? 'badge-average' : 'badge-below';
        
        item.innerHTML = `
            <div class="distributor-name">
                ${dist.name}
                <span class="performance-badge ${badgeClass}">
                    ${dist.achievement.toFixed(1)}%
                </span>
            </div>
            <div class="distributor-meta">
                ${dist.city} • ${dist.retailers} retailers • ${dist.classification}
            </div>
        `;
        
        list.appendChild(item);
    });
}

// Filter POIs by Category
function filterPOIsByCategory(category, element) {
    console.log('Filtering by category:', category);
    
    // Remove active class from ALL category filter chips (not sub-category)
    const allChips = document.querySelectorAll('#expansion-tab .control-section:first-child .filter-chip');
    allChips.forEach(chip => {
        chip.classList.remove('active');
    });
    
    // Add active class to clicked element
    element.classList.add('active');
    
    // Update the active filter
    activeCategoryFilter = category;
    
    // Show/hide sub-category filters for Distribution
    const subFilters = document.getElementById('distributionSubFilters');
    if (category === 'Distribution') {
        subFilters.classList.add('active');
        // Reset sub-category filter to 'all'
        activeSubCategoryFilter = 'all';
        // Reset sub-category chips to show 'All Distribution' as active
        document.querySelectorAll('.sub-category-filters .filter-chip').forEach(chip => {
            chip.classList.remove('active');
        });
        document.querySelector('.sub-category-filters .filter-chip').classList.add('active');
    } else {
        subFilters.classList.remove('active');
        activeSubCategoryFilter = 'all';
    }
    
    console.log('Active category:', activeCategoryFilter);
    console.log('Active sub-category:', activeSubCategoryFilter);
    
    // Update the map with new filters
    updateMap();
}

// Filter POIs by Sub-Category (Distribution only)
function filterPOIsBySubCategory(subCategory, element) {
    console.log('Filtering by sub-category:', subCategory);
    
    // Update active filter chip for sub-categories only
    document.querySelectorAll('.sub-category-filters .filter-chip').forEach(chip => {
        chip.classList.remove('active');
    });
    element.classList.add('active');
    
    // Update the active sub-category filter
    activeSubCategoryFilter = subCategory;
    
    console.log('Active sub-category:', activeSubCategoryFilter);
    
    // Update the map with new filters
    updateMap();
}

function showPerformanceReport() {
    const modal = document.getElementById('reportModal');
    const content = document.getElementById('modalContent');
    
    const excellent = distributors.filter(d => d.rating === 'Excellent');
    const good = distributors.filter(d => d.rating === 'Good');
    const average = distributors.filter(d => d.rating === 'Average');
    const below = distributors.filter(d => d.rating === 'Below Average');
    
    // Classification breakdown
    const classifications = {};
    distributors.forEach(d => {
        classifications[d.classification] = (classifications[d.classification] || 0) + 1;
    });
    
    content.innerHTML = `
        <div class="modal-header">📊 Distributor Performance Report</div>
        <div class="report-section">
            <div class="report-title">Performance Summary</div>
            <table>
                <tr><th>Level</th><th>Count</th><th>%</th><th>Sales</th></tr>
                <tr><td>🌟 Excellent (90%+)</td><td>${excellent.length}</td><td>${(excellent.length/distributors.length*100).toFixed(1)}%</td><td>₹${(excellent.reduce((sum, d) => sum + d.sales, 0)/100000).toFixed(1)}L</td></tr>
                <tr><td>✅ Good (75-90%)</td><td>${good.length}</td><td>${(good.length/distributors.length*100).toFixed(1)}%</td><td>₹${(good.reduce((sum, d) => sum + d.sales, 0)/100000).toFixed(1)}L</td></tr>
                <tr><td>⚠️ Average (60-75%)</td><td>${average.length}</td><td>${(average.length/distributors.length*100).toFixed(1)}%</td><td>₹${(average.reduce((sum, d) => sum + d.sales, 0)/100000).toFixed(1)}L</td></tr>
                <tr><td>❌ Below (<60%)</td><td>${below.length}</td><td>${(below.length/distributors.length*100).toFixed(1)}%</td><td>₹${(below.reduce((sum, d) => sum + d.sales, 0)/100000).toFixed(1)}L</td></tr>
            </table>
        </div>
        
        <div class="report-section">
            <div class="report-title">Classification Breakdown</div>
            <table>
                <tr><th>Type</th><th>Count</th><th>% of Total</th></tr>
                ${Object.entries(classifications).map(([type, count]) => `
                    <tr><td>${type}</td><td>${count}</td><td>${(count/distributors.length*100).toFixed(1)}%</td></tr>
                `).join('')}
            </table>
        </div>
    `;
    modal.classList.add('active');
}

function showCoverageGaps() {
    if (pois.length === 0) {
        alert('Please wait for POI data to load first.');
        return;
    }
    
    const wsNeeded = Math.ceil(pois.length / 150);
    const investment = Math.ceil(wsNeeded * 0.6);
    
    alert(`🎯 Coverage Gap Analysis\n\nBased on ${pois.length.toLocaleString()} POIs:\n\n• ${wsNeeded}+ new distributors needed\n• Investment: ₹${investment} Crores\n• Expected ROI: 6-8 months\n\nTop priority areas identified for expansion.`);
}

function showNewWSPlan() {
    alert('⭐ New WS Appointment Plan\n\n• High Priority: 50 locations\n• Medium Priority: 150 locations\n• Low Priority: 300 locations\n\nTotal investment: ₹300Cr\nProjected revenue: ₹150Cr/month');
}

function closeModal() {
    document.getElementById('reportModal').classList.remove('active');
}

function exportPOIsByPlant() {
    if (pois.length === 0) {
        alert('No POI data available. Please wait for data to load.');
        return;
    }
    
    const plantKey = document.getElementById('plantSelect').value;
    if (!plantKey) {
        alert('Please select a plant first.');
        return;
    }
    
    const plant = plants[plantKey];
    const radiusKM = currentRadius > 0 ? currentRadius : 150;
    
    const filteredPOIs = pois.filter(poi => {
        const distance = calculateDistance(poi.Latitude, poi.Longitude, plant.lat, plant.lng);
        return distance <= radiusKM;
    });
    
    if (filteredPOIs.length === 0) {
        alert(`No POIs found within ${radiusKM} KM of ${plant.name}`);
        return;
    }
    
    exportPOIsToCSV(filteredPOIs, `POIs_${plantKey}_${radiusKM}KM_${new Date().toISOString().split('T')[0]}.csv`);
    alert(`✅ Exported ${filteredPOIs.length.toLocaleString()} POIs from ${plant.name} within ${radiusKM} KM radius`);
}

function selectDistributorForPOIExport(index) {
    selectedDistributorForExport = index;
    const dist = distributors[index];
    
    const modal = document.getElementById('reportModal');
    const content = document.getElementById('modalContent');
    
    content.innerHTML = `
        <div class="modal-header">📍 Export POIs Around ${dist.name}</div>
        <div class="report-section">
            <div class="report-title">Select Export Radius</div>
            <p style="margin-bottom: 15px;">Choose the radius around this distributor to export POIs:</p>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 15px;">
                <button class="action-btn" onclick="exportPOIsByDistributor(${index}, 10)">10 KM</button>
                <button class="action-btn" onclick="exportPOIsByDistributor(${index}, 25)">25 KM</button>
                <button class="action-btn" onclick="exportPOIsByDistributor(${index}, 50)">50 KM</button>
                <button class="action-btn" onclick="exportPOIsByDistributor(${index}, 75)">75 KM</button>
                <button class="action-btn" onclick="exportPOIsByDistributor(${index}, 100)">100 KM</button>
                <button class="action-btn" onclick="exportPOIsByDistributor(${index}, 150)">150 KM</button>
            </div>
            <div style="margin-top: 20px;">
                <label style="font-weight: 600; margin-bottom: 8px; display: block;">Custom Radius (KM):</label>
                <div style="display: flex; gap: 10px;">
                    <input type="number" id="distCustomRadius" min="1" max="500" placeholder="Enter radius" style="flex: 1; padding: 10px; border: 2px solid #e0e0e0; border-radius: 6px;">
                    <button class="action-btn" style="flex: 0 0 auto; width: auto; padding: 10px 20px;" onclick="exportPOIsByDistributorCustom(${index})">Export</button>
                </div>
            </div>
        </div>
    `;
    modal.classList.add('active');
}

function exportPOIsByDistributor(index, radiusKM) {
    if (pois.length === 0) {
        alert('No POI data available. Please wait for data to load.');
        return;
    }
    
    const dist = distributors[index];
    
    const filteredPOIs = pois.filter(poi => {
        const distance = calculateDistance(poi.Latitude, poi.Longitude, dist.lat, dist.lng);
        return distance <= radiusKM;
    });
    
    if (filteredPOIs.length === 0) {
        alert(`No POIs found within ${radiusKM} KM of ${dist.name}`);
        return;
    }
    
    const enrichedPOIs = filteredPOIs.map(poi => {
        const distance = calculateDistance(poi.Latitude, poi.Longitude, dist.lat, dist.lng);
        return {
            Distributor_Name: dist.name,
            Distributor_City: dist.city,
            Distributor_Classification: dist.classification,
            Distance_To_Distributor_KM: distance.toFixed(2),
            ...poi
        };
    });
    
    exportPOIsToCSV(enrichedPOIs, `POIs_${dist.name.replace(/[^a-zA-Z0-9]/g, '_')}_${radiusKM}KM_${new Date().toISOString().split('T')[0]}.csv`);
    closeModal();
    alert(`✅ Exported ${filteredPOIs.length.toLocaleString()} POIs within ${radiusKM} KM of ${dist.name}`);
}

function exportPOIsByDistributorCustom(index) {
    const radiusInput = document.getElementById('distCustomRadius');
    const radiusKM = parseInt(radiusInput.value);
    
    if (isNaN(radiusKM) || radiusKM < 1 || radiusKM > 500) {
        alert('Please enter a valid radius between 1 and 500 KM');
        return;
    }
    
    exportPOIsByDistributor(index, radiusKM);
}

function exportDistributors() {
    let csv = 'Name,City,Classification,Retailers,Achievement_%,Rating,Sales,Target,TSM,Nearest_Plant,Distance_To_Plant_KM\n';
    distributors.forEach(d => {
        const nearestPlant = findNearestPlant(d.lat, d.lng);
        csv += `"${d.name}","${d.city}","${d.classification}",${d.retailers},${d.achievement.toFixed(2)},"${d.rating}",${d.sales},${d.target},"${d.tsm}","${nearestPlant.name}",${nearestPlant.distance.toFixed(2)}\n`;
    });
    downloadCSV(csv, 'distributors_with_classification.csv');
}

function populateDistributorDropdown() {
    const select = document.getElementById('distributorSelect');
    
    while (select.options.length > 1) {
        select.remove(1);
    }
    
    const sortedDistributors = [...distributors].sort((a, b) => a.name.localeCompare(b.name));
    
    sortedDistributors.forEach((dist, originalIndex) => {
        const option = document.createElement('option');
        option.value = dist.index;
        option.textContent = `${dist.name} (${dist.city})`;
        select.appendChild(option);
    });
}

function updateDistributorExportInfo() {
    const select = document.getElementById('distributorSelect');
    const infoDiv = document.getElementById('distExportInfo');
    const infoText = document.getElementById('distInfoText');
    
    if (select.value) {
        const distIndex = parseInt(select.value);
        const dist = distributors[distIndex];
        const coverageRadius = parseInt(document.getElementById('coverageRadius').value) || 25;
        
        infoText.innerHTML = `
            <div style="margin-bottom: 3px;">${dist.name}</div>
            <div style="font-size: 11px; color: #666;">${dist.city} • ${dist.classification} • ${coverageRadius} KM radius</div>
        `;
        infoDiv.style.display = 'block';
    } else {
        infoDiv.style.display = 'none';
    }
}

function exportPOIsBySelectedDistributor() {
    const select = document.getElementById('distributorSelect');
    
    if (!select.value) {
        alert('Please select a distributor first.');
        return;
    }
    
    if (pois.length === 0) {
        alert('No POI data available. Please wait for data to load.');
        return;
    }
    
    const distIndex = parseInt(select.value);
    const coverageRadius = parseInt(document.getElementById('coverageRadius').value) || 25;
    
    exportPOIsByDistributor(distIndex, coverageRadius);
}

function exportPOIs() {
    if (pois.length === 0) {
        alert('No POI data available to export. Please wait for data to load.');
        return;
    }
    
    exportPOIsToCSV(pois, `all_pois_export_${new Date().toISOString().split('T')[0]}.csv`);
    alert(`✅ Exported all ${pois.length.toLocaleString()} POIs`);
}

function exportPOIsToCSV(poisArray, filename) {
    if (poisArray.length === 0) {
        alert('No POIs to export');
        return;
    }
    
    const allHeaders = new Set();
    poisArray.forEach(poi => {
        Object.keys(poi).forEach(key => allHeaders.add(key));
    });
    
    const headers = Array.from(allHeaders);
    
    let csv = headers.map(h => `"${h}"`).join(',') + '\n';
    
    poisArray.forEach(poi => {
        const row = headers.map(h => {
            const val = poi[h] !== undefined ? poi[h] : '';
            const strVal = String(val);
            if (strVal.includes(',') || strVal.includes('"') || strVal.includes('\n')) {
                return `"${strVal.replace(/"/g, '""')}"`;
            }
            return strVal;
        });
        csv += row.join(',') + '\n';
    });
    
    downloadCSV(csv, filename);
}

function downloadCSV(csv, filename) {
    const blob = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Simple multiple category selection
let selectedCats = new Set();

function handleCategoryCheck() {
    selectedCats.clear();
    
    // Get checked categories
    document.querySelectorAll('.cat-check input:checked').forEach(cb => {
        selectedCats.add(cb.value);
    });
    
    // Update visual style
    document.querySelectorAll('.cat-check').forEach(label => {
        const cb = label.querySelector('input');
        if (cb.checked) {
            label.style.background = '#667eea';
            label.style.color = 'white';
            label.style.borderColor = '#667eea';
        } else {
            label.style.background = 'white';
            label.style.color = 'black';
            label.style.borderColor = '#ddd';
        }
    });
    
    // Show/hide Distribution subcategories
    const subDiv = document.getElementById('distributionSubFilters');
    if (subDiv) {
        subDiv.style.display = selectedCats.has('Distribution') ? 'block' : 'none';
    }
    
    // Filter POIs
    if (selectedCats.size === 0) {
        activeCategoryFilter = 'all';
    } else {
        activeCategoryFilter = Array.from(selectedCats).join(',');
    }
    
    updateMap();
}

console.log('✅ Multiple category checkboxes ready');



// ============================================================
// CLUSTER ALLOCATION SYSTEM - Kunigal & Harohalli
// ============================================================

const CLUSTERS = {
    kunigal: [
        { name: 'Cluster 1 - Kunigal Central', center: [12.996663, 76.982185], radius: 5 },
        { name: 'Cluster 2 - Kunigal North', center: [13.05, 76.98], radius: 5 },
        { name: 'Cluster 3 - Kunigal South', center: [12.94, 76.98], radius: 5 },
        { name: 'Cluster 4 - Kunigal East', center: [13.00, 77.05], radius: 5 },
        { name: 'Cluster 5 - Kunigal West', center: [13.00, 76.90], radius: 5 },
        { name: 'Cluster 6 - Tumkur Link', center: [13.34, 77.10], radius: 8 },
        { name: 'Cluster 7 - Tiptur', center: [13.25, 76.48], radius: 10 },
        { name: 'Cluster 8 - Sira', center: [13.74, 76.90], radius: 10 }
    ],
    harohalli: [
        { name: 'Cluster 9 - Harohalli Central', center: [12.6795383, 77.4425475], radius: 5 },
        { name: 'Cluster 10 - Harohalli North', center: [12.73, 77.44], radius: 5 },
        { name: 'Cluster 11 - Harohalli South', center: [12.63, 77.44], radius: 5 },
        { name: 'Cluster 12 - Ramanagara', center: [12.72, 77.28], radius: 10 },
        { name: 'Cluster 13 - Kanakapura', center: [12.55, 77.42], radius: 10 },
        { name: 'Cluster 14 - Channapatna', center: [12.65, 77.20], radius: 10 },
        { name: 'Cluster 15 - Bidadi', center: [12.80, 77.38], radius: 8 },
        { name: 'Cluster 16 - Bangalore South', center: [12.85, 77.58], radius: 10 },
        { name: 'Cluster 17 - Bangalore SW', center: [12.90, 77.50], radius: 8 },
        { name: 'Cluster 18 - Bangalore West', center: [12.98, 77.50], radius: 8 },
        { name: 'Cluster 19 - Bangalore NW', center: [13.05, 77.52], radius: 8 },
        { name: 'Cluster 20 - Bangalore Central', center: [12.97, 77.59], radius: 8 },
        { name: 'Cluster 21 - Anekal', center: [12.71, 77.70], radius: 10 },
        { name: 'Cluster 22 - Electronic City', center: [12.84, 77.66], radius: 8 }
    ]
};

function getAllClusters() {
    return [...CLUSTERS.kunigal, ...CLUSTERS.harohalli];
}

function assignPOIsToClusters() {
    const allClusters = getAllClusters();
    const assignments = {};
    
    allClusters.forEach(cluster => {
        assignments[cluster.name] = {
            ...cluster,
            pois: [],
            count: 0
        };
    });
    
    // Assign each POI to nearest cluster
    pois.forEach(poi => {
        let nearestCluster = null;
        let minDistance = Infinity;
        
        allClusters.forEach(cluster => {
            const distance = calculateDistance(
                poi.latitude, poi.longitude,
                cluster.center[0], cluster.center[1]
            );
            
            if (distance < minDistance && distance <= cluster.radius) {
                minDistance = distance;
                nearestCluster = cluster.name;
            }
        });
        
        if (nearestCluster) {
            assignments[nearestCluster].pois.push(poi);
            assignments[nearestCluster].count++;
        }
    });
    
    return assignments;
}

function showClusterAllocation() {
    const assignments = assignPOIsToClusters();
    
    let report = '<h2>📊 Cluster Allocation Report</h2>';
    report += '<div style="max-height: 500px; overflow-y: auto;">';
    
    // Kunigal Clusters
    report += '<h3 style="color: #ff6b6b;">🏭 Kunigal Plant Clusters</h3>';
    CLUSTERS.kunigal.forEach(cluster => {
        const assignment = assignments[cluster.name];
        report += `
            <div style="background: #fff; padding: 12px; margin: 8px 0; border-left: 4px solid #ff6b6b; border-radius: 6px;">
                <div style="font-weight: 600; margin-bottom: 4px;">${cluster.name}</div>
                <div style="font-size: 13px; color: #666;">
                    POIs: <strong>${assignment.count.toLocaleString()}</strong> | 
                    Radius: ${cluster.radius} KM
                </div>
            </div>
        `;
    });
    
    // Harohalli Clusters
    report += '<h3 style="color: #4facfe; margin-top: 20px;">🏭 Harohalli Plant Clusters</h3>';
    CLUSTERS.harohalli.forEach(cluster => {
        const assignment = assignments[cluster.name];
        report += `
            <div style="background: #fff; padding: 12px; margin: 8px 0; border-left: 4px solid #4facfe; border-radius: 6px;">
                <div style="font-weight: 600; margin-bottom: 4px;">${cluster.name}</div>
                <div style="font-size: 13px; color: #666;">
                    POIs: <strong>${assignment.count.toLocaleString()}</strong> | 
                    Radius: ${cluster.radius} KM
                </div>
            </div>
        `;
    });
    
    report += '</div>';
    report += `<button class="action-btn" onclick="exportClusterAllocations()" style="margin-top: 15px;">📥 Export Cluster Allocations</button>`;
    
    document.getElementById('modalContent').innerHTML = report;
    document.getElementById('reportModal').style.display = 'flex';
}

function exportClusterAllocations() {
    const assignments = assignPOIsToClusters();
    
    let csv = 'Cluster Name,Plant,Center Lat,Center Lng,Radius KM,POI Count,POI IDs\n';
    
    Object.values(assignments).forEach(cluster => {
        const plant = cluster.name.includes('Kunigal') || CLUSTERS.kunigal.some(c => c.name === cluster.name) ? 'Kunigal' : 'Harohalli';
        const poiIds = cluster.pois.map(p => p.business_id || p.name).join(';');
        csv += `"${cluster.name}","${plant}",${cluster.center[0]},${cluster.center[1]},${cluster.radius},${cluster.count},"${poiIds}"\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cluster_allocations_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    
    alert(`✅ Exported ${Object.keys(assignments).length} cluster allocations!`);
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

console.log('✅ Cluster allocation system loaded - 22 clusters (8 Kunigal + 14 Harohalli)');

// ============================================================
// INTERACTIVE CLUSTER VISUALIZATION ON MAP
// ============================================================

let clusterLayers = [];
let clusterCirclesVisible = false;

function showClustersOnMap() {
    console.log('🗺️ Drawing clusters on map...');
    
    // Clear existing cluster layers
    clearClustersFromMap();
    
    const allClusters = getAllClusters();
    
    allClusters.forEach((cluster, index) => {
        const isKunigal = index < 8;
        const color = isKunigal ? '#ff6b6b' : '#4facfe';
        
        // Create circle for cluster
        const circle = L.circle(cluster.center, {
            radius: cluster.radius * 1000, // Convert KM to meters
            color: color,
            fillColor: color,
            fillOpacity: 0.1,
            weight: 2,
            opacity: 0.6
        }).addTo(map);
        
        // Count POIs in this cluster
        const poisInCluster = pois.filter(poi => {
            const distance = calculateDistance(
                poi.latitude, poi.longitude,
                cluster.center[0], cluster.center[1]
            );
            return distance <= cluster.radius;
        });
        
        // Create popup content
        const popupContent = `
            <div style="min-width: 200px;">
                <h3 style="margin: 0 0 10px 0; color: ${color}; font-size: 14px;">
                    ${cluster.name}
                </h3>
                <div style="font-size: 12px; margin-bottom: 8px;">
                    📍 Radius: <strong>${cluster.radius} KM</strong><br>
                    📊 POIs: <strong>${poisInCluster.length.toLocaleString()}</strong>
                </div>
                <button onclick="viewClusterPOIs('${cluster.name.replace(/'/g, "\'")}')" 
                        style="width: 100%; padding: 6px; background: ${color}; color: white; 
                               border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">
                    📋 View POIs in this Cluster
                </button>
            </div>
        `;
        
        circle.bindPopup(popupContent);
        
        // Add click handler
        circle.on('click', function() {
            map.fitBounds(circle.getBounds());
        });
        
        // Add label marker at center
        const label = L.marker(cluster.center, {
            icon: L.divIcon({
                className: 'cluster-label',
                html: `<div style="background: ${color}; color: white; padding: 4px 8px; 
                              border-radius: 12px; font-size: 11px; font-weight: bold; 
                              white-space: nowrap; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                          ${cluster.name.replace('Cluster ', 'C')}
                       </div>`,
                iconSize: null
            })
        }).addTo(map);
        
        label.bindPopup(popupContent);
        
        clusterLayers.push(circle);
        clusterLayers.push(label);
    });
    
    clusterCirclesVisible = true;
    console.log(`✅ Drew ${allClusters.length} cluster circles on map`);
}

function clearClustersFromMap() {
    clusterLayers.forEach(layer => {
        map.removeLayer(layer);
    });
    clusterLayers = [];
    clusterCirclesVisible = false;
}

function toggleClustersOnMap() {
    if (clusterCirclesVisible) {
        clearClustersFromMap();
    } else {
        showClustersOnMap();
    }
}

function viewClusterPOIs(clusterName) {
    console.log(`📋 Viewing POIs for ${clusterName}`);
    
    const allClusters = getAllClusters();
    const cluster = allClusters.find(c => c.name === clusterName);
    
    if (!cluster) {
        alert('❌ Cluster not found');
        return;
    }
    
    // Find all POIs in this cluster
    const poisInCluster = pois.filter(poi => {
        const distance = calculateDistance(
            poi.latitude, poi.longitude,
            cluster.center[0], cluster.center[1]
        );
        return distance <= cluster.radius;
    });
    
    // Create detailed view
    let html = `
        <div style="max-height: 500px; overflow-y: auto;">
            <h2 style="color: ${cluster.center[0] < 13 ? '#4facfe' : '#ff6b6b'}; margin-bottom: 10px;">
                ${clusterName}
            </h2>
            
            <div style="background: #f8f9fa; padding: 12px; border-radius: 8px; margin-bottom: 15px;">
                <div style="font-size: 13px;">
                    📍 <strong>Center:</strong> ${cluster.center[0].toFixed(4)}, ${cluster.center[1].toFixed(4)}<br>
                    📏 <strong>Radius:</strong> ${cluster.radius} KM<br>
                    📊 <strong>Total POIs:</strong> ${poisInCluster.length.toLocaleString()}
                </div>
            </div>
            
            <div style="margin-bottom: 15px;">
                <strong>POI Breakdown by Category:</strong>
            </div>
    `;
    
    // Group by category
    const byCategory = {};
    poisInCluster.forEach(poi => {
        const cat = poi.business_category || 'Unknown';
        byCategory[cat] = (byCategory[cat] || 0) + 1;
    });
    
    Object.entries(byCategory).sort((a, b) => b[1] - a[1]).forEach(([cat, count]) => {
        const percentage = (count / poisInCluster.length * 100).toFixed(1);
        html += `
            <div style="background: white; padding: 10px; margin-bottom: 8px; border-left: 4px solid #667eea; border-radius: 4px;">
                <strong>${cat}</strong>: ${count.toLocaleString()} POIs (${percentage}%)
            </div>
        `;
    });
    
    html += `
        <div style="margin-top: 20px;">
            <button class="action-btn" onclick="exportClusterPOIsDetail('${clusterName.replace(/'/g, "\'")}')">
                📥 Export ${clusterName} POIs (CSV)
            </button>
        </div>
        
        <div style="margin-top: 15px;">
            <button class="action-btn" onclick="zoomToCluster('${clusterName.replace(/'/g, "\'")}'); closeModal();" style="background: #28a745;">
                🗺️ Zoom to Cluster on Map
            </button>
        </div>
    `;
    
    html += '</div>';
    
    document.getElementById('modalContent').innerHTML = html;
    document.getElementById('reportModal').style.display = 'flex';
}

function zoomToCluster(clusterName) {
    const allClusters = getAllClusters();
    const cluster = allClusters.find(c => c.name === clusterName);
    
    if (!cluster) return;
    
    // Calculate bounds
    const radiusInDegrees = cluster.radius / 111; // Rough conversion
    const bounds = [
        [cluster.center[0] - radiusInDegrees, cluster.center[1] - radiusInDegrees],
        [cluster.center[0] + radiusInDegrees, cluster.center[1] + radiusInDegrees]
    ];
    
    map.fitBounds(bounds);
    
    // Show cluster circles if not already showing
    if (!clusterCirclesVisible) {
        showClustersOnMap();
    }
}

function exportClusterPOIsDetail(clusterName) {
    const allClusters = getAllClusters();
    const cluster = allClusters.find(c => c.name === clusterName);
    
    if (!cluster) {
        alert('❌ Cluster not found');
        return;
    }
    
    const poisInCluster = pois.filter(poi => {
        const distance = calculateDistance(
            poi.latitude, poi.longitude,
            cluster.center[0], cluster.center[1]
        );
        return distance <= cluster.radius;
    });
    
    let csv = 'Cluster,Business ID,Name,Category,Phone,Address,Latitude,Longitude,Plant,Sales Officer,Google Maps Link\n';
    
    poisInCluster.forEach(poi => {
        const mapsLink = `https://www.google.com/maps?q=${poi.latitude},${poi.longitude}`;
        csv += `"${clusterName}","${poi.business_id || ''}","${poi.name || ''}","${poi.business_category || ''}","${poi.phone_number || ''}","${(poi.address || '').replace(/"/g, '""')}",${poi.latitude},${poi.longitude},"${poi.plant || ''}","${poi.sales_officer || ''}","${mapsLink}"\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${clusterName.replace(/ /g, '_')}_POIs_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    
    alert(`✅ Exported ${poisInCluster.length.toLocaleString()} POIs from ${clusterName}!`);
}

console.log('✅ Interactive cluster visualization loaded');



// ============================================================
// AUTO-DETECT CATEGORIES FROM POI DATA
// ============================================================
function detectAndCreateCategoryFilters() {
    console.log('🔍 Detecting categories from POI data...');
    
    // Get unique categories
    const categoriesSet = new Set();
    pois.forEach(poi => {
        if (poi.business_category) {
            categoriesSet.add(poi.business_category);
        }
    });
    
    const categories = Array.from(categoriesSet).sort();
    console.log(`✅ Found ${categories.length} unique categories:`, categories);
    
    // Find the Expansion tab (where category filters are)
    const expansionTab = document.getElementById('expansion-tab');
    if (!expansionTab) {
        console.log('⚠️  Expansion tab not found');
        return;
    }
    
    // Find the category filters container
    const sectionTitles = expansionTab.querySelectorAll('.section-title');
    let filterContainer = null;
    
    for (let title of sectionTitles) {
        if (title.textContent.includes('POI Category Filters')) {
            filterContainer = title.nextElementSibling;
            break;
        }
    }
    
    if (!filterContainer) {
        console.log('⚠️  Category filters container not found');
        return;
    }
    
    // Clear existing checkboxes
    filterContainer.innerHTML = '';
    
    // Create checkbox for each category
    categories.forEach(category => {
        const label = document.createElement('label');
        label.style.cssText = 'display: inline-flex; align-items: center; padding: 6px 12px; background: white; border: 2px solid #ddd; border-radius: 20px; cursor: pointer; font-size: 13px; transition: all 0.2s;';
        label.className = 'cat-check';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = category;
        checkbox.style.marginRight = '6px';
        checkbox.onchange = handleCategoryCheck;
        
        // Shorten display name if too long
        let displayName = category;
        if (category.length > 25) {
            displayName = category.substring(0, 22) + '...';
        }
        
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(displayName));
        filterContainer.appendChild(label);
    });
    
    console.log(`✅ Category filters updated with ${categories.length} actual categories from data`);
}



// ============================================================
// FIX POI DISPLAY ON MAP
// ============================================================

function displayPOIsOnMap() {
    console.log('🗺️ Displaying POIs on map...');
    
    // Clear existing POI markers
    if (window.poiMarkers) {
        window.poiMarkers.forEach(marker => map.removeLayer(marker));
    }
    window.poiMarkers = [];
    
    // Check if we should show POIs
    const showPOIsCheckbox = document.getElementById('showPOIs');
    if (showPOIsCheckbox && !showPOIsCheckbox.checked) {
        console.log('POIs hidden by user');
        return;
    }
    
    if (!pois || pois.length === 0) {
        console.log('⚠️ No POIs to display');
        return;
    }
    
    console.log(`Displaying ${pois.length.toLocaleString()} POIs...`);
    
    // Get active category filter if any
    let activeCategories = [];
    const categoryCheckboxes = document.querySelectorAll('input[type="checkbox"][value]');
    categoryCheckboxes.forEach(checkbox => {
        if (checkbox.checked && checkbox.value) {
            activeCategories.push(checkbox.value);
        }
    });
    
    // Filter POIs if category filter active
    let displayPOIs = pois;
    if (activeCategories.length > 0) {
        displayPOIs = pois.filter(poi => 
            activeCategories.includes(poi.business_category)
        );
        console.log(`Filtered to ${displayPOIs.length} POIs by category`);
    }
    
    // Limit POIs if too many (for performance)
    const maxPOIsToShow = 5000;
    if (displayPOIs.length > maxPOIsToShow) {
        console.log(`⚠️ Too many POIs (${displayPOIs.length}). Showing first ${maxPOIsToShow}`);
        displayPOIs = displayPOIs.slice(0, maxPOIsToShow);
    }
    
    // Create markers for each POI
    displayPOIs.forEach((poi, index) => {
        if (!poi.latitude || !poi.longitude) return;
        
        // Color by category
        let color = '#667eea';
        if (poi.business_category === 'Retail') color = '#4CAF50';
        else if (poi.business_category === 'HoReCa') color = '#FF9800';
        else if (poi.business_category === 'Institutional') color = '#2196F3';
        else if (poi.business_category === 'Services') color = '#9C27B0';
        else if (poi.business_category === 'Entertainment') color = '#E91E63';
        
        const marker = L.circleMarker([poi.latitude, poi.longitude], {
            radius: 4,
            fillColor: color,
            color: '#fff',
            weight: 1,
            opacity: 0.8,
            fillOpacity: 0.6
        });
        
        // Create popup
        const mapsLink = `https://www.google.com/maps?q=${poi.latitude},${poi.longitude}`;
        const popupContent = `
            <div style="min-width: 200px;">
                <h4 style="margin: 0 0 8px 0; color: ${color};">${poi.name || 'Unknown'}</h4>
                <div style="font-size: 12px;">
                    <strong>Category:</strong> ${poi.business_category || 'N/A'}<br>
                    <strong>Phone:</strong> ${poi.phone_number || 'N/A'}<br>
                    <strong>Address:</strong> ${poi.address || 'N/A'}<br>
                    <strong>Plant:</strong> ${poi.plant || 'N/A'}<br>
                    <strong>Cluster:</strong> ${poi.cluster || 'N/A'}<br>
                    <strong>Officer:</strong> ${poi.sales_officer || 'N/A'}
                </div>
                <a href="${mapsLink}" target="_blank" style="display: inline-block; margin-top: 8px; padding: 4px 8px; background: ${color}; color: white; text-decoration: none; border-radius: 4px; font-size: 11px;">
                    📍 Open in Google Maps
                </a>
            </div>
        `;
        
        marker.bindPopup(popupContent);
        marker.addTo(map);
        window.poiMarkers.push(marker);
    });
    
    console.log(`✅ Displayed ${displayPOIs.length.toLocaleString()} POI markers on map`);
}



console.log('✅ POI display functions loaded');


// ============================================================
// CLEAN POI DISPLAY - NO INFINITE LOOPS
// ============================================================

let poiMarkersLayer = null;

function displayPOIsOnMap() {
    console.log('🗺️ Displaying POIs on map...');
    
    // Remove existing POI layer
    if (poiMarkersLayer) {
        map.removeLayer(poiMarkersLayer);
        poiMarkersLayer = null;
    }
    
    // Check if we should show POIs
    const showPOIsCheckbox = document.getElementById('showPOIs');
    if (showPOIsCheckbox && !showPOIsCheckbox.checked) {
        console.log('POIs hidden by user');
        return;
    }
    
    if (!pois || pois.length === 0) {
        console.log('⚠️ No POIs to display');
        return;
    }
    
    // Get active category filter
    let activeCategories = [];
    const expansionTab = document.getElementById('expansion-tab');
    if (expansionTab) {
        const categoryCheckboxes = expansionTab.querySelectorAll('input[type="checkbox"][value]');
        categoryCheckboxes.forEach(checkbox => {
            if (checkbox.checked && checkbox.value) {
                activeCategories.push(checkbox.value);
            }
        });
    }
    
    // Filter POIs
    let displayPOIs = pois;
    if (activeCategories.length > 0) {
        displayPOIs = pois.filter(poi => 
            activeCategories.includes(poi.business_category)
        );
        console.log(`Filtered to ${displayPOIs.length} POIs by category`);
    }
    
    // Limit for performance - show random sample if too many
    const maxPOIs = 5000;
    if (displayPOIs.length > maxPOIs) {
        console.log(`Sampling ${maxPOIs} POIs from ${displayPOIs.length} total`);
        // Random sample for better distribution
        displayPOIs = displayPOIs.sort(() => 0.5 - Math.random()).slice(0, maxPOIs);
    }
    
    // Create marker cluster group for better performance
    poiMarkersLayer = L.layerGroup();
    
    let successCount = 0;
    displayPOIs.forEach(poi => {
        // Validate coordinates
        if (!poi.latitude || !poi.longitude || 
            isNaN(poi.latitude) || isNaN(poi.longitude) ||
            poi.latitude < -90 || poi.latitude > 90 ||
            poi.longitude < -180 || poi.longitude > 180) {
            return;
        }
        
        try {
            // Color by category
            let color = '#667eea';
            if (poi.business_category === 'Retail') color = '#4CAF50';
            else if (poi.business_category === 'HoReCa') color = '#FF9800';
            else if (poi.business_category === 'Institutional') color = '#2196F3';
            else if (poi.business_category === 'Services') color = '#9C27B0';
            else if (poi.business_category === 'Entertainment') color = '#E91E63';
            
            const marker = L.circleMarker([poi.latitude, poi.longitude], {
                radius: 4,
                fillColor: color,
                color: '#fff',
                weight: 1,
                opacity: 0.8,
                fillOpacity: 0.6
            });
            
            // Create popup
            const mapsLink = `https://www.google.com/maps?q=${poi.latitude},${poi.longitude}`;
            const popupContent = `
                <div style="min-width: 200px;">
                    <h4 style="margin: 0 0 8px 0; color: ${color};">${poi.name || 'Unknown'}</h4>
                    <div style="font-size: 12px;">
                        <strong>Category:</strong> ${poi.business_category || 'N/A'}<br>
                        <strong>Phone:</strong> ${poi.phone_number || 'N/A'}<br>
                        <strong>Plant:</strong> ${poi.plant || 'N/A'}<br>
                        <strong>Cluster:</strong> ${poi.cluster || 'N/A'}
                    </div>
                    <a href="${mapsLink}" target="_blank" style="display: inline-block; margin-top: 8px; padding: 4px 8px; background: ${color}; color: white; text-decoration: none; border-radius: 4px; font-size: 11px;">
                        📍 Open in Maps
                    </a>
                </div>
            `;
            
            marker.bindPopup(popupContent);
            poiMarkersLayer.addLayer(marker);
            successCount++;
        } catch (e) {
            // Skip problematic POIs silently
        }
    });
    
    // Add layer to map
    if (successCount > 0) {
        poiMarkersLayer.addTo(map);
        console.log(`✅ Displayed ${successCount.toLocaleString()} POI markers on map`);
    } else {
        console.log('⚠️ No valid POIs to display');
    }
}

// Call displayPOIs when checkbox changes
function updatePOIDisplay() {
    displayPOIsOnMap();
}

console.log('✅ Clean POI display loaded');


// ============================================================
// ENSURE POIS DISPLAY ON INITIAL LOAD
// ============================================================

function initializePOIDisplay() {
    console.log('🎯 Initializing POI display...');
    
    // Wait for map to be ready
    if (typeof map === 'undefined' || !map) {
        console.log('⏳ Waiting for map...');
        setTimeout(initializePOIDisplay, 500);
        return;
    }
    
    // Wait for POIs to be loaded
    if (!pois || pois.length === 0) {
        console.log('⏳ Waiting for POIs...');
        setTimeout(initializePOIDisplay, 500);
        return;
    }
    
    // Display POIs
    displayPOIsOnMap();
    
    console.log('✅ POI display initialized');
}

// Call this after app initialization
setTimeout(initializePOIDisplay, 1000);


// ============================================================
// FIX CATEGORY CHECKBOX FILTERING
// ============================================================

function handleCategoryCheck() {
    console.log('🔍 Category filter changed');
    
    // Get checked categories
    const checkedCategories = [];
    const checkboxes = document.querySelectorAll('.cat-check input[type="checkbox"]');
    
    checkboxes.forEach(cb => {
        if (cb.checked && cb.value) {
            checkedCategories.push(cb.value);
        }
    });
    
    console.log('Selected categories:', checkedCategories);
    
    // Redisplay POIs with filter
    displayPOIsOnMap();
    
    // Update POI count
    updatePOICount();
}

function updatePOICount() {
    // Get filtered count
    const checkedCategories = [];
    const checkboxes = document.querySelectorAll('.cat-check input[type="checkbox"]');
    
    checkboxes.forEach(cb => {
        if (cb.checked && cb.value) {
            checkedCategories.push(cb.value);
        }
    });
    
    let count = pois.length;
    if (checkedCategories.length > 0) {
        count = pois.filter(poi => checkedCategories.includes(poi.business_category)).length;
    }
    
    // Update display
    const totalPOIsEl = document.getElementById('totalPOIs');
    if (totalPOIsEl) {
        totalPOIsEl.textContent = count.toLocaleString();
    }
    
    console.log(`POI count updated: ${count.toLocaleString()}`);
}


// ============================================================
// FIX DISTRIBUTOR COUNT DISPLAY
// ============================================================

function updateDistributorCount() {
    const count = distributorsData ? distributorsData.length : 24;
    
    // Update in header if exists
    const headerEl = document.querySelector('.header-title');
    if (headerEl) {
        const text = headerEl.textContent;
        // Don't update if it already shows Loading
        if (!text.includes('Loading')) {
            headerEl.textContent = `Water Business Expansion Planning Tool`;
        }
    }
    
    console.log(`Distributor count: ${count}`);
}


// ============================================================
// IMPROVED CLUSTER INTERACTION
// ============================================================

function viewClusterPOIs(clusterName) {
    console.log(`📋 Viewing POIs for ${clusterName}`);
    
    const allClusters = getAllClusters();
    const cluster = allClusters.find(c => c.name === clusterName);
    
    if (!cluster) {
        alert('❌ Cluster not found');
        return;
    }
    
    // Find all POIs in this cluster
    const poisInCluster = pois.filter(poi => {
        const distance = calculateDistance(
            poi.latitude, poi.longitude,
            cluster.center[0], cluster.center[1]
        );
        return distance <= cluster.radius;
    });
    
    const isKunigal = cluster.name.toLowerCase().includes('kunigal') || cluster.center[0] < 13;
    const color = isKunigal ? '#ff6b6b' : '#4facfe';
    
    // Create detailed view
    let html = `
        <div style="max-height: 500px; overflow-y: auto;">
            <h2 style="color: ${color}; margin-bottom: 10px;">
                ${clusterName}
            </h2>
            
            <div style="background: #f8f9fa; padding: 12px; border-radius: 8px; margin-bottom: 15px;">
                <div style="font-size: 13px; line-height: 1.6;">
                    📍 <strong>Center:</strong> ${cluster.center[0].toFixed(4)}, ${cluster.center[1].toFixed(4)}<br>
                    📏 <strong>Radius:</strong> ${cluster.radius} KM<br>
                    📊 <strong>Total POIs:</strong> ${poisInCluster.length.toLocaleString()}
                </div>
            </div>
    `;
    
    // Group by category
    const byCategory = {};
    poisInCluster.forEach(poi => {
        const cat = poi.business_category || 'Unknown';
        byCategory[cat] = (byCategory[cat] || 0) + 1;
    });
    
    html += '<div style="margin-bottom: 15px;"><strong>POI Breakdown:</strong></div>';
    
    Object.entries(byCategory).sort((a, b) => b[1] - a[1]).forEach(([cat, count]) => {
        const percentage = (count / poisInCluster.length * 100).toFixed(1);
        html += `
            <div style="background: white; padding: 10px; margin-bottom: 8px; border-left: 4px solid #667eea; border-radius: 4px;">
                <strong>${cat}</strong>: ${count.toLocaleString()} POIs (${percentage}%)
            </div>
        `;
    });
    
    html += `
        <div style="margin-top: 20px; display: grid; gap: 10px;">
            <button class="action-btn" onclick="exportClusterPOIsDetail('${clusterName.replace(/'/g, "\'")}')">
                📥 Export ${clusterName} POIs
            </button>
            <button class="action-btn" onclick="zoomToCluster('${clusterName.replace(/'/g, "\'")}'); closeModal();" 
                    style="background: #28a745;">
                🗺️ Zoom to Cluster
            </button>
            <button class="action-btn" onclick="highlightClusterPOIs('${clusterName.replace(/'/g, "\'")}')" 
                    style="background: #17a2b8;">
                🎯 Highlight POIs on Map
            </button>
        </div>
    `;
    
    html += '</div>';
    
    document.getElementById('modalContent').innerHTML = html;
    document.getElementById('reportModal').style.display = 'flex';
}

function highlightClusterPOIs(clusterName) {
    console.log(`🎯 Highlighting POIs in ${clusterName}`);
    
    const allClusters = getAllClusters();
    const cluster = allClusters.find(c => c.name === clusterName);
    
    if (!cluster) return;
    
    // Close modal
    closeModal();
    
    // Clear existing POIs
    if (poiMarkersLayer) {
        map.removeLayer(poiMarkersLayer);
    }
    
    // Find POIs in cluster
    const poisInCluster = pois.filter(poi => {
        const distance = calculateDistance(
            poi.latitude, poi.longitude,
            cluster.center[0], cluster.center[1]
        );
        return distance <= cluster.radius;
    });
    
    // Display only these POIs
    poiMarkersLayer = L.layerGroup();
    
    poisInCluster.forEach(poi => {
        if (!poi.latitude || !poi.longitude) return;
        
        const marker = L.circleMarker([poi.latitude, poi.longitude], {
            radius: 6,
            fillColor: '#ff6b6b',
            color: '#fff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8
        });
        
        const mapsLink = `https://www.google.com/maps?q=${poi.latitude},${poi.longitude}`;
        marker.bindPopup(`
            <div style="min-width: 200px;">
                <h4 style="margin: 0 0 8px 0;">${poi.name || 'Unknown'}</h4>
                <div style="font-size: 12px;">
                    <strong>Category:</strong> ${poi.business_category || 'N/A'}<br>
                    <strong>Phone:</strong> ${poi.phone_number || 'N/A'}<br>
                    <strong>Cluster:</strong> ${clusterName}
                </div>
                <a href="${mapsLink}" target="_blank" style="display: inline-block; margin-top: 8px; padding: 4px 8px; background: #ff6b6b; color: white; text-decoration: none; border-radius: 4px; font-size: 11px;">
                    📍 Open in Maps
                </a>
            </div>
        `);
        
        poiMarkersLayer.addLayer(marker);
    });
    
    poiMarkersLayer.addTo(map);
    
    // Zoom to cluster
    zoomToCluster(clusterName);
    
    alert(`✅ Showing ${poisInCluster.length} POIs in ${clusterName}
Click any marker for details`);
}



// ============================================================
// FIXED POI DISPLAY - NO BLOCKING ALERTS, WORKING MAPS LINKS
// ============================================================

if (typeof displayPOIsOnMap !== 'undefined') {
    console.log('Overriding displayPOIsOnMap with fixed version');
}

displayPOIsOnMap = function() {
    console.log('🗺️ Displaying POIs on map...');
    
    // Remove existing POI layer
    if (poiMarkersLayer) {
        map.removeLayer(poiMarkersLayer);
        poiMarkersLayer = null;
    }
    
    // Check if we should show POIs
    const showPOIsCheckbox = document.getElementById('showPOIs');
    if (showPOIsCheckbox && !showPOIsCheckbox.checked) {
        console.log('POIs hidden by checkbox');
        return;
    }
    
    if (!pois || pois.length === 0) {
        console.log('⚠️ No POIs loaded yet');
        return;
    }
    
    // Get active category filter
    let activeCategories = [];
    const expansionTab = document.getElementById('expansion-tab');
    if (expansionTab) {
        const categoryCheckboxes = expansionTab.querySelectorAll('.cat-check input[type="checkbox"]');
        categoryCheckboxes.forEach(checkbox => {
            if (checkbox.checked && checkbox.value) {
                activeCategories.push(checkbox.value);
            }
        });
    }
    
    // Filter POIs
    let displayPOIs = [...pois];
    
    if (activeCategories.length > 0) {
        displayPOIs = displayPOIs.filter(poi => 
            activeCategories.includes(poi.business_category)
        );
        console.log(`Filtered to ${displayPOIs.length} POIs by category`);
    }
    
    // NO BLOCKING ALERT - show all if filter returns nothing
    if (displayPOIs.length === 0 && activeCategories.length > 0) {
        console.log('No POIs match filters - showing all POIs');
        displayPOIs = [...pois];
    }
    
    // Limit for performance
    const maxPOIs = 5000;
    if (displayPOIs.length > maxPOIs) {
        console.log(`Sampling ${maxPOIs} of ${displayPOIs.length} POIs`);
        displayPOIs = displayPOIs.sort(() => 0.5 - Math.random()).slice(0, maxPOIs);
    }
    
    // Create marker layer
    poiMarkersLayer = L.layerGroup();
    
    let successCount = 0;
    displayPOIs.forEach(poi => {
        if (!poi.latitude || !poi.longitude || 
            isNaN(poi.latitude) || isNaN(poi.longitude)) {
            return;
        }
        
        try {
            // Color by cluster/plant assignment
            let color = '#667eea';
            
            if (poi.cluster) {
                const clusterMatch = poi.cluster.match(/\d+/);
                if (clusterMatch) {
                    const clusterNum = parseInt(clusterMatch[0]);
                    if (clusterNum <= 8) {
                        color = '#ff6b6b'; // Kunigal - Red
                    } else {
                        color = '#4facfe'; // Harohalli - Blue
                    }
                }
            } else if (poi.plant) {
                color = poi.plant === 'Kunigal' ? '#ff6b6b' : '#4facfe';
            }
            
            const marker = L.circleMarker([poi.latitude, poi.longitude], {
                radius: 4,
                fillColor: color,
                color: '#fff',
                weight: 1,
                opacity: 0.8,
                fillOpacity: 0.7
            });
            
            // FIXED Google Maps link
            const lat = poi.latitude;
            const lng = poi.longitude;
            const mapsLink = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
            
            const popupContent = `
                <div style="min-width: 220px;">
                    <h4 style="margin: 0 0 10px 0; color: ${color}; font-size: 14px;">
                        ${poi.name || 'Unknown'}
                    </h4>
                    <div style="font-size: 12px; line-height: 1.8;">
                        <div><strong>Category:</strong> ${poi.business_category || 'N/A'}</div>
                        <div><strong>Phone:</strong> ${poi.phone_number || 'Not Available'}</div>
                        <div><strong>Plant:</strong> ${poi.plant || 'N/A'}</div>
                        <div><strong>Cluster:</strong> ${poi.cluster || 'Unassigned'}</div>
                        <div><strong>Officer:</strong> ${poi.sales_officer || 'Vacant'}</div>
                    </div>
                    <a href="${mapsLink}" target="_blank" rel="noopener noreferrer" 
                       style="display: block; margin-top: 10px; padding: 8px; background: ${color}; 
                              color: white; text-decoration: none; border-radius: 6px; 
                              text-align: center; font-weight: 600;">
                        📍 Open in Google Maps
                    </a>
                    <div style="margin-top: 6px; font-size: 10px; color: #666; text-align: center;">
                        ${lat.toFixed(6)}, ${lng.toFixed(6)}
                    </div>
                </div>
            `;
            
            marker.bindPopup(popupContent);
            poiMarkersLayer.addLayer(marker);
            successCount++;
        } catch (e) {
            // Skip bad POI
        }
    });
    
    if (successCount > 0) {
        poiMarkersLayer.addTo(map);
        console.log(`✅ Displayed ${successCount.toLocaleString()} POI markers`);
    }
};

// Color-code by cluster (no circles)
showClusterColorCoding = function() {
    console.log('🎨 POIs color-coded by cluster');
    displayPOIsOnMap();
    alert('POIs color-coded:\n\n🔴 Red = Kunigal (Clusters 1-8)\n🔵 Blue = Harohalli (Clusters 9-22)');
};

// Override cluster circles with color coding
if (typeof showClustersOnMap !== 'undefined') {
    showClustersOnMap = showClusterColorCoding;
}

// Fix distributor count
setTimeout(function() {
    const actualCount = (typeof distributorsData !== 'undefined' && distributorsData) ? distributorsData.length : 24;
    
    document.querySelectorAll('*').forEach(el => {
        if (el.textContent && el.textContent.includes('46 Distributors')) {
            el.textContent = el.textContent.replace('46 Distributors', `${actualCount} Distributors`);
        }
        if (el.textContent && el.textContent.includes('Loading...')) {
            el.textContent = el.textContent.replace('Loading...', '');
        }
    });
    
    console.log(`✅ Updated to ${actualCount} distributors`);
}, 2000);

console.log('✅ All fixes applied - POIs ready to display');
