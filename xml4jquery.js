/*
Copyright 2015-2017 Simulation Works, LLC
All Rights Reserved.

NOTICE:  All information contained herein is, and remains
the property of Simulation Works, LLC.  The intellectual and
technical concepts contained herein are proprietary to
Simulation Works, LLC and are protected by trade secret or copyright law.

You granted the binary use and distribution rights as long as this binary
retain unchanged including this copyright notice. You may not modify,
decompile, disassemble, reverse engineer or otherwise discover the source code
from which the binary code was derived.

THIS SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING, BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
CONTRIBUTORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES OR OTHER LIABILITY, WHETHER IN AN
ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS WITH THE SOFTWARE.

xml4jQuery rev 1.1.0
*/
var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.defineProperty="function"==typeof Object.defineProperties?Object.defineProperty:function(k,c,r){k!=Array.prototype&&k!=Object.prototype&&(k[c]=r.value)};$jscomp.getGlobal=function(k){return"undefined"!=typeof window&&window===k?k:"undefined"!=typeof global&&null!=global?global:k};$jscomp.global=$jscomp.getGlobal(this);$jscomp.SYMBOL_PREFIX="jscomp_symbol_";
$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.symbolCounter_=0;$jscomp.Symbol=function(k){return $jscomp.SYMBOL_PREFIX+(k||"")+$jscomp.symbolCounter_++};
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var k=$jscomp.global.Symbol.iterator;k||(k=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[k]&&$jscomp.defineProperty(Array.prototype,k,{configurable:!0,writable:!0,value:function(){return $jscomp.arrayIterator(this)}});$jscomp.initSymbolIterator=function(){}};$jscomp.arrayIterator=function(k){var c=0;return $jscomp.iteratorPrototype(function(){return c<k.length?{done:!1,value:k[c++]}:{done:!0}})};
$jscomp.iteratorPrototype=function(k){$jscomp.initSymbolIterator();k={next:k};k[$jscomp.global.Symbol.iterator]=function(){return this};return k};$jscomp.makeIterator=function(k){$jscomp.initSymbolIterator();var c=k[Symbol.iterator];return c?c.call(k):$jscomp.arrayIterator(k)};
$jscomp.polyfill=function(k,c,r,e){if(c){r=$jscomp.global;k=k.split(".");for(e=0;e<k.length-1;e++){var t=k[e];t in r||(r[t]={});r=r[t]}k=k[k.length-1];e=r[k];c=c(e);c!=e&&null!=c&&$jscomp.defineProperty(r,k,{configurable:!0,writable:!0,value:c})}};$jscomp.EXPOSE_ASYNC_EXECUTOR=!0;$jscomp.FORCE_POLYFILL_PROMISE=!1;
$jscomp.polyfill("Promise",function(k){function c(){this.batch_=null}if(k&&!$jscomp.FORCE_POLYFILL_PROMISE)return k;c.prototype.asyncExecute=function(a){null==this.batch_&&(this.batch_=[],this.asyncExecuteBatch_());this.batch_.push(a);return this};c.prototype.asyncExecuteBatch_=function(){var a=this;this.asyncExecuteFunction(function(){a.executeBatch_()})};var r=$jscomp.global.setTimeout;c.prototype.asyncExecuteFunction=function(a){r(a,0)};c.prototype.executeBatch_=function(){for(;this.batch_&&this.batch_.length;){var a=
this.batch_;this.batch_=[];for(var g=0;g<a.length;++g){var d=a[g];delete a[g];try{d()}catch(v){this.asyncThrow_(v)}}}this.batch_=null};c.prototype.asyncThrow_=function(a){this.asyncExecuteFunction(function(){throw a;})};var e=function(a){this.state_=0;this.result_=void 0;this.onSettledCallbacks_=[];var g=this.createResolveAndReject_();try{a(g.resolve,g.reject)}catch(d){g.reject(d)}};e.prototype.createResolveAndReject_=function(){function a(a){return function(f){d||(d=!0,a.call(g,f))}}var g=this,d=
!1;return{resolve:a(this.resolveTo_),reject:a(this.reject_)}};e.prototype.resolveTo_=function(a){if(a===this)this.reject_(new TypeError("A Promise cannot resolve to itself"));else if(a instanceof e)this.settleSameAsPromise_(a);else{a:switch(typeof a){case "object":var g=null!=a;break a;case "function":g=!0;break a;default:g=!1}g?this.resolveToNonPromiseObj_(a):this.fulfill_(a)}};e.prototype.resolveToNonPromiseObj_=function(a){var g=void 0;try{g=a.then}catch(d){this.reject_(d);return}"function"==typeof g?
this.settleSameAsThenable_(g,a):this.fulfill_(a)};e.prototype.reject_=function(a){this.settle_(2,a)};e.prototype.fulfill_=function(a){this.settle_(1,a)};e.prototype.settle_=function(a,g){if(0!=this.state_)throw Error("Cannot settle("+a+", "+g|"): Promise already settled in state"+this.state_);this.state_=a;this.result_=g;this.executeOnSettledCallbacks_()};e.prototype.executeOnSettledCallbacks_=function(){if(null!=this.onSettledCallbacks_){for(var a=this.onSettledCallbacks_,g=0;g<a.length;++g)a[g].call(),
a[g]=null;this.onSettledCallbacks_=null}};var t=new c;e.prototype.settleSameAsPromise_=function(a){var g=this.createResolveAndReject_();a.callWhenSettled_(g.resolve,g.reject)};e.prototype.settleSameAsThenable_=function(a,g){var d=this.createResolveAndReject_();try{a.call(g,d.resolve,d.reject)}catch(v){d.reject(v)}};e.prototype.then=function(a,g){function d(a,d){return"function"==typeof a?function(n){try{c(a(n))}catch(z){f(z)}}:d}var c,f,x=new e(function(a,d){c=a;f=d});this.callWhenSettled_(d(a,c),
d(g,f));return x};e.prototype["catch"]=function(a){return this.then(void 0,a)};e.prototype.callWhenSettled_=function(a,g){function d(){switch(c.state_){case 1:a(c.result_);break;case 2:g(c.result_);break;default:throw Error("Unexpected state: "+c.state_);}}var c=this;null==this.onSettledCallbacks_?t.asyncExecute(d):this.onSettledCallbacks_.push(function(){t.asyncExecute(d)})};e.resolve=function(a){return a instanceof e?a:new e(function(c,d){c(a)})};e.reject=function(a){return new e(function(c,d){d(a)})};
e.race=function(a){return new e(function(c,d){for(var g=$jscomp.makeIterator(a),f=g.next();!f.done;f=g.next())e.resolve(f.value).callWhenSettled_(c,d)})};e.all=function(a){var c=$jscomp.makeIterator(a),d=c.next();return d.done?e.resolve([]):new e(function(a,f){function g(d){return function(f){n[d]=f;p--;0==p&&a(n)}}var n=[],p=0;do n.push(void 0),p++,e.resolve(d.value).callWhenSettled_(g(n.length-1),f),d=c.next();while(!d.done)})};$jscomp.EXPOSE_ASYNC_EXECUTOR&&(e.$jscomp$new$AsyncExecutor=function(){return new c});
return e},"es6-impl","es3");
(function(){var k;(function(c,r){k=r()})(this,function(){function c(f,g){function n(a,d){var n=[],f;var c=p.createNSResolver&&p.createNSResolver(p.documentElement);if(p.evaluate)for(f=(d.ownerDocument||d).evaluate(a,d,c,0,null);c=f.iterateNext();)n.push(c);else for(p.setProperty("SelectionLanguage","XPath"),p.setProperty("SelectionNamespaces",'xmlns:xsl="http://www.w3.org/1999/XSL/Transform"'),c=0,f=d.selectNodes(a);c<f.length;c++)n.push(f[c]);return n}var p=(g||f[0]).ownerDocument||g,e=[];e.ownerDocument=
p;"string"==typeof f?e=n(f,g):e.push.apply(e,f);var x=e[0]||a("b",p);d(x,function(a,d){e[d]=function(){var a=arguments,f=0,n=this.length;for(this._ret=[];f<n;f++){var c=this[f],e=c[d];"function"===typeof e?e=e.apply(c,a):a.length&&(e=c[d]=a[f%a.length]);this._ret[f]=e}return this}},e);e.attr=function(a,d){return 1<arguments.length?e.setAttribute(a,d):e[0]&&e[0].getAttribute(a)};e.val=function(){return this[0]&&this[0].value};e.createChild=k;e.$=function(a){var d=[];this.forEach(function(f){d.push.apply(d,
n(a,f))});return c(d,p)};e.$ret=function(){return c(this._ret,p)};return e}function k(a,d){this.forEach(function(f,c){var n=this._ret[c]=f.ownerDocument.createElementNS("http://apifusion.com/ui/vc/1.0",a),e;for(e in d)n.setAttribute(e,d[e]);f.appendChild(n)},this);return this}function e(a,c){c||(c={});c.method=c.method||"GET";var f=new XMLHttpRequest;d(c,function(a,d){f[d]=a});var e=v.promise(function(e,g){"onerror"in f&&(f.onerror=g);f.onreadystatechange=function(){if(4===f.readyState){c.responseHeaders=
f.getAllResponseHeaders();c.requestUrl=a;if(200!==f.status)return g(Error(f.status+" "+f.statusText+" @ "+a),f);try{f.responseXML?e(f.responseXML):e((new DOMParser).parseFromString(f.responseText,"application/xml"))}catch(A){g(A)}}};f.open(c.method,a,!0);f.setRequestHeader&&f.setRequestHeader("Accept","application/xml, text/xml, application/xhtml+xml, text/xsl, text/html, text/plain");f.setRequestHeader&&d(c.headers||{},function(a,d){f.setRequestHeader(d,a)});v.onSetHeader(f);f.send()});e.debug_xhr=
f;e.debug_url=a;return e}function t(a,c,e){e=e||v.createXml().documentElement;var f=function(a){a=v.createElement(a,e.ownerDocument||e);e.appendChild(a);return a}(c);a instanceof Array?a.forEach(function(a){t(a,"r",f)}):a instanceof Object?d(a,function(a,d){t(a,d,f)}):(a=f.ownerDocument.createTextNode(""+a),f.appendChild(a));return f}function a(a,d,c){return c&&d.createElementNS?d.createElementNS(c,a):d.createElement(a)}function g(a){for(;a&&a.lastChild;)a.removeChild(a.lastChild)}function d(a,d,
c){if(a){var e;if(c)if("string"===typeof d)for(e in a)c[d].call(c,a[e],e,a);else for(e in a)d.call(c,a[e],e,a);else for(e in a)d(a[e],e,a)}}var v={load:function(a,d,c){return e(d.toUrl(a)).then(c,c)},getXml:e,onSetHeader:function(a){},createXml:function(){return(new DOMParser).parseFromString('<?xml version="1.0" encoding="UTF-8"?><r/>',"application/xml")},transform:function(a,d,c){var e=new XSLTProcessor;e.importStylesheet(d);return c?(g(c),c.appendChild(e.transformToFragment(a,c.ownerDocument)),
c):e.transformToDocument(a)},XPath_node:function(a,d){var c=d.ownerDocument||d,e=c.createNSResolver&&c.createNSResolver(c.documentElement);if(c.evaluate)return(d.ownerDocument||d).evaluate(a,d,e,9,null).singleNodeValue;c.setProperty("SelectionLanguage","XPath");c.setProperty("SelectionNamespaces",'xmlns:xsl="http://www.w3.org/1999/XSL/Transform"');return d.selectSingleNode(a)},XPath_nl:c,$:c,o2xml:t,createElement:a,cleanElement:g,DEFAULT_XML:'<?xml version="1.0" encoding="UTF-8"?><r/>',promise:function(a){return new Promise(a)}};
return v});(function(c,r){r(k)})(this,function(c){function k(c,a,e){a.setProperty("AllowXsltScript",!0);c=c.transformNode(a);e&&(e.innerHTML=c);return c}function e(){var c=new ActiveXObject("Msxml2.DOMDocument.6.0");c.loadXML(DEFAULT_XML);return c}"ActiveXObject"in window&&(c.onSetHeader=function(c){try{c.responseType="msxml-document"}catch(a){}},c.transform=k,c.createXml=e);return c});(function(c,r){r(k)})(this,function(c){function k(a,c){try{return e.apply(this,arguments)}catch(q){console.error(q,
a,c)}return m()}function e(a,d){var l=m([]);d||(d=this);m(d).each(function(d,e){var u=c.XPath_nl(a,e);for(d=0;d<u.length;d++)l.push(u[d])});return l}function t(l){if(!a(l)&&"$then"in l||l instanceof m)return l;if(l.childNodes)return m(l);if("string"===typeof l&&"<"===l.charAt(0))return m(c.getXml(l));var e=arguments,q=new d(this,function(a,l){c.getXml.apply(this,e).then(function(l){a(q.result=m(l))},function(a){l(a)})});return q}function a(a){return"string"===typeof a}function g(l){return a(l)&&"<"===
l.charAt(0)}function d(a,c,d){a&&a.segments&&a.segments.push(this);this.parentQuery=a;this.method=c;this.args=d;this.segments=[];this.branches=[];jQuery.fn.init.call(this,a||[]);f.call(this,a&&a.promise())}function v(a,c){function l(){return new d(this,c,arguments)}l.orig=function(){return a.apply(this,arguments)};return l}function f(a){var l=this,c=new d.actions[l.method](l),e;c.segment=this;c.promise={parentPromise:a};!a||this.parentQuery instanceof d||(a.result=this.parentQuery);this.branches.push(c);
var f=new Promise(function(d,u){function q(a){D(f,"onComplete result",a);m===a?d(y(a)):a&&a&&"function"===typeof a.then?y((m=a).then(q,g)):d(y(a))}function g(a){try{u(y(a))}catch(E){c.onAbort(E)}}function k(a){try{c.interrupt(a)}catch(E){c.onAbort(E)}}function y(a){f&&(f.result=a);return e=a}c.onComplete=q;c.OnFail=g;c.onAbort=function(a){u(a||new F(l))};a?a.then(function(){return e=c.run.apply(c,arguments)},k)["catch"](g):setTimeout(function(){try{e=c.run()}catch(O){g(O)}},0);var m});f.result!==
e&&(f.result=e);c.promise=f;f.parentPromise=a;D(f,"method",l.method);this.promise=function(){return f};return l}function x(a,c){Array.prototype.forEach.call(a,c)}function n(a){var c=[];for(a=a.parentPromise;a;a=a.parentPromise)c.push("result"in a?a.result:a);return c}function p(a,c,d){return c.apply(a,n(d))}function H(){}function z(){}function A(a){var c=a.args[0];a=a.args[1];this.ms=1*c===c?c:a||0;this.cb="function"===typeof c?c:"function"===typeof a?a:0}function I(a){this.run=function(){try{return this.onComplete(m.fn[a.method].apply(m(a),
a.args))}catch(u){this.OnFail(u)}}.bind(this);this.interrupt=function(a){this.onAbort(a)}.bind(this)}function J(a,c){var d=c[0],l=c[1],e=c[2];2==c.length&&l instanceof m.fn.init&&(e=l,l=d,d=a.parentQuery);e||(e=a instanceof m.fn.init?a:m());return[d,l,e]}function K(c,e,f){var l=J(this,arguments),u,q;a(c)&&(g(c)?c=t(c):u=c);a(e)&&(g(e)?e=t(e):q=e);return u||q?new d(this,"xmlTransform",l):L.apply(this,l)}function L(e,f,q){var l=c.transform(e,f),g=q&&q.ownerDocument||document,u=a(l);q?(e=q instanceof
d?m(q):q,e.each(function(a,d){if(u)return d.innerHTML=l;c.cleanElement(d);d.appendChild(g.importNode(l.documentElement||l,!0))})):(e=m(),e.push(l.documentElement||l));return e}function B(a,c){a.prototype=new c;return a}function w(a,c){return d.actions[c]=B(a,z)}function Q(){var a=[];x(arguments,function(c){x(c,function(c){a.push(c)})});return a}function G(){}function F(){}function D(a,c,d){location&&location.search&&(0<location.search.indexOf("debug")||0<location.search.indexOf("test"))&&(console&&
console.log&&console.log.apply(console.log,arguments),a["debug_"+c]=d)}var m=jQuery;m.extend(m.fn,{xPath:k,xmlTransform:K,loadXml:t,sleep:function(a){debugger;return a||0},$then:function(a,c){try{return a&&a()}catch(q){return c(q)}}});d.prototype=Object.create(jQuery.fn);d.prototype.constructor=d;m.extend(d.prototype,{result:void 0,XPath:function(a,c){var d=arguments;return this.$then(function(a){return e.apply(a,d)})},fork:function(a){var c=new d(a||this.parentQuery,this.method,this.args);this.segments.forEach(function(a){a.fork(c)});
return c},interrupt:function(a){this.actions.forEach(function(c){c.interrupt(a||new F(zs))},this)},then:function(a,c,d){return this.promise().then(a,c,d)},promise:function(a){var c=this.branches;return c[0<=a?a:0>a?c.length-a:c.length-1].promise}});d.actions={interrupt:0,repeat:0};m.extend(z.prototype,{run:H,isAlive:H,interrupt:function(){debugger;this.OnAbort(a0)}});w(A,"sleep");m.extend(A.prototype,{run:function(){this.h=setTimeout(function(){try{this.onComplete(this.cb?p(this.segment,this.cb,this.promise):
this.ms)}catch(l){OnFail(l)}}.bind(this),this.ms)},interrupt:function(a){this.h&&(this.h=clearTimeout(h)&&0);this.OnAbort(a)},isAlive:function(){return!!this.h}});m.sleep=function(){return new d(0,"sleep",arguments)};w(function(a){var c=a.args[0],d=a.args[1],e;this.run=function(){e=this.promise;return this.onComplete(c?p(a,c,e):c)}.bind(this);this.interrupt=function(c){if(e&&e.result===c)this.onAbort(c);else try{return e=this.promise,this.onComplete(d?p(a,d,this.promise):c)}catch(M){e.result=M;try{this.OnFail(d?
p(a,d,{parentPromise:e}):M)}catch(N){this.OnFail(N)}}}.bind(this);this.isAlive=function(){return!!e}},"$then");w(function(d){var e;this.run=function(){e=this.promise;try{var f=d.args[0];if(!a(f)&&"$then"in f||f instanceof m||f.childNodes)return this.onComplete(f);if("string"===typeof f&&"<"===f.charAt(0))return this.onComplete(c.getXml(f));var l=c.getXml.apply(this,d.args).then(function(a){d.push.orig.call(d,a);return a});return this.onComplete(l)}catch(C){this.OnFail(C)}}.bind(this);this.interrupt=
function(a){this.onAbort(a)}.bind(this);this.isAlive=function(){return!!e}},"xml");w(I,"jQAttr");w(function(a){var c=this,d=a.args[0];this.run=function(){try{var e=new Promise(function(c){function e(l){c(l);f.off(d,e);a.fork()}var f=m(a).on(d,e)});return c.onComplete(e)}catch(C){c.OnFail(C)}};this.interrupt=function(a){c.off(d)}},"$on");w(function(a){var c;this.run=function(){c=this.promise;try{var d=Q(a.args,n(c));return this.onComplete(k.apply(m(a),d))}catch(y){this.OnFail(y)}}.bind(this);this.interrupt=
function(a){this.onAbort(a)}.bind(this)},"xPath");w(function(a){this.run=function(){function d(a){return a&&a.ownerDocument&&a.ownerDocument.documentElement?a:a.promise?a.promise():c.getXml(a)}var e=J(a,a.args),f=e[0],l=e[1],g=e[2];try{var k=d(f),m=d(l),n=Promise.all([k,m]).then(function(a){return L(a[0],a[1],g)});D(n,"xmlTransform_sources",[k,m]);return this.onComplete(n)}catch(P){this.OnFail(P)}}.bind(this);this.interrupt=function(a){this.onAbort(a)}.bind(this)},"xmlTransform");d.InterruptedException=
B(G,Error);d.AbortInterruptedException=B(F,G);d.DestroyInterruptedException=B(function(){},G);(function(a,c){var d={},e;for(e in a)d[e]=c.call(a,e);return d})(m.fn,function(a){if(!("function"!==typeof this[a]||"constructor"===a||0<="|each|".indexOf("|"+a+"|"))){var c=d.prototype;c[a]=v(c[a],a);d.actions[a]||(d.actions[a]=I)}});m.fn.sleep=d.prototype.sleep;m.$then=function(){return new d(0,"$then",arguments)};m.fn.$then=function(){return new d(this,"$then",arguments)};m.fn.$on=function(){return new d(this,
"$on",arguments)};m.xPath=function(a,c){return m().xPath(a,c)};m.xmlTransform=K;m.fn.xml=function(a){return a instanceof d?a:new d(this,"xml",arguments)};m.Xml=function(a){return a instanceof d||a instanceof m.fn.init?a:new d(0,"xml",arguments)};return m.Xml.Constructor=d})})();
