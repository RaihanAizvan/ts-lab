// I know everyone knows classes, still here we assume that you are new

// ---------------------------
// CLASSES
// --------------------------

// Class is nothing but a blueprint of an object.
// In TypeScript, classes are a fundamental feature for building object-oriented applications.
// They provide a way to define blueprints for creating objects (instances) with shared
// properties and methods. TypeScript's classes are closely aligned with ECMAScript 2015 (ES6)
// classes but add strong typing and additional features like access modifiers.

// --------------------------------------------------
// 1. Basic Class Definition
// --------------------------------------------------

// A simple class with properties and a constructor.
class User {
    // here we are just defining the types so that the constructor know it
    email: string;
    name: string;
    constructor(email: string, name: string) {
        this.email = email;
        this.name = name
    }
}

// Create an instance of the user class
let user = new User('hi', 'hie');
console.log(user.name); // Output: Hello, world

// --------------------------------------------------
// 2. Access Modifiers (public, private, protected)
// --------------------------------------------------

// TypeScript provides access modifiers to control the visibility of class members.

class Animal {
  public name: string; // Accessible from anywhere (default if not specified)
  private age: number; // Accessible only within the Animal class
  protected species: string; // Accessible within Animal and its subclasses/st udents

  constructor(name: string, age: number, species: string) {
    this.name = name;
    this.age = age;
    this.species = species;
  }

  public getAge(): number {
    return this.age; // Private member can be accessed within the class
  }

  protected getSpecies(): string {
    return this.species;
  }

  public describe(): string {
    return `${this.name} is a ${this.species} and is ${this.age} years old.`;
  }
}

let dog = new Animal("Buddy", 5, "Dog");
console.log(dog.name); // Output: Buddy (public)
console.log(dog.getAge()); // Output: 5 (public method to access private age)
// console.log(dog.age); // Error: Property 'age' is private and only accessible within class 'Animal