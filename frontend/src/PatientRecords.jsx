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
    accessorKey: "condition",
    header: "Condition",
  },
  {
    accessorKey: "visitedDate",
    header: "Visited Date",
  },
];

const patientsData = [
  {
    name: "Jane Doe",
    condition: "Diabetes",
    visitedDate: "2023-01-01", // Replace with the actual visited date
  },
  {
    name: "Bob Johnson",
    condition: "Arthritis",
    visitedDate: "2023-02-15", // Replace with the actual visited date
  },
  {
    name: "Alice Smith",
    condition: "Hypertension",
    visitedDate: "2023-03-10", // Replace with the actual visited date
  },
  {
    name: "John Doe",
    condition: "Asthma",
    visitedDate: "2023-04-20", // Replace with the actual visited date
  },
  {
    name: "Eva Brown",
    condition: "Migraine",
    visitedDate: "2023-05-05", // Replace with the actual visited date
  },
  {
    name: "Bob Johnson",
    condition: "Diabetes",
    visitedDate: "2023-06-12", // Replace with the actual visited date
  },
  {
    name: "Alice Smith",
    condition: "Arthritis",
    visitedDate: "2023-07-18", // Replace with the actual visited date
  },
  {
    name: "John Doe",
    condition: "Hypertension",
    visitedDate: "2023-08-22", // Replace with the actual visited date
  },
  {
    name: "Eva Brown",
    condition: "Asthma",
    visitedDate: "2023-09-30", // Replace with the actual visited date
  },
  {
    name: "Jane Doe",
    condition: "Migraine",
    visitedDate: "2023-10-15", // Replace with the actual visited date
  },
];


export function PatientRecords() {
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
            <Button size={"sm"}>Add Record</Button>
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


