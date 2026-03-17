import { useState } from "react";
import { CaretDown, WarningCircle } from "@phosphor-icons/react";
import { ArrowRight } from "@phosphor-icons/react";

const countries = [
  "Philippines",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Japan",
  "Singapore",
];

const validate = (form) => {
  const errors = {};
  if (!form.firstName.trim()) errors.firstName = "First name is required";
  if (!form.surname.trim()) errors.surname = "Surname is required";
  if (!form.email.trim()) errors.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(form.email))
    errors.email = "Enter a valid email address";
  if (!form.birthday) errors.birthday = "Birthday is required";
  if (!form.mobile.trim()) errors.mobile = "Mobile number is required";
  else if (!/^\d{10}$/.test(form.mobile.replace(/\s/g, "")))
    errors.mobile = "Enter a valid 10-digit number";
  if (!form.address.trim()) errors.address = "Address is required";
  if (!form.city.trim()) errors.city = "City is required";
  if (!form.sssNumber.trim()) errors.sssNumber = "SSS number is required";
  else if (!/^\d{2}-\d{7}-\d$/.test(form.sssNumber))
    errors.sssNumber = "Format: XX-XXXXXXX-X";
  return errors;
};

// Error message component
const FieldError = ({ msg }) =>
  msg ? (
    <div className="flex items-center gap-1.5 mt-1">
      <WarningCircle size={13} className="text-primary flex-shrink-0" />
      <span className="text-xs text-primary">{msg}</span>
    </div>
  ) : null;

// Input class helper
const inputClass = (error) =>
  `border rounded-xl px-4 py-2.5 text-sm placeholder-zinc-300 outline-none transition-all w-full
  ${
    error
      ? "border-primary bg-red-50 focus:border-primary focus:ring-2 focus:ring-primary/10"
      : "border-border focus:border-primary focus:ring-2 focus:ring-primary/10"
  }`;

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
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const touch = (k) => setTouched((t) => ({ ...t, [k]: true }));

  const handleNext = () => {
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      // Mark all as touched to show all errors
      const allTouched = Object.keys(form).reduce(
        (a, k) => ({ ...a, [k]: true }),
        {},
      );
      setTouched(allTouched);
      return;
    }
    onNext();
  };

  // Validate on blur
  const handleBlur = (k) => {
    touch(k);
    const errs = validate(form);
    setErrors(errs);
  };

  const err = (k) => (touched[k] ? errors[k] : undefined);

  return (
    <div className="bg-white border border-border rounded-2xl p-8 max-w-[860px]">
      <h2 className="font-jakarta font-bold text-black text-lg mb-1">
        Basic Information
      </h2>
      <p className="text-sm text-zinc-400 mb-8">
        Please provide all the required information
      </p>

      <div className="flex flex-col gap-6">
        {/* First Name + Surname */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-black">
              First Name <span className="text-primary">*</span>
            </label>
            <input
              placeholder="Juan"
              value={form.firstName}
              onChange={(e) => set("firstName", e.target.value)}
              onBlur={() => handleBlur("firstName")}
              className={inputClass(err("firstName"))}
            />
            <FieldError msg={err("firstName")} />
          </div>
          <div>
            <label className="text-sm font-medium text-black">
              Surname <span className="text-primary">*</span>
            </label>
            <input
              placeholder="Dela Cruz"
              value={form.surname}
              onChange={(e) => set("surname", e.target.value)}
              onBlur={() => handleBlur("surname")}
              className={inputClass(err("surname"))}
            />
            <FieldError msg={err("surname")} />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-medium text-black">
            Email Address <span className="text-primary">*</span>
          </label>
          <input
            type="email"
            placeholder="juandelacruz@gmail.com"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            className={inputClass(err("email"))}
          />
          <FieldError msg={err("email")} />
        </div>

        {/* Birthday + Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-black">
              Birthday <span className="text-primary">*</span>
            </label>
            <input
              type="date"
              value={form.birthday}
              onChange={(e) => set("birthday", e.target.value)}
              onBlur={() => handleBlur("birthday")}
              className={inputClass(err("birthday"))}
            />
            <FieldError msg={err("birthday")} />
          </div>
          <div>
            <label className="text-sm font-medium text-black">
              Mobile Number <span className="text-primary">*</span>
            </label>
            <div
              className={`flex items-center border rounded-xl overflow-hidden transition-all
              ${err("mobile") ? "border-primary bg-red-50" : "border-border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10"}`}
            >
              <span className="px-3 py-2.5 text-sm font-medium text-black border-r border-border bg-zinc-50 flex-shrink-0">
                +63
              </span>
              <input
                placeholder="912 345 6789"
                value={form.mobile}
                onChange={(e) => set("mobile", e.target.value)}
                onBlur={() => handleBlur("mobile")}
                className="flex-1 px-4 py-2.5 text-sm placeholder-zinc-300 outline-none bg-transparent"
              />
            </div>
            <FieldError msg={err("mobile")} />
          </div>
        </div>

        {/* Gender */}
        <div>
          <label className="text-sm font-medium text-black">
            Gender <span className="text-primary">*</span>
          </label>
          <div className="flex items-center flex-wrap gap-x-4 gap-y-2 mt-2">
            {" "}
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
        <div>
          <label className="text-sm font-medium text-black">
            Address <span className="text-primary">*</span>
          </label>
          <input
            placeholder="Street, Barangay"
            value={form.address}
            onChange={(e) => set("address", e.target.value)}
            onBlur={() => handleBlur("address")}
            className={inputClass(err("address"))}
          />
          <FieldError msg={err("address")} />
        </div>

        {/* City + Country */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-black">
              City <span className="text-primary">*</span>
            </label>
            <input
              placeholder="Quezon City"
              value={form.city}
              onChange={(e) => set("city", e.target.value)}
              onBlur={() => handleBlur("city")}
              className={inputClass(err("city"))}
            />
            <FieldError msg={err("city")} />
          </div>
          <div>
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
        <div className="max-w-xs">
          <label className="text-sm font-medium text-black">
            SSS Number <span className="text-primary">*</span>
          </label>
          <input
            placeholder="XX-XXXXXXX-X"
            value={form.sssNumber}
            onChange={(e) => set("sssNumber", e.target.value)}
            onBlur={() => handleBlur("sssNumber")}
            className={inputClass(err("sssNumber"))}
          />
          <FieldError msg={err("sssNumber")} />
        </div>

        {/* Next button */}
        <div className="flex justify-end mt-2">
          <button
            onClick={handleNext}
            className="w-full justify-center gradient-bg hover:opacity-90 text-white font-semibold font-jakarta text-sm px-8 py-3 rounded-full flex items-center gap-2 transition-opacity"
          >
            Next: Assessment Test
            <ArrowRight size={16} weight="bold" className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
