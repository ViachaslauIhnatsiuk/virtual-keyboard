import { ru } from './ru.js';
import { en } from './en.js';

import {
	renderKeyboardWrapper,
	renderKeyboard,
	changeLanguage,
	setColorTheme,
} from './functions.js';

window.addEventListener('DOMContentLoaded', () => {
	renderKeyboardWrapper();
	if (!localStorage.language) localStorage.setItem('language', 'ru');
	renderKeyboard();
	if (!localStorage.theme) localStorage.setItem('theme', 'dark');
	setColorTheme();

});

let capslock = false;
let shift = false;

document.addEventListener('keydown', (e) => {
	e.preventDefault();
	const OUTPUT = document.querySelector('.output');
	const position = OUTPUT.selectionStart;

	if (e.key.length === 1 && e.code !== 'Space') {
		let key = '';

		if (localStorage.language === 'en') {
			en.forEach((item) => {
				if (item.code === e.code && capslock && !shift) {
					e.code.length === 4
						? key = item.upperValue
						: key = item.lowerValue;
				} else if (item.code === e.code && !capslock && shift) {
					key = item.upperValue;
				} else if (item.code === e.code && capslock && shift) {
					e.code.length === 4
						? key = item.lowerValue
						: key = item.upperValue;
				} else if (item.code === e.code && !capslock && !shift) {
					key = item.lowerValue;
				}
			});
		} else if (localStorage.language === 'ru') {
			ru.forEach((item) => {
				if (item.code === e.code && capslock && !shift) {
					e.code.length === 4 || e.code === 'Backquote' || e.code === 'BracketLeft' || e.code === 'BracketRight' || e.code === 'Semicolon' || e.code === 'Quote' || e.code === 'Comma' || e.code === 'Period'
						? key = item.upperValue
						: key = item.lowerValue;
				} else if (item.code === e.code && !capslock && shift) {
					key = item.upperValue;
				} else if (item.code === e.code && capslock && shift) {
					e.code.length === 4 || e.code === 'Backquote' || e.code === 'BracketLeft' || e.code === 'BracketRight' || e.code === 'Semicolon' || e.code === 'Quote' || e.code === 'Comma' || e.code === 'Period'
						? key = item.lowerValue
						: key = item.upperValue;
				} else if (item.code === e.code && !capslock && !shift) {
					key = item.lowerValue;
				}
			});
		}

		if (OUTPUT.selectionEnd - OUTPUT.selectionStart > 0) {
			OUTPUT.textContent = OUTPUT.textContent.slice(0, OUTPUT.selectionStart) + key + OUTPUT.textContent.slice(OUTPUT.selectionEnd);
		} else {
			OUTPUT.textContent = OUTPUT.textContent.slice(0, position) + key + OUTPUT.textContent.slice(position);
		}

		OUTPUT.value = OUTPUT.textContent;
		OUTPUT.setSelectionRange(position + 1, position + 1);
	}

	document.querySelectorAll('.key, .func').forEach((item, index) => {
		if (e.code === en[index].code) {
			item.classList.add('active');
		}
	});

	if (e.code === 'Enter') {
		if (OUTPUT.selectionEnd - OUTPUT.selectionStart >= 0) {
			OUTPUT.textContent = `${OUTPUT.textContent.slice(0, OUTPUT.selectionStart)}${'\n'}${OUTPUT.textContent.slice(OUTPUT.selectionEnd)}`;
		} else if (OUTPUT.selectionEnd === OUTPUT.selectionStart && position > 0) {
			OUTPUT.textContent = `${OUTPUT.textContent.slice(0, position)}${'\n'}${OUTPUT.textContent.slice(position)}`;
		}

		OUTPUT.value = OUTPUT.textContent;
		OUTPUT.setSelectionRange(position + 1, position + 1);
	}

	if (e.code === 'Tab') {
		if (OUTPUT.selectionEnd - OUTPUT.selectionStart > 0) {
			OUTPUT.textContent = `${OUTPUT.textContent.slice(0, OUTPUT.selectionStart)}${'    '}${OUTPUT.textContent.slice(OUTPUT.selectionEnd)}`;
		} else {
			OUTPUT.textContent = `${OUTPUT.textContent.slice(0, position)}${'    '}${OUTPUT.textContent.slice(position)}`;
		}

		OUTPUT.value = OUTPUT.textContent;
		OUTPUT.setSelectionRange(position + 4, position + 4);
	}

	if (e.code === 'Space') {
		if (OUTPUT.selectionEnd - OUTPUT.selectionStart > 0) {
			OUTPUT.textContent = `${OUTPUT.textContent.slice(0, OUTPUT.selectionStart)}${' '}${OUTPUT.textContent.slice(OUTPUT.selectionEnd)}`;
		} else {
			OUTPUT.textContent = `${OUTPUT.textContent.slice(0, position)}${' '}${OUTPUT.textContent.slice(position)}`;
		}

		OUTPUT.value = OUTPUT.textContent;
		OUTPUT.setSelectionRange(position + 1, position + 1);
	}

	if (e.code === 'Backspace') {
		if (OUTPUT.selectionEnd - OUTPUT.selectionStart > 0) {
			OUTPUT.textContent = OUTPUT.textContent.slice(0, OUTPUT.selectionStart) + OUTPUT.textContent.slice(OUTPUT.selectionEnd);
			OUTPUT.value = OUTPUT.textContent;
			OUTPUT.setSelectionRange(position, position);
		} else if (OUTPUT.selectionEnd === OUTPUT.selectionStart && position > 0) {
			OUTPUT.textContent = OUTPUT.textContent.slice(0, position - 1) + OUTPUT.textContent.slice(position);
			OUTPUT.value = OUTPUT.textContent;
			OUTPUT.setSelectionRange(position - 1, position - 1);
		}
	}

	if (e.code === 'Delete') {
		if (OUTPUT.selectionEnd - OUTPUT.selectionStart > 0) {
			OUTPUT.textContent = OUTPUT.textContent.slice(0, OUTPUT.selectionStart) + OUTPUT.textContent.slice(OUTPUT.selectionEnd);
		} else {
			OUTPUT.textContent = OUTPUT.textContent.slice(0, position) + OUTPUT.textContent.slice(position + 1);
		}

		OUTPUT.value = OUTPUT.textContent;
		OUTPUT.setSelectionRange(position, position);
	}

	if (e.code === 'ArrowLeft' || e.code === 'ArrowRight' || e.code === 'ArrowUp' || e.code === 'ArrowDown') {
		document.querySelectorAll('.arrowleft, .arrowright, .arrowup, .arrowdown').forEach((item) => {
			if (item.classList.contains(`${e.code.toLowerCase()}`)) {
				if (OUTPUT.selectionEnd - OUTPUT.selectionStart > 0) {
					OUTPUT.textContent = OUTPUT.textContent.slice(0, OUTPUT.selectionStart) + item.textContent + OUTPUT.textContent.slice(OUTPUT.selectionEnd);
				} else {
					OUTPUT.textContent = OUTPUT.textContent.slice(0, position) + item.textContent + OUTPUT.textContent.slice(position);
				}
			}
		});

		OUTPUT.value = OUTPUT.textContent;
		OUTPUT.setSelectionRange(position + 1, position + 1);
	}
});