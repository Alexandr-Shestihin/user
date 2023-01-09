import React, {Component} from "react";
import {connect} from "react-redux";
import {debounce} from 'lodash';
import {API, API_ROUTER} from "../../../api";
import LinearProgress from "@material-ui/core/LinearProgress";
import {FormattedMessage, injectIntl} from "react-intl";
import {
    ContentBox,
    SectionTitle,
    Select,
    Button,
    ButtonRow, ModalTitle, SearchLocation, Modal, Input, ArrowButton
} from '../../../components/UI';
import {toast} from "react-toastify";
import {getValueFromSelect, isFieldEmpty, isSelectEmpty, setValueToSelect, createSelectObject} from "../../../helpers";
import {Styled} from './style';

class Education extends Component {

    get getInitialValues() {
        return (
            {
                type: [this.typeOptions[0]],
                country: '',
                countryCode: '',
                city: '',
                name: [],
                startYear: [],
                endYear: [],
                search: '',
                addEducation: ''
            }
        )
    }

    get getInitialsErrors() {
        return (
            {
                type: '',
                country: '',
                city: '',
                name: '',
                startYear: '',
                endYear: '',
                addEducation: ''
            }
        )
    }

    get typeOptions() {
        const {intl} = this.props;

        return [
            {
                label: intl.formatMessage({ id: 'settings.education.school'}),
                value: 'school'
            },
            {
                label: intl.formatMessage({ id: 'settings.education.university'}),
                value: 'university'
            }
        ]
    }

    state = {
        values: this.getInitialValues,
        errors: this.getInitialsErrors,
        locationModalState: false,
        educationModalState: false,
        isDataLoaded: false,
        educationList: [],
        options: [],
        editMode: false,
        editItem: null
    };

    openLocationModal = () => this.setState({locationModalState: true});

    closeLocationModal = () => this.setState({locationModalState: false});

    openEducationModal = () => this.setState({educationModalState: true});

    closeEducationModal = () => this.setState({educationModalState: false});

    componentDidMount() {
        this.loadList();
    }

    loadList = () => {
        API.request({...API_ROUTER.education.get}, true)
            .then(({items}) => this.setState({
                values: this.getInitialValues,
                errors: this.getInitialsErrors,
                educationList: items,
                isDataLoaded: true,
                editMode: false,
                editItem: null
            }))
            .catch(err => toast.error(err.data && err.data.message))
    };

    searchUniversity(e) {
        const {values} = this.state;
        const request = e.state.search;

        if (values.name && values.type && values.countryCode && (values.search !== request) && request.length) {
            this.searchUniversityRequest(values, request)
        }
    };

    searchUniversityRequest = debounce((values, request) => {
        const params = {
            ...API_ROUTER.institutions.search,
            urlParams: {
                name: request,
                type: getValueFromSelect(values.type),
                country: values.countryCode
            }
        };

        API.request(params)
            .then(({items}) => {
                const list = items.map(item => ({
                    label: item.name,
                    value: item.uuid
                }));
                this.setState({
                    options: list,
                    values: {
                        ...values,
                        search: request
                    }
                })
            })
            .catch(err => console.error(err))
    }, 300);

    getStartRange = () => {
        const currentYear = new Date().getFullYear();
        const endYear = currentYear;
        const years = [];

        let startYear = currentYear - 50;

        while (startYear <= endYear) {
            years.push(startYear++);
        }

        return years.reverse().map(year => ({
            label: year,
            value: year
        }));
    };

    getEndRange = () => {
        let {startYear} = this.state.values;
        if (!startYear.length) return [];

        startYear = startYear[0].value;

        const years = [];
        const endYear = startYear + 10;

        while (startYear <= endYear) {
            years.push(startYear++);
        }

        return years.reverse().map(year => ({
            label: year,
            value: year
        }));
    };

