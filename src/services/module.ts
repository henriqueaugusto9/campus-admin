import { ContainerModule } from 'inversify'
import AppService from './UserService'


export const ServicesModule = new ContainerModule((bind) => {
    bind(AppService).toSelf().inSingletonScope()
})