// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
// e.x. data-da=".item,992,2"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

"use strict";

function DynamicAdapt(type) {
	this.type = type;
}

DynamicAdapt.prototype.init = function () {
	const _this = this;
	// массив объектов
	this.оbjects = [];
	this.daClassname = "_dynamic_adapt_";
	// массив DOM-элементов
	this.nodes = document.querySelectorAll("[data-da]");

	// наполнение оbjects объктами
	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(dataArray[0].trim());
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	}

	this.arraySort(this.оbjects);

	// массив уникальных медиа-запросов
	this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});

	// навешивание слушателя на медиа-запрос
	// и вызов обработчика при первом запуске
	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];

		// массив объектов с подходящим брейкпоинтом
		const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	}
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.moveTo(оbject.place, оbject.element, оbject.destination);
		}
	} else {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			if (оbject.element.classList.contains(this.daClassname)) {
				this.moveBack(оbject.parent, оbject.element, оbject.index);
			}
		}
	}
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
	element.classList.add(this.daClassname);
	if (place === 'last' || place >= destination.children.length) {
		destination.insertAdjacentElement('beforeend', element);
		return;
	}
	if (place === 'first') {
		destination.insertAdjacentElement('afterbegin', element);
		return;
	}
	destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
	if (this.type === "min") {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return -1;
				}

				if (a.place === "last" || b.place === "first") {
					return 1;
				}

				return a.place - b.place;
			}

			return a.breakpoint - b.breakpoint;
		});
	} else {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return 1;
				}

				if (a.place === "last" || b.place === "first") {
					return -1;
				}

				return b.place - a.place;
			}

			return b.breakpoint - a.breakpoint;
		});
		return;
	}
};

const da = new DynamicAdapt("max");
da.init();;
function testWebP(callback) {

    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

    if (support == true) {
        document.querySelector('body').classList.add('webp');
    } else {
        document.querySelector('body').classList.add('no-webp');
    }
});
function ibg() {

    let ibg = document.querySelectorAll("._ibg");
    for (var i = 0; i < ibg.length; i++) {
        if (ibg[i].querySelector('img')) {
            ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
        }
    }
}

ibg();

// Выбирает самую большую высоту из массива и приравнивает высоту каждого элемента ей

