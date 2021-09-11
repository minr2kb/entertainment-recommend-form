async function getData(query) {
	let result = {
		img: "",
		url: "",
	};

	request(
		`https://www.googleapis.com/youtube/v3/search?key=AIzaSyDOK70N2BFZsHBnw_rdxwsuuTf-g06d3os&part=id,snippet&type=video&q=${encodeURI(
			query
		)}&maxResults=1`,
		function (err, res, body) {
			let data = JSON.parse(body).items;
			if (data.length > 0) {
				result["url"] =
					"https://www.youtube.com/watch?v=" + data[0].id.videoId;
				result["img"] = data[0].snippet.thumbnails.default.url;
			}
			// console.log(result);
			return result;
		}
	);
}
getData("paris").then(data => console.log(data));

// export default getData;
