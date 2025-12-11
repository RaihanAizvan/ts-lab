//
// --------------------------------------------------
// INTERFACES
// --------------------------------------------------
//  interface tells the shape of an object.
//  lists the fields and their types.
//  helps the editor help you. It also catches mistakes early.
// We will keep this simple and clear.
// yes you guessed that right these are same as types but same same but differet.
// ill tell you after some time
// --------------------------------------------------

// --------------------------------------------------
// 1) Basic interface
// --------------------------------------------------
// We say what a User must have. Here: id is a number, name is a string.
// If you leave one out, TypeScript will warn you.

interface User {
  id: number;
  name: string;
  greet(name: string): void;
}

// This matches the interface. So it is fine.
const u1: User = {
  id: 1,
  name: "gandhiji",
  greet(firstname) {
    console.log("hello ", firstname);
  },
};
console.log("user:", u1.id, u1.name);
u1.greet(u1.name)

// If you do this, it will fail:
// const badUser: User = { id: 2 }; // name is missing -> error

// --------------------------------------------------
// 2) Optional and readonly
// --------------------------------------------------

// we already seen it in the types. same here
// Optional means the field may be missing.
// Readonly means you cannot change that field after you set it.

interface Product {
  readonly sku: string; // cannot change later
  title: string; // can change later
  price?: number; // may be missing
  calculatePrice?(): number | undefined; // we can define functions like this also
}

const p1: Product = {
  sku: "SKU-1",
  title: "Book",
  calculatePrice() {
    return this.price;
  },
};
// p1.sku = "X"; // not allowed, sku is readonly
p1.title = "Book Second Edition"; // ok, title is not readonly
console.log("product:", p1.sku, p1.title, p1.price);

// When you read an optional field, the type is value | undefined.
function formatPrice(p: Product) {
  // If price is missing, we show "N/A".
  const priceText = p.price !== undefined ? `$${p.price}` : "N/A";
  console.log("price:", priceText);
}
formatPrice(p1);

// --------------------------------------------------
// 3) Methods on interfaces
// --------------------------------------------------
// An interface can include functions. They are called methods.
// You can also make a method optional.

interface Logger {
  log(message: string): void;
  warn?(message: string): void; // may be missing
}

const consoleLogger: Logger = {
  log(msg) {
    console.log("LOG:", msg);
  },
  warn(msg) {
    console.warn("WARN:", msg);
  },
};

consoleLogger.log("hello");
// If warn exists, call it. If not, skip it.
consoleLogger.warn?.("be careful");

// --------------------------------------------------
// 4) Function type interface
// --------------------------------------------------
// An interface can also describe a function type.
// The interface says: take two numbers, return a number.

interface Adder {
  (a: number, b: number): number;
}

const add: Adder = (x, y) => x + y;
console.log("add:", add(2, 3));

// If you pass wrong types, you get an error:
// const badAdd: Adder = (x: string, y: string) => 0; // error

// --------------------------------------------------
// 5) Index signatures
// --------------------------------------------------
// Use this when you do not know all keys up front.
// But you know the type of the values.

interface StringMap {
  [key: string]: string; // any string key. value must be string.
}

const headers: StringMap = {
  Accept: "application/json",
  Authorization: "Bearer token",
};
console.log("headers Accept:", headers["Accept"]);

// You can also index by number. This looks like an array.
interface NumberList {
  [i: number]: number;
}

const nums: NumberList = [10, 20, 30];
console.log("nums[1]:", nums[1]);




// --------------------------------------------------
// 6) Extending interfaces
// --------------------------------------------------
// One interface can build on another. This avoids repeat code.
// this is same as class , if you know class it will be good

interface BaseItem {
  id: string;
}

interface TodoItem extends BaseItem {
  title: string;
  done: boolean;
}

const t1: TodoItem = { id: "t1", title: "learn TS", done: false };
console.log("todo:", t1.id, t1.title, t1.done);

// You can extend many interfaces too.
interface TimeStamped {
  createdAt: Date;
}

interface Labeled {
  label: string;
}

interface Note extends TimeStamped, Labeled {
  body: string;
}

const n1: Note = {
  label: "work",
  body: "write docs",
  createdAt: new Date(),
};
console.log("note:", n1.label, n1.createdAt.toISOString());

// --------------------------------------------------
// 7) Interface vs type (short and honest)
// --------------------------------------------------
// Both can describe object shapes.
// Interface can extend and can merge with the same name.
// Type can do unions and other advanced types.
// Use either. Pick one style as a team and be consistent.
// can able to do declaration merging in interface, but in type its not

// --------------------------------------------------
// 8) Declaration merging
// --------------------------------------------------
// Two interfaces with the same name merge into one.
// This is not true for type aliases.

interface Box {
  height: number;
}

// This adds width to Box.
interface Box {
  width: number;
}

const b: Box = { height: 10, width: 20 };
console.log("box:", b.height, b.width);

// --------------------------------------------------
// 9) Classes implement interfaces
// --------------------------------------------------
// A class can promise that it matches an interface.

interface Store {
  get(id: string): string | undefined;
  set(id: string, value: string): void;
}

//what is implements?
// just think nof implements are annotation for class
// "implements" means that the class "MemoryStore" promises to fulfill all the requirements of the "Store" interface.
// implement basically means we are
// This means it must have a 'get' method that takes a string and returns a string or undefined,
// and a 'set' method that takes two strings and returns void.


class MemoryStore implements Store {
  // this private is a acccess modifier, we will come to that later
  private data: Record<string, string> = {};

  get(id: string) {
    // If not found, this returns undefined. That is fine.
    return this.data[id];
  }

  set(id: string, value: string) {
    this.data[id] = value;
  }
}

const store = new MemoryStore();
store.set("k1", "v1");
console.log("store.get:", store.get("k1"));

// --------------------------------------------------
// Common mistakes (quick list)
// --------------------------------------------------
// - Forgetting a required field. Fix by adding it.
// - Trying to change a readonly field. Do not do that.
// - Using the wrong type for a field. Change the type or the value.
// - Calling an optional method without checking. Use ?. to be safe.
//
// That is enough to start. Keep interfaces short. Add only what you need.
