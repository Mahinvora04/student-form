import React, { useState } from "react";
import styles from "./StudentForm.module.css";

const StudentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    course: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Student Form</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="age" className={styles.label}>
            Age:
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="course" className={styles.label}>
            Course:
          </label>
          <select
            id="course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
            className={styles.select}
          >
            <option value="">Select Course</option>
            <option value="React JS">React JS</option>
            <option value="Node JS">Node JS</option>
            <option value="Python">Python</option>
            <option value="Java">Java</option>
          </select>
        </div>
        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
