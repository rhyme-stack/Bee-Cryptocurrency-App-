const menuToggle = document.querySelector('.menu-toggle');
const siteMenu = document.querySelector('#site-menu');
const menuBackdrop = document.querySelector('.menu-backdrop');

var btc = document.getElementById('bitcoin-price');
var eth = document.getElementById('ethereum-price');
var doge = document.getElementById('dogecoin-price');

if (menuToggle instanceof HTMLButtonElement && siteMenu instanceof HTMLElement && menuBackdrop instanceof HTMLButtonElement) {
    const closeMenu = () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open navigation menu');
        siteMenu.classList.remove('is-open');
        document.body.classList.remove('menu-open');
    };

    menuToggle.addEventListener('click', () => {
        const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', String(!isOpen));
        menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
        siteMenu.classList.toggle('is-open', !isOpen);
        document.body.classList.toggle('menu-open', !isOpen);
    });

    menuBackdrop.addEventListener('click', closeMenu);

    siteMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMenu();
            menuToggle.focus();
        }
    });

    document.addEventListener('click', (event) => {
        if (!siteMenu.contains(event.target) && !menuToggle.contains(event.target)) {
            closeMenu();
        }
    });
}

var settings = {
    "async": true,
    "scrossDomain": true,
    "url": "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cdogecoin&vs_currencies=usd",
    "method": "GET",
    "headers": {}
}
$.ajax(settings).done(function (response){
    btc.innerHTML = response.bitcoin.usd;
    eth.innerHTML = response.ethereum.usd;
    doge.innerHTML = response.dogecoin.usd;
    
}) 