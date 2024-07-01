import { Outlet } from "react-router-dom";

function SharedLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-2xl">Sneaker Accounting App</h1>
      </header>
      <main className="flex flex-1 justify-center items-center bg-gray-100 p-4">
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2023 Sneaker Accounting App</p>
      </footer>
    </div>
  );
}

export default SharedLayout;