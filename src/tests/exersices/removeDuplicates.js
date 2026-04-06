/*  Given [1, 2, 2, 3, 4, 4], return a list with duplicates removed.
Create a function that takes in an array of numbers and return an array without duplicates 
input = [1, 2, 2, 3, 4, 4]
output = [1, 2, 3, 4] */

function removeDuplicated(argument) {
    let count = [];

    for (let i = 0; i < argument.length; i++) {
        let element = argument[i];

        // Skip empty strings
        if (element === "") {
            continue;
        }

        // Add only if not duplicated
        if (!count.includes(element)) {
            count.push(element);
        }
    }

    return count;
}

const inputArray = [1,2,3,4,4,5,"",5,56,7,8,9,78,56,56];
console.log(removeDuplicated(inputArray));