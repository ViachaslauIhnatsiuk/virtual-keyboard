import ru from './ru.js';
import en from './en.js';

import {
  renderKeyboardWrapper,
  renderKeyboard,
  renderCapslockKeys,
  renderShiftLowerLetterKeys,
  renderShiftLowerNonLetterKeys,
  renderShiftUpperLetterKeys,
  renderShiftUpperNonLetterKeys,
  changeLanguage,
  setColorTheme,
} from './functions.js';

window.addEventListener('DOMContentLoaded', () => {
  renderKeyboardWrapper();
  if (!localStorage.language) localStorage.setItem('language', 'ru');
  renderKeyboard();
  if (!localStorage.theme) localStorage.setItem('theme', 'light');
  setColorTheme();
  if (!localStorage.capslock) localStorage.setItem('capslock', 'off');
  localStorage.setItem('capslock', 'off');
});

let capslock = false;
let shift = false;

changeLanguage('ControlLeft', 'AltLeft');

document.addEventListener('click', (e) => {
  if (e.target.innerText === 'capslock' && !capslock) {
    renderCapslockKeys();
    capslock = !capslock;
    localStorage.setItem('capslock', 'on');
  } else if (e.target.innerText === 'capslock' && capslock) {
    renderCapslockKeys();
    capslock = !capslock;
    localStorage.setItem('capslock', 'off');
  }
});

document.addEventListener('mousedown', (e) => {
  if (e.target.textContent === 'shift' && !capslock) {
    renderShiftUpperLetterKeys();
    renderShiftUpperNonLetterKeys();
  } else if (e.target.textContent === 'shift' && capslock) {
    renderShiftLowerLetterKeys();
    renderShiftUpperNonLetterKeys();
  }
  shift = !shift;
});

document.addEventListener('mouseup', (e) => {
  if (e.target.textContent === 'shift' && capslock) {
    renderShiftUpperLetterKeys();
    renderShiftLowerNonLetterKeys();
  } else if (e.target.textContent === 'shift' && !capslock) {
    renderShiftLowerLetterKeys();
    renderShiftLowerNonLetterKeys();
  }
  shift = !shift;
});

