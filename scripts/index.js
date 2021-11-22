"use strict";

const isFieldEmpty = (datas, d_key) => {
   const getResetBtn = document.querySelector(".reset .btn");
   let isEmpty = true;

   datas.forEach((data, key) => {
      /* tip btn activate */
      if (d_key === key) {
         data.classList.add("active");
      } else if (data.classList.contains("active")) {
         data.classList.remove("active");
      }

      /* reset btn activate when input not empty */
      if (data.value !== "") {
         getResetBtn.classList.remove("active");
         isEmpty = false;
      }
   });

   /* reset btn deactivate when input is empty */
   if (isEmpty) {
      getResetBtn.classList.add("active");
   }
};

/* ================= if field is empty disable reset button ================= */
const btnActivate = (fields, key) => {
   const getResetBtn = document.querySelector(".reset .btn");
   const warning = document.querySelector(".num_people_error");

   if (fields.type === "reset") {
      getResetBtn.classList.add("active");
   } else if (!isFieldEmpty(fields, key)) {
      getResetBtn.classList.remove("active");
      warning.classList.remove("active");
   } else {
      getResetBtn.classList.add("active");
      warning.classList.add("active");
   }
};

/* ================= calculate ================= */
const getTotalAmount = document.querySelector(".total_amount");
const getTipAmount = document.querySelector(".tip_amount");
let bill = 0,
   people = 0,
   tip = 0;

const calculate = (name, value) => {
   if (name.id === "bill") {
      bill = Number(value);
   }

   if (name.id === "people") {
      people = Number(value);
   }

   if (name.id === "custom" || name.type === "button") {
      tip = Number(value) === 0 ? "" : Number(value) / 100;
   }

   if (name.type === "reset") {
      reset(name, value);
   }

   let tipAmnt = bill <= 0 || bill / people === Infinity ? "0.00" : ((bill / people) * tip).toFixed(2);
   let totalAmnt = bill <= 0 || bill / people === Infinity ? "0.00" : ((bill / people) * (1 + tip)).toFixed(2);

   getTipAmount.innerHTML = tipAmnt;
   getTotalAmount.innerHTML = totalAmnt;
};

/* ================= waiting for changes in input field ================= */
const getAllfields = document.querySelectorAll(".field input");

getAllfields.forEach((field, key) => {
   field.addEventListener("input", (event) => {
      // btnActivate(getAllfields, key);
      isFieldEmpty(getAllfields, key);
      calculate(event.target, event.target.value);
   });
});

/* waiting for click */
const getAllbtns = document.querySelectorAll(".btn");

getAllbtns.forEach((btn, key) => {
   btn.addEventListener("click", (event) => {
      calculate(event.target, event.target.value);
      isFieldEmpty(getAllbtns, key);
   });
});

/* ================= clear all ================= */
const reset = (name, value) => {
   getAllfields.forEach((field) => {
      field.value = "";
      (bill = 0), (people = 0), (tip = 0);
   });
};
