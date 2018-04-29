var log = console.log;
//这些例子都来自高程三
// var color = "blue" ;
//     function changeColor(){
//          if (color === "blue" ) {
//             color = "red" ;
//          } else {
//             color = "blue" ;
//          }
//     }
//     changeColor() ;
// log("Color is now"+color) ;
//这个简单的例子中，函数changeColor()的作用域链包含两个对象：它自己的变量对象（其中定义着arguments对象）
//和全局环境的变量对象。可以再函数内部访问变量color，就是因为可以在作用域链中找到它。
//这里还有一个标识符查询的过程，首先在changeColkor函数中找color变量，找不到沿作用域链往上查找，找到全部变量color

//此外，在局部作用域中定义的变量可以,再局部环境中与全局变量互换使用。如下：
// var color = "green" ;
// function changeColor () {
//     var anotherColor = "red" ;
//     function swapColors () {
//         var tempColor = anotherColor ; //red

//             anotherColor = color ; //green
//             color = tempColor ;   //red
//     }
//     swapColors () ;
// }
//     // swapColors () ;
// changeColor() ;
// alert ("Color is now"+color) ;
//以上代码共涉及三个执行环境：全局环境、changeColor()的局部环境和swapColors()的局部环境。全局环境
//中有一个变量color和一个函数changeColor()。changeColor()的局部环境中有一个名为anotherColor的变量和
//一个名为swapColor()的函数。但它也可以访问全局环境中的变量color。swapColors()的局部环境都无权访问
//tempColor,该变量只能在这个环境中访问到。但它可以访问其他两个环境中的所有变量。因为那两个环境是它的父执行环境。


//最后再去做一个简单的标识符查询的例子：
// var name='angle';
// var now =new Date();
// function test(){
//     // var now=[1,2,3,4,5,6];
//     log(now);
//     function innerTest(){
//         var img ='这是一张图片';
//         log(name);
//     }
//     log(img);
//     //这里会报错。
//     innerTest();
// }
// test();
//总结：
//内部环境可以通过作用域链访问所有的外部环境，但外部环境不能访问内部环境中的任何变量和函数，这些
//环境之间的联系是线性、有次序的。每个环境都可以向上搜索作用域链，以查询变量和函数名。但任何环境都
//不能通过向下搜索作用域链而进入另一个执行环境
//像上面的例子：innerTest()这个变量对象搜索标识符（变量name)逐级向上查找
//但是在test()的这个执行环境中，搜索img变量则会失败。因为不能向下查找。







// 没有块级作用的表现

// for (var i = 0; i < 5; i++) {
//     log(i);
// }
// log(i);
// if (true) {
//     var color = 'red';
// }
// log(color);


// es6的块级作用域,let实际上为javaScript添加了块级作用域
// 例子一

// for(let m=1;m<5;m++){
//     log(m);
// }
// log(m);

//例子2


{
    // let name1 = 'jack';
    // log('内部' + name1);
    // 不用let时的效果
    // var name2 = 'yazhou';
    // log('内部' + name2);

}
// log('name1',name1)
// log('name2', name2)


//为什么要引入块级作用域？//第一种应用场景，防止内部变量影响外部变量
// a();
// function a(){
//     alert('1111');
// }

{
    //这里会被影响
    // var temp =new Date();
    // function f(){
    //     var temp;
    //     log(temp);
    //     if(false){
    //         var temp ='hello world';    
    //     }
    // }
    // f();
    //let生成的块级作用域不会受影响

    // var temp1 =new Date();
    // function f(){
    //     log(temp1);
    //     if(false){
    //         let temp1 ='hello world';    
    //     }
    // }
    // f();

}

{
    //块级作用域的表现
    //1、允许任意多个块级作用域的嵌套
    { //第一层块级作用域
        { //第二层块级作用域
            {//第三层块级作用域
                { 
                    let name='yazhou';//最内层块级作用域
                }
            }
        }
    }   
    //2、内层作用域可以定义外层作用域的同名变量，而且外层读不到内层作用域的变量

    // {
    //     let location ='shanghai';
    //     {
    //         let location = 'china';
    //         log(location);
    //     }
    // }
    // {
    //     {
    //         let location = 'china';
    //     }
    //     log(loacation); //外层作用域读取内层作用域会报错
    // }

    //3、让立即执行函数（IIFE）退休

    // (function(){
    //     var name4='kkk';
    // })();
 
    // log(name4);
     //这里会报错，因为在ES5中没有块级作用域，只能用立即执行函数来模仿块级作用域

    //块级作用域的写法
    // {
    //     let name4 ='aaa';
    //     log(name4);
    // }
    // log(name4);
    
}
//闭包能让全局环境中访问到函数内部的变量
{

    // function getName() {
    //     var name9 = "赵飞燕";
    //     console.log(name9);  //"美女的名字"
    //    }
    // function displayName() {
    //     console.log(name9); //报错
    // }
    // console.log(name9); 
    // getName();
    // displayName();
    //闭包却可以改变这个状态:

    // function close(){
    //     var name='杨玉环';
    //     return function(){
    //         return name+='和王昭君';
    //     }
    // }
    // var lastExample=close();
    // log(lastExample());

}