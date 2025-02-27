import React, { useState } from "react";
import { Upload } from "lucide-react";

const HomePage = () => {
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [proofUploaded, setProofUploaded] = useState(false);

  const challenges = [
    { title: "Donate Clothes", options: ["Pick-up", "Drop by yourself"] },
    { title: "Recycle Items", options: ["Pick-up", "Drop by yourself"] },
    { title: "Feed Someone in Need", options: ["Donate", "Feed"] },
  ];

  const handleChallengeClick = (challenge) => {
    setSelectedChallenge(challenge);
    setSelectedOption(null);
    setProofUploaded(false);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setProofUploaded(false);
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Take a Challenge & Earn Rewards!</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {challenges.map((challenge) => (
          <button
            key={challenge.title}
            className="p-6 border rounded-lg cursor-pointer hover:shadow-lg"
            onClick={() => handleChallengeClick(challenge)}
          >
            {challenge.title}
          </button>
        ))}
      </div>

      {selectedChallenge && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">{selectedChallenge.title}</h2>
          <div className="mt-4 space-x-4">
            {selectedChallenge.options.map((option) => (
              <button
                key={option}
                className="p-3 bg-blue-500 text-white rounded-lg"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedOption && selectedChallenge.title !== "Feed Someone in Need" && (
        <div className="mt-6">
          <h3 className="text-lg font-medium">Upload Photo Proof</h3>
          <div className="mt-4 p-4 border rounded-lg flex flex-col items-center">
            <Upload size={40} />
            <input
              type="file"
              className="mt-2"
              onChange={() => setProofUploaded(true)}
            />
          </div>
        </div>
      )}

      {proofUploaded && (
        <div className="mt-6 p-4 border rounded-lg bg-green-100 flex flex-col items-center">
          <h3 className="text-lg font-semibold">Proof Verified! Here's your coupon:</h3>
          <div className="mt-4 flex flex-col items-center">
            {selectedChallenge.title === "Donate Clothes" ? (
              <>
                <img src="/zudio-logo.png" alt="Zudio Logo" className="w-20" />
                <p className="text-md font-medium mt-2">30% off on Clothes</p>
              </>
            ) : selectedChallenge.title === "Recycle Items" ? (
              <>
                <img src="/pvr-logo.png" alt="PVR Logo" className="w-20" />
                <p className="text-md font-medium mt-2">40% off on Movie Tickets</p>
              </>
            ) : (
              <>
                <img src="/burgerking-logo.png" alt="Burger King Logo" className="w-20" />
                <p className="text-md font-medium mt-2">Flat ₹100 Off</p>
              </>
            )}
          </div>
        </div>
      )}

      {selectedOption && selectedChallenge.title === "Feed Someone in Need" && (
        <div className="mt-6">
          {selectedOption === "Donate" ? (
            <div>
              <h3 className="text-lg font-medium">Contacts to Social Organisations</h3>
              <ul className="list-disc ml-6 mt-2">
                <li>NGO 1: 123-456-7890</li>
                <li>NGO 2: 098-765-4321</li>
              </ul>
            </div>
          ) : (
            <div>
              <p className="text-lg font-medium">Go out and feed someone in need today!</p>
              <h3 className="text-lg font-medium mt-4">Upload Photo Proof</h3>
              <div className="mt-4 p-4 border rounded-lg flex flex-col items-center">
                <Upload size={40} />
                <input
                  type="file"
                  className="mt-2"
                  onChange={() => setProofUploaded(true)}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
