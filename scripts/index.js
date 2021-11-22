"use strict";

const isFieldEmpty = (datas, d_key) => {
   const resetBtnEl = document.querySelector(".reset .btn");
   const errorEl = document.querySelector(".num_people_error");
   const numPeopleEl = document.getElementById("people");

   let isEmpty = true;

   datas.forEach((data, key) => {
      /* tip_btn activate/deactivate */
      if ((d_key === key && data.type === "button") || (d_key === key && data.id === "custom")) {
         data.classList.add("active");
         isEmpty = false;
      } else if (data.classList.contains("active")) {
         data.classList.remove("active");

         /* to empty custom tip field once other tip button is press */
         if (data.id === "custom") {
            data.value = "";
         }
      }

      /* show warning message */
      if (data.id === "people" && data.value <= 0) {
         errorEl.classList.add("active");
         numPeopleEl.classList.add("active");
      } else {
         errorEl.classList.remove("active");
         numPeopleEl.classList.remove("active");
      }

      /* reset_btn activated when input field not empty */
      if (data.value !== "" && data.type === "number") {
         resetBtnEl.classList.remove("disabled");
         isEmpty = false;
      }
   });

   /* reset_btn is deactivated when input is empty */
   if (isEmpty || d_key === "reset") {
      resetBtnEl.classList.add("disabled");
      errorEl.classList.remove("active");
      numPeopleEl.classList.remove("active");
   }
};

/* ================= computation is here ================= */
let bill = 0,
   people = 0,
   customTip = 0,
   tip = 0;

const calculateTip = (name, value) => {
   const totalAmountEl = document.querySelector(".total_amount");
   const tipAmountEl = document.querySelector(".tip_amount");

   switch (name.id) {
      /* get bill value */
      case "bill":
         bill = Number(value);
         break;

      /* get how many people */
      case "people":
         people = Number(value);
         break;

      /* get custom tip percentage */
      case "custom":
         tip = 0;
         customTip = Number(value) / 100;
         break;

      case "reset":
         reset(value);
         break;

      /* get tip percentage from button */
      default:
         customTip = 0;
         tip = Number(value) / 100;
   }

   let tips = tip === 0 ? customTip : tip;

   let tipAmnt = bill <= 0 || people <= 0 || bill / people === Infinity ? "0.00" : ((bill / people) * tips).toFixed(2);
   let totalAmnt = bill <= 0 || people <= 0 || bill / people === Infinity ? "0.00" : ((bill / people) * (1 + tips)).toFixed(2);

   tipAmountEl.innerHTML = tipAmnt;
   totalAmountEl.innerHTML = totalAmnt;
};

/* ================= waiting for changes in input field ================= */
const fieldsEl = document.querySelectorAll(".field input");

fieldsEl.forEach((field, key) => {
   field.addEventListener("input", (event) => {
      const rgxWholeNum = /^[0-9]+$/;
      const rgxWithDecimal = /^(\d+\.?\d*|\.\d+)$/;

      if (event.target.id === "people" && !rgxWholeNum.test(event.target.value)) {
         event.target.value = "";
      } else if (!rgxWithDecimal.test(event.target.value)) {
         event.target.value = "";
      } else {
         calculateTip(event.target, event.target.value);
      }

      isFieldEmpty(fieldsEl, key);
   });
});

/* ================= waiting for click ================= */
const btnsEl = document.querySelectorAll(".btn");

btnsEl.forEach((btn, key) => {
   btn.addEventListener("click", (event) => {
      calculateTip(event.target, event.target.value);
      isFieldEmpty(btnsEl, key);
   });
});

/* ================= clear all ================= */
const reset = (value) => {
   fieldsEl.forEach((field) => {
      field.value = "";
      (bill = 0), (people = 0), (tip = 0), (customTip = 0);
      isFieldEmpty(fieldsEl, value);
   });
};
