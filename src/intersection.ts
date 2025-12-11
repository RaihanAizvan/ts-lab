//
// --------------------------------------------------
// INTERSECTION TYPES
// --------------------------------------------------

// Intersection types allow you to combine multiple types into one.
// This means that an object of an intersection type will have all the
// properties of all the combined types. It's like an "AND" operation
// for types.

// --------------------------------------------------
// 1. Basic Intersection
// --------------------------------------------------

type Draggable = {
    drag: () => void;
};

type Resizable = {
    resize: () => void;
};

// An UIElement must have both drag and resize methods.
type UIElement = Draggable & Resizable;

let uiWidget: UIElement = {
    drag: () => console.log("Dragging UI element"),
    resize: () => console.log("Resizing UI element"),
};

uiWidget.drag();
uiWidget.resize();

// --------------------------------------------------
// 2. Combining Object Types
// --------------------------------------------------

type PersonInfo = {
    name: string;
    age: number;
};

type EmployeeInfo = {
    employeeId: string;
    department: string;
};

// An Employee will have properties from both PersonInfo and EmployeeInfo.
type Employee = PersonInfo & EmployeeInfo;

let employee1: Employee = {
    name: "John Doe",
    age: 30,
    employeeId: "EMP001",
    department: "Sales",
};

console.log(`Employee: ${employee1.name}, ID: ${employee1.employeeId}, Dept: ${employee1.department}`);

// --------------------------------------------------
// 3. Handling Property Conflicts
// --------------------------------------------------

// If two types in an intersection have properties with the same name
// but different types, the resulting type for that property will be `never`.
// This effectively makes it impossible to create an object that satisfies the intersection.

type ConflictA = {
    value: string;
};

type ConflictB = {
    value: number;
};

// type ConflictingType = ConflictA & ConflictB;
// let conflictObj: ConflictingType = {
//     value: "hello" // Error: Type 'string' is not assignable to type 'never'.
// };
// If the properties have the same name and compatible types (e.g., both are string),
// then the property type remains the same.
type CommonPropA = {
    id: number;
    description: string;
};

type CommonPropB = {
    id: number;
    description: string;
    status: string;
};

type CombinedProps = CommonPropA & CommonPropB;

let combinedItem: CombinedProps = {
    id: 1,
    description: "This is a combined item",
    status: "active"
};

console.log(`Combined Item: ${combinedItem.id}, ${combinedItem.description}, ${combinedItem.status}`);

// --------------------------------------------------
// 4. Intersection with Union Types
// --------------------------------------------------

// Intersection types can also be combined with union types.
// This can lead to complex but powerful type definitions.

type HasId = {
    id: number;
};

type HasName = {
    name: string;
};

type HasEmail = {
    email: string;
};

type ContactMethod = HasEmail | { phone: string }; // Union type

// A UserProfile must have an ID and a name, AND either an email or a phone.
type UserProfile = HasId & HasName & ContactMethod;

let userWithEmail: UserProfile = {
    id: 1,
    name: "Alice",
    email: "alice@example.com"
};

let userWithPhone: UserProfile = {
    id: 2,
    name: "Bob",
    phone: "123-456-7890"
};

// let invalidUser: UserProfile = {
//     id: 3,
//     name: "Charlie"
//     // Error: Property 'email' is missing in type '{ id: number; name: string; }'
//     // but required in type 'HasEmail'. OR Property 'phone' is missing...
// };

console.log(`User with Email: ${userWithEmail.name}, ${userWithEmail.email}`);
console.log(`User with Phone: ${userWithPhone.name}, ${userWithPhone.phone}`);