    saveEducation = e => {
        e.preventDefault();
        const {values, errors} = this.state;

        // validate
        errors.type = isSelectEmpty(values.type);
        errors.country = isFieldEmpty(values.country);
        errors.city = isFieldEmpty(values.city);
        errors.name = isSelectEmpty(values.name);
        errors.startYear = isSelectEmpty(values.startYear);
        errors.endYear = isSelectEmpty(values.endYear);
        errors.addEducation = '';
        this.setState({errors});

        if (!Object.values(errors).some(value => value.length)) {
            const params = {
                ...API_ROUTER.education.add,
                data: {
                    institution: getValueFromSelect(values.name),
                    startYear: getValueFromSelect(values.startYear),
                    endYear: getValueFromSelect(values.endYear)
                }
            };

            API.request(params, true)
                .then(() => {
                    toast.success('Education added!');
                    this.loadList();
                })
                .catch(err => toast.error(err.data && err.data.message))
        }
    };

    editEducation = e => {
        e.preventDefault();
        const {values, errors, editItem} = this.state;

        // validate
        errors.type = isSelectEmpty(values.type);
        errors.country = isFieldEmpty(values.country);
        errors.city = isFieldEmpty(values.city);
        errors.name = isSelectEmpty(values.name);
        errors.startYear = isSelectEmpty(values.startYear);
        errors.endYear = isSelectEmpty(values.endYear);
        errors.addEducation = '';
        this.setState({errors});

        if (!Object.values(errors).some(value => value.length)) {
            const params = {
                ...API_ROUTER.education.edit,
                pathKeys: {
                    uuid: editItem
                },
                data: {
                    institution: getValueFromSelect(values.name),
                    startYear: getValueFromSelect(values.startYear),
                    endYear: getValueFromSelect(values.endYear)
                }
            };

            API.request(params, true)
                .then(() => {
                    toast.success('Education saved!');
                    this.loadList();
                })
                .catch(err => toast.error(err.data && err.data.message))
        }
    };

    deleteEducation = uuid => {
        const params = {
            ...API_ROUTER.education.delete,
            pathKeys: {uuid}
        };

        API.request(params, true)
            .then(() => {
                toast.success('Education removed!');
                this.loadList();
            })
            .catch(err => toast.error(err.data && err.data.message))
    };

    onSelectChange = (selectValue, selectName) => {
        const {values} = this.state;
        values[selectName] = selectValue;

        if (selectName === 'startYear') {
            values.endYear = [];
        }

        this.setState({values})
    };

    onInputChange = e => {
        const {values} = this.state;
        values[e.target.name] = e.target.value;

        this.setState({values})
    };

    enableEditMode = uuid => {
        const {educationList, editItem, values} = this.state;
        const {countriesList} = this.props;

        if (editItem !== uuid) {
            const currentItem = educationList.find(item => item.uuid === uuid);
            const country = countriesList.find(item => item.value === currentItem.institution.country)
            const type = this.typeOptions.find(item => item.value === currentItem.institution.type)

            values.type = [type];
            values.country = country.label;
            values.countryCode = country.value;
            values.city = currentItem.institution.city;
            values.name = [createSelectObject(currentItem.institution.uuid, currentItem.institution.name)];
            values.startYear = setValueToSelect(currentItem.startYear);
            values.endYear = setValueToSelect(currentItem.endYear);

            this.setState({
                editMode: true,
                editItem: uuid,
                values,
                errors: this.getInitialsErrors
            });
        }
    };

    disableEditMode = () => {
        this.setState({
            editMode: false,
            editItem: null,
            values: this.getInitialValues,
            errors: this.getInitialsErrors
        });
    };

    onLocationSelect = addressObject => {
        const {values} = this.state;
        const {address_components} = addressObject;

        // get settings
        const longNames = {
            locality: 'long_name',
            country: 'long_name',
        };

        const shortNames = {
            country: 'short_name'
        }

        // get data
        const addressData = {};
        const codes = {};
        for (let i = 0; i < address_components.length; i++) {
            const addressType = address_components[i].types[0];
            if (longNames[addressType]) {
                addressData[addressType] = address_components[i][longNames[addressType]]
            }
            if (shortNames[addressType]) {
                codes[addressType] = address_components[i][shortNames[addressType]]
            }
        }

        // set data
        values.country = addressData.country || '';
        values.countryCode = codes.country || '';
        values.city = addressData.locality || '';
        if (addressData.country) {
            values.name = [];
        }

        this.setState({values})
    };

