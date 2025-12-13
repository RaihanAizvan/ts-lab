//
// --------------------------------------------------
// TYPE GUARDS (BEGINNER TO INTERMEDIATE)
// --------------------------------------------------
// A type guard is a simple check that makes a type more specific.
// After the check, TypeScript knows the exact type, so your code is safer.
// We will use: typeof, instanceof, the "in" operator, and custom guards.
// Keep it simple.
// --------------------------------------------------

// --------------------------------------------------
// 1) typeof for primitives
// --------------------------------------------------

function toUpper(value: string | number): string {
  if (typeof value === "string") {
    // inside here, value is string
    return value.toUpperCase();
  }
  // here, value is number
  return String(value);
}

console.log(toUpper("hello"));
console.log(toUpper(42));

// --------------------------------------------------
// 2) instanceof for classes
// --------------------------------------------------

class Person {
  constructor(public name: string) {}
}

class Animal {
  constructor(public kind: string) {}
}

function describe(x: Person | Animal) {
  if (x instanceof Person) {
    // here x is Person
    console.log("person:", x.name);
  } else {
    // here x is Animal
    console.log("animal:", x.kind);
  }
}

describe(new Person("Alice"));

describe(new Animal("dog"));

// --------------------------------------------------
// 3) The "in" operator for object shapes
// --------------------------------------------------

interface Dog {
  kind: "dog";
  bark(): void;
}

interface Cat {
  kind: "cat";
  meow(): void;
}

type Pet = Dog | Cat;

function speak(p: Pet) {
  if ("bark" in p) {
    p.bark();
  } else {
    p.meow();
  }
}

speak({ kind: "dog", bark: () => console.log("woof") });

speak({ kind: "cat", meow: () => console.log("meow") });

// --------------------------------------------------
// 4) Discriminated unions with a switch
// --------------------------------------------------
// Add a literal field that marks the type. Then switch on it.

interface Load {
  status: "loading";
}

interface Ok<T> {
  status: "ok";
  data: T;
}

interface Fail {
  status: "fail";
  error: string;
}

type Result<T> = Load | Ok<T> | Fail;

function handle<T>(r: Result<T>) {
  switch (r.status) {
    case "loading":
      console.log("loading");
      break;
    case "ok":
      console.log("ok:", r.data);
      break;
    case "fail":
      console.log("fail:", r.error);
      break;
    default: {
      const _never: never = r; // helps catch new cases later
      return _never;
    }
  }
}

handle<string>({ status: "loading" });
handle<string>({ status: "ok", data: "done" });
handle<string>({ status: "fail", error: "no" });


// --------------------------------------------------
//  Common mistakes (short)
// --------------------------------------------------
// - doing work without narrowing first. Narrow early.
// - using "as any" to skip checks. Avoid that. It hides bugs.
// - forgetting that optional fields are possibly undefined. Check them.
// - Missing a case in a switch. Use a default with never.
//
// That is enough to use type guards well. Keep checks small and clear.
