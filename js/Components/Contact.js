import { messageBox } from "./../utils/message.js";
import { getFormFieldsData } from "./../utils/getFormData.js";
import { validateContactForm } from "./../utils/validation.js";

export function Contact() {
  document.getElementById("contact").addEventListener("submit", contactForm);
}

function contactForm() {
  event.preventDefault();
  let name = getFormFieldsData("name");
  let email = getFormFieldsData("email");
  let subject = getFormFieldsData("subject");
  let message = getFormFieldsData("message");

  if (validateContactForm(name, email, subject, message)) {
    messageBox("Form submitted successfully", "contactMsg", "green");
  }
}
