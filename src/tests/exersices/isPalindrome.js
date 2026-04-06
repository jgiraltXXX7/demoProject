/* //📝 Problem Description

//Write a function called isPalindrome that:

//Takes a string as input

//Determines whether the string is a palindrome

// Returns:

"is a palindrome" if the string reads the same forward and backward

"Its not a palindrome" otherwise */ 

function ispalindrome(str){
   const cleaned = str.toLowerCase().replace(/\s+/g,"");
   const reversed= cleaned.split("").reverse().join("");
   if(cleaned===reversed){
       return 'is a palindrome'
   }else{
       return 'Its not aplindrome'
   }
}


//examples
console.log(ispalindrome('casa'))