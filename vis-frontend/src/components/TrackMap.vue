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
import {
  firstGeoJson,
  secondGeoJson,
  firstFloor,
  secondFloor,
} from '../config';

echarts.registerMap('first-floor', firstGeoJson);
echarts.registerMap('second-floor', secondGeoJson);
const option = {
  title: {
    text: '人员轨迹图',
    left: 'center',
    textStyle: {
      color: '#eee',
    },
  },
  backgroundColor: '#404a59',
  tooltip: {},
  geo: {
    map: 'first-floor',
    left: 40,
    right: 0,
    height: 520,
    width: 920,
    silent: true,
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
  series: [
    {
      type: 'graph',
      edgeSymbol: ['none', 'arrow'],
      edgeSymbolSize: ['none', 6],
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
          color: 'source',
          width: 1,
          opacity: 1,
        },
      },
      data: [],
    },
    {
      type: 'graph',
      edgeSymbol: ['none', 'arrow'],
      edgeSymbolSize: ['none', 15],
      coordinateSystem: 'geo',
      links: [],
      symbolSize: 15,
      calendarIndex: 0,
      itemStyle: {
        normal: {
          color: 'yellow',
        },
      },
      lineStyle: {
        normal: {
          color: '#FFFF00',
          width: 1,
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
      id: +this.ids[0],
      day: 1,
      floor: 1,
      animateId: 0,
    };
  },
  watch: {
    ids(val) {
      this.tableDate = val.map(id => ({ id }));
      this.id = +val[0];
    },
  },
  methods: {
    getUserId({ id }) {
      this.id = id;
      this.renderTrackMap();
    },
    renderTrackMap() {
      this.animateId = 9999;
      this.$Message.loading('请求中');
      this.$axios
        .get(
          `http://localhost:5270/IDtrack?id=${this.id}&&floor=${
            this.floor
          }&&day=${this.day}`
        )
        .then(({ data: { data } }) => {
          console.log(data);
          const graphData = data[0].track.map(({ x, y }) => [
            x + Math.random() * -0.3 + 0.15,
            y + Math.random() * -0.3 + 0.15,
          ]);
          const links = graphData.map((_, index) => ({
            source: index,
            target: index + 1,
          }));
          links.push({
            source: links.length,
            target: links.length,
          });
          option.title.text = 'id: ' + this.id;

          this.$Message.destroy();
          this.$Message.info('渲染完成');
          this.animateId = 0;

          const render = async () => {
            if (this.animateId > graphData.length - 1) {
              //console.log(this.animateId, graphData.length);
              return;
            }
            option.series[0].links = links.slice(0, this.animateId + 1);
            option.series[0].data = graphData.slice(0, this.animateId + 1);
            option.series[1].links = links.slice(
              this.animateId,
              this.animateId + 1
            );
            option.series[1].data = graphData.slice(
              this.animateId,
              this.animateId + 1
            );

            this.myChart.setOption(option, { notMerge: true });
            await new Promise(resolve => setTimeout(resolve, 80));
            this.animateId++;
            requestAnimationFrame(render);
          };
          requestAnimationFrame(render);
        });
    },
  },
  updated() {
    this.renderTrackMap();
  },
  mounted() {
    const myChart = (this.myChart = echarts.init(
      document.querySelector('#track'),
      'dark'
    ));

    this.$bus.$on('daychange', day => {
      this.day = day;
    });
    this.$bus.$on('floorchange', floor => {
      this.floor = floor;
      option.geo.map = this.floor === 1 ? 'first-floor' : 'second-floor';
      option.geo.nameMap =
        this.floor === 1 ? firstFloor.nameMap : secondFloor.nameMap;
      myChart.setOption(option, true); // 使用刚指定的配置项和数据显示图表。
    });

    myChart.setOption(option, true); // 使用刚指定的配置项和数据显示图表。
  },
};
</script>
