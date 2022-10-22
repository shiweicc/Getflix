import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

export default function withAuth(ComponentToAuth){
  return class extends Component{
    constructor(){
      super();
      this.state = {
        loading: true,
        redirect: false
      };
    };
    componentDidMount(){
      fetch('/checkToken', {
        credentials: 'include',
        headers: { 'x-access-token': localStorage.getItem('token')}
      }).then(response => {
        if (response.status === 200) {
          this.state({ loading: false});
        } else {
          const errorMessage = new Error(response.error);
          throw errorMessage;
        }
      }).catch(error => {
        console.log(error);
        this.state({ loading: false, redirect: true});
      });
    }
    render(){
      const{loading, redirect} = this.state;
      if (loading) {
        return null;
      }
      if (redirect){
        return <Navigate to='/login'/>
      }
      return <ComponentToAuth {...this.props}/>
    }
  }
}

