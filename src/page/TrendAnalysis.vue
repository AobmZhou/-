<template>
  <div class="trend-analysis">
    <div class='tupu' id='lefttupu'>
      <div :style="{height : highexe(1) , width:'100%'}" v-show="fullId===1||fullId===0" @dblclick="handledblclick(1)">
        <TrendGraph ref='trendg' @cancelFull="handledblclick(1)" @chartinfo="drawWaveSpectrum" class="graph" @refine="refine" @cancelRefine="cancelRefine"></TrendGraph>
      </div>
      <div :style="{height : highexe(2) , width:'100%'}" v-show="fullId===2||fullId===0" @dblclick="handledblclick(2)">
        <SpeedTrendGraph ref='trendg_another' @cancelFull="handledblclick(2)" class="graph" @refine="refine" @cancelRefine="cancelRefine"></SpeedTrendGraph>
      </div>
      <div :style="{height :highexe(3) , width:'100%'}" v-show="fullId===3||fullId===0" @dblclick="handledblclick(3)">
        <WaveGraph ref='waveg' @cancelFull="handledblclick(3)" class="graph"></WaveGraph>
      </div>
      <div :style="{height : highexe(4) , width:'100%'}" v-show="fullId===4||fullId===0" @dblclick="handledblclick(4)">
        <SpectrumGraph ref="spectrumg" @cancelFull="handledblclick(4)"  ></SpectrumGraph>
      </div>
    </div>
    <div class="op-hide">
      <div class="box-head"></div>
      <i class="el-icon-caret-right op-button" v-if="showOpPage" v-on:click="showOrHide"></i>
      <i class="el-icon-caret-left op-button" v-else v-on:click="showOrHide"></i>
      <div class="box-bottom"></div>
    </div>
    <div class='op' id='rightop' v-show="showOpPage">
      <trend-analysis-op-page
        @cleanChart="clearchart"
        @realdantongdao="getrealdantongdao"
        @addrealdantongdao="addrealdantongdao"
        @drawhistorydantongdao="drawhistorydantongdao"
        @drawrealduotongdao="drawrealduotongdao"
        @addrealduotongdao="addrealduotongdao"
        @drawhistoryduotongdao="drawhistoryduotongdao"
        @showgraph="showgraph"
        @notshowgraph="notshowgraph"
        :style="{height: '100%'}"></trend-analysis-op-page>
    </div>
  </div>
</template>

<script>

import TrendGraph from "../Charts/TrendGraph";
import WaveGraph from "../Charts/WaveGraph";
import SpectrumGraph from "../Charts/SpectrumGraph";
import SpeedTrendGraph from "../Charts/SpeedTrendGraph";
import TrendAnalysisOpPage from "../Analysis/TrendAnalysisOpPage.vue";

