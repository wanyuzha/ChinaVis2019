<template>
  <div class="wrap">
    <div>
      <heatMap></heatMap>
      <roseMap></roseMap>
    </div>

    <div>
      <forceMap></forceMap>
      <workerMap></workerMap>
      <trafficMap></trafficMap>
    </div>
    <div>
        <barMap></barMap>
    </div>
    
  </div>
</template>
<script>
import heatMap from '../components/HeatMap';
import roseMap from '../components/RoseMap';
import forceMap from '../components/ForceMap';
import trafficMap from '../components/TrafficMap';
import workerMap from '../components/WorkerMap';
import barMap from '../components/BarMap'
export default {
  components: {
    forceMap,
    heatMap,
    roseMap,
    trafficMap,
    workerMap,
    barMap
  },
};
</script>
<style>
/* .wrap {
  display: flex;
} */
.wrap > div {
  display: flex;
  margin-bottom: 50px;
}
</style>
