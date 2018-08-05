(function($){
	$.fn.close = function(){
		var lis = $('#ulPreImg').find('li')
		if(lis.length == 1){
			$('#upImgPanel').hide()
		}else if(lis.length > 1){
			var len = lis.length-1;
			for(var i=0;i<len;i++){
				$(lis[i]).remove();
				$('#upImgPanel').hide()
			}
		}
	};
	$.fn.upLoad = function(cfg){
		var lis = $('#ulPreImg').find('li')
		if(lis.length == 1){
			alert('至少要选择一张图片上传');
			return;
		}else if(lis.length > 1){
			$('#'+cfg.id).ajaxSubmit({
				type:cfg.type,//请求类型
				url:cfg.url,//请求路径
				data:cfg.data,
				dataType:cfg.dataType,//数据类型
				success:function(result){//回调函数
					if(result > 0){
						alert('成功上传'+result+'张图片');
						$('#container').load('web/pictureList.do');
					}
				}
			})
		}
	};
	$.fn.open = function(){
		$('.btn_bacthUpload').click(function(){
			 $('#upImgPanel').show(function(){
				$('#upImgPanel').fadeIn(500,function(){
					$('#upTitle').text('图片上传')
				})
			})
		});
	};
	$.fn.preImg = function(delParent,defaults){
		var inputId = $(this).attr('id')    //input的id
		var file = document.getElementById(inputId);
		var fileList = file.files;      //获取到了选择的所有的照片
		//var li = $('#'+inputId).parent();   //用来预览选择的图片
		var ul = $('#'+inputId).parent().parent();  //追加li的
		
		var doneLen = $(ul).children().length
		var toLen = fileList.length + $(ul).children().length  //已选的图片和再选的图片的总数
		if(fileList.length >9 || toLen > 9){
			alert('一次最多上传8张图片')
		}else if(doneLen < 9){
			//验证图片上传的类型
			//fileList = $.fn.validationImgType(fileList)
			for(var i=0;i<fileList.length;i++){
				var type = fileList[i].name;
				type = type.split('.')[1];
				var size = fileList[i].size;
				if(jQuery.inArray(type,defaults.type) > -1){
					if(size > defaults.size){
						alert('你选择的图片过大')
					}
				}else{
					alert('不支持类型为'+type+'的图片')
				}
			}
			for(var k=0;k<fileList.length;k++){
				var url = window.URL.createObjectURL(fileList[k])
				var li = $('<li class="li" id="li'+fileList[k].size+'"></li>')
				var button = $('<img class="closeImg" id="delete'+fileList[k].size+'" src="<%=basePath%>/images/up/a7.png">')
				var img = $('<img class="rowImg" name="imgs" id="img'+fileList[k].size+'">')
				$(img).data('file',fileList[k])
				$(img).attr('src',url)
				button.appendTo(li)
				img.appendTo(li)
				li.appendTo(ul)
				ul.prepend(li)
				$(button).click(function(e){
					$('.works-mask').show();
					delParent = $(this).parent()
				})
			}
		};
		$.fn.validationImgType = function(list){
			var imgList = [];
			for(var i=0;i<list.length;i++){
				var type = list[i].name;
				type = type.split('.')[1];
				var size = list[i].size;
				if(jQuery.inArray(type,defaults.type) > -1){
					if(size < defaults.size){
						imgList.push(list[i])
					}else{
						alert('你选择的图片过大')
					}
				}else{
					alert('不支持类型为'+type+'的图片')
				}
			}
			return imgList;
		}
	}
})(jQuery)