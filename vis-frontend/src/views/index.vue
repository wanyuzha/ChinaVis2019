<template>
  <div class="wrap">
    <div>
      <heatMap></heatMap>
      <roseMap></roseMap>
    </div>

    <div>
      <forceMap></forceMap>
      <traffic></traffic>
    </div>
  </div>
</template>
<script>
import heatMap from '../components/HeatMap';
import roseMap from '../components/RoseMap';
import forceMap from '../components/ForceMap';
import traffic from '../components/Traffic'
export default {
  components: {
    forceMap,
    heatMap,
    roseMap,
    traffic
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
