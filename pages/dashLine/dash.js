// pages/dashLine/dash.js
function drawDashLine(context, x1, y1, x2, y2, dashLength){
    // context.beginPath();
    // // context.translate(0.5, 0.5);
    // context.setStrokeStyle("black");
    // context.setLineWidth(2);
      var dashLen = dashLength === undefined ? 5 : dashLength;
      var xpos = x2 - x1; //得到横向的宽度;
      var ypos = y2 - y1; //得到纵向的高度;
      var numDashes = Math.floor(Math.sqrt(xpos * xpos + ypos * ypos) / dashLen); 
      //利用正切获取斜边的长度除以虚线长度，得到要分为多少段;
      for(var i=0; i<numDashes; i++){
         if(i % 2 === 0){
             context.moveTo(x1 + (xpos/numDashes) * i, y1 + (ypos/numDashes) * i); 
             //有了横向宽度和多少段，得出每一段是多长，起点 + 每段长度 * i = 要绘制的起点；
          }else{
              context.lineTo(x1 + (xpos/numDashes) * i, y1 + (ypos/numDashes) * i);
          }
       }
    //   context.closePath();
    //   context.stroke();
    }
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
    var context = wx.createContext();
        // 设置描边颜色
        context.beginPath();
        context.setStrokeStyle("black");
        context.setLineWidth(2);
        console.log('绘制虚线');
        drawDashLine(context,30,110,260,110,5);
            
        context.closePath();
        context.stroke();
        wx.drawCanvas({
            canvasId: 'test',
            actions: context.getActions()
        });
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})