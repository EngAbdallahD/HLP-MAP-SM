document.addEventListener('DOMContentLoaded', () => {
    const mapDisplay = document.getElementById('map-display');
    const locationLinks = document.querySelectorAll('.nav-link');
    const defaultMap = 'Main_Gate';

    async function loadMap(mapName) {
        mapDisplay.innerHTML = `<p class="p-8 text-center text-gray-500">Loading map for ${mapName.replace('_', ' ')}...</p>`;
        try {
            const response = await fetch(`./Maps/${mapName}.svg`); 
            if (!response.ok) {
                throw new Error(`Map not found: ${mapName}.svg.`);
            }
            const svgData = await response.text();
            mapDisplay.innerHTML = svgData;
        } catch (error) {
            console.error('Error loading map:', error);
            mapDisplay.innerHTML = `<p class="p-8 text-center text-red-500">Error: Could not load map. ${error.message}</p>`;
        }
    }

    function setActiveLink(activeLink) {
        locationLinks.forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    locationLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const mapTarget = link.getAttribute('data-target');
            loadMap(mapTarget);
            setActiveLink(link);
        });
    });

    function initialize() {
        const defaultLink = document.querySelector(`.nav-link[data-target="${defaultMap}"]`);
        if (defaultLink) {
            setActiveLink(defaultLink);
            loadMap(defaultMap);
        }
    }
    initialize();
});