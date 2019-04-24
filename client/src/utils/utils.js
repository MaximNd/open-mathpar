function delay(time) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), time);
  });
}

function prepareTask(task, startIndex, dataToInsert) {
  const newTask = task.split('');
  newTask.splice(startIndex, 0, dataToInsert.replace(/\\newline/g, '\n'))
  return newTask.join('');
}

function getCaretPosition(input) {
  if (document.selection) {
    input.focus();
    const range = document.selection.createRange();
    const rangelen = range.text.length;
    range.moveStart('character', -input.value.length);
    const start = range.text.length - rangelen;
    return start;
  }
  if (input.selectionStart || input.selectionStart === '0') {
    return input.selectionStart;
  }
  return 0;
}

function setCaretPosition(input, position) {
  const start = position;
  const end = position;
  setTimeout(() => {
    if (input.setSelectionRange) {
      input.focus();
      input.setSelectionRange(start, end);
    } else if (input.createTextRange) {
      const range = input.createTextRange();
      range.collapse(true);
      range.moveEnd('character', end);
      range.moveStart('character', start);
      range.select();
    }
  }, 0);
}

export {
  delay,
  prepareTask,
  getCaretPosition,
  setCaretPosition
};
