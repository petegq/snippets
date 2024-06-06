const word = "String"
const map = Array.prototype.map

const hasVowels = map.call(word, eachLetter => {
    return /[aeiou]/.test(eachLetter)
}).some(vowel => vowel === true)

console.log(isVowel)
// Output: true

