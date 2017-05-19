/**
 * Created by DT274 on 2017/5/19.
 */
var Progress = function(opt) {
    this.option = this.extend({
        radius: 20,
        text: {
            font: "10px Arial",
            style: '#fff',
            alpha: 1
        },
        outSideCircle: {
            style: "#fff",
            alpha: 1,
            lineWidth: 2.5
        },
        inSideCircle: {
            style: "#fff",
            alpha: 0.3,
            lineWidth: 2
        }
    }, opt);

    this.el = this.option.element;
    this.context = this.el.getContext('2d');
    this.elWidth = this.el.width;
    this.elHeight = this.el.height;
    this.hElWidth = this.elWidth / 2;
    this.hElHeight = this.elHeight / 2;
};

Progress.prototype = {
    custructor: Progress,

    extend: function (tar, sub) {
        for(var key in sub){
            tar[key] = sub[key]
        }
        return tar;
    },

    /* 绘制圆形
    * @params  --> n  当前进度
    * */
    _drawCircle: function (n) {
        var option = this.option,
            context = this.context,
            PI = Math.PI,
            inSideCircle = option.inSideCircle,
            outSideCircle = option.outSideCircle;

        context.beginPath();
        //设置透明度，样式与线条宽度
        this.extend(context, {
            globalAlpha: inSideCircle.alpha,
            strokeStyle: inSideCircle.style,
            lineWidth: inSideCircle.lineWidth
        });

        //绘制圆
        context.arc(this.hElWidth, this.hElHeight, option.radius + outSideCircle.lineWidth - inSideCircle.lineWidth, 0, PI * 2, false)
        context.stroke();


        context.beginPath();
        this.extend(context, {
            globalAlpha: outSideCircle.alpha,
            strokeStyle: outSideCircle.style,
            lineWidth: outSideCircle.lineWidth
        });
        context.arc(this.hElWidth, this.hElHeight, option.radius, -(PI / 2), PI * 2 / 100 * (n - 25), false);
        context.stroke();
    },
    /* 绘制进度
     * @params  --> n  当前进度
     * */
    _drawText: function (n) {
        var context = this.context,
            number = n + '%',
            numberWidth = 0,
            textObj = this.option.text;

        context.beginPath();
        this.extend(context, {
            font: textObj.alpha,
            fillStyle: textObj.style,
            alpha: textObj.alpha
        });

        numberWidth = context.measureText(number).width;
        context.fillText(number, this.hElWidth - numberWidth / 2, this.hElHeight + 10 / 3)
    },
    setProgress: function (n) {
        this.context.clearRect(0, 0, this.elWidth, this.elHeight);

        this._drawCircle(n);
        this._drawText(n);
    }

};