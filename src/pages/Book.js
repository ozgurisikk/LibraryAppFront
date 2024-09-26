import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import { Link } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/v1';

const Book = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [formData, setFormData] = useState({ title: '', publicationYear: '', stock: '', authorId: '' });
  const [editData, setEditData] = useState(null);
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  useEffect(() => {
    
    fetch(`${apiUrl}/books`)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => {
        console.log('Fetched books:', data);
        setBooks(data.map(book => ({
          ...book,
          author: authors.find(author => author.id === book.authorId)
        })));
      })
      .catch(error => console.error('Error fetching books:', error));

    
    fetch(`${apiUrl}/authors`)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => {
        console.log('Fetched authors:', data); 
        setAuthors(data);
      })
      .catch(error => console.error('Error fetching authors:', error));
  }, [authors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = editData ? `${apiUrl}/books/${editData.id}` : `${apiUrl}/books`;
    const method = editData ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        name: formData.title,
        publicationYear: formData.publicationYear,
        stock: formData.stock,
        author: { id: formData.authorId } 
      })
    })
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => {
      if (editData) {
        setBooks(books.map(b => b.id === editData.id ? { ...data, author: authors.find(author => author.id === data.author.id) } : b));
        setEditData(null);
        setModalTitle("Güncelleme Başarı");
        setModalMessage("Kitap başarıyla güncellendi!");
      } else {
        
        setBooks([...books, { ...data, author: authors.find(author => author.id === data.author.id) }]);
        setModalTitle("Ekleme Başarı");
        setModalMessage("Kitap başarıyla eklendi!");
      }
      handleOpenModal();
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const handleEdit = (book) => {
    setFormData({ 
      title: book.name, 
      publicationYear: book.publicationYear, 
      stock: book.stock, 
      authorId: book.author.id 
    });
    setEditData(book);
  };

  const handleDelete = (id) => {
    fetch(`${apiUrl}/books/${id}`, { method: 'DELETE' })
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        setBooks(books.filter(b => b.id !== id));
        setModalTitle("Silme Başarı");
        setModalMessage("Kitap başarıyla silindi!");
        handleOpenModal();
      })
      .catch(error => {
        console.error('Error deleting book:', error);
      });
  };

  return (
    <div className="min-h-[700px] bg-arka p-6">
      <header className="flex items-center justify-between mb-6">
        <h2 className="text-3xl text-buton font-bold">Kitap Sayfası</h2>
        <Link to="/" className="px-4 py-2 bg-buton text-white rounded hover:bg-header">Ana Sayfa</Link>
      </header>
      <form onSubmit={handleSubmit} className="mb-6 bg-white p-6 rounded shadow-lg">
        <label className="block mb-4">
          Kitap Başlığı:
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="border p-2 w-full mt-1"
            required
          />
        </label>
        <label className="block mb-4">
          Yayın Yılı:
          <input
            type="number"
            value={formData.publicationYear}
            onChange={(e) => setFormData({ ...formData, publicationYear: e.target.value })}
            className="border p-2 w-full mt-1"
            required
          />
        </label>
        <label className="block mb-4">
          Stok:
          <input
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            className="border p-2 w-full mt-1"
            required
          />
        </label>
        <label className="block mb-4">
          Yazar Seç:
          <select
            value={formData.authorId}
            onChange={(e) => setFormData({ ...formData, authorId: e.target.value })}
            className="border p-2 w-full mt-1"
            required
          >
            <option value="">Seçiniz</option>
            {authors.map(author => (
              <option key={author.id} value={author.id}>{author.name}</option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className="px-4 py-2 bg-buton text-white rounded hover:bg-header"
        >
          {editData ? 'Güncelle' : 'Ekle'}
        </button>
      </form>
      <h3 className="text-xl text-buton font-bold mb-4">Kitap Listesi:</h3>
      <ul className="list-none p-0">
        {books.map(book => (
          <li key={book.id} className="bg-acik-kutu p-4 mb-2 rounded shadow flex justify-between items-center">
            <span>{book.name} - {book.author ? book.author.name : 'Yazar yok'}</span>
            <div className="space-x-2">
              <button onClick={() => handleEdit(book)} className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Düzenle</button>
              <button onClick={() => handleDelete(book.id)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Sil</button>
            </div>
          </li>
        ))}
      </ul>
      <Modal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        title={modalTitle}
        message={modalMessage}
      />
    </div>
  );
};

export default Book;
