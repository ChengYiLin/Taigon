import React from 'react';
import { connect } from 'react-redux';

class Lobby extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='lobby'>
                Here is lobby
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {}
}

export default connect(mapStateToProps)(Lobby);