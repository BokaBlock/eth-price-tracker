// ========================================
// ETH PRICE TRACKER - ASYNC/AWAIT PRAKSA
// Autor: BokaBlock
// ========================================

// API endpoint za Ethereum cijenu
const API_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_24hr_change=true';

// DOM elementi
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const priceContainer = document.getElementById('price-container');
const ethPriceElement = document.getElementById('eth-price');
const changeValueElement = document.getElementById('change-value');
const changeDiv = document.getElementById('price-change');
const lastUpdateElement = document.getElementById('last-update');
const refreshBtn = document.getElementById('refresh-btn');

// ========================================
// GLAVNA FUNKCIJA - Fetch ETH cijenu
// ========================================
async function fetchEthPrice() {
    try {
        // Prikaži loading state
        showLoading();
        
        // Fetch podatke sa API-ja (ASYNC operacija)
        const response = await fetch(API_URL);
        
        // Provjeri je li response uspješan
        if (!response.ok) {
            throw new Error('API request failed');
        }
        
        // Pretvori response u JSON (ASYNC operacija)
        const data = await response.json();
        
        // Izvuci cijenu i promjenu iz podataka
        const price = data.ethereum.usd;
        const change24h = data.ethereum.usd_24h_change;
        
        // Prikazi cijenu na UI-ju
        displayPrice(price, change24h);
        
        // Update zadnje vrijeme osvježavanja
        updateLastRefreshTime();
        
    } catch (error) {
        // Ako nešto pođe po zlu, prikaži error
        console.error('Greška pri fetchanju cijene:', error);
        showError();
    }
}

// ========================================
// PRIKAZ CIJENE NA UI-ju
// ========================================
function displayPrice(price, change24h) {
    // Sakrij loading i error
    loadingDiv.classList.add('hidden');
    errorDiv.classList.add('hidden');
    
    // Prikaži price container
    priceContainer.classList.remove('hidden');
    
    // Formatiraj cijenu na 2 decimale
    ethPriceElement.textContent = price.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    
    // Formatiraj 24h promjenu
    const changeFormatted = change24h.toFixed(2);
    changeValueElement.textContent = `${changeFormatted}%`;
    
    // Postavi boju ovisno je li pozitivna ili negativna promjena
    if (change24h > 0) {
        changeDiv.classList.add('positive');
        changeDiv.classList.remove('negative');
        changeValueElement.textContent = `+${changeFormatted}%`;
    } else {
        changeDiv.classList.add('negative');
        changeDiv.classList.remove('positive');
    }
}

// ========================================
// PRIKAŽI LOADING STATE
// ========================================
function showLoading() {
    loadingDiv.classList.remove('hidden');
    errorDiv.classList.add('hidden');
    priceContainer.classList.add('hidden');
}

// ========================================
// PRIKAŽI ERROR STATE
// ========================================
function showError() {
    loadingDiv.classList.add('hidden');
    errorDiv.classList.remove('hidden');
    priceContainer.classList.add('hidden');
}

// ========================================
// UPDATE ZADNJEG VREMENA OSVJEŽAVANJA
// ========================================
function updateLastRefreshTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('hr-HR');
    lastUpdateElement.textContent = timeString;
}

// ========================================
// MANUAL REFRESH - Kada user klikne button
// ========================================
refreshBtn.addEventListener('click', async () => {
    // Disable button dok se fetcha (spriječi spam klikanja)
    refreshBtn.disabled = true;
    refreshBtn.textContent = 'Osvježavam...';
    
    // Fetch novu cijenu
    await fetchEthPrice();
    
    // Enable button ponovno
    refreshBtn.disabled = false;
    refreshBtn.textContent = 'Osvježi';
});

// ========================================
// AUTO-REFRESH - Svake minute
// ========================================
function startAutoRefresh() {
    // Osvježi svaku minutu (60000 milisekundi)
    setInterval(async () => {
        await fetchEthPrice();
    }, 60000);
}

// ========================================
// INICIJALIZACIJA - Kada se stranica učita
// ========================================
async function init() {
    // Fetch cijenu odmah pri učitavanju
    await fetchEthPrice();
    
    // Pokreni auto-refresh
    startAutoRefresh();
}

// Pokreni app kada se DOM učita
init();