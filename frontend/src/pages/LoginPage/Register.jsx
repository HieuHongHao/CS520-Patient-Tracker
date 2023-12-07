import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


import { registerUser } from "../../api/user";
import { useAuth } from "../../context/AuthContext";

import imgURL from "/Heal.png"

export default function RegisterPage() {
  const [registerInfo, setRegisterInfo] = useState({ email: '', password: '', role: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegisterClick = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser(registerInfo);
      // fill registered user data to AuthContext, same as login.
      login(data.user);

      // Goes to landing page for further redirection.
      navigate('/');

    } catch (err) {
      // TODO: add snackbar for error msg.
      console.log("Error", err.data);
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <img
        src={imgURL}
        className="w-12 h-12 object-cover rounded mt-24 self-center"
      />
      <div className="font-semibold text-slate-900 text-3xl mt-5 self-center ">
        Create an Account 👋
      </div>
      <form className="self-center flex-col flex w-full mt-14 ">
        <div className="text-sm font-medium text-slate-700 self-center w-1/4">
          First Name
        </div>
        <input
          type="text"
          className="w-1/4 h-max py-1 rounded-md ring-1 ring-slate-700/25 self-center mt-1 outline-none px-2 focus:ring-2 focus:ring-sky-500"
          onChange={(e) => {
            setRegisterInfo({
              ...registerInfo,
              firstName: e.target.value,
            });
          }}
        />

        <div className="text-sm font-medium text-slate-700 self-center w-1/4 mt-5">
          Last Name
        </div>
        <input
          type="text"
          className="w-1/4 h-max py-1 rounded-md ring-1 ring-slate-700/25 self-center mt-1 outline-none px-2 focus:ring-2 focus:ring-sky-500"
          onChange={(e) => {
            setRegisterInfo({
              ...registerInfo,
              lastName: e.target.value,
            });
          }}
        />

        <div className="text-sm font-medium text-slate-700 self-center w-1/4 mt-5">
          Phone Number
        </div>
        <input
          type="tel"
          className="w-1/4 h-max py-1 rounded-md ring-1 ring-slate-700/25 self-center mt-1 outline-none px-2 focus:ring-2 focus:ring-sky-500"
          onChange={(e) => {
            setRegisterInfo({
              ...registerInfo,
              phone: e.target.value,
            });
          }}
        />

        <div className="text-sm font-medium text-slate-700 self-center w-1/4 mt-5">
          Role
        </div>
        <div className="flex self-center mt-2">
          <input
            type="radio"
            name="role"
            value="Doctor"
            onChange={(e) => {
              setRegisterInfo({
                ...registerInfo,
                role: e.target.value,
              });
            }}
          />
          <label htmlFor="doctor" className="ml-2 text-slate-700">
            Doctor
          </label>

          <input
            type="radio"
            name="role"
            value="Patient"
            onChange={(e) => {
              setRegisterInfo({
                ...registerInfo,
                role: e.target.value,
              });
            }}
            className="ml-4"
          />
          <label htmlFor="patient" className="ml-2 text-slate-700">
            Patient
          </label>
        </div>

        <div className="text-sm font-medium text-slate-700 self-center w-1/4 mt-5">
          Email
        </div>
        <input
          type="email"
          className="w-1/4 h-max py-1 rounded-md ring-1 ring-slate-700/25 self-center mt-1 outline-none px-2 focus:ring-2 focus:ring-sky-500"
          onChange={(e) => {
            setRegisterInfo({
              ...registerInfo,
              email: e.target.value,
            });
          }}
        />

        <div className="text-slate-700 self-center w-1/4 mt-5 text-sm font-medium">
          Password
        </div>
        <input
          type="password"
          className="w-1/4 h-max py-1 rounded-md ring-1 ring-slate-700/25 self-center mt-1 outline-none px-2 focus:ring-2 focus:ring-sky-500"
          onChange={(e) => {
            setRegisterInfo({
              ...registerInfo,
              password: e.target.value,
            });
          }}
        />

        <button
          className="self-center w-1/4 h-max py-2 px-4 bg-black font-semibold text-white mt-10 hover:bg-slate-700 text-sm rounded-md"
          onClick={handleRegisterClick}
        >
          Create Account
        </button>

        <div className="text-[0.8125rem] self-center mt-5 flex flex-row w-1/4">
          <div className="border-t h-2 border-slate-900/20 self-center w-2/3 mt-2"></div>
          <div className="ml-1 font-medium self-center">OR</div>
          <div className="border-t h-2 border-slate-900/20 ml-2 mt-2 self-center w-2/3"></div>
        </div>
        <button
          className="self-center w-1/4 h-max py-2 px-4 font-semibold rounded-md mt-5 hover:bg-slate-100 text-sm ring-1 ring-slate-700/25"
          onClick={() => navigate('/login')}
        >
          Already have an account? Login
        </button>
      </form>
    </div>
  );
}
