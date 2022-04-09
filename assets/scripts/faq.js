document.querySelectorAll('.chevron-icon').forEach((chevronItem) => {
  chevronItem.addEventListener('click', chevronClick);
});

function chevronClick(e) {
  if (e.target.innerText === 'expand_less') {
    e.target.innerText = 'expand_more';
    e.target.parentNode.nextElementSibling.style.display = 'none';
  } else {
    e.target.innerText = 'expand_less';
    e.target.parentNode.nextElementSibling.style.display = 'inline';
  }
}
