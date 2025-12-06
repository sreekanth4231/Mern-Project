
// import { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";

// const API_BASE = "https://express-mongodb-backend-5g58.onrender.com/api/students";

// const StudentForm = () => {
//   const [form, setForm] = useState({
//     studentName: "",
//     age: "",
//     gender: "",
//     rollNo: "", // ✅ Corrected key
//     password: "",
//     image: null,
//   });

//   const [preview, setPreview] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [isLogin, setIsLogin] = useState(false);

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setForm((prev) => ({ ...prev, image: file }));
//     setPreview(file ? URL.createObjectURL(file) : null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       if (isLogin) {
//         // LOGIN
//         const res = await axios.post(`${API_BASE}/login`, {
//           studentName: form.studentName,
//           password: form.password,
//         });

//         localStorage.setItem("student", JSON.stringify(res.data));
//         alert("Login successful");
//         navigate(`/profile/${res.data._id}`);
//       } else {
//         // REGISTER
//         const formData = new FormData();
//         formData.append("studentName", form.studentName);
//         formData.append("age", form.age);
//         formData.append("gender", form.gender);
//         formData.append("rollNo", form.rollNo); // ✅ Corrected key
//         formData.append("password", form.password);
//         if (form.image) formData.append("image", form.image);

//         const res = await axios.post(`${API_BASE}`, formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });

//         alert("Registration successful");
//         navigate(`/profile/${res.data._id}`);
//       }
//     } catch (error) {
//       alert(
//         error.response?.data?.message ||
//         "An error occurred. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
//       <h2>{isLogin ? "Student Login" : "Student Registration"}</h2>

//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         <input
//           type="text"
//           name="studentName"
//           value={form.studentName}
//           placeholder="Student Name"
//           required
//           onChange={handleChange}
//           style={{ width: "100%", marginBottom: 10, padding: 8 }}
//         />

//         <input
//           type="password"
//           name="password"
//           value={form.password}
//           placeholder="Password"
//           required
//           onChange={handleChange}
//           style={{ width: "100%", marginBottom: 10, padding: 8 }}
//         />

//         {!isLogin && (
//           <>
//             <input
//               type="number"
//               name="age"
//               value={form.age}
//               placeholder="Age"
//               required
//               onChange={handleChange}
//               style={{ width: "100%", marginBottom: 10, padding: 8 }}
//             />
//             <input
//               type="text"
//               name="gender"
//               value={form.gender}
//               placeholder="Gender"
//               required
//               onChange={handleChange}
//               style={{ width: "100%", marginBottom: 10, padding: 8 }}
//             />
//             <input
//               type="text"
//               name="rollNo" // ✅ Corrected key
//               value={form.rollNo}
//               placeholder="Roll No"
//               required
//               onChange={handleChange}
//               style={{ width: "100%", marginBottom: 10, padding: 8 }}
//             />
//             <input
//               type="file"
//               name="image"
//               accept="image/*"
//               onChange={handleImageChange}
//               required
//               style={{ marginBottom: 10 }}
//             />
//             {preview && (
//               <img
//                 src={preview}
//                 alt="Preview"
//                 style={{ width: 150, borderRadius: 8, marginBottom: 10 }}
//               />
//             )}
//           </>
//         )}

//         <button
//           type="submit"
//           disabled={loading}
//           style={{
//             width: "100%",
//             padding: 10,
//             backgroundColor: "#4caf50",
//             color: "white",
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           {loading
//             ? isLogin
//               ? "Logging in..."
//               : "Registering..."
//             : isLogin
//               ? "Login"
//               : "Register"}
//         </button>
//       </form>

//       <p
//         onClick={() => setIsLogin(!isLogin)}
//         style={{
//           cursor: "pointer",
//           color: "blue",
//           marginTop: 15,
//           textAlign: "center",
//         }}
//       >
//         {isLogin
//           ? "Don't have an account? Register"
//           : "Already have an account? Login"}
//       </p>

//       <Link
//         to="/contact"
//         style={{ display: "block", textAlign: "center", marginTop: 10 }}
//       >
//         Contact us
//       </Link>
//     </div>
//   );
// };

// export default StudentForm;

import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const API_BASE = "https://express-mongodb-backend-5g58.onrender.com/api/students";

const StudentForm = () => {
  const [form, setForm] = useState({
    studentName: "",
    age: "",
    gender: "",
    rollNo: "",
    password: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setForm((prev) => ({ ...prev, image: file }));
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const res = await axios.post(`${API_BASE}/login`, {
          studentName: form.studentName,
          password: form.password,
        });
        localStorage.setItem("student", JSON.stringify(res.data));
        alert("Login successful");
        navigate(`/profile/${res.data._id}`);
      } else {
        const formData = new FormData();
        formData.append("studentName", form.studentName);
        formData.append("age", form.age);
        formData.append("gender", form.gender);
        formData.append("rollNo", form.rollNo);
        formData.append("password", form.password);
        if (form.image) formData.append("image", form.image);

        const res = await axios.post(`${API_BASE}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Registration successful");
        navigate(`/profile/${res.data._id}`);
      }
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6 flex items-center justify-center">
      <div className="bg-gray-900 bg-opacity-90 rounded-3xl shadow-2xl p-8 max-w-md w-full text-white">
        <h2 className="text-3xl font-bold text-center mb-6">
          {isLogin ? "Student Login" : "Student Registration"}
        </h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
          <input
            type="text"
            name="studentName"
            value={form.studentName}
            placeholder="Student Name"
            required
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            placeholder="Password"
            required
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {!isLogin && (
            <>
              <input
                type="number"
                name="age"
                value={form.age}
                placeholder="Age"
                required
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600"
              />
              <input
                type="text"
                name="gender"
                value={form.gender}
                placeholder="Gender"
                required
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600"
              />
              <input
                type="text"
                name="rollNo"
                value={form.rollNo}
                placeholder="Roll No"
                required
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-600"
              />
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="text-gray-300"
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-24 h-24 rounded-full object-cover mt-2 mx-auto"
                />
              )}
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white py-2 rounded-md font-bold"
          >
            {loading
              ? isLogin
                ? "Logging in..."
                : "Registering..."
              : isLogin
              ? "Login"
              : "Register"}
          </button>
        </form>

        <p
          onClick={() => setIsLogin(!isLogin)}
          className="text-center text-blue-400 mt-4 cursor-pointer hover:underline"
        >
          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </p>

        <Link
          to="/contact"
          className="block text-center mt-4 text-purple-400 hover:underline"
        >
          Contact us
        </Link>
      </div>
    </div>
  );
};

export default StudentForm;



