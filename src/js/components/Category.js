import React from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {sideBarHide} from '../actions';
import {bindActionCreators} from 'redux';

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({sideBarHide}, dispatch)
}

const mapStateToProps = (state, ownProps) => {
    return {books: state.books,
        visible: state.sidebar,
        category: state.category}
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Category extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            toggleId: true,
            top_coord: 1,

        }
        this.handleTest = this.handleTest.bind(this);
    }
    getCoord = (elem) => {
        var box = elem.getBoundingClientRect();
        
          return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
          };
    }
    windowHeightDetect =() =>{}

    scrolling = () => {
        window.scrollTo(0,420);
    }
    componentDidMount() {
        this.handleTest()
    }
    componentWillUnmount(){
        window.onscroll = null;
    }

    handleTest(e) {
        
        var wrap = this.getCoord(this.refs.wrapp)
        window.onscroll = (e) =>{
            //console.log(this.refs.wrapp.getBoundingClientRect().top)
            if(this.state.toggleId == true){
             if(this.refs.wrapp.getBoundingClientRect().top + this.refs.wrapp.clientHeight + 60 < 0){
                    if(!this.refs.wrapp.classList.contains("fixed_cat")){
                        this.setState({toggleId: false}) 
                        this.setState({top_coord: window.pageYOffset})
                        setTimeout(this.refs.wrapp.classList.add("fixed_position"), 3000)
                        
                    }
                }
             }else if(this.state.toggleId == false){

                if(window.pageYOffset < this.state.top_coord -  this.refs.wrapp.clientHeight -50 -50){
                    this.setState({toggleId: true}) 

                }  
            }   
        }  
    }

    handleShow = () => {


        if(this.props.visible){
            this.refs.hide_show.style.backgroundColor ="rgba(26, 188, 156, 0.90)";  
            this.props.sideBarHide(false);

        } else {
            this.refs.hide_show.style.backgroundColor ="1ABC9C";           
            this.props.sideBarHide(true);
        }
    }

    render(){
        return(
            <div id={this.props.visible? "w20" : "w0"}  className={this.state.toggleId ? "category_wrap relative_cat" : "category_wrap fixed_cat"} ref="wrapp">
                    <div className="category_hide" ref="hide_show" onClick={this.handleShow}>Category</div>
                    {/* <div className="category_bookmark" style={{backgroundImage: 'url('+ require("../../icon/bookmark.png")+')'}}></div> */}
                    <div className="category_body" ref="category_body">
                    <h3 onClick={this.handleTest} ref="title">Категории:</h3>
                        {this.props.category.map((item, index) =>
                            <Link onClick={this.scrolling} key={index} className="category__link" to={"/category" + index}>{item}</Link>)}
                    </div>
                </div>

        )
    }   
}