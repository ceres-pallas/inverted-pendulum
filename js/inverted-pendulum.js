(function($){
    var defaultState = {
	position : 0,
	angle: 0,
	velocity: 0,
	angularVelocity: 0
    };

    var InvertedPendulum = $.InvertedPendulum = function(state){
	this._currentState = state || defaultState;
    };

    InvertedPendulum.prototype.currentState = function(){
	return this._currentState;
    }
    InvertedPendulum.prototype.tick = function(){
	// do nothing for now
    }
})(window || module.exports);
