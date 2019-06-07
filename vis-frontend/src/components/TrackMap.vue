<template>
  <div style="display:flex">
    <div class="id-list">
      <Table
        :columns="columns"
        :data="tableDate"
        :height="600"
        @on-row-click="getUserId"
      ></Table>
    </div>
    <div id="track"></div>
  </div>
</template>
<style scoped>
.id-list {
  text-align: left;
  overflow: hidden;
  overflow-y: auto;

  width: 200px;
  display: flex;
  flex-flow: row wrap;
}

.id-list > div {
  width: 100%;
  text-align: center;
  cursor: pointer;
}

#track {
  width: 1000px;
  height: 600px;
  margin-left: 20px;
}
</style>

<script>
import echarts from 'echarts';
import { firstGeoJson, secondGeoJson } from '../config';

echarts.registerMap('first-floor', firstGeoJson);
echarts.registerMap('second-floor', secondGeoJson);
const option = {
  title: {
    text: 'World Flights',
    left: 'center',
    textStyle: {
      color: '#eee',
    },
  },
  backgroundColor: '#404a59',
  tooltip: {},
  geo: {
    map: 'first-floor',
    left: 0,
    right: 0,
    silent: true,
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
  },
  series: [
    {
      type: 'graph',
      edgeSymbol: ['none', 'arrow'],
      edgeSymbolSize: ['none', 4],
      coordinateSystem: 'geo',
      links: [],
      symbolSize: 0,
      calendarIndex: 0,
      itemStyle: {
        normal: {
          color: 'yellow',
        },
      },
      lineStyle: {
        normal: {
          color: '#D10E00',
          width: 0.5,
          opacity: 1,
        },
      },
      data: [],
    },
  ],
};

export default {
  name: 'trackmap',
  props: ['ids'],
  data() {
    return {
      columns: [
        {
          title: '人员id',
          key: 'id',
          align: 'center',
        },
      ],
      tableDate: this.ids.map(id => ({ id })),
      id: this.ids[0],
      day: 1,
      floor: 1,
    };
  },
  watch: {
    ids(val) {
      this.tableDate = val.map(id => ({ id }));
    },
  },
  methods: {
    getUserId({ id }) {
      this.id = id;
      this.renderTrackMap();
    },
    renderTrackMap() {
      this.$Message.loading('请求中');
      this.$axios
        .get(
          `http://localhost:5270/IDtrack?id=${this.id}&&floor=${
            this.floor
          }&&day=${this.day}`
        )
        .then(({ data: { data } }) => {
          const graphData = data[0].track.map(({ x, y }) => [x, y]);
          const links = graphData.map((_, index) => ({
            source: index,
            target: index + 1,
          }));
          option.series[0].links = links;
          option.series[0].data = graphData;
          this.$Message.destroy();
          this.$Message.info('渲染完成');
          this.myChart.setOption(option, { notMerge: true });
        });
    },
  },
  updated() {
    this.renderTrackMap();
  },
  mounted() {
    const myChart = (this.myChart = echarts.init(
      document.querySelector('#track')
    ));
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option, true);
    this.$bus.on('daychange', day => {
      this.day = day;
    });
    this.$bus.on('floorchange', floor => {
      this.floor = floor;
    });
    this.$axios.get(`http://localhost:5270/IDtrack?id=${this.id}`, data => {
      console.log(data);
    });
  },
};
</script>
