// eslint-disable-next-line no-unused-vars
import React from "react";

const AddItem = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-[220px] bg-white border-r">
        <div className="p-4 font-bold text-lg">FOREVER.</div>

        <div className="flex flex-col gap-2 px-3">
          <button className="flex items-center gap-2 p-2 rounded-md bg-pink-100">
            Add Items
          </button>

          <button className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100">
            List Items
          </button>

          <button className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100">
            Orders
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 p-6">

        {/* Top */}
        <div className="flex justify-end mb-6">
          <button className="bg-gray-800 text-white px-4 py-2 rounded-full">
            Logout
          </button>
        </div>

        {/* Form */}
        <div className="bg-white p-6 rounded-md shadow-sm max-w-3xl">

          <p className="mb-2">Upload Image</p>

          <div className="flex gap-3 mb-6">
            {[1,2,3,4].map((i)=>(
              <div key={i} className="w-20 h-20 border-2 border-dashed flex items-center justify-center text-gray-400">
                Upload
              </div>
            ))}
          </div>

          <p className="text-sm mb-1">Product name</p>
          <input className="w-full border p-2 rounded-md mb-4" placeholder="Type here" />

          <p className="text-sm mb-1">Product description</p>
          <textarea className="w-full border p-2 rounded-md mb-4" placeholder="Write content here" />

          <div className="flex gap-4 mb-4">
            <select className="border p-2 rounded-md flex-1">
              <option>Women</option>
            </select>

            <select className="border p-2 rounded-md flex-1">
              <option>Topwear</option>
            </select>

            <input type="number" defaultValue={25} className="border p-2 rounded-md w-24" />
          </div>

          <p className="text-sm mb-2">Product Sizes</p>
          <div className="flex gap-2">
            {["S","M","L","XL","XXL"].map((s)=>(
              <button key={s} className="px-3 py-1 bg-gray-200 rounded-md">
                {s}
              </button>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddItem;