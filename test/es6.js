/**
 * Author: Sasha Firsov <suns@simulationworks.com>
 * Version: 0.4.0
 * License: MIT
 */

define(['test/babel', "intern/dojo/request" ], function( babel, request )
{   'use strict';

    return  {   version: '0.1.0'
            ,   load: function( name, req, load )
                {
                    var fileExtension = '.js'
                    ,   sourceFileName = name + fileExtension
                    ,   url = req.toUrl(sourceFileName);

                    var opt = { blacklist: [], nonStandard: true, modules: 'ignore', sourceMaps: 'inline', sourceFileName: sourceFileName };

                    request( url, { handleAs:'text', method:"GET" }).then( function( res )
                    {   try
                        {   var code = babel.transform( res.data, opt ).code;
                            load.fromText( code );
                        }catch( err )
                        {   debugger;
                            load.error(err);
                        }
                    }, function( err )
                    {   err;
                        debugger;
                    });
                }
            };
});
