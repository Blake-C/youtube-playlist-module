export default class YoutubePlaylistModule {
	constructor({
		api_key,
		element,
		playlist_id,
		max_results = '5',
		thumbnail_size = 'medium',
		iframe_options = {}
	}) {
		this.api_key        = api_key;
		this.element        = element;
		this.playlist_id    = playlist_id;
		this.max_results    = max_results;
		this.thumbnail_size = thumbnail_size;
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
			key: this.api_key
		};

		fetch( this.request_domain + '?' + this._param( query ) )
			.then( response => response.json() )
			.then( json_data => {
				this._parse_data( json_data, element );
			})
			.catch( error => console.error( error ) ); // eslint-disable-line no-console
	}

	_param( object ) {
		return Object.entries( object ).map( ( [key, val] ) => `${key}=${val}` ).join('&');
	}

	list_item_template( data ) {
		return `<li>
				<a href="#" data-id="${ data.snippet.resourceId.videoId }">
					<img src="${ data.snippet.thumbnails[ this.thumbnail_size ].url }" />
					<p>${ data.snippet.title }</p>
				</a>
			</li>`;
	}

	_parse_data( response, element ) {
		const frame_wrap   = document.createElement( 'div' );
		const video_list   = document.createElement( 'ul' );
		const list_wrap    = document.createElement( 'div' );
		const video_player = document.createElement( 'div' );

		video_list.className   = 'ypm_video-list';
		video_player.className = 'ypm_video-player';
		frame_wrap.className   = 'ypm_youtube-video-playlist';
		list_wrap.className    = 'ypm_video-list-wrapper';

		response.items.map( data => video_list.innerHTML += this.list_item_template( data ) );

		video_player.innerHTML = '<iframe src="" width="560" height="315" frameborder="0" allowfullscreen></iframe>';
		list_wrap.appendChild( video_list );
		frame_wrap.appendChild( video_player );
		frame_wrap.appendChild( list_wrap );
		element.appendChild( frame_wrap );

		const video_items = video_list.getElementsByTagName( 'a' );
		const initial_autoplay_state = this.iframe_options.autoplay;

		Array.from( video_items ).map( ( item, index ) => {
			const iframe = video_player.childNodes[0];

			index === 0 ? // On the first interation we don't ever want to autoplay video.
				this.iframe_options.autoplay = 0 :
				this.iframe_options.autoplay = initial_autoplay_state;

			// Other params: https://developers.google.com/youtube/player_parameters
			const video_url = id => `http://www.youtube.com/embed/${ id }?${ this._param( this.iframe_options ) }`;

			index === 0 ? iframe.setAttribute( 'src', video_url( item.getAttribute( 'data-id' ) ) ) : '';
			index === 0 ? item.setAttribute( 'class', 'ypm_active' ) : '';

			item.addEventListener( 'click', function( event ) {
				event.preventDefault();

				Array.from( video_items ).map( item => item.setAttribute( 'class', '' ) );
				this.setAttribute( 'class', 'ypm_active' );
				iframe.setAttribute( 'src', video_url( this.getAttribute( 'data-id' ) ) );
			});
		});
	}
}
