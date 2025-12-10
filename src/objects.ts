//
// --------------------------------------------------
// OBJECTS
// --------------------------------------------------

// In TypeScript, objects are fundamental for structuring data.
// You can define the shape of an object using type annotations,
// ensuring that objects conform to a specific structure.


// mahn in other side this is a big headache, because even for a temporary obj, we need to define anotation, define types for everything. 

// --------------------------------------------------
// 1. Basic Object Type Annotation
// --------------------------------------------------

// You can define an object's structure inline.
let person: {
    name: string;
    age: number;
    isStudent: boolean;
    greet: () => void;
} = {
    name: "Alice",
    age: 30,
    isStudent: false,
    greet: function () {
        console.log(`Hello, my name is ${this.name}!`);
    }
};

console.log(`Person: ${person.name}, Age: ${person.age}, Student: ${person.isStudent}`);
person.greet()

// Attempting to assign an object that doesn't match the type will result in an error.
// person = { name: "Bob", age: 25 }; // Error: Property 'isStudent' is missing.

// --------------------------------------------------
// 2. Type Aliases for Objects
// --------------------------------------------------

// For more complex objects or when reusing object types,
// it's better to use type aliases.

type User = {
    id: number;
    username: string;
    email: string;
    isActive?: boolean; // Optional property
};

let user1: User = {
    id: 1,
    username: "john_doe",
    email: "john@example.com",
    isActive: true,
};

let user2: User = {
    id: 2,
    username: "jane_smith",
    email: "jane@example.com",
}; // isActive is optional, so it's fine.

console.log(`User 1: ${user1.username}, Email: ${user1.email}, Active: ${user1.isActive}`);
console.log(`User 2: ${user2.username}, Email: ${user2.email}, Active: ${user2.isActive}`); // undefined

// --------------------------------------------------
// 3. Readonly Properties
// --------------------------------------------------

// You can mark properties as `readonly` to prevent them from being modified
// after the object is created.

type Product = {
    readonly id: string ;
    name: string;
    price: number;
};

let product1: Product = {
    id: "prod-123",
    name: "Laptop",
    price: 1200,
};

// product1.id = "new-id"; // Error: Cannot assign to 'id' because it is a read-only property.
product1.name = "Gaming Laptop"; // This is allowed
console.log(`Product: ${product1.name}, Price: $${product1.price}`);

// --------------------------------------------------
// 4. Index Signatures
// --------------------------------------------------

// Index signatures allow you to define the type for properties
// whose names you don't know in advance, but you know their value types.
// This is useful for dictionary-like objects.

type StringDictionary = {
    [key: string]: string;
};

let userSettings: StringDictionary = {
    theme: "dark",
    language: "en-US",
    fontSize: "16px",
};

console.log(`Theme: ${userSettings.theme}, Language: ${userSettings.language}`);

// You can also define index signatures for numbers.
type NumberArrayLike = {
    [index: number]: string;
};

let newObj: NumberArrayLike = {
    0: "first",
    1: "second",
    2: "third",
};
console.log(`First element: ${newObj[0]} - from obj`);

let myStringArray: NumberArrayLike = ["first", "second", "third"];
console.log(`First element: ${myStringArray[0]}`);

// --------------------------------------------------
// 5. Nested Objects
// --------------------------------------------------

// Objects can contain other objects, allowing for complex data structures.

type Address = {
    street: string;
    city: string;
    zipCode: string;
};

type Customer = {
    id: number;
    name: string;
    address: Address; // Nested object
};

let customer1: Customer = {
    id: 101,
    name: "Alice Wonderland",
    address: {
        street: "123 Rabbit Hole",
        city: "Wonderland",
        zipCode: "90210",
    },
};

console.log(`Customer: ${customer1.name}, City: ${customer1.address.city}`);

