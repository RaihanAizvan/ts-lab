//

// UTILITY TYPES

// TypeScript provides several utility types that make common type transformations
// easier. These are built-in generic types that help you manipulate other types.
// They are powerful tools for creating new types based on existing ones,
// promoting code reuse and type safety.

// --------------------------------------------------
// 1. Partial<Type>
// --------------------------------------------------
// Constructs a type with all properties of Type set to optional.
// This utility will return a type that represents all subsets of a given type.

interface UserProfile {
  id: number;
  name: string;
  email: string;
  age: number;
}

// PartialUserProfile makes all properties of UserProfile optional
type PartialUserProfile = Partial<UserProfile>;

const userUpdate: PartialUserProfile = {
  name: "Alice Smith",
  age: 31,
};

console.log("Partial User Update:", userUpdate);

// --------------------------------------------------
// 2. Required<Type>
// --------------------------------------------------
// Constructs a type consisting of all properties of Type set to required.
// The opposite of Partial.

interface Car {
  make?: string;
  model?: string;
  year?: number;
}

// RequiredCar makes all properties of Car mandatory
type RequiredCar = Required<Car>;

const myCar: RequiredCar = {
  make: "Toyota",
  model: "Camry",
  year: 2020,
};

console.log("Required Car:", myCar);

// --------------------------------------------------
// 3. Readonly<Type>
// --------------------------------------------------
// Constructs a type with all properties of Type set to readonly.
// This means the properties of the constructed type cannot be reassigned.

interface Todo {
  title: string;
  description: string;
}

// ReadonlyTodo makes all properties of Todo readonly
type ReadonlyTodo = Readonly<Todo>;

const todoItem: ReadonlyTodo = {
  title: "Learn TypeScript",
  description: "Master utility types",
};

// todoItem.title = "Finish project"; // Error: Cannot assign to 'title' because it is a read-only property.
console.log("Readonly Todo:", todoItem);

// --------------------------------------------------
// 4. Record<Keys, Type>
// --------------------------------------------------
// Constructs an object type whose property keys are Keys and whose property values are Type.
// This utility can be used to map the properties of a type to another type.

type Page = "home" | "about" | "contact";

interface PageInfo {
  title: string;
  url: string;
}

// NavPages creates an object where keys are Page literals and values are PageInfo objects
const navPages: Record<Page, PageInfo> = {
  home: { title: "Home Page", url: "/" },
  about: { title: "About Us", url: "/about" },
  contact: { title: "Contact Us", url: "/contact" },
};

console.log("Nav Pages:", navPages.home.title);

// --------------------------------------------------
// 5. Pick<Type, Keys>
// --------------------------------------------------
// Constructs a type by picking the set of properties Keys from Type.

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
}

// ProductSummary picks 'id', 'name', and 'price' from Product
type ProductSummary = Pick<Product, "id" | "name" | "price">;

const summary: ProductSummary = {
  id: 101,
  name: "Wireless Mouse",
  price: 25.99,
};

console.log("Product Summary:", summary);

// --------------------------------------------------
// 6. Omit<Type, Keys>
// --------------------------------------------------
// Constructs a type by omitting the set of properties Keys from Type.
// The opposite of Pick.

// ProductDetails omits 'id' and 'category' from Product
type ProductDetails = Omit<Product, "id" | "category">;

const details: ProductDetails = {
  name: "Mechanical Keyboard",
  price: 120.00,
  description: "High-performance mechanical keyboard with RGB lighting.",
};

console.log("Product Details:", details);

// --------------------------------------------------
// 7. Exclude
// <Type, ExcludedUnion>
// --------------------------------------------------
// Constructs a type by excluding from Type all union members that are assignable to ExcludedUnion.

type EventType = "click" | "hover" | "submit" | "change";

// InteractiveEvent excludes 'submit' and 'change' from EventType
type InteractiveEvent = Exclude<EventType, "submit" | "change">;

