$(function(){
  // 获取数据动态渲染
  var currentPage=1;
  var pageSize=5;
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
        
          render()
        }
      })//分页结束
     
      }//success
    }) //ajax结束
  }//函数完成
  render();
  //添加功能
  $(".addbtn").click(function(){
   $("#addCate").modal("show");
   //表单验证
   $("#addfirst").bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      categoryName:{
        validators:{
          notEmpty:{
            message:"请输入一级分类名称"
          }
        }
      }
    }
   });//非空验证完成
  
  

  })//addbtn 点击事件结束
  $("#addfirst").on("success.form.bv",function(e){
    e.preventDefault();
    //  数据发给后台,从新渲染页面,表单重置
   $.ajax({
     url:"/category/addTopCategory",
     dataType:"json",
     data:$("#addfirst").serialize(),
     type:"post",
     success:function(info){
       if(info.success){
         $("#addCate").modal("hide");
         currentPage=1;
         render();
         $("#addfirst").data("bootstrapValidator").resetForm(true)
       }
     }
   })//ajax
  })//验证完成的函数
})
