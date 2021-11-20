"use strict";

const isFieldEmpty = (field) => {
   return (field === "") | (field === "0") ? true : false;
};

const fields = document.querySelectorAll(".field");
const reset = document.querySelector(".reset .btn");

fields.forEach((field, key) => {
   field.addEventListener("input", (e) => {
      e.target.value = e.target.value.toLocaleString("en-US");
      console.log("this", e.target.value);

      //   if (!isFieldEmpty(value)) {
      //      reset.classList.remove("active");
      //   } else {
      //      reset.classList.add("active");
      //   }
   });
});

const btns = document.querySelectorAll(".btn");

btns.forEach((btn, key) => {
   btn.addEventListener("click", (event) => {
      console.log("this is test click", btn, event.target.value);
   });
});
