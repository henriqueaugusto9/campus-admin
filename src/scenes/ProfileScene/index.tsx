
import { resolve } from 'inversify-react';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { Header } from '../../components';
import { StudentRepository } from '../../repositories/StudentRepository';
import {
    Container, LogoutButton
} from './components/index';
import {
    ProfileImageCard, ProfileInfoCard
} from '../../components/ProgressCard';
import { Edit } from '@material-ui/icons';
import Colors from '../../utils/colors';
import StudentService from '../../services/StudentService';


class ProfileScene extends Component<RouteComponentProps>{

    @resolve(StudentRepository) private studentRepo!: StudentRepository
    @resolve(StudentService) private studentService!: StudentService
    state = {
        isLoading: true,
        imageIsLoading: false
    }

    async componentDidMount() {
        const profile = await this.studentRepo.getProfile()
        console.log('profile: ', profile)
        if (profile != null) {
            this.setState({ isLoading: false })
        } else {
            this.props.history.replace('/login')
        }
    }

    logout = () => {
        this.studentRepo.logout()
        this.props.history.replace('/login')
    }

    onEditImage = async (e: any) => {
        e.preventDefault();
        console.log('files: ', e.target.files)
        this.setState({ imageIsLoading: true })
        const success = await this.studentService.editProfileImage(e.target.files[0])
        console.log('done')
        this.setState({ imageIsLoading: false })
    }

    render() {
        const { isLoading, imageIsLoading } = this.state
        const profile = this.studentRepo.profile!
        console.log('profile: ', profile)
        return (
            <>
                <Header title='Perfil'
                    backgroundColor={Colors.secundaryAccentColor}
                // suffixComponent={<Edit onClick={isLoading ? () => { } : () => this.props.history.push('/profile/edit', { profile })} style={{ color: '#fff', fontSize: '32px' }} />}
                />
                <Container>
                    {profile != null &&
                        <>
                            <ProfileImageCard image={profile.picture.image} isLoading={isLoading || imageIsLoading} onEditImage={this.onEditImage} />
                            <ProfileInfoCard
                                info={profile.info}
                                isLoading={isLoading}
                            />
                        </>
                    }
                    <LogoutButton onClick={() => this.logout()}>Sair</LogoutButton>
                </Container>
            </>
        )
    }


}

export default withRouter(ProfileScene);