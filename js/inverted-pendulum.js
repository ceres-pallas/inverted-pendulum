(function($, Helper, Observable){
    var copy = Helper.copy;

    var defaultWorldParameters = {
        delta: 1,
        M : 1,
        m : 1,
        g : 1,
        l : 1,
        L : 1/8,
        extend: 640
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
        this._currentState = this._originalState = Helper.extend(state || {}).by(defaultState);
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

        state = this.normalizeState(state);

        this._currentState = state;
        this.notify(this.currentState());
    }
    InvertedPendulum.prototype.normalizeState = function(state) {
        var seam = this.world.extend/2;
        while (state.position < -seam) {
            state.position += 2 * seam;
        }
        while (state.position > seam) {
            state.position -= 2 * seam;
        }
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
        return state;
    }
    InvertedPendulum.prototype.getPossibleActions = function() {
        var current = this.currentState();
	var leftForce = -0.1;
	var rightForce = 0.1;

        this.tick(leftForce);
        var leftState = this.currentState();
        this.currentState(current);

        this.tick(0);
        var neutralState = this.currentState();
        this.currentState(current);

        this.tick(rightForce);
        var rightState = this.currentState();

        this.currentState(current);

        return [
                {state: neutralState, action:  0},
		{state: leftState, action: leftForce},
                {state: rightState, action:  rightForce}
	];

}
	InvertedPendulum.prototype.reset = function(){
		this._currentState = this._originalState;
	}

})(window || module.exports, Helper, Observable);
