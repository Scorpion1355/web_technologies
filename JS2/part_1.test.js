import { describe, it, expect } from "vitest";
import { max, maxPair, recordProgress } from "./part_1.js";

describe("Part 1 — refactor", () => {
    describe("max(arr)", () => {
        it("returns max for normal arrays", () => {
            expect(max([1, 2, 3, 4, 5])).toBe(5);
            expect(max([-10, -2, -30])).toBe(-2);
        });

        it("returns NaN for invalid input", () => {
            expect(Number.isNaN(max([]))).toBe(true);
            expect(Number.isNaN(max("nope"))).toBe(true);
            expect(Number.isNaN(max(null))).toBe(true);
        });
    });

    describe("maxPair(arr)", () => {
        it("returns adjacent pair with maximum sum", () => {
            expect(maxPair([1, 2, 3, 4, 5])).toEqual([4, 5]);
            expect(maxPair([5, 1, 1, 1])).toEqual([5, 1]);
        });

        it("treats the last element as paired with 0", () => {
            expect(maxPair([10])).toEqual([10, 0]);
            expect(maxPair([1, -2, 100])).toEqual([100, 0]);
        });

        it("returns NaN for invalid input", () => {
            expect(Number.isNaN(maxPair([]))).toBe(true);
            expect(Number.isNaN(maxPair(undefined))).toBe(true);
        });
    });

    describe("recordProgress(obj, tuple)", () => {
        it("returns a new object with updated age/weight", () => {
            const obj = { name: "Mike", age: 13, weight: 100 };
            const out = recordProgress(obj, [1, 20]);

            expect(out).toEqual({ name: "Mike", age: 14, weight: 120 });
            expect(out).not.toBe(obj); // new object
        });

        it("treats missing age/weight as 0", () => {
            expect(recordProgress({ name: "A" }, [2, 3])).toEqual({
                name: "A",
                age: 2,
                weight: 3,
            });
        });

        it("empty tuple returns a copy without changes", () => {
            const obj = { name: "X", age: 1, weight: 2 };
            const out = recordProgress(obj, []);
            expect(out).toEqual(obj);
            expect(out).not.toBe(obj);
        });

        it("throws on invalid object", () => {
            expect(() => recordProgress(null, [1, 1])).toThrowError("Invalid object");
            expect(() => recordProgress([], [1, 1])).toThrowError("Invalid object");
            expect(() => recordProgress("x", [1, 1])).toThrowError("Invalid object");
        });

        it("does not mutate the input object", () => {
            const obj = { name: "Mike", age: 13, weight: 100 };
            const copy = { ...obj };
            recordProgress(obj, [1, 20]);
            expect(obj).toEqual(copy);
        });
    });
});
