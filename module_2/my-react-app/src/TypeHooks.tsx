// Типізація хуків

// useState

// useState є одним з найбільш часто використовуваних хуків
// і розуміння його типізації може бути дуже корисним.

// Можна визначити типи для стану, який потрібно зберегти
// за допомогою useState. Ось базовий приклад використання useState з типізацією:

// import React, { useState } from "react";

// export function Counter() {
//   const [count, setCount] = useState<number>(0);

//   const increment = () => {
//     setCount((prevCount) => prevCount + 1);
//   };

//   return (
//     <div>
//       <p>Count: {count}</p>
//       <button onClick={increment}>Increment</button>
//     </div>
//   );
// }

// У цьому прикладі useState<number>(0) говорить TypeScript,
// що count має бути числом. Завдяки цьому TypeScript попереджатиме
// вас, якщо ви випадково спробуєте присвоїти count значення іншого типу.

// І як ми бачимо, тип для useState як і для інших хуків приймає
// generic, тим самим сам count отримує тип number і setCount
// приймає аргумент number.

// Оскільки тип простий, ми можемо не вказувати <number>, бо ми передали 0
// як початкове значення. TypeScript, спираючись на тип переданого значення,
// сам би присвоїв number.

// const [count, setCount] = useState(0);

// -------------------------------------------

// Типізацію можна використовувати не тільки для простих типів, як number або string,
// але і для складніших структур даних, таких як масиви або об'єкти:

// import React, { useState } from "react";

// type User = {
//   name: string;
//   email: string;
// };

// export function UserComponent() {
//   const [user, setUser] = useState<User>({
//     name: "John",
//     email: "john@example.com",
//   });
// }

// //...

// У цьому прикладі useState<User> вказує, що user має бути об'єктом
// певного типу User. Це допомагає гарантувати, що об'єкт користувача
// завжди матиме коректну структуру.

// -------------------------------------------------------------------

// Ми також можемо використовувати Union Types, наприклад для статусу
// завантаження, давайте подивимося на прикладі:

// import React, { useState } from "react";

// type Status = "loading" | "idle" | "error";

// export function LoadingComponent() {
//   const [status, setStatus] = useState<Status>("idle");

//   const loadData = async () => {
//     setStatus("loading");
//     try {
//       // Тут була б ваша логіка завантаження даних
//       // У випадку успіху:
//       setStatus("idle");
//     } catch (error) {
//       // У випадку помилки:
//       setStatus("error");
//     }
//   };

//   return (
//     <div>
//       <p>Status: {status}</p>
//       <button onClick={loadData}>Завантажити дані</button>
//     </div>
//   );
// }

// У цьому прикладі Status — це union type, що представляє можливі
// стани завантаження даних. Стан status використовується для
// відстеження поточного стану завантаження, і він може набувати
// лише значень, визначених у Status.

// ----------------------------------------------------------------------

// Давайте розглянемо приклад, коли ми маємо якесь початкове значення
// і ми хочемо його модифікувати в useState, а зберігати вже після зміни,
// розглянемо на прикладі TextInput:

// import React, { useState } from "react";

// type Props = {
//   initialValue: string;
//   onSave: (value: string) => void;
// };

// export function TextInput({ initialValue, onSave }: Props) {
//   const [value, setValue] = useState(initialValue);

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setValue(event.target.value);
//   };

//   const handleSave = () => {
//     onSave(value);
//   };

//   return (
//     <div>
//       <input type="text" value={value} onChange={handleChange} />
//       <button onClick={handleSave}>Save</button>
//     </div>
//   );
// }

// У цьому прикладі ми приймаємо initialValue й onSave як props.
// Ми зберігаємо initialValue в стані й оновлюємо її під час зміни
// текстового поля. Після натискання на кнопку "Save", поточне
// значення зі стану передається в функцію onSave. Зверніть увагу,
// що тепер для хука useState ми не задавали типи, тому що саме
// початкове значення вже типізовано і нам не потрібні інші значення.

/* ======================================================================================================================
useRef
====================================================================================================================== */

// Коли ви використовуєте useRef, можна вказати тип посилання.
// Це корисно, якщо ви маєте посилання на DOM-елемент, і ви
// хочете отримати доступ до його властивостей або методів.

