$(function(){
  //input 框写入搜索的值
  var key=getkey("key");
  $(".search-input").val ( key );
  render();
  //根据input 内容发送ajax请求
  //排序注册点击事件
  $(".sortNav").on("click", "li[data-type]", function(){
   if($(this)[0].classList.contains("current")) {
     //有curent类,改变箭头指向
     $(this).find("i").toggleClass("fa-angle-down").toggleClass("fa-angle-up")
   }else{
     $(this).addClass("current").siblings().removeClass("current");
   }
   render();
  })
  $(".search-btn").click(function(){
    // 搜索按钮点击事件
  })



function render () {
  //准备参数
// 排序参数
  var parameter = {};
  var $current = $("li.current");
  parameter.proName = key;
  parameter.page = 1;
  parameter.pageSize = 100;
  if($(".sortNav li").hasClass("current")){
    sortName = $current.data("type");

  var value = $current.find("i").hasClass("fa-angle-down") ? 2 : 1 ;
  parameter[sortName]=value;
}
  $.ajax({
    url:"/product/queryProduct",
    type:"get",
    data:parameter,
    dataType:"json",
    success:function (info) {
      console.log(info)
    var htmlStr= template( "product-tpl",info);
    $(".product").html( htmlStr )
    }
    })
} 


})