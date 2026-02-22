import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { lazy } from "react";

const Home = lazy(() => import("./pages/Home"));
const SearchResults = lazy(() => import("./pages/SearchResults"));
const BookingPage = lazy(() => import("./pages/BookingPage"));
const Offers = lazy(() => import("./pages/Offers"));

const LoadingFallback = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
    <div className="relative w-12 h-12">
      <div className="absolute inset-0 border-4 border-blue-100 rounded-full" />
      <div className="absolute inset-0 border-4 border-transparent border-t-blue-600 rounded-full animate-spin" />
    </div>
    <span className="text-sm text-slate-400 font-medium animate-pulse">
      Loading...
    </span>
  </div>
);

const AppContent = () => {
  return (
    <div className="font-sans text-slate-900 bg-white selection:bg-blue-100 flex flex-col min-h-screen overflow-x-hidden">
      <Header />
      <main className="grow">
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/offers" element={<Offers />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}
