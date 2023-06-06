import { useEffect, useState } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const Home = () => {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState(0);
  const [appear, setAppear] = useState(1);

  const packages = [5, 10, 15, 20];

  const handlePackageSelect = (packageSize, index) => {
    setSelectedPackage(index);
    slideButtons(index);
    setTimeout(() => {
      navigate("/start", { state: { pack: packageSize } });
    }, 1000);
  };

  useEffect(() => {
    const buttons = document.querySelectorAll(".package-button");
    buttons.forEach((button, index) => {
      setTimeout(() => {
        button.classList.add("slide-up");
      }, index * 300);
    });
    setTimeout(() => {
      setAppear(appear + 1);
    }, 1500);
  }, []);

  const slideButtons = (selectedIndex) => {
    const buttons = document.getElementsByClassName("package-button-chosen");
    const offset = 100;

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
            className={
              appear >= 2
                ? `package-button-chosen ${
                    selectedPackage === index ? "selected" : ""
                  }`
                : `package-button ${
                    selectedPackage === index ? "selected" : ""
                  }`
            }
            onClick={() => handlePackageSelect(packageSize, index)}
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
