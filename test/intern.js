// Learn more about configuring this file at <https://theintern.github.io/intern/#configuration>.
// These default settings work OK for most people. The options that *must* be changed below are the
// packages, suites, excludeInstrumentation, and (if you want functional tests) functionalSuites
var xml4jQuery_deps = ["../node_modules/jquery/dist/jquery.js"]
,   xml4jQuery_IE = !window.Promise;
if( xml4jQuery_IE )
	xml4jQuery_deps.push("../node_modules/babel-polyfill/dist/polyfill.min.js");
define(xml4jQuery_deps,function()
{
	var conf =
	{
        // Default desired capabilities for all environments. Individual capabilities can be overridden by any of the
        // specified browser environments in the `environments` array below as well. See
        // <https://theintern.github.io/intern/#option-capabilities> for links to the different capabilities options for
        // different services.
        //
        // Note that the `build` capability will be filled in with the current commit ID or build tag from the CI
        // environment automatically
        capabilities: {
            'browserstack.selenium_version': '2.45.0'
        },

        // Browsers to run integration testing against. Note that version numbers must be strings if used with Sauce
        // OnDemand. Options that will be permutated are browserName, version, platform, and platformVersion; any other
        // capabilities options specified for an environment will be copied as-is
        environments: [
            { browserName: 'internet explorer', version: '11', platform: 'WIN8' },
            { browserName: 'internet explorer', version: '10', platform: 'WIN8' },
            { browserName: 'internet explorer', version: '9', platform: 'WINDOWS' },
            { browserName: 'firefox', version: '37', platform: [ 'WINDOWS', 'MAC' ] },
            { browserName: 'chrome', version: '39', platform: [ 'WINDOWS', 'MAC' ] },
            { browserName: 'safari', version: '8', platform: 'MAC' }
        ],

            defaultTimeout: 1*( getUrlParameter('timeout') || '30000'),
        // Maximum number of simultaneous integration tests that should be executed on the remote WebDriver service
        maxConcurrency: 2,

        // Name of the tunnel class to use for WebDriver tests.
        // See <https://theintern.github.io/intern/#option-tunnel> for built-in options
        tunnel: 'BrowserStackTunnel',

        // Configuration options for the module loader; any AMD configuration options supported by the AMD loader in use
        // can be used here.
        // If you want to use a different loader than the default loader, see
        // <https://theintern.github.io/intern/#option-useLoader> for instruction

        loader:
        {
        // Packages that should be registered with the loader in each testing environment
		//		packages: [ //{ name: 'myPackage', location: '.' }
		//				{ name: 'xml', location: "lib/AMD/xml/xml"}
		//			]
		//	,
                  map:  {'*':{ 	xml: "lib/AMD/xml/xml_ie"
                            , 	xml4jquery:"xml4jquery"
                            ,	assert:"test/assert"
                        }}
            ,   paths:  {   es6     : 'test/es6'
                        ,   babel   : 'test/babel-5.8.34.min.js'
                        }
            ,     es6:  {   fileExtension: '.js' // put in .jsx for JSX transformation
                        }
            ,   babel:  {   blacklist: [],
                            nonStandard: true,
                            modules: 'ignore'
                        }
        },

        // Non-functional test suite(s) to run in each browser
        suites: depList( getUrlParameter('suite') || "test/test" ),

        // Functional test suite(s) to execute against each browser once non-functional tests are completed
        functionalSuites: [  ],

        // A regular expression matching URLs to files that should not be included in code coverage analysis
        excludeInstrumentation: /^(?:tests|node_modules)\//
    };
	if( getUrlParameter('transpiler') )
    {   conf.loaders = { 'host-node': 'requirejs', 'host-browser': 'node_modules/requirejs/require.js' };
        conf.suites = conf.suites.map( function( el ){ return 'es6!'+el} );
    }
    return conf;

        function
    depList()
    {
        var ret = [];
        for( var i=0; i< arguments.length; i++ )
        {   var el = arguments[i];
            if( 'string' === typeof el )
                ret = ret.concat( el.split(',') );
            else
                ret = ret.concat( el );
        }
        return ret;
    }
});
function getUrlParameter( param )
{   var urlVars = decodeURIComponent(window.location.search.substring(1)).split('&');
    var paramName;
    for(var i = 0; i < urlVars.length; i++)
    {   paramName = urlVars[i].split('=');
        if( paramName[0] === param)
            return paramName[1] === undefined ? true : paramName[1];
    }
}