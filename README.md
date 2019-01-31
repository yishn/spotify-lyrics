> **Warning:** Since 2018, Spotify has changed its method how it communicates with Spotify Webhelper. Since then, no one has figured out how the new communication works, which is why this project no longer works.

# spotify-lyrics

<img src="logo.png" width="156" height="156">

Shows lyrics from the song you're currently playing in Spotify. [Download the latest release.](https://github.com/yishn/spotify-lyrics/releases)

![Screenshot](screenshot.png)

## Features

- Lyrics autoscroll
- Automatically get lyrics from musixmatch
- Always on top window if needed
- Typography prettifier

## Building

Building spotify-lyrics requires [Node.js 6 or later](https://nodejs.org/en/download/) and npm. First, clone this repository:

~~~
$ git clone https://github.com/yishn/spotify-lyrics
$ cd spotify-lyrics
~~~

Install the dependencies using npm:

~~~
$ npm install
~~~

You can build using:

~~~
$ npm run build
~~~

The binaries will be created in `spotify-lyrics/dist/`. This app is optimized for Windows, but it should work on other platforms as well.
