import React from 'react';
import {Formik} from 'formik';
import './dashboard.css';
import * as Yup from 'yup';
import {actions} from './actions';
import {connect} from 'react-redux';


class DashboardComponent extends React.Component {

    render() {
        return (
            <div>
                <Formik
                    initialValues={{name: ''}}
                    onSubmit={(values, {setSubmitting}) => {
                        this.props.loadUserData(values.name);
                        setSubmitting(false);
                    }}
                    validationSchema={Yup.object().shape({
                        name: Yup.string().required('Required')
                    })}
                >
                    {props => {
                        const {
                            values,
                            touched,
                            errors,
                            dirty,
                            isSubmitting,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            handleReset
                        } = props;
                        return (
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="name"><b>GitHub Name</b></label>
                                <input
                                    id="name"
                                    placeholder="Enter your username"
                                    type="text"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.name && touched.name ? 'error' : ''}
                                />
                                {errors.name && errors.touched && <div className="input-feedback">{errors.name}</div>}
                                <button
                                    type="button"
                                    className="outline"
                                    onClick={handleReset}
                                    disabled={!dirty || isSubmitting}
                                >
                                    Reset
                                </button>
                                <button type="submit" disabled={isSubmitting}>
                                    Submit
                                </button>
                            </form>
                        );
                    }}
                </Formik>
                <div className="output output-text">
                    <pre>{JSON.stringify(this.props.user, null, 2)}</pre>
                    <div style={{ margin: '1em' }}>
                        <img alt="" style={{ width: '70px' }} src={JSON.stringify(this.props.avatar_url, null, 2)} />
                        <div>
                            <div style={{ fontWeight: 'bold' }}>{JSON.stringify(this.props.name, null, 2)}</div>
                            <div>{this.props.blog}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        avatar_url: state.avatar_url
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadUserData: name => dispatch(actions.loadUserData(name))
    };
};

export const Dashboard = connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);

