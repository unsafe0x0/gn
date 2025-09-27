"use client";
import React, { useState, useRef } from "react";
import Button from "@/component/common/Button";
import Input from "@/component/common/Input";
import html2canvas from "html2canvas";

const Editor = () => {
  const [community, setCommunity] = useState("Grind Nation");
  const [developer, setDeveloper] = useState("Your Name");
  const [twitter, setTwitter] = useState("@yourhandle");
  const [portfolioUrl, setPortfolioUrl] = useState("yourportfolio.com");
  const cardRef = useRef<HTMLDivElement>(null);

  const exportAsPNG = async () => {
    if (!cardRef.current) return;

    try {
      const fixedWidth = 640;
      const fixedHeight = 360;

      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: "#000000",
        scale: 4,
        useCORS: true,
        allowTaint: true,
        logging: false,
        width: fixedWidth,
        height: fixedHeight,
        windowWidth: fixedWidth,
        windowHeight: fixedHeight,
        onclone: (clonedDoc) => {
          const clonedCard = clonedDoc.querySelector(
            "[data-card-ref]"
          ) as HTMLElement;
          if (clonedCard) {
            clonedCard.style.width = `${fixedWidth}px`;
            clonedCard.style.height = `${fixedHeight}px`;
            clonedCard.style.minWidth = `${fixedWidth}px`;
            clonedCard.style.minHeight = `${fixedHeight}px`;
            const textElements =
              clonedCard.querySelectorAll(".space-y-1 > div");
            textElements.forEach((el) => {
              (el as HTMLElement).style.display = "flex";
              (el as HTMLElement).style.alignItems = "center";
              (el as HTMLElement).style.gap = "8px";
              (el as HTMLElement).style.height = "20px";
            });
          }
        },
      });

      const link = document.createElement("a");
      link.download = `grind-nation-card-${developer
        .replace(/\s+/g, "-")
        .toLowerCase()}.png`;
      link.href = canvas.toDataURL("image/png", 1.0);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error exporting PNG:", error);
      alert("Failed to export PNG. Please try again.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 grid grid-cols-1 md:grid-cols-2 gap-8 px-3">
      <section aria-label="Card settings" className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-pretty">Edit Your Card</h1>
          <p className="text-sm text-muted-foreground">
            Create a clean, minimal card from the Grind Nation community.
          </p>
        </div>

        <div className="grid gap-5">
          <Input
            label="Community name"
            value={community}
            onChange={(e) => setCommunity(e.target.value)}
            placeholder="Grind Nation"
          />

          <Input
            label="Developer name"
            value={developer}
            onChange={(e) => setDeveloper(e.target.value)}
            placeholder="Jane Doe"
          />

          <Input
            label="Twitter username"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
            placeholder="@janedoe"
          />

          <Input
            label="Portfolio URL"
            value={portfolioUrl}
            onChange={(e) => setPortfolioUrl(e.target.value)}
            placeholder="yourportfolio.com"
          />

          <div className="flex gap-3 pt-2">
            <Button
              variety="ghost"
              onClick={() => {
                setCommunity("Grind Nation");
                setDeveloper("Your Name");
                setTwitter("@yourhandle");
                setPortfolioUrl("yourportfolio.com");
              }}
            >
              Reset
            </Button>
          </div>
        </div>
      </section>

      <section aria-label="Live preview" className="space-y-4">
        <div className="flex flex-col space-y-1.5">
          <h3 className="text-2xl font-semibold text-pretty">Preview</h3>
        </div>
        <div className="pt-0 flex items-center justify-center">
          <div
            ref={cardRef}
            data-card-ref
            className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden"
            style={{ maxWidth: "640px", aspectRatio: "16/9" }}
          >
            <img
              src="https://res.cloudinary.com/dj98bhfz1/image/upload/v1758993951/image_bh2vkr.avif"
              alt="Card background"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.2) 100%)",
              }}
            >
              <div className="p-6 text-white h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="text-2xl font-semibold">{community}</div>
                  <img src="/blocks.svg" alt="" className="h-6 w-6" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-xl font-semibold leading-tight">
                    {developer}
                  </h2>

                  <div className="space-y-1 text-sm">
                    <div>{twitter}</div>
                    <div>{portfolioUrl}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          <Button className="w-full" onClick={exportAsPNG}>
            Export as PNG
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Editor;
