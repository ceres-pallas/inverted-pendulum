(function($) {
    var SimpleAgent = $.SimpleAgent = function(problem, solver) {	
	this.problem = problem;
	this.solver = solver;
	this.ticked = 0;
	this.history = [];
    }
    
    SimpleAgent.prototype.getPossibleActions = function() {
	return this.problem.getPossibleActions();
    }

    SimpleAgent.prototype.chooseAction = function() {
	return this.solver.evaluate(this.getPossibleActions());
    }

    SimpleAgent.prototype.getTicked = function() {
	return this.ticked;
    }

    SimpleAgent.prototype.performAction = function(action) {
	this.history.push({state: this.problem.currentState(), action: action});

	this.problem.tick(action);
	this.ticked++;
    }

    SimpleAgent.prototype.reevaluateActions = function(reward, costPerTransition) {
	var count = 0;

	while(this.history.length > 0) {
	    var state = this.history.pop().state
	    this.solver.correct(state, reward || count++); 
	    if(reward)
		reward-=costPerTransition;
	}
    }

})(window || module.exports)
