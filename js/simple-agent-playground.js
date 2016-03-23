(function(World, View, FunctionApproximator, SimpleAgent){
    var world = new World({ g: 1/160, M: 1/4 });

    var initialState = { angle: Math.PI/50, ended: false };
    var problem = world.createInvertedPendulum(initialState);

    new View(document.getElementById('playground'), problem);

    var functionApproximator = new FunctionApproximator(
	      function(){return Math.random();},
	      0.001,
	      0.01,
	      function(elements) { return elements[Math.floor((Math.random() * elements.length))]; },
	      function(weights) {
	          return 1/weights.reduce(function (prev, current) { return Math.max(prev, current);}, -Infinity);
	      }
    );

    functionApproximator.addValueFunction(
	      functionApproximator.createValueFunction(function(s) {
	          return 1;
	      })
    );

    var agent = new SimpleAgent(problem, functionApproximator);
    var count = 0;
    function run(){
	      if(!problem.currentState().ended) {
	          if(count%5 == 0) {
		            var option = agent.chooseAction();
		            agent.performAction(option.action);
	          }
		        problem.tick();
	          count++;
	      } else {
	          agent.reevaluateActions();
	          var log = "";
	          agent.solver.getValueFunctions().forEach(function(el) { log += " " +  el.getWeight(); } );
	          //log weights
	          //console.log(log);
	          problem.currentState(initialState);
	      }
	      requestAnimationFrame(run);
    };
    run();
})(World, InvertedPendulumView, FunctionApproximator, SimpleAgent);
