import imgURL from "/Heal.png"

export default function Login() {
  return (
    <div className="flex flex-col h-screen">  
      <img
        src={imgURL}
        className= " w-12 h-12 object-cover rounded mt-24 self-center"
      />
      <div className="font-semibold text-slate-900 text-3xl mt-5 self-center ">
        Welcome to Patient Tracker 👋
      </div>
      <form className="self-center flex-col flex w-full mt-14 ">
        <div className="text-sm font-medium text-slate-700 self-center w-1/4">
          Email address
        </div>
        <input
          id="email"
          name="email"
          type="email"
          className="w-1/4 h-max py-1 rounded-md ring-1 ring-slate-700/25 self-center mt-1 outline-none px-2 focus:ring-2 focus:ring-sky-500"
        />

        <div className="text-slate-700 self-center w-1/4 mt-5 text-sm font-medium">
          Password
        </div>
        <input
          type="text"
          id="password"
          name="password"
          className="w-1/4 h-max py-1 rounded-md ring-1 ring-slate-700/25 self-center mt-1 outline-none px-2 focus:ring-2 focus:ring-sky-500"
        />
        <button
          type="submit"
          className="self-center w-1/4 h-max py-2 px-4 bg-black font-semibold text-white mt-10 hover:bg-slate-700 text-sm rounded-md"
        >
          Continue
        </button>
        <div className="text-[0.8125rem] self-center mt-5 flex flex-row w-1/4">
          <div className="border-t h-2 border-slate-900/20 self-center w-2/3 mt-2"></div>
          <div className="ml-1 font-medium self-center">OR</div>
          <div className="border-t h-2 border-slate-900/20 ml-2 mt-2 self-center w-2/3"></div>
        </div>
        <button
          type="submit"
          className="self-center w-1/4 h-max py-2 px-4 font-semibold rounded-md mt-5 hover:bg-slate-100 text-sm ring-1 ring-slate-700/25"
        >
          Create new account
        </button>
      </form>
    </div>
  );
}