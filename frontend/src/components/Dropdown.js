import React from 'react'
import "../styles/dropdown.css"

const Dropdown = () => {
    return (
        <div>


            <div className="sidebarbox">
                <h4 className='drop-heading'>Analytics</h4>
                <ul className="main_side">
                    <li className="ripple" role="button"><a href="#"><i className="fa fa-user-circle-o" ></i> Dashboard</a></li>
                    <li className="ripple"><a href="#"><i className="fa fa-inbox" ></i> Message</a></li>
                    <li className="ripple"><a href="#"><i className="fa fa-bookmark" ></i> Bookmark</a></li>
                    <li className="ripple"><a href="#"><i className="fa fa-file" ></i> Files</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Dropdown