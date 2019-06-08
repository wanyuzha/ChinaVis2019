<template>
  <div id="lineMap" style="width: 600px;height:400px;"></div>
</template>
<script>
import echarts from 'echarts';
const option = {
  tooltip: {
    trigger: 'axis',
    position: function(pt) {
      return [pt[0], '10%'];
    },
  },
  title: {
    left: 'center',
    text: '会议首日总人数统计',
    textStyle: {
      color: '#fff',
    },
  },
  toolbox: {
    feature: {
      dataZoom: {
        yAxisIndex: 'none',
      },
    },
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
  },
  yAxis: {
    type: 'value',
    boundaryGap: [0, '80%'],
  },
  dataZoom: [
    {
      type: 'inside',
      start: 0,
      end: 10,
    },
    {
      start: 0,
      end: 10,
      handleIcon:
        'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
      handleSize: '80%',
      handleStyle: {
        color: '#fff',
        shadowBlur: 3,
        shadowColor: 'rgba(0, 0, 0, 0.6)',
        shadowOffsetX: 2,
        shadowOffsetY: 2,
      },
    },
  ],
  series: [
    {
      name: '总人数',
      type: 'line',
      smooth: true,
      symbol: 'none',
      sampling: 'average',
      itemStyle: {
        color: 'rgb(255, 70, 131)',
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(255, 158, 68)',
          },
          {
            offset: 1,
            color: 'rgb(255, 70, 131)',
          },
        ]),
      },
    },
  ],
};
const title = ['一', '二', '三'];
export default {
  name: 'lineMap',
  mounted() {
    const myChart = echarts.init(document.getElementById('lineMap'), 'dark');
    this.$axios.get('http://localhost:5270/day?day=1').then(({ data }) => {
      console.log(data);
      option.series[0].data = data.data.count;
      option.xAxis.data = data.data.time;
      option.title.text = '会议第一日总人数统计';
      myChart.setOption(option, true);
    });
    this.$bus.$on('daychange', day => {
      this.$axios
        .get('http://localhost:5270/day?day=' + day)
        .then(({ data }) => {
          option.series[0].data = data.data.count;
          option.xAxis.data = data.data.time;
          option.title.text = '会议第' + title[day - 1] + '日总人数统计';
          myChart.setOption(option, true);
        });
    });
  },
};
</script>
