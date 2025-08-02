import React, { useState } from 'react';
import { MdOutlinePayment } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

export default function DynamicForm() {
  const navigate = useNavigate();
  const [fields, setFields] = useState([
    { firstName: '', middleName: '', lastName: '', age: '', email: '' },
  ]);

  const handleAdd = () => {
    if (fields.length < 6) {
      setFields([
        ...fields,
        { firstName: '', middleName: '', lastName: '', age: '', email: '' },
      ]);
    }
  };

  const handleChange = (index, field, value) => {
    const updated = [...fields];
    updated[index][field] = value;
    setFields(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/book", { state: fields });
  };

  return (
    <section className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white rounded-xl shadow-md p-6 space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">Participant Details</h2>

        {fields.map((field, idx) => (
          <div key={idx} className="space-y-4 border-b border-black pb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input type="text" placeholder="First Name" required
                value={field.firstName}
                onChange={(e) => handleChange(idx, 'firstName', e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
              />
              <input type="text" placeholder="Middle Name"
                value={field.middleName}
                onChange={(e) => handleChange(idx, 'middleName', e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
              />
              <input type="text" placeholder="Last Name" required
                value={field.lastName}
                onChange={(e) => handleChange(idx, 'lastName', e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="tel" placeholder="Age" required
                value={field.age}
                onChange={(e) => handleChange(idx, 'age', e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
              />
              <input type="email" placeholder="Email" required
                value={field.email}
                onChange={(e) => handleChange(idx, 'email', e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
          </div>
        ))}

        {fields.length < 6 && (
          <button type="button" onClick={handleAdd} className="w-full md:w-auto bg-indigo-600 text-white font-medium px-6 py-2 rounded-md hover:bg-indigo-700">
            + Add Participant
          </button>
        )}

        <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-md shadow flex items-center justify-center gap-2">
          <MdOutlinePayment className="text-xl" />
          Make Payment
        </button>
      </form>
    </section>
  );
}
