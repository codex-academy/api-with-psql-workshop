

document.addEventListener('alpine:init', () => {
	Alpine.data('missy', () => {

		return {
			garments: [],
			genderFilter: '',
			seasonFilter: '',
			maxPrice: 0,
			garmentList: {
				description: '',
				img: '',
				price: 0,
				season: '',
				gender: ''
			},

			init() {
				this.getGarments();
			},

			getGarments() {
				fetch('/api/garments')
					.then(r => r.json())
					.then(garmentsData => this.garments = garmentsData.data)
			},


			filterGarments() {
				fetch(`/api/garments?gender=${this.genderFilter}&season=${this.seasonFilter}`)
					.then(r => r.json())
					.then(garmentsData => this.garments = garmentsData.data)
			},

			filterPrice() {
				fetch(`/api/garments/${this.maxPrice}`)
					.then(r => r.json())
					.then(garmentsData => this.garments = garmentsData.data)
			},

			addGarment() {
				console.log(this.garmentList)
				try {
					axios
						.post('/api/garment', this.garmentList)
						.then(()=>this.getGarments())
						.catch(error => console.log(error))
				} catch (error) {

				}

				// .then(r => r.json())
				// .then(garmentsData => this.garments = garmentsData.data)
			},
			Show() {

			}
		};
	});




})
