import React, { Component } from 'react';

class CreateRoom extends Component {
    constructor(props) {
        super(props);
        this.openState = this.props.openState;
        this.setFalseState = this.props.setFalseState;
        
        this.state = {
            roomname: "",
            category: "interest",
            bgimage: "",
        }
    }
    render() {
        if (this.props.openState) {
            return (
                <div className='create_room'>
                    <div className='form_box'>
                        {/* Title */}
                        <p className='title'>新增聊天室</p>
                        {/* Close windox */}
                        <div className='cross'>
                            <i className="cross fas fa-times" onClick={this.setFalseState}></i>
                        </div>
                        {/* Form */}
                        <form className='create_form'>
                            <div className="form_group">
                                <label htmlFor='roomname'>名稱 : </label>
                                <input type="text" id="roomname" name="roomname" placeholder="Enter the Room Name" required
                                    value={this.state.roomname} onChange={this.handleChange.bind(this)}
                                ></input>
                            </div>
                            <div className="form_group">
                                <label htmlFor='category'>類別 : </label>
                                <select name='category' value={this.state.category} onChange={this.handleChange.bind(this)}>
                                    <option value="interest">興趣</option>
                                    <option value="food">美食</option>
                                    <option value="tech">科技</option>
                                    <option value="travel">旅遊</option>
                                </select>
                            </div>
                            <div className="form_group">
                                <label htmlFor='category'>聊天室圖片 : </label>
                                <input type="url" id="bgimage" name="bgimage" placeholder="Enter Room Image URL" required
                                    value={this.state.bgimage} onChange={this.handleChange.bind(this)}
                                ></input>
                            </div>
                            <div className="form_group">
                                <button type="submit" className="submitBTN">GoGo</button>
                            </div>
                        </form>
                    </div>
                </div>
            )
        }
        else{
            return <></>
        }
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
}

export default CreateRoom;