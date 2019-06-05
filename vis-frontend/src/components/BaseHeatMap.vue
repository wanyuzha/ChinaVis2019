<template>
  <div>
    <div id="container">
      <div class="tab" @click="handleClick">
        <span>第一天</span><span>第二天</span><span>第三天</span>
      </div>
      <div class="floor" @click="choiceFloor">
        <div>一楼</div>
        <div>二楼</div>
      </div>
      <div id="first-heatmap"></div>
    </div>
  </div>
</template>
<style scoped>
#first-heatmap {
  width: 1000px;
  height: 600px;
}

#container {
  position: relative;
}
.tab,
.floor {
  position: absolute;
  top: 15px;
  left: 40px;
  z-index: 99;
  color: #fff;
  cursor: pointer;
}
.floor {
  top: 10px;
  left: 10px;
}
.tab > span {
  margin-left: 5px;
}
.tab > span:nth-of-type(n + 2):before {
  content: '|';
  color: #fff;
  font-size: 16px;
  margin-right: 5px;
}
.floor > div:hover,
.tab > span:hover {
  transform: scale(1.2);
  transition: 0.3s all ease-out;
}
</style>

<script>
import echarts from 'echarts';

const geoJson1 = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: '',
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
      properties: {
        name: 'venueA',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[[1, 14], [6, 14], [6, 12], [1, 12], [1, 14]]],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'venueB',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[[1, 12], [6, 12], [6, 10], [1, 10], [1, 12]]],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'venueC',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[[1, 10], [6, 10], [6, 8], [1, 8], [1, 10]]],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'venueD',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[[1, 8], [6, 8], [6, 6], [1, 6], [1, 8]]],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'sign',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[[2, 4], [6, 4], [6, 2], [2, 2], [2, 4]]],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'poster',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[[7, 6], [9, 6], [9, 13], [7, 13], [7, 6]]],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'stair2',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[[10, 14], [12, 14], [12, 15], [10, 15], [10, 14]]],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'restroom1',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[[10, 10], [12, 10], [12, 12], [10, 12], [10, 10]]],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'room1',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[[10, 10], [12, 10], [12, 6], [10, 6], [10, 10]]],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'room2',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[[10, 6], [12, 6], [12, 4], [10, 4], [10, 6]]],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'stair1',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[[10, 1], [12, 1], [12, 2], [10, 2], [10, 1]]],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'exhibition',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[[15, 4], [19, 4], [19, 14], [15, 14], [15, 4]]],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'mainVenue',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[[19, 4], [29, 4], [29, 14], [19, 14], [19, 4]]],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'service',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[[19, 0], [21, 0], [21, 2], [19, 2], [19, 0]]],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'room3',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[[21, 0], [25, 0], [25, 2], [21, 2], [21, 0]]],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'room4',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[[25, 0], [27, 0], [27, 2], [25, 2], [25, 0]]],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'restroom2',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[[27, 0], [29, 0], [29, 2], [27, 2], [27, 0]]],
      },
    },

    {
      type: 'Feature',
      properties: {
        name: 'entry1',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[[0, 2], [1, 2], [1, 3], [0, 3], [0, 2]]],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'entry2',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[[2, 0], [3, 0], [3, 1], [2, 1], [2, 0]]],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'entry3',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[[4, 0], [5, 0], [5, 1], [4, 1], [4, 0]]],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'exit1',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[[5, 0], [6, 0], [6, 1], [5, 1], [5, 0]]],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'entry4',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[[7, 0], [8, 0], [8, 1], [7, 1], [7, 0]]],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'exit2',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[[15, 0], [16, 0], [16, 1], [15, 1], [15, 0]]],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'exit3',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[[17, 0], [18, 0], [18, 1], [17, 1], [17, 0]]],
      },
    },
    {
      type: 'Feature',
      properties: {
        name: 'exit4',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[[19, 15], [20, 15], [20, 16], [19, 16], [19, 15]]],
      },
    },
  ],
};
const geoJson2 = {
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
echarts.registerMap('first-floor', geoJson1);
echarts.registerMap('second-floor', geoJson2);

const timeline1 = Array.from({
  length: 720,
}).map((_, i) => {
  const [h, m] = [~~((i + 1) / 60) + 7, (i + 1) % 60];
  return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m + ':00';
});
const timeline2 = Array.from({
  length: 750,
}).map((_, i) => {
  i = i + 30;
  const [h, m] = [~~((i + 1) / 60) + 7, (i + 1) % 60];
  return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m + ':00';
});
const timeline3 = Array.from({
  length: 300,
}).map((_, i) => {
  i = i + 31;
  const [h, m] = [~~((i + 1) / 60) + 7, (i + 1) % 60];
  return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m + ':00';
});

let timeline = timeline1;
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
      label: {
        show: false,
      },
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
      data: timeline1,
    },
    title: {
      text: '场馆一层热力图',
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
        color: ['#00FF00', '#eac736', '#FF0000'],
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
      map: 'first-floor',
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
        venueA: '分会场A',
        venueB: '分会场B',
        venueC: '分会场C',
        venueD: '分会场D',
        poster: '海报区',
        restroom1: '厕所1',
        restroom2: '厕所2',
        exhibition: '展厅',
        mainVenue: '主会场',
        service: '服务区',
        stair1: '楼梯',
        stair2: '楼梯',
        sign: '签到处',
        entry1: '入口',
        entry2: '入口',
        entry3: '入口',
        entry4: '入口',
        exit1: '出口',
        exit2: '出口',
        exit3: '出口',
        exit4: '出口',
      },
    },
    animationDurationUpdate: 1000,
    animationEasingUpdate: 'quinticInOut',
  },
  options: [],
};

