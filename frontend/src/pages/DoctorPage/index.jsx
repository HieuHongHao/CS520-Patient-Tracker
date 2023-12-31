import { useEffect, useState } from "react";
import { HeartPulse, Calendar, User } from "lucide-react";
import { Tab } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

import imgURL from "/Heal.png";
import doctorURL from "/Doctor.jpeg";
import { PatientRecords } from "./PatientRecords";
import { Button } from "../../components/button";
import DoctorProfile from "./DoctorProfile";
import Appointment from "./Appointment";
import { useAuth } from '../../context/AuthContext';
import Appointments from "./Appointment";
import { message } from "antd";


export default function DoctorPage() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const { logout, user: doctor, loading } = useAuth();

  const handleLogout = () => {
    logout();
    // Moves to landing page.
    navigate('/');
  }

  useEffect(() => {
    if (!loading && (!doctor || doctor.role != 'Doctor')) {
      message.error("Unauthorized.");
      navigate('/');
    }
  }, [loading]);

  // Postpone render until finish loading.
  return loading ? null : (
    <Tab.Group as={"div"} className="flex flex-row h-screen" defaultIndex={0}>
      <Tab.List className="flex flex-col border-r border-slate-200 w-1/6 h-full">
        <div className="flex flex-row mt-4 space-x-3">
          <img src={imgURL} className="w-10 h-10 ml-1 mt-2 rounded-full" />
          <div className="font-bold tracking-tight text-2xl mt-3">
            Patient Tracker
          </div>
        </div>
        <Tab className="flex flex-row mt-10 space-x-3 ml-2 group hover:bg-gray-50 hover:text-indigo-600 hover:font-semibold rounded-md focus:bg-gray-50 focus:text-indigo-600 focus:font-semibold mr-3 py-2 outline-none pl-3">
          <HeartPulse className="w-8 h-8 object-cover px-1 text-slate-600 group-hover:text-indigo-600 group-focus:text-indigo-600" />
          <div className="font-medium mt-1 leading-6 ">
            Patient Records
          </div>
        </Tab>
        <Tab className="flex flex-row mt-4 space-x-3 ml-2 group hover:bg-gray-50 hover:text-indigo-600 hover:font-semibold rounded-md focus:bg-gray-50 focus:text-indigo-600 focus:font-semibold mr-3 py-2 outline-none pl-3">
          <Calendar className="w-8 h-8 object-cover px-1 text-slate-600 group-hover:text-indigo-600 group-focus:text-indigo-600" />
          <div className="font-medium mt-1 leading-6">
            Appointments
          </div>
        </Tab>
        <Tab className="flex flex-row mt-4 space-x-3 ml-2 group hover:bg-gray-50 hover:text-indigo-600 hover:font-semibold rounded-md focus:bg-gray-50 focus:text-indigo-600 focus:font-semibold mr-3 py-2 outline-none pl-3">
          <User className="w-8 h-8 object-cover px-1 text-slate-600 group-hover:text-indigo-600 group-focus:text-indigo-600" />
          <div className="font-medium mt-1 leading-6">Profile</div>
        </Tab>
      </Tab.List>
      <Tab.Panels as="div" className=" min-h-full w-5/6">
        <div className="flex flex-row border-b border-slate-200 mt-5 pb-3 ">
          <div className="text-sm font-semibold ml-auto mr-5 mt-2">
            {doctor.firstName} {doctor.lastName} | {doctor.email}
          </div>
          <img
            src={doctorURL}
            className="w-8 h-8 object-cover rounded-full mr-5"
          />
          <Button variant={"default"} className="mr-5" onClick={handleLogout}>Sign out</Button>
        </div>
        <Tab.Panel as="div" className="min-h-full mt-5 ml-10">
          <div className="font-bold text-3xl tracking-tight">
            Patient Records
          </div>
          <PatientRecords />
        </Tab.Panel>
        <Tab.Panel as="div" className="min-h-full mt-5 ml-10">
          <div className="font-bold text-3xl tracking-tight">Appointments</div>
          <Appointments />
        </Tab.Panel>
        <Tab.Panel as="div" className="min-h-full mt-5 ml-10">
          <div className="font-bold text-3xl tracking-tight">Profile</div>
          <DoctorProfile />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
