define(['jquery', 'leaflet', 'dateformat', 'leaflet-extramarkers'], function ($) {
    Ride = function (context, options) {
        this._mapSelector = context;

        this._createMap();
    };

    Ride.prototype._mapSelector = null;

    Ride.prototype._createMap = function(rideData) {
        var map = L.map(this._mapSelector);

        var $map = $('#' + this._mapSelector);

        var latitude = $map.data('latitude');
        var longitude = $map.data('longitude');

        var center = L.latLng(latitude, longitude);

        L.tileLayer('https://tiles.caldera.cc/wikimedia-intl/{z}/{x}/{y}.png', {
            attribution: 'Wikimedia maps beta | Map data &copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
        }).addTo(map);

        map.setView(center, 15);

        var markerIcon = L.ExtraMarkers.icon({
            icon: 'fa-bicycle',
            markerColor: 'green',
            shape: 'square',
            prefix: 'fa'
        });

        L.marker(center, {icon: markerIcon}).addTo(map);
    };

    return Ride;
});
