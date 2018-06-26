Youtube Playlist Module
=======================
A web based javascript module for displaying youtube playlists.

## Installation
```sh
npm install youtube-playlist-module -S
```

## Initiate Module
Follow these instructions to get your YouTube API Key: [YouTube Data API Overview](https://developers.google.com/youtube/v3/getting-started)
```html
<div class="playlist-1" data-playlist="PL0zVEGEvSaeEd9hlmCXrk5yUyqUag-n84"></div>
```
```javascript
import YoutubePlaylistModule from 'youtube-playlist-module';

// Where '##########' is your YouTube API Key.
const playlist_element = document.getElementsByClassName( 'playlist-1' );
const playlist_1 = new YoutubePlaylistModule({
  api_key: '##########',
  element: playlist_element,
  max_results: 20,
  iframe_options: {
    showinfo: 0,
    autoplay: 1,
    rel: 0,
  }
});
playlist_1.init();
```

## Initialize Using Element ID
```javascript
const playlist_2 = new YoutubePlaylistModule({
  api_key: '##########',
  element: document.getElementById( 'playlist-2' ),
  playlist_id: 'PL0zVEGEvSaeEd9hlmCXrk5yUyqUag-n84'
});
playlist_2.init();
```

## Extend Module
```javascript
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
  api_key: '##########',
  element: document.getElementById( 'playlist-3' ),
  max_results: 20,
  iframe_options: {
    autoplay: 1
  },
  playlist_id: 'PLLnpHn493BHFTDL9M1PKnxQwBwOZ8J-h4'
});
playlist_3.init();
```
Note: If you are using babel to transpile your scripts, extending this class might not work. 
The only solution I know of would be to include this module within your scripts and to not
import it from npm.

## Styles
To import the styles using SCSS
```scss
@import 'youtube-playlist-module/app/components/styles/styles';
```
- or you can grab the CSS file from the distribution directory.
- or you can styles the module yourself.

## Contact
   * Twitter: [https://twitter.com/BlakeCerecero][1]
   * Portfolio: [http://digitalblake.com/][2]

[1]: https://twitter.com/BlakeCerecero "https://twitter.com/BlakeCerecero"
[2]: http://digitalblake.com/ "http://digitalblake.com/"

This content is released under the [MIT License](http://opensource.org/licenses/MIT).
