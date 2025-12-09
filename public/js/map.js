
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: "mapbox://styles/mapbox/streets-v12",
    center: listing.geometry.coordinates, // Use the correct listing coordinates as the center
    zoom: 9 // starting zoom
});


// **Uncomment and use the coordinates variable**
const marker1 = new mapboxgl.Marker( {color: 'red'})
        .setLngLat(listing.geometry.coordinates) // Pass the coordinates array directly
        .setPopup(new mapboxgl.Popup({offset:25 })
        .setHTML(
            `<h4>${listing.title}</h4><p>Exact location provided after booking!</p>`
        ))
        .addTo(map);

