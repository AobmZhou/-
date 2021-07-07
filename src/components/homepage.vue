<template>
	<div class="protype-product">
	<el-container style="height:100%;">
	  <el-header>Header</el-header>
	  <el-container>
	    <el-main style="padding:0;margin:0;margin-top:0;">
			<!-- Main -->
		  <el-col>
			  <div class="left">
				  <!-- 左侧边栏 -->
				  <div>
					<input v-model="search" 
					placeholder="搜索"
					style="
					padding:10px;
					margin-top:2px;
					width:208px;
					height:10px;
					border-radius:4px;
					border:1px solid #DCDFE6;
					font-size:inherit;
					display:inline-block;
					background-color:#303749;
					outline:0;
					color:white;
					">
					</input>
				  </div>
			  </div>
		  </el-col>
		  <el-col>
		  	<div class="left-hide">
		  		隐藏左侧边栏
				<el-button
				type plain
				@click="left-hide" 
				style="
				padding:0;
				padding-right:0px;
				margin-top:1000%;
				width:20px;
				height:40px;
				border:none;
				border-radius: 0;
				background-color:#2C3242"
				icon="el-icon-caret-left">
				</el-button>
			</div>
		  </el-col>
		  <el-col>
		  	<div class="right-hide">
		  		隐藏右侧边栏
				<el-button
				tyoe plain
				@click="right-hide" 
				style="
				padding:0;
				padding-right:0px;
				margin-top:1000%;
				margin-left:10px;
				width:20px;
				height:40px;
				border:none;
				border-radius: 0;
				background-color:#2C3242"
				icon="el-icon-caret-right">
				</el-button>
		  	</div>
		  </el-col>
		  <el-col>
			  <div class="right">
				  <el-header class="right-font" style="color:#359186">
					  操作页
				  </el-header>
			  </div>
		  </el-col>
		</el-main>
	  </el-container>
	</el-container>
	</div>
</template>

<script>
export default{};
</script>

<style>
	html,
	body,
	#app,
	.protype-product,
	.el-container{
		padding:0;
		margin:0;
		height:100%;
	}
.el-header{
	background-color:#2C3242;
	position: relative;
	
}
.input{
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
}
.el-main{
	background-color:#232835;
	position: relative;

}
.left{
	margin:10px;
	padding:0;
	width:230px;
	height:98%;
	margin-left:10px;
	position:absolute;
	background-color: #2C3242;
}
.left-hide{
  	margin:10px;
  	padding:0;
  	width:30px;
  	height:98%;
  	margin-left:240px;
  	position:absolute;
  	background-color:#232835;
}
.right-hide{
  	margin:10px;
  	padding:0;
  	width:30px;
  	height:98%;
  	margin-left:1580px;
  	position:absolute;
  	background-color:#232835;
}
.right{
	margin:10px;
	width:300px;
	height:98%;
	margin-left:1610px;
	position:absolute;
	background-color: #2C3242;
	font-style: normal;  
}
.right-font{
	margin:15px;
	margin-left:0;
	font-size: 25px;
	font-style:initial;
	font-weight: bolder;
}
</style>
