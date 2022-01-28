import General from './General.js';

export default class extends General{
	constructor(){
		super();

		this.setTitle('Accounts::Lifesytle Outdoorgear');
	}

	async getPage(){
		return `
		<section class="page" id="accounts">
			<div class="user_entry">
				<div class="user_stat">
					<div class="admin">
						<b>538</b>
						<span>Administrators</span>
					</div>
					<div class="attendant">
						<b>538</b>
						<span>Attendants</span>
					</div>
					<div class="customer">
						<b>538</b>
						<span>Customers</span>
					</div>
					<div class="user_types">
						<table class="">
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
											<span>Type</span>
											<i class="las la-sort"></i>
										</label>
									</th>
									<th>
										<label>
											<span>Permission</span>
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
									<td><label>Attendant</label></td>
									<td><label>View, Update and Order</label></td>
									<td>
										<label>
											<a href="#">
												<i class="las la-edit"></i>
											</a>
											<a href="#">
												<i class="las la-times"></i>
											</a>
										</label>
									</td>
								</tr>
								<tr>
									<td><label>1002</label></td>
									<td><label>Attendant</label></td>
									<td><label>View, Update and Order</label></td>
									<td>
										<label>
											<a href="#">
												<i class="las la-edit"></i>
											</a>
											<a href="#">
												<i class="las la-times"></i>
											</a>
										</label>
									</td>
								</tr>
								<tr>
									<td><label>1002</label></td>
									<td><label>Attendant</label></td>
									<td><label>View, Update and Order</label></td>
									<td>
										<label>
											<a href="#">
												<i class="las la-edit"></i>
											</a>
											<a href="#">
												<i class="las la-times"></i>
											</a>
										</label>
									</td>
								</tr>

							</tbody>
						</table>
						<div class="user_type_entry">
							<h2>Enter user types</h2>
							<select>
								<option>Choose account type</option>
								<option>Admin</option>
								<option>Attendant</option>
							</select>
							<div class="input_f">
								<label>Permissions</label>
								<div class="permissions">
									<label for="save">
										<input type="checkbox" name="permissions" value="Save" id="save">
										<small>Save</small>
									</label>
									<label for="update">
										<input type="checkbox" name="permissions" value="Update" id="update">
										<small>Update</small>
									</label>
									<label for="delete">
										<input type="checkbox" name="permissions" value="Delete" id="delete">
										<small>Delete</small>
									</label>

									<label for="view">
										<input type="checkbox" name="permissions" value="View" id="view">
										<small>View</small>
									</label>
									
								</div>
								<input type="submit" name="savePBtn" class="btn btn-round" value="Save">
							</div>
						</div>
					</div>
				</div>
				<div class="user_form">
					<h2>Enter user details</h2>
					<div class="form_entry">
						<div class="input_field">
							<label>First Name</label>
							<input type="text" name="first_name" placeholder="Enter user first Name">
						</div>
						<div class="input_field">
							<label>Last Name</label>
							<input type="text" name="last_name" placeholder="Enter user last Name">
						</div>

						<div class="input_field">
							<label>Telephone</label>
							<input type="text" name="Telephone" placeholder="Enter user phone number">
						</div>
						<div class="input_field">
							<label>Email</label>
							<input type="text" name="email" placeholder="Enter user email">
						</div>

						
						<div class="input_field">
							<label>Username</label>
							<input type="text" name="username" placeholder="Enter username">
						</div>
						<div class="input_field">
							<label>Password</label>
							<input type="text" name="password" value="$%&*736#">
						</div>
						<div class="address">
							<label>Address</label>
							<textarea name="address" placeholder="Enter User address"></textarea>
						</div>
						<div class="upload_box">
							<span>Add image</span>
							<label for="uploadBtn">
								<i class="las la-plus"></i>
								<input type="file" class="hide" name="uploadBtn" id="uploadBtn">
							</label>
							<img src="./images/user.jpg">
						</div>

						<select>
							<option>Choose account type</option>
							<option>Admin</option>
							<option>Attendant</option>
						</select>
						<input type="submit" name="savePBtn" class="btn btn-round" value="Save">

					</div>
				</div>
			</div>
			<div class="sys_users">
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
									<span>User</span>
									<i class="las la-sort"></i>
								</label>
							</th>
							<th>
								<label>
									<span>Telephone</span>
									<i class="las la-sort"></i>
								</label>
							</th>
							<th>
								<label>
									<span>Email</span>
									<i class="las la-sort"></i>
								</label>
							</th>
							<th>
								<label>
									<span>Address</span>
									<i class="las la-sort"></i>
								</label>
							</th>
							<th>
								<label>
									<span>Type</span>
									<i class="las la-sort"></i>
								</label>
							</th>
							<th>
								<label>
									<span>status</span>
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
									<span>
										<b>Olson</b>
										<small>Olson Rogers</small>
									</span>
								</label>
							</td>
							<td><label>+256705314188</label></td>
							<td><label>tactical.ug@gmail.com</label></td>
							<td><label>address</label></td>
							<td><label>Admin</label></td>
							<td>
								<label>
									<span class="status s_active">Active</span>
								</label>
							</td>
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
									<span>
										<b>Olson</b>
										<small>Olson Rogers</small>
									</span>
								</label>
							</td>
							<td><label>+256705314188</label></td>
							<td><label>tactical.ug@gmail.com</label></td>
							<td><label>address</label></td>
							<td><label>Admin</label></td>
							<td>
								<label>
									<span class="status s_deactivated">Inactive</span>
								</label>
							</td>
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
									<span>
										<b>Olson</b>
										<small>Olson Rogers</small>
									</span>
								</label>
							</td>
							<td><label>+256705314188</label></td>
							<td><label>tactical.ug@gmail.com</label></td>
							<td><label>address</label></td>
							<td><label>Admin</label></td>
							<td>
								<label>
									<span class="status s_active">Active</span>
								</label>
							</td>
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
									<span>
										<b>Olson</b>
										<small>Olson Rogers</small>
									</span>
								</label>
							</td>
							<td><label>+256705314188</label></td>
							<td><label>tactical.ug@gmail.com</label></td>
							<td><label>address</label></td>
							<td><label>Admin</label></td>
							<td>
								<label>
									<span class="status s_pending">Pending</span>
								</label>
							</td>
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
									<span>
										<b>Olson</b>
										<small>Olson Rogers</small>
									</span>
								</label>
							</td>
							<td><label>+256705314188</label></td>
							<td><label>tactical.ug@gmail.com</label></td>
							<td><label>address</label></td>
							<td><label>Admin</label></td>
							<td>
								<label>
									<span class="status s_active">Active</span>
								</label>
							</td>
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
									<span>
										<b>Olson</b>
										<small>Olson Rogers</small>
									</span>
								</label>
							</td>
							<td><label>+256705314188</label></td>
							<td><label>tactical.ug@gmail.com</label></td>
							<td><label>address</label></td>
							<td><label>Admin</label></td>
							<td>
								<label>
									<span class="status s_deactivated">Inactive</span>
								</label>
							</td>
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
									<span>
										<b>Olson</b>
										<small>Olson Rogers</small>
									</span>
								</label>
							</td>
							<td><label>+256705314188</label></td>
							<td><label>tactical.ug@gmail.com</label></td>
							<td><label>address</label></td>
							<td><label>Admin</label></td>
							<td>
								<label>
									<span class="status s_active">Active</span>
								</label>
							</td>
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
									<span>
										<b>Olson</b>
										<small>Olson Rogers</small>
									</span>
								</label>
							</td>
							<td><label>+256705314188</label></td>
							<td><label>tactical.ug@gmail.com</label></td>
							<td><label>address</label></td>
							<td><label>Admin</label></td>
							<td>
								<label>
									<span class="status s_pending">Pending</span>
								</label>
							</td>
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
									<span>
										<b>Olson</b>
										<small>Olson Rogers</small>
									</span>
								</label>
							</td>
							<td><label>+256705314188</label></td>
							<td><label>tactical.ug@gmail.com</label></td>
							<td><label>address</label></td>
							<td><label>Admin</label></td>
							<td>
								<label>
									<span class="status s_active">Active</span>
								</label>
							</td>
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
									<span>
										<b>Olson</b>
										<small>Olson Rogers</small>
									</span>
								</label>
							</td>
							<td><label>+256705314188</label></td>
							<td><label>tactical.ug@gmail.com</label></td>
							<td><label>address</label></td>
							<td><label>Admin</label></td>
							<td>
								<label>
									<span class="status s_deactivated">Inactive</span>
								</label>
							</td>
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
									<span>
										<b>Olson</b>
										<small>Olson Rogers</small>
									</span>
								</label>
							</td>
							<td><label>+256705314188</label></td>
							<td><label>tactical.ug@gmail.com</label></td>
							<td><label>address</label></td>
							<td><label>Admin</label></td>
							<td>
								<label>
									<span class="status s_active">Active</span>
								</label>
							</td>
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
									<span>
										<b>Olson</b>
										<small>Olson Rogers</small>
									</span>
								</label>
							</td>
							<td><label>+256705314188</label></td>
							<td><label>tactical.ug@gmail.com</label></td>
							<td><label>address</label></td>
							<td><label>Admin</label></td>
							<td>
								<label>
									<span class="status s_pending">Pending</span>
								</label>
							</td>
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
		</section>
		`;
	}
}