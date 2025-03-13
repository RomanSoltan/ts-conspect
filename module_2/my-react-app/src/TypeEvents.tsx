/* ======================================================================================================================
Типізація подій
====================================================================================================================== */

// React і TypeScript надають типи для різних подій, що відповідають
// типу подій DOM. Ось деякі з них:

// React.MouseEvent — це тип для подій миші, таких як клік ****(onClick),
// подвійний клік (onDoubleClick), натискання миші (onMouseDown), рух миші
// (onMouseMove) тощо Ми можемо використовувати його разом з різними
// елементами, наприклад, <HTMLButtonElement>.

// React.ChangeEvent — це тип для подій змін, що відбуваються, коли стан
// елемента форми змінюється. Він часто використовується з <HTMLInputElement>,
// <HTMLSelectElement> та <HTMLTextAreaElement>.

// React.FormEvent — це тип для подій, пов'язаних з формами, наприклад, під час
//  надсилання форми (onSubmit).

// React.KeyboardEvent — це тип для подій клавіатури, таких як натискання кнопки
// (onKeyPress), відпускання кнопки (onKeyUp) і т. ін.

// React.FocusEvent — це тип для подій фокусування, таких як отримання фокуса
// (onFocus) та втрата фокуса (onBlur).

// React.DragEvent — це тип для подій перетягування.

// React.WheelEvent — це тип для подій прокручування колеса миші.

// React.TouchEvent — це тип, призначений для обробки подій торкання.
// Він часто використовується для створення інтерфейсів, оптимізованих
// для пристроїв із сенсорним екраном.

// ---------------------------------------------------

// Давайте почнемо з події onSubmit.

// Чудовий приклад ситуації, коли нам потрібен об'єкт події — це використання
// preventDefault. Цей метод часто використовується, коли потрібно запобігти
// стандартній поведінці браузера.

// import React, { FormEvent } from "react";

// function MyForm() {
//   const handleSubmit = (event: FormEvent) => {
//     // запобігаємо стандартній поведінці форми (відправці форми)
//     event.preventDefault();
//     console.log("Форма була відправлена!");
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <button type="submit">Відправити</button>
//     </form>
//   );
// }

// export default MyForm;

// У цьому прикладі event.preventDefault() запобігає оновленню
// сторінки, яке зазвичай відбувається під час відправлення форми.

// ---------------------------------------------------

// Давайте розглянемо onClick. Зазвичай нам не потрібно використовувати
// типізацію для event всередині події onClick, проте можуть виникнути
// ситуації, де це може бути корисним.

// import React, { MouseEvent } from "react";

// function ChildComponent() {
//   const handleChildClick = (event: MouseEvent<HTMLButtonElement>) => {
//     // Зупиняємо спливання події до батьківського компонента
//     event.stopPropagation();
//     console.log("Клікнуто дитячий компонент");
//   };

//   return <button onClick={handleChildClick}>Натисни мене</button>;
// }

// function ParentComponent() {
//   const handleParentClick = (event: MouseEvent<HTMLDivElement>) => {
//     console.log("Клікнуто батьківський компонент");
//   };

//   return (
//     <div onClick={handleParentClick}>
//       <ChildComponent />
//     </div>
//   );
// }

// export default ParentComponent;

// У цьому прикладі, коли ви натискаєте кнопку всередині ChildComponent,
// викликається обробник події handleChildClick. Цей обробник зупиняє
// спливання події до батьківського компонента за допомогою
// event.stopPropagation(). Це означає, що обробник події кліка
// handleParentClick батьківського компонента не буде викликаний,
// якщо ви натиснете кнопку.

// -----------------------------------------------

// Давайте розберемо onChange. Тут часто потрібна типізація, оскільки
// ми зазвичай працюємо зі значенням (value) всередині цього обробника.
// Давайте розглянемо типізацію події ChangeEvent на прикладі обробника
// змін у текстовому полі введення.

