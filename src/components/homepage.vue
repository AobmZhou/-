<template>
	<div class="protype-product">
	<el-container style="height:100%;">	
	  <el-header>
		
		  <el-menu
		    :default-active="activeIndex"
			:router="true"
		    class="el-menu-demo"
		    mode="horizontal"
		    @select="handleSelect"
		    background-color="#545c64"
		    text-color="#fff"
		    active-text-color="#ffd04b"
			style="background-color:#2C3242;">
			
		    <el-submenu index="1">
		      <template slot="title">应急柴油机振动监测系统</template>
		      <el-menu-item index="/1-1">机组概貌图</el-menu-item>
		      <el-menu-item index="/1-2">运行状态图</el-menu-item>
		      <el-menu-item index="/1-3">历史比较图</el-menu-item>
			  <el-menu-item index="/1-4">单值棒图</el-menu-item>
			  <el-menu-item index="/1-5">动态压力监测</el-menu-item>
			  <el-menu-item index="/1-6">事件查询</el-menu-item>
			  <el-menu-item index="/1-7">振动监测</el-menu-item>
			  <el-menu-item index="/1-8">瞬时转速</el-menu-item>
			  <el-menu-item index="/1-9">扭振</el-menu-item>
			  <el-menu-item index="/1-10">多参数分析</el-menu-item>
			  <el-menu-item index="/1-11">综合监测</el-menu-item>
			  <el-menu-item index="/1-12">示功图</el-menu-item>
			  <el-menu-item index="/1-13">冲击诊断</el-menu-item>
			  <el-menu-item index="/1-14">其他参数趋势图</el-menu-item>
			  <el-menu-item index="/1-15">往复报警查询</el-menu-item>
			  <el-menu-item index="/1-16">开停车状态分析</el-menu-item>
			  <el-menu-item index="/1-17">开停车事件查询</el-menu-item>
		    </el-submenu>
			
			<el-submenu index="2">
			  <template slot="title">往复机械专用图谱</template>
			  <el-menu-item index="/2-1">
				 <img class="image" src="../assets/index1.png">
				  机组概貌图
			  </el-menu-item>
			  <el-menu-item index="/2-2">
				   <img class="image" src="../assets/index2.png">
				  往复报警查询
				  </el-menu-item>
			  <el-menu-item index="/2-3">
				   <img class="image" src="../assets/index3.png">
				  运行状态图
				  </el-menu-item>
			  <el-menu-item index="/2-4">
				   <img class="image" src="../assets/index4.png">
				  历史比较图
				  </el-menu-item>
			  <el-menu-item index="/2-5">
				   <img class="image" src="../assets/index5.png">
				  单值棒图
				  </el-menu-item>
			  <el-menu-item index="/2-6">
				   <img class="image" src="../assets/index6.png">
				  活塞杆沉降/偏摆监测
				  </el-menu-item>
			  <el-menu-item index="/2-7">
				   <img class="image" src="../assets/index7.png">
				  振动监测
				  </el-menu-item>
			  <el-menu-item index="/2-8">
				   <img class="image" src="../assets/index8.png">
				  多参数分析
				  </el-menu-item>
			  <el-menu-item index="/2-9">
				   <img class="image" src="../assets/index9.png">
				  综合监测
				  </el-menu-item>
			  <el-menu-item index="/2-10">
				   <img class="image" src="../assets/index10.png">
				  其它参数趋势图
				  </el-menu-item>
			  <el-menu-item index="/2-11">
				   <img class="image" src="../assets/index11.png">
				  示功图
				  </el-menu-item>
			  <el-menu-item index="/2-12">
				   <img class="image" src="../assets/index12.png">
				  冲击诊断
				  </el-menu-item>
			</el-submenu>
			
			<el-submenu index="3">
			  <template slot="title">旋转机械专用图谱</template>
			  <el-menu-item index="/3-1">选项1</el-menu-item>
			  <el-menu-item index="/3-2">振动监测</el-menu-item>
			  <el-menu-item index="/3-3">选项3</el-menu-item>
			</el-submenu>
			
			<el-submenu index="4">
			  <template slot="title">机泵专用图谱</template>
			  <el-menu-item index="/4-1">趋势分析</el-menu-item>
			  <el-menu-item index="/4-2">选项2</el-menu-item>
			  <el-menu-item index="/4-3">选项3</el-menu-item>
			</el-submenu>
			
			<el-submenu index="5">
			  <template slot="title">无线机泵专用图谱</template>
			  <el-menu-item index="/5-1">选项1</el-menu-item>
			  <el-menu-item index="/5-2">选项2</el-menu-item>
			  <el-menu-item index="/5-3">选项3</el-menu-item>
			</el-submenu>
			
		  </el-menu>
	  </el-header> 
	  
	<el-container>
	    <el-container class="main-container" style="padding:0;margin:0;margin-top:0;">
			<!-- Main -->
		  <el-col>
			  <div class="left" 
			  :width="isLeftCollapse ?'0px':'12%'">
				  <!-- 左侧边栏 -->
				  
					<el-input class="id" v-model="filterText"  placeholder="搜索">
					</el-input>
					
					<el-tree
					  class="filter-tree"
					  :data="data"
					  :props="defaultProps"
					  default-expand-all
					  :filter-node-method="filterNode"
					  ref="tree">
					</el-tree>
			  </div>
		  </el-col>
		  <el-col>
		  	<div class="left-hide">
		  		隐藏左侧边栏
				<el-button
				type plain
				@click="lefthide"
				style="
				padding:0;
				padding-right:0px;
				margin-top:1000%;
				margin-left:0px;
				width:20px;
				height:40px;
				border:none;
				border-radius: 0;
				background-color:#2C3242"
				icon="el-icon-caret-left">
				</el-button>
			</div>
		  </el-col>
		  <el-main
		  style="
		  overflow: auto;
		  background-color: #2C3242;
		  margin: 0;
		  margin-top:10px;
		  padding: 0;
		  width:70%;
		  height:97%;
		  margin-left:14%;
		  position: absolute;"
		  >
		  <router-view></router-view>
		  </el-main>
		  <el-col>
		  	<div class="right-hide" >
			隐藏右侧边栏
				<el-button
				type plain
				@click="righthide"
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
			  <div class="right"
			  :width="isRightCollapse ?'0px':'15%'">
				  <el-header class="right-font" style="color:#359186">
					  操作页 
				  </el-header>
				  <template>
				    <!-- `checked` 为 true 或 false -->
				    <el-checkbox v-model="checked" 
					style="margin-left:25px;
					color: white;
					">备选项</el-checkbox>
				  </template>
			  </div>
		  </el-col>
		</el-container>
	  </el-container>
	</el-container>
	</div>