// Ось простий приклад використання useRef з типом HTMLInputElement:

// import React, { useRef } from "react";

// export function TextInputWithFocus() {
//   // Тут ми вказуємо, що ref буде посилатися на елемент типу HTMLInputElement
//   const inputEl = useRef<HTMLInputElement>(null);

//   const onButtonClick = () => {
//     // Поле current тепер має властивості, що є у елемента HTMLInputElement
//     inputEl.current?.focus();
//   };

//   return (
//     <>
//       {/* Тут inputEl стане посиланням на цей input елемент */}
//       <input ref={inputEl} type="text" />
//       <button onClick={onButtonClick}>Встановити фокус на поле введення</button>
//     </>
//   );
// }

// У цьому прикладі useRef використовується для створення посилання
// на елемент input. Зверніть увагу, що ми вказуємо HTMLInputElement
// як тип useRef. Це означає, що ми матимемо доступ до всіх властивостей
// і методів input елемента, таких як метод focus.

// ---------------------------------------------------------------------

// useRef дозволяє створювати посилання на будь-який тип DOM-елемента.
// Таким чином, можна використовувати посилання не тільки на HTMLInputElement,
// але й на інші типи елементів, такі як HTMLTextAreaElement, HTMLDivElement,
// HTMLSelectElement і так далі.

// import React, { useRef } from "react";

// export function ComponentWithRef() {
//   const divRef = useRef<HTMLDivElement>(null);
//   const textareaRef = useRef<HTMLTextAreaElement>(null);
//   const selectRef = useRef<HTMLSelectElement>(null);

//   // ...

//   return (
//     <>
//       <div ref={divRef}>Це div елемент</div>
//       <textarea ref={textareaRef}></textarea>
//       <select ref={selectRef}></select>
//     </>
//   );
// }

// В даному прикладі ми маємо посилання на різні типи DOM-елементів.
// Усі вони типізовані відповідним чином, що дозволяє нам звертатися
// до властивостей та методів цих елементів без проблем із типами.

// --------------------------------------------------------------------

// useRef не обмежується лише елементами DOM. Ви можете використовувати
// useRef для зберігання будь-якого типу значень, які потрібно зберегти
// між рендерами, але при цьому зміна яких не викликає повторний рендер.
// Це можуть бути примітивні типи, об'єкти, функції і т. ін. Важливо
// врахувати, що кожне значення, що ви зберігаєте в useRef, має бути
// типізовано.

// import React, { useRef } from "react";

// export function ComponentWithRef() {
//   const countRef = useRef<number>(0);

//   const increment = () => {
//     countRef.current += 1;
//     console.log(`Поточне значення: ${countRef.current}`);
//   };

//   return <button onClick={increment}>Збільшити</button>;
// }

// У цьому прикладі ми маємо посилання на число, що використовується
// для зберігання стану лічильника. Це значення не викликає повторного
// рендеру компонента під час його зміни, але зберігається між рендерами.

// Тут ми типізуємо countRef як number за допомогою узагальнення (<number>),
// що гарантує, що ми можемо використовувати лише числові операції з
// countRef.current.

// Правда, оскільки у нас є початкове значення, вказувати <number> необов'язково.

/* ======================================================================================================================
useReducer
====================================================================================================================== */

// useReducer — це хук, який використовується для керування складним станом.
// У багатьох випадках це може бути більш зручною альтернативою useState,
// особливо коли є складні стани або переходи станів, які потрібно обробляти.

// Ми можемо типізувати useReducer, визначаючи типи стану і дій. Спочатку,
// давайте визначимо тип стану та тип дії:

// type State = {
//   count: number;
// };

// type Action = { type: "increment" } | { type: "decrement" };

// У цьому випадку наш стан просто містить лічильник, а дії можуть
// бути або 'increment', або 'decrement'.

// ---------------------------

// Далі ми визначаємо функцію-редюсер, що приймає поточний стан та
// дію та повертає новий стан:

// function reducer(state: State, action: Action): State {
//   switch (action.type) {
//     case "increment":
//       return { count: state.count + 1 };
//     case "decrement":
//       return { count: state.count - 1 };
//     default:
//       throw new Error();
//   }
// }

// І нарешті, ми можемо використати useReducer в нашому
// компоненті, також типізувавши початковий стан:

