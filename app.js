
// ============================================================
// SIMPLE LOGIN FUNCTION (BUTTON-BASED)
// ============================================================

function doLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    console.log('🔐 Login attempt:', username);
    
    if (username === 'admin' && password === 'admin2024!') {
        console.log('✅ Credentials correct');
        
        // Hide login screen
        const loginScreen = document.getElementById('loginScreen');
        if (loginScreen) {
            loginScreen.style.display = 'none';
            console.log('✅ Login screen hidden');
        } else {
            console.error('❌ loginScreen element not found');
        }
        
        // Show app
        const appContainer = document.getElementById('app');
        if (appContainer) {
            appContainer.style.display = 'flex';
            console.log('✅ App container shown');
        } else {
            console.error('❌ app element not found');
        }
        
        // Initialize
        console.log('🚀 Initializing app...');
        setTimeout(initializeApp, 200);
    } else {
        console.log('❌ Invalid credentials');
        alert('❌ Invalid credentials!\n\nUse: admin / admin2024!');
    }
}

// ============================================================
// WATER BUSINESS EXPANSION TOOL - PRODUCTION VERSION
// ============================================================
// Complete application logic with all fixes
// Version: 2.0 - Production Ready
// ============================================================

// Global variables
let map;
let pois = [];
let poisLoaded = false;
let poiMarkersLayer = null;
let distributorsData = [];

// Plant locations
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

// 24 Distributors
const DISTRIBUTORS = [
    {name: 'Bangalore City Distributor 1', city: 'Bangalore', lat: 12.9716, lng: 77.5946, retailers: 150, tsm: 'Rajesh Kumar', classification: 'Premium'},
    {name: 'Bangalore South Distributor', city: 'Bangalore', lat: 12.9141, lng: 77.6223, retailers: 120, tsm: 'Priya Sharma', classification: 'Standard'},
    {name: 'Electronic City Distributor', city: 'Bangalore', lat: 12.8452, lng: 77.6763, retailers: 100, tsm: 'Amit Patel', classification: 'Standard'},
    {name: 'Whitefield Distributor', city: 'Bangalore', lat: 12.9698, lng: 77.7500, retailers: 90, tsm: 'Deepak Singh', classification: 'Standard'},
    {name: 'HSR Layout Distributor', city: 'Bangalore', lat: 12.9121, lng: 77.6446, retailers: 85, tsm: 'Lakshmi Reddy', classification: 'Premium'},
    {name: 'Jayanagar Distributor', city: 'Bangalore', lat: 12.9250, lng: 77.5838, retailers: 95, tsm: 'Karthik Rao', classification: 'Standard'},
    {name: 'Indiranagar Distributor', city: 'Bangalore', lat: 12.9719, lng: 77.6412, retailers: 88, tsm: 'Suresh Babu', classification: 'Premium'},
    {name: 'Koramangala Distributor', city: 'Bangalore', lat: 12.9352, lng: 77.6245, retailers: 110, tsm: 'Anita Desai', classification: 'Premium'},
    {name: 'Malleshwaram Distributor', city: 'Bangalore', lat: 13.0059, lng: 77.5706, retailers: 92, tsm: 'Vijay Kumar', classification: 'Standard'},
    {name: 'Rajajinagar Distributor', city: 'Bangalore', lat: 12.9920, lng: 77.5556, retailers: 87, tsm: 'Manjula Hegde', classification: 'Standard'},
    {name: 'Ramanagara Distributor', city: 'Ramanagara', lat: 12.7177, lng: 77.2807, retailers: 75, tsm: 'Ramesh Gowda', classification: 'Standard'},
    {name: 'Kanakapura Distributor', city: 'Kanakapura', lat: 12.5464, lng: 77.4211, retailers: 65, tsm: 'Srinivas Murthy', classification: 'Basic'},
    {name: 'Channapatna Distributor', city: 'Channapatna', lat: 12.6515, lng: 77.2072, retailers: 70, tsm: 'Nagaraj P', classification: 'Standard'},
    {name: 'Bidadi Distributor', city: 'Bidadi', lat: 12.7990, lng: 77.3818, retailers: 60, tsm: 'Shivakumar B', classification: 'Basic'},
    {name: 'Harohalli Distributor', city: 'Harohalli', lat: 12.6795, lng: 77.4425, retailers: 55, tsm: 'Khadeer Ali', classification: 'Basic'},
    {name: 'Kunigal Distributor 1', city: 'Kunigal', lat: 12.9967, lng: 76.9822, retailers: 80, tsm: 'Nagaraj P', classification: 'Standard'},
    {name: 'Kunigal Distributor 2', city: 'Kunigal', lat: 13.0234, lng: 76.9678, retailers: 72, tsm: 'Rajshekhar J', classification: 'Standard'},
    {name: 'Tumkur Distributor', city: 'Tumkur', lat: 13.3409, lng: 77.1034, retailers: 95, tsm: 'Vinod Kumar KJ', classification: 'Standard'},
    {name: 'Tiptur Distributor', city: 'Tiptur', lat: 13.2555, lng: 76.4778, retailers: 68, tsm: 'Srikantha B N', classification: 'Basic'},
    {name: 'Sira Distributor', city: 'Sira', lat: 13.7391, lng: 76.8968, retailers: 58, tsm: 'Prakash Naik', classification: 'Basic'},
    {name: 'Magadi Distributor', city: 'Magadi', lat: 12.9564, lng: 77.2250, retailers: 62, tsm: 'Mahesh Kumar', classification: 'Basic'},
    {name: 'Nelamangala Distributor', city: 'Nelamangala', lat: 13.0993, lng: 77.3865, retailers: 78, tsm: 'Vasanth Raj', classification: 'Standard'},
    {name: 'Devanahalli Distributor', city: 'Devanahalli', lat: 13.2410, lng: 77.7117, retailers: 71, tsm: 'Naveen Kumar', classification: 'Standard'},
    {name: 'Yelahanka Distributor', city: 'Yelahanka', lat: 13.1007, lng: 77.5963, retailers: 83, tsm: 'Ashwini Kulkarni', classification: 'Standard'}
];

