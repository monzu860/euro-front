<template>
<h1>Payment Successfull</h1>
</template>
<script>
import axios from 'axios';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Accept'] = 'application/json';
export default {
	name:'PaymentSuccess',
	methods:{
		update(){
			let self=this;
			axios.post(`${window.remote_url}/payment/${this.$route.params.id}`,{'installment_id':this.$route.params.id,_method:'put'}).then(response=>{
				//alert(response.data.message);
			}).catch(error=>{
				alert(error.response.data);
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
		this.update();
	}
}
</script>

