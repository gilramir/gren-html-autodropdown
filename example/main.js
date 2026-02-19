(function(scope){
'use strict';

/* @__NO_SIDE_EFFECTS__ */
function F2(fun) {
  var wrapper = function(a) { return function(b) { return fun(a,b); }; };
  wrapper.a2 = fun;
  return wrapper;
}
/* @__NO_SIDE_EFFECTS__ */
function F3(fun) {
  var wrapper = function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  };
  wrapper.a3 = fun;
  return wrapper;
}
/* @__NO_SIDE_EFFECTS__ */
function F4(fun) {
  var wrapper = function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  };
  wrapper.a4 = fun;
  return wrapper;
}
/* @__NO_SIDE_EFFECTS__ */
function F5(fun) {
  var wrapper = function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  };
  wrapper.a5 = fun;
  return wrapper;
}
/* @__NO_SIDE_EFFECTS__ */
function F6(fun) {
  var wrapper = function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  };
  wrapper.a6 = fun;
  return wrapper;
}
/* @__NO_SIDE_EFFECTS__ */
function F7(fun) {
  var wrapper = function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  };
  wrapper.a7 = fun;
  return wrapper;
}
/* @__NO_SIDE_EFFECTS__ */
function F8(fun) {
  var wrapper = function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  };
  wrapper.a8 = fun;
  return wrapper;
}
/* @__NO_SIDE_EFFECTS__ */
function F9(fun) {
  var wrapper = function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  };
  wrapper.a9 = fun;
  return wrapper;
}

