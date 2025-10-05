import React, {useState} from 'react';
import axios from 'axios';

function App(){
  const [token, setToken] = useState('');
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({name:'', email:'', phone:'', company:''});

  const login = async () => {
    // demo login - replace with real credentials after running backend
    const res = await axios.post('http://localhost:5000/api/auth/login',{ email:'admin@demo.com', password:'password' }).catch(e=>null);
    if(res?.data?.token){ setToken(res.data.token); alert('Logged in (demo)'); }
    else alert('Demo login failed - run backend and register first');
  };

  const fetchCustomers = async () => {
    if(!token) return alert('Login first');
    const res = await axios.get('http://localhost:5000/api/customers',{ headers:{ Authorization: 'Bearer '+token } }).catch(e=>{ alert('Error'); });
    if(res?.data) setCustomers(res.data);
  };

  const addCustomer = async () => {
    if(!token) return alert('Login first');
    const res = await axios.post('http://localhost:5000/api/customers', form, { headers:{ Authorization: 'Bearer '+token } }).catch(e=>{ alert('Error adding'); });
    if(res?.data){ setCustomers([res.data, ...customers]); setForm({name:'',email:'',phone:'',company:''}); }
  };

  return (<div style={{padding:20,fontFamily:'Arial'}}>
    <h2>MERN CRM - Demo UI</h2>
    <button onClick={login}>Demo Login</button>
    <button onClick={fetchCustomers} style={{marginLeft:10}}>Fetch Customers</button>
    <h3>Add Customer</h3>
    <input placeholder='Name' value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />{' '}
    <input placeholder='Email' value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />{' '}
    <input placeholder='Phone' value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />{' '}
    <input placeholder='Company' value={form.company} onChange={e=>setForm({...form,company:e.target.value})} />{' '}
    <button onClick={addCustomer}>Add</button>
    <h3>Customers</h3>
    <ul>{customers.map(c=> <li key={c._id}>{c.name} - {c.email} - {c.company}</li>)}</ul>
  </div>);
}

export default App;