    addEducation = () => {
        const {values} = this.state;

        // validate
        const newErrors = {
            ...this.getInitialsErrors,
            addEducation: isFieldEmpty(values.addEducation)
        }

        this.setState({errors: {...newErrors}});

        // add
        if (!Object.values(newErrors).some(value => value.length)) {
            const params = {
                ...API_ROUTER.institutions.add,
                data: {
                    type: getValueFromSelect(values.type),
                    name: values.addEducation,
                    country: values.countryCode,
                    city: values.city
                }
            }

            API.request(params, true)
                .then(({institution}) => {
                    this.setState({
                        values: {
                            ...values,
                            name: [{
                                label: institution.name,
                                value: institution.uuid
                            }],
                            addEducation: ''
                        },
                        educationModalState: false
                    })
                })
                .catch(err => toast.error(err.data && err.data.message))
        }
    }

    renderList = () => {
        const {educationList, editMode, editItem} = this.state;

        if (!educationList.length) return false;

        return (
            <>
                <Styled.ListHolder>
                    {educationList.map(item => {
                        const {institution} = item;
                        const {countriesList} = this.props;
                        const country = countriesList.find(item => item.value === institution.country);
                        const printLocation = (country, city) => {
                            let res = '';

                            if (country) {
                                res += country
                            }

                            if (city) {
                                res += ', ' + city
                            }

                            return res
                        }

                        return (
                            <Styled.ListItem
                                className={editItem === item.uuid ? 'on-edit' : ''}
                                key={item.uuid}
                                onClick={() => this.enableEditMode(item.uuid)}>
                                <div className="text name">{institution.name}</div>
                                <div className="text">
                                    {printLocation(country && country.label, institution && institution.city)}
                                </div>
                                <Styled.ListRow>
                                    <div className="text">{`${item.startYear}-${item.endYear}`}</div>
                                    <a href="/" onClick={e => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        this.deleteEducation(institution.uuid);
                                    }}>
                                        <FormattedMessage id="global.buttons.delete" />
                                    </a>
                                </Styled.ListRow>
                            </Styled.ListItem>
                        )
                    })}
                </Styled.ListHolder>
                <Styled.NewItemTitle>
                    {editMode
                        ? <FormattedMessage id="settings.education.editEducation" />
                        : <FormattedMessage id="settings.education.newEducation" />}
                </Styled.NewItemTitle>
            </>
        )
    };

    renderForm = () => {
        const {values, errors, editMode, options} = this.state;
        const StartOptions = this.getStartRange();
        const EndOptions = this.getEndRange();

        return (
            <>
                <SectionTitle>
                    <FormattedMessage id="settings.education.education" />
                </SectionTitle>
                <Styled.Description>
                    <FormattedMessage id="settings.educationDescription" />
                </Styled.Description>
                {this.renderList()}
                <Styled.Form onSubmit={this.saveEducation}>
                    <Styled.FormGroup>
                        <Styled.TripleCol className="first">
                            <label className="fixed">
                                <FormattedMessage id="global.forms.labels.type" />
                            </label>
                            <Select
                                values={values.type}
                                error={errors.type}
                                showErrorMessage={false}
                                options={this.typeOptions}
                                onChange={value => this.onSelectChange(value, 'type')}/>
                        </Styled.TripleCol>
                        <Styled.TripleCol>
                            <label>
                                <FormattedMessage id="global.forms.labels.city" />
                            </label>
                            <Input
                                readOnly
                                onClick={this.openLocationModal}
                                showErrorMessage={false}
                                error={errors.city}
                                value={values.city}/>
                        </Styled.TripleCol>
                        <Styled.TripleCol>
                            <label>
                                <FormattedMessage id="global.forms.labels.country" />
                            </label>
                            <Input
                                readOnly
                                onClick={this.openLocationModal}
                                showErrorMessage={false}
                                error={errors.country}
                                value={values.country}/>
                        </Styled.TripleCol>
                    </Styled.FormGroup>
                    <Styled.FormGroup>
                        <Styled.Col>
                            <label className="fixed">
                                <FormattedMessage id="global.forms.labels.name" />
                            </label>
                            <Styled.SelectUniversity>
                                <Select
                                    values={values.name}
                                    error={errors.name}
                                    showErrorMessage={false}
                                    options={options}
                                    clearable
                                    searchFn={e => this.searchUniversity(e)}
                                    disabled={!values.city?.length && !values.country?.length}
                                    onChange={value => this.onSelectChange(value, 'name')}/>
                                {!!values.city?.length && !!values.country?.length &&
                                    <ArrowButton
                                        label={<FormattedMessage id="global.buttons.addNew" />}
                                        action={this.openEducationModal} />
                                }
                            </Styled.SelectUniversity>
                        </Styled.Col>
                    </Styled.FormGroup>
                    <Styled.FormGroup>
                        <Styled.YearCol>
                            <label className="fixed">
                                <FormattedMessage id="global.forms.labels.startYear" />
                            </label>
                            <Select
                                values={values.startYear}
                                error={errors.startYear}
                                showErrorMessage={false}
                                options={StartOptions}
                                disabled={!values.name.length}
                                onChange={value => this.onSelectChange(value, 'startYear')}/>
                        </Styled.YearCol>
                        <Styled.YearCol>
                            <label>
                                <FormattedMessage id="global.forms.labels.endYear" />
                            </label>
                            <Select
                                values={values.endYear}
                                error={errors.endYear}
                                showErrorMessage={false}
                                options={EndOptions}
                                disabled={!values.startYear.length}
                                onChange={value => this.onSelectChange(value, 'endYear')}/>
                        </Styled.YearCol>
                    </Styled.FormGroup>
                    <ButtonRow direction="right">
                        {!editMode &&
                            <Button
                                label={<FormattedMessage id="global.buttons.add" />}
                                type="submit"
                                action={this.saveEducation}/>
                        }
                        {editMode &&
                            <>
                                <Button
                                    label={<FormattedMessage id="global.buttons.cancel" />}
                                    type="button"
                                    variant="secondary"
                                    action={this.disableEditMode}/>
                                <Button
                                    label={<FormattedMessage id="global.buttons.save" />}
                                    type="submit"
                                    action={this.editEducation}/>
                            </>
                        }
                    </ButtonRow>
                </Styled.Form>
            </>
        )
    };

    render() {
        const {isDataLoaded, locationModalState, educationModalState, values, errors} = this.state;
        const {intl} = this.props;

        return (
            <>
                <ContentBox>
                    {isDataLoaded ? this.renderForm() : <LinearProgress />}
                </ContentBox>
                <Modal
                    closeButton
                    open={locationModalState}
                    onClose={this.closeLocationModal}>
                    <ModalTitle>
                        <FormattedMessage id="settings.education.selectLocation" />
                    </ModalTitle>
                    <SearchLocation
                        includeCords={false}
                        onLocationSelect={this.onLocationSelect}
                        closeAction={this.closeLocationModal}/>
                </Modal>
                <Modal
                    closeButton
                    open={educationModalState}
                    onClose={this.closeEducationModal}>
                    <ModalTitle>
                        <FormattedMessage id="global.buttons.add" /> {getValueFromSelect(values.type)}
                    </ModalTitle>
                    <Styled.AddEducation>
                        <Input
                            name="addEducation"
                            placeholder={intl.formatMessage({id: "settings.education.enterName"})}
                            value={values.addEducation}
                            error={errors.addEducation}
                            onChange={this.onInputChange}/>
                        <Button
                            label={<FormattedMessage id="global.buttons.add" />}
                            action={this.addEducation}/>
                    </Styled.AddEducation>
                </Modal>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        countriesList: state.countriesList
    }
};

export default injectIntl(connect(mapStateToProps)(Education));