"use strict";
( function(){

    $( function () {

        $.each( $( '.sold-progress' ), function() {

            new ProjectPercent ( $( this ) );

        } );

    } );

    var ProjectPercent = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _checkable = false,
            _textWrap = _obj.find('.sold-progress__percent span'),
            _duration = 1000,
            _canAnimate = true,
            _canDraw = false,
            _firstStep = true,
            _number = parseInt( _obj.data('percent') ),
            _startTime = 0,
            _canvas = document.createElement('canvas'),
            _ctx = _canvas.getContext('2d'),
            _from = 0,
            _window = $(window);

        //private methods
        var _addEvents = function () {

                _window.on( {
                    scroll: function () {

                        _checkScroll();
                        _loop();

                    },

                    load: function(){

                        setTimeout( function() {

                            _checkScroll();
                            _loop();

                        },1000 );

                    },
                    resize: function() {

                        _redraw()

                    }
                } );
            },
            _addCanvas = function() {

                _canvas.width = _canvas.height = (_obj.width() -20)*2 ;

                _ctx.translate( _canvas.width/2, _canvas.height/2 );
                _ctx.strokeStyle = _obj.data('color');
                _ctx.lineWidth = 3;
                _obj.prepend(_canvas);

                $(_canvas).width( _canvas.width/2 );
                $(_canvas).height( _canvas.width/2 );

            },
            _checkScroll = function(){
                var curScroll = _window.scrollTop(),
                    windowH = _window.height(),
                    topPos = _obj.eq(0).offset().top,
                    topInWindow = topPos - curScroll,
                    visiblePercent = 1-(topInWindow/windowH);

                if( visiblePercent > .3 ){

                    _canDraw = true;

                }
            },
            _init = function () {
                _obj[0].percentage = _self;
                _addEvents();
                _textWrap.text(_from);
                _addCanvas();

            },
            _loop = function (){

                if( _canAnimate && _canDraw ) {

                    _render();
                    _canAnimate = false;
                }

            },
            _gradToRad = function(grad){
                var rad = grad * Math.PI / 180;
                return rad;
            },
            _redraw = function() {

                _canvas.width = _canvas.height = (_obj.width() -20)*2 ;
                _ctx.strokeStyle = _obj.data('color');
                _ctx.lineWidth = 3;
                _ctx.translate( _canvas.width/2, _canvas.height/2 );

                var result = parseInt(_number);

                _ctx.clearRect(-(_canvas.width/2),-(_canvas.height/2),_canvas.width,_canvas.height);
                _ctx.beginPath();
                _ctx.arc(0,0,(_canvas.height - 3)/2,_gradToRad(270),_gradToRad(270+((result/100)*360)));

                _ctx.stroke();

                $( _canvas ).width( _canvas.width/2 );
                $( _canvas ).height( _canvas.width/2 );

            },
            _render = function( time ){

                var now = time - _startTime,
                    progress = now/_duration,
                    result = 0,
                    resultVal = null;

                if( progress > 1 ){
                    progress = 1;
                    _firstStep = true;
                    _canDraw = false;
                }

                var range = _number;
                var current = 0;
                var increment = _number > 0? 1 : -1;
                var stepTime = Math.abs(Math.floor(_duration / range));
                var timer = setInterval(function() {
                    current += increment;

                    _ctx.clearRect(-(_canvas.width/2),-(_canvas.height/2),_canvas.width,_canvas.height);
                    _ctx.beginPath();
                    _ctx.arc(0,0,(_canvas.height - 3)/2,_gradToRad(270),_gradToRad(270+((current/100)*360)));

                    _ctx.stroke();

                    resultVal = current+'';

                    _textWrap.text(current);

                    if (current == range) {
                        clearInterval(timer);
                    }

                }, stepTime);

                _canAnimate = false;
                _canDraw = false;
            },
            _separateNumber = function(str){
                // return str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
            };

        //public properties

        //public methods

        _init();
    };

} )();
