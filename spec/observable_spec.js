describe('Observerable', function(){
    it('should be defined', function(){
	expect(Observable).toBeDefined();
    });

    it('should create observables', function(){
	expect(new Observable()).toBeDefined();
    });

    it('should register observers', function(){
	var observable = new Observable();

	observable.addObserver(function(){});
    });

    it('should notify observers', function(){
	var isCalled = false;
	var observable = new Observable();
	observable.addObserver(function(){ isCalled = true; });

	observable.notify();

	expect(isCalled).toBeTruthy();
    });

    it('should pass arguments to notify', function(){
	var called = false;
	var observable = new Observable();
	observable.addObserver(function(value){ called = value });

	observable.notify(true);

	expect(called).toBeTruthy();
    });

});
