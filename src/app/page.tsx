"use client";

import { Button } from "@/components/ui/button";
import React from "react";

function Home() {
  return (
    <div>
      <h1 className=" text-4xl">Home Page</h1>

      <Button variant={"default"} size={"lg"}>
        Click me
      </Button>

      
    </div>
  );
}

export default Home;
