const word = "String"
const map = Array.prototype.map

const stringArray = map.call(word, eachLetter => {
    return `${eachLetter}`
})

console.log(stringArray)
// Output: [ 'S', 't', 'r', 'i', 'n', 'g' ]