(function  (window) {
	window.dragEvent=function(navWrap,callBack) {
			/*var navWrap=document.getElementById('wrap');
			var navList=document.getElementById('content');
			*/
			
			var navList=conWrap.children[0];
			var height=document.documentElement.clientHeight;
			var eleY=0;
			var startY=0;
			var startX=0;
			
			
			var isfirst=true;
			var isY=true;
			
			
			var beginU=0;
			var beginTime=0;
			var endU=0;
			var endTime=0;
			var disU=0;
			var disTime=1;//disU=0;
			
			//返回值:每次运动达到的目标位置
			var Tween = {
				//中间状态---匀速
				Linear: function(t,b,c,d){ return c*t/d + b; },
				//两边回弹状态
				easeOut: function(t,b,c,d,s){
		            if (s == undefined) s = 1.70158;
		            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
		        }
			};

			var timer=0;
		
			
			navWrap.addEventListener('touchstart',function  (event) {
				var touch=event.changedTouches[0];
				clearInterval(timer);
				
				navList.style.transition='none'
				startX=touch.clientX;
				startY=touch.clientY;
				eleY=transformCss(navList,'translateY');
				
				beginU=eleY;
			    beginTime=new Date().getTime();
			    
			    if (callBack&&callBack['start']) {
			    	callBack['start']();
			    }
			    
			    
			    disU=0;//不然一上来先点击在不能滑动
			    
			    isfirst=true;
			    isY=true;
			});
			
			navWrap.addEventListener('touchmove',function(event){
				var touch=event.changedTouches[0];
				
				if(isY==false){
					return;
				}
				
				var endY=touch.clientY;
				var endX=touch.clientX;
				var disY=endY-startY;
				var disX=endX-startX;
				var translateY=disY+eleY;
				var minY=height-navList.offsetHeight;
				
				//防抖动
				if (isfirst) {
					isfirst=false;
				 	if(Math.abs(disX)>Math.abs(disY)){
					   isY=false;
					   return;
					}
				}
				
				//橡皮筋
				var scale=0;
				if (translateY>0) {
					scale=1-translateY/height;
					translateY=translateY*scale;
				} else if(translateY<minY){
					var over=minY-translateY;
					scale=1 - over/height;
					
					translateY=minY-over*scale;
				};
				
				transformCss(navList,'translateY',translateY);
				transformCss(navList,'translateZ',0.1);
				
				endU=translateY;
				endTime=new Date().getTime();
				disU=endU-beginU;
				disTime=endTime-beginTime;
				
				if (callBack&&callBack['move']) {
					callBack['move']();
				}
				
				
				
			})

			
			navWrap.addEventListener('touchend',function  (event) {
				var touch=event.changedTouches[0];
				var speed=disU/disTime;
				var target=transformCss(navList,'translateY')+speed*300;

				var minY=height-navList.offsetHeight;
				//范围限定，橡皮筋回弹
				var type='Linear';
				if(target>0){
					target=0;
					type='easeOut';
				}else if(target<minY){
					target=minY;
					type='easeOut';
				};
				var time=2;
				moveTween(type,target,time)	;
 			   
			})//end
			
			function moveTween(type,target,time){
 				//当前次数
				var t=0;
				//元素初始位置
				var b=transformCss(navList,'translateY');
				//结束位置与初始位置的距离差
				var c=target-b;
				//总次数
				var d=time/0.02;
				
				clearInterval(timer);
				timer=setInterval(function(){
					t++;
					if(t>d){
						clearInterval(timer);
						if (callBack&&callBack['end']) {
							callBack['end']();
						}
						
					}else{
						var point=Tween[type](t,b,c,d);
						transformCss(navList,'translateY',point);
						if (callBack&&callBack['move']) {
							callBack['move']();
						}
						
					};
					
					
					
				},20);
				
				
				
			}



		};
})(window)




		