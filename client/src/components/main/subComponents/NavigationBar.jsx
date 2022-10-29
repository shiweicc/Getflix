import pic from './getfilxLogo.png';
import SearchBar from './Searchbar.jsx';
import ClickTracker from '../../ClickTracker.jsx';

const NavigationBar = (props) => {
  const userName = props.userName;
  const userId = props.userId;
  return (
    <ClickTracker webpage={'Main-Navigation-Bar'} userName={userName} userId={userId}>
      <div className='Navigation-Bar'>
        <div className='main-logo' >
          <img  alt='logo' src={pic} ></img>
        </div>
        <SearchBar
          search={props.search}
          filtered={props.filtered}
          detail={props.detail}/>
        <div className='main-buttons'>
          <div className='main-welcome-msg'>Welcome, {userName}</div>
          <button className='main-logout-btn' data-testid="logout" onClick={() => {props.logout()}}> Logout</button>
          <button className='main-profile-btn' data-testid="profile" onClick={() => {props.profile()}}>Profile</button>
        </div>
      </div>
    </ClickTracker>
  )
}

export default NavigationBar;