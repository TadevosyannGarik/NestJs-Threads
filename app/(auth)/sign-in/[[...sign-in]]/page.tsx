import { SignIn } from "@clerk/nextjs";
import React from 'react';
import '@/app/globals.css';

export default function Page() {
  return (
    <div className="page-container">
      <div className="signin-container">
        <SignIn />
      </div>
    </div>
  );
}