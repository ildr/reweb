/*
$(document).ready(function() {
        $("head").append("<link rel='stylesheet' type='text/css' href='../css/main.css' />");
    });
*/
$(document).on('click','.switcher',function(){
});

$(document).on('click','.switcher_service',function(){
  $('.switcher_service').removeClass('switcher_active');
  $(this).toggleClass('switcher_active');
  $('.switcher_service').parent().parent().parent().removeClass('services-item_active');
  $(this).parent().parent().parent().toggleClass('services-item_active');
});

$(document).on('click','.switcher_extra-service',function(){
  $(this).toggleClass('switcher_active');

  $(this).parent().parent().parent().toggleClass('services-item_active');
});




/*
$(document).ready(function(){
  if($(document).find('#index').length!=0) {
    setTimeout(function(){
      $('.index-heading__img').fadeIn();
    },'1000');
    setTimeout(function(){
      $('.nav__item-link-text').fadeIn();
    },'0');

  }
});
*/




function popupclickfunction() {
        if($('.content').hasClass('content_fixed')) {
          return false
        }

        $('.close-pop-up-b').slideDown();


        topscrollpopup = $(document).scrollTop();

        $('.content').addClass('content_fixed');
        $('.content').css('top', -topscrollpopup);

        $('body').scrollTop(0);

        $('.content-hover').fadeIn();


}

function popupclickclosefunction() {
  if($('.content').hasClass('content_fixed')) {
  }else {
    return false
  }

  $('.close-pop-up-b').slideUp();

  $('.nav').removeClass('nav_open');
  $( '.content' ).removeClass( "content_no" );
  $('.nav__item-link-text').fadeOut();

    $('.popups').children().fadeOut();

    setTimeout(function() {
        $('.content').removeClass('content_fixed');
        $('.content').css('top', '0');
        $(document).scrollTop(topscrollpopup);
        $('.content-hover').fadeOut();

    }, 500);



}

function showMenu(){

  $('.nav').addClass('nav_open');
  $( '.content' ).addClass( "content_no" );
  $('.nav__item-link-text').fadeIn();

  popupclickfunction();
}

/*
$(document).on('click','.nav',function() {

    showMenu()
  }
);
*/

/*
$(document).on('click','.nav-mobile__logo',function(){
  showMenu();
});
*/

$(document).on('click','.content-hover',function(){
  popupclickclosefunction()
});

$(document).on('click','.close-pop-up-b',function(){
  popupclickclosefunction()
});




$(document).on('click','#info',function() {
popupclickfunction();
$('.info').fadeIn();
});

function openQuestion(){
  popupclickfunction();
  $('#questions').fadeIn();
}

function openOrder(){
  popupclickfunction();
  $('#questions').fadeIn();
}

/* Подсказки*/

/*
$(function(){
 $('a').hover(function(){
   var href = $(this).attr('link-data');
   $('.hover-info-desktop').empty().append('<i class="fa fa-external-link" aria-hidden="true"></i> '+href);
  },
  function(){
    var href = $(this).attr('link-data');
    $('.hover-info-desktop').text('');
  });
});
*/

$(document).on('mouseover','a',function(){

});

$(document).on('click','.index-heading__adventages-click',function(){
  if($('.index-heading__adventages-body_active').next().hasClass('index-heading__adventages-click')){
    $('.index-heading__adventages-body').removeClass('index-heading__adventages-body_active');
    $('.index-heading__adventages-body').first().addClass('index-heading__adventages-body_active');
    return false;
  }
  $('.index-heading__adventages-body_active').removeClass('index-heading__adventages-body_active').next().addClass('index-heading__adventages-body_active');
});
