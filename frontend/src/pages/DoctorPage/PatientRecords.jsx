import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "../../components/Diaglog";
import { Input } from "../../components/Input";
import { Textarea } from "../../components/Textarea";
import { DatePicker } from "../../components/DatePicker";
import { DataTable } from "../../components/DataTable";
import { Button } from "../../components/button";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "../../components/card";
import { Badge } from "../../components/Badge";
import { useState, useEffect } from "react";
import { cloneDeep } from "lodash";
import {
  addMedicalHistory,
  getAllMedicalHistories,
} from "../../api/medicalHistory";
import formatDate from "../../utils";

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
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row, table }) => {
      return (
        <Button
          variant={"ghost"}
          size={"sm"}
          onClick={() => {
            table.toggleAllRowsSelected(false);
            row.toggleSelected(true);
          }}
        >
          View Details
        </Button>
      );
    },
  },
];

export function PatientRecords() {
  const [records, setRecords] = useState([]);

  const [currentRecordView, setCurrentRecordView] = useState({});

  useEffect(() => {
    getAllMedicalHistories().then((res) => {
      const processedHistories = res.data.map((history) => {
        const originalDate = new Date(history.visitedDate);
        // Extract year, month, and day components
        const year = originalDate.getFullYear();
        const month = (originalDate.getMonth() + 1).toString().padStart(2, "0");
        const day = originalDate.getDate().toString().padStart(2, "0");

        // Create the formatted date string in "mm-dd-yyyy" format
        const formattedDateString = `${month}-${day}-${year}`;
        return {
          name: history.patientId.firstName + " " + history.patientId.lastName,
          description: history.description,
          condition: history.condition,
          visitedDate: formattedDateString,
          patientId: history.patientId._id,
        };
      });
      setRecords(cloneDeep(processedHistories));
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

        <AddMedicalRecordForm setRecords={setRecords} />
      </div>

      <DataTable
        columns={columns}
        data={records}
        rowSelection={currentRecordView}
        setRowSelection={setCurrentRecordView}
      />

      {Object.keys(currentRecordView).length === 1 && (
        <RecordDetailView record={records[Object.keys(currentRecordView)[0]]} />
      )}
    </div>
  );
}

function AddMedicalRecordForm({ setRecords }) {
  const [newRecord, setNewRecord] = useState({
    condition: "",
    patientId: "",
    description: "",
  });
  const [date, setDate] = useState("");
  const [open, setOpen] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(newRecord);
    if (date) {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
      const day = date.getDate().toString().padStart(2, "0");

      const formattedDate = `${month}-${day}-${year}`;

      const result = await addMedicalHistory({
        patientId: newRecord.patientId,
        condition: newRecord.condition,
        visitedDate: formattedDate,
        description: newRecord.description,
      });
      let newMedicalRecord = {};
      newMedicalRecord["name"] =
        result.data.patientId.firstName + " " + result.data.patientId.lastName;
      newMedicalRecord["description"] = result.data.description;
      newMedicalRecord["condition"] = result.data.condition;
      newMedicalRecord["visitedDate"] = formattedDate;
      newMedicalRecord["patientId"] = result.data.patientId._id;
      console.log(newMedicalRecord);
      setRecords((prevRecords) => {
        return [...prevRecords, newMedicalRecord];
      });
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
                    return { ...prev, patientId: e.target.value };
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
                onChange={(e) => {
                  setNewRecord((prev) => {
                    return { ...prev, description: e.target.value };
                  });
                }}
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

function RecordDetailView({ record }) {
  return (
    <Card className="p-6 mt-7">
      <CardHeader>
        <div className="flex items-center">
          <div className="ml-4">
            <CardTitle className="text-lg font-bold">{record.name}</CardTitle>
            <CardDescription className="text-gray-500">
              Medical History
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Badge className="items-center mr-2" variant="outline">
              <StethoscopeIcon className="h-3.5 w-3.5 -translate-x-1" />
              Condition
            </Badge>
            <span className="text-gray-600">{record.condition}</span>
          </div>
          <div className="flex items-center">
            <CalendarDaysIcon className="mr-2 h-4 w-4 opacity-70" />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {`Last Visit: ${formatDate(record.visitedDate)}`}
            </span>
          </div>
        </div>
        <p className="text-gray-600">
          {record.description}
        </p>
        
      </CardContent>
    </Card>
  );
}

function CalendarDaysIcon(props) {
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
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  );
}

function StethoscopeIcon(props) {
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
      <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
      <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
      <circle cx="20" cy="10" r="2" />
    </svg>
  );
}
