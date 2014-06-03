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
		expect(vf.getValue(state)).toBe(4);
		vf.correct(state, 2, 0.1);
		// diff of 2 * learningRate == -0.2
		expect(vf.getWeight()).toBe(0.3)
	    });

	    it('should heighten its weight with a given learningRate', function() {
		var vf = new ValueFunction(function(s) { return s.x; }, function(){ return 0.5; });
		var state = {x: 8};
		expect(vf.getValue(state)).toBe(4);
		vf.correct(state, 6, 0.1);
		// diff of 2 * learningRate == 0.2
		expect(vf.getWeight()).toBe(0.7)
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

	    expect(fa.getValue()).toBe(1.5);
	});

	it('should initialise the weights of its valuefunctions with a strategy', function() {
	    var fa = new FunctionApproximator(function() { return 0.5; });
	    var vf = fa.createValueFunction(function(s) { return s.x; });
	    expect(vf.getWeight()).toBe(0.5);

	});

	it('should calculate the value of a state as an average of cumulated value of all its weighted valuefunctions', function() {
	    var fa = new FunctionApproximator(function() { return 0.5; });
	    fa.addValueFunction(
		fa.createValueFunction(function(s) {
		return 1;
	    }));

	    fa.addValueFunction(fa.createValueFunction(function(s) {
		return 2;
	    }));

	    expect(fa.getValue()).toBe(0.75);
	});
	
	it('should be initialized with a learning rate', function() {
	    var fa = new FunctionApproximator();
	    expect(fa.getLearningRate()).toBe(0.1);
	    fa = new FunctionApproximator(null, 0.2);
	    expect(fa.getLearningRate()).toBe(0.2);
	});
	
	it('should correct the weights of all value functions', function() {
	    var fa = new FunctionApproximator(function() { return 1;}, 0.1);
	    fa.addValueFunction(
		fa.createValueFunction(function(s) { return s.x; } )
	    );
	    fa.addValueFunction(
		fa.createValueFunction(function(s) { return -s.x; } )
	    );

	    var state = { x: 8 };
	    
	    fa.correct(state, 4);
	    
	    expect(fa.getValueFunctions()[0].getWeight()).toBe(0.6);
	    
	    expect(fa.getValueFunctions()[1].getWeight()).toBe(2.2);

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

    });
});
