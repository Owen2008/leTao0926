$(function(){
  var myChart1 = echarts.init(document.getElementById('canvas-l'));

  // 指定图表的配置项和数据
  var option1 = {
      title: {
          text: '2017注册人数'
      },
      tooltip: {},
      legend: {
          data:['人数']
      },
      xAxis: {
          data: ["1月","2月","3月","4月","6月","7月","8月","9月","10月","11月","12月"]
      },
      yAxis: {},
      series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20,33,44,55,22,11,77]
      }]
  };

  // 使用刚指定的配置项和数据显示图表。
  myChart1.setOption(option1);

// 饼状图
  var myChart2 = echarts.init(document.getElementById('canvas-r'));
  
  // 指定图表的配置项和数据
  var option2 = {
    title : {
        text: '热门品牌销售',
        subtext: '2017年12月',
        x:'center'
    },
    tooltip : {
        trigger: '品牌',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['阿迪','耐克','新百伦','李宁','斐乐']
    },
    series : [
        {
            name: '品牌',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'阿迪'},
                {value:310, name:'耐克'},
                {value:234, name:'新百伦'},
                {value:135, name:'李宁'},
                {value:1548, name:'斐乐'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
// 退出功能




  // 使用刚指定的配置项和数据显示图表。
  myChart2.setOption(option2);

})
