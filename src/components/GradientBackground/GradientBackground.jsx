import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";

export function GridBackground() {
 const router = useLocation();
 const [showTitle , setShowTitle] = useState(true);
  useEffect(()=>{
    if(router.pathname != "/" )
    {
      setShowTitle(false)
    }
  },[setShowTitle,router.pathname,showTitle])

  return (
    <div className="h-screen fixed  overflow-hidden w-full dark:bg-black bg-black   bg-grid-white/[0.2] z-[1000]  flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black   [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <p className="text-5xl  font-bold absolute top-12 left-12  z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-[#F8F3F2] py-8">
         {showTitle?"Welcome to CodeChat":""}
      </p>
    </div>
  );
}
