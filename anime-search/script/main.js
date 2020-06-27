$.el = tag => $(document.createElement(tag));
var vue = new Vue({
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
    },
    methods: {
        bg(url, color) {
            return {
                background: `url(${url}) center center / 80% no-repeat`,
                backgroundColor: color || 'white'
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
            let color = attr('class') == 'black' ? 'white' : 'black';
            attr({ class: color });
            $(this.$refs.bg).css(this.bg(`image/${color}.png`, color));
        }
    }
});
vue.bgcolor();
let date = new Date().getHours()
if (date > 18 || date < 7) vue.bgcolor();