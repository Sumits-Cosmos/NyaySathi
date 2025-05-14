import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const LawyerDashboard: React.FC = () => {
    
  const [lawyerData, setLawyerData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, 'lawyers', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setLawyerData(docSnap.data());
        }
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLawyerData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (!auth.currentUser) return;
    const docRef = doc(db, 'lawyers', auth.currentUser.uid);
    await updateDoc(docRef, lawyerData);
    alert("Profile updated!");
  };

  if (loading || !lawyerData) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Lawyer Dashboard</h2>
      <div className="space-y-4">
        <input
          type="text"
          name="experience"
          placeholder="Experience (e.g., 10 years)"
          value={lawyerData.experience || ''}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="rating"
          placeholder="Rating (e.g., 4.5)"
          value={lawyerData.rating || ''}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="reviews"
          placeholder="Number of Reviews"
          value={lawyerData.reviews || ''}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="cases"
          placeholder="Total Cases"
          value={lawyerData.cases || ''}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="winRate"
          placeholder="Win Rate (e.g., 85%)"
          value={lawyerData.winRate || ''}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <select
          name="available"
          value={lawyerData.available ? "true" : "false"}
          onChange={(e) =>
            setLawyerData((prev) => ({
              ...prev,
              available: e.target.value === "true",
            }))
          }
          className="w-full border p-2 rounded"
        >
          <option value="true">Available</option>
          <option value="false">Not Available</option>
        </select>

        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Profile
        </button>
      </div>
    </div>
  );
};

export default LawyerDashboard;