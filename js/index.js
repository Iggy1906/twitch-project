$(document).ready(function() {
  
  //Free Code Camp Stream Info. And Status API call
    $.ajax({
  type: "GET",
  url: "https://api.twitch.tv/helix/users?login=freecodecamp",
  headers:{
    "Client-ID" : "1f53cr4hqobm0k1mxdtlk2qp4hhl14"
  },
  success: function(data1) {
    debugger;
    if (data1.stream===null) {
      $("#fccStatus").html("Free Code Camp is currently OFFLINE");
    } else {
      $("#fccStatus").html("Free Code Camp is currently ONLINE!");
    }
  }
});

//Channel API call

$.ajax({
  type: "GET",
  url: "https://api.twitch.tv/kraken/users/freecodecamp/follows/channels/",
  headers:{
    "Client-ID" : "1f53cr4hqobm0k1mxdtlk2qp4hhl14"
  },
  success: function(data2){ 
    for (var i=0; i<data2.follows.length; i++){
      var displayName = data2.follows[i].channel.display_name;
      var logo = data2.follows[i].channel.logo;
    var status= data2.follows[i].channel.status;
    if(logo==null){
      logo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeF9yiuuOJBNO8VpXsVp2VQIpBSTPdLKW6uB3AI-jmSX9G74bX1g";
    }
      $(".followerInfo").prepend("<div class ='row'>" + "<div class='col-md-4'>" +
              "<a href='https://www.twitch.tv/"+ displayName+"'><img src='" + logo + "'></a>"
              +
              "</div>" + "<div class='col-md-4'>" + displayName + "</div>" + "<div class='col-md-4'>" + status + "</div></div>");
    
    }
    
   
  }
   
});

  //Streaming and deleted channels API call
  
var deletedFollowers=['brunofin', 'comster404'];
  for(var i=0;i<deletedFollowers.length;i++){
    $.ajax({
      type: "GET",
      url: "https://api.twitch.tv/kraken/streams/"+deletedFollowers[i],
      headers:{
        "Client-ID":"1f53cr4hqobm0k1mxdtlk2qp4hhl14"
      },
      error: function(data3){
        var logo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeF9yiuuOJBNO8VpXsVp2VQIpBSTPdLKW6uB3AI-jmSX9G74bX1g";
        var displayName= data3.statusText;
       var status= data3.status;
         $(".followerInfo").prepend("<div class ='row'>" + "<div class='col-md-4'>" +
              "<a  href='https://www.twitch.tv/" +displayName+  +"'><img src='" + logo + "'></a>"
              +
              "</div>" + "<div class='col-md-4'>" + displayName + "</div>" + "<div class='col-md-4'>" + status + "</div></div>");
        
      }
    });
  }
  });