const userAction: InteractiveEvent = "click";
// const adminAction: InteractiveEvent = "submit"; // Error: Type '"submit"' is not assignable to type '"click" | "hover"'.

console.log("Interactive Event:", userAction);

// --------------------------------------------------
// 8. Extract<Type, Union>
// --------------------------------------------------
// Constructs a type by extracting from Type all union members that are assignable to Union.
// The opposite of Exclude.

type AllColors = "red" | "green" | "blue" | "yellow" | "orange";

// PrimaryColors extracts 'red', 'green', 'blue' from AllColors
type PrimaryColors = Extract<AllColors, "red" | "green" | "blue">;

const myColor: PrimaryColors = "blue";
// const secondaryColor: PrimaryColors = "yellow"; // Error: Type '"yellow"' is not assignable to type '"red" | "green" | "blue"'.

console.log("Primary Color:", myColor);


// Avanced:
// --------------------------------------------------
// 9. NonNullable<Type>
// --------------------------------------------------
// Constructs a type by excluding null and undefined from Type.

type NullableString = string | null | undefined;

// NonNullableString removes null and undefined
type NonNullableString = NonNullable<NullableString>;

const definiteString: NonNullableString = "hello";
// const maybeString: NonNullableString = null; // Error: Type 'null' is not assignable to type 'string'.

console.log("Non-nullable String:", definiteString);

// --------------------------------------------------
// 10. Parameters<Type>
// --------------------------------------------------
// Constructs a tuple type from the types of a function's parameters.

function createUser(name: string, age: number, isActive: boolean) {
  // ...
}

// CreateUserParams is
type CreateUserParams = Parameters<typeof createUser>;

const userArgs: CreateUserParams = ["John Doe", 30, true];
console.log("Create User Parameters:", userArgs);

// --------------------------------------------------
// 11. ReturnType<Type>
// --------------------------------------------------
// Constructs a type consisting of the return type of function Type.

function getProductDetails(id: number) {
  return { id: id, name: "Sample Product", price: 99.99 };
}

// ProductDetailsReturnType is the type of the object returned by getProductDetails
type ProductDetailsReturnType = ReturnType<typeof getProductDetails>;

const productResult: ProductDetailsReturnType = getProductDetails(1);
console.log("Product Details Return Type:", productResult);

// --------------------------------------------------
// 12. InstanceType<Type>
// --------------------------------------------------
// Constructs a type consisting of the instance type of a constructor function in Type.

class MyClass {
  constructor(public value: number) {}

  greet() {
    console.log(`Hello from MyClass with value ${this.value}`);
  }
}

// MyClassInstanceType is the type of an instance of MyClass
type MyClassInstanceType = InstanceType<typeof MyClass>;

const myInstance: MyClassInstanceType = new MyClass(100);
myInstance.greet();

// --------------------------------------------------
// 13. Awaited<Type> (TypeScript 4.5+)
// --------------------------------------------------
// This type is intended to model the type of operations like `await` in `async` functions,
// or the `.then()` method on a Promise. Specifically, it recursively unwraps `Promise`s.

type PromiseString = Promise<string>;
type PromiseNumber = Promise<Promise<number>>;
type PromiseBoolean = Promise<boolean | Promise<number>>;

type AwaitedString = Awaited<PromiseString>; // string
type AwaitedNumber = Awaited<PromiseNumber>; // number
type AwaitedBooleanOrNumber = Awaited<PromiseBoolean>; // boolean | number

async function fetchData(): Promise<string> {
  return "Data fetched!";
}

type FetchDataReturnType = Awaited<ReturnType<typeof fetchData>>;const data: FetchDataReturnType = await fetchData();
console.log("Awaited Data:", data);

// Conclusion
// Utility types are incredibly useful for creating flexible and robust type definitions.
// They help you avoid duplicating type definitions and make your code more maintainable
// and less error-prone. Understanding and utilizing these types is a key part of
// mastering advanced TypeScript.

// --------------------------------------------------