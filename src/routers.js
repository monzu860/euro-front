import SignIn from './components/SignIn.vue';
import HomePage from './components/HomePage.vue';
import CustomerList from './components/CustomerList.vue';
import CustomerAdd from './components/CustomerAdd.vue';
import CustomerEdit from './components/CustomerEdit.vue';

import InstallmentList from './components/InstallmentList.vue';
import InstallmentAdd from './components/InstallmentAdd.vue';
import InstallmentEdit from './components/InstallmentEdit.vue';
import InstallmentDelete from './components/InstallmentDelete.vue';
import PaymentSuccess from './components/PaymentSuccess.vue';
import PaymentFailed from './components/PaymentFailed.vue';

import {createRouter,createWebHistory} from 'vue-router';

const routes=[
	{
		name:'SignIn',
		component:SignIn,
		path:'/signin',
	},
	{
		name:'HomePage',
		component:HomePage,
		path:'/',
	},
	{
		name:'CustomerList',
		component:CustomerList,
		path:'/customers',
	},
	{
		name:'CustomerAdd',
		component:CustomerAdd,
		path:'/customer/add',
	},
	{
		name:'CustomerEdit',
		component:CustomerEdit,
		path:'/customer/:id/edit',
	},
	{
		name:'InstallmentList',
		component:InstallmentList,
		path:'/installments',
	},
	{
		name:'InstallmentAdd',
		component:InstallmentAdd,
		path:'/installment/add',
	},
	{
		name:'InstallmentEdit',
		component:InstallmentEdit,
		path:'/installment/:customer_id/edit',
	},
	{
		name:'InstallmentDelete',
		component:InstallmentDelete,
		path:'/installment/:customer_id/delete',
	},
	{
		name:'PaymentSuccess',
		component:PaymentSuccess,
		path:'/payment/success/:id',
	},
	{
		name:'PaymentFailed',
		component:PaymentFailed,
		path:'/payment/failed/:id',
	}
	
];

const router=createRouter({
	history:createWebHistory(),
	routes,

});
export default router;

