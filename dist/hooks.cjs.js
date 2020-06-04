'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex
}

var _inheritsLoose = _interopDefault(
  require('@babel/runtime/helpers/inheritsLoose')
)
var _assertThisInitialized = _interopDefault(
  require('@babel/runtime/helpers/assertThisInitialized')
)
var _extends = _interopDefault(require('@babel/runtime/helpers/extends'))
var _objectWithoutPropertiesLoose = _interopDefault(
  require('@babel/runtime/helpers/objectWithoutPropertiesLoose')
)
var React = require('react')
var React__default = _interopDefault(React)
var ReactDOM = _interopDefault(require('react-dom'))
var _createClass = _interopDefault(
  require('@babel/runtime/helpers/createClass')
)

var bugfixes = undefined
var applyAnimatedValues = undefined
var colorNames = []
var requestFrame = function requestFrame(cb) {
  return typeof window !== 'undefined' && window.requestAnimationFrame(cb)
}
var cancelFrame = function cancelFrame(cb) {
  return typeof window !== 'undefined' && window.cancelAnimationFrame(cb)
}
var interpolation = undefined
var now = function now() {
  return Date.now()
}
var defaultElement = undefined
var createAnimatedStyle = undefined
var injectApplyAnimatedValues = function injectApplyAnimatedValues(
  fn,
  transform
) {
  return (applyAnimatedValues = {
    fn: fn,
    transform: transform,
  })
}
var injectColorNames = function injectColorNames(names) {
  return (colorNames = names)
}
var injectBugfixes = function injectBugfixes(fn) {
  return (bugfixes = fn)
}
var injectInterpolation = function injectInterpolation(cls) {
  return (interpolation = cls)
}
var injectFrame = function injectFrame(raf, caf) {
  var _ref

  return (
    (_ref = [raf, caf]), (requestFrame = _ref[0]), (cancelFrame = _ref[1]), _ref
  )
}
var injectNow = function injectNow(nowFn) {
  return (now = nowFn)
}
var injectDefaultElement = function injectDefaultElement(el) {
  return (defaultElement = el)
}
var injectCreateAnimatedStyle = function injectCreateAnimatedStyle(factory) {
  return (createAnimatedStyle = factory)
}

var Globals = /*#__PURE__*/ Object.freeze({
  get bugfixes() {
    return bugfixes
  },
  get applyAnimatedValues() {
    return applyAnimatedValues
  },
  get colorNames() {
    return colorNames
  },
  get requestFrame() {
    return requestFrame
  },
  get cancelFrame() {
    return cancelFrame
  },
  get interpolation() {
    return interpolation
  },
  get now() {
    return now
  },
  get defaultElement() {
    return defaultElement
  },
  get createAnimatedStyle() {
    return createAnimatedStyle
  },
  injectApplyAnimatedValues: injectApplyAnimatedValues,
  injectColorNames: injectColorNames,
  injectBugfixes: injectBugfixes,
  injectInterpolation: injectInterpolation,
  injectFrame: injectFrame,
  injectNow: injectNow,
  injectDefaultElement: injectDefaultElement,
  injectCreateAnimatedStyle: injectCreateAnimatedStyle,
})

var Animated =
  /*#__PURE__*/
  (function() {
    function Animated() {}

    var _proto = Animated.prototype

    _proto.attach = function attach() {}

    _proto.detach = function detach() {}

    _proto.getValue = function getValue() {}

    _proto.getAnimatedValue = function getAnimatedValue() {
      return this.getValue()
    }

    _proto.addChild = function addChild(child) {}

    _proto.removeChild = function removeChild(child) {}

    _proto.getChildren = function getChildren() {
      return []
    }

    return Animated
  })()

var getValues = function getValues(object) {
  return Object.keys(object).map(function(k) {
    return object[k]
  })
}

var AnimatedWithChildren =
  /*#__PURE__*/
  (function(_Animated) {
    _inheritsLoose(AnimatedWithChildren, _Animated)

    function AnimatedWithChildren() {
      var _this

      for (
        var _len = arguments.length, args = new Array(_len), _key = 0;
        _key < _len;
        _key++
      ) {
        args[_key] = arguments[_key]
      }

      _this = _Animated.call.apply(_Animated, [this].concat(args)) || this
      _this.children = []

      _this.getChildren = function() {
        return _this.children
      }

      _this.getPayload = function(index) {
        if (index === void 0) {
          index = undefined
        }

        return index !== void 0 && _this.payload
          ? _this.payload[index]
          : _this.payload ||
              _assertThisInitialized(_assertThisInitialized(_this))
      }

      return _this
    }

    var _proto = AnimatedWithChildren.prototype

    _proto.addChild = function addChild(child) {
      if (this.children.length === 0) this.attach()
      this.children.push(child)
    }

    _proto.removeChild = function removeChild(child) {
      var index = this.children.indexOf(child)
      this.children.splice(index, 1)
      if (this.children.length === 0) this.detach()
    }

    return AnimatedWithChildren
  })(Animated)
var AnimatedArrayWithChildren =
  /*#__PURE__*/
  (function(_AnimatedWithChildren) {
    _inheritsLoose(AnimatedArrayWithChildren, _AnimatedWithChildren)

    function AnimatedArrayWithChildren() {
      var _this2

      for (
        var _len2 = arguments.length, args = new Array(_len2), _key2 = 0;
        _key2 < _len2;
        _key2++
      ) {
        args[_key2] = arguments[_key2]
      }

      _this2 =
        _AnimatedWithChildren.call.apply(
          _AnimatedWithChildren,
          [this].concat(args)
        ) || this
      _this2.payload = []

      _this2.getAnimatedValue = function() {
        return _this2.getValue()
      }

      _this2.attach = function() {
        return _this2.payload.forEach(function(p) {
          return (
            p instanceof Animated &&
            p.addChild(_assertThisInitialized(_assertThisInitialized(_this2)))
          )
        })
      }

      _this2.detach = function() {
        return _this2.payload.forEach(function(p) {
          return (
            p instanceof Animated &&
            p.removeChild(
              _assertThisInitialized(_assertThisInitialized(_this2))
            )
          )
        })
      }

      return _this2
    }

    return AnimatedArrayWithChildren
  })(AnimatedWithChildren)
var AnimatedObjectWithChildren =
  /*#__PURE__*/
  (function(_AnimatedWithChildren2) {
    _inheritsLoose(AnimatedObjectWithChildren, _AnimatedWithChildren2)

    function AnimatedObjectWithChildren() {
      var _this3

      for (
        var _len3 = arguments.length, args = new Array(_len3), _key3 = 0;
        _key3 < _len3;
        _key3++
      ) {
        args[_key3] = arguments[_key3]
      }

      _this3 =
        _AnimatedWithChildren2.call.apply(
          _AnimatedWithChildren2,
          [this].concat(args)
        ) || this
      _this3.payload = {}

      _this3.getAnimatedValue = function() {
        return _this3.getValue(true)
      }

      _this3.attach = function() {
        return getValues(_this3.payload).forEach(function(s) {
          return (
            s instanceof Animated &&
            s.addChild(_assertThisInitialized(_assertThisInitialized(_this3)))
          )
        })
      }

      _this3.detach = function() {
        return getValues(_this3.payload).forEach(function(s) {
          return (
            s instanceof Animated &&
            s.removeChild(
              _assertThisInitialized(_assertThisInitialized(_this3))
            )
          )
        })
      }

      return _this3
    }

    var _proto2 = AnimatedObjectWithChildren.prototype

    _proto2.getValue = function getValue(animated) {
      if (animated === void 0) {
        animated = false
      }

      var payload = {}

      for (var key in this.payload) {
        var value = this.payload[key]
        if (animated && !(value instanceof Animated)) continue
        payload[key] =
          value instanceof Animated
            ? value[animated ? 'getAnimatedValue' : 'getValue']()
            : value
      }

      return payload
    }

    return AnimatedObjectWithChildren
  })(AnimatedWithChildren)

var AnimatedStyle =
  /*#__PURE__*/
  (function(_AnimatedObjectWithCh) {
    _inheritsLoose(AnimatedStyle, _AnimatedObjectWithCh)

    function AnimatedStyle(style) {
      var _this

      _this = _AnimatedObjectWithCh.call(this) || this
      style = style || {}
      if (style.transform && !(style.transform instanceof Animated))
        style = applyAnimatedValues.transform(style)
      _this.payload = style
      return _this
    }

    return AnimatedStyle
  })(AnimatedObjectWithChildren)