function equalizeValues(className) {
    let items = document.querySelectorAll('.' + className);

    let theLargestHeight = items[0].offsetHeight;

    items.forEach(item => {
        if (theLargestHeight < item.offsetHeight) {
            theLargestHeight = item.offsetHeight;
        }
    });

    items.forEach(item => {
        item.style.minHeight = theLargestHeight + 'px';
    });
};
var __assign = this && this.__assign || function () { return (__assign = Object.assign || function (t) { for (var i, a = 1, n = arguments.length; a < n; a++)for (var s in i = arguments[a]) Object.prototype.hasOwnProperty.call(i, s) && (t[s] = i[s]); return t }).apply(this, arguments) }, CountUp = function () { function t(t, i, a) { var n = this; this.endVal = i, this.options = a, this.version = "2.1.0", this.defaults = { startVal: 0, decimalPlaces: 0, duration: 2, useEasing: !0, useGrouping: !0, smartEasingThreshold: 999, smartEasingAmount: 333, separator: ",", decimal: ".", prefix: "", suffix: "", enableScrollSpy: !1, scrollSpyDelay: 200 }, this.finalEndVal = null, this.useEasing = !0, this.countDown = !1, this.error = "", this.startVal = 0, this.paused = !0, this.count = function (t) { n.startTime || (n.startTime = t); var i = t - n.startTime; n.remaining = n.duration - i, n.useEasing ? n.countDown ? n.frameVal = n.startVal - n.easingFn(i, 0, n.startVal - n.endVal, n.duration) : n.frameVal = n.easingFn(i, n.startVal, n.endVal - n.startVal, n.duration) : n.countDown ? n.frameVal = n.startVal - (n.startVal - n.endVal) * (i / n.duration) : n.frameVal = n.startVal + (n.endVal - n.startVal) * (i / n.duration), n.countDown ? n.frameVal = n.frameVal < n.endVal ? n.endVal : n.frameVal : n.frameVal = n.frameVal > n.endVal ? n.endVal : n.frameVal, n.frameVal = Number(n.frameVal.toFixed(n.options.decimalPlaces)), n.printValue(n.frameVal), i < n.duration ? n.rAF = requestAnimationFrame(n.count) : null !== n.finalEndVal ? n.update(n.finalEndVal) : n.callback && n.callback() }, this.formatNumber = function (t) { var i, a, s, e, r = t < 0 ? "-" : ""; i = Math.abs(t).toFixed(n.options.decimalPlaces); var o = (i += "").split("."); if (a = o[0], s = o.length > 1 ? n.options.decimal + o[1] : "", n.options.useGrouping) { e = ""; for (var l = 0, h = a.length; l < h; ++l)0 !== l && l % 3 == 0 && (e = n.options.separator + e), e = a[h - l - 1] + e; a = e } return n.options.numerals && n.options.numerals.length && (a = a.replace(/[0-9]/g, function (t) { return n.options.numerals[+t] }), s = s.replace(/[0-9]/g, function (t) { return n.options.numerals[+t] })), r + n.options.prefix + a + s + n.options.suffix }, this.easeOutExpo = function (t, i, a, n) { return a * (1 - Math.pow(2, -10 * t / n)) * 1024 / 1023 + i }, this.options = __assign(__assign({}, this.defaults), a), this.formattingFn = this.options.formattingFn ? this.options.formattingFn : this.formatNumber, this.easingFn = this.options.easingFn ? this.options.easingFn : this.easeOutExpo, this.startVal = this.validateValue(this.options.startVal), this.frameVal = this.startVal, this.endVal = this.validateValue(i), this.options.decimalPlaces = Math.max(this.options.decimalPlaces), this.resetDuration(), this.options.separator = String(this.options.separator), this.useEasing = this.options.useEasing, "" === this.options.separator && (this.options.useGrouping = !1), this.el = "string" == typeof t ? document.getElementById(t) : t, this.el ? this.printValue(this.startVal) : this.error = "[CountUp] target is null or undefined", void 0 !== window && this.options.enableScrollSpy && (this.error ? console.error(this.error, t) : (window.onScrollFns = window.onScrollFns || [], window.onScrollFns.push(function () { return n.handleScroll(n) }), window.onscroll = function () { window.onScrollFns.forEach(function (t) { return t() }) }, this.handleScroll(this))) } return t.prototype.handleScroll = function (t) { if (t && window) { var i = window.innerHeight + window.scrollY, a = t.el.offsetTop + t.el.offsetHeight; a < i && a > window.scrollY && t.paused ? (t.paused = !1, setTimeout(function () { return t.start() }, t.options.scrollSpyDelay)) : window.scrollY > a && !t.paused && t.reset() } }, t.prototype.determineDirectionAndSmartEasing = function () { var t = this.finalEndVal ? this.finalEndVal : this.endVal; this.countDown = this.startVal > t; var i = t - this.startVal; if (Math.abs(i) > this.options.smartEasingThreshold) { this.finalEndVal = t; var a = this.countDown ? 1 : -1; this.endVal = t + a * this.options.smartEasingAmount, this.duration = this.duration / 2 } else this.endVal = t, this.finalEndVal = null; this.finalEndVal ? this.useEasing = !1 : this.useEasing = this.options.useEasing }, t.prototype.start = function (t) { this.error || (this.callback = t, this.duration > 0 ? (this.determineDirectionAndSmartEasing(), this.paused = !1, this.rAF = requestAnimationFrame(this.count)) : this.printValue(this.endVal)) }, t.prototype.pauseResume = function () { this.paused ? (this.startTime = null, this.duration = this.remaining, this.startVal = this.frameVal, this.determineDirectionAndSmartEasing(), this.rAF = requestAnimationFrame(this.count)) : cancelAnimationFrame(this.rAF), this.paused = !this.paused }, t.prototype.reset = function () { cancelAnimationFrame(this.rAF), this.paused = !0, this.resetDuration(), this.startVal = this.validateValue(this.options.startVal), this.frameVal = this.startVal, this.printValue(this.startVal) }, t.prototype.update = function (t) { cancelAnimationFrame(this.rAF), this.startTime = null, this.endVal = this.validateValue(t), this.endVal !== this.frameVal && (this.startVal = this.frameVal, this.finalEndVal || this.resetDuration(), this.finalEndVal = null, this.determineDirectionAndSmartEasing(), this.rAF = requestAnimationFrame(this.count)) }, t.prototype.printValue = function (t) { var i = this.formattingFn(t); "INPUT" === this.el.tagName ? this.el.value = i : "text" === this.el.tagName || "tspan" === this.el.tagName ? this.el.textContent = i : this.el.innerHTML = i }, t.prototype.ensureNumber = function (t) { return "number" == typeof t && !isNaN(t) }, t.prototype.validateValue = function (t) { var i = Number(t); return this.ensureNumber(i) ? i : (this.error = "[CountUp] invalid start or end value: " + t, null) }, t.prototype.resetDuration = function () { this.startTime = null, this.duration = 1e3 * Number(this.options.duration), this.remaining = this.duration }, t }(); export { CountUp };
;

