import React from 'react';
import { connect } from 'react-redux';


class LobbyContentBanner extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='banner'>
                <p className='slogen'>在 Taigon 上尋找你的聊天社群</p>
                <p className='slogen small'>總會有屬於你的最佳角落</p>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {}
}

export default connect(mapStateToProps)(LobbyContentBanner);

