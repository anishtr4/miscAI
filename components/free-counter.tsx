"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card";
import { MAX_FREE_COUNT } from "@/constants";
import { Progress } from "@/components/ui/progress";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";
import { useProModal } from "@/hooks/use-pro-modal";
interface Counter {
  apiLimitCount: number
}
const FreeCounter = ({ apiLimitCount = 0 }: Counter) => {

  const proModal = useProModal();
  const [mount, setMounted] = useState(false);


  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mount) {
    return null;
  }
  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0">
        <div className="py-6 px-6">
          <div className="text-center text-sm text-white md-4 space-y-2">
            <p>
              {apiLimitCount} / {MAX_FREE_COUNT} Free Generation left
            </p>
            <Progress className="h-3" value={apiLimitCount / MAX_FREE_COUNT * 100} />
          </div>
          <Button className="w-full mt-2" variant={"upgrade"} onClick={proModal.onOpen}>
            Upgrade
            <Zap className="w-4 h-4 ml-3 fill-white" />
          </Button>

        </div>

      </Card>
    </div>
  )
}

export { FreeCounter }