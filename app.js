// ============================================================
// UPDATED PLANT LOCATIONS - RAMANAGARA & KUNIGAL
// Replace the old plants section in your app.js with this
// ============================================================

// NEW: Two water plants - Ramanagara and Kunigal
const plants = {
    ramanagara: {
        name: 'Ramanagara Plant',
        lat: 12.7209,
        lng: 77.2799,
        radius: 40, // KM
        region: 'Ramanagara-Kanakapura Region',
        coverage: 'Ramanagara, Kanakapura, Channapatna, Bidadi, South Bangalore',
        capacity: '50,000 L/day',
        established: '2024',
        status: 'Active',
        color: '#667eea'
    },
    kunigal: {
        name: 'Kunigal Plant',
        lat: 12.996663,
        lng: 76.982185,
        radius: 40, // KM
        region: 'Kunigal-Tumakuru Region',
        coverage: 'Kunigal, Tumakuru, Huliyar, Koratagere, Madhugiri',
        capacity: '50,000 L/day',
        established: '2024',
        status: 'Active',
        color: '#764ba2'
    }
};

// Plant selection for filtering
let selectedPlant = 'all'; // 'all', 'ramanagara', or 'kunigal'

// ============================================================
// DATA FILE CONFIGURATION FOR NEW PLANTS
// ============================================================

// IMPORTANT: Update this with your new data file
// You'll need to convert your Ramanagara_GOOGLE_ONLY.xlsx to CSV
// and upload it to your GitHub repo
const GITHUB_CONFIG = {
    username: 'arundhatigr-ds',
    repo: 'water_tool',
    branch: 'main',
    // UPDATE THIS: New data file with Ramanagara businesses
    dataFile: 'Ramanagara_Businesses_27K.csv'  // Your 27,000 businesses from Google
};

// Construct the GitHub raw URL
const POI_CSV_URL = `https://raw.githubusercontent.com/${GITHUB_CONFIG.username}/${GITHUB_CONFIG.repo}/${GITHUB_CONFIG.branch}/${GITHUB_CONFIG.dataFile}`;

// ============================================================
// FIELD MAPPING FOR YOUR NEW DATA STRUCTURE
// ============================================================

// Your Ramanagara data has these fields:
// source, business_id, place_id, name, channel, business_category,
// latitude, longitude, address, distance_from_plant_km, nearest_plant,
// plant_region, rating, user_ratings_total, price_level, business_status,
// estimated_monthly_water_liters, estimated_monthly_water_revenue,
// priority_score, water_priority, is_wholesaler, is_chain

function mapRamangaraDataToPOI(row) {
    // Map your new data structure to the POI format the app expects
    return {
        // Core identification
        POI_ID: row.business_id || `POI_${Math.random().toString(36).substr(2, 9)}`,
        Business_Name: row.name || 'Unknown Business',
        
        // Location
        Latitude: parseFloat(row.latitude),
        Longitude: parseFloat(row.longitude),
        Address: row.address || '',
        City: extractCity(row.address) || row.nearest_plant || 'Karnataka',
        State: 'Karnataka',
        
        // Categories
        Category: row.business_category || 'Retail',
        Sub_Category: row.channel || 'general',
        
        // Business details
        Rating: parseFloat(row.rating) || 0,
        Reviews: parseInt(row.user_ratings_total) || 0,
        Price_Level: row.price_level || '',
        Business_Status: row.business_status || 'OPERATIONAL',
        
        // Water business specific
        Monthly_Requirement_Liters: parseInt(row.estimated_monthly_water_liters) || 0,
        Monthly_Revenue_Potential: parseInt(row.estimated_monthly_water_revenue) || 0,
        Priority_Score: parseFloat(row.priority_score) || 5,
        Water_Priority: parseInt(row.water_priority) || 5,
        Is_Wholesaler: row.is_wholesaler === 'Yes' ? 'Yes' : 'No',
        Is_Chain: row.is_chain === 'Yes' ? 'Yes' : 'No',
        
        // Plant association
        Nearest_Plant: row.nearest_plant || 'Ramanagara Plant',
        Distance_To_Plant_KM: parseFloat(row.distance_from_plant_km) || 0,
        Plant_Region: row.plant_region || 'Ramanagara-Kanakapura Region',
        
        // Source tracking
        Data_Source: row.source || 'Google Places',
        Place_ID: row.place_id || '',
        
        // Contact (if available)
        Phone: row.phone || '',
        Website: row.website || ''
    };
}

