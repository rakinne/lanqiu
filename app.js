const express = require('express');
const bodyParser = require('body-parser');
const nba = require('nba-api-client');
const Player = require('./public/js/player.js');
const Twitter = require('twitter');
const config = require('./config.js');

const app = express();
const twitter = new Twitter(config);
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
	// Getting the homepage
	res.render('index');
});

app.post('/player', (req, res, next) => {
	// getting player name and id from '/' route
	const playerName = `${req.body.firstname} ${req.body.lastname}`;
	const getPlayerID = nba.getPlayerID(playerName);
	const playerID = getPlayerID.PlayerID;
	const player = new Player(playerName, playerID);

	const get = twitter.get('search/tweets', { q: playerName }, (err, tweets, response) => {
		for (i = 0; i < tweets.statuses.length; i++) {
			if (!err) {
				const twitAr = [];
				twitAr.push(tweets.statuses[i].text);
			} else {
				console.log(err);
			}
		}
	});

	res.render('players', {
		name: playerName,
		playerImg: player.ballerImg(),
		tweets: tweetArr
	});

	// TODO: fix all this shit lol
});

app.listen(port, () => {
	console.log(`app now listening on ${port}`);
});