// import { useReducer } from "react";
// const initialState: State = { count: 0 };

// function Counter() {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   // ...
// }

// --------------------------------------

// Розглянемо приклад складного стану, використовуючи useReducer.
// Стан складатиметься з об'єкта User, який має id, name та email:

// type User = {
//   id: string;
//   name: string;
//   email: string;
// };

// type State = {
//   loading: boolean;
//   error: string | null;
//   user: User | null;
// };

// type Action =
//   | { type: "LOADING" }
//   | { type: "SUCCESS"; payload: User }
//   | { type: "ERROR"; error: string };

// Тут у нас є три типи дій:

// LOADING: встановлює стан завантаження.
// SUCCESS: встановлює отриманого користувача та скидає стан завантаження та помилку.
// ERROR: встановлює повідомлення про помилку та скидає стан завантаження.

// Тепер визначимо функцію-reducer:

// function reducer(state: State, action: Action): State {
//   switch (action.type) {
//     case "LOADING":
//       return { ...state, loading: true, error: null };
//     case "SUCCESS":
//       return { loading: false, error: null, user: action.payload };
//     case "ERROR":
//       return { ...state, loading: false, error: action.error };
//     default:
//       throw new Error();
//   }
// }

// Використання useReducer в компоненті з типізованим початковим станом:

// const initialState: State = {
//   loading: false,
//   error: null,
//   user: null,
// };

// function UserLoader() {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   // ...
// }

// Тепер, коли ми використовуємо dispatch, TypeScript перевірятиме, щоб наші дії були правильними.

// dispatch({ type: 'LOADING' }); // OK
// dispatch({ type: 'SUCCESS', payload: { id: '1', name: 'John', email: 'john@example.com' } }); // OK
// dispatch({ type: 'ERROR', error: 'Failed to load user' }); // OK
// dispatch({ type: 'SUCCESS' }); // Error, payload is missing
// dispatch({ type: 'ERROR' }); // Error, error is missing

// --------------------------------------------------------------

// Зберемо це разом і подивимося на результат:

// import React, { useReducer, useEffect } from "react";

// type User = {
//   id: string;
//   name: string;
//   email: string;
// };

// type State = {
//   loading: boolean;
//   error: string | null;
//   user: User | null;
// };

// type Action =
//   | { type: "LOADING" }
//   | { type: "SUCCESS"; payload: User }
//   | { type: "ERROR"; error: string };

// function reducer(state: State, action: Action): State {
//   switch (action.type) {
//     case "LOADING":
//       return { ...state, loading: true, error: null };
//     case "SUCCESS":
//       return { loading: false, error: null, user: action.payload };
//     case "ERROR":
//       return { ...state, loading: false, error: action.error };
//     default:
//       throw new Error();
//   }
// }

// const initialState: State = {
//   loading: false,
//   error: null,
//   user: null,
// };

// export function UserLoader() {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   useEffect(() => {
//     const fetchUser = async () => {
//       dispatch({ type: "LOADING" });

//       try {
//         const response = await fetch("/api/user");
//         const user = await response.json();

//         dispatch({ type: "SUCCESS", payload: user });
//       } catch (error) {
//         dispatch({ type: "ERROR", error: (error as Error).message });
//       }
//     };
//     fetchUser();
//   }, []);

//   if (state.loading) {
//     return <div>Loading...</div>;
//   }

//   if (state.error) {
//     return <div>Error: {state.error}</div>;
//   }

//   if (!state.user) {
//     return null;
//   }

//   return (
//     <div>
//       <p>{state.user.name}</p>
//       <p>{state.user.email}</p>
//     </div>
//   );
// }

// ---------------------------------------------------

/* ======================================================================================================================
useContext
====================================================================================================================== */

// useContext — це хук, що дозволяє нам мати доступ до значення контексту,
// не огортаючи компонент у Consumer. Це справді спрощує доступ до значень контексту.

// Коли ми працюємо з TypeScript, важливо типізувати не лише наші компоненти та стани,
// а й контексти. Разом з useContext типізація контексту дозволяє нам впевнено
// використовувати значення контексту, знаючи, що вони завжди будуть типом, який ми визначили.

// import React, { createContext, useContext, useState } from "react";

