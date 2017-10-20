var ERROR = -1;
var Timepoint = (function () {
    function Timepoint(time, value) {
        this.time = time;
        this.value = value;
    }
    return Timepoint;
}());
var Timeline = (function () {
    function Timeline(points) {
        if (points === void 0) { points = []; }
        this.points = points;
    }
    Timeline.prototype.getNumberOfPoints = function () {
        return this.points.length;
    };
    Timeline.prototype.getPointAtIndex = function (index) {
        return this.points[index];
    };
    Timeline.prototype.getLastPoint = function () {
        return this.getPointAtIndex(this.getNumberOfSegments());
    };
    Timeline.prototype.getNumberOfSegments = function () {
        return this.getNumberOfPoints() - 1;
    };
    Timeline.prototype.getSegmentIndex = function (time) {
        for (var i = 0; i < this.points.length; ++i) {
            if (this.getPointAtIndex(i).time >= time) {
                if (time === this.getPointAtIndex(i).time) {
                    return i;
                }
                else {
                    return i - 1;
                }
            }
        }
        return ERROR;
    };
    Timeline.prototype.getNextSegmentIndex = function (time, currentSegmentIndex) {
        var i = currentSegmentIndex;
        if (time < this.getPointAtIndex(i).time) {
            i -= 1;
            for (; i >= 0; --i) {
                if (time >= this.getPointAtIndex(i).time) {
                    return i;
                }
            }
        }
        else if (time > this.getPointAtIndex(i + 1).time) {
            i += 1;
            for (; i < this.getNumberOfPoints(); ++i) {
                if (time <= this.getPointAtIndex(i).time) {
                    return i - 1;
                }
            }
        }
        else {
            return currentSegmentIndex;
        }
    };
    Timeline.prototype.getSegmentPoints = function (index, timepoint1, timepoint2) {
        /*timepoint1 = this.points[index];
        timepoint2 = this.points[index + 1];*/
        timepoint1.time = this.points[index].time;
        timepoint1.value = this.points[index].value;
        timepoint2.time = this.points[index + 1].time;
        timepoint2.value = this.points[index + 1].value;
    };
    return Timeline;
}());
//# sourceMappingURL=Timeline.js.map