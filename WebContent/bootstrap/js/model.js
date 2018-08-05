(function($){
	$.fn.extend({
		/**
		 * 该功能是用来预览批量上传时的图片
		 * @param  file 添加的文件
		 * @param  url 请求上传的路径
		 * @param  el  用来显示批量上传图片的el
		 */
		'preViewImg':function(file,el){
			var fs = file.files
			var div = $('#prePicture')
			for(var i=0;i<fs.length;i++){
				var imageType = /^image\//;
				var f = fs[i];
				if(!imageType.test(f.type)){
					continue;
				}
				/**img的样式*/
				var img = $('<img ondblclick="deleteThisImg(this)"id="'+f.size+'">')
				$(img).css('height','120')
				$(img).css('width','240')
				$(img).css('margin-right','15')
				$(img).css('margin-bottom','40')
				/**img的样式*/
				img.file = f;
				el.append(img)
				var reader = new FileReader();
				reader.onload = (function(e) { 
					var url = e.target.result;
					$(img).attr('src',url)
				});
				reader.readAsDataURL(f);
			}
		}
	})
})(jQuery)
