// ----------------------------------------------------
// TODO and problem definition:
// ----------------------------------------------------
// - Get compare function working i.e. give correct results in correct order
// ----------------------------------------------------
// - MODULE: MOVE COMPARE FUNCTION TO SEPARATE FILE AND EXPORT
// - IMPORT INTO INDEX.JS
// ----------------------------------------------------
// - Notes about TESTING
//  - Från lektion 220314
//   - TESTSTRATEGI
//    - Två strategier nämns:
//      - Att tänka ut och skriva flertalet tester och försöka skriva en funktion som checkar av dem.
//      - Att skriva ett test och klara det -> ytterligare ett test och klara det, etc.
//    - Att ett sätt att koda funktionaliteten till slut inte fungerar när andra krav ställs på funktionaliteten ska inte ses som ett misslyckande, utan då genom tester är det ett sätt att definiera olika aspekter av funktionaliteten, typ hårdkoda input till 'a' snarare än guess[i]... Det handlar om att ändra implementationen

//    - Vad behöver jag ha för tester för att kontrollera att min kod verkligen fungerar som förväntat?
//    - Vilka tester ger mig INTE någonting?
//      - T ex kontrollera om åttaåringen kan addition.
//      - 1: Fråga: "Kan du addition?" Ja/nej -- Detta är ett dåligt test eftersom det inte alls kontrollerar om åttaåringen faktiskt kan addition

//    - Utifrån vad jag inte behöver, vad behöver jag för grundläggande strategi, det vill säga typ frågeställningar?

//    - Ett test kan pga slumpen ge rätt svar och därför kan ett test behöva kompletteras med flera tester (eller ytterligare  testlogik?) Med andra ord kan flera frågor behöver ställas, flera test behöver köras, för att minska risken för att testsviten felaktigt godkänner koden (eller egentligen checkedLetters).
//    - Ett krav är att jag ger något och får något tillbaka, och kan kontrollera om jag fick det jag förväntade mig.
//    - Det handlar, i fallet med åttaåring och addition, om att jag utifrån min kunskap, i det här fallet om matematik, försöker formulera frågor som ger vettiga svar i fråga om problemet -- sådana som faktiskt riktar in sig på att täcka in det som är relevant -- i fallet med att kontrollera för addition kanske ställa frågorna: "Vad är 1 + 1?" - Förväntat svar: "2". | Tveksamt om det är tillräckligt, kan ha varit flyt, så därför: "Vad är 3 + 4?", förväntat svar: "7".

// TODO: cont'd
//   - Create test strategy
//   - Create separate test-file
//   - Check Jest-documentation
//   - Document the test strategy with comments in test-code
//   - Create 2+ tests that verifies the compareFunction
//     - IF INPUT IS "CYKLA, HALLÅ", THEN checkedLetters IS EXPECTED TO BE:
//     - H / incorrect
//     - A / misplaced
//     - L / incorrect (eftersom det redan finns ett korrekt L)
//     - L / correct
//     - Å / incorrect

//     - TEST WITH SOME OTHER answers, E.G. "HALLÅ"-"ILLER",  "SPIRA"- "PROPP"
// ----------------------------------------------------

function feedback(correctWord, guessWord) {

  const checkedLetters = [...Array(correctWord.length)];
  
  guessWord = guessWord.toUpperCase();
  correctWord = correctWord.toUpperCase();

  // Log for exec order clarity
  console.log(`\nCorrect: ${correctWord}`);
  console.log(`Guess:   ${guessWord}`);

  const letterCounter = {}; //keep track of correctLetter frequency

  // first pass: if the correctLetter has been counted, i.e. is present in counter object, then just add 1 to the count (or value key) (the first iteration will always give false and thus skip to else and thus first add 1 to all non-counted letters?

  for (let i = 0; i < correctWord.length; i++) {

    let correctLetter = correctWord[i];
    let guessLetter = guessWord[i];

    if (letterCounter[correctLetter]) {
      letterCounter[correctLetter] += 1;
    } 
    else {
      letterCounter[correctLetter] = 1;
    }
  }
  console.log(letterCounter);

    //first pass, check for correct letters, push to checkedLetters and subtract every correct one from the lettercounter -- this is later used to set guessed letter as misplaced if the counter for that correctLetter = 0, because then all the letters in letterCount are "used up" -- how get in right index though? make empty array w/ index based on word length?
  for (let i = 0; i < correctWord.length; i++) {

    let correctLetter = correctWord[i];
    let guessLetter = guessWord[i];

    if (guessLetter == correctLetter) { // is the letter same char and index
      letterCounter[correctLetter] -= 1;
      checkedLetters.push({letter: guessLetter, result: 'correct'});
    }
  }

  for (let i = 0; i < correctWord.length; i++) {

    let correctLetter = correctWord[i];
    let guessLetter = guessWord[i];

    if (!checkedLetters.includes("correct")) { // trying to add functionality to ignore "correct"
      if (correctWord.includes(guessLetter) && letterCounter[correctLetter] > 0) {
      checkedLetters.push({letter: guessLetter, result: 'misplaced'});
      } else { checkedLetters.push({letter: guessLetter, result: 'incorrect'}); }
    }
  } // use indexOf answer + splice it to that indexOf pos in checkedLetters to add letters to correct index pos?
  console.log(checkedLetters);
}

feedback('cykla', 'hallå');

// shouldn't it work with just adding correct ones in correct pos maybe with map or filter?
