import { CSSProperties, ReactNode } from "react";

import Navbar from "@/app/components/Navbar/Index";
import Footer from "@/app/components/layout/Footer";

export default function MainContainer({ children }: { children: ReactNode }) {
  const style: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "relative",
    minHeight: "100vh",
  };

  return (
    <div style={style}>
      <div style={{ width: "100%" }}>
        <Navbar />
        {children}
      </div>

      <Footer />
    </div>
  );
}
