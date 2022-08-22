jQuery(document).ready(function () {
  ImgUpload();
});

function ImgUpload() {
  var imgWrap = "";
  var bigImgWrap = "";
  var bigImgArray = [];
  var imgArray = [];

  $('.upload_mainfile').each(function () {
    $(this).on('change', function (e) {
      if (bigImgArray.length == 1 ) {
        alert("メイン写真の最大限の枚数は1枚");
        return false
      } else {
        bigImgWrap = $(this).closest('.upload_box').find('.upload_big-image');
        var maxLength = $(this).attr('data-max_length');
  
        var files = e.target.files;
        var filesArr = Array.prototype.slice.call(files);
        filesArr.forEach(function (f, index) {
  
          if (!f.type.match('image.*')) {
            return;
          }
  
          if (bigImgArray.length > maxLength) {
            return false
          } else {
            var len = 0;
            for (var i = 0; i < bigImgArray.length; i++) {
              if (bigImgArray[i] !== undefined) {
                len++;
              }
            }
            if (len > maxLength) {
              return false;
            } else {
              bigImgArray.push(f);
  
              var reader = new FileReader();
              reader.onload = function (e) {
                var html = "<div class='upload_big-img-box'><div style='background-image: url(" + e.target.result + ")' data-number='" + $(".upload_img-close").length + "' data-file='" + f.name + "' class='img-bg'><div class='upload_img-close'></div></div></div>";
                bigImgWrap.append(html);
                iterator++;
              }
              reader.readAsDataURL(f);
            }
          }
        });
      }

    });
  });


  $('.upload_inputfile').each(function () {
    $(this).on('change', function (e) {
      if (imgArray.length == 3 ) {
        alert("サムネイル写真の最大限の枚数は3枚");
        return false
      } else {
        imgWrap = $(this).closest('.upload_box').find('.upload_img-wrap');
        var maxLength = $(this).attr('data-max_length');
  
        var files = e.target.files;
        var filesArr = Array.prototype.slice.call(files);
        var iterator = 0;
        filesArr.forEach(function (f, index) {
  
          if (!f.type.match('image.*')) {
            return;
          }
  
          if (imgArray.length > maxLength) {
            return false
          } else {
            var len = 0;
            for (var i = 0; i < imgArray.length; i++) {
              if (imgArray[i] !== undefined) {
                len++;
              }
            }
            if (len > maxLength) {
              return false;
            } else {
              imgArray.push(f);
  
              var reader = new FileReader();
              reader.onload = function (e) {
                var html = "<div class='upload_img-box'><div style='background-image: url(" + e.target.result + ")' data-number='" + $(".upload_img-close").length + "' data-file='" + f.name + "' class='img-bg'><div class='upload_img-close'></div></div></div>";
                imgWrap.append(html);
                iterator++;
              }
              reader.readAsDataURL(f);
            }
          }
        });
      }
    });
  });

  $('body').on('click', ".upload_img-close", function (e) {
    var file = $(this).parent().data("file");
    if (bigImgArray[0].name === file) {
      bigImgArray.splice(i, 1);
    }
    
    for (var i = 0; i < imgArray.length; i++) {
      if (imgArray[i].name === file) {
        imgArray.splice(i, 1);
        break;
      }
    }
    $(this).parent().parent().remove();
  });
}
