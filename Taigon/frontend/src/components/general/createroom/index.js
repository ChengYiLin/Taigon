import React from 'react';
import { connect } from 'react-redux';
// actions
import { getCategories } from '../../../actions/lobby';
import { toggleCreateRoom } from '../../../actions/createroom';



class Createroom extends React.Component {
    constructor(props) {
        super(props);
        this.getCategories = this.props.getCategories;
        this.toggleCreateRoom = this.props.toggleCreateRoom;
        this.state = {
            "firstPart": true,
            "showMenu": false,
            "placeholder": "請選擇類別",
            "roomname": "",
            "icon": null,
            "background": null,
            "introduction": "",
            "category": null,
        }
        this.clickOutSide = this.clickOutSide.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleBgImageChange = this.handleBgImageChange.bind(this);
        this.handleIconImageChange = this.handleIconImageChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleClickMenu = this.handleClickMenu.bind(this);
        this.background = React.createRef();
        this.icon = React.createRef();
    }
    componentDidMount() {
        this.getCategories();
    }
    render() {
        let createRoomPart = [];
        if (this.state.firstPart) {
            createRoomPart.push(
                <div key='1' className='firstpart'>
                    <div className='room_background upload_Img'>
                        <label htmlFor='room_bgImage' className='upload_label' style={{ backgroundImage: `url(${this.state.background})` }}></label>
                        <input type="file" id="room_bgImage" ref={this.background} accept=".jpg, .jpeg" onChange={this.handleBgImageChange}></input>
                        <div className='room_icon upload_Img'>
                            <label htmlFor='room_iconImage' className='upload_label' style={{ backgroundImage: `url(${this.state.icon})` }}></label>
                            <input type="file" id="room_iconImage" ref={this.icon} accept=".jpg, .jpeg" onChange={this.handleIconImageChange}></input>
                        </div>
                    </div>
                    <div className='room_name'>
                        <p className='subtitle'>聊天室名稱</p>
                        <input type="text" id="roomname" placeholder="輸入聊天室名稱" required
                            value={this.state.roomname} onChange={this.handleTextChange}
                        ></input>
                    </div>
                    <div className='button_group'>
                        <a id='next' className='createRoomBtn next' onClick={this.handleButtonClick}>下一步</a>
                    </div>
                </div>
            )
        }
        else {
            const categories = (this.props.room_category === null) ? <></> : this.props.room_category.map(element => {
                return (
                    <li key={element.id} id={element.id} className='value'>{element.value}</li>
                )
            })

            const category_menu_class = (this.state.showMenu) ? 'category_menu show' : 'category_menu';

            createRoomPart.push(
                <div key='2' className='secondpart'>
                    <div className='room_category'>
                        <p className='subtitle'>聊天室類別</p>
                        <div className={category_menu_class} onClick={this.handleClickMenu}>
                            <p className="now_value">{this.state.placeholder}</p>
                            <ul className="menu">
                                {categories}
                            </ul>
                        </div>
                    </div>
                    <div className="room_introduction">
                        <p className='subtitle'>聊天室介紹</p>
                        <textarea id="introduction" value={this.state.introduction} onChange={this.handleTextChange}></textarea>
                    </div>
                    <div className='button_group second'>
                        <a id='backtoFirst' className='createRoomBtn back' onClick={this.handleButtonClick}>返回</a>
                        <a id='submit' className='createRoomBtn submit' onClick={this.handleButtonClick}>送出</a>
                    </div>
                </div>
            )
        }

        return (
            <div className='createRoom' onClick={this.clickOutSide}>
                <div className='createRoomBox'>
                    <div className='close_btn' style={{ backgroundImage: 'url("/static/img/close.png")' }} onClick={this.toggleCreateRoom}></div>
                    <p className='title'>建立聊天室</p>
                    {createRoomPart}
                </div>
            </div>
        )
    }
    clickOutSide(e) {
        if (e.target.className === 'createRoom') { this.toggleCreateRoom(); }
    }
    handleTextChange(e) {
        e.preventDefault();
        this.setState({ [e.target.id]: e.target.value });
    }
    handleBgImageChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        reader.readAsDataURL(this.background.current.files[0])

        reader.onloadend = (e) => {
            this.setState({ background: reader.result })
        }
    }
    handleIconImageChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        reader.readAsDataURL(this.icon.current.files[0])

        reader.onloadend = (e) => {
            this.setState({ icon: reader.result })
        }
    }
    handleButtonClick(e) {
        e.preventDefault();
        if (e.target.id === 'next') {
            if (this.state.roomname.trim() === "" || this.state.background === null || this.state.icon === null) {
                alert('填寫資料有遺漏喔！');
                return
            }
            else {
                this.setState({ firstPart: false })
            }
        }
        else if(e.target.id === 'backtoFirst'){
            this.setState({ firstPart: true })
        }
    }
    handleClickMenu(e) {
        e.preventDefault();
        if (e.target.className === "value") {
            const category = e.target.id;
            const placeholder = e.target.textContent;
            this.setState(currentState => ({
                category: category,
                placeholder: placeholder,
                showMenu: !currentState.showMenu
            }))
        }
        else { this.setState(currentState => ({ showMenu: !currentState.showMenu })) }
    }
}
const mapStateToProps = state => {
    return {
        room_category: state.lobby.room_category
    }
}

export default connect(mapStateToProps, { getCategories, toggleCreateRoom })(Createroom);