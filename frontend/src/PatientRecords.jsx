export function PatientRecords() {
  return (
    <div className="flex flex-col max-h-max overflow-auto">
      <input
        type="text"
        className="bg-white w-1/2 rounded-md h-8 placeholder-slate-500 px-3 mt-3 ml-1 mb-5 ring-1 ring-slate-700/20"
        placeholder="Search patient"
      />
      <Patient />
      <div className="h-1 border-b border-b-slate-200 ml-4 mr-6 mt-2"></div>

      <Patient />
      <div className="h-1 border-b border-b-slate-200 ml-4 mr-6 mt-2"></div>
      <Patient />
      <div className="h-1 border-b border-b-slate-200 ml-4 mr-6 mt-2"></div>
      <Patient />
      <div className="h-1 border-b border-b-slate-200 ml-4 mr-6 mt-2"></div>
      <Patient />
    </div>
  );
}

const condtions = ["Cancer", "Diabetes"];

function Patient() {
  return (
    <div className="flex flex-row mt-5 ">
      <div className="w-8 ml-1">
        <img
          src={`https://i.pravatar.cc/300`}
          className="w-8 h-8 ml-1 mt-2 rounded-full"
        />
      </div>
      <div className="flex flex-col ml-5">
        <div className="font-medium text-sm mt-1 ">Patient Name</div>
        <div className="text-[0.8125rem] text-slate-600 mt-0">
          patient@gmail.com
        </div>
      </div>
      <div className="flex flex-col space-x-1 text-sm mt-1 ml-20">
        <div className="font-semibold">Age</div>
        <div>45</div>
      </div>
      <div className="flex flex-col space-x-1 text-sm mt-1 ml-20">
        <div className="font-semibold ">Condition</div>
        <div>{condtions[Math.floor(Math.random() * 2)]}</div>
      </div>
      <div className="ml-auto mr-12 mt-2">
        <button className="text-sm font-semibold">View Record</button>
      </div>
    </div>
  );
}
