export const submitForm = (imageInput, depthmapInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      const image = imageInput.files[0];
      const depthmap = depthmapInput.files[0];

      if (!image || !depthmap) {
        console.log("Add an image and depthmap first!");
        return;
      }

      const imageObjectUrl = await URL.createObjectURL(image);
      const depthmapObjectUrl = await URL.createObjectURL(depthmap);

      resolve([imageObjectUrl, depthmapObjectUrl]);
    } catch (e) {
      reject(e);
    }
  });

  // uploadImage(URL.createObjectURL(image)).then((el) =>
  //   imgPreview.appendChild(el)
  // );

  // uploadImage(URL.createObjectURL(depthmap)).then((el) =>
  //   depthmapPreview.appendChild(el)
  // );
};

// const uploadImage = async (filepath) => {
//   const img = document.createElement("img");
//   img.src = filepath;
//   return img;
// };
