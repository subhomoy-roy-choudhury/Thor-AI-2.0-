// Sppech Recognition System
if (annyang) {
// Let's define our first command. First the text we expect, and then the function it should call
  var commands = {
      'show tps report': function() {
      $('#tpsreport').animate({bottom: '-100px'});
      },
      'write name': function(variable){
          console.log("hi");
          let thor_command = document.getElementById("dislikes");
          thor_command.value = variable;
      }
};

// Add our commands to annyang
annyang.addCommands(commands);

// Start listening. You can call this here, or attach this call to an event, button, etc.
annyang.start();
}

// Cookie Management System
function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
let ip_addr_ccokie = getCookie("ip_address");
if (ip_addr_ccokie != "") {
    $("#ip_address").val(`${ip_addr_ccokie}`)
    document.getElementById("ip_address").disabled = true;
    document.getElementById("dislikes").disabled = false;
    document.getElementById("dislikebtn").disabled = false;
    $("#btn_new").empty();
    $('#btn_new').append(`<p>${ip_addr_ccokie} -- connected</p>`);
}
ip_address = ip_addr_ccokie;


// IP Verification System
const addLike = (ev) => {
    ev.preventDefault();
    let likes = [];
    let like = {
        like: document.getElementById('ip_address').value
    }
    likes.push(like);
    document.cookie = `ip_address=${like['like']}`;
    btn_new = document.getElementById('btn_new');
    console.log(JSON.stringify(likes));
    var obj = JSON.stringify(likes);
    ip_address = likes[0].like
    $.ajax({
        url: `http://${ip_address}/check`,
        type: "GET",
        headers: {
          "X-Api-Key": "2c5910f0ec69970653c6aae5f83a35b22afdfcce",
        },
        datatype: 'json',
        cache: false,
        error: function(resp) {
            console.log(resp);
            $("#btn_new").empty();
            $('#btn_new').append(`<p>No Device Connected</p>`);
        },
        success: function(resp) {
            $("#btn_new").empty();
            $('#btn_new').append(`<p>${ip_address} -- connected</p>`);
            document.getElementById("dislikes").disabled = false;
            document.getElementById("ip_address").disabled = true;
            document.getElementById("dislikebtn").disabled = false;
            localStorage.setItem('IP Address', JSON.stringify(likes));
        }
    });
}


// Chat Interation System
let dislikes = [];
const add_dislike = (ev) => {
    ev.preventDefault();
    if(document.getElementById('dislikes').value != ""){
      let dislike = {
          dislike: document.getElementById('dislikes').value,
          is_bot: false
      }
      dislikes.push(dislike);
      var data = {
          user_input: dislike['dislike']
      }
      $.ajax({
          url: `http://${ip_address}/get`,
          type: "POST",
          headers: {
            "X-Api-Key": "2c5910f0ec69970653c6aae5f83a35b22afdfcce",
          },
          data: JSON.stringify(data),
          datatype: 'json',
          contentType: "application/json; charset=utf-8",
          cache: false,
          error: function(resp) {
              console.log(resp);
              let dislike = {
                  dislike: "Connection Timed Out",
                  is_bot: true
              }
              dislikes.push(dislike);
              console.log(`Added Successfully`);
              btn_new1 = document.getElementById('btn_new1');
              console.log(JSON.stringify(dislikes));
              var obj = JSON.stringify(dislikes);
              console.log(dislikes.length);
              $("#btn_new1").empty();
              for (i = 1; i <= dislikes.length; i++) {
                  console.log(i, dislikes[i - 1]);
                  $('#btn_new1').append(`<p>${dislikes[i-1].dislike} ---- ${dislikes[i-1].is_bot}`);
              };
              // localStorage.setItem('Chat', JSON.stringify(dislikes));
          },
          success: function(resp) {
              console.log(JSON.stringify(resp));
              let dislike = {
                  dislike: resp['user_input'],
                  is_bot: true
              }
              dislikes.push(dislike);
              console.log(`Added Successfully`);
              btn_new1 = document.getElementById('btn_new1');
              console.log(JSON.stringify(dislikes));
              var obj = JSON.stringify(dislikes);
              console.log(dislikes.length);
              $("#btn_new1").empty();
              for (i = 1; i <= dislikes.length; i++) {
                  console.log(i, dislikes[i - 1]);
                  $('#btn_new1').append(`<p>${dislikes[i-1].dislike} ---- ${dislikes[i-1].is_bot}`);
              };
              localStorage.setItem('Chat', JSON.stringify(dislikes));
          }
      });
    }
}
const reset_ip = (ev) => {
    ev.preventDefault();
    document.getElementById("ip_address").disabled = false;
    $("#ip_address").val("");
}
const change_ip = (ev) => {
    ev.preventDefault();
    document.getElementById("ip_address").disabled = false;
}
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btn').addEventListener('click', addLike);
});
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('dislikebtn').addEventListener('click', add_dislike);
});
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('reset').addEventListener('click', reset_ip);
});
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('change').addEventListener('click', change_ip);
});
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err));
  });
}