// http://www.w3.org/TR/css3-color/#svg-color
var colors = {
  transparent: 0x00000000,
  aliceblue: 0xf0f8ffff,
  antiquewhite: 0xfaebd7ff,
  aqua: 0x00ffffff,
  aquamarine: 0x7fffd4ff,
  azure: 0xf0ffffff,
  beige: 0xf5f5dcff,
  bisque: 0xffe4c4ff,
  black: 0x000000ff,
  blanchedalmond: 0xffebcdff,
  blue: 0x0000ffff,
  blueviolet: 0x8a2be2ff,
  brown: 0xa52a2aff,
  burlywood: 0xdeb887ff,
  burntsienna: 0xea7e5dff,
  cadetblue: 0x5f9ea0ff,
  chartreuse: 0x7fff00ff,
  chocolate: 0xd2691eff,
  coral: 0xff7f50ff,
  cornflowerblue: 0x6495edff,
  cornsilk: 0xfff8dcff,
  crimson: 0xdc143cff,
  cyan: 0x00ffffff,
  darkblue: 0x00008bff,
  darkcyan: 0x008b8bff,
  darkgoldenrod: 0xb8860bff,
  darkgray: 0xa9a9a9ff,
  darkgreen: 0x006400ff,
  darkgrey: 0xa9a9a9ff,
  darkkhaki: 0xbdb76bff,
  darkmagenta: 0x8b008bff,
  darkolivegreen: 0x556b2fff,
  darkorange: 0xff8c00ff,
  darkorchid: 0x9932ccff,
  darkred: 0x8b0000ff,
  darksalmon: 0xe9967aff,
  darkseagreen: 0x8fbc8fff,
  darkslateblue: 0x483d8bff,
  darkslategray: 0x2f4f4fff,
  darkslategrey: 0x2f4f4fff,
  darkturquoise: 0x00ced1ff,
  darkviolet: 0x9400d3ff,
  deeppink: 0xff1493ff,
  deepskyblue: 0x00bfffff,
  dimgray: 0x696969ff,
  dimgrey: 0x696969ff,
  dodgerblue: 0x1e90ffff,
  firebrick: 0xb22222ff,
  floralwhite: 0xfffaf0ff,
  forestgreen: 0x228b22ff,
  fuchsia: 0xff00ffff,
  gainsboro: 0xdcdcdcff,
  ghostwhite: 0xf8f8ffff,
  gold: 0xffd700ff,
  goldenrod: 0xdaa520ff,
  gray: 0x808080ff,
  green: 0x008000ff,
  greenyellow: 0xadff2fff,
  grey: 0x808080ff,
  honeydew: 0xf0fff0ff,
  hotpink: 0xff69b4ff,
  indianred: 0xcd5c5cff,
  indigo: 0x4b0082ff,
  ivory: 0xfffff0ff,
  khaki: 0xf0e68cff,
  lavender: 0xe6e6faff,
  lavenderblush: 0xfff0f5ff,
  lawngreen: 0x7cfc00ff,
  lemonchiffon: 0xfffacdff,
  lightblue: 0xadd8e6ff,
  lightcoral: 0xf08080ff,
  lightcyan: 0xe0ffffff,
  lightgoldenrodyellow: 0xfafad2ff,
  lightgray: 0xd3d3d3ff,
  lightgreen: 0x90ee90ff,
  lightgrey: 0xd3d3d3ff,
  lightpink: 0xffb6c1ff,
  lightsalmon: 0xffa07aff,
  lightseagreen: 0x20b2aaff,
  lightskyblue: 0x87cefaff,
  lightslategray: 0x778899ff,
  lightslategrey: 0x778899ff,
  lightsteelblue: 0xb0c4deff,
  lightyellow: 0xffffe0ff,
  lime: 0x00ff00ff,
  limegreen: 0x32cd32ff,
  linen: 0xfaf0e6ff,
  magenta: 0xff00ffff,
  maroon: 0x800000ff,
  mediumaquamarine: 0x66cdaaff,
  mediumblue: 0x0000cdff,
  mediumorchid: 0xba55d3ff,
  mediumpurple: 0x9370dbff,
  mediumseagreen: 0x3cb371ff,
  mediumslateblue: 0x7b68eeff,
  mediumspringgreen: 0x00fa9aff,
  mediumturquoise: 0x48d1ccff,
  mediumvioletred: 0xc71585ff,
  midnightblue: 0x191970ff,
  mintcream: 0xf5fffaff,
  mistyrose: 0xffe4e1ff,
  moccasin: 0xffe4b5ff,
  navajowhite: 0xffdeadff,
  navy: 0x000080ff,
  oldlace: 0xfdf5e6ff,
  olive: 0x808000ff,
  olivedrab: 0x6b8e23ff,
  orange: 0xffa500ff,
  orangered: 0xff4500ff,
  orchid: 0xda70d6ff,
  palegoldenrod: 0xeee8aaff,
  palegreen: 0x98fb98ff,
  paleturquoise: 0xafeeeeff,
  palevioletred: 0xdb7093ff,
  papayawhip: 0xffefd5ff,
  peachpuff: 0xffdab9ff,
  peru: 0xcd853fff,
  pink: 0xffc0cbff,
  plum: 0xdda0ddff,
  powderblue: 0xb0e0e6ff,
  purple: 0x800080ff,
  rebeccapurple: 0x663399ff,
  red: 0xff0000ff,
  rosybrown: 0xbc8f8fff,
  royalblue: 0x4169e1ff,
  saddlebrown: 0x8b4513ff,
  salmon: 0xfa8072ff,
  sandybrown: 0xf4a460ff,
  seagreen: 0x2e8b57ff,
  seashell: 0xfff5eeff,
  sienna: 0xa0522dff,
  silver: 0xc0c0c0ff,
  skyblue: 0x87ceebff,
  slateblue: 0x6a5acdff,
  slategray: 0x708090ff,
  slategrey: 0x708090ff,
  snow: 0xfffafaff,
  springgreen: 0x00ff7fff,
  steelblue: 0x4682b4ff,
  tan: 0xd2b48cff,
  teal: 0x008080ff,
  thistle: 0xd8bfd8ff,
  tomato: 0xff6347ff,
  turquoise: 0x40e0d0ff,
  violet: 0xee82eeff,
  wheat: 0xf5deb3ff,
  white: 0xffffffff,
  whitesmoke: 0xf5f5f5ff,
  yellow: 0xffff00ff,
  yellowgreen: 0x9acd32ff,
}

var Interpolation =
  /*#__PURE__*/
  (function() {
    function Interpolation() {}

    // Default config = config, args
    // Short config   = range, output, extrapolate
    Interpolation.create = function create(config, output, extra) {
      if (typeof config === 'function') return config
      else if (
        interpolation &&
        config.output &&
        typeof config.output[0] === 'string'
      )
        return interpolation(config)
      else if (Array.isArray(config))
        return Interpolation.create({
          range: config,
          output: output,
          extrapolate: extra || 'extend',
        })
      var outputRange = config.output
      var inputRange = config.range || [0, 1]

      var easing =
        config.easing ||
        function(t) {
          return t
        }

      var extrapolateLeft = 'extend'
      var map = config.map
      if (config.extrapolateLeft !== undefined)
        extrapolateLeft = config.extrapolateLeft
      else if (config.extrapolate !== undefined)
        extrapolateLeft = config.extrapolate
      var extrapolateRight = 'extend'
      if (config.extrapolateRight !== undefined)
        extrapolateRight = config.extrapolateRight
      else if (config.extrapolate !== undefined)
        extrapolateRight = config.extrapolate
      return function(input) {
        var range = findRange(input, inputRange)
        return interpolate(
          input,
          inputRange[range],
          inputRange[range + 1],
          outputRange[range],
          outputRange[range + 1],
          easing,
          extrapolateLeft,
          extrapolateRight,
          map
        )
      }
    }

    return Interpolation
  })()

function interpolate(
  input,
  inputMin,
  inputMax,
  outputMin,
  outputMax,
  easing,
  extrapolateLeft,
  extrapolateRight,
  map
) {
  var result = map ? map(input) : input // Extrapolate

  if (result < inputMin) {
    if (extrapolateLeft === 'identity') return result
    else if (extrapolateLeft === 'clamp') result = inputMin
  }

  if (result > inputMax) {
    if (extrapolateRight === 'identity') return result
    else if (extrapolateRight === 'clamp') result = inputMax
  }

  if (outputMin === outputMax) return outputMin
  if (inputMin === inputMax) return input <= inputMin ? outputMin : outputMax // Input Range

  if (inputMin === -Infinity) result = -result
  else if (inputMax === Infinity) result = result - inputMin
  else result = (result - inputMin) / (inputMax - inputMin) // Easing

  result = easing(result) // Output Range

  if (outputMin === -Infinity) result = -result
  else if (outputMax === Infinity) result = result + outputMin
  else result = result * (outputMax - outputMin) + outputMin
  return result
}

function findRange(input, inputRange) {
  for (var i = 1; i < inputRange.length - 1; ++i) {
    if (inputRange[i] >= input) break
  }

  return i - 1
}

// const INTEGER = '[-+]?\\d+';
var NUMBER = '[-+]?\\d*\\.?\\d+'
var PERCENTAGE = NUMBER + '%'

function call() {
  return (
    '\\(\\s*(' +
    Array.prototype.slice.call(arguments).join(')\\s*,\\s*(') +
    ')\\s*\\)'
  )
}

var rgb = new RegExp('rgb' + call(NUMBER, NUMBER, NUMBER))
var rgba = new RegExp('rgba' + call(NUMBER, NUMBER, NUMBER, NUMBER))
var hsl = new RegExp('hsl' + call(NUMBER, PERCENTAGE, PERCENTAGE))
var hsla = new RegExp('hsla' + call(NUMBER, PERCENTAGE, PERCENTAGE, NUMBER))
var hex3 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/
var hex4 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/
var hex6 = /^#([0-9a-fA-F]{6})$/
var hex8 = /^#([0-9a-fA-F]{8})$/

