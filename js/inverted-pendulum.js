(function($){
    var InvertedPendulum = $.InvertedPendulum = function(){};

    InvertedPendulum.prototype.currentState = function(){
	return {
	    position : 0,
	    angle: 0,
	    velocity: 0,
	    angularVelocity: 0
	}
    }
})(window || module.exports);
