"use strict";
( function(){

    var globalScrollFlag = true;

    $( function () {

        new Preloader( $('.preloader') );

        $.each( $( '.site__header' ), function() {

            new Menu ( $( this ) );

        } );

    } );

    var Preloader = function (obj) {

        //private properties
        var _self = this,
            _window = $( window ),
            _html = $('html'),
            _preloader = obj,
            _body = $('body');

        //private methods
        var _addEvents = function () {

                _window.on( {
                    load: function(){

                        _showSite();

                    }
                } );

            },
            _init = function () {

                _body[0].preloader = _self;
                _addEvents();

            },
            _showSite = function() {

                _preloader.addClass( 'preloader_loaded' );

                setTimeout(function(){

                    _html.css( {
                        'overflow-y': 'auto'
                    } );

                    _preloader.remove();
                    $('.site').addClass( 'site__loaded' );

                },500);
            };

        //public properties

        //public methods


        _init();
    };

    var Menu = function( obj ) {

        //private properties
        var _self = this,
            _obj = obj,
            _window = $(window),
            _html = $('html'),
            _menu = _obj.find('.site__menu'),
            _content = $('.site__content'),
            _action = false,
            _action2 = false,
            _flagHide = true,
            lastScrollTop = 0,
            _showMenuBtn = _obj.find('.site__menu-btn'),
            _globalWidth = 0;

        //private methods
        var _addEvents = function() {

                _window.on( {
                    load: function () {

                        _globalWidth = _window.width();

                    },
                    resize: function () {

                        if( _globalWidth != _window.width() ) {

                            _globalWidth = _window.width() + 1;


                            if( _window.width() >= 1024 ) {

                                _menu.scrollTop(0);
                                _closeMenu( _showMenuBtn );

                            }

                        }

                    },
                    'scroll': function () {

                        _action = _window.scrollTop() >= _obj.innerHeight() * 2;

                        if( _window.scrollTop() >= _obj.innerHeight()+ 20 ) {

                            if( _flagHide ) {

                                _flagHide = false;
                                _obj.addClass( 'site__header_hide' );

                            }


                        } else {

                            _flagHide = true;
                            _obj.removeClass( 'site__header_hide' );

                        }


                        if( _action ) {

                            if( _obj.hasClass( 'site__header_hide' ) ) {

                                setTimeout( function() {

                                    _obj.addClass( 'site__header_fixed' );
                                    _obj.removeClass( 'site__header_hide' );

                                }, 100 );

                            }


                        } else if ( _window.scrollTop() <= _obj.innerHeight() * 3 ) {

                            _obj.removeClass( 'site__header_fixed' );
                            _obj.removeClass( 'site__header_hidden' );

                        }

                        if( _window.scrollTop() <= 10 ) {

                            _obj.removeClass( 'site__header_fixed' );
                            _obj.removeClass( 'site__header_hidden' );

                        }

                    },
                    'DOMMouseScroll': function ( e ) {

                        var delta = e.originalEvent.detail;

                        if ( delta ) {

                            var direction = ( delta > 0 ) ? 1 : -1;

                            _checkScroll( direction );

                        }

                        if ( direction < 0  ) {

                            _action2 = true;

                        } else {

                            setTimeout( function() {

                                _action2 = false;

                            }, 300 )

                        }


                    },
                    'mousewheel': function ( e ) {

                        var delta = e.originalEvent.wheelDelta;

                        if ( delta ) {

                            var direction = ( delta > 0 ) ? -1 : 1;

                            _checkScroll( direction );

                        }

                        if ( direction < 0  ) {

                            _action2 = true;

                        } else {

                            setTimeout( function() {

                                _action2 = false;

                            }, 300 )

                        }

                    }

                } );

                _window.scroll( function( event ) {

                    var st = $(this).scrollTop();

                    if (st > lastScrollTop){

                        _checkScroll( 1 );

                        var direction = 1

                    } else {

                        _checkScroll( -1 );

                        var direction = -1

                    }
                    lastScrollTop = st;

                    if ( direction < 0  ) {

                        _action2 = true;

                    } else {

                        setTimeout( function() {

                            _action2 = false;

                        }, 300 )

                    }
                });

                _showMenuBtn.on( {
                    click: function() {

                        if( $( this ).hasClass( 'opened' ) ) {

                            _closeMenu( $( this ) )


                        } else {

                            _openMenu( $( this ) );

                        }


                    }
                } );

            },
            _checkScroll = function( direction ) {

                if( direction > 0 && !_obj.hasClass( 'site__header_hidden' ) && !_showMenuBtn.hasClass( 'opened' ) && _action && !_action2 ){

                    _obj.addClass( 'site__header_hidden' );

                }

                if( direction < 0 && _obj.hasClass( 'site__header_hidden' ) && !_showMenuBtn.hasClass( 'opened' )  && _action && _action2 && globalScrollFlag ){

                    _obj.removeClass('site__header_hidden');

                }

            },
            _closeMenu = function( elem ) {

                if( _window.width() < 1024 ) {

                    _html.css( {
                        overflowY: 'auto'
                    } );

                }

                elem.removeClass( 'opened' );
                _obj.removeClass( 'opened-menu' );

            },
            _init = function() {
                _obj[ 0 ].obj = _self;
                _addEvents();
            },
            _openMenu = function( elem )  {

                elem.addClass( 'opened' );
                _obj.addClass( 'opened-menu' );

                if( _window.width() < 1024 ) {

                    _html.css( {
                        overflowY: 'hidden'
                    } );

                }

            };

        _init();
    };

} )();