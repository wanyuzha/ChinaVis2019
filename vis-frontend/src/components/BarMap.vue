<template>
  <div id="barMap" style="width: 600px;height:400px;"></div>
</template>
<script>
import echarts from 'echarts';

export default {
  name: 'barMap',
  mounted() {
    const myChart = echarts.init(document.getElementById('barMap'), 'dark');
    this.$bus.$on('timechange', ({ time, day }) => {
      time = time.split(':').reduce((pre, cur, index) => {
        return pre + cur * Math.pow(60, 2 - index);
      }, 0);
      time = time / 60 - 7 * 60 - 1;

      this.$axios
        .get('http://localhost:5270/function?time=' + time + '&day=' + day)
        .then(({ data }) => {
          console.log(data);
          const option = {
            color: ['#3398DB'],
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow',
              },
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true,
            },
            xAxis: [
              {
                type: 'category',
                data: data.xAxis,
                axisLabel: {
                  interval: 0,
                  rotate: -45,
                },
                axisTick: {
                  alignWithLabel: true,
                },
              },
            ],
            yAxis: [
              {
                type: 'value',
              },
            ],
            series: [
              {
                type: 'bar',
                data: data.data,
              },
            ],
          };
          myChart.setOption(option, true);
        });
    });
  },
};
</script>
