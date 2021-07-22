<template>
  <div ref="TmyChart" id="myTrendChart" :style="{width: '100%', height: '100%'}"></div>
</template>

<script>
  import halloween from '../static/halloween';

  var elementResizeDetectorMaker = require("element-resize-detector");


  export default {
    name: "SpeedTrendGraph",
    props: ['nowtimeStatic','AlarmValueY'],
    data() {
      return {
        mychart: null,
        arrx: [],
        arry: [],
        nowStatic: true,
        AlarmValueData:[],
        isFull: false,
        isReal: 'real',
        nowOption: null,
        FullScreenName:'全屏',
        icon:"path://M628.053333 628.053333a32 32 0 0 1 45.226667 0l158.72 158.634667V693.333333l0.298667-4.352A32 32 0 0 1 896 693.333333v181.333334l-0.341333 3.84a21.333333 21.333333 0 0 1-20.992 17.493333h-181.333334l-4.352-0.298667a32 32 0 0 1-27.648-31.701333l0.298667-4.352a32 32 0 0 1 31.701333-27.648h93.44l-158.72-158.72-3.114666-3.584a32 32 0 0 1 3.114666-41.642667z m-232.106666 0a32 32 0 0 1 3.114666 41.642667l-3.114666 3.584-158.72 158.72h93.44a32 32 0 0 1 31.701333 27.648l0.298667 4.352a32 32 0 0 1-27.648 31.701333L330.666667 896H149.333333a21.333333 21.333333 0 0 1-20.992-17.493333L128 874.666667v-181.333334a32 32 0 0 1 63.701333-4.352l0.298667 4.352v93.354667l158.72-158.634667a32 32 0 0 1 45.226667 0zM874.666667 128a21.333333 21.333333 0 0 1 20.992 17.493333L896 149.333333v181.333334a32 32 0 0 1-63.701333 4.352L832 330.666667V237.312L673.28 395.946667a32 32 0 0 1-48.341333-41.642667l3.114666-3.584 158.72-158.72h-93.44a32 32 0 0 1-31.701333-27.648L661.333333 160a32 32 0 0 1 27.648-31.701333L693.333333 128h181.333334zM330.666667 128l4.352 0.298667a32 32 0 0 1 27.648 31.701333l-0.298667 4.352a32 32 0 0 1-31.701333 27.648H237.226667l158.72 158.72 3.114666 3.584a32 32 0 0 1-48.341333 41.642667L192 237.312V330.666667l-0.298667 4.352A32 32 0 0 1 128 330.666667V149.333333l0.341333-3.84A21.333333 21.333333 0 0 1 149.333333 128h181.333334z",

      }
    },
    computed: {
      myicon() {
        return this.isFull;
      }
    },
    watch: {
      nowtimeStatic(data) {
        this.nowStatic = data;

      },
      AlarmValueY(data){
        this.AlarmValueData=data
      },
      myicon(val) {

        if (val == true) {
          this.FullScreenName="缩放";
          this.icon = "path://M476.049369 589.193846c0-28.038306-22.303198-38.588073-49.279447-38.588072H41.951253a39.756335 39.756335 0 1 0 0 79.477268h299.18147L11.434814 958.506482a38.092446 38.092446 0 0 0 53.9879 53.775489l332.034434-330.759966v302.72166a39.897943 39.897943 0 0 0 79.795886 0V589.193846m511.557476-195.170683h-299.358479l329.697908-328.42344A38.092446 38.092446 0 0 0 965.16204 11.824235l-330.866171 330.759966V39.862541a39.897943 39.897943 0 0 0-79.795886 0v392.713293c0 1.168263 1.168263 1.168263 1.168262 2.336526a41.774244 41.774244 0 0 0 10.620571 28.038306 35.401901 35.401901 0 0 0 36.357753 9.346102h384.818669a39.47312 39.47312 0 0 0 39.897943-39.720934 38.942092 38.942092 0 0 0-38.588073-38.552671z";
        } else {
          this.FullScreenName="全屏";
          this.icon = "path://M628.053333 628.053333a32 32 0 0 1 45.226667 0l158.72 158.634667V693.333333l0.298667-4.352A32 32 0 0 1 896 693.333333v181.333334l-0.341333 3.84a21.333333 21.333333 0 0 1-20.992 17.493333h-181.333334l-4.352-0.298667a32 32 0 0 1-27.648-31.701333l0.298667-4.352a32 32 0 0 1 31.701333-27.648h93.44l-158.72-158.72-3.114666-3.584a32 32 0 0 1 3.114666-41.642667z m-232.106666 0a32 32 0 0 1 3.114666 41.642667l-3.114666 3.584-158.72 158.72h93.44a32 32 0 0 1 31.701333 27.648l0.298667 4.352a32 32 0 0 1-27.648 31.701333L330.666667 896H149.333333a21.333333 21.333333 0 0 1-20.992-17.493333L128 874.666667v-181.333334a32 32 0 0 1 63.701333-4.352l0.298667 4.352v93.354667l158.72-158.634667a32 32 0 0 1 45.226667 0zM874.666667 128a21.333333 21.333333 0 0 1 20.992 17.493333L896 149.333333v181.333334a32 32 0 0 1-63.701333 4.352L832 330.666667V237.312L673.28 395.946667a32 32 0 0 1-48.341333-41.642667l3.114666-3.584 158.72-158.72h-93.44a32 32 0 0 1-31.701333-27.648L661.333333 160a32 32 0 0 1 27.648-31.701333L693.333333 128h181.333334zM330.666667 128l4.352 0.298667a32 32 0 0 1 27.648 31.701333l-0.298667 4.352a32 32 0 0 1-31.701333 27.648H237.226667l158.72 158.72 3.114666 3.584a32 32 0 0 1-48.341333 41.642667L192 237.312V330.666667l-0.298667 4.352A32 32 0 0 1 128 330.666667V149.333333l0.341333-3.84A21.333333 21.333333 0 0 1 149.333333 128h181.333334z";
        }

        var option = {
          toolbox: {
            feature: {


              myCancel: {
                icon: this.icon,
                title:this.FullScreenName,

              },
            }
          }
        }
        this.mychart.setOption(option);
      }
    },
    mounted() {
      this.$nextTick(function () {
        this.drawchart();
      })
      var erd = elementResizeDetectorMaker();
      let that = this;
      erd.listenTo(this.$refs.TmyChart, function (element) {
        var width = element.offsetWidth;
        var height = element.offsetHeight;
        that.$nextTick(function () {
          that.mychart.resize()
        })
      })
    },
    methods: {
      setIsFull(data) {
        this.isFull = data;
      },
      drawchart() {
        let that = this;
        if (that.mychart) {

          that.mychart.clear();
          that.arrx = []
          that.arry = []
        } else {
          that.echarts.registerTheme('halloween', halloween)
          that.mychart = that.echarts.init(that.$refs.TmyChart, 'halloween')
        }
        var defaultoption = {
          backgroundColor: '#303749',
          grid: [{
            left: '7%',
            right: '7%',
            top:'21%',
            bottom: '27%'
          }],
          tooltip: {

            trigger: 'axis'
          },
          legend: {
              y: 'bottom',
              x: 'center',
              show:false,
          },
          xAxis: {
            splitLine: {

              show: true,
              lineStyle: {
                type: 'dotted',  //'dotted'虚线 'solid'实线，
                color: 'rgba(255,255,255,0.3)'
              },
            },
            type: 'category',

          },
          yAxis: {
            boundaryGap:[0.2,0.2],
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dotted',  //'dotted'虚线 'solid'实线，
                color: 'rgba(255,255,255,0.3)'
              },
            },
            type: 'value',

          },
        }
        that.mychart.setOption(defaultoption)

      },
      clearall() {
        let that = this;
        if (that.mychart) {
          that.mychart.clear();
        }
        var defaultoption = {
          backgroundColor: '#303749',
          tooltip: {

            trigger: 'axis'
          },
          legend: {
              y: 'bottom',
              x: 'center',
              show:false,
          },
          xAxis: {
            splitLine: {

              show: true,
              lineStyle: {
                type: 'dotted',  //'dotted'虚线 'solid'实线，
                color: 'rgba(255,255,255,0.3)'
              },
            },
            type: 'category',

          },
          yAxis: {
            boundaryGap:[0.2,0.2],
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dotted',  //'dotted'虚线 'solid'实线，
                color: 'rgba(255,255,255,0.3)'
              },
            },
            type: 'value',

          },
        }
        that.mychart.setOption(defaultoption)
      },

      async setchartdata(flagX, flagY, dataX, dataY, title, type) {

        //flagX: 横轴名称单位, string
        //flagY: 纵轴名称单位， string
        //dataX : 横轴数据 ,  [] 每一项是数据
        //dataY: 纵轴数据 ,  [] 每一项是一个json
        //                       json 内容格式 {
        //                                 name:曲线名称,  string
        //                                 data:曲线数据， []
        //                                 color:曲线颜色， string eg: #*****
        //
        //                             }
        this.isReal = type;
        var myseries = []
        var legenddata = []
        var tulicolor = []
        var markLine = null
        if(dataX.length>1 || type == 'history'){
          markLine = []
        }else {
          markLine = [{
            color:this.$store.state.colorMap[i],
            xAxis:dataX[0],
          }]
        }
        for (var i = 0; i < dataY.length; ++i) {

          myseries.push({
            name: dataY[i].name,
            data: dataY[i].data,
            type: 'line',
            itemStyle: {
              normal: {
                lineStyle: {
                  color: this.$store.state.colorMap[i]
                }
              }
            },
            markLine:{
              data:markLine
            },
            markPoint: {
              name:"显示报警",
              symbolSize: 20,
              symbol: 'path://M512 456.310154L94.247385 38.557538a39.542154 39.542154 0 0 0-55.689847 0 39.266462 39.266462 0 0 0 0 55.689847L456.310154 512 38.557538 929.752615a39.542154 39.542154 0 0 0 0 55.689847 39.266462 39.266462 0 0 0 55.689847 0L512 567.689846l417.752615 417.752616c15.163077 15.163077 40.290462 15.36 55.689847 0a39.266462 39.266462 0 0 0 0-55.689847L567.689846 512 985.442462 94.247385a39.542154 39.542154 0 0 0 0-55.689847 39.266462 39.266462 0 0 0-55.689847 0L512 456.310154z',
              data: this.AlarmValueData,
              //  color: '#FF0B00'
              itemStyle:{
                color: '#FF0B00'
              },
            },
          })
          //  tulicolor.push(dataY[i].color)
          legenddata.push(dataY[i].name)
          this.arry.push(dataY[i].data)
        }
        var mydatazoom = [];
        if (type != 'real') {
          mydatazoom.push({
            type: "inside"
          })
        }
     /*   var mytoolbox = {
          show: false,
          feature: {
              myCancel: {
                  show: true,
                  title: '全屏',
                icon: "path://M628.053333 628.053333a32 32 0 0 1 45.226667 0l158.72 158.634667V693.333333l0.298667-4.352A32 32 0 0 1 896 693.333333v181.333334l-0.341333 3.84a21.333333 21.333333 0 0 1-20.992 17.493333h-181.333334l-4.352-0.298667a32 32 0 0 1-27.648-31.701333l0.298667-4.352a32 32 0 0 1 31.701333-27.648h93.44l-158.72-158.72-3.114666-3.584a32 32 0 0 1 3.114666-41.642667z m-232.106666 0a32 32 0 0 1 3.114666 41.642667l-3.114666 3.584-158.72 158.72h93.44a32 32 0 0 1 31.701333 27.648l0.298667 4.352a32 32 0 0 1-27.648 31.701333L330.666667 896H149.333333a21.333333 21.333333 0 0 1-20.992-17.493333L128 874.666667v-181.333334a32 32 0 0 1 63.701333-4.352l0.298667 4.352v93.354667l158.72-158.634667a32 32 0 0 1 45.226667 0zM874.666667 128a21.333333 21.333333 0 0 1 20.992 17.493333L896 149.333333v181.333334a32 32 0 0 1-63.701333 4.352L832 330.666667V237.312L673.28 395.946667a32 32 0 0 1-48.341333-41.642667l3.114666-3.584 158.72-158.72h-93.44a32 32 0 0 1-31.701333-27.648L661.333333 160a32 32 0 0 1 27.648-31.701333L693.333333 128h181.333334zM330.666667 128l4.352 0.298667a32 32 0 0 1 27.648 31.701333l-0.298667 4.352a32 32 0 0 1-31.701333 27.648H237.226667l158.72 158.72 3.114666 3.584a32 32 0 0 1-48.341333 41.642667L192 237.312V330.666667l-0.298667 4.352A32 32 0 0 1 128 330.666667V149.333333l0.341333-3.84A21.333333 21.333333 0 0 1 149.333333 128h181.333334z",
                onclick: function (){
                      that.$emit('cancelFull')
                  }
              },
            dataZoom: {
              yAxisIndex: "none"
            },
            restore: {
              show: true
            }
          }
        };*/

        // 实时图谱放大
        var mytoolbox ={};
        var historytoolbox = {
          show: true,
          feature: {
            brush: {
              type: ['lineX'],
              title: {
                lineX: '区域细化'
              }
            },
            myrestore: {
              show: true,
              title: '细化还原',
              icon: "path://M192 631.3c-6.9 0-13.8-2.9-18.8-8.5l-67.7-76.7c-9.1-10.4-8.1-26.2 2.2-35.3 10.4-9.1 26.2-8.1 35.3 2.2l67.7 76.7c9.1 10.4 8.1 26.2-2.2 35.3-4.7 4.3-10.6 6.3-16.5 6.3z m7.3 5.3c-7 0-14-2.9-18.9-8.7-9-10.5-7.9-26.2 2.6-35.3l81.7-70.5c10.5-9 26.2-7.9 35.3 2.6s7.9 26.2-2.6 35.3l-81.7 70.5c-4.8 4.1-10.6 6.1-16.4 6.1z m333.1 273.2c-16.6 0-30-13.4-30-30s13.4-30 30-30c164.9 0 299.1-134.2 299.1-299.1S697.3 251.6 532.4 251.6c-164.9 0-299.1 134.2-299.1 299.1 0 16.6-13.4 30-30 30s-30-13.4-30-30c0-48.5 9.5-95.5 28.2-139.8 18.1-42.8 44-81.2 76.9-114.1 33-33 71.4-58.9 114.1-76.9 44.3-18.7 91.3-28.2 139.8-28.2s95.5 9.5 139.8 28.2c42.8 18.1 81.2 44 114.1 76.9 33 33 58.9 71.4 76.9 114.1 18.7 44.3 28.2 91.3 28.2 139.8 0 48.5-9.5 95.5-28.2 139.8-18.1 42.8-44 81.2-76.9 114.1-33 33-71.4 58.9-114.1 76.9-44.2 18.8-91.2 28.3-139.7 28.3z",
              onclick: function () {
                that.$emit('cancelRefine')
              }
            },
            myCancel: {
              show: true,
              title: this.FullScreenName,
              icon: this.icon,
              onclick: function () {
                that.$emit('cancelFull')
              }
            },
            dataZoom: {
              yAxisIndex: "none"
            },
            restore: {
              show: true
            },
            saveAsImage: {
                    title: '保存'
            },
            //概貌图不显示全屏按钮

            // console.log("****************",mytoolbox)
          }
        };
        var realtoolbox = {
          show: true,
          feature: {
            brush: {
              show: false,
              type: ['lineX'],
              title: {
                lineX: '区域细化'
              }
            },
            myrestore: {
              show: false,
              title: '细化还原',
              icon: "path://M192 631.3c-6.9 0-13.8-2.9-18.8-8.5l-67.7-76.7c-9.1-10.4-8.1-26.2 2.2-35.3 10.4-9.1 26.2-8.1 35.3 2.2l67.7 76.7c9.1 10.4 8.1 26.2-2.2 35.3-4.7 4.3-10.6 6.3-16.5 6.3z m7.3 5.3c-7 0-14-2.9-18.9-8.7-9-10.5-7.9-26.2 2.6-35.3l81.7-70.5c10.5-9 26.2-7.9 35.3 2.6s7.9 26.2-2.6 35.3l-81.7 70.5c-4.8 4.1-10.6 6.1-16.4 6.1z m333.1 273.2c-16.6 0-30-13.4-30-30s13.4-30 30-30c164.9 0 299.1-134.2 299.1-299.1S697.3 251.6 532.4 251.6c-164.9 0-299.1 134.2-299.1 299.1 0 16.6-13.4 30-30 30s-30-13.4-30-30c0-48.5 9.5-95.5 28.2-139.8 18.1-42.8 44-81.2 76.9-114.1 33-33 71.4-58.9 114.1-76.9 44.3-18.7 91.3-28.2 139.8-28.2s95.5 9.5 139.8 28.2c42.8 18.1 81.2 44 114.1 76.9 33 33 58.9 71.4 76.9 114.1 18.7 44.3 28.2 91.3 28.2 139.8 0 48.5-9.5 95.5-28.2 139.8-18.1 42.8-44 81.2-76.9 114.1-33 33-71.4 58.9-114.1 76.9-44.2 18.8-91.2 28.3-139.7 28.3z",
              onclick: function () {
                that.$emit('cancelRefine')
              }
            },
            myCancel: {
              show: true,
              title: this.FullScreenName,
              icon: this.icon,
              onclick: function () {
                that.$emit('cancelFull')
              }
            },
            dataZoom: {
              yAxisIndex: "none",
              show: false
            },
            restore: {
              show: false
            },
            saveAsImage: {
                    title: '保存'
            },
            //概貌图不显示全屏按钮

            // console.log("****************",mytoolbox)
          }
        };

        if (type != 'real') {
          mytoolbox = historytoolbox;
        }
        else{
          mytoolbox = realtoolbox;
        }

        /*     if (type != 'real') {
               mytoolbox.show = true;
             }*/
        let that = this
        that.arrx = dataX

        var option = {
          backgroundColor: '#303749',
          grid: [{
            left: '7%',
            right: '7%',
            top:'21%',
            bottom: '27%'
          }],
          title: {
            top: '0',
            left: 'center',
            text: title + '趋势图',
              textStyle:{
                  fontSize: 15,//大小
              }
          },
          tooltip: {
            trigger: 'axis'
          },
          dataZoom: mydatazoom,
          toolbox: mytoolbox,
          color: this.$store.state.colorMap,
          brush: {
            xAxisIndex: 'all',
            transformable: false,
            outOfBrush: {
              colorAlpha: 0.1
            },
            throttleType: 'debounce',
            throttleDelay: 2000
          },
          legend: {
              y: 'bottom',
              x: 'center',
              data: legenddata,
              show:false,

          },

          xAxis: {
            name: flagX,
            data: dataX,
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dotted',  //'dotted'虚线 'solid'实线，
                color: 'rgba(255,255,255,0.3)'
              },
            },
            type: 'category',
          },
          yAxis: {
            name: flagY,
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dotted',  //'dotted'虚线 'solid'实线，
                color: 'rgba(255,255,255,0.3)'
              },
            },
            type: 'value',
          },
          series: myseries
        }
        this.allseries=myseries
        that.nowOption = option;


        that.mychart.setOption(option)
        that.mychart.on('brushSelected', that.renderBrushed);
        that.mychart.dispatchAction({
          type: 'takeGlobalCursor',
          key: 'brush',
          brushOption: {
            brushType: 'lineX',
          }
        });
        that.mychart.off("click")
        await that.mychart.on('click', function (param) {
          that.$emit('chartinfo', param)
        })
