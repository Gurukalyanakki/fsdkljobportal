import React, { Component } from 'react';
import '../css/MenuBar.css';
import { BASEURL, callApi, getSession, setSession } from '../api';

export default class MenuBar extends Component {
  constructor(){
    super();
    this.state = {menuItems : []};
    this.loadMenus = this.loadMenus.bind(this);
  }
  componentDidMount(){
    
    let csr=getSession("csrid");
    let data=JSON.stringify({csrid:csr});
    callApi("POST",BASEURL+"menus/getmenusbyrole",data,this.loadMenus)
    //callApi("POST", BASEURL + "menus/getmenus", "", this.loadMenus)
  }
  loadMenus(response){
    let data = JSON.parse(response);
    this.setState({menuItems : data});
  }
  render() {
    const {menuItems} = this.state;

    return (
      <div className='menubar'>
        <div className='menuheader'>
          MENU <img src='/images/menu.png' alt="menu" />
        </div>
        <div className='menuitem'>
          <ul>
          {menuItems.map((row) =>(
                <li onClick={()=>this.props.onMenuClick(row.mid)}>{row.menu} <img src = {row.icon} alt='' /></li>
                ))}
          </ul>
        </div>
      </div>
    );
  }
}