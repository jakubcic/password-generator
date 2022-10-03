// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}
// random int function, we'll use this later
// I wanted to use crypto.getRandomValues instead of Math.random()
// According to MDN: Math.random() does not provide cryptographically secure random numbers. 
// Do not use them for anything related to security. Use the Web Crypto API instead, 
// and more precisely the window.crypto.getRandomValues() method.
// I found this function on stackoverflow: https://stackoverflow.com/a/65440696/9367208
function random(min, max) {
  const range = max - min + 1;
  const bytes_needed = Math.ceil(Math.log2(range) / 8);
  const cutoff = Math.floor((256 ** bytes_needed) / range) * range;
  const bytes = new Uint8Array(bytes_needed);
  let value;
  do {
      crypto.getRandomValues(bytes);
      value = bytes.reduce((acc, x, n) => acc + x * 256 ** n, 0);
  } while (value >= cutoff);
  return min + value % range;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// present user with prompts for password criteria
// prompt user for length of password (min 8 max 128)
// prompt user character types:
// confirm lowercase, uppercase, numeric, special characters
// (save those each in their own array and generate password
// by randomly selecting from them based on prompt answers)
// AT LEAST 1 character type should be selected (alert if not)
// after the prompts are answered, generate the password
// combine each array into a single one (depending on which
// were chosen) and randomly select each character until 
// we reach the selected password length

function generatePassword () {

  let characterBank = {
    lower: ["a", "b", "c", "d", "e", "f", "g", "h", "i", 'j', "k", "l", "m", 
      "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],

    upper: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
      "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],

    numeric: ["0","1","2","3","4","5","6","7","8","9"],

    special: ['!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-',
      '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', ']', '\\','^','_', '`', '{', '|', '}','~'],

    // idea: add a method for creating an array from the character bank with only 
    // selected character types, i.e. call characterBank.selectType(lower, upper, special)
    // and it returns an array with only those characters
    // this is totally unecessary but I want to see if I can figure it out
    selectType(...characterSet) {

      // validate arguments by checking if characterSet is a subset of validArgs
      let validArgs = ["lower", "upper", "numeric", "special"]
      const validateArgs = characterSet.every(val => validArgs.includes(val));
      // return if arguments aren't valid
      if (!validateArgs) {
        console.log("Only the following inputs are allowed:\nlower, upper, numeric, special")
        return
      }

      let availableCharacters = []

      for (let i = 0; i < characterSet.length; i++) {
        // use spread syntax (...) to take elements from array within object
        availableCharacters.push(...this[characterSet[i]]);
      }
      return availableCharacters
    }
  }


  let chosenLength = window.prompt("Please enter your desired password length.");

  if (chosenLength === "") {
    window.alert("You must choose a password length!")

  } else if (chosenLength != null) {

    if (isNaN(chosenLength)) {
      chosenLength = window.prompt("Your input must be a number.")
    }
    if (chosenLength < 8 || chosenLength > 128 ) {
      chosenLength = window.prompt("Your password must be between 8 and 128 characters long.\nPlease enter a number between 8 and 128.")
    }

    let confirmLowerCase = window.confirm(
      "Would you like your password to contain lowercase characters?\nClick OK to include lowercase characters.\nClick Cancel to decline.")

    let confirmUpperCase = window.confirm(
      "Would you like your password to contain uppercase characters?\nClick OK to include uppercase characters.\nClick Cancel to decline.")

    let confirmNumeric = window.confirm(
      "Would you like your password to contain numeric characters?\nClick OK to include numeric characters.\nClick Cancel to decline.")

    let confirmSpecial = window.confirm(
      "Would you like your password to contain special characters?\nClick OK to include special characters.\nClick Cancel to decline.")

    if (!confirmLowerCase && !confirmUpperCase && !confirmNumeric && !confirmSpecial){
      window.alert("Your password must include at least one character type!")
    }


    // we want to save the chosen characters to one array that 
    // we'll then use to create the final password
    // initialize availableCharacters array
    let availableCharacters = []

    if (confirmLowerCase) {
      // use the method created in the characterBank object to select the character sets
      // availableCharacters will be an array of all possible characters based on the user's choices
      availableCharacters.push(...characterBank.selectType("lower"))
    }
    if (confirmUpperCase) {
      availableCharacters.push(...characterBank.selectType("upper"))
    }
    if (confirmNumeric) {
      availableCharacters.push(...characterBank.selectType("numeric"))
    }
    if (confirmSpecial) {
      availableCharacters.push(...characterBank.selectType("special"))
    }

    function constrcutPassword () {
      let randomPassword = ""
      for (let i = 0; i < chosenLength; i++) {
        let randomIndex = random(0, availableCharacters.length - 1)
        let randomChar = availableCharacters[randomIndex]
        randomPassword = randomPassword + randomChar
      }
      return randomPassword
    }

    let chosenPassword = constrcutPassword ()

    return chosenPassword

  } else {
    window.alert("You must choose a password length!")
  }
}
