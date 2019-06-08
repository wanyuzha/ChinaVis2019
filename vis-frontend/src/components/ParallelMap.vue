<template>
  <div
    id="parallelMap"
    style="width: 1400px;height:700px;margin-left:35px"
  ></div>
</template>
<script>
import echarts from 'echarts';
const schema = [
  {
    name: 'class',
    index: 0,
    text: 'class',
  },
  {
    name: '7am',
    index: 1,
    text: '7am',
  },
  {
    name: '8am',
    index: 2,
    text: '8am',
  },
  {
    name: '9am',
    index: 3,
    text: '9am',
  },
  {
    name: '10am',
    index: 4,
    text: '10am',
  },
  {
    name: '11am',
    index: 5,
    text: ' 11am',
  },
  {
    name: '12am',
    index: 6,
    text: '12am',
  },
  {
    name: '1pm',
    index: 7,
    text: '1pm',
  },
  {
    name: '2pm',
    index: 8,
    text: '2pm',
  },
  {
    name: '3pm',
    index: 9,
    text: '3pm',
  },
  {
    name: '4pm',
    index: 10,
    text: '4pm',
  },
  {
    name: '5pm',
    index: 11,
    text: '5pm',
  },
  {
    name: '6pm',
    index: 12,
    text: '6pm',
  },
];

const lineStyle = {
  normal: {
    width: 1,
    opacity: 0.5,
  },
};
const parallelAxis = [
  {
    dim: 0,
    name: schema[0].text,
    type: 'category',
    data: ['普通人', '工作人员', '记者', '大佬'],
  },
  {
    dim: 1,
    name: schema[1].text,
    type: 'category',
    data: [
      'out',
      'sign',
      'road',
      'exhibition',
      'mainVenue',
      'restroom',
      'canteen',
      'venueA',
      'venueB',
      'venueC',
      'venueD',
    ],
  },
  {
    dim: 2,
    name: schema[2].text,
    type: 'category',
    data: [
      'out',
      'sign',
      'road',
      'exhibition',
      'mainVenue',
      'restroom',
      'canteen',
      'venueA',
      'venueB',
      'venueC',
      'venueD',
    ],
  },
  {
    dim: 3,
    name: schema[3].text,
    type: 'category',
    data: [
      'out',
      'sign',
      'road',
      'exhibition',
      'mainVenue',
      'restroom',
      'canteen',
      'venueA',
      'venueB',
      'venueC',
      'venueD',
    ],
  },
  {
    dim: 4,
    name: schema[4].text,
    type: 'category',
    data: [
      'out',
      'sign',
      'road',
      'exhibition',
      'mainVenue',
      'restroom',
      'canteen',
      'venueA',
      'venueB',
      'venueC',
      'venueD',
    ],
  },
  {
    dim: 5,
    name: schema[5].text,
    type: 'category',
    data: [
      'out',
      'sign',
      'road',
      'exhibition',
      'mainVenue',
      'restroom',
      'canteen',
      'venueA',
      'venueB',
      'venueC',
      'venueD',
    ],
  },
  {
    dim: 6,
    name: schema[6].text,
    type: 'category',
    data: [
      'out',
      'sign',
      'road',
      'exhibition',
      'mainVenue',
      'restroom',
      'canteen',
      'venueA',
      'venueB',
      'venueC',
      'venueD',
    ],
  },
  {
    dim: 7,
    name: schema[7].text,
    type: 'category',
    data: [
      'out',
      'sign',
      'road',
      'exhibition',
      'mainVenue',
      'restroom',
      'canteen',
      'venueA',
      'venueB',
      'venueC',
      'venueD',
    ],
  },
  {
    dim: 8,
    name: schema[8].text,
    type: 'category',
    data: [
      'out',
      'sign',
      'road',
      'exhibition',
      'mainVenue',
      'restroom',
      'canteen',
      'venueA',
      'venueB',
      'venueC',
      'venueD',
    ],
  },
  {
    dim: 9,
    name: schema[9].text,
    type: 'category',
    data: [
      'out',
      'sign',
      'road',
      'exhibition',
      'mainVenue',
      'restroom',
      'canteen',
      'venueA',
      'venueB',
      'venueC',
      'venueD',
    ],
  },
  {
    dim: 10,
    name: schema[10].text,
    type: 'category',
    data: [
      'out',
      'sign',
      'road',
      'exhibition',
      'mainVenue',
      'restroom',
      'canteen',
      'venueA',
      'venueB',
      'venueC',
      'venueD',
    ],
  },
  {
    dim: 11,
    name: schema[11].text,
    type: 'category',
    data: [
      'out',
      'sign',
      'road',
      'exhibition',
      'mainVenue',
      'restroom',
      'canteen',
      'venueA',
      'venueB',
      'venueC',
      'venueD',
    ],
  },
  {
    dim: 12,
    name: schema[12].text,
    type: 'category',
    data: [
      'out',
      'sign',
      'road',
      'exhibition',
      'mainVenue',
      'restroom',
      'canteen',
      'venueA',
      'venueB',
      'venueC',
      'venueD',
    ],
  },
];

