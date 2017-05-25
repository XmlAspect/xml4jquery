/*********************************************************************
 *
 * SIMULATION WORKS
 * _____________________________
 *
 *  Copyright 2017 Simulation Works, LLC
 *  All Rights Reserved.
 *
 *********************************************************************/
define  ( ["require", 'intern!object', 'test/assert', 'xml4jquery' ]
        , ( require , registerSuite  ,  assert ) =>
{
    "use strict";
    let $ = jQuery
    ,   xmlUrl = require.toUrl("./test.xml")
    ,   xslUrl = require.toUrl("./test.xsl");

    return registerSuite(
        {   name    :   "xml4jQuery XML API"
        ,   "$.Xml(wrongUrl).then( , err )": ()=>$.Xml( "wrong url testing" ) .then( x=> assert(0), x=>1 )
        ,   "$.Xml( xmlUrl ).then(xml)": ()=>
            {   let $x = $.Xml( xmlUrl );

                return $x .then( xml =>
                {   assert( xml.documentElement );
                    assert( $x.length === 1 );
                    assert( $x[ 0 ].documentElement );
                    assert( $x[ 0 ].documentElement.nodeName === 'root' );
                });
            }
        ,   "$.Xml.then(1).then(2).then(3)"   : ()=>
            {   let $lst    = $.Xml( xmlUrl )
                ,   i       = 0;
                return $lst
                    .then(  xml =>
                    {   assert( 0 === i++ );
                        return xml;
                    }, x=> assert(0) )
                    .then(  xml =>
                    {   assert( 1 === i++ );
                        return xml;
                    }, x=> assert(0) )
                    .then( xml =>
                    {   assert( 2 === i++ );
                        assert( xml.documentElement );
                    }, x=> assert(0) );
            }
        ,   "$.Xml(xmlUrl).then{ $(xml).find().attr() }"   :
            ()=> $.Xml( xmlUrl )
                    .then( xml =>assert( "left" === $(xml).find('*[side]').attr('side') ) )

        ,   "$(.non-exist).xmlTansform( xmlUrl, xslUrl )": ()=>
            {   let $el = $(".non-exist");
                assert( "xmlTransform" in $el );
                return $el.xmlTransform( xmlUrl, xslUrl ).then( function( $result )
                {   assert( $el === $result );
                    assert( $el.length === 0 );
                });
            }
        ,   "$(div).xmlTansform( xmlUrl, xslUrl )"  : ()=>
            {   let $el = $("<div>testing</div>");
                    assert( "xmlTransform" in $el );
                    return $el.xmlTransform( xmlUrl, xslUrl ).then(  $result =>
                    {
                        assert( $el === $result );
                        assert( "side" === $result.find("*[title]").attr("title")  );
                        assert( "left" === $result.find("*[title]").attr("value")  );
                    });
            }
        ,   "a=$.Xml(xmlUrl), b=$.Xml(a); a===b": ()=>
            {
                let a = $.Xml( xmlUrl )
                ,   b = $.Xml( a );
                assert( a === b );
                return a.then( c => assert( a === b ) );
            }
        ,   "$.Xml(xmlUrl).xmlTransform( xslUrl, $('.mywidget') ).$then( html in mywidget )"  : ()=>
            {
                let $el = $("<div>testing</div>");
                return $.Xml( xmlUrl )
                    .xmlTransform( xslUrl, $el )
                    .$then( $result =>
                    {   assert( $result === $el );
                        assert( "side" === $el.find("*[title]").attr("title")  );
                        assert( "left" === $result.find("*[title]").attr("value")  );
                    });
            }
        ,   "$.Xml(xmlUrl).xPath().then( $xx.xPath() )"    : ()=>
            {
                return $.Xml( xmlUrl ).XPath("//branch")
                    .then( function( $xx )
                    {   assert( 2 === $xx.length );
                        assert( 'branch' === $xx[0].nodeName );
                        assert( 1 === $xx.xPath(".//leave" ).length );
                    });
            }
        ,   "$.Xml(xmlUrl).XPath('//stem').then( $stems => $stems.XPath('//leave') )"    : ()=>
            {
                return $.Xml( xmlUrl )
                    .xPath("//stem")
                    .then( function( $xml )
                    {   let $xx = $xml.xPath("branch");
                        assert( 2 === $xx.length );
                        assert( 'branch' === $xx[0].nodeName );
                        assert( 1 === $xx.xPath(".//leave" ).length );
                    });
            }
        ,   "$.Xml(xmlUrl).$then($xml).XPath('//stem').$then($stems).XPath('//leave').then($leaves) })"    : ()=>
            {
                return $.Xml( xmlUrl )
                    .$then( xml =>
                    {   assert( xml.documentElement );
                        return xml;
                    })
                    .xPath("//stem")
                    .$then( $xx =>
                    {   assert( 3 === $xx.length );
                        assert( 'stem' === $xx[1].nodeName );
                        return $xx;
                    })
                    .xPath(".//leave")
                    .$then( $xx =>
                    {   assert( 2 === $xx.length );
                        assert( 'leave' === $xx[0].nodeName );
                    });
            }
        // ,   "synchronous API":
        //     {   "$xmlTransform(xmlDoc, xslDoc)" : function()
        //         {   assert( typeof $.xmlTransform === 'function' );
        //             let px = $.Xml(xmlUrl ).promise()
        //                 ,   ps = $.Xml(xslUrl ).promise();
        //             return Promise.all( [px,ps] ).then( function( xmlXslArr )
        //             {   let xml = xmlXslArr[0]
        //                 ,   xsl = xmlXslArr[1]
        //                 ,   $el = $.xmlTransform( xml, xsl );
        //                 assert( IsTransformedEl($el) );
        //             })
        //         }
        //     }
        });
});