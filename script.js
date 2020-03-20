class Links {
    constructor(node) {
        this.canvas = document.createElement('canvas');
        this.canvas.width = node.offsetWidth;
        this.canvas.height = node.offsetHeight;
        node.appendChild(this.canvas);
        this.c = this.canvas.getContext('2d');
        this.onmousemove(this.canvas.width / 2, this.canvas.height / 2);
        this.number = this.canvas.width > this.canvas.height ? this.canvas.width : this.canvas.height
        this.dot = new Array(parseInt(this.number / 2))
        class AnimeDot {
            constructor(c, r, wh) {
                this.color = 'rgb(' + Math.random() * 200 + ',' + Math.random() * 200 + ',' + Math.random() * 1000 + ' )'
                this.h = wh.height;
                this.w = wh.width;
                this.rr = Math.random() * 100;
                this.c = c;
                this.r = r;
                this.srr = 0.004;
            }
            rmoves() {
                this.rx = Math.cos(this.rr) * this.r;
                this.ry = Math.sin(this.rr) * this.r;
                this.srr += 0.001
                this.rr += Math.cos(this.srr) / 80
                this.create();
            }
            create() {
                this.c.beginPath();
                this.c.arc(this.x + this.rx, this.y + this.ry, this.r / 100, 0, Math.PI * 2, false);
                this.c.fillStyle = this.color;
                this.c.fill();
            }
            anime(x, y) {
                this.x = x;
                this.y = y;
                this.rmoves()
            }
        }
        for (let i = 0; i < this.dot.length; i++) this.dot[i] = new AnimeDot(this.c, Math.random() * this.number, this.canvas);
    }
    animes() {
        this.c.fillStyle = 'rgba(0,0,0,0.05)';
        this.c.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.dot.forEach(e => { e.anime(this.x, this.y); })
    }
    onmousemove(x, y) {
        this.x = x;
        this.y = y;
    }
}