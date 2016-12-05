"use strict";
( function(){

    $( function () {

        $.each( $('.our-projects__single'), function () {

            new ScrollElements( $(this) );

        } );

    } );

    var ScrollElements = function( obj ) {

        //private properties
        var _self = this,
            _obj = obj,
            _text = _obj.find('.our-projects__text'),
            _bg = _obj.find('.our-projects__bg'),
            _window = $( window );

        //private methods
        var _onEvents = function()  {

                _window.on({
                    load: function () {

                        if (_window.width() >= 1024) {

                            _checkScroll();

                        }
                    },
                    scroll: function () {

                        if (_window.width() >= 1024) {

                            _checkScroll();

                        } else {

                            _text.css( {
                                position: 'absolute',
                                bottom: '',
                                top: '',
                                '-webkit-transform': 'translateY(0)',
                                'transform': 'translateY(0)'
                            } );

                            _bg.css( {

                                '-webkit-transform': 'scale(1)',
                                'transform': 'scale(1)'

                            } );

                        }

                    }
                });

            },
            _checkScroll = function(){

                var windowH = _window.height(),
                    topPos = _obj.offset().top,
                    start = topPos - windowH + _text.height(),
                    end = topPos + _obj.height() - windowH,
                    scrollPoint;

                if ( _window.scrollTop() < start ) {

                    scrollPoint = 0;

                } else if ( _window.scrollTop() > end ) {

                    scrollPoint = 1;

                } else if( _window.scrollTop() >= start &&  _window.scrollTop() <= end  ){

                    scrollPoint = 'animation';

                }

                _animationElems( start, end, scrollPoint );

            },
            _animationElems = function ( startPoint, endPoint, scrollPoint ) {

                var segment = endPoint - startPoint;
                var translateStart = 0,
                    scaleStart = 1,
                    koofTranslate = ( translateStart ) / segment * ( _window.scrollTop() - startPoint ),
                    koofScale = scaleStart + ( scaleStart ) / segment * ( _window.scrollTop() - startPoint );

                var scrollPercent =  _window.scrollTop() + _window.height() - _obj.offset().top - _text.height() - 20,
                    t = _text.offset().top;


                if( scrollPercent < 0 ) {

                    scrollPercent = 0;

                }

                if ( scrollPoint == 0 ) {

                    _text.css( {
                        position: 'absolute',
                        bottom: 'auto',
                        top: '',
                        '-webkit-transform': 'translateY(0)',
                        'transform': 'translateY(0)'
                    } );

                    _bg.css( {

                        '-webkit-transform': 'scale('+ scaleStart +')',
                        'transform': 'scale('+ scaleStart +')'

                    } );


                } else if ( scrollPoint == 1 ){


                    _text.css( {
                        position: 'absolute',
                        bottom: 20,
                        top: 'auto',
                        '-webkit-transform': 'translateY(0px)',
                        'transform': 'translateY(0px)'
                    } );


                } else  {


                    if( _window.scrollTop() + _window.height() >= _obj.offset().top + _text.height() + 80){

                        if( scrollPercent < 0 ) {

                            scrollPercent = 0;

                        }

                        _text.css( {
                            position: 'fixed',
                            bottom: 20,
                            top:'auto',
                            '-webkit-transform': 'translateY(0)',
                            'transform': 'translateY(0)'
                        } );


                    }


                    _bg.css( {
                        '-webkit-transform': 'scale( '+ (1 + ( koofScale / 10) ) +' )',
                        'transform': 'scale( '+ (1 + ( koofScale / 10) ) +' )'
                    } );


                }


            },
            _init = function() {

                _obj[ 0 ].obj = _self;
                _checkScroll();
                _onEvents();
            };

        _init();
    };

} )();