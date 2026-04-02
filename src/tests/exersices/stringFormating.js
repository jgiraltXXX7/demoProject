//String Formatting Function
//Write a function that takes a user’s email string and returns:
//Trimmed (remove leading and trailing spaces)
//All characters in lowercase
//If the string is empty or contains only whitespace → return ''
// Example:
//"  USER@Email.COM  " → "user@email.com"


function formatEmail(email) {
  // 👉 Step 1: check if input is null/undefined
  if (!email) return "";

  // 👉 Step 2: trim spaces
  const trimmed = email.trim();

  // 👉 Step 3: if empty after trim → return ''
  if (trimmed === "") return "";

  // 👉 Step 4: convert to lowercase
  return trimmed.toLowerCase();
}


// Examples
console.log(formatEmail("  USER@ Email.COM  ")); // "user@email.com"
console.log(formatEmail("   "));                // ""
console.log(formatEmail("Test@GMAIL.com"));     // "test@gmail.com"

//Explanation
//1. The function takes an email string as input.
//2. It checks if the input is null or undefined and returns an empty string if so.
//3. It trims leading and trailing spaces from the email string.
//4. If the trimmed string is empty, it returns an empty string.
//5. Otherwise, it converts the trimmed string to lowercase and returns it.turn