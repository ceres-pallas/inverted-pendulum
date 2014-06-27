
describe('Function Approximator', function() {
    it('should exist', function() {
	expect(FunctionApproximator).toBeDefined();
    });
    it('should be instantiated', function() {
	expect(new FunctionApproximator()).toBeDefined();
    });

    describe('characteristics of a function approximator', function() {
	it('should have an empty list of ActionValueFunctionPairs', function() {
	    var fa = new FunctionApproximator();

	    var valueFunctions = fa.getValueFunctions();

	    expect(valueFunctions).toEqual([]);
	});

	describe('valueFunction / utilityFunction', function() {
	    it('should be defined', function() {
		expect(ValueFunction).toBeDefined();
	    });
	    it('should be instantiated', function() {
		expect(new ValueFunction()).toBeDefined();
	    });

	    it('should give a value of 0 if not initiated with a function', function() {
		var vf = new ValueFunction();
		expect(vf.getValue()).toBe(0);
	    });
	    
	    it('should give a different values for different states', function() {
		var vf = new ValueFunction(function(s) {
		    return s.x;
		});
		expect(vf.getValue({x: 1})).toBe(1);
		expect(vf.getValue({x: 2})).toBe(2);	       
	    });
	    
	    it('should be initialized with a weight with the given weighting intitialisation function', function() {
		var vf = new ValueFunction(null, function(){ return 1; });
		expect(vf.getWeight()).toBe(1);

		vf = new ValueFunction();
		expect(vf.getWeight()).toBe(1);

		vf = new ValueFunction(null, function(){ return 1*3; });
		expect(vf.getWeight()).toBe(3);
	    });

	    it('should weigh its value', function() {		
		var vf = new ValueFunction(function(s) { return s.x; }, function(){ return 0.5; });
		expect(vf.getValue({x: 8})).toBe(4);
	    });

	    it('should lower its weight with a given learningRate', function() {
		var vf = new ValueFunction(function(s) { return s.x; }, function(){ return 0.5; });
		var state = {x: 8};
		var value = vf.getValue(state);
		expect(value).toBe(4);
		vf.correct(value, 2, 0.1, state);
		// diff of 2 * x * learningRate == -1.6
		expect(vf.getWeight()).toBe(-1.1)
	    });

	    it('should heighten its weight with a given learningRate', function() {
		var vf = new ValueFunction(function(s) { return s.x; }, function(){ return 0.5; });
		var state = {x: 8};
		var value = vf.getValue(state);
		expect(value).toBe(4);
		vf.correct(value, 6, 0.1, state);
		// diff of 2 * x * learningRate == 1.6
		expect(vf.getWeight()).toBe(2.1)
	    });
	    
	});

	it('should add valuefunctions', function() {
	    var fa = new FunctionApproximator();
	    fa.addValueFunction(new ValueFunction());
	    expect(fa.getValueFunctions().length).toBe(1);
	    fa.addValueFunction(new ValueFunction());
	    expect(fa.getValueFunctions().length).toBe(2);
	});

	it('should calculate the value of a state as a average of all its valuefunctions', function() {
	    var fa = new FunctionApproximator();
	    fa.addValueFunction(new ValueFunction(function(s) {
		return 1;
	    }));

	    fa.addValueFunction(new ValueFunction(function(s) {
		return 2;
	    }));

	    expect(fa.getValue()).toBe(3);
	});

	it('should initialise the weights of its valuefunctions with a strategy', function() {
	    var fa = new FunctionApproximator(function() { return 0.5; });
	    var vf = fa.createValueFunction(function(s) { return s.x; });
	    expect(vf.getWeight()).toBe(0.5);

	});

	it('should calculate the value of a state as the sum of the value of all its weighted valuefunctions', function() {
	    var fa = new FunctionApproximator(function() { return 0.5; });
	    fa.addValueFunction(
		fa.createValueFunction(function(s) {
		return 1;
	    }));

	    fa.addValueFunction(fa.createValueFunction(function(s) {
		return 2;
	    }));

	    expect(fa.getValue()).toBe(1.5);
	});
	
	it('should be initialized with a learning rate', function() {
	    var fa = new FunctionApproximator();
	    expect(fa.getLearningRate()).toBe(0.1);
	    fa = new FunctionApproximator(null, 0.2);
	    expect(fa.getLearningRate()).toBe(0.2);
	});
	
	it('should heighten the weights of all value functions', function() {
	    var fa = new FunctionApproximator(function() { return 1;}, 0.1);
	    fa.addValueFunction(
		fa.createValueFunction(function(s) { return s.x; }, function() { return 0.5; } )
	    );
	    fa.addValueFunction(
		fa.createValueFunction(function(s) { return s.y; }, function() { return 0.2; }  )
	    );
	    fa.addValueFunction(
		fa.createValueFunction(function(s) { return 1; }, function() { return 0.1; }  )
	    );


	    var state = { x: 1, y: 1 };
	    expect(fa.getValue({x:1,y:1})).toBeCloseTo(0.8);
	    fa.correct(state, 0.4);
	    
	    expect(fa.getValueFunctions()[0].getWeight()).toBeCloseTo(0.46);
	    expect(fa.getValueFunctions()[1].getWeight()).toBeCloseTo(0.16);
	    expect(fa.getValueFunctions()[2].getWeight()).toBeCloseTo(0.06);

	});

	it('should be able to choose between states on the basis of their utility', function() {
	    var fa = new FunctionApproximator();
	    fa.addValueFunction(
		fa.createValueFunction(function(s) { return s.x; } )
	    );
	    fa.addValueFunction(
		fa.createValueFunction(function(s) { return s.y; } )
	    );

	    var states = [];
	    states.push({state: {x: 0, y: 0}, action: "stay"});
	    states.push({state: {x: 1, y: 1}, action: "diagonal"});
	    states.push({state: {x: 0, y: 1}, action: "up"});
	    
	    var chosen = fa.evaluate(states);
	    expect(fa.evaluate(states).action).toBe("diagonal");
	    states.push({state: {x: 0, y: 8}, action: "FTW"});
	    
	    expect(fa.evaluate(states).action).toBe("FTW"); 
	});

	it('should explore if the explorationrate is 100% and not explore if it is 0%', function() {
	    var states = [];
	    states.push({state: {x: 0}, action: "explored"});
	    states.push({state: {x: 1}, action: "highest"});
	 
	    var explorerfa = new FunctionApproximator(null,null,1,null);
	    explorerfa.addValueFunction(
		explorerfa.createValueFunction(function(s) { return s.x; } )
	    );	    
	    expect(explorerfa.evaluate(states).action).toBe("explored");
	    
	    var nonexplorerfa = new FunctionApproximator(null,null,0,null);
	    nonexplorerfa.addValueFunction(
		nonexplorerfa.createValueFunction(function(s) { return s.x; } )
	    );	    
	    expect(nonexplorerfa.evaluate(states).action).toBe("highest");
	});
	
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
