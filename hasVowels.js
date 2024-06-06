const word = "String"
const map = Array.prototype.map

// const stringArray = map.call(word, eachLetter => {
//     return `${eachLetter}`
// })

const isVowel = map.call(word, eachLetter => {
    return /[aeiou]/.test(eachLetter)
})

console.log(isVowel)
// Output: [ false, false, false, true, false, false ]

const hasVowels = isVowel.some(vowel => vowel === true)
console.log(hasVowels)
// Output: true

