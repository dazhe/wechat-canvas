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
Page({
     onReady: function (e) {
        // 获取绘图上下文 context
        var context = wx.createContext();
        // 设置描边颜色
        context.setStrokeStyle("#7cb5ec");
        // 设置线宽
        context.setLineWidth(4);

        context.moveTo(50, 70);
        context.lineTo(70, 150);
        context.lineTo(120, 30);
        context.lineTo(130, 120);
        context.lineTo(140, 150);
        context.lineTo(150, 95);
        // 对当前路径进行描边
        context.stroke();

        context.beginPath();
        // 设置描边颜色
        context.setStrokeStyle("#ffffff");
        // 设置填充颜色
        context.setFillStyle("#7cb5ec");
        context.moveTo(50 + 7, 70);
        // 绘制圆形区域
        context.arc(50, 70, 8, 0, 2 * Math.PI, false);

        context.moveTo(150 + 7, 150);
        context.arc(150, 150, 8, 0, 2 * Math.PI, false);
        context.closePath();
        // 填充路径
        context.fill();
        context.stroke();

        var opts = {
            width: 300,    // 画布区域宽度
            height: 400,   // 画布区域高度
            categories: ['2016-08', '2016-09', '2016-10', '2016-11', '2016-12', '2017']
        }
        var eachSpacing = Math.floor(opts.width / opts.categories.length);
        var points = [];
        // 起始点x坐标
        var startX = 0;
        // 起始点y坐标
        var startY = opts.height - 30;
        // 终点x坐标
        var endX = opts.width;
        // 终点y坐标
        var endY = opts.height;

        // 计算每个分类的起始点x坐标
        opts.categories.forEach(function(item, index) {
            points.push(startX + index * eachSpacing);
        });
        points.push(endX);

        // 绘制横坐标
        context.beginPath();
        context.setStrokeStyle("#cccccc");
        context.setLineWidth(1);

        // 绘制坐标轴横线
        context.moveTo(startX, startY);
        context.lineTo(endX, startY);
        // 绘制坐标轴各区块竖线
        points.forEach(function(item, index) {
            context.moveTo(item, startY);
            context.lineTo(item, endY);
        });
        context.closePath();
        context.stroke();

        context.beginPath();
        // 设置字体大小
        context.setFontSize(20);
        // 设置字体填充颜色
        context.setFillStyle('#666666');
        opts.categories.forEach(function(item, index) {
            var offset = eachSpacing / 2 - mesureText(item) / 2;
    context.fillText(item, points[index] + offset, startY + 28);
        });
        context.closePath();
        context.stroke();

        wx.drawCanvas({
            canvasId: 'testCanvas',
            actions: context.getActions()
        });
     }
})