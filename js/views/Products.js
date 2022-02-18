import General from './General.js';

export default class extends General{
	constructor(){
		super();
		this.ajaxRequest = null;

		this.setTitle('Products::Lifesytle Outdoorgear');
	}

	async addInventory(inventory_list, inventoryTableBody){
		console.log(inventory_list);
		let inventory = ``;
		let count = 1;
		if(inventory_list != "Nothing found"){
			inventory_list.forEach((inventory_item) => {
				let background = ((count % 2) == 0) ? "white" : 'ghostwhite';
				count ++;

				inventory += `
							<tr class = "${background}">
								<td><label>${inventory_item.product_code}</label></td>
								<td><label>${inventory_item.name}</label></td>
								<td><label>${inventory_item.category}</label></td>
								<td><label>${inventory_item.buy_price}</label></td>
								<td><label>${inventory_item.sale_price}</label></td>
								<td><label>${inventory_item.brand}</label></td>
								<td><label>${inventory_item.quantity}</label></td>
								<td>
									<label>
										<span class="status s_active">${inventory_item.status_name}</span>
									</label>
								</td>
								<td><label>${inventory_item.branch}</label></td>
								<td>
									<label>
										<a href="#">
											<i class="las la-braille"></i>
										</a>
										<a href="#" data-inventoryid="${inventory_item.id}" class="edit_inventory">
											<i class="las la-edit"></i>
										</a>
										<a href="#">
											<i class="las la-trash-alt"></i>
										</a>
									</label>
								</td>
							</tr>
					`;
			});

			inventoryTableBody.innerHTML = inventory;
		}
	}


	async addProduct(product_list, productTableBody){
		let product = ``;
		let count = 1;
		Object.keys(product_list).forEach((product_item) => {
			let background = ((count % 2) == 0) ? "white" : 'ghostwhite';
			count ++;
			product += `
						<tr class = "${background}">
							<td><label>${product_list[product_item].product_code}</label></td>
							<td><label>${product_list[product_item].name}</label></td>
							<td><label>${product_list[product_item].category_name}</label></td>
							<td><label>${product_list[product_item].buy_price}</label></td>
							<td><label>${product_list[product_item].sale_price}</label></td>
							<td><label>${product_list[product_item].brand_name}</label></td>
							<td>
								<label>
									<a href="#" data-productid="${product_list[product_item].id}">
										<i class="las la-braille"></i>
									</a>
									<a href="#" data-productid="${product_list[product_item].id}" class="edit_product">
										<i class="las la-edit"></i>
									</a>
									<a href="#" data-productid="${product_list[product_item].id}">
										<i class="las la-trash-alt"></i>
									</a>
								</label>
							</td>
						</tr>
				`;
		});

		productTableBody.innerHTML = product;
	}

	async getPage(){
		return `
		<section class="page" id="products">
			<div class="our_products">
				<div class="heading">
					<label>Inventory List <i class="las la-chevron-down"></i></label>
					<button id="add_inventory"><span>Add New</span><i class="las la-plus"></i></button>
				</div>
				<table class="inventory_list">
					<thead>
						<tr>
							<th>
								<label>
									<span>Code</span>
									<i class="las la-sort"></i>
								</label>
							</th>
							<th>
								<label>
									<span>Name</span>
									<i class="las la-sort"></i>
								</label>
							</th>
							<th>
								<label>
									<span>Category</span>
									<i class="las la-sort"></i>
								</label>
							</th>
							<th>
								<label>
									<span>Buy Price</span>
									<i class="las la-sort"></i>
								</label>
							</th>
							<th>
								<label>
									<span>Sale Price</span>
									<i class="las la-sort"></i>
								</label>
							</th>
							<th>
								<label>
									<span>Brand</span>
									<i class="las la-sort"></i>
								</label>
							</th>
							<th>
								<label>
									<span>Quantity</span>
									<i class="las la-sort"></i>
								</label>
							</th>
							<th>
								<label>
									<span>Status</span>
									<i class="las la-sort"></i>
								</label>
							</th>
							<th>
								<label>
									<span>Branch</span>
									<i class="las la-sort"></i>
								</label>
							</th>
							<th>
								<label>
									<span>Action</span>
								</label>
							</th>
						</tr>
					</thead>
					<tbody id="inventory_items">
					</tbody>
				</table>
				<div class="heading">
					<label>Product List <i class="las la-chevron-right"></i></label>
					<button id="add_product"><span>Add New</span><i class="las la-plus"></i></button>
				</div>
				<table class="product_list">
					<thead>
						<tr>
							<th>
								<label>
									<span>Code</span>
									<i class="las la-sort"></i>
								</label>
							</th>
							<th>
								<label>
									<span>Name</span>
									<i class="las la-sort"></i>
								</label>
							</th>
							<th>
								<label>
									<span>Category</span>
									<i class="las la-sort"></i>
								</label>
							</th>
							<th>
								<label>
									<span>Buy Price</span>
									<i class="las la-sort"></i>
								</label>
							</th>
							<th>
								<label>
									<span>Sale Price</span>
									<i class="las la-sort"></i>
								</label>
							</th>
							<th>
								<label>
									<span>Brand</span>
									<i class="las la-sort"></i>
								</label>
							</th>
							<th>
								<label>
									<span>Action</span>
								</label>
							</th>
						</tr>
					</thead>
					<tbody id= "product_items">
					</tbody>
				</table>
			</div>
		</section>
		`;
	}

