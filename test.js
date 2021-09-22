let str =
	"This movie is very touching and I could imagine the relationship in the future. The protagonist is a good actor too! Also,Scarlett Johansson's voice acting as the AI which shows no emotions, fascinate people with just his voice.";

console.log(str.replace(/\w[.?!][\s|$]/g, "|").split("|"));

// let dict = { a: { b: 3 } };

// console.log(dict.b?.b);
