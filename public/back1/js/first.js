$(function(){
  // 获取数据动态渲染
  var currentPage=1;
  var pageSize=2;
  function render(){
    $.ajax({
      url:"/category/queryTopCategoryPaging",
      type:"get",
      dataType:"json",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(info){
       $("tbody").html(template("tmp",info));
       //  分页插件初始化 
       $("#paginator").bootstrapPaginator({
        bootstrapMajorVersion:3,
        currentPage:currentPage,
        totalPages:Math.ceil(info.total/info.size),
        size:"small",
        onPageClicked:function(event, originalEvent, type,page){
          //为按钮绑定点击事件 page:当前点击的按钮值
          
          currentPage=page;
          console.log(currentPage);
          render()
        }
      })//分页结束
     
      }//success
    }) //ajax结束
  }//函数完成
  render();
  
})
