<template>
    <div id="rose" style="width: 600px;height:400px;"></div>
</template>
<script>
import echarts from 'echarts'
export default {
    name:'rose',
    mounted() {
        var myChart = echarts.init(document.getElementById("rose"));
        var option = {
            title: {
                text: '人员种类分布玫瑰图',
                subtext: '功能区：',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                x: 'center',
                y: 'bottom',
                data: ['rose1', 'rose2', 'rose3', 'rose4']
            },
            toolbox: {
                show: true,
                feature: {
                    mark: {
                        show: true
                    },
                    dataView: {
                        show: true,
                        readOnly: false
                    },
                    magicType: {
                        show: true,
                        type: ['pie', 'funnel']
                    }
                }
            },
            calculable: true,
            series: [
                {
                    name: '面积模式',
                    type: 'pie',
                    radius: [30, 110],
                    roseType: 'raidus',
                    data: [{
                            value: 10,
                            name: 'rose1'
                        },
                        {
                            value: 5,
                            name: 'rose2'
                        },
                        {
                            value: 15,
                            name: 'rose3'
                        },
                        {
                            value: 25,
                            name: 'rose4'
                        }
                    ]
                }
            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option, true);
    }
};
</script>