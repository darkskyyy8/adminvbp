// Halaman yang menampilkan item
import { useState, useEffect } from 'react';
import axios from 'axios';
import EditItemPage from './edit';

const ShowItemPage = () => {
  const [currentItem, setCurrentItem] = useState({/* your item data */});

  useEffect(() => {
    // Fetch data item yang ingin ditampilkan
    axios.get('http://localhost:8000/api/profilweb/')  // Ganti dengan endpoint yang sesuai
      .then(response => setCurrentItem(response.data))
      .catch(error => console.error('Error fetching item:', error));
  }, []);

  return (
    <div>
      {/* Render data item yang ingin ditampilkan */}
      {/* Tambahkan tombol atau tautan untuk membuka halaman edit */}
      <EditItemPage currentItem={currentItem} />
    </div>
  );
};

export default ShowItemPage;
