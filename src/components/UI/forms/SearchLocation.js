import React, {Component} from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from "react-places-autocomplete";
import {injectIntl} from "react-intl";

const Styled = styled.div`
    input {
        width: 100%;
        height: 30px;
        display: block;
        
        border: 1px solid rgba(213, 203, 255, .2);
        background: transparent;
        border-radius: 3px;
        
        font-weight: 500;
        font-size: 14px;
        color: #fff;
        padding: 0 6px;
        
        transition: all .3s ease;
        outline: none;
        
        &:hover, &:focus {
            border-color: rgba(213, 203, 255, .6);
        }
    }
    .autocomplete-dropdown-container {
        margin: 10px 0 0;
        border-radius: 3px;
        
        > div {
            font-size: 14px;
        }
    }
`;

class LocationSearchInput extends Component {
    static defaultProps = {
        includeCords: false
    };

    state = {
        address: '',
        cords: {},
        addressObject: {}
    };

    handleChange = address => {
        this.setState({ address });
    };

    handleSelect = address => {
        const {includeCords} = this.props;

        this.setState({address});

        if (includeCords) {
            geocodeByAddress(address)
                .then(results => {
                    const [addressObject] = results;
                    this.setState({addressObject});
                    return results;
                })
                .then(results => getLatLng(results[0]))
                .then(cords => this.setState({cords}))
                .then(() => this.callback())
                .catch(error => console.error('Error', error));
        } else {
            geocodeByAddress(address)
                .then(results => {
                    const [addressObject] = results;
                    this.setState({addressObject});
                    this.callback();
                })
                .catch(error => console.error('Error', error));
        }
    };

    callback = () => {
        const {addressObject, cords} = this.state;
        const {onLocationSelect, closeAction, includeCords} = this.props;
        closeAction();
        includeCords ? onLocationSelect(addressObject, cords) : onLocationSelect(addressObject);
    };

    render() {
        const {intl} = this.props;

        return (
            <PlacesAutocomplete
                value={this.state.address}
                onChange={this.handleChange}
                onSelect={this.handleSelect}>
                {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                    <Styled>
                        <input
                            {...getInputProps({
                                placeholder: intl.formatMessage({id: "global.forms.placeholders.location"}),
                                className: 'location-search-input',
                            })}
                        />
                        <div className="autocomplete-dropdown-container">
                            {suggestions.map(suggestion => {
                                const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                const style = suggestion.active
                                    ? { backgroundColor: '#3F317C', cursor: 'pointer', padding: '6px 12px' }
                                    : { backgroundColor: '#2B244A', cursor: 'pointer', padding: '6px 12px' };
                                return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
                                        })}>
                                        <span>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </Styled>
                )}
            </PlacesAutocomplete>
        );
    }
}

export default injectIntl(LocationSearchInput)

LocationSearchInput.propTypes = {
    includeCords: PropTypes.bool,
    onLocationSelect: PropTypes.func.isRequired,
    closeAction: PropTypes.func.isRequired
};