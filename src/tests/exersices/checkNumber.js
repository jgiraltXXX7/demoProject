// Function to check if a number is positive, negative, or zero
function checkNumber(num) {
  if (num > 0) {
    return "POSITIVE";
  } else if (num === 0) {
    return "ZERO";
  } else {
    return "NEGATIVE";
  }
}


// Examples
console.log(checkNumber(10));  // POSITIVE
console.log(checkNumber(0));   // ZERO
console.log(checkNumber(-3));  // NEGATIVE