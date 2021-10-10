import { getParallax } from "./pixi-functions";
import { useState } from "./state";

const canvasContainer = document.querySelector("#pixi");

const [maxScale, setMaxScale] = useState(5);
const [imageUrl, setImageUrl] = useState("/img/coffeepot.jpg");
const [depthmapUrl, setDepthmapUrl] = useState("/img/coffeepot_depthmap.jpg");
const [windowSize, setWindowSize] = useState({
  width: window.innerWidth,
  height: window.innerHeight,
});

const { filter, parallax } = getParallax(imageUrl(), depthmapUrl(), 1200, 900);

canvasContainer.innerHTML = "";
canvasContainer.appendChild(parallax);

window.onmousemove = function (e) {
  if (filter) {
    const { width, height } = windowSize();

    const halfWidth = width / 2;
    const xRatio = (halfWidth - e.clientX) / halfWidth;

    const halfHeight = height / 2;
    const yRatio = (halfHeight - e.clientY) / halfHeight;

    filter.scale.x = Math.min(maxScale() * xRatio);
    filter.scale.y = Math.min(maxScale() * yRatio);
  }
};

window.addEventListener(
  "resize",
  setWindowSize({ width: window.innerWidth, height: window.innerHeight })
);
