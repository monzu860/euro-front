<template>
	<h5>Create Customer</h5>
	<div class="customer">
		<form @submit.prevent="create">
			<input type="text" v-model="form.name" placeholder="Enter  Name" />
			<input type="text" v-model="form.address" placeholder="Enter  Address" />
			<button type="submit" class="btn btn-primary">Save</button>
		</form>
	</div>
</template>

<script>

import * as bootstrap from 'bootstrap';
import axios from 'axios';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Accept'] = 'application/json';

export default {
	name:'CustomerAdd',
	data()
	{
		return {
			form:{
				name:'',
				address:'',
			},
		}
	},
	methods:{
		create(){
			let self=this;
			let result=  axios.post(window.remote_url+'/customer',{
			name:this.form.name,
			address:this.form.address,
			});
			result.then(function (response) {
				alert(response.data.message);
				self.$router.push({name:"CustomerList"})
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
		
	}
}
</script>
