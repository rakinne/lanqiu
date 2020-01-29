const express = require('express');
const bodyParser = require('body-parser');
const nba = require('nba-api-client');
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

app.post('/players', (req, res, next) => {
	const playerName = `${req.body.firstname} ${req.body.lastname}`;
	const getPlayerID = nba.getPlayerID(playerName);
	const playerID = getPlayerID.PlayerID;
	const playerImg = nba.getPlayerHeadshotURL({ PlayerID: playerID });
	const teamImg = nba.getTeamLogoURLs('HOU');

	res.render('players', { name: playerName, playerImg: playerImg, teamImg: teamImg });
	console.log(playerID);
});

app.listen(port, () => {
	console.log('now listening on port ' + port);
});
