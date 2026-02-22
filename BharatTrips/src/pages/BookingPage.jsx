import { useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowBack, CheckCircle, Lock } from "@mui/icons-material";

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingDetails = location.state || {};
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setIsConfirmed(true);
  }, []);

  if (isConfirmed) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            Booking Confirmed
          </h2>
          <p className="text-slate-500 text-sm mb-6">
            Thanks, {formData.firstName}. Confirmation sent to {formData.email}.
          </p>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-slate-500 hover:text-slate-700 mb-6 transition-colors text-sm font-medium"
        >
          <ArrowBack className="w-4 h-4 mr-1.5" /> Back to Results
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
              <h2 className="text-lg font-bold text-slate-900 mb-6">
                Traveller Details
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1.5">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1.5">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                    placeholder="john@example.com"
                  />
                  <p className="text-xs text-slate-400 mt-1">
                    Your ticket will be sent here
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">
                    Mobile
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                    placeholder="9876543210"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 mt-2"
                >
                  <Lock className="w-4 h-4" /> Confirm Booking
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-6">
              <h3 className="font-bold text-slate-800 text-sm mb-4 pb-3 border-b border-slate-100">
                Booking Summary
              </h3>

              {bookingDetails.price ? (
                <div className="space-y-3 text-sm">
                  {bookingDetails.airline && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Airline</span>
                      <span className="font-semibold text-slate-800">
                        {bookingDetails.airline}
                      </span>
                    </div>
                  )}
                  {bookingDetails.operator && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Operator</span>
                      <span className="font-semibold text-slate-800">
                        {bookingDetails.operator}
                      </span>
                    </div>
                  )}
                  {bookingDetails.name && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Property</span>
                      <span className="font-semibold text-slate-800">
                        {bookingDetails.name}
                      </span>
                    </div>
                  )}
                  {bookingDetails.seats && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Seats</span>
                      <span className="font-semibold text-slate-800">
                        {bookingDetails.seats.join(", ")}
                      </span>
                    </div>
                  )}
                  {bookingDetails.departureTime && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Departure</span>
                      <span className="font-semibold text-slate-800">
                        {bookingDetails.departureTime}
                      </span>
                    </div>
                  )}
                  {bookingDetails.arrivalTime && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Arrival</span>
                      <span className="font-semibold text-slate-800">
                        {bookingDetails.arrivalTime}
                      </span>
                    </div>
                  )}

                  <div className="border-t border-dashed border-slate-200 pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-800">Total</span>
                      <span className="text-lg font-bold text-blue-600">
                        ₹{bookingDetails.price?.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 text-right mt-0.5">
                      Inclusive of taxes
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-slate-400 text-sm">No booking details.</p>
                  <button
                    onClick={() => navigate("/")}
                    className="mt-3 text-blue-600 font-medium text-sm hover:underline"
                  >
                    Search for travel →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
