if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(function(reg) {
        window.reg = reg;
        reg.update();
    })
};
var n = 100;
var v = new Stage("stage"),
    m = new Twinkle("#fff", 14, 1000),
    a = new  Fireworks(document.getElementById("stage"));
var x,y,time;
// $(window).on("mousemove", function(e) {
//     // m.mouse.update(e.clientX, e.clientY)
//     console.log(e)
//     a.updateFireworks()
// })
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


;(function(){
    // var flag = true;
    setTimeout(()=>{
        $('main>div')[0].className = 'show';
    },500)
    //
    // $('main>div')[0].addEventListener('click',function(e){
    //     e.stopPropagation();
    //     flag = true;
    //     this.className = 'show';
    // });
    // document.addEventListener('click',function(){
    //     if(flag){
    //         flag = false;
    //         $('main>div')[0].className = 'hidden';
    //     }
    // });
})();
