# SpotifIO
Play with a group of friends to guess the song that is currently playing. Brag to your friends that you're the GOAT at recognizing songs.

# Node Modules You Need
In the client folder run
`npm install spotify-web-api-js semantic-ui-react react-bootstrap bootstrap`

In the auth-server folder run
`npm install`

# To Run the App Proper
1) Go on to Spotify and play a song.
2) On termainal go to `auth-server/authorization-server` and run `node app.js`
3) On another terminal go to `client` and run `npm run start`
4) Go to htttp://localhost:3000 and log in with your Spotify account.
5) You will know it is working when you see your song's album art blurred and artist name. Typing in the song name will play the next song in your spotify's queue

# Features to Add
-Play the music within the browser app
-Select a playlist within the app to choose the pool of songs to guess
-Integrate with SocketIO to get multiple users on one real time instance of the app
-LobbyHost system
-Scoring system
