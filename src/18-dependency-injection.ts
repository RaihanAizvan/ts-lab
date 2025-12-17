//
// --------------------------------------------------
// DEPENDENCY INJECTION 
// --------------------------------------------------
// dependency Injection (DI) is a way to pass what a class or function needs
// from the outside. You do not create the thing inside. You receive it.
// This makes code easy to test and easy to change later.
// --------------------------------------------------

// dependancy - It’s just one thing relying on another thing to do its job.

// Dependency = “I need something”
// Dependency Injection = “Someone else gives me that thing”

// --------------------------------------------------
// 1) Problem without DI
// --------------------------------------------------
// Here the service creates its own logger. Hard to test. Hard to swap.

class TightService {
  private logger = console; // fixed choice

  run(message: string) {
    this.logger.log("TightService:", message);
  }
}

// You cannot pass a fake logger here. You cannot control it in tests.
new TightService().run("hello");

// --------------------------------------------------
// 2) Use an interface and inject it
// --------------------------------------------------
// We define what we need: a Logger with a log method.

interface Logger {
  log(message: string): void;
}

class ConsoleLogger implements Logger {
  log(message: string) {
    console.log("LOG:", message);
  }
}

class MemoryLogger implements Logger {
  // store logs in memory (good for tests)
  logs: string[] = [];
  log(message: string) {
    this.logs.push(message);
  }
}

// The service now receives the logger from outside.
class Service {
  constructor(private logger: Logger) {}

  run(message: string) {
    this.logger.log(`Service: ${message}`);
  }
}

const s1 = new Service(new ConsoleLogger());
s1.run("with console logger");

const mem = new MemoryLogger();
const s2 = new Service(mem);
s2.run("with memory logger");
console.log("memory logs:", mem.logs);

// --------------------------------------------------
// 3) Constructor injection with defaults
// --------------------------------------------------
// You can provide a default dependency, but still allow override.

class DefaultService {
  constructor(private logger: Logger = new ConsoleLogger()) {}

  run(message: string) {
    this.logger.log(`DefaultService: ${message}`);
  }
}

new DefaultService().run("uses default console logger");
new DefaultService(new MemoryLogger()).run("overridden logger");

// --------------------------------------------------
// 4) Factory function for wiring
// --------------------------------------------------
// A factory builds the pieces and returns a ready object.
// This keeps setup in one place.

function createService(): Service {
  const logger = new ConsoleLogger();
  return new Service(logger);
}

const s3 = createService();
s3.run("built by factory");

// You can also build a service with a memory logger for tests.
function createTestService(): { service: Service; mem: MemoryLogger } {
  const mem = new MemoryLogger();
  return { service: new Service(mem), mem };
}

const { service: testService, mem: testMem } = createTestService();
testService.run("test run");
console.log("test logs:", testMem.logs);

// --------------------------------------------------
// 5) Simple registry (very light container)
// --------------------------------------------------
// This is a tiny container. It stores instances by name.
// In real apps you may use a library, but this shows the idea.

type Token = string;

class Container {
  private instances = new Map<Token, unknown>();

  set<T>(token: Token, value: T) {
    this.instances.set(token, value);
  }

  get<T>(token: Token): T {
    const v = this.instances.get(token);
    if (v === undefined) throw new Error(`no binding for ${token}`);
    return v as T;
  }
}

const container = new Container();
container.set<Logger>("logger", new ConsoleLogger());

// Later, ask for what you need.
const loggerFromContainer = container.get<Logger>("logger");
loggerFromContainer.log("from container");

// You can swap the binding once, and the rest of the code does not change.
container.set<Logger>("logger", new MemoryLogger());
const swapped = container.get<Logger>("logger") as MemoryLogger;
swapped.log("after swap");
console.log("swapped logs:", swapped.logs);

// --------------------------------------------------
// 6) DI with functions
// --------------------------------------------------
// You can pass dependencies to plain functions too.

function sendEmail(
  to: string,
  text: string,
  deps: { logger: Logger }
) {
  deps.logger.log(`sendEmail to=${to} text=${text}`);
  // here you would call a real email client
}

sendEmail("a@b.com", "hi", { logger: new ConsoleLogger() });

// --------------------------------------------------
// 7) When to use DI (short)
// --------------------------------------------------
// Use DI when:
// - You have external things (loggers, HTTP, DB) you want to swap in tests
// - You do not want new() calls hidden deep in your code
// - You want setup in one place, and logic in another
//
// Keep it simple. Start with constructor injection. Add a factory if setup grows.
