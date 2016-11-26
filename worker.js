/**
 *	Worker JS
 *
 *	Description: Uses Wave JS to build waves to a canvas element
 *	Author: RITESH KUKREJA
 *	Website: riteshkukreja.wordpress.com
 *
**/

/**
 *	Canvas Element and Canvas Context
**/
var canvas = document.getElementById("anim");
var context = canvas.getContext("2d");

/**
 *	WaveList to store all the waves in the list
 *	colors list to allow multiple colors to chose from
**/
var waveList = [];
var colors = ["#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#795548", "#9E9E9E", "#607D8B"];


window.onload = function() {

	// Canvas will cover up the entire screen
	canvas.width = screen.width;
	canvas.height = screen.height;

	/**
	 *	Clear Method to clear the entire canvas
	**/
	var clear = function() {
		context.clearRect(0, 0, canvas.width, canvas.height);
	}

	/**
	 *	Returns a random Integer between min and max range.
	**/
	var getRandomInt = function(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}

	/**
	 *	Clear the canvas and then draw all the waves on the canvas. Utilize requestAnimationFrame for recursion.
	**/
	var draw = function() {
		window.requestAnimationFrame(draw);
		// draw all features
		clear();

		for(var w of waveList)
			w.redraw();
	}

	/**
	 *	Initialize the appliation
	**/
	var init = function() {
		for(var i = 0; i < 3; i++) {
			waveList.push(
				new Wave({
					canvas: canvas, 
					color: colors[getRandomInt(0, colors.length-1)], 
					phase: getRandomInt(0, 360), 
					shift: getRandomInt(-70, 70), 
					amplitude: getRandomInt(40, 100),
					outline: true
				})
			);

			//waveList[0].draw();
		}

		draw();
	}

	// Let it go
	init();
}


