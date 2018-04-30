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
        "leaflet": "js/external/leaflet/leaflet",
        "jquery": "js/external/jquery/jquery-3.1.0.min",
        "leaflet-extramarkers": "js/external/leaflet/ExtraMarkers"
    },
    shim: {
        'leaflet-extramarkers': {
            deps: ['leaflet'],
            exports: 'L.ExtraMarkers'
        }
    }
});
