// components/Calendar.js
import React, { useState } from "react";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const renderCalendar = () => {
    // Add your logic to dynamically render the calendar here
    // You can use the currentMonth state to determine the month
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded p-4 shadow">
      {/* Calendar Header */}
      <div className="mb-4">
        <button
          className="text-blue-500 font-bold"
          onClick={() =>
            setCurrentMonth(
              new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
            )
          }
        >
          &lt; Previous Month
        </button>
        <h2 className="text-xl font-bold">
          {new Intl.DateTimeFormat("en-US", {
            month: "long",
            year: "numeric",
          }).format(currentMonth)}
        </h2>
        <button
          className="text-blue-500 font-bold"
          onClick={() =>
            setCurrentMonth(
              new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
            )
          }
        >
          Next Month &gt;
        </button>
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-2">
        {/* Days of the week headers */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center font-bold text-gray-600">
            {day}
          </div>
        ))}

        {/* Render the calendar days */}
        {renderCalendar()}
      </div>
    </div>
  );
};

export default Calendar;
