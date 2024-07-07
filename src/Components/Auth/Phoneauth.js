// // src/components/PhoneAuth.js
// import React, { useState } from 'react';
// import { auth } from './firebase'; // Adjust the path to your firebase.js
// import { RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
// import { useNavigate } from "react-router-dom";

// const PhoneAuth = () => {
//   const navigate = useNavigate();
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [otp, setOtp] = useState('');
//   const [verificationId, setVerificationId] = useState(null);
//   const [message, setMessage] = useState('');

//   const setupRecaptcha = () => {
//     if (!window.recaptchaVerifier) {
//       window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
//         size: 'invisible',
//         callback: (response) => {
//           console.log('Recaptcha verified');
//         },
//         'expired-callback': () => {
//           console.log('Recaptcha expired');
//         }
//       }, auth);
//     }
//   };

//   const handleSendOtp = async () => {
//     setupRecaptcha();
//     const appVerifier = window.recaptchaVerifier;
//     try {
//       const confirmationResult = await signInWithPhoneNumber(auth, `+91${phoneNumber}`, appVerifier);
//       setVerificationId(confirmationResult.verificationId);
//       setMessage('OTP sent successfully');
//     } catch (error) {
//       setMessage(`Failed to send OTP: ${error.message}`);
//     }
//   };

//   const handleVerifyOtp = async () => {
//     try {
//       const credential = PhoneAuthProvider.credential(verificationId, otp);
//       await signInWithCredential(auth, credential);
//       setMessage('Login successful');
//       navigate("/");
//     } catch (error) {
//       setMessage(`Failed to verify OTP: ${error.message}`);
//     }
//   };

//   return (
//     <div>
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Mobile Number / Email"
//           className="w-full p-2 border border-gray-300 rounded"
//           value={phoneNumber}
//           onChange={(e) => setPhoneNumber(e.target.value)}
//         />
//       </div>
//       {!verificationId && (
//         <button
//           onClick={handleSendOtp}
//           className="w-full bg-red-500 text-white p-2 rounded mb-4"
//         >
//           Continue
//         </button>
//       )}
//       {verificationId && (
//         <>
//           <div className="mb-4">
//             <input
//               type="text"
//               placeholder="Enter OTP"
//               className="w-full p-2 border border-gray-300 rounded"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//             />
//           </div>
//           <button
//             onClick={handleVerifyOtp}
//             className="w-full bg-green-500 text-white p-2 rounded"
//           >
//             Verify OTP
//           </button>
//         </>
//       )}
//       <div id="recaptcha-container"></div>
//       {message && <p className="text-red-500 mt-4">{message}</p>}
//     </div>
//   );
// };

// export default PhoneAuth;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './Authprovider';  // Import useAuth from your AuthProvider

const PhoneAuth = () => {
  const navigate = useNavigate();
  const { loginWithPhoneNumber, registerWithPhoneNumber } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      await registerWithPhoneNumber(phoneNumber, password);
      setMessage('Registration successful');
    } catch (error) {
      setMessage(`Registration failed: ${error.message}`);
    }
  };

  const handleLogin = async () => {
    try {
      await loginWithPhoneNumber(phoneNumber, password);
      setMessage('Login successful');
      navigate('/');
    } catch (error) {
      setMessage(`Login failed: ${error.message}`);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Mobile Number"
          className="w-full p-2 border border-gray-300 rounded"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        onClick={handleRegister}
        className="w-full bg-blue-500 text-white p-2 rounded mb-4"
      >
        Register
      </button>
      <button
        onClick={handleLogin}
        className="w-full bg-green-500 text-white p-2 rounded"
      >
        Login
      </button>
      {message && <p className="text-red-500 mt-4">{message}</p>}
    </div>
  );
};

export default PhoneAuth;
