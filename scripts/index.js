"use strict";

/* check if field is empty */
const isFieldEmpty = (fields) => {
   let empty = true;
   for (let i = 0; i < fields.length; i++) {
      if (fields[i].value !== "" || fields[i] === "0") {
         empty = false;
      }
   }
   return empty;
};

/* if field is empty disable reset button */
const resetBtnActive = (fields) => {
   const resetBtn = document.querySelector(".reset .btn");

   if (!isFieldEmpty(fields)) {
      resetBtn.classList.remove("active");
   } else {
      resetBtn.classList.add("active");
   }
};

/* clear all field */
const reset = (fields, value) => {
   if (value === "reset") {
      fields.forEach((field) => {
         field.value = "";
         resetBtnActive(0);
      });
   }
};

/* waiting for changes in input field */
const fields = document.querySelectorAll(".field input");

fields.forEach((field, key) => {
   field.addEventListener("input", (event) => {
      resetBtnActive(fields);
   });
});

/* waiting for click */
const btns = document.querySelectorAll(".btn");

btns.forEach((btn, key) => {
   btn.addEventListener("click", (event) => {
      reset(fields, event.target.value);
   });
});
