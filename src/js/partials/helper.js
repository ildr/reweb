/**
 * @name    Shuffle Letters
 * @author    Martin Angelov
 * @version   1.0
 * @url     http://tutorialzine.com/2011/09/shuffle-letters-effect-jquery/
 * @license   MIT License
 */

(function($){

  $.fn.shuffleLetters = function(prop){

    var options = $.extend({
      'step'    : 8,      // How many times should the letters be changed
      'fps'   : 25,     // Frames Per Second
      'text'    : '',       // Use this text instead of the contents
      'callback'  : function(){}  // Run once the animation is complete
    },prop)

    return this.each(function(){

      var el = $(this),
        str = '';


      // Preventing parallel animations using a flag;

      if(el.data('animated')){
        return true;
      }

      el.data('animated',true);


      if(options.text) {
        str = options.text.split('');
      }
      else {
        str = el.text().split('');
      }

      // The types array holds the type for each character;
      // Letters holds the positions of non-space characters;

      var types = [],
        letters = [];

      // Looping through all the chars of the string

      for(var i=0;i<str.length;i++){

        var ch = str[i];

        if(ch == ' '){
          types[i] = 'space';
          continue;
        }
        else if(/[a-z]/.test(ch)){
          types[i] = 'lowerLetter';
        }
        else if(/[A-Z]/.test(ch)){
          types[i] = 'upperLetter';
        }
        else {
          types[i] = 'symbol';
        }

        letters.push(i);
      }

      el.html('');

      // Self executing named function expression:

      (function shuffle(start){

        // This code is run options.fps times per second
        // and updates the contents of the page element

        var i,
          len = letters.length,
          strCopy = str.slice(0); // Fresh copy of the string

        if(start>len){

          // The animation is complete. Updating the
          // flag and triggering the callback;

          el.data('animated',false);
          options.callback(el);
          return;
        }

        // All the work gets done here
        for(i=Math.max(start,0); i < len; i++){

          // The start argument and options.step limit
          // the characters we will be working on at once

          if( i < start+options.step){
            // Generate a random character at thsi position
            strCopy[letters[i]] = randomChar(types[letters[i]]);
          }
          else {
            strCopy[letters[i]] = '';
          }
        }

        el.text(strCopy.join(''));

        setTimeout(function(){

          shuffle(start+1);

        },1000/options.fps);

      })(-options.step);


    });
  };

  function randomChar(type){
    var pool = '';

    if (type == 'lowerLetter'){
      pool = 'abcdefghijklmnopqrstuvwxyz0123456789';
    }
    else if (type == 'upperLetter'){
      pool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    }
    else if (type == 'symbol'){
      pool = ',.?/\\(^)![]{}*&^%$#\'"';
    }

    var arr = pool.split('');
    return arr[Math.floor(Math.random()*arr.length)];
  }

})($);

function sayBob(a){
  $('.helper__said').remove();
  $('.helper__dialog').append('<div class="helper__said"></div>');
  $('.helper__said').empty().shuffleLetters({
      'text': a
  });
}





$(document).ready(function(){
	$('body').append('<div class="helper close">\
      <div class="helper__person">\
        <img class="helper__person-img" src="imgsvg/hipsta.svg" alt="Bob">\
      </div>\
      <div class="helper__dialog">\
          <div class="helper__said">\
          </div>\
          <div class="helper__answer">\
            <input class="helper__answer-item input helper__input" id="helper-input-name" class="input" type="text" placeholder="Enter your name">\
            <span class="helper__answer-item helper__button" id="helper-button"><img src="imgsvg/plane.svg" alt="Plane"></span>\
          </div>\
      </div>\
      <div class="helper__toggle">\
        <div class="helper__toggle-inner">\
        </div>\
      </div>\
    </div> \
    <img class="helper__open" src="imgsvg/hipsta-head.svg" alt="Bob">\
          <img class="helper__close close" src="imgsvg/close.svg" alt="Close">\
    ');



    //проверяем куку был ли пользователь на сайте

    var wasvisit = getCookie ( "wasvisit" );

    if ( wasvisit == "")
    {
       document.cookie = "wasvisit=Guest; expires=1/1/2019 00:00:00";
    }


  //

});


//сам боб
//вариант текста. ид текста и действие (на кнопках висит нужная функция)
var name = ''

var bobsayHi =function(){
  var nameCookie = getCookie('wasvisit');

  if(nameCookie=='Guest'){
    sayBob('Hi, my name is Rendal. I have no brains, but only a few algorithms, but I\'ll be happy to help, what\'s your name?');
    
    $('.helper__answer').empty().append('<input class="helper__answer-item input helper__input" id="helper-input-name" class="input" type="text" placeholder="Enter your name">\
    <span onclick="nextStepBob(1)" class="helper__answer-item helper__button" id="helper-button"><img src="imgsvg/plane.svg" alt="Plane"></span>\
    ');
  
  } else {
    sayBob('Oh, '+nameCookie+'. You need my help?');

    $('.helper__answer').empty().append('\
    <div onclick="nextStepBob(6)" class="helper__answer-item input helper__button" id="helper-input-name" class="input" type="text" >There is mistake in my name</div>\
    <div onclick="nextStepBob(2)" class="helper__answer-item input helper__button" id="helper-input-name" class="input" type="text" >Place order</div>\
    ');
  }
}

