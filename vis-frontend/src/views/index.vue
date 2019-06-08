<template>
  <div class="wrap">
    <div>
      <lineMap></lineMap><scheduleMap></scheduleMap><forceMap></forceMap
      ><scatterMap></scatterMap>
    </div>
    <div>
      <heatMap></heatMap>
      <div style="display:flex">
        <roseMap style="disply:none"></roseMap> <parallelMap></parallelMap>
      </div>
    </div>

    <div>
      <barMap></barMap>
      <workerMap></workerMap>
      <trafficMap></trafficMap>
    </div>

    <!--
    <div>
       
    </div>!-->
  </div>
</template>
<style>
.wrap {
  display: flex;
  overflow-x: scroll;
}
.wrap > div {
  margin-bottom: 50px;
}

.wrap > div > div {
  margin: 10px;
  /* box-shadow: 0 0 8px blue; */
  color: aliceblue;
  background: rgba(64, 74, 89, 1) !important;
}

.ivu-tabs,
.ivu-table-body,
.ivu-table-cell,
.ivu-table-wrapper,
.ivu-table-header,
.ivu-table-tip,
th,
td {
  color: aliceblue;
  background: rgba(64, 74, 89, 1) !important;
}

.ivu-table-body {
  overflow-x: hidden !important;
}
</style>

<script>
import heatMap from '../components/HeatMap';
import roseMap from '../components/RoseMap';
import forceMap from '../components/ForceMap';
import trafficMap from '../components/TrafficMap';
import workerMap from '../components/WorkerMap';
import barMap from '../components/BarMap';
import scatterMap from '../components/ScatterMap';
import scheduleMap from '../components/ScheduleMap';
import parallelMap from '../components/ParallelMap';
import lineMap from '../components/LineMap';
export default {
  components: {
    forceMap,
    heatMap,
    roseMap,
    trafficMap,
    workerMap,
    barMap,
    scatterMap,
    scheduleMap,
    parallelMap,
    lineMap,
  },
};
</script>
