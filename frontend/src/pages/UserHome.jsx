import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import axios from "axios";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";

const UserHome = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setpanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const vehiclePanelRef = useRef(null);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const confirmRidePanelRef = useRef(null);
  const [vehicleFoundPanel, setVehicleFoundPanel] = useState(false);
  const vehicleFoundPanelRef = useRef(null);
  const [waitingForDriver, setwaitingForDriver] = useState(false)
  const waitingForDriverRef = useRef(null);
  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "65%",
          padding: 24,
          opacity: 1,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          padding: 0,
          // opacity:0
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen]
  );

  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanel]
  );

  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePanel]
  );

  useGSAP(
    function () {
      if (vehicleFoundPanel) {
        gsap.to(vehicleFoundPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehicleFoundPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleFoundPanel]
  );

  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriver]
  );

  return (
    <div className="w-screen h-screen  ">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt=""
      />
      <div className="h-screen w-screen">
        {/* image for temporary use  */}
        <img
          className=" h-screen w-full"
          src="https://i.pinimg.com/474x/e8/45/b1/e845b136132e16bc852c35d76af6d07c.jpg"
        />
      </div>
      <div className="h-full w-full flex flex-col justify-end absolute bottom-0 overflow-hidden ">
        <div className="h-[35%] bg-white px-6 py-2  ">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-2xl font-semibold">Find a trip</h4>
            <h5
              ref={panelCloseRef}
              onClick={() => {
                setpanelOpen(false);
              }}
              className=" text-3xl"
            >
              <i className="ri-arrow-down-wide-line"></i>
            </h5>
          </div>

          <form
            className="relative "
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
            <input
              value={pickup}
              onClick={() => {
                setpanelOpen(true);
              }}
              onChange={(e) => setPickup(e.target.value)}
              className="bg-[#e0dfdf] px-12 py-2 text-lg rounded-lg w-full"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              value={destination}
              onClick={() => {
                setpanelOpen(true);
              }}
              onChange={(e) => setDestination(e.target.value)}
              className="bg-[#e0dfdf] px-12 py-2 text-lg rounded-lg w-full  mt-3"
              type="text"
              placeholder="Enter your destination"
            />
            <button
              onClick={() => {
                if (pickup || destination) {
                  setVehiclePanel(true);
                  setpanelOpen(false);
                } else {
                  alert("Please enter both Pickup and Destination");
                }
              }}
              className="bg-black text-white px-4 py-2 rounded-lg mt-3 w-full"
            >
              Find Trip
            </button>
          </form>
        </div>
        <div ref={panelRef} className=" opacity-0 bg-white h-[0%] ">
          <LocationSearchPanel
            setpanelOpen={setpanelOpen}
            pickup={pickup}
            destination={destination}
            setVehiclePanel={setVehiclePanel}
          ></LocationSearchPanel>
        </div>
      </div>

      <div
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
        ref={vehiclePanelRef}
      >
        <VehiclePanel
          setVehiclePanel={setVehiclePanel}
          setConfirmRidePanel={setConfirmRidePanel}
        />
      </div>

      <div
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
        ref={confirmRidePanelRef}
      >
        <ConfirmRide
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFoundPanel={setVehicleFoundPanel}
        />
      </div>

      <div className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12" ref={vehicleFoundPanelRef}>
        <LookingForDriver />
      </div>

      <div className="fixed w-full z-10  translate-y-full bg-white px-3 py-10 pt-12" ref={waitingForDriverRef}>
        <WaitingForDriver waitingForDriver={waitingForDriver}/>
      </div>

    </div>
  );
};

export default UserHome;
