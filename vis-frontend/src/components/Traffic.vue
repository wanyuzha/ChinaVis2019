<template>
    <div>
        <div>
            <div v-for="(v,k) in gates">
                <span>入口ID：{{k}}</span>
                <span>流量：{{v.count}}</span>
                <span>功能区：{{v.func}}</span>
            </div>
        </div>
        <div>{{time}}</div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            gates:{
                11300:{count:0,func:''},
                11502:{count:0,func:''},
                11504:{count:0,func:''},
                11507:{count:0,func:''},
            },
            time:'123'
        }
    },
    mounted () {
        let that = this
        this.$axios.post('http://localhost:5270/get_func',{
            sids:Object.keys(that.gates)
        }).then(r=>{
            r.data.data.forEach(e=>{
                that.gates[e.sid].func = e.function
            })
        })
    },
    created () {
        let that = this
        this.$bus.$on('getFromForce',name => {
            console.log(name)
            that.gates[name] = {count:0,func:''}
            this.$axios.post('http://localhost:5270/get_func', {
                sids: [name]
            }).then(r => {
                that.gates[name].func = r.data.data[0].function
            })
        })
        this.$bus.$on('timechange',({time,day})=>{
            that.time = time
            that.$axios.post('http://localhost:5270/stream',{
                time:time,
                day:day,
                sid:Object.keys(that.gates)
            }).then(r=>{
                Object.keys(that.gates).forEach(e=>{
                    that.gates[e].count = 0
                })
                that.gates
                r.data.data.forEach(e => {
                    that.gates[e.sid].count = e.count
                });
            })
        })
    }
}
</script>