/*
https://github.com/react-community/normalize-css-color

BSD 3-Clause License

Copyright (c) 2016, React Community
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

* Neither the name of the copyright holder nor the names of its
  contributors may be used to endorse or promote products derived from
  this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
function normalizeColor(color) {
  var match

  if (typeof color === 'number') {
    return color >>> 0 === color && color >= 0 && color <= 0xffffffff
      ? color
      : null
  } // Ordered based on occurrences on Facebook codebase

  if ((match = hex6.exec(color))) return parseInt(match[1] + 'ff', 16) >>> 0
  if (colors.hasOwnProperty(color)) return colors[color]

  if ((match = rgb.exec(color))) {
    return (
      ((parse255(match[1]) << 24) | // r
      (parse255(match[2]) << 16) | // g
      (parse255(match[3]) << 8) | // b
        0x000000ff) >>> // a
      0
    )
  }

  if ((match = rgba.exec(color))) {
    return (
      ((parse255(match[1]) << 24) | // r
      (parse255(match[2]) << 16) | // g
      (parse255(match[3]) << 8) | // b
        parse1(match[4])) >>> // a
      0
    )
  }

  if ((match = hex3.exec(color))) {
    return (
      parseInt(
        match[1] +
        match[1] + // r
        match[2] +
        match[2] + // g
        match[3] +
        match[3] + // b
          'ff', // a
        16
      ) >>> 0
    )
  } // https://drafts.csswg.org/css-color-4/#hex-notation

  if ((match = hex8.exec(color))) return parseInt(match[1], 16) >>> 0

  if ((match = hex4.exec(color))) {
    return (
      parseInt(
        match[1] +
        match[1] + // r
        match[2] +
        match[2] + // g
        match[3] +
        match[3] + // b
          match[4] +
          match[4], // a
        16
      ) >>> 0
    )
  }

  if ((match = hsl.exec(color))) {
    return (
      (hslToRgb(
        parse360(match[1]), // h
        parsePercentage(match[2]), // s
        parsePercentage(match[3]) // l
      ) |
        0x000000ff) >>> // a
      0
    )
  }

  if ((match = hsla.exec(color))) {
    return (
      (hslToRgb(
        parse360(match[1]), // h
        parsePercentage(match[2]), // s
        parsePercentage(match[3]) // l
      ) |
        parse1(match[4])) >>> // a
      0
    )
  }

  return null
}

function hue2rgb(p, q, t) {
  if (t < 0) t += 1
  if (t > 1) t -= 1
  if (t < 1 / 6) return p + (q - p) * 6 * t
  if (t < 1 / 2) return q
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
  return p
}

function hslToRgb(h, s, l) {
  var q = l < 0.5 ? l * (1 + s) : l + s - l * s
  var p = 2 * l - q
  var r = hue2rgb(p, q, h + 1 / 3)
  var g = hue2rgb(p, q, h)
  var b = hue2rgb(p, q, h - 1 / 3)
  return (
    (Math.round(r * 255) << 24) |
    (Math.round(g * 255) << 16) |
    (Math.round(b * 255) << 8)
  )
}

function parse255(str) {
  var int = parseInt(str, 10)
  if (int < 0) return 0
  if (int > 255) return 255
  return int
}

function parse360(str) {
  var int = parseFloat(str)
  return (((int % 360) + 360) % 360) / 360
}

function parse1(str) {
  var num = parseFloat(str)
  if (num < 0) return 0
  if (num > 1) return 255
  return Math.round(num * 255)
}

function parsePercentage(str) {
  // parseFloat conveniently ignores the final %
  var int = parseFloat(str)
  if (int < 0) return 0
  if (int > 100) return 1
  return int / 100
}

function colorToRgba(input) {
  var int32Color = normalizeColor(input)
  if (int32Color === null) return input
  int32Color = int32Color || 0
  var r = (int32Color & 0xff000000) >>> 24
  var g = (int32Color & 0x00ff0000) >>> 16
  var b = (int32Color & 0x0000ff00) >>> 8
  var a = (int32Color & 0x000000ff) / 255
  return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')'
} // Problem: https://github.com/animatedjs/animated/pull/102
// Solution: https://stackoverflow.com/questions/638565/parsing-scientific-notation-sensibly/658662

var stringShapeRegex = /[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g // Covers rgb, rgba, hsl, hsla
// Taken from https://gist.github.com/olmokramer/82ccce673f86db7cda5e

var colorRegex = /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))/gi // Covers color names (transparent, blue, etc.)

var colorNamesRegex = new RegExp('(' + Object.keys(colors).join('|') + ')', 'g')
/**
 * Supports string shapes by extracting numbers so new values can be computed,
 * and recombines those values into new strings of the same shape.  Supports
 * things like:
 *
 *   rgba(123, 42, 99, 0.36)           // colors
 *   -45deg                            // values with units
 *   0 2px 2px 0px rgba(0, 0, 0, 0.12) // box shadows
 */

function createInterpolation(config) {
  // Replace colors with rgba
  var outputRange = config.output
    .map(function(rangeValue) {
      return rangeValue.replace(colorRegex, colorToRgba)
    })
    .map(function(rangeValue) {
      return rangeValue.replace(colorNamesRegex, colorToRgba)
    }) // ->
  // [
  //   [0, 50],
  //   [100, 150],
  //   [200, 250],
  //   [0, 0.5],
  // ]

  var outputRanges = outputRange[0].match(stringShapeRegex).map(function() {
    return []
  })
  outputRange.forEach(function(value) {
    value.match(stringShapeRegex).forEach(function(number, i) {
      return outputRanges[i].push(+number)
    })
  })
  var interpolations = outputRange[0]
    .match(stringShapeRegex)
    .map(function(value, i) {
      return Interpolation.create(
        _extends({}, config, {
          output: outputRanges[i],
        })
      )
    })
  return function(input) {
    var i = 0
    return (
      outputRange[0] // 'rgba(0, 100, 200, 0)'
        // ->
        // 'rgba(${interpolations[0](input)}, ${interpolations[1](input)}, ...'
        .replace(stringShapeRegex, function() {
          return interpolations[i++](input)
        }) // rgba requires that the r,g,b are integers.... so we want to round them, but we *dont* want to
        // round the opacity (4th column).
        .replace(
          /rgba\(([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+)\)/gi,
          function(_, p1, p2, p3, p4) {
            return (
              'rgba(' +
              Math.round(p1) +
              ', ' +
              Math.round(p2) +
              ', ' +
              Math.round(p3) +
              ', ' +
              p4 +
              ')'
            )
          }
        )
    )
  }
}

var AnimatedInterpolation =
  /*#__PURE__*/
  (function(_AnimatedArrayWithChi) {
    _inheritsLoose(AnimatedInterpolation, _AnimatedArrayWithChi)

    function AnimatedInterpolation(parents, _config, _arg) {
      var _this

      _this = _AnimatedArrayWithChi.call(this) || this

      _this.getValue = function() {
        var _this2

        return (_this2 = _this).calc.apply(
          _this2,
          _this.payload.map(function(value) {
            return value.getValue()
          })
        )
      }

      _this.updateConfig = function(config, arg) {
        return (_this.calc = Interpolation.create(config, arg))
      }

      _this.interpolate = function(config, arg) {
        return new AnimatedInterpolation(
          _assertThisInitialized(_assertThisInitialized(_this)),
          config,
          arg
        )
      }

      _this.payload = // AnimatedArrays should unfold, except AnimatedInterpolation which is taken as is
        parents instanceof AnimatedArrayWithChildren && !parents.updateConfig
          ? parents.payload
          : Array.isArray(parents)
          ? parents
          : [parents]
      _this.calc = Interpolation.create(_config, _arg)
      return _this
    }

    return AnimatedInterpolation
  })(AnimatedArrayWithChildren)
var interpolate$1 = function interpolate(parents, config, arg) {
  return parents && new AnimatedInterpolation(parents, config, arg)
}

/**
 * Animated works by building a directed acyclic graph of dependencies
 * transparently when you render your Animated components.
 *
 *               new Animated.Value(0)
 *     .interpolate()        .interpolate()    new Animated.Value(1)
 *         opacity               translateY      scale
 *          style                         transform
 *         View#234                         style
 *                                         View#123
 *
 * A) Top Down phase
 * When an Animated.Value is updated, we recursively go down through this
 * graph in order to find leaf nodes: the views that we flag as needing
 * an update.
 *
 * B) Bottom Up phase
 * When a view is flagged as needing an update, we recursively go back up
 * in order to build the new value that it needs. The reason why we need
 * this two-phases process is to deal with composite props such as
 * transform which can receive values from multiple parents.
 */

function findAnimatedStyles(node, styles) {
  if (typeof node.update === 'function') styles.add(node)
  else
    node.getChildren().forEach(function(child) {
      return findAnimatedStyles(child, styles)
    })
}
/**
 * Standard value for driving animations.  One `Animated.Value` can drive
 * multiple properties in a synchronized fashion, but can only be driven by one
 * mechanism at a time.  Using a new mechanism (e.g. starting a new animation,
 * or calling `setValue`) will stop any previous ones.
 */

var AnimatedValue =
  /*#__PURE__*/
  (function(_AnimatedWithChildren) {
    _inheritsLoose(AnimatedValue, _AnimatedWithChildren)

    function AnimatedValue(_value) {
      var _this

      _this = _AnimatedWithChildren.call(this) || this

      _this.setValue = function(value, flush) {
        if (flush === void 0) {
          flush = true
        }

        _this.value = value
        if (flush) _this.flush()
      }

      _this.getValue = function() {
        return _this.value
      }

      _this.updateStyles = function() {
        return findAnimatedStyles(
          _assertThisInitialized(_assertThisInitialized(_this)),
          _this.animatedStyles
        )
      }

      _this.updateValue = function(value) {
        return _this.flush((_this.value = value))
      }

      _this.interpolate = function(config, arg) {
        return new AnimatedInterpolation(
          _assertThisInitialized(_assertThisInitialized(_this)),
          config,
          arg
        )
      }

      _this.value = _value
      _this.animatedStyles = new Set()
      _this.done = false
      _this.startPosition = _value
      _this.lastPosition = _value
      _this.lastVelocity = undefined
      _this.lastTime = undefined
      _this.controller = undefined
      return _this
    }

    var _proto = AnimatedValue.prototype

    _proto.flush = function flush() {
      if (this.animatedStyles.size === 0) this.updateStyles()
      this.animatedStyles.forEach(function(animatedStyle) {
        return animatedStyle.update()
      })
    }

    _proto.prepare = function prepare(controller) {
      // Values stay loyal to their original controller, this is also a way to
      // detect trailing values originating from a foreign controller
      if (this.controller === undefined) this.controller = controller

      if (this.controller === controller) {
        this.startPosition = this.value
        this.lastPosition = this.value
        this.lastVelocity = controller.isActive ? this.lastVelocity : undefined
        this.lastTime = controller.isActive ? this.lastTime : undefined
        this.done = false
        this.animatedStyles.clear()
      }
    }

    return AnimatedValue
  })(AnimatedWithChildren)

var AnimatedArray =
  /*#__PURE__*/
  (function(_AnimatedArrayWithChi) {
    _inheritsLoose(AnimatedArray, _AnimatedArrayWithChi)

    function AnimatedArray(array) {
      var _this

      _this = _AnimatedArrayWithChi.call(this) || this

      _this.setValue = function(value, flush) {
        if (flush === void 0) {
          flush = true
        }

        if (Array.isArray(value)) {
          if (value.length === _this.payload.length)
            value.forEach(function(v, i) {
              return _this.payload[i].setValue(v, flush)
            })
        } else
          _this.payload.forEach(function(v, i) {
            return _this.payload[i].setValue(value, flush)
          })
      }

      _this.getValue = function() {
        return _this.payload.map(function(v) {
          return v.getValue()
        })
      }

      _this.interpolate = function(config, arg) {
        return new AnimatedInterpolation(
          _assertThisInitialized(_assertThisInitialized(_this)),
          config,
          arg
        )
      }

      _this.payload = array.map(function(n) {
        return new AnimatedValue(n)
      })
      return _this
    }

    return AnimatedArray
  })(AnimatedArrayWithChildren)

function withDefault(value, defaultValue) {
  return value === undefined || value === null ? defaultValue : value
}
function toArray(a) {
  return a !== void 0 ? (Array.isArray(a) ? a : [a]) : []
}
function shallowEqual(a, b) {
  if (typeof a !== typeof b) return false
  if (typeof a === 'string' || typeof a === 'number') return a === b
  var i

  for (i in a) {
    if (!(i in b)) return false
  }

  for (i in b) {
    if (a[i] !== b[i]) return false
  }

  return i === void 0 ? a === b : true
}
function callProp(obj) {
  for (
    var _len = arguments.length,
      args = new Array(_len > 1 ? _len - 1 : 0),
      _key = 1;
    _key < _len;
    _key++
  ) {
    args[_key - 1] = arguments[_key]
  }

  return typeof obj === 'function' ? obj.apply(void 0, args) : obj
}
function getValues$1(object) {
  return Object.keys(object).map(function(k) {
    return object[k]
  })
}
function getForwardProps(props) {
  var to = props.to,
    from = props.from,
    config = props.config,
    native = props.native,
    onStart = props.onStart,
    onRest = props.onRest,
    onFrame = props.onFrame,
    children = props.children,
    reset = props.reset,
    reverse = props.reverse,
    force = props.force,
    immediate = props.immediate,
    impl = props.impl,
    inject = props.inject,
    delay = props.delay,
    attach = props.attach,
    destroyed = props.destroyed,
    interpolateTo = props.interpolateTo,
    autoStart = props.autoStart,
    ref = props.ref,
    forward = _objectWithoutPropertiesLoose(props, [
      'to',
      'from',
      'config',
      'native',
      'onStart',
      'onRest',
      'onFrame',
      'children',
      'reset',
      'reverse',
      'force',
      'immediate',
      'impl',
      'inject',
      'delay',
      'attach',
      'destroyed',
      'interpolateTo',
      'autoStart',
      'ref',
    ])

  return forward
}
function interpolateTo(props) {
  var forward = getForwardProps(props)
  var rest = Object.keys(props).reduce(function(a, k) {
    var _extends2

    return forward[k] !== void 0
      ? a
      : _extends(
          {},
          a,
          ((_extends2 = {}), (_extends2[k] = props[k]), _extends2)
        )
  }, {})
  return _extends(
    {
      to: forward,
    },
    rest
  )
}
function convertToAnimatedValue(acc, _ref) {
  var _extends3

  var name = _ref[0],
    value = _ref[1]
  return _extends(
    {},
    acc,
    ((_extends3 = {}),
    (_extends3[name] = new (Array.isArray(value)
      ? AnimatedArray
      : AnimatedValue)(value)),
    _extends3)
  )
}
function convertValues(props) {
  var from = props.from,
    to = props.to,
    native = props.native
  var allProps = Object.entries(_extends({}, from, to))
  return native
    ? allProps.reduce(convertToAnimatedValue, {})
    : _extends({}, from, to)
}
function handleRef(ref, forward) {
  if (forward) {
    // If it's a function, assume it's a ref callback
    if (typeof forward === 'function') forward(ref)
    else if (typeof forward === 'object') {
      // If it's an object and has a 'current' property, assume it's a ref object
      forward.current = ref
    }
  }

  return ref
}

var check = function check(value) {
  return value === 'auto'
}

var overwrite = function overwrite(width, height) {
  return function(acc, _ref) {
    var _extends2

    var name = _ref[0],
      value = _ref[1]
    return _extends(
      {},
      acc,
      ((_extends2 = {}),
      (_extends2[name] =
        value === 'auto' ? (~name.indexOf('height') ? height : width) : value),
      _extends2)
    )
  }
}

function fixAuto(props, callback) {
  var from = props.from,
    to = props.to,
    children = props.children // Dry-route props back if nothing's using 'auto' in there
  // TODO: deal with "null"

  if (!(getValues$1(to).some(check) || getValues$1(from).some(check))) return // Fetch render v-dom

  var element = children(convertValues(props)) // A spring can return undefined/null, check against that (#153)

  if (!element) return // Or it could be an array (#346) ...

  if (Array.isArray(element))
    element = {
      type: 'div',
      props: {
        children: element,
      }, // Extract styles
    }
  var elementStyles = element.props.style // Return v.dom with injected ref

  return React__default.createElement(
    element.type,
    _extends(
      {
        key: element.key ? element.key : undefined,
      },
      element.props,
      {
        style: _extends({}, elementStyles, {
          position: 'absolute',
          visibility: 'hidden',
        }),
        ref: function ref(_ref2) {
          if (_ref2) {
            // Once it's rendered out, fetch bounds (minus padding/margin/borders)
            var node = ReactDOM.findDOMNode(_ref2)
            var width, height
            var cs = getComputedStyle(node)

            if (cs.boxSizing === 'border-box') {
              width = node.offsetWidth
              height = node.offsetHeight
            } else {
              var paddingX =
                parseFloat(cs.paddingLeft || 0) +
                parseFloat(cs.paddingRight || 0)
              var paddingY =
                parseFloat(cs.paddingTop || 0) +
                parseFloat(cs.paddingBottom || 0)
              var borderX =
                parseFloat(cs.borderLeftWidth || 0) +
                parseFloat(cs.borderRightWidth || 0)
              var borderY =
                parseFloat(cs.borderTopWidth || 0) +
                parseFloat(cs.borderBottomWidth || 0)
              width = node.offsetWidth - paddingX - borderX
              height = node.offsetHeight - paddingY - borderY
            }

            var convert = overwrite(width, height)
            callback(
              _extends({}, props, {
                from: Object.entries(from).reduce(convert, from),
                to: Object.entries(to).reduce(convert, to),
              })
            )
          }
        },
      }
    )
  )
}

var isUnitlessNumber = {
  animationIterationCount: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  // SVG-related properties
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true,
}

var prefixKey = function prefixKey(prefix, key) {
  return prefix + key.charAt(0).toUpperCase() + key.substring(1)
}

var prefixes = ['Webkit', 'Ms', 'Moz', 'O']
isUnitlessNumber = Object.keys(isUnitlessNumber).reduce(function(acc, prop) {
  prefixes.forEach(function(prefix) {
    return (acc[prefixKey(prefix, prop)] = acc[prop])
  })
  return acc
}, isUnitlessNumber)

function dangerousStyleValue(name, value, isCustomProperty) {
  if (value == null || typeof value === 'boolean' || value === '') return ''
  if (
    !isCustomProperty &&
    typeof value === 'number' &&
    value !== 0 &&
    !(isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name])
  )
    return value + 'px' // Presumes implicit 'px' suffix for unitless numbers

  return ('' + value).trim()
}

