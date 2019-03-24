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
    baseUrl: '/js/',
    shim: {
        'leaflet.extra-markers': {
            deps: ['leaflet'],
            exports: 'L.ExtraMarkers'
        }
    }
});
