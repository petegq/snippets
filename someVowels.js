const word = "String"
const map = Array.prototype.map

const someVowels = map.call(word, eachLetter => {
    return /[aeiou]/.test(eachLetter)
}).some(vowel => vowel === true)

console.log(someVowels)
// Output: true

