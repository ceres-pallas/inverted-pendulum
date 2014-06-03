(function($) {
    var SimpleAgent = $.SimpleAgent = function(problem, solver) {
	this.problem = problem;
	this.solver = solver;
    }
    
    SimpleAgent.prototype.getPossibleActions = function() {
	return this.problem.getPossibleActions();
    }

    SimpleAgent.prototype.chooseAction = function(states) {
	return states[0];
    }

})(window || module.exports)
