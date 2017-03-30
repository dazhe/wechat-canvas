//动态画向上竖线  
function drawColUpLine(context,startX,startY,length,width,color,timer){  
    
    if(length==0){
        return;
    }else{
        context.beginPath(); 
        context.setStrokeStyle(color);
        context.setLineWidth(width); 
        setTimeout(function(){ 
            context.moveTo(startX,startY);  
            context.lineTo(startX,startY-40);  
            // context.closePath();  
            context.stroke(); 
            wx.drawCanvas({
                canvasId: 'test',
                actions: context.getActions(),
                reserve:true
            });
           drawColUpLine(context,startX,startY,length-1,width,color,timer);  
        },timer); 
        // context.closePath();  
        context.stroke();
    }
      
}  

//画线  
function drawLine(context,x,y,x1,y1,width,color){ 
    context.beginPath(); 
    context.setStrokeStyle(color);
    context.setLineWidth(width);  
    context.moveTo(x,y);  
    context.lineTo(x1,y1);  
    context.closePath();  
    context.stroke();  
}
Page({
   
     onLoad: function (e) {
        // 获取绘图上下文 context
        var sleep = function (time) {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    resolve();
                    console.log(123)
                }, time);
            })
        };
        sleep(1000)
        console.log(234)
        // var start = async function () {
        //     // 在这里使用起来就像同步代码那样直观
        //     console.log('start');
        //     await sleep(3000);
        //     console.log('end');
        // };

        // start();
        var context = wx.createContext();
        var temp=120;
        // setTimeout(function(){
        //         if(temp>80){
        //             var context = wx.createContext();
        //             context.beginPath(); 
        //             context.setStrokeStyle('#FF83FA');
        //             context.setLineWidth(2);  
        //             context.moveTo(12,120);  
        //             context.lineTo(12,temp--);  
        //             context.closePath();  
        //             context.stroke();
        //             wx.drawCanvas({
        //                 canvasId: 'test',
        //                 actions: context.getActions(),
        //                 reserve:true
        //             });
        //         }
                
        //     },500);
        // for(var i=0;i<5;i++){
        //     setTimeout(function(){
        //         if(temp>80){
        //             var context = wx.createContext();
        //             context.beginPath(); 
        //             context.setStrokeStyle('#FF83FA');
        //             context.setLineWidth(2);  
        //             context.moveTo(12,120);  
        //             context.lineTo(12,temp--);  
        //             context.closePath();  
        //             context.stroke();
        //             wx.drawCanvas({
        //                 canvasId: 'test',
        //                 actions: context.getActions(),
        //                 reserve:true
        //             });
        //         }
                
        //     },5000);
        // }
        
        // for(var j=0;j<4;j++){
        //     for(var i=0;i<100;i++){
        // //     // drawColUpLine(context,12+i*30,250,30,12,'#FF83FA',5);
        // //     // console.log(12+i*30);
        //     setTimeout(function(){
        //         if(temp>80){
        //             var context = wx.createContext();
        //             context.beginPath(); 
        //             context.setStrokeStyle('#FF83FA');
        //             context.setLineWidth(2);  
        //             context.moveTo(12+j*10,120);  
        //             context.lineTo(12+j*10,temp--);  
        //             context.closePath();  
        //             context.stroke();
        //             wx.drawCanvas({
        //                 canvasId: 'test',
        //                 actions: context.getActions(),
        //                 reserve:true
        //             });
        //         }
                
        //     },5000);
           
        // }
        // // setTimeout(function(){
        // //         var context = wx.createContext();
        // //         context.beginPath(); 
        // //         context.setStrokeStyle('#FF83FA');
        // //         context.setLineWidth(2);  
        // //         context.moveTo(12+1*10,120);  
        // //         context.lineTo(12+1*10,temp--);  
        // //         context.closePath();  
        // //         context.stroke();
        // //         wx.drawCanvas({
        // //             canvasId: 'test',
        // //             actions: context.getActions(),
        // //             reserve:true
        // //         });
        // //     },500);
        // }
    //   drawColUpLine(context,12,250,30,12,'#FF83FA',5000);
    //    for(var i=0;i<7;i++){
           
    //        setTimeout(function(){
    //         drawColUpLine(context,12+i*30,250,30,12,'#FF83FA',1000)},5000);
    //    }
       for (var i = 0; i <= 3; i++) {  
            (function (idx) {  
                setTimeout(function () {
                    console.log(idx)
                    // drawColUpLine(context,12+idx*30,250,30,12,'#FF83FA',0);  
                    console.log('画图结束'+idx)
                }, 5000);  
            })(i);  
        } 
        wx.drawCanvas({
            canvasId: 'test',
            actions: context.getActions(),
             reserve:true
        });
     }
    
})