define(["require", 'intern!object', 'assert', 'xml4jquery'], function (require, registerSuite, assert) {
    "use strict";
    let $ = jQuery
    ,   xmlUrl = require.toUrl("./test.xml")
    ,   xslUrl = require.toUrl("./test.xsl");

    return registerSuite(
    {   name: "string arguments"
    ,   "$(a).sleep(1).$then(2).$then('z').$then('$0-$1-$2+$1')": ()=>
        {
            return $("<a></a>")
                      .sleep( 1 )
                      .$then( 2 )
                      .$then( ev => 'z' )
                      .$then("$0-$1-$2+$1")
                      .$then( x=>   {
                                        assert( "z-2-1+2" === x );
                                    });
        }
    ,   "$(a).$then('test.xml').xml('$0').xPath( '//branch' )": ()=>
        {
            return $("<a></a>")
                      .$then( xmlUrl )
                      .xml( '$0' )
                      .xPath( '//branch' )
                      .$then( x=>   {
                                        assert( 2 === x.length && 'branch' === x[0].nodeName );
                                    });
        }
    });
});