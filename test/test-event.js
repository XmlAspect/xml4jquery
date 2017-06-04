/*********************************************************************
 *
 * SIMULATION WORKS
 * _____________________________
 *
 *  Copyright 2017 Simulation Works, LLC
 *  All Rights Reserved.
 *
 *********************************************************************/
define  ( ["require", 'intern!object', 'assert', 'xml4jquery' ]
        , function( require , registerSuite  ,  assert )
{
    "use strict";
    var $ = jQuery;

    return registerSuite(
    {   name    :    "Events"
    ,   "$on(click)": function()
        {
            var d = this.async();
            var $node = $("<a></a>")
            ,   counter=0;
            $node.$on('click' ).$then( function(ev)
            {   counter++;
                console.log("onClick", counter );
                assert( 'function' === typeof ev.stopPropagation );
                assert( 'click' === ev.type );
            });
            // immediate call $node.click() will not be trapped as $on Promise where callback is set is resolved asynchronously
            setTimeout( function()
            {
                assert( 0 === counter );
                $node.click();
                setTimeout(function()
                {   assert( 1 === counter );
                    $node.click();
                    setTimeout(function()
                    {   assert( 2 === counter );
                        d.resolve(1);
                    },10 );
                },10 );
            },10 );
            return d;
        }
    ,    "showcase": function()
        {
            var counter = 0
            ,   $el     = $("<a></a>");
            $el.$on( 'click' ).$then( function(ev){ console.log( counter++ ) && assert( 'click' === ev.type ) });
            return $el
                    .sleep( 10 ) // wait for click handler initialized asynchronously
                    .click()
                    .sleep( 10 ) // wait for click handler run asynchronously
                    .$then( function(){ assert( 1 === counter ) })
                    .click()
                    .sleep( 10 )
                    .$then( function(){ assert( 2 === counter )} );

        /*
            let $submitChain = $('form').$on('submit,keypress[keycode=13 or keycode=32 or which=13 or which=32])');
            // submit, Enter or Space

            $submitChain.attr('disabled','disabled')
              .$then( validateForm )
              .$ajax(url,{method:'POST'})
              .attr('pending');

            $submitChain.$on('keypress[keycode=27]')
              .removeAttr('disabled')
              .interrupt();// cancel $submitChain and its ajax if it was initiated

            $(window).$on('devicemotion[acceleration/x > 0.5]').interrupt($submitChain);
            $(window).$on('unload').destroy($submitChain);
        */
        }

    });
});