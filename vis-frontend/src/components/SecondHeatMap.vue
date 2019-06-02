<template>
  <div>
    <div id="second-heatmap" style="width: 1000px;height:600px;"></div>
  </div>
</template>
<script>
import echarts from 'echarts';
export default {
  name: 'secondHeatMap',
  mounted() {
    const myChart = echarts.init(document.getElementById('second-heatmap'));
    let time = [];
    const timeline = Array.from({
      length: 720,
    }).map((_, i) => {
      const [h, m] = [~~((i + 1) / 60) + 7, (i + 1) % 60];
      return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m + ':00';
    });
    const geoJson = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {
            name: '', // 为了显示其它区域名字，而不破坏整体效果，只好委屈你了
          },
          geometry: {
            type: 'Polygon',
            coordinates: [
              [[0.0, 0.0], [30, 0.0]],
              [[30.0, 0.0], [30, 16.0]],
              [[30, 16], [0.0, 16.0]],
              [[0, 16], [0, 0.0]],
              [[0, 1], [30, 1]],
              [[0, 2], [30, 2]],
              [[0, 3], [30, 3]],
              [[0, 4], [30, 4]],
              [[0, 5], [30, 5]],
              [[0, 6], [30, 6]],
              [[0, 7], [30, 7]],
              [[0, 8], [30, 8]],
              [[0, 9], [30, 9]],
              [[0, 10], [30, 10]],
              [[0, 11], [30, 11]],
              [[0, 12], [30, 12]],
              [[0, 13], [30, 13]],
              [[0, 14], [30, 14]],
              [[0, 15], [30, 15]],
              [[1, 0], [1, 16]],
              [[2, 0], [2, 16]],
              [[3, 0], [3, 16]],
              [[4, 0], [4, 16]],
              [[5, 0], [5, 16]],
              [[6, 0], [6, 16]],
              [[7, 0], [7, 16]],
              [[8, 0], [8, 16]],
              [[9, 0], [9, 16]],
              [[10, 0], [10, 16]],
              [[11, 0], [11, 16]],
              [[12, 0], [12, 16]],
              [[13, 0], [13, 16]],
              [[14, 0], [14, 16]],
              [[15, 0], [15, 16]],
              [[16, 0], [16, 16]],
              [[17, 0], [17, 16]],
              [[18, 0], [18, 16]],
              [[19, 0], [19, 16]],
              [[20, 0], [20, 16]],
              [[21, 0], [21, 16]],
              [[22, 0], [22, 16]],
              [[23, 0], [23, 16]],
              [[24, 0], [24, 16]],
              [[25, 0], [25, 16]],
              [[26, 0], [26, 16]],
              [[27, 0], [27, 16]],
              [[28, 0], [28, 16]],
              [[29, 0], [29, 16]],
              [[30, 0], [30, 16]],
            ],
          },
        },
        {
          type: 'Feature',
          properties: {
            name: 'total',
          },
          geometry: {
            type: 'Polygon',
            coordinates: [[[0, 0], [30, 0], [30, 16], [0, 16], [0, 0]]],
          },
        },
        {
          type: 'Feature',
          properties: { name: 'relax' },
          geometry: {
            type: 'Polygon',
            coordinates: [[[0, 0], [6, 0], [6, 3], [0, 3], [0, 0]]],
          },
        },
        {
          type: 'Feature',
          properties: { name: 'room5' },
          geometry: {
            type: 'Polygon',
            coordinates: [[[1, 4], [6, 4], [6, 6], [1, 6], [1, 4]]],
          },
        },
        {
          type: 'Feature',
          properties: { name: 'canteen' },
          geometry: {
            type: 'Polygon',
            coordinates: [[[1, 6], [6, 6], [6, 14], [1, 14], [1, 6]]],
          },
        },
        {
          type: 'Feature',
          properties: { name: 'stair2' },
          geometry: {
            type: 'Polygon',
            coordinates: [[[10, 14], [12, 14], [12, 15], [10, 15], [10, 14]]],
          },
        },
        {
          type: 'Feature',
          properties: { name: 'restroom3' },
          geometry: {
            type: 'Polygon',
            coordinates: [[[10, 10], [12, 10], [12, 12], [10, 12], [10, 10]]],
          },
        },
        {
          type: 'Feature',
          properties: { name: 'room6' },
          geometry: {
            type: 'Polygon',
            coordinates: [[[10, 10], [12, 10], [12, 8], [10, 8], [10, 10]]],
          },
        },
        {
          type: 'Feature',
          properties: { name: 'stair1' },
          geometry: {
            type: 'Polygon',
            coordinates: [[[10, 1], [12, 1], [12, 2], [10, 2], [10, 1]]],
          },
        },
      ],
    };

    echarts.registerMap('second-floor', geoJson);
    const option = {
      baseOption: {
        timeline: {
          axisType: 'category',
          orient: 'horizontal',
          autoPlay: true,
          inverse: false,
          playInterval: 1000,
          left: 80,
          right: 0,
          top: null,
          bottom: 20,
          width: 800,
          height: null,
          currentIndex: 0,
          symbol: 'none',
          lineStyle: {
            color: '#555',
          },
          checkpointStyle: {
            color: '#bbb',
            borderColor: '#777',
            borderWidth: 2,
          },
          controlStyle: {
            showNextBtn: true,
            showPrevBtn: false,
            normal: {
              color: '#666',
              borderColor: '#666',
            },
            emphasis: {
              color: '#aaa',
              borderColor: '#aaa',
            },
          },
          data: timeline,
        },
        title: {
          text: '场馆二层热力图',
          subtext: '07:01:00',
          left: 'center',
          textStyle: {
            color: '#fff',
          },
        },
        backgroundColor: '#404a59',
        visualMap: {
          pieces: [
            {
              min: 100,
            }, // 不指定 max，表示 max 为无限大（Infinity）。
            {
              min: 50,
              max: 100,
            },
            {
              min: 20,
              max: 50,
            },
            {
              min: 10,
              max: 20,
            },
            {
              min: 5,
              max: 10,
            },
            {
              min: 2,
              max: 5,
            },
            {
              max: 2,
            },
          ],
          inRange: {
            color: ['#00FF00', '#eac736', '#FF0000'], //color: ['#50a3ba', '#eac736', '#d94e5d'],
          },
          textStyle: {
            color: '#fff',
          },
        },
        tooltip: {
          show: true,
          trigger: 'item',
          triggerOn: 'mousemove|click',
          axisPointer: {
            type: 'line',
          },
          textStyle: {
            fontSize: 14,
          },
          borderWidth: 0,
        },
        geo: {
          map: 'second-floor',
          label: {
            normal: {
              show: true,
              color: '#fff',
            },
            emphasis: {
              show: true,
              color: '#fff',
            },
          },
          itemStyle: {
            normal: {
              areaColor: '#323c48',
              borderColor: '#111',
            },
            emphasis: {
              areaColor: '#2a333d',
            },
          },
          regions: [
            {
              name: 'total',
              label: {
                normal: {
                  show: false,
                },
                emphasis: {
                  show: false,
                },
              },
              itemStyle: {
                opacity: 0,
              },
            },
          ],
          nameMap: {
            canteen: '餐厅',
            relax: '休闲区',
            stair1: '扶梯',
            stair2: '扶梯',
            restroom3: '厕所',
          },
        },
        animationDurationUpdate: 1000,
        animationEasingUpdate: 'quinticInOut',
      },
      options: [],
    };
    myChart.setOption(option, true);
    this.$axios.get('http://www.jackxin8.cn/vis/heatMap?floor=2').then(r => {
      r.data.data.forEach((item, i) => {
        option.options.push({
          title: {
            show: true,
            text: '场馆二层热力图',
            subtext: timeline[i],
          },
          series: [
            {
              name: 'AQI',
              type: 'heatmap',
              coordinateSystem: 'geo',
              data: item,
            },
          ],
        });
      });
    });
    this.$bus.$on('first', () => {
      // 同步接口信息，二楼请求响应完成时间快于一楼的，防止时间轴时间不一致
      myChart.setOption(option, true);
    });
    myChart.on('timelinechanged', e => {
      time = timeline[e.currentIndex];
    });
    myChart.on('click', params => {
      this.$axios
        .post('http://www.jackxin8.cn/vis/hm2r', {
          pos: myChart.convertFromPixel('geo', [
            params.event.offsetX,
            params.event.offsetY,
          ]),
          time: time,
        })
        .then(r => {
          this.$bus.$emit('getFromHM', r.data);
        })
        .catch(e => {
          // eslint-disable-next-line
          console.log(e);
        });
    });
  },
};
</script>
