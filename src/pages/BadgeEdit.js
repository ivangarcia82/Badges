import React from 'react';

import Badge from '../components/Badge'
import header from '../images/platziconf-logo.svg';
import BadgeForm from '../components/BadgeForm'
import './styles/BadgeEdit.css'
import PageLoading from '../components/PageLoading'
import api from '../api'

class BadgeEdit extends React.Component{
    state = {
        loading: true,
        error: null,
        form: {
          firstName: '',
          lastName: '',
          email: '',
          jobTitle: '',
          twitter: '',
        },
      };

    componentDidMount(){
        this.fetchData()

        setInterval(this.fetchData, 5000)
    }

    fetchData = async event => {
        this.setState({loading: true, error: null})

        try{
            const data = await api.badges.read(
            this.props.match.params.badgeId
            )
            this.setState({loading:false, form: data})

        } catch (error) {
            this.setState({loading: false, error: error})
        }
    }
    handleChange = event => {
        this.setState({
            form: {
                ...this.state.form,
                [event.target.name]: event.target.value,
            }
        })
    }

    handleSubmit = async event => {
        event.preventDefault()
        this.setState({
            loading: true, error: null, 
        })
        try{
            await api.badges.update(this.props.match.params.badgeId, this.state.form)
            this.setState({
                loading: false
            })
            this.props.history.push('/badges')
        } catch (error) {
            this.setState({
                loading: false, error: error, 
            })
        }
    }
    render(){
        if (this.state.loading === true && !this.state.data){
            return <PageLoading />
        }
        return(
            <React.Fragment>
                <div className="BadgeEdit__hero">
                    <img className="BadgeEdit__hero-image img-fluid" src={header} alt="Logo"/>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <Badge 
                            firstName={this.state.form.firstName || 'FIRST_NAME'}
                             lastName={this.state.form.lastName || 'LAST_NAME'} 
                             twitter={this.state.form.twitter || 'TWITTER'} 
                             email = {this.state.form.email || 'EMAIL'}
                             jobTitle={this.state.form.jobTitle || 'JOB_TITLE'}
                             avatarUrl="https://www.gravatar.com/avatar/21594ed15d68ace3965642162f8d2e84?d=identicon"
                             />
                        </div>
                        <div className="col-6">
                            <h1>Edit Attendant</h1>
                        <BadgeForm 
                        onChange={this.handleChange}
                        onSubmit={this.handleSubmit}
                        formValues={this.state.form}
                        error={this.state.error}
                        />
                    </div>
                    </div>

                </div>
            </React.Fragment>
        )
    }
}

export default BadgeEdit;