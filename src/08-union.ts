//
// --------------------------------------------------
// UNION TYPES — the messy freedom that still cares
// --------------------------------------------------
// You don’t always get the luxury of clean data. Sometimes a value is this or that.
// Not ideal. Not pure. But real. Unions let you face that reality without
// pretending everything fits one box.
//
// Write with the grain of the thing. Admit the ambiguity. Then narrow it.
// --------------------------------------------------

// --------------------------------------------------
// 1) The simplest union: it’s one thing or it’s the other
// --------------------------------------------------

let value: string | number;
value = "42"; // fine
value = 42;   // also fine
// value = true; //  not in the union

// You don’t get to use string-specific stuff until you prove it’s a string.
function stringLength(v: string | number): number {
  if (typeof v === "string") {
    return v.length;
  }
  // here v is a number, try it with ctrl+space you can see the intellisene
  return v.toString().length;
}

console.log("stringLength('hello') =", stringLength("hello"));
console.log("stringLength(12345) =", stringLength(12345));

// --------------------------------------------------
// 2) Narrowing: earn your certainty
// --------------------------------------------------
// Narrowing is the art of telling TypeScript: "I did the work, it’s safe now."

function printId(id: string | number | null | undefined) {
  if (id == null) {
    console.log("no id — and that’s the truth");
    return;
  }

  if (typeof id === "string") {
    console.log("id (string):", id.toUpperCase());
  } else {
    console.log("id (number):", id.toFixed(0));
  }
}

printId(undefined);
printId("abc");
printId(99.2);

// --------------------------------------------------
// 3) Property-based narrowing: the quiet little 'in' operator
// --------------------------------------------------

 type Dog = { kind: "dog"; bark: () => void };
 type Cat = { kind: "cat"; meow: () => void };
 type Pet = Dog | Cat;

function talk(pet: Pet) {
  if ("bark" in pet) {
    pet.bark();
  } else {
    pet.meow();
  }
}

const d: Dog = { kind: "dog", bark: () => console.log("woof") };
const c: Cat = { kind: "cat", meow: () => console.log("meow") };

talk(d);

talk(c);

// --------------------------------------------------
// 4) Discriminated unions: one field to rule the chaos
// --------------------------------------------------
// The pattern is simple: give each variant a literal tag (like kind: "dog" | "cat").
// Then switch on it. Let the compiler watch your back.

 type Loading = { status: "loading" };
 type Success<T> = { status: "success"; data: T };
 type Failure = { status: "failure"; error: string };

 type Result<T> = Loading | Success<T> | Failure;

function handleResult<T>(r: Result<T>): void {
  switch (r.status) {
    case "loading":
      console.log("…waiting. breathe.");
      break;
    case "success":
      console.log("got it:", r.data);
      break;
    case "failure":
      console.error("it broke:", r.error);
      break;
    default: {
      // Exhaustive check: if we add a new status and forget to handle it,
      // this explodes at compile time (good).
      const _never: never = r;
      return _never;
    }
  }
}

handleResult<string>({ status: "loading" });
handleResult<string>({ status: "success", data: "done" });
handleResult<string>({ status: "failure", error: "nope" });

// --------------------------------------------------
// 5) Unions in function parameters — don’t get cute, get clear
// --------------------------------------------------
// The point isn’t to be clever. It’s to be honest about what’s allowed.

 type Point2D = { x: number; y: number };
 type Polar = { r: number; theta: number };
 type Coord = Point2D | Polar;

function magnitude(c: Coord): number {
  if ("x" in c) {
    return Math.hypot(c.x, c.y);
  } else {
    return Math.abs(c.r); // distance is radius in polar
  }
}

console.log("magnitude({x:3,y:4}) =", magnitude({ x: 3, y: 4 }));
console.log("magnitude({r:5,theta:1}) =", magnitude({ r: 5, theta: 1 }));

// --------------------------------------------------
// 6) Literal unions — small words, big boundaries
// --------------------------------------------------
// Buttons, switches, traffic lights. The world is enums in disguise.

 type Theme = "light" | "dark" | "system";

function setTheme(t: Theme) {
  // save it, ship it, whatever
  console.log(`theme -> ${t}`);
}

setTheme("dark");
// setTheme("neon"); //  not allowed, and that’s the point

// --------------------------------------------------
// 7) Arrays of unions vs union of arrays — not the same song
// --------------------------------------------------

// Array of unions: each element can be either
const mixed: (number | string)[] = [1, "two", 3, "four"];

// Union of arrays: the whole thing is either all numbers OR all strings
let oneOrTheOther: number[] | string[];
oneOrTheOther = [1, 2, 3];
oneOrTheOther = ["a", "b"]; // both fine
// oneOrTheOther = [1, "b"]; //! nope, pick a lane

// --------------------------------------------------
// 8) Optional vs union-with-undefined — know your intent
// --------------------------------------------------
// Optional is nice, but say the quiet part out loud: absence is part of the type.

function lookup(key: string): string | undefined {
  // pretend it might not be there
  return Math.random() > 0.5 ? "found" : undefined;
}

const hit = lookup("k");
console.log("lookup =>", hit ?? "<missing>");

// --------------------------------------------------
// 9) When APIs lie — unions can tell the whole story
// --------------------------------------------------
// Data comes back flaky. Don’t sanitize the truth. Model it.

 type ApiUser = {
  id: number;
  name: string | null; // yeah, sometimes it’s null, because of course it is
  email: string | null;
};

function formatUser(u: ApiUser): string {
  const name = u.name ?? "<no name>";
  const email = u.email ?? "<no email>";
  return `${u.id}: ${name} <${email}>`;
}

console.log(
  formatUser({ id: 1, name: "Alice", email: null })
);

// --------------------------------------------------
// 10) Exhaustive switches — make the compiler your editor-in-chief
// --------------------------------------------------

 type ShapeCircle = { kind: "circle"; radius: number };
 type ShapeRect = { kind: "rect"; width: number; height: number };
 type Shape = ShapeCircle | ShapeRect;

function area(s: Shape): number {
  switch (s.kind) {
    case "circle":
      return Math.PI * s.radius ** 2;
    case "rect":
      return s.width * s.height;
    default: {
      const _exhaustive: never = s; // if a new kind shows up, we feel it
      return _exhaustive;
    }
  }
}

console.log("area(circle 2) =", area({ kind: "circle", radius: 2 }));
console.log("area(rect 3x4) =", area({ kind: "rect", width: 3, height: 4 }));

// --------------------------------------------------
// 11) Pitfalls — where unions bite back
// --------------------------------------------------
// - Don’t assume shared properties exist (narrow first).
// - Avoid massive unions as a dumping ground; prefer discriminators.
// - If you find yourself casting (as any) a lot, step back. You might be lying.
// - Narrow early, return early. Keep the happy path clean.
// --------------------------------------------------
