import parse_data from './modules/parse-data.js';
import AUTH       from './modules/auth';


export default class YoutubePlaylistModule {
	constructor( args ) {
		this.element        = args.element;
		this.playlist_id    = args.playlist_id;
		this.request_domain = 'https://www.googleapis.com/youtube/v3/playlistItems';
		this.max_results    = args.max_results ? args.max_results : '5';
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
			key: AUTH.api_key,
		};

		fetch( this.request_domain + '?' + this._param( query ) )
			.then( response => response.json() )
			.then( json_data => {
				parse_data( json_data, element );
			})
			.catch( error => console.error( error ) ); // eslint-disable-line
	}

	_param( object ) {
		return Object.entries( object ).map( ( [key, val] ) => `${key}=${val}` ).join('&');
	}
}
