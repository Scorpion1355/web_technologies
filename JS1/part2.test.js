import { describe, it, expect } from "vitest";
import { usersByCity, averageAge, splitByAge, oldestUser, findCity, unique } from "./part2.js";

const users = [
  { name: "John", age: 34, city: "Chicago" },
  { name: "Amy", age: 20, city: "New York" },
  { name: "Camila", age: 24, city: "Los Angeles" },
  { name: "Tom", age: 33, city: "Chicago" },
];

describe("Part 2", () => {
  describe("usersByCity(users, city)", () => {
    it("filters users by city", () => {
      expect(usersByCity(users, "Chicago")).toEqual([
        { name: "John", age: 34, city: "Chicago" },
        { name: "Tom", age: 33, city: "Chicago" },
      ]);

      expect(usersByCity(users, "New York")).toEqual([{ name: "Amy", age: 20, city: "New York" }]);

      expect(usersByCity(users, "Paris")).toEqual([]);
    });

    it("does not mutate input array", () => {
      const copy = users.map((u) => ({ ...u }));
      usersByCity(users, "Chicago");
      expect(users).toEqual(copy);
    });
  });

  describe("averageAge(users, city?)", () => {
    it("returns average age for all users", () => {
      // 34 + 20 + 24 + 33 = 111, / 4 = 27.75
      expect(averageAge(users)).toBeCloseTo(27.75, 10);
    });

    it("returns average age for a city", () => {
      // Chicago: 34 + 33 = 67 / 2 = 33.5
      expect(averageAge(users, "Chicago")).toBeCloseTo(33.5, 10);
    });

    it("city with no users returns NaN or throws", () => {
      expect(Number.isNaN(averageAge(users, "Paris"))).toBe(true);
    });
  });

  describe("splitByAge(users, age)", () => {
    it("splits by age threshold", () => {
      expect(splitByAge(users, 30)).toEqual([
        [
          { name: "Amy", age: 20, city: "New York" },
          { name: "Camila", age: 24, city: "Los Angeles" },
        ],
        [
          { name: "John", age: 34, city: "Chicago" },
          { name: "Tom", age: 33, city: "Chicago" },
        ],
      ]);
    });

    it("threshold equal handling (assumes >= goes to older group)", () => {
      const u = [
        { name: "A", age: 30, city: "X" },
        { name: "B", age: 29, city: "X" },
      ];
      expect(splitByAge(u, 30)).toEqual([
        [{ name: "B", age: 29, city: "X" }],
        [{ name: "A", age: 30, city: "X" }],
      ]);
    });
  });

  describe("oldestUser(users, city?)", () => {
    it("returns oldest user overall", () => {
      expect(oldestUser(users)).toEqual({ name: "John", age: 34, city: "Chicago" });
    });

    it("returns oldest user within a city", () => {
      expect(oldestUser(users, "New York")).toEqual({
        name: "Amy",
        age: 20,
        city: "New York",
      });
      expect(oldestUser(users, "Chicago")).toEqual({
        name: "John",
        age: 34,
        city: "Chicago",
      });
    });

    it("throws if city has no user", () => {
      expect(() => oldestUser(users, "Paris")).toThrow();
    });
  });

  describe("findCity(users, name)", () => {
    it("finds city by user name", () => {
      expect(findCity(users, "Amy")).toBe("New York");
      expect(findCity(users, "John")).toBe("Chicago");
    });

    it("throws 'User not found' if no such user", () => {
      expect(() => findCity(users, "Diego")).toThrowError("User not found");
    });
  });

  describe("unique(users, prop, city?)", () => {
    it("returns unique values by prop", () => {
      expect(unique(users, "name")).toEqual(["John", "Amy", "Camila", "Tom"]);
      expect(unique(users, "city")).toEqual(["Chicago", "New York", "Los Angeles"]);
      expect(unique(users, "age")).toEqual([34, 20, 24, 33]);
    });

    it("throws 'Property not found' for missing property", () => {
      expect(() => unique(users, "job")).toThrowError("Property not found");
    });

    it("unique(users, prop, city) filters by city first", () => {
      expect(unique(users, "age", "Chicago")).toEqual([34, 33]);
    });

    it("preserves order of first appearance", () => {
      const u = [
        { name: "A", age: 10, city: "X" },
        { name: "B", age: 10, city: "Y" },
        { name: "C", age: 11, city: "X" },
        { name: "D", age: 10, city: "Z" },
      ];
      expect(unique(u, "age")).toEqual([10, 11]);
    });
  });
});
