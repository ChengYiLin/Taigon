import React from 'react';
import { connect } from 'react-redux';
// actions
import { getChatroomByCategory } from '../../../actions/lobby';

const HOST = window.location.origin;

class RoomList extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.getChatroomByCategory(this.props.now_category);
    }
    render() {
        if (this.props.room_list === null) { return <></> }

        let rooms = [];
        if (this.props.room_list.length) {
            rooms = this.props.room_list.map(element => (
                <div className='room'>
                    <div className='room_background' style={{ backgroundImage: `url(${HOST + '/media/' + element.background})` }}>
                        <div className='room_icon' style={{ backgroundImage: `url(${HOST + '/media/' + element.icon})` }}></div>
                    </div>
                    <div className='room_inform'>
                        <p className='room_name'>{element.roomname}</p>
                        <small className='room_introduction'>
                            {element.introduction}
                        </small>
                    </div>
                </div>
            ))
        }

        return (
            <div className='main'>
                <h3 className='title'>熱門聊天室</h3>
                <div className='room_list'>
                    {rooms}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        now_category: state.lobby.now_category,
        room_list: state.lobby.room_list
    }
}

export default connect(mapStateToProps, { getChatroomByCategory })(RoomList);