	uploadFile(formData){
	    this.ajaxRequest = super.uploadFile(formData);
	    // console.log(this.ajaxRequest);
	    return this.ajaxRequest;
	}
	async addPopups(){
			// <div class="popups">

		return `
			<!-- POPUPS -->
			<form class="entry inventory_in" method="post" action="index.html?pg=products">
				<div class="entry_header">
					<span>Add New Inventory</span>
					<i class="las la-times"></i>
				</div>
				<div class="entry_body">
					<input type="hidden" id="add_inventory_product_id">

					<div class="field">
						<label>Product</label>
						<select id="add_inventory_product_name">
						</select>
						<i class="las la-chevron-down"></i>
					</div>
					<div class="field">
						<label>Code</label>
						<select id="add_inventory_product_code">
						</select>
						<i class="las la-chevron-down"></i>
					</div>
					<div class="field">
						<label>Category</label>
						<select id="add_inventory_category">
						</select>
						<i class="las la-chevron-down"></i>
					</div>
					<div class="field">
						<label>Brand</label>
						<select id="add_inventory_brand">
						</select>
						<i class="las la-chevron-down"></i>
					</div>
					<div class="field">
						<label>Buy Price</label>
						<input type="text" id="add_inventory_buy_price" placeholder="Enter product buy price">
					</div>
					<div class="field">
						<label>Sale Price</label>
						<input type="text" id="add_inventory_sale_price" placeholder="Enter product sale price">
					</div>
					<div class="field">
						<label>Quantity</label>
						<input type="text" id="add_inventory_quantity" placeholder="Enter inventory quantity">
					</div>
					<div class="field">
						<label>Branch</label>
						<select id="add_inventory_branch">
							<option selected="true">Choose product code</option>
							<option>PTST28BL</option>
							<option>PTST30BL</option>
						</select>
						<i class="las la-chevron-down"></i>
					</div>
					<div class="field">
						<label>Status</label>
						<select id="add_inventory_status">
							<option selected="true">Choose product code</option>
							<option value="1">Active</option>
							<option value="2">Closed</option>
						</select>
						<i class="las la-chevron-down"></i>
					</div>
					<div class="field">
						<label>Discount</label>
						<select id="add_inventory_discount">
							<option selected="true">Choose discount</option>
							<option>Bulk</option>
							<option>Nil</option>
						</select>
						<i class="las la-chevron-down"></i>

					</div>
				</div>
				<div class="entry_footer">
					<input type="submit" name="saveInventory" id="saveInventory" value="Save">
					<input type="reset" name="clearFields" value="Clear">
				</div>
			</form>

			<form class="entry product_in" method="post" action="index.html?pg=products" enctype="multipart/form-data">
				<div class="entry_header">
					<span>Add New Product</span>
					<i class="las la-times"></i>
				</div>
				<div class="entry_body">
					<div class="field">
						<label>Code</label>
						<input type="text" id="create_product_product_code" placeholder="Enter product code">
					</div>
					<div class="field">
						<label>Product</label>
						<input type="text" id="create_product_product_name" placeholder="Enter product name">
					</div>
					<div class="field">
						<label>Category</label>
						<select id="create_product_category">
							<option selected="true">Choose category</option>
							<option>Pants</option>
							<option>Short</option>
						</select>
						<i class="las la-chevron-down"></i>
					</div>
					<div class="field">
						<label>Sapplier</label>
						<select id="create_product_supplier">
							<option selected="true">Choose brand</option>
							<option>511</option>
							<option>Under Armour</option>
						</select>
						<i class="las la-chevron-down"></i>	
					</div>
					<div class="field">
						<label>Buy Price</label>
						<input type="text" id="create_product_buy_price" placeholder="Enter product buy price">
					</div>
					<div class="field">
						<label>Sale Price</label>
						<input type="text" id="create_product_sale_price" placeholder="Enter product sale price">
					</div>
					<div class="field">
						<label>Brand</label>
						<select id="create_product_brand">
							<option selected="true">Choose brand</option>
							<option>511</option>
							<option>Under Armour</option>
						</select>
						<i class="las la-chevron-down"></i>
					</div>
					<div class="field">
						<label>Color</label>
						<select id="create_product_color">
							<option selected="true">Choose brand</option>
							<option>511</option>
							<option>Under Armour</option>
						</select>
						<i class="las la-chevron-down"></i>
					</div>
					<div class="field">
						<label>Size</label>
						<select id="create_product_size">
							<option selected="true">Choose brand</option>
							<option>511</option>
							<option>Under Armour</option>
						</select>
						<i class="las la-chevron-down"></i>
					</div>
					<div class="image_upload">
						<label>Image</label>
						<div class="image_display">
							<img src="./images/default.png" id="image_display">
							<input type="file" id="image_upload_btn" name="image_upload_btn">
							<label  for="image_upload_btn" >
								<i class="las la-plus" title="Click to add new image for the product"></i>
							</label>
						</div>
					</div>
					<div class="multi_line_field">
						<label>Remark</label>
						<textarea id="create_product_remarks" placeholder="Enter product remark"></textarea>
					</div>
					<div class="multi_line_field">
						<label>Discription</label>
						<textarea id="create_product_product_discription" placeholder="Enter product discription"></textarea>
					</div>
				</div>
				<div class="entry_footer">
					<input type="submit" name="saveProduct" id="productOperations" value="Save">
					<input type="reset" name="clearFields" value="Clear">
				</div>
			</form>
		`;
			// </div>
	}

