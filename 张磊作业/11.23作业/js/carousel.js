(function(){
var oCarousel =document.querySelector("#carousel");
var oMoveUnit =document.querySelector("section");
var oMU_ul =document.querySelector("section ul");
var oImgLis =document.querySelectorAll("section ul li")
var imgLengh =oImgLis.length;	
	
var oLeftBtn =document.querySelector("#leftBtn");	
var oRightBtn =document.querySelector("#rightBtn");

var oCircles =document.querySelectorAll("footer ol li");

//常用量
var singleWidth =720;//一张图宽度
var animateTime =600;//动画过程时间
var tweenstyle ="Linear";//缓冲动画样式
var interval =2600;//每隔interval时间切换一次图片
var lock=false ;//节流控制 lock为true 时，是锁了不让点，为false时是开了可以点
var now =0;

oMU_ul.appendChild(oImgLis[0].cloneNode(true));//向图片ul中追加第一张图片

//类右按钮业务
function LeiRight(){
	if(oMoveUnit.isanimated)return;
	now++;
	changeCircle();
	animate(oMoveUnit,{'left':-singleWidth * now},animateTime,tweenstyle,function(){
		if(now > imgLengh - 1){
			now =0;
			this.style.left = 0;
		}
	} );
}
//自动播放
var timer =setInterval(LeiRight,interval);
//鼠标划上的时候停止
oCarousel.onmouseover =function(){
	clearInterval(timer)
};
//鼠标离开时继续
oCarousel.onmouseout =function(){
 timer =setInterval(LeiRight,interval);	
};

//右按钮的业务
   oRightBtn.onclick=LeiRight;

//左按钮业务
oLeftBtn.onclick=function(){
	if(oMoveUnit.isanimated)return;
	now--;
	if(now < 0){
			now =imgLengh - 1;
			oMoveUnit.style.left = -singleWidth*imgLengh+"px";
		}
	changeCircle();
	animate(oMoveUnit,{'left':-singleWidth * now},animateTime,tweenstyle);
};

for (var j=0 ;j<imgLengh;j++){
	(function (m){
		oCircles[m].onclick=function(){  //给小圆点批量添加点击事件,
			if(oMoveUnit.isanimated)return;
			                            //看是否在运动
			now = m;            //被点击的小圆点下标传给信号量，以便马上切换到对应小圆点合对应图片
			changeCircle();
			animate(oMoveUnit,{"left":-singleWidth*now},animateTime,tweenstyle);
		};
	})(j);	
};

//小圆点业务改变
function changeCircle(){
	var n =now;           //保存信号量
	if(n == imgLengh ){ //当n取到总个数时，也就是6，让n =0
		n = 0;
	};
	for(var i =0 ;i < imgLengh;i++){
		oCircles[i].className ="";
	};
	//给对应的圆点加上cur类名
	oCircles[n].className ="cur";
};


})();


