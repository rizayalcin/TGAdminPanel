// Sync service functionality
let isSyncing = false;
let currentProgress = 0;
let logMessages = [];

// Start synchronization
async function startSync() {
    if (isSyncing) return;
    
    isSyncing = true;
    currentProgress = 0;
    logMessages = [];
    
    // Reset UI
    const syncButton = document.getElementById('syncButton');
    const syncProgress = document.getElementById('syncProgress');
    const logWindow = document.getElementById('logWindow');
    const syncStatus = document.getElementById('syncStatus');
    
    syncButton.disabled = true;
    syncProgress.style.display = 'block';
    logWindow.innerHTML = '';
    syncStatus.className = 'alert d-none';
    
    try {
        // Simulated API calls
        await connectToApi();
        await fetchTourList();
        await processTours();
        await updateDatabase();
        
        // Show success message
        syncStatus.className = 'alert alert-success';
        syncStatus.innerHTML = '<i class="bi bi-check-circle"></i> Senkronizasyon başarıyla tamamlandı.';
        
    } catch (error) {
        // Show error message
        syncStatus.className = 'alert alert-danger';
        syncStatus.innerHTML = `<i class="bi bi-exclamation-triangle"></i> Hata: ${error.message}`;
        
        addLog('error', `Senkronizasyon hatası: ${error.message}`);
    } finally {
        isSyncing = false;
        syncButton.disabled = false;
    }
}

// Connect to API
async function connectToApi() {
    addLog('info', 'Prontotour API\'ye bağlanılıyor...');
    await simulateDelay(1000);
    updateProgress(10);
    addLog('success', 'API bağlantısı başarılı');
}

// Fetch tour list
async function fetchTourList() {
    addLog('info', 'Tur listesi alınıyor...');
    await simulateDelay(2000);
    updateProgress(30);
    addLog('success', '157 tur bulundu');
}

// Process tours
async function processTours() {
    addLog('info', 'Turlar işleniyor...');
    
    // Simulate processing individual tours
    for (let i = 1; i <= 5; i++) {
        await simulateDelay(800);
        const progress = 30 + (i * 10);
        updateProgress(progress);
        addLog('info', `Tur paketi ${i} işleniyor...`);
    }
    
    updateProgress(80);
    addLog('success', 'Tüm turlar başarıyla işlendi');
}

// Update database
async function updateDatabase() {
    addLog('info', 'Veritabanı güncelleniyor...');
    await simulateDelay(1500);
    updateProgress(100);
    addLog('success', 'Veritabanı güncellendi');
}

// Update progress bar
function updateProgress(progress) {
    currentProgress = progress;
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
        progressBar.textContent = `${progress}%`;
    }
}

// Add log message
function addLog(type, message) {
    const timestamp = new Date().toLocaleTimeString();
    const logWindow = document.getElementById('logWindow');
    
    let icon = '';
    let color = '';
    
    switch (type) {
        case 'info':
            icon = 'ℹ️';
            color = 'text-info';
            break;
        case 'success':
            icon = '✅';
            color = 'text-success';
            break;
        case 'error':
            icon = '❌';
            color = 'text-danger';
            break;
        default:
            icon = '📝';
            color = 'text-secondary';
    }
    
    const logEntry = `<div class="${color}">${icon} [${timestamp}] ${message}</div>`;
    logMessages.push(logEntry);
    
    if (logWindow) {
        logWindow.innerHTML = logMessages.join('');
        logWindow.scrollTop = logWindow.scrollHeight;
    }
}

// Simulate delay for demo purposes
function simulateDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}