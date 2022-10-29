import React from 'react';
import axios from 'axios';

class ClickTracker extends React.Component {

  onClick = (e) =>  {
    let result = {
      userid: parseInt(this.props.userId),
      username: this.props.userName,
      webpage: this.props.webpage,
      object: null,
      movieid: null,
      movietitle: null,
    };

    let click = e.target.id;

    if (click) {
      if (click.slice(0,7) === 'isMovie') {
        let clickobj = click.split('_');
        result.object = clickobj[1];
        result.movieid = parseInt(clickobj[2]);
        result.movietitle = clickobj[3];
      } else {
        result.object = e.target.id;
      }
    }

    if (result.object && result.userid) {
      axios.post('/clicktracker', result)
        .catch( err => {
          console.log('Err posting interactions', err);
        })
    }
  }

  remapChildren(children) {
    const { onClick } = this;

    return React.Children.map(
      children,
      child => {
        if (typeof child.type === 'string') {
          return React.cloneElement(child, { onClick });
        } else if (React.Children.count(child.props.children)) {
          return React.cloneElement(child, {
            children: this.remapChildren(child.props.children)
          });
        }
      }
    );
  }

  render() {
    return this.remapChildren(this.props.children);
  }

}


export default ClickTracker;