const parallel = {
  left: '5%',
  right: '18%',
  bottom: 100,
  parallelAxisDefault: {
    type: 'value',
    nameLocation: 'end',
    nameGap: 20,
    nameTextStyle: {
      color: '#fff',
      fontSize: 12,
    },
    axisLine: {
      lineStyle: {
        color: '#aaa',
      },
    },
    axisTick: {
      lineStyle: {
        color: '#777',
      },
    },
    splitLine: {
      show: false,
    },
    axisLabel: {
      textStyle: {
        color: '#fff',
      },
    },
  },
};
export default {
  name: 'parallelMap',
  mounted() {
    const myChart = echarts.init(
      document.getElementById('parallelMap'),
      'dark'
    );
    this.$axios.get('http://localhost:5270/parallel?day=1').then(({ data }) => {
      var dataPTR = [];
      var dataWorker = [];
      var datajournalist = [];
      var dataMaster = [];
      data.data.forEach(item => {
        if (item[0] == '0') {
          item[0] = '普通人';
          dataPTR.push(item);
        } else if (item[0] == '1') {
          item[0] = '工作人员';
          dataWorker.push(item);
        } else if (item[0] == '2') {
          item[0] = '记者';
          datajournalist.push(item);
        } else if (item[0] == '3') {
          item[0] = '大佬';
          dataMaster.push(item);
        }
      });
      const option = {
        backgroundColor: '#333',
        legend: {
          bottom: 30,
          data: ['普通人', '工作人员', '记者', '商业大咖'],
          itemGap: 20,
          textStyle: {
            color: '#fff',
            fontSize: 14,
          },
        },
        tooltip: {
          padding: 10,
          backgroundColor: '#222',
          borderColor: '#777',
          borderWidth: 1,
          formatter: function(obj) {
            var value = obj[0].value;
            return (
              '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">' +
              obj[0].seriesName +
              ' ' +
              value[0] +
              '日期：' +
              value[7] +
              '</div>' +
              schema[1].text +
              '：' +
              value[1] +
              '<br>' +
              schema[2].text +
              '：' +
              value[2] +
              '<br>' +
              schema[3].text +
              '：' +
              value[3] +
              '<br>' +
              schema[4].text +
              '：' +
              value[4] +
              '<br>' +
              schema[5].text +
              '：' +
              value[5] +
              '<br>' +
              schema[6].text +
              '：' +
              value[6] +
              '<br>'
            );
          },
        },
        parallelAxis: parallelAxis,
        parallel: parallel,
        series: [
          {
            name: '普通人',
            type: 'parallel',
            lineStyle: lineStyle,
            smooth: true,
            data: dataPTR,
          },
          {
            name: '工作人员',
            type: 'parallel',
            lineStyle: lineStyle,
            smooth: true,
            data: dataWorker,
          },
          {
            name: '记者',
            type: 'parallel',
            lineStyle: lineStyle,
            smooth: true,
            data: datajournalist,
          },
          {
            name: '商业大咖',
            type: 'parallel',
            lineStyle: lineStyle,
            smooth: true,
            data: dataMaster,
          },
        ],
      };
      myChart.setOption(option, true);
    });
    this.$bus.$on('daychange', day => {
      console.log('parallel:' + day);
      this.$axios
        .get('http://localhost:5270/parallel?day=' + day)
        .then(({ data }) => {
          console.log(data);
          var dataPTR = [];
          var dataWorker = [];
          var datajournalist = [];
          var dataMaster = [];
          data.data.forEach(item => {
            if (item[0] == '0') {
              item[0] = '普通人';
              dataPTR.push(item);
            } else if (item[0] == '1') {
              item[0] = '工作人员';
              dataWorker.push(item);
            } else if (item[0] == '2') {
              item[0] = '记者';
              datajournalist.push(item);
            } else if (item[0] == '3') {
              item[0] = '大佬';
              dataMaster.push(item);
            }
          });
          const option = {
            backgroundColor: '#333',
            legend: {
              bottom: 30,
              data: ['普通人', '工作人员', '记者', '商业大咖'],
              itemGap: 20,
              textStyle: {
                color: '#fff',
                fontSize: 14,
              },
            },
            tooltip: {
              padding: 10,
              backgroundColor: '#222',
              borderColor: '#777',
              borderWidth: 1,
              formatter: function(obj) {
                var value = obj[0].value;
                return (
                  '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">' +
                  obj[0].seriesName +
                  ' ' +
                  value[0] +
                  '日期：' +
                  value[7] +
                  '</div>' +
                  schema[1].text +
                  '：' +
                  value[1] +
                  '<br>' +
                  schema[2].text +
                  '：' +
                  value[2] +
                  '<br>' +
                  schema[3].text +
                  '：' +
                  value[3] +
                  '<br>' +
                  schema[4].text +
                  '：' +
                  value[4] +
                  '<br>' +
                  schema[5].text +
                  '：' +
                  value[5] +
                  '<br>' +
                  schema[6].text +
                  '：' +
                  value[6] +
                  '<br>'
                );
              },
            },
            parallelAxis: parallelAxis,
            parallel: parallel,
            series: [
              {
                name: '普通人',
                type: 'parallel',
                lineStyle: lineStyle,
                smooth: true,
                data: dataPTR,
              },
              {
                name: '工作人员',
                type: 'parallel',
                lineStyle: lineStyle,
                smooth: true,
                data: dataWorker,
              },
              {
                name: '记者',
                type: 'parallel',
                lineStyle: lineStyle,
                smooth: true,
                data: datajournalist,
              },
              {
                name: '商业大咖',
                type: 'parallel',
                lineStyle: lineStyle,
                smooth: true,
                data: dataMaster,
              },
            ],
          };
          myChart.setOption(option, true);
        });
    });
  },
};
</script>
