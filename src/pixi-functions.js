import { Application, Sprite, Container, filters } from "pixi.js";

const w = 1200;
const h = 900;
const maxScale = 5;
const canvasContainer = document.querySelector("#pixi");

// const app = new Application({ width: w, height: h });
// canvasContainer.appendChild(app.view);

// const imgLayer = Sprite.from("/img/coffeepot.jpg");
// imgLayer.width = w;
// imgLayer.height = h;

// const displacementFilterTexture = Sprite.from("/img/coffeepot_depthmap.jpg");
// displacementFilterTexture.width = w;
// displacementFilterTexture.height = h;

// // put the filter texture in the center of the screen along the X axis, where our original image is

// const displacementFilter = new filters.DisplacementFilter(
//   displacementFilterTexture
// );

// displacementFilter.scale.x = 0;
// displacementFilter.scale.y = 0;

// add a new filter to the list of filters for both layers
// imgLayer.filters = [displacementFilter];

// app.stage.addChild(imgLayer);
// app.stage.addChild(displacementFilterTexture);

// window.onmousemove = function (e) {
//   const halfWidth = window.innerWidth / 2;
//   const xRatio = (halfWidth - e.clientX) / halfWidth;

//   const halfHeight = window.innerHeight / 2;
//   const yRatio = (halfHeight - e.clientY) / halfHeight;

//   displacementFilter.scale.x = Math.min(maxScale * xRatio);
//   displacementFilter.scale.y = Math.min(maxScale * yRatio);
// };

export const getParallax = (
  imageUrl,
  depthMapUrl,
  width = 800,
  height = 600
) => {
  const app = new Application({ width, height });
  const imgLayer = Sprite.from(imageUrl);
  const displacementFilterTexture = Sprite.from(depthMapUrl);

  const displacementFilter = new filters.DisplacementFilter(
    displacementFilterTexture
  );

  imgLayer.width = width;
  imgLayer.height = height;

  displacementFilterTexture.width = width;
  displacementFilterTexture.height = height;

  displacementFilter.scale.x = 0;
  displacementFilter.scale.y = 0;

  imgLayer.filters = [displacementFilter];

  app.stage.addChild(imgLayer);
  app.stage.addChild(displacementFilterTexture);

  return { parallax: app.view, filter: displacementFilter };
};
