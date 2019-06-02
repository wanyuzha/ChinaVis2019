<template>
    <div class="wrap">
        <heatMap></heatMap>
        <rose></rose>
    </div>
</template>
<script>
import heatMap from '../components/HeatMap'
import rose from '../components/Rose'
export default {
    components:{
        heatMap,
        rose
    }
}
</script>
<style>
.wrap{
    display: flex;
}
</style>
