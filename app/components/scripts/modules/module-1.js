import AUTH from './auth';

const app            = document.getElementById( 'app' );
const element        = document.createElement( 'ul' );
const playlist_id    = 'PLkkY7rUh56sKCgtAeu0A0zXku1EbkTGNP';
const request_domain = 'https://www.googleapis.com/youtube/v3/playlistItems';
const max_results    = '5';

fetch(`${ request_domain }?part=snippet&playlistId=${ playlist_id }&maxResults=${ max_results }&key=${ AUTH.api_key }`)
	.then(function( response ) {
		return response.json();
	})
	.then( function( json_data ) {
		// console.log( json_data );
		data( json_data );
	});

const data = function( response ) {
	const items = response.items;
	let details = '';

	items.map(data => {
		details = data.snippet;
		element.innerHTML += `<li>${ details.title } <br />
			<img src="${ details.thumbnails.medium.url }" /> <br />
			<iframe src="http://www.youtube.com/embed/${ details.resourceId.videoId }" frameborder="0" allowfullscreen></iframe>
		</li>`;
	});
};

app.appendChild(element);
