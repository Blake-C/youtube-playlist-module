const parse_data = function( response, element ) {
	const wrapper      = document.createElement( 'div' );
	const video_ul     = document.createElement( 'ul' );
	const video_player = document.createElement( 'div' );

	video_ul.className     = 'video-list';
	video_player.className = 'video-player';
	wrapper.className      = 'youtube-video-playlist';

	response.items.map( data => {
		video_ul.innerHTML += `<li>
			<a href="#" data-id="${ data.snippet.resourceId.videoId }">
				${ data.snippet.title } <br />
				<img src="${ data.snippet.thumbnails.medium.url }" /> <br />
			</a>
		</li>`;
	} );

	video_player.innerHTML = '<iframe src="" frameborder="0" allowfullscreen></iframe>';
	wrapper.appendChild( video_player );
	wrapper.appendChild( video_ul );

	element.appendChild( wrapper );

	const video_items = video_ul.getElementsByTagName( 'a' );

	Array.from( video_items ).forEach( ( item, index ) => {
		const iframe = video_player.childNodes[0];
		const video_url    = id => `http://www.youtube.com/embed/${ id }`;

		index === 0 ? iframe.setAttribute( 'src', video_url( item.getAttribute( 'data-id' ) ) ) : '';

		item.addEventListener( 'click', function( event ) {
			event.preventDefault();

			iframe.setAttribute( 'src', video_url( this.getAttribute( 'data-id' ) ) );
		});
	});
};

export default parse_data;
