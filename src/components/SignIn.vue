<template>
	<h1>Sign In</h1>
	<div class="signin">
		<input type="text" v-model="email" placeholder="Enter Your Email" />
		<input type="password" v-model="password" placeholder="Enter Your Password" />
		<button v-on:click="signin"> Sign In</button>
	</div>
</template>

<script>

import * as bootstrap from 'bootstrap';
import axios from 'axios';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Accept'] = 'application/json';

export default {
	name:'SignIn',
	data()
	{
		return {
			email:'',
			password:''
		}
	},
	methods:{
		signin(){
			let self=this;
			let result=  axios.post(window.remote_url+'/login',{
				email:this.email,
				password:this.password,
			});
			result.then(function (response) {
				console.log(response.data);
				localStorage.setItem('token',response.data.authorisation.token);
				self.$router.push({name:'HomePage'});
			})
			.catch(function (error) {
				console.log(error);
			});
		
		}
	},
	mounted()
	{
		let token=localStorage.getItem('token');
		if(token){
			this.$router.push({name:'HomePage'});
		}
	}
}
</script>
