//Find longest sequence of zeros in binary representation of an integer

//Explanation: Convert the integer to binary, split the binary string by '1's to get sequences of '0's, and find the longest sequence.

function findLongestSequenceOfZeros(n) {
  const binaryString = n.toString(2); // Convert integer to binary string
  const zeroSequences = binaryString.split('1'); // Split by '1' to get sequences of '0's
  let longestSequence = 0;

  for (const sequence of zeroSequences) {
    if (sequence.length > longestSequence) {
      longestSequence = sequence.length;
    }
  }

  return longestSequence;
} 

console.log(findLongestSequenceOfZeros(9)); // Output: 2 (binary: 1001)
console.log(findLongestSequenceOfZeros(20)); // Output: 1 (binary: 10100)
console.log(findLongestSequenceOfZeros(15)); // Output: 0 (binary: 1111)  
console.log(findLongestSequenceOfZeros(32)); // Output: 5 (binary: 100000)
console.log(findLongestSequenceOfZeros(0)); // Output: 1 (binary: 0)
console.log(findLongestSequenceOfZeros(1)); // Output: 0 (binary: 1)

