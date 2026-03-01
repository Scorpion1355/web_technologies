import { describe, it, expect } from "vitest";
import { round, reverseWords, onlyEven, isPalindrome, fizzBuzz } from "./part1.js";

describe("Part 1", () => {
  describe("round(num)", () => {
    it("rounds to 2 decimals (basic cases)", () => {
      expect(round(2.3456)).toBe(2.35);
      expect(round(2.344)).toBe(2.34);
      expect(round(2)).toBe(2);
      expect(round(2.1)).toBe(2.1);
    });

    it("handles negative numbers", () => {
      expect(round(-2.3456)).toBe(-2.35);
      expect(round(-2.344)).toBe(-2.34);
    });

    it("handles tricky floating point case", () => {
      expect(round(1.005)).toBe(1.01);
    });
  });

  describe("reverseWords(str)", () => {
    it("reverses words order", () => {
      expect(reverseWords("Hello world!")).toBe("world! Hello");
      expect(reverseWords("One two three")).toBe("three two One");
    });

    it("works with extra spaces (keeps words reversed, spacing may be normalized by implementation)", () => {
      const input = "  Hello   world!  ";
      const out = reverseWords(input);

      expect(out.trim().split(/\s+/)).toEqual(["world!", "Hello"]);
    });

    it("single word / empty string", () => {
      expect(reverseWords("Hello")).toBe("Hello");
      expect(reverseWords("")).toBe("");
    });
  });

  describe("onlyEven(arr)", () => {
    it("filters only even numbers", () => {
      expect(onlyEven([1, 2, 3, 4])).toEqual([2, 4]);
      expect(onlyEven([2, 4, 6])).toEqual([2, 4, 6]);
      expect(onlyEven([1, 3, 5])).toEqual([]);
    });

    it("works with negative numbers and zero", () => {
      expect(onlyEven([-3, -2, -1, 0, 1, 2])).toEqual([-2, 0, 2]);
    });

    it("does not mutate the original array", () => {
      const arr = [1, 2, 3, 4];
      const copy = arr.slice();
      onlyEven(arr);
      expect(arr).toEqual(copy);
    });
  });

  describe("isPalindrome(num)", () => {
    it("detects palindrome numbers", () => {
      expect(isPalindrome(121)).toBe(true);
      expect(isPalindrome(125)).toBe(false);
      expect(isPalindrome(1)).toBe(true);
      expect(isPalindrome(22)).toBe(true);
      expect(isPalindrome(10)).toBe(false);
    });

    it("negative numbers are not palindromes", () => {
      expect(isPalindrome(-121)).toBe(false);
    });
  });

  describe("fizzBuzz(n)", () => {
    it("returns array of strings 1..n with Fizz/Buzz/FizzBuzz replacements", () => {
      expect(fizzBuzz(1)).toEqual(["1"]);
      expect(fizzBuzz(3)).toEqual(["1", "2", "Fizz"]);
      expect(fizzBuzz(5)).toEqual(["1", "2", "Fizz", "4", "Buzz"]);
      expect(fizzBuzz(15)).toEqual([
        "1",
        "2",
        "Fizz",
        "4",
        "Buzz",
        "Fizz",
        "7",
        "8",
        "Fizz",
        "Buzz",
        "11",
        "Fizz",
        "13",
        "14",
        "FizzBuzz",
      ]);
    });

    it("n=0 returns empty array", () => {
      expect(fizzBuzz(0)).toEqual([]);
    });
  });
});
