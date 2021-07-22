<template>
	<button @click="get">{{pageName}}</button>
</template>

<script>
export default{
	data() {
		return{
			pageName:"defaultName",
		}
	},
	methods:{
		get(){
			this.$http.get('../equipment/getAll').then((res)=>{
				if(res.data.code==200)
				{
					var noweqInf=[];
					var nowInf=res.data.data;
					console.log(nowInf);
					for(var i=0;i<nowInf.length;i++)
					{
						noweqInf[i]=nowInf[i];
						console.log(noweqInf[i]);
					}
					console.log(res.data.data[0].companyName);
					
				}
				}).catch((err) => {console.log(err);});
		}
	}
}
</script>

<style>
</style>
