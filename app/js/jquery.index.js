"use strict";
( function(){

    $( function () {

        $.each( $( '.main-slider' ), function() {

            new MainSlider ( $( this ) );

        } );

    } );

    var MainSlider = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _container = _obj.find('.main-slider__container'),
            _slider = _obj.find('.main-slider__slide'),
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

                _container.slick( {
                    dots: true,
                    dotsClass: 'main-slider__dots',
                    autoplay: true,
                    autoplaySpeed: 5000,
                    speed: 600
                } );

                _addTextInDots();

            },
            _addTextInDots = function() {

                _slider.each( function() {

                    var curItem = $(this),
                        index = curItem.index(),
                        text = curItem.data('dots').split(','),
                        text1 = text[0],
                        text2 = text[1];

                    _container.find('.main-slider__dots li').eq( index-1 ).html('<div><span>'+ text1 +'</span>' + text2 +'</div>');

                } )

            };

        //public properties

        //public methods


        _init();
    };

} )();