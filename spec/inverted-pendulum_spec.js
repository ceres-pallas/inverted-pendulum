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

            expect(s.position).toBeCloseTo(0, 0.01);
            expect(s.angle).toBeCloseTo(0, 0.01);
            expect(s.velocity).toBeCloseTo(0, 0.01);
            expect(s.angularVelocity).toBeCloseTo(0, 0.01);
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

            expect(s.position).toBeCloseTo(start.position, 0.01);
            expect(s.angle).toBeCloseTo(start.angle, 0.01);
            expect(s.velocity).toBeCloseTo(start.velocity, 0.01);
            expect(s.angularVelocity).toBeCloseTo(start.angularVelocity, 0.01);
        });

        it('should complete state if not every detail is provided', function(){
            var start = { position: 1 };
            var problem = new InvertedPendulum(start);
            var s = problem.currentState();

            expect(s.position).toBeCloseTo(start.position, 0.01);
            expect(s.angle).toBeCloseTo(0, 0.01);
            expect(s.velocity).toBeCloseTo(0, 0.01);
            expect(s.angularVelocity).toBeCloseTo(0, 0.01);
        });
    });

    describe('tick', function(){
        it('should calculate stationary state correctly', function(){
            var problem = new InvertedPendulum();

            problem.tick();

            var s = problem.currentState();
            expect(s.position).toBeCloseTo(0, 0.01);
            expect(s.angle).toBeCloseTo(0, 0.01);
            expect(s.velocity).toBeCloseTo(0, 0.01);
            expect(s.angularVelocity).toBeCloseTo(0, 0.01);
        });

        describe('with pendulum at PI/2', function(){
            var startAngle = Math.PI/2;

            it('should calculate stationary state', function(){
                var problem = new InvertedPendulum({
                    position: 0, velocity: 0, angle: startAngle, angularVelocity: 0
                });

                problem.tick();

                var s = problem.currentState();
                expect(s.position).toBeCloseTo(0, 0.01);
                expect(s.angle).toBeCloseTo(startAngle, 0.01);
                expect(s.velocity).toBeCloseTo(0, 0.01);
                expect(s.angularVelocity).toBeCloseTo(0, 0.01);
            });

            it('should calculate linear displacement', function(){
                var problem = new InvertedPendulum({
                    position: 0, velocity: 1, angle: startAngle, angularVelocity: 0
                });

                problem.tick();

                var s = problem.currentState();
                expect(s.position).toBeCloseTo(1, 0.01);
                expect(s.angle).toBeCloseTo(startAngle, 0.01);
                expect(s.velocity).toBeCloseTo(1, 0.01);
                expect(s.angularVelocity).toBeCloseTo(0, 0.01);
            });

            it('should constant acceleration correctly', function(){
                var problem = new InvertedPendulum({
                    position: 0, velocity: 0, angle: startAngle, angularVelocity: 0
                });

                problem.tick(1);

                var s = problem.currentState();
                expect(s.position).toBeCloseTo(1, 0.01);
                expect(s.angle).toBeCloseTo(startAngle, 0.01);
                expect(s.velocity).toBeCloseTo(1, 0.01);
                expect(s.angularVelocity).toBeCloseTo(0, 0.01);
            });

            describe('with altered delta', function(){
		var delta  = 1/2;

		it('should calculate stationary state', function(){
                    var problem = new InvertedPendulum({
			angle: startAngle, delta: delta
                    });

                    problem.tick();

                    var s = problem.currentState();
                    expect(s.position).toBeCloseTo(0, 0.01);
                    expect(s.angle).toBeCloseTo(startAngle, 0.01);
                    expect(s.velocity).toBeCloseTo(0, 0.01);
                    expect(s.angularVelocity).toBeCloseTo(0, 0.01);
		});

		it('should calculate linear displacement', function(){
                    var problem = new InvertedPendulum({
			velocity: 1, angle: startAngle, delta: delta
                    });

                    problem.tick();

                    var s = problem.currentState();
                    expect(s.position).toBeCloseTo(1/2, 0.01);
                    expect(s.angle).toBeCloseTo(startAngle, 0.01);
                    expect(s.velocity).toBeCloseTo(1, 0.01);
                    expect(s.angularVelocity).toBeCloseTo(0, 0.01);
		});

		it('should constant acceleration correctly', function(){
                    var problem = new InvertedPendulum({
			angle: startAngle, delta: delta
                    });

                    problem.tick(1);

                    var s = problem.currentState();
                    expect(s.position).toBeCloseTo(1/4, 0.01);
                    expect(s.angle).toBeCloseTo(startAngle, 0.01);
                    expect(s.velocity).toBeCloseTo(1/2, 0.01);
                    expect(s.angularVelocity).toBeCloseTo(0, 0.01);
		});
            });

            describe('with altered mass cart', function(){
		var M  = 2;

		it('should calculate stationary state', function(){
                    var problem = new InvertedPendulum({
			angle: startAngle, M: M
                    });

                    problem.tick();

                    var s = problem.currentState();
                    expect(s.position).toBeCloseTo(0, 0.01);
                    expect(s.angle).toBeCloseTo(startAngle, 0.01);
                    expect(s.velocity).toBeCloseTo(0, 0.01);
                    expect(s.angularVelocity).toBeCloseTo(0, 0.01);
		});

		it('should calculate linear displacement', function(){
                    var problem = new InvertedPendulum({
			velocity: 1, angle: startAngle, M: M
                    });

                    problem.tick();

                    var s = problem.currentState();
                    expect(s.position).toBeCloseTo(1, 0.01);
                    expect(s.angle).toBeCloseTo(startAngle, 0.01);
                    expect(s.velocity).toBeCloseTo(1, 0.01);
                    expect(s.angularVelocity).toBeCloseTo(0, 0.01);
		});

		it('should constant acceleration correctly', function(){
                    var problem = new InvertedPendulum({
			angle: startAngle, M: M
                    });

                    problem.tick(1);

                    var s = problem.currentState();
                    expect(s.position).toBeCloseTo(1/2, 0.01);
                    expect(s.angle).toBeCloseTo(startAngle, 0.01);
                    expect(s.velocity).toBeCloseTo(1/2, 0.01);
                    expect(s.angularVelocity).toBeCloseTo(0, 0.01);
		});
            });
        });

	describe('with pendulum at PI/6', function(){
	    var startAngle = Math.PI/6;

	    it('it should accelerate the cart', function(){
		var problem = new InvertedPendulum({
		    angle: startAngle
		});

		problem.tick();

		var s = problem.currentState();
		expect(s.position).toBeCloseTo(-Math.sqrt(3)/4, 0.01);
		expect(s.velocity).toBeCloseTo(-Math.sqrt(3)/4, 0.01);
	    })

	    it('it should accelerate the pendulum', function(){
		var problem = new InvertedPendulum({
		    angle: startAngle
		});

		problem.tick();

		var s = problem.currentState();
		expect(s.angle).toBeCloseTo(s.angle, 0.01);
		expect(s.angularVelocity).toBeCloseTo(Math.sin(startAngle), 0.01);
	    })
	});
    });
});
