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

const submitForm = (imageInput) => {
  const src = imageInput.files[0];
  if (!src) {
    console.log("Add an image first!");
    return;
  }
  readFile(src);
};

const readFile = (src) => {
  const reader = new FileReader();
  try {
    reader.readAsArrayBuffer(src);
    reader.onloadend = (evt) => {
      if (evt.target.readyState === FileReader.DONE) {
        const arrayBuffer = evt.target.result;
        const array = new Uint8Array(arrayBuffer);
        const fileByteArray = [];

        for (const a of array) {
          fileByteArray.push(a);
        }
        decodeImage(fileByteArray);
      }
    };
  } catch (e) {
    console.error(e);
    if (reader) {
      reader.abort();
    }
  }
};

fileUploadForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  submitForm(imageInput);
});

const decodeImage = async (buffer) => {
  console.log("Decode arrayBuffer", buffer);
  const decoder = new libheif.HeifDecoder();
  const decoded = await decoder.decode({ buffer });
  console.log("Decoded", decoded);

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
