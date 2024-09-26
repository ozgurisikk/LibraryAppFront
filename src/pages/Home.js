import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-[700px] bg-arka flex flex-col justify-center  p-6">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-buton">Kütüphane Yönetim Sistemi</h1>
        <p className="text-lg text-gray-600 mt-2">Tüm kitap, yazar ve kategori işlemlerini burada yapabilirsiniz.</p>
      </header>
      
      <div className="flex flex-col md:flex-row md:space-x-6   justify-center content-center ">
        <div className="bg-kutu shadow-lg rounded-lg p-6 mb-6 md:mb-0 md:w-1/3 text-center">
          <h2 className="text-3xl font-semibold text-white">Yayıncılar</h2>
          <p className="text-gray-600 mt-2">Yayınevleri ve yayıncıları buradan yönetebilirsiniz.</p>
          <Link to="/publisher" className="mt-4 inline-block px-4 py-2 bg-header text-white rounded hover:bg-buton">Yayıncılar</Link>
        </div>
        
        <div className="bg-kutu shadow-lg rounded-lg p-6 mb-6 md:mb-0 md:w-1/3 text-center  ">
          <h2 className="text-3xl font-semibold text-white">Kategoriler</h2>
          <p className="text-gray-600 mt-2">Kitapları kategorilere ayırabilir ve yönetebilirsiniz.</p>
          <Link to="/category" className="mt-4 inline-block px-4 py-2 bg-header text-white rounded hover:bg-buton">Kategoriler</Link>
        </div>

        <div className="bg-kutu shadow-lg rounded-lg p-6 md:w-1/3 text-center">
          <h2 className="text-3xl font-semibold text-white">Kitaplar</h2>
          <p className="text-gray-600 mt-2">Kitapları ekleyebilir, düzenleyebilir ve silebilirsiniz.</p>
          <Link to="/book" className="mt-4 inline-block px-4 py-2 bg-header text-white rounded hover:bg-buton">Kitaplar</Link>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:space-x-6 mt-8 justify-center">
        <div className="bg-kutu shadow-lg rounded-lg p-6 mb-6 md:mb-0 md:w-1/3 text-center">
          <h2 className="text-3xl font-semibold text-white">Yazarlar</h2>
          <p className="text-gray-600 mt-2">Yazarları ekleyebilir ve yönetebilirsiniz.</p>
          <Link to="/author" className="mt-4 inline-block px-4 py-2 bg-header text-white rounded hover:bg-buton">Yazarlar</Link>
        </div>

        <div className="bg-kutu shadow-lg rounded-lg p-6 md:w-1/3 text-center">
          <h2 className="text-3xl font-semibold text-white">Kitap Alma</h2>
          <p className="text-gray-600 mt-2">Kitap alma işlemlerini yönetebilirsiniz.</p>
          <Link to="/purchase" className="mt-4 inline-block px-4 py-2 bg-header text-white rounded hover:bg-buton">Kitap Alma</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
