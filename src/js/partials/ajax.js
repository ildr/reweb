//AJAX PAGES

var pages = {
  indexpage:['/index.html','/'],
  services:'/services.html',
  servicespages:['/services-landing-page.html','/services-e-shop.html','/services-visit-card-site.html','/services-corporative-site.html','/services-support.html'],
  contextadvpage: '/services-context.html',
  advpage: '/services-advertising.html'
}

function checkajaxpage(){

  if(!arguments){
    return false;
  }

  var check = false;

  function checkIt(pagenameitemskey){

    // CHECK OBJECT

    if(typeof(pagenameitemskey)=='string'){
      if(window.location.pathname==pagenameitemskey){
      check = true;
      }
    }

    if(typeof(pagenameitemskey)=='object'||typeof(pagenameitemskey)=='array'){
      for(i = 0;i<pagenameitemskey.length;i++){
        if(window.location.pathname==pagenameitemskey[i]){
        check = true;
        }
      }
    }

  };

  //CHECK PARAMETERS

  for (var i = 0; i < arguments.length; i++) {
      checkIt(arguments[i]);
      if(check==true){
        return true;
      }
  }

  return false;
}


function fullpageload(){

  // BLACK PAGE AND HEIGHT 100%

  if(checkajaxpage(pages.indexpage)) {
    $('.content-ajax-wrapper').css('height','100%');
   // $('head').append($("<link rel='stylesheet' class='imblack' href='css/black.css' type='text/css' />"));
  } else {
    $('.content-ajax-wrapper').css('height','auto');
   // $('.imblack').remove();
  }

  // OWL SERVICES

  if(checkajaxpage(pages.services)) {
    $('.row_services').owlCarousel({

      margin:0,
      responsiveClass:true,
      responsive:{
          0:{
              items:1,
              nav:true,
              loop:true
          },
          768:{
              items:3,
              nav:false,
              loop:false
          }
      }
    })
  }

  //Инфографики

  if(checkajaxpage(pages.contextadvpage)) {
             var ctx = document.getElementById("chart").getContext('2d');
                   var myChart = new Chart(ctx, {
                  type: 'doughnut',
                  data: {
                      labels: ["Yandex", "Google"],
                      datasets: [{
                          data: [60,40],
                          borderColor: '#333',
                          borderWidth: '6',
                          backgroundColor: [
                              '#27AE60',
                              '#EB5757'
                          ]
                      }],

                  },
                  options: {
                    title: {
                      display: true
                    }
                  }
              });

  }

    if(checkajaxpage(pages.advpage)) {
             var ctx = document.getElementById("chart").getContext('2d');
                   var myChart = new Chart(ctx, {
                  type: 'doughnut',
                  data: {
                      labels: ["Contextual ads", "Blogs and Vlogs ads", "CPA Networks", "Social networks"],
                      datasets: [{
                          data: [50, 10, 18, 15],
                          borderColor: '#333',
                          borderWidth: '6',
                          backgroundColor: [
                              '#27AE60',
                              '#EB5757',
                              '#F2C94C',
                              '#2D9CDB',
                          ]
                      }],

                  },
                  options: {
                    title: {
                      display: true,
                      borderColor: [
                          'rgba(255,99,132,1)',
                          'rgba(54, 162, 235, 1)',
                          'rgba(255, 206, 86, 1)',
                          'rgba(75, 192, 192, 1)'
                      ]
                    }
                  }
              });
  }



  //CANVAS ON INDEXPAGE
/*

  if(checkajaxpage(pages.indexpage)) {
    var canvas = document.getElementById('canvas-main'),
    ctx = canvas.getContext('2d'),
    fps = 20,
    fov = 200,
    waveHeight = 20,
    cols = 15,
    rows = 15,
    offsetX = 0,
    offsetY = 0,
    inc = 0.01,
    mesh = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight
  }

  function generateMesh(){

    mesh=[];
    var gridWidth = (canvas.width)/cols;
    var gridHeight = (canvas.height)/rows;
    var gridDepth = fov/rows;

    for(var col=0; col < cols; col++){
      for(var row=0; row < rows; row++){
        mesh.push([
          {
            x: col * gridWidth,
            y: row * gridHeight+gridHeight,
            z: fov - (row * gridDepth+gridDepth),
          },
          {
            x: col * gridWidth,
            y: row * gridHeight,
            z: fov - (row * gridDepth),
          },
          {
            x: col * gridWidth+gridWidth,
            y: row * gridHeight,
            z: fov - (row * gridDepth)
          }
        ]);
        // Reflext
        mesh.push([
          {
            x: col * gridWidth+gridWidth,
            y: row * gridHeight,
            z: fov - (row * gridDepth)
          },
          {
            x: col * gridWidth+gridWidth,
            y: row * gridHeight+gridHeight,
            z: fov - (row * gridDepth+gridDepth),
          },
          {
            x: col * gridWidth,
            y: row * gridHeight+gridHeight,
            z: fov - (row * gridDepth+gridDepth),
          }
        ]);
      }
    }

  }

function drawMesh(){

  ctx.strokeStyle = 'steelblue';
  ctx.fillStyle = 'rgba(150,200,220,0.2)';
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for(var m=0; m < mesh.length; m++){
    var poly = mesh[m];
    ctx.beginPath();
    ctx.moveTo(poly[0].x, poly[0].y);
    for(var p=0; p < poly.length; p++){
      ctx.lineTo(poly[p].x, poly[p].y);
    }
    ctx.closePath();
    ctx.stroke();
    //ctx.fill(); // This really impacts performance
  }
}

function addNoise(offsetX,offsetY){
  // You could do all sorts of things to cause different motion
  for(var m=0; m < mesh.length; m++){
    var poly = mesh[m];
    for(var p=0; p < poly.length; p++){
      poly[p].y = poly[p].y + (waveHeight * noise((poly[p].x/50)+offsetX,(poly[p].y/50)+offsetY) );
    }
  }

}

// Helper funtion for projection
function clip(x,w){
  return x-w/2;
}

// Tihs is a little crude
function projectMesh(){
  for(var m=0; m < mesh.length; m++){
    var poly = mesh[m];
    for(var p=0; p < poly.length; p++){
      var scale = fov/(fov+poly[p].z);
      poly[p].x = clip(poly[p].x, canvas.width) * scale + canvas.width/2;
      poly[p].y = clip(poly[p].y, canvas.height) * scale + canvas.height/3;

    }
  }

}

function draw() {

  // ToDo: inc should not be tied to framerate
  offsetX += inc;
  offsetY -= inc;

  generateMesh(); // ToDo: Probably don't need to do this every frame
  addNoise(offsetX,offsetY);
  projectMesh();
  drawMesh();

}

// Initialise and set frame rate.
(function(){
  var now;
  var then = Date.now();
  var interval = 1000/fps;
  var delta;
  function tick() {

      now = Date.now();
      delta = now - then;

      if (delta > interval) {
          then = now - (delta % interval);
          draw();
      }
      requestAnimationFrame(tick);
  }
  window.addEventListener('resize', resizeCanvas, false);
  resizeCanvas();
  tick();
})();
  }

*/


}







$(document).ready(function() {


  fullpageload();

  if($(document).find('#index').length!=0) {
    setTimeout(function(){
      $('#index').fadeIn();
    },'1000');
  }



  var popped = ('state' in window.history && window.history.state !== null), initialURL = location.href;
  var content = $('.content-ajax-wrapper');

  function openURL(href){
          popupclickclosefunction();

          var link = href;  //$(this).attr('href');

          $('.content-ajax-wrapper').load(link+ " .content-ajax" , function(data){
            fullpageload();
            if($(document).find('#index').length!=0) {
              $('#index').fadeIn();
            }
            window.scrollBy(0,-99999);

            document.title = data.split('<title>')[1].split('</title')[0];
          });



  }

   $(document).on('click', 'a', function () {

     var href = $(this).attr("href");

     history.pushState({page:href}, 'Loading...', href);

     document.title = 'Loading...';
     openURL(href);
     return false; //intercept the link

   });

   $(window).bind('popstate', function(event){

       // Ignore inital popstate that some browsers fire on page load
       var initialPop = !popped && location.href == initialURL;
       popped = true;
       if (initialPop) return;

       console.log('Popstate');

       // By the time popstate has fired, location.pathname has been changed
       openURL(location.pathname);

   });
});
