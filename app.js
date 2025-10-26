// SIMPLE WATER TOOL - CLEAN VERSION
let map, pois = [], poiLayer, plantLayer, distLayer;

const PLANTS = {
    kunigal: {lat: 12.996663, lng: 76.982185},
    harohalli: {lat: 12.6795383, lng: 77.4425475}
};

const DISTS = [
    {name:'Bangalore City 1',lat:12.9716,lng:77.5946,retailers:150},
    {name:'Bangalore South',lat:12.9141,lng:77.6223,retailers:120},
    {name:'Electronic City',lat:12.8452,lng:77.6763,retailers:100},
    {name:'Whitefield',lat:12.9698,lng:77.7500,retailers:90},
    {name:'HSR Layout',lat:12.9121,lng:77.6446,retailers:85},
    {name:'Jayanagar',lat:12.9250,lng:77.5838,retailers:95},
    {name:'Indiranagar',lat:12.9719,lng:77.6412,retailers:88},
    {name:'Koramangala',lat:12.9352,lng:77.6245,retailers:110},
    {name:'Malleshwaram',lat:13.0059,lng:77.5706,retailers:92},
    {name:'Rajajinagar',lat:12.9920,lng:77.5556,retailers:87},
    {name:'Ramanagara',lat:12.7177,lng:77.2807,retailers:75},
    {name:'Kanakapura',lat:12.5464,lng:77.4211,retailers:65},
    {name:'Channapatna',lat:12.6515,lng:77.2072,retailers:70},
    {name:'Bidadi',lat:12.7990,lng:77.3818,retailers:60},
    {name:'Harohalli',lat:12.6795,lng:77.4425,retailers:55},
    {name:'Kunigal 1',lat:12.9967,lng:76.9822,retailers:80},
    {name:'Kunigal 2',lat:13.0234,lng:76.9678,retailers:72},
    {name:'Tumkur',lat:13.3409,lng:77.1034,retailers:95},
    {name:'Tiptur',lat:13.2555,lng:76.4778,retailers:68},
    {name:'Sira',lat:13.7391,lng:76.8968,retailers:58},
    {name:'Magadi',lat:12.9564,lng:77.2250,retailers:62},
    {name:'Nelamangala',lat:13.0993,lng:77.3865,retailers:78},
    {name:'Devanahalli',lat:13.2410,lng:77.7117,retailers:71},
    {name:'Yelahanka',lat:13.1007,lng:77.5963,retailers:83}
];

function doLogin() {
    if(document.getElementById('username').value==='admin' && document.getElementById('password').value==='admin2024!') {
        document.getElementById('loginScreen').style.display='none';
        document.getElementById('app').style.display='flex';
        setTimeout(init,100);
    } else alert('Wrong! Use admin/admin2024!');
}

function init() {
    map = L.map('map').setView([12.85,77.25],9);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    
    if(typeof POI_DATA!=='undefined') {
        pois=POI_DATA;
        document.getElementById('totalPOIs').textContent=pois.length.toLocaleString();
    }
    
    addPlants();
    addDist();
    showPOIs();
    setupTabs();
}

function addPlants() {
    plantLayer=L.layerGroup();
    L.marker([PLANTS.kunigal.lat,PLANTS.kunigal.lng],{
        icon:L.divIcon({html:'<div style="background:#ff6b6b;color:white;padding:8px 12px;border-radius:20px;font-weight:bold">K</div>',iconSize:[40,40]})
    }).bindPopup('<h3>Kunigal Plant</h3>').addTo(plantLayer);
    L.marker([PLANTS.harohalli.lat,PLANTS.harohalli.lng],{
        icon:L.divIcon({html:'<div style="background:#4facfe;color:white;padding:8px 12px;border-radius:20px;font-weight:bold">H</div>',iconSize:[40,40]})
    }).bindPopup('<h3>Harohalli Plant</h3>').addTo(plantLayer);
    plantLayer.addTo(map);
}

function addDist() {
    distLayer=L.layerGroup();
    DISTS.forEach(d=>{
        L.marker([d.lat,d.lng],{
            icon:L.divIcon({html:'<div style="background:#fbbf24;color:white;padding:6px;border-radius:50%;width:24px;height:24px;display:flex;align-items:center;justify-content:center">D</div>',iconSize:[24,24]})
        }).bindPopup(`<h4>${d.name}</h4><p>Retailers: ${d.retailers}</p>`).addTo(distLayer);
    });
    distLayer.addTo(map);
}

function showPOIs() {
    if(poiLayer) map.removeLayer(poiLayer);
    poiLayer=L.layerGroup();
    const sample=pois.sort(()=>0.5-Math.random()).slice(0,5000);
    sample.forEach(p=>{
        if(!p.latitude||!p.longitude) return;
        const color=p.plant==='Kunigal'?'#ff6b6b':'#4facfe';
        L.circleMarker([p.latitude,p.longitude],{radius:4,fillColor:color,color:'#fff',weight:1,fillOpacity:0.7})
        .bindPopup(`<h4>${p.name||'Unknown'}</h4><p><b>Category:</b> ${p.business_category}<br><b>Plant:</b> ${p.plant}</p>`)
        .addTo(poiLayer);
    });
    poiLayer.addTo(map);
}

function togglePlants() {
    if(document.getElementById('showPlants').checked) map.addLayer(plantLayer); else map.removeLayer(plantLayer);
}

function toggleDist() {
    if(document.getElementById('showDist').checked) map.addLayer(distLayer); else map.removeLayer(distLayer);
}

function togglePOIs() {
    if(document.getElementById('showPOIs').checked) map.addLayer(poiLayer); else map.removeLayer(poiLayer);
}

function setupTabs() {
    document.querySelectorAll('.tab').forEach(tab=>{
        tab.addEventListener('click',()=>{
            document.querySelectorAll('.tab, .tab-content').forEach(e=>e.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tab.dataset.tab+'-tab').classList.add('active');
        });
    });
}

function exportPOIs() {
    let csv='Name,Category,Plant,Lat,Lng\n';
    pois.forEach(p=>csv+=`"${p.name}","${p.business_category}","${p.plant}",${p.latitude},${p.longitude}\n`);
    const blob=new Blob([csv],{type:'text/csv'});
    const a=document.createElement('a');
    a.href=URL.createObjectURL(blob);
    a.download='pois.csv';
    a.click();
    alert('Exported!');
}

function logout() {location.reload();}
