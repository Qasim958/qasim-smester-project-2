export function messageBox(message, field, color) {
  document.getElementById(
    field
  ).innerHTML = `<span style=" color:${color}; font-size:1.4rem;margin:1rem; ">${message}</span>`;
}
