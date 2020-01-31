import React from "react";
import { connect } from "react-redux";
import { getTestList } from "./actions";

class Test extends React.Component {
    componentDidMount() {
        this.props.dispatch(getTestList());
    }
    render() {

        if (!this.props.myTests) {
            return <div className = 'loading'><div>
            }
        console.log("props in test", this.props);
        return (
            <div>
                <h1>redux!!</h1>
                {this.props.myTests.length &&
                    this.props.myTests.map(anim => (
                        <div key = {anim}> {anim}</div>)
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log("STATE", state);

    return {
        myTests: state.testList
        //we'll reurn to this once the global state has something in it
    };
};

export default connect(mapStateToProps)(Test);
