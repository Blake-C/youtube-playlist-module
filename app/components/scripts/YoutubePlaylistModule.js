export default class YoutubePlaylistModule {
	constructor({
		api_key,
		element,
		playlist_id,
		max_results = '5',
		iframe_options = {}
	}) {
		this.api_key        = api_key;
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

	playlist_items_template( data ) {
		return `<li>
			<a class="ypm_video_items" href="#" data-id="${ data.snippet.resourceId.videoId }">
				<img src="${ data.snippet.thumbnails.medium.url }" />
				<p>${ data.snippet.title }</p>
			</a>
		</li>`;
	}

	playlist_template( response ) {
		return `<div class="ypm_youtube-video-playlist">
			<div class="ypm_video-player">
				<iframe class="ypm_iframe" src="" width="560" height="315" frameborder="0" allowfullscreen></iframe>
			</div>

			<div class="ypm_video-list-wrapper">
				<ul class="ypm_video-list">
					${ response.items.map( data => this.playlist_items_template( data ) ).join('') }
				</ul>
			</div>
		</div>`;
	}

	_parse_data( response, element ) {
		const template       = this.playlist_template( response );
		const fragment       = new DOMParser().parseFromString( template, 'text/html' );
		const playlist       = fragment.body.childNodes[0];
		const video_items    = playlist.getElementsByClassName( 'ypm_video_items' );
		const iframe         = playlist.getElementsByClassName( 'ypm_iframe' )[0];
		const autoplay_state = this.iframe_options.autoplay;

		element.appendChild( playlist );

		// Other params: https://developers.google.com/youtube/player_parameters
		const video_url = id => `http://www.youtube.com/embed/${ id }?${ this._param( this.iframe_options ) }`;

		Array.from( video_items ).map( ( item, index ) => {
			index === 0 ? // On the first interation we don't ever want to autoplay video.
				this.iframe_options.autoplay = 0 :
				this.iframe_options.autoplay = autoplay_state;

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
