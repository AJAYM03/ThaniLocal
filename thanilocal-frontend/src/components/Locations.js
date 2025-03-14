import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion
import { FaChevronDown } from "react-icons/fa"; // Import arrow icon
import supabase from "../supabaseClient";

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({}); // Track expanded locations

  useEffect(() => {
    const fetchLocations = async () => {
      let { data, error } = await supabase.from("locations").select("*");
      if (error) {
        console.error("Error fetching locations:", error);
      } else {
        setLocations(data);
      }
      setLoading(false);
    };

    fetchLocations();
  }, []);

  const toggleExpand = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle expansion state
    }));
  };

  if (loading)
    return <p className="text-center text-lg text-gray-600 mt-5">Loading locations...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">ThaniLocal Locations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map((location) => (
          <motion.div
            key={location.id}
            className="border rounded-lg shadow-md p-4 bg-white cursor-pointer hover:shadow-lg transition-transform transform hover:scale-105"
            initial={{ opacity: 0, y: 20 }} // Animation when it appears
            animate={{ opacity: 1, y: 0 }} // Animation when it's fully visible
            transition={{ duration: 0.5 }}
          >
            <img
              src={location.image_url || "default-image.jpg"}
              alt={location.name}
              className="w-full h-40 object-cover rounded-md"
            />
            <h2 className="text-xl font-semibold mt-2">{location.name}</h2>

            {/* Description with animation */}
            <AnimatePresence>
              {expanded[location.id] && (
                <motion.p
                  className="text-gray-600 mt-1"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {location.description}
                </motion.p>
              )}
            </AnimatePresence>

            {/* View More Button */}
            <button
              onClick={() => toggleExpand(location.id)}
              className="text-blue-500 hover:text-blue-700 mt-2 flex items-center"
            >
              {expanded[location.id] ? "View Less" : "View More"}
              <motion.div
                animate={{ rotate: expanded[location.id] ? 180 : 0 }} // Rotate arrow
                transition={{ duration: 0.3 }}
                className="ml-2"
              >
                <FaChevronDown />
              </motion.div>
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Locations;