// type User = {
//   name: string;
//   email: string;
// };

// type UserContextProps = {
//   user: User | null;
//   setUser: React.Dispatch<React.SetStateAction<User | null>>;
// };

// const UserContex = createContext<UserContextProps | undefined>(undefined);

// type Props = {
//   children: React.ReactNode;
// };

// // Сам провайдер
// export function UserProvider({ children }: Props) {
//   const [user, setUser] = useState<User | null>(null);

//   return (
//     <UserContex.Provider value={{ user, setUser }}>
//       {children}
//     </UserContex.Provider>
//   );
// }

// // Хук для використання контексту
// export function useUserState() {
//   const context = useContext(UserContex);

//   if (context === undefined) {
//     throw new Error("useUser must be used within a UserProvider");
//   }
//   return context;
// }

// У прикладі вище ми створили контекст UserContext, який містить поточного
// користувача та функцію для встановлення поточного користувача. Ми також
// створили користувацький хук useUserState, який огортає useContext, щоб
// ми могли зручно використовувати цей контекст у наших компонентах. Якщо
// useUser використовується поза провайдером, він видасть помилку, що допоможе
// уникнути неправильного використання цього хука.

// ---------------------------------

// Також зверніть увагу на те, як ми типізували setUser. Ми додали типи
// React.Dispatch<React.SetStateAction<User | null>>, оскільки в React
// функція, яку повертає useState, це Dispatch.

// import React, { useEffect } from "react";
// import { useUserState } from "./UserProvider";

// // Компонент, що використовує контекст
// function UserProfile() {
//   const { user, setUser } = useUserState();

//   // Моделюємо завантаження даних про користувача.
//   useEffect(() => {
//     setTimeout(() => {
//       setUser({
//         name: "John Doe",
//         email: "john.doe@example.com",
//       });
//     }, 2000);
//   }, [setUser]);

//   if (!user) {
//     return <p>Loadng...</p>;
//   }

//   return (
//     <div>
//       <h1>{user.name}</h1>
//       <p>{user.email}</p>
//     </div>
//   );
// }

// У цьому прикладі ми імпортуємо useUserState хук всередині компонента
// UserProfile. Ми також використовуємо setUser із контексту, щоб
// оновити стан користувача в емуляції завантаження даних.

// export function App() {
//   return (
//     <UserProvider>
//       <UserProfile />
//     </UserProvider>
//   );
// }

// Компонент UserProfile огорнутий в UserProvider у компоненті App, що дозволяє
// використовувати контекст користувача всередині UserProfile.

// -------------------------------------------------------

// Хорошою практикою вважається поділ обробників та стану на різні контексти.
// Якщо ми турбуємося про те, що якийсь обробник може оновитися і таким чином
// призвести до оновлення компонента, який використовує контекст, ми можемо
// уникнути цього. Для цього ми поміщаємо тільки значення в один контекст, а
// обробники для їхнього оновлення — в інший.

// import React, {
//   createContext,
//   useState,
//   useContext,
//   FunctionComponent,
// } from "react";

// type User = {
//   name: string;
//   email: string;
// } | null;

// type UserStateContextProps = {
//   user: User;
// };

// type UserActionsContextProps = {
//   setUser: React.Dispatch<React.SetStateAction<User>>;
// };

// const UserStateContext = createContext<UserStateContextProps | undefined>(
//   undefined
// );
// const UserActionsContext = createContext<UserActionsContextProps | undefined>(
//   undefined
// );

// type Props = {
//   children: React.ReactNode;
// };

// // Сам провайдер
// export function UserProvider({ children }: Props) {
//   const [user, setUser] = useState<User>(null);

//   return (
//     <UserStateContext.Provider value={{ user }}>
//       <UserActionsContext.Provider value={{ setUser }}>
//         {children}
//       </UserActionsContext.Provider>
//     </UserStateContext.Provider>
//   );
// }

// export function useUserState() {
//   const context = useContext(UserStateContext);

//   if (context === undefined) {
//     throw new Error("useUserState must be used within a UserProvider");
//   }

//   return context;
// }

// export function useUserActions() {
//   const context = useContext(UserActionsContext);

//   if (context === undefined) {
//     throw new Error("useUserActions must be used within a UserProvider");
//   }

