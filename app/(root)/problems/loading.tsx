"use client";

import { Loader } from "@/components/shared/loader";



const Loading = () => {
  return ( 
    <div className="flex h-full w-full items-center justify-center mt-10">
      <Loader />
    </div>
   );
}
 
export default Loading;