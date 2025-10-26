// ============================================================
// TERRITORY MANAGEMENT SYSTEM - PRODUCTION VERSION
// ============================================================
// Updated for new data structure
// ============================================================

let territories = [];
let currentDrawnTerritory = null;
let territoryDrawControl = null;
let territoryDrawnItems = null;

function startDrawingTerritory() {
    if (!map) {
        alert('❌ Map not initialized yet. Please wait...');
        return;
    }
    
    // Initialize drawing layers
    if (!territoryDrawnItems) {
        territoryDrawnItems = new L.FeatureGroup();
        map.addLayer(territoryDrawnItems);
        
        // Initialize draw control
        territoryDrawControl = new L.Control.Draw({
            edit: {
                featureGroup: territoryDrawnItems,
                remove: false
            },
            draw: {
                polygon: {
                    allowIntersection: false,
                    showArea: true,
                    drawError: {
                        color: '#e1e100',
                        message: '<strong>Error:</strong> Shape edges cannot cross!'
                    },
                    shapeOptions: {
                        color: '#667eea',
                        weight: 3,
                        opacity: 0.8,
                        fillOpacity: 0.2
                    }
                },
                rectangle: {
                    shapeOptions: {
                        color: '#667eea',
                        weight: 3,
                        opacity: 0.8,
                        fillOpacity: 0.2
                    }
                },
                circle: false,
                circlemarker: false,
                marker: false,
                polyline: false
            }
        });
        
        map.addControl(territoryDrawControl);
        
        // Handle draw created event
        map.on(L.Draw.Event.CREATED, function(e) {
            const layer = e.layer;
            currentDrawnTerritory = layer;
            territoryDrawnItems.addLayer(layer);
            
            // Calculate POIs
            const poisInTerritory = calculatePOIsInTerritory(layer);
            document.getElementById('territoryPOICount').textContent = poisInTerritory.length;
            
            // Show panel
            document.getElementById('territoryAssignPanel').style.display = 'block';
            
            alert(`✅ Territory drawn!\n\nPOIs found: ${poisInTerritory.length.toLocaleString()}\n\nPlease fill in the details below.`);
        });
    }
    
    alert('✅ Drawing mode activated!\n\nUse the drawing tools in the top-right corner to draw a polygon or rectangle.');
}

function calculatePOIsInTerritory(layer) {
    const poisInside = [];
    
    pois.forEach(poi => {
        // Use correct field names: latitude, longitude
        if (!poi.latitude || !poi.longitude) return;
        
        const latlng = L.latLng(poi.latitude, poi.longitude);
        
        if (layer instanceof L.Polygon || layer instanceof L.Rectangle) {
            if (isPointInPolygon(latlng, layer.getLatLngs()[0])) {
                poisInside.push(poi);
            }
        }
    });
    
    return poisInside;
}

