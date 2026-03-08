export class Shape {
    constructor(type) {
        this.type = type;
    }

    getArea() {
        return 0;
    }

    toString() {
        return `[Shape ${this.type}]`;
    }

    valueOf() {
        return this.getArea();
    }
}

export class Square extends Shape {
    constructor(size) {
        super("square");
        this.size = size;
    }

    getArea() {
        return this.size * this.size;
    }
}

export class Rectangle extends Shape {
    constructor(width, height) {
        super("rectangle");
        this.width = width;
        this.height = height;
    }

    getArea() {
        return this.width * this.height;
    }
}

export class Circle extends Shape {
    constructor(radius) {
        super("circle");
        this.radius = radius;
    }

    getArea() {
        return Math.PI * this.radius * this.radius;
    }
}