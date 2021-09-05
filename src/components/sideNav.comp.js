import React from "react"
import "../sidebar.css"
import "../sidebar-jquery"
class SideNav extends React.Component {
render(){
  return (
    <div>
      <div id="mySidenav" class="sidenav">
        <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Clients</a>
        <a href="#">Contact</a>
      </div>
      <span onclick="openNav()">open</span>
    </div>
  )
}

}
export default SideNav