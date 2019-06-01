<template>
    <div class="wrap">
        <heatMap></heatMap>
        <river></river>
    </div>
</template>
<script>
import heatMap from '../components/HeatMap'
import river from '../components/River'
export default {
    components:{
        heatMap,
        river
    }
}
</script>
<style>
.wrap{
    display: flex;
}
</style>
