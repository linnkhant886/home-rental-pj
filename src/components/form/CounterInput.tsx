"use client";

import { useState } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { LuMinus, LuPlus } from "react-icons/lu";
import { Button } from "../ui/button";

type Props = {
  detail: string;
};
export default function CounterInput({ detail }: Props) {
  const [count, setcount] = useState(0);

  const increaseCount = () => {
    setcount(count + 1);
  };

  const decreaseCount = () => {
    if (count > 0) {
      setcount(count - 1);
    }
  };
  return (
    <Card className=" mb-4">
      <input type="hidden" name={detail} value={count} />
      <CardHeader className=" flex flex-col ">
        <div className=" flex justify-between">
          <div>
            <h3 className="capitalize font-bold mb-1">{detail}</h3>
            <p className="text-muted-foreground">
              Specify the number of {detail}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              type="button"
              onClick={decreaseCount}
            >
              <LuMinus className="w-5 h-5 text-primary" />
            </Button>
            <span className="text-xl font-bold w-5 text-center">{count}</span>
            <Button
              variant="outline"
              size="icon"
              type="button"
              onClick={increaseCount}
            >
              <LuPlus className="w-5 h-5 text-primary" />
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
