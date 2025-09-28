"use client";
import React, { useState, useRef } from "react";
import Button from "@/component/common/Button";
import Input from "@/component/common/Input";
import Dropdown from "@/component/common/Dropdown";
import Slider from "@/component/common/Slider";
import html2canvas from "html2canvas";

const Editor = () => {
  const [community, setCommunity] = useState("Grind Nation");
  const [developer, setDeveloper] = useState("Your Name");
  const [twitter, setTwitter] = useState("@yourhandle");
  const [portfolioUrl, setPortfolioUrl] = useState("yourportfolio.com");
  const [variant, setVariant] = useState("normal");
  const [orientation, setOrientation] = useState("horizontal");
  const [borderRadius, setBorderRadius] = useState(16);
  const [gradientIntensity, setGradientIntensity] = useState(60);
  const cardRef = useRef<HTMLDivElement>(null);

  const exportAsPNG = async () => {
    if (!cardRef.current) return;

    try {
      const actualWidth = cardRef.current.offsetWidth;
      const actualHeight = cardRef.current.offsetHeight;
      const scale = 2;
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: "#00000000",
        scale: scale,
        useCORS: true,
        allowTaint: true,
        logging: false,
        width: actualWidth,
        height: actualHeight,
        onclone: (clonedDoc) => {
          const clonedCard = clonedDoc.querySelector(
            "[data-card-ref]"
          ) as HTMLElement;
          if (clonedCard) {
            clonedCard.style.width = `${actualWidth}px`;
            clonedCard.style.height = `${actualHeight}px`;
            clonedCard.style.maxWidth = "none";
            clonedCard.style.aspectRatio =
              orientation === "vertical"
                ? "9/16"
                : orientation === "square"
                ? "1/1"
                : "16/9";
          }
        },
      });

      let finalCanvas = canvas;
      if (variant === "blackwhite") {
        const grayCanvas = document.createElement("canvas");
        grayCanvas.width = canvas.width;
        grayCanvas.height = canvas.height;

        const ctx = grayCanvas.getContext("2d");
        if (ctx) {
          ctx.filter = "grayscale(100%)";
          ctx.drawImage(canvas, 0, 0);
        }
        finalCanvas = grayCanvas;
      }
      finalCanvas.toBlob(
        (blob) => {
          if (blob) {
            const link = document.createElement("a");
            link.download = `grind-nation-card-${developer
              .replace(/\s+/g, "-")
              .toLowerCase()}.png`;
            link.href = URL.createObjectURL(blob);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
          } else {
            alert("Failed to generate image blob. Please try again.");
          }
        },
        "image/png",
        1.0
      );
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

          <Dropdown
            label="Variant"
            options={[
              { value: "normal", label: "Normal" },
              { value: "blackwhite", label: "Black & White" },
            ]}
            value={variant}
            onChange={setVariant}
          />

          <Dropdown
            label="Orientation"
            options={[
              { value: "horizontal", label: "Horizontal" },
              { value: "vertical", label: "Vertical" },
              { value: "square", label: "Square" },
            ]}
            value={orientation}
            onChange={setOrientation}
          />

          <Slider
            label="Border Radius"
            value={borderRadius}
            onChange={setBorderRadius}
            min={0}
            max={32}
            step={1}
          />

          <Slider
            label="Gradient Intensity"
            value={gradientIntensity}
            onChange={setGradientIntensity}
            min={0}
            max={100}
            step={5}
          />

          <div className="flex gap-3 pt-2">
            <Button
              variety="ghost"
              onClick={() => {
                setCommunity("Grind Nation");
                setDeveloper("Your Name");
                setTwitter("@yourhandle");
                setPortfolioUrl("yourportfolio.com");
                setVariant("normal");
                setOrientation("horizontal");
                setBorderRadius(16);
                setGradientIntensity(60);
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
            className={`relative w-full overflow-hidden ${
              orientation === "vertical"
                ? "aspect-[9/16] max-w-[360px]"
                : orientation === "square"
                ? "aspect-square max-w-[400px]"
                : "aspect-[16/9] max-w-[640px]"
            }`}
            style={{ borderRadius: `${borderRadius}px` }}
          >
            <img
              src={
                orientation === "vertical"
                  ? "https://res.cloudinary.com/dj98bhfz1/image/upload/v1759025599/image_Edited_svjwuq.png"
                  : orientation === "square"
                  ? "https://res.cloudinary.com/dj98bhfz1/image/upload/v1759025597/image_Edited_3_iw2etm.png"
                  : "https://res.cloudinary.com/dj98bhfz1/image/upload/v1759025597/image_Edited_2_c5fdt3.png"
              }
              alt="Card background"
              className="w-full h-full object-cover"
              style={{
                filter: variant === "blackwhite" ? "grayscale(100%)" : "none",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  orientation === "vertical"
                    ? `linear-gradient(to top, rgba(0,0,0,${0.8 * (gradientIntensity / 100)}) 0%, rgba(0,0,0,${0.5 * (gradientIntensity / 100)}) 60%, rgba(0,0,0,${0.2 * (gradientIntensity / 100)}) 100%)`
                    : orientation === "square"
                    ? `linear-gradient(135deg, rgba(0,0,0,${0.8 * (gradientIntensity / 100)}) 0%, rgba(0,0,0,${0.5 * (gradientIntensity / 100)}) 50%, rgba(0,0,0,${0.2 * (gradientIntensity / 100)}) 100%)`
                    : `linear-gradient(to right, rgba(0,0,0,${0.8 * (gradientIntensity / 100)}) 0%, rgba(0,0,0,${0.5 * (gradientIntensity / 100)}) 60%, rgba(0,0,0,${0.2 * (gradientIntensity / 100)}) 100%)`,
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
