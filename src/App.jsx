import { useState } from "react";
import "./App.css";

export default function App() {
  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState("");

  const [submittedData, setSubmittedData] = useState([]);

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (charge && amount) {
      setSubmittedData([{ charge, amount }, ...submittedData]);
    }

    setCharge("");
    setAmount("");
  };

  return (
    <div className="rounded-[12px] py-6 px-6 border">
      <h1 className="text-2xl font-semibold italic text-center text-slate-900">
        Personal
        <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-blue-500 before:rounded-[7px] before:hover:skew-y-3 before:transition relative inline-block mx-2">
          <span className="relative text-white">Expense</span>
        </span>
        Tracker{" "}
      </h1>

      <form onSubmit={handleSubmit}>
        <section className="flex justify-evenly mt-6">
          <div className="flex flex-col items-start">
            <div className="relative w-full h-12 min-w-[70px]">
              <textarea
                value={charge}
                onChange={(e) => setCharge(e.target.value)}
                className="peer h-full min-h-[50px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-red-500 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=""
              ></textarea>
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-red-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-red-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-red-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Charge
              </label>
            </div>
          </div>

          <div className="flex flex-col items-start">
            <div className="relative w-full h-12 min-w-[70px]">
              <textarea
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="peer h-full min-h-[50px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all focus:border-2 focus:border-red-500 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=""
              ></textarea>
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-red-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-red-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-red-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Amount
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="border rounded-[7px] px-4 hover:scale-105 focus:outline-none focus:ring focus:ring-green-500 transition-all"
          >
            Submit
          </button>
        </section>
      </form>

      {submitted && (
        <div className="mt-5 text-lg font-semibold">
          {submittedData.length > 0 ? (
            submittedData.map((data, index) => (
              <div key={index} className="border rounded-[7px] px-2 py-2 mt-2">
                <span className="flex justify-evenly">
                  {data.charge}{" "}
                  <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-blue-500 before:rounded-[7px] before:hover:skew-y-3 before:transition relative inline-block mx-2">
                    <span className="relative text-white">
                      {data.amount} BGN
                    </span>
                  </span>
                </span>
              </div>
            ))
          ) : (
            <span className="text-red-500">Please add an expense first.</span>
          )}
        </div>
      )}
    </div>
  );
}
