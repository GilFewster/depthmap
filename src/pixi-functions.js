import { Application, Sprite, filters } from "pixi.js";

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
