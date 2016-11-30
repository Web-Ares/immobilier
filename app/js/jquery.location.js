"use strict";
( function(){

    $( function () {

        $.each( $('.contact__map, .location__map'), function () {

            new Location( $(this) );

        } );

    } );

    var Location = function ( obj ) {

        //private properties
        var _self = this,
            _obj = obj,
            mapLat = _obj.data('map-lat'),
            mapLng = _obj.data('map-lng'),
            iconPath = _obj.data('icon-path'),
            mapZoom = _obj.data('map-zoom'),
            myLatLng = { lat: _obj.data('map-lat'), lng: _obj.data('map-lng') },
            map;

        //private methods
        var _addEvents = function () {

                google.maps.event.addDomListener( window, 'resize', function() {

                    map.setCenter( myLatLng );

                } );

            },
            _initMap = function () {

                var customMapType = new google.maps.StyledMapType( [

                    {
                        "featureType": "water",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#e9e9e9"
                            },
                            {
                                "lightness": 17
                            }
                        ]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#f5f5f5"
                            },
                            {
                                "lightness": 20
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#ffffff"
                            },
                            {
                                "lightness": 17
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "color": "#ffffff"
                            },
                            {
                                "lightness": 29
                            },
                            {
                                "weight": 0.2
                            }
                        ]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#ffffff"
                            },
                            {
                                "lightness": 18
                            }
                        ]
                    },
                    {
                        "featureType": "road.local",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#ffffff"
                            },
                            {
                                "lightness": 16
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#f5f5f5"
                            },
                            {
                                "lightness": 21
                            }
                        ]
                    },
                    {
                        "featureType": "poi.park",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#dedede"
                            },
                            {
                                "lightness": 21
                            }
                        ]
                    },
                    {
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                                "visibility": "on"
                            },
                            {
                                "color": "#ffffff"
                            },
                            {
                                "lightness": 16
                            }
                        ]
                    },
                    {
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "saturation": 36
                            },
                            {
                                "color": "#333333"
                            },
                            {
                                "lightness": 40
                            }
                        ]
                    },
                    {
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "transit",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#f2f2f2"
                            },
                            {
                                "lightness": 19
                            }
                        ]
                    },
                    {
                        "featureType": "administrative",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#fefefe"
                            },
                            {
                                "lightness": 20
                            }
                        ]
                    },
                    {
                        "featureType": "administrative",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "color": "#fefefe"
                            },
                            {
                                "lightness": 17
                            },
                            {
                                "weight": 1.2
                            }
                        ]
                    }

                ], {
                    name: 'Custom Style'
                } );

                var customMapTypeId = 'custom_style';

                map = new google.maps.Map( document.getElementById('contact-google-map'), {
                    zoom: mapZoom,
                    disableDefaultUI: true,
                    scrollwheel: false,
                    center: { lat: mapLat, lng: mapLng },
                    mapTypeControlOptions: {
                        mapTypeIds: [ google.maps.MapTypeId.ROADMAP, customMapTypeId ]
                    }
                } );

                var image = {
                    url: iconPath,
                    size: new google.maps.Size(80, 80),
                    scaledSize: new google.maps.Size(80, 80)
                };

                var beachMarker = new google.maps.Marker( {
                    position: { lat: mapLat, lng: mapLng },
                    map: map,
                    icon: image
                } );

                map.mapTypes.set( customMapTypeId, customMapType );
                map.setMapTypeId( customMapTypeId );

                google.maps.event.addListenerOnce(map, 'idle', function() {

                    map.setCenter( myLatLng );

                } );

            },
            _init = function () {

                google.maps.event.addDomListener( window, 'load', _initMap );
                _addEvents();

            };

        _init();
    };

} )();