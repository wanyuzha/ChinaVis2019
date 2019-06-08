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
import { firstFloor, secondFloor } from '../config';
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
