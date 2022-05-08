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

const addEventListenersToButtons = () => {
	const OUTPUT = document.querySelector('.output');

	document.querySelectorAll('.key, .func').forEach((item) => item.addEventListener('mousedown', (e) => e.preventDefault()));

	document.querySelectorAll('.key').forEach((item) => item.addEventListener('click', (e) => {
		const position = OUTPUT.selectionStart;
		if (OUTPUT.selectionEnd - OUTPUT.selectionStart > 0) {
			OUTPUT.textContent = OUTPUT.textContent.slice(0, OUTPUT.selectionStart) + e.target.textContent + OUTPUT.textContent.slice(OUTPUT.selectionEnd);
		} else {
			OUTPUT.textContent = OUTPUT.textContent.slice(0, position) + e.target.textContent + OUTPUT.textContent.slice(position);
		}
		OUTPUT.value = OUTPUT.textContent;
		OUTPUT.setSelectionRange(position + 1, position + 1);
	}));

	document.querySelector('.enter').addEventListener('click', () => {
		const position = OUTPUT.selectionStart;
		if (OUTPUT.selectionEnd - OUTPUT.selectionStart >= 0) {
			OUTPUT.textContent = `${OUTPUT.textContent.slice(0, OUTPUT.selectionStart)}${'\n'}${OUTPUT.textContent.slice(OUTPUT.selectionEnd)}`;
		} else if (OUTPUT.selectionEnd === OUTPUT.selectionStart && position > 0) {
			OUTPUT.textContent = `${OUTPUT.textContent.slice(0, position)}${'\n'}${OUTPUT.textContent.slice(position)}`;
		}
		OUTPUT.value = OUTPUT.textContent;
		OUTPUT.setSelectionRange(position + 1, position + 1);
	});

	document.querySelector('.tab').addEventListener('click', () => {
		const position = OUTPUT.selectionStart;
		if (OUTPUT.selectionEnd - OUTPUT.selectionStart > 0) {
			OUTPUT.textContent = `${OUTPUT.textContent.slice(0, OUTPUT.selectionStart)}${'    '}${OUTPUT.textContent.slice(OUTPUT.selectionEnd)}`;
		} else {
			OUTPUT.textContent = `${OUTPUT.textContent.slice(0, position)}${'    '}${OUTPUT.textContent.slice(position)}`;
		}
		OUTPUT.value = OUTPUT.textContent;
		OUTPUT.setSelectionRange(position + 4, position + 4);
	});

	document.querySelector('.space').addEventListener('click', () => {
		const position = OUTPUT.selectionStart;
		if (OUTPUT.selectionEnd - OUTPUT.selectionStart > 0) {
			OUTPUT.textContent = `${OUTPUT.textContent.slice(0, OUTPUT.selectionStart)}${' '}${OUTPUT.textContent.slice(OUTPUT.selectionEnd)}`;
		} else {
			OUTPUT.textContent = `${OUTPUT.textContent.slice(0, position)}${' '}${OUTPUT.textContent.slice(position)}`;
		}
		OUTPUT.value = OUTPUT.textContent;
		OUTPUT.setSelectionRange(position + 1, position + 1);
	});

	document.querySelector('.backspace').addEventListener('click', () => {
		const position = OUTPUT.selectionStart;
		if (OUTPUT.selectionEnd - OUTPUT.selectionStart > 0) {
			OUTPUT.textContent = OUTPUT.textContent.slice(0, OUTPUT.selectionStart) + OUTPUT.textContent.slice(OUTPUT.selectionEnd);
			OUTPUT.value = OUTPUT.textContent;
			OUTPUT.setSelectionRange(position, position);
		} else if (OUTPUT.selectionEnd === OUTPUT.selectionStart && position > 0) {
			OUTPUT.textContent = OUTPUT.textContent.slice(0, position - 1) + OUTPUT.textContent.slice(position);
			OUTPUT.value = OUTPUT.textContent;
			OUTPUT.setSelectionRange(position - 1, position - 1);
		}
	});

	document.querySelector('.delete').addEventListener('click', () => {
		const position = OUTPUT.selectionStart;
		if (OUTPUT.selectionEnd - OUTPUT.selectionStart > 0) {
			OUTPUT.textContent = OUTPUT.textContent.slice(0, OUTPUT.selectionStart) + OUTPUT.textContent.slice(OUTPUT.selectionEnd);
		} else {
			OUTPUT.textContent = OUTPUT.textContent.slice(0, position) + OUTPUT.textContent.slice(position + 1);
		}
		OUTPUT.value = OUTPUT.textContent;
		OUTPUT.setSelectionRange(position, position);
	});

	document.querySelectorAll('.arrowleft, .arrowright, .arrowup, .arrowdown').forEach((item) => item.addEventListener('click', (e) => {
		const position = OUTPUT.selectionStart;
		if (OUTPUT.selectionEnd - OUTPUT.selectionStart > 0) {
			OUTPUT.textContent = OUTPUT.textContent.slice(0, OUTPUT.selectionStart) + e.target.textContent + OUTPUT.textContent.slice(OUTPUT.selectionEnd);
		} else {
			OUTPUT.textContent = OUTPUT.textContent.slice(0, position) + e.target.textContent + OUTPUT.textContent.slice(position);
		}
		OUTPUT.value = OUTPUT.textContent;
		OUTPUT.setSelectionRange(position + 1, position + 1);
	}));
};