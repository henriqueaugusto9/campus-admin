import { ContainerModule } from 'inversify'
import StudentService from './StudentService'


export const ServicesModule = new ContainerModule((bind) => {
    bind(StudentService).toSelf().inSingletonScope()
})