<template>
  <baseHeatMap
    :title="title"
    :floor="floor"
    :nameMap="nameMap"
    :choiceFloor="choiceFloor"
  ></baseHeatMap>
</template>

<script>
import baseHeatMap from './BaseHeatMap';
const firstFloor = {
  title: '场馆一层热力图',
  floor: 1,
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
};
const secondFloor = {
  title: '场馆二层热力图',
  floor: 2,
  nameMap: {
    canteen: '餐厅',
    relax: '休闲区',
    stair1: '扶梯',
    stair2: '扶梯',
    restroom3: '厕所',
  },
};
export default {
  name: 'heatMap',
  data() {
    return {
      ...firstFloor,
    };
  },
  methods: {
    choiceFloor(e) {
      if (e.target.innerText === '一楼') {
        this.floor = firstFloor.floor;
        this.title = firstFloor.title;
        this.nameMap = firstFloor.nameMap;
      }
      if (e.target.innerText === '二楼') {
        this.floor = secondFloor.floor;
        this.title = secondFloor.title;
        this.nameMap = secondFloor.nameMap;
      }
    },
  },
  components: {
    baseHeatMap,
  },
};
</script>
