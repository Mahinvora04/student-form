import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./StudentForm.module.css";
import { FaCamera } from "react-icons/fa";

const studentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name must not exceed 50 characters")
    .regex(/^[A-Za-z\s]+$/, "Name must only contain letters and spaces"),
  email: z
    .string()
    .email("Invalid email address")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format"
    ),
  age: z
    .number({
      invalid_type_error: "Age must be a number",
    })
    .int("Age must be an integer")
    .min(18, "Age must be at least 18")
    .max(60, "Age must not exceed 60"),
  course: z
    .string()
    .trim()
    .nonempty("Please select a course")
    .regex(
      /^[A-Za-z0-9\s-]+$/,
      "Course name must only contain letters, numbers, spaces, or dashes"
    ),
  gender: z.enum(["Male", "Female"], {
    errorMap: () => ({ message: "Please select a valid gender" }),
  }),
  birthday: z.string().nonempty("Please select your birthday"),
  hobbies: z.array(z.string()).min(1, "Please select at least one hobby"),
  contact: z
    .string()
    .trim()
    .nonempty("Contact number is required")
    .regex(/^\d{10}$/, "Contact number must be exactly 10 digits"),
  address: z
    .string()
    .trim()
    .min(10, "Address must be at least 10 characters long")
    .max(200, "Address must not exceed 200 characters"),
  profilePhoto: z.any().optional(),
});

export default function StudentFormInfo() {
  const [profilePhoto, setProfilePhoto] = useState(null);

  const handleProfilePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePhoto(URL.createObjectURL(file));
    } else {
      setProfilePhoto(null);
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(studentSchema),
  });

  const onSubmit = (data) => {
    console.log("Student Information:", data);
    alert("Form submitted successfully!");
    reset();
  };

  // Watch all fields to calculate progress
  const formValues = watch();
  const totalFields = 9;
  const filledFields = Object.keys(formValues).filter(
    (key) => formValues[key] && formValues[key].length > 0
  ).length;
  const progress = Math.round((filledFields / totalFields) * 100);

  return (
    <div className={styles.layoutContainer}>
      <div className={styles.sidebar}>
        {/* Profile Photo Section */}
        <div className={styles.formGroup}>
          <div className={styles.profileImageContainer}>
            {/* Profile Image */}
            <img
              src={profilePhoto || "/images/default-profile-pic.jpg"} // If no photo selected then show default image
              alt="Profile"
              className={styles.profileImage}
            />
            {/* Camera Icon */}
            <label
              htmlFor="profilePhotoInput"
              className={styles.cameraIconLabel}
            >
              <FaCamera className={styles.cameraIcon} />
            </label>
          </div>

          <input
            type="file"
            id="profilePhotoInput"
            {...register("profilePhoto")}
            className={styles.input}
            onChange={handleProfilePhotoChange}
            accept="image/jpeg,image/png,image/jpg"
          />

          {errors.profilePhoto && (
            <p className={styles.errorMessage}>{errors.profilePhoto.message}</p>
          )}
        </div>
        <div className={styles.progressBarContainer}>
          <div
            className={styles.progressBar}
            style={{ width: `${progress}%` }}
          ></div>
          <span className={styles.progressText}>{progress}% Completed</span>
        </div>
        <div className={styles.progressMessage}>
          {progress < 100
            ? `You're almost there! Complete your profile to unlock all features.`
            : `Great job! Your profile is 100% complete.`}
        </div>
      </div>
      <div className={styles.mainContent}>
        <h2 className={styles.heading}>Student Information Form</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}
          noValidate
        >
          {/* Name */}
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Name:
            </label>
            <input
              type="text"
              id="name"
              {...register("name")}
              className={styles.input}
            />
            {errors.name && (
              <p className={styles.errorMessage}>{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email:
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className={styles.input}
            />
            {errors.email && (
              <p className={styles.errorMessage}>{errors.email.message}</p>
            )}
          </div>

          {/* Contact Number */}
          <div className={styles.formGroup}>
            <label htmlFor="contact" className={styles.label}>
              Contact Number:
            </label>
            <input
              type="text"
              id="contact"
              {...register("contact")}
              className={styles.input}
            />
            {errors.contact && (
              <p className={styles.errorMessage}>{errors.contact.message}</p>
            )}
          </div>

          {/* Age */}
          <div className={styles.formGroup}>
            <label htmlFor="age" className={styles.label}>
              Age:
            </label>
            <input
              type="number"
              id="age"
              {...register("age", { valueAsNumber: true })}
              className={styles.input}
            />
            {errors.age && (
              <p className={styles.errorMessage}>{errors.age.message}</p>
            )}
          </div>

          {/* Birthday */}
          <div className={styles.formGroup}>
            <label htmlFor="birthday" className={styles.label}>
              Birthday:
            </label>
            <input
              type="date"
              id="birthday"
              {...register("birthday")}
              className={styles.input}
            />
            {errors.birthday && (
              <p className={styles.errorMessage}>{errors.birthday.message}</p>
            )}
          </div>

          {/* Course */}
          <div className={styles.formGroup}>
            <label htmlFor="course" className={styles.label}>
              Course:
            </label>
            <select
              id="course"
              {...register("course")}
              className={styles.select}
            >
              <option value="">-- Select a Course --</option>
              <option value="React">React</option>
              <option value="Django">Django</option>
              <option value="Node.js">Node.js</option>
            </select>
            {errors.course && (
              <p className={styles.errorMessage}>{errors.course.message}</p>
            )}
          </div>

          {/* Gender */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Gender:</label>
            <div className={styles.radioGroup}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  value="Male"
                  {...register("gender")}
                  className={styles.radioInput}
                />{" "}
                Male
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  value="Female"
                  {...register("gender")}
                  className={styles.radioInput}
                />{" "}
                Female
              </label>
            </div>
            {errors.gender && (
              <p className={styles.errorMessage}>{errors.gender.message}</p>
            )}
          </div>

          {/* Hobbies */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Hobbies:</label>
            <div className={styles.checkboxGroup}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  value="Reading"
                  {...register("hobbies")}
                  className={styles.checkbox}
                />{" "}
                Reading
              </label>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  value="Traveling"
                  {...register("hobbies")}
                  className={styles.checkbox}
                />{" "}
                Traveling
              </label>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  value="Photography"
                  {...register("hobbies")}
                  className={styles.checkbox}
                />{" "}
                Photography
              </label>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  value="Music"
                  {...register("hobbies")}
                  className={styles.checkbox}
                />{" "}
                Music
              </label>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  value="Sports"
                  {...register("hobbies")}
                  className={styles.checkbox}
                />{" "}
                Sports
              </label>
            </div>
            {errors.hobbies && (
              <p className={styles.errorMessage}>{errors.hobbies.message}</p>
            )}
          </div>

          {/* Address */}
          <div className={styles.formGroup}>
            <label htmlFor="address" className={styles.label}>
              Address:
            </label>
            <textarea
              id="address"
              {...register("address")}
              className={styles.textarea}
              placeholder="Enter your address"
            ></textarea>
            {errors.address && (
              <p className={styles.errorMessage}>{errors.address.message}</p>
            )}
          </div>

          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
