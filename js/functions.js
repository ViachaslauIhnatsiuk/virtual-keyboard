import { ru } from './ru.js';
import { en } from './en.js';

const renderKeyboardWrapper = () => {
	document.body.insertAdjacentHTML(
		'afterbegin',
		`<main class="wrapper">
			<div class="header">
				<h1 class="title">Virtual Keyboard</h1>
				<div class="tips">
					<p class="system">Keyboard designed for Windows operating system</p>
					<p class="language">You can change the language using "ShiftLeft" + "AltLeft"</p>
					<div class="color-theme">
						<div class="toggler"></div>
						<div class="toggler-off">OFF</div>
						<div class="toggler-on">ON</div>
					</div>
				</div>
			</div>
			<textarea rows="10" cols="10" class="output"></textarea>
			<div class="keyboard-wrapper">
				<div class="keyboard">
				</div>
			</div>
		</main>`,
	);
};

const renderKeyboard = () => {
	document.querySelector('.keyboard').innerHTML = '';
	if (localStorage.language === 'ru') {
		if (localStorage.theme === 'light') {
			ru.forEach((item) => {
				document.querySelector('.keyboard').insertAdjacentHTML(
					'beforeend',
					`<div class="${item.class}">${item.lowerValue}</div>`,
				);
			});
		} else {
			ru.forEach((item) => {
				document.querySelector('.keyboard').insertAdjacentHTML(
					'beforeend',
					`<div class="${item.class} dark-theme">${item.lowerValue}</div>`,
				);
			});
		}
	} else if (localStorage.language === 'en') {
		if (localStorage.theme === 'light') {
			en.forEach((item) => {
				document.querySelector('.keyboard').insertAdjacentHTML(
					'beforeend',
					`<div class="${item.class}">${item.lowerValue}</div>`,
				);
			});
		} else {
			en.forEach((item) => {
				document.querySelector('.keyboard').insertAdjacentHTML(
					'beforeend',
					`<div class="${item.class} dark-theme">${item.lowerValue}</div>`,
				);
			});
		}
	}

	document.querySelector('.capslock').insertAdjacentHTML(
		'beforeend',
		`<div class="indicator">
		</div>`,
	);

};