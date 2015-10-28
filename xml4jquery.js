/*
Copyright 2015 Simulation Works, LLC
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

*/
(function(){var r;(function(m,p){r=p()})(this,function(){function m(a,c){function d(a,c){var d=[],e,b;e=k.createNSResolver&&k.createNSResolver(k.documentElement);if(k.evaluate)for(b=(c.ownerDocument||c).evaluate(a,c,e,0,null);e=b.iterateNext();)d.push(e);else for(k.setProperty("SelectionLanguage","XPath"),k.setProperty("SelectionNamespaces",'xmlns:xsl="http://www.w3.org/1999/XSL/Transform"'),e=0,b=c.selectNodes(a);e<b.length;e++)d.push(b[e]);return d}var k=(c||a[0]).ownerDocument||c,e=[];e.ownerDocument=
k;"string"==typeof a?e=d(a,c):e.push.apply(e,a);var b=e[0]||l("b",k);h(b,function(a,c){e[c]=function(){var a=arguments,d=0,k=this.length;for(this._ret=[];d<k;d++){var e=this[d],b=e[c];"function"===typeof b?b=b.apply(e,a):a.length&&(b=e[c]=a[d%a.length]);this._ret[d]=b}return this}},e);e.attr=function(a,c){return 1<arguments.length?e.setAttribute(a,c):e[0]&&e[0].getAttribute(a)};e.val=function(){return this[0]&&this[0].value};e.createChild=p;e.$=function(a){var c=[];this.forEach(function(e){c.push.apply(c,
d(a,e))});return m(c,k)};e.$ret=function(){return m(this._ret,k)};return e}function p(a,c){this.forEach(function(d,k){var e=this._ret[k]=d.ownerDocument.createElementNS("http://apifusion.com/ui/vc/1.0",a),b;for(b in c)e.setAttribute(b,c[b]);d.appendChild(e)},this);return this}function q(a,c){function d(a,c){f.forEach(function(d){d(a,c)})}function b(a,c){e.forEach(function(d){d(a,c)})}c||(c={});var e=[],f=[],l={then:function(a,c){a&&e.push(a);c&&f.push(c);return this},options:c},g=new XMLHttpRequest;
h(c,function(a,c){g[c]=a});c.method=c.method||"GET";"onerror"in g&&(g.onerror=d);g.onreadystatechange=function(){if(4===g.readyState){c.responseHeaders=g.getAllResponseHeaders();c.requestUrl=a;if(200!==g.status)return d(Error(g.status+" "+g.statusText+" @ "+a),g);try{if(g.responseXML)return b(g.responseXML,g);b((new DOMParser).parseFromString(g.responseText,"application/xml"),g)}catch(e){d(e,g)}}};g.open(c.method,a,!0);g.setRequestHeader&&g.setRequestHeader("Accept","application/xml, text/xml, application/xhtml+xml, text/xsl, text/html, text/plain");
g.setRequestHeader&&h(c.headers||{},function(a,c){g.setRequestHeader(c,a)});n.onSetHeader(g);g.send();return l}function b(a,c,d){d=d||n.createXml().documentElement;var k=function(a){a=n.createElement(a,d.ownerDocument||d);d.appendChild(a);return a}(c);a instanceof Array?a.forEach(function(a){b(a,"r",k)}):a instanceof Object?h(a,function(a,c){b(a,c,k)}):(a=k.ownerDocument.createTextNode(""+a),k.appendChild(a));return k}function l(a,c,d){return d&&c.createElementNS?c.createElementNS(d,a):c.createElement(a)}
function f(a){for(;a&&a.lastChild;)a.removeChild(a.lastChild)}function h(a,c,d){if(a){var b;if(d)if("string"===typeof c)for(b in a)d[c].call(d,a[b],b,a);else for(b in a)c.call(d,a[b],b,a);else for(b in a)c(a[b],b,a)}}var n={load:function(a,c,d){return q(c.toUrl(a)).then(d,d)},getXml:q,onSetHeader:function(a){},createXml:function(){return(new DOMParser).parseFromString('<?xml version="1.0" encoding="UTF-8"?><r/>',"application/xml")},transform:function(a,c,d){var b=new XSLTProcessor;b.importStylesheet(c);
return d?(f(d),d.appendChild(b.transformToFragment(a,d.ownerDocument)),d):b.transformToDocument(a)},XPath_node:function(a,c){var b=c.ownerDocument||c,f=b.createNSResolver&&b.createNSResolver(b.documentElement);if(b.evaluate)return(c.ownerDocument||c).evaluate(a,c,f,9,null).singleNodeValue;b.setProperty("SelectionLanguage","XPath");b.setProperty("SelectionNamespaces",'xmlns:xsl="http://www.w3.org/1999/XSL/Transform"');return c.selectSingleNode(a)},XPath_nl:m,$:m,o2xml:b,createElement:l,cleanElement:f,
DEFAULT_XML:'<?xml version="1.0" encoding="UTF-8"?><r/>'};return n});(function(m,p){p(r)})(this,function(m){function p(b,l,f){l.setProperty("AllowXsltScript",!0);b=b.transformNode(l);f&&(f.innerHTML=b);return b}function q(){var b=new ActiveXObject("Msxml2.DOMDocument.6.0");b.loadXML(DEFAULT_XML);return b}"ActiveXObject"in window&&(m.onSetHeader=function(b){try{b.responseType="msxml-document"}catch(l){}},m.transform=p,m.createXml=q);return m});(function(m,p){p(r)})(this,function(m){function p(b,f){for(var h in b)f.call(b,
h)}function q(b,f){p(f,function(h){"function"==typeof f[h]&&0>"|isRejected|isResolved|Copyright Simulation Works, LLC|promise|state|".indexOf("|"+h+"|")?b[h]=function(){f[h].apply(f,arguments);return b}:b[h]=f[h]})}var b=jQuery;b.fn.XPath=function(l,f){function h(){try{b.Xml(f).each(function(a,b){var f=m.XPath_nl(l,b);for(a=0;a<f.length;a++)n.push(f[a])}),a.resolve(n)}catch(c){a.reject(c)}}var n=b([]),a=b.Deferred();f||(f=this);"resolved"==this.state()?h():this.then(h,function(b){a.reject(b)});q(n,
a);return n};b.fn.xmlTransform=function(l,f){var h=this,n,a,c=b.Deferred(),d=this;"then"in this?(n=this,a=arguments[0],d=1<arguments.length?b(arguments[1]):void 0):(n=l,a=f);var k=b.Xml(n),e=b.Xml(a);b.when(k,e).then(function(){try{var a=m.transform(k[0],e[0]),f=h[0]&&h[0].ownerDocument||document,g="string"===typeof a;!g&&"documentElement"in a&&(a=a.documentElement);d&&d.each(function(b,c){if(g)return c.innerHTML=a;m.cleanElement(c);c.appendChild(f.importNode(a,!0))});c.resolve(d||b.Xml(a))}catch(l){c.reject(l)}},
function(a){c.reject(a)});q(h,c);return h};b.Xml=function(l){if("string"!==typeof l&&"then"in l)return l;var f=b([]),h=b.Deferred();l.childNodes?(f.push(l),h.resolve(f)):m.getXml(l).then(function(b){f.push(b);h.resolve(f)},function(b){h.reject(b)});q(f,h);return f}})})();
