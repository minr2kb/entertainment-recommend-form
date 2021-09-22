let str =
	"Among all the series of Harry Potter, I chose Harry Potter and the Sorcerer's Stone. The reason is because if you watch this one, you would not be able to stop yourself from watching the next series! (Actually saying from my experience) And, I think it is fun because since it is a fantasy movie, it stimulates the watchers’ imagination.";

console.log(str.replace(/\w[.?!][\s|$]/g, "|").split("|"));

// let dict = { a: { b: 3 } };

// console.log(dict.b?.b);
