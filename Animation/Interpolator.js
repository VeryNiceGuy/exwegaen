var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Interpolator = (function () {
    function Interpolator() {
    }
    return Interpolator;
}());
var LinearInterpolator = (function (_super) {
    __extends(LinearInterpolator, _super);
    function LinearInterpolator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LinearInterpolator.prototype.interpolate = function (timepoint1, timepoint2, time) {
        if (timepoint1.getType() == TimepointType.NumberTimepoint && timepoint2.getType() == TimepointType.NumberTimepoint) {
            return this.interpolateBetweenNumberTimepoints(timepoint1, timepoint2, time);
        }
        else if (timepoint1.getType() == TimepointType.Vector2Timepoint && timepoint2.getType() == TimepointType.Vector2Timepoint) {
            return this.interpolateBetweenVector2Timepoints(timepoint1, timepoint2, time);
        }
        else if (timepoint1.getType() == TimepointType.Vector3Timepoint && timepoint2.getType() == TimepointType.Vector3Timepoint) {
            return this.interpolateBetweenVector3Timepoints(timepoint1, timepoint2, time);
        }
    };
    LinearInterpolator.prototype.interpolateBetweenNumberTimepoints = function (timepoint1, timepoint2, time) {
        return new NumberTimepoint(time, timepoint1.num + ((timepoint2.num - timepoint1.num) / (time - timepoint1.time) / (timepoint2.time - timepoint1.time)));
    };
    LinearInterpolator.prototype.interpolateBetweenVector2Timepoints = function (timepoint1, timepoint2, time) {
        return new Vector2Timepoint(time, Vector2.lerp(timepoint1.vector2, timepoint2.vector2, (time - timepoint1.time) / (timepoint2.time - timepoint1.time)));
    };
    LinearInterpolator.prototype.interpolateBetweenVector3Timepoints = function (timepoint1, timepoint2, time) {
        return new Vector3Timepoint(time, Vector3.lerp(timepoint1.vector3, timepoint2.vector3, (time - timepoint1.time) / (timepoint2.time - timepoint1.time)));
    };
    return LinearInterpolator;
}(Interpolator));
//# sourceMappingURL=Interpolator.js.map