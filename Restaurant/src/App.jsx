import { useState } from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import BookForm from "./components/BookForm";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import food1 from "./assets/food1.jpg";
import food2 from "./assets/food2.jpg";
import restaurantImg from "./assets/restaurantimg.jpg";

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar open={open} setOpen={setOpen} />
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BookForm />
        <Menu />

        <section
          id="about"
          className="mt-10 p-6 md:p-10 bg-[#f7e1d7] rounded-lg scroll-mt-25"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-center mb-6">
            About Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <img
              src={food1}
              alt="food1"
              className="h-50 mx-auto md:h-64 lg:h-90 object-cover rounded"
            />
            <p className="text-sm md:text-lg text-center md:py-25">
              Bite and Bliss is a cherished culinary destination where tradition
              harmoniously blends with innovation. Located in the vibrant heart
              of Baat, this restaurant is renowned for its commitment to quality
              ingredients, delightful flavors, and impeccable service.
            </p>

            <p className="text-sm md:text-lg text-center md:py-25">
              Bite and Bliss, nestled in the vibrant heart of Baat, is a
              distinguished culinary destination where rich tradition merges
              seamlessly with contemporary innovation.
            </p>
            <img
              src={restaurantImg}
              alt="restaurant"
              className="h-50 mx-auto md:h-64 lg:h-90 object-cover rounded"
            />

            <img
              src={food2}
              alt="food2"
              className="h-50 mx-auto md:h-64 lg:h-90 object-cover rounded"
            />
            <p className="text-sm md:text-lg text-center md:py-25">
              Bite and Bliss is conveniently located near Panchayat Bhawan in
              Baat, making it a popular stop for locals and visitors alike. The
              restaurant offers an inviting and comfortable atmosphere with
              tastefully designed interiors that complement its vibrant and
              flavorful menu.
            </p>
          </div>
        </section>

        <section id="contact" className="mt-8 px-6 rounded-lg scroll-mt-25">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-center mb-6">
            Contact Us
          </h2>
          <div className="text-center">
            <p className="text-base md:text-lg">Phone: +91 40 1234 5678</p>
            <p className="text-base md:text-lg">Email: hello@biteandbliss.in</p>
          </div>

          <div className="w-full max-w-md mx-auto mt-6 p-4 border rounded text-center">
            <LocationOnIcon className="mx-auto text-2xl mb-2" />
            <address className="not-italic">
              Bite and Bliss, Plot No. 45, Jubilee Hills Road No. 36, Jubilee
              Hills, Hyderabad, Telangana — 500033
            </address>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
