console.log("Hello, TypeScript!");

// this is a simple TypeScript program that prints "Hello, TypeScript!" to the console.
// To run this file, open your terminal in the current directory and run the following commands:
// 1. Compile the TypeScript file: `tsc index.ts`
    // now you will have a new file named index.js
// 2. Run the compiled JavaScript file: `node index.js`
// You should see the output: Hello, TypeScript!

// what just happened?
// TypeScript code cannot be run directly by browsers or Node.js
// it needs to be transpiled (converted) to JavaScript first
// This is done using the TypeScript compiler (tsc)
// The resulting JavaScript file can then be executed in any JavaScript environment

 // this is same as c, c++, java etc where we need to compile the code before running it

 // in projects, we usually have a tsconfig.json file to configure the TypeScript compiler options
 // tsconfig.json file allows us to specify various settings like target JavaScript version, module system, strictness options, etc.
//  when we do projects, we write .ts files and didnt have to compile each file manually
    // instead we just run `tsc` command in the terminal and it will look for tsconfig.json file and compile all the .ts files according to the configuration
    // the compiled files are usually placed in a separate directory like 'dist' or 'build'
    // when we push the code to github, we usually ignore the compiled .js files using .gitignore
    // but in production, we deploy the compiled .js files to the server or hosting platform not the .ts files
 // but for this simple example, we are using default settings
