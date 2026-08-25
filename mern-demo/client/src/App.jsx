import { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'https://solid-space-meme-r7pgg9x97w7gfxr59-5000.app.github.dev/api/students';

function App() {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const fetchStudents = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error('Loi lay danh sach:', err));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId, name, email }),
    })
      .then((res) => res.json())
      .then(() => {
        setStudentId('');
        setName('');
        setEmail('');
        fetchStudents();
      })
      .catch((err) => console.error('Loi them sinh vien:', err));
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
        <button type="submit">Them sinh vien</button>
      </form>

      <h2>Danh sach sinh vien</h2>
      <ul>
        {students.map((sv) => (
          <li key={sv._id}>
            {sv.studentId} - {sv.name} - {sv.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;