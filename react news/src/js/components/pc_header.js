import React from 'react';
import ReactDOM from 'react-dom';

import { Form, Icon, Input, Button , Modal , Tooltip , Row , Col , Menu , Tabs , message , CheckBox , Cascader, Select} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class PCHeader extends React.Component{
	
	constructor(){
		super();
		this.state = {
			current: 'headlines',
			modalVisible :false,
			action: 'login',
			hasLogined: 'false',
			userNickName: '',
			userid: 0,
			confirmDirty: false
		};
		this.handleClick = this.handleClick.bind(this);
		this.setModalVisible = this.setModalVisible.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	setModalVisible(value){
		this.setState({
			modalVisible:value
		});
	}
	
	handleClick(e){
//	   	console.log('click ', e);
		
		if(e.key == 'register'){
			this.setState({
				current:'register'
			})
			this.setModalVisible(true);
		}else{
			this.setState({
				current:e.key
			})
		}

	}	
	//页面向API提交数据
	handleSubmit(e){
		e.preventDefault();
		let myFetchOptions = {
			method: 'GET'
		};
	    this.props.form.validateFieldsAndScroll((err, values) => {
	      if (!err) {
	        console.log('Received values of form: ', values);
	      }
	    });
	}
	
	render(){
		
 		const { getFieldDecorator } = this.props.form;
 		
	    const formItemLayout = {
	      labelCol: {
	        xs: { span: 24 },
	        sm: { span: 6 },
	      },
	      wrapperCol: {
	        xs: { span: 24 },
	        sm: { span: 14 },
	      },
	    }; 		
		
		const userShow = this.state.hashLogined
		?
		<Menu.Item key="logout" class="register">
          	<Button type="primary" htmlType="button">{this.state.userNickName}</Button>
        	&nbsp;
    		<Link target="_blank">
    			<Button type="dashed" htmlTpe="button">个人中心</Button>
    		</Link>
    		&nbsp;
    		<Link target="_blank">
    			<Button type="ghost" htmlTpe="button">退出</Button>
    		</Link>    		
        </Menu.Item>
        :
        <Menu.Item key="register" class="register">
        	<Icon type="appstore"/>注册/登录     
		</Menu.Item>;
		
		
		return(
			<header>
				<Row>
					<Col span={2}></Col>
					<Col span={4}>
						<a href="/" class="logo">
							<img src="./src/images/logo.png" alt="logo"/>
							<span>reactNews</span>
						</a>
					</Col>
					<Col span={16}>
						<Menu mode="horizontal"  onClick={this.handleClick} selectedKeys={[this.state.current]}>
					        <Menu.Item key="headlines">
					          <Icon type="appstore" />头条
					        </Menu.Item>
					        <Menu.Item key="sociology">
					          <Icon type="appstore" />社会
					        </Menu.Item>
					        <Menu.Item key="domestic">
					          <Icon type="appstore" />国内
					        </Menu.Item>
					        <Menu.Item key="international">
					          <Icon type="appstore" />国际
					        </Menu.Item>
					        <Menu.Item key="entertainment">
					          <Icon type="appstore" />娱乐
					        </Menu.Item>
					        <Menu.Item key="sports">
					          <Icon type="appstore" />体育
					        </Menu.Item>
					        <Menu.Item key="science">
					          <Icon type="appstore" />科技
					        </Menu.Item>	
					        <Menu.Item key="fashion">
					          <Icon type="appstore" />时尚
					        </Menu.Item>	
					        {userShow}
						</Menu>
						
						<Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} onCancel= {()=>this.setModalVisible(false)} onOk={() => this.setModalVisible(false)} okText = "关闭">
 							<Form onSubmit={this.handleSubmit}>
					        <FormItem
					          {...formItemLayout}
					          label="E-mail"
					          hasFeedback
					        >
					          {getFieldDecorator('email', {
					            rules: [{
					              type: 'email', message: 'The input is not valid E-mail!',
					            }, {
					              required: true, message: 'Please input your E-mail!',
					            }],
					          })(
					            <Input />
					          )}
					        </FormItem>
					        <FormItem
					          {...formItemLayout}
					          label="Password"
					          hasFeedback
					        >
					          {getFieldDecorator('password', {
					            rules: [{
					              required: true, message: 'Please input your password!',
					            }, {
					              validator: this.checkConfirm,
					            }],
					          })(
					            <Input type="password" />
					          )}
					        </FormItem>
					        <FormItem
					          {...formItemLayout}
					          label="Confirm Password"
					          hasFeedback
					        >
					          {getFieldDecorator('confirm', {
					            rules: [{
					              required: true, message: 'Please confirm your password!',
					            }, {
					              validator: this.checkPassword,
					            }],
					          })(
					            <Input type="password" onBlur={this.handleConfirmBlur} />
					          )}
					        </FormItem>
					      </Form>
						</Modal>
					</Col>
					<Col span={2}></Col>
				</Row>
			</header>		
		)
	}
	
}

export default PCHeader = Form.create({})(PCHeader);
