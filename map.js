let fruits = ["apple", "banana", "mango", "orange", "peach"];

let indexedFruits = fruits.map((fruit, index) => { 
    return {
        index: `${index + 1}`,
        item: `${fruit}`
    }
 });

console.log(indexedFruits);
// Output: [
//   { index: '1', item: 'apple' },
//   { index: '2', item: 'banana' },
//   { index: '3', item: 'mango' },
//   { index: '4', item: 'orange' },
//   { index: '5', item: 'peach' }
// ]