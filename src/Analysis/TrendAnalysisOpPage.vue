<template>
  <div>
    <el-container class="trend-analysis-op-page">
      <el-header style="height: 60px">
        <label class="options">操作页</label>
      </el-header>
      <el-main style="padding: 2px;margin-left: 10px; margin-right: 10px">
        <el-form ref="ruleForm" label-width="80px" class="demo-ruleForm" size="mini">
          <el-form-item label="设备名称:">{{getequName}}</el-form-item>
          <trend-analysis-point-tree
            @firstdo="defaultdo"
            @getPointFeatureTree2Data="getmytree"></trend-analysis-point-tree>
          <div>
            <RtHisTimeSelect ref='timeset' @radiostatus='changestatus'></RtHisTimeSelect>
          </div>
          <el-form-item>
            <el-button v-if="nowstatus == 2" @click="FreshHistoryGraph">刷新</el-button>
            <el-button v-if='nowstatus == 1 &&freshstatus == 0' @click='startinterval'>刷新</el-button>
            <el-button v-if="nowstatus == 1 &&freshstatus == 1" @click='stopinterval'>停止</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>

import RtHisTimeSelect from "../components/RtHisTimeSelect.vue";
import TrendAnalysisPointTree from "../Analysis/TrendAnalysisPointTree";
// import TrendAnalysisTree from "./TrendAnalysisTree";
// import TrendAnalysisPointTree from "../PumpImpactDiagnosis/PumpImpactDiagnosisPointFeatureTree";

