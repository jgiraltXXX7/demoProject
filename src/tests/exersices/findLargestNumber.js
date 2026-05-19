//Return the biggest number.

const numberList = [3, 5, 7, 2, 8];

function findLargest(arr) {
  let largest = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > largest) {
      largest = arr[i];
    }
  }

  return largest;
}

console.log(findLargest(numberList)); // Output: 8

// Explanation: 