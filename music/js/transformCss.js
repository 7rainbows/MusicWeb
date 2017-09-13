(function(w){
	
	w.transformCss = function (node,name,value){
			if(!node.aaa){			
				node.aaa = {}; //只执行一次
			};
					
			if(arguments.length > 2){
				//写
				//把名值对塞到对象中
				node.aaa[name] = value;				
				var result = '';
				
				//遍历对象中每一个属性 for in
				for(var item in node.aaa){
					switch (item){
						case 'translate':
						case 'translateX':
						case 'translateY':
						case 'translateZ':
							result += item +'('+ node.aaa[item] +'px) ';							
							break;
						case 'scale':
						case 'scaleX':
						case 'scaleY':
							result +=  item +'('+ node.aaa[item] +') ';
							break;
						case 'rotate':
						case 'skew':
						case 'skewX':
						case 'skewY':
							result += item +'('+ node.aaa[item] +'deg) ';
							break;
					};					
				};				
				//结果
				node.style.transform = result;
				
			}else{
				//读
				
				//默认情况
				if(typeof node.aaa[name] == 'undefined'){
					if(name == 'scale' || name == 'scaleX' || name == 'scaleY'){
						value = 1;
					}else{
						value = 0;
					};
					
				}else{
					//正常情况
					value = node.aaa[name];
				};
				
				return value;
			};
			
		};
		
})(window);




