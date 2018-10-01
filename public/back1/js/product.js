$(function(){
  // 渲染页面
  var currentPage=1;
  var pageSize=2;
  render();
  function render(){
    $.ajax({
      url:"/product/queryProductDetailList",
      type:"get",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:"json",
      success:function(info){
        // console.log(info);
        // 数据渲染
        $("tbody").html(template("tmp",info));
        // 分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          totalPages:Math.ceil(info.total/info.size),
          currentPage:info.page,
          onPageClicked:function(a,b,c,page){
            currentPage=page;
            render()
          }
        })
      }
    })
  }
  $(".addbtn").click(function(){
    console.log(1)
    $("#addCate").modal("show")
    $.ajax({
      url:"/category/querySecondCategoryPaging",
      type:"get",
      data:{
        page:1,
        pageSize:100
      },
      dataType:"json",
      success:function(info){
        console.log(info)
     $("#dropdown").html(template("tmpsecond",info))
      }
    })
  })
  // 二级分类选项和hidden的input同步
  $("#dropdown").on("click","li",function(){
   console.log($(this).text())
   var txt=$(this).text();
   $('[name="brandId"]').val(txt);
   $(".Txt").text( txt );
   $("#form").data("bootstrapValidator").updateStatus("brandId","VALID")
  })
  //图片提交初始化
  var picArr=[];
$("#fileupload").fileupload({
  dataType:"json",
  done:function(e ,data){
    // console.log(data.result)
    
    picArr.unshift(data.result);
 
    // html会覆盖,要用prevappend
    // $("#imgBox").html('<img src="'+data.result.picAddr
    // +'" alt="" width="100" height="100">')
    $("#imgBox").prepend('<img src="'+picArr[0].picAddr
    +'" alt="" width="100" height="100">')

  
  if(picArr.length>3){
    picArr.pop();
  $("#imgBox img:last-of-type").remove(); 
  }
  if(picArr.length==3){
    $("#form").data("bootstrapValidator").updateStatus("picStatus","VALID")
  }
 
  
  }
})



  //表单验证
  $("#form").bootstrapValidator({
    excluded: [],
    // 指定校验时显示的图标, 固定写法
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',      // 校验成功
      invalid: 'glyphicon glyphicon-remove',   // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },
    // proName  oldPrice  price proDesc size statu num brandId
    fields:{
      proName:{
        validators:{
          notEmpty:{
            message:"请输入商品名称"
          }
        }
      },
      oldPrice:{
        validators:{
          notEmpty:{
            message:"请输入商品原价格"
          },
         
          regexp:{
            regexp:/^\d*$/,
            message:"'商品库存必须是的数字'"
          }
        }
      },
      price:{
        validators:{
          notEmpty:{
            message:"请输入商品现价"
          },
          regexp:{
            regexp:/^\d*$/,
            message:"'商品库存必须是的数字'"
          }
        }
      },
      proDesc:{  
        
              validators:{
                notEmpty:{
                  message:"请输入商品描述"
                }
              }
            },
      size:{
        validators:{
          notEmpty:{
            message:"请输入商品尺寸"
          },
          regexp:{
            regexp:/^\d{2}-\d{2}$/,
            message:"'商品库存必须xx-xx的形式'"
          }
        }
      },   
        
      num:{
        validators:{
          notEmpty:{
            message:"请输入商品库存"
          },
          regexp:{
            regexp:/^[1-9]\d*$/,
            message:"'商品库存必须是非零开头的数字'"
          }
        }
      },
      brandId:{
        validators:{
          notEmpty:{
            message:"请选择商品二级分类"
          }
        }
      },
      picStatus:{
        validators:{
          noEmpty:{
            message:"请上传3张图片"
          }
        }       
      }
    }
 
  })//表单验证结束
  //注册表单验证成功事件,组织默认提交,通过ajax提交
  $("#form").on("success.form.bv",function( e ){
    e.preventDefault();
    var picUrl=$("#form").serialize()
  // 
   picUrl+="&picAddr1="+picArr[0].picAddr+"&picName1="+picArr[0].picName+""
   picUrl+="&picAddr2="+picArr[1].picAddr+"&picName2="+picArr[1].picName+""
   picUrl+="&picAddr3="+picArr[2].picAddr+"&picName3="+picArr[2].picName+""
  console.log(picUrl)
    $.ajax({
      type:"post",
      url:"/product/addProduct",
      data:picUrl,
      dataType:"json",
      success:function(info){
      //  console.log(info)
      currentPage=1;
      render();
     $("#addCate").modal("hide");
     $("#form").data("bootstrapValidator").resetForm(true);
     $(".Txt").text("请选择二级分类");
     $('#imgBox img').remove();
       picArr=[];
      },
      error:function(){
        console.log(0)
      }
    })
  })
})//页面渲染完成
// 添加模态框准备


  

