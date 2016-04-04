var config = require("../../../config.js");
var PhysicalServoController = require("./PhysicalServoController.js");
var VirtualServoController = require("./VirtualServoController.js");
module.exports = function Servo(lowerLimit, upperLimit, rate, position) {
    var controller = (config.environment === "prod") ?
        new PhysicalServoController(position) :
        new VirtualServoController();

    console.log("Creating new servo");
    return {
        position: 0,
        center: function() {
            if (this.position > 0) {
                this.position -= rate;
            } else if (this.position < 0) {
                this.position += rate;
            }

            if (Math.abs(this.position) < rate) {
                this.position = 0;
            }
        },
        clockwise: function() {
            this.position += rate;
            if (this.position > upperLimit) {
                this.position = upperLimit;
            }
        },
        counterclockwise: function() {
            this.position -= rate;
            if (this.position < lowerLimit) {
                this.position = lowerLimit;
            }

        }
    }
};