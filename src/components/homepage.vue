<template>
	<div class="protype-product">
	<el-container style="height:100%;">	
	  <el-header class="header">
		
		  <el-menu
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
			  <el-menu-item index="/3-2">选项2</el-menu-item>
			  <el-menu-item index="/3-3">选项3</el-menu-item>
			</el-submenu>
			
			<el-submenu index="4">
			  <template slot="title">机泵专用图谱</template>
			  <el-menu-item index="/4-1">趋势分析</el-menu-item>
			  <el-menu-item index="/4-2">振动监测</el-menu-item>
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

			  <div class="left"
			  :style="'width:'+LeftWidth+'%;'">
				  <!-- 左侧边栏 -->
					<el-input class="id" v-model="filterText"  placeholder="搜索">
					</el-input>
					
					<!-- <el-tree
					  class="filter-tree"
					  :data="data"
					  :props="defaultProps"
					  default-expand-all
					  :filter-node-method="filterNode"
					  ref="tree"
					  @node-click="handleNodeClick">
					</el-tree> -->
					
					<Tree class="trees" @NowEquid="ChangEquId" ></Tree>
					
			  </div>
			  <div class="main" :style="{width: nowwidth}">
			  
			    <router-view
			      @showOpPage='setOpPage'
			    ></router-view>
			  
			  </div>
		  <!-- :style="'width:'+MainWidth+'%;'" -->
		  <!-- <el-main
		  style="
		  background-color: #2C3242;
		  margin-top:10px;
		  margin-left:14%;
		  position:absolute;
		  width:86%;
		  height:97%;"
		  >
		  <router-view></router-view>
		  </el-main> -->
			<!-- <div 
				class="right-hide"
				align="center"
				:style="'margin-left:'+RightHideWidth+'%;'">
				<el-button
				type plain
				@click="righthide"
				style="
				padding:0;
				padding-right:0px;
				margin-top:1200%;
				margin-left:8px;
				width:20px;
				height:40px;
				border:none;
				border-radius: 0;
				background-color:#2C3242"
				icon="el-icon-caret-right">
				</el-button>
		  	</div> -->
			  <!-- <div class="right"
			  :style="'width:'+RightWidth+'%;'">
			  </div> -->
		</el-container>
	  </el-container>
	</el-container>
	</div>
</template>

<script>
import Tree from "../components/Tree";
var elementResizeDetectorMaker = require("element-resize-detector");

export default {
	computed: {
	
	  etype() {
	    return this.$store.state.etype;
	  },
	  nowequid() {
	    return this.$store.state.equid.toString();
	  },
	  nowequname() {
	    return this.$store.state.equName.toString();
	  },
	
	  activeIndex() {
	    //alert(this.$route.path.replace('/', ''));
	    return this.$route.path.replace('/', '');
	  }
	},
	components: {
	  Tree,
	},
	watch: {
		filterText(val) {
	        this.$refs.tree.filter(val);
	      }
	    },
	    data() {
	      return {
			nowwidth: (window.screen.width - 270) + 'px',
			isRightCollapse:false,
			MainWidth:68,
			RightWidth:15,
			RightHideWidth:82.5,
			checked:false,
	        filterText: '',
			showOpPage: true,
	      };//return的结尾处
		  
		 
	    },//data的结尾处   
		methods: {
			setOpPage(param) {
			  console.log(param);
			  if (param === false) {
			    this.nowWidth = this.nowWidth + 290;
			    document.getElementById("lefttupu").style.width = this.nowWidth.toString() + 'px';
			  } else {
			    this.nowWidth = this.nowWidth - 290;
			    document.getElementById("lefttupu").style.width = this.nowWidth.toString() + 'px';
			  }
			},
		righthide(){
			this.isRightCollapse = !this.isRightCollapse
			if(this.isRightCollapse==true)
			{
				this.RightWidth=0;
				this.RightHideWidth=98;
				this.MainWidth=this.MainWidth+15;
			};
			if(this.isRightCollapse==false)
			{
				this.MainWidth=this.MainWidth-15;
				this.RightWidth=15;
				this.RightHideWidth=82.5;
			};
		},
		filterNode(value, data) {
			if (!value) return true;
		    return data.label.indexOf(value) !== -1;
		},
		ChangEquId() {
		  this.equid = this.$store.state.equid;
		},
		handleClick() {
		  // if()
		  // console.log(this.nowOpenedIndex.toString());
		  if (this.isOpened != true) {
		    this.$refs.topMenu.close(this.nowOpenedIndex.toString());
		  }
		  this.isOpened = false;
		},
		handleOpen(index) {
		  this.nowOpenedIndex = index;
		  // console.log(index)
		  this.isOpened = true;
		},
		handleSelect(index, keyPath) {
		  //     console.warn(index, keyPath);
		  if (index === 'TrendAnalysis') {
		    this.nowpos = '/TrendAnalysis';
		    this.$router.push({path: "/TrendAnalysis"});
		  }
		  this.$router.push({query: {equipmentUuid: this.nowequid}});
		  var erd = elementResizeDetectorMaker();
		  var plantHeight = elementResizeDetectorMaker();
		  let that = this;
		  that.$nextTick(function () {
		    erd.listenTo(document.getElementById("lefttupu"), function (element) {
		      var width = element.offsetWidth;
		      var height = element.offsetHeight;
		      that.$nextTick(function () {
		        this.nowWidth = width;
		      });
		    });
		
		    plantHeight.listenTo(document.getElementById("leftAside"), function (element) {
		      var plant_height = element.offsetHeight;
		      if (document.getElementById("UnitOverviewMap")) {
		        document.getElementById("UnitOverviewMap").style.height = plant_height.toString() + 'px';
		      }
		    });
		  });
		
		},
		// handleSelect(key, keyPath) {
		//   	console.log(key, keyPath);
		// },
		// handleNodeClick(data) {
		// 	if(data.id == 5)
		// 	this.$router.push('/2-1');		
		// 	if(data.id == 6)
		// 	this.$router.push('/3-1');
		// 	if(data.id == 7)
		// 	this.$router.push('/4-1');
		// 	if(data.id == 8)
		// 	this.$router.push('/5-1');
		// }
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
.header{
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
.main{
	margin-left: 14%;
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
	height:98%;
	width:12.5%;
	margin-left:10px;
	position:absolute;
	overflow: auto;
	background-color: #303749;
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
	overflow: auto;
  	margin:10px;
  	padding:0;
  	width:30px;
  	height:98%;	
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
	overflow: auto;
  	margin:10px;
  	padding:0;
  	width:30px;
  	height:98%;
  	margin-left:82.5%;
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
.mainbox{
	width:88%;
	height:98%;
	margin-left: 14%;
}

</style>
