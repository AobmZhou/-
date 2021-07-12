// 页面文件，如index.vue
<template>
  <div>
    <!-- echarts -->
    <div id="charts_1" class="charts_1"></div>
	<div id="charts_2" class="charts_2"></div>
	<div id="charts_3" class="charts_3"></div>
	<div id="charts_4" class="charts_4"></div>
  </div>
</template>
<script>

export default {
  data() {
    return {}
  },
  mounted() {
    this.initCharts_1()
	this.initCharts_2()
	this.initCharts_3()
	this.initCharts_4()
  },
  methods: {
    initCharts_1() {
	const echarts = require('echarts/lib/echarts');
	require('echarts/lib/component/title');
	require('echarts/lib/component/tooltip');
	require('echarts/lib/component/grid');
	require('echarts/lib/chart/line');
	var chartDom = document.getElementById('charts_1');
	var myChart = echarts.init(chartDom);
	var option;

function randomData() {
    now = new Date(+now + oneDay);
    value = value + Math.random() * 21 - 10;
    return {
        name: now.toString(),
        value: [
            [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
            Math.round(value)
        ]
    };
}

var data = [];
var now = +new Date(1997, 9, 3);
var oneDay = 24 * 3600 * 1000;
var value = Math.random() * 1000;
for (var i = 0; i < 1000; i++) {
    data.push(randomData());
}

option = {
    title: {
        text: '动态数据 + 时间坐标轴'
    },
    tooltip: {
        trigger: 'axis',
        formatter: function (params) {
            params = params[0];
            var date = new Date(params.name);
            return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
        },
        axisPointer: {
            animation: false
        }
    },
    xAxis: {
        type: 'time',
        splitLine: {
            show: false
        }
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
            show: false
        }
    },
    series: [{
        name: '模拟数据',
        type: 'line',
        showSymbol: false,
        hoverAnimation: false,
        data: data
    }]
};

setInterval(function () {

    for (var i = 0; i < 5; i++) {
        data.shift();
        data.push(randomData());
    }

    myChart.setOption({
        series: [{
            data: data
        }]
    });
}, 1000);

option && myChart.setOption(option);
    },
	//charts2
	initCharts_2() {
		const echarts = require('echarts/lib/echarts');
		require('echarts/lib/component/title');
		require('echarts/lib/component/tooltip');
		require('echarts/lib/component/grid');
		require('echarts/lib/chart/line');
		var chartDom = document.getElementById('charts_2');
		var myChart = echarts.init(chartDom);
		var option;
	
	function randomData() {
	    now = new Date(+now + oneDay);
	    value = value + Math.random() * 21 - 10;
	    return {
	        name: now.toString(),
	        value: [
	            [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
	            Math.round(value)
	        ]
	    };
	}
	
	var data = [];
	var now = +new Date(1997, 9, 3);
	var oneDay = 24 * 3600 * 1000;
	var value = Math.random() * 1000;
	for (var i = 0; i < 1000; i++) {
	    data.push(randomData());
	}
	
	option = {
	    title: {
	        text: '动态数据 + 时间坐标轴'
	    },
	    tooltip: {
	        trigger: 'axis',
	        formatter: function (params) {
	            params = params[0];
	            var date = new Date(params.name);
	            return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
	        },
	        axisPointer: {
	            animation: false
	        }
	    },
	    xAxis: {
	        type: 'time',
	        splitLine: {
	            show: false
	        }
	    },
	    yAxis: {
	        type: 'value',
	        boundaryGap: [0, '100%'],
	        splitLine: {
	            show: false
	        }
	    },
	    series: [{
	        name: '模拟数据',
	        type: 'line',
	        showSymbol: false,
	        hoverAnimation: false,
	        data: data
	    }]
	};
	
	setInterval(function () {
	
	    for (var i = 0; i < 5; i++) {
	        data.shift();
	        data.push(randomData());
	    }
	
	    myChart.setOption({
	        series: [{
	            data: data
	        }]
	    });
	}, 1000);
	
	option && myChart.setOption(option);
	    },
		//charts_3
		initCharts_3() {
			const echarts = require('echarts/lib/echarts');
			require('echarts/lib/component/title');
			require('echarts/lib/component/tooltip');
			require('echarts/lib/component/grid');
			require('echarts/lib/chart/line');
			var chartDom = document.getElementById('charts_3');
			var myChart = echarts.init(chartDom);
			var option;
		
		function randomData() {
		    now = new Date(+now + oneDay);
		    value = value + Math.random() * 21 - 10;
		    return {
		        name: now.toString(),
		        value: [
		            [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
		            Math.round(value)
		        ]
		    };
		}
		
		var data = [];
		var now = +new Date(1997, 9, 3);
		var oneDay = 24 * 3600 * 1000;
		var value = Math.random() * 1000;
		for (var i = 0; i < 1000; i++) {
		    data.push(randomData());
		}
		
		option = {
		    title: {
		        text: '动态数据 + 时间坐标轴'
		    },
		    tooltip: {
		        trigger: 'axis',
		        formatter: function (params) {
		            params = params[0];
		            var date = new Date(params.name);
		            return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
		        },
		        axisPointer: {
		            animation: false
		        }
		    },
		    xAxis: {
		        type: 'time',
		        splitLine: {
		            show: false
		        }
		    },
		    yAxis: {
		        type: 'value',
		        boundaryGap: [0, '100%'],
		        splitLine: {
		            show: false
		        }
		    },
		    series: [{
		        name: '模拟数据',
		        type: 'line',
		        showSymbol: false,
		        hoverAnimation: false,
		        data: data
		    }]
		};
		
		setInterval(function () {
		
		    for (var i = 0; i < 5; i++) {
		        data.shift();
		        data.push(randomData());
		    }
		
		    myChart.setOption({
		        series: [{
		            data: data
		        }]
		    });
		}, 1000);
		
		option && myChart.setOption(option);
		    },
		//charts_4
		initCharts_4()
		{
			const echarts = require('echarts/lib/echarts');
			require('echarts/lib/component/dataset');
			require('echarts/lib/component/title');
			require('echarts/lib/component/toolbox');
			require('echarts/lib/component/tooltip');
			require('echarts/lib/component/grid');
			require('echarts/lib/component/visualMap');
			require('echarts/lib/component/dataZoom');
			require('echarts/lib/chart/candlestick');
			require('echarts/lib/chart/bar');
			
			var chartDom = document.getElementById('charts_4');
			var myChart = echarts.init(chartDom);
			var option;
			
			var upColor = '#ec0000';
			var upBorderColor = '#8A0000';
			var downColor = '#00da3c';
			var downBorderColor = '#008F28';
			
			var dataCount = 2e5;
			var data = generateOHLC(dataCount);
			
			var option = {
			    dataset: {
			        source: data
			    },
			    title: {
			        text: 'Data Amount: ' + echarts.format.addCommas(dataCount)
			    },
			    tooltip: {
			        trigger: 'axis',
			        axisPointer: {
			            type: 'line'
			        }
			    },
			    toolbox: {
			        feature: {
			            dataZoom: {
			                yAxisIndex: false
			            },
			        }
			    },
			    grid: [
			        {
			            left: '10%',
			            right: '10%',
			            bottom: 200
			        },
			        {
			            left: '10%',
			            right: '10%',
			            height: 80,
			            bottom: 80
			        }
			    ],
			    xAxis: [
			        {
			            type: 'category',
			            scale: true,
			            boundaryGap: false,
			            // inverse: true,
			            axisLine: {onZero: false},
			            splitLine: {show: false},
			            splitNumber: 20,
			            min: 'dataMin',
			            max: 'dataMax'
			        },
			        {
			            type: 'category',
			            gridIndex: 1,
			            scale: true,
			            boundaryGap: false,
			            axisLine: {onZero: false},
			            axisTick: {show: false},
			            splitLine: {show: false},
			            axisLabel: {show: false},
			            splitNumber: 20,
			            min: 'dataMin',
			            max: 'dataMax'
			        }
			    ],
			    yAxis: [
			        {
			            scale: true,
			            splitArea: {
			                show: true
			            }
			        },
			        {
			            scale: true,
			            gridIndex: 1,
			            splitNumber: 2,
			            axisLabel: {show: false},
			            axisLine: {show: false},
			            axisTick: {show: false},
			            splitLine: {show: false}
			        }
			    ],
			    dataZoom: [
			        {
			            type: 'inside',
			            xAxisIndex: [0, 1],
			            start: 10,
			            end: 100
			        },
			        {
			            show: true,
			            xAxisIndex: [0, 1],
			            type: 'slider',
			            bottom: 10,
			            start: 10,
			            end: 100
			        }
			    ],
			    visualMap: {
			        show: false,
			        seriesIndex: 1,
			        dimension: 6,
			        pieces: [{
			            value: 1,
			            color: upColor
			        }, {
			            value: -1,
			            color: downColor
			        }]
			    },
			    series: [
			        {
			            type: 'candlestick',
			            itemStyle: {
			                color: upColor,
			                color0: downColor,
			                borderColor: upBorderColor,
			                borderColor0: downBorderColor
			            },
			            encode: {
			                x: 0,
			                y: [1, 4, 3, 2]
			            }
			        },
			        {
			            name: 'Volumn',
			            type: 'bar',
			            xAxisIndex: 1,
			            yAxisIndex: 1,
			            itemStyle: {
			                color: '#7fbe9e'
			            },
			            large: true,
			            encode: {
			                x: 0,
			                y: 5
			            }
			        }
			    ]
			};
			
			function generateOHLC(count) {
			    var data = [];
			
			    var xValue = +new Date(2011, 0, 1);
			    var minute = 60 * 1000;
			    var baseValue = Math.random() * 12000;
			    var boxVals = new Array(4);
			    var dayRange = 12;
			
			    for (var i = 0; i < count; i++) {
			        baseValue = baseValue + Math.random() * 20 - 10;
			
			        for (var j = 0; j < 4; j++) {
			            boxVals[j] = (Math.random() - 0.5) * dayRange + baseValue;
			        }
			        boxVals.sort();
			
			        var openIdx = Math.round(Math.random() * 3);
			        var closeIdx = Math.round(Math.random() * 2);
			        if (closeIdx === openIdx) {
			            closeIdx++;
			        }
			        var volumn = boxVals[3] * (1000 + Math.random() * 500);
			
			        // ['open', 'close', 'lowest', 'highest', 'volumn']
			        // [1, 4, 3, 2]
			        data[i] = [
			            echarts.format.formatTime('yyyy-MM-dd\nhh:mm:ss', xValue += minute),
			            +boxVals[openIdx].toFixed(2), // open
			            +boxVals[3].toFixed(2), // highest
			            +boxVals[0].toFixed(2), // lowest
			            +boxVals[closeIdx].toFixed(2),  // close
			            volumn.toFixed(0),
			            getSign(data, i, +boxVals[openIdx], +boxVals[closeIdx], 4) // sign
			        ];
			    }
			
			    return data;
			
			    function getSign(data, dataIndex, openVal, closeVal, closeDimIdx) {
			        var sign;
			        if (openVal > closeVal) {
			            sign = -1;
			        }
			        else if (openVal < closeVal) {
			            sign = 1;
			        }
			        else {
			            sign = dataIndex > 0
			                // If close === open, compare with close of last record
			                ? (data[dataIndex - 1][closeDimIdx] <= closeVal ? 1 : -1)
			                // No record of previous, set to be positive
			                : 1;
			        }
			
			        return sign;
			    }
			}
			
			option && myChart.setOption(option);
		},
  },
}

</script>
<style scoped>
.charts_1 {
  width: 100%;
  height: 200px;
  overflow: hidden;
}
.charts_2 {
  width:100%;
  height: 200px;
  overflow: hidden;
}
.charts_3 {
  width: 100%;
  height: 200px;
  overflow: hidden;
}
.charts_4 {
  width: 100%;
  height: 200px;
  overflow: hidden;
}
</style>