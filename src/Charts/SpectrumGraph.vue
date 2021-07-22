<template>
  <div ref="SmyChart" id="mySpectrumChart" :style="{width: '100%', height: '100%'}"></div>
</template>

<script>
    import halloween from '../static/halloween';
    var elementResizeDetectorMaker = require("element-resize-detector");

    export default {
        name: "SpectrumGraph",
        data() {
            return {
                mychart: null,
                arrx:[],
                arry:[],
              isFull: false,
              // isReal: 'real',
              nowOption: null,
              FullScreenName:'全屏',
              icon:"path://M628.053333 628.053333a32 32 0 0 1 45.226667 0l158.72 158.634667V693.333333l0.298667-4.352A32 32 0 0 1 896 693.333333v181.333334l-0.341333 3.84a21.333333 21.333333 0 0 1-20.992 17.493333h-181.333334l-4.352-0.298667a32 32 0 0 1-27.648-31.701333l0.298667-4.352a32 32 0 0 1 31.701333-27.648h93.44l-158.72-158.72-3.114666-3.584a32 32 0 0 1 3.114666-41.642667z m-232.106666 0a32 32 0 0 1 3.114666 41.642667l-3.114666 3.584-158.72 158.72h93.44a32 32 0 0 1 31.701333 27.648l0.298667 4.352a32 32 0 0 1-27.648 31.701333L330.666667 896H149.333333a21.333333 21.333333 0 0 1-20.992-17.493333L128 874.666667v-181.333334a32 32 0 0 1 63.701333-4.352l0.298667 4.352v93.354667l158.72-158.634667a32 32 0 0 1 45.226667 0zM874.666667 128a21.333333 21.333333 0 0 1 20.992 17.493333L896 149.333333v181.333334a32 32 0 0 1-63.701333 4.352L832 330.666667V237.312L673.28 395.946667a32 32 0 0 1-48.341333-41.642667l3.114666-3.584 158.72-158.72h-93.44a32 32 0 0 1-31.701333-27.648L661.333333 160a32 32 0 0 1 27.648-31.701333L693.333333 128h181.333334zM330.666667 128l4.352 0.298667a32 32 0 0 1 27.648 31.701333l-0.298667 4.352a32 32 0 0 1-31.701333 27.648H237.226667l158.72 158.72 3.114666 3.584a32 32 0 0 1-48.341333 41.642667L192 237.312V330.666667l-0.298667 4.352A32 32 0 0 1 128 330.666667V149.333333l0.341333-3.84A21.333333 21.333333 0 0 1 149.333333 128h181.333334z",

            }
        },
        mounted() {
            this.$nextTick(function () {
                this.drawchart();
            })
            var erd = elementResizeDetectorMaker();
            let that = this;
            erd.listenTo(this.$refs.SmyChart, function (element) {
                var width = element.offsetWidth;
                var height = element.offsetHeight;
                that.$nextTick(function() {
                    // console.log("Size: " + width + "x" + height)
                    //使echarts尺寸重置
                    that.mychart.resize()
                })
            })
        },
      computed: {
        myicon() {
          return this.isFull;
        }
      },
      watch: {
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
        methods: {
          setIsFull(data) {
            this.isFull = data;
          },
            drawchart() {
                let that = this;
                if (that.mychart) {
                    // that.mychart.clear();
                    // that.arrx = []
                    // that.arry = []
                    return;
                }
                else {
                    that.echarts.registerTheme('halloween', halloween)
                    that.mychart = that.echarts.init(that.$refs.SmyChart, 'halloween')

                    var defaultoption = {
                        backgroundColor: '#303749',
                        tooltip: {
                            trigger: 'axis'
                        },
                        grid: [{
                        left: '7%',
                        right: '7%',
                        top:'21%',
                        bottom: '15%'
                      }],
                        // legend: {
                        //     y: 'bottom',
                        //     x: 'center',
                        // },
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
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    type: 'dotted',  //'dotted'虚线 'solid'实线，
                                    color: 'rgba(255,255,255,0.3)'
                                },
                            },
                            type: 'value',
                            splitNumber:3 //y轴5个刻度
                        },
                    }
                    that.mychart.setOption(defaultoption)
                }

            },
            clearall () {
                let that = this;
                if(that.mychart) {
                    that.mychart.clear();
                }
                var defaultoption = {
                    backgroundColor: '#303749',
                    grid: {
                        left: '7%',
                        right: '7%',
                        top:'21%',
                        bottom: '15%'
                    },
                    tooltip: {

                        trigger: 'axis'
                    },
                    // legend: {
                    //     y: 'bottom',
                    //     x: 'center',
                    // },
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
                        splitLine: {
                            show: true,
                            lineStyle: {
                                type: 'dotted',  //'dotted'虚线 'solid'实线，
                                color: 'rgba(255,255,255,0.3)'
                            },
                        },
                        type: 'value',
                        splitNumber:3 //y轴5个刻度
                    },
                }
                that.mychart.setOption(defaultoption)
            },
          async  setchartdata(flagX, flagY, dataX, dataY, title, subtitle) {
                //flagX: 横轴名称单位, string
                //flagY: 纵轴名称单位， string
                //dataX : 横轴数据 ,  [] 每一项是数据
                //dataY: 纵轴数据 ,  是一个json
                //                       json 内容格式 {
                //                                 name:曲线名称,  string
                //                                 data:曲线数据， []
                //                             }

                //Y轴最大值对应横坐标
              // let that = this;
              // this.isReal = type;
              // console.log(this.isReal)
              if(dataX.length == 0 && dataY.data.length == 0) {
                  return;
              }
            console.log(dataX.length + ' '  + dataY.data.length)
                var maxY = -1;
                var len = 0;
                var index = -1;
                var maxX = 0;
                var mytitle = title.search('历史');
                // var mytitle = title.split(' ')[1];
                console.log('1' + title);
                
                // for(var i=0; i<dataX.length; i++){
                //     if(dataX[i]>2000){
                //         len = i;
                //         break;
                //     }
                // }
                // dataY.data = dataY.data.slice(0,i);
                // dataX = dataX.slice(0,i);

                for(var i=0; i<dataY.data.length; i++){
                    if(dataY.data[i]>maxY){
                        maxY = dataY.data[i];
                        index = i;
                    }
                }
                if(dataX.length > 0) {
                maxX = dataX[index].toString();
              }
                var myseries = []
                myseries.push({
                    name: dataY.name,
                    data: dataY.data,
                    type: 'line',
                    itemStyle:{
                        normal:{
                            lineStyle:{
                                color:'#00FF00'
                            }
                        }
                    },
                    markPoint:{
                        symbol:'path://M 512 128 l -213.333 256 l 170.667 0 l 0 512 l 85.333 0 l 0 -512 l 170.667 0 Z',
                        symbolSize: 15,
                        itemStyle:{
                            color: 'rgb(255,255,255)',
                        },
                        data:[{
                            name: 'max',
                            y: '92%',
                            xAxis: maxX,
                        }]
                    }
                })
                var legenddata = [dataY.name];
                var dataXInterval = Math.floor(dataX.length / 10);
                var mytoolbox = {};
                var historytoolbox = {
                        show:true,
                        feature:{
                          myCancel: {
                            show: true,
                            title:this.FullScreenName,
                            icon: this.icon,
                            onclick: function () {
                              that.$emit('cancelFull')
                            }
                          },
                            dataZoom: {
                                yAxisIndex:"none",
                                show: true
                            },
                            restore: {
                                show: true,
                            },
                            saveAsImage: {
                                title: '保存'
                            },
                            //其他功能性按钮查看官网进行增加，包括（显示数据，下载图片，改为柱状图等）
                        }
                    };
                var realtoolbox = {
                    show:true,
                    feature:{
                        myCancel: {
                        show: true,
                        title:this.FullScreenName,
                        icon: this.icon,
                        onclick: function () {
                            that.$emit('cancelFull')
                        }
                        },
                        dataZoom: {
                            yAxisIndex:"none",
                            show: false
                        },
                        restore: {
                            show: false,
                        },
                        saveAsImage: {
                            title: '保存'
                        },
                            //其他功能性按钮查看官网进行增加，包括（显示数据，下载图片，改为柱状图等）
                        }
                    };
                if(mytitle == -1) {
                   
                    mytoolbox = realtoolbox;
                   
                }
                else {
                    mytoolbox = historytoolbox;
                }
                var option = {
                    backgroundColor: '#303749',
                    title: [{
                        top: 2,
                        left: 'center',

                        // padding: 0,
                        text: title + '频谱图',
                        // subtext:'[' + subtitle + ']',
                        textStyle:{
                            fontSize: 15,//大小
                        }
                    },{
                        top: 3,
                        left: '65%',
                        // padding: 0,
                        text: '[' + subtitle + ']',
                        // subtext:'[' + subtitle + ']',
                        textStyle:{
                            fontSize: 10,//大小
                        }
                    },


                    ],
                    grid: [{
                    left: '7%',
                    right: '7%',
                    top:'21%',
                    bottom: '15%'
                  }],
                    tooltip: {
                        trigger: 'axis'
                    },
                    color: '#00FF00',
                    dataZoom:[{
                        type:"inside"         //详细配置可见echarts官网
                    }],
                    toolbox:mytoolbox,
                    // legend: {
                    //     y: 'bottom',
                    //     x: 'center',
                    //     data: legenddata,
                    //
                    // },
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
                        axisLabel:{
                            interval: function(index, value) {
                                if(index % dataXInterval == 0) {
                                    return true;
                                }
                                else if(index == dataX.length - 1) {
                                    return true;
                                }
                                return false;
                            }
                        }
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
                        splitNumber:3 //y轴5个刻度
                    },
                    series: myseries
                }
                let that = this
              that.nowOption = option;
                that.mychart.setOption(option)
            },
            setchart(flagX, flagY, dataX, dataY, title, subtitle) {
                this.drawchart( );
                this.$nextTick(() => {
                  this.setchartdata(flagX, flagY, dataX, dataY, title,subtitle);
                })

            },
        }
    }
</script>

<style scoped>

</style>
