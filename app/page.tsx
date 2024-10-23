"use client"
import GeoSearch from "@/app/ui/geosearch";
import { useEffect } from "react";

export default function Page() {
  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     console.log(position.coords.latitude)
  //     console.log(position.coords.longitude)
  //   })
  // })
  return (
    <div>
      <div className="grid grid-rows-3 items-center justify-items-center min-h-screen">
        <p className="">
          Hello
        </p>
        <GeoSearch/>
      </div>
    </div>
  );
}
