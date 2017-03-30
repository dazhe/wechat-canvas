function mesureText(text) {
    var text = text.split('');
    var width = 0;
    text.forEach(function(item) {
        if (/[a-zA-Z]/.test(item)) {
            width += 14;
        } else if (/[0-9]/.test(item)) {
            width += 11;
        } else if (/\./.test(item)) {
            width += 5.4;
        } else if (/-/.test(item)) {
            width += 6.5;
        } else if (/[\u4e00-\u9fa5]/.test(item)) {
            width += 20;
        }
    });
    return width;
}
function drawDashLine(context, x1, y1, x2, y2, dashLength,width,color){
      context.beginPath();
      context.setStrokeStyle(color);
      context.setLineWidth(width);
      var xpos = x2 - x1; //得到横向的宽度;
      var ypos = y2 - y1; //得到纵向的高度;
      var numDashes = Math.floor(Math.sqrt(xpos * xpos + ypos * ypos) / dashLength); 
      //利用正切获取斜边的长度除以虚线长度，得到要分为多少段;
      for(var i=0; i<numDashes; i++){
         if(i % 2 === 0){
             context.moveTo(x1 + (xpos/numDashes) * i, y1 + (ypos/numDashes) * i); 
             //有了横向宽度和多少段，得出每一段是多长，起点 + 每段长度 * i = 要绘制的起点；
          }else{
              context.lineTo(x1 + (xpos/numDashes) * i, y1 + (ypos/numDashes) * i);
          }
       }
      context.closePath();
      context.stroke();
    }
//画文本
function drawText(context,texts,x,y,size,color){
    context.beginPath();
    // 设置字体大小
    context.setFontSize(size);
    // 设置字体填充颜色
    context.setFillStyle(color);
    if(x instanceof Array){
        texts.forEach(function(item, index) {
        context.fillText(item, x[index] , y);
        });
    }
    if(y instanceof Array){
        texts.forEach(function(item, index) {
        context.fillText(item, x , y[index]);
        });
    }
    context.closePath();
    context.stroke();
}
//画线  
function drawLine(context,x,y,x1,y1,width,color){ 
    context.beginPath(); 
    context.setStrokeStyle(color);
    context.setLineWidth(width);  
    context.moveTo(x,y);  
    context.lineTo(x1,y1);  
    // context.closePath();  
    context.stroke(); 
    
}
//动态画柱状图 
function drawDynamicLine(context,x,y,x1,y1,width,color,timer){  
    var temp=y; 
    setTimeout(function(){
        if(temp>y1){
           drawLine(context,x,temp,x1,temp-1,width,color);
           wx.drawCanvas({
            canvasId: 'test',
            actions: context.getActions(),
            reserve:true
    });
            temp--;
            drawDynamicLine(context,x,temp,x1,y1,width,color,timer);
        }
    },timer);  
}  

function drawCanvas(context,datas,startX,startY,eachSpacing_x,eachSpacing_y,end_x,points,colors){
         //动态确定y轴的最大值,y轴的间距为100
         var yRange=0;
         //x轴的间距为1,绘制x轴
         var points = [];
         var points_jj = [];
         var points_gw = [];
         var points_td = [];
         var texts_x=[];
         var texts_y=[];
        // 终点y坐标
        // 计算每个分类的起始点x坐标
        datas.forEach(function(item, index) { 
            texts_x.push(item.date);       
            points.push(startX + (index +1)* eachSpacing_x)     
            points_jj.push(startY-item.jj*eachSpacing_y/100);
            points_gw.push(startY-(item.jj+item.gw)*eachSpacing_y/100);
             points_td.push(startY-(item.jj+item.gw+item.td)*eachSpacing_y/100);
             if(yRange<(item.jj+item.gw+item.td)){
                 yRange=item.jj+item.gw+item.td;
             }
        });
        if(yRange%100!=0){
             yRange=(Math.floor(yRange/100)+1)*100;
        }
        var endY =startY- (yRange/100)*eachSpacing_y;
        // 绘制横坐标
        drawLine(context,startX,startY,end_x,startY,2,"#cccccc");
         // 绘制纵坐标
        drawLine(context,startX,startY,startX,endY,2,"#cccccc");
        //绘制文本
        var x_text=[];
        var y_text=[];
        for(var i=0;i<datas.length;i++){
            x_text.push(points[i]+i*3-mesureText(datas[i].date) /2+9);
            if(i<=(yRange/100)){
                y_text.push(startY-eachSpacing_y*i+4);
            }
            
        }
        //绘制虚线
         y_text.forEach(function(item, index) {
             texts_y.push(index*100);
            if(index>0){
                drawDashLine(context,startX,startY-index*eachSpacing_y,end_x,startY-index*eachSpacing_y,5,2,"#6A5ACD");
            }
        });
        //绘制文本
        drawText(context,texts_x,x_text,startY+15,12,'black');
        drawText(context,texts_y,startX-20,y_text,12,'black');
        //绘制柱状图
       
             for(var i=0;i<datas.length;i++){
                drawDynamicLine(context,points[i]+i*3,startY,points[i]+i*3,points_jj[i],12,colors[0],5);
            }
        // drawColUpLine(context,points[0]+0*3,startY,startY-points_jj[0],12,'#FF83FA',5);
        
}
Page({
    data:{
        points1:[],
        colors:['#FF83FA','#E0FFFF','#8EE5EE'],
        eachSpacing_x:30,
        eachSpacing_y:40,
        endX :280,
        plain:['经济舱','公务舱','头等舱'],
        datas:[{date:'0301',jj:123,gw:56,td:23},
         {date:'0302',jj:78,gw:45,td:8},
         {date:'0303',jj:86,gw:32,td:12},
         {date:'0304',jj:56,gw:21,td:11},
         {date:'0305',jj:69,gw:34,td:9},
         {date:'0306',jj:74,gw:32,td:13},
         {date:'0307',jj:45,gw:12,td:7}]
    },
    detailClick:function(e){
        // console.log(e);
        // console.log(this.data.points1);
        console.log('x:'+e.detail.x);
        console.log('y:'+e.detail.y);
        this.data.points1.forEach(function(item,index){
            item+=index*3;
            if(item>=e.detail.x-5&&item<=e.detail.x+5){
                console.log("我被点中了："+index);
            }
            
        });
    },
     onLoad: function (e) {
        // 获取绘图上下文 context
        var context = wx.createContext();
        drawCanvas(context,this.data.datas,30,350,this.data.eachSpacing_x,this.data.eachSpacing_y,this.data.endX,this.data.points1,this.data.colors);
        wx.drawCanvas({
            canvasId: 'test',
            actions: context.getActions()
        });
     }
    
})