!function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);var r=function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),Array.isArray(t)?(this.id=5===t.length?t.shift():null,this.open=t[0],this.high=t[1],this.low=t[2],this.close=t[3]):(this.id=t.id,this.open=t.open,this.high=t.high,this.low=t.low,this.close=t.close),this.open>this.close?this.change=-1:this.open<this.close?this.change=1:this.change=0};var a=function e(t,n){var a=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.el=t,this.id=n.id||"default-id-test",this.candles=[],this.min=null,this.max=null,this.colors={rise:"#f51818",fall:"#1b61d1",even:"#2b2b2b"};var i=!1,o=null,l=null;this.el.addEventListener("mousedown",(function(e){i=!0,o=e.pageX-a.el.offsetLeft,l=a.el.scrollLeft})),this.el.addEventListener("mouseup",(function(){i=!1})),this.el.addEventListener("mousemove",(function(e){if(i){e.preventDefault();var t=e.pageX-a.el.offsetLeft-o;a.el.scrollLeft=l-t}})),this.render=function(){var e=a.el.getElementsByClassName("kanan-chart-candles");0===e.length?((e=document.createElement("div")).className="kanan-chart-candles",e.style.position="relative"):e=e[0],a.candles.forEach((function(t,n){var r=document.createElement("div"),i=1===t.change?a.colors.rise:-1===t.change?a.colors.fall:a.colors.even;r.className="kanan-chart-candle",r.style.position="absolute",t.el=r;var o=a.el.clientHeight/(a.max-a.min);r.style.border="2px solid #fff",r.style.borderTop="0 none",r.style.borderBottom="0 none",r.style.backgroundColor=i,r.style.left=6*n+"px",r.style.top=(a.max-t.high)*o+"px",r.style.width="5px",r.style.height=((t.high-t.low)*o||1)+"px";var l=document.createElement("div");l.className="kanan-chart-candle-inner",l.style.position="absolute",l.style.backgroundColor=i,l.style.left="-2px",l.style.top=(t.high-Math.max(t.open,t.close))*o+"px",l.style.width="5px",l.style.height=(Math.abs(t.open-t.close)*o||1)+"px",r.appendChild(l),e.appendChild(r)})),a.el.appendChild(e)},this.setData=function(e){if(!Array.isArray(e))return Error("Data must be an array");a.min=null,a.max=null;var t=[];e.forEach((function(e){var n=new r(e);(!a.min||a.min>n.low)&&(a.min=n.low),(!a.max||a.max<n.high)&&(a.max=n.high),t.push(n)})),a.candles=t;var n=a.el.getElementsByClassName("kanan-chart-candles");n.length>0&&n[0].remove(),a.render(),a.el.scrollLeft=a.el.scrollLeftMax},this.addPoint=function(e){if(void 0===e)return Error("Point must not be empty");if(!e instanceof Object&&!Array.isArray(e))return Error("Point must be an object/array");var t=new r(e);a.candles.push(t),(!a.min||a.min>t.low)&&(a.min=t.low),(!a.max||a.max<t.high)&&(a.max=t.high),a.render()}};window.KananChart={charts:[],get:function(e){return this.charts.find((function(t){return t.id===e}))},chart:function(e,t){var n=document.querySelector(e);if(null===n)return Error("Can not find element");var r=new a(n,t);return t.data&&r.setData(t.data),this.charts.push(r),r}}}]);