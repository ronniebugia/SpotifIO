import React, { Component } from 'react';
import { Form, Segment } from 'semantic-ui-react';
import '../css/newUser.css';


class NewUser extends Component {


    render(){
        var {newUserPressedEnter} = this.props;

        return(
            <div className="new-user-welcome-screen">
                <h2>Spotif.io</h2>
                <Form>
                    <Form.Field>
                        <label>Name:</label>
                        <input
                            name="user-name"
                            onKeyPress={newUserPressedEnter}
                        />
                    </Form.Field>
                </Form>
            </div>
        )
    }
}

export default NewUser;