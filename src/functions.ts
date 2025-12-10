//
// --------------------------------------------------
// FUNCTIONS
// --------------------------------------------------

// In TypeScript, functions can be typed to ensure that the arguments passed to them
// and the values they return conform to specific types. This helps catch errors
// early and makes the code more predictable and maintainable.

//* Note:- PLEASE ADD PROPER ANNOTATION FOR FUNCTIONS EVEN IF VOID

// --------------------------------------------------
// 1. Basic Function with Type Annotations
// --------------------------------------------------

// Function parameters and return types are explicitly annotated.
function addNum(a: number, b: number): number {
    return a + b;
}

let sum: number = addNum(5, 3);
console.log(`Sum: ${sum}`); // Output: 8

// add("hello", 3); // Error: Argument of type 'string' is not assignable to parameter of type 'number'.

// --------------------------------------------------
// 2. Optional and Default Parameters
// --------------------------------------------------

// Optional parameters are denoted by a `?` after the parameter name.
// Default parameters provide a default value if the argument is not provided.

function greet(name: string, greeting?: string): string {
    if (greeting) {
        return `${greeting}, ${name}!`;
    }
    return `Hello, ${name}!`;
}

console.log(greet("Alice"));          // Output: Hello, Alice!
console.log(greet("Bob", "Hi"));      // Output: Hi, Bob!

function multiply(a: number, b: number = 2): number {
    return a * b;
}

console.log(multiply(5));     // Output: 10 (b defaults to 2)
console.log(multiply(5, 4));  // Output: 20

// --------------------------------------------------
// 3. Rest Parameters
// --------------------------------------------------

// Rest parameters allow a function to accept an indefinite number of arguments
// as an array.

function sumAll(...numbers: number[]): number {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sumAll(1, 2, 3));         // Output: 6
console.log(sumAll(10, 20, 30, 40));  // Output: 10

//--------------------------------------------------
// 4. Function Types
// --------------------------------------------------

// You can define types for functions, which can be useful for
// passing functions as arguments or defining function signatures.

// Type alias for a function that takes two numbers and returns a number
type MathOperation = (x: number, y: number) => number;

let add: MathOperation = function (x, y) {
 return x + y;
};

let subtract: MathOperation = (x, y) => x - y;

console.log(`Add function result: ${add(10, 5)}`); // Output: 15
console.log(`Subtract function result: ${subtract(10, 5)}`); // Output: 5

// Function that takes another function as an argument
function operateOnNumbers(a: number, b: number, operation: MathOperation): number {
 return operation(a, b);
}

console.log(`Operation result (add): ${operateOnNumbers(20, 10, add)}`); // Output: 30
console.log(`Operation result (subtract): ${operateOnNumbers(20, 10, subtract)}`); // Output: 10


// dont forget always use proper annotation for functions