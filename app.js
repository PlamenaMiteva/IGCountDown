if (typeof jQuery !== "function") {
    throw new Error("JQuyery is not defined");
}

(function ($) {
    $.widget('ui.igCountDown', {
        css: {
            widget: "ui-widget ui-igcountdown",
            countContainer: "ui-widget-content ui-igcountdown-container"
        },
        options: {
            startValue: 0,
            autoStart: true
        },
        events: {

        },
        _create: function () {
            this._render();
        },
        _setOption: function name(option, value) {
            var css = this.css;
            var prevValue = this.options[option];
            if (prevValue === value) {
                return;
            }
            $.Widget.prototype._setOption.apply(this, arguments);
        },
        _render: function () {
            var countContainer = $("<div/>");

            this.element.addClass(this.css.widget);
            countContainer.addClass(this.css.countContainer);
            countContainer.append($("<span/>").text(this.options.startValue));
            this.element.prepend(countContainer);
            this._positionContainer();
        },
        _positionContainer: function () {
            var width = this.element.outerWidth(),
                height = this.element.outerHeight(),
                position = this.element.offset(),
                countContainer = this.element.children(".ui-igcountdown-container");
            countContainer.css({
                top: position.top,
                left: position.left,
                width: width,
                height: height
            });
        },
        destroy: function () {
            $.Widget.prototype.destroy.apply(this, arguments);
        }
    });
    $.extend($.ui.igWidget, { version: 17.2 })
}(jQuery));
