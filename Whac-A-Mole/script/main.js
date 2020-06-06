$(game => {
    let line = 4,
        row = 4;

    function clears() {
        data = data.split('\n');
        for (let i = 0; i < data.length; i++) {
            data[i] = $.trim(data[i]);
            if (!data[i]) {
                data.splice(i, 1);
                i--;
            };
        };
    }

    function dataCopy(value = data, type = []) {
        for (let i in value) type[i] = value[i];
        return type;
    }
    // 获取单词文本库

    function createMap(arr = []) {
        for (let l = 0; l < line; l++) {
            arr[l] = [];
            for (let r = 0; r < row; r++) arr[l].push({ click: false, text: '' });
        }
        return arr;
    }
    // 创建二维数组

    function newGroup(n = 0) {
        return {
            time: 0,
            integral: 0,
            endTime: 60,
            name: `Group ${n}`,
            errorList: []
        }
    }
    // 创建鼠标事件
    clears();
    window.game = new Vue({
        el: '#app',
        data: {
            row: row,
            line: line,
            word: '',
            table: [],
            number: 1,
            endTime: 1,
            retain: [],
            setname: '',
            fontSize: 50,
            hidItme: 1000,
            isword: false,
            gameset: true,
            interval: null,
            gamestart: true,
            max: data.length,
            group: newGroup(),
            textData: dataCopy(),
            map: new Array(line * row),
        },
        methods: {
            del(n) {
                this.table.splice(n, 1);
            },
            move(e) {
                this.$refs.cursor.style.top = `${e.pageY - this.$refs.cursor.offsetHeight / 2}px`;
                this.$refs.cursor.style.left = `${e.pageX - this.$refs.cursor.offsetWidth / 2}px`;
            },
            rotate(n) {
                this.$refs.cursor.style.transform = `rotate(-${n}deg)`;
            },
            save() {
                this.group.name = this.setname || this.group.name;
                this.table.push(dataCopy(this.group, {}));
            },
            fontClick(e) {
                this.word = e;
                this.isword = true;
                this.gameset = true;
            },
            gameover() {
                if (this.textData.length) this.surplus();
                clearInterval(this.interval);
                this.gameset = false;
                this.gamestart = true;
                this.save();
            },
            // 游戏结束执行
            surplus() {
                this.breaks();
                for (let i of this.textData) this.group.errorList.push(i);
                this.textData = [];
            },
            // 剩余管理
            time() {
                this.group.time++;
                if (this.group.time >= this.group.endTime) this.gameover();
            },
            // 计时器
            getData() {
                if (!this.textData.length) this.gameover();
                return this.textData.splice(Math.floor(Math.random() * this.textData.length), 1)[0] || '';
            },
            // 获取数据里的词并且删除
            strike(self, n) {
                if (!this.map[n]) {
                    this.map[n] = true;
                    this.group.integral++;
                    this.$refs.audio.cloneNode().play();
                    this.down($(self));
                    this.random();
                }
            },
            // 击打时候
            up(el) {
                el = $(el);
                el.show(500);
                return el;
            },
            // 产生时动画
            breaks() {
                this.group.errorList.push(this.retain[0].txt);
                this.down(this.retain[0].el);
            },
            // 跳过当前
            down(el) {
                el.slideDown(500);
                el.hide(500);
                this.retain.splice(0, 1);
            },
            // 点击动画产生
            random(num = Math.floor(Math.random() * this.$refs.g.length)) {
                this.map[num] = false;
                this.retain.push({
                    el: this.up(this.$refs.g[num]),
                    txt: this.$refs.txt[num].innerText = this.getData()
                });
            },
            // 随机生成
            setGroup() {
                this.group = newGroup(this.number++);
                this.group.endTime = this.endTime * 60;
                if (this.setname) this.group.name = this.setname;
            },
            // 设置组
            start() {
                this.interval = setInterval(this.time, 1000);
                this.retain.forEach(e => this.down(e.el));
                this.textData = dataCopy();
                this.gamestart = false;
                this.gameset = false;
                this.setGroup();
                this.random();
            }
        }
    });
});