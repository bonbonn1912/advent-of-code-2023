import { readTXTContent } from "../readfile.js";

const lines = readTXTContent("input.txt").split("\n");
const stringToNumber = {one: 1,two: 2,three: 3,four: 4,five: 5,six: 6,seven: 7,eight: 8,nine: 9}
const sumUpLine = (line) => {
    const firstDigit = /^[A-z]*(\d)/.exec(line)?.[1] ?? 'x'
    let lastDigit = /[A-z\d]+(\d)[A-z]*$/.exec(line)?.[1] ?? 'x'
    if (firstDigit === 'x' && lastDigit === 'x') {
      return 0
    }
    if (lastDigit === 'x') {
      lastDigit = firstDigit
    }
    if (firstDigit === 'x') {
      return 0
    }
    return parseInt(firstDigit + lastDigit)
  }
  
const namedEntries = Object.entries(stringToNumber)
const replaceNumberWordsInString = (str) => {
    const source = str.split('')
    let forwardBuffer = ''
    let backwardsBuffer = ''
    while (source.length > 0) {
      forwardBuffer = forwardBuffer + source.shift()
      backwardsBuffer = (source.pop() ?? '') + backwardsBuffer
      namedEntries.forEach(([name, digit]) => {
        if (forwardBuffer.includes(name)) {
          forwardBuffer = forwardBuffer.replace(name, digit + name.charAt(name.length - 1))
        }
        if (backwardsBuffer.includes(name)) {
          backwardsBuffer = backwardsBuffer.replace(name, name.charAt(0) + digit)
        }
      })
    }
    let combinedBuffer = forwardBuffer + backwardsBuffer
    namedEntries.forEach(([name, digit]) => {
      if (combinedBuffer.includes(name)) {
        combinedBuffer = combinedBuffer.replace(name, digit)
      }
    })
    return combinedBuffer
  }
    const result = lines
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => replaceNumberWordsInString(line))
      .map(line => replaceNumberWordsInString(line))
      .reduce((sum, line) => {
        return sum + sumUpLine(line)
      }, 0)
   
    console.log(result)
