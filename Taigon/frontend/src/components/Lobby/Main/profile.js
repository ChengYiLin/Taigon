import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateProfileImage } from '../../../actions/auth'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
        this.state = {
            'previewImg': ''
        }
    }
    render() {
        let profile_img = (this.props.user) ? `/media/${this.props.user.image}` : "url(/media/user.png)";
        const username = (this.props.user) ? this.props.user.username : '';
        const email = (this.props.user) ? this.props.user.email : '';
        const showCheckBtn = (this.state.previewImg) ? 'checkBTN show' : 'checkBTN'

        if (this.state.previewImg) {
            profile_img = this.state.previewImg;
        }

        return (
            <main>
                <div className='profile'>
                    <h2 className='title'>個人資訊</h2>
                    <form className='inform' onSubmit={this.handleSubmit.bind(this)}>
                        <div className='image' style={{ backgroundImage: `url(${profile_img})` }}>
                            <label className='edit_img' htmlFor='profileImg'>Edit</label>
                            <input type="file" id="profileImg" ref={this.fileInput} name="profileImg"
                                accept=".png, .jpg, .jpeg" onChange={this.handleImgChange.bind(this)}
                            ></input>
                        </div>
                        <div className='username'>{username}</div>
                        <div className='email'>{email}</div>
                        <button type="submit" className={showCheckBtn}>確認修改</button>
                    </form>
                </div>
            </main>
        )
    }
    handleImgChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        reader.readAsDataURL(this.fileInput.current.files[0]);

        reader.onloadend = (e) => {
            this.setState({ previewImg: reader.result })
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.previewImg) { return }
        this.props.updateProfileImage(this.props.user.id, this.fileInput.current.files[0]);
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    chatroomList: state.lobby.chatroomList
})

export default connect(mapStateToProps, { updateProfileImage })(Profile);