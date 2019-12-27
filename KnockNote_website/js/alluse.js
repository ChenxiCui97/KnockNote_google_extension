function shwoModal(id){
	console.log("in show")
	document.getElementById(id).style.visibility = "visible";
	document.getElementById(id).style.opacity = 1;
}

function model_close(id){
	console.log("in close")
	document.getElementById(id).style.visibility = "hidden";
}

function getQueryString(name) {  
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
    var url=decodeURI(decodeURI(window.location.search));  
    var r = url.substr(1).match(reg);  
    if (r != null) return unescape(r[2]); 
    return null;  
}
function Logout(){
    console.log("log out")
  	chrome.runtime.sendMessage("dcdiigajakindiflmbjjalhdiljnpkjp",
      {"message": "end"},
      function(response) {
        console.log(response)
      });
    chrome.runtime.sendMessage("jdekchhlncgljobnmjhkambajgolmanp",
      {"message": "end"},
      function(response) {
        console.log(response)
      });
    chrome.runtime.sendMessage("johpmhpoklochllhamgedifcjidgfcdn",
      {"message": "end"},
      function(response) {
        console.log(response)
      });
    console.log("message send")
  var root = window.location.host
  window.location = '/sign.html'
}


function GotoGroup(){
  var root = window.location.host
  var userid = getQueryString("userid");
  if(userid==null){userid="12345";}
  window.location = '/group.html?userid='+userid
}
function GotoIndex(){
  var root = window.location.host
  var userid = getQueryString("userid");
  if(userid==null){userid="12345";}
  window.location = '/index.html?userid='+userid
}