<template>
	<h5>Customer List</h5>
	<div class="container">
		<div class="row justify-content-center">
			<div class="col-md-8">
				<div class="card">
					<div class="card-header">
						<ul class="nav justify-content-center">
						<li class="nav-item">
						<router-link :to='{name:"CustomerAdd"}' class="btn btn-primary">Create</router-link>
						</li>
						<li>
						<button class="btn btn-secondary" @click="back">Back</button>
						</li>
						</ul>
					</div>
					<div class="card-body">
						<table class="table">
							<thead class="thead-dark">
								<tr>
									<th scope="col">Name</th>
									<th scope="col">Address</th>
									<th scope="col">Action</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="customer in customers" :key="customer.id">
									<td>{{customer.name}}</td>
									<td>{{customer.address}}</td>
									<td>
									<router-link :to='{name:"CustomerEdit",params:{id:customer.id}}' class="btn btn-success">Edit</router-link>
									<button class="btn btn-danger" @click="remove(customer.id)">Delete</button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import * as bootstrap from 'bootstrap';
import axios from 'axios';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Accept'] = 'application/json';

export default {
	name:'CustomerList',
	data()
	{
		return {
			customers:[],
		}
	},
	methods: {
		get() {
			let self=this;
			let result=  axios.get(window.remote_url+'/customers');
			result.then(function (response) {
				self.customers=response.data.customers;
				console.log(response.data);
			})
			.catch(function (error) {
				alert(error.response.data.message);
				if(error.response.data.message==='Unauthorized'){
					localStorage.removeItem('token');
					self.$router.push({name:'SignIn'});
				}
			});
		},
		remove(id) {
			let self=this;
			let result=  axios.delete(`${window.remote_url}/customer/${id}`);
			result.then(function (response) {
				alert(response.data.message);
				let i = self.customers.map(data => data.id).indexOf(id);
                self.customers.splice(i, 1);
			})
			.catch(function (error) {
				alert(error.response.data.message);
				if(error.response.data.message==='Unauthorized'){
					localStorage.removeItem('token');
					self.$router.push({name:'SignIn'});
				}
			});
		},
		back() {
			this.$router.go(-1)
		}
	},
	mounted()
	{
		let token=localStorage.getItem('token');
		if(!token){
			this.$router.push({name:'SignIn'});
		}
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		this.get();
	}
}
</script>
