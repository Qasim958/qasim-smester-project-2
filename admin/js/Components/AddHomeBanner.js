import { BASE_URL } from "../api/index.js";
import { getHomeHeader } from "../data/home.js";
import { getUserAuthTokenFromLocalStorage } from "../settings/localStorage.js";
import { getFormFieldsData } from "../utilities/getformData.js";
import { messageBox } from "../utilities/message.js";
import {
  validateHomeBannerImageForm,
  validateProductForm,
} from "../utilities/validation.js";

export async function AddHomeBanner() {
  const data = await getHomeHeader();

  await setAddHomeBannerFormValues(data);

  const editHomeBannerFormBtn = document.getElementById("addHomeBannerForm");
  editHomeBannerFormBtn.addEventListener("submit", addHomeBanner);
}
async function setAddHomeBannerFormValues(data) {
  const imageUrlInputOutput = document.getElementById(
    "addHomeBannerImageUrlOutput"
  );
  const imageUrlInput = document.getElementById("addHomeBannerImageUrl");
  const imageAltTextInput = document.getElementById(
    "addHomeBannerImageAltText"
  );
  console.log(data)
  imageAltTextInput.value = `${data.data.hero_banner_alt_text}`;
  imageUrlInput.value = `${BASE_URL}${data.data.hero_banner.url}`;
  imageUrlInputOutput.src = `http://localhost:1337${data.data.hero_banner.url}`;
  imageUrlInputOutput.alt = `${data.data.hero_banner_alt_text}`;
}
async function addHomeBanner() {
  event.preventDefault();
  let image = document.getElementById("addHomeBannerImageFile");
  let imageUrl = getFormFieldsData("addHomeBannerImageUrl");
  let imageAltTxt = getFormFieldsData("addHomeBannerImageAltText");
  const TOKEN = await getUserAuthTokenFromLocalStorage();

  if (
    validateHomeBannerImageForm(
      imageUrl,
      "addHomeBannerImageUrlputMsg",
      imageAltTxt,
      "addHomeBannerImageAltTextMsg"
    )
  ) {
    updateHomeBanner(image, imageUrl, imageAltTxt, TOKEN);
  }
}
const updateHomeBanner = async (image, image_url, imageAltTxt, AUTH_TOKEN) => {
  event.preventDefault();
  try {

    const data = {
      files: image.files[0] 
    };

    axios
      .post(`http://localhost:1337/upload`, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AUTH_TOKEN}`
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    if (Object.keys(result).length > 0) {
      messageBox(
        "Home Banner Image Updated Successfully",
        "addHomeBannerImageUrlMsg",
        "green"
      );
    } else {
      messageBox("Something Went Wrong", "addHomeBannerImageUrlMsg", "red");
    }
  } catch (error) {}
};


    // let result = await response.json();
    // console.log(result)
    // "Content-Type": "multipart/form-data",
    // body: JSON.stringify(formData),
    // "Content-Type": "application/json",
    // body: JSON.stringify(data),
    // "Content-Type": "application/json",

    // const data = {
    //   data: {
    //   hero_banner: image.files[0],
    //   // hero_banner : image_url,
    //   hero_banner_alt_text: imageAltTxt,
    //   }
    // };

    // const formData = new FormData();
    // formData.append("hero_banner", image.files[0]);
    // formData.append("hero_banner_alt_text", imageAltTxt);

    // const response = await fetch(`http://localhost:1337/home`, {
    //   method: "PUT",
    // headers: {
    //   Origin: "*",
    //   Authorization: `Bearer ${AUTH_TOKEN}`,
    // },
    //   body: JSON.stringify(data),
    // });
    // let result = await response.json();
    // console.log(result)

    // const response = await axios.post(`http://localhost:1337/upload`, JSON.stringify(formData), {
    //   headers:{
    //     "Content-Type": "multipart/form-data",
    //   Authorization: `Bearer ${AUTH_TOKEN}`
    // }
    // });

    // axios.post("http://localhost:1337/images", {})
    //   .then(res => {
    //     console.log(res);

    //     formData.append('refId', res.data.id);
