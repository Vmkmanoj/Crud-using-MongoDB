import React, { useState } from 'react';
import './App.css';
// import axios from "axios";
// import { set } from 'mongoose';
// import { json } from 'body-parser';
// import student from '../../backend';

function App() {

  const [createuser,setCreateuser] = useState({  
    studentId: '',
    name: '',
    age: '',
    grade: ''
  })

  const [update,setUpdate] = useState({  
    studentId : '',
    name: '',
    age: '',
    grade: ''
  })

  const [fetchingdata,setFetchingdata] = useState(null)

  const [findindid,setFindingid] = useState();

  const [deleteid,setDeleteid] = useState();

    const handleChanges = (e) => {
      const { name, value } = e.target;
      setCreateuser((prevState) => ({
        ...prevState,
        [name]: value
      }));
    };
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setUpdate(prevState => ({
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
    if(res){
      window.alert("Date add Created")
    }
  }

//finding user

  const findindId = async (e) => {

    if(e)e.preventDefault();

    const api = await fetch(`http://localhost:5000/read/${findindid}`,{

      method : 'get',
      headers : {'Content-Type' : 'application/json'}

    })
    const res = await api.json()

    setFetchingdata(res)
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
        window.alert("data deleted")
      } else {
        const error = await api.json();
        console.error('Error:', error.message);
        window.alert('data not found')
      }
    } catch (error) {
      console.error('Network or server error:', error);
    }
  };

  //updating user


const updatinguser = async(e)=>{

  if(e) e.preventDefault();

  const api = await fetch(`http://localhost:5000/update/${update.studentId}`,{
    method : "PUT",

    headers : {
      'Content-Type':'application/json'
    },

    body : JSON.stringify( {name : update.name,
      age:update.age,
      grade : update.grade
    })
  })

  if(api.ok){
    const res = await api.json();
    console.log(res)
    window.alert('data updated')
  }else{

    window.alert('data not found')

    const error =  await api.json()
    
    console.log(error.message);
    
    
  }







}

  
  

  
  


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

      {fetchingdata &&(

<div className="student-details">
<p> Name: <span>{fetchingdata.name}</span> </p>
<p> Age: <span>{fetchingdata.age}</span> </p>
<p> Grade: <span>{fetchingdata.grade}</span> </p>
<p> Student ID: <span>{fetchingdata.studentId}</span> </p>
</div>

      
      )
        
        
        
        }

      <h2>Update Student</h2>
      <form onSubmit={updatinguser}>
        <label htmlFor="updateId">Student ID:</label>
        <input type="text" id="updateId" name="studentId" value={update.studentId} onChange={handleInputChange} required /><br />
        <label htmlFor="newName">New Name:</label>
        <input type="text" id="newName" name="name" value={update.name} onChange={handleInputChange} required /><br />
        <label htmlFor="newAge">New Age:</label>
        <input type="number" id="newAge" name="age" value={update.age} onChange={handleInputChange} required /><br />
        <label htmlFor="newGrade">New Grade:</label>
        <input type="text" id="newGrade" name="grade" value={update.grade} onChange={handleInputChange} required /><br />
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
