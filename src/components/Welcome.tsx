import { Button, buttonVariants } from "@/components/ui/button";
import GadLogoBgNone from "./icons/gad-logo-bg-none";
import { cn } from "@/lib/utils";

export default function Welcome() {
  return (
    <>
      {/* <div className="h-dvh flex flex-col justify-between items-center">
        <div id="top" className="flex mt-4 gap-2">
          <div className="self-center bg-blue-500 p-4 text-white text-center h-30 flex items-center justify-center">
            Top Container
            <br />
            Top Container
          </div>
          <div className="bg-blue-500 p-4 text-white text-center">
            Top Container 2222
            <br />
            Top Container 2222
            <br />
            Top Container 2222
            <br />
            Top Container 2222
          </div>
          <div className="bg-blue-500 p-4 text-white text-center">
            Top Container
            <br />
            Top Container
            <br />
            Top Container
          </div>
        </div>
        <div className="flex-grow"></div>
        <div id="bottom" className="p-4 mb-4">
          <button className="bg-green-500 px-6 py-3 text-white rounded-md hover:bg-green-600 transition-colors">
            Bottom Container
          </button>
        </div>
      </div> */}

      {/* <div className="h-screen flex flex-col justify-between">
        <div className="grow flex flex-col items-center justify-center">
          <div id="top" className="bg-blue-500 p-4 text-white">
            Top Container
            <br />
            Top Container
            <br />
            Top Container
            <br />
          </div>
          <div id="top" className="bg-blue-500 p-4 text-white">
            Top Container
            <br />
            Top Container
            <br />
            Top Container
            <br />
          </div>
        </div>
        <div id="bottom" className="bg-green-500 p-4 text-white my-4">
          Bottom Container
        </div>
      </div> */}

      {/* <div className="h-dvh flex items-center justify-center">
        <div id="top" className="flex flex-col gap-4">
          <div className="bg-blue-500 p-4 text-white text-center">
            Top Container
            <br />
            Top Container
          </div>
          <div className="bg-blue-500 p-4 text-white text-center">
            Top Container 2
            <br />
            Top Container 2
            <br />
            Top Container 2
          </div>
        </div>
        <div id="bottom" className="absolute bottom-0 flex justify-center p-4">
          <Button className="bg-green-500 px-6 py-3 text-white rounded-md hover:bg-green-600 transition-colors">
            Bottom Container
          </Button>
        </div>
      </div> */}

      <div className="h-dvh flex flex-col items-center justify-center gap-12">
        <div className="flex flex-col gap-4 items-center justify-center px-8">
          <div className="flex items-center gap-4">
            <GadLogoBgNone className="fill-detail pb-1 flex-shrink-0 h-[70px] md:h-[95px]" />
            <div className="flex gap-2 items-center flex-grow truncate text-1xl md:text-2xl font-semibold">
              GPT
              <br />
              Augmented
              <br />
              Developer
            </div>
          </div>
          <p className="text-center text-sm md:text-base">
            You don't just code. You&nbsp;evolve!&nbsp;You&nbsp;transcend!
          </p>
        </div>
        <Button
          asChild
          className="h-8 rounded-md px-3 text-xs md:h-9 md:px-4 md:py-2 md:text-sm"
        >
          <a href="#">Send Link</a>
        </Button>
      </div>
    </>
  );
}
