<template>
  <div id="bar" style="width: 600px;height:600px;"></div>
</template>
<script>
import echarts from 'echarts';
export default {
    name: 'bar',
    mounted(){
        const myChart = echarts.init(document.getElementById('bar'));
        this.$bus.$on('timechange', ({time, day})=>{
            this.$axios.get('http://localhost:5270/function?time='+time+'&day='+day).then(({data})=>{
                
            })
        })
        
    }
}
</script>