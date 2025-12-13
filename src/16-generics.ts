//
// --------------------------------------------------
// GENERICS 
// --------------------------------------------------
// Generics let you write code that works with many types, but it locks its type
// You add a type variable, like <T>, and use it inside your function, interface,
// or class. The caller picks the actual type, or TypeScript can infer it.
// Keep it simple and clear.


// simple tip: think of it like parameters but for types
// --------------------------------------------------

// --------------------------------------------------
// 1) Generic function (identity)
// --------------------------------------------------
// This function returns what you pass in. The type is kept.

function identity<T>(value: T): T {
  return value;
}

// here we need to say which type it is like this systax. 
// for single types ts will infer. 
// but for interface and type alisases, 
// we need to tell them 

const a = identity<number>(42);   // T is number
const b = identity("hello");       // T is string (inferred)

console.log(a, b.toUpperCase());

// --------------------------------------------------
// 2) Generic function with arrays
// --------------------------------------------------
// We can map over an array and keep types safe.

function first<T>(items: T[]): T | undefined {
  return items[0];
}

console.log("first([10,20]) =", first([10, 20]));
console.log("first(['a','b']) =", first(["a", "b"]));

// --------------------------------------------------
// 3) Generic constraints (extends)
// --------------------------------------------------
// Sometimes T must have a certain shape. Use extends to say that.

interface HasId {
  id: string | number;
}

function getId<T extends HasId>(item: T): string {
  return String(item.id);
}

console.log(getId({ id: 123, name: "Alice" }));
// getId({ name: "no-id" }); // error: id is missing



// You can also require fields for lookups.
function pluck<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: 1, name: "Bob", active: true };
const userName = pluck(user, "name"); // string
const userActive = pluck(user, "active"); // boolean
console.log("pluck name:", userName, "active:", userActive);



// --------------------------------------------------
// 4) Generic interfaces
// --------------------------------------------------
// You can make an interface generic, so it can hold different value types.

interface Box<T> {
  value: T;
}


const numBox: Box<number> = { value: 10 };
const strBox: Box<string> = { value: "hi" };
console.log("boxes:", numBox.value, strBox.value);

// Optional generic parameter can be used with defaults (see section 6).

// --------------------------------------------------
// 5) Generic classes
// --------------------------------------------------
// Classes can also use generics. This helps make storage or utils reusable.

class MemoryStore<T> {
  private data: T[] = [];

  add(item: T): void {
    this.data.push(item);
  }

  all(): T[] {
    return [...this.data];
  }
}

const numberStore = new MemoryStore<number>();
numberStore.add(1);
numberStore.add(2);
console.log("numberStore:", numberStore.all());

const userStore = new MemoryStore<{ id: number; name: string }>();
userStore.add({ id: 1, name: "Alice" });
console.log("userStore:", userStore.all());



// --------------------------------------------------
// 6) Default generic types
// --------------------------------------------------
// You can set a default so callers do not need to pass a type.

interface ApiResponse<T = unknown> {
  ok: boolean;
  data: T;
}

const resp1: ApiResponse = { ok: true, data: 123 }; // T is unknown
const resp2: ApiResponse<string> = { ok: true, data: "done" };
console.log("resp:", resp1.ok, resp2.data);

// --------------------------------------------------
// 7) When to use generics (short note)
// --------------------------------------------------
// Use generics when:
// - You want to reuse logic for many types
// - You want strong types without repeating code
// - You need to keep a connection between input and output types
// If you only need a single fixed type, do not add <T>.

// End. Start simple: generic function, then interface, then class.
