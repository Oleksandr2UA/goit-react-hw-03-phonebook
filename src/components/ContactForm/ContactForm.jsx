import { nanoid } from 'nanoid';
import { Component } from 'react';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };
  changeName = e => {
    const name = e.currentTarget.name;

    this.setState({ [name]: e.currentTarget.value });
  };
  onSubmit = e => {
    e.preventDefault();

    const contact = {
      id: nanoid(),
      name: this.state.name,
      number: this.state.number,
    };
    this.props.addContact(contact);
    this.reset();
  };
  reset = () => {
    this.setState({ name: '', number: '' });
  };
  render() {
    const { name, number } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={this.changeName}
            required
          />
        </label>

        <label htmlFor="number">
          Number
          <input
            type="tel"
            id="number"
            value={number}
            onChange={this.changeName}
            name="number"
            required
          />
        </label>

        <button type="submit">Add contact</button>
      </form>
    );
  }
}
