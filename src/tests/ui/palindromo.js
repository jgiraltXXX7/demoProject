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