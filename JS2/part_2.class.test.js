import { describe, it, expect } from "vitest";
import { Shape, Square, Rectangle, Circle } from "./part_2.class.js";

describe("Part 2B — classes", () => {
    it("classes exist", () => {
        expect(typeof Shape).toBe("function");
        expect(typeof Square).toBe("function");
        expect(typeof Rectangle).toBe("function");
        expect(typeof Circle).toBe("function");
    });

    it("instances have getArea()", () => {
        const s = new Square(10);
        const r = new Rectangle(5, 10);
        const c = new Circle(2);

        expect(typeof s.getArea).toBe("function");
        expect(typeof r.getArea).toBe("function");
        expect(typeof c.getArea).toBe("function");
    });

    it("areas are correct", () => {
        const s = new Square(10);
        const r = new Rectangle(5, 10);
        const c = new Circle(2);

        expect(s.getArea()).toBe(100);
        expect(r.getArea()).toBe(50);
        expect(c.getArea()).toBeCloseTo(Math.PI * 4, 10);
    });

    it("stringification format is stable", () => {
        const r = new Rectangle(5, 10);
        const s = new Square(10);
        const c = new Circle(2);

        expect(String(r)).toBe("[Shape rectangle]");
        expect(`${s}`).toBe("[Shape square]");
        expect(`${c}`).toBe("[Shape circle]");
    });

    it("numeric coercion uses area (arithmetic works)", () => {
        const r = new Rectangle(5, 10); // 50
        const s = new Square(10);       // 100
        const c = new Circle(2);        // ~12.566

        const result = r + s - c;
        expect(result).toBeCloseTo(150 - Math.PI * 4, 10);
    });

    it("inheritance works (instanceof)", () => {
        const s = new Square(3);
        expect(s instanceof Square).toBe(true);
        expect(s instanceof Shape).toBe(true);
    });
});
