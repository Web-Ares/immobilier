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
            _window = $(window),
            _container = _obj.find('.main-slider__container'),
            _slider = _obj.find('.main-slider__slide'),
            _body = $('body');

        //private methods
        var _addEvents = function () {

                _window.on( {
                    resize: function() {

                        setTimeout( function() {

                            _addTextInDots();

                        }, 10 );


                    }
                } );

            },
            _init = function () {

                _body[0].obj = _self;
                _addEvents();
                _initSlider();

            },
            _initSlider = function() {

                var swiper = new Swiper( _container, {
                    pagination: _container.find('.swiper-pagination'),
                    paginationClickable: true,
                    nextButton: _container.find('.swiper-button-next'),
                    prevButton: _container.find('.swiper-button-prev'),
                    slidesPerView: 1,
                    speed: 700,
                    loop: true,
                    autoplay: 5000,
                    autoplayDisableOnInteraction: false,
                    effect: 'coverflow',
                    coverflow: {
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows : true
                    }
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

                    _container.find('.swiper-pagination .swiper-pagination-bullet').eq( index-1).html('<div><span>'+ text1 +'</span>' + text2 +'</div>');

                } )

            };

        //public properties

        //public methods


        _init();
    };

} )();