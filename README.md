# `Xml4jQuery` 

[![Dependencies][deps-image]][deps-url]
[![devDependencies][dev-deps-image]][dev-deps-url]
[![NPM version][npm-image]][npm-url]

**jQuery reactive plugin to supply XML, XPath and XSLT functionality.**

```javascript
$(".toFill").html("Click here")
                .$on('click')
                .html('Loading...')
                .sleep(1000)
                .xmlTransform( 'test/test.xml', 'test/test.xsl')
                .toggleClass('clickable')
                .prepend("Still clickable <hr/>");
```
    
More on project page <a href="http://xml4jquery.com">xml4jquery.com</a>

## Including into project 

`xml4jquery.js` is distributed as <b>npm</b> module and is available on CDN.

## Licensing

It is a free to use and distribute binary library. The license agreement is embedded into
<code>xml4jquery.js</code> file. 

Commercial licence available upon request to
<a href="mailto:support@simulationworks.com?subject=xml4jquery commercial licence">support@simulationworks.com</a>.

## Support

<b><a href="https://groups.google.com/d/forum/xml4jquery">Mail list</a></b> hosted by google groups; 
see the <a href="http://xml4jquery.com">xml4jquery.com</a> for more options.

[npm-image]:      https://img.shields.io/npm/v/xml4jquery.svg
[npm-url]:        https://npmjs.org/package/xml4jquery
[deps-image]:     https://img.shields.io/david/XmlAspect/xml4jquery.svg
[deps-url]:       https://david-dm.org/XmlAspect/xml4jquery
[dev-deps-image]: https://img.shields.io/david/dev/XmlAspect/xml4jquery.svg
[dev-deps-url]:   https://david-dm.org/XmlAspect/xml4jquery?type=dev
