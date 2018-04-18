function random (arr,num){
    var length =arr.length,
        copy=[],
        value=length-num,
        index,
        shuffed;
        while(length-- >value){
            index=Math.floor(Math.random()*length);
            shuffed=arr[index];
            arr.splice(index,1);
            copy.push(shuffed);
        }
        return copy;
}


//你好
function random(arr,number){
    var length =arr.length,
        copy=arr.slice(0),
        value=length-number,
        shuffed,
        shit;
        while(length-- >value){
            shit=Math.floor(Math.random()*length);
            shuffed=copy[shit];
            copy[shit]=copy[length];
            copy[length]=shuffed;
        }
    return copy.splice(value);
}

//颜色随机
    
function bg() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}
    //颜色随机2
    function bg(){
        var value=0xffffff+1;
        return '#'+(Math.floor(Math.random()*value).toString(16));
    }
    //颜色随机3 hsl,hue色调，starution饱和度，lightness亮度,这里使用hsl值，来取颜色，浏览器支持性较好。
    //注意%数值，是一个字符串，而且
    function bg3(){
        var h=Math.floor(Math.random()*361);
        var s=Math.floor(Math.random()*101)+'%';
        var l=Math.floor(Math.random()*101)+'%';
        return 'hsl(' + h + ','+s + ',' +l +')' ; 
    }
    //第四种颜色的选择用数组，放16进制颜色。原理是随机从数组里抽取六个
   var color=[0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'];
   function bg4(arr){
       //定义长度和颜色字符串
       var length =color.length,
           colorstr='#';
        //使用for循环添加字符串
       for(var i=0;i<6;i++){
           var value = Math.floor(Math.random()*length);
           colorstr+=color[value];
       }
       return colorstr;
   }
//第五种颜色随机方法使用了闭包加三元操作简化了第四种颜色随机的
function bg5(){
    return '#'+(function(color){
        return (color+='0123456789abcdef'[Math.floor(Math.random()*16)])&& (color.length ==6)?
        color:arguments.callee(color);
    })('');
}
//第六种颜色随机方法
function bg(){
    return (function(math,color,num){
        return (num?arguments.callee(math,color,--num):'#')
        + color[math.floor(math.random()*16)];
    })(Math,'0123456789abcdef',6)
}
log(bg());