var attributeCache = {}
injectCreateAnimatedStyle(function(style) {
  return new AnimatedStyle(style)
})
injectDefaultElement('div')
injectInterpolation(createInterpolation)
injectColorNames(colors)
injectBugfixes(fixAuto)
injectApplyAnimatedValues(
  function(instance, props) {
    if (instance.nodeType && instance.setAttribute !== undefined) {
      var style = props.style,
        children = props.children,
        scrollTop = props.scrollTop,
        scrollLeft = props.scrollLeft,
        attributes = _objectWithoutPropertiesLoose(props, [
          'style',
          'children',
          'scrollTop',
          'scrollLeft',
        ])

      if (scrollTop !== void 0) instance.scrollTop = scrollTop
      if (scrollLeft !== void 0) instance.scrollLeft = scrollLeft // Set textContent, if children is an animatable value

      if (children !== void 0) instance.textContent = children // Set styles ...

      for (var styleName in style) {
        if (!style.hasOwnProperty(styleName)) continue
        var isCustomProperty = styleName.indexOf('--') === 0
        var styleValue = dangerousStyleValue(
          styleName,
          style[styleName],
          isCustomProperty
        )
        if (styleName === 'float') styleName = 'cssFloat'
        if (isCustomProperty) instance.style.setProperty(styleName, styleValue)
        else instance.style[styleName] = styleValue
      } // Set attributes ...

      for (var name in attributes) {
        // Attributes are written in dash case
        var dashCase =
          attributeCache[name] ||
          (attributeCache[name] = name.replace(/([A-Z])/g, function(n) {
            return '-' + n.toLowerCase()
          }))
        if (typeof instance.getAttribute(dashCase) !== 'undefined')
          instance.setAttribute(dashCase, attributes[name])
      }
    } else return false
  },
  function(style) {
    return style
  }
)

var AnimatedProps =
  /*#__PURE__*/
  (function(_AnimatedObjectWithCh) {
    _inheritsLoose(AnimatedProps, _AnimatedObjectWithCh)

    function AnimatedProps(props, callback) {
      var _this

      _this = _AnimatedObjectWithCh.call(this) || this
      if (props.style)
        props = _extends({}, props, {
          style: createAnimatedStyle(props.style),
        })
      _this.payload = props
      _this.update = callback

      _this.attach()

      return _this
    }

    return AnimatedProps
  })(AnimatedObjectWithChildren)

function createAnimatedComponent(Component) {
  var AnimatedComponent =
    /*#__PURE__*/
    (function(_React$Component) {
      _inheritsLoose(AnimatedComponent, _React$Component)

      function AnimatedComponent(props) {
        var _this

        _this = _React$Component.call(this) || this

        _this.callback = function() {
          if (_this.node) {
            var didUpdate = applyAnimatedValues.fn(
              _this.node,
              _this.propsAnimated.getAnimatedValue(),
              _assertThisInitialized(_assertThisInitialized(_this))
            )
            if (didUpdate === false) _this.forceUpdate()
          }
        }

        _this.attachProps(props)

        return _this
      }

      var _proto = AnimatedComponent.prototype

      _proto.componentWillUnmount = function componentWillUnmount() {
        this.propsAnimated && this.propsAnimated.detach()
      }

      _proto.setNativeProps = function setNativeProps(props) {
        var didUpdate = applyAnimatedValues.fn(this.node, props, this)
        if (didUpdate === false) this.forceUpdate()
      } // The system is best designed when setNativeProps is implemented. It is
      // able to avoid re-rendering and directly set the attributes that
      // changed. However, setNativeProps can only be implemented on leaf
      // native components. If you want to animate a composite component, you
      // need to re-render it. In this case, we have a fallback that uses
      // forceUpdate.

      _proto.attachProps = function attachProps(_ref) {
        var forwardRef = _ref.forwardRef,
          nextProps = _objectWithoutPropertiesLoose(_ref, ['forwardRef'])

        var oldPropsAnimated = this.propsAnimated
        this.propsAnimated = new AnimatedProps(nextProps, this.callback) // When you call detach, it removes the element from the parent list
        // of children. If it goes to 0, then the parent also detaches itself
        // and so on.
        // An optimization is to attach the new elements and THEN detach the old
        // ones instead of detaching and THEN attaching.
        // This way the intermediate state isn't to go to 0 and trigger
        // this expensive recursive detaching to then re-attach everything on
        // the very next operation.

        oldPropsAnimated && oldPropsAnimated.detach()
      }

      _proto.shouldComponentUpdate = function shouldComponentUpdate(props) {
        var style = props.style,
          nextProps = _objectWithoutPropertiesLoose(props, ['style'])

        var _this$props = this.props,
          currentStyle = _this$props.style,
          currentProps = _objectWithoutPropertiesLoose(_this$props, ['style'])

        if (
          !shallowEqual(currentProps, nextProps) ||
          !shallowEqual(currentStyle, style)
        ) {
          this.attachProps(props)
          return true
        }

        return false
      }

      _proto.render = function render() {
        var _this2 = this

        var _this$propsAnimated$g = this.propsAnimated.getValue(),
          scrollTop = _this$propsAnimated$g.scrollTop,
          scrollLeft = _this$propsAnimated$g.scrollLeft,
          animatedProps = _objectWithoutPropertiesLoose(_this$propsAnimated$g, [
            'scrollTop',
            'scrollLeft',
          ])

        return React__default.createElement(
          Component,
          _extends({}, animatedProps, {
            ref: function ref(node) {
              return (_this2.node = handleRef(node, _this2.props.forwardRef))
            },
          })
        )
      }

      return AnimatedComponent
    })(React__default.Component)

  return React__default.forwardRef(function(props, ref) {
    return React__default.createElement(
      AnimatedComponent,
      _extends({}, props, {
        forwardRef: ref,
      })
    )
  })
}

