/*********************************************************************
 *
 * SIMULATION WORKS CONFIDENTIAL
 * _____________________________
 *
 *  Copyright 2015 Simulation Works, LLC
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Simulation Works, LLC.  The intellectual and
 * technical concepts contained herein are proprietary to
 * Simulation Works, LLC and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Simulation Works, LLC.
 *********************************************************************/
define( ["require", 'intern!object', 'assert'
    , 'xml4jquery'
], function( require, registerSuite, assert )
{
    var $ = jQuery
    ,   xmlUrl = require.toUrl("./test.xml")
    ,   xslUrl = require.toUrl("./test.xsl")
    ,   params = urlParams()
    ,   timeout = 1*( params.timeout || 500 );

    registerSuite(
    {   "jQuery loaded"     : function(){ assert( "jQuery"      in window ); }
    ,   "Load(wrongUrl)": function()
        {   var d   = this.async(timeout)
            ,   ret = $.Xml( "wrong url" );
            try
            {   ret .then( NOP, NOP )
                    .then( ERR(d) )
                    .then( ERR(d), PASS(d) );
            }catch( ex )
                {   debugger;
                    d.reject(ex); }
        }
    ,   "Load(xml)": function()
        {   var d   = this.async(timeout)
            ,   ret = $.Xml( xmlUrl );

            ret .then( function( $xml )
                {
                    assertD( d, $xml.length == 1 );
                    assertD( d, $xml[ 0 ].documentElement );
                })
                .then( PASS(d), ERR(d) );
        }
    ,   "$xml.then(1).then(2).then(3)"   : function()
        {   var d   = this.async(timeout)
            ,   $lst = $.Xml(xmlUrl )
            ,   i = 0;
            $lst
                .then( function( $xml )
                {   assertD( d, $xml === $lst );
                    assertD( d, 0 === i++ );
                }, ERR(d))
                .then( function( $xml )
                {   assertD( d, $xml === $lst );
                    assertD( d, 1 === i++ );
                }, ERR(d))
                .then( function( $xml )
                {   assertD( d, $xml === $lst );
                    assertD( d, 2 === i++ );
                    d.resolve(1);
                }, ERR(d));
        }
    ,   "$xml.find().attr()"   : function()
        {   var d   = this.async(timeout);
            $.Xml(xmlUrl )
                .then( function( $xml )
                {
                    assertD( d, "left" == $xml.find('*[side]').attr('side') );
                    d.resolve(1);
                }, ERR(d) );
        }
    //,   "new $.Xml()": NOP

    ,   "$(div).xmlTansform( xmlUrl, xslUrl )"  : function()
        {   var d   = this.async(timeout);
            try
            {   var $el = $("<div>testing</div>");
                assert( "xmlTransform" in $el );
                var $r = $el.xmlTransform( xmlUrl, xslUrl );
                    $r=$r.then( function()
                    {
                        //debugger;
                    }, ERR(d) )
                    .then( NOP, ERR(d)  )
                    .then( function( $result )
                    {
                        assertD( d, $el === $result );
                        if( "side" != $result.find("*[title]").attr("title")  )
                            d.reject( $result );
                        else if( "left" != $result.find("*[title]").attr("value")  )
                            d.reject( $result );
                        else
                            d.resolve(1);
                    });
                assert( "xmlTransform" in $el );
                assert( "xmlTransform" in $r  );
            }catch( ex )
                { d.reject(ex); }
        }
    //,   "a=$.Xml(xmlUrl), b=$.Xml(a); a===b": function()
    //    {
    //        var d = this.async(timeout)
    //        ,   a = $.Xml(xmlUrl)
    //        ,   b = $.Xml(a);
    //        assertD( d, a === b );
    //        a.then( function(c)
    //        {   assertD( d, a === b );
    //            assertD( d, a === c );
    //            d.resolve(1);
    //        });
    //    }
    ,   "$.Xml(xmlUrl).then(1).xmlTransform( xslUrl, $('.mywidget') ).then(2)"  : function()
        {   var d   = this.async(timeout);
            try
            {   var $el = $("<div>testing</div>")
                ,   step = 0;
                $.Xml(xmlUrl )
                    .then( function( $xml )
                    {   assertD( d, 0 == step++ );
                        assertD( d, 'root' == $xml[0 ].documentElement.nodeName );
                    },  ERR(d) )
                    .xmlTransform( xslUrl, $el )
                    .then( function()
                    {   assertD( d, 1 == step++ );
                    },  ERR(d) )
                    .then( function( $result )
                    {
                        assertD( d, 2 == step );
                        if( "side" != $el.find("*[title]").attr("title")  )
                            d.reject( $result );
                        else if( "left" != $result.find("*[title]").attr("value")  )
                            d.reject( $result );
                        else
                            d.resolve(1);
                    });
            }catch( ex )
                { d.reject(ex); }
        }
    ,   "$.Xml(xmlUrl).then( function($xml){ $xml.XPath().XPath() })"    : function()
        {
            var d   = this.async(timeout);
            try
            {   $.Xml(xmlUrl )
                    .then( function( $xml )
                    {   try
                        {   var $xx = $xml.XPath("//branch");
                            assertD( d, 2 == $xx.length );
                            assertD( d, 'branch' == $xx[0].nodeName );
                            assertD( d, 1 == $xx.XPath(".//leave" ).length );
                            d.resolve(1);
                        }catch(ex){ d.reject(ex); }
                    },  ERR(d) );
            }catch( ex )
                { d.reject(ex); }
        }
    ,   "$.Xml(xmlUrl).XPath('//stem').then( function($stems){ $stems.XPath('//leave') })"    : function()
        {
            var d   = this.async(timeout);
            try
            {   $.Xml(xmlUrl )
                    .XPath("//stem")
                    .then( function( $xml )
                    {   try
                        {   var $xx = $xml.XPath("branch");
                            assertD( d, 2 == $xx.length );
                            assertD( d, 'branch' == $xx[0].nodeName );
                            assertD( d, 1 == $xx.XPath(".//leave" ).length );
                            d.resolve(1);
                        }catch(ex){ d.reject(ex); }
                    },  ERR(d) );
            }catch( ex )
                { d.reject(ex); }
        }
    ,   "$.Xml(xmlUrl).then($xml).XPath('//stem').then($stems).XPath('//leave').then($leaves) })"    : function()
        {
            var d   = this.async(timeout);
            try
            {   $.Xml(xmlUrl )
                    .then( function( $xml )
                    {   assertD( d, 1 == $xml.length );
                        assertD( d, $xml[0].documentElement );
                    })
                    .XPath("//stem")
                    .then( function( $xx )
                    {   try
                        {   assertD( d, 3 == $xx.length );
                            assertD( d, 'stem' == $xx[1].nodeName );
                        }catch(ex){ d.reject(ex); }
                    },  ERR(d) )
                    .XPath(".//leave")
                    .then( function( $xx )
                    {   try
                        {   assertD( d, 2 == $xx.length );
                            assertD( d, 'leave' == $xx[0].nodeName );
                            d.resolve(1);
                        }catch(ex){ d.reject(ex); }
                    },  ERR(d) );
            }catch( ex )
                { d.reject(ex); }
        }
    });
    function NOP(){}
    function PASS(d){ return function()
    {
        d.resolve(1);
    } }
    function ERR (d){ return function(err)
    {   debugger;
        d.reject(err);
    } }
    function assertD( d, cond )
    {   if( cond )
            return;
        debugger;
        d.reject();
    }
    function urlParams( s )
    {    var arr = ( s || decodeURIComponent(location.search.slice(1)) ).split('&')
        ,   i = 0
        ,   o = {};
        for( ; i< arr.length; i++ )
        {
            var kv = arr[i].split('=');
            o[kv[0]]= kv[1];
        }
        return o;
    }
});