import React from 'react';
import { addPost} from '../actions';
import Notify from '../components/Notify';

// Функция connect является связующим между компонентом и store из redux,
// эта функция принимает два параметра:
// 1. функция, в которую аргументом приходит state из store, которая возвращает объект, в котором
//    мы должны указать какие данные хотим получить в своем компоненте
// 2. функция, которая должна вернуть ваши actions, которые в дальнейшем тоже попадут в свойства компонента который оборачиваете.
import { connect } from 'react-redux';

// Это специальная функция которая все полученые в объекте actions будет оборачивать в функцию dispatch,
// это нужно для того чтобы вызывая свои actions вы не просто получали объект, а обращались с ним в глобальный store,
// где с помощью reducers будет идти обработка этого action'a
import { bindActionCreators } from 'redux';

// mapStateToProps - выбираем какие данные нам нужны из store, которые в дальнейшем запишутся в props
// компонента который мы оборачиваем.
const mapStateToProps = state => ({ posts: state.posts });

// mapDispatchToProps - передаем все нужные нам actions в оборачеваемый компонент, но перед этим оборачиваем
// все actions в функцию dispatch
const mapDispatchToProps = dispatch => ( bindActionCreators({ addPost}, dispatch) );

// @connect - "@" - обозначает декоратор, это es7. Функция "connect" декорирует объект, имеется ввиду что на
// выходе мы получаем новый, измененный компонент который содержит в себе дополнительные функции и свойства,
// а какие именно - мы определяем в функциях передаваемых внутрь функции connect.
@connect(mapStateToProps, mapDispatchToProps)
export default class AddPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkbox: false,
            post: null
        }
    }
    handleOnSubmit = (e) => {
        e.preventDefault();

        if(this.title.value.trim() !== '' && this.description.value.trim() !== '') {
            let new_post = {
                title: this.title.value,
                description: this.description.value
            };

            this.props.addPost(new_post);
            this.setState({post: new_post})

            this.setState({checkbox: true});
            setTimeout(() => {this.setState({checkbox: false})}, 2000);
            this.title.value = '';
            this.description.value = '';
        }
    };

    render() {
        return (
            <div className="add-post">
                {this.state.checkbox ? <Notify title={this.state.post.title} /> : null}
                <h3>Add new post</h3>
                <form onSubmit={this.handleOnSubmit}>
                    <input type="text" ref={instance => this.title = instance} placeholder="Post title"/>
                    <textarea ref={instance => this.description = instance} placeholder="Post content"/>
                    <button type="submit">Создать новый пост</button>
                </form>
            </div>
        );
    }
}