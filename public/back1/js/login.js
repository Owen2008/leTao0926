$(function(){
  $("#form").bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      username:{
        validators:{
          notEmpty:{
            message:"用户名不能为空"
          },
          stringLength:{
            min:2,
            max:6,
            message:"用户名长度必须2~6位"
          },
          callback:{
            message:"用户名不存在"
          }
        }
    
      },
      password:{
        validators:{
          notEmpty:{
            message:"密码不能为空"
          },
          stringLength:{
            min:6,
            max:10,
            message:"密码长度必须6~10位"
          },
          callback:{
            message:"密码错误"
          }
        }
       
      }
    }
  });
  $('#form').on("success.form.bv", function( e ) {
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
      url:"/employee/employeeLogin",
      dataType:"json",
      data:$("#form").serialize(),
      type:"post",
      success:function(info){
        if(info.success){
          location.href="index.html"
        }
        if(info.error===1000){
          $("#form").data('bootstrapValidator').updateStatus("username", "INVALID", "callback")
        }
        if(info.error===1001){
          $("#form").data('bootstrapValidator').updateStatus("password", "INVALID", "callback")
        }
      }
    })
});
  $('[type="reset"]').click(function(){
    $("#form").data('bootstrapValidator').resetForm();
  })
})