distributorsData = DISTRIBUTORS;

// ============================================================
// INITIALIZATION
// ============================================================

async function initializeApp() {
    console.log('🚀 Initializing Water Business Expansion Tool...');
    
    // Initialize map
    initializeMap();
    
    // Load POI data
    await loadPOIData();
    
    // Add plants to map
    addPlantsToMap();
    
    // Add distributors to map
    addDistributorsToMap();
    
    // Initialize tab switching
    initializeTabs();
    
    console.log(`✅ App Initialized: ${distributorsData.length} Distributors`);
}

function initializeMap() {
    map = L.map('map').setView([12.85, 77.25], 9);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    console.log('✅ Map initialized');
}

async function loadPOIData() {
    console.log('📂 Loading POI data...');
    
    if (typeof POI_DATA !== 'undefined' && POI_DATA.length > 0) {
        pois = POI_DATA;
        poisLoaded = true;
        
        console.log(`✅ Loaded ${pois.length.toLocaleString()} POIs from data.js`);
        
        // Update UI
        const statusEl = document.getElementById('poiStatusText');
        if (statusEl) {
            statusEl.innerHTML = `${pois.length.toLocaleString()} POIs loaded from Kunigal & Harohalli`;
        }
        
        const totalEl = document.getElementById('totalPOIs');
        if (totalEl) {
            totalEl.textContent = pois.length.toLocaleString();
        }
        
        // Auto-detect and create category filters
        detectAndCreateCategoryFilters();
        
        // Display POIs after a short delay
        setTimeout(() => {
            displayPOIsOnMap();
        }, 1000);
        
        return pois;
    } else {
        console.error('❌ POI_DATA not found');
        alert('❌ POI data not loaded. Please ensure data.js is included.');
        return [];
    }
}

function addPlantsToMap() {
    // Kunigal Plant
    const kunigalMarker = L.marker([PLANTS.kunigal.lat, PLANTS.kunigal.lng], {
        icon: L.divIcon({
            className: 'plant-marker',
            html: '<div style="background: #ff6b6b; color: white; padding: 8px 12px; border-radius: 20px; font-weight: bold; font-size: 14px; box-shadow: 0 4px 8px rgba(0,0,0,0.3);">K</div>',
            iconSize: [40, 40]
        })
    }).addTo(map);
    
    kunigalMarker.bindPopup(`
        <div style="text-align: center;">
            <h3 style="color: #ff6b6b; margin: 0 0 10px 0;">Kunigal Plant</h3>
            <div style="font-size: 12px;">
                <strong>Coverage:</strong> ${PLANTS.kunigal.radius} KM radius<br>
                <strong>POIs:</strong> 8,045
            </div>
        </div>
    `);
    
    // Harohalli Plant
    const harohalliMarker = L.marker([PLANTS.harohalli.lat, PLANTS.harohalli.lng], {
        icon: L.divIcon({
            className: 'plant-marker',
            html: '<div style="background: #4facfe; color: white; padding: 8px 12px; border-radius: 20px; font-weight: bold; font-size: 14px; box-shadow: 0 4px 8px rgba(0,0,0,0.3);">H</div>',
            iconSize: [40, 40]
        })
    }).addTo(map);
    
    harohalliMarker.bindPopup(`
        <div style="text-align: center;">
            <h3 style="color: #4facfe; margin: 0 0 10px 0;">Harohalli Plant</h3>
            <div style="font-size: 12px;">
                <strong>Coverage:</strong> ${PLANTS.harohalli.radius} KM radius<br>
                <strong>POIs:</strong> 19,755
            </div>
        </div>
    `);
    
    console.log('✅ Plants added to map');
}

