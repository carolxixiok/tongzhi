  // 轮播图触摸
  var OFFSET = 50;
  $('.carousel').each(function(i, item) {
    var startX, endX;
    item.addEventListener('touchstart', function(e) {
      startX = e.touches[0].clientX;
      e.preventDefault();
    });
    item.addEventListener('touchmove', function(e) {
      endX = e.touches[0].clientX;
      e.preventDefault();
    });
    item.addEventListener('touchend', function(e) {
      var offsetX = endX - startX;
      if (offsetX > OFFSET) {
        // 上一张
        $(this).carousel('prev');
      } else if (offsetX < -OFFSET) {
        // 上一张
        $(this).carousel('next');
      }
      e.preventDefault();
    });
  });