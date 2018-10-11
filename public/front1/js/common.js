  //初始化区域滚动
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    indicators:false //是否显示滚动条
  });
  
    function getkey ( k ) {
      var obj = {};
      var arr = decodeURI ( window.location["search"]).slice( 1 ).split("&");
      arr.forEach (function ( v , i ) {
       var key = v.split("=")[ 0 ];
       var value = v.split("=")[ 1 ];
      obj[ key ] = value;     
   })//forEach 结束
    return obj [ k ]; 
  }//函数结束
 