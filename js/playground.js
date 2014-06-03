(function(World, View){
    var world = new World();

    var problem = world.createInvertedPendulum({ angle: Math.PI/50 });

    new View(document.getElementById('playground'), problem);

    function run(){
	problem.tick();
	requestAnimationFrame(run);
    };
    run();
})(World, InvertedPendulumView);
