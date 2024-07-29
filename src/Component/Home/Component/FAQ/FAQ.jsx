import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./button";
function FAQ() {
  const [FAQ1, setFAQ1] = useState(false);
  function FAQ_1() {
    setFAQ1(!FAQ1);
  }
  const [FAQ2, setFAQ2] = useState(false);
  function FAQ_2() {
    setFAQ2(!FAQ2);
  }
  const [FAQ3, setFAQ3] = useState(false);
  function FAQ_3() {
    setFAQ3(!FAQ3);
  }
  const [FAQ4, setFAQ4] = useState(false);
  function FAQ_4() {
    setFAQ4(!FAQ4);
  }
  const [FAQ5, setFAQ5] = useState(false);
  function FAQ_5() {
    setFAQ5(!FAQ5);
  }
  const [FAQ6, setFAQ6] = useState(false);
  function FAQ_6() {
    setFAQ6(!FAQ6);
  }
  return (
    <>
<section class="py-12 sm:py-16 lg:py-24 bg-gradient-to-b font-cairo text-white [direction:rtl]">
  <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
    <div class="text-center mb-12">
      <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
        الأسئلة الشائعة
      </h2>
      <p class="text-lg font-medium max-w-3xl mx-auto">
        اكثر اسئلة تم طرحها يمكنك التعرف عليها من هنا
      </p>
    </div>
    <div class="max-w-3xl mx-auto space-y-4">
      {/* <!-- ما هي الخطط المتوفرة لدى نانوبايت هوست؟ --> */}
      <div class="transition-all duration-300 bg-blue-900 rounded-lg border border-blue-700 shadow-md hover:shadow-xl cursor-pointer">
        <button
          onClick={FAQ_1}
          type="button"
          id="question1"
          data-state="closed"
          class="flex items-center justify-between w-full px-6 py-4 border-b rounded-b-[5px] border-blue-700"
        >
          <span class="text-lg font-semibold text-white">
            ما هي الخطط المتوفرة لدى نانوبايت هوست؟
          </span>
          <i class={`text-white ${FAQ1 ? "fa-solid fa-angle-up" : "fa-solid fa-angle-down"}`}></i>
        </button>
        <div onClick={FAQ_1} id="answer1" class={`${FAQ1 ? "block" : "hidden"} px-6 py-4`}>
          <p class="text-gray-300">
            Getting started is easy! Sign up for an account, and you'll have access to our platform's features. No credit card required for the initial signup.
          </p>
        </div>
      </div>
      {/* <!-- كيف يمكنني الشراء من الموقع؟ --> */}
      <div class="transition-all duration-300 bg-blue-900 rounded-lg border border-blue-700 shadow-md hover:shadow-xl cursor-pointer">
        <button
          onClick={FAQ_2}
          type="button"
          id="question2"
          data-state="closed"
          class="flex items-center justify-between w-full px-6 py-4 border-b rounded-b-[5px] border-blue-700"
        >
          <span class="text-lg font-semibold text-white">
            كيف يمكنني الشراء من الموقع؟
          </span>
          <i class={`text-white ${FAQ2 ? "fa-solid fa-angle-up" : "fa-solid fa-angle-down"}`}></i>
        </button>
        <div onClick={FAQ_2} id="answer2" class={`${FAQ2 ? "block" : "hidden"} px-6 py-4`}>
          <p class="text-gray-300">
            Our pricing structure is flexible. We offer both free and paid plans. You can choose the one that suits your needs and budget.
          </p>
        </div>
      </div>
      {/* <!-- كيف يمكنني الدخول للخادم؟ --> */}
      <div class="transition-all duration-300 bg-blue-900 rounded-lg border border-blue-700 shadow-md hover:shadow-xl cursor-pointer">
        <button
          onClick={FAQ_3}
          type="button"
          id="question3"
          data-state="closed"
          class="flex items-center justify-between w-full px-6 py-4 border-b rounded-b-[5px] border-blue-700"
        >
          <span class="text-lg font-semibold text-white">
            كيف يمكنني الدخول للخادم؟
          </span>
          <i class={`text-white ${FAQ3 ? "fa-solid fa-angle-up" : "fa-solid fa-angle-down"}`}></i>
        </button>
        <div onClick={FAQ_3} id="answer3" class={`${FAQ3 ? "block" : "hidden"} px-6 py-4`}>
          <p class="text-gray-300">
            We offer comprehensive customer support. You can reach out to our support team through various channels, including email, chat, and a knowledge base.
          </p>
        </div>
      </div>
      {/* <!-- كيف يمكنني النقل الى استضافتكم؟ --> */}
      <div class="transition-all duration-300 bg-blue-900 rounded-lg border border-blue-700 shadow-md hover:shadow-xl cursor-pointer">
        <button
          onClick={FAQ_4}
          type="button"
          id="question4"
          data-state="closed"
          class="flex items-center justify-between w-full px-6 py-4 border-b rounded-b-[5px] border-blue-700"
        >
          <span class="text-lg font-semibold text-white">
            كيف يمكنني النقل الى استضافتكم؟
          </span>
          <i class={`text-white ${FAQ4 ? "fa-solid fa-angle-up" : "fa-solid fa-angle-down"}`}></i>
        </button>
        <div onClick={FAQ_4} id="answer4" class={`${FAQ4 ? "block" : "hidden"} px-6 py-4`}>
          <p class="text-gray-300">
            Yes, you can cancel your subscription at any time without any hidden fees. We believe in providing a hassle-free experience for our users.
          </p>
        </div>
      </div>
      {/* <!-- كم المدة لأستلام المنتج الخاص بي؟ --> */}
      <div class="transition-all duration-300 bg-blue-900 rounded-lg border border-blue-700 shadow-md hover:shadow-xl cursor-pointer">
        <button
          onClick={FAQ_5}
          type="button"
          id="question5"
          data-state="closed"
          class="flex items-center justify-between w-full px-6 py-4 border-b rounded-b-[5px] border-blue-700"
        >
          <span class="text-lg font-semibold text-white">
            كم المدة لأستلام المنتج الخاص بي؟
          </span>
          <i class={`text-white ${FAQ5 ? "fa-solid fa-angle-up" : "fa-solid fa-angle-down"}`}></i>
        </button>
        <div onClick={FAQ_5} id="answer5" class={`${FAQ5 ? "block" : "hidden"} px-6 py-4`}>
          <p class="text-gray-300">
            Your product will be delivered as soon as possible. The estimated delivery time will be provided at checkout.
          </p>
        </div>
      </div>
      {/* <!-- هل يوجد حماية DDOS على خدماتكم؟ --> */}
      <div class="transition-all duration-300 bg-blue-900 rounded-lg border border-blue-700 shadow-md hover:shadow-xl cursor-pointer">
        <button
          onClick={FAQ_6}
          type="button"
          id="question6"
          data-state="closed"
          class="flex items-center justify-between w-full px-6 py-4 border-b rounded-b-[5px] border-blue-700"
        >
          <span class="text-lg font-semibold text-white">
            هل يوجد حماية DDOS على خدماتكم؟
          </span>
          <i class={`text-white ${FAQ6 ? "fa-solid fa-angle-up" : "fa-solid fa-angle-down"}`}></i>
        </button>
        <div onClick={FAQ_6} id="answer6" class={`${FAQ6 ? "block" : "hidden"} px-6 py-4`}>
          <p class="text-gray-300">
            Yes, we provide DDoS protection as part of our security measures to ensure your services remain available and secure.
          </p>
        </div>
      </div>
    </div>
    <div class="flex justify-center mt-12">
      <Button />
    </div>
  </div>
</section>

    </>
  );
}
export default FAQ;
