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
            currentValue: 0,
            autoStart: true
        },
        events: {
            tick: "tick"
        },
        _create: function () {
            this.options.currentValue = this.options.startValue;
            this._render();
            if (this.options.autoStart) {
                this.start();
            }
        },
        _setOption: function name(option, value) {
            var css = this.css;
            var elements;
            var prevValue = this.options[option];
            if (prevValue === value) {
                return;
            }
            $.Widget.prototype._setOption.apply(this, arguments);
            switch (option) {
                case "currentValue":
                    this._renderCurrentValue();
                    break;
                default:
                    break;
            }
        },
        _render: function () {
            var countContainer = $("<div/>");
            // var width = this.element.outerWidth();
            // var height = this.element.outerHeight();
            // var position = this.element.position();

            this.element.addClass(this.css.widget);
            countContainer.addClass(this.css.countContainer);
            countContainer.append($("<span/>"));
            this.element.prepend(countContainer);
            this._renderCurrentValue();
            this._positionContainer();
            this._attachEvents();
        },
        _renderCurrentValue: function () {
            this.element.find(".ui-igcountdown-counter>span").text(this.options.currentValue)
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
        start: function () {
            this._intervalID = setInterval($.proxy(this.decrement, this, true), 1000);
        },
        stop: function () {
            if (this._intervalID) {
                clearInterval(this._intervalID);
                delete this._intervalID;
            }
        },
        decrement: function (raiseEvent) {
            if (this.options.currentValue > 0) {
                this.element.find(".ui-igcountdown-container > span").text(--this.options.currentValue);
                if (raiseEvent) {
                    this._trggerTick();
                }
            } else if (this._intervalID) {
                clearInterval(this._intervalID);
                delete this._intervalID;
            }
        },
        _attachEvents: function () {
            this._windowResizeHandler = $.proxy(this._positionContainer, this);
            $(window).on("resize", this._windowResizeHandler);
        },
        _trggerTick: function () {
            var args = {
                currentValue: this.options.currentValue
            };
            this._trigger(this.events.tick, null, args);
        },
        destroy: function () {
            $.Widget.prototype.destroy.apply(this, arguments);
            $(window).off("resize", this._windowResizeHandler);
            this.element.removeClass(this.css.widget);
            this.element.children(".ui-igcountdown-counter").remove();
            return this;
        }
    });
    $.extend($.ui.igWidget, { version: 17.2 })
}(jQuery));
