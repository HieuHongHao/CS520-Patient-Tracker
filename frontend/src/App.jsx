import { useState } from "react";
import imgURL from "/Heal.png";
import doctorURL from "/Doctor.jpeg";
import { HeartPulse, Calendar, User } from "lucide-react";
import { Tab } from "@headlessui/react";
import { PatientRecords } from "./PatientRecords";
import {Button} from "./components/button";


function App() {
  const [count, setCount] = useState(0);

  

  return (
    <Tab.Group as={"div"} className="flex flex-row h-screen">
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
          <Calendar className="w-8 h-8 object-cover px-1 text-slate-600 group-hover:text-indigo-600 group-focus:text-indigo-600"/>
          <div className="font-medium mt-1 leading-6">
            Appointments
          </div>
        </Tab>
        <Tab className="flex flex-row mt-4 space-x-3 ml-2 group hover:bg-gray-50 hover:text-indigo-600 hover:font-semibold rounded-md focus:bg-gray-50 focus:text-indigo-600 focus:font-semibold mr-3 py-2 outline-none pl-3">
          <User className="w-8 h-8 object-cover px-1 text-slate-600 group-hover:text-indigo-600 group-focus:text-indigo-600"/>
          <div className="font-medium mt-1 leading-6">Profile</div>
        </Tab>
      </Tab.List>
      <Tab.Panels as="div" className=" min-h-full w-5/6">
        <div className="flex flex-row border-b border-slate-200 mt-5 pb-3 ">
          <div className="text-sm font-semibold ml-auto mr-5 mt-2">
            doctor@gmail.com
          </div>
          <img
            src={doctorURL}
            className="w-8 h-8 object-cover rounded-full mr-5"
          />
          {/* <button className="font-semibold mr-10 text-sm hover:font-bold ">
            Sign Out
          </button> */}
          <Button variant={"default"} className="mr-5">Sign out</Button>
        </div>
        <Tab.Panel as="div" className="min-h-full mt-5 ml-10">
          <div className="font-bold text-3xl tracking-tight">
            Patient Records
          </div>
          <PatientRecords />
        </Tab.Panel>
        <Tab.Panel as="div" className="min-h-full mt-5 ml-10">
          <div className="font-bold text-3xl tracking-tight">Appointments</div>
        </Tab.Panel>
        <Tab.Panel as="div" className="min-h-full mt-5 ml-10">
          <div className="font-bold text-3xl tracking-tight">Profile</div>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}

export default App;
