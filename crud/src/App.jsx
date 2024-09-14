import React from 'react';
import './App.css';

function App() {
  return (
    <>
      <h1>Student Management System</h1>
      <h2>Create Student</h2>
      <form action="/create" method="post">
        <label htmlFor="id">Student ID:</label>
        <input type="text" id="id" name="id" required /><br />
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required /><br />
        <label htmlFor="age">Age:</label>
        <input type="number" id="age" name="age" required /><br />
        <label htmlFor="grade">Grade:</label>
        <input type="text" id="grade" name="grade" required /><br />
        <button type="submit">Create</button>
      </form>

      <h2>Read Student</h2>
      <form action="/read" method="get">
        <label htmlFor="studentId">Student ID:</label>
        <input type="text" id="studentId" name="studentId" required /><br />
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
      <form action="/delete/:id" method="post">
        <label htmlFor="deleteId">Student ID:</label>
        <input type="text" id="deleteId" name="id" required /><br />
        <button type="submit">Delete</button>
      </form>
    </>
  );
}

export default App;