var config = {
  default: {
    tension: 170,
    friction: 26,
  },
  gentle: {
    tension: 120,
    friction: 14,
  },
  wobbly: {
    tension: 180,
    friction: 12,
  },
  stiff: {
    tension: 210,
    friction: 20,
  },
  slow: {
    tension: 280,
    friction: 60,
  },
  molasses: {
    tension: 280,
    friction: 120,
  },
}

var active = false
var controllers = new Set()

var frameLoop = function frameLoop() {
  var time = now()

  for (
    var _iterator = controllers,
      _isArray = Array.isArray(_iterator),
      _i = 0,
      _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();
    ;

  ) {
    var _ref

    if (_isArray) {
      if (_i >= _iterator.length) break
      _ref = _iterator[_i++]
    } else {
      _i = _iterator.next()
      if (_i.done) break
      _ref = _i.value
    }

    var controller = _ref
    var isDone = true
    var noChange = true

    for (
      var configIdx = 0;
      configIdx < controller.configs.length;
      configIdx++
    ) {
      var config = controller.configs[configIdx]
      var endOfAnimation = void 0,
        lastTime = void 0

      for (var valIdx = 0; valIdx < config.animatedValues.length; valIdx++) {
        var animation = config.animatedValues[valIdx] // If an animation is done, skip, until all of them conclude

        if (animation.done) continue
        var from = config.fromValues[valIdx]
        var to = config.toValues[valIdx]
        var position = animation.lastPosition
        var isAnimated = to instanceof Animated

        var _velocity = Array.isArray(config.initialVelocity)
          ? config.initialVelocity[valIdx]
          : config.initialVelocity

        if (isAnimated) to = to.getValue() // Conclude animation if it's either immediate, or from-values match end-state

        if (config.immediate || (!isAnimated && !config.decay && from === to)) {
          animation.updateValue(to)
          animation.done = true
          continue
        } // Doing delay here instead of setTimeout is one async worry less

        if (config.delay && time - controller.startTime < config.delay) {
          isDone = false
          continue
        } // Flag change

        noChange = false // Break animation when string values are involved

        if (typeof from === 'string' || typeof to === 'string') {
          animation.updateValue(to)
          animation.done = true
          continue
        }

        if (config.duration !== void 0) {
          /** Duration easing */
          position =
            from +
            config.easing(
              (time - controller.startTime - config.delay) / config.duration
            ) *
              (to - from)
          endOfAnimation =
            time >= controller.startTime + config.delay + config.duration
        } else if (config.decay) {
          /** Decay easing */
          position =
            from +
            (_velocity / (1 - 0.998)) *
              (1 - Math.exp(-(1 - 0.998) * (time - controller.startTime)))
          endOfAnimation = Math.abs(animation.lastPosition - position) < 0.1
          if (endOfAnimation) to = position
        } else {
          /** Spring easing */
          lastTime = animation.lastTime !== void 0 ? animation.lastTime : time
          _velocity =
            animation.lastVelocity !== void 0
              ? animation.lastVelocity
              : config.initialVelocity // If we lost a lot of frames just jump to the end.

          if (time > lastTime + 64) lastTime = time // http://gafferongames.com/game-physics/fix-your-timestep/

          var numSteps = Math.floor(time - lastTime)

          for (var i = 0; i < numSteps; ++i) {
            var force = -config.tension * (position - to)
            var damping = -config.friction * _velocity
            var acceleration = (force + damping) / config.mass
            _velocity = _velocity + (acceleration * 1) / 1000
            position = position + (_velocity * 1) / 1000
          } // Conditions for stopping the spring animation

          var isOvershooting =
            config.clamp && config.tension !== 0
              ? from < to
                ? position > to
                : position < to
              : false
          var isVelocity = Math.abs(_velocity) <= config.precision
          var isDisplacement =
            config.tension !== 0
              ? Math.abs(to - position) <= config.precision
              : true
          endOfAnimation = isOvershooting || (isVelocity && isDisplacement)
          animation.lastVelocity = _velocity
          animation.lastTime = time
        } // Trails aren't done until their parents conclude

        if (isAnimated && !config.toValues[valIdx].done) endOfAnimation = false

        if (endOfAnimation) {
          // Ensure that we end up with a round value
          if (animation.value !== to) position = to
          animation.done = true
        } else isDone = false

        animation.updateValue(position)
        animation.lastPosition = position
      } // Keep track of updated values only when necessary

      if (controller.props.onFrame || !controller.props.native)
        controller.animatedProps[config.name] = config.interpolation.getValue()
    } // Update callbacks in the end of the frame

    if (controller.props.onFrame || !controller.props.native) {
      if (!controller.props.native && controller.onUpdate) controller.onUpdate()
      if (controller.props.onFrame)
        controller.props.onFrame(controller.animatedProps)
    } // Either call onEnd or next frame

    if (isDone) {
      controllers.delete(controller)
      controller.debouncedOnEnd({
        finished: true,
        noChange: noChange,
      })
    }
  } // Loop over as long as there are controllers ...

  if (controllers.size) requestFrame(frameLoop)
  else active = false
}

var addController = function addController(controller) {
  if (!controllers.has(controller)) {
    controllers.add(controller)
    if (!active) requestFrame(frameLoop)
    active = true
  }
}

var removeController = function removeController(controller) {
  if (controllers.has(controller)) {
    controllers.delete(controller)
  }
}

