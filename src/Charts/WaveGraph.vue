<template>
  <div ref="WmyChart" id="myWaveChart"  :style="{width: '100%', height: '100%'}"></div>
</template>

<script>
    import halloween from '../static/halloween';
    var elementResizeDetectorMaker = require("element-resize-detector");
    export default {
        name: "WaveGraph",
        data() {
            return {
                mychart: null,
                arrx:[],
                arry:[],
              FullScreenName:'全屏',
              icon:"path://M628.053333 628.053333a32 32 0 0 1 45.226667 0l158.72 158.634667V693.333333l0.298667-4.352A32 32 0 0 1 896 693.333333v181.333334l-0.341333 3.84a21.333333 21.333333 0 0 1-20.992 17.493333h-181.333334l-4.352-0.298667a32 32 0 0 1-27.648-31.701333l0.298667-4.352a32 32 0 0 1 31.701333-27.648h93.44l-158.72-158.72-3.114666-3.584a32 32 0 0 1 3.114666-41.642667z m-232.106666 0a32 32 0 0 1 3.114666 41.642667l-3.114666 3.584-158.72 158.72h93.44a32 32 0 0 1 31.701333 27.648l0.298667 4.352a32 32 0 0 1-27.648 31.701333L330.666667 896H149.333333a21.333333 21.333333 0 0 1-20.992-17.493333L128 874.666667v-181.333334a32 32 0 0 1 63.701333-4.352l0.298667 4.352v93.354667l158.72-158.634667a32 32 0 0 1 45.226667 0zM874.666667 128a21.333333 21.333333 0 0 1 20.992 17.493333L896 149.333333v181.333334a32 32 0 0 1-63.701333 4.352L832 330.666667V237.312L673.28 395.946667a32 32 0 0 1-48.341333-41.642667l3.114666-3.584 158.72-158.72h-93.44a32 32 0 0 1-31.701333-27.648L661.333333 160a32 32 0 0 1 27.648-31.701333L693.333333 128h181.333334zM330.666667 128l4.352 0.298667a32 32 0 0 1 27.648 31.701333l-0.298667 4.352a32 32 0 0 1-31.701333 27.648H237.226667l158.72 158.72 3.114666 3.584a32 32 0 0 1-48.341333 41.642667L192 237.312V330.666667l-0.298667 4.352A32 32 0 0 1 128 330.666667V149.333333l0.341333-3.84A21.333333 21.333333 0 0 1 149.333333 128h181.333334z",
              isFull: false,
              isReal: 'real',
              nowOption: null,
              lastPoint: -1,

            }
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
              // this.icon = "path://M453.12 201.386667a32 32 0 0 0-32 32v142.506666L76.8 31.573333A32 32 0 0 0 31.573333 76.8l344.32 344.32H233.386667a32 32 0 0 0 0 64h220.16a32 32 0 0 0 32-32V233.386667a32 32 0 0 0-32.426667-32zM648.106667 602.88h142.506666a32 32 0 0 0 0-64h-219.733333a32 32 0 0 0-32 32v220.16a32 32 0 0 0 64 0v-142.933333l344.32 344.32a32 32 0 1 0 45.226667-45.226667zM558.506667 482.986667a32 32 0 0 0 12.373333 2.56h220.16a32 32 0 0 0 0-64h-142.933333l344.32-344.746667A32 32 0 0 0 947.2 31.573333l-344.32 344.32V233.386667a32 32 0 1 0-64 0v220.16a32 32 0 0 0 19.626667 29.44zM465.493333 541.013333a32 32 0 0 0-12.373333-2.56H233.386667a32 32 0 1 0 0 64h142.506666L31.573333 947.2a32 32 0 1 0 45.226667 45.226667l344.32-344.32v142.933333a32 32 0 0 0 64 0v-220.16a32 32 0 0 0-19.626667-29.44z";
              // this.icon = "path://M801.4 696.1V327.7c0-9-5.6-16.5-13.6-20.6-0.9-0.3-1.7-0.9-2.5-1.5-3.1-1.2-6.5-1.9-10-1.9H247.4c-3.5 0-6.9 0.7-10 1.9-0.8 0.6-1.6 1.2-2.5 1.5-8 4.1-13.6 11.6-13.6 20.6v368.4c0 13.2 11.7 23.9 26.1 23.9h527.9c2.8 0 5.4-0.7 7.9-1.5 1.4-1.4 3.3-2 5.3-2.3 7.5-4.1 12.9-11.4 12.9-20.1z m-52.2-23.9H273.5V351.6h475.7v320.6z";
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
            erd.listenTo(this.$refs.WmyChart, function (element) {
                var width = element.offsetWidth;
                var height = element.offsetHeight;
                that.$nextTick(function() {
                    console.log('here')
                    // console.log("Size: " + width + "x" + height)
                    //使echarts尺寸重置
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
                    return;
                }
                else {
                    that.echarts.registerTheme('halloween', halloween)
                    that.mychart = that.echarts.init(that.$refs.WmyChart, 'halloween')

                    var defaultoption = {
                      backgroundColor: '#303749',
                      grid: {
                        left: '7%',
                        right: '7%',
                        top: '21%',
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
                            axisLabel: {
                                showMaxLabel: true
                            }

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
                    grid: [{
                    left: '7%',
                    right: '7%',
                    top:'21%',
                    bottom: '15%'
                  }],
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
                        axisLabel: {
                            showMaxLabel: true
                        }

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
             //subtitle,
            async setchartdata(flagX, flagY, dataX, dataY, title, subtitle) {
                //flagX: 横轴名称单位, string
                //flagY: 纵轴名称单位， string
                //dataX : 横轴数据 ,  [] 每一项是数据
                //dataY: 纵轴数据 ,  是一个json
                //                       json 内容格式 {
                //                                 name:曲线名称,  string
                //                                 data:曲线数据， []
                //                             }
                if(dataX.length == 0 && dataY.data.length == 0) {
                    return;
                }
                var myseries = [];
                var mytitle = title.split(' ')[1];
                console.log('111111111 ' + mytitle + ' ' + title);
              //   var newData = [];
              // console.log("dataY为");
              // console.log(dataY.data);
              //  for(let i=0;i<dataX.length;++i) {
              //    newData.push([dataX[i], dataY.data[i]])
              //  }
              //   console.log("newData的数据为：");
              //   console.log(newData);
                myseries.push({
                    name: dataY.name,
                    data:dataY.data,
                    type: 'line',
                    itemStyle:{
                        normal:{
                            lineStyle:{
                                color:'#00FF00'
                            }
                        }
                    },
                });
                myseries.push({
                    type:'line',

                    markLine:{
                        symbol: ['none', 'none'],
                        lineStyle:{               //警戒线的样式  ，虚实  颜色
                            type:"solid",
                            color:"white",
                        },
                        itemStyle: {
                            normal: {
                                color: 'white',
                            },
                        },
                        data:[]
                    }
                })
                var legenddata = [dataY.name];
                var dataXInterval = Math.floor(dataX.length / 5);
                var mytoolbox ={};
                var historytoolbox= {
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
                                show:true,
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
                var realtoolbox= {
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
                                show:false,
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
                if (mytitle != '实时') {
                    if(mytitle != '实时包络') {
                         mytoolbox = historytoolbox;
                    }
                    else {
                        mytoolbox = realtoolbox;
                    }
                }
                else{
                    mytoolbox = realtoolbox;
                }
                var option = {
                    backgroundColor: '#303749',
                    grid: [{
                    left: '7%',
                    right: '7%',
                    top:'21%',
                    bottom: '15%'
                  }],
                    title: [{
                        top: 2,
                        left: 'center',
   // padding: 0,
                        text: title + '波形图',
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
                    },{
                        top: 3,
                        left: '15%',
                        // padding: 0,
                        text: '',
                        // subtext:'[' + subtitle + ']',
                        textStyle:{
                            fontSize: 10,//大小
                        }
                    }
                    ],
                    /*title: {
                        top: '10',
                        left: 'center',
                        text: title + '波形图',
                        subtext:'[' + subtitle + ']'
                    },*/
                    tooltip: {
                        trigger: 'axis'
                    },
                    color: '#00FF00',
                   dataZoom:[{
                        type:"inside"         //详细配置可见echarts官网
                    }],
                    toolbox: mytoolbox,
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
                            showMaxLabel: true,
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
                                color: 'rgba(255,255,255,0.3)',
                            },
                        },
                        type: 'value',
                        splitNumber:3 //y轴5个刻度
                    },
                    series : myseries,
                }
                let that = this;
              that.nowOption = option;
              this.allseries=myseries

              that.mychart.setOption(option, true);
                await that.mychart.on('click', function (param) {

                    console.log(that.allseries);
                    // return
                    if(mytitle != '实时') {
                        let line_series = that.allseries[that.allseries.length - 1];
                        let newTitle = that.nowOption.title;
                        if (line_series['markLine']['data'].length == 0) {
                            line_series['markLine']['data'].push({
                                xAxis: param.name,
                            })
                        }else if (line_series['markLine']['data'].length == 1) {
                            if (param.name != line_series['markLine']['data'][0].xAxis) {
                                line_series['markLine']['data'].push({
                                    xAxis: param.name,
                                })
                            }
                        } else {
                            if (param.name != line_series['markLine']['data'][0].xAxis &&
                                param.name != line_series['markLine']['data'][1].xAxis) {
                                line_series['markLine']['data'][0] = line_series['markLine']['data'][1];
                                line_series['markLine']['data'][1] = {
                                    xAxis: param.name,
                                }
                            }
                        }
                        that.allseries[that.allseries.length - 1] = line_series;
                        // console.log(line_series);
                        if (line_series['markLine']['data'].length >= 2) {
                            let nowFrequency = 1.0 / Math.abs(
                                parseFloat(line_series['markLine']['data'][1]['xAxis']) - parseFloat(line_series['markLine']['data'][0]['xAxis']));
                            console.log(nowFrequency)
                            console.log(newTitle)
                            newTitle[2]['text'] = '[' + nowFrequency + ']'
                        }
                        option = {
                            series:that.allseries,
                            title: newTitle,
                        }

                        that.mychart.setOption(option);


                    }
                    // console.log(param,'???')
                    // that.$emit('chartinfo', param)
                })
            },
            setchart(flagX, flagY, dataX, dataY, title, subtitle) {
                this.drawchart( );
                this.$nextTick(()=> { this.setchartdata(flagX, flagY, dataX, dataY, title,subtitle);})

            },
        }
    }
</script>

<style scoped>

</style>
