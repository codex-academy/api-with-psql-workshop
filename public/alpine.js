

document.addEventListener('alpine:init', () => {
	Alpine.data('missy', () => {

		return {
			garments: [],
			genderFilter: '',
			seasonFilter: '',
			maxPrice:0,
			garmentList:{
				description:'',
				image:'',
				price:'',
				season:'',
				gender:''
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

			addGarment(){
				console.log(this.garmentList)
				fetch(`/api/garments/`)
				.then(r => r.json())
				.then()
			},
			Show(){

			}
		};
	});




})
