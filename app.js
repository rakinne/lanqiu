const express = require('express');
const bodyParser = require('body-parser');
const nba = require('nba-api-client');
const Player = require('./public/js/player.js');

const app = express();
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
	const playerName = `${req.body.firstname} ${req.body.lastname}`;
	const getPlayerID = nba.getPlayerID(playerName);
	const playerID = getPlayerID.PlayerID;
	const player = new Player(playerName, playerID);

	console.log(nba.getPlayerHeadshotURL(playerName));
	console.log(playerID);
	console.log(player.ballerImg());

	res.render('players', { name: playerName, playerImg: player.ballerImg() });
});

app.listen(port, () => {
	console.log('now listening on port ' + port);
});
