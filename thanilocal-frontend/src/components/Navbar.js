import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-blue-500 text-white p-4 flex justify-between items-center shadow-md">
            <h1 className="text-xl font-bold">ThaniLocal</h1>
            <div className="flex gap-10"> {/* Increased spacing between links */}
                <Link to="/" className="text-lg hover:underline">Home</Link>
                <Link to="/itinerary" className="text-lg hover:underline">Itineraries</Link>
                <Link to="/marketplace" className="text-lg hover:underline">Marketplace</Link>
            </div>
        </nav>
    );
};

export default Navbar;
