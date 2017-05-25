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
    ,   $f = $.Xml.Constructor
    ,   xmlUrl = require.toUrl("./test.xml")
    ,   xslUrl = require.toUrl("./test.xsl");

    return registerSuite(
    {   name    : "Promise and xml4jQuery chaining"
    ,   "InterruptedException inheritance": function()
        {
            assert( ( new $f.AbortInterruptedException() ) instanceof $f.InterruptedException );
            assert( ( new $f.DestroyInterruptedException() ) instanceof $f.InterruptedException );
        }
    ,   "$then and parameters in chaining":
        {
            "Error handling":
            {   "Native Promise sanity test Promise.then( thow err).then(, err)"   : ()=>
                {
                    return new Promise( (resolve,reject)=> resolve(1) )
                        .then( a0 =>
                        {   assert( 1 === a0 );
                            throw 10;
                        }, err )
                        .then( err, function( a0 )
                        {   assert( 1  === arguments.length );
                            assert( 10 === a0 );
                            return 20;
                        })
                        .then( function( a0 )
                        {   assert( 1  === arguments.length );
                            assert( 20 === a0 );
                            throw 30;
                        }, err )
                        .then( err, function( a0 )
                        {   assert( 1  === arguments.length );
                            assert( 30 === a0 );
                            return new Promise( function( resolve ){ resolve(40) } );
                        }, err )
                        .then( function( a0 )
                        {   assert( 1  === arguments.length );
                            assert( 40 === a0 );
                        }, err );
                }
            ,   "$then test same as above $.$then( thow err).$then(, err)"   : ()=>
                {
                        return $.$then( ()=>1 ) // same as native Promise test above
                        .$then( a0 =>
                            {   assert( 1 === a0 );
                                throw 10;
                            }, err )
                        .$then( err, function( a0, a1 )// could not check arguments within fat arrow function
                            {   assert( 2  === arguments.length );
                                assert( 10 === a0 );
                                assert( 1  === a1 );
                                return 20;
                            })
                        .$then( function( a0, a1, a2 )
                            {   assert( 3  === arguments.length );
                                assert( 20 === a0 );
                                assert( 10 === a1 );
                                assert( 1  === a2 );
                                throw 30;
                            }, err )
                        .$then( err, function( a0, a1, a2, a3 )
                            {   return new Promise( function( resolve ){ resolve(40) } );
                            }, err )
                        .$then( function( a0, a1, a2, a3, a4 )
                            {   assert( 5  === arguments.length );
                                assert( 40 === a0 );
                                assert( 30 === a1 );
                                assert( 20 === a2 );
                                assert( 10 === a3 );
                                assert( 1  === a4 );
                            }, err );
                }
            }

        ,   "$then chaining":
            {   "$.$then().$then(promise).$then(promise)"   : function()
                {   return $.$then( function(  )
                        {   assert( arguments.length === 0 );
                            return 10;
                        }, err )
                        .$then( function( a0 )
                        {   assert( arguments.length === 1 );
                            assert( a0 === 10 );
                            return new Promise( function( resolve, reject ){   resolve(20); });
                        }, err )
                        .$then( function( a0, a1 )
                        {   assert( arguments.length === 2 );
                            assert( a0 === 20 );
                            assert( a1 === 10 );
                            return new Promise( function( resolve, reject ){   resolve(30); });
                        }, err )
                        .$then( function( a0, a1, a2 )
                        {   assert( arguments.length === 3 );
                            assert( 30 === a0 );
                            assert( 20 === a1 );
                            assert( 10 === a2 );
                        }, err );
                }
            ,   "$xml.then(1,=>x).then(2, =>2).then(this,3)"   : function()
                {   let $lst = $.Xml(xmlUrl )
                    ,   i = 0;
                    return $lst
                        .$then( function( xml )
                        {   assert( "left" === $(xml).find('*[side]').attr('side') );
                            assert( 0 === i++ );
                            return $(xml);
                        }, err )
                        .$then( function( $xml )
                        {   assert( "left" === $xml.find('*[side]').attr('side') );
                            assert( 1 === i++ );
                            return 10;
                        }, err)
                        .$then( function( a0, a1, a2 )
                        {   assert( 10 === a0 );
                            assert( "left" === a1.find('*[side]').attr('side') );
                            assert( "left" === $(a2).find('*[side]').attr('side') );
                            assert( 2 === i++ );
                        }, err );
                }

            }
        }
    ,   "Sleep and parameters in chaining":
        {   "$.sleep(cb)": function()
            {   return $.sleep( function(a)
                        {   assert( arguments.length === 0 );
                            assert( a === undefined );
                        });
            }
        ,   "$.sleep().sleep(cb)": ()=>
            {   return $.sleep()
                    .sleep( function(a)
                        {   assert( arguments.length === 1 );
                            assert( a === 0 );   // previous sleep() without arguments defaults to 0 ms
                        });
            }
        ,  "$.sleep(10).sleep(cb)": ()=>
            {   let t0  = new Date().getTime();
                return $.sleep(10)
                    .sleep( function(a)
                        {   assert( arguments.length === 1 );
                            assert( a === 10 );
                            assert( new Date().getTime() - t0 >=10 );
                        });
            }
        ,  "$.sleep(10).sleep(20,cb)": ()=>
            {   let t0  = new Date().getTime();
                return $.sleep(10)
                    .sleep( 20, function(a)
                        {   assert( arguments.length === 1 );
                            assert( a === 10 );
                            assert( new Date().getTime() - t0 >=10+20 );
                        });
            }
        ,  "$.sleep(10).then(cb).then(cb)": ()=>
            {   let t0  = new Date().getTime();
                let p = $.sleep(10)
                    .then( function(a)
                        {   assert( arguments.length === 1 );
                            assert( a === 10 );
                            assert( new Date().getTime() - t0 >=10 );
                            return 20;  // passed to Promise.then chaining
                        },  err);
                assert( p instanceof Promise );

                return    p.then( function(a)
                        {   assert( arguments.length === 1 );
                            assert( a === 20 );
                            assert( new Date().getTime() - t0 >=10 );
                        },  err);
            }
        ,   "$().sleep().$then(promise)": ()=>
            {   let  q = $('<div></div>')
                    .sleep();
                    
                return  q.$then( function( a0, a1 )
                        {   assert( arguments.length === 2 );
                            assert( a0 === 0 );
                            assert( IsDIV(a1) );
                            return new Promise( function( resolve, reject )
                                {   resolve(10); });
                        }, err )
                    .$then( function( a0, a1, a2, a3 )
                    {   assert( 10 === a0 );
                        assert( arguments.length === 3 );
                        assert( a1 === 0 );
                        assert( IsDIV(a2) );
                    }, err );
            }
        ,   "$().sleep(10).then(promise)": ()=>
            {   return  $()
                    .sleep(10)
                    .$then( function( a0, a1)
                        {   assert( arguments.length === 2 );
                            assert( a0 === 10 );
                            assert( a1 instanceof $ );
                            return new Promise( function( resolve, reject )
                                {   resolve(20); });
                        }, err )
                    .$then( function( a0, a1, a2 )
                        {   assert( 20 === a0 );
                            assert( 10 === a1 );
                            assert( a2 instanceof $ );
                        }, err );
            }
        ,   "$().sleep(10).$then"    : ()=>
            {   let t0  = new Date().getTime();
                return  $()
                        .sleep( 10 )
                        .$then( t =>
                        {   assert( t === 10 );
                            assert( (new Date()).getTime() - t0 >=10 );
                        });
            }
        ,   "$().sleep(100, cb).$then"    : ()=>
            {
                let t0  = new Date().getTime();
                let c;
                return  $() .sleep( 10, ()=>
                        {   c = 11;
                            return 20;
                        })
                        .$then( function( t )
                        {   assert( c === 11 );
                            assert( t === 20 );
                            assert( (new Date()).getTime() - t0 >=10 );
                        });
            }
        ,   "$().sleep(20, cb).$then(30).sleep(40,cb(a0,a1,a2)"    : ()=>
            {
                let c, t0  = new Date().getTime();
                return  $()
                        .sleep( 20, function()
                        {   c = 11;
                            assert( (new Date()).getTime() - t0 >= 20 );                            
                            return 20;
                        })
                        .$then( function( a0 )
                        {   assert( c === 11 );
                            assert( a0 === 20 );
                            assert( (new Date()).getTime() - t0 >= 20 );
                            c=22;
                            return 30;
                        },  err )
                        .sleep( 40, function(a0,a1)
                        {   assert( c === 22 );
                            assert( a0 === 30 );
                            assert( a1 === 20 );
                            let dt = new Date().getTime()-t0;
                            assert( dt >=60 );
                        });
            }
        ,   "$(div).sleep().$then(promise).$then(a,b,c)" : function()
            {   let q = $( '<div></div>' )
                .sleep();

                return  q.$then( function( a0, a1 )
                {   assert( arguments.length === 2 );
                    assert( a0 === 0 );
                    assert( IsDIV( a1 ) );
                    return new Promise( function( resolve, reject ){ resolve( 10 ); } );
                }, err )
                    .$then( function( a0, a1, a2 )
                    {   assert( 10 === a0 );
                        assert( arguments.length === 3 );
                        assert( a1 === 0 );
                        assert( IsDIV( a2 ) );
                    }, err );
            }
//         ,  "$.when( $().sleep(10), $().sleep(20) ).then": function()
//             {   let d = this.async(timeout)
//                 ,   i = 0
//                 ,   p0= $().sleep(10, function()
//                                 {   assert( 0 === i );
//                                     i= 10;
//                                 }).promise()
//                 ,   p1=$().sleep(20, function()
//                                 {   assert( 10 === i );
//                                     i= 20;
//                                 }).promise();
//                 let w = $.when( p0, p1 ); // jQuery does not work w/ native Promise
//                 w
//                 .then( function()
//                     {   assert( 20 === i ); })
//                 .then( PASS(d), ERR(d) );
//             }

        }
    ,   "query-load-then-attr"   : function()
        {   let   i    = 0;
           return $("<div></div>")
               .addClass('loading')
               .attr("disabled","disabled")
               .xml(xmlUrl)
               .$then( function( xml )
               {   assert( $(this).hasClass("loading") );
                   assert( "left" === $(xml).find('*[side]').attr('side') );
                   assert( 0 === i++ );
                   return 10;
               }, err )
               .removeClass("loading")
               .$then( function( $1, thenRet, xml )
               {   assert( 1 === i++ );
                   assert( IsDIV($1) );
                   assert( !$1.hasClass("loading") );
                   assert( 10 === thenRet );
                   assert( "left" === $(xml).find('*[side]').attr('side') );
                   return 20;
               }, err )
               .attr("disabled")
               .$then( function( a0,a1, $1,  thenRet, $xml )
               {   assert( "$then" in this );
                   assert( IsDIV($1) );
                   assert( 2 === i++ );
                   assert( "disabled" === a0 );
                   assert( 20 === a1 );
               }, err );
        }


    ,   "Destroy":
        {   /*  $f.prototype.destroy()
                    releases resources in the promises chain behind and upfront of current one.

                1.  unlock/release/remove own resources. No async functionality shall be kept in queue.
                2.  invoke children[].destroy()
                3.  reject own promise with InterruptedException
                4.  detach from parent
                5.  invoke parent.destroy()

            */
            //"$().sleep(10).$then().$then( ,interruptedException ).destroy()": function()
            //{   let d = this.async(timeout)
            //    ,   i = 0;
            //    $().sleep( 10, ERR(d) )   // callback never called, handler removed
            //    .$then(ERR(d), function(interruptedException)
            //    {   assert( 0 === i );
            //        assert( interruptedException instanceof $f.InterruptedException );
            //        i = 10;
            //    })
            //    .$then( ERR(d), function( interruptedException )
            //    {   assert( 10 === i );
            //        assert( interruptedException instanceof $f.InterruptedException );
            //        i = 20;
            //    })
            //    .$then(  ERR(d), PASS(d) )
            //    .destroy();
            //
            //    assert( 0 === i );
            //}
        //,   "$().sleep(10).then( 'destroy' ).then( ,interruptedException )": function()
        //    {   let d = this.async(timeout)
        //        ,   t = new Date().getTime();
        //        $().sleep(10, ERR(d))   // callback never called, handler removed
        //        .then( 'destroy' )
        //        .then( ERR(d), function( interruptedException )
        //        {   assert( interruptedException instanceof $.InterruptedException );
        //            assert( (new Date()).getTime() - t >10 );
        //        }).then(  ERR(d), PASS(d) );
        //    }
            // todo all cases where Promise is created: sleep, then, loadXml...
        }
    });

    function IsTransformedEl($el)
    {
        if( "side" != $el.find("*[title]").attr("title")  ||  "left" != $el.find("*[title]").attr("value")  )
            return false;
        return true;
    }
    function IsDIV(a){ return a.length && a[0].tagName === 'DIV' }
    function NOP(){}
    function RETHROW(ex){throw ex;}
    function err() { assert(0) }

});