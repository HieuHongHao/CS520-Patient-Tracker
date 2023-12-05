import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableCaption,
  } from "./components/table";
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "./components/Diaglog";
  
  
  
  import { DataTable } from "./components/DataTable";
  import { Button } from "./components/button";
  
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
    return (
      <div className="mt-5 mr-5">
        <div className="flex flex-row">
        <input
          type="text"
          className="bg-white w-1/2 rounded-md h-8 placeholder-slate-500 px-3 mt-3 ml-1 mb-5 ring-1 ring-slate-700/20"
          placeholder="Search patient"
        />
          <Dialog>
            <DialogTrigger className="ml-5 mb-3">
              <Button size={"sm"}>Book appointment</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>New Patient Record Form</DialogTitle>
                <DialogDescription>
                  <div className="flex flex-col">
  
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        
  
        <DataTable columns={columns} data={patientsData} />
      </div>
    );
  }
  
  
  