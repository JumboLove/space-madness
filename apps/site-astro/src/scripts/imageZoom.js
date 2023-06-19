// zoom-vanilla.js - 2.0.6 (https://github.com/spinningarrow/zoom-vanilla.js)
+(function () {
  "use strict";
  function e(e) {
    var t = e.getBoundingClientRect(),
      n = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
      o =
        window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
    return { top: t.top + n, left: t.left + o };
  }
  var t = 80,
    n = (function () {
      function n() {
        var e = document.createElement("img");
        (e.onload = function () {
          (d = Number(e.height)), (l = Number(e.width)), o();
        }),
          (e.src = m.currentSrc || m.src);
      }
      function o() {
        (f = document.createElement("div")),
          (f.className = "zoom-img-wrap"),
          (f.style.position = "absolute"),
          (f.style.top = e(m).top + "px"),
          (f.style.left = e(m).left + "px"),
          (v = m.cloneNode()),
          (v.style.visibility = "hidden"),
          (m.style.width = m.offsetWidth + "px"),
          m.parentNode.replaceChild(v, m),
          document.body.appendChild(f),
          f.appendChild(m),
          m.classList.add("zoom-img"),
          m.setAttribute("data-action", "zoom-out"),
          (c = document.createElement("div")),
          (c.className = "zoom-overlay"),
          document.body.appendChild(c),
          i(),
          r();
      }
      function i() {
        m.offsetWidth;
        var e = l,
          n = d,
          o = e / m.width,
          i = window.innerHeight - t,
          r = window.innerWidth - t,
          s = e / n,
          a = r / i;
        u = e < r && n < i ? o : s < a ? (i / n) * o : (r / e) * o;
      }
      function r() {
        m.offsetWidth;
        var t = e(m),
          n = window.pageYOffset,
          o = n + window.innerHeight / 2,
          i = window.innerWidth / 2,
          r = t.top + m.height / 2,
          s = t.left + m.width / 2,
          a = Math.round(o - r),
          d = Math.round(i - s),
          l = "scale(" + u + ")",
          c = "translate(" + d + "px, " + a + "px) translateZ(0)";
        (m.style.webkitTransform = l),
          (m.style.msTransform = l),
          (m.style.transform = l),
          (f.style.webkitTransform = c),
          (f.style.msTransform = c),
          (f.style.transform = c),
          document.body.classList.add("zoom-overlay-open");
      }
      function s() {
        if (
          (document.body.classList.remove("zoom-overlay-open"),
            document.body.classList.add("zoom-overlay-transitioning"),
            (m.style.webkitTransform = ""),
            (m.style.msTransform = ""),
            (m.style.transform = ""),
            (f.style.webkitTransform = ""),
            (f.style.msTransform = ""),
            (f.style.transform = ""),
            !1 in document.body.style)
        )
          return a();
        f.addEventListener("transitionend", a), f.addEventListener("webkitTransitionEnd", a);
      }
      function a() {
        m.removeEventListener("transitionend", a),
          m.removeEventListener("webkitTransitionEnd", a),
          f &&
          f.parentNode &&
          (m.classList.remove("zoom-img"),
            (m.style.width = ""),
            m.setAttribute("data-action", "zoom"),
            v.parentNode.replaceChild(m, v),
            f.parentNode.removeChild(f),
            c.parentNode.removeChild(c),
            document.body.classList.remove("zoom-overlay-transitioning"));
      }
      var d = null,
        l = null,
        c = null,
        u = null,
        m = null,
        f = null,
        v = null;
      return function (e) {
        return (m = e), { zoomImage: n, close: s, dispose: a };
      };
    })();
  (function () {
    function e() {
      document.body.addEventListener("click", function (e) {
        "zoom" === e.target.getAttribute("data-action") && "IMG" === e.target.tagName && t(e);
      });
    }
    function t(e) {
      if ((e.stopPropagation(), !document.body.classList.contains("zoom-overlay-open"))) {
        if (e.metaKey || e.ctrlKey) return o();
        i({ forceDispose: !0 }), (m = n(e.target)), m.zoomImage(), r();
      }
    }
    function o() {
      window.open(
        event.target.getAttribute("data-original") || event.target.currentSrc || event.target.src,
        "_blank"
      );
    }
    function i(e) {
      (e = e || { forceDispose: !1 }),
        m && (m[e.forceDispose ? "dispose" : "close"](), s(), (m = null));
    }
    function r() {
      window.addEventListener("scroll", a),
        document.addEventListener("click", l),
        document.addEventListener("keyup", d),
        document.addEventListener("touchstart", c),
        document.addEventListener("touchend", l);
    }
    function s() {
      window.removeEventListener("scroll", a),
        document.removeEventListener("keyup", d),
        document.removeEventListener("click", l),
        document.removeEventListener("touchstart", c),
        document.removeEventListener("touchend", l);
    }
    function a(e) {
      null === f && (f = window.pageYOffset);
      var t = f - window.pageYOffset;
      Math.abs(t) >= 40 && i();
    }
    function d(e) {
      27 == e.keyCode && i();
    }
    function l(e) {
      e.stopPropagation(), e.preventDefault(), i();
    }
    function c(e) {
      (v = e.touches[0].pageY), e.target.addEventListener("touchmove", u);
    }
    function u(e) {
      Math.abs(e.touches[0].pageY - v) <= 10 || (i(), e.target.removeEventListener("touchmove", u));
    }
    var m = null,
      f = null,
      v = null;
    return { listen: e };
  })().listen();
})();

export { };
