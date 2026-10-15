'use strict';
// Payment availability must come from a verified server integration.
// This deployment intentionally has no active money-collection endpoint.
const choices = [...document.querySelectorAll('.method-choice')];
choices.forEach(button => button.addEventListener('click', () => {
  const wasOpen = button.getAttribute('aria-expanded') === 'true';
  choices.forEach(other => {
    other.setAttribute('aria-expanded', 'false');
    document.getElementById(other.getAttribute('aria-controls')).hidden = true;
  });
  if (!wasOpen) {
    button.setAttribute('aria-expanded', 'true');
    document.getElementById(button.getAttribute('aria-controls')).hidden = false;
  }
}));
