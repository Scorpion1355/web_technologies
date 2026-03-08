export function Shape(type) {
    this.type = type;
}

Shape.prototype.getArea = function () {
    return 0;
};

Shape.prototype.toString = function () {
    return `[Shape ${this.type}]`;
};

Shape.prototype.valueOf = function () {
    return this.getArea();
};

export function Square(size) {
    Shape.call(this, "square");
    this.size = size;
}

Square.prototype = Object.create(Shape.prototype);
Square.prototype.constructor = Square;

Square.prototype.getArea = function () {
    return this.size * this.size;
};

export function Rectangle(width, height) {
    Shape.call(this, "rectangle");
    this.width = width;
    this.height = height;
}

Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.getArea = function () {
    return this.width * this.height;
};

export function Circle(radius) {
    Shape.call(this, "circle");
    this.radius = radius;
}

Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.getArea = function () {
    return Math.PI * this.radius * this.radius;
};