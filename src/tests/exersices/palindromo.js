const palindromos =[ "arara", "ana", "asa", "ovo", "radar", "reviver", "rotor", "sopapos"]


function reverseString (receive){
  let reversedString = receive.split("").reverse().join("")
  return reversedString;
}


for(let i=0; i<palindromos.length; i++){
  const reversed = reverseString(palindromos[i]);
  if(palindromos[i] === reversed){
    console.log(`${palindromos[i]} is palíndromo!`);
  } else{
    console.log(`${palindromos[i]} is not palíndromo!`);
  }
}

//Explanation 
//1. The function takes a string input called "receive".
//2. It splits the string into an array of characters using split("").
//3. It uses reverse() to reverse the order of the characters in the array.
//4. It uses join("") to join the reversed characters back into a string.
//5. Finally, it returns the reversed string.