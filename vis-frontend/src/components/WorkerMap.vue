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
          height="400"
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
export default {
  data() {
    return {
      columns1: [
        {
          title: '安保ID',
          key: 'id',
          width: 170,
        },
        {
          title: '所在地点',
          key: 'sid',
          width: 200,
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
    let that = this;
    this.$bus.$on('timechange', ({ time, day }) => {
      that.tableData1.length = 0;
      that.tableData2.length = 0;
      that.$axios
        .get('http://localhost:5270/worker', {
          params: {
            time: time,
            day: day,
          },
        })
        .then(r => {
          that.tableData1 = r.data.data.sec;
          that.tableData2 = r.data.data.norm;
        });
    });
  },
};
</script>
