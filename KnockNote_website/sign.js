var apigClient = apigClientFactory.newClient();
var root = window.location.host
$('.form').find('input, textarea').on('keyup blur focus', function (e) {
  var $this = $(this),
      label = $this.prev('label');

	  if (e.type === 'keyup') {
			if ($this.val() === '') {
          label.removeClass('active highlight');
        } else {
          label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
    	if( $this.val() === '' ) {
    		label.removeClass('active highlight'); 
			} else {
		    label.removeClass('highlight');   
			}   
    } else if (e.type === 'focus') {
      
      if( $this.val() === '' ) {
    		label.removeClass('highlight'); 
			} 
      else if( $this.val() !== '' ) {
		    label.addClass('highlight');
			}
    }

});

$('.tab a').on('click', function (e) {
  
  e.preventDefault();
  
  $(this).parent().addClass('active');
  $(this).parent().siblings().removeClass('active');
  
  target = $(this).attr('href');

  $('.tab-content > div').not(target).hide();
  
  $(target).fadeIn(600);
  
});

function getVerify(){
  var value = $('#email_reg')[0].value
  console.log(value)
  var reg = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/g
  var useremail = reg.exec(value)[0]
  console.log(useremail)
  if(value == null){
    alert("email cannot be empty!")
  }
  else if(useremail == null){
    alert("email format is wrong")
  }
  else{
    apigClient.userVerifyPost(
        {},
        {email:useremail},
        {})
    .then(function(result){
      // Add success callback code here.
      console.log(result)
      alert(result.data.body.content)
    }).catch( function(result){
        // Add error callback code here.
        console.log(result)
    });
  }
}

function register(){
  var useremail = $('#email_reg')[0].value
  var username = $('#username')[0].value
  var password = $('#password_reg')[0].value
  var verifycode = $('#verifycode')[0].value

  apigClient.userRegisterPost(
        {},
        {email:useremail,username:username,password:password,verification:verifycode},
        {})
    .then(function(result){
      // Add success callback code here.
      console.log(result)
      alert(result.data.body.content)
      if(result.data.body.success){
        var userid = result.data.body.userid
        chrome.runtime.sendMessage("dcdiigajakindiflmbjjalhdiljnpkjp",
        {"message": "start","userid": userid},
        function(response) {
          console.log(response)
        });

        chrome.runtime.sendMessage("jdekchhlncgljobnmjhkambajgolmanp",
        {"message": "start","userid": userid},
        function(response) {
          console.log(response)
        });
        
        chrome.runtime.sendMessage("johpmhpoklochllhamgedifcjidgfcdn",
        {"message": "start","userid": userid},
        function(response) {
          console.log(response)
        });
        console.log("message send")
        window.location = '/index.html?userid='+userid
      }
    }).catch( function(result){
        // Add error callback code here.
        console.log(result)
    });
}

function Sign(){
  var useremail = $('#email_sign')[0].value
  var password = $('#password_sign')[0].value

  apigClient.userLoginPost(
        {},
        {email:useremail,password:password},
        {})
    .then(function(result){
      // Add success callback code here.
      console.log(result)
      alert(result.data.body.content)
      if(result.data.body.success){
        var userid = result.data.body.userid
        chrome.runtime.sendMessage("dcdiigajakindiflmbjjalhdiljnpkjp",
        {"message": "start","userid": userid},
        function(response) {
          console.log(response)
        });

        chrome.runtime.sendMessage("jdekchhlncgljobnmjhkambajgolmanp",
        {"message": "start","userid": userid},
        function(response) {
          console.log(response)
        });

        chrome.runtime.sendMessage("johpmhpoklochllhamgedifcjidgfcdn",
        {"message": "start","userid": userid},
        function(response) {
          console.log(response)
        });
        console.log("message send")
        window.location = '/index.html?userid='+userid
      }
    }).catch( function(result){
        // Add error callback code here.
        console.log(result)
    });
}