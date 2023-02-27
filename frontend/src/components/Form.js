import React from 'react'

const Form = () => {

  function allowDrop(ev) {
    ev.preventDefault();
  }

  function drag(ev) {
    ev.dataTransfer.setData("childID", ev.target.id);
  }


  function deleteDiv(ev) {
    ev.preventDefault();

    const id = ev.dataTransfer.getData("childID");

    if (!id.startsWith("dragged")) {
      return;
    }
    const el = document.getElementById(id);
    el.parentNode.removeChild(el);
  }
  return (
    <div>
      <form className="form-inline p-2" >
        <div className="container-drag mx-sm-3 mb-2" onDrop={(event) => deleteDiv(event)} onDragOver={(event) => allowDrop(event)} style={{ display: "flex", flexDirection: "column" }}>
          <input type="text" className="form-control" id="item1" placeholder="drag item_1" draggable="true" onDragStart={(event) => drag(event)} />
          <input type="text" className="form-control" id="item2" placeholder="drag item_2" draggable="true" onDragStart={(event) => drag(event)} />
          <input type="text" className="form-control" id="item3" placeholder="drag item_3" draggable="true" onDragStart={(event) => drag(event)} />
          <input type="text" className="form-control" id="item4" placeholder="drag item_4" draggable="true" onDragStart={(event) => drag(event)} />
          <input type="text" className="form-control" id="item5" placeholder="drag item_5" draggable="true" onDragStart={(event) => drag(event)} />
        </div>
      </form>
    </div>
  )
}

export default Form