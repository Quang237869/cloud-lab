import { useState, useEffect } from 'react';
import './App.css';

const API_URL = '/api/students';

function App() {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editingId, setEditingId] = useState(null);

  const fetchStudents = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error('Loi lay danh sach:', err));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const resetForm = () => {
    setStudentId('');
    setName('');
    setEmail('');
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      fetch(`${API_URL}/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, name, email }),
      })
        .then((res) => res.json())
        .then(() => {
          resetForm();
          fetchStudents();
        })
        .catch((err) => console.error('Loi cap nhat sinh vien:', err));
    } else {
      fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, name, email }),
      })
        .then((res) => res.json())
        .then(() => {
          resetForm();
          fetchStudents();
        })
        .catch((err) => console.error('Loi them sinh vien:', err));
    }
  };

  const handleEdit = (sv) => {
    setEditingId(sv._id);
    setStudentId(sv.studentId);
    setName(sv.name);
    setEmail(sv.email);
  };

  const handleDelete = (id) => {
    if (!window.confirm('Ban co chac muon xoa sinh vien nay?')) return;
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then((res) => res.json())
      .then(() => fetchStudents())
      .catch((err) => console.error('Loi xoa sinh vien:', err));
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h1>Quan ly Sinh vien</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="MSSV"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Ho ten"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">{editingId ? 'Cap nhat' : 'Them sinh vien'}</button>
        {editingId && (
          <button type="button" onClick={resetForm}>
            Huy
          </button>
        )}
      </form>

      <h2>Danh sach sinh vien</h2>
      <ul>
        {students.map((sv) => (
          <li key={sv._id} style={{ marginBottom: 8 }}>
            {sv.studentId} - {sv.name} - {sv.email}{' '}
            <button onClick={() => handleEdit(sv)}>Sua</button>{' '}
            <button onClick={() => handleDelete(sv._id)}>Xoa</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;