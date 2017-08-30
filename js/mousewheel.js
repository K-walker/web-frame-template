/**
 * Created by 004928 on 2017/4/27.
 * 注册/注销 鼠标滚轮事件
 */
(function(window){

    var _document = window.document ;

    var Wheel = function () {
        return {
            registerWheelEvent:function (func) {
                if (_document.attachEvent) {   // IE兼容
                    _document.attachEvent("onmousewheel", func , false);
                } else { // Safari 和 Chrome 兼容
                    window.onmousewheel = _document.onmousewheel = func ;
                    // 兼容火狐
                    if(_document.addEventListener) {
                        window.addEventListener("DOMMouseScroll" , func , false);
                    }
                }
            },
            unregisterWheelEvent:function (func) {
                if(_document.attachEvent) {
                    _document.detachEvent("onmousewheel" , func , false)
                } else  {
                    window.onmousewheel = _document.onmousewheel = null ;
                    if(_document.addEventListener) {
                        window.removeEventListener("DOMMouseScroll" , func , false);
                    }
                }
            }
        }
    }

    window._Wheel = new Wheel() ;

})(window);