function addDistributorsToMap() {
    distributorsData.forEach((dist, index) => {
        const marker = L.marker([dist.lat, dist.lng], {
            icon: L.divIcon({
                className: 'distributor-marker',
                html: '<div style="background: #fbbf24; color: white; padding: 6px; border-radius: 50%; font-weight: bold; font-size: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.3); width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;">D</div>',
                iconSize: [24, 24]
            })
        }).addTo(map);
        
        marker.bindPopup(`
            <div style="min-width: 200px;">
                <h4 style="margin: 0 0 8px 0; color: #fbbf24;">${dist.name}</h4>
                <div style="font-size: 12px;">
                    <strong>City:</strong> ${dist.city}<br>
                    <strong>Retailers:</strong> ${dist.retailers}<br>
                    <strong>TSM:</strong> ${dist.tsm}<br>
                    <strong>Classification:</strong> ${dist.classification}
                </div>
            </div>
        `);
    });
    
    console.log(`✅ Added ${distributorsData.length} distributors to map`);
}

// ============================================================
// POI DISPLAY - PRODUCTION VERSION
// ============================================================

function displayPOIsOnMap() {
    console.log('🗺️ Displaying POIs on map...');
    
    // Remove existing layer
    if (poiMarkersLayer) {
        map.removeLayer(poiMarkersLayer);
        poiMarkersLayer = null;
    }
    
    // Check POI checkbox
    const showPOIsCheckbox = document.getElementById('showPOIs');
    if (showPOIsCheckbox && !showPOIsCheckbox.checked) {
        console.log('POIs hidden by user');
        return;
    }
    
    if (!pois || pois.length === 0) {
        console.log('⚠️ No POIs to display');
        return;
    }
    
    // Get category filters
    let activeCategories = [];
    const expansionTab = document.getElementById('expansion-tab');
    if (expansionTab) {
        const checkboxes = expansionTab.querySelectorAll('.cat-check input[type="checkbox"]');
        checkboxes.forEach(cb => {
            if (cb.checked && cb.value) {
                activeCategories.push(cb.value);
            }
        });
    }
    
    // Filter POIs
    let displayPOIs = [...pois];
    if (activeCategories.length > 0) {
        displayPOIs = displayPOIs.filter(poi => 
            activeCategories.includes(poi.business_category)
        );
        console.log(`Filtered to ${displayPOIs.length} POIs`);
    }
    
    // Limit for performance (random sample)
    const maxPOIs = 5000;
    if (displayPOIs.length > maxPOIs) {
        console.log(`Sampling ${maxPOIs} of ${displayPOIs.length} POIs`);
        displayPOIs = displayPOIs.sort(() => 0.5 - Math.random()).slice(0, maxPOIs);
    }
    
    // Create layer
    poiMarkersLayer = L.layerGroup();
    
    let successCount = 0;
    displayPOIs.forEach(poi => {
        // Validate coordinates
        if (!poi.latitude || !poi.longitude || 
            isNaN(poi.latitude) || isNaN(poi.longitude)) {
            return;
        }
        
        try {
            // Color by plant/cluster
            let color = '#667eea';
            if (poi.plant === 'Kunigal') {
                color = '#ff6b6b';
            } else if (poi.plant === 'Harohalli') {
                color = '#4facfe';
            }
            
            const marker = L.circleMarker([poi.latitude, poi.longitude], {
                radius: 4,
                fillColor: color,
                color: '#fff',
                weight: 1,
                opacity: 0.8,
                fillOpacity: 0.7
            });
            
            // Popup with working Google Maps link
            const mapsLink = poi.google_maps_url || `https://www.google.com/maps/search/?api=1&query=${poi.latitude},${poi.longitude}`;
            
            const popupContent = `
                <div style="min-width: 220px;">
                    <h4 style="margin: 0 0 10px 0; color: ${color};">${poi.name || 'Unknown'}</h4>
                    <div style="font-size: 12px; line-height: 1.8;">
                        <div><strong>Category:</strong> ${poi.business_category || 'N/A'}</div>
                        <div><strong>Phone:</strong> ${poi.phone_number || 'Not Available'}</div>
                        <div><strong>Plant:</strong> ${poi.plant || 'N/A'}</div>
                        <div><strong>Cluster:</strong> ${poi.cluster || 'N/A'}</div>
                        <div><strong>Officer:</strong> ${poi.sales_officer || 'Vacant'}</div>
                        ${poi.estimated_monthly_water_liters ? `<div><strong>Est. Monthly:</strong> ${parseInt(poi.estimated_monthly_water_liters).toLocaleString()} L</div>` : ''}
                    </div>
                    <a href="${mapsLink}" target="_blank" rel="noopener noreferrer" 
                       style="display: block; margin-top: 10px; padding: 8px; background: ${color}; 
                              color: white; text-decoration: none; border-radius: 6px; 
                              text-align: center; font-weight: 600; font-size: 12px;">
                        📍 Open in Google Maps
                    </a>
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
}

// ============================================================
// CATEGORY FILTERS
// ============================================================

function detectAndCreateCategoryFilters() {
    console.log('🔍 Detecting categories...');
    
    const categoriesSet = new Set();
    pois.forEach(poi => {
        if (poi.business_category) {
            categoriesSet.add(poi.business_category);
        }
    });
    
    const categories = Array.from(categoriesSet).sort();
    console.log(`✅ Found ${categories.length} categories:`, categories);
    
    // Find container
    const expansionTab = document.getElementById('expansion-tab');
    if (!expansionTab) return;
    
    const sectionTitles = expansionTab.querySelectorAll('.section-title');
    let filterContainer = null;
    
    for (let title of sectionTitles) {
        if (title.textContent.includes('POI Category Filters')) {
            filterContainer = title.nextElementSibling;
            break;
        }
    }
    
    if (!filterContainer) return;
    
    // Clear and rebuild
    filterContainer.innerHTML = '';
    
    categories.forEach(category => {
        const label = document.createElement('label');
        label.style.cssText = 'display: inline-flex; align-items: center; padding: 6px 12px; background: white; border: 2px solid #ddd; border-radius: 20px; cursor: pointer; font-size: 13px; transition: all 0.2s;';
        label.className = 'cat-check';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = category;
        checkbox.style.marginRight = '6px';
        checkbox.onchange = handleCategoryCheck;
        
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(category));
        filterContainer.appendChild(label);
    });
    
    console.log('✅ Category filters created');
}

function handleCategoryCheck() {
    console.log('🔍 Category filter changed');
    displayPOIsOnMap();
}

// ============================================================
// TAB SWITCHING
// ============================================================

function initializeTabs() {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');
            
            // Remove active from all
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(tc => tc.classList.remove('active'));
            
            // Add active to clicked
            tab.classList.add('active');
            const targetContent = document.getElementById(`${targetTab}-tab`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    
    console.log('✅ Tab switching initialized');
}

// ============================================================
// MODAL FUNCTIONS
// ============================================================

function closeModal() {
    document.getElementById('reportModal').style.display = 'none';
}

// ============================================================
// EXPORT FUNCTIONS
// ============================================================

function exportDistributors() {
    let csv = 'Name,City,Latitude,Longitude,Retailers,TSM,Classification\n';
    
    distributorsData.forEach(dist => {
        csv += `"${dist.name}","${dist.city}",${dist.lat},${dist.lng},${dist.retailers},"${dist.tsm}","${dist.classification}"\n`;
    });
    
    downloadCSV(csv, `distributors_${getDateStamp()}.csv`);
    alert(`✅ Exported ${distributorsData.length} distributors!`);
}

function exportPOIs() {
    let csv = 'Business ID,Name,Category,Phone,Address,Latitude,Longitude,Plant,Cluster,Sales Officer,Google Maps\n';
    
    pois.forEach(poi => {
        const mapsLink = poi.google_maps_url || `https://www.google.com/maps/search/?api=1&query=${poi.latitude},${poi.longitude}`;
        csv += `"${poi.business_id || ''}","${poi.name || ''}","${poi.business_category || ''}","${poi.phone_number || ''}","${(poi.address || '').replace(/"/g, '""')}",${poi.latitude},${poi.longitude},"${poi.plant || ''}","${poi.cluster || ''}","${poi.sales_officer || ''}","${mapsLink}"\n`;
    });
    
    downloadCSV(csv, `all_pois_${getDateStamp()}.csv`);
    alert(`✅ Exported ${pois.length.toLocaleString()} POIs!`);
}

function downloadCSV(csvContent, filename) {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function getDateStamp() {
    return new Date().toISOString().split('T')[0];
}

// ============================================================
// START APPLICATION
// ============================================================

window.addEventListener('DOMContentLoaded', () => {
    console.log('📱 DOM loaded, waiting for login...');
});

function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === 'admin' && password === 'admin2024!') {
        // Use correct IDs from HTML: loginScreen and app
        const loginScreen = document.getElementById('loginScreen');
        const appContainer = document.getElementById('app');
        
        if (loginScreen) {
            loginScreen.style.display = 'none';
        }
        
        if (appContainer) {
            appContainer.style.display = 'flex';
        }
        
        console.log('✅ Login successful');
        
        // Initialize app after a short delay
        setTimeout(initializeApp, 100);
    } else {
        alert('❌ Invalid credentials! Use admin / admin2024!');
    }
}

console.log('✅ Production app.js loaded');
