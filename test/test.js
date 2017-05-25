/*********************************************************************
 *
 * SIMULATION WORKS
 * _____________________________
 *
 *  Copyright 2015-2017 Simulation Works, LLC
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
        {   name    :   "xml4jQuery basics"
        ,   "jQuery loaded"     : ()=> assert( "jQuery" in window )
        ,   "XML basics":
            {   "$.Xml(xmlUrl).then{ $(xml).find().attr() }"   :
                ()=> $.Xml( xmlUrl )
                    .then( xml =>assert( "left" === $(xml).find('*[side]').attr('side') ) )

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
            }
        });
});