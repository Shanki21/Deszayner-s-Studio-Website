"use client";

import { useEffect } from "react";
import { Plus } from "lucide-react";

import { Button } from "./button";
import { renderCanvas, ShineBorder, TypeWriter } from "./hero-designali";

export const Hero = () => {
  const talkAbout = [
    "Graphic Design",
    "Branding",
    "Web Design",
    "Web Develop",
    "Marketing",
    "UI UX",
    "Social Media",
  ];

  useEffect(() => {
    renderCanvas();
  }, []);

  return (
    <main className="overflow-hidden">
      <section id="home">
        <div className="absolute inset-0 max-md:hidden top-[400px] -z-10 h-[400px] w-full bg-transparent bg-[linear-gradient(to_right,#57534e_1px,transparent_1px),linear-gradient(to_bottom,#57534e_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <div className="flex flex-col items-center justify-center px-6 text-center">
          <div className="mb-6 mt-10 sm:justify-center md:mb-4 md:mt-40">
            <div className="relative flex items-center rounded-full border bg-popover px-3 py-1 text-xs text-primary/60">
              Introducing Deszayners Studio.
              <a href="/services" rel="noreferrer" className="ml-1 flex items-center font-semibold">
                Explore <span aria-hidden="true"></span>
              </a>
            </div>
          </div>

          <div className="mx-auto max-w-5xl">
            <div className="relative mx-auto h-full border bg-background p-6 py-12 [mask-image:radial-gradient(800rem_96rem_at_center,white,transparent)]">
              <h1 className="relative flex flex-col text-center text-5xl font-semibold leading-none tracking-tight md:text-8xl lg:text-8xl">
                <Plus strokeWidth={4} className="absolute -left-5 -top-5 h-10 w-10 text-purple-500" />
                <Plus strokeWidth={4} className="absolute -bottom-5 -left-5 h-10 w-10 text-purple-500" />
                <Plus strokeWidth={4} className="absolute -right-5 -top-5 h-10 w-10 text-purple-500" />
                <Plus strokeWidth={4} className="absolute -bottom-5 -right-5 h-10 w-10 text-purple-500" />
                <span>
                  Your complete platform for <span className="text-purple-500">brand growth.</span>
                </span>
              </h1>
              <div className="mt-4 flex items-center justify-center gap-1">
                <span className="relative flex h-3 w-3 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                <p className="text-xs text-green-500">Available Now</p>
              </div>
            </div>

            <p className="py-4 text-primary/60">
              We help brands grow through strategy, branding, content, websites, social media, campaigns, and corporate experiences like{" "}
              <span className="font-semibold text-purple-500">
                <TypeWriter strings={talkAbout} />
              </span>
              .
            </p>
            <div className="flex items-center justify-center gap-2">
              <a href="/contact">
                <ShineBorder borderWidth={3} className="h-auto w-auto cursor-pointer border bg-white/5 p-2 backdrop-blur-md" color={["#9d4dff", "#ff4df3", "#ffffff"]}>
                  <Button className="w-full rounded-xl">Start a project</Button>
                </ShineBorder>
              </a>
              <a href="/services">
                <Button className="rounded-xl" variant="outline">
                  Explore services
                </Button>
              </a>
            </div>
          </div>
        </div>
        <canvas className="pointer-events-none absolute inset-0 mx-auto" id="canvas"></canvas>
      </section>
    </main>
  );
};