window.onload = function () {
    const body = document.body;

    const menu = document.querySelector('.header__menu');

    document.addEventListener('click', documnetActions);

    function documnetActions(e) {
        const targetElement = e.target;

        // Burger menu
        if (targetElement.classList.contains('header__burger')) {
            menu.classList.add('_active');
            body.classList.add('_lock');
        } else if (!targetElement.closest('.header__menu') || targetElement.classList.contains('menu__header-close')) {
            menu.classList.remove('_active');
            body.classList.remove('_lock');
        }
    }

    // Page padding

    document.querySelector('.intro').style.paddingTop = document.querySelector('.header').offsetHeight + 'px';;

    // AOS init

    AOS.init({
        once: true
    });

    // Equalize values pricing

    equalizeValues('pricing__item-img');

    // Scroll to blocks

    const menuBtns = document.querySelectorAll('[data-scroll-to]');

    menuBtns.forEach(item => {
        item.addEventListener('click', e => {
            e.preventDefault();

            menu.classList.remove('_active');
            body.classList.remove('_lock');

            let valueOfScrollTo = item.getAttribute("data-scroll-to");

            let scrollTarget = document.getElementById(valueOfScrollTo);

            const elementPosition = scrollTarget.getBoundingClientRect().top;

            window.scrollBy({
                top: elementPosition,
                behavior: 'smooth'
            });
        });
    });

    // Count Up

    new CountUp('puplis-value', 800, { enableScrollSpy: true, scrollSpyOnce: true, duration: 1 });
    new CountUp('teachers-value', 18, { enableScrollSpy: true, scrollSpyOnce: true, duration: 1 });
    new CountUp('languages-value', 6, { enableScrollSpy: true, scrollSpyOnce: true });

    // Contacts form

    const contactsForm = document.getElementById('contacts__form');

    contactsForm.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(contactsForm);
        let formData = new FormData(contactsForm);

        // if (error === 0) {
        //     let response = await fetch('sendmail.php', {
        //         method: 'POST',
        //         body: formData
        //     })
        // } else {
        //     alert('Fill in the required field');
        // }
    }

    function formValidate(form) {
        let error = 0;
        // Собираем в массив все необходимые для заполнения поля
        let formReq = document.querySelectorAll('._req');

        formReq.forEach(input => {
            // Убираем класс error при начале проверки 
            formRemoveError(input);

            // Проверка является ли поле для email'ла
            if (input.classList.contains('_email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                } else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
                    formAddError(input);
                    error++;
                } else {
                    if (input.value === '') {
                        formAddError(input);
                        error++;
                    }
                }
            }
        });

        return error;
    }


    // Функция добавления класса error элементу и его родителю
    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }

    // Функция убирания класса error элементу и его родителю
    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }

    // Функция теста email'ла

    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }
}