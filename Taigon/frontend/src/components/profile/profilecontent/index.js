import React from 'react';
import { connect } from 'react-redux';
import ContentEditable from 'react-contenteditable';

const HOST = location.origin + '/media/';

class ProfileContent extends React.Component {
    constructor(props) {
        super(props);
        this.user = this.props.user;
        this.state = {
            nickname: this.user.nickname,
            introduction: this.user.introduction + 'sdsadsa'
        }
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
                        <div className='inform_group'>
                            <p className='label'>E-mail :</p>
                            <p className='profile_data profile_email'>{this.user.email}</p>
                        </div>
                        <div className='inform_group'>
                            <p className='label'>暱稱 :</p>
                            <div className='edit_box edit_nickname'>
                                <ContentEditable className='profile_data profile_nickname' disabled={false} html={this.state.nickname} />
                            </div>
                        </div>
                        <div className='inform_group columnType'>
                            <p className='label'>自我介紹 :</p>
                            <div className='edit_box edit_introduct'>
                                <ContentEditable className='profile_data profile_introduction' disabled={false} html={this.state.introduction} />
                            </div>
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

