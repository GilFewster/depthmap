import heic2any from "heic2any";

import { getParallax } from "./pixi-functions";
import { useState } from "./state";

const fileUploadForm = document.querySelector("#fileUploadForm");
const imageInput = document.querySelector("#imageInput");
const canvasContainer = document.querySelector("#pixi");

const [maxScale, setMaxScale] = useState(5);
const [displacementFilter, setDisplacementFilter] = useState();
const [windowSize, setWindowSize] = useState({
  width: window.innerWidth,
  height: window.innerHeight,
});

const readFile = (inputValue) => {
  return new Promise(async (resolve, reject) => {
    try {
      const imageObjectUrl = await URL.createObjectURL(inputValue);
      resolve(imageObjectUrl);
    } catch (e) {
      reject(e);
    }
  });
};

fileUploadForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const src = imageInput.files[0];

  if (!src) {
    console.log("Add an image first!");
    return;
  }

  var fileReader = new FileReader();
  fileReader.onloadend = function (e) {
    const arrayBuffer = e.target.result;
    decodeImage(new Blob([arrayBuffer]));
  };

  fileReader.readAsArrayBuffer(src);
});

const decodeImage = async (blob) => {
  console.log("Decoding heic blob");
  heic2any({ blob, toType: "image/png", multiple: true }).then(
    (conversionResult) => {
      console.log(conversionResult);
      const objURL = window.URL.createObjectURL(conversionResult[0]);
      console.log(objURL);
      const img = document.createElement("img");
      img.src = objURL;
      document.body.appendChild(img);
    }
  );

  // const { filter, parallax } = getParallax(img, map, 1200, 900);

  // canvasContainer.innerHTML = "";
  // canvasContainer.appendChild(parallax);
  // setDisplacementFilter(filter);
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
