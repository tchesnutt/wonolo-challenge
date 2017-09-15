import React from 'react';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      city: "",
      zip: "",
      dist: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({[e.target.dataset.field]: e.target.value});
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.requestJobs(this.state);
    console.log('off to backend');
  }

  render() {
    return (
      <div className='address-form'>
        <form onSubmit={this.handleSubmit}>
          <label>
            Address:
            <input type="text" data-field="address" value={this.state.address} onChange={this.handleChange} />
          </label>
          <label>
            City:
            <input type="text" data-field="city" value={this.state.city} onChange={this.handleChange} />
          </label>
          <label>
            Zip:
            <input type="text" data-field="zip" value={this.state.zip} onChange={this.handleChange} />
          </label>
          <label>
            Distance(mi):
            <input type="text" data-field="dist" value={this.state.dist} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default App;
