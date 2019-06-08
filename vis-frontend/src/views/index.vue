<template>
  <div class="wrap">
    <div><forceMap></forceMap></div>
    <div>
      <heatMap></heatMap>
      <div><roseMap></roseMap></div>
    </div>

    <div>
      <workerMap></workerMap>
      <trafficMap></trafficMap>
    </div>

    <!--
    <div>
        <barMap></barMap>
    </div>!-->
    <div>
      <scatterMap></scatterMap>
      <scheduleMap></scheduleMap>
    </div>
  </div>
</template>
<script>
import heatMap from '../components/HeatMap';
import roseMap from '../components/RoseMap';
import forceMap from '../components/ForceMap';
import trafficMap from '../components/TrafficMap';
import workerMap from '../components/WorkerMap';
import barMap from '../components/BarMap';
import scatterMap from '../components/ScatterMap';
import scheduleMap from '../components/ScheduleMap';
export default {
  components: {
    forceMap,
    heatMap,
    roseMap,
    trafficMap,
    workerMap,
    barMap,
    scatterMap,
    scheduleMap
  },
};
</script>
<style>
.wrap {
  display: flex;
  overflow-x: scroll;
}
.wrap > div {
  margin-bottom: 50px;
}
</style>
