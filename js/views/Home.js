import General from './General.js';

export default class extends General{
	constructor(){
		super();

		this.setTitle('Supplier::Lifesytle Outdoorgear');
	}
	async addHomeProduct(homeProducts, product_display_element){
		console.log(homeProducts);
		let displayInfo =`
			<div class="product_bunner">
				<h2>Shopping page</h2>
			</div>
		`;

		homeProducts.forEach((homeProduct) => {
			displayInfo += `
				<div class="product_box">
					<div class="product_img">
						<img src="./images/${homeProduct.product_image}">
					</div>
					<div class="product_info">
						<span><b>Name:</b> ${homeProduct.name}</span>
						<span><b>Brand:</b> ${homeProduct.brand_name}</span>
						<span><b>Price:</b> <label>${homeProduct.sale_price}</label><small>/=</small></span>
					</div>
					<div class="actions">
						<a class="add_cart">
							<span>Add to cart</span>
							<i class="las la-shopping-bag"></i>
						</a>
						<a class="p_details" data-product="${homeProduct.name}" data-id="${homeProduct.id}">
							<span>Details</span>
							<i class="las la-info"></i>
						</a>
					</div>
				</div>
			`;
		});

		product_display_element.innerHTML = displayInfo;
	}
	async getPage(){
		return `
		<section class="page" id="home">
			<div class="home_products">
				<aside>
					<label class="aside_title">Categories</label>
					<ul class="aside_details" id="home_categories">
					</ul>
					<label class="aside_title">Brands</label>
					<ul class="aside_details" id="home_brands">
					</ul>
					<label class="aside_title">Colors</label>
					<ul class="aside_details" id="home_colors">
					</ul>
				</aside>
				<div class="product_display">
				</div>
			</div>
		</section>
		`;
	}

	getPFDetails(product_info, colour = ''){
		let index = colour;
		if(colour == ""){
			let info = (Object.keys(product_info));
			index = info[0];
		}
		

		return `
			<div class="product_full_details">
				<div class="header">
					<span>Product Information</span>
					<i class="las la-times" id="closeP_details"></i>
				</div>
				<div class="product_full_img">

					<div class="p_infor">
						<h2>${product_info[index].name}</h2>
						<label><b>Category: </b>${product_info[index].category_name}</label>
						<label><b>Product Code: </b>${product_info[index].product_code}</label>
						<label><b>Brand: </b> ${product_info[index].brand_name}</label>
					</div>

					<img src="./images/${(product_info[index].product_image == null) ? 'default.png' : product_info[index].product_image}">
				</div>
				<div class="product_full_info">
					<div class="available_colors" id="home_available_colors">
						<b>Select Color</b>
						<span class="selected">Black</span>
						<span>Brown</span>
						<span>Green</span>
						<span>Navy</span>
						<span>Maroon</span>
						<span>Gray</span>
						<span>Blue</span>
					</div>
					<div class="available_size" id="home_available_size">
						<b>Select color to get available sizes</b>
						<span>45.5</span>
						<span class="selected">41.5</span>
						<span>45</span>
						<span>41</span>
						<span>32</span>
						<b>Enter Quantity</b>
						<label class="quantity_adjuster">
							<a href="#" class="remove_quantity">
								<i class="las la-minus"></i>
							</a>
							<input type="text" name="" id="item_d_quantity" value="1">
							<a href="#" class="add_quantity">
								<i class="las la-plus"></i>
							</a>
						</label>
					</div>
					<div class="desc">
						<b>Description</b>
						<p>${product_info[index].desc}</p>
					</div>
					<div class="conc">
						<span><b>@</b>${product_info[index].sale_price}/=</span>
						<button>Add to Cart <i class="las la-shopping-bag"></i></button>
					</div>
				</div>
			</div>
		`;
	}

	async getInventoryProducts(){
		const data = {
		    'action':'fetch_all_inventory_products'
	    }
	    this.ajaxRequest = super.run(data);

		super.storeToLocalStorage(this.ajaxRequest, data.action);

		return this.ajaxRequest;
	}

	async getCategories(){
		const data = {
		    'action':'fetch_all_categories'
	    }
	    this.ajaxRequest = super.run(data);

		// super.storeToLocalStorage(this.ajaxRequest, data.action);
		return this.ajaxRequest;
	}

	async getBrands(){
		const data = {
		    'action':'fetch_all_brands'
	    }
	    this.ajaxRequest = super.run(data);

		// super.storeToLocalStorage(this.ajaxRequest, data.action);
		return this.ajaxRequest;
	}
	async getColors(){
		const data = {
		    'action':'fetch_all_available_colors'
	    }
	    this.ajaxRequest = super.run(data);

		super.storeToLocalStorage(this.ajaxRequest, data.action);
		return this.ajaxRequest;
	}
}