let dictionary = [];
fetch('words.json')
  .then(response => response.json())
  .then(data => {
    dictionary = data; 
    console.log("Dictionary loaded:", dictionary);  
    displayNewLetters();  
  })
  .catch(error => {
    console.error("Error loading the word list:", error);
  });

function getAllValidConsecutivePairs() {
  const validPairs = [];

  dictionary.forEach(word => {
    const wordLength = word.length;

    if (wordLength < 2) return;  

    for (let i = 0; i < wordLength - 1; i++) {
      const pair = word.substring(i, i + 2);  
      validPairs.push(pair);
    }
  });
  return [...new Set(validPairs)];
}
function getRandomConsecutiveLetters() {
  const validPairs = getAllValidConsecutivePairs();
  const randomIndex = Math.floor(Math.random() * validPairs.length);
  const pair = validPairs[randomIndex];
  const validWord = dictionary.find(word => word.includes(pair));
  return { pair, word: validWord };  
}
function checkWord() {
  const inputWord = document.getElementById("wordInput").value.toLowerCase();
  const pair = currentPair.pair.toLowerCase()
  console.log("Input Word:", inputWord);
  console.log("Selected Pair:", pair);
  if (inputWord.includes(pair)) {
    document.getElementById("message").textContent = "correct";
    document.getElementById("wordInput").value = "";
    setTimeout(document.getElementById("message".textContent = "", 500));
    displayNewLetters();
  } else {
    document.getElementById("message").textContent = "word not in dictionary";
  }
}
let currentPair = {}; 
function displayNewLetters() {
  currentPair = getRandomConsecutiveLetters();
  if (currentPair) {
    document.getElementById("letters").textContent = `${currentPair.pair[0].toUpperCase()}${currentPair.pair[1].toUpperCase()}`;
  } else {
    document.getElementById("message").textContent = "No valid pair found. Please try again.";
  }
}
document.getElementById("wordInput").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    checkWord();
  }
});