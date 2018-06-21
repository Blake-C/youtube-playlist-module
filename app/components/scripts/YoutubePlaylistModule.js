import AUTH from './modules/auth';

export default class YoutubePlaylistModule {
	constructor({
		element,
		playlist_id,
		max_results = '5',
		iframe_options = {}
	}) {
		this.element        = element;
		this.playlist_id    = playlist_id;
		this.max_results    = max_results;
		this.iframe_options = iframe_options;
		this.request_domain = 'https://www.googleapis.com/youtube/v3/playlistItems';
	}

	init() {
		if ( this.element.length ) {
			Array.from( this.element ).map( item => {
				this._get_data( item.getAttribute( 'data-playlist' ), item );
			});
		}

		if ( this.playlist_id ) this._get_data( this.playlist_id, this.element );
	}

	_get_data( playlist_id, element ) {
		const query = {
			part: 'snippet',
			playlistId: playlist_id,
			maxResults: this.max_results,
			key: AUTH.api_key
		};

		fetch( this.request_domain + '?' + this._param( query ) )
			.then( response => response.json() )
			.then( json_data => {
				this._parse_data( json_data, element );
			})
			.catch( error => console.error( error ) ); // eslint-disable-line
	}

	_param( object ) {
		return Object.entries( object ).map( ( [key, val] ) => `${key}=${val}` ).join('&');
	}

	_parse_data( response, element ) {
		const frame_wrap   = document.createElement( 'div' );
		const video_list   = document.createElement( 'ul' );
		const list_wrap    = document.createElement( 'div' );
		const video_player = document.createElement( 'div' );

		video_list.className   = 'video-list';
		video_player.className = 'video-player';
		frame_wrap.className   = 'youtube-video-playlist';
		list_wrap.className    = 'video-list-wrapper';

		response.items.map( data => {
			video_list.innerHTML += `<li>
				<a href="#" data-id="${ data.snippet.resourceId.videoId }">
					<img src="${ data.snippet.thumbnails.medium.url }" />
					<p>${ data.snippet.title }</p>
				</a>
			</li>`;
		} );

		video_player.innerHTML = '<iframe src="" width="560" height="315" frameborder="0" allowfullscreen></iframe>';
		list_wrap.appendChild( video_list );
		frame_wrap.appendChild( video_player );
		frame_wrap.appendChild( list_wrap );
		element.appendChild( frame_wrap );

		const video_items = video_list.getElementsByTagName( 'a' );

		Array.from( video_items ).map( ( item, index ) => {
			const iframe = video_player.childNodes[0];

			// https://developers.google.com/youtube/player_parameters
			const video_url = id => `http://www.youtube.com/embed/${ id }?${ this._param( this.iframe_options ) }`;

			index === 0 ? iframe.setAttribute( 'src', video_url( item.getAttribute( 'data-id' ) ) ) : '';
			index === 0 ? item.setAttribute( 'class', 'active' ) : '';

			item.addEventListener( 'click', function( event ) {
				event.preventDefault();

				Array.from( video_items ).map( item => item.setAttribute( 'class', '' ) );
				this.setAttribute( 'class', 'active' );
				iframe.setAttribute( 'src', video_url( this.getAttribute( 'data-id' ) ) );
			});
		});
	}
}
