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

   /* to empty custom tip field once other tip button is press */
   if (datas[5]) {
      datas[5].value = datas[5].value === "" ? datas[5].value : "";
   }

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
         bill = value;
         break;

      /* get how many people */
      case "people":
         people = value;
         break;

      /* get custom tip percentage */
      case "custom":
         tip = 0;
         customTip = value / 100;
         break;

      case "reset":
         reset(value);
         break;

      /* get tip percentage from button */
      default:
         customTip = 0;
         tip = value / 100;
   }

   /* total tip & amount computation is here */
   let tips = tip === 0 ? customTip : tip;

   let tipAmnt = bill <= 0 || bill / people === Infinity ? "0.00" : ((bill * tips) / people).toFixed(2);

   let totalAmnt = bill <= 0 || bill / people === Infinity ? "0.00" : ((bill * (1 + tips)) / people).toFixed(2);

   /* display the result */
   tipAmountEl.innerHTML = totalAmnt.length <= 11 ? Number(tipAmnt).toLocaleString("en", { minimumFractionDigits: 2 }) : Number(tipAmnt).toExponential(4);
   totalAmountEl.innerHTML = totalAmnt.length <= 11 ? Number(totalAmnt).toLocaleString("en", { minimumFractionDigits: 2 }) : Number(totalAmnt).toExponential(4);
};

/* ================= waiting for changes in input field ================= */
const fieldsEl = document.querySelectorAll(".field input");

fieldsEl.forEach((field, key) => {
   field.addEventListener("input", (e) => {
      /* regular expression */
      const rgxWholeNum = /^[0-9]+$/;
      const rgxWithDecimal = /^(\d+\.?\d*|\.\d+)$/;
      let value = e.target.value;

      /* limit the digit */
      if (value.length > 16) {
         e.target.value = value.slice(0, -1);

         /* allow whole numbers only */
      } else if (e.target.id === "people" && !rgxWholeNum.test(value)) {
         e.target.value = "";
         calculateTip(e.target, 0);

         /* allow whole & decimal numbers only */
      } else if (!rgxWithDecimal.test(value)) {
         e.target.value = "";
         calculateTip(e.target, 0);

         /* start to compute */
      } else {
         calculateTip(e.target, value);
      }

      /* activate/deactivate reset_btn */
      isFieldEmpty(fieldsEl, key);
   });
});

/* ================= waiting for click ================= */
const btnsEl = document.querySelectorAll(".btn");

btnsEl.forEach((btn, key) => {
   btn.addEventListener("click", (e) => {
      let value = e.target.value;
      calculateTip(e.target, value);

      /* activate/deactivate tip_btn */
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
