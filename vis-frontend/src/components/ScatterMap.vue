<template>
  <div id="scatterMap" style="width: 600px;height:400px;"></div>
</template>
<script>
import echarts from 'echarts';
import echarts_gl from 'echarts-gl';



export default {
    name: 'scatterMap',
    mounted(){
        const myChart = echarts.init(document.getElementById('scatterMap'));
        
    }
}
</script>
