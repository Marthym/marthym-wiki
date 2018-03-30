<!-- --- title: JS / Utiliser Firebug sans planter IE7&8 -->
Firebug fournit justement un bout de code pour éviter de planter IE :

``` js
if (!window.console || !console.log || !console.debug) {
    var names = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml",
    "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];

    if (!window.console) window.console = {};
    for (var i = 0; i < names.length; ++i) {
    	if (!window.console[names[i]])
    		window.console[names[i]] = function() {};
    }
}
``` 

 * http://code.google.com/p/fbug/source/browse/branches/firebug1.5/lite/firebugx.js
<!-- --- tags: javascript -->