export default {
  name: "TrendAnalysisOpPage",
  components: {

    TrendAnalysisPointTree,
    RtHisTimeSelect,
  },
  data() {
    return {
      checkList: ['',''],
      //单通道相关数据
      mypointid: null,
      myinterval: null,
      freshstatus: 1,
      nowstatus: 1,
      msg: '',
      EquName: '',
      isnontree: false,
      mytrees: null,
      mytime: null,
      lasttree: null,
      type:0,
    };
  },
  // created(){
  //   startinterval
  // },
  mounted() {
    //接收A组件的数据
    //this.getPoint(this.msg);
    this.$parent.dataloading();
  },
  computed: {
    nodeData() {
      return this.$store.state.nodeData;
    },
    equid() {
      return this.$store.state.equid;
    },
    nodeNum() {
      return this.$store.state.nodeNum;
    },
    getequName() {
      return this.$store.state.equName;
    }
  },

  watch: {
    equid(){

      // console.log('here is not use ')
      // if(this.myinterval) {
      //     var CancelToken = this.$axios.CancelToken;
      //     clearInterval(this.myinterval)
      // }
      // if (typeof this.cancel == 'function') {
      //     this.cancel()
      // }

    }

  },

  beforeDestroy() {
    if(this.myinterval) {
      clearInterval(this.myinterval)
    }
  },


  methods: {
    isequaltree(tree1, tree2) {
      var len1 = tree1.length;
      var len2 = tree2.length;
      if (len1 != len2) {
        return false
      } else {
        for (var i = 0; i < len1; ++i) {
          if (tree1[i].id != tree2[i].id) {
            return false;
          }
        }
        return true;
      }
    },

    getmytree(mytreedata) { //用于接收测点树的数据
        this.mytrees = mytreedata;
        console.log(this.mytrees,'tree sheding ')
        // console.log(this.mytrees.checkedNodes[0].id)
        if (this.nowstatus == 1) {
          this.startinterval();
        } else {
          if(this.myinterval) {
            var CancelToken = this.$axios.CancelToken;
            clearInterval(this.myinterval)
          }
          if (typeof this.cancel == 'function') {
            this.cancel()
          }
          this.FreshHistoryGraph();
        }

    },

    FreshHistoryGraph() {
      console.log(this.mytrees,'dayinxiaa')
      if (this.mytrees.treeSelect == 0) {
        if (this.mytrees.checkedNodes.length === 1) {
          //判断空树
          this.isnontree = true;
          this.$emit('cleanChart');

          this.$parent.$emit('datafail')
        } else {

          //  that.$parent.$emit('datafail')
          this.$parent.dataloading();
          this.mytime = this.$refs.timeset.timedata();
          var stime = this.mytime.form.starttime;
          var etime = this.mytime.form.endtime;

          var pointids = '';
          for (var i = 1; i < this.mytrees.checkedNodes.length; ++i) {
            pointids += this.mytrees.checkedNodes[i].id;
            if (i != this.mytrees.checkedNodes.length - 1) {
              pointids += ','
            }
          }
          if(this.mytrees.checkedNodes[0].id== '振动-位移'|| this.mytrees.checkedNodes[0].id== '振动-加速度'){
            this.type = 113;
          }else if(this.mytrees.checkedNodes[0].id== '振动-速度'){
            this.type = 114;
          }
          this.mypointid = pointids;
          if(this.myinterval) {
            clearInterval(
              this.myinterval
            )
          }
          this.$emit('drawhistoryduotongdao', this.$store.state.equid, this.mypointid, stime, etime, this.mytrees.checkedNodes, this.mytrees.featureSelect,this.type);
        }
      } else {
        if(this.myinterval) {
          clearInterval(this.myinterval)
        }
        if (this.mytrees.checkedNodes.length === 0) {
          //判断空树
          this.isnontree = true;
          this.$emit('cleanChart');
          this.$parent.$emit('datafail');
        } else {
          if(this.myinterval) {
            clearInterval(this.myinterval)
          }
          this.$parent.dataloading();
          this.mytime = this.$refs.timeset.timedata();
          var stime = this.mytime.form.starttime;
          var etime = this.mytime.form.endtime;
          //console.log(stime, etime)
          this.mypointid = this.mytrees.checkedNodes[0].pointUuid;
          // console.log("操作页dayin");
          // console.log(this.mytrees.checkedNodes[0].label)
   /*       if(this.mytrees.checkedNodes[0].id== '振动-位移'|| this.mytrees.checkedNodes[0].id== '振动-加速度'){
            this.type = 113;
          }else if(this.mytrees.checkedNodes[0].id== '振动-速度'){
            this.type = 114;
          }*/
          if(this.myinterval) {
            clearInterval(
              this.myinterval
            )
          }
          this.$emit('drawhistorydantongdao', this.$store.state.equid, this.mytrees.checkedNodes[0].xid, stime, etime, this.mypointid, this.mytrees.checkedNodes,this.mytrees.checkedNodes[0].label);
        }


      }
    },

    startinterval() {  //实时情况下每三秒接收一次数据
      this.freshstatus = 1;
      this.getrealdata();
      this.lasttree = this.mytrees;
      let that = this;
      if(this.myinterval){
        clearInterval(this.myinterval)
      }
      // return
      this.myinterval = setInterval(function () {
        //如果两次间隔的测点树一致之间添加数据n
        console.log()
        if (that.isequaltree(that.mytrees.checkedNodes, that.lasttree.checkedNodes)) {
          // console.log(12334)
          if (that.mytrees.treeSelect == '0' && that.mytrees.featureSelect != that.lasttree.featureSelect) {
            that.getrealdata();
            that.lasttree = that.mytrees;
          } else {
            // console.log(232323)
            if (that.isnontree != true) {  //空树不需要添加数据
              if (that.mytrees.treeSelect == 1) {
                that.$emit('addrealdantongdao');
              } else {
                that.$emit('addrealduotongdao', that.$store.state.equid, that.mypointid);
              }

            }
          }
        } else {
          //否则更新
          console.log('here is not interval');
          that.getrealdata();
          that.lasttree = that.mytrees;
          if(this.myinterval) {
            clearInterval(this.myinterval);
          }
          this.$nextTick(()=> {this.startinterval()})
        }

      }, 3000)

    },


    async getrealdata() {
      //初始化树，并添加第一次访问的图谱数据
      let that = this;

      if (this.mytrees.treeSelect == 0) {
        if (this.mytrees.checkedNodes.length === 1) {
          //判断空树
          this.isnontree = true;
          this.$emit('cleanChart');

          // that.$parent.$emit('datafail')
        } else {
          this.isnontree = false;
          var pointids = '';
          for (var i = 1; i < this.mytrees.checkedNodes.length; ++i) {
            pointids += this.mytrees.checkedNodes[i].id;
            if (i != this.mytrees.checkedNodes.length - 1) {
              pointids += ','
            }
          }
          if(this.mytrees.checkedNodes[0].id== '振动-位移'|| this.mytrees.checkedNodes[0].id== '振动-加速度'){
            this.type = 113;
          }else if(this.mytrees.checkedNodes[0].id== '振动-速度'){
            this.type = 114;
          }
          this.mypointid = pointids;
          // console.log(this.mypointid)
          console.log( this.$store.state.equid, pointids, this.mytrees.checkedNodes, this.mytrees.featureSelect,this.type)
          await that.$emit('drawrealduotongdao', this.$store.state.equid, pointids, this.mytrees.checkedNodes, this.mytrees.featureSelect,this.type);
        }
      } else {
        if (this.mytrees.checkedNodes.length === 0) {
          //判断空树
          this.isnontree = true;
          this.$emit('cleanChart');
          console.log(2);
          that.$parent.$emit('datafail')
        } else {
          this.isnontree = false;
          that.$parent.dataloading();
          this.mypointid = this.mytrees.checkedNodes[0].pointUuid;
          if(this.mytrees.checkedNodes[0].id== '振动-位移'|| this.mytrees.checkedNodes[0].id== '振动-加速度'){
            this.type = 113;
          }else if(this.mytrees.checkedNodes[0].id== '振动-速度'){
            this.type = 114;
          }
          await  this.$emit('realdantongdao', this.$store.state.equid, this.mytrees.checkedNodes[0].xid, this.mypointid, this.mytrees.checkedNodes, this.type);
        }

      }

    },

    defaultdo() {
      console.log('--------------start------------------')
      // console.log('default is user')
      // if (this.nowstatus == 1) {
      //     this.startinterval();
      // }
    },

    stopinterval() {
      this.freshstatus = 0;
      if (this.myinterval) {
        clearInterval(this.myinterval);
      }
    },

    async changestatus(data) {
      this.nowstatus = data;
      if (this.nowstatus == 1) {
          this.startinterval();

      } else {
        if (this.myinterval) {
          clearInterval(this.myinterval);

        }
        await this.FreshHistoryGraph();
      }

    },


  }
};
</script>

<style lang="scss">
.trend-analysis-op-page {
  .el-input{
    width: 150px;
  }
  .el-checkbox__label {
    font-size: 13px;
    color: white;
  }

  .el-header {
    height: 60px;
    background: #303749;
	line-height: 60px;
	font-size: 24px;
	font-weight: 700;

    .options {
      color: #359186;
    }
  }

  .el-main {
    padding: 2px;
    margin-left: 10px;
    margin-right: 10px
  }

  .el-form {
    .el-select {
      width: 70%;
    }

    .el-form-item__label {
      color: #ffffff;
    }

    .el-form-item__content {
      color: #ffffff;
      font-size: 14px;
    }
  }
  .baoluo{
    .el-form-item{
      margin-bottom: 0px !important;
    }
  }
}
</style>

