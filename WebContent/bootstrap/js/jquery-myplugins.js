(function(jQuery,window,document,undefined){
	var Beautifier = function(el,opt){
		this.$el = el;
		this.defaults = {
			'color':'red',
			'fontSize':'16px',
			'textDecoration':'none' 
		}
		this.options = $.extend({},this.defaults,opt);
	}

	Beautifier.prototype = {
		beauty:function(){
			return this.$el.css({                 //这里的this.$el是页面获取到的元素
				'color':this.options.color,       //这里的this == this.$el
				'fontSize':this.options.fontSize,
				'textDecoration':this.options.textDecoration
			})
		}	
	}
		

	$.fn.myFun = function(options){
		var beau = new Beautifier(this,options);
		return beau.beauty();
	}
})(jQuery,window,document)