var Controller =
  /*#__PURE__*/
  (function() {
    function Controller(props, config) {
      var _this = this

      if (config === void 0) {
        config = {
          native: true,
          interpolateTo: true,
          autoStart: true,
        }
      }

      this.getValues = function() {
        return _this.props.native ? _this.interpolations : _this.animatedProps
      }

      this.dependents = new Set()
      this.isActive = false
      this.hasChanged = false
      this.props = {}
      this.merged = {}
      this.animations = {}
      this.interpolations = {}
      this.animatedProps = {}
      this.configs = []
      this.frame = undefined
      this.startTime = undefined
      this.lastTime = undefined
      this.update(_extends({}, props, config))
    }

    var _proto = Controller.prototype

    _proto.update = function update(props) {
      var _this2 = this

      this.props = _extends({}, this.props, props)

      var _ref = this.props.interpolateTo
          ? interpolateTo(this.props)
          : this.props,
        _ref$from = _ref.from,
        from = _ref$from === void 0 ? {} : _ref$from,
        _ref$to = _ref.to,
        to = _ref$to === void 0 ? {} : _ref$to,
        _ref$config = _ref.config,
        config = _ref$config === void 0 ? {} : _ref$config,
        _ref$delay = _ref.delay,
        delay = _ref$delay === void 0 ? 0 : _ref$delay,
        reverse = _ref.reverse,
        attach = _ref.attach,
        reset = _ref.reset,
        immediate = _ref.immediate,
        autoStart = _ref.autoStart,
        ref = _ref.ref // Reverse values when requested

      if (reverse) {
        var _ref2 = [to, from]
        from = _ref2[0]
        to = _ref2[1]
      }

      this.hasChanged = false // Attachment handling, trailed springs can "attach" themselves to a previous spring

      var target = attach && attach(this) // Reset merged props when necessary

      var extra = reset ? {} : this.merged // This will collect all props that were ever set

      this.merged = _extends({}, from, extra, to) // Reduces input { name: value } pairs into animated values

      this.animations = Object.entries(this.merged).reduce(function(
        acc,
        _ref3,
        i
      ) {
        var name = _ref3[0],
          value = _ref3[1]
        // Issue cached entries, except on reset
        var entry = (!reset && acc[name]) || {} // Figure out what the value is supposed to be

        var isNumber = typeof value === 'number'
        var isString =
          typeof value === 'string' &&
          !value.startsWith('#') &&
          !/\d/.test(value) &&
          !colorNames[value]
        var isArray = !isNumber && !isString && Array.isArray(value)
        var fromValue = from[name] !== undefined ? from[name] : value
        var toValue = isNumber || isArray ? value : isString ? value : 1
        var toConfig = callProp(config, name)
        if (target) toValue = target.animations[name].parent // Detect changes, animated values will be checked in the raf-loop

        if (toConfig.decay !== void 0 || !shallowEqual(entry.changes, value)) {
          var _extends2

          _this2.hasChanged = true
          var parent, interpolation$$1
          if (isNumber || isString)
            parent = interpolation$$1 =
              entry.parent || new AnimatedValue(fromValue)
          else if (isArray)
            parent = interpolation$$1 =
              entry.parent || new AnimatedArray(fromValue)
          else {
            var prev =
              entry.interpolation &&
              entry.interpolation.calc(entry.parent.value)

            if (entry.parent) {
              parent = entry.parent
              parent.setValue(0, false)
            } else parent = new AnimatedValue(0)

            var range = {
              output: [prev !== void 0 ? prev : fromValue, value],
            }

            if (entry.interpolation) {
              interpolation$$1 = entry.interpolation
              entry.interpolation.updateConfig(range)
            } else interpolation$$1 = parent.interpolate(range)
          } // Set immediate values

          if (callProp(immediate, name)) parent.setValue(value, false) // Reset animated values

          var animatedValues = toArray(parent.getPayload())
          animatedValues.forEach(function(value) {
            return value.prepare(_this2)
          })
          return _extends(
            {},
            acc,
            ((_extends2 = {}),
            (_extends2[name] = _extends({}, entry, {
              name: name,
              parent: parent,
              interpolation: interpolation$$1,
              animatedValues: animatedValues,
              changes: value,
              fromValues: toArray(parent.getValue()),
              toValues: toArray(target ? toValue.getPayload() : toValue),
              immediate: callProp(immediate, name),
              delay: withDefault(toConfig.delay, delay || 0),
              initialVelocity: withDefault(toConfig.velocity, 0),
              clamp: withDefault(toConfig.clamp, false),
              precision: withDefault(toConfig.precision, 0.01),
              tension: withDefault(toConfig.tension, 170),
              friction: withDefault(toConfig.friction, 26),
              mass: withDefault(toConfig.mass, 1),
              duration: toConfig.duration,
              easing: withDefault(toConfig.easing, function(t) {
                return t
              }),
              decay: toConfig.decay,
            })),
            _extends2)
          )
        } else return acc
      },
      this.animations)

      if (this.hasChanged) {
        this.configs = getValues$1(this.animations)
        this.animatedProps = {}
        this.interpolations = {}

        for (var key in this.animations) {
          this.interpolations[key] = this.animations[key].interpolation
          this.animatedProps[key] = this.animations[
            key
          ].interpolation.getValue()
        }
      } // TODO: clean up ref in controller

      for (
        var _len = arguments.length,
          start = new Array(_len > 1 ? _len - 1 : 0),
          _key = 1;
        _key < _len;
        _key++
      ) {
        start[_key - 1] = arguments[_key]
      }

      if (!ref && (autoStart || start.length)) this.start.apply(this, start)
      var onEnd = start[0],
        onUpdate = start[1]
      this.onEnd = typeof onEnd === 'function' && onEnd
      this.onUpdate = onUpdate
      return this.getValues()
    }

    _proto.start = function start(onEnd, onUpdate) {
      var _this3 = this

      this.startTime = now()
      if (this.isActive) this.stop()
      this.isActive = true
      this.onEnd = typeof onEnd === 'function' && onEnd
      this.onUpdate = onUpdate
      if (this.props.onStart) this.props.onStart()
      addController(this)
      return new Promise(function(res) {
        return (_this3.resolve = res)
      })
    }

    _proto.stop = function stop(finished) {
      if (finished === void 0) {
        finished = false
      }

      // Reset collected changes since the animation has been stopped cold turkey
      if (finished)
        getValues$1(this.animations).forEach(function(a) {
          return (a.changes = undefined)
        })
      this.debouncedOnEnd({
        finished: finished,
      })
    }

    _proto.destroy = function destroy() {
      removeController(this)
      this.props = {}
      this.merged = {}
      this.animations = {}
      this.interpolations = {}
      this.animatedProps = {}
      this.configs = []
    }

    _proto.debouncedOnEnd = function debouncedOnEnd(result) {
      removeController(this)
      this.isActive = false
      var onEnd = this.onEnd
      this.onEnd = null
      if (onEnd) onEnd(result)
      if (this.resolve) this.resolve()
      this.resolve = null
    }

    return Controller
  })()

var KeyframeController =
  /*#__PURE__*/
  (function() {
    function KeyframeController(_props) {
      var _this = this

      this.frameId = 0

      this.next = function(props, localFrameId, last, index) {
        if (last === void 0) {
          last = true
        }

        if (index === void 0) {
          index = 0
        }

        // this.last = last
        // this.running = true
        // config passed to props can overwrite global config passed in
        // controller instantiation i.e. globalConfig
        var config = props.config
          ? props.config
          : Array.isArray(_this.globalConfig)
          ? _this.globalConfig[index]
          : _this.globalConfig
        _this.onFrameRest = props.onRest
        return new Promise(function(resolve) {
          // if ref is passed to internal controller, then it ignore onEnd call back
          _this.instance.update(
            _extends({}, _this.globalProps, props, {
              config: config,
            }),
            _this.onEnd(_this.onFrameRest, localFrameId, last, resolve)
          ) // start needs to be called here if ref is present to activate the anim

          if (_this.ref) {
            _this.instance.start(
              _this.onEnd(_this.onFrameRest, localFrameId, last, resolve)
            )
          } // hacky solution to force the parent to be updated any time
          // the child controller is reset

          _this.instance.props.reset &&
            _this.instance.props.native &&
            _this.parentForceUpdate &&
            requestFrame(_this.parentForceUpdate)
        })
      }

      this.start = function(onEnd) {
        _this.globalOnEnd = onEnd

        if (_this.currSlots) {
          var _ret = (function() {
            var localFrameId = ++_this.frameId

            if (Array.isArray(_this.currSlots)) {
              var q = Promise.resolve()

              var _loop = function _loop(i) {
                var index = i
                var slot = _this.currSlots[index]
                var last = index === _this.currSlots.length - 1
                q = q.then(function() {
                  return (
                    localFrameId === _this.frameId &&
                    _this.next(slot, localFrameId, last, index)
                  )
                })
              }

              for (var i = 0; i < _this.currSlots.length; i++) {
                _loop(i)
              }
            } else if (typeof _this.currSlots === 'function') {
              var index = 0

              _this.currSlots(
                // next
                function(props, last) {
                  if (last === void 0) {
                    last = false
                  }

                  return (
                    localFrameId === _this.frameId &&
                    _this.next(props, localFrameId, last, index++)
                  )
                }, // cancel
                function() {
                  return requestFrame(function() {
                    return _this.instance.isActive && _this.instance.stop(true)
                  })
                }
              )
            } else _this.next(_this.currSlots, localFrameId)

            _this.prevSlots = _this.currSlots
            return {
              v: new Promise(function(resolve) {
                return (_this.keyFrameEndResolver = resolve)
              }),
            }
          })()

          if (typeof _ret === 'object') return _ret.v
        }
      }

      this.stop = function(finished) {
        if (finished === void 0) {
          finished = false
        }

        ++_this.frameId
        if (_this.instance.isActive) _this.instance.stop(finished)
      }

      this.onEnd = function(onFrameRest, localFrameId, last, resolve) {
        return function(args) {
          if (localFrameId === _this.frameId) {
            if (resolve) resolve()
            if (onFrameRest) onFrameRest(_this.merged)
            if (last && _this.globalOnEnd) _this.globalOnEnd(args)
            if (last && _this.keyFrameEndResolver) _this.keyFrameEndResolver()

            if (args.finished && last && _this.globalOnRest) {
              _this.globalOnRest(_this.merged)
            }
          }
        }
      }

      this.updateWithForceUpdate = function(forceUpdate) {
        // needed to forceUpdate when the controller is reset
        // for native controllers
        _this.parentForceUpdate = forceUpdate

        for (
          var _len = arguments.length,
            args = new Array(_len > 1 ? _len - 1 : 0),
            _key = 1;
          _key < _len;
          _key++
        ) {
          args[_key - 1] = arguments[_key]
        }

        _this.update.apply(_this, args)
      }

      this.update = function(args) {
        var isFnOrArray = typeof args === 'function' || Array.isArray(args)

        if (isFnOrArray) {
          _this.currSlots = args
          !_this.ref && _this.start()
        } else {
          var slots = args.slots,
            rest = _objectWithoutPropertiesLoose(args, ['slots'])

          _this.currSlots = slots
          !_this.ref && _this.start.apply(_this, rest)
        }
      }

      this.getValues = function() {
        return _this.instance.getValues()
      }

      this.destroy = function() {
        return _this.instance.destroy()
      }

      var _config = _props.config,
        onRest = _props.onRest,
        initialProps = _objectWithoutPropertiesLoose(_props, [
          'config',
          'onRest',
        ])

      this.globalProps = (function(_ref) {
        var native = _ref.native,
          onStart = _ref.onStart,
          onFrame = _ref.onFrame,
          children = _ref.children,
          reset = _ref.reset,
          delay = _ref.delay,
          destroyed = _ref.destroyed
        return {
          native: native,
          onStart: onStart,
          reset: reset,
          onFrame: onFrame,
          children: children,
          delay: delay,
          destroyed: destroyed,
        }
      })(_props)

      this.globalConfig = _props.config
      this.globalOnRest = _props.onRest
      this.ref = _props.ref
      this.prevSlots = {}
      this.currSlots = null
      this.instance = new Controller(
        _extends({}, initialProps, {
          native: true,
        })
      )
    }

    _createClass(KeyframeController, [
      {
        key: 'isActive',
        get: function get() {
          return this.instance.isActive
        },
      },
      {
        key: 'config',
        set: function set(config) {
          this.globalConfig = config
        },
      },
      {
        key: 'globals',
        set: function set(props) {
          this.globalProps = _extends({}, this.globalProps, props)
        },
      },
      {
        key: 'merged',
        get: function get() {
          return this.instance.merged
        },
      },
      {
        key: 'props',
        get: function get() {
          return this.instance.props
        },
      },
    ])

    return KeyframeController
  })()

