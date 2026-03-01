export function round(num) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

export function reverseWords(str) {
  if (str === "") return "";
  const words = str.trim().split(/\s+/);
  if (words.length === 1 && words[0] === "") return "";
  return words.reverse().join(" ");
}

export function onlyEven(arr) {
  return arr.filter((n) => n % 2 === 0);
}

export function isPalindrome(num) {
  if (num < 0) return false;
  const s = String(num);
  const rev = s.split("").reverse().join("");
  return s === rev;
}

export function fizzBuzz(n) {
  const out = [];
  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) out.push("FizzBuzz");
    else if (i % 3 === 0) out.push("Fizz");
    else if (i % 5 === 0) out.push("Buzz");
    else out.push(String(i));
  }
  return out;
}