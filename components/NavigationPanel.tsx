"use client";
import React, { useState } from "react";
import NavigationLink from "./NavigationLink";
import {
  WeatherSunny20Regular,
  LineHorizontal320Regular,
  Star20Regular,
  Home20Regular,
} from "@fluentui/react-icons";

export default function NavigationPanel() {
  const [show, setShow] = useState(false);
  return (
    <div>
      {!show && (
        <div className="h-12 px-6 flex items-center">
          <button
            type="button"
            className="hidden sm:block"
            onClick={() => setShow(true)}
          >
            <span className="sr-only">Open Navigation</span>
            <LineHorizontal320Regular />
          </button>
        </div>
      )}
      {show && (
        <div className="border h-screen w-[290px] hidden sm:block">
          <div className="h-12 px-6 flex items-center">
            <button
              type="button"
              className="block"
              onClick={() => setShow(false)}
            >
              <LineHorizontal320Regular />
              <span className="sr-only">Close Navigation</span>
            </button>
          </div>
          <NavigationLink
            label="My Day"
            icon={<WeatherSunny20Regular />}
            path="/tasks/myday"
          />
          <NavigationLink
            label="Important"
            icon={<Star20Regular />}
            path="/tasks/important"
          />
          <NavigationLink
            label="Tasks"
            icon={<Home20Regular />}
            path="/tasks/inbox"
          />
        </div>
      )}
    </div>
  );
}
