(function($) {
    var ValueFunction = $.ValueFunction = function(valueFunction, weightInitialisationFunction) {
	this.valueFunction = valueFunction || (function(s) { return 0; });
	this.weight = weightInitialisationFunction?weightInitialisationFunction():1;
    }

    ValueFunction.prototype.getValue = function(state) {
	return this.getWeight() * this.valueFunction(state);
    }

    ValueFunction.prototype.getWeight = function() {
	return this.weight;
    }

    ValueFunction.prototype.setWeight = function(weight) {
	this.weight = weight;
    }

    ValueFunction.prototype.correct = function(state, actual, learningRate) {
	var utility = this.getValue(state);
	var correction = (actual-utility)*learningRate;

	this.setWeight(this.getWeight() + correction);
    }

    var FunctionApproximator = $.FunctionApproximator = function(weightInitialisationStrategyFunction, learningRate) {
	this.valueFunctions = new Array();

	this.weightInitialisationStrategyFunction = weightInitialisationStrategyFunction || function() {
	    return 1;
	}

	this.learningRate = learningRate || 0.1;

	this.states = [];
    }
    
    FunctionApproximator.prototype.getValueFunctions = function(){
	return this.valueFunctions;
    }

    FunctionApproximator.prototype.addValueFunction = function(vf) {
	this.valueFunctions.push(vf);
    }

    FunctionApproximator.prototype.createValueFunction = function(func) {
	return new ValueFunction(func, this.weightInitialisationStrategyFunction);
    }

    FunctionApproximator.prototype.getValue = function(state) {
	var utility = 0;

	this.getValueFunctions().forEach(function(vf) {
	    utility += vf.getValue(state);
	});

	return utility / this.getValueFunctions().length;
    }
    
    FunctionApproximator.prototype.getLearningRate = function() {
	return this.learningRate;
    }
    
    FunctionApproximator.prototype.getStates = function() {
	return this.states;
    }

    FunctionApproximator.prototype.correct = function(state, actual) {
	var _context = this;

	_context.getValueFunctions().forEach(function(vf) {
	   vf.correct(state, actual, _context.getLearningRate());
	});
    }

})(window || module.exports)
