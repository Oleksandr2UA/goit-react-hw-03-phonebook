import { Component } from 'react';
import { Filter } from './Filter/Filter';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
const KEY = 'phonebook';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem(KEY, JSON.stringify(this.state.contacts));
    }
  }
  componentDidMount() {
    const data = localStorage.getItem(KEY);
    if (data) {
      const parsedData = JSON.parse(data);
      this.setState({ contacts: parsedData });
    }
  }
  filterChange = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  addContact = contact => {
    const normalizedName = contact.name.toLowerCase();
    const normalizedNames = this.state.contacts.map(contact =>
      contact.name.toLowerCase()
    );

    if (normalizedNames.includes(normalizedName))
      return alert(`${contact.name} is already in contacts.`);

    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, contact],
      };
    });
  };

  deleteContact = id => {
    console.log(id);
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };
  filterRender = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase().trim();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };
  render() {
    const { filter } = this.state;
    const filteredContacts = this.filterRender();
    return (
      <>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.onSubmit} addContact={this.addContact} />
        <h2>Contacts</h2>
        <Filter filter={filter} filterChange={this.filterChange} />
        <ContactList
          filteredContacts={filteredContacts}
          onDelete={this.deleteContact}
        />
      </>
    );
  }
}
