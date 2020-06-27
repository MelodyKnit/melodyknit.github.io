(() => {
    $.el = tag => $(document.createElement(tag));
    let vue = new Vue({
        el: '#view',
        data: {
            self: {
                logo: 'http://q1.qlogo.cn/g?b=qq&nk=2711402357&s=640'
            },
            webSite: webSite,
            main: webSite[0],
            error: false,
            value: null,
            tag: null,
            more: false,
            color: 'black',
            colorTwo: '#15202b'
        },
        methods: {
            bg({ url, color = 'white', size = '80%' }) {
                return {
                    background: `url(${url}) center center / ${size} no-repeat`,
                    backgroundColor: color
                }
            },
            el(e, name) {
                for (let i in e)
                    if (e[i].className == name) return e[i];
            },
            sw(e, i) {
                if (this.tag) this.tag.className = 'list';
                e = this.el(e.path, 'webSite');
                e = this.el(e.children, 'list');
                e.className = 'listTo';
                this.tag = e;
                this.main = i;
            },
            search(e) {
                e = this.value;
                if (e) {
                    e = `${this.main.url}${this.main.search}${e}`;
                    window.open(e);
                } else this.error = true;
            },
            bgcolor() {
                let attr = e => $('body').attr(e);
                this.color = attr('class') == 'black' ? 'white' : 'black';
                this.colorTwo = this.color == 'white' ? 'white' : '#15202b';
                attr({ class: this.color });
            }
        }
    });
    vue.bgcolor();
    date = new Date().getHours();
    if (date > 18 || date < 7) vue.bgcolor();
})()