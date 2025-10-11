import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [form, setForm] = useState({ nombre: '', dpi: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('/register', form);
      navigate('/login');
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        {['nombre', 'dpi', 'email', 'password'].map(field => (
          <div className="mb-3" key={field}>
            <label className="form-label">{field.toUpperCase()}</label>
            <input
              type={field === 'password' ? 'password' : 'text'}
              className="form-control"
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button className="btn btn-primary">Registrarse</button>
      </form>
    </div>
  );
}


export default Register;
