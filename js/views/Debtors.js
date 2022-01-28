import General from './General.js';

export default class extends General{
	constructor(){
		super();

		this.setTitle('Debtors::Lifesytle Outdoorgear');
	}

	async getPage(){
		return `
		<section class="page hide" id="dashboard">
			<div class="statistics">
				<div class="operation">
					<div class="card">
						<div class="card_stat">
							<span class="icon"><i class="las la-dolly-flatbed"></i></span>

							<span class="title">Orders</span>
							<span class="total">63</span>
						</div>
						<div class="order_branch">
							<span class="branch">
								<b>Arena Mall</b>
								<small>43</small>
							</span>
							<span class="branch">
								<b>Victoria Mall</b>
								<small>43</small>
							</span>
							<span class="branch">
								<b>Imperial Mall</b>
								<small>43</small>
							</span>
							<span class="branch">
								<b>Pulickal Hotel</b>
								<small>43</small>
							</span>
						</div>
					</div>
					<div class="card">
						<div class="card_stat">
							<span class="icon"><i class="las la-file-invoice-dollar"></i></span>

							<span class="title">Sales</span>
							<span class="total">63</span>
						</div>
						<div class="sale_branch">
							<span class="branch">
								<b>Arena Mall</b>
								<small>43</small>
							</span>
							<span class="branch">
								<b>Victoria Mall</b>
								<small>43</small>
							</span>
							<span class="branch">
								<b>Imperial Mall</b>
								<small>43</small>
							</span>
							<span class="branch">
								<b>Pulickal Hotel</b>
								<small>43</small>
							</span>
						</div>
					</div>
				</div>
				<div class="inventory">
					<div class="inventory_stat">
						<div class="single_stat">
							<span>347</span>
							<b>Pants</b>
						</div>
						
					</div>
					<div class="inventory_stat">
						
						<div class="single_stat">
							<span>347</span>
							<b>Pants</b>
						</div>
					</div>
					<div class="inventory_stat">
						<div class="stat">
							<span>347</span>
							<b>Products</b>
						</div>
						<div class="more">
							<span>Pants</span>
							<span>Pants</span>
							<span>Pants</span>
							<span>Pants</span>
							<span>Pants</span>
							<span>Backpacks</span>
							<span>Shorts</span>
							<span>Shirts</span>
						</div>
					</div>
					<div class="inventory_stat">
						
						<div class="single_stat">
							<span>347</span>
							<b>Pants</b>
						</div>
					</div>
					<div class="inventory_stat">
						
						<div class="single_stat">
							<span>347</span>
							<b>Pants</b>
						</div>
					</div>
					<div class="inventory_stat">
						
						<div class="single_stat">
							<span>347</span>
							<b>Pants</b>
						</div>
					</div>
					<div class="inventory_stat">
						
						<div class="single_stat">
							<span>347</span>
							<b>Pants</b>
						</div>
					</div>
				</div>
			</div>
			<div class="dash_info">
				<div class="roster">
					<table class="table">
						<thead>
							<tr>
								<th>
									<label>
										<span>ID</span>
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
										<span>Branch</span>
										<i class="las la-sort"></i>
									</label>
								</th>
								<th>
									<label>
										<span>Shift</span>
										<i class="las la-sort"></i>
									</label>
								</th>
								<th>
									<label>
										<span>Day</span>
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
						<tbody>
							<tr>
								<td><label>1002</label></td>
								<td>
									<label>
										<span class="attendant_image"><img src="./images/user.jpg"></span>
										<span>Olson Rogers</span>
									</label>
								</td>
								<td><label>Pulickal Hotel</label></td>
								<td><label>Evening</label></td>
								<td><label>Wednesday</label></td>
								<td>
									<label>
										<a href="#">
											<i class="las la-edit"></i>
										</a>
										<a href="#">
											<i class="las la-trash-alt"></i>
										</a>
									</label>
								</td>
							</tr>
							<tr>
								<td><label>1002</label></td>
								<td>
									<label>
										<span class="attendant_image"><img src="./images/user.jpg"></span>
										<span>Olson Rogers</span>
									</label>
								</td>
								<td><label>Pulickal Hotel</label></td>
								<td><label>Evening</label></td>
								<td><label>Wednesday</label></td>
								<td>
									<label>
										<a href="#">
											<i class="las la-edit"></i>
										</a>
										<a href="#">
											<i class="las la-trash-alt"></i>
										</a>
									</label>
								</td>
							</tr>
							<tr>
								<td><label>1002</label></td>
								<td>
									<label>
										<span class="attendant_image"><img src="./images/user.jpg"></span>
										<span>Olson Rogers</span>
									</label>
								</td>
								<td><label>Pulickal Hotel</label></td>
								<td><label>Evening</label></td>
								<td><label>Wednesday</label></td>
								<td>
									<label>
										<a href="#">
											<i class="las la-edit"></i>
										</a>
										<a href="#">
											<i class="las la-trash-alt"></i>
										</a>
									</label>
								</td>
							</tr>
							<tr>
								<td><label>1002</label></td>
								<td>
									<label>
										<span class="attendant_image"><img src="./images/user.jpg"></span>
										<span>Olson Rogers</span>
									</label>
								</td>
								<td><label>Pulickal Hotel</label></td>
								<td><label>Evening</label></td>
								<td><label>Wednesday</label></td>
								<td>
									<label>
										<a href="#">
											<i class="las la-edit"></i>
										</a>
										<a href="#">
											<i class="las la-trash-alt"></i>
										</a>
									</label>
								</td>
							</tr>
							<tr>
								<td><label>1002</label></td>
								<td>
									<label>
										<span class="attendant_image"><img src="./images/user.jpg"></span>
										<span>Olson Rogers</span>
									</label>
								</td>
								<td><label>Pulickal Hotel</label></td>
								<td><label>Evening</label></td>
								<td><label>Wednesday</label></td>
								<td>
									<label>
										<a href="#">
											<i class="las la-edit"></i>
										</a>
										<a href="#">
											<i class="las la-trash-alt"></i>
										</a>
									</label>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="additionals">
					<div class="category_list">
						<div class="additional_title">
							<span>Categories List</span>
							<i class="las la-ellipsis-v"></i>
						</div>
						<div class="list">
							<div class="list_item">
								<span>Pulickal Hotel</span>
								<span>
									Short sleeve and long sleeve tactical and hiking shirts
								</span>
								<i class="las la-edit"></i>
								<i class="las la-times"></i>
							</div>
							<div class="list_item">
								<span>Pulickal Hotel</span>
								<span>
									Short sleeve and long sleeve tactical and hiking shirts
								</span>
								<i class="las la-edit"></i>
								<i class="las la-times"></i>
							</div>
							<div class="list_item">
								<span>Pulickal Hotel</span>
								<span>
									Short sleeve and long sleeve tactical and hiking shirts
								</span>
								<i class="las la-edit"></i>
								<i class="las la-times"></i>
							</div>
							<div class="list_item">
								<span>Pulickal Hotel</span>
								<span>
									Short sleeve and long sleeve tactical and hiking shirts
								</span>
								<i class="las la-edit"></i>
								<i class="las la-times"></i>
							</div>
						</div>
					</div>
					<!-- <div class="branch_list">
						<div class="additional_title">
							<span>Brand List</span>
							<i class="las la-ellipsis-v"></i>
						</div>
						<div class="list">
							<div class="list_item">
								<span>Pulickal Hotel</span>
								<i class="las la-edit"></i>
								<i class="las la-times"></i>
							</div>
							<div class="list_item">
								<span>Pulickal Hotel</span>
								<i class="las la-edit"></i>
								<i class="las la-times"></i>
							</div>
							<div class="list_item">
								<span>Pulickal Hotel</span>
								<i class="las la-edit"></i>
								<i class="las la-times"></i>
							</div>
							<div class="list_item">
								<span>Pulickal Hotel</span>
								<i class="las la-edit"></i>
								<i class="las la-times"></i>
							</div>
						</div>
					</div>
					<div class="branch_list">
						<div class="additional_title">
							<span>Working Shifts</span>
							<i class="las la-ellipsis-v"></i>
						</div>
						<div class="list">
							<div class="list_item">
								<span>Pulickal Hotel</span>
								<i class="las la-edit"></i>
								<i class="las la-times"></i>
							</div>
							<div class="list_item">
								<span>Pulickal Hotel</span>
								<i class="las la-edit"></i>
								<i class="las la-times"></i>
							</div>
							<div class="list_item">
								<span>Pulickal Hotel</span>
								<i class="las la-edit"></i>
								<i class="las la-times"></i>
							</div>
							<div class="list_item">
								<span>Pulickal Hotel</span>
								<i class="las la-edit"></i>
								<i class="las la-times"></i>
							</div>
						</div>
					</div>
					<div class="branch_list">
						<div class="additional_title">
							<span>Size List</span>
							<i class="las la-ellipsis-v"></i>
						</div>
						<div class="list">
							<div class="list_item">
								<span>Pulickal Hotel</span>
								<i class="las la-edit"></i>
								<i class="las la-times"></i>
							</div>
							<div class="list_item">
								<span>Pulickal Hotel</span>
								<i class="las la-edit"></i>
								<i class="las la-times"></i>
							</div>
							<div class="list_item">
								<span>Pulickal Hotel</span>
								<i class="las la-edit"></i>
								<i class="las la-times"></i>
							</div>
							<div class="list_item">
								<span>Pulickal Hotel</span>
								<i class="las la-edit"></i>
								<i class="las la-times"></i>
							</div>
						</div>
					</div>
					<div class="branch_list">
						<div class="additional_title">
							<span>Color List</span>
							<i class="las la-ellipsis-v"></i>
						</div>
						<div class="list">
							<div class="list_item">
								<span>Pulickal Hotel</span>
								<i class="las la-edit"></i>
								<i class="las la-times"></i>
							</div>
							<div class="list_item">
								<span>Pulickal Hotel</span>
								<i class="las la-edit"></i>
								<i class="las la-times"></i>
							</div>
							<div class="list_item">
								<span>Pulickal Hotel</span>
								<i class="las la-edit"></i>
								<i class="las la-times"></i>
							</div>
							<div class="list_item">
								<span>Pulickal Hotel</span>
								<i class="las la-edit"></i>
								<i class="las la-times"></i>
							</div>
						</div>
					</div>
					<div class="branch_list">
						<div class="additional_title">
							<span>Status</span>
							<i class="las la-ellipsis-v"></i>
						</div>
						<div class="list">
							<div class="list_item">
								<span>Pulickal Hotel</span>
								<i class="las la-edit"></i>
								<i class="las la-times"></i>
							</div>
							<div class="list_item">
								<span>Pulickal Hotel</span>
								<i class="las la-edit"></i>
								<i class="las la-times"></i>
							</div>
							<div class="list_item">
								<span>Pulickal Hotel</span>
								<i class="las la-edit"></i>
								<i class="las la-times"></i>
							</div>
							<div class="list_item">
								<span>Pulickal Hotel</span>
								<i class="las la-edit"></i>
								<i class="las la-times"></i>
							</div>
						</div>
					</div> -->
				</div>
			</div>
			<div class="more">
				<div class="branch_list">
					<div class="additional_title">
						<span>Branch List</span>
						<i class="las la-plus"></i>
					</div>
				</div>
				<div class="branch_list">
					<div class="additional_title">
						<span>Branch List</span>
						<i class="las la-plus"></i>
					</div>
				</div>
				<div class="branch_list">
					<div class="additional_title">
						<span>Branch List</span>
						<i class="las la-plus"></i>
					</div>
				</div>
				<div class="branch_list">
					<div class="additional_title">
						<span>Branch List</span>
						<i class="las la-plus"></i>
					</div>
				</div>
				<div class="branch_list">
					<div class="additional_title">
						<span>Branch List</span>
						<i class="las la-plus"></i>
					</div>
				</div>
				<div class="branch_list">
					<div class="additional_title">
						<span>Branch List</span>
						<i class="las la-plus"></i>
					</div>
				</div>
			</div>
		</section>
		`;
	}
}