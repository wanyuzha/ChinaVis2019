<template>
  <div>
    <div id="rose"></div>
    <Modal
      title="人员ID详情"
      v-model="visible"
      :mask-closable="false"
      width="1300"
    >
      <trackMap :ids="ids"></trackMap>
      <!--
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="visible = false">确 定</el-button>
      </span>!-->
    </Modal>
  </div>
</template>
<style scoped>
#rose {
  width: 540px;
  height: 500px;
}
</style>

<script>
import echarts from 'echarts';
import trackMap from './TrackMap';

const option = {
  title: {
    text: '人员种类分布玫瑰图',
    x: 'center',
  },
  tooltip: {
    trigger: 'item',
    formatter: '{b} : {c} ({d}%)',
  },
  legend: {
    x: 'center',
    y: 'bottom',
    data: ['普通参展人员', '工作人员', '记者', '大咖'],
  },
  toolbox: {
    show: true,
    feature: {
      mark: {
        show: true,
      },

      magicType: {
        show: true,
        type: ['pie', 'funnel'],
      },
    },
  },

  series: [
    {
      name: '面积模式',
      type: 'pie',
      radius: [30, 110],
      roseType: 'raidus',
      stillShowZeroSum: false,
      label: {
        normal: {
          show: true,
        },
        emphasis: {
          show: true,
        },
      },
      data: [
        {
          value: 2794,
          name: '普通参展人员',
          labelLine: {
            show: true,
          },
          label: {
            normal: {
              show: true,
            },
          },
        },
        {
          value: 107,
          name: '工作人员',
          labelLine: {
            show: true,
          },
          label: {
            normal: {
              show: true,
            },
          },
        },
        {
          value: 1508,
          name: '记者',
          labelLine: {
            show: true,
          },
          label: {
            normal: {
              show: true,
            },
          },
        },
        {
          value: 25,
          name: '大咖',
          labelLine: {
            show: true,
          },
          label: {
            normal: {
              show: true,
            },
          },
        },
      ],
    },
  ],
};
const chartData = [
  {
    value: 10,
    name: '普通参展人员',
  },
  {
    value: 5,
    name: '工作人员',
  },
  {
    value: 15,
    name: '记者',
  },
  {
    value: 25,
    name: '大咖',
  },
];

export default {
  name: 'rose',
  data() {
    return {
      myChart: null,
      visible: false,
      ids: [],
      data: [],
    };
  },
  components: {
    trackMap,
  },
  created() {
    this.$bus.$on('getFromHM', ({ data, message }) => {
      if (message === 'success') {
        this.data = data;
        const keys = Object.keys(chartData);
        keys.forEach(e => {
          if (data[e] === undefined) {
            chartData[e].value = 0;
            chartData[e].labelLine = { show: false };
            chartData[e].label = { normal: { show: false } };
          } else {
            chartData[e].value = data[e].count;
            chartData[e].labelLine = { show: true };
            chartData[e].label = { normal: { show: true } };
          }
        });
        option.series[0].data = chartData;
        this.myChart.setOption(option, true);
      }
    });
  },

  mounted() {
    this.myChart = echarts.init(document.getElementById('rose'), 'dark');
    // 使用刚指定的配置项和数据显示图表。
    this.myChart.setOption(option, true);
    this.myChart.on('click', ({ dataIndex: index }) => {
      if (this.data[index] === undefined) {
        this.$Message.info('请选择一块区域进行显示');
        return;
      }
      this.ids = this.data[index].ids;
      this.visible = true;
    });

    this.$bus.$on('scatterclick', id => {
      console.log(id);
      this.ids = [id];
      this.visible = true;
    });
  },
};
</script>
