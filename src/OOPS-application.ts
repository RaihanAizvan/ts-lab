// here we are create a car clas model, not real just in a game

abstract class CarPart {
    constructor(protected health: number = 10) {}

    abstract operate(): void;

    damage(amount: number) {
        this.health -= amount;
        if (this.health < 0) this.health = 0;
    }

    isBroken(): boolean {
        return this.health === 0;
    }

    getHealth(): number {
        return this.health;
    }
}

//engine
class Engine extends CarPart {
    operate(): void {
        if (this.isBroken()) {
            console.log("Engine dead. Car cannot move.");
            return;
        }
        console.log("Engine running");
        this.damage(5);
    }
}


//tire 
class Tire extends CarPart {
    operate(): void {
        if (this.isBroken()) {
            console.log("Tire blown. No grip.");
            return;
        }
        // console.log("Tire gripping road");
        this.damage(2);
    }
}


//gearbox
class Gearbox extends CarPart {
    operate(): void {
        if (this.isBroken()) {
            console.log("Gearbox failed. stoped.");
            return;
        }
        console.log("gear changed");
        this.damage(3);
    }
}

//composition of Car
class Car {
    constructor(
        private engine: Engine,
        private gearbox: Gearbox,
        private tires: Tire[]
    ) {}

    drive() {
        console.log("\n--- driving ---");
        this.engine.operate();
        this.gearbox.operate();
        this.tires.forEach(tire => tire.operate());
    }

    report() {
        console.log("\n--- Car Health Report ---");
        console.log("Engine:", this.engine.getHealth());
        console.log("Gearbox:", this.gearbox.getHealth());
        this.tires.forEach((t, i) =>
            console.log(`tire ${i + 1}:`, t.getHealth())
        );
    }
}



//DI

class CarFactory {
    static createCar(): Car {
        const engine = new Engine();
        const gearbox = new Gearbox();
        const tires = [
            new Tire(),
            new Tire(),
            new Tire(),
            new Tire()
        ];

        return new Car(engine, gearbox, tires);
    }
}


class Simulation {
    constructor(private car: Car) {}

    run(cycles: number) {
        for (let i = 0; i < cycles; i++) {
            this.car.drive();
        }
        this.car.report();
    }
}



const car = CarFactory.createCar();
const simulation = new Simulation(car);

simulation.run(4);