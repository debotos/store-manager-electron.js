import React from "react";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";

const style = {
  zIndex: 1000,
  position: "fixed",
  bottom: 20,
  right: 20
};

class FloatingAddButton extends React.Component {
  handleClick = event => {
    this.props.showAddExpensesModel();
  };
  render() {
    return (
      <div>
        <FloatingActionButton style={style} onClick={this.handleClick}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}

export default FloatingAddButton;