//绑定鼠标事件
        that.mychart.on("mousedown", function (param) {
          if (param.event.event.button === 2 && that.nowStatic == false) {
            if (that.$route.path == '/UnitOverviewMap' || that.$route.path == '/RotatingMachineryGraph/RotatingOverviewGrap' || that.$route.path == '/DieselMonitorSystem/OverviewGraph'
              || that.$route.path == '/ReciprocatMachineryGraph/OverviewGraph1') {
              //e中有当前节点信息
              showMenu(param, [
                {
                  "name": "历史概貌图",
                  "fn": function () {
                    that.$emit('historyInformation', param)
                  }
                },
              ]);
            }
          }
          if (param.event.event.button === 2 && that.$route.path == '/AlarmQueryGraph') {
            //e中有当前节点信息
            showMenu(param, [
              {
                "name": "报警信息显示",
                "fn": function () {
                  alert("触发-菜单2" + param.data);
                }
              }
            ]);
          }


        })

        var style_ul = "padding:0px;margin:0px;border: 1px solid #ccc;background-color: #fff;position: absolute;left: 0px;top: 0px;z-index: 2;display: none;";
        var style_li = "list-style:none;padding: 5px; cursor: pointer; padding: 5px 20px;margin:0px;";
        var style_li_hover = style_li + "background-color: #00A0E9; color: #fff;";

