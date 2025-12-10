//
// --------------------------------------------------
// TUPLES
// --------------------------------------------------

// Tuples are fixed-size arrays where each element can have a different type.
// we often use them when working with a pair of values
// They are useful when you want to store a collection of values of different types
// in a specific order.

// --------------------------------------------------
// 1. Basic Tuple
// --------------------------------------------------

// A tuple representing a [statusCode, statusMessage]
let httpStatus: [number, string] = [200, "OK"];

//even if didnt pass any value it will infer the types from the declaration

console.log(`Status Code: ${httpStatus[0]}, Message: ${httpStatus[1]}`);

// if we assign a value of the wrong type will result in a compile-time error
// httpStatus = ["Error", 500]; // Error: Type 'string' is not assignable to type 'number'.
// httpStatus = [404, "Not Found", true]; // Error: Source has 3 elements, but target allows only 2.

// --------------------------------------------------
// 2. Tuple with Optional Elements (TypeScript 3.0+)
// --------------------------------------------------

// You can define optional elements in a tuple using a question mark `?`.
// Optional elements must come at the end of the tuple definition.

let userInfo: [number, string, boolean?] = [1, "appukuttan"];
console.log(`User ID: ${userInfo[0]}, Name: ${userInfo[1]}`);

userInfo = [2, "Bob", true];
console.log(`User ID: ${userInfo[0]}, Name: ${userInfo[1]}, Is Active: ${userInfo[2]}`);


//note
//pushing to tuple is allowed but not recommended because it can lead to unexpected behavior
userInfo.push(false); // allowed but not recommended
console.log(userInfo);
// i hope this will be fixed in future versions of TS

// --------------------------------------------------
// 3. Tuple with Rest Elements (TypeScript 3.0+)
// --------------------------------------------------

// You can use rest elements in tuples to represent an array of elements
// of a specific type at the end of the tuple.

let userRoles: [number, string, ...string[]] = [1, "admin", "Editor", "Viewer"];
console.log(`User ID: ${userRoles[0]}, Primary Role: ${userRoles[1]}, Other Roles: ${userRoles.slice(2).join(", ")}`);

let productInfo: [string, number, ...boolean[]] = ["Laptop", 1200, true, false];
console.log(`Product: ${productInfo[0]}, Price: $${productInfo[1]}, Features: ${productInfo.slice(2).join(", ")}`);

// --------------------------------------------------
// 4. Readonly Tuples
// --------------------------------------------------

// You can create tuples that cannot be changed after creation.
// This is useful for ensuring data immutability.

let readonlyTuple: readonly [number, string] = [42, "The Answer"];
// readonlyTuple[0] = 100; // Error: Index signature in type 'readonly [number, string]' only permits reading.
// readonlyTuple.push("New Value"); // Error: Property 'push' does not exist on type 'readonly [number, string]'.

console.log(`Readonly Tuple - ID: ${readonlyTuple[0]}, Description: ${readonlyTuple[1]}`);

//--------------------------------------------------

