$(function(){
  var currentPage=1;
  var pageSize=5;
  function render(){
    $.ajax({
      type:"get",
      url:"/user/queryUser",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:"json",
      success:function(info){
      console.log(info)
      $("tbody").html(template("tmp",info))
      
      }
    })
  }
 render()
  $("#paginator").bootstrapPaginator({
    bootstrapMajorVersion:3,
    currentPage:1,
    totalPages:10,
    size:"small",
    onPageClicked:function(event, originalEvent, type,page){
      //为按钮绑定点击事件 page:当前点击的按钮值
      
      currentPage=page;
      console.log(currentPage);
      render()
    }
  
  })
})