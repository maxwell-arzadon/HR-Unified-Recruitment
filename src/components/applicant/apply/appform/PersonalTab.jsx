/**
 * PersonalTab.jsx
 * Personal information tab within the application form.
 * Collects name, birthday, gender, nationality, address,
 * and contact details with inline field validation.
 */

import { useState } from "react";
import { CaretDown, WarningCircle } from "@phosphor-icons/react";

const nationalities = [
  "Filipino",
  "American",
  "British",
  "Canadian",
  "Australian",
  "Japanese",
  "Singaporean",
];
const countries = [
  "Philippines",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Japan",
  "Singapore",
];
const maritalStatus = ["Single", "Married", "Divorced", "Widowed"];

const FieldError = ({ msg }) =>
  msg ? (
    <div className="flex items-center gap-1.5 mt-1">
      <WarningCircle size={13} className="text-primary flex-shrink-0" />
      <span className="text-xs text-primary">{msg}</span>
    </div>
  ) : null;

const inputClass = (error) =>
  `border rounded-xl px-4 py-2.5 text-sm placeholder-zinc-300 outline-none transition-all w-full
  ${error ? "border-primary bg-red-50" : "border-border focus:border-primary focus:ring-2 focus:ring-primary/10"}`;

export default function PersonalTab() {
  const [form, setForm] = useState({
    firstName: "",
    surname: "",
    birthday: "",
    maritalStatus: "",
    gender: "Male",
    nationality: "Filipino",
    motherMaidenName: "",
    address: "",
    city: "",
    country: "Philippines",
    mobile: "",
    email: "",
    telegramUsername: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const validate = (f) => {
    const e = {};
    if (!f.firstName.trim()) e.firstName = "Required";
    if (!f.surname.trim()) e.surname = "Required";
    if (!f.birthday) e.birthday = "Required";
    if (!f.maritalStatus) e.maritalStatus = "Required";
    if (!f.address.trim()) e.address = "Required";
    if (!f.city.trim()) e.city = "Required";
    if (!f.mobile.trim()) e.mobile = "Required";
    if (!f.email.trim()) e.email = "Required";
    else if (!/\S+@\S+\.\S+/.test(f.email)) e.email = "Invalid email";
    return e;
  };

  const handleBlur = (k) => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validate(form));
  };

  const err = (k) => (touched[k] ? errors[k] : undefined);

  return (
    <div>
      <h3 className="font-jakarta font-bold text-black text-base mb-1">
        Personal Information
      </h3>
      <p className="text-sm text-zinc-400 mb-6">
        Basic personal and contact details.
      </p>

      <div className="flex flex-col gap-5">
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

        {/* Birthday + Marital Status */}
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
              Marital Status <span className="text-primary">*</span>
            </label>
            <div className="relative">
              <select
                value={form.maritalStatus}
                onChange={(e) => set("maritalStatus", e.target.value)}
                onBlur={() => handleBlur("maritalStatus")}
                className={`appearance-none pr-10 ${inputClass(err("maritalStatus"))}`}
              >
                <option value="">Select</option>
                {maritalStatus.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <CaretDown
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
              />
            </div>
            <FieldError msg={err("maritalStatus")} />
          </div>
        </div>

        {/* Gender */}
        <div>
          <label className="text-sm font-medium text-black">
            Gender <span className="text-primary">*</span>
          </label>
          <div className="flex items-center flex-wrap gap-x-4 gap-y-2 mt-2">
            {["Male", "Female", "Other"].map((g) => (
              <label key={g} className="flex items-center gap-2 cursor-pointer">
                <div
                  onClick={() => set("gender", g)}
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all ${form.gender === g ? "border-primary" : "border-zinc-300"}`}
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

        {/* Nationality + Mother's Maiden Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-black">
              Nationality <span className="text-primary">*</span>
            </label>
            <div className="relative">
              <select
                value={form.nationality}
                onChange={(e) => set("nationality", e.target.value)}
                className="appearance-none pr-10 border border-border rounded-xl px-4 py-2.5 text-sm text-black outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all w-full cursor-pointer"
              >
                {nationalities.map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>
              <CaretDown
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-black">
              Mother's Maiden Name
            </label>
            <input
              placeholder="Maria Santos"
              value={form.motherMaidenName}
              onChange={(e) => set("motherMaidenName", e.target.value)}
              className={inputClass(false)}
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="text-sm font-medium text-black">
            Home Address <span className="text-primary">*</span>
          </label>
          <input
            placeholder="Street, Barangay, City"
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
                className="appearance-none pr-10 border border-border rounded-xl px-4 py-2.5 text-sm text-black outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all w-full cursor-pointer"
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

        {/* Mobile + Email + telegram */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-black">
              Mobile Number <span className="text-primary">*</span>
            </label>
            <div
              className={`flex items-center border rounded-xl overflow-hidden transition-all ${err("mobile") ? "border-primary bg-red-50" : "border-border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10"}`}
            >
              <span className="px-3 py-2.5 text-sm font-medium text-black border-r border-border bg-zinc-50 flex-shrink-0">
                +63
              </span>
              <input
                placeholder="912 345 6789"
                value={form.mobile}
                onChange={(e) => set("mobile", e.target.value)}
                onBlur={() => handleBlur("mobile")}
                className="flex-1 px-3 py-2.5 text-sm placeholder-zinc-300 outline-none bg-transparent"
              />
            </div>
            <FieldError msg={err("mobile")} />
          </div>
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
          <div>
            <label className="text-sm font-medium text-black">
              Telegram Username
            </label>
            <input
              placeholder="@juandelacruz"
              value={form.telegramUsername}
              onChange={(e) => set("telegramUsername", e.target.value)}
              onBlur={() => handleBlur("telegramUsername")}
              className={inputClass(err("telegramUsername"))}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
