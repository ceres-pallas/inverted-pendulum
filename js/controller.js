(function($){
    var Controller = $.Controller = function(){
        this.direction = 0;
    };
    Controller.prototype.left = function(){
        this.direction = -0.1;
    };
    Controller.prototype.right = function(){
        this.direction = 0.1;
    };
    Controller.prototype.action = function(){
        var direction = this.direction;
        this.direction = 0;
        return direction;
    }
})(window || module.exports);
