// app.test.js
import React from "react";
import { App } from "./app";
import { shallow } from "enzyme";
import axios from "./axios";

jest.moc("./axios");
// this dumb copy of axios will have all the meothods of the real axios, except those methods don't actually do anything (ie they won't actually )

test("app sets state in componentDidMount", async () => {
    axios.get.mockResolvedValue({
        data: {
            bio: "some test bio",
            first: "test first",
            last: "test last",
            profilePicUrl: " someTestImg.jpg"
        }
    });

    const wrapper = shallow(<App />, {
        disableLifecycleMethods: true
    });

    await wrapper.instance().cmponentDidMount();

    expect(wrapper.state("first")).toBe("test first");
});
