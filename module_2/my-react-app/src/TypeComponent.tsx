/* ======================================================================================================================
Типізація компонентів
====================================================================================================================== */

// Типізація компонентів

// React та TypeScript разом створюють дуже потужний засіб для
// створення масштабованих та стабільних вебзастосунків. Один
// із найбільш корисних аспектів їхнього спільного використання
//  — це можливість типізації компонентів.

// Це допомагає збільшити впевненість у коректності вашого коду,
// покращує автодоповнення в IDE та робить ваш код більш
// читабельним та зрозумілим.

// Ми розглянемо різні підходи для визначення компонента,
// почнемо з найпростішого.

// import React from "react";

// type Props = {
//   name: string;
//   age: number;
// };

// export function User({ name, age }: Props) {
//   return (
//     <div>
//       <p>{`User name is ${name}`}</p>
//       <p>{`User age is ${age}`}</p>
//     </div>
//   );
// }

// У цьому прикладі ми визначаємо тип Props, який описує пропси,
// що приймає наш компонент User. Потім ми використовуємо цей
// тип для анотації пропсів у функції компонента.

// -------------------------------------

// Ми також можемо використовувати React.FC або React.FunctionComponent
// для визначення типів функціонального компонента:

// import React from "react";

// type Props = {
//   name: string;
//   age: number;
// };

// export const User: React.FC<Props> = ({ name, age }) => {
//   return (
//     <div>
//       <p>{`User name is ${name}`}</p>
//       <p>{`User age is ${age}`}</p>
//     </div>
//   );
// };

// У цьому прикладі React.FC<Props> визначає тип функціонального
// компонента, який приймає пропси типу Props. Це використання
// generic дозволяє автоматично уточнити тип аргументів функції.
// Однак варто зазначити, що React.FC і React.FunctionComponent
// автоматично додають визначення типу для пропа children, навіть
// якщо він не визначений у типах пропсів.

// Деякі розробники вважають за краще уникати використання React.FC
// і React.FunctionComponent з цієї причини.

// ------------------------------------------

// Тут зазначено, що React.FC сам типізує children, але давайте подивимося, як це зробити самостійно:

// import React from "react";

// type Props = {
//   name: string;
//   age: number;
//   children: React.ReactNode; // Типiзация для children
// };

// export function User({ name, age, children }: Props) {
//   return (
//     <div>
//       <p>{`User name is ${name}`}</p>
//       <p>{`User age is ${age}`}</p>
//       {children} {/* Рендерим children */}
//     </div>
//   );
// }

// Давайте трохи розберемося у цих типах для children.

// React.ReactNode: це більш загальний тип, який містить в собі
// майже всі можливі типи, які можуть бути відрендерені в компоненті
// React. Це може містити string, number, null, undefined, boolean,
// ReactElement, ReactFragment, ReactPortal.

// -----------------------------------------------------

// React.ReactElement: якщо ви використовуєте ReactElement у типах
// для children, ви зможете приймати тільки елементи React.

// Ось приклад типізації children як ReactElement:

// import React from "react";

// type Props = {
//   children: React.ReactElement;
// };

// export function Panel({ children }: Props) {
//   return <div>{children}</div>;
// }

// Тепер Panel може приймати лише дочірні елементи, які є елементами React:

// // Це працює:
// <Panel>
//   <div>Hello, world!</div>
// </Panel>

// // Це не працює, тому що
// // "Hello, world!" - це рядок, а не елемент
// <Panel>Hello, world!</Panel>

// Ви також можете побачити такий тип даних, як JSX.Element,
// це по суті React.ReactElement, єдина різниця, що ReactElement —
// це вбудований тип у бібліотеці React, а JSX.Element — це інтерфейс,
// визначений у глобальній області JSX TypeScript. Однак, використання
// ReactElement є більш явним та надійним.

// -----------------------------------------------------

// Давайте ще розглянемо типізацію функцій та об'єктів у пропсах:

// import React from "react";

// type User = {
//   name: string;
//   email: string;
// };

// type Props = {
//   user: User;
//   onUserUpdate: (user: User) => void;
// };

// export function UserProfile({ user, onUserUpdate }: Props) {
//   // компонент UserProfile
//   return null;
// }

// Тут user — це об'єкт з певною структурою, а onUserUpdate —
// це функція, що приймає об'єкт такої ж структури.