export default {
  name: 'baseHeatMap',
  props: ['title', 'nameMap', 'floor', 'choiceFloor'],
  data() {
    return {
      time: null,
      day: 1,
    };
  },
  watch: {
    title() {
      option.baseOption.title.text = this.title;
      option.baseOption.geo.nameMap = this.nameMap;
      option.baseOption.geo.map =
        this.floor === 1 ? 'first-floor' : 'second-floor';
      option.options = [];
      this.$Message.loading('切换中');
      this.request(this.day).then(() => {
        this.$Message.success('切换成功');
        this.myChart.setOption(option, { notMerge: true });
      });
    },
  },
  methods: {
    handleClick(e) {
      const day = { 第一天: 1, 第二天: 2, 第三天: 3 }[e.target.innerText];
      if (day === 1) {
        timeline = option.baseOption.timeline.data = timeline1;
      }
      if (day === 2) {
        timeline = option.baseOption.timeline.data = timeline2;
      }
      if (day === 3) {
        timeline = option.baseOption.timeline.data = timeline3;
      }
      this.day = day;
      this.$Message.loading('切换中');
      this.myChart.dispatchAction({
        type: 'timelinePlayChange',
        playState: false,
      });

      this.request(day).then(() => {
        this.$Message.success('切换成功');
      });
    },

    request(day = 1) {
      return this.$axios
        .get(`http://localhost:5270/heatMap?floor=${this.floor}&&day=${day}`)
        .then(({ data }) => {
          option.options = data.data.map((item, i) => {
            return {
              title: {
                show: true,
                text: this.title,
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
            };
          });

          this.myChart.setOption(option, { notMerge: true });
          this.$bus.$emit('first'); // 通知二楼热力图渲染
        });
    },
  },
  updated() {
    console.log(this.title);
  },
  mounted() {
    const myChart = (this.myChart = echarts.init(
      document.getElementById('first-heatmap')
    ));

    myChart.setOption(option, { notMerge: true });
    this.request();

    myChart.on('timelinechanged', ({ currentIndex }) => {
      this.time = timeline[currentIndex];
    });
    myChart.on('click', ({ event: { offsetX, offsetY } }) => {
      console.log(myChart.convertFromPixel('geo', [offsetX, offsetY]));
      this.$axios
        .post('http://localhost:5270/hm2r', {
          pos: myChart.convertFromPixel('geo', [offsetX, offsetY]),
          time: this.time,
        })
        .then(r => {
          this.$bus.$emit('getFromHM', r.data);
        })
        .catch(e => {
          console.log(e);
        });
    });
  },
};
</script>
