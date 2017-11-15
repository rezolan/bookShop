import React from 'react';
import BookBasket from './BookBasket'
import {connect} from 'react-redux';
import {delallbasket, addNotify, boughtBook} from '../actions';
import {bindActionCreators} from 'redux';

const mapDispatchToProps = dispatch => ( bindActionCreators({ delallbasket, addNotify , boughtBook}, dispatch) );

const mapStateToProps = (state) => {
        return {books: state.inbasket, bought: state.bought}
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Basket extends React.Component {
    constructor(props){
        super(props)
    }
      
    bought = () => {
        this.props.addNotify("Кросавчег! Твои книги уже в пути!")
        this.props.boughtBook(this.props.books);
        this.props.delallbasket();
    }
    add = () =>{
        console.log(this.props.books)
        if(this.props.books !=""){
            return (
            <div className='basket-book'>
               <div className='cart-block'>
               {/* <span className='cart-top-block'>Книга</span>
                <span className='cart-top-block'>
                    Название
                </span>
                <span className='cart-top-block'>
                    Цена
                </span>
                <span className='cart-top-block'>
                    Количество
                </span>
                <span className='cart-top-block'>
                    Удалить
                </span> */}
               </div>
                {this.addbooktobasket()}
                
                <div className="basket-add-contacts">
                    <br/>
                {/* <p className='clearfix'> Очистить корзину</p> */}
                <div className='del-all-wrapper'>
                <button className='basket-button del-all' onClick={this.props.delallbasket}>Удалить всё</button>
                </div>
                <hr/>
                    <form className='contacts'>
                        <p>Купить книгу сейчас</p>
                        <p>E-mail:</p>
                        <input className='cart-inp' type='email' placeholder='E-mail'/>
                        <p>Номер телефона:</p>
                        <input className='cart-inp' type='tel' placeholder='Номер телефона' maxLength='13' size='13'/>
                        <button onClick={this.bought}className='basket-buy'>Купить</button>
                    </form>
                    
                </div>
                
            </div>)
        }else{
            return(
                <div className='nobasket'>
                    <p>Ваша корзина пуста</p>
                </div>
            )
        };
    }


    addbooktobasket = () =>{
        let a=[]
        let b=JSON.parse(JSON.stringify(this.props.books))
        for(let i=0;i<b.length;i++) {
          for(let k=0;k<b.length;k++) {
            if(k!=i) {
              if(b[i].code==b[k].code) b[k]=''
            }
          }
        }
        for(let i=0;i<b.length;i++) {
          if(b[i]=='') continue
          else a.push(b[i])
        }
        console.log(a)
        console.log(b)
        return a.map((item, index)=> {return <BookBasket books={item} index={index} key={index}/>})
    }

    render(){
        return(
            <div className='basket-list'>
                <div className='basket-header-wrapper'>
                <h2>Корзина</h2>
                </div>
                <br/>
                {this.add()}
            </div>
        );
    }
}


// {this.props.books.map((item, index)=>{
//     return <BookBasket books={item} index={index} key={index}/>
//     })}