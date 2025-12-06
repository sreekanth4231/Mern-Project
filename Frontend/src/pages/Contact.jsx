// import React, { useEffect, useState } from 'react'
// import { useParams } from "react-router-dom";



// const Contact = () => {
//   useParams(); // Assuming you might want to use the id i want to display contact info for a specific student

//   // You can fetch or use the id as needed, but for now, we'll just display static contact info
//   const [contactInfo, setContactInfo] = useState(null);
//   useEffect(() => {
//     // Simulating fetching contact info
//     setContactInfo({
//       name: "Muthu Mari G",
//       role: "Full Stack Developer",
//       email: "muthumarig234@gmail.com",
//     });
//   }, []);

//   if (!contactInfo) return <p className="text-center mt-10">Loading...</p>;


//   // Displaying contact information




//   return (
//     <>
//       <div className="p-6 font-sans max-w-md mx-auto">
      
//         <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
//         <p><strong>Name:</strong> MUTHU S</p>
//         <p><strong>Role:</strong> Full Stack Developer</p>
//         <p><strong>Email:</strong>
//           <a href="mailto:Muthumarig234@gmail.com">Muthumarig234@gmail.com</a>
//         </p>
//       </div>

//       <button
//         className="btn btn-outline btn-error w-full flex items-center justify-center gap-2 mt-6"
//         onClick={() => {
//           localStorage.removeItem("user");
//           window.location.href = "/";
//         }}
//       >
//       Back to Home
//       </button>
//     </>
//   )
// }

// export default Contact


import React, { useEffect, useState } from "react";

const Contact = () => {
  const [contactInfo, setContactInfo] = useState(null);

  useEffect(() => {
    setContactInfo({
      name: "Muthu Mari G",
      role: "Full Stack Developer",
      email: "muthumarig234@gmail.com",
    });
  }, []);

  if (!contactInfo) return <p className="text-center text-gray-300 mt-10">Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6">
      <div className="bg-gray-900 bg-opacity-90 backdrop-blur-md rounded-3xl shadow-2xl p-10 max-w-md w-full text-center text-gray-100 border border-gray-700">
        <h2 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
          Contact Information
        </h2>
        <p className="text-xl font-semibold text-indigo-400">{contactInfo.name}</p>
        <p className="text-gray-300">{contactInfo.role}</p>
        <p className="mt-2">
          <a href={`mailto:${contactInfo.email}`} className="text-blue-400 underline">
            {contactInfo.email}
          </a>
        </p>

        <button
          onClick={() => {
            localStorage.removeItem("user");
            window.location.href = "/";
          }}
          className="mt-8 w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-xl transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Contact;
