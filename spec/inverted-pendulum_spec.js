describe('World', function(){
    it('should exist', function(){
        expect(World).toBeDefined();
    });

    it('should be instantiated', function(){
        expect(new World()).toBeDefined();
    });

    it('should provide inverted pendulum problems', function(){
        var world = new World();

        expect(world.createInvertedPendulum()).toBeDefined();
    });
});

describe('Inverted Pendulum', function(){
    var world;

    beforeEach(function(){
        world = new World();
    })

    it('should be instantiated', function(){
        expect(world.createInvertedPendulum()).toBeDefined();
    });

    it('should be observable', function(){
        expect(world.createInvertedPendulum() instanceof Observable).toBeTruthy();
    });

    describe('states', function(){
        it('should have current state', function(){
            var problem = world.createInvertedPendulum();
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
            var problem = world.createInvertedPendulum(start);
            var s = problem.currentState();

            expect(s.position).toBeCloseTo(start.position, 0.01);
            expect(s.angle).toBeCloseTo(start.angle, 0.01);
            expect(s.velocity).toBeCloseTo(start.velocity, 0.01);
            expect(s.angularVelocity).toBeCloseTo(start.angularVelocity, 0.01);
        });

        it('should complete state if not every detail is provided', function(){
            var start = { position: 1 };
            var problem = world.createInvertedPendulum(start);
            var s = problem.currentState();

            expect(s.position).toBeCloseTo(start.position, 0.01);
            expect(s.angle).toBeCloseTo(0, 0.01);
            expect(s.velocity).toBeCloseTo(0, 0.01);
            expect(s.angularVelocity).toBeCloseTo(0, 0.01);
        });

        it('should set the argument of the currentState function as the new current state', function() {
            var start = { position: 1 };
            var problem = world.createInvertedPendulum(start);
            expect(problem.currentState().position).toBe(1);
            var s = problem.currentState({ position: 2 });
            expect(s.position).toBe(2);
            expect(problem.currentState().position).toBe(2);
        });
    });

        it('should be possible to override default state', function(){
            var start = {
                position : 10,
                angle: 5,
                velocity: -3,
                angularVelocity: 1
            };
            var problem = world.createInvertedPendulum(start);
            var s = problem.currentState();

            expect(s.position).toBeCloseTo(start.position, 0.01);
            expect(s.angle).toBeCloseTo(start.angle, 0.01);
            expect(s.velocity).toBeCloseTo(start.velocity, 0.01);
            expect(s.angularVelocity).toBeCloseTo(start.angularVelocity, 0.01);
        });

        it('should reset with original state', function(){
            var start = {
                position : 10,
                angle: 5,
                velocity: -3,
                angularVelocity: 1
            };
            var problem = world.createInvertedPendulum(start);
			problem.tick();

			problem.reset();
            var s = problem.currentState();

            expect(s.position).toBeCloseTo(start.position, 0.01);
            expect(s.angle).toBeCloseTo(start.angle, 0.01);
            expect(s.velocity).toBeCloseTo(start.velocity, 0.01);
            expect(s.angularVelocity).toBeCloseTo(start.angularVelocity, 0.01);
        });

    describe('tick', function(){
        it('should calculate stationary state correctly', function(){
            var problem = world.createInvertedPendulum();

            problem.tick();

            var s = problem.currentState();
            expect(s.position).toBeCloseTo(0, 0.01);
            expect(s.angle).toBeCloseTo(0, 0.01);
            expect(s.velocity).toBeCloseTo(0, 0.01);
            expect(s.angularVelocity).toBeCloseTo(0, 0.01);
        });

        it('should notify on tick', function(){
            var problem = world.createInvertedPendulum();
            var called = false;
            problem.addObserver(function(){ called = true; });

            problem.tick();

            expect(called).toBeTruthy();
        });

        it('should notify of current state', function(){
            var problem = world.createInvertedPendulum();
            var s = undefined;
            problem.addObserver(function(state){ s = state; });

            problem.tick();
            expect(s.position).toBeCloseTo(0, 0.01);
            expect(s.angle).toBeCloseTo(0, 0.01);
            expect(s.velocity).toBeCloseTo(0, 0.01);
            expect(s.angularVelocity).toBeCloseTo(0, 0.01);
        });

        describe('with pendulum at PI/2', function(){
            var startAngle = Math.PI/2;

            it('should calculate stationary state', function(){
                var problem = world.createInvertedPendulum({
                    position: 0, velocity: 0, angle: startAngle, angularVelocity: 0
                });

                problem.tick();

                var s = problem.currentState();
                expect(s.position).toBeCloseTo(0, 0.01);
                expect(s.angle).toBeCloseTo(startAngle, 0.01);
                expect(s.velocity).toBeCloseTo(0, 0.01);
                expect(s.angularVelocity).toBeCloseTo(0, 0.01);
            });

            it('should put problem in an endstate when stationary state', function(){
                var problem = world.createInvertedPendulum({
                    position: 0, velocity: 0, angle: startAngle, angularVelocity: 0
                });

                problem.tick();

                var s = problem.currentState();
                expect(s.position).toBeCloseTo(0, 0.01);
                expect(s.angle).toBeCloseTo(startAngle, 0.01);
                expect(s.velocity).toBeCloseTo(0, 0.01);
                expect(s.angularVelocity).toBeCloseTo(0, 0.01);


            })

            it('should calculate linear displacement', function(){
                var problem = world.createInvertedPendulum({
                    position: 0, velocity: 1, angle: startAngle, angularVelocity: 0
                });

                expect(problem.currentState().ended).toBeFalsy();
                problem.tick();
                expect(problem.currentState().ended).toBeTruthy();

            });

            it('should constant acceleration correctly', function(){
                var problem = world.createInvertedPendulum({
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
                beforeEach(function(){
                    world = new World({ 'delta': 1/2 })
                });

                it('should calculate stationary state', function(){
                    var problem = world.createInvertedPendulum({
                        angle: startAngle
                    });

                    problem.tick();

                    var s = problem.currentState();
                    expect(s.position).toBeCloseTo(0, 0.01);
                    expect(s.angle).toBeCloseTo(startAngle, 0.01);
                    expect(s.velocity).toBeCloseTo(0, 0.01);
                    expect(s.angularVelocity).toBeCloseTo(0, 0.01);
                });

                it('should calculate linear displacement', function(){
                    var problem = world.createInvertedPendulum({
                        velocity: 1, angle: startAngle
                    });

                    problem.tick();

                    var s = problem.currentState();
                    expect(s.position).toBeCloseTo(1/2, 0.01);
                    expect(s.angle).toBeCloseTo(startAngle, 0.01);
                    expect(s.velocity).toBeCloseTo(1, 0.01);
                    expect(s.angularVelocity).toBeCloseTo(0, 0.01);
                });

                it('should constant acceleration correctly', function(){
                    var problem = world.createInvertedPendulum({
                        angle: startAngle
                    });

                    problem.tick(1);

                    var s = problem.currentState();
                    expect(s.position).toBeCloseTo(1/4, 0.01);
                    expect(s.angle).toBeCloseTo(startAngle, 0.01);
                    expect(s.velocity).toBeCloseTo(1/2, 0.01);
                    expect(s.angularVelocity).toBeCloseTo(0, 0.01);
                });
            });

            describe('with altered world extend', function(){
                beforeEach(function(){
                    world = new World({ 'extend': 10 });
                });

                it('should wrap world', function(){
                    var problem = world.createInvertedPendulum({
                        position: 5,
                        velocity: 1
                    });

                    problem.tick();

                    var s = problem.currentState();
                    expect(s.position).toBeCloseTo(-4);
                });
            });

            describe('with altered mass cart', function(){
                beforeEach(function(){
                    world = new World({ 'M': 2 })
                });

                it('should calculate stationary state', function(){
                    var problem = world.createInvertedPendulum({
                        angle: startAngle
                    });

                    problem.tick();

                    var s = problem.currentState();
                    expect(s.position).toBeCloseTo(0, 0.01);
                    expect(s.angle).toBeCloseTo(startAngle, 0.01);
                    expect(s.velocity).toBeCloseTo(0, 0.01);
                    expect(s.angularVelocity).toBeCloseTo(0, 0.01);
                });

                it('should calculate linear displacement', function(){
                    var problem = world.createInvertedPendulum({
                        velocity: 1, angle: startAngle
                    });

                    problem.tick();

                    var s = problem.currentState();
                    expect(s.position).toBeCloseTo(1, 0.01);
                    expect(s.angle).toBeCloseTo(startAngle, 0.01);
                    expect(s.velocity).toBeCloseTo(1, 0.01);
                    expect(s.angularVelocity).toBeCloseTo(0, 0.01);
                });

                it('should constant acceleration correctly', function(){
                    var problem = world.createInvertedPendulum({
                        angle: startAngle
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
                var problem = world.createInvertedPendulum({
                    angle: startAngle
                });

                problem.tick();

                var s = problem.currentState();
                expect(s.position).toBeCloseTo(-Math.sqrt(3)/4, 0.01);
                expect(s.velocity).toBeCloseTo(-Math.sqrt(3)/4, 0.01);
            })

            it('it should accelerate the pendulum', function(){
                var problem = world.createInvertedPendulum({
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
