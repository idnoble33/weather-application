import React from "react";
import * as enzyme from "enzyme";
import { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Home from "../pages/home";
enzyme.configure({ adapter: new Adapter() });

describe("Home", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Home />);
  });
  test("render the h2 that is inside of the home component", () => {
    expect(wrapper.find("h2").text()).toContain("Home");
  });

  test("render the paragrapg that is inside of the home component", () => {
    expect(wrapper.find("p").text()).toContain(
      "Welcome to the Tugboat Logic Weather App!"
    );
  });
});
