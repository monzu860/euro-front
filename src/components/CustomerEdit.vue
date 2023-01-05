<template>
	<h5>Customer Edit</h5>
	<div class="customer">
	<form @submit.prevent="update">
		<input type="text" v-model="form.name" placeholder="Enter  Name" />
		<input type="text" v-model="form.address" placeholder="Enter  Address" />
		<button type="submit" class="btn btn-primary">Update</button>
	</form>
	</div>
</template>

<script>

import * as bootstrap from 'bootstrap';
import stripe from 'stripe';
import axios from 'axios';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Accept'] = 'application/json';

export default {
	name:'CustomerEdit',
	data()
	{
		return {
			form:{
				name:'',
				address:'',
			}
		}
			
	},
	methods:{
		show(){
			let self=this;
			let result=  axios.get(`${window.remote_url}/customer/${this.$route.params.id}`);
			result.then(function (response) {
				console.log(response.data.message);
				self.form.name=response.data.customer.name;
				self.form.address=response.data.customer.address;
			})
			.catch(function (error) {
				alert(error.response.data.message);
				if(error.response.data.message==='Unauthorized'){
					localStorage.removeItem('token');
					self.$router.push({name:'SignIn'});
				}
			});
		},
		update(){
			let self=this;
			axios.post(`${window.remote_url}/customer/${this.$route.params.id}`,{name:self.form.name,address:self.form.address,_method:'put'}).then(response=>{
				alert(response.data.message)
				self.$router.push({name:"CustomerList"})
			}).catch(error=>{
				alert(error.response.data.message);
				if(error.response.data.message==='Unauthorized'){
					localStorage.removeItem('token');
					self.$router.push({name:'SignIn'});
				}
			})
		}
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
