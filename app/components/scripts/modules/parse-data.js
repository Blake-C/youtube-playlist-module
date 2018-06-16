const parse_data = function( response ) {
	const app          = document.getElementById( 'app' );
	const wrapper      = document.createElement( 'div' );
	const video_ul     = document.createElement( 'ul' );
	const iframe       = document.createElement( 'div' );

	video_ul.className = 'video-list';
	iframe.className   = 'video-player';
	wrapper.className  = 'youtube-video-playlist';

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

export default parse_data;
