$(function(){
 
  // var arr=["阿迪","耐克","新百伦","斐乐"];
  // var str=JSON.stringify(arr)
  // localStorage.setItem("search_list",str)
//  存

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
  Store();
  render();
  location.href="../searchlist.html";
})
//清空记录
$("#history").on("click",".clear-btn",function(){
  alert(1)
  localStorage.removeItem("search_list");
  render();
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