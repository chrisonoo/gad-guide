import { LightDarkToggle } from "@/components/LightDarkToggle";
import { Button } from "@/components/ui/button";
import { GadLogoBgNone } from "@/components/icons/GadLogoBgNone";

export default function Welcome() {
  return (
    <div className="h-dvh flex flex-col items-center justify-center gap-12 p-8">
      <LightDarkToggle className="absolute top-4 right-4" />
      <div className="flex flex-col gap-4 items-center justify-center">
        <div className="flex items-center gap-4">
          <GadLogoBgNone className="fill-accent pb-1 flex-shrink-0 h-[70px] md:h-[95px]" />
          <div className="flex gap-2 items-center flex-grow truncate text-1xl md:text-2xl font-semibold">
            GPT
            <br />
            Augmented
            <br />
            Developer
          </div>
        </div>
        <p className="text-center text-sm md:text-base text-gray-600 dark:text-gray-400">
          You&nbsp;evolve! You&nbsp;are&nbsp;Superintelligence!
          You&nbsp;transcend!
        </p>
      </div>
      <Button asChild size="responsive">
        <a href="#">Send Link</a>
      </Button>
    </div>
  );
}
