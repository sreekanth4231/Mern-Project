

// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { FiLogOut } from "react-icons/fi";
// import axios from "axios";

// const API_BASE = "https://express-mongodb-backend-5g58.onrender.com/api/students";

// const Profile = () => {
//   const { id } = useParams();
//   const [student, setStudent] = useState(null);

//   useEffect(() => {
//     axios
//       .get(`${API_BASE}/${id}`)
//       .then((res) => setStudent(res.data))
//       .catch((error) => console.error("Failed to fetch student:", error));
//   }, [id]);

//   const handleLogout = () => {
//     localStorage.removeItem("student");
//     window.location.href = "/";
//   };

//   if (!student) {
//     return <p className="text-center mt-10">Loading...</p>;
//   }

//   return (
//     <div className="p-6 font-sans max-w-md mx-auto">
//       <h2 className="text-2xl font-semibold mb-4">Welcome {student.studentName}</h2>

//       <div className="space-y-2 text-gray-800">
//         <p><strong>Age:</strong> {student.age}</p>
//         <p><strong>Gender:</strong> {student.gender}</p>
//         <p><strong>Roll No:</strong> {student.rollNo}</p>
//       </div>

//       {student.image ? (
//         <img
//           src={`https://express-mongodb-backend-5g58.onrender.com/uploads/${student.image}`}
//           alt={student.studentName}
//           width="200"
//           className="rounded-lg mt-4"
//         />
//       ) : (
//         <p className="text-gray-500 mt-4">No profile image available.</p>
//       )}

//       <button
//         className="btn btn-outline btn-error w-full flex items-center justify-center gap-2 mt-6"
//         onClick={handleLogout}
//       >
//         <FiLogOut className="w-5 h-5" />
//         Logout
//       </button>
//     </div>
//   );
// };

// export default Profile;

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiLogOut } from "react-icons/fi";
import axios from "axios";

const API_BASE = "https://express-mongodb-backend-5g58.onrender.com/api/students";

const Profile = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_BASE}/${id}`)
      .then((res) => setStudent(res.data))
      .catch((error) => console.error("Failed to fetch student:", error));
  }, [id]);

  const handleLogout = () => {
    localStorage.removeItem("student");
    window.location.href = "/";
  };

  if (!student) {
    return <p className="text-center text-gray-300 mt-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6">
      <div className="bg-gray-900 bg-opacity-90 backdrop-blur-md rounded-3xl shadow-2xl p-10 max-w-md w-full border border-gray-700 text-gray-100">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-400 via-pink-500 to-red-500 bg-clip-text text-transparent mb-6 select-none text-center">
          Welcome {student.studentName}
        </h2>

        <div className="space-y-2 text-left text-lg">
          <p><span className="text-indigo-400">Age:</span> {student.age}</p>
          <p><span className="text-indigo-400">Gender:</span> {student.gender}</p>
          <p><span className="text-indigo-400">Roll No:</span> {student.rollNo}</p>
        </div>

        {student.image ? (
          <img
            src={`https://express-mongodb-backend-5g58.onrender.com/uploads/${student.image}`}
            alt={student.studentName}
            className="mt-8 w-40 h-40 object-cover mx-auto rounded-full border-4 border-indigo-600 shadow-lg"
          />
        ) : (
          <p className="text-gray-400 mt-4 text-center">No profile image available.</p>
        )}

        <button
          className="mt-8 w-full bg-gradient-to-r from-red-600 to-red-800 text-white py-3 rounded-xl font-semibold shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transition"
          onClick={handleLogout}
        >
          <FiLogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
