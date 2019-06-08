<template>
  <div class="wrap">
    <div>
      <lineMap></lineMap><scheduleMap></scheduleMap><forceMap></forceMap>
    </div>
    <div style="width:1120px">
      <logo></logo>
      <heatMap></heatMap>
      <main class="center-bottom">
        <roseMap></roseMap><scatterMap></scatterMap>
      </main>
    </div>

    <div>
      <timeMap></timeMap>
      <barMap></barMap>
      <workerMap></workerMap>
      <trafficMap></trafficMap>
    </div>
  </div>

  <!--
    <div>
       
    </div>!-->
</template>
<style>
.center-bottom {
  display: flex;
}
.center-bottom > div {
  margin-left: 10px;
}
.wrap {
  display: flex;
  overflow-x: hidden;
}
.wrap > div {
  margin-bottom: 10px;
}

.wrap > div > div {
  margin: 10px;
  /* box-shadow: 0 0 8px blue; */
  color: aliceblue;
  background: rgba(64, 74, 89, 1) !important;
}

.ivu-modal-content,
.ivu-modal-header-inner {
  color: #fff !important;
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
import logo from '../components/Logo';
import timeMap from '../components/TimeMap';
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
    logo,
    timeMap,
  },
};
</script>
