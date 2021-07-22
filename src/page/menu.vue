<template>

  <el-container class="box" @click.native="handleClick">

    <el-header>
      <div>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          :unique-opened="true"
          menu-trigger="click"
          ref="topMenu"
          @select="handleSelect"
          @open="handleOpen"
          background-color="#2c3242"
          text-color="white"
          active-text-color="#359186">
          <el-submenu index="1" >
            <template slot="title">机泵专用图谱</template>
            <el-menu-item index="TrendAnalysis" >振动监测</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </el-header>

    <el-container class="content">
      <div class="left-aside" id="leftAside">
        <div class="left-content" :style="{width: '230px'}" v-show="showMenu">
          <PlantTree class="trees" @NowEquid="ChangEquId" ></PlantTree>
        </div>
        <div class="menu-hide">
          <i class="el-icon-caret-left op-button" v-if="showMenu" v-on:click="changeflag"></i>
          <i class="el-icon-caret-right op-button" v-else v-on:click="changeflag"></i>
        </div>
      </div>
      <div class="main" :style="{width: nowwidth}">

        <router-view
          @showOpPage='setOpPage'
        ></router-view>

      </div>
    </el-container>
  </el-container>

</template>

<script>
  import PlantTree from "../components/Tree.vue";
  var elementResizeDetectorMaker = require("element-resize-detector");

  export default {
    // props:[username],
    name: "Home",
    data() {
      return {
        nowwidth: (window.screen.width - 270) + 'px',
        showMenu: true,
        equid: '',
        nowpos: '',
        nowWidth: 0,
        nowHeight: 0,
        nowOpenedIndex: 0,
        isOpened: false,
      }
    },

    mounted() {

      if (document.getElementById("lefttupu")) {
        var erd = elementResizeDetectorMaker();
        var plantHeight = elementResizeDetectorMaker();
        let that = this;
        that.$nextTick(function () {
          erd.listenTo(document.getElementById("lefttupu"), function (element) {
            var width = element.offsetWidth;
            var height = element.offsetHeight;
            // this.nowHeight=height
            that.$nextTick(function () {
              console.log("Size: " + width + "x" + height);
              this.nowWidth = width;
              // this.nowHeight= height.toString()+'px'
              //  console.log(this.nowHeight)
            });
          });

          plantHeight.listenTo(document.getElementById("leftAside"), function (element) {
            var plant_height = element.offsetHeight;
            if (document.getElementById("UnitOverviewMap")) {
              document.getElementById("UnitOverviewMap").style.height = plant_height.toString() + 'px';
            }
          });
        });
      }
    },

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

    watch: {
      etype(type) {
        console.log(type, 'qileguaile')
        this.handleSelect("TrendAnalysis");
      }
      
    },


    methods: {
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
              console.log("Size: " + width + "x" + height);
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
      changeflag() {
        if (this.showMenu === true) {
          this.showMenu = false;
          this.$store.state.showOp = false;
          this.nowWidth = this.nowWidth + 230;
          this.nowwidth = (Number(this.nowwidth) + 230) + 'px'
          document.getElementById("lefttupu").style.width = this.nowWidth.toString() + 'px';

        } else {
          this.showMenu = true;
          this.$store.state.showOp = true;
          this.nowWidth = this.nowWidth - 230;
          this.nowwidth = (Number(this.nowwidth) - 230) + 'px'
          document.getElementById("lefttupu").style.width = this.nowWidth.toString() + 'px';


        }
      },
      setOpPage(param) {
        console.log(param);
        if (param === false) {
          this.nowWidth = this.nowWidth + 290;
          document.getElementById("lefttupu").style.width = this.nowWidth.toString() + 'px';
        } else {
          this.nowWidth = this.nowWidth - 290;
          document.getElementById("lefttupu").style.width = this.nowWidth.toString() + 'px';
        }
      }


    },
    components: {
      PlantTree,
    },
  }
</script>

<style lang="scss">
  .box {
    display: flex;
    height: 100%;

    .el-header {
      background-color: #2c3242;
      color: #fff;
      line-height: 60px;
      font-size: 24px;
      font-weight: bold;
      /*box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)*/
      .another_item {
        float: right;
      }
    }

    .content {
      // height: 100%;
      height: calc(100% - 80px);
      background-color: #232835;
    }

    .left-aside {
      display: flex;
      /* overflow: hidden;*/
      margin: 10px;
      background-color: #232835; //设备树背景色在这里
      .left-content {
        // height: 300px;
        background: #303749;
        overflow: auto;
      }

      .menu-hide {
        height: 100%;
        width: 20px;
        float: left;
        background-color: #232835;
        display: flex;
        align-items: center;

        .op-button {
          width: 20px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #303749;
          color: #359186;
          position: absolute;
          cursor: pointer;
        }
      }
    }

    .el-menu.el-menu--horizontal {
      border-bottom: solid 0px #303749;
    }

    .el-aside {
      color: #333;
      text-align: center;
      line-height: 205px;
      border: 1px solid #303749;
    }

    .el-main {
      padding: 0;
      /*border: 1px solid #2F4554;*/

    }

    .main {
      flex: 1;
      height: 100%;
      background: #303749;
    }

    .trees {
      width: 100%;
      height: 780px;
    }

  }

</style>
