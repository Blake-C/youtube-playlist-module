import lscache    from 'lscache';
import parse_data from './modules/parse-data.js';
import AUTH       from './modules/auth';


const playlist_id    = 'PLkkY7rUh56sKCgtAeu0A0zXku1EbkTGNP';
const request_domain = 'https://www.googleapis.com/youtube/v3/playlistItems';
const max_results    = '5';


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