//   return context;
// }

// Тепер ми маємо два хуки: useUserState і useUserActions, кожен з яких використовує
// свій контекст. Це означає, що якщо ми тільки викликаємо setUser, ми не
// перемальовуватимемося при зміні user. А компоненти, які зав'язані на user,
// не будуть перемальовуватися (рендеритися) під час зміни функції setUser
// (хоча в нашому прикладі вона незмінна).

/* ======================================================================================================================
Хуки, які зазвичай не потрібно типізувати
====================================================================================================================== */

// Такі хуки як useEffect та useMemo досить прямолінійні і
// зазвичай не вимагають додаткової роботи.

// useEffect((): void | (() => void) => {
//   let active = true;

//   return (): void => {
//     isActive = false;
//   };
// }, []);

// useEffect очікує, що функція, що передається, буде повертати void
// або функцію очищення, яка теж повертає void. Усі ці типи ми можемо
// не вказувати, і просто писати так:

// useEffect(() => {
//   let isActive = true;

//   return (): void => {
//     isActive = false;
//   };
// }, []);

// ----------------------------------------------

// І подивимося на useMemo:

// import React, { useMemo } from "react";

// type User = {
//   id: number;
//   name: string;
// };

// type Props = {
//   users: User[];
//   selectedUserId: number;
// };

// export function UserList({ users, selectedUserId }: Props) {
//   const selectedUser = useMemo(() => {
//     return users.find((user) => user.id === selectedUserId);
//   }, [users, selectedUserId]);

//   return (
//     <div>
//       {selectedUser && <p>Selected user is {selectedUser.name}</p>}
//       {users.map((user) => (
//         <p key={user.id}>{user.name}</p>
//       ))}
//     </div>
//   );
// }

// У цьому прикладі ми використовуємо хук useMemo для оптимізації
// продуктивності. Ми створюємо мемоізоване значення selectedUser,
// яке перераховується лише за зміни users або selectedUserId.

// ==================================

// Кастомні хуки

// Кастомні хуки дозволяють виділити частину функціональності компонентів
// у функції, що перевикористовуються. Під час роботи з TypeScript кастомні
// хуки також повинні бути належним чином типізовані.

// import { useState, useCallback } from "react";

// type UseFormInput = {
//   value: string;
//   onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
// };

// export function useFormInput(initialValue: string): UseFormInput {
//   const [value, setValue] = useState(initialValue);

//   const onChange = useCallback((event: React.ChengeEvent<HTMLInputElement>) => {
//     setValue(event.target.value);
//   }, []);

//   return {
//     value,
//     onChange,
//   };
// }

// У цьому прикладі useFormInput є кастомним хуком, який ми створили для
// керування значенням input-форми. Цей хук приймає initialValue як
// аргумент і повертає об'єкт з value і функцією onChange.

// Ми визначаємо тип UseFormInput для значення, що повертається. Цей
// тип включає value, яке є рядком, і функцію onChange, яка приймає
// подію зміни введення і нічого не повертає.

// --------------------------------------------

// Давайте продовжимо. Зробимо хук, що буде типізувати функції.
// Припустимо, нам потрібна функція, яка буде незмінною, тобто
// патерн синглтон.

// import { useCallback, useRef } from "react";

// type Callback = (...args: unknown[]) => unknown;

// export function useSingletonFunction<T extends Callback>(func: T) {
//   const funcRef = useRef(func);
//   funcRef.current = func;

//   const singletonFunction = (...args: Parameters<T>) =>
//     funcRef.current(...args) as ReturnType<T>;

//   return useCallback(singletonFunction, []);
// }

// Типізація для useSingletonFunction використовує дві вбудовані
// TypeScript-утиліти: Parameters і ReturnType.

// Parameters<T> витягує типи параметрів функції T.
// ReturnType<T> витягує тип функції T, що повертається.

// Функція useSingletonFunction приймає функцію типу T, де T
// обмежений типом Callback, а потім повертає нову функцію,
// яка має ті ж типи параметрів і значення, що повертається, що і функція T.

// Зверніть увагу, в другому випадку ми не вказуємо тип, що
// повертається для useSingletonFunction. TypeScript самостійно
// виводить типи на основі значення, що повертається, і вказувати його необов'язково.
