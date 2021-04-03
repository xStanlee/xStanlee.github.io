// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"after/ToolsUI.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToolsUI = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ToolsUI = /*#__PURE__*/function () {
  function ToolsUI(container) {
    _classCallCheck(this, ToolsUI);

    var root = this.createRoot();
    this.createButtons(root);
    this.attachToContainer(container, root);
    this.subscribers = [];
  }

  _createClass(ToolsUI, [{
    key: "createRoot",
    value: function createRoot() {
      var root = document.createElement('div');
      root.classList.add('flex', 'flex-row');
      return root;
    }
  }, {
    key: "createButtons",
    value: function createButtons(root) {
      root.appendChild(this.createButton('Pencil', 'pencil'));
      root.appendChild(this.createButton('Brush', 'brush'));
      root.appendChild(this.createButton('Shape', 'shape'));
      root.appendChild(this.createButton('Image', 'image'));
    }
  }, {
    key: "attachToContainer",
    value: function attachToContainer(container, root) {
      document.querySelector(container).appendChild(root);
    }
  }, {
    key: "createButton",
    value: function createButton(name, selector) {
      var _this = this;

      var btn = document.createElement('button');
      btn.setAttribute('data-tool', selector);
      btn.textContent = name;
      btn.addEventListener('click', function () {
        _this.subscribers.forEach(function (s) {
          return s(selector);
        });
      });
      return btn;
    }
  }, {
    key: "subscribe",
    value: function subscribe(subscriber) {
      this.subscribers.push(subscriber);
    }
  }]);

  return ToolsUI;
}();

exports.ToolsUI = ToolsUI;
},{}],"after/Brush.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Brush = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Brush = /*#__PURE__*/function () {
  function Brush(capSize, color) {
    _classCallCheck(this, Brush);

    this._drawing = false;
    this._capSize = capSize || 2;
    this._color = color || 'red';
  }

  _createClass(Brush, [{
    key: "onMouseMove",
    value: function onMouseMove(x, y, ctx) {
      if (this._drawing) {
        ctx.lineWidth = this._capSize;
        ctx.lineCap = 'round';
        ctx.strokeStyle = this._color;
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    }
  }, {
    key: "onMouseUp",
    value: function onMouseUp(x, y, ctx) {
      this._drawing = false;
      ctx.beginPath();
    }
  }, {
    key: "onMouseDown",
    value: function onMouseDown(x, y, ctx) {
      if (!this._drawing) {
        this._drawing = true;
      }
    }
  }]);

  return Brush;
}();

exports.Brush = Brush;
},{}],"after/Pencil.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pencil = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Pencil = /*#__PURE__*/function () {
  function Pencil(capSize, color) {
    _classCallCheck(this, Pencil);

    this._drawing = false;
    this._capSize = capSize || 1;
    this._color = color || 'white';
  }

  _createClass(Pencil, [{
    key: "onMouseMove",
    value: function onMouseMove(x, y, ctx) {
      if (this._drawing) {
        ctx.lineWidth = this._capSize;
        ctx.lineCap = 'round';
        ctx.strokeStyle = this._color;
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    }
  }, {
    key: "onMouseUp",
    value: function onMouseUp(x, y, ctx) {
      this._drawing = false;
      ctx.beginPath();
    }
  }, {
    key: "onMouseDown",
    value: function onMouseDown(x, y, ctx) {
      if (!this._drawing) {
        this._drawing = true;
      }
    }
  }]);

  return Pencil;
}();

exports.Pencil = Pencil;
},{}],"after/Shape.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Shape = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Shape = /*#__PURE__*/function () {
  function Shape(size, color) {
    _classCallCheck(this, Shape);

    this._size = size || 10;
    this._color = color || 'orangered';
  }

  _createClass(Shape, [{
    key: "onMouseMove",
    value: function onMouseMove(x, y, ctx) {}
  }, {
    key: "onMouseUp",
    value: function onMouseUp(x, y, ctx) {}
  }, {
    key: "onMouseDown",
    value: function onMouseDown(x, y, ctx) {
      ctx.strokeStyle = this._color;
      ctx.strokeRect(x - this._size / 2, y - this._size / 2, this._size, this._size);
    }
  }]);

  return Shape;
}();

exports.Shape = Shape;
},{}],"after/Image.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Image = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Image = /*#__PURE__*/function () {
  function Image(width, height, src) {
    _classCallCheck(this, Image);

    this.width = width || 16;
    this.height = height || 16;
    this._src = src || "../Images/Colored/PNG/user.png";
  }

  _createClass(Image, [{
    key: "createImage",
    value: function createImage() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var img = new Image();
        img.addEventListener('load', function () {
          return resolve(img);
        });
        img.addEventListener('error', function (err) {
          return reject(err);
        });
        img.src = _this.src;
      });
    }
  }, {
    key: "onMouseMove",
    value: function onMouseMove(x, y, ctx) {}
  }, {
    key: "onMouseUp",
    value: function onMouseUp(x, y, ctx) {}
  }, {
    key: "onMouseDown",
    value: function onMouseDown(x, y, ctx) {
      var result = this.createImage();
      result.then(function (img) {
        return console.log(img);
      }).catch(function (err) {
        return console.log(err);
      });
    }
  }]);

  return Image;
}();

exports.Image = Image;
},{}],"after/ToolsFactory.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToolsFactory = void 0;

