// ============================================================
// TERRITORY MANAGEMENT MODULE
// ============================================================

let territoryDrawControl = null;
let territoryDrawnItems = null;
let currentDrawnTerritory = null;
let territoryEditMode = false;

// ============================================================
// TERRITORY DRAWING FUNCTIONS
// ============================================================

function startDrawingTerritory() {
    if (!map) {
        alert('⚠️ Map not initialized yet. Please wait...');
        return;
    }
    
    // Show drawing info
    document.getElementById('territoryDrawInfo').style.display = 'block';
    
    // Initialize drawing layers if not exists
    if (!territoryDrawnItems) {
        territoryDrawnItems = new L.FeatureGroup();
        map.addLayer(territoryDrawnItems);
        
        // Initialize draw control
        territoryDrawControl = new L.Control.Draw({
            edit: {
                featureGroup: territoryDrawnItems,
                remove: false,
                edit: true
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
                circle: {
                    shapeOptions: {
                        color: '#667eea',
                        weight: 3,
                        opacity: 0.8,
                        fillOpacity: 0.2
                    }
                },
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
            
            // Calculate POIs in this territory
            const poisInTerritory = calculatePOIsInTerritory(layer);
            document.getElementById('territoryPOICount').textContent = poisInTerritory.length;
            
            // Show assignment panel
            document.getElementById('territoryAssignPanel').style.display = 'block';
            document.getElementById('territoryDrawInfo').style.display = 'none';
            
            // Store POIs temporarily
            currentDrawnTerritory.poisInside = poisInTerritory;
            
            // Highlight POIs in territory
            highlightTerritoryPOIs(poisInTerritory);
            
            alert(`✅ Territory drawn successfully!\n\nPOIs found: ${poisInTerritory.length}\n\nPlease fill in the territory details.`);
        });
        
        // Handle edit events
        map.on(L.Draw.Event.EDITED, function(e) {
            const layers = e.layers;
            layers.eachLayer(function(layer) {
                // Recalculate POIs for edited territory
                const territoryIndex = territories.findIndex(t => t.layer === layer);
                if (territoryIndex !== -1) {
                    const poisInTerritory = calculatePOIsInTerritory(layer);
                    territories[territoryIndex].pois = poisInTerritory;
                    territories[territoryIndex].poisCount = poisInTerritory.length;
                    updateTerritoriesList();
                }
            });
        });
    }
    
    alert('✏️ Drawing mode activated!\n\nUse the drawing tools in the top-left corner of the map to:\n- Draw a polygon (click points to create shape)\n- Draw a rectangle (click and drag)\n- Draw a circle (click center and drag radius)');
}

function cancelTerritory() {
    if (currentDrawnTerritory) {
        territoryDrawnItems.removeLayer(currentDrawnTerritory);
        currentDrawnTerritory = null;
    }
    
    document.getElementById('territoryAssignPanel').style.display = 'none';
    document.getElementById('territoryDrawInfo').style.display = 'none';
    
    // Clear form
    document.getElementById('territoryName').value = '';
    document.getElementById('salesPerson').value = '';
    document.getElementById('salesContact').value = '';
    document.getElementById('monthlyTarget').value = '';
    document.getElementById('territoryPOICount').textContent = '0';
    
    // Reset POI highlights
    updatePOIMarkers();
}

// ============================================================
// POI CALCULATION FUNCTIONS
// ============================================================

function calculatePOIsInTerritory(layer) {
    const poisInside = [];
    
    pois.forEach(poi => {
        if (poi.latitude && poi.longitude) {
            const latlng = L.latLng(poi.latitude, poi.longitude);
            
            if (layer instanceof L.Circle) {
                const center = layer.getLatLng();
                const radius = layer.getRadius();
                const distance = latlng.distanceTo(center);
                
                if (distance <= radius) {
                    poisInside.push(poi);
                }
            } else if (layer instanceof L.Polygon || layer instanceof L.Rectangle) {
                if (isPointInPolygon(latlng, layer.getLatLngs()[0])) {
                    poisInside.push(poi);
                }
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

function highlightTerritoryPOIs(poisInTerritory) {
    poiMarkers.forEach((marker, index) => {
        const poi = pois[index];
        if (poisInTerritory.includes(poi)) {
            marker.setStyle({ 
                fillColor: '#ff0000',
                fillOpacity: 1,
                weight: 2
            });
        } else {
            marker.setStyle({ 
                fillOpacity: 0.3,
                weight: 1
            });
        }
    });
}

// ============================================================
// TERRITORY MANAGEMENT FUNCTIONS
// ============================================================

function saveTerritory() {
    const name = document.getElementById('territoryName').value.trim();
    const salesPerson = document.getElementById('salesPerson').value.trim();
    const contact = document.getElementById('salesContact').value.trim();
    const target = document.getElementById('monthlyTarget').value.trim();
    
    if (!name) {
        alert('⚠️ Please enter a territory name!');
        return;
    }
    
    if (!salesPerson) {
        alert('⚠️ Please enter sales officer name!');
        return;
    }
    
    if (!currentDrawnTerritory) {
        alert('⚠️ Please draw a territory first!');
        return;
    }
    
    const poisInTerritory = currentDrawnTerritory.poisInside || [];
    
    // Generate unique color for this territory
    const color = colorPalette[territories.length % colorPalette.length];
    
    // Apply color to the territory
    currentDrawnTerritory.setStyle({
        color: color,
        fillColor: color,
        fillOpacity: 0.3
    });
    
    // Save territory
    const territory = {
        id: 'T' + (territories.length + 1).toString().padStart(3, '0'),
        name: name,
        salesPerson: salesPerson,
        contact: contact,
        monthlyTarget: target || '0',
        poisCount: poisInTerritory.length,
        pois: poisInTerritory,
        layer: currentDrawnTerritory,
        color: color,
        createdAt: new Date().toISOString(),
        totalPotential: poisInTerritory.reduce((sum, poi) => sum + (poi.estimated_monthly_water_liters || 0), 0)
    };
    
    territories.push(territory);
    
    // Update POIs with territory assignment
    poisInTerritory.forEach(poi => {
        poi.assigned_territory = territory.id;
        poi.assigned_officer = salesPerson;
    });
    
    // Clear form and hide panel
    document.getElementById('territoryName').value = '';
    document.getElementById('salesPerson').value = '';
    document.getElementById('salesContact').value = '';
    document.getElementById('monthlyTarget').value = '';
    document.getElementById('territoryPOICount').textContent = '0';
    document.getElementById('territoryAssignPanel').style.display = 'none';
    
    currentDrawnTerritory = null;
    
    // Update displays
    updateTerritoriesList();
    updateOverviewStats();
    updatePOIMarkers();
    
    alert(`✅ Territory saved successfully!\n\n` +
          `ID: ${territory.id}\n` +
          `Name: ${territory.name}\n` +
          `Assigned to: ${territory.salesPerson}\n` +
          `POIs: ${territory.poisCount}\n` +
          `Monthly Potential: ${formatNumber(Math.round(territory.totalPotential))} liters`);
}

function updateTerritoriesList() {
    const listDiv = document.getElementById('territoriesList');
    
    if (territories.length === 0) {
        listDiv.innerHTML = `
            <div style="text-align: center; padding: 20px; color: #999; font-size: 13px;">
                No territories defined yet. Click "Draw New Territory" to start.
            </div>
        `;
        return;
    }
    
    let html = '';
    territories.forEach((territory, index) => {
        const achievement = territory.monthlyTarget > 0 ? 
            Math.round((territory.totalPotential * 500 / territory.monthlyTarget) * 100) : 0; // Assuming ₹500 per 1000L
        
        html += `
            <div class="territory-item" style="border-left-color: ${territory.color};">
                <div class="territory-header">
                    <div>
                        <div class="territory-name">${territory.name}</div>
                        <div class="territory-id">${territory.id}</div>
                    </div>
                    <div style="display: flex; gap: 5px;">
                        <button onclick="viewTerritoryOnMap(${index})" 
                                style="padding: 4px 8px; background: #667eea; color: white; 
                                       border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">
                            🗺️ View
                        </button>
                        <button onclick="editTerritory(${index})" 
                                style="padding: 4px 8px; background: #ffc107; color: #333; 
                                       border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">
                            ✏️ Edit
                        </button>
                        <button onclick="deleteTerritory(${index})" 
                                style="padding: 4px 8px; background: #dc3545; color: white; 
                                       border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">
                            🗑️ Delete
                        </button>
                    </div>
                </div>
                
                <div class="territory-stats">
                    <div class="territory-stat">
                        <div class="territory-stat-label">Sales Officer</div>
                        <div class="territory-stat-value">👤 ${territory.salesPerson}</div>
                    </div>
                    <div class="territory-stat">
                        <div class="territory-stat-label">Contact</div>
                        <div class="territory-stat-value">📞 ${territory.contact || 'N/A'}</div>
                    </div>
                    <div class="territory-stat">
                        <div class="territory-stat-label">POIs</div>
                        <div class="territory-stat-value" style="color: #667eea;">📍 ${territory.poisCount}</div>
                    </div>
                    <div class="territory-stat">
                        <div class="territory-stat-label">Target</div>
                        <div class="territory-stat-value" style="color: #28a745;">₹${formatNumber(territory.monthlyTarget)}</div>
                    </div>
                    <div class="territory-stat">
                        <div class="territory-stat-label">Potential</div>
                        <div class="territory-stat-value">${formatNumber(Math.round(territory.totalPotential))}L</div>
                    </div>
                    <div class="territory-stat">
                        <div class="territory-stat-label">Achievement</div>
                        <div class="territory-stat-value">${achievement}%</div>
                    </div>
                </div>
            </div>
        `;
    });
    
    listDiv.innerHTML = html;
    
    // Update territory count
    document.getElementById('totalTerritories').textContent = territories.length;
}

function viewTerritoryOnMap(index) {
    const territory = territories[index];
    if (territory && territory.layer) {
        // Zoom to territory bounds
        map.fitBounds(territory.layer.getBounds());
        
        // Highlight the territory
        territory.layer.setStyle({
            color: '#ff0000',
            weight: 4,
            fillOpacity: 0.5
        });
        
        // Highlight POIs in territory
        highlightTerritoryPOIs(territory.pois);
        
        setTimeout(() => {
            territory.layer.setStyle({
                color: territory.color,
                weight: 3,
                fillOpacity: 0.3
            });
        }, 3000);
        
        alert(`📍 Viewing: ${territory.name}\n\n` +
              `Assigned to: ${territory.salesPerson}\n` +
              `POIs: ${territory.poisCount}\n` +
              `Monthly Potential: ${formatNumber(Math.round(territory.totalPotential))} liters`);
    }
}

function editTerritory(index) {
    const territory = territories[index];
    
    // Populate form with existing values
    const newName = prompt('Enter new territory name:', territory.name);
    if (newName && newName !== territory.name) {
        territory.name = newName;
    }
    
    const newOfficer = prompt('Enter new sales officer:', territory.salesPerson);
    if (newOfficer && newOfficer !== territory.salesPerson) {
        territory.salesPerson = newOfficer;
        
        // Update POIs with new officer
        territory.pois.forEach(poi => {
            poi.assigned_officer = newOfficer;
        });
    }
    
    const newContact = prompt('Enter new contact number:', territory.contact);
    if (newContact !== null) {
        territory.contact = newContact;
    }
    
    const newTarget = prompt('Enter new monthly target (₹):', territory.monthlyTarget);
    if (newTarget !== null) {
        territory.monthlyTarget = newTarget;
    }
    
    updateTerritoriesList();
    alert('✅ Territory updated successfully!');
}

function deleteTerritory(index) {
    const territory = territories[index];
    
    if (confirm(`⚠️ Delete territory "${territory.name}"?\n\nThis will remove the territory and unassign ${territory.poisCount} POIs.`)) {
        // Remove territory layer from map
        if (territory.layer && territoryDrawnItems) {
            territoryDrawnItems.removeLayer(territory.layer);
        }
        
        // Unassign POIs
        territory.pois.forEach(poi => {
            delete poi.assigned_territory;
            delete poi.assigned_officer;
        });
        
        // Remove from territories array
        territories.splice(index, 1);
        
        // Update displays
        updateTerritoriesList();
        updateOverviewStats();
        updatePOIMarkers();
        
        alert('✅ Territory deleted successfully!');
    }
}

// ============================================================
// EXPORT FUNCTIONS
// ============================================================

function exportTerritories() {
    if (territories.length === 0) {
        alert('⚠️ No territories to export!');
        return;
    }
    
    let csv = 'Territory ID,Territory Name,Sales Officer,Contact,Monthly Target,POIs Count,Monthly Potential (Liters),Created Date\n';
    
    territories.forEach(territory => {
        csv += `"${territory.id}","${territory.name}","${territory.salesPerson}","${territory.contact || ''}","${territory.monthlyTarget}","${territory.poisCount}","${Math.round(territory.totalPotential)}","${territory.createdAt}"\n`;
    });
    
    downloadCSV(csv, `territories_export_${new Date().toISOString().split('T')[0]}.csv`);
    alert(`✅ Exported ${territories.length} territories!`);
}

function exportTerritoryPOIs() {
    if (territories.length === 0) {
        alert('⚠️ No territories to export!');
        return;
    }
    
    let csv = 'Territory ID,Territory Name,Sales Officer,POI Name,Channel,Category,Type,Potential,Distance,Plant,Cluster,Address,Latitude,Longitude,Phone,Monthly Requirement\n';
    
    territories.forEach(territory => {
        territory.pois.forEach(poi => {
            csv += `"${territory.id}","${territory.name}","${territory.salesPerson}","${poi.name || ''}","${poi.channel || ''}","${poi.business_category || ''}","${poi.distributor_type || ''}","${poi.distributor_potential || ''}","${poi.distance_from_plant_km || 0}","${poi.plant || ''}","${poi.cluster || ''}","${poi.address || ''}",${poi.latitude || 0},${poi.longitude || 0},"${poi.phone_number || ''}","${poi.estimated_monthly_water_liters || 0}"\n`;
        });
    });
    
    downloadCSV(csv, `territory_pois_export_${new Date().toISOString().split('T')[0]}.csv`);
    
    let totalPOIs = territories.reduce((sum, t) => sum + t.poisCount, 0);
    alert(`✅ Exported ${totalPOIs} POIs from ${territories.length} territories!`);
}

// ============================================================
// BULK OPERATIONS
// ============================================================

function importTerritories() {
    // Create file input
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.onload = function(event) {
            try {
                const imported = JSON.parse(event.target.result);
                
                if (Array.isArray(imported)) {
                    territories.push(...imported);
                    updateTerritoriesList();
                    alert(`✅ Imported ${imported.length} territories!`);
                } else {
                    alert('⚠️ Invalid file format!');
                }
            } catch (error) {
                alert('⚠️ Error importing territories: ' + error.message);
            }
        };
        
        reader.readAsText(file);
    };
    
    input.click();
}

function clearAllTerritories() {
    if (territories.length === 0) {
        alert('⚠️ No territories to clear!');
        return;
    }
    
    if (confirm(`⚠️ Are you sure you want to delete ALL ${territories.length} territories?\n\nThis action cannot be undone!`)) {
        // Remove all territory layers
        territories.forEach(territory => {
            if (territory.layer && territoryDrawnItems) {
                territoryDrawnItems.removeLayer(territory.layer);
            }
            
            // Unassign POIs
            territory.pois.forEach(poi => {
                delete poi.assigned_territory;
                delete poi.assigned_officer;
            });
        });
        
        // Clear territories array
        territories = [];
        
        // Update displays
        updateTerritoriesList();
        updateOverviewStats();
        updatePOIMarkers();
        
        alert('✅ All territories cleared!');
    }
}

// ============================================================
// AUTO-ALLOCATION FUNCTIONS
// ============================================================

function autoAllocateTerritories() {
    if (pois.length === 0) {
        alert('⚠️ No POIs loaded for auto-allocation!');
        return;
    }
    
    const clusters = [...new Set(pois.map(p => p.cluster))].filter(Boolean);
    
    if (clusters.length === 0) {
        alert('⚠️ No clusters found in POI data!');
        return;
    }
    
    if (confirm(`🤖 Auto-create ${clusters.length} territories based on clusters?\n\nThis will create one territory per cluster.`)) {
        clusters.forEach(cluster => {
            const clusterPOIs = pois.filter(p => p.cluster === cluster);
            
            if (clusterPOIs.length > 0) {
                // Get the sales officer for this cluster (if any)
                const officer = clusterPOIs.find(p => p.sales_officer)?.sales_officer || 'Vacant';
                const contact = clusterPOIs.find(p => p.officer_mobile)?.officer_mobile || '';
                
                // Calculate cluster bounds
                const lats = clusterPOIs.map(p => p.latitude).filter(Boolean);
                const lngs = clusterPOIs.map(p => p.longitude).filter(Boolean);
                
                if (lats.length > 0 && lngs.length > 0) {
                    const bounds = [
                        [Math.min(...lats), Math.min(...lngs)],
                        [Math.max(...lats), Math.max(...lngs)]
                    ];
                    
                    // Create a rectangle for this cluster
                    const rectangle = L.rectangle(bounds, {
                        color: colorPalette[territories.length % colorPalette.length],
                        weight: 3,
                        opacity: 0.8,
                        fillOpacity: 0.2
                    });
                    
                    if (territoryDrawnItems) {
                        territoryDrawnItems.addLayer(rectangle);
                    }
                    
                    // Create territory
                    const territory = {
                        id: 'T' + (territories.length + 1).toString().padStart(3, '0'),
                        name: `${cluster} Territory`,
                        salesPerson: officer,
                        contact: contact,
                        monthlyTarget: '0',
                        poisCount: clusterPOIs.length,
                        pois: clusterPOIs,
                        layer: rectangle,
                        color: colorPalette[territories.length % colorPalette.length],
                        createdAt: new Date().toISOString(),
                        totalPotential: clusterPOIs.reduce((sum, poi) => sum + (poi.estimated_monthly_water_liters || 0), 0)
                    };
                    
                    territories.push(territory);
                }
            }
        });
        
        updateTerritoriesList();
        updateOverviewStats();
        alert(`✅ Auto-created ${territories.length} territories from clusters!`);
    }
}

console.log('✅ Territory Management Module loaded');
