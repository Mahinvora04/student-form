import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./StudentForm.module.css";

// Default profile image
const DEFAULT_PROFILE_IMAGE = "images/𝘈 𝘷 𝘢 𝘵 𝘢 𝘳 ᥫ᭡ -.jpg";

// Zod schema definition
const studentValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z
    .number({ invalid_type_error: "Age must be a number" })
    .min(18, "You must be at least 18 years old")
    .max(100, "Age must be less than 100"),
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  course: z.string().min(1, "Course is required"),
  address: z.string().min(1, "Address is required"),
  college: z.string().min(1, "College is required"),
  birthdate: z.string().min(1, "Birthdate is required"),
});

const StudentForm = () => {
  const [profileImage, setProfileImage] = useState(DEFAULT_PROFILE_IMAGE);
  const [calculatedAge, setCalculatedAge] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(studentValidationSchema),
  });

  // Watch the profile photo and birthdate fields
  const profilePhotoFile = watch("profilePhoto");
  const birthdate = watch("birthdate");

  // Calculate age whenever birthdate changes
  useEffect(() => {
    if (birthdate) {
      const birthDate = new Date(birthdate);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      setCalculatedAge(age);
    } else {
      setCalculatedAge("");
    }
  }, [birthdate]);

  const onSubmit = (data) => {
    if (!data.profilePhoto || data.profilePhoto.length === 0) {
      data.profilePhoto = DEFAULT_PROFILE_IMAGE;
    } else {
      const photoFile = data.profilePhoto[0];
      data.profilePhoto = URL.createObjectURL(photoFile);
    }

    // Include the calculated age in the form data
    data.age = calculatedAge;

    console.log("Form Submitted:", data);
  };

  // Handle profile photo preview
  useEffect(() => {
    if (profilePhotoFile && profilePhotoFile.length > 0) {
      const file = profilePhotoFile[0];
      setProfileImage(URL.createObjectURL(file));
    } else {
      setProfileImage(DEFAULT_PROFILE_IMAGE);
    }
  }, [profilePhotoFile]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Student Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.outerDiv}>
          <div className={styles.sidebar}>
            <div className={styles.formGroup}>
              <label htmlFor="profilePhoto" className={styles.label}>
                Profile Photo:
              </label>
              <input
                type="file"
                id="profilePhoto"
                accept="image/*"
                {...register("profilePhoto")}
                className={styles.input}
              />
              {errors.profilePhoto && (
                <p className={styles.error}>{errors.profilePhoto.message}</p>
              )}
            </div>
            <div className={styles.profilePreview}>
              <img
                src={profileImage}
                alt="Profile Preview"
                className={styles.previewImage}
              />
            </div>
          </div>
          <div className={styles.infoContainer}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                <i className="fas fa-user"></i> Name:
              </label>
              <input
                type="text"
                id="name"
                {...register("name")}
                className={styles.input}
              />
              {errors.name && (
                <p className={styles.error}>{errors.name.message}</p>
              )}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="birthdate" className={styles.label}>
                <i className="fas fa-calendar-alt"></i> Birthdate:
              </label>
              <input
                type="date"
                id="birthdate"
                {...register("birthdate")}
                className={styles.input}
              />
              {errors.birthdate && (
                <p className={styles.error}>{errors.birthdate.message}</p>
              )}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="age" className={styles.label}>
                <i className="fas fa-birthday-cake"></i> Age:
              </label>
              <input
                type="number"
                id="age"
                value={calculatedAge}
                className={styles.input}
                disabled
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                <i className="fas fa-envelope"></i> Email:
              </label>
              <input
                type="email"
                id="email"
                {...register("email")}
                className={styles.input}
              />
              {errors.email && (
                <p className={styles.error}>{errors.email.message}</p>
              )}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="course" className={styles.label}>
                <i className="fas fa-graduation-cap"></i> Course:
              </label>
              <select
                id="course"
                {...register("course")}
                className={styles.select}
              >
                <option value="">Select Course</option>
                <option value="React JS">React JS</option>
                <option value="Node JS">Node JS</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
              </select>
              {errors.course && (
                <p className={styles.error}>{errors.course.message}</p>
              )}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="college" className={styles.label}>
                <i className="fas fa-university"></i> College:
              </label>
              <input
                type="text"
                id="college"
                {...register("college")}
                className={styles.input}
              />
              {errors.college && (
                <p className={styles.error}>{errors.college.message}</p>
              )}
            </div>
            <div className={`styles.formGroup styles.addressArea`}>
              <label htmlFor="address" className={styles.label}>
                <i className="fas fa-home"></i> Address:
              </label>
              <textarea
                id="address"
                {...register("address")}
                className={styles.textarea}
              />
              {errors.address && (
                <p className={styles.error}>{errors.address.message}</p>
              )}
            </div>

            <button type="submit" className={styles.button}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
