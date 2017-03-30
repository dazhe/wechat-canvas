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
//动态画柱状图 
function drawDDynamicLine(context,x,y,x1,y1,width,color,timer){  
    var temp=y; 
    setInterval(function(){
        if(temp<y1){
            drawLine(context,x,temp,y1,temp+1,width,color);
            temp++;
        }
    },timer);  
}  
function drawCanvas(context,datas,startX,startY,eachSpacing_x,eachSpacing_y,end_x,points){
         //动态确定y轴的最大值,y轴的间距为100
         var yRange=0;
         //x轴的间距为1,绘制x轴
         var points = [];
         var points_jj = [];
         var points_gw = [];
         var points_td = [];
        // 终点y坐标
        // 计算每个分类的起始点x坐标
        datas.forEach(function(item, index) {        
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
        //绘制虚线
        
}
Page({
    data:{
        points1:[],
        points2:[],
        colors:['#FF83FA','#E0FFFF','#8EE5EE'],
        eachSpacing_x:30,
        eachSpacing_y:40,
        endX :280,
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
        drawLine(context,30,30,80,80,2,"#FF83FA");
        // 设置描边颜色
        context.setStrokeStyle("#7cb5ec");
         var datas=[{date:'0301',jj:123,gw:56,td:23},
         {date:'0302',jj:78,gw:45,td:8},
         {date:'0303',jj:86,gw:32,td:12},
         {date:'0304',jj:56,gw:21,td:11},
         {date:'0305',jj:69,gw:34,td:9},
         {date:'0306',jj:74,gw:32,td:13},
         {date:'0307',jj:45,gw:12,td:7}];
         //动态确定y轴的最大值,y轴的间距为100
         var yRange=0;
         //x轴的间距为1,绘制x轴
         var points = [];
         var points_jj = [];
         var points_gw = [];
         var points_td = [];
        // 起始点x坐标
        var startX = 30;
        // 起始点y坐标
        var startY =150;
        // 终点x坐标
        var endX =280;
        // 终点y坐标
        var eachSpacing_x=30;
        var eachSpacing_y=40;//100
        // 计算每个分类的起始点x坐标
        datas.forEach(function(item, index) {        
            points.push(startX + (index +1)* eachSpacing_x)     
            points_jj.push(150-item.jj*eachSpacing_y/100);
            points_gw.push(150-(item.jj+item.gw)*eachSpacing_y/100);
             points_td.push(150-(item.jj+item.gw+item.td)*eachSpacing_y/100);
             if(yRange<(item.jj+item.gw+item.td)){
                 yRange=item.jj+item.gw+item.td;
             }
        });
        //points.push(endX);
        if(yRange%100!=0){
             yRange=(Math.floor(yRange/100)+1)*100;
        }


        var endY =150- (yRange/100)*eachSpacing_y;
        // 绘制横坐标
        context.beginPath();
        context.setStrokeStyle("#cccccc");
        context.setLineWidth(2);

        // 绘制坐标轴横线
        context.moveTo(startX, startY);
        context.lineTo(endX, startY);
        // 绘制坐标轴纵线
        context.moveTo(startX, startY);
        context.lineTo(startX, endY);
        // 绘制坐标轴各区块竖线
        // points.forEach(function(item, index) {
        //     context.moveTo(item, startY);
        //     context.lineTo(item, endY);
        // });
        context.closePath();
        context.stroke();
        //绘制柱状图----经济舱
        context.beginPath();
        context.setStrokeStyle("#FF83FA");
        context.setLineWidth(12);
        for(var i=0;i<datas.length;i++){
            context.moveTo(points[i]+i*3, startY);
            context.lineTo(points[i]+i*3, points_jj[i]);
        }
        context.closePath();
        context.stroke();
         //绘制柱状图----公务舱
        context.beginPath();
        context.setStrokeStyle("yellow");
        context.setLineWidth(12);
        for(var i=0;i<datas.length;i++){
            context.moveTo(points[i]+i*3, points_jj[i]);
            context.lineTo(points[i]+i*3, points_gw[i]);
        }
        context.closePath();
        context.stroke();
         //绘制柱状图----头等舱
        context.beginPath();
        context.setStrokeStyle("green");
        context.setLineWidth(12);
        var x_text=[];
        var y_text=[];
        for(var i=0;i<datas.length;i++){
            context.moveTo(points[i]+i*3, points_gw[i]);
            context.lineTo(points[i]+i*3, points_td[i]);
            x_text.push(points[i]+i*3-mesureText(datas[i].date) /2+9);
            if(i<=(yRange/100)){
                console.log('yRange/100:'+yRange/100);
                console.log(startY-eachSpacing_y*i);
                y_text.push(startY-eachSpacing_y*i);
            }
            
        }
        context.closePath();
        context.stroke();
        //绘制横轴文本
        context.beginPath();
        // 设置字体大小
        context.setFontSize(12);
        // 设置字体填充颜色
        context.setFillStyle('black');
        datas.forEach(function(item, index) {
            //var offset = eachSpacing_x / 2 - mesureText(item.date) / 2-3;
    context.fillText(item.date, x_text[index] , startY + 20);
        });
        context.closePath();
        context.stroke();
        //绘制纵轴
        context.beginPath();
        // 设置字体大小
        // context.font = "Bold 20px Arial";
        context.setFontSize(12);
        // 设置字体填充颜色
        context.setFillStyle('black');
         context.textAlign = "right";
        y_text.forEach(function(item, index) {
            context.fillText(index*100, startX- 20 , item+3);
        });
        context.closePath();
        context.stroke();

        context.beginPath();
        context.setStrokeStyle("black");
        context.setLineWidth(2);
        y_text.forEach(function(item, index) {
            //绘制虚线
            if(index>0){
                console.log('绘制虚线');
                drawDashLine(context,startX,150-index*eachSpacing_y,endX,150-index*eachSpacing_y,5);
            }
        });
        context.closePath();
        context.stroke();
        wx.drawCanvas({
            canvasId: 'test',
            actions: context.getActions()
        });

        //绘制解释
        context=null;
        context = wx.createContext();
        context.beginPath();
        var colors=this.data.colors;
        var plain=['经济舱','公务舱','头等舱'];
        plain.forEach(function(item,index){
            /*设置填充颜色*/ 
            context.setFillStyle(colors[index]);
            context.fillRect(50+index*70,50,10,10);
            context.beginPath();
            context.setFontSize(12);
            // 设置字体填充颜色
            context.setFillStyle('black');
            context.fillText(item, 50+index*70+20, 60);
        });
        wx.drawCanvas({
            canvasId: 'test1',
            actions: context.getActions()
        });
        this.setData({
                points1:points
            });
     }
})