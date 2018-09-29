$(function(){
  // 获取数据动态渲染
  var currentPage=1;
  var pageSize=5;
  function render(){
    $.ajax({
      url:"/category/querySecondCategoryPaging",
      type:"get",
      dataType:"json",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(info){
        console.log(info)
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
   //渲染一级的所有分类
   $.ajax({
     url:"/category/queryTopCategoryPaging",
     dataType:"json",
     type:"get",
     data:{
       page:1,
       pageSize:100
     },
     success:function(info){
      $("#dropdown").html(template("tmpSecond",info))
     }

   })//ajax结束
   //表单验证
   $("#addsecond").bootstrapValidator({
    // 设置hidden的表单也验证
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      categoryId:{
        validators:{
          notEmpty:{
            message:"请选择一级分类"
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: "请输入二级分类"
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请选择图片"
          }
        }
      }
    }
   });//非空验证完成
  
  

  })//addbtn 点击事件结束
  //表单验证结束
  $("#addsecond").on("success.form.bv",function(e){
    e.preventDefault();
    //  数据发给后台,从新渲染页面,表单重置
   $.ajax({
     url:"/category/addSecondCategory",
     dataType:"json",
     data:$("#addsecond").serialize(),
     type:"post",
     success:function(info){
       if(info.success){
         $("#addCate").modal("hide");
         currentPage=1;
         render();
         $("#addsecond").data("bootstrapValidator").resetForm(true);
         $(".Txt").text("请选择一级分类");
         $("#imgBox img").attr("src","images/none.png")
       }
     }
   })//ajax
  })//验证完成的函数
// 表单提交
  $("#dropdown").on("click","li",function(){
    //记录一级分类的id
   var Txt=$(this).text();
   $(".Txt").text(Txt);
   var id=$(this).data("id");
  $('[name="categoryId"]').val(id);
  $("#addsecond").data("bootstrapValidator").updateStatus("categoryId", "VALID");
  // 图片上传,需要插件
  // 2,准备dom结构
  // 3js代码

  })
  $("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      console.log(data.result);
      var imgSrc=data.result.picAddr;
      $("#imgBox img").attr("src",imgSrc);
      $('[name="brandLogo"]').val(imgSrc);
      // 重置表单状态
      $("#addsecond").data("bootstrapValidator").updateStatus("brandLogo", "VALID");
  
    }
   });
})

