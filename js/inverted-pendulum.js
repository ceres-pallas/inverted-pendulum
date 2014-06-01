(function($){
    var copy = function(object) {
	var c = {};
	for (var key in object) {
	    c[key] = object[key];
	}
	return c;
    };

    var defaultState = {
	position : 0,
	angle: 0,
	velocity: 0,
	angularVelocity: 0
    };

    var InvertedPendulum = $.InvertedPendulum = function(state){
	this._currentState = copy(state || defaultState);
    };

    InvertedPendulum.prototype.currentState = function(){
	return copy(this._currentState);
    }
    InvertedPendulum.prototype.tick = function(acceleration){
	acceleration = acceleration || 0;
	var state = this.currentState();
	state.velocity += acceleration;
	state.position += state.velocity;
	this._currentState = state;
    }
})(window || module.exports);
