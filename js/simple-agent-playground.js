(function(World, View, FunctionApproximator, SimpleAgent){
    var world = new World({ g: 1/16, M: 1/4 });

    var initialState = { angle: Math.PI/50 };
    var problem = world.createInvertedPendulum(initialState);

    new View(document.getElementById('playground'), problem);

    var functionApproximator = new FunctionApproximator(
	function(){return Math.random();},
	0.1, 
	0.1, 
	function(elements) { return elements[Math.floor((Math.random() * elements.length))]; }
    );

    functionApproximator.addValueFunction(
	functionApproximator.createValueFunction(function(s) { 
	    return s.angle; })
    );

    functionApproximator.addValueFunction(
	functionApproximator.createValueFunction(function(s) { 
	    return s.angularVelocity; })
    );


    var agent = new SimpleAgent(problem, functionApproximator);
    var count = 0;
    function run(){
	
	if(!problem.currentState().ended) {
	    var option = agent.chooseAction();
	    
	    agent.performAction(option.action);
	} else {

	    agent.reevaluateActions();

	    var log = "";
	    agent.solver.getValueFunctions().forEach(function(el) { log += " " +  el.getWeight(); } );
	    console.log(log);
	    problem.currentState(initialState);

	}
	requestAnimationFrame(run);
    };
    run();
})(World, InvertedPendulumView, FunctionApproximator, SimpleAgent);
