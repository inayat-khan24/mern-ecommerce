import React, { useEffect, useState } from 'react';
import { FaPen } from "react-icons/fa";
const MyAccount = () => {
  const [userInfo, setUserInfo] = useState(null);
  

  const fetchUserInfo = async () => {
    const userId = localStorage.getItem("userID");
    try {
      const res = await fetch(`http://157.66.191.24:4447/api/getUserDetails?userId=${userId}`);
      const result = await res.json();
      console.log(result);
      setUserInfo(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <section className='py-10 w-full'>
      <div className="container flex gap-10">
        <div className='col1 w-[25%]'>
          <div className="card bg-white shadow-md rounded-md p-5">
            <div className='w-full p-3 flex items-center justify-center flex-col'>
              <div className='w-[110px] h-[110px] rounded-full overflow-hidden'>
                <img
                  src={
                    userInfo?.profileImage
                      ? userInfo.profileImage
                      : "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
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

        <div className='col2 w-[75%]'>
          <div className="bg-white shadow-md rounded-md p-5">
            <h3 className="text-xl font-bold mb-4">Account Information</h3>
            {userInfo ? (
              <ul className="space-y-2 text-[15px]">
                <li><strong>User Name:</strong> {userInfo.userName}</li>
                <li><strong>Unique Name:</strong> {userInfo.uniqueName}</li>
                <li><strong>Email:</strong> {userInfo.email}</li>
                <li><strong>Country:</strong> {userInfo.countryName}</li>
                <li><strong>Role:</strong> {userInfo.role}</li>
                <li><strong>Created At:</strong> {new Date(userInfo.createdAt).toLocaleString()}</li>
              </ul>
            ) : (
              <p>Loading user information...</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyAccount;