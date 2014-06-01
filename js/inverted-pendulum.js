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
        angularVelocity: 0,
        delta : 1,
	M : 1,
	m : 1,
	g : 1,
	l : 1
    };

    var InvertedPendulum = $.InvertedPendulum = function(state){
        this._currentState = copy(state || defaultState);
        for (var key in defaultState) {
            if (!this._currentState[key]) {
                this._currentState[key] = defaultState[key];
            }
        }
    };

    InvertedPendulum.prototype.currentState = function(){
        return copy(this._currentState);
    }
    InvertedPendulum.prototype.tick = function(force){
        force = force || 0;
        var state = this.currentState();
	var acceleration = 0;
	acceleration += - state.m * state.g * Math.sin(2 * state.angle)/(2 * state.M);
	acceleration += force / state.M;
        state.velocity += acceleration * state.delta;
        state.position += state.velocity * state.delta;

	var angularAcceleration = 0;
	angularAcceleration += state.m * state.g * Math.sin(state.angle)/ state.l;
	state.angularVelocity += angularAcceleration * state.delta;
	state.angle += state.angularVelocity * state.delta;

	if (state.angle >= Math.PI/2) {
	    state.angle = Math.PI/2;
	    state.angularVelocity = 0;
	}
	if (state.angle <= -Math.PI/2) {
	    state.angle = Math.PI/2;
	    state.angularVelocity = 0;
	}
        this._currentState = state;
    }
})(window || module.exports);
