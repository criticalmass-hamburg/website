import $ from 'jquery';
import L from 'leaflet';
import 'leaflet-extra-markers';

// Fix Leaflet default icon paths
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

export function initMap(mapSelector) {
    const $map = $('#' + mapSelector);
    const latitude = $map.data('latitude');
    const longitude = $map.data('longitude');

    const map = L.map(mapSelector);
    const center = L.latLng(latitude, longitude);

    L.tileLayer('https://tiles.caldera.cc/wikimedia-intl/{z}/{x}/{y}.png', {
        attribution: 'Wikimedia maps beta | Map data &copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    }).addTo(map);

    map.setView(center, 15);

    const markerIcon = L.ExtraMarkers.icon({
        icon: 'fa-bicycle',
        markerColor: 'green',
        shape: 'square',
        prefix: 'fa'
    });

    L.marker(center, { icon: markerIcon }).addTo(map);

    return map;
}
