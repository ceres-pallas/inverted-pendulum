describe('Function Approximator', function() {
    describe('characteristics of a function approximator', function() {
	it('should handle some scenarios in a particular way', function() {
	    var mazeProblem = function() {
		this.x = 0;
		this.y = 0;

		this.currentState = function() {
		    var ended = false, reward = 0;
		    if(this.x==3 && this.y==2) {
			ended = true;
			reward = 1;
		    }
		    if(this.x==3 && this.y==1) {
			ended = true;
			reward = -1;
		    }


		    return {
			x: this.x,
			y: this.y,
			ended: ended,
			reward: reward
		    }
		}

		this.getPossibleActions = function() {
		    if(this.x==0 && this.y==0) {
			return [
			    { state: { x: 0, y: 1 }, action: "up"},
			    { state: { x: 1, y: 0 }, action: "right" },
			];
		    }
		    if(this.x==1 && this.y==0) {
			return [
			    { state: { x: 0, y: 0 }, action: "left"},
			    { state: { x: 2, y: 0 }, action: "right" },
			];
		    }
		    if(this.x==0 && this.y==1) {
			return [
			    { state: { x: 0, y: 2 }, action: "up"},
			    { state: { x: 0, y: 0 }, action: "down" },
			];
		    }
		    if(this.x==0 && this.y==2) {
			return [
			    { state: { x: 1, y: 2 }, action: "right"},
			    { state: { x: 0, y: 1 }, action: "down" },
			];
		    }
		    if(this.x==1 && this.y==2) {
			return [
			    { state: { x: 0, y: 2 }, action: "left"},
			    { state: { x: 2, y: 2 }, action: "right" },
			];
		    }
		    if(this.x==2 && this.y==2) {
			return [
			    { state: { x: 1, y: 2 }, action: "left"},
			    { state: { x: 3, y: 2 }, action: "right" },
			    { state: { x: 2, y: 1 }, action: "down" },
			];
		    }
		    if(this.x==2 && this.y==1) {
			return [
			    { state: { x: 2, y: 2 }, action: "up"},
			    { state: { x: 2, y: 0 }, action: "down" },
			    { state: { x: 3, y: 1 }, action: "right" },
			];
		    }
		    if(this.x==2 && this.y==0) {
			return [
			    { state: { x: 2, y: 1 }, action: "up"},
			    { state: { x: 1, y: 0 }, action: "left" },
			    { state: { x: 3, y: 0 }, action: "right" },
			];
		    }
		    if(this.x==3 && this.y==0) {
			return [
			    { state: { x: 3, y: 1 }, action: "up"},
			    { state: { x: 2, y: 0 }, action: "left" },
			];
		    }
		    if(this.x==3 && this.y==2) {
			return [
			    { state: { x: 3, y: 1 }, action: "end"}
			];
		    }
		    if(this.x==3 && this.y==2) {
			return [
			    { state: { x: 3, y: 2 }, action: "end"}
			];
		    }
		}

		this.tick = function(action) {
		    if(action == "up") {
			this.y++;
		    }

		    if(action == "right") {
			this.x++;
		    }

		    if(action == "down") {
			this.y--;
		    }

		    if(action == "left") {
			this.x--;
		    }
		}
	    };


	    var m = new mazeProblem();

	    var fa = new FunctionApproximator();
	    fa.addValueFunction(
		fa.createValueFunction(function(s) { return s.x; }, function(){ return 0.5;} )
	    );
	    fa.addValueFunction(
		fa.createValueFunction(function(s) { return s.y; }, function(){return 0.2;} )
	    );
	    fa.addValueFunction(
		fa.createValueFunction(function(s) { return 1; }, function(){return 0.1;} )
	    );
	    var agent = new SimpleAgent(m, fa);
/*
	    for(var i=0; i<10; i++) {
		agent.performAction(agent.chooseAction().action);
		agent.performAction(agent.chooseAction().action);
		agent.performAction(agent.chooseAction().action);
		agent.performAction(agent.chooseAction().action);

		console.log(m.currentState());

		agent.reevaluateActions(1, 0.04);
		m.x = 0;
		m.y = 0;
		m.ended = false;
		m.reward = 0;
	    } */

	    fa.getValueFunctions().forEach(function(vf) {
		console.log(vf.getWeight());
	    });
	    console.log(fa.getValue({x:1,y:1}));
	    fa.correct({x: 1, y: 1}, 0.4);

	    fa.getValueFunctions().forEach(function(vf) {
		console.log(vf.getWeight());
	    });
	    console.log(fa.getValue({x:1,y:1}));
	});

    });
});