/* @__NO_SIDE_EFFECTS__ */
function A2(fun, a, b) {
  return fun.a2 ? fun.a2(a, b) : fun(a)(b);
}
/* @__NO_SIDE_EFFECTS__ */
function A3(fun, a, b, c) {
  return fun.a3 ? fun.a3(a, b, c) : fun(a)(b)(c);
}
/* @__NO_SIDE_EFFECTS__ */
function A4(fun, a, b, c, d) {
  return fun.a4 ? fun.a4(a, b, c, d) : fun(a)(b)(c)(d);
}
/* @__NO_SIDE_EFFECTS__ */
function A5(fun, a, b, c, d, e) {
  return fun.a5 ? fun.a5(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
/* @__NO_SIDE_EFFECTS__ */
function A6(fun, a, b, c, d, e, f) {
  return fun.a6 ? fun.a6(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
/* @__NO_SIDE_EFFECTS__ */
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a7 ? fun.a7(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
/* @__NO_SIDE_EFFECTS__ */
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a8 ? fun.a8(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
/* @__NO_SIDE_EFFECTS__ */
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a9 ? fun.a9(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}



// ELEMENT

var _Browser_element = F3(function (impl, flagDecoder, args) {
  return _Platform_initialize(
    flagDecoder,
    args,
    impl.init,
    impl.update,
    impl.subscriptions,
    function (sendToApp, initialModel) {
      var view = impl.view;
      /**_UNUSED/
			var domNode = args['node'];
			//*/
      /**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
      var currNode = _VirtualDom_virtualize(domNode);

      return _Browser_makeAnimator(initialModel, function (model) {
        var nextNode = view(model);
        var patches = _VirtualDom_diff(currNode, nextNode);
        domNode = _VirtualDom_applyPatches(
          domNode,
          currNode,
          patches,
          sendToApp,
        );
        currNode = nextNode;
      });
    },
  );
});

// DOCUMENT

var _Browser_document = F3(function (impl, flagDecoder, args) {
  return _Platform_initialize(
    flagDecoder,
    args,
    impl.init,
    impl.update,
    impl.subscriptions,
    function (sendToApp, initialModel) {
      var divertHrefToApp = impl.setup && impl.setup(sendToApp);
      var view = impl.view;
      var title = _VirtualDom_doc.title;
      var bodyNode = _VirtualDom_doc.body;
      var currNode = _VirtualDom_virtualize(bodyNode);
      return _Browser_makeAnimator(initialModel, function (model) {
        _VirtualDom_divertHrefToApp = divertHrefToApp;
        var doc = view(model);
        var nextNode = _VirtualDom_node("body")([])(doc.body);
        var patches = _VirtualDom_diff(currNode, nextNode);
        bodyNode = _VirtualDom_applyPatches(
          bodyNode,
          currNode,
          patches,
          sendToApp,
        );
        currNode = nextNode;
        _VirtualDom_divertHrefToApp = 0;
        title !== doc.title &&
          (_VirtualDom_doc.title = title = doc.title);
      });
    },
  );
});

// ANIMATION

var _Browser_cancelAnimationFrame =
  typeof cancelAnimationFrame !== "undefined"
    ? cancelAnimationFrame
    : function (id) {
        clearTimeout(id);
      };

var _Browser_requestAnimationFrame =
  typeof requestAnimationFrame !== "undefined"
    ? requestAnimationFrame
    : function (callback) {
        return setTimeout(callback, 1000 / 60);
      };

function _Browser_makeAnimator(model, draw) {
  draw(model);

  var state = 0;

  function updateIfNeeded() {
    state =
      state === 1
        ? 0
        : (_Browser_requestAnimationFrame(updateIfNeeded),
          draw(model),
          1);
  }

  return function (nextModel, isSync) {
    model = nextModel;

    isSync
      ? (draw(model),
        state === 2 && (state = 1))
      : (state === 0 &&
          _Browser_requestAnimationFrame(updateIfNeeded),
        (state = 2));
  };
}

// APPLICATION

function _Browser_application(impl) {
  var onUrlChange = impl.onUrlChange;
  var onUrlRequest = impl.onUrlRequest;
  var key = function () {
    key.a(onUrlChange(_Browser_getUrl()));
  };

  return _Browser_document({
    setup: function (sendToApp) {
      key.a = sendToApp;
      _Browser_window.addEventListener("popstate", key);
      _Browser_window.navigator.userAgent.indexOf("Trident") < 0 ||
        _Browser_window.addEventListener("hashchange", key);

      return F2(function (domNode, event) {
        if (
          !event.ctrlKey &&
          !event.metaKey &&
          !event.shiftKey &&
          event.button < 1 &&
          !domNode.target &&
          !domNode.hasAttribute("download")
        ) {
          event.preventDefault();
          var href = domNode.href;
          var curr = _Browser_getUrl();
          var next = $gren_lang$url$Url$fromString(href).a;
          sendToApp(
            onUrlRequest(
              next &&
                curr.protocol === next.protocol &&
                curr.host === next.host &&
                curr.port_.a === next.port_.a
                ? $gren_lang$browser$Browser$Internal(next)
                : $gren_lang$browser$Browser$External(href),
            ),
          );
        }
      });
    },
    init: function (flags) {
      return A3(impl.init, flags, _Browser_getUrl(), key);
    },
    view: impl.view,
    update: impl.update,
    subscriptions: impl.subscriptions,
  });
}

function _Browser_getUrl() {
  return $gren_lang$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function (key, n) {
  return A2(
    $gren_lang$core$Task$perform,
    $gren_lang$core$Basics$never,
    _Scheduler_binding(function () {
      n && history.go(n);
      key();
    }),
  );
});

var _Browser_pushUrl = F2(function (key, url) {
  return A2(
    $gren_lang$core$Task$perform,
    $gren_lang$core$Basics$never,
    _Scheduler_binding(function () {
      history.pushState({}, "", url);
      key();
    }),
  );
});

var _Browser_replaceUrl = F2(function (key, url) {
  return A2(
    $gren_lang$core$Task$perform,
    $gren_lang$core$Basics$never,
    _Scheduler_binding(function () {
      history.replaceState({}, "", url);
      key();
    }),
  );
});

// GLOBAL EVENTS

var _Browser_fakeNode = {
  addEventListener: function () {},
  removeEventListener: function () {},
};
var _Browser_doc =
  typeof document !== "undefined" ? document : _Browser_fakeNode;
var _Browser_window =
  typeof window !== "undefined" ? window : _Browser_fakeNode;

var _Browser_on = F3(function (node, eventName, sendToSelf) {
  return _Scheduler_spawn(
    _Scheduler_binding(function (callback) {
      function handler(event) {
        _Scheduler_rawSpawn(sendToSelf(event));
      }
      node.addEventListener(
        eventName,
        handler,
        _VirtualDom_passiveSupported && { passive: true },
      );
      return function () {
        node.removeEventListener(eventName, handler);
      };
    }),
  );
});

var _Browser_decodeEvent = F2(function (decoder, event) {
  var result = _Json_runHelp(decoder, event);
  return $gren_lang$core$Result$isOk(result) ? $gren_lang$core$Maybe$Just(result.a) : $gren_lang$core$Maybe$Nothing;
});

// PAGE VISIBILITY

function _Browser_visibilityInfo() {
  return typeof _VirtualDom_doc.hidden !== "undefined"
    ? { hidden: "hidden", change: "visibilitychange" }
    : typeof _VirtualDom_doc.mozHidden !== "undefined"
      ? { hidden: "mozHidden", change: "mozvisibilitychange" }
      : typeof _VirtualDom_doc.msHidden !== "undefined"
        ? { hidden: "msHidden", change: "msvisibilitychange" }
        : typeof _VirtualDom_doc.webkitHidden !== "undefined"
          ? { hidden: "webkitHidden", change: "webkitvisibilitychange" }
          : { hidden: "hidden", change: "visibilitychange" };
}

// ANIMATION FRAMES

function _Browser_rAF() {
  return _Scheduler_binding(function (callback) {
    var id = _Browser_requestAnimationFrame(function () {
      callback(_Scheduler_succeed(Date.now()));
    });

    return function () {
      _Browser_cancelAnimationFrame(id);
    };
  });
}

function _Browser_now() {
  return _Scheduler_binding(function (callback) {
    callback(_Scheduler_succeed(Date.now()));
  });
}

// DOM STUFF

function _Browser_withNode(id, doStuff) {
  return _Scheduler_binding(function (callback) {
    _Browser_requestAnimationFrame(function () {
      var node = document.getElementById(id);
      callback(
        node
          ? _Scheduler_succeed(doStuff(node))
          : _Scheduler_fail($gren_lang$browser$Browser$Dom$NotFound(id)),
      );
    });
  });
}

function _Browser_withWindow(doStuff) {
  return _Scheduler_binding(function (callback) {
    _Browser_requestAnimationFrame(function () {
      callback(_Scheduler_succeed(doStuff()));
    });
  });
}

// FOCUS and BLUR

var _Browser_call = F2(function (functionName, id) {
  return _Browser_withNode(id, function (node) {
    node[functionName]();
    return {};
  });
});

// WINDOW VIEWPORT

function _Browser_getViewport() {
  return {
    scene: _Browser_getScene(),
    viewport: {
      x: _Browser_window.pageXOffset,
      y: _Browser_window.pageYOffset,
      width: _Browser_doc.documentElement.clientWidth,
      height: _Browser_doc.documentElement.clientHeight,
    },
  };
}

function _Browser_getScene() {
  var body = _Browser_doc.body;
  var elem = _Browser_doc.documentElement;
  return {
    width: Math.max(
      body.scrollWidth,
      body.offsetWidth,
      elem.scrollWidth,
      elem.offsetWidth,
      elem.clientWidth,
    ),
    height: Math.max(
      body.scrollHeight,
      body.offsetHeight,
      elem.scrollHeight,
      elem.offsetHeight,
      elem.clientHeight,
    ),
  };
}

var _Browser_setViewport = F2(function (x, y) {
  return _Browser_withWindow(function () {
    _Browser_window.scroll(x, y);
    return {};
  });
});

// ELEMENT VIEWPORT

function _Browser_getViewportOf(id) {
  return _Browser_withNode(id, function (node) {
    return {
      scene: {
        width: node.scrollWidth,
        height: node.scrollHeight,
      },
      viewport: {
        x: node.scrollLeft,
        y: node.scrollTop,
        width: node.clientWidth,
        height: node.clientHeight,
      },
    };
  });
}

var _Browser_setViewportOf = F3(function (id, x, y) {
  return _Browser_withNode(id, function (node) {
    node.scrollLeft = x;
    node.scrollTop = y;
    return {};
  });
});

// ELEMENT

function _Browser_getElement(id) {
  return _Browser_withNode(id, function (node) {
    var rect = node.getBoundingClientRect();
    var x = _Browser_window.pageXOffset;
    var y = _Browser_window.pageYOffset;
    return {
      scene: _Browser_getScene(),
      viewport: {
        x: x,
        y: y,
        width: _Browser_doc.documentElement.clientWidth,
        height: _Browser_doc.documentElement.clientHeight,
      },
      element: {
        x: x + rect.left,
        y: y + rect.top,
        width: rect.width,
        height: rect.height,
      },
    };
  });
}

// LOAD and RELOAD

function _Browser_reload(skipCache) {
  return A2(
    $gren_lang$core$Task$perform,
    $gren_lang$core$Basics$never,
    _Scheduler_binding(function (callback) {
      _VirtualDom_doc.location.reload(skipCache);
    }),
  );
}

function _Browser_load(url) {
  return A2(
    $gren_lang$core$Task$perform,
    $gren_lang$core$Basics$never,
    _Scheduler_binding(function (callback) {
      try {
        _Browser_window.location = url;
      } catch (err) {
        // Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
        // Other browsers reload the page, so let's be consistent about that.
        _VirtualDom_doc.location.reload(false);
      }
    }),
  );
}


// LOG

var _Debug_log_UNUSED = F2(function (tag, value) {
  return value;
});

var _Debug_log = F2(function (tag, value) {
  console.log(tag + ": " + _Debug_toString(value));
  return value;
});

// TODOS

function _Debug_todo(moduleName, region) {
  return function (message) {
    _Debug_crash(8, moduleName, region, message);
  };
}

function _Debug_todoCase(moduleName, region, value) {
  return function (message) {
    _Debug_crash(9, moduleName, region, value, message);
  };
}

// TO STRING

function _Debug_toString_UNUSED(value) {
  return "<internals>";
}

function _Debug_toString(value) {
  return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value) {
  if (value == null) {
    return _Debug_internalColor(ansi, "<null>");
  }

  if (typeof value === "function") {
    return _Debug_internalColor(ansi, "<function>");
  }

  if (typeof value === "boolean") {
    return _Debug_ctorColor(ansi, value ? "True" : "False");
  }

  if (typeof value === "number") {
    return _Debug_numberColor(ansi, value + "");
  }

  if (value instanceof String) {
    return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
  }

  if (typeof value === "string") {
    return _Debug_stringColor(
      ansi,
      '"' + _Debug_addSlashes(value, false) + '"',
    );
  }

  if (Array.isArray(value)) {
    var output = "[";

    value.length > 0 && (output += _Debug_toAnsiString(ansi, value[0]));

    for (var idx = 1; idx < value.length; idx++) {
      output += ", " + _Debug_toAnsiString(ansi, value[idx]);
    }

    return output + "]";
  }

  if (typeof value === "object" && "$" in value) {
    var tag = value.$;

    if (typeof tag === "number") {
      return _Debug_internalColor(ansi, "<internals>");
    }

    if (tag === "Set_gren_builtin") {
      return (
        _Debug_ctorColor(ansi, "Set") +
        _Debug_fadeColor(ansi, ".fromArray") +
        " " +
        _Debug_toAnsiString(ansi, $gren_lang$core$Set$toArray(value))
      );
    }

    if (tag === "RBNode_gren_builtin" || tag === "RBEmpty_gren_builtin") {
      return (
        _Debug_ctorColor(ansi, "Dict") +
        _Debug_fadeColor(ansi, ".fromArray") +
        " " +
        _Debug_toAnsiString(
          ansi,
          A3(
            $gren_lang$core$Dict$foldl,
            F3(function (key, value, acc) {
              acc.push({ key: key, value: value });
              return acc;
            }),
            [],
            value,
          ),
        )
      );
    }

    var output = "";
    for (var i in value) {
      if (i === "$") continue;
      var str = _Debug_toAnsiString(ansi, value[i]);
      var c0 = str[0];
      var parenless =
        c0 === "{" ||
        c0 === "(" ||
        c0 === "[" ||
        c0 === "<" ||
        c0 === '"' ||
        str.indexOf(" ") < 0;
      output += " " + (parenless ? str : "(" + str + ")");
    }
    return _Debug_ctorColor(ansi, tag) + output;
  }

  if (value instanceof DataView) {
    return _Debug_stringColor(ansi, "<" + value.byteLength + " bytes>");
  }

  if (typeof File !== "undefined" && value instanceof File) {
    return _Debug_internalColor(ansi, "<" + value.name + ">");
  }

  if (
    typeof _Array_Builder !== "undefined" &&
    value instanceof _Array_Builder
  ) {
    return _Debug_toAnsiString(ansi, value.array.slice(0, value.target));
  }

  if (typeof value === "object") {
    var output = [];
    for (var key in value) {
      var field = key[0] === "_" ? key.slice(1) : key;
      output.push(
        _Debug_fadeColor(ansi, field) +
          " = " +
          _Debug_toAnsiString(ansi, value[key]),
      );
    }
    if (output.length === 0) {
      return "{}";
    }
    return "{ " + output.join(", ") + " }";
  }

  return _Debug_internalColor(ansi, "<internals>");
}

function _Debug_addSlashes(str, isChar) {
  var s = str
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/\t/g, "\\t")
    .replace(/\r/g, "\\r")
    .replace(/\v/g, "\\v")
    .replace(/\0/g, "\\0");

  if (isChar) {
    return s.replace(/\'/g, "\\'");
  } else {
    return s.replace(/\"/g, '\\"');
  }
}

function _Debug_ctorColor(ansi, string) {
  return ansi ? "\x1b[96m" + string + "\x1b[0m" : string;
}

function _Debug_numberColor(ansi, string) {
  return ansi ? "\x1b[95m" + string + "\x1b[0m" : string;
}

function _Debug_stringColor(ansi, string) {
  return ansi ? "\x1b[93m" + string + "\x1b[0m" : string;
}

function _Debug_charColor(ansi, string) {
  return ansi ? "\x1b[92m" + string + "\x1b[0m" : string;
}

function _Debug_fadeColor(ansi, string) {
  return ansi ? "\x1b[37m" + string + "\x1b[0m" : string;
}

function _Debug_internalColor(ansi, string) {
  return ansi ? "\x1b[36m" + string + "\x1b[0m" : string;
}

function _Debug_toHexDigit(n) {
  return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}

// CRASH

function _Debug_crash_UNUSED(identifier) {
  throw new Error(
    "https://github.com/gren-lang/core/blob/1.0.0/hints/" + identifier + ".md",
  );
}

function _Debug_crash(identifier, fact1, fact2, fact3, fact4) {
  switch (identifier) {
    case 0:
      throw new Error(
        'What node should I take over? In JavaScript I need something like:\n\n    Gren.Main.init({\n        node: document.getElementById("gren-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.',
      );

    case 1:
      throw new Error(
        "Browser.application programs cannot handle URLs like this:\n\n    " +
          document.location.href +
          "\n\nWhat is the root? The root of your file system?",
      );

    case 2:
      var jsonErrorString = fact1;
      throw new Error(
        "Problem with the flags given to your Gren program on initialization.\n\n" +
          jsonErrorString,
      );

    case 3:
      var portName = fact1;
      throw new Error(
        "There can only be one port named `" +
          portName +
          "`, but your program has multiple.",
      );

    case 4:
      var portName = fact1;
      var problem = fact2;
      throw new Error(
        "Trying to send an unexpected type of value through port `" +
          portName +
          "`:\n" +
          problem,
      );

    case 5:
      throw new Error(
        'Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Gren sense.\nRead more about this at https://package.gren-lang.org/packages/gren-lang/core/latest/Basics#== which describes why it is this way and what the better version will look like.',
      );

    case 6:
      var moduleName = fact1;
      throw new Error(
        "Your page is loading multiple Gren scripts with a module named " +
          moduleName +
          ". Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!",
      );

    case 8:
      var moduleName = fact1;
      var region = fact2;
      var message = fact3;
      throw new Error(
        "TODO in module `" +
          moduleName +
          "` " +
          _Debug_regionToString(region) +
          "\n\n" +
          message,
      );

    case 9:
      var moduleName = fact1;
      var region = fact2;
      var value = fact3;
      var message = fact4;
      throw new Error(
        "TODO in module `" +
          moduleName +
          "` from the `case` expression " +
          _Debug_regionToString(region) +
          "\n\nIt received the following value:\n\n    " +
          _Debug_toString(value).replace("\n", "\n    ") +
          "\n\nBut the branch that handles it says:\n\n    " +
          message.replace("\n", "\n    "),
      );

    case 10:
      throw new Error("Bug in https://github.com/gren-lang/core/issues");

    case 11:
      throw new Error("Cannot perform mod 0. Division by zero error.");
  }
}

function _Debug_regionToString(region) {
  if (region.start.line === region.end.line) {
    return "on line " + region.start.line;
  }
  return (
    "on lines " + region.start.line + " through " + region.end.line
  );
}
var $gren_lang$core$Dict$foldl$ = function(func, acc, dict) {
	foldl:
	while (true) {
		if (dict.$ === 'RBEmpty_gren_builtin') {
			return acc;
		} else {
			var _v1 = dict.a;
			var key = _v1.key;
			var value = _v1.value;
			var left = _v1.left;
			var right = _v1.right;
			var $temp$func = func,
			$temp$acc = A3(func, key, value, $gren_lang$core$Dict$foldl$(func, acc, left)),
			$temp$dict = right;
			func = $temp$func;
			acc = $temp$acc;
			dict = $temp$dict;
			continue foldl;
		}
	}
};
var $gren_lang$core$Dict$foldl = F3($gren_lang$core$Dict$foldl$);


var _Array_length = function (array) {
  return array.length;
};

var _Array_initialize = F3(function (size, offset, func) {
  var result = new Array(size);

  for (var i = 0; i < size; i++) {
    result[i] = func(offset + i);
  }

  return result;
});

var _Array_get = F2(function (index, array) {
  var value = array.at(index);

  if (typeof value === "undefined") {
    return $gren_lang$core$Maybe$Nothing;
  }

  return $gren_lang$core$Maybe$Just(value);
});

var _Array_set = F3(function (index, value, array) {
  try {
    return array.with(index, value);
  } catch (e) {
    // assuming RangeError
    return array;
  }
});

var _Array_splice0 = F3(function (index, toRemove, array) {
  return array.toSpliced(index, toRemove);
});

var _Array_splice1 = F4(function (index, toRemove, toAdd, array) {
  return array.toSpliced(index, toRemove, toAdd);
});

var _Array_spliceN = F4(function (index, toRemove, toAdd, array) {
  return array.toSpliced(index, toRemove, ...toAdd);
});

var _Array_foldl = F3(function (func, acc, array) {
  for (var i = 0; i < array.length; i++) {
    acc = A2(func, array[i], acc);
  }

  return acc;
});

var _Array_foldr = F3(function (func, acc, array) {
  for (var i = array.length - 1; i >= 0; i--) {
    acc = A2(func, array[i], acc);
  }

  return acc;
});

var _Array_indexedFoldl = F3(function (func, acc, array) {
  for (var i = 0; i < array.length; i++) {
    acc = A3(func, i, array[i], acc);
  }

  return acc;
});

var _Array_indexedFoldr = F3(function (func, acc, array) {
  for (var i = array.length - 1; i >= 0; i--) {
    acc = A3(func, i, array[i], acc);
  }

  return acc;
});

var _Array_map = F2(function (func, array) {
  return array.map(func);
});

var _Array_indexedMap = F2(function (func, array) {
  return array.map(function (value, index) {
    return A2(func, index, value);
  });
});

var _Array_filter = F2(function (func, array) {
  return array.filter(func);
});

var _Array_indexedFilter = F2(function (func, array) {
  return array.filter(function (value, index) {
    return A2(func, index, value);
  });
});

var _Array_flat = function (array) {
  return array.flat();
};

var _Array_flatMap = F2(function (func, array) {
  return array.flatMap(func);
});

var _Array_slice = F3(function (from, to, array) {
  return array.slice(from, to);
});

var _Array_append = F2(function (left, right) {
  return left.concat(right);
});

var _Array_reverse = function (array) {
  return array.toReversed();
};

var _Array_findFirst = F2(function (pred, array) {
  for (var i = 0; i < array.length; i++) {
    var element = array[i];

    if (pred(element)) {
      return $gren_lang$core$Maybe$Just({ index: i, value: element });
    }
  }

  return $gren_lang$core$Maybe$Nothing;
});

var _Array_findLast = F2(function (pred, array) {
  for (var i = array.length - 1; i >= 0; i--) {
    var element = array[i];

    if (pred(element)) {
      return $gren_lang$core$Maybe$Just({ index: i, value: element });
    }
  }

  return $gren_lang$core$Maybe$Nothing;
});

var _Array_map2 = F3(function (fn, as, bs) {
  var result = [];
  var lowestLength = as.length < bs.length ? as.length : bs.length;

  for (var i = 0; i < lowestLength; i++) {
    result.push(A2(fn, as[i], bs[i]));
  }

  return result;
});

var _Array_map3 = F4(function (fn, as, bs, cs) {
  var result = [];
  var lowestLength = [as.length, bs.length, cs.length].sort()[0];

  for (var i = 0; i < lowestLength; i++) {
    result.push(A3(fn, as[i], bs[i], cs[i]));
  }

  return result;
});

var _Array_sort = function (array) {
  return array.toSorted(function (a, b) {
    return _Utils_cmp(a, b);
  });
};

var _Array_sortBy = F2(function (fn, array) {
  return array.toSorted(function (a, b) {
    return _Utils_cmp(fn(a), fn(b));
  });
});

var _Array_sortWith = F2(function (fn, array) {
  return array.toSorted(function (a, b) {
    var ord = A2(fn, a, b);
    return ord === $gren_lang$core$Basics$EQ ? 0 : ord === $gren_lang$core$Basics$LT ? -1 : 1;
  });
});

class _Array_Builder {
  constructor(target, finalized, array) {
    this.target = target;
    this.finalized = finalized;
    this.array = array;
  }
}

var _Array_emptyBuilder = function (capacity) {
  return new _Array_Builder(0, false, new Array(capacity));
};

var _Array_pushToBuilder = F2(function (value, builder) {
  var array = builder.array;
  var target = builder.target;

  if (builder.finalized) {
    array = array.slice(0, target);
  } else {
    builder.finalized = true;
  }

  if (target < array.length) {
    array[target] = value;
  } else {
    array.push(value);
  }

  return new _Array_Builder(target + 1, false, array);
});

var _Array_appendToBuilder = F2(function (array, builder) {
  var newArray = _Array_fromBuilder(builder);

  for (var i = 0; i < array.length; i++) {
    newArray.push(array[i]);
  }

  return new _Array_Builder(newArray.length, false, newArray);
});

var _Array_toBuilder = function (array) {
  return new _Array_Builder(array.length, true, array);
};

var _Array_fromBuilder = function (builder) {
  var result = builder.array;

  if (builder.finalized) {
    result = result.slice(0, builder.target);
  } else {
    builder.finalized = true;
    result.length = builder.target;
  }

  return result;
};


// EQUALITY

function _Utils_eq(x, y) {
  for (
    var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
    isEqual && (pair = stack.pop());
    isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
  ) {}

  return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack) {
  if (x === y) {
    return true;
  }

  if (typeof x !== "object" || x === null || y === null) {
    typeof x === "function" && _Debug_crash(5);
    return false;
  }

  if (depth > 100) {
    stack.push({ a: x, b: y });
    return true;
  }

  /**/
	if (x.$ === 'Set_gren_builtin')
	{
		x = $gren_lang$core$Set$toArray(x);
		y = $gren_lang$core$Set$toArray(y);
	}
	if (x.$ === 'RBNode_gren_builtin' || x.$ === 'RBEmpty_gren_builtin')
	{
		x = A3($gren_lang$core$Dict$foldl, F3(function(key, value, acc) { acc.push({ a: key, b: value }); return acc; }), [], x);
		y = A3($gren_lang$core$Dict$foldl, F3(function(key, value, acc) { acc.push({ a: key, b: value }); return acc; }), [], y);
	}
	//*/

  /**_UNUSED/
	if (x.$ < 0)
	{
		x = A3($gren_lang$core$Dict$foldl, F3(function(key, value, acc) { acc.push({ a: key, b: value }); return acc; }), [], x);
		y = A3($gren_lang$core$Dict$foldl, F3(function(key, value, acc) { acc.push({ a: key, b: value }); return acc; }), [], y);
	}
	//*/

  if (x instanceof DataView) {
    var length = x.byteLength;

    if (y.byteLength !== length) {
      return false;
    }

    for (var i = 0; i < length; ++i) {
      if (x.getUint8(i) !== y.getUint8(i)) {
        return false;
      }
    }

    return true;
  }

  if (x instanceof _Array_Builder) {
    x = _Array_fromBuilder(x);
    y = _Array_fromBuilder(y);
  }

  if (Array.isArray(x) && x.length !== y.length) {
    return false;
  }

  var nextDepth = depth + 1;

  for (var key in x) {
    if (!_Utils_eqHelp(x[key], y[key], nextDepth, stack)) {
      return false;
    }
  }

  return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function (a, b) {
  return !_Utils_eq(a, b);
});

// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y) {
  if (typeof x !== "object") {
    return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
  }

  /**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

  // At this point, we can only be comparing arrays
  for (var idx = 0; idx < x.length; idx++) {
    var ord = _Utils_cmp(x[idx], y[idx]);
    if (ord !== 0) return ord;
  }

  return x.length - y.length;
}

var _Utils_lt = F2(function (a, b) {
  return _Utils_cmp(a, b) < 0;
});
var _Utils_le = F2(function (a, b) {
  return _Utils_cmp(a, b) < 1;
});
var _Utils_gt = F2(function (a, b) {
  return _Utils_cmp(a, b) > 0;
});
var _Utils_ge = F2(function (a, b) {
  return _Utils_cmp(a, b) >= 0;
});

var _Utils_compare = F2(function (x, y) {
  var n = _Utils_cmp(x, y);
  return n < 0 ? $gren_lang$core$Basics$LT : n ? $gren_lang$core$Basics$GT : $gren_lang$core$Basics$EQ;
});

// COMMON VALUES

function _Utils_chr_UNUSED(c) {
  return c;
}
function _Utils_chr(c) {
  return new String(c);
}

// RECORDS

function _Utils_update(oldRecord, updatedFields) {
  var newRecord = {};

  for (var key in oldRecord) {
    newRecord[key] = oldRecord[key];
  }

  for (var key in updatedFields) {
    newRecord[key] = updatedFields[key];
  }

  return newRecord;
}

// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys) {
  // append Strings
  if (typeof xs === "string") {
    return xs + ys;
  }

  return xs.concat(ys);
}
var $gren_lang$core$Basics$EQ = { $: 'EQ' };
var $gren_lang$core$Basics$GT = { $: 'GT' };
var $gren_lang$core$Basics$LT = { $: 'LT' };
var $gren_lang$core$Maybe$Just = function (a) {
	return { $: 'Just', a: a };
};
var $gren_lang$core$Maybe$Nothing = { $: 'Nothing' };
var $gren_lang$core$Array$length = _Array_length;
var $gren_lang$core$Array$pushLast$ = function(value, array) {
	return A4(_Array_splice1, $gren_lang$core$Array$length(array), 0, value, array);
};
var $gren_lang$core$Array$pushLast = F2($gren_lang$core$Array$pushLast$);
var $gren_lang$core$Dict$keys = function(dict) {
	return $gren_lang$core$Dict$foldl$(F3(function(key, value, keyArray) {
				return $gren_lang$core$Array$pushLast$(key, keyArray);
			}), [  ], dict);
};
var $gren_lang$core$Set$toArray = function(_v0) {
	var dict = _v0.a;
	return $gren_lang$core$Dict$keys(dict);
};


/**/
function _Json_errorToString(error)
{
	return $gren_lang$core$Json$Decode$errorToString(error);
}
//*/

// CORE DECODERS

function _Json_succeed(msg) {
  return {
    $: 0,
    a: msg,
  };
}

function _Json_fail(msg) {
  return {
    $: 1,
    a: msg,
  };
}

function _Json_decodePrim(decoder) {
  return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function (value) {
  return typeof value !== "number"
    ? _Json_expecting("an INT", value)
    : Math.trunc(value) === value
      ? $gren_lang$core$Result$Ok(value)
      : isFinite(value) && !(value % 1)
        ? $gren_lang$core$Result$Ok(value)
        : _Json_expecting("an INT", value);
});

var _Json_decodeBool = _Json_decodePrim(function (value) {
  return typeof value === "boolean"
    ? $gren_lang$core$Result$Ok(value)
    : _Json_expecting("a BOOL", value);
});

var _Json_decodeFloat = _Json_decodePrim(function (value) {
  return typeof value === "number"
    ? $gren_lang$core$Result$Ok(value)
    : _Json_expecting("a FLOAT", value);
});

var _Json_decodeValue = _Json_decodePrim(function (value) {
  return $gren_lang$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function (value) {
  return typeof value === "string"
    ? $gren_lang$core$Result$Ok(value)
    : value instanceof String
      ? $gren_lang$core$Result$Ok(value + "")
      : _Json_expecting("a STRING", value);
});

function _Json_decodeArray(decoder) {
  return { $: 3, b: decoder };
}

function _Json_decodeNull(value) {
  return { $: 4, c: value };
}

var _Json_decodeField = F2(function (field, decoder) {
  return {
    $: 5,
    d: field,
    b: decoder,
  };
});

var _Json_decodeIndex = F2(function (index, decoder) {
  return {
    $: 6,
    e: index,
    b: decoder,
  };
});

function _Json_decodeKeyValuePairs(decoder) {
  return {
    $: 7,
    b: decoder,
  };
}

function _Json_mapMany(f, decoders) {
  return {
    $: 8,
    f: f,
    g: decoders,
  };
}

var _Json_andThen = F2(function (callback, decoder) {
  return {
    $: 9,
    b: decoder,
    h: callback,
  };
});

function _Json_oneOf(decoders) {
  return {
    $: 10,
    g: decoders,
  };
}

// DECODING OBJECTS

var _Json_map1 = F2(function (f, d1) {
  return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function (f, d1, d2) {
  return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function (f, d1, d2, d3) {
  return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function (f, d1, d2, d3, d4) {
  return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function (f, d1, d2, d3, d4, d5) {
  return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function (f, d1, d2, d3, d4, d5, d6) {
  return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function (f, d1, d2, d3, d4, d5, d6, d7) {
  return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function (f, d1, d2, d3, d4, d5, d6, d7, d8) {
  return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});

// DECODE

var _Json_runOnString = F2(function (decoder, string) {
  try {
    var value = JSON.parse(string);
    return _Json_runHelp(decoder, value);
  } catch (e) {
    return $gren_lang$core$Result$Err(
      $gren_lang$core$Json$Decode$Failure({
        message: "This is not valid JSON! " + e.message,
        value: _Json_wrap(string),
      }),
    );
  }
});

var _Json_run = F2(function (decoder, value) {
  return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value) {
  switch (decoder.$) {
    case 2:
      return decoder.b(value);

    case 4:
      return value === null
        ? $gren_lang$core$Result$Ok(decoder.c)
        : _Json_expecting("null", value);

    case 3:
      if (!_Json_isArray(value)) {
        return _Json_expecting("an ARRAY", value);
      }
      return _Json_runArrayDecoder(decoder.b, value);

    case 5:
      var field = decoder.d;
      if (typeof value !== "object" || value === null || !(field in value)) {
        return _Json_expecting(
          "an OBJECT with a field named `" + field + "`",
          value,
        );
      }
      var result = _Json_runHelp(decoder.b, value[field]);
      return $gren_lang$core$Result$isOk(result)
        ? result
        : $gren_lang$core$Result$Err($gren_lang$core$Json$Decode$Field({ name: field, error: result.a }));

    case 6:
      var index = decoder.e;
      if (!_Json_isArray(value)) {
        return _Json_expecting("an ARRAY", value);
      }
      if (index >= value.length) {
        return _Json_expecting(
          "a LONGER array. Need index " +
            index +
            " but only see " +
            value.length +
            " entries",
          value,
        );
      }
      var result = _Json_runHelp(decoder.b, value[index]);
      return $gren_lang$core$Result$isOk(result)
        ? result
        : $gren_lang$core$Result$Err($gren_lang$core$Json$Decode$Index({ index: index, error: result.a }));

    case 7:
      if (typeof value !== "object" || value === null || _Json_isArray(value)) {
        return _Json_expecting("an OBJECT", value);
      }

      var keyValuePairs = [];
      for (var key in value) {
        if (Object.hasOwn(value, key)) {
          var result = _Json_runHelp(decoder.b, value[key]);
          if (!$gren_lang$core$Result$isOk(result)) {
            return $gren_lang$core$Result$Err(
              $gren_lang$core$Json$Decode$Field({ name: key, error: result.a }),
            );
          }
          keyValuePairs.push({ key: key, value: result.a });
        }
      }
      return $gren_lang$core$Result$Ok(keyValuePairs);

    case 8:
      var answer = decoder.f;
      var decoders = decoder.g;
      for (var i = 0; i < decoders.length; i++) {
        var result = _Json_runHelp(decoders[i], value);
        if (!$gren_lang$core$Result$isOk(result)) {
          return result;
        }
        answer = answer(result.a);
      }
      return $gren_lang$core$Result$Ok(answer);

    case 9:
      var result = _Json_runHelp(decoder.b, value);
      return !$gren_lang$core$Result$isOk(result)
        ? result
        : _Json_runHelp(decoder.h(result.a), value);

    case 10:
      var errors = [];

      var decoders = decoder.g;
      for (var idx = 0; idx < decoders.length; idx++) {
        var result = _Json_runHelp(decoders[idx], value);
        if ($gren_lang$core$Result$isOk(result)) {
          return result;
        }
        errors.push(result.a);
      }

      return $gren_lang$core$Result$Err($gren_lang$core$Json$Decode$OneOf(errors));

    case 1:
      return $gren_lang$core$Result$Err(
        $gren_lang$core$Json$Decode$Failure({
          message: decoder.a,
          value: _Json_wrap(value),
        }),
      );

    case 0:
      return $gren_lang$core$Result$Ok(decoder.a);
  }
}

function _Json_runArrayDecoder(decoder, value) {
  var len = value.length;
  var array = new Array(len);
  for (var i = 0; i < len; i++) {
    var result = _Json_runHelp(decoder, value[i]);
    if (!$gren_lang$core$Result$isOk(result)) {
      return $gren_lang$core$Result$Err($gren_lang$core$Json$Decode$Index({ index: i, error: result.a }));
    }
    array[i] = result.a;
  }
  return $gren_lang$core$Result$Ok(array);
}

function _Json_isArray(value) {
  return (
    Array.isArray(value) ||
    (typeof FileList !== "undefined" && value instanceof FileList)
  );
}

function _Json_expecting(type, value) {
  return $gren_lang$core$Result$Err(
    $gren_lang$core$Json$Decode$Failure({
      message: "Expecting " + type,
      value: _Json_wrap(value),
    }),
  );
}

// EQUALITY

function _Json_equality(x, y) {
  if (x === y) {
    return true;
  }

  if (x.$ !== y.$) {
    return false;
  }

  switch (x.$) {
    case 0:
    case 1:
      return x.a === y.a;

    case 2:
      return x.b === y.b;

    case 4:
      return x.c === y.c;

    case 3:
    case 7:
      return _Json_equality(x.b, y.b);

    case 5:
      return (
        x.d === y.d && _Json_equality(x.b, y.b)
      );

    case 6:
      return (
        x.e === y.e && _Json_equality(x.b, y.b)
      );

    case 8:
      return (
        x.f === y.f && _Json_arrayEquality(x.g, y.g)
      );

    case 9:
      return (
        x.h === y.h &&
        _Json_equality(x.b, y.b)
      );

    case 10:
      return _Json_arrayEquality(x.g, y.g);
  }
}

function _Json_arrayEquality(aDecoders, bDecoders) {
  var len = aDecoders.length;
  if (len !== bDecoders.length) {
    return false;
  }
  for (var i = 0; i < len; i++) {
    if (!_Json_equality(aDecoders[i], bDecoders[i])) {
      return false;
    }
  }
  return true;
}

// ENCODE

var _Json_encode = F2(function (indentLevel, value) {
  return (
    (indentLevel === 0
      ? JSON.stringify(_Json_unwrap(value))
      : JSON.stringify(_Json_unwrap(value), null, indentLevel)) + ""
  );
});

function _Json_wrap(value) {
  return { $: 0, a: value };
}
function _Json_unwrap(value) {
  return value.a;
}

function _Json_wrap_UNUSED(value) {
  return value;
}
function _Json_unwrap_UNUSED(value) {
  return value;
}

function _Json_emptyArray() {
  return [];
}
function _Json_emptyObject() {
  return {};
}

var _Json_addField = F3(function (key, value, object) {
  var unwrapped = _Json_unwrap(value);
  if (!(key === "toJSON" && typeof unwrapped === "function")) {
    object[key] = unwrapped;
  }
  return object;
});

function _Json_addEntry(func) {
  return F2(function (entry, array) {
    array.push(_Json_unwrap(func(entry)));
    return array;
  });
}

var _Json_encodeNull = _Json_wrap(null);
var $gren_lang$core$Result$Err = function (a) {
	return { $: 'Err', a: a };
};
var $gren_lang$core$Json$Decode$Failure = function (a) {
	return { $: 'Failure', a: a };
};
var $gren_lang$core$Json$Decode$Field = function (a) {
	return { $: 'Field', a: a };
};
var $gren_lang$core$Json$Decode$Index = function (a) {
	return { $: 'Index', a: a };
};
var $gren_lang$core$Result$Ok = function (a) {
	return { $: 'Ok', a: a };
};
var $gren_lang$core$Json$Decode$OneOf = function (a) {
	return { $: 'OneOf', a: a };
};
var $gren_lang$core$Basics$False = { $: 'False' };


// MATH

var _Basics_add = F2(function (a, b) {
  return a + b;
});
var _Basics_sub = F2(function (a, b) {
  return a - b;
});
var _Basics_mul = F2(function (a, b) {
  return a * b;
});
var _Basics_fdiv = F2(function (a, b) {
  return a / b;
});
var _Basics_idiv = F2(function (a, b) {
  return Math.trunc(a / b);
});
var _Basics_pow = F2(Math.pow);

// MORE MATH

function _Basics_toFloat(x) {
  return x;
}
function _Basics_isInfinite(n) {
  return n === Infinity || n === -Infinity;
}

var _Basics_isNaN = isNaN;

// BOOLEANS

function _Basics_not(bool) {
  return !bool;
}
var _Basics_and = F2(function (a, b) {
  return a && b;
});
var _Basics_or = F2(function (a, b) {
  return a || b;
});
var _Basics_xor = F2(function (a, b) {
  return a !== b;
});
var $gren_lang$core$Basics$add = _Basics_add;


var _String_pushFirst = F2(function (char, string) {
  return char + string;
});

var _String_pushLast = F2(function (char, string) {
  return string + char;
});

var _String_popFirst = function (string) {
  if (string.length <= 0) {
    return $gren_lang$core$Maybe$Nothing;
  }

  var firstPointNumber = string.codePointAt(0);
  var firstChar = String.fromCodePoint(firstPointNumber);

  return $gren_lang$core$Maybe$Just({
    first: _Utils_chr(firstChar),
    rest: string.slice(firstChar.length),
  });
};

var _String_popLast = function (string) {
  if (string.length <= 0) {
    return $gren_lang$core$Maybe$Nothing;
  }

  var possibleLastPointIdx = string.length - 2;
  var possibleLastPoint = string.codePointAt(possibleLastPointIdx);

  if (possibleLastPoint === string.charCodeAt(possibleLastPointIdx)) {
    // last char is a unit
    return $gren_lang$core$Maybe$Just({
      last: _Utils_chr(string[string.length - 1]),
      rest: string.slice(string.length - 1),
    });
  }

  // last char is a point
  return $gren_lang$core$Maybe$Just({
    last: _Utils_chr(String.fromCodePoint(possibleLastPoint)),
    rest: string.slice(string.length - 2),
  });
};

var _String_append = F2(function (a, b) {
  return a + b;
});

var _String_repeat = F2(function (num, chunk) {
  try {
    return chunk.repeat(num);
  } catch (error) {
    if (error.name === "RangeError") {
      return "";
    } else {
      throw error;
    }
  }
});

var _String_foldl = F3(function (func, state, string) {
  for (let char of string) {
    state = A2(func, _Utils_chr(char), state);
  }

  return state;
});

var _String_foldr = F3(function (func, state, string) {
  let reversed = [];

  for (let char of string) {
    reversed.unshift(char);
  }

  for (let char of reversed) {
    state = A2(func, _Utils_chr(char), state);
  }

  return state;
});

var _String_split = F2(function (sep, str) {
  return str.split(sep);
});

var _String_join = F2(function (sep, strs) {
  return strs.join(sep);
});

var _String_slice = F3(function (start, end, str) {
  if (start < 0) {
    start = str.length + start;
  }

  if (end < 0) {
    end = str.length + end;
  }

  if (start >= end) {
    return "";
  }

  let index = 0;
  let result = "";

  for (let char of str) {
    if (index < start) {
      index++;
      continue;
    }

    if (index >= end) {
      break;
    }

    result += char;
    index++;
  }

  return result;
});

function _String_trim(str) {
  return str.trim();
}

function _String_trimLeft(str) {
  return str.replace(/^\s+/, "");
}

function _String_trimRight(str) {
  return str.replace(/\s+$/, "");
}

function _String_words(str) {
  return str.trim().split(/\s+/g);
}

function _String_lines(str) {
  return str.split(/\r\n|\r|\n/g);
}

function _String_toUpper(str) {
  return str.toUpperCase();
}

function _String_toLower(str) {
  return str.toLowerCase();
}

var _String_any = F2(function (isGood, string) {
  for (let char of string) {
    if (isGood(_Utils_chr(char))) {
      return true;
    }
  }

  return false;
});

var _String_contains = F2(function (sub, str) {
  return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function (sub, str) {
  return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function (sub, str) {
  return (
    str.length >= sub.length && str.lastIndexOf(sub) === str.length - sub.length
  );
});

var _String_indexOf = F2(function (sub, str) {
  var ret = str.indexOf(sub);

  if (ret > -1) {
    return $gren_lang$core$Maybe$Just(ret);
  }

  return $gren_lang$core$Maybe$Nothing;
});

var _String_lastIndexOf = F2(function (sub, str) {
  var ret = str.lastIndexOf(sub);

  if (ret > -1) {
    return $gren_lang$core$Maybe$Just(ret);
  }

  return $gren_lang$core$Maybe$Nothing;
});

var _String_indexes = F2(function (sub, str) {
  var subLen = sub.length;

  if (subLen < 1) {
    return [];
  }

  var i = 0;
  var is = [];

  while ((i = str.indexOf(sub, i)) > -1) {
    is.push(i);
    i = i + subLen;
  }

  return is;
});

// TO STRING

function _String_fromNumber(number) {
  return number + "";
}

// INT CONVERSIONS

function _String_toInt(str) {
  var total = 0;
  var code0 = str.charCodeAt(0);
  var start = code0 == 0x2b /* + */ || code0 == 0x2d /* - */ ? 1 : 0;

  for (var i = start; i < str.length; ++i) {
    var code = str.charCodeAt(i);
    if (code < 0x30 || 0x39 < code) {
      return $gren_lang$core$Maybe$Nothing;
    }
    total = 10 * total + code - 0x30;
  }

  return i == start
    ? $gren_lang$core$Maybe$Nothing
    : $gren_lang$core$Maybe$Just(code0 == 0x2d ? -total : total);
}

// FLOAT CONVERSIONS

function _String_toFloat(s) {
  // check if it is a hex, octal, or binary number
  if (s.length === 0 || /[\sxbo]/.test(s)) {
    return $gren_lang$core$Maybe$Nothing;
  }
  var n = +s;
  // faster isNaN check
  return n === n ? $gren_lang$core$Maybe$Just(n) : $gren_lang$core$Maybe$Nothing;
}

function _String_fromArray(chars) {
  return chars.join("");
}

// UNITS

var _String_unitLength = function (str) {
  return str.length;
};

var _String_getUnit = F2(function (index, str) {
  var char = str.at(index);

  if (typeof char === "undefined") {
    return $gren_lang$core$Maybe$Nothing;
  }

  return $gren_lang$core$Maybe$Just(_Utils_chr(char));
});

var _String_foldlUnits = F3(function (fn, state, str) {
  for (let i = 0; i < str.length; i++) {
    state = A2(fn, str[i], state);
  }

  return state;
});

var _String_foldrUnits = F3(function (fn, state, str) {
  for (let i = str.length - 1; i < 0; i--) {
    state = A2(fn, str[i], state);
  }

  return state;
});

var _String_sliceUnits = F3(function (start, end, str) {
  return str.slice(start, end);
});
var $gren_lang$core$String$any = _String_any;
var $gren_lang$core$Basics$composeL$ = function(g, f) {
	return function(x) {
		return g(f(x));
	};
};
var $gren_lang$core$Basics$composeL = F2($gren_lang$core$Basics$composeL$);
var $gren_lang$core$Basics$not = _Basics_not;
var $gren_lang$core$String$all$ = function(isGood, str) {
	return !A2($gren_lang$core$String$any, $gren_lang$core$Basics$composeL$($gren_lang$core$Basics$not, isGood), str);
};
var $gren_lang$core$String$all = F2($gren_lang$core$String$all$);
var $gren_lang$core$Basics$and = _Basics_and;
var $gren_lang$core$Basics$append = _Utils_append;
var $gren_lang$core$Json$Encode$encode = _Json_encode;
var $gren_lang$core$String$fromInt = _String_fromNumber;
var $gren_lang$core$String$join = _String_join;
var $gren_lang$core$String$split = _String_split;
var $gren_lang$core$Json$Decode$indent = function(str) {
	return A2($gren_lang$core$String$join, '\n    ', A2($gren_lang$core$String$split, '\n', str));
};
var $gren_lang$core$Array$indexedMap = _Array_indexedMap;
var $gren_lang$core$Basics$le = _Utils_le;


function _Char_toCode(char) {
  return char.codePointAt(0);
}

function _Char_fromCode(code) {
  return _Utils_chr(String.fromCodePoint(code));
}
var $gren_lang$core$Char$toCode = _Char_toCode;
var $gren_lang$core$Char$isLower = function(_char) {
	var code = $gren_lang$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $gren_lang$core$Char$isUpper = function(_char) {
	var code = $gren_lang$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $gren_lang$core$Basics$or = _Basics_or;
var $gren_lang$core$Char$isAlpha = function(_char) {
	return $gren_lang$core$Char$isLower(_char) || $gren_lang$core$Char$isUpper(_char);
};
var $gren_lang$core$Char$isDigit = function(_char) {
	var code = $gren_lang$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $gren_lang$core$Char$isAlphaNum = function(_char) {
	return $gren_lang$core$Char$isLower(_char) || ($gren_lang$core$Char$isUpper(_char) || $gren_lang$core$Char$isDigit(_char));
};
var $gren_lang$core$String$popFirst = _String_popFirst;
var $gren_lang$core$Json$Decode$errorOneOf$ = function(i, error) {
	return '\n\n(' + ($gren_lang$core$String$fromInt(i + 1) + (') ' + $gren_lang$core$Json$Decode$indent($gren_lang$core$Json$Decode$errorToString(error))));
};
var $gren_lang$core$Json$Decode$errorOneOf = F2($gren_lang$core$Json$Decode$errorOneOf$);
var $gren_lang$core$Json$Decode$errorToString = function(error) {
	return $gren_lang$core$Json$Decode$errorToStringHelp$(error, [  ]);
};
var $gren_lang$core$Json$Decode$errorToStringHelp$ = function(error, context) {
	errorToStringHelp:
	while (true) {
		switch (error.$) {
			case 'Field':
				var _v1 = error.a;
				var f = _v1.name;
				var err = _v1.error;
				var isSimple = function () {
					var _v2 = $gren_lang$core$String$popFirst(f);
					if (_v2.$ === 'Nothing') {
						return false;
					} else {
						var _v3 = _v2.a;
						var _char = _v3.first;
						var rest = _v3.rest;
						return $gren_lang$core$Char$isAlpha(_char) && $gren_lang$core$String$all$($gren_lang$core$Char$isAlphaNum, rest);
					}
				}();
				var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
				var $temp$error = err,
				$temp$context = _Utils_ap([ fieldName ], context);
				error = $temp$error;
				context = $temp$context;
				continue errorToStringHelp;
			case 'Index':
				var _v4 = error.a;
				var i = _v4.index;
				var err = _v4.error;
				var indexName = '[' + ($gren_lang$core$String$fromInt(i) + ']');
				var $temp$error = err,
				$temp$context = _Utils_ap([ indexName ], context);
				error = $temp$error;
				context = $temp$context;
				continue errorToStringHelp;
			case 'OneOf':
				var errors = error.a;
				switch (errors.length) {
					case 0:
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (context.length === 0) {
								return '!';
							} else {
								return ' at json' + A2($gren_lang$core$String$join, '', context);
							}
						}();
					case 1:
						var err = errors[0];
						var $temp$error = err,
						$temp$context = context;
						error = $temp$error;
						context = $temp$context;
						continue errorToStringHelp;
					default:
						var starter = function () {
							if (context.length === 0) {
								return 'Json.Decode.oneOf';
							} else {
								return 'The Json.Decode.oneOf at json' + A2($gren_lang$core$String$join, '', context);
							}
						}();
						var introduction = starter + (' failed in the following ' + ($gren_lang$core$String$fromInt($gren_lang$core$Array$length(errors)) + ' ways:'));
						return A2($gren_lang$core$String$join, '\n\n', _Utils_ap([ introduction ], A2($gren_lang$core$Array$indexedMap, $gren_lang$core$Json$Decode$errorOneOf, errors)));
				}
			default:
				var _v8 = error.a;
				var msg = _v8.message;
				var json = _v8.value;
				var introduction = function () {
					if (context.length === 0) {
						return 'Problem with the given value:\n\n';
					} else {
						return 'Problem with the value at json' + (A2($gren_lang$core$String$join, '', context) + ':\n\n    ');
					}
				}();
				return introduction + ($gren_lang$core$Json$Decode$indent(A2($gren_lang$core$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
		}
	}
};
var $gren_lang$core$Json$Decode$errorToStringHelp = F2($gren_lang$core$Json$Decode$errorToStringHelp$);
var $gren_lang$core$Basics$True = { $: 'True' };
var $gren_lang$core$Result$isOk = function(result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};


// PROGRAMS

var _Platform_worker = F3(function (impl, flagDecoder, args) {
  return _Platform_initialize(
    flagDecoder,
    args,
    impl.init,
    impl.update,
    impl.subscriptions,
    function () {
      return function () {};
    },
  );
});

// INITIALIZE A PROGRAM

function _Platform_initialize(
  flagDecoder,
  args,
  init,
  update,
  subscriptions,
  stepperBuilder,
) {
  var result = A2(
    _Json_run,
    flagDecoder,
    _Json_wrap(args ? args["flags"] : undefined),
  );
  $gren_lang$core$Result$isOk(result) ||
    _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);

  _Platform_setupTaskPorts(args ? args["taskPorts"] : undefined);

  var managers = {};
  var initPair = init(result.a);
  var model = initPair.model;
  var stepper = stepperBuilder(sendToApp, model);
  var ports = _Platform_setupEffects(managers, sendToApp, executeCmd);

  function sendToApp(msg, viewMetadata) {
    var pair = A2(update, msg, model);
    stepper((model = pair.model), viewMetadata);
    _Platform_enqueueEffects(managers, pair.command, subscriptions(model));
  }

  function executeCmd(cmd) {
    _Platform_enqueueEffects(managers, cmd, subscriptions(model));
  }

  _Platform_enqueueEffects(managers, initPair.command, subscriptions(model));

  return ports ? { ports: ports } : {};
}

// TRACK PRELOADS
//
// This is used by code in gren/browser and gren/http
// to register any HTTP requests that are triggered by init.
//

var _Platform_preload;

function _Platform_registerPreload(url) {
  _Platform_preload.add(url);
}

// EFFECT MANAGERS

var _Platform_effectManagers = {};

function _Platform_setupEffects(managers, sendToApp, executeCmd) {
  var ports;

  // setup all necessary effect managers
  for (var key in _Platform_effectManagers) {
    var manager = _Platform_effectManagers[key];

    if (manager.a) {
      ports = ports || {};
      ports[key] = manager.a(key, sendToApp);
    }

    managers[key] = _Platform_instantiateManager(
      manager,
      sendToApp,
      executeCmd,
    );
  }

  return ports;
}

function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap) {
  return {
    b: init,
    c: onEffects,
    d: onSelfMsg,
    e: cmdMap,
    f: subMap,
  };
}

function _Platform_instantiateManager(info, sendToApp, executeCmd) {
  var router = {
    g: sendToApp,
    h: executeCmd,
    i: undefined,
  };

  var onEffects = info.c;
  var onSelfMsg = info.d;
  var cmdMap = info.e;
  var subMap = info.f;

  function loop(state) {
    return A2(
      _Scheduler_andThen,
      loop,
      _Scheduler_receive(function (msg) {
        var value = msg.a;

        if (msg.$ === 0) {
          return A3(onSelfMsg, router, value, state);
        }

        return cmdMap && subMap
          ? A4(onEffects, router, value.j, value.k, state)
          : A3(onEffects, router, cmdMap ? value.j : value.k, state);
      }),
    );
  }

  return (router.i = _Scheduler_rawSpawn(
    A2(_Scheduler_andThen, loop, info.b),
  ));
}

// ROUTING

var _Platform_sendToApp = F2(function (router, msg) {
  return _Scheduler_binding(function (callback) {
    router.g(msg);
    callback(_Scheduler_succeed({}));
  });
});

var _Platform_sendToSelf = F2(function (router, msg) {
  return A2(_Scheduler_send, router.i, {
    $: 0,
    a: msg,
  });
});

var _Platform_executeCmd = F2(function (router, cmd) {
  return _Scheduler_binding(function (callback) {
    router.h(cmd);
    callback(_Scheduler_succeed({}));
  });
});

// BAGS

function _Platform_leaf(home) {
  return function (value) {
    return {
      $: 1,
      l: home,
      m: value,
    };
  };
}

function _Platform_batch(array) {
  return {
    $: 2,
    n: array,
  };
}

var _Platform_map = F2(function (tagger, bag) {
  return {
    $: 3,
    o: tagger,
    p: bag,
  };
});

// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/gren/core/issues/980
//   https://github.com/gren/core/pull/981
//   https://github.com/gren/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.

// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;

function _Platform_enqueueEffects(managers, cmdBag, subBag) {
  _Platform_effectsQueue.push({
    q: managers,
    r: cmdBag,
    s: subBag,
  });

  if (_Platform_effectsActive) return;

  _Platform_effectsActive = true;
  while (_Platform_effectsQueue.length > 0) {
    const activeEffects = _Platform_effectsQueue;
    _Platform_effectsQueue = [];

    for (const fx of activeEffects) {
      _Platform_dispatchEffects(fx.q, fx.r, fx.s);
    }
  }
  _Platform_effectsActive = false;
}

function _Platform_dispatchEffects(managers, cmdBag, subBag) {
  var effectsDict = {};
  _Platform_gatherEffects(true, cmdBag, effectsDict, null);
  _Platform_gatherEffects(false, subBag, effectsDict, null);

  for (var home in managers) {
    _Scheduler_rawSend(managers[home], {
      $: "fx",
      a: effectsDict[home] || { j: [], k: [] },
    });
  }
}

function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers) {
  switch (bag.$) {
    case 1:
      var home = bag.l;
      var effect = _Platform_toEffect(isCmd, home, taggers, bag.m);
      effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
      return;

    case 2:
      var bags = bag.n;
      for (var idx = 0; idx < bags.length; idx++) {
        _Platform_gatherEffects(isCmd, bags[idx], effectsDict, taggers);
      }
      return;

    case 3:
      _Platform_gatherEffects(isCmd, bag.p, effectsDict, {
        t: bag.o,
        u: taggers,
      });
      return;
  }
}

function _Platform_toEffect(isCmd, home, taggers, value) {
  function applyTaggers(x) {
    for (var temp = taggers; temp; temp = temp.u) {
      x = temp.t(x);
    }
    return x;
  }

  var map = isCmd
    ? _Platform_effectManagers[home].e
    : _Platform_effectManagers[home].f;

  return A2(map, applyTaggers, value);
}

function _Platform_insert(isCmd, newEffect, effects) {
  effects = effects || { j: [], k: [] };

  isCmd
    ? (effects.j = A2($gren_lang$core$Array$pushLast, newEffect, effects.j))
    : (effects.k = A2($gren_lang$core$Array$pushLast, newEffect, effects.k));

  return effects;
}

// PORTS

function _Platform_checkPortName(name) {
  if (_Platform_effectManagers[name]) {
    _Debug_crash(3, name);
  }

  if (_Platform_taskPorts[name]) {
    _Debug_crash(3, name);
  }
}

// OUTGOING PORTS

function _Platform_outgoingPort(name, converter) {
  _Platform_checkPortName(name);
  _Platform_effectManagers[name] = {
    e: _Platform_outgoingPortMap,
    v: converter,
    a: _Platform_setupOutgoingPort,
  };
  return _Platform_leaf(name);
}

var _Platform_outgoingPortMap = F2(function (tagger, value) {
  return value;
});

function _Platform_setupOutgoingPort(name) {
  var subs = [];
  var converter = _Platform_effectManagers[name].v;

  // CREATE MANAGER

  var init = _Process_sleep(0);

  _Platform_effectManagers[name].b = init;
  _Platform_effectManagers[name].c = F3(
    function (router, cmdArray, state) {
      for (var idx = 0; idx < cmdArray.length; idx++) {
        // grab a separate reference to subs in case unsubscribe is called
        var currentSubs = subs;
        var value = _Json_unwrap(converter(cmdArray[idx]));
        for (var subIdx = 0; subIdx < currentSubs.length; subIdx++) {
          currentSubs[subIdx](value);
        }
      }
      return init;
    },
  );

  // PUBLIC API

  function subscribe(callback) {
    subs.push(callback);
  }

  function unsubscribe(callback) {
    // copy subs into a new array in case unsubscribe is called within a
    // subscribed callback
    subs = subs.slice();
    var index = subs.indexOf(callback);
    if (index >= 0) {
      subs.splice(index, 1);
    }
  }

  return {
    subscribe: subscribe,
    unsubscribe: unsubscribe,
  };
}

// INCOMING PORTS

function _Platform_incomingPort(name, converter) {
  _Platform_checkPortName(name);
  _Platform_effectManagers[name] = {
    f: _Platform_incomingPortMap,
    v: converter,
    a: _Platform_setupIncomingPort,
  };
  return _Platform_leaf(name);
}

var _Platform_incomingPortMap = F2(function (tagger, finalTagger) {
  return function (value) {
    return tagger(finalTagger(value));
  };
});

function _Platform_setupIncomingPort(name, sendToApp) {
  var subs = [];
  var converter = _Platform_effectManagers[name].v;

  // CREATE MANAGER

  var init = _Scheduler_succeed(null);

  _Platform_effectManagers[name].b = init;
  _Platform_effectManagers[name].c = F3(
    function (router, subArray, state) {
      subs = subArray;
      return init;
    },
  );

  // PUBLIC API

  function send(incomingValue) {
    var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

    $gren_lang$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

    var value = result.a;
    for (var idx = 0; idx < subs.length; idx++) {
      sendToApp(subs[idx](value));
    }
  }

  return { send: send };
}

// TASK PORTS

var _Platform_taskPorts = {};

function _Platform_taskPort(name, inputConverter, converter) {
  _Platform_checkPortName(name);
  _Platform_taskPorts[name] = {};

  return function (input) {
    var encodedInput = inputConverter
      ? _Json_unwrap(inputConverter(input))
      : null;

    return _Scheduler_binding(function (callback) {
      var promise;
      try {
        promise = _Platform_taskPorts[name](encodedInput);
      } catch (e) {
        throw new Error(
          "Registered code for task-based port named '" + name + "'  crashed.",
          { cause: e },
        );
      }

      if (!(promise instanceof Promise)) {
        throw new Error(
          "Handler for task port named '" +
            name +
            "' did not return a Promise.",
        );
      }

      promise.then(
        function (value) {
          var result = A2(_Json_run, converter, _Json_wrap(value));

          $gren_lang$core$Result$isOk(result) || _Debug_crash(4, name, value);

          callback(_Scheduler_succeed(result.a));
        },
        function (err) {
          // If Error, convert to plain object. This is because Error doesn't have enumerable
          // properties.
          if (err instanceof Error) {
            var newErr = {};
            Object.getOwnPropertyNames(err).forEach(function (key) {
              newErr[key] = err[key];
            });

            err = newErr;
          }

          callback(_Scheduler_fail(_Json_wrap(err)));
        },
      );
    });
  };
}

function _Platform_setupTaskPorts(registeredPorts) {
  if (typeof registeredPorts !== "object") {
    registeredPorts = {};
  }

  for (var key in registeredPorts) {
    if (!(key in _Platform_taskPorts)) {
      // TODO: proper way to crash program
      throw new Error(
        key + " isn't defined as a task-based port in Gren code.",
      );
    }
  }

  for (var key in _Platform_taskPorts) {
    var handler = registeredPorts[key];
    if (!handler) {
      throw new Error("No handler defined for task port named '" + key + "'.");
    }

    if (!(handler instanceof Function)) {
      throw new Error(
        "Handler for task port named '" + key + "' is not a function.",
      );
    }

    _Platform_taskPorts[key] = handler;
  }
}

// EXPORT GREN MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//

function _Platform_export_UNUSED(exports) {
  scope["Gren"]
    ? _Platform_mergeExportsProd(scope["Gren"], exports)
    : (scope["Gren"] = exports);
}

function _Platform_mergeExportsProd(obj, exports) {
  for (var name in exports) {
    name in obj
      ? name == "init"
        ? _Debug_crash(6)
        : _Platform_mergeExportsProd(obj[name], exports[name])
      : (obj[name] = exports[name]);
  }
}

function _Platform_export(exports) {
  scope["Gren"]
    ? _Platform_mergeExportsDebug("Gren", scope["Gren"], exports)
    : (scope["Gren"] = exports);
}

function _Platform_mergeExportsDebug(moduleName, obj, exports) {
  for (var name in exports) {
    name in obj
      ? name == "init"
        ? _Debug_crash(6, moduleName)
        : _Platform_mergeExportsDebug(
            moduleName + "." + name,
            obj[name],
            exports[name],
          )
      : (obj[name] = exports[name]);
  }
}


function _Process_sleep(time) {
  return _Scheduler_binding(function (callback) {
    var id = setTimeout(function () {
      callback(_Scheduler_succeed({}));
    }, time);

    return function () {
      clearTimeout(id);
    };
  });
}


// TASKS

function _Scheduler_succeed(value) {
  return {
    $: 0,
    a: value,
  };
}

function _Scheduler_fail(error) {
  return {
    $: 1,
    a: error,
  };
}

function _Scheduler_binding(callback) {
  return {
    $: 2,
    b: callback,
    c: null,
  };
}

var _Scheduler_andThen = F2(function (callback, task) {
  return {
    $: 3,
    b: callback,
    d: task,
  };
});

var _Scheduler_onError = F2(function (callback, task) {
  return {
    $: 4,
    b: callback,
    d: task,
  };
});

function _Scheduler_receive(callback) {
  return {
    $: 5,
    b: callback,
  };
}

function _Scheduler_concurrent(tasks) {
  if (tasks.length === 0) return _Scheduler_succeed([]);

  return _Scheduler_binding(function (callback) {
    let count = 0;
    let results = new Array(tasks.length);
    let procs;

    function killAll() {
      procs.forEach(_Scheduler_rawKill);
    }

    function onError(e) {
      killAll();
      callback(_Scheduler_fail(e));
    }

    procs = tasks.map((task, i) => {
      function onSuccess(res) {
        results[i] = res;
        count++;
        if (count === tasks.length) {
          callback(_Scheduler_succeed(results));
        }
      }
      const success = A2(_Scheduler_andThen, onSuccess, task);
      const handled = A2(_Scheduler_onError, onError, success);
      return _Scheduler_rawSpawn(handled);
    });

    return killAll;
  });
}

var _Scheduler_map2 = F3(function (callback, taskA, taskB) {
  function combine([resA, resB]) {
    return _Scheduler_succeed(A2(callback, resA, resB));
  }
  return A2(_Scheduler_andThen, combine, _Scheduler_concurrent([taskA, taskB]));
});

// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task) {
  var proc = {
    $: 0,
    e: _Scheduler_guid++,
    f: task,
    g: null,
    h: [],
  };

  _Scheduler_enqueue(proc);

  return proc;
}

function _Scheduler_spawn(task) {
  return _Scheduler_binding(function (callback) {
    callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
  });
}

function _Scheduler_rawSend(proc, msg) {
  proc.h.push(msg);
  _Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function (proc, msg) {
  return _Scheduler_binding(function (callback) {
    _Scheduler_rawSend(proc, msg);
    callback(_Scheduler_succeed({}));
  });
});

function _Scheduler_kill(proc) {
  return _Scheduler_binding(function (callback) {
    _Scheduler_rawKill(proc);

    callback(_Scheduler_succeed({}));
  });
}

function _Scheduler_rawKill(proc) {
  var task = proc.f;
  if (task && task.$ === 2 && task.c) {
    task.c();
  }

  proc.f = null;
}

/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/

var _Scheduler_working = false;
var _Scheduler_queue = [];

function _Scheduler_enqueue(proc) {
  _Scheduler_queue.push(proc);
  if (_Scheduler_working) {
    return;
  }
  _Scheduler_working = true;
  // Make sure tasks created during _step are run
  while (_Scheduler_queue.length > 0) {
    const activeProcs = _Scheduler_queue;
    _Scheduler_queue = [];

    for (const proc of activeProcs) {
      _Scheduler_step(proc);
    }
  }
  _Scheduler_working = false;
}

function _Scheduler_step(proc) {
  while (proc.f) {
    var rootTag = proc.f.$;
    if (rootTag === 0 || rootTag === 1) {
      while (proc.g && proc.g.$ !== rootTag) {
        proc.g = proc.g.i;
      }
      if (!proc.g) {
        return;
      }
      proc.f = proc.g.b(proc.f.a);
      proc.g = proc.g.i;
    } else if (rootTag === 2) {
      proc.f.c = proc.f.b(function (newRoot) {
        proc.f = newRoot;
        _Scheduler_enqueue(proc);
      });
      return;
    } else if (rootTag === 5) {
      if (proc.h.length === 0) {
        return;
      }
      proc.f = proc.f.b(proc.h.shift());
    } // if (rootTag === 3 || rootTag === 4)
    else {
      proc.g = {
        $: rootTag === 3 ? 0 : 1,
        b: proc.f.b,
        i: proc.g,
      };
      proc.f = proc.f.d;
    }
  }
}


// HELPERS

var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== "undefined" ? document : {};

function _VirtualDom_appendChild(parent, child) {
  parent.appendChild(child);
}

var _VirtualDom_init = F2(function (virtualNode, args) {
  // NOTE: this function needs _Platform_export available to work

  /**_UNUSED/
	var node = args['node'];
	//*/
  /**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

  node.parentNode.replaceChild(
    _VirtualDom_render(virtualNode, function () {}),
    node,
  );

  return {};
});

// TEXT

function _VirtualDom_text(string) {
  return {
    $: 0,
    a: string,
  };
}

// NODE

var _VirtualDom_nodeNS = F2(function (namespace, tag) {
  return F2(function (factList, kids) {
    for (var descendantsCount = 0, i = 0; i < kids.length; i++) {
      var kid = kids[i];
      descendantsCount += kid.b || 0;
    }

    descendantsCount += kids.length;

    return {
      $: 1,
      c: tag,
      d: _VirtualDom_organizeFacts(factList),
      e: kids,
      f: namespace,
      b: descendantsCount,
    };
  });
});

var _VirtualDom_node = function (tag) {
  return A2(_VirtualDom_nodeNS, undefined, tag);
};

// KEYED NODE

var _VirtualDom_keyedNodeNS = F2(function (namespace, tag) {
  return F2(function (factList, kids) {
    for (var descendantsCount = 0, i = 0; i < kids.length; i++) {
      var kid = kids[i];
      descendantsCount += kid.node.b || 0;
    }

    descendantsCount += kids.length;

    return {
      $: 2,
      c: tag,
      d: _VirtualDom_organizeFacts(factList),
      e: kids,
      f: namespace,
      b: descendantsCount,
    };
  });
});

var _VirtualDom_keyedNode = function (tag) {
  return A2(_VirtualDom_keyedNodeNS, undefined, tag);
};

// CUSTOM

function _VirtualDom_custom(factList, model, render, diff) {
  return {
    $: 3,
    d: _VirtualDom_organizeFacts(factList),
    g: model,
    h: render,
    i: diff,
  };
}

// MAP

var _VirtualDom_map = F2(function (tagger, node) {
  return {
    $: 4,
    j: tagger,
    k: node,
    b: 1 + (node.b || 0),
  };
});

// LAZY

function _VirtualDom_thunk(view, args, thunk) {
  return {
    $: 5,
    l: view,
    m: args,
    n: thunk,
    k: undefined,
  };
}

var _VirtualDom_lazy = F2(function (func, a) {
  return _VirtualDom_thunk(func, [a], function () {
    return func(a);
  });
});

var _VirtualDom_lazy2 = F3(function (func, a, b) {
  return _VirtualDom_thunk(func, [a, b], function () {
    return A2(func, a, b);
  });
});

var _VirtualDom_lazy3 = F4(function (func, a, b, c) {
  return _VirtualDom_thunk(func, [a, b, c], function () {
    return A3(func, a, b, c);
  });
});

var _VirtualDom_lazy4 = F5(function (func, a, b, c, d) {
  return _VirtualDom_thunk(func, [a, b, c, d], function () {
    return A4(func, a, b, c, d);
  });
});

var _VirtualDom_lazy5 = F6(function (func, a, b, c, d, e) {
  return _VirtualDom_thunk(func, [a, b, c, d, e], function () {
    return A5(func, a, b, c, d, e);
  });
});

var _VirtualDom_lazy6 = F7(function (func, a, b, c, d, e, f) {
  return _VirtualDom_thunk(func, [a, b, c, d, e, f], function () {
    return A6(func, a, b, c, d, e, f);
  });
});

var _VirtualDom_lazy7 = F8(function (func, a, b, c, d, e, f, g) {
  return _VirtualDom_thunk(func, [a, b, c, d, e, f, g], function () {
    return A7(func, a, b, c, d, e, f, g);
  });
});

var _VirtualDom_lazy8 = F9(function (func, a, b, c, d, e, f, g, h) {
  return _VirtualDom_thunk(func, [a, b, c, d, e, f, g, h], function () {
    return A8(func, a, b, c, d, e, f, g, h);
  });
});

// FACTS

var _VirtualDom_on = F2(function (key, handler) {
  return {
    $: "a0",
    o: key,
    p: handler,
  };
});
var _VirtualDom_style = F2(function (key, value) {
  return {
    $: "a1",
    o: key,
    p: value,
  };
});
var _VirtualDom_property = F2(function (key, value) {
  return {
    $: "a2",
    o: key,
    p: value,
  };
});
var _VirtualDom_attribute = F2(function (key, value) {
  return {
    $: "a3",
    o: key,
    p: value,
  };
});
var _VirtualDom_attributeNS = F3(function (namespace, key, value) {
  return {
    $: "a4",
    o: key,
    p: { f: namespace, p: value },
  };
});

// XSS ATTACK VECTOR CHECKS

function _VirtualDom_noScript(tag) {
  return tag == "script" ? "p" : tag;
}

function _VirtualDom_noOnOrFormAction(key) {
  return /^(on|formAction$)/i.test(key) ? "data-" + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key) {
  return key == "innerHTML" || key == "outerHTML" || key == "formAction"
    ? "data-" + key
    : key;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value) {
  return /^javascript:/i.test(value.replace(/\s/g, "")) ? "" : value;
}

function _VirtualDom_noJavaScriptUri(value) {
  return /^javascript:/i.test(value.replace(/\s/g, ""))
    ? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
    : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value) {
  return /^\s*(javascript:|data:text\/html)/i.test(value) ? "" : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value) {
  return /^\s*(javascript:|data:text\/html)/i.test(value)
    ? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
    : value;
}

// MAP FACTS

var _VirtualDom_mapAttribute = F2(function (func, attr) {
  return attr.$ === "a0"
    ? A2(_VirtualDom_on, attr.o, _VirtualDom_mapHandler(func, attr.p))
    : attr;
});

function _VirtualDom_mapHandler(func, handler) {
  var tag = $gren_lang$browser$VirtualDom$toHandlerInt(handler);

  // 0 = Normal
  // 1 = MayStopPropagation
  // 2 = MayPreventDefault
  // 3 = Custom

  var mappedDecoder;
  switch (tag) {
    case 0:
      A2($gren_lang$core$Json$Decode$map, func, handler.a);
      break;
    case 1:
      A3(
        $gren_lang$core$Json$Decode$map2,
        _VirtualDom_mapMayStopPropagation,
        $gren_lang$core$Json$Decode$succeed(func),
        handler.a,
      );
      break;
    case 2:
      A3(
        $gren_lang$core$Json$Decode$map2,
        _VirtualDom_mapMayPreventDefault,
        $gren_lang$core$Json$Decode$succeed(func),
        handler.a,
      );
      break;
    case 3:
      A3(
        $gren_lang$core$Json$Decode$map2,
        _VirtualDom_mapEventRecord,
        $gren_lang$core$Json$Decode$succeed(func),
        handler.a,
      );
      break;
  }

  return {
    $: handler.$,
    a: mappedDecoder,
  };
}

var _VirtualDom_mapMayStopPropagation = F2(function (func, record) {
  return {
    message: func(record.message),
    stopPropagation: record.stopPropagation,
  };
});

var _VirtualDom_mapMayPreventDefault = F2(function (func, record) {
  return {
    message: func(record.message),
    preventDefault: record.preventDefault,
  };
});

var _VirtualDom_mapEventRecord = F2(function (func, record) {
  return {
    message: func(record.message),
    stopPropagation: record.stopPropagation,
    preventDefault: record.preventDefault,
  };
});

// ORGANIZE FACTS

function _VirtualDom_organizeFacts(factList) {
  for (var facts = {}, i = 0; i < factList.length; i++) {
    var entry = factList[i];

    var tag = entry.$;
    var key = entry.o;
    var value = entry.p;

    if (tag === "a2") {
      key === "className"
        ? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
        : (facts[key] = _Json_unwrap(value));

      continue;
    }

    var subFacts = facts[tag] || (facts[tag] = {});
    tag === "a3" && key === "class"
      ? _VirtualDom_addClass(subFacts, key, value)
      : (subFacts[key] = value);
  }

  return facts;
}

function _VirtualDom_addClass(object, key, newClass) {
  var classes = object[key];
  object[key] = classes ? classes + " " + newClass : newClass;
}

// RENDER

function _VirtualDom_render(vNode, eventNode) {
  var tag = vNode.$;

  if (tag === 5) {
    return _VirtualDom_render(
      vNode.k || (vNode.k = vNode.n()),
      eventNode,
    );
  }

  if (tag === 0) {
    return _VirtualDom_doc.createTextNode(vNode.a);
  }

  if (tag === 4) {
    var subNode = vNode.k;
    var tagger = vNode.j;

    while (subNode.$ === 4) {
      typeof tagger !== "object"
        ? (tagger = [tagger, subNode.j])
        : tagger.push(subNode.j);

      subNode = subNode.k;
    }

    var subEventRoot = { j: tagger, q: eventNode };
    var domNode = _VirtualDom_render(subNode, subEventRoot);
    domNode.gren_event_node_ref = subEventRoot;
    return domNode;
  }

  if (tag === 3) {
    var domNode = vNode.h(vNode.g);
    _VirtualDom_applyFacts(domNode, eventNode, vNode.d);
    return domNode;
  }

  // at this point `tag` must be 1 or 2

  var domNode = vNode.f
    ? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
    : _VirtualDom_doc.createElement(vNode.c);

  if (_VirtualDom_divertHrefToApp && vNode.c == "a") {
    domNode.addEventListener("click", _VirtualDom_divertHrefToApp(domNode));
  }

  _VirtualDom_applyFacts(domNode, eventNode, vNode.d);

  for (var kids = vNode.e, i = 0; i < kids.length; i++) {
    _VirtualDom_appendChild(
      domNode,
      _VirtualDom_render(
        tag === 1 ? kids[i] : kids[i].node,
        eventNode,
      ),
    );
  }

  return domNode;
}

// APPLY FACTS

function _VirtualDom_applyFacts(domNode, eventNode, facts) {
  for (var key in facts) {
    var value = facts[key];

    key === "a1"
      ? _VirtualDom_applyStyles(domNode, value)
      : key === "a0"
        ? _VirtualDom_applyEvents(domNode, eventNode, value)
        : key === "a3"
          ? _VirtualDom_applyAttrs(domNode, value)
          : key === "a4"
            ? _VirtualDom_applyAttrsNS(domNode, value)
            : ((key !== "value" && key !== "checked") ||
                domNode[key] !== value) &&
              (domNode[key] = value);
  }
}

// APPLY STYLES

function _VirtualDom_applyStyles(domNode, styles) {
  var domNodeStyle = domNode.style;

  for (var key in styles) {
    domNodeStyle[key] = styles[key];
  }
}

// APPLY ATTRS

function _VirtualDom_applyAttrs(domNode, attrs) {
  for (var key in attrs) {
    var value = attrs[key];
    typeof value !== "undefined"
      ? domNode.setAttribute(key, value)
      : domNode.removeAttribute(key);
  }
}

// APPLY NAMESPACED ATTRS

function _VirtualDom_applyAttrsNS(domNode, nsAttrs) {
  for (var key in nsAttrs) {
    var pair = nsAttrs[key];
    var namespace = pair.f;
    var value = pair.p;

    typeof value !== "undefined"
      ? domNode.setAttributeNS(namespace, key, value)
      : domNode.removeAttributeNS(namespace, key);
  }
}

// APPLY EVENTS

function _VirtualDom_applyEvents(domNode, eventNode, events) {
  var allCallbacks = domNode.grenFs || (domNode.grenFs = {});

  for (var key in events) {
    var newHandler = events[key];
    var oldCallback = allCallbacks[key];

    if (!newHandler) {
      domNode.removeEventListener(key, oldCallback);
      allCallbacks[key] = undefined;
      continue;
    }

    if (oldCallback) {
      var oldHandler = oldCallback.r;
      if (oldHandler.$ === newHandler.$) {
        oldCallback.r = newHandler;
        continue;
      }
      domNode.removeEventListener(key, oldCallback);
    }

    oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
    domNode.addEventListener(
      key,
      oldCallback,
      _VirtualDom_passiveSupported && {
        passive: $gren_lang$browser$VirtualDom$toHandlerInt(newHandler) < 2,
      },
    );
    allCallbacks[key] = oldCallback;
  }
}

// PASSIVE EVENTS

var _VirtualDom_passiveSupported;

try {
  window.addEventListener(
    "t",
    null,
    Object.defineProperty({}, "passive", {
      get: function () {
        _VirtualDom_passiveSupported = true;
      },
    }),
  );
} catch (e) {}

// EVENT HANDLERS

function _VirtualDom_makeCallback(eventNode, initialHandler) {
  function callback(event) {
    var handler = callback.r;
    var result = _Json_runHelp(handler.a, event);

    if (!$gren_lang$core$Result$isOk(result)) {
      return;
    }

    var tag = $gren_lang$browser$VirtualDom$toHandlerInt(handler);

    // 0 = Normal
    // 1 = MayStopPropagation
    // 2 = MayPreventDefault
    // 3 = Custom

    var value = result.a;
    var message = !tag ? value : value.message;
    var stopPropagation =
      tag == 1 || tag == 3 ? value.stopPropagation : false;
    var currentEventNode =
      (stopPropagation && event.stopPropagation(),
      (tag == 2 || tag == 3 ? value.preventDefault : false) &&
        event.preventDefault(),
      eventNode);
    var tagger;
    var i;
    while ((tagger = currentEventNode.j)) {
      if (typeof tagger == "function") {
        message = tagger(message);
      } else {
        for (var i = tagger.length; i--; ) {
          message = tagger[i](message);
        }
      }
      currentEventNode = currentEventNode.q;
    }
    currentEventNode(message, stopPropagation); // stopPropagation implies isSync
  }

  callback.r = initialHandler;

  return callback;
}

function _VirtualDom_equalEvents(x, y) {
  return x.$ == y.$ && _Json_equality(x.a, y.a);
}

// DIFF

// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y) {
  var patches = [];
  _VirtualDom_diffHelp(x, y, patches, 0);
  return patches;
}

function _VirtualDom_pushPatch(patches, type, index, data) {
  var patch = {
    $: type,
    s: index,
    t: data,
    u: undefined,
    v: undefined,
  };
  patches.push(patch);
  return patch;
}

function _VirtualDom_diffHelp(x, y, patches, index) {
  if (x === y) {
    return;
  }

  var xType = x.$;
  var yType = y.$;

  // Bail if you run into different types of nodes. Implies that the
  // structure has changed significantly and it's not worth a diff.
  if (xType !== yType) {
    if (xType === 1 && yType === 2) {
      y = _VirtualDom_dekey(y);
      yType = 1;
    } else {
      _VirtualDom_pushPatch(patches, 0, index, y);
      return;
    }
  }

  // Now we know that both nodes are the same $.
  switch (yType) {
    case 5:
      var xArgs = x.m;
      var yArgs = y.m;
      var i = xArgs.length;
      var same = i === yArgs.length && x.l === y.l;
      while (same && i--) {
        same = _Utils_eq(xArgs[i], yArgs[i]);
      }
      if (same) {
        y.k = x.k;
        return;
      }
      y.k = y.n();
      var subPatches = [];
      _VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
      subPatches.length > 0 &&
        _VirtualDom_pushPatch(patches, 1, index, subPatches);
      return;

    case 4:
      // gather nested taggers
      var xTaggers = x.j;
      var yTaggers = y.j;
      var nesting = false;

      var xSubNode = x.k;
      while (xSubNode.$ === 4) {
        nesting = true;

        typeof xTaggers !== "object"
          ? (xTaggers = [xTaggers, xSubNode.j])
          : xTaggers.push(xSubNode.j);

        xSubNode = xSubNode.k;
      }

      var ySubNode = y.k;
      while (ySubNode.$ === 4) {
        nesting = true;

        typeof yTaggers !== "object"
          ? (yTaggers = [yTaggers, ySubNode.j])
          : yTaggers.push(ySubNode.j);

        ySubNode = ySubNode.k;
      }

      // Just bail if different numbers of taggers. This implies the
      // structure of the virtual DOM has changed.
      if (nesting && xTaggers.length !== yTaggers.length) {
        _VirtualDom_pushPatch(patches, 0, index, y);
        return;
      }

      // check if taggers are "the same"
      if (
        nesting
          ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers)
          : xTaggers !== yTaggers
      ) {
        _VirtualDom_pushPatch(patches, 2, index, yTaggers);
      }

      // diff everything below the taggers
      _VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
      return;

    case 0:
      if (x.a !== y.a) {
        _VirtualDom_pushPatch(patches, 3, index, y.a);
      }
      return;

    case 1:
      _VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
      return;

    case 2:
      _VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
      return;

    case 3:
      if (x.h !== y.h) {
        _VirtualDom_pushPatch(patches, 0, index, y);
        return;
      }

      var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
      factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

      var patch = y.i(x.g, y.g);
      patch && _VirtualDom_pushPatch(patches, 5, index, patch);

      return;
  }
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs) {
  for (var i = 0; i < as.length; i++) {
    if (as[i] !== bs[i]) {
      return false;
    }
  }

  return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids) {
  // Bail if obvious indicators have changed. Implies more serious
  // structural changes such that it's not worth it to diff.
  if (x.c !== y.c || x.f !== y.f) {
    _VirtualDom_pushPatch(patches, 0, index, y);
    return;
  }

  var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
  factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

  diffKids(x, y, patches, index);
}

// DIFF FACTS

// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category) {
  var diff;

  // look for changes and removals
  for (var xKey in x) {
    if (
      xKey === "a1" ||
      xKey === "a0" ||
      xKey === "a3" ||
      xKey === "a4"
    ) {
      var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
      if (subDiff) {
        diff = diff || {};
        diff[xKey] = subDiff;
      }
      continue;
    }

    // remove if not in the new facts
    if (!(xKey in y)) {
      diff = diff || {};
      diff[xKey] = !category
        ? typeof x[xKey] === "string"
          ? ""
          : null
        : category === "a1"
          ? ""
          : category === "a0" || category === "a3"
            ? undefined
            : { f: x[xKey].f, p: undefined };

      continue;
    }

    var xValue = x[xKey];
    var yValue = y[xKey];

    // reference equal, so don't worry about it
    if (
      (xValue === yValue && xKey !== "value" && xKey !== "checked") ||
      (category === "a0" && _VirtualDom_equalEvents(xValue, yValue))
    ) {
      continue;
    }

    diff = diff || {};
    diff[xKey] = yValue;
  }

  // add new stuff
  for (var yKey in y) {
    if (!(yKey in x)) {
      diff = diff || {};
      diff[yKey] = y[yKey];
    }
  }

  return diff;
}

// DIFF KIDS

function _VirtualDom_diffKids(xParent, yParent, patches, index) {
  var xKids = xParent.e;
  var yKids = yParent.e;

  var xLen = xKids.length;
  var yLen = yKids.length;

  // FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

  if (xLen > yLen) {
    _VirtualDom_pushPatch(patches, 6, index, {
      w: yLen,
      i: xLen - yLen,
    });
  } else if (xLen < yLen) {
    _VirtualDom_pushPatch(patches, 7, index, {
      w: xLen,
      e: yKids,
    });
  }

  // PAIRWISE DIFF EVERYTHING ELSE

  for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++) {
    var xKid = xKids[i];
    _VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
    index += xKid.b || 0;
  }
}

// KEYED DIFF

function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex) {
  var localPatches = [];

  var changes = {}; // Dict String Entry
  var inserts = []; // Array { index : Int, entry : Entry }
  // type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

  var xKids = xParent.e;
  var yKids = yParent.e;
  var xLen = xKids.length;
  var yLen = yKids.length;
  var xIndex = 0;
  var yIndex = 0;

  var index = rootIndex;

  while (xIndex < xLen && yIndex < yLen) {
    var x = xKids[xIndex];
    var y = yKids[yIndex];

    var xKey = x.key;
    var yKey = y.key;
    var xNode = x.node;
    var yNode = y.node;

    var newMatch = undefined;
    var oldMatch = undefined;

    // check if keys match

    if (xKey === yKey) {
      index++;
      _VirtualDom_diffHelp(xNode, yNode, localPatches, index);
      index += xNode.b || 0;

      xIndex++;
      yIndex++;
      continue;
    }

    // look ahead 1 to detect insertions and removals.

    var xNext = xKids[xIndex + 1];
    var yNext = yKids[yIndex + 1];

    if (xNext) {
      var xNextKey = xNext.key;
      var xNextNode = xNext.node;
      oldMatch = yKey === xNextKey;
    }

    if (yNext) {
      var yNextKey = yNext.key;
      var yNextNode = yNext.node;
      newMatch = xKey === yNextKey;
    }

    // swap x and y
    if (newMatch && oldMatch) {
      index++;
      _VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
      _VirtualDom_insertNode(
        changes,
        localPatches,
        xKey,
        yNode,
        yIndex,
        inserts,
      );
      index += xNode.b || 0;

      index++;
      _VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
      index += xNextNode.b || 0;

      xIndex += 2;
      yIndex += 2;
      continue;
    }

    // insert y
    if (newMatch) {
      index++;
      _VirtualDom_insertNode(
        changes,
        localPatches,
        yKey,
        yNode,
        yIndex,
        inserts,
      );
      _VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
      index += xNode.b || 0;

      xIndex += 1;
      yIndex += 2;
      continue;
    }

    // remove x
    if (oldMatch) {
      index++;
      _VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
      index += xNode.b || 0;

      index++;
      _VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
      index += xNextNode.b || 0;

      xIndex += 2;
      yIndex += 1;
      continue;
    }

    // remove x, insert y
    if (xNext && xNextKey === yNextKey) {
      index++;
      _VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
      _VirtualDom_insertNode(
        changes,
        localPatches,
        yKey,
        yNode,
        yIndex,
        inserts,
      );
      index += xNode.b || 0;

      index++;
      _VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
      index += xNextNode.b || 0;

      xIndex += 2;
      yIndex += 2;
      continue;
    }

    break;
  }

  // eat up any remaining nodes with removeNode and insertNode

  while (xIndex < xLen) {
    index++;
    var x = xKids[xIndex];
    var xNode = x.node;
    _VirtualDom_removeNode(changes, localPatches, x.key, xNode, index);
    index += xNode.b || 0;
    xIndex++;
  }

  while (yIndex < yLen) {
    var endInserts = endInserts || [];
    var y = yKids[yIndex];
    _VirtualDom_insertNode(
      changes,
      localPatches,
      y.key,
      y.node,
      undefined,
      endInserts,
    );
    yIndex++;
  }

  if (localPatches.length > 0 || inserts.length > 0 || endInserts) {
    _VirtualDom_pushPatch(patches, 8, rootIndex, {
      x: localPatches,
      y: inserts,
      z: endInserts,
    });
  }
}

// CHANGES FROM KEYED DIFF

var _VirtualDom_POSTFIX = "_grenW6BL";

function _VirtualDom_insertNode(
  changes,
  localPatches,
  key,
  vnode,
  yIndex,
  inserts,
) {
  var entry = changes[key];

  // never seen this key before
  if (!entry) {
    entry = {
      c: 0,
      A: vnode,
      s: yIndex,
      t: undefined,
    };

    inserts.push({ s: yIndex, B: entry });
    changes[key] = entry;

    return;
  }

  // this key was removed earlier, a match!
  if (entry.c === 1) {
    inserts.push({ s: yIndex, B: entry });

    entry.c = 2;
    var subPatches = [];
    _VirtualDom_diffHelp(entry.A, vnode, subPatches, entry.s);
    entry.s = yIndex;
    entry.t.t = {
      x: subPatches,
      B: entry,
    };

    return;
  }

  // this key has already been inserted or moved, a duplicate!
  _VirtualDom_insertNode(
    changes,
    localPatches,
    key + _VirtualDom_POSTFIX,
    vnode,
    yIndex,
    inserts,
  );
}

function _VirtualDom_removeNode(changes, localPatches, key, vnode, index) {
  var entry = changes[key];

  // never seen this key before
  if (!entry) {
    var patch = _VirtualDom_pushPatch(
      localPatches,
      9,
      index,
      undefined,
    );

    changes[key] = {
      c: 1,
      A: vnode,
      s: index,
      t: patch,
    };

    return;
  }

  // this key was inserted earlier, a match!
  if (entry.c === 0) {
    entry.c = 2;
    var subPatches = [];
    _VirtualDom_diffHelp(vnode, entry.A, subPatches, index);

    _VirtualDom_pushPatch(localPatches, 9, index, {
      x: subPatches,
      B: entry,
    });

    return;
  }

  // this key has already been removed or moved, a duplicate!
  _VirtualDom_removeNode(
    changes,
    localPatches,
    key + _VirtualDom_POSTFIX,
    vnode,
    index,
  );
}

// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.

function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode) {
  _VirtualDom_addDomNodesHelp(
    domNode,
    vNode,
    patches,
    0,
    0,
    vNode.b,
    eventNode,
  );
}

// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(
  domNode,
  vNode,
  patches,
  i,
  low,
  high,
  eventNode,
) {
  var patch = patches[i];
  var index = patch.s;

  while (index === low) {
    var patchType = patch.$;

    if (patchType === 1) {
      _VirtualDom_addDomNodes(domNode, vNode.k, patch.t, eventNode);
    } else if (patchType === 8) {
      patch.u = domNode;
      patch.v = eventNode;

      var subPatches = patch.t.x;
      if (subPatches.length > 0) {
        _VirtualDom_addDomNodesHelp(
          domNode,
          vNode,
          subPatches,
          0,
          low,
          high,
          eventNode,
        );
      }
    } else if (patchType === 9) {
      patch.u = domNode;
      patch.v = eventNode;

      var data = patch.t;
      if (data) {
        data.B.t = domNode;
        var subPatches = data.x;
        if (subPatches.length > 0) {
          _VirtualDom_addDomNodesHelp(
            domNode,
            vNode,
            subPatches,
            0,
            low,
            high,
            eventNode,
          );
        }
      }
    } else {
      patch.u = domNode;
      patch.v = eventNode;
    }

    i++;

    if (!(patch = patches[i]) || (index = patch.s) > high) {
      return i;
    }
  }

  var tag = vNode.$;

  if (tag === 4) {
    var subNode = vNode.k;

    while (subNode.$ === 4) {
      subNode = subNode.k;
    }

    return _VirtualDom_addDomNodesHelp(
      domNode,
      subNode,
      patches,
      i,
      low + 1,
      high,
      domNode.gren_event_node_ref,
    );
  }

  // tag must be 1 or 2 at this point

  var vKids = vNode.e;
  var childNodes = domNode.childNodes;
  for (var j = 0; j < vKids.length; j++) {
    low++;
    var vKid = tag === 1 ? vKids[j] : vKids[j].node;
    var nextLow = low + (vKid.b || 0);
    if (low <= index && index <= nextLow) {
      i = _VirtualDom_addDomNodesHelp(
        childNodes[j],
        vKid,
        patches,
        i,
        low,
        nextLow,
        eventNode,
      );
      if (!(patch = patches[i]) || (index = patch.s) > high) {
        return i;
      }
    }
    low = nextLow;
  }
  return i;
}

// APPLY PATCHES

function _VirtualDom_applyPatches(
  rootDomNode,
  oldVirtualNode,
  patches,
  eventNode,
) {
  if (patches.length === 0) {
    return rootDomNode;
  }

  _VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
  return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches) {
  for (var i = 0; i < patches.length; i++) {
    var patch = patches[i];
    var localDomNode = patch.u;
    var newNode = _VirtualDom_applyPatch(localDomNode, patch);
    if (localDomNode === rootDomNode) {
      rootDomNode = newNode;
    }
  }
  return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch) {
  switch (patch.$) {
    case 0:
      return _VirtualDom_applyPatchRedraw(
        domNode,
        patch.t,
        patch.v,
      );

    case 4:
      _VirtualDom_applyFacts(domNode, patch.v, patch.t);
      return domNode;

    case 3:
      domNode.replaceData(0, domNode.length, patch.t);
      return domNode;

    case 1:
      return _VirtualDom_applyPatchesHelp(domNode, patch.t);

    case 2:
      if (domNode.gren_event_node_ref) {
        domNode.gren_event_node_ref.j = patch.t;
      } else {
        domNode.gren_event_node_ref = {
          j: patch.t,
          q: patch.v,
        };
      }
      return domNode;

    case 6:
      var data = patch.t;
      for (var i = 0; i < data.i; i++) {
        domNode.removeChild(domNode.childNodes[data.w]);
      }
      return domNode;

    case 7:
      var data = patch.t;
      var kids = data.e;
      var i = data.w;
      var theEnd = domNode.childNodes[i];
      for (; i < kids.length; i++) {
        domNode.insertBefore(
          _VirtualDom_render(kids[i], patch.v),
          theEnd,
        );
      }
      return domNode;

    case 9:
      var data = patch.t;
      if (!data) {
        domNode.parentNode.removeChild(domNode);
        return domNode;
      }
      var entry = data.B;
      if (typeof entry.s !== "undefined") {
        domNode.parentNode.removeChild(domNode);
      }
      entry.t = _VirtualDom_applyPatchesHelp(domNode, data.x);
      return domNode;

    case 8:
      return _VirtualDom_applyPatchReorder(domNode, patch);

    case 5:
      return patch.t(domNode);

    default:
      _Debug_crash(10); // 'Ran into an unknown patch!'
  }
}

function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode) {
  var parentNode = domNode.parentNode;
  var newNode = _VirtualDom_render(vNode, eventNode);

  if (!newNode.gren_event_node_ref) {
    newNode.gren_event_node_ref = domNode.gren_event_node_ref;
  }

  if (parentNode && newNode !== domNode) {
    parentNode.replaceChild(newNode, domNode);
  }
  return newNode;
}

function _VirtualDom_applyPatchReorder(domNode, patch) {
  var data = patch.t;

  // remove end inserts
  var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(
    data.z,
    patch,
  );

  // removals
  domNode = _VirtualDom_applyPatchesHelp(domNode, data.x);

  // inserts
  var inserts = data.y;
  for (var i = 0; i < inserts.length; i++) {
    var insert = inserts[i];
    var entry = insert.B;
    var node =
      entry.c === 2
        ? entry.t
        : _VirtualDom_render(entry.A, patch.v);
    domNode.insertBefore(node, domNode.childNodes[insert.s]);
  }

  // add end inserts
  if (frag) {
    _VirtualDom_appendChild(domNode, frag);
  }

  return domNode;
}

function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch) {
  if (!endInserts) {
    return;
  }

  var frag = _VirtualDom_doc.createDocumentFragment();
  for (var i = 0; i < endInserts.length; i++) {
    var insert = endInserts[i];
    var entry = insert.B;
    _VirtualDom_appendChild(
      frag,
      entry.c === 2
        ? entry.t
        : _VirtualDom_render(entry.A, patch.v),
    );
  }
  return frag;
}

function _VirtualDom_virtualize(node) {
  // TEXT NODES

  if (node.nodeType === 3) {
    return _VirtualDom_text(node.textContent);
  }

  // WEIRD NODES

  if (node.nodeType !== 1) {
    return _VirtualDom_text("");
  }

  // ELEMENT NODES

  var attrs = node.attributes;
  var attrList = new Array(attrs.length);

  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    var name = attr.name;
    var value = attr.value;
    attrList[i] = A2(_VirtualDom_attribute, name, value);
  }

  var tag = node.tagName.toLowerCase();
  var kids = node.childNodes;
  var kidList = new Array(kids.length);

  for (var i = 0; i < kids.length; i++) {
    kidList[i] = _VirtualDom_virtualize(kids[i]);
  }

  return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode) {
  var keyedKids = keyedNode.e;
  var len = keyedKids.length;
  var kids = new Array(len);

  for (var i = 0; i < len; i++) {
    kids[i] = keyedKids[i].b;
  }

  return {
    $: 1,
    c: keyedNode.c,
    d: keyedNode.d,
    e: kids,
    f: keyedNode.f,
    b: keyedNode.b,
  };
}
var $gren_lang$core$Json$Decode$map = _Json_map1;
var $gren_lang$core$Json$Decode$map2 = _Json_map2;
var $gren_lang$core$Json$Decode$succeed = _Json_succeed;
var $gren_lang$browser$VirtualDom$toHandlerInt = function(handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var $gren_lang$browser$Browser$External = function (a) {
	return { $: 'External', a: a };
};
var $gren_lang$browser$Browser$Internal = function (a) {
	return { $: 'Internal', a: a };
};
var $gren_lang$core$Basics$identity = function(x) {
	return x;
};
var $gren_lang$browser$Browser$Dom$NotFound = function (a) {
	return { $: 'NotFound', a: a };
};
var $gren_lang$url$Url$Http = { $: 'Http' };
var $gren_lang$url$Url$Https = { $: 'Https' };
var $gren_lang$core$Basics$apL$ = function(f, x) {
	return f(x);
};
var $gren_lang$core$Basics$apL = F2($gren_lang$core$Basics$apL$);
var $gren_lang$core$String$contains = _String_contains;
var $gren_lang$core$Basics$lt = _Utils_lt;
var $gren_lang$core$String$slice = _String_slice;
var $gren_lang$core$String$unitLength = _String_unitLength;
var $gren_lang$core$String$dropFirst$ = function(n, string) {
	return (n < 1) ? string : A3($gren_lang$core$String$slice, n, $gren_lang$core$String$unitLength(string), string);
};
var $gren_lang$core$String$dropFirst = F2($gren_lang$core$String$dropFirst$);
var $gren_lang$core$String$indices = _String_indexes;
var $gren_lang$core$Basics$eq = _Utils_equal;
var $gren_lang$core$String$isEmpty = function(string) {
	return string === '';
};
var $gren_lang$core$String$takeFirst$ = function(n, string) {
	return (n < 1) ? '' : A3($gren_lang$core$String$slice, 0, n, string);
};
var $gren_lang$core$String$takeFirst = F2($gren_lang$core$String$takeFirst$);
var $gren_lang$core$String$toInt = _String_toInt;
var $gren_lang$url$Url$chompBeforePath$ = function(protocol, path, params, frag, str) {
	if ($gren_lang$core$String$isEmpty(str) || A2($gren_lang$core$String$contains, '@', str)) {
		return $gren_lang$core$Maybe$Nothing;
	} else {
		var _v0 = A2($gren_lang$core$String$indices, ':', str);
		switch (_v0.length) {
			case 0:
				return $gren_lang$core$Maybe$Just({ fragment: frag, host: str, path: path, port_: $gren_lang$core$Maybe$Nothing, protocol: protocol, query: params });
			case 1:
				var i = _v0[0];
				var _v1 = $gren_lang$core$String$toInt($gren_lang$core$String$dropFirst$(i + 1, str));
				if (_v1.$ === 'Nothing') {
					return $gren_lang$core$Maybe$Nothing;
				} else {
					var port_ = _v1;
					return $gren_lang$core$Maybe$Just({ fragment: frag, host: $gren_lang$core$String$takeFirst$(i, str), path: path, port_: port_, protocol: protocol, query: params });
				}
			default:
				return $gren_lang$core$Maybe$Nothing;
		}
	}
};
var $gren_lang$url$Url$chompBeforePath = F5($gren_lang$url$Url$chompBeforePath$);
var $gren_lang$core$Array$get = _Array_get;
var $gren_lang$url$Url$chompBeforeQuery$ = function(protocol, params, frag, str) {
	if ($gren_lang$core$String$isEmpty(str)) {
		return $gren_lang$core$Maybe$Nothing;
	} else {
		var _v0 = A2($gren_lang$core$Array$get, 0, A2($gren_lang$core$String$indices, '/', str));
		if (_v0.$ === 'Nothing') {
			return $gren_lang$url$Url$chompBeforePath$(protocol, '/', params, frag, str);
		} else {
			var i = _v0.a;
			return $gren_lang$url$Url$chompBeforePath$(protocol, $gren_lang$core$String$dropFirst$(i, str), params, frag, $gren_lang$core$String$takeFirst$(i, str));
		}
	}
};
var $gren_lang$url$Url$chompBeforeQuery = F4($gren_lang$url$Url$chompBeforeQuery$);
var $gren_lang$url$Url$chompBeforeFragment$ = function(protocol, frag, str) {
	if ($gren_lang$core$String$isEmpty(str)) {
		return $gren_lang$core$Maybe$Nothing;
	} else {
		var _v0 = A2($gren_lang$core$Array$get, 0, A2($gren_lang$core$String$indices, '?', str));
		if (_v0.$ === 'Nothing') {
			return $gren_lang$url$Url$chompBeforeQuery$(protocol, $gren_lang$core$Maybe$Nothing, frag, str);
		} else {
			var i = _v0.a;
			return $gren_lang$url$Url$chompBeforeQuery$(protocol, $gren_lang$core$Maybe$Just($gren_lang$core$String$dropFirst$(i + 1, str)), frag, $gren_lang$core$String$takeFirst$(i, str));
		}
	}
};
var $gren_lang$url$Url$chompBeforeFragment = F3($gren_lang$url$Url$chompBeforeFragment$);
var $gren_lang$url$Url$chompAfterProtocol$ = function(protocol, str) {
	if ($gren_lang$core$String$isEmpty(str)) {
		return $gren_lang$core$Maybe$Nothing;
	} else {
		var _v0 = A2($gren_lang$core$Array$get, 0, A2($gren_lang$core$String$indices, '#', str));
		if (_v0.$ === 'Nothing') {
			return $gren_lang$url$Url$chompBeforeFragment$(protocol, $gren_lang$core$Maybe$Nothing, str);
		} else {
			var i = _v0.a;
			return $gren_lang$url$Url$chompBeforeFragment$(protocol, $gren_lang$core$Maybe$Just($gren_lang$core$String$dropFirst$(i + 1, str)), $gren_lang$core$String$takeFirst$(i, str));
		}
	}
};
var $gren_lang$url$Url$chompAfterProtocol = F2($gren_lang$url$Url$chompAfterProtocol$);
var $gren_lang$core$String$startsWith = _String_startsWith;
var $gren_lang$url$Url$fromString = function(str) {
	return A2($gren_lang$core$String$startsWith, 'http://', str) ? $gren_lang$url$Url$chompAfterProtocol$($gren_lang$url$Url$Http, $gren_lang$core$String$dropFirst$(7, str)) : (A2($gren_lang$core$String$startsWith, 'https://', str) ? $gren_lang$url$Url$chompAfterProtocol$($gren_lang$url$Url$Https, $gren_lang$core$String$dropFirst$(8, str)) : $gren_lang$core$Maybe$Nothing);
};
var $gren_lang$core$Basics$never = function(_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $gren_lang$core$Task$Perform = function (a) {
	return { $: 'Perform', a: a };
};
var $gren_lang$core$Task$succeed = _Scheduler_succeed;
var $gren_lang$core$Task$init = $gren_lang$core$Task$succeed({  });
var $gren_lang$core$Array$map = _Array_map;
var $gren_lang$core$Task$andThen = _Scheduler_andThen;
var $gren_lang$core$Basics$apR$ = function(x, f) {
	return f(x);
};
var $gren_lang$core$Basics$apR = F2($gren_lang$core$Basics$apR$);
var $gren_lang$core$Task$map$ = function(func, taskA) {
	return A2($gren_lang$core$Task$andThen, function(a) {
			return $gren_lang$core$Task$succeed(func(a));
		}, taskA);
};
var $gren_lang$core$Task$map = F2($gren_lang$core$Task$map$);
var $gren_lang$core$Array$foldr = _Array_foldr;
var $gren_lang$core$Array$pushFirst$ = function(value, array) {
	return A4(_Array_splice1, 0, 0, value, array);
};
var $gren_lang$core$Array$pushFirst = F2($gren_lang$core$Array$pushFirst$);
var $gren_lang$core$Task$sequence = A2($gren_lang$core$Array$foldr, F2(function(task, combined) {
			return A2($gren_lang$core$Task$andThen, function(x) {
					return $gren_lang$core$Task$map$($gren_lang$core$Array$pushFirst(x), combined);
				}, task);
		}), $gren_lang$core$Task$succeed([  ]));
var $gren_lang$core$Platform$sendToApp = _Platform_sendToApp;
var $gren_lang$core$Task$spawnCmd$ = function(router, cmd) {
	switch (cmd.$) {
		case 'Perform':
			var task = cmd.a;
			return _Scheduler_spawn(A2($gren_lang$core$Task$andThen, $gren_lang$core$Platform$sendToApp(router), task));
		case 'ExecuteCmd':
			var task = cmd.a;
			return _Scheduler_spawn(A2($gren_lang$core$Task$andThen, _Platform_executeCmd(router), task));
		default:
			var task = cmd.a;
			return _Scheduler_spawn(task);
	}
};
var $gren_lang$core$Task$spawnCmd = F2($gren_lang$core$Task$spawnCmd$);
var $gren_lang$core$Task$onEffects$ = function(router, commands, state) {
	return $gren_lang$core$Task$map$(function(_v0) {
			return {  };
		}, $gren_lang$core$Task$sequence(A2($gren_lang$core$Array$map, $gren_lang$core$Task$spawnCmd(router), commands)));
};
var $gren_lang$core$Task$onEffects = F3($gren_lang$core$Task$onEffects$);
var $gren_lang$core$Task$onSelfMsg$ = function(_v0, _v1, _v2) {
	return $gren_lang$core$Task$succeed({  });
};
var $gren_lang$core$Task$onSelfMsg = F3($gren_lang$core$Task$onSelfMsg$);
var $gren_lang$core$Task$Execute = function (a) {
	return { $: 'Execute', a: a };
};
var $gren_lang$core$Task$ExecuteCmd = function (a) {
	return { $: 'ExecuteCmd', a: a };
};
var $gren_lang$core$Platform$Cmd$map = _Platform_map;
var $gren_lang$core$Task$cmdMap$ = function(tagger, cmd) {
	switch (cmd.$) {
		case 'Perform':
			var task = cmd.a;
			return $gren_lang$core$Task$Perform($gren_lang$core$Task$map$(tagger, task));
		case 'ExecuteCmd':
			var task = cmd.a;
			return $gren_lang$core$Task$ExecuteCmd($gren_lang$core$Task$map$($gren_lang$core$Platform$Cmd$map(tagger), task));
		default:
			var task = cmd.a;
			return $gren_lang$core$Task$Execute(task);
	}
};
var $gren_lang$core$Task$cmdMap = F2($gren_lang$core$Task$cmdMap$);
_Platform_effectManagers['Task'] = _Platform_createManager($gren_lang$core$Task$init, $gren_lang$core$Task$onEffects, $gren_lang$core$Task$onSelfMsg, $gren_lang$core$Task$cmdMap);
var $gren_lang$core$Task$command = _Platform_leaf('Task');
var $gren_lang$core$Task$perform$ = function(toMessage, task) {
	return $gren_lang$core$Task$command($gren_lang$core$Task$Perform($gren_lang$core$Task$map$(toMessage, task)));
};
var $gren_lang$core$Task$perform = F2($gren_lang$core$Task$perform$);
var $gren_lang$browser$Browser$document = _Browser_document;
var $gren_lang$core$Dict$RBEmpty_gren_builtin = { $: 'RBEmpty_gren_builtin' };
var $gren_lang$core$Dict$empty = $gren_lang$core$Dict$RBEmpty_gren_builtin;
var $gren_lang$core$Dict$Black = { $: 'Black' };
var $gren_lang$core$Dict$RBNode_gren_builtin = function (a) {
	return { $: 'RBNode_gren_builtin', a: a };
};
var $gren_lang$core$Dict$node$ = function(color, key, value, left, right) {
	return $gren_lang$core$Dict$RBNode_gren_builtin({ color: color, key: key, left: left, right: right, value: value });
};
var $gren_lang$core$Dict$node = F5($gren_lang$core$Dict$node$);
var $gren_lang$core$Dict$Red = { $: 'Red' };
var $gren_lang$core$Dict$balance$ = function(color, key, value, left, right) {
	if ((right.$ === 'RBNode_gren_builtin') && (right.a.color.$ === 'Red')) {
		var _v1 = right.a;
		var _v2 = _v1.color;
		var rK = _v1.key;
		var rV = _v1.value;
		var rLeft = _v1.left;
		var rRight = _v1.right;
		if ((left.$ === 'RBNode_gren_builtin') && (left.a.color.$ === 'Red')) {
			var _v4 = left.a;
			var _v5 = _v4.color;
			var lK = _v4.key;
			var lV = _v4.value;
			var lLeft = _v4.left;
			var lRight = _v4.right;
			return $gren_lang$core$Dict$node$($gren_lang$core$Dict$Red, key, value, $gren_lang$core$Dict$node$($gren_lang$core$Dict$Black, lK, lV, lLeft, lRight), $gren_lang$core$Dict$node$($gren_lang$core$Dict$Black, rK, rV, rLeft, rRight));
		} else {
			return $gren_lang$core$Dict$node$(color, rK, rV, $gren_lang$core$Dict$node$($gren_lang$core$Dict$Red, key, value, left, rLeft), rRight);
		}
	} else {
		if ((((left.$ === 'RBNode_gren_builtin') && (left.a.color.$ === 'Red')) && (left.a.left.$ === 'RBNode_gren_builtin')) && (left.a.left.a.color.$ === 'Red')) {
			var _v7 = left.a;
			var _v8 = _v7.color;
			var lK = _v7.key;
			var lV = _v7.value;
			var _v9 = _v7.left.a;
			var _v10 = _v9.color;
			var llK = _v9.key;
			var llV = _v9.value;
			var llLeft = _v9.left;
			var llRight = _v9.right;
			var lRight = _v7.right;
			return $gren_lang$core$Dict$node$($gren_lang$core$Dict$Red, lK, lV, $gren_lang$core$Dict$node$($gren_lang$core$Dict$Black, llK, llV, llLeft, llRight), $gren_lang$core$Dict$node$($gren_lang$core$Dict$Black, key, value, lRight, right));
		} else {
			return $gren_lang$core$Dict$node$(color, key, value, left, right);
		}
	}
};
var $gren_lang$core$Dict$balance = F5($gren_lang$core$Dict$balance$);
var $gren_lang$core$Basics$compare = _Utils_compare;
var $gren_lang$core$Dict$setHelp$ = function(key, value, dict) {
	if (dict.$ === 'RBEmpty_gren_builtin') {
		return $gren_lang$core$Dict$node$($gren_lang$core$Dict$Red, key, value, $gren_lang$core$Dict$RBEmpty_gren_builtin, $gren_lang$core$Dict$RBEmpty_gren_builtin);
	} else {
		var _v1 = dict.a;
		var nColor = _v1.color;
		var nKey = _v1.key;
		var nValue = _v1.value;
		var nLeft = _v1.left;
		var nRight = _v1.right;
		var _v2 = A2($gren_lang$core$Basics$compare, key, nKey);
		switch (_v2.$) {
			case 'LT':
				return $gren_lang$core$Dict$balance$(nColor, nKey, nValue, $gren_lang$core$Dict$setHelp$(key, value, nLeft), nRight);
			case 'EQ':
				return $gren_lang$core$Dict$node$(nColor, nKey, value, nLeft, nRight);
			default:
				return $gren_lang$core$Dict$balance$(nColor, nKey, nValue, nLeft, $gren_lang$core$Dict$setHelp$(key, value, nRight));
		}
	}
};
var $gren_lang$core$Dict$setHelp = F3($gren_lang$core$Dict$setHelp$);
var $gren_lang$core$Dict$set$ = function(setKey, setValue, dict) {
	var _v0 = $gren_lang$core$Dict$setHelp$(setKey, setValue, dict);
	if ((_v0.$ === 'RBNode_gren_builtin') && (_v0.a.color.$ === 'Red')) {
		var _v1 = _v0.a;
		var _v2 = _v1.color;
		var key = _v1.key;
		var value = _v1.value;
		var left = _v1.left;
		var right = _v1.right;
		return $gren_lang$core$Dict$node$($gren_lang$core$Dict$Black, key, value, left, right);
	} else {
		var x = _v0;
		return x;
	}
};
var $gren_lang$core$Dict$set = F3($gren_lang$core$Dict$set$);
var $author$project$CountryDatabase$create_by_id_dict = $gren_lang$core$Dict$set$(195, { capital: 'Harare', name: 'Zimbabwe', officialName: 'Republic of Zimbabwe', population: 16290834 }, $gren_lang$core$Dict$set$(194, { capital: 'Lusaka', name: 'Zambia', officialName: 'Republic of Zambia', population: 21404590 }, $gren_lang$core$Dict$set$(193, { capital: 'Sana\'a', name: 'Yemen', officialName: 'Republic of Yemen', population: 35232510 }, $gren_lang$core$Dict$set$(192, { capital: 'Hanoi', name: 'Vietnam', officialName: 'Socialist Republic of Vietnam', population: 100321822 }, $gren_lang$core$Dict$set$(191, { capital: 'Caracas', name: 'Venezuela', officialName: 'Bolivarian Republic of Venezuela', population: 28196233 }, $gren_lang$core$Dict$set$(190, { capital: 'Vatican City', name: 'Vatican City', officialName: 'State of the Vatican City', population: 764 }, $gren_lang$core$Dict$set$(189, { capital: 'Port Vila', name: 'Vanuatu', officialName: 'Republic of Vanuatu', population: 336030 }, $gren_lang$core$Dict$set$(188, { capital: 'Tashkent', name: 'Uzbekistan', officialName: 'Republic of Uzbekistan', population: 36541100 }, $gren_lang$core$Dict$set$(187, { capital: 'Montevideo', name: 'Uruguay', officialName: 'Oriental Republic of Uruguay', population: 3329222 }, $gren_lang$core$Dict$set$(186, { capital: 'Washington, D.C.', name: 'United States', officialName: 'United States of America', population: 335893093 }, $gren_lang$core$Dict$set$(185, { capital: 'London', name: 'United Kingdom', officialName: 'United Kingdom of Great Britain and Northern Ireland', population: 67736802 }, $gren_lang$core$Dict$set$(184, { capital: 'Abu Dhabi', name: 'United Arab Emirates', officialName: 'United Arab Emirates', population: 10215123 }, $gren_lang$core$Dict$set$(183, { capital: 'Kyiv', name: 'Ukraine', officialName: 'Ukraine', population: 40565910 }, $gren_lang$core$Dict$set$(182, { capital: 'Kampala', name: 'Uganda', officialName: 'Republic of Uganda', population: 49786848 }, $gren_lang$core$Dict$set$(181, { capital: 'Funafuti', name: 'Tuvalu', officialName: 'Tuvalu', population: 11646 }, $gren_lang$core$Dict$set$(180, { capital: 'Ashgabat', name: 'Turkmenistan', officialName: 'Turkmenistan', population: 6598546 }, $gren_lang$core$Dict$set$(179, { capital: 'Ankara', name: 'Turkey', officialName: 'Republic of Türkiye', population: 85356188 }, $gren_lang$core$Dict$set$(178, { capital: 'Tunis', name: 'Tunisia', officialName: 'Tunisian Republic', population: 12244198 }, $gren_lang$core$Dict$set$(177, { capital: 'Port of Spain', name: 'Trinidad and Tobago', officialName: 'Republic of Trinidad and Tobago', population: 1531096 }, $gren_lang$core$Dict$set$(176, { capital: 'Nukuʻalofa', name: 'Tonga', officialName: 'Kingdom of Tonga', population: 103170 }, $gren_lang$core$Dict$set$(175, { capital: 'Lomé', name: 'Togo', officialName: 'Togolese Republic', population: 9519304 }, $gren_lang$core$Dict$set$(174, { capital: 'Dili', name: 'Timor-Leste', officialName: 'Democratic Republic of Timor-Leste', population: 1384303 }, $gren_lang$core$Dict$set$(173, { capital: 'Bangkok', name: 'Thailand', officialName: 'Kingdom of Thailand', population: 71801279 }, $gren_lang$core$Dict$set$(172, { capital: 'Dodoma', name: 'Tanzania', officialName: 'United Republic of Tanzania', population: 68954831 }, $gren_lang$core$Dict$set$(171, { capital: 'Dushanbe', name: 'Tajikistan', officialName: 'Republic of Tajikistan', population: 10511229 }, $gren_lang$core$Dict$set$(170, { capital: 'Damascus', name: 'Syria', officialName: 'Syrian Arab Republic', population: 24292346 }, $gren_lang$core$Dict$set$(169, { capital: 'Bern', name: 'Switzerland', officialName: 'Swiss Confederation', population: 8963840 }, $gren_lang$core$Dict$set$(168, { capital: 'Stockholm', name: 'Sweden', officialName: 'Kingdom of Sweden', population: 10612087 }, $gren_lang$core$Dict$set$(167, { capital: 'Paramaribo', name: 'Suriname', officialName: 'Republic of Suriname', population: 653191 }, $gren_lang$core$Dict$set$(166, { capital: 'Khartoum', name: 'Sudan', officialName: 'Republic of the Sudan', population: 49354692 }, $gren_lang$core$Dict$set$(165, { capital: 'Sri Jayawardenepura Kotte', name: 'Sri Lanka', officialName: 'Democratic Socialist Republic of Sri Lanka', population: 22008937 }, $gren_lang$core$Dict$set$(164, { capital: 'Madrid', name: 'Spain', officialName: 'Kingdom of Spain', population: 48123983 }, $gren_lang$core$Dict$set$(163, { capital: 'Juba', name: 'South Sudan', officialName: 'Republic of South Sudan', population: 11493121 }, $gren_lang$core$Dict$set$(162, { capital: 'Seoul', name: 'South Korea', officialName: 'Republic of Korea', population: 51787725 }, $gren_lang$core$Dict$set$(161, { capital: 'Pretoria (administrative), Cape Town (legislative), Bloemfontein (judicial)', name: 'South Africa', officialName: 'Republic of South Africa', population: 62022776 }, $gren_lang$core$Dict$set$(160, { capital: 'Mogadishu', name: 'Somalia', officialName: 'Federal Republic of Somalia', population: 18476243 }, $gren_lang$core$Dict$set$(159, { capital: 'Honiara', name: 'Solomon Islands', officialName: 'Solomon Islands', population: 750022 }, $gren_lang$core$Dict$set$(158, { capital: 'Ljubljana', name: 'Slovenia', officialName: 'Republic of Slovenia', population: 2127003 }, $gren_lang$core$Dict$set$(157, { capital: 'Bratislava', name: 'Slovakia', officialName: 'Slovak Republic', population: 5417036 }, $gren_lang$core$Dict$set$(156, { capital: 'Singapore', name: 'Singapore', officialName: 'Republic of Singapore', population: 5920000 }, $gren_lang$core$Dict$set$(155, { capital: 'Freetown', name: 'Sierra Leone', officialName: 'Republic of Sierra Leone', population: 8911357 }, $gren_lang$core$Dict$set$(154, { capital: 'Victoria', name: 'Seychelles', officialName: 'Republic of Seychelles', population: 100301 }, $gren_lang$core$Dict$set$(153, { capital: 'Belgrade', name: 'Serbia', officialName: 'Republic of Serbia', population: 6642351 }, $gren_lang$core$Dict$set$(152, { capital: 'Dakar', name: 'Senegal', officialName: 'Republic of Senegal', population: 18186744 }, $gren_lang$core$Dict$set$(151, { capital: 'Riyadh', name: 'Saudi Arabia', officialName: 'Kingdom of Saudi Arabia', population: 37236765 }, $gren_lang$core$Dict$set$(150, { capital: 'São Tomé', name: 'São Tomé and Príncipe', officialName: 'Democratic Republic of São Tomé and Príncipe', population: 233131 }, $gren_lang$core$Dict$set$(149, { capital: 'San Marino', name: 'San Marino', officialName: 'Republic of San Marino', population: 33562 }, $gren_lang$core$Dict$set$(148, { capital: 'Apia', name: 'Samoa', officialName: 'Independent State of Samoa', population: 209739 }, $gren_lang$core$Dict$set$(147, { capital: 'Kingstown', name: 'Saint Vincent and the Grenadines', officialName: 'Saint Vincent and the Grenadines', population: 103854 }, $gren_lang$core$Dict$set$(146, { capital: 'Castries', name: 'Saint Lucia', officialName: 'Saint Lucia', population: 180523 }, $gren_lang$core$Dict$set$(145, { capital: 'Basseterre', name: 'Saint Kitts and Nevis', officialName: 'Federation of Saint Christopher and Nevis', population: 50243 }, $gren_lang$core$Dict$set$(144, { capital: 'Kigali', name: 'Rwanda', officialName: 'Republic of Rwanda', population: 14094683 }, $gren_lang$core$Dict$set$(143, { capital: 'Moscow', name: 'Russia', officialName: 'Russian Federation', population: 144051562 }, $gren_lang$core$Dict$set$(142, { capital: 'Bucharest', name: 'Romania', officialName: 'Romania', population: 19014677 }, $gren_lang$core$Dict$set$(141, { capital: 'Doha', name: 'Qatar', officialName: 'State of Qatar', population: 2757207 }, $gren_lang$core$Dict$set$(140, { capital: 'Lisbon', name: 'Portugal', officialName: 'Portuguese Republic', population: 10296662 }, $gren_lang$core$Dict$set$(139, { capital: 'Warsaw', name: 'Poland', officialName: 'Republic of Poland', population: 38431845 }, $gren_lang$core$Dict$set$(138, { capital: 'Manila', name: 'Philippines', officialName: 'Republic of the Philippines', population: 118368795 }, $gren_lang$core$Dict$set$(137, { capital: 'Lima', name: 'Peru', officialName: 'Republic of Peru', population: 34049588 }, $gren_lang$core$Dict$set$(136, { capital: 'Asunción', name: 'Paraguay', officialName: 'Republic of Paraguay', population: 6810805 }, $gren_lang$core$Dict$set$(135, { capital: 'Port Moresby', name: 'Papua New Guinea', officialName: 'Independent State of Papua New Guinea', population: 10329676 }, $gren_lang$core$Dict$set$(134, { capital: 'Panama City', name: 'Panama', officialName: 'Republic of Panama', population: 4551644 }, $gren_lang$core$Dict$set$(133, { capital: 'Ramallah (de facto), East Jerusalem (claimed)', name: 'Palestine', officialName: 'State of Palestine', population: 5551776 }, $gren_lang$core$Dict$set$(132, { capital: 'Ngerulmud', name: 'Palau', officialName: 'Republic of Palau', population: 16934 }, $gren_lang$core$Dict$set$(131, { capital: 'Islamabad', name: 'Pakistan', officialName: 'Islamic Republic of Pakistan', population: 245209889 }, $gren_lang$core$Dict$set$(130, { capital: 'Muscat', name: 'Oman', officialName: 'Sultanate of Oman', population: 4738394 }, $gren_lang$core$Dict$set$(129, { capital: 'Oslo', name: 'Norway', officialName: 'Kingdom of Norway', population: 5557430 }, $gren_lang$core$Dict$set$(128, { capital: 'Skopje', name: 'North Macedonia', officialName: 'Republic of North Macedonia', population: 1798755 }, $gren_lang$core$Dict$set$(127, { capital: 'Pyongyang', name: 'North Korea', officialName: 'Democratic People\'s Republic of Korea', population: 26365070 }, $gren_lang$core$Dict$set$(126, { capital: 'Abuja', name: 'Nigeria', officialName: 'Federal Republic of Nigeria', population: 229152217 }, $gren_lang$core$Dict$set$(125, { capital: 'Niamey', name: 'Niger', officialName: 'Republic of Niger', population: 27072930 }, $gren_lang$core$Dict$set$(124, { capital: 'Managua', name: 'Nicaragua', officialName: 'Republic of Nicaragua', population: 6904045 }, $gren_lang$core$Dict$set$(123, { capital: 'Wellington', name: 'New Zealand', officialName: 'New Zealand', population: 5338500 }, $gren_lang$core$Dict$set$(122, { capital: 'Amsterdam', name: 'Netherlands', officialName: 'Kingdom of the Netherlands', population: 18024802 }, $gren_lang$core$Dict$set$(121, { capital: 'Kathmandu', name: 'Nepal', officialName: 'Federal Democratic Republic of Nepal', population: 31240000 }, $gren_lang$core$Dict$set$(120, { capital: 'Yaren District', name: 'Nauru', officialName: 'Republic of Nauru', population: 10954 }, $gren_lang$core$Dict$set$(119, { capital: 'Windhoek', name: 'Namibia', officialName: 'Republic of Namibia', population: 2727111 }, $gren_lang$core$Dict$set$(118, { capital: 'Naypyidaw', name: 'Myanmar', officialName: 'Republic of the Union of Myanmar', population: 54263000 }, $gren_lang$core$Dict$set$(117, { capital: 'Maputo', name: 'Mozambique', officialName: 'Republic of Mozambique', population: 34303366 }, $gren_lang$core$Dict$set$(116, { capital: 'Rabat', name: 'Morocco', officialName: 'Kingdom of Morocco', population: 38257287 }, $gren_lang$core$Dict$set$(115, { capital: 'Podgorica', name: 'Montenegro', officialName: 'Montenegro', population: 614420 }, $gren_lang$core$Dict$set$(114, { capital: 'Ulaanbaatar', name: 'Mongolia', officialName: 'Mongolia', population: 3528099 }, $gren_lang$core$Dict$set$(113, { capital: 'Monaco', name: 'Monaco', officialName: 'Principality of Monaco', population: 36297 }, $gren_lang$core$Dict$set$(112, { capital: 'Chișinău', name: 'Moldova', officialName: 'Republic of Moldova', population: 2467324 }, $gren_lang$core$Dict$set$(111, { capital: 'Palikir', name: 'Micronesia', officialName: 'Federated States of Micronesia', population: 120268 }, $gren_lang$core$Dict$set$(110, { capital: 'Mexico City', name: 'Mexico', officialName: 'United Mexican States', population: 129709884 }, $gren_lang$core$Dict$set$(109, { capital: 'Port Louis', name: 'Mauritius', officialName: 'Republic of Mauritius', population: 1265438 }, $gren_lang$core$Dict$set$(108, { capital: 'Nouakchott', name: 'Mauritania', officialName: 'Islamic Republic of Mauritania', population: 4929330 }, $gren_lang$core$Dict$set$(107, { capital: 'Majuro', name: 'Marshall Islands', officialName: 'Republic of the Marshall Islands', population: 42050 }, $gren_lang$core$Dict$set$(106, { capital: 'Valletta', name: 'Malta', officialName: 'Republic of Malta', population: 542048 }, $gren_lang$core$Dict$set$(105, { capital: 'Bamako', name: 'Mali', officialName: 'Republic of Mali', population: 23293708 }, $gren_lang$core$Dict$set$(104, { capital: 'Malé', name: 'Maldives', officialName: 'Republic of Maldives', population: 521457 }, $gren_lang$core$Dict$set$(103, { capital: 'Kuala Lumpur', name: 'Malaysia', officialName: 'Malaysia', population: 34573220 }, $gren_lang$core$Dict$set$(102, { capital: 'Lilongwe', name: 'Malawi', officialName: 'Republic of Malawi', population: 20931751 }, $gren_lang$core$Dict$set$(101, { capital: 'Antananarivo', name: 'Madagascar', officialName: 'Republic of Madagascar', population: 30389613 }, $gren_lang$core$Dict$set$(100, { capital: 'Luxembourg City', name: 'Luxembourg', officialName: 'Grand Duchy of Luxembourg', population: 671628 }, $gren_lang$core$Dict$set$(99, { capital: 'Vilnius', name: 'Lithuania', officialName: 'Republic of Lithuania', population: 2872294 }, $gren_lang$core$Dict$set$(98, { capital: 'Vaduz', name: 'Liechtenstein', officialName: 'Principality of Liechtenstein', population: 39850 }, $gren_lang$core$Dict$set$(97, { capital: 'Tripoli', name: 'Libya', officialName: 'State of Libya', population: 7302834 }, $gren_lang$core$Dict$set$(96, { capital: 'Monrovia', name: 'Liberia', officialName: 'Republic of Liberia', population: 5355888 }, $gren_lang$core$Dict$set$(95, { capital: 'Maseru', name: 'Lesotho', officialName: 'Kingdom of Lesotho', population: 2203821 }, $gren_lang$core$Dict$set$(94, { capital: 'Beirut', name: 'Lebanon', officialName: 'Lebanese Republic', population: 5210527 }, $gren_lang$core$Dict$set$(93, { capital: 'Riga', name: 'Latvia', officialName: 'Republic of Latvia', population: 1815045 }, $gren_lang$core$Dict$set$(92, { capital: 'Vientiane', name: 'Laos', officialName: 'Lao People\'s Democratic Republic', population: 7737867 }, $gren_lang$core$Dict$set$(91, { capital: 'Bishkek', name: 'Kyrgyzstan', officialName: 'Kyrgyz Republic', population: 7115481 }, $gren_lang$core$Dict$set$(90, { capital: 'Kuwait City', name: 'Kuwait', officialName: 'State of Kuwait', population: 4325755 }, $gren_lang$core$Dict$set$(89, { capital: 'Pristina', name: 'Kosovo', officialName: 'Republic of Kosovo', population: 1787102 }, $gren_lang$core$Dict$set$(88, { capital: 'South Tarawa', name: 'Kiribati', officialName: 'Republic of Kiribati', population: 132026 }, $gren_lang$core$Dict$set$(87, { capital: 'Nairobi', name: 'Kenya', officialName: 'Republic of Kenya', population: 56215241 }, $gren_lang$core$Dict$set$(86, { capital: 'Nur-Sultan (Astana)', name: 'Kazakhstan', officialName: 'Republic of Kazakhstan', population: 19995655 }, $gren_lang$core$Dict$set$(85, { capital: 'Amman', name: 'Jordan', officialName: 'Hashemite Kingdom of Jordan', population: 11333092 }, $gren_lang$core$Dict$set$(84, { capital: 'Tokyo', name: 'Japan', officialName: 'Japan', population: 122505838 }, $gren_lang$core$Dict$set$(83, { capital: 'Kingston', name: 'Jamaica', officialName: 'Jamaica', population: 2728671 }, $gren_lang$core$Dict$set$(82, { capital: 'Rome', name: 'Italy', officialName: 'Italian Republic', population: 58832928 }, $gren_lang$core$Dict$set$(81, { capital: 'Jerusalem', name: 'Israel', officialName: 'State of Israel', population: 9788700 }, $gren_lang$core$Dict$set$(80, { capital: 'Dublin', name: 'Ireland', officialName: 'Ireland', population: 5149176 }, $gren_lang$core$Dict$set$(79, { capital: 'Baghdad', name: 'Iraq', officialName: 'Republic of Iraq', population: 45505932 }, $gren_lang$core$Dict$set$(78, { capital: 'Tehran', name: 'Iran', officialName: 'Islamic Republic of Iran', population: 89857294 }, $gren_lang$core$Dict$set$(77, { capital: 'Jakarta', name: 'Indonesia', officialName: 'Republic of Indonesia', population: 279798090 }, $gren_lang$core$Dict$set$(76, { capital: 'New Delhi', name: 'India', officialName: 'Republic of India', population: 1449923605 }, $gren_lang$core$Dict$set$(75, { capital: 'Reykjavík', name: 'Iceland', officialName: 'Republic of Iceland', population: 387360 }, $gren_lang$core$Dict$set$(74, { capital: 'Budapest', name: 'Hungary', officialName: 'Hungary', population: 9597494 }, $gren_lang$core$Dict$set$(73, { capital: 'Tegucigalpa', name: 'Honduras', officialName: 'Republic of Honduras', population: 10537831 }, $gren_lang$core$Dict$set$(72, { capital: 'Port-au-Prince', name: 'Haiti', officialName: 'Republic of Haiti', population: 11473096 }, $gren_lang$core$Dict$set$(71, { capital: 'Georgetown', name: 'Guyana', officialName: 'Co-operative Republic of Guyana', population: 823796 }, $gren_lang$core$Dict$set$(70, { capital: 'Bissau', name: 'Guinea-Bissau', officialName: 'Republic of Guinea-Bissau', population: 2150826 }, $gren_lang$core$Dict$set$(69, { capital: 'Conakry', name: 'Guinea', officialName: 'Republic of Guinea', population: 14858532 }, $gren_lang$core$Dict$set$(68, { capital: 'Guatemala City', name: 'Guatemala', officialName: 'Republic of Guatemala', population: 18917205 }, $gren_lang$core$Dict$set$(67, { capital: 'St. George\'s', name: 'Grenada', officialName: 'Grenada', population: 127495 }, $gren_lang$core$Dict$set$(66, { capital: 'Athens', name: 'Greece', officialName: 'Hellenic Republic', population: 10316584 }, $gren_lang$core$Dict$set$(65, { capital: 'Accra', name: 'Ghana', officialName: 'Republic of Ghana', population: 34121985 }, $gren_lang$core$Dict$set$(64, { capital: 'Berlin', name: 'Germany', officialName: 'Federal Republic of Germany', population: 84593877 }, $gren_lang$core$Dict$set$(63, { capital: 'Tbilisi', name: 'Georgia', officialName: 'Georgia', population: 3688647 }, $gren_lang$core$Dict$set$(62, { capital: 'Banjul', name: 'Gambia', officialName: 'Republic of The Gambia', population: 2840380 }, $gren_lang$core$Dict$set$(61, { capital: 'Libreville', name: 'Gabon', officialName: 'Gabonese Republic', population: 2410385 }, $gren_lang$core$Dict$set$(60, { capital: 'Paris', name: 'France', officialName: 'French Republic', population: 68423665 }, $gren_lang$core$Dict$set$(59, { capital: 'Helsinki', name: 'Finland', officialName: 'Republic of Finland', population: 5603144 }, $gren_lang$core$Dict$set$(58, { capital: 'Suva', name: 'Fiji', officialName: 'Republic of Fiji', population: 942141 }, $gren_lang$core$Dict$set$(57, { capital: 'Addis Ababa', name: 'Ethiopia', officialName: 'Federal Democratic Republic of Ethiopia', population: 129177000 }, $gren_lang$core$Dict$set$(56, { capital: 'Mbabane (administrative), Lobamba (legislative/royal)', name: 'Eswatini', officialName: 'Kingdom of Eswatini', population: 1215000 }, $gren_lang$core$Dict$set$(55, { capital: 'Tallinn', name: 'Estonia', officialName: 'Republic of Estonia', population: 1331057 }, $gren_lang$core$Dict$set$(54, { capital: 'Asmara', name: 'Eritrea', officialName: 'State of Eritrea', population: 3684032 }, $gren_lang$core$Dict$set$(53, { capital: 'Malabo (de jure), Ciudad de la Paz (de facto)', name: 'Equatorial Guinea', officialName: 'Republic of Equatorial Guinea', population: 1756180 }, $gren_lang$core$Dict$set$(52, { capital: 'San Salvador', name: 'El Salvador', officialName: 'Republic of El Salvador', population: 6426634 }, $gren_lang$core$Dict$set$(51, { capital: 'Cairo', name: 'Egypt', officialName: 'Arab Republic of Egypt', population: 114464713 }, $gren_lang$core$Dict$set$(50, { capital: 'Quito', name: 'Ecuador', officialName: 'Republic of Ecuador', population: 18322831 }, $gren_lang$core$Dict$set$(49, { capital: 'Santo Domingo', name: 'Dominican Republic', officialName: 'Dominican Republic', population: 11545981 }, $gren_lang$core$Dict$set$(48, { capital: 'Roseau', name: 'Dominica', officialName: 'Commonwealth of Dominica', population: 73250 }, $gren_lang$core$Dict$set$(47, { capital: 'Djibouti', name: 'Djibouti', officialName: 'Republic of Djibouti', population: 1147979 }, $gren_lang$core$Dict$set$(46, { capital: 'Copenhagen', name: 'Denmark', officialName: 'Kingdom of Denmark', population: 5977250 }, $gren_lang$core$Dict$set$(45, { capital: 'Prague', name: 'Czechia', officialName: 'Czech Republic', population: 10495295 }, $gren_lang$core$Dict$set$(44, { capital: 'Nicosia', name: 'Cyprus', officialName: 'Republic of Cyprus', population: 933200 }, $gren_lang$core$Dict$set$(43, { capital: 'Havana', name: 'Cuba', officialName: 'Republic of Cuba', population: 11056036 }, $gren_lang$core$Dict$set$(42, { capital: 'Zagreb', name: 'Croatia', officialName: 'Republic of Croatia', population: 3853527 }, $gren_lang$core$Dict$set$(41, { capital: 'Yamoussoukro (official), Abidjan (de facto)', name: 'Côte d\'Ivoire', officialName: 'Republic of Côte d\'Ivoire', population: 29389150 }, $gren_lang$core$Dict$set$(40, { capital: 'San José', name: 'Costa Rica', officialName: 'Republic of Costa Rica', population: 5204411 }, $gren_lang$core$Dict$set$(39, { capital: 'Brazzaville', name: 'Congo', officialName: 'Republic of the Congo', population: 6222989 }, $gren_lang$core$Dict$set$(38, { capital: 'Kinshasa', name: 'Congo', officialName: 'Democratic Republic of the Congo', population: 102262600 }, $gren_lang$core$Dict$set$(37, { capital: 'Moroni', name: 'Comoros', officialName: 'Union of the Comoros', population: 866976 }, $gren_lang$core$Dict$set$(36, { capital: 'Bogotá', name: 'Colombia', officialName: 'Republic of Colombia', population: 52663400 }, $gren_lang$core$Dict$set$(35, { capital: 'Beijing', name: 'China', officialName: 'People\'s Republic of China', population: 1410710000 }, $gren_lang$core$Dict$set$(34, { capital: 'Santiago', name: 'Chile', officialName: 'Republic of Chile', population: 20009071 }, $gren_lang$core$Dict$set$(33, { capital: 'N\'Djamena', name: 'Chad', officialName: 'Republic of Chad', population: 18861161 }, $gren_lang$core$Dict$set$(32, { capital: 'Bangui', name: 'Central African Republic', officialName: 'Central African Republic', population: 5742195 }, $gren_lang$core$Dict$set$(31, { capital: 'Ottawa', name: 'Canada', officialName: 'Canada', population: 40765300 }, $gren_lang$core$Dict$set$(30, { capital: 'Yaoundé', name: 'Cameroon', officialName: 'Republic of Cameroon', population: 28847159 }, $gren_lang$core$Dict$set$(29, { capital: 'Phnom Penh', name: 'Cambodia', officialName: 'Kingdom of Cambodia', population: 17332000 }, $gren_lang$core$Dict$set$(28, { capital: 'Praia', name: 'Cabo Verde', officialName: 'Republic of Cabo Verde', population: 596732 }, $gren_lang$core$Dict$set$(27, { capital: 'Gitega', name: 'Burundi', officialName: 'Republic of Burundi', population: 13682584 }, $gren_lang$core$Dict$set$(26, { capital: 'Ouagadougou', name: 'Burkina Faso', officialName: 'Burkina Faso', population: 23025777 }, $gren_lang$core$Dict$set$(25, { capital: 'Sofia', name: 'Bulgaria', officialName: 'Republic of Bulgaria', population: 6755287 }, $gren_lang$core$Dict$set$(24, { capital: 'Bandar Seri Begawan', name: 'Brunei', officialName: 'Nation of Brunei, Abode of Peace', population: 455488 }, $gren_lang$core$Dict$set$(23, { capital: 'Brasília', name: 'Brazil', officialName: 'Federative Republic of Brazil', population: 217243107 }, $gren_lang$core$Dict$set$(22, { capital: 'Gaborone', name: 'Botswana', officialName: 'Republic of Botswana', population: 2448195 }, $gren_lang$core$Dict$set$(21, { capital: 'Sarajevo', name: 'Bosnia and Herzegovina', officialName: 'Bosnia and Herzegovina', population: 3065298 }, $gren_lang$core$Dict$set$(20, { capital: 'Sucre (constitutional), La Paz (administrative)', name: 'Bolivia', officialName: 'Plurinational State of Bolivia', population: 12325977 }, $gren_lang$core$Dict$set$(19, { capital: 'Thimphu', name: 'Bhutan', officialName: 'Kingdom of Bhutan', population: 786380 }, $gren_lang$core$Dict$set$(18, { capital: 'Porto-Novo', name: 'Benin', officialName: 'Republic of Benin', population: 13447388 }, $gren_lang$core$Dict$set$(17, { capital: 'Belmopan', name: 'Belize', officialName: 'Belize', population: 453335 }, $gren_lang$core$Dict$set$(16, { capital: 'Brussels', name: 'Belgium', officialName: 'Kingdom of Belgium', population: 11763650 }, $gren_lang$core$Dict$set$(15, { capital: 'Minsk', name: 'Belarus', officialName: 'Republic of Belarus', population: 9257054 }, $gren_lang$core$Dict$set$(14, { capital: 'Bridgetown', name: 'Barbados', officialName: 'Barbados', population: 281200 }, $gren_lang$core$Dict$set$(13, { capital: 'Dhaka', name: 'Bangladesh', officialName: 'People\'s Republic of Bangladesh', population: 173170970 }, $gren_lang$core$Dict$set$(12, { capital: 'Manama', name: 'Bahrain', officialName: 'Kingdom of Bahrain', population: 1564300 }, $gren_lang$core$Dict$set$(11, { capital: 'Nassau', name: 'Bahamas', officialName: 'Commonwealth of The Bahamas', population: 412553 }, $gren_lang$core$Dict$set$(10, { capital: 'Baku', name: 'Azerbaijan', officialName: 'Republic of Azerbaijan', population: 10353296 }, $gren_lang$core$Dict$set$(9, { capital: 'Vienna', name: 'Austria', officialName: 'Republic of Austria', population: 9115064 }, $gren_lang$core$Dict$set$(8, { capital: 'Canberra', name: 'Australia', officialName: 'Commonwealth of Australia', population: 26820000 }, $gren_lang$core$Dict$set$(7, { capital: 'Yerevan', name: 'Armenia', officialName: 'Republic of Armenia', population: 2990332 }, $gren_lang$core$Dict$set$(6, { capital: 'Buenos Aires', name: 'Argentina', officialName: 'Argentine Republic', population: 45892098 }, $gren_lang$core$Dict$set$(5, { capital: 'Saint John\'s', name: 'Antigua and Barbuda', officialName: 'Antigua and Barbuda', population: 100171 }, $gren_lang$core$Dict$set$(4, { capital: 'Luanda', name: 'Angola', officialName: 'Republic of Angola', population: 36023061 }, $gren_lang$core$Dict$set$(3, { capital: 'Andorra la Vella', name: 'Andorra', officialName: 'Principality of Andorra', population: 80088 }, $gren_lang$core$Dict$set$(2, { capital: 'Algiers', name: 'Algeria', officialName: 'People\'s Democratic Republic of Algeria', population: 45606480 }, $gren_lang$core$Dict$set$(1, { capital: 'Tirana', name: 'Albania', officialName: 'Republic of Albania', population: 2745972 }, $gren_lang$core$Dict$set$(0, { capital: 'Kabul', name: 'Afghanistan', officialName: 'Islamic Republic of Afghanistan', population: 40218234 }, $gren_lang$core$Dict$empty))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))));
var $author$project$CountryDatabase$create_substring_map = $gren_lang$core$Dict$set$('zimbabwe', [ 195 ], $gren_lang$core$Dict$set$('zimbabw', [ 195 ], $gren_lang$core$Dict$set$('zimbab', [ 195 ], $gren_lang$core$Dict$set$('zimba', [ 195 ], $gren_lang$core$Dict$set$('zimb', [ 195 ], $gren_lang$core$Dict$set$('zim', [ 195 ], $gren_lang$core$Dict$set$('zi', [ 195 ], $gren_lang$core$Dict$set$('zealand', [ 123 ], $gren_lang$core$Dict$set$('zealan', [ 123 ], $gren_lang$core$Dict$set$('zeala', [ 123 ], $gren_lang$core$Dict$set$('zeal', [ 123 ], $gren_lang$core$Dict$set$('zea', [ 123 ], $gren_lang$core$Dict$set$('ze', [ 123 ], $gren_lang$core$Dict$set$('zambia', [ 194 ], $gren_lang$core$Dict$set$('zambi', [ 194 ], $gren_lang$core$Dict$set$('zamb', [ 194 ], $gren_lang$core$Dict$set$('zam', [ 194 ], $gren_lang$core$Dict$set$('za', [ 194 ], $gren_lang$core$Dict$set$('z', [ 194, 195, 123 ], $gren_lang$core$Dict$set$('yemen', [ 193 ], $gren_lang$core$Dict$set$('yeme', [ 193 ], $gren_lang$core$Dict$set$('yem', [ 193 ], $gren_lang$core$Dict$set$('ye', [ 193 ], $gren_lang$core$Dict$set$('y', [ 193 ], $gren_lang$core$Dict$set$('vincent', [ 147 ], $gren_lang$core$Dict$set$('vincen', [ 147 ], $gren_lang$core$Dict$set$('vince', [ 147 ], $gren_lang$core$Dict$set$('vinc', [ 147 ], $gren_lang$core$Dict$set$('vin', [ 147 ], $gren_lang$core$Dict$set$('vietnam', [ 192 ], $gren_lang$core$Dict$set$('vietna', [ 192 ], $gren_lang$core$Dict$set$('vietn', [ 192 ], $gren_lang$core$Dict$set$('viet', [ 192 ], $gren_lang$core$Dict$set$('vie', [ 192 ], $gren_lang$core$Dict$set$('vi', [ 192, 147 ], $gren_lang$core$Dict$set$('verde', [ 28 ], $gren_lang$core$Dict$set$('verd', [ 28 ], $gren_lang$core$Dict$set$('ver', [ 28 ], $gren_lang$core$Dict$set$('venezuela', [ 191 ], $gren_lang$core$Dict$set$('venezuel', [ 191 ], $gren_lang$core$Dict$set$('venezue', [ 191 ], $gren_lang$core$Dict$set$('venezu', [ 191 ], $gren_lang$core$Dict$set$('venez', [ 191 ], $gren_lang$core$Dict$set$('vene', [ 191 ], $gren_lang$core$Dict$set$('ven', [ 191 ], $gren_lang$core$Dict$set$('ve', [ 191, 28 ], $gren_lang$core$Dict$set$('vatican', [ 190 ], $gren_lang$core$Dict$set$('vatica', [ 190 ], $gren_lang$core$Dict$set$('vatic', [ 190 ], $gren_lang$core$Dict$set$('vati', [ 190 ], $gren_lang$core$Dict$set$('vat', [ 190 ], $gren_lang$core$Dict$set$('vanuatu', [ 189 ], $gren_lang$core$Dict$set$('vanuat', [ 189 ], $gren_lang$core$Dict$set$('vanua', [ 189 ], $gren_lang$core$Dict$set$('vanu', [ 189 ], $gren_lang$core$Dict$set$('van', [ 189 ], $gren_lang$core$Dict$set$('va', [ 189, 190 ], $gren_lang$core$Dict$set$('v', [ 189, 190, 191, 192, 28, 147 ], $gren_lang$core$Dict$set$('uzbekistan', [ 188 ], $gren_lang$core$Dict$set$('uzbekista', [ 188 ], $gren_lang$core$Dict$set$('uzbekist', [ 188 ], $gren_lang$core$Dict$set$('uzbekis', [ 188 ], $gren_lang$core$Dict$set$('uzbeki', [ 188 ], $gren_lang$core$Dict$set$('uzbek', [ 188 ], $gren_lang$core$Dict$set$('uzbe', [ 188 ], $gren_lang$core$Dict$set$('uzb', [ 188 ], $gren_lang$core$Dict$set$('uz', [ 188 ], $gren_lang$core$Dict$set$('uruguay', [ 187 ], $gren_lang$core$Dict$set$('urugua', [ 187 ], $gren_lang$core$Dict$set$('urugu', [ 187 ], $gren_lang$core$Dict$set$('urug', [ 187 ], $gren_lang$core$Dict$set$('uru', [ 187 ], $gren_lang$core$Dict$set$('ur', [ 187 ], $gren_lang$core$Dict$set$('united', [ 184, 185, 186 ], $gren_lang$core$Dict$set$('unite', [ 184, 185, 186 ], $gren_lang$core$Dict$set$('unit', [ 184, 185, 186 ], $gren_lang$core$Dict$set$('uni', [ 184, 185, 186 ], $gren_lang$core$Dict$set$('un', [ 184, 185, 186 ], $gren_lang$core$Dict$set$('ukraine', [ 183 ], $gren_lang$core$Dict$set$('ukrain', [ 183 ], $gren_lang$core$Dict$set$('ukrai', [ 183 ], $gren_lang$core$Dict$set$('ukra', [ 183 ], $gren_lang$core$Dict$set$('ukr', [ 183 ], $gren_lang$core$Dict$set$('uk', [ 183 ], $gren_lang$core$Dict$set$('uganda', [ 182 ], $gren_lang$core$Dict$set$('ugand', [ 182 ], $gren_lang$core$Dict$set$('ugan', [ 182 ], $gren_lang$core$Dict$set$('uga', [ 182 ], $gren_lang$core$Dict$set$('ug', [ 182 ], $gren_lang$core$Dict$set$('u', [ 182, 183, 184, 185, 186, 187, 188 ], $gren_lang$core$Dict$set$('tuvalu', [ 181 ], $gren_lang$core$Dict$set$('tuval', [ 181 ], $gren_lang$core$Dict$set$('tuva', [ 181 ], $gren_lang$core$Dict$set$('tuv', [ 181 ], $gren_lang$core$Dict$set$('turkmenistan', [ 180 ], $gren_lang$core$Dict$set$('turkmenista', [ 180 ], $gren_lang$core$Dict$set$('turkmenist', [ 180 ], $gren_lang$core$Dict$set$('turkmenis', [ 180 ], $gren_lang$core$Dict$set$('turkmeni', [ 180 ], $gren_lang$core$Dict$set$('turkmen', [ 180 ], $gren_lang$core$Dict$set$('turkme', [ 180 ], $gren_lang$core$Dict$set$('turkm', [ 180 ], $gren_lang$core$Dict$set$('turkey', [ 179 ], $gren_lang$core$Dict$set$('turke', [ 179 ], $gren_lang$core$Dict$set$('turk', [ 179, 180 ], $gren_lang$core$Dict$set$('tur', [ 179, 180 ], $gren_lang$core$Dict$set$('tunisia', [ 178 ], $gren_lang$core$Dict$set$('tunisi', [ 178 ], $gren_lang$core$Dict$set$('tunis', [ 178 ], $gren_lang$core$Dict$set$('tuni', [ 178 ], $gren_lang$core$Dict$set$('tun', [ 178 ], $gren_lang$core$Dict$set$('tu', [ 178, 179, 180, 181 ], $gren_lang$core$Dict$set$('trinidad', [ 177 ], $gren_lang$core$Dict$set$('trinida', [ 177 ], $gren_lang$core$Dict$set$('trinid', [ 177 ], $gren_lang$core$Dict$set$('trini', [ 177 ], $gren_lang$core$Dict$set$('trin', [ 177 ], $gren_lang$core$Dict$set$('tri', [ 177 ], $gren_lang$core$Dict$set$('tr', [ 177 ], $gren_lang$core$Dict$set$('tonga', [ 176 ], $gren_lang$core$Dict$set$('tong', [ 176 ], $gren_lang$core$Dict$set$('ton', [ 176 ], $gren_lang$core$Dict$set$('tome', [ 150 ], $gren_lang$core$Dict$set$('tom', [ 150 ], $gren_lang$core$Dict$set$('togo', [ 175 ], $gren_lang$core$Dict$set$('tog', [ 175 ], $gren_lang$core$Dict$set$('tobago', [ 177 ], $gren_lang$core$Dict$set$('tobag', [ 177 ], $gren_lang$core$Dict$set$('toba', [ 177 ], $gren_lang$core$Dict$set$('tob', [ 177 ], $gren_lang$core$Dict$set$('to', [ 175, 176, 150, 177 ], $gren_lang$core$Dict$set$('timor-leste', [ 174 ], $gren_lang$core$Dict$set$('timor-lest', [ 174 ], $gren_lang$core$Dict$set$('timor-les', [ 174 ], $gren_lang$core$Dict$set$('timor-le', [ 174 ], $gren_lang$core$Dict$set$('timor-l', [ 174 ], $gren_lang$core$Dict$set$('timor-', [ 174 ], $gren_lang$core$Dict$set$('timor', [ 174 ], $gren_lang$core$Dict$set$('timo', [ 174 ], $gren_lang$core$Dict$set$('tim', [ 174 ], $gren_lang$core$Dict$set$('ti', [ 174 ], $gren_lang$core$Dict$set$('the', [ 147 ], $gren_lang$core$Dict$set$('thailand', [ 173 ], $gren_lang$core$Dict$set$('thailan', [ 173 ], $gren_lang$core$Dict$set$('thaila', [ 173 ], $gren_lang$core$Dict$set$('thail', [ 173 ], $gren_lang$core$Dict$set$('thai', [ 173 ], $gren_lang$core$Dict$set$('tha', [ 173 ], $gren_lang$core$Dict$set$('th', [ 173, 147 ], $gren_lang$core$Dict$set$('tanzania', [ 172 ], $gren_lang$core$Dict$set$('tanzani', [ 172 ], $gren_lang$core$Dict$set$('tanzan', [ 172 ], $gren_lang$core$Dict$set$('tanza', [ 172 ], $gren_lang$core$Dict$set$('tanz', [ 172 ], $gren_lang$core$Dict$set$('tan', [ 172 ], $gren_lang$core$Dict$set$('tajikistan', [ 171 ], $gren_lang$core$Dict$set$('tajikista', [ 171 ], $gren_lang$core$Dict$set$('tajikist', [ 171 ], $gren_lang$core$Dict$set$('tajikis', [ 171 ], $gren_lang$core$Dict$set$('tajiki', [ 171 ], $gren_lang$core$Dict$set$('tajik', [ 171 ], $gren_lang$core$Dict$set$('taji', [ 171 ], $gren_lang$core$Dict$set$('taj', [ 171 ], $gren_lang$core$Dict$set$('ta', [ 171, 172 ], $gren_lang$core$Dict$set$('t', [ 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 150, 177, 147 ], $gren_lang$core$Dict$set$('syria', [ 170 ], $gren_lang$core$Dict$set$('syri', [ 170 ], $gren_lang$core$Dict$set$('syr', [ 170 ], $gren_lang$core$Dict$set$('sy', [ 170 ], $gren_lang$core$Dict$set$('switzerland', [ 169 ], $gren_lang$core$Dict$set$('switzerlan', [ 169 ], $gren_lang$core$Dict$set$('switzerla', [ 169 ], $gren_lang$core$Dict$set$('switzerl', [ 169 ], $gren_lang$core$Dict$set$('switzer', [ 169 ], $gren_lang$core$Dict$set$('switze', [ 169 ], $gren_lang$core$Dict$set$('switz', [ 169 ], $gren_lang$core$Dict$set$('swit', [ 169 ], $gren_lang$core$Dict$set$('swi', [ 169 ], $gren_lang$core$Dict$set$('sweden', [ 168 ], $gren_lang$core$Dict$set$('swede', [ 168 ], $gren_lang$core$Dict$set$('swed', [ 168 ], $gren_lang$core$Dict$set$('swe', [ 168 ], $gren_lang$core$Dict$set$('sw', [ 168, 169 ], $gren_lang$core$Dict$set$('suriname', [ 167 ], $gren_lang$core$Dict$set$('surinam', [ 167 ], $gren_lang$core$Dict$set$('surina', [ 167 ], $gren_lang$core$Dict$set$('surin', [ 167 ], $gren_lang$core$Dict$set$('suri', [ 167 ], $gren_lang$core$Dict$set$('sur', [ 167 ], $gren_lang$core$Dict$set$('sudan', [ 166, 163 ], $gren_lang$core$Dict$set$('suda', [ 166, 163 ], $gren_lang$core$Dict$set$('sud', [ 166, 163 ], $gren_lang$core$Dict$set$('su', [ 166, 167, 163 ], $gren_lang$core$Dict$set$('states', [ 186 ], $gren_lang$core$Dict$set$('state', [ 186 ], $gren_lang$core$Dict$set$('stat', [ 186 ], $gren_lang$core$Dict$set$('sta', [ 186 ], $gren_lang$core$Dict$set$('st', [ 186 ], $gren_lang$core$Dict$set$('sri', [ 165 ], $gren_lang$core$Dict$set$('sr', [ 165 ], $gren_lang$core$Dict$set$('spain', [ 164 ], $gren_lang$core$Dict$set$('spai', [ 164 ], $gren_lang$core$Dict$set$('spa', [ 164 ], $gren_lang$core$Dict$set$('sp', [ 164 ], $gren_lang$core$Dict$set$('south', [ 161, 162, 163 ], $gren_lang$core$Dict$set$('sout', [ 161, 162, 163 ], $gren_lang$core$Dict$set$('sou', [ 161, 162, 163 ], $gren_lang$core$Dict$set$('somalia', [ 160 ], $gren_lang$core$Dict$set$('somali', [ 160 ], $gren_lang$core$Dict$set$('somal', [ 160 ], $gren_lang$core$Dict$set$('soma', [ 160 ], $gren_lang$core$Dict$set$('som', [ 160 ], $gren_lang$core$Dict$set$('solomon', [ 159 ], $gren_lang$core$Dict$set$('solomo', [ 159 ], $gren_lang$core$Dict$set$('solom', [ 159 ], $gren_lang$core$Dict$set$('solo', [ 159 ], $gren_lang$core$Dict$set$('sol', [ 159 ], $gren_lang$core$Dict$set$('so', [ 159, 160, 161, 162, 163 ], $gren_lang$core$Dict$set$('slovenia', [ 158 ], $gren_lang$core$Dict$set$('sloveni', [ 158 ], $gren_lang$core$Dict$set$('sloven', [ 158 ], $gren_lang$core$Dict$set$('slove', [ 158 ], $gren_lang$core$Dict$set$('slovakia', [ 157 ], $gren_lang$core$Dict$set$('slovaki', [ 157 ], $gren_lang$core$Dict$set$('slovak', [ 157 ], $gren_lang$core$Dict$set$('slova', [ 157 ], $gren_lang$core$Dict$set$('slov', [ 157, 158 ], $gren_lang$core$Dict$set$('slo', [ 157, 158 ], $gren_lang$core$Dict$set$('sl', [ 157, 158 ], $gren_lang$core$Dict$set$('singapore', [ 156 ], $gren_lang$core$Dict$set$('singapor', [ 156 ], $gren_lang$core$Dict$set$('singapo', [ 156 ], $gren_lang$core$Dict$set$('singap', [ 156 ], $gren_lang$core$Dict$set$('singa', [ 156 ], $gren_lang$core$Dict$set$('sing', [ 156 ], $gren_lang$core$Dict$set$('sin', [ 156 ], $gren_lang$core$Dict$set$('sierra', [ 155 ], $gren_lang$core$Dict$set$('sierr', [ 155 ], $gren_lang$core$Dict$set$('sier', [ 155 ], $gren_lang$core$Dict$set$('sie', [ 155 ], $gren_lang$core$Dict$set$('si', [ 155, 156 ], $gren_lang$core$Dict$set$('seychelles', [ 154 ], $gren_lang$core$Dict$set$('seychelle', [ 154 ], $gren_lang$core$Dict$set$('seychell', [ 154 ], $gren_lang$core$Dict$set$('seychel', [ 154 ], $gren_lang$core$Dict$set$('seyche', [ 154 ], $gren_lang$core$Dict$set$('seych', [ 154 ], $gren_lang$core$Dict$set$('seyc', [ 154 ], $gren_lang$core$Dict$set$('sey', [ 154 ], $gren_lang$core$Dict$set$('serbia', [ 153 ], $gren_lang$core$Dict$set$('serbi', [ 153 ], $gren_lang$core$Dict$set$('serb', [ 153 ], $gren_lang$core$Dict$set$('ser', [ 153 ], $gren_lang$core$Dict$set$('senegal', [ 152 ], $gren_lang$core$Dict$set$('senega', [ 152 ], $gren_lang$core$Dict$set$('seneg', [ 152 ], $gren_lang$core$Dict$set$('sene', [ 152 ], $gren_lang$core$Dict$set$('sen', [ 152 ], $gren_lang$core$Dict$set$('se', [ 152, 153, 154 ], $gren_lang$core$Dict$set$('saudi', [ 151 ], $gren_lang$core$Dict$set$('saud', [ 151 ], $gren_lang$core$Dict$set$('sau', [ 151 ], $gren_lang$core$Dict$set$('sao', [ 150 ], $gren_lang$core$Dict$set$('san', [ 149 ], $gren_lang$core$Dict$set$('samoa', [ 148 ], $gren_lang$core$Dict$set$('samo', [ 148 ], $gren_lang$core$Dict$set$('sam', [ 148 ], $gren_lang$core$Dict$set$('salvador', [ 52 ], $gren_lang$core$Dict$set$('salvado', [ 52 ], $gren_lang$core$Dict$set$('salvad', [ 52 ], $gren_lang$core$Dict$set$('salva', [ 52 ], $gren_lang$core$Dict$set$('salv', [ 52 ], $gren_lang$core$Dict$set$('sal', [ 52 ], $gren_lang$core$Dict$set$('saint', [ 145, 146, 147 ], $gren_lang$core$Dict$set$('sain', [ 145, 146, 147 ], $gren_lang$core$Dict$set$('sai', [ 145, 146, 147 ], $gren_lang$core$Dict$set$('sa', [ 145, 146, 147, 148, 149, 150, 151, 52 ], $gren_lang$core$Dict$set$('s', [ 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 52, 163, 186 ], $gren_lang$core$Dict$set$('rwanda', [ 144 ], $gren_lang$core$Dict$set$('rwand', [ 144 ], $gren_lang$core$Dict$set$('rwan', [ 144 ], $gren_lang$core$Dict$set$('rwa', [ 144 ], $gren_lang$core$Dict$set$('rw', [ 144 ], $gren_lang$core$Dict$set$('russia', [ 143 ], $gren_lang$core$Dict$set$('russi', [ 143 ], $gren_lang$core$Dict$set$('russ', [ 143 ], $gren_lang$core$Dict$set$('rus', [ 143 ], $gren_lang$core$Dict$set$('ru', [ 143 ], $gren_lang$core$Dict$set$('romania', [ 142 ], $gren_lang$core$Dict$set$('romani', [ 142 ], $gren_lang$core$Dict$set$('roman', [ 142 ], $gren_lang$core$Dict$set$('roma', [ 142 ], $gren_lang$core$Dict$set$('rom', [ 142 ], $gren_lang$core$Dict$set$('ro', [ 142 ], $gren_lang$core$Dict$set$('rica', [ 40 ], $gren_lang$core$Dict$set$('ric', [ 40 ], $gren_lang$core$Dict$set$('ri', [ 40 ], $gren_lang$core$Dict$set$('republic', [ 49, 32 ], $gren_lang$core$Dict$set$('republi', [ 49, 32 ], $gren_lang$core$Dict$set$('republ', [ 49, 32 ], $gren_lang$core$Dict$set$('repub', [ 49, 32 ], $gren_lang$core$Dict$set$('repu', [ 49, 32 ], $gren_lang$core$Dict$set$('rep', [ 49, 32 ], $gren_lang$core$Dict$set$('re', [ 49, 32 ], $gren_lang$core$Dict$set$('r', [ 142, 143, 144, 40, 49, 32 ], $gren_lang$core$Dict$set$('qatar', [ 141 ], $gren_lang$core$Dict$set$('qata', [ 141 ], $gren_lang$core$Dict$set$('qat', [ 141 ], $gren_lang$core$Dict$set$('qa', [ 141 ], $gren_lang$core$Dict$set$('q', [ 141 ], $gren_lang$core$Dict$set$('principe', [ 150 ], $gren_lang$core$Dict$set$('princip', [ 150 ], $gren_lang$core$Dict$set$('princi', [ 150 ], $gren_lang$core$Dict$set$('princ', [ 150 ], $gren_lang$core$Dict$set$('prin', [ 150 ], $gren_lang$core$Dict$set$('pri', [ 150 ], $gren_lang$core$Dict$set$('pr', [ 150 ], $gren_lang$core$Dict$set$('portugal', [ 140 ], $gren_lang$core$Dict$set$('portuga', [ 140 ], $gren_lang$core$Dict$set$('portug', [ 140 ], $gren_lang$core$Dict$set$('portu', [ 140 ], $gren_lang$core$Dict$set$('port', [ 140 ], $gren_lang$core$Dict$set$('por', [ 140 ], $gren_lang$core$Dict$set$('poland', [ 139 ], $gren_lang$core$Dict$set$('polan', [ 139 ], $gren_lang$core$Dict$set$('pola', [ 139 ], $gren_lang$core$Dict$set$('pol', [ 139 ], $gren_lang$core$Dict$set$('po', [ 139, 140 ], $gren_lang$core$Dict$set$('philippines', [ 138 ], $gren_lang$core$Dict$set$('philippine', [ 138 ], $gren_lang$core$Dict$set$('philippin', [ 138 ], $gren_lang$core$Dict$set$('philippi', [ 138 ], $gren_lang$core$Dict$set$('philipp', [ 138 ], $gren_lang$core$Dict$set$('philip', [ 138 ], $gren_lang$core$Dict$set$('phili', [ 138 ], $gren_lang$core$Dict$set$('phil', [ 138 ], $gren_lang$core$Dict$set$('phi', [ 138 ], $gren_lang$core$Dict$set$('ph', [ 138 ], $gren_lang$core$Dict$set$('peru', [ 137 ], $gren_lang$core$Dict$set$('per', [ 137 ], $gren_lang$core$Dict$set$('pe', [ 137 ], $gren_lang$core$Dict$set$('paraguay', [ 136 ], $gren_lang$core$Dict$set$('paragua', [ 136 ], $gren_lang$core$Dict$set$('paragu', [ 136 ], $gren_lang$core$Dict$set$('parag', [ 136 ], $gren_lang$core$Dict$set$('para', [ 136 ], $gren_lang$core$Dict$set$('par', [ 136 ], $gren_lang$core$Dict$set$('papua', [ 135 ], $gren_lang$core$Dict$set$('papu', [ 135 ], $gren_lang$core$Dict$set$('pap', [ 135 ], $gren_lang$core$Dict$set$('panama', [ 134 ], $gren_lang$core$Dict$set$('panam', [ 134 ], $gren_lang$core$Dict$set$('pana', [ 134 ], $gren_lang$core$Dict$set$('pan', [ 134 ], $gren_lang$core$Dict$set$('palestine', [ 133 ], $gren_lang$core$Dict$set$('palestin', [ 133 ], $gren_lang$core$Dict$set$('palesti', [ 133 ], $gren_lang$core$Dict$set$('palest', [ 133 ], $gren_lang$core$Dict$set$('pales', [ 133 ], $gren_lang$core$Dict$set$('pale', [ 133 ], $gren_lang$core$Dict$set$('palau', [ 132 ], $gren_lang$core$Dict$set$('pala', [ 132 ], $gren_lang$core$Dict$set$('pal', [ 132, 133 ], $gren_lang$core$Dict$set$('pakistan', [ 131 ], $gren_lang$core$Dict$set$('pakista', [ 131 ], $gren_lang$core$Dict$set$('pakist', [ 131 ], $gren_lang$core$Dict$set$('pakis', [ 131 ], $gren_lang$core$Dict$set$('paki', [ 131 ], $gren_lang$core$Dict$set$('pak', [ 131 ], $gren_lang$core$Dict$set$('pa', [ 131, 132, 133, 134, 135, 136 ], $gren_lang$core$Dict$set$('p', [ 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 150 ], $gren_lang$core$Dict$set$('oman', [ 130 ], $gren_lang$core$Dict$set$('oma', [ 130 ], $gren_lang$core$Dict$set$('om', [ 130 ], $gren_lang$core$Dict$set$('o', [ 130 ], $gren_lang$core$Dict$set$('norway', [ 129 ], $gren_lang$core$Dict$set$('norwa', [ 129 ], $gren_lang$core$Dict$set$('norw', [ 129 ], $gren_lang$core$Dict$set$('north', [ 127, 128 ], $gren_lang$core$Dict$set$('nort', [ 127, 128 ], $gren_lang$core$Dict$set$('nor', [ 127, 128, 129 ], $gren_lang$core$Dict$set$('no', [ 127, 128, 129 ], $gren_lang$core$Dict$set$('nigeria', [ 126 ], $gren_lang$core$Dict$set$('nigeri', [ 126 ], $gren_lang$core$Dict$set$('niger', [ 125, 126 ], $gren_lang$core$Dict$set$('nige', [ 125, 126 ], $gren_lang$core$Dict$set$('nig', [ 125, 126 ], $gren_lang$core$Dict$set$('nicaragua', [ 124 ], $gren_lang$core$Dict$set$('nicaragu', [ 124 ], $gren_lang$core$Dict$set$('nicarag', [ 124 ], $gren_lang$core$Dict$set$('nicara', [ 124 ], $gren_lang$core$Dict$set$('nicar', [ 124 ], $gren_lang$core$Dict$set$('nica', [ 124 ], $gren_lang$core$Dict$set$('nic', [ 124 ], $gren_lang$core$Dict$set$('ni', [ 124, 125, 126 ], $gren_lang$core$Dict$set$('new', [ 123, 135 ], $gren_lang$core$Dict$set$('nevis', [ 145 ], $gren_lang$core$Dict$set$('nevi', [ 145 ], $gren_lang$core$Dict$set$('nev', [ 145 ], $gren_lang$core$Dict$set$('netherlands', [ 122 ], $gren_lang$core$Dict$set$('netherland', [ 122 ], $gren_lang$core$Dict$set$('netherlan', [ 122 ], $gren_lang$core$Dict$set$('netherla', [ 122 ], $gren_lang$core$Dict$set$('netherl', [ 122 ], $gren_lang$core$Dict$set$('nether', [ 122 ], $gren_lang$core$Dict$set$('nethe', [ 122 ], $gren_lang$core$Dict$set$('neth', [ 122 ], $gren_lang$core$Dict$set$('net', [ 122 ], $gren_lang$core$Dict$set$('nepal', [ 121 ], $gren_lang$core$Dict$set$('nepa', [ 121 ], $gren_lang$core$Dict$set$('nep', [ 121 ], $gren_lang$core$Dict$set$('ne', [ 121, 122, 123, 135, 145 ], $gren_lang$core$Dict$set$('nauru', [ 120 ], $gren_lang$core$Dict$set$('naur', [ 120 ], $gren_lang$core$Dict$set$('nau', [ 120 ], $gren_lang$core$Dict$set$('namibia', [ 119 ], $gren_lang$core$Dict$set$('namibi', [ 119 ], $gren_lang$core$Dict$set$('namib', [ 119 ], $gren_lang$core$Dict$set$('nami', [ 119 ], $gren_lang$core$Dict$set$('nam', [ 119 ], $gren_lang$core$Dict$set$('na', [ 119, 120 ], $gren_lang$core$Dict$set$('n', [ 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 135, 145 ], $gren_lang$core$Dict$set$('myanmar', [ 118 ], $gren_lang$core$Dict$set$('myanma', [ 118 ], $gren_lang$core$Dict$set$('myanm', [ 118 ], $gren_lang$core$Dict$set$('myan', [ 118 ], $gren_lang$core$Dict$set$('mya', [ 118 ], $gren_lang$core$Dict$set$('my', [ 118 ], $gren_lang$core$Dict$set$('mozambique', [ 117 ], $gren_lang$core$Dict$set$('mozambiqu', [ 117 ], $gren_lang$core$Dict$set$('mozambiq', [ 117 ], $gren_lang$core$Dict$set$('mozambi', [ 117 ], $gren_lang$core$Dict$set$('mozamb', [ 117 ], $gren_lang$core$Dict$set$('mozam', [ 117 ], $gren_lang$core$Dict$set$('moza', [ 117 ], $gren_lang$core$Dict$set$('moz', [ 117 ], $gren_lang$core$Dict$set$('morocco', [ 116 ], $gren_lang$core$Dict$set$('morocc', [ 116 ], $gren_lang$core$Dict$set$('moroc', [ 116 ], $gren_lang$core$Dict$set$('moro', [ 116 ], $gren_lang$core$Dict$set$('mor', [ 116 ], $gren_lang$core$Dict$set$('montenegro', [ 115 ], $gren_lang$core$Dict$set$('montenegr', [ 115 ], $gren_lang$core$Dict$set$('monteneg', [ 115 ], $gren_lang$core$Dict$set$('montene', [ 115 ], $gren_lang$core$Dict$set$('monten', [ 115 ], $gren_lang$core$Dict$set$('monte', [ 115 ], $gren_lang$core$Dict$set$('mont', [ 115 ], $gren_lang$core$Dict$set$('mongolia', [ 114 ], $gren_lang$core$Dict$set$('mongoli', [ 114 ], $gren_lang$core$Dict$set$('mongol', [ 114 ], $gren_lang$core$Dict$set$('mongo', [ 114 ], $gren_lang$core$Dict$set$('mong', [ 114 ], $gren_lang$core$Dict$set$('monaco', [ 113 ], $gren_lang$core$Dict$set$('monac', [ 113 ], $gren_lang$core$Dict$set$('mona', [ 113 ], $gren_lang$core$Dict$set$('mon', [ 113, 114, 115 ], $gren_lang$core$Dict$set$('moldova', [ 112 ], $gren_lang$core$Dict$set$('moldov', [ 112 ], $gren_lang$core$Dict$set$('moldo', [ 112 ], $gren_lang$core$Dict$set$('mold', [ 112 ], $gren_lang$core$Dict$set$('mol', [ 112 ], $gren_lang$core$Dict$set$('mo', [ 112, 113, 114, 115, 116, 117 ], $gren_lang$core$Dict$set$('micronesia', [ 111 ], $gren_lang$core$Dict$set$('micronesi', [ 111 ], $gren_lang$core$Dict$set$('micrones', [ 111 ], $gren_lang$core$Dict$set$('microne', [ 111 ], $gren_lang$core$Dict$set$('micron', [ 111 ], $gren_lang$core$Dict$set$('micro', [ 111 ], $gren_lang$core$Dict$set$('micr', [ 111 ], $gren_lang$core$Dict$set$('mic', [ 111 ], $gren_lang$core$Dict$set$('mi', [ 111 ], $gren_lang$core$Dict$set$('mexico', [ 110 ], $gren_lang$core$Dict$set$('mexic', [ 110 ], $gren_lang$core$Dict$set$('mexi', [ 110 ], $gren_lang$core$Dict$set$('mex', [ 110 ], $gren_lang$core$Dict$set$('me', [ 110 ], $gren_lang$core$Dict$set$('mauritius', [ 109 ], $gren_lang$core$Dict$set$('mauritiu', [ 109 ], $gren_lang$core$Dict$set$('mauriti', [ 109 ], $gren_lang$core$Dict$set$('mauritania', [ 108 ], $gren_lang$core$Dict$set$('mauritani', [ 108 ], $gren_lang$core$Dict$set$('mauritan', [ 108 ], $gren_lang$core$Dict$set$('maurita', [ 108 ], $gren_lang$core$Dict$set$('maurit', [ 108, 109 ], $gren_lang$core$Dict$set$('mauri', [ 108, 109 ], $gren_lang$core$Dict$set$('maur', [ 108, 109 ], $gren_lang$core$Dict$set$('mau', [ 108, 109 ], $gren_lang$core$Dict$set$('marshall', [ 107 ], $gren_lang$core$Dict$set$('marshal', [ 107 ], $gren_lang$core$Dict$set$('marsha', [ 107 ], $gren_lang$core$Dict$set$('marsh', [ 107 ], $gren_lang$core$Dict$set$('mars', [ 107 ], $gren_lang$core$Dict$set$('marino', [ 149 ], $gren_lang$core$Dict$set$('marin', [ 149 ], $gren_lang$core$Dict$set$('mari', [ 149 ], $gren_lang$core$Dict$set$('mar', [ 107, 149 ], $gren_lang$core$Dict$set$('malta', [ 106 ], $gren_lang$core$Dict$set$('malt', [ 106 ], $gren_lang$core$Dict$set$('mali', [ 105 ], $gren_lang$core$Dict$set$('maldives', [ 104 ], $gren_lang$core$Dict$set$('maldive', [ 104 ], $gren_lang$core$Dict$set$('maldiv', [ 104 ], $gren_lang$core$Dict$set$('maldi', [ 104 ], $gren_lang$core$Dict$set$('mald', [ 104 ], $gren_lang$core$Dict$set$('malaysia', [ 103 ], $gren_lang$core$Dict$set$('malaysi', [ 103 ], $gren_lang$core$Dict$set$('malays', [ 103 ], $gren_lang$core$Dict$set$('malay', [ 103 ], $gren_lang$core$Dict$set$('malawi', [ 102 ], $gren_lang$core$Dict$set$('malaw', [ 102 ], $gren_lang$core$Dict$set$('mala', [ 102, 103 ], $gren_lang$core$Dict$set$('mal', [ 102, 103, 104, 105, 106 ], $gren_lang$core$Dict$set$('madagascar', [ 101 ], $gren_lang$core$Dict$set$('madagasca', [ 101 ], $gren_lang$core$Dict$set$('madagasc', [ 101 ], $gren_lang$core$Dict$set$('madagas', [ 101 ], $gren_lang$core$Dict$set$('madaga', [ 101 ], $gren_lang$core$Dict$set$('madag', [ 101 ], $gren_lang$core$Dict$set$('mada', [ 101 ], $gren_lang$core$Dict$set$('mad', [ 101 ], $gren_lang$core$Dict$set$('macedonia', [ 128 ], $gren_lang$core$Dict$set$('macedoni', [ 128 ], $gren_lang$core$Dict$set$('macedon', [ 128 ], $gren_lang$core$Dict$set$('macedo', [ 128 ], $gren_lang$core$Dict$set$('maced', [ 128 ], $gren_lang$core$Dict$set$('mace', [ 128 ], $gren_lang$core$Dict$set$('mac', [ 128 ], $gren_lang$core$Dict$set$('ma', [ 101, 102, 103, 104, 105, 106, 107, 108, 109, 128, 149 ], $gren_lang$core$Dict$set$('m', [ 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 128, 149 ], $gren_lang$core$Dict$set$('luxembourg', [ 100 ], $gren_lang$core$Dict$set$('luxembour', [ 100 ], $gren_lang$core$Dict$set$('luxembou', [ 100 ], $gren_lang$core$Dict$set$('luxembo', [ 100 ], $gren_lang$core$Dict$set$('luxemb', [ 100 ], $gren_lang$core$Dict$set$('luxem', [ 100 ], $gren_lang$core$Dict$set$('luxe', [ 100 ], $gren_lang$core$Dict$set$('lux', [ 100 ], $gren_lang$core$Dict$set$('lucia', [ 146 ], $gren_lang$core$Dict$set$('luci', [ 146 ], $gren_lang$core$Dict$set$('luc', [ 146 ], $gren_lang$core$Dict$set$('lu', [ 100, 146 ], $gren_lang$core$Dict$set$('lithuania', [ 99 ], $gren_lang$core$Dict$set$('lithuani', [ 99 ], $gren_lang$core$Dict$set$('lithuan', [ 99 ], $gren_lang$core$Dict$set$('lithua', [ 99 ], $gren_lang$core$Dict$set$('lithu', [ 99 ], $gren_lang$core$Dict$set$('lith', [ 99 ], $gren_lang$core$Dict$set$('lit', [ 99 ], $gren_lang$core$Dict$set$('liechtenstein', [ 98 ], $gren_lang$core$Dict$set$('liechtenstei', [ 98 ], $gren_lang$core$Dict$set$('liechtenste', [ 98 ], $gren_lang$core$Dict$set$('liechtenst', [ 98 ], $gren_lang$core$Dict$set$('liechtens', [ 98 ], $gren_lang$core$Dict$set$('liechten', [ 98 ], $gren_lang$core$Dict$set$('liechte', [ 98 ], $gren_lang$core$Dict$set$('liecht', [ 98 ], $gren_lang$core$Dict$set$('liech', [ 98 ], $gren_lang$core$Dict$set$('liec', [ 98 ], $gren_lang$core$Dict$set$('lie', [ 98 ], $gren_lang$core$Dict$set$('libya', [ 97 ], $gren_lang$core$Dict$set$('liby', [ 97 ], $gren_lang$core$Dict$set$('liberia', [ 96 ], $gren_lang$core$Dict$set$('liberi', [ 96 ], $gren_lang$core$Dict$set$('liber', [ 96 ], $gren_lang$core$Dict$set$('libe', [ 96 ], $gren_lang$core$Dict$set$('lib', [ 96, 97 ], $gren_lang$core$Dict$set$('li', [ 96, 97, 98, 99 ], $gren_lang$core$Dict$set$('lesotho', [ 95 ], $gren_lang$core$Dict$set$('lesoth', [ 95 ], $gren_lang$core$Dict$set$('lesot', [ 95 ], $gren_lang$core$Dict$set$('leso', [ 95 ], $gren_lang$core$Dict$set$('les', [ 95 ], $gren_lang$core$Dict$set$('leone', [ 155 ], $gren_lang$core$Dict$set$('leon', [ 155 ], $gren_lang$core$Dict$set$('leo', [ 155 ], $gren_lang$core$Dict$set$('lebanon', [ 94 ], $gren_lang$core$Dict$set$('lebano', [ 94 ], $gren_lang$core$Dict$set$('leban', [ 94 ], $gren_lang$core$Dict$set$('leba', [ 94 ], $gren_lang$core$Dict$set$('leb', [ 94 ], $gren_lang$core$Dict$set$('le', [ 94, 95, 155 ], $gren_lang$core$Dict$set$('latvia', [ 93 ], $gren_lang$core$Dict$set$('latvi', [ 93 ], $gren_lang$core$Dict$set$('latv', [ 93 ], $gren_lang$core$Dict$set$('lat', [ 93 ], $gren_lang$core$Dict$set$('laos', [ 92 ], $gren_lang$core$Dict$set$('lao', [ 92 ], $gren_lang$core$Dict$set$('lanka', [ 165 ], $gren_lang$core$Dict$set$('lank', [ 165 ], $gren_lang$core$Dict$set$('lan', [ 165 ], $gren_lang$core$Dict$set$('la', [ 92, 93, 165 ], $gren_lang$core$Dict$set$('l', [ 92, 93, 94, 95, 96, 97, 98, 99, 100, 146, 155, 165 ], $gren_lang$core$Dict$set$('kyrgyzstan', [ 91 ], $gren_lang$core$Dict$set$('kyrgyzsta', [ 91 ], $gren_lang$core$Dict$set$('kyrgyzst', [ 91 ], $gren_lang$core$Dict$set$('kyrgyzs', [ 91 ], $gren_lang$core$Dict$set$('kyrgyz', [ 91 ], $gren_lang$core$Dict$set$('kyrgy', [ 91 ], $gren_lang$core$Dict$set$('kyrg', [ 91 ], $gren_lang$core$Dict$set$('kyr', [ 91 ], $gren_lang$core$Dict$set$('ky', [ 91 ], $gren_lang$core$Dict$set$('kuwait', [ 90 ], $gren_lang$core$Dict$set$('kuwai', [ 90 ], $gren_lang$core$Dict$set$('kuwa', [ 90 ], $gren_lang$core$Dict$set$('kuw', [ 90 ], $gren_lang$core$Dict$set$('ku', [ 90 ], $gren_lang$core$Dict$set$('kosovo', [ 89 ], $gren_lang$core$Dict$set$('kosov', [ 89 ], $gren_lang$core$Dict$set$('koso', [ 89 ], $gren_lang$core$Dict$set$('kos', [ 89 ], $gren_lang$core$Dict$set$('korea', [ 127, 162 ], $gren_lang$core$Dict$set$('kore', [ 127, 162 ], $gren_lang$core$Dict$set$('kor', [ 127, 162 ], $gren_lang$core$Dict$set$('ko', [ 89, 127, 162 ], $gren_lang$core$Dict$set$('kitts', [ 145 ], $gren_lang$core$Dict$set$('kitt', [ 145 ], $gren_lang$core$Dict$set$('kit', [ 145 ], $gren_lang$core$Dict$set$('kiribati', [ 88 ], $gren_lang$core$Dict$set$('kiribat', [ 88 ], $gren_lang$core$Dict$set$('kiriba', [ 88 ], $gren_lang$core$Dict$set$('kirib', [ 88 ], $gren_lang$core$Dict$set$('kiri', [ 88 ], $gren_lang$core$Dict$set$('kir', [ 88 ], $gren_lang$core$Dict$set$('kingdom', [ 185 ], $gren_lang$core$Dict$set$('kingdo', [ 185 ], $gren_lang$core$Dict$set$('kingd', [ 185 ], $gren_lang$core$Dict$set$('king', [ 185 ], $gren_lang$core$Dict$set$('kin', [ 185 ], $gren_lang$core$Dict$set$('ki', [ 88, 145, 185 ], $gren_lang$core$Dict$set$('kenya', [ 87 ], $gren_lang$core$Dict$set$('keny', [ 87 ], $gren_lang$core$Dict$set$('ken', [ 87 ], $gren_lang$core$Dict$set$('ke', [ 87 ], $gren_lang$core$Dict$set$('kazakhstan', [ 86 ], $gren_lang$core$Dict$set$('kazakhsta', [ 86 ], $gren_lang$core$Dict$set$('kazakhst', [ 86 ], $gren_lang$core$Dict$set$('kazakhs', [ 86 ], $gren_lang$core$Dict$set$('kazakh', [ 86 ], $gren_lang$core$Dict$set$('kazak', [ 86 ], $gren_lang$core$Dict$set$('kaza', [ 86 ], $gren_lang$core$Dict$set$('kaz', [ 86 ], $gren_lang$core$Dict$set$('ka', [ 86 ], $gren_lang$core$Dict$set$('k', [ 86, 87, 88, 89, 90, 91, 127, 145, 162, 185 ], $gren_lang$core$Dict$set$('jordan', [ 85 ], $gren_lang$core$Dict$set$('jorda', [ 85 ], $gren_lang$core$Dict$set$('jord', [ 85 ], $gren_lang$core$Dict$set$('jor', [ 85 ], $gren_lang$core$Dict$set$('jo', [ 85 ], $gren_lang$core$Dict$set$('japan', [ 84 ], $gren_lang$core$Dict$set$('japa', [ 84 ], $gren_lang$core$Dict$set$('jap', [ 84 ], $gren_lang$core$Dict$set$('jamaica', [ 83 ], $gren_lang$core$Dict$set$('jamaic', [ 83 ], $gren_lang$core$Dict$set$('jamai', [ 83 ], $gren_lang$core$Dict$set$('jama', [ 83 ], $gren_lang$core$Dict$set$('jam', [ 83 ], $gren_lang$core$Dict$set$('ja', [ 83, 84 ], $gren_lang$core$Dict$set$('j', [ 83, 84, 85 ], $gren_lang$core$Dict$set$('italy', [ 82 ], $gren_lang$core$Dict$set$('ital', [ 82 ], $gren_lang$core$Dict$set$('ita', [ 82 ], $gren_lang$core$Dict$set$('it', [ 82 ], $gren_lang$core$Dict$set$('israel', [ 81 ], $gren_lang$core$Dict$set$('israe', [ 81 ], $gren_lang$core$Dict$set$('isra', [ 81 ], $gren_lang$core$Dict$set$('isr', [ 81 ], $gren_lang$core$Dict$set$('islands', [ 107, 159 ], $gren_lang$core$Dict$set$('island', [ 107, 159 ], $gren_lang$core$Dict$set$('islan', [ 107, 159 ], $gren_lang$core$Dict$set$('isla', [ 107, 159 ], $gren_lang$core$Dict$set$('isl', [ 107, 159 ], $gren_lang$core$Dict$set$('is', [ 81, 107, 159 ], $gren_lang$core$Dict$set$('ireland', [ 80 ], $gren_lang$core$Dict$set$('irelan', [ 80 ], $gren_lang$core$Dict$set$('irela', [ 80 ], $gren_lang$core$Dict$set$('irel', [ 80 ], $gren_lang$core$Dict$set$('ire', [ 80 ], $gren_lang$core$Dict$set$('iraq', [ 79 ], $gren_lang$core$Dict$set$('iran', [ 78 ], $gren_lang$core$Dict$set$('ira', [ 78, 79 ], $gren_lang$core$Dict$set$('ir', [ 78, 79, 80 ], $gren_lang$core$Dict$set$('indonesia', [ 77 ], $gren_lang$core$Dict$set$('indonesi', [ 77 ], $gren_lang$core$Dict$set$('indones', [ 77 ], $gren_lang$core$Dict$set$('indone', [ 77 ], $gren_lang$core$Dict$set$('indon', [ 77 ], $gren_lang$core$Dict$set$('indo', [ 77 ], $gren_lang$core$Dict$set$('india', [ 76 ], $gren_lang$core$Dict$set$('indi', [ 76 ], $gren_lang$core$Dict$set$('ind', [ 76, 77 ], $gren_lang$core$Dict$set$('in', [ 76, 77 ], $gren_lang$core$Dict$set$('iceland', [ 75 ], $gren_lang$core$Dict$set$('icelan', [ 75 ], $gren_lang$core$Dict$set$('icela', [ 75 ], $gren_lang$core$Dict$set$('icel', [ 75 ], $gren_lang$core$Dict$set$('ice', [ 75 ], $gren_lang$core$Dict$set$('ic', [ 75 ], $gren_lang$core$Dict$set$('i', [ 75, 76, 77, 78, 79, 80, 81, 82, 107, 159 ], $gren_lang$core$Dict$set$('hungary', [ 74 ], $gren_lang$core$Dict$set$('hungar', [ 74 ], $gren_lang$core$Dict$set$('hunga', [ 74 ], $gren_lang$core$Dict$set$('hung', [ 74 ], $gren_lang$core$Dict$set$('hun', [ 74 ], $gren_lang$core$Dict$set$('hu', [ 74 ], $gren_lang$core$Dict$set$('honduras', [ 73 ], $gren_lang$core$Dict$set$('hondura', [ 73 ], $gren_lang$core$Dict$set$('hondur', [ 73 ], $gren_lang$core$Dict$set$('hondu', [ 73 ], $gren_lang$core$Dict$set$('hond', [ 73 ], $gren_lang$core$Dict$set$('hon', [ 73 ], $gren_lang$core$Dict$set$('ho', [ 73 ], $gren_lang$core$Dict$set$('herzegovina', [ 21 ], $gren_lang$core$Dict$set$('herzegovin', [ 21 ], $gren_lang$core$Dict$set$('herzegovi', [ 21 ], $gren_lang$core$Dict$set$('herzegov', [ 21 ], $gren_lang$core$Dict$set$('herzego', [ 21 ], $gren_lang$core$Dict$set$('herzeg', [ 21 ], $gren_lang$core$Dict$set$('herze', [ 21 ], $gren_lang$core$Dict$set$('herz', [ 21 ], $gren_lang$core$Dict$set$('her', [ 21 ], $gren_lang$core$Dict$set$('he', [ 21 ], $gren_lang$core$Dict$set$('haiti', [ 72 ], $gren_lang$core$Dict$set$('hait', [ 72 ], $gren_lang$core$Dict$set$('hai', [ 72 ], $gren_lang$core$Dict$set$('ha', [ 72 ], $gren_lang$core$Dict$set$('h', [ 72, 73, 74, 21 ], $gren_lang$core$Dict$set$('guyana', [ 71 ], $gren_lang$core$Dict$set$('guyan', [ 71 ], $gren_lang$core$Dict$set$('guya', [ 71 ], $gren_lang$core$Dict$set$('guy', [ 71 ], $gren_lang$core$Dict$set$('guinea-bissau', [ 70 ], $gren_lang$core$Dict$set$('guinea-bissa', [ 70 ], $gren_lang$core$Dict$set$('guinea-biss', [ 70 ], $gren_lang$core$Dict$set$('guinea-bis', [ 70 ], $gren_lang$core$Dict$set$('guinea-bi', [ 70 ], $gren_lang$core$Dict$set$('guinea-b', [ 70 ], $gren_lang$core$Dict$set$('guinea-', [ 70 ], $gren_lang$core$Dict$set$('guinea', [ 69, 70, 53, 135 ], $gren_lang$core$Dict$set$('guine', [ 69, 70, 53, 135 ], $gren_lang$core$Dict$set$('guin', [ 69, 70, 53, 135 ], $gren_lang$core$Dict$set$('gui', [ 69, 70, 53, 135 ], $gren_lang$core$Dict$set$('guatemala', [ 68 ], $gren_lang$core$Dict$set$('guatemal', [ 68 ], $gren_lang$core$Dict$set$('guatema', [ 68 ], $gren_lang$core$Dict$set$('guatem', [ 68 ], $gren_lang$core$Dict$set$('guate', [ 68 ], $gren_lang$core$Dict$set$('guat', [ 68 ], $gren_lang$core$Dict$set$('gua', [ 68 ], $gren_lang$core$Dict$set$('gu', [ 68, 69, 70, 71, 53, 135 ], $gren_lang$core$Dict$set$('grenadines', [ 147 ], $gren_lang$core$Dict$set$('grenadine', [ 147 ], $gren_lang$core$Dict$set$('grenadin', [ 147 ], $gren_lang$core$Dict$set$('grenadi', [ 147 ], $gren_lang$core$Dict$set$('grenada', [ 67 ], $gren_lang$core$Dict$set$('grenad', [ 67, 147 ], $gren_lang$core$Dict$set$('grena', [ 67, 147 ], $gren_lang$core$Dict$set$('gren', [ 67, 147 ], $gren_lang$core$Dict$set$('greece', [ 66 ], $gren_lang$core$Dict$set$('greec', [ 66 ], $gren_lang$core$Dict$set$('gree', [ 66 ], $gren_lang$core$Dict$set$('gre', [ 66, 67, 147 ], $gren_lang$core$Dict$set$('gr', [ 66, 67, 147 ], $gren_lang$core$Dict$set$('ghana', [ 65 ], $gren_lang$core$Dict$set$('ghan', [ 65 ], $gren_lang$core$Dict$set$('gha', [ 65 ], $gren_lang$core$Dict$set$('gh', [ 65 ], $gren_lang$core$Dict$set$('germany', [ 64 ], $gren_lang$core$Dict$set$('german', [ 64 ], $gren_lang$core$Dict$set$('germa', [ 64 ], $gren_lang$core$Dict$set$('germ', [ 64 ], $gren_lang$core$Dict$set$('ger', [ 64 ], $gren_lang$core$Dict$set$('georgia', [ 63 ], $gren_lang$core$Dict$set$('georgi', [ 63 ], $gren_lang$core$Dict$set$('georg', [ 63 ], $gren_lang$core$Dict$set$('geor', [ 63 ], $gren_lang$core$Dict$set$('geo', [ 63 ], $gren_lang$core$Dict$set$('ge', [ 63, 64 ], $gren_lang$core$Dict$set$('gambia', [ 62 ], $gren_lang$core$Dict$set$('gambi', [ 62 ], $gren_lang$core$Dict$set$('gamb', [ 62 ], $gren_lang$core$Dict$set$('gam', [ 62 ], $gren_lang$core$Dict$set$('gabon', [ 61 ], $gren_lang$core$Dict$set$('gabo', [ 61 ], $gren_lang$core$Dict$set$('gab', [ 61 ], $gren_lang$core$Dict$set$('ga', [ 61, 62 ], $gren_lang$core$Dict$set$('g', [ 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 53, 135, 147 ], $gren_lang$core$Dict$set$('france', [ 60 ], $gren_lang$core$Dict$set$('franc', [ 60 ], $gren_lang$core$Dict$set$('fran', [ 60 ], $gren_lang$core$Dict$set$('fra', [ 60 ], $gren_lang$core$Dict$set$('fr', [ 60 ], $gren_lang$core$Dict$set$('finland', [ 59 ], $gren_lang$core$Dict$set$('finlan', [ 59 ], $gren_lang$core$Dict$set$('finla', [ 59 ], $gren_lang$core$Dict$set$('finl', [ 59 ], $gren_lang$core$Dict$set$('fin', [ 59 ], $gren_lang$core$Dict$set$('fiji', [ 58 ], $gren_lang$core$Dict$set$('fij', [ 58 ], $gren_lang$core$Dict$set$('fi', [ 58, 59 ], $gren_lang$core$Dict$set$('faso', [ 26 ], $gren_lang$core$Dict$set$('fas', [ 26 ], $gren_lang$core$Dict$set$('fa', [ 26 ], $gren_lang$core$Dict$set$('f', [ 58, 59, 60, 26 ], $gren_lang$core$Dict$set$('ethiopia', [ 57 ], $gren_lang$core$Dict$set$('ethiopi', [ 57 ], $gren_lang$core$Dict$set$('ethiop', [ 57 ], $gren_lang$core$Dict$set$('ethio', [ 57 ], $gren_lang$core$Dict$set$('ethi', [ 57 ], $gren_lang$core$Dict$set$('eth', [ 57 ], $gren_lang$core$Dict$set$('et', [ 57 ], $gren_lang$core$Dict$set$('eswatini', [ 56 ], $gren_lang$core$Dict$set$('eswatin', [ 56 ], $gren_lang$core$Dict$set$('eswati', [ 56 ], $gren_lang$core$Dict$set$('eswat', [ 56 ], $gren_lang$core$Dict$set$('eswa', [ 56 ], $gren_lang$core$Dict$set$('esw', [ 56 ], $gren_lang$core$Dict$set$('estonia', [ 55 ], $gren_lang$core$Dict$set$('estoni', [ 55 ], $gren_lang$core$Dict$set$('eston', [ 55 ], $gren_lang$core$Dict$set$('esto', [ 55 ], $gren_lang$core$Dict$set$('est', [ 55 ], $gren_lang$core$Dict$set$('es', [ 55, 56 ], $gren_lang$core$Dict$set$('eritrea', [ 54 ], $gren_lang$core$Dict$set$('eritre', [ 54 ], $gren_lang$core$Dict$set$('eritr', [ 54 ], $gren_lang$core$Dict$set$('erit', [ 54 ], $gren_lang$core$Dict$set$('eri', [ 54 ], $gren_lang$core$Dict$set$('er', [ 54 ], $gren_lang$core$Dict$set$('equatorial', [ 53 ], $gren_lang$core$Dict$set$('equatoria', [ 53 ], $gren_lang$core$Dict$set$('equatori', [ 53 ], $gren_lang$core$Dict$set$('equator', [ 53 ], $gren_lang$core$Dict$set$('equato', [ 53 ], $gren_lang$core$Dict$set$('equat', [ 53 ], $gren_lang$core$Dict$set$('equa', [ 53 ], $gren_lang$core$Dict$set$('equ', [ 53 ], $gren_lang$core$Dict$set$('eq', [ 53 ], $gren_lang$core$Dict$set$('emirates', [ 184 ], $gren_lang$core$Dict$set$('emirate', [ 184 ], $gren_lang$core$Dict$set$('emirat', [ 184 ], $gren_lang$core$Dict$set$('emira', [ 184 ], $gren_lang$core$Dict$set$('emir', [ 184 ], $gren_lang$core$Dict$set$('emi', [ 184 ], $gren_lang$core$Dict$set$('em', [ 184 ], $gren_lang$core$Dict$set$('el', [ 52 ], $gren_lang$core$Dict$set$('egypt', [ 51 ], $gren_lang$core$Dict$set$('egyp', [ 51 ], $gren_lang$core$Dict$set$('egy', [ 51 ], $gren_lang$core$Dict$set$('eg', [ 51 ], $gren_lang$core$Dict$set$('ecuador', [ 50 ], $gren_lang$core$Dict$set$('ecuado', [ 50 ], $gren_lang$core$Dict$set$('ecuad', [ 50 ], $gren_lang$core$Dict$set$('ecua', [ 50 ], $gren_lang$core$Dict$set$('ecu', [ 50 ], $gren_lang$core$Dict$set$('ec', [ 50 ], $gren_lang$core$Dict$set$('e', [ 50, 51, 52, 53, 54, 55, 56, 57, 184 ], $gren_lang$core$Dict$set$('dominican', [ 49 ], $gren_lang$core$Dict$set$('dominica', [ 48, 49 ], $gren_lang$core$Dict$set$('dominic', [ 48, 49 ], $gren_lang$core$Dict$set$('domini', [ 48, 49 ], $gren_lang$core$Dict$set$('domin', [ 48, 49 ], $gren_lang$core$Dict$set$('domi', [ 48, 49 ], $gren_lang$core$Dict$set$('dom', [ 48, 49 ], $gren_lang$core$Dict$set$('do', [ 48, 49 ], $gren_lang$core$Dict$set$('djibouti', [ 47 ], $gren_lang$core$Dict$set$('djibout', [ 47 ], $gren_lang$core$Dict$set$('djibou', [ 47 ], $gren_lang$core$Dict$set$('djibo', [ 47 ], $gren_lang$core$Dict$set$('djib', [ 47 ], $gren_lang$core$Dict$set$('dji', [ 47 ], $gren_lang$core$Dict$set$('dj', [ 47 ], $gren_lang$core$Dict$set$('denmark', [ 46 ], $gren_lang$core$Dict$set$('denmar', [ 46 ], $gren_lang$core$Dict$set$('denma', [ 46 ], $gren_lang$core$Dict$set$('denm', [ 46 ], $gren_lang$core$Dict$set$('den', [ 46 ], $gren_lang$core$Dict$set$('de', [ 46 ], $gren_lang$core$Dict$set$('d\'ivoire', [ 41 ], $gren_lang$core$Dict$set$('d\'ivoir', [ 41 ], $gren_lang$core$Dict$set$('d\'ivoi', [ 41 ], $gren_lang$core$Dict$set$('d\'ivo', [ 41 ], $gren_lang$core$Dict$set$('d\'iv', [ 41 ], $gren_lang$core$Dict$set$('d\'i', [ 41 ], $gren_lang$core$Dict$set$('d\'', [ 41 ], $gren_lang$core$Dict$set$('d', [ 46, 47, 48, 49, 41 ], $gren_lang$core$Dict$set$('czechia', [ 45 ], $gren_lang$core$Dict$set$('czechi', [ 45 ], $gren_lang$core$Dict$set$('czech', [ 45 ], $gren_lang$core$Dict$set$('czec', [ 45 ], $gren_lang$core$Dict$set$('cze', [ 45 ], $gren_lang$core$Dict$set$('cz', [ 45 ], $gren_lang$core$Dict$set$('cyprus', [ 44 ], $gren_lang$core$Dict$set$('cypru', [ 44 ], $gren_lang$core$Dict$set$('cypr', [ 44 ], $gren_lang$core$Dict$set$('cyp', [ 44 ], $gren_lang$core$Dict$set$('cy', [ 44 ], $gren_lang$core$Dict$set$('cuba', [ 43 ], $gren_lang$core$Dict$set$('cub', [ 43 ], $gren_lang$core$Dict$set$('cu', [ 43 ], $gren_lang$core$Dict$set$('croatia', [ 42 ], $gren_lang$core$Dict$set$('croati', [ 42 ], $gren_lang$core$Dict$set$('croat', [ 42 ], $gren_lang$core$Dict$set$('croa', [ 42 ], $gren_lang$core$Dict$set$('cro', [ 42 ], $gren_lang$core$Dict$set$('cr', [ 42 ], $gren_lang$core$Dict$set$('cote', [ 41 ], $gren_lang$core$Dict$set$('cot', [ 41 ], $gren_lang$core$Dict$set$('costa', [ 40 ], $gren_lang$core$Dict$set$('cost', [ 40 ], $gren_lang$core$Dict$set$('cos', [ 40 ], $gren_lang$core$Dict$set$('congo', [ 38, 39 ], $gren_lang$core$Dict$set$('cong', [ 38, 39 ], $gren_lang$core$Dict$set$('con', [ 38, 39 ], $gren_lang$core$Dict$set$('comoros', [ 37 ], $gren_lang$core$Dict$set$('comoro', [ 37 ], $gren_lang$core$Dict$set$('comor', [ 37 ], $gren_lang$core$Dict$set$('como', [ 37 ], $gren_lang$core$Dict$set$('com', [ 37 ], $gren_lang$core$Dict$set$('colombia', [ 36 ], $gren_lang$core$Dict$set$('colombi', [ 36 ], $gren_lang$core$Dict$set$('colomb', [ 36 ], $gren_lang$core$Dict$set$('colom', [ 36 ], $gren_lang$core$Dict$set$('colo', [ 36 ], $gren_lang$core$Dict$set$('col', [ 36 ], $gren_lang$core$Dict$set$('co', [ 36, 37, 38, 39, 40, 41 ], $gren_lang$core$Dict$set$('city', [ 190 ], $gren_lang$core$Dict$set$('cit', [ 190 ], $gren_lang$core$Dict$set$('ci', [ 190 ], $gren_lang$core$Dict$set$('china', [ 35 ], $gren_lang$core$Dict$set$('chin', [ 35 ], $gren_lang$core$Dict$set$('chile', [ 34 ], $gren_lang$core$Dict$set$('chil', [ 34 ], $gren_lang$core$Dict$set$('chi', [ 34, 35 ], $gren_lang$core$Dict$set$('chad', [ 33 ], $gren_lang$core$Dict$set$('cha', [ 33 ], $gren_lang$core$Dict$set$('ch', [ 33, 34, 35 ], $gren_lang$core$Dict$set$('central', [ 32 ], $gren_lang$core$Dict$set$('centra', [ 32 ], $gren_lang$core$Dict$set$('centr', [ 32 ], $gren_lang$core$Dict$set$('cent', [ 32 ], $gren_lang$core$Dict$set$('cen', [ 32 ], $gren_lang$core$Dict$set$('ce', [ 32 ], $gren_lang$core$Dict$set$('canada', [ 31 ], $gren_lang$core$Dict$set$('canad', [ 31 ], $gren_lang$core$Dict$set$('cana', [ 31 ], $gren_lang$core$Dict$set$('can', [ 31 ], $gren_lang$core$Dict$set$('cameroon', [ 30 ], $gren_lang$core$Dict$set$('cameroo', [ 30 ], $gren_lang$core$Dict$set$('camero', [ 30 ], $gren_lang$core$Dict$set$('camer', [ 30 ], $gren_lang$core$Dict$set$('came', [ 30 ], $gren_lang$core$Dict$set$('cambodia', [ 29 ], $gren_lang$core$Dict$set$('cambodi', [ 29 ], $gren_lang$core$Dict$set$('cambod', [ 29 ], $gren_lang$core$Dict$set$('cambo', [ 29 ], $gren_lang$core$Dict$set$('camb', [ 29 ], $gren_lang$core$Dict$set$('cam', [ 29, 30 ], $gren_lang$core$Dict$set$('cabo', [ 28 ], $gren_lang$core$Dict$set$('cab', [ 28 ], $gren_lang$core$Dict$set$('ca', [ 28, 29, 30, 31 ], $gren_lang$core$Dict$set$('c', [ 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 190 ], $gren_lang$core$Dict$set$('burundi', [ 27 ], $gren_lang$core$Dict$set$('burund', [ 27 ], $gren_lang$core$Dict$set$('burun', [ 27 ], $gren_lang$core$Dict$set$('buru', [ 27 ], $gren_lang$core$Dict$set$('burkina', [ 26 ], $gren_lang$core$Dict$set$('burkin', [ 26 ], $gren_lang$core$Dict$set$('burki', [ 26 ], $gren_lang$core$Dict$set$('burk', [ 26 ], $gren_lang$core$Dict$set$('bur', [ 26, 27 ], $gren_lang$core$Dict$set$('bulgaria', [ 25 ], $gren_lang$core$Dict$set$('bulgari', [ 25 ], $gren_lang$core$Dict$set$('bulgar', [ 25 ], $gren_lang$core$Dict$set$('bulga', [ 25 ], $gren_lang$core$Dict$set$('bulg', [ 25 ], $gren_lang$core$Dict$set$('bul', [ 25 ], $gren_lang$core$Dict$set$('bu', [ 25, 26, 27 ], $gren_lang$core$Dict$set$('brunei', [ 24 ], $gren_lang$core$Dict$set$('brune', [ 24 ], $gren_lang$core$Dict$set$('brun', [ 24 ], $gren_lang$core$Dict$set$('bru', [ 24 ], $gren_lang$core$Dict$set$('brazil', [ 23 ], $gren_lang$core$Dict$set$('brazi', [ 23 ], $gren_lang$core$Dict$set$('braz', [ 23 ], $gren_lang$core$Dict$set$('bra', [ 23 ], $gren_lang$core$Dict$set$('br', [ 23, 24 ], $gren_lang$core$Dict$set$('botswana', [ 22 ], $gren_lang$core$Dict$set$('botswan', [ 22 ], $gren_lang$core$Dict$set$('botswa', [ 22 ], $gren_lang$core$Dict$set$('botsw', [ 22 ], $gren_lang$core$Dict$set$('bots', [ 22 ], $gren_lang$core$Dict$set$('bot', [ 22 ], $gren_lang$core$Dict$set$('bosnia', [ 21 ], $gren_lang$core$Dict$set$('bosni', [ 21 ], $gren_lang$core$Dict$set$('bosn', [ 21 ], $gren_lang$core$Dict$set$('bos', [ 21 ], $gren_lang$core$Dict$set$('bolivia', [ 20 ], $gren_lang$core$Dict$set$('bolivi', [ 20 ], $gren_lang$core$Dict$set$('boliv', [ 20 ], $gren_lang$core$Dict$set$('boli', [ 20 ], $gren_lang$core$Dict$set$('bol', [ 20 ], $gren_lang$core$Dict$set$('bo', [ 20, 21, 22 ], $gren_lang$core$Dict$set$('bhutan', [ 19 ], $gren_lang$core$Dict$set$('bhuta', [ 19 ], $gren_lang$core$Dict$set$('bhut', [ 19 ], $gren_lang$core$Dict$set$('bhu', [ 19 ], $gren_lang$core$Dict$set$('bh', [ 19 ], $gren_lang$core$Dict$set$('benin', [ 18 ], $gren_lang$core$Dict$set$('beni', [ 18 ], $gren_lang$core$Dict$set$('ben', [ 18 ], $gren_lang$core$Dict$set$('belize', [ 17 ], $gren_lang$core$Dict$set$('beliz', [ 17 ], $gren_lang$core$Dict$set$('beli', [ 17 ], $gren_lang$core$Dict$set$('belgium', [ 16 ], $gren_lang$core$Dict$set$('belgiu', [ 16 ], $gren_lang$core$Dict$set$('belgi', [ 16 ], $gren_lang$core$Dict$set$('belg', [ 16 ], $gren_lang$core$Dict$set$('belarus', [ 15 ], $gren_lang$core$Dict$set$('belaru', [ 15 ], $gren_lang$core$Dict$set$('belar', [ 15 ], $gren_lang$core$Dict$set$('bela', [ 15 ], $gren_lang$core$Dict$set$('bel', [ 15, 16, 17 ], $gren_lang$core$Dict$set$('be', [ 15, 16, 17, 18 ], $gren_lang$core$Dict$set$('barbuda', [ 5 ], $gren_lang$core$Dict$set$('barbud', [ 5 ], $gren_lang$core$Dict$set$('barbu', [ 5 ], $gren_lang$core$Dict$set$('barbados', [ 14 ], $gren_lang$core$Dict$set$('barbado', [ 14 ], $gren_lang$core$Dict$set$('barbad', [ 14 ], $gren_lang$core$Dict$set$('barba', [ 14 ], $gren_lang$core$Dict$set$('barb', [ 14, 5 ], $gren_lang$core$Dict$set$('bar', [ 14, 5 ], $gren_lang$core$Dict$set$('bangladesh', [ 13 ], $gren_lang$core$Dict$set$('banglades', [ 13 ], $gren_lang$core$Dict$set$('banglade', [ 13 ], $gren_lang$core$Dict$set$('banglad', [ 13 ], $gren_lang$core$Dict$set$('bangla', [ 13 ], $gren_lang$core$Dict$set$('bangl', [ 13 ], $gren_lang$core$Dict$set$('bang', [ 13 ], $gren_lang$core$Dict$set$('ban', [ 13 ], $gren_lang$core$Dict$set$('bahrain', [ 12 ], $gren_lang$core$Dict$set$('bahrai', [ 12 ], $gren_lang$core$Dict$set$('bahra', [ 12 ], $gren_lang$core$Dict$set$('bahr', [ 12 ], $gren_lang$core$Dict$set$('bahamas', [ 11 ], $gren_lang$core$Dict$set$('bahama', [ 11 ], $gren_lang$core$Dict$set$('baham', [ 11 ], $gren_lang$core$Dict$set$('baha', [ 11 ], $gren_lang$core$Dict$set$('bah', [ 11, 12 ], $gren_lang$core$Dict$set$('ba', [ 11, 12, 13, 14, 5 ], $gren_lang$core$Dict$set$('b', [ 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 5 ], $gren_lang$core$Dict$set$('azerbaijan', [ 10 ], $gren_lang$core$Dict$set$('azerbaija', [ 10 ], $gren_lang$core$Dict$set$('azerbaij', [ 10 ], $gren_lang$core$Dict$set$('azerbai', [ 10 ], $gren_lang$core$Dict$set$('azerba', [ 10 ], $gren_lang$core$Dict$set$('azerb', [ 10 ], $gren_lang$core$Dict$set$('azer', [ 10 ], $gren_lang$core$Dict$set$('aze', [ 10 ], $gren_lang$core$Dict$set$('az', [ 10 ], $gren_lang$core$Dict$set$('austria', [ 9 ], $gren_lang$core$Dict$set$('austri', [ 9 ], $gren_lang$core$Dict$set$('australia', [ 8 ], $gren_lang$core$Dict$set$('australi', [ 8 ], $gren_lang$core$Dict$set$('austral', [ 8 ], $gren_lang$core$Dict$set$('austra', [ 8 ], $gren_lang$core$Dict$set$('austr', [ 8, 9 ], $gren_lang$core$Dict$set$('aust', [ 8, 9 ], $gren_lang$core$Dict$set$('aus', [ 8, 9 ], $gren_lang$core$Dict$set$('au', [ 8, 9 ], $gren_lang$core$Dict$set$('armenia', [ 7 ], $gren_lang$core$Dict$set$('armeni', [ 7 ], $gren_lang$core$Dict$set$('armen', [ 7 ], $gren_lang$core$Dict$set$('arme', [ 7 ], $gren_lang$core$Dict$set$('arm', [ 7 ], $gren_lang$core$Dict$set$('argentina', [ 6 ], $gren_lang$core$Dict$set$('argentin', [ 6 ], $gren_lang$core$Dict$set$('argenti', [ 6 ], $gren_lang$core$Dict$set$('argent', [ 6 ], $gren_lang$core$Dict$set$('argen', [ 6 ], $gren_lang$core$Dict$set$('arge', [ 6 ], $gren_lang$core$Dict$set$('arg', [ 6 ], $gren_lang$core$Dict$set$('arabia', [ 151 ], $gren_lang$core$Dict$set$('arabi', [ 151 ], $gren_lang$core$Dict$set$('arab', [ 151, 184 ], $gren_lang$core$Dict$set$('ara', [ 151, 184 ], $gren_lang$core$Dict$set$('ar', [ 6, 7, 151, 184 ], $gren_lang$core$Dict$set$('antigua', [ 5 ], $gren_lang$core$Dict$set$('antigu', [ 5 ], $gren_lang$core$Dict$set$('antig', [ 5 ], $gren_lang$core$Dict$set$('anti', [ 5 ], $gren_lang$core$Dict$set$('ant', [ 5 ], $gren_lang$core$Dict$set$('angola', [ 4 ], $gren_lang$core$Dict$set$('angol', [ 4 ], $gren_lang$core$Dict$set$('ango', [ 4 ], $gren_lang$core$Dict$set$('ang', [ 4 ], $gren_lang$core$Dict$set$('andorra', [ 3 ], $gren_lang$core$Dict$set$('andorr', [ 3 ], $gren_lang$core$Dict$set$('andor', [ 3 ], $gren_lang$core$Dict$set$('ando', [ 3 ], $gren_lang$core$Dict$set$('and', [ 3, 5, 21, 177, 145, 147, 150 ], $gren_lang$core$Dict$set$('an', [ 3, 4, 5, 21, 177, 145, 147, 150 ], $gren_lang$core$Dict$set$('algeria', [ 2 ], $gren_lang$core$Dict$set$('algeri', [ 2 ], $gren_lang$core$Dict$set$('alger', [ 2 ], $gren_lang$core$Dict$set$('alge', [ 2 ], $gren_lang$core$Dict$set$('alg', [ 2 ], $gren_lang$core$Dict$set$('albania', [ 1 ], $gren_lang$core$Dict$set$('albani', [ 1 ], $gren_lang$core$Dict$set$('alban', [ 1 ], $gren_lang$core$Dict$set$('alba', [ 1 ], $gren_lang$core$Dict$set$('alb', [ 1 ], $gren_lang$core$Dict$set$('al', [ 1, 2 ], $gren_lang$core$Dict$set$('african', [ 32 ], $gren_lang$core$Dict$set$('africa', [ 32, 161 ], $gren_lang$core$Dict$set$('afric', [ 32, 161 ], $gren_lang$core$Dict$set$('afri', [ 32, 161 ], $gren_lang$core$Dict$set$('afr', [ 32, 161 ], $gren_lang$core$Dict$set$('afghanistan', [ 0 ], $gren_lang$core$Dict$set$('afghanista', [ 0 ], $gren_lang$core$Dict$set$('afghanist', [ 0 ], $gren_lang$core$Dict$set$('afghanis', [ 0 ], $gren_lang$core$Dict$set$('afghani', [ 0 ], $gren_lang$core$Dict$set$('afghan', [ 0 ], $gren_lang$core$Dict$set$('afgha', [ 0 ], $gren_lang$core$Dict$set$('afgh', [ 0 ], $gren_lang$core$Dict$set$('afg', [ 0 ], $gren_lang$core$Dict$set$('af', [ 0, 32, 161 ], $gren_lang$core$Dict$set$('a', [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 5, 21, 32, 151, 161, 177, 184, 145, 147, 150 ], $gren_lang$core$Dict$empty))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))));
var $author$project$CountryDatabase$db = { byId: $author$project$CountryDatabase$create_by_id_dict, substringMap: $author$project$CountryDatabase$create_substring_map };
var $author$project$AutoDropdown$initialState = { highlightedIndex: $gren_lang$core$Maybe$Nothing, isOpen: false };
var $author$project$Model$initialModel = { countryDb: $author$project$CountryDatabase$db, dropdownState: $author$project$AutoDropdown$initialState, foundCountries: [  ], searchText: '', suggestions: [  ] };
var $gren_lang$core$Platform$Cmd$batch = _Platform_batch;
var $gren_lang$core$Platform$Cmd$none = $gren_lang$core$Platform$Cmd$batch([  ]);
var $author$project$Main$init = function(flags) {
	return { command: $gren_lang$core$Platform$Cmd$none, model: $author$project$Model$initialModel };
};
var $gren_lang$core$Platform$Sub$batch = _Platform_batch;
var $gren_lang$core$Platform$Sub$none = $gren_lang$core$Platform$Sub$batch([  ]);
var $gren_lang$core$Dict$get$ = function(targetKey, dict) {
	get:
	while (true) {
		if (dict.$ === 'RBEmpty_gren_builtin') {
			return $gren_lang$core$Maybe$Nothing;
		} else {
			var _v1 = dict.a;
			var key = _v1.key;
			var value = _v1.value;
			var left = _v1.left;
			var right = _v1.right;
			var _v2 = A2($gren_lang$core$Basics$compare, targetKey, key);
			switch (_v2.$) {
				case 'LT':
					var $temp$targetKey = targetKey,
					$temp$dict = left;
					targetKey = $temp$targetKey;
					dict = $temp$dict;
					continue get;
				case 'EQ':
					return $gren_lang$core$Maybe$Just(value);
				default:
					var $temp$targetKey = targetKey,
					$temp$dict = right;
					targetKey = $temp$targetKey;
					dict = $temp$dict;
					continue get;
			}
		}
	}
};
var $gren_lang$core$Dict$get = F2($gren_lang$core$Dict$get$);
var $gren_lang$core$Array$first = function(array) {
	return A2($gren_lang$core$Array$get, 0, array);
};
var $gren_lang$core$String$toLower = _String_toLower;
var $gren_lang$core$Maybe$withDefault$ = function(_default, maybe) {
	if (maybe.$ === 'Just') {
		var value = maybe.a;
		return value;
	} else {
		return _default;
	}
};
var $gren_lang$core$Maybe$withDefault = F2($gren_lang$core$Maybe$withDefault$);
var $gren_lang$core$String$words = _String_words;
var $author$project$Update$getSearchWord = function(text) {
	return $gren_lang$core$Maybe$withDefault$('', $gren_lang$core$Array$first($gren_lang$core$String$words($gren_lang$core$String$toLower(text))));
};
var $author$project$Country$initialCountry = { capital: '', name: '', officialName: '', population: 0 };
var $gren_lang$core$Array$keepIf = _Array_filter;
var $author$project$Update$maybeIsJustValue = function(maybe) {
	if (maybe.$ === 'Nothing') {
		return false;
	} else {
		return true;
	}
};
var $gren_lang$core$Array$slice = _Array_slice;
var $gren_lang$core$Array$takeFirst$ = function(n, array) {
	return A3($gren_lang$core$Array$slice, 0, n, array);
};
var $gren_lang$core$Array$takeFirst = F2($gren_lang$core$Array$takeFirst$);
var $author$project$Update$findCountrySuggestions$ = function(model, text) {
	var maybeCids = $gren_lang$core$Dict$get$($author$project$Update$getSearchWord(text), model.countryDb.substringMap);
	if (maybeCids.$ === 'Nothing') {
		return [  ];
	} else {
		var matchedCids = maybeCids.a;
		var arrayMaybeCountries = A2($gren_lang$core$Array$map, function(cid) {
				return $gren_lang$core$Dict$get$(cid, model.countryDb.byId);
			}, matchedCids);
		var arrayJustCountries = A2($gren_lang$core$Array$keepIf, $author$project$Update$maybeIsJustValue, arrayMaybeCountries);
		var firstJustCountries = $gren_lang$core$Array$takeFirst$(5, arrayJustCountries);
		var firstCountries = A2($gren_lang$core$Array$map, function(mc) {
				return $gren_lang$core$Maybe$withDefault$($author$project$Country$initialCountry, mc);
			}, firstJustCountries);
		return A2($gren_lang$core$Array$map, function(c) {
				return c.name;
			}, firstCountries);
	}
};
var $author$project$Update$findCountrySuggestions = F2($author$project$Update$findCountrySuggestions$);
var $gren_lang$core$Basics$gt = _Utils_gt;
var $author$project$AutoDropdown$mouseEnter$ = function(idx, items, state) {
	return (_Utils_cmp(idx, $gren_lang$core$Array$length(items)) < 0) ? _Utils_update(state, { highlightedIndex: $gren_lang$core$Maybe$Just(idx) }) : _Utils_update(state, { highlightedIndex: $gren_lang$core$Maybe$Nothing });
};
var $author$project$AutoDropdown$mouseEnter = F3($author$project$AutoDropdown$mouseEnter$);
var $gren_lang$core$Basics$sub = _Basics_sub;
var $author$project$AutoDropdown$definitelyMoveDown$ = function(idx, items, state) {
	var newIdx = idx + 1;
	var newItem = A2($gren_lang$core$Array$get, newIdx, items);
	if (newItem.$ === 'Just') {
		return { highlighted: newItem, state: _Utils_update(state, { highlightedIndex: $gren_lang$core$Maybe$Just(newIdx) }) };
	} else {
		var maxIdx = $gren_lang$core$Array$length(items) - 1;
		var lastItem = A2($gren_lang$core$Array$get, maxIdx, items);
		if (lastItem.$ === 'Nothing') {
			return { highlighted: $gren_lang$core$Maybe$Nothing, state: state };
		} else {
			return { highlighted: lastItem, state: _Utils_update(state, { highlightedIndex: $gren_lang$core$Maybe$Just(maxIdx) }) };
		}
	}
};
var $author$project$AutoDropdown$definitelyMoveDown = F3($author$project$AutoDropdown$definitelyMoveDown$);
var $gren_lang$core$Basics$negate = function(n) {
	return -n;
};
var $author$project$AutoDropdown$moveDown$ = function(items, state) {
	var _v0 = state.isOpen;
	if (!_v0) {
		if ($gren_lang$core$Array$length(items) > 0) {
			var _v1 = $author$project$AutoDropdown$definitelyMoveDown$(-1, items, state);
			var newState = _v1.state;
			var highlighted = _v1.highlighted;
			return { highlighted: highlighted, state: _Utils_update(newState, { isOpen: true }) };
		} else {
			return { highlighted: $gren_lang$core$Maybe$Nothing, state: state };
		}
	} else {
		var currentIdx = function () {
			var _v2 = state.highlightedIndex;
			if (_v2.$ === 'Nothing') {
				return -1;
			} else {
				var idx = _v2.a;
				return idx;
			}
		}();
		return $author$project$AutoDropdown$definitelyMoveDown$(currentIdx, items, state);
	}
};
var $author$project$AutoDropdown$moveDown = F2($author$project$AutoDropdown$moveDown$);
var $author$project$AutoDropdown$definitelyMoveUp$ = function(idx, items, state) {
	if (idx === 0) {
		return { highlighted: $gren_lang$core$Maybe$Nothing, state: _Utils_update(state, { highlightedIndex: $gren_lang$core$Maybe$Nothing, isOpen: false }) };
	} else {
		var newIdx = idx - 1;
		if (_Utils_cmp(newIdx, $gren_lang$core$Array$length(items)) < 0) {
			var newItem = A2($gren_lang$core$Array$get, newIdx, items);
			if (newItem.$ === 'Nothing') {
				return { highlighted: $gren_lang$core$Maybe$Nothing, state: state };
			} else {
				return { highlighted: newItem, state: _Utils_update(state, { highlightedIndex: $gren_lang$core$Maybe$Just(newIdx) }) };
			}
		} else {
			var maxIdx = $gren_lang$core$Array$length(items) - 1;
			var lastItem = A2($gren_lang$core$Array$get, maxIdx, items);
			if (lastItem.$ === 'Nothing') {
				return { highlighted: $gren_lang$core$Maybe$Nothing, state: state };
			} else {
				return { highlighted: lastItem, state: _Utils_update(state, { highlightedIndex: $gren_lang$core$Maybe$Just(maxIdx) }) };
			}
		}
	}
};
var $author$project$AutoDropdown$definitelyMoveUp = F3($author$project$AutoDropdown$definitelyMoveUp$);
var $author$project$AutoDropdown$moveUp$ = function(items, state) {
	var _v0 = state.isOpen;
	if (!_v0) {
		return { highlighted: $gren_lang$core$Maybe$Nothing, state: state };
	} else {
		var _v1 = state.highlightedIndex;
		if (_v1.$ === 'Nothing') {
			return { highlighted: $gren_lang$core$Maybe$Nothing, state: state };
		} else {
			var idx = _v1.a;
			return $author$project$AutoDropdown$definitelyMoveUp$(idx, items, state);
		}
	}
};
var $author$project$AutoDropdown$moveUp = F2($author$project$AutoDropdown$moveUp$);
var $gren_lang$core$Basics$neq = _Utils_notEqual;
var $author$project$Update$performCountryLookup$ = function(model, text) {
	var maybeCids = $gren_lang$core$Dict$get$($author$project$Update$getSearchWord(text), model.countryDb.substringMap);
	if (maybeCids.$ === 'Nothing') {
		return [  ];
	} else {
		var cids = maybeCids.a;
		var arrayMaybeCountries = A2($gren_lang$core$Array$map, function(cid) {
				return $gren_lang$core$Dict$get$(cid, model.countryDb.byId);
			}, cids);
		var arrayJustCountries = A2($gren_lang$core$Array$keepIf, $author$project$Update$maybeIsJustValue, arrayMaybeCountries);
		return A2($gren_lang$core$Array$map, function(mc) {
				return $gren_lang$core$Maybe$withDefault$($author$project$Country$initialCountry, mc);
			}, arrayJustCountries);
	}
};
var $author$project$Update$performCountryLookup = F2($author$project$Update$performCountryLookup$);
var $gren_lang$core$Json$Encode$string = _Json_wrap;
var $author$project$Ports$requestFocus = _Platform_outgoingPort('requestFocus', $gren_lang$core$Json$Encode$string);
var $author$project$Update$update$ = function(msg, model) {
	switch (msg.$) {
		case 'SearchInputBlurred':
			return { command: $gren_lang$core$Platform$Cmd$none, model: _Utils_update(model, { dropdownState: $author$project$AutoDropdown$initialState }) };
		case 'SearchInputFocused':
			var showSuggestions = model.searchText !== '';
			return { command: $gren_lang$core$Platform$Cmd$none, model: _Utils_update(model, { dropdownState: _Utils_update(model.dropdownState, { isOpen: showSuggestions }) }) };
		case 'UpdateSearchText':
			var text = msg.a;
			var newSuggestions = function () {
				if (text === '') {
					return [  ];
				} else {
					return $author$project$Update$findCountrySuggestions$(model, text);
				}
			}();
			var showSuggestions = $gren_lang$core$Array$length(newSuggestions) > 0;
			return { command: $gren_lang$core$Platform$Cmd$none, model: _Utils_update(model, { dropdownState: _Utils_update(model.dropdownState, { isOpen: showSuggestions }), searchText: text, suggestions: newSuggestions }) };
		case 'KeyDownSearchText':
			var key = msg.a;
			if (model.searchText !== '') {
				if (key === 13) {
					var newFoundCountries = $author$project$Update$performCountryLookup$(model, model.searchText);
					return { command: $gren_lang$core$Platform$Cmd$none, model: _Utils_update(model, { dropdownState: _Utils_update(model.dropdownState, { isOpen: false }), foundCountries: newFoundCountries }) };
				} else {
					var _v3 = function () {
						switch (key) {
							case 38:
								return $author$project$AutoDropdown$moveUp$(model.suggestions, model.dropdownState);
							case 40:
								return $author$project$AutoDropdown$moveDown$(model.suggestions, model.dropdownState);
							default:
								return { highlighted: $gren_lang$core$Maybe$Nothing, state: model.dropdownState };
						}
					}();
					var newDropdownState = _v3.state;
					var maybeHighlighted = _v3.highlighted;
					var newSearchText = function () {
						if (maybeHighlighted.$ === 'Just') {
							var item = maybeHighlighted.a;
							return item;
						} else {
							return model.searchText;
						}
					}();
					return { command: $gren_lang$core$Platform$Cmd$none, model: _Utils_update(model, { dropdownState: newDropdownState, searchText: newSearchText }) };
				}
			} else {
				return { command: $gren_lang$core$Platform$Cmd$none, model: model };
			}
		case 'MouseEnterSuggestion':
			var idx = msg.a;
			var newDropdownState = $author$project$AutoDropdown$mouseEnter$(idx, model.suggestions, model.dropdownState);
			return { command: $gren_lang$core$Platform$Cmd$none, model: _Utils_update(model, { dropdownState: newDropdownState }) };
		case 'ClickedSearchIcon':
			var newFoundCountries = function () {
				var _v6 = model.searchText;
				if (_v6 === '') {
					return [  ];
				} else {
					return $author$project$Update$performCountryLookup$(model, model.searchText);
				}
			}();
			return { command: $gren_lang$core$Platform$Cmd$none, model: _Utils_update(model, { foundCountries: newFoundCountries }) };
		case 'ClickedClearIcon':
			return { command: $author$project$Ports$requestFocus('search-term'), model: _Utils_update(model, { searchText: '' }) };
		default:
			var text = msg.a;
			var newFoundCountries = function () {
				if (text === '') {
					return [  ];
				} else {
					return $author$project$Update$performCountryLookup$(model, text);
				}
			}();
			return { command: $gren_lang$core$Platform$Cmd$none, model: _Utils_update(model, { foundCountries: newFoundCountries, searchText: text }) };
	}
};
var $author$project$Update$update = F2($author$project$Update$update$);
var $gren_lang$browser$VirtualDom$property$ = function(key, value) {
	return A2(_VirtualDom_property, _VirtualDom_noInnerHtmlOrFormAction(key), _VirtualDom_noJavaScriptOrHtmlUri(value));
};
var $gren_lang$browser$VirtualDom$property = F2($gren_lang$browser$VirtualDom$property$);
var $gren_lang$browser$Html$Attributes$property = $gren_lang$browser$VirtualDom$property;
var $gren_lang$browser$Html$Attributes$stringProperty$ = function(key, string) {
	return A2($gren_lang$browser$Html$Attributes$property, key, $gren_lang$core$Json$Encode$string(string));
};
var $gren_lang$browser$Html$Attributes$stringProperty = F2($gren_lang$browser$Html$Attributes$stringProperty$);
var $gren_lang$browser$Html$Attributes$class = $gren_lang$browser$Html$Attributes$stringProperty('className');
var $gren_lang$browser$VirtualDom$node = function(tag) {
	return _VirtualDom_node(_VirtualDom_noScript(tag));
};
var $gren_lang$browser$Html$node = $gren_lang$browser$VirtualDom$node;
var $gren_lang$browser$Html$div = $gren_lang$browser$Html$node('div');
var $gren_lang$browser$Html$h3 = $gren_lang$browser$Html$node('h3');
var $gren_lang$browser$Html$ol = $gren_lang$browser$Html$node('ol');
var $gren_lang$browser$Html$b = $gren_lang$browser$Html$node('b');
var $gren_lang$browser$Html$li = $gren_lang$browser$Html$node('li');
var $gren_lang$browser$VirtualDom$text = _VirtualDom_text;
var $gren_lang$browser$Html$text = $gren_lang$browser$VirtualDom$text;
var $gren_lang$browser$Html$ul = $gren_lang$browser$Html$node('ul');
var $author$project$View$render_country_data$ = function(country, model) {
	return A2($gren_lang$browser$Html$li, [  ], [ A2($gren_lang$browser$Html$ul, [  ], [ A2($gren_lang$browser$Html$li, [  ], [ $gren_lang$browser$Html$text('Name: '), A2($gren_lang$browser$Html$b, [  ], [ $gren_lang$browser$Html$text(country.name) ]) ]), A2($gren_lang$browser$Html$li, [  ], [ $gren_lang$browser$Html$text('Official Name: '), $gren_lang$browser$Html$text(country.officialName) ]), A2($gren_lang$browser$Html$li, [  ], [ $gren_lang$browser$Html$text('Population: '), $gren_lang$browser$Html$text($gren_lang$core$String$fromInt(country.population)) ]), A2($gren_lang$browser$Html$li, [  ], [ $gren_lang$browser$Html$text('Capital:'), $gren_lang$browser$Html$text(country.capital) ]) ]) ]);
};
var $author$project$View$render_country_data = F2($author$project$View$render_country_data$);
var $author$project$View$render_countries_data = function(model) {
	return A2($gren_lang$browser$Html$div, [  ], [ A2($gren_lang$browser$Html$ol, [  ], A2($gren_lang$core$Array$map, function(c) {
					return $author$project$View$render_country_data$(c, model);
				}, model.foundCountries)) ]);
};
var $author$project$Msg$ClickedSuggestion = function (a) {
	return { $: 'ClickedSuggestion', a: a };
};
var $author$project$Msg$MouseEnterSuggestion = function (a) {
	return { $: 'MouseEnterSuggestion', a: a };
};
var $author$project$View$dropdownConfig = { highlightedAttrs: [ $gren_lang$browser$Html$Attributes$class('autodropdown-item-highlighted') ], liAttrs: [ $gren_lang$browser$Html$Attributes$class('autodropdown-item') ], mouseDownMsg: $author$project$Msg$ClickedSuggestion, mouseEnterMsg: $author$project$Msg$MouseEnterSuggestion, ulAttrs: [ $gren_lang$browser$Html$Attributes$class('autodropdown-list') ] };
var $gren_lang$browser$Html$Attributes$id = $gren_lang$browser$Html$Attributes$stringProperty('id');
var $author$project$Msg$ClickedClearIcon = { $: 'ClickedClearIcon' };
var $gren_lang$browser$Html$button = $gren_lang$browser$Html$node('button');
var $gren_lang$browser$VirtualDom$attribute$ = function(key, value) {
	return A2(_VirtualDom_attribute, _VirtualDom_noOnOrFormAction(key), _VirtualDom_noJavaScriptOrHtmlUri(value));
};
var $gren_lang$browser$VirtualDom$attribute = F2($gren_lang$browser$VirtualDom$attribute$);
var $gren_lang$browser$VirtualDom$nodeNS = function(tag) {
	return _VirtualDom_nodeNS(_VirtualDom_noScript(tag));
};
var $gren_lang$browser$Svg$node = $gren_lang$browser$VirtualDom$nodeNS('http://www.w3.org/2000/svg');
var $author$project$CloseCircle$closeCircle = function(attrs) {
	return A3($gren_lang$browser$Svg$node, 'svg', _Utils_ap([ $gren_lang$browser$VirtualDom$attribute$('xmlns', 'http://www.w3.org/2000/svg'), $gren_lang$browser$VirtualDom$attribute$('viewBox', '0 0 24 24'), $gren_lang$browser$VirtualDom$attribute$('width', '32'), $gren_lang$browser$VirtualDom$attribute$('height', '32'), $gren_lang$browser$VirtualDom$attribute$('fill', 'currentColor') ], attrs), [ A3($gren_lang$browser$Svg$node, 'path', [ $gren_lang$browser$VirtualDom$attribute$('d', 'M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 10.5858L14.8284 7.75736L16.2426 9.17157L13.4142 12L16.2426 14.8284L14.8284 16.2426L12 13.4142L9.17157 16.2426L7.75736 14.8284L10.5858 12L7.75736 9.17157L9.17157 7.75736L12 10.5858Z') ], [  ]) ]);
};
var $gren_lang$browser$VirtualDom$Normal = function (a) {
	return { $: 'Normal', a: a };
};
var $gren_lang$browser$VirtualDom$on = _VirtualDom_on;
var $gren_lang$browser$Html$Events$on$ = function(event, decoder) {
	return A2($gren_lang$browser$VirtualDom$on, event, $gren_lang$browser$VirtualDom$Normal(decoder));
};
var $gren_lang$browser$Html$Events$on = F2($gren_lang$browser$Html$Events$on$);
var $gren_lang$browser$Html$Events$onClick = function(msg) {
	return $gren_lang$browser$Html$Events$on$('click', $gren_lang$core$Json$Decode$succeed(msg));
};
var $author$project$View$render_clear_icon_button = function(model) {
	return (model.searchText === '') ? $gren_lang$browser$Html$text('') : A2($gren_lang$browser$Html$button, [ $gren_lang$browser$Html$Attributes$id('clear-button'), $gren_lang$browser$Html$Events$onClick($author$project$Msg$ClickedClearIcon), $gren_lang$browser$Html$Attributes$class('clear-icon-btn') ], [ $author$project$CloseCircle$closeCircle([  ]) ]);
};
var $author$project$Msg$ClickedSearchIcon = { $: 'ClickedSearchIcon' };
var $author$project$SearchLine$searchLine = function(attrs) {
	return A3($gren_lang$browser$Svg$node, 'svg', _Utils_ap([ $gren_lang$browser$VirtualDom$attribute$('xmlns', 'http://www.w3.org/2000/svg'), $gren_lang$browser$VirtualDom$attribute$('viewBox', '0 0 24 24'), $gren_lang$browser$VirtualDom$attribute$('width', '32'), $gren_lang$browser$VirtualDom$attribute$('height', '32'), $gren_lang$browser$VirtualDom$attribute$('fill', 'currentColor') ], attrs), [ A3($gren_lang$browser$Svg$node, 'path', [ $gren_lang$browser$VirtualDom$attribute$('d', 'M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z') ], [  ]) ]);
};
var $author$project$View$render_search_icon_button = function(model) {
	return A2($gren_lang$browser$Html$button, [ $gren_lang$browser$Html$Attributes$id('search-button'), $gren_lang$browser$Html$Events$onClick($author$project$Msg$ClickedSearchIcon), $gren_lang$browser$Html$Attributes$class('search-icon-btn') ], [ $author$project$SearchLine$searchLine([  ]) ]);
};
var $author$project$Msg$KeyDownSearchText = function (a) {
	return { $: 'KeyDownSearchText', a: a };
};
var $author$project$Msg$SearchInputBlurred = { $: 'SearchInputBlurred' };
var $author$project$Msg$SearchInputFocused = { $: 'SearchInputFocused' };
var $author$project$Msg$UpdateSearchText = function (a) {
	return { $: 'UpdateSearchText', a: a };
};
var $gren_lang$browser$Html$input = $gren_lang$browser$Html$node('input');
var $gren_lang$browser$Html$Events$onBlur = function(msg) {
	return $gren_lang$browser$Html$Events$on$('blur', $gren_lang$core$Json$Decode$succeed(msg));
};
var $gren_lang$browser$Html$Events$onFocus = function(msg) {
	return $gren_lang$browser$Html$Events$on$('focus', $gren_lang$core$Json$Decode$succeed(msg));
};
var $gren_lang$browser$Html$Events$alwaysStop = function(msg) {
	return { message: msg, stopPropagation: true };
};
var $gren_lang$browser$VirtualDom$MayStopPropagation = function (a) {
	return { $: 'MayStopPropagation', a: a };
};
var $gren_lang$browser$Html$Events$stopPropagationOn$ = function(event, decoder) {
	return A2($gren_lang$browser$VirtualDom$on, event, $gren_lang$browser$VirtualDom$MayStopPropagation(decoder));
};
var $gren_lang$browser$Html$Events$stopPropagationOn = F2($gren_lang$browser$Html$Events$stopPropagationOn$);
var $gren_lang$core$Json$Decode$field = _Json_decodeField;
var $gren_lang$core$Json$Decode$at$ = function(fields, decoder) {
	return A3($gren_lang$core$Array$foldr, $gren_lang$core$Json$Decode$field, decoder, fields);
};
var $gren_lang$core$Json$Decode$at = F2($gren_lang$core$Json$Decode$at$);
var $gren_lang$core$Json$Decode$string = _Json_decodeString;
var $gren_lang$browser$Html$Events$targetValue = $gren_lang$core$Json$Decode$at$([ 'target', 'value' ], $gren_lang$core$Json$Decode$string);
var $gren_lang$browser$Html$Events$onInput = function(tagger) {
	return $gren_lang$browser$Html$Events$stopPropagationOn$('input', A2($gren_lang$core$Json$Decode$map, $gren_lang$browser$Html$Events$alwaysStop, A2($gren_lang$core$Json$Decode$map, tagger, $gren_lang$browser$Html$Events$targetValue)));
};
var $gren_lang$core$Json$Decode$int = _Json_decodeInt;
var $gren_lang$browser$Html$Events$keyCode = A2($gren_lang$core$Json$Decode$field, 'keyCode', $gren_lang$core$Json$Decode$int);
var $author$project$OnKeyDown$onKeyDown = function(tagger) {
	return $gren_lang$browser$Html$Events$on$('keydown', A2($gren_lang$core$Json$Decode$map, tagger, $gren_lang$browser$Html$Events$keyCode));
};
var $gren_lang$browser$Html$Attributes$placeholder = $gren_lang$browser$Html$Attributes$stringProperty('placeholder');
var $gren_lang$browser$Html$Attributes$type_ = $gren_lang$browser$Html$Attributes$stringProperty('type');
var $gren_lang$browser$Html$Attributes$value = $gren_lang$browser$Html$Attributes$stringProperty('value');
var $author$project$View$render_search_text_input = function(model) {
	var inputClass = model.dropdownState.isOpen ? 'autodropdown-input-open' : '';
	return A2($gren_lang$browser$Html$input, [ $gren_lang$browser$Html$Attributes$type_('text'), $gren_lang$browser$Html$Attributes$class('autodropdown-input'), $gren_lang$browser$Html$Attributes$placeholder('e.g., Thailand'), $gren_lang$browser$Html$Attributes$value(model.searchText), $gren_lang$browser$Html$Events$onInput($author$project$Msg$UpdateSearchText), $author$project$OnKeyDown$onKeyDown($author$project$Msg$KeyDownSearchText), $gren_lang$browser$Html$Attributes$class(inputClass), $gren_lang$browser$Html$Events$onBlur($author$project$Msg$SearchInputBlurred), $gren_lang$browser$Html$Events$onFocus($author$project$Msg$SearchInputFocused) ], [  ]);
};
var $gren_lang$browser$VirtualDom$style = _VirtualDom_style;
var $gren_lang$browser$Html$Attributes$style = $gren_lang$browser$VirtualDom$style;
var $gren_lang$browser$Html$Events$onMouseDown = function(msg) {
	return $gren_lang$browser$Html$Events$on$('mousedown', $gren_lang$core$Json$Decode$succeed(msg));
};
var $gren_lang$browser$Html$Events$onMouseEnter = function(msg) {
	return $gren_lang$browser$Html$Events$on$('mouseenter', $gren_lang$core$Json$Decode$succeed(msg));
};
var $author$project$AutoDropdown$viewItem$ = function(config, state, idx, item) {
	var liAttrs = _Utils_ap(config.liAttrs, [ $gren_lang$browser$Html$Events$onMouseDown(config.mouseDownMsg(item)), $gren_lang$browser$Html$Events$onMouseEnter(config.mouseEnterMsg(idx)) ]);
	var attrs = function () {
		var _v0 = state.highlightedIndex;
		if (_v0.$ === 'Nothing') {
			return liAttrs;
		} else {
			var highlightedIndex = _v0.a;
			return _Utils_eq(idx, highlightedIndex) ? _Utils_ap(liAttrs, config.highlightedAttrs) : liAttrs;
		}
	}();
	return A2($gren_lang$browser$Html$li, attrs, [ $gren_lang$browser$Html$text(item) ]);
};
var $author$project$AutoDropdown$viewItem = F4($author$project$AutoDropdown$viewItem$);
var $author$project$AutoDropdown$view$ = function(config, state, items) {
	var displayStyle = state.isOpen ? A2($gren_lang$browser$Html$Attributes$style, 'display', 'block') : A2($gren_lang$browser$Html$Attributes$style, 'display', 'none');
	var ulAttrs = _Utils_ap(config.ulAttrs, [ displayStyle ]);
	return A2($gren_lang$browser$Html$ul, ulAttrs, A2($gren_lang$core$Array$indexedMap, A2($author$project$AutoDropdown$viewItem, config, state), items));
};
var $author$project$AutoDropdown$view = F3($author$project$AutoDropdown$view$);
var $author$project$View$render_country_input = function(model) {
	return A2($gren_lang$browser$Html$div, [ $gren_lang$browser$Html$Attributes$class('text-input-field'), $gren_lang$browser$Html$Attributes$id('input-container') ], [ A2($gren_lang$browser$Html$div, [ $gren_lang$browser$Html$Attributes$class('search-input-wrapper') ], [ $author$project$View$render_search_text_input(model), $author$project$View$render_clear_icon_button(model), $author$project$View$render_search_icon_button(model) ]), $author$project$AutoDropdown$view$($author$project$View$dropdownConfig, model.dropdownState, model.suggestions) ]);
};
var $author$project$View$render_empty_country_data = A2($gren_lang$browser$Html$div, [  ], [ $gren_lang$browser$Html$text('The results will appear here.') ]);
var $author$project$View$render_content = function(model) {
	return A2($gren_lang$browser$Html$div, [ $gren_lang$browser$Html$Attributes$class('main-container') ], [ A2($gren_lang$browser$Html$div, [  ], [ A2($gren_lang$browser$Html$h3, [  ], [ $gren_lang$browser$Html$text('Enter the name of any country, in English') ]) ]), $author$project$View$render_country_input(model), ($gren_lang$core$Array$length(model.foundCountries) === 0) ? $author$project$View$render_empty_country_data : $author$project$View$render_countries_data(model) ]);
};
var $gren_lang$browser$Html$h4 = $gren_lang$browser$Html$node('h4');
var $author$project$View$render_disclaimer = A2($gren_lang$browser$Html$div, [  ], [ A2($gren_lang$browser$Html$h4, [  ], [ $gren_lang$browser$Html$text('Disclaimer') ]), A2($gren_lang$browser$Html$div, [ $gren_lang$browser$Html$Attributes$class('disclaimer') ], [ $gren_lang$browser$Html$text('This data is for example purposes only. Do not rely on it.') ]), A2($gren_lang$browser$Html$div, [ $gren_lang$browser$Html$Attributes$class('disclaimer') ], [ $gren_lang$browser$Html$text('This data was generated by the Qwen3-Max LLM on December 7, 2025.') ]), A2($gren_lang$browser$Html$div, [ $gren_lang$browser$Html$Attributes$class('disclaimer') ], [ $gren_lang$browser$Html$text('The LLM stated:') ]), A2($gren_lang$browser$Html$div, [ $gren_lang$browser$Html$Attributes$class('disclaimer') ], [ $gren_lang$browser$Html$text('[This is] the requested data for all 195 recognized sovereign states\n(193 UN member states + 2 observer states: Vatican City and Palestine),\nbased on the latest reliable data as of mid-2024 to early 2025.\nPopulation figures are approximate and sourced from the United Nations,\nWorld Bank, and other reputable demographic sources.') ]) ]);
var $author$project$View$view = function(model) {
	return { body: [ $author$project$View$render_content(model), $author$project$View$render_disclaimer ], title: 'AutoDropdown Example' };
};
var $author$project$Main$main = $gren_lang$browser$Browser$document({ init: $author$project$Main$init, subscriptions: function(_v0) {
		return $gren_lang$core$Platform$Sub$none;
	}, update: $author$project$Update$update, view: $author$project$View$view });
_Platform_export({'Main':{'init':$author$project$Main$main($gren_lang$core$Json$Decode$succeed({  }))}});}(this.module ? this.module.exports : this));