import YoutubePlaylistModule from './YoutubePlaylistModule.js';
import AUTH from './modules/auth';

// -------------->

const playlist_1 = new YoutubePlaylistModule({
	api_key: AUTH.api_key,
	element: document.getElementsByClassName( 'playlist-1' ),
	max_results: 20,
	iframe_options: {
		showinfo: 0,
		autoplay: 1,
		rel: 0,
	}
});
playlist_1.init();

// -------------->

const playlist_2 = new YoutubePlaylistModule({
	api_key: AUTH.api_key,
	element: document.getElementById( 'playlist-2' ),
	playlist_id: 'PLkkY7rUh56sKCgtAeu0A0zXku1EbkTGNP'
});
playlist_2.init();

// -------------->

class YoutubePlaylistModuleCustom extends YoutubePlaylistModule {
	playlist_items_template( data ) {
		const date = new Date( data.snippet.publishedAt ).toISOString().split('T')[0];

		return `<li>
			<a class="ypm_video_items" href="#" data-id="${ data.snippet.resourceId.videoId }">
				<p>
					${ date } <br/> <br/>
					${ data.snippet.description }
				</p>
			</a>
		</li>`;
	}
}

const playlist_3 = new YoutubePlaylistModuleCustom({
	api_key: AUTH.api_key,
	element: document.getElementById( 'playlist-3' ),
	max_results: 20,
	iframe_options: {
		autoplay: 1
	},
	playlist_id: 'PLLnpHn493BHFTDL9M1PKnxQwBwOZ8J-h4'
});
playlist_3.init();
