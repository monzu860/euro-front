<template>
	<h1>Installment List</h1>
	<div class="container">
		<div class="row justify-content-center">
			<div class="col-md-8">
				<div class="card">
					<div class="card-header">
						<router-link :to='{name:"InstallmentAdd"}' class="btn btn-primary">Create</router-link>
						<button class="btn btn-secondary" @click="back">Back</button>
					</div>
					<div class="card-body">
						<table class="table">
							<thead class="thead-dark">
								<tr>
									<th scope="col">Customer</th>
									<th scope="col">Installments</th>
									<th scope="col">No Of Installment</th>
									<th scope="col">Action</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="installment in customerInstallments" :key="installment.id">
									<td align="left">{{installment.name}}</td>
									<td align="left">{{installment.installment}}€</td>
									<td>{{installment.no_of_installment}}</td>
									<td>
										<button class="btn btn-success" @click="show(installment.customer_id)">Pay</button>
										<router-link :to='{name:"InstallmentDelete",params:{customer_id:installment.customer_id}}' class="btn btn-danger">Delete</router-link>
										<router-link :to='{name:"InstallmentEdit",params:{customer_id:installment.customer_id}}' class="btn btn-success">Edit</router-link>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Modal -->
	<div class="modal fade" id="installmentModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">Installments</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<table class="table">
					<thead class="thead-dark">
						<tr>
							<th scope="col">#</th>
							<th scope="col">Amount</th>
							<th scope="col">Expire Date</th>
							<th scope="col"></th>
						</tr>
					</thead>
						<tbody>
							<tr v-for="(installment, index) in installments" :key="installment.id">
							<td>{{index+1}}</td>
							<td>{{installment.amount}}</td>
							<td>{{installment.expire_date}}</td>
							<td>
							<button v-if="installment.paid_at" class="btn btn-primary" @click="pay(installment.id)">Paid</button>
							<button v-else class="btn btn-primary" @click="pay(installment.id)">Pay to Stripe - {{installment.amount}} €</button>
							</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import * as bootstrap from 'bootstrap';
import axios from 'axios';
import $ from 'jquery';
import Stripe from '@stripe/stripe-js';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Accept'] = 'application/json';
let stripe;

export default {
	name:'InstallmentList',
	data()
	{
		return {
			customerInstallments:[],
			installments:[],
		}
	},
	methods:{
		getInstallment(){
			let self=this;
			let result=  axios.get(window.remote_url+'/installments');
			result.then(function (response) {
				self.customerInstallments=response.data.installments;
			})
			.catch(function (error) {
				alert(error.response.data.message);
				if(error.response.data.message==='Unauthorized'){
					localStorage.removeItem('token');
					self.$router.push({name:'SignIn'});
				}
			});
		},
		show(customer_id){
			let self=this;
			let result=  axios.get(`${window.remote_url}/installment/${customer_id}`);
			result.then(function (response) {
				self.installments=response.data.installments;
				window.$("#installmentModal").modal('show');
			})
			.catch(function (error) {
				alert(error.response.data.message);
				if(error.response.data.message==='Unauthorized'){
					localStorage.removeItem('token');
					self.$router.push({name:'SignIn'});
				}
			});
		},
		pay(id){
			let base_url = window.location.origin;
			axios.post(`${window.remote_url}/payment`,{'installment_id':id,'base_url':base_url}).then(response=>{
				let stripe = window.Stripe(response.data.publishKey);
				stripe.redirectToCheckout({
					sessionId: response.data.sessionId
				}).then(function (result) {
					// If `redirectToCheckout` fails due to a browser or network
					// using `result.error.message`.
					console.log(result.error.message);
				});
			}).catch(error=>{
				console.log(error);
				alert(error.response.data.message);
				if(error.response.data.message==='Unauthorized'){
					localStorage.removeItem('token');
					this.$router.push({name:'SignIn'});
				}
			})
					
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
		this.getInstallment();
	}
}
</script>
