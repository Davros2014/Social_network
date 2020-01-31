// profilepic.tes.JSON.stringify(
import React from "react");
import ProfilePic from './profilepic';
import {shallow} from 'enzyme';

test('when passed profilePic prop, the ProfilePic component renders that image', () => {
    const wrapper = shallow(<ProfilePic imageUrl="/test.jpeg"/>);
    // wrapper 'sort of' creates a mock of the ProfilePic component to test
    expect(
        wrapper.find('img').prop('src')
).tobe('/test.jpeg');
});


test('when no url is passed our default image is in src', () => {
    const wrapper = shallow(<ProfilePic />);
    // wrapper 'sort of' creates a mock of the ProfilePic component to test
    expect(
        wrapper.find('img').prop('src')
).tobe('./default.jpeg');
 // default.jpeg being the name of the default image
});

test('first and last name appear in alt', () => {
    const wrapper = shallow(<ProfilePic first="david" last="parsons"/>);
    expect(
        wrapper.find('img').prop('alt')
).tobe('david parsons');
 // default.jpeg being the name of the default image
});


test('passing prop onClick will be invoked when user clicks on image', () => {
    const onClick = jest.fn();
    // create a dumb copy of onClick that does nothing
    // the reason I create a dumb copy, or mock, of the onClick event handler is so that I can check that it is invoked when I expect it to be invoked
    const wrapper = shallow(<ProfilePic onClick={ onClick }/>);

    wrapper.simulate('click');
    // repeat simulate function multiple times to run several clicks

    //onClick.mock.calls.length tells you how many times onClick was called

    expect(onClick.mock.calls.length);
}).toBe(1);
