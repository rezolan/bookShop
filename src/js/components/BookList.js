import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Category from '../components/Category'

import {searchBook} from '../actions';
import {bindActionCreators} from 'redux';

import Book from './Book';
import Filter from './Filter';

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({searchBook}, dispatch)
}

const mapStateToProps = (state, ownProps) => {
   

    if(ownProps.match.params.id) {
        if(ownProps.match.url.replace(/[^a-z]/g, '')=='pages'){
            if(state.books.length>20){
                let newBooks=state.books.slice((ownProps.match.params.id-1)*20, (ownProps.match.params.id-1)*20+20);
                return {books: newBooks, l:state.books.length, pages: ownProps.match.params.id, 
                    sidebar: state.sidebar, filter: state.filter};
            }
        }else
        return {
            books: state.books.filter((item, index) => {
                 if (state.category[ownProps.match.params.id] == item.type) {
                    return item;
                }
                else if(ownProps.match.params.id == "l_d"){
                    if(item.futured == true){
                        return item;
                    }
                }     
            }), sidebar: state.sidebar, filter: state.filter,
        }
    }    
    else if(ownProps.match.params.search) { 
        return {books: state.books.filter((item, index) => {
            if (item.name.toLowerCase().includes(ownProps.match.params.search.toLowerCase())
            ||item.author.toLowerCase().includes(ownProps.match.params.search.toLowerCase())
            ||item.seria.toLowerCase().includes(ownProps.match.params.search.toLowerCase()))
                return item;
            }), sidebar: state.sidebar, l:state.books.length, pages: ownProps.match.params.id, filter: state.filter
        }
    }
    else if (ownProps.match.params.idauthor){
        if(state.books.map((item)=>{item.author==ownProps.match.params.idauthor})){
            return {
                books: state.books.filter((item)=>item.author==ownProps.match.params.idauthor)
            }
        }
    } 
    else {
        if (ownProps.match.url == '/buy') {
            console.log(state.bought)
            return {books: state.bought}
        }
        else
            return { books: state.books, sidebar: state.sidebar,l:state.books.length, pages: ownProps.match.params.id, filter: state.filter}
    }
};


@connect (mapStateToProps, mapDispatchToProps)
export default class BookList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            books: this.props.books, 
            check: null
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.books !== this.state.books) {
            this.setState({books: nextProps.books}); 
        }
        
        if (nextProps.filter !== this.props.filter) {
            this.setState({check: nextProps.filter})
        }     
    }
    scrolling = () => {
        window.scrollTo(0,420);
    }
    componentDidMount(){
        if (this.props.match.url != '/buy') 
            this.setState({ books: this.state.books.sort((item, nextItem) => (item.rating < nextItem.rating) ? 1 : (item.rating > nextItem.rating) ? -1 : 0), check: null });
        
    }
    componentDidUpdate(){

        if(this.state.check == this.props.filter) {
            switch(this.state.check) {
                case("name_a"):
                    this.setState({ books: this.state.books.sort((item, nextItem) => (item.name.trim() < nextItem.name.trim()) ? -1 : (item.name.trim() > nextItem.name.trim()) ? 1 : 0), check: null });
                    break;
                case("name_z"):
                    this.setState({ books: this.state.books.sort((item, nextItem) => (item.name.trim() < nextItem.name.trim()) ? 1 : (item.name.trim() > nextItem.name.trim()) ? -1 : 0), check: null });
                    break;
                case("raiting"):  
                    this.setState({ books: this.state.books.sort((item, nextItem) => (item.rating < nextItem.rating) ? 1 : (item.rating > nextItem.rating) ? -1 : 0), check: null });
                    break;          
                case("author_a"):
                    this.setState({ books: this.state.books.sort((item, nextItem) => (item.author.trim() < nextItem.author.trim()) ? -1 : (item.author.trim() > nextItem.author.trim()) ? 1 : 0), check: null });
                    break;  
                case("author_z"):
                    this.setState({ books: this.state.books.sort((item, nextItem) => (item.author.trim() < nextItem.author.trim()) ? 1 : (item.author.trim() > nextItem.author.trim()) ? -1 : 0), check: null });
                    break; 
                case("price_a"):
                    this.setState({ books: this.state.books.sort((item, nextItem) => (item.price < nextItem.price) ? -1 : (item.price > nextItem.price) ? 1 : 0), check: null });
                    break; 
                case("price_z"):
                    this.setState({ books: this.state.books.sort((item, nextItem) => (item.price < nextItem.price) ? 1 : (item.price > nextItem.price) ? -1 : 0), check: null });
                    break; 
                default:
                    return ;
            }
        }    
    }

    page = () =>{
        if (this.state.books.length > 20 || this.props.l > 20) {
            let a=[];
            if(this.state.books.length>20){
            for(var i=1; i<Math.floor(this.state.books.length/20)+1; i++){
                if(a[i]=='undefined'){
                    a[i]=<Link to={`/pages${i+1}`} onClick={this.scrolling} key={i}><p className='pageP'>{i+1} </p></Link>
                }else{
                    a[i]=<Link to={`/pages${i+1}`} onClick={this.scrolling} key={i}><p className='pageP'>{i+1} </p></Link>
                }
            }
        }else{
            for(var i=1; i<Math.floor(this.props.l/20)+2; i++){
                if(+this.props.pages!=i){
                    if(i==1){
                        a[i]=<Link to="/" onClick={this.scrolling} key={i}><p className='pageP'>1</p></Link>
                    }else{
                        a[i]=<Link to={`/pages${i}`} onClick={this.scrolling} key={i}><p className='pageP'>{i} </p></Link>
                    }
                }
            }
        }
            return (
                <div className='page'>
                    {a.map((item, index)=>{return item})}
                </div>
            );
        }    
    }
    
    render() {
        // console.log (this.state.books)
            return (
            <div>    
                <Filter />
                <div>
                    {<Category />                }
                    <div className="book-list-main">
                        <div id="w77"   className="book-list"  ref="book_list">
                         {/*console.log(this.state.books)*/} 
                            {this.state.books?this.state.books.slice(0,20).map((item, index) => <Book item={item} key={index} index={index}/>):null}
                            {this.state.books?this.page():null}
                        </div>
                    </div>
                 </div>
            </div>
        )
    }
}