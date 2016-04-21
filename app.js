
/*var example = {
  word:"Max!"
}
*/
//var relog; { hora:new Date().toLocaleTimeString()};
var alarmSound = new Audio('static/alarm.mp3');
//alarmSound.volume = 0.5;

var relog = {
  hora:new Date(),
  ringing:false
};
//Actualiza el relog
setInterval(function(){
  relog.hora =new Date();
  if (relog.hora.getMinutes()==30 && relog.hora.getSeconds()==00) {
    relog.ringing = true;
    alarmSound.play();
  }
},1000)

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
