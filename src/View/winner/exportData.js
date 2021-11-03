import { db } from "../../firebase.js";
import { getDocs, collection, query, orderBy } from "firebase/firestore";
import { createObjectCsvWriter } from "csv-writer";

const winnerWriter = createObjectCsvWriter({
	path: "winners.csv",
	header: [
		{ id: "name", title: "Name" },
		{ id: "email", title: "E-mail" },
		{ id: "contact", title: "Contact" },
		{ id: "isRA", title: "RA" },
		{ id: "isWinner", title: "Winner" },
	],
});

const participantsWriter = createObjectCsvWriter({
	path: "participants.csv",
	header: [
		{ id: "name", title: "Name" },
		{ id: "email", title: "E-mail" },
		{ id: "contact", title: "Contact" },
		{ id: "isRA", title: "RA" },
		{ id: "isWinner", title: "Winner" },
	],
});

const picked = [
	"111237704",
	"112980362",
	"113046081",
	"113053391",
	"111792919",
	"113949353",
	"113949609",
	"111616798",
	"114181929",
	"114182885",
	"114001669",
	"114001368",
	"112424893",
	"114182469",
	"@01437695",
	"114747558",
	"01397677",
	"111850374",
	"112466437",
	"111672174",
	"113044959",
	"114673369",
	"114666013",
	"01402560",
	"114000518",
	"114183796",
];

function isRA(stuID) {
	return ["114009698", "114181105", "112980362"].includes(stuID);
}

async function fetchDict() {
	let dict = {};
	let arr = [];
	getDocs(query(collection(db, "music"), orderBy("time", "desc"))).then(
		users => {
			users.forEach(user => (dict[user.data().studentID] = user.data()));
			getDocs(
				query(collection(db, "movie"), orderBy("time", "desc"))
			).then(users => {
				users.forEach(
					user =>
						(dict[user.data().studentID] = Object.assign(
							{},
							dict[user.data().studentID],
							user.data()
						))
				);
				Object.values(dict).forEach(user =>
					arr.push({
						name: user.name,
						studentID: user.studentID,
						email: user.email,
						contact: user.contact,
						isRA: isRA(user.studentID),
						isWinner: picked.includes(user.studentID),
					})
				);
				participantsWriter
					.writeRecords(arr)
					.then(() =>
						console.log("The CSV file was written successfully")
					);
				let winners = arr.filter(user => user.isWinner);
				winnerWriter
					.writeRecords(winners)
					.then(() =>
						console.log("The CSV file was written successfully")
					);
				console.log(arr);
				console.log(winners);
			});
		}
	);
}

fetchDict();
