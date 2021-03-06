import React from "react";
import ReactGoogleMapLoader from "react-google-maps-loader";
import ReactGooglePlacesSuggest from "react-google-places-suggest";
import TextField from 'material-ui/TextField';

const MY_API_KEY = "AIzaSyCLpF3Kgl5ILBSREQ2-v_WNxBTuLi1FxXY";

class GoogleSuggest extends React.Component {
  state = {
    search: "",
    value: "",
    location: "",
    name: "",
  }

  handleInputChange(e) {
      this.setState({search: e.target.value, value: e.target.value});
      this.setState({location: this.props.getLocation});
      this.setState({name: this.props.getName});
  }

  handleSelectSuggest(suggest, original) {
    //console.log(suggest) // eslint-disable-line
    //console.log(original) // eslint-disable-line
    this.setState({
      search: "",
      value: original.description,
      location: this.props.getLocation,
      name: this.props.getName
    })
    this.props.onLocChange(suggest);
    this.props.onNameChange(original.structured_formatting.main_text);
  }

  render() {
    const {search,value} = this.state;
    const {types} = this.props;
    return (
      <div className="input-location">
      <ReactGoogleMapLoader
        params={{
          key: MY_API_KEY,
          libraries: "places,geocode",
        }}
        render={googleMaps =>
          googleMaps && (
            <ReactGooglePlacesSuggest
              googleMaps={googleMaps}
              autocompletionRequest={{
                input: search,
                types: types
                // Optional options
                // https://developers.google.com/maps/documentation/javascript/reference?hl=fr#AutocompletionRequest
              }}
              // Optional props
              onSelectSuggest={this.handleSelectSuggest.bind(this)}
              textNoResults="No results found for your search." // null or "" if you want to disable the no results item
              customRender={prediction => (
                <div className="customWrapper">
                  {prediction
                    ? prediction.description
                    : "No results found for your search."}
                </div>
              )}
            >
              <TextField
                name="place"
                type="text"
                value={value}
                placeholder={this.props.placeholder}
                onChange={this.handleInputChange.bind(this)}
              />
            </ReactGooglePlacesSuggest>
          )
        }
      />
      </div>
    )
  }
}

export default GoogleSuggest;
