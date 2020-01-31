const cheerio = require('cheerio');
const request = require('request');

class Player {
	constructor(player, id) {
		this.player = player;
		this.id = id;
	}

	ballerImg() {
		const playerName = this.player.split(' ');
		// const first = playerName[0];
		// const last = playerName[1];
		const id = this.id;
		const link = 'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/' + id + '.png';

		return link;
	}

	display() {
		console.log(this.player + ' came from class!');
	}
}

module.exports = Player;
