// src/components/PhoneAuth.js
import React, { useState } from 'react';
import { auth } from './firebase'; // Adjust the path to your firebase.js
import { RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

const PhoneAuth = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const [message, setMessage] = useState('');

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        size: 'invisible',
        callback: (response) => {
          console.log('Recaptcha verified');
        },
        'expired-callback': () => {
          console.log('Recaptcha expired');
        }
      }, auth);
    }
  };

  const handleSendOtp = async () => {
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    try {
      const confirmationResult = await signInWithPhoneNumber(auth, `+91${phoneNumber}`, appVerifier);
      setVerificationId(confirmationResult.verificationId);
      setMessage('OTP sent successfully');
    } catch (error) {
      setMessage(`Failed to send OTP: ${error.message}`);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      await signInWithCredential(auth, credential);
      setMessage('Login successful');
      navigate("/");
    } catch (error) {
      setMessage(`Failed to verify OTP: ${error.message}`);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Mobile Number / Email"
          className="w-full p-2 border border-gray-300 rounded"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      {!verificationId && (
        <button
          onClick={handleSendOtp}
          className="w-full bg-red-500 text-white p-2 rounded mb-4"
        >
          Continue
        </button>
      )}
      {verificationId && (
        <>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full p-2 border border-gray-300 rounded"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          <button
            onClick={handleVerifyOtp}
            className="w-full bg-green-500 text-white p-2 rounded"
          >
            Verify OTP
          </button>
        </>
      )}
      <div id="recaptcha-container"></div>
      {message && <p className="text-red-500 mt-4">{message}</p>}
    </div>
  );
};

export default PhoneAuth;
