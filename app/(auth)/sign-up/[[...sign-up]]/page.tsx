import { SignUp } from "@clerk/nextjs";
import '@/app/globals.css';

export default function Page() {
  return (
    <div className="page-container">
      <div className="signin-container">
      <SignUp />
      </div>
    </div>
  );
}


