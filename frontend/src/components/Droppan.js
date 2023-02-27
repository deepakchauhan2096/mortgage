import React from 'react'

const Droppan = () => {

    var count = 0;

    function allowDrop(ev) {
        ev.preventDefault();
    }

    function drag(ev) {
        ev.dataTransfer.setData("childID", ev.target.id);
    }

    function drop(ev) {
        ev.preventDefault();

        const id = ev.dataTransfer.getData("childID");

        if (id.startsWith("dragged") || !id) {
            return;
        }

        const nodeCopy = document.getElementById(id).cloneNode(true);

        nodeCopy.id = "dragged" + id + count++;

        nodeCopy.addEventListener("dragstart", drag);

        ev.target.appendChild(nodeCopy);
    }


    return (
        <div>
            <div className="div">
                <div className="row" style={{ height: "100", border: "" }}>
                    <div className="col-3">
                        <div onDrop={(event) => drop(event)} onDragOver={(event) => allowDrop(event)} className="dropArea" ></div>
                    </div>
                    <div className="col-3">
                        <div onDrop={(event) => drop(event)} onDragOver={(event) => allowDrop(event)} className="dropArea" ></div>
                    </div>
                    <div className="col-3">
                        <div onDrop={(event) => drop(event)} onDragOver={(event) => allowDrop(event)} className="dropArea" ></div>
                    </div>
                    <div className="col-3">
                        <div onDrop={(event) => drop(event)} onDragOver={(event) => allowDrop(event)} className="dropArea" ></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Droppan