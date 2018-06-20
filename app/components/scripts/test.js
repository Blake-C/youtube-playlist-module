import YoutubePlaylistModule from './YoutubePlaylistModule.js';

// -------------->

const playlist_1 = document.getElementsByClassName( 'playlist-1' );
const args = {
	element: playlist_1
};
const playlist_init_1 = new YoutubePlaylistModule( args );
playlist_init_1.init();

// -------------->

const playlist_2      = document.getElementById( 'playlist-2' );
const args_2 = {
	element: playlist_2,
	playlist_id: 'PLkkY7rUh56sKCgtAeu0A0zXku1EbkTGNP'
};
const playlist_init_2 = new YoutubePlaylistModule( args_2 );
playlist_init_2.init();


