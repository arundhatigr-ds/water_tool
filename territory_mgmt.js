// ============================================================
// TERRITORY.JS - Territory and Map Management
// ============================================================

// ============================================================
// MAP INITIALIZATION
// ============================================================

function initMap() {
    console.log('🗺️ Initializing map...');
    
    // Calculate center between two plants
    const centerLat = (PLANTS.kunigal.lat + PLANTS.harohalli.lat) / 2;
    const centerLng = (PLANTS.kunigal.lng + PLANTS.harohalli.lng) / 2;
    
    map = L.map('map').setView([centerLat, centerLng], 9);
    
    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);
    
    // Add Kunigal Plant
    L.marker([PLANTS.kunigal.lat, PLANTS.kunigal.lng], {
        icon: L.divIcon({
            className: 'plant-marker',
            html: '<div style="background: #ff6b6b; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; box-shadow: 0 2px 10px rgba(0,0,0,0.3);">🏭</div>',
            iconSize: [30, 30]
        })
    }).addTo(map).bindPopup('<b>Kunigal Plant</b><br>31 KM Coverage');
    
    // Add Harohalli Plant
    L.marker([PLANTS.harohalli.lat, PLANTS.harohalli.lng], {
        icon: L.divIcon({
            className: 'plant-marker',
            html: '<div style="background: #4facfe; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; box-shadow: 0 2px 10px rgba(0,0,0,0.3);">🏭</div>',
            iconSize: [30, 30]
        })
    }).addTo(map).bindPopup('<b>Harohalli Plant</b><br>31 KM Coverage');
    
    // Add coverage circles
    L.circle([PLANTS.kunigal.lat, PLANTS.kunigal.lng], {
        radius: PLANTS.kunigal.radius * 1000,
        color: PLANTS.kunigal.color,
        fillColor: PLANTS.kunigal.color,
        fillOpacity: 0.05,
        weight: 2
    }).addTo(map).bindPopup('Kunigal 31 KM Radius');
    
    L.circle([PLANTS.harohalli.lat, PLANTS.harohalli.lng], {
        radius: PLANTS.harohalli.radius * 1000,
        color: PLANTS.harohalli.color,
        fillColor: PLANTS.harohalli.color,
        fillOpacity: 0.05,
        weight: 2
    }).addTo(map).bindPopup('Harohalli 31 KM Radius');
    
    // Add current distributors
    addDistributorsToMap();
    
    console.log('✅ Map initialized');
}

function addDistributorsToMap() {
    CURRENT_DISTRIBUTORS.forEach(dist => {
        const marker = L.marker([dist.lat, dist.lng], {
            icon: L.divIcon({
                className: 'distributor-marker',
                html: '<div style="background: #ffc107; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>',
                iconSize: [16, 16]
            })
        }).addTo(map);
        
        marker.bindPopup(`
            <b>⭐ ${dist.name}</b><br>
            <small>Current Distributor</small><br>
            TSM: ${dist.tsm}<br>
            Retailers: ${dist.retailers}
        `);
    });
    
    console.log(`✅ Added ${CURRENT_DISTRIBUTORS.length} distributors to map`);
}

// ============================================================
// CLUSTER RENDERING
// ============================================================