document.addEventListener('keydown', (e) => {
  e.preventDefault();
  const OUTPUT = document.querySelector('.output');
  const position = OUTPUT.selectionStart;

  if (e.key.length === 1 && e.code !== 'Space') {
    let key = '';

    if (localStorage.language === 'en') {
      en.forEach((item) => {
        if (item.code === e.code && capslock && !shift) {
          if (e.code.length === 4) {
            key = item.upperValue;
          } else {
            key = item.lowerValue;
          }
        } else if (item.code === e.code && !capslock && shift) {
          key = item.upperValue;
        } else if (item.code === e.code && capslock && shift) {
          if (e.code.length === 4) {
            key = item.lowerValue;
          } else {
            key = item.upperValue;
          }
        } else if (item.code === e.code && !capslock && !shift) {
          key = item.lowerValue;
        }
      });
    } else if (localStorage.language === 'ru') {
      ru.forEach((item) => {
        if (item.code === e.code && capslock && !shift) {
          if (item.upperCapsValue === item.upperValue) {
            key = item.upperValue;
          } else {
            key = item.lowerValue;
          }
        } else if (item.code === e.code && !capslock && shift) {
          key = item.upperValue;
        } else if (item.code === e.code && capslock && shift) {
          if (item.upperCapsValue === item.upperValue) {
            key = item.lowerValue;
          } else {
            key = item.upperValue;
          }
        } else if (item.code === e.code && !capslock && !shift) {
          key = item.lowerValue;
        }
      });
    }

    if (OUTPUT.selectionEnd - OUTPUT.selectionStart > 0) {
      OUTPUT.textContent = OUTPUT.textContent.slice(0, OUTPUT.selectionStart)
        + key
        + OUTPUT.textContent.slice(OUTPUT.selectionEnd);
    } else {
      OUTPUT.textContent = OUTPUT.textContent.slice(0, position)
        + key
        + OUTPUT.textContent.slice(position);
    }

    OUTPUT.value = OUTPUT.textContent;
    OUTPUT.setSelectionRange(position + 1, position + 1);
  }

  document.querySelectorAll('.key, .func').forEach((item, index) => {
    if (e.code === en[index].code) {
      item.classList.add('active');
    }
  });

  if (e.key === 'CapsLock' && !capslock) {
    renderCapslockKeys();
    capslock = !capslock;
    localStorage.setItem('capslock', 'on');
  } else if (e.key === 'CapsLock' && capslock) {
    renderCapslockKeys();
    capslock = !capslock;
    localStorage.setItem('capslock', 'off');
  }

  if (e.key === 'Shift' && capslock) {
    renderShiftLowerLetterKeys();
    renderShiftUpperNonLetterKeys();
    shift = true;
  } else if (e.key === 'Shift' && !capslock) {
    renderShiftUpperLetterKeys();
    renderShiftUpperNonLetterKeys();
    shift = true;
  }

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
      OUTPUT.textContent = OUTPUT.textContent.slice(0, OUTPUT.selectionStart)
        + OUTPUT.textContent.slice(OUTPUT.selectionEnd);
      OUTPUT.value = OUTPUT.textContent;
      OUTPUT.setSelectionRange(position, position);
    } else if (OUTPUT.selectionEnd === OUTPUT.selectionStart && position > 0) {
      OUTPUT.textContent = OUTPUT.textContent.slice(0, position - 1)
        + OUTPUT.textContent.slice(position);
      OUTPUT.value = OUTPUT.textContent;
      OUTPUT.setSelectionRange(position - 1, position - 1);
    }
  }

  if (e.code === 'Delete') {
    if (OUTPUT.selectionEnd - OUTPUT.selectionStart > 0) {
      OUTPUT.textContent = OUTPUT.textContent.slice(0, OUTPUT.selectionStart)
        + OUTPUT.textContent.slice(OUTPUT.selectionEnd);
    } else {
      OUTPUT.textContent = OUTPUT.textContent.slice(0, position)
        + OUTPUT.textContent.slice(position + 1);
    }

    OUTPUT.value = OUTPUT.textContent;
    OUTPUT.setSelectionRange(position, position);
  }

  if (e.code === 'ArrowLeft' || e.code === 'ArrowRight' || e.code === 'ArrowUp' || e.code === 'ArrowDown') {
    document.querySelectorAll('.arrowleft, .arrowright, .arrowup, .arrowdown').forEach((item) => {
      if (item.classList.contains(`${e.code.toLowerCase()}`)) {
        if (OUTPUT.selectionEnd - OUTPUT.selectionStart > 0) {
          OUTPUT.textContent = OUTPUT.textContent.slice(0, OUTPUT.selectionStart)
            + item.textContent
            + OUTPUT.textContent.slice(OUTPUT.selectionEnd);
        } else {
          OUTPUT.textContent = OUTPUT.textContent.slice(0, position)
            + item.textContent
            + OUTPUT.textContent.slice(position);
        }
      }
    });

    OUTPUT.value = OUTPUT.textContent;
    OUTPUT.setSelectionRange(position + 1, position + 1);
  }
});

document.addEventListener('keyup', (e) => {
  if (e.key === 'Shift' && capslock) {
    renderShiftUpperLetterKeys();
    renderShiftLowerNonLetterKeys();
    shift = false;
  } else if (e.key === 'Shift' && !capslock) {
    renderShiftLowerLetterKeys();
    renderShiftLowerNonLetterKeys();
    shift = false;
  }

  document.querySelectorAll('.key, .func').forEach((item, index) => {
    if (e.code === en[index].code) {
      item.classList.remove('active');
    }
  });
});
