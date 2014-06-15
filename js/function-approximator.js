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

    var FunctionApproximator = $.FunctionApproximator = function(weightInitialisationStrategyFunction, learningRate, explorationRate, randomPickerFunction) {
	this.valueFunctions = new Array();

	this.weightInitialisationStrategyFunction = weightInitialisationStrategyFunction || function() {
	    return 1;
	}

	this.learningRate = learningRate || 0.1;

	this.states = [];

	this.explorationRate = explorationRate || 0;

	this.randomPickerFunction = randomPickerFunction || function(elements) { return elements[0]; }
    }

    FunctionApproximator.prototype.getExplorationRate = function(){
	return this.explorationRate;
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

    FunctionApproximator.prototype.evaluate = function(states) {
	var _context = this;
	var high;
	var bestState;

	if(Math.random() <= _context.getExplorationRate()) {
	    return _context.randomPickerFunction(states);
	} 
	
	states.forEach(function(state) {
	    var value = _context.getValue(state.state);
	    if(high == undefined || value > high) {
		high = value;
		bestState = state;
	    }
	});
	return bestState;
    }



})(window || module.exports)
