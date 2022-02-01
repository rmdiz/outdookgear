import General from './General.js';

export default class extends General{
	constructor(){
		super();

		this.setTitle('Home::Lifesytle Outdoorgear');
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
						<a class="add_cart" data-product="${homeProduct.name}" data-id="${homeProduct.id}" data-size="${homeProduct.size_label}">
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
		let info = (Object.keys(product_info));
		if(colour == ''){
			index = info[0];
		}else{
			index = info[colour];

		}
		console.log(product_info, colour )
		

		return `
			<div class="product_full_details">
				<div class="header">
					<span>Product Information</span>
					<i class="las la-times" id="closeP_details"></i>
				</div>
				<div class="product_full_img">

					<div class="p_infor">
						<h2 id="pName">${product_info[index].name}</h2>
						<label><b>Category: </b><span id="pCategory">${product_info[index].category_name}</span></label>
						<label><b>Product Code: </b><span id="pProductCode">${product_info[index].product_code}</span></label>
						<label><b>Brand: </b> <span id="pBrandName">${product_info[index].brand_name}</span></label>
					</div>

					<img id="pImage" src="./images/${(product_info[index].product_image == null) ? 'default.png' : product_info[index].product_image}">
				</div>
				<div class="product_full_info">
					<div class="available_colors" id="home_available_colors">
						<b>Select Color</b>
					</div>
					<div class="available_size" id="home_available_size">
						<b>Select color to get available sizes</b>
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
						<p id="pDesc">${product_info[index].desc}</p>
					</div>
					<div class="conc">
						<span id="product_price"><b>@</b><b id="pPrice">${product_info[index].sale_price}</b><small>/=</small></span>
						<button id="add_cart" data-id="${product_info[index].id}">Add to Cart <i class="las la-shopping-bag"></i></button>
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

	async addToCart(key, quantity){
		let msg = "Product added to cart";
		if(localStorage.getItem('outdoorgear')){
            var site = JSON.parse(localStorage.getItem('outdoorgear'));
			let product_info = site.fetch_all_inventory_products[key.split('-')[0]];
			if(typeof(site.cart[key]) != "object"){
                let product_details = {
                    'id': product_info.id,
                    'product_code': product_info.product_code,
                    'name': product_info.name,
                    'brand': product_info.brand_name,
                    'size': product_info.size_label,
                    'color': product_info.colour_name,
                    'image': product_info.product_image,
                    'quantity': quantity,
                    'price': product_info.sale_price,
                }
				site.cart[key] = product_details ;
			    localStorage.setItem('outdoorgear', JSON.stringify(site));
			}else{
				msg = 'Item already exits in cart';
			}
			let cart = site.cart;
            return  {cart, msg};
        }
				
	}
}

