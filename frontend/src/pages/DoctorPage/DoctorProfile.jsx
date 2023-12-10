import { useState } from 'react'
import { message } from 'antd';

import { Input } from "../../components/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/select";
import { Button } from "../../components/button";
import { updateDoctor } from '../../api/doctor';

import { useAuth } from '../../context/AuthContext';

export default function DoctorProfile() {
  const [profile, setProfile] = useState({});
  const { login, user } = useAuth();

  const handleProfileUpdate = async () => {
    try {
      const data = await updateDoctor(user._id, profile);
      // update current user data (logged in).
      login(data);
      message.success("Update success!");
    } catch (err) {
      message.error(err.data.message);
    }
  }

  return (
    <div className="flex flex-col mt-3 ml-1">
      <div className="font-medium text-sm mt-2">Name</div>
      <Input placeholder="First name" className="w-2/4 mt-3"
        onChange={(e) => setProfile(prev => ({ ...prev, firstName: e.target.value }))}
      />
      <Input placeholder="Last name" className="w-2/4 mt-3"
        onChange={(e) => setProfile(prev => ({ ...prev, lastName: e.target.value }))}
      />
      <div className="text-xs mt-2 text-slate-500">
        This is the name that will be displayed in your profile
      </div>
      <div className="font-medium text-sm mt-5">Phone number</div>
      <Input
        placeholder="Change your phone number"
        className="w-2/4 mt-3"
        type="tel"
        onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
      />
      <div className="text-xs mt-2 text-slate-500">
        This is your phone number
      </div>
      <div className="font-medium text-sm mt-7">Specialization</div>
      <SpecializationSelector setProfile={setProfile}/>
      <Button className="w-max ml-1 mt-10" onClick={handleProfileUpdate}>Update profile</Button>
    </div>
  );
}

function SpecializationSelector({ setProfile }) {
  return (
    <Select onValueChange={value => {
      console.log(value);
      setProfile(prev => {
        return {
          ...prev,
          specialization: value
        }
      })
    }}>
      <SelectTrigger className="w-[180px] mt-2" >
        <SelectValue placeholder="Role" />
      </SelectTrigger>
      <SelectContent >
        <SelectItem value="top">Top</SelectItem>
        <SelectItem value="bot">Bot</SelectItem>
        <SelectItem value="mid">Mid</SelectItem>
        <SelectItem value="support">Support</SelectItem>
        <SelectItem value="jungle">Jungle</SelectItem>
      </SelectContent>
    </Select>
  );
}
