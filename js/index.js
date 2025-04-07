function loadMap()
{
    // These constants must start at 0
    // These constants must match the data layout in the 'locations' array below
    const NAME = 0,
        LATITUDE = 1,
        LONGITUDE = 2,
        TYPE = 3,
        DESCRIPTION = 4;

    let locations = [
        ["All England Lawn Tennis Club", 51.434, -0.214, "venue", "Main Wimbledon tournament venue"],
        ["Wimbledon Lawn Tennis Museum", 51.433, -0.213, "museum", "Tennis history museum"],
        ["The Dog & Fox", 51.423, -0.204, "restaurant", "Traditional British pub"],
        ["Wimbledon Hotel", 51.422, -0.208, "hotel", "4-star accommodation"]
    ];

    let map = new google.maps.Map(document.getElementById("js_map"), {
        zoom: 14,
        center: new google.maps.LatLng(wimbledonCenter[0], wimbledonCenter[1]),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapId: "YOUR_MAP_ID" // Optional: For custom styled maps
    });

    let infoWindow = null

    locations.forEach(location =>
    {
        let marker = new google.maps.marker.AdvancedMarkerElement({
            position: new google.maps.LatLng(location[LATITUDE], location[LONGITUDE]),
            map: map,
            title: location[NAME],
            icon: getCustomerMarkerIcon(location[TYPE])
        });

        if(infoWindow === null)
        {
            infoWindow = new google.maps.InfoWindow()
        }

        google.maps.event.addListener(marker, "click", () =>
        {
            infoWindow.setContent(`
                <div class="js_infoWindow">
                    <h3>${location[NAME]}</h3>
                    <p><strong>Type:</strong> ${location[TYPE]}</p>
                    <p>${location[DESCRIPTION]}</p>
                </div>
            `);
            infoWindow.open(map, marker)
        })
    })
}

/**
 * Returns custom marker icon based on location type
 * @param {string} type - Location type (venue, hotel, etc.)
 * @returns {string} - Icon URL or predefined symbol
 */
function getCustomMarkerIcon(type)
{
    const baseColor =
        {
        'venue': '#0a5e2a', // Wimbledon green
        'hotel': '#1a73e8', // Google blue
        'restaurant': '#ea4335', // Google red
        'museum': '#fbbc04' // Google yellow
    }[type] || '#34a853'; // Default green

    // Using Google's default marker with color modification
    return {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: baseColor,
        fillOpacity: 1,
        strokeWeight: 0,
        scale: 10
    };
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () =>
{
    loadMap();
});