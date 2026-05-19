//Find duplicates in an array and return them in a new array
function findDuplicates(arr) {
  let seen = [];
  let duplicates = [];

  for (let i = 0; i < arr.length; i++) {
    let element = arr[i];

    if (seen.includes(element) && !duplicates.includes(element)) {
      duplicates.push(element);
    } else {
      seen.push(element);
    }
  }

  return duplicates;
}

console.log(findDuplicates([1, 2, 3, 2, 4, 5, 1]));