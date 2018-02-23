const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const fireworks = [];//装烟花的筒


class Firework {
    constructor(x, y, r, color, destination) {  //烟花的位置，半径，颜色,爆炸的地点，飞行的速度
        this.isDead = false;
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
        this.destination = destination;
        this.speedX = (destination.x - x) * 0.03;
        this.speedY = (destination.y - y) * 0.03;
        this.sparks = [];  //火花
        this.moveX = 0;  //运动距离
        this.targetX = destination.x - x;
    }
    paint() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
        ctx.save();
        ctx.fillStyle = "rgba(255,128,150,0.3)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r + 3 * Math.random() + 1, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
    }
    move() {                 //移动烟花
        if (Math.abs(this.moveX) > Math.abs(this.targetX)) {  //如烟花运动距离超过出发点与目标点间的距离
            this.isDead = true;
        } else {   //否则继续匀速运动
            this.x = this.x + this.speedX;
            this.y = this.y + this.speedY;
            this.moveX += this.speedX;
        }
    }
    
    explode() {
        const sparkNum = getRandom(100, 200);  //随机产生火花的数量
        const radius = getRandom(3, 4); //随机产生的火花半径
        for (let i = 0; i < sparkNum; i++) {
            const r = parseInt(getRandom(0,255)),
                  g = parseInt(getRandom(0,255)),
                  b = parseInt(getRandom(0,255));
            const color = `rgba(${r},${g},${b},1)`         //每一火花的颜色都随机
           
            const a = getRandom(-Math.PI, Math.PI);  //以爆炸点为圆心，360度内，半径为火花数量的园内随机一个位置为火花的最终位置
            const length = getRandom(0, sparkNum);
            const endX = length * Math.cos(a) + this.x;
            const endY = length * Math.sin(a) + this.y;
            const spark = new Firework(this.x, this.y, radius, color, { x: endX, y: endY }); //生成火花
            this.sparks.push(spark);
        }
    }

}

function getRandom(a, b) {   //获取随机数
    return Math.random() * (b - a) + a;
}

function animate() {
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    if (fireworks.length) {
        fireworks.forEach(function (firework, index) {
            if (firework.isDead === true) {
                if (!firework.sparks.length) {
                    firework.explode();
                } else {
                    firework.sparks.forEach(function (spark, index) {
                        if (spark.isDead === true) {

                            // fireworks.splice(indexOf(firework),1)
                        } else {
                            spark.paint();
                            spark.move();
                        }
                    })
                }
                // fireworks.splice(index,1);
            } else {
                firework.paint();
                firework.move();
            }
        })
    }
    requestAnimationFrame(animate);
}

// canvas.addEventListener('click',function() {
//     var endX = event.clientX;
//     var endY = event.clientY;
//     var fireworks = new Firework(getRandom(canvas.width/6,canvas.width*5/6), canvas.height,2, "#fff", {x: endX, y: endY});
//     fireworks.push(fireworks)
//   })
document.addEventListener('DOMContentLoaded', function () {

    let startX = getRandom(canvas.width / 6, canvas.width * 5 / 6);
    let startY = canvas.height;
    let endX = getRandom(canvas.width / 6, canvas.width * 5 / 6);
    let endY = getRandom(canvas.height / 5, canvas.height / 4);
    const firework = new Firework(startX, startY, 5, '#fff', { x: endX, y: endY });
    fireworks.push(firework);

    animate();
})