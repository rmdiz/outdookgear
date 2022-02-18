import General from './General.js';

export default class extends General{
	constructor(){
		super();

		this.setTitle('Supplier::Lifesytle Outdoorgear');
	}

	async getPage(){
		return `
		<section class="page" id="sales">
			<div class="our_products">
				<div class="heading">
					<label><i class="las la-list"></i> Sales </label>
					<button><span></span><i class="las la-ellipsis-h"></i></button>
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
									<span>Product</span>
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
									<span>Branch</span>
									<i class="las la-sort"></i>
								</label>
							</th>
							<th>
								<label>
									<span>Attendant</span>
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
									<span>Date</span>
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
					<tbody id="sale_list">
					</tbody>
				</table>
			</div>
		</section>
		`;
	}

	performOperation(ID, action, info={}){
    	const data = {
		    'action': action, 
		    'id': ID,
		    'data': info
		}

        this.ajaxRequest = super.run(data);
        // console.log(this.ajaxRequest);
        return this.ajaxRequest;
    }

   	generateSales() {
    	let tr = '';
    	let sales = this.performOperation(null, 'get_sales', null);
    	sales.always(function(data){
            // console.log(data);
            if(data.response == 'success'){
		    	data.message.forEach((sale) => {
			    	tr += `
			    		<tr>
							<td><label>${sale.product_code}</label></td>
							<td><label>${sale.product_name}</label></td>
							<td><label>${sale.category_name}</label></td>
							<td><label>${sale.sale_price}</label></td>
							<td><label>${sale.brand_name}</label></td>
							<td><label>${sale.quantity}</label></td>
							<td><label>${sale.branch_location}</label></td>
							<td><label>${sale.username}</label></td>

							<td>
								<label>
									<span class="status s_active">Sold</span>
								</label>
							</td>
							<td><label>${sale.purchase_date.split(' ')[0]} <b>${sale.purchase_date.split(' ')[1]}</b></label></td>

							<td>
								<label>
									<a href="#" data-purchase_id = '${sale.purchase_id}'>
										<i class="las la-braille"></i>
									</a>
									<a href="#" data-purchase_id = '${sale.purchase_id}'>
										<i class="las la-edit"></i>
									</a>
									<a href="#" data-purchase_id = '${sale.purchase_id}'>
										<i class="las la-trash-alt"></i>
									</a>
								</label>
							</td>
						</tr>
			    	`;	

		    	});

		    	document.getElementById('sale_list').innerHTML = tr;
			}
        });

    }

}