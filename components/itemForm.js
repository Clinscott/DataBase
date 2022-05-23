import React from "react";

export class ItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        item: "",
        description: "",
        location: "",

 };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

   async handleSubmit(event) {
    event.preventDefault();
    let item = {
            item: this.state.item,
               description: this.state.item,
               location: this.state.location,
    }
       const data = await fetch(`http://localhost:3000/api/create`, {
           method: "POST",
           body: JSON.stringify(item),
       })

    alert(`Your ${this.state.item} was submitted to location: ${this.state.location}`);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Item:
          <input
            name="item"
            type="text"
            value={this.state.item}
            onChange={this.handleChange}
          />
        </label>
        <span/>
        <label>
          Description:
          <input
            name="description"
            type="text"
            value={this.state.description}
            onChange={this.handleChange}
          />
        </label>
        <span/>
        <label>
          Location:
          <input
            name="location"
            type="text"
            value={this.state.location}
            onChange={this.handleChange}
          />
        </label>
        <span/>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
