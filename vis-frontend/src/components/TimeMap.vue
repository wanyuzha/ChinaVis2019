<template>
    <Card style="width:600px">
        <div style="text-align:center">
            <h3>A high quality UI Toolkit based on Vue.js</h3>
        </div>
    </Card>
</template>
<script>

export default {
    mounted() {
        this.$bus.$on('timechange', ({time,day}) => {

        })
    }
}
</script>
