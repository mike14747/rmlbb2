const sizeList = [
    {
        title: 'X-Small',
        size: 'var(--step--2)',
    },
    {
        title: 'Small',
        size: 'var(--step--1)',
    },
    {
        title: 'Default Size',
        size: 'var(--step-0)',
    },
    {
        title: 'Large',
        size: 'var(--step-1)',
    },
    {
        title: 'X-Large',
        size: 'var(--step-2)',
    },
];

const customFontSize = {
    name: 'fontSize',
    display: 'submenu',
    add: function (core, targetElement) {
        const context = core.context;
        context.fontSize = {
            targetText: targetElement.querySelector('.txt'),
            _sizeList: null,
            currentSize: '',
        };

        let listDiv = this.setSubmenu(core);
        let listUl = listDiv.querySelector('ul');

        listUl.addEventListener('click', this.pickup.bind(core));
        context.fontSize._sizeList = listUl.querySelectorAll('li button');

        core.initMenuTarget(this.name, targetElement, listDiv);

        listDiv = null, listUl = null;
    },
    setSubmenu: function (core) {
        const lang = core.lang;
        lang.toolbar.fontSize = 'Size';
        const listDiv = core.util.createElement('DIV');

        listDiv.className = 'se-submenu se-list-layer se-list-font-size';

        let list = '<div class="se-list-inner">' + '<ul class="se-list-basic">';
        for (let i = 0, title, size; i < sizeList.length; i++) {
            size = sizeList[i].size;
            title = sizeList[i].title;
            list += '<li><button type="button" class="se-btn-list" data-title="' + title + '" data-size="' + size + '" data-value="' + size + '" title="' + title + '" style="font-size:' + size + ';">' + title + '</button></li>';
        }
        list += '</ul></div>';

        listDiv.innerHTML = list;

        return listDiv;
    },
    active: function (element) {
        if (!element) {
            this.util.changeTxt(this.context.fontSize.targetText, this.hasFocus && 'Default Size');
        } else if (element.style && element.style.fontSize.length > 0) {
            const title = sizeList[sizeList.findIndex((item) => item.size === element.style.fontSize)].title;
            this.util.changeTxt(this.context.fontSize.targetText, title);
            return true;
        }

        return false;
    },
    on: function () {
        const fontSizeContext = this.context.fontSize;
        const sizeList = fontSizeContext._sizeList;
        const currentSize = fontSizeContext.targetText.textContent;

        if (currentSize !== fontSizeContext.currentSize) {
            for (let i = 0, len = sizeList.length; i < len; i++) {
                if (currentSize === sizeList[i].getAttribute('data-value')) {
                    this.util.addClass(sizeList[i], 'active');
                } else {
                    this.util.removeClass(sizeList[i], 'active');
                }
            }

            fontSizeContext.currentSize = currentSize;
        }
    },
    pickup: function (e) {
        if (!/^BUTTON$/i.test(e.target.tagName)) return false;

        e.preventDefault();
        e.stopPropagation();

        const value = e.target.getAttribute('data-value');

        if (value) {
            const newNode = this.util.createElement('SPAN');
            newNode.style.fontSize = value;
            this.nodeChange(newNode, ['font-size'], null, null);
        } else {
            this.nodeChange(null, ['font-size'], ['span'], true);
        }

        this.submenuOff();
    },
};

export default customFontSize;
