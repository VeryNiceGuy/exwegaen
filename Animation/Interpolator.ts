abstract class Interpolator {
    abstract interpolate(timepoint1: Timepoint, timepoint2: Timepoint, time: number): Timepoint;
}

class LinearInterpolator extends Interpolator {
    interpolate(timepoint1: Timepoint, timepoint2: Timepoint, time: number): Timepoint {
        if (timepoint1.getType() == TimepointType.NumberTimepoint && timepoint2.getType() == TimepointType.NumberTimepoint) {
            return this.interpolateBetweenNumberTimepoints(timepoint1 as NumberTimepoint, timepoint2 as NumberTimepoint, time);
        }
        else if (timepoint1.getType() == TimepointType.Vector2Timepoint && timepoint2.getType() == TimepointType.Vector2Timepoint) {
            return this.interpolateBetweenVector2Timepoints(timepoint1 as Vector2Timepoint, timepoint2 as Vector2Timepoint, time);
        }
        else if (timepoint1.getType() == TimepointType.Vector3Timepoint && timepoint2.getType() == TimepointType.Vector3Timepoint) {
            return this.interpolateBetweenVector3Timepoints(timepoint1 as Vector3Timepoint, timepoint2 as Vector3Timepoint, time);
        }
    }

    interpolateBetweenNumberTimepoints(timepoint1: NumberTimepoint, timepoint2: NumberTimepoint, time: number): NumberTimepoint {
        return new NumberTimepoint(time, timepoint1.num + ((timepoint2.num - timepoint1.num) / (time - timepoint1.time) / (timepoint2.time - timepoint1.time)));
    }

    interpolateBetweenVector2Timepoints(timepoint1: Vector2Timepoint, timepoint2: Vector2Timepoint, time: number): Vector2Timepoint {
        return new Vector2Timepoint(time, Vector2.lerp(timepoint1.vector2, timepoint2.vector2, (time - timepoint1.time) / (timepoint2.time - timepoint1.time)));
    }

    interpolateBetweenVector3Timepoints(timepoint1: Vector3Timepoint, timepoint2: Vector3Timepoint, time: number): Vector3Timepoint {
        return new Vector3Timepoint(time, Vector3.lerp(timepoint1.vector3, timepoint2.vector3, (time - timepoint1.time) / (timepoint2.time - timepoint1.time)));
    }
}
