import React from "react";
import * as enzyme from "enzyme";
import { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Weather from "./weather";

enzyme.configure({ adapter: new Adapter() });

describe("Weather", () => {
  const wrapper = shallow(<Weather />);
  it("renders well", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("render the h2 of the weather component", () => {
    expect(wrapper.find("header h2").text()).toContain("Weather");
  });

  test("render a City with text of `Check Weather`", () => {
    expect(wrapper.find(".checkWeather").text()).toBe("Check Weather");
  });
  it("initializes the `state` with an undefined", () => {
    expect(wrapper.state().cityName).toBe(undefined);
  });
});
