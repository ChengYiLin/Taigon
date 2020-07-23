import React, { Component } from 'react';

class CreateRoom extends Component {
    constructor(props) {
        super(props);
        this.openState = this.props.openState;
        this.setFalseState = this.props.setFalseState;

        this.state = {
            roomname: "",
            category: "",
            bgimage: "",
            showCategory: false,
            showCategoryText: "請選擇類別"
        }
    }
    render() {
        if (this.props.openState) {
            let showCategory = (this.state.showCategory) ? 'select show' : 'select'

            return (
                <div className='create_room_box'>
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
                                <label htmlFor='category'>主題類別 : </label>
                                <div className={showCategory} onClick={this.createRoomCategory.bind(this)}>
                                    <div className='placeholder'>{this.state.showCategoryText}</div>
                                    <div className='main_select'>
                                        <div className='value' id='1'>娛樂</div>
                                        <div className='value' id='2'>美食</div>
                                        <div className='value' id='3'>學習</div>
                                        <div className='value' id='4'>旅遊</div>
                                        <div className='value' id='5'>運動</div>
                                        <div className='value' id='6'>寵物</div>
                                        <div className='value' id='7'>科技</div>
                                        <div className='value' id='8'>興趣</div>
                                    </div>
                                    <i className="select_icon fas fa-sort-down"></i>
                                </div>
                            </div>
                            <div className="form_group">
                                <label htmlFor='roomname'>聊天主題 : </label>
                                <input type="text" id="roomname" name="roomname" placeholder="請輸入聊天室的房間名稱" required
                                    value={this.state.roomname} onChange={this.handleChange.bind(this)}
                                ></input>
                            </div>
                            <div className="form_group flex_column">
                                <label htmlFor='category'>背景圖片 : </label>
                                <div className='image_dropbox'>
                                    <label htmlFor='room_bgimage' className='upload_image'>
                                        <i className="fas fa-upload"></i>
                                        <p>上傳聊天室背景圖片(.jpg / .png)</p>
                                    </label>
                                    <input type="file" id="room_bgimage" name="room_bgimage" accept="image/png, image/jpeg"></input>
                                </div>
                            </div>
                            <div className="form_group submit">
                                <button type="submit" className="submitBTN">開始聊天</button>
                            </div>
                        </form>
                    </div>
                </div>
            )
        }
        else {
            return <></>
        }
    }
    handleChange(e) {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }
    createRoomCategory(e) {
        e.preventDefault();
        console.log(e.target.id)

        if (e.target.className === 'value') {
            const categoryId = e.target.id;
            const categoryText = e.target.textContent;

            this.setState(currentState => ({
                category: categoryId,
                showCategory: !currentState.showCategory,
                showCategoryText: categoryText
            }));
        }
        else {
            this.setState(currentState => ({ showCategory: !currentState.showCategory }));
        }
    }
}

export default CreateRoom;