// У цьому контексті ChangeEvent<HTMLInputElement> означає подію зміни,
// що відбувається в елементі введення.

// import React, { ChangeEvent, useState } from "react";

// function TextInput() {
//   const [text, setText] = useState<string>("");

//   const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setText(event.target.value);
//     console.log("Введений текст:", event.target.value);
//   };

//   return <input type="text" value={text} onChange={handleTextChange} />;
// }

// export default TextInput;

// У цьому прикладі функція handleTextChange обробляє подію зміни
// ChangeEvent<HTMLInputElement>. Це означає, що вона чекає на подію,
// що відбувається в елементі введення. За допомогою цієї події ми
// можемо отримати поточне значення текстового поля введення за
// допомогою event.target.value, а потім оновити стан компонента з
// цим новим значенням.

// Примітка: event.target.value завжди буде рядком, оскільки це
// значення атрибута value HTML елемента введення. Це справедливо,
// навіть якщо ви вводите цифри.

// -----------------------------------

// Тому давайте створимо свій компонент Input, що буде приймати обробник
// onChange і тип введення в якості пропсів. Залежно від типу введення,
// ми перетворюємо значення на потрібний формат перед тим, як передати
// його обробнику onChange.

// import React, { ChangeEvent } from "react";

// type InputProps = {
//   value: string | number;
//   type: "text" | "number";
//   onChange: (value: string | number) => void;
// };

// function Input({ value, type, onChange }: InputProps) {
//   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
//     let newValue = event.target.value;

//     if (type === "number") {
//       newValue = Number(newValue);
//     }
//     console.log("Змінене значення:", newValue);
//     onChange(newValue);
//   };

//   return <input value={value.toString()} type={type} onChange={handleChange} />;
// }

// export default Input;

// У цьому прикладі, в обробнику події handleChange значення введення
// перетворюється на число, якщо тип введення заданий як 'number'.
// Потім, вже перетворене значення передається в обробник onChange,
// який був переданий як пропс.

// ----------------------------------------------------

// Давайте розглянемо події типу KeyboardEvent. Припустимо, ми захотіли
// додати до нашого Input обробник подій для натискання клавіші Enter.

// import React, { KeyboardEvent } from "react";

// type InputProps = {
//   value: string;
//   onChange: (value: string) => void;
//   onPressEnter: () => void;
// };

// function Input({ value, onChange, onPressEnter }: InputProps) {
//   const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
//     if (event.key === "Enter") {
//       console.log("Натиснута клавіша Enter");
//       onPressEnter();
//     }
//   };

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     onChange(event.target.value);
//   };

//   return (
//     <input value={value} onChange={handleChange} onKeyPress={handleKeyPress} />
//   );
// }

// export default Input;

// У цьому компоненті ми обробляємо подію onKeyPress в обробнику
// handleKeyPress. Якщо натиснута клавіша є клавішею "Enter", ми
// викликаємо функцію onPressEnter з наших пропсів. Це може бути
// корисним, наприклад, у формі пошуку, де ми хочемо відправити
// форму, коли користувач натискає Enter.

// ----------------------------------------

// Як правильно типізувати подію onClick для елемента button?

// (event: MouseEvent<HTMLButtonElement>) => void
// (event: React.MouseEvent<HTMLButtonElement, Mouse>) => void
// (event: ClickEvent) => void
// (event: ReactClickEvent) => void
// Результат

// Правильно! (event: MouseEvent<HTMLButtonElement>) => void

// ----------------------------------------------

// Який тип потрібно застосувати для події onChange під час роботи з елементом input?

// ReactInputEvent
// React.ChangeEvent<HTMLInputElement>
// React.Change<HTMLInputElement>
// HTMLInputElement<ChangeEvent>
// Результат

// Правильно! React.ChangeEvent<HTMLInputElement> використовується для типізації подій зміни, що відбуваються в елементі input.
