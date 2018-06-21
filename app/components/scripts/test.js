import YoutubePlaylistModule from './YoutubePlaylistModule.js';

// -------------->

const playlist_1 = document.getElementsByClassName( 'playlist-1' );
new YoutubePlaylistModule({
	element: playlist_1,
	max_results: 20,
	iframe_options: {
		showinfo: 0,
		autoplay: 1,
		rel: 0,
	}
});

// -------------->

const playlist_2 = document.getElementById( 'playlist-2' );
new YoutubePlaylistModule({
	element: playlist_2,
	playlist_id: 'PLkkY7rUh56sKCgtAeu0A0zXku1EbkTGNP'
});
