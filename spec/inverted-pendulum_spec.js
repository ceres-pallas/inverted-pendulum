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
	it('should calculate stationary state correctly', function(){
	    var problem = new InvertedPendulum();

	    problem.tick();

	    var s = problem.currentState();
	    expect(s.position).toBe(0);
	    expect(s.angle).toBe(0);
	    expect(s.velocity).toBe(0);
	    expect(s.angularVelocity).toBe(0);
	});

	describe('with pendulum at PI/2', function(){
	    var startAngle = Math.PI/2;

	    it('should calculate stationary state', function(){
		var problem = new InvertedPendulum({
		    position: 0, velocity: 0, angle: startAngle, angularVelocity: 0
		});

		problem.tick();

		var s = problem.currentState();
		expect(s.position).toBe(0);
		expect(s.angle).toBe(startAngle);
		expect(s.velocity).toBe(0);
		expect(s.angularVelocity).toBe(0);
	    });

	    it('should calculate linear displacement', function(){
		var problem = new InvertedPendulum({
		    position: 0, velocity: 1, angle: startAngle, angularVelocity: 0
		});

		problem.tick();

		var s = problem.currentState();
		expect(s.position).toBe(1);
		expect(s.angle).toBe(startAngle);
		expect(s.velocity).toBe(1);
		expect(s.angularVelocity).toBe(0);
	    });
	});
    });


});