export default {
  name: "TrendAnalysis",
  components: {
    TrendAnalysisOpPage,
    SpeedTrendGraph,
    SpectrumGraph,
    WaveGraph,
    TrendGraph,
  },
  data() {
    return {
      labelname: null,
      stime: null,
      etime: null,
      fullId: 0,
      isFull: false,

      showOpPage: true,
      show: false,
      graphheight: 33.3 + '%',
      fallgraphheight: '0%',
      unitname: '机泵专用图谱-趋势分析',
      onlyname: '',
      onlyone: 0,
      nowtree: null,
      chartdata: null,
      myinterval: null,
      nowpointid: null,
      tongdao: null,
      graphtype: null,
      intervalflag: 0,
      backmap: null,
      textmap: null,
      colormap: null,
      nowdata: null,
      nowtype:null
    }
  },
  created() {
    var mymap = new Map();
    mymap.set('0', "#FFE4C4");
    mymap.set('1', "#00FFFF");
    mymap.set('2', "#4B0082");
    mymap.set('3', "#F0E68C");
    mymap.set('4', "#778899");
    mymap.set('5', "#7B68EE");
    mymap.set('6', "#FF0000");
    mymap.set('7', "#FFFAFA");
    mymap.set('8', "#008080");
    mymap.set('9', "#FA8072");
    mymap.set('10', "#D3D3D3");
    mymap.set('11', "#FFFFE0");
    this.colormap = mymap;
    mymap = new Map();
    mymap.set('0', "通频");
    mymap.set('1', "1倍频幅值");
    mymap.set('2', "2倍频幅值");
    mymap.set('3', "3倍频幅值");
    mymap.set('4', "1/2倍频幅值");
    mymap.set('5', "残振");
    mymap.set('6', "直流量");
    mymap.set('7', "间隙电压");
    mymap.set('8', "1倍频相位");
    mymap.set('9', "2倍频相位");
    mymap.set('10', "3倍频相位");
    mymap.set('11', "1/2倍频相位");
    this.textmap = mymap;
    mymap = new Map();
    mymap.set("0", 'all');
    mymap.set("1", 'one');
    mymap.set("2", 'two');
    mymap.set("3", 'three');
    mymap.set("4", 'half');
    mymap.set("5", 'res');
    mymap.set("6", 'dc');
    mymap.set("7", 'gap');
    mymap.set("8", 'phaseOne');
    mymap.set("9", 'phaseTwo');
    mymap.set("10", 'phaseThree');
    mymap.set("11", 'phaseHalf');
    this.backmap = mymap;

  },

  mounted() {
    this.$emit('changename', this.unitname);
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
    equName() {
      return this.$store.state.equName;
    },
    features() {
      return this.$store.state.features;
    }
  },

  watch: {
    equid(){
      this.clearchart();
    }
  },
  methods: {
    handledblclick(id){
      if(this.isFull){
        this.isFull = false
        this.fullId = 0
        this.$refs.trendg.setIsFull(false);
        this.$refs.trendg_another.setIsFull(false);
        this.$refs.waveg.setIsFull(false);
        this.$refs.spectrumg.setIsFull(false);
      }else {
        this.isFull = true
        this.fullId = id
        this.$refs.trendg.setIsFull(true);
        this.$refs.trendg_another.setIsFull(true);
        this.$refs.waveg.setIsFull(true);
        this.$refs.spectrumg.setIsFull(true);
      }
      console.log(id)

    },
    highexe(id){
      if(this.isFull){
        if(id === this.fullId){
          return "100%"
        }else {
          return  "0%"
        }
      }else {
        return "25%"
      }
    },

    showOrHide() {
      if (this.showOpPage == true) {
        this.showOpPage = false;
        this.$emit("showOpPage", false);
        // this.$refs.trendg.resize();
      } else {
        this.showOpPage = true;
        this.$emit("showOpPage", true);
        // this.$refs.trendg.resize();
      }
    },
    showgraph() {
      this.show = true;
      this.graphheight = '20%';
      this.fallgraphheight = '40%';
      this.$nextTick(() => {
        this.$refs.trendg.mychart.resize();
        this.$refs.waveg.mychart.resize();
        this.$refs.spectrumg.mychart.resize();
      })

    },
    notshowgraph() {
      this.show = false;
      this.graphheight = 100 / 3 + '%';
      this.fallgraphheight = '0%';
      this.$nextTick(() => {
        this.$refs.trendg.mychart.resize();
        this.$refs.waveg.mychart.resize();
        this.$refs.spectrumg.mychart.resize();
      })
    },

    infoname(myname) {
      this.$emit('setinfoname', myname);
    },
    dataloading() {
    },

    stopnowinterval() {
      if (this.myinterval) {
        clearInterval(this.myinterval);
      }
    },
    refine(stime, etime) {
      // this.dataloading();

      if (this.tongdao == 1) {
        this.gethisdantongdaoData(this.nowpointid, this.pointIdString, stime, etime, this.labelname)
        console.log(this.nowpointid, this.pointIdString, stime, etime, this.pointuuid, this.nowtree,this.nowtype)
      } else {
        this.gethisduotongdaoData(this.nowpointid, this.pointIdString, stime, etime, this.nowtree, this.feature,this.nowtype);

      }
    },

    cancelRefine() {
      if (this.tongdao == 1) {
        this.gethisdantongdaoData(this.nowpointid, this.pointIdString, this.stime, this.etime, this.labelname)
        console.log(this.nowpointid, this.pointIdString, stime, etime, this.pointuuid, this.nowtree,this.nowtype)
      } else {
        this.gethisduotongdaoData(this.nowpointid, this.pointIdString, this.stime, this.etime, this.nowtree, this.feature,this.nowtype);

      }
    },

    drawhistoryduotongdao(equipmentUuid, pointIdString, stime, etime, mytree, feature,type) {
      this.tongdao = 0;
      this.graphtype = '历史';
      this.nowtree = mytree;
      this.nowpointid = equipmentUuid;
      this.pointIdString = pointIdString;
      this.feature = feature;
      this.nowtype=type;
      this.stime = stime;
      this.etime = etime;
      this.gethisduotongdaoData(equipmentUuid, pointIdString, stime, etime, mytree, feature,type);
    },
    gethisduotongdaoData(equipmentUuid, pointIdString, stime, etime, mytree, feature,type) {
      // console.log(mytree, feature,type)
      // console.log("*******************88")
      var textname = this.textmap.get(feature.toString());
      this.onlyname = textname;
      var textstring = this.backmap.get(feature.toString());
      this.onlyone = textstring;
      var equipmentUuid1 = encodeURIComponent(equipmentUuid);
      var pointIdString1 = encodeURIComponent(pointIdString);
      var netinfor = ( '/trend/' + equipmentUuid1 + '/' + pointIdString1 + '/' + stime + '/' + etime + "/info");
      this.$axios.get(netinfor/*, {
        cancelToken: new CancelToken((c) => {
          // executor 函数接收一个 cancel 函数作为参数
          this.cancel = c;
        })
      }*/).then(res => {
        if (res.data.code === 200) {
          // console.log(res);
          // console.log("44")
          this.chartdata = res.data.data;
          var title = this.chartdata.equipmentName + ' 历史';
          var trendinfo = this.chartdata.trendInfo;
          var flagX = '[时间]';
          var flagY = '[]';
          flagY='[' + this.features[type][this.feature].unit + ']';
        /*  if(trendinfo.length > 0) {
            var flagY = '[' + res.data.data.trendInfo[0].unit + ']' || '[um]';
          } else {
            var flagY = '[um]';
          }*/
          var dataX = [];
          var dataY = [];
          var valueY = [];
          for (var i = 1; i < this.nowtree.length; ++i) {
            valueY.push([]);
          }
          //  that.timestampToTime(this.chartdata.trendTime);
          for (var i = 0; i < trendinfo.length; ++i) {
            dataX.push(this.timestampToTime(trendinfo[i].trendTime));
            for (var j = 1; j < this.nowtree.length; ++j) {
              valueY[j - 1].push(trendinfo[i].trendValue[j - 1][this.onlyone])
            }
          }


          for (var i = 1; i < this.nowtree.length; ++i) {
            dataY.push({
              name: this.nowtree[i].label,
              data: valueY[i - 1],
              color: this.colormap.get(i.toString())
            })


          }

          let newY = [{name: this.equName, data: trendinfo.map(item => item.rev)}];
          if(dataX.length) {
            this.$refs.trendg.setchart(flagX, flagY, dataX, dataY, title);
            this.$refs.trendg_another.setchart(flagX, '[r/min]', dataX, newY, `${this.equName} 历史转速`);
            var myinfo = {
              name: dataX[0],
              seriesName: this.nowtree[1].label,
              //  seriesID:this.nowtree[1].id

            };
            this.drawWaveSpectrum(myinfo)
          }

        } else {
          this.clearchart();
          this.$emit('datafail')
          //this.$message.error(res.data.message);
        }
      })


    },



    addrealduotongdao(equid, pointids) {


      if (typeof this.cancel == 'function') {
        this.cancel()
      }
      let equid1 = encodeURIComponent(equid);
      let pointids1 = encodeURIComponent(pointids);
      this.$axios.get(("/trend/" + equid1 + "/" + pointids1 + "/real_time")).then(res => {
        if (res.data.code === 200) {

          let that = this;
          this.chartdata = res.data.data;
          var title = this.chartdata.equipmentName + ' 实时';

          var newX = that.timestampToTime(this.chartdata.trendTime);
          var dataY = [];
          var newY_rev = [];
          for (var i = 1; i < this.nowtree.length; ++i) {
            var newY = this.chartdata.trendValue[i - 1][this.onlyone];
            dataY.push(newY);
          }
          var nownum_rev = this.chartdata.rev;
          newY_rev.push(nownum_rev);

          var wavedata = this.chartdata.waveValue || {
            waveUnit: {}
          };
          var wavex = '[' + wavedata.waveUnit.x + ']' || '';
          var wavey = '[' + wavedata.waveUnit.y + ']' || '';
          var wavedataX = wavedata.waveX || [];
          var wavedataY = {
            name: this.nowtree[1].label,
            data: wavedata.waveY || []
          };

          var spectrumdata = this.chartdata.spectrumValue || {
            spectrumUnit: {}
          };
          var spectrumx = '[' + spectrumdata.spectrumUnit.x + ']' || '';
          var spectrumy = '[' + spectrumdata.spectrumUnit.y + ']' || '';
          var spectrumdataX = spectrumdata.spectrumX || [];
          var spectrumdataY = {
            name: this.nowtree[1].label,
            data: spectrumdata.spectrumY || []
          };


          this.$refs.trendg.changechart(newX, dataY);

          this.$refs.trendg_another.changechart(newX, newY_rev);
          this.$refs.waveg.setchart(wavex, wavey, wavedataX, wavedataY, title, newX);
          this.$refs.spectrumg.setchart(spectrumx, spectrumy, spectrumdataX, spectrumdataY, title, newX);

        } else {
          this.clearchart();
          this.$emit('datafail')
          //this.$message.error(res.data.message);
        }
      })

    },
    drawrealduotongdao(equid, pointids, mytree, feautre,type) {
      console.log("2@@@@@@@@@@@@@@@@@@@@",type,feautre);
      // console.log(this.features[type][feautre].unit)
      this.tongdao = 0;
      this.graphtype = '实时'
      this.nowtree = mytree;
      var textname = this.textmap.get(feautre.toString());
      this.onlyname = textname;
      var textstring = this.backmap.get(feautre.toString());
      this.onlyone = textstring;

      if (typeof this.cancel == 'function') {
        this.cancel()
      }
      var equid1 = encodeURIComponent(equid);
      var pointids1 = encodeURIComponent(pointids);

      this.$axios.get("/trend/" + equid1 + "/" + pointids1 + "/real_time"/*, {
        cancelToken: new CancelToken((c) => {
          // executor 函数接收一个 cancel 函数作为参数
          this.cancel = c;
        })
      }*/).then(res => {
        // console.log('go3', res)
        if (res.data.code === 200) {
          // console.log('go2')
          let that = this;
          this.chartdata = res.data.data;
          var title = this.chartdata.equipmentName + ' 实时';
          var title_rev = this.equName + ' 实时转速';
          var newX = that.timestampToTime(this.chartdata.trendTime);

          var flagX = '[时间]';
          var flagY = '';
          flagY='[' + that.features[type][feautre].unit + ']';
          // if (this.nowtree[0].label.indexOf('加速度') != -1) {
          //   flagY = '[m/s2]';
          // } else if (this.nowtree[0].label.indexOf('速度') != -1) {
          //   flagY = '[mm/s]';
          // }
          var flagY_rev = '[r/min]';
          var dataX = [];
          var dataY = [];
          var dataY_rev = [];
          dataX.push(newX);
          for (var i = 1; i < mytree.length; ++i) {
            var newY = this.chartdata.trendValue[i - 1][textstring];
            console.log(mytree[i]);
            dataY.push({
              name: mytree[i].label,
              data: [newY],
              color: this.colormap.get(i.toString())
            });
          }
          var nownum_rev = this.chartdata.rev;
          dataY_rev.push({
            name: this.equName,
            data: [nownum_rev],
          });

          var wavedata = this.chartdata.waveValue || {
            waveUnit:{}
          };
          var wavex = '[' + wavedata.waveUnit.x + ']' || '';
          var wavey = '[' + wavedata.waveUnit.y + ']' || '';
          var wavedataX = wavedata.waveX || [];
          var wavedataY = {
            name: mytree[1].label,
            data: wavedata.waveY || []
          };

          var spectrumdata = this.chartdata.spectrumValue || {
            spectrumUnit:{}
          };
          var spectrumx = '[' + spectrumdata.spectrumUnit.x + ']' || '';
          var spectrumy = '[' + spectrumdata.spectrumUnit.y + ']' || '';
          var spectrumdataX = spectrumdata.spectrumX || [];
          var spectrumdataY = {
            name: mytree[1].label,
            data: spectrumdata.spectrumY || []
          };
          // console.log('it goes')

          this.$refs.trendg.setchart(flagX, flagY, dataX, dataY, title);
          var dataXX = [];
          for(var i = 0; i < dataX.length; ++i) {
            dataXX.push(dataX[i])
          }

          this.$refs.trendg_another.setchart(flagX, flagY_rev, dataXX, dataY_rev, title_rev);
          this.$refs.waveg.setchart(wavex, wavey, wavedataX, wavedataY, title, newX);
          this.$refs.spectrumg.setchart(spectrumx, spectrumy, spectrumdataX, spectrumdataY, title, newX)
        } else {
          // this.$emit('datafail')
          //this.$message.error(res.data.message);
        }
      })
    },

    drawhistorydantongdao(equipmentUuid, pointIdString, stime, etime, pointuuid, mytree,labelname) {   //单通道
      this.tongdao = 1;
      this.graphtype = '历史';
      this.nowtree = mytree;
      this.nowpointid = equipmentUuid;
      this.pointIdString = pointIdString;
      this.pointuuid = pointuuid;
      this.stime = stime;
      this.etime = etime;
      this.labelname = labelname;
      // this.nowtype = type
      // console.log("%%%%%%%%%%%",this.nowtype)
      this.gethisdantongdaoData(equipmentUuid, pointIdString, stime, etime,labelname);
    },

    cancelRequest() {
      if (typeof this.source === 'function') {
        this.source('终止请求')
      }
    },

    drawWaveSpectrum(myinfo) {
      console.log(myinfo)
      if (this.graphtype === '历史') {
        // console.log(11111111111111111)
        // console.log(myinfo)
        var equipmentUuid = this.nowpointid;
        var thistime = myinfo.name;
        var nowtime = new Date(thistime).getTime();
        var pointIdString;
        this.dataloading();
        var pointNmae;
        if (this.tongdao.toString() === '1') {
          pointIdString = this.nowtree[0].xid;
          pointNmae = this.nowtree[0].label
        } else {
          pointIdString = '';
          console.log('nowtree')
          console.log(this.nowtree)
          for(var i = 0; i < this.nowtree.length; ++i) {
            if(this.nowtree[i].label == myinfo.seriesName) {
              pointIdString = this.nowtree[i].id
            }
          }

          pointNmae = myinfo.seriesName;
        }

        var waveNumber = 16384;
        var analysisLines = 0;

        var equipmentUuid1 = encodeURIComponent(equipmentUuid);
        var pointIdString1 = encodeURIComponent(pointIdString);

        this.$axios.get("/wave-spectrum/" + equipmentUuid1 + '/' + pointIdString1 + '/' + nowtime + '/' + waveNumber + '/' + analysisLines + "/info").then(res => {

          if (res.data.code === 200) {
            // this.$emit('datasuccess');
            var name = this.nowtree[0].label
            var wavex = '[' + res.data.data.waveValue.waveUnit.x + ']';
            var wavey = '[' + res.data.data.waveValue.waveUnit.y + ']';
            var dataX = res.data.data.waveValue.waveX;

            var dataY = {
              name: pointNmae,
              data: res.data.data.waveValue.waveY
            };
            var title = res.data.data.equipmentName + ' '  + ' 历史';

            //thistime =timestampToTime(thistime);


            thistime = this.timestampToTime(nowtime);

            this.$refs.waveg.setchart(wavex, wavey, dataX, dataY, title, thistime);

            var spectrumx = '[' + res.data.data.spectrumValue.spectrumUnit.x + ']';
            var spectrumy = '[' + res.data.data.spectrumValue.spectrumUnit.y + ']';
            dataX = res.data.data.spectrumValue.spectrumX;
            var dataY = {
              name: pointNmae,
              data: res.data.data.spectrumValue.spectrumY
            };
            this.$refs.spectrumg.setchart(spectrumx, spectrumy, dataX, dataY, title, thistime);


          } else {
            // this.clearchart();
            // this.$emit('datafail')
            this.$refs.waveg.clearall();
            this.$refs.spectrumg.clearall();
            //this.$message.error(res.data.message);
          }
        }).catch(e=>{
          // this.$emit('datafail')
          this.$refs.waveg.clearall();
          this.$refs.spectrumg.clearall();
        })

      }

    },

    timestampToTime(timestamp) {
      var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
      var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
      var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
      var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()) + '.';
      var ms = (timestamp % 1000).toString();
      while (ms.length < 3) {
        ms = '0' + ms;
      }
      //var nowtime = new Date(Y+M+D+h+m+s);
      return Y + M + D + h + m + s + ms;
    },


    getrealdantongdao(equipmentUuid, pointIdString, pointuuid, mytree,type) {
      // console.log(mytree,type)
      let that = this;
      //帮助后面添加数据
      that.nowtree = mytree;
      that.nowpointid = pointuuid;
      that.tongdao = 1;
      that.graphtype = '实时';
      if (typeof this.cancel == 'function') {
        this.cancel()
      }
      var equipmentUuid1 = encodeURIComponent(equipmentUuid);
      var pointIdString1 = encodeURIComponent(pointIdString);
      console.log("/trend/" + equipmentUuid + '/' + pointIdString + "/real_time")
      that.$axios.get(("/trend/" + equipmentUuid1 + '/' + pointIdString1 + "/real_time")/*, {
        cancelToken: new CancelToken((c) => {
          // executor 函数接收一个 cancel 函数作为参数
          this.cancel = c;
        })
      }*/)
        .then(res => {
          if (res.data.code === 200) {
            // this.$emit('datasuccess');
            this.chartdata = res.data.data;
            // console.log("打印一下这个里的nowtreeeeeeeeeeeeeee");
            // console.log(this.nowtree[0]);
            var pointname = this.chartdata.equipmentName + ' ' + this.nowtree[0].label;
            var title = this.chartdata.equipmentName +' '+  this.nowtree[0].label+ ' 实时';
            var title_rev = this.equName + ' 实时转速';
            // 初始化趋势图数据
            var flagX = '[时间]';
            console.log(this.nowtree)
            var flagY = '[]';
            flagY='[' + that.features[type][mytree[1].xid].unit + ']';
           /* if (this.nowtree[0].type.indexOf('加速度') != -1) {
              flagY = '[m/s2]';
            } else if (this.nowtree[0].type.indexOf('速度') != -1) {
              flagY = '[mm/s]';
            }*/
            var flagY_rev = '[r/min]';
            var dataX = [];
            var dataY = [];
            var dataY_rev = [];
            var back = this.backmap;
            this.nowtree = mytree;
            var newX = that.timestampToTime(this.chartdata.trendTime);
            dataX.push(newX);
            // console.log(this.nowtree)
            for (var i = 1; i < this.nowtree.length; ++i) {
              var nowid = this.nowtree[i].xid;
              var nowcolor = this.colormap.get(nowid.toString());
              var nowtext = this.nowtree[i].label;
              var nowname = this.backmap.get(nowid.toString());
              var nownum = this.chartdata.trendValue[0][nowname];
              dataY.push({
                name: nowtext,
                data: [nownum],
                color: nowcolor
              });

            }
            var nownum_rev = this.chartdata.rev;
            dataY_rev.push({
              name: this.equName,
              data: [nownum_rev],
            });

            //初始化波形图数据
            var wavedata = this.chartdata.waveValue || {
              waveUnit: {}
            };
            var wavex = '[' + wavedata.waveUnit.x + ']' || '';
            var wavey = '[' + wavedata.waveUnit.y + ']' || '';;
            var wavedataX = wavedata.waveX || [];
            var wavedataY = {
              name: this.nowtree[0].label,
              data: wavedata.waveY || []
            };

            //初始化频谱图数据
            var spectrumdata = this.chartdata.spectrumValue|| {
              spectrumUnit: {}
            };
            var spectrumx = '[' + spectrumdata.spectrumUnit.x + ']' || '';
            var spectrumy = '[' + spectrumdata.spectrumUnit.y + ']' || '';
            var spectrumdataX = spectrumdata.spectrumX|| [];
            var spectrumdataY = {
              name: this.nowtree[0].label,
              data: spectrumdata.spectrumY|| []
            };

            //画图
            this.$refs.trendg.setchart(flagX, flagY, dataX, dataY, title);
            var dataXX = []
            for(var i = 0; i < dataX.length; ++i) {
              dataXX.push(dataX[i])
            }
            // console.log('here is gone')

              this.$refs.trendg_another.setchart(flagX, flagY_rev, dataXX, dataY_rev, title_rev);
              this.$refs.waveg.setchart(wavex, wavey, wavedataX, wavedataY, title, newX);
              this.$refs.spectrumg.setchart(spectrumx, spectrumy, spectrumdataX, spectrumdataY, title, newX);


          } else {
            this.clearchart();
            // this.$emit('datafail')
            // that.$message.error(res.data.message);
          }
        })
    },
    addrealdantongdao() {
      let that = this;
      var equipmentUuid = this.$store.state.equid;
      var pointIdString = this.nowtree[0].xid;

      if (typeof this.cancel == 'function') {
        this.cancel()
      }
      var equipmentUuid1 = encodeURIComponent(equipmentUuid);
      var pointIdString1 = encodeURIComponent(pointIdString);
      this.$axios.get("/trend/" + equipmentUuid1 + '/' + pointIdString1 + "/real_time")
        .then(res => {
          if (res.data.code === 200) {
            this.chartdata = res.data.data;
            var pointname = this.chartdata.equipmentName + ' ' + this.nowtree[0].label;
            var title = this.chartdata.equipmentName + ' ' + this.nowtree[0].label + ' 实时';
            var title_rev = this.chartdata.equipmentName + this.nowtree[0].label + ' 实时转速-';
            var newX = that.timestampToTime(this.chartdata.trendTime);
            var newY = [];
            var dataY_rev = [];
            for (var i = 1; i < this.nowtree.length; ++i) {
              var nowid = this.nowtree[i].xid;
              var nowname = this.backmap.get(nowid.toString());
              var nownum = this.chartdata.trendValue[0][nowname];
              newY.push(nownum);
            }
            var nownum_rev = this.chartdata.rev;
            dataY_rev.push(nownum_rev);

            var wavedata = this.chartdata.waveValue || {
              waveUnit: {}
            };
            var wavex = '[' + wavedata.waveUnit.x + ']' || '';
            var wavey = '[' + wavedata.waveUnit.y + ']' || '';
            var wavedataX = wavedata.waveX || [];
            var wavedataY = {
              name: this.nowtree[0].label,
              data: wavedata.waveY || []
            };

            var spectrumdata = this.chartdata.spectrumValue|| {
              spectrumUnit: {}
            };
            var spectrumx = '[' + spectrumdata.spectrumUnit.x + ']' || '';
            var spectrumy = '[' + spectrumdata.spectrumUnit.y + ']' || '';
            var spectrumdataX = spectrumdata.spectrumX || [];
            var spectrumdataY = {
              name: this.nowtree[0].label,
              data: spectrumdata.spectrumY || []
            };


            this.$refs.trendg.changechart(newX, newY);
            this.$refs.trendg_another.changechart(newX, dataY_rev);
            this.$refs.waveg.setchart(wavex, wavey, wavedataX, wavedataY, title, newX);
            this.$refs.spectrumg.setchart(spectrumx, spectrumy, spectrumdataX, spectrumdataY, title, newX)
          } else {
            this.clearchart();
            // this.$emit('datafail')
            // that.$message.error(res.data.message);
          }
        })


    },

    gethisdantongdaoData(equipmentUuid, pointIdString, stime, etime, lablename) {
      // this.nowtype=type;
      console.log(this.nowtree )
      console.log("####################")

      let that = this;

      var equipmentUuid1 = encodeURIComponent(equipmentUuid);
      var pointIdString1 = encodeURIComponent(pointIdString);
      var netinfor = ('/trend/' + equipmentUuid1 + '/' + pointIdString1 + '/' + stime + '/' + etime + "/info");
      if (typeof this.cancel == 'function') {
        this.cancel()
      }
      this.$axios.get(netinfor/*, {
        cancelToken: new CancelToken((c) => {
          // executor 函数接收一个 cancel 函数作为参数
          this.cancel = c;
        })
      }*/)

        .then(res => {
          if (res.data.code === 200) {
            this.chartdata = res.data.data;
            var flagX = '[时间]';
            var flagY = '[]';
            console.log(this.nowtree,"这个树究竟是什么")
            if(this.nowtree[0].type == "振动-位移" ||this.nowtree[0].type == "振动-加速度" ){
              this.nowtype=113
            }else if(this.nowtree[0].type == "振动-速度"){
              this.nowtype=114
            }
             flagY='[' + that.features[this.nowtype][this.nowtree[1].xid].unit + ']';
           /* if (res.data.data.trendInfo.length > 0) {
              var flagY = '[' + res.data.data.trendInfo[0].unit + ']' || '[um]';
            } else {
              var flagY = '[um]';
            }*/
            var dataX = [];
            var dataY = [];
            var back = this.backmap;
            var title = this.chartdata.equipmentName + ' '+ this.nowtree[0].label + ' 历史';

            var nowdatas = this.chartdata.trendInfo;

            for (var i = 0; i < nowdatas.length; ++i) {
              var newX = that.timestampToTime(nowdatas[i].trendTime);
              dataX.push(newX);
            }
            console.log(this.nowtree,"this.nowtree")
            for (var i = 1; i < this.nowtree.length; ++i) {
              var nowid = this.nowtree[i].xid;
              var nowcolor = this.colormap.get(nowid.toString());
              var nowtext = this.nowtree[i].label;
              var newY = [];
              for (var j = 0; j < nowdatas.length; ++j) {
                var mydatas = nowdatas[j].trendValue[0];
                var nowname = back.get(nowid.toString());
                var nownum = mydatas[nowname];
                newY.push(nownum)
              }
              dataY.push({
                name: nowtext,
                data: newY,
                color: nowcolor

              })
            }
            var myinfos = {name: nowdatas[0].trendTime};

            let newY1 = [{name: this.equName, data: nowdatas.map(item => item.rev)}];
            if(dataX.length) {
              this.$refs.trendg_another.setchart(flagX, '[r/min]', dataX, newY1, `${this.equName} 历史转速`);

              this.$refs.trendg.setchart(flagX, flagY, dataX, dataY, title)
              this.drawWaveSpectrum(myinfos);
            }
            else {
              this.clearchart();
            }


          } else {
            this.clearchart();
            // that.$emit('datafail')
            // that.$message.error(res.data.message);
          }
        })



    },
    openalarm() {
      this.$confirm('请选择测点', '提示', {
        cancelButtonText: '确定',
        type: 'warning'
      }).then(() => {
      }).catch(() => {
        this.clearchart();
        // that.$emit('datafail');
      });
    },

    clearchart() {
      var CancelToken = this.$axios.CancelToken;

      if (typeof this.cancel == 'function') {
        this.cancel()
      }
      this.$refs.trendg_another.clearall();
      this.$refs.trendg.clearall();
      this.$refs.waveg.clearall();
      this.$refs.spectrumg.clearall();
    },

  }
}
</script>

<style lang="scss">

.trend-analysis {
  background: #232835;
  width: 100%;
  height: 100%;
  display: flex;

  .tupu {
    float: left;
    padding-top: 10px;
    margin-right: 10px;
    width: calc(100% - 330px);
    height: calc(100% - 20px);
  }

  .op-hide {
    height: 100%;
    width: 20px;
    float: right;
    background-color: #232835;
    display: flex;

    .box-head {
      width: 0;
      height: 0;
      border-bottom: 20px solid yellow;
    }

    .op-button {
      width: 20px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #303749;
      color: #359186;
      top: 50%;
      position: absolute;
      cursor: pointer;
    }

    .box-bottom {

    }
  }

  .op {
    width: 290px;
    height: calc(100% - 20px);
    margin-top: 10px;
    float: right;
    background-color: #303749;
    overflow: auto;
  }

  .graph {
    height: 100%;
    width: 100%;
    //margin-bottom: 1px;
  }
}
</style>
