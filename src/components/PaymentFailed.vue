<template>
<h1>Payment Failed</h1>
</template>
<script>
export default {
	name:'PaymentFailed',
	mounted()
	{
		let token=localStorage.getItem('token');
		if(!token){
			this.$router.push({name:'SignIn'});
		}
	}
}
</script>

