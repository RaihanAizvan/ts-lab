//
// --------------------------------------------------
// NULLABLES (null, undefined) and Strict Null Checks
// --------------------------------------------------
//
// In JavaScript, a value can be absent for many reasons. TypeScript helps you
// model and safely handle absence using the types `null` and `undefined`.
// When the `strict` compiler option (or specifically `strictNullChecks`) is enabled,
// `null` and `undefined` are NOT assignable to other types unless you explicitly
// allow them via unions.
//
// --------------------------------------------------

// --------------------------------------------------
// 1) Basic null and undefined
// --------------------------------------------------

let maybeString: string | undefined; // may be undefined (uninitialized)
console.log("maybeString:", maybeString); // -> undefined

let maybeNumber: number | null = null; // explicitly null
console.log("maybeNumber:", maybeNumber); // -> null

// Error with strictNullChecks: can't assign null to a plain number
// let badNumber: number = null; //  Type 'null' is not assignable to type 'number'.

// Use a union if you want to allow absence
let okNumber: number | null = 42;
okNumber = null; // ✅ allowed because of the union

// --------------------------------------------------
// 2) Optional properties and parameters
// --------------------------------------------------

// Optional properties mean: the property may be missing entirely or present with a value.
// Type is effectively `T | undefined` when reading.

type Profile = {
  id: number;
  displayName?: string; // string | undefined when accessed
};

const p1: Profile = { id: 1, displayName: "Achu" };
const p2: Profile = { id: 2 }; // displayName is absent

function printDisplayName(profile: Profile): void {
  // Using nullish coalescing to provide a fallback if undefined
  const name = profile.displayName ?? "<no name>";
  console.log(`User#${profile.id} => ${name}`);
}

printDisplayName(p1); // Achu
printDisplayName(p2); // <no name>

// Optional parameters: same idea (parameter type becomes T | undefined)
function greet(name?: string): string {
  return `Hello ${name ?? "there"}!`;
}
console.log(greet());
console.log(greet("Alice"));

// --------------------------------------------------
// 3) Narrowing nullable values
// --------------------------------------------------

// With unions, you can safely narrow using equality checks, typeof, or truthiness

function lenOrZero(value: string | null | undefined): number {
  if (value == null) {
    // value is null or undefined
    return 0;
  }
  // Here value is narrowed to string
  return value.length;
}

console.log("lenOrZero(undefined)", lenOrZero(undefined)); // 0
console.log("lenOrZero(null)", lenOrZero(null)); // 0
console.log("lenOrZero('TS')", lenOrZero("TS")); // 2

// Another pattern: early return to keep main path non-null
function normalize(input: string | undefined): string {
  if (!input) return ""; // handles undefined and empty string (if you want only undefined, check `input === undefined`)
  return input.trim();
}

// --------------------------------------------------
// 4) Optional chaining (?.) and nullish coalescing (??)
// --------------------------------------------------
// See 11-optional-chaining.ts for a deeper dive. Quick recap:

type Company = {
  name: string;
  address?: {
    city?: string;
  };
};

const c1: Company = { name: "ACME", address: { city: "NYC" } };
const c2: Company = { name: "NoAddress Inc" };

const city1 = c1.address?.city ?? "Unknown"; // NYC
const city2 = c2.address?.city ?? "Unknown"; // Unknown
console.log({ city1, city2 });

// --------------------------------------------------
// 5) Non-null assertion operator (!) — use sparingly
// --------------------------------------------------
// The non-null assertion tells TS: "I know this isn’t null/undefined here".
// It removes null/undefined from the type at that point.
// Overusing this defeats the safety of TypeScript, so prefer real checks.

type Node = { id: string; parent?: Node | null };

const root: Node = { id: "root", parent: null };
const child: Node = { id: "child", parent: root };

function getParentId(n: Node): string | undefined {
  // Safe approach with optional chaining
  return n.parent?.id;
}

// Non-null assertion example (not recommended unless you’re certain):
function getParentIdUnsafe(n: Node): string {
  return n.parent!.id; // If parent is null/undefined at runtime -> crash
}

console.log("getParentId(child)", getParentId(child)); // 'root'
console.log("getParentId(root)", getParentId(root)); // undefined
// console.log(getParentIdUnsafe(root)); // would throw at runtime

// --------------------------------------------------
// 6) Definite assignment assertion (!)
// --------------------------------------------------
// When using class fields or let-bound variables that are assigned later,
// you can tell TS they will be definitely assigned before use.

class Config {
  // Without '!' this would error under `strictPropertyInitialization`
  private apiKey!: string;

  init(key: string) {
    this.apiKey = key;
  }

  use() {
    // We promise apiKey was initialized before use()
    console.log("Using key:", this.apiKey);
  }
}

const cfg = new Config();
cfg.init("secret-123");
cfg.use();


// --------------------------------------------------
// 7) Function return types with nullables
// --------------------------------------------------

// Prefer explicit return unions when absence is valid
function findById(ids: number[], id: number): number | undefined {
  return ids.find(x => x === id);
}

const found = findById([1, 2, 3], 2);
console.log("found", found); // 2 | undefined

// Provide safe consumers using nullish coalescing
const ensured = (found ?? -1);
console.log("ensured", ensured); // -1 if not found

// --------------------------------------------------
//  Practical tip: choose one style for absence
// --------------------------------------------------
// As a team convention, decide when to use `null` vs `undefined`:
// - Many projects use `undefined` to indicate absence (JS default) and reserve `null`
//   for explicit "no value" coming from APIs/DBs. Be consistent within your codebase.
// --------------------------------------------------
