import React from "react";

const LocationSearchPanel = ({setVehiclePanel,setpanelOpen,pickup,destination}) => {
  
  
  // sample locations

  const sampleLocation = [
    "123 Shadowmere Valley, Eldoria Heights, NY 10234, USA",
    "456 Mystic Hollow Rd, Ravenwood Keep, CA 90876, USA",
    "789 Crimson Bay St, Azure Falls, TX 75432, USA",
    "321 Oblivion Ridge Ave, Silverpine Glade, FL 33122, USA",
    "654 Everfrost Tundra Ln, Celestia Harbor, WA 98230, USA",
  ];

  return (
    <div>
      {sampleLocation.map(function (elem,i) {
        return (
          <div  onClick={() => {
            if (pickup || destination) {
              setVehiclePanel(true);
              setpanelOpen(false);
            } else {
              alert("Please enter both Pickup and Destination");
            }
          }} key={i} className="flex gap-4 my-2 border-2 p-3 border-gray-200 active:border-black rounded-xl items-center  justify-start">
            <h2 className="bg-[#e7e1e1] h-8 flex items-center justify-center w-8 p-2 rounded-full">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className="font-semibold text-sm">{elem}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
