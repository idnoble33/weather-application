import React from "react";
import * as enzyme from "enzyme";
import { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Nav from "../nav/nav";

enzyme.configure({ adapter: new Adapter() });

describe("Nav", () => {
  const app = shallow(<Nav />);
  it("renders correctly", () => {
    expect(app).toMatchSnapshot();
  });
});
