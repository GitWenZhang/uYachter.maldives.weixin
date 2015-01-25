$(document).ready(function(){
  var audio = new Audio();
  audio.autoplay = true;
  var startPlay = false;
  var funcStartPlay = function(){
    if(!startPlay){
      startPlay = true;
      console.log(new Date());
      var $loading = $("#loading");
      var $loading_text = $("#loading_text");
      var funcLoading = function(){
        var imgs = ['iphone.png','page 1.jpg','page 2.jpg','page 3.jpg','page 4.jpg','page 5.jpg','page 6.jpg','page 7.jpg','page 8.jpg','page 9.jpg','page 10.jpg','page 11.jpg','page 12.jpg','page 13.jpg'],
        imgs_len = imgs.length,
        imgs_loaded_len = 0;
        var funcImgsLoad = function(e) {
          var img = new Image;
          img.onload = function() {
            ++imgs_loaded_len, $loading_text.text(parseInt(imgs_loaded_len / imgs_len * 100) + "%")
          }, img.src = 'images/'.concat(e)
        };
        for (var i = 0; i < imgs_len; ++i) funcImgsLoad(imgs[i]);
        var cb = function(){};
        var s = 60;//unit second
        var o = function() {
          0 >= s ? imgs_loaded_len / imgs_len > 0.5 ? cb() : alert("你的网速不太给力哦,试试重新刷新!")
          : (s -= .5, imgs_loaded_len == imgs_len ? cb() : setTimeout(o, 500))
        };//0.5s检测一次,图片要么在固定秒内加载完成,要么超过半数,可以执行后续的初始化函数(作为参数传递).
        return function(e) {
          typeof e == "function" && (cb = e), o()
        };
      }();
      funcLoading(function(){
        //初始化Contain高度
        $('.swiper-container').css('height', $(window).height())
        var mySwiper = new Swiper('.swiper-container', {
          //pagination: '.pagination',
          mode: 'vertical',
          onSlideChangeStart: function (swiper) {
            if ($('.swiper-slide-visible').attr('id') == 'end') {
              $('.up').hide()
            }else { $('.up').show() }
          }
        });
        if(!audio.src){
          audio.src = "mp3/Coldplay - A Sky Full Of Stars.mp3"; 
          audio.load();
        }
        window.addEventListener('touchstart', function (e) {
          //audio.loop = true;
          if($('#content').css('display')!='none'){
            if(audio && audio.src && audio.paused){
              audio.play();
            }
          }
        });
        console.log(new Date());
        $loading.fadeOut(1000);
      });
    }
  };
  if($('#content').css('display')=='none'){
    console.log('不开始播放');
    $('.lock_wrp').css('display','block');
  }
  else{
    funcStartPlay(); 
  }
  window.addEventListener('resize',function(e){
    if($('#content').css('display')=='none'){
      console.log('停止播放');
      if(!audio.paused)
        audio.pause();
      $('.lock_wrp').css('display','block');
    }
    else{
      $('.lock_wrp').css('display','none');
      funcStartPlay();
      if(audio.paused)
        audio.play();
      console.log('继续播放');
    } 
  });
});
