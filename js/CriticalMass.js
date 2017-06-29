var CriticalMass = CriticalMass || {};

CriticalMass.loadModule = function(name, context, options, callback) {
    require([name], function(Module) {
        var module = new Module(context, options);

        if (callback) {
            callback(module);
        }
    });
};

require.config({
    paths:
    {
        "Ride": "js/modules/Ride",
        "FahrradstadtHamburg": "js/modules/FahrradstadtHamburg",
        "leaflet": "js/external/leaflet/leaflet",
        "jquery": "js/external/jquery/jquery-3.1.0.min",
        "localforage": "js/external/localforage/localforage.min",
        "dateformat": "js/external/dateformat/dateformat",
        "leaflet-extramarkers": "js/external/leaflet/ExtraMarkers"
    },
    shim: {

    }
});
