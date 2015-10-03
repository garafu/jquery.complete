(function (window, document, $, undefined) {
    /**
    * Call specified event handler when the IME input is completed.
    * @param    handler     {function}  Event handler. This handler takes jQuery.Event object.
    * @return   {jQuery}    jQuery object.
    */
    $.fn.complete = function (handler) {
        var ENTER_KEY = 13;
        var keypressed = false;
 
        /**
        * Call when keypress event is executed.
        * @param    event   {jQuery.Event}  Event object.
        */
        var onkeypress = function (event) {
            if (event.keyCode !== ENTER_KEY) {
                return;
            }
            keypressed = true;
        };
 
        /**
        * Call when "keyup" event is executed.
        * @param    event   {jQuery.Event}  Event object.
        */
        var onkeyup = function (event) {
            if (event.keyCode === ENTER_KEY && keypressed) {
                // Fire input complete event.
                handler.call(this, event);
            }
            keypressed = false;
        };
 
        // Add event handler to each elements.
        return this.each(function (index) {
            $(this).on('keypress', onkeypress).on('keyup', onkeyup);
        });
    };
})(window, document, jQuery);