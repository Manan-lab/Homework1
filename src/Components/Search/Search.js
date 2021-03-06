import React, { useState } from 'react';
import { InputGroup, FormControl, Button, Dropdown, DropdownButton, Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getTasks } from '../../store/taskActions';
import { shortString } from '../../helpers/utils';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


const statusOptions = [
    {
        label: 'Unset',
        value: ''
    },
    {
        label: 'Active',
        value: 'active'
    },
    {
        label: 'Done',
        value: 'done'
    }
];


const sortOptions = [
    {
        label: 'Unset',
        value: ''
    },
    {
        label: 'A-Z',
        value: 'a-z'
    },
    {
        label: 'Z-A',
        value: 'z-a'
    },
    {
        label: 'Creation date oldest',
        value: 'creation_date_oldest'
    },
    {
        label: 'Creation date newest',
        value: 'creation_date_newest'
    },
    {
        label: 'Completion date oldest',
        value: 'completion_date_oldest'
    },
    {
        label: 'Completion date newest',
        value: 'completion_date_newest'
    }
];


const dateOptions = [
    {
        label: 'Create lte',
        value: 'create_lte'
    },
    {
        label: 'Create gte',
        value: 'create_gte'
    },
    {
        label: 'Complete lte',
        value: 'complete_lte'
    },
    {
        label: 'Complete gte',
        value: 'complete_gte'
    }
];


function Search(props) {

    const [search, setSearch] = useState("");

    const [status, setStatus] = useState({
        label: '',
        value: ''
    });

    const [sort, setSort] = useState({
        label: '',
        value: ''
    });


    const [dates, setDates] = useState({
        create_lte: null,
        create_gte: null,
        complete_lte: null,
        complete_gte: null
    });


    const handleInputChange = (event) => {
        setSearch(event.target.value);
    }

    const handleSubmit = () => {

        const searchData = {
            search,
            status: status.value,
            sort: sort.value,
        };

        for (let key in dates) {
            let val = dates[key];
            if (val) {
                searchData[key] = val.toLocaleDateString();
            }
        }

        props.getTasks(searchData);
    }


    return (
        <Container>
            <Col>
                <Row >
                    <InputGroup className="mt-3">

                        <DropdownButton
                            key={search.label}
                            as={InputGroup.Append}
                            variant="outline-secondary"
                            title={status.value ? status.label : "Status"}
                        >

                            {
                                statusOptions.map((option, index) => <Dropdown.Item
                                    key={index}
                                    active={status.value === option.value}
                                    onClick={() => setStatus(option)}
                                >
                                    {option.label}
                                </Dropdown.Item>)
                            }
                        </DropdownButton>


                        <DropdownButton
                            key={sort.label}
                            as={InputGroup.Append}
                            variant="outline-secondary"
                            title={sort.value ? shortString(sort.label, 5) : "Sort"}
                        >

                            {
                                sortOptions.map((option, index) => <Dropdown.Item
                                    key={index}
                                    active={sort.value === option.value}
                                    onClick={() => setSort(option)}
                                >
                                    {option.label}
                                </Dropdown.Item>)
                            }
                        </DropdownButton>


                        <FormControl
                            placeholder="🔍 Search..."
                            aria-describedby="basic-addon2"
                            onChange={handleInputChange}
                            value={search}
                        />


                        <InputGroup.Append>
                            <Button variant="outline-primary"
                                onClick={handleSubmit}
                            >
                                Search
                    </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Row>

                <Row className="justify-content-md-center" >

                    {
                        dateOptions.map(option =>
                            <div className="mt-4"
                                key={option.value}
                            >
                                <DatePicker
                                    placeholderText={option.label}
                                    selected={dates[option.value]}
                                    onChange={(value) => setDates({
                                        ...dates,
                                        [option.value]: value
                                    })}
                                />
                            </div>
                        )
                    }
                </Row>

            </Col>
        </Container>
    )
}


const mapDispatchToProps = {
    getTasks
}

export default connect(null, mapDispatchToProps)(Search);