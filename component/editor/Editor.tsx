"use client";
import React, { useState, useRef, useMemo } from "react";
import Button from "@/component/common/Button";
import Input from "@/component/common/Input";
import Dropdown from "@/component/common/Dropdown";
import { toPng } from "html-to-image";
import HowItWorks from "./HowItWorks";
import { MdFileDownload } from "react-icons/md";

const Editor = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState<"admin" | "mod" | "member">("member");
  const cardRef = useRef<HTMLDivElement>(null);

  const uniqueId = useMemo(() => {
    const ms = Date.now().toString();
    const last6 = ms.slice(-6);
    return `GNAT${last6}`;
  }, []);

  const getRoleColor = () => {
    switch (role) {
      case "admin":
        return "#ef4444";
      case "mod":
        return "#3b82f6";
      case "member":
        return "#c96442";
    }
  };

  const exportAsPNG = async () => {
    if (!cardRef.current || !name.trim() || !username.trim()) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 1.0,
        pixelRatio: 3,
        cacheBust: true,
      });

      const link = document.createElement("a");
      link.download = `grind-nation-${username.replace("@", "")}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error exporting PNG:", error);
      alert("Failed to export PNG. Please try again.");
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900">
            Grind Nation Card Generator
          </h1>
          <p className="text-lg text-neutral-600">
            Create your personalized developer card in seconds
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Input
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
            />

            <Input
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="@username"
            />

            <Dropdown
              label="Role"
              options={[
                { value: "member", label: "Member" },
                { value: "mod", label: "Moderator" },
                { value: "admin", label: "Admin" },
              ]}
              value={role}
              onChange={(val) => setRole(val as "admin" | "mod" | "member")}
            />
          </div>
        </div>

        {(name.trim() || username.trim()) && (
          <div className="space-y-6">
            <div className="flex items-center justify-center">
              <div
                ref={cardRef}
                className="relative w-full max-w-3xl aspect-[16/9] rounded-2xl overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
                }}
              >
                <svg
                  className="absolute inset-0 w-full h-full"
                  style={{ opacity: 0.5 }}
                >
                  <defs>
                    <pattern
                      id="circuit"
                      x="0"
                      y="0"
                      width="200"
                      height="200"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 0 50 L 60 50"
                        stroke="#FFD700"
                        strokeWidth="1.5"
                        fill="none"
                      />
                      <path
                        d="M 80 50 L 200 50"
                        stroke="#FFD700"
                        strokeWidth="1.5"
                        fill="none"
                      />
                      <path
                        d="M 0 100 L 40 100"
                        stroke="#DAA520"
                        strokeWidth="1.5"
                        fill="none"
                      />
                      <path
                        d="M 60 100 L 140 100"
                        stroke="#DAA520"
                        strokeWidth="1.5"
                        fill="none"
                      />
                      <path
                        d="M 160 100 L 200 100"
                        stroke="#DAA520"
                        strokeWidth="1.5"
                        fill="none"
                      />
                      <path
                        d="M 0 150 L 80 150"
                        stroke="#FFD700"
                        strokeWidth="1.5"
                        fill="none"
                      />
                      <path
                        d="M 100 150 L 200 150"
                        stroke="#FFD700"
                        strokeWidth="1.5"
                        fill="none"
                      />
                      <path
                        d="M 50 0 L 50 40"
                        stroke="#FFD700"
                        strokeWidth="1.5"
                        fill="none"
                      />
                      <path
                        d="M 50 60 L 50 90"
                        stroke="#FFD700"
                        strokeWidth="1.5"
                        fill="none"
                      />
                      <path
                        d="M 50 110 L 50 200"
                        stroke="#FFD700"
                        strokeWidth="1.5"
                        fill="none"
                      />
                      <path
                        d="M 100 0 L 100 80"
                        stroke="#DAA520"
                        strokeWidth="1.5"
                        fill="none"
                      />
                      <path
                        d="M 100 120 L 100 200"
                        stroke="#DAA520"
                        strokeWidth="1.5"
                        fill="none"
                      />
                      <path
                        d="M 150 0 L 150 50"
                        stroke="#FFD700"
                        strokeWidth="1.5"
                        fill="none"
                      />
                      <path
                        d="M 150 70 L 150 130"
                        stroke="#FFD700"
                        strokeWidth="1.5"
                        fill="none"
                      />
                      <path
                        d="M 150 150 L 150 200"
                        stroke="#FFD700"
                        strokeWidth="1.5"
                        fill="none"
                      />
                      <circle cx="50" cy="50" r="3" fill="#FFD700" />
                      <circle cx="100" cy="100" r="3" fill="#FFD700" />
                      <circle cx="150" cy="150" r="3" fill="#FFD700" />
                      <circle cx="50" cy="100" r="2.5" fill="#DAA520" />
                      <circle cx="100" cy="50" r="2.5" fill="#DAA520" />
                      <circle cx="150" cy="50" r="2.5" fill="#FFD700" />
                      <path
                        d="M 50 50 L 100 100"
                        stroke="#FFD700"
                        strokeWidth="1"
                        fill="none"
                        opacity="0.6"
                      />
                      <path
                        d="M 100 100 L 150 150"
                        stroke="#FFD700"
                        strokeWidth="1"
                        fill="none"
                        opacity="0.6"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#circuit)" />
                </svg>
                <div className="absolute inset-0">
                  <img
                    src="https://res.cloudinary.com/dj98bhfz1/image/upload/v1759025597/image_Edited_2_c5fdt3.avif"
                    alt=""
                    className="w-full h-full object-cover"
                    style={{ opacity: 0.75 }}
                  />
                </div>
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.5) 100%)",
                  }}
                />
                <svg
                  className="absolute inset-0 w-full h-full"
                  style={{ opacity: 0.15 }}
                >
                  <defs>
                    <pattern
                      id="binaryRain"
                      x="0"
                      y="0"
                      width="100"
                      height="100"
                      patternUnits="userSpaceOnUse"
                    >
                      <text
                        x="10"
                        y="15"
                        fill="#00ff00"
                        fontSize="10"
                        fontFamily="monospace"
                        opacity="0.8"
                      >
                        1
                      </text>
                      <text
                        x="10"
                        y="30"
                        fill="#00ff00"
                        fontSize="10"
                        fontFamily="monospace"
                        opacity="0.6"
                      >
                        0
                      </text>
                      <text
                        x="10"
                        y="45"
                        fill="#00ff00"
                        fontSize="10"
                        fontFamily="monospace"
                        opacity="0.5"
                      >
                        1
                      </text>
                      <text
                        x="10"
                        y="60"
                        fill="#00ff00"
                        fontSize="10"
                        fontFamily="monospace"
                        opacity="0.4"
                      >
                        1
                      </text>
                      <text
                        x="10"
                        y="75"
                        fill="#00ff00"
                        fontSize="10"
                        fontFamily="monospace"
                        opacity="0.3"
                      >
                        0
                      </text>
                      <text
                        x="10"
                        y="90"
                        fill="#00ff00"
                        fontSize="10"
                        fontFamily="monospace"
                        opacity="0.2"
                      >
                        1
                      </text>

                      <text
                        x="35"
                        y="25"
                        fill="#00ff00"
                        fontSize="10"
                        fontFamily="monospace"
                        opacity="0.7"
                      >
                        0
                      </text>
                      <text
                        x="35"
                        y="40"
                        fill="#00ff00"
                        fontSize="10"
                        fontFamily="monospace"
                        opacity="0.6"
                      >
                        1
                      </text>
                      <text
                        x="35"
                        y="55"
                        fill="#00ff00"
                        fontSize="10"
                        fontFamily="monospace"
                        opacity="0.5"
                      >
                        0
                      </text>
                      <text
                        x="35"
                        y="70"
                        fill="#00ff00"
                        fontSize="10"
                        fontFamily="monospace"
                        opacity="0.4"
                      >
                        1
                      </text>
                      <text
                        x="35"
                        y="85"
                        fill="#00ff00"
                        fontSize="10"
                        fontFamily="monospace"
                        opacity="0.3"
                      >
                        1
                      </text>

                      <text
                        x="60"
                        y="10"
                        fill="#00ff00"
                        fontSize="10"
                        fontFamily="monospace"
                        opacity="0.8"
                      >
                        1
                      </text>
                      <text
                        x="60"
                        y="25"
                        fill="#00ff00"
                        fontSize="10"
                        fontFamily="monospace"
                        opacity="0.6"
                      >
                        1
                      </text>
                      <text
                        x="60"
                        y="40"
                        fill="#00ff00"
                        fontSize="10"
                        fontFamily="monospace"
                        opacity="0.5"
                      >
                        0
                      </text>
                      <text
                        x="60"
                        y="55"
                        fill="#00ff00"
                        fontSize="10"
                        fontFamily="monospace"
                        opacity="0.4"
                      >
                        0
                      </text>
                      <text
                        x="60"
                        y="70"
                        fill="#00ff00"
                        fontSize="10"
                        fontFamily="monospace"
                        opacity="0.3"
                      >
                        1
                      </text>
                      <text
                        x="60"
                        y="85"
                        fill="#00ff00"
                        fontSize="10"
                        fontFamily="monospace"
                        opacity="0.2"
                      >
                        0
                      </text>

                      <text
                        x="85"
                        y="20"
                        fill="#00ff00"
                        fontSize="10"
                        fontFamily="monospace"
                        opacity="0.7"
                      >
                        0
                      </text>
                      <text
                        x="85"
                        y="35"
                        fill="#00ff00"
                        fontSize="10"
                        fontFamily="monospace"
                        opacity="0.6"
                      >
                        1
                      </text>
                      <text
                        x="85"
                        y="50"
                        fill="#00ff00"
                        fontSize="10"
                        fontFamily="monospace"
                        opacity="0.5"
                      >
                        1
                      </text>
                      <text
                        x="85"
                        y="65"
                        fill="#00ff00"
                        fontSize="10"
                        fontFamily="monospace"
                        opacity="0.4"
                      >
                        0
                      </text>
                      <text
                        x="85"
                        y="80"
                        fill="#00ff00"
                        fontSize="10"
                        fontFamily="monospace"
                        opacity="0.3"
                      >
                        1
                      </text>
                      <text
                        x="85"
                        y="95"
                        fill="#00ff00"
                        fontSize="10"
                        fontFamily="monospace"
                        opacity="0.2"
                      >
                        0
                      </text>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#binaryRain)" />
                </svg>
                <div className="absolute top-5 right-5">
                  <img src="/blocks.svg" alt="Blocks" className="w-8 h-8" />
                </div>
                <div className="absolute bottom-5 right-5">
                  <div className="text-xs sm:text-sm font-mono text-neutral-500 tracking-wider">
                    {uniqueId}
                  </div>
                </div>
                <div className="relative h-full flex items-center justify-center p-4 sm:p-8 md:p-12">
                  <div className="flex-1 max-w-2xl space-y-3 sm:space-y-4 md:space-y-6">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div
                        className="text-xs sm:text-sm font-bold tracking-wider uppercase"
                        style={{ color: getRoleColor() }}
                      >
                        Grind Nation
                      </div>
                      <div className="h-3 sm:h-4 w-px bg-neutral-600" />
                      <div className="text-xs sm:text-sm text-neutral-400 capitalize">
                        {role}
                      </div>
                    </div>
                    <div className="space-y-2 sm:space-y-3">
                      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                        {name || "Your Name"}
                      </h2>
                      <p
                        className="text-lg sm:text-xl font-medium"
                        style={{ color: getRoleColor() }}
                      >
                        @{username || "username"}
                      </p>
                    </div>
                    <div className="flex gap-2 pt-2 sm:pt-3 md:pt-4">
                      <div className="h-1 sm:h-1.5 w-8 sm:w-12 bg-[#ef4444] rounded-full" />
                      <div className="h-1 sm:h-1.5 w-8 sm:w-12 bg-[#3b82f6] rounded-full" />
                      <div className="h-1 sm:h-1.5 w-4 sm:w-6 bg-[#c96442] rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <Button
                className=""
                onClick={exportAsPNG}
                disabled={!name.trim() || !username.trim()}
              >
                Download
                <MdFileDownload className="w-5 h-5" />
              </Button>
            </div>
          </div>
        )}

        {!name.trim() && !username.trim() && <HowItWorks />}
      </div>
    </div>
  );
};

export default Editor;
