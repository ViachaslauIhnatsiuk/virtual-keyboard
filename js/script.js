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