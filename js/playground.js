(function(World, View, Controller){
    var world = new World({ g: 1/16, M: 1/4 });

    var problem = world.createInvertedPendulum({ angle: Math.PI/50 });

    new View(document.getElementById('playground'), problem);

    var controller = new Controller();

    function run(){
	problem.tick(controller.action());
	requestAnimationFrame(run);
    };
    run();
})(World, InvertedPendulumView, Controller);
