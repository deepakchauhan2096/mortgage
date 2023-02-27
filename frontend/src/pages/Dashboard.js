import React from "react";
import { Link } from "react-router-dom";
import Dropdown from "../components/Dropdown";
import Droppan from "../components/Droppan";
import Form from "../components/Form";
import "../styles/layout.css"




function Dashboard(props) {
  return (
    <div>
      <div className="container-layout">
        <nav>
          <div style={{color:"white",textAlign:"right",padding:"1% 1%"}}>
            {props.name ? `Welcome - ${props.name}` : <Link to="/login" >Login please</Link>}
          </div>
        </nav>
        {/* <main>main</main> */}
        <div id="sidebar"><Dropdown /></div>
        <div id="content1"><Form /></div>
        <div id="content2"><Droppan /></div>
        <footer>Footer</footer>
      </div>
    </div>
  );
}

export default Dashboard;