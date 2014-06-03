describe('Simple Agent', function() {
    it('should exist', function() {
	expect(SimpleAgent).toBeDefined();
    });
    it('should be instantiated', function() {
	expect(new SimpleAgent()).toBeDefined();
    });

    it('should be able to ask a problemSystem for possibilities in that systems world', function() {
	var problemMock = {};
	    problemMock.getPossibleActions = function() {
		return [{state: {x: 0}, action: "left"},
			{state: {x: 2}, action: "right"}
		       ];
	    }

	var a = new SimpleAgent(problemMock);
	expect(a.getPossibleActions()).toEqual(problemMock.getPossibleActions());
    });

     it('should choose an action from possible states using some solver', function() {
	 var problemMock = {};
	 problemMock.getPossibleActions = function() {
	     return [{state: {x: 0}, action: "left"},
		     {state: {x: 2}, action: "right"}
		     
		    ];
	 }

	 var solverMock = {};
	 solverMock.evaluate = function(states) {
	     return states[0];
	 }
	 var a = new SimpleAgent(problemMock);
	 expect(a.chooseAction()).toEqual({state: {x: 0}, action: "left"});
     });

});
