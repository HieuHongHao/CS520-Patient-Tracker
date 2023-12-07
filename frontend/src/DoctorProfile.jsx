import { Input } from "./components/Input";
export default function DoctorProfile(){
    return (
        <div className="flex flex-col mt-3 ml-1">
            <div className="font-medium text-sm mt-2">Name</div>
            <Input placeholder="Change your name" className="w-2/4 mt-3"/>
            <div className="text-xs mt-2 text-slate-500">This is the name that will be displayed in your profile</div>
            <div className="font-medium text-sm mt-5">Email</div>
            <Input placeholder="Change your email" className="w-2/4 mt-3" type="email"/>
            <div className="text-xs mt-2 text-slate-500">This is your profile email</div>
            <div className="font-medium text-sm mt-5">Specialization</div>
        </div>
    )
}