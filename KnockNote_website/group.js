var userid = getQueryString("userid");
if(userid==null){userid="12345";}
var apigClient = apigClientFactory.newClient();

function create_group(){
	var name = document.getElementById("groupname").value
	var descrip = document.getElementById("description").value
	console.log(name)
	console.log(descrip)
    apigClient.groupPut(
		{},
		{groupname:name,description:descrip,userid:userid},
		{})
	.then(function(result){
      // Add success callback code here.
      console.log(result)
      alert(result.data.body.content)
      if(result.data.body.success){
      	window.location.reload()
      }
    }).catch( function(result){
      // Add error callback code here.
      console.log(result)
    });
}

function join_group(){
	console.log("in join")
	var groupid = document.getElementById("groupid").value
	console.log(groupid)
    apigClient.groupPost(
		{},
		{groupid:groupid,userid:userid},
		{})
	.then(function(result){
      // Add success callback code here.
      console.log(result)
      alert(result.data.body.content)
      if(result.data.body.success){
      	window.location.reload()
      }
    }).catch( function(result){
      // Add error callback code here.
      console.log(result)
    });
}

function delete_group(){
	console.log("in delete")
	var groupid = document.getElementById("groupid_delete").value
	console.log(groupid)
    apigClient.groupDelete(
		{},
		{groupid:groupid,userid:userid},
		{})
	.then(function(result){
      // Add success callback code here.
      console.log(result)
      alert(result.data.body.content)
      if(result.data.body.success){
      	window.location.reload()
      }
    }).catch( function(result){
      // Add error callback code here.
      console.log(result)
    });
}


apigClient.groupGet(
        {userid:userid},
        {},
        {})
    .then(function(result){
      // Add success callback code here.
      var data = result.data.body
      console.log(data)
      grouoplist_str = ""
      for(var i in data){
      	var url = "group-chat.html?userid="+userid+"&groupid="+data[i].groupid
        grouoplist_str = grouoplist_str + "<li class=\"related__item\"><a href=\" " + url
        			  + " \" class=\"related__link\">"
                      +"<h5 class=\"related__title\">" + data[i].groupname+"("+ data[i].groupid+")" + "</h5>"
                      +"<h5 class=\"related__describe\">"+ data[i].description +" </h5></a></li>"
      }
      var grouoplist_str = $(grouoplist_str);
      $("#grouoplist").html(grouoplist_str); 
    }).catch( function(result){
      console.log(result)
    });
