import lscache from 'lscache';
import AUTH from './auth';


const playlist_id    = 'PLkkY7rUh56sKCgtAeu0A0zXku1EbkTGNP';
const request_domain = 'https://www.googleapis.com/youtube/v3/playlistItems';
const max_results    = '5';


const parse_data = function( response ) {
	const app          = document.getElementById( 'app' );
	const wrapper      = document.createElement( 'div' );
	const video_ul     = document.createElement( 'ul' );
	const iframe       = document.createElement( 'div' );

	video_ul.className = 'video-list';
	iframe.className   = 'video-player';

	response.items.map( data => {
		video_ul.innerHTML += `<li>
			<a href="#" data-id="${data.snippet.resourceId.videoId}" class="video-item">
				${ data.snippet.title } <br />
				<img src="${ data.snippet.thumbnails.medium.url }" /> <br />
			</a>
		</li>`;
	} );

	iframe.innerHTML = '<iframe src="" id="video_player" frameborder="0" allowfullscreen></iframe>';
	wrapper.appendChild( iframe );
	wrapper.appendChild( video_ul );
	app.appendChild( wrapper );

	const video_items = document.getElementsByClassName( 'video-item' );

	Array.from( video_items ).forEach( (element, index) => {
		const video_player = document.getElementById( 'video_player' );
		const video_url    = id => `http://www.youtube.com/embed/${ id }`;

		index === 0 ? video_player.setAttribute( 'src', video_url( element.getAttribute( 'data-id' ) ) ) : '';

		element.addEventListener( 'click', function( event ) {
			event.preventDefault();

			video_player.setAttribute( 'src', video_url( this.getAttribute( 'data-id' ) ) );
		});
	});
};


/**
 * Get Data.
 */
if ( lscache.get( 'playlist-response' ) && ( lscache.get( 'playlist-response' ) !== null ) ) {
	parse_data( lscache.get( 'playlist-response' ) );
} else {
	fetch( `${ request_domain }?part=snippet&playlistId=${ playlist_id }&maxResults=${ max_results }&key=${ AUTH.api_key }` )
		.then( response => response.json() )
		.then( json_data => {
			lscache.set( 'playlist-response', json_data, 1440 );
			parse_data( json_data );
		})
		.catch( error => console.error( error ) ); // eslint-disable-line
}