function renderClusters() {
    console.log('📊 Rendering clusters...');
    
    // Render Kunigal clusters
    let kunigalHTML = '';
    for (let i = 1; i <= 8; i++) {
        const cluster = KUNIGAL_ALLOCATION[`Cluster${i}`];
        const poiCount = allPOIs.filter(p => p.plant === 'Kunigal' && p.cluster === `Cluster${i}`).length;
        
        kunigalHTML += `
            <div class="cluster-item" onclick="selectCluster('Kunigal', 'Cluster${i}')">
                <div class="cluster-name">Cluster${i} (${cluster.zone})</div>
                <div class="cluster-officer ${cluster.status === 'vacant' ? 'vacant' : ''}">
                    ${cluster.status === 'vacant' ? '⚠️ Vacant' : `👤 ${cluster.officer}`}
                </div>
                <div class="cluster-stats">📍 ${poiCount} POIs</div>
            </div>
        `;
    }
    document.getElementById('kunigalClusters').innerHTML = kunigalHTML;
    
    // Render Harohalli clusters
    let harohalliHTML = '';
    for (let i = 1; i <= 14; i++) {
        const cluster = HAROHALLI_ALLOCATION[`Cluster${i}`];
        const poiCount = allPOIs.filter(p => p.plant === 'Harohalli' && p.cluster === `Cluster${i}`).length;
        
        harohalliHTML += `
            <div class="cluster-item" onclick="selectCluster('Harohalli', 'Cluster${i}')">
                <div class="cluster-name">Cluster${i}</div>
                <div class="cluster-officer ${cluster.status === 'vacant' ? 'vacant' : ''}">
                    ${cluster.status === 'vacant' ? '⚠️ Vacant' : `👤 ${cluster.officer}`}
                </div>
                <div class="cluster-stats">📍 ${poiCount} POIs</div>
            </div>
        `;
    }
    document.getElementById('harohalliClusters').innerHTML = harohalliHTML;
    
    console.log('✅ Clusters rendered');
}

// ============================================================
// CLUSTER SELECTION
// ============================================================

function selectCluster(plant, clusterId) {
    selectedCluster = { plant, clusterId };
    
    const allocation = plant === 'Kunigal' ? KUNIGAL_ALLOCATION[clusterId] : HAROHALLI_ALLOCATION[clusterId];
    const pois = allPOIs.filter(p => p.plant === plant && p.cluster === clusterId);
    
    console.log(`✅ Selected ${plant} ${clusterId} with ${pois.length} POIs`);
    
    // Update cluster info panel
    document.getElementById('clusterInfo').style.display = 'block';
    document.getElementById('selectedClusterName').textContent = `${plant} - ${clusterId}`;
    
    if (allocation.status === 'vacant') {
        document.getElementById('selectedOfficer').innerHTML = 
            `<span style="color: #dc3545;">⚠️ Vacant Position</span>`;
        document.getElementById('vacantAssignment').style.display = 'block';
    } else {
        document.getElementById('selectedOfficer').innerHTML = 
            `👤 ${allocation.officer} | 📞 ${allocation.mobile}`;
        document.getElementById('vacantAssignment').style.display = 'none';
    }
    
    document.getElementById('selectedStats').textContent = `${pois.length} POIs assigned`;
    document.getElementById('exportClusterBtn').style.display = 'block';
    
    // Display POIs
    displayPOIs(pois);
    
    // Zoom to cluster on map
    if (pois.length > 0) {
        const bounds = L.latLngBounds(pois.map(p => [p.latitude, p.longitude]));
        map.fitBounds(bounds, { padding: [50, 50] });
    }
}

// ============================================================
// POI DISPLAY
// ============================================================

