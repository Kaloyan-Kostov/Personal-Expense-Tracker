import { useEffect, useState } from "react";
import "./App.css";
import { MdArrowForward, MdDeleteForever } from "react-icons/md";

export default function App() {
  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState("");
  const [submittedData, setSubmittedData] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const totalExpenses = submittedData.reduce(
    (total, item) => total + Number(item.amount),
    0
  );
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("expenses")) || [];
    setSubmittedData(storedData);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (charge && amount) {
      const newEntry = { charge, amount };

      const updatedData = [newEntry, ...submittedData];
      setSubmittedData(updatedData);

      localStorage.setItem("expenses", JSON.stringify(updatedData));
      setCharge("");
      setAmount("");
      setSubmitted(false);
    }
  };

  const handleRemove = (index) => {
    const updatedData = submittedData.filter((_, i) => i !== index);
    setSubmittedData(updatedData);
    localStorage.setItem("expenses", JSON.stringify(updatedData));
  };

  const handleRemoveAll = () => {
    setSubmittedData([]);
    localStorage.removeItem("expenses");
  };

  return (
    <div>
      <div className="rounded-[12px] py-6 px-6 border">
        <h1 className="text-2xl font-light italic text-center text-slate-900">
          Personal
          <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-blue-500 before:rounded-[7px] before:hover:skew-y-3 before:transition relative inline-block mx-2">
            <span className="relative text-white font-normal">Expense</span>
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
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-light leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-red-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-red-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-red-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Charge
                </label>
              </div>
            </div>

            <div className="flex flex-col items-start">
              <div className="relative w-full h-12 min-w-[70px]">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (
                      value === "" ||
                      (value.length <= 6 &&
                        (!value.startsWith("0") || value === "0") &&
                        Number(value) <= 999999)
                    ) {
                      setAmount(value);
                    }
                  }}
                  max="999999"
                  className="peer h-full min-h-[50px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all focus:border-2 focus:border-red-500 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=""
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-light leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-red-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-red-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-red-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 ">
                  Amount
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="border rounded-[7px] px-4 py-2.5 hover:scale-105 hover:outline-none hover:ring hover:ring-green-500 transition-all font-light inline-flex group"
            >
              <span className="text-black group-hover:text-black">Submit</span>{" "}
              <MdArrowForward className="text-[24px] group-hover:text-green-600" />
            </button>
          </section>
        </form>

        <div className="mt-5 text-lg font-semibold">
          {submittedData.length > 0 ? (
            submittedData.map((data, index) => (
              <div
                key={index}
                className="border rounded-[7px] px-2 py-4 mt-2 flex justify-between items-center"
              >
                <div className="font-light">{data.charge} </div>

                <div className="flex gap-80">
                  <div className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-blue-500 before:rounded-[7px] before:hover:skew-y-3 before:transition relative mx-2 ">
                    <span className="relative text-white font-medium">
                      {data.amount} BGN
                    </span>
                  </div>
                  <button
                    onClick={() => handleRemove(index)}
                    className="text-[30px] hover:text-red-600 hover:scale-110 transition"
                  >
                    <MdDeleteForever />
                  </button>
                </div>
              </div>
            ))
          ) : submitted ? (
            <span className="text-red-500">There are no expenses</span>
          ) : null}

          {submittedData.length > 0 && (
            <button
              onClick={handleRemoveAll}
              className="border rounded-[7px] px-6 py-2 hover:scale-105 hover:ring hover:ring-red-500 transition-all font-light mt-4 inline-flex gap-3 group"
            >
              <span className="text-black group-hover:text-black">
                {submittedData.length === 1
                  ? "Clear Expense"
                  : "Clear Expenses"}
              </span>
              <MdDeleteForever className="text-[28px] text-gray-800 group-hover:text-red-500 transition-colors" />
            </button>
          )}
        </div>
      </div>
      {submittedData.length > 0 && (
        <div className="mt-4 font-light text-[40px] ">
          Total Spending:
          <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-blue-500 before:rounded-[7px] before:hover:skew-y-3 before:transition relative mx-2">
            <span className="relative text-white font-medium">
              {totalExpenses} BGN
            </span>
          </span>
        </div>
      )}
    </div>
  );
}