var useSpringImpl = function useSpringImpl(type) {
  if (type === void 0) {
    type = 'default'
  }

  return function(args) {
    var _useState = React.useState(),
      forceUpdate = _useState[1] // Extract animation props and hook-specific props, can be a function or an obj

    var isFn = typeof args === 'function'

    var _callProp = callProp(args),
      onRest = _callProp.onRest,
      onKeyframesHalt = _callProp.onKeyframesHalt,
      props = _objectWithoutPropertiesLoose(_callProp, [
        'onRest',
        'onKeyframesHalt',
      ]) // The controller maintains the animation values, starts and tops animations

    var _useState2 = React.useState(function() {
        return type === 'keyframe'
          ? new KeyframeController(props)
          : new Controller(props)
      }),
      ctrl = _useState2[0] // Destroy controller on unmount

    React.useEffect(function() {
      return function() {
        return ctrl.destroy()
      }
    }, [])

    var onHalt = function onHalt(_ref) {
      var finished = _ref.finished
      return finished && onRest && onRest(ctrl.merged)
    } // The hooks explcit API gets defined here ...

    React.useImperativeMethods(props.ref, function() {
      return {
        start: function start() {
          return ctrl.start(onHalt)
        },

        get isActive() {
          return ctrl.isActive
        },

        stop: function stop(finished) {
          if (finished === void 0) {
            finished = false
          }

          if (ctrl.isActive) ctrl.stop(finished)
        },
      }
    }) // Defines the hooks setter, which updates the controller

    var updateCtrl = React.useCallback(
      function(updateProps) {
        type === 'keyframe'
          ? ctrl.updateWithForceUpdate(forceUpdate, updateProps)
          : ctrl.update(updateProps)
        if (!ctrl.props.ref) ctrl.start(onHalt)
        if (ctrl.props.reset && type === 'default') requestFrame(forceUpdate)
      },
      [onRest, ctrl.props.ref]
    ) // Update next frame is props aren't functional

    React.useEffect(function() {
      return void (!isFn && updateCtrl(props))
    }) // Return animated props, or, anim-props + the update-setter above

    var propValues = ctrl.getValues()
    return isFn
      ? [
          propValues,
          updateCtrl,
          function(finished) {
            if (finished === void 0) {
              finished = false
            }

            return ctrl.stop(finished)
          },
        ]
      : propValues
  }
}
var useSpring = useSpringImpl()

var useSpringsImpl = function useSpringsImpl(type, trail) {
  if (type === void 0) {
    type = 'default'
  }

  if (trail === void 0) {
    trail = false
  }

  return function(length, props, initialProps) {
    if (initialProps === void 0) {
      initialProps = {}
    }

    var isFn = typeof props === 'function'

    var _useState = React.useState(),
      forceUpdate = _useState[1]

    var args = trail ? callProp(props) : initialProps

    var reverse = args.reverse,
      onKeyframesHalt = args.onKeyframesHalt,
      onRest = args.onRest,
      rest = _objectWithoutPropertiesLoose(args, [
        'reverse',
        'onKeyframesHalt',
        'onRest',
      ]) // The controller maintains the animation values, starts and tops animations

    var instances = React.useMemo(
      function() {
        var instances = []

        var _loop = function _loop(i) {
          var initProps = trail
            ? _extends({}, rest, {
                config: callProp(rest.config, i),
                attach:
                  i > 0 &&
                  function() {
                    return instances[i - 1]
                  },
              })
            : _extends({}, rest, isFn ? callProp(props, i) : props[i])
          instances.push(
            type === 'keyframe'
              ? new KeyframeController(initProps)
              : new Controller(initProps)
          )
        }

        for (var i = 0; i < length; i++) {
          _loop(i)
        }

        return instances
      },
      [length]
    ) // Destroy controllers on unmount

    var instancesRef = React.useRef()
    instancesRef.current = instances
    React.useEffect(function() {
      return function() {
        return instancesRef.current.forEach(function(i) {
          return i.destroy()
        })
      }
    }, []) // Define onEnd callbacks and resolvers

    var onHalt = onKeyframesHalt
      ? function(ctrl) {
          return function(_ref) {
            var finished = _ref.finished
            return finished && onRest && onRest(ctrl.merged)
          }
        }
      : onKeyframesHalt ||
        function() {
          return null
        } // The hooks explcit API gets defined here ...

    React.useImperativeMethods(rest.ref, function() {
      return {
        start: function start() {
          return Promise.all(
            Array.from(instancesRef.current).map(function(_ref2, i) {
              var ctrl = _ref2[1]
              return (
                (reverse ? i === 0 : instancesRef.current.size - 1) &&
                onHalt(ctrl)
              )
            })
          )
        },

        get isActive() {
          Array.from(instancesRef.current).some(function(_ref3) {
            var ctrl = _ref3[1]
            return ctrl.isActive
          })
        },

        stop: function stop(finished) {
          if (finished === void 0) {
            finished = false
          }

          return instancesRef.current.forEach(function(_ref4) {
            var ctrl = _ref4[1]
            return ctrl.stop(finished)
          })
        },
      }
    }) // Defines the hooks setter, which updates the controller

    var updateCtrl = React.useCallback(
      function(props) {
        instances.forEach(function(ctrl, i) {
          var last = reverse ? i === 0 : instances.length - 1 === i
          var attachIdx = reverse ? i + 1 : i - 1
          var attachController = instances[attachIdx]
          var updateProps = trail
            ? _extends({}, props, {
                config: callProp(props.config || rest.config, i),
                attach:
                  attachController &&
                  function() {
                    return attachController
                  },
              })
            : _extends({}, isFn ? callProp(props, i) : props[i])
          type === 'keyframe' && last
            ? ctrl.updateWithForceUpdate(forceUpdate, updateProps)
            : ctrl.update(updateProps)
          if (!ctrl.props.ref) ctrl.start(last && onHalt(ctrl))
          if (last && ctrl.props.reset) requestFrame(forceUpdate)
        })
      },
      [instances, onRest, onKeyframesHalt, rest.ref, reverse]
    ) // Update next frame is props aren't functional

    React.useEffect(function() {
      return void (!isFn && updateCtrl(props))
    }) // Return animated props, or, anim-props + the update-setter above

    var propValues = instances.map(function(v) {
      return v.getValues()
    })
    return isFn
      ? [
          propValues,
          updateCtrl,
          function(finished) {
            if (finished === void 0) {
              finished = false
            }

            return instances.forEach(function(ctrl) {
              return ctrl.stop(finished)
            })
          },
        ]
      : propValues
  }
}
var useSprings = useSpringsImpl()

var useTrail = useSpringsImpl('default', true)

var guid = 0

var mapKeys = function mapKeys(items, keys) {
  return (typeof keys === 'function' ? items.map(keys) : toArray(keys)).map(
    String
  )
}

var get = function get(props) {
  var items = props.items,
    _props$keys = props.keys,
    keys =
      _props$keys === void 0
        ? function(states) {
            return states
          }
        : _props$keys,
    rest = _objectWithoutPropertiesLoose(props, ['items', 'keys'])

  items = toArray(items !== void 0 ? items : null)
  return _extends(
    {
      items: items,
      keys: mapKeys(items, keys),
    },
    rest
  )
}

function calculateDiffInItems(_ref, props) {
  var prevProps = _ref.prevProps,
    state = _objectWithoutPropertiesLoose(_ref, ['prevProps'])

  var _get = get(prevProps || {}),
    _keys = _get.keys

  var _get2 = get(props),
    keys = _get2.keys,
    items = _get2.items,
    unique = _get2.unique,
    _get2$trail = _get2.trail,
    trail = _get2$trail === void 0 ? 0 : _get2$trail,
    update = _get2.update,
    enter = _get2.enter,
    leave = _get2.leave,
    config = _get2.config

  var currSet = new Set(keys)
  var prevSet = new Set(_keys)
  var deleted = [].concat(state.deleted)

  var current = _extends({}, state.current)

  var removed = state.transitions.filter(function(_ref2) {
    var destroyed = _ref2.destroyed,
      originalKey = _ref2.originalKey
    return !destroyed && !currSet.has(originalKey)
  })
  var added = keys.filter(function(key) {
    return !prevSet.has(key)
  })

  var updated = _keys.filter(function(key) {
    return currSet.has(key)
  }) // if n

  var delay = (!trail && props.delay) || 0 // Make sure trailed transitions start at 0

  if (trail) delay -= trail
  added.forEach(function(key) {
    var keyIndex = keys.indexOf(key)
    var item = items[keyIndex]
    var state = 'enter'

    if (
      unique &&
      deleted.find(function(d) {
        return d.originalKey === key
      })
    ) {
      deleted = deleted.filter(function(t) {
        return t.originalKey !== key
      })
    }

    current[key] = {
      item: item,
      state: state,
      trail: (delay = delay + trail),
      key: unique ? String(key) : guid++,
      originalKey: key,
      destroyed: false,
      config: callProp(config, item, state),
      to: callProp(enter, item),
    }
  })
  removed.forEach(function(_ref3) {
    var item = _ref3.item,
      originalKey = _ref3.originalKey,
      rest = _objectWithoutPropertiesLoose(_ref3, ['item', 'originalKey'])

    var keyIndex = _keys.indexOf(originalKey)

    var state = 'leave'
    deleted.unshift(
      _extends({}, rest, {
        originalKey: originalKey,
        item: item,
        state: state,
        left: _keys[Math.max(0, keyIndex - 1)],
        destroyed: true,
        trail: (delay = delay + trail),
        config: callProp(config, item, state),
        to: callProp(leave, item),
      })
    )
    delete current[item.originalKey]
  })
  updated.forEach(function(key) {
    var keyIndex = keys.indexOf(key)
    var item = items[keyIndex]
    var state = 'update'
    current[key] = _extends({}, current[key], {
      item: item,
      state: state,
      destroyed: false,
      trail: (delay = delay + trail),
      config: callProp(config, item, state),
      to: callProp(update, item),
    })
  })
  var out = keys.map(function(key) {
    return current[key]
  }) // This tries to restore order for deleted items by finding their last known siblings
  // only using the left sibling to keep order placement consistent for all deleted items

  deleted.forEach(function(_ref4) {
    var left = _ref4.left,
      right = _ref4.right,
      item = _objectWithoutPropertiesLoose(_ref4, ['left', 'right'])

    var pos // Was it the element on the left, if yes, move there ...

    if (
      (pos = out.findIndex(function(t) {
        return t.originalKey === left
      })) !== -1
    )
      pos += 1 // And if nothing else helps, move it to the start ¯\_(ツ)_/¯

    pos = Math.max(0, pos)
    out = [].concat(out.slice(0, pos), [item], out.slice(pos))
  })
  return {
    deleted: deleted,
    updated: updated,
    current: current,
    transitions: out,
  }
}
/**
 * @param {TransitionProps} props
 */

