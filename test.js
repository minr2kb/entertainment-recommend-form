function pickRandom(n, list) {
	let all = list;
	let picked = [];
	for (let i = 0; i < n; i++) {
		var num = Math.floor(Math.random() * all.length);
		picked.push(all[num]);
		all = all.filter(elem => elem !== all[num]);
	}
	return picked;
}

console.log(pickRandom(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
