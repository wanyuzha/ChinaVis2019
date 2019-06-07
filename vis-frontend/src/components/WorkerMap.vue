<template>
  <div>
    <Tabs value="norm" style="width:400px;">
      <TabPane label="普通会务" name="norm">
        <Table
          :columns="columns2"
          :data="tableData2"
          width="370"
          height="400"
        ></Table>
      </TabPane>
      <TabPane label="安保人员" name="sec">
        <Table
          :columns="columns1"
          :data="tableData1"
          width="370"
          height="300"
        ></Table>
      </TabPane>
    </Tabs>
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
  room: 'room',
};
var last_id = 0;
export default {
  data() {
    return {
      columns1: [
        {
          title: '安保ID',
          key: 'id',
          width: 175,
        },
        {
          title: '所在地点',
          key: 'sid',
          width: 195,
        },
      ],
      columns2: [
        {
          title: '人员ID',
          key: 'id',
          width: 120,
        },
        {
          title: '工作地点',
          key: 'class',
          width: 150,
        },
        {
          title: '是否在岗',
          key: 'duty',
          width: 100,
        },
      ],
      tableData1: [],
      tableData2: [],
    };
  },
  created() {
    this.$bus.$on('dispatch',sid => {
      this.$axios.post('http://localhost:5270/dispatch',{
        sid:sid,
        secs:this.tableData1.map(e=>{
          return {
            id:e.id,
            sid:e.sid
          }
        })
      }).then(r=>{
        if(r.data.data.id != -1 && r.data.data.id != last_id){
          last_id = r.data.data.id
          this.$Notice.open({
            title: '安保调度通知',
            desc: '请立即派遣'+ r.data.data.id +'号安保员至'+sid+'处维护秩序',
            duration:0
          });
        }
      })
    })
    this.$bus.$on('timechange', ({ time, day }) => {
      this.$axios
        .get('http://localhost:5270/worker', {
          params: {
            time: time,
            day: day,
          },
        })
        .then(r => {
          this.tableData1 = r.data.data.sec;
          this.tableData2 = r.data.data.norm;
        });
    });
  },
};
</script>
