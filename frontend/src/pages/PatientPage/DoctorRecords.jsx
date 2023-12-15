import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableCaption,
  } from "../../components/table";
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "../../components/Diaglog";
  import { useEffect, useState } from "react";
  import { useParams, useNavigate } from "react-router-dom";
  import { Button } from "../../components/button";
  
  
  import { DataTable } from "../../components/DataTable";
import { getDoctor, getDoctors } from "../../api/doctor";
  
  const columns = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "age",
      header: "Age",
    },
    {
      accessorKey: "condition",
      header: "Condition",
    },
  ];
  
  const patientsData = [
    {
      name: "Jane Doe",
      email: "jane@example.com",
      age: 35,
      condition: "Diabetes",
    },
    {
      name: "Bob Johnson",
      email: "bob@example.com",
      age: 42,
      condition: "Arthritis",
    },
    {
      name: "Alice Smith",
      email: "alice@example.com",
      age: 28,
      condition: "Hypertension",
    },
    {
      name: "John Doe",
      email: "john@example.com",
      age: 50,
      condition: "Asthma",
    },
    {
      name: "Eva Brown",
      email: "eva@example.com",
      age: 56,
      condition: "Migraine",
    },
    {
      name: "Bob Johnson",
      email: "bob@example.com",
      age: 32,
      condition: "Diabetes",
    },
    {
      name: "Alice Smith",
      email: "alice@example.com",
      age: 45,
      condition: "Arthritis",
    },
    {
      name: "John Doe",
      email: "john@example.com",
      age: 60,
      condition: "Hypertension",
    },
    {
      name: "Eva Brown",
      email: "eva@example.com",
      age: 38,
      condition: "Asthma",
    },
    {
      name: "Jane Doe",
      email: "jane@example.com",
      age: 25,
      condition: "Migraine",
    },
  ];
  
  export function DoctorRecords() {
    const [currentRecordView, setCurrentRecordView] = useState({});
    const [doctorList, setDoctorList] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
      getDoctors().then((res) => {
        console.log(res)
        setDoctorList(res)

        // const processedHistories = res.data.map((history) => {
        //   const originalDate = new Date(history.visitedDate);
        //   // Extract year, month, and day components
        //   const year = originalDate.getFullYear();
        //   const month = (originalDate.getMonth() + 1).toString().padStart(2, "0");
        //   const day = originalDate.getDate().toString().padStart(2, "0");
  
        //   // Create the formatted date string in "mm-dd-yyyy" format
        //   const formattedDateString = `${month}-${day}-${year}`;
        //   return {
        //     name: history.patientId.firstName + " " + history.patientId.lastName,
        //     description: history.description,
        //     condition: history.condition,
        //     visitedDate: formattedDateString,
        //     patientId: history.patientId._id,
        //   };
        // });
        // setRecords(cloneDeep(processedHistories));
      });
    }, []);

    return (
      <div className="mt-5 mr-5">
        <div className="flex flex-row">
        <input
          type="text"
          className="bg-white w-1/2 rounded-md h-8 placeholder-slate-500 px-3 mt-3 ml-1 mb-5 ring-1 ring-slate-700/20"
          placeholder="Search patient"
        />
        </div>
        
        <table>
          <thead>
            <tr>
              <th className="pr-20">First Name</th>
              <th className="pr-20">Last Name</th>
              <th className="pr-20"> Email</th>
              <th className="pr-20">Specialization</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {doctorList.map((doctor) => (
              <tr>
                <td className="pr-20">{doctor.userId.firstName}</td>
                <td className="pr-20">{doctor.userId.lastName}</td>
                <td className="pr-20">{doctor.userId.email}</td>
                <td className="pr-20">{doctor.specialization}</td>
                <Button onClick={() => navigate('/patient/book-appointment/' + doctor.userId._id)} variant={'link'}>Book appointment</Button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  
  