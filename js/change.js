var main=document.getElementById('main');
// var oLis=document.getElementById('list').getElementsByTagName('li');
var  oLis = document.querySelectorAll("#list li") 
var winH=document.documentElement.clientHeight;


init();
slidePage();
//设置main的高度，其高度等于当前设备的高度
function init(){
    main.style.height=winH+'px';
    main.style.width='100%';
    //解除touchmove默认行为
    document.addEventListener('touchmove',function(e){
        e.preventDefault();
    },false);
    /*默认第一页动画开始*/
    oLis[0].firstElementChild.id='a0';
}
//滑屏
function slidePage(){
    //绑定事件
    [].forEach.call(oLis,function(){
        var oLi=arguments[0];
        oLi.index=arguments[1];
        oLi.addEventListener("touchstart", start, false);
        oLi.addEventListener("touchmove", move, false);
        oLi.addEventListener("touchend", end, false);
    });

    //touchstart
    function start(e){
        this['startY']= e.touches[0].pageY;
    }
    function move(e){
        console.log(e)
        this['endY']= e.touches[0].pageY;
        //获得移动的距离
        var pos=this.endY-this.startY;
        //根据距离判断上下滑动
        var nindex=this.index;
         
        //控制当前li的z-index和当前li显示为block，其余为none
        [].forEach.call(oLis,function(){
            arguments[0].className='';
            if(arguments[1]!=nindex){
                arguments[0].style.display='none';
            }
        });

        if(pos>0){//下
            this.preIndex=(nindex==0?oLis.length-1:nindex-1);
            var duration=-winH+pos;
        }else if(pos<0){//上
            this.preIndex=(nindex==oLis.length-1?0:nindex+1);
            //总平移距离
            var duration=winH+pos;
        }

        //页面切换效果
        oLis[nindex].style.webkitTransform='scale('+(1-Math.abs(pos)/winH*1/2)+') translate(0,'+pos+'px)';
        oLis[this.preIndex].style.webkitTransform='translate(0,'+duration+'px)';
        oLis[this.preIndex].style.webkitTransition='0.5s';
        oLis[this.preIndex].style.display='block';
        oLis[this.preIndex].className='zIndex';

    }
    /*滑动结束*/
    function end(){
        oLis[this.preIndex].style.webkitTransform='translate(0,0)';
        oLis[this.preIndex].style.webkitTransition='0.5s';
        /*切换页面时开启动画*/
        [].forEach.call(oLis,function(item){
            item.firstElementChild.id='';
        });
        oLis[this.preIndex].firstElementChild.id='a'+this.preIndex;
    }

}