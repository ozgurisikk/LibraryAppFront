import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import { Link } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL ;

const Authors = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', birthDate: '', country: '' }); 
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [editData, setEditData] = useState(null);
  const [authors, setAuthors] = useState([]);
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  useEffect(() => {
    fetch(`${apiUrl}/api/v1/authors`)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => setAuthors(data))
      .catch(error => console.error('Error fetching authors:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = editData ? `${apiUrl}/api/v1/authors/${editData.id}` : `${apiUrl}/api/v1/authors`;
    const method = editData ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => {
      if (editData) {
        setAuthors(authors.map(a => a.id === editData.id ? data : a));
        setEditData(null);
        setModalTitle("Güncelleme Başarı");
        setModalMessage("Yazar başarıyla güncellendi!");
      } else {
        setAuthors([...authors, data]);
        setModalTitle("Ekleme Başarı");
        setModalMessage("Yazar başarıyla eklendi!");
      }
      handleOpenModal();
      setFormData({ name: '', birthDate: '', country: '' }); 
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const handleEdit = (author) => {
    setFormData({ name: author.name, birthDate: author.birthDate, country: author.country }); 
    setEditData(author);
  };

  const handleDelete = (id) => {
    fetch(`${apiUrl}/api/v1/authors/${id}`, { method: 'DELETE' })
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        setAuthors(authors.filter(a => a.id !== id));
        setModalTitle("Silme Başarı");
        setModalMessage("Yazar başarıyla silindi!");
        handleOpenModal();
      })
      .catch(error => {
        console.error('Error deleting author:', error);
      });
  };

  return (
    <div className="min-h-[700px]] bg-arka p-6">
      <header className="flex items-center justify-between mb-6">
        <h2 className="text-3xl text-buton font-bold">Yazarlar</h2>
        <Link to="/" className="px-4 py-2 bg-buton text-white rounded hover:bg-header">Ana Sayfa</Link>
      </header>
      <form onSubmit={handleSubmit} className="mb-6 bg-white p-6 rounded shadow-lg">
        <label className="block mb-4">
          Yazar Adı:
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="border p-2 w-full mt-1"
            required
          />
        </label>
        <label className="block mb-4">
          Doğum Tarihi:
          <input
            type="date"
            value={formData.birthDate}
            onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
            className="border p-2 w-full mt-1"
            required
          />
        </label>
        <label className="block mb-4">
          Ülke:
          <input
            type="text"
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            className="border p-2 w-full mt-1"
            required
          />
        </label>
        <button
          type="submit"
          className="px-4 py-2 bg-buton text-white rounded hover:bg-header"
        >
          {editData ? 'Güncelle' : 'Ekle'}
        </button>
      </form>
      <h3 className="text-xl font-bold mb-4">Yazar Listesi:</h3>
      <ul className="list-none p-0">
        {authors.map(author => (
          <li key={author.id} className="bg-acik-kutu p-4 mb-2 rounded shadow flex justify-between items-center">
            <span>{author.name}</span>
            <div className="space-x-2">
              <button onClick={() => handleEdit(author)} className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Düzenle</button>
              <button onClick={() => handleDelete(author.id)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Sil</button>
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

export default Authors;
