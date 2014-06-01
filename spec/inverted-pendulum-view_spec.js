describe('Inverted Pendulum View', function(){
    beforeEach(function(){
        var container = document.createElement('div');
        container.setAttribute('id', 'test-container');
        var body = document.getElementsByTagName('body')[0];
        body.appendChild(container);
    });

    describe('Setup', function(){
        it('should have created a test container', function(){
            var testContainer = document.getElementById('test-container');

            expect(testContainer).toBeDefined();
        });
    });

    afterEach(function(){
        var container = document.getElementById('test-container');
        container.parentNode.removeChild(container);
    });
});
