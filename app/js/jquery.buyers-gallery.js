"use strict";
( function(){

    $( function () {

        $.each( $( '.buyers-gallery' ), function() {

            new BuyersGallery ( $( this ) );

        } );

    } );

    var BuyersGallery = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _container = _obj.find('.swiper-container'),
            _mainPagination = _obj.find('.swiper-pagination'),
            _secondaryPagination = _obj.find('.buyers-gallery__pagination'),
            _body = $('body');

        //private methods
        var _addEvents = function () {

                _secondaryPagination.find('span').on( {
                    click: function() {

                        var curItem = $(this),
                            curIndex = curItem.index();

                        if( !( curItem.hasClass('active') ) ) {

                            _secondaryPagination.find('span').removeClass('active');
                            curItem.addClass('active');

                            _mainPagination.find('.swiper-pagination-bullet').eq(curIndex).trigger('click');

                        }

                        return false;

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
                    pagination: '.swiper-pagination',
                    paginationClickable: true,
                    loop: true,
                    autoplay: 3000,
                    speed: 700,
                    autoplayDisableOnInteraction: false,
                    onSlideChangeStart: function() {

                        var index = _mainPagination.find('.swiper-pagination-bullet-active').index();

                        _secondaryPagination.find('span').removeClass('active');
                        _secondaryPagination.find('span').eq(index).addClass('active');

                    }
                } );

            };

        //public properties

        //public methods


        _init();
    };

} )();