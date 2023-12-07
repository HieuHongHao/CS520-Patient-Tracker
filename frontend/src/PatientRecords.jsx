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
  DialogClose,
  DialogFooter,
} from "./components/Diaglog";
import { Input } from "./components/Input";
import { Textarea } from "./components/Textarea";
import { DatePicker } from "./components/DatePicker";
import { DataTable } from "./components/DataTable";
import { Button } from "./components/button";
import { useState } from "react";
import { cloneDeep } from "lodash";

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
    visitedDate: "2023-01-01", 
    ID: "1",
  },
  {
    name: "Bob Johnson",
    condition: "Arthritis",
    visitedDate: "2023-02-15", 
    ID: "2",
  },
  {
    name: "Alice Smith",
    condition: "Hypertension",
    visitedDate: "2023-03-10",
    ID: "3",
  },
  {
    name: "John Doe",
    condition: "Asthma",
    visitedDate: "2023-04-20", 
    ID: "4",
  },
  {
    name: "Eva Brown",
    condition: "Migraine",
    visitedDate: "2023-05-05", 
    ID: "5",
  },
  {
    name: "Bob Johnson",
    condition: "Diabetes",
    visitedDate: "2023-06-12", 
    ID: "6",
  },
  {
    name: "Alice Smith",
    condition: "Arthritis",
    visitedDate: "2023-07-18", 
    ID: "7",
  },
  {
    name: "John Doe",
    condition: "Hypertension",
    visitedDate: "2023-08-22", // Replace with the actual visited date
    ID: "8",
  },
  {
    name: "Eva Brown",
    condition: "Asthma",
    visitedDate: "2023-09-30", // Replace with the actual visited date
    ID: 9,
  },
  {
    name: "Jane Doe",
    condition: "Migraine",
    visitedDate: "2023-10-15", // Replace with the actual visited date
    ID: 10,
  },
];

export function PatientRecords() {
  const [records, setRecords] = useState(cloneDeep(patientsData));

  return (
    <div className="mt-5 mr-5">
      <div className="flex flex-row">
        <input
          type="text"
          className="bg-white w-1/2 rounded-md h-8 placeholder-slate-500 px-3 mt-3 ml-1 mb-5 ring-1 ring-slate-700/20"
          placeholder="Search patient"
        />

        <AddMedicalRecordForm setRecords={setRecords} records={records}/>
      </div>

      <DataTable columns={columns} data={records} />
    </div>
  );
}

function AddMedicalRecordForm({records,setRecords}) {
  const [newRecord, setNewRecord] = useState({
    condition: "",
    ID: "",
  });
  const [date, setDate] = useState("");
  const [open, setOpen] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(newRecord);
    if (date) {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
      const day = date.getDate().toString().padStart(2, "0");

      const formattedDate = `${year}-${month}-${day}`;
      const patient = records.find(record => record.ID === newRecord.ID);
      setRecords(prevRecords => {
        return [...prevRecords, {
          ID: newRecord.ID,
          condition: newRecord.condition,
          name: patient.name,
          visitedDate: formattedDate
        }]
      })
      
    }
  setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="ml-5 mb-3">
        <Button size={"sm"}>Add medical record</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">Medical Record</DialogTitle>
          <DialogDescription>
            <div className="flex flex-col">
              <div className="text-[0.8125rem] text-foreground mt-3 font-semibold">
                Patient Id
              </div>
              <Input
                placeholder="Enter the patient id"
                className="mt-2"
                onChange={(e) => {
                  setNewRecord((prev) => {
                    return { ...prev, ID: e.target.value };
                  });
                }}
              />
              <div className="text-[0.8125rem] text-foreground mt-3 font-semibold">
                Condition
              </div>
              <Input
                placeholder="Summary of patient condition"
                className="mt-2"
                onChange={(e) => {
                  setNewRecord((prev) => {
                    return { ...prev, condition: e.target.value };
                  });
                }}
              />
              <div className="text-[0.8125rem] text-foreground mt-3 font-semibold">
                Description
              </div>
              <Textarea
                placeholder="Type checkup decription in detail here"
                className="mt-2 h-52"
              />
              <div className="text-[0.8125rem] text-foreground mt-3 font-semibold mb-2">
                Visited Date
              </div>
              <DatePicker date={date} setDate={setDate} />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            size={"lg"}
            className="mt-5 w-max ml-auto mr-auto"
            onClick={handleSubmit}
            type="button"
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
