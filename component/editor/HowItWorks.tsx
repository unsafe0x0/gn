import React from "react";
import { FaDiscord } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const HowItWorks = () => {
  return (
    <div className="bg-white rounded-2xl p-8 space-y-4">
      <h3 className="text-xl font-semibold text-neutral-900">How it works</h3>
      <ul className="space-y-3 text-neutral-700">
        <li className="flex gap-3">
          <span className="text-[#c96442] font-bold">1.</span>
          <span>Enter your name and username</span>
        </li>
        <li className="flex gap-3">
          <span className="text-[#c96442] font-bold">2.</span>
          <span>Select your role (Member, Moderator, or Admin)</span>
        </li>
        <li className="flex gap-3">
          <span className="text-[#c96442] font-bold">3.</span>
          <span>Preview your card in real-time</span>
        </li>
        <li className="flex gap-3">
          <span className="text-[#c96442] font-bold">4.</span>
          <span>Download your personalized Grind Nation card!</span>
        </li>
      </ul>
      <div className="pt-4 space-y-2">
        <p className="text-sm font-semibold text-neutral-800">Role Colors:</p>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[#c96442]"></div>
            <span className="text-sm text-neutral-600">Member</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[#3b82f6]"></div>
            <span className="text-sm text-neutral-600">Moderator</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[#ef4444]"></div>
            <span className="text-sm text-neutral-600">Admin</span>
          </div>
        </div>
      </div>
      <div className="pt-4 border-t border-neutral-200">
        <p className="text-sm font-semibold text-neutral-800 mb-3">
          Join Our Community:
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://discord.gg/xKWH4s6yYx"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#5865F2] text-white rounded-lg hover:bg-[#4752C4] transition-colors text-sm font-medium"
          >
            <FaDiscord className="w-5 h-5" />
            Join Discord
          </a>
          <a
            href="https://x.com/i/communities/1966214267428024753"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-neutral-800 transition-colors text-sm font-medium"
          >
            <FaSquareXTwitter className="w-5 h-5" />
            Join Community
          </a>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
