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
	ctx.strokeRect(0, 0, 640, 479);

	ctx.save();
	ctx.translate(0, 10)
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(640, 0);
	ctx.stroke();
	ctx.restore();

	ctx.save();
	ctx.translate(640/2, 15);
	ctx.beginPath();
	ctx.rect(-10, 0, 20, 5);
	ctx.arc(-5, 0, 5, Math.PI, 0, false);
	ctx.arc( 5, 0, 5, Math.PI, 0, false);
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
