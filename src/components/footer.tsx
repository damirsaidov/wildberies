import React from "react";
const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 sticky bottom-0">
      <div className="flex items-center justify-evenly">
        <div className="num1 flex  flex-col  items-center">
          <img src="../../logo.png" alt="" width={100} />
          <h1 className="mt-5 text-[20px] ">Wildberries</h1>
        </div>
        <div className="num2 text-center">
          <h2 className="text-[22px] font-medium ">О нас</h2>
          <p className="mt-2.5">Пользование соглашения</p>
          <p className="mt-2.5">Приватность</p>
          <p className="mt-2.5">Помошь</p>
          <p className="mt-2.5">Контакты</p>
          <p className="mt-2.5">2025 Wildberries. Все права зашишены.</p>
        </div>
        <div className="num2 flex flex-col items-end-safe">
          <h2 className="text-[22px] font-medium ">Facebook</h2>
          <p className="mt-2.5">Twitter</p>
          <p className="mt-2.5">Instagram</p>
          <p className="mt-2.5">YouTube</p>
        </div>
        
      </div>
    </footer>
  );
};
export default Footer;