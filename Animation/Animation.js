var Animation = (function () {
    function Animation(name, duration) {
        this.name = name;
        this.duration = duration;
    }
    Animation.prototype.getName = function () {
        return this.name;
    };
    Animation.prototype.getDuration = function () {
        return this.duration;
    };
    return Animation;
}());
//# sourceMappingURL=Animation.js.map