</template>

<script>
export default {
	
	watch: {
	      
		filterText(val) {
	        this.$refs.tree.filter(val);
	      }
	    },
	    data() {
	      return {
	        filterText: '',
	        data: [{
	          id: 1,
	          label: '中国石油',
	          children: [{
	            id: 2,
	            label: '大庆石化',
	            children: [{
	              id: 3,
	              label: '二催化',
				  children:[{
					  id :4,
					  label: '重整',
					  children:[{
						  id :5,
						  label: 'DZTB'
					  },{
						  id :6,
						  label: 'J1102A'
					  },{
						  id :7,
						  label :'K-2038'
					  },{
						  id :8,
						  label :'P102A'
					  }]
				  }]
	            }]
	          }]
	        }],
	        defaultProps: {
	          children: 'children',
	          label: 'label'
	        }, 
	      };//return的结尾处
		  
		 
	    },//data的结尾处   
		mounted()
		{
			this.isLeftCollapse=false;
			this.isRightCollapse=false;
			checked=false;
		},
		methods: {
		lefthide(){
			this.isLeftCollapse = !this.isLeftCollapse
			console.log(this.isLeftCollapse);
		},
		righthide(){
			this.isRightCollapse = !this.isRightCollapse
			console.log(this.isRightCollapse);
		},
		filterNode(value, data) {
			if (!value) return true;
		    return data.label.indexOf(value) !== -1;
		},
		  handleSelect(key, keyPath) {
		  	console.log(key, keyPath);
		  }
		},//methods的结尾处
};
</script>

<style>
	html,
	body,
	#app,
	.protype-product,
	.el-container
	{
		padding:0;
		margin:0;
		height:100%;
		overflow: auto;
	}
.el-header{
	background-color:#2C3242;
	position: relative;
	
}
.el-menu--popup{
	padding:0 !important;
}
.el-submenu .el-submenu__title{
	background-color:#2C3242 !important;
	font-size: 14px;
	font-weight: 500;
	font-family: "\5FAE\8F6F\96C5\9ED1";
}
.el-menu--horizontal > .el-submenu.is-active .el-submenu__title
{
	border-bottom:2px solid #359186 !important;
	color:#359186 !important;
}
.el-menu-item{
	background-color:#2C3242 !important;
}
.el-menu-item.is-active{
	color:#359186 !important;
	font-family: "\5FAE\8F6F\96C5\9ED1";
}
.el-menu-item:hover{
	background-color: #232835 !important;
}
.main-container{
	display: flex;
	background-color:#232835;
	position: relative;

}
.image{
	background-color: white;
	margin: 0px;
	padding: 0;
	width: 25px;
	height: 15px;
}
.left{
	margin:10px;
	padding:0;
	width:12%;
	height:98%;
	margin-left:10px;
	position:absolute;
	overflow: auto;
	background-color: #2C3242;
}
.right{
	overflow: auto;
	margin:10px;
	height:98%;
	width:15%;
	margin-left:84%;
	position:absolute;
	background-color: #2C3242;
}
.left-hide{
	float:left;
	overflow: auto;
  	margin:10px;
  	padding:0;
  	width:30px;
  	height:98%;
  	margin-left:12.5%;	
  	position:absolute;
  	background-color:#232835;
}
.el-tree-node > .el-tree-node__content{
	background-color:#2C3242;
	color:white;
	font-family: "\5FAE\8F6F\96C5\9ED1";
}

.el-tree-node:focus > .el-tree-node__content {
	background-color:#359186 !important;
}

.el-tree-node:hover > .el-tree-node__content {
	background-color:#2C3242;
}
.id > .el-input__inner{
	height:30px;
	background:#232835;
	background-color:#232835;
	color:white;
}
.el-tree__empty-block{
	background: #2C3242;
}
.right-hide{
	float:right;
	overflow: auto;
  	margin:10px;
  	padding:0;
  	width:30px;
  	height:98%;
  	margin-left:82%;
  	position:absolute;
  	background-color:#232835;
}
.right-font{
	margin:15px;
	margin-left:0;
	height:30px !important;
	font-size: 25px;
	font-style:initial;
	font-weight: bolder;
}
.el-col-24{
	width:0 !important;
}
</style>
