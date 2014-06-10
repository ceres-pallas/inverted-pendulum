describe('Controller', function(){
    it('should exist', function(){
	expect(Controller).toBeDefined();
    });

    it('should be instantiable', function(){
	expect(new Controller()).toBeDefined();
    });

    describe('method', function(){
	var controller;

	beforeEach(function(){
	    controller = new Controller();
	});

	it('left should exist', function(){
	    expect(controller.left).toBeDefined();
	});

	it('right should exist', function(){
	    expect(controller.right).toBeDefined();
	});

	it('action should exist', function(){
	    expect(controller.action).toBeDefined();
	});

	describe('action', function(){
	    it('should return zero as default', function(){
		expect(controller.action()).toBe(0);
	    });

	    it('should return negative after left', function(){
		controller.left();

		expect(controller.action()).toBeLessThan(0);
	    });

	    it('should return negative after right', function(){
		controller.right();

		expect(controller.action()).toBeGreaterThan(0);
	    });

	    it('should only remember last direction', function(){
		controller.left();
		controller.right();

		expect(controller.action()).toBeGreaterThan(0);
	    });

	    it('should reset after call', function(){
		controller.left();

		controller.action();

		expect(controller.action()).toBe(0);
	    });
	});
    });

});
