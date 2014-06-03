(function($){
    var Helper = $.Helper = {};

    var copy = Helper.copy = function(object) {
        var c = {};
        for (var key in object) {
            c[key] = object[key];
        }
        return c;
    };

    Helper.extend = function(object) {
	return {
	    'by': function(options){
		var c = copy(object);
		for (var key in options) {
		    if (!c[key]) {
			c[key] = options[key];
		    }
		}
		return c;
	    }
	}
    };
})(window || module.exports);
