import React, { useEffect, useState } from 'react';
import { FaPen } from "react-icons/fa";
import { handleError, handleSuccess } from '../component/notifiction';
import { ToastContainer } from 'react-toastify';


const MyAccount = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [editField, setEditField] = useState(null);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
   const userId = localStorage.getItem("userID");
    const token = localStorage.getItem("token");


  const fetchUserInfo = async () => {
   
    try {
      const res = await fetch(`http://157.66.191.24:4447/api/getUserDetails?userId=${userId}`);
      const result = await res.json();
      setUserInfo(result.data);
    
      setFormData({
        userName: result.data.userName || '',
        email: result.data.email || '',
        countryName: result.data.countryName || '',
        uniqueName: result.data.uniqueName || '',
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (field) => {
    setEditField(field);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleUpdate = async () => {
    
    setIsSubmitting(true);
    try {
      const res = await fetch(`http://157.66.191.24:4447/api/updateUserProfile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          userId: userInfo._id,
          userName: formData.userName,
          email: formData.email,
          countryName: formData.countryName,
          uniqueName: formData.uniqueName
        })
      });
      
      const result = await res.json();
      console.log(result)
      if (result.result === "true") {
        handleSuccess("Profile updated successfully!");
        fetchUserInfo();
        setEditField(null);
      } else {
        handleError("Update failed: " + result.msg);
      }
    } catch (error) {
      console.log(error);
      handleError("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);



  return (
    
    <>
    <section className='py-10 w-full'>
      <div className="container flex gap-10">
        {/* Profile Image Card */}
        <div className='col1 w-[25%]'>
          <div className="card bg-white shadow-md rounded-md p-5">
            <div className='w-full p-3 flex items-center justify-center flex-col'>
              <div className='w-[110px] h-[110px] rounded-full overflow-hidden'>
                <img
                  src={
                    userInfo?.profileImage
                      ? userInfo.profileImage
                      : "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3"
                  }
                  alt="user profile"
                  className='w-full h-full object-cover'
                />
              </div>
              <h2 className='mt-4 text-lg font-semibold'>{userInfo?.userName || "Loading..."}</h2>
              <p className='text-sm text-gray-600'>{userInfo?.email}</p>
            </div>
          </div>
        </div>

        {/* Editable Info Section */}
        <div className='col2 w-[75%]'>
          <div className="bg-white shadow-md rounded-md p-5">
            <h3 className="text-xl font-bold mb-4">Account Information</h3>
            {userInfo ? (
                
              <div className="space-y-4">
                {/* Reusable field component */}
                {["userName", "email", "countryName","uniqueName"].map((field) => (
                  <div key={field} className="flex items-center gap-3">
                    <label className='w-[120px] font-medium capitalize'>{field.replace("Name", " Name")}:</label>
                    {editField === field ? (
                      <input
                        type={field === "email" ? "email" : "text"}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        className="border rounded-md px-3 py-2 w-full"
                      />
                    ) : (
                      <span className="text-gray-700">{formData[field]}</span>
                    )}
                    <button
                      onClick={() => handleEdit(field)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaPen size={14} />
                    </button>
                  </div>
                ))}

                <button
                  onClick={handleUpdate}
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md mt-4"
                >
                  {isSubmitting ? "Updating..." : "Update Profile"}
                </button>
              </div>
            ) : (
              <p>Loading user information...</p>
            )}
          </div>
        </div>
      </div>
    </section>
    <ToastContainer />
    </>
    
  );
};

export default MyAccount;
