const Layout = ({ children }) => {
    return (
      <div className="container mx-auto max-w-[1200px] ">
        <header className="py-4 bg-header text-white py-12 text-center">
          <h1 className="text-4xl  font-bold">Library App</h1>
        </header>
        <main className="py-8">{children}</main>
        <footer className="py-4 text-header font-bold bg-buton text-white text-center">
          <p>All Rights Reserved © 2024</p>
        </footer>
      </div>
    );
  };
  
  export default Layout;
  