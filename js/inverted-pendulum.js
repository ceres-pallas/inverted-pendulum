(function($, Helper, Observable){
    var copy = Helper.copy;

    var defaultWorldParameters = {
        delta: 1,
        M : 1,
        m : 1,
        g : 1,
        l : 1,
        L : 1/8
    };
    var World = $.World = function(worldParameters){
        worldParameters = Helper.extend(worldParameters || {}).by(defaultWorldParameters);
        for (var key in worldParameters) {
            this[key] = worldParameters[key];
        }
    };
    World.prototype.createInvertedPendulum = function(state){
        return new InvertedPendulum(this, state);
    }

    var defaultState = {
        position : 0,
        angle: 0,
        velocity: 0,
        angularVelocity: 0,
    };

    var InvertedPendulum = function(world, state){
	Observable.call(this);
        this.world = world;
        this._currentState = Helper.extend(state || {}).by(defaultState);
    };
    InvertedPendulum.prototype = new Observable();
    InvertedPendulum.prototype.currentState = function(state){
	this._currentState = state?Helper.extend(state || {}).by(defaultState):this._currentState;
	
        return copy(this._currentState);
    }
    InvertedPendulum.prototype.tick = function(force){
	force = force || 0;
        var state = this.currentState();
        var acceleration = 0;
        acceleration += - this.world.m * this.world.g * Math.sin(2 * state.angle)/(2 * this.world.M);
        acceleration += force / this.world.M;
        state.velocity += acceleration * this.world.delta;
        state.position += state.velocity * this.world.delta;

        var angularAcceleration = -force * this.world.L;
        angularAcceleration += this.world.m * this.world.g * Math.sin(state.angle)/ this.world.l;
        state.angularVelocity += angularAcceleration * this.world.delta;
        state.angle += state.angularVelocity * this.world.delta;

        if (state.angle >= Math.PI/2) {
            state.angle = Math.PI/2;
            state.angularVelocity = 0;
            state.ended = true;
	}
        if (state.angle <= -Math.PI/2) {
            state.angle = -Math.PI/2;
            state.angularVelocity = 0;
	    state.ended = true;
        }
        this._currentState = state;
	this.notify(this.currentState());
    }

    InvertedPendulum.prototype.getPossibleActions = function() {
	var current = this.currentState();

	this.tick(-1);
	var leftState = this.currentState();
	this.currentState(current);
	
	this.tick(0);
	var neutralState = this.currentState(); 
	this.currentState(current);
	
	this.tick(1);
	var rightState = this.currentState();

	this.currentState(current);

	return [{state: leftState, action: -1},
		{state: neutralState, action:  0},
		{state: rightState, action:  1}];

}
    
})(window || module.exports, Helper, Observable);
