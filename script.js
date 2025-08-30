document.addEventListener('DOMContentLoaded', () => {
    const mapDisplay = document.getElementById('map-display');
    const locationLinks = document.querySelectorAll('.nav-link');
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');

    async function loadMap(mapName) {
        mapDisplay.innerHTML = `<p class="p-8 text-center text-gray-500">Loading map...</p>`;
        try {
            const response = await fetch(`./${mapName}.svg`); 
            if (!response.ok) {
                throw new Error(`Map not found: ${mapName}.svg.`);
            }
            const svgData = await response.text();
            mapDisplay.innerHTML = svgData;

            if (window.innerWidth < 768) {
                hideSidebar();
            }
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

    function showSidebar() {
        sidebar.classList.remove('sidebar-hidden');
        sidebar.classList.add('sidebar-visible');
    }

    function hideSidebar() {
        sidebar.classList.remove('sidebar-visible');
        sidebar.classList.add('sidebar-hidden');
    }

    sidebarToggle.addEventListener('click', () => {
        if (sidebar.classList.contains('sidebar-hidden')) {
            showSidebar();
        } else {
            hideSidebar();
        }
    });

    locationLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const mapTarget = link.getAttribute('data-target');
            loadMap(mapTarget);
            setActiveLink(link);
        });
    });

    function initialize() {
        // No default map is loaded. The safety message in the HTML is shown instead.
        if (window.innerWidth < 768) {
            hideSidebar(); 
        } else {
            showSidebar(); 
        }
    }
    initialize();
});
