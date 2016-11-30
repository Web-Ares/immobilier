"use strict";
( function(){

    $( function () {

        $.each( $( '.project-gallery' ), function() {

            new ProjectGallery ( $( this ) );

        } );

    } );

    var ProjectGallery = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _bigGallery = _obj.find('.project-gallery__big'),
            _thumbs = _obj.find('.project-gallery__thumbs'),
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

                _bigGallery.slick( {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    asNavFor: '.project-gallery__thumbs'
                } );
                _thumbs.slick( {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    asNavFor: '.project-gallery__big',
                    dots: false,
                    arrows: false,
                    centerMode: true,
                    focusOnSelect: true
                } );

            };

        //public properties

        //public methods


        _init();
    };

} )();