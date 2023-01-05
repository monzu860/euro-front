<template>
	<h3>Installment Delete</h3>
	<div class="container">
		<div class="row justify-content-center">
			<div class="col-md-8">
				<div class="card">
					<div class="card-header">Installment Delete</div>
					<div class="card-body">
						<form @submit.prevent="update">
							<table class="table">
								<thead class="thead-dark">
									<tr>
										<th scope="col">#</th>
										<th scope="col">Amount</th>
										<th scope="col">Expire Date</th>
										<th scope="col">Note</th>
										<th scope="col"></th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(installment, index) in installments" :key="installment.id">
										<td>{{index+1}}</td>
										<td>{{installment.amount}}</td>
										<td>{{installment.expire_date}}</td>
										<td>{{installment.note}}</td>
										<td><button class="btn btn-danger" @click="remove(installment.id)">Delete</button></td>
									</tr>
								</tbody>
							</table>
						</form>
						<router-link :to='{name:"InstallmentList"}' class="btn btn-primary">Back</router-link>
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
	name:'InstallmentDelete',
	data()
	{
		return {
			installments:[],
		}
			
	},
	methods:{
		show(){
			let self=this;
			let result=  axios.get(`${window.remote_url}/installment/${this.$route.params.customer_id}`);
			result.then(function (response) {
				self.installments=response.data.installments;
			})
			.catch(function (error) {
				alert(error.response.data);
				if(error.response.data.message==='Unauthorized'){
					localStorage.removeItem('token');
					self.$router.push({name:'SignIn'});
				}
			});
		},
		remove(id) {
			let self=this;
			let result=  axios.delete(`${window.remote_url}/installment/${id}`);
			result.then(function (response) {
				alert(response.data.message);
				let i = self.installments.map(data => data.id).indexOf(id);
                self.installments.splice(i, 1);
			})
			.catch(function (error) {
				alert(error.response.data);
				if(error.response.data.message==='Unauthorized'){
					localStorage.removeItem('token');
					self.$router.push({name:'SignIn'});
				}
			});
		},
		
	},
	mounted()
	{
		let token=localStorage.getItem('token');
		if(!token){
			this.$router.push({name:'SignIn'});
		}
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		this.show();
	}
}
</script>
