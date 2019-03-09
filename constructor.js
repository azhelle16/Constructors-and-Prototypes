// 1. 
// a Shape constructor has a name
// 	sides property
// 		number of sides
// 2.
// a Rectangle is a shape	
// 	height
// 	width
// on the Rectangle's prototype 
// 	an area function
// 	a perimeter function
// make sure to connect the Rectangle and the Shape
// 3. 
// a Square is a Rectangle
// 	but if the height and width are different then set the width to be the height 
		
//SHAPE CONSTRUCTOR
function shape(name, numSides) {

	this.name = name;
	this.numSides = numSides;
	
}

//RECTANGLE CONSTRUCTOR
function rec(h,w,name,ns) {
	
	if (w != h) 
		h = w

	this.height = h;
	this.width = w;
	shape.call(this,name,ns)

}

rec.prototype = Object.create(shape.prototype);

//AREA FUNCTION
rec.prototype.area = function() {
	return this.height * this.width
}

//PERIMETER FUNCTION
rec.prototype.perimeter = function() {
	return 2*(this.width + this.height)
}

var square = new rec(40,40,"SQ1",4)
var sqr = new rec(20,60,"SQ2",4)

console.log("\nSQUARE1 is called "+square.name+" and it has "+square.numSides+" sides. It has a height of "+square.height+" and a width of "+square.width+". It has an area of "+square.area()+" and a perimeter of "+square.perimeter()+".\n")

console.log("\nSQUARE2 is called "+sqr.name+" and it has "+sqr.numSides+" sides. It has a height of "+sqr.height+" and a width of "+sqr.width+". It has an area of "+sqr.area()+" and a perimeter of "+sqr.perimeter()+".\n")