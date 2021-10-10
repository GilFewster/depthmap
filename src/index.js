const form = document.querySelector("#fileUploadForm");
const imageInput = document.querySelector("#imageInput");
const depthmapInput = document.querySelector("#depthmapInput");
const submitButton = form.querySelectorAll('[type = "submit"]')[0];
const imgPreview = document.querySelector("#imgPreview");
const depthmapPreview = document.querySelector("#depthmapPreview");

const uploadImage = async (filepath) => {
  const img = document.createElement("img");
  img.src = filepath;
  return img;
};

fileUploadForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const image = imageInput.files[0];
  const depthmap = depthmapInput.files[0];

  if (!image || !depthmap) {
    console.log("Add an image and depthmap first!");
    return;
  }

  uploadImage(URL.createObjectURL(image)).then((el) =>
    imgPreview.appendChild(el)
  );

  uploadImage(URL.createObjectURL(depthmap)).then((el) =>
    depthmapPreview.appendChild(el)
  );
});
