import  { useState } from "react";
import "./StudentRegistration.css";

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    course: "",
    terms: false,
  });

  const [allUsers, setAllUsers] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.terms) {
      
      const existingUsers = JSON.parse(localStorage.getItem("usersData")) || [];
      const updatedUsers = [...existingUsers, formData];
      
      
      localStorage.setItem("usersData", JSON.stringify(updatedUsers));
      alert("Form submitted successfully!");

      
      setFormData({
        name: "",
        email: "",
        phone: "",
        gender: "",
        course: "",
        terms: false,
      });
    } else {
      alert("Please agree to the terms and conditions.");
    }
  };

  const handleFetchDetails = () => {
    const usersData = JSON.parse(localStorage.getItem("usersData"));
    if (usersData && usersData.length > 0) {
      setAllUsers(usersData);
    } else {
      alert("No data found in localStorage!");
    }
  };

  return (
    <div className="form-container">
      <h2>Student Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <div>
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
              />
              Female
            </label>
          </div>
        </div>
        <div className="form-group">
          <label>Course:</label>
          <select name="course" value={formData.course} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Science">Science</option>
            <option value="Commerce">Commerce</option>
            <option value="Arts">Arts</option>
          </select>
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
            />
            I agree to the terms and conditions
          </label>
        </div>
        <button type="submit">Register</button>
        <button type="button" onClick={handleFetchDetails}>
          Show All Users
        </button>
      </form>

      {allUsers.length > 0 && (
        <div className="stored-data">
          <h3>All Registered Users:</h3>
          <ul>
            {allUsers.map((user, index) => (
              <li key={index}>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <p><strong>Gender:</strong> {user.gender}</p>
                <p><strong>Course:</strong> {user.course}</p>
                <hr />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;