	addProductToInventory(inventoryProduct){
		const data = {
		    'action':'add_product_to_inventory', 
		    'data': inventoryProduct
		}

        this.ajaxRequest = super.run(data);
        // console.log(this.ajaxRequest);
        // console.log(data)
        return this.ajaxRequest;
    }
    getProductDetails(productID){
    	const data = {
		    'action':'get_product_details', 
		    'product_id': productID
		}

        this.ajaxRequest = super.run(data);
        // console.log(this.ajaxRequest);
        // console.log(data)
        return this.ajaxRequest;
    }
    search(search_field, search_value, route){
    	const data = {
    		'action': route,
    		'search_field': search_field,
    		'search_value': search_value
    	}
        this.ajaxRequest = super.run(data);
        // console.log(this.ajaxRequest )
        return this.ajaxRequest;
    	
    }
    specificityOperation(ID, action, info={}){
    	const data = {
		    'action': action, 
		    'id': ID,
		    'data': info
		}

        this.ajaxRequest = super.run(data);
        // console.log(this.ajaxRequest);
        // console.log(data)
        return this.ajaxRequest;
    }
	saveProduct(Product){
		const data = {
		    'action':'add_product', 
		    'data': Product
		}

        this.ajaxRequest = super.run(data);
        // console.log(this.ajaxRequest);
        // console.log(data)
        return this.ajaxRequest;
    }
	updateProduct(Product){
		const data = {
		    'action':'update_product', 
		    'data': Product
		}

        this.ajaxRequest = super.run(data);
        // console.log(this.ajaxRequest);
        // console.log(data)
        return this.ajaxRequest;
    }

	async getProducts(){
		const data = {
		    'action':'fetch_all_products'
	    }
	    this.ajaxRequest = super.run(data);

		super.storeToLocalStorage(this.ajaxRequest, data.action);

		return this.ajaxRequest;
	}

	async getInventory(){
		const data = {
		    'action':'fetch_all_inventory'
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

		super.storeToLocalStorage(this.ajaxRequest, data.action);
		return this.ajaxRequest;
	}

	async getBranches(){
		const data = {
		    'action':'fetch_all_branches'
	    }
	    this.ajaxRequest = super.run(data);

		super.storeToLocalStorage(this.ajaxRequest, data.action);
		return this.ajaxRequest;
	}

	async getBrands(){
		const data = {
		    'action':'fetch_all_brands'
	    }
	    this.ajaxRequest = super.run(data);

		super.storeToLocalStorage(this.ajaxRequest, data.action);
		return this.ajaxRequest;
	}
	async getColors(){
		const data = {
		    'action':'fetch_all_colors'
	    }
	    this.ajaxRequest = super.run(data);
	    console.log(this.ajaxRequest);
		super.storeToLocalStorage(this.ajaxRequest, data.action);
		return this.ajaxRequest;
	}
	async getDiscounts(){
		const data = {
		    'action':'fetch_all_discounts'
	    }
	    this.ajaxRequest = super.run(data);

		super.storeToLocalStorage(this.ajaxRequest, data.action);
		return this.ajaxRequest;
	}
	async getStatus(){
		const data = {
		    'action':'fetch_all_status'
	    }
	    this.ajaxRequest = super.run(data);

		super.storeToLocalStorage(this.ajaxRequest, data.action);
		return this.ajaxRequest;
	}
	async getSuppliers(){
		const data = {
		    'action':'fetch_all_suppliers'
	    }
	    this.ajaxRequest = super.run(data);

		super.storeToLocalStorage(this.ajaxRequest, data.action);
		return this.ajaxRequest;
	}
	async getSizes(){
		const data = {
		    'action':'fetch_all_sizes'
	    }
	    this.ajaxRequest = super.run(data);

		super.storeToLocalStorage(this.ajaxRequest, data.action);
		return this.ajaxRequest;
	}
}