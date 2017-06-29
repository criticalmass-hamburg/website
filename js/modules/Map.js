define(['jquery', 'leaflet'], function ($) {
    Map = function (context, options) {
        this._mapSelector = context;

        this._fetchData();
    };

    Map.prototype._mapSelector = null;

    Map.prototype._fetchData = function() {
        $.ajax({
            dataType: 'json',
            context: this,
            url: 'https://criticalmass.in/api/hamburg/current',
            success: function(rideData) {
                //createCalendar(rideData);
                this._createMap(rideData);

                $('.hide-after-load').hide();
                $('.show-after-load').show();
            },
            error: function() {
            }
        });
    };

    Map.prototype._createMap = function(rideData) {
        var map = L.map(this._mapSelector);

        var center = L.latLng(rideData.latitude, rideData.longitude);

        L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}@2x.png', {
            attribution: 'Wikimedia maps beta | Map data &copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
        }).addTo(map);

        map.setView(center, 15);

        L.marker(center).addTo(map);
    };

    function createCalendar(rideData) {
        $('#tour-location').html(rideData.location);

        var date = new Date(rideData.timestamp * 1000);

        $('#tour-date').html(date.format('dd.mm.yyyy'));

        $('#city-page').attr('href', 'https://criticalmass.in/hamburg');
        $('#ride-page').attr('href', 'https://criticalmass.in/hamburg/' + date.format('yyyy-mm-dd'));
    }

    return Map;
});
