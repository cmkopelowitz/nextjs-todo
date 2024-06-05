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
        <button
          type="button"
          className="hidden sm:block ml-6 mt-9"
          onClick={() => setShow(true)}
        >
          <span className="sr-only">Open Navigation</span>
          <LineHorizontal320Regular />
        </button>
      )}
      {show && (
        <div className="border h-screen w-80 md:w-96 hidden sm:block">
          <button
            type="button"
            className="mx-6 mt-9"
            onClick={() => setShow(false)}
          >
            <LineHorizontal320Regular />
            <span className="sr-only">Close Navigation</span>
          </button>
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
