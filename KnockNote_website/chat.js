var $messages = $('.mCustomScrollbar'),
    d, h, m,
    time, //time 用最后一条消息的
    i = 0;
// var url=window.location.search;
var url=window.location.href;
console.log("url")
console.log(url)


var userid = getQueryString("userid");
if(userid==null){userid="1576269883";}
var groupid = getQueryString("groupid");
if(groupid==null){groupid="1576282960";}
var apigClient = apigClientFactory.newClient();
var last_time = "null"

apigClient.groupMessageGet(
    {groupid:groupid,lasttime:last_time},
    {},
    {})
.then(function(result){
  $messages.mCustomScrollbar({alwaysShowScrollbar: 2});
  var message_list = result.data.body
  console.log(message_list)
  if(message_list.length>0){
    last_time = message_list[message_list.length-1].messagetime
    console.log(last_time)
    for(var i in message_list){
      var msg = message_list[i]
      if(msg["userid"] == userid){
        myMessage(msg["message"],msg.username,msg.messageid)
      }
      else{
        ResponseMessage(msg.message,msg.username,msg.messageid)
      }
    }
  }
  setInterval(function(){updateMessage()},1000);
}).catch( function(result){
  console.log(result)
});


function updateMessage(){
  //get message
  apigClient.groupMessageGet(
    {groupid:groupid,lasttime:last_time},
    {},
    {})
  .then(function(result){
    var new_message = result.data.body
    // console.log(new_message)
    if(new_message.length>0){
      last_time = new_message[new_message.length-1].messagetime
      console.log(last_time)
      for(var i in new_message){
        var msg = new_message[i]
          console.log(msg)
          if(msg.userid == userid){
            myMessage(msg.message,msg.messageid)
          }
          else{
            ResponseMessage(msg.message,msg.username,msg.messageid)
          }
       }
     }
  }).catch( function(result){
    console.log(result)
  });
}

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}

$(document).on('click','#message-submit',function() {
	insertMessage();
});

$(window).on('keydown', function(e) {
  if (e.which == 13) {
    insertMessage();
    return false;
  }
})

function insertMessage() {
  msg = $('.message-input').val();
  if ($.trim(msg) == '') {
    return false;
  }
  $('.message-input').val(null);
  apigClient.groupMessagePut(
      {},
      {groupid:groupid,message:msg,userid:userid},
      {})
  .then(function(result){
      console.log(result)
      // alert(result.data.body.content)
      last_time=result.data.body.messagetime-1
      // myMessage(msg,"")
      // updateScrollbar();
    }).catch( function(result){
      console.log(result)
    });
  
}
function myMessage(msg,id){
    $('<div class="message message-personal" id=\" '+id+' \" >' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
    updateScrollbar();
}
function ResponseMessage(msg,name,id) {
  // setTimeout(function() {
    $('<div class="message new" id=\" '+id+' \">' + msg + '<div class="username">' + name + '</div></div>').appendTo($('.mCSB_container')).addClass('new');
    updateScrollbar();
    i++;
  // }, 1000);
}