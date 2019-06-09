<template>
<div style="width:540px;">
<div id="scatterMap" style="width: 530px;height:500px;"></div>
</div>
  
</template>
<script>
import echarts from 'echarts';
import 'echarts-gl';

export default {
  name: 'scatterMap',
  data() {
    return {
      ids: [],
      visible: false,
    };
  },
  mounted() {
    const myChart = echarts.init(document.getElementById('scatterMap'), 'dark');
    this.$axios.get('http://localhost:5270/pca?day=1').then(({ data }) => {
      const option = {
        grid3D: {
          axisLine: {
                lineStyle: {
                  color: '#fff'
                }
            }
        },
        xAxis3D: {},
        yAxis3D: {},
        zAxis3D: {},
        dataset: {
          source: data.data,
        },
        series: [
          {
            type: 'scatter3D',
            symbolSize: 2.5,
            label: {
              formatter: '{b}',
            },
            encode: {
              x: 'x',
              y: 'y',
              z: 'z',
              itemName: 'id',
            },
          },
        ],
      };
      myChart.setOption(option, true);
    });
    this.$bus.$on('daychange', day => {
      console.log(day);
      this.$axios
        .get('http://localhost:5270/pca?day=' + day)
        .then(({ data }) => {
          console.log(data);
          const option = {
            grid3D: {
              axisLine: {
                lineStyle: {
                  color: '#fff'
                }
              }
            },
            xAxis3D: {},
            yAxis3D: {},
            zAxis3D: {},
            dataset: {
              source: data.data,
            },
            series: [
              {
                type: 'scatter3D',
                symbolSize: 2.5,
                label: {
                  formatter: '{b}',
                },
                encode: {
                  x: 'x',
                  y: 'y',
                  z: 'z',
                  itemName: 'id',
                },
              },
            ],
          };
          myChart.setOption(option, true);
        });
    });
    myChart.on('click', params => {
      this.$bus.$emit('scatterclick', params.name);
    });
  },
};
</script>
