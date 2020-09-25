const animItems = document.querySelectorAll(".anim-item");
if (animItems.length > 0) {
  animScroll(animItems);
  window.addEventListener("scroll", () => {
    animScroll(animItems)
  });
};

function animScroll(animItems) {
  for (let i = 0; i < animItems.length; i++) {
    const animItem = animItems[i];
    const animItemHeight = animItem.offsetHeight;
    const animItemOffset = offset(animItem).top;
    const animStart = 4;
    let animItemPoint = animPoints(animItemHeight, animStart);
    if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
      animItem.classList.add("_active");
    } else {
      if (animItem.classList.contains("repeat-show")) {
        animItem.classList.remove("_active");
      }
    };
  }
};

function animPoints(animItemHeight, animStart) {
  let animItemPoint = window.innerHeight - animItemHeight / animStart;
  if (animItemHeight > window.innerHeight) {
    animItemPoint = window.innerHeight - window.innerHeight / animStart;
  };
  return animItemPoint;
}

function offset(el) {
  const rect = el.getBoundingClientRect();
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const offset = {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft
  };
  return offset;
}