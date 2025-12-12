// --------------------------------------------------
// ABSTRACT CLASSES
// --------------------------------------------------
// An abstract class is a blueprint.
// It can have:

// completed methods (normal functions)

// incomplete methods (abstract methods: only name, no body)

// But you cannot create objects from an abstract class
// You must extend it and implement the missing pieces.
// Let me tell it in a simpler way:

// Imagine you write:

// A class called Vehicle
// You know all vehicles have start() and stop()
// But how exactly they start depends on the specific vehicle (car, bike, EV, rocket)
// So:

// Vehicle becomes abstract.

// start() becomes an abstract method.

// Car, Bike extends Vehicle and implement start() in their own style.

// That’s it.

// --------------------------------------------------

// --------------------------------------------------
// 1) Basic abstract class
// --------------------------------------------------
// You cannot "new" this class. It has an abstract method with no body.
// A child must provide the body.

abstract class Shape {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  // normal method with code
  describe(): string {
    return `shape: ${this.name}`;
  }

  // abstract method: no body here
  // children must implement this
  abstract area(): number;
}

// const s = new Shape("base"); // not allowed Cannot create an instance of an abstract class

// --------------------------------------------------
// 2) Subclasses must implement abstract methods
// --------------------------------------------------

class Circle extends Shape {
  private radius: number;

  constructor(radius: number) {
    //  super is basically you shouting to the parent class:
    // “Hey old man, I need your stuff.”
    super("circle");
    this.radius = radius;
  }

  area(): number {
    return Math.PI * this.radius * this.radius;
  }
}

class Rectangle extends Shape {
  protected width: number;
  protected height: number;

  constructor(width: number, height: number) {
    // super is basically you shouting to the parent class:
    // “Hey old man, I need your stuff.”
    super("rectangle");
    this.width = width;
    this.height = height;
  }

  area(): number {
    return this.width * this.height;
  }
}

const c = new Circle(2);
console.log(c.describe(), "area:", c.area());

const r = new Rectangle(3, 4);
console.log(r.describe(), "area:", r.area());



// --------------------------------------------------
// 6) Abstract class vs interface (short)
// --------------------------------------------------
// Interface: only a shape. No code. Classes or objects implement it.
// Abstract class: can have code and abstract parts. Classes extend it.
// If you only need a shape, use an interface. If you want shared code, use an abstract class.

// End. hope you understand byby
