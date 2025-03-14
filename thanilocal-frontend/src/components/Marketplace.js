import React from "react";

const Marketplace = () => {
    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-6">Support Local Businesses</h2>
            <p className="text-center text-gray-600 mb-8">Browse and purchase handmade products from locals.</p>

            {/* Grid Layout for Marketplace */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((id) => (
                    <div key={id} className="bg-white p-4 shadow-lg rounded-lg">
                        <img
                            src={`https://via.placeholder.com/300`}
                            alt={`Product ${id}`}
                            className="w-full h-40 object-cover rounded-md mb-3"
                        />
                        <h3 className="text-lg font-semibold">Product {id}</h3>
                        <p className="text-gray-500 text-sm">Handmade by local artisans.</p>
                        <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            Buy Now
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Marketplace;