var _Brush = require("./Brush.js");

var _Pencil = require("./Pencil.js");

var _Shape = require("./Shape.js");

var _Image = require("./Image.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ToolsFactory = /*#__PURE__*/function () {
  function ToolsFactory() {
    _classCallCheck(this, ToolsFactory);

    this.brush = new _Brush.Brush(2, 'red');
    this.pencil = new _Pencil.Pencil(1, 'white');
    this.shape = new _Shape.Shape(5, 'orangered');
    this.image = new _Image.Image(16, 16);
  }

  _createClass(ToolsFactory, [{
    key: "getTool",
    value: function getTool(tool) {
      switch (tool) {
        case 'brush':
          return this.brush;

        case 'pencil':
          return this.pencil;

        case 'shape':
          return this.shape;

        case 'image':
          return this.image;
      }
    }
  }]);

  return ToolsFactory;
}();

exports.ToolsFactory = ToolsFactory;
},{"./Brush.js":"after/Brush.js","./Pencil.js":"after/Pencil.js","./Shape.js":"after/Shape.js","./Image.js":"after/Image.js"}],"after/DrawingBoardUI.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrawingBoardUI = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DrawingBoardUI = /*#__PURE__*/function () {
  function DrawingBoardUI(container, width, height) {
    _classCallCheck(this, DrawingBoardUI);

    this.currentTool = null;
    this.attachCanvas(container, this.createCanvas(width, height));
  }

  _createClass(DrawingBoardUI, [{
    key: "createCanvas",
    value: function createCanvas(width, height) {
      var _this = this;

      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      canvas.width = width;
      canvas.height = height;
      canvas.addEventListener('mousemove', function (ev) {
        if (_this.currentTool) {
          _this.currentTool.onMouseMove(ev.offsetX, ev.offsetY, ctx);
        }
      });
      canvas.addEventListener('mousedown', function (ev) {
        if (_this.currentTool) {
          _this.currentTool.onMouseDown(ev.offsetX, ev.offsetY, ctx);
        }
      });
      canvas.addEventListener('mouseup', function (ev) {
        if (_this.currentTool) {
          _this.currentTool.onMouseUp(ev.offsetX, ev.offsetY, ctx);
        }
      });
      return canvas;
    }
  }, {
    key: "attachCanvas",
    value: function attachCanvas(container, canvas) {
      document.querySelector(container).appendChild(canvas);
    }
  }, {
    key: "changeTool",
    value: function changeTool(tool) {
      this.currentTool = tool;
    }
  }]);

  return DrawingBoardUI;
}();

exports.DrawingBoardUI = DrawingBoardUI;
},{}],"after/DrawingContextUI.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrawingContextUI = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DrawingContextUI = /*#__PURE__*/function () {
  function DrawingContextUI(container) {
    _classCallCheck(this, DrawingContextUI);

    this.context = document.createElement('div');
    this.context.textContent = '⬆️ Select a tool first ⬆️';
    document.querySelector(container).appendChild(this.context);
  }

  _createClass(DrawingContextUI, [{
    key: "updateContext",
    value: function updateContext(tool) {
      this.context.textContent = this.formatText(tool);
    }
  }, {
    key: "formatText",
    value: function formatText(tool) {
      switch (tool) {
        case 'brush':
          return "Selected tool \uD83E\uDDF9";

        case 'pencil':
          return "Selected tool \u270F\uFE0F";

        case 'shape':
          return "Selected tool \uD83D\uDD32";

        case 'image':
          return 'Selected tool image';
      }
    }
  }]);

  return DrawingContextUI;
}();

exports.DrawingContextUI = DrawingContextUI;
},{}],"after.js":[function(require,module,exports) {
"use strict";

var _ToolsUI = require("./after/ToolsUI.js");

var _ToolsFactory = require("./after/ToolsFactory.js");

var _DrawingBoardUI = require("./after/DrawingBoardUI.js");

var _DrawingContextUI = require("./after/DrawingContextUI.js");

window.addEventListener('DOMContentLoaded', function (ev) {
  // fullScreen instruction
  alert('Press enter to apply correct action on our LED screen.');
  var domElem = document.documentElement;
  document.addEventListener('keypress', fullScreenMode);

  function fullScreenMode(e) {
    if (e.code === 'Enter') {
      domElem.requestFullscreen ? domElem.requestFullscreen() : alert('Problem with full screen mode please press F11');
    }
  }

  var factory = new _ToolsFactory.ToolsFactory();
  var tools = new _ToolsUI.ToolsUI('.js-tools');
  var board = new _DrawingBoardUI.DrawingBoardUI('.js-canvas', 54, 24);
  var context = new _DrawingContextUI.DrawingContextUI('.js-context');
  tools.subscribe(function (selectedTool) {
    var tool = factory.getTool(selectedTool);
    board.changeTool(tool);
  });
  tools.subscribe(function (selectedTool) {
    context.updateContext(selectedTool);
  });
});
},{"./after/ToolsUI.js":"after/ToolsUI.js","./after/ToolsFactory.js":"after/ToolsFactory.js","./after/DrawingBoardUI.js":"after/DrawingBoardUI.js","./after/DrawingContextUI.js":"after/DrawingContextUI.js"}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49691" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","after.js"], null)
//# sourceMappingURL=/after.6f1b26dc.js.map