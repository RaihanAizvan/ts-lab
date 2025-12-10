//--
// --------------------------------------------------
// ARRAYS
// --------------------------------------------------

// In TypeScript, arrays can be defined in two ways:

// 1. Using the type followed by `[]` (e.g., `number[]` for an array of numbers).
// 2. Using the generic array type `Array<Type>` (e.g., `Array<number>`).

// --------------------------------------------------
// 1. Array of Numbers
// --------------------------------------------------

let numbers: number[] = [1, 2, 3, 4, 5];
let moreNumbers: Array<number> = [6, 7, 8];

// Attempting to add a non-number will result in a compile-time error
// numbers.push("hello"); // Error: Argument of type 'string' is not assignable to parameter of type 'number'.

// --------------------------------------------------
// 2. Array of Strings
// --------------------------------------------------

let names: string[] = ["Alice", "Bob", "Charlie"];
let moreNames: Array<string> = ["David", "Eve"];

// names.push(123); // Error: Argument of type 'number' is not assignable to parameter of type 'string'.

// --------------------------------------------------
// 3. Array of Booleans
// --------------------------------------------------

let flags: boolean[] = [true, false, true];

// --------------------------------------------------
// 4. Array of Any (use sparingly)
// --------------------------------------------------

// An array that can hold values of any type.
// This bypasses TypeScript's type checking for array elements.
// making it just JS
let mixedArray: any[] = [1, "hello", true, { key: "value" }];

// --------------------------------------------------
// 5. Readonly Arrays
// --------------------------------------------------

// You can create arrays that cannot be changed after creation.
// This is useful for ensuring data immutability.

let readonlyNumbers: ReadonlyArray<number> = [10, 20, 30];
// readonlyNumbers.push(40); // Error: Property 'push' does not exist on type 'readonly number[]'.
// readonlyNumbers[0] = 5; // Error: Index signature in type 'readonly number