import { ContainerModule } from 'inversify'
import { StudentRepository } from './StudentRepository'

export const RepositoriesModule = new ContainerModule((bind) => {
    bind(StudentRepository).toSelf().inSingletonScope()
})