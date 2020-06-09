import React, { Component } from "react";

class New extends Component{

    render(){

        var { number, array } = this.props;
        console.log(array);

        return(
            <div>
                Hello World! {number}
            </div>
        )
    }

}

export default New;