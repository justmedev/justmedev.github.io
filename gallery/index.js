$(document).ready(() => {
  let content = $('#content');
  content.removeClass('noscript');
});

let imageCount = 2;
function loadImages() {
  let gal = $('#gallery');
  
  for (let i = 0; i < imageCount; i++) {
    let el = document.createElement("img");
    el.src = `images/img${i}`;
    gal.appendChild(el);
  }
}
