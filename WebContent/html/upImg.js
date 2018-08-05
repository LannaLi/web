$(document).ready(function(){
	
	var $mainPanel = $('#mainPanel')
	//隐藏
	$('#mainPanel').on('click','.btnClose',function(){$('#mainPanel').fadeOut(1000);})
	//显示
	$('#show').click(function(){$('#mainPanel').fadeIn(2000);autoCenter($mainPanel)});
	
	//自动居中显示
	function autoCenter(el){
		//屏幕的高和宽
		var bodyW = $(window).width();
		var bodyH = $(window).height();
		//element的高和宽
		var elW = el.width();
		var elH = el.height();
		$mainPanel.css({"left":(bodyW-elW)/2 + 'px',"top":(bodyH-elH)/2 +'px'})
	}
	
	//禁止选中的对话框内容
	if(document.attachEvent){
		$mainPanel.attachEvent('onselectstart',function(){
			return false;
		})
	}
	
	
	//声明需要用到的变量
	var mx=0,my=0,dx=0,dy=0,isDraging=false;
	
	//按下鼠标
	$('#rowMove').mousedown(function(e){
		var e = e || window.event;
		
		mx = e.pageX;
		my = e.pageY;
		
		dx = $mainPanel.offset().left;
		dy = $mainPanel.offset().top;
		
		isDraging=true;
	})
	
	
	//拖动鼠标
	
	$(document).mousemove(function(e){
		var e = e || window.event;
		
		var x = e.pageX;
		var y = e.pageY;
		
		if(isDraging){
			var moveX = dx + x -mx;
			var moveY = dy + y -my;
			
			var pageW = $(window).width();
			var pageH = $(window).height();
			
			var mainPanelW = $mainPanel.width();
			var mainPanelH = $mainPanel.height();
			
			var maxX = pageW - mainPanelW;
			var maxY = pageH - mainPanelH;
			
			moveX = Math.min(Math.max(0,moveX),maxX);
			moveY = Math.min(Math.max(0,moveY),maxY);
			
			$mainPanel.css({"left":moveX + 'px',"top":moveY +'px'})
		}
	})
	
	//鼠标离开
	$('#rowMove').mouseup(function(){
		isDraging = false;
	})
	
	window.onresize = function(){
		autoCenter($mainPanel);
	}
	
	//图片的相关属性值
	var cfg = {
		'type':['png','jpeg','bmp','gif','jpg'],     //图片类型
		'size':1024 * 1024 * 30                      //图片大小
	}
	var typeCount = 0, sizeCount=0;
	
	//添加图片的处理
	
	$('.file').change(function(){
		var inputId = $(this).attr('id')
		var $input = document.getElementById(inputId);
		console.log($($input))
		var fileList = $input.files;
		
		var ul = $('#' + inputId).parent().parent();      //获取到ul
		var donLen = $(ul).children().length;
		var totalLen = fileList.length + $(ul).children().length;          //总的li的个数
		
		if(fileList.length > 13 || totalLen > 13){
			$(this).val("")
			alert('一次最多能添加11张图片')
		}else if(donLen < 13){
			//验证选中的图片的有效性
			fileList = validationImg(fileList)
			for(var k=0;k<fileList.length;k++){
				var url = window.URL.createObjectURL(fileList[k])
				
				//创建li
				var li = $('<li></li>')
				//创建img
				var img = $('<img class="img">')
				//
				var span = $('<span><ingput type="button" class="Btn closeBtn" value="&times;"></span>')
				var $span = $('<span><input type="text" class="Btn" id="txCon"></span>')
				
				$(img).data('file',fileList[k])
				$(img).attr('src',url)
				li.appendTo(ul)
				ul.prepend(li)
				img.appendTo(li)
				span.appendTo(li)
				$span.appendTo(li)
				
			}
		}
	})
	//验证
	function validationImg(list){
		var arr = [];      //存放合法的图片
		 
		for(var i=0;i<list.length;i++){
			
			var type = list[i].name;
				type = type.split('.')[1];
			
			var size = list[i].size;
			
			if(jQuery.inArray(type,cfg.type) > -1){
				
				if(size > cfg.size){
					sizeCount++;
				}else{
					arr.push(list[i])
				}
			}else{
				typeCount++;
			}
			
		}
		return arr;
	}
	
	
})
