# Helium Graph

Get a list of hotspots for an area from the Helium API and generate some stats. 


```
const HeliumGraph = require('./HeliumGraph.js');

const sheppy = new HeliumGraph(
		51.329952578546454,
		0.687300943228313,
		51.460567587264116,
		0.9253297326347784,
		'Isle of Sheppey'
);

```

## Deny list (optional)

Download the denylist from https://github.com/helium/denylist for additional data. 


## Output


Example output: 


```
Location: Isle of Sheppey
swlat 51.329952578546454
swlon 0.687300943228313
nelat 51.460567587264116
nelon 0.9253297326347784
---
Makers 7
Maker		Count	Denied
Seeed/SenseCap 	7	0
Bobcat         	25	0
RAK/CalChip    	10	0
COTX Networks  	3	0
Pisces Miner   	79	48
Nebra          	2	0
Helium OG      	2	0
---
---
Miners 128
Owners 70
---
Miner status
online 66
offline 62
Relayed 74
On Deny List 48
---
Owners with 2 or more miners
Owner	Count	Denied	Diff
12zLDP9hNK29uUPPekDkJ98WtXX2e3jqHpJvrhDJSKaxkVDA7UL	2	2	-
13ybi5y869wA2m9zdErHd6VQiEQS7uh8W4KzCJSPk4X5wxZWk8v	2	2	-
13YKzVugufyAypptntsr8gYVoD3YtpVQhsy5Gry2TTRk4utXwWA	3	2	1
13z2utDnW1MERE86u4YM1rGtbPDQkvxRhf9JD5K6Qfzjgq5g86V	3	0	-
13qMYJqvmEFfj7ydWxdJ8DTjV4TCaXB2ofxGVmbvSPjmLiR12so	2	0	-
139etLVr64S9Bm7GcNuk1LnjmnAd6iAp94CmvtqSaPduCeDwmHe	6	0	-
14XTF8T8Y2tAjsL7hHByviMvERVSFDpuNoeShQ2zujd72BUMHzp	2	0	-
14GrJEg79CCQbU2fM6FkkQXES1mZcdBu6S8TnHJKUTQxTkoxxbf	2	0	-
147G9LQWnUY4zgADSD8vCgPL7fyaEvkrD3qEDeYQQeDgLUyQKR5	2	2	-
14XaLxE2kPfXp2qWu7H6WdPUb4r2YEhNxPHt6oM4GPJ1LUxD9MH	10	10	-
14mqn3Qe4BQtQeZRnSojENLCZ8LhnVzoAro6FduQtUXA3gFkCdy	2	0	-
13dncCMMqE5VxGWHrCeedCYjjduvkQZZf3ZqQ2wWKXSb3yhj11v	4	4	-
14bSnWWMqEXXGQ3RQitiKG32uddTbhvQFPyqaY2RVotnHAnYq4x	3	3	-
13oFy77BDdCtudNxVCFYJ2dvmRbGQoEJ25X6GiWaWhSoXBa7hEo	2	0	-
13G4Drc9AEwiYniC7Q5ddB68sqc4wsZ3NhBGDVkFqqWMmx7eYzs	4	1	3
14Sp7TGsHj8nv8VhutMh5CYsgUmw1MaHzbVKAYnPXgbTi3fgk9o	4	0	-
12xJoFrUsnE7T1dXBNTDoDSjiFxtus1e1vzijvA531bGSBWY1yB	4	1	3
146zxkq6DazKeLZ9pNSHHezEUajK1Peik8iDw4oksJN3ktPm82H	3	2	1
14JLeeNUWaQEX2yutfTAkWddcsgqEJwEGhfDzY8eGM3Ekh4MCY9	2	2	-
13A24g5c5ALR2TxbkA4S9XQTebHUPExQGtLDJYnK9H2NFbaW463	2	1	1
12yyXGvMmTnbuke1eKKDVjfiDRSpxA2NNjgV6tKiSCWgrV3nz3Y	2	2	-
13hefq4uyePRFkjQvg8tsDdzx1pTXHr8iwcACojCBWyN2N2uYof	3	2	1
14CZUQvNjgcCHFRHdcuHWaC8e9PJ9BVcyFnLDQG7RfWpac8guM2	2	2	-
136315CGP3YadyUUjKuRw6ta3PkFg6Ey7HvD5nzpXNMemgBtduG	3	3	-
13MirAFJj5BJnCWtfiKafMnJBhfFZ42W8VgBLrZXwThvg2Th62d	3	3	-
146ucP1youkC74YSqUi6aSPJawvK1bw2H3ZZqfwTaeHeUWCd7xp	2	0	-
14ESXjtxq2wchNDfPm1aFdFuHYw5XdbhHhBBWoBSJNcNz1H7Npk	2	0	-
14dTqnnNnUUdDEPfRkaXNCML4PcLYkCKiE4JwytLYHA3rtj32rw	2	0	-
13NsbUiA14kAkFgD5nRrvDCsb8jV6gWZapRDRdJqtrStDE8KAtM	2	0	-
13Gyv9Wr2Pk4WqbnWj4AaG3nYQnTMLsw6gc6RhQnpk9TJGAm8x6	2	0	-
14h6vbDTLE1ZoZU5v2g3schyrxZmdZmKy5tuYRZb47ygwDBsXDK	2	0	-
Owners with 1 miner 39
---
Block range at which miner was added (~1 day = 1440 blocks), where more than 1 miner:
Block	Count	On Deny List
973440	2	0
1010880	2	0
1031040	2	0
1087200	2	0
1103040	2	0
1111680	2	0
1128960	2	0
1131840	49	31
1133280	17	7
1139040	4	1
1140480	3	3
1175040	7	6
Miners added in other block ranges 34
Total Number of block ranges 46
---

```