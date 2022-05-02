"use strict";
/*import { isNewExpression } from "typescript";

const students = [{name: 'leonel', gender: 'm', score:100},
{name: 'ean', gender: 'm', score:70},
{name: 'george', gender: 'm', score:92},
{name: 'daniel', gender: 'm', score:98},
{name: 'naxiell', gender: 'f', score:80},
{name: 'Kandora', gender: 'f', score:75}
];

const last = (array: Array<{name: string, gender: string, score: number}>, n:number)=>{
    const start = array.length - n;
    return array.slice(start);
}
console.log("last 2 elements: ", last(students, 2));
console.log(students.slice(0,2))
console.log(students);
students.push({name:'maria', gender:'f', score: 50});
const whatisnewelement = (nw: Array<{name:string, gender: string, score: number}>)=>{
    return students.push({name:'jose', gender:'m', score: 80});
}
console.log(whatisnewelement(students));
console.log(students);*/
// crear una funcion que me organice un listado de mayor a menor,
/*const itemslist = ['fox', 'blueblack', 'black', 'green', 'white'];
function sortByLength(arr: string[]):string[] {
   return  arr.sort((a,b)=> a.length-b.length);
  
}
console.log(sortByLength(itemslist)); // the, fox, blue, quick*/
const testitems = ['white', 'black', 'red', 'gree'];
const longestword = testitems.reduce((previouslongestword, currentword) => {
    if (currentword.length == 5) {
        return currentword += '';
    }
    else
        return previouslongestword;
}, "");
const longest = testitems.reduce((previouslongestword, currentword) => {
    if (currentword.length == 5) {
        return currentword.length;
    }
    else
        return previouslongestword;
}, 0);
const uppercase = testitems.map((element) => {
    return element.toUpperCase();
}).map(st => {
    return "<h2>" + st + "</h2>";
});
console.log(longestword);
console.log(longest);
console.log(uppercase);
//# sourceMappingURL=ALG.01.js.map