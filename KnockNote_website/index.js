var userid = getQueryString("userid");
if(userid==null){userid="12345";}
var category = getQueryString("category");
if(category==null){category="null";}
console.log(userid+" "+category)
var apigClient = apigClientFactory.newClient();
var categorys = []
var notesdata = []

function noteEdit(id,category,written){
    document.getElementById('edit-modal').style.visibility = "visible";
    document.getElementById('edit-modal').style.opacity = 1;
    console.log(categorys)
    var categorylist = "<option>  </option>"
    for(var i in categorys){
      categorylist = categorylist + "<option>" + categorys[i] + "</option>"
    }
    categorylist=$(categorylist);
    $("#categorylist").html(categorylist);
    console.log(id)
    console.log(category)
    console.log(written)
    if(category == 'null'){
      $('#categorylist')[0].value = "  "
    }
    else{
      $('#categorylist')[0].value = category
    }
    $('#written')[0].value = written
    $('#noteid')[0].value = id
}

function edit_note(){
  var category = $('#categorylist')[0].value
  var written = $('#written')[0].value
  var noteid = $('#noteid')[0].value
  console.log(category)
  console.log(written)
  console.log(noteid)
  apigClient.notePost(
      {},
      {noteid:noteid,writecontent:written,category:category},
      {})
  .then(function(result){
    // Add success callback code here.
    alert(result.data.body.content)
    console.log(result)
    if(result.data.body.success){
      window.location.reload();
    }
  }).catch( function(result){
      // Add error callback code here.
      console.log(result)
  });
}

function noteDelete(id){
  apigClient.noteDelete(
      {},
      {noteid:id},
      {})
  .then(function(result){
    // Add success callback code here.
    alert(result.data.body.content)
    console.log(result)
    if(result.data.body.success){
      window.location.reload();
    }
  }).catch( function(result){
      // Add error callback code here.
      console.log(result)
  });
}

function changeCategory(name){
    console.log(name)
    var url=decodeURI(decodeURI(window.location.search));
    var temp1=changeURLPar(url,'category',name);
    window.location = temp1;
}

function addCategory(){
    var categoryname = prompt("New category name:","")
    if(categoryname!= null){
        if(categoryname == ''){
            alert('name cannot be empty!')
        }
        else{
            apigClient.categoryPut(
                {},
                {userid:userid,name:categoryname},
                {})
            .then(function(result){
              // Add success callback code here.
              alert(result.data.body.content)
              console.log(result)
              if(result.data.body.success){
                window.location.reload();
              }
            }).catch( function(result){
                // Add error callback code here.
                console.log(result)
            });
        }
    }
}

