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

	// Boolean: fix start and end points
	var fixedStart = (typeof config.fixedStart != "undefined" ? config.fixedStart : false);
	var fixedEnd = (typeof config.fixedEnd != "undefined" ? config.fixedEnd : false);
	
	// number between 0-1: Damping factor
	var damping = (typeof config.damping === "number" ? config.damping : 0.5);

	// Position from wave to start drawing
	var origin = config.origin || {
		x: 0,
		y: canvas.height/2
	};

	/**
	 * Map a number from one range to another
	 */
	const map = (num, in_min, in_max, out_min, out_max) => {
		return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
	};
		
	/**
	 * Provide damping factor which ranges from 0 - 1 - 0.
	 */
	const damp = (end, x, size) => {
		const effectiveValue = 1 - (x / end);
		return 2 * effectiveValue * (x / end) * size;
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
	var buildSine = function(wavelength, phase, color, amplitude, frequency) {
		for(var i = origin.x; i < origin.x+wavelength; i++) {
			var y = amplitude * Math.sin(frequency * (i + phase));

			if(fixedStart && fixedEnd) {
				drawPoint(i, origin.y + damp(origin.x + wavelength, i, damping) * y, color);
			} else if(fixedStart) {
				drawPoint(i, origin.y + map(i, origin.x, origin.x + wavelength, 0, damping) * y, color);
			} else if(fixedEnd) {
				drawPoint(i, origin.y + ( damping -map(i, origin.x, origin.x + wavelength, 0, damping)) * y, color);
			} else {
				drawPoint(i, origin.y+y, color);
			}
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
	 *
	 *	Config Object provides a temporary change in the nature of the wave and can be used to define animations
	**/
	var animate = function(config) {
		//requestAnimationFrame(animate);
		clear();
		phase += getRandomInt(10, 15) + shift;

		// consider changes based on config object
		var amp 	= 	(typeof config != "undefined" ? config.amplitude 	|| amplitude : amplitude);
		var clr 	= 	(typeof config != "undefined" ? config.color 		|| color : color);
		var ph 		= 	(typeof config != "undefined" ? config.phase 		|| phase : phase);
		var freq 	= 	(typeof config != "undefined" ? config.frequency 	|| frequency : frequency);

		buildSine(canvas.width, ph, clr, amp, freq);
		setTimeout(animate, 1000/30);
	}

	/**
	 *	Re-animation Jutsu
	 *	Draw once the wave on the canvas, used when multiple elements must be drawn simultaneously.
	 *
	 *	Config Object provides a temporary change in the nature of the wave and can be used to define animations
	**/
	var reanimate = function(config) {
		phase += getRandomInt(10, 15) + shift;

		// consider changes based on config object
		var amp 	= 	(typeof config != "undefined" ? config.amplitude 	|| amplitude : amplitude);
		var clr 	= 	(typeof config != "undefined" ? config.color 		|| color : color);
		var ph 		= 	(typeof config != "undefined" ? config.phase 		|| phase : phase);
		var freq 	= 	(typeof config != "undefined" ? config.frequency 	|| frequency : frequency);

		buildSine(canvas.width, ph, clr, amp, freq);
	}

	/**
	 *	Constructor Method
	**/ 
	this.redraw = function(config) {
		reanimate(config);
	}

	this.draw = function(config) {
		animate(config);
	}

	this.clearCanvas = function() {
		clear();
	}
}