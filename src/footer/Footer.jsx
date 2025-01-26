import React from "react";
import { Card, CardContent } from "@/components/ui/card"; // Adjust the import path to match your project
import { Button } from "@/components/ui/button";
import Logo from '../assets/logo.jpg'
export default function Footer() {
  return (
    <Card className="rounded-none border-t-2 border-gray-200 bg-gray-50">
      <CardContent className="flex flex-col items-center justify-between md:flex-row p-6">
        {/* Footer Logo */}
        <div className="mb-4 md:mb-0">
        <img src={Logo} alt="" className="size-56"/>
          <h1 className="text-xl font-bold text-gray-800">Steady Partner</h1>
        </div>

        {/* Navigation Links */}
        <nav className="mb-4 md:mb-0">
          <ul className="flex flex-wrap gap-4 text-gray-600">
            <li>
              <a href="#home" className="hover:text-gray-800">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-gray-800">
                About
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-gray-800">
                Services
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-gray-800">
                Contact
              </a>
            </li>
          </ul>
        </nav>

        {/* Call-to-Action */}
        <div>
          <Button variant="default" className="px-6">
            Get Started
          </Button>
        </div>
      </CardContent>

      {/* Footer Bottom */}
      <CardContent className="border-t mt-4 py-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </CardContent>
    </Card>
  );
}
