# Xml4jQuery 

**jQuery reactive plugin to supply XML, XPath and XSLT functionality.**

```js
$(".toFill").html("Click here")
                .$on('click')
                .html('Loading...')
                .sleep(1000)
                .xmlTransform( 'test/test.xml', 'test/test.xsl')
                .toggleClass('clickable')
                .prepend("Still clickable <hr/>");
```
    
For details refer to primary project page <a href="http://xml4jquery.com">xml4jquery.com</a>

## Including into project 

`xml4jquery.js` is distributed as <b>npm</b> module and is available on CDN.

##Licensing

It is a free to use and distribute binary library. The license agreement is embedded into
<code>xml4jquery.js</code> file. 

Commercial licence available upon request to
<a href="mailto:support@simulationworks.com?subject=xml4jquery commercial licence">support@simulationworks.com</a>.

##Support

<b><a href="https://groups.google.com/d/forum/xml4jquery">Mail list</a></b> hosted by google groups; see the project page
for more options.
