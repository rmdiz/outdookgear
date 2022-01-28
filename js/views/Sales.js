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
					<tbody>

						<tr>
							<td><label>PTST28BL</label></td>
							<td><label>Tactical Stryke Pant</label></td>
							<td><label>+Pants</label></td>
							<td><label>110000</label></td>
							<td><label>511</label></td>
							<td><label>602</label></td>
							<td><label>Pulickal Hotel</label></td>
							<td><label>Queen</label></td>

							<td>
								<label>
									<span class="status s_active">Sold</span>
								</label>
							</td>
							<td><label>17/01/2022 <small>04:18:32 <b>PM</b></small></label></td>

							<td>
								<label>
									<a href="#">
										<i class="las la-braille"></i>
									</a>
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
							<td><label>PTST28BL</label></td>
							<td><label>Tactical Stryke Pant</label></td>
							<td><label>+Pants</label></td>
							<td><label>110000</label></td>
							<td><label>511</label></td>
							<td><label>602</label></td>
							<td><label>Pulickal Hotel</label></td>
							<td><label>Queen</label></td>

							<td>
								<label>
									<span class="status s_active">Sold</span>
								</label>
							</td>
							<td><label>17/01/2022 <small>04:18:32 <b>PM</b></small></label></td>

							<td>
								<label>
									<a href="#">
										<i class="las la-braille"></i>
									</a>
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
							<td><label>PTST28BL</label></td>
							<td><label>Tactical Stryke Pant</label></td>
							<td><label>+Pants</label></td>
							<td><label>110000</label></td>
							<td><label>511</label></td>
							<td><label>602</label></td>
							<td><label>Pulickal Hotel</label></td>
							<td><label>Queen</label></td>

							<td>
								<label>
									<span class="status s_active">Sold</span>
								</label>
							</td>
							<td><label>17/01/2022 <small>04:18:32 <b>PM</b></small></label></td>

							<td>
								<label>
									<a href="#">
										<i class="las la-braille"></i>
									</a>
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
							<td><label>PTST28BL</label></td>
							<td><label>Tactical Stryke Pant</label></td>
							<td><label>+Pants</label></td>
							<td><label>110000</label></td>
							<td><label>511</label></td>
							<td><label>602</label></td>
							<td><label>Pulickal Hotel</label></td>
							<td><label>Queen</label></td>

							<td>
								<label>
									<span class="status s_active">Sold</span>
								</label>
							</td>
							<td><label>17/01/2022 <small>04:18:32 <b>PM</b></small></label></td>

							<td>
								<label>
									<a href="#">
										<i class="las la-braille"></i>
									</a>
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
							<td><label>PTST28BL</label></td>
							<td><label>Tactical Stryke Pant</label></td>
							<td><label>+Pants</label></td>
							<td><label>110000</label></td>
							<td><label>511</label></td>
							<td><label>602</label></td>
							<td><label>Pulickal Hotel</label></td>
							<td><label>Queen</label></td>

							<td>
								<label>
									<span class="status s_active">Sold</span>
								</label>
							</td>
							<td><label>17/01/2022 <small>04:18:32 <b>PM</b></small></label></td>

							<td>
								<label>
									<a href="#">
										<i class="las la-braille"></i>
									</a>
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
							<td><label>PTST28BL</label></td>
							<td><label>Tactical Stryke Pant</label></td>
							<td><label>+Pants</label></td>
							<td><label>110000</label></td>
							<td><label>511</label></td>
							<td><label>602</label></td>
							<td><label>Pulickal Hotel</label></td>
							<td><label>Queen</label></td>

							<td>
								<label>
									<span class="status s_active">Sold</span>
								</label>
							</td>
							<td><label>17/01/2022 <small>04:18:32 <b>PM</b></small></label></td>

							<td>
								<label>
									<a href="#">
										<i class="las la-braille"></i>
									</a>
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
							<td><label>PTST28BL</label></td>
							<td><label>Tactical Stryke Pant</label></td>
							<td><label>+Pants</label></td>
							<td><label>110000</label></td>
							<td><label>511</label></td>
							<td><label>602</label></td>
							<td><label>Pulickal Hotel</label></td>
							<td><label>Queen</label></td>

							<td>
								<label>
									<span class="status s_active">Sold</span>
								</label>
							</td>
							<td><label>17/01/2022 <small>04:18:32 <b>PM</b></small></label></td>

							<td>
								<label>
									<a href="#">
										<i class="las la-braille"></i>
									</a>
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
							<td><label>PTST28BL</label></td>
							<td><label>Tactical Stryke Pant</label></td>
							<td><label>+Pants</label></td>
							<td><label>110000</label></td>
							<td><label>511</label></td>
							<td><label>602</label></td>
							<td><label>Pulickal Hotel</label></td>
							<td><label>Queen</label></td>

							<td>
								<label>
									<span class="status s_active">Sold</span>
								</label>
							</td>
							<td><label>17/01/2022 <small>04:18:32 <b>PM</b></small></label></td>

							<td>
								<label>
									<a href="#">
										<i class="las la-braille"></i>
									</a>
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
							<td><label>PTST28BL</label></td>
							<td><label>Tactical Stryke Pant</label></td>
							<td><label>+Pants</label></td>
							<td><label>110000</label></td>
							<td><label>511</label></td>
							<td><label>602</label></td>
							<td><label>Pulickal Hotel</label></td>
							<td><label>Queen</label></td>

							<td>
								<label>
									<span class="status s_active">Sold</span>
								</label>
							</td>
							<td><label>17/01/2022 <small>04:18:32 <b>PM</b></small></label></td>

							<td>
								<label>
									<a href="#">
										<i class="las la-braille"></i>
									</a>
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
							<td><label>PTST28BL</label></td>
							<td><label>Tactical Stryke Pant</label></td>
							<td><label>+Pants</label></td>
							<td><label>110000</label></td>
							<td><label>511</label></td>
							<td><label>602</label></td>
							<td><label>Pulickal Hotel</label></td>
							<td><label>Queen</label></td>

							<td>
								<label>
									<span class="status s_active">Sold</span>
								</label>
							</td>
							<td><label>17/01/2022 <small>04:18:32 <b>PM</b></small></label></td>

							<td>
								<label>
									<a href="#">
										<i class="las la-braille"></i>
									</a>
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
							<td><label>PTST28BL</label></td>
							<td><label>Tactical Stryke Pant</label></td>
							<td><label>+Pants</label></td>
							<td><label>110000</label></td>
							<td><label>511</label></td>
							<td><label>602</label></td>
							<td><label>Pulickal Hotel</label></td>
							<td><label>Queen</label></td>

							<td>
								<label>
									<span class="status s_active">Sold</span>
								</label>
							</td>
							<td><label>17/01/2022 <small>04:18:32 <b>PM</b></small></label></td>

							<td>
								<label>
									<a href="#">
										<i class="las la-braille"></i>
									</a>
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
							<td><label>PTST28BL</label></td>
							<td><label>Tactical Stryke Pant</label></td>
							<td><label>+Pants</label></td>
							<td><label>110000</label></td>
							<td><label>511</label></td>
							<td><label>602</label></td>
							<td><label>Pulickal Hotel</label></td>
							<td><label>Queen</label></td>

							<td>
								<label>
									<span class="status s_active">Sold</span>
								</label>
							</td>
							<td><label>17/01/2022 <small>04:18:32 <b>PM</b></small></label></td>

							<td>
								<label>
									<a href="#">
										<i class="las la-braille"></i>
									</a>
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
							<td><label>PTST28BL</label></td>
							<td><label>Tactical Stryke Pant</label></td>
							<td><label>+Pants</label></td>
							<td><label>110000</label></td>
							<td><label>511</label></td>
							<td><label>602</label></td>
							<td><label>Pulickal Hotel</label></td>
							<td><label>Queen</label></td>

							<td>
								<label>
									<span class="status s_active">Sold</span>
								</label>
							</td>
							<td><label>17/01/2022 <small>04:18:32 <b>PM</b></small></label></td>

							<td>
								<label>
									<a href="#">
										<i class="las la-braille"></i>
									</a>
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
							<td><label>PTST28BL</label></td>
							<td><label>Tactical Stryke Pant</label></td>
							<td><label>+Pants</label></td>
							<td><label>110000</label></td>
							<td><label>511</label></td>
							<td><label>602</label></td>
							<td><label>Pulickal Hotel</label></td>
							<td><label>Queen</label></td>

							<td>
								<label>
									<span class="status s_active">Sold</span>
								</label>
							</td>
							<td><label>17/01/2022 <small>04:18:32 <b>PM</b></small></label></td>

							<td>
								<label>
									<a href="#">
										<i class="las la-braille"></i>
									</a>
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
							<td><label>PTST28BL</label></td>
							<td><label>Tactical Stryke Pant</label></td>
							<td><label>+Pants</label></td>
							<td><label>110000</label></td>
							<td><label>511</label></td>
							<td><label>602</label></td>
							<td><label>Pulickal Hotel</label></td>
							<td><label>Queen</label></td>

							<td>
								<label>
									<span class="status s_active">Sold</span>
								</label>
							</td>
							<td><label>17/01/2022 <small>04:18:32 <b>PM</b></small></label></td>

							<td>
								<label>
									<a href="#">
										<i class="las la-braille"></i>
									</a>
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
							<td><label>PTST28BL</label></td>
							<td><label>Tactical Stryke Pant</label></td>
							<td><label>+Pants</label></td>
							<td><label>110000</label></td>
							<td><label>511</label></td>
							<td><label>602</label></td>
							<td><label>Pulickal Hotel</label></td>
							<td><label>Queen</label></td>

							<td>
								<label>
									<span class="status s_active">Sold</span>
								</label>
							</td>
							<td><label>17/01/2022 <small>04:18:32 <b>PM</b></small></label></td>

							<td>
								<label>
									<a href="#">
										<i class="las la-braille"></i>
									</a>
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
							<td><label>PTST28BL</label></td>
							<td><label>Tactical Stryke Pant</label></td>
							<td><label>+Pants</label></td>
							<td><label>110000</label></td>
							<td><label>511</label></td>
							<td><label>602</label></td>
							<td><label>Pulickal Hotel</label></td>
							<td><label>Queen</label></td>

							<td>
								<label>
									<span class="status s_active">Sold</span>
								</label>
							</td>
							<td><label>17/01/2022 <small>04:18:32 <b>PM</b></small></label></td>

							<td>
								<label>
									<a href="#">
										<i class="las la-braille"></i>
									</a>
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
							<td><label>PTST28BL</label></td>
							<td><label>Tactical Stryke Pant</label></td>
							<td><label>+Pants</label></td>
							<td><label>110000</label></td>
							<td><label>511</label></td>
							<td><label>602</label></td>
							<td><label>Pulickal Hotel</label></td>
							<td><label>Queen</label></td>

							<td>
								<label>
									<span class="status s_active">Sold</span>
								</label>
							</td>
							<td><label>17/01/2022 <small>04:18:32 <b>PM</b></small></label></td>

							<td>
								<label>
									<a href="#">
										<i class="las la-braille"></i>
									</a>
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
							<td><label>PTST28BL</label></td>
							<td><label>Tactical Stryke Pant</label></td>
							<td><label>+Pants</label></td>
							<td><label>110000</label></td>
							<td><label>511</label></td>
							<td><label>602</label></td>
							<td><label>Pulickal Hotel</label></td>
							<td><label>Queen</label></td>

							<td>
								<label>
									<span class="status s_active">Sold</span>
								</label>
							</td>
							<td><label>17/01/2022 <small>04:18:32 <b>PM</b></small></label></td>

							<td>
								<label>
									<a href="#">
										<i class="las la-braille"></i>
									</a>
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
							<td><label>PTST28BL</label></td>
							<td><label>Tactical Stryke Pant</label></td>
							<td><label>+Pants</label></td>
							<td><label>110000</label></td>
							<td><label>511</label></td>
							<td><label>602</label></td>
							<td><label>Pulickal Hotel</label></td>
							<td><label>Queen</label></td>

							<td>
								<label>
									<span class="status s_active">Sold</span>
								</label>
							</td>
							<td><label>17/01/2022 <small>04:18:32 <b>PM</b></small></label></td>

							<td>
								<label>
									<a href="#">
										<i class="las la-braille"></i>
									</a>
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
							<td><label>PTST28BL</label></td>
							<td><label>Tactical Stryke Pant</label></td>
							<td><label>+Pants</label></td>
							<td><label>110000</label></td>
							<td><label>511</label></td>
							<td><label>602</label></td>
							<td><label>Pulickal Hotel</label></td>
							<td><label>Queen</label></td>

							<td>
								<label>
									<span class="status s_active">Sold</span>
								</label>
							</td>
							<td><label>17/01/2022 <small>04:18:32 <b>PM</b></small></label></td>

							<td>
								<label>
									<a href="#">
										<i class="las la-braille"></i>
									</a>
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
							<td><label>PTST28BL</label></td>
							<td><label>Tactical Stryke Pant</label></td>
							<td><label>+Pants</label></td>
							<td><label>110000</label></td>
							<td><label>511</label></td>
							<td><label>602</label></td>
							<td><label>Pulickal Hotel</label></td>
							<td><label>Queen</label></td>

							<td>
								<label>
									<span class="status s_active">Sold</span>
								</label>
							</td>
							<td><label>17/01/2022 <small>04:18:32 <b>PM</b></small></label></td>

							<td>
								<label>
									<a href="#">
										<i class="las la-braille"></i>
									</a>
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
							<td><label>PTST28BL</label></td>
							<td><label>Tactical Stryke Pant</label></td>
							<td><label>+Pants</label></td>
							<td><label>110000</label></td>
							<td><label>511</label></td>
							<td><label>602</label></td>
							<td><label>Pulickal Hotel</label></td>
							<td><label>Queen</label></td>

							<td>
								<label>
									<span class="status s_active">Sold</span>
								</label>
							</td>
							<td><label>17/01/2022 <small>04:18:32 <b>PM</b></small></label></td>

							<td>
								<label>
									<a href="#">
										<i class="las la-braille"></i>
									</a>
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
							<td><label>PTST28BL</label></td>
							<td><label>Tactical Stryke Pant</label></td>
							<td><label>+Pants</label></td>
							<td><label>110000</label></td>
							<td><label>511</label></td>
							<td><label>602</label></td>
							<td><label>Pulickal Hotel</label></td>
							<td><label>Queen</label></td>

							<td>
								<label>
									<span class="status s_active">Sold</span>
								</label>
							</td>
							<td><label>17/01/2022 <small>04:18:32 <b>PM</b></small></label></td>

							<td>
								<label>
									<a href="#">
										<i class="las la-braille"></i>
									</a>
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
							<td><label>PTST28BL</label></td>
							<td><label>Tactical Stryke Pant</label></td>
							<td><label>+Pants</label></td>
							<td><label>110000</label></td>
							<td><label>511</label></td>
							<td><label>602</label></td>
							<td><label>Pulickal Hotel</label></td>
							<td><label>Queen</label></td>

							<td>
								<label>
									<span class="status s_active">Sold</span>
								</label>
							</td>
							<td><label>17/01/2022 <small>04:18:32 <b>PM</b></small></label></td>

							<td>
								<label>
									<a href="#">
										<i class="las la-braille"></i>
									</a>
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
		</section>
		`;
	}
}