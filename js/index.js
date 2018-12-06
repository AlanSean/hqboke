var n = 100;
var v = new Stage("stage"),
    m = new Twinkle("#fff", 14, 1000),
    a = new  Fireworks(document.getElementById("stage"));
var x,y,time;
$(window).on("mousemove", function(e) {
    // m.mouse.update(e.clientX, e.clientY)
    a.updateFireworks()
})
time = setInterval(()=>{
    x = Math.random(1)*$('canvas').width();
    y = Math.abs((Math.random(1)*$('canvas').height())-$('canvas').height()/2);
    a.createFireworks(x,$('canvas').height(),x, y)
},1000)
document.addEventListener("webkitvisibilitychange", (event)=>{
  var hidden = event.target.webkitHidden;
      if (hidden){
      clearInterval(time);
    }else {
        time = setInterval(()=>{
            x = Math.random(1)*$('canvas').width();
            y = Math.abs((Math.random(1)*$('canvas').height())-$('canvas').height()/2);
            a.createFireworks(x,$('canvas').height(),x, y)
        },1000)
    }
}, false);
v.onUpdate(function(e) {
    // m.render(e)
    a.render();
})
v.update();
