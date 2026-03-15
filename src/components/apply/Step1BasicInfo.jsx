import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";

const countries = [
  "Philippines",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Japan",
  "Singapore",
];

export default function Step1BasicInfo({ onNext }) {
  const [form, setForm] = useState({
    firstName: "",
    surname: "",
    email: "",
    birthday: "",
    mobile: "",
    gender: "Male",
    address: "",
    city: "",
    country: "Philippines",
    sssNumber: "",
  });

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="bg-white border border-border rounded-2xl p-8 max-w-[860px]">
      {/* Header */}
      <h2 className="font-jakarta font-bold text-black text-lg mb-1">
        Basic Information
      </h2>
      <p className="text-sm text-zinc-400 mb-8">
        Please provide all the required information
      </p>

      <div className="flex flex-col gap-6">
        {/* First Name + Surname */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-black">
              First Name <span className="text-primary">*</span>
            </label>
            <input
              placeholder="Juan"
              value={form.firstName}
              onChange={(e) => set("firstName", e.target.value)}
              className="border border-border rounded-xl px-4 py-2.5 text-sm placeholder-zinc-300 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-black">
              Surname <span className="text-primary">*</span>
            </label>
            <input
              placeholder="Dela Cruz"
              value={form.surname}
              onChange={(e) => set("surname", e.target.value)}
              className="border border-border rounded-xl px-4 py-2.5 text-sm placeholder-zinc-300 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-black">
            Email Address <span className="text-primary">*</span>
          </label>
          <input
            type="email"
            placeholder="juandelacruz@gmail.com"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            className="border border-border rounded-xl px-4 py-2.5 text-sm placeholder-zinc-300 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
          />
        </div>

        {/* Birthday + Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-black">
              Birthday <span className="text-primary">*</span>
            </label>
            <input
              type="date"
              value={form.birthday}
              onChange={(e) => set("birthday", e.target.value)}
              className="border border-border rounded-xl px-4 py-2.5 text-sm text-zinc-400 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-black">
              Mobile Number <span className="text-primary">*</span>
            </label>
            <div className="flex items-center border border-border rounded-xl overflow-hidden focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all">
              <span className="px-3 py-2.5 text-sm font-medium text-black border-r border-border bg-zinc-50">
                +63
              </span>
              <input
                placeholder="912 345 6789"
                value={form.mobile}
                onChange={(e) => set("mobile", e.target.value)}
                className="flex-1 px-4 py-2.5 text-sm placeholder-zinc-300 outline-none bg-transparent"
              />
            </div>
          </div>
        </div>

        {/* Gender */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-black">
            Gender <span className="text-primary">*</span>
          </label>
          <div className="flex items-center gap-6">
            {["Male", "Female", "Other"].map((g) => (
              <label key={g} className="flex items-center gap-2 cursor-pointer">
                <div
                  onClick={() => set("gender", g)}
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer
                    ${form.gender === g ? "border-primary" : "border-zinc-300"}`}
                >
                  {form.gender === g && (
                    <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                  )}
                </div>
                <span className="text-sm text-black">{g}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Address */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-black">
            Address <span className="text-primary">*</span>
          </label>
          <input
            placeholder="Street, Barangay"
            value={form.address}
            onChange={(e) => set("address", e.target.value)}
            className="border border-border rounded-xl px-4 py-2.5 text-sm placeholder-zinc-300 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
          />
        </div>

        {/* City + Country */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-black">
              City <span className="text-primary">*</span>
            </label>
            <input
              placeholder="Quezon City"
              value={form.city}
              onChange={(e) => set("city", e.target.value)}
              className="border border-border rounded-xl px-4 py-2.5 text-sm placeholder-zinc-300 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-black">
              Country <span className="text-primary">*</span>
            </label>
            <div className="relative">
              <select
                value={form.country}
                onChange={(e) => set("country", e.target.value)}
                className="w-full appearance-none border border-border rounded-xl px-4 py-2.5 text-sm text-black outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all cursor-pointer pr-10"
              >
                {countries.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <CaretDown
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* SSS Number */}
        <div className="flex flex-col gap-1.5 max-w-xs">
          <label className="text-sm font-medium text-black">
            SSS Number <span className="text-primary">*</span>
          </label>
          <input
            placeholder="XX-XXXXXXX-X"
            value={form.sssNumber}
            onChange={(e) => set("sssNumber", e.target.value)}
            className="border border-border rounded-xl px-4 py-2.5 text-sm placeholder-zinc-300 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
          />
        </div>

        {/* Next button */}
        <div className="flex justify-end mt-2">
          <button
            onClick={onNext}
            className="gradient-bg hover:opacity-90 text-white font-semibold font-jakarta text-sm px-8 py-3 rounded-full flex items-center gap-2 transition-opacity"
          >
            Next: Assessment Test
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
