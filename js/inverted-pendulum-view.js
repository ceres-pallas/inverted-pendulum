(function($){
    var View = $.InvertedPendulumView = function(parent, problem){
	this.parent = parent;
	this.problem = problem;
	this.update();
    };
    View.prototype.update = function(){
	var container = this.container();
	new CanvasView(container, this.problem);
    };
    View.prototype.container = function(){
	if (!this._container) {
	    var c = this._container = document.createElement('div');
	    this.parent.appendChild(c);
	}
	return this._container;
    }

    var CanvasView = function(parent, problem){
	this.parent = parent;
	this.update();
    }
    CanvasView.prototype.update = function(){
	var ctx = this.context();
	var options = {
	    'width': 640,
	    'height' : 480,
	    'horizon': 10,
	    'wheel': 5,
	    'thickness': 2,
	    'length': 100,
	    'position': -50
	}
	ctx.strokeRect(0, 0, options.width, options.height);


	ctx.save();
	ctx.translate(0, options.horizon);
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(options.width, 0);
	ctx.stroke();
	ctx.restore();

	ctx.save();
	ctx.translate(options.width/2, options.horizon + options.wheel);
	ctx.translate(options.position, 0);
	ctx.beginPath();
	ctx.rect(-2 * options.wheel, 0, 4 * options.wheel, options.wheel);
	ctx.arc(-options.wheel, 0, options.wheel, Math.PI, 0, false);
	ctx.arc( options.wheel, 0, options.wheel, Math.PI, 0, false);
	ctx.stroke();
	ctx.restore();

	ctx.save();
	ctx.translate(options.width/2, options.horizon + 2 * options.wheel);
	ctx.translate(options.position, 0);
	ctx.beginPath();
	ctx.moveTo(-options.thickness, 0);
	ctx.lineTo(options.length * Math.sin(Math.PI/3) - options.thickness, options.length * Math.cos(Math.PI/3));
	ctx.lineTo(options.length * Math.sin(Math.PI/3) + options.thickness, options.length * Math.cos(Math.PI/3));
	ctx.lineTo(options.thickness, 0);
	ctx.stroke();
	ctx.restore();
    };
    CanvasView.prototype.container = function(){
	if (!this._container) {
	    var c = this._container = document.createElement('canvas');
	    c.setAttribute('width', 640);
	    c.setAttribute('height', 480);
	    this.parent.appendChild(c);
	}
	return this._container;
    }
    CanvasView.prototype.context = function(){
	if (!this._context) {
	    var c = this._context = this.container().getContext('2d');
	    c.translate(0, 480);
	    c.scale(1, -1);
	}
	return this._context;
    }
})(window || module.exports);