var bobChangeName = function(){
  sayBob('I am so sorry, how can i call you?');

  $('.helper__answer').empty().append('<input class="helper__answer-item input helper__input" id="helper-input-name" class="input" type="text" placeholder="Enter your name">\
    <span onclick="nextStepBob(1)" class="helper__answer-item helper__button" id="helper-button"><img src="imgsvg/plane.svg" alt="Plane"></span>\
    ');
}

var bobCheckName = function(){
  var before = $('.helper__said').text();
  var name = $('#helper-input-name').val();
  if(name=='Egor Karpachev'){
    sayBob('Sorry, i do not work with Petuh');
    return false;
  }

  document.cookie = "wasvisit="+name+"; expires=1/1/2019 00:00:00";

  var newtext = name+ before;
  sayBob('Nice to meet you. '+name+ '. Place an order to contact my owner.');

  /*<div class="helper__answer-item input helper__button" id="helper-input-name" class="input" type="text" >Tell me more</div>\*/
  $('.helper__answer').empty().append('\
  <div onclick="nextStepBob(2)" class="helper__answer-item input helper__button" id="helper-input-name" class="input" type="text" >Place order</div>\
  ');
};

var bobOpenform = function(){
  var before = $('.helper__said').text();
  var name = $('#helper-input-name').val();
  var newtext = name+ before;

  
  sayBob('Ok, now i need your contact details: Email or Phone number.');

 

  $('.helper__answer').empty().append('<input class="helper__answer-item-contacts helper__answer-item input helper__input" id="helper-input-name" class="input" type="text" placeholder="Email or phone number">\
  <span onclick="nextStepBob(5)" class="helper__answer-item helper__button" id="helper-button"><img src="imgsvg/plane.svg" alt="Plane"></span>\
  ');
  
};

var bobSendEnquiry = function(){
  var contacts = $('.helper__answer-item-contacts').val();

  function ValidMail(data) {
    var re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
    var myMail = data;
    var valid = re.test(myMail);
    sayBob('Sorry, I need valid information to send.');
    return valid;
}
 
function ValidPhone(data) {
    data = data.replace('+','').replace('(','').replace(')','');
    var re = /^\d[\d\(\)\ -]{4,14}\d$/;
    var myPhone = data;
    var valid = re.test(myPhone);
    sayBob('Sorry, I need valid information to send.');
    return valid;
}  

  if(ValidMail(contacts)==false&&ValidPhone(contacts)==false){
    return false;
  }

  sayBob('Thanks, now you will get all details in 10 minutes.');

  $('.helper__answer').empty().append('\
  <span onclick="closeBob()" class="helper__answer-item helper__button" id="helper-button">Thanks</span>\
  ');
  
};


var bobTellMeMore = function(){
  var before = $('.helper__said').text();
  var name = $('#helper-input-name').val();
  var newtext = name+ before;
  sayBob('Выбирай что тебе интересно, но ты также можешь пользоваться обычной навигацией - сверху');

  $('.helper__answer').empty().append('<span onclick="nextStepBob(4)" class="helper__answer-item helper__button" id="helper-button">Узнать о создании сайтов</span>\
    <span onclick="nextStepBob(5)" class="helper__answer-item helper__button" id="helper-button">Узнать о продвижении</span>\
    <span onclick="nextStepBob(6)" class="helper__answer-item helper__button" id="helper-button">Узнать о поддержке</span>\
  ');

};

var bobPhoneOrEmail = function(){
  var before = $('.helper__said').text();
  var name = $('#helper-input-name').val();
  var newtext = name+ before;
  sayBob('Azazaza');

  $('.helper__answer').empty().append('<span onclick="nextStepBob(4)" class="helper__answer-item helper__button" id="helper-button">Узнать о создании сайтов</span>\
    <span onclick="nextStepBob(5)" class="helper__answer-item helper__button" id="helper-button">Узнать о продвижении</span>\
    <span onclick="nextStepBob(6)" class="helper__answer-item helper__button" id="helper-button">Узнать о поддержке</span>\
  ');

};

bob = [
  [bobsayHi],
  [bobCheckName],
  [bobOpenform],
  [bobTellMeMore],
  [bobPhoneOrEmail],
  [bobSendEnquiry],
  [bobChangeName],
];





//функция следующий шаг боба

function nextStepBob(idbobstep){
  var selectedBob = bob[idbobstep];
  var bobAction = selectedBob[0];


  bobAction();

}

function closeBob(){
  $('.helper').toggleClass('close');
  $('.footer').toggleClass('close');
  $('.helper__close').toggleClass('close');

  if($(this).hasClass('clicked')){
    return false;
  }

  $(this).addClass('clicked');

  //пока только первую вызову
  nextStepBob(0);
}


$(document).on('click','.helper__close',function(){
  closeBob();

});

//но тут нужно нарисовать первые из кнопок
//функция открытия
//в момент открытия проверка куки и рисовка текста
  //вариант 1 привет незнакомец
  //вариант 2 привет имя из куки
  //вариант 3 привет, ты уже был, но я не знаю твое имя


  //рисовка вариантов ответов и текста боба

  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
       var c = ca[i];
       while (c.charAt(0)==' ') c = c.substring(1);
       if(c.indexOf(name) == 0)
          return c.substring(name.length,c.length);
    }
    return "";
}