//右键菜单容器
        var menubox = $("<div class='echartboxMenu' style='" + style_ul + "'><div style='text-align:center;background:#ccc'></div><ul style='margin:0px;padding:0px;'></ul></div>")
          .appendTo($(document.body));

//移除浏览器右键菜单
        that.mychart.getDom().oncontextmenu = menubox[0].oncontextmenu = function () {
          return false;
        }

//点击其他位置隐藏菜单
        $(document).click(function () {
          menubox.hide()
        });

//显示菜单
        var showMenu = function (e, menus) {
          $("div", menubox).text(e.name);
          var menulistbox = $("ul", menubox).empty();
          $(menus).each(function (i, item) {
            var li = $("<li style='" + style_li + "'>" + item.name + "</li>")
              .mouseenter(function () {
                $(this).attr("style", style_li_hover);
              })
              .mouseleave(function () {
                $(this).attr("style", style_li);
              })
              .click(function () {
                item["fn"].call(this);
                menubox.hide();
              });
            menulistbox.append(li);
          });
          menubox.css({
            "left": event.x,
            "top": event.y
          }).show();
        }

      },
      setchart(flagX, flagY, dataX, dataY, title) {
        this.drawchart();

        var type = 'history'
        if (dataY[0].data.length == 1) {
          type = 'real';
        }
        this.$nextTick(() => {
          this.setchartdata(flagX, flagY, dataX, dataY, title, type);
        })

      },
      changechart(x, y) {
        //x 横轴新添数据
        // y 一个[] 纵轴每项新增的数据
        let that = this
        if(that.arrx[that.arrx.length-1]===x){
          return;
        }
        let mychart = this.mychart.getOption()
        let change = 0;
        for (let i=0;i<mychart.series.length;i++){
          if(mychart.series[i].markLine!=null){
            mychart.series[i].markLine = null
            change=1
          }
        }
        if(change){
          this.mychart.setOption(mychart,true)
        }
        if (that.arrx.length >= 50) {
          that.arrx.shift()
          for (var i = 0; i < that.arry.length; ++i) {
            that.arry[i].shift()
          }
        }
        var newseries = []
        that.arrx.push(x)
        for (var i = 0; i < that.arry.length; ++i) {
          that.arry[i].push(y[i])
          newseries.push({
            data: that.arry[i]
          })
        }
        var option = {
          xAxis: {
            data: this.arrx
          },
          series: newseries
        }
        that.mychart.setOption(option)


      },
      renderBrushed(params) {
        // console.log(params)
        if (params.batch[0].areas.length == 0) {  //没有选框
          return;
        }
        let left = params.batch[0].areas[0]['coordRange'][0];
        let right = params.batch[0].areas[0]['coordRange'][1];
        if (left < 0) {
          left = 0;
        }
        if (right >= this.arrx.length) {
          right = this.arrx.length - 1;
        }
        left = this.arrx[left];
        right = this.arrx[right];
        // console.log(left, right)
        // console.log(this.arrx.length)
        // console.log(new Date(left).valueOf(), new Date(right).valueOf())
        this.$emit('refine', new Date(left).valueOf(), new Date(right).valueOf());
      },
    }
  }
</script>

<style scoped>

</style>
