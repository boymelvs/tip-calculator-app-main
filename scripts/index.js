"use strict";

const isFieldEmpty = (datas, d_key) => {
   const getResetBtn = document.querySelector(".reset .btn");
   let isEmpty = true;

   datas.forEach((data, key) => {
      /* tip btn activate */
      if (d_key === key && data.type === "button") {
         data.classList.add("active");
         isEmpty = false;
      } else if (data.classList.contains("active")) {
         data.classList.remove("active");
      }

      /* reset btn activate when input not empty */
      if (data.value !== "" && data.type === "number") {
         getResetBtn.classList.remove("disabled");
         isEmpty = false;
         console.log("this test2");
      }
   });

   /* reset btn deactivate when input is empty */
   if ((isEmpty && !getResetBtn.classList.contains("disabled")) || d_key === "reset") {
      getResetBtn.classList.add("disabled");
      console.log("this test1");
   }
};

/* ================= calculate ================= */
const getTotalAmount = document.querySelector(".total_amount");
const getTipAmount = document.querySelector(".tip_amount");
let bill = 0,
   people = 0,
   customTip = 0,
   tip = 0;

const calculate = (name, value) => {
   if (name.id === "bill") {
      bill = Number(value);
   }

   if (name.id === "people") {
      people = Number(value);
   }

   if (name.id === "custom") {
      customTip = Number(value) === 0 ? "" : Number(value) / 100;
   }

   if (name.type === "button") {
      tip = Number(value) === 0 ? "" : Number(value) / 100;
   }

   if (name.type === "reset") {
      reset(value);
   }

   let tips = tip === 0 ? customTip : tip;

   let tipAmnt = bill <= 0 || bill / people === Infinity ? "0.00" : ((bill / people) * tips).toFixed(2);
   let totalAmnt = bill <= 0 || bill / people === Infinity ? "0.00" : ((bill / people) * (1 + tips)).toFixed(2);

   getTipAmount.innerHTML = tipAmnt;
   getTotalAmount.innerHTML = totalAmnt;
};

/* ================= waiting for changes in input field ================= */
const getAllfields = document.querySelectorAll(".field input");

getAllfields.forEach((field, key) => {
   field.addEventListener("input", (event) => {
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
const reset = (value) => {
   getAllfields.forEach((field) => {
      field.value = "";
      (bill = 0), (people = 0), (tip = 0);
      isFieldEmpty(getAllfields, value);
   });
};
