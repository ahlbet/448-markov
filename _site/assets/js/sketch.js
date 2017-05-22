// // var txt = 'I beg you to save me from this madness that eats me a sub-intentional death';
// var order = 6;
// var ngrams = {};
// var beginnings = [];
// var button;
//
// function preload() {
//   four = loadStrings('448.txt');
// }
//
// function setup() {
//   noCanvas();
//
//   for (var j = 0; j < four.length; j++) {
//
//     var txt = four[j];
//
//     for (var i = 0; i <= txt.length - order; i++) {
//       var gram = txt.substring(i, i+order);
//       if (i == 0) {
//         beginnings.push(gram);
//       }
//
//       if (!ngrams[gram]) {
//         ngrams[gram] = [];
//       }
//       ngrams[gram].push(txt.charAt(i+order));
//     }
//   }
//   button = createButton("generate");
//   button.mousePressed(markovIt);
//   console.log(ngrams);
// }
//
// function markovIt() {
//   var currentGram = random(beginnings);
//   var result = currentGram;
//
//   for (var i = 0; i < four.length; i++) {
//     var possibilities = ngrams[currentGram];
//     if (!possibilities) {
//       break;
//     }
//     var next = random(possibilities);
//     result += next;
//     var len = result.length;
//     currentGram = result.substring(len - order, len);
//   }
//
//   createP(result);
// }

// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F16


// An array of lines from a text file
var lines;
// The Markov Generator object
var markov;
// An output element
var output;

// Preload some seed data
function preload() {
  lines = loadStrings('448.txt');
}

function setup() {
  // Join everything together in one long string
  // Keep carriage returns so these will show up in the markov generator
  var text = lines.join('\n');

  // N-gram length and maximum length
  markov = new MarkovGenerator(5, 10000);
  markov.feed(text);

  // Make the button
  var button = select('#button');
  button.mousePressed(generate);

  // Make the output element
  output = select('#output');

  noCanvas();
}

function generate() {
  // Generate some text
  var text = markov.generate();
  // Put in HTML line breaks wherever there was a carriage return
  text = text.replace(/\n/g,'<br/>');
  output.html(text);
}
