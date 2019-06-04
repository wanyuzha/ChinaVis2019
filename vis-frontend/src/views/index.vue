<template>
  <div class="wrap">
    <div>
      <firstHeatMap></firstHeatMap>
      <rose></rose>
    </div>

    <div>
      <secondHeatMap></secondHeatMap>
      <force></force>
    </div>
  </div>
</template>
<script>
import firstHeatMap from '../components/FirstHeatMap';
import secondHeatMap from '../components/SecondHeatMap';
import rose from '../components/Rose';
import force from '../components/Force';
export default {
  components: {
    force,
    firstHeatMap,
    secondHeatMap,
    rose,
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
