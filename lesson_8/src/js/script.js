window.addEventListener('DOMContentLoaded', function () {

	let tab = document.getElementsByClassName('info-header-tab'),
		tabContent = document.getElementsByClassName('info-tabcontent'),
		info = document.getElementsByClassName('info-header')[0];

	function hideTabContent(a) {
		for (let i = a; i < tabContent.length; i++) {
			tabContent[i].classList.remove('show');
			tabContent[i].classList.add('hide');
		}
	}

	hideTabContent(1)

	function showTabContent(b) {
		if (tabContent[b].classList.contains('hide')) {
			hideTabContent(0);
			tabContent[b].classList.remove('hide');
			tabContent[b].classList.add('show');
		}
	}

	info.addEventListener('click', function(event) {
		let target = event.target;
		if(target.className == 'info-header-tab') {
			for (let i = 0; i < tab.length; i++) {
				if (target == tab[i]) {
					showTabContent(i);
					break;
				}
			}
		};
	});

	// Timer

	let deadline = '2018-04-09';

	//функция для получения оставшего времени
	function getTimeRemaining(endtime) {
		let t = Date.parse(endtime) - Date.parse(new Date()),
			hours = Math.floor( (t/(1000*60*60)) ),
			minutes = Math.floor( (t/1000/60) % 60),
			seconds = Math.floor( (t/1000) % 60 );
			
	// функция возвращает объект с данными
			return {
				'total': t,
				'hours': hours,
				'minutes': minutes,
				'seconds': seconds
			};
	};
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
				};
				

				if(t.total <= 0) {
					clearInterval(timeInterval);
				}
			};

			updateClock();
			timeInterval = setInterval(updateClock, 1000);
	};

	setClock('timer', deadline);

	//Scroll

	let menu = document.getElementsByTagName('nav')[0];
	menu.addEventListener('click', function(event) {
		event.preventDefault();
		animate(function (timePassed) {
			let target = event.target;
			let section = document.getElementById(target.getAttribute('href').slice(1));
			window.scrollBy(0, section.getBoundingClientRect().top / 20 - 4);
		}, 1500)
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
			})
	}



})