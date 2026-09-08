$(document).ready(function()
{
   $("#bagamedovomTabs1").tabs(
   {
      show: false,
      hide: false,
      event: 'click',
      collapsible: false
   });
   $("#page1SlideShow1").conveyerbelt({speed:1, spacing: 5});
   var Carousel2Opts =
   {
      delay: 7000,
      duration: 700,
      easing: 'easeInQuint',
      mode: 'forward',
      direction: '',
      pagination: true,
      pause: null,
      start: 0
   };
   $("#Carousel2").carousel(Carousel2Opts);
   $("#Carousel2_back a").click(function()
   {
      $('#Carousel2').carousel('prev');
   });
   $("#Carousel2_next a").click(function()
   {
      $('#Carousel2').carousel('next');
   });
});
