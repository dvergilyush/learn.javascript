(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
window.addEventListener('DOMContentLoaded', function () {

	let tab = require('../parts/tab.js');
	let timer = require('../parts/timer.js');
	let scroll = require('../parts/scroll.js');
	let modal = require('../parts/modal.js');
	let ajax = require('../parts/ajax.js');
	let slider = require('../parts/slider.js');
	let calc = require('../parts/calc.js');

	tab();
	timer();
	scroll();
	modal();
	ajax();
	slider();
	calc();










});

},{"../parts/ajax.js":2,"../parts/calc.js":3,"../parts/modal.js":4,"../parts/scroll.js":5,"../parts/slider.js":6,"../parts/tab.js":7,"../parts/timer.js":8}],2:[function(require,module,exports){
function ajax() {
	
	let message = new Object();
message.loading = "Загрузка...";
message.success = "Спасибо! Скоро мы с вами свяжемся";
message.failure = "Что-то пошло не так...";

let form = document.getElementsByClassName('main-form')[0];
let input = document.getElementsByClassName('clear_input');
let contact_form = document.getElementById('form');
let statusMessage = document.createElement('div');
statusMessage.classList.add('status');

form.addEventListener('submit', sendForm);
contact_form.addEventListener('submit', sendForm);

function sendForm(event) {
	event.preventDefault();
	this.appendChild(statusMessage);

	//AJAX
	let request = new XMLHttpRequest();
	request.open("POST", 'server.php')

	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

	let formData = new FormData(form);

	request.send(formData);

	request.onreadystatechange = function() {
		if(request.readyState < 4) {
			statusMessage.innerHTML = message.loading;
		} else if(request.readyState === 4) {
			if(request.status == 200 && request.status < 300) {
				statusMessage.innerHTML = message.success;
				//успешная отправка данных, добавляем контент
			} else statusMessage.innerHTML = message.failure;
		}
	}
	for(let i = 0; i < input.length; i++) {
		input[i].value = '';
	}
};

}

module.exports = ajax;
},{}],3:[function(require,module,exports){
function calc() {

	let persons = document.getElementsByClassName('counter-block-input')[0];
	let restDays = document.getElementsByClassName('counter-block-input')[1];
	let place = document.getElementById('select');
	let totalValue = document.getElementById('total');
	let personsSum = 0;
	let daysSum = 0;
	total = 0;

	totalValue.innerHTML = 0;
	function func() {

	}
	persons.addEventListener('change', function() {
		personsSum = +this.value;
		total = (daysSum + personsSum)*4000;
		if (restDays.value == '' || restDays.value == 0 || persons.value == 0) {
			totalValue.innerHTML = 0;
			totalValue.style.color = '#c78030';
			totalValue.style.textShadow = 'none'
		} else {
			totalValue.innerHTML = total;
			totalValue.style.color = '#fff';
			totalValue.style.textShadow = '4px  4px 16px rgba(256, 256, 256, 0.6)';
			totalValue.classList.add('B');

		}
		
		
	});

	restDays.addEventListener('change', function() {
		daysSum = +this.value;
		total = (daysSum + personsSum)*4000;
		if (persons.value == '' || restDays.value == 0 || persons.value == 0) {
			totalValue.innerHTML = 0;
			totalValue.style.color = '#c78030';
			totalValue.style.textShadow = 'none'
		} else {
			totalValue.innerHTML = total;
			totalValue.style.color = '#fff';
			totalValue.style.textShadow = '4px  4px 16px rgba(256, 256, 256, 0.6)';
			totalValue.classList.add('B');

		}
		
	});

	place.addEventListener('change', function() {
		if (persons.value == '' || restDays.value == '' || restDays.value == 0 || persons.value == 0) {
			totalValue.innerHTML = 0;
			totalValue.style.color = '#c78030';
			totalValue.style.textShadow = 'none'

		} else {
			let a = total;
			totalValue.innerHTML = a * this.options[this.selectedIndex].value;
			totalValue.style.color = '#fff';
			totalValue.style.textShadow = '4px  4px 16px rgba(256, 256, 256, 0.6)';
			totalValue.classList.add('B');

		}
	});
}

module.exports = calc;
},{}],4:[function(require,module,exports){
function modal() {
	
	let more = document.querySelector('.more');
	let overlay = document.querySelector('.overlay');
	let close = document.querySelector('.popup-close');
	let descr_btns = document.querySelectorAll('.description-btn');
	let showModal = function() {
		this.classList.add('more-splash');
		overlay.style.display = 'block';
		document.body.style.overflow = 'hidden';
	};

	more.addEventListener('click', showModal);

	close.addEventListener('click', () => {
		overlay.style.display = 'none';
		more.classList.remove('more-splash');
		document.body.style.overflow = '';

	});
	
	for (let i = 0; i < descr_btns.length; i++) {
		descr_btns[i].addEventListener('click', showModal);
	}

};

module.exports = modal;
},{}],5:[function(require,module,exports){
function scroll() {
	
		let menu = document.getElementsByTagName('nav')[0];
	menu.addEventListener('click', function(event) {
		event.preventDefault();
		animate(function (timePassed) {
			let target = event.target;
			let section = document.getElementById(target.getAttribute('href').slice(1));
			window.scrollBy(0, section.getBoundingClientRect().top / 20 - 4);
		}, 1500);
	});

	function animate(draw, duration) {
		let start = performance.now();
		requestAnimationFrame(
			function animate(time) {
				let timePassed = time - start;
				if (timePassed > duration) {
					timePassed = duration;
				}
				draw(timePassed);

				if (timePassed < duration) {
					requestAnimationFrame(animate);
				}
			});
	}

}

module.exports = scroll;
},{}],6:[function(require,module,exports){
function slider() {

	let slideIndex = 1;
	let slides = document.getElementsByClassName('slider-item');
	let prev = document.querySelector('.prev');
	let next = document.querySelector('.next');
	let dotsWrap = document.querySelector('.slider-dots');
	let dots = document.querySelectorAll('.dot');

	showSlides(slideIndex);

	// функция показа текущего слайда
	function showSlides(n) {
		if (n > slides.length) {
				slideIndex = 1;
		};
		if (n < 1) {
			slideIndex = slides.length;
		};
		for (let i = 0; i < slides.length; i++) {
			slides[i].style.display = 'none';
		};
		for (let i = 0; i < dots.length; i++) {
			dots[i].classList.remove('dot-active');
		};
		slides[slideIndex - 1].style.display = '';
		dots[slideIndex - 1].classList.add('dot-active');
	}
	////////

	//функция для перелистывания
	function plusSlides(n) {
		showSlides(slideIndex += n)	
	}
	///////

	// функция для получения текущего слайда
	function currentSlide(n) {
		showSlides(slideIndex = n);

	};

	prev.addEventListener('click', () => {
		plusSlides(-1);
	});

	next.addEventListener('click', () => {
		plusSlides(1);
	});

	let autoShowNextSlide = setTimeout(autoPlusSlides, 4000);
	function autoPlusSlides () {
		showSlides(slideIndex += 1);
		autoShowNextSlide = setTimeout(autoPlusSlides, 4000);
	};

	dotsWrap.addEventListener('click', event => {
		for (let i = 1; i <= dots.length; i++) {
				if (event.target.classList.contains('dot') && event.target == dots[i-1]) {
					currentSlide(i);
				}
		}
	});

}

module.exports = slider;
},{}],7:[function(require,module,exports){
function tab() {

	let tab = document.getElementsByClassName('info-header-tab'),
		tabContent = document.getElementsByClassName('info-tabcontent'),
		info = document.getElementsByClassName('info-header')[0];

	function hideTabContent(a) {
		for (let i = a; i < tabContent.length; i++) {
			tabContent[i].classList.remove('show');
			tabContent[i].classList.add('hide');
		}
	}

	hideTabContent(1);

	function showTabContent(b) {
		if (tabContent[b].classList.contains('hide')) {
			hideTabContent(0);
			tabContent[b].classList.remove('hide');
			tabContent[b].classList.add('show');
		}
	}

	info.addEventListener('click', event => {
		let target = event.target;
		if(target.className == 'info-header-tab') {
			for (let i = 0; i < tab.length; i++) {
				if (target == tab[i]) {
					showTabContent(i);
					break;
				}
			} 
		}
	});

}

module.exports = tab;
},{}],8:[function(require,module,exports){
function timer() {

	let deadline = '2018-04-18';

	//функция для получения оставшего времени
	function getTimeRemaining(endtime) {
		let t = Date.parse(endtime) - Date.parse(new Date()),
			hours = Math.floor( (t/(1000*60*60)) ),
			minutes = Math.floor( (t/1000/60) % 60),
			seconds = Math.floor( (t/1000) % 60 );
			if(hours < 10) hours = '0'+hours; 
			if(minutes < 10) minutes = '0'+minutes; 
			if(seconds < 10) seconds = '0'+seconds; 
			
	// функция возвращает объект с данными
			return {
				'total': t,
				'hours': hours,
				'minutes': minutes,
				'seconds': seconds
			};
	}
	// функция установки таймера (таймер получаем по id)
	let timeInterval; //объявили  фунцию, запускающую setInterval
	function setClock(id, endtime) {
		let timer = document.getElementById(id),
			hours = timer.querySelector('.hours'),
			minutes = timer.querySelector('.minutes'),
			seconds = timer.querySelector('.seconds');

	// функция обновления данных в таймере
			function updateClock() {
				let t = getTimeRemaining(endtime);
				if (t.total > 0) {
					hours.innerHTML = t.hours,
					minutes.innerHTML = t.minutes,
					seconds.innerHTML = t.seconds;
				} else {
					hours.innerHTML = '00';
					minutes.innerHTML = '00';
					seconds.innerHTML = '00';
				}
				

				if(t.total <= 0) {
					clearInterval(timeInterval);
				}
			}

			updateClock();
			timeInterval = setInterval(updateClock, 1000);
	}

	setClock('timer', deadline);

}

module.exports = timer;
},{}]},{},[1]);
