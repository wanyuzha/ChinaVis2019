<template>
  <div>
    <div class="dropdown">
      <div style="font-size:15px;margin-right:7px;" @click="onFuncChange('any')"><a href="javascript:void(0)" style="color:white;">全部</a></div>
      <div style="font-size:15px;margin-right:7px;" @click="onFuncChange('relax')"><a href="javascript:void(0)" style="color:white;">休闲区</a></div>
      <div style="font-size:15px;margin-right:7px;" @click="onFuncChange('canteen')"><a href="javascript:void(0)" style="color:white;">餐厅</a></div>
      <div style="font-size:15px;margin-right:7px;" @click="onFuncChange('sign')"><a href="javascript:void(0)" style="color:white;">签到处</a></div>
      <div style="font-size:15px;margin-right:7px;" @click="onFuncChange('service')"><a href="javascript:void(0)" style="color:white;">服务区</a></div>
      <div style="font-size:15px;margin-right:7px;" @click="onFuncChange('mainVenue')"><a href="javascript:void(0)" style="color:white;">主会场</a></div>
      <div style="font-size:15px;margin-right:7px;" @click="onFuncChange('exhibition')"><a href="javascript:void(0)" style="color:white;">展厅</a></div>
      <Dropdown style="font-size:15px;margin-right:7px;" @on-click="dropDownClick">
        <a href="javascript:void(0)" style="color:white;">
            Room
        </a>
        <DropdownMenu slot="list">
              <DropdownItem name="room1">Room1</DropdownItem>
              <DropdownItem name="room2">Room2</DropdownItem>
              <DropdownItem name="room3">Room3</DropdownItem>
              <DropdownItem name="room4">Room4</DropdownItem>
              <DropdownItem name="room5">Room5</DropdownItem>
              <DropdownItem name="room6">Room6</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown style="font-size:15px;margin-right:7px;" @on-click="dropDownClick">
        <a href="javascript:void(0)" style="color:white;">
            厕所
        </a>
        <DropdownMenu slot="list">
              <DropdownItem name="restroom1">厕所1</DropdownItem>
              <DropdownItem name="restroom2">厕所2</DropdownItem>
              <DropdownItem name="restroom3">厕所3</DropdownItem>
              <DropdownItem name="restroom4">厕所4</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown style="font-size:15px;margin-right:7px;" @on-click="dropDownClick">
        <a href="javascript:void(0)" style="color:white;">
            分会场
        </a>
        <DropdownMenu slot="list">
              <DropdownItem name="venueA">分会场A</DropdownItem>
              <DropdownItem name="venueB">分会场B</DropdownItem>
              <DropdownItem name="venueC">分会场C</DropdownItem>
              <DropdownItem name="venueD">分会场D</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown style="font-size:15px;margin-right:7px;" @on-click="dropDownClick">
        <a href="javascript:void(0)" style="color:white;">
            出口
        </a>
        <DropdownMenu slot="list">
              <DropdownItem name="exit1">出口1</DropdownItem>
              <DropdownItem name="exit2">出口2</DropdownItem>
              <DropdownItem name="exit3">出口3</DropdownItem>
              <DropdownItem name="exit4">出口4</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown style="font-size:15px;margin-right:7px;" @on-click="dropDownClick">
        <a href="javascript:void(0)" style="color:white;">
            入口
        </a>
        <DropdownMenu slot="list">
              <DropdownItem name="entry1">入口1</DropdownItem>
              <DropdownItem name="entry2">入口2</DropdownItem>
              <DropdownItem name="entry3">入口3</DropdownItem>
              <DropdownItem name="entry4">入口4</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown style="font-size:15px;margin-right:7px;" @on-click="dropDownClick">
        <a href="javascript:void(0)" style="color:white;">
            楼梯
        </a>
        <DropdownMenu slot="list">
              <DropdownItem name="stair1">楼梯1</DropdownItem>
              <DropdownItem name="stair2">楼梯2</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      
    </div>
    <div id="lineMap" style="width: 600px;height:400px;"></div>
  </div>
  
</template>
<style scoped>
.dropdown{
  position:absolute;
  top:45px;
  left:20px;
  z-index: 1000;
  display: flex;
}
.ivu-select-dropdown{
  background-color: #3f4a58;
}
.ivu-dropdown-item{
  color:white;
}
</style>

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
var myChart;
const title = ['一', '二', '三'];
export default {
  name: 'lineMap',
  data () {
    return {
      day:1
    }
  },
  mounted() {
    myChart = echarts.init(document.getElementById('lineMap'), 'dark');
    this.$axios.get('http://localhost:5270/day',{
      params:{
        day:1,
        func:'any'
      }
    }).then(({ data }) => {
      console.log(data);
      option.series[0].data = data.data.count;
      option.xAxis.data = data.data.time;
      option.title.text = '会议第一日总人数统计';
      myChart.setOption(option, true);
    });
    this.$bus.$on('daychange', day => {
      this.day = day
      this.$axios
        .get('http://localhost:5270/day',{
          params:{
            day:day,
            func:'any'
          }
        })
        .then(({ data }) => {
          option.series[0].data = data.data.count;
          option.xAxis.data = data.data.time;
          option.title.text = '会议第' + title[day - 1] + '日总人数统计';
          myChart.setOption(option, true);
        });
    });
  },
  methods: {
    onFuncChange(func){
      this.$axios
        .get('http://localhost:5270/day',{
          params:{
            day:this.day,
            func:func
          }
        })
        .then(({ data }) => {
          option.series[0].data = data.data.count;
          option.xAxis.data = data.data.time;
          myChart.setOption(option, true);
        });
    },
    dropDownClick(val){
      this.onFuncChange(val)
    }
  }
};
</script>
