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
		initCharts_4() {
			const echarts = require('echarts/lib/echarts');
			require('echarts/lib/component/title');
			require('echarts/lib/component/tooltip');
			require('echarts/lib/component/grid');
			require('echarts/lib/chart/line');
			var chartDom = document.getElementById('charts_4');
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