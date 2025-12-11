//
// --------------------------------------------------
// LITERAL TYPES
// --------------------------------------------------

// Literal types allow you to define a type that is exactly one specific value.
// This is not just about the *type* of the value (e.g., `string`), but the *value itself* (e.g., `"hello"`).
// They are often used in combination with union types to create a set of allowed literal values.

// --------------------------------------------------
// 1. String Literal Types
// --------------------------------------------------

// A variable can only hold the exact string "hello".
let greeting: "hello";
greeting = "hello";
// greeting = "hi"; // Error: Type '"hi"' is not assignable to type '"hello"'.

// More commonly, string literal types are used in union types.
type TrafficLightColor = "red" | "yellow" | "green";

let carLight: TrafficLightColor = "red";
carLight = "green";
// carLight = "blue"; // Error: Type '"blue"' is not assignable to type 'TrafficLightColor'.

function setLight(color: TrafficLightColor): void {
    console.log(`Setting traffic light to: ${color}`);
}

setLight("yellow");
// setLight("purple"); // Error

// --------------------------------------------------
// 2. Numeric Literal Types
// --------------------------------------------------

// Similar to string literals, but for specific numeric values.
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;

let roll: DiceRoll;
roll = 3;
// roll = 7; // Error: Type '7' is not assignable to type 'DiceRoll'.

function rollDice(): DiceRoll {
    return (Math.floor(Math.random() * 6) + 1) as DiceRoll;
}

let result = rollDice();
console.log(`You rolled a: ${result}`);

// --------------------------------------------------
// 3. Boolean Literal Types
// --------------------------------------------------

// Less common, as `boolean` itself is a union of `true` and `false`.
type TrueOnly = true;
let isTrue: TrueOnly = true;
// let isFalse: TrueOnly = false; // Error: Type 'false


//so what makes literal differ from unions
// --------------------------------------------------
// 4. Literal Types vs. Union Types (Clarification)
// --------------------------------------------------

// The key difference is that literal types define a type that is *one specific value*,
// while union types allow a variable to hold *any one of several types or literal values*.

// Example:
type SpecificString = "exact"; // This is a literal type. The only value allowed is "exact". and honestly we dont use it in our projects
type StringOrNumber = string | number; // This is a union type. It can be any string OR any number.
type SpecificStringsUnion = "apple" | "banana" | "orange"; // This is a union of literal types.

let mySpecificString: SpecificString = "exact";
// mySpecificString = "not exact"; // Error

let myUnion: StringOrNumber = "hello";
myUnion = 123;
// myUnion = true; // Error

let myFruit: SpecificStringsUnion = "apple";
myFruit = "orange";
// myFruit = "grape"; // Error

// In essence, a literal type is a type whose only possible value is the literal itself.
// A union type combines multiple types (which can include literal types) into one.
// So, `TrafficLightColor` and `DiceRoll` above are actually union types composed of literal types.
// The "literal types" section focuses on the concept that specific values can *be* types.
