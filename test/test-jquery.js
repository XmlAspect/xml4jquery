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
    let $ = jQuery;

    return registerSuite(
        {   name    :   "xml4jQuery jQuery API marshalling"
        ,   ".attr(name)": ()=>
                $("<hr title='abc'/>").sleep()
                    .attr('title').then( t=> assert( t === 'abc' ) )
        ,   ".attr( name, val )": ()=>
            {
                let $el = $("<hr title='abc'/>");
                return $el.sleep()
                        .attr('title','def')
                        .then( ()=> assert( 'def' === $el.attr('title')) )
            }
        ,   ".prop(name)": ()=>
                $("<hr title='abc'/>").sleep()
                    .prop('title').then( t=> assert( t === 'abc' ) )
        ,   ".prop( name, val )": ()=>
            {
                let $el = $("<hr title='abc'/>");
                return $el.sleep()
                        .prop('title','def')
                        .then( ()=> assert( 'def'=== $el.prop('title')) )
            }
        ,   "todo":
            {   ".getClass"     : todo
            ,   ".setClass"     : todo
            ,   ".html()"       : todo
            ,   ".html(val)"    : todo
            ,   ".append(val)"  : todo
            }
        });
    function todo(){}
});