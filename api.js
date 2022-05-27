module.exports = function (app, db) {

	app.get('/api/test', function (req, res) {
		res.json({
			name: 'joe'
		});
	});

	app.get('/api/garments', async function (req, res) {

		const { gender, season } = req.query;
		let garments = await db.many('select * from garment');
		if(season  && !gender) {
			garments = await db.many(`select * from garment where season = $1`,[season]);
		}
		if(gender && !season){
			garments = await db.many(`select * from garment where gender = $1`,[gender])
		}
		if(season && gender){
			garments = await db.many(`select * from garment where gender = $1 and season = $2`,[gender,season])
		}
		res.json({
			data: garments
		})
	});
	
	app.put('/api/garment/:id', async function (req, res) {
		
		try {
			
			const { id } = req.params;
			const garment = await db.one(`select * from garment where id = $1`, [id]);
			
			let params = { ...garment, ...req.body };
			const { description, price, img, season, gender } = params;
			
			await db.none(`update garment set description = $1, price = $2, img = $3, season= $4, gender = $5 where id=$6`, [description, price, img, season, gender , id])

			res.json({
				status: 'success'
			})
		} catch (err) {
			console.log(err);
			res.json({
				status: 'error',
				error: err.message
			})
		}
	});

	app.get('/api/garment/:id', async function (req, res) {

		try {
			const { id } = req.params;
			// get the garment from the database
			const garment = await db.one(`select * from garment where id = $1`, [id]);

			res.json({
				status: 'success',
				data: garment
			});

		} catch (err) {
			console.log(err);
			res.json({
				status: 'error',
				error: err.message
			})
		}
	});


	app.post('/api/garment/', async function (req, res) {

		try {

			const { description, price, img, season, gender } = req.body;
			// insert a new garment in the database
			 await db.none(`insert into garment( description, gender,price,img,season) values($1,$2,$3,$4,$5) on conflict do nothing`, [ description, gender,price,img,season]);
		
			res.json({
				status: 'success',

			});

		} catch (err) {
			console.log(err);
			res.json({
				status: 'error',
				error: err.message
			})
		}
	});
	app.get('/api/garments/grouped', async function (req, res) {
		const result = await db.many(`select count(*), gender from garment group by gender ORDER BY gender  deSC`);
		
		res.json({
			data: result
		})
	});


	app.get('/api/garments/:price', async function (req, res) {

		const { price } = req.params;
		const results = await db.manyOrNone(`select * from garment where price <= $1`,[price])
	

		res.json({
			data: results
		})
	});


	app.delete('/api/garments', async function (req, res) {

		try {
			const { gender } = req.query;
			// delete the garments with the specified gender

			res.json({
				status: 'success'
			})
		} catch (err) {
			// console.log(err);
			res.json({
				status: 'success',
				error : err.stack
			})
		}
	});


}