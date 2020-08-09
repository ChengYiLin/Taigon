import React from 'react';
import { connect } from 'react-redux';
// actions
import { getCategories, changeNowCategory } from '../../../actions/lobby'


class LobbyNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.changeNowCategory = this.props.changeNowCategory;
        this.handleClickCategory = this.handleClickCategory.bind(this)
    }
    componentDidMount() {
        this.props.getCategories();
    }
    render() {
        const categories = (this.props.room_category === null) ? <></> : this.props.room_category.map(element => {
            const categoryClass = (parseInt(element.id) === parseInt(this.props.now_category)) ? 'category show' : 'category';
            return (
                <li key={element.id}>
                    <a id={element.id} className={categoryClass} onClick={this.handleClickCategory}>{element.value}</a>
                </li>
            )
        })

        return (
            <nav className='sub_navbar lobby_navbar'>
                <p className='title'>分類</p>
                <ul className='categories'>
                    {categories}
                </ul>
            </nav>
        )
    }
    handleClickCategory(e) {
        e.preventDefault();
        const categoryId = e.target.id;
        this.changeNowCategory(categoryId);
    }
}

const mapStateToProps = state => {
    return {
        now_category: state.lobby.now_category,
        room_category: state.lobby.room_category
    }
}

export default connect(mapStateToProps, { getCategories, changeNowCategory })(LobbyNavbar);