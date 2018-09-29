// 页面渲染和分页
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
      
      })
      $("tbody").html(template("tmp",info))
      
      }
    })
  }

 render()

})
// 禁用按钮功能实现

 render();
// 禁用按钮功能实现
 var currentId,isDelete;
 $("tbody").on("click",".btn",function(){
   // 弹出模态框--ajax请求---关闭模态框--重新渲染
   $("#btnModal").modal("show");
   currentId=$(this).parents("tr").data("id");
   //  isd=$(this).parents("tr").data("isdelete");
    
   //  isd=$(this).parents("tr").attr("data-isDelete");
   // 有btn-danger 说明时执行禁用状态,需要发送0,给后台
   isDelete=$(this).hasClass("btn-danger")?0:1;
   console.log(isDelete)
 })
 $(".confirm").click(function(){
   // console.log(1)
   $.ajax({
     url:"/user/updateUser",
     data:{
       isDelete:isDelete,
       id:currentId
     },
     dataType:"json",
     type:"post",
     success:function(info ){
       // console.log(info)
       if(info.success){
         console.log(1)
         $("#btnModal").modal("hide");
         render();
       }
     }
   })
 })




