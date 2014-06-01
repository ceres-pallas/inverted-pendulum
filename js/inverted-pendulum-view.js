(function($){
    var View = $.InvertedPendulumView = function(parent, problem){
	this.parent = parent;
	this.update();
    };
    View.prototype.update = function(){
	var container = this.container();
    };
    View.prototype.container = function(){
	if (!this._container) {
	    var c = this._container = document.createElement('div');
	    this.parent.appendChild(c);
	}
	return this._container;
    }
})(window || module.exports);
