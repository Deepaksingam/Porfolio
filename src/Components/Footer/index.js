import React from "react";

function Footer() {
  return (
    <footer className="text-center headerBox textField mt-2">
      <p>© {new Date().getFullYear()} Deepak Singam. All rights reserved.</p>
    </footer>
  );
}

export default Footer;