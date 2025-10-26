// CSV Data Loader using PapaParse
let pois = [];
let poisLoaded = false;

async function loadCSVData() {
    return new Promise((resolve, reject) => {
        console.log('📂 Loading CSV data...');
        
        Papa.parse('data.csv', {
            download: true,
            header: true,
            skipEmptyLines: true,
            complete: function(results) {
                pois = results.data;
                poisLoaded = true;
                
                console.log(`✅ Loaded ${pois.length.toLocaleString()} POIs from CSV`);
                
                // Update UI
                const totalElement = document.getElementById('totalPOIs');
                if (totalElement) {
                    totalElement.textContent = pois.length.toLocaleString();
                }
                
                resolve(pois);
            },
            error: function(error) {
                console.error('❌ Error loading CSV:', error);
                reject(error);
            }
        });
    });
}

console.log('✅ CSV Loader ready');
