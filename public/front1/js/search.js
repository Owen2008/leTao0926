$(function(){
 
  // var arr=["阿迪","耐克","新百伦","斐乐"];
  // var str=JSON.stringify(arr)
  // localStorage.setItem("search_list",str)
//  存
render();
function Store(){
  
  var key= $(".search input").val();
  if(key!=""){
    var arr=getHistory()||[];
    //长度不大于10
    if(arr.length>=10){
      arr.pop()
    }
    if(arr.indexOf(key)>=0){
      var index=arr.indexOf(key);
      arr.splice(index,1);
    }
  arr.unshift(key);
  localStorage.setItem("search_list",JSON.stringify(arr));
  }else{
    mui.toast("请输入搜索关键字")
  }
  
}

// 读
function getHistory(){
return JSON.parse(localStorage.getItem("search_list")) 
}

// 渲染
function render(){
  var arr=getHistory()||[];
  

  var strHtml=template("history_tpl",{"arr":arr});
  $("#history").html(strHtml);
  $(".search input").val("");
}


// 添加
$(".search-btn").click(function(){

  var key= $(".search input").val();
  console.log(key)
  if(key!=""){
    location.href="http://localhost:3000/front1/searchlist.html?key="+key;
  }
  
  Store();
  render();
})
//清空记录
$("#history").on("click",".clear-btn",function(){
 //弹出层
 mui.confirm("您确认要清空历史纪录吗","温馨提示",["取消","确认"],function(e){
  if(e.index==1){
    localStorage.removeItem("search_list");
    render();
  }
 })
  
 
})
//个别删除
$("#history").on("click",".icon_delete",function(){
  var index=$(this).parent("li").attr("data-index");
  console.log(index)
  var arr=getHistory();
  
  arr.splice(index,1);
  //数组改变,重新写入
  localStorage.setItem("search_list",JSON.stringify(arr));
//渲染
  render();
})

//不重复

})