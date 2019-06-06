<template>
  <div class="wrap">
    <div>
      <heatMap></heatMap>
      <roseMap></roseMap>
    </div>

    <div>
      <forceMap></forceMap>
      <worker></worker>
      <traffic></traffic>
    </div>
  </div>
</template>
<script>
import heatMap from '../components/HeatMap';
import roseMap from '../components/RoseMap';
import forceMap from '../components/ForceMap';
import traffic from '../components/Traffic'
import worker from '../components/Worker'
export default {
  components: {
    forceMap,
    heatMap,
    roseMap,
    traffic,
    worker
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
