(function(World, View){
    var world = new World();

    var problem = world.createInvertedPendulum();

    new View(document.getElementById('playground'), problem);
})(World, InvertedPendulumView);