// Helper function to extract city from address
function extractCity(address) {
    if (!address) return '';
    
    // Common city patterns in your addresses
    const cities = [
        'Ramanagara', 'Kanakapura', 'Channapatna', 'Bidadi', 
        'Kunigal', 'Tumakuru', 'Huliyar', 'Koratagere', 'Madhugiri',
        'Bangalore', 'Bengaluru', 'Mysore', 'Mandya'
    ];
    
    const addressLower = address.toLowerCase();
    for (const city of cities) {
        if (addressLower.includes(city.toLowerCase())) {
            return city;
        }
    }
    
    return '';
}

// ============================================================
// UPDATED PLANT FILTER FUNCTIONS
// ============================================================

function filterPOIsByPlant(poisArray, plantKey) {
    if (plantKey === 'all') {
        return poisArray;
    }
    
    const plant = plants[plantKey];
    if (!plant) return poisArray;
    
    // Filter POIs within the plant's radius
    return poisArray.filter(poi => {
        const distance = calculateDistance(
            poi.Latitude, 
            poi.Longitude, 
            plant.lat, 
            plant.lng
        );
        return distance <= plant.radius;
    });
}

function selectPlantFilter(plantKey) {
    selectedPlant = plantKey;
    
    // Update UI
    document.querySelectorAll('.plant-filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const activeBtn = document.querySelector(`[data-plant="${plantKey}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    // Update map
    updateMap();
    updateStatistics();
}

// ============================================================
// PLANT CIRCLES ON MAP
// ============================================================

let plantCircles = [];

function drawPlantCircles() {
    // Clear existing circles
    plantCircles.forEach(circle => map.removeLayer(circle));
    plantCircles = [];
    
    // Draw circle for each plant
    Object.keys(plants).forEach(key => {
        const plant = plants[key];
        
        const circle = L.circle([plant.lat, plant.lng], {
            color: plant.color,
            fillColor: plant.color,
            fillOpacity: 0.1,
            radius: plant.radius * 1000, // Convert KM to meters
            weight: 2
        }).addTo(map);
        
        // Add plant marker
        const marker = L.marker([plant.lat, plant.lng], {
            icon: L.divIcon({
                className: 'plant-marker',
                html: `
                    <div style="
                        background: ${plant.color};
                        color: white;
                        padding: 8px 12px;
                        border-radius: 20px;
                        font-weight: 700;
                        font-size: 12px;
                        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                        white-space: nowrap;
                    ">
                        🏭 ${plant.name}
                    </div>
                `
            })
        }).addTo(map);
        
        // Popup
        marker.bindPopup(`
            <div style="min-width: 200px;">
                <div style="font-weight: 700; font-size: 14px; margin-bottom: 8px; color: ${plant.color};">
                    🏭 ${plant.name}
                </div>
                <div style="font-size: 12px; line-height: 1.6;">
                    <div><strong>Region:</strong> ${plant.region}</div>
                    <div><strong>Coverage:</strong> ${plant.coverage}</div>
                    <div><strong>Radius:</strong> ${plant.radius} KM</div>
                    <div><strong>Capacity:</strong> ${plant.capacity}</div>
                    <div><strong>Status:</strong> <span style="color: #28a745;">●</span> ${plant.status}</div>
                </div>
                <button 
                    onclick="selectPlantFilter('${key}')" 
                    style="
                        width: 100%;
                        margin-top: 10px;
                        padding: 6px;
                        background: ${plant.color};
                        color: white;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                        font-weight: 600;
                    "
                >
                    View POIs
                </button>
            </div>
        `);
        
        plantCircles.push(circle);
        plantCircles.push(marker);
    });
}

// ============================================================
// UPDATED STATISTICS WITH PLANT BREAKDOWN
// ============================================================

function updateStatistics() {
    const filtered = getFilteredPOIs();
    
    // Overall stats
    const totalPOIs = filtered.length;
    const totalWholesalers = filtered.filter(p => p.Is_Wholesaler === 'Yes').length;
    const totalRevenue = filtered.reduce((sum, p) => sum + (p.Monthly_Revenue_Potential || 0), 0);
    const avgRating = filtered.filter(p => p.Rating > 0).reduce((sum, p) => sum + p.Rating, 0) / 
                      filtered.filter(p => p.Rating > 0).length || 0;
    
    // By plant stats
    const ramangaraPOIs = filtered.filter(p => 
        calculateDistance(p.Latitude, p.Longitude, plants.ramanagara.lat, plants.ramanagara.lng) <= plants.ramanagara.radius
    );
    const kunigalPOIs = filtered.filter(p => 
        calculateDistance(p.Latitude, p.Longitude, plants.kunigal.lat, plants.kunigal.lng) <= plants.kunigal.radius
    );
    
    // Update display
    document.getElementById('totalPOIs').textContent = totalPOIs.toLocaleString();
    document.getElementById('totalWholesalers').textContent = totalWholesalers.toLocaleString();
    document.getElementById('totalRevenue').textContent = `₹${(totalRevenue / 1000).toFixed(0)}K`;
    document.getElementById('avgRating').textContent = avgRating.toFixed(1);
    
    // Plant breakdown
    if (document.getElementById('plantBreakdown')) {
        document.getElementById('plantBreakdown').innerHTML = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 10px;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 12px; border-radius: 8px; color: white;">
                    <div style="font-size: 11px; opacity: 0.9;">Ramanagara Plant</div>
                    <div style="font-size: 20px; font-weight: 700;">${ramangaraPOIs.length.toLocaleString()}</div>
                    <div style="font-size: 10px; opacity: 0.8;">businesses</div>
                </div>
                <div style="background: linear-gradient(135deg, #764ba2 0%, #667eea 100%); padding: 12px; border-radius: 8px; color: white;">
                    <div style="font-size: 11px; opacity: 0.9;">Kunigal Plant</div>
                    <div style="font-size: 20px; font-weight: 700;">${kunigalPOIs.length.toLocaleString()}</div>
                    <div style="font-size: 10px; opacity: 0.8;">businesses</div>
                </div>
            </div>
        `;
    }
}

// ============================================================
// UPDATED DATA LOADING FUNCTION
// ============================================================

async function loadPOIsFromCSV() {
    try {
        console.log('📥 Loading POI data from GitHub...');
        console.log(`URL: ${POI_CSV_URL}`);
        
        const response = await fetch(POI_CSV_URL);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const csvText = await response.text();
        console.log(`✅ Downloaded ${(csvText.length / 1024).toFixed(0)} KB`);
        
        // Parse CSV
        const rows = parseCSV(csvText);
        console.log(`📊 Parsed ${rows.length} rows`);
        
        // Map to POI format
        pois = rows.map(row => mapRamangaraDataToPOI(row)).filter(poi => poi.Latitude && poi.Longitude);
        
        console.log(`✅ Loaded ${pois.length} POIs`);
        console.log(`   Ramanagara: ${pois.filter(p => p.Nearest_Plant === 'Ramanagara Plant').length}`);
        console.log(`   Kunigal: ${pois.filter(p => p.Nearest_Plant === 'Kunigal Plant').length}`);
        console.log(`   Wholesalers: ${pois.filter(p => p.Is_Wholesaler === 'Yes').length}`);
        
        // Initialize map
        initializeMap();
        updateStatistics();
        
    } catch (error) {
        console.error('❌ Error loading POIs:', error);
        alert(`Failed to load POI data: ${error.message}\n\nPlease check:\n1. File exists in GitHub repo\n2. File name is correct\n3. Branch is correct`);
    }
}

// Simple CSV parser
function parseCSV(text) {
    const lines = text.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    
    return lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
        const obj = {};
        headers.forEach((header, i) => {
            obj[header] = values[i] || '';
        });
        return obj;
    });
}

// ============================================================
// EXPORT FUNCTIONS UPDATED FOR NEW PLANTS
// ============================================================

function exportPOIsByPlant(plantKey, radiusKM) {
    const plant = plants[plantKey];
    if (!plant) {
        alert('Invalid plant selection');
        return;
    }
    
    if (pois.length === 0) {
        alert('No POI data available. Please wait for data to load.');
        return;
    }
    
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

console.log('✅ Updated plants configuration loaded: Ramanagara & Kunigal');
