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
	M : 1
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
	var acceleration = force / state.M;
        state.velocity += acceleration * state.delta;
        state.position += state.velocity * state.delta;
        this._currentState = state;
    }
})(window || module.exports);
