<template>
  <div>
    <div id="container">
      <div class="tab" @click="getDay">
        <span>第一天</span><span>第二天</span><span>第三天</span>
      </div>
      <div class="floor" @click="getFloor">
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
  height: 700px;
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
import { firstGeoJson, secondGeoJson } from '../config';

echarts.registerMap('first-floor', firstGeoJson);
echarts.registerMap('second-floor', secondGeoJson);

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
    width: 1100,
    timeline: {
      axisType: 'category',
      orient: 'horizontal',
      autoPlay: true,
      inverse: false,
      playInterval: 1000,
      left: 110,
      right: 0,
      top: null,
      bottom: 20,
      width: 890,
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
      left: 145,
      width: 850,
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
    animationDurationUpdate: 3000,
    animationEasingUpdate: 'linear',
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
    getFloor(e) {
      if (e.target.innerText === '一楼') {
        this.$bus.$emit('floorchange', 1);
      }
      if (e.target.innerText === '二楼') {
        this.$bus.$emit('floorchange', 2);
      }
      this.choiceFloor(e);
    },
    getDay(e) {
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
      this.$bus.$emit('daychange', day);
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
      document.getElementById('first-heatmap'),
      'dark'
    ));

    myChart.setOption(option, { notMerge: true });
    myChart.dispatchAction({
      type: 'timelinePlayChange',
      playState: false,
    });
    this.request();

    myChart.on('timelinechanged', ({ currentIndex }) => {
      this.time = timeline[currentIndex];
      this.$bus.$emit('timechange', { time: this.time, day: this.day });
    });
    myChart.on('click', ({ event: { offsetX, offsetY } }) => {
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
    this.$bus.$on('force', () => {});
  },
};
</script>
