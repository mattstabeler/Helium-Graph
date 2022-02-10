const https = require('https');
const fs = require('fs')


const MAKERS = {
	"13daGGWvDQyTyHFDCPz8zDSVTWgPNNfJ4oh31Teec4TRWfjMx53" : "Helium, Inc.",
	"13Zni1he7KY9pUmkXMhEhTwfUpL9AcEV1m2UbbvFsrU9QPTMgE3" : "Nebra",
	"14rb2UcfS9U89QmKswpZpjRCUVCVu1haSyqyGY486EvsYtvdJmR" : "SyncroB.it",
	"13ENbEQPAvytjLnqavnbSAzurhGoCSNkGECMx7eHHDAfEaDirdY" : "RAK/CalChip",
	"14sKWeeYWQWrBSnLGq79uRQqZyw3Ldi7oBdxbF6a54QboTNBXDL" : "Bobcat",
	"13Mpg5hCNjSxHJvWjaanwJPBuTXu1d4g5pGvGBkqQe3F8mAwXhK" : "Kerlink",
	"12zX4jgDGMbJgRwmCfRNGXBuphkQRqkUTcLzYHTQvd4Qgu8kiL4" : "LongAP",
	"13MS2kZHU4h6wp3tExgoHdDFjBsb9HB9JBvcbK9XmfNyJ7jqzVv" : "Smart Mimic",
	"14NBXJE5kAAZTMigY4dcjXSMG4CSqjYwvteQWwQsYhsu2TKN6AF" : "Seeed/SenseCap",
	"13v9iGhjvQUtVaZXcFFRCEbL1nPR4R8QJowBgMUcaGM2v1aV6mn" : "E-sun Electronics/Panther",
	"134C7Hn3vhfBLQZex4PVwtxQ2uPJH97h9YD2bhzy1W2XhMJyY6d" : "Pisces Miner",
	"13cbbZXzqwp6YMM5JvAu5T1TRhenENEJVU5Q8vpLhunQYE1Acpp" : "COTX Networks",
	"14fzfjFcHpDR1rTH8BNPvSi5dKBbgxaDnmsVPbCjuq9ENjpZbxh" : "Helium OG",

}

const BLOCK_RANGE = 1440;
let DENY_LIST = [];

try {
  const data = fs.readFileSync('./denylist.csv', 'utf8')
  DENY_LIST = data.trim().split(',').map(line => line.trim());
} catch (err) {
	console.log('Deny list not loaded');
  // console.error(err)
}

class API {
	constructor(url) {
		this.url = url;
	}

	async get() {
		return new Promise((resolve, reject) => {

			const options = {
				headers: { 'User-Agent': 'Helium-Graph-checker' }
			}
			https.get(this.url, options, (res) => {
			    let body = "";

			    res.on("data", (chunk) => {
			        body += chunk;
			    });

			    res.on("end", () => {
			        try {
			            let json = JSON.parse(body);
			            // do something with JSON
			            resolve(json);
			        } catch (error) {
			        	reject(error);
		            console.error(error.message);
			        };
			    });

			}).on("error", (error) => {
        	reject(error);
			    console.error(error.message);
			});
		})

	}
}


class HeliumGraph {


	constructor(swlat, swlon, nelat, nelon, name = undefined) {

		// this.dataPath = dataPath;
		this.data;

		this.swlat = swlat;
		this.swlon = swlon;
		this.nelat = nelat;
		this.nelon = nelon;
		this.name = name;
		this.loadAPI(swlat, swlon, nelat, nelon).then(loaded => {
			this.stats();
		});
	}

	async loadAPI(swlat, swlon, nelat, nelon) {
		let api = new API(`https://api.helium.io/v1/hotspots/location/box?swlat=${swlat}&swlon=${swlon}&nelat=${nelat}&nelon=${nelon}`);
		this.data = await api.get();
	}

	stats() {

		const data = this.data;

		let payers = {

		}
		let owners = {

		}

		let miners = {

		}

		let statuses = {

		}
		let added_block = {

		}

		let relayed = [];
		let deny_listed = [];

		data.data.map(miner => {
			miner.denied = DENY_LIST.includes(miner.address);

			owners[miner.owner] = [];
			payers[miner.payer] = [];
			statuses[miner.status.online] = [];
			let block_range =  miner.block_added - miner.block_added % BLOCK_RANGE;
			added_block[block_range] = [];
			if(miner.status && miner.status.listen_addrs && miner.status.listen_addrs.length > 0) {
				if(miner.status.listen_addrs[0].startsWith('/p2p/')) {
					relayed.push(miner);
				}
			}
		})

		for(let miner of data.data) {
			// console.log(miner.name);
			//
			//


			owners[miner.owner].push(miner)
			payers[miner.payer].push(miner);
			statuses[miner.status.online].push(miner);

			let block_range =  miner.block_added - miner.block_added % BLOCK_RANGE;

			added_block[block_range].push(miner);
			if(miner.denied) {
				deny_listed.push(miner);
			}

		}

		console.log(``);
		console.log(`Location: ${this.name ? this.name : ''}`);
		console.log('swlat', this.swlat);
		console.log('swlon', this.swlon);
		console.log('nelat', this.nelat);
		console.log('nelon', this.nelon);

		console.log('---')
		console.log('Makers', Object.keys(payers).length);

  	console.log(`Maker\t\tCount\tDenied`);
	  for(let maker in payers) {
	  	// console.log(maker);
	  	console.log(`${(MAKERS[maker] || maker).padEnd(15)}\t${payers[maker].length}\t${payers[maker].filter(miner => miner.denied).length}`);
	  	// console.log(MAKERS[maker] || maker, payers[maker].length);
		// console.log('Makers', Object.keys(payers).map(payer => `${MAKERS[payer]} - ${payers[payer].length}`).join(', '));
	  }

		console.log('---')

		console.log('---')
		console.log('Miners', data.data.length);
		console.log('Owners', Object.keys(owners).length);
		console.log('---')
		console.log('Miner status')

		for(let status in statuses) {
			console.log(status, statuses[status].length)
		}

		console.log('Relayed', relayed.length);
		console.log('On Deny List', deny_listed.length);


		console.log('---')
		console.log('Owners with 2 or more miners')

		let other_miners = 0;
		console.log(`Owner\tCount\tDenied\tDiff`);
		for(let owner in owners) {

			if(owners[owner].length > 1) {
				let denied = owners[owner].filter(miner => miner.denied).length;
				console.log(`${owner}\t${owners[owner].length}\t${denied}\t${(denied > 0 && owners[owner].length - denied) ? (owners[owner].length - denied) : '-'}`)
				// console.log(owner, owners[owner].length);
			}else {
				other_miners +=1;
			}
		}
		console.log('Owners with 1 miner', other_miners);
		console.log('---')

		console.log('Block range at which miner was added (~1 day = 1440 blocks), where more than 1 miner:')
		console.log('Block\tCount\tOn Deny List')

		let other_blocks = 0;
		for(let block in added_block) {
			if(added_block[block].length > 1) {

				console.log(`${block}\t${added_block[block].length}\t${added_block[block].filter(miner => miner.denied).length}`);
			}else {
				other_blocks += 1;
			}
		}
		console.log('Miners added in other block ranges', other_blocks);
		console.log('Total Number of block ranges', Object.keys(added_block).length);
		console.log('---')

	}
}

module.exports = HeliumGraph;