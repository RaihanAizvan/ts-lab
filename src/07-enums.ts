//
// --------------------------------------------------
// ENUMS
// --------------------------------------------------

// Enums (enumerations) are a new data type in TypeScript that allow us to define a set of named constants.
// if you are coming from other programming languages like C, C++, Java, C# etc
// you might be already familiar with enums

// Using enums can make your code more readable and maintainable by providing meaningful names for a set of numeric or string values.



// --------------------------------------------------
// 1. Numeric Enums (Default)
// --------------------------------------------------

// By default, enums are numeric, and the first member is initialized to 0.
// Subsequent members are auto-incremented.

// suppose in js
/**
 * const Up = 0;
 * const Down = 1;
 * const Left = 2;
 * const Right = 3;
 */
// using enum we can do this in a better way

enum Direction {
    Up,    // 0
    Down,  // 1
    Left,  // 2
    Right  // 3
}

// by default ts assigns 0,1,2,3 so on..

let userDirection: Direction = Direction.Up;
// enums are just like interface but for constants
console.log(`User direction: ${userDirection}`); // Output: 0
console.log(`Direction name: ${Direction[userDirection]}`); // Output: Up

// You can also manually assign values to enum members.
enum StatusCode {
    Success = 200,
    NotFound = 404,
    InternalServerError = 500
}

let responseStatus: StatusCode = StatusCode.Success;
console.log(`Response status code: ${responseStatus}`); // Output: 200
console.log(`Status name: ${StatusCode[responseStatus]}`); // Output: Success

// Enums can be mixed with auto-incrementing and manual assignments.
enum GameState {
    Loading,       // 0
    Playing = 10,  // 10
    Paused,        // 11 (auto-increments from 10)
    GameOver       // 12
}

console.log(`Game state: ${GameState.Loading}`);    // Output: 0
console.log(`Game state: ${GameState.Playing}`);    // Output: 10
console.log(`Game state: ${GameState.Paused}`);     // Output: 11
console.log(`Game state: ${GameState.GameOver}`);   // Output: 12

// --------------------------------------------------
// 2. String Enums
// --------------------------------------------------

// String enums are similar to numeric enums, but their values are initialized with string literals.
// This can provide better readability at runtime, as the values are more descriptive.

enum Color {
    Red = "RED",
    Green = "GREEN",
    Blue = "BLUE"
}

let favoriteColor: Color = Color.Green;
console.log(`Favorite color: ${favoriteColor}`); // Output: GREEN