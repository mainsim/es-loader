/**
 * @Javascript asynchronous file loader
 * @version 1.0
 * @author Macolic Sven <macolic.sven@gmail.com>
 *
 * @license 
 *
 * Javascript asynchronous file loader
 *
 * Copyright (c) 2018 Macolic Sven
 * 
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
 
"use strict";

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var loader = (function() {
  /**
  * @description Class constructor
  * @returns void
  */
  function loader() {
    var _this = this;

    _classCallCheck(this, loader);

    this.classes = new Map();
    this.app_data = new String();
    window.onload = function(e) {
      _this.app_data = document
        .querySelector("[app-load]")
        .getAttribute("app-load");
      _this.load([_this.app_data]).then(function(cls) {
        var start = new cls[
          _this.app_data.match(/\//)
            ? _this.app_data.split("/").pop()
            : [_this.app_data]
        ]();
      });
    };
  }

  /**
  * @description Class map setter
  * @param {object} cls - Class to register
  * @returns void
  */

  /**
  * @description Classes preload method
  * @param {string} clsName - Class name
  * @param {string} ns - Class namespace
  * @param {array} classes - File names for loading
  * @param {object} fn - Function containing promised class
  * @returns void
  */
  loader.prototype.preload = function preload(clsName, ns, classes, fn) {
    var _this2 = this;

    var cls = void 0;
    switch (this.include.has(clsName)) {
      case true:
        cls = this.include.get(clsName);
        break;
      default:
        cls = new Object();
        this.define(cls, "name", clsName);
        break;
    }
    this.define(cls, ns, function() {
      return _this2.load(classes).then(fn);
    });
    this.include = cls;
  };

  /**
  * @description Classes load method
  * @param {array} clsNames - File collection to load
  * @returns Promise
  */

  loader.prototype.load = function load(clsNames) {
    var _this3 = this;

    return new Promise(function(resolve) {
      var collection = [];
      Object.keys(clsNames).forEach(function(i) {
        var cls = clsNames[i].match(/\//)
          ? clsNames[i].split("/").pop()
          : [clsNames[i]];
        switch (_this3.include.has(cls)) {
          case true:
            collection[cls] = _this3.include.get(cls);
            i == clsNames.length - 1 && resolve(collection);
            break;
          default:
            var head = document.querySelector("HEAD");
            var script = document.createElement("SCRIPT");
            script.type = "text/javascript";
            script.src = clsNames[i] + ".js";
            script.onload = function(e) {
              collection[cls] = _this3.include.get(cls);
              i == clsNames.length - 1 && resolve(collection);
            };
            script.onerror = function(e) {
              return console.log(
                "Filename " + clsNames[i] + ".js does not exist!"
              );
            };
            head.insertBefore(script, head.children[head.children.length - 1]);
            break;
        }
      });
    });
  };

  /**
  * @description Class load method
  * @param {object} obj - Object to set property to
  * @param {string} prop - Property name
  * @param {object} val - Promise object containing class
  * @returns void
  */

  loader.prototype.define = function define(obj, prop, val) {
    Object.defineProperty(obj, prop, {
      value: val
    });
  };

  _createClass(loader, [
    {
      key: "include",
      set: function set(cls) {
        this.classes.set(cls.name, cls);
      },

      /**
   * @description Class map getter
   * @returns Map object
   */
      get: function get() {
        return this.classes;
      }
    }
  ]);

  return loader;
})();

Object.defineProperty(
  window,
  document.querySelector("[app-load]").getAttribute("instance"),
  {
    value: new loader()
  }
);
