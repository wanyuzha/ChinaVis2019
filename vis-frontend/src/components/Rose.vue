<template>
  <div>
    <div id="rose" style="width: 600px;height:600px;"></div>
    <el-dialog title="人员ID详情" :visible.sync="visible" width="60%" style="opacity:0.8;">
      <div style="text-align:left;overflow:scroll;height:400px">
        <div v-for="item in ids">
          {{item}}
        </div>
      </div>

      <!--
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="visible = false">确 定</el-button>
      </span>!-->
    </el-dialog>
  </div>
</template>
<script>
import echarts from 'echarts';
let myChart = null;
const option = {
  title: {
    text: '人员种类分布玫瑰图',
    subtext: '功能区：',
    x: 'center',
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)',
  },
  legend: {
    x: 'center',
    y: 'bottom',
    data: ['rose1', 'rose2', 'rose3', 'rose4'],
  },
  toolbox: {
    show: true,
    feature: {
      mark: {
        show: true,
      },
      dataView: {
        show: true,
        readOnly: false,
      },
      magicType: {
        show: true,
        type: ['pie', 'funnel'],
      },
    },
  },
  calculable: true,
  series: [
    {
      name: '面积模式',
      type: 'pie',
      radius: [30, 110],
      roseType: 'raidus',
      data: [
        {
          value: 10,
          name: 'rose1',
        },
        {
          value: 5,
          name: 'rose2',
        },
        {
          value: 15,
          name: 'rose3',
        },
        {
          value: 25,
          name: 'rose4',
        },
      ],
    },
  ],
};
var chartData = [
      {
        value: 0,
        name: 'rose1',
      },
      {
        value: 0,
        name: 'rose2',
      },
      {
        value: 0,
        name: 'rose3',
      },
      {
        value: 0,
        name: 'rose4',
      },
    ]
var data_ = {}
export default {
  name: 'rose',
  data () {
    return {
      visible:false,
      ids:[]
    }
  },
  created() {
    let that = this
    this.$bus.$on('getFromHM', ({ data, message }) => {
      if (message === 'success') {
        data_ = data
        const keys = Object.keys(chartData);
        keys.forEach(e => {
          if(data[e] === undefined) chartData[e].value = 0
          else chartData[e].value = data[e].count
        });
        option.series[0].data = chartData;
        myChart.setOption(option, true);
      }
    });
  },
  mounted() {
    let that = this
    myChart = echarts.init(document.getElementById('rose'));
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option, true);
    myChart.on('click',params=>{
      let index = params.dataIndex
      if(data_[index] === undefined) return;
      that.ids = data_[index].ids
      that.visible = true
    })
  },
};
</script>
