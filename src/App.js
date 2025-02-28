import React, { useState } from "react";
import { Upload, Shirt, Recycle, Heart, MapPin } from "lucide-react";

const generateCouponCode = () => {
  return "COUPON-" + Math.random().toString(36).substr(2, 8).toUpperCase();
};

const HomePage = () => {
  const [isValidated, setIsValidated] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [couponCode, setCouponCode] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [address, setAddress] = useState("");

  const challenges = [
    { title: "Donate Clothes", icon: <Shirt size={32} />, options: ["Pick-up", "Drop by yourself"], coupon: { discount: "40% off", brand: "Zudio", logo: "/zudio-logo.png" } },
    { title: "Recycle Items", icon: <Recycle size={32} />, options: ["Pick-up", "Drop by yourself"], coupon: { discount: "30% off", brand: "PVR Cinemas", logo: "/pvr-logo.png" } },
    { title: "Feed Someone in Need", icon: <Heart size={32} />, options: ["Donate", "Feed"], coupon: { discount: "₹100 off", brand: "Burger King", logo: "/burgerking-logo.png" } },
  ];

  const handleAuth = () => {
    if (username && password) {
      setIsAuthenticated(true);
    }
  };

  const handleChallengeClick = (challenge) => {
    setSelectedChallenge(challenge);
    setSelectedOption(null);
    setIsValidated(false);
    setUploadedFile(null);
    setAddress("");
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsValidated(false);
    setUploadedFile(null);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      setIsValidated(true);
      setCouponCode(generateCouponCode());
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container text-center mt-5 p-5 bg-gray-800 text-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold">{isSigningUp ? "Sign Up" : "Sign In"}</h1>
        <input 
          type="text" 
          placeholder="Username" 
          className="block w-full mt-3 p-2 rounded-lg text-black" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="block w-full mt-3 p-2 rounded-lg text-black" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
        />
        <button 
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700" 
          onClick={handleAuth}
        >
          {isSigningUp ? "Sign Up" : "Sign In"}
        </button>
        <p className="mt-3 cursor-pointer text-gray-300 underline" onClick={() => setIsSigningUp(!isSigningUp)}>
          {isSigningUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
        </p>
      </div>
    );
  }

  return (
    <div className="container text-center mt-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-5 rounded-lg shadow-lg">
      <h1 className="display-4 font-extrabold">Take a Challenge & Earn Rewards!</h1>
      <div className="row mt-4">
        {challenges.map((challenge) => (
          <div className="col-md-4 mb-4" key={challenge.title}>
            <div
              className="card p-4 shadow-lg bg-white text-dark hover:shadow-xl transition duration-300 cursor-pointer"
              onClick={() => handleChallengeClick(challenge)}
            >
              {challenge.icon}
              <p className="h5 mt-3 font-semibold">{challenge.title}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedChallenge && (
        <div className="mt-4 p-4 bg-gray-800 shadow-lg rounded-lg text-white">
          <h2 className="text-xl font-bold">{selectedChallenge.title} Selected!</h2>
          <div className="mt-3">
            {selectedChallenge.options.map((option) => (
              <button key={option} className="btn btn-primary mx-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition" onClick={() => handleOptionClick(option)}>
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedOption === "Pick-up" && (
        <div className="mt-4 p-4 bg-gray-200 shadow-lg rounded-lg">
          <h3 className="text-dark font-semibold">Enter Your Address for Pick-up</h3>
          <div className="flex items-center mt-2">
            <MapPin size={24} className="mr-2" />
            <input 
              type="text" 
              className="form-control p-2 rounded-lg" 
              placeholder="Enter your address" 
              value={address} 
              onChange={(e) => setAddress(e.target.value)} 
            />
          </div>
          {!address.trim() && (
            <p className="text-red-500 mt-2">Please enter a valid address.</p>
          )}
        </div>
      )}

      {selectedOption === "Drop by yourself" && (
        <div className="mt-4 p-4 bg-gray-200 shadow-lg rounded-lg">
          <h3 className="text-dark font-semibold">Drop-off Location</h3>
          <p className="text-dark">Please visit your nearest drop-off point to donate.</p>
        </div>
      )}

      {selectedOption && (
        <div className="mt-4 p-4 bg-gray-800 text-white shadow-lg rounded-lg">
          <h3 className="font-semibold">Upload Photo Proof</h3>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="mt-2 p-2 bg-gray-700 rounded-lg"
          />
          {uploadedFile && (
            <p className="mt-2 text-green-400">Photo uploaded successfully!</p>
          )}
        </div>
      )}

      {isValidated && selectedChallenge && (
        <div className="mt-4 p-4 bg-gray-800 text-white shadow-lg rounded-lg">
          <h3 className="font-semibold">Congrats! You've Earned a Coupon</h3>
          <div className="mt-3">
            <img
              src={selectedChallenge.coupon.logo}
              alt={selectedChallenge.coupon.brand}
              className="w-24 h-24 object-cover rounded-lg mx-auto"
            />
            <p className="mt-2 font-bold">{selectedChallenge.coupon.discount}</p>
            <p>Your Coupon Code: <strong>{couponCode}</strong></p>
          </div>
          <button
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700"
            onClick={() => {
              setSelectedChallenge(null);
              setSelectedOption(null);
              setIsValidated(false);
              setUploadedFile(null);
              setAddress("");
            }}
          >
            Start a New Challenge
          </button>
        </div>
      )}

      {selectedOption && selectedOption === "Donate" && selectedChallenge.title === "Feed Someone in Need" && (
        <div className="mt-4 p-4 bg-gray-800 text-white shadow-lg rounded-lg">
          <h3 className="font-semibold">Contact These Social Organizations:</h3>
          <ul className="list-group">
            <li className="list-group-item bg-gray-700 text-white p-2 rounded">Helping Hands - +91 98765 43210</li>
            <li className="list-group-item bg-gray-700 text-white p-2 rounded">Food For All - +91 87654 32109</li>
            <li className="list-group-item bg-gray-700 text-white p-2 rounded">Care & Share - +91 76543 21098</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default HomePage;