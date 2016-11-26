# Sine Wave Animation

Its a simple javascript plugin to build a beautiful sine wave on the given canvas. It allows user to add multiple elements on the same canvas.

## Get Started
### Setting up the Environment
Copy the Wave.min.js inside your working directory and insert the script tag inside your HTML document.

```html
<script type="txt/javascript" src="Wave.min.js" />
```

### Building your First Program
The following code segment will produce a sine wave on the canvas.

#### Creating a canvas element
```html
<!-- Canvas Holder for the animation -->
<canvas id="anim" width="500" height="500"></canvas>
```
#### Scripting it away
```javascript
var canvas = document.getElementById("anim");
var context = canvas.getContext("2d");

var firstwave = new Wave({
					canvas: canvas
				});
        
firstwave.draw();
```

# Documentation

## Class Wave
Takes Config object to configure the wave. It is compulsory to provide the Config Object.

***Syntax***
```javascript
var wave = new Wave(config);
```

## Methods

### .draw()
Method to draw a single sine wave on the canvas. It uses ```window.requestAnimationFrame()``` to animate the wave on the canvas. The canvas is cleared at each step, hence this method cannot be used to draw more than one element on the canvas.
See ```.redraw()``` to draw multiple elements on the same canvas.

***Syntax***
```javascript
wave.draw();
```

### .redraw()
Method to draw a single keyframe of the sine wave on the canvas. It must be used with users own animation method to draw each keyframe after an interval.

***Syntax***
```javascript
var myanim = function() {
  window.requestAnimationFrame(myanim);
  wave.clearCanvas();
  wave.redraw();
}
```


### .clearCanvas()
Method to clear the entire canvas for redraw of keyframes.

***Syntax***
```javascript
wave.clearCanvas();
```

## Config Object

### canvas (Required)
Holds the DOM canvas object. It must be passed for the application to work. If no canvas object is pass, an exception is thrown.

### frequency
The frequency of the sine wave. It defines the number of waves inside the given canvas. Default value is 0.005.

### phase
The phase with which the sine wave will be produced. Default value is 30.

### amplitude
The amplitude with which the sine wave will be produced. Default value is 50.

### color
The color of the sine wave. Default value is red.

### shift
Shift defines the relative speed of the wave. It is responsible for wave animation. Default value is 10.

### lineWidth
The width of the line sine wave. Default value is 4.

### outline
Boolean flag to show/hide the sine wave outline. It is compulsory to show the outline when working with line sine wave. It can be removed when filling the wave. Default value is ```true```.

### fill
Boolean flag to fill the bottom of the wave with the given color. This will hide the other waves if their values are lower than the last wave. Default value is ```false```.

### gradient
Boolean flag to add gradient to the fill property of the sine wave. The gradient used will be color to transparent from top to bottom. Default value is ```false```.

### origin
Object describing the position of the start of the sine wave. Contains keys ```x``` and ```y``` for defining coordinates of the wave from the top left of the canvas. Default value is ```{ x: 0, y: canvas.height/2 }```.

## Building three Sine waves on the same Canvas

```javascript
  var waveList = [];
  rs = ["#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#03A9F4", "#00BCD4"];

	/**
	 *	Clear the canvas and then draw all the waves on the canvas. Utilize requestAnimationFrame for recursion.
	**/
	var draw = function() {
		window.requestAnimationFrame(draw);
		// draw all features
		waveList[0].clear();

		for(var w of waveList)
			w.redraw();
	}

  // build 3 waves and push it to waveList
  for(var i = 0; i < 3; i++) {
	  waveList.push(
		  new Wave({
			  canvas: canvas, 
			  color: colors[Math.floor(Math.random() * colors.length-1)], 
			  phase: 30 * i, 
			  shift: 10 * (i+1), 
			  amplitude: 10 * (i+1),
			  outline: true
		  })
	  );
  }

  // fire it up
  draw();
```

