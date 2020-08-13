import React from 'react';
import { connect } from 'react-redux';

const HOST = location.origin + '/media/';

class ProfileContent extends React.Component {
    constructor(props) {
        super(props);
        this.user = this.props.user;
    }
    render() {
        return (
            <div className='content profile_content'>
                <div className='banner'>
                    <p className='slogen'>個人資料編輯</p>
                </div>
                <div className='profileInform'>
                    <div className='imgPart'>
                        <img className='profile_img' src={`${HOST + this.user.image}`}></img>
                    </div>
                    <div className='mainPart'>
                        <div className='inform_group'>
                            <p className='label'>名稱 :</p>
                            <p className='profile_data profile_name'>{this.user.username}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.account.user
    }
}

export default connect(mapStateToProps)(ProfileContent);

