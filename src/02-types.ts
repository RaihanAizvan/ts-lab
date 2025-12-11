// --
// --------------------------------------------------
// BUILT-IN TYPES
// --------------------------------------------------

// TypeScript comes with several built-in types that you can use to annotate your variables.

// 1. Number
// Represents both integer and floating-point numbers.
let price: number = 100.50;
let quantity: number = 10;
let largeNumber: number = 1_000_000; // if there are large numbers we can use _ as a separator for better readability. (feature of ES2021)


// 2. String
// Represents a sequence of characters.
let productName: string = "Laptop";
let description: string = `This is a ${productName} with a price of ${price}.`;

// 3. Boolean
// Represents a logical value, either true or false.
let isActive: boolean = true;
let hasDiscount: boolean = false;

// 4. Null
// Represents the intentional absence of any object value.
let user: null = null;

// 5. Undefined
// Represents a variable that has been declared but not yet assigned a value.
let value: undefined = undefined;
let anotherValue: number; // By default, it's undefined until assigned

// 6. Any
// A powerful type that can represent any JavaScript value.
// Use 'any' sparingly, as it bypasses TypeScript's type checking.
// It's useful when migrating JavaScript projects to TypeScript or when dealing with external libraries.
let data: any = "hello";
data = 123;
data = true;

// 7. Void
// Used for functions that do not return any value.
function logMessage(message: string): void {
    console.log(message);
}

// 8. Never
// Represents the type of values that never occur.
// Used for functions that throw an error or never return.
function throwError(message: string): never {
    throw new Error(message);
}

// 9. Unknown
// A safer alternative to 'any'.
// Variables of type 'unknown' can hold any value, but you must perform type checking or type assertion
// before performing operations on them.
let userInput: unknown;
userInput = 10;
userInput = "hello";

if (typeof userInput === 'string') {
    console.log(userInput.toUpperCase());
}

// --------------------------------------------------
// CUSTOM TYPES (TYPE ALIASES)
// ------------------------------------------------

// we create a type aliases using the type keyword
// types are same as interface but with some simple differences
type ID = number | string; // Custom type for IDs
type Status = "active" | "inactive" | "pending"; // Literal union type

// Example usage of custom types
let userId: ID = 123;
let productId: ID = "abc-789";
let userStatus: Status = "active";

console.log(`User ID: ${userId}, Product ID: ${productId}, User Status: ${userStatus}`);

// --------------------------------------------------
// TYPE ASSERTIONS
// --------------------------------------------------

// Type assertions are a way to tell the TypeScript compiler about the type of a variable
// when you have more information than TypeScript does.
// This is a compile-time construct and does not affect runtime behavior.

// 1. 'as' syntax (preferred in TypeScript)
let someValue: unknown = "this is a string";
let strLength: number = (someValue as string).length; 
// the as keyword is like a type casting in other languages, we dont know what is the type of somevalue what is we are saying hey ts this is string
//eg
// let strLength: number = (<string>someValue).length; // This is an alternative syntax using generics

console.log("strLength (as string):", strLength);

// 2. Angle-bracket syntax (not usable with TSX/JSX)
let anotherValue1: unknown = 42;
let numValue: number = (<number> anotherValue1);
// this is a numvalue 
console.log("numValue (<number>):", numValue);

// Common use case: asserting the type of a DOM element
// const imgElement = document.getElementById("myImage") as HTMLImageElement;
// if (imgElement) {
//     console.log("Image source:", imgElement.src);
// }

// Important: Type assertions do not perform runtime checks.
// If you assert a type incorrectly, you might encounter runtime errors.
let badValue: unknown = 123;
// let badLength: number = (badValue as string).length; // This will compile but throw a runtime error!
// console.log("badLength:", badLength); // Runtime error: Cannot read properties of undefined (reading 'length')

// --------------------------------------------------
// TYPE INFERENCE
// --------------------------------------------------

// TypeScript's ability to automatically determine the type of a variable
// based on its initialization or usage.

// 1. Implicit 'any' (avoid if possible)
// If you don't explicitly type a variable and TypeScript can't infer its type,
// it defaults to 'any'. This is often a
// sign of a potential issue.
// let unknownVar; // Type is 'any'
// unknownVar = 10;
// unknownVar = "hello";

// 2. Inference from initialization
let inferredString = "hello world"; // Type is inferred as 'string'
let inferredNumber = 100;         // Type is inferred as 'number'
let inferredBoolean = true;       // Type is inferred as 'boolean'

// 3. Inference for arrays
let inferredArray = [1, 2, 3]; // Type is inferred as 'number[]'
// inferredArray.push("4"); // Error: Argument of type 'string' is not assignable to parameter of type 'number'.

let mixedArray = [1, "hello", true]; // Type is inferred as '(number | string | boolean)[]'

// 4. Inference for functions
function addNumbers(a: number, b: number) {
    return a + b; // Return type is inferred as 'number'
}

let sum = addNumbers(5, 3); // Type of sum is inferred as 'number'

// that is it