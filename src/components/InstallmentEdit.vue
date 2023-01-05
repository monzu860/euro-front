<template>
	<h3>Installment Edit</h3>
	<div class="container">
		<div class="row justify-content-center">
			<div class="col-md-8">
				<div class="card">
					<div class="card-header">Installment Edit</div>
					<div class="card-body">
						<form @submit.prevent="update">
							<select v-model="customer_id" >
								<option v-for="customer in customers" :key="customer.id" v-bind:value="customer.id">{{customer.name}}</option>
							</select>
							<table class="table">
								<thead class="thead-dark">
									<tr>
										<th scope="col">#</th>
										<th scope="col">Amount</th>
										<th scope="col">Expire Date</th>
										<th scope="col">Note</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(installment, index) in installments" :key="installment.id">
										<td>{{index+1}}</td>
										<td><input type="number" v-model="installment.amount"></td>
										<td><input type="date" v-model="installment.expire_date"></td>
										<td>
										<input type="text" v-model="installment.note">
										<input type="hidden" v-model="installment.id">
										</td>
									</tr>
									<button type="button" class="btn btn-secondary" @click="addNew({amount:null,expire_date:null,note:null,id:null})">Add New</button>
								</tbody>
							</table>
							<button type="submit" class="btn btn-primary">Update</button>
							<button type="button" class="btn btn-danger" @click="back">Cancel</button>	
						</form>
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
	name:'InstallmentEdit',
	data()
	{
		return {
			customers:[],
			customer_id:null,
			installments:[],
		}
			
	},
	methods:{
		addNew(data) {
			this.installments.push(data);
		},
		
		show(){
			let self=this;
			let result=  axios.get(`${window.remote_url}/installment/${this.$route.params.customer_id}`);
			result.then(function (response) {
				self.installments=response.data.installments;
				self.customer_id=self.$route.params.customer_id;
			})
			.catch(function (error) {
				alert(error.response.data);
				if(error.response.data.message==='Unauthorized'){
					localStorage.removeItem('token');
					self.$router.push({name:'SignIn'});
				}
			});
		},
		update(){
			axios.post(`${window.remote_url}/installment/${this.$route.params.customer_id}`,{installments:this.installments,customer_id:this.customer_id,_method:'put'}).then(response=>{
			alert(response.data.message);
			this.$router.push({name:"InstallmentList"})
			}).catch(error=>{
				alert(error.response.data);
				if(error.response.data.message==='Unauthorized'){
					localStorage.removeItem('token');
					this.$router.push({name:'SignIn'});
				}
			})
		},
		getCustomer(){
			let self=this;
			let result=  axios.get(window.remote_url+'/customers');
			result.then(function (response) {
			self.customers=response.data.customers;
			self.show();
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
		this.getCustomer();
	}
}
</script>
