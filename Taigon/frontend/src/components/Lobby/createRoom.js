import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createChatRoom, getChatroomCategories } from '../../actions/lobby';

class CreateRoom extends Component {
    constructor(props) {
        super(props);
        this.openState = this.props.openState;
        this.setFalseState = this.props.setFalseState;

        this.state = {
            roomname: "",
            category: "",
            showCategory: false,
            showCategoryText: "請選擇類別",
            previewImg: ''
        }
        this.fileInput = React.createRef();
    }
    componentDidMount(){
        this.props.getChatroomCategories();
    }
    render() {
        if (this.props.openState) {
            let showCategory = (this.state.showCategory) ? 'select show' : 'select';
            let categories = (!this.props.categories) ? [] : this.props.categories.map(element =>{
                return(
                    <div key={element.id} className='value' id={element.id}>{element.value}</div>
                )
            })
            
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
                        <form className='create_form' onSubmit={this.handleSubmit.bind(this)}>
                            <div className="form_group">
                                <label htmlFor='category'>主題類別 : </label>
                                <div className={showCategory} onClick={this.createRoomCategory.bind(this)}>
                                    <div className='placeholder'>{this.state.showCategoryText}</div>
                                    <div className='main_select'>
                                        {categories}
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
                                        <p>上傳背景圖片(.jpg / .png)</p>
                                    </label>
                                    <div className='previewImg' style={{backgroundImage:`url(${this.state.previewImg})`}}></div>
                                    <input type="file" id="room_bgimage" ref={this.fileInput} onChange={this.handleImgChange.bind(this)} name="room_bgimage" accept=".png, .jpg, .jpeg"></input>
                                </div>
                            </div>
                            <div className="form_group submit">
                                <button type="submit" className="submitBTN">建立聊天室</button>
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
    handleImgChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        reader.readAsDataURL(this.fileInput.current.files[0])

        reader.onloadend = (e) =>{
            this.setState({previewImg: reader.result})
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.createChatRoom(this.state.roomname, this.fileInput.current.files[0], this.state.category, this.props.user.id);
        this.props.setFalseState();
        this.setState({roomname: "",category: "",})
    }
    createRoomCategory(e) {
        e.preventDefault();

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

const mapStateToProps = state => ({
    user: state.auth.user,
    chatroomList: state.lobby.chatroomList,
    categories: state.lobby.categories
})

export default connect(mapStateToProps, { createChatRoom, getChatroomCategories })(CreateRoom);