function isPointInPolygon(point, polygon) {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i].lat, yi = polygon[i].lng;
        const xj = polygon[j].lat, yj = polygon[j].lng;
        
        const intersect = ((yi > point.lng) !== (yj > point.lng))
            && (point.lat < (xj - xi) * (point.lng - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
}

function saveTerritory() {
    const name = document.getElementById('territoryName').value.trim();
    const salesPerson = document.getElementById('salesPerson').value.trim();
    const contact = document.getElementById('salesContact').value.trim();
    const target = document.getElementById('monthlyTarget').value.trim();
    
    if (!name) {
        alert('❌ Please enter a territory name!');
        return;
    }
    
    if (!salesPerson) {
        alert('❌ Please enter sales person name!');
        return;
    }
    
    if (!currentDrawnTerritory) {
        alert('❌ Please draw a territory first!');
        return;
    }
    
    const poisInTerritory = calculatePOIsInTerritory(currentDrawnTerritory);
    
    // Calculate total estimated monthly water
    let totalEstimatedWater = 0;
    poisInTerritory.forEach(poi => {
        if (poi.estimated_monthly_water_liters) {
            totalEstimatedWater += parseFloat(poi.estimated_monthly_water_liters);
        }
    });
    
    // Save territory
    const territory = {
        id: 'T' + (territories.length + 1).toString().padStart(3, '0'),
        name: name,
        salesPerson: salesPerson,
        contact: contact,
        monthlyTarget: target || '0',
        poisCount: poisInTerritory.length,
        estimatedMonthlyWater: totalEstimatedWater,
        pois: poisInTerritory,
        layer: currentDrawnTerritory,
        createdAt: new Date().toISOString()
    };
    
    territories.push(territory);
    
    // Clear form
    document.getElementById('territoryName').value = '';
    document.getElementById('salesPerson').value = '';
    document.getElementById('salesContact').value = '';
    document.getElementById('monthlyTarget').value = '';
    document.getElementById('territoryPOICount').textContent = '0';
    document.getElementById('territoryAssignPanel').style.display = 'none';
    
    currentDrawnTerritory = null;
    
    // Update list
    updateTerritoriesList();
    
    alert(`✅ Territory saved!\n\nID: ${territory.id}\nName: ${territory.name}\nAssigned to: ${territory.salesPerson}\nPOIs: ${territory.poisCount.toLocaleString()}\nEst. Monthly Water: ${totalEstimatedWater.toLocaleString()} L`);
}

function updateTerritoriesList() {
    const listDiv = document.getElementById('territoriesList');
    
    if (territories.length === 0) {
        listDiv.innerHTML = '<div style="text-align: center; padding: 20px; color: #999; font-size: 13px;">No territories defined yet. Click "Draw Territory" to start.</div>';
        return;
    }
    
    let html = '';
    territories.forEach((territory, index) => {
        html += `
            <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 12px; border-left: 4px solid #667eea; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 10px;">
                    <div>
                        <div style="font-size: 14px; font-weight: 700; color: #333;">${territory.name}</div>
                        <div style="font-size: 11px; color: #667eea; font-weight: 600;">${territory.id}</div>
                    </div>
                    <button onclick="deleteTerritory(${index})" style="padding: 4px 8px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">
                        🗑️ Delete
                    </button>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; margin-bottom: 8px;">
                    <div style="background: #f8f9fa; padding: 8px; border-radius: 6px;">
                        <div style="font-size: 10px; color: #666;">Sales Person</div>
                        <div style="font-size: 12px; font-weight: 600;">👤 ${territory.salesPerson}</div>
                    </div>
                    <div style="background: #f8f9fa; padding: 8px; border-radius: 6px;">
                        <div style="font-size: 10px; color: #666;">Contact</div>
                        <div style="font-size: 12px; font-weight: 600;">📞 ${territory.contact || 'N/A'}</div>
                    </div>
                    <div style="background: #f8f9fa; padding: 8px; border-radius: 6px;">
                        <div style="font-size: 10px; color: #666;">POIs</div>
                        <div style="font-size: 12px; font-weight: 600; color: #667eea;">📍 ${territory.poisCount.toLocaleString()}</div>
                    </div>
                    <div style="background: #f8f9fa; padding: 8px; border-radius: 6px;">
                        <div style="font-size: 10px; color: #666;">Est. Monthly Water</div>
                        <div style="font-size: 12px; font-weight: 600; color: #28a745;">${territory.estimatedMonthlyWater.toLocaleString()} L</div>
                    </div>
                </div>
                
                <button onclick="viewTerritoryOnMap(${index})" style="width: 100%; padding: 6px; background: #667eea; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 11px; font-weight: 600;">
                    🗺️ View on Map
                </button>
            </div>
        `;
    });
    
    listDiv.innerHTML = html;
}

function viewTerritoryOnMap(index) {
    const territory = territories[index];
    if (territory && territory.layer) {
        map.fitBounds(territory.layer.getBounds());
        
        territory.layer.setStyle({
            color: '#ff0000',
            weight: 4,
            fillOpacity: 0.3
        });
        
        setTimeout(() => {
            territory.layer.setStyle({
                color: '#667eea',
                weight: 3,
                fillOpacity: 0.2
            });
        }, 2000);
        
        alert(`📍 ${territory.name}\n\n👤 ${territory.salesPerson}\n📍 ${territory.poisCount.toLocaleString()} POIs\n💧 ${territory.estimatedMonthlyWater.toLocaleString()} L/month`);
    }
}

function deleteTerritory(index) {
    const territory = territories[index];
    
    if (confirm(`Delete territory "${territory.name}"?\n\nThis will remove the territory assignment.`)) {
        territories.splice(index, 1);
        updateTerritoriesList();
        alert('✅ Territory deleted!');
    }
}

function exportTerritories() {
    if (territories.length === 0) {
        alert('❌ No territories to export!');
        return;
    }
    
    let csv = 'Territory ID,Territory Name,Sales Person,Contact,POIs Count,Est. Monthly Water (L),Created Date\n';
    
    territories.forEach(territory => {
        csv += `"${territory.id}","${territory.name}","${territory.salesPerson}","${territory.contact || ''}",${territory.poisCount},${territory.estimatedMonthlyWater},"${territory.createdAt}"\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `territories_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    
    alert(`✅ Exported ${territories.length} territories!`);
}

function exportTerritoryPOIs() {
    if (territories.length === 0) {
        alert('❌ No territories to export!');
        return;
    }
    
    let csv = 'Territory ID,Territory Name,Sales Person,Business ID,Name,Category,Phone,Address,Latitude,Longitude,Plant,Cluster,Est. Monthly Water (L),Google Maps\n';
    
    territories.forEach(territory => {
        territory.pois.forEach(poi => {
            const mapsLink = poi.google_maps_url || `https://www.google.com/maps/search/?api=1&query=${poi.latitude},${poi.longitude}`;
            csv += `"${territory.id}","${territory.name}","${territory.salesPerson}","${poi.business_id || ''}","${poi.name || ''}","${poi.business_category || ''}","${poi.phone_number || ''}","${(poi.address || '').replace(/"/g, '""')}",${poi.latitude},${poi.longitude},"${poi.plant || ''}","${poi.cluster || ''}",${poi.estimated_monthly_water_liters || 0},"${mapsLink}"\n`;
        });
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `territory_pois_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    
    let totalPOIs = territories.reduce((sum, t) => sum + t.poisCount, 0);
    alert(`✅ Exported ${totalPOIs.toLocaleString()} POIs from ${territories.length} territories!`);
}

console.log('✅ Territory Management System loaded');
