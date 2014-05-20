describe('Inverted Pendulum', function(){
    it('should exist', function(){
	expect(InvertedPendulum).toBeDefined();
    });

    it('should be instantiated', function(){
	expect(new InvertedPendulum()).toBeDefined();
    });

    describe('states', function(){
	it('should have current state', function(){
	    var problem = new InvertedPendulum();
	    var s = problem.currentState();

	    expect(s.position).toBe(0);
	    expect(s.angle).toBe(0);
	    expect(s.velocity).toBe(0);
	    expect(s.angularVelocity).toBe(0);
	})
    });

});
