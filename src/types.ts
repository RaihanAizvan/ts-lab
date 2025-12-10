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