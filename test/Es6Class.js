/**
 * ES6 class
 */
define( function()
{
    // extend
    // constructor, static classMethod, const members
    // getter
    // generator method
    // ... in parameters & array
    // fat arrow
    // for..of
    class Es6Class
    {
        constructor( v )
            {
                this._val = v;

            }
        get val(){return "a " + this._val; }
        set val(v){return this._val = v; }
    }
    return Es6Class;
});