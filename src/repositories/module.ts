import { ContainerModule } from 'inversify'
import { AppRepository } from './AppRepository'

export const RepositoriesModule = new ContainerModule((bind) => {
    bind(AppRepository).toSelf().inSingletonScope()
})