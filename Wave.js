/**
 *	Wave JS
 *
 *	Description: Build a Sine wave on the canvas element, based on tweaks by the user.
 *	Author: RITESH KUKREJA
 *	Website: riteshkukreja.wordpress.com
 *	Github: https://github.com/riteshkukreja/sine-wave/
 *
**/
var Wave = function(config) {

	if(typeof config != "object" && typeof config.canvas == "undefined")
		throw "Provide a valid canvas element for the application.";

	// Holds the canvas and context object
	var canvas = config.canvas;
	var context = canvas.getContext("2d");

	// Tweaking settings
	// Spacing between two circles on the line
	var spacing = 1;

	// Frequency of the sine wave
	var frequency = config.frequency || 0.005;

	// Phase given to the sine wave
	var phase = config.phase || 30;

	// Amplitude of the sine wave
	var amplitude = config.amplitude || 50;

	// Color of the wave
	var color = config.color || "red";

	// Phase shift at each animation keyframe
	var shift = config.shift || 10;

	// Width of the sine wave, radius of the circles on the line
	var lineWidth = config.lineWidth || 4;

	// Boolean: Show the outline of the wave
	var outline = (typeof config.outline != "undefined" ? config.outline : true);

	// Boolean: Fill the wave to the bottom of the canvas with the given color
	var fill = (typeof config.fill != "undefined" ? config.fill : false);

	// Boolean: Fill the wave to the bottom of the canvas with the color gradient, needs fill property to be set
	var gradient = (typeof config.gradient != "undefined" ? config.gradient : false);

	// Position from wave to start drawing
	var origin = config.origin || {
		x: 0,
		y: canvas.height/2
	};

	/**
	 *	Draw a single point on the canvas
	 *	Uses arc() method of the context with radius 2
	 *	Depending on the values of outline, fill and graient flags , it will draw a point on the wave
	**/
	var drawPoint = function(x, y, color) {
		var r = lineWidth/2;
		context.beginPath();

		// If outline flag is set, draw circle on the wave
		if(outline) {
			context.fillStyle = color;
			context.lineWidth = 2;
			context.arc(x, y, r, 0, 2*Math.PI);
			context.fill();
		}

		// if fill flag is set, draw rectangles from circle to bottom of canvas
		if(fill) {

			if(gradient) {
				// if gradient flasg is set, generate a gradient with transparency to fill the rectangle
				var my_gradient = context.createLinearGradient(0, 0, 0, canvas.height);
				my_gradient.addColorStop(0.5, color);
				my_gradient.addColorStop(1, "transparent");
				context.fillStyle = my_gradient;
			} else {
				// else fill the rectangle with the given color
				context.fillStyle = color;
			}

			// fill the rectangle
			context.fillRect(x-r, y-r, r, canvas.height - y+r);
		}
	}

	/**
	 *	Build the entire sine wave using drawPoint()
	**/
	var buildSine = function(wavelength, phase, color) {
		for(var i = origin.x; i < origin.x+wavelength; i++) {
			var y = amplitude * Math.sin(frequency * (i + phase));
			drawPoint(i, origin.y+y, color);
		}
	}

	/**
	 *	Utility Method
	 *	Returns a random Integer between min and max range
	**/
	var getRandomInt = function(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}

	/**
	 *	Utility Method
	 *	Clear Method to clear the entire canvas
	**/
	var clear = function() {
		context.clearRect(0, 0, canvas.width, canvas.height);
	}

	/**
	 *	Visualize the wave
	 *	Main Calling Method of start of application
	**/
	var animate = function() {
		requestAnimationFrame(animate);
		clear();
		phase += getRandomInt(10, 15) + shift;
		buildSine(canvas.width, phase, color);
	}

	/**
	 *	Re-animation Jutsu
	 *	Draw once the wave on the canvas, used when multiple elements must be drawn simultaneously.
	**/
	var reanimate = function() {
		phase += getRandomInt(10, 15) + shift;
		buildSine(canvas.width, phase, color);
	}

	/**
	 *	Constructor Method
	**/ 
	this.redraw = function() {
		reanimate();
	}

	this.draw = function() {
		animate();
	}

	this.clearCanvas = function() {
		clear();
	}
}