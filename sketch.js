var points = [];

var numPoints;
var mult;
var animate;
var a;

var multInput;

function setup() {
	createCanvas(windowWidth, windowHeight);
	
	a = false;
	
	multInput = createInput(2);
	multInput.position(width / 2 + 50, height / 2 - 24);
	
	multSlider = createSlider(0, 1000, 2);
	multSlider.position(width / 2 + multInput.width + 100, height / 2 - 24);
	
	pointsInput = createInput(100);
	pointsInput.position(width / 2 + 50, height / 2 + 24);
	
	pointsSlider = createSlider(0, 1000, 100);
	pointsSlider.position(width / 2 + pointsInput.width + 100, height / 2 + 24);
	
	animate = createButton("Animate");
	animate.position(pointsSlider.x + pointsSlider.width + 50, height / 2);
	animate.mousePressed(doAnimate);
	
	for (i = 0; i < numPoints; i ++) {
		var angle = (2 * i * PI) / numPoints;
		
		var posPoint = [- height / 4 * cos(angle), height / 4 * sin(angle)];
		
		points.push(posPoint);
	}
}

function draw() {
	background(255);
	translate(height / 2, height / 2);
	textSize(10);
	
	ellipse(0, 0, height/2, height/2);
	
	var preMultVal = mult;
	var prePointsVal = numPoints;
	
	if (!a) {
		if (multInput.value() == parseFloat(multInput.value()) && parseFloat(multInput.value()) <= 5000) {
			mult = parseFloat(multInput.value());
		}
		
		if (multSlider.value() != preMultVal) {
			multInput.value(multSlider.value());
			mult = multSlider.value();
		} else if (multSlider.value() != mult) {
			multSlider.value(mult);
		}
	} else {
		mult += 0.05;
		multSlider.value(mult.toFixed(2));
		multInput.value(mult.toFixed(2))
	}
	
	text("Multiplier:", width / 2 - height / 2 - 10, -8);
	text("Number of Points:", width / 2 - height / 2 - 45, 36);
	
	if (pointsInput.value() == parseFloat(pointsInput.value()) && parseFloat(pointsInput.value()) <= 5000) {
		numPoints = parseFloat(pointsInput.value());
	}
		
	if (pointsSlider.value() != prePointsVal) {
		pointsInput.value(pointsSlider.value());
		numPoints = pointsSlider.value();
	} else if (pointsSlider.value() != numPoints) {
		pointsSlider.value(numPoints);
	}
	
	for (i = 0; i < numPoints; i ++) {
		var angle = (2 * i * PI) / numPoints;
		
		var posPoint = [- (height - 20) / 2 * cos(angle), (height - 20) / 2 * sin(angle)];
		
		points.push(posPoint);
	}
	
	for (i = 0; i < numPoints; i ++) {
		var xPos = points[i][0];
		var yPos = points[i][1];
		
		var xMultPos = points[floor(mult * i) % numPoints][0];
		var yMultPos = points[floor(mult * i) % numPoints][1];
		
		
		line(xPos, yPos, xMultPos, yMultPos);
	}
	
	points.splice(0, numPoints);
}

function doAnimate() {
	a = !a;
}
