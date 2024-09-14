import React, { useState } from 'react';
import './App.css';
import axios from "axios";
// import student from '../../backend';

function App() {

  const [createuser,setCreateuser] = useState({  
    studentId: '',
    name: '',
    age: '',
    grade: ''
  })

  const [findindid,setFindingid] = useState();

  const [deleteid,setDeleteid] = useState();

    const handleChanges = (e) => {
      const { name, value } = e.target;
      setCreateuser((prevState) => ({
        ...prevState,
        [name]: value
      }));
    };



///creating user 
  const create_user = async (e) =>{

    if(e)e.preventDefault()
    const api =  await fetch ("http://localhost:5000/create",{
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },

      body : JSON.stringify(createuser)
    })
    const res = await api.json();
    console.log(res);
  }

//finding user

  const findindId = async (e) => {

    if(e)e.preventDefault();

    const api = await fetch(`http://localhost:5000/read/${findindid}`,{

      method : 'get',
      headers : {'Content-Type' : 'application/json'}

    })
    const res = await api.json()

    console.log(res);
  }

  //deleting user

  const deleteId = async (e) => {
    if (e) e.preventDefault();
  
    try {
      const api = await fetch(`http://localhost:5000/delete/${deleteid}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (api.ok) {
        const res = await api.json();
        console.log(res);
      } else {
        const error = await api.json();
        console.error('Error:', error.message);
      }
    } catch (error) {
      console.error('Network or server error:', error);
    }
  };
  
  

  
  


  return (
    <>
      <h1>Student Management System</h1>
      <h2>Create Student</h2>
      <form onSubmit={create_user}>
        <label htmlFor="id">Student ID:</label>
        <input type="text" id="id" name="studentId" value={createuser.studentId} onChange={handleChanges} required /><br />
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={createuser.name} onChange={handleChanges} required /><br />
        <label htmlFor="age">Age:</label>
        <input type="number" id="age" name="age" value={createuser.age} onChange={handleChanges} required /><br />
        <label htmlFor="grade">Grade:</label>
        <input type="text" id="grade" name="grade" value={createuser.grade} onChange={handleChanges} required /><br />
        <button type="submit">Create</button>
      </form>

      <h2>Read Student</h2>
      <form  onSubmit={findindId}>
        <label htmlFor="studentId">Student ID:</label>
        <input type="text" id="studentId" name="studentId" value={findindid} onChange={(e)=>setFindingid(e.target.value)}/><br />
        <button type="submit">Read Student</button>
      </form>

      <h2>Update Student</h2>
      <form action="/update/:id" method="post">
        <label htmlFor="updateId">Student ID:</label>
        <input type="text" id="updateId" name="id" required /><br />
        <label htmlFor="newName">New Name:</label>
        <input type="text" id="newName" name="name" required /><br />
        <label htmlFor="newAge">New Age:</label>
        <input type="number" id="newAge" name="age" required /><br />
        <label htmlFor="newGrade">New Grade:</label>
        <input type="text" id="newGrade" name="grade" required /><br />
        <button type="submit">Update</button>
      </form>

      <h2>Delete Student</h2>
      <form onSubmit={deleteId}>
        <label htmlFor="deleteId">Student ID:</label>
        <input type="text" id="deleteId" name="id" value={deleteid} onChange={(e)=>setDeleteid(e.target.value)} required /><br />
        <button type="submit">Delete</button>
      </form>
    </>
  );
}

export default App;
