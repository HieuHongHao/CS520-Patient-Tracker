import {
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "../../components/card";
import { Badge } from "../../components/Badge";
import { AvatarImage, AvatarFallback, Avatar } from "../../components/avatar";
import { Button } from "../../components/button";
import { getDoctorAppointments } from "../../api/doctor";
import { useState, useEffect } from "react";


function Appointments() {
   const [appointments, setAppointments] = useState([]);
   
   useEffect(() => {
     getDoctorAppointments().then(res => {
      setAppointments([...res]);
     })
     
   }, [])
   
   return (
      <div>Test</div>

   )
}

export default function Appointment() {
  const [appointments, setAppointments] = useState([]);
   
   useEffect(() => {
     getDoctorAppointments("6152f3b572d4cfe6fc37e65a").then(res => {
      setAppointments([...res]);
     })
     
   }, [])

   console.log(appointments);
  return (
    <Card className="mt-5 p-4 w-2/6">
      <CardHeader>
        <CardTitle className="flex flex-row">
          HIV Checkup
          <Badge className="text-xs ml-auto ">Upcoming</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-3">
          <Avatar className="w-7 h-7">
            <AvatarImage
              alt="Doctor's avatar"
              src="/placeholder.svg?height=40&width=40"
            />
            <AvatarFallback>Dr</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Dr. John Doe</h4>
            <p className="text-[0.8125rem] text-gray-500 dark:text-gray-400">
              Cardiologist
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Avatar className="w-7 h-7">
            <AvatarImage
              alt="Patient's avatar"
              src="/placeholder.svg?height=40&width=40"
            />
            <AvatarFallback>Pt</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Jane Doe</h4>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <CalendarIcon className="w-4 h-4" />
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Date: 12th Dec 2023</h4>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}
