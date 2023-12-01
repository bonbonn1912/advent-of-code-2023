import { readTXTContent } from "../readfile.js";

const lines = readTXTContent("input.txt").split("\n");
const res = lines.map(line => {
   return  [...line].filter(el => !isNaN(el))
})

const newRes = res.map(arr =>{
    return `${arr[0]}${arr.slice(-1)}`
})

console.log(newRes.reduce((prev,next) => parseInt(prev)+parseInt(next)))
