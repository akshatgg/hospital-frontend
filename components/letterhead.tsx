"use client"

import Image from "next/image"

export default function Letterhead() {
  return (
    <div className="border-b-2 border-gray-200 pb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16">
            <Image
              src="/images/logo (2).jpeg"
              alt="Hospital Logo"
              width={64}
              height={64}
              className="object-contain"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary">Babalal Ji Hospital</h1>
            <p className="text-sm text-gray-500">Multi-Specialty Healthcare Center</p>
          </div>
        </div>
        <div className="text-right text-sm">
          <p> Khehra Road, Dhianpur (Gurdaspur)</p>
          <p>Phone: +91 98722-15406</p>
          <p>Phone: +91 99152-15406</p>
          <p>Email: info@babalalhospital.com</p>
        </div>
      </div>
    </div>
  )
}
