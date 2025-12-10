// ----------------------------------------------------------
// Here we discuss about type checking in TypeScript
// ------------------------------------------------------------


//Type Checking in TypeScript
// TypeScript is a statically typed superset of JavaScript that adds optional type checking to the language.
// This means that TypeScript allows developers to specify types for variables, function parameters, and return values,
// enabling the compiler to catch type-related errors during development rather than at runtime.

// WHY TYPE CHECKING?

// Type checking helps in identifying potential errors early in the development process.
// It improves code quality, maintainability, and readability by providing clear contracts for how data should be used.

// SYNTAX 
//? In TypeScript, types can be specified using a colon (:) followed by the type name.

// Example:
let age: number = 25; // 'age' is of type 'number'
let namee: string = "John"; // 'namee' is of type 'string'
let isStudent: boolean = true; // 'isStudent' is of type 'boolean'

// ----------------------------------------------------------
// Static vs Dynamic Typing
//----------------------------------------------------------


// DYNAMICALLY TYPED VARIABLE

// Languages like JavaScript and Python use dynamic typing.
// In dynamic typing, the type of a variable is known at runtime.
//* in JavaScript we use let number = 5; to declare a variable without specifying its type.

// the problem with dynamic typing
// js
let number = 10;
// number = 'a'; // No error at compile time, but can lead to runtime errors

// but what if we pass this into a function that expects a number?
Math.round(number); //! Runtime error: number is not a number (NaN)

// this is the problem with dynamic typing
// TS is here to help us avoid such issues by introducing static typing
// TS is essentially JS with type checking

// STATICALLY TYPED VARIABLE

// Some languages like C, C++, and Java use static typing.
// In static typing, the type of a variable is known at compile time.
//* in C we use int number = 5; to declare a variable of type integer.

// TS is statically typed HURRAY

// if we declare a variable with a type
let count: number = 10;
// count = 'a'; //! Error at compile time: Type 'strg' is not assignable to type 'number'

// this is the power of static typing






