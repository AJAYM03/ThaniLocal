import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import supabase from "../supabaseClient";

const Itinerary = () => {
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItinerary, setSelectedItinerary] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // Form state with JSONB support
  const [newItinerary, setNewItinerary] = useState({
    title: "",
    details: { places: [], duration: "" },
    category: "Adventure",
  });

  useEffect(() => {
    fetchItineraries();
  }, []);

  // Fetch itineraries from Supabase
  const fetchItineraries = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("itineraries").select("*");
    if (error) console.error("Error fetching itineraries:", error);
    else setItineraries(data);
    setLoading(false);
  };

  // Handle form input changes
  const handleChange = (e) => {
    setNewItinerary({ ...newItinerary, [e.target.name]: e.target.value });
  };

  // Handle JSONB field updates
  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setNewItinerary({
      ...newItinerary,
      details: {
        ...newItinerary.details,
        [name]: name === "places" ? value.split(", ") : value,
      },
    });
  };

  // Submit new itinerary
  async function handleSubmit(e) {
    e.preventDefault();

    const itineraryData = {
      title: newItinerary.title,
      details: newItinerary.details,
      category: newItinerary.category,
    };

    console.log("Submitting:", itineraryData);

    const { data, error } = await supabase.from("itineraries").insert([itineraryData]);

    if (error) {
      console.error("Error adding itinerary:", error);
    } else {
      console.log("Inserted successfully:", data);
      setNewItinerary({ title: "", details: { places: [], duration: "" }, category: "Adventure" });
      fetchItineraries();
    }
  }

  if (loading) return <p className="text-center text-xl mt-10">Loading itineraries...</p>;

  // Filter itineraries based on search and category
  const filteredItineraries = itineraries.filter((itinerary) => {
    return (
      itinerary.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || itinerary.category === category)
    );
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Itineraries</h1>

      {/* Submission Form */}
      <div className="mb-8 p-6 border rounded-lg shadow-md bg-white">
        <h2 className="text-2xl font-semibold mb-4">Submit an Itinerary</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newItinerary.title}
            onChange={handleChange}
            required
            className="border px-4 py-2 rounded-md"
          />
          <input
            type="text"
            name="places"
            placeholder="Enter places (comma-separated)"
            value={newItinerary.details.places.join(", ")}
            onChange={handleDetailsChange}
            required
            className="border px-4 py-2 rounded-md"
          />
          <input
            type="text"
            name="duration"
            placeholder="Duration (e.g., '3 days')"
            value={newItinerary.details.duration}
            onChange={handleDetailsChange}
            required
            className="border px-4 py-2 rounded-md"
          />
          <select
            name="category"
            value={newItinerary.category}
            onChange={handleChange}
            className="border px-4 py-2 rounded-md"
          >
            <option value="Adventure">Adventure</option>
            <option value="Cultural">Cultural</option>
            <option value="Food">Food</option>
            <option value="Exploration">Exploration</option>
            <option value="Beach">Beach</option>
            <option value="History">History</option>
            <option value="City Tour">City Tour</option>
            <option value="Getaway">Getaway</option>
          </select>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Category Filter */}
      <div className="mb-6 text-center">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-4 py-2 rounded-md w-full max-w-xs"
        >
          <option value="All">All Categories</option>
          <option value="Adventure">Adventure</option>
          <option value="Cultural">Cultural</option>
          <option value="Food">Food</option>
          <option value="Exploration">Exploration</option>
          <option value="Beach">Beach</option>
          <option value="History">History</option>
          <option value="City Tour">City Tour</option>
          <option value="Getaway">Getaway</option>
        </select>
      </div>

      {/* Search Bar */}
      <div className="mb-6 text-center">
        <input
          type="text"
          placeholder="Search itineraries..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded-md w-full max-w-md"
        />
      </div>

      {/* Itinerary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItineraries.map((itinerary) => (
          <motion.div
            key={itinerary.id}
            className="p-4 border rounded-lg shadow-md bg-white cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedItinerary(itinerary)}
          >
            <h2 className="text-xl font-semibold">{itinerary.title}</h2>
            <p className="text-gray-600">{itinerary.details.places.join(", ")} - {itinerary.details.duration}</p>
          </motion.div>
        ))}
      </div>

      {/* Modal for Detailed Itinerary View */}
      <AnimatePresence>
        {selectedItinerary && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                onClick={() => setSelectedItinerary(null)}
              >
                ✖
              </button>
              <h2 className="text-2xl font-bold">{selectedItinerary.title}</h2>
              <p className="text-gray-700 mt-2">{selectedItinerary.details.places.join(", ")} - {selectedItinerary.details.duration}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Itinerary;
