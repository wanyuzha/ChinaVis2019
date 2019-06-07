<template>
  <div>
    <div>
      <Table
        :columns="columns"
        :data="tableData"
        width="392"
        height="400"
      ></Table>
    </div>
  </div>
</template>
<script>
const nameMap = {
  venueA: '分会场A',
  venueB: '分会场B',
  venueC: '分会场C',
  venueD: '分会场D',
  poster: '海报区',
  restroom1: '厕所1',
  restroom2: '厕所2',
  exhibition: '展厅',
  mainVenue: '主会场',
  service: '服务区',
  stair1: '楼梯',
  stair2: '楼梯',
  sign: '签到处',
  entry1: '入口1',
  entry2: '入口2',
  entry3: '入口3',
  entry4: '入口4',
  exit1: '出口1',
  exit2: '出口2',
  exit3: '出口3',
  exit4: '出口4',
  road: '道路',
  room1: 'room1',
  room2: 'room2',
  room3: 'room3',
  room4: 'room4',
  room5: 'room5',
};
export default {
  data() {
    return {
      columns: [
        {
          title: '入口ID',
          key: 'sid',
          width: 120,
        },
        {
          title: '地点',
          key: 'func',
          width: 150,
        },
        {
          title: '流量',
          key: 'count',
          width: 120,
        },
      ],
      tableData: [
        {
          sid: 11300,
          count: 0,
          func: '入口1',
        },
        {
          sid: 11502,
          count: 0,
          func: '入口2',
        },
        {
          sid: 11504,
          count: 0,
          func: '入口3',
        },
        {
          sid: 11507,
          count: 0,
          func: '入口4',
        },
      ],
      gates: [11300, 11502, 11504, 11507],
    };
  },
  created() {
    this.$bus.$on('getFromForce', name => {
      let toPush = {
        sid: name,
        count: 0,
        func: '',
      };
      this.$axios
        .post('http://localhost:5270/get_func', {
          sids: [name],
        })
        .then(r => {
          toPush.func = nameMap[r.data.data[0].function];
          this.tableData.push(toPush);
          this.gates.push(name);
        });
    });
    this.$bus.$on('timechange', ({ time, day }) => {
      this.$axios
        .post('http://localhost:5270/stream', {
          time: time,
          day: day,
          sid: this.gates,
        })
        .then(r => {
          this.tableData.forEach(e => (e.count = 0));
          r.data.data.forEach(e => {
            //console.log(this.tableData.findIndex(el=>{return el.sid === e.sid}))
            this.tableData[
              this.tableData.findIndex(el => el.sid === e.sid)
            ].count = e.count;
            if(e.count > 20) {
              this.$bus.$emit('dispatch',e.sid)
              } // 流量太大
          });
        });
    });
  },
};
</script>
