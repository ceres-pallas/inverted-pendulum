describe('Helper', function(){
    it('should be defined', function(){
	expect(Helper).toBeDefined();
    });

    describe('copy', function(){
	it('should make a copy of an object', function(){
	    var original = { 'a': 0, 'b': 1 };

	    var copy = Helper.copy(original);

	    for (var key in original) {
		expect(copy[key]).toBe(original[key]);
	    }
	});

	it('should make independent copy', function(){
	    var original = { 'a': 0, 'b': 1 };

	    var copy = Helper.copy(original);
	    copy['a'] = 2;

	    expect(original['a']).toBe(0);
	});
    });

    describe('extend', function(){
	it('should create an extended object', function(){
	    var original = { 'a': 0 };

	    var extension = Helper.extend(original).by({ 'b': 1 });

	    expect(extension.a).toBe(0);
	    expect(extension.b).toBe(1);
	});

	it('should make an independent extension', function(){
	    var original = { 'a': 0 };

	    var extension = Helper.extend(original).by({ 'b': 1 });
	    extension.a = 1;

	    expect(original.a).toBe(0);
	});

	it('should prefer own values', function(){
	    var original = { 'a': 0, 'b': 0 };

	    var extension = Helper.extend(original).by({ 'b': 1 });

	    expect(original.b).toBe(0);
	});
    });
});
