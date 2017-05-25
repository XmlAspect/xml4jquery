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
    var $ = jQuery
    ,   $f = $.Xml.Constructor
    ,   xmlUrl = require.toUrl("./test.xml")
    ,   xslUrl = require.toUrl("./test.xsl");

    registerSuite(
    {   name:"Fork"
    ,   "fork sub-branches": function()
        {
            var passed  = {}
            ,   $stem   = $ .sleep( function()
                                {   return inc('common'); })
                            .$then();
            var $br1 =  $stem.$then( function()
                                {   return inc('afterFork1') } );
            var $br2 = $stem.fork();
            var $br3 = $br1.fork();

            return Promise.all( [$br1.promise(), $br2.promise(), $br3.promise()] ).then( function()
            {
                assert( 1 == passed.common  );
                assert( 3 == passed.afterFork1  );
            });
            function inc(k){ return passed[k]= 1+( passed[k] || 0 ); }
        }
    });

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