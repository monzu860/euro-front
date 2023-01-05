<template>
<h1>Hello, This is Home</h1>
</template>
<script>

export default {
	name:'HomePage',
	mounted()
	{
		let token=localStorage.getItem('token');
		if(!token){
			this.$router.push({name:'SignIn'});
		}
	}
}
</script>
<style>
.signin input, .customer input{
width:300px;
height:40px;
display: block;
margin-bottom: 10px;
margin-left: auto;
margin-right: auto;
padding-left:10px;
}
.signin button,.customer button{
width:310px;
height:40px;
cursor:pointer;
}
</style>
