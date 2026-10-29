(() => {
  const key = 'tarikh-lab-quiz-attempt-v1';
  let saved = {};

  try {
    saved = JSON.parse(localStorage.getItem(key) || '{}');
  } catch (_) {
    saved = {};
  }

  // Restore earlier answers after refresh. app.js handles scoring and locks each answered question.
  Object.entries(saved.answers || {}).forEach(([question, choice]) => {
    const input = document.querySelector(`input[name="q${question}"][value="${choice}"]`);
    if (!input) return;
    input.checked = true;
    input.dispatchEvent(new Event('change', { bubbles: true }));
  });

  document.querySelector('#quiz').addEventListener('change', event => {
    const input = event.target;
    if (!input.matches('input[type="radio"]')) return;
    const answers = {};
    document.querySelectorAll('#quiz input[type="radio"]:checked').forEach(answer => {
      answers[answer.name.slice(1)] = answer.value;
    });
    try {
      localStorage.setItem(key, JSON.stringify({ answers }));
    } catch (_) {
      // The quiz still works if this browser blocks local storage.
    }
  });
})();
