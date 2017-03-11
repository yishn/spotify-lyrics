# spotify-lyrics

<img src="logo.png" width="156" height="156">

Shows lyrics from the song you're currently playing in Spotify.

![Screenshot](screenshot.png)

## Features

- Autoscroll lyrics
- Automatically get lyrics from musixmatch
- Always on top window if needed

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

The binaries will be created in `spotify-lyrics/bin/`. This app is optimized for Windows, but it should work on other platforms as well.
