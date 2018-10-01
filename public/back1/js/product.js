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
})//页面渲染完成
// 添加模态框准备
$(function(){
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
    }
 
  })
  

})