jQuery(function(){

    apigClient.categoryGet(
        {userid:userid},
        {},
        {})
    .then(function(result){
      // Add success callback code here.
      var data = result.data.body
      console.log(data)
      categorys = data
      categorys_str="<h1 class=\"h2\">Category:<a onclick=\"changeCategory('null')\">All</a>"
      for(var i in data){
        var catename = data[i]
        categorys_str = categorys_str + "<a onclick=\"changeCategory('" + catename + "')\"> "+ catename+" </a>"
      }
      categorys_str = categorys_str + "<a onclick=\"addCategory()\">+</a></h1>"
      var categorys_str = $(categorys_str);
      $("#categorys").html(categorys_str); 
    }).catch( function(result){
      console.log(result)
    });

    apigClient.notelistGet(
        {userid:userid,category:category},
        {},
        {})
    .then(function(result){
      // Add success callback code here.
      notesdata = result.data.body
      console.log(notesdata)
      var count = notesdata.length
      var show = 3;

      $.each(eval(notesdata), function (index, item) {
        if(index<0){
          return true;//同countinue，返回false同break
        }
        if(index<show){
          if(item.writecontent == null){
            item.writecontent = ""
          }
          if(item.imageurl != null && item.imageurl != "null"){
            var note=$("<article class=\"masonry__brick entry format-standard\"><div class=\"entry__thumb\">"
                      +"<a href=\"" + item.pageurl + "\" class=\"entry__thumb-link\"><img src=\" " + item.imageurl + " \"></a></div>"
                      +"<div class=\"entry__text\"><div class=\"entry__excerpt\"><p> "+ item.writecontent +" </p></div><div class=\"entry__meta\">"
                      +"<span class=\"entry__meta-cat\"><a href=\"javascript:void(0);\" onclick=\"noteEdit('"+item.noteid +"','"+item.category +"','"+item.writecontent +"')\">Edit</a>"
                      +"<a href=\"javascript:void(0);\" onclick=\"noteDelete('"+item.noteid +"')\">Delete</a></span><span class=\"entry__meta-date\" style=\"float: right\">"
                      +"<a href=\"javascript:void(0);\">" + item.modifytime + "</a></span></div></div></article>");
            $("#notelist").append(note);
          }
          else{
            var note=$("<article class=\"masonry__brick entry format-quote\"><div class=\"entry__thumb\"><blockquote><p> "+ item.selectedcontent +" </p></blockquote>"
                      +"<div class=\"entry__text\"><div class=\"entry__excerpt\"><p> "+ item.writecontent +" </p></div><div class=\"entry__meta\">"
                      +"<span class=\"entry__meta-cat\"><a href=\"javascript:void(0);\" onclick=\"noteEdit('"+item.noteid +"','"+item.category +"','"+item.writecontent +"')\">Edit</a>"
                      +"<a href=\"javascript:void(0);\" onclick=\"noteDelete('"+item.noteid +"')\">Delete</a></span><span class=\"entry__meta-date\" style=\"float: right\">"
                      +"<a href=\"javascript:void(0);\">" + item.modifytime + "</a></span></div></div></article>");
            $("#notelist").append(note);
          }
        }
      });


      $('#p').pagination({
        totalData:count, 
        showData:show,
        coping:true,
        jump:false,
        callback:function(i){
          console.log(i)
            var page=i-1;
            var notelist="";
            for(var j=page*show;j<i*show && j<count;j++){
                var item = notesdata[j];
                console.log(item)
                if(item.writecontent == null){
                  item.writecontent = ""
                }
                if(item.imageurl != null && item.imageurl != "null"){
                  notelist= notelist+ "<article class=\"masonry__brick entry format-standard\"><div class=\"entry__thumb\">"
                                    +"<a href=\"" + item.pageurl + "\" class=\"entry__thumb-link\"><img src=\" " + item.imageurl + " \"></a></div>"
                                    +"<div class=\"entry__text\"><div class=\"entry__excerpt\"><p> "+ item.writecontent +" </p></div><div class=\"entry__meta\">"
                                    +"<span class=\"entry__meta-cat\"><a href=\"javascript:void(0);\" onclick=\"noteEdit('"+item.noteid +"','"+item.category +"','"+item.writecontent +"')\">Edit</a>"
                                    +"<a href=\"javascript:void(0);\" onclick=\"noteDelete('"+item.noteid +"')\">Delete</a></span><span class=\"entry__meta-date\" style=\"float: right\">"
                                    +"<a href=\"javascript:void(0);\">" + item.modifytime + "</a></span></div></div></article>"

                }
                else{
                  notelist= notelist+ "<article class=\"masonry__brick entry format-quote\"><div class=\"entry__thumb\"><blockquote><p> "+ item.selectedcontent +" </p></blockquote>"
                                    +"<div class=\"entry__text\"><div class=\"entry__header\"><p> "+ item.writecontent +" </p></div><div class=\"entry__meta\">"
                                    +"<span class=\"entry__meta-cat\"><a href=\"javascript:void(0);\" onclick=\"noteEdit('"+item.noteid +"','"+item.category +"','"+item.writecontent +"')\">Edit</a>"
                                    +"<a href=\"javascript:void(0);\" onclick=\"noteDelete('"+item.noteid +"')\">Delete</a></span><span class=\"entry__meta-date\" style=\"float: right\">"
                                    +"<a href=\"javascript:void(0);\">" + item.modifytime + "</a></span></div></div></article>"
                }
                
            }
            notelist=$(notelist);
            $("#notelist").html(notelist); 
          }
      });
    }).catch( function(result){
      console.log(result)
    });
});