function useTransition(props) {
  var _get3 = get(props),
    items = _get3.items,
    _currentKeys = _get3.keys,
    from = _get3.from,
    initial = _get3.initial,
    onRest = _get3.onRest,
    onDestroyed = _get3.onDestroyed,
    ref = _get3.ref

  var mounted = React.useRef(false)
  React.useEffect(function() {
    return (
      (mounted.current = true),
      function() {
        return (mounted.current = false)
      }
    )
  }, [])
  var instances = React.useRef(!mounted.current && new Map([]))
  React.useEffect(function() {
    return function() {
      return Array.from(instances.current).map(function(_ref5) {
        var key = _ref5[0],
          ctrl = _ref5[1].ctrl
        ctrl.destroy()
        instances.current.delete(key)
      })
    }
  }, [])

  var _useState = React.useState(),
    forceUpdate = _useState[1]

  var state = React.useRef({
    first: false,
    activeSlots: {},
    deleted: [],
    current: {},
    transitions: [],
    prevProps: null,
  }) // only to be used internally, must be bound to the instance obj to work

  function onEnd(_ref6) {
    var finished = _ref6.finished
    var item = this.item,
      key = this.key,
      destroyed = this.destroyed,
      slot = this.slot,
      ctrl = this.ctrl

    if (mounted.current && finished) {
      if (destroyed && onDestroyed) onDestroyed(item) // onRest needs to be called everytime each item
      // has finished, it is needed for notif hub to work.
      // we could have two seperate callback, one for each
      // and one for a sort of global on rest and peritem onrest?

      if (onRest) onRest(item, slot, ctrl.merged) // Clean up internal state when items unmount, this doesn't necessrily trigger a forceUpdate

      if (destroyed) {
        state.current = _extends({}, state.current, {
          deleted: state.current.deleted.filter(function(t) {
            return t.key !== key
          }),
          transitions: state.current.transitions.filter(function(t) {
            return t.key !== key
          }),
        })
      } // Only when everything's come to rest we enforce a complete dom clean-up

      var currentInstances = Array.from(instances.current)
      if (
        !currentInstances.some(function(_ref7) {
          var ctrl = _ref7[1].ctrl
          return ctrl.isActive
        })
      )
        requestFrame(function() {
          return forceUpdate()
        })
    }
  } // Prop changes effect

  React.useMemo(
    function() {
      var _calculateDiffInItems = calculateDiffInItems(state.current, props),
        transitions = _calculateDiffInItems.transitions,
        rest = _objectWithoutPropertiesLoose(_calculateDiffInItems, [
          'transitions',
        ])

      transitions.forEach(function(_ref8) {
        var slot = _ref8.state,
          to = _ref8.to,
          config = _ref8.config,
          trail = _ref8.trail,
          key = _ref8.key,
          item = _ref8.item,
          destroyed = _ref8.destroyed
        !instances.current.has(key) &&
          instances.current.set(key, {
            ctrl: new KeyframeController(
              _extends(
                {},
                callProp(
                  state.current.first
                    ? initial !== void 0
                      ? initial || {}
                      : from
                    : from,
                  item
                ),
                {
                  config: config,
                  delay: trail,
                  native: true,
                  ref: ref,
                }
              )
            ),
            item: item,
            destroyed: destroyed,
            slot: slot,
            key: key,
          }) // update the map object

        var instance = instances.current.get(key)
        instance.item = item
        instance.destroyed = destroyed
        instance.slot = slot
        var ctrl = instance.ctrl

        if (slot === 'update' || slot !== state.current.activeSlots[key]) {
          state.current.activeSlots[key] = slot // Set the controller if config has changed

          if (config) ctrl.config = config // update props that are not animated values

          ctrl.globals = {
            delay: trail,
          }
          ctrl.update(to, onEnd.bind(instance))
        }
      })
      state.current = _extends(
        {},
        state.current,
        {
          transitions: transitions,
          prevProps: props,
          first: true,
        },
        rest
      )
    },
    [items, mapKeys(items, _currentKeys).join('')]
  )
  React.useImperativeMethods(ref, function() {
    return {
      start: function start() {
        return Promise.all(
          Array.from(instances.current).map(function(_ref9) {
            var obj = _ref9[1]
            return obj.ctrl.start(onEnd.bind(obj))
          })
        )
      },
      stop: function stop(finished) {
        if (finished === void 0) {
          finished = false
        }

        Array.from(instances.current).forEach(function(_ref10) {
          var ctrl = _ref10[1].ctrl
          return ctrl.isActive && ctrl.stop(finished)
        })
      },
    }
  })
  return state.current.transitions.map(function(_ref11) {
    var item = _ref11.item,
      state = _ref11.state,
      key = _ref11.key
    return {
      item: item,
      key: key,
      state: state,
      props: instances.current.get(key).ctrl.getValues(),
    }
  })
}

/**
 *
 * @param {(useSpring | useTrail)} useImpl
 * @param {Object} props
 * @param {Array=} props.items // only needed when using Trail primitive
 * @param {Object} props.states
 * @param {SpringProps} ...props
 * @param {String} state
 * @param {SpringProps} initialProps
 */

var useKeyframesImpl = function useKeyframesImpl(useImpl) {
  return function(props, initialProps) {
    if (initialProps === void 0) {
      initialProps = null
    }

    return function() {
      var mounted = React__default.useRef(false)

      for (
        var _len = arguments.length, params = new Array(_len), _key = 0;
        _key < _len;
        _key++
      ) {
        params[_key] = arguments[_key]
      }

      var _ref =
          params.length === 2
            ? params.reduceRight(function(a, b) {
                return [a, b]
              })
            : params,
        _ref$ = _ref[0],
        state = _ref$ === void 0 ? 'default' : _ref$,
        count = _ref[1] // need to force a rerender for when the animated controller has finally accepted props

      var _React$useState = React__default.useState(),
        forceUpdate = _React$useState[1]

      var shouldForceUpdateRef = React__default.useRef(!initialProps)

      var _ref2 = (function() {
          if (Array.isArray(props) || typeof props === 'function') {
            var _states

            return {
              states: ((_states = {}), (_states[state] = props), _states),
            }
          } else {
            var _onRest = props.onRest,
              _config = props.config,
              rest = _objectWithoutPropertiesLoose(props, ['onRest', 'config'])

            return {
              states: rest,
              config: _config,
              onRest: _onRest,
            }
          }
        })(),
        states = _ref2.states,
        config = _ref2.config,
        onRest = _ref2.onRest

      var calculatedProps = function calculatedProps() {
        return _extends({}, initialProps, {
          native: true,
          onRest: onRest,
          config: config,
        })
      }

      var args =
        typeof count === 'number' ? [count, calculatedProps] : [calculatedProps]

      var _useImpl = useImpl.apply(void 0, args),
        animProps = _useImpl[0],
        setAnimation = _useImpl[1],
        cancel = _useImpl[2]

      React__default.useEffect(function() {
        mounted.current = true
        return function() {
          return (mounted.current = false)
        }
      }, [])
      React__default.useEffect(
        function() {
          shouldForceUpdateRef.current && forceUpdate()
          shouldForceUpdateRef.current = false
          setAnimation(states[state])
        },
        [state]
      )
      return shouldForceUpdateRef.current && Array.isArray(animProps)
        ? []
        : animProps
    }
  }
}

var useKeyframes = {
  spring: function spring() {
    return useKeyframesImpl(useSpringImpl('keyframe')).apply(void 0, arguments)
  },
  springs: function springs() {
    return useKeyframesImpl(useSpringsImpl('keyframe')).apply(void 0, arguments)
  },
  trail: function trail() {
    return useKeyframesImpl(useSpringsImpl('keyframe', true)).apply(
      void 0,
      arguments
    )
  },
}

var guid$1 = 0
function useChain(refs, timeSteps, timeFrame) {
  if (timeFrame === void 0) {
    timeFrame = 1000
  }

  var frames = React.useRef([])
  var local = ++guid$1
  React.useEffect(function() {
    refs.forEach(function(_ref) {
      var current = _ref.current
      return current && current.stop()
    })

    if (timeSteps) {
      frames.current.forEach(clearTimeout)
      frames.current = []
      refs.forEach(function(ref, index) {
        return frames.current.push(
          setTimeout(function() {
            return ref.current.start()
          }, timeFrame * timeSteps[index])
        )
      })
    } else
      refs.reduce(function(q, _ref2) {
        var current = _ref2.current
        return (q = q.then(function() {
          return guid$1 === local && current && current.start()
        }))
      }, Promise.resolve())
  }, refs)
}

var domElements = [
  'a',
  'abbr',
  'address',
  'area',
  'article',
  'aside',
  'audio',
  'b',
  'base',
  'bdi',
  'bdo',
  'big',
  'blockquote',
  'body',
  'br',
  'button',
  'canvas',
  'caption',
  'cite',
  'code',
  'col',
  'colgroup',
  'data',
  'datalist',
  'dd',
  'del',
  'details',
  'dfn',
  'dialog',
  'div',
  'dl',
  'dt',
  'em',
  'embed',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'head',
  'header',
  'hgroup',
  'hr',
  'html',
  'i',
  'iframe',
  'img',
  'input',
  'ins',
  'kbd',
  'keygen',
  'label',
  'legend',
  'li',
  'link',
  'main',
  'map',
  'mark',
  'marquee',
  'menu',
  'menuitem',
  'meta',
  'meter',
  'nav',
  'noscript',
  'object',
  'ol',
  'optgroup',
  'option',
  'output',
  'p',
  'param',
  'picture',
  'pre',
  'progress',
  'q',
  'rp',
  'rt',
  'ruby',
  's',
  'samp',
  'script',
  'section',
  'select',
  'small',
  'source',
  'span',
  'strong',
  'style',
  'sub',
  'summary',
  'sup',
  'table',
  'tbody',
  'td',
  'textarea',
  'tfoot',
  'th',
  'thead',
  'time',
  'title',
  'tr',
  'track',
  'u',
  'ul',
  'var',
  'video',
  'wbr', // SVG
  'circle',
  'clipPath',
  'defs',
  'ellipse',
  'foreignObject',
  'g',
  'image',
  'line',
  'linearGradient',
  'mask',
  'path',
  'pattern',
  'polygon',
  'polyline',
  'radialGradient',
  'rect',
  'stop',
  'svg',
  'text',
  'tspan',
]
var extendedAnimated = domElements.reduce(function(acc, element) {
  acc[element] = createAnimatedComponent(element)
  return acc
}, createAnimatedComponent)

exports.config = config
exports.animated = extendedAnimated
exports.interpolate = interpolate$1
exports.Globals = Globals
exports.useSpring = useSpring
exports.useTrail = useTrail
exports.useTransition = useTransition
exports.useKeyframes = useKeyframes
exports.useChain = useChain
exports.useSprings = useSprings