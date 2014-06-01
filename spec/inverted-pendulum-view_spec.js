describe('Inverted Pendulum View', function(){
    beforeEach(function(){
        var container = document.createElement('div');
        container.setAttribute('id', 'test-container');
        var body = document.getElementsByTagName('body')[0];
        body.appendChild(container);
    });

    it('should exist', function(){
	expect(InvertedPendulumView).toBeDefined();
    });

    describe('Setup', function(){
        it('should have created a test container', function(){
            var testContainer = document.getElementById('test-container');

            expect(testContainer).toBeDefined();
        });
    });

    describe('dom structure', function(){
	var parent;
	var problem;

	beforeEach(function(){
	    parent = document.getElementById('test-container');
	});

	beforeEach(function(){
	    problem = (new World()).createInvertedPendulum();
	});

	it('should create a container', function(){
	    new InvertedPendulumView(parent, problem);

	    var containers = parent.getElementsByTagName('div');

	    expect(containers.length).toBe(1);
	});

	describe('container', function(){
	    var view;

	    beforeEach(function(){
		view = new InvertedPendulumView(parent, problem);
	    });

	    it('should contain a canvas', function(){
		var container = view.container();

		var canvasses = container.getElementsByTagName('canvas');

		expect(canvasses.length).toBe(1);
	    });

	    describe('canvas', function(){
		var canvas;

		beforeEach(function(){
		    canvas = view.container().getElementsByTagName('canvas')[0];
		});

		it('should be defined', function(){
		    expect(canvas).toBeDefined();
		});
	    });
	});
    });

    afterEach(function(){
        var container = document.getElementById('test-container');
        container.parentNode.removeChild(container);
    });
});
