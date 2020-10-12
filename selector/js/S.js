function S() {
    this.selected = '';
    this.textLastMethod = '';
    this.childrenArr = [];

    return function (selector) {
        this.selected = selector;

        if (selector instanceof HTMLElement) {

            if (!selector.id) {
                this.selected = selector.className;
            } else {
                this.selected = '#' + selector.id;
            }
        }

        return this;
    }.bind(this)

}

S.load = function (cb) {
    window.addEventListener('load', function () {
        cb();
    })
};

S.ready = function (cb) {
    document.addEventListener('DOMContentLoaded', function () {
        cb();
    });
};

S.prototype.children = function (cb) {
    this.childrenArr = document.querySelector(this.selected).children;
    this.lastMethod('children');
    if (cb) return cb(this.childrenArr);
    return this;
};

S.prototype.first = function (cb) {
    return this[this.textLastMethod](function (elements) {
        return elements[0];
    });
};

S.prototype.last = function (cb) {
    return this[this.textLastMethod](function (elements) {
        return elements[elements.length - 1];
    });
};

S.prototype.lastMethod = function (methodName) {
    this.textLastMethod = methodName;
}

S.prototype.elementLength = function () {
    if (!this.textLastMethod || this.textLastMethod.length < 1) {
        throw Error("unactive pre methods");
    }

    return this[this.textLastMethod](function (elements) {
        return elements.length;
    });
};

S.prototype.get = function () {
    if (!this.textLastMethod || this.textLastMethod.length < 1) {
        throw Error("unactive pre methods");
    }

    return this[this.textLastMethod](function (elements) {
        return elements;
    });
};

S.prototype.each = function (cb) {
    if (!cb) throw Error('each function must have to arguments');
    return this[this.textLastMethod](function (elements) {
        if (!elements.length) throw Error("this element is not iterable");
        for (var i = 0; i < elements.length; i++) {
            cb(elements[i]);
        }
    });
};


S.prototype.eachAsync = function (cb) {
    if (!cb) throw Error('each function must have to arguments');
    return this[this.textLastMethod](function (elements) {
        if (!elements.length) throw Error("this element is not iterable");
        for (var i = 0; i < elements.length; i++) {
            setTimeout(function () {
                cb(elements[i]);
            }, 0)
        }
    });
};