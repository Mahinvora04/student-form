import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./StudentForm.module.css";
import { FaCamera } from "react-icons/fa";
import axios from "axios";

const studentSchema = z.object({
  firstName: z
    .string()
    .trim()
    .nonempty("Please enter a first name")
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name must not exceed 50 characters")
    .regex(/^[A-Za-z\s]+$/, "Name must only contain letters and spaces"),
  lastName: z
    .string()
    .trim()
    .nonempty("Please enter a last name")
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name must not exceed 50 characters")
    .regex(/^[A-Za-z\s]+$/, "Name must only contain letters and spaces"),
  email: z
    .string()
    .nonempty("Please enter an email")
    .email("Invalid email address"),
  age: z
    .number({ invalid_type_error: "Age must be a number" })
    .int("Age must be an integer")
    .min(18, "Age must be at least 18")
    .max(60, "Age must not exceed 60"),
  zipCode: z.nan({
    required_error: "Zip code is required",
    invalid_type_error: "Please Enter Zip Code",
  }),
  course: z.string().trim().nonempty("Please select a course"),
  gender: z.enum(["Male", "Female"], {
    errorMap: () => ({ message: "Please select a valid gender" }),
  }),
  birthday: z.string().nonempty("Please select your birthday"),
  hobbies: z
    .string()
    .array()
    .nonempty("Please select at least one hobby"),
  status: z.enum(["Active", "Inactive"], {
    errorMap: () => ({ message: "Please select a valid status" }),
  }),
  mobile: z
    .string()
    .trim()
    .nonempty("Mobile number is required")
    .regex(/^\d{10}$/, "Mobile number must be exactly 10 digits"),
  address: z
    .string()
    .trim()
    .nonempty("Please enter address")
    .min(10, "Address must be at least 10 characters long")
    .max(200, "Address must not exceed 200 characters"),
  city: z.string().trim().nonempty("Please enter city"),
  state: z.string().trim().nonempty("Please enter state"),
  country: z.string().trim().nonempty("Please enter country"),
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

  //  API endpoint
  const API_URL =
    "https://bc7f-103-240-169-179.ngrok-free.app/api/v1/students/";

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      // Append all form fields to the FormData
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      // Add the profile photo to the FormData
      if (data.profilePhoto[0]) {
        formData.append("profilePhoto", data.profilePhoto[0]);
      }

      // Send the POST request to the API
      const response = await axios.post(API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle success
      alert("Form submitted successfully!");
      console.log("Response:", response.data);
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit the form. Please try again.");
    }
  };

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
          {/* First Name */}
          <div className={styles.formGroup}>
            <label htmlFor="firstName" className={styles.label}>
              First Name:
            </label>
            <input
              type="text"
              id="firstName"
              {...register("firstName")}
              className={styles.input}
            />
            {errors.firstName && (
              <p className={styles.errorMessage}>{errors.firstName.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div className={styles.formGroup}>
            <label htmlFor="lastName" className={styles.label}>
              Last Name:
            </label>
            <input
              type="text"
              id="lastName"
              {...register("lastName")}
              className={styles.input}
            />
            {errors.lastName && (
              <p className={styles.errorMessage}>{errors.lastName.message}</p>
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

          {/* Mobile Number */}
          <div className={styles.formGroup}>
            <label htmlFor="mobile" className={styles.label}>
              Mobile Number:
            </label>
            <input
              type="text"
              id="mobile"
              {...register("mobile")}
              className={styles.input}
            />
            {errors.mobile && (
              <p className={styles.errorMessage}>{errors.mobile.message}</p>
            )}
          </div>

          {/* Status */}
          <div className={styles.formGroup}>
            <label htmlFor="status" className={styles.label}>
              Status:
            </label>
            <select
              id="status"
              {...register("status")}
              className={styles.select}
            >
              <option value="">-- Select a Status --</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            {errors.status && (
              <p className={styles.errorMessage}>{errors.status.message}</p>
            )}
          </div>

          {/* City */}
          <div className={styles.formGroup}>
            <label htmlFor="city" className={styles.label}>
              City :
            </label>
            <input
              type="text"
              id="city"
              {...register("city")}
              className={styles.input}
            />
            {errors.city && (
              <p className={styles.errorMessage}>{errors.city.message}</p>
            )}
          </div>

          {/* State */}
          <div className={styles.formGroup}>
            <label htmlFor="state" className={styles.label}>
              State :
            </label>
            <input
              type="text"
              id="state"
              {...register("state")}
              className={styles.input}
            />
            {errors.state && (
              <p className={styles.errorMessage}>{errors.state.message}</p>
            )}
          </div>

          {/* Country */}
          <div className={styles.formGroup}>
            <label htmlFor="country" className={styles.label}>
              Country:
            </label>
            <input
              type="text"
              id="country"
              {...register("country")}
              className={styles.input}
            />
            {errors.country && (
              <p className={styles.errorMessage}>{errors.country.message}</p>
            )}
          </div>

          {/* Zip Code */}
          <div className={styles.formGroup}>
            <label htmlFor="zipCode" className={styles.label}>
              Zip Code:
            </label>
            <input
              type="number"
              id="zipCode"
              {...register("zipCode")}
              className={styles.input}
            />
            {errors.zipCode && (
              <p className={styles.errorMessage}>{errors.zipCode.message}</p>
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
              {["React", "Django", "Node.js"].map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
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
              {["Reading", "Traveling", "Photography", "Music", "Sports"].map(
                (hobby) => (
                  <label key={hobby} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      value={hobby}
                      {...register("hobbies")}
                      className={styles.checkbox}
                    />{" "}
                    {hobby}
                  </label>
                )
              )}
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
