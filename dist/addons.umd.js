!(function(t, e) {
  'object' == typeof exports && 'undefined' != typeof module
    ? e(exports, require('react'), require('react-spring'))
    : 'function' == typeof define && define.amd
    ? define(['exports', 'react', 'react-spring'], e)
    : e((t.ReactSpringAddons = {}), t.React, t.ReactSpring)
})(this, function(t, u, s) {
  'use strict'
  function f() {
    return (f =
      Object.assign ||
      function(t) {
        for (var e = 1; e < arguments.length; e++) {
          var r = arguments[e]
          for (var n in r)
            Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
        }
        return t
      }).apply(this, arguments)
  }
  function n(t, e) {
    ;(t.prototype = Object.create(e.prototype)),
      ((t.prototype.constructor = t).__proto__ = e)
  }
  u = u && u.hasOwnProperty('default') ? u.default : u
  var h = s.Globals.defaultElement,
    l = s.animated(h),
    e = u.createContext(null),
    d = e.Provider,
    o = e.Consumer
  function a(t) {
    return t ? 'scrollLeft' : 'scrollTop'
  }
  var m = 'translate3d(0px,0px,0px)',
    y = 'translate(0px,0px)',
    r = (function(t) {
      function e() {
        return t.apply(this, arguments) || this
      }
      n(e, t)
      var r = e.prototype
      return (
        (r.componentDidMount = function() {
          var t = this.parent
          t && ((t.layers = t.layers.concat(this)), t.update())
        }),
        (r.componentWillUnmount = function() {
          var e = this,
            t = this.parent
          t &&
            ((t.layers = t.layers.filter(function(t) {
              return t !== e
            })),
            t.update())
        }),
        (r.setPosition = function(t, e, r) {
          void 0 === r && (r = !1)
          var n = this.parent.props.config,
            o = Math.floor(this.props.offset) * t,
            s = t * this.props.offset + o * this.props.speed,
            a = parseFloat(-e * this.props.speed + s)
          this.controller.update({ translate: a, config: n, immediate: r })
        }),
        (r.setHeight = function(t, e) {
          void 0 === e && (e = !1)
          var r = this.parent.props.config,
            n = parseFloat(t * this.props.factor)
          this.controller.update({ space: n, config: r, immediate: e })
        }),
        (r.initialize = function() {
          var t = this.props,
            e = this.parent,
            r = Math.floor(t.offset) * e.space,
            n = e.space * t.offset + r * t.speed,
            o = parseFloat(-e.current * t.speed + n)
          this.controller = new s.Controller({
            space: e.space * t.factor,
            translate: o,
          })
        }),
        (r.renderLayer = function() {
          var t,
            e = this.props,
            r = e.style,
            n = e.children,
            o = (e.offset, e.speed, e.factor, e.className),
            s = (function(t, e) {
              if (null == t) return {}
              var r,
                n,
                o = {},
                s = Object.keys(t)
              for (n = 0; n < s.length; n++)
                (r = s[n]), 0 <= e.indexOf(r) || (o[r] = t[r])
              return o
            })(e, [
              'style',
              'children',
              'offset',
              'speed',
              'factor',
              'className',
            ]),
            a = this.parent.props.horizontal,
            i = this.controller.interpolations.translate.interpolate(function(
              t
            ) {
              return a
                ? 'translate3d(' + t + 'px,0,0)'
                : 'translate3d(0,' + t + 'px,0)'
            })
          return u.createElement(
            l,
            f({}, s, {
              className: o,
              style: f(
                ((t = {
                  position: 'absolute',
                  backgroundSize: 'auto',
                  backgroundRepeat: 'no-repeat',
                  willChange: 'transform',
                }),
                (t[a ? 'height' : 'width'] = '100%'),
                (t[
                  a ? 'width' : 'height'
                ] = this.controller.interpolations.space),
                (t.WebkitTransform = i),
                (t.MsTransform = i),
                (t.transform = i),
                t),
                r
              ),
            }),
            n
          )
        }),
        (r.render = function() {
          var e = this
          return u.createElement(o, null, function(t) {
            return (
              t && !e.parent && ((e.parent = t), e.initialize()),
              e.renderLayer()
            )
          })
        }),
        e
      )
    })(u.PureComponent)
  r.defaultProps = { factor: 1, offset: 0, speed: 0 }
  var i = (function(e) {
    function t(t) {
      var o
      return (
        ((o = e.call(this) || this).moveItems = function() {
          o.layers.forEach(function(t) {
            return t.setPosition(o.space, o.current)
          }),
            (o.busy = !1)
        }),
        (o.scrollerRaf = function() {
          return s.Globals.requestFrame(o.moveItems)
        }),
        (o.onScroll = function(t) {
          var e = o.props.horizontal
          o.busy ||
            ((o.busy = !0), o.scrollerRaf(), (o.current = t.target[a(e)]))
        }),
        (o.update = function() {
          var t = o.props,
            e = t.scrolling,
            r = t.horizontal,
            n = a(r)
          o.container &&
            ((o.space = o.container[r ? 'clientWidth' : 'clientHeight']),
            e
              ? (o.current = o.container[n])
              : (o.container[n] = o.current = o.offset * o.space),
            o.content &&
              (o.content.style[r ? 'width' : 'height'] =
                o.space * o.props.pages + 'px'),
            o.layers.forEach(function(t) {
              t.setHeight(o.space, !0), t.setPosition(o.space, o.current, !0)
            }))
        }),
        (o.updateRaf = function() {
          s.Globals.requestFrame(o.update), setTimeout(o.update, 150)
        }),
        (o.scrollStop = function(t) {
          return o.controller.stop()
        }),
        (o.state = { ready: !1 }),
        (o.layers = []),
        (o.space = 0),
        (o.current = 0),
        (o.offset = 0),
        (o.busy = !1),
        (o.controller = new s.Controller({ scroll: 0 })),
        o
      )
    }
    n(t, e)
    var r = t.prototype
    return (
      (r.scrollTo = function(t) {
        var e = this.props,
          r = e.horizontal,
          n = e.config,
          o = a(r)
        this.scrollStop(), (this.offset = t)
        var s = this.container
        this.controller.update({
          scroll: t * this.space,
          config: n,
          onFrame: function(t) {
            var e = t.scroll
            return (s[o] = e)
          },
        })
      }),
      (r.componentDidMount = function() {
        window.addEventListener('resize', this.updateRaf, !1),
          this.update(),
          this.setState({ ready: !0 })
      }),
      (r.componentWillUnmount = function() {
        window.removeEventListener('resize', this.updateRaf, !1)
      }),
      (r.componentDidUpdate = function() {
        this.update()
      }),
      (r.render = function() {
        var t,
          e = this,
          r = this.props,
          n = r.style,
          o = r.innerStyle,
          s = r.pages,
          a = r.className,
          i = r.scrolling,
          l = r.children,
          c = r.horizontal,
          p = i ? 'scroll' : 'hidden'
        return u.createElement(
          h,
          {
            ref: function(t) {
              return (e.container = t)
            },
            onScroll: this.onScroll,
            onWheel: i ? this.scrollStop : null,
            onTouchStart: i ? this.scrollStop : null,
            style: f(
              {
                position: 'absolute',
                width: '100%',
                height: '100%',
                overflow: p,
                overflowY: c ? 'hidden' : p,
                overflowX: c ? p : 'hidden',
                WebkitOverflowScrolling: 'touch',
                WebkitTransform: y,
                MsTransform: y,
                transform: m,
              },
              n
            ),
            className: a,
          },
          this.state.ready &&
            u.createElement(
              h,
              {
                ref: function(t) {
                  return (e.content = t)
                },
                style: f(
                  ((t = { position: 'absolute' }),
                  (t[c ? 'height' : 'width'] = '100%'),
                  (t.WebkitTransform = y),
                  (t.MsTransform = y),
                  (t.transform = m),
                  (t.overflow = 'hidden'),
                  (t[c ? 'width' : 'height'] = this.space * s),
                  t),
                  o
                ),
              },
              u.createElement(d, { value: this }, l)
            )
        )
      }),
      t
    )
  })(u.PureComponent)
  ;(i.Layer = r),
    (i.defaultProps = { config: s.config.slow, scrolling: !0, horizontal: !1 }),
    (t.Parallax = i),
    (t.ParallaxLayer = r),
    Object.defineProperty(t, '__esModule', { value: !0 })
})