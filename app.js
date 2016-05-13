
// Component list
Vue.component('mood-list-item',{
  template:'<div class="list-group-item">Test</div>'
});

Vue.component('mood-list',{
  template:'<div class="list-group center-block mood-list"><mood-list-item></div>'
});


var relog = {
  hora:new Date(),
  ringing:false
};

setInterval(function(){
  relog.hora =new Date();
  if (relog.hora.getMinutes()==30 && relog.hora.getSeconds()==00) {
    vClock.playAlarm();
  }
},1000)
/*var example = {
  word:"Max!"
}
*/
var example = new Date();




var vTitle = new Vue({
  el:'head',
  data:relog
});
//var relog; { hora:new Date().toLocaleTimeString()};
var alarmSound = new Audio('static/alarm.mp3');
//alarmSound.volume = 0.5;


//Actualiza el relog


var vHistory = new Vue({
  el:'.mood-list',
  data:{pointsStorage:JSON.parse(localStorage.db)},
  methods:{
    getPoints:function(){
      return JSON.parse(localStorage.db);
    },
    setPoints:function(myDate,points){
      var stringiff = JSON.stringify([{date:myDate,points:points}]);
      localStorage.setItem('db',stringiff);
    }
  }
})

var vClock = new Vue({
  el:'.main',
  data: relog,
  methods:{
    playAlarm:function(){
      console.log('Playing Alarm');
      notify(relog.hora.toLocaleTimeString() + " - " + "Wake Up we are watching you");
      relog.ringing = true;
	    alarmSound.play();
    },
    stopAlarm:function(){
      console.log('Stoping Alarm');
      this.ringing = false;
      alarmSound.pause();
      alarmSound.currentTime = 0;
    },
    setMood:function(value){
      this.stopAlarm();
      console.log(value);
    }
  }

})

var vSettings = new Vue({
  el:'.footer',
  methods:{
    testAlarm:function(){
        vClock.playAlarm();

    }
  }
})


var notify= function(text){
  console.log('Notificando');
  if (!("Notification" in window)) {
    console.log("This browser does not support desktop notification");
    return;
  }

  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification(text);
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification(text);
      }
    });
  }
}


if(typeof(Storage)!=="undefined")
{
    // Son soportados localStorage y sessionStorage
}
else
{
    // No es soportado el Web Storage
}
