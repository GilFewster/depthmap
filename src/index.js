import { submitForm } from "./form";
import { getParallax } from "./pixi-functions";
import { useState } from "./state";

const fileUploadForm = document.querySelector("#fileUploadForm");
const imageInput = document.querySelector("#imageInput");
const depthmapInput = document.querySelector("#depthmapInput");
const canvasContainer = document.querySelector("#pixi");

const [maxScale, setMaxScale] = useState(5);
const [displacementFilter, setDisplacementFilter] = useState();
const [windowSize, setWindowSize] = useState({
  width: window.innerWidth,
  height: window.innerHeight,
});

fileUploadForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const [img, map] = await submitForm(imageInput, depthmapInput);
  updateView(img, map);
});

const updateView = (img, map) => {
  const { filter, parallax } = getParallax(img, map, 1200, 900);
  canvasContainer.innerHTML = "";
  canvasContainer.appendChild(parallax);
  setDisplacementFilter(filter);
};

window.onmousemove = function (e) {
  if (displacementFilter()) {
    const { width, height } = windowSize();

    const halfWidth = width / 2;
    [];
    const xRatio = (halfWidth - e.clientX) / halfWidth;

    const halfHeight = height / 2;
    const yRatio = (halfHeight - e.clientY) / halfHeight;

    displacementFilter().scale.x = Math.min(maxScale() * xRatio);
    displacementFilter().scale.y = Math.min(maxScale() * yRatio);
  }
};

window.addEventListener(
  "resize",
  setWindowSize({ width: window.innerWidth, height: window.innerHeight })
);
