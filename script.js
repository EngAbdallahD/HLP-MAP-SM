document.addEventListener('DOMContentLoaded', () => {
    const mapDisplay = document.getElementById('map-display');
    const locationLinks = document.querySelectorAll('.nav-link');
    const defaultMap = 'Main_Gate';

    async function loadMap(mapName) {
        // Custom safety message
        mapDisplay.innerHTML = `
            <div class="p-8 text-center flex items-center justify-center h-full">
                <p class="text-gray-700 text-lg">
                    Take care of yourself, your safety comes first. We know that there are shortcuts to some of the mentioned places, but these shortcuts are unsafe and require the accompaniment of a responsible person, so we have identified the safest routes for you. Good luck.
                </p>
            </div>
        `;

        try {
            // Looks for maps in the main folder
            const response = await fetch(`./${mapName}.svg`); 
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
