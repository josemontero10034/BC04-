"use strict";
/* n! means n × (n − 1) × ... × 3 × 2 × 1

For example, 10! = 10 × 9 × ... × 3 × 2 × 1 = 3628800,
and the sum of the digits in the number 10! is 3 + 6 + 2 + 8 + 8 + 0 + 0 = 27.

Find the sum of the digits in the number 100!*/
const value = 100;
let n = value;
let factorial = 0;
let sumdigit = 0;
for (let i = 0; i < (value - 1); i++) {
    if (factorial == 0) {
        factorial = value;
    }
    n = n - 1;
    factorial *= n;
}
;
console.log(factorial);
const factorialtoarray = [..."" + factorial]; // we need the exactly numbers beside this code 's line
let newfactorial = "";
for (let i = 0; i < factorialtoarray.length; i++) {
    newfactorial += factorialtoarray[i];
}
console.log(newfactorial);
console.log(sumdigit);
//for sum each of digits from factorial
console.log(factorialtoarray);
//# sourceMappingURL=euler.js.map