function displayPOIs(pois) {
    document.getElementById('poiCount').textContent = `${pois.length} POIs in this cluster`;
    
    let html = '';
    pois.forEach((poi, index) => {
        const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${poi.latitude},${poi.longitude}`;
        
        html += `
            <div class="poi-item">
                <div class="poi-name">${poi.name || 'Unknown Business'}</div>
                <div class="poi-details">
                    📂 ${poi.business_category || 'N/A'}<br>
                    📍 ${poi.address || 'Address not available'}<br>
                    📞 ${poi.phone_number || 'No phone'}<br>
                    📏 ${poi.distance_from_plant_km ? poi.distance_from_plant_km.toFixed(1) : 'N/A'} km from plant
                </div>
                <a href="${googleMapsLink}" target="_blank" class="poi-link">
                    🗺️ Open in Google Maps
                </a>
            </div>
        `;
    });
    
    document.getElementById('poiList').innerHTML = html || 
        '<div style="text-align: center; padding: 20px; color: #999;">No POIs in this cluster</div>';
}

// ============================================================
// OFFICER ASSIGNMENT
// ============================================================

function assignOfficer() {
    const name = document.getElementById('newOfficerName').value.trim();
    const mobile = document.getElementById('newOfficerMobile').value.trim();
    const target = document.getElementById('newOfficerTarget').value.trim();
    
    if (!name) {
        alert('❌ Please enter officer name');
        return;
    }
    
    if (!mobile || mobile.length !== 10) {
        alert('❌ Please enter valid 10-digit mobile number');
        return;
    }
    
    if (!selectedCluster) {
        alert('❌ No cluster selected');
        return;
    }
    
    const { plant, clusterId } = selectedCluster;
    const allocation = plant === 'Kunigal' ? KUNIGAL_ALLOCATION : HAROHALLI_ALLOCATION;
    
    // Store old values for change tracking
    const oldOfficer = allocation[clusterId].officer;
    
    // Update allocation
    allocation[clusterId].officer = name;
    allocation[clusterId].mobile = mobile;
    allocation[clusterId].status = 'assigned';
    allocation[clusterId].target = target || '0';
    
    // Track change
    changes.push({
        timestamp: new Date().toISOString(),
        plant: plant,
        cluster: clusterId,
        action: oldOfficer === 'Vacant' ? 'New Assignment' : 'Reassignment',
        officer: name,
        mobile: mobile,
        target: target || '0',
        previous_officer: oldOfficer
    });
    
    // Clear form
    document.getElementById('newOfficerName').value = '';
    document.getElementById('newOfficerMobile').value = '';
    document.getElementById('newOfficerTarget').value = '';
    document.getElementById('vacantAssignment').style.display = 'none';
    
    // Refresh display
    renderClusters();
    selectCluster(plant, clusterId);
    updateStats();
    
    console.log(`✅ Assigned ${name} to ${plant} ${clusterId}`);
    alert(`✅ Assignment saved!\n\n${name} assigned to ${plant} ${clusterId}\n\nRemember to export changes before logging out.`);
}

function cancelAssignment() {
    document.getElementById('newOfficerName').value = '';
    document.getElementById('newOfficerMobile').value = '';
    document.getElementById('newOfficerTarget').value = '';
    document.getElementById('vacantAssignment').style.display = 'none';
}

// ============================================================
// CHANGE MANAGEMENT
// ============================================================

function reassignCluster(plant, clusterId) {
    const allocation = plant === 'Kunigal' ? KUNIGAL_ALLOCATION[clusterId] : HAROHALLI_ALLOCATION[clusterId];
    
    if (allocation.status === 'vacant') {
        selectCluster(plant, clusterId);
        return;
    }
    
    const confirmed = confirm(
        `Current Assignment:\n\n` +
        `Officer: ${allocation.officer}\n` +
        `Mobile: ${allocation.mobile}\n\n` +
        `Do you want to reassign this cluster?`
    );
    
    if (confirmed) {
        allocation.status = 'vacant';
        allocation.officer = 'Vacant';
        allocation.mobile = '';
        
        renderClusters();
        selectCluster(plant, clusterId);
        
        alert('✅ Cluster marked as vacant. You can now assign a new officer.');
    }
}

// ============================================================
// KEYBOARD SHORTCUTS
// ============================================================

document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + E = Export All
    if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        exportAllData();
    }
    
    // Ctrl/Cmd + S = Export Changes
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        exportChanges();
    }
    
    // Escape = Cancel assignment
    if (e.key === 'Escape') {
        cancelAssignment();
    }
});

// ============================================================
// AUTO-SAVE WARNING
// ============================================================

window.addEventListener('beforeunload', function (e) {
    if (changes.length > 0) {
        e.preventDefault();
        e.returnValue = '';
        return 'You have unsaved changes. Export them before leaving!';
    }
});

console.log('✅ territory.js loaded');

