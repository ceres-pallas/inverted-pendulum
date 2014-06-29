(function(World, View, Controller){
    var world = new World({ g: 1/160, M: 1/4, l: 1 });

    var problem = world.createInvertedPendulum({ angle: Math.PI/50 });

    new View(document.getElementById('playground'), problem);

    var controller = new Controller();

    var body = document.getElementsByTagName('body')[0]
    body.addEventListener('keydown', function(e){
        switch(e.keyCode) {
        case 37:
            controller.left();
            break;
        case 39:
            controller.right();
            break;
        default:
            break; /* do nothing */
        }
    }, true);

    function run(){
        problem.tick(controller.action());
        requestAnimationFrame(run);
    };
    run();
})(World, InvertedPendulumView, Controller);
