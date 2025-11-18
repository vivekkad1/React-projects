export default function BookForm() {
  return (
    <section
      id="book"
      className="bg-[#f2e9e4] mt-8 md:mt-10 px-4 py-8 md:py-12 rounded-xl shadow-sm scroll-mt-25"
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl text-center mb-6">
        Book Table
      </h2>
      <div className="flex justify-center">
        <form className="w-full max-w-2xl space-y-4 px-2">
          <div>
            <label className="block text-base md:text-lg">Name</label>
            <input
              className="w-full mt-2 p-3 rounded-xl border border-gray-300 focus:outline-none focus:border-gray-700 transition-colors duration-150"
              type="text"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-base md:text-lg">Phone Number</label>
            <input
              className="w-full mt-2 p-3 rounded-xl border border-gray-300 focus:outline-none focus:border-gray-700 transition-colors duration-150"
              type="tel"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className="block text-base md:text-lg">Email</label>
            <input
              className="w-full mt-2 p-3 rounded-xl border border-gray-300 focus:outline-none focus:border-gray-700 transition-colors duration-150"
              type="email"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-base md:text-lg">No. of People</label>
            <input
              className="w-full mt-2 p-3 rounded-xl border border-gray-300 focus:outline-none focus:border-gray-700 transition-colors duration-150"
              type="number"
              placeholder="Enter no. of people"
            />
          </div>

          <div className="flex justify-center">
            <button className="bg-black text-white px-6 py-3 rounded-xl cursor-pointer">
              Book
            </button>
          </div>
        </form>
      </div>

      <p className="mt-6 text-center text-base md:text-lg">
        You will receive the details of your booking through email and phone
        number.
      </p>
    </section>
  );
}
