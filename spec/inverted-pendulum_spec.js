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
	});

	it('should be possible to override default state', function(){
	    var start = {
		position : 10,
		angle: 5,
		velocity: -3,
		angularVelocity: 1
	    };
	    var problem = new InvertedPendulum(start);
	    var s = problem.currentState();

	    expect(s.position).toBe(start.position);
	    expect(s.angle).toBe(start.angle);
	    expect(s.velocity).toBe(start.velocity);
	    expect(s.angularVelocity).toBe(start.angularVelocity);
	});
    });

    describe('tick', function(){
	var problem;

	beforeEach(function(){
	    problem = new InvertedPendulum();
	});

	it('should calculate the next state', function(){
	    problem.tick();

	    var s = problem.currentState();
	    expect(s.position).toBe(0);
	    expect(s.angle).toBe(0);
	    expect(s.velocity).toBe(0);
	    expect(s.angularVelocity).toBe(0);
	});
    });


});
