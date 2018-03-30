//history is from react router (aka link) and dispatch is coming from connect
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import {
  Form,
  Item,
  Label,
  Input,
  Button
} from 'native-base';
import { Link } from 'react-router-native';
import { connect } from 'react-redux';
import { login } from '../actions/auth';

class Login extends React.Component {
  state = { email: '', password: '' }

  authenticate = () => {
    let { email, password } = this.state;
    let { dispatch, history } =this.props;
    dispatch(login(email, password, history));
  }

  handleChange = (type, val) => {
    this.setState({ [type]: val });
  }

  render() {
    let { email, password } = this.state;
    return(
      <Form>
        <Item floatinglabel>
          <Label>Email</Label>
          <Input
            autoFocus={true}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={ (val) => this.handleChange('email', val)}
          />
        </Item>
        <Item floatinglabel last>
          <Label>Password</Label>
          <Input
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={ (val) => this.handleChange('password', val)}
          />
        </Item>
        { (email.length > 0 && password.length > 0) ?
          <Button primary block onPress={this.authenticate}>
            <Text style={styles.button}>Login</Text>
          </Button> : null
        }
        <Link to="/register">
          <Text style={styles.link}>New User?</Text>
        </Link>
      </Form>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    color: 'white',
  },
  link: {
    textAlign: 'center',
    paddingTop: 40,
  },
})

export default connect()(Login);