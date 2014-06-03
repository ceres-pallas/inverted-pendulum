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
	var canvas = this.container();
	var ctx = canvas.getContext('2d');
	ctx.strokeRect(0, 0, 640, 480);
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
