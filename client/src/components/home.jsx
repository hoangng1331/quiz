import React, { useState } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";

const Home = () => {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState(0);

  const packages = [5, 10, 15, 20];

  const handlePackageSelect = (packageSize, index) => {
    setSelectedPackage(index);
    slideButtons(index);
    setTimeout(() => {
      navigate("/start", { state: { pack: packageSize } });
    }, 1000);
  };

  const slideButtons = (selectedIndex) => {
    const buttons = document.getElementsByClassName("package-button");
    const offset = 100; // Slide offset in pixels

    for (let i = 0; i < buttons.length; i++) {
      if (i === selectedIndex) continue;

      if (i % 2 === 0) {
        buttons[i].style.transform = `translateX(-${offset}px)`;
      } else {
        buttons[i].style.transform = `translateX(${offset}px)`;
      }
      buttons[i].style.opacity = 0;
    }
  };

  return (
    <div className="start-container">
      <h1>Welcome to Online Quiz</h1>
      <p>Choose a package you want to do!</p>
      <div className="package-list">
        {packages.map((packageSize, index) => (
          <Button
            key={index}
            className={`package-button ${
              selectedPackage === index ? "selected" : ""
            }`}
            onClick={() => handlePackageSelect(packageSize, index)}
            style={{
              transition: "transform 1s, opacity 1s",
              opacity: 1,
              justifyContent: "space-between",
            }}
          >
            <strong>Package: {packageSize} questions</strong>{" "}
            <strong>
              <AiOutlineRight />
            </strong>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Home;
