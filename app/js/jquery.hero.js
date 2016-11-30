"use strict";
( function(){

    var globalScrollFlag = true;

    $( function () {

        $.each( $( '.hero' ), function() {

            new Hero ( $( this ) );

        } );

        $.each( $('.advantages__gallery'), function () {

            new AdvantagesSlider( $(this) );

        } );

    } );

    var Hero = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _window = $( window ),
            _dom = $('html, body'),
            _header = $('.site__header'),
            _inner = _obj.find('.hero__inner'),
            _btnDown = _obj.find('.hero__down'),
            _globalWidth = 0;

        //private methods
        var _addEvents = function () {

                _window.on( {
                    load: function () {

                        _globalWidth = _window.width();

                        _setHeight();

                    },
                    resize: function() {

                        if( _globalWidth != _window.width() ) {

                            setTimeout( function() {

                                _globalWidth = _window.width();

                            }, 100 );


                            _setHeight();

                        }

                    }
                } );

                _btnDown.on( {
                    click: function () {

                        _scrollNext();

                        return false;

                    }
                } );

            },
            _init = function () {

                _obj[0].preloader = _self;
                _addEvents();

            },
            _scrollNext = function() {

                var nextBlock = _obj.next(),
                    nextBlockPosition = nextBlock.offset().top;

                _dom.stop( true, false );
                _dom.animate( {
                    scrollTop: nextBlockPosition

                }, {
                    duration: 500,
                    progress: function () {
                        globalScrollFlag = false;
                        _header.addClass( 'site__header_hidden' );
                    },
                    complete: function () {

                        setTimeout( function() {
                            globalScrollFlag = false;
                        }, 200 );

                        setTimeout( function() {
                            globalScrollFlag = true
                        }, 500 );

                    }
                });

            },
            _setHeight = function() {

                var height = _window.height();

                _inner.css( {
                    'min-height': height
                } );


            };

        //public properties

        //public methods


        _init();
    };

    var AdvantagesSlider = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _slider = _obj.find('.advantages__gallery__slide'),
            _body = $('body');

        //private methods
        var _addEvents = function () {


            },
            _init = function () {

                _body[0].obj = _self;
                _addEvents();
                _initSlick();

            },
            _initSlick = function() {

                _obj.slick( {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: true,
                    autoplay: true,
                    autoplaySpeed: 3000,
                    dotsClass: 'advantages__gallery-dots'
                } );

                _setDotsWidth();

            },
            _setDotsWidth = function() {

                var length = _slider.length;

                _obj.find('.advantages__gallery-dots li').css( {
                    width: 'calc( '+ 100/length +'% - 40px)'
                } );


            };

        //public properties

        //public methods


        _init();
    };

} )();