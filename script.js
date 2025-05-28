document.addEventListener('DOMContentLoaded', async (event) => {

    const url = 'https://spotify23.p.rapidapi.com/search/?q=fork&type=multi&offset=0&limit=50&numberOfTopResults=50';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': <Your-API-Key>,
            'x-rapidapi-host': 'spotify23.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        let content = "";
        result.tracks.items.map((element, index) => {
            const card = document.createElement("div");
            content += `
					<div id="card" class="m-3" style="width: 6vw;" >
						<img id="card-img" src="${element.data.albumOfTrack.coverArt.sources[0].url}" class="card-img-top " onclick="playTrack('${element.data.id}', '${element.data.albumOfTrack.coverArt.sources[0].url}', '${ element.data.albumOfTrack.name }')" alt="...">
						<div class="card-body">
							<p class="card-text">${element.data.albumOfTrack.name}</p>
						</div>
					</div>
			`;
        });

        document.querySelector('.Melodyverse').innerHTML = content;

    } catch (error) {
        console.error(error);
    }
});

// Search Function
document.addEventListener('submit', async (event) => {
    event.preventDefault();
    let query = document.getElementById('query').value;
    let SelectedOpt = document.getElementById('options').value;
    console.log("Query:", query, "\nSelectedOpt:", SelectedOpt);

    const url = `https://spotify23.p.rapidapi.com/search/?q=${query}&type=${SelectedOpt}&offset=0&limit=50&numberOfTopResults=50`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'feeef79fa4msh66e117093a5b5ddp1e7a60jsn489e49d87b4c',
            'x-rapidapi-host': 'spotify23.p.rapidapi.com'
        }
    };
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        let content = "";
        result.tracks.items.map((element, index) => {
            const card = document.createElement("div");
            content += `
					<div id="card" class="m-3" style="width: 6vw" onclick="playTrack('${element.data.id}', '${element.data.albumOfTrack.coverArt.sources[0].url}', '${element.data.albumOfTrack.name }')">
						<img  id="card-img" src="${element.data.albumOfTrack.coverArt.sources[0].url}" class="card-img-top" alt="...">
						<div class="card-body">
							<p class="card-text">${element.data.albumOfTrack.name}</p>
						</div>
					</div>
			`;
        });
        document.querySelector('.Melodyverse').innerHTML = content;
    } catch (error) {
        console.error(error);
    }
});


// on click
const CoverImg = document.getElementById('cover');
let audio = null;
async function playTrack(songId,image,name) {
    console.log(songId);
    const url = `https://spotify23.p.rapidapi.com/tracks/?ids=${songId}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'feeef79fa4msh66e117093a5b5ddp1e7a60jsn489e49d87b4c',
            'x-rapidapi-host': 'spotify23.p.rapidapi.com'
        }
    };
    try {
        CoverImg.src = image;
        document.querySelector('#song').innerHTML = name;
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        if (result.tracks && result.tracks.length > 0) {
            const PreviewURL = result.tracks[0].preview_url;
            if (PreviewURL) {
                let player = document.getElementById("player")
                player.src = PreviewURL;
                player.play()
            } else {
                console.error('Preview URL not available.');
            }
        } else {
            console.error('Track not found.');
        }
    } catch (error) {
        console.error(error);
    }
}
