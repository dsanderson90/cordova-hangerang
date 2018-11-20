import React from "react";
import { Places } from 'google-places-web';

Places.apiKey = 'AIzaSyCkDqWy12LJpqhVuDEbMNvbM_fbG_5GdiA';
Places.debug = false;

class GooglePlaceNameRev extends React.Component {

  constructor() {
    super();
    this.state = {
      name: '',
    }
  }

  getPlaceDetails(id){
      Places.details({ placeid: id }).then((result) => { this.setState({ name: result.name }) }).catch(e => console.log(e.message));
  }

  render() {
    return (
      <span className="placename">
        {this.getPlaceDetails(this.props.lat,this.props.lng)}
        {this.state.name}
      </span>
    )
  }

}

export default GooglePlaceNameRev;