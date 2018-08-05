;(function($){
	
	var MyTable = function(el,setting){
		this.$el = el;
		var defaults = {
			'id':'',
			'field':'',
			'needCheckbox':false,
			'list':''
		}
		this.options = $.extend({},this.defaults,setting);
	}
	
	MyTable.prototype = {
		createTable:function(){
			var checkbox = this.options.needCheckbox;
			var table = $('<table class="table"></table>');
			if(typeof checkbox == 'undefined'){
				//创建表头
				var fields = this.options.field;
				var head = getHead(fields);
				//创建表内容
				var list = this.options.list
				var tbody = getTbody(list);
				table.append(head);
				table.append(tbody);
				return table;
			} else {
				console.log(false)
			}
		}
	}
	
	$.fn.table = function(options){
		var t = new MyTable(this,options);
		var table = t.createTable();
		$(t.options.id).append(table);
	}
	
	//私有方法
	function getHead(fields){
		var thead = $('<thead></thead>');
		var tr = $('<tr></tr>');
		for(var i=0;i<fields.length;i++){
			tr.append('<th>'+fields[i].name+'</th>');
		};
		tr.append('<th>操作</th>');
		thead.append(tr);
		return thead;
	}
	
	function getTbody(list){
		var tbody = $('<tbody></tbody>');
		tbody.empty();
		for(var i=0;i<list.length;i++){
			var tr = $('<tr></tr>');
			var index = parseInt(i) + 1;
			tr.append('<td>'+index+'</td>');
			for(var key in list[i]){
				tr.append('<td>'+list[i][key]+'</td>');
			}
			var td = getTd(list[i]);
			tr.append(td);
			tbody.append(tr);
		};
		return tbody;
	}
	
	function getTd(data){
		var id = data.id;
		var td = null;
		if(typeof checkbox == 'undefined'){
			td = $(
				'<div>'+
					'<ul class="list-inline">'+
						'<li><span class="fa fa-pencil"></span></li>'+
						'<li><span class="fa fa-remove"></span></li>'+
					'</ul>'+
				 '</div>'
			);
		} else {
			td = $(
					'<div>'+
						'<ul class="list-inline">'+
							'<li data-id='+id+'><span class="fa fa-pencil"></span></li>'+
							'<li data-id='+id+'><span class="fa fa-remove"></span></li>'+
						'</ul>'+
					 '</div>'
				);
		}
		return td;
	}
	
})(jQuery)