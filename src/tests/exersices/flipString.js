//function the flip the string 
function flip_the_string(receive) {
  return receive
    .split(" ")
    .map(function(word) {
      return word.split("").reverse().join("");
    })
    .join(" ");
}

console.log(flip_the_string("hello world"));

//Explanation 
//1. The function takes a string input called "receive".
//2. It splits the string into an array of words using split(" ").
//3. It uses map to iterate over each word in the array.
//4. For each word, it splits it into characters, reverses the array of characters, and joins them back into a string.
//5. Finally, it joins the reversed words back into a single string with spaces in between and returns it.