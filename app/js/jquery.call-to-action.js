"use strict";
( function(){

    var globalScrollFlag = true;

    $( function () {

        $.each( $('.call-action'), function () {

            new CallToAction( $(this) );

        } );

    } );

    var CallToAction = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _window = $( window ),
            _content = _obj.find('.call-action__content');

        //private methods
        var _addEvents = function () {

                _window.on( {
                    load: function(){

                        setTimeout(function () {

                            _obj.addClass('visible');

                        }, 10000);

                    }
                });
                _obj.on({
                    'click': function () {

                        if( !( _obj.hasClass('opened') ) ){

                            _obj.addClass('opened');

                        } else{

                            _obj.removeClass('opened');

                        }
                    }
                });

                _obj.find('.call-action__content').on( {
                    click: function( event ){

                        event = event || window.event;

                        if (event.stopPropagation) {
                            event.stopPropagation();
                        } else {
                            event.cancelBubble = true;
                        }

                    }
                } );

                _obj.on( {
                    click: function( event ){
                        event = event || window.event;

                        if (event.stopPropagation) {
                            event.stopPropagation();
                        } else {
                            event.cancelBubble = true;
                        }
                    }
                } );

                $('body').on( {
                    click: function(){

                        _obj.removeClass('opened');

                    }
                } );

            },
            _init = function () {
                _addEvents();
            };

        //public properties
        //public methods

        _init();
    };

} )();