//
// --------------------------------------------------
// OPTIONAL CHAINING
// --------------------------------------------------

// yessssss youguess it right, the same optionl chaining from js, still what if somebody dont know this???

// Optional chaining (`?.`) is a feature introduced in TypeScript 3.7 (and ES2020)
// that allows you to safely access properties and call methods on objects
// that might be `null` or `undefined`. It short-circuits the expression
// if an encountered reference is `null` or `undefined`, returning `undefined`
// instead of throwing an error.

// This helps to avoid repetitive null checks and makes code cleaner.

// --------------------------------------------------
// 1. Accessing Object Properties
// --------------------------------------------------

type UserProfile = {
    id: number;
    name: string;
    address?: {
        street: string;
        city: string;
        zipCode?: string;
    };
    contact?: {
        email: string;
        phone?: string;
    };
};

let user1: UserProfile = {
    id: 1,
    name: "Alice",
    address: {
        street: "123 Main St",
        city: "Anytown",
        zipCode: "12345"
    }
};

let user2: UserProfile = {
    id: 2,
    name: "Bob",
    contact: {
        email: "bob@example.com"
    }
};

let user3: UserProfile = {
    id: 3,
    name: "Charlie"
};

// Without optional chaining, you'd need multiple checks:
// let user1ZipCode = user1.address && user1.address.zipCode;

// With optional chaining:
let user1ZipCode = user1.address?.zipCode;
console.log(`User 1 Zip Code: ${user1ZipCode}`); // Output: 12345

let user2ZipCode = user2.address?.zipCode;
console.log(`User 2 Zip Code: ${user2ZipCode}`); // Output: undefined (because address is undefined)

let user3ZipCode = user3.address?.zipCode;
console.log(`User 3 Zip Code: ${user3ZipCode}`); // Output: undefined (because address is undefined)

let user1ContactEmail = user1.contact?.email;
console.log(`User 1 Contact Email: ${user1ContactEmail}`); // Output: undefined

let user2ContactEmail = user2.contact?.email;
console.log(`User 2 Contact Email: ${user2ContactEmail}`); // Output: bob@example.com

let user2ContactPhone = user2.contact?.phone;
console.log(`User 2 Contact Phone: ${user2ContactPhone}`); // Output: undefined

// --------------------------------------------------
// 2. Calling Methods
// --------------------------------------------------

type Logger = {
    log?: (message: string) => void;
    warn: (message: string) => void;
};

let consoleLogger: Logger = {
    log: (msg) => console.log(`LOG: ${msg}`),
    warn: (msg) => console.warn(`WARN: ${msg}`)
};

let simpleLogger: Logger = {
    warn: (msg) => console.warn(`SIMPLE WARN: ${msg}`)
};

// Call a method that might not exist
consoleLogger.log?.("This is a log message."); // Calls log method
simpleLogger.log?.("This log message will not appear."); // Does nothing, returns undefined

consoleLogger.warn("This is a warning.");
simpleLogger.warn("This is a simple warning.");

// --------------------------------------------------
// 3. Accessing Array Elements
// --------------------------------------------------

type ItemList = {
    items?: string[];
};

let list1: ItemList = {
    items: ["apple", "banana"]
};

let list2: ItemList = {}; // items is undefined

let firstItem1 = list1.items?.[0];
console.log(`First item in list 1: ${firstItem1}`); // Output: apple

let firstItem2 = list2.items?.[0];
console.log(`First item in list 2: ${firstItem2}`); // Output: undefined

// --------------------------------------------------
// 4. Combining with Nullish Coalescing (??)
// --------------------------------------------------

// Optional chaining can be combined with the nullish coalescing operator (??)
// to provide a default value when the optional chain results in `null` or `undefined`.

let user4: UserProfile = {
    id: 4,
    name: "achu",
    address: {
        street: "456 Oak Ave",
        city: "Kazhakootam"
        // zipCode is missing/undefined
    }
};

let user4ZipCode = user4.address?.zipCode ?? "N/A";
console.log(`User 4 Zip Code: ${user4ZipCode}`); // Output: N/A (because user4.address.zipCode is undefined)

let user5: UserProfile = {
    id: 5,
    name: "vaisak"
    // address is missing/undefined
};

let user5ZipCode = user5.address?.zipCode ?? "Unknown";
console.log(`User 5 Zip Code: ${user5ZipCode}`); // Output: Unknown (because user5.address is undefined)

// --------------------------------------------------
// 5. Practical Example: Displaying User Info
// --------------------------------------------------

function displayUserInfo(user: UserProfile): void {
    const street = user.address?.street ?? "No Street Info";
    const city = user.address?.city ?? "No City Info";
    const zip = user.address?.zipCode ?? "No Zip Code";
    const email = user.contact?.email ?? "No Email";
    const phone = user.contact?.phone ?? "No Phone";

    console.log(`\n--- User: ${user.name} ---`);
    console.log(`ID: ${user.id}`);
    console.log(`Address: ${street}, ${city}, ${zip}`);
    console.log(`Contact: Email: ${email}, Phone: ${phone}`);
}

displayUserInfo(user1);
displayUserInfo(user2);
displayUserInfo(user3);
displayUserInfo(user4);
displayUserInfo(user5);

// --------------------------------------------------