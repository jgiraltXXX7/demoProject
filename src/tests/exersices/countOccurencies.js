//count ocurrencies
function countOccurencies(arr) {
    let count = {};   
    for (let i = 0; i < arr.length; i++) {
      let element = arr[i];
      if (count[element]) {
        count[element]++;
      } else {
        count[element] = 1;
      } 
    }
    return count;
  }


// Example usage:
const inputArray = ["apple", "banana", "apple", "orange", "banana", "apple"]; 
const result = countOccurencies(inputArray);
console.log(result); // Output: { apple: 3, banana: 2, orange: 1 }